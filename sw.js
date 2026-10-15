// Service Worker for Zin.Zone Offline App & OTA Updates
const CACHE_NAME = 'zin-zone-v30-ios-instant-launch';
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
  './icons/icon-512.png'
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

// Fast stale-while-revalidate with ignoreSearch for instant 0ms launch & background update
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  // Match with ignoreSearch: true so requests like ?mode=app&token=... hit the cached index.html immediately!
  let cachedResponse = await cache.match(request, { ignoreSearch: true });
  if (!cachedResponse && request.mode === 'navigate') {
    cachedResponse = (await cache.match('./index.html')) || (await cache.match('./'));
  }

  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse && networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => cachedResponse);

  return cachedResponse || fetchPromise;
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

  // Handle all requests with staleWhileRevalidate for instant 0-second launch
  event.respondWith(staleWhileRevalidate(event.request));
});
