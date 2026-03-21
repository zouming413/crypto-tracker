const STORAGE_KEYS = {
    fixedIncome: 'crypto_fixed_income',
    totalAmount: 'crypto_total_amount',
    strategies: 'crypto_strategies'
};

const PLATFORM_TRANSLATIONS = {
    'Binance 主站': { zh: 'Binance 主站', en: 'Binance Exchange' },
    'Binance 钱包': { zh: 'Binance 钱包', en: 'Binance Wallet' },
    'OKX 主站': { zh: 'OKX 主站', en: 'OKX Exchange' },
    'OKX 钱包': { zh: 'OKX 钱包', en: 'OKX Wallet' },
    Aave: { zh: 'Aave', en: 'Aave' },
    Uniswap: { zh: 'Uniswap', en: 'Uniswap' },
    Pendle: { zh: 'Pendle', en: 'Pendle' },
    Venus: { zh: 'Venus', en: 'Venus' },
    Buidlpad: { zh: 'Buidlpad', en: 'Buidlpad' }
};

const OVERVIEW_COPY = {
    zh: {
        pageTitle: 'Simple Crypto',
        navLogo: 'Simple Crypto',
        configEntry: '配置',
        statusLoading: '读取中',
        statusConnected: '云端',
        statusLocal: '本地',
        statusUnavailable: '不可用',
        fixedIncomePanelTitle: '固定收益',
        strategyPanelTitle: '长线策略',
        currentPositionLabel: '当前持仓',
        buyLabel: '买入',
        sellLabel: '卖出',
        ratioLabel: '占比',
        liveLabel: '现价',
        amountUnit: '金额',
        quantityLabel: '数量',
        noFixedIncome: '暂无固定收益记录',
        noStrategy: '暂无长线策略',
        expired: '已到期',
        dueToday: '今天到期',
        days: '天',
        triggeredTitle: '已触发',
        notConfigured: '--'
    },
    en: {
        pageTitle: 'Simple Crypto',
        navLogo: 'Simple Crypto',
        configEntry: 'Config',
        statusLoading: 'Loading',
        statusConnected: 'Cloud',
        statusLocal: 'Local',
        statusUnavailable: 'Unavailable',
        fixedIncomePanelTitle: 'Fixed Income',
        strategyPanelTitle: 'Long-term Strategy',
        currentPositionLabel: 'Current Position',
        buyLabel: 'Buy',
        sellLabel: 'Sell',
        ratioLabel: 'Allocation',
        liveLabel: 'Live',
        amountUnit: 'Amount',
        quantityLabel: 'Quantity',
        noFixedIncome: 'No fixed income records',
        noStrategy: 'No long-term strategies',
        expired: 'Expired',
        dueToday: 'Due today',
        days: 'days',
        triggeredTitle: 'Triggered',
        notConfigured: '--'
    }
};

const overviewState = {
    lang: localStorage.getItem('crypto_language') || 'zh',
    snapshot: {
        fixedIncome: [],
        totalAmount: '',
        strategies: []
    },
    prices: {},
    alerts: {},
    remoteConfigured: false,
    usingLocalFallback: false,
    refreshTimer: null
};

document.addEventListener('DOMContentLoaded', async () => {
    syncLanguageButtons();
    applyOverviewCopy();
    await refreshOverview();
    overviewState.refreshTimer = window.setInterval(refreshOverview, 60000);
});

function switchOverviewLanguage(lang) {
    overviewState.lang = lang;
    localStorage.setItem('crypto_language', lang);
    syncLanguageButtons();
    applyOverviewCopy();
    renderOverview();
}

window.switchOverviewLanguage = switchOverviewLanguage;

function syncLanguageButtons() {
    document.querySelectorAll('.lang-btn').forEach(button => {
        button.classList.toggle('active', button.getAttribute('data-lang') === overviewState.lang);
    });
}

function applyOverviewCopy() {
    const text = getOverviewText();

    document.title = text.pageTitle;
    setText('overviewNavLogo', text.navLogo);
    setText('fixedIncomePanelTitle', text.fixedIncomePanelTitle);
    setText('strategyPanelTitle', text.strategyPanelTitle);

    const configLink = document.getElementById('configEntryLink');
    if (configLink) {
        configLink.textContent = text.configEntry;
    }

    updateOverviewStatus();
    renderOverview();
}

