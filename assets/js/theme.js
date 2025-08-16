// ===== THEME MANAGEMENT =====
// This file handles dark/light mode switching and theme preferences

class ThemeManager {
    constructor() {
        this.currentTheme = this.getInitialTheme();
        this.themeToggleBtn = document.getElementById('theme-toggle');
        this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        this.init();
    }
    
    init() {
        // Set initial theme
        this.applyTheme(this.currentTheme);
        
        // Set up theme toggle button
        if (this.themeToggleBtn) {
            this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
            this.updateThemeToggleIcon();
        }
        
        // Listen for system theme changes
        this.mediaQuery.addListener((e) => {
            if (!this.hasUserPreference()) {
                const newTheme = e.matches ? 'dark' : 'light';
                this.applyTheme(newTheme);
                this.currentTheme = newTheme;
                this.updateThemeToggleIcon();
            }
        });
        
        // Listen for storage changes (for sync across tabs)
        window.addEventListener('storage', (e) => {
            if (e.key === 'theme-preference') {
                this.currentTheme = e.newValue || this.getSystemTheme();
                this.applyTheme(this.currentTheme);
                this.updateThemeToggleIcon();
            }
        });
    }
    
    getInitialTheme() {
        // Check for saved user preference
        const savedTheme = localStorage.getItem('theme-preference');
        if (savedTheme && ['light', 'dark', 'auto'].includes(savedTheme)) {
            if (savedTheme === 'auto') {
                return this.getSystemTheme();
            }
            return savedTheme;
        }
        
        // Default to system preference
        return this.getSystemTheme();
    }
    
    getSystemTheme() {
        return this.mediaQuery.matches ? 'dark' : 'light';
    }
    
    hasUserPreference() {
        const preference = localStorage.getItem('theme-preference');
        return preference && preference !== 'auto';
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
        
        // Add a subtle animation effect
        document.documentElement.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.documentElement.style.transition = '';
        }, 300);
        
        // Show notification
        const themeText = newTheme === 'dark' ? 'Karanlık' : 'Aydınlık';
        if (window.siteUtils && window.siteUtils.showNotification) {
            window.siteUtils.showNotification(`${themeText} tema aktif`, 'info');
        }
    }
    
    setTheme(theme) {
        if (!['light', 'dark', 'auto'].includes(theme)) {
            console.warn('Invalid theme:', theme);
            return;
        }
        
        let actualTheme = theme;
        if (theme === 'auto') {
            actualTheme = this.getSystemTheme();
        }
        
        this.currentTheme = actualTheme;
        this.applyTheme(actualTheme);
        
        // Save preference
        localStorage.setItem('theme-preference', theme);
        
        this.updateThemeToggleIcon();
        
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('themechange', {
            detail: { theme: actualTheme, preference: theme }
        }));
    }
    
    applyTheme(theme) {
        // Remove existing theme classes
        document.documentElement.removeAttribute('data-theme');
        document.body.classList.remove('theme-light', 'theme-dark');
        
        // Apply new theme
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.body.classList.add('theme-dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            document.body.classList.add('theme-light');
        }
        
        // Update meta theme color for mobile browsers
        this.updateMetaThemeColor(theme);
        
        // Update any theme-specific elements
        this.updateThemeSpecificElements(theme);
    }
    
    updateMetaThemeColor(theme) {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.setAttribute('name', 'theme-color');
            document.head.appendChild(metaThemeColor);
        }
        
        const colors = {
            light: '#ffffff',
            dark: '#0f172a'
        };
        
        metaThemeColor.setAttribute('content', colors[theme]);
    }
    
    updateThemeSpecificElements(theme) {
        // Update any images that have theme variants
        const themeImages = document.querySelectorAll('[data-light-src][data-dark-src]');
        themeImages.forEach(img => {
            const srcAttr = theme === 'dark' ? 'data-dark-src' : 'data-light-src';
            img.src = img.getAttribute(srcAttr);
        });
        
        // Update any theme-specific content
        const themeElements = document.querySelectorAll('[data-theme-light][data-theme-dark]');
        themeElements.forEach(el => {
            const contentAttr = theme === 'dark' ? 'data-theme-dark' : 'data-theme-light';
            el.textContent = el.getAttribute(contentAttr);
        });
    }
    
    updateThemeToggleIcon() {
        if (!this.themeToggleBtn) return;
        
        const icon = this.themeToggleBtn.querySelector('i');
        if (icon) {
            icon.className = this.currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
        
        // Update aria-label for accessibility
        const label = this.currentTheme === 'dark' ? 'Aydınlık temaya geç' : 'Karanlık temaya geç';
        this.themeToggleBtn.setAttribute('aria-label', label);
        this.themeToggleBtn.setAttribute('title', label);
    }
    
    // Public methods
    getCurrentTheme() {
        return this.currentTheme;
    }
    
    getThemePreference() {
        return localStorage.getItem('theme-preference') || 'auto';
    }
    
    isDarkMode() {
        return this.currentTheme === 'dark';
    }
    
    isLightMode() {
        return this.currentTheme === 'light';
    }
}

// ===== THEME-AWARE COMPONENTS =====

