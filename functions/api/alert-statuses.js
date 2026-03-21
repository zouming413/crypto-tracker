import { json } from './_shared.js';

export async function onRequestGet({ env }) {
    if (!env.DB) {
        return json({
            ok: false,
            statuses: {}
        }, { status: 503 });
    }

    await ensureAlertStateTable(env.DB);

    const result = await env.DB.prepare(`
        SELECT
            alert_key,
            is_met,
            last_notified_at,
            updated_at
        FROM price_alert_states
    `).all();

    const rows = Array.isArray(result?.results) ? result.results : [];
    const statuses = rows.reduce((acc, row) => {
        acc[row.alert_key] = {
            isMet: Boolean(row.is_met),
            lastNotifiedAt: row.last_notified_at || null,
            updatedAt: row.updated_at || null
        };
        return acc;
    }, {});

    return json({
        ok: true,
        statuses
    });
}

async function ensureAlertStateTable(db) {
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
