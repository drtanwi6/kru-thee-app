/* Kru Thee service worker.
   Navigations: network first, offline page as fallback.
   Static files: cache first.
   Private and API requests are never cached. */
const VERSION = "kru-thee-v2";
const CACHE = VERSION;

const PRECACHE = [
  "/offline.html",
  "/manifest.webmanifest",
  "/favicon.svg",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-maskable-192.png",
  "/icons/icon-maskable-512.png",
];

function isPrivatePath(pathname) {
  return (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_server") ||
    pathname.startsWith("/__nitro") ||
    pathname.startsWith("/auth")
  );
}

function isStaticAsset(pathname) {
  return (
    pathname.startsWith("/icons/") ||
    pathname.startsWith("/screenshots/") ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/assets/") ||
    pathname === "/favicon.svg" ||
    pathname === "/manifest.webmanifest" ||
    pathname === "/offline.html"
  );
}

async function networkFirstNavigation(request) {
  try {
    const response = await fetch(request);
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    const offline = await caches.match("/offline.html");
    if (offline) return offline;
    return new Response("Offline", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response && response.ok) {
    const copy = response.clone();
    caches
      .open(CACHE)
      .then((cache) => cache.put(request, copy))
      .catch(() => {});
  }
  return response;
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => Promise.allSettled(PRECACHE.map((url) => cache.add(url))))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  let url;
  try {
    url = new URL(request.url);
  } catch {
    return;
  }
  if (url.origin !== self.location.origin) return;
  if (isPrivatePath(url.pathname)) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirstNavigation(request));
    return;
  }
  if (isStaticAsset(url.pathname)) {
    event.respondWith(cacheFirst(request));
  }
});
