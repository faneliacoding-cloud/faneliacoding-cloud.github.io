/* ============================================================
   THE JOY IN LIVING — AI Chatbot
   Rule-based decision tree with keyword matching
   Bilingual English/Spanish support
   Emergency detection for crisis situations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  injectChatbotIfMissing();
  initChatbot();
  initChatbotFade();
});

/* ============================================================
   AUTO-INJECT CHATBOT HTML ON PAGES THAT DON'T HAVE IT
   ============================================================ */

function injectChatbotIfMissing() {
  if (document.querySelector('.chatbot')) return; // already on page

  const lang = document.documentElement.lang || localStorage.getItem('joy-lang') || 'en';
  const isEs = lang === 'es';

  const html = `
  <div class="chatbot" id="chatbot">
    <div class="chatbot__panel" id="chatbot-panel">
      <div class="chatbot__header">
        <div class="chatbot__header-info">
          <div class="chatbot__header-avatar">💚</div>
          <div>
            <div class="chatbot__header-name">${isEs ? 'Asistente Joy' : 'Joy Assistant'}</div>
            <div class="chatbot__header-status">${isEs ? 'En línea' : 'Online'}</div>
          </div>
        </div>
        <button class="chatbot__close" aria-label="${isEs ? 'Cerrar chat' : 'Close chat'}">✕</button>
      </div>
      <div class="chatbot__messages" id="chatbot-messages"></div>
      <div class="chatbot__quick-actions">
        <button class="chatbot__quick-btn" data-query="${isEs ? 'servicios' : 'services'}">${isEs ? '🧠 Servicios' : '🧠 Services'}</button>
        <button class="chatbot__quick-btn" data-query="${isEs ? 'seguro' : 'insurance'}">${isEs ? '✅ Seguros' : '✅ Insurance'}</button>
        <button class="chatbot__quick-btn" data-query="${isEs ? 'cita' : 'appointment'}">${isEs ? '📅 Cita' : '📅 Book'}</button>
        <button class="chatbot__quick-btn" data-query="${isEs ? 'contacto' : 'contact'}">${isEs ? '📞 Contacto' : '📞 Contact'}</button>
      </div>
      <div class="chatbot__input-wrap">
        <input class="chatbot__input" type="text" placeholder="${isEs ? 'Escribe tu mensaje...' : 'Type a message...'}" autocomplete="off">
        <button class="chatbot__send" aria-label="Send">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    </div>
    <button class="chatbot__toggle" id="chatbot-toggle" aria-label="${isEs ? 'Abrir chat' : 'Open chat'}">
      <svg class="chatbot__icon-chat" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      <svg class="chatbot__icon-close" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  </div>`;

  document.body.insertAdjacentHTML('beforeend', html);
}

/* ============================================================
   MOUSE-IDLE FADE — fades out after 3s, reappears on move
   ============================================================ */

function initChatbotFade() {
  const chatbot = document.querySelector('.chatbot');
  if (!chatbot) return;

  let idleTimer = null;
  const IDLE_MS = 3000; // fade after 3 seconds of no movement

  function onMouseMove() {
    // Immediately show
    chatbot.classList.remove('chatbot--hidden');

    // Reset idle timer
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      // Only fade if panel is not open
      if (!chatbot.classList.contains('panel-open')) {
        chatbot.classList.add('chatbot--hidden');
      }
    }, IDLE_MS);
  }

  // Start listening
  document.addEventListener('mousemove', onMouseMove, { passive: true });
  document.addEventListener('touchstart', onMouseMove, { passive: true });

  // Kick off initial fade after 3s of no activity
  idleTimer = setTimeout(() => {
    if (!chatbot.classList.contains('panel-open')) {
      chatbot.classList.add('chatbot--hidden');
    }
  }, IDLE_MS);
}