async function refreshOverview() {
    updateOverviewStatus(true);

    const results = await Promise.allSettled([
        fetchJson('/api/health'),
        fetchJson('/api/state'),
        fetchJson('/api/prices'),
        fetchJson('/api/alert-statuses')
    ]);

    const [healthResult, stateResult, pricesResult, alertsResult] = results;
    overviewState.remoteConfigured = healthResult.status === 'fulfilled' && Boolean(healthResult.value?.configured);

    if (stateResult.status === 'fulfilled' && stateResult.value?.state) {
        overviewState.snapshot = normalizeSnapshot(stateResult.value.state);
        overviewState.usingLocalFallback = false;
    } else {
        overviewState.snapshot = getLocalSnapshot();
        overviewState.usingLocalFallback = true;
    }

    overviewState.prices = pricesResult.status === 'fulfilled' && pricesResult.value?.prices && typeof pricesResult.value.prices === 'object'
        ? pricesResult.value.prices
        : {};

    overviewState.alerts = alertsResult.status === 'fulfilled' && alertsResult.value?.statuses && typeof alertsResult.value.statuses === 'object'
        ? alertsResult.value.statuses
        : {};

    updateOverviewStatus();
    renderOverview();
}

async function fetchJson(url) {
    const response = await fetch(url, {
        headers: { accept: 'application/json' }
    });

    if (!response.ok) {
        throw new Error(`${url} ${response.status}`);
    }

    return response.json();
}

function getLocalSnapshot() {
    return normalizeSnapshot({
        fixedIncome: parseJson(localStorage.getItem(STORAGE_KEYS.fixedIncome), []),
        totalAmount: localStorage.getItem(STORAGE_KEYS.totalAmount) || '',
        strategies: parseJson(localStorage.getItem(STORAGE_KEYS.strategies), [])
    });
}

function parseJson(value, fallback) {
    try {
        return value ? JSON.parse(value) : fallback;
    } catch {
        return fallback;
    }
}

function normalizeSnapshot(snapshot = {}) {
    return {
        fixedIncome: Array.isArray(snapshot.fixedIncome) ? snapshot.fixedIncome.slice().sort((left, right) => {
            return new Date(getRecordDisplayValue(left, 'end')) - new Date(getRecordDisplayValue(right, 'end'));
        }) : [],
        totalAmount: snapshot.totalAmount === undefined || snapshot.totalAmount === null ? '' : String(snapshot.totalAmount),
        strategies: normalizeStrategies(snapshot.strategies)
    };
}

function normalizeStrategies(strategies) {
    const list = Array.isArray(strategies)
        ? strategies
        : strategies && typeof strategies === 'object'
            ? Object.values(strategies)
            : null;

    if (!list) {
        return [];
    }

    return list
        .filter(strategy => strategy && typeof strategy === 'object')
        .map((strategy, index) => ({
            id: strategy.id || `strategy_${index + 1}`,
            token: String(strategy.token || '').trim().toUpperCase(),
            ratio: normalizeNumber(strategy.ratio, 0),
            currentQuantity: normalizeNumber(strategy.currentQuantity, null),
            levels: Array.isArray(strategy.levels)
                ? strategy.levels
                    .filter(level => level && typeof level === 'object')
                    .map((level, levelIndex) => ({
                        id: level.id || `${strategy.id || `strategy_${index + 1}`}_level_${levelIndex + 1}`,
                        price: normalizeNumber(level.price, null),
                        action: level.action === 'sell' ? 'sell' : 'buy',
                        ratio: normalizeNumber(level.ratio, 0)
                    }))
                : []
        }))
        .filter(strategy => strategy.token)
        .sort((left, right) => (right.ratio || 0) - (left.ratio || 0));
}

function normalizeNumber(value, fallback) {
    const numeric = Number.parseFloat(value);
    return Number.isFinite(numeric) ? numeric : fallback;
}

function renderOverview() {
    renderFixedIncomeOverview();
    renderStrategyOverview();
}

