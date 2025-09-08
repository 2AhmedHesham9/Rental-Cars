// Finance Calculator functionality
class FinanceCalculator {
    constructor() {
        this.form = null;
        this.resultsContainer = null;
        this.resultsContent = null;
        
        this.init();
    }
    
    init() {
        this.form = document.getElementById('finance-form');
        this.resultsContainer = document.getElementById('calculator-results');
        this.resultsContent = document.getElementById('results-content');
        
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.calculateFinance();
            });
        }
        
        // Add real-time calculation on input change
        this.addRealTimeCalculation();
    }
    
    addRealTimeCalculation() {
        const inputs = this.form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (this.isFormValid()) {
                    this.calculateFinance();
                }
            });
        });
    }
    
    isFormValid() {
        const requiredFields = ['carPrice', 'downPayment', 'financingPeriod', 'interestRate'];
        return requiredFields.every(fieldName => {
            const field = this.form.querySelector(`[name="${fieldName}"]`);
            return field && field.value && field.value.trim() !== '';
        });
    }
    
    calculateFinance() {
        if (!this.isFormValid()) {
            return;
        }
        
        const formData = new FormData(this.form);
        const data = {
            carPrice: parseFloat(formData.get('carPrice')),
            downPayment: parseFloat(formData.get('downPayment')),
            financingPeriod: parseInt(formData.get('financingPeriod')),
            interestRate: parseFloat(formData.get('interestRate')),
            insuranceCost: parseFloat(formData.get('insuranceCost')) || 0,
            processingFee: parseFloat(formData.get('processingFee')) || 0
        };
        
        // Validate inputs
        if (data.downPayment >= data.carPrice) {
            alert('المقدم يجب أن يكون أقل من سعر السيارة');
            return;
        }
        
        if (data.downPayment < data.carPrice * 0.2) {
            alert('الحد الأدنى للمقدم هو 20% من قيمة السيارة');
            return;
        }
        
        const results = this.performCalculations(data);
        this.displayResults(results);
    }
    
    performCalculations(data) {
        const financedAmount = data.carPrice - data.downPayment;
        const monthlyInterestRate = data.interestRate / 100 / 12;
        const numberOfPayments = data.financingPeriod * 12;
        
        // Calculate monthly payment using the loan payment formula
        let monthlyPayment;
        if (monthlyInterestRate === 0) {
            // If no interest, just divide the principal by number of payments
            monthlyPayment = financedAmount / numberOfPayments;
        } else {
            // Standard loan payment formula
            monthlyPayment = financedAmount * 
                (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
                (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
        }
        
        const totalPayments = monthlyPayment * numberOfPayments;
        const totalInterest = totalPayments - financedAmount;
        const totalCost = data.carPrice + totalInterest + data.insuranceCost * data.financingPeriod + data.processingFee;
        
        // Calculate insurance monthly cost
        const monthlyInsurance = data.insuranceCost / 12;
        const totalMonthlyPayment = monthlyPayment + monthlyInsurance;
        
        return {
            financedAmount: financedAmount,
            monthlyPayment: monthlyPayment,
            monthlyInsurance: monthlyInsurance,
            totalMonthlyPayment: totalMonthlyPayment,
            totalPayments: totalPayments,
            totalInterest: totalInterest,
            totalCost: totalCost,
            downPaymentPercentage: (data.downPayment / data.carPrice) * 100,
            interestPercentage: (totalInterest / financedAmount) * 100
        };
    }
    
    displayResults(results) {
        if (!this.resultsContainer || !this.resultsContent) return;
        
        this.resultsContent.innerHTML = `
            <div class="results-grid">
                <div class="result-item primary">
                    <div class="result-label">القسط الشهري</div>
                    <div class="result-value">${results.totalMonthlyPayment.toLocaleString('ar-SA', {maximumFractionDigits: 0})} ريال</div>
                    <div class="result-note">(شامل التأمين)</div>
                </div>
                
                <div class="result-item">
                    <div class="result-label">مبلغ التمويل</div>
                    <div class="result-value">${results.financedAmount.toLocaleString('ar-SA')} ريال</div>
                </div>
                
                <div class="result-item">
                    <div class="result-label">إجمالي الأقساط</div>
                    <div class="result-value">${results.totalPayments.toLocaleString('ar-SA')} ريال</div>
                </div>
                
                <div class="result-item">
                    <div class="result-label">إجمالي الفوائد</div>
                    <div class="result-value">${results.totalInterest.toLocaleString('ar-SA')} ريال</div>
                </div>
                
                <div class="result-item">
                    <div class="result-label">التكلفة الإجمالية</div>
                    <div class="result-value">${results.totalCost.toLocaleString('ar-SA')} ريال</div>
                </div>
                
                <div class="result-item">
                    <div class="result-label">نسبة المقدم</div>
                    <div class="result-value">${results.downPaymentPercentage.toFixed(1)}%</div>
                </div>
            </div>
            
            <div class="results-summary">
                <h3>ملخص التمويل</h3>
                <p>ستدفع <strong>${results.totalMonthlyPayment.toLocaleString('ar-SA', {maximumFractionDigits: 0})} ريال</strong> شهرياً لمدة <strong>${document.getElementById('financing-period').value} سنوات</strong></p>
                <p>إجمالي الفوائد: <strong>${results.totalInterest.toLocaleString('ar-SA')} ريال</strong></p>
                <p>التكلفة الإجمالية للسيارة: <strong>${results.totalCost.toLocaleString('ar-SA')} ريال</strong></p>
            </div>
            
            <div class="results-actions">
                <button class="btn btn-success" onclick="financeCalculator.printResults()">طباعة النتائج</button>
                <button class="btn btn-secondary" onclick="financeCalculator.shareResults()">مشاركة النتائج</button>
            </div>
        `;
        
        this.resultsContainer.style.display = 'block';
        this.resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }
    
    clearForm() {
        if (this.form) {
            this.form.reset();
        }
        
        if (this.resultsContainer) {
            this.resultsContainer.style.display = 'none';
        }
    }
    
    printResults() {
        const printContent = this.resultsContent.innerHTML;
        const originalContent = document.body.innerHTML;
        
        document.body.innerHTML = `
            <div style="font-family: 'Cairo', sans-serif; direction: rtl; padding: 20px;">
                <h1 style="text-align: center; color: #1e3a8a;">نتائج حساب التمويل</h1>
                <div style="margin-top: 20px;">${printContent}</div>
                <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #666;">
                    تم طباعة هذا التقرير في: ${new Date().toLocaleDateString('ar-SA')}
                </div>
            </div>
        `;
        
        window.print();
        document.body.innerHTML = originalContent;
        
        // Re-initialize the calculator
        this.init();
    }
    
    shareResults() {
        const results = this.resultsContent.innerHTML;
        const text = `نتائج حساب التمويل من معرض الزهراني:\n\n${results.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'نتائج حساب التمويل',
                text: text,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(text).then(() => {
                alert('تم نسخ النتائج إلى الحافظة');
            }).catch(() => {
                alert('لا يمكن مشاركة النتائج في هذا المتصفح');
            });
        }
    }
    
    // Pre-fill form with car data
    fillFormWithCarData(carData) {
        if (!this.form || !carData) return;
        
        const carPriceField = document.getElementById('car-price');
        const downPaymentField = document.getElementById('down-payment');
        
        if (carPriceField && carData.price) {
            carPriceField.value = carData.price;
        }
        
        if (downPaymentField && carData.price) {
            // Set default down payment to 20%
            downPaymentField.value = Math.round(carData.price * 0.2);
        }
        
        // Trigger calculation if form is valid
        if (this.isFormValid()) {
            this.calculateFinance();
        }
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.financeCalculator = new FinanceCalculator();
});

// Add CSS for calculator results
const style = document.createElement('style');
style.textContent = `
    .calculator-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 40px;
        margin: 40px 0;
    }
    
    .calculator-form {
        background: white;
        padding: 32px;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .form-title {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 24px;
        color: #1f2937;
        text-align: center;
    }
    
    .form-group {
        margin-bottom: 20px;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: #374151;
    }
    
    .form-group input,
    .form-group select {
        width: 100%;
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
    
    .btn-calculate {
        width: 100%;
        margin-bottom: 12px;
    }
    
    .calculator-results {
        background: white;
        padding: 32px;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .results-title {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 24px;
        color: #1f2937;
        text-align: center;
    }
    
    .results-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
        margin-bottom: 24px;
    }
    
    .result-item {
        background: #f9fafb;
        padding: 20px;
        border-radius: 8px;
        text-align: center;
        border: 2px solid transparent;
        transition: all 0.3s ease;
    }
    
    .result-item.primary {
        background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
        border-color: #2563eb;
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
    
    .results-summary {
        background: #f0f9ff;
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 24px;
    }
    
    .results-summary h3 {
        margin-bottom: 12px;
        color: #1e40af;
    }
    
    .results-summary p {
        margin-bottom: 8px;
        color: #1e40af;
    }
    
    .results-actions {
        display: flex;
        gap: 12px;
        justify-content: center;
    }
    
    .finance-info-section {
        margin: 40px 20px;
    }
    
    .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 24px;
        margin-top: 32px;
    }
    
    .info-card {
        background: white;
        padding: 24px;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .info-card h3 {
        font-size: 1.25rem;
        font-weight: 700;
        margin-bottom: 16px;
        color: #1f2937;
    }
    
    .info-card ul {
        list-style: none;
        padding: 0;
    }
    
    .info-card li {
        padding: 8px 0;
        border-bottom: 1px solid #e5e7eb;
        color: #6b7280;
    }
    
    .info-card li:last-child {
        border-bottom: none;
    }
    
    @media (max-width: 768px) {
        .calculator-container {
            grid-template-columns: 1fr;
            gap: 24px;
        }
        
        .results-grid {
            grid-template-columns: 1fr;
        }
        
        .results-actions {
            flex-direction: column;
        }
    }
`;
document.head.appendChild(style);
