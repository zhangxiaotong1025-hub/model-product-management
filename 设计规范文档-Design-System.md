# 模型商品管理系统 - 设计规范文档 (Design System)

> 本文档定义了整个系统的视觉设计规范，可用于 Figma 设计重建参考

---

## 📐 设计原则

### 核心理念
- **简洁现代**：采用卡片式设计，大圆角，柔和阴影
- **层次分明**：通过颜色、阴影、间距建立清晰的视觉层次
- **交互友好**：丰富的 hover、focus、active 状态反馈
- **一致性**：统一的设计语言贯穿所有页面

---

## 🎨 颜色系统 (Color System)

### 主色调 (Primary Colors)

| 颜色名称 | HEX 值 | RGB 值 | 用途 |
|---------|--------|--------|------|
| Primary | `#6366F1` | `rgb(99, 102, 241)` | 主按钮、链接、激活状态 |
| Secondary | `#8B5CF6` | `rgb(139, 92, 246)` | 渐变辅助色、次要强调 |
| Success | `#10B981` | `rgb(16, 185, 129)` | 成功状态、启用状态 |
| Warning | `#F59E0B` | `rgb(245, 158, 11)` | 警告状态、待处理 |
| Danger | `#EF4444` | `rgb(239, 68, 68)` | 错误状态、停用状态 |
| Info | `#3B82F6` | `rgb(59, 130, 246)` | 信息提示 |

### 渐变色 (Gradients)

```css
/* 主渐变 - 用于按钮、导航激活状态 */
linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)

/* 成功渐变 - 用于成功状态标签 */
linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)

/* 警告渐变 - 用于警告状态标签 */
linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)

/* 危险渐变 - 用于错误状态标签 */
linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)

/* 信息渐变 - 用于信息状态标签 */
linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)
```

### 背景色 (Background Colors)

| 颜色名称 | HEX 值 | RGB 值 | 用途 |
|---------|--------|--------|------|
| BG Primary | `#F5F7FA` | `rgb(245, 247, 250)` | 页面主背景 |
| BG Secondary | `#FFFFFF` | `rgb(255, 255, 255)` | 侧边栏、输入框背景 |
| BG Card | `#FFFFFF` | `rgb(255, 255, 255)` | 卡片背景 |

### 文本颜色 (Text Colors)

| 颜色名称 | HEX 值 | RGB 值 | 用途 |
|---------|--------|--------|------|
| Text Primary | `#1E293B` | `rgb(30, 41, 59)` | 主要文本 |
| Text Secondary | `#64748B` | `rgb(100, 116, 139)` | 次要文本、说明文字 |
| Text Tertiary | `#94A3B8` | `rgb(148, 163, 184)` | 辅助文本、占位符 |

### 边框颜色 (Border Colors)

| 颜色名称 | HEX 值 | RGB 值 | 透明度 | 用途 |
|---------|--------|--------|--------|------|
| Border | `#E2E8F0` | `rgb(226, 232, 240)` | 100% | 标准边框 |
| Border Light | `#E2E8F0` | `rgb(226, 232, 240)` | 60% | 卡片边框 |

---

## 📏 间距系统 (Spacing System)

### 基础间距单位
采用 4px 基础单位，所有间距都是 4 的倍数

| 名称 | 值 | 用途 |
|------|-----|------|
| xs | 4px | 最小间距 |
| sm | 8px | 小间距 |
| md | 12px | 中等间距 |
| lg | 16px | 大间距 |
| xl | 20px | 超大间距 |
| 2xl | 24px | 区块间距 |
| 3xl | 32px | 页面区域间距 |

### 常用间距组合

```
组件内边距 (Padding):
- 按钮: 11px 20px
- 输入框: 10px 16px
- 卡片: 24px
- 标签: 4px 10px

组件外边距 (Margin):
- 页面标题下方: 32px
- 卡片之间: 24px
- 表单项之间: 16px
- 按钮之间: 12px
```

---

## 🔲 圆角系统 (Border Radius)

| 名称 | 值 | 用途 |
|------|-----|------|
| radius-sm | 8px | 小元素（输入框、小按钮） |
| radius-md | 12px | 中等元素（按钮、标签、导航项） |
| radius-lg | 16px | 大元素（卡片内部区域） |
| radius-xl | 20px | 超大元素（主卡片容器） |
| radius-full | 50% / 9999px | 圆形（头像）/ 胶囊形（标签） |

### 组件圆角规范

```
- 主卡片: 20px
- 按钮: 12px
- 输入框: 12px
- 导航项: 12px
- 状态标签: 20px (胶囊形)
- 产品标签: 6px
- 头像: 50% (圆形)
```

---

## 🌑 阴影系统 (Shadow System)

### 阴影层级

