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
    if (idx < text.length) {
        target.textContent += text.charAt(idx++);
        setTimeout(typeEffect, 100);
    } else { target.style.borderRight = "none"; }
}

// --- Particles ---
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
function initParticles() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    for(let i=0; i<50; i++) {
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
    ctx.fillStyle = getComputedStyle(html).getPropertyValue('--accent');
    ctx.globalAlpha = 0.2;
    particles.forEach(p => {
        p.x += p.speedX; p.y += p.speedY;
        if(p.x > canvas.width || p.x < 0) p.x = Math.random() * canvas.width;
        if(p.y > canvas.height || p.y < 0) p.y = Math.random() * canvas.height;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); ctx.fill();
    });
    requestAnimationFrame(animate);
}

// --- Observers ---
function initScrollObservers() {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => revealObserver.observe(el));

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.style.width = entry.target.getAttribute('data-per') + '%';
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.skill-per').forEach(bar => skillObserver.observe(bar));
}

// --- Helpers ---
function startClock() {
    setInterval(() => document.getElementById('liveClock').textContent = new Date().toLocaleTimeString(), 1000);
}

const scrollBtn = document.getElementById('scrollToTop');
window.onscroll = () => { scrollBtn.style.display = window.scrollY > 500 ? "block" : "none"; };
scrollBtn.onclick = () => window.scrollTo({top: 0, behavior: 'smooth'});

// --- Form & Limits ---
const msgArea = document.getElementById('messageArea');
const charDisplay = document.getElementById('charCount');
msgArea.addEventListener('input', () => {
    charDisplay.textContent = msgArea.value.length;
    charDisplay.style.color = msgArea.value.length >= 250 ? "#ef4444" : "rgba(255,255,255,0.6)";
});

document.getElementById('emailCopy').onclick = function() {
    navigator.clipboard.writeText(this.textContent);
    document.getElementById('copyStatus').textContent = "✓ Copied!";
    setTimeout(() => document.getElementById('copyStatus').textContent = "", 2000);
};

const form = document.getElementById('contactForm');
form.onsubmit = async (e) => {
    e.preventDefault();
    const status = document.getElementById('formStatus');
    status.classList.remove('hidden');
    status.textContent = "🚀 Sending...";
    const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } });
    if (res.ok) {
        status.textContent = "✓ Support message sent!";
        form.reset();
        charDisplay.textContent = "0";
    } else { status.textContent = "❌ Failed."; }
};
