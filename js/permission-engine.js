/**
 * 权限判断引擎
 * 严格遵循核心约束：
 * 1. 企业是能力与资产的容器，不是权限集合
 * 2. 权限判断第一维度是「产品」
 * 3. 不基于企业类型进行运行期判断
 * 4. 统一判断顺序：产品 → 权益 → 资产 → 角色
 */

// ==================== 核心实体定义 ====================

/**
 * 企业实体
 * @typedef {Object} Enterprise
 * @property {string} id - 企业ID
 * @property {string} name - 企业名称
 * @property {string} type - 企业类型（仅用于展示，不参与权限判断）
 * @property {string} status - 企业状态：active/inactive
 * @property {Array<EnterpriseProduct>} products - 企业启用的产品列表
 * @property {Object} assets - 企业资产（品牌、供应链等）
 */

/**
 * 企业产品关系
 * @typedef {Object} EnterpriseProduct
 * @property {string} productCode - 产品代码
 * @property {boolean} enabled - 是否启用
 * @property {Object<string, boolean>} features - 功能权益
 * @property {Object<string, number>} quotas - 配额权益
 * @property {Object<string, boolean>} services - 增值服务
 * @property {Date} enabledAt - 启用时间
 */

/**
 * 产品实体
 * @typedef {Object} Product
 * @property {string} code - 产品代码
 * @property {string} name - 产品名称
 * @property {Array<string>} availableFeatures - 可用功能列表
 * @property {Array<string>} availableQuotas - 可用配额列表
 * @property {Array<string>} availableServices - 可用服务列表
 */

/**
 * 权益实体（Feature/Quota/Service）
 * @typedef {Object} Entitlement
 * @property {string} code - 权益代码
 * @property {string} type - 权益类型：feature/quota/service
 * @property {string} name - 权益名称
 * @property {string} productCode - 所属产品
 */

/**
 * 资产实体
 * @typedef {Object} Asset
 * @property {string} type - 资产类型：brand/supply_chain/model/product
 * @property {string} id - 资产ID
 * @property {string} enterpriseId - 所属企业
 * @property {Object} metadata - 资产元数据
 */

/**
 * 角色实体
 * @typedef {Object} Role
 * @property {string} id - 角色ID
 * @property {string} name - 角色名称
 * @property {Array<string>} permissions - 操作权限列表
 */

// ==================== 权限判断引擎 ====================

class PermissionEngine {
    /**
     * 核心权限判断方法
     * 严格按照顺序：产品 → 权益 → 资产 → 角色
     * 
     * @param {Object} context - 权限判断上下文
     * @param {string} context.enterpriseId - 企业ID
     * @param {string} context.productCode - 产品代码
     * @param {string} context.action - 操作动作
     * @param {string} [context.featureCode] - 功能代码（可选）
     * @param {string} [context.assetType] - 资产类型（可选）
     * @param {string} [context.assetId] - 资产ID（可选）
     * @param {string} context.userId - 用户ID
     * @returns {Promise<PermissionResult>}
     */
    async checkPermission(context) {
        const result = {
            allowed: false,
            reason: '',
            details: {}
        };

        try {
            // 第一步：检查企业是否启用该产品
            const productCheck = await this.checkEnterpriseProduct(
                context.enterpriseId,
                context.productCode
            );
            
            if (!productCheck.enabled) {
                result.reason = '企业未启用该产品';
                result.details.productCheck = productCheck;
                return result;
            }

            // 第二步：检查产品下是否具备对应能力/权益
            if (context.featureCode) {
                const entitlementCheck = await this.checkEntitlement(
                    context.enterpriseId,
                    context.productCode,
                    context.featureCode
                );
                
                if (!entitlementCheck.granted) {
                    result.reason = '企业未开通该功能权益';
                    result.details.entitlementCheck = entitlementCheck;
                    return result;
                }
                
                result.details.entitlementCheck = entitlementCheck;
            }

            // 第三步：检查是否满足资产边界要求
            if (context.assetType && context.assetId) {
                const assetCheck = await this.checkAssetBoundary(
                    context.enterpriseId,
                    context.assetType,
                    context.assetId
                );
                
                if (!assetCheck.accessible) {
                    result.reason = '资产不在企业边界内';
                    result.details.assetCheck = assetCheck;
                    return result;
                }
                
                result.details.assetCheck = assetCheck;
            }

            // 第四步：检查用户角色是否允许该操作
            const roleCheck = await this.checkUserRole(
                context.userId,
                context.enterpriseId,
                context.action
            );
            
            if (!roleCheck.allowed) {
                result.reason = '用户角色不允许该操作';
                result.details.roleCheck = roleCheck;
                return result;
            }
            
            result.details.roleCheck = roleCheck;

            // 所有检查通过
            result.allowed = true;
            result.reason = '权限检查通过';
            
        } catch (error) {
            result.reason = `权限检查异常: ${error.message}`;
            result.details.error = error;
        }

        return result;
    }

