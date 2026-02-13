@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

REM Figma 插件一键安装脚本 (Windows)
REM 使用方法：双击运行此文件

echo.
echo 🎨 Figma 设计系统插件 - 一键安装脚本
echo ==========================================
echo.

REM 步骤 1: 复制插件代码到剪贴板
echo 📋 步骤 1/3: 复制插件代码到剪贴板...

if exist "figma-plugin-code.js" (
    type "figma-plugin-code.js" | clip
    echo ✅ 插件代码已复制到剪贴板
) else (
    echo ❌ 错误: 找不到 figma-plugin-code.js 文件
    echo    请确保在正确的目录下运行此脚本
    pause
    exit /b 1
)

echo.

REM 步骤 2: 打开 Figma
echo 🌐 步骤 2/3: 打开 Figma...
start https://www.figma.com
echo ✅ 已在浏览器中打开 Figma

echo.

REM 步骤 3: 显示操作指南
echo 📖 步骤 3/3: 在 Figma 中完成以下操作
echo ==========================================
echo.
echo 1️⃣  在 Figma 中创建新文件
echo    File → New design file
echo.
echo 2️⃣  创建新插件
echo    Plugins → Development → New Plugin
echo    选择 'Figma design' 模板
echo    命名: 设计系统生成器
echo.
echo 3️⃣  替换插件代码
echo    在打开的代码编辑器中:
echo    - 找到 code.ts 文件
echo    - 删除所有默认代码
echo    - 粘贴剪贴板中的代码 (Ctrl + V)
echo    - 保存 (Ctrl + S)
echo.
echo 4️⃣  运行插件
echo    Plugins → Development → 设计系统生成器
echo.
echo ==========================================
echo ✨ 完成后，插件会自动生成完整的设计系统！
echo.
echo 📚 详细说明请查看: Figma插件使用说明.md
echo.

REM 等待用户确认
pause

REM 打开使用说明
if exist "Figma插件使用说明.md" (
    echo.
    echo 📖 正在打开使用说明...
    start "" "Figma插件使用说明.md"
)

echo.
echo 🎉 安装脚本执行完成！
echo 如有问题，请查看 Figma插件使用说明.md
echo.
pause
