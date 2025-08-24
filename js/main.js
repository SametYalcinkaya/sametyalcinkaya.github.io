// Main JavaScript file for cybersecurity portfolio
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavigation();
    initSmoothScrolling();
    initVideoModal();
    initHSYLogoModal();
    initCVModal();
    // initContactForm(); // Disabled - using EmailJS setup instead
    initScrollAnimations();
    initThemeEffects();
    initPerformanceOptimizations();
    initBackToTop();
    initLoadingScreen();
});

// ===== NAVIGATION SYSTEM =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('nav-hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Hamburger menu toggle
    if (hamburger && navMenu) {
        function toggleMenu() {
            const isActive = hamburger.classList.contains('active');
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Update aria-expanded for accessibility
            hamburger.setAttribute('aria-expanded', !isActive);
        }
        
        hamburger.addEventListener('click', toggleMenu);
        
        // Add keyboard support for hamburger menu
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // Active link highlighting on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
                
                // Terminal command animation for active link
                const command = link.getAttribute('data-command');
                if (command) {
                    link.style.setProperty('--command', `"${command}"`);
                }
            }
        });
    });
    
    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });
    
    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    const heroActions = document.querySelectorAll('.hero-actions a[href^="#"]');
    
    [...navLinks, ...heroActions].forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            
            // Skip if href is just '#' or empty
            if (!targetId || targetId === '#' || targetId.length <= 1) {
                return;
            }
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Terminal-style navigation feedback
                showTerminalFeedback(`Navigating to ${targetId}...`);
            }
        });
    });
}

// ===== VIDEO MODAL SYSTEM =====
function initVideoModal() {
    const videoCards = document.querySelectorAll('.video-card');
    const videoModal = document.getElementById('video-modal');
    const videoFrame = document.getElementById('video-frame');
    const closeModal = document.querySelector('.close-modal');
    
    // Video verileri - Gerçek YouTube video ID'lerinizi buraya ekleyin
    const videoData = [
        {
            title: 'Siber Güvenliğe Giriş: Yeni Başlayanlar İçin Temel Bilgiler',
            videoId: 'ANPNMYhmTgk', // YouTube video ID (correct format)
            startTime: 1, // Start time in seconds (optional)
            duration: '6:05',
            thumbnail: 'images/video1.jpg' // Your custom thumbnail image
        },
        {
            title: 'Siber Dünyanın En Gizemli Saldırısı: Stuxnet!',
            videoId: 'lOpopTyFjPY', // YouTube video ID
            duration: '15:45',
            thumbnail: 'images/video2.jpg' // Your custom thumbnail image
        },
        {
            title: 'Hacklenmekten Nasıl Korunurum? Bilgisayar Güvenliği İçin 10 Temel İpucu',
            videoId: 'JMNjj3HwYfQ', // YouTube video ID
            startTime: 8, // Start time in seconds
            duration: '22:18',
            thumbnail: 'images/video3.jpg' // Your custom thumbnail image
        }
    ];
    
    // Video kartlarını güncelle
    function updateVideoCards() {
        videoCards.forEach((card, index) => {
            const video = videoData[index];
            if (video) {
                // Thumbnail'i güncelle
                const img = card.querySelector('img');
                if (img && video.thumbnail) {
                    img.src = video.thumbnail;
                    img.alt = video.title;
                }
                
                // Başlığı güncelle
                const title = card.querySelector('.video-title');
                if (title) {
                    title.textContent = video.title;
                }
                
                // Süreyi güncelle
                const duration = card.querySelector('.video-duration');
                if (duration) {
                    duration.textContent = video.duration;
                }
            }
        });
    }
    
    // Update video cards immediately
    updateVideoCards();
    
    videoCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            const video = videoData[index] || videoData[0];
            openVideoModal(video.videoId, video.title, video.startTime);
        });
        
        // Add hover effect with glitch
        card.addEventListener('mouseenter', () => {
            const title = card.querySelector('.video-title');
            if (title) {
                title.classList.add('text-flicker');
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const title = card.querySelector('.video-title');
            if (title) {
                title.classList.remove('text-flicker');
            }
        });
    });
    
    function openVideoModal(videoId, title, startTime = null) {
        if (videoModal && videoFrame) {
            let embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
            
            // Add start time if provided
            if (startTime) {
                embedUrl += `&start=${startTime}`;
            }
            
            videoFrame.src = embedUrl;
            videoModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            showTerminalFeedback(`Loading video: ${title}...`);
        }
    }
    
    function closeVideoModal() {
        if (videoModal && videoFrame) {
            videoFrame.src = '';
            videoModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    // Close modal events
    if (closeModal) {
        closeModal.addEventListener('click', closeVideoModal);
    }
    
    if (videoModal) {
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closeVideoModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal && videoModal.style.display === 'flex') {
            closeVideoModal();
        }
    });
}

