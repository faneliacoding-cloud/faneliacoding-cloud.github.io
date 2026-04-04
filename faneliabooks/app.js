/* ============================================================
   FaneliaBooks — App Logic (Redesigned)
   OverDrive-inspired shelf carousels + grid view
   ============================================================ */

const CHECKOUT_WORKER = "https://faneliabooks-checkout.faneliabooks.workers.dev/checkout";

const BOOKS = [
  {
    id: 1, title: "The 30-Day Money Reset", slug: "30-day-money-reset", price: 17,
    category: "finance", catLabel: "💰 Finance", cover: "covers/the-30-day-money-reset.png",
    description: "In just 30 days, you'll break bad money habits, build better ones, and finally feel in control of your finances. The 30-Day Money Reset gives you a daily action plan to track spending, reduce debt, start saving, and build a money mindset that actually works. No budgeting apps required.",
    excerpt: "Break bad money habits in 30 days with a daily action plan.",
  },
  {
    id: 2, title: "Index Funds Made Simple", slug: "index-funds-made-simple", price: 17,
    category: "finance", catLabel: "💰 Finance", cover: "covers/index-funds-made-simple.png",
    description: "The easiest path to building wealth doesn't require stock-picking, day trading, or a finance degree. Index Funds Made Simple teaches you exactly how to start investing in low-cost index funds, build a diversified portfolio, and let compound interest do the heavy lifting — for beginners and intermediates alike.",
    excerpt: "The easiest path to wealth — no finance degree required.",
  },
  {
    id: 3, title: "The 5-Hour Focus Formula", slug: "5-hour-focus-formula", price: 17,
    category: "productivity", catLabel: "⚡ Productivity", cover: "covers/the-5-hour-focus-formula.png",
    description: "Stop working more hours and start getting more done. The 5-Hour Focus Formula teaches you how to identify your highest-leverage tasks, eliminate distractions, and enter deep work states that produce more output in 5 focused hours than most people get in a full 8-hour day.",
    excerpt: "Get more done in 5 focused hours than most do in 8.",
  },
  {
    id: 4, title: "Stop Surviving, Start Thriving", slug: "stop-surviving-start-thriving", price: 17,
    category: "relationships", catLabel: "❤️ Relationships", cover: "covers/stop-surviving-start-thriving.png",
    description: "Are you just going through the motions? Stop Surviving, Start Thriving is your guide to breaking out of survival mode and building a life you actually love. From rewiring negative thought patterns to setting powerful goals and building meaningful relationships — this book will reignite your drive.",
    excerpt: "Break out of survival mode and build a life you love.",
  },
  {
    id: 5, title: "The Lazy Person's Guide to Losing 20 Pounds", slug: "lazy-persons-guide-fitness", price: 17,
    category: "fitness", catLabel: "💪 Fitness", cover: "covers/lazy-persons-guide-fitness.png",
    description: "No crash diets, no brutal workouts, no misery required. The Lazy Person's Guide to Losing 20 Pounds reveals the sustainable, science-backed habits that burn fat without turning your life upside down. Perfect for busy people who want real results without the torture.",
    excerpt: "Burn fat without crash diets or brutal workouts.",
  },
  {
    id: 6, title: "15-Minute Mornings", slug: "15-minute-mornings", price: 12,
    category: "productivity", catLabel: "⚡ Productivity", cover: "covers/15-minute-mornings.png",
    description: "You don't need a 2-hour morning routine to win the day. 15-Minute Mornings shows you how to build a powerful, energizing morning ritual in just 15 minutes — with habits for mindset, movement, and intention that set you up for success every single day.",
    excerpt: "Win the day with a powerful 15-minute morning ritual.",
  },
  {
    id: 7, title: "6 Figures With a Laptop", slug: "6-figures-with-a-laptop", price: 27,
    category: "business", catLabel: "🚀 Business", cover: "covers/6-figures-with-a-laptop.png",
    description: "The blueprint for building a six-figure online business from your laptop — wherever you are in the world. 6 Figures With a Laptop covers the top online business models, how to validate an idea fast, get your first clients, and scale to consistent income without an office or employees.",
    excerpt: "Build a six-figure online business from anywhere.",
  },
  {
    id: 8, title: "Weekend Side Hustle Playbook", slug: "weekend-side-hustle-playbook", price: 17,
    category: "business", catLabel: "🚀 Business", cover: "covers/weekend-side-hustle-playbook.png",
    description: "Start a side hustle this weekend — seriously. The Weekend Side Hustle Playbook gives you 10 proven side income ideas you can launch in 48 hours with no startup capital. Turn your skills, time, and spare weekends into a recurring income stream that grows alongside your day job.",
    excerpt: "Launch a side hustle in 48 hours with no startup capital.",
  },
  {
    id: 9, title: "Options in Plain English", slug: "options-in-plain-english", price: 17,
    category: "finance", catLabel: "💰 Finance", cover: "covers/options-in-plain-english.png",
    description: "Options trading sounds complicated — it doesn't have to be. Options in Plain English breaks down calls, puts, spreads, and strategies in language anyone can understand. Whether you're curious about options or ready to start trading, this is the foundation that makes everything else click.",
    excerpt: "Understand options trading in plain, simple language.",
  },
  {
    id: 10, title: "The Smart Investor's Cheat Sheet", slug: "smart-investors-cheat-sheet", price: 17,
    category: "finance", catLabel: "💰 Finance", cover: "covers/smart-investors-cheat-sheet.png",
    description: "The key formulas, ratios, and frameworks that seasoned investors use to evaluate stocks — all in one essential reference guide. The Smart Investor's Cheat Sheet breaks down P/E ratios, dividend yields, ROE, free cash flow, and more in a clear, visual format you can actually use.",
    excerpt: "The key formulas every smart investor needs to know.",
  },
  {
    id: 11, title: "The Magnetic Personality Blueprint", slug: "the-magnetic-personality", price: 17,
    category: "relationships", catLabel: "❤️ Relationships", cover: "covers/the-magnetic-personality.png",
    description: "Charisma isn't something you're born with — it's a skill you can learn. The Magnetic Personality Blueprint teaches you the communication habits, body language secrets, and social intelligence that make people naturally drawn to you, trust you, and want you in their corner.",
    excerpt: "Learn the habits that make people naturally drawn to you.",
  },
  {
    id: 12, title: "Heal and Rise", slug: "heal-and-rise", price: 17,
    category: "relationships", catLabel: "❤️ Relationships", cover: "covers/heal-and-rise.png",
    description: "Healing isn't linear — and it isn't weak. Heal and Rise is a compassionate, action-oriented guide to recovering from emotional wounds, toxic relationships, grief, and trauma. You'll learn healthy coping strategies, how to rebuild self-worth, and how to move forward with purpose.",
    excerpt: "A compassionate guide to healing and moving forward with purpose.",
  },
  {
    id: 13, title: "15-Minute Meals That Don't Suck", slug: "15-minute-meals", price: 17,
    category: "cooking", catLabel: "🍳 Cooking", cover: "covers/15-minute-meals-that-dont-suck.png",
    description: "You don't need to be a chef to eat well. 15-Minute Meals That Don't Suck gives you a collection of fast, healthy, and genuinely delicious recipes you can make in 15 minutes or less. Perfect for busy professionals, students, and anyone who's tired of ordering takeout every night.",
    excerpt: "Fast, healthy, delicious meals you can make in 15 minutes.",
  },
  {
    id: 14, title: "The Lazy Keto Cookbook", slug: "lazy-keto-cookbook", price: 17,
    category: "cooking", catLabel: "🍳 Cooking", cover: "covers/lazy-keto-cookbook.png",
    description: "Keto works — but most keto cookbooks make it complicated. The Lazy Keto Cookbook strips it down to the simple, satisfying meals that actually keep you in ketosis without spending hours in the kitchen. Includes meal plans, shopping lists, and recipes for every skill level.",
    excerpt: "Simple keto meals that keep you in ketosis without the hassle.",
  },
  {
    id: 15, title: "ChatGPT for Non-Techies", slug: "chatgpt-for-non-techies", price: 17,
    category: "tech", catLabel: "💻 Tech & AI", cover: "covers/chatgpt-for-non-techies.png",
    description: "AI is changing everything — and you don't need to be a programmer to benefit. ChatGPT for Non-Techies is the practical guide to using AI tools in your everyday life and career. Write better emails, plan faster, create content, automate tasks, and get more done with AI as your copilot.",
    excerpt: "Use AI to get more done — no coding skills required.",
  },
  {
    id: 16, title: "Excel Secrets That Experts Use", slug: "excel-secrets", price: 17,
    category: "tech", catLabel: "💻 Tech & AI", cover: "covers/excel-secrets.png",
    description: "Most people use 5% of Excel's power. Excel Secrets That Experts Use teaches you the formulas, pivot tables, shortcuts, and automation tricks that turn you from a spreadsheet user into a spreadsheet master. Perfect for professionals who want to work smarter and impress their teams.",
    excerpt: "Master pivot tables, formulas, and automation tricks.",
  },
  {
    id: 31, title: "Code Everything: The Complete Guide to Every Programming Language", slug: "code-everything", price: 19,
    category: "tech", catLabel: "💻 Tech & AI", cover: "covers/code-everything.png",
    description: "100+ pages covering every programming language actively used today — Python, JavaScript, TypeScript, Java, C, C++, Go, Rust, Swift, Kotlin, PHP, Ruby, SQL, R, Bash, Dart/Flutter, Scala, Lua, Haskell, and Elixir. Real syntax, real code examples, use cases, and a clear guide on when to choose each language.",
    excerpt: "20 languages. Real code. One definitive guide.",
  },
  {
    id: 17, title: "Ziggy and the Missing Stars", slug: "ziggy-and-the-missing-stars", price: 7,
    category: "childrens", catLabel: "🌟 Children's", cover: "covers/ziggy-and-the-missing-stars.png",
    description: "A beautifully illustrated children's ebook about Ziggy, a little fox who learns that the stars don't disappear — they hide behind clouds. A gentle story about fear, courage, and finding light in the dark. Perfect for children ages 4–8 and their parents.",
    excerpt: "A gentle story about courage and finding light in the dark. Ages 4–8.",
  },
  {
    id: 18, title: "Mia Learns to Say Sorry", slug: "mia-learns-to-say-sorry", price: 7,
    category: "childrens", catLabel: "🌟 Children's", cover: "covers/mia-learns-to-say-sorry.png",
    description: "When Mia accidentally breaks her best friend's favorite toy, she learns that saying sorry is harder than it looks — but more powerful than she imagined. A heartwarming children's story about empathy, accountability, and the courage it takes to make things right. Perfect for ages 4–8.",
    excerpt: "A heartwarming story about empathy and making things right. Ages 4–8.",
  },
  {
    id: 19, title: "Start the Damn Business", slug: "start-the-damn-business", price: 27,
    category: "business", catLabel: "🚀 Business", cover: "covers/start-the-damn-business.png",
    description: "Stop waiting for the perfect moment — it's not coming. Start the Damn Business is the no-BS guide to launching your first business in 30 days or less. Covers finding your idea, validating it fast, getting your first customer, and building momentum before you run out of motivation.",
    excerpt: "The no-BS guide to launching your first business in 30 days.",
  },
  {
    id: 20, title: "The One-Page Marketing Plan", slug: "one-page-marketing-plan", price: 17,
    category: "business", catLabel: "🚀 Business", cover: "covers/one-page-marketing-plan.png",
    description: "Marketing doesn't have to be complicated. The One-Page Marketing Plan gives you a dead-simple framework to clarify your target customer, craft your message, choose your channels, and execute consistently. Perfect for small business owners, freelancers, and side hustlers who need marketing that actually works.",
    excerpt: "A dead-simple marketing framework for small business owners.",
  },
  {
    id: 21, title: "The Last Kiss", slug: "the-last-kiss", price: 9,
    category: "romance", catLabel: "💕 Romance", cover: "covers/the-last-kiss.png",
    description: "Some loves never truly end — they just wait. When Sofia runs into her college ex Marcus ten years later at a farmers market, she tells herself it's just coincidence. But the coffee turns into dinner, dinner turns into honesty, and honesty turns into everything she'd packed into storage a decade ago.",
    excerpt: "Some loves never truly end — they just wait.",
  },
  {
    id: 22, title: "His Secret Lover", slug: "his-secret-lover", price: 9,
    category: "romance", catLabel: "💕 Romance", cover: "covers/his-secret-lover.png",
    description: "A wrong hotel bar, a man who says the right things, and a complication she saw coming but walked toward anyway. His Secret Lover is a sensual, morally complex romance about what we owe ourselves — and each other.",
    excerpt: "Some secrets change you before you ever get to tell them.",
  },
  {
    id: 23, title: "Vows We Break", slug: "vows-we-break", price: 9,
    category: "romance", catLabel: "💕 Romance", cover: "covers/vows-we-break.png",
    description: "Twelve years in, Camille and Marcus have mastered the art of being together without being present. Vows We Break is about choosing someone again, and again, and what that actually costs.",
    excerpt: "When love isn't enough, what is?",
  },
  {
    id: 24, title: "Between the Sheets", slug: "between-the-sheets", price: 9,
    category: "romance", catLabel: "💕 Romance", cover: "covers/between-the-sheets.png",
    description: "One rainstorm. One bar. A night that starts as something temporary and refuses to stay that way. Between the Sheets is a sensual, honest romance about two people who thought they knew the rules of brief — and what happens when neither can bring themselves to follow them.",
    excerpt: "Two strangers. One rainstorm. A night that changes everything.",
  },
  {
    id: 25, title: "The Other Woman", slug: "the-other-woman", price: 9,
    category: "romance", catLabel: "💕 Romance", cover: "covers/the-other-woman.png",
    description: "She knew. She chose. And then she had to live with both. The Other Woman is a raw, unflinching story told from the perspective of Lena — the one nobody roots for.",
    excerpt: "The woman in the shadows has a story too.",
  },
  {
    id: 26, title: "Second Chances", slug: "second-chances", price: 9,
    category: "romance", catLabel: "💕 Romance", cover: "covers/second-chances.png",
    description: "They were twenty-four when they loved each other, and twenty-four was the wrong time. Eleven years later, in a coffee shop on a Tuesday, they get to find out what they'd be now.",
    excerpt: "Some loves are worth a second read.",
  },
  {
    id: 27, title: "Midnight Confessions", slug: "midnight-confessions", price: 9,
    category: "romance", catLabel: "💕 Romance", cover: "covers/midnight-confessions.png",
    description: "It started with a wrong number at 11:47 PM. By 2 AM they hadn't exchanged names. By week three, Jade knew things about Marcus she didn't know about most people she'd known for years.",
    excerpt: "Some conversations are best had in the dark.",
  },
  {
    id: 28, title: "The Arrangement", slug: "the-arrangement", price: 9,
    category: "romance", catLabel: "💕 Romance", cover: "covers/the-arrangement.png",
    description: "Twelve weeks. Four events. No complications. The contract between Vivienne and Dominic was airtight — until it wasn't.",
    excerpt: "What starts as pretend doesn't always know how to stop.",
  },
  {
    id: 29, title: "Unspoken Desires", slug: "unspoken-desires", price: 9,
    category: "romance", catLabel: "💕 Romance", cover: "covers/unspoken-desires.png",
    description: "They were on the same project team. The handbook had opinions about that. Unspoken Desires is a charged, precise romance about what happens when two people who are very good at rules decide they've followed them long enough.",
    excerpt: "Some rules exist to be tested. This is one of them.",
  },
  {
    id: 30, title: "After the Wedding", slug: "after-the-wedding", price: 9,
    category: "romance", catLabel: "💕 Romance", cover: "covers/after-the-wedding.png",
    description: "The wedding was perfect. The marriage took more work. After the Wedding is a tender, real story about what love looks like when the occasion is over and the life begins.",
    excerpt: "Marriage is not the ending. It is the beginning of everything harder and better.",
  },
];

