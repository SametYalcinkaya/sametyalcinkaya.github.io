// Typewriter Effect Class
class TypewriterEffect {
    constructor(element, options = {}) {
        this.element = typeof element === 'string' ? document.querySelector(element) : element;
        
        if (!this.element) {
            console.warn('Typewriter element not found');
            return;
        }
        
        // Default options
        this.options = {
            speed: 50,          // Typing speed (ms per character)
            deleteSpeed: 30,    // Delete speed (ms per character)
            pauseTime: 1000,    // Pause between typing/deleting
            loop: false,        // Loop through texts
            cursor: true,       // Show cursor
            cursorChar: '_',    // Cursor character
            cursorBlink: true,  // Animate cursor
            startDelay: 500,    // Delay before starting
            callback: null,     // Callback when typing is complete
            ...options
        };
        
        this.texts = [];
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.isPaused = false;
        this.timeoutId = null;
        this.cursorElement = null;
        
        this.init();
    }
    
    init() {
        this.originalText = this.element.textContent || this.element.innerHTML;
        this.element.textContent = '';
        
        if (this.options.cursor) {
            this.createCursor();
        }
        
        // Start typing after delay
        setTimeout(() => {
            this.start();
        }, this.options.startDelay);
    }
    
    createCursor() {
        this.cursorElement = document.createElement('span');
        this.cursorElement.className = 'typewriter-cursor';
        this.cursorElement.textContent = this.options.cursorChar;
        
        if (this.options.cursorBlink) {
            this.cursorElement.style.animation = 'cursor-blink 1s infinite';
        }
        
        this.element.parentNode.insertBefore(this.cursorElement, this.element.nextSibling);
    }
    
    removeCursor() {
        if (this.cursorElement && this.cursorElement.parentNode) {
            this.cursorElement.parentNode.removeChild(this.cursorElement);
            this.cursorElement = null;
        }
    }
    
    // Set single text to type
    setText(text) {
        this.texts = [text];
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
    }
    
    // Set multiple texts to cycle through
    setTexts(texts) {
        this.texts = Array.isArray(texts) ? texts : [texts];
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
    }
    
    // Start typing with original text or provided text
    start(text = null) {
        if (text) {
            this.setText(text);
        } else if (this.texts.length === 0) {
            this.setText(this.originalText);
        }
        
        if (this.texts.length > 0) {
            this.type();
        }
    }
    
    type() {
        if (this.isPaused) return;
        
        const currentText = this.texts[this.currentTextIndex] || '';
        
        if (this.isDeleting) {
            // Deleting characters
            this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
            
            if (this.currentCharIndex === 0) {
                this.isDeleting = false;
                this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
                
                if (!this.options.loop && this.currentTextIndex === 0) {
                    this.complete();
                    return;
                }
                
                this.timeoutId = setTimeout(() => this.type(), this.options.pauseTime);
            } else {
                this.timeoutId = setTimeout(() => this.type(), this.options.deleteSpeed);
            }
        } else {
            // Typing characters
            this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
            
            if (this.currentCharIndex === currentText.length) {
                if (this.options.loop && this.texts.length > 1) {
                    this.isDeleting = true;
                    this.timeoutId = setTimeout(() => this.type(), this.options.pauseTime);
                } else {
                    this.complete();
                    return;
                }
            } else {
                this.timeoutId = setTimeout(() => this.type(), this.options.speed);
            }
        }
    }
    
    complete() {
        if (this.options.callback && typeof this.options.callback === 'function') {
            this.options.callback();
        }
        
        // Remove cursor blinking if not looping
        if (!this.options.loop && this.cursorElement) {
            this.cursorElement.style.animation = 'none';
        }
    }
    
    pause() {
        this.isPaused = true;
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }
    
    resume() {
        this.isPaused = false;
        this.type();
    }
    
    stop() {
        this.pause();
        this.element.textContent = this.texts[this.currentTextIndex] || this.originalText;
        this.removeCursor();
    }
    
    reset() {
        this.pause();
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.element.textContent = '';
    }
    
    destroy() {
        this.stop();
        this.element.textContent = this.originalText;
    }
}

// Terminal Command Simulator
class TerminalSimulator {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        
        if (!this.container) {
            console.warn('Terminal container not found');
            return;
        }
        
        this.options = {
            speed: 30,
            commandDelay: 1000,
            outputDelay: 500,
            prompt: 'root@cybersec:~$ ',
            cursor: '_',
            ...options
        };
        
