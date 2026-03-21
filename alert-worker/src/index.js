import { fetchTokenPrices } from '../../functions/api/_market.js';
import { json, normalizeSnapshot } from '../../functions/api/_shared.js';

const DEFAULT_SITE_URL = 'https://simplecrypto.pages.dev/';
const SERVICE_NAME = 'simplecrypto-alerts';

export default {
    async scheduled(_event, env, ctx) {
        ctx.waitUntil(runAlertCheck(env));
    },

    async fetch(request, env) {
        const url = new URL(request.url);

        if (url.pathname === '/manual-check') {
            if (!isAuthorized(request, env)) {
                return json({ ok: false, error: 'Unauthorized' }, { status: 401 });
            }

            const result = await runAlertCheck(env);
            return json(result, {
                status: result.ok ? 200 : 503
            });
        }

        if (url.pathname === '/send-test') {
            if (!isAuthorized(request, env)) {
                return json({ ok: false, error: 'Unauthorized' }, { status: 401 });
            }

            await sendTelegramMessage(env, [
                'Simple Crypto 测试消息',
                'TG 提醒链路已经接通',
                `时间：${new Date().toISOString()}`,
                `站点：${env.SITE_URL || DEFAULT_SITE_URL}`
            ].join('\n'));

            return json({
                ok: true,
                sent: true
            });
        }

        return json({
            ok: true,
            service: SERVICE_NAME
        });
    }
};

async function runAlertCheck(env) {
    if (!env.DB) {
        return {
            ok: false,
            error: 'Database binding missing'
        };
    }

    if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
        return {
            ok: false,
            error: 'Telegram secrets missing'
        };
    }

    await ensureAlertTables(env.DB);

    const state = await loadAppState(env.DB);
    const strategies = Array.isArray(state.strategies) ? state.strategies : [];
    const activeAlerts = buildActiveAlerts(strategies);

    if (!activeAlerts.length) {
        return {
            ok: true,
            checked: 0,
            notified: 0,
            prices: 0
        };
    }

    const pricesResult = await fetchTokenPrices(activeAlerts.map(alert => alert.token));
    const prices = pricesResult.prices || {};
    const existingStates = await loadAlertStates(env.DB);
    const timestamp = new Date().toISOString();

    let notified = 0;
    let checked = 0;
    let failures = 0;

    for (const alert of activeAlerts) {
        const marketPrice = Number.parseFloat(prices[alert.token]);
        if (!Number.isFinite(marketPrice) || marketPrice <= 0) {
            continue;
        }

        checked += 1;

        const isMet = shouldTriggerAlert(alert.action, marketPrice, alert.targetPrice);
        const previousState = existingStates.get(alert.alertKey);
        const wasMet = Boolean(previousState?.is_met);

        let lastNotifiedAt = previousState?.last_notified_at || null;

        if (isMet && !wasMet) {
            try {
                await sendTelegramAlert(env, alert, marketPrice);
                lastNotifiedAt = timestamp;
                notified += 1;
            } catch (error) {
                failures += 1;
                continue;
            }
        }

        await saveAlertState(env.DB, {
            ...alert,
            isMet,
            marketPrice,
            lastNotifiedAt,
            updatedAt: timestamp
        });
    }

    await pruneStaleAlertStates(env.DB, new Set(activeAlerts.map(alert => alert.alertKey)));

    return {
        ok: true,
        checked,
        notified,
        failures,
        prices: Object.keys(prices).length,
        updatedAt: timestamp
    };
}

function isAuthorized(request, env) {
    if (!env.ALERT_ADMIN_TOKEN) {
        return true;
    }

    const headerToken = request.headers.get('x-alert-token');
    const url = new URL(request.url);
    const queryToken = url.searchParams.get('token');

    return headerToken === env.ALERT_ADMIN_TOKEN || queryToken === env.ALERT_ADMIN_TOKEN;
}

async function loadAppState(db) {
    const row = await db.prepare(`
        SELECT payload
        FROM app_state
        WHERE id = 1
    `).first();

    if (!row?.payload) {
        return normalizeSnapshot();
    }

    try {
        return normalizeSnapshot(JSON.parse(row.payload));
    } catch {
        return normalizeSnapshot();
    }
}

