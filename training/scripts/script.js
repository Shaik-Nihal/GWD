// Healthcare Training & Certification Portal JavaScript - Enhanced

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
    initializeLearningPath();
    initializeStatsCounter();
    initializeInteractiveFeatures();
    setupParallaxEffects();
    initializeProgressBars();
}

// Enhanced Mobile Menu Toggle
function setupMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close mobile menu when clicking on links
        const navLinkItems = navLinks.querySelectorAll('a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Handle escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Enhanced Scroll Effects for Header
function setupScrollEffects() {
    const header = document.querySelector('.header');
    
    if (header) {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide/show header on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }
}

// Enhanced Testimonial Carousel
let currentTestimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial');
const indicators = document.querySelectorAll('.indicator');
let testimonialInterval;

function setupTestimonialCarousel() {
    if (testimonials.length > 0) {
        // Initialize first testimonial
        showTestimonial(0);
        
        // Auto-rotate testimonials
        startTestimonialAutoplay();
        
        // Pause on hover
        const carousel = document.querySelector('.testimonial-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', stopTestimonialAutoplay);
            carousel.addEventListener('mouseleave', startTestimonialAutoplay);
        }
    }
}

function startTestimonialAutoplay() {
    testimonialInterval = setInterval(nextTestimonial, 6000);
}

function stopTestimonialAutoplay() {
    clearInterval(testimonialInterval);
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
    stopTestimonialAutoplay();
    showTestimonial(index - 1); // Convert to 0-based index
    startTestimonialAutoplay();
}

// Make functions globally available
window.nextTestimonial = nextTestimonial;
window.previousTestimonial = previousTestimonial;
window.currentTestimonial = currentTestimonial;

// Enhanced Smooth Scrolling
function setupSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Enhanced Card Animations with Intersection Observer
function setupCardAnimations() {
    const cards = document.querySelectorAll('.edge-card, .overview-card, .highlight-item, .testimonial-card, .plan-card, .course-card, .alumni-card, .feature-card, .partner-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Initialize cards with fade-in state
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// Enhanced FAQ Accordion with improved functionality
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
                        faqAnswer.style.padding = '0 2rem';
                    }
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 40 + 'px';
                    answer.style.padding = '0 2rem 2rem';
                }
            });
        }
    });
}

// Global FAQ Toggle Function (Fixed)
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
            itemAnswer.style.padding = '0 2rem';
        }
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 40 + 'px';
        answer.style.padding = '0 2rem 2rem';
    }
}

// Make toggleFAQ globally available
window.toggleFAQ = toggleFAQ;

// Enhanced Scroll Animations
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

