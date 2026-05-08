// ─── NAV SCROLL ───────────────────────────────────────────────
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ─── MOBILE MENU ──────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
  mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
});
function closeMobile() { mobileMenu.style.display = 'none'; }

// ─── SCROLL REVEAL ────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 100);
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── PARTICLES ────────────────────────────────────────────────
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * 1920,
      y: Math.random() * 1080,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: -Math.random() * 0.4 - 0.1,
      alpha: Math.random() * 0.6 + 0.2,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x % W, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,169,110,${p.alpha})`;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// ─── NEWSLETTER ───────────────────────────────────────────────
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('newsletter-email').value;
  if (!email) return;
  document.querySelector('.newsletter-form').style.display = 'none';
  document.getElementById('newsletter-thanks').style.display = 'block';
}

// ─── CHATBOT ──────────────────────────────────────────────────
const chatPanel = document.getElementById('chatbot-panel');

function toggleChat() {
  chatPanel.classList.toggle('open');
}

const responses = {
  'be well': "Be Well is Pamela's beautiful daily devotional — a sanctuary in book form, priced at $25. Each devotion invites you to slow down and reconnect with your whole self: mind, body, and spirit. You can order your copy at pamelarochford.com 🌿",
  'book pamela': "Pamela brings extraordinary depth and warmth to every stage. To book her for your conference, women's ministry, or event, please reach out to info@pamelarochford.com — her team responds with grace and care. ✦",
  'encouragement': "You are seen. You are held. You are exactly where you need to be today. 💛 Rest in this truth: 'She is clothed with strength and dignity; she can laugh at the days to come.' — Proverbs 31:25",
  'scripture': "Here is today's gift for your spirit 🌿\n\n\"For I know the plans I have for you, declares the Lord — plans to prosper you and not to harm you, plans to give you hope and a future.\" — Jeremiah 29:11",
  'about pamela': "Pamela Rochford is a distinguished educator with over 25 years of service, a devoted minister's wife, and a passionate wellness advocate for women. She wrote Be Well from her own journey of balancing faith, education, and wholeness. She is grace embodied. ✦",
  'contact': "You can reach Pamela's team with love at info@pamelarochford.com. Whether you're inquiring about the book, a speaking engagement, or simply want to connect — every message is welcomed with warmth.",
  'default': "That is a beautiful question. ✦ Pamela's heart is to guide women toward wholeness — in mind, body, and spirit. May I help you explore the Be Well devotional, learn about her speaking ministry, or find a scripture for your day? 🌿"
};

function getResponse(msg) {
  const m = msg.toLowerCase();
  if (m.includes('book') && (m.includes('pamela') || m.includes('speak') || m.includes('event') || m.includes('conference'))) return responses['book pamela'];
  if (m.includes('be well') || m.includes('devotional') || m.includes('order') || m.includes('purchase') || m.includes('buy')) return responses['be well'];
  if (m.includes('encouragement') || m.includes('hard') || m.includes('struggling') || m.includes('sad') || m.includes('lost')) return responses['encouragement'];
  if (m.includes('scripture') || m.includes('verse') || m.includes('bible') || m.includes('word')) return responses['scripture'];
  if (m.includes('about') || m.includes('who is') || m.includes('pamela')) return responses['about pamela'];
  if (m.includes('contact') || m.includes('email') || m.includes('reach')) return responses['contact'];
  return responses['default'];
}

function appendMessage(text, role) {
  const msgs = document.getElementById('chatbot-messages');
  const div = document.createElement('div');
  div.className = `chat-msg ${role}`;
  div.innerHTML = `<div class="chat-bubble">${text.replace(/\n/g, '<br>')}</div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function sendChatMessage() {
  const input = document.getElementById('chatbot-input');
  const text = input.value.trim();
  if (!text) return;
  appendMessage(text, 'user');
  input.value = '';
  document.getElementById('chat-prompts').style.display = 'none';
  setTimeout(() => appendMessage(getResponse(text), 'bot'), 700);
}

function sendPrompt(text) {
  appendMessage(text, 'user');
  document.getElementById('chat-prompts').style.display = 'none';
  setTimeout(() => appendMessage(getResponse(text), 'bot'), 700);
}

document.getElementById('chatbot-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') sendChatMessage();
});

// ─── MOBILE MENU STYLE INJECTION ──────────────────────────────
const style = document.createElement('style');
style.textContent = `
  .mobile-link {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.8rem;
    font-weight: 300;
    color: #5C3D2E;
    text-decoration: none;
    letter-spacing: 0.05em;
    transition: color 0.3s;
  }
  .mobile-link:hover { color: #C9A96E; }
`;
document.head.appendChild(style);
