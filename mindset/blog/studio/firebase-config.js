// ============================================================
// Firebase Configuration — Mindset Therapy Blog Studio
// ============================================================
// SETUP INSTRUCTIONS:
// 1. Go to https://console.firebase.google.com/
// 2. Click "Create a project" → name it "mindset-therapy"
// 3. Enable Authentication → Sign-in method → Email/Password
// 4. Create Firestore Database → Start in Production mode
// 5. Create Storage bucket
// 6. Go to Project Settings → General → Your apps → Add web app
// 7. Copy the firebaseConfig values below
// 8. Go to Authentication → Users → Add user → enter owner email/password
// 9. Copy the user's UID and paste it into ADMIN_UID below
// ============================================================

// >>> REPLACE THESE WITH YOUR FIREBASE PROJECT VALUES <<<
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// >>> PASTE YOUR ADMIN USER UID HERE <<<
const ADMIN_UID = "YOUR_ADMIN_UID";

// ============================================================
// TEST MODE — Works without Firebase
// When firebaseConfig.apiKey === 'YOUR_API_KEY', the system
// uses localStorage as a mock database.
// Test credentials: admin@mindset.com / admin123
// ============================================================
const TEST_MODE = firebaseConfig.apiKey === 'YOUR_API_KEY';
const TEST_EMAIL = 'admin@mindset.com';
const TEST_PASS = 'admin123';

// Firebase SDK version
const FB_VERSION = "10.12.2";
const FB_CDN = `https://www.gstatic.com/firebasejs/${FB_VERSION}`;

// State
let _app = null;
let _auth = null;
let _db = null;
let _storage = null;
let _fbReady = null;
let _testLoggedIn = false;

