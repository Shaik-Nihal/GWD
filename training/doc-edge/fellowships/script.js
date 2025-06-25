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

// ===== Enhanced Fee Structure Slider =====
let feePlans = [
  {
    img: "https://images.pexels.com/photos/5214996/pexels-photo-5214996.jpeg",
    title: "NHS Fellowship Pro",
    cost: "Consultation-Based",
    details: "Comprehensive personalized guidance from program selection to onboarding in the UK's NHS.",
    benefits: [
      "Personal pathway advisor",
      "Mock interviews & CV clinics",
      "Visa & relocation support"
    ]
  },
  {
    img: "https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg",
    title: "Global Fellowship Plus",
    cost: "Custom Quote",
    details: "Full support for fellowships in USA, Germany, Australia & more. Includes credentialing & local integration.",
    benefits: [
      "Country selection & matching",
      "Credentialing & licensing help",
      "Local alumni buddy system"
    ]
  },
  {
    img: "https://images.pexels.com/photos/3845625/pexels-photo-3845625.jpeg",
    title: "Academic & Research Boost",
    cost: "Project-Based",
    details: "Mentored research projects, publication support, and conference grant assistance for academic career growth.",
    benefits: [
      "Mentored research project",
      "Publication support",
      "Conference grant assistance"
    ]
  }
];

let feeCurrent = 0;

function renderFeeSlider(idx) {
  const plan = feePlans[idx];
  const imgElement = document.querySelector('.fee-slider-img img');
  const titleElement = document.querySelector('.fee-slider-title');
  const costElement = document.querySelector('.fee-slider-cost');
  const detailsElement = document.querySelector('.fee-slider-details');
  const benefitsElement = document.querySelector('.fee-slider-benefits');
  
  if (imgElement) imgElement.src = plan.img;
  if (titleElement) titleElement.textContent = plan.title;
  if (costElement) costElement.textContent = plan.cost;
  if (detailsElement) detailsElement.textContent = plan.details;

  // Benefits list
  if (benefitsElement) {
    benefitsElement.innerHTML = '';
    plan.benefits.forEach(benefit => {
      const li = document.createElement('li');
      li.textContent = benefit;
      benefitsElement.appendChild(li);
    });
  }

  // Update dots
  document.querySelectorAll('.fee-slider-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === idx);
  });
}

// ===== Enhanced Modal Logic =====
function initializeModal() {
  const modal = document.getElementById('contactModal');
  const openButtons = document.querySelectorAll('.open-modal-btn');
  const closeButton = document.getElementById('closeModal');

  openButtons.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeButton) {
    closeButton.addEventListener('click', function () {
      if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }

  // Close modal when clicking outside
  window.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Close modal on escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal && modal.style.display === 'flex') {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
}

// ===== Enhanced Smooth Scrolling =====
function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ===== Enhanced Video Play Buttons =====
function initializeVideoButtons() {
  document.querySelectorAll('.play-video-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      // Enhanced video modal could be implemented here
      const videoCard = this.closest('.testimonial-card');
      const authorName = videoCard.querySelector('.author-details h4')?.textContent || 'Doctor';
      
      // Create a more sophisticated notification
      showNotification(`${authorName}'s success story video will be available soon!`);
    });
  });
}

// ===== Enhanced Modules Carousel =====
let currentModuleIndex = 0;
const modules = document.querySelectorAll('.module-card');
const indicators = document.querySelectorAll('.indicator');

function showModule(index) {
  modules.forEach((module, i) => {
    module.classList.toggle('active', i === index);
    module.classList.remove('flipped');
  });
  indicators.forEach((indicator, i) => {
    indicator.classList.toggle('active', i === index);
  });
  currentModuleIndex = index;
}

function nextModule() {
  const nextIndex = (currentModuleIndex + 1) % modules.length;
  showModule(nextIndex);
}

function previousModule() {
  const prevIndex = (currentModuleIndex - 1 + modules.length) % modules.length;
  showModule(prevIndex);
}

function currentModule(index) {
  showModule(index - 1);
}