// ============================================================
// SHELF DEFINITIONS — themed collections
// ============================================================
const SHELVES = [
  {
    id: "trending",
    title: "🔥 Trending Now",
    subtitle: "Our most popular reads this month",
    bookIds: [7, 19, 15, 1, 5, 21, 31, 3],
  },
  {
    id: "wealth",
    title: "💰 Build Your Wealth",
    subtitle: "Master money, investing & financial freedom",
    filter: "finance",
  },
  {
    id: "business",
    title: "🚀 Level Up Your Career",
    subtitle: "Business, marketing & entrepreneurship",
    filter: "business",
  },
  {
    id: "mind-body",
    title: "🧠 Mind & Body",
    subtitle: "Productivity, fitness, cooking & self-improvement",
    filters: ["productivity", "fitness", "cooking"],
  },
  {
    id: "tech",
    title: "💻 Tech & AI",
    subtitle: "Stay ahead with technology",
    filter: "tech",
  },
  {
    id: "relationships",
    title: "❤️ Heart & Soul",
    subtitle: "Relationships, healing & personal growth",
    filter: "relationships",
  },
  {
    id: "romance",
    title: "💕 Romance Collection",
    subtitle: "Love stories that stay with you",
    filter: "romance",
  },
  {
    id: "kids",
    title: "🌟 For Little Readers",
    subtitle: "Beautiful stories for ages 4–8",
    filter: "childrens",
  },
];

