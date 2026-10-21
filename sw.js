// Service Worker for Zin.Zone Offline App & OTA Updates
// Caching Strategy: Network-First with Cache Fallback (Ưu tiên mạng trực tuyến, không có mạng mới dùng bộ nhớ đệm)
const CACHE_NAME = 'zin-zone-v39-modular-css';
const STATIC_ASSETS = [
  './',
  './index.html',
  './css/app.css',
  './data/curriculum.js',
  './data/audio_manifest.js',
  './js/app-license.js',
  './js/app-audio.js',
  './js/app-gamification.js',
  './js/app-curriculum.js',
  './js/app-ui.js',
  './pocket-cards.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-splash-generic.png',
  './icons/apple-splash-1170-2532.png',
  './icons/apple-splash-1290-2796.png',
  './icons/apple-splash-1284-2778.png',
  './icons/apple-splash-828-1792.png',
  './icons/apple-splash-1125-2436.png',
  './icons/apple-splash-1242-2688.png',
  './icons/apple-splash-750-1334.png',
  './icons/apple-splash-1080-2340.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      console.log('[Zin Zone SW] Đang lưu trước tài nguyên ngoại tuyến...');
      try {
        await cache.addAll(STATIC_ASSETS);
      } catch (err) {
        console.warn('[Zin Zone SW] Nạp từng phần tài nguyên ngoại tuyến:', err);
        for (const asset of STATIC_ASSETS) {
          try {
            await cache.add(asset);
          } catch (e) {
            console.error('[Zin Zone SW] Thất bại khi nạp asset:', asset, e);
          }
        }
      }
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Network-First with Cache Fallback (Ưu tiên mạng trực tuyến, không có mạng mới dùng bộ nhớ đệm)
async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);

  async function matchCacheFallback() {
    let cached = await cache.match(request, { ignoreSearch: true });
    if (!cached && request.mode === 'navigate') {
      cached = (await cache.match('./index.html')) || (await cache.match('./'));
    }
    return cached;
  }

  // 1. If device is explicitly offline, immediately serve cache in 0ms (no hang/black screen)
  if (typeof self.navigator !== 'undefined' && !self.navigator.onLine) {
    const offlineCached = await matchCacheFallback();
    if (offlineCached) return offlineCached;
  }

  // 2. Try Live Network First (with 1500ms timeout for navigation to avoid blank screen hangs)
  const isNavigate = request.mode === 'navigate';
  const timeoutMs = isNavigate ? 1500 : 3000;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const networkResponse = await fetch(request, { signal: controller.signal });
    clearTimeout(timeoutId);

    // If valid response, update offline cache in background
    if (networkResponse && networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
      if (isNavigate) {
        cache.put('./index.html', networkResponse.clone());
        cache.put('./', networkResponse.clone());
      }
    }
    return networkResponse;
  } catch (err) {
    // 3. Network failed or offline or aborted: Immediate Fallback to Cache
    console.log('[Zin Zone SW] Mạng chậm hoặc ngoại tuyến, tải từ cache:', request.url);
    const cachedResponse = await matchCacheFallback();
    if (cachedResponse) {
      return cachedResponse;
    }

    // 4. If navigation and nothing in cache, provide basic offline shell
    if (isNavigate) {
      return new Response(
        `<!DOCTYPE html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Zin Zone - Ngoại Tuyến</title><style>body{background:#030712;color:#f8fafc;font-family:sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;margin:0;padding:20px;text-align:center;}</style></head><body><h2>⚡ ZIN.ZONE</h2><p>Thiết bị hiện đang ngoại tuyến.</p><button onclick="location.reload()" style="background:#f59e0b;color:#000;border:none;padding:12px 24px;border-radius:12px;font-weight:bold;margin-top:20px;cursor:pointer;">Thử Lại</button></body></html>`,
        { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      );
    }

    throw err;
  }
}

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  // CRITICAL SECURITY: Never intercept or cache API endpoints (/api/*) - must always reach live server
  if (url.pathname.startsWith('/api/')) return;

  // Let APK file downloads pass through directly without caching
  if (url.pathname.endsWith('.apk')) return;

  // Bypass media streaming completely: Range requests for audio files MUST be handled natively by browser
  if (url.pathname.endsWith('.mp3') || url.pathname.endsWith('.wav') || url.pathname.includes('/audio/')) {
    return;
  }

  // Handle all requests with Network-First strategy
  event.respondWith(networkFirst(event.request));
});