    /**
     * 第一步：检查企业是否启用该产品
     * @param {string} enterpriseId 
     * @param {string} productCode 
     * @returns {Promise<{enabled: boolean, product: EnterpriseProduct}>}
     */
    async checkEnterpriseProduct(enterpriseId, productCode) {
        // 调用API获取企业产品配置
        // const response = await fetch(`/api/enterprises/${enterpriseId}/products/${productCode}`);
        // const data = await response.json();
        
        // 模拟数据
        const mockProduct = {
            productCode: productCode,
            enabled: true,
            features: {},
            quotas: {},
            services: {}
        };

        return {
            enabled: mockProduct.enabled,
            product: mockProduct
        };
    }

    /**
     * 第二步：检查产品下是否具备对应能力/权益
     * @param {string} enterpriseId 
     * @param {string} productCode 
     * @param {string} entitlementCode 
     * @returns {Promise<{granted: boolean, entitlement: Object}>}
     */
    async checkEntitlement(enterpriseId, productCode, entitlementCode) {
        // 调用API获取企业权益配置
        // const response = await fetch(
        //     `/api/enterprises/${enterpriseId}/products/${productCode}/entitlements/${entitlementCode}`
        // );
        // const data = await response.json();

        // 模拟数据
        const mockEntitlement = {
            code: entitlementCode,
            type: 'feature',
            granted: true,
            value: true
        };

        return {
            granted: mockEntitlement.granted,
            entitlement: mockEntitlement
        };
    }

    /**
     * 第三步：检查是否满足资产边界要求
     * @param {string} enterpriseId 
     * @param {string} assetType 
     * @param {string} assetId 
     * @returns {Promise<{accessible: boolean, asset: Asset}>}
     */
    async checkAssetBoundary(enterpriseId, assetType, assetId) {
        // 调用API检查资产归属
        // const response = await fetch(
        //     `/api/enterprises/${enterpriseId}/assets/${assetType}/${assetId}`
        // );
        // const data = await response.json();

        // 模拟数据
        const mockAsset = {
            type: assetType,
            id: assetId,
            enterpriseId: enterpriseId,
            accessible: true
        };

        return {
            accessible: mockAsset.accessible,
            asset: mockAsset
        };
    }

    /**
     * 第四步：检查用户角色是否允许该操作
     * @param {string} userId 
     * @param {string} enterpriseId 
     * @param {string} action 
     * @returns {Promise<{allowed: boolean, role: Role}>}
     */
    async checkUserRole(userId, enterpriseId, action) {
        // 调用API获取用户在企业中的角色
        // const response = await fetch(
        //     `/api/users/${userId}/enterprises/${enterpriseId}/roles`
        // );
        // const data = await response.json();

        // 模拟数据
        const mockRole = {
            id: 'role-001',
            name: 'admin',
            permissions: ['*'] // * 表示所有权限
        };

        const allowed = mockRole.permissions.includes('*') || 
                       mockRole.permissions.includes(action);

        return {
            allowed: allowed,
            role: mockRole
        };
    }

    /**
     * 批量检查权限（用于菜单显示等场景）
     * @param {Array<Object>} contexts 
     * @returns {Promise<Array<PermissionResult>>}
     */
    async checkPermissionBatch(contexts) {
        const results = await Promise.all(
            contexts.map(context => this.checkPermission(context))
        );
        return results;
    }

    /**
     * 检查配额是否充足
     * @param {string} enterpriseId 
     * @param {string} productCode 
     * @param {string} quotaCode 
     * @param {number} requiredAmount 
     * @returns {Promise<{sufficient: boolean, current: number, limit: number}>}
     */
    async checkQuota(enterpriseId, productCode, quotaCode, requiredAmount) {
        // 调用API获取配额使用情况
        // const response = await fetch(
        //     `/api/enterprises/${enterpriseId}/products/${productCode}/quotas/${quotaCode}`
        // );
        // const data = await response.json();

        // 模拟数据
        const mockQuota = {
            code: quotaCode,
            limit: 1000,
            used: 500,
            remaining: 500
        };

        return {
            sufficient: mockQuota.remaining >= requiredAmount,
            current: mockQuota.used,
            limit: mockQuota.limit,
            remaining: mockQuota.remaining
        };
    }
}

// ==================== 权限判断辅助函数 ====================

/**
 * 快捷权限检查：检查功能权限
 * @param {string} enterpriseId 
 * @param {string} productCode 
 * @param {string} featureCode 
 * @param {string} userId 
 * @param {string} action 
 * @returns {Promise<boolean>}
 */
