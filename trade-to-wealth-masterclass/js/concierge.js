/**
 * ============================================================
 *  TRADE TO WEALTH — AI CONCIERGE ENGINE
 *  Fully self-contained. No API keys. No third-party services.
 *  Rule-based NLP knowledge engine + lead capture.
 * ============================================================
 */

(function () {
  'use strict';

  // ── KNOWLEDGE BASE ────────────────────────────────────────
  const KB = {
    about: {
      keywords: ['what is','about','masterclass','program','course','overview','explain','tell me about'],
      answer: `The <strong>Trade To Wealth Masterclass</strong> is a live financial education program created by Coach Michael Haye and Coach Taneisha Haye. It teaches everyday families the foundational principles of trading, investing, and building generational wealth — from absolute beginner to confident, informed investor.<br><br>
Over 5,000 families have attended, with thousands reporting a completely transformed relationship with money.<br><br>
<em>This is financial education — not financial advice. Results vary by individual.</em>`
    },
    curriculum: {
      keywords: ['learn','curriculum','modules','topics','cover','teach','what you','lessons'],
      answer: `The masterclass covers <strong>5 core modules</strong>:<br><br>
<strong>01 — Financial Mindset</strong><br>Break free from scarcity thinking and develop a wealth consciousness.<br><br>
<strong>02 — Market Intelligence</strong><br>Learn how markets work, how to read charts, and how institutional money moves.<br><br>
<strong>03 — Trade To Wealth Framework</strong> ⭐ Core Module<br>The proprietary TTW system — entry strategies, trade management, and portfolio building.<br><br>
<strong>04 — Risk Management</strong><br>Position sizing, stop losses, and protecting your portfolio.<br><br>
<strong>05 — Building Long-Term Wealth</strong><br>Compound growth, passive income, and generational wealth structures.<br><br>
<em>Educational content only. Not financial advice.</em>`
    },
    beginner: {
      keywords: ['beginner','no experience','new','start','zero','never traded','first time','novice','complete beginner','know nothing'],
      answer: `Absolutely — the masterclass is <strong>designed for complete beginners</strong>. You need zero prior experience in trading or investing.<br><br>
Coach Michael and Coach Taneisha built the entire curriculum from the ground up to take someone with no financial background and walk them through every concept step by step.<br><br>
All levels are welcome. All backgrounds are respected. You don't need to speak "Wall Street" — they'll meet you exactly where you are.`
    },
    coaches: {
      keywords: ['coach','who is','michael','taneisha','haye','founder','instructor','teacher','who are'],
      answer: `<strong>Coach Michael Haye</strong> — Lead Wealth Educator<br>
Michael is a seasoned trader and investor with 18+ years of experience. He built his own wealth from scratch and now dedicates his life to making sure other families don't miss the opportunity he almost did.<br><br>
<strong>Coach Taneisha Haye</strong> — Wealth Strategy Coach<br>
Taneisha brings warmth, precision, and a deep passion for financial literacy to every session. She specializes in helping families build systems for long-term wealth preservation and transfer.<br><br>
Together they've helped <strong>5,000+ families</strong> across the country transform their financial lives.`
    },
    register: {
      keywords: ['register','sign up','how do i','reserve','seat','join','enroll','get in','book','apply'],
      answer: `To reserve your seat, <strong>scroll to the bottom of this page</strong> and fill out the registration form — it only takes about 30 seconds.<br><br>
You'll need your:<br>
• Full name<br>
• Email address<br>
• Phone number<br><br>
Seats are <strong>limited per session</strong> to ensure every attendee gets maximum value and coaching attention. Once you register, you'll receive a confirmation with all the details you need.<br><br>
👉 <a href="#register">Click here to jump to the registration form</a>`
    },
    cost: {
      keywords: ['cost','price','how much','free','paid','fee','pay','pricing','charge','expensive','affordable'],
      answer: `Registration for the <strong>next masterclass session is FREE</strong> — there's no cost to reserve your seat and attend the live experience.<br><br>
Simply fill out the form on this page to reserve your spot. Seats are limited, so we recommend registering early.`
    },
    community: {
      keywords: ['community','group','discord','members','network','together','support','accountability','other people'],
      answer: `When you join the Trade To Wealth Masterclass, you also gain access to the <strong>private TTW community</strong> — 12,000+ members strong.<br><br>
Inside you'll find:<br>
• <strong>Weekly live coaching sessions</strong> with Coach Michael and Coach Taneisha<br>
• <strong>Daily market discussions</strong> and real-time trade alerts<br>
• <strong>Accountability groups</strong> for peer support<br>
• <strong>Resource library</strong> — workbooks, tools, and tutorials<br>
• <strong>Private mentorship</strong> from experienced members<br><br>
It's not just a course — it's a family.`
    },
    results: {
      keywords: ['results','how much money','make money','profit','returns','gains','win','successful','outcome','how well','perform'],
      answer: `We celebrate real wins in our community — members sharing their first profitable trades, milestones, and breakthroughs.<br><br>
<div class="ttw-compliance">⚠️ <strong>Important disclaimer:</strong> Trade To Wealth is a financial education program. We do <strong>not</strong> guarantee any specific financial results or trading profits. All investing and trading involves risk. Results vary significantly by individual. Past performance is not indicative of future results.</div><br>
What we <em>do</em> guarantee is world-class financial education and a supportive community to help you learn, grow, and make more informed decisions.`
    },
    advice: {
      keywords: ['financial advice','advisor','recommendation','should i buy','should i sell','what stock','pick','suggest trade','tell me what to trade'],
      answer: `<div class="ttw-compliance">⚠️ <strong>Important:</strong> Trade To Wealth is a <strong>financial education program — not a financial advisory service</strong>. Our coaches and community members do not provide personalized financial or investment advice.<br><br>
Nothing discussed in the masterclass, community, or this chat should be construed as a buy/sell recommendation or professional financial advice. Always consult a licensed financial advisor before making investment decisions.</div><br>
What we <em>do</em> provide is the education and frameworks to help you understand markets and make your own informed decisions.`
    },
    virtual: {
      keywords: ['online','virtual','zoom','in person','location','where','format','attend','watch','live stream'],
      answer: `The masterclass is conducted <strong>live online</strong> — you can attend from anywhere in the world. All you need is an internet connection and a device.<br><br>
Sessions are conducted live with real-time Q&A, so you can ask your questions directly to the coaches. <strong>Replay access</strong> is also provided so you can revisit the material at your own pace.`
    },
    time: {
      keywords: ['how long','duration','hours','time','when','schedule','date','next session','upcoming'],
      answer: `The next masterclass session is being scheduled now — <strong>seats are limited and filling fast</strong>.<br><br>
The full program spans multiple sessions designed to be comprehensive but digestible. Each session includes live teaching, Q&A, and real examples.<br><br>
Register now to secure your spot and receive all session details by email once confirmed. 👉 <a href="#register">Reserve your seat</a>`
    },
    why: {
      keywords: ['why','different','unique','better','compare','vs','other course','worth it','why should i'],
      answer: `Three things make Trade To Wealth different:<br><br>
<strong>1. Our coaches have lived it</strong><br>
Coach Michael and Coach Taneisha didn't learn this from a textbook — they built real wealth from real struggle.<br><br>
<strong>2. Family-first focus</strong><br>
This isn't just about individual trading. It's about your entire household, your children, and the next generation.<br><br>
<strong>3. A real community</strong><br>
12,000+ active members who support each other's wealth-building journey every single day. It's not a course you buy and forget — it's a movement you join.`
    },
    testimonials: {
      keywords: ['testimonial','success story','reviews','people say','worked','experiences','real people'],
      answer: `Real results from real community members:<br><br>
<strong>Marcus J. (Atlanta, GA)</strong> — "Six months later, I've built a portfolio and my family is talking about money in a completely different way."<br><br>
<strong>Denise M. (Chicago, IL)</strong> — "Within 90 days I was profitable. Coach Mike and Coach Taneisha are REAL. This masterclass is the real deal."<br><br>
<strong>Keisha & Robert T. (Houston, TX)</strong> — "We're now both actively investing and teaching our kids about financial literacy. This is generational change."<br><br>
<em>Individual results vary. See our community for more stories.</em>`
    },
    hello: {
      keywords: ['hello','hi','hey','good morning','good afternoon','what up','howdy','greetings','sup'],
      answer: `Hey there! 👋 Welcome to the <strong>Trade To Wealth Masterclass</strong>.<br><br>
I'm your BUA Concierge — here to help you understand the program, meet the coaches, and figure out if this is the right move for your family.<br><br>
What can I help you with today?`
    },
    thanks: {
      keywords: ['thank','thanks','appreciate','helpful','great','perfect','awesome','love it'],
      answer: `You're very welcome! That's what I'm here for. 🙏<br><br>
If you're ready to take the next step, I'd love to help you reserve your seat. It takes about 30 seconds and it's completely free.<br><br>
Anything else I can help you with?`
    }
  };

  // ── QUICK REPLIES ─────────────────────────────────────────
  const QUICK_REPLIES = [
    { label: '📚 What will I learn?',         query: 'What will I learn in the masterclass?' },
    { label: '🌱 Is this beginner friendly?', query: 'Is this program good for complete beginners?' },
    { label: '👨‍💼 Who are the coaches?',       query: 'Who are Coach Michael and Coach Taneisha?' },
    { label: '🎟️ How do I register?',          query: 'How do I register and reserve my seat?' },
    { label: '📋 Is this financial advice?',  query: 'Is this financial advice or just education?' },
    { label: '💰 Cost & pricing',             query: 'How much does the masterclass cost?' },
  ];

  // ── LEAD STORAGE (localStorage) ──────────────────────────
  const LEADS_KEY = 'ttw_leads';
  const SESSION_KEY = 'ttw_session';

  function getLeads() {
    try { return JSON.parse(localStorage.getItem(LEADS_KEY) || '[]'); }
    catch { return []; }
  }
  function saveLead(lead) {
    const leads = getLeads();
    lead.id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    lead.timestamp = new Date().toISOString();
    leads.push(lead);
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
    return lead;
  }

  // ── RATE LIMITING ─────────────────────────────────────────
  let msgCount = 0;
  let lastReset = Date.now();
  const RATE_LIMIT = 40; // msgs per session
  function checkRate() {
    if (Date.now() - lastReset > 3600000) { msgCount = 0; lastReset = Date.now(); }
    return msgCount++ < RATE_LIMIT;
  }

  // ── NLP ENGINE ────────────────────────────────────────────
  function findIntent(text) {
    const t = text.toLowerCase();
    let best = null, bestScore = 0;
    for (const [intent, data] of Object.entries(KB)) {
      let score = 0;
      for (const kw of data.keywords) {
        if (t.includes(kw)) score += kw.split(' ').length;
      }
      if (score > bestScore) { bestScore = score; best = { intent, ...data }; }
    }
    return bestScore > 0 ? best : null;
  }

  function getResponse(text) {
    const match = findIntent(text);
    if (match) return { html: match.answer, intent: match.intent };

    // Fallback responses
    const fallbacks = [
      `That's a great question! I can help with information about the <strong>Trade To Wealth Masterclass</strong>, our coaches, what you'll learn, and how to register.<br><br>Could you rephrase, or try one of the quick reply buttons above?`,
      `I want to make sure I give you the right answer. Could you ask me about:<br>• What you'll learn<br>• The coaches<br>• How to register<br>• Pricing and details<br>• Whether it's beginner-friendly`,
      `I'm still learning! For the most complete answer, you can also reach out directly through the registration form and our team will be in touch. Is there something specific about the masterclass I can help with?`
    ];
    return { html: fallbacks[Math.floor(Math.random() * fallbacks.length)], intent: 'fallback' };
  }

  // ── CONVERSATION STATE ────────────────────────────────────
  let isOpen = false;
  let leadCaptured = false;
  let leadFormShown = false;
  let msgHistory = [];
  let messageCount = 0;
  let leadFormTimer = null;

  // ── HELPERS ───────────────────────────────────────────────
  function formatTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function escapeHTML(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  // ── DOM CREATION ──────────────────────────────────────────
  function createWidget() {
    // Inject CSS link
    if (!document.querySelector('link[href*="concierge.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'styles/concierge.css';
      document.head.appendChild(link);
    }

    const container = document.createElement('div');
    container.id = 'ttw-concierge';
    container.innerHTML = `
      <!-- Floating Bubble -->
      <button class="ttw-bubble" id="ttw-bubble-btn" aria-label="Open BUA Concierge" aria-expanded="false">
        <div class="ttw-bubble-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </div>
        <span class="ttw-bubble-label">Ask BUA Concierge</span>
        <span class="ttw-badge" id="ttw-badge" aria-label="1 new message">1</span>
      </button>
    `;
    document.body.appendChild(container);

    document.getElementById('ttw-bubble-btn').addEventListener('click', togglePanel);
  }

  function buildPanel() {
    const existing = document.getElementById('ttw-panel');
    if (existing) existing.remove();

    const panel = document.createElement('div');
    panel.className = 'ttw-panel';
    panel.id = 'ttw-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'BUA Concierge');
    panel.setAttribute('aria-modal', 'true');

    panel.innerHTML = `
      <!-- Header -->
      <div class="ttw-header">
        <div class="ttw-header-left">
          <div class="ttw-avatar">
            ◆
            <div class="ttw-avatar-ring"></div>
          </div>
          <div>
            <div class="ttw-header-name">BUA Concierge</div>
            <div class="ttw-header-status">
              <span class="ttw-online-dot"></span>
              BUA Concierge · Always Available
            </div>
          </div>
        </div>
        <button class="ttw-close-btn" id="ttw-close-btn" aria-label="Close chat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <!-- Messages -->
      <div class="ttw-messages" id="ttw-messages" role="log" aria-live="polite" aria-label="Chat messages"></div>

      <!-- Quick Replies -->
      <div class="ttw-quick-replies" id="ttw-quick-replies">
        <div class="ttw-qr-label">Quick questions</div>
        <div class="ttw-qr-grid" id="ttw-qr-grid"></div>
      </div>

      <!-- Input Bar -->
      <div class="ttw-input-bar" id="ttw-input-bar">
        <input
          class="ttw-input"
          id="ttw-input"
          type="text"
          placeholder="Ask anything about the masterclass..."
          aria-label="Type your message"
          maxlength="500"
          autocomplete="off"
        >
        <button class="ttw-send-btn" id="ttw-send-btn" aria-label="Send message">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>

      <!-- Footer brand -->
      <div class="ttw-footer-brand">TRADE TO WEALTH MASTERCLASS · AI CONCIERGE</div>
    `;

    document.getElementById('ttw-concierge').appendChild(panel);

    // Events
    document.getElementById('ttw-close-btn').addEventListener('click', closePanel);
    document.getElementById('ttw-send-btn').addEventListener('click', handleSend);
    document.getElementById('ttw-input').addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
    });

    // Build quick replies
    const grid = document.getElementById('ttw-qr-grid');
    QUICK_REPLIES.forEach(qr => {
      const btn = document.createElement('button');
      btn.className = 'ttw-qr-btn';
      btn.textContent = qr.label;
      btn.addEventListener('click', () => {
        hideQuickReplies();
        handleUserMessage(qr.query);
      });
      grid.appendChild(btn);
    });

    // Welcome message
    setTimeout(() => {
      addAIMessage(`Welcome to <strong>Trade To Wealth Masterclass</strong> 👋<br><br>
I'm your BUA Concierge. I can help you understand what you'll learn, meet the coaches, and figure out if this is the right fit for your family's financial goals.<br><br>
What would you like to know?`);
    }, 400);
  }

  // ── MESSAGE RENDERING ─────────────────────────────────────
  function addAIMessage(html, delay = 0) {
    const container = document.getElementById('ttw-messages');
    if (!container) return;

    if (delay > 0) {
      // Show typing indicator first
      const typing = document.createElement('div');
      typing.className = 'ttw-typing';
      typing.id = 'ttw-typing';
      typing.setAttribute('aria-label', 'AI is typing');
      typing.innerHTML = `<div class="ttw-dot"></div><div class="ttw-dot"></div><div class="ttw-dot"></div>`;
      container.appendChild(typing);
      scrollMessages();

      setTimeout(() => {
        typing.remove();
        renderAIBubble(html, container);
        scrollMessages();
      }, delay);
    } else {
      renderAIBubble(html, container);
      scrollMessages();
    }

    msgHistory.push({ role: 'ai', content: html, time: new Date().toISOString() });
  }

  function renderAIBubble(html, container) {
    const msg = document.createElement('div');
    msg.className = 'ttw-msg ttw-msg-ai';
    msg.innerHTML = `
      <div class="ttw-bubble-text">${html}</div>
      <div class="ttw-msg-time">${formatTime()}</div>
    `;
    container.appendChild(msg);
  }

  function addUserMessage(text) {
    const container = document.getElementById('ttw-messages');
    if (!container) return;
    const msg = document.createElement('div');
    msg.className = 'ttw-msg ttw-msg-user';
    msg.innerHTML = `
      <div class="ttw-bubble-text">${escapeHTML(text)}</div>
      <div class="ttw-msg-time">${formatTime()}</div>
    `;
    container.appendChild(msg);
    scrollMessages();
    msgHistory.push({ role: 'user', content: text, time: new Date().toISOString() });
  }

  function scrollMessages() {
    const container = document.getElementById('ttw-messages');
    if (container) container.scrollTop = container.scrollHeight;
  }

  // ── SEND FLOW ─────────────────────────────────────────────
  function handleSend() {
    const input = document.getElementById('ttw-input');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    handleUserMessage(text);
  }

  function handleUserMessage(text) {
    if (!checkRate()) {
      addAIMessage(`You've been very curious! 😊 I've reached my limit for this session. Please <a href="#register">register here</a> and our team will answer all your questions personally.`);
      return;
    }

    hideQuickReplies();
    addUserMessage(text);
    messageCount++;

    const { html } = getResponse(text);
    const thinkingTime = 800 + Math.random() * 700;
    addAIMessage(html, thinkingTime);

    // Trigger lead form after 3 user messages or on register intent
    if (!leadCaptured && !leadFormShown) {
      const isRegisterQuery = findIntent(text)?.intent === 'register';
      if (messageCount >= 3 || isRegisterQuery) {
        setTimeout(() => showLeadForm(), thinkingTime + 1200);
      }
    }
  }

  function hideQuickReplies() {
    const qr = document.getElementById('ttw-quick-replies');
    if (qr) qr.style.display = 'none';
  }

  // ── LEAD FORM ─────────────────────────────────────────────
  function showLeadForm() {
    if (leadFormShown || leadCaptured) return;
    leadFormShown = true;

    const inputBar = document.getElementById('ttw-input-bar');
    if (!inputBar) return;

    const form = document.createElement('div');
    form.className = 'ttw-lead-form';
    form.id = 'ttw-lead-form';
    form.innerHTML = `
      <div class="ttw-lead-title">🎟️ Reserve Your Free Seat</div>
      <div class="ttw-lead-subtitle">Enter your details to secure your spot at the next session</div>

      <div class="ttw-field">
        <input type="text" id="ttw-name" placeholder="Your full name" autocomplete="name" maxlength="80">
      </div>
      <div class="ttw-field">
        <input type="email" id="ttw-email" placeholder="Your email address" autocomplete="email" maxlength="120">
      </div>
      <div class="ttw-field">
        <input type="tel" id="ttw-phone" placeholder="Your phone number (optional)" autocomplete="tel" maxlength="20">
      </div>
      <div class="ttw-field">
        <select id="ttw-goal">
          <option value="" disabled selected>What's your main goal?</option>
          <option value="beginner">I'm a complete beginner — learn the basics</option>
          <option value="trading">Get into active trading</option>
          <option value="investing">Long-term investing and wealth building</option>
          <option value="family">Build generational wealth for my family</option>
          <option value="income">Create passive income streams</option>
          <option value="other">Something else</option>
        </select>
      </div>

      <label class="ttw-consent">
        <input type="checkbox" id="ttw-consent">
        <span class="ttw-consent-label">
          I consent to being contacted about the Trade To Wealth Masterclass. I understand this is financial education only, not financial advice. By submitting, I agree to the program's terms.
        </span>
      </label>

      <button class="ttw-submit-btn" id="ttw-submit-btn" disabled>Reserve My Free Seat →</button>
      <span class="ttw-skip-link" id="ttw-skip-link">Continue chatting instead</span>
    `;

    inputBar.parentNode.insertBefore(form, inputBar);

    // Consent gate
    document.getElementById('ttw-consent').addEventListener('change', function () {
      document.getElementById('ttw-submit-btn').disabled = !this.checked;
    });

    document.getElementById('ttw-skip-link').addEventListener('click', () => {
      form.remove();
    });

    document.getElementById('ttw-submit-btn').addEventListener('click', submitLead);

    scrollMessages();
  }

  function submitLead() {
    const name = (document.getElementById('ttw-name')?.value || '').trim();
    const email = (document.getElementById('ttw-email')?.value || '').trim();
    const phone = (document.getElementById('ttw-phone')?.value || '').trim();
    const goal = document.getElementById('ttw-goal')?.value || '';
    const consent = document.getElementById('ttw-consent')?.checked;

    if (!name) { alert('Please enter your name.'); return; }
    if (!email || !/\S+@\S+\.\S+/.test(email)) { alert('Please enter a valid email address.'); return; }
    if (!consent) { alert('Please check the consent box to continue.'); return; }

    const btn = document.getElementById('ttw-submit-btn');
    btn.disabled = true;
    btn.textContent = 'Saving...';

    const lead = saveLead({ name, email, phone, goal, consent: true, conversation: msgHistory, source: document.referrer || 'direct' });
    leadCaptured = true;

    setTimeout(() => {
      const form = document.getElementById('ttw-lead-form');
      if (form) form.remove();
      showSuccess(name);
      addAIMessage(`🎉 You're all set, <strong>${escapeHTML(name)}</strong>! Your seat has been reserved. Keep an eye on your inbox for confirmation details.<br><br>
In the meantime, feel free to ask me anything else about the program!`, 500);
    }, 800);
  }

  function showSuccess(name) {
    const inputBar = document.getElementById('ttw-input-bar');
    if (!inputBar) return;
    const success = document.createElement('div');
    success.className = 'ttw-success';
    success.innerHTML = `
      <div class="ttw-success-icon">🎉</div>
      <div class="ttw-success-title">You're In, ${escapeHTML(name.split(' ')[0])}!</div>
      <div class="ttw-success-body">Your seat has been reserved. Check your email for confirmation details from the Trade To Wealth team.</div>
    `;
    inputBar.parentNode.insertBefore(success, inputBar);
    setTimeout(() => success.remove(), 5000);
  }

  // ── PANEL OPEN / CLOSE ────────────────────────────────────
  function togglePanel() {
    isOpen ? closePanel() : openPanel();
  }

  function openPanel() {
    isOpen = true;
    const badge = document.getElementById('ttw-badge');
    if (badge) badge.style.display = 'none';

    const bubble = document.getElementById('ttw-bubble-btn');
    if (bubble) bubble.setAttribute('aria-expanded', 'true');

    buildPanel();

    // Trap focus
    setTimeout(() => {
      const input = document.getElementById('ttw-input');
      if (input) input.focus();
    }, 350);
  }

  function closePanel() {
    isOpen = false;
    const panel = document.getElementById('ttw-panel');
    if (panel) {
      panel.classList.add('ttw-closing');
      panel.addEventListener('animationend', () => panel.remove(), { once: true });
    }
    const bubble = document.getElementById('ttw-bubble-btn');
    if (bubble) bubble.setAttribute('aria-expanded', 'false');
  }

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) closePanel();
  });

  // ── INIT ──────────────────────────────────────────────────
  function init() {
    // Remove old concierge if present
    const old = document.getElementById('ai-concierge');
    if (old) old.remove();

    createWidget();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ── ADMIN ACCESS (global) ─────────────────────────────────
  // Visit /admin.html to access the lead dashboard
  window.TTWAdmin = {
    getLeads,
    exportCSV() {
      const leads = getLeads();
      if (!leads.length) { alert('No leads yet.'); return; }
      const headers = ['ID','Name','Email','Phone','Goal','Consent','Source','Timestamp'];
      const rows = leads.map(l => [
        l.id, l.name, l.email, l.phone || '', l.goal || '',
        l.consent ? 'Yes' : 'No', l.source || '', l.timestamp
      ].map(v => `"${String(v).replace(/"/g,'""')}"`).join(','));
      const csv = [headers.join(','), ...rows].join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ttw-leads-${new Date().toISOString().slice(0,10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

})();
