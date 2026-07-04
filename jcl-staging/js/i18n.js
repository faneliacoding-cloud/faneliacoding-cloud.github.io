/* ═══════════════════════════════════════════════════════════════════
   JCL STAGING & DESIGN — MULTILINGUAL ENGINE (EN / ES)
   Professional U.S. Hispanic Spanish · Luxury Tone Preserved
   Language detection · localStorage persistence · Seamless switching
═══════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── ALL TRANSLATIONS ──────────────────────────────────────────── */
  const T = {
    en: {
      /* Meta */
      meta_title: 'JCL Staging & Design | Luxury Home Staging New York — Tri-State Area',
      meta_desc: "New York's most celebrated luxury home staging studio. Transforming properties into irresistible listings that sell faster, command higher prices, and leave lasting impressions since 2017.",
      og_title: "JCL Staging & Design | New York's Luxury Staging Studio",
      og_desc: "We don't just stage homes. We sell them. Premium staging & interior design for New York's luxury real estate market since 2017.",

      /* Announcement */
      ann_1: "New York's Premier Luxury Staging Studio &nbsp;·&nbsp; Est. 2017 &nbsp;·&nbsp; <span class='ann-sep'>◆</span>&nbsp; Serving NY · NJ · CT",
      ann_2: "Staging That Sells &nbsp;·&nbsp; 97% of Listings Sell Above Asking Price &nbsp;·&nbsp; <span class='ann-sep'>◆</span>&nbsp; Schedule Your Consultation",
      ann_3: "Trusted by Douglas Elliman · Compass · Sotheby's &nbsp;·&nbsp; <span class='ann-sep'>◆</span>&nbsp; Julia &amp; Alfredo Linares",

      /* Navigation */
      nav_about: 'About',
      nav_portfolio: 'Portfolio',
      nav_services: 'Services',
      nav_transformations: 'Transformations',
      nav_journal: 'Journal',
      nav_faq: 'FAQ',
      nav_cta: 'Begin Your Transformation',
      mnav_contact: 'Book Consultation',
      lang_label: 'Language',

      /* Hero */
      hero_eyebrow: 'New York · Est. 2017 · Tri-State Area',
      hero_line1: "We Don't Just",
      hero_line2: 'Stage Homes.',
      hero_line3: '<em>We Sell Them.</em>',
      hero_sub: 'Transforming properties into irresistible luxury listings that close faster, command higher prices, and leave lasting impressions on the most discerning buyers.',
      hero_cta1: 'Begin Your Transformation',
      hero_cta2: 'View Our Work',
      stat_properties: 'Properties Staged',
      stat_above: 'Sold Above Asking',
      stat_premium: 'Avg Price Premium',
      stat_rating: 'Client Rating',

      /* Ticker */
      ticker_1: 'Luxury Home Staging',
      ticker_2: 'Interior Design',
      ticker_3: 'Property Styling',
      ticker_4: 'Douglas Elliman Partner',
      ticker_5: 'Compass Partner',
      ticker_6: "Sotheby's Partner",
      ticker_7: 'Model Homes',
      ticker_8: 'Tri-State Area',
      ticker_9: 'Est. 2017 · New York',

      /* About / Philosophy */
      about_label: 'Our Story',
      about_h2a: 'A Vision Born From',
      about_h2b: 'Passion &amp; Precision',
      about_p1: 'Founded by husband-and-wife visionaries Julia Carias-Linares and Alfredo Linares, JCL Staging &amp; Design emerged from a shared conviction: that every home deserves to be experienced at its very best — not just before a sale, but as a philosophy of living.',
      about_p2: 'Julia, a dynamic media executive, actress, and creative force, brings an editorial eye shaped by years of storytelling. Alfredo, the hands-on executor and business architect, ensures every vision is delivered with flawless precision. Together, they\'ve built one of New York\'s most trusted luxury staging studios — one remarkable property at a time.',
      pillar_inclusivity: 'Inclusivity',
      pillar_excellence: 'Excellence',
      pillar_sustainability: 'Sustainability',
      pillar_precision: 'Precision',
      about_cta: 'Partner With Us',

      /* Statistics */
      stats_label: 'By the Numbers',
      stats_h2a: 'Results That',
      stats_h2b: 'Speak',
      stat_d1: 'Luxury Properties Staged',
      stat_d2: 'Sold Above Asking Price',
      stat_d3: 'Average Price Premium',
      stat_d4: 'Client Satisfaction Rating',

      /* Before / After */
      ba_label: 'The Transformation',
      ba_h2a: 'See the',
      ba_h2b: 'Difference',
      ba_sub: 'Drag the slider to witness the extraordinary power of professional staging. Every space tells a more compelling story after a JCL transformation.',
      ba_tab1: 'Living Room',
      ba_tab2: 'Primary Bedroom',
      ba_before: 'Before',
      ba_after: 'After',
      ba_fullscreen: 'Fullscreen',

      /* Services */
      svc_label: 'What We Do',
      svc_h2a: 'Crafted for',
      svc_h2b: 'Every Vision',
      svc_sub: 'From a single consultation to a complete interior design commission — every service is delivered with the same obsessive attention to detail and commitment to extraordinary outcomes.',
      svc_inquire: 'Inquire',
      svc_partner: 'Partner With Us',
      svc_book: 'Book Now',
      svc_cta: 'Begin a Conversation',
      svc1_title: 'Luxury Home Staging',
      svc1_desc: 'Our signature service — a complete, curated transformation that makes buyers fall in love at first sight and offers follow. From furnished rentals to floral arrangements, every detail is intentional.',
      svc2_title: 'Interior Design',
      svc2_desc: "Julia's design philosophy — editorial, intentional, deeply personal. We create homes that reflect who you are at your very best, layering materials, art, and architecture into a coherent vision of elegant living.",
      svc3_title: 'Luxury Styling',
      svc3_desc: 'For occupied homes — we work with what you have, editing, repositioning, and supplementing to elevate your existing space for listing photography and buyer showings without a full staging.',
      svc4_title: 'Model Homes',
      svc4_desc: 'The emotional heart of any development. We create model home experiences that sell not just a unit but an entire lifestyle — drawing buyers into a vision of the life they could live here.',
      svc5_title: 'Furniture Rental',
      svc5_desc: 'Curated luxury furniture rental for staging — not catalog pieces, but thoughtfully sourced items selected for their quality, proportion, and emotional resonance with the space and buyer profile.',
      svc6_title: 'Luxury Consultation',
      svc6_desc: 'A one-to-one session with Julia or Alfredo — a strategic conversation about your property, your goals, and exactly what it will take to achieve an extraordinary outcome. Complimentary for qualifying properties.',
      svc6_link: 'Book Now',
      svc7_title: 'Realtor Partnerships',
      svc7_desc: "We work closely with the finest agents at Douglas Elliman, Compass, Sotheby's, and Christie's — streamlining the staging process to make every listing appointment-ready, every time.",
      svc7_link: 'Partner With Us',
      svc8_title: 'Builder Partnerships',
      svc8_desc: 'From model homes to spec homes, we are the staging partner developers trust to transform empty square footage into aspirational narratives that accelerate sales velocity across entire communities.',
      svc8_link: 'Partner With Us',
      svc9_title: 'Commercial Spaces',
      svc9_desc: 'Restaurants, boutiques, offices, and hospitality venues — our staging and design principles translate beautifully to commercial contexts. Every space benefits from an intentional emotional narrative.',
      svc10_title: 'Vacation Homes',
      svc10_desc: 'Beautifully staged vacation properties command significantly higher nightly rates, earn more 5-star reviews, and attract a more discerning clientele. We bring our full attention to every seasonal property.',
      svc11_title: 'Move-in Design',
      svc11_desc: "You've found your home. Now let us make it extraordinary. Our move-in design service delivers a complete, turnkey interior — curated and installed so you arrive to a home that already feels like yours.",
      svc12_title: 'Virtual Staging',
      svc12_desc: 'Photorealistic virtual staging for vacant properties, new construction, and international listings. Buyers emotionally connect with spaces long before they visit — and our virtual work makes that connection undeniable.',

      /* Portfolio */
      port_label: 'Selected Work',
      port_h2a: 'Spaces That',
      port_h2b: 'Sell Stories',
      port_sub: 'Every project is a complete narrative — from vision to sold. Click any project to read its story.',
      port_read: 'Read the Story',
      p1_tag: 'Featured Estate',
      p1_title: 'Park Avenue Penthouse',
      p1_meta: 'Full Staging · $4.2M · Sold in 11 Days',
      p2_tag: 'Residential',
      p2_title: 'Upper West Side Townhouse',
      p2_meta: 'Full Staging · $2.8M · Sold Above Asking',
      p3_tag: 'Kitchen &amp; Living',
      p3_title: 'Brooklyn Heights Residence',
      p3_meta: 'Full Staging · $1.6M · 14 Days',
      p4_tag: 'Full Staging',
      p4_title: 'Tribeca Loft',
      p4_meta: 'Full Staging · $3.1M · 5 Offers Received',
      p5_tag: 'Commercial · Hospitality',
      p5_title: 'SoHo — Now or Never Coffee',
      p5_meta: 'Interior Design · Featured in Press',
      modal_prop: 'The Property',
      modal_vis: 'Our Vision',
      modal_out: 'The Outcome',
      modal_cta: 'Begin Your Transformation',

      /* Process */
      proc_label: 'How We Work',
      proc_h2a: 'The JCL',
      proc_h2b: 'Process',
      step1_title: 'Discovery Call',
      step1_desc: 'A complimentary conversation with Julia or Alfredo to understand your property, timeline, and goals. This is where extraordinary begins.',
      step2_title: 'Vision &amp; Proposal',
      step2_desc: 'We present a curated concept for your space — mood boards, material selections, and a clear scope that aligns with your objectives and budget.',
      step3_title: 'Sourcing &amp; Curation',
      step3_desc: 'Every piece is selected with purpose — from furniture to art, botanicals to linens. Nothing generic, nothing repeated from project to project.',
      step4_title: 'Installation Day',
      step4_desc: 'Our team works efficiently and without disruption — arriving, transforming, and departing to leave a space that is ready for photography and showings.',
      step5_title: 'Sold.',
      step5_desc: 'Your property closes — faster and at a higher price than you expected. We celebrate with you, then begin preparing for what comes next.',

      /* Testimonials */
      test_label: 'Client Stories',
      test_h2a: 'What Our Clients',
      test_h2b: 'Say',
      t1_text: 'JCL transformed our Park Avenue apartment into something I had never imagined it could be. Within 48 hours of listing, we had three offers — all above asking. Julia and Alfredo are not just talented, they are extraordinary human beings who care deeply about your outcome.',
      t1_name: 'Sarah Mitchell',
      t1_role: 'Park Avenue · Full Staging',
      t2_text: "As a Compass agent, I've worked with many staging companies. JCL is in a completely different category. Their attention to detail, their understanding of what luxury buyers respond to, and their professionalism make every listing exceptional. They are my first call, every time.",
      t2_name: 'David Chen',
      t2_role: 'Compass · Luxury Real Estate Agent',
      t3_text: 'I hired JCL for our Tribeca loft and received five offers in 48 hours at $3.1M — significantly more than I expected. The staging was so beautiful that I genuinely didn\'t want to leave. Julia\'s eye is remarkable. This investment paid for itself fifty times over.',
      t3_name: 'Marcus Williams',
      t3_role: 'Tribeca · Full Staging',
      t4_text: "We engaged JCL for our entire Brooklyn Heights development — twelve units staged over six weeks. Every single unit sold above asking, and several were purchased without in-person visits, on the strength of the photography alone. That's the power of JCL staging.",
      t4_name: 'Rachel Torres',
      t4_role: 'Luxury Developer · Brooklyn Heights',
      t5_text: 'The consultation alone changed how I thought about my home. Julia walked through every room and immediately understood not just what to change — but why. It felt like working with a brilliant, thoughtful friend who happens to have extraordinary taste.',
      t5_name: 'Alexandra Park',
      t5_role: 'Upper West Side · Interior Consultation',

      /* Press */
      press_label: 'Trusted Partners &amp; Press',

      /* Journal */
      jour_label: 'The JCL Journal',
      jour_h2a: 'From Our',
      jour_h2b: 'Studio',
      jour_all: 'All Articles',
      j1_cat: 'Staging · Strategy',
      j1_title: 'Why the First 30 Seconds of a Showing Determine Everything',
      j1_excerpt: 'Buyers form their emotional response to a property within moments of entering. Here\'s how we choreograph that experience — and why it sells homes at higher prices.',
      j1_date: 'June 2025',
      j2_cat: 'Seller Guide',
      j2_title: "The Seller's Complete Guide to Luxury Home Staging in New York",
      j2_excerpt: 'From timeline to budget to choosing the right staging partner — everything a discerning seller needs to know before listing a luxury property in the Tri-State area.',
      j2_date: 'May 2025',
      j3_cat: 'Design · Interiors',
      j3_title: 'Material Matters: The Quiet Power of Natural Oak, Stone &amp; Bronze',
      j3_excerpt: 'In an age of fast interiors, natural materials endure. We explore why warm wood, soft stone, and champagne bronze continue to define luxury — and how to use them with restraint.',
      j3_date: 'April 2025',

      /* Instagram */
      insta_label: 'On Instagram',
      insta_h2a: 'Follow Our',
      insta_h2b: 'World',

      /* FAQ */
      faq_label: 'Questions &amp; Answers',
      faq_h2a: 'Everything You',
      faq_h2b: 'Need to Know',
      faq1_q: 'How much does luxury home staging cost in New York?',
      faq1_a: 'Our pricing is tailored to each project\'s unique scope — no two homes are alike, and we never offer formulaic packages. Staging typically begins at a few thousand dollars for partial consultations and scales with square footage, scope, and timeline. The more meaningful consideration is the return: our clients consistently see $20,000–$100,000+ in additional sale proceeds. We offer complimentary consultations to discuss your specific property and provide a precise proposal.',
      faq2_q: 'How long does the home staging process take?',
      faq2_a: 'Most full staging projects are installed within 3–7 business days once the property is vacant and ready. For urgent listings, we have delivered complete transformations in as few as 48 hours. Installation itself typically takes 1–2 days on-site. We move with efficiency and care — arriving, transforming, and departing to leave a space ready for photography and showings.',
      faq3_q: 'Does home staging really increase the sale price?',
      faq3_a: 'Consistently and significantly. 97% of our staged listings sell above asking price. On average, our clients achieve a 21% price premium compared to un-staged comparable properties. Staged homes also sell 3–5x faster, substantially reducing carrying costs. The return on staging investment is among the highest of any pre-sale expenditure a seller can make.',
      faq4_q: 'What areas does JCL Staging serve?',
      faq4_a: 'We serve the entire Tri-State area with a consistent standard of excellence: Manhattan, Brooklyn, Queens, The Bronx, Staten Island, Long Island (including the Hamptons), New Jersey, and Connecticut. Our team moves fluidly across the region and has successfully staged properties from Park Avenue penthouses to Hamptons estates to New Jersey new construction.',
      faq5_q: 'Can you work with occupied homes?',
      faq5_a: 'Absolutely. We offer partial staging and styling consultations for occupied homes — working with your existing furnishings to optimize presentation, and thoughtfully supplementing with our curated rental pieces where needed. The result is a home that feels both genuinely personal and aspirationally beautiful.',
      faq6_q: 'Do you offer virtual staging?',
      faq6_a: 'Yes. Our virtual staging is photorealistic and particularly effective for vacant properties, new construction, or international listings where physical staging is impractical. Virtual staging helps buyers emotionally connect with a space before ever stepping inside — and our virtual work is consistently among the most beautiful in the industry.',
      faq7_q: 'What is the difference between staging and interior design?',
      faq7_a: 'Staging is the art of preparing a property for sale — creating an emotional connection with the broadest possible pool of buyers to maximize sale price and speed. Interior design is about creating a personalized home that deeply reflects your specific life, taste, and needs. JCL excels at both, and the principles of great design inform every staging project we undertake.',
      faq8_q: 'How do I get started?',
      faq8_a: 'The easiest first step is to fill out the consultation form below, or to speak with Olivia — our design concierge — using the chat icon at the bottom right of your screen. Julia or Alfredo will personally follow up within one business day. For urgent listings, please mention your timeline and we will prioritize your inquiry accordingly.',

      /* Consultation */
      con_label: 'Begin Here',
      con_h2a: 'Your Property Deserves',
      con_h2b: 'Something Extraordinary',
      con_p: 'Every remarkable sale begins with a single conversation. Tell us about your property, your goals, and your timeline — and we\'ll show you exactly what\'s possible.',
      con_promise1: 'Complimentary initial consultation',
      con_promise2: 'Response within one business day',
      con_promise3: 'Custom proposal tailored to your property',
      con_promise4: 'Julia &amp; Alfredo personally involved from day one',
      con_form_title: 'Begin Your Transformation',
      con_fn: 'First Name',
      con_fn_ph: 'Julia',
      con_ln: 'Last Name',
      con_ln_ph: 'Mitchell',
      con_email: 'Email',
      con_email_ph: 'you@email.com',
      con_phone: 'Phone',
      con_phone_ph: '(212) 000-0000',
      con_addr: 'Property Address',
      con_addr_ph: '340 Park Avenue, New York, NY 10022',
      con_service: 'Service Interest',
      con_service_ph: 'Select a service',
      con_tl: 'Timeline',
      con_tl_ph: 'When do you need this?',
      con_msg: 'Tell Us About Your Property',
      con_msg_ph: 'Share any details about your property, goals, or questions — the more we know, the more helpful our conversation will be…',
      con_submit: 'Send My Request',
      opt_stage: 'Luxury Home Staging',
      opt_design: 'Interior Design',
      opt_styling: 'Luxury Styling',
      opt_model: 'Model Home Staging',
      opt_consult: 'Design Consultation',
      opt_virtual: 'Virtual Staging',
      opt_realtor: 'Realtor Partnership',
      opt_builder: 'Builder Partnership',
      opt_other: 'Other',
      tl_asap: 'As soon as possible',
      tl_2w: '1–2 weeks',
      tl_1m: 'Within 1 month',
      tl_3m: '1–3 months',
      tl_explore: 'Still exploring',
      success_title: 'Beautifully Received.',
      success_msg: 'Thank you for reaching out. Julia or Alfredo will personally respond within one business day. We look forward to the conversation.',

      /* Footer */
      foot_tagline: "Transforming New York's finest properties into irresistible luxury listings since 2017.",
      foot_services: 'Services',
      foot_company: 'Company',
      foot_connect: 'Connect',
      foot_about: 'About JCL',
      foot_portfolio: 'Portfolio',
      foot_process: 'Our Process',
      foot_stories: 'Client Stories',
      foot_journal: 'Journal',
      foot_faq: 'FAQ',
      foot_contact: 'Contact',
      foot_copy: '© {year} JCL Staging &amp; Design. All rights reserved. New York, NY.',
      foot_privacy: 'Privacy Policy',
      foot_terms: 'Terms of Service',
      foot_sitemap: 'Sitemap',

      /* Concierge */
      conc_status: 'Design Concierge · JCL Staging',
      conc_ph: 'Ask me anything…',
      conc_note: 'Olivia is an AI concierge. For urgent matters: info@jclstaging.com',
      conc_label: 'Chat with Olivia ✦',
      conc_open: 'Open Olivia design concierge',

      /* Accessibility */
      aria_scroll: 'Scroll down',
      aria_prev_t: 'Previous testimonial',
      aria_next_t: 'Next testimonial',
      aria_close: 'Close',
      aria_close_modal: 'Close project story',
      aria_close_conc: 'Close design concierge',
    },

    /* ═══ ESPAÑOL ═══════════════════════════════════════════════════ */
    es: {
      /* Meta */
      meta_title: 'JCL Staging & Design | Ambientación de Lujo en Nueva York — Área Tri-Estatal',
      meta_desc: 'El estudio de ambientación de lujo más reconocido de Nueva York. Transformamos propiedades en listados irresistibles que se venden más rápido, alcanzan precios más altos y dejan una impresión duradera desde 2017.',
      og_title: 'JCL Staging & Design | Estudio de Ambientación de Lujo en Nueva York',
      og_desc: 'No solo ambientamos propiedades. Las vendemos. Ambientación e interiorismo de lujo para el mercado inmobiliario de más alto nivel en Nueva York desde 2017.',

      /* Announcement */
      ann_1: "El Estudio de Ambientación de Lujo Premier de Nueva York &nbsp;·&nbsp; Est. 2017 &nbsp;·&nbsp; <span class='ann-sep'>◆</span>&nbsp; Sirviendo NY · NJ · CT",
      ann_2: "Ambientación que Vende &nbsp;·&nbsp; El 97% de Nuestros Listados se Venden por Encima del Precio &nbsp;·&nbsp; <span class='ann-sep'>◆</span>&nbsp; Agende Su Consulta",
      ann_3: "De Confianza de Douglas Elliman · Compass · Sotheby's &nbsp;·&nbsp; <span class='ann-sep'>◆</span>&nbsp; Julia y Alfredo Linares",

      /* Navigation */
      nav_about: 'Nosotros',
      nav_portfolio: 'Portafolio',
      nav_services: 'Servicios',
      nav_transformations: 'Transformaciones',
      nav_journal: 'Diario',
      nav_faq: 'Preguntas',
      nav_cta: 'Comience Su Transformación',
      mnav_contact: 'Reserve una Consulta',
      lang_label: 'Idioma',

      /* Hero */
      hero_eyebrow: 'Nueva York · Est. 2017 · Área Tri-Estatal',
      hero_line1: 'No Solo',
      hero_line2: 'Ambientamos Propiedades.',
      hero_line3: '<em>Las Vendemos.</em>',
      hero_sub: 'Transformamos propiedades en listados de lujo irresistibles que se cierran más rápido, alcanzan precios más altos y dejan una impresión duradera en los compradores más exigentes.',
      hero_cta1: 'Comience Su Transformación',
      hero_cta2: 'Ver Nuestro Trabajo',
      stat_properties: 'Propiedades Ambientadas',
      stat_above: 'Vendidas Sobre el Precio',
      stat_premium: 'Prima de Precio Promedio',
      stat_rating: 'Calificación del Cliente',

      /* Ticker */
      ticker_1: 'Ambientación de Lujo',
      ticker_2: 'Diseño de Interiores',
      ticker_3: 'Estilismo de Propiedades',
      ticker_4: 'Socio de Douglas Elliman',
      ticker_5: 'Socio de Compass',
      ticker_6: "Socio de Sotheby's",
      ticker_7: 'Casas Modelo',
      ticker_8: 'Área Tri-Estatal',
      ticker_9: 'Est. 2017 · Nueva York',

      /* About / Philosophy */
      about_label: 'Nuestra Historia',
      about_h2a: 'Una Visión Nacida de la',
      about_h2b: 'Pasión y la Precisión',
      about_p1: 'Fundado por los visionarios Julia Carias-Linares y Alfredo Linares — una pareja unida por una convicción profunda: que todo hogar merece vivirse en su máxima expresión, no solo antes de una venta, sino como filosofía de vida.',
      about_p2: 'Julia, ejecutiva de medios, actriz y fuerza creativa, aporta una mirada editorial forjada por años de narrativa. Alfredo, el ejecutor meticuloso y arquitecto empresarial, garantiza que cada visión se realice con precisión impecable. Juntos, han construido uno de los estudios de ambientación de lujo más reconocidos de Nueva York — una propiedad extraordinaria a la vez.',
      pillar_inclusivity: 'Inclusividad',
      pillar_excellence: 'Excelencia',
      pillar_sustainability: 'Sostenibilidad',
      pillar_precision: 'Precisión',
      about_cta: 'Asóciese Con Nosotros',

      /* Statistics */
      stats_label: 'En Cifras',
      stats_h2a: 'Resultados que',
      stats_h2b: 'Hablan',
      stat_d1: 'Propiedades de Lujo Ambientadas',
      stat_d2: 'Vendidas por Encima del Precio',
      stat_d3: 'Prima de Precio Promedio',
      stat_d4: 'Calificación de Satisfacción',

      /* Before / After */
      ba_label: 'La Transformación',
      ba_h2a: 'Vea la',
      ba_h2b: 'Diferencia',
      ba_sub: 'Arrastre el control deslizante para presenciar el extraordinario poder de la ambientación profesional. Cada espacio cuenta una historia más poderosa después de una transformación JCL.',
      ba_tab1: 'Sala de Estar',
      ba_tab2: 'Dormitorio Principal',
      ba_before: 'Antes',
      ba_after: 'Después',
      ba_fullscreen: 'Pantalla Completa',

      /* Services */
      svc_label: 'Lo Que Hacemos',
      svc_h2a: 'Diseñado para',
      svc_h2b: 'Cada Visión',
      svc_sub: 'Desde una sola consulta hasta una comisión completa de diseño de interiores — cada servicio se entrega con la misma atención obsesiva al detalle y el compromiso de lograr resultados extraordinarios.',
      svc_inquire: 'Consultar',
      svc_partner: 'Asóciese Con Nosotros',
      svc_book: 'Reserve Ahora',
      svc_cta: 'Inicie una Conversación',
      svc1_title: 'Ambientación de Lujo',
      svc1_desc: 'Nuestro servicio insignia — una transformación completa y cuidadosamente curada que enamora a los compradores desde el primer instante. Cada detalle, desde los muebles hasta los arreglos florales, es completamente intencional.',
      svc2_title: 'Diseño de Interiores',
      svc2_desc: 'La filosofía de diseño de Julia — editorial, intencional y profundamente personal. Creamos hogares que reflejan quién usted es en su máximo nivel, entrelazando materiales, arte y arquitectura en una visión coherente de vida elegante.',
      svc3_title: 'Estilismo de Lujo',
      svc3_desc: 'Para hogares habitados — trabajamos con lo que ya tiene, editando, reposicionando y complementando para elevar su espacio ante la fotografía de listado y las visitas de compradores, sin necesidad de una ambientación completa.',
      svc4_title: 'Casas Modelo',
      svc4_desc: 'El corazón emocional de cualquier desarrollo. Creamos experiencias en casas modelo que no solo venden una unidad, sino un estilo de vida completo — llevando a los compradores hacia la visión de la vida que podrían tener aquí.',
      svc5_title: 'Renta de Muebles',
      svc5_desc: 'Renta de muebles de lujo cuidadosamente curada para la ambientación — no piezas de catálogo, sino artículos seleccionados conscientemente por su calidad, proporción y resonancia emocional con el espacio.',
      svc6_title: 'Consultoría de Lujo',
      svc6_desc: 'Una sesión personal con Julia o Alfredo — una conversación estratégica sobre su propiedad, sus objetivos y exactamente qué se necesita para lograr un resultado extraordinario. Gratuita para propiedades calificadas.',
      svc6_link: 'Reserve Ahora',
      svc7_title: 'Asociaciones con Realtors',
      svc7_desc: 'Trabajamos estrechamente con los mejores agentes de Douglas Elliman, Compass, Sotheby\'s y Christie\'s — optimizando el proceso de ambientación para que cada listado esté impecable en cada ocasión.',
      svc7_link: 'Asóciese Con Nosotros',
      svc8_title: 'Asociaciones con Constructores',
      svc8_desc: 'Desde casas modelo hasta casas de muestra, somos el socio de ambientación en el que los desarrolladores confían para transformar metros cuadrados vacíos en narrativas aspiracionales que aceleran la velocidad de ventas.',
      svc8_link: 'Asóciese Con Nosotros',
      svc9_title: 'Espacios Comerciales',
      svc9_desc: 'Restaurantes, boutiques, oficinas y locales de hospitalidad — nuestros principios de ambientación y diseño se traducen de manera extraordinaria en contextos comerciales. Cada espacio se beneficia de una narrativa emocional intencional.',
      svc10_title: 'Casas Vacacionales',
      svc10_desc: 'Las propiedades vacacionales bien ambientadas obtienen tarifas nocturnas significativamente más altas, más reseñas de cinco estrellas y atraen a una clientela más selecta. Brindamos toda nuestra atención a cada propiedad de temporada.',
      svc11_title: 'Diseño de Mudanza',
      svc11_desc: 'Encontró su hogar. Ahora déjenos hacerlo extraordinario. Nuestro servicio de diseño de mudanza entrega un interior completo y listo para habitar — curado e instalado para que llegue a un hogar que ya se siente suyo.',
      svc12_title: 'Ambientación Virtual',
      svc12_desc: 'Ambientación virtual fotorrealista para propiedades vacantes, nueva construcción y listados internacionales. Los compradores se conectan emocionalmente con los espacios mucho antes de visitarlos — y nuestro trabajo virtual hace esa conexión innegable.',

      /* Portfolio */
      port_label: 'Trabajo Selecto',
      port_h2a: 'Espacios que',
      port_h2b: 'Cuentan Historias',
      port_sub: 'Cada proyecto es una narrativa completa — desde la visión hasta la venta. Haga clic en cualquier proyecto para leer su historia.',
      port_read: 'Leer la Historia',
      p1_tag: 'Propiedad Destacada',
      p1_title: 'Ático en Park Avenue',
      p1_meta: 'Ambientación Completa · $4.2M · Vendido en 11 Días',
      p2_tag: 'Residencial',
      p2_title: 'Townhouse en el Upper West Side',
      p2_meta: 'Ambientación Completa · $2.8M · Vendido por Encima del Precio',
      p3_tag: 'Cocina y Sala',
      p3_title: 'Residencia en Brooklyn Heights',
      p3_meta: 'Ambientación Completa · $1.6M · 14 Días',
      p4_tag: 'Ambientación Completa',
      p4_title: 'Loft en Tribeca',
      p4_meta: 'Ambientación Completa · $3.1M · 5 Ofertas Recibidas',
      p5_tag: 'Comercial · Hospitalidad',
      p5_title: 'SoHo — Now or Never Coffee',
      p5_meta: 'Diseño de Interiores · Destacado en Prensa',
      modal_prop: 'La Propiedad',
      modal_vis: 'Nuestra Visión',
      modal_out: 'El Resultado',
      modal_cta: 'Comience Su Transformación',

      /* Process */
      proc_label: 'Cómo Trabajamos',
      proc_h2a: 'El Proceso',
      proc_h2b: 'JCL',
      step1_title: 'Llamada de Descubrimiento',
      step1_desc: 'Una conversación gratuita con Julia o Alfredo para entender su propiedad, su cronograma y sus objetivos. Aquí es donde comienza lo extraordinario.',
      step2_title: 'Visión y Propuesta',
      step2_desc: 'Presentamos un concepto curado para su espacio — tableros de inspiración, selecciones de materiales y un alcance claro que se alinea con sus objetivos y presupuesto.',
      step3_title: 'Selección y Curaduría',
      step3_desc: 'Cada pieza se selecciona con propósito — desde muebles hasta arte, plantas hasta lino. Nada genérico, nada repetido de proyecto en proyecto.',
      step4_title: 'Día de Instalación',
      step4_desc: 'Nuestro equipo trabaja con eficiencia y sin interrupciones — llegamos, transformamos y nos retiramos dejando un espacio listo para la fotografía y las visitas.',
      step5_title: 'Vendida.',
      step5_desc: 'Su propiedad se cierra — más rápido y a un precio más alto del esperado. Celebramos con usted y comenzamos a preparar lo que viene después.',

      /* Testimonials */
      test_label: 'Historias de Clientes',
      test_h2a: 'Lo Que Dicen',
      test_h2b: 'Nuestros Clientes',
      t1_text: 'JCL transformó nuestro apartamento en Park Avenue en algo que jamás imaginé que podría ser. A las 48 horas de publicar el listado, teníamos tres ofertas — todas por encima del precio. Julia y Alfredo no solo son talentosos, son personas extraordinarias que se preocupan profundamente por su resultado.',
      t1_name: 'Sarah Mitchell',
      t1_role: 'Park Avenue · Ambientación Completa',
      t2_text: 'Como agente de Compass, he trabajado con muchas empresas de ambientación. JCL está en una categoría completamente diferente. Su atención al detalle, su comprensión de lo que los compradores de lujo valoran y su profesionalismo hacen que cada listado sea excepcional. Son mi primera llamada, siempre.',
      t2_name: 'David Chen',
      t2_role: 'Compass · Agente de Bienes Raíces de Lujo',
      t3_text: 'Contraté a JCL para nuestro loft en Tribeca y recibí cinco ofertas en 48 horas por $3.1M — significativamente más de lo que esperaba. La ambientación fue tan hermosa que genuinamente no quería irme. La visión de Julia es extraordinaria. Esta inversión se pagó cincuenta veces.',
      t3_name: 'Marcus Williams',
      t3_role: 'Tribeca · Ambientación Completa',
      t4_text: 'Contratamos a JCL para todo nuestro desarrollo en Brooklyn Heights — doce unidades ambientadas en seis semanas. Cada unidad se vendió por encima del precio, y varias se compraron sin visitas presenciales, gracias únicamente a la fuerza de la fotografía. Ese es el poder de JCL.',
      t4_name: 'Rachel Torres',
      t4_role: 'Desarrolladora de Lujo · Brooklyn Heights',
      t5_text: 'La consulta sola cambió cómo percibía mi hogar. Julia recorrió cada habitación y comprendió de inmediato no solo qué cambiar, sino por qué. Fue como trabajar con una amiga brillante y reflexiva que resulta tener un gusto extraordinario.',
      t5_name: 'Alexandra Park',
      t5_role: 'Upper West Side · Consultoría de Interiores',

      /* Press */
      press_label: 'Socios y Prensa de Confianza',

      /* Journal */
      jour_label: 'El Diario JCL',
      jour_h2a: 'Desde Nuestro',
      jour_h2b: 'Estudio',
      jour_all: 'Todos los Artículos',
      j1_cat: 'Ambientación · Estrategia',
      j1_title: 'Por Qué los Primeros 30 Segundos de una Visita lo Determinan Todo',
      j1_excerpt: 'Los compradores forman su respuesta emocional a una propiedad en el momento en que entran. Así es como coreografiamos esa experiencia — y por qué vende casas a precios más altos.',
      j1_date: 'Junio 2025',
      j2_cat: 'Guía para Vendedores',
      j2_title: 'La Guía Completa del Vendedor para la Ambientación de Lujo en Nueva York',
      j2_excerpt: 'Desde el cronograma hasta el presupuesto — todo lo que un vendedor exigente necesita saber antes de listar una propiedad de lujo en el área Tri-Estatal.',
      j2_date: 'Mayo 2025',
      j3_cat: 'Diseño · Interiores',
      j3_title: 'El Material Importa: El Poder Silencioso del Roble, la Piedra y el Bronce',
      j3_excerpt: 'En una época de interiores efímeros, los materiales naturales perduran. Exploramos por qué la madera cálida, la piedra suave y el bronce champán siguen definiendo el lujo.',
      j3_date: 'Abril 2025',

      /* Instagram */
      insta_label: 'En Instagram',
      insta_h2a: 'Siga',
      insta_h2b: 'Nuestro Mundo',

      /* FAQ */
      faq_label: 'Preguntas y Respuestas',
      faq_h2a: 'Todo Lo Que',
      faq_h2b: 'Necesita Saber',
      faq1_q: '¿Cuánto cuesta la ambientación de lujo en Nueva York?',
      faq1_a: 'Nuestros precios están adaptados al alcance único de cada proyecto — ningún hogar es igual, y nunca ofrecemos paquetes formulaicos. La ambientación generalmente comienza en algunos miles de dólares para consultas parciales y escala según los metros cuadrados, el alcance y el cronograma. La consideración más significativa es el retorno: nuestros clientes consistentemente obtienen entre $20,000 y más de $100,000 adicionales en el precio de venta. Ofrecemos consultas gratuitas para hablar sobre su propiedad específica.',
      faq2_q: '¿Cuánto tiempo tarda el proceso de ambientación?',
      faq2_a: 'La mayoría de los proyectos de ambientación completa se instalan en 3 a 7 días hábiles una vez que la propiedad está vacante y lista. Para listados urgentes, hemos realizado transformaciones completas en tan solo 48 horas. La instalación en sí suele tomar 1 a 2 días en el sitio.',
      faq3_q: '¿La ambientación realmente aumenta el precio de venta?',
      faq3_a: 'De manera consistente y significativa. El 97% de nuestros listados ambientados se venden por encima del precio de lista. En promedio, nuestros clientes logran una prima del 21% en comparación con propiedades comparables sin ambientar. Las propiedades ambientadas también se venden 3 a 5 veces más rápido, lo que reduce sustancialmente los costos de mantenimiento.',
      faq4_q: '¿Qué áreas cubre JCL Staging?',
      faq4_a: 'Servimos toda el área Tri-Estatal con un estándar de excelencia consistente: Manhattan, Brooklyn, Queens, El Bronx, Staten Island, Long Island (incluyendo los Hamptons), Nueva Jersey y Connecticut. Nuestro equipo se desplaza fluidamente por la región.',
      faq5_q: '¿Pueden trabajar con hogares ocupados?',
      faq5_a: 'Por supuesto. Ofrecemos consultas de ambientación y estilismo parciales para hogares ocupados — trabajando con sus muebles existentes para optimizar la presentación y complementando cuidadosamente con nuestras piezas de alquiler curadas cuando es necesario.',
      faq6_q: '¿Ofrecen ambientación virtual?',
      faq6_a: 'Sí. Nuestra ambientación virtual es fotorrealista y es especialmente efectiva para propiedades vacantes, nueva construcción o listados internacionales donde la ambientación física no es práctica. Ayuda a los compradores a conectarse emocionalmente con el espacio antes de visitarlo en persona.',
      faq7_q: '¿Cuál es la diferencia entre ambientación y diseño de interiores?',
      faq7_a: 'La ambientación es el arte de preparar una propiedad para la venta — creando una conexión emocional con el mayor número posible de compradores para maximizar el precio y la velocidad de venta. El diseño de interiores se trata de crear un hogar personalizado que refleje profundamente su vida, gusto y necesidades específicas. JCL destaca en ambos.',
      faq8_q: '¿Cómo empiezo?',
      faq8_a: 'El primer paso más sencillo es completar el formulario de consulta a continuación, o hablar con Olivia — nuestra concierge de diseño — usando el ícono de chat en la parte inferior derecha de su pantalla. Julia o Alfredo le responderán personalmente dentro de un día hábil.',

      /* Consultation */
      con_label: 'Empiece Aquí',
      con_h2a: 'Su Propiedad Merece',
      con_h2b: 'Algo Extraordinario',
      con_p: 'Toda venta extraordinaria comienza con una sola conversación. Cuéntenos sobre su propiedad, sus objetivos y su cronograma — y le mostraremos exactamente lo que es posible.',
      con_promise1: 'Consulta inicial gratuita',
      con_promise2: 'Respuesta en un día hábil',
      con_promise3: 'Propuesta personalizada para su propiedad',
      con_promise4: 'Julia y Alfredo involucrados personalmente desde el primer día',
      con_form_title: 'Comience Su Transformación',
      con_fn: 'Nombre',
      con_fn_ph: 'Julia',
      con_ln: 'Apellido',
      con_ln_ph: 'Rodríguez',
      con_email: 'Correo Electrónico',
      con_email_ph: 'usted@correo.com',
      con_phone: 'Teléfono',
      con_phone_ph: '(212) 000-0000',
      con_addr: 'Dirección de la Propiedad',
      con_addr_ph: '340 Park Avenue, Nueva York, NY 10022',
      con_service: 'Servicio de Interés',
      con_service_ph: 'Seleccione un servicio',
      con_tl: 'Plazo',
      con_tl_ph: '¿Cuándo necesita esto?',
      con_msg: 'Cuéntenos Sobre Su Propiedad',
      con_msg_ph: 'Comparta cualquier detalle sobre su propiedad, objetivos o preguntas — mientras más sepamos, más útil será nuestra conversación…',
      con_submit: 'Enviar Mi Solicitud',
      opt_stage: 'Ambientación de Lujo',
      opt_design: 'Diseño de Interiores',
      opt_styling: 'Estilismo de Lujo',
      opt_model: 'Ambientación de Casa Modelo',
      opt_consult: 'Consultoría de Diseño',
      opt_virtual: 'Ambientación Virtual',
      opt_realtor: 'Asociación con Realtor',
      opt_builder: 'Asociación con Constructor',
      opt_other: 'Otro',
      tl_asap: 'Lo antes posible',
      tl_2w: '1–2 semanas',
      tl_1m: 'Dentro de 1 mes',
      tl_3m: '1–3 meses',
      tl_explore: 'Todavía explorando',
      success_title: 'Recibido Con Gusto.',
      success_msg: 'Gracias por comunicarse con nosotros. Julia o Alfredo le responderán personalmente dentro de un día hábil. Esperamos con entusiasmo esa conversación.',

      /* Footer */
      foot_tagline: 'Transformando las mejores propiedades de Nueva York en listados de lujo irresistibles desde 2017.',
      foot_services: 'Servicios',
      foot_company: 'Compañía',
      foot_connect: 'Conectar',
      foot_about: 'Quiénes Somos',
      foot_portfolio: 'Portafolio',
      foot_process: 'Nuestro Proceso',
      foot_stories: 'Historias de Clientes',
      foot_journal: 'Diario',
      foot_faq: 'Preguntas',
      foot_contact: 'Contacto',
      foot_copy: '© {year} JCL Staging &amp; Design. Todos los derechos reservados. Nueva York, NY.',
      foot_privacy: 'Política de Privacidad',
      foot_terms: 'Términos de Servicio',
      foot_sitemap: 'Mapa del Sitio',

      /* Concierge */
      conc_status: 'Concierge de Diseño · JCL Staging',
      conc_ph: 'Pregúnteme lo que sea…',
      conc_note: 'Olivia es una concierge de IA. Para asuntos urgentes: info@jclstaging.com',
      conc_label: 'Chatea con Olivia ✦',
      conc_open: 'Abrir concierge de diseño Olivia',

      /* Accessibility */
      aria_scroll: 'Desplazarse hacia abajo',
      aria_prev_t: 'Testimonio anterior',
      aria_next_t: 'Siguiente testimonio',
      aria_close: 'Cerrar',
      aria_close_modal: 'Cerrar historia del proyecto',
      aria_close_conc: 'Cerrar concierge de diseño',
    }
  };

  /* ─── ELEMENT MAP ──────────────────────────────────────────────── */
  /* Format: { s: selector, k: key, h: innerHTML?, a: attr?, m: 'multiple' } */
  const MAP = [
    /* — Announcement (handled via JS in main.js, bridged via event) — */

    /* — Navigation — */
    { s: '.main-nav a[href="#about"]', k: 'nav_about' },
    { s: '.main-nav a[href="#portfolio"]', k: 'nav_portfolio' },
    { s: '.main-nav a[href="#services"]', k: 'nav_services' },
    { s: '.main-nav a[href="#transformation"]', k: 'nav_transformations' },
    { s: '.main-nav a[href="#journal"]', k: 'nav_journal' },
    { s: '.main-nav a[href="#faq"]', k: 'nav_faq' },
    { s: '#headerCTA', k: 'nav_cta' },
    { s: '.mnav-link[href="#about"]', k: 'nav_about' },
    { s: '.mnav-link[href="#portfolio"]', k: 'nav_portfolio' },
    { s: '.mnav-link[href="#services"]', k: 'nav_services' },
    { s: '.mnav-link[href="#transformation"]', k: 'nav_transformations' },
    { s: '.mnav-link[href="#journal"]', k: 'nav_journal' },
    { s: '.mnav-link[href="#faq"]', k: 'nav_faq' },
    { s: '.mnav-cta', k: 'mnav_contact' },

    /* — Hero — */
    { s: '.hero-eyebrow', k: 'hero_eyebrow' },
    { s: '.h-line:nth-child(1)', k: 'hero_line1', hero: true },
    { s: '.h-line:nth-child(2)', k: 'hero_line2', hero: true },
    { s: '.h-line:nth-child(3)', k: 'hero_line3', hero: true, h: true },
    { s: '.hero-sub', k: 'hero_sub' },
    { s: '#heroCTA', k: 'hero_cta1' },
    { s: '.btn-ghost', k: 'hero_cta2', partial: 'text' },
    { s: '.hero-stat:nth-child(1) .stat-label', k: 'stat_properties' },
    { s: '.hero-stat:nth-child(2) .stat-label', k: 'stat_above' },
    { s: '.hero-stat:nth-child(3) .stat-label', k: 'stat_premium' },
    { s: '.hero-stat:nth-child(4) .stat-label', k: 'stat_rating' },

    /* — About — */
    { s: '#about .label', k: 'about_label' },
    { s: '#about h2 .split-a', k: 'about_h2a' },
    { s: '#about h2 em', k: 'about_h2b', h: true },
    { s: '#about .philosophy-text-col p:nth-of-type(1)', k: 'about_p1', h: true },
    { s: '#about .philosophy-text-col p:nth-of-type(2)', k: 'about_p2', h: true },
    { s: '.pillar:nth-child(1) span', k: 'pillar_inclusivity' },
    { s: '.pillar:nth-child(2) span', k: 'pillar_excellence' },
    { s: '.pillar:nth-child(3) span', k: 'pillar_sustainability' },
    { s: '.pillar:nth-child(4) span', k: 'pillar_precision' },
    { s: '#aboutCTA', k: 'about_cta' },

    /* — Statistics — */
    { s: '#statistics .label', k: 'stats_label' },
    { s: '#statistics h2 .split-a', k: 'stats_h2a' },
    { s: '#statistics h2 em', k: 'stats_h2b', h: true },
    { s: '.stat-card:nth-child(1) .stat-desc', k: 'stat_d1' },
    { s: '.stat-card:nth-child(2) .stat-desc', k: 'stat_d2' },
    { s: '.stat-card:nth-child(3) .stat-desc', k: 'stat_d3' },
    { s: '.stat-card:nth-child(4) .stat-desc', k: 'stat_d4' },

    /* — Before/After — */
    { s: '#transformation .label', k: 'ba_label' },
    { s: '#baH2a', k: 'ba_h2a' },
    { s: '#baH2b', k: 'ba_h2b', h: true },
    { s: '#baSub', k: 'ba_sub' },
    { s: '.ba-tab:nth-child(1)', k: 'ba_tab1' },
    { s: '.ba-tab:nth-child(2)', k: 'ba_tab2' },
    { s: '.ba-label-before', k: 'ba_before', multi: true },
    { s: '.ba-label-after', k: 'ba_after', multi: true },

    /* — Services — */
    { s: '#services .label', k: 'svc_label' },
    { s: '#services .section-header h2 .split-a', k: 'svc_h2a' },
    { s: '#services .section-header h2 em', k: 'svc_h2b', h: true },
    { s: '#services .section-header p', k: 'svc_sub' },
    { s: '#servicesCTA', k: 'svc_cta' },
    { s: '.service-card:nth-child(1) .service-title', k: 'svc1_title' },
    { s: '.service-card:nth-child(1) .service-desc', k: 'svc1_desc' },
    { s: '.service-card:nth-child(1) .service-link', k: 'svc_inquire', partial: 'text' },
    { s: '.service-card:nth-child(2) .service-title', k: 'svc2_title' },
    { s: '.service-card:nth-child(2) .service-desc', k: 'svc2_desc' },
    { s: '.service-card:nth-child(2) .service-link', k: 'svc_inquire', partial: 'text' },
    { s: '.service-card:nth-child(3) .service-title', k: 'svc3_title' },
    { s: '.service-card:nth-child(3) .service-desc', k: 'svc3_desc' },
    { s: '.service-card:nth-child(3) .service-link', k: 'svc_inquire', partial: 'text' },
    { s: '.service-card:nth-child(4) .service-title', k: 'svc4_title' },
    { s: '.service-card:nth-child(4) .service-desc', k: 'svc4_desc' },
    { s: '.service-card:nth-child(4) .service-link', k: 'svc_inquire', partial: 'text' },
    { s: '.service-card:nth-child(5) .service-title', k: 'svc5_title' },
    { s: '.service-card:nth-child(5) .service-desc', k: 'svc5_desc' },
    { s: '.service-card:nth-child(5) .service-link', k: 'svc_inquire', partial: 'text' },
    { s: '.service-card:nth-child(6) .service-title', k: 'svc6_title' },
    { s: '.service-card:nth-child(6) .service-desc', k: 'svc6_desc' },
    { s: '.service-card:nth-child(6) .service-link', k: 'svc6_link', partial: 'text' },
    { s: '.service-card:nth-child(7) .service-title', k: 'svc7_title' },
    { s: '.service-card:nth-child(7) .service-desc', k: 'svc7_desc' },
    { s: '.service-card:nth-child(7) .service-link', k: 'svc7_link', partial: 'text' },
    { s: '.service-card:nth-child(8) .service-title', k: 'svc8_title' },
    { s: '.service-card:nth-child(8) .service-desc', k: 'svc8_desc' },
    { s: '.service-card:nth-child(8) .service-link', k: 'svc8_link', partial: 'text' },
    { s: '.service-card:nth-child(9) .service-title', k: 'svc9_title' },
    { s: '.service-card:nth-child(9) .service-desc', k: 'svc9_desc' },
    { s: '.service-card:nth-child(9) .service-link', k: 'svc_inquire', partial: 'text' },
    { s: '.service-card:nth-child(10) .service-title', k: 'svc10_title' },
    { s: '.service-card:nth-child(10) .service-desc', k: 'svc10_desc' },
    { s: '.service-card:nth-child(10) .service-link', k: 'svc_inquire', partial: 'text' },
    { s: '.service-card:nth-child(11) .service-title', k: 'svc11_title' },
    { s: '.service-card:nth-child(11) .service-desc', k: 'svc11_desc' },
    { s: '.service-card:nth-child(11) .service-link', k: 'svc_inquire', partial: 'text' },
    { s: '.service-card:nth-child(12) .service-title', k: 'svc12_title' },
    { s: '.service-card:nth-child(12) .service-desc', k: 'svc12_desc' },
    { s: '.service-card:nth-child(12) .service-link', k: 'svc_inquire', partial: 'text' },

    /* — Portfolio — */
    { s: '#portfolio .label', k: 'port_label' },
    { s: '#portfolio .section-header h2 .split-a', k: 'port_h2a' },
    { s: '#portfolio .section-header h2 em', k: 'port_h2b', h: true },
    { s: '#portfolio .section-header p', k: 'port_sub' },
    { s: '.portfolio-item:nth-child(1) .port-tag', k: 'p1_tag' },
    { s: '.portfolio-item:nth-child(1) .port-title', k: 'p1_title' },
    { s: '.portfolio-item:nth-child(1) .port-meta', k: 'p1_meta', h: true },
    { s: '.portfolio-item:nth-child(2) .port-tag', k: 'p2_tag' },
    { s: '.portfolio-item:nth-child(2) .port-title', k: 'p2_title' },
    { s: '.portfolio-item:nth-child(2) .port-meta', k: 'p2_meta', h: true },
    { s: '.portfolio-item:nth-child(3) .port-tag', k: 'p3_tag', h: true },
    { s: '.portfolio-item:nth-child(3) .port-title', k: 'p3_title' },
    { s: '.portfolio-item:nth-child(3) .port-meta', k: 'p3_meta', h: true },
    { s: '.portfolio-item:nth-child(4) .port-tag', k: 'p4_tag' },
    { s: '.portfolio-item:nth-child(4) .port-title', k: 'p4_title' },
    { s: '.portfolio-item:nth-child(4) .port-meta', k: 'p4_meta', h: true },
    { s: '.portfolio-item:nth-child(5) .port-tag', k: 'p5_tag', h: true },
    { s: '.portfolio-item:nth-child(5) .port-title', k: 'p5_title' },
    { s: '.portfolio-item:nth-child(5) .port-meta', k: 'p5_meta', h: true },
    { s: '.port-cta', k: 'port_read', partial: 'text', multi: true },
    { s: '.modal-tag', k: '' }, /* updated dynamically */
    { s: '#modalPropertyLabel', k: 'modal_prop' },
    { s: '#modalVisionLabel', k: 'modal_vis' },
    { s: '#modalOutcomeLabel', k: 'modal_out' },

    /* — Process — */
    { s: '#process .label', k: 'proc_label' },
    { s: '#process h2 .split-a', k: 'proc_h2a' },
    { s: '#process h2 em', k: 'proc_h2b', h: true },
    { s: '.process-step:nth-child(1) .step-title', k: 'step1_title' },
    { s: '.process-step:nth-child(1) .step-desc', k: 'step1_desc' },
    { s: '.process-step:nth-child(2) .step-title', k: 'step2_title', h: true },
    { s: '.process-step:nth-child(2) .step-desc', k: 'step2_desc' },
    { s: '.process-step:nth-child(3) .step-title', k: 'step3_title', h: true },
    { s: '.process-step:nth-child(3) .step-desc', k: 'step3_desc' },
    { s: '.process-step:nth-child(4) .step-title', k: 'step4_title' },
    { s: '.process-step:nth-child(4) .step-desc', k: 'step4_desc' },
    { s: '.process-step:nth-child(5) .step-title', k: 'step5_title' },
    { s: '.process-step:nth-child(5) .step-desc', k: 'step5_desc' },

    /* — Testimonials — */
    { s: '#testimonials .label', k: 'test_label' },
    { s: '#testimonials h2 .split-a', k: 'test_h2a' },
    { s: '#testimonials h2 em', k: 'test_h2b', h: true },
    { s: '.testimonial-slide:nth-child(1) .testimonial-text', k: 't1_text' },
    { s: '.testimonial-slide:nth-child(1) .testimonial-name', k: 't1_name' },
    { s: '.testimonial-slide:nth-child(1) .testimonial-role', k: 't1_role' },
    { s: '.testimonial-slide:nth-child(2) .testimonial-text', k: 't2_text' },
    { s: '.testimonial-slide:nth-child(2) .testimonial-name', k: 't2_name' },
    { s: '.testimonial-slide:nth-child(2) .testimonial-role', k: 't2_role' },
    { s: '.testimonial-slide:nth-child(3) .testimonial-text', k: 't3_text' },
    { s: '.testimonial-slide:nth-child(3) .testimonial-name', k: 't3_name' },
    { s: '.testimonial-slide:nth-child(3) .testimonial-role', k: 't3_role' },
    { s: '.testimonial-slide:nth-child(4) .testimonial-text', k: 't4_text' },
    { s: '.testimonial-slide:nth-child(4) .testimonial-name', k: 't4_name' },
    { s: '.testimonial-slide:nth-child(4) .testimonial-role', k: 't4_role' },
    { s: '.testimonial-slide:nth-child(5) .testimonial-text', k: 't5_text' },
    { s: '.testimonial-slide:nth-child(5) .testimonial-name', k: 't5_name' },
    { s: '.testimonial-slide:nth-child(5) .testimonial-role', k: 't5_role' },
    { s: '#tPrev', k: 'aria_prev_t', a: 'aria-label' },
    { s: '#tNext', k: 'aria_next_t', a: 'aria-label' },

    /* — Press — */
    { s: '#pressHeading', k: 'press_label', h: true },

    /* — Journal — */
    { s: '#journal .label', k: 'jour_label' },
    { s: '#journal h2 .split-a', k: 'jour_h2a' },
    { s: '#journal h2 em', k: 'jour_h2b', h: true },
    { s: '#journalAll', k: 'jour_all' },
    { s: '.journal-card:nth-child(1) .journal-cat', k: 'j1_cat' },
    { s: '.journal-card:nth-child(1) .journal-title', k: 'j1_title' },
    { s: '.journal-card:nth-child(1) .journal-excerpt', k: 'j1_excerpt' },
    { s: '.journal-card:nth-child(1) .journal-date', k: 'j1_date' },
    { s: '.journal-card:nth-child(2) .journal-cat', k: 'j2_cat' },
    { s: '.journal-card:nth-child(2) .journal-title', k: 'j2_title' },
    { s: '.journal-card:nth-child(2) .journal-excerpt', k: 'j2_excerpt' },
    { s: '.journal-card:nth-child(2) .journal-date', k: 'j2_date' },
    { s: '.journal-card:nth-child(3) .journal-cat', k: 'j3_cat' },
    { s: '.journal-card:nth-child(3) .journal-title', k: 'j3_title', h: true },
    { s: '.journal-card:nth-child(3) .journal-excerpt', k: 'j3_excerpt' },
    { s: '.journal-card:nth-child(3) .journal-date', k: 'j3_date' },

    /* — Instagram — */
    { s: '#instaHeading .label', k: 'insta_label' },
    { s: '#instaH2a', k: 'insta_h2a' },
    { s: '#instaH2b', k: 'insta_h2b', h: true },

    /* — FAQ — */
    { s: '#faq .label', k: 'faq_label', h: true },
    { s: '#faq h2 .split-a', k: 'faq_h2a' },
    { s: '#faq h2 em', k: 'faq_h2b', h: true },
    { s: '#faq-q1 .faq-q-text', k: 'faq1_q' },
    { s: '#faq-a1 p', k: 'faq1_a' },
    { s: '#faq-q2 .faq-q-text', k: 'faq2_q' },
    { s: '#faq-a2 p', k: 'faq2_a' },
    { s: '#faq-q3 .faq-q-text', k: 'faq3_q' },
    { s: '#faq-a3 p', k: 'faq3_a' },
    { s: '#faq-q4 .faq-q-text', k: 'faq4_q' },
    { s: '#faq-a4 p', k: 'faq4_a' },
    { s: '#faq-q5 .faq-q-text', k: 'faq5_q' },
    { s: '#faq-a5 p', k: 'faq5_a' },
    { s: '#faq-q6 .faq-q-text', k: 'faq6_q' },
    { s: '#faq-a6 p', k: 'faq6_a' },
    { s: '#faq-q7 .faq-q-text', k: 'faq7_q' },
    { s: '#faq-a7 p', k: 'faq7_a' },
    { s: '#faq-q8 .faq-q-text', k: 'faq8_q' },
    { s: '#faq-a8 p', k: 'faq8_a' },

    /* — Consultation Form — */
    { s: '#contact .label', k: 'con_label' },
    { s: '#contact h2 .split-a', k: 'con_h2a' },
    { s: '#contact h2 em', k: 'con_h2b', h: true },
    { s: '#conP', k: 'con_p' },
    { s: '.promise:nth-child(1) span', k: 'con_promise1' },
    { s: '.promise:nth-child(2) span', k: 'con_promise2' },
    { s: '.promise:nth-child(3) span', k: 'con_promise3' },
    { s: '.promise:nth-child(4) span', k: 'con_promise4', h: true },
    { s: '.form-title', k: 'con_form_title' },
    { s: 'label[for="firstName"]', k: 'con_fn', partial: 'label' },
    { s: '#firstName', k: 'con_fn_ph', a: 'placeholder' },
    { s: 'label[for="lastName"]', k: 'con_ln', partial: 'label' },
    { s: '#lastName', k: 'con_ln_ph', a: 'placeholder' },
    { s: 'label[for="email"]', k: 'con_email', partial: 'label' },
    { s: '#email', k: 'con_email_ph', a: 'placeholder' },
    { s: 'label[for="phone"]', k: 'con_phone', partial: 'label' },
    { s: '#phone', k: 'con_phone_ph', a: 'placeholder' },
    { s: 'label[for="address"]', k: 'con_addr' },
    { s: '#address', k: 'con_addr_ph', a: 'placeholder' },
    { s: 'label[for="service"]', k: 'con_service' },
    { s: '#service option[value=""]', k: 'con_service_ph' },
    { s: '#service option[value="luxury-staging"]', k: 'opt_stage' },
    { s: '#service option[value="interior-design"]', k: 'opt_design' },
    { s: '#service option[value="luxury-styling"]', k: 'opt_styling' },
    { s: '#service option[value="model-home"]', k: 'opt_model' },
    { s: '#service option[value="consultation"]', k: 'opt_consult' },
    { s: '#service option[value="virtual-staging"]', k: 'opt_virtual' },
    { s: '#service option[value="realtor-partner"]', k: 'opt_realtor' },
    { s: '#service option[value="builder-partner"]', k: 'opt_builder' },
    { s: '#service option[value="other"]', k: 'opt_other' },
    { s: 'label[for="timeline"]', k: 'con_tl' },
    { s: '#timeline option[value=""]', k: 'con_tl_ph' },
    { s: '#timeline option[value="asap"]', k: 'tl_asap' },
    { s: '#timeline option[value="1-2-weeks"]', k: 'tl_2w' },
    { s: '#timeline option[value="1-month"]', k: 'tl_1m' },
    { s: '#timeline option[value="1-3-months"]', k: 'tl_3m' },
    { s: '#timeline option[value="exploring"]', k: 'tl_explore' },
    { s: 'label[for="message"]', k: 'con_msg' },
    { s: '#message', k: 'con_msg_ph', a: 'placeholder' },
    { s: '#formSubmit', k: 'con_submit', partial: 'text' },
    { s: '#formSuccess h3', k: 'success_title' },
    { s: '#formSuccess p', k: 'success_msg' },

    /* — Footer — */
    { s: '.footer-tagline', k: 'foot_tagline' },
    { s: '.footer-grid .footer-col:nth-child(2) h4', k: 'foot_services' },
    { s: '.footer-grid .footer-col:nth-child(3) h4', k: 'foot_company' },
    { s: '.footer-grid .footer-col:nth-child(4) h4', k: 'foot_connect' },
    { s: '#footPrivacy', k: 'foot_privacy' },
    { s: '#footTerms', k: 'foot_terms' },
    { s: '#footSitemap', k: 'foot_sitemap' },
    { s: '#footCopy', k: 'foot_copy', h: true },

    /* — Concierge — */
    { s: '.ch-status', k: 'conc_status', partial: 'status' },
    { s: '#conciergeInput', k: 'conc_ph', a: 'placeholder' },
    { s: '.concierge-footer-note', k: 'conc_note' },
    { s: '.concierge-label', k: 'conc_label' },
    { s: '#conciergeBtn', k: 'conc_open', a: 'aria-label' },
  ];

  /* ─── ENGINE ──────────────────────────────────────────────────── */
  const JCL_I18N = {
    lang: 'en',
    announcements: { en: [], es: [] },

    init() {
      const param = new URLSearchParams(window.location.search).get('lang');
      const saved = localStorage.getItem('jcl_lang');
      const browser = (navigator.language || navigator.userLanguage || '').slice(0, 2).toLowerCase();
      const detected = param || saved || (browser === 'es' ? 'es' : 'en');

      // Suggest but don't force on first visit
      if (!saved && !param && browser === 'es') {
        this._suggestLang('es');
      }

      this.apply(detected === 'es' ? 'es' : 'en', false);
      this._setupSwitcher();
      this._addHreflang();
    },

    apply(lang, animate = true) {
      const translations = T[lang];
      if (!translations) return;

      if (animate) {
        document.body.style.transition = 'opacity 0.2s ease';
        document.body.style.opacity = '0.85';
      }

      this.lang = lang;
      localStorage.setItem('jcl_lang', lang);
      document.documentElement.lang = lang;

      // Apply all element translations
      MAP.forEach(({ s, k, h, a, hero, multi, partial }) => {
        if (!k || !translations[k]) return;
        const val = translations[k];
        const els = document.querySelectorAll(s);
        els.forEach(el => {
          if (a) {
            el.setAttribute(a, val);
          } else if (hero) {
            // Hero lines — handle h-line-inner wrapper added by JS
            const inner = el.querySelector('.h-line-inner');
            if (inner) { if (h) inner.innerHTML = val; else inner.textContent = val; }
            else { if (h) el.innerHTML = val; else el.textContent = val; }
          } else if (partial === 'text') {
            // Only update text node, preserve child elements (arrows, icons)
            const textNode = [...el.childNodes].find(n => n.nodeType === 3);
            if (textNode) textNode.textContent = val + ' ';
            else if (h) el.innerHTML = val; else el.textContent = val;
          } else if (partial === 'label') {
            // Label with required marker
            const req = el.querySelector('[aria-label="required"]');
            if (h) el.innerHTML = val; else el.firstChild && el.firstChild.nodeType === 3
              ? (el.firstChild.textContent = val + ' ')
              : (el.textContent = val + (req ? ' *' : ''));
            if (req) el.appendChild(req);
          } else if (partial === 'status') {
            // Concierge status — preserve dot
            const dot = el.querySelector('.ch-status-dot');
            el.textContent = val;
            if (dot) el.prepend(dot);
          } else if (h) {
            el.innerHTML = val;
          } else {
            el.textContent = val;
          }
        });
      });

      // Update footer year
      const footCopy = document.querySelector('#footCopy');
      if (footCopy) {
        footCopy.innerHTML = translations.foot_copy.replace('{year}', new Date().getFullYear());
      }

      // Update meta
      this._updateMeta(lang, translations);

      // Update switcher state
      document.querySelectorAll('.lang-btn, .mlang-btn').forEach(btn => {
        const active = btn.dataset.lang === lang;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-pressed', String(active));
      });

      // Broadcast language change to main.js (Olivia)
      window.dispatchEvent(new CustomEvent('jcl:langchange', { detail: { lang, T: translations } }));

      if (animate) {
        setTimeout(() => {
          document.body.style.opacity = '1';
          setTimeout(() => { document.body.style.transition = ''; }, 250);
        }, 60);
      }
    },

    _updateMeta(lang, t) {
      document.title = t.meta_title;

      const setMeta = (sel, val) => {
        const el = document.querySelector(sel);
        if (el) el.content = val;
      };
      setMeta('meta[name="description"]', t.meta_desc);
      setMeta('meta[property="og:title"]', t.og_title);
      setMeta('meta[property="og:description"]', t.og_desc);
      setMeta('meta[name="twitter:title"]', t.og_title);
      setMeta('meta[name="twitter:description"]', t.og_desc);

      // Canonical
      const canon = document.querySelector('link[rel="canonical"]');
      if (canon) canon.href = lang === 'es'
        ? 'https://faneliacoding-cloud.github.io/jcl-staging/es/'
        : 'https://faneliacoding-cloud.github.io/jcl-staging/';

      // HTML lang
      document.documentElement.lang = lang === 'es' ? 'es' : 'en';
    },

    _addHreflang() {
      if (document.querySelector('link[hreflang]')) return;
      const head = document.head;
      const links = [
        { hreflang: 'en', href: 'https://faneliacoding-cloud.github.io/jcl-staging/' },
        { hreflang: 'es', href: 'https://faneliacoding-cloud.github.io/jcl-staging/es/' },
        { hreflang: 'x-default', href: 'https://faneliacoding-cloud.github.io/jcl-staging/' },
      ];
      links.forEach(({ hreflang, href }) => {
        const link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = hreflang;
        link.href = href;
        head.appendChild(link);
      });
    },

    _setupSwitcher() {
      document.querySelectorAll('.lang-btn, .mlang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const newLang = btn.dataset.lang;
          if (newLang !== this.lang) {
            this.apply(newLang);
            // Update URL query param without reload
            const url = new URL(window.location.href);
            if (newLang === 'es') url.searchParams.set('lang', 'es');
            else url.searchParams.delete('lang');
            history.replaceState({}, '', url.toString());
          }
        });
        // Keyboard accessibility
        btn.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
        });
      });
    },

    _suggestLang(lang) {
      // On first Spanish-browser visit, show a gentle suggestion (not forced redirect)
      const banner = document.createElement('div');
      banner.id = 'langSuggest';
      banner.setAttribute('role', 'status');
      banner.setAttribute('aria-live', 'polite');
      banner.innerHTML = `
        <span>¿Prefiere continuar en Español?</span>
        <button id="langSuggestYes">Sí, cambiar</button>
        <button id="langSuggestNo">No, gracias</button>
      `;
      document.body.prepend(banner);

      const yes = document.getElementById('langSuggestYes');
      const no = document.getElementById('langSuggestNo');
      const dismiss = () => banner.remove();

      yes && yes.addEventListener('click', () => { this.apply('es'); dismiss(); });
      no && no.addEventListener('click', dismiss);
      setTimeout(dismiss, 12000);
    },

    getString(key) {
      return (T[this.lang] || T.en)[key] || '';
    }
  };

  window.JCL_I18N = JCL_I18N;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => JCL_I18N.init());
  } else {
    JCL_I18N.init();
  }

})();
