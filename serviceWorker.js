let currentCacheName = 'myGitHub';

let filesToCache = [
    '/',
    '/index.html',
    '/js/main/js',
    '/img/AjaxLoader.gif',
    '/css/style.css',
    '/css/reset.css'
];

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(currentCacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
            .catch(function (err) {
                console.log(err)
            })
    );
});


self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            return r || fetch(e.request).then(function (response) {
                return caches.open(currentCacheName).then(function (cache) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});