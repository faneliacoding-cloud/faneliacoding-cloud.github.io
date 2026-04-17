/**
 * Anna Figueroa — AI Creative Assistant Knowledge Base
 * Client-side conversational AI for portfolio inquiries
 */
const ANNA_KB = {
  name: "Anna Figueroa",
  role: "Creative Director & Production Leader",
  location: "New York City",
  email: "annalfigueroa1@gmail.com",
  linkedin: "https://www.linkedin.com/in/annafigueroa",
  instagram: "https://www.instagram.com/annalfigueroa/",
  projectMinimum: "$5,000",
  responseTime: "2 business days",
  availability: "Limited projects per season",

  greeting: "Hi there! 👋 I'm Anna's creative assistant. I can help you learn about her services, process, and past work — or point you to the right page. What can I help you with?",

  services: [
    {
      name: "Visual Systems & Brand Strategy",
      desc: "A high-touch audit and rebuild of your visual ecosystem across campaign, editorial, and e-commerce. Bringing clarity, cohesion, and stronger storytelling.",
      ideal: "Brands looking to redefine or elevate their visual identity across all channels."
    },
    {
      name: "Production Leadership",
      desc: "End-to-end leadership of photo and video productions, from budgets and briefs through crews, locations, and on-set execution.",
      ideal: "Teams needing an experienced hand to manage complex shoots from pre-production through wrap."
    },
    {
      name: "Brand & Content Strategy",
      desc: "Clear, compelling narratives rooted in your brand's DNA. Developed for campaigns, social, and evolving content ecosystems.",
      ideal: "Brands seeking a strategic narrative foundation for upcoming campaigns or content initiatives."
    },
    {
      name: "Creative Operations",
      desc: "Scalable systems and workflows aligning creative, marketing, and production — so ideas move efficiently from concept to launch.",
      ideal: "Growing teams that need structure and efficiency in their creative pipeline."
    },
    {
      name: "Casting & Creative Direction",
      desc: "Thoughtful talent casting and visual direction that bring authenticity, representation, and alignment to every frame.",
      ideal: "Campaigns that require an intentional, story-driven approach to talent and visual identity."
    },
    {
      name: "Fractional Creative Leadership",
      desc: "Flexible, creative, and production leadership for founder-led and growing brands — designed to integrate with your team and scale as you grow.",
      ideal: "Brands that need strategic creative leadership on a part-time or ongoing basis."
    }
  ],

  projects: [
    {
      name: "Spring 2024 Campaign",
      client: "M.M.LaFleur",
      role: "Senior Creative Producer",
      summary: "Location-based campaign production in Connecticut. Rescoped strategy after the original museum location fell through, securing a modernist home that expanded the shooting window and enabled greater asset capture.",
      link: "work/spring-2024-campaign.html"
    },
    {
      name: "Padma Lakshmi Editorial",
      client: "M.M.LaFleur / M-Dash",
      role: "Senior Creative Producer",
      summary: "Multi-channel editorial feature for M-Dash highlighting storytelling through fashion, leadership, and cultural perspective. Portrait series and interview across digital and social.",
      link: "work/padma-lakshmi-editorial.html"
    },
    {
      name: "Ready to Run Campaign",
      client: "M.M.LaFleur",
      role: "Senior Creative Producer",
      summary: "Multi-platform campaign for M.M.LaFleur's civic initiative supporting women running for public office. Two-day studio shoot with modular set builds. National press in The Cut, Adweek, and Glossy.",
      link: "work/ready-to-run.html"
    }
  ],

  process: [
    { step: "Discovery", desc: "We start with a conversation about your brand, goals, and vision. I listen deeply to understand where you're headed." },
    { step: "Strategy", desc: "I shape a clear creative direction — aligning narrative, visual systems, and production approach with your goals." },
    { step: "Production", desc: "End-to-end execution — from casting and crew to location and on-set leadership — with clarity and precision." },
    { step: "Delivery", desc: "Polished assets delivered across all needed formats and channels, with systems built for ongoing use." }
  ],

  experience: [
    "Senior Creative & Production Director — M.M.LaFleur",
    "Creative Director — Fashion Campaigns & Editorial",
    "Production Leadership — Gucci × Bon Duke at Saks Fifth Avenue",
    "Editorial Production — Padma Lakshmi for M-Dash",
    "Brand Strategy & Visual Systems — Multiple Brands"
  ],

  brands: ["M.M.LaFleur", "Gucci", "Saks Fifth Avenue", "Padma Lakshmi"],

  faq: {
    pricing: `Projects typically begin at $5,000. Anna works across a range of scopes — from focused production leadership to full creative direction. The best way to get an accurate estimate is to share your project details through the contact form.`,
    timeline: `Timelines vary by scope. A focused shoot production might take 4-6 weeks from kickoff to delivery. Full campaign creative direction typically runs 8-12 weeks. Anna will outline a clear timeline during the discovery phase.`,
    location: `Anna is based in New York City but works with brands nationally and internationally. Past projects have been shot in NYC, Connecticut, and beyond.`,
    availability: `Anna takes on a limited number of projects each season to ensure every partnership gets her full attention. Availability varies — reach out early to secure your spot.`,
    industries: `Anna works primarily with fashion, lifestyle, and purpose-driven brands. She has deep experience in editorial, campaigns, e-commerce, and content systems. Her clients range from established fashion houses to growing founder-led brands.`,
    process: `Anna's process starts with listening. She begins every engagement with a discovery conversation to understand your brand, goals, and vision. From there, she shapes strategy, leads production, and delivers polished work across all channels.`
  }
};

