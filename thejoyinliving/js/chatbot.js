/* ============================================================
   THE JOY IN LIVING — "Joy" AI Chatbot
   Conversational assistant with proactive intro, follow-up
   questions, state machine, personality, bilingual EN/ES
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  injectChatbotIfMissing();
  initChatbot();
  initChatbotFade();
});

/* ============================================================
   AUTO-INJECT CHATBOT HTML
   ============================================================ */

function injectChatbotIfMissing() {
  if (document.querySelector('.chatbot')) return;
  const isEs = window.location.pathname.includes('/es/');
  const html = `
  <div class="chatbot" id="chatbot">
    <div class="chatbot__panel" id="chatbot-panel">
      <div class="chatbot__header">
        <div class="chatbot__header-info">
          <div class="chatbot__header-avatar" style="background:linear-gradient(135deg,#3D4F3D,#6B8C6B);color:white;font-size:1.1rem;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:50%;width:36px;height:36px;flex-shrink:0;">J</div>
          <div>
            <div class="chatbot__header-name">Joy</div>
            <div class="chatbot__header-status">${isEs ? '✨ Asistente de The Joy In Living' : '✨ The Joy In Living Assistant'}</div>
          </div>
        </div>
        <button class="chatbot__close" aria-label="${isEs ? 'Cerrar' : 'Close'}">✕</button>
      </div>
      <div class="chatbot__messages" id="chatbot-messages"></div>
      <div class="chatbot__quick-actions" id="chatbot-quick-actions"></div>
      <div class="chatbot__input-wrap">
        <input class="chatbot__input" type="text" placeholder="${isEs ? 'Escríbeme...' : 'Message Joy...'}" autocomplete="off">
        <button class="chatbot__send" aria-label="Send">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    </div>
    <button class="chatbot__toggle" id="chatbot-toggle" aria-label="${isEs ? 'Hablar con Joy' : 'Chat with Joy'}">
      <div class="chatbot__toggle-avatar" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1.25rem;color:white;letter-spacing:0">J</div>
      <svg class="chatbot__icon-chat" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      <svg class="chatbot__icon-close" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      <div class="chatbot__notif-dot" style="position:absolute;top:2px;right:2px;width:10px;height:10px;background:#ff6b6b;border-radius:50%;border:2px solid white;animation:pulse 2s infinite;"></div>
    </button>
  </div>
  <style>
    @keyframes pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.3);opacity:.7}}
    .chatbot__toggle-avatar{pointer-events:none}
  </style>`;
  document.body.insertAdjacentHTML('beforeend', html);
}

/* ============================================================
   MOUSE-IDLE FADE
   ============================================================ */

function initChatbotFade() {
  const chatbot = document.querySelector('.chatbot');
  if (!chatbot) return;
  let idleTimer = null;
  const IDLE_MS = 3500;

  function onActivity() {
    chatbot.classList.remove('chatbot--hidden');
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      if (!chatbot.classList.contains('panel-open')) {
        chatbot.classList.add('chatbot--hidden');
      }
    }, IDLE_MS);
  }

  document.addEventListener('mousemove', onActivity, { passive: true });
  document.addEventListener('touchstart', onActivity, { passive: true });
  idleTimer = setTimeout(() => {
    if (!chatbot.classList.contains('panel-open')) chatbot.classList.add('chatbot--hidden');
  }, IDLE_MS);
}

/* ============================================================
   KNOWLEDGE BASE
   ============================================================ */

