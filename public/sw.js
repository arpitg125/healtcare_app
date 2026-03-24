const CACHE_NAME = "healthcare-cache-v1";
const urlsToCache = ["/", "/index.html", "/static/js/main.chunk.js"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)),
        ),
      ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => res || fetch(event.request)),
  );
});

self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "Healthcare Alert";
  const options = {
    body: data.body || "You have a new notification.",
    icon: "/logo192.png",
    badge: "/logo192.png",
    vibrate: [100, 50, 100],
    data: { url: data.url || "/" },
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url || "/"));
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SHOW_LOCAL_NOTIFICATION") {
    const { title, body, url } = event.data.payload;
    self.registration.showNotification(title, {
      body,
      icon: "/logo192.png",
      badge: "/logo192.png",
      data: { url: url || "/" },
    });
  }
});
