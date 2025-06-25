// Global variables
// const currentStoryIndex = 0; // First declaration removed, second one is at the end of the file.
// let currentStep = 1; // Removed as it's not used
let userLocation = null;

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

    if (selectorBtn && dropdown && flagSpan && nameSpan) {
        selectorBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            isOpen = !isOpen;
            dropdown.style.display = isOpen ? 'block' : 'none';
            selectorBtn.setAttribute('aria-expanded', String(isOpen));
        });

        document.addEventListener('click', function() {
            if (isOpen) {
                dropdown.style.display = 'none';
                selectorBtn.setAttribute('aria-expanded', 'false');
                isOpen = false;
            }
        });

        dropdown.querySelectorAll('.country-option').forEach(function(option) {
            option.addEventListener('click', function(e) {
                e.stopPropagation();
                const img = option.querySelector('img');
                if (flagSpan && nameSpan && dropdown && selectorBtn) {
                    flagSpan.innerHTML = img ? img.outerHTML : option.textContent.trim().charAt(0);
                    nameSpan.textContent = option.textContent.trim().replace(/^[^\w]+/, '');
                    dropdown.style.display = 'none';
                    selectorBtn.setAttribute('aria-expanded', 'false');
                    isOpen = false;
                }
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const mobileBtn = document.getElementById('mobileCountrySelectorBtn');
    const mobileDropdown = document.getElementById('mobileCountryDropdown');
    const mobileFlag = document.getElementById('mobileSelectedCountryFlag');
    const mobileName = document.getElementById('mobileSelectedCountryName');
    
    if (mobileBtn && mobileDropdown && mobileFlag && mobileName) { 
        const options = mobileDropdown.querySelectorAll('.mobile-country-option');
        if (options.length > 0) { // Ensure options exist before adding listeners
            mobileBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const expanded = mobileBtn.getAttribute('aria-expanded') === 'true';
                mobileBtn.setAttribute('aria-expanded', String(!expanded));
                mobileDropdown.style.display = expanded ? 'none' : 'block';
            });

            options.forEach(option => {
                option.addEventListener('click', function() {
                    const img = option.querySelector('img');
                    if (img && mobileFlag && mobileName && mobileDropdown && mobileBtn) {
                        mobileFlag.innerHTML = ''; 
                        mobileFlag.appendChild(img.cloneNode(true));
                        mobileName.textContent = option.textContent.trim();
                        mobileDropdown.style.display = 'none';
                        mobileBtn.setAttribute('aria-expanded', 'false');
                    }
                });
            });

            document.addEventListener('click', function(e) {
                if (mobileDropdown.style.display === 'block' && !mobileBtn.contains(e.target) && !mobileDropdown.contains(e.target)) {
                    mobileDropdown.style.display = 'none';
                    mobileBtn.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const stories = document.querySelectorAll('.story-card'); // This is likely for a different section if successStories array is used for main slider
    if (filterBtns.length > 0 && stories.length > 0) {
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
    }
});

// Main DOM Content Loaded Initializer
document.addEventListener("DOMContentLoaded", () => {
  initializeWebsite();
  setupEventListeners();
  // simulateLocationDetection(); // Commented out: relies on undefined countryContent & updateOpportunitiesSection
  setupIntersectionObserver();
  initializeLearningPath(); 
});

function initializeWebsite() {
  setupMobileNavigation();
  // setupPathwaysForm(); // Commented out: function is not defined
  setupSuccessStories(); 
  // setupModal(); // Commented out: function is not defined (core modal logic open/close is present)
  setupScrollEffects();
  setupMegaMenus();
}

function setupMobileNavigation() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileNav = document.getElementById("mobileNav");
  const mobileCloseBtn = document.getElementById("mobileCloseBtn");
  const mobileMenuToggles = document.querySelectorAll(".mobile-menu-toggle");

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileNav.classList.toggle("active");
      mobileMenuBtn.classList.toggle("active");
      document.body.style.overflow = mobileNav.classList.contains("active") ? "hidden" : "";
    });
  }

  if (mobileCloseBtn && mobileNav) {
    mobileCloseBtn.addEventListener("click", closeMobileMenu);
  }

  if (mobileNav) {
    mobileNav.addEventListener("click", (e) => {
      if (e.target === mobileNav) {
        closeMobileMenu();
      }
    });
  }

  mobileMenuToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      const submenu = toggle.nextElementSibling;
      const icon = toggle.querySelector("i");

      if (toggle.tagName === 'BUTTON' || (toggle.tagName === 'A' && toggle.getAttribute('href') === '#') || (submenu && submenu.classList.contains('mobile-submenu'))) {
        e.preventDefault();
      }

      if (submenu && submenu.classList && submenu.classList.contains('mobile-submenu')) {
        // Close other open submenus
        mobileMenuToggles.forEach((otherToggle) => {
            if (otherToggle !== toggle) {
                const otherSubmenu = otherToggle.nextElementSibling;
                if (otherSubmenu && otherSubmenu.classList && otherSubmenu.classList.contains('mobile-submenu') && otherSubmenu.classList.contains('active')) {
                    otherSubmenu.classList.remove("active");
                    const otherIcon = otherToggle.querySelector("i");
                    if (otherIcon) {
                        otherIcon.classList.remove("fa-chevron-up");
                        otherIcon.classList.add("fa-chevron-down");
                    }
                }
            }
        });
        // Toggle current submenu
        submenu.classList.toggle("active");
      }
      
      if (icon) { // Toggle icon for the clicked item
        icon.classList.toggle("fa-chevron-down");
        icon.classList.toggle("fa-chevron-up");
      }
    });
  });

  const mobileLinks = document.querySelectorAll(".mobile-nav a");
  mobileLinks.forEach((link) => {
    const hasSubmenu = link.classList.contains('mobile-menu-toggle') && link.nextElementSibling && link.nextElementSibling.classList.contains('mobile-submenu');
    if (!hasSubmenu) {
        link.addEventListener("click", closeMobileMenu);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileNav?.classList.contains("active")) {
      closeMobileMenu();
    }
  });
}

