// ===== 数据存储键 =====
const KEYS = {
    FIXED_INCOME: 'crypto_fixed_income',
    TOTAL_AMOUNT: 'crypto_total_amount',
    STRATEGIES: 'crypto_strategies'
};

// ===== 默认策略数据 =====
const MAINSTREAM_TOKENS = ['BTC', 'ETH', 'BNB', 'AAVE', 'SKY', 'HYPE', 'SOL', 'UNI', 'PENDLE', 'APT'];
const DEFAULT_STRATEGY_SEED_AMOUNT = 10000;
const STRATEGY_PRICE_REFRESH_MS = 60000;
const DEFAULT_STRATEGY_BLUEPRINTS = {
    BTC: {
        ratio: 60,
        levels: [
            { price: 65000, action: 'buy', ratio: 9 },
            { price: 50000, action: 'buy', ratio: 12 },
            { price: 40000, action: 'buy', ratio: 18 },
            { price: 30000, action: 'buy', ratio: 21 }
        ]
    },
    ETH: {
        ratio: 30,
        levels: [
            { price: 4500, action: 'sell', ratio: 30 },
            { price: 6000, action: 'sell', ratio: 30 },
            { price: 1800, action: 'buy', ratio: 5 },
            { price: 1500, action: 'buy', ratio: 6 },
            { price: 1200, action: 'buy', ratio: 8 },
            { price: 1000, action: 'buy', ratio: 9 }
        ]
    },
    BNB: {
        ratio: 10,
        levels: [
            { price: 1200, action: 'sell', ratio: 30 },
            { price: 1800, action: 'sell', ratio: 30 },
            { price: 400, action: 'buy', ratio: 2 },
            { price: 300, action: 'buy', ratio: 3 },
            { price: 200, action: 'buy', ratio: 4 }
        ]
    }
};
const PLATFORM_TRANSLATIONS = {
    binance_exchange: {
        zh: 'Binance 主站',
        en: 'Binance Exchange'
    },
    binance_wallet: {
        zh: 'Binance 钱包',
        en: 'Binance Wallet'
    },
    okx_exchange: {
        zh: 'OKX 主站',
        en: 'OKX Exchange'
    },
    okx_wallet: {
        zh: 'OKX 钱包',
        en: 'OKX Wallet'
    },
    aave: {
        zh: 'Aave',
        en: 'Aave'
    },
    uniswap: {
        zh: 'Uniswap',
        en: 'Uniswap'
    },
    pendle: {
        zh: 'Pendle',
        en: 'Pendle'
    },
    venus: {
        zh: 'Venus',
        en: 'Venus'
    },
    buidlpad: {
        zh: 'Buidlpad',
        en: 'Buidlpad'
    }
};

let currentLang = 'zh';
const PICKER_COPY = {
    zh: {
        weekdays: ['日', '一', '二', '三', '四', '五', '六'],
        clear: '清除',
        today: '今天',
        now: '现在',
        done: '完成',
        dateTitle: '选择日期',
        timeTitle: '选择时间',
        hour: '小时',
        minute: '分钟'
    },
    en: {
        weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        clear: 'Clear',
        today: 'Today',
        now: 'Now',
        done: 'Done',
        dateTitle: 'Select date',
        timeTitle: 'Select time',
        hour: 'Hour',
        minute: 'Minute'
    }
};
const pickerState = {
    activeInput: null,
    mode: null,
    dateCursor: new Date(),
    selectedHour: '00',
    selectedMinute: '00',
    elements: {}
};
const toastState = {
    container: null,
    timer: null
};
const confirmState = {
    resolver: null
};
const remoteState = {
    available: false,
    connected: false,
    loading: false
};
const strategyPriceState = {
    values: {},
    loading: false,
    timer: null
};
const strategyAlertState = {
    statuses: {},
    loading: false,
    timer: null
};

// ===== 语言包 =====
const LANGUAGES = {
    zh: {
        pageTitle: 'Simple Crypto',
        navLogo: 'Simple Crypto',
        overviewEntry: '总览',
        heroSubtitle: '简单安全的加密货币理财策略',
        heroAction: '开始使用',
        heroSecondaryAction: '查看策略',
        heroNote: '无需后端，无需同步，所有数据都保留在你的浏览器里。',
        heroPanelLabel: '资产脉冲',
        metric1Label: '存储',
        metric1Value: '100% 本地',
        metric2Label: '工作流',
        metric2Value: '收益 + 策略',
        metric3Label: '速度',
        metric3Value: '即时更新',
        heroTag: '风险感知',
        overview1Label: '模式',
        overview1Value: '手动控制',
        overview1Note: '无需托管后端，也不依赖账户体系。',
        overview2Label: '核心模块',
        overview2Value: '收益 + 策略',
        overview2Note: '把到期管理和仓位计划放在同一工作区。',
        overview3Label: '决策方式',
        overview3Value: '冷静且系统',
        overview3Note: '适合纪律化复盘，而不是噪音驱动。',
        overview4Label: '工作台',
        overview4Value: '操盘面板',
        overview4Note: '结构更像控制台，而不是普通落地页。',
        fixedIncomeSectionTitle: '固定收益',
        fixedIncomeEyebrow: '收益账本',
        fixedIncomeSectionSubtitle: '把到期时间、平台和收益率放进同一个高可读视图。',
        strategySectionTitle: '长线策略',
        strategyEyebrow: '策略矩阵',
        strategySectionSubtitle: '用更像交易台的方式查看分配、价格档位和执行动作。',
        strategyActionsLabel: '导出策略',
        sideCard1Label: '操作原则',
        sideCard1Title: '先结构，后执行',
        sideCard1Text: '把记录、到期时间和价格梯度放进同一个受控的复盘流程。',
        sideCard2Label: '检查清单',
        sideList1: '调整仓位前先看即将到期的收益记录。',
        sideList2: '导出策略前先确认总资金输入。',
        sideList3: '备注尽量短，但要足够支持决策。',
        sideCard3Label: '系统画像',
        sideStat1Label: '数据',
        sideStat1Value: '仅本地',
        sideStat2Label: '风格',
        sideStat2Value: '操盘优先',
        addButton: '添加记录',
        strategyButton: '策略说明',
        totalAmountLabel: '初始总金额 (U)',
        totalAmountHint: '设置后自动计算各档位金额与数量',
        strategyTokenLabel: '主流币',
        currentPositionLabel: '当前额度',
        strategySelectPlaceholder: '选择币种',
        addStrategyButton: '添加策略',
        addLevelButton: '添加档位',
        deleteStrategyButton: '删除策略',
        deleteLevelButton: '删除档位',
        copyTextButton: '复制为文本',
        copyMarkdownButton: '复制为 Markdown',
        footerText: '© 2026 Crypto Tracker. 数据存储在本地，绝不上传。',
        fixedIncomeModalTitle: '添加固定收益记录',
        tokenLabel: '代币名称',
        tokenPlaceholder: '输入或选择代币',
        platformLabel: '平台',
        platformPlaceholder: '输入或选择平台',
        apyLabel: '年化收益率 (%)',
        startDateLabel: '开始日期',
        endDateLabel: '结束日期',
        addTimeToggle: '添加时间',
        descriptionLabel: '详细说明',
        descriptionPlaceholder: '输入详细信息...',
        syncModalTitle: '云端同步',
        syncPasswordLabel: '访问口令',
        syncPasswordPlaceholder: '输入云端访问口令',
        syncPasswordHint: '连接后，记录会同步到云端数据库。',
        syncConnectButton: '连接云端',
        syncStatusLocal: '本地模式',
        syncStatusDisconnected: '云端可用',
        syncStatusConnected: '云端已连接',
        syncStatusConnecting: '连接中',
        syncConnected: '已连接到云端',
        syncConnectFailed: '云端暂不可用',
        syncMigrated: '云端数据已加载',
        syncSaveFailed: '云端保存失败，已保留本地数据',
        syncRemoteReady: '云端存储已启用',
        cancelButton: '取消',
        saveButton: '保存',
        tokenRequiredError: '请输入代币名称',
        platformRequiredError: '请输入平台',
        apyRequiredError: '请输入有效的年化收益率',
        detailModalTitle: '详细说明',
        closeButton: '关闭',
        emptyState: '暂无固定收益记录',
        emptyHint: '点击右上角按钮添加第一条记录',
        strategyEmpty: '暂无长线策略，请先添加主流币',
        strategyLevelsEmpty: '暂无价格档位',
        tokenColumn: '代币',
        platformColumn: '平台',
        startColumn: '开始日期',
        endColumn: '结束日期',
        daysLeftColumn: '剩余时间',
        actionColumn: '操作',
        levelRatioColumn: '档位占比',
        quantityColumn: '数量',
        currentPriceLabel: '现价',
        detail: '详情',
        days: '天',
        expired: '已到期',
        today: '今天到期',
        delete: '删除',
        confirmModalTitle: '删除确认',
        dateError: '结束日期必须晚于开始日期',
        dateRequiredError: '请选择开始日期和结束日期',
        confirmDelete: '确定要删除这条记录吗？',
        confirmDeleteStrategy: '确定要删除这个代币策略吗？',
        confirmDeleteLevel: '确定要删除这个价格档位吗？',
        strategyDuplicateError: '该代币策略已存在',
        strategySelectRequired: '请先选择一个主流币',
        strategyCopyEmpty: '请先添加至少一个长线策略',
        strategyLevelRatioExceeded: '同一方向的档位占比合计不能超过代币总占比',
        strategyRatioTooSmall: '代币总占比不能低于买入档位占比合计',
        strategyTotalRatioExceeded: '所有代币总占比不能超过 100%',
        copied: '已复制到剪贴板',
        copyFailed: '复制失败',
        strategyTitle: '策略说明',
        strategyConcept: '💡 核心概念',
        initialAmount: '初始总金额',
        ratio: '占比',
        strategyRatioLabel: '代币占比',
        priceLevel: '价格档位',
        actionLabel: '操作',
        amountUnit: '金额 (U)',
        strategyLevelCount: '{count} 个档位',
        strategyRatioSummary: '买入 {buy}% / 目标 {target}% · 卖出 {sell}% / 当前额度',
        totalLabel: '总计',
        buyTotalLabel: '买入',
        sellTotalLabel: '卖出',
        quantityPattern: '{quantity} {token}',
        strategyCase: '📊 实际案例',
        example1: '初始 10,000U，BTC 目标占比 60%',
        example2: '当 BTC 跌至 $65,000 时，计划买入 900U',
        example3: '→ 数量：900 ÷ 65,000 = 0.013846 BTC',
        buy: '买入',
        sell: '卖出',
        detailTitlePattern: '{token} - {platform} 详细说明',
        strategyKnow: '知道了'
    },
    en: {
        pageTitle: 'Simple Crypto',
        navLogo: 'Simple Crypto',
        overviewEntry: 'Overview',
        heroSubtitle: 'Simple and safer crypto wealth strategies',
        heroAction: 'Get Started',
        heroSecondaryAction: 'View Strategy',
        heroNote: 'No backend, no sync exposure, and all data stays in your browser.',
        heroPanelLabel: 'Portfolio Pulse',
        metric1Label: 'Storage',
        metric1Value: '100% Local',
        metric2Label: 'Workflow',
        metric2Value: 'Yield + Strategy',
        metric3Label: 'Speed',
        metric3Value: 'Instant updates',
        heroTag: 'Risk aware',
        overview1Label: 'Mode',
        overview1Value: 'Manual control',
        overview1Note: 'No hosted backend and no account dependency.',
        overview2Label: 'Core modules',
        overview2Value: 'Yield + strategy',
        overview2Note: 'Manage expiries and allocation plans in one workspace.',
        overview3Label: 'Decision style',
        overview3Value: 'Calm and systematic',
        overview3Note: 'Built for disciplined review rather than noise.',
        overview4Label: 'Workspace',
        overview4Value: 'Operator dashboard',
        overview4Note: 'Structured like a control panel, not a generic landing page.',
        fixedIncomeSectionTitle: 'Fixed Income',
        fixedIncomeEyebrow: 'Income Book',
        fixedIncomeSectionSubtitle: 'Track maturity, platform, and APY in one premium high-clarity view.',
        strategySectionTitle: 'Long-term Strategy',
        strategyEyebrow: 'Strategy Matrix',
        strategySectionSubtitle: 'Review allocations, trigger levels, and actions in a more desk-like layout.',
        strategyActionsLabel: 'Export strategy',
        sideCard1Label: 'Operating principles',
        sideCard1Title: 'Structure before execution',
        sideCard1Text: 'Keep records, maturity timing, and price ladders in one controlled review flow.',
        sideCard2Label: 'Review checklist',
        sideList1: 'Check upcoming expiries before reallocating.',
        sideList2: 'Confirm total capital before exporting strategy plans.',
        sideList3: 'Keep notes concise but decision-ready.',
        sideCard3Label: 'System profile',
        sideStat1Label: 'Data',
        sideStat1Value: 'Local only',
        sideStat2Label: 'Style',
        sideStat2Value: 'Operator-first',
        addButton: 'Add Record',
        strategyButton: 'Strategy Info',
        totalAmountLabel: 'Initial Total Amount (U)',
        totalAmountHint: 'Set it to auto-calculate each level amount and quantity',
        strategyTokenLabel: 'Mainstream Token',
        currentPositionLabel: 'Current Position',
        strategySelectPlaceholder: 'Select a token',
        addStrategyButton: 'Add Strategy',
        addLevelButton: 'Add Level',
        deleteStrategyButton: 'Delete Strategy',
        deleteLevelButton: 'Delete Level',
        copyTextButton: 'Copy as Text',
        copyMarkdownButton: 'Copy as Markdown',
        footerText: '© 2026 Crypto Tracker. Your data stays local and never uploads.',
        fixedIncomeModalTitle: 'Add Fixed Income Record',
        tokenLabel: 'Token',
        tokenPlaceholder: 'Type or pick a token',
        platformLabel: 'Platform',
        platformPlaceholder: 'Type or pick a platform',
        apyLabel: 'APY (%)',
        startDateLabel: 'Start Date',
        endDateLabel: 'End Date',
        addTimeToggle: 'Add time',
        descriptionLabel: 'Notes',
        descriptionPlaceholder: 'Add more details...',
        syncModalTitle: 'Cloud Sync',
        syncPasswordLabel: 'Access Password',
        syncPasswordPlaceholder: 'Enter the cloud access password',
        syncPasswordHint: 'Once connected, your records sync to the hosted database.',
        syncConnectButton: 'Connect Cloud',
        syncStatusLocal: 'Local Mode',
        syncStatusDisconnected: 'Cloud Ready',
        syncStatusConnected: 'Cloud Connected',
        syncStatusConnecting: 'Connecting',
        syncConnected: 'Connected to cloud storage',
        syncConnectFailed: 'Cloud storage is unavailable',
        syncMigrated: 'Cloud data loaded',
        syncSaveFailed: 'Cloud save failed. Your local copy is still preserved',
        syncRemoteReady: 'Hosted storage is enabled',
        cancelButton: 'Cancel',
        saveButton: 'Save',
        tokenRequiredError: 'Please enter a token',
        platformRequiredError: 'Please enter a platform',
        apyRequiredError: 'Please enter a valid APY',
        detailModalTitle: 'Details',
        closeButton: 'Close',
        emptyState: 'No fixed income records',
        emptyHint: 'Click the button above to add your first record',
        strategyEmpty: 'No long-term strategy yet. Add a mainstream token first',
        strategyLevelsEmpty: 'No price levels yet',
        tokenColumn: 'Token',
        platformColumn: 'Platform',
        startColumn: 'Start Date',
        endColumn: 'End Date',
        daysLeftColumn: 'Time Left',
        actionColumn: 'Action',
        levelRatioColumn: 'Level Ratio',
        quantityColumn: 'Quantity',
        currentPriceLabel: 'Live',
        detail: 'Details',
        days: 'days',
        expired: 'Expired',
        today: 'Due today',
        delete: 'Delete',
        confirmModalTitle: 'Delete Confirmation',
        dateError: 'End date must be later than start date',
        dateRequiredError: 'Please select both start and end dates',
        confirmDelete: 'Are you sure you want to delete this record?',
        confirmDeleteStrategy: 'Delete this token strategy?',
        confirmDeleteLevel: 'Delete this price level?',
        strategyDuplicateError: 'This token strategy already exists',
        strategySelectRequired: 'Please select a mainstream token first',
        strategyCopyEmpty: 'Add at least one long-term strategy first',
        strategyLevelRatioExceeded: 'Combined level ratio for the same side cannot exceed the token allocation',
        strategyRatioTooSmall: 'Token allocation cannot be lower than the total buy-side level ratio',
        strategyTotalRatioExceeded: 'Total token allocation cannot exceed 100%',
        copied: 'Copied to clipboard',
        copyFailed: 'Copy failed',
        strategyTitle: 'Strategy Explanation',
        strategyConcept: '💡 Key Concepts',
        initialAmount: 'Initial Total Amount',
        ratio: 'Ratio',
        strategyRatioLabel: 'Token Allocation',
        priceLevel: 'Price Level',
        actionLabel: 'Action',
        amountUnit: 'Amount (U)',
        strategyLevelCount: '{count} levels',
        strategyRatioSummary: 'Buy {buy}% / Target {target}% · Sell {sell}% / Current Position',
        totalLabel: 'Totals',
        buyTotalLabel: 'Buy',
        sellTotalLabel: 'Sell',
        quantityPattern: '{quantity} {token}',
        strategyCase: '📊 Real Example',
        example1: 'Initial 10,000U, BTC target allocation 60%',
        example2: 'When BTC drops to $65,000, plan to buy 900U',
        example3: '→ Quantity: 900 ÷ 65,000 = 0.013846 BTC',
        buy: 'Buy',
        sell: 'Sell',
        detailTitlePattern: '{token} - {platform} Details',
        strategyKnow: 'Got it'
    }
};

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', async function() {
    const savedLang = localStorage.getItem('crypto_language') || 'zh';
    currentLang = savedLang;

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
    });

    initTokenChips();
    initPlatformChips();
    initToast();
    initFieldFeedback();
    initCustomPickers();
    initStrategyEditor();
    await initializeRemoteSync();
    loadTotalAmount();
    updatePageText();
    await startStrategyPriceFeed();
    await startStrategyAlertStatusFeed();
});

