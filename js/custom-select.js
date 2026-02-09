/**
 * 自定义下拉选择框组件
 * 支持：空状态提示、清除按钮、完全自定义样式
 */

class CustomSelect {
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            placeholder: '请选择',
            clearable: true,
            disabled: false,
            onChange: null,
            ...options
        };
        
        this.value = '';
        this.label = '';
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        // 隐藏原生 select
        this.element.style.display = 'none';
        
        // 创建自定义组件
        this.createCustomSelect();
        
        // 绑定事件
        this.bindEvents();
        
        // 初始化值
        this.updateValue(this.element.value);
    }
    
    createCustomSelect() {
        const wrapper = document.createElement('div');
        wrapper.className = 'custom-select';
        if (this.options.disabled) {
            wrapper.classList.add('disabled');
        }
        
        // 触发器
        const trigger = document.createElement('div');
        trigger.className = 'custom-select-trigger placeholder';
        trigger.innerHTML = `
            <span class="custom-select-value">${this.options.placeholder}</span>
            <div class="custom-select-icons">
                <span class="custom-select-clear" title="清除">
                    <i class="fas fa-times" style="font-size: 12px;"></i>
                </span>
                <span class="custom-select-arrow">
                    <i class="fas fa-chevron-down" style="font-size: 12px;"></i>
                </span>
            </div>
        `;
        
        // 下拉面板
        const dropdown = document.createElement('div');
        dropdown.className = 'custom-select-dropdown';
        
        // 生成选项
        const options = Array.from(this.element.options);
        options.forEach(option => {
            if (option.value === '') return; // 跳过空值选项
            
            const optionEl = document.createElement('div');
            optionEl.className = 'custom-select-option';
            optionEl.textContent = option.textContent;
            optionEl.dataset.value = option.value;
            
            if (option.disabled) {
                optionEl.classList.add('disabled');
            }
            
            dropdown.appendChild(optionEl);
        });
        
        // 如果没有选项，显示空状态
        if (dropdown.children.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'custom-select-empty';
            empty.textContent = '暂无数据';
            dropdown.appendChild(empty);
        }
        
        wrapper.appendChild(trigger);
        wrapper.appendChild(dropdown);
        
        // 插入到原生 select 后面
        this.element.parentNode.insertBefore(wrapper, this.element.nextSibling);
        
        // 保存引用
        this.wrapper = wrapper;
        this.trigger = trigger;
        this.dropdown = dropdown;
        this.valueEl = trigger.querySelector('.custom-select-value');
        this.clearBtn = trigger.querySelector('.custom-select-clear');
    }
    
    bindEvents() {
        // 点击触发器
        this.trigger.addEventListener('click', (e) => {
            if (this.options.disabled) return;
            e.stopPropagation();
            this.toggle();
        });
        
        // 点击清除按钮
        if (this.options.clearable) {
            this.clearBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.clear();
            });
        } else {
            this.clearBtn.style.display = 'none';
        }
        
        // 点击选项
        this.dropdown.addEventListener('click', (e) => {
            const option = e.target.closest('.custom-select-option');
            if (!option || option.classList.contains('disabled')) return;
            
            const value = option.dataset.value;
            const label = option.textContent;
            this.select(value, label);
        });
        
        // 点击外部关闭
        document.addEventListener('click', (e) => {
            if (!this.wrapper.contains(e.target)) {
                this.close();
            }
        });
        
        // ESC 键关闭
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }
    
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
    
    open() {
        this.isOpen = true;
        this.wrapper.classList.add('active');
    }
    
    close() {
        this.isOpen = false;
        this.wrapper.classList.remove('active');
    }
    
    select(value, label) {
        this.updateValue(value, label);
        this.close();
        
        // 触发原生 select 的 change 事件
        this.element.value = value;
        this.element.dispatchEvent(new Event('change', { bubbles: true }));
        
        // 触发自定义回调
        if (this.options.onChange) {
            this.options.onChange(value, label);
        }
    }
    
    updateValue(value, label) {
        this.value = value;
        
        if (!label && value) {
            // 从原生 select 中查找 label
            const option = Array.from(this.element.options).find(opt => opt.value === value);
            label = option ? option.textContent : '';
        }
        
        this.label = label;
        
        if (value) {
            this.valueEl.textContent = label;
            this.trigger.classList.remove('placeholder');
            this.wrapper.classList.add('has-value');
            
            // 更新选中状态
            this.dropdown.querySelectorAll('.custom-select-option').forEach(opt => {
                if (opt.dataset.value === value) {
                    opt.classList.add('selected');
                } else {
                    opt.classList.remove('selected');
                }
            });
        } else {
            this.valueEl.textContent = this.options.placeholder;
            this.trigger.classList.add('placeholder');
            this.wrapper.classList.remove('has-value');
            
            // 清除所有选中状态
            this.dropdown.querySelectorAll('.custom-select-option').forEach(opt => {
                opt.classList.remove('selected');
            });
        }
    }
    
    clear() {
        this.updateValue('', '');
        this.element.value = '';
        this.element.dispatchEvent(new Event('change', { bubbles: true }));
        
        if (this.options.onChange) {
            this.options.onChange('', '');
        }
    }
    
    setValue(value) {
        this.updateValue(value);
        this.element.value = value;
    }
    
    getValue() {
        return this.value;
    }
    
    enable() {
        this.options.disabled = false;
        this.wrapper.classList.remove('disabled');
    }
    
    disable() {
        this.options.disabled = true;
        this.wrapper.classList.add('disabled');
        this.close();
    }
    
    destroy() {
        this.wrapper.remove();
        this.element.style.display = '';
    }
}

// 自动初始化
document.addEventListener('DOMContentLoaded', function() {
    // 为所有带 data-custom-select 属性的 select 初始化自定义组件
    document.querySelectorAll('select[data-custom-select]').forEach(select => {
        const placeholder = select.dataset.placeholder || '请选择';
        const clearable = select.dataset.clearable !== 'false';
        
        new CustomSelect(select, {
            placeholder,
            clearable
        });
    });
});

// 导出到全局
window.CustomSelect = CustomSelect;
