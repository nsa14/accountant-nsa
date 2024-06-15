//1
// if ("serviceWorker" in navigator) {
//     window.addEventListener("load", function() {
//         navigator.serviceWorker
//             .register("http://naser-zare.ir/accountant/serviceWorker.js")
//             .then(res => console.log("service worker registered"))
//             .catch(err => console.log("service worker not registered", err))
//     })
// }


// //2
// if ("serviceWorker" in navigator) {
//     // declaring scope manually
//     navigator.serviceWorker.register("http://naser-zare.ir/accountant/sw.js", { scope: "./" }).then(
//         (registration) => {
//             console.log("Service worker registration succeeded:", registration);
//         },
//         (error) => {
//             console.error(`Service worker registration failed: ${error}`);
//         },
//     );
// } else {
//     console.error("Service workers are not supported.");
// }

//3
self.addEventListener('push', (event) => {
    const notification = event.data.json();
    // {'title':'dfdfdf', 'body':'aaaa', 'url': 'uuuuuuu'}
    event.waitUntil(self.registration.showNotification(notification.title, {
        body: notification.body,
        icon: './assets/images_manifest/icons/apple-touch-icon.png',
        data: {
            notifUrl: notification.url
        }
    }));
});

self.addEventListener('notification', (event) => {
    event.waitUntil(client.openWindow(event.notification.data.notifUrl));
})