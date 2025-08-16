// ===== BLOG PAGE SPECIFIC SCRIPTS =====
// This file handles blog functionality including filtering, searching, and dynamic content loading

document.addEventListener('DOMContentLoaded', function() {
    initBlogFilters();
    initBlogSearch();
    initViewToggle();
    initLoadMore();
    initNewsletterForm();
    initBlogStats();
    initURLParams();
    
    console.log('📝 Blog page initialized successfully!');
});

// ===== BLOG DATA MANAGEMENT =====
let allPosts = [];
let visiblePosts = 6; // Initially visible posts
let currentFilters = {
    category: '',
    search: '',
    sort: 'newest'
};

// Initialize blog posts data
function initBlogData() {
    const postElements = document.querySelectorAll('.post-card');
    allPosts = Array.from(postElements).map(post => ({
        element: post,
        category: post.dataset.category,
        date: post.dataset.date,
        title: post.querySelector('.post-title a').textContent.trim(),
        excerpt: post.querySelector('.post-excerpt').textContent.trim(),
        tags: Array.from(post.querySelectorAll('.tag')).map(tag => tag.textContent.trim()),
        readTime: post.querySelector('.read-time') ? post.querySelector('.read-time').textContent : '5 dk'
    }));
}

// ===== BLOG FILTERS =====
function initBlogFilters() {
    initBlogData();
    
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            currentFilters.category = this.value;
            applyFilters();
        });
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', function() {
            currentFilters.sort = this.value;
            applyFilters();
        });
    }
}

// ===== BLOG SEARCH =====
function initBlogSearch() {
    const searchInput = document.getElementById('blog-search');
    let searchTimeout;
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            
            searchTimeout = setTimeout(() => {
                currentFilters.search = this.value.toLowerCase().trim();
                applyFilters();
            }, 300);
        });
        
        // Clear search on escape
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.value = '';
                currentFilters.search = '';
                applyFilters();
            }
        });
    }
}

// ===== APPLY FILTERS =====
function applyFilters() {
    let filteredPosts = [...allPosts];
    
    // Apply category filter
    if (currentFilters.category) {
        filteredPosts = filteredPosts.filter(post => 
            post.category === currentFilters.category
        );
    }
    
    // Apply search filter
    if (currentFilters.search) {
        filteredPosts = filteredPosts.filter(post =>
            post.title.toLowerCase().includes(currentFilters.search) ||
            post.excerpt.toLowerCase().includes(currentFilters.search) ||
            post.tags.some(tag => tag.toLowerCase().includes(currentFilters.search))
        );
    }
    
    // Apply sorting
    filteredPosts.sort((a, b) => {
        switch (currentFilters.sort) {
            case 'newest':
                return new Date(b.date) - new Date(a.date);
            case 'oldest':
                return new Date(a.date) - new Date(b.date);
            case 'alphabetical':
                return a.title.localeCompare(b.title);
            case 'most-read':
                // Mock sorting by read time (in real app, would be by view count)
                return parseInt(b.readTime) - parseInt(a.readTime);
            default:
                return 0;
        }
    });
    
    displayFilteredPosts(filteredPosts);
}

// ===== DISPLAY FILTERED POSTS =====
function displayFilteredPosts(posts) {
    const postsGrid = document.getElementById('posts-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    // Hide all posts first
    allPosts.forEach(post => {
        post.element.style.display = 'none';
        post.element.classList.remove('animate-in');
    });
    
    // Show filtered posts
    posts.slice(0, visiblePosts).forEach((post, index) => {
        post.element.style.display = 'block';
        setTimeout(() => {
            post.element.classList.add('animate-in');
        }, index * 100);
    });
    
    // Update load more button
    if (posts.length <= visiblePosts) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-flex';
    }
    
    // Update results count
    updateResultsCount(posts.length);
    
    // Update URL
    updateURL();
}

// ===== VIEW TOGGLE =====
function initViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const postsGrid = document.getElementById('posts-grid');
    
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.dataset.view;
            
            // Update active button
            viewButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update grid view
            if (view === 'list') {
                postsGrid.classList.add('list-view');
            } else {
                postsGrid.classList.remove('list-view');
            }
            
            // Save preference
            localStorage.setItem('blog-view-preference', view);
        });
    });
    
    // Apply saved preference
    const savedView = localStorage.getItem('blog-view-preference');
    if (savedView === 'list') {
        document.querySelector('.view-btn[data-view="list"]').click();
    }
}