/* --- Knowledge Base --- */
const KNOWLEDGE = {
  en: {
    greeting: "Hello! 👋 Welcome to The Joy In Living. I'm here to help you learn about our services, schedule a consultation, or find the information you need. How can I help you today?",
    services: {
      overview: "We offer a range of compassionate mental health services:\n\n🧠 **Individual Therapy** — Personalized support for adults dealing with anxiety, depression, trauma, and life transitions\n👫 **Couples & Family Therapy** — Strengthen relationships and improve communication\n👥 **Group Therapy** — Healing in community with shared experiences\n📋 **Immigration Psychological Evaluations** — Expert assessments for asylum, extreme hardship waivers, and VAWA cases\n📚 **Clinical Supervision** — For therapists seeking LCSW licensing\n💻 **Telehealth** — Convenient virtual sessions from anywhere in NY\n\nWould you like to learn more about any specific service?",
      individual: "**Individual Therapy** is personalized one-on-one support tailored to your unique needs. Our integrative approach combines evidence-based therapies (CBT, DBT, Psychodynamic) with holistic wellness strategies like breathwork, mindfulness, meditation, and journaling.\n\nWe work with adults experiencing:\n• Anxiety & worry\n• Depression\n• Trauma & PTSD\n• Grief & loss\n• Stress management\n• Life transitions\n• Relationship challenges\n\nSessions are available in-person and via telehealth, in English and Spanish.\n\n📞 Ready to start? Call (914) 686-2484 for a free 15-minute consultation.",
      couples: "**Couples & Family Therapy** helps strengthen relationships through improved communication, conflict resolution, and deeper emotional connection.\n\nWe provide a safe, non-judgmental space for partners and families to work through challenges including:\n• Communication difficulties\n• Trust rebuilding\n• Parenting challenges\n• Life transitions\n• Pre-marital counseling\n\n📞 Book a free consultation: (914) 686-2484",
      immigration: "**Immigration Psychological Evaluations** — We provide comprehensive psychological reports and clinical evaluations for immigration cases, including:\n\n📋 **Asylum Cases** — Documenting psychological impact of persecution\n📋 **Extreme Hardship Waivers** — Evaluating psychological hardship\n📋 **VAWA Cases** — Assessing impact of domestic violence\n\nOur provider, Claudia Christina Soddano, LCSW, has received specialized training with Physicians for Human Rights and the Columbia Human Rights Clinic. Assessments are available in English and Spanish, in-person or via teleconference.\n\nWe collaborate with attorneys throughout the Tri-State area.\n\n📞 For immigration evaluation inquiries: (914) 758-5286 or email csoddano@thejoyinliving.com",
      telehealth: "**Telehealth Sessions** make therapy accessible from anywhere in New York State.\n\n✅ No special app or download needed\n✅ Just need internet access and a private space\n✅ Secure, HIPAA-compliant video and audio\n✅ Link provided in your welcome email and appointment reminders\n✅ Available in English and Spanish\n\nLog in to your portal: TherapyPortal\n📞 Questions? Call (914) 686-2484",
      group: "**Group Therapy** offers healing through shared experiences in a supportive community setting. It's a powerful way to build connection and learn from others on similar journeys.\n\nAsk us about current group offerings by calling (914) 686-2484.",
      supervision: "**Clinical Supervision** is available for therapists working toward LCSW licensing or seeking guidance in specialized areas such as immigration cases, trauma, and culturally responsive practice.\n\n📞 Inquire at: csoddano@thejoyinliving.com"
    },
    contact: "Here's how to reach us:\n\n📞 **Phone:** (914) 686-2484\n📞 **Direct:** (914) 758-5286\n✉️ **Email:** reception@thejoyinliving.com\n📍 **Address:** 239 North Broadway, Suite LL 101, Sleepy Hollow, NY 10591\n\n🆓 We offer a **free 15-minute phone consultation** for new clients.\n\nWould you like to schedule a consultation?",
    insurance: "We accept the following insurance plans:\n\n✅ Aetna\n✅ BlueCross BlueShield\n✅ Cigna\n✅ MVP Health Care\n✅ Optum\n✅ Oscar Health\n✅ Oxford\n✅ UnitedHealthcare\n\nWe also partner with **Headway** to simplify insurance billing.\n\n**Fees (out-of-pocket):**\n• Individual: $150/session\n• Couples: $250/session\n\n**Payment methods:** Cash, Mastercard, Visa, Venmo, Zelle\n\nFor out-of-network coverage, we provide super bills for reimbursement.\n\n📞 Questions about coverage? Call (914) 686-2484",
    gettingStarted: "Getting started is easy! Here's the process:\n\n**Step 1: Free Consultation** 📞\nCall (914) 686-2484 or email reception@thejoyinliving.com for a free 15-minute phone consultation to discuss your needs and goals.\n\n**Step 2: Initial Assessment** 📋\nWe'll schedule an initial assessment to understand your unique situation and create a personalized treatment plan.\n\n**Step 3: Begin Your Journey** 🌿\nStart your therapy sessions — in person at our Sleepy Hollow office or via telehealth.\n\nWould you like to schedule your free consultation now?",
    about: "**The Joy In Living, LCSW, PLLC** is a minority woman-owned mental health and wellness practice in Sleepy Hollow, New York.\n\nFounded by **Claudia Christina Soddano, LCSW**, who brings over 20 years of experience in mental health. She holds an MSW from Fordham University and is licensed in New York State (License #074899).\n\nOur approach is **integrative and holistic**, combining evidence-based psychotherapy (CBT, DBT, Psychodynamic therapy, Motivational Interviewing) with wellness strategies including breathwork, trauma-informed yoga, meditation, and journaling.\n\nWe are proud to be **WBENC Certified** and serve clients in both **English and Spanish**.",
    portal: "You can access the **Patient Portal** through TherapyPortal. Through the portal, you can:\n\n📅 Check appointment availability\n📝 Complete required paperwork\n💻 Join your telehealth sessions\n📋 Request appointments\n\nYou'll receive portal access information in your welcome email. If you need help, call (914) 686-2484.",
    spanish: "¡Sí! Ofrecemos todos nuestros servicios en **inglés y español**. Nuestra fundadora, Claudia Christina Soddano, es bilingüe y brinda atención culturalmente sensible.\n\nPuede cambiar al español usando el botón EN/ES en la parte superior de la página.\n\n📞 Llame al (914) 686-2484 para una consulta gratuita en español.",
    hours: "For our current office hours, please call us at (914) 686-2484 or email reception@thejoyinliving.com. We accommodate schedules as much as possible, including some evening slots.",
    fallback: "I appreciate your question! For the most accurate answer, I'd recommend speaking with our team directly:\n\n📞 Call: (914) 686-2484\n✉️ Email: reception@thejoyinliving.com\n\nOr schedule a **free 15-minute consultation** to discuss your specific needs. We're here to help! 💚"
  },
  es: {
    greeting: "¡Hola! 👋 Bienvenido/a a The Joy In Living. Estoy aquí para ayudarte a conocer nuestros servicios, programar una consulta o encontrar la información que necesitas. ¿En qué puedo ayudarte hoy?",
    services: {
      overview: "Ofrecemos una variedad de servicios de salud mental:\n\n🧠 **Terapia Individual** — Apoyo personalizado para adultos\n👫 **Terapia de Pareja y Familia** — Fortalece las relaciones\n👥 **Terapia Grupal** — Sanación en comunidad\n📋 **Evaluaciones Psicológicas de Inmigración** — Para asilo, hardship, y VAWA\n📚 **Supervisión Clínica** — Para terapeutas\n💻 **Telesalud** — Sesiones virtuales\n\n¿Te gustaría saber más sobre algún servicio?",
      individual: "**Terapia Individual** — Apoyo personalizado que combina terapias basadas en evidencia (TCC, TDC, terapia psicodinámica) con estrategias de bienestar como respiración consciente, yoga, meditación y escritura terapéutica.\n\nTrabajamos con:\n• Ansiedad\n• Depresión\n• Trauma y TEPT\n• Duelo y pérdida\n• Estrés\n• Transiciones de vida\n\n📞 Llame al (914) 686-2484 para una consulta gratuita de 15 minutos.",
      immigration: "**Evaluaciones Psicológicas de Inmigración** — Proporcionamos informes psicológicos completos para casos de inmigración:\n\n📋 **Asilo** — Documentación del impacto psicológico de la persecución\n📋 **Exenciones por Dificultad Extrema** — Evaluación de dificultades psicológicas\n📋 **VAWA** — Evaluación del impacto de violencia doméstica\n\nDisponible en inglés y español, presencial o por teleconferencia.\n\n📞 Consultas: (914) 758-5286 o csoddano@thejoyinliving.com"
    },
    contact: "Puede contactarnos:\n\n📞 **Teléfono:** (914) 686-2484\n📞 **Directo:** (914) 758-5286\n✉️ **Correo:** reception@thejoyinliving.com\n📍 **Dirección:** 239 North Broadway, Suite LL 101, Sleepy Hollow, NY 10591\n\n🆓 Ofrecemos una **consulta telefónica gratuita de 15 minutos**.",
    insurance: "Aceptamos los siguientes seguros:\n\n✅ Aetna\n✅ BlueCross BlueShield\n✅ Cigna\n✅ MVP Health Care\n✅ Optum\n✅ Oscar Health\n✅ Oxford\n✅ UnitedHealthcare\n\n**Tarifas:**\n• Individual: $150/sesión\n• Parejas: $250/sesión\n\n📞 ¿Preguntas? Llame al (914) 686-2484",
    gettingStarted: "¡Comenzar es fácil!\n\n**Paso 1: Consulta Gratuita** 📞\nLlame al (914) 686-2484 para una consulta gratuita de 15 minutos.\n\n**Paso 2: Evaluación Inicial** 📋\nProgramamos una evaluación para entender su situación y crear un plan de tratamiento.\n\n**Paso 3: Comience su Camino** 🌿\nInicie sus sesiones de terapia, presencial o por telesalud.\n\n¿Le gustaría programar su consulta gratuita?",
    fallback: "¡Gracias por su pregunta! Para la respuesta más precisa, le recomiendo comunicarse directamente con nuestro equipo:\n\n📞 Llame: (914) 686-2484\n✉️ Correo: reception@thejoyinliving.com\n\nO programe una **consulta gratuita de 15 minutos**. ¡Estamos aquí para ayudarle! 💚"
  }
};

