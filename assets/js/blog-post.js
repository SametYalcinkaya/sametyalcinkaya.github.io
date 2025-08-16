// Blog Post Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Blog post functionality
    initBlogPost();
    
    // Table of contents functionality
    initTableOfContents();
    
    // Social sharing functionality
    initSocialSharing();
    
    // Like and bookmark functionality
    initInteractionButtons();
    
    // Reading progress indicator
    initReadingProgress();
    
    // Code syntax highlighting
    initCodeHighlighting();
    
    // Smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Auto-hide/show table of contents on scroll
    initTOCScrollBehavior();
    
    // Image lazy loading and lightbox
    initImageHandling();
    
    // Print functionality
    initPrintHandling();
});

// Initialize blog post
function initBlogPost() {
    // Update view count (simulate)
    updateViewCount();
    
    // Track reading time
    trackReadingTime();
    
    // Initialize copy code buttons
    addCopyCodeButtons();
    
    // Initialize article actions
    initArticleActions();
}

// Table of Contents functionality
function initTableOfContents() {
    const toc = document.querySelector('.table-of-contents');
    const tocLinks = toc ? toc.querySelectorAll('a[href^="#"]') : [];
    const headings = document.querySelectorAll('h2[id], h3[id]');
    
    if (!toc || tocLinks.length === 0) return;
    
    // Highlight current section in TOC
    function highlightCurrentSection() {
        let currentHeading = null;
        const scrollPosition = window.scrollY + 100;
        
        headings.forEach(heading => {
            const offsetTop = heading.offsetTop;
            if (scrollPosition >= offsetTop) {
                currentHeading = heading;
            }
        });
        
        // Remove active class from all links
        tocLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current section link
        if (currentHeading) {
            const currentLink = toc.querySelector(`a[href="#${currentHeading.id}"]`);
            if (currentLink) {
                currentLink.classList.add('active');
            }
        }
    }
    
    // Initial call and scroll listener
    highlightCurrentSection();
    window.addEventListener('scroll', throttle(highlightCurrentSection, 100));
}

// Social sharing functionality
function initSocialSharing() {
    // Get page details
    const title = document.title;
    const url = window.location.href;
    const description = document.querySelector('meta[name="description"]')?.content || '';
    
    // Store for global access
    window.articleData = { title, url, description };
}

// Global sharing functions
function shareOnTwitter() {
    const { title, url } = window.articleData;
    const text = `${title} ${url} via @sametyalcinkaya`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
}

function shareOnLinkedIn() {
    const { title, url } = window.articleData;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=400');
}

function shareOnFacebook() {
    const { url } = window.articleData;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
}

function copyLink() {
    const { url } = window.articleData;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Link panoya kopyalandı!', 'success');
        }).catch(() => {
            fallbackCopyText(url);
        });
    } else {
        fallbackCopyText(url);
    }
}

