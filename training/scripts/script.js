// Healthcare Training & Certification Portal JavaScript

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    setupMobileMenu();
    setupScrollEffects();
    setupTestimonialCarousel();
    setupSmoothScrolling();
    setupCardAnimations();
    setupFAQAccordion();
    setupScrollAnimations();
    initializeCourseSearcher();
    initializePricingToggle();
    initializeCountryTabs();
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on links
        const navLinkItems = navLinks.querySelectorAll('a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }
}

// Scroll Effects for Header
function setupScrollEffects() {
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// Testimonial Carousel
let currentTestimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial');
const indicators = document.querySelectorAll('.indicator');

function setupTestimonialCarousel() {
    if (testimonials.length > 0) {
        // Auto-rotate testimonials
        setInterval(nextTestimonial, 6000);
        
        // Initialize first testimonial
        showTestimonial(0);
    }
}

function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    // Remove active class from all indicators
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
    });
    
    // Show current testimonial
    if (testimonials[index]) {
        testimonials[index].classList.add('active');
    }
    
    // Activate current indicator
    if (indicators[index]) {
        indicators[index].classList.add('active');
    }
    
    currentTestimonialIndex = index;
}

function nextTestimonial() {
    const nextIndex = (currentTestimonialIndex + 1) % testimonials.length;
    showTestimonial(nextIndex);
}

function previousTestimonial() {
    const prevIndex = currentTestimonialIndex === 0 ? testimonials.length - 1 : currentTestimonialIndex - 1;
    showTestimonial(prevIndex);
}

function currentTestimonial(index) {
    showTestimonial(index - 1); // Convert to 0-based index
}

// Make functions globally available
window.nextTestimonial = nextTestimonial;
window.previousTestimonial = previousTestimonial;
window.currentTestimonial = currentTestimonial;

// Smooth Scrolling
function setupSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Card Animations
function setupCardAnimations() {
    const cards = document.querySelectorAll('.edge-card, .overview-card, .highlight-item, .testimonial-card, .plan-card, .course-card, .alumni-card');
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Initialize cards with fade-in state
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// FAQ Accordion
function setupFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                    const faqAnswer = faqItem.querySelector('.faq-answer');
                    if (faqAnswer) {
                        faqAnswer.style.maxHeight = '0';
                    }
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        }
    });
}

// Global FAQ Toggle Function
function toggleFAQ(button) {
    const faqItem = button.closest('.faq-item');
    const answer = faqItem.querySelector('.faq-answer');
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        const itemAnswer = item.querySelector('.faq-answer');
        if (itemAnswer) {
            itemAnswer.style.maxHeight = '0';
        }
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
    }
}

// Make toggleFAQ globally available
window.toggleFAQ = toggleFAQ;

// Scroll Animations
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.section-header, .hero-content, .program-highlights, .feature-highlights');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Course Searcher Functionality
let allCourses = [];
let filteredCourses = [];

function initializeCourseSearcher() {
    // Generate sample course data
    generateCourseData();
    
    // Initial render
    renderCourses();
}

function generateCourseData() {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('nurse-edge')) {
        allCourses = generateNurseCourses();
    } else if (currentPage.includes('doc-edge')) {
        allCourses = generateDocCourses();
    } else if (currentPage.includes('allied-edge')) {
        allCourses = generateAlliedCourses();
    }
    
    filteredCourses = [...allCourses];
}

