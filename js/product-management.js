// 模拟平台商品数据
const mockPlatformProducts = [
    {
        id: 'SKU001',
        name: '现代简约沙发',
        image: 'https://via.placeholder.com/48',
        nature: '主数据',
        brand: '宜家',
        category: '家具 > 客厅 > 沙发',
        modelStatus: 'linked',
        modelStatusText: '已关联',
        modelId: 'M20240001',
        buildTime: '2024-01-15'
    },
    {
        id: 'SKU002',
        name: '北欧风格餐桌',
        image: 'https://via.placeholder.com/48',
        nature: '主数据',
        brand: '曲美',
        category: '家具 > 餐厅 > 餐桌',
        modelStatus: 'pending',
        modelStatusText: '建模中',
        modelId: 'M20240002',
        buildTime: '2024-01-16'
    },
    {
        id: 'SKU003',
        name: '实木书架',
        image: 'https://via.placeholder.com/48',
        nature: '主数据',
        brand: '林氏木业',
        category: '家具 > 书房 > 书架',
        modelStatus: 'linked',
        modelStatusText: '已关联',
        modelId: 'M20240003',
        buildTime: '2024-01-17'
    },
    {
        id: 'SKU004',
        name: '智能床垫',
        image: 'https://via.placeholder.com/48',
        nature: '子数据',
        brand: '慕思',
        category: '家具 > 卧室 > 床垫',
        modelStatus: 'failed',
        modelStatusText: '建模失败',
        modelId: '-',
        buildTime: '-'
    }
];

// 模拟企业商品数据
const mockEnterpriseProducts = [
    {
        id: 'SKU101',
        name: '真皮办公椅',
        image: 'https://via.placeholder.com/48',
        nature: '主数据',
        enterprise: '阿里巴巴集团',
        brand: '震旦',
        category: '家具 > 办公 > 椅子',
        modelStatus: 'linked',
        modelStatusText: '已关联',
        modelId: 'M20240006'
    },
    {
        id: 'SKU102',
        name: '儿童学习桌',
        image: 'https://via.placeholder.com/48',
        nature: '主数据',
        enterprise: '淘宝事业部',
        brand: '护童',
        category: '家具 > 儿童 > 学习桌',
        modelStatus: 'linked',
        modelStatusText: '已关联',
        modelId: 'M20240007'
    },
    {
        id: 'SKU103',
        name: '智能衣柜',
        image: 'https://via.placeholder.com/48',
        nature: '子数据',
        enterprise: '天猫事业部',
        brand: '索菲亚',
        category: '家具 > 卧室 > 衣柜',
        modelStatus: 'pending',
        modelStatusText: '建模中',
        modelId: 'M20240008'
    }
];

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    initTables();
    initEventListeners();
});

// 初始化表格
function initTables() {
    renderPlatformTable();
    renderEnterpriseTable();
}