// ============================================================
// STATE
// ============================================================
let currentCategory = "all";
let currentSearch = "";
let currentSort = "default";
let viewMode = "shelves"; // "shelves" or "grid"

// ============================================================
// DOM REFS
// ============================================================
const shelvesContainer = document.getElementById("shelves-container");
const booksSection     = document.getElementById("books-section");
const booksGrid        = document.getElementById("books-grid");
const booksCount       = document.getElementById("books-count");
const booksTitle       = document.getElementById("books-title");
const noResults        = document.getElementById("no-results");
const searchInput      = document.getElementById("search-input");
const mobileSearch     = document.getElementById("mobile-search-input");
const sortSelect       = document.getElementById("sort-select");
const categoryTabs     = document.getElementById("category-tabs");
const modalOverlay     = document.getElementById("modal-overlay");
const modalClose       = document.getElementById("modal-close");
const navHeader        = document.getElementById("nav-header");
const hamburger        = document.getElementById("hamburger");
const mobileMenu       = document.getElementById("mobile-menu");

// ============================================================
// SHELF RENDERING
// ============================================================
function getShelfBooks(shelf) {
  if (shelf.bookIds) {
    return shelf.bookIds.map(id => BOOKS.find(b => b.id === id)).filter(Boolean);
  }
  if (shelf.filters) {
    return BOOKS.filter(b => shelf.filters.includes(b.category));
  }
  if (shelf.filter) {
    return BOOKS.filter(b => b.category === shelf.filter);
  }
  return [];
}