const KB = {
  en: {
    services: {
      overview: `At **The Joy In Living** we offer:\n\n🧠 **Individual Therapy** — Anxiety, depression, trauma, grief, life transitions ($150/session)\n👫 **Couples & Family Therapy** — Communication, trust, connection ($250/session)\n👥 **Group Therapy** — Healing in community — ask us about current groups\n📋 **Immigration Evaluations** — Asylum, extreme hardship, VAWA cases\n📚 **Clinical Supervision** — For LCSW candidates\n💻 **Telehealth** — Secure virtual sessions across all of NY\n\nWhich of these sounds most relevant to you?`,
      individual: `**Individual Therapy** ($150/session) helps adults work through:\n\n• Anxiety & panic attacks\n• Depression & low mood\n• Trauma & PTSD\n• Grief & loss\n• Life transitions\n• Burnout & stress\n• Identity & self-worth\n\nWe use an integrative approach combining **CBT, DBT, Psychodynamic therapy**, and holistic tools like mindfulness and breathwork.\n\nSessions available **in-person** (Sleepy Hollow, NY) or via **telehealth**.\n\nWould you like to know how to get started?`,
      couples: `**Couples & Family Therapy** ($250/session) creates a safe space for:\n\n• Improving communication\n• Rebuilding trust after betrayal\n• Navigating parenting challenges\n• Pre-marital preparation\n• Blended family dynamics\n• Cultural & generational differences\n\nBoth partners attend sessions together. Some couples also benefit from individual sessions alongside couples work.\n\nWould you like to schedule a free consultation?`,
      immigration: `**Immigration Psychological Evaluations** are comprehensive reports for immigration courts and USCIS.\n\nWe provide evaluations for:\n📋 **Asylum cases** — documenting trauma & persecution\n📋 **Extreme Hardship Waivers (I-601/601A)**\n📋 **VAWA petitions** — domestic violence impact\n\nOur founder Claudia Soddano, LCSW has specialized training from **Physicians for Human Rights (PHR)** and **Columbia Human Rights Initiative (CHRIA)**.\n\nEvaluations available in **English and Spanish**, in-person or by teleconference.\n\n📞 Call (914) 758-5286 or email csoddano@thejoyinliving.com`,
      telehealth: `**Telehealth** makes therapy possible from anywhere in New York State.\n\n✅ No app download — works in any browser\n✅ HIPAA-compliant & encrypted\n✅ Phone, tablet, or computer\n✅ English & Spanish\n✅ Covered by most insurance plans\n\n🔗 Patient Portal: therapyportal.com/p/joyliving/\n\nWould you like to know what a first virtual session looks like?`,
      group: `**Group Therapy** offers healing through shared experience and community connection.\n\nCall us at (914) 686-2484 to ask about current group offerings and availability.`,
      supervision: `**Clinical Supervision** is available for therapists working toward LCSW licensure.\n\nSpecializations include immigration cases, trauma, and culturally responsive practice.\n\n📧 Email: csoddano@thejoyinliving.com`
    },
    insurance: `We accept these insurance plans:\n\n✅ Aetna\n✅ BlueCross BlueShield\n✅ Cigna\n✅ MVP Health Care\n✅ Optum\n✅ Oscar Health\n✅ Oxford\n✅ UnitedHealthcare\n\nWe partner with **Headway** to simplify billing.\n\n**Self-pay rates:**\n• Individual: $150/session\n• Couples: $250/session\n\n**Payment accepted:** Cash, Mastercard, Visa, Venmo, Zelle, Apple Pay, Google Pay\n\nDo you have a specific insurance plan I can help you check?`,
    contact: `Here's how to reach us:\n\n📞 **(914) 686-2484** — general line\n📞 **(914) 758-5286** — direct\n✉️ reception@thejoyinliving.com\n📍 239 North Broadway, Suite LL 101\n   Sleepy Hollow, NY 10591\n\n🆓 **Free 15-min phone consultation** for new clients!\n\nWould you like me to help you figure out what to ask during that first call?`,
    start: `Getting started is simple:\n\n1️⃣ **Free Consultation** — Call (914) 686-2484 for a free 15-min phone call\n2️⃣ **Initial Assessment** — We'll understand your situation & goals\n3️⃣ **Begin Therapy** — In-person or telehealth, in English or Spanish\n\nMost clients feel relief just from making that first call. 🌿\n\nIs there anything holding you back from reaching out?`,
    about: `**The Joy In Living, LCSW, PLLC** is a minority woman-owned mental health practice in Sleepy Hollow, NY.\n\n**Claudia Christina Soddano, LCSW** — Founder\n• 20+ years of clinical experience\n• MSW from Fordham University\n• NY State LCSW License #074899\n• WBENC Certified\n• Trained by Physicians for Human Rights & Columbia CHRIA\n• Fully bilingual: English & Spanish\n\nHer approach combines **CBT, DBT, Psychodynamic therapy, Motivational Interviewing** with holistic tools like breathwork, mindfulness, trauma-informed yoga, and journaling.\n\nIs there something specific about the practice you'd like to know?`,
    portal: `The **Patient Portal** is at:\n🔗 therapyportal.com/p/joyliving/\n\nThrough the portal you can:\n📅 View appointment availability\n📝 Complete intake paperwork\n💻 Join telehealth sessions\n📋 Request appointments\n\nYou'll get access details in your welcome email. Need help? Call (914) 686-2484.`,
    hours: `For current office hours, please call (914) 686-2484 or email reception@thejoyinliving.com.\n\nWe accommodate as many schedule needs as possible, including some **evening and weekend slots**.`,
    spanish: `¡Por supuesto! All of our services are available in **English and Spanish**.\n\nClaudia Soddano, LCSW is fully bilingual and provides culturally sensitive care.\n\n📞 Call (914) 686-2484 for a free Spanish-language consultation.\n\nYou can also switch to Spanish using the EN/ES button at the top of any page.`,
    anxiety: `Anxiety is one of the most common reasons people seek therapy — and one of the most treatable.\n\nSymptoms like worry, racing thoughts, panic attacks, or physical tension are your nervous system asking for support.\n\nAt The Joy In Living, we use **CBT and mindfulness-based approaches** to help you:\n• Understand what's driving your anxiety\n• Challenge the thought patterns that amplify it\n• Build practical coping tools that work\n\nMost clients see meaningful improvement within 8–12 sessions.\n\nWould you like to learn about scheduling a consultation?`,
    depression: `Depression can feel like a heavy fog — exhausting, isolating, and hard to explain.\n\nTherapy — especially **CBT and psychodynamic approaches** — is one of the most effective treatments for depression.\n\nWe work with clients experiencing:\n• Low or flat mood\n• Loss of interest and motivation\n• Difficulty concentrating\n• Sleep and appetite changes\n• Feelings of hopelessness or worthlessness\n\nYou don't have to feel this way forever. Would you like to talk about taking a first step?`,
    grief: `Grief doesn't follow rules or timelines. Whether you've lost a person, a relationship, a home, or a version of yourself — your grief is real and it deserves space.\n\nOur therapists use **grief-informed, narrative, and somatic approaches** to help you:\n• Process your loss at your own pace\n• Find meaning without erasing pain\n• Reconnect with life while honoring what you've lost\n\nIs this something you're going through right now?`,
    fallback: `That's a great question — let me connect you with the right people to give you the most accurate answer.\n\n📞 **Call:** (914) 686-2484\n✉️ **Email:** reception@thejoyinliving.com\n\nOr use the button below to request your **free 15-minute consultation**. We'd love to hear from you. 💚`
  },
  es: {
    services: {
      overview: `En **The Joy In Living** ofrecemos:\n\n🧠 **Terapia Individual** — Ansiedad, depresión, trauma, duelo ($150/sesión)\n👫 **Terapia de Pareja y Familia** — Comunicación, confianza, conexión ($250/sesión)\n👥 **Terapia de Grupo** — Sanación en comunidad\n📋 **Evaluaciones de Inmigración** — Asilo, hardship, VAWA\n📚 **Supervisión Clínica** — Para candidatos a LCSW\n💻 **Telesalud** — Sesiones virtuales seguras en todo NY\n\n¿Cuál de estos servicios le resulta más relevante?`,
      individual: `**Terapia Individual** ($150/sesión) ayuda a adultos a trabajar:\n\n• Ansiedad y ataques de pánico\n• Depresión\n• Trauma y TEPT\n• Duelo y pérdida\n• Transiciones de vida\n• Agotamiento y estrés\n\nUsamos un enfoque integrativo con **TCC, TDC, terapia psicodinámica** y herramientas holísticas como mindfulness y respiración consciente.\n\n¿Le gustaría saber cómo comenzar?`,
      immigration: `**Evaluaciones Psicológicas de Inmigración** — Informes completos para cortes de inmigración y USCIS.\n\nEvaluaciones para:\n📋 **Asilo** — documentación de trauma\n📋 **Hardship Extremo (I-601/601A)**\n📋 **Peticiones VAWA**\n\nDisponible en **inglés y español**, presencial o por teleconferencia.\n\n📞 (914) 758-5286 | csoddano@thejoyinliving.com`
    },
    insurance: `Aceptamos estos seguros:\n\n✅ Aetna ✅ BlueCross BlueShield ✅ Cigna\n✅ MVP ✅ Optum ✅ Oscar ✅ Oxford ✅ UnitedHealthcare\n\n**Tarifas sin seguro:**\n• Individual: $150/sesión\n• Parejas: $250/sesión\n\n¿Tiene algún seguro específico que quiera consultar?`,
    contact: `Puede contactarnos:\n\n📞 **(914) 686-2484**\n✉️ reception@thejoyinliving.com\n📍 239 North Broadway, Suite LL 101, Sleepy Hollow, NY 10591\n\n🆓 **Consulta telefónica gratuita de 15 minutos** para nuevos clientes.`,
    start: `Comenzar es sencillo:\n\n1️⃣ **Consulta Gratuita** — Llame al (914) 686-2484\n2️⃣ **Evaluación Inicial** — Entendemos su situación y metas\n3️⃣ **Comience su Camino** — Presencial o telesalud, en español\n\n¿Hay algo que le impide dar ese primer paso?`,
    about: `**The Joy In Living, LCSW, PLLC** es una práctica de salud mental de propiedad de una mujer en Sleepy Hollow, NY.\n\n**Claudia Christina Soddano, LCSW:**\n• 20+ años de experiencia clínica\n• MSW de la Universidad Fordham\n• Licencia LCSW #074899 en NY\n• Certificada WBENC\n• Entrenada por Physicians for Human Rights\n• Completamente bilingüe`,
    fallback: `Gracias por su pregunta. Para la respuesta más precisa:\n\n📞 **(914) 686-2484**\n✉️ reception@thejoyinliving.com\n\nO programe una **consulta gratuita de 15 minutos**. ¡Estamos aquí para ayudarle! 💚`
  }
};

