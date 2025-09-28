// ALFA LEARNING Static Website JavaScript
// Handles mobile menu, form interactions, animations, and tab functionality

function initializeApp() {
    // Initialize all components
    initMobileMenu();
    initAnimations();
    initForms();
    initSmoothScrolling();
    initLucideIcons();
    initTabs();
    // Language switcher and translation are initialized in each HTML file
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    // DOM is already ready
    initializeApp();
}

// Mobile Menu Toggle
function initMobileMenu() {
    // Add a small delay to ensure DOM is fully loaded
    setTimeout(function() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        // Debug logging
        console.log('Mobile menu init:', { mobileMenuBtn, mobileMenu });
        
        if (mobileMenuBtn && mobileMenu) {
            // Ensure the mobile menu starts hidden
            mobileMenu.classList.add('hidden');
            
            // Toggle mobile menu on button click
            mobileMenuBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Mobile menu button clicked');
                toggleMobileMenu();
            });

            // Also handle touch events for mobile devices
            mobileMenuBtn.addEventListener('touchstart', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Mobile menu button touched');
                toggleMobileMenu();
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', function(event) {
                if (mobileMenu && !mobileMenu.classList.contains('hidden') && 
                    !mobileMenuBtn.contains(event.target) && 
                    !mobileMenu.contains(event.target)) {
                    console.log('Clicked outside mobile menu, closing');
                    mobileMenu.classList.add('hidden');
                }
            });

            // Close mobile menu when touching outside on mobile devices
            document.addEventListener('touchstart', function(event) {
                if (mobileMenu && !mobileMenu.classList.contains('hidden') && 
                    !mobileMenuBtn.contains(event.target) && 
                    !mobileMenu.contains(event.target)) {
                    console.log('Touched outside mobile menu, closing');
                    mobileMenu.classList.add('hidden');
                }
            });

            // Close mobile menu when clicking on links
            const mobileLinks = mobileMenu.querySelectorAll('a');
            console.log('Found mobile links:', mobileLinks.length);
            mobileLinks.forEach(link => {
                link.addEventListener('click', function() {
                    console.log('Mobile link clicked, closing menu');
                    mobileMenu.classList.add('hidden');
                });
                
                // Also handle touch events for mobile devices
                link.addEventListener('touchstart', function(e) {
                    console.log('Mobile link touched, closing menu');
                    // Prevent default to avoid navigation issues on touch
                    e.preventDefault();
                    // Close menu first
                    mobileMenu.classList.add('hidden');
                    // Then navigate after a short delay
                    setTimeout(() => {
                        window.location.href = this.getAttribute('href');
                    }, 100);
                });
            });
        } else {
            console.log('Mobile menu elements not found');
        }
    }, 100); // Small delay to ensure DOM is ready
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        console.log('Toggling mobile menu, currently hidden:', mobileMenu.classList.contains('hidden'));
        mobileMenu.classList.toggle('hidden');
        console.log('Mobile menu hidden after toggle:', mobileMenu.classList.contains('hidden'));
    } else {
        console.log('Mobile menu element not found for toggle');
    }
}

// Initialize Lucide Icons
function initLucideIcons() {
    if (window.lucide) {
        window.lucide.createIcons();
    } else {
        // Retry after a short delay if lucide isn't loaded yet
        setTimeout(initLucideIcons, 100);
    }
}

// Intersection Observer for Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.hover\\:shadow-2xl, .group, .text-center');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// Form Handling
function initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Check if this is the enrollment form that should submit to Formspree
            const action = form.getAttribute('action');
            if (action && action.includes('formspree.io')) {
                // Allow Formspree forms to submit normally or via AJAX
                // We'll let the contact.html page handle this with its own event listener
                return;
            }
            
            // For other forms, prevent default and simulate submission
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
            submitBtn.classList.add('loading');
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Show success message
                showNotification('Form submitted successfully! We\'ll get back to you soon.', 'success');
                
                // Reset form
                form.reset();
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                submitBtn.classList.remove('loading');
            }, 2000);
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${getNotificationStyles(type)}`;
    notification.innerHTML = `
        <div class="flex items-center space-x-3">
            <i data-lucide="${getNotificationIcon(type)}" class="h-5 w-5"></i>
            <p class="font-medium">${message}</p>
            <button class="ml-auto text-current opacity-70 hover:opacity-100" onclick="this.parentElement.parentElement.remove()">
                <i data-lucide="x" class="h-4 w-4"></i>
            </button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Initialize icons in notification
    if (window.lucide) {
        window.lucide.createIcons();
    }
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationStyles(type) {
    switch (type) {
        case 'success':
            return 'bg-green-100 text-green-800 border border-green-200';
        case 'error':
            return 'bg-red-100 text-red-800 border border-red-200';
        case 'warning':
            return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
        default:
            return 'bg-blue-100 text-blue-800 border border-blue-200';
    }
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success':
            return 'check-circle';
        case 'error':
            return 'alert-circle';
        case 'warning':
            return 'alert-triangle';
        default:
            return 'info';
    }
}

