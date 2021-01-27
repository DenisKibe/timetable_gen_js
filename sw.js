alert('here');
const cacheName='deniskibe-v1';
consta resourcesToPrecache=[
'/'
'index.html',
'css/bootstrap.css'
];

self.addEventListener('install', event=>{
    console.log('Install event!');
    event.waitUntil(
        caches.open(cacheName)
            .then(cache=>{
                return cache.addAll(resourcesToPrecache);
             })
    );
});

self.addEventListener('activate', event=>{
    console.log('Activate event!');
});

self.addEventListener('fetch', event=>{
    console.log('Fecth intercepted for:', event.request.url);
    event.respondWith(caches.match(event.request)
      .then(cacheResponse=>{
          return cacheResponse || fetch(event.request);
       })
    );
});

