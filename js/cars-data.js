// Cars data - replaces Supabase data
window.carsData = [
    // الصف الأول - سيارات فاخرة
    {
        id: 'luxury-1',
        make: 'مرسيدس',
        model: 'GLE',
        year: 2020,
        price: 280000,
        image_url: ['/images/cars/mercedes-gle.jpeg'],
        color: 'أبيض',
        mileage: 45000,
        fuel_type: 'بنزين',
        transmission: 'أوتوماتيك',
        description: 'سيارة فاخرة بحالة ممتازة'
    },
    {
        id: 'luxury-2',
        make: 'BMW',
        model: '5 Series',
        year: 2019,
        price: 265000,
        image_url: ['/images/cars/bmw-5series.jpeg'],
        color: 'أسود',
        mileage: 52000,
        fuel_type: 'بنزين',
        transmission: 'أوتوماتيك',
        description: 'سيارة رياضية أنيقة'
    },
    {
        id: 'luxury-3',
        make: 'أودي',
        model: 'Q7',
        year: 2021,
        price: 295000,
        image_url: ['/images/cars/audi-q7.webp'],
        color: 'رمادي',
        mileage: 38000,
        fuel_type: 'بنزين',
        transmission: 'أوتوماتيك',
        description: 'SUV فاخر ومريح'
    },
    {
        id: 'luxury-4',
        make: 'لكزس',
        model: 'RX 350',
        year: 2020,
        price: 275000,
        image_url: ['/images/cars/lexus-rx-350.jpg'],
        color: 'أبيض',
        mileage: 42000,
        fuel_type: 'بنزين',
        transmission: 'أوتوماتيك',
        description: 'سيارة فاخرة موثوقة'
    },
    {
        id: 'luxury-5',
        make: 'فورد',
        model: 'اكسبدشن',
        year: 2019,
        price: 30000,
        image_url: ['/images/cars/فورد اكسبدشن-1.jpg'],
        color: 'أزرق',
        mileage: 300000,
        fuel_type: 'بنزين',
        transmission: 'أوتوماتيك',
        description: 'SUV كبير وعائلي'
    },
    
    // الصف الثاني - سيارات كلاسيكية
    {
        id: 'classic-1',
        make: 'دودج',
        model: 'Dart Swinger',
        year: 1970,
        price: 220000,
        image_url: ['/images/cars/1970 Plum Crazy Dodge Dart Swinger.jpg'],
        color: 'بنفسجي',
        mileage: 150000,
        fuel_type: 'بنزين',
        transmission: 'يدوي',
        description: 'سيارة كلاسيكية نادرة'
    },
    {
        id: 'classic-2',
        make: 'كلاسيك',
        model: 'Vintage',
        year: 1985,
        price: 235000,
        image_url: ['/images/cars/classic-1.jpg'],
        color: 'أحمر',
        mileage: 89000,
        fuel_type: 'بنزين',
        transmission: 'يدوي',
        description: 'سيارة كلاسيكية محفوظة'
    },
    {
        id: 'classic-3',
        make: 'فورد',
        model: 'كلاسيك',
        year: 1990,
        price: 245000,
        image_url: ['/images/cars/Picture1.png'],
        color: 'أزرق',
        mileage: 120000,
        fuel_type: 'بنزين',
        transmission: 'يدوي',
        description: 'سيارة كلاسيكية أنيقة'
    },
    {
        id: 'classic-4',
        make: 'شيفروليه',
        model: 'كلاسيك',
        year: 1988,
        price: 230000,
        image_url: ['/images/cars/Picture2.jpg'],
        color: 'أصفر',
        mileage: 95000,
        fuel_type: 'بنزين',
        transmission: 'يدوي',
        description: 'سيارة كلاسيكية مميزة'
    },
    {
        id: 'classic-5',
        make: 'بونتياك',
        model: 'كلاسيك',
        year: 1987,
        price: 240000,
        image_url: ['/images/cars/Picture3.png'],
        color: 'أخضر',
        mileage: 110000,
        fuel_type: 'بنزين',
        transmission: 'يدوي',
        description: 'سيارة كلاسيكية فريدة'
    },
    
    // الصف الثالث - سيارات رياضية
    {
        id: 'sport-1',
        make: 'شيفروليه',
        model: 'كامارو',
        year: 2020,
        price: 290000,
        image_url: ['/images/cars/photo-1552519507-da3b142c6e3d.webp'],
        color: 'أزرق',
        mileage: 35000,
        fuel_type: 'بنزين',
        transmission: 'أوتوماتيك',
        description: 'سيارة رياضية قوية'
    },
    {
        id: 'sport-2',
        make: 'فورد',
        model: 'موستانج',
        year: 2019,
        price: 275000,
        image_url: ['/images/cars/GoVVLqqXMAAURyo.jpg'],
        color: 'أحمر',
        mileage: 42000,
        fuel_type: 'بنزين',
        transmission: 'أوتوماتيك',
        description: 'سيارة رياضية أمريكية'
    },
    {
        id: 'sport-3',
        make: 'دودج',
        model: 'تشارجر',
        year: 2021,
        price: 285000,
        image_url: ['/images/cars/F3zfbefWUAAi1AK.jpg'],
        color: 'أسود',
        mileage: 28000,
        fuel_type: 'بنزين',
        transmission: 'أوتوماتيك',
        description: 'سيارة رياضية قوية'
    },
    {
        id: 'sport-4',
        make: 'شيفروليه',
        model: 'كورفيت',
        year: 2020,
        price: 295000,
        image_url: ['/images/cars/F3zfbelXsAUWoIc.jpg'],
        color: 'أصفر',
        mileage: 32000,
        fuel_type: 'بنزين',
        transmission: 'أوتوماتيك',
        description: 'سيارة رياضية خارقة'
    },
    {
        id: 'sport-5',
        make: 'بونتياك',
        model: 'فايربيرد',
        year: 2019,
        price: 265000,
        image_url: ['/images/cars/DBqBHHvWAAQukuZ.jpg'],
        color: 'أبيض',
        mileage: 45000,
        fuel_type: 'بنزين',
        transmission: 'أوتوماتيك',
        description: 'سيارة رياضية كلاسيكية'
    },
    
    // الصف الرابع - سيارات عائلية
    {
        id: 'family-1',
        make: 'فورد',
        model: 'اكسبلورر',
        year: 2020,
        price: 250000,
        image_url: ['/images/cars/F3zfbeeW8AAGHTk.jpg'],
        color: 'رمادي',
        mileage: 38000,
        fuel_type: 'بنزين',
        transmission: 'أوتوماتيك',
        description: 'سيارة عائلية مريحة'
    },
    {
        id: 'family-2',
        make: 'شيفروليه',
        model: 'تاهو',
        year: 2019,
        price: 260000,
        image_url: ['/images/cars/DBqBHHmW0AA1JQZ.jpg'],
        color: 'أزرق',
        mileage: 42000,
        fuel_type: 'بنزين',
        transmission: 'أوتوماتيك',
        description: 'SUV عائلي كبير'
    },
    {
        id: 'family-3',
        make: 'GMC',
        model: 'يوكون',
        year: 2021,
        price: 270000,
        image_url: ['/images/cars/DBqBHH2W0AAtXpd.jpg'],
        color: 'أبيض',
        mileage: 25000,
        fuel_type: 'بنزين',
        transmission: 'أوتوماتيك',
        description: 'سيارة عائلية فاخرة'
    },
    {
        id: 'family-4',
        make: 'جيب',
        model: 'جراند شيروكي',
        year: 2019,
        price: 245000,
        image_url: ['/images/cars/FQ3STh2WQAI5cXF.jpg'],
        color: 'أحمر',
        mileage: 48000,
        fuel_type: 'بنzين',
        transmission: 'أوتوماتيك',
        description: 'سيارة عائلية قوية'
    }
];

