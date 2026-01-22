// --- Theme & Loader ---
window.addEventListener('load', () => {
    document.getElementById('loader').classList.add('fade-out');
    setTimeout(typeEffect, 1000);
    initParticles();
});

const html = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeBtn.querySelector('.icon').textContent = next === 'light' ? '🌙' : '☀️';
});

// --- Typewriter Effect ---
const text = "Beyond the Interface";
let index = 0;
function typeEffect() {
    const target = document.getElementById("typewriterText");
    if (index < text.length) {
        target.textContent += text.charAt(index);
        index++;
        setTimeout(typeEffect, 100);
    } else {
        target.style.borderRight = "none";
    }
}

// --- Particle System ---
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function initParticles() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    for(let i=0; i<70; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 0.5 - 0.25
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
        if(p.x > canvas.width) p.x = 0;
        if(p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
        ctx.fill();
    });
    requestAnimationFrame(animate);
}

// --- Cursor Logic ---
document.addEventListener('mousemove', (e) => {
    const cursor = document.getElementById('cursor');
    const blur = document.getElementById('cursor-blur');
    if(cursor) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        blur.style.left = e.clientX - 100 + 'px';
        blur.style.top = e.clientY - 100 + 'px';
    }
});

// --- Scroll Logic ---
const scrollBtn = document.getElementById('scrollToTop');
window.onscroll = () => {
    if (window.scrollY > 500) scrollBtn.style.display = "block";
    else scrollBtn.style.display = "none";
};
scrollBtn.onclick = () => window.scrollTo({top: 0, behavior: 'smooth'});

// --- Form Validation ---
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    let valid = true;
    form.querySelectorAll('[required]').forEach(input => {
        if(!input.value.trim()) {
            input.parentElement.classList.add('invalid');
            valid = false;
        } else {
            input.parentElement.classList.remove('invalid');
        }
    });
    if(valid) {
        const status = document.getElementById('formStatus');
        status.textContent = "Message sent!";
        status.classList.remove('hidden');
        form.reset();
    }
});
