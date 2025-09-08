// Add Car functionality
class AddCarManager {
    constructor() {
        this.form = null;
        this.init();
    }
    
    init() {
        this.form = document.getElementById('add-car-form');
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }
    }
    
    handleSubmit() {
        const formData = new FormData(this.form);
        
        // Validate form
        if (!this.validateForm(formData)) {
            return;
        }
        
        // Create car object
        const carData = {
            id: 'custom-' + Date.now(),
            make: formData.get('make'),
            model: formData.get('model'),
            year: parseInt(formData.get('year')),
            price: parseFloat(formData.get('price')),
            color: formData.get('color'),
            mileage: parseInt(formData.get('mileage')),
            fuel_type: formData.get('fuelType'),
            transmission: formData.get('transmission'),
            carType: formData.get('carType'),
            engineSize: formData.get('engineSize'),
            description: formData.get('description'),
            image_url: ['/images/default-car.jpg'], // Default image
            createdAt: new Date().toISOString()
        };
        
        // Handle image uploads
        this.handleImageUploads(formData.get('images')).then(imageUrls => {
            if (imageUrls.length > 0) {
                carData.image_url = imageUrls;
            }
            
            // Add car to data
            this.addCarToData(carData);
            
            // Show success message
            this.showSuccessMessage(carData);
            
            // Clear form
            this.clearForm();
        }).catch(error => {
            console.error('Error uploading images:', error);
            // Add car without custom images
            this.addCarToData(carData);
            this.showSuccessMessage(carData);
            this.clearForm();
        });
    }
    
    validateForm(formData) {
        const requiredFields = ['make', 'model', 'year', 'price', 'color', 'mileage', 'fuelType', 'transmission', 'carType'];
        
        for (const field of requiredFields) {
            if (!formData.get(field) || formData.get(field).trim() === '') {
                alert(`يرجى ملء حقل ${this.getFieldLabel(field)}`);
                return false;
            }
        }
        
        // Validate year
        const year = parseInt(formData.get('year'));
        if (year < 1990 || year > 2024) {
            alert('السنة يجب أن تكون بين 1990 و 2024');
            return false;
        }
        
        // Validate price
        const price = parseFloat(formData.get('price'));
        if (price <= 0) {
            alert('السعر يجب أن يكون أكبر من صفر');
            return false;
        }
        
        // Validate mileage
        const mileage = parseInt(formData.get('mileage'));
        if (mileage < 0) {
            alert('الممشى لا يمكن أن يكون سالباً');
            return false;
        }
        
        return true;
    }
    
    getFieldLabel(fieldName) {
        const labels = {
            'make': 'الماركة',
            'model': 'الموديل',
            'year': 'السنة',
            'price': 'السعر',
            'color': 'اللون',
            'mileage': 'الممشى',
            'fuelType': 'نوع الوقود',
            'transmission': 'ناقل الحركة',
            'carType': 'نوع السيارة'
        };
        return labels[fieldName] || fieldName;
    }
    
    handleImageUploads(files) {
        return new Promise((resolve, reject) => {
            if (!files || files.length === 0) {
                resolve([]);
                return;
            }
            
            const imageUrls = [];
            let processedFiles = 0;
            
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                
                // Validate file type
                if (!file.type.startsWith('image/')) {
                    continue;
                }
                
                // Create object URL for preview (in real app, upload to server)
                const imageUrl = URL.createObjectURL(file);
                imageUrls.push(imageUrl);
                processedFiles++;
            }
            
            if (processedFiles === 0) {
                resolve([]);
            } else {
                resolve(imageUrls);
            }
        });
    }
    
    addCarToData(carData) {
        // Add to global cars data
        if (typeof window.carsData !== 'undefined') {
            window.carsData.push(carData);
            
            // Save to localStorage
            localStorage.setItem('customCars', JSON.stringify(
                window.carsData.filter(car => car.id.startsWith('custom-'))
            ));
        }
    }
    
    showSuccessMessage(carData) {
        const message = `
            تم إضافة السيارة بنجاح!
            
            ${carData.make} ${carData.model} ${carData.year}
            السعر: ${carData.price.toLocaleString('ar-SA')} ريال
            
            هل تريد إضافة سيارة أخرى؟
        `;
        
        if (confirm(message)) {
            // Stay on the same page to add another car
            return;
        } else {
            // Redirect to cars page
            window.location.href = 'cars.html';
        }
    }
    
    clearForm() {
        if (this.form) {
            this.form.reset();
        }
    }
}

// Global function for clearing form
function clearForm() {
    if (window.addCarManager) {
        window.addCarManager.clearForm();
    }
}

// Initialize add car manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.addCarManager = new AddCarManager();
    
    // Load custom cars from localStorage
    loadCustomCars();
});

function loadCustomCars() {
    const customCars = localStorage.getItem('customCars');
    if (customCars && typeof window.carsData !== 'undefined') {
        const parsedCustomCars = JSON.parse(customCars);
        // Remove existing custom cars and add the saved ones
        window.carsData = window.carsData.filter(car => !car.id.startsWith('custom-'));
        window.carsData.push(...parsedCustomCars);
    }
}

// Add CSS for add car page
const style = document.createElement('style');
style.textContent = `
    .add-car-section {
        margin: 20px;
    }
    
    .form-container {
        background: white;
        padding: 32px;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        max-width: 800px;
        margin: 0 auto;
    }
    
    .form-section {
        margin-bottom: 32px;
        padding-bottom: 24px;
        border-bottom: 1px solid #e5e7eb;
    }
    
    .form-section:last-of-type {
        border-bottom: none;
        margin-bottom: 0;
    }
    
    .form-section-title {
        font-size: 1.25rem;
        font-weight: 700;
        margin-bottom: 20px;
        color: #1f2937;
        padding-bottom: 8px;
        border-bottom: 2px solid #2563eb;
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
    .form-group select,
    .form-group textarea {
        padding: 12px 16px;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        font-size: 16px;
        transition: border-color 0.3s ease;
        font-family: inherit;
    }
    
    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: #2563eb;
    }
    
    .form-group textarea {
        resize: vertical;
        min-height: 100px;
    }
    
    .file-info {
        font-size: 14px;
        color: #6b7280;
        margin-top: 4px;
    }
    
    .form-actions {
        display: flex;
        gap: 16px;
        justify-content: center;
        margin-top: 32px;
        padding-top: 24px;
        border-top: 1px solid #e5e7eb;
    }
    
    .form-actions .btn {
        min-width: 120px;
    }
    
    @media (max-width: 768px) {
        .form-container {
            padding: 20px;
            margin: 0 10px;
        }
        
        .form-row {
            grid-template-columns: 1fr;
        }
        
        .form-actions {
            flex-direction: column;
            align-items: center;
        }
        
        .form-actions .btn {
            width: 100%;
            max-width: 300px;
        }
    }
`;
document.head.appendChild(style);
