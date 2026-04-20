/**
 * nav-badges.js — Badge-style Nav Icon Injection
 * The Joy In Living
 *
 * Dynamically injects icons into every .nav__link so the nav visually
 * matches the trust-bar badge visual language (icon + label chip).
 * Works on EN and ES pages. Zero dependencies. ~3KB.
 */
(function () {
  'use strict';

  /* ════════════════════════════════════════════════════════════════
     ICON LIBRARY — Professional line icons (24×24 viewBox)
     Stroke width: 1.8 — matches trust-bar__icon weight
  ════════════════════════════════════════════════════════════════ */
  var ICONS = {

    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10.5L12 4l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1v-9.5z"/><path d="M9 21v-8h6v8"/></svg>',

    about: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="7" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>',

    services: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21C12 21 3.5 15 3.5 9A5.5 5.5 0 0112 4.5 5.5 5.5 0 0120.5 9c0 6-8.5 12-8.5 12z"/></svg>',

    insurance: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2l8 3v5c0 5.3-3.5 10.2-8 12-4.5-1.8-8-6.7-8-12V5l8-3z"/><polyline points="9 12 11 14 15 10"/></svg>',

    blog: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="13" y2="16"/></svg>',

    contact: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2.5"/><polyline points="2,7 12,14 22,7"/></svg>',

    resources: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4v16l8-3 8 3V4"/><line x1="12" y1="4" x2="12" y2="17"/></svg>'
  };

  /* ════════════════════════════════════════════════════════════════
     ICON RESOLVER
     Maps href patterns → icon key. Works for both EN and ES hrefs.
  ════════════════════════════════════════════════════════════════ */
  function resolveIcon(href, textContent) {
    var h = (href || '').toLowerCase();
    var t = (textContent || '').toLowerCase().trim();

    /* Home — root path, EN or ES */
    if (/thejoyinliving\/(es\/)?$/.test(h) || h === '/') return 'home';

    /* Explicit href patterns */
    if (h.includes('who-we-are') || h.includes('quienes-somos')) return 'about';
    if (h.includes('service')   || h.includes('servic'))         return 'services';
    if (h.includes('payment')   || h.includes('insur') || h.includes('seguro')) return 'insurance';
    if (h.includes('blog'))                                       return 'blog';
    if (h.includes('contact')   || h.includes('contacto'))       return 'contact';
    if (h.includes('resource')  || h.includes('recurs'))         return 'resources';

    /* Dropdown triggers with href="#" — resolve by label text */
    if (h === '#') {
      if (t.includes('resource') || t.includes('recur')  || t.includes('recurso')) return 'resources';
      if (t.includes('about')    || t.includes('nosotros')|| t.includes('sobre'))   return 'about';
      if (t.includes('service')  || t.includes('servic'))                           return 'services';
    }

    return null; /* No match — skip this link */
  }

  /* ════════════════════════════════════════════════════════════════
     LINK PROCESSOR
     Restructures: plain text → [icon span] [label span] [chevron?]
  ════════════════════════════════════════════════════════════════ */
  function processLink(link) {
    /* Skip lang buttons and CTA anchors that share ancestor classes */
    if (link.closest('.nav__lang') || link.closest('.nav__cta')) return;
    /* Skip dropdown sub-items */
    if (link.classList.contains('nav__dropdown-item'))            return;

    var href = link.getAttribute('href') || '';

    /* Capture the small 12×12 chevron SVG before we clear the link */
    var chevron = link.querySelector('svg[viewBox="0 0 12 12"]');
    if (chevron) chevron.remove();

    /* Extract plain text (text nodes only, trimmed) */
    var rawText = Array.from(link.childNodes)
      .filter(function (n) { return n.nodeType === Node.TEXT_NODE; })
      .map(function (n) { return n.textContent.trim(); })
      .filter(Boolean)
      .join(' ');

    if (!rawText) return;

    var iconKey = resolveIcon(href, rawText);
    if (!iconKey) return; /* Unknown nav item — leave untouched */

    /* Clear the link */
    while (link.firstChild) link.removeChild(link.firstChild);

    /* ── Icon span ─────────────────────────────────────────────── */
    var iconSpan = document.createElement('span');
    iconSpan.className = 'nav-badge__icon';
    iconSpan.setAttribute('aria-hidden', 'true');
    iconSpan.innerHTML = ICONS[iconKey];
    link.appendChild(iconSpan);

    /* ── Label span ────────────────────────────────────────────── */
    var labelSpan = document.createElement('span');
    labelSpan.className = 'nav-badge__label';
    labelSpan.textContent = rawText;
    link.appendChild(labelSpan);

    /* ── Restore chevron at end ────────────────────────────────── */
    if (chevron) link.appendChild(chevron);

    /* Tag for CSS and active detection */
    link.setAttribute('data-nav-key', iconKey);
    /* Accessible tooltip for icon-only compact mode */
    link.setAttribute('title', rawText);
  }

  /* ════════════════════════════════════════════════════════════════
     ACTIVE STATE
     Marks the current page's nav link with .nav-badge--active
     and aria-current="page" for accessibility.
  ════════════════════════════════════════════════════════════════ */
  function markActive() {
    var path = window.location.pathname.replace(/\/$/, '');

    document.querySelectorAll('a.nav__link[data-nav-key]').forEach(function (link) {
      var href = (link.getAttribute('href') || '').replace(/\/$/, '');
      if (!href || href === '#') return;

      /* Home requires exact match; all others use startsWith */
      var isHome   = /thejoyinliving\/(es)?$/.test(href) || href === '' || href === '/thejoyinliving';
      var active   = isHome
        ? (path === href || path === href + '/es')
        : (path === href || path.startsWith(href + '/'));

      if (active) {
        link.classList.add('nav-badge--active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ════════════════════════════════════════════════════════════════
     INIT
  ════════════════════════════════════════════════════════════════ */
  function init() {
    /* Process every .nav__link inside the nav menu */
    document.querySelectorAll('.nav__menu a.nav__link').forEach(processLink);
    markActive();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
