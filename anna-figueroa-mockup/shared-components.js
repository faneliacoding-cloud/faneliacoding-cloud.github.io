/**
 * Anna Figueroa — Shared Components
 * GSAP scroll animations, particle constellation, 3D tilt, magnetic cursor, chatbot widget, lightbox
 */

/* ========================================================
   1. PARTICLE CONSTELLATION
   ======================================================== */
class ParticleConstellation {
  constructor(canvasId, opts = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: -1000, y: -1000 };
    this.color = opts.color || '201, 168, 76';
    this.count = opts.count || 60;
    this.maxDist = opts.maxDist || 120;
    this.speed = opts.speed || 0.4;
    this.resize();
    this.init();
    window.addEventListener('resize', () => this.resize());
    this.canvas.addEventListener('mousemove', e => {
      const r = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - r.left;
      this.mouse.y = e.clientY - r.top;
    });
    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = -1000; this.mouse.y = -1000;
    });
    this.animate();
  }
  resize() {
    const r = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = r.width;
    this.canvas.height = r.height;
  }
  init() {
    this.particles = [];
    for (let i = 0; i < this.count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * this.speed,
        vy: (Math.random() - 0.5) * this.speed,
        r: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3
      });
    }
  }
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
      // Mouse repulsion
      const dx = p.x - this.mouse.x, dy = p.y - this.mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        p.x += dx * 0.02;
        p.y += dy * 0.02;
      }
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${this.color}, ${p.opacity})`;
      this.ctx.fill();
    });
    // Draw connections
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const a = this.particles[i], b = this.particles[j];
        const d = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
        if (d < this.maxDist) {
          this.ctx.beginPath();
          this.ctx.moveTo(a.x, a.y);
          this.ctx.lineTo(b.x, b.y);
          this.ctx.strokeStyle = `rgba(${this.color}, ${0.15 * (1 - d / this.maxDist)})`;
          this.ctx.lineWidth = 0.6;
          this.ctx.stroke();
        }
      }
    }
    requestAnimationFrame(() => this.animate());
  }
}

/* ========================================================
   2. 3D TILT EFFECT
   ======================================================== */
function initTiltCards() {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    const intensity = parseFloat(card.dataset.tiltIntensity) || 8;
    const glare = card.querySelector('.tilt-glare');

    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      const rotateY = (x - 0.5) * intensity * 2;
      const rotateX = (0.5 - y) * intensity * 2;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
      if (glare) {
        glare.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(201,168,76,0.15) 0%, transparent 60%)`;
        glare.style.opacity = '1';
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)';
      if (glare) glare.style.opacity = '0';
      setTimeout(() => { card.style.transition = 'none'; }, 500);
    });
  });
}

/* ========================================================
   3. MAGNETIC CURSOR
   ======================================================== */
function initMagneticCursor() {
  if (window.innerWidth < 768) return;
  const cursor = document.createElement('div');
  cursor.className = 'mag-cursor';
  cursor.innerHTML = '<div class="mag-cursor-dot"></div><div class="mag-cursor-ring"></div>';
  document.body.appendChild(cursor);
  const dot = cursor.querySelector('.mag-cursor-dot');
  const ring = cursor.querySelector('.mag-cursor-ring');
  let cx = 0, cy = 0, tx = 0, ty = 0;

  document.addEventListener('mousemove', e => {
    tx = e.clientX; ty = e.clientY;
  });

  function moveCursor() {
    cx += (tx - cx) * 0.15;
    cy += (ty - cy) * 0.15;
    dot.style.transform = `translate(${tx}px, ${ty}px)`;
    ring.style.transform = `translate(${cx}px, ${cy}px)`;
    requestAnimationFrame(moveCursor);
  }
  moveCursor();

  // Scale up on interactive elements
  const interactives = 'a, button, [data-tilt], .work-item, .service-card, input, textarea, select';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(interactives)) {
      ring.style.width = '56px';
      ring.style.height = '56px';
      ring.style.borderColor = 'rgba(201,168,76,0.6)';
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(interactives)) {
      ring.style.width = '36px';
      ring.style.height = '36px';
      ring.style.borderColor = 'rgba(201,168,76,0.3)';
    }
  });

  // Inject cursor styles
  const style = document.createElement('style');
  style.textContent = `
    .mag-cursor { pointer-events: none; position: fixed; top: 0; left: 0; z-index: 99999; mix-blend-mode: difference; }
    .mag-cursor-dot { position: fixed; top: -3px; left: -3px; width: 6px; height: 6px; background: #c9a84c; border-radius: 50%; pointer-events: none; will-change: transform; }
    .mag-cursor-ring { position: fixed; top: -18px; left: -18px; width: 36px; height: 36px; border: 1.5px solid rgba(201,168,76,0.3); border-radius: 50%; pointer-events: none; will-change: transform; transition: width 0.3s, height 0.3s, border-color 0.3s, top 0.3s, left 0.3s; }
    @media (max-width: 768px) { .mag-cursor { display: none; } }
  `;
  document.head.appendChild(style);
}

