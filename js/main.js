/* ═══════════════════════════════════════════
   AI 바이브웹 — main.js  v2.0
═══════════════════════════════════════════ */

// ─── Header scroll effect ─────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// ─── Scroll Reveal ────────────────────────────
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.10 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ─── Bar Chart Animation ──────────────────────
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar-fill').forEach(bar => {
        const target = bar.dataset.w;
        setTimeout(() => { bar.style.width = target; }, 200);
      });
      barObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const chartWrap = document.querySelector('.chart-wrap');
if (chartWrap) barObs.observe(chartWrap);

// ─── Smooth nav highlight on scroll ──────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('nav > a[href^="#"]');

const secObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        const isMatch = link.getAttribute('href') === '#' + entry.target.id;
        if (!link.classList.contains('btn-cta')) {
          link.style.color = isMatch ? 'var(--brown)' : '';
        }
      });
    }
  });
}, { threshold: 0.45 });

sections.forEach(s => secObs.observe(s));

// ─── Active flow node on scroll ──────────────
const flowNodes = document.querySelectorAll('.flow-node');
let flowIdx = 0;
setInterval(() => {
  flowNodes.forEach(n => n.classList.remove('active'));
  flowNodes[flowIdx % flowNodes.length]?.classList.add('active');
  flowIdx++;
}, 1400);
