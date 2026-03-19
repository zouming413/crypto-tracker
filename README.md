# Simple Crypto

> 简单安全的加密货币理财策略工具，纯静态前端，数据存储在浏览器本地。

## ✨ 特性

- 🎨 **极简界面**：聚焦固定收益与长线策略
- 💾 **本地存储**：数据保存在浏览器 localStorage，无需后端
- 📱 **响应式设计**：手机、平板、电脑完美适配
- ⚡ **极简架构**：纯前端实现，无框架依赖
- 🚀 **一键部署**：支持 GitHub Pages 免费部署

## 📊 功能模块

### 1. 固定收益 (Fixed Income)
记录各类固定收益产品，包括：
- 收益代币（USDT、BTC 等）
- 入口平台
- 年化收益率
- 起/止日期
- 自动计算剩余天数

### 2. 长线策略 (Long-term Strategy)
管理长期持仓策略，包括：
- 设置初始总金额
- 自动计算各代币仓位分配
- 价格档位与操作策略
- 一键复制策略（文本/Markdown）

默认策略：
- **BTC**：60% 仓位，逢低买入
- **ETH**：30% 仓位，波段操作
- **BNB**：10% 仓位，波段操作

## 🚀 快速开始

### 本地运行

1. 克隆或下载项目
```bash
git clone https://github.com/your-username/crypto-tracker.git
cd crypto-tracker
```

2. 直接用浏览器打开 `index.html`
```bash
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

### 部署到 GitHub Pages

#### 方法一：使用用户页面（推荐）

1. 创建仓库：`username.github.io`
2. 上传项目文件
3. 访问 `https://username.github.io`

#### 方法二：使用项目页面

1. 创建任意名称的仓库
2. 上传项目文件
3. 在仓库设置中启用 GitHub Pages
4. 选择分支（通常为 main）
5. 访问 `https://username.github.io/repository-name`

### 部署到 Cloudflare Pages（更快）

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 选择 "Pages" → "Create a project"
3. 连接 GitHub 仓库
4. 构建设置留空（纯静态）
5. 部署完成，获得 `*.pages.dev` 域名

## 🛠️ 自定义

### 修改默认策略

编辑 `app.js` 中的 `DEFAULT_STRATEGIES` 对象：

```javascript
const DEFAULT_STRATEGIES = {
    BTC: {
        name: 'BTC',
        ratio: 0.6,  // 占比 60%
        levels: [
            { price: 65000, action: '买入', ratio: 0.15 },
            // 添加更多档位...
        ]
    },
    // 添加新代币...
    AAVE: {
        name: 'AAVE',
        ratio: 0.1,
        levels: [...]
    }
};
```

### 修改颜色主题

编辑 `style.css` 中的 CSS 变量：

```css
:root {
    --bg-primary: #0a0e27;    /* 主背景色 */
    --accent-primary: #6366f1; /* 主色调 */
    /* 更多颜色... */
}
```

## 📦 数据备份

数据存储在浏览器 localStorage 中，建议定期备份：

1. 打开浏览器开发者工具（F12）
2. 选择 "Application" 或 "存储" 标签
3. 找到 "Local Storage"
4. 复制相关数据保存为 JSON

## 🔒 隐私说明

- 所有数据存储在**本地浏览器**中
- 不向任何服务器发送数据
- 不使用任何第三方分析工具
- 完全私密，只有你能看到

## 📝 License

MIT License - 自由使用、修改和分发

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**Made with ❤️ for crypto investors**
