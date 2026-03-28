// HybridCare Pro v4.0 - Service Worker
const CACHE_NAME = 'hybridcare-pro-v4';
const OFFLINE_URLS = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap'
];

// Install: cache core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(OFFLINE_URLS).catch(() => {
        // Some external URLs may fail — ignore
        return cache.addAll(['./index.html', './manifest.json']);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: network-first with cache fallback
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request).then(r => r || caches.match('./index.html')))
  );
});

// Push notifications
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.body || 'Notificación de HybridCare Pro',
    icon: './icon-192.png',
    badge: './icon-192.png',
    vibrate: [200, 100, 200],
    data: data.url || '/',
    actions: [
      { action: 'open', title: 'Ver detalles' },
      { action: 'close', title: 'Cerrar' }
    ]
  };
  event.waitUntil(
    self.registration.showNotification(data.title || 'HybridCare Pro', options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'open' || !event.action) {
    event.waitUntil(clients.openWindow(event.notification.data || '/'));
  }
});

// Background sync for trip data
self.addEventListener('sync', event => {
  if (event.tag === 'sync-trips') {
    event.waitUntil(syncTripData());
  }
});

async function syncTripData() {
  // Sync logic would go here for cloud backup
  console.log('[HybridCare SW] Background sync triggered');
}

// Periodic background sync
self.addEventListener('periodicsync', event => {
  if (event.tag === 'maintenance-check') {
    event.waitUntil(checkMaintenanceAlerts());
  }
});

async function checkMaintenanceAlerts() {
  // Check maintenance schedules and fire notifications if needed
  console.log('[HybridCare SW] Periodic maintenance check');
}