function renderShelves() {
  shelvesContainer.innerHTML = "";

  SHELVES.forEach(shelf => {
    const books = getShelfBooks(shelf);
    if (books.length === 0) return;

    const section = document.createElement("section");
    section.className = "shelf-section";
    section.id = `shelf-${shelf.id}`;

    section.innerHTML = `
      <div class="shelf-header">
        <div>
          <h2 class="shelf-title">${shelf.title}</h2>
          <p class="shelf-subtitle">${shelf.subtitle}</p>
        </div>
        <a href="#" class="shelf-link" data-shelf-cat="${shelf.filter || 'all'}">
          View all ${books.length} titles →
        </a>
      </div>
      <div class="shelf-carousel-wrap">
        <button class="carousel-arrow carousel-arrow-left" aria-label="Scroll left">‹</button>
        <div class="shelf-carousel" data-shelf="${shelf.id}"></div>
        <button class="carousel-arrow carousel-arrow-right" aria-label="Scroll right">›</button>
      </div>
    `;

    const carousel = section.querySelector(".shelf-carousel");
    books.forEach(book => {
      carousel.appendChild(createBookCard(book));
    });

    // Arrow functionality
    const leftArrow = section.querySelector(".carousel-arrow-left");
    const rightArrow = section.querySelector(".carousel-arrow-right");
    const scrollAmount = 400;

    leftArrow.addEventListener("click", () => {
      carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    rightArrow.addEventListener("click", () => {
      carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    // Shelf "View all" link
    const viewLink = section.querySelector(".shelf-link");
    viewLink.addEventListener("click", (e) => {
      e.preventDefault();
      const cat = viewLink.dataset.shelfCat;
      if (cat && cat !== "all") {
        switchToGrid(cat);
      }
    });

    shelvesContainer.appendChild(section);
  });
}

// ============================================================
// BOOK CARD CREATION (shared between shelves and grid)
// ============================================================
function createBookCard(book) {
  const card = document.createElement("div");
  card.className = "book-card";
  card.setAttribute("role", "article");
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-label", `${book.title} — $${book.price}`);

  card.innerHTML = `
    <div class="book-cover">
      <img class="book-cover-img" src="${book.cover}" alt="${book.title} cover" loading="lazy" />
      <div class="book-cat-tag">${book.catLabel}</div>
      <div class="book-overlay">
        <button class="book-overlay-btn">View Details</button>
      </div>
    </div>
    <div class="book-info">
      <div class="book-title">${book.title}</div>
      <div class="book-footer">
        <div class="book-price">$${book.price}</div>
        <div class="book-format">PDF</div>
      </div>
    </div>
  `;

  card.addEventListener("click", () => openModal(book));
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") openModal(book);
  });

  return card;
}

// ============================================================
// GRID VIEW (filtered)
// ============================================================
function getFilteredBooks() {
  let books = [...BOOKS];

  if (currentCategory !== "all") {
    books = books.filter(b => b.category === currentCategory);
  }

  if (currentSearch.trim()) {
    const q = currentSearch.toLowerCase();
    books = books.filter(b =>
      b.title.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q) ||
      b.catLabel.toLowerCase().includes(q)
    );
  }

  switch (currentSort) {
    case "price-asc":  books.sort((a, b) => a.price - b.price); break;
    case "price-desc": books.sort((a, b) => b.price - a.price); break;
    case "name-asc":   books.sort((a, b) => a.title.localeCompare(b.title)); break;
    default: break;
  }

  return books;
}

function renderGrid() {
  const books = getFilteredBooks();
  booksGrid.innerHTML = "";

  if (books.length === 0) {
    noResults.style.display = "block";
    booksCount.textContent = "";
  } else {
    noResults.style.display = "none";
    booksCount.textContent = `(${books.length})`;
    books.forEach(book => {
      booksGrid.appendChild(createBookCard(book));
    });
  }

  const catTab = document.querySelector(`.cat-tab[data-cat="${currentCategory}"]`);
  const catName = catTab ? catTab.textContent.trim() : "All Books";
  booksTitle.innerHTML = `${currentCategory === "all" ? "All Books" : catName} <span class="books-count">${books.length > 0 ? `(${books.length})` : ""}</span>`;
}

function switchToGrid(cat) {
  viewMode = "grid";
  currentCategory = cat || "all";

  // Update pill state
  document.querySelectorAll(".cat-tab").forEach(t => {
    t.classList.toggle("active", t.dataset.cat === currentCategory);
    t.setAttribute("aria-selected", t.dataset.cat === currentCategory ? "true" : "false");
  });

  shelvesContainer.classList.add("hidden");
  booksSection.classList.add("grid-active");
  renderGrid();
  booksSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function switchToShelves() {
  viewMode = "shelves";
  currentCategory = "all";
  currentSearch = "";

  document.querySelectorAll(".cat-tab").forEach(t => {
    t.classList.toggle("active", t.dataset.cat === "all");
    t.setAttribute("aria-selected", t.dataset.cat === "all" ? "true" : "false");
  });

  shelvesContainer.classList.remove("hidden");
  booksSection.classList.remove("grid-active");
}

// ============================================================
// MODAL
// ============================================================
let currentBook = null;

function openModal(book) {
  currentBook = book;
  document.getElementById("modal-cover").src = book.cover;
  document.getElementById("modal-cover").alt = `${book.title} cover`;
  document.getElementById("modal-category").textContent = book.catLabel;
  document.getElementById("modal-title").textContent = book.title;
  document.getElementById("modal-price").textContent = `$${book.price}`;
  document.getElementById("modal-desc").textContent = book.description;
  document.getElementById("modal-buy-price").textContent = `$${book.price}`;

  const buyBtn = document.getElementById("modal-buy");
  buyBtn.innerHTML = `<span>Buy Now — </span><span id="modal-buy-price">$${book.price}</span>`;
  buyBtn.classList.remove("loading");

  modalOverlay.style.display = "flex";
  document.body.style.overflow = "hidden";
  setTimeout(() => modalClose.focus(), 100);
  // Track book view for Meta Pixel (Instagram/Facebook Ads)
  if (typeof fbq === 'function') {
    fbq('track', 'ViewContent', {
      content_name: book.title,
      content_ids: [book.slug],
      content_type: 'product',
      value: book.price,
      currency: 'USD',
    });
  }
  setTimeout(() => initWalletButtons(book), 250);
}

document.getElementById("modal-buy").addEventListener("click", async (e) => {
  e.preventDefault();
  if (!currentBook) return;

  const btn = document.getElementById("modal-buy");
  btn.innerHTML = `<span>Loading checkout…</span>`;
  btn.style.opacity = "0.7";
  btn.style.pointerEvents = "none";

  try {
    const res = await fetch(CHECKOUT_WORKER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: currentBook.slug }),
    });
    const data = await res.json();
    if (data.url) {
      // Track checkout initiation for Meta Pixel (Instagram/Facebook Ads)
      if (typeof fbq === 'function') {
        fbq('track', 'InitiateCheckout', {
          content_name: currentBook.title,
          content_ids: [currentBook.slug],
          value: currentBook.price,
          currency: 'USD',
        });
      }
      window.location.href = data.url;
    } else {
      throw new Error(data.error || "Checkout failed");
    }
  } catch (err) {
    btn.innerHTML = `<span>Buy Now — </span><span>$${currentBook.price}</span>`;
    btn.style.opacity = "1";
    btn.style.pointerEvents = "auto";
    alert("Checkout error: " + err.message + "\n\nPlease try again.");
  }
});

