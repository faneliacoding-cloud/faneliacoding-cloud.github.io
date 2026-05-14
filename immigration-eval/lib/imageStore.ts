'use client';
/**
 * Image Storage Engine
 * Handles photo uploads with IndexedDB primary storage, localStorage fallback
 * Includes compression, deduplication, and memory-safe blob management
 */

const DB_NAME = 'tjil-eval-images';
const DB_VERSION = 1;
const STORE_NAME = 'photos';
const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB
const MAX_DIMENSION = 2048;
const JPEG_QUALITY = 0.82;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif', 'application/pdf'];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif', '.pdf'];

export interface StoredImage {
  id: string;
  evalId: string;
  filename: string;
  mimeType: string;
  size: number;
  width: number;
  height: number;
  thumbnailDataUrl: string; // small base64 preview
  createdAt: string;
  hash: string;
}

// Full image data (stored separately from metadata for memory efficiency)
interface ImageData {
  id: string;
  dataUrl: string; // full-res compressed base64
}

// ─── IndexedDB Helpers ───────────────────────────────────────────────────────

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('metadata')) {
        const metaStore = db.createObjectStore('metadata', { keyPath: 'id' });
        metaStore.createIndex('evalId', 'evalId', { unique: false });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function idbAvailable(): Promise<boolean> {
  try {
    const db = await openDB();
    db.close();
    return true;
  } catch {
    return false;
  }
}

// ─── Hash for deduplication ──────────────────────────────────────────────────

async function computeHash(data: ArrayBuffer): Promise<string> {
  try {
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 16);
  } catch {
    // Fallback: simple FNV hash
    const view = new Uint8Array(data);
    let hash = 0x811c9dc5;
    for (let i = 0; i < Math.min(view.length, 8192); i++) {
      hash ^= view[i];
      hash = Math.imul(hash, 0x01000193);
    }
    return (hash >>> 0).toString(16).padStart(8, '0');
  }
}

// ─── Image Compression ───────────────────────────────────────────────────────

function compressImage(file: File, maxDim: number, quality: number): Promise<{ dataUrl: string; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          const ratio = Math.min(maxDim / width, maxDim / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) { reject(new Error('Canvas not supported')); return; }
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve({ dataUrl, width, height });
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

function generateThumbnail(dataUrl: string, maxDim = 200): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      const ratio = Math.min(maxDim / width, maxDim / height);
      width = Math.round(width * ratio);
      height = Math.round(height * ratio);
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) { resolve(dataUrl); return; }
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', 0.6));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

// ─── Validation ──────────────────────────────────────────────────────────────

export function validateFile(file: File): { valid: boolean; error?: string } {
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: `File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Max: 15MB.` };
  }

  const ext = '.' + file.name.split('.').pop()?.toLowerCase();
  const typeOk = ALLOWED_TYPES.includes(file.type) || ALLOWED_EXTENSIONS.includes(ext);
  if (!typeOk) {
    return { valid: false, error: `Unsupported file type: ${file.type || ext}. Allowed: JPG, PNG, WEBP, HEIC, PDF.` };
  }

  return { valid: true };
}

// ─── Public API ──────────────────────────────────────────────────────────────

