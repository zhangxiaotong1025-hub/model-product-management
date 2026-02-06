# 部署指南

## 方式一：GitHub Pages 部署（推荐）

### 步骤：

1. **创建 GitHub 仓库**
   ```bash
   cd "/Users/qingao/Desktop/AI 助手/tuotao/系统产品方案设计/模型商品管理系统"
   git init
   git add .
   git commit -m "Initial commit: 模型商品管理系统"
   ```

2. **在 GitHub 上创建新仓库**
   - 访问：https://github.com/new
   - 仓库名：`model-product-management`
   - 设置为 Public
   - 不要初始化 README

3. **推送代码**
   ```bash
   git remote add origin https://github.com/你的用户名/model-product-management.git
   git branch -M main
   git push -u origin main
   ```

4. **启用 GitHub Pages**
   - 进入仓库 Settings
   - 找到 Pages 选项
   - Source 选择 `main` 分支
   - 点击 Save

5. **访问网站**
   - 等待 1-2 分钟
   - 访问：`https://你的用户名.github.io/model-product-management/`

---

## 方式二：Vercel 部署（更快）

### 步骤：

1. **访问 Vercel**
   - 打开：https://vercel.com
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "New Project"
   - 选择 "Import Git Repository"
   - 选择你的 GitHub 仓库

3. **配置项目**
   - Framework Preset: 选择 "Other"
   - Root Directory: `./`
   - 点击 "Deploy"

4. **访问网站**
   - 部署完成后会自动生成网址
   - 格式：`https://项目名.vercel.app`

---

## 方式三：Netlify 部署

### 步骤：

1. **访问 Netlify**
   - 打开：https://www.netlify.com
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "Add new site"
   - 选择 "Import an existing project"
   - 选择 GitHub
   - 选择你的仓库

3. **配置部署**
   - Build command: 留空
   - Publish directory: `./`
   - 点击 "Deploy site"

4. **访问网站**
   - 部署完成后会生成网址
   - 格式：`https://随机名称.netlify.app`
   - 可以在设置中自定义域名

---

## 快速命令（推荐使用）

如果您已经有 GitHub 账号，直接在终端执行：

```bash
cd "/Users/qingao/Desktop/AI 助手/tuotao/系统产品方案设计/模型商品管理系统"

# 初始化 Git
git init
git add .
git commit -m "Initial commit: 模型商品管理系统"

# 创建 GitHub 仓库（需要先在 GitHub 网站上创建）
# 然后执行：
git remote add origin https://github.com/你的用户名/model-product-management.git
git branch -M main
git push -u origin main
```

---

## 注意事项

1. **当前是静态版本**
   - 所有数据都是前端模拟数据
   - 刷新页面数据会重置
   - 无法真正保存数据

2. **后续升级计划**
   - 需要开发后端 API
   - 需要数据库支持
   - 需要用户认证系统

3. **访问速度**
   - GitHub Pages：国内访问可能较慢
   - Vercel：速度较快，推荐
   - Netlify：速度中等

---

## 需要帮助？

如果遇到问题，请检查：
1. Git 是否已安装：`git --version`
2. GitHub 账号是否已登录
3. 仓库是否设置为 Public
4. GitHub Pages 是否已启用