/* ============================================================
   EMERGENCY
   ============================================================ */

const EMERGENCY_KW = {
  en: ['kill myself','suicide','want to die','end my life','self-harm','self harm','cutting myself',
       'hurt myself','overdose','end it all','take my life','suicidal','i want to die','no reason to live',
       'not worth living','harming myself','abuse','being abused','domestic violence','in danger'],
  es: ['suicidio','matarme','quiero morir','hacerme daño','no quiero vivir','acabar con mi vida',
       'abuso','violencia doméstica','peligro','me quiero morir','suicidarme','autolesión']
};

const EMERGENCY_RESP = {
  en: `🚨 **I hear you. Please know that help is available right now.**\n\n🔴 **Call 911** — immediate emergency\n📞 **Call or text 988** — Suicide & Crisis Lifeline (24/7)\n💬 **Text HOME to 741741** — Crisis Text Line\n\nYou are not alone. Your life matters. ❤️\n\nIf you'd like to speak with our office: (914) 686-2484`,
  es: `🚨 **Te escucho. Hay ayuda disponible ahora mismo.**\n\n🔴 **Llama al 911** — emergencia inmediata\n📞 **Llama al 988** — Línea de Crisis (24/7, en español)\n💬 **Envía HOME al 741741** — Línea de Crisis por texto\n\nNo estás solo/a. Tu vida importa. ❤️\n\nSi deseas hablar con nuestra oficina: (914) 686-2484`
};

