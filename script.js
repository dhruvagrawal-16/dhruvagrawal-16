// Refined Canvas Background - Subtle & Professional
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Floating tech keywords - subtle and elegant
const keywords = ['Apex', 'LWC', 'Salesforce', 'Lightning', 'REST', 'CI/CD', 'Azure', 'Integration'];
const floatingTexts = [];

class FloatingText {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.text = keywords[Math.floor(Math.random() * keywords.length)];
        this.opacity = Math.random() * 0.15 + 0.05;
        this.size = Math.random() * 8 + 14;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < -50 || this.x > canvas.width + 50 || this.y < -50 || this.y > canvas.height + 50) {
            this.reset();
        }
    }
    
    draw() {
        ctx.font = `${this.size}px Inter`;
        ctx.fillStyle = `rgba(0, 217, 255, ${this.opacity})`;
        ctx.fillText(this.text, this.x, this.y);
    }
}

// Create fewer, more subtle floating texts
for (let i = 0; i < 12; i++) {
    floatingTexts.push(new FloatingText());
}

// Subtle particles
const particles = [];
class Particle {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.3 + 0.1;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }
    
    draw() {
        ctx.fillStyle = `rgba(0, 217, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Fewer particles for subtlety
for (let i = 0; i < 40; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    floatingTexts.forEach(text => {
        text.update();
        text.draw();
    });
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Scroll Progress Indicator
const navProgress = document.querySelector('.nav-progress');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    navProgress.style.width = scrollPercent + '%';
});

// Scene Activation on Scroll
const scenes = document.querySelectorAll('.scene');

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

scenes.forEach(scene => {
    observer.observe(scene);
});

// Activate first scene immediately
scenes[0].classList.add('active');

// Animated Stat Counters
const statNumbers = document.querySelectorAll('.stat-number');
let hasAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        stat.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target;
                    }
                };
                
                updateCounter();
            });
        }
    });
}, { threshold: 0.5 });

const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) {
    statsObserver.observe(statsGrid);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Project card 3D tilt effect
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;
        
        this.style.transform = `perspective(1000px) translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
});

// Skill Bar Animations
const skillBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            skillsAnimated = true;
            skillBars.forEach((bar, index) => {
                setTimeout(() => {
                    const progress = bar.getAttribute('data-progress');
                    bar.style.width = progress + '%';
                }, index * 50);
            });
        }
    });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Magnetic effect on buttons and cards
const magneticElements = document.querySelectorAll('.btn-primary, .btn-secondary, .contact-card, .nav-cta');

magneticElements.forEach(element => {
    element.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
    });
});

// Parallax effect on scroll for hero
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const hero = document.querySelector('.hero-scene .scene-content');
    
    if (hero && scrollY < window.innerHeight) {
        hero.style.transform = `translateY(${scrollY * 0.3}px)`;
        hero.style.opacity = 1 - (scrollY / window.innerHeight) * 0.5;
    }
});

// Spotlight cursor effect
document.addEventListener('mousemove', (e) => {
    const spotlight = document.body;
    spotlight.style.setProperty('--mouse-x', e.clientX + 'px');
    spotlight.style.setProperty('--mouse-y', e.clientY + 'px');
});

// Update spotlight position
const style = document.createElement('style');
style.textContent = `
    body::before {
        left: var(--mouse-x, 50%);
        top: var(--mouse-y, 50%);
        transform: translate(-50%, -50%);
    }
`;
document.head.appendChild(style);

// Typing effect for tagline
const tagline = document.querySelector('.hero-tagline');
if (tagline) {
    const text = tagline.textContent;
    tagline.textContent = '';
    tagline.style.opacity = '1';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    setTimeout(typeWriter, 1000);
}

// Animate project metrics on scroll
const metricValues = document.querySelectorAll('.metric-value');
let metricsAnimated = false;

const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !metricsAnimated) {
            metricsAnimated = true;
            metricValues.forEach((metric) => {
                const text = metric.textContent;
                const number = parseInt(text);
                
                if (!isNaN(number)) {
                    let current = 0;
                    const increment = number / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            metric.textContent = text;
                            clearInterval(timer);
                        } else {
                            metric.textContent = Math.floor(current) + text.replace(/[0-9]/g, '');
                        }
                    }, 30);
                }
            });
        }
    });
}, { threshold: 0.5 });

const projectsSection = document.querySelector('#projects');
if (projectsSection) {
    metricsObserver.observe(projectsSection);
}

// Console Easter Egg
console.log('%c👋 Hey there!', 'font-size: 24px; font-weight: bold;');
console.log('%cChecking out the code? I like your style.', 'font-size: 16px; color: #00d9ff;');
console.log('%cLet\'s build something together: dhruvagrawal16598@gmail.com', 'font-size: 14px; color: #b0b8c4;');
console.log('%c\n🚀 Built with: Vanilla JS, CSS, and attention to detail', 'font-size: 12px; color: #00ff88;');


