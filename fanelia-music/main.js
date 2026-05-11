document.addEventListener('DOMContentLoaded', () => {
  // CUSTOM CURSOR
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  
  if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    });

    const hoverElements = document.querySelectorAll('a, button, .magnetic, .store-card, .album-card-art-wrap');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  } else {
    cursor.style.display = 'none';
    cursorDot.style.display = 'none';
  }

  // NAV SCROLL
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // MOBILE MENU
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  hamburger.addEventListener('click', () => mobileMenu.classList.add('active'));
  mobileClose.addEventListener('click', () => mobileMenu.classList.remove('active'));
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('active'));
  });

  // REVEAL ANIMATIONS
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-fade');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
  
  revealElements.forEach(el => revealObserver.observe(el));

  // PARALLAX FOR ARTIST BACKGROUNDS
  const artistWorlds = document.querySelectorAll('.artist-world');
  window.addEventListener('scroll', () => {
    artistWorlds.forEach(world => {
      const rect = world.getBoundingClientRect();
      const img = world.querySelector('.artist-bg-img');
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        world.classList.add('is-active');
        const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        img.style.transform = `scale(1.05) translateY(${(scrollPercent - 0.5) * 20}%)`;
      } else {
        world.classList.remove('is-active');
      }
    });
  });

  // PARTICLES BACKGROUND
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let width, height, particles;

  function initParticles() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.5 + 0.1
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > width) p.dx *= -1;
      if (p.y < 0 || p.y > height) p.dy *= -1;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232, 216, 195, ${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(drawParticles);
  }

  initParticles();
  drawParticles();
  window.addEventListener('resize', initParticles);

  // CURATOR CHATBOT
  const curatorOverlay = document.getElementById('curatorOverlay');
  const curatorPanel = document.getElementById('curatorPanel');
  const openCuratorBtns = [document.getElementById('openCurator'), document.getElementById('openCuratorMobile')];
  const curatorClose = document.getElementById('curatorClose');
  const curatorMessages = document.getElementById('curatorMessages');
  const curatorInput = document.getElementById('curatorInput');
  const curatorSend = document.getElementById('curatorSend');
  const curatorChips = document.querySelectorAll('.curator-chip');

  function openCurator() {
    curatorOverlay.classList.add('active');
    curatorPanel.classList.add('active');
    mobileMenu.classList.remove('active');
  }

  function closeCurator() {
    curatorOverlay.classList.remove('active');
    curatorPanel.classList.remove('active');
  }

  openCuratorBtns.forEach(btn => btn?.addEventListener('click', openCurator));
  curatorClose.addEventListener('click', closeCurator);
  curatorOverlay.addEventListener('click', closeCurator);

  function addMessage(text, isUser = false) {
    const div = document.createElement('div');
    div.className = `curator-msg ${isUser ? 'curator-msg-user' : 'curator-msg-ai'}`;
    div.innerHTML = `<p>${text}</p>`;
    curatorMessages.appendChild(div);
    curatorMessages.scrollTop = curatorMessages.scrollHeight;
  }

  function handleCuratorAI(message) {
    const msg = message.toLowerCase();
    setTimeout(() => {
      let reply = "I'm here to guide you through Fanelia Music. What are you looking for?";
      if (msg.includes('soulful') || msg.includes('slow')) {
        reply = "For soulful, unhurried moments, I highly recommend <strong>Magdalena Ford's</strong> debut album, <em>Take Your Time With Me</em>. <br/><br/><a href='#magdalena' style='color:var(--c-black);text-decoration:underline' onclick='document.getElementById(\"curatorClose\").click()'>Listen here</a>.";
      } else if (msg.includes('powerful') || msg.includes('fierce') || msg.includes('latina')) {
        reply = "You need the fire of <strong>Velencia de la Cruz</strong>. Her album <em>No Me Domas</em> is a fierce Latin pop declaration. <br/><br/><a href='#velencia' style='color:var(--c-black);text-decoration:underline' onclick='document.getElementById(\"curatorClose\").click()'>Experience it</a>.";
      } else if (msg.includes('romantic') || msg.includes('seductive')) {
        reply = "Set the mood with <strong>Dale Brentwood's</strong> smooth R&B album <em>Hooked On You</em>. <br/><br/><a href='#dale' style='color:var(--c-black);text-decoration:underline' onclick='document.getElementById(\"curatorClose\").click()'>Let it play</a>.";
      } else if (msg.includes('membership') || msg.includes('fanelia black')) {
        reply = "<strong>Fanelia Black</strong> is our private inner circle. You get early access to music, private streams, and exclusive vinyl drops. <br/><br/><a href='#membership' style='color:var(--c-black);text-decoration:underline' onclick='document.getElementById(\"curatorClose\").click()'>View tiers</a>.";
      } else if (msg.includes('vinyl') || msg.includes('buy') || msg.includes('store')) {
        reply = "Our boutique offers limited edition, numbered vinyls for all three debut albums, plus an exclusive Box Set. <br/><br/><a href='#store' style='color:var(--c-black);text-decoration:underline' onclick='document.getElementById(\"curatorClose\").click()'>Enter Boutique</a>.";
      } else if (msg.includes('artist')) {
        reply = "We proudly represent three visionary artists: Magdalena Ford (R&B/Soul), Velencia de la Cruz (Latin Pop), and Dale Brentwood (Smooth R&B).";
      }
      addMessage(reply, false);
    }, 1000);
  }

  function sendMessage() {
    const text = curatorInput.value.trim();
    if (text) {
      addMessage(text, true);
      curatorInput.value = '';
      handleCuratorAI(text);
    }
  }

  curatorSend.addEventListener('click', sendMessage);
  curatorInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  curatorChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const msg = chip.getAttribute('data-msg');
      addMessage(msg, true);
      handleCuratorAI(msg);
      chip.style.opacity = '0.5';
      chip.style.pointerEvents = 'none';
    });
  });

});
