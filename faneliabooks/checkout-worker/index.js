/**
 * FaneliaBooks — Stripe Checkout + PDF Delivery Worker
 * POST /checkout { slug } → Stripe-hosted checkout (card fallback)
 * POST /intent  { slug } → PaymentIntent client_secret (for Apple/Google Pay)
 * GET  /download?session_id=xxx → Verify payment + serve PDF from R2
 * POST /verify  { session_id } → Verify payment + return book info (for thank-you page)
 */

const BOOKS = {
  "30-day-money-reset":            { name: "The 30-Day Money Reset",                      price: 1700, pdf: "The-30-Day-Money-Reset.pdf" },
  "index-funds-made-simple":       { name: "Index Funds Made Simple",                     price: 1700, pdf: "Index-Funds-Made-Simple.pdf" },
  "5-hour-focus-formula":          { name: "The 5-Hour Focus Formula",                    price: 1700, pdf: "The-5-Hour-Focus-Formula.pdf" },
  "stop-surviving-start-thriving": { name: "Stop Surviving, Start Thriving",              price: 1700, pdf: "Stop-Surviving-Start-Thriving.pdf" },
  "lazy-persons-guide-fitness":    { name: "The Lazy Person's Guide to Losing 20 Pounds", price: 1700, pdf: "Lazy-Persons-Guide-to-Losing-20-Pounds.pdf" },
  "15-minute-mornings":            { name: "15-Minute Mornings",                          price: 1200, pdf: "15-Minute-Mornings.pdf" },
  "6-figures-with-a-laptop":       { name: "6 Figures With a Laptop",                     price: 2700, pdf: "Six-Figures-From-Your-Laptop.pdf" },
  "weekend-side-hustle-playbook":  { name: "Weekend Side Hustle Playbook",                price: 1700, pdf: "Weekend-Side-Hustle-Playbook.pdf" },
  "options-in-plain-english":      { name: "Options in Plain English",                    price: 1700, pdf: "Options-In-Plain-English.pdf" },
  "smart-investors-cheat-sheet":   { name: "The Smart Investor's Cheat Sheet",            price: 1700, pdf: "The-Smart-Investors-Cheat-Sheet.pdf" },
  "the-magnetic-personality":      { name: "The Magnetic Personality Blueprint",          price: 1700, pdf: "The-Magnetic-Personality-Blueprint.pdf" },
  "heal-and-rise":                 { name: "Heal and Rise",                               price: 1700, pdf: "Heal-And-Rise.pdf" },
  "15-minute-meals":               { name: "15-Minute Meals That Don't Suck",             price: 1700, pdf: "15-Minute-Meals-That-Dont-Suck.pdf" },
  "lazy-keto-cookbook":            { name: "The Lazy Keto Cookbook",                      price: 1700, pdf: "The-Lazy-Keto-Cookbook.pdf" },
  "chatgpt-for-non-techies":       { name: "ChatGPT for Non-Techies",                     price: 1700, pdf: "ChatGPT-For-Non-Techies.pdf" },
  "excel-secrets":                 { name: "Excel Secrets That Experts Use",              price: 1700, pdf: "Excel-Secrets-That-Experts-Use.pdf" },
  "ziggy-and-the-missing-stars":   { name: "Ziggy and the Missing Stars",                price:  700, pdf: "Ziggy-And-The-Missing-Stars.pdf" },
  "mia-learns-to-say-sorry":       { name: "Mia Learns to Say Sorry",                    price:  700, pdf: "Mia-Learns-To-Say-Sorry.pdf" },
  "start-the-damn-business":       { name: "Start the Damn Business",                    price: 2700, pdf: "Start-The-Damn-Business.pdf" },
  "one-page-marketing-plan":       { name: "The One-Page Marketing Plan",                price: 1700, pdf: "One-Page-Marketing-Plan.pdf" },
  "code-everything":               { name: "Code Everything: Every Programming Language", price: 1900, pdf: "Code-Everything.pdf" },
  // Romance ebooks
  "the-last-kiss":                 { name: "The Last Kiss",                              price:  900, pdf: "The-Last-Kiss.pdf" },
  "his-secret-lover":              { name: "His Secret Lover",                           price:  900, pdf: "His-Secret-Lover.pdf" },
  "vows-we-break":                 { name: "Vows We Break",                              price:  900, pdf: "Vows-We-Break.pdf" },
  "between-the-sheets":            { name: "Between the Sheets",                         price:  900, pdf: "Between-The-Sheets.pdf" },
  "the-other-woman":               { name: "The Other Woman",                            price:  900, pdf: "The-Other-Woman.pdf" },
  "second-chances":                { name: "Second Chances",                             price:  900, pdf: "Second-Chances.pdf" },
  "midnight-confessions":          { name: "Midnight Confessions",                       price:  900, pdf: "Midnight-Confessions.pdf" },
  "the-arrangement":               { name: "The Arrangement",                            price:  900, pdf: "The-Arrangement.pdf" },
  "unspoken-desires":              { name: "Unspoken Desires",                           price:  900, pdf: "Unspoken-Desires.pdf" },
  "after-the-wedding":             { name: "After the Wedding",                          price:  900, pdf: "After-The-Wedding.pdf" },
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }

    if (request.method === "POST") {
      if (url.pathname === "/checkout") return handleCheckout(request, env);
      if (url.pathname === "/intent")   return handleIntent(request, env);
      if (url.pathname === "/verify")   return handleVerify(request, env);
    }

    if (request.method === "GET") {
      if (url.pathname === "/download") return handleDownload(url, env);
    }

    return new Response("Not found", { status: 404 });
  }
};

