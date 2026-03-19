// ===== 数据存储键 =====
const KEYS = {
    FIXED_INCOME: 'crypto_fixed_income',
    TOTAL_AMOUNT: 'crypto_total_amount',
    STRATEGIES: 'crypto_strategies'
};

// ===== 默认策略数据 =====
const DEFAULT_STRATEGIES = {
    BTC: {
        name: 'BTC',
        ratio: 0.6,
        levels: [
            { price: 65000, action: '买入', ratio: 0.15 },
            { price: 50000, action: '买入', ratio: 0.20 },
            { price: 40000, action: '买入', ratio: 0.30 },
            { price: 30000, action: '买入', ratio: 0.35 }
        ]
    },
    ETH: {
        name: 'ETH',
        ratio: 0.3,
        levels: [
            { price: 4500, action: '卖出', ratio: 0.30 },
            { price: 6000, action: '卖出', ratio: 0.30 },
            { price: 1800, action: '买入', ratio: 0.15 },
            { price: 1500, action: '买入', ratio: 0.20 },
            { price: 1200, action: '买入', ratio: 0.25 },
            { price: 1000, action: '买入', ratio: 0.30 }
        ]
    },
    BNB: {
        name: 'BNB',
        ratio: 0.1,
        levels: [
            { price: 1200, action: '卖出', ratio: 0.30 },
            { price: 1800, action: '卖出', ratio: 0.30 },
            { price: 400, action: '买入', ratio: 0.20 },
            { price: 300, action: '买入', ratio: 0.30 },
            { price: 200, action: '买入', ratio: 0.40 }
        ]
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
const remoteState = {
    available: false,
    connected: false,
    loading: false
};

// ===== 语言包 =====
const LANGUAGES = {
    zh: {
        pageTitle: 'Simple Crypto',
        navLogo: 'Simple Crypto',
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
        totalAmountHint: '设置后自动计算各档位金额',
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
        strategyEmpty: '请设置初始总金额以查看策略详情',
        tokenColumn: '代币',
        platformColumn: '平台',
        startColumn: '开始日期',
        endColumn: '结束日期',
        daysLeftColumn: '剩余时间',
        actionColumn: '操作',
        detail: '详情',
        days: '天',
        expired: '已到期',
        today: '今天到期',
        delete: '删除',
        dateError: '结束日期必须晚于开始日期',
        dateRequiredError: '请选择开始日期和结束日期',
        confirmDelete: '确定要删除这条记录吗？',
        setAmountFirst: '请先设置初始总金额',
        copied: '已复制到剪贴板',
        copyFailed: '复制失败',
        strategyTitle: '策略说明',
        strategyConcept: '💡 核心概念',
        initialAmount: '初始总金额',
        ratio: '占比',
        priceLevel: '价格档位',
        actionLabel: '操作',
        allocationRatio: '仓位比例',
        amountUnit: '金额 (U)',
        portfolioSummary: '占比 {ratio}% · 总仓位 {amount} U',
        strategyCase: '📊 实际案例',
        example1: '初始 10,000U，BTC 占比 60%（即 6,000U）',
        example2: '当 BTC 跌至 $65,000 时，买入 15%',
        example3: '→ 买入：6,000U × 15% = 900U',
        buy: '买入',
        sell: '卖出',
        detailTitlePattern: '{token} - {platform} 详细说明',
        strategyKnow: '知道了'
    },
    en: {
        pageTitle: 'Simple Crypto',
        navLogo: 'Simple Crypto',
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
        totalAmountHint: 'Set it once to auto-calculate each level amount',
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
        strategyEmpty: 'Set the initial total amount to view strategy details',
        tokenColumn: 'Token',
        platformColumn: 'Platform',
        startColumn: 'Start Date',
        endColumn: 'End Date',
        daysLeftColumn: 'Time Left',
        actionColumn: 'Action',
        detail: 'Details',
        days: 'days',
        expired: 'Expired',
        today: 'Due today',
        delete: 'Delete',
        dateError: 'End date must be later than start date',
        dateRequiredError: 'Please select both start and end dates',
        confirmDelete: 'Are you sure you want to delete this record?',
        setAmountFirst: 'Please set the initial total amount first',
        copied: 'Copied to clipboard',
        copyFailed: 'Copy failed',
        strategyTitle: 'Strategy Explanation',
        strategyConcept: '💡 Key Concepts',
        initialAmount: 'Initial Total Amount',
        ratio: 'Ratio',
        priceLevel: 'Price Level',
        actionLabel: 'Action',
        allocationRatio: 'Position Ratio',
        amountUnit: 'Amount (U)',
        portfolioSummary: 'Allocation {ratio}% · Total Position {amount} U',
        strategyCase: '📊 Real Example',
        example1: 'Initial 10,000U, BTC ratio 60% (i.e., 6,000U)',
        example2: 'When BTC drops to $65,000, buy 15%',
        example3: '→ Buy: 6,000U × 15% = 900U',
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
    await initializeRemoteSync();
    loadTotalAmount();
    updatePageText();
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
    document.querySelector('.hero-subtitle').textContent = text.heroSubtitle;
    updateStaticI18n(text);
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
    return {
        fixedIncome: Array.isArray(snapshot.fixedIncome) ? snapshot.fixedIncome : [],
        totalAmount: snapshot.totalAmount === undefined || snapshot.totalAmount === null ? '' : String(snapshot.totalAmount),
        strategies: snapshot.strategies && typeof snapshot.strategies === 'object' ? snapshot.strategies : DEFAULT_STRATEGIES
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
                    const remainingMeta = calculateRemainingTime(item.endAt || item.endDate);
                    const daysClass = remainingMeta.days <= 7 ? 'danger' : remainingMeta.days <= 30 ? 'warning' : '';

                    return `
                        <tr>
                            <td><span class="table-token">${item.token}</span></td>
                            <td><span class="table-platform">${item.platform}</span></td>
                            <td><span class="table-apy">${item.apy}%</span></td>
                            <td>${formatDateTime(item.startAt || item.startDate)}</td>
                            <td>${formatDateTime(item.endAt || item.endDate)}</td>
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
    if (!confirm(LANGUAGES[currentLang].confirmDelete)) return;

    const data = JSON.parse(localStorage.getItem(KEYS.FIXED_INCOME) || '[]');
    data.splice(index, 1);
    localStorage.setItem(KEYS.FIXED_INCOME, JSON.stringify(data));
    loadFixedIncome();
    await syncStateToRemote();
}

// ===== 长线策略板块 =====

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
    return saved ? JSON.parse(saved) : DEFAULT_STRATEGIES;
}

function renderStrategies() {
    const totalAmount = parseFloat(localStorage.getItem(KEYS.TOTAL_AMOUNT) || '0');
    const strategies = getStrategies();
    const container = document.getElementById('strategyTables');
    const text = LANGUAGES[currentLang];

    if (totalAmount === 0) {
        container.innerHTML = `<div class="empty-state"><p>${text.strategyEmpty}</p></div>`;
        return;
    }

    let html = '';
    for (const [key, strategy] of Object.entries(strategies)) {
        const tokenAmount = totalAmount * strategy.ratio;
        html += renderStrategyTable(strategy, tokenAmount);
    }
    container.innerHTML = html;
}

function renderStrategyTable(strategy, tokenAmount) {
    const text = LANGUAGES[currentLang];
    const rows = strategy.levels.map(level => {
        const amount = (tokenAmount * level.ratio).toFixed(2);
        const badgeClass = level.action === '买入' ? 'badge-buy' : 'badge-sell';
        const actionLabel = level.action === '买入' ? text.buy : text.sell;

        return `
            <tr>
                <td>$${level.price.toLocaleString()}</td>
                <td><span class="badge ${badgeClass}">${actionLabel}</span></td>
                <td>${(level.ratio * 100).toFixed(0)}%</td>
                <td class="highlight-amount">${amount} U</td>
            </tr>
        `;
    }).join('');

    return `
        <div class="strategy-table-container">
            <div class="strategy-header">
                <div class="strategy-title">${strategy.name}</div>
                <div class="strategy-subtitle">${formatText(text.portfolioSummary, {
                    ratio: (strategy.ratio * 100).toFixed(0),
                    amount: tokenAmount.toFixed(2)
                })}</div>
            </div>
            <table class="strategy-table">
                <thead>
                    <tr>
                        <th>${text.priceLevel}</th>
                        <th>${text.actionLabel}</th>
                        <th>${text.allocationRatio}</th>
                        <th>${text.amountUnit}</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
    `;
}

function copyStrategy(format) {
    const totalAmount = parseFloat(localStorage.getItem(KEYS.TOTAL_AMOUNT) || '0');
    const strategies = getStrategies();
    const text = LANGUAGES[currentLang];

    if (totalAmount === 0) {
        showToast(text.setAmountFirst, 'error');
        return;
    }

    let content = '';
    if (format === 'markdown') {
        content = `# ${text.strategySectionTitle} (${text.totalAmountLabel}: ${totalAmount} U)\n\n`;
        for (const [key, strategy] of Object.entries(strategies)) {
            const tokenAmount = (totalAmount * strategy.ratio).toFixed(2);
            content += `## ${strategy.name} - ${formatText(text.portfolioSummary, {
                ratio: (strategy.ratio * 100).toFixed(0),
                amount: tokenAmount
            })}\n\n`;
            content += `| ${text.priceLevel} | ${text.actionLabel} | ${text.allocationRatio} | ${text.amountUnit} |\n`;
            content += '|------|------|----------|----------|\n';
            for (const level of strategy.levels) {
                const amount = (tokenAmount * level.ratio).toFixed(2);
                const actionLabel = level.action === '买入' ? text.buy : text.sell;
                content += `| $${level.price.toLocaleString()} | ${actionLabel} | ${(level.ratio * 100).toFixed(0)}% | ${amount} U |\n`;
            }
            content += '\n';
        }
    } else {
        content = `${text.strategySectionTitle} (${text.totalAmountLabel}: ${totalAmount} U)\n\n`;
        for (const [key, strategy] of Object.entries(strategies)) {
            const tokenAmount = (totalAmount * strategy.ratio).toFixed(2);
            content += `${strategy.name} - ${formatText(text.portfolioSummary, {
                ratio: (strategy.ratio * 100).toFixed(0),
                amount: tokenAmount
            })}\n`;
            for (const level of strategy.levels) {
                const amount = (tokenAmount * level.ratio).toFixed(2);
                const actionLabel = level.action === '买入' ? text.buy : text.sell;
                content += `  $${level.price.toLocaleString()} - ${actionLabel} ${(level.ratio * 100).toFixed(0)}% = ${amount} U\n`;
            }
            content += '\n';
        }
    }

    navigator.clipboard.writeText(content).then(() => {
        showToast(text.copied, 'success');
    }).catch(() => {
        showToast(text.copyFailed, 'error');
    });
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

document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            closePickerPopovers();
            this.classList.remove('active');
        }
    });
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
            platformInput.value = this.getAttribute('data-platform');
            this.style.transform = 'scale(0.95)';
            setTimeout(() => { this.style.transform = ''; }, 150);
        });
    });

    platformInput.addEventListener('input', function() {
        chips.forEach(chip => chip.classList.remove('selected'));
    });
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
            platform: item.platform
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
    const end = new Date(endDate);
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
    const date = new Date(dateStr);
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
