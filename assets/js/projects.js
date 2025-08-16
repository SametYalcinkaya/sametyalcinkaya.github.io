// Projects Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize projects functionality
    initProjects();
    
    // Stats animation
    animateStats();
    
    // Project filtering and search
    initProjectFiltering();
    
    // Project details modal
    initProjectModal();
    
    // Load more functionality
    initLoadMore();
    
    // Lazy loading for images
    initImageLazyLoading();
    
    // Project card animations
    initProjectAnimations();
});

// Initialize projects
function initProjects() {
    console.log('Projects page initialized');
    
    // Store all project cards for filtering
    window.allProjects = document.querySelectorAll('.project-card');
    window.currentlyVisible = 6; // Show 6 initially
    window.projectsPerLoad = 3; // Load 3 more each time
    
    // Hide projects beyond initial count
    hideExtraProjects();
    
    // Initialize project interactions
    initProjectInteractions();
}

// Hide projects beyond initial visible count
function hideExtraProjects() {
    window.allProjects.forEach((project, index) => {
        if (index >= window.currentlyVisible) {
            project.style.display = 'none';
            project.classList.add('hidden-project');
        }
    });
    
    // Update load more button state
    updateLoadMoreButton();
}

// Animate statistics counters
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
                observer.unobserve(stat);
            }
        });
    }, {
        threshold: 0.5
    });
    
    stats.forEach(stat => observer.observe(stat));
}

// Counter animation function
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000; // 2 seconds
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        element.textContent = Math.floor(current);
    }, stepTime);
}

// Initialize project filtering and search
function initProjectFiltering() {
    const searchInput = document.getElementById('project-search');
    const categoryFilters = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sort-projects');
    
    let currentFilter = 'all';
    let currentSort = 'newest';
    let searchQuery = '';
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase();
            filterProjects(currentFilter, searchQuery, currentSort);
        });
    }
    
    // Category filtering
    categoryFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            categoryFilters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentFilter = btn.getAttribute('data-category');
            filterProjects(currentFilter, searchQuery, currentSort);
        });
    });
    
    // Sorting
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            filterProjects(currentFilter, searchQuery, currentSort);
        });
    }
}

// Filter projects based on criteria
function filterProjects(category, search, sort) {
    let visibleProjects = Array.from(window.allProjects).filter(project => {
        // Category filter
        const projectCategory = project.getAttribute('data-category');
        const categoryMatch = category === 'all' || projectCategory === category;
        
        // Search filter
        const projectTitle = project.querySelector('.project-title').textContent.toLowerCase();
        const projectDesc = project.querySelector('.project-description').textContent.toLowerCase();
        const projectTech = Array.from(project.querySelectorAll('.tech-tag'))
            .map(tag => tag.textContent.toLowerCase())
            .join(' ');
        
        const searchMatch = search === '' || 
            projectTitle.includes(search) || 
            projectDesc.includes(search) || 
            projectTech.includes(search);
        
        return categoryMatch && searchMatch;
    });
    
    // Sort projects
    visibleProjects.sort((a, b) => {
        switch(sort) {
            case 'newest':
                return new Date(b.getAttribute('data-date')) - new Date(a.getAttribute('data-date'));
            case 'oldest':
                return new Date(a.getAttribute('data-date')) - new Date(b.getAttribute('data-date'));
            case 'name':
                return a.querySelector('.project-title').textContent.localeCompare(
                    b.querySelector('.project-title').textContent
                );
            case 'stars':
                return parseInt(b.getAttribute('data-stars')) - parseInt(a.getAttribute('data-stars'));
            default:
                return 0;
        }
    });
    
    // Hide all projects first
    window.allProjects.forEach(project => {
        project.style.display = 'none';
        project.classList.remove('fade-in');
    });
    
    // Show filtered projects with animation
    visibleProjects.forEach((project, index) => {
        setTimeout(() => {
            project.style.display = 'block';
            project.classList.add('fade-in');
        }, index * 100);
    });
    
    // Update counts
    updateFilterCounts();
    
    // Update load more state
    window.currentlyVisible = Math.min(6, visibleProjects.length);
    updateLoadMoreButton();
    
    // Show no results message if needed
    showNoResultsMessage(visibleProjects.length === 0);
}

