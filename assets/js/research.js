// Research Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize research functionality
    initResearch();
    
    // Stats animation
    animateStats();
    
    // Research filtering and search
    initResearchFiltering();
    
    // Citation modal
    initCitationModal();
    
    // Publication interactions
    initPublicationInteractions();
    
    // Load more functionality
    initLoadMore();
});

// Initialize research page
function initResearch() {
    console.log('Research page initialized');
    
    // Store all publications for filtering
    window.allPublications = document.querySelectorAll('.publication-item');
    window.currentlyVisible = 3; // Show 3 initially
    window.publicationsPerLoad = 2; // Load 2 more each time
    
    // Hide publications beyond initial count
    hideExtraPublications();
    
    // Initialize abstract expansion
    initAbstractExpansion();
}

// Hide publications beyond initial visible count
function hideExtraPublications() {
    window.allPublications.forEach((pub, index) => {
        if (index >= window.currentlyVisible) {
            pub.style.display = 'none';
            pub.classList.add('hidden-publication');
        }
    });
    
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
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        element.textContent = Math.floor(current);
    }, stepTime);
}

// Initialize research filtering and search
function initResearchFiltering() {
    const searchInput = document.getElementById('research-search');
    const categoryFilters = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sort-research');
    
    let currentFilter = 'all';
    let currentSort = 'newest';
    let searchQuery = '';
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase();
            filterPublications(currentFilter, searchQuery, currentSort);
        });
    }
    
    // Category filtering
    categoryFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryFilters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentFilter = btn.getAttribute('data-category');
            filterPublications(currentFilter, searchQuery, currentSort);
        });
    });
    
    // Sorting
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            filterPublications(currentFilter, searchQuery, currentSort);
        });
    }
}

// Filter publications based on criteria
function filterPublications(category, search, sort) {
    let visiblePubs = Array.from(window.allPublications).filter(pub => {
        // Category filter
        const pubCategory = pub.getAttribute('data-category');
        const categoryMatch = category === 'all' || pubCategory === category;
        
        // Search filter
        const pubTitle = pub.querySelector('.publication-title').textContent.toLowerCase();
        const pubAuthors = pub.querySelector('.publication-authors').textContent.toLowerCase();
        const pubVenue = pub.querySelector('.publication-venue').textContent.toLowerCase();
        const pubTags = Array.from(pub.querySelectorAll('.tag'))
            .map(tag => tag.textContent.toLowerCase())
            .join(' ');
        
        const searchMatch = search === '' || 
            pubTitle.includes(search) || 
            pubAuthors.includes(search) ||
            pubVenue.includes(search) ||
            pubTags.includes(search);
        
        return categoryMatch && searchMatch;
    });
    
    // Sort publications
    visiblePubs.sort((a, b) => {
        switch(sort) {
            case 'newest':
                return parseInt(b.getAttribute('data-year')) - parseInt(a.getAttribute('data-year'));
            case 'oldest':
                return parseInt(a.getAttribute('data-year')) - parseInt(b.getAttribute('data-year'));
            case 'citations':
                return parseInt(b.getAttribute('data-citations') || '0') - parseInt(a.getAttribute('data-citations') || '0');
            case 'title':
                return a.querySelector('.publication-title').textContent.localeCompare(
                    b.querySelector('.publication-title').textContent
                );
            default:
                return 0;
        }
    });
    
    // Hide all publications first
    window.allPublications.forEach(pub => {
        pub.style.display = 'none';
        pub.classList.remove('fade-in');
    });
    
    // Show filtered publications with animation
    visiblePubs.forEach((pub, index) => {
        setTimeout(() => {
            pub.style.display = 'block';
            pub.classList.add('fade-in');
        }, index * 100);
    });
    
    // Update counts
    updateFilterCounts();
    
    // Update load more state
    window.currentlyVisible = Math.min(3, visiblePubs.length);
    updateLoadMoreButton();
    
    // Show no results message if needed
    showNoResultsMessage(visiblePubs.length === 0);
}

