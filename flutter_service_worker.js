'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "4a315ad1c569952f32f7099c04759861",
"assets/assets/audio/breaking.mp3": "3cd9d793776b2c7e5a7a06ff9d1e4c90",
"assets/assets/audio/dead.mp3": "13017c4071ee9d6ed036c5a83b576a1b",
"assets/assets/audio/explosion.mp3": "9d216e3d3c4f7094adcaf8ecd7d712c3",
"assets/assets/audio/gunshot.mp3": "c199621e27c99a510bdd85abd4db0e9e",
"assets/assets/audio/hey.mp3": "808d801f147a1fc1f6abdc91341fdd68",
"assets/assets/audio/loading.mp3": "c0322e14cedb47e6987698612d9baabf",
"assets/assets/audio/wins.mp3": "def1c08065831a970183e9c3544d834f",
"assets/assets/fonts/Mitr-Regular.ttf": "3a0a53c9bb100679336663c17f4b298c",
"assets/assets/fonts/Rye-Regular.ttf": "17cda14f1171784ef4c7d568dda006be",
"assets/assets/images/aim.png": "7e486352bef7cbb23c09cdd9ece0931d",
"assets/assets/images/bg.png": "261b6d0b88842889c6da6f9668ef3dc5",
"assets/assets/images/buttons.png": "d7491b9037bbe02be03a718e676f7588",
"assets/assets/images/buttonwhite.png": "d53545a770b44cb077a698e9930b190f",
"assets/assets/images/checking.png": "bb123ed78dc00bdba0702218e624b2f7",
"assets/assets/images/cracked.jpg": "01b2215fcf493eedbd3c220e195f20d3",
"assets/assets/images/draw.png": "887ada2e580cd87faa3b18711e2bea25",
"assets/assets/images/explode.png": "a41ecf7a8980429ef7e98b747914242e",
"assets/assets/images/fireicon.png": "e23e1e44b4611688a4a9f4dc04ffcee2",
"assets/assets/images/gun.png": "8e58df256d78d279665ff98df1e4cd2a",
"assets/assets/images/gunfire.png": "c0645bffffff38cf4693bce5c243d001",
"assets/assets/images/halfchico.png": "e8773be6756a3fa81ad41c63103a7955",
"assets/assets/images/hat.png": "03e9963bcdd595b820b3a7054026d882",
"assets/assets/images/rotating.png": "3fc7f4c8411cd4f99019b31d1fe06ceb",
"assets/assets/images/ruready.png": "22cb4426be840cf01659cc6ce1a56a91",
"assets/assets/images/shooting.png": "27b293c48c2bc55c41e7b1e2c63b9c23",
"assets/assets/images/skye.png": "ce175e55d7b4f8b50d9526fddda90511",
"assets/assets/images/spinner.png": "a61c671e005893bba600ab4da3d5d36f",
"assets/assets/images/standing.png": "bcbb77663bc64d780ad6b05609923d1b",
"assets/assets/images/udead.png": "1671af597b0ed7119d770b9890487ea7",
"assets/assets/images/uwin.png": "0b5f94f003a3d17567af5d42b4fd42ad",
"assets/assets/images/waiting.png": "28d0ac85129cb2f31f98b3b9c9b1b002",
"assets/FontManifest.json": "69faad353d8760a3020d8f63a466975b",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/NOTICES": "2796a1aba2ab75494313162bc965c7db",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "a85fcf6324d3c4d3ae3be1ae4931e9c5",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "be61bfd9588627d792126ae3ca160748",
"/": "be61bfd9588627d792126ae3ca160748",
"main.dart.js": "ef7680c6977c08cb4fc082f7ec51cd8f",
"manifest.json": "a829e1c5b1d91f8ea9720adff7e16273",
"version.json": "759cac0e545c92f3b34be92531bdc395"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
