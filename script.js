// --- Core Engine ---
window.addEventListener('load', () => {
    document.getElementById('loader').classList.add('fade-out');
    setTimeout(typeEffect, 800);
    initParticles();
    startClock();
    initScrollObservers();
});

// --- Theme Logic ---
const html = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
if(themeBtn) themeBtn.querySelector('.icon').textContent = savedTheme === 'light' ? '🌙' : '☀️';

themeBtn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeBtn.querySelector('.icon').textContent = next === 'light' ? '🌙' : '☀️';
});

// --- Typewriter ---
const text = "Xenxified Test Website: VOID";
let idx = 0;
function typeEffect() {
    const target = document.getElementById("typewriterText");
    if (target && idx < text.length) {
        target.textContent += text.charAt(idx++);
        setTimeout(typeEffect, 100);
    } else if (target) { target.style.borderRight = "none"; }
}

// --- Particles ---
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
function initParticles() {
    if(!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    for(let i=0; i<60; i++) {
        particles.push({
            x: Math.random() * canvas.width, y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: Math.random() * 0.4 - 0.2, speedY: Math.random() * 0.4 - 0.2
        });
    }
    animate();
}
function animate() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = getComputedStyle(html).getPropertyValue('--accent') || '#ffffff';
    ctx.globalAlpha = 0.2;
    particles.forEach(p => {
        p.x += p.speedX; p.y += p.speedY;
        if(p.x > canvas.width || p.x < 0) p.x = Math.random() * canvas.width;
        if(p.y > canvas.height || p.y < 0) p.y = Math.random() * canvas.height;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); ctx.fill();
    });
    requestAnimationFrame(animate);
}

// --- Live Clock ---
function startClock() {
    const clockEl = document.getElementById('liveClock');
    if(!clockEl) return;
    setInterval(() => {
        clockEl.textContent = new Date().toLocaleTimeString();
    }, 1000);
}

// --- Scroll Logic ---
const scrollBtn = document.getElementById('scrollToTop');
window.onscroll = () => { if(scrollBtn) scrollBtn.style.display = window.scrollY > 500 ? "block" : "none"; };
if(scrollBtn) scrollBtn.onclick = () => window.scrollTo({top: 0, behavior: 'smooth'});

function initScrollObservers() {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.getAttribute('data-per') + '%';
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.skill-per').forEach(bar => skillObserver.observe(bar));

    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (pageYOffset >= section.offsetTop - 100) current = section.getAttribute('id');
        });
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) item.classList.add('active');
        });
    });
}

// --- Robust Character Counter Logic ---
const messageArea = document.getElementById('messageArea');
const charCountDisplay = document.getElementById('charCount');
const submitBtn = document.getElementById('submitBtn');

const updateCounter = () => {
    if(!messageArea || !charCountDisplay) return;
    const count = messageArea.value.length;
    charCountDisplay.textContent = count;

    if(count >= 250) {
        charCountDisplay.style.color = "#ef4444"; 
    } else {
        charCountDisplay.style.color = "var(--accent)";
    }
};

if(messageArea) {
    messageArea.addEventListener('input', updateCounter);
}

// --- Interactive UI (Email & Form) ---
const emailCopy = document.getElementById('emailCopy');
if(emailCopy) {
    emailCopy.onclick = function() {
        navigator.clipboard.writeText(this.textContent);
        const status = document.getElementById('copyStatus');
        status.textContent = "✓ Copied to clipboard!";
        setTimeout(() => status.textContent = "", 2000);
    };
}

const form = document.getElementById('contactForm');
if(form) {
    form.onsubmit = async (e) => {
        e.preventDefault();
        const statusMsg = document.getElementById('formStatus');
        
        // Reliability: Disable button to prevent double-sends
        submitBtn.disabled = true;
        statusMsg.classList.remove('hidden');
        statusMsg.style.color = "var(--accent)";
        statusMsg.textContent = "🚀 Sending...";

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                statusMsg.textContent = "✓ Support message has been sent!.";
                form.reset();
                updateCounter(); // Reset counter display to 0
            } else {
                throw new Error();
            }
        } catch (error) {
            statusMsg.style.color = "#ef4444";
            statusMsg.textContent = "❌ Failed to send. Please try again.";
        } finally {
            // Re-enable button after response
            submitBtn.disabled = false;
        }
    };
}
