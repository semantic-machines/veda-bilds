"use strict";

System.register(["../common/backend_server.js", "../browser/backend_browser.js"], function (_export, _context) {
  "use strict";

  var ServerBackend, BrowserBackend;
  return {
    setters: [function (_commonBackend_serverJs) {
      ServerBackend = _commonBackend_serverJs.default;
    }, function (_browserBackend_browserJs) {
      BrowserBackend = _browserBackend_browserJs.default;
    }],
    execute: function () {
      // Backend
      _export("default", typeof window === 'undefined' && typeof process === 'undefined' ? ServerBackend : BrowserBackend);
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTZXJ2ZXJCYWNrZW5kIiwiX2NvbW1vbkJhY2tlbmRfc2VydmVySnMiLCJkZWZhdWx0IiwiX2Jyb3dzZXJCYWNrZW5kX2Jyb3dzZXJKcyIsIkJyb3dzZXJCYWNrZW5kIiwiZXhlY3V0ZSIsIl9leHBvcnQiLCJ3aW5kb3ciLCJwcm9jZXNzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc291cmNlLXdlYi9qcy9jb21tb24vYmFja2VuZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBCYWNrZW5kXG5cbmltcG9ydCBTZXJ2ZXJCYWNrZW5kIGZyb20gJy4uL2NvbW1vbi9iYWNrZW5kX3NlcnZlci5qcyc7XG5pbXBvcnQgQnJvd3NlckJhY2tlbmQgZnJvbSAnLi4vYnJvd3Nlci9iYWNrZW5kX2Jyb3dzZXIuanMnO1xuXG5leHBvcnQgZGVmYXVsdCAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHByb2Nlc3MgPT09ICd1bmRlZmluZWQnID8gU2VydmVyQmFja2VuZCA6IEJyb3dzZXJCYWNrZW5kKTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7TUFFT0EsYUFBYSxHQUFBQyx1QkFBQSxDQUFBQyxPQUFBO0lBQUEsYUFBQUMseUJBQUE7TUFDYkMsY0FBYyxHQUFBRCx5QkFBQSxDQUFBRCxPQUFBO0lBQUE7SUFBQUcsT0FBQSxXQUFBQSxDQUFBO01BSHJCO01BQUFDLE9BQUEsWUFLZ0IsT0FBT0MsTUFBTSxLQUFLLFdBQVcsSUFBSSxPQUFPQyxPQUFPLEtBQUssV0FBVyxHQUFHUixhQUFhLEdBQUdJLGNBQWM7SUFBQTtFQUFBO0FBQUEifQ==