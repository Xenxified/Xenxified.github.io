:root {
    --bg: #ffffff;
    --text: #1a1a1a;
    --card-bg: rgba(255, 255, 255, 0.8);
    --accent: #2563eb;
    --nav-bg: rgba(255, 255, 255, 0.9);
    --border: #e5e7eb;
}

[data-theme="dark"] {
    --bg: #020617;
    --text: #f8fafc;
    --card-bg: rgba(15, 23, 42, 0.7);
    --accent: #38bdf8;
    --nav-bg: rgba(2, 6, 23, 0.9);
    --border: #1e293b;
}

* { box-sizing: border-box; transition: all 0.3s ease; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

body {
    font-family: 'Inter', system-ui, sans-serif;
    background-color: var(--bg);
    color: var(--text);
    overflow-x: hidden;
}

/* --- Micro Animations --- */
.glass-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border-color: var(--accent);
}

.btn-primary:active { transform: scale(0.95); }

/* --- Scroll Indicator --- */
.scroll-indicator {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
}

.arrow {
    width: 20px;
    height: 20px;
    border-right: 3px solid var(--accent);
    border-bottom: 3px solid var(--accent);
    transform: rotate(45deg);
    animation: bounce 2s infinite;
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0) rotate(45deg); }
    40% { transform: translateY(-10px) rotate(45deg); }
    60% { transform: translateY(-5px) rotate(45deg); }
}

/* --- Rest of CSS (Unchanged) --- */
#loader { position: fixed; inset: 0; background: var(--bg); display: flex; justify-content: center; align-items: center; z-index: 9999; }
.spinner { width: 40px; height: 40px; border: 4px solid var(--border); border-top-color: var(--accent); border-radius: 50%; animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.fade-out { opacity: 0; visibility: hidden; transition: 0.5s; }
header { position: sticky; top: 0; background: var(--nav-bg); backdrop-filter: blur(10px); z-index: 100; border-bottom: 1px solid var(--border); }
nav { display: flex; justify-content: space-between; align-items: center; padding: 1rem 5%; max-width: 1200px; margin: 0 auto; }
.logo { font-weight: 800; font-size: 1.5rem; color: var(--accent); letter-spacing: 2px; }
.nav-links { display: flex; list-style: none; gap: 2rem; }
.nav-links a { text-decoration: none; color: var(--text); font-weight: 500; font-size: 0.9rem; position: relative; }
.nav-links a.active { color: var(--accent); }
.nav-links a.active::after { content: ''; position: absolute; bottom: -5px; left: 0; width: 100%; height: 2px; background: var(--accent); }
.nav-right { display: flex; align-items: center; gap: 15px; }
#liveClock { font-family: monospace; font-size: 0.9rem; color: var(--accent); }
.hero { height: 100vh; position: relative; display: flex; align-items: center; justify-content: center; text-align: center; }
#particleCanvas { position: absolute; inset: 0; z-index: 1; }
.hero-content { position: relative; z-index: 2; max-width: 600px; padding: 20px; }
.typewriter { border-right: 3px solid var(--accent); white-space: nowrap; overflow: hidden; font-size: 2.5rem; margin-bottom: 1rem; display: inline-block; }
.skill-bar-bg { background: var(--border); height: 8px; border-radius: 4px; margin: 10px 0 20px; overflow: hidden; }
.skill-per { background: var(--accent); height: 100%; width: 0; transition: width 2s cubic-bezier(0.1, 0, 0.2, 1); }
.container { padding: 5rem 5%; max-width: 1200px; margin: 0 auto; }
.section-title { text-align: center; margin-bottom: 3rem; font-size: 2.2rem; }
.glass-card { background: var(--card-bg); backdrop-filter: blur(12px); padding: 2.5rem; border-radius: 24px; border: 1px solid var(--border); }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
.gallery-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
.project-card { height: 300px; background: #0f172a; border-radius: 20px; position: relative; overflow: hidden; border: 1px solid var(--border); }
.project-info { position: absolute; inset: 0; background: rgba(2, 6, 23, 0.9); display: flex; flex-direction: column; justify-content: center; align-items: center; opacity: 0; transition: 0.4s; transform: translateY(20px); }
.project-card:hover .project-info { opacity: 1; transform: translateY(0); }
.form-group { margin-bottom: 1.5rem; }
input, textarea { width: 100%; padding: 14px; border-radius: 10px; border: 1px solid var(--border); background: rgba(255,255,255,0.05); color: var(--text); outline: none; }
#formStatus { margin-top: 1rem; font-weight: bold; color: var(--accent); }
.btn-primary { background: var(--accent); color: #fff; border: none; padding: 14px 32px; border-radius: 12px; font-weight: 600; cursor: pointer; }
#themeToggle { background: var(--border); border: none; padding: 10px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; }
#scrollToTop { position: fixed; bottom: 30px; right: 30px; width: 50px; height: 50px; border-radius: 50%; background: var(--accent); color: white; border: none; cursor: pointer; display: none; z-index: 100; box-shadow: 0 0 15px var(--accent); }
.copy-email { background: var(--border); padding: 10px 20px; border-radius: 8px; cursor: pointer; display: inline-block; margin-bottom: 1rem; font-weight: bold; }
.hidden { display: none; }
#nav-check, .nav-btn { display: none; }
@media (max-width: 768px) {
    .nav-btn { display: flex; flex-direction: column; gap: 5px; cursor: pointer; }
    .nav-btn span { width: 25px; height: 2px; background: var(--text); }
    .nav-links { position: absolute; top: 100%; left: 0; width: 100%; background: var(--nav-bg); flex-direction: column; align-items: center; padding: 2rem 0; clip-path: circle(0% at 100% 0%); transition: 0.6s ease; }
    #nav-check:checked ~ .nav-links { clip-path: circle(150% at 100% 0%); }
    .typewriter { font-size: 1.6rem; }
}
