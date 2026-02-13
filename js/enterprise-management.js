/**
 * 企业管理模块 - JavaScript
 * 基于企业权限与能力体系PRD
 */

// ==================== 常量定义 ====================

// 企业类型
const ENTERPRISE_TYPES = {
    mall: { label: '卖场', color: 'warning' },
    brand: { label: '品牌商', color: 'info' },
    dealer: { label: '经销商', color: 'primary' },
    decoration: { label: '装修公司', color: 'success' },
    studio: { label: '工作室', color: 'secondary' },
    store: { label: '门店', color: 'danger' },
    custom: { label: '自定义', color: 'dark' }
};

// 产品列表
const PRODUCTS = {
    domestic_3d: { name: '国内3D', icon: 'fa-cube', color: 'primary' },
    international_3d: { name: '国际3D', icon: 'fa-globe', color: 'info' },
    smart_guide: { name: '智能导购', icon: 'fa-robot', color: 'success' },
    precision_marketing: { name: '精准营销', icon: 'fa-bullhorn', color: 'warning' },
    ai_designer_app: { name: 'AI设计家App', icon: 'fa-mobile-alt', color: 'danger' }
};

// 品牌关系
const BRAND_RELATIONS = {
    own: { label: '拥有', color: 'success', desc: '可上传公有模型' },
    agent: { label: '代理', color: 'info', desc: '不可上传公有模型' },
    none: { label: '无关', color: 'secondary', desc: '无品牌设置' }
};

// 企业状态
const ENTERPRISE_STATUS = {
    active: { label: '启用', color: 'active' },
    inactive: { label: '停用', color: 'inactive' }
};

// 注意：企业类型不参与运行期权限判断
// 企业类型仅用于：
// 1. UI 展示（标签、筛选）
// 2. 创建企业时的初始化建议（非强制）
// 3. 统计分析
// 
// 权限判断的第一维度是「产品」，而非企业类型
// 
// 企业类型与产品的推荐关系（仅用于创建时的UI提示，不影响实际权限）
const TYPE_PRODUCT_SUGGESTIONS = {
    mall: ['smart_guide'],
    brand: ['domestic_3d', 'international_3d', 'smart_guide'],
    dealer: ['smart_guide'],
    decoration: ['domestic_3d', 'ai_designer_app'],
    studio: ['domestic_3d', 'ai_designer_app'],
    store: ['smart_guide'],
    custom: []
};

// ==================== 工具函数 ====================

/**
 * 格式化日期时间
 */
function formatDateTime(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * 生成企业编号
 */
function generateEnterpriseCode() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `ENT-${timestamp.toString().slice(-6)}${random}`;
}

/**
 * 获取企业类型标签HTML
 */
function getEnterpriseTypeBadge(type) {
    const typeInfo = ENTERPRISE_TYPES[type];
    if (!typeInfo) return `<span class="badge badge-secondary">${type}</span>`;
    return `<span class="badge badge-${typeInfo.color}">${typeInfo.label}</span>`;
}

/**
 * 获取品牌关系标签HTML
 */
function getBrandRelationBadge(relation) {
    const relationInfo = BRAND_RELATIONS[relation];
    if (!relationInfo) return `<span class="badge badge-secondary">${relation}</span>`;
    return `<span class="badge badge-${relationInfo.color}">${relationInfo.label}</span>`;
}

/**
 * 获取状态标签HTML
 */
function getStatusBadge(status) {
    const statusInfo = ENTERPRISE_STATUS[status];
    if (!statusInfo) return `<span class="status-badge status-inactive">${status}</span>`;
    return `<span class="status-badge status-${statusInfo.color}">${statusInfo.label}</span>`;
}

/**
 * 获取产品标签HTML
 */
function getProductTag(productCode) {
    const product = PRODUCTS[productCode];
    if (!product) return `<span class="tag tag-sm">${productCode}</span>`;
    return `<span class="tag tag-sm">${product.name}</span>`;
}

/**
 * 获取产品图标HTML
 */
function getProductIcon(productCode) {
    const product = PRODUCTS[productCode];
    if (!product) return '<i class="fas fa-cube"></i>';
    return `<i class="fas ${product.icon} text-${product.color}"></i>`;
}

// ==================== API 调用函数 ====================

/**
 * 获取企业列表
 */
async function getEnterpriseList(params = {}) {
    try {
        // 模拟API调用
        console.log('获取企业列表:', params);
        
        // 这里应该调用实际的API
        // const response = await fetch('/api/enterprises', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(params)
        // });
        // return await response.json();
        
        // 返回模拟数据
        return {
            success: true,
            data: {
                list: [],
                total: 0,
                page: params.page || 1,
                pageSize: params.pageSize || 10
            }
        };
    } catch (error) {
        console.error('获取企业列表失败:', error);
        return { success: false, message: error.message };
    }
}

/**
 * 获取企业详情
 */