// Enhanced Course Searcher Functionality
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
            title: "UK Nursing Excellence Program",
            country: "uk",
            specialty: "general",
            experience: "fresh-graduate",
            duration: "6-months",
            price: 2499,
            description: "Comprehensive OSCE preparation and NMC registration support for UK nursing practice with guaranteed placement assistance.",
            successRate: 96,
            popularity: 95,
            features: ["OSCE Training", "NMC Registration", "Job Placement", "Visa Support"]
        },
        {
            id: 2,
            title: "Germany Nursing Mastery",
            country: "germany",
            specialty: "icu",
            experience: "1-3-years",
            duration: "12-months",
            price: 2799,
            description: "German language training and Anerkennung process for nursing in Germany with cultural integration support.",
            successRate: 94,
            popularity: 88,
            features: ["German B2 Level", "Anerkennung Process", "Cultural Training", "Job Placement"]
        },
        {
            id: 3,
            title: "Canada RN Fast Track",
            country: "canada",
            specialty: "emergency",
            experience: "3-5-years",
            duration: "6-months",
            price: 2299,
            description: "NCLEX-RN preparation and provincial registration for Canadian nursing practice with employer connections.",
            successRate: 92,
            popularity: 90,
            features: ["NCLEX-RN Prep", "Provincial Registration", "Employer Connect", "Immigration Support"]
        },
        {
            id: 4,
            title: "Australia AHPRA Pathway",
            country: "australia",
            specialty: "pediatric",
            experience: "1-3-years",
            duration: "3-months",
            price: 1999,
            description: "Skills assessment and AHPRA registration for nursing in Australia with comprehensive support.",
            successRate: 95,
            popularity: 87,
            features: ["Skills Assessment", "AHPRA Registration", "English Test Prep", "Job Placement"]
        },
        {
            id: 5,
            title: "USA NCLEX-RN Elite",
            country: "usa",
            specialty: "mental-health",
            experience: "fresh-graduate",
            duration: "6-months",
            price: 2199,
            description: "Comprehensive NCLEX-RN preparation and state licensing support with guaranteed pass rate.",
            successRate: 89,
            popularity: 85,
            features: ["NCLEX-RN Prep", "State Licensing", "Visa Screen", "Employer Matching"]
        },
        {
            id: 6,
            title: "New Zealand Nursing Gateway",
            country: "new-zealand",
            specialty: "surgical",
            experience: "5-plus-years",
            duration: "3-months",
            price: 1899,
            description: "NCNZ registration and competency assessment for New Zealand nursing with relocation support.",
            successRate: 93,
            popularity: 82,
            features: ["NCNZ Registration", "Competency Assessment", "Relocation Support", "Job Placement"]
        },
        {
            id: 7,
            title: "Ireland Nursing Opportunity",
            country: "ireland",
            specialty: "general",
            experience: "1-3-years",
            duration: "4-months",
            price: 2099,
            description: "NMBI registration and adaptation program for nursing practice in Ireland.",
            successRate: 91,
            popularity: 84,
            features: ["NMBI Registration", "Adaptation Program", "English Test Prep", "Job Placement"]
        },
        {
            id: 8,
            title: "Netherlands Nursing Program",
            country: "netherlands",
            specialty: "icu",
            experience: "3-5-years",
            duration: "8-months",
            price: 2599,
            description: "BIG registration and Dutch language training for nursing in the Netherlands.",
            successRate: 88,
            popularity: 81,
            features: ["BIG Registration", "Dutch Language", "Skills Assessment", "Cultural Training"]
        }
    ];
}

function generateDocCourses() {
    return [
        {
            id: 1,
            title: "UK PLAB Excellence Program",
            country: "uk",
            specialty: "internal-medicine",
            experience: "resident",
            examType: "plab",
            price: 4999,
            description: "Complete PLAB 1 & 2 preparation with GMC registration support and NHS fellowship guidance.",
            successRate: 92,
            popularity: 95,
            features: ["PLAB 1 & 2 Prep", "GMC Registration", "NHS Fellowship", "Clinical Attachments"]
        },
        {
            id: 2,
            title: "USA USMLE Mastery",
            country: "usa",
            specialty: "surgery",
            experience: "specialist",
            examType: "usmle",
            price: 6999,
            description: "USMLE Step 1, 2 & 3 preparation with residency match support and comprehensive guidance.",
            successRate: 89,
            popularity: 93,
            features: ["USMLE Steps 1-3", "Residency Match", "ECFMG Certification", "Interview Prep"]
        },
        {
            id: 3,
            title: "Canada Medical Licensing",
            country: "canada",
            specialty: "pediatrics",
            experience: "fresh-graduate",
            examType: "licensing",
            price: 3999,
            description: "MCCEE and NAC-OSCE preparation for Canadian medical practice with provincial support.",
            successRate: 87,
            popularity: 88,
            features: ["MCCEE Prep", "NAC-OSCE", "Provincial Licensing", "Residency Support"]
        },
        {
            id: 4,
            title: "Australia AMC Pathway",
            country: "australia",
            specialty: "cardiology",
            experience: "consultant",
            examType: "licensing",
            price: 4499,
            description: "AMC CAT and clinical examination preparation for Australian medical practice.",
            successRate: 91,
            popularity: 86,
            features: ["AMC CAT", "Clinical Exam", "AHPRA Registration", "Specialist Pathway"]
        },
        {
            id: 5,
            title: "Germany Medical License",
            country: "germany",
            specialty: "emergency",
            experience: "resident",
            examType: "licensing",
            price: 5499,
            description: "Approbation process and Fachsprachenprüfung for German medical practice with language support.",
            successRate: 88,
            popularity: 84,
            features: ["Approbation Process", "Fachsprachenprüfung", "German C1 Level", "Hospital Placement"]
        },
        {
            id: 6,
            title: "NHS Fellowship Elite",
            country: "uk",
            specialty: "radiology",
            experience: "specialist",
            examType: "fellowship",
            price: 7999,
            description: "Exclusive NHS fellowship application support and placement assistance with mentorship.",
            successRate: 85,
            popularity: 90,
            features: ["Fellowship Applications", "Mentorship", "Research Opportunities", "Career Guidance"]
        },
        {
            id: 7,
            title: "New Zealand Medical Pathway",
            country: "new-zealand",
            specialty: "internal-medicine",
            experience: "resident",
            examType: "licensing",
            price: 3799,
            description: "MCNZ registration and clinical assessment for medical practice in New Zealand.",
            successRate: 89,
            popularity: 83,
            features: ["MCNZ Registration", "Clinical Assessment", "English Test Prep", "Job Placement"]
        },
        {
            id: 8,
            title: "Ireland Medical Registration",
            country: "ireland",
            specialty: "surgery",
            experience: "specialist",
            examType: "licensing",
            price: 4299,
            description: "IMC registration and specialist recognition for medical practice in Ireland.",
            successRate: 86,
            popularity: 82,
            features: ["IMC Registration", "Specialist Recognition", "English Test Prep", "Hospital Placement"]
        }
    ];
}

