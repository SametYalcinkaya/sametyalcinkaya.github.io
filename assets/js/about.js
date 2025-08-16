// ===== ABOUT PAGE SPECIFIC SCRIPTS =====
// This file handles functionality specific to the about page

document.addEventListener('DOMContentLoaded', function() {
    initSkillBars();
    initStatsCounter();
    initTimelineAnimations();
    initSkillsObserver();
    
    console.log('👨‍💼 About page initialized successfully!');
});

// ===== SKILL BARS ANIMATION =====
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Create intersection observer for skill bars
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBar(entry.target);
                skillObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe all skill bars
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

function animateSkillBar(skillBar) {
    const progress = skillBar.dataset.progress;
    let currentProgress = 0;
    const increment = progress / 50; // Animation duration control
    
    const animation = setInterval(() => {
        currentProgress += increment;
        skillBar.style.width = currentProgress + '%';
        
        if (currentProgress >= progress) {
            clearInterval(animation);
            skillBar.style.width = progress + '%';
        }
    }, 20);
    
    // Add a subtle glow effect
    setTimeout(() => {
        skillBar.classList.add('skill-completed');
    }, 1000);
}

// ===== STATS COUNTER ANIMATION =====
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
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

function animateStatNumber(statElement) {
    const finalValue = statElement.textContent;
    const numericValue = parseInt(finalValue.replace(/\D/g, ''));
    const suffix = finalValue.replace(/\d/g, '');
    
    let currentValue = 0;
    const increment = Math.ceil(numericValue / 30);
    
    const counter = setInterval(() => {
        currentValue += increment;
        
        if (currentValue >= numericValue) {
            currentValue = numericValue;
            clearInterval(counter);
        }
        
        statElement.textContent = currentValue + suffix;
    }, 50);
    
    // Add completed class for styling
    setTimeout(() => {
        statElement.classList.add('stat-completed');
    }, 1500);
}

// ===== TIMELINE ANIMATIONS =====
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered animation
                setTimeout(() => {
                    entry.target.classList.add('timeline-animate');
                }, index * 200);
                
                timelineObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// ===== SKILLS CATEGORY OBSERVER =====
function initSkillsObserver() {
    const skillCategories = document.querySelectorAll('.skills-category');
    
    const categoryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('category-animate');
                }, index * 100);
                
                categoryObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    skillCategories.forEach(category => {
        categoryObserver.observe(category);
    });
}

// ===== EDUCATION CARDS HOVER EFFECTS =====
function initEducationCards() {
    const educationCards = document.querySelectorAll('.education-card');
    
    educationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== VALUE CARDS INTERACTION =====
function initValueCards() {
    const valueCards = document.querySelectorAll('.value-card');
    
    valueCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a pulse effect
            this.classList.add('value-pulse');
            
            setTimeout(() => {
                this.classList.remove('value-pulse');
            }, 600);
        });
    });
}

// ===== INTERESTS GRID ANIMATION =====
function initInterestsGrid() {
    const interestItems = document.querySelectorAll('.interest-item');
    
    const interestObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('interest-animate');
                }, (index % 3) * 100); // Stagger by rows
                
                interestObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    interestItems.forEach(item => {
        interestObserver.observe(item);
    });
}

// ===== SKILL CATEGORY FILTERING =====
function initSkillCategoryFilter() {
    const categories = document.querySelectorAll('.skills-category h3');
    
    categories.forEach(category => {
        category.addEventListener('click', function() {
            const parentCategory = this.parentElement;
            const skillsList = parentCategory.querySelector('.skills-list');
            
            // Toggle visibility
            if (skillsList.style.display === 'none') {
                skillsList.style.display = 'block';
                this.classList.remove('collapsed');
            } else {
                skillsList.style.display = 'none';
                this.classList.add('collapsed');
            }
        });
    });
}

