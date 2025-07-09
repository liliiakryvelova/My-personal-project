/* eslint-disable no-restricted-globals */
// Service Worker for caching and performance optimization

const CACHE_NAME = 'liliia-portfolio-v2';
const STATIC_CACHE = 'static-v2';
const DYNAMIC_CACHE = 'dynamic-v2';

// Cache static assets based on actual build output
const urlsToCache = [
  '/My-personal-project/',
  '/My-personal-project/static/css/main.30d51450.css',
  '/My-personal-project/static/js/main.bb49d264.js', // Updated main bundle
  '/My-personal-project/static/js/400.cf5db04a.chunk.js', // Three.js chunk
  '/My-personal-project/manifest.json',
  '/My-personal-project/favicon.ico',
  // Add other critical chunks
  '/My-personal-project/static/css/386.a81b9f50.chunk.css',
  '/My-personal-project/static/css/196.e375c996.chunk.css'
];

// Install service worker and cache resources
self.addEventListener('install', (event) => {
  console.log('SW: Installing service worker...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('SW: Caching static assets');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('SW: Cache installation failed:', error);
      })
  );
  self.skipWaiting(); // Activate immediately
});

// Fetch resources with cache-first strategy for static assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle different types of requests
  if (request.method === 'GET') {
    // Static assets (JS, CSS, images)
    if (request.url.includes('/static/') || 
        request.url.includes('.js') || 
        request.url.includes('.css') ||
        request.url.includes('.ico')) {
      
      event.respondWith(
        caches.match(request)
          .then((response) => {
            if (response) {
              console.log('SW: Serving from cache:', request.url);
              return response;
            }
            
            // Fetch and cache for future use
            return fetch(request)
              .then((fetchResponse) => {
                if (fetchResponse && fetchResponse.status === 200) {
                  const responseClone = fetchResponse.clone();
                  caches.open(STATIC_CACHE)
                    .then((cache) => {
                      cache.put(request, responseClone);
                    });
                }
                return fetchResponse;
              });
          })
          .catch(() => {
            console.log('SW: Offline - could not serve:', request.url);
            // Return a fallback for critical assets
            if (request.url.includes('.js')) {
              return new Response('console.log("Offline mode");', {
                headers: { 'Content-Type': 'application/javascript' }
              });
            }
          })
      );
    }
    
    // API calls or external resources - network first
    else if (url.origin !== location.origin) {
      event.respondWith(
        fetch(request)
          .then((response) => {
            if (response && response.status === 200) {
              const responseClone = response.clone();
              caches.open(DYNAMIC_CACHE)
                .then((cache) => {
                  cache.put(request, responseClone);
                });
            }
            return response;
          })
          .catch(() => {
            return caches.match(request);
          })
      );
    }
    
    // HTML requests - network first, cache fallback
    else {
      event.respondWith(
        fetch(request)
          .then((response) => {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                cache.put(request, responseClone);
              });
            return response;
          })
          .catch(() => {
            return caches.match(request)
              .then((response) => {
                return response || caches.match('/My-personal-project/');
              });
          })
      );
    }
  }
});

// Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('SW: Activating service worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && 
              cacheName !== DYNAMIC_CACHE && 
              cacheName !== CACHE_NAME) {
            console.log('SW: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
          return null; // Explicitly return null for non-matching items
        }).filter(Boolean) // Remove null values
      );
    }).then(() => {
      console.log('SW: Service worker activated');
      return self.clients.claim(); // Take control immediately
    })
  );
});

// Handle cache size limits
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.delete(DYNAMIC_CACHE);
  }
});

// Periodic cache cleanup
const cleanupCache = async (cacheName, maxItems = 50) => {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  
  if (keys.length > maxItems) {
    await cache.delete(keys[0]);
    await cleanupCache(cacheName, maxItems);
  }
};

// Clean dynamic cache periodically
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'cache-cleanup') {
    event.waitUntil(cleanupCache(DYNAMIC_CACHE));
  }
});