async function getEnterpriseDetail(enterpriseId) {
    try {
        console.log('获取企业详情:', enterpriseId);
        
        // 这里应该调用实际的API
        // const response = await fetch(`/api/enterprises/${enterpriseId}`);
        // return await response.json();
        
        return {
            success: true,
            data: {}
        };
    } catch (error) {
        console.error('获取企业详情失败:', error);
        return { success: false, message: error.message };
    }
}

/**
 * 创建企业
 */
async function createEnterprise(data) {
    try {
        console.log('创建企业:', data);
        
        // 这里应该调用实际的API
        // const response = await fetch('/api/enterprises', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // });
        // return await response.json();
        
        return {
            success: true,
            data: { id: generateEnterpriseCode() }
        };
    } catch (error) {
        console.error('创建企业失败:', error);
        return { success: false, message: error.message };
    }
}

/**
 * 更新企业
 */
async function updateEnterprise(enterpriseId, data) {
    try {
        console.log('更新企业:', enterpriseId, data);
        
        // 这里应该调用实际的API
        // const response = await fetch(`/api/enterprises/${enterpriseId}`, {
        //     method: 'PUT',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // });
        // return await response.json();
        
        return {
            success: true,
            data: { id: enterpriseId }
        };
    } catch (error) {
        console.error('更新企业失败:', error);
        return { success: false, message: error.message };
    }
}

/**
 * 删除企业
 */
async function deleteEnterprise(enterpriseId) {
    try {
        console.log('删除企业:', enterpriseId);
        
        // 这里应该调用实际的API
        // const response = await fetch(`/api/enterprises/${enterpriseId}`, {
        //     method: 'DELETE'
        // });
        // return await response.json();
        
        return {
            success: true
        };
    } catch (error) {
        console.error('删除企业失败:', error);
        return { success: false, message: error.message };
    }
}

/**
 * 获取企业产品配置
 */
async function getEnterpriseProducts(enterpriseId) {
    try {
        console.log('获取企业产品配置:', enterpriseId);
        
        // 这里应该调用实际的API
        // const response = await fetch(`/api/enterprises/${enterpriseId}/products`);
        // return await response.json();
        
        return {
            success: true,
            data: []
        };
    } catch (error) {
        console.error('获取企业产品配置失败:', error);
        return { success: false, message: error.message };
    }
}

/**
 * 更新企业产品配置
 */
async function updateEnterpriseProduct(enterpriseId, productCode, config) {
    try {
        console.log('更新企业产品配置:', enterpriseId, productCode, config);
        
        // 这里应该调用实际的API
        // const response = await fetch(`/api/enterprises/${enterpriseId}/products/${productCode}`, {
        //     method: 'PUT',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(config)
        // });
        // return await response.json();
        
        return {
            success: true
        };
    } catch (error) {
        console.error('更新企业产品配置失败:', error);
        return { success: false, message: error.message };
    }
}

/**
 * 启用/停用产品
 */
async function toggleEnterpriseProduct(enterpriseId, productCode, enabled) {
    try {
        console.log('切换企业产品状态:', enterpriseId, productCode, enabled);
        
        // 这里应该调用实际的API
        // const response = await fetch(`/api/enterprises/${enterpriseId}/products/${productCode}/toggle`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ enabled })
        // });
        // return await response.json();
        
        return {
            success: true
        };
    } catch (error) {
        console.error('切换企业产品状态失败:', error);
        return { success: false, message: error.message };
    }
}

/**
 * 获取企业组织架构
 */
async function getEnterpriseOrganization(enterpriseId) {
    try {
        console.log('获取企业组织架构:', enterpriseId);
        
        // 这里应该调用实际的API
        // const response = await fetch(`/api/enterprises/${enterpriseId}/organization`);
        // return await response.json();
        
        return {
            success: true,
            data: {}
        };
    } catch (error) {
        console.error('获取企业组织架构失败:', error);
        return { success: false, message: error.message };
    }
}

// ==================== 数据验证函数 ====================

/**
 * 验证企业表单数据
 */
function validateEnterpriseForm(data) {
    const errors = [];
    
    // 必填字段验证
    if (!data.enterpriseName || data.enterpriseName.trim() === '') {
        errors.push('企业名称不能为空');
    }
    
    if (!data.enterpriseType) {
        errors.push('请选择企业类型');
    }
    
    if (!data.contactName || data.contactName.trim() === '') {
        errors.push('联系人不能为空');
    }
    
    if (!data.contactPhone || data.contactPhone.trim() === '') {
        errors.push('联系电话不能为空');
    }
    
    if (!data.contactEmail || data.contactEmail.trim() === '') {
        errors.push('联系邮箱不能为空');
    }
    
    if (!data.brandRelation) {
        errors.push('请选择品牌关系');
    }
    
    // 格式验证
    if (data.contactPhone && !/^1[3-9]\d{9}$/.test(data.contactPhone.replace(/-/g, ''))) {
        errors.push('联系电话格式不正确');
    }
    
    if (data.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contactEmail)) {
        errors.push('联系邮箱格式不正确');
    }
    
    // 品牌关系验证
    if ((data.brandRelation === 'own' || data.brandRelation === 'agent') && 
        (!data.brands || data.brands.length === 0)) {
        errors.push('品牌关系为"拥有"或"代理"时，必须填写关联品牌');
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}

