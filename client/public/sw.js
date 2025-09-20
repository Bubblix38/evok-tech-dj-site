// Service Worker for CDN Caching
const CACHE_NAME = 'evok-tech-dj-cdn-v1';
const CDN_CACHE_NAME = 'evok-tech-dj-cdn-assets-v1';

// URLs to cache
const STATIC_ASSETS = [
  '/',
  '/src/main.tsx',
  '/cdn-loader.js'
];

// CDN URLs to cache
const CDN_ASSETS = [
  'https://unpkg.com/react@18.3.1/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      }),
      caches.open(CDN_CACHE_NAME).then((cache) => {
        return cache.addAll(CDN_ASSETS);
      })
    ])
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== CDN_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event with CDN strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Handle CDN requests
  if (url.hostname.includes('unpkg.com') || 
      url.hostname.includes('cdn.jsdelivr.net') || 
      url.hostname.includes('fonts.googleapis.com') ||
      url.hostname.includes('fonts.gstatic.com')) {
    
    event.respondWith(
      caches.open(CDN_CACHE_NAME).then((cache) => {
        return cache.match(request).then((response) => {
          if (response) {
            // Return cached version
            return response;
          }
          
          // Fetch from network and cache
          return fetch(request).then((networkResponse) => {
            if (networkResponse.ok) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => {
            // Return offline fallback if available
            return new Response('Offline', { status: 503 });
          });
        });
      })
    );
    return;
  }
  
  // Handle image requests
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) {
          return response;
        }
        
        return fetch(request).then((networkResponse) => {
          if (networkResponse.ok) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }
  
  // Handle other requests with network-first strategy
  event.respondWith(
    fetch(request).then((response) => {
      if (response.ok && request.method === 'GET') {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseClone);
        });
      }
      return response;
    }).catch(() => {
      return caches.match(request);
    })
  );
});