/* ============================================================
   CONVERSATION STATE MACHINE
   ============================================================ */

// States Joy can be in
const STATE = {
  INTRO:        'intro',        // just opened, about to ask first question
  ASKED_NAME:   'asked_name',   // asked for name, waiting
  ASKED_REASON: 'asked_reason', // asked why they're here, waiting
  OPEN:         'open',         // free conversation
  FOLLOW_UP:    'follow_up',    // just gave an answer, expecting follow-up
};

/* ============================================================
   QUICK-ACTION CHIPS
   ============================================================ */

const QUICK_CHIPS = {
  intro: {
    en: ['😟 Anxiety / Depression','💔 Grief / Trauma','👫 Couples Therapy','📋 Immigration Eval','💬 Just Exploring'],
    es: ['😟 Ansiedad / Depresión','💔 Duelo / Trauma','👫 Terapia de Pareja','📋 Evaluación de Inmigración','💬 Solo Explorando']
  },
  services: {
    en: ['🧠 Individual Therapy','👫 Couples Therapy','💻 Telehealth','📋 Immigration Evals','💰 Insurance & Fees'],
    es: ['🧠 Terapia Individual','👫 Terapia de Pareja','💻 Telesalud','📋 Evaluaciones','💰 Seguros y Tarifas']
  },
  schedule: {
    en: ['📞 Call Now','📧 Send Email','🔗 Patient Portal','❓ More Questions'],
    es: ['📞 Llamar Ahora','📧 Enviar Correo','🔗 Portal del Paciente','❓ Más Preguntas']
  }
};