// ===== 切换语言 =====
function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('crypto_language', lang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    updatePageText();
}

// ===== 更新页面文本 =====
function updatePageText() {
    const text = LANGUAGES[currentLang];
    document.title = text.pageTitle;

    document.querySelector('.nav-logo').textContent = text.navLogo;
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        heroSubtitle.textContent = text.heroSubtitle;
    }
    updateStaticI18n(text);
    updatePlatformChipLabels();
    updateSyncButton();

    const fixedIncomeSection = document.getElementById('fixed-income');
    if (fixedIncomeSection) {
        const addBtn = fixedIncomeSection.querySelector('.section-header .apple-button-secondary');
        if (addBtn) {
            addBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>${text.addButton}`;
        }
    }

    loadFixedIncome();
    renderStrategies();
    renderOpenPicker();
}

// ===== 云端同步 =====

async function initializeRemoteSync() {
    remoteState.loading = true;
    updateSyncButton();

    try {
        const response = await fetch('/api/health', {
            headers: { accept: 'application/json' }
        });

        if (!response.ok) {
            remoteState.available = false;
            remoteState.loading = false;
            updateSyncButton();
            return;
        }

        const result = await response.json();
        remoteState.available = Boolean(result.configured);
    } catch (error) {
        remoteState.available = false;
    }

    if (!remoteState.available) {
        remoteState.loading = false;
        updateSyncButton();
        return;
    }

    if (remoteState.available) {
        const connected = await connectRemoteStorage(true);
        if (connected) {
            remoteState.loading = false;
            updateSyncButton();
            return;
        }
    }

    remoteState.loading = false;
    updateSyncButton();
}

function getSyncStatusLabel() {
    const text = LANGUAGES[currentLang];

    if (remoteState.loading) {
        return text.syncStatusConnecting;
    }

    if (remoteState.connected) {
        return text.syncStatusConnected;
    }

    if (remoteState.available) {
        return text.syncStatusDisconnected;
    }

    return text.syncStatusLocal;
}

function updateSyncButton() {
    const button = document.getElementById('syncButton');
    const textNode = document.getElementById('syncButtonText');

    if (!button || !textNode) {
        return;
    }

    textNode.textContent = getSyncStatusLabel();
    button.classList.toggle('is-connected', remoteState.connected);
    button.classList.toggle('is-connecting', remoteState.loading);
}

async function openSyncModal() {
    if (!remoteState.available) {
        showToast(LANGUAGES[currentLang].syncStatusLocal, 'info');
        return;
    }

    if (remoteState.connected) {
        showToast(LANGUAGES[currentLang].syncConnected, 'success');
        return;
    }

    remoteState.loading = true;
    updateSyncButton();
    await connectRemoteStorage(false);
    remoteState.loading = false;
    updateSyncButton();
}

function closeSyncModal() {
    const input = document.getElementById('syncPassword');
    if (input) {
        input.classList.remove('is-invalid');
    }
    document.getElementById('syncModal').classList.remove('active');
}

async function submitSyncAuth(event) {
    event.preventDefault();
    remoteState.loading = true;
    updateSyncButton();

    const connected = await connectRemoteStorage(false);
    remoteState.loading = false;
    updateSyncButton();

    if (connected) {
        closeSyncModal();
    }
}

async function connectRemoteStorage(silent) {
    try {
        const remoteData = await requestRemoteState();
        const normalizedRemote = normalizeSnapshot(remoteData.state);

        remoteState.connected = true;
        applySnapshotToLocalStorage(normalizedRemote);

        loadTotalAmount();
        loadFixedIncome();
        renderStrategies();

        if (!silent) {
            showToast(LANGUAGES[currentLang].syncConnected, 'success');
        }

        updateSyncButton();
        return true;
    } catch (error) {
        remoteState.connected = false;

        if (!silent) {
            showToast(LANGUAGES[currentLang].syncConnectFailed, 'error');
        }

        updateSyncButton();
        return false;
    }
}

async function syncStateToRemote() {
    if (!remoteState.available || !remoteState.connected) {
        return;
    }

    try {
        await pushSnapshotToRemote(getLocalSnapshot());
    } catch (error) {
        remoteState.connected = false;
        updateSyncButton();
        showToast(LANGUAGES[currentLang].syncSaveFailed, 'error');
    }
}

async function requestRemoteState() {
    const response = await fetch('/api/state', {
        headers: {
            accept: 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`Remote load failed: ${response.status}`);
    }

    return response.json();
}

async function pushSnapshotToRemote(snapshot) {
    const response = await fetch('/api/state', {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            accept: 'application/json'
        },
        body: JSON.stringify({
            state: normalizeSnapshot(snapshot)
        })
    });

    if (!response.ok) {
        throw new Error(`Remote save failed: ${response.status}`);
    }

    return response.json();
}

function getLocalSnapshot() {
    return normalizeSnapshot({
        fixedIncome: JSON.parse(localStorage.getItem(KEYS.FIXED_INCOME) || '[]'),
        totalAmount: localStorage.getItem(KEYS.TOTAL_AMOUNT) || '',
        strategies: JSON.parse(localStorage.getItem(KEYS.STRATEGIES) || 'null')
    });
}

function applySnapshotToLocalStorage(snapshot) {
    const normalized = normalizeSnapshot(snapshot);

    localStorage.setItem(KEYS.FIXED_INCOME, JSON.stringify(normalized.fixedIncome));
    localStorage.setItem(KEYS.TOTAL_AMOUNT, normalized.totalAmount);
    localStorage.setItem(KEYS.STRATEGIES, JSON.stringify(normalized.strategies));
}

function normalizeSnapshot(snapshot = {}) {
    const totalAmount = snapshot.totalAmount === undefined || snapshot.totalAmount === null ? '' : String(snapshot.totalAmount);

    return {
        fixedIncome: Array.isArray(snapshot.fixedIncome) ? snapshot.fixedIncome : [],
        totalAmount,
        strategies: normalizeStrategies(snapshot.strategies, totalAmount)
    };
}

function hasLocalData(snapshot) {
    return snapshot.fixedIncome.length > 0 || Boolean(snapshot.totalAmount);
}

function isStateEmpty(snapshot) {
    return snapshot.fixedIncome.length === 0 && !snapshot.totalAmount;
}

function initToast() {
    if (toastState.container) {
        return;
    }

    document.body.insertAdjacentHTML('beforeend', '<div class="toast-stack" id="toastStack" aria-live="polite" aria-atomic="true"></div>');
    toastState.container = document.getElementById('toastStack');
}

function showToast(message, type = 'info') {
    if (!message) {
        return;
    }

    if (!toastState.container) {
        initToast();
    }

    window.clearTimeout(toastState.timer);

    toastState.container.innerHTML = `
        <div class="toast toast-${type}">
            <span class="toast-mark"></span>
            <span class="toast-message">${message}</span>
        </div>
    `;

    const toast = toastState.container.querySelector('.toast');
    requestAnimationFrame(() => toast.classList.add('is-visible'));

    toastState.timer = window.setTimeout(() => {
        toast.classList.remove('is-visible');
        window.setTimeout(() => {
            if (toastState.container) {
                toastState.container.innerHTML = '';
            }
        }, 220);
    }, 2800);
}

function initFieldFeedback() {
    document.querySelectorAll('#fixedIncomeForm .form-input, #fixedIncomeForm .form-textarea, #syncForm .form-input').forEach(field => {
        field.addEventListener('input', () => field.classList.remove('is-invalid'));
        field.addEventListener('change', () => field.classList.remove('is-invalid'));
    });
}

function showFieldError(message, fieldIds = []) {
    fieldIds.forEach(id => {
        const field = document.getElementById(id);
        if (field) {
            field.classList.add('is-invalid');
        }
    });

    showToast(message, 'error');
}

function clearFieldErrors() {
    document.querySelectorAll('#fixedIncomeForm .is-invalid').forEach(field => {
        field.classList.remove('is-invalid');
    });
}

// ===== 自定义日期 / 时间选择器 =====

function initCustomPickers() {
    createPickerShell();

    document.querySelectorAll('.picker-input').forEach(input => {
        input.addEventListener('click', () => openPickerForInput(input));
        input.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openPickerForInput(input);
            }

            if (event.key === 'Escape') {
                closePickerPopovers();
            }
        });
    });

    document.addEventListener('mousedown', event => {
        const clickedPicker = event.target.closest('.picker-popover');
        const clickedInput = event.target.closest('.picker-input');

        if (!clickedPicker && !clickedInput) {
            closePickerPopovers();
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            closePickerPopovers();
        }
    });

    document.querySelectorAll('.modal-form').forEach(form => {
        form.addEventListener('scroll', positionActivePicker);
    });

    window.addEventListener('resize', positionActivePicker);
}

function createPickerShell() {
    if (pickerState.elements.date && pickerState.elements.time) {
        return;
    }

    document.body.insertAdjacentHTML('beforeend', `
        <div class="picker-popover" id="datePickerPopover" hidden>
            <div class="picker-surface">
                <div class="picker-header">
                    <button type="button" class="picker-nav" data-direction="-1" aria-label="Previous month">&#8249;</button>
                    <div class="picker-header-copy">
                        <div class="picker-title" data-role="title"></div>
                    </div>
                    <button type="button" class="picker-nav" data-direction="1" aria-label="Next month">&#8250;</button>
                </div>
                <div class="picker-weekdays" data-role="weekdays"></div>
                <div class="picker-days" data-role="days"></div>
                <div class="picker-footer">
                    <button type="button" class="picker-action picker-action-secondary" data-action="clear"></button>
                    <button type="button" class="picker-action picker-action-primary" data-action="today"></button>
                </div>
            </div>
        </div>
        <div class="picker-popover picker-popover-time" id="timePickerPopover" hidden>
            <div class="picker-surface">
                <div class="picker-header picker-header-time">
                    <div class="picker-header-copy">
                        <div class="picker-label" data-role="label"></div>
                        <div class="time-picker-preview" data-role="preview"></div>
                    </div>
                </div>
                <div class="time-picker-columns">
                    <div class="time-picker-group">
                        <div class="picker-label" data-role="hour-label"></div>
                        <div class="time-picker-options" data-role="hours"></div>
                    </div>
                    <div class="time-picker-group">
                        <div class="picker-label" data-role="minute-label"></div>
                        <div class="time-picker-options" data-role="minutes"></div>
                    </div>
                </div>
                <div class="picker-footer picker-footer-triple">
                    <button type="button" class="picker-action picker-action-secondary" data-action="clear"></button>
                    <button type="button" class="picker-action picker-action-secondary" data-action="now"></button>
                    <button type="button" class="picker-action picker-action-primary" data-action="done"></button>
                </div>
            </div>
        </div>
    `);

    pickerState.elements.date = document.getElementById('datePickerPopover');
    pickerState.elements.time = document.getElementById('timePickerPopover');

    pickerState.elements.date.querySelector('[data-direction="-1"]').addEventListener('click', () => {
        pickerState.dateCursor.setMonth(pickerState.dateCursor.getMonth() - 1);
        renderDatePicker();
    });

    pickerState.elements.date.querySelector('[data-direction="1"]').addEventListener('click', () => {
        pickerState.dateCursor.setMonth(pickerState.dateCursor.getMonth() + 1);
        renderDatePicker();
    });

    pickerState.elements.date.querySelector('[data-role="days"]').addEventListener('click', event => {
        const dayButton = event.target.closest('.picker-day');
        if (!dayButton || !pickerState.activeInput) {
            return;
        }

        applyPickerValue(dayButton.getAttribute('data-value'));
        closePickerPopovers();
    });

    pickerState.elements.date.querySelector('[data-action="clear"]').addEventListener('click', () => {
        applyPickerValue('');
        closePickerPopovers();
    });

    pickerState.elements.date.querySelector('[data-action="today"]').addEventListener('click', () => {
        applyPickerValue(formatDateInputValue(new Date()));
        closePickerPopovers();
    });

    pickerState.elements.time.querySelector('[data-role="hours"]').addEventListener('click', event => {
        const option = event.target.closest('.time-picker-option');
        if (!option) {
            return;
        }

        pickerState.selectedHour = option.getAttribute('data-value');
        renderTimePicker();
    });

    pickerState.elements.time.querySelector('[data-role="minutes"]').addEventListener('click', event => {
        const option = event.target.closest('.time-picker-option');
        if (!option) {
            return;
        }

        pickerState.selectedMinute = option.getAttribute('data-value');
        renderTimePicker();
    });

    pickerState.elements.time.querySelector('[data-action="clear"]').addEventListener('click', () => {
        applyPickerValue('');
        closePickerPopovers();
    });

    pickerState.elements.time.querySelector('[data-action="now"]').addEventListener('click', () => {
        const currentTime = getCurrentRoundedTime();
        pickerState.selectedHour = currentTime.hour;
        pickerState.selectedMinute = currentTime.minute;
        applyPickerValue(`${pickerState.selectedHour}:${pickerState.selectedMinute}`);
        closePickerPopovers();
    });

    pickerState.elements.time.querySelector('[data-action="done"]').addEventListener('click', () => {
        applyPickerValue(`${pickerState.selectedHour}:${pickerState.selectedMinute}`);
        closePickerPopovers();
    });
}

function openPickerForInput(input) {
    if (!input) {
        return;
    }

    if (input.getAttribute('data-picker-type') === 'date') {
        openDatePicker(input);
        return;
    }

    openTimePicker(input);
}

function openDatePicker(input) {
    closePickerPopovers();

    pickerState.activeInput = input;
    pickerState.mode = 'date';
    pickerState.dateCursor = parseDateInputValue(input.value) || new Date();
    pickerState.dateCursor = new Date(pickerState.dateCursor.getFullYear(), pickerState.dateCursor.getMonth(), 1);

    input.classList.add('picker-open');
    pickerState.elements.date.hidden = false;
    renderDatePicker();
    positionActivePicker();
}

function openTimePicker(input) {
    closePickerPopovers();

    const parsedTime = parseTimeInputValue(input.value) || getCurrentRoundedTime();

    pickerState.activeInput = input;
    pickerState.mode = 'time';
    pickerState.selectedHour = parsedTime.hour;
    pickerState.selectedMinute = parsedTime.minute;

    input.classList.add('picker-open');
    pickerState.elements.time.hidden = false;
    renderTimePicker();
    positionActivePicker();
}

function renderOpenPicker() {
    if (pickerState.mode === 'date' && !pickerState.elements.date.hidden) {
        renderDatePicker();
    }

    if (pickerState.mode === 'time' && !pickerState.elements.time.hidden) {
        renderTimePicker();
    }
}

function renderDatePicker() {
    if (!pickerState.elements.date) {
        return;
    }

    const pickerText = PICKER_COPY[currentLang];
    const locale = currentLang === 'zh' ? 'zh-CN' : 'en-US';
    const monthTitle = new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long'
    }).format(pickerState.dateCursor);

    pickerState.elements.date.querySelector('[data-role="title"]').textContent = monthTitle;
    pickerState.elements.date.querySelector('[data-role="weekdays"]').innerHTML = pickerText.weekdays
        .map(day => `<span>${day}</span>`)
        .join('');

    const selectedValue = pickerState.activeInput ? pickerState.activeInput.value : '';
    const todayValue = formatDateInputValue(new Date());
    const days = buildCalendarDays(pickerState.dateCursor);

    pickerState.elements.date.querySelector('[data-role="days"]').innerHTML = days.map(day => {
        const classes = [
            'picker-day',
            day.inCurrentMonth ? '' : 'is-outside',
            day.value === selectedValue ? 'is-selected' : '',
            day.value === todayValue ? 'is-today' : ''
        ].filter(Boolean).join(' ');

        return `<button type="button" class="${classes}" data-value="${day.value}">${day.label}</button>`;
    }).join('');

    pickerState.elements.date.querySelector('[data-action="clear"]').textContent = pickerText.clear;
    pickerState.elements.date.querySelector('[data-action="today"]').textContent = pickerText.today;
    positionActivePicker();
}

function renderTimePicker() {
    if (!pickerState.elements.time) {
        return;
    }

    const pickerText = PICKER_COPY[currentLang];
    const hours = Array.from({ length: 24 }, (_, index) => padNumber(index));
    const minutes = Array.from({ length: 12 }, (_, index) => padNumber(index * 5));

    pickerState.elements.time.querySelector('[data-role="label"]').textContent = pickerText.timeTitle;
    pickerState.elements.time.querySelector('[data-role="preview"]').textContent = `${pickerState.selectedHour}:${pickerState.selectedMinute}`;
    pickerState.elements.time.querySelector('[data-role="hour-label"]').textContent = pickerText.hour;
    pickerState.elements.time.querySelector('[data-role="minute-label"]').textContent = pickerText.minute;

    pickerState.elements.time.querySelector('[data-role="hours"]').innerHTML = hours.map(hour => `
        <button
            type="button"
            class="time-picker-option ${hour === pickerState.selectedHour ? 'is-selected' : ''}"
            data-value="${hour}"
        >${hour}</button>
    `).join('');

    pickerState.elements.time.querySelector('[data-role="minutes"]').innerHTML = minutes.map(minute => `
        <button
            type="button"
            class="time-picker-option ${minute === pickerState.selectedMinute ? 'is-selected' : ''}"
            data-value="${minute}"
        >${minute}</button>
    `).join('');

    pickerState.elements.time.querySelector('[data-action="clear"]').textContent = pickerText.clear;
    pickerState.elements.time.querySelector('[data-action="now"]').textContent = pickerText.now;
    pickerState.elements.time.querySelector('[data-action="done"]').textContent = pickerText.done;

    requestAnimationFrame(() => {
        scrollSelectedTimeOptionIntoView(pickerState.elements.time.querySelector('[data-role="hours"]'));
        scrollSelectedTimeOptionIntoView(pickerState.elements.time.querySelector('[data-role="minutes"]'));
        positionActivePicker();
    });
}

function buildCalendarDays(cursorDate) {
    const year = cursorDate.getFullYear();
    const month = cursorDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const gridStart = new Date(year, month, 1 - firstDay.getDay());
    const days = [];

    for (let index = 0; index < 42; index += 1) {
        const date = new Date(gridStart);
        date.setDate(gridStart.getDate() + index);
        days.push({
            label: date.getDate(),
            value: formatDateInputValue(date),
            inCurrentMonth: date.getMonth() === month
        });
    }

    return days;
}

function positionActivePicker() {
    if (!pickerState.activeInput || !pickerState.mode) {
        return;
    }

    const popover = pickerState.mode === 'date' ? pickerState.elements.date : pickerState.elements.time;
    if (!popover || popover.hidden) {
        return;
    }

    const inputRect = pickerState.activeInput.getBoundingClientRect();
    const popoverRect = popover.getBoundingClientRect();
    const gap = 10;
    const viewportPadding = 12;

    let left = inputRect.left;
    let top = inputRect.bottom + gap;

    if (left + popoverRect.width > window.innerWidth - viewportPadding) {
        left = window.innerWidth - popoverRect.width - viewportPadding;
    }

    if (left < viewportPadding) {
        left = viewportPadding;
    }

    if (top + popoverRect.height > window.innerHeight - viewportPadding) {
        top = inputRect.top - popoverRect.height - gap;
    }

    if (top < viewportPadding) {
        top = viewportPadding;
    }

    popover.style.left = `${Math.round(left)}px`;
    popover.style.top = `${Math.round(top)}px`;
}

function closePickerPopovers() {
    document.querySelectorAll('.picker-input').forEach(input => input.classList.remove('picker-open'));

    Object.values(pickerState.elements).forEach(element => {
        if (element) {
            element.hidden = true;
        }
    });

    pickerState.activeInput = null;
    pickerState.mode = null;
}

function applyPickerValue(value) {
    if (!pickerState.activeInput) {
        return;
    }

    pickerState.activeInput.value = value;
    pickerState.activeInput.dispatchEvent(new Event('input', { bubbles: true }));
    pickerState.activeInput.dispatchEvent(new Event('change', { bubbles: true }));
}

function scrollSelectedTimeOptionIntoView(container) {
    const selected = container ? container.querySelector('.is-selected') : null;

    if (selected) {
        selected.scrollIntoView({ block: 'nearest' });
    }
}

function parseDateInputValue(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return null;
    }

    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day);
}

function parseTimeInputValue(value) {
    if (!/^\d{2}:\d{2}$/.test(value)) {
        return null;
    }

    const [hour, minute] = value.split(':');
    return { hour, minute };
}

function formatDateInputValue(date) {
    return [
        date.getFullYear(),
        padNumber(date.getMonth() + 1),
        padNumber(date.getDate())
    ].join('-');
}

function getCurrentRoundedTime() {
    const now = new Date();
    return {
        hour: padNumber(now.getHours()),
        minute: padNumber(Math.floor(now.getMinutes() / 5) * 5)
    };
}

function padNumber(value) {
    return String(value).padStart(2, '0');
}

// ===== 固定收益板块 =====

function loadFixedIncome() {
    const data = JSON.parse(localStorage.getItem(KEYS.FIXED_INCOME) || '[]');
    renderFixedIncomeTable(data);
}

function renderFixedIncomeTable(data) {
    const container = document.getElementById('fixedIncomeTable');
    const emptyState = document.getElementById('fixedIncomeEmpty');
    const text = LANGUAGES[currentLang];

    if (data.length === 0) {
        container.innerHTML = '';
        emptyState.style.display = 'block';
        emptyState.querySelector('p').textContent = text.emptyState;
        emptyState.querySelector('.empty-hint').textContent = text.emptyHint;
        return;
    }

    emptyState.style.display = 'none';
    container.innerHTML = `
        <table class="fixed-income-table">
            <thead>
                <tr>
                    <th>${text.tokenColumn}</th>
                    <th>${text.platformColumn}</th>
                    <th>APY</th>
                    <th>${text.startColumn}</th>
                    <th>${text.endColumn}</th>
                    <th>${text.daysLeftColumn}</th>
                    <th>${text.actionColumn}</th>
                </tr>
            </thead>
            <tbody>
                ${data.map((item, index) => {
                    const remainingMeta = calculateRemainingTime(getRecordDisplayValue(item, 'end'));
                    const daysClass = remainingMeta.days <= 7 ? 'danger' : remainingMeta.days <= 30 ? 'warning' : '';

                    return `
                        <tr>
                            <td><span class="table-token">${item.token}</span></td>
                            <td><span class="table-platform">${formatPlatformDisplay(item.platform)}</span></td>
                            <td><span class="table-apy">${item.apy}%</span></td>
                            <td>${formatDateTime(getRecordDisplayValue(item, 'start'))}</td>
                            <td>${formatDateTime(getRecordDisplayValue(item, 'end'))}</td>
                            <td><span class="table-days ${daysClass}">${remainingMeta.label}</span></td>
                            <td>
                                ${item.description ? `<button class="table-detail-btn" onclick="showDetail(${index})">${text.detail}</button>` : ''}
                                <button class="table-delete-btn" onclick="deleteFixedIncome(${index})">${text.delete}</button>
                            </td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
    `;
}

async function addFixedIncome(event) {
    event.preventDefault();

    clearFieldErrors();

    const tokenInput = document.getElementById('token');
    const platformInput = document.getElementById('platform');
    const apyInput = document.getElementById('apy');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const token = tokenInput.value.trim();
    const platform = platformInput.value.trim();
    const apy = parseFloat(apyInput.value);
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    const startTime = document.getElementById('startTimeToggle').checked ? document.getElementById('startTime').value : '';
    const endTime = document.getElementById('endTimeToggle').checked ? document.getElementById('endTime').value : '';
    const description = document.getElementById('description').value.trim();

    if (!token) {
        showFieldError(LANGUAGES[currentLang].tokenRequiredError, ['token']);
        return;
    }

    if (!platform) {
        showFieldError(LANGUAGES[currentLang].platformRequiredError, ['platform']);
        return;
    }

    if (apyInput.value.trim() === '' || Number.isNaN(apy) || apy < 0) {
        showFieldError(LANGUAGES[currentLang].apyRequiredError, ['apy']);
        return;
    }

    if (!startDate || !endDate) {
        showFieldError(LANGUAGES[currentLang].dateRequiredError, ['startDate', 'endDate']);
        return;
    }

    const startAt = buildDateTimeValue(startDate, startTime);
    const endAt = buildDateTimeValue(endDate, endTime);

    if (new Date(endAt) <= new Date(startAt)) {
        showFieldError(LANGUAGES[currentLang].dateError, ['startDate', 'endDate']);
        return;
    }

    const record = { token, platform, apy, startDate, endDate, startTime, endTime, startAt, endAt, description };
    const data = JSON.parse(localStorage.getItem(KEYS.FIXED_INCOME) || '[]');
    data.push(record);
    data.sort((a, b) => new Date(a.endAt || a.endDate) - new Date(b.endAt || b.endDate));
    localStorage.setItem(KEYS.FIXED_INCOME, JSON.stringify(data));

    document.getElementById('fixedIncomeForm').reset();
    closeFixedIncomeModal();
    loadFixedIncome();
    await syncStateToRemote();
}

async function deleteFixedIncome(index) {
    if (!(await requestDeleteConfirmation(LANGUAGES[currentLang].confirmDelete))) {
        return;
    }

    const data = JSON.parse(localStorage.getItem(KEYS.FIXED_INCOME) || '[]');
    data.splice(index, 1);
    localStorage.setItem(KEYS.FIXED_INCOME, JSON.stringify(data));
    loadFixedIncome();
    await syncStateToRemote();
}

// ===== 长线策略板块 =====

function initStrategyEditor() {
    const container = document.getElementById('strategyTables');
    const addButton = document.getElementById('addStrategyButton');

    if (container) {
        container.addEventListener('change', handleStrategyEditorChange);
        container.addEventListener('click', handleStrategyEditorAction);
    }

    if (addButton) {
        addButton.addEventListener('click', addStrategyFromSelect);
    }
}

function loadTotalAmount() {
    const amount = localStorage.getItem(KEYS.TOTAL_AMOUNT) || '';
    document.getElementById('totalAmount').value = amount;
}

async function saveTotalAmount() {
    const amount = document.getElementById('totalAmount').value;
    localStorage.setItem(KEYS.TOTAL_AMOUNT, amount);
    renderStrategies();
    await syncStateToRemote();
}

function getStrategies() {
    const saved = localStorage.getItem(KEYS.STRATEGIES);
    const totalAmountValue = localStorage.getItem(KEYS.TOTAL_AMOUNT) || '';

    try {
        return normalizeStrategies(saved ? JSON.parse(saved) : null, totalAmountValue);
    } catch {
        return createDefaultStrategies(totalAmountValue);
    }
}

function renderStrategies() {
    const strategies = getStrategies();
    const container = document.getElementById('strategyTables');
    const text = LANGUAGES[currentLang];

    updateStrategyTokenSelect(strategies);

    if (!strategies.length) {
        container.innerHTML = `<div class="empty-state"><p>${text.strategyEmpty}</p></div>`;
        return;
    }

    container.innerHTML = strategies.map(strategy => renderStrategyTable(strategy)).join('');
    updateRenderedStrategyPrices();
    updateRenderedStrategyAlertStatuses();
}

function renderStrategyTable(strategy) {
    const text = LANGUAGES[currentLang];
    const summary = getStrategySummary(strategy);
    const rows = strategy.levels.length
        ? strategy.levels.map(level => renderStrategyLevelRow(strategy, level)).join('')
        : `<tr><td colspan="6" class="strategy-table-empty">${text.strategyLevelsEmpty}</td></tr>`;

    return `
        <div class="strategy-table-container strategy-card">
            <div class="strategy-header strategy-card-header">
                <div class="strategy-card-heading">
                    <div class="strategy-card-title">
                        <div class="strategy-title-row">
                            <div class="strategy-title">${strategy.token}</div>
                            ${renderStrategyLivePrice(strategy.token)}
                        </div>
                        <div class="strategy-subtitle">${formatText(text.strategyRatioSummary, {
                            buy: formatRatioDisplay(summary.buyRatio),
                            sell: formatRatioDisplay(summary.sellRatio),
                            target: formatRatioDisplay(strategy.ratio || 0)
                        })}</div>
                    </div>
                    <div class="strategy-meta-controls">
                        <div class="strategy-ratio-control">
                            <label class="strategy-ratio-label">${text.strategyRatioLabel}</label>
                            <div class="input-shell">
                                <input
                                    type="number"
                                    min="0"
                                    step="1"
                                    class="strategy-field"
                                    data-role="strategy-ratio"
                                    data-strategy-id="${strategy.id}"
                                    value="${formatWholeNumberInputValue(strategy.ratio)}"
                                >
                                <span class="input-suffix">%</span>
                            </div>
                        </div>
                        <div class="strategy-ratio-control">
                            <label class="strategy-ratio-label">${text.currentPositionLabel}</label>
                            <div class="input-shell">
                                <input
                                    type="number"
                                    min="0"
                                    step="0.00000001"
                                    class="strategy-field"
                                    data-role="strategy-current-quantity"
                                    data-strategy-id="${strategy.id}"
                                    value="${formatStrategyInputValue(strategy.currentQuantity)}"
                                >
                                <span class="input-suffix">${strategy.token}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    type="button"
                    class="table-delete-btn strategy-delete-btn"
                    data-action="delete-strategy"
                    data-strategy-id="${strategy.id}"
                >${text.deleteStrategyButton}</button>
            </div>
            <table class="strategy-table">
                <thead>
                    <tr>
                        <th>${text.priceLevel}</th>
                        <th>${text.actionLabel}</th>
                        <th>${text.levelRatioColumn}</th>
                        <th>${text.amountUnit}</th>
                        <th>${text.quantityColumn}</th>
                        <th>${text.actionColumn}</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
                <tfoot>${renderStrategyTotalsRow(strategy, summary)}</tfoot>
            </table>
        </div>
    `;
}

function renderStrategyLivePrice(token) {
    const text = LANGUAGES[currentLang];
    const price = getStrategyLivePriceValue(token);

    return `
        <div class="strategy-live-price ${price === null ? 'is-unavailable' : ''}" data-token-price="${token}">
            <span class="strategy-live-label">${text.currentPriceLabel}</span>
            <span class="strategy-live-value">${price === null ? '--' : formatMarketPrice(price)}</span>
        </div>
    `;
}

function renderStrategyLevelRow(strategy, level) {
    const text = LANGUAGES[currentLang];
    const amount = getStrategyLevelAmount(level, strategy);
    const quantity = getStrategyLevelQuantity(level, strategy);
    const alertStatus = getStrategyAlertStatus(strategy.id, level);
    const rowClassName = alertStatus.highlightClassName ? ` class="${alertStatus.highlightClassName}"` : '';

    return `
        <tr${rowClassName} data-alert-key="${alertStatus.alertKey}" title="${alertStatus.title}">
            <td>
                <input
                    type="number"
                    min="0"
                    step="0.00000001"
                    class="strategy-field"
                    data-role="level-price"
                    data-strategy-id="${strategy.id}"
                    data-level-id="${level.id}"
                    value="${formatStrategyInputValue(level.price)}"
                    placeholder="65000"
                >
            </td>
            <td>
                <select
                    class="strategy-field strategy-field-select"
                    data-role="level-action"
                    data-strategy-id="${strategy.id}"
                    data-level-id="${level.id}"
                >
                    <option value="buy" ${level.action === 'buy' ? 'selected' : ''}>${text.buy}</option>
                    <option value="sell" ${level.action === 'sell' ? 'selected' : ''}>${text.sell}</option>
                </select>
            </td>
            <td>
                <div class="input-shell">
                    <input
                        type="number"
                        min="0"
                        step="1"
                        class="strategy-field"
                        data-role="level-ratio"
                        data-strategy-id="${strategy.id}"
                        data-level-id="${level.id}"
                        value="${formatWholeNumberInputValue(level.ratio)}"
                        placeholder="9"
                    >
                    <span class="input-suffix">%</span>
                </div>
            </td>
            <td><span class="strategy-amount">${formatStrategyAmount(amount)}</span></td>
            <td><span class="strategy-quantity">${formatStrategyQuantity(amount, level.price, strategy.token, quantity)}</span></td>
            <td>
                <button
                    type="button"
                    class="table-delete-btn strategy-row-delete"
                    data-action="delete-level"
                    data-strategy-id="${strategy.id}"
                    data-level-id="${level.id}"
                >${text.deleteLevelButton}</button>
            </td>
        </tr>
    `;
}

function renderStrategyTotalsRow(strategy, summary) {
    const text = LANGUAGES[currentLang];

    return `
        <tr class="strategy-total-row">
            <td colspan="3" class="strategy-total-label-cell">${text.totalLabel}</td>
            <td class="strategy-total-cell">
                <div class="strategy-total-line">
                    <span class="strategy-total-label">${text.buyTotalLabel}</span>
                    <span class="strategy-total-value">${formatStrategyAmount(summary.buyAmount)}</span>
                </div>
                <div class="strategy-total-line">
                    <span class="strategy-total-label">${text.sellTotalLabel}</span>
                    <span class="strategy-total-value">${formatStrategyAmount(summary.sellAmount)}</span>
                </div>
            </td>
            <td class="strategy-total-cell">
                <div class="strategy-total-line">
                    <span class="strategy-total-label">${text.buyTotalLabel}</span>
                    <span class="strategy-total-value">${formatStrategyQuantity(summary.buyAmount, summary.buyAveragePrice, strategy.token, summary.buyQuantity)}</span>
                </div>
                <div class="strategy-total-line">
                    <span class="strategy-total-label">${text.sellTotalLabel}</span>
                    <span class="strategy-total-value">${formatStrategyQuantity(summary.sellAmount, summary.sellAveragePrice, strategy.token, summary.sellQuantity)}</span>
                </div>
            </td>
            <td class="strategy-total-action-cell">
                <button
                    type="button"
                    class="apple-button apple-button-secondary strategy-inline-button"
                    data-action="add-level"
                    data-strategy-id="${strategy.id}"
                >${text.addLevelButton}</button>
            </td>
        </tr>
    `;
}

function copyStrategy(format) {
    const strategies = getStrategies();
    const totalAmount = localStorage.getItem(KEYS.TOTAL_AMOUNT) || '';
    const text = LANGUAGES[currentLang];

    if (!strategies.length) {
        showToast(text.strategyCopyEmpty, 'error');
        return;
    }

    const titleLine = totalAmount
        ? `${text.strategySectionTitle} (${text.totalAmountLabel}: ${formatCopyNumber(totalAmount)} U)`
        : text.strategySectionTitle;
    let content = '';

    if (format === 'markdown') {
        content = `# ${titleLine}\n\n`;
        strategies.forEach(strategy => {
            const summary = getStrategySummary(strategy);
            content += `## ${strategy.token} · ${text.strategyRatioLabel} ${formatCopyNumber(strategy.ratio || 0)}%\n\n`;
            content += `${formatText(text.strategyRatioSummary, {
                buy: formatRatioDisplay(summary.buyRatio),
                sell: formatRatioDisplay(summary.sellRatio),
                target: formatRatioDisplay(strategy.ratio || 0)
            })}\n\n`;
            content += `| ${text.priceLevel} | ${text.actionLabel} | ${text.levelRatioColumn} | ${text.amountUnit} | ${text.quantityColumn} |\n`;
            content += '|------|------|------|------|------|\n';

            const levels = getStrategyLevelsForExport(strategy);
            if (!levels.length) {
                content += '| - | - | - | - | - |\n\n';
                return;
            }

            levels.forEach(level => {
                const amount = getStrategyLevelAmount(level, strategy);
                const quantity = getStrategyLevelQuantity(level, strategy);
                content += `| ${formatStrategyPrice(level.price)} | ${formatStrategyActionLabel(level.action)} | ${formatRatioDisplay(level.ratio)}% | ${formatStrategyAmount(amount)} | ${formatStrategyQuantity(amount, level.price, strategy.token, quantity)} |\n`;
            });
            content += `| ${text.totalLabel} | - | - | ${text.buyTotalLabel} ${formatStrategyAmount(summary.buyAmount)} / ${text.sellTotalLabel} ${formatStrategyAmount(summary.sellAmount)} | ${text.buyTotalLabel} ${formatStrategyQuantity(summary.buyAmount, summary.buyAveragePrice, strategy.token, summary.buyQuantity)} / ${text.sellTotalLabel} ${formatStrategyQuantity(summary.sellAmount, summary.sellAveragePrice, strategy.token, summary.sellQuantity)} |\n`;
            content += '\n';
        });
    } else {
        content = `${titleLine}\n\n`;
        strategies.forEach(strategy => {
            const summary = getStrategySummary(strategy);
            content += `${strategy.token} · ${text.strategyRatioLabel} ${formatCopyNumber(strategy.ratio || 0)}%\n`;
            content += `${formatText(text.strategyRatioSummary, {
                buy: formatRatioDisplay(summary.buyRatio),
                sell: formatRatioDisplay(summary.sellRatio),
                target: formatRatioDisplay(strategy.ratio || 0)
            })}\n`;

            const levels = getStrategyLevelsForExport(strategy);
            if (!levels.length) {
                content += `  - ${text.strategyLevelsEmpty}\n\n`;
                return;
            }

            for (const level of levels) {
                const amount = getStrategyLevelAmount(level, strategy);
                const quantity = getStrategyLevelQuantity(level, strategy);
                content += `  ${formatStrategyPrice(level.price)} - ${formatStrategyActionLabel(level.action)} - ${formatRatioDisplay(level.ratio)}% - ${formatStrategyAmount(amount)} - ${formatStrategyQuantity(amount, level.price, strategy.token, quantity)}\n`;
            }
            content += `  ${text.totalLabel}: ${text.buyTotalLabel} ${formatStrategyAmount(summary.buyAmount)} / ${text.sellTotalLabel} ${formatStrategyAmount(summary.sellAmount)}\n`;
            content += `  ${text.quantityColumn}: ${text.buyTotalLabel} ${formatStrategyQuantity(summary.buyAmount, summary.buyAveragePrice, strategy.token, summary.buyQuantity)} / ${text.sellTotalLabel} ${formatStrategyQuantity(summary.sellAmount, summary.sellAveragePrice, strategy.token, summary.sellQuantity)}\n`;
            content += '\n';
        });
    }

    navigator.clipboard.writeText(content).then(() => {
        showToast(text.copied, 'success');
    }).catch(() => {
        showToast(text.copyFailed, 'error');
    });
}

function normalizeStrategies(rawStrategies, totalAmountValue = '') {
    if (Array.isArray(rawStrategies)) {
        return sortStrategiesByRatio(rawStrategies
            .map((strategy, index) => normalizeStrategyItem(strategy, index, totalAmountValue))
            .filter(Boolean));
    }

    if (rawStrategies && typeof rawStrategies === 'object') {
        const normalized = sortStrategiesByRatio(Object.values(rawStrategies)
            .map((strategy, index) => normalizeStrategyItem(strategy, index, totalAmountValue))
            .filter(Boolean));

        return normalized.length ? normalized : createDefaultStrategies(totalAmountValue);
    }

    return createDefaultStrategies(totalAmountValue);
}

function sortStrategiesByRatio(strategies = []) {
    return strategies
        .map((strategy, index) => ({ strategy, index }))
        .sort((left, right) => {
            const leftRatio = Number.parseFloat(left.strategy.ratio);
            const rightRatio = Number.parseFloat(right.strategy.ratio);
            const safeLeftRatio = Number.isFinite(leftRatio) ? leftRatio : -1;
            const safeRightRatio = Number.isFinite(rightRatio) ? rightRatio : -1;

            if (safeRightRatio !== safeLeftRatio) {
                return safeRightRatio - safeLeftRatio;
            }

            return left.index - right.index;
        })
        .map(item => item.strategy);
}

function normalizeStrategyItem(strategy, index, totalAmountValue) {
    if (!strategy || typeof strategy !== 'object') {
        return null;
    }

    const token = String(strategy.token || strategy.name || MAINSTREAM_TOKENS[index] || '')
        .trim()
        .toUpperCase();

    if (!token) {
        return null;
    }

    const strategyId = strategy.id || generateId(`strategy_${token.toLowerCase()}`);
    const rawLevels = Array.isArray(strategy.levels) ? strategy.levels : [];
    const isLegacyObject = !('token' in strategy);
    const ratio = isLegacyObject
        ? normalizeLegacyPercent(strategy.ratio)
        : normalizeWholeNumber(strategy.ratio);
    const totalCapital = getStrategySeedCapital(totalAmountValue);
    const levels = rawLevels
        .map((level, levelIndex) => normalizeStrategyLevel(level, {
            strategyId,
            strategyRatio: Number(ratio) || 0,
            totalCapital,
            index: levelIndex,
            legacyObject: isLegacyObject
        }))
        .filter(Boolean);

    return {
        id: strategyId,
        token,
        ratio,
        currentQuantity: normalizeEditableNumber(strategy.currentQuantity, 8),
        levels
    };
}

function normalizeStrategyLevel(level, options) {
    if (!level || typeof level !== 'object') {
        return null;
    }

    let ratio = '';

    if (level.ratio !== undefined && level.ratio !== null && level.ratio !== '') {
        ratio = options.legacyObject
            ? normalizeLegacyLevelRatio(level, options.strategyRatio)
            : normalizeWholeNumber(level.ratio);
    } else if (level.amount !== undefined && level.amount !== null && level.amount !== '') {
        const amount = normalizeEditableNumber(level.amount, 2);
        if (amount !== '' && options.totalCapital > 0) {
            ratio = normalizeWholeNumber((Number(amount) / options.totalCapital) * 100);
        }
    }

    return {
        id: level.id || `${options.strategyId}_level_${options.index + 1}`,
        price: normalizeEditableNumber(level.price, 8),
        action: normalizeStrategyAction(level.action),
        ratio
    };
}

function createDefaultStrategies(totalAmountValue = '') {
    return ['BTC', 'ETH', 'BNB'].map(token => createStrategyForToken(token, totalAmountValue));
}

function createStrategyForToken(token, totalAmountValue = '') {
    const blueprint = DEFAULT_STRATEGY_BLUEPRINTS[token];

    if (!blueprint) {
        return createBlankStrategy(token);
    }

    const strategyId = generateId(`strategy_${token.toLowerCase()}`);

    return {
        id: strategyId,
        token,
        ratio: blueprint.ratio,
        currentQuantity: '',
        levels: blueprint.levels.map((level, index) => ({
            id: `${strategyId}_level_${index + 1}`,
            price: level.price,
            action: level.action,
            ratio: level.ratio
        }))
    };
}

function createBlankStrategy(token = '') {
    const normalizedToken = String(token || '').trim().toUpperCase();
    const strategyId = generateId(`strategy_${(normalizedToken || 'token').toLowerCase()}`);

    return {
        id: strategyId,
        token: normalizedToken,
        ratio: '',
        currentQuantity: '',
        levels: [createBlankLevel(strategyId)]
    };
}

function createBlankLevel(strategyId) {
    return {
        id: `${strategyId}_${generateId('level')}`,
        price: '',
        action: 'buy',
        ratio: ''
    };
}

function getStrategySeedCapital(totalAmountValue = '') {
    const amount = Number.parseFloat(totalAmountValue);

    if (Number.isFinite(amount) && amount > 0) {
        return amount;
    }

    return DEFAULT_STRATEGY_SEED_AMOUNT;
}

function normalizeLegacyPercent(value) {
    if (value === '' || value === null || value === undefined) {
        return '';
    }

    const numericValue = Number.parseFloat(value);

    if (!Number.isFinite(numericValue)) {
        return '';
    }

    if (numericValue <= 1) {
        return roundNumber(numericValue * 100, 2);
    }

    return roundNumber(numericValue, 2);
}

function normalizeWholeNumber(value) {
    if (value === '' || value === null || value === undefined) {
        return '';
    }

    const numericValue = Number.parseFloat(value);

    if (!Number.isFinite(numericValue) || numericValue < 0) {
        return '';
    }

    return Math.round(numericValue);
}

function normalizeLegacyLevelRatio(level, strategyRatio) {
    const rawRatio = normalizeLegacyPercent(level.ratio);
    const normalizedAction = normalizeStrategyAction(level.action);

    if (rawRatio === '') {
        return '';
    }

    if (normalizedAction === 'sell') {
        return normalizeWholeNumber(rawRatio);
    }

    return normalizeWholeNumber((strategyRatio * (Number(rawRatio) || 0)) / 100);
}

function normalizeEditableNumber(value, decimals = 2) {
    if (value === '' || value === null || value === undefined) {
        return '';
    }

    const numericValue = Number.parseFloat(value);

    if (!Number.isFinite(numericValue) || numericValue < 0) {
        return '';
    }

    return roundNumber(numericValue, decimals);
}

function normalizeStrategyAction(action) {
    if (action === 'sell' || action === 'Sell' || action === '卖出') {
        return 'sell';
    }

    return 'buy';
}

function roundNumber(value, decimals = 2) {
    const factor = 10 ** decimals;
    return Math.round((value + Number.EPSILON) * factor) / factor;
}

function generateId(prefix = 'id') {
    return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

async function saveStrategies(strategies) {
    const normalized = normalizeStrategies(strategies, localStorage.getItem(KEYS.TOTAL_AMOUNT) || '');
    localStorage.setItem(KEYS.STRATEGIES, JSON.stringify(normalized));
    renderStrategies();
    await syncStateToRemote();
}

async function handleStrategyEditorChange(event) {
    const target = event.target;

    if (!target || !target.hasAttribute('data-role')) {
        return;
    }

    const strategyId = target.getAttribute('data-strategy-id');
    const strategies = getStrategies();
    const strategy = strategies.find(item => item.id === strategyId);

    if (!strategy) {
        return;
    }

    switch (target.getAttribute('data-role')) {
        case 'strategy-ratio': {
            const nextRatio = normalizeWholeNumber(target.value);
            const requiredRatio = getStrategyRequiredRatio(strategy);
            const maxRatio = getRemainingStrategyRatio(strategies, strategy.id);

            if (nextRatio === '') {
                strategy.ratio = requiredRatio ? roundNumber(requiredRatio, 2) : '';
                if (requiredRatio) {
                    showToast(LANGUAGES[currentLang].strategyRatioTooSmall, 'error');
                }
                break;
            }

            if (Number(nextRatio) < requiredRatio) {
                strategy.ratio = roundNumber(requiredRatio, 2);
                showToast(LANGUAGES[currentLang].strategyRatioTooSmall, 'error');
                break;
            }

            if (Number(nextRatio) > maxRatio) {
                strategy.ratio = Math.max(requiredRatio, maxRatio);
                showToast(LANGUAGES[currentLang].strategyTotalRatioExceeded, 'error');
                break;
            }

            strategy.ratio = nextRatio;
            break;
        }
        case 'strategy-current-quantity':
            strategy.currentQuantity = normalizeEditableNumber(target.value, 8);
            break;
        case 'level-price':
        case 'level-ratio': {
            const level = strategy.levels.find(item => item.id === target.getAttribute('data-level-id'));
            if (!level) {
                return;
            }

            if (target.getAttribute('data-role') === 'level-price') {
                level.price = normalizeEditableNumber(target.value, 8);
                break;
            }

            const nextRatio = normalizeWholeNumber(target.value);

            if (
                normalizeStrategyAction(level.action) === 'buy' &&
                (strategy.ratio === '' || strategy.ratio === null || strategy.ratio === undefined) &&
                nextRatio !== ''
            ) {
                const maxRatio = getRemainingStrategyRatio(strategies, strategy.id);
                strategy.ratio = Math.min(nextRatio, maxRatio);

                if (nextRatio > maxRatio) {
                    showToast(LANGUAGES[currentLang].strategyTotalRatioExceeded, 'error');
                }
            }

            const cappedRatio = capLevelRatioByStrategy(strategy, level.id, level.action, nextRatio);
            level.ratio = cappedRatio.value;

            if (cappedRatio.capped) {
                showToast(LANGUAGES[currentLang].strategyLevelRatioExceeded, 'error');
            }
            break;
        }
        case 'level-action': {
            const level = strategy.levels.find(item => item.id === target.getAttribute('data-level-id'));
            if (!level) {
                return;
            }

            level.action = normalizeStrategyAction(target.value);
            const cappedRatio = capLevelRatioByStrategy(strategy, level.id, level.action, level.ratio);
            level.ratio = cappedRatio.value;

            if (cappedRatio.capped) {
                showToast(LANGUAGES[currentLang].strategyLevelRatioExceeded, 'error');
            }
            break;
        }
        default:
            return;
    }

    await saveStrategies(strategies);
}

async function handleStrategyEditorAction(event) {
    const button = event.target.closest('button[data-action]');

    if (!button) {
        return;
    }

    const action = button.getAttribute('data-action');
    const strategyId = button.getAttribute('data-strategy-id');
    const levelId = button.getAttribute('data-level-id');

    if (action === 'delete-strategy') {
        await deleteStrategy(strategyId);
    }

    if (action === 'add-level') {
        await addStrategyLevel(strategyId);
    }

    if (action === 'delete-level') {
        await deleteStrategyLevel(strategyId, levelId);
    }
}

async function addStrategyFromSelect() {
    const select = document.getElementById('strategyTokenSelect');
    const token = select ? select.value : '';
    const text = LANGUAGES[currentLang];

    if (!token) {
        showToast(text.strategySelectRequired, 'error');
        return;
    }

    const strategies = getStrategies();
    if (strategies.some(strategy => strategy.token === token)) {
        showToast(text.strategyDuplicateError, 'error');
        return;
    }

    const strategy = createStrategyForToken(token, localStorage.getItem(KEYS.TOTAL_AMOUNT) || '');
    const remainingRatio = getRemainingStrategyRatio(strategies);

    if (strategy.ratio !== '') {
        const defaultRatio = Number(strategy.ratio) || 0;
        const cappedRatio = Math.min(Number(strategy.ratio), remainingRatio);
        strategy.ratio = cappedRatio > 0 ? cappedRatio : '';
        fitBuyLevelsToStrategyRatio(strategy);

        if (Number(strategy.ratio || 0) < defaultRatio) {
            showToast(text.strategyTotalRatioExceeded, 'error');
        }
    }

    strategies.push(strategy);
    await saveStrategies(strategies);
}

async function deleteStrategy(strategyId) {
    if (!(await requestDeleteConfirmation(LANGUAGES[currentLang].confirmDeleteStrategy))) {
        return;
    }

    await saveStrategies(getStrategies().filter(strategy => strategy.id !== strategyId));
}

async function addStrategyLevel(strategyId) {
    const strategies = getStrategies();
    const strategy = strategies.find(item => item.id === strategyId);

    if (!strategy) {
        return;
    }

    strategy.levels.push(createBlankLevel(strategyId));
    await saveStrategies(strategies);
}

async function deleteStrategyLevel(strategyId, levelId) {
    if (!(await requestDeleteConfirmation(LANGUAGES[currentLang].confirmDeleteLevel))) {
        return;
    }

    const strategies = getStrategies();
    const strategy = strategies.find(item => item.id === strategyId);

    if (!strategy) {
        return;
    }

    strategy.levels = strategy.levels.filter(level => level.id !== levelId);
    await saveStrategies(strategies);
}

function updateStrategyTokenSelect(strategies) {
    const select = document.getElementById('strategyTokenSelect');
    const addButton = document.getElementById('addStrategyButton');

    if (!select) {
        return;
    }

    const text = LANGUAGES[currentLang];
    const usedTokens = new Set((strategies || []).map(strategy => strategy.token));
    const availableTokens = MAINSTREAM_TOKENS.filter(token => !usedTokens.has(token));

    select.innerHTML = `
        <option value="">${text.strategySelectPlaceholder}</option>
        ${availableTokens.map(token => `<option value="${token}">${token}</option>`).join('')}
    `;

    const noAvailableTokens = availableTokens.length === 0;
    select.disabled = noAvailableTokens;

    if (addButton) {
        addButton.disabled = noAvailableTokens;
    }
}

function getTotalStrategyRatio(strategies, excludeStrategyId = '') {
    return roundNumber((strategies || []).reduce((sum, strategy) => {
        if (excludeStrategyId && strategy.id === excludeStrategyId) {
            return sum;
        }

        return sum + (Number.parseFloat(strategy.ratio) || 0);
    }, 0), 2);
}

function getRemainingStrategyRatio(strategies, excludeStrategyId = '') {
    return Math.max(100 - getTotalStrategyRatio(strategies, excludeStrategyId), 0);
}

function fitBuyLevelsToStrategyRatio(strategy) {
    let remaining = Number.parseFloat(strategy.ratio) || 0;

    strategy.levels = strategy.levels.map(level => {
        if (normalizeStrategyAction(level.action) !== 'buy') {
            return level;
        }

        const nextRatio = Math.min(Number.parseFloat(level.ratio) || 0, remaining);
        remaining = Math.max(remaining - nextRatio, 0);

        return {
            ...level,
            ratio: nextRatio > 0 ? Math.round(nextRatio) : ''
        };
    });
}

function formatStrategyInputValue(value) {
    if (value === '' || value === null || value === undefined) {
        return '';
    }

    return new Intl.NumberFormat('en-US', {
        useGrouping: false,
        maximumFractionDigits: 8
    }).format(Number(value));
}

function formatWholeNumberInputValue(value) {
    if (value === '' || value === null || value === undefined) {
        return '';
    }

    const numericValue = Number(value);
    if (!Number.isFinite(numericValue)) {
        return '';
    }

    return String(Math.round(numericValue));
}

function getStrategyRequiredRatio(strategy) {
    const summary = getStrategySummary(strategy);
    return summary.buyRatio;
}

function capLevelRatioByStrategy(strategy, levelId, action, nextRatio) {
    if (nextRatio === '') {
        return { value: '', capped: false };
    }

    const strategyRatio = Number.parseFloat(strategy.ratio);
    const targetRatio = Number.parseFloat(nextRatio);

    if (!Number.isFinite(targetRatio)) {
        return { value: '', capped: false };
    }

    const sideRatioUsed = strategy.levels
        .filter(level => level.id !== levelId && normalizeStrategyAction(level.action) === action)
        .reduce((sum, level) => sum + (Number.parseFloat(level.ratio) || 0), 0);
    const allowedTotal = action === 'sell'
        ? 100
        : Number.isFinite(strategyRatio) ? strategyRatio : 0;
    const maxAvailable = Math.max(allowedTotal - sideRatioUsed, 0);

    return {
        value: Math.round(Math.min(targetRatio, maxAvailable)),
        capped: targetRatio > maxAvailable + Number.EPSILON
    };
}

function getTotalAmountNumber() {
    const amount = Number.parseFloat(localStorage.getItem(KEYS.TOTAL_AMOUNT) || '');
    return Number.isFinite(amount) && amount > 0 ? amount : null;
}

function getStrategyLevelAmount(level, strategy) {
    if (!level || !strategy) {
        return null;
    }

    const totalAmount = getTotalAmountNumber();
    const numericRatio = Number.parseFloat(level.ratio);

    if (!Number.isFinite(numericRatio) || numericRatio <= 0) {
        return null;
    }

    if (normalizeStrategyAction(level.action) === 'sell') {
        const currentQuantity = Number.parseFloat(strategy.currentQuantity);
        const price = Number.parseFloat(level.price);

        if (!Number.isFinite(currentQuantity) || currentQuantity <= 0 || !Number.isFinite(price) || price <= 0) {
            return null;
        }

        return roundNumber(currentQuantity * (numericRatio / 100) * price, 2);
    }

    if (!totalAmount) {
        return null;
    }

    return roundNumber(totalAmount * (numericRatio / 100), 2);
}

function getStrategyLevelQuantity(level, strategy) {
    if (!level || !strategy) {
        return null;
    }

    const numericRatio = Number.parseFloat(level.ratio);

    if (!Number.isFinite(numericRatio) || numericRatio <= 0) {
        return null;
    }

    if (normalizeStrategyAction(level.action) === 'sell') {
        const currentQuantity = Number.parseFloat(strategy.currentQuantity);

        if (!Number.isFinite(currentQuantity) || currentQuantity <= 0) {
            return null;
        }

        return currentQuantity * (numericRatio / 100);
    }

    return getStrategyQuantity(getStrategyLevelAmount(level, strategy), level.price);
}

function getStrategySummary(strategy) {
    const hasTotalAmount = getTotalAmountNumber() !== null;
    const hasCurrentQuantity = Number.isFinite(Number.parseFloat(strategy.currentQuantity)) && Number.parseFloat(strategy.currentQuantity) > 0;
    const summary = {
        buyRatio: 0,
        sellRatio: 0,
        buyAmount: hasTotalAmount ? 0 : null,
        sellAmount: hasCurrentQuantity ? 0 : null,
        buyQuantity: null,
        sellQuantity: null,
        buyAveragePrice: null,
        sellAveragePrice: null
    };

    let buyQuantity = 0;
    let sellQuantity = 0;
    let buyAmount = 0;
    let sellAmount = 0;

    strategy.levels.forEach(level => {
        const side = normalizeStrategyAction(level.action);
        const ratio = Number.parseFloat(level.ratio) || 0;
        const amount = getStrategyLevelAmount(level, strategy);
        const quantity = getStrategyLevelQuantity(level, strategy);

        if (side === 'sell') {
            summary.sellRatio = roundNumber(summary.sellRatio + ratio, 2);
            if (amount !== null) {
                summary.sellAmount = roundNumber((summary.sellAmount || 0) + amount, 2);
                sellAmount += amount;
            }
            if (quantity !== null) {
                sellQuantity += quantity;
            }
            return;
        }

        summary.buyRatio = roundNumber(summary.buyRatio + ratio, 2);
        if (amount !== null) {
            summary.buyAmount = roundNumber((summary.buyAmount || 0) + amount, 2);
            buyAmount += amount;
        }
        if (quantity !== null) {
            buyQuantity += quantity;
        }
    });

    summary.buyQuantity = buyQuantity > 0 ? buyQuantity : null;
    summary.sellQuantity = sellQuantity > 0 ? sellQuantity : null;
    summary.buyAveragePrice = buyQuantity > 0 ? buyAmount / buyQuantity : null;
    summary.sellAveragePrice = sellQuantity > 0 ? sellAmount / sellQuantity : null;

    return summary;
}

function getStrategyQuantity(amount, price) {
    const numericAmount = Number.parseFloat(amount);
    const numericPrice = Number.parseFloat(price);

    if (!Number.isFinite(numericAmount) || !Number.isFinite(numericPrice) || numericAmount <= 0 || numericPrice <= 0) {
        return null;
    }

    return numericAmount / numericPrice;
}

function formatStrategyQuantity(amount, price, token, explicitQuantity = null) {
    const quantity = explicitQuantity ?? getStrategyQuantity(amount, price);

    if (quantity === null) {
        return '--';
    }

    return formatText(LANGUAGES[currentLang].quantityPattern, {
        quantity: formatAdaptiveQuantity(quantity),
        token
    });
}

function formatAdaptiveQuantity(quantity) {
    let precision = 8;

    if (quantity >= 1000) {
        precision = 2;
    } else if (quantity >= 100) {
        precision = 3;
    } else if (quantity >= 1) {
        precision = 4;
    } else if (quantity >= 0.01) {
        precision = 6;
    }

    return trimTrailingZeros(quantity.toFixed(precision));
}

function trimTrailingZeros(value) {
    return String(value).replace(/(\.\d*?[1-9])0+$/u, '$1').replace(/\.0+$/u, '').replace(/\.$/u, '');
}

function getStrategyLevelsForExport(strategy) {
    return strategy.levels.filter(level => level.price !== '' || level.ratio !== '');
}

function formatStrategyActionLabel(action) {
    return normalizeStrategyAction(action) === 'sell' ? LANGUAGES[currentLang].sell : LANGUAGES[currentLang].buy;
}

function formatStrategyAmount(amount) {
    if (amount === '' || amount === null || amount === undefined || !Number.isFinite(Number(amount))) {
        return '-';
    }

    return `${formatCopyNumber(amount)} U`;
}

function formatRatioDisplay(value) {
    if (value === '' || value === null || value === undefined || !Number.isFinite(Number(value))) {
        return '0';
    }

    return String(Math.round(Number(value)));
}

function formatStrategyPrice(price) {
    if (price === '' || price === null || price === undefined) {
        return '-';
    }

    return `$${Number(price).toLocaleString('en-US', {
        maximumFractionDigits: 8
    })}`;
}

function formatCopyNumber(value) {
    return Number(value).toLocaleString('en-US', {
        maximumFractionDigits: 8
    });
}

function getStrategyLivePriceValue(token) {
    const numericValue = Number.parseFloat(strategyPriceState.values[token]);
    return Number.isFinite(numericValue) && numericValue > 0 ? numericValue : null;
}

function formatMarketPrice(price) {
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

function updateRenderedStrategyPrices() {
    document.querySelectorAll('[data-token-price]').forEach(node => {
        const token = node.getAttribute('data-token-price');
        const price = getStrategyLivePriceValue(token);
        const valueNode = node.querySelector('.strategy-live-value');

        if (valueNode) {
            valueNode.textContent = price === null ? '--' : formatMarketPrice(price);
        }

        node.classList.toggle('is-unavailable', price === null);
    });
}

function getStrategyAlertStatus(strategyId, level) {
    const alertKey = `${strategyId}:${level.id}`;
    const alertRecord = strategyAlertState.statuses[alertKey];
    const hasLevelConfig = Number.isFinite(Number.parseFloat(level?.price)) && Number.parseFloat(level?.price) > 0 &&
        Number.isFinite(Number.parseFloat(level?.ratio)) && Number.parseFloat(level?.ratio) > 0;

    if (!hasLevelConfig) {
        return {
            alertKey,
            title: '',
            highlightClassName: ''
        };
    }

    if (!alertRecord) {
        return {
            alertKey,
            title: '',
            highlightClassName: ''
        };
    }

    if (alertRecord.lastNotifiedAt || alertRecord.isMet) {
        const label = currentLang === 'zh' ? '已触发' : 'Triggered';
        return {
            alertKey,
            title: formatAlertStatusTitle(label, alertRecord.lastNotifiedAt),
            highlightClassName: 'strategy-alert-row is-triggered'
        };
    }

    return {
        alertKey,
        title: '',
        highlightClassName: ''
    };
}

function updateRenderedStrategyAlertStatuses() {
    const strategies = getStrategies();

    document.querySelectorAll('[data-alert-key]').forEach(node => {
        const alertKey = node.getAttribute('data-alert-key');
        const strategyId = alertKey.split(':')[0];
        const strategy = strategies.find(item => item.id === strategyId);
        const level = strategy?.levels?.find(item => `${strategyId}:${item.id}` === alertKey);

        if (!strategy || !level) {
            return;
        }

        const alertStatus = getStrategyAlertStatus(strategy.id, level);
        node.title = alertStatus.title;
        node.className = alertStatus.highlightClassName ? alertStatus.highlightClassName : '';
    });
}

function formatAlertStatusTitle(label, isoDate) {
    if (!isoDate) {
        return label;
    }

    const date = new Date(isoDate);
    if (Number.isNaN(date.getTime())) {
        return label;
    }

    const locale = currentLang === 'zh' ? 'zh-CN' : 'en-US';
    const formatted = date.toLocaleString(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });

    return `${label} · ${formatted}`;
}

async function startStrategyPriceFeed() {
    await refreshStrategyPrices();

    if (!strategyPriceState.timer) {
        strategyPriceState.timer = window.setInterval(() => {
            refreshStrategyPrices();
        }, STRATEGY_PRICE_REFRESH_MS);
    }
}

async function refreshStrategyPrices() {
    if (strategyPriceState.loading) {
        return;
    }

    strategyPriceState.loading = true;

    try {
        const response = await fetch('/api/prices', {
            headers: { accept: 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`price feed unavailable: ${response.status}`);
        }

        const result = await response.json();
        strategyPriceState.values = result?.prices && typeof result.prices === 'object' ? result.prices : {};
    } catch (error) {
        if (!Object.keys(strategyPriceState.values).length) {
            strategyPriceState.values = {};
        }
    } finally {
        strategyPriceState.loading = false;
        updateRenderedStrategyPrices();
    }
}

async function startStrategyAlertStatusFeed() {
    await refreshStrategyAlertStatuses();

    if (!strategyAlertState.timer) {
        strategyAlertState.timer = window.setInterval(() => {
            refreshStrategyAlertStatuses();
        }, STRATEGY_PRICE_REFRESH_MS);
    }
}

async function refreshStrategyAlertStatuses() {
    if (strategyAlertState.loading) {
        return;
    }

    strategyAlertState.loading = true;

    try {
        const response = await fetch('/api/alert-statuses', {
            headers: { accept: 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`alert statuses unavailable: ${response.status}`);
        }

        const result = await response.json();
        strategyAlertState.statuses = result?.statuses && typeof result.statuses === 'object' ? result.statuses : {};
    } catch (error) {
        if (!Object.keys(strategyAlertState.statuses).length) {
            strategyAlertState.statuses = {};
        }
    } finally {
        strategyAlertState.loading = false;
        updateRenderedStrategyAlertStatuses();
    }
}

// ===== 弹窗控制 =====

function openFixedIncomeModal() {
    document.getElementById('fixedIncomeModal').classList.add('active');
}

function closeFixedIncomeModal() {
    closePickerPopovers();
    document.getElementById('fixedIncomeModal').classList.remove('active');
    document.getElementById('fixedIncomeForm').reset();
    clearFieldErrors();
    document.querySelectorAll('.token-chip').forEach(chip => chip.classList.remove('selected'));
    document.querySelectorAll('.platform-chip').forEach(chip => chip.classList.remove('selected'));
    document.getElementById('charCount').textContent = '0';
    resetTimeInput('start');
    resetTimeInput('end');
}

function openStrategyModal() {
    document.getElementById('strategyModal').classList.add('active');
}

function closeStrategyModal() {
    document.getElementById('strategyModal').classList.remove('active');
}

function resolveConfirmRequest(result) {
    if (typeof confirmState.resolver === 'function') {
        const resolve = confirmState.resolver;
        confirmState.resolver = null;
        resolve(result);
    }
}

function requestDeleteConfirmation(message) {
    const modal = document.getElementById('confirmModal');
    const messageElement = document.getElementById('confirmModalMessage');
    const approveButton = document.getElementById('confirmModalApprove');

    if (!modal || !messageElement) {
        return Promise.resolve(window.confirm(message));
    }

    closePickerPopovers();
    resolveConfirmRequest(false);
    messageElement.textContent = message;
    modal.classList.add('active');

    if (approveButton) {
        requestAnimationFrame(() => approveButton.focus());
    }

    return new Promise(resolve => {
        confirmState.resolver = resolve;
    });
}

function closeConfirmModal() {
    const modal = document.getElementById('confirmModal');
    const messageElement = document.getElementById('confirmModalMessage');

    if (!modal) {
        return;
    }

    modal.classList.remove('active');
    if (messageElement) {
        messageElement.textContent = '';
    }
    resolveConfirmRequest(false);
}

function confirmModalAction() {
    const modal = document.getElementById('confirmModal');
    const messageElement = document.getElementById('confirmModalMessage');

    if (!modal) {
        return;
    }

    modal.classList.remove('active');
    if (messageElement) {
        messageElement.textContent = '';
    }
    resolveConfirmRequest(true);
}

document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            closePickerPopovers();
            if (this.id === 'confirmModal') {
                closeConfirmModal();
                return;
            }
            this.classList.remove('active');
        }
    });
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && document.getElementById('confirmModal')?.classList.contains('active')) {
        closeConfirmModal();
    }
});

// ===== 代币芯片选择 =====
function initTokenChips() {
    const chips = document.querySelectorAll('.token-chip');
    const tokenInput = document.getElementById('token');

    chips.forEach(chip => {
        chip.addEventListener('click', function() {
            chips.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            tokenInput.value = this.getAttribute('data-token');
            this.style.transform = 'scale(0.95)';
            setTimeout(() => { this.style.transform = ''; }, 150);
        });
    });

    tokenInput.addEventListener('input', function() {
        chips.forEach(chip => chip.classList.remove('selected'));
    });
}

// ===== 平台芯片选择 =====
function initPlatformChips() {
    const chips = document.querySelectorAll('.platform-chip');
    const platformInput = document.getElementById('platform');

    chips.forEach(chip => {
        chip.addEventListener('click', function() {
            chips.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            platformInput.value = getPlatformChipValue(this);
            this.style.transform = 'scale(0.95)';
            setTimeout(() => { this.style.transform = ''; }, 150);
        });
    });

    platformInput.addEventListener('input', function() {
        chips.forEach(chip => chip.classList.remove('selected'));
    });

    updatePlatformChipLabels();
}

function updatePlatformChipLabels() {
    const platformInput = document.getElementById('platform');

    document.querySelectorAll('.platform-chip').forEach(chip => {
        const label = getPlatformChipValue(chip);
        chip.textContent = label;

        if (chip.classList.contains('selected') && platformInput) {
            platformInput.value = label;
        }
    });
}

function getPlatformChipValue(chip) {
    return chip.getAttribute(`data-platform-${currentLang}`) || chip.textContent.trim();
}

function formatPlatformDisplay(platform) {
    const key = getPlatformTranslationKey(platform);

    if (!key) {
        return platform;
    }

    return PLATFORM_TRANSLATIONS[key][currentLang] || platform;
}

function getPlatformTranslationKey(platform) {
    if (!platform) {
        return '';
    }

    const normalized = platform.trim().toLowerCase();

    return Object.entries(PLATFORM_TRANSLATIONS).find(([, labels]) => {
        return Object.values(labels).some(label => label.toLowerCase() === normalized);
    })?.[0] || '';
}

// ===== 详细说明功能 =====

function showDetail(index) {
    const data = JSON.parse(localStorage.getItem(KEYS.FIXED_INCOME) || '[]');
    const item = data[index];
    const text = LANGUAGES[currentLang];

    if (item && item.description) {
        const modalTitle = document.querySelector('#detailModal .modal-header h3');
        modalTitle.textContent = formatText(text.detailTitlePattern, {
            token: item.token,
            platform: formatPlatformDisplay(item.platform)
        });
        document.getElementById('detailContent').textContent = item.description;
        document.getElementById('detailModal').classList.add('active');
    }
}

function closeDetailModal() {
    document.getElementById('detailModal').classList.remove('active');
}

function toggleTimeInput(type) {
    const toggle = document.getElementById(`${type}TimeToggle`);
    const input = document.getElementById(`${type}Time`);
    const shouldShow = toggle.checked;

    input.style.display = shouldShow ? 'block' : 'none';
    if (!shouldShow) {
        input.value = '';
        if (pickerState.activeInput === input) {
            closePickerPopovers();
        }
    }
}

function resetTimeInput(type) {
    const toggle = document.getElementById(`${type}TimeToggle`);
    const input = document.getElementById(`${type}Time`);

    if (toggle) {
        toggle.checked = false;
    }

    if (input) {
        input.value = '';
        input.style.display = 'none';

        if (pickerState.activeInput === input) {
            closePickerPopovers();
        }
    }
}

// 字符计数
const textarea = document.getElementById('description');
const charCount = document.getElementById('charCount');

if (textarea && charCount) {
    textarea.addEventListener('input', function() {
        const count = this.value.length;
        charCount.textContent = count;

        if (count > 1800) {
            charCount.style.color = '#ff3b30';
        } else if (count > 1500) {
            charCount.style.color = '#ff9500';
        } else {
            charCount.style.color = 'var(--text-muted)';
        }
    });
}

// ===== 工具函数 =====

function calculateRemainingTime(endDate) {
    const text = LANGUAGES[currentLang];
    if (!endDate) {
        return { days: 0, label: text.expired };
    }

    const end = parseDisplayDateValue(endDate, true);
    const now = new Date();
    const diff = end - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (diff <= 0) {
        return { days: 0, label: text.expired };
    }

    if (days === 1) {
        return { days, label: text.today };
    }

    return { days, label: `${days} ${text.days}` };
}

function formatDateTime(dateStr) {
    if (!dateStr) {
        return '';
    }

    const date = parseDisplayDateValue(dateStr);
    const locale = currentLang === 'zh' ? 'zh-CN' : 'en-US';
    const hasTime = /T\d{2}:\d{2}/.test(dateStr);

    return date.toLocaleString(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        ...(hasTime ? {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        } : {})
    });
}

function getRecordDisplayValue(item, type) {
    const dateKey = `${type}Date`;
    const timeKey = `${type}Time`;
    const atKey = `${type}At`;

    if (item[timeKey]) {
        return item[atKey] || buildDateTimeValue(item[dateKey], item[timeKey]);
    }

    return item[dateKey] || item[atKey];
}

function parseDisplayDateValue(dateStr, useEndOfDay = false) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        const [year, month, day] = dateStr.split('-').map(Number);
        if (useEndOfDay) {
            return new Date(year, month - 1, day, 23, 59, 59, 999);
        }

        return new Date(year, month - 1, day);
    }

    return new Date(dateStr);
}

function buildDateTimeValue(date, time) {
    return time ? `${date}T${time}` : `${date}T00:00`;
}

function formatText(template, values) {
    return Object.entries(values).reduce((result, [key, value]) => {
        return result.replaceAll(`{${key}}`, value);
    }, template);
}

function updateStaticI18n(text) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (text[key]) {
            element.textContent = text[key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (text[key]) {
            element.setAttribute('placeholder', text[key]);
        }
    });
}

function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}
