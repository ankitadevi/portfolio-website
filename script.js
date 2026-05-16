/* =============================
   Ankita Devi — Portfolio JS
   ============================= */

/* ── Scroll Reveal ── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // animate once only
      }
    });
  },
  { threshold: 0.1 }
);

function initReveal() {
  const targets = document.querySelectorAll(
    '.project-card, .exp-card, .achievement-card, .edu-item, .stat-card, .skill-group'
  );
  targets.forEach((el) => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
}

/* ── Active Nav Link Highlight on Scroll ── */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile-menu a');

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.style.color = 'var(--accent)';
            }
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((sec) => navObserver.observe(sec));
}

/* ── Mobile Hamburger Menu ── */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Close menu on link click
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

/* ── Smooth Scroll for all anchor links ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ── Typing effect on hero subtitle ── */
function initTypingEffect() {
  const el = document.getElementById('hero-typing');
  if (!el) return;

  const phrases = [
    'Machine Learning Engineer',
    'Full-Stack Developer',
    'Competitive Programmer',
    'AI Researcher',
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const current = phrases[phraseIndex];

    if (deleting) {
      el.textContent = current.slice(0, charIndex--);
    } else {
      el.textContent = current.slice(0, charIndex++);
    }

    let delay = deleting ? 50 : 90;

    if (!deleting && charIndex > current.length) {
      delay = 1800; // pause at full word
      deleting = true;
    } else if (deleting && charIndex < 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ── Navbar shadow on scroll ── */
function initNavShadow() {
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

/* ── Back to top on logo click ── */
function initLogoScroll() {
  const logo = document.querySelector('.nav-logo');
  if (logo) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ── Init all ── */
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initActiveNav();
  initMobileMenu();
  initSmoothScroll();
  initTypingEffect();
  initNavShadow();
  initLogoScroll();
});

/* ── Theme Toggle (Light / Dark) ── */
function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  const label = btn ? btn.querySelector('.toggle-label') : null;
  if (!btn) return;

  // Restore saved preference
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.body.classList.add('light-mode');
    label.textContent = 'Dark';
  }

  btn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');
    label.textContent = isLight ? 'Dark' : 'Light';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');

    // Animate bulb on click
    const bulb = btn.querySelector('.bulb-icon');
    bulb.style.transition = 'transform 0.15s ease';
    bulb.style.transform = 'scale(1.4) rotate(20deg)';
    setTimeout(() => { bulb.style.transform = ''; }, 200);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // existing inits already registered above; just add theme
  initThemeToggle();
});
