// Matrix Rain Animation
class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix-canvas');
        if (!this.canvas) {
            console.warn('Matrix canvas not found');
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.animationId = null;
        
        // Matrix characters (Katakana, Latin, Numbers, Special)
        this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}0123456789アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        this.charArray = this.chars.split('');
        
        // Animation properties
        this.fontSize = 16; // Increased from 14 for better performance
        this.columns = 0;
        this.drops = [];
        this.speeds = [];
        this.colors = [];
        this.opacity = [];
        
        // Performance settings
        this.frameRate = 30; // Reduced from 60 for better initial performance
        this.lastTime = 0;
        this.frameInterval = 1000 / this.frameRate;
        
        // Performance optimization flags
        this.isHighPerformance = false;
        this.adaptiveQuality = true;
        
        this.init();
    }
    
    init() {
        this.resize();
        this.setupDrops();
        this.animate();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => {
                this.resize();
                this.setupDrops();
            }, 250);
        });
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
    }
    
    setupDrops() {
        this.drops = [];
        this.speeds = [];
        this.colors = [];
        this.opacity = [];
        
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * -100; // Start above screen
            this.speeds[i] = Math.random() * 3 + 2; // Speed variation
            this.colors[i] = this.getRandomColor();
            this.opacity[i] = Math.random() * 0.8 + 0.2; // Opacity variation
        }
    }
    
    getRandomColor() {
        const colors = [
            '#00FF00', // Primary green
            '#00CC00', // Secondary green
            '#00FFFF', // Neon blue
            '#FFFFFF'  // White for occasional highlights
        ];
        const weights = [0.6, 0.25, 0.1, 0.05]; // Probability weights
        
        let random = Math.random();
        let weightSum = 0;
        
        for (let i = 0; i < colors.length; i++) {
            weightSum += weights[i];
            if (random <= weightSum) {
                return colors[i];
            }
        }
        
        return colors[0]; // Fallback
    }
    
    drawChar(char, x, y, color, opacity) {
        this.ctx.fillStyle = color;
        this.ctx.globalAlpha = opacity;
        // Use Fira Code explicitly to prevent preload warnings
        this.ctx.font = `${this.fontSize}px 'Fira Code', 'Courier New', monospace`;
        this.ctx.fillText(char, x, y);
    }
    
    drawTrail(x, col) {
        const trailLength = this.isHighPerformance ? 15 : 10; // Adaptive trail length
        const currentY = this.drops[col] * this.fontSize;
        
        // Draw fading trail
        for (let i = 0; i < trailLength; i++) {
            const trailY = currentY - (i * this.fontSize);
            if (trailY < 0) break;
            
            const trailOpacity = this.opacity[col] * (1 - i / trailLength);
            const char = this.charArray[Math.floor(Math.random() * this.charArray.length)];
            
            // Brightest at the front
            let color = this.colors[col];
            if (i === 0) {
                color = '#FFFFFF'; // White for the leading character
            } else if (i < 3) {
                color = '#00FFFF'; // Cyan for near the front
            }
            
            this.drawChar(char, x, trailY, color, trailOpacity);
        }
    }
    
    animate(currentTime = 0) {
        // Eğer animasyon durduysa, yeniden başlat
        if (this.isStaticMode) {
            return;
        }
        
        const deltaTime = currentTime - this.lastTime;
        
        if (deltaTime >= this.frameInterval) {
            this.draw();
            this.lastTime = currentTime;
        }
        
        // Animasyonun sürekli çalışmasını garanti et
        this.animationId = requestAnimationFrame((time) => this.animate(time));
    }
    
    draw() {
        // Create fade effect by drawing a semi-transparent black rectangle
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.globalAlpha = 1;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw matrix rain
        for (let col = 0; col < this.columns; col++) {
            const x = col * this.fontSize;
            
            // Draw the trailing characters
            this.drawTrail(x, col);
            
            // Move the drop
            this.drops[col] += this.speeds[col];
            
            // Reset drop when it goes off screen
            if (this.drops[col] * this.fontSize > this.canvas.height + Math.random() * 1000) {
                this.drops[col] = Math.random() * -100;
                this.speeds[col] = Math.random() * 3 + 2;
                this.colors[col] = this.getRandomColor();
                this.opacity[col] = Math.random() * 0.8 + 0.2;
            }
        }
    }
    
    // Public methods for control
    start() {
        if (!this.animationId) {
            this.animate();
        }
    }
    
    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    pause() {
        this.stop();
    }
    
    resume() {
        this.start();
    }
    
    setOpacity(opacity) {
        this.canvas.style.opacity = opacity;
    }
    
    // Performance optimization methods
    reduceQuality() {
        // Daha toleranslı FPS kontrolü - sadece çok düşük FPS'te static moda geç
        if (window.perfMonitor && window.perfMonitor.getFPS() < 3) {
            console.log('Critical performance detected (FPS < 3) - switching to static mode');
            this.switchToStaticMode();
            return;
        }
        
        console.log('Reducing Matrix quality for better performance');
        this.frameRate = Math.max(15, this.frameRate - 10); // Daha yüksek minimum FPS
        this.frameInterval = 1000 / this.frameRate;
        this.fontSize = Math.min(24, this.fontSize + 2); // Daha küçük font artışı
        
        // Daha az agresif sütun azaltma
        const maxColumns = Math.floor(window.innerWidth / 45); // 45px spacing (önceden 60px)
        if (this.columns > maxColumns) {
            this.fontSize = Math.ceil(window.innerWidth / maxColumns);
        }
        
        this.resize();
        this.setupDrops();
    }
    
    switchToStaticMode() {
        this.stop();
        this.isStaticMode = true;
        
        // Clear the canvas with black background
        this.ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw a minimal static matrix pattern
        this.ctx.fillStyle = 'rgba(0, 255, 0, 0.08)';
        this.ctx.font = `${Math.max(20, this.fontSize)}px 'Courier New', monospace`;
        
        const spacing = 80;
        const cols = Math.floor(this.canvas.width / spacing);
        const rows = Math.floor(this.canvas.height / spacing);
        
        for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows; row++) {
                if (Math.random() < 0.1) { // Only 10% of positions get characters
                    const x = col * spacing + Math.random() * 20;
                    const y = row * spacing + Math.random() * 20;
                    const char = this.charArray[Math.floor(Math.random() * this.charArray.length)];
                    this.ctx.fillText(char, x, y);
                }
            }
        }
        
        console.log('Matrix animation disabled due to critical performance - showing minimal static pattern');
    }
    
    // Animasyonu yeniden başlatma fonksiyonu
    restartAnimation() {
        console.log('Restarting Matrix animation...');
        
        // Önce durduralım
        this.stop();
        
        // Static mode'u kapat
        this.isStaticMode = false;
        
        // Ayarları sıfırla
        this.frameRate = 30; // Orta performans başlangıcı
        this.frameInterval = 1000 / this.frameRate;
        this.fontSize = 16;
        
        // Canvas'ı temizle
        this.ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Yeniden boyutlandır ve damlaları ayarla
        this.resize();
        this.setupDrops();
        
        // Animasyonu başlat
        this.start();
        
        // Performance monitor'ı sıfırla
        if (window.perfMonitor) {
            window.perfMonitor.staticModeTriggered = false;
            window.perfMonitor.lowFpsCount = 0;
        }
        
        console.log('Matrix animation restarted successfully!');
    }
    
    increaseQuality() {
        this.frameRate = 60;
        this.frameInterval = 1000 / this.frameRate;
        this.fontSize = 14;
        this.resize();
        this.setupDrops();
    }
}

