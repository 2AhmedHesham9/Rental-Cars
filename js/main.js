// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    // Load cars data
    loadCarsData();
    
    // Initialize any other components
    console.log('Car Finance System initialized');
}

// Cars data management
let carsData = [];

function loadCarsData() {
    // This will be populated by cars-data.js
    if (typeof window.carsData !== 'undefined') {
        carsData = window.carsData;
        renderCarsTable();
    }
}

function renderCarsTable() {
    const tbody = document.getElementById('cars-tbody');
    if (!tbody) return;
    
    if (carsData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" class="no-cars">لا توجد سيارات متاحة للشراء حالياً</td></tr>';
        return;
    }
    
    tbody.innerHTML = carsData.map(car => `
        <tr>
            <td>${car.make}</td>
            <td>${car.model}</td>
            <td>${car.year}</td>
            <td class="price">${car.price.toLocaleString('ar-SA')} ريال</td>
            <td>${car.color}</td>
            <td>${car.mileage.toLocaleString('ar-SA')} كم</td>
            <td>${car.transmission}</td>
            <td>${car.fuel_type}</td>
            <td>
                <button 
                    class="purchase-btn" 
                    onclick="handlePurchase('${car.id}')"
                    data-car-id="${car.id}"
                >
                    🛒 شراء
                </button>
            </td>
        </tr>
    `).join('');
}

function handlePurchase(carId) {
    const button = document.querySelector(`[data-car-id="${carId}"]`);
    if (!button) return;
    
    // Disable button and show loading state
    button.disabled = true;
    button.textContent = '... جاري الشراء';
    
    // Find the car data
    const car = carsData.find(c => c.id === carId);
    if (!car) {
        console.error('Car not found:', carId);
        resetButton(button);
        return;
    }
    
    // Simulate processing delay
    setTimeout(() => {
        // Check if it's a predefined car (luxury, classic, sport, family)
        if (car.id.startsWith('luxury-') || car.id.startsWith('classic-') || 
            car.id.startsWith('sport-') || car.id.startsWith('family-')) {
            // Show alert for predefined cars
            alert(`سيارة ${car.make} ${car.model} ${car.year}\nالسعر: ${car.price.toLocaleString('ar-SA')} ريال\n\nهذه السيارة متاحة للشراء. يرجى التواصل مع المعرض لإتمام عملية الشراء.`);
        } else {
            // Redirect to car details page for database cars
            window.location.href = `cars-details.html?id=${carId}`;
        }
        
        resetButton(button);
    }, 1000);
}

function resetButton(button) {
    button.disabled = false;
    button.textContent = '🛒 شراء';
}

// Utility functions
function formatPrice(price) {
    return price.toLocaleString('ar-SA') + ' ريال';
}

function formatMileage(mileage) {
    return mileage.toLocaleString('ar-SA') + ' كم';
}

// Error handling
function showError(message) {
    console.error('Error:', message);
    // You can implement a toast notification system here
}

function showSuccess(message) {
    console.log('Success:', message);
    // You can implement a toast notification system here
}

// Navigation helpers
function navigateToPage(page) {
    window.location.href = page;
}

// Form validation helpers
function validateForm(formData) {
    const errors = [];
    
    // Add validation logic here
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// Local storage helpers
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

function loadFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return null;
    }
}

// Export functions for use in other scripts
window.CarFinanceApp = {
    loadCarsData,
    renderCarsTable,
    handlePurchase,
    formatPrice,
    formatMileage,
    showError,
    showSuccess,
    navigateToPage,
    validateForm,
    saveToLocalStorage,
    loadFromLocalStorage
};
