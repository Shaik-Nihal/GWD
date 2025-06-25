// HERO STATS COUNTER ANIMATION
function animateStatistics() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        // Intersection Observer to trigger animation only when visible
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let current = 0;
                    const step = Math.max(1, Math.floor(target / 40)); // Animate over ~1 second
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            stat.textContent = target.toLocaleString();
                            clearInterval(timer);
                        } else {
                            stat.textContent = Math.ceil(current).toLocaleString();
                        }
                    }, 25);
                    observer.unobserve(stat); // Stop observing once animated
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% of the element is visible
        observer.observe(stat);
    });
}
window.addEventListener('DOMContentLoaded', animateStatistics);


// ROADMAP VISUALIZER INTERACTION (replaces old path visualizer)
document.querySelectorAll('.roadmap__step').forEach((step, idx, all) => {
    step.addEventListener('click', function() {
        all.forEach(s => s.classList.remove('active'));
        step.classList.add('active');
        
        // Progress bar animation in timeline
        let timelineProgress = document.querySelector('.roadmap__progress-bar');
        if (timelineProgress) {
            let percent = idx / (all.length - 1) * 100;
            timelineProgress.style.height = percent + '%';
        }
    });
});


// FEATURE CARDS EXPAND ON HOVER (for mobile: click)
// Note: The CSS already handles this with :hover. This JS adds click support for mobile.
document.querySelectorAll('.program-features__card').forEach(card => {
    card.addEventListener('click', (e) => {
        // Simple toggle for touch devices
        if (window.innerWidth < 1024) { // Affects only touch-likely devices
            const details = card.querySelector('.program-features__card-details');
            const isExpanded = details.style.maxHeight && details.style.maxHeight !== '0px';
            
            // Close all other cards
            document.querySelectorAll('.program-features__card-details').forEach(d => d.style.maxHeight = '0px');

            // Open the clicked one if it was closed
            if (!isExpanded) {
                details.style.maxHeight = details.scrollHeight + 'px';
            }
        }
    });
});


// SUPPORT MODULES CAROUSEL LOGIC
let moduleIndex = 0;
const modules = document.querySelectorAll('.support-modules__card');
const indicators = document.querySelectorAll('.support-modules .indicator');
const carouselPrevBtn = document.querySelector('.support-modules__controls .carousel-btn.prev');
const carouselNextBtn = document.querySelector('.support-modules__controls .carousel-btn.next');

function showModule(idx) {
    if (modules.length === 0) return;
    modules.forEach((m, i) => m.classList.toggle('active', i === idx));
    indicators.forEach((ind, i) => ind.classList.toggle('active', i === idx));
    moduleIndex = idx;
}

if (carouselPrevBtn) {
    carouselPrevBtn.onclick = () => showModule((moduleIndex - 1 + modules.length) % modules.length);
}
if (carouselNextBtn) {
    carouselNextBtn.onclick = () => showModule((moduleIndex + 1) % modules.length);
}
indicators.forEach((ind, i) => ind.onclick = () => showModule(i));
// Auto-play feature
setInterval(() => {
    if (document.hasFocus()) { // Only auto-play if the tab is active
       showModule((moduleIndex + 1) % modules.length);
    }
}, 8000);
// Initialize first slide
showModule(0);


// COUNTRY EXPLORER DOT TOOLTIP LOGIC
document.querySelectorAll('.country-explorer__dot').forEach(dot => {
    const tooltip = dot.querySelector('.dot-tooltip');
    
    function showTooltip() {
        // First, hide all other tooltips
        document.querySelectorAll('.country-explorer__dot').forEach(d => d.classList.remove('show-tooltip'));
        
        // Then, show this one
        dot.classList.add('show-tooltip');
        
        // Fill tooltip with data if it's not already filled
        if (!tooltip.innerHTML) {
            try {
                const data = JSON.parse(dot.getAttribute('data-country'));
                tooltip.innerHTML = `
                    <h3>${data.name}</h3>
                    <div class="licensing-requirements">
                        <strong>Requirements:</strong>
                        <ul>${data.requirements.map(r=>`<li>${r}</li>`).join('')}</ul>
                    </div>
                    <div class="timeline">
                        <span>Timeline: ${data.timeline}</span>
                    </div>
                `;
            } catch (e) {
                console.error("Failed to parse country data:", e);
                tooltip.innerHTML = "<p>Error loading data.</p>";
            }
        }
    }

    function hideTooltip() {
        dot.classList.remove('show-tooltip');
    }

    dot.addEventListener('mouseenter', showTooltip);
    dot.addEventListener('focus', showTooltip);
    dot.addEventListener('mouseleave', hideTooltip);
    dot.addEventListener('blur', hideTooltip);

    // For touch devices
    dot.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent the body click listener from firing immediately
        const isAlreadyShown = dot.classList.contains('show-tooltip');
        if (isAlreadyShown) {
            hideTooltip();
        } else {
            showTooltip();
        }
    });
});
// Dismiss all tooltips when clicking outside the map area
document.body.addEventListener('click', function(e) {
    if (!e.target.closest('.country-explorer__dot')) {
        document.querySelectorAll('.country-explorer__dot').forEach(d => d.classList.remove('show-tooltip'));
    }
});


// CONTACT MODAL LOGIC
const modal = document.getElementById('contactModal');
const openModalButtons = document.querySelectorAll('.open-modal-btn');
const closeModalButton = document.getElementById('closeModal');
const contactForm = document.getElementById('contactForm');

if (modal) {
    openModalButtons.forEach(btn => {
        btn.onclick = (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
        }
    });

    if (closeModalButton) {
        closeModalButton.onclick = () => {
            modal.style.display = 'none';
        };
    }

    window.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    };

    if (contactForm) {
        contactForm.onsubmit = (e) => {
            e.preventDefault();
            modal.style.display = 'none';
            // Here you would typically handle the form submission (e.g., via AJAX)
            alert('Thank you! Your information has been submitted.');
        };
    }
}


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