// Utility functions for performance monitoring
class PerformanceMonitor {
    constructor() {
        this.fps = 0;
        this.frameCount = 0;
        this.startTime = Date.now();
        this.lastTime = this.startTime;
        this.lastQualityReduction = 0;
        this.qualityReductionCooldown = 10000; // 10 saniye - çok daha az agresif
        this.lowFpsCount = 0;
        this.lowFpsThreshold = 5; // 5 kez üst üste düşük FPS gerekir
        this.criticalFpsCount = 0;
        this.staticModeTriggered = false;
        this.monitoringEnabled = false; // Performans izlemeyi devre dışı bırak
    }
    
    update() {
        // Performans izleme devre dışı - Matrix sürekli çalışacak
        if (!this.monitoringEnabled) {
            return;
        }
        
        this.frameCount++;
        const currentTime = Date.now();
        
        if (currentTime - this.lastTime >= 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
            this.frameCount = 0;
            this.lastTime = currentTime;
            
            // Çok daha toleranslı performans kontrolü
            if (window.matrixRain && this.fps < 1 && !this.staticModeTriggered) {
                console.log(`Extremely critical performance detected: FPS ${this.fps}`);
                // Artık static moda geçme, sadece kaliteyi azalt
                if (window.matrixRain.frameRate > 10) {
                    window.matrixRain.frameRate = Math.max(10, window.matrixRain.frameRate - 5);
                    window.matrixRain.frameInterval = 1000 / window.matrixRain.frameRate;
                }
            }
        }
    }
    
