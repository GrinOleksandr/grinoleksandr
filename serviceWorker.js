let currentCacheName = 'myGitHub';

let filesToCache = [
    '/index.html',
    '/js/main/js',
    '/img/AjaxLoader.gif',
    '/css/style.css',
    '/css/reset.css'
];

self.addEventListener('install', function(event) {
    event.waitUntill(
        caches.open(currentCacheName)
            .then(function (cache) {
                return cache.addAll(filesToCache)
            })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntill(
        cached.keys()
            .then(function (cachedNames) {
                return Promise.all(
                    cachedNames.filter(function (cacheName) {
                        return cacheName !== currentCacheName;
                    }).map(function (cacheName) {
                        return caches.delete(cacheName);
                    })
                )
            })
    )
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
    );
});