/* ========================================================
   4. SCROLL ANIMATIONS (GSAP ScrollTrigger)
   ======================================================== */
function initScrollAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Fade-up all elements with data-animate
  gsap.utils.toArray('[data-animate]').forEach(el => {
    const type = el.dataset.animate || 'fade-up';
    const delay = parseFloat(el.dataset.delay) || 0;
    let fromVars = { opacity: 0, y: 50, duration: 0.9, delay, ease: 'power3.out' };

    if (type === 'fade-left') fromVars = { opacity: 0, x: -60, duration: 0.9, delay, ease: 'power3.out' };
    if (type === 'fade-right') fromVars = { opacity: 0, x: 60, duration: 0.9, delay, ease: 'power3.out' };
    if (type === 'scale-in') fromVars = { opacity: 0, scale: 0.9, duration: 0.9, delay, ease: 'power3.out' };
    if (type === 'fade-down') fromVars = { opacity: 0, y: -40, duration: 0.9, delay, ease: 'power3.out' };

    gsap.from(el, {
      ...fromVars,
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
    });
  });

  // Stagger children with data-stagger
  gsap.utils.toArray('[data-stagger]').forEach(container => {
    const children = container.children;
    gsap.from(children, {
      opacity: 0, y: 40, duration: 0.7,
      stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: container, start: 'top 85%', toggleActions: 'play none none none' }
    });
  });

  // Counter animations
  gsap.utils.toArray('[data-counter]').forEach(el => {
    const target = parseInt(el.dataset.counter);
    const suffix = el.dataset.suffix || '';
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target, duration: 2, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
      onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; }
    });
  });
}

/* ========================================================
   5. MARQUEE SCROLL
   ======================================================== */
function initMarquee() {
  document.querySelectorAll('.marquee-track').forEach(track => {
    const content = track.innerHTML;
    track.innerHTML = content + content;
  });
}

/* ========================================================
   6. LIGHTBOX
   ======================================================== */
function initLightbox() {
  const images = document.querySelectorAll('[data-lightbox]');
  if (!images.length) return;

  // Create lightbox element
  const lb = document.createElement('div');
  lb.className = 'lightbox-overlay';
  lb.innerHTML = `
    <div class="lightbox-close">&times;</div>
    <img class="lightbox-img" src="" alt="" />
    <div class="lightbox-nav">
      <button class="lightbox-prev">‹</button>
      <button class="lightbox-next">›</button>
    </div>
  `;
  document.body.appendChild(lb);

  const lbImg = lb.querySelector('.lightbox-img');
  let currentIndex = 0;
  const srcs = Array.from(images).map(img => img.src || img.dataset.lightbox);

  images.forEach((img, i) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      currentIndex = i;
      lbImg.src = srcs[i];
      lb.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  lb.querySelector('.lightbox-close').addEventListener('click', closeLb);
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  lb.querySelector('.lightbox-prev').addEventListener('click', e => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + srcs.length) % srcs.length;
    lbImg.src = srcs[currentIndex];
  });
  lb.querySelector('.lightbox-next').addEventListener('click', e => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % srcs.length;
    lbImg.src = srcs[currentIndex];
  });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('active')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') { currentIndex = (currentIndex - 1 + srcs.length) % srcs.length; lbImg.src = srcs[currentIndex]; }
    if (e.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % srcs.length; lbImg.src = srcs[currentIndex]; }
  });

  function closeLb() {
    lb.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Inject lightbox styles
  const style = document.createElement('style');
  style.textContent = `
    .lightbox-overlay { position: fixed; inset: 0; z-index: 100000; background: rgba(10,10,8,0.92); backdrop-filter: blur(20px); display: flex; align-items: center; justify-content: center; opacity: 0; visibility: hidden; transition: opacity 0.35s, visibility 0.35s; }
    .lightbox-overlay.active { opacity: 1; visibility: visible; }
    .lightbox-close { position: absolute; top: 24px; right: 32px; font-size: 36px; color: rgba(250,249,246,0.7); cursor: pointer; transition: color 0.2s; z-index: 2; }
    .lightbox-close:hover { color: #c9a84c; }
    .lightbox-img { max-width: 90vw; max-height: 85vh; object-fit: contain; border-radius: 2px; box-shadow: 0 20px 80px rgba(0,0,0,0.5); }
    .lightbox-nav { position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%); display: flex; gap: 16px; }
    .lightbox-nav button { width: 48px; height: 48px; border: 1px solid rgba(201,168,76,0.3); background: rgba(26,26,24,0.6); color: rgba(250,249,246,0.7); font-size: 24px; cursor: pointer; border-radius: 50%; transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
    .lightbox-nav button:hover { border-color: #c9a84c; color: #c9a84c; background: rgba(201,168,76,0.1); }
  `;
  document.head.appendChild(style);
}

