/**
 * mobile-nav.js — Premium Mobile Navigation
 * The Joy In Living | Works on all pages, EN + ES.
 *
 * Sets window.__useMobileNav = true IMMEDIATELY (as module-level code)
 * so main.js skips its duplicate toggle/overlay handlers.
 *
 * Features:
 *  - Portrait: full slide-in drawer
 *  - Landscape: compact drawer
 *  - Orientation change: clean transition without flash
 *  - iOS scroll lock (position:fixed method — the only reliable approach)
 *  - Focus trap + ESC close + keyboard navigation
 *  - Stagger animation via CSS custom property --stagger-i
 *  - Dynamic drawer padding (always clears the fixed nav bar)
 *  - Debug panel: ?debugMenu=1
 */

/* Signal to main.js before DOMContentLoaded fires */
window.__useMobileNav = true;

(function () {
  'use strict';

  /* ════════════════════════════════════════════════════════════════
     STATE
  ════════════════════════════════════════════════════════════════ */
  var isOpen        = false;
  var savedScrollY  = 0;
  var orientation   = _getOrientation();
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* DOM refs — populated in init() */
  var nav, toggle, menu, overlay;

  /* ════════════════════════════════════════════════════════════════
     HELPERS
  ════════════════════════════════════════════════════════════════ */
  function _isMobile() {
    return window.innerWidth <= 768;
  }

  function _getOrientation() {
    if (window.matchMedia('(orientation: portrait)').matches)  return 'portrait';
    if (window.matchMedia('(orientation: landscape)').matches) return 'landscape';
    return window.innerWidth <= window.innerHeight ? 'portrait' : 'landscape';
  }

  /* ════════════════════════════════════════════════════════════════
     IOS BODY SCROLL LOCK
     overflow:hidden on <body> is ignored by iOS Safari.
     position:fixed is the only cross-device method that works.
  ════════════════════════════════════════════════════════════════ */
  function _lockScroll() {
    savedScrollY = window.scrollY;
    document.body.style.position  = 'fixed';
    document.body.style.top       = '-' + savedScrollY + 'px';
    document.body.style.left      = '0';
    document.body.style.right     = '0';
    document.body.style.overflowY = 'scroll'; /* Prevent layout shift from scrollbar disappearing */
  }

  function _unlockScroll() {
    document.body.style.position  = '';
    document.body.style.top       = '';
    document.body.style.left      = '';
    document.body.style.right     = '';
    document.body.style.overflowY = '';
    window.scrollTo(0, savedScrollY);
  }

  /* ════════════════════════════════════════════════════════════════
     DRAWER PADDING
     Computed from the nav bar's actual bottom offset so content
     always starts below the fixed header regardless of its height.
  ════════════════════════════════════════════════════════════════ */
  function _updateDrawerPadding() {
    if (!nav || !menu) return;
    var navRect   = nav.getBoundingClientRect();
    var navBottom = Math.max(navRect.bottom, 72); /* min 72px fallback */
    menu.style.paddingTop = (navBottom + 20) + 'px';
  }

  /* ════════════════════════════════════════════════════════════════
     STAGGER INDICES
     JS assigns --stagger-i to each direct child so the CSS
     transition-delay formula works: base + (i × step).
  ════════════════════════════════════════════════════════════════ */
  function _applyStaggerIndices() {
    if (!menu) return;
    var items = menu.querySelectorAll(
      ':scope > .nav__link, :scope > .nav__dropdown'
    );
    items.forEach(function (el, i) {
      el.style.setProperty('--stagger-i', i);
    });
    var lang = menu.querySelector(':scope > .nav__lang');
    var cta  = menu.querySelector(':scope > .nav__cta');
    if (lang) lang.style.setProperty('--stagger-i', items.length);
    if (cta)  cta.style.setProperty('--stagger-i', items.length + 1);
  }

  /* ════════════════════════════════════════════════════════════════
     OPEN / CLOSE
  ════════════════════════════════════════════════════════════════ */
  function openMenu() {
    if (isOpen) return;
    isOpen = true;

    _updateDrawerPadding();
    menu.classList.add('open');
    if (overlay) overlay.classList.add('active');
    toggle.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label',    'Close navigation menu');

    _lockScroll();
    _updateDebug();

    /* Move focus to first item after springer animation */
    if (!reducedMotion) {
      setTimeout(function () {
        var first = menu.querySelector(
          '.nav__link:not(.nav__dropdown-trigger), .nav__dropdown-trigger'
        );
        if (first) first.focus();
      }, 420);
    }
  }

  function closeMenu(returnFocus) {
    if (!isOpen) return;
    isOpen = false;

    menu.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label',    'Open navigation menu');

    /* Collapse any open sub-dropdowns */
    document.querySelectorAll('.nav__dropdown.open').forEach(function (dd) {
      dd.classList.remove('open');
    });

    _unlockScroll();
    _updateDebug();

    if (returnFocus !== false) toggle.focus();
  }

  function toggleMenu() {
    isOpen ? closeMenu() : openMenu();
  }

  /* ════════════════════════════════════════════════════════════════
     MOBILE DROPDOWNS
  ════════════════════════════════════════════════════════════════ */
  function _initDropdowns() {
    document.querySelectorAll('.nav__dropdown').forEach(function (dd) {
      var trigger = dd.querySelector('.nav__dropdown-trigger');
      if (!trigger) return;
      trigger.addEventListener('click', function (e) {
        if (!_isMobile()) return;
        e.preventDefault();
        dd.classList.toggle('open');
      });
    });
  }

  /* ════════════════════════════════════════════════════════════════
     CLOSE MENU ON LINK CLICK
  ════════════════════════════════════════════════════════════════ */
  function _initLinkClose() {
    if (!menu) return;
    menu.querySelectorAll(
      '.nav__link:not(.nav__dropdown-trigger), .nav__dropdown-item'
    ).forEach(function (link) {
      link.addEventListener('click', function () {
        if (_isMobile()) closeMenu(false);
      });
    });
  }

  /* ════════════════════════════════════════════════════════════════
     KEYBOARD — ESC close + Tab focus trap
  ════════════════════════════════════════════════════════════════ */
  function _initKeyboard() {
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) closeMenu();
    });

    menu.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab' || !isOpen) return;
      var focusable = Array.from(menu.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ));
      if (focusable.length < 2) return;
      var first = focusable[0];
      var last  = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    });
  }

  /* ════════════════════════════════════════════════════════════════
     ORIENTATION CHANGE
     On rotation: close menu cleanly, let layout settle, re-open.
  ════════════════════════════════════════════════════════════════ */
  function _handleOrientationChange() {
    var newOri = _getOrientation();
    if (newOri === orientation) return; /* no real change */
    orientation = newOri;

    if (isOpen) {
      var wasOpen = true;
      closeMenu(false);
      /* After layout repaints at new orientation */
      setTimeout(function () {
        if (wasOpen && _isMobile()) {
          _updateDrawerPadding();
          openMenu();
        }
      }, 320);
    }

    /* If we rotated to desktop width, just close */
    if (!_isMobile() && isOpen) closeMenu(false);

    _updateDebug();
  }

  /* ════════════════════════════════════════════════════════════════
     ACCESSIBILITY
  ════════════════════════════════════════════════════════════════ */
  function _initA11y() {
    if (!menu.id) menu.id = 'nav-menu';
    toggle.setAttribute('type',          'button');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', menu.id);
    toggle.setAttribute('aria-label',    'Open navigation menu');
    nav.setAttribute('role', nav.getAttribute('role') || 'navigation');
  }

  /* ════════════════════════════════════════════════════════════════
     DEBUG PANEL  (?debugMenu=1)
  ════════════════════════════════════════════════════════════════ */
  function _initDebug() {
    if (!/[?&]debugMenu=1/.test(window.location.search || '')) return;

    var panel = document.createElement('div');
    panel.id = 'mnav-debug';
    panel.setAttribute('aria-hidden', 'true');

    function row(k, v, cls) {
      return '<div class="mdb-row">' +
        '<span class="mdb-key">' + k + '</span>' +
        '<span class="mdb-val ' + (cls || '') + '">' + v + '</span>' +
      '</div>';
    }

    function render() {
      var sc   = window.siteClient || {};
      var lang = document.documentElement.lang || 'en';
      panel.innerHTML =
        '<div class="mdb-title">📱 Menu Debug</div>' +
        row('device',   sc.deviceType || 'unknown') +
        row('orient',   _getOrientation()) +
        row('mode',     _isMobile() ? 'mobile' : 'desktop') +
        row('lang',     lang) +
        row('menu',     isOpen ? 'open'   : 'closed', isOpen        ? 'mdb-on' : 'mdb-off') +
        row('mobile',   _isMobile() ? 'yes' : 'no',   _isMobile()   ? 'mdb-on' : 'mdb-off') +
        row('isIOS',    sc.isIOS    ? 'yes' : 'no',   sc.isIOS      ? 'mdb-on' : 'mdb-off') +
        row('browser',  sc.browser  || 'unknown');
    }

    render();
    if (document.body) {
      document.body.appendChild(panel);
    }
    window.__mnavDebugRender = render;
  }

  function _updateDebug() {
    if (window.__mnavDebugRender) window.__mnavDebugRender();
  }

  /* ════════════════════════════════════════════════════════════════
     MAIN INIT
  ════════════════════════════════════════════════════════════════ */
  function init() {
    nav     = document.getElementById('main-nav')    || document.querySelector('.nav');
    toggle  = document.getElementById('nav-toggle')  || document.querySelector('.nav__toggle');
    menu    = document.getElementById('nav-menu')    || document.querySelector('.nav__menu');
    overlay = document.getElementById('nav-overlay') || document.querySelector('.nav__overlay');

    if (!nav || !toggle || !menu) return; /* fail gracefully on non-nav pages */

    /* Create overlay if HTML is missing it */
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id        = 'nav-overlay';
      overlay.className = 'nav__overlay';
      nav.appendChild(overlay);
    }

    _initA11y();
    _applyStaggerIndices();
    _updateDrawerPadding();
    _initDropdowns();
    _initLinkClose();
    _initKeyboard();
    _initDebug();

    /* ── Toggle: touchstart (iOS instant) + click (fallback) ── */
    var _touchFired = false;

    toggle.addEventListener('touchstart', function (e) {
      e.preventDefault();   /* prevents 300ms delay AND subsequent click */
      _touchFired = true;
      toggleMenu();
    }, { passive: false });

    toggle.addEventListener('click', function () {
      if (_touchFired) { _touchFired = false; return; } /* prevent double-fire */
      toggleMenu();
    });

    /* ── Overlay: tap or click to close ─────────────────────── */
    overlay.addEventListener('touchstart', function (e) {
      e.preventDefault();
      closeMenu();
    }, { passive: false });

    overlay.addEventListener('click', function () {
      closeMenu();
    });

    /* ── Resize & Orientation ────────────────────────────────── */
    var _resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(_resizeTimer);
      _resizeTimer = setTimeout(function () {
        _handleOrientationChange();
        if (isOpen) _updateDrawerPadding();
        if (!_isMobile() && isOpen) closeMenu(false);
        _updateDebug();
      }, 90);
    }, { passive: true });

    /* orientationchange fires BEFORE resize on iOS — wait for both */
    window.addEventListener('orientationchange', function () {
      setTimeout(_handleOrientationChange, 200);
    }, { passive: true });

    _updateDebug();
  }

  /* ── Boot ──────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
