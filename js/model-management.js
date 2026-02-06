// 模拟模型数据
const mockModels = [
    {
        id: 'M20240001',
        name: '现代简约沙发',
        image: 'https://via.placeholder.com/200',
        category: '家具 > 客厅 > 沙发',
        type: '3D模型',
        status: 'online',
        statusText: '已上架',
        uploadTime: '2024-01-15 10:30:00',
        brand: '宜家',
        material: '布艺',
        size: '2000x900x800'
    },
    {
        id: 'M20240002',
        name: '北欧风格餐桌',
        image: 'https://via.placeholder.com/200',
        category: '家具 > 餐厅 > 餐桌',
        type: '3D模型',
        status: 'pending',
        statusText: '待审核',
        uploadTime: '2024-01-16 14:20:00',
        brand: '曲美',
        material: '实木',
        size: '1600x800x750'
    },
    {
        id: 'M20240003',
        name: '实木书架',
        image: 'https://via.placeholder.com/200',
        category: '家具 > 书房 > 书架',
        type: '3D模型',
        status: 'online',
        statusText: '已上架',
        uploadTime: '2024-01-17 09:15:00',
        brand: '林氏木业',
        material: '橡木',
        size: '1200x400x1800'
    },
    {
        id: 'M20240004',
        name: '智能床垫',
        image: 'https://via.placeholder.com/200',
        category: '家具 > 卧室 > 床垫',
        type: '3D模型',
        status: 'failed',
        statusText: '审核失败',
        uploadTime: '2024-01-18 16:45:00',
        brand: '慕思',
        material: '乳胶',
        size: '1800x2000x250'
    },
    {
        id: 'M20240005',
        name: '现代吊灯',
        image: 'https://via.placeholder.com/200',
        category: '灯具 > 吊灯',
        type: '3D模型',
        status: 'offline',
        statusText: '已下架',
        uploadTime: '2024-01-19 11:00:00',
        brand: '欧普',
        material: '金属+玻璃',
        size: '600x600x400'
    },
    {
        id: 'M20240006',
        name: '大理石纹理',
        image: 'https://via.placeholder.com/200',
        category: '材质 > 石材',
        type: '2D贴图',
        status: 'online',
        statusText: '已上架',
        uploadTime: '2024-01-20 13:30:00',
        brand: '东鹏',
        material: '大理石',
        size: '2048x2048'
    },
    {
        id: 'M20240007',
        name: '白色乳胶漆',
        image: 'https://via.placeholder.com/200',
        category: '涂料 > 乳胶漆',
        type: '涂料',
        status: 'online',
        statusText: '已上架',
        uploadTime: '2024-01-21 10:00:00',
        brand: '立邦',
        material: '乳胶漆',
        size: '-'
    },
    {
        id: 'M20240008',
        name: '儿童学习桌',
        image: 'https://via.placeholder.com/200',
        category: '家具 > 儿童 > 学习桌',
        type: '3D模型',
        status: 'pending',
        statusText: '待审核',
        uploadTime: '2024-01-22 15:20:00',
        brand: '护童',
        material: '实木',
        size: '1200x600x750'
    }
];

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    initModelView();
    initEventListeners();
});

// 初始化模型视图
function initModelView() {
    renderCardView();
    renderListView();
}

// 渲染卡片视图
function renderCardView() {
    const cardView = document.getElementById('cardView');
    cardView.innerHTML = mockModels.map(model => `
        <div class="model-card">
            <div class="model-card-checkbox">
                <input type="checkbox" data-id="${model.id}">
            </div>
            <div class="model-card-image">
                <img src="${model.image}" alt="${model.name}">
                <div class="model-card-overlay">
                    <button class="overlay-btn" onclick="viewModel('${model.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="overlay-btn" onclick="editModel('${model.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            </div>
            <div class="model-card-content">
                <div class="model-card-title">${model.name}</div>
                <div class="model-card-id">ID: ${model.id}</div>
                <div class="model-card-info">
                    <span><i class="fas fa-folder"></i> ${model.category}</span>
                </div>
                <div class="model-card-footer">
                    <span class="status-badge status-${model.status}">${model.statusText}</span>
                    <div class="model-card-actions">
                        <button class="icon-btn-sm" onclick="deleteModel('${model.id}')" title="删除">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// 渲染列表视图
function renderListView() {
    const tbody = document.getElementById('modelTableBody');
    tbody.innerHTML = mockModels.map(model => `
        <tr>
            <td><input type="checkbox" data-id="${model.id}"></td>
            <td><strong>${model.id}</strong></td>
            <td>${model.name}</td>
            <td><img src="${model.image}" alt="${model.name}" class="product-img"></td>
            <td>${model.category}</td>
            <td>${model.type}</td>
            <td><span class="status-badge status-${model.status}">${model.statusText}</span></td>
            <td>${model.uploadTime}</td>
            <td>
                <div class="action-btns">
                    <button class="action-btn primary" onclick="viewModel('${model.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn" onclick="editModel('${model.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn" onclick="deleteModel('${model.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
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
            document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 视图切换
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.dataset.view;
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            if (view === 'card') {
                document.getElementById('cardView').style.display = 'grid';
                document.getElementById('listView').style.display = 'none';
            } else {
                document.getElementById('cardView').style.display = 'none';
                document.getElementById('listView').style.display = 'block';
            }
        });
    });

    // 全选
    const selectAll = document.getElementById('selectAll');
    if (selectAll) {
        selectAll.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('input[type="checkbox"][data-id]');
            checkboxes.forEach(cb => cb.checked = this.checked);
            updateSelectedCount();
        });
    }

    // 单个复选框
    document.querySelectorAll('input[type="checkbox"][data-id]').forEach(cb => {
        cb.addEventListener('change', updateSelectedCount);
    });
}

// 更新选中数量
function updateSelectedCount() {
    const checked = document.querySelectorAll('input[type="checkbox"][data-id]:checked').length;
    document.getElementById('selectedCount').textContent = checked;
    
    // 更新批量操作按钮状态
    const batchAuditBtn = document.getElementById('batchAuditBtn');
    const batchDeleteBtn = document.getElementById('batchDeleteBtn');
    
    if (checked > 0) {
        batchAuditBtn.disabled = false;
        batchDeleteBtn.disabled = false;
    } else {
        batchAuditBtn.disabled = true;
        batchDeleteBtn.disabled = true;
    }
}

// 查看模型
function viewModel(id) {
    alert(`查看模型: ${id}`);
}

// 编辑模型
function editModel(id) {
    alert(`编辑模型: ${id}`);
}

// 删除模型
function deleteModel(id) {
    if (confirm(`确定要删除模型 ${id} 吗？`)) {
        alert(`已删除模型: ${id}`);
    }
}

// 显示上传模态框
function showUploadModal() {
    document.getElementById('uploadModal').classList.add('show');
}

// 显示批量上传模态框
function showBatchUploadModal() {
    document.getElementById('batchUploadModal').classList.add('show');
}

// 显示皮肤模型模态框
function showSkinModelModal() {
    alert('皮肤模型功能');
}