// Smooth Scrolling for anchor links
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Calculate the center position of the viewport
                const viewportHeight = window.innerHeight;
                const elementHeight = targetElement.offsetHeight;
                const elementTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                // Calculate position to center the element in the viewport
                const centerPosition = elementTop - (viewportHeight / 2) + (elementHeight / 2);
                
                // Jump directly to the position without smooth scrolling
                window.scrollTo({
                    top: centerPosition
                });
            }
        });
    });
}

// Language Switching (for future implementation)
function switchLanguage(lang) {
    // This would handle language switching in a real implementation
    console.log('Switching to language:', lang);
    showNotification(`Language switched to ${lang.toUpperCase()}`, 'info');
}

// Contact Form Handling
function handleContactForm(formData) {
    // In a real implementation, this would send data to a server
    console.log('Contact form data:', formData);
    
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true, message: 'Thank you for your message!' });
        }, 2000);
    });
}

// Enrollment Form Handling
function handleEnrollmentForm(formData) {
    // In a real implementation, this would send data to a server
    console.log('Enrollment form data:', formData);
    
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true, message: 'Enrollment application submitted successfully!' });
        }, 2000);
    });
}

// Teacher Application Form Handling
function handleTeacherApplicationForm(formData) {
    // In a real implementation, this would send data to a server
    console.log('Teacher application form data:', formData);
    
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true, message: 'Teacher application submitted successfully!' });
        }, 2000);
    });
}

// Utility function to format form data
function getFormData(form) {
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    return data;
}

// Enhanced scroll behavior
function handleScroll() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.classList.add('backdrop-blur-lg', 'bg-opacity-95');
        } else {
            header.classList.remove('backdrop-blur-lg', 'bg-opacity-95');
        }
    }
}

// Add scroll event listener
window.addEventListener('scroll', handleScroll);

// Initialize tooltips (if needed)
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'absolute z-50 bg-gray-900 text-white text-sm px-2 py-1 rounded shadow-lg';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.id = 'tooltip';
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + 'px';
            tooltip.style.top = (rect.top - 30) + 'px';
            
            document.body.appendChild(tooltip);
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = document.getElementById('tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// Initialize components that need to be ready after full page load
window.addEventListener('load', function() {
    initTooltips();
    
    // Add loading complete class to body
    document.body.classList.add('loaded');
    
    // Refresh lucide icons one more time
    if (window.lucide) {
        window.lucide.createIcons();
    }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // Refresh icons when page becomes visible again
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }
});

// Export functions for global use
window.AlfaLearning = {
    showNotification,
    switchLanguage,
    handleContactForm,
    handleEnrollmentForm,
    handleTeacherApplicationForm
};

// Tab functionality
function initTabs() {
    const enrollmentTab = document.getElementById('enrollment-tab');
    const inquiryTab = document.getElementById('inquiry-tab');
    const enrollmentForm = document.getElementById('enrollment-form');
    const inquiryForm = document.getElementById('inquiry-form');
    
    if (enrollmentTab && inquiryTab && enrollmentForm && inquiryForm) {
        enrollmentTab.addEventListener('click', function() {
            // Switch to enrollment tab
            enrollmentTab.classList.add('bg-indigo-600', 'text-white');
            enrollmentTab.classList.remove('text-gray-600', 'hover:text-indigo-600');
            inquiryTab.classList.remove('bg-indigo-600', 'text-white');
            inquiryTab.classList.add('text-gray-600', 'hover:text-indigo-600');
            
            // Show enrollment form, hide inquiry form
            enrollmentForm.classList.remove('hidden');
            inquiryForm.classList.add('hidden');
        });
        
        inquiryTab.addEventListener('click', function() {
            // Switch to inquiry tab
            inquiryTab.classList.add('bg-indigo-600', 'text-white');
            inquiryTab.classList.remove('text-gray-600', 'hover:text-indigo-600');
            enrollmentTab.classList.remove('bg-indigo-600', 'text-white');
            enrollmentTab.classList.add('text-gray-600', 'hover:text-indigo-600');
            
            // Show inquiry form, hide enrollment form
            inquiryForm.classList.remove('hidden');
            enrollmentForm.classList.add('hidden');
        });
    }
}

