/**
 * Local database singleton constructor
 * @return {Promise} database instance promise
 */
function LocalDB () {
  // Singleton pattern
  if (LocalDB.prototype._singletonInstance) {
    return LocalDB.prototype._singletonInstance;
  }
  LocalDB.prototype._singletonInstance = this;

  this.veda_version = veda_version;
  this.db_name = 'sw';
  this.store_name = 'individuals';
}

LocalDB.prototype.constructor = LocalDB;

/**
 * Initialize database instance
 * @return {Promise} database instance promise
 */
LocalDB.prototype.init = function () {
  return new Promise((resolve, reject) => {
    if (this.db) {
      resolve(this);
      return;
    }
    const openReq = indexedDB.open(this.db_name, this.veda_version);

    openReq.onsuccess = (event) => {
      this.db = event.target.result;
      console.log(`DB open success: ${this.db_name}, version = ${this.veda_version}`);
      resolve(this);

      this.db.onversionchange = () => {
        this.db.close();
        console.log('DB is outdated');
        this.init();
      };
    };

    openReq.onerror = (error) => {
      reject(error);
    };

    openReq.onupgradeneeded = (event) => {
      const result = event.target.result;
      if (result.objectStoreNames.contains(this.store_name)) {
        result.deleteObjectStore(this.store_name);
        console.log(`DB store deleted: ${this.store_name}`);
      }
      result.createObjectStore(this.store_name);
      console.log(`DB store created: ${this.store_name}, version = ${this.veda_version}`);
    };

    openReq.onblocked = function (event) {
      self.clients.matchAll({includeUncontrolled: true}).then(function (clients) {
        clients.forEach((client) => {
          client.postMessage({alert: 'Пожалуйста, закройте другие открытые вкладки системы! \nPlease close all other open tabs with the system!'});
        });
      });
    };
  }).catch((error) => {
    console.log('IndexedDB error', error);
  });
};

LocalDB.prototype.get = function (key) {
  return new Promise((resolve, reject) => {
    return this.init().then(() => {
      const request = this.db.transaction([this.store_name], 'readonly').objectStore(this.store_name).get(key);
      request.onerror = reject;
      request.onsuccess = (event) => resolve(event.target.result);
    });
  });
};

LocalDB.prototype.put = function (key, value) {
  return new Promise((resolve, reject) => {
    return this.init().then(() => {
      const request = this.db.transaction([this.store_name], 'readwrite').objectStore(this.store_name).put(value, key);
      request.onerror = reject;
      request.onsuccess = () => resolve(value);
    });
  });
};

LocalDB.prototype.remove = function (key) {
  return new Promise((resolve, reject) => {
    return this.init().then(() => {
      const request = this.db.transaction([this.store_name], 'readwrite').objectStore(this.store_name).delete(key);
      request.onerror = reject;
      request.onsuccess = (event) => resolve(event.target.result);
    });
  });
};

// API calls caching service worker

const veda_version = 20231113123559;
const watchTimeout = 60 * 1000;
const FILES = 'files';
const STATIC = 'static';
const API = 'api';
const db = new LocalDB();
db.init();

const API_FNS = [
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
  '/logout',
  '/watch',
];
const NTLM = [
  '/ntlm',
];

// Check line
self.onLine = false;
function sendStatus () {
  self.clients.matchAll({includeUncontrolled: true}).then(function (clients) {
    clients.forEach((client) => {
      client.postMessage({onLine: self.onLine});
    });
  });
}

const pingTimeout = 5000;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let pinging = false;

function ping () {
  if (pinging) return;
  pinging = true;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), pingTimeout);
  fetch('/ping', {signal: controller.signal})
    .then((response) => {
      clearTimeout(id);
      if (response.ok) {
        self.onLine = true;
        sendStatus();
        pinging = false;
        flushQueue();
      } else {
        self.onLine = false;
        sendStatus();
        wait(pingTimeout).then(() => {
          pinging = false;
          ping();
        });
      }
    })
    .catch(() => {
      clearTimeout(id);
      self.onLine = false;
      sendStatus();
      wait(pingTimeout).then(() => {
        pinging = false;
        ping();
      });
    });
}

self.addEventListener('message', (event) => {
  if (event.origin !== self.registration.scope.slice(0, -1)) return;
  if (event.data === 'status') {
    ping();
  }
});

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
  if (event.origin !== self.registration.scope.slice(0, -1)) return;
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