```css
/* 轻微阴影 - 用于侧边栏 */
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.04), 
             0 1px 2px 0 rgba(0, 0, 0, 0.02);

/* 中等阴影 - 用于 hover 状态 */
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.06), 
             0 2px 4px -1px rgba(0, 0, 0, 0.04);

/* 深阴影 - 用于弹窗 */
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 
             0 4px 6px -2px rgba(0, 0, 0, 0.04);

/* 卡片阴影 - 用于所有卡片 */
--shadow-card: 0 2px 8px rgba(0, 0, 0, 0.04);

/* 按钮阴影 - 用于主按钮 */
--shadow-button: 0 4px 12px rgba(99, 102, 241, 0.2);

/* 按钮 hover 阴影 */
--shadow-button-hover: 0 6px 16px rgba(99, 102, 241, 0.3);
```

---

## 🔤 字体系统 (Typography)

### 字体家族

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             'PingFang SC', 'Hiragino Sans GB', 
             'Microsoft YaHei', sans-serif;
```

### 字体大小规范

| 名称 | 大小 | 行高 | 用途 |
|------|------|------|------|
| Display | 32px | 1.2 | 大标题 |
| H1 | 28px | 1.3 | 页面标题 |
| H2 | 20px | 1.4 | 区块标题 |
| H3 | 18px | 1.4 | 卡片标题 |
| H4 | 16px | 1.5 | 小标题 |
| Body | 14px | 1.6 | 正文 |
| Small | 13px | 1.5 | 辅助文字 |
| Caption | 12px | 1.4 | 说明文字 |
| Tiny | 11px | 1.3 | 最小文字 |

### 字重规范

| 名称 | 值 | 用途 |
|------|-----|------|
| Regular | 400 | 正文 |
| Medium | 500 | 导航、次要标题 |
| Semibold | 600 | 按钮、标签、重要文字 |
| Bold | 700 | 标题、强调 |

---

## 🎯 组件规范 (Component Specs)

### 1. 按钮 (Buttons)

#### 主按钮 (Primary Button)
```
尺寸: 高度 42px
内边距: 11px 20px
圆角: 12px
字体: 14px / 600
背景: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)
文字颜色: #FFFFFF
阴影: 0 4px 12px rgba(99, 102, 241, 0.2)

Hover 状态:
- 上移: translateY(-2px)
- 阴影: 0 6px 16px rgba(99, 102, 241, 0.3)

Active 状态:
- 上移: translateY(0)
```

#### 次要按钮 (Secondary Button)
```
尺寸: 高度 40px
内边距: 10px 18px
圆角: 12px
字体: 14px / 500
背景: #FFFFFF
边框: 1px solid #E2E8F0
文字颜色: #1E293B

Hover 状态:
- 背景: #F5F7FA
- 边框: #6366F1
- 文字: #6366F1
- 上移: translateY(-1px)
```

#### 图标按钮 (Icon Button)
```
尺寸: 36px × 36px
圆角: 12px
背景: #FFFFFF
边框: 1px solid #E2E8F0
图标颜色: #64748B

Hover 状态:
- 背景: #F5F7FA
- 边框: #6366F1
- 图标: #6366F1
- 上移: translateY(-1px)
```

### 2. 输入框 (Input Fields)

```
尺寸: 高度 40px
内边距: 10px 16px
圆角: 12px
字体: 14px / 400
背景: #FFFFFF
边框: 1px solid #E2E8F0
文字颜色: #1E293B
占位符: #94A3B8

Focus 状态:
- 边框: #6366F1
- 阴影: 0 0 0 3px rgba(99, 102, 241, 0.1)
```

### 3. 下拉选择 (Select)

```
尺寸: 高度 40px
内边距: 10px 14px
圆角: 12px
字体: 14px / 400
背景: #FFFFFF
边框: 1px solid #E2E8F0
最小宽度: 140px

Hover 状态:
- 边框: #6366F1

Focus 状态:
- 边框: #6366F1
- 阴影: 0 0 0 3px rgba(99, 102, 241, 0.1)
```

### 4. 卡片 (Cards)

```
背景: #FFFFFF
圆角: 20px
内边距: 24px
边框: 1px solid rgba(226, 232, 240, 0.6)
阴影: 0 2px 8px rgba(0, 0, 0, 0.04)

