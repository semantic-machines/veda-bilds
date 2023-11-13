"use strict";

System.register(["ruscryptojs", "../common/util.js", "../common/individual_model.js"], function (_export, _context) {
  "use strict";

  var CryptoPro, CommonUtil, IndividualModel, cryptoPro, dialogTemplate, Crypto;
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function () { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function (obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function (skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function () { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function (exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function (type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function (record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function (finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function (tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function (iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
  function createSignatureFileIndividual(_x, _x2, _x3, _x4) {
    return _createSignatureFileIndividual.apply(this, arguments);
  }
  function _createSignatureFileIndividual() {
    _createSignatureFileIndividual = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(signature, name, parent, thumbprint) {
      var uri, path, fileIndividual;
      return _regeneratorRuntime().wrap(function _callee15$(_context16) {
        while (1) switch (_context16.prev = _context16.next) {
          case 0:
            uri = CommonUtil.guid();
            path = '/' + new Date().toISOString().substring(0, 10).split('-').join('/');
            fileIndividual = new IndividualModel();
            fileIndividual['rdf:type'] = 'v-s:File';
            fileIndividual['v-s:fileName'] = name + '.sig';
            fileIndividual['rdfs:label'] = name + '.sig';
            fileIndividual['v-s:fileSize'] = signature.length;
            fileIndividual['v-s:fileUri'] = uri;
            fileIndividual['v-s:filePath'] = path;
            fileIndividual['v-s:parent'] = parent;
            fileIndividual['v-s:backwardTarget'] = parent;
            fileIndividual['v-s:canRead'] = true;
            fileIndividual['v-s:canUpdate'] = true;
            fileIndividual['v-s:canDelete'] = true;
            fileIndividual['v-s:backwardProperty'] = 'v-s:digitalSignature';
            if (thumbprint != undefined) {
              fileIndividual['v-s:signatureStamp'] = thumbprint;
            }
            _context16.prev = 16;
            _context16.next = 19;
            return uploadSignatureFile(signature, path, uri);
          case 19:
            _context16.next = 21;
            return fileIndividual.save();
          case 21:
            return _context16.abrupt("return", fileIndividual);
          case 24:
            _context16.prev = 24;
            _context16.t0 = _context16["catch"](16);
            alert(_context16.t0);
          case 27:
          case "end":
            return _context16.stop();
        }
      }, _callee15, null, [[16, 24]]);
    }));
    return _createSignatureFileIndividual.apply(this, arguments);
  }
  function uploadSignatureFile(_x5, _x6, _x7) {
    return _uploadSignatureFile.apply(this, arguments);
  }
  function _uploadSignatureFile() {
    _uploadSignatureFile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(signature, path, uri) {
      var formData, blob, response;
      return _regeneratorRuntime().wrap(function _callee16$(_context17) {
        while (1) switch (_context17.prev = _context17.next) {
          case 0:
            formData = new FormData();
            blob = new Blob([signature], {
              type: 'plain/text'
            });
            formData.append('file', blob);
            formData.append('path', path);
            formData.append('uri', uri);
            _context17.next = 7;
            return fetch('/files', {
              method: 'POST',
              body: formData
            });
          case 7:
            response = _context17.sent;
            if (response.ok) {
              _context17.next = 10;
              break;
            }
            throw new Error('Не удалось создать файл-подписи. Failed to create signature file.');
          case 10:
          case "end":
            return _context17.stop();
        }
      }, _callee16);
    }));
    return _uploadSignatureFile.apply(this, arguments);
  }
  function readDataToSign(_x8) {
    return _readDataToSign.apply(this, arguments);
  }
  function _readDataToSign() {
    _readDataToSign = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(file) {
      return _regeneratorRuntime().wrap(function _callee17$(_context18) {
        while (1) switch (_context18.prev = _context18.next) {
          case 0:
            return _context18.abrupt("return", new Promise(function (resolve, reject) {
              var reader = new FileReader();
              reader.readAsArrayBuffer(file);
              reader.onload = function (e) {
                var dataToSign = btoa(new Uint8Array(e.target.result).reduce(function (data, byte) {
                  return data + String.fromCharCode(byte);
                }, ''));
                resolve(dataToSign);
              };
              reader.onerror = reject;
            }));
          case 1:
          case "end":
            return _context18.stop();
        }
      }, _callee17);
    }));
    return _readDataToSign.apply(this, arguments);
  }
  function getDataToSign(_x9) {
    return _getDataToSign.apply(this, arguments);
  }
  function _getDataToSign() {
    _getDataToSign = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(url) {
      var fileResponse, dataToSign;
      return _regeneratorRuntime().wrap(function _callee18$(_context19) {
        while (1) switch (_context19.prev = _context19.next) {
          case 0:
            _context19.next = 2;
            return fetch(url);
          case 2:
            fileResponse = _context19.sent;
            if (fileResponse.ok) {
              _context19.next = 5;
              break;
            }
            throw new Error('Network error.');
          case 5:
            _context19.t0 = btoa;
            _context19.t1 = Uint8Array;
            _context19.next = 9;
            return fileResponse.arrayBuffer();
          case 9:
            _context19.t2 = _context19.sent;
            _context19.t3 = new _context19.t1(_context19.t2).reduce(function (data, byte) {
              return data + String.fromCharCode(byte);
            }, '');
            dataToSign = (0, _context19.t0)(_context19.t3);
            return _context19.abrupt("return", dataToSign);
          case 13:
          case "end":
            return _context19.stop();
        }
      }, _callee18);
    }));
    return _getDataToSign.apply(this, arguments);
  }
  function getValidCertificates() {
    return _getValidCertificates.apply(this, arguments);
  }
  function _getValidCertificates() {
    _getValidCertificates = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20() {
      var certificates;
      return _regeneratorRuntime().wrap(function _callee20$(_context21) {
        while (1) switch (_context21.prev = _context21.next) {
          case 0:
            certificates = [];
            _context21.prev = 1;
            _context21.next = 4;
            return cryptoPro.listCertificates();
          case 4:
            certificates = _context21.sent;
            _context21.next = 7;
            return Promise.all(certificates.map( /*#__PURE__*/function () {
              var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(certificate) {
                var certificateInfo;
                return _regeneratorRuntime().wrap(function _callee19$(_context20) {
                  while (1) switch (_context20.prev = _context20.next) {
                    case 0:
                      _context20.next = 2;
                      return cryptoPro.certificateInfo(certificate.id);
                    case 2:
                      certificateInfo = _context20.sent;
                      return _context20.abrupt("return", certificateInfo.IsValid ? certificate : undefined);
                    case 4:
                    case "end":
                      return _context20.stop();
                  }
                }, _callee19);
              }));
              return function (_x27) {
                return _ref10.apply(this, arguments);
              };
            }()));
          case 7:
            certificates = _context21.sent.filter(Boolean).sort(function (a, b) {
              return a.name > b.name ? 1 : -1;
            });
            _context21.next = 13;
            break;
          case 10:
            _context21.prev = 10;
            _context21.t0 = _context21["catch"](1);
            if (_context21.t0.message === 'Can\'t find object by id') {
              confirm('Потеряно соединение с КриптоПро browser plugin. Обновите страницу.\nLost connection to CryptoPro browser plugin. Reload page.') && window.location.reload();
            } else {
              console.log(_context21.t0);
            }
          case 13:
            return _context21.abrupt("return", certificates);
          case 14:
          case "end":
            return _context21.stop();
        }
      }, _callee20, null, [[1, 10]]);
    }));
    return _getValidCertificates.apply(this, arguments);
  }
  function signData(_x10, _x11, _x12) {
    return _signData.apply(this, arguments);
  }
  function _signData() {
    _signData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21(dataToSign, thumbprint, individual) {
      var certificate, signature, signatureFileIndividual;
      return _regeneratorRuntime().wrap(function _callee21$(_context22) {
        while (1) switch (_context22.prev = _context22.next) {
          case 0:
            _context22.next = 2;
            return cryptoPro.certificateInfo(thumbprint);
          case 2:
            certificate = _context22.sent;
            _context22.next = 5;
            return cryptoPro.signData(dataToSign, certificate.Thumbprint);
          case 5:
            signature = _context22.sent;
            _context22.next = 8;
            return createSignatureFileIndividual(signature, certificate.Name, individual, thumbprint);
          case 8:
            signatureFileIndividual = _context22.sent;
            individual.addValue('v-s:digitalSignature', signatureFileIndividual);
            return _context22.abrupt("return", true);
          case 11:
          case "end":
            return _context22.stop();
        }
      }, _callee21);
    }));
    return _signData.apply(this, arguments);
  }
  function decorator(fn, pre, post, err) {
    return /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var _len,
        args,
        _key,
        result,
        _args = arguments;
      return _regeneratorRuntime().wrap(function _callee$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            for (_len = _args.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = _args[_key];
            }
            _context2.prev = 1;
            _context2.t0 = pre && typeof pre === 'function';
            if (!_context2.t0) {
              _context2.next = 6;
              break;
            }
            _context2.next = 6;
            return pre.call.apply(pre, [this].concat(args));
          case 6:
            _context2.next = 8;
            return fn.call.apply(fn, [this].concat(args));
          case 8:
            result = _context2.sent;
            _context2.t1 = post && typeof post === 'function';
            if (!_context2.t1) {
              _context2.next = 13;
              break;
            }
            _context2.next = 13;
            return post.call.apply(post, [this].concat(args));
          case 13:
            return _context2.abrupt("return", result);
          case 16:
            _context2.prev = 16;
            _context2.t2 = _context2["catch"](1);
            _context2.t3 = err && typeof err === 'function';
            if (!_context2.t3) {
              _context2.next = 22;
              break;
            }
            _context2.next = 22;
            return err.call.apply(err, [this].concat(args));
          case 22:
            throw _context2.t2;
          case 23:
          case "end":
            return _context2.stop();
        }
      }, _callee, this, [[1, 16]]);
    }));
  }
  function showSpinner() {
    document.getElementById('load-indicator').style.display = '';
  }
  function hideSpinner() {
    document.getElementById('load-indicator').style.display = 'none';
  }
  function spinnerDecorator(fn) {
    return decorator(fn, showSpinner, hideSpinner, hideSpinner);
  }
  return {
    setters: [function (_ruscryptojs) {
      CryptoPro = _ruscryptojs.CryptoPro;
    }, function (_commonUtilJs) {
      CommonUtil = _commonUtilJs.default;
    }, function (_commonIndividual_modelJs) {
      IndividualModel = _commonIndividual_modelJs.default;
    }],
    execute: function () {
      cryptoPro = new CryptoPro();
      dialogTemplate = "\n  <dialog class=\"certificate-dialog\" style=\"border: 2px solid gray; border-radius: 0.5em;\">\n    <form class=\"certificate-form\" method=\"dialog\">\n      <div class=\"form-group\">\n        <label>\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442</label>\n        <select class=\"certificate-select form-control\"></select>\n      </div>\n      <button type=\"submit\" class=\"certificate-submit btn btn-primary\">Ok</button>\n      <button type=\"button\" class=\"certificate-cancel btn btn-default\">Cancel</button>\n    </form>\n  </dialog>\n";
      _export("default", Crypto = /*#__PURE__*/function () {
        function Crypto() {
          _classCallCheck(this, Crypto);
          this.inited = false;
        }
        _createClass(Crypto, [{
          key: "genUUID",
          value: function genUUID() {
            return crypto.randomUUID();
          }
        }, {
          key: "init",
          value: function () {
            var _init = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
              return _regeneratorRuntime().wrap(function _callee3$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    if (!this.inited) {
                      _context4.next = 2;
                      break;
                    }
                    return _context4.abrupt("return", this.inited);
                  case 2:
                    this.inited = new Promise( /*#__PURE__*/function () {
                      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(resolve, reject) {
                        var cryptoProInfo;
                        return _regeneratorRuntime().wrap(function _callee2$(_context3) {
                          while (1) switch (_context3.prev = _context3.next) {
                            case 0:
                              _context3.prev = 0;
                              _context3.next = 3;
                              return cryptoPro.init();
                            case 3:
                              cryptoProInfo = _context3.sent;
                              console.log('CryptoPro initialized', cryptoProInfo);
                              _context3.next = 12;
                              break;
                            case 7:
                              _context3.prev = 7;
                              _context3.t0 = _context3["catch"](0);
                              if (_context3.t0.message === 'Can\'t find object by id') {
                                confirm('Потеряно соединение с КриптоПро browser plugin. Обновите страницу.\nLost connection to CryptoPro browser plugin. Reload page.') && window.location.reload();
                              }
                              console.log('Initialization failed', _context3.t0);
                              reject(_context3.t0);
                            case 12:
                              resolve();
                            case 13:
                            case "end":
                              return _context3.stop();
                          }
                        }, _callee2, null, [[0, 7]]);
                      }));
                      return function (_x13, _x14) {
                        return _ref2.apply(this, arguments);
                      };
                    }());
                    return _context4.abrupt("return", this.inited);
                  case 4:
                  case "end":
                    return _context4.stop();
                }
              }, _callee3, this);
            }));
            function init() {
              return _init.apply(this, arguments);
            }
            return init;
          }()
        }, {
          key: "chooseYourStamp",
          value: function () {
            var _chooseYourStamp = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
              var certificates, container, dialog, select, submit, cancel;
              return _regeneratorRuntime().wrap(function _callee5$(_context6) {
                while (1) switch (_context6.prev = _context6.next) {
                  case 0:
                    _context6.next = 2;
                    return spinnerDecorator(getValidCertificates)();
                  case 2:
                    certificates = _context6.sent;
                    if (!(certificates.length > 1)) {
                      _context6.next = 16;
                      break;
                    }
                    container = document.createElement('div');
                    container.innerHTML = dialogTemplate;
                    document.body.appendChild(container);
                    dialog = container.querySelector('.certificate-dialog');
                    select = container.querySelector('.certificate-select');
                    submit = container.querySelector('.certificate-submit');
                    cancel = container.querySelector('.certificate-cancel');
                    certificates.forEach(function (certificate) {
                      var option = document.createElement('option');
                      option.value = certificate.id;
                      option.label = certificate.name;
                      select.appendChild(option);
                    });
                    select.addEventListener('change', function () {
                      submit.value = select.value;
                    });
                    return _context6.abrupt("return", new Promise(function (resolve, reject) {
                      dialog.addEventListener('close', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
                        var thumbprint;
                        return _regeneratorRuntime().wrap(function _callee4$(_context5) {
                          while (1) switch (_context5.prev = _context5.next) {
                            case 0:
                              thumbprint = dialog.returnValue;
                              if (thumbprint) {
                                _context5.next = 3;
                                break;
                              }
                              return _context5.abrupt("return", reject(undefined));
                            case 3:
                              document.body.removeChild(container);
                              resolve(thumbprint);
                            case 5:
                            case "end":
                              return _context5.stop();
                          }
                        }, _callee4);
                      })));
                      cancel.addEventListener('click', function () {
                        submit.value = '';
                        dialog.close();
                        reject(undefined);
                      });
                      submit.value = select.value;
                      dialog.returnValue = '';
                      dialog.showModal();
                    }));
                  case 16:
                    if (!(certificates.length === 1)) {
                      _context6.next = 20;
                      break;
                    }
                    return _context6.abrupt("return", certificates[0].id);
                  case 20:
                    alert('Ошибка: Действующие сертификаты электронной подписи не найдены.\nError: Valid signature certificates not found.');
                  case 21:
                  case "end":
                    return _context6.stop();
                }
              }, _callee5);
            }));
            function chooseYourStamp() {
              return _chooseYourStamp.apply(this, arguments);
            }
            return chooseYourStamp;
          }()
        }, {
          key: "addSignature",
          value: function () {
            var _addSignature = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(fileIndividual) {
              var dataToSign, certificates, container, dialog, select, submit, cancel;
              return _regeneratorRuntime().wrap(function _callee7$(_context8) {
                while (1) switch (_context8.prev = _context8.next) {
                  case 0:
                    if (!fileIndividual.file) {
                      _context8.next = 6;
                      break;
                    }
                    _context8.next = 3;
                    return spinnerDecorator(readDataToSign)(fileIndividual.file);
                  case 3:
                    dataToSign = _context8.sent;
                    _context8.next = 9;
                    break;
                  case 6:
                    _context8.next = 8;
                    return spinnerDecorator(getDataToSign)("/files/".concat(fileIndividual.id));
                  case 8:
                    dataToSign = _context8.sent;
                  case 9:
                    _context8.next = 11;
                    return spinnerDecorator(getValidCertificates)();
                  case 11:
                    certificates = _context8.sent;
                    if (!(certificates.length > 1)) {
                      _context8.next = 25;
                      break;
                    }
                    container = document.createElement('div');
                    container.innerHTML = dialogTemplate;
                    document.body.appendChild(container);
                    dialog = container.querySelector('.certificate-dialog');
                    select = container.querySelector('.certificate-select');
                    submit = container.querySelector('.certificate-submit');
                    cancel = container.querySelector('.certificate-cancel');
                    certificates.forEach(function (certificate) {
                      var option = document.createElement('option');
                      option.value = certificate.id;
                      option.label = certificate.name;
                      select.appendChild(option);
                    });
                    select.addEventListener('change', function () {
                      submit.value = select.value;
                    });
                    return _context8.abrupt("return", new Promise(function (resolve, reject) {
                      dialog.addEventListener('close', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
                        var thumbprint;
                        return _regeneratorRuntime().wrap(function _callee6$(_context7) {
                          while (1) switch (_context7.prev = _context7.next) {
                            case 0:
                              thumbprint = dialog.returnValue;
                              if (thumbprint) {
                                _context7.next = 3;
                                break;
                              }
                              return _context7.abrupt("return", resolve(undefined));
                            case 3:
                              document.body.removeChild(container);
                              _context7.next = 6;
                              return spinnerDecorator(signData)(dataToSign, thumbprint, fileIndividual);
                            case 6:
                              resolve(thumbprint);
                            case 7:
                            case "end":
                              return _context7.stop();
                          }
                        }, _callee6);
                      })));
                      cancel.addEventListener('click', function () {
                        submit.value = '';
                        dialog.close();
                        resolve(undefined);
                      });
                      submit.value = select.value;
                      dialog.returnValue = '';
                      dialog.showModal();
                    }));
                  case 25:
                    if (!(certificates.length === 1)) {
                      _context8.next = 30;
                      break;
                    }
                    _context8.next = 28;
                    return spinnerDecorator(signData)(dataToSign, certificates[0].id, fileIndividual);
                  case 28:
                    _context8.next = 31;
                    break;
                  case 30:
                    alert('Ошибка: Действующие сертификаты электронной подписи не найдены.\nError: Valid signature certificates not found.');
                  case 31:
                  case "end":
                    return _context8.stop();
                }
              }, _callee7);
            }));
            function addSignature(_x15) {
              return _addSignature.apply(this, arguments);
            }
            return addSignature;
          }()
        }, {
          key: "addBatchSignature",
          value: function () {
            var _addBatchSignature = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(fileIndividuals) {
              var dataArray, certificates, container, dialog, select, submit, cancel;
              return _regeneratorRuntime().wrap(function _callee12$(_context13) {
                while (1) switch (_context13.prev = _context13.next) {
                  case 0:
                    _context13.next = 2;
                    return fileIndividuals.reduce( /*#__PURE__*/function () {
                      var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(acc, fileIndividual) {
                        var dataToSign;
                        return _regeneratorRuntime().wrap(function _callee8$(_context9) {
                          while (1) switch (_context9.prev = _context9.next) {
                            case 0:
                              _context9.next = 2;
                              return acc;
                            case 2:
                              acc = _context9.sent;
                              if (!fileIndividual.file) {
                                _context9.next = 9;
                                break;
                              }
                              _context9.next = 6;
                              return spinnerDecorator(readDataToSign)(fileIndividual.file);
                            case 6:
                              dataToSign = _context9.sent;
                              _context9.next = 12;
                              break;
                            case 9:
                              _context9.next = 11;
                              return spinnerDecorator(getDataToSign)("/files/".concat(fileIndividual.id));
                            case 11:
                              dataToSign = _context9.sent;
                            case 12:
                              acc.push(dataToSign);
                              return _context9.abrupt("return", acc);
                            case 14:
                            case "end":
                              return _context9.stop();
                          }
                        }, _callee8);
                      }));
                      return function (_x17, _x18) {
                        return _ref5.apply(this, arguments);
                      };
                    }(), Promise.resolve([]));
                  case 2:
                    dataArray = _context13.sent;
                    _context13.next = 5;
                    return spinnerDecorator(getValidCertificates)();
                  case 5:
                    certificates = _context13.sent;
                    if (!(certificates.length > 1)) {
                      _context13.next = 19;
                      break;
                    }
                    container = document.createElement('div');
                    container.innerHTML = dialogTemplate;
                    document.body.appendChild(container);
                    dialog = container.querySelector('.certificate-dialog');
                    select = container.querySelector('.certificate-select');
                    submit = container.querySelector('.certificate-submit');
                    cancel = container.querySelector('.certificate-cancel');
                    certificates.forEach(function (certificate) {
                      var option = document.createElement('option');
                      option.value = certificate.id;
                      option.label = certificate.name;
                      select.appendChild(option);
                    });
                    select.addEventListener('change', function () {
                      submit.value = select.value;
                    });
                    return _context13.abrupt("return", new Promise(function (resolve, reject) {
                      dialog.addEventListener('close', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
                        var thumbprint;
                        return _regeneratorRuntime().wrap(function _callee10$(_context11) {
                          while (1) switch (_context11.prev = _context11.next) {
                            case 0:
                              thumbprint = dialog.returnValue;
                              if (thumbprint) {
                                _context11.next = 3;
                                break;
                              }
                              return _context11.abrupt("return", resolve(undefined));
                            case 3:
                              document.body.removeChild(container);
                              _context11.next = 6;
                              return dataArray.reduce( /*#__PURE__*/function () {
                                var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(acc, dataToSign, i) {
                                  return _regeneratorRuntime().wrap(function _callee9$(_context10) {
                                    while (1) switch (_context10.prev = _context10.next) {
                                      case 0:
                                        _context10.next = 2;
                                        return acc;
                                      case 2:
                                        _context10.next = 4;
                                        return spinnerDecorator(signData)(dataToSign, thumbprint, fileIndividuals[i]);
                                      case 4:
                                        return _context10.abrupt("return", true);
                                      case 5:
                                      case "end":
                                        return _context10.stop();
                                    }
                                  }, _callee9);
                                }));
                                return function (_x19, _x20, _x21) {
                                  return _ref7.apply(this, arguments);
                                };
                              }(), Promise.resolve());
                            case 6:
                              resolve(thumbprint);
                            case 7:
                            case "end":
                              return _context11.stop();
                          }
                        }, _callee10);
                      })));
                      cancel.addEventListener('click', function () {
                        submit.value = '';
                        dialog.close();
                        resolve(undefined);
                      });
                      submit.value = select.value;
                      dialog.returnValue = '';
                      dialog.showModal();
                    }));
                  case 19:
                    if (!(certificates.length === 1)) {
                      _context13.next = 24;
                      break;
                    }
                    _context13.next = 22;
                    return dataArray.reduce( /*#__PURE__*/function () {
                      var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(acc, dataToSign, i) {
                        return _regeneratorRuntime().wrap(function _callee11$(_context12) {
                          while (1) switch (_context12.prev = _context12.next) {
                            case 0:
                              _context12.next = 2;
                              return acc;
                            case 2:
                              _context12.next = 4;
                              return spinnerDecorator(signData)(dataToSign, certificates[0].id, fileIndividuals[i]);
                            case 4:
                              return _context12.abrupt("return", true);
                            case 5:
                            case "end":
                              return _context12.stop();
                          }
                        }, _callee11);
                      }));
                      return function (_x22, _x23, _x24) {
                        return _ref8.apply(this, arguments);
                      };
                    }(), Promise.resolve());
                  case 22:
                    _context13.next = 25;
                    break;
                  case 24:
                    alert('Ошибка: Действующие сертификаты электронной подписи не найдены.\nError: Valid signature certificates not found.');
                  case 25:
                  case "end":
                    return _context13.stop();
                }
              }, _callee12);
            }));
            function addBatchSignature(_x16) {
              return _addBatchSignature.apply(this, arguments);
            }
            return addBatchSignature;
          }()
        }, {
          key: "verifySignature",
          value: function () {
            var _verifySignature = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(fileIndividual, signatureFileIndividual) {
              return _regeneratorRuntime().wrap(function _callee14$(_context15) {
                while (1) switch (_context15.prev = _context15.next) {
                  case 0:
                    _context15.next = 2;
                    return spinnerDecorator( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
                      var fileIndividualResponse, dataToCheck, signatureFileIndividualResponse, signature;
                      return _regeneratorRuntime().wrap(function _callee13$(_context14) {
                        while (1) switch (_context14.prev = _context14.next) {
                          case 0:
                            _context14.next = 2;
                            return fetch("/files/".concat(fileIndividual.id));
                          case 2:
                            fileIndividualResponse = _context14.sent;
                            if (fileIndividualResponse.ok) {
                              _context14.next = 5;
                              break;
                            }
                            throw new Error('Network error.');
                          case 5:
                            _context14.t0 = btoa;
                            _context14.t1 = Uint8Array;
                            _context14.next = 9;
                            return fileIndividualResponse.arrayBuffer();
                          case 9:
                            _context14.t2 = _context14.sent;
                            _context14.t3 = new _context14.t1(_context14.t2).reduce(function (data, byte) {
                              return data + String.fromCharCode(byte);
                            }, '');
                            dataToCheck = (0, _context14.t0)(_context14.t3);
                            _context14.next = 14;
                            return fetch("/files/".concat(signatureFileIndividual.id));
                          case 14:
                            signatureFileIndividualResponse = _context14.sent;
                            if (signatureFileIndividualResponse.ok) {
                              _context14.next = 17;
                              break;
                            }
                            throw new Error('Network error.');
                          case 17:
                            _context14.next = 19;
                            return signatureFileIndividualResponse.text();
                          case 19:
                            signature = _context14.sent;
                            _context14.next = 22;
                            return cryptoPro.verifySign(dataToCheck, signature);
                          case 22:
                            return _context14.abrupt("return", _context14.sent);
                          case 23:
                          case "end":
                            return _context14.stop();
                        }
                      }, _callee13);
                    })))(fileIndividual, signatureFileIndividual);
                  case 2:
                    return _context15.abrupt("return", _context15.sent);
                  case 3:
                  case "end":
                    return _context15.stop();
                }
              }, _callee14);
            }));
            function verifySignature(_x25, _x26) {
              return _verifySignature.apply(this, arguments);
            }
            return verifySignature;
          }()
        }], [{
          key: "getInstance",
          value: function getInstance() {
            if (!this.instance) {
              this.instance = new Crypto();
            }
            return this.instance;
          }
        }]);
        return Crypto;
      }());
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfcmVnZW5lcmF0b3JSdW50aW1lIiwiZXhwb3J0cyIsIk9wIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duIiwiaGFzT3duUHJvcGVydHkiLCJkZWZpbmVQcm9wZXJ0eSIsIm9iaiIsImtleSIsImRlc2MiLCJ2YWx1ZSIsIiRTeW1ib2wiLCJTeW1ib2wiLCJpdGVyYXRvclN5bWJvbCIsIml0ZXJhdG9yIiwiYXN5bmNJdGVyYXRvclN5bWJvbCIsImFzeW5jSXRlcmF0b3IiLCJ0b1N0cmluZ1RhZ1N5bWJvbCIsInRvU3RyaW5nVGFnIiwiZGVmaW5lIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiZXJyIiwid3JhcCIsImlubmVyRm4iLCJvdXRlckZuIiwic2VsZiIsInRyeUxvY3NMaXN0IiwicHJvdG9HZW5lcmF0b3IiLCJHZW5lcmF0b3IiLCJnZW5lcmF0b3IiLCJjcmVhdGUiLCJjb250ZXh0IiwiQ29udGV4dCIsIm1ha2VJbnZva2VNZXRob2QiLCJ0cnlDYXRjaCIsImZuIiwiYXJnIiwidHlwZSIsImNhbGwiLCJDb250aW51ZVNlbnRpbmVsIiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsIkl0ZXJhdG9yUHJvdG90eXBlIiwiZ2V0UHJvdG8iLCJnZXRQcm90b3R5cGVPZiIsIk5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlIiwidmFsdWVzIiwiR3AiLCJkZWZpbmVJdGVyYXRvck1ldGhvZHMiLCJmb3JFYWNoIiwibWV0aG9kIiwiX2ludm9rZSIsIkFzeW5jSXRlcmF0b3IiLCJQcm9taXNlSW1wbCIsImludm9rZSIsInJlc29sdmUiLCJyZWplY3QiLCJyZWNvcmQiLCJyZXN1bHQiLCJfX2F3YWl0IiwidGhlbiIsInVud3JhcHBlZCIsImVycm9yIiwicHJldmlvdXNQcm9taXNlIiwiY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmciLCJzdGF0ZSIsIkVycm9yIiwiZG9uZVJlc3VsdCIsImRlbGVnYXRlIiwiZGVsZWdhdGVSZXN1bHQiLCJtYXliZUludm9rZURlbGVnYXRlIiwic2VudCIsIl9zZW50IiwiZGlzcGF0Y2hFeGNlcHRpb24iLCJhYnJ1cHQiLCJkb25lIiwibWV0aG9kTmFtZSIsInVuZGVmaW5lZCIsInJldHVybiIsIlR5cGVFcnJvciIsImluZm8iLCJyZXN1bHROYW1lIiwibmV4dCIsIm5leHRMb2MiLCJwdXNoVHJ5RW50cnkiLCJsb2NzIiwiZW50cnkiLCJ0cnlMb2MiLCJjYXRjaExvYyIsImZpbmFsbHlMb2MiLCJhZnRlckxvYyIsInRyeUVudHJpZXMiLCJwdXNoIiwicmVzZXRUcnlFbnRyeSIsImNvbXBsZXRpb24iLCJyZXNldCIsIml0ZXJhYmxlIiwiaXRlcmF0b3JNZXRob2QiLCJpc05hTiIsImxlbmd0aCIsImkiLCJkaXNwbGF5TmFtZSIsImlzR2VuZXJhdG9yRnVuY3Rpb24iLCJnZW5GdW4iLCJjdG9yIiwiY29uc3RydWN0b3IiLCJuYW1lIiwibWFyayIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiYXdyYXAiLCJhc3luYyIsIlByb21pc2UiLCJpdGVyIiwia2V5cyIsInZhbCIsIm9iamVjdCIsInJldmVyc2UiLCJwb3AiLCJza2lwVGVtcFJlc2V0IiwicHJldiIsImNoYXJBdCIsInNsaWNlIiwic3RvcCIsInJvb3RSZWNvcmQiLCJydmFsIiwiZXhjZXB0aW9uIiwiaGFuZGxlIiwibG9jIiwiY2F1Z2h0IiwiaGFzQ2F0Y2giLCJoYXNGaW5hbGx5IiwiZmluYWxseUVudHJ5IiwiY29tcGxldGUiLCJmaW5pc2giLCJjYXRjaCIsInRocm93biIsImRlbGVnYXRlWWllbGQiLCJhc3luY0dlbmVyYXRvclN0ZXAiLCJnZW4iLCJfbmV4dCIsIl90aHJvdyIsIl9hc3luY1RvR2VuZXJhdG9yIiwiYXJncyIsImFyZ3VtZW50cyIsImFwcGx5IiwiY3JlYXRlU2lnbmF0dXJlRmlsZUluZGl2aWR1YWwiLCJfeCIsIl94MiIsIl94MyIsIl94NCIsIl9jcmVhdGVTaWduYXR1cmVGaWxlSW5kaXZpZHVhbCIsIl9jYWxsZWUxNSIsInNpZ25hdHVyZSIsInBhcmVudCIsInRodW1icHJpbnQiLCJ1cmkiLCJwYXRoIiwiZmlsZUluZGl2aWR1YWwiLCJfY2FsbGVlMTUkIiwiX2NvbnRleHQxNiIsIkNvbW1vblV0aWwiLCJndWlkIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwic3Vic3RyaW5nIiwic3BsaXQiLCJqb2luIiwiSW5kaXZpZHVhbE1vZGVsIiwidXBsb2FkU2lnbmF0dXJlRmlsZSIsInNhdmUiLCJ0MCIsImFsZXJ0IiwiX3g1IiwiX3g2IiwiX3g3IiwiX3VwbG9hZFNpZ25hdHVyZUZpbGUiLCJfY2FsbGVlMTYiLCJmb3JtRGF0YSIsImJsb2IiLCJyZXNwb25zZSIsIl9jYWxsZWUxNiQiLCJfY29udGV4dDE3IiwiRm9ybURhdGEiLCJCbG9iIiwiYXBwZW5kIiwiZmV0Y2giLCJib2R5Iiwib2siLCJyZWFkRGF0YVRvU2lnbiIsIl94OCIsIl9yZWFkRGF0YVRvU2lnbiIsIl9jYWxsZWUxNyIsImZpbGUiLCJfY2FsbGVlMTckIiwiX2NvbnRleHQxOCIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJyZWFkQXNBcnJheUJ1ZmZlciIsIm9ubG9hZCIsImUiLCJkYXRhVG9TaWduIiwiYnRvYSIsIlVpbnQ4QXJyYXkiLCJ0YXJnZXQiLCJyZWR1Y2UiLCJkYXRhIiwiYnl0ZSIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsIm9uZXJyb3IiLCJnZXREYXRhVG9TaWduIiwiX3g5IiwiX2dldERhdGFUb1NpZ24iLCJfY2FsbGVlMTgiLCJ1cmwiLCJmaWxlUmVzcG9uc2UiLCJfY2FsbGVlMTgkIiwiX2NvbnRleHQxOSIsInQxIiwiYXJyYXlCdWZmZXIiLCJ0MiIsInQzIiwiZ2V0VmFsaWRDZXJ0aWZpY2F0ZXMiLCJfZ2V0VmFsaWRDZXJ0aWZpY2F0ZXMiLCJfY2FsbGVlMjAiLCJjZXJ0aWZpY2F0ZXMiLCJfY2FsbGVlMjAkIiwiX2NvbnRleHQyMSIsImNyeXB0b1BybyIsImxpc3RDZXJ0aWZpY2F0ZXMiLCJhbGwiLCJtYXAiLCJfcmVmMTAiLCJfY2FsbGVlMTkiLCJjZXJ0aWZpY2F0ZSIsImNlcnRpZmljYXRlSW5mbyIsIl9jYWxsZWUxOSQiLCJfY29udGV4dDIwIiwiaWQiLCJJc1ZhbGlkIiwiX3gyNyIsImZpbHRlciIsIkJvb2xlYW4iLCJzb3J0IiwiYSIsImIiLCJtZXNzYWdlIiwiY29uZmlybSIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVsb2FkIiwiY29uc29sZSIsImxvZyIsInNpZ25EYXRhIiwiX3gxMCIsIl94MTEiLCJfeDEyIiwiX3NpZ25EYXRhIiwiX2NhbGxlZTIxIiwiaW5kaXZpZHVhbCIsInNpZ25hdHVyZUZpbGVJbmRpdmlkdWFsIiwiX2NhbGxlZTIxJCIsIl9jb250ZXh0MjIiLCJUaHVtYnByaW50IiwiTmFtZSIsImFkZFZhbHVlIiwiZGVjb3JhdG9yIiwicHJlIiwicG9zdCIsIl9jYWxsZWUiLCJfbGVuIiwiX2tleSIsIl9hcmdzIiwiX2NhbGxlZSQiLCJfY29udGV4dDIiLCJBcnJheSIsImNvbmNhdCIsInNob3dTcGlubmVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInN0eWxlIiwiZGlzcGxheSIsImhpZGVTcGlubmVyIiwic3Bpbm5lckRlY29yYXRvciIsInNldHRlcnMiLCJfcnVzY3J5cHRvanMiLCJDcnlwdG9Qcm8iLCJfY29tbW9uVXRpbEpzIiwiZGVmYXVsdCIsIl9jb21tb25JbmRpdmlkdWFsX21vZGVsSnMiLCJleGVjdXRlIiwiZGlhbG9nVGVtcGxhdGUiLCJfZXhwb3J0IiwiQ3J5cHRvIiwiX2NsYXNzQ2FsbENoZWNrIiwiaW5pdGVkIiwiX2NyZWF0ZUNsYXNzIiwiZ2VuVVVJRCIsImNyeXB0byIsInJhbmRvbVVVSUQiLCJfaW5pdCIsIl9jYWxsZWUzIiwiX2NhbGxlZTMkIiwiX2NvbnRleHQ0IiwiX3JlZjIiLCJfY2FsbGVlMiIsImNyeXB0b1Byb0luZm8iLCJfY2FsbGVlMiQiLCJfY29udGV4dDMiLCJpbml0IiwiX3gxMyIsIl94MTQiLCJfY2hvb3NlWW91clN0YW1wIiwiX2NhbGxlZTUiLCJjb250YWluZXIiLCJkaWFsb2ciLCJzZWxlY3QiLCJzdWJtaXQiLCJjYW5jZWwiLCJfY2FsbGVlNSQiLCJfY29udGV4dDYiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwiYXBwZW5kQ2hpbGQiLCJxdWVyeVNlbGVjdG9yIiwib3B0aW9uIiwibGFiZWwiLCJhZGRFdmVudExpc3RlbmVyIiwiX2NhbGxlZTQiLCJfY2FsbGVlNCQiLCJfY29udGV4dDUiLCJyZXR1cm5WYWx1ZSIsInJlbW92ZUNoaWxkIiwiY2xvc2UiLCJzaG93TW9kYWwiLCJjaG9vc2VZb3VyU3RhbXAiLCJfYWRkU2lnbmF0dXJlIiwiX2NhbGxlZTciLCJfY2FsbGVlNyQiLCJfY29udGV4dDgiLCJfY2FsbGVlNiIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NyIsImFkZFNpZ25hdHVyZSIsIl94MTUiLCJfYWRkQmF0Y2hTaWduYXR1cmUiLCJfY2FsbGVlMTIiLCJmaWxlSW5kaXZpZHVhbHMiLCJkYXRhQXJyYXkiLCJfY2FsbGVlMTIkIiwiX2NvbnRleHQxMyIsIl9yZWY1IiwiX2NhbGxlZTgiLCJhY2MiLCJfY2FsbGVlOCQiLCJfY29udGV4dDkiLCJfeDE3IiwiX3gxOCIsIl9jYWxsZWUxMCIsIl9jYWxsZWUxMCQiLCJfY29udGV4dDExIiwiX3JlZjciLCJfY2FsbGVlOSIsIl9jYWxsZWU5JCIsIl9jb250ZXh0MTAiLCJfeDE5IiwiX3gyMCIsIl94MjEiLCJfcmVmOCIsIl9jYWxsZWUxMSIsIl9jYWxsZWUxMSQiLCJfY29udGV4dDEyIiwiX3gyMiIsIl94MjMiLCJfeDI0IiwiYWRkQmF0Y2hTaWduYXR1cmUiLCJfeDE2IiwiX3ZlcmlmeVNpZ25hdHVyZSIsIl9jYWxsZWUxNCIsIl9jYWxsZWUxNCQiLCJfY29udGV4dDE1IiwiX2NhbGxlZTEzIiwiZmlsZUluZGl2aWR1YWxSZXNwb25zZSIsImRhdGFUb0NoZWNrIiwic2lnbmF0dXJlRmlsZUluZGl2aWR1YWxSZXNwb25zZSIsIl9jYWxsZWUxMyQiLCJfY29udGV4dDE0IiwidGV4dCIsInZlcmlmeVNpZ24iLCJ2ZXJpZnlTaWduYXR1cmUiLCJfeDI1IiwiX3gyNiIsImdldEluc3RhbmNlIiwiaW5zdGFuY2UiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zb3VyY2Utd2ViL2pzL2Jyb3dzZXIvY3J5cHRvLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENyeXB0b2dyYXBoeSBpbnRlZ3JhdGlvblxuXG5pbXBvcnQge0NyeXB0b1Byb30gZnJvbSAncnVzY3J5cHRvanMnO1xuaW1wb3J0IENvbW1vblV0aWwgZnJvbSAnLi4vY29tbW9uL3V0aWwuanMnO1xuaW1wb3J0IEluZGl2aWR1YWxNb2RlbCBmcm9tICcuLi9jb21tb24vaW5kaXZpZHVhbF9tb2RlbC5qcyc7XG5cbmNvbnN0IGNyeXB0b1BybyA9IG5ldyBDcnlwdG9Qcm8oKTtcblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlU2lnbmF0dXJlRmlsZUluZGl2aWR1YWwgKHNpZ25hdHVyZSwgbmFtZSwgcGFyZW50LCB0aHVtYnByaW50KSB7XG4gIGNvbnN0IHVyaSA9IENvbW1vblV0aWwuZ3VpZCgpO1xuICBjb25zdCBwYXRoID0gJy8nICsgbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnN1YnN0cmluZygwLCAxMCkuc3BsaXQoJy0nKS5qb2luKCcvJyk7XG4gIGNvbnN0IGZpbGVJbmRpdmlkdWFsID0gbmV3IEluZGl2aWR1YWxNb2RlbCgpO1xuICBmaWxlSW5kaXZpZHVhbFsncmRmOnR5cGUnXSA9ICd2LXM6RmlsZSc7XG4gIGZpbGVJbmRpdmlkdWFsWyd2LXM6ZmlsZU5hbWUnXSA9IG5hbWUgKyAnLnNpZyc7XG4gIGZpbGVJbmRpdmlkdWFsWydyZGZzOmxhYmVsJ10gPSBuYW1lICsgJy5zaWcnO1xuICBmaWxlSW5kaXZpZHVhbFsndi1zOmZpbGVTaXplJ10gPSBzaWduYXR1cmUubGVuZ3RoO1xuICBmaWxlSW5kaXZpZHVhbFsndi1zOmZpbGVVcmknXSA9IHVyaTtcbiAgZmlsZUluZGl2aWR1YWxbJ3YtczpmaWxlUGF0aCddID0gcGF0aDtcbiAgZmlsZUluZGl2aWR1YWxbJ3YtczpwYXJlbnQnXSA9IHBhcmVudDtcbiAgZmlsZUluZGl2aWR1YWxbJ3YtczpiYWNrd2FyZFRhcmdldCddID0gcGFyZW50O1xuICBmaWxlSW5kaXZpZHVhbFsndi1zOmNhblJlYWQnXSA9IHRydWU7XG4gIGZpbGVJbmRpdmlkdWFsWyd2LXM6Y2FuVXBkYXRlJ10gPSB0cnVlO1xuICBmaWxlSW5kaXZpZHVhbFsndi1zOmNhbkRlbGV0ZSddID0gdHJ1ZTtcbiAgZmlsZUluZGl2aWR1YWxbJ3YtczpiYWNrd2FyZFByb3BlcnR5J10gPSAndi1zOmRpZ2l0YWxTaWduYXR1cmUnO1xuICBpZiAodGh1bWJwcmludCAhPSB1bmRlZmluZWQpIHtcbiAgICBmaWxlSW5kaXZpZHVhbFsndi1zOnNpZ25hdHVyZVN0YW1wJ10gPSB0aHVtYnByaW50O1xuICB9XG4gIHRyeSB7XG4gICAgYXdhaXQgdXBsb2FkU2lnbmF0dXJlRmlsZShzaWduYXR1cmUsIHBhdGgsIHVyaSk7XG4gICAgYXdhaXQgZmlsZUluZGl2aWR1YWwuc2F2ZSgpO1xuICAgIHJldHVybiBmaWxlSW5kaXZpZHVhbDtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBhbGVydChlcnJvcik7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gdXBsb2FkU2lnbmF0dXJlRmlsZSAoc2lnbmF0dXJlLCBwYXRoLCB1cmkpIHtcbiAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtzaWduYXR1cmVdLCB7dHlwZTogJ3BsYWluL3RleHQnfSk7XG4gIGZvcm1EYXRhLmFwcGVuZCgnZmlsZScsIGJsb2IpO1xuICBmb3JtRGF0YS5hcHBlbmQoJ3BhdGgnLCBwYXRoKTtcbiAgZm9ybURhdGEuYXBwZW5kKCd1cmknLCB1cmkpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvZmlsZXMnLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgYm9keTogZm9ybURhdGEsXG4gIH0pO1xuICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCfQndC1INGD0LTQsNC70L7RgdGMINGB0L7Qt9C00LDRgtGMINGE0LDQudC7LdC/0L7QtNC/0LjRgdC4LiBGYWlsZWQgdG8gY3JlYXRlIHNpZ25hdHVyZSBmaWxlLicpO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlYWREYXRhVG9TaWduIChmaWxlKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoZmlsZSk7XG4gICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICBjb25zdCBkYXRhVG9TaWduID0gYnRvYShuZXcgVWludDhBcnJheShlLnRhcmdldC5yZXN1bHQpLnJlZHVjZSgoZGF0YSwgYnl0ZSkgPT4gZGF0YSArIFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZSksICcnKSk7XG4gICAgICByZXNvbHZlKGRhdGFUb1NpZ24pO1xuICAgIH07XG4gICAgcmVhZGVyLm9uZXJyb3IgPSByZWplY3Q7XG4gIH0pO1xufVxuYXN5bmMgZnVuY3Rpb24gZ2V0RGF0YVRvU2lnbiAodXJsKSB7XG4gIGNvbnN0IGZpbGVSZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XG4gIGlmICghZmlsZVJlc3BvbnNlLm9rKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yLicpO1xuICB9XG4gIGNvbnN0IGRhdGFUb1NpZ24gPSBidG9hKG5ldyBVaW50OEFycmF5KGF3YWl0IGZpbGVSZXNwb25zZS5hcnJheUJ1ZmZlcigpKS5yZWR1Y2UoKGRhdGEsIGJ5dGUpID0+IGRhdGEgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGUpLCAnJykpO1xuICByZXR1cm4gZGF0YVRvU2lnbjtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0VmFsaWRDZXJ0aWZpY2F0ZXMgKCkge1xuICBsZXQgY2VydGlmaWNhdGVzID0gW107XG4gIHRyeSB7XG4gICAgY2VydGlmaWNhdGVzID0gYXdhaXQgY3J5cHRvUHJvLmxpc3RDZXJ0aWZpY2F0ZXMoKTtcbiAgICBjZXJ0aWZpY2F0ZXMgPSAoYXdhaXQgUHJvbWlzZS5hbGwoY2VydGlmaWNhdGVzLm1hcChhc3luYyAoY2VydGlmaWNhdGUpID0+IHtcbiAgICAgIGNvbnN0IGNlcnRpZmljYXRlSW5mbyA9IGF3YWl0IGNyeXB0b1Byby5jZXJ0aWZpY2F0ZUluZm8oY2VydGlmaWNhdGUuaWQpO1xuICAgICAgcmV0dXJuIGNlcnRpZmljYXRlSW5mby5Jc1ZhbGlkID8gY2VydGlmaWNhdGUgOiB1bmRlZmluZWQ7XG4gICAgfSkpKS5maWx0ZXIoQm9vbGVhbikuc29ydCgoYSwgYikgPT4gYS5uYW1lID4gYi5uYW1lID8gMSA6IC0xKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpZiAoZXJyb3IubWVzc2FnZSA9PT0gJ0NhblxcJ3QgZmluZCBvYmplY3QgYnkgaWQnKSB7XG4gICAgICBjb25maXJtKCfQn9C+0YLQtdGA0Y/QvdC+INGB0L7QtdC00LjQvdC10L3QuNC1INGBINCa0YDQuNC/0YLQvtCf0YDQviBicm93c2VyIHBsdWdpbi4g0J7QsdC90L7QstC40YLQtSDRgdGC0YDQsNC90LjRhtGDLlxcbkxvc3QgY29ubmVjdGlvbiB0byBDcnlwdG9Qcm8gYnJvd3NlciBwbHVnaW4uIFJlbG9hZCBwYWdlLicpICYmIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY2VydGlmaWNhdGVzO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzaWduRGF0YSAoZGF0YVRvU2lnbiwgdGh1bWJwcmludCwgaW5kaXZpZHVhbCkge1xuICBjb25zdCBjZXJ0aWZpY2F0ZSA9IGF3YWl0IGNyeXB0b1Byby5jZXJ0aWZpY2F0ZUluZm8odGh1bWJwcmludCk7XG4gIGNvbnN0IHNpZ25hdHVyZSA9IGF3YWl0IGNyeXB0b1Byby5zaWduRGF0YShkYXRhVG9TaWduLCBjZXJ0aWZpY2F0ZS5UaHVtYnByaW50KTtcbiAgY29uc3Qgc2lnbmF0dXJlRmlsZUluZGl2aWR1YWwgPSBhd2FpdCBjcmVhdGVTaWduYXR1cmVGaWxlSW5kaXZpZHVhbChzaWduYXR1cmUsIGNlcnRpZmljYXRlLk5hbWUsIGluZGl2aWR1YWwsIHRodW1icHJpbnQpO1xuICBpbmRpdmlkdWFsLmFkZFZhbHVlKCd2LXM6ZGlnaXRhbFNpZ25hdHVyZScsIHNpZ25hdHVyZUZpbGVJbmRpdmlkdWFsKTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbmNvbnN0IGRpYWxvZ1RlbXBsYXRlID0gYFxuICA8ZGlhbG9nIGNsYXNzPVwiY2VydGlmaWNhdGUtZGlhbG9nXCIgc3R5bGU9XCJib3JkZXI6IDJweCBzb2xpZCBncmF5OyBib3JkZXItcmFkaXVzOiAwLjVlbTtcIj5cbiAgICA8Zm9ybSBjbGFzcz1cImNlcnRpZmljYXRlLWZvcm1cIiBtZXRob2Q9XCJkaWFsb2dcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgIDxsYWJlbD7QktGL0LHQtdGA0LjRgtC1INGB0LXRgNGC0LjRhNC40LrQsNGCPC9sYWJlbD5cbiAgICAgICAgPHNlbGVjdCBjbGFzcz1cImNlcnRpZmljYXRlLXNlbGVjdCBmb3JtLWNvbnRyb2xcIj48L3NlbGVjdD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJjZXJ0aWZpY2F0ZS1zdWJtaXQgYnRuIGJ0bi1wcmltYXJ5XCI+T2s8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2VydGlmaWNhdGUtY2FuY2VsIGJ0biBidG4tZGVmYXVsdFwiPkNhbmNlbDwvYnV0dG9uPlxuICAgIDwvZm9ybT5cbiAgPC9kaWFsb2c+XG5gO1xuXG5mdW5jdGlvbiBkZWNvcmF0b3IgKGZuLCBwcmUsIHBvc3QsIGVycikge1xuICByZXR1cm4gYXN5bmMgZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICB0cnkge1xuICAgICAgcHJlICYmIHR5cGVvZiBwcmUgPT09ICdmdW5jdGlvbicgJiYgYXdhaXQgcHJlLmNhbGwodGhpcywgLi4uYXJncyk7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBmbi5jYWxsKHRoaXMsIC4uLmFyZ3MpO1xuICAgICAgcG9zdCAmJiB0eXBlb2YgcG9zdCA9PT0gJ2Z1bmN0aW9uJyAmJiBhd2FpdCBwb3N0LmNhbGwodGhpcywgLi4uYXJncyk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBlcnIgJiYgdHlwZW9mIGVyciA9PT0gJ2Z1bmN0aW9uJyAmJiBhd2FpdCBlcnIuY2FsbCh0aGlzLCAuLi5hcmdzKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gc2hvd1NwaW5uZXIgKCkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9hZC1pbmRpY2F0b3InKS5zdHlsZS5kaXNwbGF5ID0gJyc7XG59XG5cbmZ1bmN0aW9uIGhpZGVTcGlubmVyICgpIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYWQtaW5kaWNhdG9yJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbn1cblxuZnVuY3Rpb24gc3Bpbm5lckRlY29yYXRvciAoZm4pIHtcbiAgcmV0dXJuIGRlY29yYXRvcihmbiwgc2hvd1NwaW5uZXIsIGhpZGVTcGlubmVyLCBoaWRlU3Bpbm5lcik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENyeXB0byB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLmluaXRlZCA9IGZhbHNlO1xuICB9XG5cbiAgc3RhdGljIGdldEluc3RhbmNlICgpIHtcbiAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgQ3J5cHRvKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICB9XG5cbiAgZ2VuVVVJRCAoKSB7XG4gICAgcmV0dXJuIGNyeXB0by5yYW5kb21VVUlEKCk7XG4gIH1cblxuICBhc3luYyBpbml0ICgpIHtcbiAgICBpZiAodGhpcy5pbml0ZWQpIHJldHVybiB0aGlzLmluaXRlZDtcbiAgICB0aGlzLmluaXRlZCA9IG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNyeXB0b1Byb0luZm8gPSBhd2FpdCBjcnlwdG9Qcm8uaW5pdCgpO1xuICAgICAgICBjb25zb2xlLmxvZygnQ3J5cHRvUHJvIGluaXRpYWxpemVkJywgY3J5cHRvUHJvSW5mbyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3IubWVzc2FnZSA9PT0gJ0NhblxcJ3QgZmluZCBvYmplY3QgYnkgaWQnKSB7XG4gICAgICAgICAgY29uZmlybSgn0J/QvtGC0LXRgNGP0L3QviDRgdC+0LXQtNC40L3QtdC90LjQtSDRgSDQmtGA0LjQv9GC0L7Qn9GA0L4gYnJvd3NlciBwbHVnaW4uINCe0LHQvdC+0LLQuNGC0LUg0YHRgtGA0LDQvdC40YbRgy5cXG5Mb3N0IGNvbm5lY3Rpb24gdG8gQ3J5cHRvUHJvIGJyb3dzZXIgcGx1Z2luLiBSZWxvYWQgcGFnZS4nKSAmJiB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coJ0luaXRpYWxpemF0aW9uIGZhaWxlZCcsIGVycm9yKTtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH1cbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5pbml0ZWQ7XG4gIH1cblxuICBhc3luYyBjaG9vc2VZb3VyU3RhbXAgKCkge1xuICAgIGNvbnN0IGNlcnRpZmljYXRlcyA9IGF3YWl0IHNwaW5uZXJEZWNvcmF0b3IoZ2V0VmFsaWRDZXJ0aWZpY2F0ZXMpKCk7XG4gICAgaWYgKGNlcnRpZmljYXRlcy5sZW5ndGggPiAxKSB7XG4gICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBkaWFsb2dUZW1wbGF0ZTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgICAgIGNvbnN0IGRpYWxvZyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuY2VydGlmaWNhdGUtZGlhbG9nJyk7XG4gICAgICBjb25zdCBzZWxlY3QgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLmNlcnRpZmljYXRlLXNlbGVjdCcpO1xuICAgICAgY29uc3Qgc3VibWl0ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5jZXJ0aWZpY2F0ZS1zdWJtaXQnKTtcbiAgICAgIGNvbnN0IGNhbmNlbCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuY2VydGlmaWNhdGUtY2FuY2VsJyk7XG4gICAgICBjZXJ0aWZpY2F0ZXMuZm9yRWFjaCgoY2VydGlmaWNhdGUpID0+IHtcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICAgIG9wdGlvbi52YWx1ZSA9IGNlcnRpZmljYXRlLmlkO1xuICAgICAgICBvcHRpb24ubGFiZWwgPSBjZXJ0aWZpY2F0ZS5uYW1lO1xuICAgICAgICBzZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgICAgIH0pO1xuICAgICAgc2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgc3VibWl0LnZhbHVlID0gc2VsZWN0LnZhbHVlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBkaWFsb2cuYWRkRXZlbnRMaXN0ZW5lcignY2xvc2UnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgdGh1bWJwcmludCA9IGRpYWxvZy5yZXR1cm5WYWx1ZTtcbiAgICAgICAgICBpZiAoIXRodW1icHJpbnQpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QodW5kZWZpbmVkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChjb250YWluZXIpO1xuICAgICAgICAgIHJlc29sdmUodGh1bWJwcmludCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgc3VibWl0LnZhbHVlID0gJyc7XG4gICAgICAgICAgZGlhbG9nLmNsb3NlKCk7XG4gICAgICAgICAgcmVqZWN0KHVuZGVmaW5lZCk7XG4gICAgICAgIH0pO1xuICAgICAgICBzdWJtaXQudmFsdWUgPSBzZWxlY3QudmFsdWU7XG4gICAgICAgIGRpYWxvZy5yZXR1cm5WYWx1ZSA9ICcnO1xuICAgICAgICBkaWFsb2cuc2hvd01vZGFsKCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGNlcnRpZmljYXRlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiBjZXJ0aWZpY2F0ZXNbMF0uaWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFsZXJ0KCfQntGI0LjQsdC60LA6INCU0LXQudGB0YLQstGD0Y7RidC40LUg0YHQtdGA0YLQuNGE0LjQutCw0YLRiyDRjdC70LXQutGC0YDQvtC90L3QvtC5INC/0L7QtNC/0LjRgdC4INC90LUg0L3QsNC50LTQtdC90YsuXFxuRXJyb3I6IFZhbGlkIHNpZ25hdHVyZSBjZXJ0aWZpY2F0ZXMgbm90IGZvdW5kLicpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGFkZFNpZ25hdHVyZSAoZmlsZUluZGl2aWR1YWwpIHtcbiAgICBsZXQgZGF0YVRvU2lnbjtcbiAgICBpZiAoZmlsZUluZGl2aWR1YWwuZmlsZSkge1xuICAgICAgZGF0YVRvU2lnbiA9IGF3YWl0IHNwaW5uZXJEZWNvcmF0b3IocmVhZERhdGFUb1NpZ24pKGZpbGVJbmRpdmlkdWFsLmZpbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRhVG9TaWduID0gYXdhaXQgc3Bpbm5lckRlY29yYXRvcihnZXREYXRhVG9TaWduKShgL2ZpbGVzLyR7ZmlsZUluZGl2aWR1YWwuaWR9YCk7XG4gICAgfVxuICAgIGNvbnN0IGNlcnRpZmljYXRlcyA9IGF3YWl0IHNwaW5uZXJEZWNvcmF0b3IoZ2V0VmFsaWRDZXJ0aWZpY2F0ZXMpKCk7XG4gICAgaWYgKGNlcnRpZmljYXRlcy5sZW5ndGggPiAxKSB7XG4gICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBkaWFsb2dUZW1wbGF0ZTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgICAgIGNvbnN0IGRpYWxvZyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuY2VydGlmaWNhdGUtZGlhbG9nJyk7XG4gICAgICBjb25zdCBzZWxlY3QgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLmNlcnRpZmljYXRlLXNlbGVjdCcpO1xuICAgICAgY29uc3Qgc3VibWl0ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5jZXJ0aWZpY2F0ZS1zdWJtaXQnKTtcbiAgICAgIGNvbnN0IGNhbmNlbCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuY2VydGlmaWNhdGUtY2FuY2VsJyk7XG4gICAgICBjZXJ0aWZpY2F0ZXMuZm9yRWFjaCgoY2VydGlmaWNhdGUpID0+IHtcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICAgIG9wdGlvbi52YWx1ZSA9IGNlcnRpZmljYXRlLmlkO1xuICAgICAgICBvcHRpb24ubGFiZWwgPSBjZXJ0aWZpY2F0ZS5uYW1lO1xuICAgICAgICBzZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgICAgIH0pO1xuICAgICAgc2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgc3VibWl0LnZhbHVlID0gc2VsZWN0LnZhbHVlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBkaWFsb2cuYWRkRXZlbnRMaXN0ZW5lcignY2xvc2UnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgdGh1bWJwcmludCA9IGRpYWxvZy5yZXR1cm5WYWx1ZTtcbiAgICAgICAgICBpZiAoIXRodW1icHJpbnQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoY29udGFpbmVyKTtcbiAgICAgICAgICBhd2FpdCBzcGlubmVyRGVjb3JhdG9yKHNpZ25EYXRhKShkYXRhVG9TaWduLCB0aHVtYnByaW50LCBmaWxlSW5kaXZpZHVhbCk7XG4gICAgICAgICAgcmVzb2x2ZSh0aHVtYnByaW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNhbmNlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICBzdWJtaXQudmFsdWUgPSAnJztcbiAgICAgICAgICBkaWFsb2cuY2xvc2UoKTtcbiAgICAgICAgICByZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgICAgIH0pO1xuICAgICAgICBzdWJtaXQudmFsdWUgPSBzZWxlY3QudmFsdWU7XG4gICAgICAgIGRpYWxvZy5yZXR1cm5WYWx1ZSA9ICcnO1xuICAgICAgICBkaWFsb2cuc2hvd01vZGFsKCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGNlcnRpZmljYXRlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIGF3YWl0IHNwaW5uZXJEZWNvcmF0b3Ioc2lnbkRhdGEpKGRhdGFUb1NpZ24sIGNlcnRpZmljYXRlc1swXS5pZCwgZmlsZUluZGl2aWR1YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhbGVydCgn0J7RiNC40LHQutCwOiDQlNC10LnRgdGC0LLRg9GO0YnQuNC1INGB0LXRgNGC0LjRhNC40LrQsNGC0Ysg0Y3Qu9C10LrRgtGA0L7QvdC90L7QuSDQv9C+0LTQv9C40YHQuCDQvdC1INC90LDQudC00LXQvdGLLlxcbkVycm9yOiBWYWxpZCBzaWduYXR1cmUgY2VydGlmaWNhdGVzIG5vdCBmb3VuZC4nKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBhZGRCYXRjaFNpZ25hdHVyZSAoZmlsZUluZGl2aWR1YWxzKSB7XG4gICAgY29uc3QgZGF0YUFycmF5ID0gYXdhaXQgZmlsZUluZGl2aWR1YWxzLnJlZHVjZShhc3luYyAoYWNjLCBmaWxlSW5kaXZpZHVhbCkgPT4ge1xuICAgICAgYWNjID0gYXdhaXQgYWNjO1xuICAgICAgbGV0IGRhdGFUb1NpZ247XG4gICAgICBpZiAoZmlsZUluZGl2aWR1YWwuZmlsZSkge1xuICAgICAgICBkYXRhVG9TaWduID0gYXdhaXQgc3Bpbm5lckRlY29yYXRvcihyZWFkRGF0YVRvU2lnbikoZmlsZUluZGl2aWR1YWwuZmlsZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhVG9TaWduID0gYXdhaXQgc3Bpbm5lckRlY29yYXRvcihnZXREYXRhVG9TaWduKShgL2ZpbGVzLyR7ZmlsZUluZGl2aWR1YWwuaWR9YCk7XG4gICAgICB9XG4gICAgICBhY2MucHVzaChkYXRhVG9TaWduKTtcbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwgUHJvbWlzZS5yZXNvbHZlKFtdKSk7XG4gICAgY29uc3QgY2VydGlmaWNhdGVzID0gYXdhaXQgc3Bpbm5lckRlY29yYXRvcihnZXRWYWxpZENlcnRpZmljYXRlcykoKTtcbiAgICBpZiAoY2VydGlmaWNhdGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IGRpYWxvZ1RlbXBsYXRlO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgICAgY29uc3QgZGlhbG9nID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5jZXJ0aWZpY2F0ZS1kaWFsb2cnKTtcbiAgICAgIGNvbnN0IHNlbGVjdCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuY2VydGlmaWNhdGUtc2VsZWN0Jyk7XG4gICAgICBjb25zdCBzdWJtaXQgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLmNlcnRpZmljYXRlLXN1Ym1pdCcpO1xuICAgICAgY29uc3QgY2FuY2VsID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5jZXJ0aWZpY2F0ZS1jYW5jZWwnKTtcbiAgICAgIGNlcnRpZmljYXRlcy5mb3JFYWNoKChjZXJ0aWZpY2F0ZSkgPT4ge1xuICAgICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgICAgb3B0aW9uLnZhbHVlID0gY2VydGlmaWNhdGUuaWQ7XG4gICAgICAgIG9wdGlvbi5sYWJlbCA9IGNlcnRpZmljYXRlLm5hbWU7XG4gICAgICAgIHNlbGVjdC5hcHBlbmRDaGlsZChvcHRpb24pO1xuICAgICAgfSk7XG4gICAgICBzZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICBzdWJtaXQudmFsdWUgPSBzZWxlY3QudmFsdWU7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGRpYWxvZy5hZGRFdmVudExpc3RlbmVyKCdjbG9zZScsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICBjb25zdCB0aHVtYnByaW50ID0gZGlhbG9nLnJldHVyblZhbHVlO1xuICAgICAgICAgIGlmICghdGh1bWJwcmludCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodW5kZWZpbmVkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChjb250YWluZXIpO1xuICAgICAgICAgIGF3YWl0IGRhdGFBcnJheS5yZWR1Y2UoYXN5bmMgKGFjYywgZGF0YVRvU2lnbiwgaSkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgYWNjO1xuICAgICAgICAgICAgYXdhaXQgc3Bpbm5lckRlY29yYXRvcihzaWduRGF0YSkoZGF0YVRvU2lnbiwgdGh1bWJwcmludCwgZmlsZUluZGl2aWR1YWxzW2ldKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH0sIFByb21pc2UucmVzb2x2ZSgpKTtcbiAgICAgICAgICByZXNvbHZlKHRodW1icHJpbnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgY2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgIHN1Ym1pdC52YWx1ZSA9ICcnO1xuICAgICAgICAgIGRpYWxvZy5jbG9zZSgpO1xuICAgICAgICAgIHJlc29sdmUodW5kZWZpbmVkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHN1Ym1pdC52YWx1ZSA9IHNlbGVjdC52YWx1ZTtcbiAgICAgICAgZGlhbG9nLnJldHVyblZhbHVlID0gJyc7XG4gICAgICAgIGRpYWxvZy5zaG93TW9kYWwoKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoY2VydGlmaWNhdGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgYXdhaXQgZGF0YUFycmF5LnJlZHVjZShhc3luYyAoYWNjLCBkYXRhVG9TaWduLCBpKSA9PiB7XG4gICAgICAgIGF3YWl0IGFjYztcbiAgICAgICAgYXdhaXQgc3Bpbm5lckRlY29yYXRvcihzaWduRGF0YSkoZGF0YVRvU2lnbiwgY2VydGlmaWNhdGVzWzBdLmlkLCBmaWxlSW5kaXZpZHVhbHNbaV0pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sIFByb21pc2UucmVzb2x2ZSgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWxlcnQoJ9Ce0YjQuNCx0LrQsDog0JTQtdC50YHRgtCy0YPRjtGJ0LjQtSDRgdC10YDRgtC40YTQuNC60LDRgtGLINGN0LvQtdC60YLRgNC+0L3QvdC+0Lkg0L/QvtC00L/QuNGB0Lgg0L3QtSDQvdCw0LnQtNC10L3Riy5cXG5FcnJvcjogVmFsaWQgc2lnbmF0dXJlIGNlcnRpZmljYXRlcyBub3QgZm91bmQuJyk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgdmVyaWZ5U2lnbmF0dXJlIChmaWxlSW5kaXZpZHVhbCwgc2lnbmF0dXJlRmlsZUluZGl2aWR1YWwpIHtcbiAgICByZXR1cm4gYXdhaXQgc3Bpbm5lckRlY29yYXRvcihhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBmaWxlSW5kaXZpZHVhbFJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC9maWxlcy8ke2ZpbGVJbmRpdmlkdWFsLmlkfWApO1xuICAgICAgaWYgKCFmaWxlSW5kaXZpZHVhbFJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvci4nKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGRhdGFUb0NoZWNrID0gYnRvYShuZXcgVWludDhBcnJheShhd2FpdCBmaWxlSW5kaXZpZHVhbFJlc3BvbnNlLmFycmF5QnVmZmVyKCkpLnJlZHVjZSgoZGF0YSwgYnl0ZSkgPT4gZGF0YSArIFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZSksICcnKSk7XG4gICAgICBjb25zdCBzaWduYXR1cmVGaWxlSW5kaXZpZHVhbFJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC9maWxlcy8ke3NpZ25hdHVyZUZpbGVJbmRpdmlkdWFsLmlkfWApO1xuICAgICAgaWYgKCFzaWduYXR1cmVGaWxlSW5kaXZpZHVhbFJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvci4nKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHNpZ25hdHVyZSA9IGF3YWl0IHNpZ25hdHVyZUZpbGVJbmRpdmlkdWFsUmVzcG9uc2UudGV4dCgpO1xuICAgICAgcmV0dXJuIGF3YWl0IGNyeXB0b1Byby52ZXJpZnlTaWduKGRhdGFUb0NoZWNrLCBzaWduYXR1cmUpO1xuICAgIH0pKGZpbGVJbmRpdmlkdWFsLCBzaWduYXR1cmVGaWxlSW5kaXZpZHVhbCk7XG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7aURBQ0EscUpBQUFBLG1CQUFBLFlBQUFBLENBQUEsV0FBQUMsT0FBQSxTQUFBQSxPQUFBLE9BQUFDLEVBQUEsR0FBQUMsTUFBQSxDQUFBQyxTQUFBLEVBQUFDLE1BQUEsR0FBQUgsRUFBQSxDQUFBSSxjQUFBLEVBQUFDLGNBQUEsR0FBQUosTUFBQSxDQUFBSSxjQUFBLGNBQUFDLEdBQUEsRUFBQUMsR0FBQSxFQUFBQyxJQUFBLElBQUFGLEdBQUEsQ0FBQUMsR0FBQSxJQUFBQyxJQUFBLENBQUFDLEtBQUEsS0FBQUMsT0FBQSx3QkFBQUMsTUFBQSxHQUFBQSxNQUFBLE9BQUFDLGNBQUEsR0FBQUYsT0FBQSxDQUFBRyxRQUFBLGtCQUFBQyxtQkFBQSxHQUFBSixPQUFBLENBQUFLLGFBQUEsdUJBQUFDLGlCQUFBLEdBQUFOLE9BQUEsQ0FBQU8sV0FBQSw4QkFBQUMsT0FBQVosR0FBQSxFQUFBQyxHQUFBLEVBQUFFLEtBQUEsV0FBQVIsTUFBQSxDQUFBSSxjQUFBLENBQUFDLEdBQUEsRUFBQUMsR0FBQSxJQUFBRSxLQUFBLEVBQUFBLEtBQUEsRUFBQVUsVUFBQSxNQUFBQyxZQUFBLE1BQUFDLFFBQUEsU0FBQWYsR0FBQSxDQUFBQyxHQUFBLFdBQUFXLE1BQUEsbUJBQUFJLEdBQUEsSUFBQUosTUFBQSxZQUFBQSxDQUFBWixHQUFBLEVBQUFDLEdBQUEsRUFBQUUsS0FBQSxXQUFBSCxHQUFBLENBQUFDLEdBQUEsSUFBQUUsS0FBQSxnQkFBQWMsS0FB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