self.addEventListener('fetch', function (event) {
  const url = new URL(event.request.url);
  const pathname = url.pathname;
  const isAPI = API_FNS.indexOf(pathname) >= 0;
  const isNTLM = NTLM.indexOf(pathname) >= 0;
  const isFILES = pathname.indexOf('/files') === 0;
  const isSTATIC = !isAPI && !isFILES && !isNTLM;
  const isEXTENSION = url.protocol === 'chrome-extension:';
  const METHOD = event.request.method;
  if (isAPI && METHOD === 'GET') {
    event.respondWith(handleAPIGet(event));
  } else if (isAPI && METHOD === 'POST') {
    event.respondWith(handleAPIPost(event));
  } else if (isAPI && METHOD === 'PUT') {
    event.respondWith(handleAPIPut(event));
  } else if (isSTATIC && METHOD === 'GET' && !isEXTENSION) {
    event.respondWith(handleFetch(event, STATIC));
  }
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
        cache.put(event.request, clone);
      });
    }
    return response;
  }));
}

const OFFLINE_API_RESPONSE = {
  // GET
  'authenticate': '{"end_time":' + (Date.now() + 12 * 3600 * 1000) + ',"id":"","result":200,"user_uri":""}',
  'get_ticket_trusted': '{"end_time":' + (Date.now() + 12 * 3600 * 1000) + ',"id":"","result":200,"user_uri":""}',
  'is_ticket_valid': 'true',
  'get_rights': '{"@":"_","rdf:type":[{"data":"v-s:PermissionStatement","type":"Uri"}],"v-s:canCreate":[{"data":true,"type":"Boolean"}],"v-s:canDelete":[{"data":false,"type":"Boolean"}],"v-s:canRead":[{"data":true,"type":"Boolean"}],"v-s:canUpdate":[{"data":true,"type":"Boolean"}]}',
  'get_rights_origin': '[]',
  'get_membership': '{"@":"_","rdf:type":[{"data":"v-s:Membership","type":"Uri"}],"v-s:memberOf":[{"data":"v-s:AllResourcesGroup","type":"Uri"}]}',
  'get_individual': '{"@":"_","rdf:type":[{"type":"Uri","data": "rdfs:Resource"}],"rdfs:label": [{"type": "String", "data": "Нет связи с сервером. Этот объект сейчас недоступен.", "lang": "RU"},{"type": "String", "data": "Server disconnected. This object is not available now.", "lang": "EN"}]}',

  // POST
  'query': '{"result":[],"count":0,"estimated":0,"processed":0,"cursor":0,"result_code":200}',
  'get_individuals': '[]',

  // PUT
  'remove_individual': '{"op_id":0,"result":200}',
  'put_individual': '{"op_id":0,"result":200}',
  'add_to_individual': '{"op_id":0,"result":200}',
  'set_in_individual': '{"op_id":0,"result":200}',
  'remove_from_individual': '{"op_id":0,"result":200}',
  'put_individuals': '{"op_id":0,"result":200}',
};

/**
 * API call handler
 * @param {Event} event
 * @return {Response}
 */
function handleAPIGet (event) {
  const url = new URL(event.request.url);
  url.searchParams.delete('ticket');
  const fn = url.pathname.split('/').pop();
  switch (fn) {
  // Fetch first
  case 'get_rights':
  case 'get_rights_origin':
  case 'get_membership':
    return fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open( API ).then((cache) => {
            cache.put(url, clone);
          });
        } else if (response.status === 0 || response.status === 503) {
          ping();
          return caches.match(url).then((cached) => cached || response);
        }
        return response;
      })
      // Network error
      .catch((error) => {
        ping();
        return caches.match(url).then((cached) => {
          if (cached) return cached;
          throw error;
        });
      });
  // Cache first
  case 'get_individual':
    return caches.match(url).then((cached) => cached || fetch(event.request)
      .then((response) => {
        url.searchParams.delete('vsn');
        if (response.ok) {
          const clone = response.clone();
          caches.open( API ).then((cache) => cache.put(url, clone));
        } else if (response.status === 0 || response.status === 503) {
          ping();
          if (cached) return cached;
        }
        return response;
      }))
      // Network error
      .catch((error) => {
        ping();
        url.searchParams.delete('vsn');
        return caches.match(url).then((cached) => {
          if (cached) return cached;
          throw error;
        });
      });
  // Fetch only
  case 'authenticate':
  case 'get_ticket_trusted':
  case 'is_ticket_valid':
  case 'logout':
  default:
    return fetch(event.request)
      .then((response) => {
        if (response.status === 0 || response.status === 503) {
          ping();
        }
        return response;
      })
      .catch((error) => {
        ping();
        throw error;
      });
  }
}