// Color scheme aware chart colors
function getThemeAwareColors() {
    const theme = themeManager.getCurrentTheme();
    
    return {
        primary: theme === 'dark' ? '#3b82f6' : '#2563eb',
        secondary: theme === 'dark' ? '#64748b' : '#475569',
        success: theme === 'dark' ? '#10b981' : '#059669',
        warning: theme === 'dark' ? '#f59e0b' : '#d97706',
        error: theme === 'dark' ? '#ef4444' : '#dc2626',
        background: theme === 'dark' ? '#0f172a' : '#ffffff',
        surface: theme === 'dark' ? '#1e293b' : '#f8fafc',
        text: theme === 'dark' ? '#f8fafc' : '#0f172a',
        textSecondary: theme === 'dark' ? '#cbd5e1' : '#475569'
    };
}

// Theme-aware syntax highlighting
function updateSyntaxHighlighting() {
    const codeBlocks = document.querySelectorAll('pre code');
    const theme = themeManager.getCurrentTheme();
    
    codeBlocks.forEach(block => {
        block.className = block.className.replace(/hljs-\w+/g, '');
        block.classList.add(`hljs-${theme}`);
    });
}

// Theme-aware map styles (if using maps)
function getMapTheme() {
    return themeManager.isDarkMode() ? 'dark' : 'light';
}

// ===== THEME PERSISTENCE AND SYNC =====

// Sync theme across multiple tabs
function syncThemeAcrossTabs() {
    window.addEventListener('focus', () => {
        const currentPreference = localStorage.getItem('theme-preference');
        const currentTheme = currentPreference === 'auto' ? 
            themeManager.getSystemTheme() : currentPreference;
        
        if (currentTheme && currentTheme !== themeManager.getCurrentTheme()) {
            themeManager.applyTheme(currentTheme);
            themeManager.currentTheme = currentTheme;
            themeManager.updateThemeToggleIcon();
        }
    });
}

// ===== INITIALIZATION =====

// Initialize theme manager when DOM is ready
let themeManager;

document.addEventListener('DOMContentLoaded', () => {
    themeManager = new ThemeManager();
    syncThemeAcrossTabs();
    
    // Listen for theme changes to update components
    window.addEventListener('themechange', (e) => {
        updateSyntaxHighlighting();
        
        // Update any charts or graphics
        if (window.updateChartThemes) {
            window.updateChartThemes();
        }
        
        // Update any third-party components
        if (window.updateThirdPartyThemes) {
            window.updateThirdPartyThemes();
        }
    });
});

// ===== THEME UTILITIES =====

// CSS custom properties updater
function updateCSSCustomProperties(theme) {
    const root = document.documentElement;
    const properties = getThemeAwareColors();
    
    Object.entries(properties).forEach(([key, value]) => {
        root.style.setProperty(`--theme-${key}`, value);
    });
}

// Theme-aware image lazy loading
function loadThemeAwareImages() {
    const images = document.querySelectorAll('img[data-theme-src]');
    const theme = themeManager.getCurrentTheme();
    
    images.forEach(img => {
        const themeSrc = img.getAttribute(`data-${theme}-src`);
        if (themeSrc) {
            img.src = themeSrc;
        }
    });
}

// ===== ADVANCED FEATURES =====

// Auto theme switching based on time
class AutoThemeSwitcher {
    constructor() {
        this.enabled = false;
        this.sunriseHour = 6;
        this.sunsetHour = 18;
    }
    
    enable() {
        this.enabled = true;
        this.checkTimeBasedTheme();
        
        // Check every minute
        this.interval = setInterval(() => {
            this.checkTimeBasedTheme();
        }, 60000);
    }
    
    disable() {
        this.enabled = false;
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
    
    checkTimeBasedTheme() {
        if (!this.enabled) return;
        
        const now = new Date();
        const hour = now.getHours();
        
        const shouldBeDark = hour < this.sunriseHour || hour >= this.sunsetHour;
        const preferredTheme = shouldBeDark ? 'dark' : 'light';
        
        if (themeManager.getCurrentTheme() !== preferredTheme) {
            themeManager.setTheme(preferredTheme);
        }
    }
    
    setSunriseSunset(sunrise, sunset) {
        this.sunriseHour = sunrise;
        this.sunsetHour = sunset;
    }
}

// System theme change detection with animation
function handleSystemThemeChange() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    mediaQuery.addListener((e) => {
        if (!themeManager.hasUserPreference()) {
            const newTheme = e.matches ? 'dark' : 'light';
            
            // Add smooth transition
            document.documentElement.style.transition = 'all 0.5s ease';
            
            themeManager.applyTheme(newTheme);
            themeManager.currentTheme = newTheme;
            themeManager.updateThemeToggleIcon();
            
            // Remove transition after animation
            setTimeout(() => {
                document.documentElement.style.transition = '';
            }, 500);
        }
    });
}

// Export for global access
window.themeManager = themeManager;
window.getThemeAwareColors = getThemeAwareColors;
window.AutoThemeSwitcher = AutoThemeSwitcher;

// Initialize auto theme switching if preferred
const autoSwitcher = new AutoThemeSwitcher();
window.autoThemeSwitcher = autoSwitcher;