// Language Switching
function initLanguageSwitcher() {
    // Get current language from localStorage or default to 'en'
    const currentLang = localStorage.getItem('language') || 'en';
    
    // Update the language display in the header
    const currentLanguageElement = document.getElementById('current-language');
    if (currentLanguageElement) {
        const langNames = {
            'en': 'EN',
            'id': 'ID',
            'zh': '中文'
        };
        currentLanguageElement.textContent = langNames[currentLang] || 'EN';
    }
    
    // Set the HTML lang attribute
    document.documentElement.lang = currentLang;
    
    // Add event listeners to language switcher buttons (both desktop and mobile)
    const languageLinks = document.querySelectorAll('[data-lang]');
    languageLinks.forEach(link => {
        // Remove any existing event listeners to prevent duplication
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        // Add click event listener
        newLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const selectedLang = this.getAttribute('data-lang');
            setCurrentLanguage(selectedLang);
        });
        
        // Also handle touch events for mobile devices
        newLink.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const selectedLang = this.getAttribute('data-lang');
            setCurrentLanguage(selectedLang);
        });
    });
    
    // Language dropdown functionality for desktop
    const languageDropdownBtn = document.getElementById('language-dropdown-btn');
    const languageDropdown = document.getElementById('language-dropdown');
    
    if (languageDropdownBtn && languageDropdown) {
        // Remove any existing event listeners to prevent duplication
        const newDropdownBtn = languageDropdownBtn.cloneNode(true);
        languageDropdownBtn.parentNode.replaceChild(newDropdownBtn, languageDropdownBtn);
        
        newDropdownBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            languageDropdown.classList.toggle('hidden');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (languageDropdownBtn && languageDropdown && 
                !newDropdownBtn.contains(e.target) && 
                !languageDropdown.contains(e.target)) {
                languageDropdown.classList.add('hidden');
            }
        });
        
        // Also handle touch events for mobile
        document.addEventListener('touchstart', function(e) {
            if (languageDropdownBtn && languageDropdown && 
                !newDropdownBtn.contains(e.target) && 
                !languageDropdown.contains(e.target)) {
                languageDropdown.classList.add('hidden');
            }
        });
    }
    
    // Translate the page content after initializing the language switcher
    translatePage();
}

// Function to set current language and reload the page
function setCurrentLanguage(lang) {
    localStorage.setItem('language', lang);
    // Update the language display immediately
    const currentLanguageElement = document.getElementById('current-language');
    if (currentLanguageElement) {
        const langNames = {
            'en': 'EN',
            'id': 'ID',
            'zh': '中文'
        };
        currentLanguageElement.textContent = langNames[lang] || 'EN';
    }
    // Translate the page content
    translatePage();
}

// Function to translate all elements with data-i18n attribute
function translatePage() {
    const lang = localStorage.getItem('language') || 'en';
    
    // Translate all elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        // Check if this element has a specific attribute to translate
        const attrToTranslate = element.getAttribute('data-i18n-attr');
        
        if (typeof translations !== 'undefined' && translations && translations[lang] && translations[lang][key]) {
            if (attrToTranslate) {
                // Translate a specific attribute
                element.setAttribute(attrToTranslate, translations[lang][key]);
            } else {
                // Translate the text content
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // Update the language display in the header
    const currentLanguageElement = document.getElementById('current-language');
    if (currentLanguageElement) {
        const langNames = {
            'en': 'EN',
            'id': 'ID',
            'zh': '中文'
        };
        currentLanguageElement.textContent = langNames[lang] || 'EN';
    }
    
    // Set the HTML lang attribute
    document.documentElement.lang = lang;
}
