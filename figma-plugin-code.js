// Figma 插件代码 - 自动生成设计系统和权限管理页面
// 使用方法：
// 1. 在 Figma 中打开一个新文件
// 2. 菜单 -> Plugins -> Development -> New Plugin
// 3. 选择 "Figma design" 模板
// 4. 将本代码复制到 code.ts 文件中
// 5. 运行插件

// ==================== 设计系统配置 ====================

const DESIGN_TOKENS = {
  // 颜色系统
  colors: {
    primary: { r: 99/255, g: 102/255, b: 241/255 },
    secondary: { r: 139/255, g: 92/255, b: 246/255 },
    success: { r: 16/255, g: 185/255, b: 129/255 },
    warning: { r: 245/255, g: 158/255, b: 11/255 },
    danger: { r: 239/255, g: 68/255, b: 68/255 },
    info: { r: 59/255, g: 130/255, b: 246/255 },
    bgPrimary: { r: 245/255, g: 247/255, b: 250/255 },
    bgSecondary: { r: 1, g: 1, b: 1 },
    bgCard: { r: 1, g: 1, b: 1 },
    textPrimary: { r: 30/255, g: 41/255, b: 59/255 },
    textSecondary: { r: 100/255, g: 116/255, b: 139/255 },
    textTertiary: { r: 148/255, g: 163/255, b: 184/255 },
    border: { r: 226/255, g: 232/255, b: 240/255 },
  },
  
  // 间距系统
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
  },
  
  // 圆角系统
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },
  
  // 字体系统
  typography: {
    display: { size: 32, weight: 'Bold' },
    h1: { size: 28, weight: 'Bold' },
    h2: { size: 20, weight: 'SemiBold' },
    h3: { size: 18, weight: 'SemiBold' },
    h4: { size: 16, weight: 'SemiBold' },
    body: { size: 14, weight: 'Regular' },
    small: { size: 13, weight: 'Regular' },
    caption: { size: 12, weight: 'Regular' },
    tiny: { size: 11, weight: 'Regular' },
  },
};

// ==================== 辅助函数 ====================

// 创建颜色样式
function createColorStyle(name: string, color: RGB) {
  const style = figma.createPaintStyle();
  style.name = name;
  style.paints = [{
    type: 'SOLID',
    color: color,
  }];
  return style;
}

// 创建文本样式
function createTextStyle(name: string, fontSize: number, fontWeight: string) {
  const style = figma.createTextStyle();
  style.name = name;
  style.fontSize = fontSize;
  style.fontName = { family: 'Inter', style: fontWeight };
  return style;
}

// 创建矩形
function createRect(width: number, height: number, fills: Paint[] = []): RectangleNode {
  const rect = figma.createRectangle();
  rect.resize(width, height);
  if (fills.length > 0) {
    rect.fills = fills;
  }
  return rect;
}

// 创建文本
async function createText(content: string, fontSize: number = 14, fontWeight: string = 'Regular'): Promise<TextNode> {
  const text = figma.createText();
  await figma.loadFontAsync({ family: 'Inter', style: fontWeight });
  text.characters = content;
  text.fontSize = fontSize;
  text.fontName = { family: 'Inter', style: fontWeight };
  return text;
}

// 创建渐变
function createGradient(color1: RGB, color2: RGB): Paint {
  return {
    type: 'GRADIENT_LINEAR',
    gradientTransform: [
      [0.7071067811865476, 0.7071067811865475, 0],
      [-0.7071067811865475, 0.7071067811865476, 1]
    ],
    gradientStops: [
      { position: 0, color: { ...color1, a: 1 } },
      { position: 1, color: { ...color2, a: 1 } }
    ],
  };
}

// ==================== 创建设计系统 ====================

async function createDesignSystem() {
  console.log('开始创建设计系统...');
  
  // 创建颜色样式
  console.log('创建颜色样式...');
  Object.entries(DESIGN_TOKENS.colors).forEach(([name, color]) => {
    createColorStyle(`Colors/${name}`, color);
  });
  
  // 创建文本样式
  console.log('创建文本样式...');
  Object.entries(DESIGN_TOKENS.typography).forEach(([name, config]) => {
    createTextStyle(`Typography/${name}`, config.size, config.weight);
  });
  
  console.log('设计系统创建完成！');
}

