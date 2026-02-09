// 模拟商品数据
const mockProducts = [
    {
        id: 'SKU001',
        name: '现代简约沙发',
        image: 'https://via.placeholder.com/48',
        brand: '宜家',
        category: '家具/客厅/沙发',
        status: 'success',
        statusText: '已上架',
        modelId: 'M20240001',
        buildTime: '2024-01-15'
    },
    {
        id: 'SKU002',
        name: '北欧风格餐桌',
        image: 'https://via.placeholder.com/48',
        brand: '曲美',
        category: '家具/餐厅/餐桌',
        status: 'warning',
        statusText: '待审核',
        modelId: 'M20240002',
        buildTime: '2024-01-16'
    },
    {
        id: 'SKU003',
        name: '实木书架',
        image: 'https://via.placeholder.com/48',
        brand: '林氏木业',
        category: '家具/书房/书架',
        status: 'success',
        statusText: '已上架',
        modelId: 'M20240003',
        buildTime: '2024-01-17'
    },
    {
        id: 'SKU004',
        name: '智能床垫',
        image: 'https://via.placeholder.com/48',
        brand: '慕思',
        category: '家具/卧室/床垫',
        status: 'danger',
        statusText: '审核失败',
        modelId: 'M20240004',
        buildTime: '2024-01-18'
    },
    {
        id: 'SKU005',
        name: '现代吊灯',
        image: 'https://via.placeholder.com/48',
        brand: '欧普',
        category: '灯具/吊灯',
        status: 'info',
        statusText: '建模中',
        modelId: 'M20240005',
        buildTime: '2024-01-19'
    },
    {
        id: 'SKU006',
        name: '真皮办公椅',
        image: 'https://via.placeholder.com/48',
        brand: '震旦',
        category: '家具/办公/椅子',
        status: 'success',
        statusText: '已上架',
        modelId: 'M20240006',
        buildTime: '2024-01-20'
    },
    {
        id: 'SKU007',
        name: '儿童学习桌',
        image: 'https://via.placeholder.com/48',
        brand: '护童',
        category: '家具/儿童/学习桌',
        status: 'success',
        statusText: '已上架',
        modelId: 'M20240007',
        buildTime: '2024-01-21'
    },
    {
        id: 'SKU008',
        name: '智能衣柜',
        image: 'https://via.placeholder.com/48',
        brand: '索菲亚',
        category: '家具/卧室/衣柜',
        status: 'warning',
        statusText: '待审核',
        modelId: 'M20240008',
        buildTime: '2024-01-22'
    }
];

// 模拟高风险商品数据
const mockRiskProducts = [
    {
        name: '豪华真皮沙发',
        risk: 'high',
        factors: '库存积压',
        value: '$15,200',
        feedback: { positive: 2, neutral: 1, negative: 3 }
    },
    {
        name: '进口实木餐桌',
        risk: 'high',
        factors: '销量下降',
        value: '$8,740',
        feedback: { positive: 1, neutral: 2, negative: 2 }
    },
    {
        name: '智能按摩椅',
        risk: 'medium',
        factors: '退货率高',
        value: '$12,100',
        feedback: { positive: 3, neutral: 1, negative: 1 }
    }
];

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    initProductTable();
    initRiskTable();
    initChart();
    initEventListeners();
    initNavigation();
});