/* ============================================================
   INTENT MAP
   ============================================================ */

const INTENT_MAP = {
  en: [
    { kw: ['anxious','anxiety','panic','nervous','worry','worried'],    key: 'anxiety' },
    { kw: ['depress','sad','hopeless','empty','numb','low mood','worthless'], key: 'depression' },
    { kw: ['grief','griev','loss','lost','died','death','mourn','bereave','bereavement'], key: 'grief' },
    { kw: ['trauma','ptsd','abuse history','survived'],                key: 'services.individual' },
    { kw: ['couple','marriage','partner','relationship'],              key: 'services.couples' },
    { kw: ['family','parenting','child','kid','teen'],                 key: 'services.couples' },
    { kw: ['individual','one on one','personal','for me','myself'],    key: 'services.individual' },
    { kw: ['immigration','asylum','hardship','vawa','visa','waiver'],  key: 'services.immigration' },
    { kw: ['telehealth','virtual','online','remote','video'],          key: 'services.telehealth' },
    { kw: ['group'],                                                   key: 'services.group' },
    { kw: ['supervision','lcsw','license'],                            key: 'services.supervision' },
    { kw: ['insurance','coverage','aetna','cigna','united','bcbs','blue cross','optum','oscar','mvp'], key: 'insurance' },
    { kw: ['cost','fee','price','pay','afford','rate','how much'],     key: 'insurance' },
    { kw: ['contact','phone','call','email','address','location','where','office'], key: 'contact' },
    { kw: ['start','begin','first time','new','appointment','schedule','book','consult','sign up'], key: 'start' },
    { kw: ['about','who','claudia','founder','background','credential','experience','training'], key: 'about' },
    { kw: ['portal','login','log in','sign in','therapyportal'],       key: 'portal' },
    { kw: ['spanish','español','bilingual','hablas','do you speak'],   key: 'spanish' },
    { kw: ['hours','open','schedule','when','available','time'],       key: 'hours' },
    { kw: ['service','therapy','what do you','what can you','help with','offer'], key: 'services.overview' },
  ],
  es: [
    { kw: ['ansiedad','ansioso','pánico','nervios','preocupación'],    key: 'services.individual' },
    { kw: ['depresión','triste','vacío','sin esperanza'],              key: 'services.individual' },
    { kw: ['duelo','pérdida','muerte','luto'],                         key: 'grief' },
    { kw: ['trauma','abuso','sobreviví'],                              key: 'services.individual' },
    { kw: ['pareja','matrimonio','relación'],                          key: 'services.couples' },
    { kw: ['inmigración','asilo','dificultad','vawa','visa'],          key: 'services.immigration' },
    { kw: ['telesalud','virtual','en línea'],                          key: 'services.telehealth' },
    { kw: ['seguro','cobertura','costo','precio','pago'],              key: 'insurance' },
    { kw: ['contacto','teléfono','correo','dónde','dirección'],        key: 'contact' },
    { kw: ['comenzar','empezar','primera','cita','consulta'],          key: 'start' },
    { kw: ['servicio','terapia','ayuda','ofrece'],                     key: 'services.overview' },
  ]
};