function closeModal() {
  modalOverlay.style.display = "none";
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ============================================================
// CATEGORY TABS
// ============================================================
categoryTabs.addEventListener("click", (e) => {
  const tab = e.target.closest(".cat-tab");
  if (!tab) return;

  const cat = tab.dataset.cat;

  if (cat === "all") {
    switchToShelves();
  } else {
    switchToGrid(cat);
  }
});

// ============================================================
// SEARCH
// ============================================================
let searchTimeout;
function handleSearch(val) {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    currentSearch = val;
    if (val.trim()) {
      currentCategory = "all";
      switchToGrid("all");
      renderGrid();
    } else if (viewMode === "grid" && currentCategory === "all") {
      switchToShelves();
    } else {
      renderGrid();
    }
  }, 250);
}

searchInput.addEventListener("input", (e) => handleSearch(e.target.value));
if (mobileSearch) mobileSearch.addEventListener("input", (e) => handleSearch(e.target.value));

searchInput.addEventListener("input", () => { if (mobileSearch) mobileSearch.value = searchInput.value; });
if (mobileSearch) mobileSearch.addEventListener("input", () => { searchInput.value = mobileSearch.value; });

// ============================================================
// SORT
// ============================================================
sortSelect.addEventListener("change", () => {
  currentSort = sortSelect.value;
  renderGrid();
});