// ==================== 创建按钮组件 ====================

async function createButton(type: 'primary' | 'secondary' | 'icon' = 'primary'): Promise<ComponentNode> {
  const button = figma.createComponent();
  button.name = `Button/${type}`;
  
  if (type === 'icon') {
    // 图标按钮
    button.resize(36, 36);
    
    const bg = createRect(36, 36, [{
      type: 'SOLID',
      color: DESIGN_TOKENS.colors.bgSecondary,
    }]);
    bg.cornerRadius = DESIGN_TOKENS.radius.md;
    bg.strokes = [{ type: 'SOLID', color: DESIGN_TOKENS.colors.border }];
    bg.strokeWeight = 1;
    
    const icon = await createText('⚙️', 16, 'Regular');
    icon.x = 10;
    icon.y = 10;
    
    button.appendChild(bg);
    button.appendChild(icon);
  } else if (type === 'primary') {
    // 主按钮
    button.resize(120, 42);
    
    const bg = createRect(120, 42, [
      createGradient(DESIGN_TOKENS.colors.primary, DESIGN_TOKENS.colors.secondary)
    ]);
    bg.cornerRadius = DESIGN_TOKENS.radius.md;
    bg.effects = [{
      type: 'DROP_SHADOW',
      color: { r: 99/255, g: 102/255, b: 241/255, a: 0.2 },
      offset: { x: 0, y: 4 },
      radius: 12,
      visible: true,
      blendMode: 'NORMAL',
    }];
    
    const text = await createText('按钮文字', 14, 'SemiBold');
    text.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    text.x = (120 - text.width) / 2;
    text.y = (42 - text.height) / 2;
    
    button.appendChild(bg);
    button.appendChild(text);
  } else {
    // 次要按钮
    button.resize(120, 40);
    
    const bg = createRect(120, 40, [{
      type: 'SOLID',
      color: DESIGN_TOKENS.colors.bgSecondary,
    }]);
    bg.cornerRadius = DESIGN_TOKENS.radius.md;
    bg.strokes = [{ type: 'SOLID', color: DESIGN_TOKENS.colors.border }];
    bg.strokeWeight = 1;
    
    const text = await createText('按钮文字', 14, 'Medium');
    text.fills = [{ type: 'SOLID', color: DESIGN_TOKENS.colors.textPrimary }];
    text.x = (120 - text.width) / 2;
    text.y = (40 - text.height) / 2;
    
    button.appendChild(bg);
    button.appendChild(text);
  }
  
  return button;
}

// ==================== 创建输入框组件 ====================

async function createInput(): Promise<ComponentNode> {
  const input = figma.createComponent();
  input.name = 'Input/Default';
  input.resize(300, 40);
  
  const bg = createRect(300, 40, [{
    type: 'SOLID',
    color: DESIGN_TOKENS.colors.bgSecondary,
  }]);
  bg.cornerRadius = DESIGN_TOKENS.radius.md;
  bg.strokes = [{ type: 'SOLID', color: DESIGN_TOKENS.colors.border }];
  bg.strokeWeight = 1;
  
  const text = await createText('请输入...', 14, 'Regular');
  text.fills = [{ type: 'SOLID', color: DESIGN_TOKENS.colors.textTertiary }];
  text.x = 16;
  text.y = (40 - text.height) / 2;
  
  input.appendChild(bg);
  input.appendChild(text);
  
  return input;
}

// ==================== 创建状态标签组件 ====================

