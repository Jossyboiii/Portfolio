// ── Tab switching ──────────────────────────────────────────
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab-btn, .mob-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.section === id);
  });
  const target = document.getElementById(id);
  if (target) target.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'instant' });
}

// ── Nav tab + mobile button clicks ────────────────────────
document.querySelectorAll('.tab-btn, .mob-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    showSection(btn.dataset.section);
    closeMobileMenu();
  });
});

// ── Logo click → home ─────────────────────────────────────
document.getElementById('nav-logo').addEventListener('click', () => showSection('home'));

// ── Hero CTA buttons ───────────────────────────────────────
document.querySelectorAll('#hero-cta .term-btn[data-section]').forEach(btn => {
  btn.addEventListener('click', () => showSection(btn.dataset.section));
});

// ── Hamburger ──────────────────────────────────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

function closeMobileMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}

// ── Featured project — always cycling ─────────────────────
(function () {
  const wrap = document.getElementById('featured-carousel');
  if (!wrap) return;
  const imgs = Array.from(wrap.querySelectorAll('.feat-img'));
  if (imgs.length <= 1) return;
  let cur = 0;
  setInterval(() => {
    imgs[cur].classList.remove('active');
    cur = (cur + 1) % imgs.length;
    imgs[cur].classList.add('active');
  }, 2500);
})();

// ── Card images — cycle on hover, pause on mouse leave ─────
document.querySelectorAll('.card-img-wrap[data-hover-cycle]').forEach(wrap => {
  const imgs = Array.from(wrap.querySelectorAll('.card-img'));
  if (imgs.length <= 1) return;
  let cur = 0;
  let timer = null;

  function step() {
    imgs[cur].classList.remove('active');
    cur = (cur + 1) % imgs.length;
    imgs[cur].classList.add('active');
  }

  wrap.addEventListener('mouseenter', () => {
    timer = setInterval(step, 800);
  });

  wrap.addEventListener('mouseleave', () => {
    clearInterval(timer);
    timer = null;
    // reset to first image
    imgs[cur].classList.remove('active');
    cur = 0;
    imgs[cur].classList.add('active');
  });
});

// ── Project filters ────────────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // update active state
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    document.querySelectorAll('.proj-card').forEach(card => {
      if (filter === 'all') {
        card.classList.remove('hidden');
      } else {
        const match = card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
      }
    });
  });
});

// ── Keyboard navigation ────────────────────────────────────
const TAB_ORDER = ['home', 'about', 'projects', 'contact'];

document.addEventListener('keydown', e => {
  const active = document.querySelector('.section.active');
  if (!active) return;
  const idx = TAB_ORDER.indexOf(active.id);
  if (e.key === 'ArrowRight' && idx < TAB_ORDER.length - 1) showSection(TAB_ORDER[idx + 1]);
  if (e.key === 'ArrowLeft'  && idx > 0)                    showSection(TAB_ORDER[idx - 1]);
});