// Update filter counts
function updateFilterCounts() {
    const categoryFilters = document.querySelectorAll('.filter-btn');
    
    categoryFilters.forEach(btn => {
        const category = btn.getAttribute('data-category');
        let count = 0;
        
        if (category === 'all') {
            count = window.allPublications.length;
        } else {
            count = Array.from(window.allPublications).filter(pub => 
                pub.getAttribute('data-category') === category
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
                <p>Arama kriterlerinize uygun yayın bulunamadı. Lütfen farklı anahtar kelimeler deneyin.</p>
            </div>
        `;
        
        document.getElementById('publications-list').appendChild(noResultsDiv);
    } else if (!show && noResultsDiv) {
        noResultsDiv.remove();
    }
}

// Initialize citation modal
function initCitationModal() {
    const modal = document.getElementById('citation-modal');
    const modalBody = document.getElementById('citation-body');
    const closeBtn = document.getElementById('citation-close');
    
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
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Show citation modal
window.showCitation = function(publicationId) {
    const modal = document.getElementById('citation-modal');
    const modalBody = document.getElementById('citation-body');
    
    const citationData = getCitationData(publicationId);
    
    if (citationData) {
        modalBody.innerHTML = generateCitationHTML(citationData);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};

// Get citation data by ID
function getCitationData(publicationId) {
    const citations = {
        'ai-optimization-2025': {
            title: 'Yapay Zeka Destekli Optimizasyon Algoritmalarının Endüstriyel Uygulamalardaki Performans Analizi',
            authors: ['H.S. Yalçınkaya', 'A. Özkan', 'M. Demir'],
            journal: 'Journal of Industrial Engineering and Management',
            year: '2025',
            volume: '18',
            issue: '3',
            pages: '245-267',
            doi: '10.1000/182'
        },
        'iot-security-2025': {
            title: 'IoT Tabanlı Akıllı Şehir Sistemlerinde Güvenlik Protokolleri ve Risk Analizi',
            authors: ['H.S. Yalçınkaya', 'K. Arslan'],
            conference: 'IEEE International Conference on Smart Cities (ICSC 2025)',
            location: 'İstanbul, Türkiye',
            year: '2025',
            pages: '123-128'
        },
        'blockchain-2024': {
            title: 'Blockchain Teknolojisinin Tedarik Zinciri Yönetimindeki Uygulamaları: Türkiye Örneklemi',
            authors: ['H.S. Yalçınkaya', 'P. Kaya', 'S. Uzun'],
            type: 'Teknik Rapor',
            institution: 'TÜBİTAK',
            number: 'TR-2024-015',
            year: '2024'
        }
    };
    
    return citations[publicationId];
}

// Generate citation HTML
function generateCitationHTML(citation) {
    const authorsStr = citation.authors.join(', ');
    
    let citationText = '';
    let bibtex = '';
    
    if (citation.journal) {
        // Journal article
        citationText = `${authorsStr} (${citation.year}). "${citation.title}". <em>${citation.journal}</em>, ${citation.volume}(${citation.issue}), ${citation.pages}.`;
        if (citation.doi) {
            citationText += ` DOI: ${citation.doi}`;
        }
        
        bibtex = `@article{yalcinkaya${citation.year},
  title={${citation.title}},
  author={${authorsStr.replace(/H.S. Yalçınkaya/g, 'Yalçınkaya, Hıdır Samet')}},
  journal={${citation.journal}},
  volume={${citation.volume}},
  number={${citation.issue}},
  pages={${citation.pages}},
  year={${citation.year}}${citation.doi ? `,\n  doi={${citation.doi}}` : ''}
}`;
    } else if (citation.conference) {
        // Conference paper
        citationText = `${authorsStr} (${citation.year}). "${citation.title}". In <em>${citation.conference}</em>${citation.location ? `, ${citation.location}` : ''}${citation.pages ? `, pp. ${citation.pages}` : ''}.`;
        
        bibtex = `@inproceedings{yalcinkaya${citation.year},
  title={${citation.title}},
  author={${authorsStr.replace(/H.S. Yalçınkaya/g, 'Yalçınkaya, Hıdır Samet')}},
  booktitle={${citation.conference}},${citation.location ? `\n  address={${citation.location}},` : ''}${citation.pages ? `\n  pages={${citation.pages}},` : ''}
  year={${citation.year}}
}`;
    } else if (citation.type === 'Teknik Rapor') {
        // Technical report
        citationText = `${authorsStr} (${citation.year}). "${citation.title}". ${citation.institution} ${citation.type} ${citation.number}.`;
        
        bibtex = `@techreport{yalcinkaya${citation.year},
  title={${citation.title}},
  author={${authorsStr.replace(/H.S. Yalçınkaya/g, 'Yalçınkaya, Hıdır Samet')}},
  institution={${citation.institution}},
  number={${citation.number}},
  year={${citation.year}}
}`;
    }
    
    return `
        <div class="citation-formats">
            <div class="citation-format">
                <h3>APA Formatı</h3>
                <div class="citation-text" id="apa-citation">
                    ${citationText}
                </div>
                <button class="copy-btn" onclick="copyCitation('apa-citation')">
                    <i class="fas fa-copy"></i>
                    Kopyala
                </button>
            </div>
            
            <div class="citation-format">
                <h3>BibTeX</h3>
                <pre class="bibtex-text" id="bibtex-citation">${bibtex}</pre>
                <button class="copy-btn" onclick="copyCitation('bibtex-citation')">
                    <i class="fas fa-copy"></i>
                    Kopyala
                </button>
            </div>
        </div>
    `;
}

// Copy citation function
window.copyCitation = function(elementId) {
    const element = document.getElementById(elementId);
    const text = element.textContent || element.innerText;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Atıf bilgisi kopyalandı!', 'success');
        });
    } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            document.execCommand('copy');
            showNotification('Atıf bilgisi kopyalandı!', 'success');
        } catch (err) {
            showNotification('Kopyalama başarısız', 'error');
        }
        
        document.body.removeChild(textarea);
    }
};

// Initialize publication interactions
function initPublicationInteractions() {
    // Favorite functionality
    window.toggleFavorite = function(button) {
        const icon = button.querySelector('i');
        const isFavorited = icon.classList.contains('fas');
        
        if (isFavorited) {
            icon.classList.replace('fas', 'far');
            button.classList.remove('favorited');
            showNotification('Favorilerden kaldırıldı', 'info');
        } else {
            icon.classList.replace('far', 'fas');
            button.classList.add('favorited');
            showNotification('Favorilere eklendi! ❤️', 'success');
        }
        
        // Store in localStorage
        const pubTitle = button.closest('.publication-item').querySelector('.publication-title').textContent;
        const favorites = JSON.parse(localStorage.getItem('researchFavorites') || '[]');
        
        if (isFavorited) {
            const index = favorites.indexOf(pubTitle);
            if (index > -1) favorites.splice(index, 1);
        } else {
            if (!favorites.includes(pubTitle)) favorites.push(pubTitle);
        }
        
        localStorage.setItem('researchFavorites', JSON.stringify(favorites));
    };
    
    // Share functionality
    window.sharePublication = function(button) {
        const publication = button.closest('.publication-item');
        const title = publication.querySelector('.publication-title').textContent;
        const url = window.location.href;
        
        if (navigator.share) {
            navigator.share({
                title: title,
                text: `"${title}" - Hıdır Samet YALÇINKAYA`,
                url: url
            });
        } else {
            // Fallback: copy to clipboard
            const shareText = `"${title}" - ${url}`;
            navigator.clipboard.writeText(shareText).then(() => {
                showNotification('Paylaşım linki kopyalandı!', 'success');
            });
        }
    };
    
    // Load favorites from localStorage
    loadFavorites();
}

// Load favorites from localStorage
function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('researchFavorites') || '[]');
    
    document.querySelectorAll('.publication-item').forEach(pub => {
        const title = pub.querySelector('.publication-title').textContent;
        if (favorites.includes(title)) {
            const favoriteBtn = pub.querySelector('[onclick*="toggleFavorite"]');
            if (favoriteBtn) {
                const icon = favoriteBtn.querySelector('i');
                icon.classList.replace('far', 'fas');
                favoriteBtn.classList.add('favorited');
            }
        }
    });
}

// Initialize abstract expansion
function initAbstractExpansion() {
    window.toggleAbstract = function(button) {
        const abstractDiv = button.closest('.publication-abstract');
        const text = button.querySelector('.expand-text');
        const icon = button.querySelector('i');
        const isExpanded = abstractDiv.classList.contains('expanded');
        
        if (isExpanded) {
            abstractDiv.classList.remove('expanded');
            text.textContent = 'Devamını Oku';
            icon.style.transform = 'rotate(0deg)';
        } else {
            abstractDiv.classList.add('expanded');
            text.textContent = 'Kısa Göster';
            icon.style.transform = 'rotate(180deg)';
        }
    };
}

// Initialize load more functionality
function initLoadMore() {
    const loadMoreBtn = document.getElementById('load-more-research');
    
    loadMoreBtn?.addEventListener('click', () => {
        const hiddenPubs = Array.from(window.allPublications)
            .filter(pub => pub.classList.contains('hidden-publication'))
            .slice(0, window.publicationsPerLoad);
        
        hiddenPubs.forEach((pub, index) => {
            setTimeout(() => {
                pub.style.display = 'block';
                pub.classList.remove('hidden-publication');
                pub.classList.add('fade-in');
                window.currentlyVisible++;
            }, index * 150);
        });
        
        setTimeout(() => {
            updateLoadMoreButton();
        }, hiddenPubs.length * 150);
    });
}

// Update load more button state
function updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById('load-more-research');
    const hiddenCount = Array.from(window.allPublications)
        .filter(pub => pub.classList.contains('hidden-publication')).length;
    
    if (loadMoreBtn) {
        if (hiddenCount === 0) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
            loadMoreBtn.innerHTML = `
                <i class="fas fa-plus"></i>
                ${hiddenCount} Yayın Daha Yükle
            `;
        }
    }
}

// Global function for filtering (called from footer links)
window.filterResearch = function(tag) {
    const searchInput = document.getElementById('research-search');
    if (searchInput) {
        searchInput.value = tag;
        searchInput.dispatchEvent(new Event('input'));
    }
};

// Utility function for notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// CSS styles for research functionality
const researchStyles = `
/* Research specific styles */
.research-hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

.research-stats {
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

.research-filter {
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

.featured-research {
    padding: 80px 0;
    background: var(--bg-color);
}

.section-title {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 60px;
    color: var(--text-color);
}

.featured-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 40px;
}

.main-feature {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    background: var(--surface-color);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: var(--shadow-lg);
}

.feature-image {
    position: relative;
}

.feature-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.feature-badge {
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

.feature-content {
    padding: 30px;
}

.feature-meta {
    display: flex;
    gap: 15px;
    margin-bottom: 15px;
}

.publication-type {
    background: var(--primary-color);
    color: white;
    padding: 4px 12px;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 500;
}

.publication-date {
    color: var(--text-secondary);
    font-weight: 500;
}

.feature-title {
    color: var(--text-color);
    margin-bottom: 15px;
    font-size: 1.3rem;
    line-height: 1.4;
}

.feature-abstract {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 20px;
}

.feature-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 20px;
}

.tag {
    background: var(--tag-bg);
    color: var(--tag-color);
    padding: 4px 12px;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 500;
}

.feature-metrics {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
}

.metric {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--text-secondary);
    font-size: 0.9rem;
}

.feature-actions {
    display: flex;
    gap: 15px;
}

.feature-sidebar {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.feature-sidebar .featured-item {
    background: var(--surface-color);
    border-radius: 12px;
    padding: 20px;
    box-shadow: var(--shadow-sm);
}

.feature-sidebar .feature-title {
    font-size: 1.1rem;
    margin-bottom: 10px;
}

.research-publications {
    padding: 80px 0;
}

.publications-list {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-bottom: 60px;
}

.publication-item {
    background: var(--surface-color);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: var(--shadow-sm);
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(20px);
}

.publication-item.fade-in {
    opacity: 1;
    transform: translateY(0);
}

.publication-item:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-2px);
}

.publication-content {
    padding: 30px;
}

.publication-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
}

.publication-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    align-items: center;
}

.pub-type {
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
}

.pub-type.journal {
    background: #e3f2fd;
    color: #1976d2;
}

.pub-type.conference {
    background: #f3e5f5;
    color: #7b1fa2;
}

.pub-type.report {
    background: #e8f5e8;
    color: #388e3c;
}

.pub-year {
    color: var(--text-secondary);
    font-weight: 600;
}

.pub-status {
    padding: 4px 12px;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 500;
}

.pub-status.published {
    background: #e8f5e8;
    color: #388e3c;
}

.publication-actions {
    display: flex;
    gap: 10px;
}

.action-btn {
    background: none;
    border: 1px solid var(--border-color);
    padding: 8px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s;
    color: var(--text-secondary);
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.action-btn:hover {
    background: var(--hover-color);
    border-color: var(--primary-color);
    color: var(--primary-color);
}

.action-btn.favorited {
    background: #ffebee;
    border-color: #f44336;
    color: #f44336;
}

.publication-title {
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 15px;
    line-height: 1.3;
}

.publication-authors {
    margin-bottom: 15px;
    color: var(--text-secondary);
}

.publication-authors strong {
    color: var(--text-color);
}

.publication-venue {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    color: var(--text-secondary);
    font-style: italic;
}

.publication-abstract {
    margin-bottom: 20px;
    position: relative;
    max-height: 100px;
    overflow: hidden;
    transition: max-height 0.3s ease;
}

.publication-abstract.expanded {
    max-height: none;
}

.publication-abstract p {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 10px;
}

.expand-abstract {
    background: none;
    border: none;
    color: var(--primary-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.9rem;
    font-weight: 500;
    margin-top: 10px;
}

.expand-abstract i {
    transition: transform 0.3s;
}

.publication-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 20px;
}

.publication-metrics {
    display: flex;
    gap: 30px;
    margin-bottom: 25px;
    padding: 15px 0;
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
}

.publication-metrics .metric {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
}

.metric-value {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--text-color);
}

.metric-label {
    font-size: 0.8rem;
    color: var(--text-secondary);
}

.publication-links {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
}

.pub-link {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s;
    border: 1px solid var(--border-color);
    color: var(--text-color);
}

.pub-link.primary {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
}

.pub-link:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm);
}

