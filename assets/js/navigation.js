// ===== NAVIGATION MANAGEMENT =====
// This file handles navigation functionality including mobile menu

document.addEventListener('DOMContentLoaded', function() {
    initMobileNavigation();
    initActiveNavigation();
    initScrollNavigation();
    initKeyboardNavigation();
    
    console.log('📱 Navigation initialized successfully!');
});

// ===== MOBILE NAVIGATION =====
function initMobileNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;
    
    if (!hamburger || !navMenu) return;
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        toggleMobileMenu();
    });
    
    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && 
            !navMenu.contains(e.target) && 
            navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
            hamburger.focus();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', handleWindowResize);
    
    function toggleMobileMenu() {
        const isOpen = navMenu.classList.contains('active');
        
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
    
    function openMobileMenu() {
        hamburger.classList.add('active');
        navMenu.classList.add('active');
        body.style.overflow = 'hidden';
        
        // Focus first nav link for accessibility
        const firstLink = navMenu.querySelector('.nav-link');
        if (firstLink) {
            setTimeout(() => firstLink.focus(), 100);
        }
        
        // Update aria attributes
        hamburger.setAttribute('aria-expanded', 'true');
        navMenu.setAttribute('aria-hidden', 'false');
    }
    
    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
        
        // Update aria attributes
        hamburger.setAttribute('aria-expanded', 'false');
        navMenu.setAttribute('aria-hidden', 'true');
    }
    
    function handleWindowResize() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    }
}

// ===== ACTIVE NAVIGATION =====
function initActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Set initial active link based on current page
    setActiveNavLink();
    
    // Update active link on scroll (for single page navigation)
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateActiveNavOnScroll);
            ticking = true;
        }
    });
    
    function updateActiveNavOnScroll() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                updateActiveLink(sectionId);
            }
        });
        
        ticking = false;
    }
    
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            const linkPage = linkPath.split('/').pop();
            
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    function updateActiveLink(sectionId) {
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            if (href === `#${sectionId}`) {
                link.classList.add('active');
            } else if (href.startsWith('#')) {
                link.classList.remove('active');
            }
        });
    }
}

// ===== SCROLL NAVIGATION =====
function initScrollNavigation() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    let scrollTimeout;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        
        // Hide/show navbar on mobile
        if (window.innerWidth <= 768) {
            clearTimeout(scrollTimeout);
            
            if (currentScroll > lastScrollTop && currentScroll > 200) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
            
            // Show navbar after scroll stops
            scrollTimeout = setTimeout(() => {
                navbar.style.transform = 'translateY(0)';
            }, 150);
        }
        
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
    
    // Reset navbar transform on resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navbar.style.transform = '';
        }
    });
}

// ===== KEYBOARD NAVIGATION =====
function initKeyboardNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.getElementById('hamburger');
    
    // Handle keyboard navigation in mobile menu
    document.addEventListener('keydown', function(e) {
        const navMenu = document.getElementById('nav-menu');
        
        if (!navMenu.classList.contains('active')) return;
        
        const focusableElements = navMenu.querySelectorAll('.nav-link');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
    
    // Add keyboard event listeners to nav links
    navLinks.forEach(link => {
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                link.click();
            }
        });
    });
    
    // Hamburger keyboard support
    if (hamburger) {
        hamburger.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                hamburger.click();
            }
        });
    }
}

// ===== NAVIGATION UTILITIES =====

// Smooth scroll to element
function scrollToElement(elementId, offset = 80) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const elementPosition = element.offsetTop - offset;
    
    window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
    });
}

// Get current active section
function getCurrentActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    for (const section of sections) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            return section.getAttribute('id');
        }
    }
    
    return null;
}

// Navigation breadcrumb generator
function generateBreadcrumb() {
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/').filter(segment => segment);
    
    const breadcrumb = ['Ana Sayfa'];
    
    const pathMap = {
        'about.html': 'Hakkımda',
        'projects.html': 'Projelerim',
        'research.html': 'Araştırmalarım',
        'blog.html': 'Blog',
        'notes.html': 'Ders Notlarım',
        'contact.html': 'İletişim'
    };
    
    pathSegments.forEach(segment => {
        if (pathMap[segment]) {
            breadcrumb.push(pathMap[segment]);
        }
    });
    
    return breadcrumb;
}