function closeMobileMenu() {
  const mobileNav = document.getElementById("mobileNav");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");

  if (mobileNav) mobileNav.classList.remove("active");
  if (mobileMenuBtn) mobileMenuBtn.classList.remove("active");
  document.body.style.overflow = "";

  const activeSubmenus = document.querySelectorAll(".mobile-submenu.active");
  activeSubmenus.forEach((submenu) => {
    submenu.classList.remove("active");
    const toggleIcon = submenu.previousElementSibling?.querySelector('i');
    if (toggleIcon) {
        toggleIcon.classList.remove("fa-chevron-up");
        toggleIcon.classList.add("fa-chevron-down");
    }
  });
}

function setupMegaMenus() {
  const menuItems = document.querySelectorAll(".menu-item.has-mega-menu, .menu-item.has-dropdown");

  menuItems.forEach((item) => {
    const subMenu = item.querySelector(".mega-menu, .dropdown-menu");
    if (subMenu) {
      let hideTimeout;
      item.addEventListener("mouseenter", () => {
        clearTimeout(hideTimeout);
        subMenu.style.opacity = "1";
        subMenu.style.visibility = "visible";
        subMenu.style.transform = subMenu.classList.contains('mega-menu') ? "translateX(-50%) translateY(0)" : "translateY(0)";
      });
      item.addEventListener("mouseleave", () => {
        hideTimeout = setTimeout(() => {
          subMenu.style.opacity = "0";
          subMenu.style.visibility = "hidden";
          subMenu.style.transform = subMenu.classList.contains('mega-menu') ? "translateX(-50%) translateY(-10px)" : "translateY(-10px)";
        }, 150);
      });
    }
  });
}

function setupEventListeners() {
  // IDs exploreOpportunities, findPathway, opportunities, pathways are not in the current HTML.
  document.addEventListener("click", handleSmoothScrolling);
}