// ===== ABOUT PAGE SPECIFIC STYLES =====
const aboutStyles = `
    .page-header {
        background: linear-gradient(135deg, var(--bg-primary), var(--bg-secondary));
        padding: 8rem 0 4rem;
        text-align: center;
    }
    
    .page-header h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
        color: var(--text-primary);
    }
    
    .page-header p {
        font-size: 1.25rem;
        color: var(--text-secondary);
        margin-bottom: 2rem;
    }
    
    .breadcrumb {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        font-size: 0.9rem;
    }
    
    .breadcrumb a {
        color: var(--text-tertiary);
        text-decoration: none;
    }
    
    .breadcrumb a:hover {
        color: var(--primary-color);
    }
    
    .breadcrumb .separator {
        color: var(--text-tertiary);
    }
    
    .breadcrumb .current {
        color: var(--primary-color);
        font-weight: 500;
    }
    
    .about-hero {
        padding: 4rem 0;
    }
    
    .about-hero-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        align-items: center;
    }
    
    .about-image {
        width: 100%;
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-xl);
    }
    
    .image-decorations {
        position: relative;
    }
    
    .decoration {
        position: absolute;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        opacity: 0.3;
    }
    
    .decoration-1 {
        top: -20px;
        right: -20px;
        background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    }
    
    .decoration-2 {
        bottom: -20px;
        left: -20px;
        background: linear-gradient(135deg, var(--accent-color), var(--primary-color));
    }
    
    .lead {
        font-size: 1.25rem;
        line-height: 1.6;
        color: var(--text-secondary);
        margin-bottom: 2rem;
    }
    
    .hero-stats {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
        margin-top: 2rem;
    }
    
    .stat-item {
        text-align: center;
        padding: 1.5rem;
        background: var(--bg-secondary);
        border-radius: var(--radius-lg);
        transition: all var(--transition-normal);
    }
    
    .stat-item:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-lg);
    }
    
    .stat-number {
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--primary-color);
        display: block;
        margin-bottom: 0.5rem;
    }
    
    .stat-number.stat-completed {
        animation: statPulse 0.5s ease-out;
    }
    
    @keyframes statPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    .stat-label {
        color: var(--text-secondary);
        font-weight: 500;
    }
    
    .story-timeline {
        position: relative;
        max-width: 800px;
        margin: 0 auto;
    }
    
    .story-timeline::before {
        content: '';
        position: absolute;
        left: 50%;
        top: 0;
        bottom: 0;
        width: 2px;
        background: var(--primary-color);
        transform: translateX(-50%);
    }
    
    .timeline-item {
        position: relative;
        margin: 3rem 0;
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .timeline-item.timeline-animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .timeline-item:nth-child(odd) .timeline-content {
        margin-right: calc(50% + 2rem);
        text-align: right;
    }
    
    .timeline-item:nth-child(even) .timeline-content {
        margin-left: calc(50% + 2rem);
    }
    
    .timeline-marker {
        position: absolute;
        left: 50%;
        top: 1rem;
        width: 3rem;
        height: 3rem;
        background: var(--primary-color);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.25rem;
        transform: translateX(-50%);
        z-index: 2;
        box-shadow: var(--shadow-lg);
    }
    
    .timeline-content {
        background: var(--bg-primary);
        padding: 2rem;
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-md);
    }
    
    .timeline-content h3 {
        color: var(--text-primary);
        margin-bottom: 1rem;
    }
    
    .education-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
    }
    
    .education-card {
        background: var(--bg-primary);
        padding: 2rem;
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-md);
        transition: all var(--transition-normal);
        border-left: 4px solid var(--primary-color);
    }
    
    .education-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-lg);
    }
    
    .education-icon {
        width: 4rem;
        height: 4rem;
        background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
    }
    
    .education-content h3 {
        color: var(--text-primary);
        margin-bottom: 0.5rem;
    }
    
    .education-content h4 {
        color: var(--primary-color);
        margin-bottom: 0.5rem;
        font-weight: 600;
    }
    
    .institution {
        color: var(--text-secondary);
        font-weight: 500;
        margin-bottom: 0.25rem;
    }
    
    .duration {
        color: var(--text-tertiary);
        font-size: 0.9rem;
        margin-bottom: 1rem;
    }
    
    .certification-list {
        list-style: none;
        padding: 0;
        margin: 1rem 0 0 0;
    }
    
    .certification-list li {
        padding: 0.25rem 0;
        color: var(--text-secondary);
        position: relative;
        padding-left: 1.5rem;
    }
    
    .certification-list li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: var(--primary-color);
        font-weight: bold;
    }
    
    .skills-categories {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
    }
    
    .skills-category {
        background: var(--bg-primary);
        padding: 2rem;
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-md);
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .skills-category.category-animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .skills-category h3 {
        color: var(--text-primary);
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .skills-category h3 i {
        color: var(--primary-color);
    }
    
    .skill-item {
        margin-bottom: 1.5rem;
    }
    
    .skill-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }
    
    .skill-name {
        font-weight: 500;
        color: var(--text-primary);
    }
    
    .skill-level {
        font-size: 0.9rem;
        color: var(--text-tertiary);
        font-weight: 600;
    }
    
    .skill-bar {
        height: 8px;
        background: var(--bg-tertiary);
        border-radius: 4px;
        overflow: hidden;
    }
    
    .skill-progress {
        height: 100%;
        background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
        width: 0%;
        border-radius: 4px;
        transition: all 0.3s ease;
        position: relative;
    }
    
    .skill-progress.skill-completed::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
        animation: skillShine 2s infinite;
    }
    
    @keyframes skillShine {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }
    
    .values-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
    }
    
    .value-card {
        background: var(--bg-primary);
        padding: 2rem;
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-md);
        text-align: center;
        transition: all var(--transition-normal);
        cursor: pointer;
    }
    
    .value-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-lg);
    }
    
    .value-card.value-pulse {
        animation: valuePulse 0.6s ease-out;
    }
    
    @keyframes valuePulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .value-icon {
        width: 4rem;
        height: 4rem;
        background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.5rem;
        margin: 0 auto 1.5rem;
    }
    
    .value-card h3 {
        color: var(--text-primary);
        margin-bottom: 1rem;
    }
    
    .interests-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
    }
    
    .interest-item {
        background: var(--bg-primary);
        padding: 1.5rem;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-sm);
        text-align: center;
        transition: all var(--transition-normal);
        opacity: 0;
        transform: translateY(20px);
    }
    
    .interest-item.interest-animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .interest-item:hover {
        transform: translateY(-3px);
        box-shadow: var(--shadow-md);
    }
    
    .interest-icon {
        width: 3rem;
        height: 3rem;
        background: var(--bg-tertiary);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary-color);
        font-size: 1.25rem;
        margin: 0 auto 1rem;
        transition: all var(--transition-fast);
    }
    
    .interest-item:hover .interest-icon {
        background: var(--primary-color);
        color: white;
        transform: scale(1.1);
    }
    
    .interest-item h4 {
        color: var(--text-primary);
        margin-bottom: 0.5rem;
    }
    
    .interest-item p {
        color: var(--text-tertiary);
        font-size: 0.9rem;
        margin: 0;
    }
    
    .cta-section {
        background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
        color: white;
        text-align: center;
    }
    
    .cta-content h2 {
        color: white;
        margin-bottom: 1rem;
    }
    
    .cta-content p {
        color: rgba(255, 255, 255, 0.9);
        font-size: 1.125rem;
        margin-bottom: 2rem;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
    }
    
    .cta-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
    }
    
    .cta-buttons .btn-primary {
        background: white;
        color: var(--primary-color);
    }
    
    .cta-buttons .btn-primary:hover {
        background: rgba(255, 255, 255, 0.9);
        transform: translateY(-2px);
    }
    
    .cta-buttons .btn-outline {
        border-color: white;
        color: white;
    }
    
    .cta-buttons .btn-outline:hover {
        background: white;
        color: var(--primary-color);
    }
    
    /* Mobile Responsiveness */
    @media (max-width: 768px) {
        .about-hero-content {
            grid-template-columns: 1fr;
            text-align: center;
        }
        
        .hero-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
        }
        
        .timeline-item:nth-child(odd) .timeline-content,
        .timeline-item:nth-child(even) .timeline-content {
            margin: 0;
            margin-left: 3rem;
            text-align: left;
        }
        
        .story-timeline::before {
            left: 1.5rem;
        }
        
        .timeline-marker {
            left: 1.5rem;
        }
        
        .skills-categories {
            grid-template-columns: 1fr;
        }
        
        .interests-grid {
            grid-template-columns: repeat(2, 1fr);
        }
        
        .cta-buttons {
            flex-direction: column;
            align-items: center;
        }
        
        .cta-buttons .btn {
            width: 100%;
            max-width: 300px;
        }
    }
`;

// Inject about page styles
const aboutStyleSheet = document.createElement('style');
aboutStyleSheet.textContent = aboutStyles;
document.head.appendChild(aboutStyleSheet);

// Initialize all additional features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initEducationCards();
    initValueCards();
    initInterestsGrid();
    initSkillCategoryFilter();
});

// Export about page utilities
window.aboutUtils = {
    animateSkillBar,
    animateStatNumber
};
