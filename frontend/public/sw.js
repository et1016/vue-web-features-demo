self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};
  const title = data.title || "新通知";
  const body = data.body || "您收到一則新的通知";

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: "/icons.svg",
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(self.clients.openWindow("/"));
});
