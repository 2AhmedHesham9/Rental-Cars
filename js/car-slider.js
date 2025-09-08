// Car Image Slider functionality
class CarSlider {
    constructor() {
        this.images = [
            "/images/slider/photo-1552519507-da3b142c6e3d.webp",
            "/images/slider/mercedes-gle.jpeg",
            "/images/slider/lucury-4.jpg",
            "/images/slider/lucury-3.jpg",
            "/images/slider/lucury-2.jpg",
            "/images/slider/lucury-1.jpg",
            "/images/slider/lexus-rx-350.jpg",
            "/images/slider/bmw-5series.jpeg",
            "/images/slider/classic-1.jpg",
            "/images/slider/audi-q7.webp",
            "/images/slider/audi-q7.jpeg",
            "/images/slider/Picture5.png",
            "/images/slider/Picture4.png",
            "/images/slider/Picture2.jpg",
            "/images/slider/Picture1.png",
            "/images/slider/GoVVLqqXMAAURyo.jpg",
            "/images/slider/F3zfbefWUAAi1AK.jpg",
            "/images/slider/F3zfbelXsAUWoIc.jpg",
            "/images/slider/DBqBHHvWAAQukuZ.jpg",
            "/images/slider/F3zfbeeW8AAGHTk.jpg",
            "/images/slider/DBqBHHmW0AA1JQZ.jpg",
            "/images/slider/1970 Plum Crazy Dodge Dart Swinger.jpg"
        ];
        
        this.currentIndex = 0;
        this.interval = null;
        this.sliderImage = null;
        this.sliderDots = null;
        
        this.init();
    }
    
    init() {
        this.sliderImage = document.getElementById('slider-image');
        this.sliderDots = document.getElementById('slider-dots');
        
        if (!this.sliderImage || !this.sliderDots) {
            console.warn('Slider elements not found');
            return;
        }
        
        this.createDots();
        this.startAutoSlide();
        this.addEventListeners();
    }
    
    createDots() {
        this.sliderDots.innerHTML = '';
        
        this.images.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = `dot ${index === this.currentIndex ? 'active' : ''}`;
            dot.addEventListener('click', () => this.goToSlide(index));
            this.sliderDots.appendChild(dot);
        });
    }
    
    startAutoSlide() {
        if (this.images.length === 0) return;
        
        this.interval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    stopAutoSlide() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
    
    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateSlide();
    }
    
    prevSlide() {
        this.currentIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
        this.updateSlide();
    }
    
    goToSlide(index) {
        if (index >= 0 && index < this.images.length) {
            this.currentIndex = index;
            this.updateSlide();
        }
    }
    
    updateSlide() {
        if (!this.sliderImage) return;
        
        // Update image
        this.sliderImage.src = this.images[this.currentIndex];
        this.sliderImage.alt = `صورة سيارة رقم ${this.currentIndex + 1}`;
        
        // Update dots
        const dots = this.sliderDots.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    addEventListeners() {
        // Pause auto-slide on hover
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => {
                this.stopAutoSlide();
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
                this.startAutoSlide();
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
        
        // Touch/swipe support for mobile
        this.addTouchSupport();
    }
    
    addTouchSupport() {
        const sliderContainer = document.querySelector('.slider-container');
        if (!sliderContainer) return;
        
        let startX = 0;
        let endX = 0;
        
        sliderContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        sliderContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
        });
    }
    
    handleSwipe(startX, endX) {
        const threshold = 50; // Minimum swipe distance
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Swipe left - next slide
                this.nextSlide();
            } else {
                // Swipe right - previous slide
                this.prevSlide();
            }
        }
    }
    
    // Public methods
    destroy() {
        this.stopAutoSlide();
        // Remove event listeners if needed
    }
    
    addImage(imagePath) {
        this.images.push(imagePath);
        this.createDots();
    }
    
    removeImage(index) {
        if (index >= 0 && index < this.images.length) {
            this.images.splice(index, 1);
            if (this.currentIndex >= this.images.length) {
                this.currentIndex = 0;
            }
            this.createDots();
            this.updateSlide();
        }
    }
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.carSlider = new CarSlider();
});

// Export for use in other scripts
window.CarSlider = CarSlider;