// ===== LOAD MORE FUNCTIONALITY =====
function initLoadMore() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            visiblePosts += 6;
            applyFilters();
            
            // Update button text
            const remainingPosts = getCurrentFilteredPosts().length - visiblePosts;
            if (remainingPosts <= 0) {
                loadMoreBtn.textContent = 'Tüm Yazılar Yüklendi';
                loadMoreBtn.disabled = true;
            }
        });
    }
}

function getCurrentFilteredPosts() {
    let filteredPosts = [...allPosts];
    
    if (currentFilters.category) {
        filteredPosts = filteredPosts.filter(post => 
            post.category === currentFilters.category
        );
    }
    
    if (currentFilters.search) {
        filteredPosts = filteredPosts.filter(post =>
            post.title.toLowerCase().includes(currentFilters.search) ||
            post.excerpt.toLowerCase().includes(currentFilters.search) ||
            post.tags.some(tag => tag.toLowerCase().includes(currentFilters.search))
        );
    }
    
    return filteredPosts;
}

// ===== NEWSLETTER FORM =====
function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Validate email
            if (!emailInput.value || !isValidEmail(emailInput.value)) {
                showNotification('Lütfen geçerli bir e-posta adresi girin.', 'error');
                return;
            }
            
            // Show loading
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Abone Ediliyor...';
            submitBtn.disabled = true;
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Success
                showNotification('Başarıyla abone oldunuz! Teşekkürler.', 'success');
                emailInput.value = '';
                
                // Update stats (mock)
                updateSubscriberCount();
                
            } catch (error) {
                showNotification('Bir hata oluştu. Lütfen tekrar deneyin.', 'error');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function updateSubscriberCount() {
    // Mock subscriber count update
    const currentCount = parseInt(localStorage.getItem('newsletter-subscribers') || '0');
    localStorage.setItem('newsletter-subscribers', (currentCount + 1).toString());
}

// ===== BLOG STATS ANIMATION =====
function initBlogStats() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatNumber(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.8
    });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

function animateStatNumber(element) {
    const target = parseInt(element.dataset.target);
    let current = 0;
    const increment = target / 50;
    
    const animation = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(animation);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// ===== URL PARAMETERS =====
function initURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const search = urlParams.get('search');
    
    if (category) {
        currentFilters.category = category;
        const categorySelect = document.getElementById('category-filter');
        if (categorySelect) {
            categorySelect.value = category;
        }
    }
    
    if (search) {
        currentFilters.search = search;
        const searchInput = document.getElementById('blog-search');
        if (searchInput) {
            searchInput.value = search;
        }
    }
    
    if (category || search) {
        applyFilters();
    }
}

function updateURL() {
    const params = new URLSearchParams();
    
    if (currentFilters.category) {
        params.set('category', currentFilters.category);
    }
    
    if (currentFilters.search) {
        params.set('search', currentFilters.search);
    }
    
    const newURL = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
    history.replaceState(null, '', newURL);
}

// ===== RESULTS COUNT =====
function updateResultsCount(count) {
    let resultsText = document.querySelector('.results-count');
    
    if (!resultsText) {
        resultsText = document.createElement('div');
        resultsText.className = 'results-count';
        
        const sectionHeader = document.querySelector('.blog-posts .section-header');
        if (sectionHeader) {
            sectionHeader.appendChild(resultsText);
        }
    }
    
    if (count === allPosts.length) {
        resultsText.textContent = `Toplam ${count} yazı`;
    } else {
        resultsText.textContent = `${count} yazı bulundu`;
    }
}

// ===== FEATURED POST INTERACTIONS =====
function initFeaturedPost() {
    const featuredPost = document.querySelector('.featured-content');
    
    if (featuredPost) {
        featuredPost.addEventListener('click', function() {
            const link = this.querySelector('a');
            if (link) {
                window.location.href = link.href;
            }
        });
        
        featuredPost.style.cursor = 'pointer';
    }
}