/* ============================================================
   CHATBOT INITIALIZATION
   ============================================================ */

function initChatbot() {
  const chatbot = document.querySelector('.chatbot');
  if (!chatbot) return;

  const toggle    = chatbot.querySelector('.chatbot__toggle');
  const panel     = chatbot.querySelector('.chatbot__panel');
  const closeBtn  = chatbot.querySelector('.chatbot__close');
  const msgBox    = chatbot.querySelector('.chatbot__messages');
  const input     = chatbot.querySelector('.chatbot__input');
  const sendBtn   = chatbot.querySelector('.chatbot__send');
  const quickWrap = chatbot.querySelector('.chatbot__quick-actions');

  let lang       = window.location.pathname.includes('/es/') ? 'es' : 'en';
  let isOpen     = false;
  let state      = STATE.INTRO;
  let userName   = '';
  let hasOpened  = false;

  // ── Language live-switch ─────────────────────────────────────
  document.addEventListener('joy:langchange', (e) => {
    const nl = e.detail?.lang;
    if (!nl || nl === lang) return;
    lang = nl;
    input.placeholder = lang === 'es' ? 'Escríbeme...' : 'Message Joy...';
    toggle.setAttribute('aria-label', lang === 'es' ? 'Hablar con Joy' : 'Chat with Joy');
    if (isOpen) {
      addBot(lang === 'es' ? '🌐 Cambié al español. ¿Cómo puedo ayudarte?' : '🌐 Switched to English. How can I help?');
    }
    hasOpened = false;
    state = STATE.INTRO;
  });

  // ── Toggle panel ─────────────────────────────────────────────
  toggle.addEventListener('click', () => {
    isOpen = !isOpen;
    panel.classList.toggle('open', isOpen);
    chatbot.classList.toggle('panel-open', isOpen);

    // Hide notification dot once opened
    const dot = chatbot.querySelector('.chatbot__notif-dot');
    if (dot) dot.style.display = 'none';

    if (isOpen && !hasOpened) {
      hasOpened = true;
      startConversation();
    }

    if (isOpen) setTimeout(() => input.focus(), 350);
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      isOpen = false;
      panel.classList.remove('open');
      chatbot.classList.remove('panel-open');
    });
  }

  // ── Start conversation with Joy's intro ─────────────────────
  function startConversation() {
    const isEs = lang === 'es';
    // Opening message
    const opener = isEs
      ? `¡Hola! 💚 Soy **Joy**, tu asistente virtual de **The Joy In Living**.\n\nEstoy aquí para ayudarte a explorar nuestros servicios, responder tus preguntas y ayudarte a dar el primer paso.\n\n¿Cómo te llamas?`
      : `Hi there! 💚 I'm **Joy**, your virtual assistant at **The Joy In Living**.\n\nI'm here to help you explore our services, answer your questions, and support you in taking a first step.\n\nMay I ask your name?`;

    typeMessage(opener, () => {
      state = STATE.ASKED_NAME;
    });
  }

  // ── Handle send ─────────────────────────────────────────────
  function handleSend() {
    const text = input.value.trim();
    if (!text) return;
    addUser(text);
    input.value = '';
    clearChips();

    // Emergency check (always first)
    const lower = text.toLowerCase();
    const allKw = [...EMERGENCY_KW.en, ...EMERGENCY_KW.es];
    if (allKw.some(k => lower.includes(k))) {
      showTypingThen(() => addEmergency(EMERGENCY_RESP[lang] || EMERGENCY_RESP.en), 800);
      return;
    }

    // State machine
    if (state === STATE.ASKED_NAME) {
      // Extract name from their response
      const nameParts = text.trim().split(/\s+/);
      userName = nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1);
      // Now ask why they're here
      const isEs = lang === 'es';
      const followUp = isEs
        ? `Mucho gusto, **${userName}** 😊\n\n¿Qué te trajo hoy a The Joy In Living? ¿Hay algo específico que estés enfrentando o buscando?`
        : `Nice to meet you, **${userName}**! 😊\n\nWhat brings you to The Joy In Living today? Is there something specific you're dealing with or looking for?`;
      showTypingThen(() => {
        addBot(followUp);
        showChips(QUICK_CHIPS.intro[lang] || QUICK_CHIPS.intro.en);
        state = STATE.ASKED_REASON;
      }, 700);
      return;
    }

    if (state === STATE.ASKED_REASON || state === STATE.OPEN || state === STATE.FOLLOW_UP) {
      const response = getResponse(text);
      showTypingThen(() => {
        addBot(response.text);
        if (response.chips) showChips(response.chips);
        state = STATE.FOLLOW_UP;
      }, 600 + Math.random() * 600);
    }
  }

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') handleSend(); });

  // ── Chip click ───────────────────────────────────────────────
  function showChips(chips) {
    if (!quickWrap) return;
    quickWrap.innerHTML = '';
    chips.forEach(label => {
      const btn = document.createElement('button');
      btn.className = 'chatbot__quick-btn';
      btn.textContent = label;
      btn.addEventListener('click', () => {
        addUser(label);
        clearChips();
        const lower = label.toLowerCase();
        const isEs = lang === 'es';

        // Map chip labels to keywords
        const chipMap = {
          'just exploring': 'services',
          'solo explorando': 'services',
          '📞 call now': '__call__',
          '📞 llamar ahora': '__call__',
          '📧 send email': '__email__',
          '📧 enviar correo': '__email__',
          '🔗 patient portal': 'portal',
          '🔗 portal del paciente': 'portal',
        };

        let trigger = label;
        for (const [k, v] of Object.entries(chipMap)) {
          if (lower.includes(k.toLowerCase())) {
            trigger = v;
            break;
          }
        }

        if (trigger === '__call__') {
          showTypingThen(() => {
            addBot(isEs ? `¡Perfecto! Llame a **El Joy In Living** ahora:\n📞 **(914) 686-2484**\n\n¿Hay algo más en lo que pueda ayudarle antes de llamar?`
                        : `Great! Call **The Joy In Living** now:\n📞 **(914) 686-2484**\n\nWould you like me to tell you what to expect on that first call?`);
            showChips(QUICK_CHIPS.schedule[lang] || QUICK_CHIPS.schedule.en);
          }, 500);
          return;
        }
        if (trigger === '__email__') {
          showTypingThen(() => addBot(isEs ? `Envíe un correo a:\n✉️ **reception@thejoyinliving.com**\n\nHacemos seguimiento de todos los mensajes dentro de 1 día hábil. ¿Necesita algo más?`
                                           : `Email us at:\n✉️ **reception@thejoyinliving.com**\n\nWe follow up within 1 business day. Is there anything else I can help with?`), 500);
          return;
        }

        const resp = getResponse(trigger);
        showTypingThen(() => {
          addBot(resp.text);
          if (resp.chips) showChips(resp.chips);
          state = STATE.FOLLOW_UP;
        }, 700);
      });
      quickWrap.appendChild(btn);
    });
  }

  function clearChips() {
    if (quickWrap) quickWrap.innerHTML = '';
  }

  // ── Get response ─────────────────────────────────────────────
  function getResponse(text) {
    const lower = text.toLowerCase();
    const detLang = detectLang(text);
    const intents = INTENT_MAP[detLang] || INTENT_MAP.en;

    for (const intent of intents) {
      for (const kw of intent.kw) {
        if (lower.includes(kw)) {
          return buildResponse(intent.key, detLang);
        }
      }
    }
    // Cross-language fallback
    const otherLang = detLang === 'en' ? 'es' : 'en';
    for (const intent of (INTENT_MAP[otherLang] || [])) {
      for (const kw of intent.kw) {
        if (lower.includes(kw)) {
          return buildResponse(intent.key, detLang);
        }
      }
    }
    // Personalised fallback
    const kb = KB[detLang] || KB.en;
    const isEs = detLang === 'es';
    const personal = userName
      ? (isEs ? `${userName}, no estoy segura sobre eso específicamente, pero nuestro equipo puede ayudarle:\n\n${kb.fallback}`
               : `${userName}, I'm not certain about that specifically, but our team can help:\n\n${kb.fallback}`)
      : kb.fallback;
    return { text: personal, chips: QUICK_CHIPS.schedule[detLang] || QUICK_CHIPS.schedule.en };
  }

  function buildResponse(key, l) {
    const kb = KB[l] || KB.en;
    const parts = key.split('.');
    let val = kb;
    for (const p of parts) {
      if (val && typeof val === 'object' && p in val) val = val[p];
      else { val = null; break; }
    }
    if (!val && l !== 'en') {
      val = KB.en;
      for (const p of parts) {
        if (val && typeof val === 'object' && p in val) val = val[p];
        else { val = null; break; }
      }
    }
    const text = typeof val === 'string' ? val : (KB[l] || KB.en).fallback;

    // Attach appropriate follow-up chips
    const chips =
      key.startsWith('services') ? (QUICK_CHIPS.schedule[l] || QUICK_CHIPS.schedule.en) :
      key === 'insurance'        ? (QUICK_CHIPS.schedule[l] || QUICK_CHIPS.schedule.en) :
      key === 'start'            ? (QUICK_CHIPS.schedule[l] || QUICK_CHIPS.schedule.en) :
      key === 'contact'          ? (QUICK_CHIPS.schedule[l] || QUICK_CHIPS.schedule.en) :
      null;

    return { text, chips };
  }

  // ── Helpers ──────────────────────────────────────────────────

  function detectLang(text) {
    const lower = text.toLowerCase();
    const esWords = ['hola','quiero','necesito','ayuda','terapia','servicio','cómo','dónde',
                     'cuánto','español','consulta','puedo','para','tengo','estoy','gracias'];
    return esWords.filter(w => lower.includes(w)).length >= 2 ? 'es' : lang;
  }

  function addBot(text) {
    const div = document.createElement('div');
    div.className = 'chatbot__message chatbot__message--bot';
    div.innerHTML = fmt(text);
    msgBox.appendChild(div);
    scroll();
  }

  function addUser(text) {
    const div = document.createElement('div');
    div.className = 'chatbot__message chatbot__message--user';
    div.textContent = text;
    msgBox.appendChild(div);
    scroll();
  }

  function addEmergency(text) {
    const div = document.createElement('div');
    div.className = 'chatbot__message chatbot__message--emergency';
    div.innerHTML = fmt(text);
    msgBox.appendChild(div);
    scroll();
  }

  function showTypingThen(fn, delay) {
    const dot = document.createElement('div');
    dot.className = 'chatbot__typing';
    dot.innerHTML = '<span></span><span></span><span></span>';
    msgBox.appendChild(dot);
    scroll();
    setTimeout(() => {
      if (dot.parentNode) dot.parentNode.removeChild(dot);
      fn();
    }, delay);
  }

  function typeMessage(text, onDone) {
    showTypingThen(() => {
      addBot(text);
      if (onDone) onDone();
    }, 900);
  }

  function fmt(text) {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }

  function scroll() {
    msgBox.scrollTop = msgBox.scrollHeight;
  }
}
