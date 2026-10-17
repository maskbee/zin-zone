// Service Worker for Zin.Zone - Network-First with Offline Cache Fallback
// "Ưu tiên mạng trực tuyến, không có mạng mới tải nội dung ngoại tuyến"
const CACHE_NAME = 'zin-zone-v36-network-first';
const STATIC_ASSETS = [
  './',
  './index.html',
  './data/curriculum.js',
  './data/audio_manifest.js',
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
      console.log('[Zin Zone SW] Pre-caching offline curriculum & assets...');
      try {
        await cache.addAll(STATIC_ASSETS);
      } catch (err) {
        console.warn('[Zin Zone SW] Partial cache failure, retrying individually:', err);
        for (const asset of STATIC_ASSETS) {
          try {
            await cache.add(asset);
          } catch (e) {
            console.error('[Zin Zone SW] Failed to cache asset:', asset, e);
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

// Network-First with 2.5s timeout fallback to offline cache ("优先联网，无法联网才加载离线内容")
async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);

  // Set 2500ms network timeout with AbortController so poor network doesn't hang forever
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2500);

  try {
    const networkResponse = await fetch(request, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (networkResponse && networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (err) {
    clearTimeout(timeoutId);
    // Network failed or timed out: fall back to offline cache
    let cachedResponse = await cache.match(request, { ignoreSearch: true });
    if (!cachedResponse && request.mode === 'navigate') {
      cachedResponse = (await cache.match('./index.html')) || (await cache.match('./'));
    }
    if (cachedResponse) {
      return cachedResponse;
    }
    throw err;
  }
}

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  // Let APK file downloads pass through directly without caching
  if (url.pathname.endsWith('.apk')) return;

  // Bypass media streaming completely: Range requests for audio files MUST be handled natively by browser
  if (url.pathname.endsWith('.mp3') || url.pathname.endsWith('.wav') || url.pathname.includes('/audio/')) {
    return;
  }

  // Handle all requests with networkFirst strategy: Network First -> Offline Cache Fallback
  event.respondWith(networkFirst(event.request));
});