/* --- Emergency Keywords --- */
const EMERGENCY_KEYWORDS = {
  en: ['kill myself', 'suicide', 'want to die', 'end my life', 'self-harm', 'self harm', 'cutting myself',
       'hurt myself', 'overdose', 'end it all', 'take my life', 'don\'t want to live', 'suicidal',
       'abuse', 'being abused', 'domestic violence', 'someone is hurting me', 'in danger', 'emergency',
       'kill me', 'i want to die', 'harming myself', 'no reason to live', 'not worth living'],
  es: ['suicidio', 'matarme', 'quiero morir', 'hacerme daño', 'no quiero vivir', 'acabar con mi vida',
       'abuso', 'violencia', 'peligro', 'emergencia', 'me quiero morir', 'suicidarme',
       'me están maltratando', 'me golpean', 'autolesión']
};

const EMERGENCY_RESPONSE = {
  en: "🚨 **I hear you, and I want you to know that help is available right now.**\n\nPlease reach out immediately:\n\n🔴 **Call 911** for immediate emergency help\n📞 **Call or text 988** — Suicide & Crisis Lifeline (24/7)\n💬 **Text HOME to 741741** — Crisis Text Line\n\nYou are not alone. Your life matters, and trained counselors are ready to help you right now. ❤️\n\nIf you'd like to speak with our office, call (914) 686-2484.",
  es: "🚨 **Te escucho, y quiero que sepas que hay ayuda disponible ahora mismo.**\n\nPor favor comunícate inmediatamente:\n\n🔴 **Llama al 911** para emergencias inmediatas\n📞 **Llama o envía un mensaje al 988** — Línea de Prevención del Suicidio (24/7, en español)\n💬 **Envía un texto HOME al 741741** — Línea de Crisis\n\nNo estás solo/a. Tu vida importa, y hay profesionales listos para ayudarte ahora mismo. ❤️\n\nSi deseas hablar con nuestra oficina, llama al (914) 686-2484."
};

