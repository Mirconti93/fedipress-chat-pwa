// service-worker.js

const CACHE_NAME = 'my-pwa-cache-v2';
const urlsToCache = [


];

/*
'/'/',
index.php',
  '/offline.html'
  '/styles.css',
  '/script.js',*/

self.addEventListener('install', (event) => {
  console.log('Service Worker installato con successo:', event);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
console.log('Service Worker ha intercettato una richiesta di fetch:', event);
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Se la risorsa è già in cache, restituisci la versione in cache
        if (response) {
          return response;
        }

        // Altrimenti, effettua una richiesta di rete e memorizza la risorsa in cache per le future visite
        return fetch(event.request)
          .then((response) => {
            // Verifica se la risposta è valida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clona la risposta per evitare la chiusura del corpo della risorsa
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      })
      .catch(() => {
        // In caso di errore, restituisci la pagina offline
        return caches.match('/offline.html');
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker attivato con successo:', event);
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Rimuovi eventuali cache obsolete
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