// Update filter counts
function updateFilterCounts() {
    const categoryFilters = document.querySelectorAll('.filter-btn');
    
    categoryFilters.forEach(btn => {
        const category = btn.getAttribute('data-category');
        let count = 0;
        
        if (category === 'all') {
            count = window.allProjects.length;
        } else {
            count = Array.from(window.allProjects).filter(project => 
                project.getAttribute('data-category') === category
            ).length;
        }
        
        const countSpan = btn.querySelector('.count');
        if (countSpan) {
            countSpan.textContent = count;
        }
    });
}

// Show/hide no results message
function showNoResultsMessage(show) {
    let noResultsDiv = document.querySelector('.no-results');
    
    if (show && !noResultsDiv) {
        noResultsDiv = document.createElement('div');
        noResultsDiv.className = 'no-results';
        noResultsDiv.innerHTML = `
            <div class="no-results-content">
                <i class="fas fa-search fa-3x"></i>
                <h3>Sonuç Bulunamadı</h3>
                <p>Arama kriterlerinize uygun proje bulunamadı. Lütfen farklı anahtar kelimeler deneyin.</p>
            </div>
        `;
        
        document.getElementById('projects-container').appendChild(noResultsDiv);
    } else if (!show && noResultsDiv) {
        noResultsDiv.remove();
    }
}

