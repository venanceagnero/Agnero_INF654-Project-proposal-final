self.addEventListener('install', function(event) {
    //fires when the browser install the app
    //here we are just looging the event and the contents of the object passed to the event
    //the purpose of this event is to give kthe service worker a place to setup the local 
    //environment after the installation complete
    console.log(`SW: event fired: ${event.type}`);

})

self.addEventListener('activate', function(event) {
    //fires when the browser install the app
    //it is a place for the service worker to clean up from
    //previous service worker version
    console.log('SW: event fired: ${event.type}');
    $
})

self.addEventListener('fetch', function(event) {
    //fires whenever the app requests a ressource (file or data)
    console.log('SW: fetching ${event.request.url}');
    //next, go get the requested ressource from the network
    event.respondWidth(fetch(event.request));
})