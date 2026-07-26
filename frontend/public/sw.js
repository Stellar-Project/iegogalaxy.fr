const CACHE = "stellar-project-v1";
const STATIC = ["/", "/wiki", "/tutoriel", "/telechargement", "/apropos", "/faq"];

self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(STATIC))
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(clients.claim());
});

self.addEventListener("fetch", (e) => {
  if (e.request.url.startsWith(self.location.origin) && !e.request.url.includes("/api/")) {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
  }
});
