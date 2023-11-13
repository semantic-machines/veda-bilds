// This is the "Simple offline" service worker

const veda_version = 20210416202615;
const watchTimeout = 60 * 1000;
const FILES = 'files';
const STATIC = 'static';
const API = [
  '/ping',
  '/get_rights',
  '/get_rights_origin',
  '/get_membership',
  '/authenticate',
  '/get_ticket_trusted',
  '/is_ticket_valid',
  '/get_operation_state',
  '/wait_module',
  '/query',
  '/get_individual',
  '/get_individuals',
  '/remove_individual',
  '/put_individual',
  '/add_to_individual',
  '/set_in_individual',
  '/remove_from_individual',
  '/put_individuals',
  '/watch',
];

/**
 * Watch cached resources changes
 */
function watchChanges () {
  if (typeof EventSource === 'undefined') return;

  const events = new EventSource('/watch');

  events.onopen = () => {
    console.log(new Date().toISOString(), 'Watching resources changes');
  };

  events.onerror = (event) => {
    console.log(new Date().toISOString(), `Failed to watch resources changes, reconnect in ${Math.floor(watchTimeout / 1000)} sec`);
    event.target.close();
    setTimeout(watchChanges, watchTimeout);
  };

  events.onmessage = (event) => {
    const change = JSON.parse(event.data);
    Object.keys(change).forEach((_path) => {
      const path = (_path === '/index.html' ? '/' : _path);
      caches.match(path).then((response) => {
        if (response && response.ok) {
          const cache_modified = response.headers.get('last-modified');
          const event_modified = change[path];
          if (cache_modified !== event_modified) {
            caches.open(STATIC).then((cache) => cache.delete(path)).then(() => {
              console.log(new Date().toISOString(), 'Cached resource deleted: ', path);
            });
          }
        }
      });
    });
  };
}
watchChanges();

/**
 * Listen to messages from client
 */
self.addEventListener('message', (event) => {
  if (event.origin !== this.registration.scope.slice(0, -1)) return;
  if (event.data === 'version') {
    event.source.postMessage({version: veda_version});
  }
});

/**
 * Clear cached resources
 */
self.addEventListener('install', (event) => {
  this.skipWaiting();
  console.log(`Service worker updated, veda_version = ${veda_version}, clear cache`);
  event.waitUntil(
    caches.keys().then((keyList) => Promise.all(keyList.map((key) => caches.delete(key)))),
  );
});

/**
 * Fetch event handler
 * @param {Event} event
 * @param {string} CACHE
 * @return {Response}
 */
function handleFetch (event, CACHE) {
  const path = new URL(event.request.url).pathname;
  return caches.match(path).then((cached) => cached || fetch(event.request).then((response) => {
    if (response.ok && !cached) {
      const clone = response.clone();
      caches.open(CACHE).then((cache) => {
        cache.put(path, clone);
      });
    }
    return response;
  }));
}

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const {pathname} = url;
  const isAPI = API.indexOf(pathname) >= 0;
  const isFILES = pathname.indexOf('/files') === 0;
  const isNTLM = pathname.indexOf('/ntlm') === 0;
  const isSTATIC = !isAPI && !isFILES && !isNTLM;
  if (event.request.method === 'GET') {
    if (isSTATIC) {
      event.respondWith(handleFetch(event, STATIC));
    } else if (isFILES) {
      event.respondWith(handleFetch(event, FILES));
    }
  }
});