/* ========================================================
   7. AI CHATBOT WIDGET
   ======================================================== */
function initChatbot() {
  // Inject chatbot HTML
  const widget = document.createElement('div');
  widget.id = 'anna-chatbot';
  widget.innerHTML = `
    <button class="chat-fab" id="chat-fab" aria-label="Open AI Creative Assistant">
      <svg class="chat-fab-icon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="40" r="16" fill="#c9a84c"/>
        <g stroke="#c9a84c" stroke-width="2.5" stroke-linecap="round">
          <line x1="40" y1="8" x2="40" y2="18"/><line x1="40" y1="62" x2="40" y2="72"/>
          <line x1="8" y1="40" x2="18" y2="40"/><line x1="62" y1="40" x2="72" y2="40"/>
          <line x1="17" y1="17" x2="24" y2="24"/><line x1="56" y1="56" x2="63" y2="63"/>
          <line x1="63" y1="17" x2="56" y2="24"/><line x1="24" y1="56" x2="17" y2="63"/>
        </g>
      </svg>
      <span class="chat-fab-pulse"></span>
    </button>
    <div class="chat-window" id="chat-window">
      <div class="chat-header">
        <div class="chat-header-info">
          <svg class="chat-header-icon" viewBox="0 0 80 80" fill="none"><circle cx="40" cy="40" r="16" fill="#c9a84c"/><g stroke="#c9a84c" stroke-width="2" stroke-linecap="round"><line x1="40" y1="12" x2="40" y2="20"/><line x1="40" y1="60" x2="40" y2="68"/><line x1="12" y1="40" x2="20" y2="40"/><line x1="60" y1="40" x2="68" y2="40"/></g></svg>
          <div>
            <div class="chat-header-name">Anna's Creative Assistant</div>
            <div class="chat-header-status"><span class="chat-status-dot"></span> Online now</div>
          </div>
        </div>
        <button class="chat-close" id="chat-close" aria-label="Close chat">&times;</button>
      </div>
      <div class="chat-messages" id="chat-messages"></div>
      <div class="chat-suggestions" id="chat-suggestions">
        <button class="chat-suggestion" data-msg="What services does Anna offer?">Services</button>
        <button class="chat-suggestion" data-msg="Show me Anna's work">Work</button>
        <button class="chat-suggestion" data-msg="How much do projects cost?">Pricing</button>
        <button class="chat-suggestion" data-msg="How can I contact Anna?">Contact</button>
      </div>
      <div class="chat-input-wrap">
        <input type="text" class="chat-input" id="chat-input" placeholder="Ask me anything about Anna's work..." />
        <button class="chat-send" id="chat-send" aria-label="Send message">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(widget);

  // Elements
  const fab = document.getElementById('chat-fab');
  const win = document.getElementById('chat-window');
  const closeBtn = document.getElementById('chat-close');
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');
  const messages = document.getElementById('chat-messages');
  const suggestions = document.getElementById('chat-suggestions');

  let isOpen = false;
  let hasGreeted = false;

  fab.addEventListener('click', () => toggle());
  closeBtn.addEventListener('click', () => toggle(false));
  sendBtn.addEventListener('click', () => sendMessage());
  input.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });

  // Suggestion buttons
  suggestions.querySelectorAll('.chat-suggestion').forEach(btn => {
    btn.addEventListener('click', () => {
      input.value = btn.dataset.msg;
      sendMessage();
    });
  });

  function toggle(force) {
    isOpen = force !== undefined ? force : !isOpen;
    win.classList.toggle('open', isOpen);
    fab.classList.toggle('hidden', isOpen);
    if (isOpen && !hasGreeted) {
      hasGreeted = true;
      setTimeout(() => addBotMessage(ANNA_KB.greeting), 400);
    }
    if (isOpen) setTimeout(() => input.focus(), 300);
  }

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    addUserMessage(text);
    input.value = '';
    suggestions.style.display = 'none';

    // Show typing indicator
    const typing = document.createElement('div');
    typing.className = 'chat-msg bot typing';
    typing.innerHTML = '<div class="chat-bubble"><span class="typing-dots"><span></span><span></span><span></span></span></div>';
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;

    setTimeout(() => {
      typing.remove();
      const response = getChatbotResponse(text);
      addBotMessage(response);
    }, 800 + Math.random() * 600);
  }

  function addUserMessage(text) {
    const msg = document.createElement('div');
    msg.className = 'chat-msg user';
    msg.innerHTML = `<div class="chat-bubble">${escapeHTML(text)}</div>`;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  function addBotMessage(text) {
    const msg = document.createElement('div');
    msg.className = 'chat-msg bot';
    // Simple markdown-like formatting
    let html = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n•/g, '<br>•');
    msg.innerHTML = `<div class="chat-bubble">${html}</div>`;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Inject chatbot styles
  const style = document.createElement('style');
  style.textContent = `
    #anna-chatbot { position: fixed; bottom: 24px; right: 24px; z-index: 10000; font-family: 'Inter', system-ui, sans-serif; }

    /* FAB */
    .chat-fab { width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #1a1a18 0%, #2a2a26 100%); border: 1.5px solid rgba(201,168,76,0.4); cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 32px rgba(26,26,24,0.3), 0 0 0 0 rgba(201,168,76,0.3); transition: all 0.35s cubic-bezier(0.25,0.46,0.45,0.94); position: relative; }
    .chat-fab:hover { transform: scale(1.08); box-shadow: 0 12px 40px rgba(26,26,24,0.4), 0 0 20px rgba(201,168,76,0.15); border-color: rgba(201,168,76,0.7); }
    .chat-fab.hidden { transform: scale(0); opacity: 0; pointer-events: none; }
    .chat-fab-icon { width: 28px; height: 28px; }
    .chat-fab-pulse { position: absolute; inset: -4px; border-radius: 50%; border: 2px solid rgba(201,168,76,0.4); animation: fabPulse 2.5s ease-out infinite; }
    @keyframes fabPulse { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(1.5); opacity: 0; } }

    /* WINDOW */
    .chat-window { position: absolute; bottom: 72px; right: 0; width: 380px; max-height: 560px; background: rgba(242,240,236,0.96); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border: 1px solid rgba(201,168,76,0.2); border-radius: 16px; box-shadow: 0 24px 80px rgba(26,26,24,0.25); display: flex; flex-direction: column; transform: scale(0.9) translateY(20px); opacity: 0; visibility: hidden; transition: all 0.35s cubic-bezier(0.25,0.46,0.45,0.94); overflow: hidden; }
    .chat-window.open { transform: scale(1) translateY(0); opacity: 1; visibility: visible; }

    /* HEADER */
    .chat-header { padding: 18px 20px; background: linear-gradient(135deg, #1a1a18 0%, #2a2a26 100%); display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(201,168,76,0.15); }
    .chat-header-info { display: flex; align-items: center; gap: 12px; }
    .chat-header-icon { width: 32px; height: 32px; }
    .chat-header-name { font-size: 13px; font-weight: 600; color: #faf9f6; letter-spacing: 0.02em; }
    .chat-header-status { font-size: 11px; color: rgba(250,249,246,0.5); display: flex; align-items: center; gap: 6px; }
    .chat-status-dot { width: 6px; height: 6px; border-radius: 50%; background: #4ade80; display: inline-block; }
    .chat-close { background: none; border: none; color: rgba(250,249,246,0.5); font-size: 24px; cursor: pointer; padding: 0 4px; transition: color 0.2s; line-height: 1; }
    .chat-close:hover { color: #c9a84c; }

    /* MESSAGES */
    .chat-messages { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 12px; max-height: 340px; min-height: 200px; }
    .chat-messages::-webkit-scrollbar { width: 4px; }
    .chat-messages::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.2); border-radius: 2px; }
    .chat-msg { display: flex; }
    .chat-msg.user { justify-content: flex-end; }
    .chat-msg.bot { justify-content: flex-start; }
    .chat-msg.user .chat-bubble { background: #1a1a18; color: #faf9f6; border-radius: 14px 14px 4px 14px; }
    .chat-msg.bot .chat-bubble { background: rgba(201,168,76,0.08); color: #1a1a18; border: 1px solid rgba(201,168,76,0.15); border-radius: 14px 14px 14px 4px; }
    .chat-bubble { padding: 12px 16px; max-width: 280px; font-size: 13px; line-height: 1.6; word-wrap: break-word; }
    .chat-bubble a { color: #c9a84c; text-decoration: underline; text-decoration-color: rgba(201,168,76,0.4); }
    .chat-bubble a:hover { text-decoration-color: #c9a84c; }
    .chat-bubble strong { font-weight: 600; }

    /* TYPING */
    .typing-dots { display: inline-flex; gap: 4px; }
    .typing-dots span { width: 6px; height: 6px; border-radius: 50%; background: rgba(201,168,76,0.5); animation: typingBounce 1.4s ease-in-out infinite; }
    .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
    .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes typingBounce { 0%, 60%, 100% { transform: translateY(0); } 30% { transform: translateY(-6px); } }

    /* SUGGESTIONS */
    .chat-suggestions { padding: 8px 20px 4px; display: flex; gap: 6px; flex-wrap: wrap; }
    .chat-suggestion { padding: 6px 14px; border: 1px solid rgba(201,168,76,0.25); background: transparent; color: #5a5a56; font-size: 11px; font-weight: 500; letter-spacing: 0.04em; cursor: pointer; border-radius: 20px; transition: all 0.2s; font-family: inherit; }
    .chat-suggestion:hover { background: rgba(201,168,76,0.1); border-color: rgba(201,168,76,0.5); color: #1a1a18; }

    /* INPUT */
    .chat-input-wrap { padding: 12px 16px; border-top: 1px solid rgba(201,168,76,0.12); display: flex; gap: 8px; align-items: center; }
    .chat-input { flex: 1; border: 1px solid rgba(201,168,76,0.2); background: rgba(250,249,246,0.8); padding: 10px 14px; font-size: 13px; font-family: inherit; outline: none; border-radius: 8px; color: #1a1a18; transition: border-color 0.2s; }
    .chat-input::placeholder { color: #9a9a94; }
    .chat-input:focus { border-color: rgba(201,168,76,0.5); }
    .chat-send { width: 36px; height: 36px; border-radius: 8px; background: #1a1a18; border: none; color: #c9a84c; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; flex-shrink: 0; }
    .chat-send:hover { background: #c9a84c; color: #1a1a18; }

    @media (max-width: 480px) {
      .chat-window { width: calc(100vw - 32px); right: -8px; bottom: 68px; max-height: 70vh; }
    }
  `;
  document.head.appendChild(style);
}

/* ========================================================
   8. HERO TEXT ANIMATION
   ======================================================== */
function initHeroTextAnimation() {
  const heroTagline = document.querySelector('.hero-tagline');
  if (!heroTagline) return;

  const words = heroTagline.querySelectorAll('.anim-word');
  if (!words.length) return;

  words.forEach((word, i) => {
    word.style.opacity = '0';
    word.style.transform = 'translateY(30px)';
    word.style.transition = `opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 0.12 + 0.3}s, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 0.12 + 0.3}s`;
  });

  setTimeout(() => {
    words.forEach(word => {
      word.style.opacity = '1';
      word.style.transform = 'translateY(0)';
    });
  }, 100);
}

/* ========================================================
   9. SMOOTH PAGE TRANSITIONS
   ======================================================== */
function initPageTransitions() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });

  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:')) return;
    a.addEventListener('click', e => {
      e.preventDefault();
      document.body.style.opacity = '0';
      setTimeout(() => { window.location.href = href; }, 350);
    });
  });
}

/* ========================================================
   INIT ALL
   ======================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initHeroTextAnimation();
  initTiltCards();
  initMagneticCursor();
  initMarquee();
  initLightbox();
  initChatbot();
  initPageTransitions();

  // Wait for GSAP to load
  if (typeof gsap !== 'undefined') {
    initScrollAnimations();
  } else {
    window.addEventListener('load', () => {
      setTimeout(initScrollAnimations, 100);
    });
  }
});