function simulateLocationDetection() {
  // const countries = ["IN", "PH", "default"]; // Not used without updateContentBasedOnLocation
  // const randomCountry = countries[Math.floor(Math.random() * countries.length)];
  setTimeout(() => {
    // userLocation = randomCountry; // userLocation is not used elsewhere after this
    // updateContentBasedOnLocation(userLocation); // Commented out: relies on undefined countryContent
  }, 1000);
}

function updateContentBasedOnLocation(countryCode) {
  // const content = countryContent[countryCode] || countryContent["default"]; // Commented out: countryContent is not defined
  // const countryIndicator = document.getElementById("detectedCountry"); // This ID is not in HTML
  // if (countryIndicator && content) { /* ... */ }
  // const heroTitle = document.getElementById("heroTitle"); // This ID is not in HTML
  // const heroSubtitle = document.getElementById("heroSubtitle"); // This ID is not in HTML
  // if (heroTitle && content) { /* ... */ }
  // if (heroSubtitle && content) { /* ... */ }
  // if (content && content.stats) { /* ... */ }
  // updateOpportunitiesSection(content); // Commented out: updateOpportunitiesSection is not defined
}

function showPathwayRecommendation() {
  const form = document.getElementById("pathwaysForm"); // This ID is not in HTML
  if (!form) return;
  // const role = form.querySelector('input[name="role"]:checked')?.value;
  // const destination = form.querySelector('input[name="destination"]:checked')?.value;
  // const experience = form.querySelector('input[name="experience"]:checked')?.value;
  // let pathwayKey = "";
  // ... (logic for pathwayKey)
  // const recommendation = pathwayRecommendations[pathwayKey]; // Commented out: pathwayRecommendations is not defined
  const recommendationSection = document.getElementById("pathwayRecommendation"); // This ID is not in HTML
  // if (recommendation && recommendationSection) { /* ... */ 
    // document.getElementById("getStartedFinal").addEventListener("click", showModal); // Commented out: showModal is not defined
  // } else 
  if (recommendationSection) { // Only show the fallback if the section exists
    recommendationSection.innerHTML = `<p>Sorry, we couldn't find a recommended pathway. Please contact our team.</p>`;
    recommendationSection.style.display = "block";
  }
}

// Merged DOMContentLoaded for smooth scrolling from later in the original file
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith("#") && href.length > 1) { // Ensure it's a valid hash
                const targetId = href.substring(1);
                const target = document.getElementById(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});

function setupScrollEffects() {
  // Placeholder
}

function setupIntersectionObserver() {
  const fadeEls = document.querySelectorAll(".fade-in");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    fadeEls.forEach((el) => observer.observe(el));
  } else {
    fadeEls.forEach((el) => el.classList.add("visible"));
  }
}

function handleSmoothScrolling(e) { // This function is called from setupEventListeners
    const anchor = e.target.closest('a');
    if (anchor && anchor.hash && anchor.hash !== "#") {
        const targetElement = document.querySelector(anchor.hash);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
    }
}

// Global variables for success story slider
let currentModalOpen = null; // This seems more for general modals than success stories
let currentStoryIndex = 0; // Kept this declaration, removed the one at the top

const successStories = [
    { quote: "In just 3 months I passed OSCE and now serve in Berlin. The language training and cultural preparation made all the difference. The support team was incredible throughout my journey.", name: "Sandra Rodriguez", position: "Registered Nurse, Berlin Medical Center", image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop", fromFlag: "🇵🇭", toFlag: "🇩🇪", location: "Philippines → Germany" },
    { quote: "Apollo's Doc EDGE program gave me the confidence and skills to pass USMLE and secure my residency in New York. The comprehensive training was exceptional.", name: "Dr. Raj Patel", position: "Internal Medicine Resident, NYU Langone", image: "https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop", fromFlag: "🇮🇳", toFlag: "🇺🇸", location: "India → United States" },
    { quote: "The Allied EDGE program transformed my career. I'm now working as a senior physiotherapist in Toronto with excellent support from Apollo's network.", name: "Maria Santos", position: "Senior Physiotherapist, Toronto General", image: "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop", fromFlag: "🇵🇭", toFlag: "🇨🇦", location: "Philippines → Canada" }
];

// DOMContentLoaded for this section of script (success stories, modals etc.)
document.addEventListener('DOMContentLoaded', function() {
    initializeModalEventListeners(); // Renamed to avoid conflict if any
    if (document.querySelector('.success-story-card') && document.querySelectorAll('.story-indicators .indicator').length > 0) {
        updateSuccessStory(); // Initial display
        setInterval(nextStory, 7000); 
    }
    // console.log('Apollo Healthcare Global website section 2 initialized'); // Differentiated log
});

function initializeModalEventListeners() { // Renamed
    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                closeModal(modal.id);
            }
        });
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && currentModalOpen) {
            closeModal(currentModalOpen);
        }
    });
}

function openContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.add('active');
        currentModalOpen = 'contactModal';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        currentModalOpen = null;
        document.body.style.overflow = '';
    }
}

function scrollToPrograms() {
    const element = document.getElementById('programs');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function setupSuccessStories() { // Called from main initializeWebsite
    if (document.querySelector('.success-story-card') && document.querySelectorAll('.story-indicators .indicator').length > 0) {
        updateSuccessStory();
        // Interval is set in its own DOMContentLoaded listener to avoid multiple intervals if initializeWebsite is called again.
    }
}

function updateSuccessStory() {
    const storyCard = document.querySelector('.success-story-card');
    const indicators = document.querySelectorAll('.story-indicators .indicator');
    
    if (!storyCard || successStories.length === 0 || indicators.length === 0) return;
    if (currentStoryIndex < 0 || currentStoryIndex >= successStories.length) currentStoryIndex = 0;
    
    const story = successStories[currentStoryIndex];
    if (!story) return;

    storyCard.innerHTML = `
        <div class="story-quote">
            <i class="fas fa-quote-left"></i>
            <p>"${story.quote}"</p>
        </div>
        <div class="story-author">
            <div class="author-image">
                <img src="${story.image}" alt="${story.name}">
            </div>
            <div class="author-info">
                <h4>${story.name}</h4>
                <p>${story.position}</p>
                <div class="story-location">
                    <span class="flag">${story.fromFlag}</span>
                    <i class="fas fa-arrow-right"></i>
                    <span class="flag">${story.toFlag}</span>
                    <span>${story.location}</span>
                </div>
            </div>
        </div>`;
    
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentStoryIndex);
    });
}

function nextStory() {
    currentStoryIndex = (currentStoryIndex + 1) % successStories.length;
    updateSuccessStory();
}

function previousStory() {
    currentStoryIndex = (currentStoryIndex - 1 + successStories.length) % successStories.length;
    updateSuccessStory();
}

function showStory(index) {
    if (index >= 0 && index < successStories.length) {
        currentStoryIndex = index;
        updateSuccessStory();
    }
}

function initializeLearningPath() {
    const pathSteps = document.querySelectorAll('.path-step');
    const stepDetails = document.querySelectorAll('.step-detail');
    
    if (pathSteps.length > 0 && stepDetails.length > 0 && stepDetails.length === pathSteps.length) {
        showPathStep(0);
        pathSteps.forEach((step, index) => {
            step.addEventListener('click', () => showPathStep(index));
        });
    }
}

