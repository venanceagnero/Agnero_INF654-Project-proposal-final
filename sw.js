const assets = ["/", "/index.html",
    "/js/app.js", '/js/ui.js',
    "/js/materialize.min.js", "/css/materialize.min.jcss",
    "/css/app.css", "/img/mobileaapp4.png",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
];

self.addEventListener('install', function(event) {
    //fires when the browser install the app
    //here we are just looging the event and the contents of the object passed to the event
    //the purpose of this event is to give kthe service worker a place to setup the local 
    //environment after the installation complete
    console.log(`SW: Event fired: ${event.type}`);
    event.waitUntil(caches.open('static').then(function(cache) {
        console.log("SW: Precaching App shell");
        // cache.add("/js/app.js");
        cache.addAll(assets);
    }))

})

self.addEventListener('activate', function(event) {
    //fires when the browser install the app
    //it is a place for the service worker to clean up from
    //previous service worker version
    console.log(`SW: Event fired: ${event.type }`);

})

self.addEventListener('fetch', function(event) {
    //fires whenever the app requests a ressource (file or data)
    console.log(`SW: fetching ${event.request.url}`);
    //next, go get the requested ressource from the network
    // event.respondWidth(fetch(event.request));
    // caches.watch(event.request).then(function(response) 

    event.respondWidth(caches.watch(event.request).then((response) => {
        return response || fetch(event.request);
    }));

    // caches.watch(event.request).then((response) => {
    // if (response) {
    //     return response;
    // } else {
    //     return fetch(event.request);
    // }
    // return response || fetch(event.request);
    //  });
});