function renderFixedIncomeOverview() {
    const container = document.getElementById('overviewFixedIncome');
    if (!container) {
        return;
    }

    const text = getOverviewText();
    const items = overviewState.snapshot.fixedIncome;
    setText('fixedIncomeBadge', String(items.length));

    if (!items.length) {
        container.innerHTML = renderEmptyState(text.noFixedIncome);
        return;
    }

    container.innerHTML = items.map(item => {
        const remaining = calculateRemainingTime(getRecordDisplayValue(item, 'end'));
        const dayClass = remaining.days <= 7 ? 'is-danger' : remaining.days <= 30 ? 'is-warning' : '';
        const description = String(item.description || '').trim();

        return `
            <article class="overview-income-item">
                <div class="overview-income-main">
                    <div class="overview-income-top">
                        <span class="overview-token-chip">${escapeHtml(item.token || '--')}</span>
                        <span class="overview-platform-text">${escapeHtml(formatPlatformDisplay(item.platform))}</span>
                        <strong class="overview-income-apy">${formatPercent(item.apy)}</strong>
                        <span class="overview-income-days ${dayClass}">${remaining.label}</span>
                    </div>
                    <div class="overview-income-meta">
                        <span>${formatDateTime(getRecordDisplayValue(item, 'start'))}</span>
                        <span class="overview-income-separator"></span>
                        <span>${formatDateTime(getRecordDisplayValue(item, 'end'))}</span>
                    </div>
                    ${description ? `<p class="overview-income-detail" title="${escapeHtml(description)}">${escapeHtml(description)}</p>` : ''}
                </div>
            </article>
        `;
    }).join('');
}

function renderStrategyOverview() {
    const container = document.getElementById('overviewStrategies');
    if (!container) {
        return;
    }

    const text = getOverviewText();
    const strategies = overviewState.snapshot.strategies;
    setText('strategyBadge', String(strategies.length));

    if (!strategies.length) {
        container.innerHTML = renderEmptyState(text.noStrategy);
        return;
    }

    container.innerHTML = strategies.map(strategy => {
        const price = getLivePrice(strategy.token);
        const summary = getStrategySummary(strategy);
        const levels = strategy.levels
            .filter(level => hasLevelData(level))
            .sort((left, right) => {
                if (left.action !== right.action) {
                    return left.action === 'buy' ? -1 : 1;
                }

                return left.action === 'buy'
                    ? (right.price || 0) - (left.price || 0)
                    : (left.price || 0) - (right.price || 0);
            });
        const currentValue = price && strategy.currentQuantity ? price * strategy.currentQuantity : null;
        const metaParts = [`${formatWhole(strategy.ratio)}%`];
        const summaryParts = [];

        if (strategy.currentQuantity) {
            metaParts.push(formatQuantity(strategy.currentQuantity, strategy.token));
        }

        if ((summary.buyAmount || 0) > 0 || (summary.buyQuantity || 0) > 0) {
            summaryParts.push(`<span>${text.buyLabel} ${formatStrategyTotal(summary.buyAmount, summary.buyQuantity, strategy.token)}</span>`);
        }

        if ((summary.sellAmount || 0) > 0 || (summary.sellQuantity || 0) > 0) {
            summaryParts.push(`<span>${text.sellLabel} ${formatStrategyTotal(summary.sellAmount, summary.sellQuantity, strategy.token)}</span>`);
        }

        return `
            <article class="overview-strategy-card">
                <div class="overview-strategy-head">
                    <div class="overview-strategy-title">
                        <div class="overview-strategy-token-row">
                            <h3>${strategy.token}</h3>
                            ${renderLivePricePill(price)}
                        </div>
                        <p>${metaParts.join(' · ')}</p>
                        ${summaryParts.length ? `<div class="overview-strategy-summary">${summaryParts.join('')}</div>` : ''}
                    </div>
                    ${currentValue !== null ? `<div class="overview-strategy-value"><span>${formatMoney(currentValue)}</span></div>` : ''}
                </div>
                <div class="overview-level-chip-grid">
                    ${levels.length ? levels.map(level => renderLevelChip(strategy, level)).join('') : `<div class="overview-level-chip overview-level-chip-empty">${text.notConfigured}</div>`}
                </div>
            </article>
        `;
    }).join('');
}

