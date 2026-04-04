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

// ── Carousel (old — for projects section if re-used) ───────
function carouselStep(carouselId, dir) {
  const imgs = Array.from(
    document.querySelectorAll(`#${carouselId} .carousel-images img`)
  );
  if (!imgs.length) return;
  const cur = imgs.findIndex(i => i.classList.contains('active'));
  imgs[cur].classList.remove('active');
  imgs[(cur + dir + imgs.length) % imgs.length].classList.add('active');
}

function carouselNext(id) { carouselStep(id,  1); }
function carouselPrev(id) { carouselStep(id, -1); }

// ── Card carousel (project grid cards) ────────────────────
function cardCarouselStep(btn, dir) {
  const wrap = btn.closest('.card-img-wrap');
  const imgs = Array.from(wrap.querySelectorAll('.card-img'));
  if (imgs.length <= 1) return;
  const cur = imgs.findIndex(i => i.classList.contains('active'));
  imgs[cur].classList.remove('active');
  imgs[(cur + dir + imgs.length) % imgs.length].classList.add('active');
}

function cardCarouselNext(btn) { cardCarouselStep(btn,  1); }
function cardCarouselPrev(btn) { cardCarouselStep(btn, -1); }

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
