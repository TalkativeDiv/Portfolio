// * DO NOT DO ANYTHING TO THIS FILE, THIS IS MEANT FOR THE PROGRESSIVE WEB APPLICATION IF THIS GETS MODIFIED, THE PWA WILL NOT WORK*/
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

workbox.routing.registerRoute(
     ({request}) => request.destination === 'image',
     new workbox.strategies.NetworkFirst()
)

const CACHE_NAME = "offline";
const OFFLINE_URL = "offline.html";

const filesToCache = [
     '/',
     './assets/clock.svg',
     './icons/',
     './index.html',
     './apps'

   ];
   
self.addEventListener("install", function(event) {
  console.log("SW Install");
});

self.addEventListener("activate", event => {
  console.log("[ServiceWorker] Activate");
  event.waitUntil(
    (async () => {
      // Enable navigation preload if it's supported.
      // See https://developers.google.com/web/updates/2017/02/navigation-preload
      if ("navigationPreload" in self.registration) {
        await self.registration.navigationPreload.enable();
      }
    })()
  );

  // Tell the active service worker to take control of the page immediately.
  self.clients.claim();
});

self.addEventListener("fetch", function(event) {
  // console.log('[Service Worker] Fetch', event.request.url);
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }

          const networkResponse = await fetch(event.request);
          return networkResponse;
        } catch (error) {
          console.log(
            "[Service Worker] Fetch failed; returning offline page instead.",
            error
          );

          const cache = await caches.open(CACHE_NAME);
          const cachedResponse = await cache.match(OFFLINE_URL);
          return cachedResponse;
        }
      })()
    );
  }
});