function generateNurseCourses() {
    return [
        {
            id: 1,
            title: "UK Nursing Certification",
            country: "uk",
            specialty: "general",
            experience: "fresh-graduate",
            duration: "6-months",
            price: 2499,
            description: "Complete OSCE preparation and NMC registration support for UK nursing practice.",
            successRate: 96,
            popularity: 95
        },
        {
            id: 2,
            title: "Germany Nursing Program",
            country: "germany",
            specialty: "icu",
            experience: "1-3-years",
            duration: "12-months",
            price: 2799,
            description: "German language training and Anerkennung process for nursing in Germany.",
            successRate: 94,
            popularity: 88
        },
        {
            id: 3,
            title: "Canada RN Certification",
            country: "canada",
            specialty: "emergency",
            experience: "3-5-years",
            duration: "6-months",
            price: 2299,
            description: "NCLEX-RN preparation and provincial registration for Canadian nursing practice.",
            successRate: 92,
            popularity: 90
        },
        {
            id: 4,
            title: "Australia AHPRA Registration",
            country: "australia",
            specialty: "pediatric",
            experience: "1-3-years",
            duration: "3-months",
            price: 1999,
            description: "Skills assessment and AHPRA registration for nursing in Australia.",
            successRate: 95,
            popularity: 87
        },
        {
            id: 5,
            title: "USA NCLEX-RN Program",
            country: "usa",
            specialty: "mental-health",
            experience: "fresh-graduate",
            duration: "6-months",
            price: 2199,
            description: "Comprehensive NCLEX-RN preparation and state licensing support.",
            successRate: 89,
            popularity: 85
        },
        {
            id: 6,
            title: "New Zealand Nursing",
            country: "new-zealand",
            specialty: "surgical",
            experience: "5-plus-years",
            duration: "3-months",
            price: 1899,
            description: "NCNZ registration and competency assessment for New Zealand nursing.",
            successRate: 93,
            popularity: 82
        }
    ];
}

function generateDocCourses() {
    return [
        {
            id: 1,
            title: "UK PLAB Certification",
            country: "uk",
            specialty: "internal-medicine",
            experience: "resident",
            examType: "plab",
            price: 4999,
            description: "Complete PLAB 1 & 2 preparation with GMC registration support.",
            successRate: 92,
            popularity: 95
        },
        {
            id: 2,
            title: "USA USMLE Program",
            country: "usa",
            specialty: "surgery",
            experience: "specialist",
            examType: "usmle",
            price: 6999,
            description: "USMLE Step 1, 2 & 3 preparation with residency match support.",
            successRate: 89,
            popularity: 93
        },
        {
            id: 3,
            title: "Canada Medical Licensing",
            country: "canada",
            specialty: "pediatrics",
            experience: "fresh-graduate",
            examType: "licensing",
            price: 3999,
            description: "MCCEE and NAC-OSCE preparation for Canadian medical practice.",
            successRate: 87,
            popularity: 88
        },
        {
            id: 4,
            title: "Australia AMC Pathway",
            country: "australia",
            specialty: "cardiology",
            experience: "consultant",
            examType: "licensing",
            price: 4499,
            description: "AMC CAT and clinical examination preparation for Australian practice.",
            successRate: 91,
            popularity: 86
        },
        {
            id: 5,
            title: "Germany Medical License",
            country: "germany",
            specialty: "emergency",
            experience: "resident",
            examType: "licensing",
            price: 5499,
            description: "Approbation process and Fachsprachenprüfung for German medical practice.",
            successRate: 88,
            popularity: 84
        },
        {
            id: 6,
            title: "NHS Fellowship Program",
            country: "uk",
            specialty: "radiology",
            experience: "specialist",
            examType: "fellowship",
            price: 7999,
            description: "Exclusive NHS fellowship application support and placement assistance.",
            successRate: 85,
            popularity: 90
        }
    ];
}