async function createBadge(type: 'success' | 'warning' | 'danger' | 'info' = 'success'): Promise<ComponentNode> {
  const badge = figma.createComponent();
  badge.name = `Badge/${type}`;
  
  const colorMap = {
    success: { bg: { r: 209/255, g: 250/255, b: 229/255 }, text: { r: 6/255, g: 95/255, b: 70/255 } },
    warning: { bg: { r: 254/255, g: 243/255, b: 199/255 }, text: { r: 146/255, g: 64/255, b: 14/255 } },
    danger: { bg: { r: 254/255, g: 226/255, b: 226/255 }, text: { r: 153/255, g: 27/255, b: 27/255 } },
    info: { bg: { r: 219/255, g: 234/255, b: 254/255 }, text: { r: 30/255, g: 64/255, b: 175/255 } },
  };
  
  const colors = colorMap[type];
  const text = await createText(type === 'success' ? '启用' : type === 'danger' ? '停用' : type === 'warning' ? '待处理' : '信息', 12, 'SemiBold');
  
  const width = text.width + 24;
  badge.resize(width, 24);
  
  const bg = createRect(width, 24, [{
    type: 'SOLID',
    color: colors.bg,
  }]);
  bg.cornerRadius = 20;
  
  text.fills = [{ type: 'SOLID', color: colors.text }];
  text.x = 12;
  text.y = (24 - text.height) / 2;
  
  badge.appendChild(bg);
  badge.appendChild(text);
  
  return badge;
}

// ==================== 创建卡片组件 ====================

async function createCard(): Promise<ComponentNode> {
  const card = figma.createComponent();
  card.name = 'Card/Default';
  card.resize(400, 200);
  
  const bg = createRect(400, 200, [{
    type: 'SOLID',
    color: DESIGN_TOKENS.colors.bgCard,
  }]);
  bg.cornerRadius = DESIGN_TOKENS.radius.xl;
  bg.strokes = [{ type: 'SOLID', color: { ...DESIGN_TOKENS.colors.border, a: 0.6 } }];
  bg.strokeWeight = 1;
  bg.effects = [{
    type: 'DROP_SHADOW',
    color: { r: 0, g: 0, b: 0, a: 0.04 },
    offset: { x: 0, y: 2 },
    radius: 8,
    visible: true,
    blendMode: 'NORMAL',
  }];
  
  const title = await createText('卡片标题', 18, 'SemiBold');
  title.fills = [{ type: 'SOLID', color: DESIGN_TOKENS.colors.textPrimary }];
  title.x = 24;
  title.y = 24;
  
  const content = await createText('卡片内容区域', 14, 'Regular');
  content.fills = [{ type: 'SOLID', color: DESIGN_TOKENS.colors.textSecondary }];
  content.x = 24;
  content.y = 60;
  
  card.appendChild(bg);
  card.appendChild(title);
  card.appendChild(content);
  
  return card;
}

// ==================== 创建表格行组件 ====================

async function createTableRow(): Promise<ComponentNode> {
  const row = figma.createComponent();
  row.name = 'Table/Row';
  row.resize(1000, 60);
  
  const bg = createRect(1000, 60, [{
    type: 'SOLID',
    color: DESIGN_TOKENS.colors.bgSecondary,
  }]);
  
  // 底部边框
  const border = createRect(1000, 1, [{
    type: 'SOLID',
    color: DESIGN_TOKENS.colors.border,
  }]);
  border.y = 59;
  
  // 列1：企业名称
  const col1 = await createText('XX家居有限公司', 14, 'Medium');
  col1.fills = [{ type: 'SOLID', color: DESIGN_TOKENS.colors.textPrimary }];
  col1.x = 16;
  col1.y = (60 - col1.height) / 2;
  
  // 列2：企业类型
  const col2 = await createText('品牌商', 14, 'Regular');
  col2.fills = [{ type: 'SOLID', color: DESIGN_TOKENS.colors.textPrimary }];
  col2.x = 250;
  col2.y = (60 - col2.height) / 2;
  
  // 列3：状态标签
  const badge = await createBadge('success');
  badge.x = 400;
  badge.y = (60 - 24) / 2;
  
  // 列4：创建时间
  const col4 = await createText('2026-02-11', 14, 'Regular');
  col4.fills = [{ type: 'SOLID', color: DESIGN_TOKENS.colors.textSecondary }];
  col4.x = 600;
  col4.y = (60 - col4.height) / 2;
  
  row.appendChild(bg);
  row.appendChild(border);
  row.appendChild(col1);
  row.appendChild(col2);
  row.appendChild(badge);
  row.appendChild(col4);
  
  return row;
}

