#!/bin/bash

# Figma 插件一键安装脚本
# 使用方法：在终端运行 bash install-figma-plugin.sh

echo "🎨 Figma 设计系统插件 - 一键安装脚本"
echo "=========================================="
echo ""

# 检查操作系统
OS="$(uname -s)"
case "${OS}" in
    Linux*)     MACHINE=Linux;;
    Darwin*)    MACHINE=Mac;;
    CYGWIN*)    MACHINE=Cygwin;;
    MINGW*)     MACHINE=MinGw;;
    *)          MACHINE="UNKNOWN:${OS}"
esac

echo "✅ 检测到操作系统: $MACHINE"
echo ""

# 步骤 1: 复制插件代码到剪贴板
echo "📋 步骤 1/3: 复制插件代码到剪贴板..."

if [ -f "figma-plugin-code.js" ]; then
    if [ "$MACHINE" = "Mac" ]; then
        cat figma-plugin-code.js | pbcopy
        echo "✅ 插件代码已复制到剪贴板（Mac）"
    elif [ "$MACHINE" = "Linux" ]; then
        if command -v xclip &> /dev/null; then
            cat figma-plugin-code.js | xclip -selection clipboard
            echo "✅ 插件代码已复制到剪贴板（Linux）"
        elif command -v xsel &> /dev/null; then
            cat figma-plugin-code.js | xsel --clipboard
            echo "✅ 插件代码已复制到剪贴板（Linux）"
        else
            echo "⚠️  未检测到 xclip 或 xsel，请手动复制 figma-plugin-code.js"
        fi
    elif [ "$MACHINE" = "MinGw" ] || [ "$MACHINE" = "Cygwin" ]; then
        cat figma-plugin-code.js | clip
        echo "✅ 插件代码已复制到剪贴板（Windows）"
    else
        echo "⚠️  无法自动复制，请手动复制 figma-plugin-code.js"
    fi
else
    echo "❌ 错误: 找不到 figma-plugin-code.js 文件"
    echo "   请确保在正确的目录下运行此脚本"
    exit 1
fi

echo ""

# 步骤 2: 打开 Figma
echo "🌐 步骤 2/3: 打开 Figma..."

FIGMA_URL="https://www.figma.com"

if [ "$MACHINE" = "Mac" ]; then
    open "$FIGMA_URL"
    echo "✅ 已在浏览器中打开 Figma"
elif [ "$MACHINE" = "Linux" ]; then
    if command -v xdg-open &> /dev/null; then
        xdg-open "$FIGMA_URL"
        echo "✅ 已在浏览器中打开 Figma"
    else
        echo "⚠️  请手动打开浏览器访问: $FIGMA_URL"
    fi
elif [ "$MACHINE" = "MinGw" ] || [ "$MACHINE" = "Cygwin" ]; then
    start "$FIGMA_URL"
    echo "✅ 已在浏览器中打开 Figma"
else
    echo "⚠️  请手动打开浏览器访问: $FIGMA_URL"
fi

echo ""

# 步骤 3: 显示操作指南
echo "📖 步骤 3/3: 在 Figma 中完成以下操作"
echo "=========================================="
echo ""
echo "1️⃣  在 Figma 中创建新文件"
echo "   File → New design file"
echo ""
echo "2️⃣  创建新插件"
echo "   Plugins → Development → New Plugin"
echo "   选择 'Figma design' 模板"
echo "   命名: 设计系统生成器"
echo ""
echo "3️⃣  替换插件代码"
echo "   在打开的代码编辑器中:"
echo "   - 找到 code.ts 文件"
echo "   - 删除所有默认代码"
echo "   - 粘贴剪贴板中的代码 (Cmd/Ctrl + V)"
echo "   - 保存 (Cmd/Ctrl + S)"
echo ""
echo "4️⃣  运行插件"
echo "   Plugins → Development → 设计系统生成器"
echo ""
echo "=========================================="
echo "✨ 完成后，插件会自动生成完整的设计系统！"
echo ""
echo "📚 详细说明请查看: Figma插件使用说明.md"
echo ""

# 等待用户确认
read -p "按 Enter 键查看详细使用说明..."

# 显示详细说明
if [ -f "Figma插件使用说明.md" ]; then
    echo ""
    echo "📖 正在打开使用说明..."
    
    if [ "$MACHINE" = "Mac" ]; then
        open "Figma插件使用说明.md"
    elif [ "$MACHINE" = "Linux" ]; then
        if command -v xdg-open &> /dev/null; then
            xdg-open "Figma插件使用说明.md"
        else
            cat "Figma插件使用说明.md"
        fi
    else
        cat "Figma插件使用说明.md"
    fi
fi

echo ""
echo "🎉 安装脚本执行完成！"
echo "如有问题，请查看 Figma插件使用说明.md"
