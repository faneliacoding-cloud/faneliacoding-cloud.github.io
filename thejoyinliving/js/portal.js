/* ============================================================
   Portal JS — language switching + form interactions
   ============================================================ */

let currentLang = localStorage.getItem('joy-lang') || 'en';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('joy-lang', lang);
  document.querySelectorAll('.plang-btn').forEach(b => {
    b.classList.toggle('active', b.textContent.toLowerCase().includes(lang === 'es' ? 'español' : 'english'));
  });
  document.querySelectorAll('.en-text').forEach(el => el.style.display = lang === 'en' ? '' : 'none');
  document.querySelectorAll('.es-text').forEach(el => el.style.display = lang === 'es' ? '' : 'none');
  // Update data-en / data-es elements
  document.querySelectorAll('[data-en][data-es]').forEach(el => {
    el.textContent = lang === 'es' ? el.dataset.es : el.dataset.en;
  });
  // Update placeholder attributes
  document.querySelectorAll('[data-placeholder-en][data-placeholder-es]').forEach(el => {
    el.placeholder = lang === 'es' ? el.dataset.placeholderEs : el.dataset.placeholderEn;
  });
}

// Highlight active nav item
document.querySelectorAll('.portal-nav__item').forEach(item => {
  if (item.href && window.location.pathname.endsWith(new URL(item.href).pathname)) {
    item.classList.add('active');
  }
});

// Init lang on load
document.addEventListener('DOMContentLoaded', () => {
  setLang(currentLang);
});
