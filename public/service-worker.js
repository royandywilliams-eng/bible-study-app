const CACHE_NAME = 'bible-study-app-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg'
];

// Install event - cache essential files
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(URLS_TO_CACHE);
    }).catch((error) => {
      console.error('[ServiceWorker] Cache failed:', error);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[ServiceWorker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome extensions
  if (request.url.startsWith('chrome-extension://')) {
    return;
  }

  event.respondWith(
    caches.match(request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }

      return fetch(request).then((response) => {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();

        // Cache successful responses
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });

        return response;
      }).catch((error) => {
        console.error('[ServiceWorker] Fetch failed:', error);
        // Return offline page or cached response
        return caches.match(request).then((cachedResponse) => {
          return cachedResponse || new Response(
            'Offline - this resource is not available',
            { status: 503, statusText: 'Service Unavailable' }
          );
        });
      });
    })
  );
});

// Background sync for future use
self.addEventListener('sync', (event) => {
  console.log('[ServiceWorker] Background sync event:', event.tag);
});

// Push notifications for future use
self.addEventListener('push', (event) => {
  console.log('[ServiceWorker] Push event received');
});
