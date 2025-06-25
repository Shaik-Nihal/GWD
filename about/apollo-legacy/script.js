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
// Advanced Scroll-triggered Fade-in
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  elements.forEach(el => {
    observer.observe(el);
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

  // CTA section buttons
  const startJourneyBtn = document.getElementById("startJourney")
  const speakExpertBtn = document.getElementById("speakExpert")

  if (startJourneyBtn) {
    startJourneyBtn.addEventListener("click", showModal)
  }

  if (speakExpertBtn) {
    speakExpertBtn.addEventListener("click", showModal)
  }

  // Contact form submission
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactFormSubmission)
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

// Enhanced opportunities section update
function updateOpportunitiesSection(content) {
  const opportunitiesTitle = document.getElementById("opportunitiesTitle")
  const opportunitiesSubtitle = document.getElementById("opportunitiesSubtitle")
  const opportunitiesGrid = document.getElementById("opportunitiesGrid")

  if (opportunitiesTitle) {
    opportunitiesTitle.textContent = `Opportunities in ${content.country}`
  }

  if (opportunitiesSubtitle) {
    opportunitiesSubtitle.textContent = "Discover tailored pathways for your location"
  }

  if (opportunitiesGrid && content.opportunities) {
    opportunitiesGrid.innerHTML = content.opportunities
      .map(
        (opportunity) => `
            <div class="opportunity-card fade-in">
                <div class="opportunity-icon">
                    <i class="${opportunity.icon}"></i>
                </div>
                <h3>${opportunity.title}</h3>
                <p>${opportunity.description}</p>
                <ul class="opportunity-features">
                    ${opportunity.features
                      .map(
                        (feature) => `
                        <li><i class="fas fa-check"></i> ${feature}</li>
                    `,
                      )
                      .join("")}
                </ul>
                <a href="#" class="btn btn-outline">Learn More</a>
            </div>
        `,
      )
      .join("")

    // Trigger animation
    setTimeout(() => {
      const cards = opportunitiesGrid.querySelectorAll(".opportunity-card")
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add("visible")
        }, index * 200)
      })
    }, 100)
  }
}

// Pathways Form Setup (unchanged)
function setupPathwaysForm() {
  const nextBtn = document.getElementById("nextStep")
  const prevBtn = document.getElementById("prevStep")
  const getStartedBtn = document.getElementById("getStarted")
  const form = document.getElementById("pathwaysForm")

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (validateCurrentStep()) {
        nextStep()
      }
    })
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", prevStep)
  }

  if (getStartedBtn) {
    getStartedBtn.addEventListener("click", showModal)
  }

  // Add change listeners to form inputs
  if (form) {
    const formInputs = form.querySelectorAll('input[type="radio"]')
    formInputs.forEach((input) => {
      input.addEventListener("change", () => {
        if (currentStep < 4) {
          setTimeout(() => {
            if (validateCurrentStep()) {
              nextStep()
            }
          }, 500)
        }
      })
    })
  }
}

function validateCurrentStep() {
  const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`)
  if (!currentStepElement) return true

  const requiredInputs = currentStepElement.querySelectorAll('input[type="radio"]')
  if (!requiredInputs.length) return true

  return Array.from(requiredInputs).some((input) => input.checked)
}

function nextStep() {
  if (currentStep < 4) {
    // Hide current step
    const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`)
    if (currentStepElement) currentStepElement.classList.remove("active")

    currentStep++


const nextStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`)
if (nextStepElement) nextStepElement.classList.add("active")

// Update progress bar or indicator if present
updateFormProgress()
  } else {
// Final step: show recommendations
showPathwayRecommendation()
  }
}

function prevStep() {
  if (currentStep > 1) {
// Hide current step
const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`)
if (currentStepElement) currentStepElement.classList.remove("active")

currentStep--

// Show previous step
const prevStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`)
if (prevStepElement) prevStepElement.classList.add("active")

updateFormProgress()
  }
}

function updateFormProgress() {
  const progressBar = document.getElementById("formProgress")
  if (progressBar) {
progressBar.style.width = `${(currentStep - 1) * 33}%`
  }
}

// Show pathway recommendation based on form selections and country
function showPathwayRecommendation() {
  const form = document.getElementById("pathwaysForm")
  if (!form) return

  // Collect form values
  const role = form.querySelector('input[name="role"]:checked')?.value
  const destination = form.querySelector('input[name="destination"]:checked')?.value
  const experience = form.querySelector('input[name="experience"]:checked')?.value

  // Determine pathway key (expand logic as needed for more countries)
  let pathwayKey = ""
  if (role === "nurse" && destination === "uk" && experience === "fresh") {
pathwayKey = "nurse-uk-fresh"
  } else if (role === "nurse" && destination === "usa" && (experience === "1-3" || experience === "3-5" || experience === "5+")) {
pathwayKey = "nurse-usa-1-3"
  } else if (role === "doctor" && destination === "uk" && (experience === "3-5" || experience === "5+")) {
pathwayKey = "doctor-uk-3-5"
  } else if (role === "allied" && destination === "uk" && experience === "5+") {
pathwayKey = "allied-uk-5+"
  }

  // Show recommendation if found
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
// Modal logic (unchanged)
function setupModal() {
  // Placeholder for modal logic
}

function showModal() {
  const modal = document.getElementById("modal")
  if (modal) {
modal.classList.add("active")
document.body.style.overflow = "hidden"
modal.querySelector(".modal-close").addEventListener("click", () => {
  modal.classList.remove("active")
  document.body.style.overflow = ""
})
  }
}

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

// Contact form submission (unchanged)
function handleContactFormSubmission(e) {
  e.preventDefault()
  // Placeholder for AJAX or form handling logic
  alert("Thank you for contacting us! We'll get back to you soon.")
}