function buildActiveAlerts(strategies) {
    const alerts = [];

    strategies.forEach(strategy => {
        const token = String(strategy?.token || '').trim().toUpperCase();
        if (!token || !Array.isArray(strategy?.levels)) {
            return;
        }

        strategy.levels.forEach(level => {
            const targetPrice = Number.parseFloat(level?.price);
            if (!Number.isFinite(targetPrice) || targetPrice <= 0) {
                return;
            }

            const ratio = Number.parseFloat(level?.ratio);
            if (!Number.isFinite(ratio) || ratio <= 0) {
                return;
            }

            const action = normalizeAction(level?.action);
            const levelId = String(level?.id || '');
            const strategyId = String(strategy?.id || token);

            alerts.push({
                alertKey: `${strategyId}:${levelId}`,
                strategyId,
                levelId,
                token,
                action,
                targetPrice,
                ratio,
                strategyRatio: Number.parseFloat(strategy?.ratio) || 0
            });
        });
    });

    return alerts;
}

function normalizeAction(action) {
    return action === 'sell' || action === 'Sell' || action === '卖出' ? 'sell' : 'buy';
}

function shouldTriggerAlert(action, marketPrice, targetPrice) {
    return action === 'sell' ? marketPrice >= targetPrice : marketPrice <= targetPrice;
}

async function sendTelegramAlert(env, alert, marketPrice) {
    const actionLabel = alert.action === 'sell' ? '卖出' : '买入';
    const ratioText = alert.strategyRatio > 0 ? `${formatRatio(alert.strategyRatio)}%` : '--';
    const siteUrl = env.SITE_URL || DEFAULT_SITE_URL;
    const text = [
        'Simple Crypto 档位提醒',
        `${alert.token} 触发${actionLabel}档位`,
        `目标价：${formatPrice(alert.targetPrice)}`,
        `现价：${formatPrice(marketPrice)}`,
        `代币占比：${ratioText}`,
        `档位占比：${formatRatio(alert.ratio)}%`,
        `查看：${siteUrl}`
    ].join('\n');

    await sendTelegramMessage(env, text);
}

async function sendTelegramMessage(env, text) {
    const response = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: env.TELEGRAM_CHAT_ID,
            text,
            disable_web_page_preview: true
        })
    });

    if (!response.ok) {
        const body = await response.text();
        throw new Error(`Telegram send failed: ${response.status} ${body}`);
    }
}

async function ensureAlertTables(db) {
    await db.prepare(`
        CREATE TABLE IF NOT EXISTS price_alert_states (
            alert_key TEXT PRIMARY KEY,
            strategy_id TEXT NOT NULL,
            level_id TEXT NOT NULL,
            token TEXT NOT NULL,
            action TEXT NOT NULL,
            target_price REAL NOT NULL,
            is_met INTEGER NOT NULL DEFAULT 0,
            last_price REAL,
            last_notified_at TEXT,
            updated_at TEXT NOT NULL
        )
    `).run();
}

async function loadAlertStates(db) {
    const result = await db.prepare(`
        SELECT alert_key, is_met, last_notified_at
        FROM price_alert_states
    `).all();

    const rows = Array.isArray(result?.results) ? result.results : [];
    return new Map(rows.map(row => [row.alert_key, row]));
}

async function saveAlertState(db, alertState) {
    await db.prepare(`
        INSERT INTO price_alert_states (
            alert_key,
            strategy_id,
            level_id,
            token,
            action,
            target_price,
            is_met,
            last_price,
            last_notified_at,
            updated_at
        ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)
        ON CONFLICT(alert_key) DO UPDATE SET
            strategy_id = excluded.strategy_id,
            level_id = excluded.level_id,
            token = excluded.token,
            action = excluded.action,
            target_price = excluded.target_price,
            is_met = excluded.is_met,
            last_price = excluded.last_price,
            last_notified_at = excluded.last_notified_at,
            updated_at = excluded.updated_at
    `).bind(
        alertState.alertKey,
        alertState.strategyId,
        alertState.levelId,
        alertState.token,
        alertState.action,
        alertState.targetPrice,
        alertState.isMet ? 1 : 0,
        alertState.marketPrice,
        alertState.lastNotifiedAt,
        alertState.updatedAt
    ).run();
}

async function pruneStaleAlertStates(db, activeAlertKeys) {
    const result = await db.prepare(`
        SELECT alert_key
        FROM price_alert_states
    `).all();

    const rows = Array.isArray(result?.results) ? result.results : [];

    for (const row of rows) {
        if (activeAlertKeys.has(row.alert_key)) {
            continue;
        }

        await db.prepare(`
            DELETE FROM price_alert_states
            WHERE alert_key = ?1
        `).bind(row.alert_key).run();
    }
}

function formatPrice(value) {
    const price = Number(value);

    if (!Number.isFinite(price) || price <= 0) {
        return '--';
    }

    const maximumFractionDigits = price >= 1000
        ? 2
        : price >= 1
            ? 2
            : price >= 0.1
                ? 4
                : 6;

    return `$${price.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits
    })}`;
}

function formatRatio(value) {
    return String(Math.round(Number(value) || 0));
}