    getFPS() {
        return this.fps;
    }
}

// Initialize Matrix Rain when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const isExtremelyLowEndDevice = () => {
        const memory = navigator.deviceMemory || 4;
        const cores = navigator.hardwareConcurrency || 2;
        const isMobile = /Mobi|Android/i.test(navigator.userAgent);
        const isOldBrowser = !window.requestAnimationFrame || !window.WeakMap;
        
        // Daha kısıtlayıcı kriterler - sadece gerçekten çok düşük performanslı cihazlarda
        return memory < 1 || cores < 1 || isOldBrowser;
    };
    
    // Device performance detection
    const isLowEndDevice = () => {
        const memory = navigator.deviceMemory || 4; // Default to 4GB if not available
        const cores = navigator.hardwareConcurrency || 2; // Default to 2 cores
        const isMobile = /Mobi|Android/i.test(navigator.userAgent);
        
        // Daha toleranslı - sadece gerçekten düşük özelliklerde
        return memory < 2 || cores < 2;
    };
    
    if (!prefersReducedMotion) {
        window.matrixRain = new MatrixRain();
        
        // Matrix animasyonunu her zaman başlat - cihaz algılamayı devre dışı bırak
        console.log('Starting Matrix animation - device detection disabled for continuous animation');
        window.matrixRain.isHighPerformance = true;
        
        // Performans izleyiciyi oluştur ama devre dışı bırak
        window.perfMonitor = new PerformanceMonitor();
        // window.perfMonitor.monitoringEnabled = false; // Devre dışı
        
        // Performans izlemeyi daha seyrek yap
        setInterval(() => {
            if (window.perfMonitor && window.matrixRain && !window.matrixRain.isStaticMode) {
                window.perfMonitor.update();
            }
        }, 5000); // 5 saniyede bir kontrol et
        
        // Pause animation when tab is not visible (performance optimization)
        document.addEventListener('visibilitychange', () => {
            if (window.matrixRain) {
                if (document.hidden) {
                    window.matrixRain.pause();
                } else {
                    window.matrixRain.resume();
                }
            }
        });
        
        // Adjust opacity based on scroll position for better readability
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (window.matrixRain) {
                const scrollY = window.scrollY;
                const opacity = Math.max(0.1, 0.3 - scrollY / 2000);
                window.matrixRain.setOpacity(opacity);
            }
            
            // Clear previous timeout and set new one
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                if (window.matrixRain) {
                    window.matrixRain.setOpacity(0.3); // Reset to default
                }
            }, 150);
        });
    } else {
        // For users who prefer reduced motion, show a static pattern
        const canvas = document.getElementById('matrix-canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            // Draw a subtle static pattern
            ctx.fillStyle = 'rgba(0, 255, 0, 0.03)';
            for (let i = 0; i < 100; i++) {
                ctx.fillRect(
                    Math.random() * canvas.width,
                    Math.random() * canvas.height,
                    2, 2
                );
            }
        }
    }
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MatrixRain, PerformanceMonitor };
}

// Global fonksiyonlar - konsoldan matrix kontrolü için
window.restartMatrix = function() {
    if (window.matrixRain) {
        window.matrixRain.restartAnimation();
        console.log('Matrix animasyonu yeniden başlatıldı!');
    }
};

window.stopMatrix = function() {
    if (window.matrixRain) {
        window.matrixRain.switchToStaticMode();
        console.log('Matrix animasyonu durduruldu.');
    }
};

// Sayfa yüklendiğinde matrix'ı hemen başlat ve sürekli kontrol et
setTimeout(() => {
    if (window.matrixRain) {
        if (window.matrixRain.isStaticMode) {
            console.log('Auto-restarting Matrix animation...');
            window.matrixRain.restartAnimation();
        }
        // Animasyonun çalıştığından emin ol
        if (!window.matrixRain.animationId) {
            console.log('Ensuring Matrix animation is running...');
            window.matrixRain.start();
        }
    }
}, 500); // 0.5 saniye sonra kontrol et

// Sürekli kontrol sistemi - her 10 saniyede bir Matrix'in çalıştığını kontrol et
setInterval(() => {
    if (window.matrixRain && !window.matrixRain.isStaticMode) {
        if (!window.matrixRain.animationId) {
            console.log('Matrix animation stopped, restarting...');
            window.matrixRain.start();
        }
    }
}, 10000);
