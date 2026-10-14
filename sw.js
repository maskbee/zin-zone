// Service Worker for Zin.Zone Offline App & OTA Updates
const CACHE_NAME = 'zin-zone-v23-b2b-store-system';
const STATIC_ASSETS = [
  './data/curriculum.js',
  './data/audio_manifest.js',
  './pocket-cards.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Zin Zone SW] Pre-caching offline curriculum & assets...');
      return cache.addAll(STATIC_ASSETS);
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

// network-first: fresh HTML / manifest / icons so PWA icon and page updates take effect immediately
async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (err) {
    const cachedResponse = await cache.match(request);
    return cachedResponse || Response.error();
  }
}

// stale-while-revalidate: serve cached immediately, update in background (static assets)
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
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

  const isNavigate = event.request.mode === 'navigate';
  const isLiveDoc = url.pathname === '/' || url.pathname === '/index.html' ||
                    url.pathname.endsWith('/manifest.json') ||
                    url.pathname.startsWith('/icons/');

  event.respondWith(
    isNavigate || isLiveDoc ? networkFirst(event.request) : staleWhileRevalidate(event.request)
  );
});
