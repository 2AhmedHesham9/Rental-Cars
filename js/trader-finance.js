// Trader Finance Management System
class TraderFinanceManager {
    constructor() {
        this.traderDeals = [];
        this.currentEditingDeal = null;
        
        this.init();
    }
    
    init() {
        this.loadTraderDeals();
        this.setupEventListeners();
        this.renderDealsTable();
        this.updateStatistics();
    }
    
    loadTraderDeals() {
        // Load from localStorage or use default deals
        const savedDeals = localStorage.getItem('traderDeals');
        if (savedDeals) {
            this.traderDeals = JSON.parse(savedDeals);
        } else {
            // Default trader deals
            this.traderDeals = [
                {
                    id: 'deal-1',
                    dealNumber: 'TF-2024-001',
                    traderName: 'أحمد محمد العتيبي',
                    carType: 'luxury',
                    financingAmount: 250000,
                    downPayment: 50000,
                    monthlyPayment: 4500,
                    status: 'active',
                    startDate: '2024-01-15',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'deal-2',
                    dealNumber: 'TF-2024-002',
                    traderName: 'سارة عبدالله القحطاني',
                    carType: 'classic',
                    financingAmount: 180000,
                    downPayment: 36000,
                    monthlyPayment: 3200,
                    status: 'active',
                    startDate: '2024-02-01',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'deal-3',
                    dealNumber: 'TF-2024-003',
                    traderName: 'محمد خالد الشمري',
                    carType: 'sport',
                    financingAmount: 220000,
                    downPayment: 44000,
                    monthlyPayment: 4200,
                    status: 'completed',
                    startDate: '2023-12-10',
                    createdAt: new Date().toISOString()
                }
            ];
            this.saveTraderDeals();
        }
    }
    
    saveTraderDeals() {
        localStorage.setItem('traderDeals', JSON.stringify(this.traderDeals));
    }
    
