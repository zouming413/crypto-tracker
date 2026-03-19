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
        cancelButton: '取消',
        saveButton: '保存',
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
        cancelButton: 'Cancel',
        saveButton: 'Save',
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
document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('crypto_language') || 'zh';
    currentLang = savedLang;

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
    });

    loadFixedIncome();
    loadTotalAmount();
    renderStrategies();
    initTokenChips();
    initPlatformChips();
    updatePageText();

    console.log('✅ 页面初始化完成');
    console.log('openFixedIncomeModal 函数存在:', typeof openFixedIncomeModal);
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

    const fixedIncomeSection = document.getElementById('fixed-income');
    if (fixedIncomeSection) {
        const addBtn = fixedIncomeSection.querySelector('.section-header .apple-button-secondary');
        if (addBtn) {
            addBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>${text.addButton}`;
        }
    }

    loadFixedIncome();
    renderStrategies();
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

function addFixedIncome(event) {
    event.preventDefault();

    const token = document.getElementById('token').value.trim();
    const platform = document.getElementById('platform').value.trim();
    const apy = parseFloat(document.getElementById('apy').value);
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const startTime = document.getElementById('startTimeToggle').checked ? document.getElementById('startTime').value : '';
    const endTime = document.getElementById('endTimeToggle').checked ? document.getElementById('endTime').value : '';
    const description = document.getElementById('description').value.trim();
    const startAt = buildDateTimeValue(startDate, startTime);
    const endAt = buildDateTimeValue(endDate, endTime);

    if (new Date(endAt) <= new Date(startAt)) {
        alert(LANGUAGES[currentLang].dateError);
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
}

function deleteFixedIncome(index) {
    if (!confirm(LANGUAGES[currentLang].confirmDelete)) return;

    const data = JSON.parse(localStorage.getItem(KEYS.FIXED_INCOME) || '[]');
    data.splice(index, 1);
    localStorage.setItem(KEYS.FIXED_INCOME, JSON.stringify(data));
    loadFixedIncome();
}

// ===== 长线策略板块 =====

function loadTotalAmount() {
    const amount = localStorage.getItem(KEYS.TOTAL_AMOUNT) || '';
    document.getElementById('totalAmount').value = amount;
}

function saveTotalAmount() {
    const amount = document.getElementById('totalAmount').value;
    localStorage.setItem(KEYS.TOTAL_AMOUNT, amount);
    renderStrategies();
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
        alert(text.setAmountFirst);
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
        alert(text.copied);
    }).catch(() => {
        alert(text.copyFailed);
    });
}

// ===== 弹窗控制 =====

function openFixedIncomeModal() {
    console.log('openFixedIncomeModal 被调用');
    document.getElementById('fixedIncomeModal').classList.add('active');
}

function closeFixedIncomeModal() {
    document.getElementById('fixedIncomeModal').classList.remove('active');
    document.getElementById('fixedIncomeForm').reset();
    document.querySelectorAll('.token-chip').forEach(chip => chip.classList.remove('selected'));
    document.querySelectorAll('.platform-chip').forEach(chip => chip.classList.remove('selected'));
    document.getElementById('charCount').textContent = '0';
    resetTimeInput('start');
    resetTimeInput('end');
}

function openStrategyModal() {
    console.log('openStrategyModal 被调用');
    document.getElementById('strategyModal').classList.add('active');
}

function closeStrategyModal() {
    document.getElementById('strategyModal').classList.remove('active');
}

document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
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
            charCount.style.color = 'var(--color-gray-text)';
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