async function hasFeaturePermission(enterpriseId, productCode, featureCode, userId, action) {
    const engine = new PermissionEngine();
    const result = await engine.checkPermission({
        enterpriseId,
        productCode,
        featureCode,
        userId,
        action
    });
    return result.allowed;
}

/**
 * 快捷权限检查：检查资产访问权限
 * @param {string} enterpriseId 
 * @param {string} productCode 
 * @param {string} assetType 
 * @param {string} assetId 
 * @param {string} userId 
 * @param {string} action 
 * @returns {Promise<boolean>}
 */
async function hasAssetPermission(enterpriseId, productCode, assetType, assetId, userId, action) {
    const engine = new PermissionEngine();
    const result = await engine.checkPermission({
        enterpriseId,
        productCode,
        assetType,
        assetId,
        userId,
        action
    });
    return result.allowed;
}

/**
 * 快捷权限检查：检查配额是否充足
 * @param {string} enterpriseId 
 * @param {string} productCode 
 * @param {string} quotaCode 
 * @param {number} amount 
 * @returns {Promise<boolean>}
 */
async function hasQuota(enterpriseId, productCode, quotaCode, amount = 1) {
    const engine = new PermissionEngine();
    const result = await engine.checkQuota(enterpriseId, productCode, quotaCode, amount);
    return result.sufficient;
}

// ==================== 使用示例 ====================

/**
 * 示例1：检查用户是否可以使用3D渲染功能
 */
async function example1_checkRenderPermission() {
    const engine = new PermissionEngine();
    
    const result = await engine.checkPermission({
        enterpriseId: 'ENT-001',
        productCode: 'domestic_3d',
        featureCode: '3d_rendering',
        userId: 'USER-001',
        action: 'render:create'
    });
    
    if (result.allowed) {
        console.log('允许渲染');
    } else {
        console.log('拒绝渲染:', result.reason);
    }
    
    return result;
}

/**
 * 示例2：检查用户是否可以访问某个品牌的模型
 */
async function example2_checkBrandModelAccess() {
    const engine = new PermissionEngine();
    
    const result = await engine.checkPermission({
        enterpriseId: 'ENT-001',
        productCode: 'domestic_3d',
        featureCode: 'model_management',
        assetType: 'brand',
        assetId: 'BRAND-001',
        userId: 'USER-001',
        action: 'model:read'
    });
    
    return result;
}

/**
 * 示例3：检查渲染配额是否充足
 */
async function example3_checkRenderQuota() {
    const engine = new PermissionEngine();
    
    // 先检查功能权限
    const permissionResult = await engine.checkPermission({
        enterpriseId: 'ENT-001',
        productCode: 'domestic_3d',
        featureCode: '3d_rendering',
        userId: 'USER-001',
        action: 'render:create'
    });
    
    if (!permissionResult.allowed) {
        return { allowed: false, reason: permissionResult.reason };
    }
    
    // 再检查配额
    const quotaResult = await engine.checkQuota(
        'ENT-001',
        'domestic_3d',
        'render_2k_monthly',
        1
    );
    
    if (!quotaResult.sufficient) {
        return { 
            allowed: false, 
            reason: '渲染配额不足',
            quota: quotaResult
        };
    }
    
    return { allowed: true };
}

/**
 * 示例4：批量检查菜单权限（用于前端菜单显示）
 */
async function example4_checkMenuPermissions() {
    const engine = new PermissionEngine();
    
    const menuItems = [
        {
            name: '3D渲染',
            context: {
                enterpriseId: 'ENT-001',
                productCode: 'domestic_3d',
                featureCode: '3d_rendering',
                userId: 'USER-001',
                action: 'render:read'
            }
        },
        {
            name: '施工图生成',
            context: {
                enterpriseId: 'ENT-001',
                productCode: 'domestic_3d',
                featureCode: 'construction_drawing',
                userId: 'USER-001',
                action: 'drawing:read'
            }
        }
    ];
    
    const results = await engine.checkPermissionBatch(
        menuItems.map(item => item.context)
    );
    
    // 过滤出有权限的菜单
    const allowedMenus = menuItems.filter((item, index) => results[index].allowed);
    
    return allowedMenus;
}

// ==================== 导出 ====================

if (typeof window !== 'undefined') {
    window.PermissionEngine = PermissionEngine;
    window.PermissionHelpers = {
        hasFeaturePermission,
        hasAssetPermission,
        hasQuota
    };
    window.PermissionExamples = {
        example1_checkRenderPermission,
        example2_checkBrandModelAccess,
        example3_checkRenderQuota,
        example4_checkMenuPermissions
    };
}

console.log('权限判断引擎已加载');
