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
  'be well': "Oh, Be Well is truly something special. 🌿 Pamela poured her whole heart into this devotional — every page feels like a warm hand reaching out to yours. It's not just a book; it's a daily companion for the woman who's ready to stop running on empty and start living from a place of deep peace.\n\nAt $25, it's one of the most meaningful gifts you could give yourself — or someone you love. You can order it right here → https://a.co/d/0b1HjrZX 💛",

  'book pamela': "It would be such an honor to have Pamela speak at your event. She has this rare gift — the ability to walk into a room and make every single woman feel seen, valued, and deeply loved by God.\n\nWhether it's a women's conference, a ministry gathering, or a wellness retreat, she brings the kind of presence that changes people. Just reach out to info@pamelarochford.com and her team will take beautiful care of you. ✦",

  'encouragement': "Oh sweet soul — I'm so glad you came here today. Whatever you're carrying right now, you don't have to carry it alone. 💛\n\nHear this: You are not behind. You are not broken. You are not too much, and you are not too little. You are a woman in process — and that is holy.\n\n\"She is clothed with strength and dignity; she can laugh at the days to come.\" — Proverbs 31:25\n\nTake a slow breath with me. You are going to be okay. 🌿",

  'anxious': "I hear you, and I want you to know — what you're feeling is real, and it matters. Anxiety can feel so heavy, especially when you're trying to hold everything together.\n\nCan I invite you to try something? Place one hand on your heart. Take three slow, deep breaths — in through your nose, out through your mouth. Let your body remember that you are safe right now. 🌿\n\nPamela's devotionals were written for moments exactly like this one. Each morning practice helps quiet the noise and anchor you back in faith. You deserve that stillness. 💛",

  'grief': "I am so deeply sorry. Grief is one of the heaviest things a heart can hold — and there's no rushing through it, no doing it \"right.\" Please give yourself permission to feel everything you're feeling. 💛\n\nYou are not alone in this. God sees every tear. And Pamela's words were shaped by her own seasons of loss and healing — she writes not as someone who has all the answers, but as a woman who has sat in the dark and found light again.\n\n\"He heals the brokenhearted and binds up their wounds.\" — Psalm 147:3\n\nWould you like me to share a scripture that has brought comfort to so many women in seasons of grief? 🌿",

  'tired': "Beloved, I hear the exhaustion in your words — and I want you to know it's okay to be tired. You have been giving so much of yourself. 💛\n\nRest is not weakness. Rest is sacred. Even God rested. You are allowed to put things down, even just for a moment.\n\n\"Come to me, all you who are weary and burdened, and I will give you rest.\" — Matthew 11:28\n\nPamela's Be Well devotional has a beautiful morning practice that takes just five quiet minutes — enough to fill your cup before the day empties it again. You deserve that. 🌿",

  'lost': "That feeling of being lost — I want you to know, it doesn't mean you're failing. Sometimes feeling lost is just the beginning of finding a truer path. 💛\n\nPamela has walked through seasons of deep uncertainty herself, and she wrote Be Well for women who are searching — for purpose, for peace, for themselves. You came to the right place.\n\n\"Trust in the Lord with all your heart and lean not on your own understanding.\" — Proverbs 3:5\n\nWould you like to start the Be Well journey? Sometimes the first step is the most healing one. 🌿",

  'scripture': "Here is a word just for you today 🌿\n\n\"For I know the plans I have for you,\" declares the Lord, \"plans to prosper you and not to harm you, plans to give you hope and a future.\"\n— Jeremiah 29:11\n\nSit with that for a moment. Those plans haven't changed. Your story isn't finished. There is so much good still ahead of you. 💛",

  'prayer': "What a beautiful thing — to come here seeking prayer. 🌿\n\nLet us agree together:\n\nFather, I lift this precious woman before You. You know exactly what she's carrying today — the worries she hasn't spoken aloud, the hopes she's almost afraid to hold. Meet her here. Remind her that she is loved beyond measure, held beyond her understanding, and never, ever alone. Give her peace that passes understanding, and grace for today. Amen. 💛\n\nYou are covered, beautiful soul.",

  'about pamela': "Pamela Rochford is one of those rare women who carries wisdom like a quiet warmth — you feel it the moment you encounter her words. 💛\n\nShe has spent over 25 years as an educator in the New York City school system, poured decades into ministry alongside her husband Archbishop Robert J. Rochford Sr., and through it all — she learned that you cannot pour from an empty vessel.\n\nBe Well was born from her own journey of learning to honor her spirit, her body, and her soul. She writes not from a pedestal, but from the path — as a woman who has been tired, stretched, and renewed by grace. ✦",

  'contact': "Reaching out is such a courageous and beautiful step. 💛\n\nPamela's team welcomes every message with genuine warmth. Whether you're asking about the book, hoping to book her for an event, or simply need to know someone cares — you can reach them at info@pamelarochford.com.\n\nYou matter. Your question matters. Don't hesitate. 🌿",

  'default': "Thank you for being here — truly. This space was made for women like you. 🌿\n\nI'm Grace, your Be Well companion. I'm here to listen, to encourage, and to gently guide you — whether you need a scripture, want to know more about Pamela, or are looking for the devotional that could change your mornings.\n\nWhat's on your heart today? 💛"
};

function getResponse(msg) {
  const m = msg.toLowerCase();
  if (m.includes('book') && (m.includes('pamela') || m.includes('speak') || m.includes('event') || m.includes('conference'))) return responses['book pamela'];
  if (m.includes('be well') || m.includes('devotional') || m.includes('order') || m.includes('purchase') || m.includes('buy')) return responses['be well'];
  if (m.includes('anxi') || m.includes('overwhelm') || m.includes('stress') || m.includes('panic') || m.includes('worried') || m.includes('worry')) return responses['anxious'];
  if (m.includes('grief') || m.includes('griev') || m.includes('loss') || m.includes('died') || m.includes('death') || m.includes('mourning')) return responses['grief'];
  if (m.includes('tired') || m.includes('exhausted') || m.includes('burnout') || m.includes('worn out') || m.includes('drained') || m.includes('weary')) return responses['tired'];
  if (m.includes('lost') || m.includes('purpose') || m.includes('direction') || m.includes('confused')) return responses['lost'];
  if (m.includes('pray') || m.includes('prayer')) return responses['prayer'];
  if (m.includes('encouragement') || m.includes('encourage') || m.includes('hard') || m.includes('struggling') || m.includes('sad') || m.includes('hurting') || m.includes('broken')) return responses['encouragement'];
  if (m.includes('scripture') || m.includes('verse') || m.includes('bible') || m.includes('word') || m.includes('psalm') || m.includes('proverb')) return responses['scripture'];
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