function showPathStep(index) {
    const pathSteps = document.querySelectorAll('.path-step');
    const stepDetails = document.querySelectorAll('.step-detail');
    
    if (index < 0 || index >= stepDetails.length || index >= pathSteps.length) return;

    pathSteps.forEach(step => step.classList.remove('active'));
    stepDetails.forEach(detail => detail.classList.remove('active'));
    
    if (pathSteps[index]) pathSteps[index].classList.add('active');
    if (stepDetails[index]) stepDetails[index].classList.add('active');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '1rem 1.5rem';
    notification.style.borderRadius = '8px';
    notification.style.color = 'white';
    notification.style.fontWeight = '500';
    notification.style.zIndex = '10000';
    notification.style.maxWidth = '400px';
    notification.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    notification.style.animation = 'slideInNotification 0.3s ease-out'; // Renamed keyframe

    switch(type) {
        case 'success': notification.style.background = 'linear-gradient(45deg, #059669, #10b981)'; break;
        case 'error': notification.style.background = 'linear-gradient(45deg, #dc2626, #ef4444)'; break;
        default: notification.style.background = 'linear-gradient(45deg, #008ED2, #3b82f6)'; break;
    }
    notification.textContent = message;

    if (!document.querySelector('#notification-styles')) {
        const animationStyle = document.createElement('style');
        animationStyle.id = 'notification-styles';
        animationStyle.textContent = `
            @keyframes slideInNotification { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            @keyframes slideOutNotification { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
        `;
        document.head.appendChild(animationStyle);
    }
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutNotification 0.3s ease-in'; // Renamed keyframe
        setTimeout(() => { if (notification.parentNode) notification.parentNode.removeChild(notification); }, 300);
    }, 5000);
}


// Global error handler
window.addEventListener('error', function(e) {
    console.error('Apollo GWD Error:', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        errorObject: e.error // For more detailed stack trace if available
    });
});

console.log('Apollo Healthcare Global script_v2.js loaded and initialized.');


// --- ENHANCED EDGE SECTION LOGIC --- //

const edgeDetailsData = {
  nurse: {
    title: "Nurse EDGE Program",
    blurb: "Advance your nursing career internationally with Apollo’s Nurse EDGE. Comprehensive preparation, language mastery, and professional skills for global excellence.",
    icon: `<svg width="40" height="40" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24">
      <path d="M12 3c-6 0-8.5 4.5-8.5 8l1.5 6c0 .6.5 1 1 1h12c.5 0 1-.4 1-1l1.5-6c0-3.5-2.5-8-8.5-8z" />
      <path d="M9 12h6" />
      <path d="M12 9v6" />
    </svg>`,
    programs: [
      {
        title: "Clinical Certifications (OSCE)",
        desc: "Intensive, hands-on OSCE preparation with mock exams and expert mentorship.",
        image: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&w=400&h=250&fit=crop",
        link: "/training/nurse-edge/clinical-certifications/index.html"
      },
      {
        title: "Language & Communication (IELTS, German)",
        desc: "Targeted language training in medical English and German, plus communication workshops.",
        image: "https://images.pexels.com/photos/5452203/pexels-photo-5452203.jpeg?auto=compress&w=400&h=250&fit=crop",
        link: "/training/nurse-edge/language-communication/index.html"
      },
      {
        title: "Professional Etiquette & Soft Skills",
        desc: "Master professional behavior, cultural awareness, and soft skills for international settings.",
        image: "https://images.pexels.com/photos/5452210/pexels-photo-5452210.jpeg?auto=compress&w=400&h=250&fit=crop",
        link: "/training/nurse-edge/professional-etiquette/index.html"
      },
      {
        title: "Country Specific Readiness",
        desc: "Guidance and readiness for licensing, interviews, and practice in your destination country.",
        image: "https://images.pexels.com/photos/5452205/pexels-photo-5452205.jpeg?auto=compress&w=400&h=250&fit=crop",
        link: "/training/nurse-edge/country-specific/index.html"
      }
    ]
  },
  doc: {
    title: "Doc EDGE Program",
    blurb: "Prepare for global medical practice through Apollo’s Doc EDGE: exam mastery, licensing, and advanced fellowships.",
    icon: `<svg width="40" height="40" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24">
      <circle cx="17" cy="18" r="2" />
      <path d="M19 18v-6c0-1.1-.9-2-2-2s-2 .9-2 2v6" />
      <path d="M6 4v6a6 6 0 006 6" />
      <path d="M6 10V4" />
      <path d="M9 4H3" />
    </svg>`,
    programs: [
      {
        title: "Clinical Certifications (PLAB, OSCE, USMLE, etc.)",
        desc: "Expert-led PLAB, OSCE, and USMLE prep with case simulations and personalized feedback.",
        image: "https://images.pexels.com/photos/8460158/pexels-photo-8460158.jpeg?auto=compress&w=400&h=250&fit=crop",
        link: "/training/doc-edge/clinical-certifications/index.html"
      },
      {
        title: "Licensing Assistance & Country Specific Readiness",
        desc: "End-to-end support for licensing exams, paperwork, and country-specific requirements.",
        image: "https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg?auto=compress&w=400&h=250&fit=crop",
        link: "/training/doc-edge/licensing/index.html"
      },
      {
        title: "Fellowships (NHS)",
        desc: "Get placed in prestigious NHS fellowships for hands-on, world-class clinical exposure.",
        image: "https://images.pexels.com/photos/8460157/pexels-photo-8460157.jpeg?auto=compress&w=400&h=250&fit=crop",
        link: "/training/doc-edge/fellowships/index.html"
      }
    ]
  },
  allied: {
    title: "Allied EDGE Program",
    blurb: "Specialized growth for Allied Health professionals: certification, licensing, and country-specific expertise.",
    icon: `<svg width="40" height="40" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24">
      <rect rx="2" width="20" height="20" x="2" y="2" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    </svg>`,
    programs: [
      {
        title: "Clinical Certifications",
        desc: "Practical certification programs for radiographers, pharmacists, and other allied roles.",
        image: "https://images.pexels.com/photos/5722165/pexels-photo-5722165.jpeg?auto=compress&w=400&h=250&fit=crop",
        link: "/training/allied-edge/clinical-certifications/index.html"
      },
      {
        title: "Country Specific Readiness",
        desc: "Be ready for the workplace in your chosen country: healthcare system orientation, compliance, and culture.",
        image: "https://images.pexels.com/photos/5722168/pexels-photo-5722168.jpeg?auto=compress&w=400&h=250&fit=crop",
        link: "/training/allied-edge/country-specific/index.html"
      },
      {
        title: "Licensing Assistance",
        desc: "Personalized support for allied health licensing and paperwork for global mobility.",
        image: "https://images.pexels.com/photos/5722167/pexels-photo-5722167.jpeg?auto=compress&w=400&h=250&fit=crop",
        link: "/training/allied-edge/licensing/index.html"
      }
    ]
  }
};

