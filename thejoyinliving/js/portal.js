/* ============================================================
   Portal JS — smart language switching with URL mapping
   ============================================================ */

// EN ↔ ES page mapping (key = EN path, value = ES path)
const PORTAL_LANG_MAP = {
  '/thejoyinliving/patient-portal/'              : '/thejoyinliving/es/portal-del-paciente/',
  '/thejoyinliving/patient-portal/appointments/' : '/thejoyinliving/es/portal-del-paciente/citas/',
  '/thejoyinliving/patient-portal/telehealth/'   : '/thejoyinliving/es/portal-del-paciente/telesalud/',
  '/thejoyinliving/patient-portal/av-test/'      : '/thejoyinliving/es/portal-del-paciente/prueba-av/',
  '/thejoyinliving/patient-portal/notifications/': '/thejoyinliving/es/portal-del-paciente/notificaciones/',
  '/thejoyinliving/patient-portal/login/'        : '/thejoyinliving/es/portal-del-paciente/iniciar-sesion/',
  '/thejoyinliving/patient-portal/recover/'      : '/thejoyinliving/es/portal-del-paciente/recuperar/',
};

// Build reverse map (ES → EN)
const PORTAL_LANG_MAP_ES = Object.fromEntries(
  Object.entries(PORTAL_LANG_MAP).map(([en, es]) => [es, en])
);

function getPortalLangTarget(targetLang) {
  const path = window.location.pathname;
  if (targetLang === 'es') {
    return PORTAL_LANG_MAP[path] || PORTAL_LANG_MAP_ES[path] || '/thejoyinliving/es/portal-del-paciente/';
  } else {
    return PORTAL_LANG_MAP_ES[path] || PORTAL_LANG_MAP[path] || '/thejoyinliving/patient-portal/';
  }
}

function isPortalPage() {
  return window.location.pathname.includes('/patient-portal/') ||
         window.location.pathname.includes('/portal-del-paciente/');
}

// ── Wire up the main-site nav EN/ES buttons on portal pages ──
document.addEventListener('DOMContentLoaded', () => {
  if (!isPortalPage()) return;

  const langBtns = document.querySelectorAll('.nav__lang-btn');
  langBtns.forEach(btn => {
    const lang = btn.dataset.lang;
    if (!lang) return;

    // Make both buttons always visible
    btn.style.display = '';

    // Replace default href behaviour with portal-aware redirect
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = getPortalLangTarget(lang);
    });
  });

  // Also highlight active tab based on current URL
  document.querySelectorAll('.portal-tab').forEach(tab => {
    if (tab.href) {
      try {
        const tabPath = new URL(tab.href).pathname;
        if (window.location.pathname === tabPath) {
          tab.classList.add('active');
        }
      } catch(e) {}
    }
  });
});