function renderLevelChip(strategy, level) {
    const alert = getAlertState(strategy.id, level.id);
    const amount = getLevelAmount(level, strategy);
    const quantity = getLevelQuantity(level, strategy);
    const classes = [
        'overview-level-chip',
        level.action === 'sell' ? 'is-sell' : 'is-buy',
        alert.triggered ? 'is-triggered' : ''
    ].filter(Boolean).join(' ');

    return `
        <div class="${classes}" title="${escapeHtml(alert.title)}">
            <div class="overview-level-chip-top">
                <span class="overview-level-action">${level.action === 'sell' ? getOverviewText().sellLabel : getOverviewText().buyLabel}</span>
                <strong>${formatPrice(level.price)}</strong>
                <span>${formatWhole(level.ratio)}%</span>
            </div>
            <div class="overview-level-chip-bottom">${formatMoney(amount)} · ${formatQuantity(quantity, strategy.token)}</div>
        </div>
    `;
}

function renderLivePricePill(price) {
    const text = getOverviewText();

    return `
        <div class="strategy-live-price ${price === null ? 'is-unavailable' : ''}">
            <span class="strategy-live-label">${text.liveLabel}</span>
            <span class="strategy-live-value">${price === null ? '--' : formatPrice(price)}</span>
        </div>
    `;
}

function renderEmptyState(title) {
    return `
        <div class="overview-empty-state">
            <p>${title}</p>
        </div>
    `;
}

function updateOverviewStatus(isLoading = false) {
    const statusNode = document.getElementById('overviewStatus');
    const textNode = document.getElementById('overviewStatusText');
    if (!statusNode || !textNode) {
        return;
    }

    const text = getOverviewText();
    let label = text.statusConnected;
    statusNode.classList.remove('is-connected', 'is-connecting');

    if (isLoading) {
        label = text.statusLoading;
        statusNode.classList.add('is-connecting');
    } else if (!overviewState.remoteConfigured) {
        label = text.statusUnavailable;
    } else if (overviewState.usingLocalFallback) {
        label = text.statusLocal;
    } else {
        statusNode.classList.add('is-connected');
    }

    textNode.textContent = label;
}

function getOverviewText() {
    return OVERVIEW_COPY[overviewState.lang] || OVERVIEW_COPY.zh;
}

function setText(id, value) {
    const node = document.getElementById(id);
    if (node) {
        node.textContent = value;
    }
}

function getAlertState(strategyId, levelId) {
    const text = getOverviewText();
    const alert = overviewState.alerts[`${strategyId}:${levelId}`];

    if (!alert || !(alert.lastNotifiedAt || alert.isMet)) {
        return { triggered: false, title: '' };
    }

    const date = alert.lastNotifiedAt ? new Date(alert.lastNotifiedAt) : null;
    const formatted = date && !Number.isNaN(date.getTime())
        ? ` · ${date.toLocaleString(overviewState.lang === 'zh' ? 'zh-CN' : 'en-US', {
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        })}`
        : '';

    return {
        triggered: true,
        title: `${text.triggeredTitle}${formatted}`
    };
}

function getLivePrice(token) {
    const price = normalizeNumber(overviewState.prices[token], null);
    return price && price > 0 ? price : null;
}

function getLevelAmount(level, strategy) {
    if (!level || !Number.isFinite(level.ratio) || level.ratio <= 0) {
        return null;
    }

    if (level.action === 'sell') {
        if (!Number.isFinite(strategy.currentQuantity) || strategy.currentQuantity <= 0 || !Number.isFinite(level.price) || level.price <= 0) {
            return null;
        }

        return strategy.currentQuantity * (level.ratio / 100) * level.price;
    }

    const totalAmount = normalizeNumber(overviewState.snapshot.totalAmount, null);
    if (!totalAmount || totalAmount <= 0) {
        return null;
    }

    return totalAmount * (level.ratio / 100);
}

function getLevelQuantity(level, strategy) {
    if (!level || !Number.isFinite(level.ratio) || level.ratio <= 0) {
        return null;
    }

    if (level.action === 'sell') {
        if (!Number.isFinite(strategy.currentQuantity) || strategy.currentQuantity <= 0) {
            return null;
        }

        return strategy.currentQuantity * (level.ratio / 100);
    }

    const amount = getLevelAmount(level, strategy);
    if (!amount || !Number.isFinite(level.price) || level.price <= 0) {
        return null;
    }

    return amount / level.price;
}

function getStrategySummary(strategy) {
    return strategy.levels.reduce((summary, level) => {
        if (!hasLevelData(level)) {
            return summary;
        }

        const amount = getLevelAmount(level, strategy);
        const quantity = getLevelQuantity(level, strategy);

        if (level.action === 'sell') {
            summary.sellAmount += amount || 0;
            summary.sellQuantity += quantity || 0;
            return summary;
        }

        summary.buyAmount += amount || 0;
        summary.buyQuantity += quantity || 0;
        return summary;
    }, {
        buyAmount: 0,
        buyQuantity: 0,
        sellAmount: 0,
        sellQuantity: 0
    });
}