// ============================================================
// LOCAL STORAGE MOCK DATABASE (Test Mode)
// ============================================================
const MockDB = {
  _seeded: false,
  _seed() {
    if (this._seeded) return;
    this._seeded = true;
    // The 3 original blog posts — always ensure they exist
    const seedPosts = [
      {
        slug: 'understanding-anxiety-cycle',
        title: 'Understanding the Anxiety Cycle — and How to Break It',
        excerpt: 'Anxiety has a way of feeling both urgent and endless. Learn how CBT techniques interrupt the cycle and restore your sense of control.',
        category: 'Anxiety',
        author: 'Aby Chacko, LCSW',
        status: 'published',
        featuredImage: 'https://faneliacoding-cloud.github.io/mindset/assets/blog-meditation.png',
        featuredImageAlt: 'Understanding anxiety and finding calm',
        publishDate: '2025-05-12T12:00:00',
        createdAt: '2025-05-12T12:00:00',
        updatedAt: '2025-05-12T12:00:00',
        readTime: '6 min read',
        tags: ['anxiety', 'cbt', 'coping'],
        content: '<h2>The Anxiety Cycle</h2><p>Anxiety has a way of feeling both urgent and endless. It can start with a single worried thought and quickly spiral into a pattern that feels impossible to break.</p><p>This article explores how CBT techniques can interrupt the cycle and restore your sense of control.</p>',
        featured: true
      },
      {
        slug: 'mindfulness-practices',
        title: 'Five Mindfulness Practices You Can Start Today',
        excerpt: "You don't need a meditation cushion or an hour of silence. Discover five grounding practices that fit into real, everyday life.",
        category: 'Mindfulness',
        author: 'Aby Chacko, LCSW',
        status: 'published',
        featuredImage: 'https://faneliacoding-cloud.github.io/mindset/assets/blog-nature.png',
        featuredImageAlt: 'Nature therapy and mindfulness in everyday life',
        publishDate: '2025-05-05T12:00:00',
        createdAt: '2025-05-05T12:00:00',
        updatedAt: '2025-05-05T12:00:00',
        readTime: '5 min read',
        tags: ['mindfulness', 'meditation', 'grounding'],
        content: '<h2>Mindfulness in Daily Life</h2><p>Mindfulness doesn\'t require a special setup. These five practices can be woven into your existing routine.</p>',
        featured: true
      },
      {
        slug: 'trauma-informed-care',
        title: 'What Trauma-Informed Care Actually Means',
        excerpt: "Trauma-informed therapy isn't just about processing the past — it's about creating safety in the present. Here's what to expect.",
        category: 'Trauma',
        author: 'Aby Chacko, LCSW',
        status: 'published',
        featuredImage: 'https://faneliacoding-cloud.github.io/mindset/assets/hero-bg.png',
        featuredImageAlt: 'Therapy office and the healing environment',
        publishDate: '2025-04-28T12:00:00',
        createdAt: '2025-04-28T12:00:00',
        updatedAt: '2025-04-28T12:00:00',
        readTime: '7 min read',
        tags: ['trauma', 'therapy', 'safety'],
        content: '<h2>Understanding Trauma-Informed Care</h2><p>Trauma-informed therapy creates a foundation of safety and trust. It\'s about understanding how past experiences shape present reactions.</p>',
        featured: true
      }
    ];
    // Merge: add missing seed posts AND fix image paths on existing ones
    let existing = [];
    try { existing = JSON.parse(localStorage.getItem('mt_posts') || '[]'); } catch {}
    const seedBySlug = Object.fromEntries(seedPosts.map(s => [s.slug, s]));
    let changed = false;
    // Update existing seed posts with correct image URLs
    existing = existing.map(p => {
      if (seedBySlug[p.slug]) {
        const seed = seedBySlug[p.slug];
        // Always refresh image to full URL
        if (p.featuredImage !== seed.featuredImage) {
          p.featuredImage = seed.featuredImage;
          changed = true;
        }
        delete seedBySlug[p.slug];
      }
      return p;
    });
    // Add any seed posts that weren't found
    const toAdd = Object.values(seedBySlug);
    if (toAdd.length > 0 || changed) {
      localStorage.setItem('mt_posts', JSON.stringify([...existing, ...toAdd]));
    }
  },
  _getAll() {
    this._seed();
    try { return JSON.parse(localStorage.getItem('mt_posts') || '[]'); }
    catch { return []; }
  },
  _saveAll(posts) {
    localStorage.setItem('mt_posts', JSON.stringify(posts));
  },
  async getAllPosts() {
    return this._getAll().sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  async getPost(slug) {
    return this._getAll().find(p => p.slug === slug) || null;
  },
  async savePost(slug, data) {
    const posts = this._getAll();
    const idx = posts.findIndex(p => p.slug === slug);
    const now = new Date().toISOString();
    const post = { ...data, slug, updatedAt: now };
    if (idx >= 0) {
      posts[idx] = { ...posts[idx], ...post };
    } else {
      post.createdAt = now;
      posts.push(post);
    }
    this._saveAll(posts);
    return post;
  },
  async deletePost(slug) {
    const posts = this._getAll().filter(p => p.slug !== slug);
    this._saveAll(posts);
  },
  async getPublished() {
    return this._getAll()
      .filter(p => p.status === 'published')
      .sort((a,b) => new Date(b.publishDate || b.createdAt) - new Date(a.publishDate || a.createdAt));
  }
};

// ============================================================
// FIREBASE INITIALIZATION (Production Mode)
// ============================================================
function getFirebaseApp() {
  if (TEST_MODE) return Promise.resolve(null);
  if (_fbReady) return _fbReady;
  _fbReady = (async () => {
    const { initializeApp } = await import(`${FB_CDN}/firebase-app.js`);
    _app = initializeApp(firebaseConfig);
    return _app;
  })();
  return _fbReady;
}

async function getAuth() {
  if (TEST_MODE) return null;
  if (_auth) return _auth;
  await getFirebaseApp();
  const { getAuth } = await import(`${FB_CDN}/firebase-auth.js`);
  _auth = getAuth(_app);
  return _auth;
}

async function getDb() {
  if (TEST_MODE) return null;
  if (_db) return _db;
  await getFirebaseApp();
  const { getFirestore } = await import(`${FB_CDN}/firebase-firestore.js`);
  _db = getFirestore(_app);
  return _db;
}

async function getStorage() {
  if (TEST_MODE) return null;
  if (_storage) return _storage;
  await getFirebaseApp();
  const { getStorage } = await import(`${FB_CDN}/firebase-storage.js`);
  _storage = getStorage(_app);
  return _storage;
}

// ============================================================
// AUTH HELPERS
// ============================================================
async function requireAdmin() {
  if (TEST_MODE) {
    if (sessionStorage.getItem('mt_test_auth') === 'true') {
      _testLoggedIn = true;
      return { uid: 'test-admin', email: TEST_EMAIL };
    }
    window.location.href = 'login.html';
    throw new Error('Not authorized');
  }
  const auth = await getAuth();
  const { onAuthStateChanged } = await import(`${FB_CDN}/firebase-auth.js`);
  window._fbAuthModule = { onAuthStateChanged };
  return new Promise((resolve, reject) => {
    const unsub = onAuthStateChanged(auth, (user) => {
      unsub();
      if (user && user.uid === ADMIN_UID) {
        resolve(user);
      } else {
        window.location.href = 'login.html';
        reject(new Error('Not authorized'));
      }
    });
  });
}

async function signIn(email, password) {
  if (TEST_MODE) {
    if (email === TEST_EMAIL && password === TEST_PASS) {
      sessionStorage.setItem('mt_test_auth', 'true');
      _testLoggedIn = true;
      return { user: { uid: 'test-admin', email: TEST_EMAIL } };
    }
    const err = new Error('Invalid credentials');
    err.code = 'auth/invalid-credential';
    throw err;
  }
  const auth = await getAuth();
  const { signInWithEmailAndPassword } = await import(`${FB_CDN}/firebase-auth.js`);
  return signInWithEmailAndPassword(auth, email, password);
}

async function signOut() {
  if (TEST_MODE) {
    sessionStorage.removeItem('mt_test_auth');
    _testLoggedIn = false;
    window.location.href = 'login.html';
    return;
  }
  const auth = await getAuth();
  const { signOut: fbSignOut } = await import(`${FB_CDN}/firebase-auth.js`);
  await fbSignOut(auth);
  window.location.href = 'login.html';
}

// Firestore module helpers
async function fsModule() {
  return import(`${FB_CDN}/firebase-firestore.js`);
}

async function storageModule() {
  return import(`${FB_CDN}/firebase-storage.js`);
}

// ============================================================
// IMAGE HANDLING
// ============================================================
function compressImage(file, maxWidth = 1200, quality = 0.8) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let w = img.width, h = img.height;
        if (w > maxWidth) { h = (maxWidth / w) * h; w = maxWidth; }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        canvas.toBlob((blob) => resolve(blob), 'image/jpeg', quality);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

async function uploadImage(file, path) {
  if (TEST_MODE) {
    // In test mode, convert to data URL (stored in localStorage)
    const compressed = await compressImage(file);
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(compressed);
    });
  }
  const storage = await getStorage();
  const { ref, uploadBytes, getDownloadURL } = await storageModule();
  const compressed = await compressImage(file);
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, compressed);
  return getDownloadURL(snapshot.ref);
}

// ============================================================
// UTILITIES
// ============================================================
function generateSlug(title) {
  return title.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d)) return '';
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function estimateReadTime(html) {
  const text = html.replace(/<[^>]*>/g, '');
  const words = text.split(/\s+/).filter(w => w.length > 0).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}