function generateAlliedCourses() {
    return [
        {
            id: 1,
            title: "UK Physiotherapy Registration",
            country: "uk",
            profession: "physiotherapy",
            experience: "1-3-years",
            certification: "licensing",
            price: 1999,
            description: "HCPC registration and skills assessment for UK physiotherapy practice.",
            successRate: 94,
            popularity: 92
        },
        {
            id: 2,
            title: "Canada OT Certification",
            country: "canada",
            profession: "occupational-therapy",
            experience: "3-5-years",
            certification: "skills-assessment",
            price: 2299,
            description: "CAOT credential recognition and provincial registration support.",
            successRate: 91,
            popularity: 89
        },
        {
            id: 3,
            title: "Australia Radiography License",
            country: "australia",
            profession: "radiography",
            experience: "fresh-graduate",
            certification: "licensing",
            price: 1799,
            description: "AHPRA registration and skills assessment for Australian radiography.",
            successRate: 96,
            popularity: 87
        },
        {
            id: 4,
            title: "Germany Lab Technology",
            country: "germany",
            profession: "laboratory",
            experience: "5-plus-years",
            certification: "bridging",
            price: 2199,
            description: "Professional recognition and bridging program for German lab practice.",
            successRate: 89,
            popularity: 85
        },
        {
            id: 5,
            title: "New Zealand Speech Therapy",
            country: "new-zealand",
            profession: "speech-therapy",
            experience: "1-3-years",
            certification: "licensing",
            price: 2099,
            description: "NZSTA registration and competency assessment for speech therapy practice.",
            successRate: 93,
            popularity: 83
        },
        {
            id: 6,
            title: "USA Pharmacy Certification",
            country: "usa",
            profession: "pharmacy",
            experience: "specialist",
            certification: "licensing",
            price: 3499,
            description: "FPGEC certification and NAPLEX preparation for US pharmacy practice.",
            successRate: 88,
            popularity: 86
        }
    ];
}

function filterCourses() {
    const countryFilter = document.getElementById('country-filter')?.value || '';
    const experienceFilter = document.getElementById('experience-filter')?.value || '';
    const specialtyFilter = document.getElementById('specialty-filter')?.value || '';
    const durationFilter = document.getElementById('duration-filter')?.value || '';
    const examTypeFilter = document.getElementById('exam-type-filter')?.value || '';
    const professionFilter = document.getElementById('profession-filter')?.value || '';
    const certificationFilter = document.getElementById('certification-filter')?.value || '';
    
    filteredCourses = allCourses.filter(course => {
        return (!countryFilter || course.country === countryFilter) &&
               (!experienceFilter || course.experience === experienceFilter) &&
               (!specialtyFilter || course.specialty === specialtyFilter) &&
               (!durationFilter || course.duration === durationFilter) &&
               (!examTypeFilter || course.examType === examTypeFilter) &&
               (!professionFilter || course.profession === professionFilter) &&
               (!certificationFilter || course.certification === certificationFilter);
    });
    
    renderCourses();
}

function clearFilters() {
    // Reset all filter dropdowns
    const filters = ['country-filter', 'experience-filter', 'specialty-filter', 'duration-filter', 'exam-type-filter', 'profession-filter', 'certification-filter'];
    filters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.value = '';
        }
    });
    
    // Reset filtered courses
    filteredCourses = [...allCourses];
    renderCourses();
}

function sortCourses() {
    const sortBy = document.getElementById('sort-by')?.value || 'popularity';
    
    filteredCourses.sort((a, b) => {
        switch (sortBy) {
            case 'price':
                return a.price - b.price;
            case 'duration':
                const durationOrder = {'3-months': 1, '6-months': 2, '12-months': 3, '18-months': 4};
                return (durationOrder[a.duration] || 5) - (durationOrder[b.duration] || 5);
            case 'success-rate':
                return b.successRate - a.successRate;
            case 'popularity':
            default:
                return b.popularity - a.popularity;
        }
    });
    
    renderCourses();
}

function renderCourses() {
    const coursesGrid = document.getElementById('courses-grid');
    const resultsCount = document.getElementById('results-count');
    
    if (!coursesGrid) return;
    
    // Update results count
    if (resultsCount) {
        resultsCount.textContent = `${filteredCourses.length} pathways found`;
    }
    
    // Clear existing courses
    coursesGrid.innerHTML = '';
    
    // Render filtered courses
    filteredCourses.forEach(course => {
        const courseCard = createCourseCard(course);
        coursesGrid.appendChild(courseCard);
    });
}

