import { precacheAndRoute } from "workbox-precaching";

// service-worker.js

// Use with precache injection
//precacheAndRoute(self.__WB_MANIFEST);

const CACHE_NAME = 'my-pwa-cache-v2';
const urlsToCache = [


];

/*
'/'/',
index.php',
  '/offline.html'
  '/styles.css',
  '/script.js',*/

/* eslint-disable-next-line no-restricted-globals */
self.addEventListener('install', (event) => {
  console.log('Service Worker installato con successo:', event);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

/* eslint-disable-next-line no-restricted-globals */
self.addEventListener('fetch', (event) => {
console.log('Service Worker ha intercettato una richiesta di fetch:', event);
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Se la risorsa � gi� in cache, restituisci la versione in cache
        if (response) {
          return response;
        }

        // Altrimenti, effettua una richiesta di rete e memorizza la risorsa in cache per le future visite
        return fetch(event.request)
          .then((response) => {
            // Verifica se la risposta � valida
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

/* eslint-disable-next-line no-restricted-globals */
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

