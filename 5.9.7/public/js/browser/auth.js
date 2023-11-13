"use strict";

System.register(["../common/veda.js", "../common/backend.js", "../common/individual_model.js", "../common/lib/sha256.js", "../browser/dom_helpers.js", "captcha"], function (_export, _context) {
  "use strict";

  var veda, Backend, IndividualModel, Sha256, delegateHandler, clear, Captcha, storage, loginForm, re, changePasswordPressed, activityHandler, bc, refreshInterval;
  function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function () { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function (obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function (skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function () { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function (exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function (type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function (record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function (finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function (tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function (iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
  function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
  /**
   * Authenticate user using NTLM provider
   * @param {string} path - The path to the NTLM provider
   * @param {string} login - The user's login
   * @param {string} password - The user's password
   * @return {Promise<Object>} - A promise that resolves to the authentication result
   */
  function ntlmAuth(path, login, password) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open(login && password ? 'POST' : 'GET', path, true);
      xhr.withCredentials = true;
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      xhr.responseType = 'json';
      xhr.onload = function () {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(Error('NTLM auth failed'));
        }
      };
      xhr.onerror = reject;
      xhr.onabort = reject;
      login && password ? xhr.send("username=".concat(encodeURIComponent(login), "&password=").concat(encodeURIComponent(password))) : xhr.send();
    });
  }
  /**
   * Handles the submit event for login form
   * @param {Event} event - The submit event
   * @return {void}
   */
  function submitLoginPassword(event) {
    event.preventDefault();
    var passwordInput = loginForm.querySelector('#password');
    var login = loginForm.querySelector('#login').value.trim();
    var password = passwordInput.value;
    var hash = Sha256.hash(password);
    passwordInput.value = '';
    var ntlmProvider = new IndividualModel('cfg:NTLMAuthProvider', true, false);
    return ntlmProvider.load().then(function () {
      var path = !ntlmProvider.hasValue('v-s:deleted', true) && ntlmProvider.hasValue('rdf:value') && ntlmProvider.get('rdf:value')[0];
      if (path) {
        return ntlmAuth(path, login, password);
      } else {
        return Promise.reject(Error('NTLM auth provider provider is not defined'));
      }
    }).catch(function (error) {
      console.error('NTLM auth failed');
      return Backend.authenticate(login, hash);
    }).then(handleLoginSuccess).catch(handleLoginError);
  }
  /**
   * Show element
   * @param {HTMLElement} el
   * @return {void}
   */
  function show(el) {
    el.style.display = 'block';
  }

  /**
   * Hide element
   * @param {HTMLElement} el
   * @return {void}
   */
  function hide(el) {
    el.style.display = 'none';
  }

  /**
   * Validate new password
   * @param {Event} event
   * @return {void}
   */
  function validateNewPassword() {
    var submit = loginForm.querySelector('#submit-new-password');
    var newPassword = loginForm.querySelector('#new-password');
    var confirmNewPassword = loginForm.querySelector('#confirm-new-password');
    var passwordStrength = loginForm.querySelector('.password-strength');
    var passwordMustMatch = loginForm.querySelector('.password-must-match');
    var secret = loginForm.querySelector('#secret');
    var enterSecret = loginForm.querySelector('.enter-secret');
    var reMatch = re.test(newPassword.value);
    var passwordsMatch = confirmNewPassword.value === newPassword.value;
    var isSecret = !!secret.value;
    var isValid = reMatch && passwordsMatch && isSecret;
    if (!reMatch) {
      show(passwordStrength);
    } else {
      hide(passwordStrength);
    }
    if (!passwordsMatch) {
      show(passwordMustMatch);
    } else {
      hide(passwordMustMatch);
    }
    if (!isSecret) {
      show(enterSecret);
    } else {
      hide(enterSecret);
    }
    if (!isValid) {
      submit.setAttribute('disabled', 'disabled');
    } else {
      submit.removeAttribute('disabled');
    }
  }
  /**
   * Login error handler
   * @param {Error} error
   * @return {void}
   */
  function handleLoginError(error) {
    var enterLoginPassword = loginForm.querySelector('#enter-login-password');
    hide(enterLoginPassword);
    var enterNewPassword = loginForm.querySelector('#enter-new-password');
    hide(enterNewPassword);
    var invalidSecretWarning = loginForm.querySelector('#invalid-secret-warning');
    var emptyPasswordWarning = loginForm.querySelector('#empty-password-warning');
    var equalPasswordWarning = loginForm.querySelector('#equal-password-warning');
    var invalidPasswordWarning = loginForm.querySelector('#invalid-password-warning');
    var frequentPassChangeWarning = loginForm.querySelector('#frequent-pass-change-warning');
    var passChangeNotAllowedWarning = loginForm.querySelector('#pass-change-not-allowed-warning');
    var secretExpiredWarning = loginForm.querySelector('#secret-expired-warning');
    var passwordExpiredError = loginForm.querySelector('#password-expired-error');
    var loginFailedError = loginForm.querySelector('#login-failed-error');
    var authLockedError = loginForm.querySelector('#auth-locked-error');
    var passChangeLockedError = loginForm.querySelector('#pass-change-locked-error');
    var unavailableError = loginForm.querySelector('#unavailable-error');
    var networkError = loginForm.querySelector('#network-error');
    var secretRequestInfo = loginForm.querySelector('#secret-request-info');
    var alerts = loginForm.querySelectorAll('.alert');
    Array.prototype.forEach.call(alerts, function (alert) {
      return hide(alert);
    });
    var inputs = loginForm.querySelectorAll('input:not(#login)');
    Array.prototype.forEach.call(inputs, function (input) {
      return input.value = '';
    });
    var ok = loginForm.querySelector('.btn.ok');
    hide(ok);
    var _okHandler12 = function okHandler() {
      return true;
    };

    // Captcha
    var myCaptcha = new Captcha({
      el: '#captcha-input',
      requiredValue: '',
      clearOnSubmit: true,
      resetOnError: true,
      focusOnError: true,
      canvasClass: 'captcha-canvas',
      canvasStyle: {
        width: 100,
        height: 15,
        textBaseline: 'top',
        font: '15px sans-serif',
        textAlign: 'left',
        fillStyle: '#000'
      },
      callback: function callback(response, $captchaInputElement, numberOfTries) {
        if (response === 'success') {
          Array.prototype.forEach.call(loginForm.querySelectorAll('.alert, .fieldset'), function (item) {
            return hide(item);
          });
          show(enterLoginPassword);
        }
        if (response === 'error') {
          return;
        }
      }
    });
    function captchaSubmit(e) {
      myCaptcha.validate();
    }
    ;
    document.getElementById('captcha-submit').addEventListener('click', captchaSubmit);
    document.getElementById('captcha-input').addEventListener('change', captchaSubmit);
    switch (error.code) {
      case 0:
        // Network error
        show(networkError);
        show(ok);
        _okHandler12 = function okHandler() {
          hide(networkError);
          show(enterLoginPassword);
          ok.removeEventListener('click', _okHandler12);
          hide(ok);
        };
        break;
      case 423:
        // Password change is allowed once a day
        show(frequentPassChangeWarning);
        show(ok);
        _okHandler12 = function _okHandler() {
          hide(frequentPassChangeWarning);
          show(enterLoginPassword);
          ok.removeEventListener('click', _okHandler12);
          hide(ok);
        };
        break;
      case 429:
        // Too many auth fails
        show(authLockedError);
        show(ok);
        _okHandler12 = function _okHandler2() {
          hide(authLockedError);
          show(enterLoginPassword);
          ok.removeEventListener('click', _okHandler12);
          hide(ok);
        };
        break;
      case 430:
        // Too many pass change fails
        show(passChangeLockedError);
        show(ok);
        _okHandler12 = function _okHandler3() {
          hide(passChangeLockedError);
          show(enterLoginPassword);
          ok.removeEventListener('click', _okHandler12);
          hide(ok);
        };
        break;
      case 463:
        // Password change not allowed
        show(passChangeNotAllowedWarning);
        show(ok);
        _okHandler12 = function _okHandler4() {
          hide(passChangeNotAllowedWarning);
          show(enterLoginPassword);
          ok.removeEventListener('click', _okHandler12);
          hide(ok);
        };
        break;
      case 464:
        // Secret expired
        show(secretExpiredWarning);
        show(ok);
        _okHandler12 = function _okHandler5() {
          hide(secretExpiredWarning);
          show(enterLoginPassword);
          ok.removeEventListener('click', _okHandler12);
          hide(ok);
        };
        break;
      case 465:
        // Empty password
        show(emptyPasswordWarning);
        show(ok);
        _okHandler12 = function _okHandler6() {
          hide(emptyPasswordWarning);
          show(enterLoginPassword);
          ok.removeEventListener('click', _okHandler12);
          hide(ok);
        };
        break;
      case 466:
        // New password is equal to old
        show(equalPasswordWarning);
        show(ok);
        _okHandler12 = function _okHandler7() {
          hide(equalPasswordWarning);
          show(enterLoginPassword);
          ok.removeEventListener('click', _okHandler12);
          hide(ok);
        };
        break;
      case 467:
        // Invalid password
        show(invalidPasswordWarning);
        show(ok);
        _okHandler12 = function _okHandler8() {
          hide(invalidPasswordWarning);
          show(enterLoginPassword);
          ok.removeEventListener('click', _okHandler12);
          hide(ok);
        };
        break;
      case 468:
        // Invalid secret
        show(invalidSecretWarning);
        show(ok);
        _okHandler12 = function _okHandler9() {
          hide(invalidSecretWarning);
          show(enterLoginPassword);
          ok.removeEventListener('click', _okHandler12);
          hide(ok);
        };
        break;
      case 469:
        // Password expired
        if (!changePasswordPressed) {
          show(passwordExpiredError);
          show(secretRequestInfo);
          show(ok);
          _okHandler12 = function _okHandler10() {
            hide(passwordExpiredError);
            show(enterNewPassword);
            ok.removeEventListener('click', _okHandler12);
            hide(ok);
          };
        } else {
          show(enterNewPassword);
          show(secretRequestInfo);
        }
        break;
      case 472: // Not authorized
      case 473:
        // Authentication failed
        show(loginFailedError);
        hide(enterLoginPassword);
        break;
      default:
        show(unavailableError);
        show(ok);
        _okHandler12 = function _okHandler11() {
          hide(unavailableError);
          show(enterLoginPassword);
          ok.removeEventListener('click', _okHandler12);
          hide(ok);
        };
        break;
    }
    ok.addEventListener('click', _okHandler12);
  }

  /**
   * Handles login success
   * @param {Object} authResult - The authentication result
   * @return {void}
   */
  function handleLoginSuccess(authResult) {
    var enterLoginPassword = loginForm.querySelector('#enter-login-password');
    var alerts = loginForm.querySelectorAll('.alert');
    Array.prototype.forEach.call(alerts, function (alert) {
      return hide(alert);
    });
    var inputs = loginForm.querySelectorAll('input:not(#login)');
    Array.prototype.forEach.call(inputs, function (input) {
      return input.value = '';
    });
    var ok = loginForm.querySelector('.btn.ok');
    hide(ok);
    show(enterLoginPassword);
    initWithCredentials(authResult);
  }

  /**
   * Set ticket cookie
   * @param {string} ticket
   * @param {number} expires
   * @return {void}
   */
  function setTicketCookie(ticket, expires) {
    var cookie = 'ticket=' + ticket + '; expires=' + new Date(parseInt(expires)).toGMTString() + '; samesite=strict; path=/;' + (window.location.protocol === 'https:' ? 'secure;' : '');
    document.cookie = cookie;
  }

  /**
   * Delete ticket cookie
   * @return {void}
   */
  function delTicketCookie() {
    setTicketCookie(null, 0);
  }

  /**
   * Handles authentication errors
   * @return {void}
   */
  function handleAuthError() {
    var appContainer = document.getElementById('app');
    clear(appContainer);
    delete storage.ticket;
    delete storage.user_uri;
    delete storage.end_time;
    delTicketCookie();
    if (storage.logout) {
      show(loginForm);
      delete storage.logout;
      return;
    }

    // Auto login using NTLM
    var ntlmProvider = new IndividualModel('cfg:NTLMAuthProvider', true, false);
    ntlmProvider.load().then(function () {
      var path = !ntlmProvider.hasValue('v-s:deleted', true) && ntlmProvider.hasValue('rdf:value') && ntlmProvider.get('rdf:value')[0];
      if (path) {
        ntlmAuth(path).then(function (authResult) {
          return initWithCredentials(authResult);
        }).catch(function (err) {
          console.error('NTLM auth failed');
          show(loginForm);
        });
      } else {
        show(loginForm);
      }
    }).catch(function (error) {
      show(loginForm);
    });
  }

  // Activity handler

  /**
   * Handles authentication success
   * @param {Object} authResult - The authentication result
   * @param {boolean} [isBroadcast=false] - Indicates if the authentication result is from a broadcast message
   * @return {void}
   */
  function handleAuthSuccess(authResult) {
    var isBroadcast = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (!isBroadcast) bc.postMessage(authResult);
    veda.user_uri = storage.user_uri = authResult.user_uri;
    veda.ticket = storage.ticket = authResult.ticket;
    veda.end_time = storage.end_time = authResult.end_time;
    setTicketCookie(veda.ticket, veda.end_time);
    // Re-login on ticket expiration
    if (veda.end_time) {
      var granted = Date.now();
      var expires = parseInt(veda.end_time);
      var lifetime = expires > granted ? expires - granted : 0;
      var hh = Math.floor(lifetime / 1000 / 60 / 60);
      var mm = Math.floor(lifetime % (1000 * 60 * 60) / 1000 / 60);
      var ss = Math.floor(lifetime % (1000 * 60) / 1000);
      console.log("Ticket will expire in ".concat(hh < 10 ? '0' + hh : hh, ":").concat(mm < 10 ? '0' + mm : mm, ":").concat(ss < 10 ? '0' + ss : ss));
      clearInterval(refreshInterval);
      refreshInterval = setInterval(function () {
        var expired = expires <= Date.now();
        var almostExpired = expires - lifetime * 0.1 <= Date.now() && !expired;
        var expiresSoon = expires - lifetime * 0.2 <= Date.now() && !expired;
        if (expired || almostExpired) {
          clearInterval(refreshInterval);
          console.log('Ticket expired, re-login.');
          handleAuthError();
        } else if (expiresSoon && granted < Number(localStorage.lastActivity)) {
          clearInterval(refreshInterval);
          console.log('Refresh ticket in background.');
          Backend.get_ticket_trusted(veda.ticket).then(handleAuthSuccess).catch(handleAuthError);
        }
      }, 10000);
    }
  }

  /**
   * Initializes the application with the provided authentication result
   * @param {Object} authResult - The authentication result
   * @return {void}
   */
  function initWithCredentials(authResult) {
    hide(loginForm);
    handleAuthSuccess(authResult);
    var loadIndicator = document.getElementById('load-indicator');
    var loadIndicatorTimer = setTimeout(function () {
      return loadIndicator.style.display = '';
    }, 250);
    veda.init(veda.user_uri).then(function () {
      clearTimeout(loadIndicatorTimer);
      hide(loadIndicator);
      veda.trigger('started');
    });
  }

  // Logout handler
  function auth() {
    return _auth.apply(this, arguments);
  }
  function _auth() {
    _auth = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var loadIndicator, loadIndicatorTimer, ticket, user_uri, end_time, valid, _yield$Backend$authen, _ticket, _user_uri, _end_time, authRequiredParam, _authRequiredParam$rd, isAuthRequired;
      return _regeneratorRuntime().wrap(function _callee$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            loadIndicator = document.getElementById('load-indicator');
            loadIndicatorTimer = setTimeout(function () {
              return loadIndicator.style.display = '';
            }, 250); // Check if ticket is valid
            ticket = storage.ticket;
            user_uri = storage.user_uri;
            end_time = new Date() < new Date(parseInt(storage.end_time)) && storage.end_time;
            if (!(ticket && user_uri && end_time)) {
              _context2.next = 17;
              break;
            }
            _context2.prev = 6;
            _context2.next = 9;
            return Backend.is_ticket_valid(ticket);
          case 9:
            valid = _context2.sent;
            _context2.next = 15;
            break;
          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](6);
            valid = false;
          case 15:
            _context2.next = 18;
            break;
          case 17:
            valid = false;
          case 18:
            if (!valid) {
              _context2.next = 22;
              break;
            }
            initWithCredentials({
              ticket: ticket,
              user_uri: user_uri,
              end_time: end_time
            });
            _context2.next = 40;
            break;
          case 22:
            _context2.prev = 22;
            _context2.next = 25;
            return Backend.authenticate('guest', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
          case 25:
            _yield$Backend$authen = _context2.sent;
            _ticket = _yield$Backend$authen.ticket;
            _user_uri = _yield$Backend$authen.user_uri;
            _end_time = _yield$Backend$authen.end_time;
            _context2.next = 31;
            return Backend.get_individual(_ticket, 'cfg:AuthRequired');
          case 31:
            authRequiredParam = _context2.sent;
            _authRequiredParam$rd = _slicedToArray(authRequiredParam['rdf:value'], 1), isAuthRequired = _authRequiredParam$rd[0].data;
            if (!isAuthRequired) {
              initWithCredentials({
                ticket: _ticket,
                user_uri: _user_uri,
                end_time: _end_time
              });
            } else {
              handleAuthError();
            }
            _context2.next = 40;
            break;
          case 36:
            _context2.prev = 36;
            _context2.t1 = _context2["catch"](22);
            console.error('cfg:AuthRequired load failed');
            handleAuthError();
          case 40:
            clearTimeout(loadIndicatorTimer);
            hide(loadIndicator);
          case 42:
          case "end":
            return _context2.stop();
        }
      }, _callee, null, [[6, 12], [22, 36]]);
    }));
    return _auth.apply(this, arguments);
  }
  _export("default", auth);
  return {
    setters: [function (_commonVedaJs) {
      veda = _commonVedaJs.default;
    }, function (_commonBackendJs) {
      Backend = _commonBackendJs.default;
    }, function (_commonIndividual_modelJs) {
      IndividualModel = _commonIndividual_modelJs.default;
    }, function (_commonLibSha256Js) {
      Sha256 = _commonLibSha256Js.default;
    }, function (_browserDom_helpersJs) {
      delegateHandler = _browserDom_helpersJs.delegateHandler;
      clear = _browserDom_helpersJs.clear;
    }, function (_captcha) {
      Captcha = _captcha.default;
    }],
    execute: function () {
      storage = window.localStorage; // Login invitation
      loginForm = document.getElementById('login-form');
      loginForm.querySelector('#submit-login-password').addEventListener('click', submitLoginPassword);
      delegateHandler(loginForm, 'keyup', '#login, #password', function (e) {
        if (e.key === 'Enter') {
          submitLoginPassword(e);
        }
      });
      delegateHandler(loginForm, 'mousedown', '.show-password', function (e) {
        var passwords = loginForm.querySelectorAll('.password');
        passwords.forEach(function (input) {
          return input.type = 'text';
        });
        document.addEventListener('mouseup', function () {
          passwords.forEach(function (input) {
            return input.type = 'password';
          });
        }, {
          once: true
        });
      });
      delegateHandler(loginForm, 'touchstart', '.show-password', function (e) {
        var passwords = loginForm.querySelectorAll('.password');
        passwords.forEach(function (input) {
          return input.type = 'text';
        });
        document.addEventListener('touchend', function () {
          passwords.forEach(function (input) {
            return input.type = 'password';
          });
        }, {
          once: true
        });
      });
      delegateHandler(loginForm, 'input', '#new-password, #confirm-new-password, #secret', validateNewPassword);
      re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{8,})/;
      loginForm.querySelector('#submit-new-password').addEventListener('click', function (e) {
        e.preventDefault();
        var login = loginForm.querySelector('#login').value.trim();
        var password = loginForm.querySelector('#new-password').value;
        var secret = loginForm.querySelector('#secret').value;
        var hash = Sha256.hash(password);
        Backend.authenticate(login, hash, secret).then(handleLoginSuccess).catch(handleLoginError).then(function () {
          loginForm.querySelector('#new-password').value = '';
          loginForm.querySelector('#confirm-new-password').value = '';
        });
      });
      loginForm.querySelector('#change-password').addEventListener('click', function (e) {
        e.preventDefault();
        changePasswordPressed = true;
        var login = loginForm.querySelector('#login').value;
        var secret = '?';
        Backend.authenticate(login, undefined, secret).then(handleLoginSuccess).catch(handleLoginError);
      });
      localStorage.lastActivity = Date.now();
      activityHandler = function activityHandler() {
        localStorage.lastActivity = Date.now();
      };
      document.body.addEventListener('keyup', activityHandler);
      document.body.addEventListener('click', activityHandler);
      bc = new BroadcastChannel('auth_channel');
      bc.onmessage = function (event) {
        console.log('Auth message received');
        handleAuthSuccess(event.data, true);
      };

      // Check & refresh credentials

      delegateHandler(document.body, 'click', '#logout, .logout', function () {
        Backend.logout(veda.ticket).catch(function (error) {
          return console.log('Logout failed', error);
        });
        delete storage.ticket;
        delete storage.user_uri;
        delete storage.end_time;
        delTicketCookie();
        storage.logout = true;
        window.location.reload();
      });

      /**
       * Initializes the authentication flow
       * @return {Promise<void>}
       */
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfcmVnZW5lcmF0b3JSdW50aW1lIiwiZXhwb3J0cyIsIk9wIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duIiwiaGFzT3duUHJvcGVydHkiLCJkZWZpbmVQcm9wZXJ0eSIsIm9iaiIsImtleSIsImRlc2MiLCJ2YWx1ZSIsIiRTeW1ib2wiLCJTeW1ib2wiLCJpdGVyYXRvclN5bWJvbCIsIml0ZXJhdG9yIiwiYXN5bmNJdGVyYXRvclN5bWJvbCIsImFzeW5jSXRlcmF0b3IiLCJ0b1N0cmluZ1RhZ1N5bWJvbCIsInRvU3RyaW5nVGFnIiwiZGVmaW5lIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiZXJyIiwid3JhcCIsImlubmVyRm4iLCJvdXRlckZuIiwic2VsZiIsInRyeUxvY3NMaXN0IiwicHJvdG9HZW5lcmF0b3IiLCJHZW5lcmF0b3IiLCJnZW5lcmF0b3IiLCJjcmVhdGUiLCJjb250ZXh0IiwiQ29udGV4dCIsIm1ha2VJbnZva2VNZXRob2QiLCJ0cnlDYXRjaCIsImZuIiwiYXJnIiwidHlwZSIsImNhbGwiLCJDb250aW51ZVNlbnRpbmVsIiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsIkl0ZXJhdG9yUHJvdG90eXBlIiwiZ2V0UHJvdG8iLCJnZXRQcm90b3R5cGVPZiIsIk5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlIiwidmFsdWVzIiwiR3AiLCJkZWZpbmVJdGVyYXRvck1ldGhvZHMiLCJmb3JFYWNoIiwibWV0aG9kIiwiX2ludm9rZSIsIkFzeW5jSXRlcmF0b3IiLCJQcm9taXNlSW1wbCIsImludm9rZSIsInJlc29sdmUiLCJyZWplY3QiLCJyZWNvcmQiLCJyZXN1bHQiLCJfX2F3YWl0IiwidGhlbiIsInVud3JhcHBlZCIsImVycm9yIiwicHJldmlvdXNQcm9taXNlIiwiY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmciLCJzdGF0ZSIsIkVycm9yIiwiZG9uZVJlc3VsdCIsImRlbGVnYXRlIiwiZGVsZWdhdGVSZXN1bHQiLCJtYXliZUludm9rZURlbGVnYXRlIiwic2VudCIsIl9zZW50IiwiZGlzcGF0Y2hFeGNlcHRpb24iLCJhYnJ1cHQiLCJkb25lIiwibWV0aG9kTmFtZSIsInVuZGVmaW5lZCIsInJldHVybiIsIlR5cGVFcnJvciIsImluZm8iLCJyZXN1bHROYW1lIiwibmV4dCIsIm5leHRMb2MiLCJwdXNoVHJ5RW50cnkiLCJsb2NzIiwiZW50cnkiLCJ0cnlMb2MiLCJjYXRjaExvYyIsImZpbmFsbHlMb2MiLCJhZnRlckxvYyIsInRyeUVudHJpZXMiLCJwdXNoIiwicmVzZXRUcnlFbnRyeSIsImNvbXBsZXRpb24iLCJyZXNldCIsIml0ZXJhYmxlIiwiaXRlcmF0b3JNZXRob2QiLCJpc05hTiIsImxlbmd0aCIsImkiLCJkaXNwbGF5TmFtZSIsImlzR2VuZXJhdG9yRnVuY3Rpb24iLCJnZW5GdW4iLCJjdG9yIiwiY29uc3RydWN0b3IiLCJuYW1lIiwibWFyayIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiYXdyYXAiLCJhc3luYyIsIlByb21pc2UiLCJpdGVyIiwia2V5cyIsInZhbCIsIm9iamVjdCIsInJldmVyc2UiLCJwb3AiLCJza2lwVGVtcFJlc2V0IiwicHJldiIsImNoYXJBdCIsInNsaWNlIiwic3RvcCIsInJvb3RSZWNvcmQiLCJydmFsIiwiZXhjZXB0aW9uIiwiaGFuZGxlIiwibG9jIiwiY2F1Z2h0IiwiaGFzQ2F0Y2giLCJoYXNGaW5hbGx5IiwiZmluYWxseUVudHJ5IiwiY29tcGxldGUiLCJmaW5pc2giLCJjYXRjaCIsInRocm93biIsImRlbGVnYXRlWWllbGQiLCJfc2xpY2VkVG9BcnJheSIsImFyciIsIl9hcnJheVdpdGhIb2xlcyIsIl9pdGVyYWJsZVRvQXJyYXlMaW1pdCIsIl91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSIsIl9ub25JdGVyYWJsZVJlc3QiLCJvIiwibWluTGVuIiwiX2FycmF5TGlrZVRvQXJyYXkiLCJuIiwidG9TdHJpbmciLCJBcnJheSIsImZyb20iLCJ0ZXN0IiwibGVuIiwiYXJyMiIsIl9pIiwiX3MiLCJfZSIsIl94IiwiX3IiLCJfYXJyIiwiX24iLCJfZCIsImlzQXJyYXkiLCJhc3luY0dlbmVyYXRvclN0ZXAiLCJnZW4iLCJfbmV4dCIsIl90aHJvdyIsIl9hc3luY1RvR2VuZXJhdG9yIiwiYXJncyIsImFyZ3VtZW50cyIsImFwcGx5IiwibnRsbUF1dGgiLCJwYXRoIiwibG9naW4iLCJwYXNzd29yZCIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsIndpdGhDcmVkZW50aWFscyIsInNldFJlcXVlc3RIZWFkZXIiLCJyZXNwb25zZVR5cGUiLCJvbmxvYWQiLCJzdGF0dXMiLCJyZXNwb25zZSIsIm9uZXJyb3IiLCJvbmFib3J0Iiwic2VuZCIsImNvbmNhdCIsImVuY29kZVVSSUNvbXBvbmVudCIsInN1Ym1pdExvZ2luUGFzc3dvcmQiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwicGFzc3dvcmRJbnB1dCIsImxvZ2luRm9ybSIsInF1ZXJ5U2VsZWN0b3IiLCJ0cmltIiwiaGFzaCIsIlNoYTI1NiIsIm50bG1Qcm92aWRlciIsIkluZGl2aWR1YWxNb2RlbCIsImxvYWQiLCJoYXNWYWx1ZSIsImdldCIsImNvbnNvbGUiLCJCYWNrZW5kIiwiYXV0aGVudGljYXRlIiwiaGFuZGxlTG9naW5TdWNjZXNzIiwiaGFuZGxlTG9naW5FcnJvciIsInNob3ciLCJlbCIsInN0eWxlIiwiZGlzcGxheSIsImhpZGUiLCJ2YWxpZGF0ZU5ld1Bhc3N3b3JkIiwic3VibWl0IiwibmV3UGFzc3dvcmQiLCJjb25maXJtTmV3UGFzc3dvcmQiLCJwYXNzd29yZFN0cmVuZ3RoIiwicGFzc3dvcmRNdXN0TWF0Y2giLCJzZWNyZXQiLCJlbnRlclNlY3JldCIsInJlTWF0Y2giLCJyZSIsInBhc3N3b3Jkc01hdGNoIiwiaXNTZWNyZXQiLCJpc1ZhbGlkIiwic2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwiZW50ZXJMb2dpblBhc3N3b3JkIiwiZW50ZXJOZXdQYXNzd29yZCIsImludmFsaWRTZWNyZXRXYXJuaW5nIiwiZW1wdHlQYXNzd29yZFdhcm5pbmciLCJlcXVhbFBhc3N3b3JkV2FybmluZyIsImludmFsaWRQYXNzd29yZFdhcm5pbmciLCJmcmVxdWVudFBhc3NDaGFuZ2VXYXJuaW5nIiwicGFzc0NoYW5nZU5vdEFsbG93ZWRXYXJuaW5nIiwic2VjcmV0RXhwaXJlZFdhcm5pbmciLCJwYXNzd29yZEV4cGlyZWRFcnJvciIsImxvZ2luRmFpbGVkRXJyb3IiLCJhdXRoTG9ja2VkRXJyb3IiLCJwYXNzQ2hhbmdlTG9ja2VkRXJyb3IiLCJ1bmF2YWlsYWJsZUVycm9yIiwibmV0d29ya0Vycm9yIiwic2VjcmV0UmVxdWVzdEluZm8iLCJhbGVydHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYWxlcnQiLCJpbnB1dHMiLCJpbnB1dCIsIm9rIiwib2tIYW5kbGVyIiwibXlDYXB0Y2hhIiwiQ2FwdGNoYSIsInJlcXVpcmVkVmFsdWUiLCJjbGVhck9uU3VibWl0IiwicmVzZXRPbkVycm9yIiwiZm9jdXNPbkVycm9yIiwiY2FudmFzQ2xhc3MiLCJjYW52YXNTdHlsZSIsIndpZHRoIiwiaGVpZ2h0IiwidGV4dEJhc2VsaW5lIiwiZm9udCIsInRleHRBbGlnbiIsImZpbGxTdHlsZSIsImNhbGxiYWNrIiwiJGNhcHRjaGFJbnB1dEVsZW1lbnQiLCJudW1iZXJPZlRyaWVzIiwiaXRlbSIsImNhcHRjaGFTdWJtaXQiLCJlIiwidmFsaWRhdGUiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvZGUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiX29rSGFuZGxlciIsIl9va0hhbmRsZXIyIiwiX29rSGFuZGxlcjMiLCJfb2tIYW5kbGVyNCIsIl9va0hhbmRsZXI1IiwiX29rSGFuZGxlcjYiLCJfb2tIYW5kbGVyNyIsIl9va0hhbmRsZXI4IiwiX29rSGFuZGxlcjkiLCJjaGFuZ2VQYXNzd29yZFByZXNzZWQiLCJfb2tIYW5kbGVyMTAiLCJfb2tIYW5kbGVyMTEiLCJhdXRoUmVzdWx0IiwiaW5pdFdpdGhDcmVkZW50aWFscyIsInNldFRpY2tldENvb2tpZSIsInRpY2tldCIsImV4cGlyZXMiLCJjb29raWUiLCJEYXRlIiwicGFyc2VJbnQiLCJ0b0dNVFN0cmluZyIsIndpbmRvdyIsImxvY2F0aW9uIiwicHJvdG9jb2wiLCJkZWxUaWNrZXRDb29raWUiLCJoYW5kbGVBdXRoRXJyb3IiLCJhcHBDb250YWluZXIiLCJjbGVhciIsInN0b3JhZ2UiLCJ1c2VyX3VyaSIsImVuZF90aW1lIiwibG9nb3V0IiwiaGFuZGxlQXV0aFN1Y2Nlc3MiLCJpc0Jyb2FkY2FzdCIsImJjIiwicG9zdE1lc3NhZ2UiLCJ2ZWRhIiwiZ3JhbnRlZCIsIm5vdyIsImxpZmV0aW1lIiwiaGgiLCJNYXRoIiwiZmxvb3IiLCJtbSIsInNzIiwibG9nIiwiY2xlYXJJbnRlcnZhbCIsInJlZnJlc2hJbnRlcnZhbCIsInNldEludGVydmFsIiwiZXhwaXJlZCIsImFsbW9zdEV4cGlyZWQiLCJleHBpcmVzU29vbiIsIk51bWJlciIsImxvY2FsU3RvcmFnZSIsImxhc3RBY3Rpdml0eSIsImdldF90aWNrZXRfdHJ1c3RlZCIsImxvYWRJbmRpY2F0b3IiLCJsb2FkSW5kaWNhdG9yVGltZXIiLCJzZXRUaW1lb3V0IiwiaW5pdCIsImNsZWFyVGltZW91dCIsInRyaWdnZXIiLCJhdXRoIiwiX2F1dGgiLCJfY2FsbGVlIiwidmFsaWQiLCJfeWllbGQkQmFja2VuZCRhdXRoZW4iLCJfdGlja2V0IiwiX3VzZXJfdXJpIiwiX2VuZF90aW1lIiwiYXV0aFJlcXVpcmVkUGFyYW0iLCJfYXV0aFJlcXVpcmVkUGFyYW0kcmQiLCJpc0F1dGhSZXF1aXJlZCIsIl9jYWxsZWUkIiwiX2NvbnRleHQyIiwiaXNfdGlja2V0X3ZhbGlkIiwidDAiLCJnZXRfaW5kaXZpZHVhbCIsImRhdGEiLCJ0MSIsIl9leHBvcnQiLCJzZXR0ZXJzIiwiX2NvbW1vblZlZGFKcyIsImRlZmF1bHQiLCJfY29tbW9uQmFja2VuZEpzIiwiX2NvbW1vbkluZGl2aWR1YWxfbW9kZWxKcyIsIl9jb21tb25MaWJTaGEyNTZKcyIsIl9icm93c2VyRG9tX2hlbHBlcnNKcyIsImRlbGVnYXRlSGFuZGxlciIsIl9jYXB0Y2hhIiwiZXhlY3V0ZSIsInBhc3N3b3JkcyIsIm9uY2UiLCJhY3Rpdml0eUhhbmRsZXIiLCJib2R5IiwiQnJvYWRjYXN0Q2hhbm5lbCIsIm9ubWVzc2FnZSIsInJlbG9hZCJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS13ZWIvanMvYnJvd3Nlci9hdXRoLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQG1vZHVsZSBBdXRoZW50aWNhdGlvblxuICovXG5cbmltcG9ydCB2ZWRhIGZyb20gJy4uL2NvbW1vbi92ZWRhLmpzJztcbmltcG9ydCBCYWNrZW5kIGZyb20gJy4uL2NvbW1vbi9iYWNrZW5kLmpzJztcbmltcG9ydCBJbmRpdmlkdWFsTW9kZWwgZnJvbSAnLi4vY29tbW9uL2luZGl2aWR1YWxfbW9kZWwuanMnO1xuaW1wb3J0IFNoYTI1NiBmcm9tICcuLi9jb21tb24vbGliL3NoYTI1Ni5qcyc7XG5pbXBvcnQge2RlbGVnYXRlSGFuZGxlciwgY2xlYXJ9IGZyb20gJy4uL2Jyb3dzZXIvZG9tX2hlbHBlcnMuanMnO1xuaW1wb3J0IENhcHRjaGEgZnJvbSAnY2FwdGNoYSc7XG5cbi8qKlxuICogQXV0aGVudGljYXRlIHVzZXIgdXNpbmcgTlRMTSBwcm92aWRlclxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSBUaGUgcGF0aCB0byB0aGUgTlRMTSBwcm92aWRlclxuICogQHBhcmFtIHtzdHJpbmd9IGxvZ2luIC0gVGhlIHVzZXIncyBsb2dpblxuICogQHBhcmFtIHtzdHJpbmd9IHBhc3N3b3JkIC0gVGhlIHVzZXIncyBwYXNzd29yZFxuICogQHJldHVybiB7UHJvbWlzZTxPYmplY3Q+fSAtIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSBhdXRoZW50aWNhdGlvbiByZXN1bHRcbiAqL1xuZnVuY3Rpb24gbnRsbUF1dGggKHBhdGgsIGxvZ2luLCBwYXNzd29yZCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHhoci5vcGVuKGxvZ2luICYmIHBhc3N3b3JkID8gJ1BPU1QnIDogJ0dFVCcsIHBhdGgsIHRydWUpO1xuICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PVVURi04Jyk7XG4gICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcbiAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHhoci5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICByZXNvbHZlKHhoci5yZXNwb25zZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWplY3QoRXJyb3IoJ05UTE0gYXV0aCBmYWlsZWQnKSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB4aHIub25lcnJvciA9IHJlamVjdDtcbiAgICB4aHIub25hYm9ydCA9IHJlamVjdDtcbiAgICBsb2dpbiAmJiBwYXNzd29yZCA/IHhoci5zZW5kKGB1c2VybmFtZT0ke2VuY29kZVVSSUNvbXBvbmVudChsb2dpbil9JnBhc3N3b3JkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHBhc3N3b3JkKX1gKSA6IHhoci5zZW5kKCk7XG4gIH0pO1xufVxuXG5jb25zdCBzdG9yYWdlID0gd2luZG93LmxvY2FsU3RvcmFnZTtcblxuLy8gTG9naW4gaW52aXRhdGlvblxuY29uc3QgbG9naW5Gb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvZ2luLWZvcm0nKTtcblxubG9naW5Gb3JtLnF1ZXJ5U2VsZWN0b3IoJyNzdWJtaXQtbG9naW4tcGFzc3dvcmQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN1Ym1pdExvZ2luUGFzc3dvcmQpO1xuXG5kZWxlZ2F0ZUhhbmRsZXIobG9naW5Gb3JtLCAna2V5dXAnLCAnI2xvZ2luLCAjcGFzc3dvcmQnLCBmdW5jdGlvbiAoZSkge1xuICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcbiAgICBzdWJtaXRMb2dpblBhc3N3b3JkKGUpO1xuICB9XG59KTtcblxuZGVsZWdhdGVIYW5kbGVyKGxvZ2luRm9ybSwgJ21vdXNlZG93bicsICcuc2hvdy1wYXNzd29yZCcsIGZ1bmN0aW9uIChlKSB7XG4gIGNvbnN0IHBhc3N3b3JkcyA9IGxvZ2luRm9ybS5xdWVyeVNlbGVjdG9yQWxsKCcucGFzc3dvcmQnKTtcbiAgcGFzc3dvcmRzLmZvckVhY2goKGlucHV0KSA9PiBpbnB1dC50eXBlID0gJ3RleHQnKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGZ1bmN0aW9uICgpIHtcbiAgICBwYXNzd29yZHMuZm9yRWFjaCgoaW5wdXQpID0+IGlucHV0LnR5cGUgPSAncGFzc3dvcmQnKTtcbiAgfSwge29uY2U6IHRydWV9KTtcbn0pO1xuXG5kZWxlZ2F0ZUhhbmRsZXIobG9naW5Gb3JtLCAndG91Y2hzdGFydCcsICcuc2hvdy1wYXNzd29yZCcsIGZ1bmN0aW9uIChlKSB7XG4gIGNvbnN0IHBhc3N3b3JkcyA9IGxvZ2luRm9ybS5xdWVyeVNlbGVjdG9yQWxsKCcucGFzc3dvcmQnKTtcbiAgcGFzc3dvcmRzLmZvckVhY2goKGlucHV0KSA9PiBpbnB1dC50eXBlID0gJ3RleHQnKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgcGFzc3dvcmRzLmZvckVhY2goKGlucHV0KSA9PiBpbnB1dC50eXBlID0gJ3Bhc3N3b3JkJyk7XG4gIH0sIHtvbmNlOiB0cnVlfSk7XG59KTtcblxuLyoqXG4gKiBIYW5kbGVzIHRoZSBzdWJtaXQgZXZlbnQgZm9yIGxvZ2luIGZvcm1cbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gVGhlIHN1Ym1pdCBldmVudFxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gc3VibWl0TG9naW5QYXNzd29yZCAoZXZlbnQpIHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgY29uc3QgcGFzc3dvcmRJbnB1dCA9IGxvZ2luRm9ybS5xdWVyeVNlbGVjdG9yKCcjcGFzc3dvcmQnKTtcbiAgY29uc3QgbG9naW4gPSBsb2dpbkZvcm0ucXVlcnlTZWxlY3RvcignI2xvZ2luJykudmFsdWUudHJpbSgpO1xuICBjb25zdCBwYXNzd29yZCA9IHBhc3N3b3JkSW5wdXQudmFsdWU7XG4gIGNvbnN0IGhhc2ggPSBTaGEyNTYuaGFzaChwYXNzd29yZCk7XG5cbiAgcGFzc3dvcmRJbnB1dC52YWx1ZSA9ICcnO1xuXG4gIGNvbnN0IG50bG1Qcm92aWRlciA9IG5ldyBJbmRpdmlkdWFsTW9kZWwoJ2NmZzpOVExNQXV0aFByb3ZpZGVyJywgdHJ1ZSwgZmFsc2UpO1xuICByZXR1cm4gbnRsbVByb3ZpZGVyLmxvYWQoKVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIGNvbnN0IHBhdGggPSAhbnRsbVByb3ZpZGVyLmhhc1ZhbHVlKCd2LXM6ZGVsZXRlZCcsIHRydWUpICYmIG50bG1Qcm92aWRlci5oYXNWYWx1ZSgncmRmOnZhbHVlJykgJiYgbnRsbVByb3ZpZGVyLmdldCgncmRmOnZhbHVlJylbMF07XG4gICAgICBpZiAocGF0aCkge1xuICAgICAgICByZXR1cm4gbnRsbUF1dGgocGF0aCwgbG9naW4sIHBhc3N3b3JkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvcignTlRMTSBhdXRoIHByb3ZpZGVyIHByb3ZpZGVyIGlzIG5vdCBkZWZpbmVkJykpO1xuICAgICAgfVxuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcignTlRMTSBhdXRoIGZhaWxlZCcpO1xuICAgICAgcmV0dXJuIEJhY2tlbmQuYXV0aGVudGljYXRlKGxvZ2luLCBoYXNoKTtcbiAgICB9KVxuICAgIC50aGVuKGhhbmRsZUxvZ2luU3VjY2VzcylcbiAgICAuY2F0Y2goaGFuZGxlTG9naW5FcnJvcik7XG59XG5cbmRlbGVnYXRlSGFuZGxlcihsb2dpbkZvcm0sICdpbnB1dCcsICcjbmV3LXBhc3N3b3JkLCAjY29uZmlybS1uZXctcGFzc3dvcmQsICNzZWNyZXQnLCB2YWxpZGF0ZU5ld1Bhc3N3b3JkKTtcblxuY29uc3QgcmUgPSAvXig/PS4qW2Etel0pKD89LipbQS1aXSkoPz0uKlxcZCkoPz0uezgsfSkvO1xuXG4vKipcbiAqIFNob3cgZWxlbWVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIHNob3cgKGVsKSB7XG4gIGVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xufVxuXG4vKipcbiAqIEhpZGUgZWxlbWVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIGhpZGUgKGVsKSB7XG4gIGVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59XG5cbi8qKlxuICogVmFsaWRhdGUgbmV3IHBhc3N3b3JkXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVOZXdQYXNzd29yZCAoKSB7XG4gIGNvbnN0IHN1Ym1pdCA9IGxvZ2luRm9ybS5xdWVyeVNlbGVjdG9yKCcjc3VibWl0LW5ldy1wYXNzd29yZCcpO1xuICBjb25zdCBuZXdQYXNzd29yZCA9IGxvZ2luRm9ybS5xdWVyeVNlbGVjdG9yKCcjbmV3LXBhc3N3b3JkJyk7XG4gIGNvbnN0IGNvbmZpcm1OZXdQYXNzd29yZCA9IGxvZ2luRm9ybS5xdWVyeVNlbGVjdG9yKCcjY29uZmlybS1uZXctcGFzc3dvcmQnKTtcbiAgY29uc3QgcGFzc3dvcmRTdHJlbmd0aCA9IGxvZ2luRm9ybS5xdWVyeVNlbGVjdG9yKCcucGFzc3dvcmQtc3RyZW5ndGgnKTtcbiAgY29uc3QgcGFzc3dvcmRNdXN0TWF0Y2ggPSBsb2dpbkZvcm0ucXVlcnlTZWxlY3RvcignLnBhc3N3b3JkLW11c3QtbWF0Y2gnKTtcbiAgY29uc3Qgc2VjcmV0ID0gbG9naW5Gb3JtLnF1ZXJ5U2VsZWN0b3IoJyNzZWNyZXQnKTtcbiAgY29uc3QgZW50ZXJTZWNyZXQgPSBsb2dpbkZvcm0ucXVlcnlTZWxlY3RvcignLmVudGVyLXNlY3JldCcpO1xuXG4gIGNvbnN0IHJlTWF0Y2ggPSByZS50ZXN0KCBuZXdQYXNzd29yZC52YWx1ZSApO1xuICBjb25zdCBwYXNzd29yZHNNYXRjaCA9IGNvbmZpcm1OZXdQYXNzd29yZC52YWx1ZSA9PT0gbmV3UGFzc3dvcmQudmFsdWU7XG4gIGNvbnN0IGlzU2VjcmV0ID0gISFzZWNyZXQudmFsdWU7XG4gIGNvbnN0IGlzVmFsaWQgPSByZU1hdGNoICYmIHBhc3N3b3Jkc01hdGNoICYmIGlzU2VjcmV0O1xuXG4gIGlmICggIXJlTWF0Y2ggKSB7XG4gICAgc2hvdyhwYXNzd29yZFN0cmVuZ3RoKTtcbiAgfSBlbHNlIHtcbiAgICBoaWRlKHBhc3N3b3JkU3RyZW5ndGgpO1xuICB9XG4gIGlmICggIXBhc3N3b3Jkc01hdGNoICkge1xuICAgIHNob3cocGFzc3dvcmRNdXN0TWF0Y2gpO1xuICB9IGVsc2Uge1xuICAgIGhpZGUocGFzc3dvcmRNdXN0TWF0Y2gpO1xuICB9XG4gIGlmICggIWlzU2VjcmV0ICkge1xuICAgIHNob3coZW50ZXJTZWNyZXQpO1xuICB9IGVsc2Uge1xuICAgIGhpZGUoZW50ZXJTZWNyZXQpO1xuICB9XG4gIGlmICggIWlzVmFsaWQgKSB7XG4gICAgc3VibWl0LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgfSBlbHNlIHtcbiAgICBzdWJtaXQucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICB9XG59XG5cbmxvZ2luRm9ybS5xdWVyeVNlbGVjdG9yKCcjc3VibWl0LW5ldy1wYXNzd29yZCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBsb2dpbiA9IGxvZ2luRm9ybS5xdWVyeVNlbGVjdG9yKCcjbG9naW4nKS52YWx1ZS50cmltKCk7XG4gIGNvbnN0IHBhc3N3b3JkID0gbG9naW5Gb3JtLnF1ZXJ5U2VsZWN0b3IoJyNuZXctcGFzc3dvcmQnKS52YWx1ZTtcbiAgY29uc3Qgc2VjcmV0ID0gbG9naW5Gb3JtLnF1ZXJ5U2VsZWN0b3IoJyNzZWNyZXQnKS52YWx1ZTtcbiAgY29uc3QgaGFzaCA9IFNoYTI1Ni5oYXNoKHBhc3N3b3JkKTtcblxuICBCYWNrZW5kLmF1dGhlbnRpY2F0ZShsb2dpbiwgaGFzaCwgc2VjcmV0KVxuICAgIC50aGVuKGhhbmRsZUxvZ2luU3VjY2VzcylcbiAgICAuY2F0Y2goaGFuZGxlTG9naW5FcnJvcilcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICBsb2dpbkZvcm0ucXVlcnlTZWxlY3RvcignI25ldy1wYXNzd29yZCcpLnZhbHVlID0gJyc7XG4gICAgICBsb2dpbkZvcm0ucXVlcnlTZWxlY3RvcignI2NvbmZpcm0tbmV3LXBhc3N3b3JkJykudmFsdWUgPSAnJztcbiAgICB9KTtcbn0pO1xuXG5sZXQgY2hhbmdlUGFzc3dvcmRQcmVzc2VkO1xubG9naW5Gb3JtLnF1ZXJ5U2VsZWN0b3IoJyNjaGFuZ2UtcGFzc3dvcmQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgY2hhbmdlUGFzc3dvcmRQcmVzc2VkID0gdHJ1ZTtcbiAgY29uc3QgbG9naW4gPSBsb2dpbkZvcm0ucXVlcnlTZWxlY3RvcignI2xvZ2luJykudmFsdWU7XG4gIGNvbnN0IHNlY3JldCA9ICc/JztcblxuICBCYWNrZW5kLmF1dGhlbnRpY2F0ZShsb2dpbiwgdW5kZWZpbmVkLCBzZWNyZXQpXG4gICAgLnRoZW4oaGFuZGxlTG9naW5TdWNjZXNzKVxuICAgIC5jYXRjaChoYW5kbGVMb2dpbkVycm9yKTtcbn0pO1xuXG4vKipcbiAqIExvZ2luIGVycm9yIGhhbmRsZXJcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5mdW5jdGlvbiBoYW5kbGVMb2dpbkVycm9yIChlcnJvcikge1xuICBjb25zdCBlbnRlckxvZ2luUGFzc3dvcmQgPSBsb2dpbkZvcm0ucXVlcnlTZWxlY3RvcignI2VudGVyLWxvZ2luLXBhc3N3b3JkJyk7XG4gIGhpZGUoZW50ZXJMb2dpblBhc3N3b3JkKTtcbiAgY29uc3QgZW50ZXJOZXdQYXNzd29yZCA9IGxvZ2luRm9ybS5xdWVyeVNlbGVjdG9yKCcjZW50ZXItbmV3LXBhc3N3b3JkJyk7XG4gIGhpZGUoZW50ZXJOZXdQYXNzd29yZCk7XG5cbiAgY29uc3QgaW52YWxpZFNlY3JldFdhcm5pbmcgPSBsb2dpbkZvcm0ucXVlcnlTZWxlY3RvcignI2ludmFsaWQtc2VjcmV0LXdhcm5pbmcnKTtcbiAgY29uc3QgZW1wdHlQYXNzd29yZFdhcm5pbmcgPSBsb2dpbkZvcm0ucXVlcnlTZWxlY3RvcignI2VtcHR5LXBhc3N3b3JkLXdhcm5pbmcnKTtcbiAgY29uc3QgZXF1YWxQYXNzd29yZFdhcm5pbmcgPSBsb2dpbkZvcm0ucXVlcnlTZWxlY3RvcignI2VxdWFsLXBhc3N3b3JkLXdhcm5pbmcnKTtcbiAgY29uc3QgaW52YWxpZFBhc3N3b3JkV2FybmluZyA9IGxvZ2luRm9ybS5xdWVyeVNlbGVjdG9yKCcjaW52YWxpZC1wYXNzd29yZC13YXJuaW5nJyk7XG4gIGNvbnN0IGZyZXF1ZW50UGFzc0NoYW5nZVdhcm5pbmcgPSBsb2dpbkZvcm0ucXVlcnlTZWxlY3RvcignI2ZyZXF1ZW50LXBhc3MtY2hhbmdlLXdhcm5pbmcnKTtcbiAgY29uc3QgcGFzc0NoYW5nZU5vdEFsbG93ZWRXYXJuaW5nID0gbG9naW5Gb3JtLnF1ZXJ5U2VsZWN0b3IoJyNwYXNzLWNoYW5nZS1ub3QtYWxsb3dlZC13YXJuaW5nJyk7XG4gIGNvbnN0IHNlY3JldEV4cGlyZWRXYXJuaW5nID0gbG9naW5Gb3JtLnF1ZXJ5U2VsZWN0b3IoJyNzZWNyZXQtZXhwaXJlZC13YXJuaW5nJyk7XG5cbiAgY29uc3QgcGFzc3dvcmRFeHBpcmVkRXJyb3IgPSBsb2dpbkZvcm0ucXVlcnlTZWxlY3RvcignI3Bhc3N3b3JkLWV4cGlyZWQtZXJyb3InKTtcbiAgY29uc3QgbG9naW5GYWlsZWRFcnJvciA9IGxvZ2luRm9ybS5xdWVyeVNlbGVjdG9yKCcjbG9naW4tZmFpbGVkLWVycm9yJyk7XG4gIGNvbnN0IGF1dGhMb2NrZWRFcnJvciA9IGxvZ2luRm9ybS5xdWVyeVNlbGVjdG9yKCcjYXV0aC1sb2NrZWQtZXJyb3InKTtcbiAgY29uc3QgcGFzc0NoYW5nZUxvY2tlZEVycm9yID0gbG9naW5Gb3JtLnF1ZXJ5U2VsZWN0b3IoJyNwYXNzLWNoYW5nZS1sb2NrZWQtZXJyb3InKTtcbiAgY29uc3QgdW5hdmFpbGFibGVFcnJvciA9IGxvZ2luRm9ybS5xdWVyeVNlbGVjdG9yKCcjdW5hdmFpbGFibGUtZXJyb3InKTtcbiAgY29uc3QgbmV0d29ya0Vycm9yID0gbG9naW5Gb3JtLnF1ZXJ5U2VsZWN0b3IoJyNuZXR3b3JrLWVycm9yJyk7XG5cbiAgY29uc3Qgc2VjcmV0UmVxdWVzdEluZm8gPSBsb2dpbkZvcm0ucXVlcnlTZWxlY3RvcignI3NlY3JldC1yZXF1ZXN0LWluZm8nKTtcblxuICBjb25zdCBhbGVydHMgPSBsb2dpbkZvcm0ucXVlcnlTZWxlY3RvckFsbCgnLmFsZXJ0Jyk7XG4gIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoYWxlcnRzLCAoYWxlcnQpID0+IGhpZGUoYWxlcnQpKTtcblxuICBjb25zdCBpbnB1dHMgPSBsb2dpbkZvcm0ucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQ6bm90KCNsb2dpbiknKTtcbiAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChpbnB1dHMsIChpbnB1dCkgPT4gaW5wdXQudmFsdWUgPSAnJyk7XG5cbiAgY29uc3Qgb2sgPSBsb2dpbkZvcm0ucXVlcnlTZWxlY3RvcignLmJ0bi5vaycpO1xuICBoaWRlKG9rKTtcbiAgbGV0IG9rSGFuZGxlciA9ICgpID0+IHRydWU7XG5cbiAgLy8gQ2FwdGNoYVxuICBjb25zdCBteUNhcHRjaGEgPSBuZXcgQ2FwdGNoYSh7XG4gICAgZWw6ICcjY2FwdGNoYS1pbnB1dCcsXG4gICAgcmVxdWlyZWRWYWx1ZTogJycsXG4gICAgY2xlYXJPblN1Ym1pdDogdHJ1ZSxcbiAgICByZXNldE9uRXJyb3I6IHRydWUsXG4gICAgZm9jdXNPbkVycm9yOiB0cnVlLFxuICAgIGNhbnZhc0NsYXNzOiAnY2FwdGNoYS1jYW52YXMnLFxuICAgIGNhbnZhc1N0eWxlOiB7XG4gICAgICB3aWR0aDogMTAwLFxuICAgICAgaGVpZ2h0OiAxNSxcbiAgICAgIHRleHRCYXNlbGluZTogJ3RvcCcsXG4gICAgICBmb250OiAnMTVweCBzYW5zLXNlcmlmJyxcbiAgICAgIHRleHRBbGlnbjogJ2xlZnQnLFxuICAgICAgZmlsbFN0eWxlOiAnIzAwMCcsXG4gICAgfSxcbiAgICBjYWxsYmFjazogZnVuY3Rpb24gKHJlc3BvbnNlLCAkY2FwdGNoYUlucHV0RWxlbWVudCwgbnVtYmVyT2ZUcmllcykge1xuICAgICAgaWYgKHJlc3BvbnNlID09PSAnc3VjY2VzcycpIHtcbiAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChsb2dpbkZvcm0ucXVlcnlTZWxlY3RvckFsbCgnLmFsZXJ0LCAuZmllbGRzZXQnKSwgKGl0ZW0pID0+IGhpZGUoaXRlbSkpO1xuICAgICAgICBzaG93KGVudGVyTG9naW5QYXNzd29yZCk7XG4gICAgICB9XG4gICAgICBpZiAocmVzcG9uc2UgPT09ICdlcnJvcicpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0sXG4gIH0pO1xuICBmdW5jdGlvbiBjYXB0Y2hhU3VibWl0IChlKSB7XG4gICAgbXlDYXB0Y2hhLnZhbGlkYXRlKCk7XG4gIH07XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYXB0Y2hhLXN1Ym1pdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2FwdGNoYVN1Ym1pdCk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYXB0Y2hhLWlucHV0JykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgY2FwdGNoYVN1Ym1pdCk7XG5cbiAgc3dpdGNoIChlcnJvci5jb2RlKSB7XG4gIGNhc2UgMDogLy8gTmV0d29yayBlcnJvclxuICAgIHNob3cobmV0d29ya0Vycm9yKTtcbiAgICBzaG93KG9rKTtcbiAgICBva0hhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBoaWRlKG5ldHdvcmtFcnJvcik7XG4gICAgICBzaG93KGVudGVyTG9naW5QYXNzd29yZCk7XG4gICAgICBvay5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIG9rSGFuZGxlcik7XG4gICAgICBoaWRlKG9rKTtcbiAgICB9O1xuICAgIGJyZWFrO1xuICBjYXNlIDQyMzogLy8gUGFzc3dvcmQgY2hhbmdlIGlzIGFsbG93ZWQgb25jZSBhIGRheVxuICAgIHNob3coZnJlcXVlbnRQYXNzQ2hhbmdlV2FybmluZyk7XG4gICAgc2hvdyhvayk7XG4gICAgb2tIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgaGlkZShmcmVxdWVudFBhc3NDaGFuZ2VXYXJuaW5nKTtcbiAgICAgIHNob3coZW50ZXJMb2dpblBhc3N3b3JkKTtcbiAgICAgIG9rLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb2tIYW5kbGVyKTtcbiAgICAgIGhpZGUob2spO1xuICAgIH07XG4gICAgYnJlYWs7XG4gIGNhc2UgNDI5OiAvLyBUb28gbWFueSBhdXRoIGZhaWxzXG4gICAgc2hvdyhhdXRoTG9ja2VkRXJyb3IpO1xuICAgIHNob3cob2spO1xuICAgIG9rSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGhpZGUoYXV0aExvY2tlZEVycm9yKTtcbiAgICAgIHNob3coZW50ZXJMb2dpblBhc3N3b3JkKTtcbiAgICAgIG9rLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb2tIYW5kbGVyKTtcbiAgICAgIGhpZGUob2spO1xuICAgIH07XG4gICAgYnJlYWs7XG4gIGNhc2UgNDMwOiAvLyBUb28gbWFueSBwYXNzIGNoYW5nZSBmYWlsc1xuICAgIHNob3cocGFzc0NoYW5nZUxvY2tlZEVycm9yKTtcbiAgICBzaG93KG9rKTtcbiAgICBva0hhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBoaWRlKHBhc3NDaGFuZ2VMb2NrZWRFcnJvcik7XG4gICAgICBzaG93KGVudGVyTG9naW5QYXNzd29yZCk7XG4gICAgICBvay5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIG9rSGFuZGxlcik7XG4gICAgICBoaWRlKG9rKTtcbiAgICB9O1xuICAgIGJyZWFrO1xuICBjYXNlIDQ2MzogLy8gUGFzc3dvcmQgY2hhbmdlIG5vdCBhbGxvd2VkXG4gICAgc2hvdyhwYXNzQ2hhbmdlTm90QWxsb3dlZFdhcm5pbmcpO1xuICAgIHNob3cob2spO1xuICAgIG9rSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGhpZGUocGFzc0NoYW5nZU5vdEFsbG93ZWRXYXJuaW5nKTtcbiAgICAgIHNob3coZW50ZXJMb2dpblBhc3N3b3JkKTtcbiAgICAgIG9rLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb2tIYW5kbGVyKTtcbiAgICAgIGhpZGUob2spO1xuICAgIH07XG4gICAgYnJlYWs7XG4gIGNhc2UgNDY0OiAvLyBTZWNyZXQgZXhwaXJlZFxuICAgIHNob3coc2VjcmV0RXhwaXJlZFdhcm5pbmcpO1xuICAgIHNob3cob2spO1xuICAgIG9rSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGhpZGUoc2VjcmV0RXhwaXJlZFdhcm5pbmcpO1xuICAgICAgc2hvdyhlbnRlckxvZ2luUGFzc3dvcmQpO1xuICAgICAgb2sucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBva0hhbmRsZXIpO1xuICAgICAgaGlkZShvayk7XG4gICAgfTtcbiAgICBicmVhaztcbiAgY2FzZSA0NjU6IC8vIEVtcHR5IHBhc3N3b3JkXG4gICAgc2hvdyhlbXB0eVBhc3N3b3JkV2FybmluZyk7XG4gICAgc2hvdyhvayk7XG4gICAgb2tIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgaGlkZShlbXB0eVBhc3N3b3JkV2FybmluZyk7XG4gICAgICBzaG93KGVudGVyTG9naW5QYXNzd29yZCk7XG4gICAgICBvay5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIG9rSGFuZGxlcik7XG4gICAgICBoaWRlKG9rKTtcbiAgICB9O1xuICAgIGJyZWFrO1xuICBjYXNlIDQ2NjogLy8gTmV3IHBhc3N3b3JkIGlzIGVxdWFsIHRvIG9sZFxuICAgIHNob3coZXF1YWxQYXNzd29yZFdhcm5pbmcpO1xuICAgIHNob3cob2spO1xuICAgIG9rSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGhpZGUoZXF1YWxQYXNzd29yZFdhcm5pbmcpO1xuICAgICAgc2hvdyhlbnRlckxvZ2luUGFzc3dvcmQpO1xuICAgICAgb2sucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBva0hhbmRsZXIpO1xuICAgICAgaGlkZShvayk7XG4gICAgfTtcbiAgICBicmVhaztcbiAgY2FzZSA0Njc6IC8vIEludmFsaWQgcGFzc3dvcmRcbiAgICBzaG93KGludmFsaWRQYXNzd29yZFdhcm5pbmcpO1xuICAgIHNob3cob2spO1xuICAgIG9rSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGhpZGUoaW52YWxpZFBhc3N3b3JkV2FybmluZyk7XG4gICAgICBzaG93KGVudGVyTG9naW5QYXNzd29yZCk7XG4gICAgICBvay5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIG9rSGFuZGxlcik7XG4gICAgICBoaWRlKG9rKTtcbiAgICB9O1xuICAgIGJyZWFrO1xuICBjYXNlIDQ2ODogLy8gSW52YWxpZCBzZWNyZXRcbiAgICBzaG93KGludmFsaWRTZWNyZXRXYXJuaW5nKTtcbiAgICBzaG93KG9rKTtcbiAgICBva0hhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBoaWRlKGludmFsaWRTZWNyZXRXYXJuaW5nKTtcbiAgICAgIHNob3coZW50ZXJMb2dpblBhc3N3b3JkKTtcbiAgICAgIG9rLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb2tIYW5kbGVyKTtcbiAgICAgIGhpZGUob2spO1xuICAgIH07XG4gICAgYnJlYWs7XG4gIGNhc2UgNDY5OiAvLyBQYXNzd29yZCBleHBpcmVkXG4gICAgaWYgKCAhY2hhbmdlUGFzc3dvcmRQcmVzc2VkICkge1xuICAgICAgc2hvdyhwYXNzd29yZEV4cGlyZWRFcnJvcik7XG4gICAgICBzaG93KHNlY3JldFJlcXVlc3RJbmZvKTtcbiAgICAgIHNob3cob2spO1xuICAgICAgb2tIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBoaWRlKHBhc3N3b3JkRXhwaXJlZEVycm9yKTtcbiAgICAgICAgc2hvdyhlbnRlck5ld1Bhc3N3b3JkKTtcbiAgICAgICAgb2sucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBva0hhbmRsZXIpO1xuICAgICAgICBoaWRlKG9rKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHNob3coZW50ZXJOZXdQYXNzd29yZCk7XG4gICAgICBzaG93KHNlY3JldFJlcXVlc3RJbmZvKTtcbiAgICB9XG4gICAgYnJlYWs7XG4gIGNhc2UgNDcyOiAvLyBOb3QgYXV0aG9yaXplZFxuICBjYXNlIDQ3MzogLy8gQXV0aGVudGljYXRpb24gZmFpbGVkXG4gICAgc2hvdyhsb2dpbkZhaWxlZEVycm9yKTtcbiAgICBoaWRlKGVudGVyTG9naW5QYXNzd29yZCk7XG4gICAgYnJlYWs7XG4gIGRlZmF1bHQ6XG4gICAgc2hvdyh1bmF2YWlsYWJsZUVycm9yKTtcbiAgICBzaG93KG9rKTtcbiAgICBva0hhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBoaWRlKHVuYXZhaWxhYmxlRXJyb3IpO1xuICAgICAgc2hvdyhlbnRlckxvZ2luUGFzc3dvcmQpO1xuICAgICAgb2sucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBva0hhbmRsZXIpO1xuICAgICAgaGlkZShvayk7XG4gICAgfTtcbiAgICBicmVhaztcbiAgfVxuICBvay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9rSGFuZGxlcik7XG59XG5cbi8qKlxuICogSGFuZGxlcyBsb2dpbiBzdWNjZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gYXV0aFJlc3VsdCAtIFRoZSBhdXRoZW50aWNhdGlvbiByZXN1bHRcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIGhhbmRsZUxvZ2luU3VjY2VzcyAoYXV0aFJlc3VsdCkge1xuICBjb25zdCBlbnRlckxvZ2luUGFzc3dvcmQgPSBsb2dpbkZvcm0ucXVlcnlTZWxlY3RvcignI2VudGVyLWxvZ2luLXBhc3N3b3JkJyk7XG5cbiAgY29uc3QgYWxlcnRzID0gbG9naW5Gb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJy5hbGVydCcpO1xuICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGFsZXJ0cywgKGFsZXJ0KSA9PiBoaWRlKGFsZXJ0KSk7XG5cbiAgY29uc3QgaW5wdXRzID0gbG9naW5Gb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0Om5vdCgjbG9naW4pJyk7XG4gIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoaW5wdXRzLCAoaW5wdXQpID0+IGlucHV0LnZhbHVlID0gJycpO1xuXG4gIGNvbnN0IG9rID0gbG9naW5Gb3JtLnF1ZXJ5U2VsZWN0b3IoJy5idG4ub2snKTtcbiAgaGlkZShvayk7XG5cbiAgc2hvdyhlbnRlckxvZ2luUGFzc3dvcmQpO1xuXG4gIGluaXRXaXRoQ3JlZGVudGlhbHMoYXV0aFJlc3VsdCk7XG59XG5cbi8qKlxuICogU2V0IHRpY2tldCBjb29raWVcbiAqIEBwYXJhbSB7c3RyaW5nfSB0aWNrZXRcbiAqIEBwYXJhbSB7bnVtYmVyfSBleHBpcmVzXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5mdW5jdGlvbiBzZXRUaWNrZXRDb29raWUgKHRpY2tldCwgZXhwaXJlcykge1xuICBjb25zdCBjb29raWUgPSAndGlja2V0PScgKyB0aWNrZXQgKyAnOyBleHBpcmVzPScgKyBuZXcgRGF0ZShwYXJzZUludChleHBpcmVzKSkudG9HTVRTdHJpbmcoKSArICc7IHNhbWVzaXRlPXN0cmljdDsgcGF0aD0vOycgKyAod2luZG93LmxvY2F0aW9uLnByb3RvY29sID09PSAnaHR0cHM6JyA/ICdzZWN1cmU7JyA6ICcnKTtcbiAgZG9jdW1lbnQuY29va2llID0gY29va2llO1xufVxuXG4vKipcbiAqIERlbGV0ZSB0aWNrZXQgY29va2llXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5mdW5jdGlvbiBkZWxUaWNrZXRDb29raWUgKCkge1xuICBzZXRUaWNrZXRDb29raWUobnVsbCwgMCk7XG59XG5cbi8qKlxuICogSGFuZGxlcyBhdXRoZW50aWNhdGlvbiBlcnJvcnNcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIGhhbmRsZUF1dGhFcnJvciAoKSB7XG4gIGNvbnN0IGFwcENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKTtcbiAgY2xlYXIoYXBwQ29udGFpbmVyKTtcblxuICBkZWxldGUgc3RvcmFnZS50aWNrZXQ7XG4gIGRlbGV0ZSBzdG9yYWdlLnVzZXJfdXJpO1xuICBkZWxldGUgc3RvcmFnZS5lbmRfdGltZTtcbiAgZGVsVGlja2V0Q29va2llKCk7XG5cbiAgaWYgKHN0b3JhZ2UubG9nb3V0KSB7XG4gICAgc2hvdyhsb2dpbkZvcm0pO1xuICAgIGRlbGV0ZSBzdG9yYWdlLmxvZ291dDtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBBdXRvIGxvZ2luIHVzaW5nIE5UTE1cbiAgY29uc3QgbnRsbVByb3ZpZGVyID0gbmV3IEluZGl2aWR1YWxNb2RlbCgnY2ZnOk5UTE1BdXRoUHJvdmlkZXInLCB0cnVlLCBmYWxzZSk7XG4gIG50bG1Qcm92aWRlci5sb2FkKCkudGhlbigoKSA9PiB7XG4gICAgY29uc3QgcGF0aCA9ICFudGxtUHJvdmlkZXIuaGFzVmFsdWUoJ3YtczpkZWxldGVkJywgdHJ1ZSkgJiYgbnRsbVByb3ZpZGVyLmhhc1ZhbHVlKCdyZGY6dmFsdWUnKSAmJiBudGxtUHJvdmlkZXIuZ2V0KCdyZGY6dmFsdWUnKVswXTtcbiAgICBpZiAocGF0aCkge1xuICAgICAgbnRsbUF1dGgocGF0aClcbiAgICAgICAgLnRoZW4oKGF1dGhSZXN1bHQpID0+IGluaXRXaXRoQ3JlZGVudGlhbHMoYXV0aFJlc3VsdCkpXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignTlRMTSBhdXRoIGZhaWxlZCcpO1xuICAgICAgICAgIHNob3cobG9naW5Gb3JtKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNob3cobG9naW5Gb3JtKTtcbiAgICB9XG4gIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgIHNob3cobG9naW5Gb3JtKTtcbiAgfSk7XG59XG5cbi8vIEFjdGl2aXR5IGhhbmRsZXJcbmxvY2FsU3RvcmFnZS5sYXN0QWN0aXZpdHkgPSBEYXRlLm5vdygpO1xuY29uc3QgYWN0aXZpdHlIYW5kbGVyID0gKCkgPT4ge1xuICBsb2NhbFN0b3JhZ2UubGFzdEFjdGl2aXR5ID0gRGF0ZS5ub3coKTtcbn07XG5kb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgYWN0aXZpdHlIYW5kbGVyKTtcbmRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhY3Rpdml0eUhhbmRsZXIpO1xuXG5jb25zdCBiYyA9IG5ldyBCcm9hZGNhc3RDaGFubmVsKCdhdXRoX2NoYW5uZWwnKTtcbmJjLm9ubWVzc2FnZSA9IChldmVudCkgPT4ge1xuICBjb25zb2xlLmxvZygnQXV0aCBtZXNzYWdlIHJlY2VpdmVkJyk7XG4gIGhhbmRsZUF1dGhTdWNjZXNzKGV2ZW50LmRhdGEsIHRydWUpO1xufTtcblxuLy8gQ2hlY2sgJiByZWZyZXNoIGNyZWRlbnRpYWxzXG5sZXQgcmVmcmVzaEludGVydmFsO1xuXG4vKipcbiAqIEhhbmRsZXMgYXV0aGVudGljYXRpb24gc3VjY2Vzc1xuICogQHBhcmFtIHtPYmplY3R9IGF1dGhSZXN1bHQgLSBUaGUgYXV0aGVudGljYXRpb24gcmVzdWx0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0Jyb2FkY2FzdD1mYWxzZV0gLSBJbmRpY2F0ZXMgaWYgdGhlIGF1dGhlbnRpY2F0aW9uIHJlc3VsdCBpcyBmcm9tIGEgYnJvYWRjYXN0IG1lc3NhZ2VcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIGhhbmRsZUF1dGhTdWNjZXNzIChhdXRoUmVzdWx0LCBpc0Jyb2FkY2FzdCA9IGZhbHNlKSB7XG4gIGlmICghaXNCcm9hZGNhc3QpIGJjLnBvc3RNZXNzYWdlKGF1dGhSZXN1bHQpO1xuICB2ZWRhLnVzZXJfdXJpID0gc3RvcmFnZS51c2VyX3VyaSA9IGF1dGhSZXN1bHQudXNlcl91cmk7XG4gIHZlZGEudGlja2V0ID0gc3RvcmFnZS50aWNrZXQgPSBhdXRoUmVzdWx0LnRpY2tldDtcbiAgdmVkYS5lbmRfdGltZSA9IHN0b3JhZ2UuZW5kX3RpbWUgPSBhdXRoUmVzdWx0LmVuZF90aW1lO1xuICBzZXRUaWNrZXRDb29raWUodmVkYS50aWNrZXQsIHZlZGEuZW5kX3RpbWUpO1xuICAvLyBSZS1sb2dpbiBvbiB0aWNrZXQgZXhwaXJhdGlvblxuICBpZiAoIHZlZGEuZW5kX3RpbWUgKSB7XG4gICAgY29uc3QgZ3JhbnRlZCA9IERhdGUubm93KCk7XG4gICAgY29uc3QgZXhwaXJlcyA9IHBhcnNlSW50KHZlZGEuZW5kX3RpbWUpO1xuICAgIGNvbnN0IGxpZmV0aW1lID0gZXhwaXJlcyA+IGdyYW50ZWQgPyBleHBpcmVzIC0gZ3JhbnRlZCA6IDA7XG4gICAgY29uc3QgaGggPSBNYXRoLmZsb29yKGxpZmV0aW1lIC8gMTAwMCAvIDYwIC8gNjApO1xuICAgIGNvbnN0IG1tID0gTWF0aC5mbG9vcigobGlmZXRpbWUgJSAoMTAwMCAqIDYwICogNjApKSAvIDEwMDAgLyA2MCk7XG4gICAgY29uc3Qgc3MgPSBNYXRoLmZsb29yKChsaWZldGltZSAlICgxMDAwICogNjApKSAvIDEwMDApO1xuICAgIGNvbnNvbGUubG9nKGBUaWNrZXQgd2lsbCBleHBpcmUgaW4gJHtoaCA8IDEwID8gJzAnICsgaGggOiBoaH06JHttbSA8IDEwID8gJzAnICsgbW0gOiBtbX06JHtzcyA8IDEwID8gJzAnICsgc3MgOiBzc31gKTtcblxuICAgIGNsZWFySW50ZXJ2YWwocmVmcmVzaEludGVydmFsKTtcbiAgICByZWZyZXNoSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBjb25zdCBleHBpcmVkID0gZXhwaXJlcyA8PSBEYXRlLm5vdygpO1xuICAgICAgY29uc3QgYWxtb3N0RXhwaXJlZCA9IGV4cGlyZXMgLSBsaWZldGltZSAqIDAuMSA8PSBEYXRlLm5vdygpICYmICFleHBpcmVkO1xuICAgICAgY29uc3QgZXhwaXJlc1Nvb24gPSBleHBpcmVzIC0gbGlmZXRpbWUgKiAwLjIgPD0gRGF0ZS5ub3coKSAmJiAhZXhwaXJlZDtcbiAgICAgIGlmIChleHBpcmVkIHx8IGFsbW9zdEV4cGlyZWQpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChyZWZyZXNoSW50ZXJ2YWwpO1xuICAgICAgICBjb25zb2xlLmxvZygnVGlja2V0IGV4cGlyZWQsIHJlLWxvZ2luLicpO1xuICAgICAgICBoYW5kbGVBdXRoRXJyb3IoKTtcbiAgICAgIH0gZWxzZSBpZiAoZXhwaXJlc1Nvb24gJiYgZ3JhbnRlZCA8IE51bWJlcihsb2NhbFN0b3JhZ2UubGFzdEFjdGl2aXR5KSkge1xuICAgICAgICBjbGVhckludGVydmFsKHJlZnJlc2hJbnRlcnZhbCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdSZWZyZXNoIHRpY2tldCBpbiBiYWNrZ3JvdW5kLicpO1xuICAgICAgICBCYWNrZW5kLmdldF90aWNrZXRfdHJ1c3RlZCh2ZWRhLnRpY2tldCkudGhlbihoYW5kbGVBdXRoU3VjY2VzcykuY2F0Y2goaGFuZGxlQXV0aEVycm9yKTtcbiAgICAgIH1cbiAgICB9LCAxMDAwMCk7XG4gIH1cbn1cblxuLyoqXG4gKiBJbml0aWFsaXplcyB0aGUgYXBwbGljYXRpb24gd2l0aCB0aGUgcHJvdmlkZWQgYXV0aGVudGljYXRpb24gcmVzdWx0XG4gKiBAcGFyYW0ge09iamVjdH0gYXV0aFJlc3VsdCAtIFRoZSBhdXRoZW50aWNhdGlvbiByZXN1bHRcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIGluaXRXaXRoQ3JlZGVudGlhbHMgKGF1dGhSZXN1bHQpIHtcbiAgaGlkZShsb2dpbkZvcm0pO1xuICBoYW5kbGVBdXRoU3VjY2VzcyhhdXRoUmVzdWx0KTtcblxuICBjb25zdCBsb2FkSW5kaWNhdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYWQtaW5kaWNhdG9yJyk7XG4gIGNvbnN0IGxvYWRJbmRpY2F0b3JUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4gbG9hZEluZGljYXRvci5zdHlsZS5kaXNwbGF5ID0gJycsIDI1MCk7XG5cbiAgdmVkYS5pbml0KHZlZGEudXNlcl91cmkpLnRoZW4oKCkgPT4ge1xuICAgIGNsZWFyVGltZW91dChsb2FkSW5kaWNhdG9yVGltZXIpO1xuICAgIGhpZGUobG9hZEluZGljYXRvcik7XG4gICAgdmVkYS50cmlnZ2VyKCdzdGFydGVkJyk7XG4gIH0pO1xufVxuXG4vLyBMb2dvdXQgaGFuZGxlclxuZGVsZWdhdGVIYW5kbGVyKGRvY3VtZW50LmJvZHksICdjbGljaycsICcjbG9nb3V0LCAubG9nb3V0JywgZnVuY3Rpb24gKCkge1xuICBCYWNrZW5kLmxvZ291dCh2ZWRhLnRpY2tldCkuY2F0Y2goKGVycm9yKSA9PiBjb25zb2xlLmxvZygnTG9nb3V0IGZhaWxlZCcsIGVycm9yKSk7XG4gIGRlbGV0ZSBzdG9yYWdlLnRpY2tldDtcbiAgZGVsZXRlIHN0b3JhZ2UudXNlcl91cmk7XG4gIGRlbGV0ZSBzdG9yYWdlLmVuZF90aW1lO1xuICBkZWxUaWNrZXRDb29raWUoKTtcbiAgc3RvcmFnZS5sb2dvdXQgPSB0cnVlO1xuICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG59KTtcblxuLyoqXG4gKiBJbml0aWFsaXplcyB0aGUgYXV0aGVudGljYXRpb24gZmxvd1xuICogQHJldHVybiB7UHJvbWlzZTx2b2lkPn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gYXV0aCAoKSB7XG4gIGNvbnN0IGxvYWRJbmRpY2F0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9hZC1pbmRpY2F0b3InKTtcbiAgY29uc3QgbG9hZEluZGljYXRvclRpbWVyID0gc2V0VGltZW91dCgoKSA9PiBsb2FkSW5kaWNhdG9yLnN0eWxlLmRpc3BsYXkgPSAnJywgMjUwKTtcblxuICAvLyBDaGVjayBpZiB0aWNrZXQgaXMgdmFsaWRcbiAgY29uc3QgdGlja2V0ID0gc3RvcmFnZS50aWNrZXQ7XG4gIGNvbnN0IHVzZXJfdXJpID0gc3RvcmFnZS51c2VyX3VyaTtcbiAgY29uc3QgZW5kX3RpbWUgPSAobmV3IERhdGUoKSA8IG5ldyBEYXRlKHBhcnNlSW50KHN0b3JhZ2UuZW5kX3RpbWUpKSkgJiYgc3RvcmFnZS5lbmRfdGltZTtcbiAgbGV0IHZhbGlkO1xuICBpZiAodGlja2V0ICYmIHVzZXJfdXJpICYmIGVuZF90aW1lKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhbGlkID0gYXdhaXQgQmFja2VuZC5pc190aWNrZXRfdmFsaWQodGlja2V0KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFsaWQgPSBmYWxzZTtcbiAgfVxuXG4gIC8vIEluaXQgYXBwbGljYXRpb25cbiAgaWYgKHZhbGlkKSB7XG4gICAgaW5pdFdpdGhDcmVkZW50aWFscyh7dGlja2V0LCB1c2VyX3VyaSwgZW5kX3RpbWV9KTtcbiAgfSBlbHNlIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qge3RpY2tldCwgdXNlcl91cmksIGVuZF90aW1lfSA9IGF3YWl0IEJhY2tlbmQuYXV0aGVudGljYXRlKCdndWVzdCcsICdlM2IwYzQ0Mjk4ZmMxYzE0OWFmYmY0Yzg5OTZmYjkyNDI3YWU0MWU0NjQ5YjkzNGNhNDk1OTkxYjc4NTJiODU1Jyk7XG4gICAgICBjb25zdCBhdXRoUmVxdWlyZWRQYXJhbSA9IGF3YWl0IEJhY2tlbmQuZ2V0X2luZGl2aWR1YWwodGlja2V0LCAnY2ZnOkF1dGhSZXF1aXJlZCcpO1xuICAgICAgY29uc3QgeydyZGY6dmFsdWUnOiBbe2RhdGE6IGlzQXV0aFJlcXVpcmVkfV19ID0gYXV0aFJlcXVpcmVkUGFyYW07XG4gICAgICBpZiAoIWlzQXV0aFJlcXVpcmVkKSB7XG4gICAgICAgIGluaXRXaXRoQ3JlZGVudGlhbHMoe3RpY2tldCwgdXNlcl91cmksIGVuZF90aW1lfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoYW5kbGVBdXRoRXJyb3IoKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignY2ZnOkF1dGhSZXF1aXJlZCBsb2FkIGZhaWxlZCcpO1xuICAgICAgaGFuZGxlQXV0aEVycm9yKCk7XG4gICAgfVxuICB9XG5cbiAgY2xlYXJUaW1lb3V0KGxvYWRJbmRpY2F0b3JUaW1lcik7XG4gIGhpZGUobG9hZEluZGljYXRvcik7XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztpREFDQSxxSkFBQUEsbUJBQUEsWUFBQUEsQ0FBQSxXQUFBQyxPQUFBLFNBQUFBLE9BQUEsT0FBQUMsRUFBQSxHQUFBQyxNQUFBLENBQUFDLFNBQUEsRUFBQUMsTUFBQSxHQUFBSCxFQUFBLENBQUFJLGNBQUEsRUFBQUMsY0FBQSxHQUFBSixNQUFBLENBQUFJLGNBQUEsY0FBQUMsR0FBQSxF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