/**
 * Chatbot Response Engine
 * Pattern-matches user input and returns contextual responses
 */
function getChatbotResponse(input) {
  const q = input.toLowerCase().trim();

  // Greeting patterns
  if (/^(hi|hello|hey|hola|sup|yo|good\s*(morning|afternoon|evening))/.test(q)) {
    return ANNA_KB.greeting;
  }

  // Services
  if (/service|what (do|does)|offer|help with|provide|how can (you|she|anna)/.test(q)) {
    let response = "Anna offers six core services:\n\n";
    ANNA_KB.services.forEach((s, i) => {
      response += `**${i + 1}. ${s.name}** — ${s.desc}\n\n`;
    });
    response += `Want details on any specific service? Or you can [view the full Services page →](services.html)`;
    return response;
  }

  // Specific service inquiries
  if (/visual\s*system|brand\s*strat/i.test(q)) {
    const s = ANNA_KB.services[0];
    return `**${s.name}**\n\n${s.desc}\n\n*Best for:* ${s.ideal}\n\nProjects start at ${ANNA_KB.projectMinimum}. Ready to discuss? [Start a conversation →](contact.html)`;
  }
  if (/production\s*(leader|manage)/i.test(q)) {
    const s = ANNA_KB.services[1];
    return `**${s.name}**\n\n${s.desc}\n\n*Best for:* ${s.ideal}\n\nReady to discuss your production? [Start a conversation →](contact.html)`;
  }
  if (/content\s*strat/i.test(q)) {
    const s = ANNA_KB.services[2];
    return `**${s.name}**\n\n${s.desc}\n\n*Best for:* ${s.ideal}`;
  }
  if (/creative\s*op/i.test(q)) {
    const s = ANNA_KB.services[3];
    return `**${s.name}**\n\n${s.desc}\n\n*Best for:* ${s.ideal}`;
  }
  if (/cast|creative\s*dir/i.test(q)) {
    const s = ANNA_KB.services[4];
    return `**${s.name}**\n\n${s.desc}\n\n*Best for:* ${s.ideal}`;
  }
  if (/fractional|part[\s-]*time|ongoing/i.test(q)) {
    const s = ANNA_KB.services[5];
    return `**${s.name}**\n\n${s.desc}\n\n*Best for:* ${s.ideal}`;
  }

  // Pricing
  if (/price|cost|budget|how much|rate|fee|afford|invest|charge/.test(q)) {
    return ANNA_KB.faq.pricing + `\n\n[Start a Conversation →](contact.html)`;
  }

  // Timeline
  if (/timeline|how long|duration|turnaround|when|deadline|time frame/.test(q)) {
    return ANNA_KB.faq.timeline;
  }

  // Location
  if (/where|location|based|city|office|remote/.test(q)) {
    return ANNA_KB.faq.location;
  }

  // Availability
  if (/availab|book|hire|open|spot|capacity|schedule/.test(q)) {
    return ANNA_KB.faq.availability + `\n\n[Check availability →](contact.html)`;
  }

  // Industries
  if (/industr|fashion|lifestyle|brand|who (do|does)|type of (client|brand|work)/.test(q)) {
    return ANNA_KB.faq.industries;
  }

  // Process
  if (/process|how (do|does) (you|she|it) work|approach|method|workflow|step/.test(q)) {
    let response = "Anna's creative process has four phases:\n\n";
    ANNA_KB.process.forEach((p, i) => {
      response += `**${i + 1}. ${p.step}** — ${p.desc}\n\n`;
    });
    return response;
  }

  // Work / Portfolio
  if (/work|portfolio|project|campaign|case stud|example|past work|client/.test(q)) {
    let response = "Here are Anna's featured projects:\n\n";
    ANNA_KB.projects.forEach(p => {
      response += `**${p.name}** (${p.client})\n${p.summary}\n[View Project →](${p.link})\n\n`;
    });
    return response;
  }

  // About Anna
  if (/about|who (is|are)|background|experience|bio|story|journey/.test(q)) {
    return `Anna is a Creative Director & Production Leader based in New York City. She began with an editorial eye, shaping stories through image and narrative, and evolved into a leader in large-scale production and visual direction across fashion and lifestyle brands.\n\nShe's worked with brands including ${ANNA_KB.brands.join(", ")}.\n\n[Read more about Anna →](about.html)`;
  }

  // Contact
  if (/contact|reach|email|get in touch|connect|talk|call|meet/.test(q)) {
    return `You can reach Anna at **${ANNA_KB.email}** or fill out the project inquiry form.\n\nShe responds within ${ANNA_KB.responseTime}.\n\n[Start a Conversation →](contact.html)`;
  }

  // Thank you
  if (/thank|thanks|appreciate|helpful|great/.test(q)) {
    return "You're welcome! 😊 If you'd like to discuss a project, don't hesitate to [reach out →](contact.html). Anna would love to hear about your vision.";
  }

  // Goodbye
  if (/bye|goodbye|see you|later|done|that's all/.test(q)) {
    return "Thanks for stopping by! ✨ Wishing you the best with your project. If you ever need creative direction or production leadership, Anna's just a message away.\n\n[Contact Anna →](contact.html)";
  }

  // Default / fallback
  return `Great question! For the most detailed answer, I'd recommend reaching out directly to Anna.\n\nHere are some things I can help with:\n• **Services** — What Anna offers\n• **Work** — Past projects and campaigns\n• **Process** — How Anna works with brands\n• **Pricing** — Project investment ranges\n• **Contact** — How to get in touch\n\nWhat would you like to know more about?`;
}
