/* ============================================================
   THE JOY IN LIVING — Main JavaScript
   Navigation, Scroll Animations, Utilities
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollAnimations();
  initCrisisBanner();
  initStickyCtA();
  initTestimonialCarousel();
  initFaqAccordion();
  initSmoothScroll();
});

/* ============================================================
   NAVIGATION
   ============================================================ */

function initNav() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');
  const overlay = document.querySelector('.nav__overlay');
  const dropdowns = document.querySelectorAll('.nav__dropdown');
  const banner = document.querySelector('.crisis-banner');

  if (!nav) return;

  // Handle banner offset
  if (banner && !banner.classList.contains('hidden')) {
    nav.classList.add('has-banner');
  }

  // Auto-apply scrolled state on pages without a dark hero
  const hasDarkHero = document.querySelector('.hero, .portal-hero');
  const hasLightBg  = document.querySelector('.article-hero, .page-hero');
  if (!hasDarkHero || hasLightBg) {
    nav.classList.add('scrolled');
  }

  // Scroll behavior
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;

    if (current > 80 || !hasDarkHero || hasLightBg) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = current;
  }, { passive: true });

  // ── Mobile toggle, overlay, dropdowns, link-close ─────────────
  // Handled by mobile-nav.js when present. Guard prevents double-binding.
  if (!window.__useMobileNav) {

    // iOS-compatible body scroll lock (fallback when mobile-nav.js not loaded)
    let _savedScrollY = 0;
    function lockScroll() {
      _savedScrollY = window.scrollY;
      document.body.style.position  = 'fixed';
      document.body.style.top       = `-${_savedScrollY}px`;
      document.body.style.left      = '0';
      document.body.style.right     = '0';
      document.body.style.overflowY = 'scroll';
    }
    function unlockScroll() {
      document.body.style.position  = '';
      document.body.style.top       = '';
      document.body.style.left      = '';
      document.body.style.right     = '';
      document.body.style.overflowY = '';
      window.scrollTo(0, _savedScrollY);
    }

    function toggleMenu() {
      const isOpen = menu.classList.contains('open');
      toggle.classList.toggle('active');
      menu.classList.toggle('open');
      if (overlay) overlay.classList.toggle('active');
      isOpen ? unlockScroll() : lockScroll();
    }

    if (toggle) {
      let _touchHandled = false;
      toggle.addEventListener('touchstart', (e) => {
        e.preventDefault();
        _touchHandled = true;
        toggleMenu();
      }, { passive: false });
      toggle.addEventListener('click', () => {
        if (_touchHandled) { _touchHandled = false; return; }
        toggleMenu();
      });
    }

    if (overlay) {
      overlay.addEventListener('click', () => {
        toggle.classList.remove('active');
        menu.classList.remove('open');
        overlay.classList.remove('active');
        unlockScroll();
      });
      overlay.addEventListener('touchstart', (e) => {
        e.preventDefault();
        toggle.classList.remove('active');
        menu.classList.remove('open');
        overlay.classList.remove('active');
        unlockScroll();
      }, { passive: false });
    }

    dropdowns.forEach(dropdown => {
      const trigger = dropdown.querySelector('.nav__dropdown-trigger');
      if (!trigger) return;
      trigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
          e.preventDefault();
          dropdown.classList.toggle('open');
        }
      });
    });

    menu.querySelectorAll('.nav__link:not(.nav__dropdown-trigger)').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
          toggle.classList.remove('active');
          menu.classList.remove('open');
          if (overlay) overlay.classList.remove('active');
          unlockScroll();
        }
      });
    });

  } // end !window.__useMobileNav
}


/* ============================================================
   SCROLL ANIMATIONS (Intersection Observer)
   ============================================================ */

function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
  if (!elements.length) return;

  // Check for reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px 0px 0px'
  });

  elements.forEach((el, index) => {
    // Set stagger index for children
    if (el.parentElement && el.parentElement.classList.contains('stagger-children')) {
      el.style.setProperty('--stagger-index', index);
    }
    observer.observe(el);
  });
}