/* --- Keyword Matching Map --- */
const INTENT_MAP = {
  en: [
    { keywords: ['service', 'therapy', 'counseling', 'treatment', 'offer', 'help with', 'what do you', 'what can'], response: 'services.overview' },
    { keywords: ['individual', 'one on one', 'personal', 'myself', 'for me'], response: 'services.individual' },
    { keywords: ['couple', 'marriage', 'relationship', 'partner', 'family', 'parenting'], response: 'services.couples' },
    { keywords: ['immigration', 'asylum', 'hardship', 'vawa', 'waiver', 'evaluation', 'report', 'visa'], response: 'services.immigration' },
    { keywords: ['telehealth', 'virtual', 'online', 'remote', 'video', 'zoom'], response: 'services.telehealth' },
    { keywords: ['group'], response: 'services.group' },
    { keywords: ['supervision', 'lcsw', 'licensing', 'clinical supervision'], response: 'services.supervision' },
    { keywords: ['contact', 'phone', 'email', 'call', 'reach', 'address', 'location', 'where', 'office'], response: 'contact' },
    { keywords: ['insurance', 'payment', 'cost', 'fee', 'price', 'accept', 'cover', 'aetna', 'cigna', 'united', 'blue', 'headway', 'pay'], response: 'insurance' },
    { keywords: ['start', 'begin', 'first', 'new patient', 'appointment', 'schedule', 'book', 'consult', 'how to'], response: 'gettingStarted' },
    { keywords: ['about', 'who', 'claudia', 'therapist', 'background', 'qualification', 'credential', 'experience'], response: 'about' },
    { keywords: ['portal', 'login', 'log in', 'sign in', 'account', 'therapyportal'], response: 'portal' },
    { keywords: ['spanish', 'español', 'espanol', 'bilingual', 'habla'], response: 'spanish' },
    { keywords: ['hour', 'open', 'available', 'when'], response: 'hours' },
    { keywords: ['anxiety', 'anxious', 'worry', 'panic', 'nervous'], response: 'services.individual' },
    { keywords: ['depress', 'sad', 'hopeless', 'overwhelm'], response: 'services.individual' },
    { keywords: ['trauma', 'ptsd', 'abuse history'], response: 'services.individual' },
    { keywords: ['grief', 'loss', 'death', 'died', 'mourning', 'bereave'], response: 'services.individual' },
    { keywords: ['stress', 'burnout', 'exhausted', 'overwhelmed'], response: 'services.individual' }
  ],
  es: [
    { keywords: ['servicio', 'terapia', 'consejería', 'tratamiento', 'ayuda', 'ofrecen'], response: 'services.overview' },
    { keywords: ['individual', 'personal', 'para mí'], response: 'services.individual' },
    { keywords: ['inmigración', 'asilo', 'dificultad', 'vawa', 'evaluación', 'visa'], response: 'services.immigration' },
    { keywords: ['contacto', 'teléfono', 'correo', 'llamar', 'dirección', 'oficina', 'dónde'], response: 'contact' },
    { keywords: ['seguro', 'pago', 'costo', 'precio', 'aceptan', 'cobertura'], response: 'insurance' },
    { keywords: ['comenzar', 'empezar', 'primera', 'cita', 'consulta', 'cómo'], response: 'gettingStarted' },
    { keywords: ['ansiedad', 'depresión', 'trauma', 'estrés', 'duelo', 'tristeza'], response: 'services.individual' }
  ]
};

