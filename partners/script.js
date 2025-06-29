// Enhanced JavaScript for Partners Page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initScrollAnimations();
    initCounterAnimations();
    initHoverEffects();
    initCTAButtons();
    // initParallaxEffects();
    initMarqueeAnimation();
    initMapInteractions();
    initTestimonialRotation();
    initSmoothScrolling();
    initResponsiveFeatures();
    
    // Enhanced scroll animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Add stagger effect for grid items
                    if (entry.target.classList.contains('partnership-card') || 
                        entry.target.classList.contains('story-card') ||
                        entry.target.classList.contains('model-card') ||
                        entry.target.classList.contains('testimonial-card')) {
                        const siblings = entry.target.parentElement.children;
                        const index = Array.from(siblings).indexOf(entry.target);
                        entry.target.style.transitionDelay = `${index * 0.1}s`;
                    }
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animateElements = document.querySelectorAll(`
            .partnership-card, .story-card, .model-card, .testimonial-card,
            .benefit-item, .timeline-item, .region-stat, .benefit-logo-item
        `);
        
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    // Enhanced counter animation
    function initCounterAnimations() {
        function animateCounter(element, target, duration = 2000, suffix = '+') {
            let start = 0;
            const increment = target / (duration / 16);
            
            function updateCounter() {
                start += increment;
                if (start < target) {
                    if (suffix === '%') {
                        element.textContent = Math.floor(start) + '%';
                    } else if (suffix === 'K+') {
                        element.textContent = Math.floor(start / 1000) + 'K+';
                    } else {
                        element.textContent = Math.floor(start) + '+';
                    }
                    requestAnimationFrame(updateCounter);
                } else {
                    if (suffix === 'K+') {
                        element.textContent = Math.floor(target / 1000) + 'K+';
                    } else {
                        element.textContent = target + suffix;
                    }
                }
            }
            
            updateCounter();
        }
        
        // Animate counters when sections become visible
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number, .metric-number');
                    statNumbers.forEach(stat => {
                        const text = stat.textContent;
                        let number, suffix;
                        
                        if (text.includes('K+')) {
                            number = parseInt(text.replace(/\D/g, '')) * 1000;
                            suffix = 'K+';
                        } else if (text.includes('%')) {
                            number = parseInt(text.replace(/\D/g, ''));
                            suffix = '%';
                        } else {
                            number = parseInt(text.replace(/\D/g, ''));
                            suffix = '+';
                        }
                        
                        if (number && !stat.dataset.animated) {
                            stat.dataset.animated = 'true';
                            animateCounter(stat, number, 2000, suffix);
                        }
                    });
                    counterObserver.unobserve(entry.target);
                }
            });
        });
        
        const counterSections = document.querySelectorAll('.hero-section, .success-stories, .global-presence, .benefits-stats');
        counterSections.forEach(section => {
            counterObserver.observe(section);
        });
    }
    
    // Enhanced hover effects
    function initHoverEffects() {
        // Partner logo hover effects
        const partnerLogos = document.querySelectorAll('.partner-logo-item');
        partnerLogos.forEach(logo => {
            logo.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            logo.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Partnership card hover effects
        const partnershipCards = document.querySelectorAll('.partnership-card');
        partnershipCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.card-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.card-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
        
        // Model card hover effects
        const modelCards = document.querySelectorAll('.model-card');
        modelCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                if (!this.classList.contains('featured')) {
                    this.style.borderColor = '#2c5aa0';
                    this.style.borderWidth = '2px';
                    this.style.borderStyle = 'solid';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                if (!this.classList.contains('featured')) {
                    this.style.border = 'none';
                }
            });
        });
    }
    
    // Enhanced CTA button functionality
    function initCTAButtons() {
        const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline, .btn-primary-small, .btn-outline-small');
        
        ctaButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Handle different button actions
                const buttonText = this.textContent.trim();
                
                if (buttonText.includes('Partner With Us') || buttonText.includes('Get Started') || buttonText.includes('Start Partnership')) {
                    showPartnershipModal();
                } else if (buttonText.includes('Download') || buttonText.includes('Partnership Guide')) {
                    downloadPartnershipGuide();
                } else if (buttonText.includes('Schedule Consultation')) {
                    scheduleConsultation();
                } else if (buttonText.includes('Learn More') || buttonText.includes('Explore')) {
                    showMoreInfo(buttonText);
                }
            });
            
            // Add ripple effect
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        function showPartnershipModal() {
            // Create modal overlay
            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Start Your Partnership Journey</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>Thank you for your interest in partnering with us. Our partnership team will contact you within 24 hours to discuss opportunities.</p>
                        <form class="partnership-form">
                            <input type="text" placeholder="Organization Name" required>
                            <input type="email" placeholder="Email Address" required>
                            <input type="tel" placeholder="Phone Number" required>
                            <select required>
                                <option value="">Select Partnership Type</option>
                                <option value="healthcare">Healthcare Institution</option>
                                <option value="education">Educational Partner</option>
                                <option value="technology">Technology Partner</option>
                                <option value="government">Government/Regulatory</option>
                            </select>
                            <textarea placeholder="Tell us about your organization and partnership goals" rows="4"></textarea>
                            <button type="submit" class="btn-primary">Submit Partnership Request</button>
                        </form>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Add modal styles
            const modalStyles = `
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    opacity: 0;
                    animation: fadeIn 0.3s ease forwards;
                }
                .modal-content {
                    background: white;
                    border-radius: 20px;
                    max-width: 500px;
                    width: 90%;
                    max-height: 90vh;
                    overflow-y: auto;
                    transform: scale(0.8);
                    animation: scaleIn 0.3s ease forwards;
                }
                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 2rem 2rem 1rem;
                    border-bottom: 1px solid #e2e8f0;
                }
                .modal-close {
                    background: none;
                    border: none;
                    font-size: 2rem;
                    cursor: pointer;
                    color: #64748b;
                    transition: color 0.3s ease;
                }
                .modal-close:hover {
                    color: #2c5aa0;
                }
                .modal-body {
                    padding: 2rem;
                }
                .partnership-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin-top: 1rem;
                }
                .partnership-form input,
                .partnership-form select,
                .partnership-form textarea {
                    padding: 1rem;
                    border: 2px solid #e2e8f0;
                    border-radius: 10px;
                    font-size: 1rem;
                    transition: border-color 0.3s ease;
                }
                .partnership-form input:focus,
                .partnership-form select:focus,
                .partnership-form textarea:focus {
                    outline: none;
                    border-color: #2c5aa0;
                }
                @keyframes fadeIn {
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    to { transform: scale(1); }
                }
            `;
            
            const styleSheet = document.createElement('style');
            styleSheet.textContent = modalStyles;
            document.head.appendChild(styleSheet);
            
            // Close modal functionality
            modal.querySelector('.modal-close').addEventListener('click', () => {
                modal.remove();
                styleSheet.remove();
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                    styleSheet.remove();
                }
            });
            
            // Form submission
            modal.querySelector('.partnership-form').addEventListener('submit', (e) => {
                e.preventDefault();
                showNotification('Partnership request submitted successfully! We will contact you within 24 hours.', 'success');
                modal.remove();
                styleSheet.remove();
            });
        }
        
        function downloadPartnershipGuide() {
            showNotification('Partnership guide download started!', 'success');
        }
        
        function scheduleConsultation() {
            showNotification('Consultation scheduling feature will be available soon. Please contact us directly.', 'info');
        }
        
        function showMoreInfo(buttonText) {
            showNotification(`More information about ${buttonText} will be available soon.`, 'info');
        }
        
        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.textContent = message;
            
            const notificationStyles = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 1rem 2rem;
                    border-radius: 10px;
                    color: white;
                    font-weight: 600;
                    z-index: 1001;
                    transform: translateX(100%);
                    transition: transform 0.3s ease;
                    max-width: 400px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                }
                .notification-success { background: #10b981; }
                .notification-info { background: #2c5aa0; }
                .notification-warning { background: #f59e0b; }
            `;
            
            if (!document.querySelector('#notification-styles')) {
                const styleSheet = document.createElement('style');
                styleSheet.id = 'notification-styles';
                styleSheet.textContent = notificationStyles;
                document.head.appendChild(styleSheet);
            }
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 100);
            
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }, 4000);
        }
    }
    
    // Parallax effects
    function initParallaxEffects() {
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const heroSection = document.querySelector('.hero-section');
            
            if (heroSection) {
                const rate = scrolled * -0.3;
                heroSection.style.transform = `translateY(${rate}px)`;
            }
            
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick);
    }
    
    // Enhanced marquee animation
    function initMarqueeAnimation() {
        const marqueeContent = document.querySelector('.marquee-content');
        if (marqueeContent) {
            // Clone content for seamless loop
            const clone = marqueeContent.cloneNode(true);
            marqueeContent.parentElement.appendChild(clone);
            
            // Pause on hover
            const marquee = document.querySelector('.partners-marquee');
            marquee.addEventListener('mouseenter', () => {
                marqueeContent.style.animationPlayState = 'paused';
                clone.style.animationPlayState = 'paused';
            });
            
            marquee.addEventListener('mouseleave', () => {
                marqueeContent.style.animationPlayState = 'running';
                clone.style.animationPlayState = 'running';
            });
        }
    }
    
    // Map interactions
    function initMapInteractions() {
        const markers = document.querySelectorAll('.marker');
        const regionStats = document.querySelectorAll('.region-stat');
        
        markers.forEach(marker => {
            marker.addEventListener('click', function() {
                const region = this.dataset.region;
                
                // Reset all region stats
                regionStats.forEach(stat => {
                    stat.style.transform = 'translateX(0)';
                    stat.style.background = '#f8fafc';
                });
                
                // Highlight corresponding region stat
                const targetStat = Array.from(regionStats).find(stat => 
                    stat.querySelector('h4').textContent.includes(region.split(' ')[0])
                );
                
                if (targetStat) {
                    targetStat.style.transform = 'translateX(10px)';
                    targetStat.style.background = '#e0e7ff';
                    targetStat.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            });
        });
    }
    
    // Testimonial rotation
    function initTestimonialRotation() {
        const testimonials = document.querySelectorAll('.testimonial-card');
        let currentIndex = 0;
        
        function rotateTestimonials() {
            testimonials.forEach((testimonial, index) => {
                testimonial.style.opacity = index === currentIndex ? '1' : '0.8';
                testimonial.style.transform = index === currentIndex ? 'scale(1.02)' : 'scale(1)';
            });
            
            currentIndex = (currentIndex + 1) % testimonials.length;
        }
        
        if (testimonials.length > 0) {
            setInterval(rotateTestimonials, 6000);
        }
    }
    
    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
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
    
    // Responsive features
    function initResponsiveFeatures() {
        // Adjust marquee speed based on screen size
        function adjustMarqueeSpeed() {
            const marqueeContent = document.querySelector('.marquee-content');
            if (marqueeContent) {
                const screenWidth = window.innerWidth;
                let duration;
                
                if (screenWidth < 480) {
                    duration = '25s';
                } else if (screenWidth < 768) {
                    duration = '30s';
                } else {
                    duration = '40s';
                }
                
                marqueeContent.style.animationDuration = duration;
            }
        }
        
        // Adjust grid layouts for mobile
        function adjustGridLayouts() {
            const screenWidth = window.innerWidth;
            const benefitsContent = document.querySelector('.benefits-content');
            
            if (benefitsContent) {
                if (screenWidth < 1024) {
                    benefitsContent.style.gridTemplateColumns = '1fr';
                } else {
                    benefitsContent.style.gridTemplateColumns = '1fr 1fr';
                }
            }
        }
        
        // Initial setup
        adjustMarqueeSpeed();
        adjustGridLayouts();
        
        // Listen for resize events
        window.addEventListener('resize', debounce(() => {
            adjustMarqueeSpeed();
            adjustGridLayouts();
        }, 250));
    }
    
    // Utility function for fade-in animations
    function fadeInOnScroll() {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    // Add scroll event listener for fade-in animations
    window.addEventListener('scroll', throttle(fadeInOnScroll, 10));
    
    // Initialize on page load
    fadeInOnScroll();
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add CSS for keyboard navigation
    const keyboardStyles = `
        .keyboard-navigation button:focus,
        .keyboard-navigation .marker:focus {
            outline: 3px solid #2c5aa0;
            outline-offset: 2px;
        }
    `;
    
    const keyboardStyleSheet = document.createElement('style');
    keyboardStyleSheet.textContent = keyboardStyles;
    document.head.appendChild(keyboardStyleSheet);
});

// Utility functions
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
    }
}

// Export functions for potential external use
window.GWDPartners = {
    debounce,
    throttle
};



// Global variables
const currentStoryIndex = 0
let currentStep = 1
let userLocation = null

    window.addEventListener('load', function() {
        setTimeout(function() {
            document.body.classList.add('loaded');
            setTimeout(function() {
                var loading = document.getElementById('loadingScreen');
                if (loading) loading.style.display = 'none';
            }, 600);
        }, 600);
    });
document.addEventListener('DOMContentLoaded', function() {
                    const selectorBtn = document.getElementById('countrySelectorBtn');
                    const dropdown = document.getElementById('countryDropdown');
                    const flagSpan = document.getElementById('selectedCountryFlag');
                    const nameSpan = document.getElementById('selectedCountryName');
                    let isOpen = false;

                    selectorBtn.addEventListener('click', function(e) {
                        e.stopPropagation();
                        isOpen = !isOpen;
                        dropdown.style.display = isOpen ? 'block' : 'none';
                        selectorBtn.setAttribute('aria-expanded', isOpen);
                    });

                    document.addEventListener('click', function() {
                        if (isOpen) {
                            dropdown.style.display = 'none';
                            selectorBtn.setAttribute('aria-expanded', false);
                            isOpen = false;
                        }
                    });

                    dropdown.querySelectorAll('.country-option').forEach(function(option) {
                        option.addEventListener('click', function(e) {
                            e.stopPropagation();
                            // Set selected flag and name
                            const img = option.querySelector('img');
                            flagSpan.innerHTML = img ? img.outerHTML : option.textContent.trim().charAt(0);
                            nameSpan.textContent = option.textContent.trim().replace(/^[^\w]+/, '');
                            dropdown.style.display = 'none';
                            selectorBtn.setAttribute('aria-expanded', false);
                            isOpen = false;
                            // Optionally: trigger country-specific logic here
                        });
                    });
                });

                // Mobile Country Selector logic
                document.addEventListener('DOMContentLoaded', function() {
                    const mobileBtn = document.getElementById('mobileCountrySelectorBtn');
                    const mobileDropdown = document.getElementById('mobileCountryDropdown');
                    const mobileFlag = document.getElementById('mobileSelectedCountryFlag');
                    const mobileName = document.getElementById('mobileSelectedCountryName');
                    const options = mobileDropdown.querySelectorAll('.mobile-country-option');

                    // Toggle dropdown
                    mobileBtn.addEventListener('click', function(e) {
                        e.stopPropagation();
                        const expanded = mobileBtn.getAttribute('aria-expanded') === 'true';
                        mobileBtn.setAttribute('aria-expanded', !expanded);
                        mobileDropdown.style.display = expanded ? 'none' : 'block';
                    });

                    // Select country
                    options.forEach(option => {
                        option.addEventListener('click', function() {
                            // Update button
                            const img = option.querySelector('img').cloneNode(true);
                            mobileFlag.innerHTML = '';
                            mobileFlag.appendChild(img);
                            mobileName.textContent = option.textContent.trim();
                            // Hide dropdown
                            mobileDropdown.style.display = 'none';
                            mobileBtn.setAttribute('aria-expanded', 'false');
                            // Optionally, sync with desktop selector or trigger country change logic here
                        });
                    });

                    // Close dropdown on outside click
                    document.addEventListener('click', function(e) {
                        if (!mobileBtn.contains(e.target) && !mobileDropdown.contains(e.target)) {
                            mobileDropdown.style.display = 'none';
                            mobileBtn.setAttribute('aria-expanded', 'false');
                        }
                    });
                });
document.addEventListener('DOMContentLoaded', function() {
            const filterBtns = document.querySelectorAll('.filter-btn');
            const stories = document.querySelectorAll('.story-card');
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    const cat = this.getAttribute('data-category');
                    stories.forEach(story => {
                        if (cat === 'all' || story.getAttribute('data-category') === cat) {
                            story.style.display = '';
                        } else {
                            story.style.display = 'none';
                        }
                    });
                });
            });
        });


// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeWebsite()
  setupEventListeners()
  simulateLocationDetection()
  setupIntersectionObserver()
})

// Initialize website
function initializeWebsite() {
  setupMobileNavigation()
  setupPathwaysForm()
  setupSuccessStories()
  setupModal()
  setupScrollEffects()
  setupMegaMenus()
}

// Enhanced mobile navigation setup
function setupMobileNavigation() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileNav = document.getElementById("mobileNav")
  const mobileCloseBtn = document.getElementById("mobileCloseBtn")
  const mobileMenuToggles = document.querySelectorAll(".mobile-menu-toggle")

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileNav.classList.toggle("active")
      mobileMenuBtn.classList.toggle("active")
      document.body.style.overflow = mobileNav.classList.contains("active") ? "hidden" : ""
    })
  }

  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener("click", closeMobileMenu)
  }

  if (mobileNav) {
    mobileNav.addEventListener("click", (e) => {
      if (e.target === mobileNav) {
        closeMobileMenu()
      }
    })
  }

  // Enhanced mobile submenu toggles
  mobileMenuToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault()
      const submenu = toggle.nextElementSibling
      const icon = toggle.querySelector("i")

      // Close other open submenus
      mobileMenuToggles.forEach((otherToggle) => {
        if (otherToggle !== toggle) {
          const otherSubmenu = otherToggle.nextElementSibling
          const otherIcon = otherToggle.querySelector("i")
          if (otherSubmenu) otherSubmenu.classList.remove("active")
          if (otherIcon) {
            otherIcon.classList.remove("fa-chevron-up")
            otherIcon.classList.add("fa-chevron-down")
          }
        }
      })

      // Toggle current submenu
      if (submenu) submenu.classList.toggle("active")
      if (icon) {
        icon.classList.toggle("fa-chevron-down")
        icon.classList.toggle("fa-chevron-up")
      }
    })
  })

  // Close menu when clicking on links
  const mobileLinks = document.querySelectorAll(".mobile-nav a")
  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu)
  })

  // Handle escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileNav?.classList.contains("active")) {
      closeMobileMenu()
    }
  })
}

function closeMobileMenu() {
  const mobileNav = document.getElementById("mobileNav")
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")

  if (mobileNav) mobileNav.classList.remove("active")
  if (mobileMenuBtn) mobileMenuBtn.classList.remove("active")
  document.body.style.overflow = ""

  // Close all submenus
  const activeSubmenus = document.querySelectorAll(".mobile-submenu.active")
  activeSubmenus.forEach((submenu) => {
    submenu.classList.remove("active")
    const toggle = submenu.previousElementSibling
    if (toggle) {
      const icon = toggle.querySelector("i")
      if (icon) {
        icon.classList.remove("fa-chevron-up")
        icon.classList.add("fa-chevron-down")
      }
    }
  })
}

// Enhanced mega menu setup
function setupMegaMenus() {
  const menuItems = document.querySelectorAll(".menu-item")

  menuItems.forEach((item) => {
    const megaMenu = item.querySelector(".mega-menu, .dropdown-menu")

    if (megaMenu) {
      let hideTimeout

      item.addEventListener("mouseenter", () => {
        clearTimeout(hideTimeout)
        megaMenu.style.opacity = "1"
        megaMenu.style.visibility = "visible"
        megaMenu.style.transform = item.querySelector(".mega-menu") ? "translateX(-50%) translateY(0)" : "translateY(0)"
      })

      item.addEventListener("mouseleave", () => {
        hideTimeout = setTimeout(() => {
          megaMenu.style.opacity = "0"
          megaMenu.style.visibility = "hidden"
          megaMenu.style.transform = item.querySelector(".mega-menu")
            ? "translateX(-50%) translateY(-10px)"
            : "translateY(-10px)"
        }, 150)
      })
    }
  })
}

// Setup event listeners
function setupEventListeners() {
  // Hero CTA buttons
  const exploreBtn = document.getElementById("exploreOpportunities")
  const pathwayBtn = document.getElementById("findPathway")

  if (exploreBtn) {
    exploreBtn.addEventListener("click", () => {
      document.getElementById("opportunities").scrollIntoView({ behavior: "smooth" })
    })
  }

  if (pathwayBtn) {
    pathwayBtn.addEventListener("click", () => {
      document.getElementById("pathways").scrollIntoView({ behavior: "smooth" })
    })
  }

  // Smooth scrolling for all anchor links
  document.addEventListener("click", handleSmoothScrolling)
}

// Simulate Location Detection (enhanced)
function simulateLocationDetection() {
  // Simulate detecting different countries for demonstration
  const countries = ["IN", "PH", "default"]
  const randomCountry = countries[Math.floor(Math.random() * countries.length)]

  setTimeout(() => {
    userLocation = randomCountry
    updateContentBasedOnLocation(userLocation)
  }, 1000)
}

// Enhanced content update based on location
function updateContentBasedOnLocation(countryCode) {
  const content = countryContent[countryCode] || countryContent["default"]

  // Update country indicator
  const countryIndicator = document.getElementById("detectedCountry")
  if (countryIndicator) {
    countryIndicator.textContent = `Opportunities for ${content.country}`
  }

  // Update hero content
  const heroTitle = document.getElementById("heroTitle")
  const heroSubtitle = document.getElementById("heroSubtitle")

  if (heroTitle) heroTitle.textContent = content.title
  if (heroSubtitle) heroSubtitle.textContent = content.subtitle

  // Update hero stats if available
  if (content.stats) {
    const statItems = document.querySelectorAll(".stat-item")
    if (statItems.length >= 3) {
      statItems[0].querySelector(".stat-number").textContent = content.stats.professionals
      statItems[0].querySelector(".stat-label").textContent = "Professionals Placed"

      statItems[1].querySelector(".stat-number").textContent = content.stats.destinations
      statItems[1].querySelector(".stat-label").textContent = "Countries Served"

      statItems[2].querySelector(".stat-number").textContent = content.stats.successRate
      statItems[2].querySelector(".stat-label").textContent = "Success Rate"
    }
  }

  // Update opportunities section
  updateOpportunitiesSection(content)
}
function showPathwayRecommendation() {
  const form = document.getElementById("pathwaysForm")
  if (!form) return

  const role = form.querySelector('input[name="role"]:checked')?.value
  const destination = form.querySelector('input[name="destination"]:checked')?.value
  const experience = form.querySelector('input[name="experience"]:checked')?.value

  let pathwayKey = ""
  if (role === "nurse" && destination === "uk" && experience === "fresh") {
    pathwayKey = "nurse-uk-fresh"
  } else if (role === "nurse" && destination === "usa" && ["1-3", "3-5", "5+"].includes(experience)) {
    pathwayKey = "nurse-usa-1-3"
  } else if (role === "doctor" && destination === "uk" && ["3-5", "5+"].includes(experience)) {
    pathwayKey = "doctor-uk-3-5"
  } else if (role === "allied" && destination === "uk" && experience === "5+") {
    pathwayKey = "allied-uk-5+"
  }

  const recommendation = pathwayRecommendations[pathwayKey]
  const recommendationSection = document.getElementById("pathwayRecommendation")
  if (recommendation && recommendationSection) {
    recommendationSection.innerHTML = `
      <h3>${recommendation.title}</h3>
      <p>${recommendation.description}</p>
      <ul>
        ${recommendation.steps.map(step => `<li>${step}</li>`).join("")}
      </ul>
      <p><strong>Typical Duration:</strong> ${recommendation.duration}</p>
      <p><strong>Next Steps:</strong> ${recommendation.nextSteps}</p>
      <button class="btn btn-primary" id="getStartedFinal">Get Started</button>
    `
    recommendationSection.style.display = "block"
    document.getElementById("getStartedFinal").addEventListener("click", showModal)
  } else if (recommendationSection) {
    recommendationSection.innerHTML = `<p>Sorry, we couldn't find a recommended pathway for your selection. Please contact our team for personalized guidance.</p>`
    recommendationSection.style.display = "block"
  }
}
            document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
                });
            });
            });

// Scroll effects (unchanged)
function setupScrollEffects() {
  // Placeholder for scroll effects
}

// Intersection Observer for fade-in effects
function setupIntersectionObserver() {
  const fadeEls = document.querySelectorAll(".fade-in")
  if ("IntersectionObserver" in window) {
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
  if (entry.isIntersecting) {
    entry.target.classList.add("visible")
    observer.unobserve(entry.target)
  }
  })
}, { threshold: 0.1 })
fadeEls.forEach((el) => observer.observe(el))
  } else {
// Fallback: show all
fadeEls.forEach((el) => el.classList.add("visible"))
  }
}

// Smooth scrolling for anchor links
function handleSmoothScrolling(e) {
  if (e.target.tagName === "A" && e.target.hash && document.querySelector(e.target.hash)) {
e.preventDefault()
document.querySelector(e.target.hash).scrollIntoView({ behavior: "smooth" })
  }
}

/*Add your page js here*/