// ===== POST CARD INTERACTIONS =====
function initPostCards() {
    const postCards = document.querySelectorAll('.post-card');
    
    postCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Click to navigate
        card.addEventListener('click', function(e) {
            if (e.target.tagName !== 'A') {
                const link = this.querySelector('.post-title a');
                if (link) {
                    window.location.href = link.href;
                }
            }
        });
        
        card.style.cursor = 'pointer';
    });
}

// ===== BLOG PAGE SPECIFIC STYLES =====
const blogStyles = `
    .blog-hero {
        padding: 4rem 0;
        background: linear-gradient(135deg, var(--bg-secondary), var(--bg-primary));
    }
    
    .blog-hero-content {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 4rem;
        align-items: center;
    }
    
    .hero-text h2 {
        color: var(--text-primary);
        margin-bottom: 1.5rem;
    }
    
    .hero-text p {
        font-size: 1.125rem;
        color: var(--text-secondary);
        line-height: 1.6;
    }
    
    .hero-stats {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .blog-filters {
        padding: 2rem 0;
        background: var(--bg-tertiary);
        border-bottom: 1px solid var(--border-color);
    }
    
    .filters-content {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr auto;
        gap: 1rem;
        align-items: center;
    }
    
    .search-box {
        position: relative;
    }
    
    .search-box i {
        position: absolute;
        left: 1rem;
        top: 50%;
        transform: translateY(-50%);
        color: var(--text-tertiary);
    }
    
    .search-box input {
        width: 100%;
        padding: 0.75rem 1rem 0.75rem 2.5rem;
        border: 1px solid var(--border-color);
        border-radius: var(--radius-lg);
        background: var(--bg-primary);
        color: var(--text-primary);
        font-size: 0.9rem;
    }
    
    .search-box input:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }
    
    .category-filter select,
    .sort-options select {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid var(--border-color);
        border-radius: var(--radius-lg);
        background: var(--bg-primary);
        color: var(--text-primary);
        font-size: 0.9rem;
        cursor: pointer;
    }
    
    .view-toggle {
        display: flex;
        gap: 0.25rem;
        background: var(--bg-primary);
        border-radius: var(--radius-md);
        padding: 0.25rem;
    }
    
    .view-btn {
        padding: 0.5rem;
        background: none;
        border: none;
        border-radius: var(--radius-sm);
        color: var(--text-secondary);
        cursor: pointer;
        transition: all var(--transition-fast);
    }
    
    .view-btn.active,
    .view-btn:hover {
        background: var(--primary-color);
        color: white;
    }
    
    .featured-post {
        padding: 3rem 0;
        background: var(--bg-secondary);
    }
    
    .featured-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        align-items: center;
        background: var(--bg-primary);
        border-radius: var(--radius-xl);
        padding: 2rem;
        box-shadow: var(--shadow-lg);
        transition: all var(--transition-normal);
    }
    
    .featured-content:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-xl);
    }
    
    .featured-image {
        position: relative;
        aspect-ratio: 16 / 9;
        border-radius: var(--radius-lg);
        overflow: hidden;
    }
    
    .featured-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .featured-badge {
        position: absolute;
        top: 1rem;
        left: 1rem;
        background: var(--primary-color);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: var(--radius-md);
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
    }
    
    .featured-text h3 {
        margin-bottom: 1rem;
    }
    
    .featured-text h3 a {
        color: var(--text-primary);
        text-decoration: none;
        font-size: 1.5rem;
        line-height: 1.3;
    }
    
    .featured-text h3 a:hover {
        color: var(--primary-color);
    }
    
    .excerpt {
        font-size: 1rem;
        color: var(--text-secondary);
        line-height: 1.6;
        margin-bottom: 1.5rem;
    }
    
    .post-meta {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
        font-size: 0.875rem;
    }
    
    .post-meta .category {
        background: var(--primary-color);
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: var(--radius-md);
        font-weight: 500;
    }
    
    .post-meta .date {
        color: var(--text-tertiary);
    }
    
    .post-meta .read-time {
        color: var(--text-tertiary);
    }
    
    .post-stats {
        display: flex;
        gap: 1.5rem;
        margin-top: 1rem;
    }
    
    .post-stats .stat {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
        color: var(--text-tertiary);
    }
    
    .post-stats i {
        color: var(--primary-color);
    }
    
    .posts-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 2rem;
    }
    
    .posts-grid.list-view {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .post-card {
        background: var(--bg-primary);
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-md);
        overflow: hidden;
        transition: all var(--transition-normal);
        opacity: 0;
        transform: translateY(30px);
    }
    
    .post-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .posts-grid.list-view .post-card {
        display: grid;
        grid-template-columns: 200px 1fr;
        gap: 1.5rem;
    }
    
    .post-image {
        position: relative;
        aspect-ratio: 16 / 9;
        overflow: hidden;
    }
    
    .posts-grid.list-view .post-image {
        aspect-ratio: 4 / 3;
    }
    
    .post-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform var(--transition-slow);
    }
    
    .post-card:hover .post-image img {
        transform: scale(1.05);
    }
    
    .post-category {
        position: absolute;
        top: 1rem;
        left: 1rem;
        background: var(--primary-color);
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: var(--radius-md);
        font-size: 0.75rem;
        font-weight: 600;
    }
    
    .post-content {
        padding: 1.5rem;
    }
    
    .post-title {
        margin-bottom: 0.75rem;
    }
    
    .post-title a {
        color: var(--text-primary);
        text-decoration: none;
        font-size: 1.125rem;
        font-weight: 600;
        line-height: 1.4;
    }
    
    .post-title a:hover {
        color: var(--primary-color);
    }
    
    .post-excerpt {
        color: var(--text-secondary);
        font-size: 0.95rem;
        line-height: 1.5;
        margin-bottom: 1rem;
    }
    
    .post-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    
    .tag {
        background: var(--bg-tertiary);
        color: var(--text-secondary);
        padding: 0.25rem 0.5rem;
        border-radius: var(--radius-sm);
        font-size: 0.75rem;
        font-weight: 500;
    }
    
    .load-more-section {
        text-align: center;
        margin-top: 3rem;
    }
    
    .newsletter-section {
        padding: 4rem 0;
        background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
        color: white;
        text-align: center;
    }
    
    .newsletter-content h2 {
        color: white;
        margin-bottom: 1rem;
    }
    
    .newsletter-content p {
        color: rgba(255, 255, 255, 0.9);
        font-size: 1.125rem;
        margin-bottom: 2rem;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
    }
    
    .newsletter-form .form-group {
        display: flex;
        max-width: 500px;
        margin: 0 auto 1rem;
        gap: 1rem;
    }
    
    .newsletter-form input {
        flex: 1;
        padding: 0.75rem 1rem;
        border: none;
        border-radius: var(--radius-lg);
        font-size: 1rem;
    }
    
    .newsletter-form .btn {
        white-space: nowrap;
    }
    
    .form-note {
        font-size: 0.875rem;
        color: rgba(255, 255, 255, 0.8);
        margin: 0;
    }
    
    .form-note a {
        color: white;
        text-decoration: underline;
    }
    
    .results-count {
        font-size: 0.9rem;
        color: var(--text-tertiary);
        margin-top: 0.5rem;
    }
    
    /* Mobile Responsiveness */
    @media (max-width: 768px) {
        .blog-hero-content {
            grid-template-columns: 1fr;
            text-align: center;
        }
        
        .hero-stats {
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
        }
        
        .filters-content {
            grid-template-columns: 1fr;
            gap: 1rem;
        }
        
        .featured-content {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }
        
        .posts-grid {
            grid-template-columns: 1fr;
        }
        
        .posts-grid.list-view .post-card {
            grid-template-columns: 1fr;
        }
        
        .newsletter-form .form-group {
            flex-direction: column;
        }
    }
`;

// Inject blog styles
const blogStyleSheet = document.createElement('style');
blogStyleSheet.textContent = blogStyles;
document.head.appendChild(blogStyleSheet);

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initFeaturedPost();
    initPostCards();
});

// Export blog utilities
window.blogUtils = {
    applyFilters,
    updateResultsCount,
    animateStatNumber
};