// Render the EDGE details section with animation/icons/buttons
function showEdgeDetails(edge) {
  const section = document.getElementById('edge-details-section');
  const title = document.getElementById('edge-details-title');
  const blurb = document.getElementById('edge-details-blurb');
  const content = document.getElementById('edge-details-content');
  const tabBtns = document.querySelectorAll('.edge-tab-btn');
  section.style.display = 'block';
  tabBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.edge === edge));

  // Section title with icon
  title.innerHTML = `<span class="edge-details-icon" style="vertical-align:middle;display:inline-block;margin-right:12px;background:#f3f8fa;border-radius:50%;border:3px solid #dbeafe;padding:3px;">${edgeDetailsData[edge].icon}</span>${edgeDetailsData[edge].title}`;
  blurb.textContent = edgeDetailsData[edge].blurb;

  // Build program cards
  const programs = edgeDetailsData[edge].programs.map((prog, i) => `
    <div class="program-detail-card" style="animation-delay:${i*0.1}s">
      <div class="program-detail-image">
        <img src="${prog.image}" alt="${prog.title}">
      </div>
      <div class="program-detail-body">
        <h3>${prog.title}</h3>
        <p>${prog.desc}</p>
        <a href="${prog.link}" class="btn btn-primary view-program-btn" target="_blank">
          <i class="fas fa-arrow-right"></i> View Program
        </a>
      </div>
    </div>
  `).join('');
  content.innerHTML = `<div class="program-detail-grid">${programs}</div>`;
}

// Called by the "Learn More" buttons in the program cards
function openProgramModal(program) {
  showEdgeDetails(program);
  document.getElementById('edge-details-section').scrollIntoView({behavior: "smooth"});
}