// ============================================================
// HAMBURGER MENU
// ============================================================
hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

// Nav CTA
const navCta = document.getElementById("nav-cta");
if (navCta) {
  navCta.addEventListener("click", () => {
    const target = document.getElementById("shelves-container");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

// ============================================================
// STICKY NAV SCROLL
// ============================================================
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    navHeader.classList.add("scrolled");
  } else {
    navHeader.classList.remove("scrolled");
  }
}, { passive: true });

// ============================================================
// FOOTER CATEGORY LINKS
// ============================================================
document.querySelectorAll("[data-filter-cat]").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const cat = link.dataset.filterCat;
    switchToGrid(cat);
  });
});

// ============================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", (e) => {
    const href = anchor.getAttribute("href");
    if (href === "#") return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      if (mobileMenu.classList.contains("open")) {
        mobileMenu.classList.remove("open");
      }
    }
  });
});

// ============================================================
// INIT
// ============================================================
renderShelves();

// ============================================================
// APPLE PAY / GOOGLE PAY — Stripe Payment Request Button
// ============================================================
const PK = "pk_live_51T9cNs21ZZ5XnB58ndzOiQQIrR0zmKNds805J52rPu7rdAH3frjr6BabPz1726Kx1bY13DTtiGH0PiCv8VTDr7Nf00V37XYgHL";
const stripe = Stripe(PK);

