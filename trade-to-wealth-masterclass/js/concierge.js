/* =============================================
   TRADE TO WEALTH — AI WEALTH CONCIERGE
   Intelligent Q&A system
   ============================================= */

'use strict';

(function initConcierge() {
  const toggle    = document.getElementById('concierge-toggle');
  const panel     = document.getElementById('concierge-panel');
  const closeBtn  = document.getElementById('concierge-close');
  const input     = document.getElementById('concierge-input');
  const sendBtn   = document.getElementById('concierge-send');
  const messages  = document.getElementById('concierge-messages');
  const badge     = document.querySelector('.concierge-toggle-badge');

  if (!toggle || !panel) return;

  // ── KNOWLEDGE BASE ───────────────────────
  const KB = [
    {
      keys: ['learn', 'teach', 'curriculum', 'module', 'course', 'what', 'content'],
      answer: `You'll learn the complete <strong>Trade To Wealth Framework</strong> across 5 comprehensive modules:<br><br>
        📚 <strong>Module 1:</strong> Financial Mindset — rewiring your relationship with money<br>
        📈 <strong>Module 2:</strong> Market Intelligence — reading markets like a pro<br>
        🏆 <strong>Module 3:</strong> The TTW Framework — the proprietary trading system<br>
        🛡️ <strong>Module 4:</strong> Risk Management — protecting what you build<br>
        🌱 <strong>Module 5:</strong> Building Long-Term Wealth — generational strategies<br><br>
        All taught live by Coach Mike and Coach Taneisha.`
    },
    {
      keys: ['beginner', 'experience', 'new', 'start', 'know nothing', 'no experience', 'zero'],
      answer: `Absolutely beginner-friendly! 🙌<br><br>
        The masterclass is designed to take you from <strong>zero knowledge</strong> to confident investor. 
        Coach Mike and Coach Taneisha break everything down step-by-step, using real examples and plain language.<br><br>
        No prior trading or investing experience is required. All levels are welcome — beginners often get the most out of it!`
    },
    {
      keys: ['coach', 'who', 'mike', 'taneisha', 'founder', 'teacher', 'instructor'],
      answer: `Your coaches are <strong>Coach Mike</strong> and <strong>Coach Taneisha</strong> — the founders of Trade To Wealth Masterclass.<br><br>
        🎯 <strong>Coach Mike</strong> — Lead Wealth Educator with 10+ years of trading experience. He developed the Trade To Wealth Framework and has helped 5,000+ families.<br><br>
        💡 <strong>Coach Taneisha</strong> — Wealth Strategy Coach specializing in helping families shift from surviving to thriving. 8+ years in financial education.<br><br>
        Both coaches have lived the financial transformation they teach — this is real, not theory.`
    },
    {
      keys: ['register', 'sign up', 'join', 'enroll', 'reserve', 'seat', 'how to'],
      answer: `Reserving your seat is easy! 🎟️<br><br>
        1️⃣ Scroll down to the <strong>"Reserve Your Seat"</strong> section on this page<br>
        2️⃣ Fill in your name, email, and phone number<br>
        3️⃣ Submit the form — you'll get an instant confirmation<br><br>
        <strong>Seats are limited</strong> to ensure every attendee gets maximum coaching attention. 
        I recommend reserving now before the next session fills up!`
    },
    {
      keys: ['work', 'program', 'how', 'process', 'structure', 'format', 'live', 'online', 'virtual'],
      answer: `Here's how the masterclass works:<br><br>
        📱 <strong>100% Online</strong> — attend from anywhere in the world<br>
        🎤 <strong>Live Sessions</strong> — real-time coaching with both instructors<br>
        💬 <strong>Live Q&A</strong> — get your specific questions answered<br>
        🔄 <strong>Replays Available</strong> — review at your own pace<br>
        👥 <strong>Community Access</strong> — join 12,000+ wealth-building families<br>
        📚 <strong>Resources Included</strong> — workbooks, tools, and more<br><br>
        It's not just a course — it's a complete wealth-building experience.`
    },
    {
      keys: ['cost', 'price', 'how much', 'fee', 'free', 'pay', 'charge', 'money'],
      answer: `For current pricing and special offers, please <strong>reserve your seat</strong> using the registration form on this page — pricing details are provided during enrollment.<br><br>
        What I can tell you: thousands of families consider this the <em>best financial investment they've ever made</em>. The knowledge gained typically pays for itself many times over. 💰`
    },
    {
      keys: ['community', 'group', 'network', 'member', 'discord', 'facebook', 'support'],
      answer: `The Trade To Wealth community is one of its most valuable features! 🌟<br><br>
        As a member you get access to:<br>
        👥 <strong>12,000+ active members</strong> on the same wealth journey<br>
        📊 <strong>Daily trading discussions</strong> and market analysis<br>
        🎯 <strong>Accountability groups</strong> for staying on track<br>
        🏆 <strong>Live coaching sessions</strong> every week<br>
        📚 <strong>Growing education library</strong> — 24/7 access<br>
        🤝 <strong>Private mentorship</strong> from experienced wealth-builders`
    },
    {
      keys: ['guarantee', 'result', 'profit', 'return', 'make money', 'earn', 'income'],
      answer: `I want to be completely transparent with you:<br><br>
        Trade To Wealth Masterclass is a <strong>financial education program</strong>. We don't guarantee specific financial results or promise profits — and any program that does should be approached with caution.<br><br>
        What we <em>do</em> deliver: <strong>world-class financial education</strong> — the exact framework that has helped thousands of families transform their financial lives. Results depend on individual effort, market conditions, and application of the knowledge.<br><br>
        ⚠️ <em>All investing involves risk.</em>`
    },
    {
      keys: ['testimonial', 'review', 'success', 'story', 'student', 'result'],
      answer: `The results speak for themselves! 📣<br><br>
        <strong>5,000+</strong> families have gone through the program<br>
        <strong>97%</strong> would recommend it to others<br>
        <strong>4.9★</strong> average rating<br><br>
        Scroll down to the <strong>"Success Stories"</strong> section to read and watch real testimonials from students who have transformed their financial lives through Trade To Wealth.`
    },
    {
      keys: ['refund', 'cancel', 'money back'],
      answer: `For specific refund and cancellation policies, please reach out directly through the contact information provided after registration, or ask when you reserve your seat.<br><br>
        The team at Trade To Wealth is committed to your success and satisfaction. 🤝`
    }
  ];

  // ── RESPONSE ENGINE ──────────────────────
  function findResponse(userText) {
    const text = userText.toLowerCase();

    for (const entry of KB) {
      if (entry.keys.some(k => text.includes(k))) {
        return entry.answer;
      }
    }

    return `That's a great question! 💡<br><br>
      For the most accurate answer, I'd recommend:<br>
      1️⃣ Scrolling through the page — most details are covered in our sections below<br>
      2️⃣ Reserving your seat and the team will follow up with all the details<br><br>
      Is there anything else I can help you with? You can ask about the curriculum, the coaches, how to register, or what makes this masterclass unique.`;
  }

  // ── DOM HELPERS ──────────────────────────
  function addMessage(text, role) {
    const div = document.createElement('div');
    div.className = `concierge-msg concierge-msg-${role}`;

    const p = document.createElement('p');
    p.innerHTML = text;
    div.appendChild(p);

    const time = document.createElement('span');
    time.className = 'concierge-msg-time';
    time.textContent = 'Just now';
    div.appendChild(time);

    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function showTyping() {
    const div = document.createElement('div');
    div.className = 'concierge-msg concierge-msg-ai';
    div.id = 'typing-indicator';

    const typing = document.createElement('div');
    typing.className = 'concierge-typing';
    typing.setAttribute('aria-label', 'AI is typing');
    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('div');
      dot.className = 'typing-dot';
      typing.appendChild(dot);
    }

    div.appendChild(typing);
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function removeTyping() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
  }

  function respond(userText) {
    addMessage(userText, 'user');
    input.value = '';
    input.disabled = true;
    sendBtn.disabled = true;

    showTyping();

    const delay = 800 + Math.random() * 600;

    setTimeout(() => {
      removeTyping();
      const response = findResponse(userText);
      addMessage(response, 'ai');
      input.disabled = false;
      sendBtn.disabled = false;
      input.focus();
    }, delay);
  }

  // ── QUICK ACTIONS ────────────────────────
  document.querySelectorAll('.quick-action').forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.dataset.question;
      respond(q);
      // Hide quick actions after first use
      const qa = document.getElementById('concierge-quick-actions');
      if (qa) setTimeout(() => { qa.style.display = 'none'; }, 100);
    });
  });

  // ── SEND ─────────────────────────────────
  function handleSend() {
    const text = input.value.trim();
    if (!text) return;
    respond(text);
  }

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  });

  // ── OPEN / CLOSE ─────────────────────────
  function openPanel() {
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    if (badge) badge.style.display = 'none';
    setTimeout(() => input.focus(), 350);
  }

  function closePanel() {
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => {
    if (panel.hidden) openPanel();
    else closePanel();
  });

  closeBtn.addEventListener('click', closePanel);

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!document.getElementById('ai-concierge').contains(e.target)) {
      closePanel();
    }
  });

  // Keyboard: close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.hidden) closePanel();
  });

})();