        this.commands = [];
        this.currentCommandIndex = 0;
        this.isRunning = false;
    }
    
    addCommand(command, output = '', delay = null) {
        this.commands.push({
            command,
            output,
            delay: delay || this.options.commandDelay
        });
    }
    
    addCommands(commands) {
        commands.forEach(cmd => {
            if (typeof cmd === 'string') {
                this.addCommand(cmd);
            } else {
                this.addCommand(cmd.command, cmd.output, cmd.delay);
            }
        });
    }
    
    createLine(content = '', isCommand = false) {
        const line = document.createElement('div');
        line.className = isCommand ? 'terminal-line' : 'terminal-output';
        
        if (isCommand) {
            const prompt = document.createElement('span');
            prompt.className = 'terminal-prompt';
            prompt.textContent = this.options.prompt;
            
            const command = document.createElement('span');
            command.className = 'command';
            command.textContent = content;
            
            line.appendChild(prompt);
            line.appendChild(command);
        } else {
            line.textContent = content;
        }
        
        return line;
    }
    
    async typeCommand(command) {
        const line = this.createLine('', true);
        this.container.appendChild(line);
        
        const commandSpan = line.querySelector('.command');
        
        // Type command character by character
        for (let i = 0; i <= command.length; i++) {
            commandSpan.textContent = command.substring(0, i);
            if (i < command.length) {
                commandSpan.textContent += this.options.cursor;
            }
            await this.delay(this.options.speed);
        }
        
        // Remove cursor
        commandSpan.textContent = command;
    }
    
    async showOutput(output) {
        if (output) {
            await this.delay(this.options.outputDelay);
            const outputLine = this.createLine(output, false);
            this.container.appendChild(outputLine);
        }
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.container.innerHTML = '';
        
        for (let i = 0; i < this.commands.length; i++) {
            const cmd = this.commands[i];
            
            await this.typeCommand(cmd.command);
            await this.showOutput(cmd.output);
            
            if (i < this.commands.length - 1) {
                await this.delay(cmd.delay);
            }
        }
        
        this.isRunning = false;
    }
    
    clear() {
        this.container.innerHTML = '';
        this.currentCommandIndex = 0;
    }
    
    stop() {
        this.isRunning = false;
    }
}

// Auto-initialize typewriter effects
document.addEventListener('DOMContentLoaded', () => {
    // Initialize hero name typewriter
    const heroName = document.getElementById('hero-name');
    if (heroName) {
        const nameTypewriter = new TypewriterEffect(heroName, {
            speed: 80,
            startDelay: 1000,
            cursor: false, // We'll handle cursor in CSS
            callback: () => {
                // Start description typewriter when name is complete
                initHeroDescription();
            }
        });
        nameTypewriter.start('Hıdır Samet Yalçınkaya');
    }
    
    // Initialize hero description typewriter
    function initHeroDescription() {
        const heroDescription = document.getElementById('hero-description');
        if (heroDescription) {
            const descriptionText = `Bireysel kullanıcıların siber güvenliğinden işletmelerin finansal güvenliğine kadar geniş bir alanda çalışmalar yürütüyorum. Adli Bilişim Mühendisliği alanında ihtisas yaparken, yapay zekâyı projelerimde etkin şekilde kullanıyorum.`;
            
            const descTypewriter = new TypewriterEffect(heroDescription, {
                speed: 45,
                startDelay: 500,
                cursor: false,
                callback: () => {
                    // Animate specialization items
                    animateSpecializations();
                }
            });
            descTypewriter.start(descriptionText);
        }
    }
    
    // Animate specialization items
    function animateSpecializations() {
        const specItems = document.querySelectorAll('.spec-item');
        specItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('fade-in-left');
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 200);
        });
    }
    
    // Initialize other typewriter effects
    initOtherTypewriters();
});

// Initialize other typewriter effects
function initOtherTypewriters() {
    // Section titles with glitch effect
    const sectionTitles = document.querySelectorAll('.section-title');
    
    // Intersection Observer for triggering animations on scroll
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -10% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const title = entry.target;
                
                // Add typewriter effect to section titles
                if (title.classList.contains('section-title') && !title.classList.contains('typed')) {
                    title.classList.add('typed');
                    const originalText = title.textContent;
                    
                    const titleTypewriter = new TypewriterEffect(title, {
                        speed: 60,
                        startDelay: 300,
                        cursor: false
                    });
                    titleTypewriter.start(originalText);
                }
                
                // Animate skill progress bars
                if (title.closest('.skills')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);
    
    // Observe section titles
    sectionTitles.forEach(title => {
        observer.observe(title);
    });
}

// Animate skill progress bars
function animateSkillBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
            bar.classList.add('progress-bar-animated');
        }, index * 200);
    });
}

// Terminal typing effect for contact form
function initContactFormTyping() {
    const form = document.getElementById('contact-form');
    if (form) {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                const label = input.previousElementSibling;
                if (label && label.classList.contains('terminal-prompt')) {
                    label.classList.add('terminal-typing');
                }
            });
            
            input.addEventListener('blur', () => {
                const label = input.previousElementSibling;
                if (label && label.classList.contains('terminal-prompt')) {
                    label.classList.remove('terminal-typing');
                }
            });
        });
    }
}

// Initialize contact form typing effect
document.addEventListener('DOMContentLoaded', initContactFormTyping);

// Export classes for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TypewriterEffect, TerminalSimulator };
}

// Global utility functions
window.typewriterUtils = {
    createTypewriter: (element, options) => new TypewriterEffect(element, options),
    createTerminal: (container, options) => new TerminalSimulator(container, options),
    
    // Predefined typing sequences for different sections
    sequences: {
        welcome: [
            'whoami',
            'cat /etc/passwd | grep hacker',
            'sudo su -',
            'echo "Welcome to my domain"'
        ],
        skills: [
            'ls -la /skills/',
            'cat /skills/cybersecurity.txt',
            'python3 /scripts/ai_analysis.py',
            'nmap -sS target.com'
        ],
        projects: [
            'git log --oneline',
            'docker ps -a',
            'kubectl get pods',
            'terraform plan'
        ]
    }
};