// Fallback copy function
function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('Link panoya kopyalandı!', 'success');
    } catch (err) {
        showNotification('Link kopyalanamadı', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Like and bookmark functionality
function initInteractionButtons() {
    const likeBtn = document.getElementById('like-btn');
    const bookmarkBtn = document.getElementById('bookmark-btn');
    
    // Like button
    if (likeBtn) {
        let isLiked = localStorage.getItem(`liked-${window.location.pathname}`) === 'true';
        let likeCount = parseInt(likeBtn.querySelector('span').textContent) || 0;
        
        // Set initial state
        if (isLiked) {
            likeBtn.classList.add('liked');
            likeBtn.querySelector('i').classList.replace('far', 'fas');
        }
        
        likeBtn.addEventListener('click', () => {
            isLiked = !isLiked;
            
            if (isLiked) {
                likeBtn.classList.add('liked');
                likeBtn.querySelector('i').classList.replace('far', 'fas');
                likeCount++;
                showNotification('Yazı beğenildi! ❤️', 'success');
            } else {
                likeBtn.classList.remove('liked');
                likeBtn.querySelector('i').classList.replace('fas', 'far');
                likeCount--;
                showNotification('Beğeni geri alındı', 'info');
            }
            
            likeBtn.querySelector('span').textContent = likeCount;
            document.getElementById('like-count').textContent = `${likeCount} beğeni`;
            localStorage.setItem(`liked-${window.location.pathname}`, isLiked);
        });
    }
    
    // Bookmark button
    if (bookmarkBtn) {
        let isBookmarked = localStorage.getItem(`bookmarked-${window.location.pathname}`) === 'true';
        
        // Set initial state
        if (isBookmarked) {
            bookmarkBtn.classList.add('bookmarked');
            bookmarkBtn.querySelector('i').classList.replace('far', 'fas');
        }
        
        bookmarkBtn.addEventListener('click', () => {
            isBookmarked = !isBookmarked;
            
            if (isBookmarked) {
                bookmarkBtn.classList.add('bookmarked');
                bookmarkBtn.querySelector('i').classList.replace('far', 'fas');
                showNotification('Yazı kaydedildi! 📚', 'success');
            } else {
                bookmarkBtn.classList.remove('bookmarked');
                bookmarkBtn.querySelector('i').classList.replace('fas', 'far');
                showNotification('Kayıt kaldırıldı', 'info');
            }
            
            localStorage.setItem(`bookmarked-${window.location.pathname}`, isBookmarked);
        });
    }
}

// Reading progress indicator
function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="reading-progress-fill"></div>';
    document.body.appendChild(progressBar);
    
    const progressFill = progressBar.querySelector('.reading-progress-fill');
    
    function updateReadingProgress() {
        const article = document.querySelector('.article-content');
        if (!article) return;
        
        const articleTop = article.offsetTop;
        const articleHeight = article.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;
        
        const start = articleTop - windowHeight / 2;
        const end = articleTop + articleHeight - windowHeight / 2;
        
        let progress = 0;
        if (scrollY >= start && scrollY <= end) {
            progress = (scrollY - start) / (end - start) * 100;
        } else if (scrollY > end) {
            progress = 100;
        }
        
        progressFill.style.width = `${Math.max(0, Math.min(100, progress))}%`;
    }
    
    window.addEventListener('scroll', throttle(updateReadingProgress, 10));
    updateReadingProgress();
}

// Code highlighting and copy buttons
function initCodeHighlighting() {
    // Code highlighting is handled by highlight.js
    // Just add any custom behavior here if needed
}

function addCopyCodeButtons() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach((codeBlock, index) => {
        const pre = codeBlock.parentElement;
        const button = document.createElement('button');
        button.className = 'copy-code-btn';
        button.innerHTML = '<i class="fas fa-copy"></i>';
        button.title = 'Kodu kopyala';
        
        pre.style.position = 'relative';
        pre.appendChild(button);
        
        button.addEventListener('click', () => {
            const code = codeBlock.textContent;
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(code).then(() => {
                    button.innerHTML = '<i class="fas fa-check"></i>';
                    button.classList.add('copied');
                    showNotification('Kod kopyalandı!', 'success');
                    
                    setTimeout(() => {
                        button.innerHTML = '<i class="fas fa-copy"></i>';
                        button.classList.remove('copied');
                    }, 2000);
                });
            }
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Table of contents scroll behavior
function initTOCScrollBehavior() {
    const toc = document.querySelector('.table-of-contents');
    if (!toc) return;
    
    let isScrolling = false;
    
    function handleScroll() {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                const articleContent = document.querySelector('.article-content');
                
                if (articleContent) {
                    const contentTop = articleContent.offsetTop;
                    const contentBottom = contentTop + articleContent.offsetHeight;
                    
                    if (scrollY >= contentTop - 100 && scrollY <= contentBottom) {
                        toc.classList.add('visible');
                    } else {
                        toc.classList.remove('visible');
                    }
                }
                
                isScrolling = false;
            });
        }
        
        isScrolling = true;
    }
    
    window.addEventListener('scroll', handleScroll);
}

// Image handling
function initImageHandling() {
    const images = document.querySelectorAll('.article-content img, .article-featured-image img');
    
    images.forEach(img => {
        // Add click handler for lightbox effect
        img.addEventListener('click', () => {
            openImageLightbox(img);
        });
        
        // Add loading animation
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
        
        img.style.cursor = 'zoom-in';
    });
}

// Simple lightbox for images
function openImageLightbox(img) {
    const lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${img.src}" alt="${img.alt}">
            <button class="lightbox-close" aria-label="Kapat">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    // Close handlers
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const closeLightbox = () => {
        document.body.removeChild(lightbox);
        document.body.style.overflow = '';
    };
    
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // ESC key handler
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', escHandler);
        }
    };
    
    document.addEventListener('keydown', escHandler);
    
    // Animate in
    setTimeout(() => {
        lightbox.classList.add('active');
    }, 10);
}

// Print functionality
function initPrintHandling() {
    // Add print styles and functionality if needed
    window.addEventListener('beforeprint', () => {
        // Expand all collapsed content for printing
        document.body.classList.add('printing');
    });
    
    window.addEventListener('afterprint', () => {
        document.body.classList.remove('printing');
    });
}

// Article actions
function initArticleActions() {
    const shareBtn = document.getElementById('share-btn');
    
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            // Show share menu
            showShareMenu(shareBtn);
        });
    }
}

