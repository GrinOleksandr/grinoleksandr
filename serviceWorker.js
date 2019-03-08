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
    console.log('[Service Worker] Fetched resource '+e.request.url);
});

