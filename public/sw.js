const CACHE_NAME = "xp-voca-v26";

// Only pre-cache strictly public, non-auth static assets
const ASSETS_TO_CACHE = [
  "/mascot.png",
  "/favicon.ico",
  "/manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    // Strictly NetworkFirst for navigation requests so auth-protected HTML is never served from stale pre-cache
    event.respondWith(
      fetch(event.request).catch(async () => {
        const cached = await caches.match(event.request);
        return (
          cached ||
          new Response(
            "<!doctype html><html lang='vi'><body style='font-family:sans-serif;text-align:center;padding:3rem'><h1>Bạn đang ngoại tuyến</h1><p>Vui lòng kiểm tra kết nối mạng và thử lại.</p></body></html>",
            { status: 503, headers: { "Content-Type": "text/html; charset=utf-8" } }
          )
        );
      })
    );
  } else {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
  }
});