// Update page title and meta description
function updatePageMeta(title, description) {
    document.title = `${title} - Hıdır Samet YALÇINKAYA`;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && description) {
        metaDescription.setAttribute('content', description);
    }
}

// ===== NAVIGATION ANIMATIONS =====

// Add entrance animation to nav items
function animateNavItems() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('nav-item-animate');
    });
}

// Progress indicator for long pages
function initProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', updateProgressBar);
    
    function updateProgressBar() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        
        const progressBarElement = document.querySelector('.scroll-progress-bar');
        if (progressBarElement) {
            progressBarElement.style.width = scrolled + '%';
        }
    }
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.setAttribute('aria-label', 'Sayfa başına dön');
    backToTopBtn.setAttribute('title', 'Sayfa başına dön');
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top functionality
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Keyboard support
    backToTopBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
}

// ===== NAVIGATION SEARCH =====
function initNavigationSearch() {
    const searchTrigger = document.createElement('button');
    searchTrigger.className = 'nav-search-trigger';
    searchTrigger.innerHTML = '<i class="fas fa-search"></i>';
    searchTrigger.setAttribute('aria-label', 'Arama');
    
    const navControls = document.querySelector('.nav-controls');
    if (navControls) {
        navControls.insertBefore(searchTrigger, navControls.firstChild);
    }
    
    searchTrigger.addEventListener('click', function() {
        openSearchModal();
    });
}

function openSearchModal() {
    // This would open a search modal or redirect to search page
    console.log('Search modal would open here');
}

// ===== CSS ANIMATIONS FOR NAVIGATION =====
const navStyles = `
    .nav-item-animate {
        opacity: 0;
        transform: translateY(-10px);
        animation: slideInDown 0.3s ease forwards;
    }
    
    @keyframes slideInDown {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .scroll-progress {
        position: fixed;
        top: 64px;
        left: 0;
        width: 100%;
        height: 2px;
        background: rgba(37, 99, 235, 0.1);
        z-index: 999;
    }
    
    .scroll-progress-bar {
        height: 100%;
        background: var(--primary-color);
        width: 0%;
        transition: width 0.1s ease;
    }
    
    .back-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.125rem;
        box-shadow: var(--shadow-lg);
        opacity: 0;
        visibility: hidden;
        transform: scale(0.8);
        transition: all 0.3s ease;
        z-index: 1000;
    }
    
    .back-to-top.show {
        opacity: 1;
        visibility: visible;
        transform: scale(1);
    }
    
    .back-to-top:hover {
        background: var(--primary-dark);
        transform: scale(1.1);
    }
    
    .navbar-scrolled {
        box-shadow: var(--shadow-md);
    }
    
    .nav-search-trigger {
        background: var(--bg-tertiary);
        border: none;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: var(--text-secondary);
        transition: all var(--transition-fast);
    }
    
    .nav-search-trigger:hover {
        background: var(--bg-secondary);
        color: var(--primary-color);
    }
    
    @media (max-width: 768px) {
        .scroll-progress {
            top: 60px;
        }
        
        .back-to-top {
            width: 45px;
            height: 45px;
            bottom: 15px;
            right: 15px;
            font-size: 1rem;
        }
    }
`;

// Inject navigation styles
const navStyleSheet = document.createElement('style');
navStyleSheet.textContent = navStyles;
document.head.appendChild(navStyleSheet);

// Initialize additional navigation features
document.addEventListener('DOMContentLoaded', function() {
    // Uncomment these as needed
    // initProgressIndicator();
    initBackToTop();
    // initNavigationSearch();
    
    // Add entrance animations with delay
    setTimeout(() => {
        animateNavItems();
    }, 100);
});

// Export navigation utilities
window.navigationUtils = {
    scrollToElement,
    getCurrentActiveSection,
    generateBreadcrumb,
    updatePageMeta
};
