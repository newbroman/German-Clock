const CACHE_NAME = 'german-time-v4';
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './help_en.html',
    './help_de.html'
];

// 1. Install Event: Cache all the assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Caching German Time Assets');
            return cache.addAll(ASSETS);
        })
    );
});

// 2. Activate Event: Clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            );
        })
    );
});

// 3. Fetch Event: Serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