function generateAlliedCourses() {
    return [
        {
            id: 1,
            title: "UK Physiotherapy Excellence",
            country: "uk",
            profession: "physiotherapy",
            experience: "1-3-years",
            certification: "licensing",
            price: 1999,
            description: "HCPC registration and skills assessment for UK physiotherapy practice with job placement.",
            successRate: 94,
            popularity: 92,
            features: ["HCPC Registration", "Skills Assessment", "English Test Prep", "Job Placement"]
        },
        {
            id: 2,
            title: "Canada OT Certification",
            country: "canada",
            profession: "occupational-therapy",
            experience: "3-5-years",
            certification: "skills-assessment",
            price: 2299,
            description: "CAOT credential recognition and provincial registration support with employer connections.",
            successRate: 91,
            popularity: 89,
            features: ["CAOT Recognition", "Provincial Registration", "Skills Assessment", "Employer Connect"]
        },
        {
            id: 3,
            title: "Australia Radiography License",
            country: "australia",
            profession: "radiography",
            experience: "fresh-graduate",
            certification: "licensing",
            price: 1799,
            description: "AHPRA registration and skills assessment for Australian radiography with comprehensive support.",
            successRate: 96,
            popularity: 87,
            features: ["AHPRA Registration", "Skills Assessment", "English Test Prep", "Job Placement"]
        },
        {
            id: 4,
            title: "Germany Lab Technology",
            country: "germany",
            profession: "laboratory",
            experience: "5-plus-years",
            certification: "bridging",
            price: 2199,
            description: "Professional recognition and bridging program for German laboratory practice with language support.",
            successRate: 89,
            popularity: 85,
            features: ["Professional Recognition", "Bridging Program", "German B2 Level", "Job Placement"]
        },
        {
            id: 5,
            title: "New Zealand Speech Therapy",
            country: "new-zealand",
            profession: "speech-therapy",
            experience: "1-3-years",
            certification: "licensing",
            price: 2099,
            description: "NZSTA registration and competency assessment for speech therapy practice with support.",
            successRate: 93,
            popularity: 83,
            features: ["NZSTA Registration", "Competency Assessment", "English Test Prep", "Job Placement"]
        },
        {
            id: 6,
            title: "USA Pharmacy Certification",
            country: "usa",
            profession: "pharmacy",
            experience: "specialist",
            certification: "licensing",
            price: 3499,
            description: "FPGEC certification and NAPLEX preparation for US pharmacy practice with state licensing.",
            successRate: 88,
            popularity: 86,
            features: ["FPGEC Certification", "NAPLEX Prep", "State Licensing", "Employer Matching"]
        },
        {
            id: 7,
            title: "UK Dental Hygiene Pathway",
            country: "uk",
            profession: "dental-hygiene",
            experience: "1-3-years",
            certification: "licensing",
            price: 1899,
            description: "GDC registration and skills assessment for dental hygiene practice in the UK.",
            successRate: 92,
            popularity: 84,
            features: ["GDC Registration", "Skills Assessment", "English Test Prep", "Job Placement"]
        },
        {
            id: 8,
            title: "Canada Dietetics Certification",
            country: "canada",
            profession: "dietetics",
            experience: "3-5-years",
            certification: "skills-assessment",
            price: 2199,
            description: "Dietitians of Canada credential recognition and provincial registration support.",
            successRate: 90,
            popularity: 81,
            features: ["Credential Recognition", "Provincial Registration", "Skills Assessment", "Job Placement"]
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
    
    // Add animation to results
    const coursesGrid = document.getElementById('courses-grid');
    if (coursesGrid) {
        coursesGrid.style.opacity = '0';
        setTimeout(() => {
            coursesGrid.style.opacity = '1';
        }, 100);
    }
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
                const durationOrder = {'3-months': 1, '4-months': 2, '6-months': 3, '8-months': 4, '12-months': 5, '18-months': 6};
                return (durationOrder[a.duration] || 7) - (durationOrder[b.duration] || 7);
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
    filteredCourses.forEach((course, index) => {
        const courseCard = createCourseCard(course);
        courseCard.style.animationDelay = `${index * 0.1}s`;
        coursesGrid.appendChild(courseCard);
    });
}

function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'course-card fade-in';
    
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
    
    const countryNames = {
        'uk': 'United Kingdom',
        'germany': 'Germany',
        'canada': 'Canada',
        'australia': 'Australia',
        'usa': 'United States',
        'new-zealand': 'New Zealand',
        'ireland': 'Ireland',
        'netherlands': 'Netherlands',
        'singapore': 'Singapore',
        'uae': 'UAE'
    };
    
    card.innerHTML = `
        <div class="course-header">
            <div>
                <h4 class="course-title">${course.title}</h4>
                <div class="course-country">${countryFlags[course.country] || '🌍'} ${countryNames[course.country] || course.country.toUpperCase()}</div>
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
            ${course.features ? `
                <div class="course-features">
                    ${course.features.slice(0, 3).map(feature => `
                        <span class="feature-tag">${feature}</span>
                    `).join('')}
                </div>
            ` : ''}
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
    
    // Create modal content
    const modalContent = `
        <div class="course-modal">
            <div class="modal-header">
                <h3>${course.title}</h3>
                <button class="modal-close" onclick="closeCourseModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="course-details-full">
                    <p><strong>Price:</strong> $${course.price.toLocaleString()}</p>
                    <p><strong>Success Rate:</strong> ${course.successRate}%</p>
                    <p><strong>Duration:</strong> ${course.duration?.replace('-', ' ') || 'Flexible'}</p>
                    <p><strong>Experience Level:</strong> ${course.experience?.replace('-', ' ') || 'All levels'}</p>
                    <br>
                    <p>${course.description}</p>
                    ${course.features ? `
                        <h4>Program Features:</h4>
                        <ul>
                            ${course.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    ` : ''}
                    <div class="modal-actions">
                        <button class="btn btn-primary" onclick="enrollNow(${course.id})">Enroll Now</button>
                        <button class="btn btn-secondary" onclick="requestInfo(${course.id})">Request Info</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Create and show modal
    const modal = document.createElement('div');
    modal.className = 'course-modal-overlay';
    modal.innerHTML = modalContent;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Add styles for modal
    if (!document.getElementById('modal-styles')) {
        const styles = document.createElement('style');
        styles.id = 'modal-styles';
        styles.textContent = `
            .course-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                padding: 2rem;
            }
            .course-modal {
                background: white;
                border-radius: 15px;
                max-width: 600px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            }
            .course-modal .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 2rem 2rem 1rem;
                border-bottom: 2px solid #e5e7eb;
            }
            .course-modal .modal-close {
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: #6b7280;
                padding: 0.5rem;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            .course-modal .modal-close:hover {
                background: #f3f4f6;
                color: #374151;
            }
            .course-modal .modal-body {
                padding: 2rem;
            }
            .course-modal .modal-actions {
                display: flex;
                gap: 1rem;
                margin-top: 2rem;
            }
            .course-modal .btn {
                flex: 1;
                padding: 1rem 2rem;
                border: none;
                border-radius: 50px;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            .course-modal .btn-primary {
                background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
                color: white;
            }
            .course-modal .btn-secondary {
                background: transparent;
                color: #2563eb;
                border: 2px solid #2563eb;
            }
            .course-modal .btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
            }
        `;
        document.head.appendChild(styles);
    }
}

function closeCourseModal() {
    const modal = document.querySelector('.course-modal-overlay');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

function enrollNow(courseId) {
    // Implement enrollment logic
    showNotification('Enrollment process initiated! Our team will contact you shortly.', 'success');
    closeCourseModal();
}

function requestInfo(courseId) {
    // Implement info request logic
    showNotification('Information request sent! We\'ll send you detailed course information.', 'success');
    closeCourseModal();
}

// Make filter functions globally available
window.filterCourses = filterCourses;
window.clearFilters = clearFilters;
window.sortCourses = sortCourses;
window.viewCourseDetails = viewCourseDetails;
window.closeCourseModal = closeCourseModal;
window.enrollNow = enrollNow;
window.requestInfo = requestInfo;

// Enhanced Pricing Toggle Functionality
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

// Enhanced Country Tabs Functionality
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

// Learning Path Visualization
function initializeLearningPath() {
    const pathSteps = document.querySelectorAll('.path-step');
    const stepDetails = document.querySelectorAll('.step-detail');
    
    if (pathSteps.length > 0) {
        // Show first step by default
        showPathStep(0);
        
        pathSteps.forEach((step, index) => {
            step.addEventListener('click', () => showPathStep(index));
        });
    }
}

function showPathStep(index) {
    const pathSteps = document.querySelectorAll('.path-step');
    const stepDetails = document.querySelectorAll('.step-detail');
    
    // Remove active class from all steps and details
    pathSteps.forEach(step => step.classList.remove('active'));
    stepDetails.forEach(detail => detail.classList.remove('active'));
    
    // Activate selected step and detail
    if (pathSteps[index]) {
        pathSteps[index].classList.add('active');
    }
    if (stepDetails[index]) {
        stepDetails[index].classList.add('active');
    }
}

// Stats Counter Animation
function initializeStatsCounter() {
    const counters = document.querySelectorAll('.counter-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format number with appropriate suffix
        const formatted = formatCounterNumber(Math.floor(current));
        element.textContent = formatted;
    }, 16);
}

function formatCounterNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M+';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K+';
    } else {
        return num.toString();
    }
}