// ===== Enhanced Flip Card Interactions =====
function initializeFlipCards() {
  modules.forEach((module) => {
    // Touch/tap support for mobile
    module.addEventListener('touchstart', function (e) {
      e.preventDefault();
      modules.forEach(m => { 
        if (m !== module) m.classList.remove('flipped'); 
      });
      module.classList.toggle('flipped');
    });

    // Mouse interactions for desktop
    module.addEventListener('mouseenter', function () {
      module.classList.add('flipped');
    });

    module.addEventListener('mouseleave', function () {
      module.classList.remove('flipped');
    });

    // Click support for better accessibility
    module.addEventListener('click', function () {
      modules.forEach(m => { 
        if (m !== module) m.classList.remove('flipped'); 
      });
      module.classList.toggle('flipped');
    });
  });
}

// ===== Enhanced Intersection Observer for Animations =====
function initializeScrollAnimations() {
  const animatedElements = document.querySelectorAll('.anim-overview-card, .creative-trail-step, .impact-card, .testimonial-card');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    animatedElements.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }
}

// ===== Enhanced Form Validation =====
function initializeFormValidation() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'profession'];
    const consentField = form.querySelector('[name="consent"]');
    let isValid = true;
    let firstInvalidField = null;

    // Clear previous error states
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

    // Validate required fields
    requiredFields.forEach(fieldName => {
      const field = form.querySelector(`[name="${fieldName}"]`);
      if (field && !field.value.trim()) {
        field.classList.add('error');
        if (!firstInvalidField) firstInvalidField = field;
        isValid = false;
      }
    });

    // Validate email format
    const emailField = form.querySelector('[name="email"]');
    if (emailField && emailField.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailField.value)) {
        emailField.classList.add('error');
        if (!firstInvalidField) firstInvalidField = emailField;
        isValid = false;
      }
    }

    // Validate consent
    if (consentField && !consentField.checked) {
      consentField.closest('.checkbox-group').classList.add('error');
      if (!firstInvalidField) firstInvalidField = consentField;
      isValid = false;
    }

    if (!isValid) {
      showNotification('Please complete all required fields correctly.', 'error');
      if (firstInvalidField) {
        firstInvalidField.focus();
      }
      return;
    }

    // Simulate form submission
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;

    setTimeout(() => {
      showNotification('Thank you! Your application has been submitted successfully.', 'success');
      form.reset();
      document.getElementById('contactModal').style.display = 'none';
      document.body.style.overflow = 'auto';
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 2000);
  });

  // Add error styling
  const style = document.createElement('style');
  style.textContent = `
    .error input, .error select, .error textarea {
      border-color: var(--error) !important;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    .checkbox-group.error {
      color: var(--error);
    }
  `;
  document.head.appendChild(style);
}

// ===== Enhanced Notification System =====
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());

  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Styling
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '16px 24px',
    borderRadius: '12px',
    color: '#fff',
    fontWeight: '600',
    fontSize: '14px',
    zIndex: '10000',
    maxWidth: '400px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    transform: 'translateX(100%)',
    transition: 'transform 0.3s ease',
    cursor: 'pointer'
  });

  // Type-specific styling
  const colors = {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6'
  };
  notification.style.background = colors[type] || colors.info;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Auto remove
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => notification.remove(), 300);
  }, 5000);

  // Click to dismiss
  notification.addEventListener('click', () => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => notification.remove(), 300);
  });
}

// ===== Enhanced Header Scroll Effect =====
function initializeHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateHeader() {
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
      header.style.background = 'rgba(255, 255, 255, 0.98)';
      header.style.backdropFilter = 'blur(20px)';
      header.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.backdropFilter = 'blur(10px)';
      header.style.boxShadow = 'none';
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick);
}

// ===== Auto-advance Fee Slider =====
function initializeFeeSliderAutoAdvance() {
  if (!document.querySelector('.fee-slider-dot')) return;

  setInterval(() => {
    feeCurrent = (feeCurrent + 1) % feePlans.length;
    renderFeeSlider(feeCurrent);
  }, 8000);
}

// ===== Auto-advance Module Carousel =====
function initializeModuleCarouselAutoAdvance() {
  if (modules.length === 0) return;

  setInterval(() => {
    nextModule();
  }, 10000);
}

