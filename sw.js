const CACHE_NAME = 'pushy-site-v2';
const PRECACHE_URLS = ['/', '/manifest.webmanifest', '/images/logo.svg'];

// Never cache on dev origins: the dev server's JS URLs are not content-hashed,
// so a cache-first SW pins a stale bundle whose HMR hash no longer exists on
// the server, causing an infinite 404 → reload loop. This branch self-destructs
// (clears caches + unregisters) so previously poisoned browsers heal on the
// next service-worker update check.
const DEV_HOSTNAMES = ['localhost', '127.0.0.1', '::1', '[::1]'];

if (DEV_HOSTNAMES.includes(self.location.hostname)) {
  self.addEventListener('install', () => self.skipWaiting());
  self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches
        .keys()
        .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
        .then(() => self.registration.unregister())
        .then(() => self.clients.matchAll({ type: 'window' }))
        .then((clients) => {
          for (const client of clients) {
            client.navigate(client.url).catch(() => {});
          }
        }),
    );
  });
} else {
  self.addEventListener('install', (event) => {
    event.waitUntil(
      caches
        .open(CACHE_NAME)
        .then((cache) => cache.addAll(PRECACHE_URLS))
        .then(() => self.skipWaiting()),
    );
  });

  self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches
        .keys()
        .then((keys) =>
          Promise.all(
            keys
              .filter((key) => key !== CACHE_NAME)
              .map((key) => caches.delete(key)),
          ),
        )
        .then(() => self.clients.claim()),
    );
  });

  self.addEventListener('fetch', (event) => {
    const { request } = event;

    if (request.method !== 'GET') {
      return;
    }

    const url = new URL(request.url);
    if (url.origin !== self.location.origin) {
      return;
    }

    if (request.mode === 'navigate') {
      event.respondWith(
        fetch(request)
          .then((response) => {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
            return response;
          })
          .catch(() =>
            caches.match(request).then((cached) => cached || caches.match('/')),
          ),
      );
      return;
    }

    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) {
          return cached;
        }

        return fetch(request).then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        });
      }),
    );
  });
}