// Interactive Features
function initializeInteractiveFeatures() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Parallax Effects
function setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-background::before, .success-metrics::before');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Progress Bars Animation
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.dataset.progress || '0';
                
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = targetWidth + '%';
                }, 100);
                
                observer.unobserve(progressBar);
            }
        });
    }, observerOptions);
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

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
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = programsSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
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
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = testimonialsSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
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

// Enhanced Form Handling
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
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                
                // Reset form
                formElement.reset();
                
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        }
    });
}

// Enhanced Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${icons[type] || icons.info}"></i>
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
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
        word-wrap: break-word;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        margin-left: auto;
        padding: 0.25rem;
        border-radius: 4px;
        transition: background 0.3s ease;
    }
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    .feature-tag {
        display: inline-block;
        background: var(--primary-lightest);
        color: var(--primary);
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 600;
        margin: 0.25rem 0.25rem 0 0;
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

// Analytics and Tracking
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
        background: var(--primary);
        color: white;
        padding: 8px 16px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
        font-weight: 600;
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
                    document.body.style.overflow = '';
                }
            });
            
            // Close any open FAQ items
            const activeFAQs = document.querySelectorAll('.faq-item.active');
            activeFAQs.forEach(faq => {
                faq.classList.remove('active');
                const answer = faq.querySelector('.faq-answer');
                if (answer) {
                    answer.style.maxHeight = '0';
                    answer.style.padding = '0 2rem';
                }
            });
            
            // Close course modal
            closeCourseModal();
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
        showCountryPricing,
        viewCourseDetails,
        closeCourseModal,
        enrollNow,
        requestInfo
    };
}