/* ============================================================
   CHATBOT INITIALIZATION
   ============================================================ */

function initChatbot() {
  const chatbot = document.querySelector('.chatbot');
  if (!chatbot) return;

  const toggle = chatbot.querySelector('.chatbot__toggle');
  const panel = chatbot.querySelector('.chatbot__panel');
  const closeBtn = chatbot.querySelector('.chatbot__close');
  const messagesContainer = chatbot.querySelector('.chatbot__messages');
  const input = chatbot.querySelector('.chatbot__input');
  const sendBtn = chatbot.querySelector('.chatbot__send');
  const quickActions = chatbot.querySelectorAll('.chatbot__quick-btn');

  // Detect language from page or localStorage
  let currentLang = localStorage.getItem('joy-lang') || document.documentElement.lang || 'en';
  if (currentLang !== 'en' && currentLang !== 'es') currentLang = 'en';

  let isOpen = false;
  let hasGreeted = false;

  // Toggle panel
  toggle.addEventListener('click', () => {
    isOpen = !isOpen;
    panel.classList.toggle('open', isOpen);
    chatbot.classList.toggle('panel-open', isOpen);
    toggle.querySelector('.chatbot__icon-chat').style.display = isOpen ? 'none' : 'block';
    toggle.querySelector('.chatbot__icon-close').style.display = isOpen ? 'block' : 'none';

    if (isOpen && !hasGreeted) {
      const kb = KNOWLEDGE[currentLang] || KNOWLEDGE.en;
      addBotMessage(kb.greeting);
      hasGreeted = true;
    }

    if (isOpen) {
      setTimeout(() => input.focus(), 300);
    }
  });

  // Close panel
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      isOpen = false;
      panel.classList.remove('open');
      chatbot.classList.remove('panel-open');
      toggle.querySelector('.chatbot__icon-chat').style.display = 'block';
      toggle.querySelector('.chatbot__icon-close').style.display = 'none';
    });
  }

  // Send message
  function handleSend() {
    const text = input.value.trim();
    if (!text) return;

    addUserMessage(text);
    input.value = '';

    // Show typing indicator
    const typingEl = showTyping();

    setTimeout(() => {
      removeTyping(typingEl);
      const response = getResponse(text);
      addBotMessage(response);
    }, 600 + Math.random() * 600);
  }

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSend();
  });

  // Quick action buttons
  quickActions.forEach(btn => {
    btn.addEventListener('click', () => {
      const query = btn.dataset.query;
      if (query) {
        addUserMessage(query);
        const typingEl = showTyping();
        setTimeout(() => {
          removeTyping(typingEl);
          const response = getResponse(query);
          addBotMessage(response);
        }, 500);
      }
    });
  });

  // --- Helper Functions ---

  function addBotMessage(text) {
    const div = document.createElement('div');
    div.className = 'chatbot__message chatbot__message--bot';
    div.innerHTML = formatMessage(text);
    messagesContainer.appendChild(div);
    scrollToBottom();
  }

  function addUserMessage(text) {
    const div = document.createElement('div');
    div.className = 'chatbot__message chatbot__message--user';
    div.textContent = text;
    messagesContainer.appendChild(div);
    scrollToBottom();
  }

  function addEmergencyMessage(text) {
    const div = document.createElement('div');
    div.className = 'chatbot__message chatbot__message--emergency';
    div.innerHTML = formatMessage(text);
    messagesContainer.appendChild(div);
    scrollToBottom();
  }

  function showTyping() {
    const div = document.createElement('div');
    div.className = 'chatbot__typing';
    div.innerHTML = '<span></span><span></span><span></span>';
    messagesContainer.appendChild(div);
    scrollToBottom();
    return div;
  }

  function removeTyping(el) {
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function formatMessage(text) {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }

  function detectLanguage(text) {
    const lower = text.toLowerCase();
    const spanishWords = ['hola', 'quiero', 'necesito', 'ayuda', 'terapia', 'servicio', 'cómo',
                          'dónde', 'cuánto', 'español', 'consulta', 'puedo', 'para', 'tengo',
                          'estoy', 'gracias', 'por favor', 'hablar', 'información'];
    const spanishCount = spanishWords.filter(w => lower.includes(w)).length;
    return spanishCount >= 2 ? 'es' : currentLang;
  }

  function getResponse(userText) {
    const lower = userText.toLowerCase();

    // Detect language from user input
    const detectedLang = detectLanguage(userText);
    const lang = detectedLang;

    // 1. Check for emergency keywords first
    const allEmergencyKeywords = [...(EMERGENCY_KEYWORDS.en || []), ...(EMERGENCY_KEYWORDS.es || [])];
    for (const keyword of allEmergencyKeywords) {
      if (lower.includes(keyword)) {
        // Use detected language for emergency response
        return EMERGENCY_RESPONSE[lang] || EMERGENCY_RESPONSE.en;
      }
    }

    // 2. Match intents
    const intents = INTENT_MAP[lang] || INTENT_MAP.en;
    for (const intent of intents) {
      for (const keyword of intent.keywords) {
        if (lower.includes(keyword)) {
          return resolveResponse(intent.response, lang);
        }
      }
    }

    // Also check the other language's intents as fallback
    const otherLang = lang === 'en' ? 'es' : 'en';
    const otherIntents = INTENT_MAP[otherLang] || [];
    for (const intent of otherIntents) {
      for (const keyword of intent.keywords) {
        if (lower.includes(keyword)) {
          return resolveResponse(intent.response, lang);
        }
      }
    }

    // 3. Fallback
    const kb = KNOWLEDGE[lang] || KNOWLEDGE.en;
    return kb.fallback;
  }

  function resolveResponse(path, lang) {
    const kb = KNOWLEDGE[lang] || KNOWLEDGE.en;
    const parts = path.split('.');
    let value = kb;
    for (const part of parts) {
      if (value && typeof value === 'object' && part in value) {
        value = value[part];
      } else {
        // Fallback to English
        value = KNOWLEDGE.en;
        for (const p of parts) {
          if (value && typeof value === 'object' && p in value) {
            value = value[p];
          } else {
            return kb.fallback;
          }
        }
        break;
      }
    }
    return typeof value === 'string' ? value : kb.fallback;
  }
}