// ── Stripe-hosted Checkout (card fallback) ────────────────────────────────
async function handleCheckout(request, env) {
  const { slug } = await parseBody(request);
  const book = BOOKS[slug];
  if (!book) return json({ error: "Book not found" }, 404);

  const params = new URLSearchParams({
    mode: "payment",
    success_url: "https://faneliabooks.com/thank-you.html?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "https://faneliabooks.com/",
    "line_items[0][price_data][currency]": "usd",
    "line_items[0][price_data][product_data][name]": book.name,
    "line_items[0][price_data][product_data][description]": "Instant PDF — FaneliaBooks.com",
    "line_items[0][price_data][unit_amount]": String(book.price),
    "line_items[0][quantity]": "1",
    "payment_method_types[0]": "card",
    allow_promotion_codes: "true",
    "metadata[slug]": slug,
    "metadata[pdf]": book.pdf,
  });

  const res = await stripePost("checkout/sessions", params, env.STRIPE_SK);
  const session = await res.json();
  if (!res.ok) return json({ error: session.error?.message || "Stripe error" }, 500);
  return json({ url: session.url });
}

// ── PaymentIntent for Apple Pay / Google Pay ──────────────────────────────
async function handleIntent(request, env) {
  const { slug } = await parseBody(request);
  const book = BOOKS[slug];
  if (!book) return json({ error: "Book not found" }, 404);

  const params = new URLSearchParams({
    amount: String(book.price),
    currency: "usd",
    "payment_method_types[0]": "card",
    "metadata[book]": book.name,
    "metadata[slug]": slug,
    "metadata[pdf]": book.pdf,
    description: `${book.name} — FaneliaBooks.com`,
  });

  const res = await stripePost("payment_intents", params, env.STRIPE_SK);
  const intent = await res.json();
  if (!res.ok) return json({ error: intent.error?.message || "Stripe error" }, 500);
  return json({ clientSecret: intent.client_secret, amount: book.price, name: book.name });
}

// ── Verify payment (for thank-you page) ───────────────────────────────────
async function handleVerify(request, env) {
  const { session_id } = await parseBody(request);
  if (!session_id) return json({ error: "Missing session_id" }, 400);

  const res = await stripeGet(`checkout/sessions/${session_id}`, env.STRIPE_SK);
  if (!res.ok) return json({ error: "Could not verify session" }, 400);

  const session = await res.json();
  if (session.payment_status !== "paid") {
    return json({ error: "Payment not completed", status: session.payment_status }, 403);
  }

  const slug = session.metadata?.slug;
  const book = slug ? BOOKS[slug] : null;

  return json({
    verified: true,
    book: book?.name || "Your ebook",
    slug: slug,
    download_url: `https://faneliabooks-checkout.faneliabooks.workers.dev/download?session_id=${session_id}`,
  });
}

// ── Download PDF (verified via Stripe session) ────────────────────────────
async function handleDownload(url, env) {
  const sessionId = url.searchParams.get("session_id");
  if (!sessionId) {
    return new Response("Missing session_id", { status: 400, headers: corsHeaders() });
  }

  // Verify payment with Stripe
  const res = await stripeGet(`checkout/sessions/${sessionId}`, env.STRIPE_SK);
  if (!res.ok) {
    return new Response("Could not verify payment", { status: 400, headers: corsHeaders() });
  }

  const session = await res.json();
  if (session.payment_status !== "paid") {
    return new Response("Payment not completed", { status: 403, headers: corsHeaders() });
  }

  // Get the PDF filename from metadata
  const slug = session.metadata?.slug;
  const book = slug ? BOOKS[slug] : null;
  const pdfKey = session.metadata?.pdf || book?.pdf;

  if (!pdfKey) {
    return new Response("Book not found in session", { status: 404, headers: corsHeaders() });
  }

  // Fetch PDF from KV
  const pdfData = await env.EBOOK_KV.get(pdfKey, { type: "arrayBuffer" });
  if (!pdfData) {
    return new Response("PDF not found in storage", { status: 404, headers: corsHeaders() });
  }

  // Serve the PDF
  return new Response(pdfData, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${pdfKey}"`,
      "Cache-Control": "private, no-cache",
      ...corsHeaders(),
    },
  });
}

// ── Helpers ───────────────────────────────────────────────────────────────
async function parseBody(req) {
  try { return await req.json(); } catch { return {}; }
}

function stripePost(endpoint, params, sk) {
  return fetch(`https://api.stripe.com/v1/${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sk}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });
}

function stripeGet(endpoint, sk) {
  return fetch(`https://api.stripe.com/v1/${endpoint}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sk}`,
    },
  });
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "https://faneliabooks.com",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders() },
  });
}
