# 🚀 Vercel 部署完整步骤

## 第一步：创建 GitHub 仓库并推送代码

### 1.1 在 GitHub 创建新仓库

1. 打开浏览器，访问：**https://github.com/new**
2. 填写以下信息：
   - **Repository name**: `model-product-management`
   - **Description**: `模型商品管理系统 - 完整的六大核心模块`
   - **选择 Public** ✅
   - **不要勾选** "Add a README file" ❌
3. 点击 **Create repository** 按钮

### 1.2 推送代码到 GitHub

创建仓库后，GitHub 会显示一个页面，**复制您的仓库地址**（格式如：`https://github.com/你的用户名/model-product-management.git`）

然后在终端执行以下命令：

```bash
cd "/Users/qingao/Desktop/AI 助手/tuotao/系统产品方案设计/模型商品管理系统"

# 添加远程仓库（请替换成你的仓库地址）
git remote add origin https://github.com/你的用户名/model-product-management.git

# 推送代码
git push -u origin main
```

**如果遇到认证问题**，GitHub 会提示您输入用户名和密码：
- 用户名：您的 GitHub 用户名
- 密码：需要使用 **Personal Access Token**（不是 GitHub 密码）

#### 如何获取 Personal Access Token：
1. 访问：https://github.com/settings/tokens
2. 点击 **Generate new token** → **Generate new token (classic)**
3. 填写信息：
   - Note: `Vercel Deploy`
   - Expiration: `No expiration`
   - 勾选：`repo` (所有子选项)
4. 点击 **Generate token**
5. **复制生成的 token**（只显示一次，请妥善保存）
6. 在终端输入密码时，粘贴这个 token

---

## 第二步：使用 Vercel 部署

### 2.1 访问 Vercel 并登录

1. 打开浏览器，访问：**https://vercel.com**
2. 点击右上角 **Sign Up** 或 **Log In**
3. 选择 **Continue with GitHub**
4. 授权 Vercel 访问您的 GitHub 账号

### 2.2 导入项目

1. 登录后，点击右上角 **Add New...** 按钮
2. 选择 **Project**
3. 在 "Import Git Repository" 页面：
   - 找到 `model-product-management` 仓库
   - 点击 **Import** 按钮

### 2.3 配置项目

在配置页面：
- **Project Name**: 保持默认或自定义（如 `model-management`）
- **Framework Preset**: 选择 **Other**
- **Root Directory**: 保持默认 `./`
- **Build Command**: 留空
- **Output Directory**: 留空
- **Install Command**: 留空

### 2.4 开始部署

1. 点击 **Deploy** 按钮
2. 等待部署完成（通常 30-60 秒）
3. 部署成功后会显示 🎉 **Congratulations!**

### 2.5 访问您的网站

部署完成后，Vercel 会自动生成一个网址，格式如：
```
https://model-product-management-xxx.vercel.app
```

点击 **Visit** 按钮或复制网址在浏览器中打开！

---

## 第三步：自定义域名（可选）

如果您想使用自己的域名：

1. 在 Vercel 项目页面，点击 **Settings**
2. 选择 **Domains**
3. 输入您的域名
4. 按照提示配置 DNS 记录

---

## ✅ 部署成功后

您将拥有：
- ✅ 一个在线访问的管理系统
- ✅ 自动 HTTPS 加密
- ✅ 全球 CDN 加速
- ✅ 自动部署（每次推送代码自动更新）

### 系统功能：
1. **企业管理** - 企业组织架构管理
2. **模型管理** - 模型上传、审核、状态管理
3. **商品管理** - 平台商品、企业商品管理
4. **后台类目** - 类目树、属性设置
5. **属性管理** - 属性库管理
6. **前端类目** - 前端菜单、板块设置

---

## 🔄 后续更新

当您需要更新网站时：

```bash
cd "/Users/qingao/Desktop/AI 助手/tuotao/系统产品方案设计/模型商品管理系统"

# 修改文件后
git add .
git commit -m "更新说明"
git push

# Vercel 会自动检测并重新部署
```

---

## ⚠️ 注意事项

1. **当前是静态演示版本**
   - 数据是前端模拟的
   - 刷新页面数据会重置
   - 无法真正保存数据

2. **如需真正可用的系统**
   - 需要开发后端 API
   - 需要数据库支持
   - 需要用户认证系统

---

## 🆘 常见问题

**Q: 推送代码时提示 "Permission denied"？**
A: 需要使用 Personal Access Token 代替密码

**Q: Vercel 部署失败？**
A: 
- 检查仓库是否为 Public
- 确认所有文件都已推送
- 查看 Vercel 的错误日志

**Q: 网站显示 404？**
A: 
- 确认 index.html 在根目录
- 等待 1-2 分钟让部署完成
- 清除浏览器缓存

---

## 📞 需要帮助？

如果遇到任何问题，请告诉我：
1. 您执行到哪一步
2. 遇到的具体错误信息
3. 错误截图（如果有）

我会立即帮您解决！🚀