// ===== HSY LOGO MODAL =====
function initHSYLogoModal() {
    const hsyLogo = document.querySelector('.hsy-logo');
    const hsyModal = document.getElementById('hsy-modal');
    const closeHsyModal = document.querySelector('.close-hsy-modal');
    
    if (!hsyLogo || !hsyModal) return;
    
    let hoverTimeout;
    
    function openHsyModal() {
        hsyModal.classList.add('active');
        hsyModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Add click effect
        hsyLogo.classList.add('clicked');
        setTimeout(() => {
            hsyLogo.classList.remove('clicked');
        }, 150);
        
        showTerminalFeedback('$ cat /personal/info.txt');
    }
    
    function closeHsyModalFunc() {
        hsyModal.classList.remove('active');
        setTimeout(() => {
            hsyModal.style.display = 'none';
        }, 300);
        document.body.style.overflow = 'auto';
    }
    
    // Click event
    hsyLogo.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openHsyModal();
    });
    
    // Extended hover event (1 second hover to open)
    hsyLogo.addEventListener('mouseenter', () => {
        hoverTimeout = setTimeout(() => {
            openHsyModal();
        }, 1000); // 1 second hover delay
    });
    
    hsyLogo.addEventListener('mouseleave', () => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
        }
    });
    
    // Close modal events
    if (closeHsyModal) {
        closeHsyModal.addEventListener('click', closeHsyModalFunc);
    }
    
    if (hsyModal) {
        hsyModal.addEventListener('click', (e) => {
            if (e.target === hsyModal) {
                closeHsyModalFunc();
            }
        });
    }
    
    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && hsyModal.style.display === 'flex') {
            closeHsyModalFunc();
        }
    });
}

// ===== CV MODAL =====
function initCVModal() {
    const cvButton = document.getElementById('view-cv-btn');
    const cvModal = document.getElementById('cv-modal');
    const closeCvModalBtn = document.querySelector('.close-cv-modal');
    const cvFrame = document.getElementById('cv-frame');
    
    if (!cvButton || !cvModal) return;
    
    function openCvModal() {
        cvModal.classList.add('active');
        cvModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Add terminal feedback
        showTerminalFeedback('$ ./view-cv.sh');
        
        // Add a slight delay to ensure iframe loads properly
        setTimeout(() => {
            if (cvFrame) {
                cvFrame.src = 'docs/Hıdır_SAMET-CV.pdf';
            }
        }, 100);
    }
    
    function closeCvModal() {
        cvModal.classList.remove('active');
        setTimeout(() => {
            cvModal.style.display = 'none';
            if (cvFrame) {
                cvFrame.src = ''; // Clear iframe to stop loading
            }
        }, 300);
        document.body.style.overflow = 'auto';
        
        showTerminalFeedback('$ exit');
    }
    
    // Open CV modal when button is clicked
    cvButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openCvModal();
    });
    
    // Close modal events
    if (closeCvModalBtn) {
        closeCvModalBtn.addEventListener('click', closeCvModal);
    }
    
    if (cvModal) {
        cvModal.addEventListener('click', (e) => {
            if (e.target === cvModal) {
                closeCvModal();
            }
        });
    }
    
    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cvModal.classList.contains('active')) {
            closeCvModal();
        }
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // Allow natural form submission to Formspree
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = '<span class="loading-spinner"></span> Gönderiliyor...';
            submitButton.disabled = true;
            
            // Show terminal feedback
            showTerminalFeedback('$ ./send-message.sh --processing');
            
            // Add terminal feedback line
            const terminalBody = contactForm.closest('.terminal-body');
            if (terminalBody) {
                const feedbackLine = document.createElement('div');
                feedbackLine.className = 'terminal-line';
                feedbackLine.innerHTML = `
                    <span class="terminal-prompt">root@secure:~$ </span>
                    <span class="command" style="color: var(--neon-blue);">Mesaj gönderiliyor... ⏳</span>
                `;
                terminalBody.appendChild(feedbackLine);
            }
            
            // The form will naturally submit to Formspree
            // Thanks page will be shown by Formspree redirect
        });
        
        // Real-time validation with terminal feedback
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateInput);
            input.addEventListener('input', clearValidationError);
        });
    }
}