// Car data management functions
window.CarDataManager = {
    // Get all cars
    getAllCars: function() {
        return window.carsData;
    },
    
    // Get car by ID
    getCarById: function(id) {
        return window.carsData.find(car => car.id === id);
    },
    
    // Get cars by category
    getCarsByCategory: function(category) {
        return window.carsData.filter(car => car.id.startsWith(category + '-'));
    },
    
    // Get luxury cars
    getLuxuryCars: function() {
        return this.getCarsByCategory('luxury');
    },
    
    // Get classic cars
    getClassicCars: function() {
        return this.getCarsByCategory('classic');
    },
    
    // Get sport cars
    getSportCars: function() {
        return this.getCarsByCategory('sport');
    },
    
    // Get family cars
    getFamilyCars: function() {
        return this.getCarsByCategory('family');
    },
    
    // Search cars
    searchCars: function(query) {
        const lowerQuery = query.toLowerCase();
        return window.carsData.filter(car => 
            car.make.toLowerCase().includes(lowerQuery) ||
            car.model.toLowerCase().includes(lowerQuery) ||
            car.color.toLowerCase().includes(lowerQuery) ||
            car.description.toLowerCase().includes(lowerQuery)
        );
    },
    
    // Filter cars by price range
    filterCarsByPrice: function(minPrice, maxPrice) {
        return window.carsData.filter(car => 
            car.price >= minPrice && car.price <= maxPrice
        );
    },
    
    // Filter cars by year range
    filterCarsByYear: function(minYear, maxYear) {
        return window.carsData.filter(car => 
            car.year >= minYear && car.year <= maxYear
        );
    },
    
    // Add new car
    addCar: function(carData) {
        const newCar = {
            id: 'custom-' + Date.now(),
            ...carData
        };
        window.carsData.push(newCar);
        return newCar;
    },
    
    // Update car
    updateCar: function(id, updates) {
        const index = window.carsData.findIndex(car => car.id === id);
        if (index !== -1) {
            window.carsData[index] = { ...window.carsData[index], ...updates };
            return window.carsData[index];
        }
        return null;
    },
    
    // Delete car
    deleteCar: function(id) {
        const index = window.carsData.findIndex(car => car.id === id);
        if (index !== -1) {
            return window.carsData.splice(index, 1)[0];
        }
        return null;
    }
};

// Initialize cars data when script loads
console.log('Cars data loaded:', window.carsData.length, 'cars');
