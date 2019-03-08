let currentCacheName = 'myGitHub';

let filesToCache = [
    '/index.html',
    '/js/main/js',
    '/img/AjaxLoader.gif',
    '/css/style.css',
    '/css/reset.css'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(currentCacheName)
            .then(function (cache) {
                return cache.addAll(filesToCache)
            })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys()
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


//FAST TRACK
// self.addEventListener('install', (event)=>{
//     event.waitUntil(self.skipWaiting());
// });
//
//
// self.addEventListener('activate', (event)=>{
//     event.waitUntil(self.clients.claim());
// });
//FAST TRACK END


self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                    // ресурс есть в кеше
                    if (response) {
                        return response;
                    }
                    return fetch(event.request);
                }
            )
    );
});