/* =============================================
   TRADE TO WEALTH MASTERCLASS
   Main JavaScript — Interactions & Animations
   ============================================= */

'use strict';

// ── NAVBAR ──────────────────────────────────
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('nav-mobile-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile menu on nav link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });

  // Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    }
  });
})();

// ── SCROLL REVEAL ───────────────────────────
(function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
})();

// ── HERO LOAD ───────────────────────────────
(function initHero() {
  const hero = document.querySelector('.hero');
  if (hero) {
    setTimeout(() => hero.classList.add('loaded'), 100);
  }
})();

// ── COUNTDOWN TIMER ─────────────────────────
(function initCountdown() {
  const cdDays  = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMins  = document.getElementById('cd-mins');
  const cdSecs  = document.getElementById('cd-secs');

  if (!cdDays) return;

  // Set target: next upcoming Sunday at 8pm EST
  function getNextEventDate() {
    const now = new Date();
    const target = new Date();

    // Set to next occurrence of Saturday (day 6)
    const dayOfWeek = target.getDay();
    const daysUntilSat = (6 - dayOfWeek + 7) % 7 || 7;
    target.setDate(target.getDate() + daysUntilSat);
    target.setHours(20, 0, 0, 0); // 8 PM

    // Convert to EST (UTC-5)
    const estOffset = 5 * 60 * 60 * 1000;
    return new Date(target.getTime() + estOffset);
  }

  const eventDate = getNextEventDate();

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const now  = new Date();
    const diff = eventDate - now;

    if (diff <= 0) {
      cdDays.textContent  = '00';
      cdHours.textContent = '00';
      cdMins.textContent  = '00';
      cdSecs.textContent  = '00';
      return;
    }

    const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs  = Math.floor((diff % (1000 * 60)) / 1000);

    cdDays.textContent  = pad(days);
    cdHours.textContent = pad(hours);
    cdMins.textContent  = pad(mins);
    cdSecs.textContent  = pad(secs);
  }

  tick();
  setInterval(tick, 1000);
})();