// ===== Country Selector (Enhanced) =====
function initializeCountrySelector() {
  const selectorBtn = document.getElementById('countrySelectorBtn');
  const dropdown = document.getElementById('countryDropdown');
  const options = document.querySelectorAll('.country-option');

  if (!selectorBtn || !dropdown) return;

  selectorBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdown.style.display === 'block';
    dropdown.style.display = isOpen ? 'none' : 'block';
    selectorBtn.setAttribute('aria-expanded', !isOpen);
  });

  options.forEach(option => {
    option.addEventListener('click', () => {
      const country = option.dataset.country;
      const countryName = option.textContent.trim();
      const flagImg = option.querySelector('img');
      
      if (flagImg) {
        document.getElementById('selectedCountryFlag').innerHTML = flagImg.outerHTML;
      }
      document.getElementById('selectedCountryName').textContent = countryName;
      
      dropdown.style.display = 'none';
      selectorBtn.setAttribute('aria-expanded', 'false');
      
      showNotification(`Country preference updated to ${countryName}`, 'success');
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', () => {
    dropdown.style.display = 'none';
    selectorBtn.setAttribute('aria-expanded', 'false');
  });
}

// ===== Mobile Menu (Enhanced) =====
function initializeMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');
  const mobileMenuToggles = document.querySelectorAll('.mobile-menu-toggle');

  if (!mobileMenuBtn || !mobileNav) return;

  function openMobileMenu() {
    mobileNav.style.display = 'block';
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      mobileNav.style.transform = 'translateX(0)';
    }, 10);
  }

  function closeMobileMenu() {
    mobileNav.style.transform = 'translateX(100%)';
    setTimeout(() => {
      mobileNav.style.display = 'none';
      document.body.style.overflow = 'auto';
    }, 300);
  }

  mobileMenuBtn.addEventListener('click', openMobileMenu);
  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', closeMobileMenu);
  }

  // Handle submenu toggles
  mobileMenuToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      if (toggle.tagName === 'BUTTON') {
        e.preventDefault();
        const submenu = toggle.nextElementSibling;
        if (submenu) {
          const isOpen = submenu.style.display === 'block';
          submenu.style.display = isOpen ? 'none' : 'block';
          toggle.classList.toggle('active', !isOpen);
        }
      }
    });
  });

  // Close mobile menu when clicking outside
  mobileNav.addEventListener('click', (e) => {
    if (e.target === mobileNav) {
      closeMobileMenu();
    }
  });
}

// ===== Main Initialization =====
document.addEventListener('DOMContentLoaded', function () {
  // Initialize fee structure slider
  if (document.querySelector('.fee-slider-dot')) {
    document.querySelectorAll('.fee-slider-dot').forEach((dot, i) => {
      dot.addEventListener('click', () => {
        feeCurrent = i;
        renderFeeSlider(i);
      });
    });
    renderFeeSlider(feeCurrent);
    initializeFeeSliderAutoAdvance();
  }

  // Initialize all components
  initializeModal();
  initializeSmoothScroll();
  initializeVideoButtons();
  initializeFlipCards();
  initializeScrollAnimations();
  initializeFormValidation();
  initializeHeaderScroll();
  initializeModuleCarouselAutoAdvance();
  initializeCountrySelector();
  initializeMobileMenu();

  // Add loading animation completion
  document.body.classList.add('loaded');
});

// ===== Performance Optimizations =====
// Debounce function for scroll events
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

// Throttle function for resize events
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

// ===== Accessibility Enhancements =====
document.addEventListener('keydown', function(e) {
  // Escape key handling for modals and dropdowns
  if (e.key === 'Escape') {
    // Close any open modals
    const openModal = document.querySelector('.modal[style*="flex"]');
    if (openModal) {
      openModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
    
    // Close any open dropdowns
    const openDropdown = document.querySelector('.country-dropdown[style*="block"]');
    if (openDropdown) {
      openDropdown.style.display = 'none';
    }
  }
});

// ===== Error Handling =====
window.addEventListener('error', function(e) {
  console.error('JavaScript error:', e.error);
  // Could implement error reporting here
});

// ===== Service Worker Registration (for future PWA features) =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    // Service worker registration could be added here for offline functionality
  });
}