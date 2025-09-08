// Car Finance Management System
class CarFinanceManager {
    constructor() {
        this.financeRules = [];
        this.currentEditingRule = null;
        
        this.init();
    }
    
    init() {
        this.loadFinanceRules();
        this.setupEventListeners();
        this.renderRulesTable();
        this.populateFinancingRuleSelect();
    }
    
    loadFinanceRules() {
        // Load from localStorage or use default rules
        const savedRules = localStorage.getItem('carFinanceRules');
        if (savedRules) {
            this.financeRules = JSON.parse(savedRules);
        } else {
            // Default finance rules
            this.financeRules = [
                {
                    id: 'rule-1',
                    name: 'قاعدة السيارات الفاخرة',
                    carType: 'luxury',
                    interestRate: 4.5,
                    maxPeriod: 5,
                    minDownPayment: 25,
                    status: 'active',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'rule-2',
                    name: 'قاعدة السيارات الكلاسيكية',
                    carType: 'classic',
                    interestRate: 5.0,
                    maxPeriod: 7,
                    minDownPayment: 30,
                    status: 'active',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'rule-3',
                    name: 'قاعدة السيارات الرياضية',
                    carType: 'sport',
                    interestRate: 5.5,
                    maxPeriod: 4,
                    minDownPayment: 20,
                    status: 'active',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'rule-4',
                    name: 'قاعدة السيارات العائلية',
                    carType: 'family',
                    interestRate: 4.0,
                    maxPeriod: 6,
                    minDownPayment: 20,
                    status: 'active',
                    createdAt: new Date().toISOString()
                }
            ];
            this.saveFinanceRules();
        }
    }
    
    saveFinanceRules() {
        localStorage.setItem('carFinanceRules', JSON.stringify(this.financeRules));
    }
    
