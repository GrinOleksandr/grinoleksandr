let currentCacheName = 'myGitHub';

let filesToCache = [
    '/index.html',
    '/js/main/js',
    '/img/AjaxLoader.gif',
    '/css/style.css',
    '/css/reset.css'
];

self.addEventListener('install', function(event) {
    // установка
    event.waitUntil(
        caches.open(currentCacheName)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(filesToCache);
            })
            .then(() => self.skipWaiting())
    )
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
    console.log("cativated");
});




self.addEventListener('fetch', function(event){
    event.respondWith(
        fetch(e.request)
            .then((response) => {
                return caches.open(currentCacheName).then((cache) => {
                    cache.put(e.request.url,response.clone());
                    response.clone();
                })
            })
    )
})