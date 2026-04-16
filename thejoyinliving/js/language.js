/* ============================================================
   THE JOY IN LIVING — Language Switcher
   EN/ES bilingual support with localStorage persistence
   ============================================================ */

// Base path for GitHub Pages subdirectory deployment
const SITE_BASE = '/thejoyinliving';

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
});

function initLanguageSwitcher() {
  const langBtns = document.querySelectorAll('.nav__lang-btn');
  if (!langBtns.length) return;

  const currentPage = window.location.pathname;

  // Determine current language from URL
  const isSpanish = currentPage.includes('/es/');
  const currentLang = isSpanish ? 'es' : 'en';

  // Set active state on buttons
  langBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });

  // Handle click
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetLang = btn.dataset.lang;
      if (targetLang === currentLang) return;

      localStorage.setItem('joy-lang', targetLang);

      if (targetLang === 'es') {
        window.location.href = getSpanishPath(currentPage);
      } else {
        window.location.href = getEnglishPath(currentPage);
      }
    });
  });
}

function getSpanishPath(path) {
  // Remove base, find relative path, return Spanish equivalent
  const rel = path.replace(SITE_BASE, '') || '/';
  const map = {
    '/':                    SITE_BASE + '/es/',
    '/index.html':          SITE_BASE + '/es/',
    '/who-we-are/':         SITE_BASE + '/es/',
    '/about/':              SITE_BASE + '/es/',
    '/services/':           SITE_BASE + '/es/',
    '/contact/':            SITE_BASE + '/es/',
    '/your-visit/':         SITE_BASE + '/es/',
    '/payments-insurance/': SITE_BASE + '/es/',
    '/faq/':                SITE_BASE + '/es/',
    '/blog/':               SITE_BASE + '/es/',
    '/resources/':          SITE_BASE + '/es/',
    '/government/':         SITE_BASE + '/es/',
  };
  return map[rel] || SITE_BASE + '/es/';
}

function getEnglishPath(path) {
  const rel = path.replace(SITE_BASE, '') || '/';
  const map = {
    '/es/':           SITE_BASE + '/',
    '/es/index.html': SITE_BASE + '/',
  };
  return map[rel] || SITE_BASE + '/';
}