let prButton = null;
let prButtonMounted = false;

async function initWalletButtons(book) {
  const walletContainer = document.getElementById("wallet-buttons");
  const prContainer = document.getElementById("payment-request-button");

  prContainer.innerHTML = "";
  walletContainer.style.display = "none";
  prButtonMounted = false;

  try {
    const res = await fetch(CHECKOUT_WORKER.replace("/checkout", "/intent"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: book.slug }),
    });
    const { clientSecret, amount, name } = await res.json();
    if (!clientSecret) return;

    const paymentRequest = stripe.paymentRequest({
      country: "US",
      currency: "usd",
      total: { label: name, amount },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    const canMakePayment = await paymentRequest.canMakePayment();
    if (!canMakePayment) return;

    const elements = stripe.elements();
    prButton = elements.create("paymentRequestButton", {
      paymentRequest,
      style: {
        paymentRequestButton: {
          type: "buy",
          theme: "dark",
          height: "52px",
        },
      },
    });
    prButton.mount("#payment-request-button");
    walletContainer.style.display = "block";
    prButtonMounted = true;

    paymentRequest.on("paymentmethod", async (ev) => {
      const confirmRes = await stripe.confirmCardPayment(
        clientSecret,
        { payment_method: ev.paymentMethod.id },
        { handleActions: false }
      );

      if (confirmRes.error) {
        ev.complete("fail");
        alert("Payment failed: " + confirmRes.error.message);
      } else {
        ev.complete("success");
        if (confirmRes.paymentIntent.status === "requires_action") {
          const { error } = await stripe.confirmCardPayment(clientSecret);
          if (error) { alert("Payment failed: " + error.message); return; }
        }
        window.location.href = "/thank-you.html";
      }
    });
  } catch (err) {
    console.warn("Wallet init failed:", err);
  }
}
