// Canvas Background
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;

// Personal touch - floating tech keywords
const keywords = ['Apex', 'LWC', 'Salesforce', 'EPAM', 'IIT', 'AWS', 'REST', 'CI/CD'];
const floatingTexts = [];

class FloatingText {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.text = keywords[Math.floor(Math.random() * keywords.length)];
        this.opacity = Math.random() * 0.3 + 0.1;
        this.size = Math.random() * 10 + 12;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }
    
    draw() {
        ctx.font = `${this.size}px Inter`;
        ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
        ctx.fillText(this.text, this.x, this.y);
    }
}

for (let i = 0; i < 15; i++) {
    floatingTexts.push(new FloatingText());
}

class Particle {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2;
        this.life = 1;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 0.001;
        
        if (this.life <= 0 || this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }
    
    draw() {
        ctx.fillStyle = `rgba(99, 102, 241, ${this.life * 0.5})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw floating keywords
    floatingTexts.forEach(text => {
        text.update();
        text.draw();
    });
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    // Connect nearby particles
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                ctx.strokeStyle = `rgba(99, 102, 241, ${(1 - distance / 150) * 0.2})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Custom Cursor
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    document.body.style.setProperty('--cursor-x', cursorX + 'px');
    document.body.style.setProperty('--cursor-y', cursorY + 'px');
    
    requestAnimationFrame(updateCursor);
}

updateCursor();

// Update cursor position
document.body.style.setProperty('--cursor-x', '0px');
document.body.style.setProperty('--cursor-y', '0px');

const style = document.createElement('style');
style.textContent = `
    body::before {
        left: var(--cursor-x);
        top: var(--cursor-y);
        transform: translate(-50%, -50%);
    }
`;
document.head.appendChild(style);

// Scene Activation on Scroll
const scenes = document.querySelectorAll('.scene');

const observerOptions = {
    threshold: 0.3,
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

// Smooth scroll for links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Project card interactions
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax effect on scroll
let scrollY = 0;

window.addEventListener('scroll', () => {
    scrollY = window.pageYOffset;
    
    // Parallax for hero
    const hero = document.querySelector('.hero-scene .scene-content');
    if (hero) {
        hero.style.transform = `translateY(${scrollY * 0.5}px)`;
        hero.style.opacity = 1 - (scrollY / window.innerHeight);
    }
});

// Magnetic effect for contact links
const contactLinks = document.querySelectorAll('.contact-link');

contactLinks.forEach(link => {
    link.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
    });
});

// 3D Card tilt and flip effect
const card3d = document.querySelector('.hero-card-3d');
if (card3d) {
    let isFlipped = false;
    
    card3d.addEventListener('click', function() {
        isFlipped = !isFlipped;
        const cardInner = this.querySelector('.card-inner');
        if (isFlipped) {
            cardInner.style.transform = 'rotateY(180deg)';
        } else {
            cardInner.style.transform = 'rotateY(0deg)';
        }
    });
    
    card3d.addEventListener('mousemove', function(e) {
        if (isFlipped) return;
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        this.querySelector('.card-inner').style.transform = 
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card3d.addEventListener('mouseleave', function() {
        if (!isFlipped) {
            this.querySelector('.card-inner').style.transform = 'rotateX(0) rotateY(0)';
        }
    });
}

// Add hover effect to skills
const skills = document.querySelectorAll('.skill');

skills.forEach(skill => {
    skill.addEventListener('mouseenter', function() {
        this.style.color = '#6366f1';
    });
    
    skill.addEventListener('mouseleave', function() {
        this.style.color = '#9ca3af';
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const currentScene = document.querySelector('.scene.active');
    const allScenes = Array.from(scenes);
    const currentIndex = allScenes.indexOf(currentScene);
    
    if (e.key === 'ArrowDown' && currentIndex < allScenes.length - 1) {
        allScenes[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        allScenes[currentIndex - 1].scrollIntoView({ behavior: 'smooth' });
    }
});

console.log('%cDhruv Agrawal', 'font-size: 40px; font-weight: bold; color: #6366f1;');
console.log('%cSoftware Developer', 'font-size: 20px; color: #9ca3af;');
console.log('%cBuilt with passion and precision', 'font-size: 14px; color: #999;');