// ==================== 创建企业列表页面 ====================

async function createEnterpriseListPage(): Promise<FrameNode> {
  const page = figma.createFrame();
  page.name = '企业列表页面';
  page.resize(1440, 1024);
  page.fills = [{ type: 'SOLID', color: DESIGN_TOKENS.colors.bgPrimary }];
  
  let yOffset = 24;
  
  // 页面标题
  const title = await createText('企业管理', 28, 'Bold');
  title.fills = [{ type: 'SOLID', color: DESIGN_TOKENS.colors.textPrimary }];
  title.x = 284;
  title.y = yOffset;
  page.appendChild(title);
  
  yOffset += title.height + 8;
  
  // 页面描述
  const desc = await createText('管理平台内企业主体', 14, 'Regular');
  desc.fills = [{ type: 'SOLID', color: DESIGN_TOKENS.colors.textSecondary }];
  desc.x = 284;
  desc.y = yOffset;
  page.appendChild(desc);
  
  yOffset += desc.height + 32;
  
  // 筛选区卡片
  const filterCard = createRect(1132, 80, [{
    type: 'SOLID',
    color: DESIGN_TOKENS.colors.bgCard,
  }]);
  filterCard.cornerRadius = DESIGN_TOKENS.radius.lg;
  filterCard.strokes = [{ type: 'SOLID', color: { ...DESIGN_TOKENS.colors.border, a: 0.6 } }];
  filterCard.strokeWeight = 1;
  filterCard.effects = [{
    type: 'DROP_SHADOW',
    color: { r: 0, g: 0, b: 0, a: 0.04 },
    offset: { x: 0, y: 2 },
    radius: 8,
    visible: true,
    blendMode: 'NORMAL',
  }];
  filterCard.x = 284;
  filterCard.y = yOffset;
  page.appendChild(filterCard);
  
  // 筛选区内容
  const filterLabel1 = await createText('企业名称', 14, 'Regular');
  filterLabel1.fills = [{ type: 'SOLID', color: DESIGN_TOKENS.colors.textSecondary }];
  filterLabel1.x = 308;
  filterLabel1.y = yOffset + 20;
  page.appendChild(filterLabel1);
  
  const filterInput = await createInput();
  filterInput.x = 308;
  filterInput.y = yOffset + 45;
  page.appendChild(filterInput);
  
  // 查询按钮
  const queryBtn = await createButton('primary');
  queryBtn.x = 1200;
  queryBtn.y = yOffset + 45;
  page.appendChild(queryBtn);
  
  yOffset += 104;
  
  // 操作区
  const actionBar = createRect(1132, 42, []);
  actionBar.x = 284;
  actionBar.y = yOffset;
  
  const resultText = await createText('共 156 条结果', 14, 'Regular');
  resultText.fills = [{ type: 'SOLID', color: DESIGN_TOKENS.colors.textSecondary }];
  resultText.x = 284;
  resultText.y = yOffset + (42 - resultText.height) / 2;
  page.appendChild(resultText);
  
  const newBtn = await createButton('primary');
  newBtn.x = 1296;
  newBtn.y = yOffset;
  page.appendChild(newBtn);
  
  yOffset += 62;
  
  // 表格卡片
  const tableCard = createRect(1132, 600, [{
    type: 'SOLID',
    color: DESIGN_TOKENS.colors.bgCard,
  }]);
  tableCard.cornerRadius = DESIGN_TOKENS.radius.lg;
  tableCard.strokes = [{ type: 'SOLID', color: { ...DESIGN_TOKENS.colors.border, a: 0.6 } }];
  tableCard.strokeWeight = 1;
  tableCard.effects = [{
    type: 'DROP_SHADOW',
    color: { r: 0, g: 0, b: 0, a: 0.04 },
    offset: { x: 0, y: 2 },
    radius: 8,
    visible: true,
    blendMode: 'NORMAL',
  }];
  tableCard.x = 284;
  tableCard.y = yOffset;
  page.appendChild(tableCard);
  
  // 表头
  const tableHeader = createRect(1132, 48, [{
    type: 'SOLID',
    color: DESIGN_TOKENS.colors.bgPrimary,
  }]);
  tableHeader.x = 284;
  tableHeader.y = yOffset;
  page.appendChild(tableHeader);
  
  const headerTexts = ['企业名称', '企业类型', '企业状态', '启用产品', '创建时间', '操作'];
  const headerPositions = [300, 450, 600, 750, 900, 1050];
  
  for (let i = 0; i < headerTexts.length; i++) {
    const headerText = await createText(headerTexts[i], 12, 'SemiBold');
    headerText.fills = [{ type: 'SOLID', color: DESIGN_TOKENS.colors.textTertiary }];
    headerText.x = headerPositions[i];
    headerText.y = yOffset + (48 - headerText.height) / 2;
    page.appendChild(headerText);
  }
  
  // 表格行
  for (let i = 0; i < 8; i++) {
    const row = await createTableRow();
    row.x = 284;
    row.y = yOffset + 48 + i * 60;
    page.appendChild(row);
  }
  
  return page;
}

