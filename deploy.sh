#!/bin/bash

# Simple Crypto - GitHub Pages 部署脚本

set -e

echo "🚀 开始部署到 GitHub Pages..."

# 检查是否在项目目录
if [ ! -f "index.html" ]; then
    echo "❌ 错误：请在项目根目录运行此脚本"
    exit 1
fi

# 初始化 Git 仓库（如果还没有）
if [ ! -d ".git" ]; then
    echo "📦 初始化 Git 仓库..."
    git init
    git add .
    git commit -m "Initial commit: Simple Crypto"
    echo "✅ Git 仓库初始化完成"
else
    echo "✅ Git 仓库已存在"
fi

# 提示用户创建 GitHub 仓库
echo ""
echo "📝 接下来的步骤："
echo ""
echo "1. 在 GitHub 上创建新仓库："
echo "   - 访问：https://github.com/new"
echo "   - 仓库名建议：crypto-tracker 或 username.github.io"
echo "   - 设置为 Public（公开）"
echo "   - 不要初始化 README、.gitignore 或 license"
echo ""
echo "2. 添加远程仓库并推送："
echo "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. 启用 GitHub Pages："
echo "   - 进入仓库 Settings（设置）"
echo "   - 左侧菜单找到 Pages"
echo "   - Source 选择：Deploy from a branch"
echo "   - Branch 选择：main / root"
echo "   - 点击 Save"
echo ""
echo "4. 等待几分钟，访问你的网站："
echo "   - 如果是 username.github.io：https://username.github.io"
echo "   - 如果是其他仓库名：https://username.github.io/repository-name"
echo ""
echo "✨ 部署完成！"