// 渲染平台商品表格
function renderPlatformTable() {
    const tbody = document.getElementById('platformTableBody');
    tbody.innerHTML = mockPlatformProducts.map(product => `
        <tr>
            <td><input type="checkbox" class="platform-checkbox" data-id="${product.id}"></td>
            <td><strong>${product.id}</strong></td>
            <td>${product.name}</td>
            <td><img src="${product.image}" alt="${product.name}" class="product-img"></td>
            <td><span class="badge ${product.nature === '主数据' ? 'badge-primary' : 'badge-secondary'}">${product.nature}</span></td>
            <td>${product.brand}</td>
            <td>${product.category}</td>
            <td><span class="status-badge status-${product.modelStatus}">${product.modelStatusText}</span></td>
            <td>${product.modelId}</td>
            <td>${product.buildTime}</td>
            <td>
                <div class="action-btns">
                    <button class="action-btn primary" onclick="viewProduct('${product.id}')" title="详情">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn" onclick="linkModel('${product.id}')" title="关联模型">
                        <i class="fas fa-link"></i>
                    </button>
                    <button class="action-btn" onclick="editProduct('${product.id}')" title="编辑">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// 渲染企业商品表格
function renderEnterpriseTable() {
    const tbody = document.getElementById('enterpriseTableBody');
    tbody.innerHTML = mockEnterpriseProducts.map(product => `
        <tr>
            <td><input type="checkbox" class="enterprise-checkbox" data-id="${product.id}"></td>
            <td><strong>${product.id}</strong></td>
            <td>${product.name}</td>
            <td><img src="${product.image}" alt="${product.name}" class="product-img"></td>
            <td><span class="badge ${product.nature === '主数据' ? 'badge-primary' : 'badge-info'}">${product.nature}</span></td>
            <td>${product.enterprise}</td>
            <td>${product.brand}</td>
            <td>${product.category}</td>
            <td><span class="status-badge status-${product.modelStatus}">${product.modelStatusText}</span></td>
            <td>${product.modelId}</td>
            <td>
                <div class="action-btns">
                    <button class="action-btn primary" onclick="viewProduct('${product.id}')" title="详情">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn" onclick="linkModel('${product.id}')" title="关联模型">
                        <i class="fas fa-link"></i>
                    </button>
                    ${product.nature === '子数据' ? 
                        `<button class="action-btn" onclick="unbindProduct('${product.id}')" title="解绑">
                            <i class="fas fa-unlink"></i>
                        </button>` : 
                        `<button class="action-btn" onclick="deleteProduct('${product.id}')" title="删除">
                            <i class="fas fa-trash"></i>
                        </button>`
                    }
                </div>
            </td>
        </tr>
    `).join('');
}

// 初始化事件监听
function initEventListeners() {
    // 标签页切换
    document.querySelectorAll('.tab-item').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(tabName + 'Tab').classList.add('active');
        });
    });

    // 平台商品全选
    const platformSelectAll = document.getElementById('platformSelectAll');
    if (platformSelectAll) {
        platformSelectAll.addEventListener('change', function() {
            document.querySelectorAll('.platform-checkbox').forEach(cb => {
                cb.checked = this.checked;
            });
            updatePlatformSelectedCount();
        });
    }

    // 平台商品单选
    document.querySelectorAll('.platform-checkbox').forEach(cb => {
        cb.addEventListener('change', updatePlatformSelectedCount);
    });

    // 企业商品全选
    const enterpriseSelectAll = document.getElementById('enterpriseSelectAll');
    if (enterpriseSelectAll) {
        enterpriseSelectAll.addEventListener('change', function() {
            document.querySelectorAll('.enterprise-checkbox').forEach(cb => {
                cb.checked = this.checked;
            });
            updateEnterpriseSelectedCount();
        });
    }

    // 企业商品单选
    document.querySelectorAll('.enterprise-checkbox').forEach(cb => {
        cb.addEventListener('change', updateEnterpriseSelectedCount);
    });
}

// 更新平台商品选中数量
function updatePlatformSelectedCount() {
    const checked = document.querySelectorAll('.platform-checkbox:checked').length;
    document.getElementById('platformSelectedCount').textContent = checked;
    
    const linkModelBtn = document.getElementById('linkModelBtn');
    const editBtn = document.getElementById('editBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    
    if (checked > 0) {
        linkModelBtn.disabled = false;
        editBtn.disabled = checked !== 1;
        deleteBtn.disabled = false;
    } else {
        linkModelBtn.disabled = true;
        editBtn.disabled = true;
        deleteBtn.disabled = true;
    }
}

// 更新企业商品选中数量
function updateEnterpriseSelectedCount() {
    const checked = document.querySelectorAll('.enterprise-checkbox:checked').length;
    document.getElementById('enterpriseSelectedCount').textContent = checked;
    
    const linkModelBtn = document.getElementById('enterpriseLinkModelBtn');
    const editBtn = document.getElementById('enterpriseEditBtn');
    const deleteBtn = document.getElementById('enterpriseDeleteBtn');
    const unbindBtn = document.getElementById('unbindBtn');
    
    if (checked > 0) {
        linkModelBtn.disabled = false;
        editBtn.disabled = checked !== 1;
        deleteBtn.disabled = false;
        unbindBtn.disabled = false;
    } else {
        linkModelBtn.disabled = true;
        editBtn.disabled = true;
        deleteBtn.disabled = true;
        unbindBtn.disabled = true;
    }
}

// 查看商品详情
function viewProduct(id) {
    alert(`查看商品详情: ${id}`);
}

// 关联模型
function linkModel(id) {
    alert(`关联模型: ${id}`);
}

// 编辑商品
function editProduct(id) {
    alert(`编辑商品: ${id}`);
}

// 删除商品
function deleteProduct(id) {
    if (confirm(`确定要删除商品 ${id} 吗？`)) {
        alert(`已删除商品: ${id}`);
    }
}

// 解绑商品
function unbindProduct(id) {
    if (confirm(`确定要解绑商品 ${id} 吗？解绑后将不再显示该商品。`)) {
        alert(`已解绑商品: ${id}`);
    }
}

// 显示新建商品模态框
function showAddProductModal() {
    document.getElementById('addProductModal').classList.add('show');
}

// 显示选择模型模态框
function showSelectModelModal() {
    alert('选择关联模型功能');
}