Hover 状态:
- 阴影: 0 4px 6px -1px rgba(0, 0, 0, 0.06)
- 上移: translateY(-2px)
- 过渡: 0.3s ease
```

### 5. 状态标签 (Status Badges)

#### 成功/启用状态
```
内边距: 5px 12px
圆角: 20px (胶囊形)
字体: 12px / 600
字间距: 0.3px
背景: linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)
文字颜色: #065F46
```

#### 警告/待处理状态
```
背景: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)
文字颜色: #92400E
```

#### 危险/停用状态
```
背景: linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)
文字颜色: #991B1B
```

#### 信息状态
```
背景: linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)
文字颜色: #1E40AF
```

### 6. 产品标签 (Product Tags)

```
内边距: 4px 10px
圆角: 6px
字体: 12px / 500
背景: #F5F7FA
边框: 1px solid #E2E8F0
文字颜色: #1E293B
```

### 7. 导航项 (Navigation Items)

```
内边距: 10px 14px
圆角: 12px
字体: 14px / 500
文字颜色: #64748B
图标宽度: 20px

Hover 状态:
- 背景: #F1F5F9
- 文字: #1E293B

Active 状态:
- 背景: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)
- 文字: #FFFFFF
- 阴影: 0 4px 12px rgba(99, 102, 241, 0.2)
```

### 8. 表格 (Tables)

#### 表头
```
背景: #F5F7FA
内边距: 14px 16px
字体: 12px / 600
文字颜色: #94A3B8
文字转换: uppercase
字间距: 0.5px
边框底部: 2px solid #E2E8F0
```

#### 表格行
```
内边距: 16px
字体: 14px / 400
文字颜色: #1E293B
边框底部: 1px solid #E2E8F0

Hover 状态:
- 背景: #F8FAFC
- 过渡: 0.2s ease
```

### 9. 分页 (Pagination)

#### 分页按钮
```
尺寸: 36px × 36px (最小宽度)
内边距: 0 12px
圆角: 12px
字体: 14px / 400
背景: #FFFFFF
边框: 1px solid #E2E8F0
文字颜色: #1E293B

Hover 状态:
- 背景: #F5F7FA
- 边框: #6366F1
- 文字: #6366F1

Active 状态:
- 背景: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)
- 文字: #FFFFFF
- 边框: transparent
- 阴影: 0 2px 8px rgba(99, 102, 241, 0.2)
```

### 10. 搜索框 (Search Box)

```
尺寸: 高度 40px
内边距: 10px 16px
圆角: 12px
字体: 14px / 400
背景: #FFFFFF
边框: 1px solid #E2E8F0
最小宽度: 300px
图标颜色: #64748B

Focus 状态:
- 边框: #6366F1
- 阴影: 0 0 0 3px rgba(99, 102, 241, 0.1)
```

---

## 📱 布局规范 (Layout Specs)

### 侧边栏 (Sidebar)
```
宽度: 260px
背景: #FFFFFF
边框右侧: 1px solid #E2E8F0
阴影: 0 1px 3px 0 rgba(0, 0, 0, 0.04)
固定定位: fixed
高度: 100vh
```

### 主内容区 (Main Content)
```
左边距: 260px (侧边栏宽度)
内边距: 24px
最小高度: 100vh
背景: #F5F7FA
```

### 页面头部 (Page Header)
```
下边距: 32px

标题:
- 字体: 28px / 700
- 颜色: #1E293B

描述:
- 字体: 14px / 400
- 颜色: #64748B
- 上边距: 8px
```

### 筛选区 (Filter Section)
```
背景: #FFFFFF
圆角: 16px
内边距: 20px 24px
下边距: 24px
阴影: 0 2px 8px rgba(0, 0, 0, 0.04)
边框: 1px solid rgba(226, 232, 240, 0.6)
```

### 操作区 (Action Bar)
```
下边距: 20px
布局: flex (space-between)

左侧:
- 间距: 16px