function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    
    // Remove existing error
    clearValidationError(e);
    
    let isValid = true;
    let errorMessage = '';
    
    if (input.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (input.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    }
    
    if (!isValid) {
        showInputError(input, errorMessage);
    }
    
    return isValid;
}

function clearValidationError(e) {
    const input = e.target;
    const errorElement = input.parentNode.querySelector('.input-error');
    if (errorElement) {
        errorElement.remove();
    }
    input.style.borderColor = '';
}

function showInputError(input, message) {
    input.style.borderColor = 'var(--danger-red)';
    
    const errorElement = document.createElement('div');
    errorElement.className = 'input-error';
    errorElement.style.color = 'var(--danger-red)';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '0.25rem';
    errorElement.textContent = `Error: ${message}`;
    
    input.parentNode.appendChild(errorElement);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add fade-in animation
                element.classList.add('scroll-fade-in', 'active');
                
                // Special animations for specific elements
                if (element.classList.contains('skill-card')) {
                    animateSkillCard(element);
                } else if (element.classList.contains('video-card')) {
                    animateVideoCard(element);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const elementsToAnimate = document.querySelectorAll('.skill-card, .video-card, .social-link');
    elementsToAnimate.forEach(el => {
        el.classList.add('scroll-fade-in');
        observer.observe(el);
    });
}

function animateSkillCard(card) {
    const progressBar = card.querySelector('.progress-bar');
    if (progressBar) {
        const width = progressBar.getAttribute('data-width');
        setTimeout(() => {
            progressBar.style.width = width + '%';
            progressBar.classList.add('progress-bar-animated');
        }, 300);
    }
}

function animateVideoCard(card) {
    card.style.transform = 'translateY(0)';
    card.style.opacity = '1';
}

// ===== THEME EFFECTS =====
function initThemeEffects() {
    // Terminal cursor blink for various elements
    const terminalElements = document.querySelectorAll('.terminal-prompt, .command');
    
    // Add glitch effect to section titles on hover
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.addEventListener('mouseenter', () => {
            title.classList.add('text-flicker');
        });
        
        title.addEventListener('mouseleave', () => {
            title.classList.remove('text-flicker');
        });
    });
    
    // Add typing effect to terminal prompts on focus
    const terminalInputs = document.querySelectorAll('.terminal-body input, .terminal-body textarea');
    terminalInputs.forEach(input => {
        input.addEventListener('focus', () => {
            const prompt = input.parentNode.querySelector('.terminal-prompt');
            if (prompt) {
                prompt.classList.add('terminal-typing');
            }
        });
        
        input.addEventListener('blur', () => {
            const prompt = input.parentNode.querySelector('.terminal-prompt');
            if (prompt) {
                prompt.classList.remove('terminal-typing');
            }
        });
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-content');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function initPerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Throttle scroll events
    let ticking = false;
    
    function updateScrollEffects() {
        // Update navbar, parallax, etc.
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
    
    // Preload critical resources
    preloadCriticalAssets();
}

function preloadCriticalAssets() {
    // Preload hero image if exists
    const heroImage = document.querySelector('.hero img');
    if (heroImage && heroImage.src) {
        const img = new Image();
        img.src = heroImage.src;
    }
    
    // Preload fonts
    const fontLinks = [
        'https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap'
    ];
    
    fontLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
}

// ===== UTILITY FUNCTIONS =====
function showTerminalFeedback(message, type = 'info') {
    const feedback = document.createElement('div');
    feedback.className = `terminal-feedback terminal-feedback-${type}`;
    feedback.innerHTML = `
        <span class="terminal-prompt">root@system:~$ </span>
        <span class="feedback-message">${message}</span>
    `;
    
    feedback.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--bg-dark);
        border: 1px solid var(--primary-green);
        padding: 10px 15px;
        border-radius: 5px;
        color: var(--primary-green);
        font-family: var(--font-mono);
        font-size: 0.8rem;
        z-index: 1500;
        opacity: 0;
        transform: translateX(100px);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(feedback);
    
    // Animate in
    setTimeout(() => {
        feedback.style.opacity = '1';
        feedback.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        feedback.style.opacity = '0';
        feedback.style.transform = 'translateX(100px)';
        setTimeout(() => feedback.remove(), 300);
    }, 3000);
}

function showTerminalSuccess(message) {
    showTerminalFeedback(message, 'success');
}

function showTerminalError(message) {
    showTerminalFeedback(message, 'error');
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    // Alt + H: Go to home
    if (e.altKey && e.key === 'h') {
        e.preventDefault();
        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
        showTerminalFeedback('Navigated to home');
    }
    
    // Alt + A: Go to about
    if (e.altKey && e.key === 'a') {
        e.preventDefault();
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        showTerminalFeedback('Navigated to about');
    }
    
    // Alt + C: Go to contact
    if (e.altKey && e.key === 'c') {
        e.preventDefault();
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        showTerminalFeedback('Navigated to contact');
    }
    
    // Ctrl + /: Show keyboard shortcuts
    if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        showKeyboardShortcuts();
    }
});

