let currentCacheName = 'myGitHub';

let filesToCache = [
    '/index.html',
    '/js/main/js',
    '/img/AjaxLoader.gif',
    '/css/style.css',
    '/css/reset.css'
];


self.addEventListener('install', function(e) {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(currentCacheName).then(function(cache) {
            console.log('[Service Worker] Caching all: app shell and content');
            return cache.addAll(filesToCache);
        })
    );
});


self.addEventListener('activate', function(e) {
    console.log('[Service Worker] ACTIVATE');
    e.waitUntil(
        caches.open(currentCacheName).then(function(cache) {
            console.log('[Service Worker] Caching all: app shell and content');
            return cache.addAll(filesToCache);
        })
    );
});











self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(r) {
            console.log('[Service Worker] Fetching resource: '+e.request.url);
            return r || fetch(e.request).then(function(response) {
                return caches.open(cacheName).then(function(cache) {
                    console.log('[Service Worker] Caching new resource: '+e.request.url);
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});
