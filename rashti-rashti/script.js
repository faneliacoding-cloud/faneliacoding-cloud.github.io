/* ========================================
   RASHTI & RASHTI — Luxury Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // === Nav Scroll Behavior ===
  const nav = document.getElementById('mainNav');
  const hero = document.getElementById('hero');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (nav) {
      if (scrollY > 80) {
        nav.classList.add('scrolled');
        nav.classList.remove('hero-active');
      } else {
        nav.classList.remove('scrolled');
        if (hero) nav.classList.add('hero-active');
      }
    }
    lastScroll = scrollY;
  });

  // === Mobile Toggle ===
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // === Scroll Reveal ===
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  reveals.forEach(el => revealObserver.observe(el));

  // === Hero Headline Rotation ===
  const heroHeadline = document.getElementById('heroHeadline');
  if (heroHeadline) {
    const headlines = [
      'Luxury Essentials for Modern Parenthood',
      "Designed for Life's Most Precious Moments",
      'Where Safety Meets Beautiful Design',
      'Parenting, Elevated'
    ];
    let idx = 0;
    setInterval(() => {
      heroHeadline.style.opacity = '0';
      heroHeadline.style.transform = 'translateY(10px)';
      setTimeout(() => {
        idx = (idx + 1) % headlines.length;
        heroHeadline.textContent = headlines[idx];
        heroHeadline.style.opacity = '1';
        heroHeadline.style.transform = 'translateY(0)';
      }, 600);
    }, 5000);
    heroHeadline.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  }

  // === Parallax on Hero ===
  if (hero) {
    const heroImg = hero.querySelector('.hero-media img');
    if (heroImg) {
      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight) {
          heroImg.style.transform = `scale(1.05) translateY(${scrollY * 0.15}px)`;
        }
      });
    }
  }

  // === AI Concierge ===
  const conciergeBtn = document.getElementById('conciergeBtn');
  const conciergePanel = document.getElementById('conciergePanel');
  const conciergeClose = document.getElementById('conciergeClose');
  const conciergeInput = document.getElementById('conciergeInput');
  const conciergeSend = document.getElementById('conciergeSend');
  const conciergeMessages = document.getElementById('conciergeMessages');

  if (conciergeBtn && conciergePanel) {
    conciergeBtn.addEventListener('click', () => conciergePanel.classList.toggle('active'));
    if (conciergeClose) conciergeClose.addEventListener('click', () => conciergePanel.classList.remove('active'));
  }

  const conciergeResponses = {
    'brand': "We have 6 signature brands: Baby Starters®, Start Up Kids®, Mini B.™, Wetsuit Club®, Night Life®, and Magic Years®. Each is designed with love for different stages of childhood. Would you like to know more about any specific brand?",
    'apparel': "Our apparel range includes layette, playwear, sleepwear, and swimwear — from newborn through big-kid sizes. Every piece adheres to strict safety and quality guidelines. Check out our Products page for the full collection!",
    'blanket': "From washcloths to cuddly towels, plush blankets to cozy robes — our blankets and bath collection makes every moment a snuggly one. Our fabrics are super-soft, rich, and designed for both baby and parent comfort.",
    'toy': "Our toys and gifts create a world of play! From plush companions to developmental toys to milestone gifts — we believe in imagination and wonder. Explore Baby Starters®, Magic Years®, Soft Dreams®, and Snuggle Buddy® collections.",
    'buy': "You can find our products at major retailers including Target, Walmart, Amazon, Macy's, Bloomingdale's, Buy Buy Baby, Kohl's, TJ Maxx, and many more! Visit our Where To Buy page for the complete list.",
    'age': "We cover every age! Newborn layette (0-9M), infant playwear (3-24M), toddler essentials (2T-5T), and big-kid favorites (4-14). Our brands grow with your family!",
    'gift': "Looking for the perfect gift? Our Magic Years® keepsake items and Snuggle Buddy® plush companions make beautiful, lasting presents. We also have holiday-themed Rudolph® products that are always a hit!",
    'sleep': "Night Life® offers dreamy sleepwear in fun designs, and our Soft Dreams® interactive soothers help baby transition to comfortable slumber. Sweet dreams for the whole family!",
    'swim': "Wetsuit Club® has splash-ready swimwear with UV protection and fun designs. Perfect for pool days, beach trips, and water adventures!",
    'safety': "Safety is our top priority. Every product adheres to CPSIA compliance standards and undergoes rigorous quality testing. We follow all regulated safety guidelines across every brand.",
    'licensed': "We partner with beloved brands including Rudolph the Red-Nosed Reindeer®, Pete the Cat®, World of Eric Carle®, Little Blue Truck®, and Little Me®. Familiar characters your family already loves!",
    'history': "Rashti & Rashti was founded in 1950 by Harry J. Rashti and his son John. Now a 4th-generation family business, we're still headquartered in NYC's garment district, staying true to our founder's vision of great products at great prices."
  };

  function getBotResponse(msg) {
    const lower = msg.toLowerCase();
    for (const [key, response] of Object.entries(conciergeResponses)) {
      if (lower.includes(key)) return response;
    }
    return "Thank you for your question! For detailed information, I'd recommend visiting our specific pages or contacting us directly at our Contact page. I'm here to help with info about our brands, products, where to buy, safety standards, and more. What would you like to know?";
  }

  function sendMessage() {
    if (!conciergeInput || !conciergeMessages) return;
    const msg = conciergeInput.value.trim();
    if (!msg) return;
    const userDiv = document.createElement('div');
    userDiv.className = 'msg msg-user';
    userDiv.textContent = msg;
    conciergeMessages.appendChild(userDiv);
    conciergeInput.value = '';
    conciergeMessages.scrollTop = conciergeMessages.scrollHeight;
    setTimeout(() => {
      const botDiv = document.createElement('div');
      botDiv.className = 'msg msg-bot';
      botDiv.textContent = getBotResponse(msg);
      conciergeMessages.appendChild(botDiv);
      conciergeMessages.scrollTop = conciergeMessages.scrollHeight;
    }, 800);
  }

  if (conciergeSend) conciergeSend.addEventListener('click', sendMessage);
  if (conciergeInput) conciergeInput.addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(); });

  // === Smooth image hover zoom ===
  document.querySelectorAll('.brand-card, .category-card, .blog-card-img').forEach(card => {
    card.addEventListener('mouseenter', () => card.style.cursor = 'pointer');
  });

  // === Search overlay (minimal) ===
  const searchBtn = document.getElementById('searchBtn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const q = prompt('Search Rashti & Rashti:');
      if (q) window.location.href = `https://www.rashtiandrashti.com/?s=${encodeURIComponent(q)}`;
    });
  }
});