右侧:
- 间距: 12px
```

### 内容区 (Content Section)
```
背景: #FFFFFF
圆角: 16px
内边距: 24px
阴影: 0 2px 8px rgba(0, 0, 0, 0.04)
边框: 1px solid rgba(226, 232, 240, 0.6)
```

---

## 🎬 动画规范 (Animation Specs)

### 过渡时长
```
快速: 0.15s
标准: 0.2s
慢速: 0.3s
```

### 缓动函数
```
标准: ease
进入: ease-out
退出: ease-in
双向: ease-in-out
```

### 常用动画

#### 上浮效果
```css
transform: translateY(-2px);
transition: all 0.3s ease;
```

#### 淡入淡出
```css
opacity: 0 → 1;
transition: opacity 0.2s ease;
```

#### 骨架屏加载
```css
@keyframes skeleton-loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}
animation: skeleton-loading 1.5s ease-in-out infinite;
```

---

## 📐 栅格系统 (Grid System)

### 概览卡片布局
```
display: grid;
grid-template-columns: 2fr 1fr;
gap: 24px;
```

### 指标卡片布局
```
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: 16px;
```

### 关键指标布局
```
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 16px;
```

---

## 🎨 图标系统 (Icon System)

### 图标库
使用 **Font Awesome 6** 图标库

### 图标尺寸
```
小: 14px
中: 16px
大: 20px
超大: 24px
```

### 常用图标

| 功能 | 图标 | 代码 |
|------|------|------|
| 搜索 | 🔍 | `fa-search` |
| 编辑 | ✏️ | `fa-edit` |
| 删除 | 🗑️ | `fa-trash` |
| 查看 | 👁️ | `fa-eye` |
| 设置 | ⚙️ | `fa-cog` |
| 用户 | 👤 | `fa-user` |
| 企业 | 🏢 | `fa-building` |
| 产品 | 📦 | `fa-box` |
| 权限 | 🔐 | `fa-lock` |
| 菜单 | 📋 | `fa-list` |
| 角色 | 👥 | `fa-users` |
| 启用 | ✅ | `fa-check` |
| 停用 | 🚫 | `fa-ban` |
| 添加 | ➕ | `fa-plus` |
| 下拉 | 🔽 | `fa-chevron-down` |

---

## 📱 响应式断点 (Responsive Breakpoints)

```css
/* 移动端 */
@media (max-width: 768px) {
    --sidebar-width: 0;
    /* 侧边栏隐藏，通过汉堡菜单切换 */
}

/* 平板 */
@media (max-width: 1024px) {
    /* 筛选区换行 */
    /* 操作区垂直排列 */
}

/* 桌面端 */
@media (min-width: 1025px) {
    /* 标准布局 */
}
```

---

## 🎯 状态规范 (State Specs)

### 空状态 (Empty State)
```
布局: 垂直居中
内边距: 80px 20px
文本对齐: center

图标:
- 尺寸: 64px
- 颜色: #94A3B8
- 透明度: 0.5
- 下边距: 16px

文字:
- 字体: 16px / 400
- 颜色: #64748B
- 下边距: 24px

按钮:
- 主按钮样式
```

### 加载状态 (Loading State)
```
骨架屏:
- 高度: 60px
- 背景: linear-gradient(90deg, #F1F5F9 0%, #E2E8F0 50%, #F1F5F9 100%)
- 圆角: 12px
- 下边距: 12px
- 动画: skeleton-loading 1.5s infinite
```

### 错误状态 (Error State)
```
Toast 提示:
- 背景: #FEE2E2
- 文字: #991B1B
- 圆角: 12px
- 内边距: 12px 16px
- 阴影: 0 4px 12px rgba(239, 68, 68, 0.2)
```

---

## 🔧 Figma 使用建议

### 1. 创建颜色样式 (Color Styles)
将所有颜色定义为 Figma 颜色样式，便于全局管理和更新

### 2. 创建文本样式 (Text Styles)
为每个字体大小和字重组合创建文本样式

### 3. 创建组件 (Components)
将所有可复用元素创建为组件：
- 按钮（主按钮、次要按钮、图标按钮）
- 输入框
- 下拉选择
- 标签（状态标签、产品标签）
- 导航项
- 卡片
- 表格行

### 4. 使用自动布局 (Auto Layout)
所有组件都应使用自动布局，便于响应式调整

### 5. 创建变体 (Variants)
为有多种状态的组件创建变体：
- 按钮：primary / secondary / icon
- 状态标签：success / warning / danger / info
- 导航项：default / hover / active

### 6. 建立设计系统库 (Design System Library)
将所有样式、组件发布为团队库，供其他设计文件使用

---

## 📦 导出规范 (Export Specs)

### 图标导出
```
格式: SVG
尺寸: 24×24px
颜色: 单色（便于代码中修改）
```

### 图片导出
```
格式: PNG / JPG
分辨率: @1x, @2x, @3x
压缩: 优化后导出
```

### 切图命名规范
```
组件类型_状态_尺寸.格式

示例:
- button_primary_default.svg
- icon_search_24.svg
- badge_success.svg
```

---

## 🎓 设计资源

### 推荐字体
- **中文**: PingFang SC / Microsoft YaHei
- **英文**: SF Pro / Segoe UI
- **代码**: Fira Code / JetBrains Mono

### 推荐图标库
- Font Awesome 6
- Heroicons
- Lucide Icons

### 设计工具插件
- **Figma Tokens**: 管理设计 tokens
- **Content Reel**: 填充模拟数据
- **Unsplash**: 高质量图片
- **Iconify**: 图标库

---

## 📝 版本记录

| 版本 | 日期 | 更新内容 |
|------|------|----------|
| 1.0.0 | 2026-02-11 | 初始版本，完整设计规范 |

---

## 📞 联系方式

如有设计规范相关问题，请联系设计团队。

---

**文档结束**

> 💡 提示：本文档应与实际代码保持同步更新，确保设计与开发的一致性。