.pub-link.primary:hover {
    background: var(--primary-dark);
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

.research-collaboration {
    background: var(--surface-color);
    padding: 80px 0;
    border-top: 1px solid var(--border-color);
}

.collaboration-content {
    text-align: center;
    margin-bottom: 60px;
}

.collaboration-content h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: var(--text-color);
}

.collaboration-content p {
    font-size: 1.1rem;
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto 40px;
}

.collaboration-buttons {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
}

.collaboration-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
}

.collab-item {
    text-align: center;
    padding: 30px 20px;
    background: var(--bg-color);
    border-radius: 12px;
    box-shadow: var(--shadow-sm);
}

.collab-item i {
    font-size: 3rem;
    color: var(--primary-color);
    margin-bottom: 20px;
}

.collab-item h4 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: var(--text-color);
}

.collab-item p {
    color: var(--text-secondary);
}

/* Citation Modal */
.citation-formats {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.citation-format {
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 20px;
}

.citation-format h3 {
    margin: 0 0 15px 0;
    color: var(--text-color);
}

.citation-text {
    background: var(--surface-color);
    padding: 15px;
    border-radius: 6px;
    font-family: 'Georgia', serif;
    line-height: 1.6;
    margin-bottom: 15px;
}

.bibtex-text {
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    padding: 15px;
    font-family: 'Monaco', 'Consolas', monospace;
    font-size: 0.9rem;
    line-height: 1.4;
    margin-bottom: 15px;
    overflow-x: auto;
}

.copy-btn {
    background: var(--primary-color);
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
    transition: background 0.2s;
}

.copy-btn:hover {
    background: var(--primary-dark);
}

.academic-links {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.academic-links a {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--text-secondary);
    text-decoration: none;
    padding: 5px;
    border-radius: 4px;
    transition: all 0.2s;
}

.academic-links a:hover {
    color: var(--primary-color);
    background: var(--hover-color);
}

/* No Results */
.no-results {
    text-align: center;
    padding: 60px 20px;
    color: var(--text-secondary);
}

.no-results-content i {
    margin-bottom: 20px;
}

.no-results-content h3 {
    color: var(--text-color);
    margin-bottom: 15px;
}

/* Responsive Design */
@media (max-width: 768px) {
    .hero-title {
        font-size: 2rem;
    }
    
    .research-stats {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .filter-controls {
        flex-direction: column;
        align-items: stretch;
    }
    
    .search-box {
        min-width: auto;
    }
    
    .featured-grid {
        grid-template-columns: 1fr;
    }
    
    .main-feature {
        grid-template-columns: 1fr;
    }
    
    .publication-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }
    
    .publication-metrics {
        flex-wrap: wrap;
        gap: 15px;
    }
    
    .publication-links {
        justify-content: center;
    }
    
    .collaboration-content h2 {
        font-size: 2rem;
    }
    
    .collaboration-buttons {
        flex-direction: column;
        align-items: center;
    }
    
    .collaboration-stats {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 480px) {
    .research-stats {
        grid-template-columns: 1fr;
    }
    
    .publication-content {
        padding: 20px;
    }
    
    .feature-content {
        padding: 20px;
    }
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
`;

// Add styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = researchStyles;
document.head.appendChild(styleSheet);
