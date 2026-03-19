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
        navLogo: '⚡ Crypto Tracker',
        heroTitle: '加密资产追踪',
        heroSubtitle: '专业的理财记录工具。极简、安全、本地存储。',
        addButton: '添加记录',
        strategyButton: '策略说明',
        emptyState: '暂无固定收益记录',
        emptyHint: '点击右上角按钮添加第一条记录',
        days: '天',
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
        strategyCase: '📊 实际案例',
        example1: '初始 10,000U，BTC 占比 60%（即 6,000U）',
        example2: '当 BTC 跌至 $65,000 时，买入 15%',
        example3: '→ 买入：6,000U × 15% = 900U',
        strategyKnow: '知道了'
    },
    en: {
        navLogo: '⚡ Crypto Tracker',
        heroTitle: 'Crypto Asset Tracker',
        heroSubtitle: 'Professional financial tracking tool. Minimal, secure, local storage.',
        addButton: 'Add Record',
        strategyButton: 'Strategy Info',
        emptyState: 'No fixed income records',
        emptyHint: 'Click the button above to add your first record',
        days: 'days',
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
        strategyCase: '📊 Real Example',
        example1: 'Initial 10,000U, BTC ratio 60% (i.e., 6,000U)',
        example2: 'When BTC drops to $65,000, buy 15%',
        example3: '→ Buy: 6,000U × 15% = 900U',
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

    document.querySelector('.nav-logo').textContent = text.navLogo;
    document.querySelector('.hero-title').textContent = text.heroTitle;
    document.querySelector('.hero-subtitle').textContent = text.heroSubtitle;

    const fixedIncomeSection = document.getElementById('fixed-income');
    if (fixedIncomeSection) {
        const addBtn = fixedIncomeSection.querySelector('.section-header .apple-button-secondary');
        if (addBtn) {
            addBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>${text.addButton}`;
        }
    }

    const strategySection = document.getElementById('strategy');
    if (strategySection) {
        const strategyBtn = strategySection.querySelector('.section-header .apple-button-secondary');
        if (strategyBtn) {
            strategyBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M12 1v6m0 6v6m5.66-11.66l-4.24 4.24m0 5.66l4.24 4.24M23 12h-6m-6 0H1m11.66-5.66l-4.24-4.24m0 5.66l-4.24 4.24"></path></svg>${text.strategyButton}`;
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
                    <th>${currentLang === 'zh' ? '代币' : 'Token'}</th>
                    <th>${currentLang === 'zh' ? '平台' : 'Platform'}</th>
                    <th>APY</th>
                    <th>${currentLang === 'zh' ? '开始日期' : 'Start Date'}</th>
                    <th>${currentLang === 'zh' ? '结束日期' : 'End Date'}</th>
                    <th>${currentLang === 'zh' ? '剩余天数' : 'Days Left'}</th>
                    <th>${currentLang === 'zh' ? '操作' : 'Action'}</th>
                </tr>
            </thead>
            <tbody>
                ${data.map((item, index) => {
                    const remainingDays = calculateRemainingDays(item.endDate);
                    const daysValue = typeof remainingDays === 'object' ? remainingDays.days : remainingDays;
                    const daysClass = daysValue <= 7 ? 'danger' : daysValue <= 30 ? 'warning' : '';

                    return `
                        <tr>
                            <td><span class="table-token">${item.token}</span></td>
                            <td><span class="table-platform">${item.platform}</span></td>
                            <td><span class="table-apy">${item.apy}%</span></td>
                            <td>${formatDate(item.startDate)}</td>
                            <td>${formatDate(item.endDate)}</td>
                            <td><span class="table-days ${daysClass}">${daysValue} ${text.days}</span></td>
                            <td>
                                ${item.description ? `<button class="table-detail-btn" onclick="showDetail(${index})">详情</button>` : ''}
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
    const description = document.getElementById('description').value.trim();

    if (new Date(endDate) <= new Date(startDate)) {
        alert(LANGUAGES[currentLang].dateError);
        return;
    }

    const record = { token, platform, apy, startDate, endDate, description };
    const data = JSON.parse(localStorage.getItem(KEYS.FIXED_INCOME) || '[]');
    data.push(record);
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

    if (totalAmount === 0) {
        container.innerHTML = '<div class="empty-state"><p>请设置初始总金额以查看策略详情</p></div>';
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
    const rows = strategy.levels.map(level => {
        const amount = (tokenAmount * level.ratio).toFixed(2);
        const badgeClass = level.action === '买入' ? 'badge-buy' : 'badge-sell';

        return `
            <tr>
                <td>$${level.price.toLocaleString()}</td>
                <td><span class="badge ${badgeClass}">${level.action}</span></td>
                <td>${(level.ratio * 100).toFixed(0)}%</td>
                <td class="highlight-amount">${amount} U</td>
            </tr>
        `;
    }).join('');

    return `
        <div class="strategy-table-container">
            <div class="strategy-header">
                <div class="strategy-title">${strategy.name}</div>
                <div class="strategy-subtitle">占比 ${(strategy.ratio * 100).toFixed(0)}% · 总仓位 ${tokenAmount.toFixed(2)} U</div>
            </div>
            <table class="strategy-table">
                <thead>
                    <tr>
                        <th>价格</th>
                        <th>操作</th>
                        <th>仓位比例</th>
                        <th>金额 (U)</th>
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
        content = `# 长线策略（总金额: ${totalAmount} U）\n\n`;
        for (const [key, strategy] of Object.entries(strategies)) {
            const tokenAmount = (totalAmount * strategy.ratio).toFixed(2);
            content += `## ${strategy.name} - 占比 ${(strategy.ratio * 100).toFixed(0)}% (总仓位: ${tokenAmount} U)\n\n`;
            content += '| 价格 | 操作 | 仓位比例 | 金额 (U) |\n';
            content += '|------|------|----------|----------|\n';
            for (const level of strategy.levels) {
                const amount = (tokenAmount * level.ratio).toFixed(2);
                content += `| $${level.price.toLocaleString()} | ${level.action} | ${(level.ratio * 100).toFixed(0)}% | ${amount} U |\n`;
            }
            content += '\n';
        }
    } else {
        content = `长线策略（总金额: ${totalAmount} U）\n\n`;
        for (const [key, strategy] of Object.entries(strategies)) {
            const tokenAmount = (totalAmount * strategy.ratio).toFixed(2);
            content += `${strategy.name} - 占比 ${(strategy.ratio * 100).toFixed(0)}% (总仓位: ${tokenAmount} U)\n`;
            for (const level of strategy.levels) {
                const amount = (tokenAmount * level.ratio).toFixed(2);
                content += `  $${level.price.toLocaleString()} - ${level.action} ${(level.ratio * 100).toFixed(0)}% = ${amount} U\n`;
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

    if (item && item.description) {
        const modalTitle = document.querySelector('#detailModal .modal-header h3');
        modalTitle.textContent = `${item.token} - ${item.platform} 详细说明`;
        document.getElementById('detailContent').textContent = item.description;
        document.getElementById('detailModal').classList.add('active');
    }
}

function closeDetailModal() {
    document.getElementById('detailModal').classList.remove('active');
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

function calculateRemainingDays(endDate) {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}