/* ============================================================
   CRISIS BANNER
   ============================================================ */

function initCrisisBanner() {
  const banner = document.querySelector('.crisis-banner');
  if (!banner) return;

  const closeBtn = banner.querySelector('.crisis-banner__close');
  if (!closeBtn) return;

  // Check if previously dismissed
  if (sessionStorage.getItem('crisis-banner-dismissed')) {
    banner.classList.add('hidden');
    banner.style.display = 'none';
    document.body.classList.add('banner-hidden');
    const nav = document.querySelector('.nav');
    if (nav) nav.classList.remove('has-banner');
    return;
  }

  closeBtn.addEventListener('click', () => {
    banner.style.display = 'none';
    banner.classList.add('hidden');
    document.body.classList.add('banner-hidden');
    sessionStorage.setItem('crisis-banner-dismissed', 'true');
    const nav = document.querySelector('.nav');
    if (nav) nav.classList.remove('has-banner');
  });
}

/* ============================================================
   STICKY CTA
   ============================================================ */

function initStickyCtA() {
  const stickyCta = document.querySelector('.sticky-cta');
  if (!stickyCta) return;

  const hero = document.querySelector('.hero');
  const footer = document.querySelector('.footer');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : 600;
    const footerTop = footer ? footer.offsetTop - window.innerHeight : Infinity;

    if (scrollY > heroBottom && scrollY < footerTop) {
      stickyCta.classList.add('visible');
    } else {
      stickyCta.classList.remove('visible');
    }
  }, { passive: true });
}

/* ============================================================
   TESTIMONIAL CAROUSEL
   ============================================================ */

function initTestimonialCarousel() {
  const wrapper = document.querySelector('.testimonials__wrapper');
  if (!wrapper) return;

  const track = wrapper.querySelector('.testimonials__track');
  const dots = wrapper.querySelectorAll('.testimonials__dot');
  if (!track || !dots.length) return;

  let currentSlide = 0;
  let slidesPerView = getSlidesPerView();
  const totalCards = track.children.length;
  let totalSlides = Math.ceil(totalCards / slidesPerView);

  function getSlidesPerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  function goToSlide(index) {
    currentSlide = index;
    const offset = -(index * (100 / slidesPerView)) * slidesPerView;
    track.style.transform = `translateX(${offset}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });

  // Auto-advance
  let autoAdvance = setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
  }, 5000);

  wrapper.addEventListener('mouseenter', () => clearInterval(autoAdvance));
  wrapper.addEventListener('mouseleave', () => {
    autoAdvance = setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      goToSlide(currentSlide);
    }, 5000);
  });

  // Touch swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  wrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    clearInterval(autoAdvance);
  }, { passive: true });

  wrapper.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) { // minimum swipe distance
      if (diff > 0) {
        // swiped left → next slide
        currentSlide = Math.min(currentSlide + 1, totalSlides - 1);
      } else {
        // swiped right → prev slide
        currentSlide = Math.max(currentSlide - 1, 0);
      }
      goToSlide(currentSlide);
    }
  }, { passive: true });

  // Handle resize
  window.addEventListener('resize', () => {
    slidesPerView = getSlidesPerView();
    totalSlides = Math.ceil(totalCards / slidesPerView);
    goToSlide(Math.min(currentSlide, totalSlides - 1));
  });

  // Initialize
  goToSlide(0);
}

/* ============================================================
   FAQ ACCORDION
   ============================================================ */

function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all others
      items.forEach(other => other.classList.remove('open'));

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

/* ============================================================
   SMOOTH SCROLL
   ============================================================ */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const nav = document.querySelector('.nav');
      const navHeight = nav ? nav.offsetHeight : 0;

      window.scrollTo({
        top: target.offsetTop - navHeight - 20,
        behavior: 'smooth'
      });
    });
  });
}
