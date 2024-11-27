const cache_name = "my_cache";
self.addEventListener("install", (e) => {
  console.log("installing service worker");
  e.waitUntil(
    caches.open(cache_name).then((cache) => {
      return cache
        .addAll([
          "/",
          "../src/components/Chat/Chat.js",
          "../src/hooks/useAuth.js",
        ])
        .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("activating service worker");
  event.waitUntil(self.clientInformation.claim());
});
