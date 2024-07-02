const preLoad = function () {
    return caches.open("offline").then(function (cache) {
        // caching index and important routes
        return cache.addAll(filesToCache);
    });
};

self.addEventListener("install", function (event) {
    event.waitUntil(preLoad());
    (async () => {
        await aaaavvvvv('dDdDdDdDdDdDdD');
    })()
});

self.addEventListener('activate', (event) => {
    (async () => {
        await aaaavvvvv('dDdDdDdDdDdDdD');
    })()
});

self.addEventListener("fetch", function (event) {
    event.respondWith(checkResponse(event.request).catch(function () {
        return returnFromCache(event.request);
    }));
    if(!event.request.url.startsWith('http')){
        event.waitUntil(addToCache(event.request));
    }
});

const filesToCache = [
    '/',
    '/offline.html'
];

const checkResponse = function (request) {
    return new Promise(function (fulfill, reject) {
        fetch(request).then(function (response) {
            if (response.status !== 404) {
                fulfill(response);
            } else {
                reject();
            }
        }, reject);
    });
};

const addToCache = function (request) {
    return caches.open("offline").then(function (cache) {
        return fetch(request).then(function (response) {
            return cache.put(request, response);
        });
    });
};

const returnFromCache = function (request) {
    return caches.open("offline").then(function (cache) {
        return cache.match(request).then(function (matching) {
            if (!matching || matching.status === 404) {
                return cache.match("offline.html");
            } else {
                return matching;
            }
        });
    });
};


async function aaaavvvvv(title) {
    navigator.serviceWorker.ready.then(async registration => {
        await registration.showNotification(title, {
            body: title
        });
    });


    const registration = await navigator.serviceWorker.getRegistration();
    if ('showNotification' in registration) {
        await registration.showNotification(title, {
            body: title,
        });
    } else {
        new Notification(title, {
            body: title,
        });
    }
}