function hasLevelData(level) {
    return Number.isFinite(level?.price) && level.price > 0 && Number.isFinite(level?.ratio) && level.ratio > 0;
}

function formatPercent(value) {
    const numeric = normalizeNumber(value, null);
    return numeric === null ? '--' : `${trimZeros(numeric.toFixed(2))}%`;
}

function formatMoney(value) {
    const numeric = normalizeNumber(value, null);
    if (numeric === null || numeric <= 0) {
        return '--';
    }

    return `${formatNumber(numeric)} U`;
}

function formatPrice(value) {
    const numeric = normalizeNumber(value, null);
    if (numeric === null || numeric <= 0) {
        return '--';
    }

    return `$${numeric.toLocaleString('en-US', {
        maximumFractionDigits: numeric >= 1 ? 2 : 6
    })}`;
}

function formatNumber(value) {
    return Number(value).toLocaleString('en-US', {
        maximumFractionDigits: 8
    });
}

function formatWhole(value) {
    const numeric = normalizeNumber(value, 0);
    return String(Math.round(numeric));
}

function formatQuantity(value, token) {
    const numeric = normalizeNumber(value, null);
    if (numeric === null || numeric <= 0) {
        return '--';
    }

    let precision = 8;
    if (numeric >= 1000) {
        precision = 2;
    } else if (numeric >= 100) {
        precision = 3;
    } else if (numeric >= 1) {
        precision = 4;
    } else if (numeric >= 0.01) {
        precision = 6;
    }

    return `${trimZeros(numeric.toFixed(precision))} ${token}`;
}

function formatStrategyTotal(amount, quantity, token) {
    const amountText = formatMoney(amount);
    const quantityText = formatQuantity(quantity, token);
    return `${amountText} · ${quantityText}`;
}

function trimZeros(value) {
    return String(value).replace(/(\.\d*?[1-9])0+$/u, '$1').replace(/\.0+$/u, '').replace(/\.$/u, '');
}

function formatText(template, values) {
    return Object.entries(values).reduce((result, [key, value]) => {
        return result.replaceAll(`{${key}}`, value);
    }, template);
}

function formatPlatformDisplay(platform) {
    const key = String(platform || '').trim();
    if (PLATFORM_TRANSLATIONS[key]) {
        return PLATFORM_TRANSLATIONS[key][overviewState.lang];
    }
    return key || '--';
}

function getRecordDisplayValue(item, type) {
    const atKey = type === 'start' ? 'startAt' : 'endAt';
    const dateKey = type === 'start' ? 'startDate' : 'endDate';
    return item?.[atKey] || item?.[dateKey] || '';
}

function formatDateTime(value) {
    if (!value) {
        return '--';
    }

    const date = parseDisplayDateValue(value, false);
    if (Number.isNaN(date.getTime())) {
        return value;
    }

    const locale = overviewState.lang === 'zh' ? 'zh-CN' : 'en-US';
    const hasTime = typeof value === 'string' && value.includes('T') && !value.endsWith('T00:00');

    return date.toLocaleString(locale, hasTime ? {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    } : {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

function calculateRemainingTime(endDate) {
    const text = getOverviewText();
    if (!endDate) {
        return { days: Infinity, label: '--' };
    }

    const parsed = parseDisplayDateValue(endDate, true);
    if (Number.isNaN(parsed.getTime())) {
        return { days: Infinity, label: '--' };
    }

    const diff = parsed.getTime() - Date.now();
    const days = Math.ceil(diff / 86400000);

    if (days < 0) {
        return { days, label: text.expired };
    }

    if (days === 0) {
        return { days, label: text.dueToday };
    }

    return { days, label: `${days} ${text.days}` };
}

function parseDisplayDateValue(value, useEndOfDay) {
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
        const [year, month, day] = value.split('-').map(Number);
        return useEndOfDay
            ? new Date(year, month - 1, day, 23, 59, 59, 999)
            : new Date(year, month - 1, day);
    }

    return new Date(value);
}

function escapeHtml(value) {
    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