function showKeyboardShortcuts() {
    const shortcuts = `
Keyboard Shortcuts:
Alt + H: Navigate to Home
Alt + A: Navigate to About  
Alt + C: Navigate to Contact
Ctrl + /: Show this help
ESC: Close modals
    `;
    showTerminalFeedback(shortcuts.trim(), 'info');
}

// ===== EASTER EGGS =====
let konamiCode = '';
const konamiSequence = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightKeyBKeyA';

document.addEventListener('keydown', (e) => {
    konamiCode += e.code;
    if (konamiCode.length > konamiSequence.length) {
        konamiCode = konamiCode.slice(-konamiSequence.length);
    }
    
    if (konamiCode === konamiSequence) {
        activateHackerMode();
        konamiCode = '';
    }
});

function activateHackerMode() {
    showTerminalFeedback('🔓 HACKER MODE ACTIVATED', 'success');
    
    // Add extra effects
    document.body.style.filter = 'hue-rotate(120deg)';
    
    // Reset after 10 seconds
    setTimeout(() => {
        document.body.style.filter = '';
        showTerminalFeedback('HACKER MODE DEACTIVATED', 'info');
    }, 10000);
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    function toggleBackToTopButton() {
        const scrolled = window.pageYOffset;
        const threshold = 300; // Show button after scrolling 300px
        
        if (scrolled > threshold) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
    
    // Smooth scroll to top with animation
    function scrollToTop() {
        const scrollDuration = 800;
        const scrollStep = -window.scrollY / (scrollDuration / 15);
        
        const scrollInterval = setInterval(() => {
            if (window.scrollY !== 0) {
                window.scrollBy(0, scrollStep);
            } else {
                clearInterval(scrollInterval);
                showTerminalFeedback('Back to top - Command executed successfully!');
            }
        }, 15);
    }
    
    // Throttled scroll event for performance
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                toggleBackToTopButton();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Event listeners
    window.addEventListener('scroll', handleScroll);
    
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToTop();
        
        // Add click animation
        backToTopBtn.style.transform = 'translateY(-1px) scale(0.95)';
        setTimeout(() => {
            backToTopBtn.style.transform = '';
        }, 150);
    });
    
    // Keyboard accessibility (Enter and Space)
    backToTopBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollToTop();
        }
    });
    
    // Make button focusable for accessibility
    backToTopBtn.setAttribute('tabindex', '0');
    backToTopBtn.setAttribute('role', 'button');
    backToTopBtn.setAttribute('aria-label', 'Sayfanın üstüne çık');
    
    // Progressive enhancement for hover effects
    backToTopBtn.addEventListener('mouseenter', () => {
        if (!backToTopBtn.classList.contains('show')) return;
        
        // Add terminal-style hover feedback
        const tooltip = backToTopBtn.querySelector('.btn-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';
        }
    });
    
    backToTopBtn.addEventListener('mouseleave', () => {
        const tooltip = backToTopBtn.querySelector('.btn-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
            tooltip.style.visibility = 'hidden';
        }
    });
    
    // Initial check in case page is already scrolled
    toggleBackToTopButton();
}