// 初始化商品表格
function initProductTable() {
    const tbody = document.getElementById('productTableBody');
    tbody.innerHTML = mockProducts.map(product => `
        <tr>
            <td><input type="checkbox" data-id="${product.id}"></td>
            <td><strong>${product.id}</strong></td>
            <td>${product.name}</td>
            <td><img src="${product.image}" alt="${product.name}" class="product-img"></td>
            <td>${product.brand}</td>
            <td>${product.category}</td>
            <td><span class="status-badge status-${product.status}">${product.statusText}</span></td>
            <td>${product.modelId}</td>
            <td>${product.buildTime}</td>
            <td>
                <div class="action-btns">
                    <button class="action-btn primary" onclick="viewProduct('${product.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn" onclick="editProduct('${product.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn" onclick="deleteProduct('${product.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// 初始化风险表格
function initRiskTable() {
    const tbody = document.getElementById('riskTableBody');
    tbody.innerHTML = mockRiskProducts.map(product => `
        <tr>
            <td>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <img src="https://via.placeholder.com/32" alt="${product.name}" 
                         style="width: 32px; height: 32px; border-radius: 6px;">
                    <span>${product.name}</span>
                </div>
            </td>
            <td>
                <div class="risk-level">
                    ${generateRiskBars(product.risk)}
                </div>
            </td>
            <td>${product.factors}</td>
            <td><strong>${product.value}</strong></td>
            <td>
                <div class="feedback-icons">
                    <div class="feedback-icon positive" title="正面反馈">
                        <i class="fas fa-plus"></i> ${product.feedback.positive}
                    </div>
                    <div class="feedback-icon neutral" title="中性反馈">
                        <i class="fas fa-minus"></i> ${product.feedback.neutral}
                    </div>
                    <div class="feedback-icon negative" title="负面反馈">
                        <i class="fas fa-times"></i> ${product.feedback.negative}
                    </div>
                </div>
            </td>
            <td>
                <button class="action-btn">
                    <i class="fas fa-ellipsis-h"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// 生成风险等级条
function generateRiskBars(level) {
    const levels = {
        high: 4,
        medium: 3,
        low: 2
    };
    const count = levels[level] || 2;
    let bars = '';
    for (let i = 0; i < 4; i++) {
        const active = i < count;
        bars += `<div class="risk-bar ${active ? level : ''}" style="opacity: ${active ? 1 : 0.2}"></div>`;
    }
    return bars;
}

// 初始化图表
function initChart() {
    const ctx = document.getElementById('modelTrendChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
            datasets: [{
                label: '模型上传量',
                data: [420, 580, 650, 720, 890, 950],
                borderColor: '#6366F1',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#E2E8F0'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// 初始化导航菜单
function initNavigation() {
    // 折叠菜单功能
    const navGroups = document.querySelectorAll('.nav-group');
    
    navGroups.forEach(group => {
        const title = group.querySelector('.nav-group-title');
        if (title) {
            title.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // 切换当前组的展开状态
                group.classList.toggle('active');
                
                // 可选：关闭其他展开的组（手风琴效果）
                // navGroups.forEach(otherGroup => {
                //     if (otherGroup !== group) {
                //         otherGroup.classList.remove('active');
                //     }
                // });
            });
        }
    });
    
    // 检查当前页面，自动展开对应的菜单组
    const currentPath = window.location.pathname;
    const currentFileName = currentPath.split('/').pop();
    
    navGroups.forEach(group => {
        const items = group.querySelectorAll('.nav-group-items .nav-item');
        items.forEach(item => {
            const href = item.getAttribute('href');
            if (href && href === currentFileName) {
                group.classList.add('active');
                item.classList.add('active');
            }
        });
    });
}

// 初始化事件监听
function initEventListeners() {
    // 全选功能
    const selectAll = document.getElementById('selectAll');
    if (selectAll) {
        selectAll.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('#productTableBody input[type="checkbox"]');
            checkboxes.forEach(cb => cb.checked = this.checked);
        });
    }
}
// 更新选中数量
function updateSelectedCount() {
    const checked = document.querySelectorAll('tbody input[type="checkbox"]:checked').length;
    const total = mockProducts.length;
    const info = document.querySelector('.table-info');
    if (info) {
        info.innerHTML = `已选择 <strong>${checked}</strong> 个商品，共 <strong>${total}</strong> 个商品`;
    }
}

// 查看商品详情
function viewProduct(id) {
    const product = mockProducts.find(p => p.id === id);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
            <div>
                <img src="${product.image}" alt="${product.name}" 
                     style="width: 100%; border-radius: 12px; margin-bottom: 16px;">
                <h3 style="margin-bottom: 8px;">${product.name}</h3>
                <p style="color: var(--text-secondary); margin-bottom: 16px;">SKU: ${product.id}</p>
                <div style="display: flex; gap: 8px; margin-bottom: 16px;">
                    <span class="status-badge status-${product.status}">${product.statusText}</span>
                </div>
            </div>
            <div>
                <h4 style="margin-bottom: 16px;">商品信息</h4>
                <div style="display: grid; gap: 12px;">
                    <div>
                        <div style="color: var(--text-secondary); font-size: 13px; margin-bottom: 4px;">品牌</div>
                        <div style="font-weight: 600;">${product.brand}</div>
                    </div>
                    <div>
                        <div style="color: var(--text-secondary); font-size: 13px; margin-bottom: 4px;">销售类目</div>
                        <div style="font-weight: 600;">${product.category}</div>
                    </div>
                    <div>
                        <div style="color: var(--text-secondary); font-size: 13px; margin-bottom: 4px;">模型ID</div>
                        <div style="font-weight: 600;">${product.modelId}</div>
                    </div>
                    <div>
                        <div style="color: var(--text-secondary); font-size: 13px; margin-bottom: 4px;">建模时间</div>
                        <div style="font-weight: 600;">${product.buildTime}</div>
                    </div>
                </div>
                <div style="margin-top: 24px; display: flex; gap: 12px;">
                    <button class="btn-primary" style="flex: 1;">关联模型</button>
                    <button class="btn-secondary" style="flex: 1;">编辑商品</button>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('show');
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

// 导出功能
function exportData() {
    alert('导出数据功能');
}

// 筛选功能
function filterData() {
    alert('筛选功能');
}