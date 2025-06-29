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

/*Main page CSS*/
       
       
       
       // Resources page functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Tab switching functionality
            const tabButtons = document.querySelectorAll('.tab-btn');
            const resourceSections = document.querySelectorAll('.resource-section');
            const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

            // Desktop tab switching
            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const targetTab = button.getAttribute('data-tab');
                    switchToSection(targetTab);
                    updateActiveTab(button, tabButtons);
                });
            });

            // Mobile navigation functionality
            const mobileNavToggle = document.getElementById('mobile-nav-toggle');
            const mobileNavMenu = document.getElementById('mobile-nav-menu');
            const mobileNavClose = document.getElementById('mobile-nav-close');
            const mobileNavOverlay = document.getElementById('mobile-nav-overlay');

            // Toggle mobile navigation
            mobileNavToggle.addEventListener('click', () => {
                mobileNavMenu.classList.add('active');
                mobileNavOverlay.classList.add('active');
                mobileNavToggle.classList.add('active');
                document.body.style.overflow = 'hidden';
            });

            // Close mobile navigation
            function closeMobileNav() {
                mobileNavMenu.classList.remove('active');
                mobileNavOverlay.classList.remove('active');
                mobileNavToggle.classList.remove('active');
                document.body.style.overflow = 'auto';
            }

            mobileNavClose.addEventListener('click', closeMobileNav);
            mobileNavOverlay.addEventListener('click', closeMobileNav);

            // Mobile navigation item clicks
            mobileNavItems.forEach(item => {
                item.addEventListener('click', () => {
                    const targetTab = item.getAttribute('data-tab');
                    switchToSection(targetTab);
                    updateActiveMobileNavItem(item, mobileNavItems);
                    updateMobileNavIcon(targetTab);
                    closeMobileNav();
                });
            });

            // Function to switch sections
            function switchToSection(targetTab) {
                // Remove active class from all sections
                resourceSections.forEach(section => section.classList.remove('active'));
                
                // Add active class to target section
                const targetSection = document.getElementById(targetTab);
                if (targetSection) {
                    targetSection.classList.add('active');
                    
                    // Smooth scroll to section
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }

            // Function to update active tab
            function updateActiveTab(activeButton, allButtons) {
                allButtons.forEach(btn => btn.classList.remove('active'));
                activeButton.classList.add('active');
            }

            // Function to update active mobile nav item
            function updateActiveMobileNavItem(activeItem, allItems) {
                allItems.forEach(item => item.classList.remove('active'));
                activeItem.classList.add('active');
            }

            // Function to update mobile nav icon
            function updateMobileNavIcon(targetTab) {
                const iconMap = {
                    'licensing-guides': '📋',
                    'case-studies': '📊',
                    'blog': '📝',
                    'webinars': '🎥',
                    'tools': '🛠️',
                    'templates': '📄',
                    'faqs': '❓'
                };
                
                const navIcon = document.querySelector('.nav-icon');
                if (navIcon && iconMap[targetTab]) {
                    navIcon.textContent = iconMap[targetTab];
                }
            }

            // FAQ functionality
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                
                question.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    
                    // Close all FAQ items
                    faqItems.forEach(faqItem => {
                        faqItem.classList.remove('active');
                    });
                    
                    // Open clicked item if it wasn't active
                    if (!isActive) {
                        item.classList.add('active');
                    }
                });
            });

            // FAQ Search functionality
            const faqSearch = document.getElementById('faq-search');
            if (faqSearch) {
                faqSearch.addEventListener('input', (e) => {
                    const searchTerm = e.target.value.toLowerCase();
                    const faqItems = document.querySelectorAll('.faq-item');
                    
                    faqItems.forEach(item => {
                        const question = item.querySelector('.faq-question h4').textContent.toLowerCase();
                        const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
                        
                        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = searchTerm === '' ? 'block' : 'none';
                        }
                    });
                });
            }

            // Filter functionality for case studies
            const filterButtons = document.querySelectorAll('.filter-btn');
            const caseStudyCards = document.querySelectorAll('.case-study-card');

            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const filter = button.getAttribute('data-filter');
                    
                    // Update active filter button
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    
                    // Filter case studies
                    caseStudyCards.forEach(card => {
                        if (filter === 'all' || card.getAttribute('data-category') === filter) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });

            // Blog category filtering
            const categoryButtons = document.querySelectorAll('.category-btn');
            const blogCards = document.querySelectorAll('.blog-card');

            categoryButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const category = button.getAttribute('data-category');
                    
                    // Update active category button
                    categoryButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    
                    // Filter blog posts
                    blogCards.forEach(card => {
                        if (category === 'all' || card.getAttribute('data-category') === category) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });

            // Webinar filtering
            const webinarFilterButtons = document.querySelectorAll('.webinar-filter-btn');
            const webinarCards = document.querySelectorAll('.webinar-card');

            webinarFilterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const filter = button.getAttribute('data-filter');
                    
                    // Update active filter button
                    webinarFilterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    
                    // Filter webinars
                    webinarCards.forEach(card => {
                        const type = card.getAttribute('data-type');
                        const price = card.getAttribute('data-price');
                        
                        let show = false;
                        if (filter === 'all') {
                            show = true;
                        } else if (filter === 'free' && price === 'free') {
                            show = true;
                        } else if (filter === type) {
                            show = true;
                        }
                        
                        card.style.display = show ? 'block' : 'none';
                    });
                });
            });

            // Template category filtering
            const templateCatButtons = document.querySelectorAll('.template-cat-btn');
            const templateCards = document.querySelectorAll('.template-card');

            templateCatButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const category = button.getAttribute('data-category');
                    
                    // Update active category button
                    templateCatButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    
                    // Filter templates
                    templateCards.forEach(card => {
                        if (category === 'all' || card.getAttribute('data-category') === category) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });

            // Guide download functionality
            const guideButtons = document.querySelectorAll('.btn-guide');
            
            guideButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const guideTitle = e.target.closest('.guide-card').querySelector('h4').textContent;
                    
                    // Simulate download process
                    const originalText = button.textContent;
                    button.textContent = 'Downloading...';
                    button.disabled = true;
                    
                    setTimeout(() => {
                        showNotification(`${guideTitle} guide has been downloaded successfully!`, 'success');
                        button.textContent = originalText;
                        button.disabled = false;
                    }, 2000);
                });
            });

            // Case study functionality
            const caseStudyButtons = document.querySelectorAll('.btn-case-study');
            
            caseStudyButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const caseTitle = e.target.closest('.case-study-card').querySelector('h3').textContent;
                    showNotification(`Opening detailed case study: "${caseTitle}"`, 'info');
                });
            });

            // Blog functionality
            const blogButtons = document.querySelectorAll('.btn-blog, .btn-blog-small');
            
            blogButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const blogTitle = e.target.closest('.blog-card').querySelector('.blog-title').textContent;
                    showNotification(`Opening blog post: "${blogTitle}"`, 'info');
                });
            });

            // Newsletter subscription
            const newsletterForm = document.querySelector('.newsletter-form');
            if (newsletterForm) {
                newsletterForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const email = e.target.querySelector('input[type="email"]').value;
                    
                    if (validateEmail(email)) {
                        showNotification('Successfully subscribed to our newsletter!', 'success');
                        e.target.reset();
                    } else {
                        showNotification('Please enter a valid email address.', 'error');
                    }
                });
            }

            // Webinar functionality
            const webinarButtons = document.querySelectorAll('.btn-webinar');
            
            webinarButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const webinarCard = e.target.closest('.webinar-card');
                    const webinarTitle = webinarCard.querySelector('.webinar-title').textContent;
                    const webinarBadge = webinarCard.querySelector('.webinar-badge').textContent;
                    
                    if (webinarBadge.includes('Live')) {
                        showNotification(`Joining live session: "${webinarTitle}"`, 'success');
                    } else if (webinarBadge.includes('Upcoming')) {
                        const originalText = button.textContent;
                        button.textContent = 'Registering...';
                        button.disabled = true;
                        
                        setTimeout(() => {
                            showNotification(`Successfully registered for: "${webinarTitle}"`, 'success');
                            button.textContent = 'Registered ✓';
                            button.style.background = '#10B981';
                        }, 2000);
                    } else {
                        showNotification(`Opening recorded webinar: "${webinarTitle}"`, 'info');
                    }
                });
            });

            // Tool functionality
            const toolButtons = document.querySelectorAll('.btn-tool');
            
            toolButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const toolTitle = e.target.closest('.tool-card').querySelector('h3').textContent;
                    showNotification(`Opening ${toolTitle}...`, 'info');
                });
            });

            // Template functionality
            const templateButtons = document.querySelectorAll('.btn-template');
            
            templateButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const templateTitle = e.target.closest('.template-card').querySelector('h3').textContent;
                    const action = button.textContent.toLowerCase();
                    
                    if (action.includes('download')) {
                        const originalText = button.textContent;
                        button.textContent = 'Downloading...';
                        button.disabled = true;
                        
                        setTimeout(() => {
                            showNotification(`${templateTitle} downloaded successfully!`, 'success');
                            button.textContent = originalText;
                            button.disabled = false;
                        }, 2000);
                    } else if (action.includes('preview')) {
                        showNotification(`Opening preview for ${templateTitle}`, 'info');
                    }
                });
            });

            // Contact buttons functionality
            const contactButtons = document.querySelectorAll('.btn-contact, .btn-cta, .btn-subscription');
            
            contactButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const action = button.textContent;
                    showNotification(`${action} - Our team will contact you shortly!`, 'success');
                });
            });

            // Load more functionality
            const loadMoreButton = document.querySelector('.btn-load-more');
            if (loadMoreButton) {
                loadMoreButton.addEventListener('click', () => {
                    showNotification('Loading more success stories...', 'info');
                    // Simulate loading more content
                    setTimeout(() => {
                        showNotification('6 more success stories loaded!', 'success');
                    }, 2000);
                });
            }

            // Smooth scrolling for anchor links
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

            // Intersection Observer for animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            // Observe elements for animation
            const animateElements = document.querySelectorAll('.guide-card, .case-study-card, .blog-card, .webinar-card, .tool-card, .template-card, .faq-category');
            
            animateElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });

            // Mobile navigation enhancement
            const mobileToggle = document.querySelector('.mobile-toggle');
            const navPlaceholder = document.querySelector('.nav-placeholder');

            if (mobileToggle && navPlaceholder) {
                mobileToggle.addEventListener('click', () => {
                    navPlaceholder.classList.toggle('active');
                    mobileToggle.classList.toggle('active');
                });

                // Close mobile menu when clicking on a link
                document.querySelectorAll('.nav-placeholder a').forEach(link => {
                    link.addEventListener('click', () => {
                        navPlaceholder.classList.remove('active');
                        mobileToggle.classList.remove('active');
                    });
                });
            }

            // Navbar scroll effect
            window.addEventListener('scroll', () => {
                const navbar = document.querySelector('.header-placeholder');
                if (navbar) {
                    if (window.scrollY > 50) {
                        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
                    } else {
                        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                    }
                }
            });
        });

        // Utility functions
        function showNotification(message, type = 'success') {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            
            // Style the notification
            notification.style.cssText = `
                position: fixed;
                top: 90px;
                right: 20px;
                background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#2563EB'};
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                z-index: 10000;
                animation: slideInRight 0.3s ease-out;
                max-width: 300px;
                font-weight: 600;
            `;
            
            document.body.appendChild(notification);
            
            // Remove notification after 4 seconds
            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }, 4000);
        }

        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        // Add CSS for notifications
        const notificationStyles = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }

            @media (max-width: 768px) {
                .nav-placeholder.active {
                    display: flex !important;
                    position: fixed;
                    top: 70px;
                    left: 0;
                    right: 0;
                    background: white;
                    flex-direction: column;
                    padding: 20px;
                    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
                    z-index: 999;
                }

                .mobile-toggle.active span:nth-child(1) {
                    transform: rotate(45deg) translate(5px, 5px);
                }

                .mobile-toggle.active span:nth-child(2) {
                    opacity: 0;
                }

                .mobile-toggle.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(7px, -6px);
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = notificationStyles;
        document.head.appendChild(styleSheet);
