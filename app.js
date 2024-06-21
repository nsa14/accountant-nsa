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
self.addEventListener('push', async (event) => {
    const notification = event.data.json();
    // {'title':'dfdfdf', 'body':'aaaa', 'url': 'uuuuuuu'}
    // const message = await event.data.json();
    let {title, description, image} = notification;
    // event.waitUntil(self.registration.showNotification(notification.title, {
    event.waitUntil(showPushNotification(notification));
});

function showPushNotification(title, description, image) {
    self.registration.showNotification(title, {
        body: description,
        icon: image,
        actions: [
            {
                title: "Say hi",
                action: "Say hi",
            },
        ],
    });
}

self.addEventListener('activate', async () => {
    // This will be called only once when the service worker is activated.
    try {
        const options = {}
        const subscription = await self.registration.pushManager.subscribe(options)
        console.log(JSON.stringify(subscription))
        alert('JSON.stringify(subscription): '+JSON.stringify(subscription));
    } catch (err) {
        console.log('Error', err)
    }
})

self.addEventListener('notification', (event) => {
    event.waitUntil(client.openWindow(event.notification.data.notifUrl));
})