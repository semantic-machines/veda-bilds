"use strict";

System.register(["../browser/backend_error.js"], function (_export, _context) {
  "use strict";

  var BackendError, BrowserBackend;
  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
  function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function () { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function (obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function (skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function () { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function (exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function (type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function (record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function (finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function (tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function (iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
  function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  /**
   * Make a server request using the provided parameters.
   * @param {object} params - The parameters for the server request.
   * @param {string} params.url - The URL of the server endpoint.
   * @param {string} params.method - The HTTP method for the request.
   * @param {object} params.data - The data to be sent with the request.
   * @param {string} params.ticket - The ticket associated with the request.
   * @return {Promise<object>} A Promise that resolves to the JSON response from the server.
   * @throws {BackendError} If the server response status is not okay.
   */
  function call_server(_x61) {
    return _call_server.apply(this, arguments);
  }
  /**
   * Wait for a specified amount of time.
   * @param {number} [ms=1000] - The time to wait in milliseconds. Default is 1000ms (1 second).
   * @return {Promise<void>} A Promise that resolves after the specified time has elapsed.
   */
  function _call_server() {
    _call_server = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(params) {
      var url, response;
      return _regeneratorRuntime().wrap(function _callee19$(_context20) {
        while (1) switch (_context20.prev = _context20.next) {
          case 0:
            url = new URL(params.url, location.origin);
            if (params.method === 'GET') {
              params.data = params.data && Object.entries(params.data).filter(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 2),
                  _ = _ref2[0],
                  value = _ref2[1];
                return typeof value !== 'undefined';
              }) || '';
              url.search = new URLSearchParams(params.data).toString();
            }
            if (params.ticket) {
              url.searchParams.append('ticket', params.ticket);
            }
            _context20.next = 5;
            return fetch(url, _objectSpread({
              method: params.method,
              mode: 'same-origin',
              cache: 'no-cache',
              credentials: 'same-origin'
            }, params.method !== 'GET' && {
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(params.data)
            }));
          case 5:
            response = _context20.sent;
            if (!response.ok) {
              _context20.next = 8;
              break;
            }
            return _context20.abrupt("return", response.json());
          case 8:
            throw new BackendError(response.status);
          case 9:
          case "end":
            return _context20.stop();
        }
      }, _callee19);
    }));
    return _call_server.apply(this, arguments);
  }
  function wait() {
    var ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
    return new Promise(function (resolve) {
      return setTimeout(resolve, ms);
    });
  }

  /**
   * Adjust the ticket response to a standardized format.
   * @param {object} result - The ticket response from the server.
   * @return {object} The adjusted ticket object with standardized properties.
   */
  function adjustTicket(result) {
    return {
      ticket: result.id,
      user_uri: result.user_uri,
      end_time: Math.floor((result.end_time - 621355968000000000) / 10000)
    };
  }
  return {
    setters: [function (_browserBackend_errorJs) {
      BackendError = _browserBackend_errorJs.default;
    }],
    execute: function () {
      /**
       * Class representing the backend for browser interactions.
       */
      _export("default", BrowserBackend = /*#__PURE__*/function () {
        function BrowserBackend() {
          _classCallCheck(this, BrowserBackend);
        }
        _createClass(BrowserBackend, null, [{
          key: "get_rights",
          value:
          /**
           * Get rights for a specific ticket, URI, and user ID.
           * @param {string|object} ticket - The ticket or an object with the "ticket" property.
           * @param {string} uri - The URI for which to get the rights.
           * @param {string} user_id - The user ID for which to get the rights.
           * @return {Promise} A Promise that resolves to the server response.
           */
          function () {
            var _get_rights = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(ticket, uri, user_id) {
              var arg, isObj, params;
              return _regeneratorRuntime().wrap(function _callee$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    arg = ticket;
                    isObj = _typeof(arg) === 'object';
                    params = {
                      method: 'GET',
                      url: '/get_rights',
                      ticket: isObj ? arg.ticket : ticket,
                      data: {
                        'uri': isObj ? arg.uri : uri,
                        'user_id': isObj ? arg.user_id : user_id
                      }
                    };
                    return _context2.abrupt("return", call_server(params));
                  case 4:
                  case "end":
                    return _context2.stop();
                }
              }, _callee);
            }));
            function get_rights(_x, _x2, _x3) {
              return _get_rights.apply(this, arguments);
            }
            return get_rights;
          }()
          /**
           * Get rights origin for a specific ticket and URI.
           * @param {string|object} ticket - The ticket or an object with the "ticket" property.
           * @param {string} uri - The URI for which to get the rights origin.
           * @return {Promise} A Promise that resolves to the server response.
           */
        }, {
          key: "get_rights_origin",
          value: function () {
            var _get_rights_origin = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(ticket, uri) {
              var arg, isObj, params;
              return _regeneratorRuntime().wrap(function _callee2$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    arg = ticket;
                    isObj = _typeof(arg) === 'object';
                    params = {
                      method: 'GET',
                      url: '/get_rights_origin',
                      ticket: isObj ? arg.ticket : ticket,
                      data: {
                        'uri': isObj ? arg.uri : uri
                      }
                    };
                    return _context3.abrupt("return", call_server(params));
                  case 4:
                  case "end":
                    return _context3.stop();
                }
              }, _callee2);
            }));
            function get_rights_origin(_x4, _x5) {
              return _get_rights_origin.apply(this, arguments);
            }
            return get_rights_origin;
          }()
          /**
           * Get the membership information for a specific ticket and URI.
           * @param {string|object} ticket - The ticket or an object with the "ticket" property.
           * @param {string} uri - The URI for which to get the membership information.
           * @return {Promise<object>} A Promise that resolves to the server response containing the membership information.
           *
           * Example server response:
           * {
           *   "@": "_",
           *   "rdf:type": [
           *     {"data":"v-s:Membership","type":"Uri"}
           *   ],
           *   "v-s:memberOf": [
           *     {"data":"v-s:AllResourcesGroup","type":"Uri"},
           *     {"data":"cfg:VedaSystem","type":"Uri"},
           *     {"data":"cfg:SuperUser","type":"Uri"}
           *   ],
           *   "v-s:resource": [
           *     {"data":"cfg:VedaSystem","type":"Uri"}
           *   ]
           * }
           */
        }, {
          key: "get_membership",
          value: function () {
            var _get_membership = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(ticket, uri) {
              var arg, isObj, params;
              return _regeneratorRuntime().wrap(function _callee3$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    arg = ticket;
                    isObj = _typeof(arg) === 'object';
                    params = {
                      method: 'GET',
                      url: '/get_membership',
                      ticket: isObj ? arg.ticket : ticket,
                      data: {
                        'uri': isObj ? arg.uri : uri
                      }
                    };
                    return _context4.abrupt("return", call_server(params));
                  case 4:
                  case "end":
                    return _context4.stop();
                }
              }, _callee3);
            }));
            function get_membership(_x6, _x7) {
              return _get_membership.apply(this, arguments);
            }
            return get_membership;
          }()
          /**
           * Authenticate the user with the provided login, password, and secret.
           * @param {string|object} login - The login or an object with the "login" property.
           * @param {string} password - The password of the user.
           * @param {string} secret - The secret associated with the user.
           * @return {Promise<object>} A Promise that resolves to the server response.
           *
           * The server response object will have the following properties:
           * - ticket: The ID of the ticket.
           * - user_uri: The URI of the authenticated user.
           * - end_time: The adjusted end time of the ticket in milliseconds since January 1, 1970 (UNIX timestamp).
           */
        }, {
          key: "authenticate",
          value: function () {
            var _authenticate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(login, password, secret) {
              var arg, isObj, params;
              return _regeneratorRuntime().wrap(function _callee4$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    arg = login;
                    isObj = _typeof(arg) === 'object';
                    params = {
                      method: 'POST',
                      url: '/authenticate',
                      data: {
                        'login': isObj ? arg.login : login,
                        'password': isObj ? arg.password : password,
                        'secret': isObj ? arg.secret : secret
                      }
                    };
                    return _context5.abrupt("return", call_server(params).then(adjustTicket));
                  case 4:
                  case "end":
                    return _context5.stop();
                }
              }, _callee4);
            }));
            function authenticate(_x8, _x9, _x10) {
              return _authenticate.apply(this, arguments);
            }
            return authenticate;
          }()
          /**
           * Get a ticket in a trusted manner. Useful to get a new ticket for the current user to prolongate a session.
           * @param {string|object} ticket - The ticket or an object with the "ticket" property.
           * @param {string} login - The login for which to get the trusted ticket.
           * @return {Promise<object>} A Promise that resolves to the server response.
           *
           * The server response object will have the following properties:
           * - ticket: The ID of the trusted ticket.
           * - user_uri: The URI of the trusted user.
           * - end_time: The adjusted end time of the trusted ticket in milliseconds since January 1, 1970 (UNIX timestamp).
           */
        }, {
          key: "get_ticket_trusted",
          value: function () {
            var _get_ticket_trusted = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(ticket, login) {
              var arg, isObj, params;
              return _regeneratorRuntime().wrap(function _callee5$(_context6) {
                while (1) switch (_context6.prev = _context6.next) {
                  case 0:
                    arg = ticket;
                    isObj = _typeof(arg) === 'object';
                    params = {
                      method: 'GET',
                      url: '/get_ticket_trusted',
                      ticket: isObj ? arg.ticket : ticket,
                      data: {
                        'login': isObj ? arg.login : login
                      }
                    };
                    return _context6.abrupt("return", call_server(params).then(adjustTicket));
                  case 4:
                  case "end":
                    return _context6.stop();
                }
              }, _callee5);
            }));
            function get_ticket_trusted(_x11, _x12) {
              return _get_ticket_trusted.apply(this, arguments);
            }
            return get_ticket_trusted;
          }()
          /**
           * Check if a ticket is valid.
           * @param {string|object} ticket - The ticket or an object with the "ticket" property.
           * @return {Promise<boolean>} A Promise that resolves to true if the ticket is valid, or false otherwise.
           */
        }, {
          key: "is_ticket_valid",
          value: function () {
            var _is_ticket_valid = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(ticket) {
              var arg, isObj, params;
              return _regeneratorRuntime().wrap(function _callee6$(_context7) {
                while (1) switch (_context7.prev = _context7.next) {
                  case 0:
                    arg = ticket;
                    isObj = _typeof(arg) === 'object';
                    params = {
                      method: 'GET',
                      url: '/is_ticket_valid',
                      ticket: isObj ? arg.ticket : ticket,
                      data: {}
                    };
                    return _context7.abrupt("return", call_server(params));
                  case 4:
                  case "end":
                    return _context7.stop();
                }
              }, _callee6);
            }));
            function is_ticket_valid(_x13) {
              return _is_ticket_valid.apply(this, arguments);
            }
            return is_ticket_valid;
          }()
          /**
           * Logout the user with the provided ticket.
           * @param {string|object} ticket - The ticket or an object with the "ticket" property.
           * @return {Promise} A Promise that resolves to the server response.
           */
        }, {
          key: "logout",
          value: function () {
            var _logout = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(ticket) {
              var arg, isObj, params;
              return _regeneratorRuntime().wrap(function _callee7$(_context8) {
                while (1) switch (_context8.prev = _context8.next) {
                  case 0:
                    arg = ticket;
                    isObj = _typeof(arg) === 'object';
                    params = {
                      method: 'GET',
                      url: '/logout',
                      ticket: isObj ? arg.ticket : ticket,
                      data: {}
                    };
                    return _context8.abrupt("return", call_server(params));
                  case 4:
                  case "end":
                    return _context8.stop();
                }
              }, _callee7);
            }));
            function logout(_x14) {
              return _logout.apply(this, arguments);
            }
            return logout;
          }()
          /**
           * Get the state of an operation for a specific module ID.
           * @param {string|object} module_id - The module ID or an object with the "module_id" property.
           * @param {string} wait_op_id - The operation ID to check.
           * @return {Promise<number>} A Promise that resolves to a number of last operation id processed by a module.
           */
        }, {
          key: "get_operation_state",
          value: function () {
            var _get_operation_state = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(module_id, wait_op_id) {
              var arg, isObj, params;
              return _regeneratorRuntime().wrap(function _callee8$(_context9) {
                while (1) switch (_context9.prev = _context9.next) {
                  case 0:
                    arg = module_id;
                    isObj = _typeof(arg) === 'object';
                    params = {
                      method: 'GET',
                      url: '/get_operation_state',
                      data: {
                        'module_id': isObj ? arg.module_id : module_id,
                        'wait_op_id': isObj ? arg.wait_op_id : wait_op_id
                      }
                    };
                    return _context9.abrupt("return", call_server(params));
                  case 4:
                  case "end":
                    return _context9.stop();
                }
              }, _callee8);
            }));
            function get_operation_state(_x15, _x16) {
              return _get_operation_state.apply(this, arguments);
            }
            return get_operation_state;
          }()
          /**
           * Wait for an operation to complete for a specific module ID and operation ID.
           * @param {string|object} module_id - The module ID or an object with the "module_id" property.
           * @param {string} op_id - The ID of the operation to wait for.
           * @param {number} __maxCalls - (Optional) The maximum number of recursive calls to make while waiting for the operation.
           *   The default value is 10.
           * @return {Promise<boolean>} A Promise that resolves to true if the operation completes successfully, or false if the maximum number of calls is reached.
           */
        }, {
          key: "wait_module",
          value: function () {
            var _wait_module = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(module_id, op_id) {
              var __maxCalls,
                arg,
                isObj,
                _args9 = arguments;
              return _regeneratorRuntime().wrap(function _callee9$(_context10) {
                while (1) switch (_context10.prev = _context10.next) {
                  case 0:
                    __maxCalls = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : 10;
                    if (__maxCalls) {
                      _context10.next = 3;
                      break;
                    }
                    return _context10.abrupt("return", Promise.resolve(false));
                  case 3:
                    arg = module_id;
                    isObj = _typeof(arg) === 'object';
                    module_id = isObj ? arg.module_id : module_id;
                    op_id = isObj ? arg.op_id : op_id;
                    return _context10.abrupt("return", wait(250 * (10 - __maxCalls)).then(function () {
                      return BrowserBackend.get_operation_state(module_id, op_id);
                    }).then(function (module_op_id) {
                      return module_op_id < op_id ? BrowserBackend.wait_module(module_id, op_id, --__maxCalls) : true;
                    }));
                  case 8:
                  case "end":
                    return _context10.stop();
                }
              }, _callee9);
            }));
            function wait_module(_x17, _x18) {
              return _wait_module.apply(this, arguments);
            }
            return wait_module;
          }()
          /**
           * Perform a query operation using the provided parameters.
           * @param {string|object} ticket - The ticket or an object with the "ticket" property.
           * @param {string} queryStr - The query string to execute.
           * @param {string} sort - The sort order for the query.
           * @param {string} databases - The databases to search in.
           * @param {number} top - The number of documents to return.
           * @param {number} limit - The maximum number of results to retrieve.
           * @param {number} from - The starting index for the query results.
           * @param {string} sql - The SQL expression to execute.
           * @param {number} tries - (Optional) The maximum number of retry attempts in case of a 999 error response code from the server.
           *   The default value is 10.
           * @return {Promise<object>} A Promise that resolves to the server response for the query operation.
           * @throws {BackendError} Throws a BackendError with a 429 status code if the maximum number of retry attempts is reached.
           */
        }, {
          key: "query",
          value: function () {
            var _query = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(ticket, queryStr, sort, databases, top, limit, from, sql) {
              var tries,
                arg,
                isObj,
                params,
                _args10 = arguments;
              return _regeneratorRuntime().wrap(function _callee10$(_context11) {
                while (1) switch (_context11.prev = _context11.next) {
                  case 0:
                    tries = _args10.length > 8 && _args10[8] !== undefined ? _args10[8] : 10;
                    if (tries) {
                      _context11.next = 3;
                      break;
                    }
                    throw new BackendError(429);
                  case 3:
                    arg = ticket;
                    isObj = _typeof(arg) === 'object';
                    params = {
                      method: 'POST',
                      url: '/query',
                      ticket: isObj ? arg.ticket : ticket,
                      data: {
                        'query': isObj ? arg.query : queryStr,
                        'sort': isObj ? arg.sort : sort,
                        'databases': isObj ? arg.databases : databases,
                        'top': isObj ? arg.top : top,
                        'limit': isObj ? arg.limit : limit,
                        'from': isObj ? arg.from : from,
                        'sql': isObj ? arg.sql : sql
                      }
                    };
                    return _context11.abrupt("return", call_server(params).catch(function (backendError) {
                      if (backendError.code === 999) {
                        return wait().then(function () {
                          return BrowserBackend.query(ticket, queryStr, sort, databases, top, limit, from, sql, --tries);
                        });
                      }
                      throw backendError;
                    }));
                  case 7:
                  case "end":
                    return _context11.stop();
                }
              }, _callee10);
            }));
            function query(_x19, _x20, _x21, _x22, _x23, _x24, _x25, _x26) {
              return _query.apply(this, arguments);
            }
            return query;
          }()
          /**
           * Get the an individual object with the specified URI.
           * @param {string|object} ticket - The ticket or an object with the "ticket" property.
           * @param {string} uri - The URI of the individual to retrieve information for.
           * @param {boolean} cache - (Optional) Indicates whether to use cached data or fetch fresh data from the server.
           *   The default value is true.
           * @return {Promise<object>} A Promise that resolves to the server response containing the individual object.
           *
           * Example server response:
           * {
           *   "@": "cfg:VedaSystem",
           *   "rdf:type": [
           *     {"data":"v-s:Person","type":"Uri"}
           *   ],
           *   "rdfs:isDefinedBy": [
           *     {"data":"http://semantic-machines.com/veda/system-account","type":"Uri"}
           *   ],
           *   "rdfs:label": [
           *     {"data":"Система","lang":"RU","type":"String"},
           *     {"data":"System","lang":"EN","type":"String"}
           *   ],
           *   ...
           * }
           */
        }, {
          key: "get_individual",
          value: function () {
            var _get_individual = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(ticket, uri) {
              var cache,
                arg,
                isObj,
                params,
                _args11 = arguments;
              return _regeneratorRuntime().wrap(function _callee11$(_context12) {
                while (1) switch (_context12.prev = _context12.next) {
                  case 0:
                    cache = _args11.length > 2 && _args11[2] !== undefined ? _args11[2] : true;
                    arg = ticket;
                    isObj = _typeof(arg) === 'object';
                    params = {
                      method: 'GET',
                      url: '/get_individual',
                      ticket: isObj ? arg.ticket : ticket,
                      data: _objectSpread({
                        'uri': isObj ? arg.uri : uri
                      }, !cache && {
                        'vsn': Date.now()
                      })
                    };
                    return _context12.abrupt("return", call_server(params));
                  case 5:
                  case "end":
                    return _context12.stop();
                }
              }, _callee11);
            }));
            function get_individual(_x27, _x28) {
              return _get_individual.apply(this, arguments);
            }
            return get_individual;
          }()
          /**
           * Get multiple individuals objects with the specified URIs.
           * @param {string|object} ticket - The ticket or an object with the "ticket" property.
           * @param {string[]} uris - An array of URIs of the individuals to retrieve.
           * @return {Promise<object[]>} A Promise that resolves to an array of the requested individuals.
           *
           * Example server response for multiple individuals:
           * [
           *   {
           *     "@": "cfg:VedaSystem",
           *     "rdf:type": [
           *       {"data":"v-s:Person","type":"Uri"}
           *     ],
           *     "rdfs:isDefinedBy": [
           *       {"data":"http://semantic-machines.com/veda/system-account","type":"Uri"}
           *     ],
           *     "rdfs:label": [
           *       {"data":"Система","lang":"RU","type":"String"},
           *       {"data":"System","lang":"EN","type":"String"}
           *     ],
           *     // Other properties specific to the individual
           *   },
           *   // Other individuals
           * ]
           */
        }, {
          key: "get_individuals",
          value: function () {
            var _get_individuals = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(ticket, uris) {
              var arg, isObj, params;
              return _regeneratorRuntime().wrap(function _callee12$(_context13) {
                while (1) switch (_context13.prev = _context13.next) {
                  case 0:
                    arg = ticket;
                    isObj = _typeof(arg) === 'object';
                    params = {
                      method: 'POST',
                      url: '/get_individuals',
                      ticket: isObj ? arg.ticket : ticket,
                      data: {
                        'uris': isObj ? arg.uris : uris
                      }
                    };
                    return _context13.abrupt("return", call_server(params));
                  case 4:
                  case "end":
                    return _context13.stop();
                }
              }, _callee12);
            }));
            function get_individuals(_x29, _x30) {
              return _get_individuals.apply(this, arguments);
            }
            return get_individuals;
          }()
          /**
           * Remove an individual with the specified URI.
           * @param {string|object} ticket - The ticket or an object with the "ticket" property.
           * @param {string} uri - The URI of the individual to remove.
           * @param {number} assigned_subsystems - (Optional) The number of assigned subsystems. Default is 0.
           * @param {string} event_id - (Optional) The ID of the event associated with the removal. Default is an empty string.
           * @param {string} transaction_id - (Optional) The ID of the transaction associated with the removal. Default is an empty string.
           * @return {Promise<object>} A Promise that resolves to an object with the operation ID and result of the removal.
           *
           * The resolved object will have the following properties:
           * - op_id: The ID of the operation for the removal.
           * - result: The result status code of the removal operation.
           *
           * Example resolved object:
           * {
           *   "op_id":
           *   "result": 200
           * }
           */
        }, {
          key: "remove_individual",
          value: function () {
            var _remove_individual = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(ticket, uri, assigned_subsystems, event_id, transaction_id) {
              var arg, isObj, params;
              return _regeneratorRuntime().wrap(function _callee13$(_context14) {
                while (1) switch (_context14.prev = _context14.next) {
                  case 0:
                    arg = ticket;
                    isObj = _typeof(arg) === 'object';
                    params = {
                      method: 'PUT',
                      url: '/remove_individual',
                      ticket: isObj ? arg.ticket : ticket,
                      data: {
                        'uri': isObj ? arg.uri : uri,
                        'assigned_subsystems': (isObj ? arg.assigned_subsystems : assigned_subsystems) || 0,
                        'prepare_events': true,
                        'event_id': (isObj ? arg.event_id : event_id) || '',
                        'transaction_id': (isObj ? arg.transaction_id : transaction_id) || ''
                      }
                    };
                    return _context14.abrupt("return", call_server(params));
                  case 4:
                  case "end":
                    return _context14.stop();
                }
              }, _callee13);
            }));
            function remove_individual(_x31, _x32, _x33, _x34, _x35) {
              return _remove_individual.apply(this, arguments);
            }
            return remove_individual;
          }()
          /**
           * Modify or create an individual in the database using the provided individual data.
           * @param {string|object} ticket - The ticket or an object with the "ticket" property.
           * @param {object} individual - The individual object to modify or create.
           * @param {number} assigned_subsystems - (Optional) The number of assigned subsystems. Default is 0.
           * @param {string} event_id - (Optional) The ID of the event associated with the modification. Default is an empty string.
           * @param {string} transaction_id - (Optional) The ID of the transaction associated with the modification. Default is an empty string.
           * @return {Promise<object>} A Promise that resolves to an object with the operation ID and result of the modification.
           *
           * The resolved object will have the following properties:
           * - op_id: The ID of the operation for the modification.
           * - result: The result status code of the modification operation.
           *
           * Example resolved object:
           * {
           *   "op_id": 74001,
           *   "result": 200
           * }
           */
        }, {
          key: "put_individual",
          value: function () {
            var _put_individual = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(ticket, individual, assigned_subsystems, event_id, transaction_id) {
              var arg, isObj, params;
              return _regeneratorRuntime().wrap(function _callee14$(_context15) {
                while (1) switch (_context15.prev = _context15.next) {
                  case 0:
                    arg = ticket;
                    isObj = _typeof(arg) === 'object';
                    params = {
                      method: 'PUT',
                      url: '/put_individual',
                      ticket: isObj ? arg.ticket : ticket,
                      data: {
                        'individual': isObj ? arg.individual : individual,
                        'assigned_subsystems': (isObj ? arg.assigned_subsystems : assigned_subsystems) || 0,
                        'prepare_events': true,
                        'event_id': (isObj ? arg.event_id : event_id) || '',
                        'transaction_id': (isObj ? arg.transaction_id : transaction_id) || ''
                      }
                    };
                    return _context15.abrupt("return", call_server(params));
                  case 4:
                  case "end":
                    return _context15.stop();
                }
              }, _callee14);
            }));
            function put_individual(_x36, _x37, _x38, _x39, _x40) {
              return _put_individual.apply(this, arguments);
            }
            return put_individual;
          }()
          /**
           * Add to an individual in the database using the provided individual data.
           * @param {string|object} ticket - The ticket or an object with the "ticket" property.
           * @param {object} individual - The individual data to add.
           * @param {number} assigned_subsystems - (Optional) The number of assigned subsystems. Default is 0.
           * @param {string} event_id - (Optional) The ID of the event associated with the addition. Default is an empty string.
           * @param {string} transaction_id - (Optional) The ID of the transaction associated with the addition. Default is an empty string.
           * @return {Promise<object>} A Promise that resolves to an object with the operation ID and result of the addition.
           *
           * The resolved object will have the following properties:
           * - op_id: The ID of the operation for the addition.
           * - result: The result status code of the addition operation.
           *
           * Example resolved object:
           * {
           *   "op_id": 74001,
           *   "result": 200
           * }
           */
        }, {
          key: "add_to_individual",
          value: function () {
            var _add_to_individual = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(ticket, individual, assigned_subsystems, event_id, transaction_id) {
              var arg, isObj, params;
              return _regeneratorRuntime().wrap(function _callee15$(_context16) {
                while (1) switch (_context16.prev = _context16.next) {
                  case 0:
                    arg = ticket;
                    isObj = _typeof(arg) === 'object';
                    params = {
                      method: 'PUT',
                      url: '/add_to_individual',
                      ticket: isObj ? arg.ticket : ticket,
                      data: {
                        'individual': isObj ? arg.individual : individual,
                        'assigned_subsystems': (isObj ? arg.assigned_subsystems : assigned_subsystems) || 0,
                        'prepare_events': true,
                        'event_id': (isObj ? arg.event_id : event_id) || '',
                        'transaction_id': (isObj ? arg.transaction_id : transaction_id) || ''
                      }
                    };
                    return _context16.abrupt("return", call_server(params));
                  case 4:
                  case "end":
                    return _context16.stop();
                }
              }, _callee15);
            }));
            function add_to_individual(_x41, _x42, _x43, _x44, _x45) {
              return _add_to_individual.apply(this, arguments);
            }
            return add_to_individual;
          }()
          /**
           * Update a value in an individual in the database using the provided individual data.
           * @param {string|object} ticket - The ticket or an object with the "ticket" property.
           * @param {object} individual - The individual data to update.
           * @param {number} assigned_subsystems - (Optional) The number of assigned subsystems. Default is 0.
           * @param {string} event_id - (Optional) The ID of the event associated with the update. Default is an empty string.
           * @param {string} transaction_id - (Optional) The ID of the transaction associated with the update. Default is an empty string.
           * @return {Promise<object>} A Promise that resolves to an object with the operation ID and result of the update.
           *
           * The resolved object will have the following properties:
           * - op_id: The ID of the operation for the addition.
           * - result: The result status code of the addition operation.
           *
           * Example resolved object:
           * {
           *   "op_id": 74001,
           *   "result": 200
           * }
           */
        }, {
          key: "set_in_individual",
          value: function () {
            var _set_in_individual = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(ticket, individual, assigned_subsystems, event_id, transaction_id) {
              var arg, isObj, params;
              return _regeneratorRuntime().wrap(function _callee16$(_context17) {
                while (1) switch (_context17.prev = _context17.next) {
                  case 0:
                    arg = ticket;
                    isObj = _typeof(arg) === 'object';
                    params = {
                      method: 'PUT',
                      url: '/set_in_individual',
                      ticket: isObj ? arg.ticket : ticket,
                      data: {
                        'individual': isObj ? arg.individual : individual,
                        'assigned_subsystems': (isObj ? arg.assigned_subsystems : assigned_subsystems) || 0,
                        'prepare_events': true,
                        'event_id': (isObj ? arg.event_id : event_id) || '',
                        'transaction_id': (isObj ? arg.transaction_id : transaction_id) || ''
                      }
                    };
                    return _context17.abrupt("return", call_server(params));
                  case 4:
                  case "end":
                    return _context17.stop();
                }
              }, _callee16);
            }));
            function set_in_individual(_x46, _x47, _x48, _x49, _x50) {
              return _set_in_individual.apply(this, arguments);
            }
            return set_in_individual;
          }()
          /**
           * Remove a value from an individual in the database using the provided individual data.
           * @param {string|object} ticket - The ticket or an object with the "ticket" property.
           * @param {object} individual - The individual data to remove.
           * @param {number} assigned_subsystems - (Optional) The number of assigned subsystems. Default is 0.
           * @param {string} event_id - (Optional) The ID of the event associated with the removal. Default is an empty string.
           * @param {string} transaction_id - (Optional) The ID of the transaction associated with the removal. Default is an empty string.
           * @return {Promise<object>} A Promise that resolves to an object with the operation ID and result of the removal.
           *
           * The resolved object will have the following properties:
           * - op_id: The ID of the operation for the removal.
           * - result: The result status code of the removal operation.
           *
           * Example resolved object:
           * {
           *   "op_id": 74001,
           *   "result": 200
           * }
           */
        }, {
          key: "remove_from_individual",
          value: function () {
            var _remove_from_individual = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(ticket, individual, assigned_subsystems, event_id, transaction_id) {
              var arg, isObj, params;
              return _regeneratorRuntime().wrap(function _callee17$(_context18) {
                while (1) switch (_context18.prev = _context18.next) {
                  case 0:
                    arg = ticket;
                    isObj = _typeof(arg) === 'object';
                    params = {
                      method: 'PUT',
                      url: '/remove_from_individual',
                      ticket: isObj ? arg.ticket : ticket,
                      data: {
                        'individual': isObj ? arg.individual : individual,
                        'assigned_subsystems': (isObj ? arg.assigned_subsystems : assigned_subsystems) || 0,
                        'prepare_events': true,
                        'event_id': (isObj ? arg.event_id : event_id) || '',
                        'transaction_id': (isObj ? arg.transaction_id : transaction_id) || ''
                      }
                    };
                    return _context18.abrupt("return", call_server(params));
                  case 4:
                  case "end":
                    return _context18.stop();
                }
              }, _callee17);
            }));
            function remove_from_individual(_x51, _x52, _x53, _x54, _x55) {
              return _remove_from_individual.apply(this, arguments);
            }
            return remove_from_individual;
          }()
          /**
           * Modify or create multiple individuals in the database using the provided individual data.
           * @param {string|object} ticket - The ticket or an object with the "ticket" property.
           * @param {object[]} individuals - An array of individual data to modify.
           * @param {number} assigned_subsystems - (Optional) The number of assigned subsystems. Default is 0.
           * @param {string} event_id - (Optional) The ID of the event associated with the modification. Default is an empty string.
           * @param {string} transaction_id - (Optional) The ID of the transaction associated with the modification. Default is an empty string.
           * @return {Promise<object>} A Promise that resolves to an object with the operation ID and result of the modification.
           *
           * The resolved object will have the following properties:
           * - op_id: The ID of the operation for the modification.
           * - result: The result status code of the modification operation.
           *
           * Example resolved object:
           * {
           *   "op_id": 74001,
           *   "result": 200
           * }
           */
        }, {
          key: "put_individuals",
          value: function () {
            var _put_individuals = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(ticket, individuals, assigned_subsystems, event_id, transaction_id) {
              var arg, isObj, params;
              return _regeneratorRuntime().wrap(function _callee18$(_context19) {
                while (1) switch (_context19.prev = _context19.next) {
                  case 0:
                    arg = ticket;
                    isObj = _typeof(arg) === 'object';
                    params = {
                      method: 'PUT',
                      url: '/put_individuals',
                      ticket: isObj ? arg.ticket : ticket,
                      data: {
                        'individuals': isObj ? arg.individuals : individuals,
                        'assigned_subsystems': (isObj ? arg.assigned_subsystems : assigned_subsystems) || 0,
                        'prepare_events': true,
                        'event_id': (isObj ? arg.event_id : event_id) || '',
                        'transaction_id': (isObj ? arg.transaction_id : transaction_id) || ''
                      }
                    };
                    return _context19.abrupt("return", call_server(params));
                  case 4:
                  case "end":
                    return _context19.stop();
                }
              }, _callee18);
            }));
            function put_individuals(_x56, _x57, _x58, _x59, _x60) {
              return _put_individuals.apply(this, arguments);
            }
            return put_individuals;
          }()
        }]);
        return BrowserBackend;
      }());
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfcmVnZW5lcmF0b3JSdW50aW1lIiwiZXhwb3J0cyIsIk9wIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duIiwiaGFzT3duUHJvcGVydHkiLCJkZWZpbmVQcm9wZXJ0eSIsIm9iaiIsImtleSIsImRlc2MiLCJ2YWx1ZSIsIiRTeW1ib2wiLCJTeW1ib2wiLCJpdGVyYXRvclN5bWJvbCIsIml0ZXJhdG9yIiwiYXN5bmNJdGVyYXRvclN5bWJvbCIsImFzeW5jSXRlcmF0b3IiLCJ0b1N0cmluZ1RhZ1N5bWJvbCIsInRvU3RyaW5nVGFnIiwiZGVmaW5lIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiZXJyIiwid3JhcCIsImlubmVyRm4iLCJvdXRlckZuIiwic2VsZiIsInRyeUxvY3NMaXN0IiwicHJvdG9HZW5lcmF0b3IiLCJHZW5lcmF0b3IiLCJnZW5lcmF0b3IiLCJjcmVhdGUiLCJjb250ZXh0IiwiQ29udGV4dCIsIm1ha2VJbnZva2VNZXRob2QiLCJ0cnlDYXRjaCIsImZuIiwiYXJnIiwidHlwZSIsImNhbGwiLCJDb250aW51ZVNlbnRpbmVsIiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsIkl0ZXJhdG9yUHJvdG90eXBlIiwiZ2V0UHJvdG8iLCJnZXRQcm90b3R5cGVPZiIsIk5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlIiwidmFsdWVzIiwiR3AiLCJkZWZpbmVJdGVyYXRvck1ldGhvZHMiLCJmb3JFYWNoIiwibWV0aG9kIiwiX2ludm9rZSIsIkFzeW5jSXRlcmF0b3IiLCJQcm9taXNlSW1wbCIsImludm9rZSIsInJlc29sdmUiLCJyZWplY3QiLCJyZWNvcmQiLCJyZXN1bHQiLCJfX2F3YWl0IiwidGhlbiIsInVud3JhcHBlZCIsImVycm9yIiwicHJldmlvdXNQcm9taXNlIiwiY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmciLCJzdGF0ZSIsIkVycm9yIiwiZG9uZVJlc3VsdCIsImRlbGVnYXRlIiwiZGVsZWdhdGVSZXN1bHQiLCJtYXliZUludm9rZURlbGVnYXRlIiwic2VudCIsIl9zZW50IiwiZGlzcGF0Y2hFeGNlcHRpb24iLCJhYnJ1cHQiLCJkb25lIiwibWV0aG9kTmFtZSIsInVuZGVmaW5lZCIsInJldHVybiIsIlR5cGVFcnJvciIsImluZm8iLCJyZXN1bHROYW1lIiwibmV4dCIsIm5leHRMb2MiLCJwdXNoVHJ5RW50cnkiLCJsb2NzIiwiZW50cnkiLCJ0cnlMb2MiLCJjYXRjaExvYyIsImZpbmFsbHlMb2MiLCJhZnRlckxvYyIsInRyeUVudHJpZXMiLCJwdXNoIiwicmVzZXRUcnlFbnRyeSIsImNvbXBsZXRpb24iLCJyZXNldCIsIml0ZXJhYmxlIiwiaXRlcmF0b3JNZXRob2QiLCJpc05hTiIsImxlbmd0aCIsImkiLCJkaXNwbGF5TmFtZSIsImlzR2VuZXJhdG9yRnVuY3Rpb24iLCJnZW5GdW4iLCJjdG9yIiwiY29uc3RydWN0b3IiLCJuYW1lIiwibWFyayIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiYXdyYXAiLCJhc3luYyIsIlByb21pc2UiLCJpdGVyIiwia2V5cyIsInZhbCIsIm9iamVjdCIsInJldmVyc2UiLCJwb3AiLCJza2lwVGVtcFJlc2V0IiwicHJldiIsImNoYXJBdCIsInNsaWNlIiwic3RvcCIsInJvb3RSZWNvcmQiLCJydmFsIiwiZXhjZXB0aW9uIiwiaGFuZGxlIiwibG9jIiwiY2F1Z2h0IiwiaGFzQ2F0Y2giLCJoYXNGaW5hbGx5IiwiZmluYWxseUVudHJ5IiwiY29tcGxldGUiLCJmaW5pc2giLCJjYXRjaCIsInRocm93biIsImRlbGVnYXRlWWllbGQiLCJfdHlwZW9mIiwiYXN5bmNHZW5lcmF0b3JTdGVwIiwiZ2VuIiwiX25leHQiLCJfdGhyb3ciLCJfYXN5bmNUb0dlbmVyYXRvciIsImFyZ3MiLCJhcmd1bWVudHMiLCJhcHBseSIsIl9jbGFzc0NhbGxDaGVjayIsImluc3RhbmNlIiwiQ29uc3RydWN0b3IiLCJfZGVmaW5lUHJvcGVydGllcyIsInRhcmdldCIsInByb3BzIiwiZGVzY3JpcHRvciIsIl90b1Byb3BlcnR5S2V5IiwiX2NyZWF0ZUNsYXNzIiwicHJvdG9Qcm9wcyIsInN0YXRpY1Byb3BzIiwiX3RvUHJpbWl0aXZlIiwiU3RyaW5nIiwiaW5wdXQiLCJoaW50IiwicHJpbSIsInRvUHJpbWl0aXZlIiwicmVzIiwiTnVtYmVyIiwiY2FsbF9zZXJ2ZXIiLCJfeDYxIiwiX2NhbGxfc2VydmVyIiwiX2NhbGxlZTE5IiwicGFyYW1zIiwidXJsIiwicmVzcG9uc2UiLCJfY2FsbGVlMTkkIiwiX2NvbnRleHQyMCIsIlVSTCIsImxvY2F0aW9uIiwib3JpZ2luIiwiZGF0YSIsImVudHJpZXMiLCJmaWx0ZXIiLCJfcmVmIiwiX3JlZjIiLCJfc2xpY2VkVG9BcnJheSIsIl8iLCJzZWFyY2giLCJVUkxTZWFyY2hQYXJhbXMiLCJ0b1N0cmluZyIsInRpY2tldCIsInNlYXJjaFBhcmFtcyIsImFwcGVuZCIsImZldGNoIiwiX29iamVjdFNwcmVhZCIsIm1vZGUiLCJjYWNoZSIsImNyZWRlbnRpYWxzIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5Iiwib2siLCJqc29uIiwiQmFja2VuZEVycm9yIiwic3RhdHVzIiwid2FpdCIsIm1zIiwic2V0VGltZW91dCIsImFkanVzdFRpY2tldCIsImlkIiwidXNlcl91cmkiLCJlbmRfdGltZSIsIk1hdGgiLCJmbG9vciIsInNldHRlcnMiLCJfYnJvd3NlckJhY2tlbmRfZXJyb3JKcyIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsIkJyb3dzZXJCYWNrZW5kIiwiX2dldF9yaWdodHMiLCJfY2FsbGVlIiwidXJpIiwidXNlcl9pZCIsImlzT2JqIiwiX2NhbGxlZSQiLCJfY29udGV4dDIiLCJnZXRfcmlnaHRzIiwiX3giLCJfeDIiLCJfeDMiLCJfZ2V0X3JpZ2h0c19vcmlnaW4iLCJfY2FsbGVlMiIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MyIsImdldF9yaWdodHNfb3JpZ2luIiwiX3g0IiwiX3g1IiwiX2dldF9tZW1iZXJzaGlwIiwiX2NhbGxlZTMiLCJfY2FsbGVlMyQiLCJfY29udGV4dDQiLCJnZXRfbWVtYmVyc2hpcCIsIl94NiIsIl94NyIsIl9hdXRoZW50aWNhdGUiLCJfY2FsbGVlNCIsImxvZ2luIiwicGFzc3dvcmQiLCJzZWNyZXQiLCJfY2FsbGVlNCQiLCJfY29udGV4dDUiLCJhdXRoZW50aWNhdGUiLCJfeDgiLCJfeDkiLCJfeDEwIiwiX2dldF90aWNrZXRfdHJ1c3RlZCIsIl9jYWxsZWU1IiwiX2NhbGxlZTUkIiwiX2NvbnRleHQ2IiwiZ2V0X3RpY2tldF90cnVzdGVkIiwiX3gxMSIsIl94MTIiLCJfaXNfdGlja2V0X3ZhbGlkIiwiX2NhbGxlZTYiLCJfY2FsbGVlNiQiLCJfY29udGV4dDciLCJpc190aWNrZXRfdmFsaWQiLCJfeDEzIiwiX2xvZ291dCIsIl9jYWxsZWU3IiwiX2NhbGxlZTckIiwiX2NvbnRleHQ4IiwibG9nb3V0IiwiX3gxNCIsIl9nZXRfb3BlcmF0aW9uX3N0YXRlIiwiX2NhbGxlZTgiLCJtb2R1bGVfaWQiLCJ3YWl0X29wX2lkIiwiX2NhbGxlZTgkIiwiX2NvbnRleHQ5IiwiZ2V0X29wZXJhdGlvbl9zdGF0ZSIsIl94MTUiLCJfeDE2IiwiX3dhaXRfbW9kdWxlIiwiX2NhbGxlZTkiLCJvcF9pZCIsIl9fbWF4Q2FsbHMiLCJfYXJnczkiLCJfY2FsbGVlOSQiLCJfY29udGV4dDEwIiwibW9kdWxlX29wX2lkIiwid2FpdF9tb2R1bGUiLCJfeDE3IiwiX3gxOCIsIl9xdWVyeSIsIl9jYWxsZWUxMCIsInF1ZXJ5U3RyIiwic29ydCIsImRhdGFiYXNlcyIsInRvcCIsImxpbWl0IiwiZnJvbSIsInNxbCIsInRyaWVzIiwiX2FyZ3MxMCIsIl9jYWxsZWUxMCQiLCJfY29udGV4dDExIiwicXVlcnkiLCJiYWNrZW5kRXJyb3IiLCJjb2RlIiwiX3gxOSIsIl94MjAiLCJfeDIxIiwiX3gyMiIsIl94MjMiLCJfeDI0IiwiX3gyNSIsIl94MjYiLCJfZ2V0X2luZGl2aWR1YWwiLCJfY2FsbGVlMTEiLCJfYXJnczExIiwiX2NhbGxlZTExJCIsIl9jb250ZXh0MTIiLCJEYXRlIiwibm93IiwiZ2V0X2luZGl2aWR1YWwiLCJfeDI3IiwiX3gyOCIsIl9nZXRfaW5kaXZpZHVhbHMiLCJfY2FsbGVlMTIiLCJ1cmlzIiwiX2NhbGxlZTEyJCIsIl9jb250ZXh0MTMiLCJnZXRfaW5kaXZpZHVhbHMiLCJfeDI5IiwiX3gzMCIsIl9yZW1vdmVfaW5kaXZpZHVhbCIsIl9jYWxsZWUxMyIsImFzc2lnbmVkX3N1YnN5c3RlbXMiLCJldmVudF9pZCIsInRyYW5zYWN0aW9uX2lkIiwiX2NhbGxlZTEzJCIsIl9jb250ZXh0MTQiLCJyZW1vdmVfaW5kaXZpZHVhbCIsIl94MzEiLCJfeDMyIiwiX3gzMyIsIl94MzQiLCJfeDM1IiwiX3B1dF9pbmRpdmlkdWFsIiwiX2NhbGxlZTE0IiwiaW5kaXZpZHVhbCIsIl9jYWxsZWUxNCQiLCJfY29udGV4dDE1IiwicHV0X2luZGl2aWR1YWwiLCJfeDM2IiwiX3gzNyIsIl94MzgiLCJfeDM5IiwiX3g0MCIsIl9hZGRfdG9faW5kaXZpZHVhbCIsIl9jYWxsZWUxNSIsIl9jYWxsZWUxNSQiLCJfY29udGV4dDE2IiwiYWRkX3RvX2luZGl2aWR1YWwiLCJfeDQxIiwiX3g0MiIsIl94NDMiLCJfeDQ0IiwiX3g0NSIsIl9zZXRfaW5faW5kaXZpZHVhbCIsIl9jYWxsZWUxNiIsIl9jYWxsZWUxNiQiLCJfY29udGV4dDE3Iiwic2V0X2luX2luZGl2aWR1YWwiLCJfeDQ2IiwiX3g0NyIsIl94NDgiLCJfeDQ5IiwiX3g1MCIsIl9yZW1vdmVfZnJvbV9pbmRpdmlkdWFsIiwiX2NhbGxlZTE3IiwiX2NhbGxlZTE3JCIsIl9jb250ZXh0MTgiLCJyZW1vdmVfZnJvbV9pbmRpdmlkdWFsIiwiX3g1MSIsIl94NTIiLCJfeDUzIiwiX3g1NCIsIl94NTUiLCJfcHV0X2luZGl2aWR1YWxzIiwiX2NhbGxlZTE4IiwiaW5kaXZpZHVhbHMiLCJfY2FsbGVlMTgkIiwiX2NvbnRleHQxOSIsInB1dF9pbmRpdmlkdWFscyIsIl94NTYiLCJfeDU3IiwiX3g1OCIsIl94NTkiLCJfeDYwIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc291cmNlLXdlYi9qcy9icm93c2VyL2JhY2tlbmRfYnJvd3Nlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEJyb3dzZXIgYmFja2VuZFxuICogQG1vZHVsZSBCcm93c2VyQmFja2VuZFxuICovXG5cbmltcG9ydCBCYWNrZW5kRXJyb3IgZnJvbSAnLi4vYnJvd3Nlci9iYWNrZW5kX2Vycm9yLmpzJztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgdGhlIGJhY2tlbmQgZm9yIGJyb3dzZXIgaW50ZXJhY3Rpb25zLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCcm93c2VyQmFja2VuZCB7XG4gIC8qKlxuICAgKiBHZXQgcmlnaHRzIGZvciBhIHNwZWNpZmljIHRpY2tldCwgVVJJLCBhbmQgdXNlciBJRC5cbiAgICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSB0aWNrZXQgLSBUaGUgdGlja2V0IG9yIGFuIG9iamVjdCB3aXRoIHRoZSBcInRpY2tldFwiIHByb3BlcnR5LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJpIC0gVGhlIFVSSSBmb3Igd2hpY2ggdG8gZ2V0IHRoZSByaWdodHMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VyX2lkIC0gVGhlIHVzZXIgSUQgZm9yIHdoaWNoIHRvIGdldCB0aGUgcmlnaHRzLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBBIFByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgc2VydmVyIHJlc3BvbnNlLlxuICAgKi9cbiAgc3RhdGljIGFzeW5jIGdldF9yaWdodHMgKHRpY2tldCwgdXJpLCB1c2VyX2lkKSB7XG4gICAgY29uc3QgYXJnID0gdGlja2V0O1xuICAgIGNvbnN0IGlzT2JqID0gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCc7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHVybDogJy9nZXRfcmlnaHRzJyxcbiAgICAgIHRpY2tldDogaXNPYmogPyBhcmcudGlja2V0IDogdGlja2V0LFxuICAgICAgZGF0YToge1xuICAgICAgICAndXJpJzogaXNPYmogPyBhcmcudXJpIDogdXJpLFxuICAgICAgICAndXNlcl9pZCc6IGlzT2JqID8gYXJnLnVzZXJfaWQgOiB1c2VyX2lkLFxuICAgICAgfSxcbiAgICB9O1xuICAgIHJldHVybiBjYWxsX3NlcnZlcihwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCByaWdodHMgb3JpZ2luIGZvciBhIHNwZWNpZmljIHRpY2tldCBhbmQgVVJJLlxuICAgKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IHRpY2tldCAtIFRoZSB0aWNrZXQgb3IgYW4gb2JqZWN0IHdpdGggdGhlIFwidGlja2V0XCIgcHJvcGVydHkuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmkgLSBUaGUgVVJJIGZvciB3aGljaCB0byBnZXQgdGhlIHJpZ2h0cyBvcmlnaW4uXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IEEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSBzZXJ2ZXIgcmVzcG9uc2UuXG4gICAqL1xuICBzdGF0aWMgYXN5bmMgZ2V0X3JpZ2h0c19vcmlnaW4gKHRpY2tldCwgdXJpKSB7XG4gICAgY29uc3QgYXJnID0gdGlja2V0O1xuICAgIGNvbnN0IGlzT2JqID0gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCc7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHVybDogJy9nZXRfcmlnaHRzX29yaWdpbicsXG4gICAgICB0aWNrZXQ6IGlzT2JqID8gYXJnLnRpY2tldCA6IHRpY2tldCxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgJ3VyaSc6IGlzT2JqID8gYXJnLnVyaSA6IHVyaSxcbiAgICAgIH0sXG4gICAgfTtcbiAgICByZXR1cm4gY2FsbF9zZXJ2ZXIocGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG1lbWJlcnNoaXAgaW5mb3JtYXRpb24gZm9yIGEgc3BlY2lmaWMgdGlja2V0IGFuZCBVUkkuXG4gICAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0gdGlja2V0IC0gVGhlIHRpY2tldCBvciBhbiBvYmplY3Qgd2l0aCB0aGUgXCJ0aWNrZXRcIiBwcm9wZXJ0eS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHVyaSAtIFRoZSBVUkkgZm9yIHdoaWNoIHRvIGdldCB0aGUgbWVtYmVyc2hpcCBpbmZvcm1hdGlvbi5cbiAgICogQHJldHVybiB7UHJvbWlzZTxvYmplY3Q+fSBBIFByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgc2VydmVyIHJlc3BvbnNlIGNvbnRhaW5pbmcgdGhlIG1lbWJlcnNoaXAgaW5mb3JtYXRpb24uXG4gICAqXG4gICAqIEV4YW1wbGUgc2VydmVyIHJlc3BvbnNlOlxuICAgKiB7XG4gICAqICAgXCJAXCI6IFwiX1wiLFxuICAgKiAgIFwicmRmOnR5cGVcIjogW1xuICAgKiAgICAge1wiZGF0YVwiOlwidi1zOk1lbWJlcnNoaXBcIixcInR5cGVcIjpcIlVyaVwifVxuICAgKiAgIF0sXG4gICAqICAgXCJ2LXM6bWVtYmVyT2ZcIjogW1xuICAgKiAgICAge1wiZGF0YVwiOlwidi1zOkFsbFJlc291cmNlc0dyb3VwXCIsXCJ0eXBlXCI6XCJVcmlcIn0sXG4gICAqICAgICB7XCJkYXRhXCI6XCJjZmc6VmVkYVN5c3RlbVwiLFwidHlwZVwiOlwiVXJpXCJ9LFxuICAgKiAgICAge1wiZGF0YVwiOlwiY2ZnOlN1cGVyVXNlclwiLFwidHlwZVwiOlwiVXJpXCJ9XG4gICAqICAgXSxcbiAgICogICBcInYtczpyZXNvdXJjZVwiOiBbXG4gICAqICAgICB7XCJkYXRhXCI6XCJjZmc6VmVkYVN5c3RlbVwiLFwidHlwZVwiOlwiVXJpXCJ9XG4gICAqICAgXVxuICAgKiB9XG4gICAqL1xuICBzdGF0aWMgYXN5bmMgZ2V0X21lbWJlcnNoaXAgKHRpY2tldCwgdXJpKSB7XG4gICAgY29uc3QgYXJnID0gdGlja2V0O1xuICAgIGNvbnN0IGlzT2JqID0gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCc7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHVybDogJy9nZXRfbWVtYmVyc2hpcCcsXG4gICAgICB0aWNrZXQ6IGlzT2JqID8gYXJnLnRpY2tldCA6IHRpY2tldCxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgJ3VyaSc6IGlzT2JqID8gYXJnLnVyaSA6IHVyaSxcbiAgICAgIH0sXG4gICAgfTtcbiAgICByZXR1cm4gY2FsbF9zZXJ2ZXIocGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdXRoZW50aWNhdGUgdGhlIHVzZXIgd2l0aCB0aGUgcHJvdmlkZWQgbG9naW4sIHBhc3N3b3JkLCBhbmQgc2VjcmV0LlxuICAgKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IGxvZ2luIC0gVGhlIGxvZ2luIG9yIGFuIG9iamVjdCB3aXRoIHRoZSBcImxvZ2luXCIgcHJvcGVydHkuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXNzd29yZCAtIFRoZSBwYXNzd29yZCBvZiB0aGUgdXNlci5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlY3JldCAtIFRoZSBzZWNyZXQgYXNzb2NpYXRlZCB3aXRoIHRoZSB1c2VyLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPG9iamVjdD59IEEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSBzZXJ2ZXIgcmVzcG9uc2UuXG4gICAqXG4gICAqIFRoZSBzZXJ2ZXIgcmVzcG9uc2Ugb2JqZWN0IHdpbGwgaGF2ZSB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gICAqIC0gdGlja2V0OiBUaGUgSUQgb2YgdGhlIHRpY2tldC5cbiAgICogLSB1c2VyX3VyaTogVGhlIFVSSSBvZiB0aGUgYXV0aGVudGljYXRlZCB1c2VyLlxuICAgKiAtIGVuZF90aW1lOiBUaGUgYWRqdXN0ZWQgZW5kIHRpbWUgb2YgdGhlIHRpY2tldCBpbiBtaWxsaXNlY29uZHMgc2luY2UgSmFudWFyeSAxLCAxOTcwIChVTklYIHRpbWVzdGFtcCkuXG4gICAqL1xuICBzdGF0aWMgYXN5bmMgYXV0aGVudGljYXRlIChsb2dpbiwgcGFzc3dvcmQsIHNlY3JldCkge1xuICAgIGNvbnN0IGFyZyA9IGxvZ2luO1xuICAgIGNvbnN0IGlzT2JqID0gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCc7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB1cmw6ICcvYXV0aGVudGljYXRlJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgJ2xvZ2luJzogaXNPYmogPyBhcmcubG9naW4gOiBsb2dpbixcbiAgICAgICAgJ3Bhc3N3b3JkJzogaXNPYmogPyBhcmcucGFzc3dvcmQgOiBwYXNzd29yZCxcbiAgICAgICAgJ3NlY3JldCc6IGlzT2JqID8gYXJnLnNlY3JldCA6IHNlY3JldCxcbiAgICAgIH0sXG4gICAgfTtcbiAgICByZXR1cm4gY2FsbF9zZXJ2ZXIocGFyYW1zKS50aGVuKGFkanVzdFRpY2tldCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgdGlja2V0IGluIGEgdHJ1c3RlZCBtYW5uZXIuIFVzZWZ1bCB0byBnZXQgYSBuZXcgdGlja2V0IGZvciB0aGUgY3VycmVudCB1c2VyIHRvIHByb2xvbmdhdGUgYSBzZXNzaW9uLlxuICAgKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IHRpY2tldCAtIFRoZSB0aWNrZXQgb3IgYW4gb2JqZWN0IHdpdGggdGhlIFwidGlja2V0XCIgcHJvcGVydHkuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBsb2dpbiAtIFRoZSBsb2dpbiBmb3Igd2hpY2ggdG8gZ2V0IHRoZSB0cnVzdGVkIHRpY2tldC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxvYmplY3Q+fSBBIFByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgc2VydmVyIHJlc3BvbnNlLlxuICAgKlxuICAgKiBUaGUgc2VydmVyIHJlc3BvbnNlIG9iamVjdCB3aWxsIGhhdmUgdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICAgKiAtIHRpY2tldDogVGhlIElEIG9mIHRoZSB0cnVzdGVkIHRpY2tldC5cbiAgICogLSB1c2VyX3VyaTogVGhlIFVSSSBvZiB0aGUgdHJ1c3RlZCB1c2VyLlxuICAgKiAtIGVuZF90aW1lOiBUaGUgYWRqdXN0ZWQgZW5kIHRpbWUgb2YgdGhlIHRydXN0ZWQgdGlja2V0IGluIG1pbGxpc2Vjb25kcyBzaW5jZSBKYW51YXJ5IDEsIDE5NzAgKFVOSVggdGltZXN0YW1wKS5cbiAgICovXG4gIHN0YXRpYyBhc3luYyBnZXRfdGlja2V0X3RydXN0ZWQgKHRpY2tldCwgbG9naW4pIHtcbiAgICBjb25zdCBhcmcgPSB0aWNrZXQ7XG4gICAgY29uc3QgaXNPYmogPSB0eXBlb2YgYXJnID09PSAnb2JqZWN0JztcbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgdXJsOiAnL2dldF90aWNrZXRfdHJ1c3RlZCcsXG4gICAgICB0aWNrZXQ6IGlzT2JqID8gYXJnLnRpY2tldCA6IHRpY2tldCxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgJ2xvZ2luJzogaXNPYmogPyBhcmcubG9naW4gOiBsb2dpbixcbiAgICAgIH0sXG4gICAgfTtcbiAgICByZXR1cm4gY2FsbF9zZXJ2ZXIocGFyYW1zKS50aGVuKGFkanVzdFRpY2tldCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSB0aWNrZXQgaXMgdmFsaWQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0gdGlja2V0IC0gVGhlIHRpY2tldCBvciBhbiBvYmplY3Qgd2l0aCB0aGUgXCJ0aWNrZXRcIiBwcm9wZXJ0eS5cbiAgICogQHJldHVybiB7UHJvbWlzZTxib29sZWFuPn0gQSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdHJ1ZSBpZiB0aGUgdGlja2V0IGlzIHZhbGlkLCBvciBmYWxzZSBvdGhlcndpc2UuXG4gICAqL1xuICBzdGF0aWMgYXN5bmMgaXNfdGlja2V0X3ZhbGlkICh0aWNrZXQpIHtcbiAgICBjb25zdCBhcmcgPSB0aWNrZXQ7XG4gICAgY29uc3QgaXNPYmogPSB0eXBlb2YgYXJnID09PSAnb2JqZWN0JztcbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgdXJsOiAnL2lzX3RpY2tldF92YWxpZCcsXG4gICAgICB0aWNrZXQ6IGlzT2JqID8gYXJnLnRpY2tldCA6IHRpY2tldCxcbiAgICAgIGRhdGE6IHt9LFxuICAgIH07XG4gICAgcmV0dXJuIGNhbGxfc2VydmVyKHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogTG9nb3V0IHRoZSB1c2VyIHdpdGggdGhlIHByb3ZpZGVkIHRpY2tldC5cbiAgICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSB0aWNrZXQgLSBUaGUgdGlja2V0IG9yIGFuIG9iamVjdCB3aXRoIHRoZSBcInRpY2tldFwiIHByb3BlcnR5LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBBIFByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgc2VydmVyIHJlc3BvbnNlLlxuICAgKi9cbiAgc3RhdGljIGFzeW5jIGxvZ291dCAodGlja2V0KSB7XG4gICAgY29uc3QgYXJnID0gdGlja2V0O1xuICAgIGNvbnN0IGlzT2JqID0gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCc7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHVybDogJy9sb2dvdXQnLFxuICAgICAgdGlja2V0OiBpc09iaiA/IGFyZy50aWNrZXQgOiB0aWNrZXQsXG4gICAgICBkYXRhOiB7fSxcbiAgICB9O1xuICAgIHJldHVybiBjYWxsX3NlcnZlcihwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgc3RhdGUgb2YgYW4gb3BlcmF0aW9uIGZvciBhIHNwZWNpZmljIG1vZHVsZSBJRC5cbiAgICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSBtb2R1bGVfaWQgLSBUaGUgbW9kdWxlIElEIG9yIGFuIG9iamVjdCB3aXRoIHRoZSBcIm1vZHVsZV9pZFwiIHByb3BlcnR5LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gd2FpdF9vcF9pZCAtIFRoZSBvcGVyYXRpb24gSUQgdG8gY2hlY2suXG4gICAqIEByZXR1cm4ge1Byb21pc2U8bnVtYmVyPn0gQSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBudW1iZXIgb2YgbGFzdCBvcGVyYXRpb24gaWQgcHJvY2Vzc2VkIGJ5IGEgbW9kdWxlLlxuICAgKi9cbiAgc3RhdGljIGFzeW5jIGdldF9vcGVyYXRpb25fc3RhdGUgKG1vZHVsZV9pZCwgd2FpdF9vcF9pZCkge1xuICAgIGNvbnN0IGFyZyA9IG1vZHVsZV9pZDtcbiAgICBjb25zdCBpc09iaiA9IHR5cGVvZiBhcmcgPT09ICdvYmplY3QnO1xuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB1cmw6ICcvZ2V0X29wZXJhdGlvbl9zdGF0ZScsXG4gICAgICBkYXRhOiB7XG4gICAgICAgICdtb2R1bGVfaWQnOiBpc09iaiA/IGFyZy5tb2R1bGVfaWQgOiBtb2R1bGVfaWQsXG4gICAgICAgICd3YWl0X29wX2lkJzogaXNPYmogPyBhcmcud2FpdF9vcF9pZCA6IHdhaXRfb3BfaWQsXG4gICAgICB9LFxuICAgIH07XG4gICAgcmV0dXJuIGNhbGxfc2VydmVyKHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogV2FpdCBmb3IgYW4gb3BlcmF0aW9uIHRvIGNvbXBsZXRlIGZvciBhIHNwZWNpZmljIG1vZHVsZSBJRCBhbmQgb3BlcmF0aW9uIElELlxuICAgKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IG1vZHVsZV9pZCAtIFRoZSBtb2R1bGUgSUQgb3IgYW4gb2JqZWN0IHdpdGggdGhlIFwibW9kdWxlX2lkXCIgcHJvcGVydHkuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcF9pZCAtIFRoZSBJRCBvZiB0aGUgb3BlcmF0aW9uIHRvIHdhaXQgZm9yLlxuICAgKiBAcGFyYW0ge251bWJlcn0gX19tYXhDYWxscyAtIChPcHRpb25hbCkgVGhlIG1heGltdW0gbnVtYmVyIG9mIHJlY3Vyc2l2ZSBjYWxscyB0byBtYWtlIHdoaWxlIHdhaXRpbmcgZm9yIHRoZSBvcGVyYXRpb24uXG4gICAqICAgVGhlIGRlZmF1bHQgdmFsdWUgaXMgMTAuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8Ym9vbGVhbj59IEEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRydWUgaWYgdGhlIG9wZXJhdGlvbiBjb21wbGV0ZXMgc3VjY2Vzc2Z1bGx5LCBvciBmYWxzZSBpZiB0aGUgbWF4aW11bSBudW1iZXIgb2YgY2FsbHMgaXMgcmVhY2hlZC5cbiAgICovXG4gIHN0YXRpYyBhc3luYyB3YWl0X21vZHVsZSAobW9kdWxlX2lkLCBvcF9pZCwgX19tYXhDYWxscyA9IDEwKSB7XG4gICAgaWYgKCFfX21heENhbGxzKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKTtcbiAgICB9XG4gICAgY29uc3QgYXJnID0gbW9kdWxlX2lkO1xuICAgIGNvbnN0IGlzT2JqID0gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCc7XG4gICAgbW9kdWxlX2lkID0gaXNPYmogPyBhcmcubW9kdWxlX2lkIDogbW9kdWxlX2lkO1xuICAgIG9wX2lkID0gaXNPYmogPyBhcmcub3BfaWQgOiBvcF9pZDtcbiAgICByZXR1cm4gd2FpdCgyNTAgKiAoMTAgLSBfX21heENhbGxzKSlcbiAgICAgIC50aGVuKCgpID0+IEJyb3dzZXJCYWNrZW5kLmdldF9vcGVyYXRpb25fc3RhdGUobW9kdWxlX2lkLCBvcF9pZCkpXG4gICAgICAudGhlbigobW9kdWxlX29wX2lkKSA9PlxuICAgICAgICBtb2R1bGVfb3BfaWQgPCBvcF9pZCA/XG4gICAgICAgICAgQnJvd3NlckJhY2tlbmQud2FpdF9tb2R1bGUobW9kdWxlX2lkLCBvcF9pZCwgLS1fX21heENhbGxzKSA6XG4gICAgICAgICAgdHJ1ZSxcbiAgICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybSBhIHF1ZXJ5IG9wZXJhdGlvbiB1c2luZyB0aGUgcHJvdmlkZWQgcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSB0aWNrZXQgLSBUaGUgdGlja2V0IG9yIGFuIG9iamVjdCB3aXRoIHRoZSBcInRpY2tldFwiIHByb3BlcnR5LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcXVlcnlTdHIgLSBUaGUgcXVlcnkgc3RyaW5nIHRvIGV4ZWN1dGUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzb3J0IC0gVGhlIHNvcnQgb3JkZXIgZm9yIHRoZSBxdWVyeS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGRhdGFiYXNlcyAtIFRoZSBkYXRhYmFzZXMgdG8gc2VhcmNoIGluLlxuICAgKiBAcGFyYW0ge251bWJlcn0gdG9wIC0gVGhlIG51bWJlciBvZiBkb2N1bWVudHMgdG8gcmV0dXJuLlxuICAgKiBAcGFyYW0ge251bWJlcn0gbGltaXQgLSBUaGUgbWF4aW11bSBudW1iZXIgb2YgcmVzdWx0cyB0byByZXRyaWV2ZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGZyb20gLSBUaGUgc3RhcnRpbmcgaW5kZXggZm9yIHRoZSBxdWVyeSByZXN1bHRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3FsIC0gVGhlIFNRTCBleHByZXNzaW9uIHRvIGV4ZWN1dGUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0cmllcyAtIChPcHRpb25hbCkgVGhlIG1heGltdW0gbnVtYmVyIG9mIHJldHJ5IGF0dGVtcHRzIGluIGNhc2Ugb2YgYSA5OTkgZXJyb3IgcmVzcG9uc2UgY29kZSBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqICAgVGhlIGRlZmF1bHQgdmFsdWUgaXMgMTAuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8b2JqZWN0Pn0gQSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIHNlcnZlciByZXNwb25zZSBmb3IgdGhlIHF1ZXJ5IG9wZXJhdGlvbi5cbiAgICogQHRocm93cyB7QmFja2VuZEVycm9yfSBUaHJvd3MgYSBCYWNrZW5kRXJyb3Igd2l0aCBhIDQyOSBzdGF0dXMgY29kZSBpZiB0aGUgbWF4aW11bSBudW1iZXIgb2YgcmV0cnkgYXR0ZW1wdHMgaXMgcmVhY2hlZC5cbiAgICovXG4gIHN0YXRpYyBhc3luYyBxdWVyeSAodGlja2V0LCBxdWVyeVN0ciwgc29ydCwgZGF0YWJhc2VzLCB0b3AsIGxpbWl0LCBmcm9tLCBzcWwsIHRyaWVzID0gMTApIHtcbiAgICBpZiAoIXRyaWVzKSB0aHJvdyBuZXcgQmFja2VuZEVycm9yKDQyOSk7XG4gICAgY29uc3QgYXJnID0gdGlja2V0O1xuICAgIGNvbnN0IGlzT2JqID0gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCc7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB1cmw6ICcvcXVlcnknLFxuICAgICAgdGlja2V0OiBpc09iaiA/IGFyZy50aWNrZXQgOiB0aWNrZXQsXG4gICAgICBkYXRhOiB7XG4gICAgICAgICdxdWVyeSc6IGlzT2JqID8gYXJnLnF1ZXJ5IDogcXVlcnlTdHIsXG4gICAgICAgICdzb3J0JzogaXNPYmogPyBhcmcuc29ydCA6IHNvcnQsXG4gICAgICAgICdkYXRhYmFzZXMnOiBpc09iaiA/IGFyZy5kYXRhYmFzZXMgOiBkYXRhYmFzZXMsXG4gICAgICAgICd0b3AnOiBpc09iaiA/IGFyZy50b3AgOiB0b3AsXG4gICAgICAgICdsaW1pdCc6IGlzT2JqID8gYXJnLmxpbWl0IDogbGltaXQsXG4gICAgICAgICdmcm9tJzogaXNPYmogPyBhcmcuZnJvbSA6IGZyb20sXG4gICAgICAgICdzcWwnOiBpc09iaiA/IGFyZy5zcWwgOiBzcWwsXG4gICAgICB9LFxuICAgIH07XG4gICAgcmV0dXJuIGNhbGxfc2VydmVyKHBhcmFtcykuY2F0Y2goKGJhY2tlbmRFcnJvcikgPT4ge1xuICAgICAgaWYgKGJhY2tlbmRFcnJvci5jb2RlID09PSA5OTkpIHtcbiAgICAgICAgcmV0dXJuIHdhaXQoKS50aGVuKCgpID0+IEJyb3dzZXJCYWNrZW5kLnF1ZXJ5KHRpY2tldCwgcXVlcnlTdHIsIHNvcnQsIGRhdGFiYXNlcywgdG9wLCBsaW1pdCwgZnJvbSwgc3FsLCAtLXRyaWVzKSk7XG4gICAgICB9XG4gICAgICB0aHJvdyBiYWNrZW5kRXJyb3I7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBhbiBpbmRpdmlkdWFsIG9iamVjdCB3aXRoIHRoZSBzcGVjaWZpZWQgVVJJLlxuICAgKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IHRpY2tldCAtIFRoZSB0aWNrZXQgb3IgYW4gb2JqZWN0IHdpdGggdGhlIFwidGlja2V0XCIgcHJvcGVydHkuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmkgLSBUaGUgVVJJIG9mIHRoZSBpbmRpdmlkdWFsIHRvIHJldHJpZXZlIGluZm9ybWF0aW9uIGZvci5cbiAgICogQHBhcmFtIHtib29sZWFufSBjYWNoZSAtIChPcHRpb25hbCkgSW5kaWNhdGVzIHdoZXRoZXIgdG8gdXNlIGNhY2hlZCBkYXRhIG9yIGZldGNoIGZyZXNoIGRhdGEgZnJvbSB0aGUgc2VydmVyLlxuICAgKiAgIFRoZSBkZWZhdWx0IHZhbHVlIGlzIHRydWUuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8b2JqZWN0Pn0gQSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIHNlcnZlciByZXNwb25zZSBjb250YWluaW5nIHRoZSBpbmRpdmlkdWFsIG9iamVjdC5cbiAgICpcbiAgICogRXhhbXBsZSBzZXJ2ZXIgcmVzcG9uc2U6XG4gICAqIHtcbiAgICogICBcIkBcIjogXCJjZmc6VmVkYVN5c3RlbVwiLFxuICAgKiAgIFwicmRmOnR5cGVcIjogW1xuICAgKiAgICAge1wiZGF0YVwiOlwidi1zOlBlcnNvblwiLFwidHlwZVwiOlwiVXJpXCJ9XG4gICAqICAgXSxcbiAgICogICBcInJkZnM6aXNEZWZpbmVkQnlcIjogW1xuICAgKiAgICAge1wiZGF0YVwiOlwiaHR0cDovL3NlbWFudGljLW1hY2hpbmVzLmNvbS92ZWRhL3N5c3RlbS1hY2NvdW50XCIsXCJ0eXBlXCI6XCJVcmlcIn1cbiAgICogICBdLFxuICAgKiAgIFwicmRmczpsYWJlbFwiOiBbXG4gICAqICAgICB7XCJkYXRhXCI6XCLQodC40YHRgtC10LzQsFwiLFwibGFuZ1wiOlwiUlVcIixcInR5cGVcIjpcIlN0cmluZ1wifSxcbiAgICogICAgIHtcImRhdGFcIjpcIlN5c3RlbVwiLFwibGFuZ1wiOlwiRU5cIixcInR5cGVcIjpcIlN0cmluZ1wifVxuICAgKiAgIF0sXG4gICAqICAgLi4uXG4gICAqIH1cbiAgICovXG4gIHN0YXRpYyBhc3luYyBnZXRfaW5kaXZpZHVhbCAodGlja2V0LCB1cmksIGNhY2hlID0gdHJ1ZSkge1xuICAgIGNvbnN0IGFyZyA9IHRpY2tldDtcbiAgICBjb25zdCBpc09iaiA9IHR5cGVvZiBhcmcgPT09ICdvYmplY3QnO1xuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB1cmw6ICcvZ2V0X2luZGl2aWR1YWwnLFxuICAgICAgdGlja2V0OiBpc09iaiA/IGFyZy50aWNrZXQgOiB0aWNrZXQsXG4gICAgICBkYXRhOiB7XG4gICAgICAgICd1cmknOiBpc09iaiA/IGFyZy51cmkgOiB1cmksXG4gICAgICAgIC4uLighY2FjaGUgJiYgeyd2c24nOiBEYXRlLm5vdygpfSksXG4gICAgICB9LFxuICAgIH07XG4gICAgcmV0dXJuIGNhbGxfc2VydmVyKHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IG11bHRpcGxlIGluZGl2aWR1YWxzIG9iamVjdHMgd2l0aCB0aGUgc3BlY2lmaWVkIFVSSXMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0gdGlja2V0IC0gVGhlIHRpY2tldCBvciBhbiBvYmplY3Qgd2l0aCB0aGUgXCJ0aWNrZXRcIiBwcm9wZXJ0eS5cbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gdXJpcyAtIEFuIGFycmF5IG9mIFVSSXMgb2YgdGhlIGluZGl2aWR1YWxzIHRvIHJldHJpZXZlLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPG9iamVjdFtdPn0gQSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYW4gYXJyYXkgb2YgdGhlIHJlcXVlc3RlZCBpbmRpdmlkdWFscy5cbiAgICpcbiAgICogRXhhbXBsZSBzZXJ2ZXIgcmVzcG9uc2UgZm9yIG11bHRpcGxlIGluZGl2aWR1YWxzOlxuICAgKiBbXG4gICAqICAge1xuICAgKiAgICAgXCJAXCI6IFwiY2ZnOlZlZGFTeXN0ZW1cIixcbiAgICogICAgIFwicmRmOnR5cGVcIjogW1xuICAgKiAgICAgICB7XCJkYXRhXCI6XCJ2LXM6UGVyc29uXCIsXCJ0eXBlXCI6XCJVcmlcIn1cbiAgICogICAgIF0sXG4gICAqICAgICBcInJkZnM6aXNEZWZpbmVkQnlcIjogW1xuICAgKiAgICAgICB7XCJkYXRhXCI6XCJodHRwOi8vc2VtYW50aWMtbWFjaGluZXMuY29tL3ZlZGEvc3lzdGVtLWFjY291bnRcIixcInR5cGVcIjpcIlVyaVwifVxuICAgKiAgICAgXSxcbiAgICogICAgIFwicmRmczpsYWJlbFwiOiBbXG4gICAqICAgICAgIHtcImRhdGFcIjpcItCh0LjRgdGC0LXQvNCwXCIsXCJsYW5nXCI6XCJSVVwiLFwidHlwZVwiOlwiU3RyaW5nXCJ9LFxuICAgKiAgICAgICB7XCJkYXRhXCI6XCJTeXN0ZW1cIixcImxhbmdcIjpcIkVOXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIn1cbiAgICogICAgIF0sXG4gICAqICAgICAvLyBPdGhlciBwcm9wZXJ0aWVzIHNwZWNpZmljIHRvIHRoZSBpbmRpdmlkdWFsXG4gICAqICAgfSxcbiAgICogICAvLyBPdGhlciBpbmRpdmlkdWFsc1xuICAgKiBdXG4gICAqL1xuICBzdGF0aWMgYXN5bmMgZ2V0X2luZGl2aWR1YWxzICh0aWNrZXQsIHVyaXMpIHtcbiAgICBjb25zdCBhcmcgPSB0aWNrZXQ7XG4gICAgY29uc3QgaXNPYmogPSB0eXBlb2YgYXJnID09PSAnb2JqZWN0JztcbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHVybDogJy9nZXRfaW5kaXZpZHVhbHMnLFxuICAgICAgdGlja2V0OiBpc09iaiA/IGFyZy50aWNrZXQgOiB0aWNrZXQsXG4gICAgICBkYXRhOiB7XG4gICAgICAgICd1cmlzJzogaXNPYmogPyBhcmcudXJpcyA6IHVyaXMsXG4gICAgICB9LFxuICAgIH07XG4gICAgcmV0dXJuIGNhbGxfc2VydmVyKHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFuIGluZGl2aWR1YWwgd2l0aCB0aGUgc3BlY2lmaWVkIFVSSS5cbiAgICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSB0aWNrZXQgLSBUaGUgdGlja2V0IG9yIGFuIG9iamVjdCB3aXRoIHRoZSBcInRpY2tldFwiIHByb3BlcnR5LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJpIC0gVGhlIFVSSSBvZiB0aGUgaW5kaXZpZHVhbCB0byByZW1vdmUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBhc3NpZ25lZF9zdWJzeXN0ZW1zIC0gKE9wdGlvbmFsKSBUaGUgbnVtYmVyIG9mIGFzc2lnbmVkIHN1YnN5c3RlbXMuIERlZmF1bHQgaXMgMC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50X2lkIC0gKE9wdGlvbmFsKSBUaGUgSUQgb2YgdGhlIGV2ZW50IGFzc29jaWF0ZWQgd2l0aCB0aGUgcmVtb3ZhbC4gRGVmYXVsdCBpcyBhbiBlbXB0eSBzdHJpbmcuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0cmFuc2FjdGlvbl9pZCAtIChPcHRpb25hbCkgVGhlIElEIG9mIHRoZSB0cmFuc2FjdGlvbiBhc3NvY2lhdGVkIHdpdGggdGhlIHJlbW92YWwuIERlZmF1bHQgaXMgYW4gZW1wdHkgc3RyaW5nLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPG9iamVjdD59IEEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuIG9iamVjdCB3aXRoIHRoZSBvcGVyYXRpb24gSUQgYW5kIHJlc3VsdCBvZiB0aGUgcmVtb3ZhbC5cbiAgICpcbiAgICogVGhlIHJlc29sdmVkIG9iamVjdCB3aWxsIGhhdmUgdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICAgKiAtIG9wX2lkOiBUaGUgSUQgb2YgdGhlIG9wZXJhdGlvbiBmb3IgdGhlIHJlbW92YWwuXG4gICAqIC0gcmVzdWx0OiBUaGUgcmVzdWx0IHN0YXR1cyBjb2RlIG9mIHRoZSByZW1vdmFsIG9wZXJhdGlvbi5cbiAgICpcbiAgICogRXhhbXBsZSByZXNvbHZlZCBvYmplY3Q6XG4gICAqIHtcbiAgICogICBcIm9wX2lkXCI6XG4gICAqICAgXCJyZXN1bHRcIjogMjAwXG4gICAqIH1cbiAgICovXG4gIHN0YXRpYyBhc3luYyByZW1vdmVfaW5kaXZpZHVhbCAodGlja2V0LCB1cmksIGFzc2lnbmVkX3N1YnN5c3RlbXMsIGV2ZW50X2lkLCB0cmFuc2FjdGlvbl9pZCkge1xuICAgIGNvbnN0IGFyZyA9IHRpY2tldDtcbiAgICBjb25zdCBpc09iaiA9IHR5cGVvZiBhcmcgPT09ICdvYmplY3QnO1xuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICB1cmw6ICcvcmVtb3ZlX2luZGl2aWR1YWwnLFxuICAgICAgdGlja2V0OiBpc09iaiA/IGFyZy50aWNrZXQgOiB0aWNrZXQsXG4gICAgICBkYXRhOiB7XG4gICAgICAgICd1cmknOiBpc09iaiA/IGFyZy51cmkgOiB1cmksXG4gICAgICAgICdhc3NpZ25lZF9zdWJzeXN0ZW1zJzogKGlzT2JqID8gYXJnLmFzc2lnbmVkX3N1YnN5c3RlbXMgOiBhc3NpZ25lZF9zdWJzeXN0ZW1zKSB8fCAwLFxuICAgICAgICAncHJlcGFyZV9ldmVudHMnOiB0cnVlLFxuICAgICAgICAnZXZlbnRfaWQnOiAoaXNPYmogPyBhcmcuZXZlbnRfaWQgOiBldmVudF9pZCkgfHwgJycsXG4gICAgICAgICd0cmFuc2FjdGlvbl9pZCc6IChpc09iaiA/IGFyZy50cmFuc2FjdGlvbl9pZCA6IHRyYW5zYWN0aW9uX2lkKSB8fCAnJyxcbiAgICAgIH0sXG4gICAgfTtcbiAgICByZXR1cm4gY2FsbF9zZXJ2ZXIocGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNb2RpZnkgb3IgY3JlYXRlIGFuIGluZGl2aWR1YWwgaW4gdGhlIGRhdGFiYXNlIHVzaW5nIHRoZSBwcm92aWRlZCBpbmRpdmlkdWFsIGRhdGEuXG4gICAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0gdGlja2V0IC0gVGhlIHRpY2tldCBvciBhbiBvYmplY3Qgd2l0aCB0aGUgXCJ0aWNrZXRcIiBwcm9wZXJ0eS5cbiAgICogQHBhcmFtIHtvYmplY3R9IGluZGl2aWR1YWwgLSBUaGUgaW5kaXZpZHVhbCBvYmplY3QgdG8gbW9kaWZ5IG9yIGNyZWF0ZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGFzc2lnbmVkX3N1YnN5c3RlbXMgLSAoT3B0aW9uYWwpIFRoZSBudW1iZXIgb2YgYXNzaWduZWQgc3Vic3lzdGVtcy4gRGVmYXVsdCBpcyAwLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRfaWQgLSAoT3B0aW9uYWwpIFRoZSBJRCBvZiB0aGUgZXZlbnQgYXNzb2NpYXRlZCB3aXRoIHRoZSBtb2RpZmljYXRpb24uIERlZmF1bHQgaXMgYW4gZW1wdHkgc3RyaW5nLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHJhbnNhY3Rpb25faWQgLSAoT3B0aW9uYWwpIFRoZSBJRCBvZiB0aGUgdHJhbnNhY3Rpb24gYXNzb2NpYXRlZCB3aXRoIHRoZSBtb2RpZmljYXRpb24uIERlZmF1bHQgaXMgYW4gZW1wdHkgc3RyaW5nLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPG9iamVjdD59IEEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuIG9iamVjdCB3aXRoIHRoZSBvcGVyYXRpb24gSUQgYW5kIHJlc3VsdCBvZiB0aGUgbW9kaWZpY2F0aW9uLlxuICAgKlxuICAgKiBUaGUgcmVzb2x2ZWQgb2JqZWN0IHdpbGwgaGF2ZSB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gICAqIC0gb3BfaWQ6IFRoZSBJRCBvZiB0aGUgb3BlcmF0aW9uIGZvciB0aGUgbW9kaWZpY2F0aW9uLlxuICAgKiAtIHJlc3VsdDogVGhlIHJlc3VsdCBzdGF0dXMgY29kZSBvZiB0aGUgbW9kaWZpY2F0aW9uIG9wZXJhdGlvbi5cbiAgICpcbiAgICogRXhhbXBsZSByZXNvbHZlZCBvYmplY3Q6XG4gICAqIHtcbiAgICogICBcIm9wX2lkXCI6IDc0MDAxLFxuICAgKiAgIFwicmVzdWx0XCI6IDIwMFxuICAgKiB9XG4gICAqL1xuICBzdGF0aWMgYXN5bmMgcHV0X2luZGl2aWR1YWwgKHRpY2tldCwgaW5kaXZpZHVhbCwgYXNzaWduZWRfc3Vic3lzdGVtcywgZXZlbnRfaWQsIHRyYW5zYWN0aW9uX2lkKSB7XG4gICAgY29uc3QgYXJnID0gdGlja2V0O1xuICAgIGNvbnN0IGlzT2JqID0gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCc7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgIHVybDogJy9wdXRfaW5kaXZpZHVhbCcsXG4gICAgICB0aWNrZXQ6IGlzT2JqID8gYXJnLnRpY2tldCA6IHRpY2tldCxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgJ2luZGl2aWR1YWwnOiBpc09iaiA/IGFyZy5pbmRpdmlkdWFsIDogaW5kaXZpZHVhbCxcbiAgICAgICAgJ2Fzc2lnbmVkX3N1YnN5c3RlbXMnOiAoaXNPYmogPyBhcmcuYXNzaWduZWRfc3Vic3lzdGVtcyA6IGFzc2lnbmVkX3N1YnN5c3RlbXMpIHx8IDAsXG4gICAgICAgICdwcmVwYXJlX2V2ZW50cyc6IHRydWUsXG4gICAgICAgICdldmVudF9pZCc6IChpc09iaiA/IGFyZy5ldmVudF9pZCA6IGV2ZW50X2lkKSB8fCAnJyxcbiAgICAgICAgJ3RyYW5zYWN0aW9uX2lkJzogKGlzT2JqID8gYXJnLnRyYW5zYWN0aW9uX2lkIDogdHJhbnNhY3Rpb25faWQpIHx8ICcnLFxuICAgICAgfSxcbiAgICB9O1xuICAgIHJldHVybiBjYWxsX3NlcnZlcihwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCB0byBhbiBpbmRpdmlkdWFsIGluIHRoZSBkYXRhYmFzZSB1c2luZyB0aGUgcHJvdmlkZWQgaW5kaXZpZHVhbCBkYXRhLlxuICAgKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IHRpY2tldCAtIFRoZSB0aWNrZXQgb3IgYW4gb2JqZWN0IHdpdGggdGhlIFwidGlja2V0XCIgcHJvcGVydHkuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBpbmRpdmlkdWFsIC0gVGhlIGluZGl2aWR1YWwgZGF0YSB0byBhZGQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBhc3NpZ25lZF9zdWJzeXN0ZW1zIC0gKE9wdGlvbmFsKSBUaGUgbnVtYmVyIG9mIGFzc2lnbmVkIHN1YnN5c3RlbXMuIERlZmF1bHQgaXMgMC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50X2lkIC0gKE9wdGlvbmFsKSBUaGUgSUQgb2YgdGhlIGV2ZW50IGFzc29jaWF0ZWQgd2l0aCB0aGUgYWRkaXRpb24uIERlZmF1bHQgaXMgYW4gZW1wdHkgc3RyaW5nLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHJhbnNhY3Rpb25faWQgLSAoT3B0aW9uYWwpIFRoZSBJRCBvZiB0aGUgdHJhbnNhY3Rpb24gYXNzb2NpYXRlZCB3aXRoIHRoZSBhZGRpdGlvbi4gRGVmYXVsdCBpcyBhbiBlbXB0eSBzdHJpbmcuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8b2JqZWN0Pn0gQSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYW4gb2JqZWN0IHdpdGggdGhlIG9wZXJhdGlvbiBJRCBhbmQgcmVzdWx0IG9mIHRoZSBhZGRpdGlvbi5cbiAgICpcbiAgICogVGhlIHJlc29sdmVkIG9iamVjdCB3aWxsIGhhdmUgdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICAgKiAtIG9wX2lkOiBUaGUgSUQgb2YgdGhlIG9wZXJhdGlvbiBmb3IgdGhlIGFkZGl0aW9uLlxuICAgKiAtIHJlc3VsdDogVGhlIHJlc3VsdCBzdGF0dXMgY29kZSBvZiB0aGUgYWRkaXRpb24gb3BlcmF0aW9uLlxuICAgKlxuICAgKiBFeGFtcGxlIHJlc29sdmVkIG9iamVjdDpcbiAgICoge1xuICAgKiAgIFwib3BfaWRcIjogNzQwMDEsXG4gICAqICAgXCJyZXN1bHRcIjogMjAwXG4gICAqIH1cbiAgICovXG4gIHN0YXRpYyBhc3luYyBhZGRfdG9faW5kaXZpZHVhbCAodGlja2V0LCBpbmRpdmlkdWFsLCBhc3NpZ25lZF9zdWJzeXN0ZW1zLCBldmVudF9pZCwgdHJhbnNhY3Rpb25faWQpIHtcbiAgICBjb25zdCBhcmcgPSB0aWNrZXQ7XG4gICAgY29uc3QgaXNPYmogPSB0eXBlb2YgYXJnID09PSAnb2JqZWN0JztcbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgdXJsOiAnL2FkZF90b19pbmRpdmlkdWFsJyxcbiAgICAgIHRpY2tldDogaXNPYmogPyBhcmcudGlja2V0IDogdGlja2V0LFxuICAgICAgZGF0YToge1xuICAgICAgICAnaW5kaXZpZHVhbCc6IGlzT2JqID8gYXJnLmluZGl2aWR1YWwgOiBpbmRpdmlkdWFsLFxuICAgICAgICAnYXNzaWduZWRfc3Vic3lzdGVtcyc6IChpc09iaiA/IGFyZy5hc3NpZ25lZF9zdWJzeXN0ZW1zIDogYXNzaWduZWRfc3Vic3lzdGVtcykgfHwgMCxcbiAgICAgICAgJ3ByZXBhcmVfZXZlbnRzJzogdHJ1ZSxcbiAgICAgICAgJ2V2ZW50X2lkJzogKGlzT2JqID8gYXJnLmV2ZW50X2lkIDogZXZlbnRfaWQpIHx8ICcnLFxuICAgICAgICAndHJhbnNhY3Rpb25faWQnOiAoaXNPYmogPyBhcmcudHJhbnNhY3Rpb25faWQgOiB0cmFuc2FjdGlvbl9pZCkgfHwgJycsXG4gICAgICB9LFxuICAgIH07XG4gICAgcmV0dXJuIGNhbGxfc2VydmVyKHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGEgdmFsdWUgaW4gYW4gaW5kaXZpZHVhbCBpbiB0aGUgZGF0YWJhc2UgdXNpbmcgdGhlIHByb3ZpZGVkIGluZGl2aWR1YWwgZGF0YS5cbiAgICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSB0aWNrZXQgLSBUaGUgdGlja2V0IG9yIGFuIG9iamVjdCB3aXRoIHRoZSBcInRpY2tldFwiIHByb3BlcnR5LlxuICAgKiBAcGFyYW0ge29iamVjdH0gaW5kaXZpZHVhbCAtIFRoZSBpbmRpdmlkdWFsIGRhdGEgdG8gdXBkYXRlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gYXNzaWduZWRfc3Vic3lzdGVtcyAtIChPcHRpb25hbCkgVGhlIG51bWJlciBvZiBhc3NpZ25lZCBzdWJzeXN0ZW1zLiBEZWZhdWx0IGlzIDAuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudF9pZCAtIChPcHRpb25hbCkgVGhlIElEIG9mIHRoZSBldmVudCBhc3NvY2lhdGVkIHdpdGggdGhlIHVwZGF0ZS4gRGVmYXVsdCBpcyBhbiBlbXB0eSBzdHJpbmcuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0cmFuc2FjdGlvbl9pZCAtIChPcHRpb25hbCkgVGhlIElEIG9mIHRoZSB0cmFuc2FjdGlvbiBhc3NvY2lhdGVkIHdpdGggdGhlIHVwZGF0ZS4gRGVmYXVsdCBpcyBhbiBlbXB0eSBzdHJpbmcuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8b2JqZWN0Pn0gQSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYW4gb2JqZWN0IHdpdGggdGhlIG9wZXJhdGlvbiBJRCBhbmQgcmVzdWx0IG9mIHRoZSB1cGRhdGUuXG4gICAqXG4gICAqIFRoZSByZXNvbHZlZCBvYmplY3Qgd2lsbCBoYXZlIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAgICogLSBvcF9pZDogVGhlIElEIG9mIHRoZSBvcGVyYXRpb24gZm9yIHRoZSBhZGRpdGlvbi5cbiAgICogLSByZXN1bHQ6IFRoZSByZXN1bHQgc3RhdHVzIGNvZGUgb2YgdGhlIGFkZGl0aW9uIG9wZXJhdGlvbi5cbiAgICpcbiAgICogRXhhbXBsZSByZXNvbHZlZCBvYmplY3Q6XG4gICAqIHtcbiAgICogICBcIm9wX2lkXCI6IDc0MDAxLFxuICAgKiAgIFwicmVzdWx0XCI6IDIwMFxuICAgKiB9XG4gICAqL1xuICBzdGF0aWMgYXN5bmMgc2V0X2luX2luZGl2aWR1YWwgKHRpY2tldCwgaW5kaXZpZHVhbCwgYXNzaWduZWRfc3Vic3lzdGVtcywgZXZlbnRfaWQsIHRyYW5zYWN0aW9uX2lkKSB7XG4gICAgY29uc3QgYXJnID0gdGlja2V0O1xuICAgIGNvbnN0IGlzT2JqID0gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCc7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgIHVybDogJy9zZXRfaW5faW5kaXZpZHVhbCcsXG4gICAgICB0aWNrZXQ6IGlzT2JqID8gYXJnLnRpY2tldCA6IHRpY2tldCxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgJ2luZGl2aWR1YWwnOiBpc09iaiA/IGFyZy5pbmRpdmlkdWFsIDogaW5kaXZpZHVhbCxcbiAgICAgICAgJ2Fzc2lnbmVkX3N1YnN5c3RlbXMnOiAoaXNPYmogPyBhcmcuYXNzaWduZWRfc3Vic3lzdGVtcyA6IGFzc2lnbmVkX3N1YnN5c3RlbXMpIHx8IDAsXG4gICAgICAgICdwcmVwYXJlX2V2ZW50cyc6IHRydWUsXG4gICAgICAgICdldmVudF9pZCc6IChpc09iaiA/IGFyZy5ldmVudF9pZCA6IGV2ZW50X2lkKSB8fCAnJyxcbiAgICAgICAgJ3RyYW5zYWN0aW9uX2lkJzogKGlzT2JqID8gYXJnLnRyYW5zYWN0aW9uX2lkIDogdHJhbnNhY3Rpb25faWQpIHx8ICcnLFxuICAgICAgfSxcbiAgICB9O1xuICAgIHJldHVybiBjYWxsX3NlcnZlcihwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIHZhbHVlIGZyb20gYW4gaW5kaXZpZHVhbCBpbiB0aGUgZGF0YWJhc2UgdXNpbmcgdGhlIHByb3ZpZGVkIGluZGl2aWR1YWwgZGF0YS5cbiAgICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSB0aWNrZXQgLSBUaGUgdGlja2V0IG9yIGFuIG9iamVjdCB3aXRoIHRoZSBcInRpY2tldFwiIHByb3BlcnR5LlxuICAgKiBAcGFyYW0ge29iamVjdH0gaW5kaXZpZHVhbCAtIFRoZSBpbmRpdmlkdWFsIGRhdGEgdG8gcmVtb3ZlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gYXNzaWduZWRfc3Vic3lzdGVtcyAtIChPcHRpb25hbCkgVGhlIG51bWJlciBvZiBhc3NpZ25lZCBzdWJzeXN0ZW1zLiBEZWZhdWx0IGlzIDAuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudF9pZCAtIChPcHRpb25hbCkgVGhlIElEIG9mIHRoZSBldmVudCBhc3NvY2lhdGVkIHdpdGggdGhlIHJlbW92YWwuIERlZmF1bHQgaXMgYW4gZW1wdHkgc3RyaW5nLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHJhbnNhY3Rpb25faWQgLSAoT3B0aW9uYWwpIFRoZSBJRCBvZiB0aGUgdHJhbnNhY3Rpb24gYXNzb2NpYXRlZCB3aXRoIHRoZSByZW1vdmFsLiBEZWZhdWx0IGlzIGFuIGVtcHR5IHN0cmluZy5cbiAgICogQHJldHVybiB7UHJvbWlzZTxvYmplY3Q+fSBBIFByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhbiBvYmplY3Qgd2l0aCB0aGUgb3BlcmF0aW9uIElEIGFuZCByZXN1bHQgb2YgdGhlIHJlbW92YWwuXG4gICAqXG4gICAqIFRoZSByZXNvbHZlZCBvYmplY3Qgd2lsbCBoYXZlIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAgICogLSBvcF9pZDogVGhlIElEIG9mIHRoZSBvcGVyYXRpb24gZm9yIHRoZSByZW1vdmFsLlxuICAgKiAtIHJlc3VsdDogVGhlIHJlc3VsdCBzdGF0dXMgY29kZSBvZiB0aGUgcmVtb3ZhbCBvcGVyYXRpb24uXG4gICAqXG4gICAqIEV4YW1wbGUgcmVzb2x2ZWQgb2JqZWN0OlxuICAgKiB7XG4gICAqICAgXCJvcF9pZFwiOiA3NDAwMSxcbiAgICogICBcInJlc3VsdFwiOiAyMDBcbiAgICogfVxuICAgKi9cbiAgc3RhdGljIGFzeW5jIHJlbW92ZV9mcm9tX2luZGl2aWR1YWwgKHRpY2tldCwgaW5kaXZpZHVhbCwgYXNzaWduZWRfc3Vic3lzdGVtcywgZXZlbnRfaWQsIHRyYW5zYWN0aW9uX2lkKSB7XG4gICAgY29uc3QgYXJnID0gdGlja2V0O1xuICAgIGNvbnN0IGlzT2JqID0gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCc7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgIHVybDogJy9yZW1vdmVfZnJvbV9pbmRpdmlkdWFsJyxcbiAgICAgIHRpY2tldDogaXNPYmogPyBhcmcudGlja2V0IDogdGlja2V0LFxuICAgICAgZGF0YToge1xuICAgICAgICAnaW5kaXZpZHVhbCc6IGlzT2JqID8gYXJnLmluZGl2aWR1YWwgOiBpbmRpdmlkdWFsLFxuICAgICAgICAnYXNzaWduZWRfc3Vic3lzdGVtcyc6IChpc09iaiA/IGFyZy5hc3NpZ25lZF9zdWJzeXN0ZW1zIDogYXNzaWduZWRfc3Vic3lzdGVtcykgfHwgMCxcbiAgICAgICAgJ3ByZXBhcmVfZXZlbnRzJzogdHJ1ZSxcbiAgICAgICAgJ2V2ZW50X2lkJzogKGlzT2JqID8gYXJnLmV2ZW50X2lkIDogZXZlbnRfaWQpIHx8ICcnLFxuICAgICAgICAndHJhbnNhY3Rpb25faWQnOiAoaXNPYmogPyBhcmcudHJhbnNhY3Rpb25faWQgOiB0cmFuc2FjdGlvbl9pZCkgfHwgJycsXG4gICAgICB9LFxuICAgIH07XG4gICAgcmV0dXJuIGNhbGxfc2VydmVyKHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogTW9kaWZ5IG9yIGNyZWF0ZSBtdWx0aXBsZSBpbmRpdmlkdWFscyBpbiB0aGUgZGF0YWJhc2UgdXNpbmcgdGhlIHByb3ZpZGVkIGluZGl2aWR1YWwgZGF0YS5cbiAgICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSB0aWNrZXQgLSBUaGUgdGlja2V0IG9yIGFuIG9iamVjdCB3aXRoIHRoZSBcInRpY2tldFwiIHByb3BlcnR5LlxuICAgKiBAcGFyYW0ge29iamVjdFtdfSBpbmRpdmlkdWFscyAtIEFuIGFycmF5IG9mIGluZGl2aWR1YWwgZGF0YSB0byBtb2RpZnkuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBhc3NpZ25lZF9zdWJzeXN0ZW1zIC0gKE9wdGlvbmFsKSBUaGUgbnVtYmVyIG9mIGFzc2lnbmVkIHN1YnN5c3RlbXMuIERlZmF1bHQgaXMgMC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50X2lkIC0gKE9wdGlvbmFsKSBUaGUgSUQgb2YgdGhlIGV2ZW50IGFzc29jaWF0ZWQgd2l0aCB0aGUgbW9kaWZpY2F0aW9uLiBEZWZhdWx0IGlzIGFuIGVtcHR5IHN0cmluZy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHRyYW5zYWN0aW9uX2lkIC0gKE9wdGlvbmFsKSBUaGUgSUQgb2YgdGhlIHRyYW5zYWN0aW9uIGFzc29jaWF0ZWQgd2l0aCB0aGUgbW9kaWZpY2F0aW9uLiBEZWZhdWx0IGlzIGFuIGVtcHR5IHN0cmluZy5cbiAgICogQHJldHVybiB7UHJvbWlzZTxvYmplY3Q+fSBBIFByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhbiBvYmplY3Qgd2l0aCB0aGUgb3BlcmF0aW9uIElEIGFuZCByZXN1bHQgb2YgdGhlIG1vZGlmaWNhdGlvbi5cbiAgICpcbiAgICogVGhlIHJlc29sdmVkIG9iamVjdCB3aWxsIGhhdmUgdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICAgKiAtIG9wX2lkOiBUaGUgSUQgb2YgdGhlIG9wZXJhdGlvbiBmb3IgdGhlIG1vZGlmaWNhdGlvbi5cbiAgICogLSByZXN1bHQ6IFRoZSByZXN1bHQgc3RhdHVzIGNvZGUgb2YgdGhlIG1vZGlmaWNhdGlvbiBvcGVyYXRpb24uXG4gICAqXG4gICAqIEV4YW1wbGUgcmVzb2x2ZWQgb2JqZWN0OlxuICAgKiB7XG4gICAqICAgXCJvcF9pZFwiOiA3NDAwMSxcbiAgICogICBcInJlc3VsdFwiOiAyMDBcbiAgICogfVxuICAgKi9cbiAgc3RhdGljIGFzeW5jIHB1dF9pbmRpdmlkdWFscyAodGlja2V0LCBpbmRpdmlkdWFscywgYXNzaWduZWRfc3Vic3lzdGVtcywgZXZlbnRfaWQsIHRyYW5zYWN0aW9uX2lkKSB7XG4gICAgY29uc3QgYXJnID0gdGlja2V0O1xuICAgIGNvbnN0IGlzT2JqID0gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCc7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgIHVybDogJy9wdXRfaW5kaXZpZHVhbHMnLFxuICAgICAgdGlja2V0OiBpc09iaiA/IGFyZy50aWNrZXQgOiB0aWNrZXQsXG4gICAgICBkYXRhOiB7XG4gICAgICAgICdpbmRpdmlkdWFscyc6IGlzT2JqID8gYXJnLmluZGl2aWR1YWxzIDogaW5kaXZpZHVhbHMsXG4gICAgICAgICdhc3NpZ25lZF9zdWJzeXN0ZW1zJzogKGlzT2JqID8gYXJnLmFzc2lnbmVkX3N1YnN5c3RlbXMgOiBhc3NpZ25lZF9zdWJzeXN0ZW1zKSB8fCAwLFxuICAgICAgICAncHJlcGFyZV9ldmVudHMnOiB0cnVlLFxuICAgICAgICAnZXZlbnRfaWQnOiAoaXNPYmogPyBhcmcuZXZlbnRfaWQgOiBldmVudF9pZCkgfHwgJycsXG4gICAgICAgICd0cmFuc2FjdGlvbl9pZCc6IChpc09iaiA/IGFyZy50cmFuc2FjdGlvbl9pZCA6IHRyYW5zYWN0aW9uX2lkKSB8fCAnJyxcbiAgICAgIH0sXG4gICAgfTtcbiAgICByZXR1cm4gY2FsbF9zZXJ2ZXIocGFyYW1zKTtcbiAgfVxufVxuXG4vKipcbiAqIE1ha2UgYSBzZXJ2ZXIgcmVxdWVzdCB1c2luZyB0aGUgcHJvdmlkZWQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXMgLSBUaGUgcGFyYW1ldGVycyBmb3IgdGhlIHNlcnZlciByZXF1ZXN0LlxuICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtcy51cmwgLSBUaGUgVVJMIG9mIHRoZSBzZXJ2ZXIgZW5kcG9pbnQuXG4gKiBAcGFyYW0ge3N0cmluZ30gcGFyYW1zLm1ldGhvZCAtIFRoZSBIVFRQIG1ldGhvZCBmb3IgdGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge29iamVjdH0gcGFyYW1zLmRhdGEgLSBUaGUgZGF0YSB0byBiZSBzZW50IHdpdGggdGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge3N0cmluZ30gcGFyYW1zLnRpY2tldCAtIFRoZSB0aWNrZXQgYXNzb2NpYXRlZCB3aXRoIHRoZSByZXF1ZXN0LlxuICogQHJldHVybiB7UHJvbWlzZTxvYmplY3Q+fSBBIFByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgSlNPTiByZXNwb25zZSBmcm9tIHRoZSBzZXJ2ZXIuXG4gKiBAdGhyb3dzIHtCYWNrZW5kRXJyb3J9IElmIHRoZSBzZXJ2ZXIgcmVzcG9uc2Ugc3RhdHVzIGlzIG5vdCBva2F5LlxuICovXG5hc3luYyBmdW5jdGlvbiBjYWxsX3NlcnZlciAocGFyYW1zKSB7XG4gIGNvbnN0IHVybCA9IG5ldyBVUkwocGFyYW1zLnVybCwgbG9jYXRpb24ub3JpZ2luKTtcbiAgaWYgKHBhcmFtcy5tZXRob2QgPT09ICdHRVQnKSB7XG4gICAgcGFyYW1zLmRhdGEgPSBwYXJhbXMuZGF0YSAmJiBPYmplY3QuZW50cmllcyhwYXJhbXMuZGF0YSkuZmlsdGVyKChbXywgdmFsdWVdKSA9PiB0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnKSB8fCAnJztcbiAgICB1cmwuc2VhcmNoID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhwYXJhbXMuZGF0YSkudG9TdHJpbmcoKTtcbiAgfVxuICBpZiAocGFyYW1zLnRpY2tldCkge1xuICAgIHVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKCd0aWNrZXQnLCBwYXJhbXMudGlja2V0KTtcbiAgfVxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwge1xuICAgIG1ldGhvZDogcGFyYW1zLm1ldGhvZCxcbiAgICBtb2RlOiAnc2FtZS1vcmlnaW4nLFxuICAgIGNhY2hlOiAnbm8tY2FjaGUnLFxuICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuICAgIC4uLihwYXJhbXMubWV0aG9kICE9PSAnR0VUJyAmJiB7XG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGFyYW1zLmRhdGEpLFxuICAgIH0pLFxuICB9KTtcbiAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgfVxuICB0aHJvdyBuZXcgQmFja2VuZEVycm9yKHJlc3BvbnNlLnN0YXR1cyk7XG59XG5cbi8qKlxuICogV2FpdCBmb3IgYSBzcGVjaWZpZWQgYW1vdW50IG9mIHRpbWUuXG4gKiBAcGFyYW0ge251bWJlcn0gW21zPTEwMDBdIC0gVGhlIHRpbWUgdG8gd2FpdCBpbiBtaWxsaXNlY29uZHMuIERlZmF1bHQgaXMgMTAwMG1zICgxIHNlY29uZCkuXG4gKiBAcmV0dXJuIHtQcm9taXNlPHZvaWQ+fSBBIFByb21pc2UgdGhhdCByZXNvbHZlcyBhZnRlciB0aGUgc3BlY2lmaWVkIHRpbWUgaGFzIGVsYXBzZWQuXG4gKi9cbmZ1bmN0aW9uIHdhaXQgKG1zID0gMTAwMCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKTtcbn1cblxuLyoqXG4gKiBBZGp1c3QgdGhlIHRpY2tldCByZXNwb25zZSB0byBhIHN0YW5kYXJkaXplZCBmb3JtYXQuXG4gKiBAcGFyYW0ge29iamVjdH0gcmVzdWx0IC0gVGhlIHRpY2tldCByZXNwb25zZSBmcm9tIHRoZSBzZXJ2ZXIuXG4gKiBAcmV0dXJuIHtvYmplY3R9IFRoZSBhZGp1c3RlZCB0aWNrZXQgb2JqZWN0IHdpdGggc3RhbmRhcmRpemVkIHByb3BlcnRpZXMuXG4gKi9cbmZ1bmN0aW9uIGFkanVzdFRpY2tldCAocmVzdWx0KSB7XG4gIHJldHVybiB7XG4gICAgdGlja2V0OiByZXN1bHQuaWQsXG4gICAgdXNlcl91cmk6IHJlc3VsdC51c2VyX3VyaSxcbiAgICBlbmRfdGltZTogTWF0aC5mbG9vcigocmVzdWx0LmVuZF90aW1lIC0gNjIxMzU1OTY4MDAwMDAwMDAwKSAvIDEwMDAwKSxcbiAgfTtcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O2lEQUNBLHFKQUFBQSxtQkFBQSxZQUFBQSxDQUFBLFdBQUFDLE9BQUEsU0FBQUEsT0FBQSxPQUFBQyxFQUFBLEdBQUFDLE1BQUEsQ0FBQUMsU0FBQSxFQUFBQyxNQUFBLEdBQUFILEVBQUEsQ0FBQUksY0FBQSxFQUFBQyxjQUFBLEdBQUFKLE1BQUEsQ0FBQUksY0FBQSxjQUFBQyxHQUFBLEVBQUFDLEdBQUEsRUFBQUMsSUFBQSxJQUFBRixHQUFBLENBQUFDLEdBQUEsSUFBQUMsSUFBQSxDQUFBQyxLQUFBLEtBQUFDLE9BQUEsd0JBQUFDLE1BQUEsR0FBQUEsTUFBQSxPQUFBQyxjQUFBLEdBQUFGLE9BQUEsQ0FBQUcsUUFBQSxrQkFBQUMsbUJBQUEsR0FBQUosT0FBQSxDQUFBSyxhQUFBLHVCQUFBQyxpQkFBQSxHQUFBTixPQUFBLENBQUFPLFdBQUEsOEJBQUFDLE9BQUFaLEdBQUEsRUFBQUMsR0FBQSxFQUFBRSxLQUFBLFdBQUFSLE1BQUEsQ0FBQUksY0FBQSxDQUFBQyxHQUFBLEVBQUFDLEdBQUEsSUFBQUUsS0FBQSxFQUFBQSxLQUFBLEVBQUFVLFVBQUEsTUFBQUMsWUFBQSxNQUFBQyxRQUFBLFNBQUFmLEdBQUEsQ0FBQUMsR0FBQSxXQUFBVyxNQUFBLG1CQUFBSSxHQUFBLElBQUFKLE1BQUEsWUFBQUEsQ0FBQVosR0FBQSxFQUFBQyxHQUFBLEVBQUFFLEtBQUEsV0FBQUgsR0FBQSxDQUFBQyxHQUFBLElBQUFFLEtBQUEsZ0JBQUFjLEtBQUFDLE9BQUEsRUFBQUMsT0FBQSxFQUFBQyxJQUFBLEVBQUFDLFdBQUEsUUFBQUMsY0FBQSxHQUFBSCxPQUFBLElBQUFBLE9BQUEsQ0FBQXZCLFNBQUEsWUFBQTJCLFNBQUEsR0FBQUosT0FB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