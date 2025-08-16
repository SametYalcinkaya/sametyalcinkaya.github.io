// ===== MAIN JAVASCRIPT FILE =====
// This file handles general site functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initSmoothScrolling();
    initScrollAnimations();
    initLanguageSwitcher();
    initContactForm();
    initSearchFunctionality();
    initLazyLoading();
    initTooltips();
    
    console.log('🚀 Website loaded successfully!');
});

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    // Handle anchor links for smooth scrolling
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.about-item, .project-card, .blog-card');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll (mobile)
        if (window.innerWidth <= 768) {
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop;
    });
}

// ===== LANGUAGE SWITCHER =====
function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const currentLang = localStorage.getItem('preferred-language') || 'tr';
    
    // Set initial language
    setLanguage(currentLang);
    
    langButtons.forEach(btn => {
        if (btn.dataset.lang === currentLang) {
            btn.classList.add('active');
        }
        
        btn.addEventListener('click', function() {
            const selectedLang = this.dataset.lang;
            
            // Remove active class from all buttons
            langButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Set language
            setLanguage(selectedLang);
            
            // Save preference
            localStorage.setItem('preferred-language', selectedLang);
        });
    });
}

function setLanguage(lang) {
    // This is a basic implementation
    // In a real application, you would load different content or redirect to different pages
    document.documentElement.lang = lang;
    
    // Example of changing text content based on language
    const translations = {
        tr: {
            'nav-home': 'Ana Sayfa',
            'nav-about': 'Hakkımda',
            'nav-projects': 'Projelerim',
            'nav-research': 'Araştırmalarım',
            'nav-blog': 'Blog',
            'nav-notes': 'Ders Notlarım',
            'nav-contact': 'İletişim'
        },
        en: {
            'nav-home': 'Home',
            'nav-about': 'About Me',
            'nav-projects': 'My Projects',
            'nav-research': 'Research',
            'nav-blog': 'Blog',
            'nav-notes': 'Study Notes',
            'nav-contact': 'Contact'
        }
    };
    
    // Apply translations (basic example)
    Object.keys(translations[lang] || translations.tr).forEach(key => {
        const element = document.querySelector(`[data-translate="${key}"]`);
        if (element) {
            element.textContent = translations[lang][key];
        }
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Gönderiliyor...';
            submitBtn.disabled = true;
            
            try {
                // Simulate form submission (replace with actual endpoint)
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Show success message
                showNotification('Mesajınız başarıyla gönderildi!', 'success');
                this.reset();
                
            } catch (error) {
                // Show error message
                showNotification('Bir hata oluştu. Lütfen tekrar deneyin.', 'error');
            } finally {
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

// ===== SEARCH FUNCTIONALITY =====
function initSearchFunctionality() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (searchInput && searchResults) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            
            clearTimeout(searchTimeout);
            
            if (query.length < 2) {
                searchResults.innerHTML = '';
                searchResults.classList.add('hidden');
                return;
            }
            
            searchTimeout = setTimeout(() => {
                performSearch(query);
            }, 300);
        });
        
        // Hide results when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.add('hidden');
            }
        });
    }
}

async function performSearch(query) {
    const searchResults = document.getElementById('search-results');
    
    try {
        // Show loading
        searchResults.innerHTML = '<div class="search-loading">Aranıyor...</div>';
        searchResults.classList.remove('hidden');
        
        // Simulate search (replace with actual search logic)
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock search results
        const mockResults = [
            { title: 'Modern Web Development Trendleri', type: 'Blog', url: '/blog/modern-web-development.html' },
            { title: 'React Native Projesi', type: 'Proje', url: '/projects/react-native.html' },
            { title: 'JavaScript Ders Notları', type: 'Ders Notu', url: '/notes/javascript.html' }
        ].filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase())
        );
        
        displaySearchResults(mockResults);
        
    } catch (error) {
        searchResults.innerHTML = '<div class="search-error">Arama sırasında bir hata oluştu.</div>';
    }
}

function displaySearchResults(results) {
    const searchResults = document.getElementById('search-results');
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-no-results">Sonuç bulunamadı.</div>';
        return;
    }
    
    const resultsHTML = results.map(result => `
        <div class="search-result-item">
            <a href="${result.url}">
                <div class="search-result-title">${result.title}</div>
                <div class="search-result-type">${result.type}</div>
            </a>
        </div>
    `).join('');
    
    searchResults.innerHTML = resultsHTML;
}

// ===== LAZY LOADING =====
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===== TOOLTIPS =====
function initTooltips() {
    const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
    
    tooltipTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', showTooltip);
        trigger.addEventListener('mouseleave', hideTooltip);
        trigger.addEventListener('focus', showTooltip);
        trigger.addEventListener('blur', hideTooltip);
    });
}

function showTooltip(e) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = e.target.dataset.tooltip;
    
    document.body.appendChild(tooltip);
    
    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    
    setTimeout(() => tooltip.classList.add('show'), 10);
    
    e.target._tooltip = tooltip;
}

function hideTooltip(e) {
    const tooltip = e.target._tooltip;
    if (tooltip) {
        tooltip.remove();
        delete e.target._tooltip;
    }
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Auto hide after 5 seconds
    const autoHide = setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
        clearTimeout(autoHide);
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
}

// ===== UTILITY FUNCTIONS =====

// Debounce function
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

// Throttle function
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

// Format date
function formatDate(date, locale = 'tr-TR') {
    return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Panoya kopyalandı!', 'success');
    }).catch(() => {
        showNotification('Kopyalama başarısız!', 'error');
    });
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get reading time estimate
function getReadingTime(text) {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
}

// ===== CSS ANIMATIONS VIA JS =====
// Add these styles to support scroll animations
const animationStyles = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-on-scroll.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .navbar {
        transition: transform 0.3s ease, background-color 0.3s ease;
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: var(--shadow-md);
    }
    
    [data-theme="dark"] .navbar.scrolled {
        background: rgba(15, 23, 42, 0.98);
    }
    
    .tooltip {
        position: absolute;
        background: var(--text-primary);
        color: var(--bg-primary);
        padding: 0.5rem 0.75rem;
        border-radius: var(--radius-sm);
        font-size: 0.875rem;
        white-space: nowrap;
        z-index: 1000;
        opacity: 0;
        transform: translateY(5px);
        transition: opacity 0.2s ease, transform 0.2s ease;
        pointer-events: none;
    }
    
    .tooltip.show {
        opacity: 1;
        transform: translateY(0);
    }
    
    .tooltip::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: var(--text-primary) transparent transparent transparent;
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-primary);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        border-left: 4px solid #10b981;
    }
    
    .notification-error {
        border-left: 4px solid #ef4444;
    }
    
    .notification-content {
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 1.25rem;
        cursor: pointer;
        color: var(--text-secondary);
        padding: 0;
        width: 1.5rem;
        height: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        color: var(--text-primary);
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Export functions for use in other scripts
window.siteUtils = {
    showNotification,
    copyToClipboard,
    formatDate,
    getReadingTime,
    debounce,
    throttle,
    isInViewport
};