function handleAPIPost (event) {
  const url = new URL(event.request.url);
  const fn = url.pathname.split('/').pop();
  // Fetch only
  if (fn === 'authenticate') {
  return fetch(event.request)
    .then((response) => {
      if (response.status === 0 || response.status === 503) {
        ping();
      }
      return response;
    })
    .catch((error) => {
      ping();
      throw error;
    });
  }
  const cloneRequest = event.request.clone();
  // Fetch first
  return fetch(event.request)
    .then(function (response) {
      if (response.ok) {
        const responseClone = response.clone();
        Promise.all([serialize(cloneRequest), serialize(responseClone)]).then(function (req_res) {
          const req = JSON.stringify(req_res[0]);
          const res = req_res[1];
          db.put(req, res);
        });
      } else if (response.status === 0 || response.status === 503) {
        ping();
        return serialize(cloneRequest).then(function (request) {
          request = JSON.stringify(request);
          return db.get(request)
            .then(deserialize)
            .catch((err) => {
              return new Response(OFFLINE_API_RESPONSE[fn], {headers: {'Content-Type': 'application/json'}});
            });
        });
      }
      return response;
    })
    // Network error
    .catch((err) => {
      ping();
      return new Response(OFFLINE_API_RESPONSE[fn], {headers: {'Content-Type': 'application/json'}});
    });
}

function handleAPIPut (event) {
  const url = new URL(event.request.url);
  const fn = url.pathname.split('/').pop();
  const cloneRequest = event.request.clone();
  // Fetch first
  return fetch(event.request)
    .then(function (response) {
      if (response.status === 0 || response.status === 503) {
        ping();
        return enqueueRequest(cloneRequest).then(function (queue) {
          console.log('Offline operation added to queue, queue length = ', queue.length);
          return new Response(OFFLINE_API_RESPONSE[fn], {headers: {'Content-Type': 'application/json'}});
        });
      }
      return response;
    })
    // Network error
    .catch(function (error) {
      ping();
      return enqueueRequest(cloneRequest).then(function (queue) {
        console.log('Offline operation added to queue, queue length = ', queue.length);
        return new Response(OFFLINE_API_RESPONSE[fn], {headers: {'Content-Type': 'application/json'}});
      });
    });
}

/**
 * Offline PUT queue
 * @param {Request} request
 * @return {Request}
 */
function enqueueRequest (request) {
  return serialize(request).then(function (serializedRequest) {
    return db.get('offline-queue').then(function (queue) {
      queue = queue || [];
      queue.push(serializedRequest);
      return db.put('offline-queue', queue);
    });
  });
}

/**
 * Flush offline PUT queue
 * @return {Promise<Number>}
 */
function flushQueue () {
  console.log('Flushing queue');
  return db.get('offline-queue')
    .then(function (queue) {
      if (queue && queue.length) {
        return queue.reduce(function (prom, request) {
          return prom.then(function () {
            return deserialize(request);
          }).then(function (req) {
            return fetch(req);
          });
        }, Promise.resolve()).then(function () {
          db.remove('offline-queue');
          return queue.length;
        });
      } else {
        return Promise.resolve(0);
      }
    })
    .then((queue_length) => console.log('Done, queue flushed', queue_length))
    .catch((error) => console.log('Error flushing queue', error));
}

/**
 * Serialize Request / Response
 * @param {Request|Response} subject
 * @return {JSON}
 */
function serialize (subject) {
  const headers = {};
  for (const entry of subject.headers.entries()) {
    headers[entry[0]] = entry[1];
  }
  let serialized;
  if (subject instanceof Request) {
    serialized = {
      url: subject.url,
      headers: headers,
      method: subject.method,
      mode: subject.mode,
      credentials: subject.credentials,
      cache: subject.cache,
      redirect: subject.redirect,
      referrer: subject.referrer,
    };
  } else {
    serialized = {
      url: subject.url,
      headers: headers,
      ok: subject.ok,
      redirected: subject.redirected,
      status: subject.status,
      statusText: subject.statusText,
      type: subject.type,
    };
  }
  return subject.text().then(function (body) {
    serialized.body = body;
    return serialized;
  });
}

/**
 * Deserialize Request / Response
 * @param {JSON} subject
 * @return {Request|Response}
 */
function deserialize (subject) {
  return subject.method ? new Request(subject.url, subject) : new Response(subject.body, subject);
}
