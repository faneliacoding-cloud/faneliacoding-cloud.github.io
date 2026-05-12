/* === MINDSET THERAPY — SCRIPT.JS === */

// === NAV SCROLL ===
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// === MOBILE NAV TOGGLE ===
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// === SCROLL ANIMATIONS ===
const observers = document.querySelectorAll('.fade-up, .fade-left, .fade-right');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
observers.forEach(el => io.observe(el));

// === CONTACT FORM ===
function handleFormSubmit(e) {
  e.preventDefault();
  document.getElementById('contactForm').style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
  document.getElementById('formSuccess').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// === CHATBOT ===
const trigger = document.getElementById('chatbotTrigger');
const panel = document.getElementById('chatbotPanel');
const closeBtn = document.getElementById('chatbotClose');

trigger.addEventListener('click', () => {
  panel.classList.toggle('open');
});
closeBtn.addEventListener('click', () => {
  panel.classList.remove('open');
});

function chatKeyPress(e) {
  if (e.key === 'Enter') sendChatMessage();
}

function sendQuickReply(text) {
  document.getElementById('quickReplies').style.display = 'none';
  appendUserMsg(text);
  setTimeout(() => appendBotMsg(getBotResponse(text)), 600);
}

function sendChatMessage() {
  const input = document.getElementById('chatbotInput');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  appendUserMsg(text);
  setTimeout(() => appendBotMsg(getBotResponse(text)), 700);
}

function appendUserMsg(text) {
  const msgs = document.getElementById('chatbotMessages');
  const div = document.createElement('div');
  div.className = 'chat-msg user';
  div.innerHTML = `<p>${escapeHtml(text)}</p>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function appendBotMsg(html) {
  const msgs = document.getElementById('chatbotMessages');
  const div = document.createElement('div');
  div.className = 'chat-msg bot';
  div.innerHTML = `<p>${html}</p>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function getBotResponse(msg) {
  const m = msg.toLowerCase();

  // CRISIS CHECK — always first
  if (m.includes('suicid') || m.includes('kill myself') || m.includes('end my life') || m.includes('crisis') || m.includes('emergency') || m.includes('hurt myself')) {
    return `<strong>If you are in crisis, please reach out immediately:</strong><br>📞 Call or text <strong>988</strong> (Suicide & Crisis Lifeline)<br>📞 Or call <strong>911</strong> for emergencies.<br><br>You are not alone, and help is available right now. 💛`;
  }

  // Services
  if (m.includes('service') || m.includes('help with') || m.includes('treat') || m.includes('speciali')) {
    return `Mindset Therapy offers support for: Anxiety, Depression, Trauma, Grief & Loss, Life Transitions, Teens & Families, ADHD, and Mindfulness-Based Therapy.<br><br>All care is delivered by Aby Chacko, LCSW, using evidence-based, trauma-informed approaches. Would you like to book a free consultation?`;
  }

  // Insurance
  if (m.includes('insurance') || m.includes('coverage') || m.includes('aetna') || m.includes('cigna') || m.includes('medicare') || m.includes('united') || m.includes('blue cross') || m.includes('emblem') || m.includes('magna') || m.includes('1199')) {
    return `We accept most major insurance plans including: Aetna, Cigna, Medicare, United Healthcare, BlueCross BlueShield, MagnaCare, EmblemHealth, and 1199.<br><br>To verify your specific benefits, please call us at <strong>516-939-8867</strong> and we'll be happy to check for you.`;
  }

  // Booking / Consultation
  if (m.includes('book') || m.includes('appoint') || m.includes('consult') || m.includes('schedule') || m.includes('session')) {
    return `We offer a complimentary <strong>15-minute consultation</strong> for new clients — it's a gentle, no-pressure way to see if we're the right fit for you.<br><br>To schedule, call <strong>516-939-8867</strong> or fill out the contact form on our website. We respond within one business day.`;
  }

  // Telehealth
  if (m.includes('telehealth') || m.includes('online') || m.includes('virtual') || m.includes('video') || m.includes('remote')) {
    return `Yes! We offer <strong>secure telehealth sessions</strong> via video — fully confidential and HIPAA-compliant. This means you can receive quality therapy from the comfort and privacy of your own home. Just let us know your preference when you reach out.`;
  }

  // Location
  if (m.includes('location') || m.includes('address') || m.includes('where') || m.includes('office') || m.includes('east meadow') || m.includes('long island')) {
    return `Our office is located at:<br><strong>1975 Hempstead Turnpike, Suite 404<br>East Meadow, NY 11554</strong><br><br>We also offer telehealth for those who prefer virtual sessions.`;
  }

  // About therapist
  if (m.includes('aby') || m.includes('therapist') || m.includes('lcsw') || m.includes('about') || m.includes('background') || m.includes('credentials')) {
    return `Aby Chacko, LCSW is a Licensed Clinical Social Worker with over 10 years of experience. She specializes in CBT, DBT, and mindfulness-based approaches, and works with individuals, teens, and families.<br><br>Her practice is LGBTQ+ affirming, trauma-informed, and culturally sensitive. You can read her full bio on our website's <strong>About</strong> section.`;
  }

  // Free consultation
  if (m.includes('free') || m.includes('cost') || m.includes('price') || m.includes('fee') || m.includes('pay')) {
    return `We offer a <strong>free 15-minute consultation</strong> for all new clients. It's a warm, low-pressure conversation to help you decide if Mindset Therapy is the right fit.<br><br>For ongoing sessions, fees vary based on your insurance. Call <strong>516-939-8867</strong> for specifics.`;
  }

  // FAQs / general
  if (m.includes('faq') || m.includes('question') || m.includes('how') || m.includes('what')) {
    return `Great question! Here are a few things clients often ask:<br>• <strong>First session:</strong> A gentle, getting-to-know-you conversation — no pressure.<br>• <strong>Session length:</strong> Typically 45–50 minutes.<br>• <strong>Frequency:</strong> Most clients start with weekly sessions.<br>• <strong>Telehealth:</strong> Available and fully confidential.<br><br>Have a specific question? Call <strong>516-939-8867</strong> — we're happy to help.`;
  }

  // Greeting
  if (m.includes('hello') || m.includes('hi') || m.includes('hey')) {
    return `Hello, and welcome 💛 I'm here to answer general questions about Mindset Therapy. I can help with information about services, insurance, booking, telehealth, and more. What would you like to know?`;
  }

  // Default
  return `Thank you for reaching out. For the most accurate and personalized answer, please contact us directly:<br>📞 <strong>516-939-8867</strong><br><br>We typically respond within one business day and are always happy to help. Is there anything else I can assist you with?`;
}