    setupEventListeners() {
        // Deal form submission
        const dealForm = document.getElementById('deal-form');
        if (dealForm) {
            dealForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveDeal();
            });
        }
        
        // Trader calculator form
        const traderForm = document.getElementById('trader-calculator-form');
        if (traderForm) {
            traderForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.calculateTraderFinance();
            });
        }
        
        // Modal close on outside click
        const modal = document.getElementById('deal-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }
    }
    
    renderDealsTable() {
        const tbody = document.getElementById('deals-tbody');
        if (!tbody) return;
        
        if (this.traderDeals.length === 0) {
            tbody.innerHTML = '<tr><td colspan="9" class="text-center">لا توجد صفقات تمويل</td></tr>';
            return;
        }
        
        tbody.innerHTML = this.traderDeals.map(deal => `
            <tr>
                <td>${deal.dealNumber}</td>
                <td>${deal.traderName}</td>
                <td>${this.getCarTypeName(deal.carType)}</td>
                <td>${deal.financingAmount.toLocaleString('ar-SA')} ريال</td>
                <td>${deal.downPayment.toLocaleString('ar-SA')} ريال</td>
                <td>${deal.monthlyPayment.toLocaleString('ar-SA')} ريال</td>
                <td>
                    <span class="status-badge ${deal.status}">
                        ${this.getStatusName(deal.status)}
                    </span>
                </td>
                <td>${new Date(deal.startDate).toLocaleDateString('ar-SA')}</td>
                <td>
                    <button class="btn-edit" onclick="traderFinanceManager.editDeal('${deal.id}')">تعديل</button>
                    <button class="btn-delete" onclick="traderFinanceManager.deleteDeal('${deal.id}')">حذف</button>
                </td>
            </tr>
        `).join('');
    }
    
    getCarTypeName(carType) {
        const types = {
            'luxury': 'فاخرة',
            'classic': 'كلاسيكية',
            'sport': 'رياضية',
            'family': 'عائلية'
        };
        return types[carType] || carType;
    }
    
    getStatusName(status) {
        const statuses = {
            'active': 'نشط',
            'completed': 'مكتمل',
            'defaulted': 'متأخر',
            'cancelled': 'ملغي'
        };
        return statuses[status] || status;
    }
    
    updateStatistics() {
        const totalFinanced = this.traderDeals.reduce((sum, deal) => sum + deal.financingAmount, 0);
        const activeDeals = this.traderDeals.filter(deal => deal.status === 'active').length;
        const monthlyRevenue = this.traderDeals
            .filter(deal => deal.status === 'active')
            .reduce((sum, deal) => sum + deal.monthlyPayment, 0);
        
        // Calculate profit margin (simplified calculation)
        const totalRevenue = this.traderDeals
            .filter(deal => deal.status === 'completed')
            .reduce((sum, deal) => sum + (deal.monthlyPayment * 12), 0);
        const profitMargin = totalRevenue > 0 ? ((totalRevenue * 0.15) / totalRevenue * 100) : 0;
        
        // Update DOM elements
        const totalFinancedEl = document.getElementById('total-financed');
        const activeDealsEl = document.getElementById('active-deals');
        const monthlyRevenueEl = document.getElementById('monthly-revenue');
        const profitMarginEl = document.getElementById('profit-margin');
        
        if (totalFinancedEl) totalFinancedEl.textContent = totalFinanced.toLocaleString('ar-SA');
        if (activeDealsEl) activeDealsEl.textContent = activeDeals;
        if (monthlyRevenueEl) monthlyRevenueEl.textContent = monthlyRevenue.toLocaleString('ar-SA');
        if (profitMarginEl) profitMarginEl.textContent = profitMargin.toFixed(1) + '%';
    }
    
    showAddDealModal() {
        this.currentEditingDeal = null;
        document.getElementById('deal-modal-title').textContent = 'إضافة صفقة تمويل جديدة';
        document.getElementById('deal-form').reset();
        document.getElementById('deal-modal').style.display = 'block';
    }
    
    editDeal(dealId) {
        const deal = this.traderDeals.find(d => d.id === dealId);
        if (!deal) return;
        
        this.currentEditingDeal = deal;
        document.getElementById('deal-modal-title').textContent = 'تعديل صفقة التمويل';
        
        // Fill form with deal data
        document.getElementById('deal-trader-name').value = deal.traderName;
        document.getElementById('deal-car-type').value = deal.carType;
        document.getElementById('deal-financing-amount').value = deal.financingAmount;
        document.getElementById('deal-down-payment').value = deal.downPayment;
        document.getElementById('deal-monthly-payment').value = deal.monthlyPayment;
        document.getElementById('deal-status').value = deal.status;
        
        document.getElementById('deal-modal').style.display = 'block';
    }
    
    saveDeal() {
        const formData = new FormData(document.getElementById('deal-form'));
        
        const dealData = {
            traderName: formData.get('traderName'),
            carType: formData.get('carType'),
            financingAmount: parseFloat(formData.get('financingAmount')),
            downPayment: parseFloat(formData.get('downPayment')),
            monthlyPayment: parseFloat(formData.get('monthlyPayment')),
            status: formData.get('status')
        };
        
        if (this.currentEditingDeal) {
            // Update existing deal
            const index = this.traderDeals.findIndex(d => d.id === this.currentEditingDeal.id);
            if (index !== -1) {
                this.traderDeals[index] = {
                    ...this.traderDeals[index],
                    ...dealData,
                    updatedAt: new Date().toISOString()
                };
            }
        } else {
            // Add new deal
            const newDeal = {
                id: 'deal-' + Date.now(),
                dealNumber: 'TF-' + new Date().getFullYear() + '-' + String(this.traderDeals.length + 1).padStart(3, '0'),
                ...dealData,
                startDate: new Date().toISOString().split('T')[0],
                createdAt: new Date().toISOString()
            };
            this.traderDeals.push(newDeal);
        }
        
        this.saveTraderDeals();
        this.renderDealsTable();
        this.updateStatistics();
        this.closeModal();
        
        alert('تم حفظ الصفقة بنجاح');
    }
    
    deleteDeal(dealId) {
        if (confirm('هل أنت متأكد من حذف هذه الصفقة؟')) {
            this.traderDeals = this.traderDeals.filter(d => d.id !== dealId);
            this.saveTraderDeals();
            this.renderDealsTable();
            this.updateStatistics();
            alert('تم حذف الصفقة بنجاح');
        }
    }
    
    closeModal() {
        document.getElementById('deal-modal').style.display = 'none';
        this.currentEditingDeal = null;
    }
    
    calculateTraderFinance() {
        const formData = new FormData(document.getElementById('trader-calculator-form'));
        
        const traderName = formData.get('traderName');
        const carType = formData.get('carType');
        const carValue = parseFloat(formData.get('carValue'));
        const financingAmount = parseFloat(formData.get('financingAmount'));
        const traderRate = parseFloat(formData.get('traderRate'));
        const financingPeriod = parseInt(formData.get('financingPeriod'));
        
        if (financingAmount >= carValue) {
            alert('مبلغ التمويل يجب أن يكون أقل من قيمة السيارة');
            return;
        }
        
        // Calculate trader finance
        const downPayment = carValue - financingAmount;
        const downPaymentPercentage = (downPayment / carValue) * 100;
        
        // Calculate monthly payment with trader rate
        const monthlyInterestRate = traderRate / 100 / 12;
        const numberOfPayments = financingPeriod * 12;
        
        let monthlyPayment;
        if (monthlyInterestRate === 0) {
            monthlyPayment = financingAmount / numberOfPayments;
        } else {
            monthlyPayment = financingAmount * 
                (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
                (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
        }
        
        const totalPayments = monthlyPayment * numberOfPayments;
        const totalInterest = totalPayments - financingAmount;
        const traderProfit = totalInterest * 0.3; // 30% of interest goes to trader
        const companyProfit = totalInterest * 0.7; // 70% goes to company
        
        this.displayTraderResults({
            traderName,
            carType,
            carValue,
            financingAmount,
            downPayment,
            downPaymentPercentage,
            monthlyPayment,
            totalPayments,
            totalInterest,
            traderProfit,
            companyProfit,
            traderRate,
            financingPeriod
        });
    }
    
    displayTraderResults(results) {
        const resultsContainer = document.getElementById('trader-results');
        const resultsContent = document.getElementById('trader-results-content');
        
        if (!resultsContainer || !resultsContent) return;
        
        resultsContent.innerHTML = `
            <div class="trader-result-item primary">
                <div class="result-label">القسط الشهري</div>
                <div class="result-value">${results.monthlyPayment.toLocaleString('ar-SA', {maximumFractionDigits: 0})} ريال</div>
            </div>
            
            <div class="trader-result-item">
                <div class="result-label">المقدم</div>
                <div class="result-value">${results.downPayment.toLocaleString('ar-SA')} ريال</div>
                <div class="result-note">${results.downPaymentPercentage.toFixed(1)}% من قيمة السيارة</div>
            </div>
            
            <div class="trader-result-item">
                <div class="result-label">مبلغ التمويل</div>
                <div class="result-value">${results.financingAmount.toLocaleString('ar-SA')} ريال</div>
            </div>
            
            <div class="trader-result-item">
                <div class="result-label">إجمالي الأقساط</div>
                <div class="result-value">${results.totalPayments.toLocaleString('ar-SA')} ريال</div>
            </div>
            
            <div class="trader-result-item">
                <div class="result-label">إجمالي الفوائد</div>
                <div class="result-value">${results.totalInterest.toLocaleString('ar-SA')} ريال</div>
            </div>
            
            <div class="trader-result-item profit">
                <div class="result-label">ربح التاجر</div>
                <div class="result-value">${results.traderProfit.toLocaleString('ar-SA')} ريال</div>
                <div class="result-note">30% من الفوائد</div>
            </div>
            
            <div class="trader-result-item">
                <div class="result-label">ربح الشركة</div>
                <div class="result-value">${results.companyProfit.toLocaleString('ar-SA')} ريال</div>
                <div class="result-note">70% من الفوائد</div>
            </div>
        `;
        
        resultsContainer.style.display = 'block';
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize trader finance manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.traderFinanceManager = new TraderFinanceManager();
});

// Add CSS for trader finance page
const style = document.createElement('style');
style.textContent = `
    .trader-overview-section {
        margin: 20px;
    }
    
    .overview-grid {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 24px;
        margin-bottom: 32px;
    }
    
    .overview-card {
        background: white;
        padding: 24px;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .overview-card h3 {
        font-size: 1.25rem;
        font-weight: 700;
        margin-bottom: 20px;
        color: #1f2937;
    }
    
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
    }
    
    .stat-item {
        text-align: center;
        padding: 16px;
        background: #f9fafb;
        border-radius: 8px;
    }
    
    .stat-value {
        font-size: 1.5rem;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 4px;
    }
    
    .stat-label {
        font-size: 14px;
        color: #6b7280;
    }
    
    .goals-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    
    .goal-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        background: #f0f9ff;
        border-radius: 8px;
    }
    
    .goal-icon {
        font-size: 1.25rem;
    }
    
    .goal-text {
        color: #1e40af;
        font-weight: 500;
    }
    
    .deals-section {
        margin: 40px 20px;
    }
    
    .deals-table-container {
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        overflow-x: auto;
    }
    
    .deals-table {
        width: 100%;
        border-collapse: collapse;
        min-width: 1000px;
    }
    
    .deals-table th {
        background: #f3f4f6;
        padding: 16px;
        text-align: right;
        color: #000;
        font-weight: 600;
        border-bottom: 1px solid #e5e7eb;
    }
    
    .deals-table td {
        padding: 16px;
        color: #000;
        border-bottom: 1px solid #e5e7eb;
    }
    
    .deals-table tr:hover {
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
    
    .status-badge.completed {
        background: #dbeafe;
        color: #1e40af;
    }
    
    .status-badge.defaulted {
        background: #fee2e2;
        color: #991b1b;
    }
    
    .status-badge.cancelled {
        background: #f3f4f6;
        color: #6b7280;
    }
    
    .trader-calculator-section {
        margin: 40px 20px;
        background: white;
        padding: 32px;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .trader-results {
        background: #f0f9ff;
        padding: 24px;
        border-radius: 12px;
        border: 2px solid #0ea5e9;
        margin-top: 24px;
    }
    
    .trader-results h3 {
        margin-bottom: 20px;
        color: #0c4a6e;
        text-align: center;
    }
    
    .results-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
    }
    
    .trader-result-item {
        background: white;
        padding: 20px;
        border-radius: 8px;
        text-align: center;
        border: 2px solid transparent;
        transition: all 0.3s ease;
    }
    
    .trader-result-item.primary {
        background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
        border-color: #2563eb;
    }
    
    .trader-result-item.profit {
        background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
        border-color: #16a34a;
    }
    
    .result-label {
        font-size: 14px;
        color: #6b7280;
        margin-bottom: 8px;
    }
    
    .result-value {
        font-size: 1.5rem;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 4px;
    }
    
    .result-note {
        font-size: 12px;
        color: #6b7280;
    }
    
    @media (max-width: 768px) {
        .overview-grid {
            grid-template-columns: 1fr;
        }
        
        .stats-grid {
            grid-template-columns: 1fr;
        }
        
        .results-grid {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(style);
