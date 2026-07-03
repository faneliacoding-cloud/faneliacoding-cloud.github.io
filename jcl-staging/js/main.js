/* ═══════════════════════════════════════════════════════════════════
   JCL STAGING & DESIGN — LUXURY INTERACTION ENGINE
   Navigation · Hero · Counters · Slider · Portfolio · Testimonials
   FAQ · Concierge (Olivia) · Forms · Scroll Reveals · Parallax
═══════════════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  /* ─── UTILITY ──────────────────────────────────────────────────── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const on = (el, ev, fn, opts) => el && el.addEventListener(ev, fn, opts);
  const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

  /* ─── ANNOUNCEMENT BAR ─────────────────────────────────────────── */
  function initAnnouncement() {
    const messages = [
      'New York\'s Premier Luxury Staging Studio &nbsp;·&nbsp; Est. 2017 &nbsp;·&nbsp; <span class="ann-sep">◆</span>&nbsp; Serving NY · NJ · CT',
      'Staging That Sells &nbsp;·&nbsp; 97% of Listings Sell Above Asking Price &nbsp;·&nbsp; <span class="ann-sep">◆</span>&nbsp; Schedule Your Consultation',
      'Trusted by Douglas Elliman · Compass · Sotheby\'s &nbsp;·&nbsp; <span class="ann-sep">◆</span>&nbsp; Julia &amp; Alfredo Linares'
    ];
    const el = $('.announcement-text');
    if (!el) return;
    let i = 0;
    el.innerHTML = messages[0];
    setInterval(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(-6px)';
      setTimeout(() => {
        i = (i + 1) % messages.length;
        el.innerHTML = messages[i];
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 400);
    }, 5000);
  }

  /* ─── NAVIGATION ───────────────────────────────────────────────── */
  function initNav() {
    const header = $('#siteHeader');
    const hamburger = $('#hamburger');
    const mobileNav = $('#mobileNav');
    const mobileClose = $('#mobileClose');
    const annBar = $('.announcement-bar');
    let lastScroll = 0;
    let ticking = false;

    function updateHeader() {
      const scroll = window.scrollY;
      if (scroll > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = scroll;
      ticking = false;
    }

    on(window, 'scroll', () => {
      if (!ticking) { requestAnimationFrame(updateHeader); ticking = true; }
    }, { passive: true });

    updateHeader();

    function openMobile() {
      mobileNav.classList.add('open');
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    function closeMobile() {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    on(hamburger, 'click', openMobile);
    on(mobileClose, 'click', closeMobile);

    // Close on nav link click
    $$('.mnav-link', mobileNav).forEach(link => {
      on(link, 'click', closeMobile);
    });

    // Close on Escape
    on(document, 'keydown', e => { if (e.key === 'Escape') closeMobile(); });

    // Active state on scroll
    const sections = $$('section[id]');
    const navLinks = $$('.main-nav a');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { threshold: 0.4 });
    sections.forEach(s => observer.observe(s));
  }

  /* ─── HERO ANIMATIONS ──────────────────────────────────────────── */
  function initHero() {
    const img = $('.hero-img');
    if (img) {
      img.addEventListener('load', () => img.classList.add('loaded'));
      if (img.complete) img.classList.add('loaded');
    }

    // Wrap h-line text in inner spans
    $$('.h-line').forEach(line => {
      const text = line.innerHTML;
      line.innerHTML = `<span class="h-line-inner">${text}</span>`;
    });

    // Staggered reveal on load
    requestAnimationFrame(() => {
      setTimeout(() => {
        $$('.h-line-inner').forEach((el, i) => {
          setTimeout(() => el.classList.add('revealed'), i * 120);
        });
      }, 200);

      setTimeout(() => $('.hero-eyebrow')?.classList.add('revealed'), 300);
      setTimeout(() => $('.hero-sub')?.classList.add('revealed'), 1100);
      setTimeout(() => $('.hero-btns')?.classList.add('revealed'), 1400);
      setTimeout(() => $('.hero-stats')?.classList.add('revealed'), 1700);
      setTimeout(() => $('.hero-scroll')?.classList.add('revealed'), 2000);
    });
  }

  /* ─── SCROLL REVEAL ────────────────────────────────────────────── */
  function initScrollReveal() {
    const revealEls = $$('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (!revealEls.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  }

  /* ─── COUNTER ANIMATIONS ────────────────────────────────────────── */
  function initCounters() {
    const counters = $$('.count-up');
    if (!counters.length) return;

    const ease = t => t < 0.5 ? 2*t*t : -1+(4-2*t)*t;

    function animateCounter(el) {
      const target = parseFloat(el.dataset.target);
      const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
      const duration = 2200;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = clamp(elapsed / duration, 0, 1);
        const value = ease(progress) * target;
        el.textContent = decimals ? value.toFixed(decimals) : Math.floor(value).toLocaleString();
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = decimals ? target.toFixed(decimals) : target.toLocaleString();
      }
      requestAnimationFrame(update);
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }

  /* ─── BEFORE/AFTER SLIDER ──────────────────────────────────────── */
  function initSlider(container) {
    if (!container) return;
    const afterEl = $('.ba-after', container);
    const divider = $('.ba-divider', container);
    let isDragging = false;
    let position = 50;

    function setPosition(pct) {
      position = clamp(pct, 2, 98);
      afterEl.style.clipPath = `inset(0 ${100 - position}% 0 0)`;
      divider.style.left = `${position}%`;
    }

    function getPosition(clientX) {
      const rect = container.getBoundingClientRect();
      return ((clientX - rect.left) / rect.width) * 100;
    }

    // Mouse events
    on(container, 'mousedown', e => {
      isDragging = true;
      afterEl.classList.add('dragging');
      setPosition(getPosition(e.clientX));
    });
    on(document, 'mousemove', e => {
      if (isDragging) setPosition(getPosition(e.clientX));
    });
    on(document, 'mouseup', () => {
      isDragging = false;
      afterEl?.classList.remove('dragging');
    });

    // Touch events
    on(container, 'touchstart', e => {
      isDragging = true;
      afterEl.classList.add('dragging');
      setPosition(getPosition(e.touches[0].clientX));
    }, { passive: true });
    on(document, 'touchmove', e => {
      if (isDragging) setPosition(getPosition(e.touches[0].clientX));
    }, { passive: true });
    on(document, 'touchend', () => {
      isDragging = false;
      afterEl?.classList.remove('dragging');
    });

    setPosition(50);
    return { setPosition };
  }

  function initBeforeAfter() {
    const primaryContainer = $('#baContainer1');
    const sliderInstance = initSlider(primaryContainer);

    // Tabs
    const tabs = $$('.ba-tab');
    const datasets = [
      {
        before: 'images/before-living.png',
        after: 'images/after-living.png',
        beforeAlt: 'Before staging — living room',
        afterAlt: 'After staging — luxury living room transformation'
      },
      {
        before: 'images/before-after-bedroom.png',
        after: 'images/model-home.jpg',
        beforeAlt: 'Before staging — bedroom',
        afterAlt: 'After staging — luxury bedroom transformation'
      }
    ];

    tabs.forEach((tab, i) => {
      on(tab, 'click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        if (primaryContainer && datasets[i]) {
          const beforeImg = $('.ba-before img', primaryContainer);
          const afterImg = $('.ba-after img', primaryContainer);
          if (beforeImg) { beforeImg.src = datasets[i].before; beforeImg.alt = datasets[i].beforeAlt; }
          if (afterImg) { afterImg.src = datasets[i].after; afterImg.alt = datasets[i].afterAlt; }
          sliderInstance?.setPosition(50);
        }
      });
    });

    // Fullscreen
    const fullscreenBtn = $('.ba-fullscreen-btn', primaryContainer);
    const fullscreenOverlay = $('#baFullscreen');
    const fullscreenClose = $('#baFullscreenClose');
    const fullscreenContainer = $('#baContainerFull');
    const fullSliderInstance = initSlider(fullscreenContainer);

    on(fullscreenBtn, 'click', () => {
      fullscreenOverlay?.classList.add('open');
      document.body.style.overflow = 'hidden';
      fullSliderInstance?.setPosition(50);
      // Sync images
      if (primaryContainer && fullscreenContainer) {
        const beforeImg = $('.ba-before img', primaryContainer);
        const afterImg = $('.ba-after img', primaryContainer);
        const fullBefore = $('.ba-before img', fullscreenContainer);
        const fullAfter = $('.ba-after img', fullscreenContainer);
        if (fullBefore && beforeImg) { fullBefore.src = beforeImg.src; fullBefore.alt = beforeImg.alt; }
        if (fullAfter && afterImg) { fullAfter.src = afterImg.src; fullAfter.alt = afterImg.alt; }
      }
    });
    on(fullscreenClose, 'click', () => {
      fullscreenOverlay?.classList.remove('open');
      document.body.style.overflow = '';
    });
    on(document, 'keydown', e => {
      if (e.key === 'Escape' && fullscreenOverlay?.classList.contains('open')) {
        fullscreenOverlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ─── PORTFOLIO MODAL ──────────────────────────────────────────── */
  function initPortfolio() {
    const portfolioData = [
      {
        tag: 'Featured Estate',
        title: 'Park Avenue Penthouse',
        img: 'images/luxury-living-2.jpg',
        story: `A landmark property on one of Manhattan's most prestigious addresses arrived as an elegantly appointed but emotionally disconnected space. The owners needed it to speak to today's most discerning buyers — those who expect not just square footage, but a feeling.`,
        vision: `We conceived an interior narrative rooted in warmth and restraint. Every piece selected, every surface styled, was chosen to make the space feel simultaneously grand and intimate — the way the finest Aman Resort suites feel: vast, yet personal.`,
        outcome: `Sold in 11 days. Closed at $4.2M — significantly above the initial asking price. Three competing offers were received within 72 hours of listing.`,
        stats: [{ value: '$4.2M', label: 'Sale Price' }, { value: '11', label: 'Days on Market' }, { value: '3', label: 'Competing Offers' }]
      },
      {
        tag: 'Residential',
        title: 'Upper West Side Townhouse',
        img: 'images/dining-room.png',
        story: `A pre-war Upper West Side townhouse — rich in architectural detail but dormant in energy. The challenge was to celebrate its heritage while making it feel newly relevant to a modern luxury buyer.`,
        vision: `We layered contemporary furnishings against original millwork and period detailing, creating a dialogue between past and present. Natural materials — linen, stone, aged brass — served as the bridge.`,
        outcome: `Sold above asking in a single weekend. Multiple broker showings praised the staging as the finest they had experienced in the building's recent history.`,
        stats: [{ value: '$2.8M', label: 'Sale Price' }, { value: 'Weekend', label: 'Time to Offer' }, { value: '21%', label: 'Above Initial Ask' }]
      },
      {
        tag: 'Kitchen & Living',
        title: 'Brooklyn Heights Residence',
        img: 'images/kitchen.png',
        story: `A newly renovated Brooklyn Heights home with stunning proportions but a blank-canvas challenge — the developer needed buyers to immediately envision life within its walls.`,
        vision: `A curated lifestyle was assembled room by room: chef's kitchen styled as a place for Sunday morning rituals, living spaces that suggested evening gatherings of interesting people.`,
        outcome: `Sold at $1.6M, outperforming comparable units in the building by 12%.`,
        stats: [{ value: '$1.6M', label: 'Sale Price' }, { value: '14', label: 'Days on Market' }, { value: '12%', label: 'Above Comps' }]
      },
      {
        tag: 'Full Staging',
        title: 'Tribeca Loft',
        img: 'images/after-living.png',
        story: `An iconic Tribeca loft — soaring ceilings, cast iron columns, original hardwood floors — arrived empty and silent. The opportunity: to fill it with a vision that honored the architecture while making it unmistakably livable.`,
        vision: `We chose oversized pieces scaled to the volume, warm neutrals to soften the industrial bones, and an art program that felt curated over decades rather than purchased at once.`,
        outcome: `Multiple offers received within 48 hours. Sold at $3.1M with a bidding situation that exceeded seller expectations.`,
        stats: [{ value: '$3.1M', label: 'Sale Price' }, { value: '48hrs', label: 'First Offers' }, { value: '5', label: 'Offers Received' }]
      },
      {
        tag: 'Commercial · Hospitality',
        title: 'SoHo Commercial — Now or Never Coffee',
        img: 'images/founders.png',
        story: `A beloved SoHo café required an interior identity that would transcend the typical coffee shop and feel like an experience — a destination that guests would return to for the feeling as much as the coffee.`,
        vision: `Drawing on our residential staging expertise, we approached the commercial space as we would a luxury home: with intimacy, intention, and careful attention to material texture and human scale.`,
        outcome: `Now or Never Coffee became a neighborhood fixture beloved by locals and press alike. Featured in several New York lifestyle publications.`,
        stats: [{ value: 'SoHo', label: 'Location' }, { value: 'Commercial', label: 'Category' }, { value: 'Published', label: 'Press Coverage' }]
      }
    ];

    const items = $$('.portfolio-item');
    const modal = $('#portfolioModal');
    const backdrop = $('.modal-backdrop', modal);
    const closeBtn = $('.modal-close', modal);

    function openModal(data) {
      if (!modal) return;
      const img = $('.modal-header-img img', modal);
      const tag = $('.modal-tag', modal);
      const title = $('.modal-title', modal);
      const story = $('#modalStory', modal);
      const vision = $('#modalVision', modal);
      const outcome = $('#modalOutcome', modal);
      const statsEl = $('.modal-stats', modal);

      if (img) { img.src = data.img; img.alt = data.title; }
      if (tag) tag.textContent = data.tag;
      if (title) title.textContent = data.title;
      if (story) story.textContent = data.story;
      if (vision) vision.textContent = data.vision;
      if (outcome) outcome.textContent = data.outcome;
      if (statsEl) {
        statsEl.innerHTML = data.stats.map(s =>
          `<div class="modal-stat"><span class="modal-stat-value">${s.value}</span><span class="modal-stat-label">${s.label}</span></div>`
        ).join('');
      }

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal?.classList.remove('open');
      document.body.style.overflow = '';
    }

    items.forEach((item, i) => {
      on(item, 'click', () => openModal(portfolioData[i] || portfolioData[0]));
      on(item, 'keydown', e => { if (e.key === 'Enter') openModal(portfolioData[i] || portfolioData[0]); });
    });

    on(closeBtn, 'click', closeModal);
    on(backdrop, 'click', closeModal);
    on(document, 'keydown', e => { if (e.key === 'Escape' && modal?.classList.contains('open')) closeModal(); });
  }

  /* ─── TESTIMONIALS CAROUSEL ───────────────────────────────────── */
  function initTestimonials() {
    const track = $('.testimonial-track');
    if (!track) return;
    const slides = $$('.testimonial-slide');
    const dots = $$('.t-dot');
    const prevBtn = $('#tPrev');
    const nextBtn = $('#tNext');
    let current = 0;
    let autoInterval;

    function goTo(idx) {
      current = (idx + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startAuto() { autoInterval = setInterval(next, 5500); }
    function stopAuto() { clearInterval(autoInterval); }

    on(nextBtn, 'click', () => { next(); stopAuto(); startAuto(); });
    on(prevBtn, 'click', () => { prev(); stopAuto(); startAuto(); });
    dots.forEach((dot, i) => {
      on(dot, 'click', () => { goTo(i); stopAuto(); startAuto(); });
    });

    // Touch swipe
    let touchStartX = 0;
    on(track, 'touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    on(track, 'touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); stopAuto(); startAuto(); }
    });

    goTo(0);
    startAuto();
  }

  /* ─── FAQ ACCORDION ────────────────────────────────────────────── */
  function initFAQ() {
    $$('.faq-item').forEach(item => {
      const btn = $('.faq-question', item);
      const answer = $('.faq-answer', item);
      const inner = $('.faq-answer-inner', item);
      if (!btn || !answer || !inner) return;

      on(btn, 'click', () => {
        const isOpen = item.classList.contains('open');
        // Close all
        $$('.faq-item.open').forEach(openItem => {
          openItem.classList.remove('open');
          $('.faq-answer', openItem).style.height = '0';
          $('.faq-question', openItem).setAttribute('aria-expanded', 'false');
        });
        // Open clicked
        if (!isOpen) {
          item.classList.add('open');
          answer.style.height = inner.scrollHeight + 'px';
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ─── CONTACT FORM ─────────────────────────────────────────────── */
  function initForm() {
    const form = $('#consultationForm');
    if (!form) return;

    on(form, 'submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      const successEl = $('#formSuccess');

      btn.classList.add('loading');
      btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> Sending…';

      // Simulate form submission
      await new Promise(r => setTimeout(r, 1800));

      form.style.display = 'none';
      if (successEl) successEl.classList.add('show');
    });
  }

  /* ─── PARALLAX ─────────────────────────────────────────────────── */
  function initParallax() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const heroImg = $('.hero-img');
    const mouseTolerance = 20;

    on(document, 'mousemove', debounce(e => {
      const x = (e.clientX / window.innerWidth - 0.5) * mouseTolerance;
      const y = (e.clientY / window.innerHeight - 0.5) * mouseTolerance;
      if (heroImg) {
        heroImg.style.transform = `scale(1.05) translate(${x * 0.3}px, ${y * 0.3}px)`;
      }
    }, 16));
  }

  /* ─── OLIVIA — AI DESIGN CONCIERGE ────────────────────────────── */
  function initOlivia() {
    const trigger = $('#conciergeTrigger');
    const btn = $('#conciergeBtn');
    const window_ = $('#conciergeWindow');
    const closeBtn = $('#conciergeClose');
    const messages = $('#conciergeMessages');
    const input = $('#conciergeInput');
    const sendBtn = $('#conciergeSend');
    const voiceBtn = $('#conciergeVoice');
    const quickReplies = $('#conciergeQuickReplies');
    const label = $('.concierge-label');

    if (!window_ || !messages) return;

    let isOpen = false;
    let isTyping = false;
    let conversationState = {
      greeted: false,
      userType: null,        // 'seller', 'realtor', 'designer', 'builder', 'buyer'
      serviceInterest: null,
      askedBudget: false,
      askedTimeline: false,
      askedLocation: false,
      messageCount: 0,
    };

    // Load state from session
    try {
      const saved = sessionStorage.getItem('olivia_state');
      if (saved) conversationState = JSON.parse(saved);
    } catch(e) {}

    function saveState() {
      try { sessionStorage.setItem('olivia_state', JSON.stringify(conversationState)); } catch(e) {}
    }

    // ── Response Engine ────────────────────────────────────────────
    const responseMap = [
      {
        patterns: ['hello', 'hi ', 'hey ', 'good morning', 'good evening', 'good afternoon', 'hola'],
        responses: [
          "What a lovely time to connect. How can I make this visit exceptional for you today?",
          "It's wonderful to have you here. Tell me — what brings you to JCL today?"
        ]
      },
      {
        patterns: ['sell', 'listing', 'selling my home', 'put on market', 'real estate', 'list my'],
        userType: 'seller',
        responses: [
          "Helping sellers is what we live for — and the results speak beautifully for themselves. 97% of our staged properties sell above asking. Can you tell me a bit about your home? Size, neighborhood, and timeline are a great start.",
          "Preparing a home for sale is one of the most impactful decisions you'll make. Our full staging service transforms properties in ways that consistently generate multiple offers. Where is your home located, and when are you hoping to list?"
        ]
      },
      {
        patterns: ['realtor', 'broker', 'agent', 'real estate agent', 'compass', 'elliman', 'sotheby'],
        userType: 'realtor',
        responses: [
          "We love working with top agents — many of our most beautiful transformations have come through partnerships with Compass and Douglas Elliman. Do you have a listing you're preparing, or are you exploring a longer-term referral partnership?",
          "Realtors are among our most valued partners. We understand the pressure of listings and the enormous impact staging has on both speed and price. What can I help you with today?"
        ]
      },
      {
        patterns: ['interior design', 'design my home', 'interior designer', 'redesign', 'decoration'],
        serviceInterest: 'interior-design',
        responses: [
          "Interior design is one of our most personal offerings — Julia brings an editorial eye shaped by years in media and a genuine love of beautiful spaces. This service is about creating a home that reflects your life at its very best. Are you redesigning a primary residence or investment property?",
          "Julia's interior design work goes far beyond furniture selection. It's a holistic vision — materials, art, lighting, proportion. Tell me about your space and what's prompting the project."
        ]
      },
      {
        patterns: ['staging', 'stage my', 'home staging', 'property staging'],
        serviceInterest: 'staging',
        responses: [
          "Home staging is our signature — and the returns are remarkable. On average, our clients see a 21% premium over un-staged comparable properties. Are you preparing to list, or exploring options for the future?",
          "Staging is both science and art. We analyze what today's buyers in your market are responding to, then we create exactly that feeling. What kind of property are we discussing?"
        ]
      },
      {
        patterns: ['price', 'pricing', 'cost', 'how much', 'quote', 'fee', 'budget'],
        responses: [
          "Our pricing is tailored to each project — no two homes are the same, and we never offer cookie-cutter packages. For a single-family home or condo, staging typically begins at a few thousand dollars and scales with the scope. The more meaningful question is what the return looks like: our clients consistently see $20,000–$100,000+ in additional sale proceeds. Would you like to book a complimentary consultation?",
          "I appreciate you asking directly. Staging fees vary by square footage, scope, and timeline. What I can tell you is that the ROI is exceptional — we've watched $8,000 in staging create $95,000 in additional sale price. I'd love to have Julia or Alfredo give you a proper quote. Can I connect you with them?"
        ]
      },
      {
        patterns: ['model home', 'new construction', 'builder', 'developer', 'development'],
        userType: 'builder',
        serviceInterest: 'model-home',
        responses: [
          "Model home staging is a specialty we approach with particular care — it's not just about individual buyers, it's about creating an aspirational lifestyle that sells an entire community. We work closely with builders across the Tri-State area. Are you working on a new development?",
          "We've helped developers transform model homes into the emotional heart of their projects — the space that convinces buyers this is where they want to live. Tell me about your development."
        ]
      },
      {
        patterns: ['vacation', 'airbnb', 'short term', 'rental', 'investment property'],
        serviceInterest: 'vacation',
        responses: [
          "Vacation home staging is a wonderful investment — beautifully styled properties command significantly higher nightly rates and earn more 5-star reviews. Are you preparing a vacation rental for the market, or refreshing an existing property?",
          "We approach vacation properties with the same care as our luxury residential work. The goal is the same: make every person who enters feel something extraordinary. What kind of property is it?"
        ]
      },
      {
        patterns: ['virtual', 'virtual staging', 'digital', 'renderings'],
        serviceInterest: 'virtual',
        responses: [
          "Virtual staging has become an incredibly powerful tool — especially for vacant properties where physical staging isn't practical. Our virtual work is photorealistic and helps buyers emotionally connect with a space before ever stepping inside. Would you like to see examples?",
          "Virtual staging is one of our most cost-effective offerings, and the results are genuinely beautiful. We're happy to discuss how it might work for your property."
        ]
      },
      {
        patterns: ['consultation', 'book', 'schedule', 'appointment', 'meet', 'call'],
        responses: [
          "A complimentary consultation is the perfect first step — Julia or Alfredo will walk through your property (or photos), understand your goals, and give you a clear vision of what's possible. I can help you get that scheduled. What dates work best in the next week or two?",
          "I'd love to connect you with Julia or Alfredo directly. They typically offer 30-minute complimentary discovery calls. Can you share your preferred days and times, and I'll make sure someone reaches out?"
        ]
      },
      {
        patterns: ['new york', 'nyc', 'manhattan', 'brooklyn', 'queens', 'new jersey', 'nj', 'connecticut', 'ct', 'long island', 'hamptons', 'tri-state'],
        responses: [
          "We serve the entire Tri-State area beautifully — Manhattan, Brooklyn, Queens, Long Island, New Jersey, Connecticut, and the Hamptons. Our team moves fluidly across the region. Where is your property located?",
          "The Tri-State area is our home territory. From Upper East Side co-ops to Hamptons estates to New Jersey new construction — we've staged them all with care. Which area are you in?"
        ]
      },
      {
        patterns: ['furniture rental', 'rent furniture', 'furnish'],
        serviceInterest: 'furniture',
        responses: [
          "We offer curated furniture rental as part of our staging service — every piece selected for its quality, proportion, and emotional impact. We don't work from catalog pages; we source pieces that feel intentional and personal. Would you like to discuss a furnished staging?",
          "Our furniture program is quite different from standard rental: we curate each piece to the specific property. Nothing generic, nothing repetitive. It's one of the things that makes our stagings feel so lived-in and luxurious."
        ]
      },
      {
        patterns: ['about', 'julia', 'alfredo', 'founders', 'team', 'who are you', 'jcl'],
        responses: [
          "JCL Staging & Design was founded by Julia Carias-Linares and Alfredo Linares — a husband-and-wife team who bring complementary brilliance to every project. Julia is the creative visionary: a media executive and actress whose editorial eye shapes every design decision. Alfredo is the operational force — ensuring every vision is executed with flawless precision. Together, they've built one of New York's most trusted luxury staging studios since 2017.",
          "Julia and Alfredo created JCL from a shared conviction: that every home deserves to be experienced at its very best. Julia's background in media gave her an instinct for storytelling through space. Alfredo's business acumen ensures the work is delivered without compromise. They're remarkable together."
        ]
      },
      {
        patterns: ['portfolio', 'examples', 'work', 'projects', 'gallery', 'photos'],
        responses: [
          "Our portfolio is one of the most beautiful things I can share with you. Some highlights: a Park Avenue Penthouse that sold in 11 days at $4.2M, a Tribeca Loft with 5 competing offers, and a Brooklyn Heights kitchen that outperformed the building by 12%. Scroll down to see the full gallery — each project has its own story.",
          "Every project we've done tells a different story. The Park Avenue Penthouse was about grandeur balanced with intimacy. The Upper West Side Townhouse was about honoring history while speaking to the present. Would you like me to tell you about any specific type of property?"
        ]
      },
      {
        patterns: ['how long', 'timeline', 'days', 'weeks', 'how fast', 'quick'],
        responses: [
          "Most of our full staging projects are installed within 3–7 business days once the property is vacant. For urgent listings, we've moved even faster — sometimes 48 hours for the right project. What's your timeline?",
          "Timeline depends on scope, but we move quickly and without chaos. A typical full staging installation takes 1–2 days on-site, with another few days for preparation and curation. What's driving your timeline?"
        ]
      },
      {
        patterns: ['thank', 'thanks', 'perfect', 'great', 'wonderful', 'love it', 'amazing', 'beautiful'],
        responses: [
          "It's my pleasure — that's exactly what I'm here for. Is there anything else you'd like to explore?",
          "Wonderful — I'm so glad that was helpful. What else can I tell you about JCL?",
          "Thank you — it makes me happy to know that was useful. Don't hesitate to ask anything at all."
        ]
      }
    ];

    const fallbacks = [
      "That's a great question — let me make sure you get the most precise answer. For anything specific, I'd love to connect you directly with Julia or Alfredo. In the meantime, is there something about our services or portfolio I can help with?",
      "Every home has a unique story, and I want to make sure you get the right guidance. Could you tell me a bit more about what you're looking for?",
      "I appreciate you sharing that. Let me understand better — are you primarily focused on selling a property, designing a home, or exploring a partnership with JCL?",
      "That's worth a deeper conversation. Julia and Alfredo would be the perfect people to speak with. Would you like me to help you schedule a complimentary consultation?",
    ];

    function getHour() { return new Date().getHours(); }
    function getGreeting() {
      const h = getHour();
      if (h < 12) return 'Good morning';
      if (h < 17) return 'Good afternoon';
      return 'Good evening';
    }

    function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

    function findResponse(text) {
      const lower = text.toLowerCase();
      for (const entry of responseMap) {
        if (entry.patterns.some(p => lower.includes(p))) {
          if (entry.userType) conversationState.userType = entry.userType;
          if (entry.serviceInterest) conversationState.serviceInterest = entry.serviceInterest;
          saveState();
          return pickRandom(entry.responses);
        }
      }
      return null;
    }

    function buildContextualResponse(text) {
      // Direct response lookup
      const direct = findResponse(text);
      if (direct) return direct;

      // Contextual based on state
      if (conversationState.messageCount === 1) {
        if (conversationState.userType === 'seller') {
          return "Wonderful — tell me a bit more about your property. Is it currently occupied, or is it vacant? That helps us understand whether full staging or a partial consult makes more sense.";
        }
      }
      if (!conversationState.askedLocation && conversationState.userType && conversationState.messageCount > 1) {
        conversationState.askedLocation = true;
        saveState();
        return "Where is the property located? We serve the full Tri-State area — Manhattan, Brooklyn, New Jersey, Connecticut, and Long Island.";
      }

      return pickRandom(fallbacks);
    }

    // ── UI Functions ──────────────────────────────────────────────
    function addMessage(text, isUser = false, delay = 0) {
      return new Promise(resolve => {
        setTimeout(() => {
          const msgDiv = document.createElement('div');
          msgDiv.className = `msg ${isUser ? 'msg-user' : 'msg-olivia'}`;

          if (!isUser) {
            msgDiv.innerHTML = `
              <div class="msg-avatar"><img src="images/olivia-avatar.jpg" alt="Olivia"></div>
              <div class="msg-bubble">${text}</div>`;
          } else {
            msgDiv.innerHTML = `<div class="msg-bubble">${text}</div>`;
          }

          messages.appendChild(msgDiv);
          messages.scrollTop = messages.scrollHeight;
          resolve();
        }, delay);
      });
    }

    function showTyping() {
      if (isTyping) return;
      isTyping = true;
      const typingDiv = document.createElement('div');
      typingDiv.id = 'typingIndicator';
      typingDiv.className = 'msg msg-olivia';
      typingDiv.innerHTML = `
        <div class="msg-avatar"><img src="images/olivia-avatar.jpg" alt="Olivia"></div>
        <div class="msg-typing">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>`;
      messages.appendChild(typingDiv);
      messages.scrollTop = messages.scrollHeight;
    }

    function hideTyping() {
      const typing = $('#typingIndicator');
      if (typing) typing.remove();
      isTyping = false;
    }

    function setQuickReplies(replies) {
      if (!quickReplies) return;
      quickReplies.innerHTML = replies.map(r =>
        `<button class="quick-reply" aria-label="${r}">${r}</button>`
      ).join('');
      $$('.quick-reply', quickReplies).forEach(btn => {
        on(btn, 'click', () => handleUserMessage(btn.textContent));
      });
    }

    function clearQuickReplies() {
      if (quickReplies) quickReplies.innerHTML = '';
    }

    async function handleUserMessage(text) {
      if (!text.trim()) return;
      clearQuickReplies();
      await addMessage(text, true);
      conversationState.messageCount++;
      saveState();

      // Clear input
      if (input) input.value = '';

      // Typing delay based on response length
      showTyping();
      const responseText = buildContextualResponse(text);
      const typingTime = Math.min(Math.max(responseText.length * 22, 900), 2400);

      setTimeout(async () => {
        hideTyping();
        await addMessage(responseText);

        // Follow-up quick replies
        if (conversationState.messageCount <= 1) {
          setQuickReplies(['Tell me about pricing', 'View the portfolio', 'Book a consultation', 'I\'m a Realtor']);
        } else if (responseText.includes('consult')) {
          setQuickReplies(['Yes, let\'s schedule', 'Tell me more first', 'What areas do you serve?']);
        } else if (conversationState.messageCount === 3) {
          setQuickReplies(['How long does staging take?', 'See before & after examples', 'Meet Julia & Alfredo']);
        }
      }, typingTime);
    }

    async function greetUser() {
      if (conversationState.greeted) return;
      conversationState.greeted = true;
      saveState();

      showTyping();
      await new Promise(r => setTimeout(r, 1200));
      hideTyping();

      await addMessage(`${getGreeting()}, I'm Olivia — JCL's design concierge. Think of me as your personal guide to everything we do here.`);

      setTimeout(() => {
        showTyping();
        setTimeout(async () => {
          hideTyping();
          await addMessage(`Whether you're preparing a home to sell, exploring interior design, or building a long-term partnership with us — I'm here to help you find exactly what you need.`);

          setQuickReplies(["I'm selling my home", "I'm a Realtor", "I need interior design", "Tell me about pricing"]);
        }, 1100);
      }, 500);
    }

    function open() {
      isOpen = true;
      window_.classList.add('open');
      if (label) label.classList.add('hidden');
      input?.focus();
      if (!conversationState.greeted) {
        setTimeout(greetUser, 400);
      }
    }

    function close() {
      isOpen = false;
      window_.classList.remove('open');
      setTimeout(() => { if (label) label.classList.remove('hidden'); }, 500);
    }

    on(btn, 'click', () => isOpen ? close() : open());
    on(closeBtn, 'click', close);

    // Send on click
    on(sendBtn, 'click', () => {
      const text = input?.value?.trim();
      if (text) handleUserMessage(text);
    });

    // Send on Enter
    on(input, 'keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const text = input.value.trim();
        if (text) handleUserMessage(text);
      }
    });

    // Voice (Web Speech API)
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      let recognition;

      on(voiceBtn, 'click', () => {
        if (!recognition) {
          recognition = new SpeechRecognition();
          recognition.lang = 'en-US';
          recognition.interimResults = false;
          recognition.onresult = e => {
            const text = e.results[0][0].transcript;
            if (input) input.value = text;
            handleUserMessage(text);
            voiceBtn.classList.remove('listening');
          };
          recognition.onend = () => voiceBtn.classList.remove('listening');
          recognition.onerror = () => voiceBtn.classList.remove('listening');
        }
        if (voiceBtn.classList.contains('listening')) {
          recognition.stop();
          voiceBtn.classList.remove('listening');
        } else {
          recognition.start();
          voiceBtn.classList.add('listening');
        }
      });
    } else {
      if (voiceBtn) voiceBtn.style.display = 'none';
    }

    // Auto-open on second visit
    const visits = parseInt(sessionStorage.getItem('jcl_visits') || '0') + 1;
    sessionStorage.setItem('jcl_visits', visits.toString());
    if (visits > 1 && !isOpen) {
      setTimeout(open, 4000);
    }

    // Greeting bubble after delay on first visit
    if (visits === 1) {
      setTimeout(() => {
        if (!isOpen && label) {
          label.style.display = 'flex';
        }
      }, 3000);
    }
  }

  /* ─── SMOOTH SCROLL ────────────────────────────────────────────── */
  function initSmoothScroll() {
    $$('a[href^="#"]').forEach(link => {
      on(link, 'click', e => {
        const href = link.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerHeight = $('.site-header')?.offsetHeight || 80;
          const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  /* ─── PORTFOLIO FILTER (if needed later) ─────────────────────── */
  function initPortfolioHover() {
    $$('.portfolio-item').forEach(item => {
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
    });
  }

  /* ─── LAZY LOADING ─────────────────────────────────────────────── */
  function initLazyLoad() {
    if ('loading' in HTMLImageElement.prototype) return; // Native lazy loading
    const lazyImages = $$('img[loading="lazy"]');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });
    lazyImages.forEach(img => observer.observe(img));
  }

  /* ─── ANNOUNCEMENT DISMISS ─────────────────────────────────────── */
  function initAnnouncementAdjust() {
    const ann = $('.announcement-bar');
    const header = $('#siteHeader');
    if (!ann || !header) return;

    function adjust() {
      const h = ann.offsetHeight;
      header.style.top = `${h}px`;
    }
    adjust();
    on(window, 'resize', debounce(adjust, 100));
  }

  /* ─── INIT ─────────────────────────────────────────────────────── */
  function init() {
    initAnnouncement();
    initAnnouncementAdjust();
    initNav();
    initHero();
    initScrollReveal();
    initCounters();
    initBeforeAfter();
    initPortfolio();
    initTestimonials();
    initFAQ();
    initForm();
    initParallax();
    initSmoothScroll();
    initPortfolioHover();
    initLazyLoad();
    initOlivia();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
