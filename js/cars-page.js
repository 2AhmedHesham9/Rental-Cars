// Cars page functionality
class CarsPage {
    constructor() {
        this.cars = [];
        this.filteredCars = [];
        this.currentFilters = {
            category: '',
            price: '',
            search: ''
        };
        
        this.init();
    }
    
    init() {
        this.loadCars();
        this.setupEventListeners();
        this.renderCars();
    }
    
    loadCars() {
        if (typeof window.carsData !== 'undefined') {
            this.cars = window.carsData;
            this.filteredCars = [...this.cars];
        }
    }
    
    setupEventListeners() {
        // Filter controls
        const categoryFilter = document.getElementById('category-filter');
        const priceFilter = document.getElementById('price-filter');
        const searchInput = document.getElementById('search-input');
        const clearFiltersBtn = document.getElementById('clear-filters');
        
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.currentFilters.category = e.target.value;
                this.applyFilters();
            });
        }
        
        if (priceFilter) {
            priceFilter.addEventListener('change', (e) => {
                this.currentFilters.price = e.target.value;
                this.applyFilters();
            });
        }
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.currentFilters.search = e.target.value;
                this.applyFilters();
            });
        }
        
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => {
                this.clearFilters();
            });
        }
        
        // Modal controls
        const modal = document.getElementById('car-modal');
        const closeBtn = document.querySelector('.close');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeModal();
            });
        }
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }
        
        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }
    
    applyFilters() {
        this.filteredCars = this.cars.filter(car => {
            // Category filter
            if (this.currentFilters.category && !car.id.startsWith(this.currentFilters.category + '-')) {
                return false;
            }
            
            // Price filter
            if (this.currentFilters.price) {
                const priceRange = this.currentFilters.price;
                if (priceRange === '0-100000' && car.price >= 100000) return false;
                if (priceRange === '100000-200000' && (car.price < 100000 || car.price > 200000)) return false;
                if (priceRange === '200000-300000' && (car.price < 200000 || car.price > 300000)) return false;
                if (priceRange === '300000+' && car.price < 300000) return false;
            }
            
            // Search filter
            if (this.currentFilters.search) {
                const searchTerm = this.currentFilters.search.toLowerCase();
                const searchableText = `${car.make} ${car.model} ${car.color} ${car.description}`.toLowerCase();
                if (!searchableText.includes(searchTerm)) return false;
            }
            
            return true;
        });
        
        this.renderCars();
    }
    
    clearFilters() {
        this.currentFilters = {
            category: '',
            price: '',
            search: ''
        };
        
        // Reset form controls
        const categoryFilter = document.getElementById('category-filter');
        const priceFilter = document.getElementById('price-filter');
        const searchInput = document.getElementById('search-input');
        
        if (categoryFilter) categoryFilter.value = '';
        if (priceFilter) priceFilter.value = '';
        if (searchInput) searchInput.value = '';
        
        this.filteredCars = [...this.cars];
        this.renderCars();
    }
    
    renderCars() {
        const carsGrid = document.getElementById('cars-grid');
        const noCarsMessage = document.getElementById('no-cars-message');
        
        if (!carsGrid) return;
        
        if (this.filteredCars.length === 0) {
            carsGrid.innerHTML = '';
            if (noCarsMessage) {
                noCarsMessage.style.display = 'block';
            }
            return;
        }
        
        if (noCarsMessage) {
            noCarsMessage.style.display = 'none';
        }
        
        carsGrid.innerHTML = this.filteredCars.map(car => this.createCarCard(car)).join('');
        
        // Add event listeners to car cards
        this.addCarCardListeners();
    }
    
    createCarCard(car) {
        const category = this.getCategoryName(car.id);
        const imageUrl = car.image_url && car.image_url.length > 0 ? car.image_url[0] : 'https://d.newsweek.com/en/full/2442045/2024-hyundai-elantra.webp?w=790&f=3e2d6df670f6c0f0186d751ae1823746';
        
        return `
            <div class="car-card" data-car-id="${car.id}">
                <img src="${imageUrl}" alt="${car.make} ${car.model}" class="car-image" onerror="this.src='https://d.newsweek.com/en/full/2442045/2024-hyundai-elantra.webp?w=790&f=3e2d6df670f6c0f0186d751ae1823746'">
                <div class="car-info">
                    <h3 class="car-title">${car.make} ${car.model} ${car.year}</h3>
                    <div class="car-details">
                        <div><strong>الفئة:</strong> ${category}</div>
                        <div><strong>اللون:</strong> ${car.color}</div>
                        <div><strong>الممشى:</strong> ${car.mileage.toLocaleString('ar-SA')} كم</div>
                        <div><strong>ناقل الحركة:</strong> ${car.transmission}</div>
                        <div><strong>نوع الوقود:</strong> ${car.fuel_type}</div>
                        <div><strong>السنة:</strong> ${car.year}</div>
                    </div>
                    <div class="car-price">${car.price.toLocaleString('ar-SA')} ريال</div>
                    <div class="car-actions">
                        <button class="btn-view" onclick="carsPage.viewCar('${car.id}')">عرض التفاصيل</button>
                        <button class="btn-buy" onclick="carsPage.buyCar('${car.id}')">شراء</button>
                    </div>
                </div>
            </div>
        `;
    }
    
    getCategoryName(carId) {
        if (carId.startsWith('luxury-')) return 'فاخرة';
        if (carId.startsWith('classic-')) return 'كلاسيكية';
        if (carId.startsWith('sport-')) return 'رياضية';
        if (carId.startsWith('family-')) return 'عائلية';
        return 'عامة';
    }
    
    addCarCardListeners() {
        const carCards = document.querySelectorAll('.car-card');
        carCards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Don't trigger if clicking on buttons
                if (e.target.tagName === 'BUTTON') return;
                
                const carId = card.dataset.carId;
                this.viewCar(carId);
            });
        });
    }
    
    viewCar(carId) {
        const car = this.cars.find(c => c.id === carId);
        if (!car) return;
        
        const modal = document.getElementById('car-modal');
        const modalBody = document.getElementById('modal-body');
        
        if (!modal || !modalBody) return;
        
        const imageUrl = car.image_url && car.image_url.length > 0 ? car.image_url[0] : 'https://d.newsweek.com/en/full/2442045/2024-hyundai-elantra.webp?w=790&f=3e2d6df670f6c0f0186d751ae1823746';
        const category = this.getCategoryName(car.id);
        
        modalBody.innerHTML = `
            <div class="car-detail-content">
                <img src="${imageUrl}" alt="${car.make} ${car.model}" class="car-detail-image" onerror="this.src='https://d.newsweek.com/en/full/2442045/2024-hyundai-elantra.webp?w=790&f=3e2d6df670f6c0f0186d751ae1823746'">
                <h2 class="car-detail-title">${car.make} ${car.model} ${car.year}</h2>
                <p class="car-detail-description">${car.description}</p>
                <div class="car-detail-info">
                    <div class="detail-item">
                        <span class="detail-label">الماركة:</span>
                        <span class="detail-value">${car.make}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">الموديل:</span>
                        <span class="detail-value">${car.model}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">السنة:</span>
                        <span class="detail-value">${car.year}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">السعر:</span>
                        <span class="detail-value price-highlight">${car.price.toLocaleString('ar-SA')} ريال</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">اللون:</span>
                        <span class="detail-value">${car.color}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">الممشى:</span>
                        <span class="detail-value">${car.mileage.toLocaleString('ar-SA')} كم</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">ناقل الحركة:</span>
                        <span class="detail-value">${car.transmission}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">نوع الوقود:</span>
                        <span class="detail-value">${car.fuel_type}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">الفئة:</span>
                        <span class="detail-value">${category}</span>
                    </div>
                </div>
                <div class="car-detail-actions">
                    <button class="btn btn-success" onclick="carsPage.buyCar('${car.id}')">شراء السيارة</button>
                    <button class="btn btn-secondary" onclick="carsPage.closeModal()">إغلاق</button>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
    }
    
    buyCar(carId) {
        const car = this.cars.find(c => c.id === carId);
        if (!car) return;
        
        // Check if it's a predefined car
        if (car.id.startsWith('luxury-') || car.id.startsWith('classic-') || 
            car.id.startsWith('sport-') || car.id.startsWith('family-')) {
            // Show alert for predefined cars
            alert(`سيارة ${car.make} ${car.model} ${car.year}\nالسعر: ${car.price.toLocaleString('ar-SA')} ريال\n\nهذه السيارة متاحة للشراء. يرجى التواصل مع المعرض لإتمام عملية الشراء.\n\nرقم الهاتف: +966 XX XXX XXXX\nالبريد الإلكتروني: info@showroom.com`);
        } else {
            // For database cars, redirect to details page
            window.location.href = `cars-details.html?id=${carId}`;
        }
    }
    
    closeModal() {
        const modal = document.getElementById('car-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }
}

// Initialize cars page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.carsPage = new CarsPage();
});

// Add CSS for car detail modal
const style = document.createElement('style');
style.textContent = `
    .car-detail-content {
        text-align: center;
    }
    
    .car-detail-title {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 16px;
        color: #1f2937;
    }
    
    .car-detail-description {
        font-size: 1.125rem;
        color: #6b7280;
        margin-bottom: 24px;
    }
    
    .price-highlight {
        color: #16a34a !important;
        font-weight: 700;
        font-size: 1.25rem;
    }
    
    .car-detail-actions {
        display: flex;
        gap: 16px;
        justify-content: center;
        margin-top: 24px;
    }
`;
document.head.appendChild(style);