// ===== LOADING SCREEN =====
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingBar = document.querySelector('.loading-bar');
    const loadingStatus = document.querySelector('.loading-status');
    
    if (!loadingScreen) return;
    
    // Loading messages array for terminal-style feedback
    const loadingMessages = [
        'Initializing security protocols...',
        'Loading cybersecurity modules...',
        'Establishing secure connection...',
        'Decrypting personal data...',
        'Activating hacker mode...',
        'Finalizing system initialization...'
    ];
    
    let currentMessageIndex = 0;
    let loadingProgress = 0;
    
    // Update loading status text
    function updateLoadingStatus() {
        if (loadingStatus && currentMessageIndex < loadingMessages.length) {
            loadingStatus.textContent = loadingMessages[currentMessageIndex];
            currentMessageIndex++;
        }
    }
    
    // Simulate loading progress
    function simulateLoadingProgress() {
        const progressInterval = setInterval(() => {
            loadingProgress += Math.random() * 20 + 10; // Faster progress: 10-30% increments
            
            if (loadingProgress >= 100) {
                loadingProgress = 100;
                clearInterval(progressInterval);
                
                // Final loading message
                if (loadingStatus) {
                    loadingStatus.textContent = 'System ready! Welcome, hacker.';
                }
                
                // Hide loading screen after completion
                setTimeout(() => {
                    hideLoadingScreen();
                }, 100); // Reduced delay
            }
            
            // Update progress bar (handled by CSS animation)
            // Update status message every 25%
            if (loadingProgress % 25 < 15 && currentMessageIndex < loadingMessages.length) {
                updateLoadingStatus();
            }
        }, 80 + Math.random() * 60); // Faster intervals: 80-140ms
    }
    
    // Hide loading screen with animation
    function hideLoadingScreen() {
        loadingScreen.classList.add('fade-out');
        
        // Remove loading screen from DOM after animation
        setTimeout(() => {
            loadingScreen.remove();
            
            // Show welcome message
            setTimeout(() => {
                showTerminalFeedback('System initialized successfully! Welcome to the matrix.', 'success');
            }, 100);
        }, 500);
    }
    
    // Start loading simulation
    function startLoading() {
        // Initial message
        updateLoadingStatus();
        
        // Start progress simulation
        setTimeout(() => {
            simulateLoadingProgress();
        }, 100);
        
        // Update messages periodically
        const messageInterval = setInterval(() => {
            if (currentMessageIndex < loadingMessages.length) {
                updateLoadingStatus();
            } else {
                clearInterval(messageInterval);
            }
        }, 200);
    }
    
    // Force hide loading screen after maximum time (fallback)
    const maxLoadingTime = 800; // Reduced to 0.8 seconds
    const forceHideTimeout = setTimeout(() => {
        if (loadingScreen && !loadingScreen.classList.contains('fade-out')) {
            console.log('Loading completed - hiding screen');
            hideLoadingScreen();
        }
    }, maxLoadingTime);
    
    // Start loading process
    startLoading();
    
    // Clean up timeout if loading completes naturally
    loadingScreen.addEventListener('transitionend', () => {
        clearTimeout(forceHideTimeout);
    });
    
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';
    
    // Restore scrolling when loading is complete
    const loadingObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.removedNodes.forEach((node) => {
                    if (node === loadingScreen) {
                        document.body.style.overflow = 'auto';
                        loadingObserver.disconnect();
                    }
                });
            }
        });
    });
    
    loadingObserver.observe(document.body, {
        childList: true
    });
}

// Export functions for external use
window.portfolioUtils = {
    showTerminalFeedback,
    showTerminalSuccess,
    showTerminalError,
    initNavigation,
    initSmoothScrolling
};


