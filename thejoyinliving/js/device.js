/**
 * device.js — Production-grade browser & device detection
 * Exposes window.siteClient with typed detection flags.
 *
 * Activate debug badge: append ?debugDevice=1 to any page URL.
 *
 * @site    The Joy In Living
 * @version 1.0.0
 */
(function (global) {
  'use strict';

  /* ════════════════════════════════════════════════════════════════
     RAW SIGNALS
     Collected once and frozen — avoids repeated UA parsing.
  ════════════════════════════════════════════════════════════════ */
  var nav      = global.navigator || {};
  var ua       = nav.userAgent    || '';
  var vendor   = nav.vendor       || '';
  var platform = nav.platform     || '';
  var maxTouch = nav.maxTouchPoints || 0;
  var UNKNOWN  = 'unknown';

  /* ════════════════════════════════════════════════════════════════
     OS DETECTION
     Ordered from most-specific to least-specific.
  ════════════════════════════════════════════════════════════════ */
  function detectOS() {
    // iPhone always self-identifies
    if (/iPhone/i.test(ua))  return 'iOS';

    // Classic iPad user-agent (iOS ≤ 12)
    if (/iPad/i.test(ua))    return 'iPadOS';

    // iPadOS 13+ requests desktop site by default:
    // platform reports "MacIntel" but touch points > 1 reveal the device.
    if (/Macintosh/i.test(ua) && /Mac/i.test(platform) && maxTouch > 1) {
      return 'iPadOS';
    }

    if (/Android/i.test(ua)) return 'Android';
    if (/CrOS/i.test(ua))    return 'ChromeOS';
    if (/Windows/i.test(ua)) return 'Windows';

    // macOS must come *after* iPadOS check (same platform string)
    if (/Mac/i.test(platform)) return 'macOS';
    if (/Linux/i.test(platform)) return 'Linux';

    return UNKNOWN;
  }

  /* ════════════════════════════════════════════════════════════════
     BROWSER DETECTION
     Order is critical — every Chromium derivative contains "Chrome".
     Check the specific tokens first; fall through to generic Chrome.
  ════════════════════════════════════════════════════════════════ */
  function detectBrowser() {
    // Samsung Internet — "SamsungBrowser/x.x" in UA
    if (/SamsungBrowser/i.test(ua)) return 'SamsungInternet';

    // DuckDuckGo — its own UA token
    if (/DuckDuckGo/i.test(ua)) return 'DuckDuckGo';

    // Opera modern (OPR/) or legacy (\bOpera\b)
    if (/OPR\//i.test(ua) || /\bOpera\b/i.test(ua)) return 'Opera';

    // Microsoft Edge (Chromium): desktop=Edg/, Android=EdgA/, iOS=EdgiOS/
    if (/\bEdg\/|\bEdgA\/|\bEdgiOS\//i.test(ua)) return 'Edge';

    // Chrome for iOS — uses WebKit but explicitly identifies as CriOS
    if (/\bCriOS\/\d/i.test(ua)) return 'Chrome';

    // Firefox for iOS — FxiOS
    if (/\bFxiOS\/\d/i.test(ua)) return 'Firefox';

    // Standard Firefox
    if (/\bFirefox\/\d/i.test(ua)) return 'Firefox';

    // Genuine Chromium/Chrome:
    // • Contains "Chrome/" AND vendor is "Google Inc."
    // • At this point Samsung, DuckDuckGo, Opera, and Edge are already handled
    if (/\bChrome\/\d/i.test(ua) && /Google Inc/i.test(vendor)) return 'Chrome';

    // Safari: Apple vendor + "Safari/" token, explicitly no Chrome/CriOS
    if (/\bSafari\/\d/i.test(ua) && /Apple/i.test(vendor) && !/\bChrome\/|\bCriOS\//i.test(ua)) {
      return 'Safari';
    }

    return UNKNOWN;
  }

  /* ════════════════════════════════════════════════════════════════
     DEVICE TYPE DETECTION
  ════════════════════════════════════════════════════════════════ */
  function detectDevice(os) {
    if (os === 'iOS')    return 'iPhone';
    if (os === 'iPadOS') return 'iPad';

    if (os === 'Android') {
      // Android tablets have a shorter edge >= 600 CSS px
      var shortEdge = global.screen
        ? Math.min(screen.width, screen.height)
        : 0;
      return shortEdge >= 600 ? 'AndroidTablet' : 'AndroidPhone';
    }

    return 'Desktop';
  }

  /* ════════════════════════════════════════════════════════════════
     ASSEMBLE FLAGS
  ════════════════════════════════════════════════════════════════ */
  var os         = detectOS();
  var browser    = detectBrowser();
  var deviceType = detectDevice(os);

  // Device booleans
  var isIPhone       = deviceType === 'iPhone';
  var isIPad         = deviceType === 'iPad';
  var isAndroidPhone = deviceType === 'AndroidPhone';
  var isAndroidTab   = deviceType === 'AndroidTablet';

  var isMobile  = isIPhone || isAndroidPhone;
  var isTablet  = isIPad   || isAndroidTab;
  var isDesktop = !isMobile && !isTablet;
  var isIOS     = isIPhone || isIPad;
  var isAndroid = isAndroidPhone || isAndroidTab;

  // Browser booleans
  var isSafari          = browser === 'Safari';
  var isChrome          = browser === 'Chrome';
  var isFirefox         = browser === 'Firefox';
  var isEdge            = browser === 'Edge';
  var isOpera           = browser === 'Opera';
  var isDuckDuckGo      = browser === 'DuckDuckGo';
  var isSamsungInternet = browser === 'SamsungInternet';

  /* ════════════════════════════════════════════════════════════════
     GLOBAL EXPORT  →  window.siteClient
  ════════════════════════════════════════════════════════════════ */
  global.siteClient = Object.freeze({
    // Descriptive strings (use for display / analytics)
    os:           os,
    browser:      browser,
    deviceType:   deviceType,

    // Device booleans
    isMobile:          isMobile,
    isTablet:          isTablet,
    isDesktop:         isDesktop,
    isIOS:             isIOS,
    isAndroid:         isAndroid,
    isIPhone:          isIPhone,
    isIPad:            isIPad,

    // Browser booleans
    isSafari:          isSafari,
    isChrome:          isChrome,
    isFirefox:         isFirefox,
    isEdge:            isEdge,
    isOpera:           isOpera,
    isDuckDuckGo:      isDuckDuckGo,
    isSamsungInternet: isSamsungInternet,

    // Raw signals (advanced debugging)
    _ua:       ua,
    _vendor:   vendor,
    _platform: platform,
    _maxTouch: maxTouch,
  });

  /* ════════════════════════════════════════════════════════════════
     DATA ATTRIBUTES ON <HTML>
     Allows pure CSS targeting without querying window.siteClient.

     Usage examples:
       html[data-os="ios"] a[href^="tel:"] { ... }
       html.is-mobile .desktop-only          { display: none; }
  ════════════════════════════════════════════════════════════════ */
  var html = document.documentElement;
  html.setAttribute('data-os',      os.toLowerCase().replace(/\s/g, '-'));
  html.setAttribute('data-browser', browser.toLowerCase());
  html.setAttribute('data-device',  deviceType.toLowerCase());

  if (isMobile)  html.classList.add('is-mobile');
  if (isTablet)  html.classList.add('is-tablet');
  if (isDesktop) html.classList.add('is-desktop');
  if (isIOS)     html.classList.add('is-ios');
  if (isAndroid) html.classList.add('is-android');
  if (isSafari)  html.classList.add('is-safari');
  if (isChrome)  html.classList.add('is-chrome');
  if (isEdge)    html.classList.add('is-edge');

  /* ════════════════════════════════════════════════════════════════
     DEVICE ADAPTATIONS  (runs after DOM is ready)
  ════════════════════════════════════════════════════════════════ */
  function applyAdaptations() {

    /* ── 1. Dynamic CTA text: mobile vs desktop ────────────────────
       Mark any element with data-cta-mobile / data-cta-desktop.
       The visible text node is updated; aria-label tracks together.

       Example markup:
         <a href="tel:9146862484"
            class="btn btn-accent"
            data-cta-mobile="Call Us Now"
            data-cta-desktop="Make An Appointment">
           Make An Appointment
         </a>
    ─────────────────────────────────────────────────────────────── */
    document.querySelectorAll('[data-cta-mobile]').forEach(function (el) {
      var mobile  = el.getAttribute('data-cta-mobile');
      var desktop = el.getAttribute('data-cta-desktop') || el.textContent.trim();

      // Find the deepest text-only span if one exists, else update el directly
      var target = el.querySelector('.cta-label') || el;

      if (isMobile) {
        target.textContent = mobile;
        el.setAttribute('aria-label', mobile);
      } else {
        target.textContent = desktop;
        el.setAttribute('aria-label', desktop);
      }
    });

    /* ── 2. Tap-to-call prominence on phones ───────────────────────
       Adds .tap-to-call — CSS in components.css handles visual treatment.
       All tel: links get an aria-label upgrade so screen readers announce
       the action clearly on touch devices.
    ─────────────────────────────────────────────────────────────── */
    if (isMobile) {
      document.querySelectorAll('a[href^="tel:"]').forEach(function (el) {
        el.classList.add('tap-to-call');
        if (!el.getAttribute('aria-label')) {
          el.setAttribute('aria-label', 'Tap to call ' + el.textContent.trim());
        }
      });
    }

    /* ── 3. Platform-native map links ─────────────────────────────
       Mark any map anchor with data-maps-link.
       iOS  → maps:// (opens Apple Maps natively)
       Android → geo: (opens Google Maps or default map app)
       Desktop → Google Maps web fallback (href left as-is if already set)

       Example markup:
         <a href="https://maps.google.com/?q=..."
            data-maps-link
            target="_blank">Get Directions</a>
    ─────────────────────────────────────────────────────────────── */
    var practiceAddress = '239 North Broadway Suite LL 101, Sleepy Hollow, NY 10591';
    var encodedAddress  = encodeURIComponent(practiceAddress);

    document.querySelectorAll('[data-maps-link]').forEach(function (el) {
      if (isIOS) {
        el.href = 'maps://maps.apple.com/?q=' + encodedAddress;
        el.removeAttribute('target'); // Open in Maps app, not new tab
      } else if (isAndroid) {
        el.href = 'geo:0,0?q=' + encodedAddress;
        el.removeAttribute('target');
      }
      // Desktop: keep whatever href was set in the HTML
    });

    /* ── 4. iOS WebKit: force hardware-accelerated scroll on panels ─
       Older WebKit needs the inline style in addition to CSS.
    ─────────────────────────────────────────────────────────────── */
    if (isIOS) {
      document.querySelectorAll('.nav__menu, [data-scroll-ios]').forEach(function (el) {
        el.style.webkitOverflowScrolling = 'touch';
      });
    }
  }

  // Safely defer until DOM is available
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyAdaptations);
  } else {
    applyAdaptations();
  }

  /* ════════════════════════════════════════════════════════════════
     OPTIONAL DEBUG BADGE
     Activate by appending ?debugDevice=1 to any page URL.
     Never visible in production (no URL param = no DOM node).
  ════════════════════════════════════════════════════════════════ */
  function initDebugBadge() {
    var search = (global.location && global.location.search) || '';
    if (!/[?&]debugDevice=1/.test(search)) return;

    function renderBadge() {
      if (document.getElementById('site-debug-badge')) return;

      var rows = [
        ['OS',            os],
        ['Browser',       browser],
        ['Device Type',   deviceType],
        ['isMobile',      isMobile],
        ['isTablet',      isTablet],
        ['isDesktop',     isDesktop],
        ['isIOS',         isIOS],
        ['isAndroid',     isAndroid],
        ['isSafari',      isSafari],
        ['isChrome',      isChrome],
        ['isFirefox',     isFirefox],
        ['isEdge',        isEdge],
        ['isOpera',       isOpera],
        ['isDuckDuckGo',  isDuckDuckGo],
        ['isSamsung',     isSamsungInternet],
        ['maxTouchPts',   maxTouch],
        ['platform',      platform || UNKNOWN],
      ];

      var rowsHTML = rows.map(function (r) {
        var val    = String(r[1]);
        var isTrue = val === 'true';
        var valClass = isTrue ? 'sdb-yes' : (val === 'false' ? 'sdb-no' : '');
        return (
          '<div class="sdb-row">' +
            '<span class="sdb-key">' + r[0] + '</span>' +
            '<strong class="sdb-val ' + valClass + '">' + val + '</strong>' +
          '</div>'
        );
      }).join('');

      var badge = document.createElement('div');
      badge.id = 'site-debug-badge';
      badge.setAttribute('role', 'complementary');
      badge.setAttribute('aria-label', 'Device debug information');
      badge.innerHTML = (
        '<div class="sdb-header">' +
          '<span class="sdb-icon">🔍</span>' +
          '<span class="sdb-title">Device Debug</span>' +
          '<button class="sdb-close" aria-label="Close debug badge" ' +
            'onclick="this.closest(\'#site-debug-badge\').remove()">✕</button>' +
        '</div>' +
        '<div class="sdb-body">' + rowsHTML + '</div>' +
        '<div class="sdb-footer">window.siteClient</div>'
      );
      document.body.appendChild(badge);
    }

    if (document.body) {
      renderBadge();
    } else {
      document.addEventListener('DOMContentLoaded', renderBadge);
    }
  }

  initDebugBadge();

}(window));