    setupEventListeners() {
        // Rule form submission
        const ruleForm = document.getElementById('rule-form');
        if (ruleForm) {
            ruleForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveRule();
            });
        }
        
        // Profit calculator form
        const profitForm = document.getElementById('profit-calculator-form');
        if (profitForm) {
            profitForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.calculateProfit();
            });
        }
        
        // Modal close on outside click
        const modal = document.getElementById('rule-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }
    }
    
    renderRulesTable() {
        const tbody = document.getElementById('rules-tbody');
        if (!tbody) return;
        
        if (this.financeRules.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="text-center">لا توجد قواعد تمويل</td></tr>';
            return;
        }
        
        tbody.innerHTML = this.financeRules.map(rule => `
            <tr>
                <td>${rule.name}</td>
                <td>${this.getCarTypeName(rule.carType)}</td>
                <td>${rule.interestRate}%</td>
                <td>${rule.maxPeriod} سنوات</td>
                <td>${rule.minDownPayment}%</td>
                <td>
                    <span class="status-badge ${rule.status}">
                        ${rule.status === 'active' ? 'نشط' : 'غير نشط'}
                    </span>
                </td>
                <td>
                    <button class="btn-edit" onclick="carFinanceManager.editRule('${rule.id}')">تعديل</button>
                    <button class="btn-delete" onclick="carFinanceManager.deleteRule('${rule.id}')">حذف</button>
                </td>
            </tr>
        `).join('');
    }
    
    getCarTypeName(carType) {
        const types = {
            'luxury': 'فاخرة',
            'classic': 'كلاسيكية',
            'sport': 'رياضية',
            'family': 'عائلية',
            'general': 'عامة'
        };
        return types[carType] || carType;
    }
    
    populateFinancingRuleSelect() {
        const select = document.getElementById('financing-rule');
        if (!select) return;
        
        select.innerHTML = '<option value="">اختر قاعدة التمويل</option>' +
            this.financeRules.filter(rule => rule.status === 'active')
                .map(rule => `<option value="${rule.id}">${rule.name}</option>`)
                .join('');
    }
    
    showAddRuleModal() {
        this.currentEditingRule = null;
        document.getElementById('modal-title').textContent = 'إضافة قاعدة تمويل جديدة';
        document.getElementById('rule-form').reset();
        document.getElementById('rule-modal').style.display = 'block';
    }
    
    editRule(ruleId) {
        const rule = this.financeRules.find(r => r.id === ruleId);
        if (!rule) return;
        
        this.currentEditingRule = rule;
        document.getElementById('modal-title').textContent = 'تعديل قاعدة التمويل';
        
        // Fill form with rule data
        document.getElementById('rule-name').value = rule.name;
        document.getElementById('car-type').value = rule.carType;
        document.getElementById('interest-rate').value = rule.interestRate;
        document.getElementById('max-period').value = rule.maxPeriod;
        document.getElementById('min-down-payment').value = rule.minDownPayment;
        document.getElementById('rule-status').value = rule.status;
        
        document.getElementById('rule-modal').style.display = 'block';
    }
    
    saveRule() {
        const formData = new FormData(document.getElementById('rule-form'));
        
        const ruleData = {
            name: formData.get('ruleName'),
            carType: formData.get('carType'),
            interestRate: parseFloat(formData.get('interestRate')),
            maxPeriod: parseInt(formData.get('maxPeriod')),
            minDownPayment: parseInt(formData.get('minDownPayment')),
            status: formData.get('ruleStatus')
        };
        
        if (this.currentEditingRule) {
            // Update existing rule
            const index = this.financeRules.findIndex(r => r.id === this.currentEditingRule.id);
            if (index !== -1) {
                this.financeRules[index] = {
                    ...this.financeRules[index],
                    ...ruleData,
                    updatedAt: new Date().toISOString()
                };
            }
        } else {
            // Add new rule
            const newRule = {
                id: 'rule-' + Date.now(),
                ...ruleData,
                createdAt: new Date().toISOString()
            };
            this.financeRules.push(newRule);
        }
        
        this.saveFinanceRules();
        this.renderRulesTable();
        this.populateFinancingRuleSelect();
        this.closeModal();
        
        alert('تم حفظ القاعدة بنجاح');
    }
    
    deleteRule(ruleId) {
        if (confirm('هل أنت متأكد من حذف هذه القاعدة؟')) {
            this.financeRules = this.financeRules.filter(r => r.id !== ruleId);
            this.saveFinanceRules();
            this.renderRulesTable();
            this.populateFinancingRuleSelect();
            alert('تم حذف القاعدة بنجاح');
        }
    }
    
    closeModal() {
        document.getElementById('rule-modal').style.display = 'none';
        this.currentEditingRule = null;
    }
    
    calculateProfit() {
        const formData = new FormData(document.getElementById('profit-calculator-form'));
        
        const carCost = parseFloat(formData.get('carCost'));
        const sellingPrice = parseFloat(formData.get('sellingPrice'));
        const ruleId = formData.get('financingRule');
        const downPaymentAmount = parseFloat(formData.get('downPaymentAmount'));
        
        if (carCost >= sellingPrice) {
            alert('سعر البيع يجب أن يكون أكبر من تكلفة السيارة');
            return;
        }
        
        const rule = this.financeRules.find(r => r.id === ruleId);
        if (!rule) {
            alert('يرجى اختيار قاعدة تمويل صحيحة');
            return;
        }
        
        const financedAmount = sellingPrice - downPaymentAmount;
        const downPaymentPercentage = (downPaymentAmount / sellingPrice) * 100;
        
        if (downPaymentPercentage < rule.minDownPayment) {
            alert(`الحد الأدنى للمقدم هو ${rule.minDownPayment}%`);
            return;
        }
        
        // Calculate monthly payment
        const monthlyInterestRate = rule.interestRate / 100 / 12;
        const numberOfPayments = rule.maxPeriod * 12;
        
        let monthlyPayment;
        if (monthlyInterestRate === 0) {
            monthlyPayment = financedAmount / numberOfPayments;
        } else {
            monthlyPayment = financedAmount * 
                (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
                (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
        }
        
        const totalPayments = monthlyPayment * numberOfPayments;
        const totalInterest = totalPayments - financedAmount;
        const grossProfit = sellingPrice - carCost;
        const netProfit = grossProfit + totalInterest;
        const profitMargin = (netProfit / carCost) * 100;
        
        this.displayProfitResults({
            carCost,
            sellingPrice,
            downPaymentAmount,
            financedAmount,
            monthlyPayment,
            totalPayments,
            totalInterest,
            grossProfit,
            netProfit,
            profitMargin,
            rule
        });
    }
    
    displayProfitResults(results) {
        const resultsContainer = document.getElementById('profit-results');
        const resultsContent = document.getElementById('profit-results-content');
        
        if (!resultsContainer || !resultsContent) return;
        
        resultsContent.innerHTML = `
            <div class="profit-item primary">
                <div class="profit-label">الربح الصافي</div>
                <div class="profit-value">${results.netProfit.toLocaleString('ar-SA')} ريال</div>
                <div class="profit-percentage">${results.profitMargin.toFixed(1)}%</div>
            </div>
            
            <div class="profit-item">
                <div class="profit-label">الربح الإجمالي</div>
                <div class="profit-value">${results.grossProfit.toLocaleString('ar-SA')} ريال</div>
            </div>
            
            <div class="profit-item">
                <div class="profit-label">إجمالي الفوائد</div>
                <div class="profit-value">${results.totalInterest.toLocaleString('ar-SA')} ريال</div>
            </div>
            
            <div class="profit-item">
                <div class="profit-label">القسط الشهري</div>
                <div class="profit-value">${results.monthlyPayment.toLocaleString('ar-SA', {maximumFractionDigits: 0})} ريال</div>
            </div>
            
            <div class="profit-item">
                <div class="profit-label">إجمالي الأقساط</div>
                <div class="profit-value">${results.totalPayments.toLocaleString('ar-SA')} ريال</div>
            </div>
            
            <div class="profit-item">
                <div class="profit-label">مبلغ التمويل</div>
                <div class="profit-value">${results.financedAmount.toLocaleString('ar-SA')} ريال</div>
            </div>
        `;
        
        resultsContainer.style.display = 'block';
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize car finance manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.carFinanceManager = new CarFinanceManager();
});

// Add CSS for car finance page
const style = document.createElement('style');
style.textContent = `
    .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
    }
    
    .finance-rules-section {
        margin: 20px;
    }
    
    .rules-table-container {
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        overflow-x: auto;
    }
    
    .rules-table {
        width: 100%;
        border-collapse: collapse;
        min-width: 800px;
    }
    
    .rules-table th {
        background: #f3f4f6;
        padding: 16px;
        text-align: right;
        color: #000;
        font-weight: 600;
        border-bottom: 1px solid #e5e7eb;
    }
    
    .rules-table td {
        padding: 16px;
        color: #000;
        border-bottom: 1px solid #e5e7eb;
    }
    
    .rules-table tr:hover {
        background: #f9fafb;
    }
    
    .status-badge {
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
    }
    
    .status-badge.active {
        background: #dcfce7;
        color: #166534;
    }
    
    .status-badge.inactive {
        background: #fee2e2;
        color: #991b1b;
    }
    
    .btn-edit,
    .btn-delete {
        padding: 6px 12px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        margin-left: 4px;
    }
    
    .btn-edit {
        background: #2563eb;
        color: white;
    }
    
    .btn-edit:hover {
        background: #1d4ed8;
    }
    
    .btn-delete {
        background: #dc2626;
        color: white;
    }
    
    .btn-delete:hover {
        background: #b91c1c;
    }
    
    .finance-calculator-section {
        margin: 40px 20px;
        background: white;
        padding: 32px;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .calculator-form {
        margin-bottom: 32px;
    }
    
    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-bottom: 20px;
    }
    
    .form-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    
    .form-group label {
        font-weight: 600;
        color: #374151;
    }
    
    .form-group input,
    .form-group select {
        padding: 12px 16px;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        font-size: 16px;
        transition: border-color 0.3s ease;
    }
    
    .form-group input:focus,
    .form-group select:focus {
        outline: none;
        border-color: #2563eb;
    }
    
    .profit-results {
        background: #f0f9ff;
        padding: 24px;
        border-radius: 12px;
        border: 2px solid #0ea5e9;
    }
    
    .profit-results h3 {
        margin-bottom: 20px;
        color: #0c4a6e;
        text-align: center;
    }
    
    .results-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
    }
    
    .profit-item {
        background: white;
        padding: 20px;
        border-radius: 8px;
        text-align: center;
        border: 2px solid transparent;
        transition: all 0.3s ease;
    }
    
    .profit-item.primary {
        background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
        border-color: #2563eb;
    }
    
    .profit-label {
        font-size: 14px;
        color: #6b7280;
        margin-bottom: 8px;
    }
    
    .profit-value {
        font-size: 1.5rem;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 4px;
    }
    
    .profit-percentage {
        font-size: 1.25rem;
        font-weight: 600;
        color: #16a34a;
    }
    
    .form-actions {
        display: flex;
        gap: 12px;
        justify-content: center;
        margin-top: 24px;
    }
    
    @media (max-width: 768px) {
        .section-header {
            flex-direction: column;
            gap: 16px;
            align-items: stretch;
        }
        
        .form-row {
            grid-template-columns: 1fr;
        }
        
        .results-grid {
            grid-template-columns: 1fr;
        }
        
        .form-actions {
            flex-direction: column;
        }
    }
`;
document.head.appendChild(style);
