// DOBERTO VCF — service worker minimal
// Sèl rezon li egziste: Chrome/Android mande yon service worker aktif
// anvan l ka montre "beforeinstallprompt" (enstale kòm app).
const CACHE = 'doberto-vcf-v1';

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Pass-through senp — pa gen cache agresif pou pa afekte done fòm yo.
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