function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'course-card';
    
    const countryFlags = {
        'uk': '🇬🇧',
        'germany': '🇩🇪',
        'canada': '🇨🇦',
        'australia': '🇦🇺',
        'usa': '🇺🇸',
        'new-zealand': '🇳🇿',
        'ireland': '🇮🇪',
        'netherlands': '🇳🇱',
        'singapore': '🇸🇬',
        'uae': '🇦🇪'
    };
    
    card.innerHTML = `
        <div class="course-header">
            <div>
                <h4 class="course-title">${course.title}</h4>
                <div class="course-country">${countryFlags[course.country] || '🌍'} ${course.country.replace('-', ' ').toUpperCase()}</div>
            </div>
            <div class="course-badge">${course.successRate}% Success</div>
        </div>
        <div class="course-details">
            <p class="course-description">${course.description}</p>
            <div class="course-meta">
                <div class="meta-item">
                    <i class="fas fa-clock"></i>
                    <span>${course.duration?.replace('-', ' ') || 'Flexible'}</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-user"></i>
                    <span>${course.experience?.replace('-', ' ') || 'All levels'}</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-star"></i>
                    <span>${course.popularity}% Popular</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-certificate"></i>
                    <span>${course.specialty || course.profession || course.examType || 'General'}</span>
                </div>
            </div>
        </div>
        <div class="course-price">
            <div class="price">$${course.price.toLocaleString()}</div>
            <button class="view-details-btn" onclick="viewCourseDetails(${course.id})">View Details</button>
        </div>
    `;
    
    return card;
}

function viewCourseDetails(courseId) {
    // Find the course
    const course = allCourses.find(c => c.id === courseId);
    if (!course) return;
    
    // Show course details (you can implement a modal or redirect to a details page)
    alert(`Course Details:\n\nTitle: ${course.title}\nPrice: $${course.price.toLocaleString()}\nSuccess Rate: ${course.successRate}%\n\nDescription: ${course.description}`);
}

// Make filter functions globally available
window.filterCourses = filterCourses;
window.clearFilters = clearFilters;
window.sortCourses = sortCourses;
window.viewCourseDetails = viewCourseDetails;

// Pricing Toggle Functionality
function initializePricingToggle() {
    const toggle = document.getElementById('pricing-toggle');
    if (toggle) {
        toggle.addEventListener('change', togglePricing);
    }
}

function togglePricing() {
    const toggle = document.getElementById('pricing-toggle');
    const monthlyPrices = document.querySelectorAll('.monthly-price');
    const annualPrices = document.querySelectorAll('.annual-price');
    const monthlyPeriods = document.querySelectorAll('.monthly-period');
    const annualPeriods = document.querySelectorAll('.annual-period');
    
    if (toggle && toggle.checked) {
        // Show annual pricing
        monthlyPrices.forEach(price => price.style.display = 'none');
        annualPrices.forEach(price => price.style.display = 'inline');
        monthlyPeriods.forEach(period => period.style.display = 'none');
        annualPeriods.forEach(period => period.style.display = 'inline');
    } else {
        // Show monthly pricing
        monthlyPrices.forEach(price => price.style.display = 'inline');
        annualPrices.forEach(price => price.style.display = 'none');
        monthlyPeriods.forEach(period => period.style.display = 'inline');
        annualPeriods.forEach(period => period.style.display = 'none');
    }
}

// Make togglePricing globally available
window.togglePricing = togglePricing;

// Country Tabs Functionality
function initializeCountryTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    if (tabs.length > 0) {
        // Show first tab by default
        showCountryPricing('uk');
    }
}

function showCountryPricing(country) {
    // Hide all country pricing sections
    const allPricing = document.querySelectorAll('.country-pricing');
    allPricing.forEach(pricing => {
        pricing.classList.remove('active');
    });
    
    // Remove active class from all tabs
    const allTabs = document.querySelectorAll('.tab-btn');
    allTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected country pricing
    const selectedPricing = document.getElementById(`${country}-pricing`);
    if (selectedPricing) {
        selectedPricing.classList.add('active');
    }
    
    // Activate selected tab
    const selectedTab = document.querySelector(`[onclick="showCountryPricing('${country}')"]`);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
}

// Make showCountryPricing globally available
window.showCountryPricing = showCountryPricing;

