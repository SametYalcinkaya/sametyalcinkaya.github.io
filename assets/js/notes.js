// Notes Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize notes functionality
    initNotes();
    
    // Stats animation
    animateStats();
    
    // Notes filtering and search
    initNotesFiltering();
    
    // View toggle (grid/list)
    initViewToggle();
    
    // Note preview modal
    initNotePreviewModal();
    
    // Note interactions
    initNoteInteractions();
    
    // Load more functionality
    initLoadMore();
    
    // Newsletter functionality
    initNewsletter();
});

// Initialize notes page
function initNotes() {
    console.log('Notes page initialized');
    
    // Store all notes for filtering
    window.allNotes = document.querySelectorAll('.note-card');
    window.currentlyVisible = 6; // Show 6 initially
    window.notesPerLoad = 3; // Load 3 more each time
    
    // Hide notes beyond initial count
    hideExtraNotes();
    
    // Initialize MathJax if needed
    if (window.MathJax) {
        MathJax.startup.document.state(0);
        MathJax.texReset();
        MathJax.typesetPromise();
    }
}

// Hide notes beyond initial visible count
function hideExtraNotes() {
    window.allNotes.forEach((note, index) => {
        if (index >= window.currentlyVisible) {
            note.style.display = 'none';
            note.classList.add('hidden-note');
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
                const target = parseFloat(stat.getAttribute('data-target'));
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
    const isDecimal = target < 10 && target % 1 !== 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (isDecimal) {
            element.textContent = current.toFixed(1);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// Initialize notes filtering and search
function initNotesFiltering() {
    const searchInput = document.getElementById('notes-search');
    const categoryFilters = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sort-notes');
    
    let currentFilter = 'all';
    let currentSort = 'newest';
    let searchQuery = '';
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase();
            filterNotes(currentFilter, searchQuery, currentSort);
        });
    }
    
    // Category filtering
    categoryFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryFilters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentFilter = btn.getAttribute('data-category');
            filterNotes(currentFilter, searchQuery, currentSort);
        });
    });
    
    // Sorting
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            filterNotes(currentFilter, searchQuery, currentSort);
        });
    }
}

// Filter notes based on criteria
function filterNotes(category, search, sort) {
    let visibleNotes = Array.from(window.allNotes).filter(note => {
        // Category filter
        const noteCategory = note.getAttribute('data-category');
        const categoryMatch = category === 'all' || noteCategory === category;
        
        // Search filter
        const noteTitle = note.querySelector('.note-title').textContent.toLowerCase();
        const noteDesc = note.querySelector('.note-description').textContent.toLowerCase();
        const noteTags = Array.from(note.querySelectorAll('.tag'))
            .map(tag => tag.textContent.toLowerCase())
            .join(' ');
        
        const searchMatch = search === '' || 
            noteTitle.includes(search) || 
            noteDesc.includes(search) ||
            noteTags.includes(search);
        
        return categoryMatch && searchMatch;
    });
    
    // Sort notes
    visibleNotes.sort((a, b) => {
        switch(sort) {
            case 'newest':
                return new Date(b.getAttribute('data-date')) - new Date(a.getAttribute('data-date'));
            case 'oldest':
                return new Date(a.getAttribute('data-date')) - new Date(b.getAttribute('data-date'));
            case 'name':
                return a.querySelector('.note-title').textContent.localeCompare(
                    b.querySelector('.note-title').textContent
                );
            case 'popular':
                return parseInt(b.getAttribute('data-popularity') || '0') - parseInt(a.getAttribute('data-popularity') || '0');
            default:
                return 0;
        }
    });
    
    // Hide all notes first
    window.allNotes.forEach(note => {
        note.style.display = 'none';
        note.classList.remove('fade-in');
    });
    
    // Show filtered notes with animation
    visibleNotes.forEach((note, index) => {
        setTimeout(() => {
            note.style.display = 'block';
            note.classList.add('fade-in');
        }, index * 100);
    });
    
    // Update counts
    updateFilterCounts();
    
    // Update load more state
    window.currentlyVisible = Math.min(6, visibleNotes.length);
    updateLoadMoreButton();
    
    // Show no results message if needed
    showNoResultsMessage(visibleNotes.length === 0);
}