export async function saveImage(evalId: string, file: File): Promise<StoredImage> {
  const validation = validateFile(file);
  if (!validation.valid) throw new Error(validation.error);

  // Compress image
  const arrayBuffer = await file.arrayBuffer();
  const hash = await computeHash(arrayBuffer);

  // Check for duplicates
  const existing = await getImagesForEval(evalId);
  const duplicate = existing.find(img => img.hash === hash);
  if (duplicate) throw new Error('This image has already been uploaded.');

  let dataUrl: string;
  let width: number;
  let height: number;

  if (file.type === 'application/pdf') {
    // Store PDF as data URL directly (no compression)
    dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read PDF'));
      reader.readAsDataURL(file);
    });
    width = 0;
    height = 0;
  } else {
    const compressed = await compressImage(file, MAX_DIMENSION, JPEG_QUALITY);
    dataUrl = compressed.dataUrl;
    width = compressed.width;
    height = compressed.height;
  }

  const thumbnailDataUrl = file.type === 'application/pdf'
    ? 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="120" height="160" fill="#ff453a"><rect width="120" height="160" rx="8" fill="#fff5f5" stroke="#ff453a" stroke-width="2"/><text x="60" y="90" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#ff453a">PDF</text></svg>')
    : await generateThumbnail(dataUrl);

  const id = `img_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
  const metadata: StoredImage = {
    id, evalId, filename: file.name, mimeType: file.type,
    size: file.size, width, height, thumbnailDataUrl,
    createdAt: new Date().toISOString(), hash,
  };
  const imageData: ImageData = { id, dataUrl };

  const useIDB = await idbAvailable();
  if (useIDB) {
    const db = await openDB();
    const tx = db.transaction([STORE_NAME, 'metadata'], 'readwrite');
    tx.objectStore(STORE_NAME).put(imageData);
    tx.objectStore('metadata').put(metadata);
    await new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  } else {
    // localStorage fallback (limited to ~5MB)
    try {
      const stored = JSON.parse(localStorage.getItem('tjil-images-meta') || '[]') as StoredImage[];
      stored.push(metadata);
      localStorage.setItem('tjil-images-meta', JSON.stringify(stored));
      localStorage.setItem(`tjil-img-${id}`, dataUrl);
    } catch {
      throw new Error('Storage full. Please delete some images and try again.');
    }
  }

  return metadata;
}

export async function getImagesForEval(evalId: string): Promise<StoredImage[]> {
  const useIDB = await idbAvailable();
  if (useIDB) {
    const db = await openDB();
    const tx = db.transaction('metadata', 'readonly');
    const index = tx.objectStore('metadata').index('evalId');
    return new Promise((resolve, reject) => {
      const request = index.getAll(evalId);
      request.onsuccess = () => { db.close(); resolve(request.result); };
      request.onerror = () => { db.close(); reject(request.error); };
    });
  } else {
    const stored = JSON.parse(localStorage.getItem('tjil-images-meta') || '[]') as StoredImage[];
    return stored.filter(img => img.evalId === evalId);
  }
}

export async function getImageData(id: string): Promise<string | null> {
  const useIDB = await idbAvailable();
  if (useIDB) {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    return new Promise((resolve, reject) => {
      const request = tx.objectStore(STORE_NAME).get(id);
      request.onsuccess = () => { db.close(); resolve(request.result?.dataUrl || null); };
      request.onerror = () => { db.close(); reject(request.error); };
    });
  } else {
    return localStorage.getItem(`tjil-img-${id}`) || null;
  }
}

export async function deleteImage(id: string): Promise<void> {
  const useIDB = await idbAvailable();
  if (useIDB) {
    const db = await openDB();
    const tx = db.transaction([STORE_NAME, 'metadata'], 'readwrite');
    tx.objectStore(STORE_NAME).delete(id);
    tx.objectStore('metadata').delete(id);
    await new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  } else {
    const stored = JSON.parse(localStorage.getItem('tjil-images-meta') || '[]') as StoredImage[];
    localStorage.setItem('tjil-images-meta', JSON.stringify(stored.filter(img => img.id !== id)));
    localStorage.removeItem(`tjil-img-${id}`);
  }
}

export async function getAllImagesForExport(evalId: string): Promise<{ metadata: StoredImage; dataUrl: string }[]> {
  const images = await getImagesForEval(evalId);
  const results: { metadata: StoredImage; dataUrl: string }[] = [];
  for (const img of images) {
    const dataUrl = await getImageData(img.id);
    if (dataUrl) results.push({ metadata: img, dataUrl });
  }
  return results;
}
