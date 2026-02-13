# Figma 插件使用说明

> 本文档说明如何使用自动生成的 Figma 插件代码，在 Figma 中一键创建完整的设计系统和权限管理页面

---

## 📋 目录

1. [功能介绍](#功能介绍)
2. [使用步骤](#使用步骤)
3. [生成内容](#生成内容)
4. [常见问题](#常见问题)
5. [进阶使用](#进阶使用)

---

## 🎯 功能介绍

本插件将自动在 Figma 中生成：

### ✅ 设计系统基础
- **19 种颜色样式** - 主色、辅助色、背景色、文本色、边框色
- **9 种文本样式** - Display、H1-H4、Body、Small、Caption、Tiny
- **完整的设计规范** - 间距、圆角、阴影系统

### ✅ 组件库
- **按钮组件** - 主按钮、次要按钮、图标按钮
- **输入框组件** - 带占位符的输入框
- **状态标签组件** - 成功、警告、危险、信息 4 种状态
- **卡片组件** - 标准卡片容器
- **表格行组件** - 完整的表格行布局

### ✅ 页面示例
- **企业列表页面** - 完整的企业管理列表页面
  - 页面标题和描述
  - 筛选区（卡片化设计）
  - 操作区（结果统计 + 新建按钮）
  - 表格（表头 + 8 行数据）

---

## 🚀 使用步骤

### 第一步：打开 Figma

1. 访问 [Figma 官网](https://www.figma.com)
2. 登录您的账号
3. 创建一个新的设计文件（File → New design file）

### 第二步：创建插件

1. 在 Figma 中，点击菜单：**Plugins → Development → New Plugin**
2. 选择 **"Figma design"** 模板
3. 输入插件名称：`设计系统生成器`
4. 点击 **Save**

### 第三步：替换插件代码

1. Figma 会自动打开插件代码编辑器
2. 找到 `code.ts` 文件
3. **删除所有默认代码**
4. 打开本项目的 `figma-plugin-code.js` 文件
5. **复制全部代码**
6. **粘贴到 `code.ts` 文件中**
7. 保存文件（Ctrl/Cmd + S）

### 第四步：运行插件

1. 在 Figma 中，点击菜单：**Plugins → Development → 设计系统生成器**
2. 插件开始运行，会显示进度提示
3. 等待几秒钟，插件会自动生成所有内容
4. 完成后会显示：**✅ 设计系统生成完成！**

### 第五步：查看结果

插件会自动创建 3 个页面：

1. **🎨 设计系统** - 颜色和文本样式（在左侧样式面板中查看）
2. **📦 组件库** - 所有可复用组件
3. **📄 页面示例** - 企业列表页面完整示例

---

## 📦 生成内容详解

### 1. 颜色样式（Colors）

在左侧样式面板中，您会看到以下颜色样式：

```
Colors/
├─ primary         (#6366F1) - 主色调
├─ secondary       (#8B5CF6) - 辅助色
├─ success         (#10B981) - 成功色
├─ warning         (#F59E0B) - 警告色
├─ danger          (#EF4444) - 危险色
├─ info            (#3B82F6) - 信息色
├─ bgPrimary       (#F5F7FA) - 主背景
├─ bgSecondary     (#FFFFFF) - 次背景
├─ bgCard          (#FFFFFF) - 卡片背景
├─ textPrimary     (#1E293B) - 主文本
├─ textSecondary   (#64748B) - 次文本
├─ textTertiary    (#94A3B8) - 辅助文本
└─ border          (#E2E8F0) - 边框色
```

### 2. 文本样式（Typography）

```
Typography/
├─ display    (32px Bold)     - 大标题
├─ h1         (28px Bold)     - 页面标题
├─ h2         (20px SemiBold) - 区块标题
├─ h3         (18px SemiBold) - 卡片标题
├─ h4         (16px SemiBold) - 小标题
├─ body       (14px Regular)  - 正文
├─ small      (13px Regular)  - 辅助文字
├─ caption    (12px Regular)  - 说明文字
└─ tiny       (11px Regular)  - 最小文字
```

### 3. 组件库（Components）

#### 按钮组件
- **Button/primary** - 主按钮（渐变背景 + 阴影）
- **Button/secondary** - 次要按钮（白色背景 + 边框）
- **Button/icon** - 图标按钮（36×36px）

#### 输入框组件
- **Input/Default** - 标准输入框（300×40px）

#### 状态标签组件
- **Badge/success** - 成功状态（绿色渐变）
- **Badge/warning** - 警告状态（黄色渐变）
- **Badge/danger** - 危险状态（红色渐变）
- **Badge/info** - 信息状态（蓝色渐变）

#### 卡片组件
- **Card/Default** - 标准卡片（400×200px，20px 圆角）

#### 表格组件
- **Table/Row** - 表格行（1000×60px，包含多列数据）

### 4. 页面示例

**企业列表页面**（1440×1024px）包含：

- ✅ 页面标题："企业管理"（28px Bold）
- ✅ 页面描述："管理平台内企业主体"（14px Regular）
- ✅ 筛选区卡片（1132×80px）
  - 企业名称输入框
  - 查询按钮
- ✅ 操作区
  - 结果统计："共 156 条结果"
  - 新建企业按钮
- ✅ 表格卡片（1132×600px）
  - 表头（6 列）
  - 8 行数据示例
  - 包含状态标签

---

## ❓ 常见问题

### Q1: 插件运行失败，提示字体错误？

**A:** 插件默认使用 **Inter** 字体。如果您的 Figma 中没有安装 Inter 字体：

**解决方案 1：安装 Inter 字体**
1. 访问 [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
2. 下载并安装字体
3. 重启 Figma
4. 重新运行插件

**解决方案 2：修改插件代码**
将代码中的所有 `'Inter'` 替换为您已安装的字体，如：
```javascript
// 将
fontName: { family: 'Inter', style: fontWeight }

// 改为
fontName: { family: 'Arial', style: fontWeight }
```

### Q2: 生成的组件位置重叠？

**A:** 这是正常的，插件生成的组件是按顺序排列的。您可以：
1. 手动调整组件位置
2. 使用 Figma 的自动布局功能（Shift + A）
3. 修改插件代码中的 `xOffset` 和 `yOffset` 值

### Q3: 如何修改生成的颜色？

**A:** 有两种方式：

**方式 1：在 Figma 中修改**
1. 在左侧样式面板找到对应颜色样式
2. 右键 → Edit style
3. 修改颜色值
4. 所有使用该样式的元素会自动更新

**方式 2：修改插件代码**
在 `DESIGN_TOKENS.colors` 中修改颜色值：
```javascript
colors: {
  primary: { r: 99/255, g: 102/255, b: 241/255 }, // 修改这里
  // ...
}
```

### Q4: 如何添加更多组件？

**A:** 参考现有组件的创建函数，添加新的组件创建函数：

```javascript
async function createMyComponent(): Promise<ComponentNode> {
  const component = figma.createComponent();
  component.name = 'MyComponent/Default';
  component.resize(200, 100);
  
  // 添加背景
  const bg = createRect(200, 100, [{
    type: 'SOLID',
    color: DESIGN_TOKENS.colors.bgCard,
  }]);
  
  component.appendChild(bg);
  return component;
}

// 在 main() 函数中调用
const myComponent = await createMyComponent();
myComponent.x = xOffset;
myComponent.y = yOffset;
figma.currentPage.appendChild(myComponent);
```

### Q5: 生成的页面尺寸不对？

**A:** 修改 `createEnterpriseListPage()` 函数中的尺寸：

```javascript
const page = figma.createFrame();
page.name = '企业列表页面';
page.resize(1440, 1024); // 修改这里的宽度和高度
```

常用尺寸：
- 桌面端：1440×1024
- 平板端：768×1024
- 移动端：375×812

---

## 🎓 进阶使用

### 1. 创建组件变体（Variants）

将多个相似组件合并为变体：

1. 选中所有按钮组件（Button/primary、Button/secondary、Button/icon）
2. 右键 → Combine as variants
3. 在右侧面板中设置变体属性

### 2. 使用自动布局（Auto Layout）

为组件添加自动布局，使其更灵活：

1. 选中组件
2. 按 Shift + A
3. 设置方向、间距、内边距
4. 组件会自动适应内容

### 3. 发布为团队库

将设计系统发布为团队库，供其他文件使用：

1. 点击右上角的 **Publish** 按钮
2. 选择要发布的样式和组件
3. 添加描述和版本号
4. 点击 **Publish**

### 4. 导出组件

将组件导出为 PNG/SVG：

1. 选中组件
2. 在右侧面板点击 **Export**
3. 选择格式（PNG/SVG/PDF）
4. 设置分辨率（@1x/@2x/@3x）
5. 点击 **Export**

### 5. 创建交互原型

为页面添加交互：

1. 切换到 **Prototype** 标签
2. 选中按钮
3. 拖动连接点到目标页面
4. 设置交互类型（On click、On hover 等）
5. 设置动画效果

---

## 🔧 自定义配置

### 修改设计 Tokens

在插件代码的 `DESIGN_TOKENS` 对象中修改：

```javascript
const DESIGN_TOKENS = {
  // 修改颜色
  colors: {
    primary: { r: 99/255, g: 102/255, b: 241/255 },
    // ...
  },
  
  // 修改间距
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    // ...
  },
  
  // 修改圆角
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },
  
  // 修改字体
  typography: {
    display: { size: 32, weight: 'Bold' },
    // ...
  },
};
```

### 添加新的设计 Token

```javascript
const DESIGN_TOKENS = {
  // 添加新的颜色
  colors: {
    // ... 现有颜色
    accent: { r: 255/255, g: 107/255, b: 107/255 }, // 新增
  },
  
  // 添加新的间距
  spacing: {
    // ... 现有间距
    '4xl': 48, // 新增
  },
};
```

---

## 📊 性能优化

### 大量组件生成优化

如果需要生成大量组件，建议：

1. **分批生成** - 将组件分成多个批次生成
2. **使用实例** - 创建组件后使用实例而非复制
3. **延迟渲染** - 使用 `setTimeout` 分散渲染压力

```javascript
// 分批生成示例
async function generateInBatches() {
  const batchSize = 10;
  for (let i = 0; i < totalComponents; i += batchSize) {
    // 生成一批组件
    await generateBatch(i, Math.min(i + batchSize, totalComponents));
    // 等待一小段时间
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}
```

---

## 🎨 设计建议

### 1. 保持一致性
- 使用颜色样式而非直接填充颜色
- 使用文本样式而非手动设置字体
- 使用组件而非复制粘贴

### 2. 命名规范
- 使用清晰的命名：`Button/Primary` 而非 `btn1`
- 使用层级结构：`Components/Button/Primary`
- 使用描述性名称：`Enterprise List Page` 而非 `Page 1`

### 3. 组织结构
- 将相似组件放在同一页面
- 使用 Frame 组织页面区域
- 添加注释说明组件用途

---

## 📞 技术支持

### 遇到问题？

1. **查看控制台** - 按 F12 打开开发者工具，查看错误信息
2. **检查字体** - 确保已安装 Inter 字体
3. **更新 Figma** - 确保使用最新版本的 Figma
4. **重启插件** - 关闭并重新运行插件

### 反馈建议

如有问题或建议，请：
1. 查看本文档的常见问题部分
2. 检查插件代码中的注释
3. 参考 Figma 官方文档

---

## 📚 相关资源

### Figma 官方文档
- [Figma Plugin API](https://www.figma.com/plugin-docs/)
- [Figma 设计系统](https://www.figma.com/best-practices/design-systems/)
- [Figma 组件](https://help.figma.com/hc/en-us/articles/360038662654-Guide-to-components-in-Figma)

### 设计资源
- [设计规范文档](./设计规范文档-Design-System.md)
- [企业权限与能力体系 PRD](./企业权限与能力体系-PRD-完整版.md)

---

## 🎊 总结

使用本插件，您可以：

✅ **5 分钟内**在 Figma 中创建完整的设计系统  
✅ **自动生成** 19 种颜色样式 + 9 种文本样式  
✅ **一键创建** 6 个核心组件  
✅ **快速搭建** 企业列表页面示例  
✅ **完全可定制** - 修改代码即可调整所有设计  

现在就开始使用吧！🚀

---

**版本**: 1.0.0  
**更新日期**: 2026-02-11  
**作者**: Aone Copilot