// Navigation Functions
function navigateToPage(url) {
    // Add loading state
    const button = event.target.closest('button');
    if (button) {
        const originalText = button.innerHTML;
        
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        button.disabled = true;
        
        // Simulate loading delay for better UX
        setTimeout(() => {
            window.location.href = url;
        }, 500);
    } else {
        window.location.href = url;
    }
}

// Scroll to Programs Section
function scrollToPrograms() {
    const programsSection = document.querySelector('#programs');
    if (programsSection) {
        programsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    } else {
        // If on a different page, navigate to home with programs hash
        window.location.href = 'index.html#programs';
    }
}

// Scroll to Testimonials Section
function scrollToTestimonials() {
    const testimonialsSection = document.querySelector('#testimonials');
    if (testimonialsSection) {
        testimonialsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    } else {
        // If on a different page, navigate to home with testimonials hash
        window.location.href = 'index.html#testimonials';
    }
}

// Make scroll functions globally available
window.navigateToPage = navigateToPage;
window.scrollToPrograms = scrollToPrograms;
window.scrollToTestimonials = scrollToTestimonials;

// Form Handling (for future contact forms)
function handleFormSubmission(formElement) {
    formElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(formElement);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitButton = formElement.querySelector('button[type="submit"]');
        if (submitButton) {
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                showNotification('Message sent successfully!', 'success');
                
                // Reset form
                formElement.reset();
                
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        margin-left: auto;
    }
`;
document.head.appendChild(notificationStyles);

// Utility Functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Analytics and Tracking (placeholder for future implementation)
function trackEvent(eventName, eventData = {}) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, eventData);
    
    // Example: Google Analytics 4
    // gtag('event', eventName, eventData);
    
    // Example: Custom analytics
    // analytics.track(eventName, eventData);
}

// Performance Monitoring
function measurePerformance() {
    // Measure page load time
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            
            trackEvent('page_load_time', {
                load_time: pageLoadTime,
                page: window.location.pathname
            });
        }, 0);
    });
}

// Initialize performance monitoring
measurePerformance();

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    
    // Track errors (in production, you might want to send to an error tracking service)
    trackEvent('javascript_error', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno
    });
});

// Service Worker Registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => {
        //         console.log('SW registered: ', registration);
        //     })
        //     .catch(registrationError => {
        //         console.log('SW registration failed: ', registrationError);
        //     });
    });
}

// Accessibility Enhancements
function enhanceAccessibility() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #14b8a6;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Enhance focus management
    document.addEventListener('keydown', function(e) {
        // ESC key handling
        if (e.key === 'Escape') {
            // Close any open modals or menus
            const activeElements = document.querySelectorAll('.active');
            activeElements.forEach(element => {
                if (element.classList.contains('nav-links') || element.classList.contains('mobile-menu-toggle')) {
                    element.classList.remove('active');
                }
            });
            
            // Close any open FAQ items
            const activeFAQs = document.querySelectorAll('.faq-item.active');
            activeFAQs.forEach(faq => {
                faq.classList.remove('active');
                const answer = faq.querySelector('.faq-answer');
                if (answer) {
                    answer.style.maxHeight = '0';
                }
            });
        }
    });
}

// Initialize accessibility enhancements
enhanceAccessibility();

// Lazy Loading for Images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
setupLazyLoading();

// Preload Critical Resources
function preloadCriticalResources() {
    // Preload critical CSS
    const criticalCSS = document.createElement('link');
    criticalCSS.rel = 'preload';
    criticalCSS.as = 'style';
    criticalCSS.href = 'style.css';
    document.head.appendChild(criticalCSS);
    
    // Preload important images
    const heroImages = [
        'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg',
        'https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg',
        'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg'
    ];
    
    heroImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadCriticalResources();

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        navigateToPage,
        scrollToPrograms,
        scrollToTestimonials,
        showNotification,
        debounce,
        throttle,
        trackEvent,
        toggleFAQ,
        filterCourses,
        clearFilters,
        sortCourses,
        togglePricing,
        showCountryPricing
    };
}