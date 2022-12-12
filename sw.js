const staticCache = "Static-cache-v3";


const dynamicCache = "Dynamic-cache-v4";


const assets = ["/", "/index.html",
    "/pages/fallback.html",
    "/js/app.js", '/js/ui.js',
    "/js/materialize.min.js", "/css/materialize.min.jcss",
    "/css/app.css",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
];

//cache size limit
const limitCacheSize = (name, size) => {
    caches.open(name).then((cache) => {
        cache.key().then((keys) => {
            if (keys.lenght > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        })
    })
}

self.addEventListener('install', function(event) {
    //fires when the browser install the app
    //here we are just looging the event and the contents of the object passed to the event
    //the purpose of this event is to give kthe service worker a place to setup the local 
    //environment after the installation complete
    console.log(`SW: Event fired: ${event.type}`);
    event.waitUntil(caches.open('static').then(function(cache) {
        console.log("SW: Precaching App shell");

        cache.addAll(assets);
    }))

})

self.addEventListener('activate', function(event) {
    //fires when the browser install the app
    //it is a place for the service worker to clean up from
    //previous service worker version
    event.waitUntil(caches.keys().then(keys => {
        return Promise.all(keys.filter((key) => key != staticCache && key != dynamicCache).map((key) => caches.delete(key)))
    }))

})

self.addEventListener('fetch', function(event) {
    //fires whenever the app requests a ressource (file or data)
    //next, go get the requested ressource from the network
    if (event.request.url.index("firestore.googleapis.com") === -1) {
        event.respondWidth(caches.match(event.request).then((response) => {
            return response || fetch(event.request).then((fetchRes) => {
                return caches.open(dynamicCache).then((cache) => {
                    cache.put(event.request.url, fetchRes.clone())
                    limitCacheSize(dynamicCache, 15);
                    return fetchRes;
                })
            }).catch(() => caches.match("/pages/fallback.html"));
        }));
    }
});