/**
 * 验证产品配置数据
 */
function validateProductConfig(config) {
    const errors = [];
    
    if (!config.productCode) {
        errors.push('产品代码不能为空');
    }
    
    // 验证配额值
    if (config.quotas) {
        for (const [key, value] of Object.entries(config.quotas)) {
            if (value !== -1 && (isNaN(value) || value < 0)) {
                errors.push(`配额"${key}"的值必须是非负数或-1（无限制）`);
            }
        }
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}

// ==================== UI 辅助函数 ====================

/**
 * 显示加载状态
 */
function showLoading(message = '加载中...') {
    // 可以使用遮罩层或加载动画
    console.log('Loading:', message);
}

/**
 * 隐藏加载状态
 */
function hideLoading() {
    console.log('Loading hidden');
}

/**
 * 显示确认对话框
 */
function showConfirm(message, callback) {
    if (confirm(message)) {
        callback();
    }
}

/**
 * 渲染企业列表表格行
 */
function renderEnterpriseRow(enterprise) {
    const products = enterprise.products || [];
    const productTags = products.slice(0, 2).map(p => getProductTag(p)).join('');
    const moreTag = products.length > 2 ? `<span class="tag tag-sm">+${products.length - 2}</span>` : '';
    
    return `
        <tr>
            <td><input type="checkbox" class="row-checkbox" data-id="${enterprise.id}"></td>
            <td><span class="text-mono">${enterprise.code}</span></td>
            <td>
                <div class="enterprise-info">
                    ${getProductIcon(enterprise.type)}
                    <div>
                        <div class="enterprise-name">${enterprise.name}</div>
                        <div class="enterprise-desc">${enterprise.description || ''}</div>
                    </div>
                </div>
            </td>
            <td>${getEnterpriseTypeBadge(enterprise.type)}</td>
            <td>
                <div class="product-tags">
                    ${productTags}
                    ${moreTag}
                </div>
            </td>
            <td>${getBrandRelationBadge(enterprise.brandRelation)}</td>
            <td>${getStatusBadge(enterprise.status)}</td>
            <td>${formatDateTime(enterprise.createdAt)}</td>
            <td>
                <div class="action-buttons">
                    <button class="icon-btn" title="查看详情" onclick="viewEnterprise('${enterprise.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="icon-btn" title="编辑" onclick="editEnterprise('${enterprise.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="icon-btn" title="产品配置" onclick="configProducts('${enterprise.id}')">
                        <i class="fas fa-cog"></i>
                    </button>
                    <button class="icon-btn" title="删除" onclick="deleteEnterpriseConfirm('${enterprise.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `;
}

/**
 * 渲染组织架构树节点
 */
function renderOrgTreeNode(node, level = 0) {
    const hasChildren = node.children && node.children.length > 0;
    const chevronIcon = hasChildren ? 'fa-chevron-down' : '';
    const childrenHtml = hasChildren ? 
        `<div class="tree-children">${node.children.map(child => renderOrgTreeNode(child, level + 1)).join('')}</div>` : '';
    
    return `
        <div class="tree-node" data-id="${node.id}">
            <div class="tree-node-content">
                ${chevronIcon ? `<i class="fas ${chevronIcon}"></i>` : ''}
                <i class="fas fa-building"></i>
                <span>${node.name}</span>
                <div class="tree-node-actions">
                    <button class="icon-btn-sm" title="添加子企业" onclick="addChildEnterprise('${node.id}')">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button class="icon-btn-sm" title="编辑" onclick="editEnterprise('${node.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            </div>
            ${childrenHtml}
        </div>
    `;
}

// ==================== 导出函数 ====================

// 将函数挂载到全局对象，以便HTML中可以调用
if (typeof window !== 'undefined') {
    window.EnterpriseManagement = {
        // 常量
        ENTERPRISE_TYPES,
        PRODUCTS,
        BRAND_RELATIONS,
        ENTERPRISE_STATUS,
        TYPE_PRODUCT_SUGGESTIONS,
        
        // 工具函数
        formatDateTime,
        generateEnterpriseCode,
        getEnterpriseTypeBadge,
        getBrandRelationBadge,
        getStatusBadge,
        getProductTag,
        getProductIcon,
        
        // API函数
        getEnterpriseList,
        getEnterpriseDetail,
        createEnterprise,
        updateEnterprise,
        deleteEnterprise,
        getEnterpriseProducts,
        updateEnterpriseProduct,
        toggleEnterpriseProduct,
        getEnterpriseOrganization,
        
        // 验证函数
        validateEnterpriseForm,
        validateProductConfig,
        
        // UI函数
        showLoading,
        hideLoading,
        showConfirm,
        renderEnterpriseRow,
        renderOrgTreeNode
    };
}

console.log('企业管理模块已加载');
