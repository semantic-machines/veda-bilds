"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var ServerBackend;
  function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
  return {
    setters: [],
    execute: function () {
      // Server backend
      ServerBackend = {};
      _export("default", ServerBackend);
      ServerBackend.status = 'limited';
      ServerBackend.get_rights = function (ticket, uri, user_id) {
        var arg = ticket;
        var isObj = _typeof(arg) === 'object';
        if (isObj) {
          ticket = arg.ticket;
          uri = arg.uri;
          user_id = arg.user_id;
        }
        try {
          var json = get_rights(ticket, uri, user_id);
          if (json) {
            return Promise.resolve(json);
          } else {
            return Promise.reject(Error('get_rights failed'));
          }
        } catch (err) {
          return Promise.reject(err);
        }
      };
      ServerBackend.query = function (ticket, queryStr, sort, databases, top, limit, from) {
        var arg = ticket;
        var isObj = _typeof(arg) === 'object';
        if (isObj) {
          ticket = arg.ticket;
          queryStr = arg.query;
          sort = arg.sort;
          databases = arg.databases;
          top = arg.top;
          limit = arg.limit;
          from = arg.from;
        }
        try {
          return Promise.resolve(query(ticket, queryStr, sort, databases, top, limit, from));
        } catch (err) {
          return Promise.reject(err);
        }
      };
      ServerBackend.get_individual = function (ticket, uri) {
        var arg = ticket;
        var isObj = _typeof(arg) === 'object';
        if (isObj) {
          ticket = arg.ticket;
          uri = arg.uri;
        }
        try {
          var json = get_individual(ticket, uri);
          if (json) {
            return Promise.resolve(json);
          } else {
            return Promise.reject(Error('Not found'));
          }
        } catch (err) {
          return Promise.reject(err);
        }
      };
      ServerBackend.get_individuals = function (ticket, uris) {
        var arg = ticket;
        var isObj = _typeof(arg) === 'object';
        if (isObj) {
          ticket = arg.ticket;
          uris = arg.uris;
        }
        try {
          return Promise.resolve(get_individuals(ticket, uris));
        } catch (err) {
          return Promise.reject(err);
        }
      };
      ServerBackend.remove_individual = function (ticket, uri) {
        var arg = ticket;
        var isObj = _typeof(arg) === 'object';
        if (isObj) {
          ticket = arg.ticket;
          uri = arg.uri;
        }
        try {
          return Promise.resolve(remove_individual(ticket, uri));
        } catch (err) {
          return Promise.reject(err);
        }
      };
      ServerBackend.put_individual = function (ticket, individual) {
        var arg = ticket;
        var isObj = _typeof(arg) === 'object';
        if (isObj) {
          ticket = arg.ticket;
          individual = arg.individual;
        }
        try {
          return Promise.resolve(put_individual(ticket, individual));
        } catch (err) {
          return Promise.reject(err);
        }
      };
      ServerBackend.add_to_individual = function (ticket, individual) {
        var arg = ticket;
        var isObj = _typeof(arg) === 'object';
        if (isObj) {
          ticket = arg.ticket;
          individual = arg.individual;
        }
        try {
          return Promise.resolve(add_to_individual(ticket, individual));
        } catch (err) {
          return Promise.reject(err);
        }
      };
      ServerBackend.set_in_individual = function (ticket, individual) {
        var arg = ticket;
        var isObj = _typeof(arg) === 'object';
        if (isObj) {
          ticket = arg.ticket;
          individual = arg.individual;
        }
        try {
          return Promise.resolve(set_in_individual(ticket, individual));
        } catch (err) {
          return Promise.reject(err);
        }
      };
      ServerBackend.remove_from_individual = function (ticket, individual) {
        var arg = ticket;
        var isObj = _typeof(arg) === 'object';
        if (isObj) {
          ticket = arg.ticket;
          individual = arg.individual;
        }
        try {
          return Promise.resolve(remove_from_individual(ticket, individual));
        } catch (err) {
          return Promise.reject(err);
        }
      };
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTZXJ2ZXJCYWNrZW5kIiwiX2V4cG9ydCIsInN0YXR1cyIsImdldF9yaWdodHMiLCJ0aWNrZXQiLCJ1cmkiLCJ1c2VyX2lkIiwiYXJnIiwiaXNPYmoiLCJfdHlwZW9mIiwianNvbiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiRXJyb3IiLCJlcnIiLCJxdWVyeSIsInF1ZXJ5U3RyIiwic29ydCIsImRhdGFiYXNlcyIsInRvcCIsImxpbWl0IiwiZnJvbSIsImdldF9pbmRpdmlkdWFsIiwiZ2V0X2luZGl2aWR1YWxzIiwidXJpcyIsInJlbW92ZV9pbmRpdmlkdWFsIiwicHV0X2luZGl2aWR1YWwiLCJpbmRpdmlkdWFsIiwiYWRkX3RvX2luZGl2aWR1YWwiLCJzZXRfaW5faW5kaXZpZHVhbCIsInJlbW92ZV9mcm9tX2luZGl2aWR1YWwiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zb3VyY2Utd2ViL2pzL2NvbW1vbi9iYWNrZW5kX3NlcnZlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTZXJ2ZXIgYmFja2VuZFxuXG5jb25zdCBTZXJ2ZXJCYWNrZW5kID0ge307XG5cbmV4cG9ydCBkZWZhdWx0IFNlcnZlckJhY2tlbmQ7XG5cblNlcnZlckJhY2tlbmQuc3RhdHVzID0gJ2xpbWl0ZWQnO1xuXG5TZXJ2ZXJCYWNrZW5kLmdldF9yaWdodHMgPSBmdW5jdGlvbiAodGlja2V0LCB1cmksIHVzZXJfaWQpIHtcbiAgY29uc3QgYXJnID0gdGlja2V0O1xuICBjb25zdCBpc09iaiA9IHR5cGVvZiBhcmcgPT09ICdvYmplY3QnO1xuICBpZiAoaXNPYmopIHtcbiAgICB0aWNrZXQgPSBhcmcudGlja2V0O1xuICAgIHVyaSA9IGFyZy51cmk7XG4gICAgdXNlcl9pZCA9IGFyZy51c2VyX2lkO1xuICB9XG4gIHRyeSB7XG4gICAgY29uc3QganNvbiA9IGdldF9yaWdodHModGlja2V0LCB1cmksIHVzZXJfaWQpO1xuICAgIGlmIChqc29uKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGpzb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3IoJ2dldF9yaWdodHMgZmFpbGVkJykpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gIH1cbn07XG5cblNlcnZlckJhY2tlbmQucXVlcnkgPSBmdW5jdGlvbiAodGlja2V0LCBxdWVyeVN0ciwgc29ydCwgZGF0YWJhc2VzLCB0b3AsIGxpbWl0LCBmcm9tKSB7XG4gIGNvbnN0IGFyZyA9IHRpY2tldDtcbiAgY29uc3QgaXNPYmogPSB0eXBlb2YgYXJnID09PSAnb2JqZWN0JztcbiAgaWYgKGlzT2JqKSB7XG4gICAgdGlja2V0ID0gYXJnLnRpY2tldDtcbiAgICBxdWVyeVN0ciA9IGFyZy5xdWVyeTtcbiAgICBzb3J0ID0gYXJnLnNvcnQ7XG4gICAgZGF0YWJhc2VzID0gYXJnLmRhdGFiYXNlcztcbiAgICB0b3AgPSBhcmcudG9wO1xuICAgIGxpbWl0ID0gYXJnLmxpbWl0O1xuICAgIGZyb20gPSBhcmcuZnJvbTtcbiAgfVxuICB0cnkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoIHF1ZXJ5KHRpY2tldCwgcXVlcnlTdHIsIHNvcnQsIGRhdGFiYXNlcywgdG9wLCBsaW1pdCwgZnJvbSkgKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gIH1cbn07XG5cblNlcnZlckJhY2tlbmQuZ2V0X2luZGl2aWR1YWwgPSBmdW5jdGlvbiAodGlja2V0LCB1cmkpIHtcbiAgY29uc3QgYXJnID0gdGlja2V0O1xuICBjb25zdCBpc09iaiA9IHR5cGVvZiBhcmcgPT09ICdvYmplY3QnO1xuICBpZiAoaXNPYmopIHtcbiAgICB0aWNrZXQgPSBhcmcudGlja2V0O1xuICAgIHVyaSA9IGFyZy51cmk7XG4gIH1cbiAgdHJ5IHtcbiAgICBjb25zdCBqc29uID0gZ2V0X2luZGl2aWR1YWwodGlja2V0LCB1cmkpO1xuICAgIGlmIChqc29uKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGpzb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3IoJ05vdCBmb3VuZCcpKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICB9XG59O1xuXG5TZXJ2ZXJCYWNrZW5kLmdldF9pbmRpdmlkdWFscyA9IGZ1bmN0aW9uICh0aWNrZXQsIHVyaXMpIHtcbiAgY29uc3QgYXJnID0gdGlja2V0O1xuICBjb25zdCBpc09iaiA9IHR5cGVvZiBhcmcgPT09ICdvYmplY3QnO1xuICBpZiAoaXNPYmopIHtcbiAgICB0aWNrZXQgPSBhcmcudGlja2V0O1xuICAgIHVyaXMgPSBhcmcudXJpcztcbiAgfVxuICB0cnkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoIGdldF9pbmRpdmlkdWFscyh0aWNrZXQsIHVyaXMpICk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICB9XG59O1xuXG5TZXJ2ZXJCYWNrZW5kLnJlbW92ZV9pbmRpdmlkdWFsID0gZnVuY3Rpb24gKHRpY2tldCwgdXJpKSB7XG4gIGNvbnN0IGFyZyA9IHRpY2tldDtcbiAgY29uc3QgaXNPYmogPSB0eXBlb2YgYXJnID09PSAnb2JqZWN0JztcbiAgaWYgKGlzT2JqKSB7XG4gICAgdGlja2V0ID0gYXJnLnRpY2tldDtcbiAgICB1cmkgPSBhcmcudXJpO1xuICB9XG4gIHRyeSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggcmVtb3ZlX2luZGl2aWR1YWwodGlja2V0LCB1cmkpICk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICB9XG59O1xuXG5TZXJ2ZXJCYWNrZW5kLnB1dF9pbmRpdmlkdWFsID0gZnVuY3Rpb24gKHRpY2tldCwgaW5kaXZpZHVhbCkge1xuICBjb25zdCBhcmcgPSB0aWNrZXQ7XG4gIGNvbnN0IGlzT2JqID0gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCc7XG4gIGlmIChpc09iaikge1xuICAgIHRpY2tldCA9IGFyZy50aWNrZXQ7XG4gICAgaW5kaXZpZHVhbCA9IGFyZy5pbmRpdmlkdWFsO1xuICB9XG4gIHRyeSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggcHV0X2luZGl2aWR1YWwodGlja2V0LCBpbmRpdmlkdWFsKSApO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgfVxufTtcblxuU2VydmVyQmFja2VuZC5hZGRfdG9faW5kaXZpZHVhbCA9IGZ1bmN0aW9uICh0aWNrZXQsIGluZGl2aWR1YWwpIHtcbiAgY29uc3QgYXJnID0gdGlja2V0O1xuICBjb25zdCBpc09iaiA9IHR5cGVvZiBhcmcgPT09ICdvYmplY3QnO1xuICBpZiAoaXNPYmopIHtcbiAgICB0aWNrZXQgPSBhcmcudGlja2V0O1xuICAgIGluZGl2aWR1YWwgPSBhcmcuaW5kaXZpZHVhbDtcbiAgfVxuICB0cnkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoIGFkZF90b19pbmRpdmlkdWFsKHRpY2tldCwgaW5kaXZpZHVhbCkgKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gIH1cbn07XG5cblNlcnZlckJhY2tlbmQuc2V0X2luX2luZGl2aWR1YWwgPSBmdW5jdGlvbiAodGlja2V0LCBpbmRpdmlkdWFsKSB7XG4gIGNvbnN0IGFyZyA9IHRpY2tldDtcbiAgY29uc3QgaXNPYmogPSB0eXBlb2YgYXJnID09PSAnb2JqZWN0JztcbiAgaWYgKGlzT2JqKSB7XG4gICAgdGlja2V0ID0gYXJnLnRpY2tldDtcbiAgICBpbmRpdmlkdWFsID0gYXJnLmluZGl2aWR1YWw7XG4gIH1cbiAgdHJ5IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCBzZXRfaW5faW5kaXZpZHVhbCh0aWNrZXQsIGluZGl2aWR1YWwpICk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICB9XG59O1xuXG5TZXJ2ZXJCYWNrZW5kLnJlbW92ZV9mcm9tX2luZGl2aWR1YWwgPSBmdW5jdGlvbiAodGlja2V0LCBpbmRpdmlkdWFsKSB7XG4gIGNvbnN0IGFyZyA9IHRpY2tldDtcbiAgY29uc3QgaXNPYmogPSB0eXBlb2YgYXJnID09PSAnb2JqZWN0JztcbiAgaWYgKGlzT2JqKSB7XG4gICAgdGlja2V0ID0gYXJnLnRpY2tldDtcbiAgICBpbmRpdmlkdWFsID0gYXJnLmluZGl2aWR1YWw7XG4gIH1cbiAgdHJ5IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCByZW1vdmVfZnJvbV9pbmRpdmlkdWFsKHRpY2tldCwgaW5kaXZpZHVhbCkgKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gIH1cbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7TUFBQTtNQUVNQSxhQUFhLEdBQUcsQ0FBQyxDQUFDO01BQUFDLE9BQUEsWUFFVEQsYUFBYTtNQUU1QkEsYUFBYSxDQUFDRSxNQUFNLEdBQUcsU0FBUztNQUVoQ0YsYUFBYSxDQUFDRyxVQUFVLEdBQUcsVUFBVUMsTUFBTSxFQUFFQyxHQUFHLEVBQUVDLE9BQU8sRUFBRTtRQUN6RCxJQUFNQyxHQUFHLEdBQUdILE1BQU07UUFDbEIsSUFBTUksS0FBSyxHQUFHQyxPQUFBLENBQU9GLEdBQUcsTUFBSyxRQUFRO1FBQ3JDLElBQUlDLEtBQUssRUFBRTtVQUNUSixNQUFNLEdBQUdHLEdBQUcsQ0FBQ0gsTUFBTTtVQUNuQkMsR0FBRyxHQUFHRSxHQUFHLENBQUNGLEdBQUc7VUFDYkMsT0FBTyxHQUFHQyxHQUFHLENBQUNELE9BQU87UUFDdkI7UUFDQSxJQUFJO1VBQ0YsSUFBTUksSUFBSSxHQUFHUCxV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