// ── ANIMATED STAT COUNTERS ──────────────────
(function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 2000;
    const start = performance.now();

    function step(ts) {
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(ease * target);

      el.textContent = current >= 1000
        ? (current >= 1000 ? (current / 1000).toFixed(current % 1000 === 0 ? 0 : 1) + 'K' : current.toLocaleString())
        : current;

      if (target >= 1000) {
        el.textContent = Math.floor(ease * target / 1000 * 10) / 10 + 'K';
      } else {
        el.textContent = Math.floor(ease * target);
      }

      if (progress < 1) requestAnimationFrame(step);
      else {
        el.textContent = target >= 1000 ? (target / 1000) + 'K' : target;
      }
    }

    requestAnimationFrame(step);
  }

  function animateBars() {
    document.querySelectorAll('.stat-bar-fill, .prob-bar-fill').forEach(bar => {
      bar.classList.add('animated');
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(animateCounter);
        animateBars();
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('about');
  if (statsSection) observer.observe(statsSection);
})();

// ── FAQ ACCORDION ───────────────────────────
(function initFAQ() {
  const questions = document.querySelectorAll('.faq-question');

  questions.forEach(btn => {
    btn.addEventListener('click', () => {
      const answerId = btn.getAttribute('aria-controls');
      const answer   = document.getElementById(answerId);
      const isOpen   = btn.getAttribute('aria-expanded') === 'true';

      // Close all others
      questions.forEach(other => {
        if (other !== btn) {
          other.setAttribute('aria-expanded', 'false');
          const otherAnswer = document.getElementById(other.getAttribute('aria-controls'));
          if (otherAnswer) {
            otherAnswer.classList.remove('open');
            otherAnswer.hidden = true;
          }
        }
      });

      // Toggle current
      btn.setAttribute('aria-expanded', !isOpen);
      if (answer) {
        if (!isOpen) {
          answer.hidden = false;
          requestAnimationFrame(() => answer.classList.add('open'));
        } else {
          answer.classList.remove('open');
          setTimeout(() => { answer.hidden = true; }, 400);
        }
      }
    });
  });
})();

// ── HERO PARTICLES ──────────────────────────
(function initParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;

  const count = window.innerWidth < 768 ? 12 : 24;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';

    const size = Math.random() * 3 + 1;
    const isGold = Math.random() > 0.6;

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      top: ${30 + Math.random() * 60}%;
      background: ${isGold ? '#dac157' : 'rgba(255,255,255,0.6)'};
      --duration: ${6 + Math.random() * 8}s;
      --delay: ${Math.random() * 6}s;
      --max-opacity: ${0.2 + Math.random() * 0.4};
      --drift: ${(Math.random() - 0.5) * 40}px;
    `;

    container.appendChild(p);
  }
})();

// ── SCROLL TO TOP ────────────────────────────
(function initScrollTop() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.style.display = window.scrollY > 600 ? 'flex' : 'none';
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ── VIDEO THUMBNAIL KEYBOARD ─────────────────
(function initVideoKeyboard() {
  document.querySelectorAll('.video-thumbnail, .vt-thumbnail, .video-testimonial-card').forEach(el => {
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.click();
      }
    });
  });
})();

// ── SMOOTH SCROLL FOR ANCHOR LINKS ──────────
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = document.getElementById('navbar')?.offsetHeight || 80;
        const top  = target.getBoundingClientRect().top + window.scrollY - navH - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
})();

// ── CUSTOM REGISTRATION FORMS ────────────────
(function initRegForms() {
  const LEADS_KEY = 'ttw_leads';

  function saveLead(lead) {
    let leads = [];
    try { leads = JSON.parse(localStorage.getItem(LEADS_KEY) || '[]'); } catch {}
    lead.id = Date.now().toString(36) + Math.random().toString(36).slice(2,6);
    lead.timestamp = new Date().toISOString();
    leads.push(lead);
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
    return lead;
  }

  function showError(errEl, msg) {
    errEl.textContent = msg;
    errEl.classList.add('visible');
  }
  function clearError(errEl) {
    errEl.textContent = '';
    errEl.classList.remove('visible');
  }
  function setLoading(btn, loading) {
    btn.querySelector('.ttw-submit-text').style.display = loading ? 'none' : '';
    btn.querySelector('.ttw-submit-loading').style.display = loading ? 'flex' : 'none';
    btn.disabled = loading;
  }

  // ── PRIMARY RESERVE FORM ──
  const reserveForm = document.getElementById('ttw-reserve-form');
  if (reserveForm) {
    reserveForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const errEl  = document.getElementById('reg-error');
      const btn    = document.getElementById('reg-submit-btn');
      const first  = document.getElementById('reg-first-name').value.trim();
      const last   = document.getElementById('reg-last-name').value.trim();
      const email  = document.getElementById('reg-email').value.trim();
      const phone  = document.getElementById('reg-phone').value.trim();
      const goal   = document.getElementById('reg-goal').value;
      const consent = document.getElementById('reg-consent').checked;

      clearError(errEl);

      if (!first)                           return showError(errEl, 'Please enter your first name.');
      if (!last)                            return showError(errEl, 'Please enter your last name.');
      if (!email || !/\S+@\S+\.\S+/.test(email)) return showError(errEl, 'Please enter a valid email address.');
      if (!phone)                           return showError(errEl, 'Please enter your phone number.');
      if (!goal)                            return showError(errEl, 'Please select your primary goal.');
      if (!consent)                         return showError(errEl, 'Please check the consent box to continue.');

      setLoading(btn, true);
      setTimeout(function() {
        saveLead({ name: first + ' ' + last, email, phone, goal, consent: true, source: document.referrer || 'direct', formId: 'reserve' });
        reserveForm.style.display = 'none';
        document.getElementById('reg-success').style.display = 'block';
      }, 900);
    });
  }

  // ── SECONDARY INFO FORM ──
  const infoForm = document.getElementById('ttw-info-form');
  if (infoForm) {
    infoForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const errEl  = document.getElementById('info-error');
      const btn    = document.getElementById('info-submit-btn');
      const first  = document.getElementById('info-first-name').value.trim();
      const email  = document.getElementById('info-email').value.trim();
      const last   = document.getElementById('info-last-name')?.value.trim() || '';
      const phone  = document.getElementById('info-phone')?.value.trim() || '';

      clearError(errEl);

      if (!first)                              return showError(errEl, 'Please enter your first name.');
      if (!email || !/\S+@\S+\.\S+/.test(email)) return showError(errEl, 'Please enter a valid email address.');

      setLoading(btn, true);
      setTimeout(function() {
        saveLead({ name: (first + ' ' + last).trim(), email, phone, goal: 'info-request', consent: true, source: document.referrer || 'direct', formId: 'info' });
        infoForm.style.display = 'none';
        document.getElementById('info-success').style.display = 'block';
      }, 900);
    });
  }
})();