// ==================== 主函数 ====================

async function main() {
  try {
    console.log('开始生成 Figma 设计系统...');
    
    // 创建主页面
    const mainPage = figma.createPage();
    mainPage.name = '🎨 设计系统';
    figma.currentPage = mainPage;
    
    // 1. 创建设计系统（颜色和文本样式）
    await createDesignSystem();
    
    // 2. 创建组件库页面
    const componentsPage = figma.createPage();
    componentsPage.name = '📦 组件库';
    figma.currentPage = componentsPage;
    
    let xOffset = 0;
    let yOffset = 0;
    
    // 创建按钮组件
    console.log('创建按钮组件...');
    const primaryBtn = await createButton('primary');
    primaryBtn.x = xOffset;
    primaryBtn.y = yOffset;
    figma.currentPage.appendChild(primaryBtn);
    
    xOffset += 150;
    
    const secondaryBtn = await createButton('secondary');
    secondaryBtn.x = xOffset;
    secondaryBtn.y = yOffset;
    figma.currentPage.appendChild(secondaryBtn);
    
    xOffset += 150;
    
    const iconBtn = await createButton('icon');
    iconBtn.x = xOffset;
    iconBtn.y = yOffset;
    figma.currentPage.appendChild(iconBtn);
    
    // 下一行
    xOffset = 0;
    yOffset += 100;
    
    // 创建输入框组件
    console.log('创建输入框组件...');
    const input = await createInput();
    input.x = xOffset;
    input.y = yOffset;
    figma.currentPage.appendChild(input);
    
    // 下一行
    yOffset += 100;
    
    // 创建状态标签组件
    console.log('创建状态标签组件...');
    const badges = ['success', 'warning', 'danger', 'info'] as const;
    for (let i = 0; i < badges.length; i++) {
      const badge = await createBadge(badges[i]);
      badge.x = xOffset + i * 100;
      badge.y = yOffset;
      figma.currentPage.appendChild(badge);
    }
    
    // 下一行
    yOffset += 100;
    
    // 创建卡片组件
    console.log('创建卡片组件...');
    const card = await createCard();
    card.x = xOffset;
    card.y = yOffset;
    figma.currentPage.appendChild(card);
    
    // 下一行
    yOffset += 250;
    
    // 创建表格行组件
    console.log('创建表格行组件...');
    const tableRow = await createTableRow();
    tableRow.x = xOffset;
    tableRow.y = yOffset;
    figma.currentPage.appendChild(tableRow);
    
    // 3. 创建页面示例
    const pagesPage = figma.createPage();
    pagesPage.name = '📄 页面示例';
    figma.currentPage = pagesPage;
    
    console.log('创建企业列表页面...');
    const enterpriseListPage = await createEnterpriseListPage();
    figma.currentPage.appendChild(enterpriseListPage);
    
    // 完成
    figma.notify('✅ 设计系统生成完成！包含颜色样式、文本样式、组件库和页面示例。');
    console.log('设计系统生成完成！');
    
  } catch (error) {
    console.error('生成失败:', error);
    figma.notify('❌ 生成失败，请查看控制台错误信息');
  }
}

// 运行主函数
main();