// Initialize project modal
function initProjectModal() {
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.getElementById('modal-close');
    
    // Project detail buttons
    document.addEventListener('click', (e) => {
        if (e.target.closest('.project-detail-btn')) {
            e.preventDefault();
            const projectId = e.target.closest('.project-detail-btn').getAttribute('data-project');
            showProjectDetails(projectId);
        }
    });
    
    // Close modal
    closeBtn?.addEventListener('click', () => {
        closeModal();
    });
    
    // Close modal on outside click
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('active')) {
            closeModal();
        }
    });
    
    function showProjectDetails(projectId) {
        const projectData = getProjectData(projectId);
        
        if (projectData) {
            modalTitle.textContent = projectData.title;
            modalBody.innerHTML = generateProjectDetailHTML(projectData);
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Get project data by ID
function getProjectData(projectId) {
    const projectsData = {
        'portfolio': {
            title: 'Kişisel Portfolio Website',
            description: 'Modern tasarım anlayışıyla geliştirilmiş, responsive ve performansı optimize edilmiş kişisel portfolio website.',
            longDescription: `Bu proje, profesyonel bir online varlık oluşturmak amacıyla tasarlanmış ve geliştirilmiş modern bir portfolio websitedir. 

Proje Özellikleri:
• Responsive tasarım - tüm cihazlarda mükemmel görünüm
• Dark/Light mode desteği
• SEO optimize edilmiş yapı
• Performans odaklı geliştirme
• Accessibility standartlarına uygun
• Modern CSS Grid ve Flexbox kullanımı
• Smooth scrolling ve animasyonlar
• Contact form entegrasyonu

Teknik Detaylar:
HTML5 semantik etiketleri kullanılarak yapılandırılmış, CSS3 ile modern styling teknikleri uygulanmış ve vanilla JavaScript ile etkileşimli özellikler eklenmiştir. Performans optimizasyonu için image lazy loading, CSS ve JavaScript minification gibi teknikler kullanılmıştır.`,
            tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
            github: 'https://github.com/sametyalcinkaya/portfolio',
            demo: 'https://sametyalcinkaya.github.io',
            status: 'Aktif',
            date: 'Ağustos 2025',
            features: [
                'Responsive Design',
                'Dark/Light Mode',
                'SEO Optimizasyonu',
                'Contact Form',
                'Blog Entegrasyonu',
                'Project Showcase'
            ],
            images: [
                'assets/images/projects/portfolio-1.jpg',
                'assets/images/projects/portfolio-2.jpg',
                'assets/images/projects/portfolio-3.jpg'
            ]
        },
        'ai-chatbot': {
            title: 'AI Destekli Chatbot',
            description: 'OpenAI GPT-4 entegreli, doğal dil işleme yeteneklerine sahip akıllı chatbot.',
            longDescription: `Modern yapay zeka teknolojilerini kullanarak geliştirilmiş, kullanıcılarla doğal bir şekilde iletişim kurabilen akıllı chatbot uygulaması.

Proje Özellikleri:
• OpenAI GPT-4 API entegrasyonu
• Gerçek zamanlı mesajlaşma
• Çoklu dil desteği
• Conversation history
• Kullanıcı kimlik doğrulama
• Responsive web arayüzü
• Real-time typing indicators
• Message reactions

Teknik Altyapı:
React.js frontend framework'ü ile modern bir kullanıcı arayüzü, Node.js ve Express.js backend yapısı, Socket.io ile real-time iletişim, MongoDB veritabanı ve JWT tabanlı kimlik doğrulama sistemi kullanılmıştır.`,
            tech: ['React', 'Node.js', 'OpenAI API', 'Socket.io'],
            github: 'https://github.com/sametyalcinkaya/ai-chatbot',
            demo: 'https://ai-chatbot-demo.vercel.app',
            status: 'Aktif',
            date: 'Temmuz 2025',
            features: [
                'GPT-4 Integration',
                'Real-time Chat',
                'Multi-language Support',
                'User Authentication',
                'Chat History',
                'Mobile Responsive'
            ],
            images: [
                'assets/images/projects/chatbot-1.jpg',
                'assets/images/projects/chatbot-2.jpg',
                'assets/images/projects/chatbot-3.jpg'
            ]
        }
        // More project data can be added here
    };
    
    return projectsData[projectId];
}

// Generate project detail HTML
function generateProjectDetailHTML(project) {
    return `
        <div class="project-detail">
            <div class="project-detail-header">
                <div class="project-meta">
                    <span class="project-date">
                        <i class="fas fa-calendar-alt"></i>
                        ${project.date}
                    </span>
                    <span class="project-status ${project.status.toLowerCase()}">
                        <i class="fas fa-circle"></i>
                        ${project.status}
                    </span>
                </div>
                <div class="project-links">
                    ${project.github ? `<a href="${project.github}" class="btn-outline" target="_blank">
                        <i class="fab fa-github"></i> GitHub
                    </a>` : ''}
                    ${project.demo ? `<a href="${project.demo}" class="btn-primary" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Canlı Demo
                    </a>` : ''}
                </div>
            </div>
            
            <div class="project-detail-content">
                <div class="project-description">
                    <h3>Proje Hakkında</h3>
                    <p>${project.longDescription.replace(/\n/g, '</p><p>')}</p>
                </div>
                
                <div class="project-technologies">
                    <h3>Kullanılan Teknolojiler</h3>
                    <div class="tech-list">
                        ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <div class="project-features">
                    <h3>Özellikler</h3>
                    <ul class="features-list">
                        ${project.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                    </ul>
                </div>
                
                ${project.images ? `
                <div class="project-gallery">
                    <h3>Proje Görselleri</h3>
                    <div class="gallery-grid">
                        ${project.images.map(img => `
                            <div class="gallery-item">
                                <img src="${img}" alt="${project.title}" loading="lazy" onclick="openImageModal('${img}')">
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
        </div>
    `;
}

// Initialize load more functionality
function initLoadMore() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    loadMoreBtn?.addEventListener('click', () => {
        const hiddenProjects = Array.from(window.allProjects)
            .filter(project => project.classList.contains('hidden-project'))
            .slice(0, window.projectsPerLoad);
        
        hiddenProjects.forEach((project, index) => {
            setTimeout(() => {
                project.style.display = 'block';
                project.classList.remove('hidden-project');
                project.classList.add('fade-in');
                window.currentlyVisible++;
            }, index * 150);
        });
        
        setTimeout(() => {
            updateLoadMoreButton();
        }, hiddenProjects.length * 150);
    });
}

// Update load more button state
function updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    const hiddenCount = Array.from(window.allProjects)
        .filter(project => project.classList.contains('hidden-project')).length;
    
    if (loadMoreBtn) {
        if (hiddenCount === 0) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
            loadMoreBtn.innerHTML = `
                <i class="fas fa-plus"></i>
                ${hiddenCount} Proje Daha Yükle
            `;
        }
    }
}

// Initialize image lazy loading
function initImageLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('src') || img.getAttribute('data-src');
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize project animations
function initProjectAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    // Scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    projectCards.forEach(card => observer.observe(card));
}

