/* ═══════════════════════════════════════════
   AI 바이브웹 — main.js  v3.0
═══════════════════════════════════════════ */

// ─── Header scroll ───────────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ─── Scroll Reveal ────────────────────────────
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ─── Bar fill animation ────────────────────────
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.eff-bar-fill').forEach((bar, i) => {
        setTimeout(() => { bar.style.width = bar.dataset.w; }, i * 120);
      });
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
const effSection = document.querySelector('#effect');
if (effSection) barObs.observe(effSection);

// ─── Active flow step cycling ──────────────────
const flSteps = document.querySelectorAll('.fl-step');
if (flSteps.length) {
  let idx = 2; // start at "코드 완성"
  setInterval(() => {
    flSteps.forEach(s => s.classList.remove('active'));
    flSteps[idx % flSteps.length].classList.add('active');
    idx++;
  }, 1600);
}

// ─── Smooth nav highlight ──────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('nav a[href^="#"]');
const secObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(link => {
        const match = link.getAttribute('href') === '#' + e.target.id;
        if (!link.classList.contains('btn-fill') && !link.classList.contains('btn-outline')) {
          link.style.color = match ? '#fff' : '';
        }
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => secObs.observe(s));
