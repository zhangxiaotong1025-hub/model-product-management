// 公共JavaScript函数

// 初始化导航菜单折叠功能
document.addEventListener('DOMContentLoaded', function() {
    // 导航分组折叠
    document.querySelectorAll('.nav-group-title').forEach(title => {
        title.addEventListener('click', function() {
            const group = this.parentElement;
            const isExpanded = group.classList.contains('expanded');
            
            // 关闭其他展开的分组
            document.querySelectorAll('.nav-group.expanded').forEach(g => {
                if (g !== group) {
                    g.classList.remove('expanded');
                }
            });
            
            // 切换当前分组
            group.classList.toggle('expanded');
        });
    });
    
    // 默认展开包含当前活动页面的分组
    const activeItem = document.querySelector('.nav-group-items .nav-item.active');
    if (activeItem) {
        const group = activeItem.closest('.nav-group');
        if (group) {
            group.classList.add('expanded');
        }
    }
});

// 关闭模态框
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
    }
}

// 显示模态框
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
    }
}

// 点击模态框外部关闭
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('show');
    }
});

// ESC键关闭模态框
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.show').forEach(modal => {
            modal.classList.remove('show');
        });
    }
});

// 树节点展开/收起
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('fa-chevron-down') || e.target.classList.contains('fa-chevron-right')) {
        const node = e.target.closest('.tree-node');
        const children = node.querySelector('.tree-children');
        
        if (children) {
            if (e.target.classList.contains('fa-chevron-down')) {
                e.target.classList.remove('fa-chevron-down');
                e.target.classList.add('fa-chevron-right');
                children.style.display = 'none';
            } else {
                e.target.classList.remove('fa-chevron-right');
                e.target.classList.add('fa-chevron-down');
                children.style.display = 'block';
            }
        }
    }
});

// 树节点选中
document.addEventListener('click', function(e) {
    if (e.target.closest('.tree-node-content')) {
        const content = e.target.closest('.tree-node-content');
        // 不是点击操作按钮时才选中
        if (!e.target.closest('.tree-node-actions')) {
            document.querySelectorAll('.tree-node-content').forEach(node => {
                node.classList.remove('active');
            });
            content.classList.add('active');
        }
    }
});

// 文件上传预览
function handleFileUpload(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            console.log('File loaded:', file.name);
            // 这里可以添加预览逻辑
        };
        reader.readAsDataURL(file);
    }
}

// 拖拽上传
document.addEventListener('DOMContentLoaded', function() {
    const uploadAreas = document.querySelectorAll('.upload-area');
    
    uploadAreas.forEach(area => {
        const fileInput = area.querySelector('.file-input');
        
        // 点击上传区域触发文件选择
        area.addEventListener('click', function(e) {
            if (e.target === area || e.target.tagName === 'P' || e.target.tagName === 'I') {
                fileInput.click();
            }
        });
        
        // 拖拽相关事件
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            area.addEventListener(eventName, preventDefaults, false);
        });
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        ['dragenter', 'dragover'].forEach(eventName => {
            area.addEventListener(eventName, function() {
                area.classList.add('drag-over');
            });
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            area.addEventListener(eventName, function() {
                area.classList.remove('drag-over');
            });
        });
        
        area.addEventListener('drop', function(e) {
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                fileInput.files = files;
                handleFileUpload(fileInput);
            }
        });
        
        // 文件选择变化
        fileInput.addEventListener('change', function() {
            handleFileUpload(this);
        });
    });
});

// Toast 提示
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// 确认对话框
function confirmDialog(message, callback) {
    if (confirm(message)) {
        callback();
    }
}

// 格式化日期
function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}