// Initialize project interactions
function initProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Hover effects
        card.addEventListener('mouseenter', () => {
            card.classList.add('hovered');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hovered');
        });
        
        // Click tracking
        card.addEventListener('click', (e) => {
            if (!e.target.closest('a')) {
                // Track project card clicks
                const projectTitle = card.querySelector('.project-title')?.textContent;
                console.log(`Project clicked: ${projectTitle}`);
            }
        });
    });
}

// Global function for filtering (called from footer links)
window.filterProjects = function(category) {
    const categoryBtn = document.querySelector(`[data-category="${category}"]`);
    if (categoryBtn) {
        categoryBtn.click();
    }
};

// Open image modal (for project gallery)
window.openImageModal = function(imageSrc) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="image-modal-content">
            <img src="${imageSrc}" alt="Project Image">
            <button class="image-modal-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close handlers
    modal.querySelector('.image-modal-close').addEventListener('click', () => {
        document.body.removeChild(modal);
        document.body.style.overflow = '';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        }
    });
    
    // Animate in
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
};

// CSS styles for projects functionality
const projectStyles = `
/* Projects specific styles */
.projects-hero {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
    color: white;
    padding: 120px 0 80px;
    text-align: center;
}

.hero-title {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 20px;
    animation: slideInDown 0.8s ease-out;
}

.hero-subtitle {
    font-size: 1.2rem;
    max-width: 600px;
    margin: 0 auto 50px;
    line-height: 1.6;
    animation: slideInUp 0.8s ease-out 0.2s both;
}

.projects-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 30px;
    max-width: 800px;
    margin: 0 auto;
    animation: fadeInUp 0.8s ease-out 0.4s both;
}

.stat-item {
    text-align: center;
}

.stat-number {
    font-size: 2.5rem;
    font-weight: 700;
    display: block;
    margin-bottom: 8px;
}

.stat-label {
    font-size: 0.9rem;
    opacity: 0.9;
}

.projects-filter {
    padding: 60px 0;
    background: var(--surface-color);
    border-bottom: 1px solid var(--border-color);
}

.filter-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;
    justify-content: space-between;
}

.search-box {
    position: relative;
    flex: 1;
    min-width: 300px;
}

.search-box i {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-secondary);
}

.search-box input {
    width: 100%;
    padding: 12px 50px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: var(--bg-color);
    color: var(--text-color);
    font-size: 1rem;
}

.category-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.filter-btn {
    background: var(--bg-color);
    border: 1px solid var(--border-color);
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--text-color);
}

.filter-btn:hover,
.filter-btn.active {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
}

.filter-btn .count {
    background: var(--text-secondary);
    color: white;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.8rem;
}

.filter-btn.active .count {
    background: rgba(255, 255, 255, 0.3);
}

.sort-options select {
    padding: 10px 15px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: var(--bg-color);
    color: var(--text-color);
    cursor: pointer;
}

.projects-grid {
    padding: 80px 0;
}

.projects-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 30px;
    margin-bottom: 60px;
}

.project-card {
    background: var(--surface-color);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: var(--shadow-sm);
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(20px);
}

.project-card.fade-in {
    opacity: 1;
    transform: translateY(0);
}

.project-card:hover,
.project-card.hovered {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
}

.project-card.featured {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
}

.project-image {
    position: relative;
    overflow: hidden;
    aspect-ratio: 16/10;
}

.featured .project-image {
    aspect-ratio: 16/12;
}

.project-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
}

.project-card:hover .project-image img {
    transform: scale(1.05);
}

.project-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s;
}

.project-card:hover .project-overlay {
    opacity: 1;
}

.project-links {
    display: flex;
    gap: 15px;
}

.project-link {
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-decoration: none;
    transition: all 0.3s;
    backdrop-filter: blur(10px);
}

.project-link:hover {
    background: var(--primary-color);
    border-color: var(--primary-color);
    transform: scale(1.1);
}

.featured-badge {
    position: absolute;
    top: 20px;
    right: 20px;
    background: var(--accent-color);
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
}

.project-content {
    padding: 25px;
}

.project-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 15px;
}

.project-title {
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--text-color);
    margin: 0;
}

.project-stats {
    display: flex;
    gap: 15px;
}

.project-stats .stat {
    display: flex;
    align-items: center;
    gap: 5px;
    color: var(--text-secondary);
    font-size: 0.9rem;
}

.project-description {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 20px;
}

.project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 20px;
}

.tech-tag {
    background: var(--primary-color);
    color: white;
    padding: 4px 12px;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 500;
}

.project-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 15px;
    border-top: 1px solid var(--border-color);
}

.project-date {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--text-secondary);
    font-size: 0.9rem;
}

.project-status {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
    font-weight: 500;
}

.project-status.active {
    color: var(--success-color);
}

.project-status.completed {
    color: var(--primary-color);
}

.load-more-container {
    text-align: center;
    padding-top: 40px;
}

.load-more-btn {
    background: var(--surface-color);
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
    padding: 15px 30px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 10px;
}

.load-more-btn:hover {
    background: var(--primary-color);
    color: white;
}

.projects-cta {
    background: var(--surface-color);
    padding: 80px 0;
    text-align: center;
    border-top: 1px solid var(--border-color);
}

.cta-content h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: var(--text-color);
}

.cta-content p {
    font-size: 1.1rem;
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto 40px;
}

.cta-buttons {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
}

/* Modal Styles */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
}

.modal.active {
    opacity: 1;
    visibility: visible;
}

.modal-content {
    background: var(--surface-color);
    border-radius: 12px;
    width: 90%;
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
    transform: scale(0.7);
    transition: transform 0.3s;
}

.modal.active .modal-content {
    transform: scale(1);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    border-bottom: 1px solid var(--border-color);
}

.modal-header h2 {
    margin: 0;
    color: var(--text-color);
}

.modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 5px;
    border-radius: 4px;
    transition: all 0.2s;
}

.modal-close:hover {
    background: var(--hover-color);
    color: var(--text-color);
}

.modal-body {
    padding: 30px;
}

.project-detail-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--border-color);
}

.project-meta {
    display: flex;
    gap: 20px;
}

.project-detail-content h3 {
    color: var(--text-color);
    margin: 30px 0 15px 0;
}

.project-detail-content h3:first-child {
    margin-top: 0;
}

.tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.features-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.features-list li {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    color: var(--text-secondary);
}

.features-list i {
    color: var(--success-color);
}

.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
}

.gallery-item img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.3s;
}

.gallery-item img:hover {
    transform: scale(1.05);
}

/* No Results */
.no-results {
    grid-column: 1 / -1;
    text-align: center;
    padding: 60px 20px;
}

.no-results-content i {
    color: var(--text-secondary);
    margin-bottom: 20px;
}

.no-results-content h3 {
    color: var(--text-color);
    margin-bottom: 15px;
}

.no-results-content p {
    color: var(--text-secondary);
}

/* Image Modal */
.image-modal {
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

.image-modal.active {
    opacity: 1;
}

.image-modal-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
}

.image-modal-content img {
    max-width: 100%;
    max-height: 100%;
    border-radius: 8px;
}

.image-modal-close {
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

.image-modal-close:hover {
    background: rgba(255, 255, 255, 0.2);
}

/* Animations */
@keyframes slideInDown {
    from {
        opacity: 0;
        transform: translateY(-30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive Design */
@media (max-width: 768px) {
    .hero-title {
        font-size: 2rem;
    }
    
    .projects-stats {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .filter-controls {
        flex-direction: column;
        align-items: stretch;
    }
    
    .search-box {
        min-width: auto;
    }
    
    .projects-container {
        grid-template-columns: 1fr;
        gap: 20px;
    }
    
    .project-card.featured {
        grid-template-columns: 1fr;
    }
    
    .project-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }
    
    .cta-content h2 {
        font-size: 2rem;
    }
    
    .cta-buttons {
        flex-direction: column;
        align-items: center;
    }
    
    .modal-content {
        width: 95%;
        margin: 20px;
    }
    
    .modal-body {
        padding: 20px;
    }
    
    .project-detail-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }
}

@media (max-width: 480px) {
    .projects-stats {
        grid-template-columns: 1fr;
    }
    
    .project-content {
        padding: 20px;
    }
}
`;

// Add styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = projectStyles;
document.head.appendChild(styleSheet);
