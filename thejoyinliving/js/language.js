/* ============================================================
   THE JOY IN LIVING — Language Switcher
   EN/ES bilingual support with localStorage persistence
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
});

function initLanguageSwitcher() {
  const langBtns = document.querySelectorAll('.nav__lang-btn');
  if (!langBtns.length) return;

  // Check stored preference
  const stored = localStorage.getItem('joy-lang');
  const currentPage = window.location.pathname;

  // Determine current language from URL
  const isSpanish = currentPage.startsWith('/es/') || currentPage.includes('/es/');
  const currentLang = isSpanish ? 'es' : 'en';

  // Set active state
  langBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });

  // Handle click
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetLang = btn.dataset.lang;
      if (targetLang === currentLang) return;

      localStorage.setItem('joy-lang', targetLang);

      // Navigate to equivalent page
      if (targetLang === 'es') {
        // Going from EN to ES
        const esPath = getSpanishPath(currentPage);
        window.location.href = esPath;
      } else {
        // Going from ES to EN
        const enPath = getEnglishPath(currentPage);
        window.location.href = enPath;
      }
    });
  });
}

function getSpanishPath(path) {
  const map = {
    '/': '/es/',
    '/index.html': '/es/index.html',
    '/who-we-are/': '/es/quienes-somos/',
    '/about/': '/es/sobre-nosotros/',
    '/services/': '/es/servicios/',
    '/contact/': '/es/contacto/',
    '/your-visit/': '/es/tu-visita/',
    '/payments-insurance/': '/es/pagos-seguro/',
    '/faq/': '/es/preguntas-frecuentes/',
  };
  return map[path] || '/es/';
}

function getEnglishPath(path) {
  const map = {
    '/es/': '/',
    '/es/index.html': '/index.html',
    '/es/quienes-somos/': '/who-we-are/',
    '/es/sobre-nosotros/': '/about/',
    '/es/servicios/': '/services/',
    '/es/contacto/': '/contact/',
    '/es/tu-visita/': '/your-visit/',
    '/es/pagos-seguro/': '/payments-insurance/',
    '/es/preguntas-frecuentes/': '/faq/',
  };
  return map[path] || '/';
}