// Update filter counts
function updateFilterCounts() {
    const categoryFilters = document.querySelectorAll('.filter-btn');
    
    categoryFilters.forEach(btn => {
        const category = btn.getAttribute('data-category');
        let count = 0;
        
        if (category === 'all') {
            count = window.allNotes.length;
        } else {
            count = Array.from(window.allNotes).filter(note => 
                note.getAttribute('data-category') === category
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
                <p>Arama kriterlerinize uygun not bulunamadı. Lütfen farklı anahtar kelimeler deneyin.</p>
            </div>
        `;
        
        document.getElementById('notes-container').appendChild(noResultsDiv);
    } else if (!show && noResultsDiv) {
        noResultsDiv.remove();
    }
}

// Initialize view toggle (grid/list)
function initViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const notesContainer = document.getElementById('notes-container');
    
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            viewButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const view = btn.getAttribute('data-view');
            
            if (view === 'list') {
                notesContainer.classList.add('list-view');
                notesContainer.classList.remove('grid-view');
            } else {
                notesContainer.classList.add('grid-view');
                notesContainer.classList.remove('list-view');
            }
            
            // Store preference
            localStorage.setItem('notesViewPreference', view);
        });
    });
    
    // Load saved preference
    const savedView = localStorage.getItem('notesViewPreference');
    if (savedView === 'list') {
        document.querySelector('[data-view="list"]').click();
    }
}

// Initialize note preview modal
function initNotePreviewModal() {
    const modal = document.getElementById('note-preview-modal');
    const modalTitle = document.getElementById('preview-title');
    const modalBody = document.getElementById('preview-body');
    const closeBtn = document.getElementById('preview-close');
    
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

// Preview note function
window.previewNote = function(noteId) {
    const modal = document.getElementById('note-preview-modal');
    const modalTitle = document.getElementById('preview-title');
    const modalBody = document.getElementById('preview-body');
    
    const noteData = getNotePreviewData(noteId);
    
    if (noteData) {
        modalTitle.textContent = `${noteData.title} - Önizleme`;
        modalBody.innerHTML = generateNotePreviewHTML(noteData);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Re-render math if present
        if (window.MathJax) {
            MathJax.typesetPromise([modalBody]).then(() => {
                console.log('Math rendered in preview');
            });
        }
    }
};

// Get note preview data by ID
function getNotePreviewData(noteId) {
    const previewData = {
        'kalkulus-1': {
            title: 'Kalkülüs I - Limit ve Süreklilik',
            category: 'Matematik',
            content: `
                <h3>1. Giriş</h3>
                <p>Kalkülüs, matematiğin en önemli dallarından biridir ve limit kavramı üzerine kuruludur.</p>
                
                <h3>2. Limit Kavramı</h3>
                <p>Bir fonksiyonun belirli bir noktadaki limiti, o noktaya yaklaşırken fonksiyonun aldığı değerdir.</p>
                
                <div class="math-example">
                    <p><strong>Tanım:</strong> \\(\\lim_{x \\to a} f(x) = L\\)</p>
                    <p>Bu ifade, x değeri a'ya yaklaşırken f(x) değerinin L'ye yaklaştığını belirtir.</p>
                </div>
                
                <h3>3. Limit Hesaplama Yöntemleri</h3>
                <ul>
                    <li>Doğrudan Yerine Koyma</li>
                    <li>Faktörleme</li>
                    <li>Rasyonelleştirme</li>
                    <li>L'Hôpital Kuralı</li>
                </ul>
                
                <h3>4. Süreklilik</h3>
                <p>Bir fonksiyon, grafiğinde kesinti olmadığında sürekli olarak adlandırılır.</p>
                
                <div class="math-example">
                    <p><strong>Süreklilik Koşulları:</strong></p>
                    <p>f(x) fonksiyonunun x = a noktasında sürekli olması için:</p>
                    <ol>
                        <li>\\(f(a)\\) tanımlı olmalı</li>
                        <li>\\(\\lim_{x \\to a} f(x)\\) var olmalı</li>
                        <li>\\(\\lim_{x \\to a} f(x) = f(a)\\) olmalı</li>
                    </ol>
                </div>
            `,
            pages: 24,
            examples: 15,
            exercises: 25
        },
        'veri-yapilari': {
            title: 'Veri Yapıları ve Algoritmalar',
            category: 'Programlama',
            content: `
                <h3>1. Veri Yapılarına Giriş</h3>
                <p>Veri yapıları, verilerin bilgisayar belleğinde organize edilme yöntemidir.</p>
                
                <h3>2. Temel Veri Yapıları</h3>
                <h4>2.1. Array (Dizi)</h4>
                <p>Aynı türden elemanların peş peşe sıralandığı veri yapısıdır.</p>
                
                <div class="code-example">
                    <pre><code class="python">
# Python'da dizi örneği
numbers = [1, 2, 3, 4, 5]
print(numbers[0])  # Output: 1
                    </code></pre>
                </div>
                
                <h4>2.2. Linked List (Bağlı Liste)</h4>
                <p>Her elemanın veri ve bir sonrakine işaretçi içerdiği dinamik veri yapısıdır.</p>
                
                <h3>3. Algoritma Analizi</h3>
                <h4>3.1. Zaman Karmaşıklığı (Big O)</h4>
                <ul>
                    <li><strong>O(1):</strong> Sabit zaman</li>
                    <li><strong>O(n):</strong> Lineer zaman</li>
                    <li><strong>O(n²):</strong> Quadratic zaman</li>
                    <li><strong>O(log n):</strong> Logaritmik zaman</li>
                </ul>
                
                <h3>4. Örnekler ve Uygulamalar</h3>
                <p>Bu bölümde çeşitli veri yapıları ile pratik örnekler yer almaktadır.</p>
            `,
            pages: 18,
            examples: 12,
            exercises: 20
        }
        // More preview data can be added here
    };
    
    return previewData[noteId];
}

// Generate note preview HTML
function generateNotePreviewHTML(note) {
    return `
        <div class="note-preview">
            <div class="preview-header">
                <div class="preview-info">
                    <span class="preview-category">${note.category}</span>
                    <div class="preview-stats">
                        <span><i class="fas fa-file-alt"></i> ${note.pages} sayfa</span>
                        <span><i class="fas fa-lightbulb"></i> ${note.examples} örnek</span>
                        <span><i class="fas fa-dumbbell"></i> ${note.exercises} alıştırma</span>
                    </div>
                </div>
            </div>
            
            <div class="preview-content">
                ${note.content}
            </div>
            
            <div class="preview-footer">
                <p><strong>Not:</strong> Bu sadece notun bir önizlemesidir. Tam içerik için PDF'i indirin.</p>
            </div>
        </div>
    `;
}

// Initialize note interactions
function initNoteInteractions() {
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
        const noteTitle = button.closest('.note-card').querySelector('.note-title').textContent;
        const favorites = JSON.parse(localStorage.getItem('notesFavorites') || '[]');
        
        if (isFavorited) {
            const index = favorites.indexOf(noteTitle);
            if (index > -1) favorites.splice(index, 1);
        } else {
            if (!favorites.includes(noteTitle)) favorites.push(noteTitle);
        }
        
        localStorage.setItem('notesFavorites', JSON.stringify(favorites));
    };
    
    // Share functionality
    window.shareNote = function(button) {
        const note = button.closest('.note-card');
        const title = note.querySelector('.note-title').textContent;
        const url = window.location.href;
        
        if (navigator.share) {
            navigator.share({
                title: title,
                text: `"${title}" - Ders Notu`,
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
    const favorites = JSON.parse(localStorage.getItem('notesFavorites') || '[]');
    
    document.querySelectorAll('.note-card').forEach(note => {
        const title = note.querySelector('.note-title').textContent;
        if (favorites.includes(title)) {
            const favoriteBtn = note.querySelector('[onclick*="toggleFavorite"]');
            if (favoriteBtn) {
                const icon = favoriteBtn.querySelector('i');
                icon.classList.replace('far', 'fas');
                favoriteBtn.classList.add('favorited');
            }
        }
    });
}

// Initialize load more functionality
function initLoadMore() {
    const loadMoreBtn = document.getElementById('load-more-notes');
    
    loadMoreBtn?.addEventListener('click', () => {
        const hiddenNotes = Array.from(window.allNotes)
            .filter(note => note.classList.contains('hidden-note'))
            .slice(0, window.notesPerLoad);
        
        hiddenNotes.forEach((note, index) => {
            setTimeout(() => {
                note.style.display = 'block';
                note.classList.remove('hidden-note');
                note.classList.add('fade-in');
                window.currentlyVisible++;
            }, index * 150);
        });
        
        setTimeout(() => {
            updateLoadMoreButton();
        }, hiddenNotes.length * 150);
    });
}

// Update load more button state
function updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById('load-more-notes');
    const hiddenCount = Array.from(window.allNotes)
        .filter(note => note.classList.contains('hidden-note')).length;
    
    if (loadMoreBtn) {
        if (hiddenCount === 0) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
            loadMoreBtn.innerHTML = `
                <i class="fas fa-plus"></i>
                ${hiddenCount} Not Daha Yükle
            `;
        }
    }
}

// Initialize newsletter functionality
function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const submitBtn = newsletterForm.querySelector('button');
        
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            if (!email) {
                showNotification('Lütfen e-posta adresinizi girin', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Lütfen geçerli bir e-posta adresi girin', 'error');
                return;
            }
            
            // Simulate newsletter subscription
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Newsletter aboneliği başarılı! 🎉', 'success');
                emailInput.value = '';
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
                submitBtn.disabled = false;
            }, 1500);
        });
        
        emailInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitBtn.click();
            }
        });
    }
}

// Global function for filtering by category (called from category cards and footer)
window.filterByCategory = function(category) {
    const categoryBtn = document.querySelector(`[data-category="${category}"]`);
    if (categoryBtn && categoryBtn.classList.contains('filter-btn')) {
        categoryBtn.click();
        
        // Scroll to notes section
        document.querySelector('.notes-grid').scrollIntoView({
            behavior: 'smooth'
        });
    }
};

// Utility functions
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

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

// CSS styles for notes functionality
const notesStyles = `
/* Notes specific styles */
.notes-hero {
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

.notes-stats {
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

.notes-filter {
    padding: 60px 0;
    background: var(--surface-color);
    border-bottom: 1px solid var(--border-color);
}

.filter-controls {
    display: grid;
    grid-template-columns: 1fr auto auto auto;
    gap: 20px;
    align-items: center;
}

.search-box {
    position: relative;
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

.view-options {
    display: flex;
    gap: 5px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    overflow: hidden;
}

.view-btn {
    background: var(--bg-color);
    border: none;
    padding: 10px 12px;
    cursor: pointer;
    transition: all 0.2s;
    color: var(--text-secondary);
}

.view-btn:hover,
.view-btn.active {
    background: var(--primary-color);
    color: white;
}

.sort-options select {
    padding: 10px 15px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: var(--bg-color);
    color: var(--text-color);
    cursor: pointer;
}

.course-categories {
    padding: 80px 0;
    background: var(--bg-color);
}

.section-title {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 60px;
    color: var(--text-color);
}

.categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
}

.category-card {
    background: var(--surface-color);
    padding: 30px;
    border-radius: 12px;
    text-align: center;
    box-shadow: var(--shadow-sm);
    transition: all 0.3s ease;
    cursor: pointer;
}

.category-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
}

.category-icon {
    width: 80px;
    height: 80px;
    background: var(--primary-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    font-size: 2rem;
    color: white;
}

.category-card h3 {
    font-size: 1.4rem;
    margin-bottom: 15px;
    color: var(--text-color);
}

.category-card p {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 20px;
}

.category-stats {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 25px;
}

.category-stats span {
    display: flex;
    align-items: center;
    gap: 5px;
    color: var(--text-secondary);
    font-size: 0.9rem;
}

.category-btn {
    background: var(--primary-color);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s;
}

.category-btn:hover {
    background: var(--primary-dark);
    transform: translateY(-1px);
}

.notes-grid {
    padding: 80px 0;
}

.notes-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 30px;
    margin-bottom: 60px;
}

.notes-container.list-view {
    grid-template-columns: 1fr;
}

.notes-container.list-view .note-card {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 20px;
    align-items: center;
}

.note-card {
    background: var(--surface-color);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: var(--shadow-sm);
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(20px);
}

.note-card.fade-in {
    opacity: 1;
    transform: translateY(0);
}

.note-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
}

.note-card.featured {
    border: 2px solid var(--accent-color);
    background: linear-gradient(135deg, var(--surface-color) 0%, rgba(var(--accent-rgb), 0.05) 100%);
}

.note-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 25px 0;
}

.note-type {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--primary-color);
    font-weight: 600;
    font-size: 0.9rem;
}

.note-type i {
    color: var(--accent-color);
}

.note-actions {
    display: flex;
    gap: 5px;
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

.note-content {
    padding: 25px;
    padding-top: 15px;
}

.note-category {
    display: inline-block;
    background: var(--primary-color);
    color: white;
    padding: 4px 12px;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 500;
    margin-bottom: 15px;
}

.note-title {
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 15px;
    line-height: 1.3;
}

.note-description {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 20px;
}

.note-tags {
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

.note-meta {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 15px;
    margin-bottom: 20px;
    padding: 15px 0;
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
}

.meta-item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--text-secondary);
    font-size: 0.9rem;
}

.meta-item i {
    color: var(--primary-color);
}

.note-actions-main {
    display: flex;
    gap: 15px;
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

.study-tips {
    background: var(--surface-color);
    padding: 80px 0;
    border-top: 1px solid var(--border-color);
}

.tips-content {
    text-align: center;
    margin-bottom: 60px;
}

.tips-content h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: var(--text-color);
}

.tips-content p {
    font-size: 1.1rem;
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto;
}

.tips-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
}

.tip-item {
    background: var(--bg-color);
    padding: 30px 20px;
    border-radius: 12px;
    text-align: center;
    box-shadow: var(--shadow-sm);
    transition: transform 0.3s;
}

.tip-item:hover {
    transform: translateY(-5px);
}

.tip-icon {
    width: 60px;
    height: 60px;
    background: var(--primary-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    font-size: 1.5rem;
    color: white;
}

.tip-item h4 {
    font-size: 1.2rem;
    margin-bottom: 15px;
    color: var(--text-color);
}

.tip-item p {
    color: var(--text-secondary);
    line-height: 1.6;
}

.newsletter {
    margin-top: 20px;
}

.newsletter p {
    margin-bottom: 10px;
    color: var(--text-secondary);
    font-size: 0.9rem;
}

.newsletter-form {
    display: flex;
    gap: 10px;
}

.newsletter-form input {
    flex: 1;
    padding: 10px 12px;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    background: var(--bg-color);
    color: var(--text-color);
    font-size: 0.9rem;
}

.newsletter-form button {
    background: var(--primary-color);
    color: white;
    border: none;
    padding: 10px 12px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
}

.newsletter-form button:hover {
    background: var(--primary-dark);
}

/* Note Preview Modal */
.note-preview {
    max-height: 70vh;
    overflow-y: auto;
}

.preview-header {
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 20px;
    margin-bottom: 30px;
}

.preview-category {
    display: inline-block;
    background: var(--primary-color);
    color: white;
    padding: 6px 16px;
    border-radius: 15px;
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 15px;
}

.preview-stats {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}

.preview-stats span {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--text-secondary);
    font-size: 0.9rem;
}

.preview-content {
    line-height: 1.7;
    color: var(--text-color);
}

.preview-content h3 {
    color: var(--text-color);
    margin: 25px 0 15px 0;
    border-bottom: 2px solid var(--primary-color);
    padding-bottom: 5px;
}

.preview-content h4 {
    color: var(--text-color);
    margin: 20px 0 10px 0;
}

.preview-content ul,
.preview-content ol {
    margin: 15px 0;
    padding-left: 25px;
}

.preview-content li {
    margin-bottom: 5px;
}

.math-example {
    background: var(--surface-color);
    border: 1px solid var(--border-color);
    border-left: 4px solid var(--primary-color);
    padding: 20px;
    margin: 20px 0;
    border-radius: 0 8px 8px 0;
}

.code-example {
    margin: 20px 0;
}

.code-example pre {
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    padding: 15px;
    overflow-x: auto;
}

.preview-footer {
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid var(--border-color);
    color: var(--text-secondary);
    font-style: italic;
}

/* No Results */
.no-results {
    grid-column: 1 / -1;
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
    
    .notes-stats {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .filter-controls {
        grid-template-columns: 1fr;
        gap: 15px;
    }
    
    .category-filters {
        justify-content: center;
    }
    
    .view-options,
    .sort-options {
        justify-self: center;
    }
    
    .notes-container {
        grid-template-columns: 1fr;
        gap: 20px;
    }
    
    .note-content {
        padding: 20px;
    }
    
    .note-meta {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .note-actions-main {
        flex-direction: column;
    }
    
    .tips-grid {
        grid-template-columns: 1fr;
    }
    
    .newsletter-form {
        flex-direction: column;
    }
}

@media (max-width: 480px) {
    .notes-stats {
        grid-template-columns: 1fr;
    }
    
    .categories-grid {
        grid-template-columns: 1fr;
    }
    
    .note-header {
        padding: 15px 20px 0;
    }
    
    .note-content {
        padding: 15px 20px 20px;
    }
    
    .note-meta {
        grid-template-columns: 1fr;
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
styleSheet.textContent = notesStyles;
document.head.appendChild(styleSheet);