// Show share menu
function showShareMenu(button) {
    const existingMenu = document.querySelector('.share-menu');
    if (existingMenu) {
        existingMenu.remove();
        return;
    }
    
    const menu = document.createElement('div');
    menu.className = 'share-menu';
    menu.innerHTML = `
        <button onclick="shareOnTwitter()">
            <i class="fab fa-twitter"></i> Twitter
        </button>
        <button onclick="shareOnLinkedIn()">
            <i class="fab fa-linkedin"></i> LinkedIn
        </button>
        <button onclick="shareOnFacebook()">
            <i class="fab fa-facebook"></i> Facebook
        </button>
        <button onclick="copyLink()">
            <i class="fas fa-link"></i> Link Kopyala
        </button>
    `;
    
    document.body.appendChild(menu);
    
    // Position the menu
    const rect = button.getBoundingClientRect();
    menu.style.top = `${rect.bottom + window.scrollY + 10}px`;
    menu.style.left = `${rect.left + window.scrollX}px`;
    
    // Close menu on outside click
    setTimeout(() => {
        document.addEventListener('click', function closeMenu(e) {
            if (!menu.contains(e.target) && e.target !== button) {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    }, 0);
}

// Utility functions
function updateViewCount() {
    // In a real app, this would make an API call
    const viewCountElements = document.querySelectorAll('.view-count');
    viewCountElements.forEach(el => {
        const currentCount = parseInt(el.textContent.replace(/\D/g, ''));
        if (currentCount) {
            el.textContent = el.textContent.replace(currentCount, currentCount + 1);
        }
    });
}

function trackReadingTime() {
    const startTime = Date.now();
    
    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        // In a real app, this would be sent to analytics
        console.log(`Time spent reading: ${timeSpent} seconds`);
    });
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
    };
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// CSS styles for blog post specific elements
const blogPostStyles = `
/* Reading Progress Bar */
.reading-progress {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: rgba(var(--primary-rgb), 0.1);
    z-index: 1000;
}

.reading-progress-fill {
    height: 100%;
    background: var(--primary-color);
    transition: width 0.1s ease;
    width: 0%;
}

/* Code Copy Buttons */
.copy-code-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: #fff;
    padding: 5px 8px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    opacity: 0;
    transition: opacity 0.2s;
}

pre:hover .copy-code-btn {
    opacity: 1;
}

.copy-code-btn:hover {
    background: rgba(255, 255, 255, 0.2);
}

.copy-code-btn.copied {
    color: #4ade80;
}

/* Table of Contents */
.table-of-contents {
    position: sticky;
    top: 100px;
    max-height: calc(100vh - 120px);
    overflow-y: auto;
    padding: 20px;
    background: var(--surface-color);
    border-radius: 12px;
    border: 1px solid var(--border-color);
    min-width: 250px;
}

.table-of-contents h3 {
    margin: 0 0 15px 0;
    color: var(--text-color);
    font-size: 1.1rem;
}

.toc-nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.toc-nav li {
    margin: 8px 0;
}

.toc-nav a {
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.2s;
    padding: 5px 0;
    display: block;
    border-left: 2px solid transparent;
    padding-left: 10px;
}

.toc-nav a:hover {
    color: var(--primary-color);
}

.toc-nav a.active {
    color: var(--primary-color);
    border-left-color: var(--primary-color);
    font-weight: 500;
}

/* Article Actions */
.article-actions {
    display: flex;
    gap: 10px;
}

.action-btn {
    background: none;
    border: 1px solid var(--border-color);
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 5px;
    color: var(--text-secondary);
}

.action-btn:hover {
    background: var(--surface-color);
    border-color: var(--primary-color);
    color: var(--primary-color);
}

.action-btn.liked,
.action-btn.bookmarked {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
}

/* Share Menu */
.share-menu {
    position: absolute;
    background: var(--surface-color);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    box-shadow: var(--shadow-lg);
    padding: 5px;
    z-index: 1000;
    min-width: 150px;
}

.share-menu button {
    width: 100%;
    padding: 8px 12px;
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--text-color);
    transition: background 0.2s;
}

.share-menu button:hover {
    background: var(--hover-color);
}

/* Image Lightbox */
.image-lightbox {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s;
}

.image-lightbox.active {
    opacity: 1;
}

.lightbox-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
}

.lightbox-content img {
    max-width: 100%;
    max-height: 100%;
    border-radius: 8px;
}

.lightbox-close {
    position: absolute;
    top: -40px;
    right: 0;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
}

.lightbox-close:hover {
    background: rgba(255, 255, 255, 0.2);
}

/* Info Boxes */
.info-box {
    background: var(--info-bg);
    border: 1px solid var(--info-border);
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
    border-left: 4px solid var(--info-color);
}

.warning-box {
    background: var(--warning-bg);
    border: 1px solid var(--warning-border);
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
    border-left: 4px solid var(--warning-color);
}

.info-box h4,
.warning-box h4 {
    margin: 0 0 10px 0;
    color: var(--text-color);
}

/* Comparison Table */
.comparison-table {
    margin: 20px 0;
    overflow-x: auto;
}

.comparison-table table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: var(--shadow-sm);
}

.comparison-table th,
.comparison-table td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
}

.comparison-table th {
    background: var(--primary-color);
    color: white;
    font-weight: 600;
}

.comparison-table tbody tr:hover {
    background: var(--hover-color);
}

/* Responsive */
@media (max-width: 768px) {
    .table-of-contents {
        position: static;
        margin-bottom: 30px;
    }
    
    .article-actions {
        justify-content: center;
        margin-top: 20px;
    }
    
    .lightbox-content {
        padding: 0 20px;
    }
}
`;

// Add styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = blogPostStyles;
document.head.appendChild(styleSheet);
