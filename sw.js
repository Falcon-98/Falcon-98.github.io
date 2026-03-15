// Falcon 98 Service Worker
// Version 1.0.0

const CACHE_NAME = 'falcon98-v1';
const OFFLINE_URL = '/404.html';

// Assets to cache
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/404.html',
  '/manifest.json',
  'https://res.cloudinary.com/dkj22lm1g/image/upload/v1763972046/Falcon_98-1_cx8xvv.png'
];

// Allowed external hostnames for caching (exact match for security)
const ALLOWED_EXTERNAL_HOSTS = [
  'res.cloudinary.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'cdnjs.cloudflare.com'
];

// Check if hostname is in allowed list (exact match)
function isAllowedExternalHost(hostname) {
  return ALLOWED_EXTERNAL_HOSTS.some(allowedHost => hostname === allowedHost);
}

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - Network first, fallback to cache
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip cross-origin requests except for allowed CDN resources
  const url = new URL(event.request.url);
  if (url.origin !== location.origin && !isAllowedExternalHost(url.hostname)) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone and cache successful responses
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Return cached version or offline page
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Return offline page for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match(OFFLINE_URL);
          }
          return new Response('', { status: 408, statusText: 'Request timed out' });
        });
      })
  );
});
