const FILES_TO_CACHE = [
    "./index.html",
    "./css/style.css",
    "./js/index.js",
    "./js/idb.js",
    "./manifest.webmanifest",
    "./icons/icon-72x72.png",
    "./icons/icon-96x96.png",
    "./icons/icon-128x128.png",
    "./icons/icon-144x144.png",
    "./icons/icon-152x152.png",
    "./icons/icon-192x192.png",
    "./icons/icon-384x384.png",
    "./icons/icon-512x512.png"
  ];

const CACHE_NAME = "dude-cache-v1";
const DATA_CACHE_NAME = "love-cache-v1";

// This is the install event listener:
self.addEventListener('install', function (e) {
    e.waitUntil(
      caches.open(CACHE_NAME).then(function (cache) {
        console.log('installing cache : ' + CACHE_NAME)
        return cache.addAll(FILES_TO_CACHE)
      })
    )
  
    self.skipWaiting();
  });

  // event listener for when activated:
self.addEventListener("activate", (e) => {
    // remove old caches
    e.waitUntil(
      caches.keys().then((keyList) => {
        return Promise.all(
          keyList.map((key) => {
            if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
              return caches.delete(key);
            }
          })
        );
      })
    ) 

    self.clients.claim();
});