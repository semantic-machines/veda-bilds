"use strict";

System.register(["jsplumb", "jquery", "../common/lib/riot.js", "../common/individual_model.js", "../browser/util.js"], function (_export, _context) {
  "use strict";

  var $, riot, IndividualModel, BrowserUtil, jsWorkflow;
  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function () {}; return { s: F, n: function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function (e) { throw e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function () { it = it.call(o); }, n: function () { var step = it.next(); normalCompletion = step.done; return step; }, e: function (e) { didErr = true; err = e; }, f: function () { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
  function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function () { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function (obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function (skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function () { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function (exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function (type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function (record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function (finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function (tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function (iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
  function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
  /**
   * Collect entities
   * @param {Object} element
   * @param {Object} list
   */
  function collectEntities(element, list) {
    var props = Object.getOwnPropertyNames(element);
    var _iterator = _createForOfIteratorHelper(props),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var prop = _step.value;
        if (element[prop] && Array.isArray(element[prop])) {
          element[prop].forEach(function (subElement) {
            if (typeof subElement.hasValue === 'function' && subElement.hasValue('rdf:type')) {
              subElement['rdf:type'].forEach(function (subRdfType) {
                if (subRdfType.id === 'v-wf:VarDefine' || subRdfType.id === 'v-wf:Transform' || subRdfType.id === 'v-wf:Mapping') {
                  list.add(subElement);
                }
                if (subRdfType.id === 'v-wf:Mapping') {
                  list.add(subElement['v-wf:mapToVariable'][0]);
                }
              });
            }
          });
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  function forSubIndividual(net, property, id, func) {
    if (net[property] === undefined) {
      return;
    }
    net[property].forEach(function (el) {
      if (el.id == id) {
        func(el);
      }
    });
  }
  function removeSubIndividual(net, property, id) {
    if (net[property] === undefined) {
      return;
    }
    return net[property].filter(function (item) {
      return item.id !== id;
    });
  }
  return {
    setters: [function (_jsplumb) {}, function (_jquery) {
      $ = _jquery.default;
    }, function (_commonLibRiotJs) {
      riot = _commonLibRiotJs.default;
    }, function (_commonIndividual_modelJs) {
      IndividualModel = _commonIndividual_modelJs.default;
    }, function (_browserUtilJs) {
      BrowserUtil = _browserUtilJs.default;
    }],
    execute: function () {
      jsWorkflow = {};
      _export("default", jsWorkflow); // Leveraging the ready function of jsPlumb.
      jsWorkflow.ready = jsPlumb.ready;

      // No API call should be made until the DOM has been initialized.
      jsWorkflow.ready(function () {
        /**
         * Create a workflow instance.
         * @constructor Instance
         */
        jsWorkflow.Instance = function () {
          // Get a new instance of jsPlumb.
          this.instance = jsPlumb.getInstance();
        };

        /**
         * Initialize the workflow instance.
         * @param {String} workflowData Id of an HTML container within which the worlflow is to be rendered
         * @param {Object} veda global "veda" instance
         * @param {IndividualModel} net individual of rdfs:type "v-wf:Net"
         * @param {Element} template
         * @param {Element} container
         * @return {Object} instance
         */
        jsWorkflow.Instance.prototype.init = function (workflowData, veda, net, template, container) {
          var workflow;
          var canvasSizePx = 10000;
          var elementId;
          var selectedElementId;
          var selectedElementType;
          var selectedElementSourceId;
          var process;
          var mode = 'view';
          var max_process_depth = 0;
          var dragList = [];
          var props = $('#props', template);
          var propsHead = $('#props-head', template);
          if (net.hasValue('rdf:type', 'v-wf:Net')) {
            mode = 'edit';
            elementId = net.id;
          } else if (net.hasValue('rdf:type', 'v-wf:Process')) {
            mode = 'view';
            process = net;
            net = net.hasValue('v-wf:instanceOf') ? net['v-wf:instanceOf'][0] : [];
            elementId = net.id;
          }
          if (_typeof(workflowData) === 'object') {
            workflow = workflowData.container;
            jsWorkflow.Instance.createWorkflowDOM(workflowData);
          } else {
            workflow = workflowData;
          }
          net['offsetX'] = veda['workflow' + elementId + '-offsetX'];
          net['offsetY'] = veda['workflow' + elementId + '-offsetY'];
          net['currentScale'] = veda['workflow' + elementId + '-zoom'];
          if (net['currentScale'] == null) net['currentScale'] = 1.0;
          if (!net['offsetX']) {
            net['offsetX'] = 0;
          }
          if (!net['offsetY']) {
            net['offsetY'] = 0;
          }
          if (mode === 'view') {
            var holder = $('<div>');
            propsHead.text(net['rdfs:label'].join(', '));
            process.present(holder, 'v-wf:ProcessPropsTemplate');
            props.empty().append(holder);
          }
          var wdata = $('#' + workflowData, template);
          wdata.css({
            'height': canvasSizePx + 'px',
            'width': canvasSizePx + 'px'
          });
          $('.workflow-wrapper', template).addClass('calculated-height');
          $('<canvas>').attr({
            'id': 'select_canvas',
            'width': canvasSizePx + 'px',
            'height': canvasSizePx + 'px'
          }).appendTo(wdata);
          var as_start = null;
          var ctx = $('#select_canvas', template).get(0).getContext('2d');
          ctx.globalAlpha = 0.3;
          wdata.on('mousedown', function (e) {
            if (e.shiftKey) {
              as_start = [e.offsetX, e.offsetY];
              $('#select_canvas', template).show();
            }
          }).on('mouseup', function (e) {
            if (e.shiftKey) {
              var end = [e.offsetX, e.offsetY];
              var x1 = Math.min(as_start[0], end[0]) - canvasSizePx / 2;
              var x2 = Math.max(as_start[0], end[0]) - canvasSizePx / 2;
              var y1 = Math.min(as_start[1], end[1]) - canvasSizePx / 2;
              var y2 = Math.max(as_start[1], end[1]) - canvasSizePx / 2;
              $('#select_canvas', template).hide();
              net['v-wf:consistsOf'].forEach(function (state) {
                if (state.hasValue('v-wf:locationX') && state.hasValue('v-wf:locationY')) {
                  if (x1 <= state['v-wf:locationX'][0] && state['v-wf:locationX'][0] <= x2 && y1 <= state['v-wf:locationY'][0] && state['v-wf:locationY'][0] <= y2) {
                    var $state = $('#' + BrowserUtil.escape4$(state.id), template);
                    instance.addToDragList($state);
                    e.stopPropagation();
                  }
                }
              });
            }
          }).on('mousemove', function (e) {
            if (e.shiftKey && e.buttons == 1) {
              if (!as_start) {
                return;
              }
              ctx.clearRect(0, 0, e.delegateTarget.offsetWidth, e.delegateTarget.offsetHeight);
              ctx.beginPath();
              var x = e.offsetX;
              var y = e.offsetY;
              ctx.rect(as_start[0], as_start[1], x - as_start[0], y - as_start[1]);
              ctx.fill();
            }
          });
          wdata.draggable({
            drag: function drag(event, ui) {
              if (!event.shiftKey) {
                instance.moveCanvas(ui.position.left, ui.position.top);
                $('#workflow-context-menu', template).hide();
              } else {
                return false;
              }
            }
          }).on('click', function (event) {
            if (!event.shiftKey) {
              instance.defocus();
              var _holder;
              if (mode === 'view') {
                _holder = $('<div>');
                propsHead.text(net['rdfs:label'].join(', '));
                process.present(_holder, 'v-wf:ProcessPropsTemplate');
                props.empty().append(_holder);
              }
              if (mode === 'edit') {
                _holder = $('<div>');
                propsHead.text(net['rdfs:label'].join(', '));
                net.present(_holder, 'v-wf:SimpleNetTemplate', 'edit');
                props.empty().append(_holder);
              }
            }
          });
          var instance = this.instance;

          // Import all the given defaults into this instance.
          instance.importDefaults({
            Endpoint: 'Dot',
            HoverPaintStyle: {
              strokeStyle: '#6699FF',
              lineWidth: 1
            },
            ConnectionOverlays: [['Arrow', {
              location: 1,
              id: 'arrow',
              length: 14,
              width: 10,
              foldback: 0.8
            }], ['Label', {
              label: 'transition',
              id: 'label',
              cssClass: 'aLabel'
            }]],
            Container: workflow // Id of the workflow container.
          });

          instance.moveCanvas = function (newLeft, newTop) {
            // DEBUG $('#workflow-net-name', template).text(newLeft+" / "+newTop);

            // change scale and offset
            wdata.css({
              'left': newLeft + 'px',
              'top': newTop + 'px'
            });
            veda['workflow' + elementId + '-offsetX'] = newLeft;
            veda['workflow' + elementId + '-offsetY'] = newTop;
            net['offsetX'] = newLeft;
            net['offsetY'] = newTop;
          };
          if (net['offsetX'] != null && net['offsetX'] != 0) {
            instance.moveCanvas(net['offsetX'], net['offsetY']);
          } else {
            instance.moveCanvas(-canvasSizePx / 2, -canvasSizePx / 2);
          }

          // Bind a click listener to each transition (connection). On double click, the transition is deleted.
          if (mode == 'edit') {
            instance.bind('dblclick', function (transition) {
              riot.route('#/' + transition.id + '///edit');
            });
          }

          // Fill info panel on flow click
          instance.bind('click', function (transition) {
            var flowId = transition.getData();
            veda['workflow' + elementId + '-selectedElement'] = transition.id;
            instance.defocus();
            transition.setPaintStyle({
              strokeStyle: '#FF0000'
            });
            if (transition.id == '__label') {
              transition = transition.component;
            }
            selectedElementId = transition.id;
            selectedElementType = 'flow';
            selectedElementSourceId = transition.sourceId;
            var about = new IndividualModel(flowId);
            var holder = $('<div>');
            about.present(holder);
            props.append(holder);
            if (about.hasValue('rdfs:label')) propsHead.text(about['rdfs:label'].join(', '));else propsHead.text(about.id);
          });
          instance.bind('connectionMoved', function (info, originalEvent) {
            if (info.originalSourceId !== info.newSourceId) {
              net['v-wf:consistsOf'].forEach(function (state) {
                if (state.id === info.originalSourceId) {
                  state['v-wf:hasFlow'] = removeSubIndividual(state, 'v-wf:hasFlow', info.connection.id);
                }
                if (state.id === info.newSourceId) {
                  state['v-wf:hasFlow'] = state.hasValue('v-wf:hasFlow') ? state['v-wf:hasFlow'].concat(new IndividualModel(info.connection.id)) : [new IndividualModel(info.connection.id)];
                }
              });
            }
          });

          // Handle creating new flow event
          instance.bind('connection', function (info) {
            var source = new IndividualModel(info.sourceId);
            var flowExists = source.get('v-wf:hasFlow').filter(function (flow1) {
              return flow1.hasValue('v-wf:flowsInto', info.targetId);
            }).length;
            if (flowExists) {
              return;
            }
            var flow = new IndividualModel(); // Create Flow individual
            flow['rdf:type'] = 'v-wf:Flow';
            flow['v-wf:flowsInto'] = info.targetId; // Set Flow target
            net.addValue('v-wf:consistsOf', flow); // Add new Flow to Net
            source.addValue('v-wf:hasFlow', flow); // Add new Flow to source
            info.connection.setData(flow.id);
          });
          var subNetViewButton = function subNetViewButton(state, $state) {
            if (!state.hasValue('v-wf:subNet')) {
              return;
            }
            $('<span/>', {
              'click': function click() {
                riot.route('#/' + state['v-wf:subNet'][0].id + '///edit');
              },
              'class': 'glyphicon glyphicon-search subnet-link'
            }).appendTo($state);
          };
          var executorMark = function executorMark(state, $state) {
            if (!state.hasValue('v-wf:executor')) {
              return;
            }
            state['v-wf:executor'][0].load().then(function (executor) {
              if (executor['rdf:type'][0].id == 'v-s:Appointment') {
                $('<span/>', {
                  'class': 'glyphicon glyphicon-user'
                }).appendTo($state);
              } else {
                $('<span/>', {
                  'class': 'glyphicon glyphicon-cog'
                }).appendTo($state);
              }
            });
          };
          instance.updateSVGBackground = function (item) {
            var svgBackground = '';
            if (item.hasClass('split-and')) {
              svgBackground += '<line x1=\'80\' y1=\'25\' x2=\'100\' y2=\'0\' style=\'stroke:rgb(0,0,0); stroke-width:1\' /><line x1=\'80\' y1=\'0\' x2=\'80\' y2=\'50\' style=\'stroke:rgb(0,0,0); stroke-width:1\' /><line x1=\'80\' y1=\'25\' x2=\'100\' y2=\'50\' style=\'stroke:rgb(0,0,0); stroke-width:1\' />';
            }
            if (item.hasClass('split-or')) {
              svgBackground += '<line x1=\'100\' y1=\'25\' x2=\'90\' y2=\'0\' style=\'stroke:rgb(0,0,0); stroke-width:1\' /><line x1=\'90\' y1=\'0\' x2=\'80\' y2=\'25\' style=\'stroke:rgb(0,0,0); stroke-width:1\' /><line x1=\'80\' y1=\'0\' x2=\'80\' y2=\'50\' style=\'stroke:rgb(0,0,0); stroke-width:1\' /><line x1=\'100\' y1=\'25\' x2=\'90\' y2=\'50\' style=\'stroke:rgb(0,0,0); stroke-width:1\' /><line x1=\'90\' y1=\'50\' x2=\'80\' y2=\'25\' style=\'stroke:rgb(0,0,0); stroke-width:1\' />';
            }
            if (item.hasClass('split-xor')) {
              svgBackground += '<line x1=\'100\' y1=\'25\' x2=\'80\' y2=\'0\' style=\'stroke:rgb(0,0,0); stroke-width:1\' /><line x1=\'80\' y1=\'0\' x2=\'80\' y2=\'50\' style=\'stroke:rgb(0,0,0); stroke-width:1\' /><line x1=\'100\' y1=\'25\' x2=\'80\' y2=\'50\' style=\'stroke:rgb(0,0,0); stroke-width:1\' />';
            }
            if (item.hasClass('join-and')) {
              svgBackground += '<line x1=\'20\' y1=\'25\' x2=\'0\' y2=\'0\' style=\'stroke:rgb(0,0,0); stroke-width:1\' /><line x1=\'20\' y1=\'0\' x2=\'20\' y2=\'50\' style=\'stroke:rgb(0,0,0); stroke-width:1\' /><line x1=\'20\' y1=\'25\' x2=\'0\' y2=\'50\' style=\'stroke:rgb(0,0,0); stroke-width:1\' />';
            }
            if (item.hasClass('join-or')) {
              svgBackground += '<line x1=\'0\' y1=\'25\' x2=\'10\' y2=\'0\' style=\'stroke:rgb(0,0,0); stroke-width:1\' /><line x1=\'10\' y1=\'0\' x2=\'20\' y2=\'25\' style=\'stroke:rgb(0,0,0); stroke-width:1\' /><line x1=\'20\' y1=\'0\' x2=\'20\' y2=\'50\' style=\'stroke:rgb(0,0,0); stroke-width:1\' /><line x1=\'0\' y1=\'25\' x2=\'10\' y2=\'50\' style=\'stroke:rgb(0,0,0); stroke-width:1\' /><line x1=\'10\' y1=\'50\' x2=\'20\' y2=\'25\' style=\'stroke:rgb(0,0,0); stroke-width:1\' />';
            }
            if (item.hasClass('join-xor')) {
              svgBackground += '<line x1=\'0\' y1=\'25\' x2=\'20\' y2=\'0\' style=\'stroke:rgb(0,0,0); stroke-width:1\' /><line x1=\'20\' y1=\'0\' x2=\'20\' y2=\'50\' style=\'stroke:rgb(0,0,0); stroke-width:1\' /><line x1=\'0\' y1=\'25\' x2=\'20\' y2=\'50\' style=\'stroke:rgb(0,0,0); stroke-width:1\' />';
            }
            svgBackground = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' version=\'1.1\' preserveAspectRatio=\'none\' viewBox=\'0 0 100 50\'>' + svgBackground + '</svg>")';
            item.css('background', svgBackground);
          };
          instance.showProcessRunPath = function (workItem, depth) {
            if (workItem.hasValue('v-wf:previousWorkItem')) {
              workItem['v-wf:previousWorkItem'].forEach(function (previousWorkItem) {
                if (workItem.hasValue('v-wf:forNetElement') && previousWorkItem.hasValue('v-wf:forNetElement')) {
                  instance.showProcessRunPath(previousWorkItem, depth + 1);
                  instance.select({
                    target: workItem['v-wf:forNetElement'][0].id,
                    source: previousWorkItem['v-wf:forNetElement'][0].id
                  }).each(function (e) {
                    e.addClass('process-path-highlight');
                    var pathCounterLabel = e.getOverlay('pathCounter') != undefined ? e.getOverlay('pathCounter').getLabel() : '';
                    e.removeOverlay('pathCounter');
                    e.addOverlay(['Label', {
                      label: (pathCounterLabel != '' ? pathCounterLabel + ',' : '') + (max_process_depth - depth),
                      location: 0.5,
                      id: 'pathCounter',
                      cssClass: 'pathCounterLabel'
                    }]);
                  });
                }
              });
            } else {
              max_process_depth = depth;
            }
          };
          instance.addVarProperty = function (stateId, mapping, varId) {
            var variable = new IndividualModel(varId);
            var individualM = new IndividualModel(); // create individual (Mapping)

            individualM['rdf:type'] = [new IndividualModel('v-wf:Mapping')];
            individualM['v-wf:mapToVariable'] = [variable];
            individualM['v-wf:mappingExpression'] = ['process.getInputVariable (\'' + variable['v-wf:varDefineName'][0] + '\')'];
            forSubIndividual(net, 'v-wf:consistsOf', stateId, function (state) {
              state[mapping] = state[mapping].concat(individualM); // <- Add new Mapping to State
              net['v-wf:consistsOf'] = net['v-wf:consistsOf'].concat(individualM);
            });
          };
          instance.addToDragList = function (element) {
            dragList.push(element);
            element.addClass('jsplumb-drag-selected');
            instance.addToDragSelection(element);
          };
          instance.clearDragList = function () {
            dragList = [];
            instance.clearDragSelection();
          };

          /**
           * Bind required functional to State elements
           * @method bindStateEvents
           * @param {Object} windows List of all State elements
           */
          var bindStateEvents = function bindStateEvents(windows) {
            windows.find('.state-name').droppable({
              hoverClass: 'dragHover',
              drop: function drop(event, ui) {
                var varId = ui.draggable.attr('resource');
                var taskId = windows.attr('id');
                var $div = $('<div />');
                $div.appendTo($('#main'));
                $div.dialog({
                  modal: true,
                  resizable: false,
                  buttons: {
                    'v-wf:startingMapping': function vWfStartingMapping() {
                      instance.addVarProperty(taskId, 'v-wf:startingMapping', varId);
                      $(this).dialog('close');
                      $('#' + BrowserUtil.escape4$(taskId), template).trigger('click');
                    },
                    'v-wf:completedMapping': function vWfCompletedMapping() {
                      instance.addVarProperty(taskId, 'v-wf:completedMapping', varId);
                      $(this).dialog('close');
                      $('#' + BrowserUtil.escape4$(taskId), template).trigger('click');
                    },
                    'v-wf:wosResultsMapping': function vWfWosResultsMapping() {
                      instance.addVarProperty(taskId, 'v-wf:wosResultsMapping', varId);
                      $(this).dialog('close');
                      $('#' + BrowserUtil.escape4$(taskId), template).trigger('click');
                    },
                    'v-wf:startingJournalMap': function vWfStartingJournalMap() {
                      instance.addVarProperty(taskId, 'v-wf:startingJournalMap', varId);
                      $(this).dialog('close');
                      $('#' + BrowserUtil.escape4$(taskId), template).trigger('click');
                    },
                    'v-wf:completedJournalMap': function vWfCompletedJournalMap() {
                      instance.addVarProperty(taskId, 'v-wf:completedJournalMap', varId);
                      $(this).dialog('close');
                      $('#' + BrowserUtil.escape4$(taskId), template).trigger('click');
                    },
                    'v-wf:startingExecutorJournalMap': function vWfStartingExecutorJournalMap() {
                      instance.addVarProperty(taskId, 'v-wf:startingExecutorJournalMap', varId);
                      $(this).dialog('close');
                      $('#' + BrowserUtil.escape4$(taskId), template).trigger('click');
                    },
                    'v-wf:completedExecutorJournalMap': function vWfCompletedExecutorJournalMap() {
                      instance.addVarProperty(taskId, 'v-wf:completedExecutorJournalMap', varId);
                      $(this).dialog('close');
                      $('#' + BrowserUtil.escape4$(taskId), template).trigger('click');
                    }
                  }
                });
              }
            });
            windows.on('click', /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
                var _this, currentElement, alreadySelected, about, _holder2, _about, menu;
                return _regeneratorRuntime().wrap(function _callee$(_context2) {
                  while (1) switch (_context2.prev = _context2.next) {
                    case 0:
                      _this = e.delegateTarget;
                      currentElement = $(_this);
                      alreadySelected = currentElement.hasClass('w_active');
                      veda['workflow' + elementId + '-selectedElement'] = _this.id;
                      if (!e.ctrlKey) {
                        _context2.next = 8;
                        break;
                      }
                      instance.addToDragList(currentElement);
                      e.stopPropagation();
                      return _context2.abrupt("return");
                    case 8:
                      if (!alreadySelected) {
                        instance.defocus();
                        selectedElementId = _this.id;
                        selectedElementType = 'state';
                        currentElement.addClass('w_active');
                      }
                      if (!(mode == 'edit')) {
                        _context2.next = 20;
                        break;
                      }
                      e.stopPropagation();
                      if (!alreadySelected) {
                        _context2.next = 13;
                        break;
                      }
                      return _context2.abrupt("return");
                    case 13:
                      _context2.next = 15;
                      return new IndividualModel(_this.id).load();
                    case 15:
                      about = _context2.sent;
                      _holder2 = $('<div>');
                      if (about['rdf:type'][0].id == 'v-wf:Task') {
                        about.present(_holder2, 'v-wf:TaskTemplateAsProperties', 'edit');
                      } else {
                        about.present(_holder2, 'v-wf:ConditionTemplateAsProperties', 'edit');
                      }
                      props.append(_holder2);
                      if (about.hasValue('rdfs:label')) propsHead.text(about['rdfs:label'].join(', '));else propsHead.text(about.id);
                    case 20:
                      if (!(mode == 'view')) {
                        _context2.next = 36;
                        break;
                      }
                      instance.select().removeClass('process-path-highlight').removeOverlay('pathCounter');
                      _about = new IndividualModel(_this.id);
                      if (_about.hasValue('rdfs:label')) {
                        propsHead.text(_about['rdfs:label'].join(', '));
                      } else {
                        propsHead.text(_about.id);
                      }

                      // If we have more then one WorkItem - we must choose among them
                      if (!(currentElement.attr('work-items-count') > 1)) {
                        _context2.next = 32;
                        break;
                      }
                      e.stopPropagation();
                      menu = $('#workflow-context-menu ul', template);
                      menu.html('');
                      $('[type=\'work-item\']', _this).each(function (i, el) {
                        var wi = new IndividualModel($(el).attr('work-item-id'));
                        var $item = $('<li/>').appendTo(menu);
                        $('<a/>', {
                          'text': wi.hasValue('rdfs:label') ? wi['rdfs:label'][0] : wi.id,
                          'href': '#',
                          'click': function (workItem) {
                            return function (event) {
                              event.preventDefault();
                              props.empty();
                              $('#workflow-context-menu', template).hide();
                              $.each(instance.getAllConnections(), function (idx, connection) {
                                var o = connection.getOverlay('flowLabel');
                                if (o != undefined) o.setVisible(false);
                              });
                              instance.showProcessRunPath(workItem, 0);
                              var holder = $('<div>');
                              workItem.present(holder, 'v-wf:WorkItemTemplate');
                              props.append(holder);
                            };
                          }(wi)
                        }).appendTo($item);
                      });
                      $contextMenu.css({
                        display: 'block',
                        left: e.pageX - (e.pageX + $contextMenu.width() > $(document).width() ? $contextMenu.width() : 0),
                        top: e.pageY - (e.pageY + $contextMenu.height() > $(document).height() ? $contextMenu.height() : 0)
                      });
                      _context2.next = 36;
                      break;
                    case 32:
                      e.stopPropagation();
                      if (!alreadySelected) {
                        _context2.next = 35;
                        break;
                      }
                      return _context2.abrupt("return");
                    case 35:
                      $('[type=\'work-item\']', _this).each(function (i, el) {
                        var wi = new IndividualModel($(el).attr('work-item-id'));
                        $.each(instance.getAllConnections(), function (idx, connection) {
                          var o = connection.getOverlay('flowLabel');
                          if (o != undefined) o.setVisible(false);
                        });
                        instance.showProcessRunPath(wi, 0);
                        var holder = $('<div>');
                        wi.present(holder, new IndividualModel('v-wf:WorkItemTemplate'));
                        props.append(holder);
                      });
                    case 36:
                    case "end":
                      return _context2.stop();
                  }
                }, _callee);
              }));
              return function (_x) {
                return _ref.apply(this, arguments);
              };
            }());
            if (mode == 'edit') {
              windows.bind('dblclick', function (e) {
                var _this = e.delegateTarget;
                BrowserUtil.showModal(new IndividualModel($(_this).attr('id')), 'v-wf:TaskTemplateAsModal', 'edit');
              });
              instance.draggable(windows, {
                drag: function drag(event) {
                  // gets called on every drag
                  $('#workflow-context-menu', template).hide();
                  var target = new IndividualModel(event.el.id);
                  target['v-wf:locationX'] = [Math.round(event.pos[0] - canvasSizePx / 2)];
                  target['v-wf:locationY'] = [Math.round(event.pos[1] - canvasSizePx / 2)];
                }
              });
            }

            // Initialize all State elements as Connection sources.
            var possibleInAnchors = [[0, 0.1, -1, 0], [0, 0.3, -1, 0], [0, 0.5, -1, 0], [0, 0.7, -1, 0], [0, 0.9, -1, 0], [1, 0.1, 1, 0], [1, 0.3, 1, 0], [1, 0.5, 1, 0], [1, 0.7, 1, 0], [1, 0.9, 1, 0], [0.1, 0, 0, -1], [0.3, 0, 0, -1], [0.5, 0, 0, -1], [0.7, 0, 0, -1], [0.9, 0, 0, -1]];
            var possibleOutAnchors = [[0, 0.2, -1, 0], [0, 0.4, -1, 0], [0, 0.6, -1, 0], [0, 0.8, -1, 0], [1, 0.2, 1, 0], [1, 0.4, 1, 0], [1, 0.6, 1, 0], [1, 0.8, 1, 0], [0.2, 0, 0, -1], [0.4, 0, 0, -1], [0.6, 0, 0, -1], [0.8, 0, 0, -1]];
            instance.makeSource(windows, {
              filter: '.ep',
              anchor: possibleOutAnchors,
              dragOptions: {
                isSource: false,
                isTarget: true
              },
              connector: ['Straight', {
                stub: 30,
                gap: 0
              }],
              paintStyle: {
                strokeStyle: '#225588',
                fillStyle: 'transparent',
                radius: mode == 'edit' ? 4 : 1,
                lineWidth: 1
              },
              connectorStyle: {
                strokeStyle: '#666666',
                lineWidth: 1,
                outlineColor: 'transparent',
                outlineWidth: 4
              },
              maxConnections: 20,
              onMaxConnections: function onMaxConnections(info, e) {
                alert('Maximum connections (' + info.maxConnections + ') reached');
              }
            });

            // Initialize all State elements as connection targets.

            instance.makeTarget(windows, {
              dropOptions: {
                isSource: true,
                isTarget: false,
                hoverClass: 'dragHover'
              },
              reattach: true,
              anchor: possibleInAnchors,
              paintStyle: {
                strokeStyle: '#225588',
                fillStyle: 'transparent',
                radius: mode == 'edit' ? 4 : 1,
                lineWidth: 1
              }
            });
          };

          /**
           * Change current scale.
           * @param {number} scale new scale
           */
          instance.changeScale = function (scale) {
            $('#workflow-context-menu', template).hide();
            net['currentScale'] = parseFloat(scale);
            veda['workflow' + elementId + '-zoom'] = net['currentScale'];
            instance.setZoom(net['currentScale']);
            wdata.css({
              '-ms-transform': 'scale(' + net['currentScale'] + ',' + net['currentScale'] + ')',
              /* IE 9 */
              '-webkit-transform': 'scale(' + net['currentScale'] + ',' + net['currentScale'] + ')',
              /* Chrome, Safari, Opera */
              'transform': 'scale(' + net['currentScale'] + ',' + net['currentScale'] + ')'
            });
          };

          /**
           * Generate css class for state (split-[xor-or-and-none] or join-[xor-or-and-none])
           * @param {String} sj `split` or `join`
           * @param {IndividualModel} state state
           * @return {string} css class name for this type of split/join
           */
          instance.getSplitJoinType = function (sj, state) {
            if (!state.hasValue('v-wf:' + sj)) {
              return ' ' + sj + '-no';
            }
            var type = state['v-wf:' + sj][0].id;
            if (type === null || type === undefined || type === '') {
              return ' ' + sj + '-no';
            }
            if (type == 'v-wf:XOR') return ' ' + sj + '-xor';
            if (type == 'v-wf:OR') return ' ' + sj + '-or';
            if (type == 'v-wf:AND') return ' ' + sj + '-and';
            if (type == 'v-wf:NONE') return ' ' + sj + '-none';
            return ' ' + sj + '-no';
          };

          /**
           * Apply state to canvas
           * @param {IndividualModel} state
           */
          instance.createState = function (state) {
            if (!state.hasValue('rdf:type')) return;
            var type = state['rdf:type'][0].id;
            var stateElement = '';
            switch (type) {
              case 'v-wf:InputCondition':
                stateElement = '<div class="w state-io-condition state-io-condition-input" ' + 'id="' + state.id + '" ' + 'style="font-size:20px;padding-top:10px;' + 'left:' + (canvasSizePx / 2 + state['v-wf:locationX'][0]) + 'px;' + 'top:' + (canvasSizePx / 2 + state['v-wf:locationY'][0]) + 'px;">' + '<div><span class="glyphicon glyphicon-play" aria-hidden="true"></div>' + (mode == 'edit' ? '<div class="ep">' : '') + '</div></div>';
                break;
              case 'v-wf:OutputCondition':
                stateElement = '<div class="w state-io-condition state-io-condition-output" ' + 'id="' + state.id + '" ' + 'style="font-size:20px;padding-top:10px;' + 'left:' + (canvasSizePx / 2 + state['v-wf:locationX'][0]) + 'px;' + 'top: ' + (canvasSizePx / 2 + state['v-wf:locationY'][0]) + 'px;">' + '<div><span class="glyphicon glyphicon-stop" aria-hidden="true"></div></div>';
                break;
              case 'v-wf:Condition':
                stateElement = '<div class="w state-condition" ' + 'id="' + state.id + '" ' + 'style="left:' + (canvasSizePx / 2 + state['v-wf:locationX'][0]) + 'px;' + 'top:' + (canvasSizePx / 2 + state['v-wf:locationY'][0]) + 'px;">' + '<div class="state-name condition-name">' + state['rdfs:label'][0] + '</div>' + (mode == 'edit' ? '<div class="ep">' : '') + '</div></div>';
                break;
              case 'v-wf:Task':
                stateElement = '<div class="w state-task split-join ' + instance.getSplitJoinType('split', state) + instance.getSplitJoinType('join', state) + '" ' + 'id="' + state.id + '" ' + 'style="left:' + (canvasSizePx / 2 + state['v-wf:locationX'][0]) + 'px; ' + 'top: ' + (canvasSizePx / 2 + state['v-wf:locationY'][0]) + 'px;">' + '<div class="state-name">' + state['rdfs:label'][0] + '</div>' + (mode == 'edit' ? '<div class="ep">' : '') + '</div></div>';
                break;
            }
            if (stateElement !== '') {
              wdata.append(stateElement);
              var $state = $('#' + BrowserUtil.escape4$(state.id), template);
              bindStateEvents($state);
              if (mode == 'edit') subNetViewButton(state, $state);
              executorMark(state, $state);
              instance.updateSVGBackground($state);
            }
          };
          instance.deleteState = function (element) {
            instance.detachAllConnections(element);
            instance.remove(element);
            net['v-wf:consistsOf'] = removeSubIndividual(net, 'v-wf:consistsOf', element.id);
            net['v-wf:consistsOf'].forEach(function (state) {
              if (state.hasValue('v-wf:hasFlow')) {
                state['v-wf:hasFlow'].forEach(function (flow) {
                  if (flow.hasValue('v-wf:flowsInto') && flow['v-wf:flowsInto'][0].id == element.id) {
                    instance.deleteFlow(flow, state);
                  }
                });
              }
            });
          };
          instance.createFlow = function (state, flow) {
            flow.load().then(function () {
              var connector = instance.connect({
                source: state.id,
                target: flow['v-wf:flowsInto'][0].id,
                detachable: mode == 'edit'
              });
              if (flow.hasValue('rdfs:label')) {
                connector.addOverlay(['Label', {
                  label: flow['rdfs:label'][0],
                  location: 0.5,
                  id: 'flowLabel'
                }]);
              }
              connector.setData(flow.id);
            });
          };
          instance.deleteFlow = function (flow, source) {
            instance.detach(flow, {
              fireEvent: false,
              forceDetach: true
            });
            net['v-wf:consistsOf'] = removeSubIndividual(net, 'v-wf:consistsOf', flow.id);
            var sourceIndividual = new IndividualModel(source.id);
            sourceIndividual['v-wf:hasFlow'] = removeSubIndividual(sourceIndividual, 'v-wf:hasFlow', flow.id);
          };
          instance.createEmptyNetElement = function (type) {
            var individual = new IndividualModel();
            individual['rdfs:label'] = ['', ''];
            individual['v-wf:locationX'] = [(-canvasSizePx / 2 - net['offsetX']) / net['currentScale']];
            individual['v-wf:locationY'] = [(-canvasSizePx / 2 - net['offsetY']) / net['currentScale']];
            if (type == 'condition') {
              individual['rdf:type'] = [new IndividualModel('v-wf:Condition')];
              instance.createState(individual);
            } else if (type == 'task') {
              individual['rdf:type'] = [new IndividualModel('v-wf:Task')];
              instance.createState(individual);
            } else if (type == 'input') {
              individual['rdf:type'] = [new IndividualModel('v-wf:InputCondition')];
              instance.createState(individual);
            } else if (type == 'output') {
              individual['v-wf:locationX'] = [individual['v-wf:locationX'][0] + 200];
              individual['rdf:type'] = [new IndividualModel('v-wf:OutputCondition')];
              instance.createState(individual);
            }
            net['v-wf:consistsOf'] = net['v-wf:consistsOf'] === undefined ? [individual] : net['v-wf:consistsOf'].concat(individual);
            return individual;
          };

          /**
           * Create workflow Net by given Object (v-wf:Net individual).
           * @param {IndividualModel} net
           * @return {Promise}
           */
          instance.createNetView = function (net) {
            return net.prefetch(Infinity, 'v-wf:consistsOf', 'v-wf:hasFlow').then(function (netElements) {
              $('#workflow-net-name', template).text(net['rdfs:label'][0]);
              netElements.shift();
              // Create states
              var hasInput = false;
              var hasOutput = false;
              netElements.forEach(function (element) {
                if (element.hasValue('rdf:type', 'v-wf:Task') || element.hasValue('rdf:type', 'v-wf:Condition') || element.hasValue('rdf:type', 'v-wf:InputCondition') || element.hasValue('rdf:type', 'v-wf:OutputCondition')) {
                  instance.createState(element);
                }
                hasInput = hasInput || element.hasValue('rdf:type', 'v-wf:InputCondition');
                hasOutput = hasOutput || element.hasValue('rdf:type', 'v-wf:OutputCondition');
              });
              // For empty net
              if (!hasInput) {
                instance.createEmptyNetElement('input');
              }
              if (!hasOutput) {
                instance.createEmptyNetElement('output');
              }
              netElements.forEach(function (element) {
                if (element.hasValue('v-wf:hasFlow')) {
                  element['v-wf:hasFlow'].forEach(function (flow) {
                    instance.createFlow(element, flow);
                  });
                }
              });
            });
          };

          /*
           * Optimize view of net: all elements must be visible and fit screen (through change scale and position of canvas)
           * @returns
           */
          instance.optimizeView = function () {
            if (!net.hasValue('v-wf:consistsOf')) return;
            var minx;
            var maxx;
            var miny;
            var maxy;
            var scale;
            var offsetX = 0;
            var offsetY = 0;
            // read ranges
            net['v-wf:consistsOf'].forEach(function (state) {
              if (state.hasValue('v-wf:locationX')) {
                if (maxx === undefined || state['v-wf:locationX'][0] > maxx) maxx = state['v-wf:locationX'][0];
                if (minx === undefined || state['v-wf:locationX'][0] < minx) minx = state['v-wf:locationX'][0];
              }
              if (state.hasValue('v-wf:locationY')) {
                if (maxy === undefined || state['v-wf:locationY'][0] > maxy) maxy = state['v-wf:locationY'][0];
                if (miny === undefined || state['v-wf:locationY'][0] < miny) miny = state['v-wf:locationY'][0];
              }
            });
            miny -= 25;
            minx -= 25;
            maxx += 100;
            maxy += 100;

            // read viewport div
            $('.workflow-canvas-wrapper', template).each(function (i, el) {
              var scaleX = el.clientWidth / (maxx - minx);
              var scaleY = el.clientHeight / (maxy - miny);
              scale = Math.min(scaleX, scaleY);
              if (scaleX > scaleY) {
                offsetX = (el.clientWidth - (maxx - minx) * scale) / 2;
              } else {
                offsetY = (el.clientHeight - (maxy - miny) * scale) / 2;
              }
            });
            instance.changeScale(scale);
            instance.moveCanvas(-minx * scale + offsetX - canvasSizePx / 2, -miny * scale + offsetY - canvasSizePx / 2);
          };
          instance.defocus = function () {
            props.empty();
            instance.clearDragList();
            $('.jsplumb-drag-selected', template).removeClass('jsplumb-drag-selected');
            $('#workflow-context-menu', template).hide();
            $.each(instance.getAllConnections(), function (idx, connection) {
              connection.removeClass('process-path-highlight');
              connection.removeOverlay('pathCounter');
              var o = connection.getOverlay('flowLabel');
              if (o != undefined) o.setVisible(true);
            });
            $('#' + BrowserUtil.escape4$(selectedElementId), template).removeClass('w_active');
            if (selectedElementSourceId != null) {
              instance.select({
                source: selectedElementSourceId
              }).each(function (e) {
                e.setPaintStyle({
                  strokeStyle: '#666666'
                });
                e.removeOverlay('connLabel');
              });
            }
            selectedElementId = null;
            selectedElementType = null;
            selectedElementSourceId = null;
          };
          instance.loadProcessWorkItems = function (process1) {
            return process1.prefetch(Infinity, 'v-wf:workItemList');
          };
          instance.createProcessView = function (process1) {
            // Apply WorkItems to Net
            instance.loadProcessWorkItems(process1).then(function (wis) {
              wis = wis.slice(1);
              $('.w', template).each(function (index, el) {
                $('span', el).text('');
                $(el).css('background-color', 'white').attr('work-items-count', 0).attr('colored-to', '');
              });
              wis.forEach(function (wi) {
                if (wi.hasValue('v-wf:forNetElement')) {
                  var state = $('#' + BrowserUtil.escape4$(wi['v-wf:forNetElement'][0].id), template);
                  if ($(state).find('[work-item-id="' + BrowserUtil.escape4$(wi.id) + '"]').length == 0) {
                    $('<span/>', {
                      'type': 'work-item',
                      'work-item-id': wi.id
                    }).appendTo(state);
                  }
                  var wic = parseInt(state.attr('work-items-count'));
                  var red = state.attr('colored-to') == 'red';
                  if (wic > 0) {
                    state.attr('work-items-count', wic + 1);
                    $('.counter', state).remove();
                    $('<span/>', {
                      'class': 'counter',
                      'text': 'x' + (wic + 1)
                    }).appendTo(state);
                  } else {
                    state.attr('work-items-count', 1);
                  }
                  if (!wi.hasValue('v-wf:workOrderList')) {
                    state.css('background-color', '#FF3333');
                    state.attr('colored-to', 'red');
                  } else if (wi.hasValue('v-wf:isCompleted') && wi['v-wf:isCompleted'][0] && !red) {
                    state.css('background-color', '#88B288');
                    state.attr('colored-to', 'green');
                  } else if (!red) {
                    state.css('background-color', '#FFB266');
                    state.attr('colored-to', 'red');
                  }
                }
              });
            });
          };
          var $contextMenu;
          instance.createNetView(net).then(function () {
            if (net['currentScale'] == 1.0) {
              instance.optimizeView();
            } else {
              instance.changeScale(net['currentScale']);
            }
            if (mode == 'view') {
              instance.createProcessView(process);
            }
            $('#' + BrowserUtil.escape4$(veda['workflow' + elementId + '-selectedElement']), template).trigger('click');

            /* CONTEXT MENU [BEGIN] */
            $contextMenu = $('#workflow-context-menu', template);
            /* CONTEXT MENU [END]*/

            /* NET MENU [BEGIN] */
            $('#workflow-save-button', template).on('click', function () {
              net.saveAll();
            });
            $('#workflow-export-ttl', template).on('click', function () {
              var list = [net].concat(net['v-wf:consistsOf']);
              collectEntities(net, list);
              BrowserUtil.exportTTL(list);
            });

            // Add new State event.
            $('.create-state', template).bind('click', function (e) {
              var _this = e.delegateTarget;
              var individual = instance.createEmptyNetElement($(_this).hasClass('create-condition') ? 'condition' : 'task');
              $('#' + BrowserUtil.escape4$(individual.id), template).click();
              $(_this).blur();
            });
            $('.delete-state', template).on('click', function () {
              if (dragList.length > 0) {
                dragList.forEach(function (item) {
                  instance.deleteState(instance.getSelector('#' + BrowserUtil.escape4$(item.attr('id')))[0]);
                });
              } else if (selectedElementType == 'state') {
                if (confirm('Delete state ' + selectedElementId + ' ?')) {
                  instance.deleteState(instance.getSelector('#' + BrowserUtil.escape4$(selectedElementId))[0]);
                }
              } else if (selectedElementType == 'flow') {
                if (confirm('Delete flow ' + selectedElementId + ' ?')) {
                  instance.getConnections({
                    source: selectedElementSourceId
                  }).forEach(function (connection) {
                    if (connection.id == selectedElementId) {
                      instance.deleteFlow(connection, new IndividualModel(selectedElementSourceId));
                    }
                  });
                }
              }
            });
            $('.process-refresh', template).on('click', function () {
              instance.createProcessView(process);
            });
            $('.to-net-editor', template).on('click', function () {
              riot.route('#/' + net.id + '///edit');
            });
            $('.copy-net-element', template).on('click', function () {
              if (typeof selectedElementId !== 'undefined') {
                var individual = new IndividualModel(selectedElementId);
                if (individual.hasValue('rdf:type')) {
                  if (individual['rdf:type'][0].id === 'v-wf:Task' || individual['rdf:type'][0].id === 'v-wf:Condition') {
                    individual.clone().then(function (clone) {
                      clone['v-wf:locationX'] = [individual['v-wf:locationX'][0] + 50];
                      clone['v-wf:locationY'] = [individual['v-wf:locationY'][0] + 50];
                      clone['v-wf:hasFlow'] = [];
                      instance.createState(clone);
                      net['v-wf:consistsOf'] = net['v-wf:consistsOf'].concat(clone);
                    });
                  }
                }
              }
            });

            /* ZOOM [BEGIN] */
            var zoomIn = function zoomIn() {
              if (net['currentScale'] < 1) {
                return instance.changeScale(net['currentScale'] + 0.1);
              }
              if (net['currentScale'] < 2) {
                return instance.changeScale(net['currentScale'] + 0.25);
              }
            };
            var zoomOut = function zoomOut() {
              if (net['currentScale'] > 1) {
                return instance.changeScale(net['currentScale'] - 0.25);
              }
              if (net['currentScale'] > 0.2) {
                return instance.changeScale(net['currentScale'] - 0.1);
              }
            };
            $('.zoom-in', template).on('click', zoomIn);
            $('.zoom-out', template).on('click', zoomOut);
            wdata.bind('mousewheel', function (e) {
              if (e.originalEvent.wheelDelta > 0) {
                zoomIn();
              } else {
                zoomOut();
              }
            });
            $('.zoom-default', template).on('click', function () {
              instance.optimizeView();
            });
            $('#full-width', template).on('click', function () {
              instance.optimizeView();
            });
            /* ZOOM [END] */

            /* NET MENU [END] */

            return instance;
          });
          return instance;
        };
      });
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfcmVnZW5lcmF0b3JSdW50aW1lIiwiZXhwb3J0cyIsIk9wIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duIiwiaGFzT3duUHJvcGVydHkiLCJkZWZpbmVQcm9wZXJ0eSIsIm9iaiIsImtleSIsImRlc2MiLCJ2YWx1ZSIsIiRTeW1ib2wiLCJTeW1ib2wiLCJpdGVyYXRvclN5bWJvbCIsIml0ZXJhdG9yIiwiYXN5bmNJdGVyYXRvclN5bWJvbCIsImFzeW5jSXRlcmF0b3IiLCJ0b1N0cmluZ1RhZ1N5bWJvbCIsInRvU3RyaW5nVGFnIiwiZGVmaW5lIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiZXJyIiwid3JhcCIsImlubmVyRm4iLCJvdXRlckZuIiwic2VsZiIsInRyeUxvY3NMaXN0IiwicHJvdG9HZW5lcmF0b3IiLCJHZW5lcmF0b3IiLCJnZW5lcmF0b3IiLCJjcmVhdGUiLCJjb250ZXh0IiwiQ29udGV4dCIsIm1ha2VJbnZva2VNZXRob2QiLCJ0cnlDYXRjaCIsImZuIiwiYXJnIiwidHlwZSIsImNhbGwiLCJDb250aW51ZVNlbnRpbmVsIiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsIkl0ZXJhdG9yUHJvdG90eXBlIiwiZ2V0UHJvdG8iLCJnZXRQcm90b3R5cGVPZiIsIk5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlIiwidmFsdWVzIiwiR3AiLCJkZWZpbmVJdGVyYXRvck1ldGhvZHMiLCJmb3JFYWNoIiwibWV0aG9kIiwiX2ludm9rZSIsIkFzeW5jSXRlcmF0b3IiLCJQcm9taXNlSW1wbCIsImludm9rZSIsInJlc29sdmUiLCJyZWplY3QiLCJyZWNvcmQiLCJyZXN1bHQiLCJfX2F3YWl0IiwidGhlbiIsInVud3JhcHBlZCIsImVycm9yIiwicHJldmlvdXNQcm9taXNlIiwiY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmciLCJzdGF0ZSIsIkVycm9yIiwiZG9uZVJlc3VsdCIsImRlbGVnYXRlIiwiZGVsZWdhdGVSZXN1bHQiLCJtYXliZUludm9rZURlbGVnYXRlIiwic2VudCIsIl9zZW50IiwiZGlzcGF0Y2hFeGNlcHRpb24iLCJhYnJ1cHQiLCJkb25lIiwibWV0aG9kTmFtZSIsInVuZGVmaW5lZCIsInJldHVybiIsIlR5cGVFcnJvciIsImluZm8iLCJyZXN1bHROYW1lIiwibmV4dCIsIm5leHRMb2MiLCJwdXNoVHJ5RW50cnkiLCJsb2NzIiwiZW50cnkiLCJ0cnlMb2MiLCJjYXRjaExvYyIsImZpbmFsbHlMb2MiLCJhZnRlckxvYyIsInRyeUVudHJpZXMiLCJwdXNoIiwicmVzZXRUcnlFbnRyeSIsImNvbXBsZXRpb24iLCJyZXNldCIsIml0ZXJhYmxlIiwiaXRlcmF0b3JNZXRob2QiLCJpc05hTiIsImxlbmd0aCIsImkiLCJkaXNwbGF5TmFtZSIsImlzR2VuZXJhdG9yRnVuY3Rpb24iLCJnZW5GdW4iLCJjdG9yIiwiY29uc3RydWN0b3IiLCJuYW1lIiwibWFyayIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiYXdyYXAiLCJhc3luYyIsIlByb21pc2UiLCJpdGVyIiwia2V5cyIsInZhbCIsIm9iamVjdCIsInJldmVyc2UiLCJwb3AiLCJza2lwVGVtcFJlc2V0IiwicHJldiIsImNoYXJBdCIsInNsaWNlIiwic3RvcCIsInJvb3RSZWNvcmQiLCJydmFsIiwiZXhjZXB0aW9uIiwiaGFuZGxlIiwibG9jIiwiY2F1Z2h0IiwiaGFzQ2F0Y2giLCJoYXNGaW5hbGx5IiwiZmluYWxseUVudHJ5IiwiY29tcGxldGUiLCJmaW5pc2giLCJjYXRjaCIsInRocm93biIsImRlbGVnYXRlWWllbGQiLCJhc3luY0dlbmVyYXRvclN0ZXAiLCJnZW4iLCJfbmV4dCIsIl90aHJvdyIsIl9hc3luY1RvR2VuZXJhdG9yIiwiYXJncyIsImFyZ3VtZW50cyIsImFwcGx5IiwiX3R5cGVvZiIsImNvbGxlY3RFbnRpdGllcyIsImVsZW1lbnQiLCJsaXN0IiwicHJvcHMiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwiX2l0ZXJhdG9yIiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIiLCJfc3RlcCIsInMiLCJuIiwicHJvcCIsIkFycmF5IiwiaXNBcnJheSIsInN1YkVsZW1lbnQiLCJoYXNWYWx1ZSIsInN1YlJkZlR5cGUiLCJpZCIsImFkZCIsImUiLCJmIiwiZm9yU3ViSW5kaXZpZHVhbCIsIm5ldCIsInByb3BlcnR5IiwiZnVuYyIsImVsIiwicmVtb3ZlU3ViSW5kaXZpZHVhbCIsImZpbHRlciIsIml0ZW0iLCJzZXR0ZXJzIiwiX2pzcGx1bWIiLCJfanF1ZXJ5IiwiJCIsImRlZmF1bHQiLCJfY29tbW9uTGliUmlvdEpzIiwicmlvdCIsIl9jb21tb25JbmRpdmlkdWFsX21vZGVsSnMiLCJJbmRpdmlkdWFsTW9kZWwiLCJfYnJvd3NlclV0aWxKcyIsIkJyb3dzZXJVdGlsIiwiZXhlY3V0ZSIsImpzV29ya2Zsb3ciLCJfZXhwb3J0IiwicmVhZHkiLCJqc1BsdW1iIiwiSW5zdGFuY2UiLCJpbnN0YW5jZSIsImdldEluc3RhbmNlIiwiaW5pdCIsIndvcmtmbG93RGF0YSIsInZlZGEiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIndvcmtmbG93IiwiY2FudmFzU2l6ZVB4IiwiZWxlbWVudElkIiwic2VsZWN0ZWRFbGVtZW50SWQiLCJzZWxlY3RlZEVsZW1lbnRUeXBlIiwic2VsZWN0ZWRFbGVtZW50U291cmNlSWQiLCJwcm9jZXNzIiwibW9kZSIsIm1heF9wcm9jZXNzX2RlcHRoIiwiZHJhZ0xpc3QiLCJwcm9wc0hlYWQiLCJjcmVhdGVXb3JrZmxvd0RPTSIsImhvbGRlciIsInRleHQiLCJqb2luIiwicHJlc2VudCIsImVtcHR5IiwiYXBwZW5kIiwid2RhdGEiLCJjc3MiLCJhZGRDbGFzcyIsImF0dHIiLCJhcHBlbmRUbyIsImFzX3N0YXJ0IiwiY3R4IiwiZ2V0IiwiZ2V0Q29udGV4dCIsImdsb2JhbEFscGhhIiwib24iLCJzaGlmdEtleSIsIm9mZnNldFgiLCJvZmZzZXRZIiwic2hvdyIsImVuZCIsIngxIiwiTWF0aCIsIm1pbiIsIngyIiwibWF4IiwieTEiLCJ5MiIsImhpZGUiLCIkc3RhdGUiLCJlc2NhcGU0JCIsImFkZFRvRHJhZ0xpc3QiLCJzdG9wUHJvcGFnYXRpb24iLCJidXR0b25zIiwiY2xlYXJSZWN0IiwiZGVsZWdhdGVUYXJnZXQiLCJvZmZzZXRXaWR0aCIsIm9mZnNldEhlaWdodCIsImJlZ2luUGF0aCIsIngiLCJ5IiwicmVjdCIsImZpbGwiLCJkcmFnZ2FibGUiLCJkcmFnIiwiZXZlbnQiLCJ1aSIsIm1vdmVDYW52YXMiLCJwb3NpdGlvbiIsImxlZnQiLCJ0b3AiLCJkZWZvY3VzIiwiaW1wb3J0RGVmYXVsdHMiLCJFbmRwb2ludCIsIkhvdmVyUGFpbnRTdHlsZSIsInN0cm9rZVN0eWxlIiwibGluZVdpZHRoIiwiQ29ubmVjdGlvbk92ZXJsYXlzIiwibG9jYXRpb24iLCJ3aWR0aCIsImZvbGRiYWNrIiwibGFiZWwiLCJjc3NDbGFzcyIsIkNvbnRhaW5lciIsIm5ld0xlZnQiLCJuZXdUb3AiLCJiaW5kIiwidHJhbnNpdGlvbiIsInJvdXRlIiwiZmxvd0lkIiwiZ2V0RGF0YSIsInNldFBhaW50U3R5bGUiLCJjb21wb25lbnQiLCJzb3VyY2VJZCIsImFib3V0Iiwib3JpZ2luYWxFdmVudCIsIm9yaWdpbmFsU291cmNlSWQiLCJuZXdTb3VyY2VJZCIsImNvbm5lY3Rpb24iLCJjb25jYXQiLCJzb3VyY2UiLCJmbG93RXhpc3RzIiwiZmxvdzEiLCJ0YXJnZXRJZCIsImZsb3ciLCJhZGRWYWx1ZSIsInNldERhdGEiLCJzdWJOZXRWaWV3QnV0dG9uIiwiY2xpY2siLCJleGVjdXRvck1hcmsiLCJsb2FkIiwiZXhlY3V0b3IiLCJ1cGRhdGVTVkdCYWNrZ3JvdW5kIiwic3ZnQmFja2dyb3VuZCIsImhhc0NsYXNzIiwic2hvd1Byb2Nlc3NSdW5QYXRoIiwid29ya0l0ZW0iLCJkZXB0aCIsInByZXZpb3VzV29ya0l0ZW0iLCJzZWxlY3QiLCJ0YXJnZXQiLCJlYWNoIiwicGF0aENvdW50ZXJMYWJlbCIsImdldE92ZXJsYXkiLCJnZXRMYWJlbCIsInJlbW92ZU92ZXJsYXkiLCJhZGRPdmVybGF5IiwiYWRkVmFyUHJvcGVydHkiLCJzdGF0ZUlkIiwibWFwcGluZyIsInZhcklkIiwidmFyaWFibGUiLCJpbmRpdmlkdWFsTSIsImFkZFRvRHJhZ1NlbGVjdGlvbiIsImNsZWFyRHJhZ0xpc3QiLCJjbGVhckRyYWdTZWxlY3Rpb24iLCJiaW5kU3RhdGVFdmVudHMiLCJ3aW5kb3dzIiwiZmluZCIsImRyb3BwYWJsZSIsImhvdmVyQ2xhc3MiLCJkcm9wIiwidGFza0lkIiwiJGRpdiIsImRpYWxvZyIsIm1vZGFsIiwicmVzaXphYmxlIiwidldmU3RhcnRpbmdNYXBwaW5nIiwidHJpZ2dlciIsInZXZkNvbXBsZXRlZE1hcHBpbmciLCJ2V2ZXb3NSZXN1bHRzTWFwcGluZyIsInZXZlN0YXJ0aW5nSm91cm5hbE1hcCIsInZXZkNvbXBsZXRlZEpvdXJuYWxNYXAiLCJ2V2ZTdGFydGluZ0V4ZWN1dG9ySm91cm5hbE1hcCIsInZXZkNvbXBsZXRlZEV4ZWN1dG9ySm91cm5hbE1hcCIsIl9yZWYiLCJfY2FsbGVlIiwiX3RoaXMiLCJjdXJyZW50RWxlbWVudCIsImFscmVhZHlTZWxlY3RlZCIsIl9ob2xkZXIyIiwiX2Fib3V0IiwibWVudSIsIl9jYWxsZWUkIiwiX2NvbnRleHQyIiwiY3RybEtleSIsInJlbW92ZUNsYXNzIiwiaHRtbCIsIndpIiwiJGl0ZW0iLCJwcmV2ZW50RGVmYXVsdCIsImdldEFsbENvbm5lY3Rpb25zIiwiaWR4IiwibyIsInNldFZpc2libGUiLCIkY29udGV4dE1lbnUiLCJkaXNwbGF5IiwicGFnZVgiLCJkb2N1bWVudCIsInBhZ2VZIiwiaGVpZ2h0IiwiX3giLCJzaG93TW9kYWwiLCJyb3VuZCIsInBvcyIsInBvc3NpYmxlSW5BbmNob3JzIiwicG9zc2libGVPdXRBbmNob3JzIiwibWFrZVNvdXJjZSIsImFuY2hvciIsImRyYWdPcHRpb25zIiwiaXNTb3VyY2UiLCJpc1RhcmdldCIsImNvbm5lY3RvciIsInN0dWIiLCJnYXAiLCJwYWludFN0eWxlIiwiZmlsbFN0eWxlIiwicmFkaXVzIiwiY29ubmVjdG9yU3R5bGUiLCJvdXRsaW5lQ29sb3IiLCJvdXRsaW5lV2lkdGgiLCJtYXhDb25uZWN0aW9ucyIsIm9uTWF4Q29ubmVjdGlvbnMiLCJhbGVydCIsIm1ha2VUYXJnZXQiLCJkcm9wT3B0aW9ucyIsInJlYXR0YWNoIiwiY2hhbmdlU2NhbGUiLCJzY2FsZSIsInBhcnNlRmxvYXQiLCJzZXRab29tIiwiZ2V0U3BsaXRKb2luVHlwZSIsInNqIiwiY3JlYXRlU3RhdGUiLCJzdGF0ZUVsZW1lbnQiLCJkZWxldGVTdGF0ZSIsImRldGFjaEFsbENvbm5lY3Rpb25zIiwicmVtb3ZlIiwiZGVsZXRlRmxvdyIsImNyZWF0ZUZsb3ciLCJjb25uZWN0IiwiZGV0YWNoYWJsZSIsImRldGFjaCIsImZpcmVFdmVudCIsImZvcmNlRGV0YWNoIiwic291cmNlSW5kaXZpZHVhbCIsImNyZWF0ZUVtcHR5TmV0RWxlbWVudCIsImluZGl2aWR1YWwiLCJjcmVhdGVOZXRWaWV3IiwicHJlZmV0Y2giLCJJbmZpbml0eSIsIm5ldEVsZW1lbnRzIiwic2hpZnQiLCJoYXNJbnB1dCIsImhhc091dHB1dCIsIm9wdGltaXplVmlldyIsIm1pbngiLCJtYXh4IiwibWlueSIsIm1heHkiLCJzY2FsZVgiLCJjbGllbnRXaWR0aCIsInNjYWxlWSIsImNsaWVudEhlaWdodCIsImxvYWRQcm9jZXNzV29ya0l0ZW1zIiwicHJvY2VzczEiLCJjcmVhdGVQcm9jZXNzVmlldyIsIndpcyIsImluZGV4Iiwid2ljIiwicGFyc2VJbnQiLCJyZWQiLCJzYXZlQWxsIiwiZXhwb3J0VFRMIiwiYmx1ciIsImdldFNlbGVjdG9yIiwiY29uZmlybSIsImdldENvbm5lY3Rpb25zIiwiY2xvbmUiLCJ6b29tSW4iLCJ6b29tT3V0Iiwid2hlZWxEZWx0YSJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS13ZWIvanMvYnJvd3Nlci92ZWRhX3dvcmtmbG93X2VkaXRvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIE5ldCBlZGl0b3IuIFVzZWQgdG8gY3JlYXRlIC8gbW9kaWZ5IC8gdmlldyB3b3JrZmxvdyBuZXRzLlxuICpcbiAqIEluc3BpcmVkIGJ5IFtodHRwOi8vZ2l0aHViLmNvbS9oZW1hbnRzc2hldHR5L2pzV29ya2Zsb3ddWzFdXG4gKlxuICogWzFdOiBodHRwOi8vZ2l0aHViLmNvbS9oZW1hbnRzc2hldHR5L2pzV29ya2Zsb3dcbiAqL1xuXG5pbXBvcnQgJ2pzcGx1bWInO1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCByaW90IGZyb20gJy4uL2NvbW1vbi9saWIvcmlvdC5qcyc7XG5pbXBvcnQgSW5kaXZpZHVhbE1vZGVsIGZyb20gJy4uL2NvbW1vbi9pbmRpdmlkdWFsX21vZGVsLmpzJztcbmltcG9ydCBCcm93c2VyVXRpbCBmcm9tICcuLi9icm93c2VyL3V0aWwuanMnO1xuXG5jb25zdCBqc1dvcmtmbG93ID0ge307XG5cbmV4cG9ydCBkZWZhdWx0IGpzV29ya2Zsb3c7XG5cbi8vIExldmVyYWdpbmcgdGhlIHJlYWR5IGZ1bmN0aW9uIG9mIGpzUGx1bWIuXG5qc1dvcmtmbG93LnJlYWR5ID0ganNQbHVtYi5yZWFkeTtcblxuLy8gTm8gQVBJIGNhbGwgc2hvdWxkIGJlIG1hZGUgdW50aWwgdGhlIERPTSBoYXMgYmVlbiBpbml0aWFsaXplZC5cbmpzV29ya2Zsb3cucmVhZHkoKCkgPT4ge1xuICAvKipcbiAgICogQ3JlYXRlIGEgd29ya2Zsb3cgaW5zdGFuY2UuXG4gICAqIEBjb25zdHJ1Y3RvciBJbnN0YW5jZVxuICAgKi9cbiAganNXb3JrZmxvdy5JbnN0YW5jZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBHZXQgYSBuZXcgaW5zdGFuY2Ugb2YganNQbHVtYi5cbiAgICB0aGlzLmluc3RhbmNlID0ganNQbHVtYi5nZXRJbnN0YW5jZSgpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSB3b3JrZmxvdyBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHdvcmtmbG93RGF0YSBJZCBvZiBhbiBIVE1MIGNvbnRhaW5lciB3aXRoaW4gd2hpY2ggdGhlIHdvcmxmbG93IGlzIHRvIGJlIHJlbmRlcmVkXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB2ZWRhIGdsb2JhbCBcInZlZGFcIiBpbnN0YW5jZVxuICAgKiBAcGFyYW0ge0luZGl2aWR1YWxNb2RlbH0gbmV0IGluZGl2aWR1YWwgb2YgcmRmczp0eXBlIFwidi13ZjpOZXRcIlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRlbXBsYXRlXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gY29udGFpbmVyXG4gICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICovXG4gIGpzV29ya2Zsb3cuSW5zdGFuY2UucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAod29ya2Zsb3dEYXRhLCB2ZWRhLCBuZXQsIHRlbXBsYXRlLCBjb250YWluZXIpIHtcbiAgICBsZXQgd29ya2Zsb3c7XG4gICAgY29uc3QgY2FudmFzU2l6ZVB4PTEwMDAwO1xuICAgIGxldCBlbGVtZW50SWQ7XG4gICAgbGV0IHNlbGVjdGVkRWxlbWVudElkO1xuICAgIGxldCBzZWxlY3RlZEVsZW1lbnRUeXBlO1xuICAgIGxldCBzZWxlY3RlZEVsZW1lbnRTb3VyY2VJZDtcbiAgICBsZXQgcHJvY2VzcztcbiAgICBsZXQgbW9kZT0ndmlldyc7XG4gICAgbGV0IG1heF9wcm9jZXNzX2RlcHRoPTA7XG4gICAgbGV0IGRyYWdMaXN0ID0gW107XG4gICAgY29uc3QgcHJvcHMgPSAkKCcjcHJvcHMnLCB0ZW1wbGF0ZSk7XG4gICAgY29uc3QgcHJvcHNIZWFkID0gJCgnI3Byb3BzLWhlYWQnLCB0ZW1wbGF0ZSk7XG5cbiAgICBpZiAoIG5ldC5oYXNWYWx1ZSgncmRmOnR5cGUnLCAndi13ZjpOZXQnKSApIHtcbiAgICAgIG1vZGUgPSAnZWRpdCc7XG4gICAgICBlbGVtZW50SWQgPSBuZXQuaWQ7XG4gICAgfSBlbHNlIGlmICggbmV0Lmhhc1ZhbHVlKCdyZGY6dHlwZScsICd2LXdmOlByb2Nlc3MnKSApIHtcbiAgICAgIG1vZGUgPSAndmlldyc7XG4gICAgICBwcm9jZXNzID0gbmV0O1xuICAgICAgbmV0ID0gbmV0Lmhhc1ZhbHVlKCd2LXdmOmluc3RhbmNlT2YnKSA/IG5ldFsndi13ZjppbnN0YW5jZU9mJ11bMF0gOiBbXTtcbiAgICAgIGVsZW1lbnRJZCA9IG5ldC5pZDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHdvcmtmbG93RGF0YSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHdvcmtmbG93ID0gd29ya2Zsb3dEYXRhLmNvbnRhaW5lcjtcbiAgICAgIGpzV29ya2Zsb3cuSW5zdGFuY2UuY3JlYXRlV29ya2Zsb3dET00od29ya2Zsb3dEYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd29ya2Zsb3cgPSB3b3JrZmxvd0RhdGE7XG4gICAgfVxuICAgIG5ldFsnb2Zmc2V0WCddID0gdmVkYVsnd29ya2Zsb3cnK2VsZW1lbnRJZCsnLW9mZnNldFgnXTtcbiAgICBuZXRbJ29mZnNldFknXSA9IHZlZGFbJ3dvcmtmbG93JytlbGVtZW50SWQrJy1vZmZzZXRZJ107XG4gICAgbmV0WydjdXJyZW50U2NhbGUnXSA9IHZlZGFbJ3dvcmtmbG93JytlbGVtZW50SWQrJy16b29tJ107XG4gICAgaWYgKG5ldFsnY3VycmVudFNjYWxlJ109PW51bGwpIG5ldFsnY3VycmVudFNjYWxlJ10gPSAxLjA7XG5cbiAgICBpZiAoIW5ldFsnb2Zmc2V0WCddKSB7XG4gICAgICBuZXRbJ29mZnNldFgnXSA9IDA7XG4gICAgfVxuICAgIGlmICghbmV0WydvZmZzZXRZJ10pIHtcbiAgICAgIG5ldFsnb2Zmc2V0WSddID0gMDtcbiAgICB9XG5cbiAgICBpZiAobW9kZSA9PT0gJ3ZpZXcnKSB7XG4gICAgICBjb25zdCBob2xkZXIgPSAkKCc8ZGl2PicpO1xuICAgICAgcHJvcHNIZWFkLnRleHQobmV0WydyZGZzOmxhYmVsJ10uam9pbignLCAnKSk7XG4gICAgICBwcm9jZXNzLnByZXNlbnQoaG9sZGVyLCAndi13ZjpQcm9jZXNzUHJvcHNUZW1wbGF0ZScpO1xuICAgICAgcHJvcHMuZW1wdHkoKS5hcHBlbmQoaG9sZGVyKTtcbiAgICB9XG5cbiAgICBjb25zdCB3ZGF0YSA9ICQoJyMnK3dvcmtmbG93RGF0YSwgdGVtcGxhdGUpO1xuXG4gICAgd2RhdGEuY3NzKHtcbiAgICAgICdoZWlnaHQnOiBjYW52YXNTaXplUHggKydweCcsXG4gICAgICAnd2lkdGgnOiBjYW52YXNTaXplUHgrJ3B4JyxcbiAgICB9KTtcbiAgICAkKCcud29ya2Zsb3ctd3JhcHBlcicsIHRlbXBsYXRlKS5hZGRDbGFzcygnY2FsY3VsYXRlZC1oZWlnaHQnKTtcblxuICAgICQoJzxjYW52YXM+JykuYXR0cih7XG4gICAgICAnaWQnOiAnc2VsZWN0X2NhbnZhcycsXG4gICAgICAnd2lkdGgnOiBjYW52YXNTaXplUHggKydweCcsXG4gICAgICAnaGVpZ2h0JzogY2FudmFzU2l6ZVB4KydweCcsXG4gICAgfSkuYXBwZW5kVG8od2RhdGEpO1xuXG4gICAgbGV0IGFzX3N0YXJ0ID0gbnVsbDtcbiAgICBjb25zdCBjdHggPSAkKCcjc2VsZWN0X2NhbnZhcycsIHRlbXBsYXRlKS5nZXQoMCkuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjdHguZ2xvYmFsQWxwaGEgPSAwLjM7XG5cbiAgICB3ZGF0YS5vbignbW91c2Vkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAgIGFzX3N0YXJ0ID0gW2Uub2Zmc2V0WCwgZS5vZmZzZXRZXTtcbiAgICAgICAgJCgnI3NlbGVjdF9jYW52YXMnLCB0ZW1wbGF0ZSkuc2hvdygpO1xuICAgICAgfVxuICAgIH0pLm9uKCdtb3VzZXVwJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAgIGNvbnN0IGVuZCA9IFtlLm9mZnNldFgsIGUub2Zmc2V0WV07XG5cbiAgICAgICAgY29uc3QgeDEgPSBNYXRoLm1pbihhc19zdGFydFswXSwgZW5kWzBdKSAtIGNhbnZhc1NpemVQeC8yO1xuICAgICAgICBjb25zdCB4MiA9IE1hdGgubWF4KGFzX3N0YXJ0WzBdLCBlbmRbMF0pIC0gY2FudmFzU2l6ZVB4LzI7XG4gICAgICAgIGNvbnN0IHkxID0gTWF0aC5taW4oYXNfc3RhcnRbMV0sIGVuZFsxXSkgLSBjYW52YXNTaXplUHgvMjtcbiAgICAgICAgY29uc3QgeTIgPSBNYXRoLm1heChhc19zdGFydFsxXSwgZW5kWzFdKSAtIGNhbnZhc1NpemVQeC8yO1xuICAgICAgICAkKCcjc2VsZWN0X2NhbnZhcycsIHRlbXBsYXRlKS5oaWRlKCk7XG5cbiAgICAgICAgbmV0Wyd2LXdmOmNvbnNpc3RzT2YnXS5mb3JFYWNoKChzdGF0ZSkgPT4ge1xuICAgICAgICAgIGlmIChzdGF0ZS5oYXNWYWx1ZSgndi13Zjpsb2NhdGlvblgnKSAmJiBzdGF0ZS5oYXNWYWx1ZSgndi13Zjpsb2NhdGlvblknKSkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICB4MSA8PSBzdGF0ZVsndi13Zjpsb2NhdGlvblgnXVswXSAmJiBzdGF0ZVsndi13Zjpsb2NhdGlvblgnXVswXSA8PSB4MiAmJlxuICAgICAgICAgICAgICB5MSA8PSBzdGF0ZVsndi13Zjpsb2NhdGlvblknXVswXSAmJiBzdGF0ZVsndi13Zjpsb2NhdGlvblknXVswXSA8PSB5MlxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGNvbnN0ICRzdGF0ZSA9ICQoJyMnICsgQnJvd3NlclV0aWwuZXNjYXBlNCQoc3RhdGUuaWQpLCB0ZW1wbGF0ZSk7XG4gICAgICAgICAgICAgIGluc3RhbmNlLmFkZFRvRHJhZ0xpc3QoJHN0YXRlKTtcbiAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pLm9uKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKGUuc2hpZnRLZXkgJiYgZS5idXR0b25zID09IDEpIHtcbiAgICAgICAgaWYgKCFhc19zdGFydCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgZS5kZWxlZ2F0ZVRhcmdldC5vZmZzZXRXaWR0aCwgZS5kZWxlZ2F0ZVRhcmdldC5vZmZzZXRIZWlnaHQpO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG5cbiAgICAgICAgY29uc3QgeCA9IGUub2Zmc2V0WDtcbiAgICAgICAgY29uc3QgeSA9IGUub2Zmc2V0WTtcblxuICAgICAgICBjdHgucmVjdChhc19zdGFydFswXSwgYXNfc3RhcnRbMV0sIHggLSBhc19zdGFydFswXSwgeSAtIGFzX3N0YXJ0WzFdKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB3ZGF0YS5kcmFnZ2FibGUoe1xuICAgICAgZHJhZzogZnVuY3Rpb24gKGV2ZW50LCB1aSkge1xuICAgICAgICBpZiAoIWV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgaW5zdGFuY2UubW92ZUNhbnZhcyh1aS5wb3NpdGlvbi5sZWZ0LCB1aS5wb3NpdGlvbi50b3ApO1xuICAgICAgICAgICQoJyN3b3JrZmxvdy1jb250ZXh0LW1lbnUnLCB0ZW1wbGF0ZSkuaGlkZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGlmICghZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgaW5zdGFuY2UuZGVmb2N1cygpO1xuICAgICAgICBsZXQgaG9sZGVyO1xuICAgICAgICBpZiAobW9kZSA9PT0gJ3ZpZXcnKSB7XG4gICAgICAgICAgaG9sZGVyID0gJCgnPGRpdj4nKTtcbiAgICAgICAgICBwcm9wc0hlYWQudGV4dChuZXRbJ3JkZnM6bGFiZWwnXS5qb2luKCcsICcpKTtcbiAgICAgICAgICBwcm9jZXNzLnByZXNlbnQoaG9sZGVyLCAndi13ZjpQcm9jZXNzUHJvcHNUZW1wbGF0ZScpO1xuICAgICAgICAgIHByb3BzLmVtcHR5KCkuYXBwZW5kKGhvbGRlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1vZGUgPT09ICdlZGl0Jykge1xuICAgICAgICAgIGhvbGRlciA9ICQoJzxkaXY+Jyk7XG4gICAgICAgICAgcHJvcHNIZWFkLnRleHQobmV0WydyZGZzOmxhYmVsJ10uam9pbignLCAnKSk7XG4gICAgICAgICAgbmV0LnByZXNlbnQoaG9sZGVyLCAndi13ZjpTaW1wbGVOZXRUZW1wbGF0ZScsICdlZGl0Jyk7XG4gICAgICAgICAgcHJvcHMuZW1wdHkoKS5hcHBlbmQoaG9sZGVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmluc3RhbmNlO1xuXG4gICAgLy8gSW1wb3J0IGFsbCB0aGUgZ2l2ZW4gZGVmYXVsdHMgaW50byB0aGlzIGluc3RhbmNlLlxuICAgIGluc3RhbmNlLmltcG9ydERlZmF1bHRzKHtcbiAgICAgIEVuZHBvaW50OiAnRG90JyxcbiAgICAgIEhvdmVyUGFpbnRTdHlsZToge1xuICAgICAgICBzdHJva2VTdHlsZTogJyM2Njk5RkYnLFxuICAgICAgICBsaW5lV2lkdGg6IDEsXG4gICAgICB9LFxuICAgICAgQ29ubmVjdGlvbk92ZXJsYXlzOiBbXG4gICAgICAgIFsnQXJyb3cnLCB7XG4gICAgICAgICAgbG9jYXRpb246IDEsXG4gICAgICAgICAgaWQ6ICdhcnJvdycsXG4gICAgICAgICAgbGVuZ3RoOiAxNCxcbiAgICAgICAgICB3aWR0aDogMTAsXG4gICAgICAgICAgZm9sZGJhY2s6IDAuOCxcbiAgICAgICAgfV0sXG4gICAgICAgIFsnTGFiZWwnLCB7XG4gICAgICAgICAgbGFiZWw6ICd0cmFuc2l0aW9uJyxcbiAgICAgICAgICBpZDogJ2xhYmVsJyxcbiAgICAgICAgICBjc3NDbGFzczogJ2FMYWJlbCcsXG4gICAgICAgIH1dLFxuICAgICAgXSxcbiAgICAgIENvbnRhaW5lcjogd29ya2Zsb3csIC8vIElkIG9mIHRoZSB3b3JrZmxvdyBjb250YWluZXIuXG4gICAgfSk7XG5cbiAgICBpbnN0YW5jZS5tb3ZlQ2FudmFzID0gZnVuY3Rpb24gKG5ld0xlZnQsIG5ld1RvcCkge1xuICAgICAgLy8gREVCVUcgJCgnI3dvcmtmbG93LW5ldC1uYW1lJywgdGVtcGxhdGUpLnRleHQobmV3TGVmdCtcIiAvIFwiK25ld1RvcCk7XG5cbiAgICAgIC8vIGNoYW5nZSBzY2FsZSBhbmQgb2Zmc2V0XG4gICAgICB3ZGF0YS5jc3Moe1xuICAgICAgICAnbGVmdCc6IChuZXdMZWZ0KSsncHgnLFxuICAgICAgICAndG9wJzogKG5ld1RvcCkrJ3B4JyxcbiAgICAgIH0pO1xuICAgICAgdmVkYVsnd29ya2Zsb3cnK2VsZW1lbnRJZCsnLW9mZnNldFgnXSA9IG5ld0xlZnQ7XG4gICAgICB2ZWRhWyd3b3JrZmxvdycrZWxlbWVudElkKyctb2Zmc2V0WSddID0gbmV3VG9wO1xuICAgICAgbmV0WydvZmZzZXRYJ10gPSBuZXdMZWZ0O1xuICAgICAgbmV0WydvZmZzZXRZJ10gPSBuZXdUb3A7XG4gICAgfTtcblxuICAgIGlmIChuZXRbJ29mZnNldFgnXSE9bnVsbCAmJiBuZXRbJ29mZnNldFgnXSE9MCkge1xuICAgICAgaW5zdGFuY2UubW92ZUNhbnZhcyhuZXRbJ29mZnNldFgnXSwgbmV0WydvZmZzZXRZJ10pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnN0YW5jZS5tb3ZlQ2FudmFzKC1jYW52YXNTaXplUHgvMiwgLWNhbnZhc1NpemVQeC8yKTtcbiAgICB9XG5cbiAgICAvLyBCaW5kIGEgY2xpY2sgbGlzdGVuZXIgdG8gZWFjaCB0cmFuc2l0aW9uIChjb25uZWN0aW9uKS4gT24gZG91YmxlIGNsaWNrLCB0aGUgdHJhbnNpdGlvbiBpcyBkZWxldGVkLlxuICAgIGlmIChtb2RlPT0nZWRpdCcpIHtcbiAgICAgIGluc3RhbmNlLmJpbmQoJ2RibGNsaWNrJywgZnVuY3Rpb24gKHRyYW5zaXRpb24pIHtcbiAgICAgICAgcmlvdC5yb3V0ZSgnIy8nICsgdHJhbnNpdGlvbi5pZCArICcvLy9lZGl0Jyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBGaWxsIGluZm8gcGFuZWwgb24gZmxvdyBjbGlja1xuICAgIGluc3RhbmNlLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24gKHRyYW5zaXRpb24pIHtcbiAgICAgIGNvbnN0IGZsb3dJZCA9IHRyYW5zaXRpb24uZ2V0RGF0YSgpO1xuICAgICAgdmVkYVsnd29ya2Zsb3cnK2VsZW1lbnRJZCsnLXNlbGVjdGVkRWxlbWVudCddID0gdHJhbnNpdGlvbi5pZDtcbiAgICAgIGluc3RhbmNlLmRlZm9jdXMoKTtcblxuICAgICAgdHJhbnNpdGlvbi5zZXRQYWludFN0eWxlKHtzdHJva2VTdHlsZTogJyNGRjAwMDAnfSk7XG5cbiAgICAgIGlmICh0cmFuc2l0aW9uLmlkID09ICdfX2xhYmVsJykge1xuICAgICAgICB0cmFuc2l0aW9uID0gdHJhbnNpdGlvbi5jb21wb25lbnQ7XG4gICAgICB9XG5cbiAgICAgIHNlbGVjdGVkRWxlbWVudElkID0gdHJhbnNpdGlvbi5pZDtcbiAgICAgIHNlbGVjdGVkRWxlbWVudFR5cGUgPSAnZmxvdyc7XG4gICAgICBzZWxlY3RlZEVsZW1lbnRTb3VyY2VJZCA9IHRyYW5zaXRpb24uc291cmNlSWQ7XG5cbiAgICAgIGNvbnN0IGFib3V0ID0gbmV3IEluZGl2aWR1YWxNb2RlbChmbG93SWQpO1xuICAgICAgY29uc3QgaG9sZGVyID0gJCgnPGRpdj4nKTtcbiAgICAgIGFib3V0LnByZXNlbnQoaG9sZGVyKTtcbiAgICAgIHByb3BzLmFwcGVuZChob2xkZXIpO1xuICAgICAgaWYgKCBhYm91dC5oYXNWYWx1ZSgncmRmczpsYWJlbCcpICkgcHJvcHNIZWFkLnRleHQoYWJvdXRbJ3JkZnM6bGFiZWwnXS5qb2luKCcsICcpKTtcbiAgICAgIGVsc2UgcHJvcHNIZWFkLnRleHQoYWJvdXQuaWQpO1xuICAgIH0pO1xuXG4gICAgaW5zdGFuY2UuYmluZCgnY29ubmVjdGlvbk1vdmVkJywgZnVuY3Rpb24gKGluZm8sIG9yaWdpbmFsRXZlbnQpIHtcbiAgICAgIGlmIChpbmZvLm9yaWdpbmFsU291cmNlSWQgIT09IGluZm8ubmV3U291cmNlSWQpIHtcbiAgICAgICAgbmV0Wyd2LXdmOmNvbnNpc3RzT2YnXS5mb3JFYWNoKChzdGF0ZSkgPT4ge1xuICAgICAgICAgIGlmIChzdGF0ZS5pZCA9PT0gaW5mby5vcmlnaW5hbFNvdXJjZUlkKSB7XG4gICAgICAgICAgICBzdGF0ZVsndi13ZjpoYXNGbG93J10gPSByZW1vdmVTdWJJbmRpdmlkdWFsKHN0YXRlLCAndi13ZjpoYXNGbG93JywgaW5mby5jb25uZWN0aW9uLmlkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHN0YXRlLmlkID09PSBpbmZvLm5ld1NvdXJjZUlkKSB7XG4gICAgICAgICAgICBzdGF0ZVsndi13ZjpoYXNGbG93J10gPSBzdGF0ZS5oYXNWYWx1ZSgndi13ZjpoYXNGbG93JykgPyBzdGF0ZVsndi13ZjpoYXNGbG93J10uY29uY2F0KG5ldyBJbmRpdmlkdWFsTW9kZWwoaW5mby5jb25uZWN0aW9uLmlkKSk6W25ldyBJbmRpdmlkdWFsTW9kZWwoaW5mby5jb25uZWN0aW9uLmlkKV07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSBjcmVhdGluZyBuZXcgZmxvdyBldmVudFxuICAgIGluc3RhbmNlLmJpbmQoJ2Nvbm5lY3Rpb24nLCBmdW5jdGlvbiAoaW5mbykge1xuICAgICAgY29uc3Qgc291cmNlID0gbmV3IEluZGl2aWR1YWxNb2RlbChpbmZvLnNvdXJjZUlkKTtcbiAgICAgIGNvbnN0IGZsb3dFeGlzdHMgPSBzb3VyY2UuZ2V0KCd2LXdmOmhhc0Zsb3cnKS5maWx0ZXIoKGZsb3cxKSA9PiB7XG4gICAgICAgIHJldHVybiBmbG93MS5oYXNWYWx1ZSgndi13ZjpmbG93c0ludG8nLCBpbmZvLnRhcmdldElkKTtcbiAgICAgIH0pLmxlbmd0aDtcbiAgICAgIGlmIChmbG93RXhpc3RzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZmxvdyA9IG5ldyBJbmRpdmlkdWFsTW9kZWwoKTsgLy8gQ3JlYXRlIEZsb3cgaW5kaXZpZHVhbFxuICAgICAgZmxvd1sncmRmOnR5cGUnXSA9ICd2LXdmOkZsb3cnO1xuICAgICAgZmxvd1sndi13ZjpmbG93c0ludG8nXSA9IGluZm8udGFyZ2V0SWQ7IC8vIFNldCBGbG93IHRhcmdldFxuICAgICAgbmV0LmFkZFZhbHVlKCd2LXdmOmNvbnNpc3RzT2YnLCBmbG93KTsgLy8gQWRkIG5ldyBGbG93IHRvIE5ldFxuICAgICAgc291cmNlLmFkZFZhbHVlKCd2LXdmOmhhc0Zsb3cnLCBmbG93KTsgLy8gQWRkIG5ldyBGbG93IHRvIHNvdXJjZVxuICAgICAgaW5mby5jb25uZWN0aW9uLnNldERhdGEoZmxvdy5pZCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBzdWJOZXRWaWV3QnV0dG9uID0gZnVuY3Rpb24gKHN0YXRlLCAkc3RhdGUpIHtcbiAgICAgIGlmICghc3RhdGUuaGFzVmFsdWUoJ3Ytd2Y6c3ViTmV0JykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgJCgnPHNwYW4vPicsIHtcbiAgICAgICAgJ2NsaWNrJzogKCgpID0+IHtcbiAgICAgICAgICByaW90LnJvdXRlKCcjLycrc3RhdGVbJ3Ytd2Y6c3ViTmV0J11bMF0uaWQrJy8vL2VkaXQnKTtcbiAgICAgICAgfSksXG4gICAgICAgICdjbGFzcyc6ICdnbHlwaGljb24gZ2x5cGhpY29uLXNlYXJjaCBzdWJuZXQtbGluaycsXG4gICAgICB9KS5hcHBlbmRUbygkc3RhdGUpO1xuICAgIH07XG5cbiAgICBjb25zdCBleGVjdXRvck1hcmsgPSBmdW5jdGlvbiAoc3RhdGUsICRzdGF0ZSkge1xuICAgICAgaWYgKCFzdGF0ZS5oYXNWYWx1ZSgndi13ZjpleGVjdXRvcicpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHN0YXRlWyd2LXdmOmV4ZWN1dG9yJ11bMF0ubG9hZCgpLnRoZW4oKGV4ZWN1dG9yKSA9PiB7XG4gICAgICAgIGlmIChleGVjdXRvclsncmRmOnR5cGUnXVswXS5pZCA9PSAndi1zOkFwcG9pbnRtZW50Jykge1xuICAgICAgICAgICQoJzxzcGFuLz4nLCB7XG4gICAgICAgICAgICAnY2xhc3MnOiAnZ2x5cGhpY29uIGdseXBoaWNvbi11c2VyJyxcbiAgICAgICAgICB9KS5hcHBlbmRUbygkc3RhdGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICQoJzxzcGFuLz4nLCB7XG4gICAgICAgICAgICAnY2xhc3MnOiAnZ2x5cGhpY29uIGdseXBoaWNvbi1jb2cnLFxuICAgICAgICAgIH0pLmFwcGVuZFRvKCRzdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBpbnN0YW5jZS51cGRhdGVTVkdCYWNrZ3JvdW5kID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIGxldCBzdmdCYWNrZ3JvdW5kID0gJyc7XG4gICAgICBpZiAoaXRlbS5oYXNDbGFzcygnc3BsaXQtYW5kJykpIHtcbiAgICAgICAgc3ZnQmFja2dyb3VuZCArPSAnPGxpbmUgeDE9XFwnODBcXCcgeTE9XFwnMjVcXCcgeDI9XFwnMTAwXFwnIHkyPVxcJzBcXCcgc3R5bGU9XFwnc3Ryb2tlOnJnYigwLDAsMCk7IHN0cm9rZS13aWR0aDoxXFwnIC8+PGxpbmUgeDE9XFwnODBcXCcgeTE9XFwnMFxcJyB4Mj1cXCc4MFxcJyB5Mj1cXCc1MFxcJyBzdHlsZT1cXCdzdHJva2U6cmdiKDAsMCwwKTsgc3Ryb2tlLXdpZHRoOjFcXCcgLz48bGluZSB4MT1cXCc4MFxcJyB5MT1cXCcyNVxcJyB4Mj1cXCcxMDBcXCcgeTI9XFwnNTBcXCcgc3R5bGU9XFwnc3Ryb2tlOnJnYigwLDAsMCk7IHN0cm9rZS13aWR0aDoxXFwnIC8+JztcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtLmhhc0NsYXNzKCdzcGxpdC1vcicpKSB7XG4gICAgICAgIHN2Z0JhY2tncm91bmQgKz0gJzxsaW5lIHgxPVxcJzEwMFxcJyB5MT1cXCcyNVxcJyB4Mj1cXCc5MFxcJyB5Mj1cXCcwXFwnIHN0eWxlPVxcJ3N0cm9rZTpyZ2IoMCwwLDApOyBzdHJva2Utd2lkdGg6MVxcJyAvPjxsaW5lIHgxPVxcJzkwXFwnIHkxPVxcJzBcXCcgeDI9XFwnODBcXCcgeTI9XFwnMjVcXCcgc3R5bGU9XFwnc3Ryb2tlOnJnYigwLDAsMCk7IHN0cm9rZS13aWR0aDoxXFwnIC8+PGxpbmUgeDE9XFwnODBcXCcgeTE9XFwnMFxcJyB4Mj1cXCc4MFxcJyB5Mj1cXCc1MFxcJyBzdHlsZT1cXCdzdHJva2U6cmdiKDAsMCwwKTsgc3Ryb2tlLXdpZHRoOjFcXCcgLz48bGluZSB4MT1cXCcxMDBcXCcgeTE9XFwnMjVcXCcgeDI9XFwnOTBcXCcgeTI9XFwnNTBcXCcgc3R5bGU9XFwnc3Ryb2tlOnJnYigwLDAsMCk7IHN0cm9rZS13aWR0aDoxXFwnIC8+PGxpbmUgeDE9XFwnOTBcXCcgeTE9XFwnNTBcXCcgeDI9XFwnODBcXCcgeTI9XFwnMjVcXCcgc3R5bGU9XFwnc3Ryb2tlOnJnYigwLDAsMCk7IHN0cm9rZS13aWR0aDoxXFwnIC8+JztcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtLmhhc0NsYXNzKCdzcGxpdC14b3InKSkge1xuICAgICAgICBzdmdCYWNrZ3JvdW5kICs9ICc8bGluZSB4MT1cXCcxMDBcXCcgeTE9XFwnMjVcXCcgeDI9XFwnODBcXCcgeTI9XFwnMFxcJyBzdHlsZT1cXCdzdHJva2U6cmdiKDAsMCwwKTsgc3Ryb2tlLXdpZHRoOjFcXCcgLz48bGluZSB4MT1cXCc4MFxcJyB5MT1cXCcwXFwnIHgyPVxcJzgwXFwnIHkyPVxcJzUwXFwnIHN0eWxlPVxcJ3N0cm9rZTpyZ2IoMCwwLDApOyBzdHJva2Utd2lkdGg6MVxcJyAvPjxsaW5lIHgxPVxcJzEwMFxcJyB5MT1cXCcyNVxcJyB4Mj1cXCc4MFxcJyB5Mj1cXCc1MFxcJyBzdHlsZT1cXCdzdHJva2U6cmdiKDAsMCwwKTsgc3Ryb2tlLXdpZHRoOjFcXCcgLz4nO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW0uaGFzQ2xhc3MoJ2pvaW4tYW5kJykpIHtcbiAgICAgICAgc3ZnQmFja2dyb3VuZCArPSAnPGxpbmUgeDE9XFwnMjBcXCcgeTE9XFwnMjVcXCcgeDI9XFwnMFxcJyB5Mj1cXCcwXFwnIHN0eWxlPVxcJ3N0cm9rZTpyZ2IoMCwwLDApOyBzdHJva2Utd2lkdGg6MVxcJyAvPjxsaW5lIHgxPVxcJzIwXFwnIHkxPVxcJzBcXCcgeDI9XFwnMjBcXCcgeTI9XFwnNTBcXCcgc3R5bGU9XFwnc3Ryb2tlOnJnYigwLDAsMCk7IHN0cm9rZS13aWR0aDoxXFwnIC8+PGxpbmUgeDE9XFwnMjBcXCcgeTE9XFwnMjVcXCcgeDI9XFwnMFxcJyB5Mj1cXCc1MFxcJyBzdHlsZT1cXCdzdHJva2U6cmdiKDAsMCwwKTsgc3Ryb2tlLXdpZHRoOjFcXCcgLz4nO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW0uaGFzQ2xhc3MoJ2pvaW4tb3InKSkge1xuICAgICAgICBzdmdCYWNrZ3JvdW5kICs9ICc8bGluZSB4MT1cXCcwXFwnIHkxPVxcJzI1XFwnIHgyPVxcJzEwXFwnIHkyPVxcJzBcXCcgc3R5bGU9XFwnc3Ryb2tlOnJnYigwLDAsMCk7IHN0cm9rZS13aWR0aDoxXFwnIC8+PGxpbmUgeDE9XFwnMTBcXCcgeTE9XFwnMFxcJyB4Mj1cXCcyMFxcJyB5Mj1cXCcyNVxcJyBzdHlsZT1cXCdzdHJva2U6cmdiKDAsMCwwKTsgc3Ryb2tlLXdpZHRoOjFcXCcgLz48bGluZSB4MT1cXCcyMFxcJyB5MT1cXCcwXFwnIHgyPVxcJzIwXFwnIHkyPVxcJzUwXFwnIHN0eWxlPVxcJ3N0cm9rZTpyZ2IoMCwwLDApOyBzdHJva2Utd2lkdGg6MVxcJyAvPjxsaW5lIHgxPVxcJzBcXCcgeTE9XFwnMjVcXCcgeDI9XFwnMTBcXCcgeTI9XFwnNTBcXCcgc3R5bGU9XFwnc3Ryb2tlOnJnYigwLDAsMCk7IHN0cm9rZS13aWR0aDoxXFwnIC8+PGxpbmUgeDE9XFwnMTBcXCcgeTE9XFwnNTBcXCcgeDI9XFwnMjBcXCcgeTI9XFwnMjVcXCcgc3R5bGU9XFwnc3Ryb2tlOnJnYigwLDAsMCk7IHN0cm9rZS13aWR0aDoxXFwnIC8+JztcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtLmhhc0NsYXNzKCdqb2luLXhvcicpKSB7XG4gICAgICAgIHN2Z0JhY2tncm91bmQgKz0gJzxsaW5lIHgxPVxcJzBcXCcgeTE9XFwnMjVcXCcgeDI9XFwnMjBcXCcgeTI9XFwnMFxcJyBzdHlsZT1cXCdzdHJva2U6cmdiKDAsMCwwKTsgc3Ryb2tlLXdpZHRoOjFcXCcgLz48bGluZSB4MT1cXCcyMFxcJyB5MT1cXCcwXFwnIHgyPVxcJzIwXFwnIHkyPVxcJzUwXFwnIHN0eWxlPVxcJ3N0cm9rZTpyZ2IoMCwwLDApOyBzdHJva2Utd2lkdGg6MVxcJyAvPjxsaW5lIHgxPVxcJzBcXCcgeTE9XFwnMjVcXCcgeDI9XFwnMjBcXCcgeTI9XFwnNTBcXCcgc3R5bGU9XFwnc3Ryb2tlOnJnYigwLDAsMCk7IHN0cm9rZS13aWR0aDoxXFwnIC8+JztcbiAgICAgIH1cbiAgICAgIHN2Z0JhY2tncm91bmQgPSAndXJsKFwiZGF0YTppbWFnZS9zdmcreG1sO3V0ZjgsPHN2ZyB4bWxucz1cXCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcJyB2ZXJzaW9uPVxcJzEuMVxcJyBwcmVzZXJ2ZUFzcGVjdFJhdGlvPVxcJ25vbmVcXCcgdmlld0JveD1cXCcwIDAgMTAwIDUwXFwnPicgKyBzdmdCYWNrZ3JvdW5kICsgJzwvc3ZnPlwiKSc7XG4gICAgICBpdGVtLmNzcygnYmFja2dyb3VuZCcsIHN2Z0JhY2tncm91bmQpO1xuICAgIH07XG5cbiAgICBpbnN0YW5jZS5zaG93UHJvY2Vzc1J1blBhdGggPSBmdW5jdGlvbiAod29ya0l0ZW0sIGRlcHRoKSB7XG4gICAgICBpZiAod29ya0l0ZW0uaGFzVmFsdWUoJ3Ytd2Y6cHJldmlvdXNXb3JrSXRlbScpKSB7XG4gICAgICAgIHdvcmtJdGVtWyd2LXdmOnByZXZpb3VzV29ya0l0ZW0nXS5mb3JFYWNoKChwcmV2aW91c1dvcmtJdGVtKSA9PiB7XG4gICAgICAgICAgaWYgKHdvcmtJdGVtLmhhc1ZhbHVlKCd2LXdmOmZvck5ldEVsZW1lbnQnKSAmJiBwcmV2aW91c1dvcmtJdGVtLmhhc1ZhbHVlKCd2LXdmOmZvck5ldEVsZW1lbnQnKSkge1xuICAgICAgICAgICAgaW5zdGFuY2Uuc2hvd1Byb2Nlc3NSdW5QYXRoKHByZXZpb3VzV29ya0l0ZW0sIGRlcHRoKzEpO1xuICAgICAgICAgICAgaW5zdGFuY2Uuc2VsZWN0KHt0YXJnZXQ6IHdvcmtJdGVtWyd2LXdmOmZvck5ldEVsZW1lbnQnXVswXS5pZCwgc291cmNlOiBwcmV2aW91c1dvcmtJdGVtWyd2LXdmOmZvck5ldEVsZW1lbnQnXVswXS5pZH0pLmVhY2goKGUpID0+IHtcbiAgICAgICAgICAgICAgZS5hZGRDbGFzcygncHJvY2Vzcy1wYXRoLWhpZ2hsaWdodCcpO1xuICAgICAgICAgICAgICBjb25zdCBwYXRoQ291bnRlckxhYmVsID0gKGUuZ2V0T3ZlcmxheSgncGF0aENvdW50ZXInKSE9dW5kZWZpbmVkKT9lLmdldE92ZXJsYXkoJ3BhdGhDb3VudGVyJykuZ2V0TGFiZWwoKTonJztcbiAgICAgICAgICAgICAgZS5yZW1vdmVPdmVybGF5KCdwYXRoQ291bnRlcicpO1xuICAgICAgICAgICAgICBlLmFkZE92ZXJsYXkoWydMYWJlbCcsIHtsYWJlbDogKChwYXRoQ291bnRlckxhYmVsIT0nJyk/cGF0aENvdW50ZXJMYWJlbCsnLCc6JycpKyhtYXhfcHJvY2Vzc19kZXB0aC1kZXB0aCksIGxvY2F0aW9uOiAwLjUsIGlkOiAncGF0aENvdW50ZXInLCBjc3NDbGFzczogJ3BhdGhDb3VudGVyTGFiZWwnfV0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1heF9wcm9jZXNzX2RlcHRoID0gZGVwdGg7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGluc3RhbmNlLmFkZFZhclByb3BlcnR5ID0gZnVuY3Rpb24gKHN0YXRlSWQsIG1hcHBpbmcsIHZhcklkKSB7XG4gICAgICBjb25zdCB2YXJpYWJsZSA9IG5ldyBJbmRpdmlkdWFsTW9kZWwodmFySWQpO1xuXG4gICAgICBjb25zdCBpbmRpdmlkdWFsTSA9IG5ldyBJbmRpdmlkdWFsTW9kZWwoKTsgLy8gY3JlYXRlIGluZGl2aWR1YWwgKE1hcHBpbmcpXG5cbiAgICAgIGluZGl2aWR1YWxNWydyZGY6dHlwZSddID0gW25ldyBJbmRpdmlkdWFsTW9kZWwoJ3Ytd2Y6TWFwcGluZycpXTtcbiAgICAgIGluZGl2aWR1YWxNWyd2LXdmOm1hcFRvVmFyaWFibGUnXSA9IFt2YXJpYWJsZV07XG4gICAgICBpbmRpdmlkdWFsTVsndi13ZjptYXBwaW5nRXhwcmVzc2lvbiddID0gWydwcm9jZXNzLmdldElucHV0VmFyaWFibGUgKFxcJycrdmFyaWFibGVbJ3Ytd2Y6dmFyRGVmaW5lTmFtZSddWzBdKydcXCcpJ107XG5cbiAgICAgIGZvclN1YkluZGl2aWR1YWwobmV0LCAndi13Zjpjb25zaXN0c09mJywgc3RhdGVJZCwgZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICAgIHN0YXRlW21hcHBpbmddID0gc3RhdGVbbWFwcGluZ10uY29uY2F0KGluZGl2aWR1YWxNKTsgLy8gPC0gQWRkIG5ldyBNYXBwaW5nIHRvIFN0YXRlXG4gICAgICAgIG5ldFsndi13Zjpjb25zaXN0c09mJ10gPSBuZXRbJ3Ytd2Y6Y29uc2lzdHNPZiddLmNvbmNhdChpbmRpdmlkdWFsTSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgaW5zdGFuY2UuYWRkVG9EcmFnTGlzdCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICBkcmFnTGlzdC5wdXNoKGVsZW1lbnQpO1xuICAgICAgZWxlbWVudC5hZGRDbGFzcygnanNwbHVtYi1kcmFnLXNlbGVjdGVkJyk7XG4gICAgICBpbnN0YW5jZS5hZGRUb0RyYWdTZWxlY3Rpb24oZWxlbWVudCk7XG4gICAgfTtcblxuICAgIGluc3RhbmNlLmNsZWFyRHJhZ0xpc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBkcmFnTGlzdCA9IFtdO1xuICAgICAgaW5zdGFuY2UuY2xlYXJEcmFnU2VsZWN0aW9uKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEJpbmQgcmVxdWlyZWQgZnVuY3Rpb25hbCB0byBTdGF0ZSBlbGVtZW50c1xuICAgICAqIEBtZXRob2QgYmluZFN0YXRlRXZlbnRzXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHdpbmRvd3MgTGlzdCBvZiBhbGwgU3RhdGUgZWxlbWVudHNcbiAgICAgKi9cbiAgICBjb25zdCBiaW5kU3RhdGVFdmVudHMgPSBmdW5jdGlvbiAod2luZG93cykge1xuICAgICAgd2luZG93cy5maW5kKCcuc3RhdGUtbmFtZScpLmRyb3BwYWJsZSh7XG4gICAgICAgIGhvdmVyQ2xhc3M6ICdkcmFnSG92ZXInLFxuICAgICAgICBkcm9wOiBmdW5jdGlvbiAoIGV2ZW50LCB1aSApIHtcbiAgICAgICAgICBjb25zdCB2YXJJZCA9IHVpLmRyYWdnYWJsZS5hdHRyKCdyZXNvdXJjZScpO1xuICAgICAgICAgIGNvbnN0IHRhc2tJZCA9IHdpbmRvd3MuYXR0cignaWQnKTtcbiAgICAgICAgICBjb25zdCAkZGl2ID0gJCgnPGRpdiAvPicpO1xuICAgICAgICAgICRkaXYuYXBwZW5kVG8oJCgnI21haW4nKSk7XG4gICAgICAgICAgJGRpdi5kaWFsb2coe1xuICAgICAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgICAgICByZXNpemFibGU6IGZhbHNlLFxuICAgICAgICAgICAgYnV0dG9uczoge1xuICAgICAgICAgICAgICAndi13ZjpzdGFydGluZ01hcHBpbmcnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuYWRkVmFyUHJvcGVydHkodGFza0lkLCAndi13ZjpzdGFydGluZ01hcHBpbmcnLCB2YXJJZCk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5kaWFsb2coJ2Nsb3NlJyk7XG4gICAgICAgICAgICAgICAgJCgnIycrQnJvd3NlclV0aWwuZXNjYXBlNCQodGFza0lkKSwgdGVtcGxhdGUpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICd2LXdmOmNvbXBsZXRlZE1hcHBpbmcnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuYWRkVmFyUHJvcGVydHkodGFza0lkLCAndi13Zjpjb21wbGV0ZWRNYXBwaW5nJywgdmFySWQpO1xuICAgICAgICAgICAgICAgICQodGhpcykuZGlhbG9nKCdjbG9zZScpO1xuICAgICAgICAgICAgICAgICQoJyMnK0Jyb3dzZXJVdGlsLmVzY2FwZTQkKHRhc2tJZCksIHRlbXBsYXRlKS50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAndi13Zjp3b3NSZXN1bHRzTWFwcGluZyc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5hZGRWYXJQcm9wZXJ0eSh0YXNrSWQsICd2LXdmOndvc1Jlc3VsdHNNYXBwaW5nJywgdmFySWQpO1xuICAgICAgICAgICAgICAgICQodGhpcykuZGlhbG9nKCdjbG9zZScpO1xuICAgICAgICAgICAgICAgICQoJyMnK0Jyb3dzZXJVdGlsLmVzY2FwZTQkKHRhc2tJZCksIHRlbXBsYXRlKS50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAndi13ZjpzdGFydGluZ0pvdXJuYWxNYXAnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuYWRkVmFyUHJvcGVydHkodGFza0lkLCAndi13ZjpzdGFydGluZ0pvdXJuYWxNYXAnLCB2YXJJZCk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5kaWFsb2coJ2Nsb3NlJyk7XG4gICAgICAgICAgICAgICAgJCgnIycrQnJvd3NlclV0aWwuZXNjYXBlNCQodGFza0lkKSwgdGVtcGxhdGUpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICd2LXdmOmNvbXBsZXRlZEpvdXJuYWxNYXAnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuYWRkVmFyUHJvcGVydHkodGFza0lkLCAndi13Zjpjb21wbGV0ZWRKb3VybmFsTWFwJywgdmFySWQpO1xuICAgICAgICAgICAgICAgICQodGhpcykuZGlhbG9nKCdjbG9zZScpO1xuICAgICAgICAgICAgICAgICQoJyMnK0Jyb3dzZXJVdGlsLmVzY2FwZTQkKHRhc2tJZCksIHRlbXBsYXRlKS50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAndi13ZjpzdGFydGluZ0V4ZWN1dG9ySm91cm5hbE1hcCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5hZGRWYXJQcm9wZXJ0eSh0YXNrSWQsICd2LXdmOnN0YXJ0aW5nRXhlY3V0b3JKb3VybmFsTWFwJywgdmFySWQpO1xuICAgICAgICAgICAgICAgICQodGhpcykuZGlhbG9nKCdjbG9zZScpO1xuICAgICAgICAgICAgICAgICQoJyMnK0Jyb3dzZXJVdGlsLmVzY2FwZTQkKHRhc2tJZCksIHRlbXBsYXRlKS50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAndi13Zjpjb21wbGV0ZWRFeGVjdXRvckpvdXJuYWxNYXAnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuYWRkVmFyUHJvcGVydHkodGFza0lkLCAndi13Zjpjb21wbGV0ZWRFeGVjdXRvckpvdXJuYWxNYXAnLCB2YXJJZCk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5kaWFsb2coJ2Nsb3NlJyk7XG4gICAgICAgICAgICAgICAgJCgnIycrQnJvd3NlclV0aWwuZXNjYXBlNCQodGFza0lkKSwgdGVtcGxhdGUpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIHdpbmRvd3Mub24oJ2NsaWNrJywgYXN5bmMgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgY29uc3QgX3RoaXMgPSBlLmRlbGVnYXRlVGFyZ2V0O1xuICAgICAgICBjb25zdCBjdXJyZW50RWxlbWVudCA9ICQoX3RoaXMpO1xuICAgICAgICBjb25zdCBhbHJlYWR5U2VsZWN0ZWQgPSBjdXJyZW50RWxlbWVudC5oYXNDbGFzcygnd19hY3RpdmUnKTtcbiAgICAgICAgdmVkYVsnd29ya2Zsb3cnK2VsZW1lbnRJZCsnLXNlbGVjdGVkRWxlbWVudCddID0gX3RoaXMuaWQ7XG4gICAgICAgIGlmIChlLmN0cmxLZXkpIHtcbiAgICAgICAgICBpbnN0YW5jZS5hZGRUb0RyYWdMaXN0KGN1cnJlbnRFbGVtZW50KTtcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghYWxyZWFkeVNlbGVjdGVkKSB7XG4gICAgICAgICAgaW5zdGFuY2UuZGVmb2N1cygpO1xuXG4gICAgICAgICAgc2VsZWN0ZWRFbGVtZW50SWQgPSBfdGhpcy5pZDtcbiAgICAgICAgICBzZWxlY3RlZEVsZW1lbnRUeXBlID0gJ3N0YXRlJztcbiAgICAgICAgICBjdXJyZW50RWxlbWVudC5hZGRDbGFzcygnd19hY3RpdmUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtb2RlPT0nZWRpdCcpIHtcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIGlmIChhbHJlYWR5U2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjsgLy8gZG8gbm90aGluZyB3aGVuIGNsaWNrIG9uIGFscmVhZHkgc2VsZWN0ZWQgZWxlbWVudFxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGFib3V0ID0gYXdhaXQgbmV3IEluZGl2aWR1YWxNb2RlbChfdGhpcy5pZCkubG9hZCgpO1xuICAgICAgICAgIGNvbnN0IGhvbGRlciA9ICQoJzxkaXY+Jyk7XG4gICAgICAgICAgaWYgKGFib3V0WydyZGY6dHlwZSddWzBdLmlkID09ICd2LXdmOlRhc2snKSB7XG4gICAgICAgICAgICBhYm91dC5wcmVzZW50KGhvbGRlciwgJ3Ytd2Y6VGFza1RlbXBsYXRlQXNQcm9wZXJ0aWVzJywgJ2VkaXQnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWJvdXQucHJlc2VudChob2xkZXIsICd2LXdmOkNvbmRpdGlvblRlbXBsYXRlQXNQcm9wZXJ0aWVzJywgJ2VkaXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcHJvcHMuYXBwZW5kKGhvbGRlcik7XG4gICAgICAgICAgaWYgKCBhYm91dC5oYXNWYWx1ZSgncmRmczpsYWJlbCcpICkgcHJvcHNIZWFkLnRleHQoYWJvdXRbJ3JkZnM6bGFiZWwnXS5qb2luKCcsICcpKTtcbiAgICAgICAgICBlbHNlIHByb3BzSGVhZC50ZXh0KGFib3V0LmlkKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8gYnVpbGQgcnVuIHBhdGhcbiAgICAgICAgaWYgKG1vZGUgPT0gJ3ZpZXcnKSB7XG4gICAgICAgICAgaW5zdGFuY2Uuc2VsZWN0KCkucmVtb3ZlQ2xhc3MoJ3Byb2Nlc3MtcGF0aC1oaWdobGlnaHQnKS5yZW1vdmVPdmVybGF5KCdwYXRoQ291bnRlcicpO1xuICAgICAgICAgIGNvbnN0IGFib3V0ID0gbmV3IEluZGl2aWR1YWxNb2RlbChfdGhpcy5pZCk7XG4gICAgICAgICAgaWYgKCBhYm91dC5oYXNWYWx1ZSgncmRmczpsYWJlbCcpICkge1xuICAgICAgICAgICAgcHJvcHNIZWFkLnRleHQoYWJvdXRbJ3JkZnM6bGFiZWwnXS5qb2luKCcsICcpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvcHNIZWFkLnRleHQoYWJvdXQuaWQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIElmIHdlIGhhdmUgbW9yZSB0aGVuIG9uZSBXb3JrSXRlbSAtIHdlIG11c3QgY2hvb3NlIGFtb25nIHRoZW1cbiAgICAgICAgICBpZiAoY3VycmVudEVsZW1lbnQuYXR0cignd29yay1pdGVtcy1jb3VudCcpPjEpIHtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBjb25zdCBtZW51ID0gJCgnI3dvcmtmbG93LWNvbnRleHQtbWVudSB1bCcsIHRlbXBsYXRlKTtcbiAgICAgICAgICAgIG1lbnUuaHRtbCgnJyk7XG5cbiAgICAgICAgICAgICQoJ1t0eXBlPVxcJ3dvcmstaXRlbVxcJ10nLCBfdGhpcykuZWFjaCgoaSwgZWwpID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgd2kgPSBuZXcgSW5kaXZpZHVhbE1vZGVsKCQoZWwpLmF0dHIoJ3dvcmstaXRlbS1pZCcpKTtcbiAgICAgICAgICAgICAgY29uc3QgJGl0ZW0gPSAkKCc8bGkvPicpLmFwcGVuZFRvKG1lbnUpO1xuICAgICAgICAgICAgICAkKCc8YS8+Jywge1xuICAgICAgICAgICAgICAgICd0ZXh0JzogKHdpLmhhc1ZhbHVlKCdyZGZzOmxhYmVsJyk/d2lbJ3JkZnM6bGFiZWwnXVswXTp3aS5pZCksXG4gICAgICAgICAgICAgICAgJ2hyZWYnOiAnIycsXG4gICAgICAgICAgICAgICAgJ2NsaWNrJzogKCh3b3JrSXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBwcm9wcy5lbXB0eSgpO1xuICAgICAgICAgICAgICAgICAgICAkKCcjd29ya2Zsb3ctY29udGV4dC1tZW51JywgdGVtcGxhdGUpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGluc3RhbmNlLmdldEFsbENvbm5lY3Rpb25zKCksIGZ1bmN0aW9uIChpZHgsIGNvbm5lY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvID0gY29ubmVjdGlvbi5nZXRPdmVybGF5KCdmbG93TGFiZWwnKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAobyAhPSB1bmRlZmluZWQpIG8uc2V0VmlzaWJsZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS5zaG93UHJvY2Vzc1J1blBhdGgod29ya0l0ZW0sIDApO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBob2xkZXIgPSAkKCc8ZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICB3b3JrSXRlbS5wcmVzZW50KGhvbGRlciwgJ3Ytd2Y6V29ya0l0ZW1UZW1wbGF0ZScpO1xuICAgICAgICAgICAgICAgICAgICBwcm9wcy5hcHBlbmQoaG9sZGVyKTtcbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSkod2kpLFxuICAgICAgICAgICAgICB9KS5hcHBlbmRUbygkaXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRjb250ZXh0TWVudS5jc3Moe1xuICAgICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgICAgICAgICBsZWZ0OiBlLnBhZ2VYLSgoZS5wYWdlWCskY29udGV4dE1lbnUud2lkdGgoKT4kKCBkb2N1bWVudCApLndpZHRoKCkpPyRjb250ZXh0TWVudS53aWR0aCgpOjApLFxuICAgICAgICAgICAgICB0b3A6IGUucGFnZVktKChlLnBhZ2VZKyRjb250ZXh0TWVudS5oZWlnaHQoKT4kKCBkb2N1bWVudCApLmhlaWdodCgpKT8kY29udGV4dE1lbnUuaGVpZ2h0KCk6MCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGlmIChhbHJlYWR5U2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuOyAvLyBkbyBub3RoaW5nIHdoZW4gY2xpY2sgb24gYWxyZWFkeSBzZWxlY3RlZCBlbGVtZW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkKCdbdHlwZT1cXCd3b3JrLWl0ZW1cXCddJywgX3RoaXMpLmVhY2goKGksIGVsKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHdpID0gbmV3IEluZGl2aWR1YWxNb2RlbCgkKGVsKS5hdHRyKCd3b3JrLWl0ZW0taWQnKSk7XG4gICAgICAgICAgICAgICQuZWFjaChpbnN0YW5jZS5nZXRBbGxDb25uZWN0aW9ucygpLCBmdW5jdGlvbiAoaWR4LCBjb25uZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbyA9IGNvbm5lY3Rpb24uZ2V0T3ZlcmxheSgnZmxvd0xhYmVsJyk7XG4gICAgICAgICAgICAgICAgaWYgKG8gIT0gdW5kZWZpbmVkKSBvLnNldFZpc2libGUoZmFsc2UpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgaW5zdGFuY2Uuc2hvd1Byb2Nlc3NSdW5QYXRoKHdpLCAwKTtcbiAgICAgICAgICAgICAgY29uc3QgaG9sZGVyID0gJCgnPGRpdj4nKTtcbiAgICAgICAgICAgICAgd2kucHJlc2VudChob2xkZXIsIG5ldyBJbmRpdmlkdWFsTW9kZWwoJ3Ytd2Y6V29ya0l0ZW1UZW1wbGF0ZScpKTtcbiAgICAgICAgICAgICAgcHJvcHMuYXBwZW5kKGhvbGRlcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAobW9kZT09J2VkaXQnKSB7XG4gICAgICAgIHdpbmRvd3MuYmluZCgnZGJsY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIGNvbnN0IF90aGlzID0gZS5kZWxlZ2F0ZVRhcmdldDtcbiAgICAgICAgICBCcm93c2VyVXRpbC5zaG93TW9kYWwobmV3IEluZGl2aWR1YWxNb2RlbCgkKF90aGlzKS5hdHRyKCdpZCcpKSwgJ3Ytd2Y6VGFza1RlbXBsYXRlQXNNb2RhbCcsICdlZGl0Jyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGluc3RhbmNlLmRyYWdnYWJsZSh3aW5kb3dzLCB7XG4gICAgICAgICAgZHJhZzogZnVuY3Rpb24gKGV2ZW50KSB7IC8vIGdldHMgY2FsbGVkIG9uIGV2ZXJ5IGRyYWdcbiAgICAgICAgICAgICQoJyN3b3JrZmxvdy1jb250ZXh0LW1lbnUnLCB0ZW1wbGF0ZSkuaGlkZSgpO1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gbmV3IEluZGl2aWR1YWxNb2RlbChldmVudC5lbC5pZCk7XG4gICAgICAgICAgICB0YXJnZXRbJ3Ytd2Y6bG9jYXRpb25YJ10gPSBbTWF0aC5yb3VuZChldmVudC5wb3NbMF0tY2FudmFzU2l6ZVB4LzIpXTtcbiAgICAgICAgICAgIHRhcmdldFsndi13Zjpsb2NhdGlvblknXSA9IFtNYXRoLnJvdW5kKGV2ZW50LnBvc1sxXS1jYW52YXNTaXplUHgvMildO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBJbml0aWFsaXplIGFsbCBTdGF0ZSBlbGVtZW50cyBhcyBDb25uZWN0aW9uIHNvdXJjZXMuXG4gICAgICBjb25zdCBwb3NzaWJsZUluQW5jaG9ycyA9IFtcbiAgICAgICAgWzAsIDAuMSwgLTEsIDBdLFxuICAgICAgICBbMCwgMC4zLCAtMSwgMF0sXG4gICAgICAgIFswLCAwLjUsIC0xLCAwXSxcbiAgICAgICAgWzAsIDAuNywgLTEsIDBdLFxuICAgICAgICBbMCwgMC45LCAtMSwgMF0sXG4gICAgICAgIFsxLCAwLjEsIDEsIDBdLFxuICAgICAgICBbMSwgMC4zLCAxLCAwXSxcbiAgICAgICAgWzEsIDAuNSwgMSwgMF0sXG4gICAgICAgIFsxLCAwLjcsIDEsIDBdLFxuICAgICAgICBbMSwgMC45LCAxLCAwXSxcbiAgICAgICAgWzAuMSwgMCwgMCwgLTFdLFxuICAgICAgICBbMC4zLCAwLCAwLCAtMV0sXG4gICAgICAgIFswLjUsIDAsIDAsIC0xXSxcbiAgICAgICAgWzAuNywgMCwgMCwgLTFdLFxuICAgICAgICBbMC45LCAwLCAwLCAtMV0sXG4gICAgICBdO1xuICAgICAgY29uc3QgcG9zc2libGVPdXRBbmNob3JzID0gW1xuICAgICAgICBbMCwgMC4yLCAtMSwgMF0sXG4gICAgICAgIFswLCAwLjQsIC0xLCAwXSxcbiAgICAgICAgWzAsIDAuNiwgLTEsIDBdLFxuICAgICAgICBbMCwgMC44LCAtMSwgMF0sXG4gICAgICAgIFsxLCAwLjIsIDEsIDBdLFxuICAgICAgICBbMSwgMC40LCAxLCAwXSxcbiAgICAgICAgWzEsIDAuNiwgMSwgMF0sXG4gICAgICAgIFsxLCAwLjgsIDEsIDBdLFxuICAgICAgICBbMC4yLCAwLCAwLCAtMV0sXG4gICAgICAgIFswLjQsIDAsIDAsIC0xXSxcbiAgICAgICAgWzAuNiwgMCwgMCwgLTFdLFxuICAgICAgICBbMC44LCAwLCAwLCAtMV0sXG4gICAgICBdO1xuICAgICAgaW5zdGFuY2UubWFrZVNvdXJjZSh3aW5kb3dzLCB7XG4gICAgICAgIGZpbHRlcjogJy5lcCcsXG4gICAgICAgIGFuY2hvcjogcG9zc2libGVPdXRBbmNob3JzLFxuICAgICAgICBkcmFnT3B0aW9uczoge1xuICAgICAgICAgIGlzU291cmNlOiBmYWxzZSxcbiAgICAgICAgICBpc1RhcmdldDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgY29ubmVjdG9yOiBbXG4gICAgICAgICAgJ1N0cmFpZ2h0Jywge1xuICAgICAgICAgICAgc3R1YjogMzAsXG4gICAgICAgICAgICBnYXA6IDAsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgcGFpbnRTdHlsZToge1xuICAgICAgICAgIHN0cm9rZVN0eWxlOiAnIzIyNTU4OCcsXG4gICAgICAgICAgZmlsbFN0eWxlOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICAgIHJhZGl1czogbW9kZT09J2VkaXQnPzQ6MSxcbiAgICAgICAgICBsaW5lV2lkdGg6IDEsXG4gICAgICAgIH0sXG4gICAgICAgIGNvbm5lY3RvclN0eWxlOiB7XG4gICAgICAgICAgc3Ryb2tlU3R5bGU6ICcjNjY2NjY2JyxcbiAgICAgICAgICBsaW5lV2lkdGg6IDEsXG4gICAgICAgICAgb3V0bGluZUNvbG9yOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICAgIG91dGxpbmVXaWR0aDogNCxcbiAgICAgICAgfSxcbiAgICAgICAgbWF4Q29ubmVjdGlvbnM6IDIwLFxuICAgICAgICBvbk1heENvbm5lY3Rpb25zOiBmdW5jdGlvbiAoaW5mbywgZSkge1xuICAgICAgICAgIGFsZXJ0KCdNYXhpbXVtIGNvbm5lY3Rpb25zICgnICsgaW5mby5tYXhDb25uZWN0aW9ucyArICcpIHJlYWNoZWQnKTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgICAvLyBJbml0aWFsaXplIGFsbCBTdGF0ZSBlbGVtZW50cyBhcyBjb25uZWN0aW9uIHRhcmdldHMuXG5cbiAgICAgIGluc3RhbmNlLm1ha2VUYXJnZXQod2luZG93cywge1xuICAgICAgICBkcm9wT3B0aW9uczoge1xuICAgICAgICAgIGlzU291cmNlOiB0cnVlLFxuICAgICAgICAgIGlzVGFyZ2V0OiBmYWxzZSxcbiAgICAgICAgICBob3ZlckNsYXNzOiAnZHJhZ0hvdmVyJyxcbiAgICAgICAgfSxcbiAgICAgICAgcmVhdHRhY2g6IHRydWUsXG4gICAgICAgIGFuY2hvcjogcG9zc2libGVJbkFuY2hvcnMsXG4gICAgICAgIHBhaW50U3R5bGU6IHtcbiAgICAgICAgICBzdHJva2VTdHlsZTogJyMyMjU1ODgnLFxuICAgICAgICAgIGZpbGxTdHlsZTogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgICByYWRpdXM6IG1vZGU9PSdlZGl0Jz80OjEsXG4gICAgICAgICAgbGluZVdpZHRoOiAxLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENoYW5nZSBjdXJyZW50IHNjYWxlLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzY2FsZSBuZXcgc2NhbGVcbiAgICAgKi9cbiAgICBpbnN0YW5jZS5jaGFuZ2VTY2FsZSA9IGZ1bmN0aW9uIChzY2FsZSkge1xuICAgICAgJCgnI3dvcmtmbG93LWNvbnRleHQtbWVudScsIHRlbXBsYXRlKS5oaWRlKCk7XG5cbiAgICAgIG5ldFsnY3VycmVudFNjYWxlJ10gPSBwYXJzZUZsb2F0KHNjYWxlKTtcbiAgICAgIHZlZGFbJ3dvcmtmbG93JytlbGVtZW50SWQrJy16b29tJ10gPSBuZXRbJ2N1cnJlbnRTY2FsZSddO1xuXG4gICAgICBpbnN0YW5jZS5zZXRab29tKG5ldFsnY3VycmVudFNjYWxlJ10pO1xuICAgICAgd2RhdGEuY3NzKHtcbiAgICAgICAgJy1tcy10cmFuc2Zvcm0nOiAnc2NhbGUoJytuZXRbJ2N1cnJlbnRTY2FsZSddKycsJytuZXRbJ2N1cnJlbnRTY2FsZSddKycpJywgLyogSUUgOSAqL1xuICAgICAgICAnLXdlYmtpdC10cmFuc2Zvcm0nOiAnc2NhbGUoJytuZXRbJ2N1cnJlbnRTY2FsZSddKycsJytuZXRbJ2N1cnJlbnRTY2FsZSddKycpJywgLyogQ2hyb21lLCBTYWZhcmksIE9wZXJhICovXG4gICAgICAgICd0cmFuc2Zvcm0nOiAnc2NhbGUoJytuZXRbJ2N1cnJlbnRTY2FsZSddKycsJytuZXRbJ2N1cnJlbnRTY2FsZSddKycpJyxcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZSBjc3MgY2xhc3MgZm9yIHN0YXRlIChzcGxpdC1beG9yLW9yLWFuZC1ub25lXSBvciBqb2luLVt4b3Itb3ItYW5kLW5vbmVdKVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzaiBgc3BsaXRgIG9yIGBqb2luYFxuICAgICAqIEBwYXJhbSB7SW5kaXZpZHVhbE1vZGVsfSBzdGF0ZSBzdGF0ZVxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gY3NzIGNsYXNzIG5hbWUgZm9yIHRoaXMgdHlwZSBvZiBzcGxpdC9qb2luXG4gICAgICovXG4gICAgaW5zdGFuY2UuZ2V0U3BsaXRKb2luVHlwZSA9IGZ1bmN0aW9uIChzaiwgc3RhdGUpIHtcbiAgICAgIGlmICghc3RhdGUuaGFzVmFsdWUoJ3Ytd2Y6JytzaikpIHtcbiAgICAgICAgcmV0dXJuICcgJytzaisnLW5vJztcbiAgICAgIH1cbiAgICAgIGNvbnN0IHR5cGUgPSBzdGF0ZVsndi13ZjonK3NqXVswXS5pZDtcbiAgICAgIGlmICh0eXBlID09PSBudWxsIHx8IHR5cGUgPT09IHVuZGVmaW5lZCB8fCB0eXBlID09PSAnJykge1xuICAgICAgICByZXR1cm4gJyAnK3NqKyctbm8nO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZSA9PSAndi13ZjpYT1InKSByZXR1cm4gJyAnK3NqKycteG9yJztcbiAgICAgIGlmICh0eXBlID09ICd2LXdmOk9SJykgcmV0dXJuICcgJytzaisnLW9yJztcbiAgICAgIGlmICh0eXBlID09ICd2LXdmOkFORCcpIHJldHVybiAnICcrc2orJy1hbmQnO1xuICAgICAgaWYgKHR5cGUgPT0gJ3Ytd2Y6Tk9ORScpIHJldHVybiAnICcrc2orJy1ub25lJztcblxuICAgICAgcmV0dXJuICcgJytzaisnLW5vJztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQXBwbHkgc3RhdGUgdG8gY2FudmFzXG4gICAgICogQHBhcmFtIHtJbmRpdmlkdWFsTW9kZWx9IHN0YXRlXG4gICAgICovXG4gICAgaW5zdGFuY2UuY3JlYXRlU3RhdGUgPSBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgIGlmICghc3RhdGUuaGFzVmFsdWUoJ3JkZjp0eXBlJykpIHJldHVybjtcbiAgICAgIGNvbnN0IHR5cGUgPSBzdGF0ZVsncmRmOnR5cGUnXVswXS5pZDtcbiAgICAgIGxldCBzdGF0ZUVsZW1lbnQgPSAnJztcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAndi13ZjpJbnB1dENvbmRpdGlvbic6XG4gICAgICAgIHN0YXRlRWxlbWVudCA9ICc8ZGl2IGNsYXNzPVwidyBzdGF0ZS1pby1jb25kaXRpb24gc3RhdGUtaW8tY29uZGl0aW9uLWlucHV0XCIgJyArXG4gICAgICAgICAgICAnaWQ9XCInICsgc3RhdGUuaWQgKyAnXCIgJyArXG4gICAgICAgICAgICAnc3R5bGU9XCJmb250LXNpemU6MjBweDtwYWRkaW5nLXRvcDoxMHB4OycrXG4gICAgICAgICAgICAnbGVmdDonICsgKGNhbnZhc1NpemVQeC8yK3N0YXRlWyd2LXdmOmxvY2F0aW9uWCddWzBdKSArICdweDsnICtcbiAgICAgICAgICAgICd0b3A6JyArIChjYW52YXNTaXplUHgvMitzdGF0ZVsndi13Zjpsb2NhdGlvblknXVswXSkgKyAncHg7XCI+JyArXG4gICAgICAgICAgICAnPGRpdj48c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tcGxheVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvZGl2PicgK1xuICAgICAgICAgICAgKG1vZGU9PSdlZGl0Jz8nPGRpdiBjbGFzcz1cImVwXCI+JzonJykrJzwvZGl2PjwvZGl2Pic7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndi13ZjpPdXRwdXRDb25kaXRpb24nOlxuICAgICAgICBzdGF0ZUVsZW1lbnQgPSAnPGRpdiBjbGFzcz1cIncgc3RhdGUtaW8tY29uZGl0aW9uIHN0YXRlLWlvLWNvbmRpdGlvbi1vdXRwdXRcIiAnICtcbiAgICAgICAgICAgICdpZD1cIicgKyBzdGF0ZS5pZCArICdcIiAnICtcbiAgICAgICAgICAgICdzdHlsZT1cImZvbnQtc2l6ZToyMHB4O3BhZGRpbmctdG9wOjEwcHg7JyArXG4gICAgICAgICAgICAnbGVmdDonICsgKGNhbnZhc1NpemVQeC8yK3N0YXRlWyd2LXdmOmxvY2F0aW9uWCddWzBdKSArICdweDsnICtcbiAgICAgICAgICAgICd0b3A6ICcgKyAoY2FudmFzU2l6ZVB4LzIrc3RhdGVbJ3Ytd2Y6bG9jYXRpb25ZJ11bMF0pICsgJ3B4O1wiPicgK1xuICAgICAgICAgICAgJzxkaXY+PHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXN0b3BcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2Rpdj48L2Rpdj4nO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3Ytd2Y6Q29uZGl0aW9uJzpcbiAgICAgICAgc3RhdGVFbGVtZW50ID0gJzxkaXYgY2xhc3M9XCJ3IHN0YXRlLWNvbmRpdGlvblwiICcgK1xuICAgICAgICAgICAgJ2lkPVwiJyArIHN0YXRlLmlkICsgJ1wiICcgK1xuICAgICAgICAgICAgJ3N0eWxlPVwibGVmdDonICsgKGNhbnZhc1NpemVQeC8yK3N0YXRlWyd2LXdmOmxvY2F0aW9uWCddWzBdKSArICdweDsnICtcbiAgICAgICAgICAgICd0b3A6JyArIChjYW52YXNTaXplUHgvMitzdGF0ZVsndi13Zjpsb2NhdGlvblknXVswXSkgKyAncHg7XCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cInN0YXRlLW5hbWUgY29uZGl0aW9uLW5hbWVcIj4nICsgc3RhdGVbJ3JkZnM6bGFiZWwnXVswXSArICc8L2Rpdj4nICtcbiAgICAgICAgICAgIChtb2RlPT0nZWRpdCc/JzxkaXYgY2xhc3M9XCJlcFwiPic6JycpKyc8L2Rpdj48L2Rpdj4nO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3Ytd2Y6VGFzayc6XG4gICAgICAgIHN0YXRlRWxlbWVudCA9ICc8ZGl2IGNsYXNzPVwidyBzdGF0ZS10YXNrIHNwbGl0LWpvaW4gJyArXG4gICAgICAgICAgICBpbnN0YW5jZS5nZXRTcGxpdEpvaW5UeXBlKCdzcGxpdCcsIHN0YXRlKSArXG4gICAgICAgICAgICBpbnN0YW5jZS5nZXRTcGxpdEpvaW5UeXBlKCdqb2luJywgc3RhdGUpICsgJ1wiICcrXG4gICAgICAgICAgICAnaWQ9XCInICsgc3RhdGUuaWQgKyAnXCIgJyArXG4gICAgICAgICAgICAnc3R5bGU9XCJsZWZ0OicgKyAoY2FudmFzU2l6ZVB4LzIrc3RhdGVbJ3Ytd2Y6bG9jYXRpb25YJ11bMF0pICsgJ3B4OyAnICtcbiAgICAgICAgICAgICd0b3A6ICcgKyAoY2FudmFzU2l6ZVB4LzIrc3RhdGVbJ3Ytd2Y6bG9jYXRpb25ZJ11bMF0pICsgJ3B4O1wiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJzdGF0ZS1uYW1lXCI+JyArIHN0YXRlWydyZGZzOmxhYmVsJ11bMF0gKyAnPC9kaXY+JyArXG4gICAgICAgICAgICAobW9kZT09J2VkaXQnPyc8ZGl2IGNsYXNzPVwiZXBcIj4nOicnKSsnPC9kaXY+PC9kaXY+JztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoc3RhdGVFbGVtZW50IT09JycpIHtcbiAgICAgICAgd2RhdGEuYXBwZW5kKHN0YXRlRWxlbWVudCk7XG4gICAgICAgIGNvbnN0ICRzdGF0ZSA9ICQoJyMnICsgQnJvd3NlclV0aWwuZXNjYXBlNCQoc3RhdGUuaWQpLCB0ZW1wbGF0ZSk7XG4gICAgICAgIGJpbmRTdGF0ZUV2ZW50cygkc3RhdGUpO1xuICAgICAgICBpZiAobW9kZT09J2VkaXQnKSBzdWJOZXRWaWV3QnV0dG9uKHN0YXRlLCAkc3RhdGUpO1xuICAgICAgICBleGVjdXRvck1hcmsoc3RhdGUsICRzdGF0ZSk7XG4gICAgICAgIGluc3RhbmNlLnVwZGF0ZVNWR0JhY2tncm91bmQoJHN0YXRlKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaW5zdGFuY2UuZGVsZXRlU3RhdGUgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgaW5zdGFuY2UuZGV0YWNoQWxsQ29ubmVjdGlvbnMoZWxlbWVudCk7XG4gICAgICBpbnN0YW5jZS5yZW1vdmUoZWxlbWVudCk7XG4gICAgICBuZXRbJ3Ytd2Y6Y29uc2lzdHNPZiddID0gcmVtb3ZlU3ViSW5kaXZpZHVhbChuZXQsICd2LXdmOmNvbnNpc3RzT2YnLCBlbGVtZW50LmlkKTtcbiAgICAgIG5ldFsndi13Zjpjb25zaXN0c09mJ10uZm9yRWFjaCgoc3RhdGUpID0+IHtcbiAgICAgICAgaWYgKHN0YXRlLmhhc1ZhbHVlKCd2LXdmOmhhc0Zsb3cnKSkge1xuICAgICAgICAgIHN0YXRlWyd2LXdmOmhhc0Zsb3cnXS5mb3JFYWNoKChmbG93KSA9PiB7XG4gICAgICAgICAgICBpZiAoZmxvdy5oYXNWYWx1ZSgndi13ZjpmbG93c0ludG8nKSAmJiBmbG93Wyd2LXdmOmZsb3dzSW50byddWzBdLmlkID09IGVsZW1lbnQuaWQpIHtcbiAgICAgICAgICAgICAgaW5zdGFuY2UuZGVsZXRlRmxvdyhmbG93LCBzdGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBpbnN0YW5jZS5jcmVhdGVGbG93ID0gZnVuY3Rpb24gKHN0YXRlLCBmbG93KSB7XG4gICAgICBmbG93LmxvYWQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgY29uc3QgY29ubmVjdG9yID0gaW5zdGFuY2UuY29ubmVjdCh7XG4gICAgICAgICAgc291cmNlOiBzdGF0ZS5pZCxcbiAgICAgICAgICB0YXJnZXQ6IGZsb3dbJ3Ytd2Y6Zmxvd3NJbnRvJ11bMF0uaWQsXG4gICAgICAgICAgZGV0YWNoYWJsZTogKG1vZGU9PSdlZGl0JyksXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZmxvdy5oYXNWYWx1ZSgncmRmczpsYWJlbCcpKSB7XG4gICAgICAgICAgY29ubmVjdG9yLmFkZE92ZXJsYXkoWydMYWJlbCcsIHtsYWJlbDogZmxvd1sncmRmczpsYWJlbCddWzBdLCBsb2NhdGlvbjogMC41LCBpZDogJ2Zsb3dMYWJlbCd9XSk7XG4gICAgICAgIH1cbiAgICAgICAgY29ubmVjdG9yLnNldERhdGEoZmxvdy5pZCk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgaW5zdGFuY2UuZGVsZXRlRmxvdyA9IGZ1bmN0aW9uIChmbG93LCBzb3VyY2UpIHtcbiAgICAgIGluc3RhbmNlLmRldGFjaChmbG93LCB7ZmlyZUV2ZW50OiBmYWxzZSwgZm9yY2VEZXRhY2g6IHRydWV9KTtcbiAgICAgIG5ldFsndi13Zjpjb25zaXN0c09mJ10gPSByZW1vdmVTdWJJbmRpdmlkdWFsKG5ldCwgJ3Ytd2Y6Y29uc2lzdHNPZicsIGZsb3cuaWQpO1xuICAgICAgY29uc3Qgc291cmNlSW5kaXZpZHVhbCA9IG5ldyBJbmRpdmlkdWFsTW9kZWwoc291cmNlLmlkKTtcbiAgICAgIHNvdXJjZUluZGl2aWR1YWxbJ3Ytd2Y6aGFzRmxvdyddID0gcmVtb3ZlU3ViSW5kaXZpZHVhbChzb3VyY2VJbmRpdmlkdWFsLCAndi13ZjpoYXNGbG93JywgZmxvdy5pZCk7XG4gICAgfTtcblxuICAgIGluc3RhbmNlLmNyZWF0ZUVtcHR5TmV0RWxlbWVudCA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICBjb25zdCBpbmRpdmlkdWFsID0gbmV3IEluZGl2aWR1YWxNb2RlbCgpO1xuXG4gICAgICBpbmRpdmlkdWFsWydyZGZzOmxhYmVsJ10gPSBbJycsICcnXTtcbiAgICAgIGluZGl2aWR1YWxbJ3Ytd2Y6bG9jYXRpb25YJ10gPSBbKC1jYW52YXNTaXplUHgvMi1uZXRbJ29mZnNldFgnXSkvbmV0WydjdXJyZW50U2NhbGUnXV07XG4gICAgICBpbmRpdmlkdWFsWyd2LXdmOmxvY2F0aW9uWSddID0gWygtY2FudmFzU2l6ZVB4LzItbmV0WydvZmZzZXRZJ10pL25ldFsnY3VycmVudFNjYWxlJ11dO1xuXG4gICAgICBpZiAodHlwZT09J2NvbmRpdGlvbicpIHtcbiAgICAgICAgaW5kaXZpZHVhbFsncmRmOnR5cGUnXSA9IFtuZXcgSW5kaXZpZHVhbE1vZGVsKCd2LXdmOkNvbmRpdGlvbicpXTtcbiAgICAgICAgaW5zdGFuY2UuY3JlYXRlU3RhdGUoaW5kaXZpZHVhbCk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGU9PSd0YXNrJykge1xuICAgICAgICBpbmRpdmlkdWFsWydyZGY6dHlwZSddID0gW25ldyBJbmRpdmlkdWFsTW9kZWwoJ3Ytd2Y6VGFzaycpXTtcbiAgICAgICAgaW5zdGFuY2UuY3JlYXRlU3RhdGUoaW5kaXZpZHVhbCk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGU9PSdpbnB1dCcpIHtcbiAgICAgICAgaW5kaXZpZHVhbFsncmRmOnR5cGUnXSA9IFtuZXcgSW5kaXZpZHVhbE1vZGVsKCd2LXdmOklucHV0Q29uZGl0aW9uJyldO1xuICAgICAgICBpbnN0YW5jZS5jcmVhdGVTdGF0ZShpbmRpdmlkdWFsKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZT09J291dHB1dCcpIHtcbiAgICAgICAgaW5kaXZpZHVhbFsndi13Zjpsb2NhdGlvblgnXSA9IFtpbmRpdmlkdWFsWyd2LXdmOmxvY2F0aW9uWCddWzBdKzIwMF07XG4gICAgICAgIGluZGl2aWR1YWxbJ3JkZjp0eXBlJ10gPSBbbmV3IEluZGl2aWR1YWxNb2RlbCgndi13ZjpPdXRwdXRDb25kaXRpb24nKV07XG4gICAgICAgIGluc3RhbmNlLmNyZWF0ZVN0YXRlKGluZGl2aWR1YWwpO1xuICAgICAgfVxuICAgICAgbmV0Wyd2LXdmOmNvbnNpc3RzT2YnXSA9IG5ldFsndi13Zjpjb25zaXN0c09mJ10gPT09IHVuZGVmaW5lZCA/IFtpbmRpdmlkdWFsXSA6IG5ldFsndi13Zjpjb25zaXN0c09mJ10uY29uY2F0KGluZGl2aWR1YWwpO1xuICAgICAgcmV0dXJuIGluZGl2aWR1YWw7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSB3b3JrZmxvdyBOZXQgYnkgZ2l2ZW4gT2JqZWN0ICh2LXdmOk5ldCBpbmRpdmlkdWFsKS5cbiAgICAgKiBAcGFyYW0ge0luZGl2aWR1YWxNb2RlbH0gbmV0XG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBpbnN0YW5jZS5jcmVhdGVOZXRWaWV3ID0gZnVuY3Rpb24gKG5ldCkge1xuICAgICAgcmV0dXJuIG5ldC5wcmVmZXRjaChJbmZpbml0eSwgJ3Ytd2Y6Y29uc2lzdHNPZicsICd2LXdmOmhhc0Zsb3cnKVxuICAgICAgICAudGhlbigobmV0RWxlbWVudHMpID0+IHtcbiAgICAgICAgICAkKCcjd29ya2Zsb3ctbmV0LW5hbWUnLCB0ZW1wbGF0ZSkudGV4dChuZXRbJ3JkZnM6bGFiZWwnXVswXSk7XG4gICAgICAgICAgbmV0RWxlbWVudHMuc2hpZnQoKTtcbiAgICAgICAgICAvLyBDcmVhdGUgc3RhdGVzXG4gICAgICAgICAgbGV0IGhhc0lucHV0ID0gZmFsc2U7XG4gICAgICAgICAgbGV0IGhhc091dHB1dCA9IGZhbHNlO1xuICAgICAgICAgIG5ldEVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGlmICggZWxlbWVudC5oYXNWYWx1ZSgncmRmOnR5cGUnLCAndi13ZjpUYXNrJykgfHwgZWxlbWVudC5oYXNWYWx1ZSgncmRmOnR5cGUnLCAndi13ZjpDb25kaXRpb24nKSB8fCBlbGVtZW50Lmhhc1ZhbHVlKCdyZGY6dHlwZScsICd2LXdmOklucHV0Q29uZGl0aW9uJykgfHwgZWxlbWVudC5oYXNWYWx1ZSgncmRmOnR5cGUnLCAndi13ZjpPdXRwdXRDb25kaXRpb24nKSApIHtcbiAgICAgICAgICAgICAgaW5zdGFuY2UuY3JlYXRlU3RhdGUoZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBoYXNJbnB1dCA9IGhhc0lucHV0IHx8IGVsZW1lbnQuaGFzVmFsdWUoJ3JkZjp0eXBlJywgJ3Ytd2Y6SW5wdXRDb25kaXRpb24nKTtcbiAgICAgICAgICAgIGhhc091dHB1dCA9IGhhc091dHB1dCB8fCBlbGVtZW50Lmhhc1ZhbHVlKCdyZGY6dHlwZScsICd2LXdmOk91dHB1dENvbmRpdGlvbicpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8vIEZvciBlbXB0eSBuZXRcbiAgICAgICAgICBpZiAoIWhhc0lucHV0KSB7XG4gICAgICAgICAgICBpbnN0YW5jZS5jcmVhdGVFbXB0eU5ldEVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghaGFzT3V0cHV0KSB7XG4gICAgICAgICAgICBpbnN0YW5jZS5jcmVhdGVFbXB0eU5ldEVsZW1lbnQoJ291dHB1dCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBuZXRFbGVtZW50cy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoIGVsZW1lbnQuaGFzVmFsdWUoJ3Ytd2Y6aGFzRmxvdycpICkge1xuICAgICAgICAgICAgICBlbGVtZW50Wyd2LXdmOmhhc0Zsb3cnXS5mb3JFYWNoKChmbG93KSA9PiB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuY3JlYXRlRmxvdyhlbGVtZW50LCBmbG93KTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKlxuICAgICAqIE9wdGltaXplIHZpZXcgb2YgbmV0OiBhbGwgZWxlbWVudHMgbXVzdCBiZSB2aXNpYmxlIGFuZCBmaXQgc2NyZWVuICh0aHJvdWdoIGNoYW5nZSBzY2FsZSBhbmQgcG9zaXRpb24gb2YgY2FudmFzKVxuICAgICAqIEByZXR1cm5zXG4gICAgICovXG4gICAgaW5zdGFuY2Uub3B0aW1pemVWaWV3ID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCFuZXQuaGFzVmFsdWUoJ3Ytd2Y6Y29uc2lzdHNPZicpKSByZXR1cm47XG4gICAgICBsZXQgbWlueDsgbGV0IG1heHg7IGxldCBtaW55OyBsZXQgbWF4eTsgbGV0IHNjYWxlO1xuICAgICAgbGV0IG9mZnNldFggPSAwOyBsZXQgb2Zmc2V0WSA9IDA7XG4gICAgICAvLyByZWFkIHJhbmdlc1xuICAgICAgbmV0Wyd2LXdmOmNvbnNpc3RzT2YnXS5mb3JFYWNoKChzdGF0ZSkgPT4ge1xuICAgICAgICBpZiAoc3RhdGUuaGFzVmFsdWUoJ3Ytd2Y6bG9jYXRpb25YJykpIHtcbiAgICAgICAgICBpZiAobWF4eCA9PT0gdW5kZWZpbmVkIHx8IHN0YXRlWyd2LXdmOmxvY2F0aW9uWCddWzBdPm1heHgpIG1heHggPSBzdGF0ZVsndi13Zjpsb2NhdGlvblgnXVswXTtcbiAgICAgICAgICBpZiAobWlueCA9PT0gdW5kZWZpbmVkIHx8IHN0YXRlWyd2LXdmOmxvY2F0aW9uWCddWzBdPG1pbngpIG1pbnggPSBzdGF0ZVsndi13Zjpsb2NhdGlvblgnXVswXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhdGUuaGFzVmFsdWUoJ3Ytd2Y6bG9jYXRpb25ZJykpIHtcbiAgICAgICAgICBpZiAobWF4eSA9PT0gdW5kZWZpbmVkIHx8IHN0YXRlWyd2LXdmOmxvY2F0aW9uWSddWzBdPm1heHkpIG1heHkgPSBzdGF0ZVsndi13Zjpsb2NhdGlvblknXVswXTtcbiAgICAgICAgICBpZiAobWlueSA9PT0gdW5kZWZpbmVkIHx8IHN0YXRlWyd2LXdmOmxvY2F0aW9uWSddWzBdPG1pbnkpIG1pbnkgPSBzdGF0ZVsndi13Zjpsb2NhdGlvblknXVswXTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIG1pbnktPTI1O1xuICAgICAgbWlueC09MjU7XG4gICAgICBtYXh4Kz0xMDA7XG4gICAgICBtYXh5Kz0xMDA7XG5cbiAgICAgIC8vIHJlYWQgdmlld3BvcnQgZGl2XG4gICAgICAkKCcud29ya2Zsb3ctY2FudmFzLXdyYXBwZXInLCB0ZW1wbGF0ZSkuZWFjaCgoaSwgZWwpID0+IHtcbiAgICAgICAgY29uc3Qgc2NhbGVYID0gZWwuY2xpZW50V2lkdGgvKG1heHgtbWlueCk7XG4gICAgICAgIGNvbnN0IHNjYWxlWSA9IGVsLmNsaWVudEhlaWdodC8obWF4eS1taW55KTtcbiAgICAgICAgc2NhbGUgPSBNYXRoLm1pbihzY2FsZVgsIHNjYWxlWSk7XG4gICAgICAgIGlmIChzY2FsZVg+c2NhbGVZKSB7XG4gICAgICAgICAgb2Zmc2V0WCA9IChlbC5jbGllbnRXaWR0aCAtIChtYXh4LW1pbngpKnNjYWxlKSAvMjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvZmZzZXRZID0gKGVsLmNsaWVudEhlaWdodCAtIChtYXh5LW1pbnkpKnNjYWxlKSAvMjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpbnN0YW5jZS5jaGFuZ2VTY2FsZShzY2FsZSk7XG4gICAgICBpbnN0YW5jZS5tb3ZlQ2FudmFzKC1taW54KnNjYWxlK29mZnNldFgtY2FudmFzU2l6ZVB4LzIsIC1taW55KnNjYWxlK29mZnNldFktY2FudmFzU2l6ZVB4LzIpO1xuICAgIH07XG5cbiAgICBpbnN0YW5jZS5kZWZvY3VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcHJvcHMuZW1wdHkoKTtcbiAgICAgIGluc3RhbmNlLmNsZWFyRHJhZ0xpc3QoKTtcbiAgICAgICQoJy5qc3BsdW1iLWRyYWctc2VsZWN0ZWQnLCB0ZW1wbGF0ZSkucmVtb3ZlQ2xhc3MoJ2pzcGx1bWItZHJhZy1zZWxlY3RlZCcpO1xuICAgICAgJCgnI3dvcmtmbG93LWNvbnRleHQtbWVudScsIHRlbXBsYXRlKS5oaWRlKCk7XG4gICAgICAkLmVhY2goaW5zdGFuY2UuZ2V0QWxsQ29ubmVjdGlvbnMoKSwgZnVuY3Rpb24gKGlkeCwgY29ubmVjdGlvbikge1xuICAgICAgICBjb25uZWN0aW9uLnJlbW92ZUNsYXNzKCdwcm9jZXNzLXBhdGgtaGlnaGxpZ2h0Jyk7XG4gICAgICAgIGNvbm5lY3Rpb24ucmVtb3ZlT3ZlcmxheSgncGF0aENvdW50ZXInKTtcbiAgICAgICAgY29uc3QgbyA9IGNvbm5lY3Rpb24uZ2V0T3ZlcmxheSgnZmxvd0xhYmVsJyk7XG4gICAgICAgIGlmIChvICE9IHVuZGVmaW5lZCkgby5zZXRWaXNpYmxlKHRydWUpO1xuICAgICAgfSk7XG4gICAgICAkKCcjJytCcm93c2VyVXRpbC5lc2NhcGU0JChzZWxlY3RlZEVsZW1lbnRJZCksIHRlbXBsYXRlKS5yZW1vdmVDbGFzcygnd19hY3RpdmUnKTtcbiAgICAgIGlmIChzZWxlY3RlZEVsZW1lbnRTb3VyY2VJZCE9bnVsbCkge1xuICAgICAgICBpbnN0YW5jZS5zZWxlY3Qoe3NvdXJjZTogc2VsZWN0ZWRFbGVtZW50U291cmNlSWR9KS5lYWNoKChlKSA9PiB7XG4gICAgICAgICAgZS5zZXRQYWludFN0eWxlKHtzdHJva2VTdHlsZTogJyM2NjY2NjYnfSk7XG4gICAgICAgICAgZS5yZW1vdmVPdmVybGF5KCdjb25uTGFiZWwnKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBzZWxlY3RlZEVsZW1lbnRJZCA9IG51bGw7XG4gICAgICBzZWxlY3RlZEVsZW1lbnRUeXBlID0gbnVsbDtcbiAgICAgIHNlbGVjdGVkRWxlbWVudFNvdXJjZUlkID0gbnVsbDtcbiAgICB9O1xuXG4gICAgaW5zdGFuY2UubG9hZFByb2Nlc3NXb3JrSXRlbXMgPSBmdW5jdGlvbiAocHJvY2VzczEpIHtcbiAgICAgIHJldHVybiBwcm9jZXNzMS5wcmVmZXRjaChJbmZpbml0eSwgJ3Ytd2Y6d29ya0l0ZW1MaXN0Jyk7XG4gICAgfTtcblxuICAgIGluc3RhbmNlLmNyZWF0ZVByb2Nlc3NWaWV3ID0gZnVuY3Rpb24gKHByb2Nlc3MxKSB7XG4gICAgICAvLyBBcHBseSBXb3JrSXRlbXMgdG8gTmV0XG4gICAgICBpbnN0YW5jZS5sb2FkUHJvY2Vzc1dvcmtJdGVtcyhwcm9jZXNzMSkudGhlbigod2lzKSA9PiB7XG4gICAgICAgIHdpcyA9IHdpcy5zbGljZSgxKTtcbiAgICAgICAgJCgnLncnLCB0ZW1wbGF0ZSkuZWFjaCgoaW5kZXgsIGVsKSA9PiB7XG4gICAgICAgICAgJCgnc3BhbicsIGVsKS50ZXh0KCcnKTtcbiAgICAgICAgICAkKCBlbCApLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICd3aGl0ZScpLmF0dHIoJ3dvcmstaXRlbXMtY291bnQnLCAwKS5hdHRyKCdjb2xvcmVkLXRvJywgJycpO1xuICAgICAgICB9KTtcblxuICAgICAgICB3aXMuZm9yRWFjaCgod2kpID0+IHtcbiAgICAgICAgICBpZiAod2kuaGFzVmFsdWUoJ3Ytd2Y6Zm9yTmV0RWxlbWVudCcpKSB7XG4gICAgICAgICAgICBjb25zdCBzdGF0ZSA9ICQoJyMnK0Jyb3dzZXJVdGlsLmVzY2FwZTQkKHdpWyd2LXdmOmZvck5ldEVsZW1lbnQnXVswXS5pZCksIHRlbXBsYXRlKTtcbiAgICAgICAgICAgIGlmICgkKHN0YXRlKS5maW5kKCdbd29yay1pdGVtLWlkPVwiJytCcm93c2VyVXRpbC5lc2NhcGU0JCh3aS5pZCkrJ1wiXScpLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICQoJzxzcGFuLz4nLCB7XG4gICAgICAgICAgICAgICAgJ3R5cGUnOiAnd29yay1pdGVtJyxcbiAgICAgICAgICAgICAgICAnd29yay1pdGVtLWlkJzogd2kuaWQsXG4gICAgICAgICAgICAgIH0pLmFwcGVuZFRvKHN0YXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHdpYyA9IHBhcnNlSW50KHN0YXRlLmF0dHIoJ3dvcmstaXRlbXMtY291bnQnKSk7XG4gICAgICAgICAgICBjb25zdCByZWQgPSBzdGF0ZS5hdHRyKCdjb2xvcmVkLXRvJyk9PSdyZWQnO1xuICAgICAgICAgICAgaWYgKHdpYz4wKSB7XG4gICAgICAgICAgICAgIHN0YXRlLmF0dHIoJ3dvcmstaXRlbXMtY291bnQnLCB3aWMrMSk7XG4gICAgICAgICAgICAgICQoJy5jb3VudGVyJywgc3RhdGUpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAkKCc8c3Bhbi8+Jywge1xuICAgICAgICAgICAgICAgICdjbGFzcyc6ICdjb3VudGVyJyxcbiAgICAgICAgICAgICAgICAndGV4dCc6ICd4Jysod2ljKzEpLFxuICAgICAgICAgICAgICB9KS5hcHBlbmRUbyhzdGF0ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzdGF0ZS5hdHRyKCd3b3JrLWl0ZW1zLWNvdW50JywgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXdpLmhhc1ZhbHVlKCd2LXdmOndvcmtPcmRlckxpc3QnKSkge1xuICAgICAgICAgICAgICBzdGF0ZS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAnI0ZGMzMzMycpO1xuICAgICAgICAgICAgICBzdGF0ZS5hdHRyKCdjb2xvcmVkLXRvJywgJ3JlZCcpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh3aS5oYXNWYWx1ZSgndi13Zjppc0NvbXBsZXRlZCcpICYmIHdpWyd2LXdmOmlzQ29tcGxldGVkJ11bMF0gJiYgIXJlZCkge1xuICAgICAgICAgICAgICBzdGF0ZS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAnIzg4QjI4OCcpO1xuICAgICAgICAgICAgICBzdGF0ZS5hdHRyKCdjb2xvcmVkLXRvJywgJ2dyZWVuJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFyZWQpIHtcbiAgICAgICAgICAgICAgc3RhdGUuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJyNGRkIyNjYnKTtcbiAgICAgICAgICAgICAgc3RhdGUuYXR0cignY29sb3JlZC10bycsICdyZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGxldCAkY29udGV4dE1lbnU7XG4gICAgaW5zdGFuY2UuY3JlYXRlTmV0VmlldyhuZXQpLnRoZW4oKCkgPT4ge1xuICAgICAgaWYgKG5ldFsnY3VycmVudFNjYWxlJ109PTEuMCkge1xuICAgICAgICBpbnN0YW5jZS5vcHRpbWl6ZVZpZXcoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluc3RhbmNlLmNoYW5nZVNjYWxlKG5ldFsnY3VycmVudFNjYWxlJ10pO1xuICAgICAgfVxuXG4gICAgICBpZiAobW9kZT09J3ZpZXcnKSB7XG4gICAgICAgIGluc3RhbmNlLmNyZWF0ZVByb2Nlc3NWaWV3KHByb2Nlc3MpO1xuICAgICAgfVxuXG4gICAgICAkKCcjJytCcm93c2VyVXRpbC5lc2NhcGU0JCh2ZWRhWyd3b3JrZmxvdycrZWxlbWVudElkKyctc2VsZWN0ZWRFbGVtZW50J10pLCB0ZW1wbGF0ZSkudHJpZ2dlcignY2xpY2snKTtcblxuICAgICAgLyogQ09OVEVYVCBNRU5VIFtCRUdJTl0gKi9cbiAgICAgICRjb250ZXh0TWVudSA9ICQoJyN3b3JrZmxvdy1jb250ZXh0LW1lbnUnLCB0ZW1wbGF0ZSk7XG4gICAgICAvKiBDT05URVhUIE1FTlUgW0VORF0qL1xuXG4gICAgICAvKiBORVQgTUVOVSBbQkVHSU5dICovXG4gICAgICAkKCcjd29ya2Zsb3ctc2F2ZS1idXR0b24nLCB0ZW1wbGF0ZSkub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBuZXQuc2F2ZUFsbCgpO1xuICAgICAgfSk7XG5cbiAgICAgICQoJyN3b3JrZmxvdy1leHBvcnQtdHRsJywgdGVtcGxhdGUpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgbGlzdCA9IFtuZXRdLmNvbmNhdChuZXRbJ3Ytd2Y6Y29uc2lzdHNPZiddKTtcbiAgICAgICAgY29sbGVjdEVudGl0aWVzKG5ldCwgbGlzdCk7XG4gICAgICAgIEJyb3dzZXJVdGlsLmV4cG9ydFRUTChsaXN0KTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBBZGQgbmV3IFN0YXRlIGV2ZW50LlxuICAgICAgJCgnLmNyZWF0ZS1zdGF0ZScsIHRlbXBsYXRlKS5iaW5kKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGNvbnN0IF90aGlzID0gZS5kZWxlZ2F0ZVRhcmdldDtcbiAgICAgICAgY29uc3QgaW5kaXZpZHVhbCA9IGluc3RhbmNlLmNyZWF0ZUVtcHR5TmV0RWxlbWVudCgkKF90aGlzKS5oYXNDbGFzcygnY3JlYXRlLWNvbmRpdGlvbicpID8gJ2NvbmRpdGlvbicgOiAndGFzaycpO1xuICAgICAgICAkKCcjJyArIEJyb3dzZXJVdGlsLmVzY2FwZTQkKGluZGl2aWR1YWwuaWQpLCB0ZW1wbGF0ZSkuY2xpY2soKTtcbiAgICAgICAgJChfdGhpcykuYmx1cigpO1xuICAgICAgfSk7XG5cbiAgICAgICQoJy5kZWxldGUtc3RhdGUnLCB0ZW1wbGF0ZSkub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoZHJhZ0xpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGRyYWdMaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGluc3RhbmNlLmRlbGV0ZVN0YXRlKGluc3RhbmNlLmdldFNlbGVjdG9yKCcjJytCcm93c2VyVXRpbC5lc2NhcGU0JChpdGVtLmF0dHIoJ2lkJykpKVswXSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRFbGVtZW50VHlwZSA9PSAnc3RhdGUnKSB7XG4gICAgICAgICAgaWYgKGNvbmZpcm0oJ0RlbGV0ZSBzdGF0ZSAnICsgc2VsZWN0ZWRFbGVtZW50SWQgKyAnID8nKSkge1xuICAgICAgICAgICAgaW5zdGFuY2UuZGVsZXRlU3RhdGUoaW5zdGFuY2UuZ2V0U2VsZWN0b3IoJyMnK0Jyb3dzZXJVdGlsLmVzY2FwZTQkKHNlbGVjdGVkRWxlbWVudElkKSlbMF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChzZWxlY3RlZEVsZW1lbnRUeXBlID09ICdmbG93Jykge1xuICAgICAgICAgIGlmIChjb25maXJtKCdEZWxldGUgZmxvdyAnICsgc2VsZWN0ZWRFbGVtZW50SWQgKyAnID8nKSkge1xuICAgICAgICAgICAgaW5zdGFuY2UuZ2V0Q29ubmVjdGlvbnMoe1xuICAgICAgICAgICAgICBzb3VyY2U6IHNlbGVjdGVkRWxlbWVudFNvdXJjZUlkLFxuICAgICAgICAgICAgfSkuZm9yRWFjaCgoY29ubmVjdGlvbikgPT4ge1xuICAgICAgICAgICAgICBpZiAoY29ubmVjdGlvbi5pZCA9PSBzZWxlY3RlZEVsZW1lbnRJZCkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlLmRlbGV0ZUZsb3coY29ubmVjdGlvbiwgbmV3IEluZGl2aWR1YWxNb2RlbChzZWxlY3RlZEVsZW1lbnRTb3VyY2VJZCkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAkKCcucHJvY2Vzcy1yZWZyZXNoJywgdGVtcGxhdGUpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaW5zdGFuY2UuY3JlYXRlUHJvY2Vzc1ZpZXcocHJvY2Vzcyk7XG4gICAgICB9KTtcblxuICAgICAgJCgnLnRvLW5ldC1lZGl0b3InLCB0ZW1wbGF0ZSkub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICByaW90LnJvdXRlKCcjLycgKyBuZXQuaWQgKyAnLy8vZWRpdCcpO1xuICAgICAgfSk7XG5cbiAgICAgICQoJy5jb3B5LW5ldC1lbGVtZW50JywgdGVtcGxhdGUpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZWxlY3RlZEVsZW1lbnRJZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBjb25zdCBpbmRpdmlkdWFsID0gbmV3IEluZGl2aWR1YWxNb2RlbChzZWxlY3RlZEVsZW1lbnRJZCk7XG4gICAgICAgICAgaWYgKGluZGl2aWR1YWwuaGFzVmFsdWUoJ3JkZjp0eXBlJykpIHtcbiAgICAgICAgICAgIGlmIChpbmRpdmlkdWFsWydyZGY6dHlwZSddWzBdLmlkID09PSAndi13ZjpUYXNrJyB8fCBpbmRpdmlkdWFsWydyZGY6dHlwZSddWzBdLmlkID09PSAndi13ZjpDb25kaXRpb24nKSB7XG4gICAgICAgICAgICAgIGluZGl2aWR1YWwuY2xvbmUoKS50aGVuKChjbG9uZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNsb25lWyd2LXdmOmxvY2F0aW9uWCddID0gW2luZGl2aWR1YWxbJ3Ytd2Y6bG9jYXRpb25YJ11bMF0gKyA1MF07XG4gICAgICAgICAgICAgICAgY2xvbmVbJ3Ytd2Y6bG9jYXRpb25ZJ10gPSBbaW5kaXZpZHVhbFsndi13Zjpsb2NhdGlvblknXVswXSArIDUwXTtcbiAgICAgICAgICAgICAgICBjbG9uZVsndi13ZjpoYXNGbG93J10gPSBbXTtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5jcmVhdGVTdGF0ZShjbG9uZSk7XG4gICAgICAgICAgICAgICAgbmV0Wyd2LXdmOmNvbnNpc3RzT2YnXSA9IG5ldFsndi13Zjpjb25zaXN0c09mJ10uY29uY2F0KGNsb25lKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLyogWk9PTSBbQkVHSU5dICovXG4gICAgICBjb25zdCB6b29tSW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChuZXRbJ2N1cnJlbnRTY2FsZSddPDEpIHtcbiAgICAgICAgICByZXR1cm4gaW5zdGFuY2UuY2hhbmdlU2NhbGUobmV0WydjdXJyZW50U2NhbGUnXSArIDAuMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5ldFsnY3VycmVudFNjYWxlJ108Mikge1xuICAgICAgICAgIHJldHVybiBpbnN0YW5jZS5jaGFuZ2VTY2FsZShuZXRbJ2N1cnJlbnRTY2FsZSddICsgMC4yNSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBjb25zdCB6b29tT3V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAobmV0WydjdXJyZW50U2NhbGUnXT4xKSB7XG4gICAgICAgICAgcmV0dXJuIGluc3RhbmNlLmNoYW5nZVNjYWxlKG5ldFsnY3VycmVudFNjYWxlJ10gLSAwLjI1KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV0WydjdXJyZW50U2NhbGUnXT4wLjIpIHtcbiAgICAgICAgICByZXR1cm4gaW5zdGFuY2UuY2hhbmdlU2NhbGUobmV0WydjdXJyZW50U2NhbGUnXSAtIDAuMSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgICQoJy56b29tLWluJywgdGVtcGxhdGUpLm9uKCdjbGljaycsIHpvb21Jbik7XG4gICAgICAkKCcuem9vbS1vdXQnLCB0ZW1wbGF0ZSkub24oJ2NsaWNrJywgem9vbU91dCk7XG4gICAgICB3ZGF0YS5iaW5kKCdtb3VzZXdoZWVsJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKCBlLm9yaWdpbmFsRXZlbnQud2hlZWxEZWx0YSA+IDAgKSB7XG4gICAgICAgICAgem9vbUluKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgem9vbU91dCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgJCgnLnpvb20tZGVmYXVsdCcsIHRlbXBsYXRlKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGluc3RhbmNlLm9wdGltaXplVmlldygpO1xuICAgICAgfSk7XG5cbiAgICAgICQoJyNmdWxsLXdpZHRoJywgdGVtcGxhdGUpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaW5zdGFuY2Uub3B0aW1pemVWaWV3KCk7XG4gICAgICB9KTtcbiAgICAgIC8qIFpPT00gW0VORF0gKi9cblxuICAgICAgLyogTkVUIE1FTlUgW0VORF0gKi9cblxuICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgIH0pO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfTtcbn0pO1xuXG4vKipcbiAqIENvbGxlY3QgZW50aXRpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtZW50XG4gKiBAcGFyYW0ge09iamVjdH0gbGlzdFxuICovXG5mdW5jdGlvbiBjb2xsZWN0RW50aXRpZXMgKGVsZW1lbnQsIGxpc3QpIHtcbiAgY29uc3QgcHJvcHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhlbGVtZW50KTtcbiAgZm9yIChjb25zdCBwcm9wIG9mIHByb3BzKSB7XG4gICAgaWYgKGVsZW1lbnRbcHJvcF0gJiYgQXJyYXkuaXNBcnJheShlbGVtZW50W3Byb3BdKSkge1xuICAgICAgZWxlbWVudFtwcm9wXS5mb3JFYWNoKChzdWJFbGVtZW50KSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2Ygc3ViRWxlbWVudC5oYXNWYWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJiBzdWJFbGVtZW50Lmhhc1ZhbHVlKCdyZGY6dHlwZScpKSB7XG4gICAgICAgICAgc3ViRWxlbWVudFsncmRmOnR5cGUnXS5mb3JFYWNoKChzdWJSZGZUeXBlKSA9PiB7XG4gICAgICAgICAgICBpZiAoc3ViUmRmVHlwZS5pZCA9PT0gJ3Ytd2Y6VmFyRGVmaW5lJyB8fCBzdWJSZGZUeXBlLmlkID09PSAndi13ZjpUcmFuc2Zvcm0nIHx8IHN1YlJkZlR5cGUuaWQgPT09ICd2LXdmOk1hcHBpbmcnKSB7XG4gICAgICAgICAgICAgIGxpc3QuYWRkKHN1YkVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN1YlJkZlR5cGUuaWQgPT09ICd2LXdmOk1hcHBpbmcnKSB7XG4gICAgICAgICAgICAgIGxpc3QuYWRkKHN1YkVsZW1lbnRbJ3Ytd2Y6bWFwVG9WYXJpYWJsZSddWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGZvclN1YkluZGl2aWR1YWwgKG5ldCwgcHJvcGVydHksIGlkLCBmdW5jKSB7XG4gIGlmIChuZXRbcHJvcGVydHldID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgbmV0W3Byb3BlcnR5XS5mb3JFYWNoKChlbCkgPT4ge1xuICAgIGlmIChlbC5pZCA9PSBpZCkge1xuICAgICAgZnVuYyhlbCk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3ViSW5kaXZpZHVhbCAobmV0LCBwcm9wZXJ0eSwgaWQpIHtcbiAgaWYgKG5ldFtwcm9wZXJ0eV0gPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybjtcbiAgfVxuICByZXR1cm4gbmV0W3Byb3BlcnR5XS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uaWQgIT09IGlkKTtcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O2lEQUNBLHFKQUFBQSxtQkFBQSxZQUFBQSxDQUFBLFdBQUFDLE9BQUEsU0FBQUEsT0FBQSxPQUFBQyxFQUFBLEdBQUFDLE1BQUEsQ0FBQUMsU0FBQSxFQUFBQyxNQUFBLEdBQUFILEVB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QUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDZixDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2YsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNmLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDZixDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNkLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2QsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDZCxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNkLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2QsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUNmLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFDZixDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQ2YsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUNmLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FDaEI7WUFDRCxJQUFNQyxrQkFBa0IsR0FBRyxDQUN6QixDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2YsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNmLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDZixDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2YsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDZCxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNkLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ2QsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDZCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQ2YsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUNmLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFDZixDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQ2hCO1lBQ0QxTCxRQUFRLENBQUMyTCxVQUFVLENBQUNsRCxPQUFPLEVBQUU7Y0FDM0I1SixNQUFNLEVBQUUsS0FBSztjQUNiK00sTUFBTSxFQUFFRixrQkFBa0I7Y0FDMUJHLFdBQVcsRUFBRTtnQkFDWEMsUUFBUSxFQUFFLEtBQUs7Z0JBQ2ZDLFFBQVEsRUFBRTtjQUNaLENBQUM7Y0FDREMsU0FBUyxFQUFFLENBQ1QsVUFBVSxFQUFFO2dCQUNWQyxJQUFJLEVBQUUsRUFBRTtnQkFDUkMsR0FBRyxFQUFFO2NBQ1AsQ0FBQyxDQUNGO2NBQ0RDLFVBQVUsRUFBRTtnQkFDVnhILFdBQVcsRUFBRSxTQUFTO2dCQUN0QnlILFNBQVMsRUFBRSxhQUFhO2dCQUN4QkMsTUFBTSxFQUFFdkwsSUFBSSxJQUFFLE1BQU0sR0FBQyxDQUFDLEdBQUMsQ0FBQztnQkFDeEI4RCxTQUFTLEVBQUU7Y0FDYixDQUFDO2NBQ0QwSCxjQUFjLEVBQUU7Z0JBQ2QzSCxXQUFXLEVBQUUsU0FBUztnQkFDdEJDLFNBQVMsRUFBRSxDQUFDO2dCQUNaMkgsWUFBWSxFQUFFLGFBQWE7Z0JBQzNCQyxZQUFZLEVBQUU7Y0FDaEIsQ0FBQztjQUNEQyxjQUFjLEVBQUUsRUFBRTtjQUNsQkMsZ0JBQWdCLEVBQUUsU0FBQUEsaUJBQVUxVCxJQUFJLEVBQUVxRixDQUFDLEVBQUU7Z0JBQ25Dc08sS0FBSyxDQUFDLHVCQUF1QixHQUFHM1QsSUFBSSxDQUFDeVQsY0FBYyxHQUFHLFdBQVcsQ0FBQztjQUNwRTtZQUNGLENBQUMsQ0FBQzs7WUFFRjs7WUFFQXpNLFFBQVEsQ0FBQzRNLFVBQVUsQ0FBQ25FLE9BQU8sRUFBRTtjQUMzQm9FLFdBQVcsRUFBRTtnQkFDWGYsUUFBUSxFQUFFLElBQUk7Z0JBQ2RDLFFBQVEsRUFBRSxLQUFLO2dCQUNmbkQsVUFBVSxFQUFFO2NBQ2QsQ0FBQztjQUNEa0UsUUFBUSxFQUFFLElBQUk7Y0FDZGxCLE1BQU0sRUFBRUgsaUJBQWlCO2NBQ3pCVSxVQUFVLEVBQUU7Z0JBQ1Z4SCxXQUFXLEVBQUUsU0FBUztnQkFDdEJ5SCxTQUFTLEVBQUUsYUFBYTtnQkFDeEJDLE1BQU0sRUFBRXZMLElBQUksSUFBRSxNQUFNLEdBQUMsQ0FBQyxHQUFDLENBQUM7Z0JBQ3hCOEQsU0FBUyxFQUFFO2NBQ2I7WUFDRixDQUFDLENBQUM7VUFDSixDQUFDOztVQUVEO0FBQ0o7QUFDQTtBQUNBO1VBQ0k1RSxRQUFRLENBQUMrTSxXQUFXLEdBQUcsVUFBVUMsS0FBSyxFQUFFO1lBQ3RDOU4sQ0FBQyxDQUFDLHdCQUF3QixFQUFFbUIsUUFBUSxDQUFDLENBQUMyQyxJQUFJLEVBQUU7WUFFNUN4RSxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUd5TyxVQUFVLENBQUNELEtBQUssQ0FBQztZQUN2QzVNLElBQUksQ0FBQyxVQUFVLEdBQUNLLFNBQVMsR0FBQyxPQUFPLENBQUMsR0FBR2pDLEdBQUcsQ0FBQyxjQUFjLENBQUM7WUFFeER3QixRQUFRLENBQUNrTixPQUFPLENBQUMxTyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDckNpRCxLQUFLLENBQUNDLEdBQUcsQ0FBQztjQUNSLGVBQWUsRUFBRSxRQUFRLEdBQUNsRCxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUMsR0FBRyxHQUFDQSxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUMsR0FBRztjQUFFO2NBQzNFLG1CQUFtQixFQUFFLFFBQVEsR0FBQ0EsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFDLEdBQUcsR0FBQ0EsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFDLEdBQUc7Y0FBRTtjQUMvRSxXQUFXLEVBQUUsUUFBUSxHQUFDQSxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUMsR0FBRyxHQUFDQSxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUM7WUFDcEUsQ0FBQyxDQUFDO1VBQ0osQ0FBQzs7VUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7VUFDSXdCLFFBQVEsQ0FBQ21OLGdCQUFnQixHQUFHLFVBQVVDLEVBQUUsRUFBRW5WLEtBQUssRUFBRTtZQUMvQyxJQUFJLENBQUNBLEtBQUssQ0FBQ2dHLFFBQVEsQ0FBQyxPQUFPLEdBQUNtUCxFQUFFLENBQUMsRUFBRTtjQUMvQixPQUFPLEdBQUcsR0FBQ0EsRUFBRSxHQUFDLEtBQUs7WUFDckI7WUFDQSxJQUFNL1csSUFBSSxHQUFHNEIsS0FBSyxDQUFDLE9BQU8sR0FBQ21WLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDalAsRUFBRTtZQUNwQyxJQUFJOUgsSUFBSSxLQUFLLElBQUksSUFBSUEsSUFBSSxLQUFLd0MsU0FBUyxJQUFJeEMsSUFBSSxLQUFLLEVBQUUsRUFBRTtjQUN0RCxPQUFPLEdBQUcsR0FBQytXLEVBQUUsR0FBQyxLQUFLO1lBQ3JCO1lBRUEsSUFBSS9XLElBQUksSUFBSSxVQUFVLEVBQUUsT0FBTyxHQUFHLEdBQUMrVyxFQUFFLEdBQUMsTUFBTTtZQUM1QyxJQUFJL1csSUFBSSxJQUFJLFNBQVMsRUFBRSxPQUFPLEdBQUcsR0FBQytXLEVBQUUsR0FBQyxLQUFLO1lBQzFDLElBQUkvVyxJQUFJLElBQUksVUFBVSxFQUFFLE9BQU8sR0FBRyxHQUFDK1csRUFBRSxHQUFDLE1BQU07WUFDNUMsSUFBSS9XLElBQUksSUFBSSxXQUFXLEVBQUUsT0FBTyxHQUFHLEdBQUMrVyxFQUFFLEdBQUMsT0FBTztZQUU5QyxPQUFPLEdBQUcsR0FBQ0EsRUFBRSxHQUFDLEtBQUs7VUFDckIsQ0FBQzs7VUFFRDtBQUNKO0FBQ0E7QUFDQTtVQUNJcE4sUUFBUSxDQUFDcU4sV0FBVyxHQUFHLFVBQVVwVixLQUFLLEVBQUU7WUFDdEMsSUFBSSxDQUFDQSxLQUFLLENBQUNnRyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDakMsSUFBTTVILElBQUksR0FBRzRCLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ2tHLEVBQUU7WUFDcEMsSUFBSW1QLFlBQVksR0FBRyxFQUFFO1lBQ3JCLFFBQVFqWCxJQUFJO2NBQ1osS0FBSyxxQkFBcUI7Z0JBQ3hCaVgsWUFBWSxHQUFHLDZEQUE2RCxHQUN4RSxNQUFNLEdBQUdyVixLQUFLLENBQUNrRyxFQUFFLEdBQUcsSUFBSSxHQUN4Qix5Q0FBeUMsR0FDekMsT0FBTyxJQUFJcUMsWUFBWSxHQUFDLENBQUMsR0FBQ3ZJLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUM3RCxNQUFNLElBQUl1SSxZQUFZLEdBQUMsQ0FBQyxHQUFDdkksS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLEdBQzlELHVFQUF1RSxJQUN0RTZJLElBQUksSUFBRSxNQUFNLEdBQUMsa0JBQWtCLEdBQUMsRUFBRSxDQUFDLEdBQUMsY0FBYztnQkFDdkQ7Y0FDRixLQUFLLHNCQUFzQjtnQkFDekJ3TSxZQUFZLEdBQUcsOERBQThELEdBQ3pFLE1BQU0sR0FBR3JWLEtBQUssQ0FBQ2tHLEVBQUUsR0FBRyxJQUFJLEdBQ3hCLHlDQUF5QyxHQUN6QyxPQUFPLElBQUlxQyxZQUFZLEdBQUMsQ0FBQyxHQUFDdkksS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQzdELE9BQU8sSUFBSXVJLFlBQVksR0FBQyxDQUFDLEdBQUN2SSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sR0FDL0QsNkVBQTZFO2dCQUNqRjtjQUNGLEtBQUssZ0JBQWdCO2dCQUNuQnFWLFlBQVksR0FBRyxpQ0FBaUMsR0FDNUMsTUFBTSxHQUFHclYsS0FBSyxDQUFDa0csRUFBRSxHQUFHLElBQUksR0FDeEIsY0FBYyxJQUFJcUMsWUFBWSxHQUFDLENBQUMsR0FBQ3ZJLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUNwRSxNQUFNLElBQUl1SSxZQUFZLEdBQUMsQ0FBQyxHQUFDdkksS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLEdBQzlELHlDQUF5QyxHQUFHQSxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxJQUM1RTZJLElBQUksSUFBRSxNQUFNLEdBQUMsa0JBQWtCLEdBQUMsRUFBRSxDQUFDLEdBQUMsY0FBYztnQkFDdkQ7Y0FDRixLQUFLLFdBQVc7Z0JBQ2R3TSxZQUFZLEdBQUcsc0NBQXNDLEdBQ2pEdE4sUUFBUSxDQUFDbU4sZ0JBQWdCLENBQUMsT0FBTyxFQUFFbFYsS0FBSyxDQUFDLEdBQ3pDK0gsUUFBUSxDQUFDbU4sZ0JBQWdCLENBQUMsTUFBTSxFQUFFbFYsS0FBSyxDQUFDLEdBQUcsSUFBSSxHQUMvQyxNQUFNLEdBQUdBLEtBQUssQ0FBQ2tHLEVBQUUsR0FBRyxJQUFJLEdBQ3hCLGNBQWMsSUFBSXFDLFlBQVksR0FBQyxDQUFDLEdBQUN2SSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sR0FDckUsT0FBTyxJQUFJdUksWUFBWSxHQUFDLENBQUMsR0FBQ3ZJLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxHQUMvRCwwQkFBMEIsR0FBR0EsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsSUFDN0Q2SSxJQUFJLElBQUUsTUFBTSxHQUFDLGtCQUFrQixHQUFDLEVBQUUsQ0FBQyxHQUFDLGNBQWM7Z0JBQ3ZEO1lBQU07WUFFUixJQUFJd00sWUFBWSxLQUFHLEVBQUUsRUFBRTtjQUNyQjdMLEtBQUssQ0FBQ0QsTUFBTSxDQUFDOEwsWUFBWSxDQUFDO2NBQzFCLElBQU1ySyxNQUFNLEdBQUcvRCxDQUFDLENBQUMsR0FBRyxHQUFHTyxXQUFXLENBQUN5RCxRQUFRLENBQUNqTCxLQUFLLENBQUNrRyxFQUFFLENBQUMsRUFBRWtDLFFBQVEsQ0FBQztjQUNoRW1JLGVBQWUsQ0FBQ3ZGLE1BQU0sQ0FBQztjQUN2QixJQUFJbkMsSUFBSSxJQUFFLE1BQU0sRUFBRTZGLGdCQUFnQixDQUFDMU8sS0FBSyxFQUFFZ0wsTUFBTSxDQUFDO2NBQ2pENEQsWUFBWSxDQUFDNU8sS0FBSyxFQUFFZ0wsTUFBTSxDQUFDO2NBQzNCakQsUUFBUSxDQUFDZ0gsbUJBQW1CLENBQUMvRCxNQUFNLENBQUM7WUFDdEM7VUFDRixDQUFDO1VBRURqRCxRQUFRLENBQUN1TixXQUFXLEdBQUcsVUFBVW5RLE9BQU8sRUFBRTtZQUN4QzRDLFFBQVEsQ0FBQ3dOLG9CQUFvQixDQUFDcFEsT0FBTyxDQUFDO1lBQ3RDNEMsUUFBUSxDQUFDeU4sTUFBTSxDQUFDclEsT0FBTyxDQUFDO1lBQ3hCb0IsR0FBRyxDQUFDLGlCQUFpQixDQUFDLEdBQUdJLG1CQUFtQixDQUFDSixHQUFHLEVBQUUsaUJBQWlCLEVBQUVwQixPQUFPLENBQUNlLEVBQUUsQ0FBQztZQUNoRkssR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUN2SCxPQUFPLENBQUMsVUFBQ2dCLEtBQUssRUFBSztjQUN4QyxJQUFJQSxLQUFLLENBQUNnRyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUU7Z0JBQ2xDaEcsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDaEIsT0FBTyxDQUFDLFVBQUN1UCxJQUFJLEVBQUs7a0JBQ3RDLElBQUlBLElBQUksQ0FBQ3ZJLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJdUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNySSxFQUFFLElBQUlmLE9BQU8sQ0FBQ2UsRUFBRSxFQUFFO29CQUNqRjZCLFFBQVEsQ0FBQzBOLFVBQVUsQ0FBQ2xILElBQUksRUFBRXZPLEtBQUssQ0FBQztrQkFDbEM7Z0JBQ0YsQ0FBQyxDQUFDO2NBQ0o7WUFDRixDQUFDLENBQUM7VUFDSixDQUFDO1VBRUQrSCxRQUFRLENBQUMyTixVQUFVLEdBQUcsVUFBVTFWLEtBQUssRUFBRXVPLElBQUksRUFBRTtZQUMzQ0EsSUFBSSxDQUFDTSxJQUFJLEVBQUUsQ0FBQ2xQLElBQUksQ0FBQyxZQUFNO2NBQ3JCLElBQU1vVSxTQUFTLEdBQUdoTSxRQUFRLENBQUM0TixPQUFPLENBQUM7Z0JBQ2pDeEgsTUFBTSxFQUFFbk8sS0FBSyxDQUFDa0csRUFBRTtnQkFDaEJxSixNQUFNLEVBQUVoQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ3JJLEVBQUU7Z0JBQ3BDMFAsVUFBVSxFQUFHL00sSUFBSSxJQUFFO2NBQ3JCLENBQUMsQ0FBQztjQUNGLElBQUkwRixJQUFJLENBQUN2SSxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQy9CK04sU0FBUyxDQUFDbEUsVUFBVSxDQUFDLENBQUMsT0FBTyxFQUFFO2tCQUFDN0MsS0FBSyxFQUFFdUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztrQkFBRTFCLFFBQVEsRUFBRSxHQUFHO2tCQUFFM0csRUFBRSxFQUFFO2dCQUFXLENBQUMsQ0FBQyxDQUFDO2NBQ2pHO2NBQ0E2TixTQUFTLENBQUN0RixPQUFPLENBQUNGLElBQUksQ0FBQ3JJLEVBQUUsQ0FBQztZQUM1QixDQUFDLENBQUM7VUFDSixDQUFDO1VBRUQ2QixRQUFRLENBQUMwTixVQUFVLEdBQUcsVUFBVWxILElBQUksRUFBRUosTUFBTSxFQUFFO1lBQzVDcEcsUUFBUSxDQUFDOE4sTUFBTSxDQUFDdEgsSUFBSSxFQUFFO2NBQUN1SCxTQUFTLEVBQUUsS0FBSztjQUFFQyxXQUFXLEVBQUU7WUFBSSxDQUFDLENBQUM7WUFDNUR4UCxHQUFHLENBQUMsaUJBQWlCLENBQUMsR0FBR0ksbUJBQW1CLENBQUNKLEdBQUcsRUFBRSxpQkFBaUIsRUFBRWdJLElBQUksQ0FBQ3JJLEVBQUUsQ0FBQztZQUM3RSxJQUFNOFAsZ0JBQWdCLEdBQUcsSUFBSTFPLGVBQWUsQ0FBQzZHLE1BQU0sQ0FBQ2pJLEVBQUUsQ0FBQztZQUN2RDhQLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxHQUFHclAsbUJBQW1CLENBQUNxUCxnQkFBZ0IsRUFBRSxjQUFjLEVBQUV6SCxJQUFJLENBQUNySSxFQUFFLENBQUM7VUFDbkcsQ0FBQztVQUVENkIsUUFBUSxDQUFDa08scUJBQXFCLEdBQUcsVUFBVTdYLElBQUksRUFBRTtZQUMvQyxJQUFNOFgsVUFBVSxHQUFHLElBQUk1TyxlQUFlLEVBQUU7WUFFeEM0TyxVQUFVLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBQ25DQSxVQUFVLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzNOLFlBQVksR0FBQyxDQUFDLEdBQUNoQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUVBLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNyRjJQLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDM04sWUFBWSxHQUFDLENBQUMsR0FBQ2hDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBRUEsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBRXJGLElBQUluSSxJQUFJLElBQUUsV0FBVyxFQUFFO2NBQ3JCOFgsVUFBVSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSTVPLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2NBQ2hFUyxRQUFRLENBQUNxTixXQUFXLENBQUNjLFVBQVUsQ0FBQztZQUNsQyxDQUFDLE1BQU0sSUFBSTlYLElBQUksSUFBRSxNQUFNLEVBQUU7Y0FDdkI4WCxVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJNU8sZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2NBQzNEUyxRQUFRLENBQUNxTixXQUFXLENBQUNjLFVBQVUsQ0FBQztZQUNsQyxDQUFDLE1BQU0sSUFBSTlYLElBQUksSUFBRSxPQUFPLEVBQUU7Y0FDeEI4WCxVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJNU8sZUFBZSxDQUFDLHFCQUFxQixDQUFDLENBQUM7Y0FDckVTLFFBQVEsQ0FBQ3FOLFdBQVcsQ0FBQ2MsVUFBVSxDQUFDO1lBQ2xDLENBQUMsTUFBTSxJQUFJOVgsSUFBSSxJQUFFLFFBQVEsRUFBRTtjQUN6QjhYLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUNBLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQztjQUNwRUEsVUFBVSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSTVPLGVBQWUsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2NBQ3RFUyxRQUFRLENBQUNxTixXQUFXLENBQUNjLFVBQVUsQ0FBQztZQUNsQztZQUNBM1AsR0FBRyxDQUFDLGlCQUFpQixDQUFDLEdBQUdBLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLM0YsU0FBUyxHQUFHLENBQUNzVixVQUFVLENBQUMsR0FBRzNQLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDMkgsTUFBTSxDQUFDZ0ksVUFBVSxDQUFDO1lBQ3hILE9BQU9BLFVBQVU7VUFDbkIsQ0FBQzs7VUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO1VBQ0luTyxRQUFRLENBQUNvTyxhQUFhLEdBQUcsVUFBVTVQLEdBQUcsRUFBRTtZQUN0QyxPQUFPQSxHQUFHLENBQUM2UCxRQUFRLENBQUNDLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxjQUFjLENBQUMsQ0FDN0QxVyxJQUFJLENBQUMsVUFBQzJXLFdBQVcsRUFBSztjQUNyQnJQLENBQUMsQ0FBQyxvQkFBb0IsRUFBRW1CLFFBQVEsQ0FBQyxDQUFDZSxJQUFJLENBQUM1QyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Y0FDNUQrUCxXQUFXLENBQUNDLEtBQUssRUFBRTtjQUNuQjtjQUNBLElBQUlDLFFBQVEsR0FBRyxLQUFLO2NBQ3BCLElBQUlDLFNBQVMsR0FBRyxLQUFLO2NBQ3JCSCxXQUFXLENBQUN0WCxPQUFPLENBQUMsVUFBQ21HLE9BQU8sRUFBSztnQkFDL0IsSUFBS0EsT0FBTyxDQUFDYSxRQUFRLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxJQUFJYixPQUFPLENBQUNhLFFBQVEsQ0FBQyxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsSUFBSWIsT0FBTyxDQUFDYSxRQUFRLENBQUMsVUFBVSxFQUFFLHFCQUFxQixDQUFDLElBQUliLE9BQU8sQ0FBQ2EsUUFBUSxDQUFDLFVBQVUsRUFBRSxzQkFBc0IsQ0FBQyxFQUFHO2tCQUNoTitCLFFBQVEsQ0FBQ3FOLFdBQVcsQ0FBQ2pRLE9BQU8sQ0FBQztnQkFDL0I7Z0JBQ0FxUixRQUFRLEdBQUdBLFFBQVEsSUFBSXJSLE9BQU8sQ0FBQ2EsUUFBUSxDQUFDLFVBQVUsRUFBRSxxQkFBcUIsQ0FBQztnQkFDMUV5USxTQUFTLEdBQUdBLFNBQVMsSUFBSXRSLE9BQU8sQ0FBQ2EsUUFBUSxDQUFDLFVBQVUsRUFBRSxzQkFBc0IsQ0FBQztjQUMvRSxDQUFDLENBQUM7Y0FDRjtjQUNBLElBQUksQ0FBQ3dRLFFBQVEsRUFBRTtnQkFDYnpPLFFBQVEsQ0FBQ2tPLHFCQUFxQixDQUFDLE9BQU8sQ0FBQztjQUN6QztjQUNBLElBQUksQ0FBQ1EsU0FBUyxFQUFFO2dCQUNkMU8sUUFBUSxDQUFDa08scUJBQXFCLENBQUMsUUFBUSxDQUFDO2NBQzFDO2NBQ0FLLFdBQVcsQ0FBQ3RYLE9BQU8sQ0FBQyxVQUFDbUcsT0FBTyxFQUFLO2dCQUMvQixJQUFLQSxPQUFPLENBQUNhLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRztrQkFDdENiLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQ25HLE9BQU8sQ0FBQyxVQUFDdVAsSUFBSSxFQUFLO29CQUN4Q3hHLFFBQVEsQ0FBQzJOLFVBQVUsQ0FBQ3ZRLE9BQU8sRUFBRW9KLElBQUksQ0FBQztrQkFDcEMsQ0FBQyxDQUFDO2dCQUNKO2NBQ0YsQ0FBQyxDQUFDO1lBQ0osQ0FBQyxDQUFDO1VBQ04sQ0FBQzs7VUFFRDtBQUNKO0FBQ0E7QUFDQTtVQUNJeEcsUUFBUSxDQUFDMk8sWUFBWSxHQUFHLFlBQVk7WUFDbEMsSUFBSSxDQUFDblEsR0FBRyxDQUFDUCxRQUFRLENBQUMsaUJBQWlCLENBQUMsRUFBRTtZQUN0QyxJQUFJMlEsSUFBSTtZQUFFLElBQUlDLElBQUk7WUFBRSxJQUFJQyxJQUFJO1lBQUUsSUFBSUMsSUFBSTtZQUFFLElBQUkvQixLQUFLO1lBQ2pELElBQUkzSyxPQUFPLEdBQUcsQ0FBQztZQUFFLElBQUlDLE9BQU8sR0FBRyxDQUFDO1lBQ2hDO1lBQ0E5RCxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQ3ZILE9BQU8sQ0FBQyxVQUFDZ0IsS0FBSyxFQUFLO2NBQ3hDLElBQUlBLEtBQUssQ0FBQ2dHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO2dCQUNwQyxJQUFJNFEsSUFBSSxLQUFLaFcsU0FBUyxJQUFJWixLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQzRXLElBQUksRUFBRUEsSUFBSSxHQUFHNVcsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1RixJQUFJMlcsSUFBSSxLQUFLL1YsU0FBUyxJQUFJWixLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQzJXLElBQUksRUFBRUEsSUFBSSxHQUFHM1csS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO2NBQzlGO2NBQ0EsSUFBSUEsS0FBSyxDQUFDZ0csUUFBUSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7Z0JBQ3BDLElBQUk4USxJQUFJLEtBQUtsVyxTQUFTLElBQUlaLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDOFcsSUFBSSxFQUFFQSxJQUFJLEdBQUc5VyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVGLElBQUk2VyxJQUFJLEtBQUtqVyxTQUFTLElBQUlaLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDNlcsSUFBSSxFQUFFQSxJQUFJLEdBQUc3VyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7Y0FDOUY7WUFDRixDQUFDLENBQUM7WUFFRjZXLElBQUksSUFBRSxFQUFFO1lBQ1JGLElBQUksSUFBRSxFQUFFO1lBQ1JDLElBQUksSUFBRSxHQUFHO1lBQ1RFLElBQUksSUFBRSxHQUFHOztZQUVUO1lBQ0E3UCxDQUFDLENBQUMsMEJBQTBCLEVBQUVtQixRQUFRLENBQUMsQ0FBQ29ILElBQUksQ0FBQyxVQUFDck4sQ0FBQyxFQUFFdUUsRUFBRSxFQUFLO2NBQ3RELElBQU1xUSxNQUFNLEdBQUdyUSxFQUFFLENBQUNzUSxXQUFXLElBQUVKLElBQUksR0FBQ0QsSUFBSSxDQUFDO2NBQ3pDLElBQU1NLE1BQU0sR0FBR3ZRLEVBQUUsQ0FBQ3dRLFlBQVksSUFBRUosSUFBSSxHQUFDRCxJQUFJLENBQUM7Y0FDMUM5QixLQUFLLEdBQUd0SyxJQUFJLENBQUNDLEdBQUcsQ0FBQ3FNLE1BQU0sRUFBRUUsTUFBTSxDQUFDO2NBQ2hDLElBQUlGLE1BQU0sR0FBQ0UsTUFBTSxFQUFFO2dCQUNqQjdNLE9BQU8sR0FBRyxDQUFDMUQsRUFBRSxDQUFDc1EsV0FBVyxHQUFHLENBQUNKLElBQUksR0FBQ0QsSUFBSSxJQUFFNUIsS0FBSyxJQUFHLENBQUM7Y0FDbkQsQ0FBQyxNQUFNO2dCQUNMMUssT0FBTyxHQUFHLENBQUMzRCxFQUFFLENBQUN3USxZQUFZLEdBQUcsQ0FBQ0osSUFBSSxHQUFDRCxJQUFJLElBQUU5QixLQUFLLElBQUcsQ0FBQztjQUNwRDtZQUNGLENBQUMsQ0FBQztZQUNGaE4sUUFBUSxDQUFDK00sV0FBVyxDQUFDQyxLQUFLLENBQUM7WUFDM0JoTixRQUFRLENBQUNtRSxVQUFVLENBQUMsQ0FBQ3lLLElBQUksR0FBQzVCLEtBQUssR0FBQzNLLE9BQU8sR0FBQzdCLFlBQVksR0FBQyxDQUFDLEVBQUUsQ0FBQ3NPLElBQUksR0FBQzlCLEtBQUssR0FBQzFLLE9BQU8sR0FBQzlCLFlBQVksR0FBQyxDQUFDLENBQUM7VUFDN0YsQ0FBQztVQUVEUixRQUFRLENBQUN1RSxPQUFPLEdBQUcsWUFBWTtZQUM3QmpILEtBQUssQ0FBQ2lFLEtBQUssRUFBRTtZQUNidkIsUUFBUSxDQUFDc0ksYUFBYSxFQUFFO1lBQ3hCcEosQ0FBQyxDQUFDLHdCQUF3QixFQUFFbUIsUUFBUSxDQUFDLENBQUNpSyxXQUFXLENBQUMsdUJBQXVCLENBQUM7WUFDMUVwTCxDQUFDLENBQUMsd0JBQXdCLEVBQUVtQixRQUFRLENBQUMsQ0FBQzJDLElBQUksRUFBRTtZQUM1QzlELENBQUMsQ0FBQ3VJLElBQUksQ0FBQ3pILFFBQVEsQ0FBQzJLLGlCQUFpQixFQUFFLEVBQUUsVUFBVUMsR0FBRyxFQUFFMUUsVUFBVSxFQUFFO2NBQzlEQSxVQUFVLENBQUNvRSxXQUFXLENBQUMsd0JBQXdCLENBQUM7Y0FDaERwRSxVQUFVLENBQUMyQixhQUFhLENBQUMsYUFBYSxDQUFDO2NBQ3ZDLElBQU1nRCxDQUFDLEdBQUczRSxVQUFVLENBQUN5QixVQUFVLENBQUMsV0FBVyxDQUFDO2NBQzVDLElBQUlrRCxDQUFDLElBQUloUyxTQUFTLEVBQUVnUyxDQUFDLENBQUNDLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDeEMsQ0FBQyxDQUFDO1lBQ0Y1TCxDQUFDLENBQUMsR0FBRyxHQUFDTyxXQUFXLENBQUN5RCxRQUFRLENBQUN4QyxpQkFBaUIsQ0FBQyxFQUFFTCxRQUFRLENBQUMsQ0FBQ2lLLFdBQVcsQ0FBQyxVQUFVLENBQUM7WUFDaEYsSUFBSTFKLHVCQUF1QixJQUFFLElBQUksRUFBRTtjQUNqQ1osUUFBUSxDQUFDdUgsTUFBTSxDQUFDO2dCQUFDbkIsTUFBTSxFQUFFeEY7Y0FBdUIsQ0FBQyxDQUFDLENBQUM2RyxJQUFJLENBQUMsVUFBQ3BKLENBQUMsRUFBSztnQkFDN0RBLENBQUMsQ0FBQ3NILGFBQWEsQ0FBQztrQkFBQ2hCLFdBQVcsRUFBRTtnQkFBUyxDQUFDLENBQUM7Z0JBQ3pDdEcsQ0FBQyxDQUFDd0osYUFBYSxDQUFDLFdBQVcsQ0FBQztjQUM5QixDQUFDLENBQUM7WUFDSjtZQUNBbkgsaUJBQWlCLEdBQUcsSUFBSTtZQUN4QkMsbUJBQW1CLEdBQUcsSUFBSTtZQUMxQkMsdUJBQXVCLEdBQUcsSUFBSTtVQUNoQyxDQUFDO1VBRURaLFFBQVEsQ0FBQ29QLG9CQUFvQixHQUFHLFVBQVVDLFFBQVEsRUFBRTtZQUNsRCxPQUFPQSxRQUFRLENBQUNoQixRQUFRLENBQUNDLFFBQVEsRUFBRSxtQkFBbUIsQ0FBQztVQUN6RCxDQUFDO1VBRUR0TyxRQUFRLENBQUNzUCxpQkFBaUIsR0FBRyxVQUFVRCxRQUFRLEVBQUU7WUFDL0M7WUFDQXJQLFFBQVEsQ0FBQ29QLG9CQUFvQixDQUFDQyxRQUFRLENBQUMsQ0FBQ3pYLElBQUksQ0FBQyxVQUFDMlgsR0FBRyxFQUFLO2NBQ3BEQSxHQUFHLEdBQUdBLEdBQUcsQ0FBQzdULEtBQUssQ0FBQyxDQUFDLENBQUM7Y0FDbEJ3RCxDQUFDLENBQUMsSUFBSSxFQUFFbUIsUUFBUSxDQUFDLENBQUNvSCxJQUFJLENBQUMsVUFBQytILEtBQUssRUFBRTdRLEVBQUUsRUFBSztnQkFDcENPLENBQUMsQ0FBQyxNQUFNLEVBQUVQLEVBQUUsQ0FBQyxDQUFDeUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDdEJsQyxDQUFDLENBQUVQLEVBQUUsQ0FBRSxDQUFDK0MsR0FBRyxDQUFDLGtCQUFrQixFQUFFLE9BQU8sQ0FBQyxDQUFDRSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLENBQUNBLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDO2NBQzdGLENBQUMsQ0FBQztjQUVGMk4sR0FBRyxDQUFDdFksT0FBTyxDQUFDLFVBQUN1VCxFQUFFLEVBQUs7Z0JBQ2xCLElBQUlBLEVBQUUsQ0FBQ3ZNLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFO2tCQUNyQyxJQUFNaEcsS0FBSyxHQUFHaUgsQ0FBQyxDQUFDLEdBQUcsR0FBQ08sV0FBVyxDQUFDeUQsUUFBUSxDQUFDc0gsRUFBRSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNyTSxFQUFFLENBQUMsRUFBRWtDLFFBQVEsQ0FBQztrQkFDbkYsSUFBSW5CLENBQUMsQ0FBQ2pILEtBQUssQ0FBQyxDQUFDeVEsSUFBSSxDQUFDLGlCQUFpQixHQUFDakosV0FBVyxDQUFDeUQsUUFBUSxDQUFDc0gsRUFBRSxDQUFDck0sRUFBRSxDQUFDLEdBQUMsSUFBSSxDQUFDLENBQUNoRSxNQUFNLElBQUksQ0FBQyxFQUFFO29CQUNqRitFLENBQUMsQ0FBQyxTQUFTLEVBQUU7c0JBQ1gsTUFBTSxFQUFFLFdBQVc7c0JBQ25CLGNBQWMsRUFBRXNMLEVBQUUsQ0FBQ3JNO29CQUNyQixDQUFDLENBQUMsQ0FBQzBELFFBQVEsQ0FBQzVKLEtBQUssQ0FBQztrQkFDcEI7a0JBQ0EsSUFBTXdYLEdBQUcsR0FBR0MsUUFBUSxDQUFDelgsS0FBSyxDQUFDMkosSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7a0JBQ3BELElBQU0rTixHQUFHLEdBQUcxWCxLQUFLLENBQUMySixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUUsS0FBSztrQkFDM0MsSUFBSTZOLEdBQUcsR0FBQyxDQUFDLEVBQUU7b0JBQ1R4WCxLQUFLLENBQUMySixJQUFJLENBQUMsa0JBQWtCLEVBQUU2TixHQUFHLEdBQUMsQ0FBQyxDQUFDO29CQUNyQ3ZRLENBQUMsQ0FBQyxVQUFVLEVBQUVqSCxLQUFLLENBQUMsQ0FBQ3dWLE1BQU0sRUFBRTtvQkFDN0J2TyxDQUFDLENBQUMsU0FBUyxFQUFFO3NCQUNYLE9BQU8sRUFBRSxTQUFTO3NCQUNsQixNQUFNLEVBQUUsR0FBRyxJQUFFdVEsR0FBRyxHQUFDLENBQUM7b0JBQ3BCLENBQUMsQ0FBQyxDQUFDNU4sUUFBUSxDQUFDNUosS0FBSyxDQUFDO2tCQUNwQixDQUFDLE1BQU07b0JBQ0xBLEtBQUssQ0FBQzJKLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUM7a0JBQ25DO2tCQUNBLElBQUksQ0FBQzRJLEVBQUUsQ0FBQ3ZNLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFO29CQUN0Q2hHLEtBQUssQ0FBQ3lKLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxTQUFTLENBQUM7b0JBQ3hDekosS0FBSyxDQUFDMkosSUFBSSxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUM7a0JBQ2pDLENBQUMsTUFBTSxJQUFJNEksRUFBRSxDQUFDdk0sUUFBUSxDQUFDLGtCQUFrQixDQUFDLElBQUl1TSxFQUFFLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDbUYsR0FBRyxFQUFFO29CQUMvRTFYLEtBQUssQ0FBQ3lKLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxTQUFTLENBQUM7b0JBQ3hDekosS0FBSyxDQUFDMkosSUFBSSxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUM7a0JBQ25DLENBQUMsTUFBTSxJQUFJLENBQUMrTixHQUFHLEVBQUU7b0JBQ2YxWCxLQUFLLENBQUN5SixHQUFHLENBQUMsa0JBQWtCLEVBQUUsU0FBUyxDQUFDO29CQUN4Q3pKLEtBQUssQ0FBQzJKLElBQUksQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDO2tCQUNqQztnQkFDRjtjQUNGLENBQUMsQ0FBQztZQUNKLENBQUMsQ0FBQztVQUNKLENBQUM7VUFFRCxJQUFJbUosWUFBWTtVQUNoQi9LLFFBQVEsQ0FBQ29PLGFBQWEsQ0FBQzVQLEdBQUcsQ0FBQyxDQUFDNUcsSUFBSSxDQUFDLFlBQU07WUFDckMsSUFBSTRHLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBRSxHQUFHLEVBQUU7Y0FDNUJ3QixRQUFRLENBQUMyTyxZQUFZLEVBQUU7WUFDekIsQ0FBQyxNQUFNO2NBQ0wzTyxRQUFRLENBQUMrTSxXQUFXLENBQUN2TyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDM0M7WUFFQSxJQUFJc0MsSUFBSSxJQUFFLE1BQU0sRUFBRTtjQUNoQmQsUUFBUSxDQUFDc1AsaUJBQWlCLENBQUN6TyxPQUFPLENBQUM7WUFDckM7WUFFQTNCLENBQUMsQ0FBQyxHQUFHLEdBQUNPLFdBQVcsQ0FBQ3lELFFBQVEsQ0FBQzlDLElBQUksQ0FBQyxVQUFVLEdBQUNLLFNBQVMsR0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUVKLFFBQVEsQ0FBQyxDQUFDK0ksT0FBTyxDQUFDLE9BQU8sQ0FBQzs7WUFFckc7WUFDQTJCLFlBQVksR0FBRzdMLENBQUMsQ0FBQyx3QkFBd0IsRUFBRW1CLFFBQVEsQ0FBQztZQUNwRDs7WUFFQTtZQUNBbkIsQ0FBQyxDQUFDLHVCQUF1QixFQUFFbUIsUUFBUSxDQUFDLENBQUM4QixFQUFFLENBQUMsT0FBTyxFQUFFLFlBQVk7Y0FDM0QzRCxHQUFHLENBQUNvUixPQUFPLEVBQUU7WUFDZixDQUFDLENBQUM7WUFFRjFRLENBQUMsQ0FBQyxzQkFBc0IsRUFBRW1CLFFBQVEsQ0FBQyxDQUFDOEIsRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFZO2NBQzFELElBQU05RSxJQUFJLEdBQUcsQ0FBQ21CLEdBQUcsQ0FBQyxDQUFDMkgsTUFBTSxDQUFDM0gsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7Y0FDakRyQixlQUFlLENBQUNxQixHQUFHLEVBQUVuQixJQUFJLENBQUM7Y0FDMUJvQyxXQUFXLENBQUNvUSxTQUFTLENBQUN4UyxJQUFJLENBQUM7WUFDN0IsQ0FBQyxDQUFDOztZQUVGO1lBQ0E2QixDQUFDLENBQUMsZUFBZSxFQUFFbUIsUUFBUSxDQUFDLENBQUNpRixJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVVqSCxDQUFDLEVBQUU7Y0FDdEQsSUFBTXdMLEtBQUssR0FBR3hMLENBQUMsQ0FBQ2tGLGNBQWM7Y0FDOUIsSUFBTTRLLFVBQVUsR0FBR25PLFFBQVEsQ0FBQ2tPLHFCQUFxQixDQUFDaFAsQ0FBQyxDQUFDMkssS0FBSyxDQUFDLENBQUMzQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsR0FBRyxXQUFXLEdBQUcsTUFBTSxDQUFDO2NBQy9HaEksQ0FBQyxDQUFDLEdBQUcsR0FBR08sV0FBVyxDQUFDeUQsUUFBUSxDQUFDaUwsVUFBVSxDQUFDaFEsRUFBRSxDQUFDLEVBQUVrQyxRQUFRLENBQUMsQ0FBQ3VHLEtBQUssRUFBRTtjQUM5RDFILENBQUMsQ0FBQzJLLEtBQUssQ0FBQyxDQUFDaUcsSUFBSSxFQUFFO1lBQ2pCLENBQUMsQ0FBQztZQUVGNVEsQ0FBQyxDQUFDLGVBQWUsRUFBRW1CLFFBQVEsQ0FBQyxDQUFDOEIsRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFZO2NBQ25ELElBQUluQixRQUFRLENBQUM3RyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUN2QjZHLFFBQVEsQ0FBQy9KLE9BQU8sQ0FBQyxVQUFDNkgsSUFBSSxFQUFLO2tCQUN6QmtCLFFBQVEsQ0FBQ3VOLFdBQVcsQ0FBQ3ZOLFFBQVEsQ0FBQytQLFdBQVcsQ0FBQyxHQUFHLEdBQUN0USxXQUFXLENBQUN5RCxRQUFRLENBQUNwRSxJQUFJLENBQUM4QyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxRixDQUFDLENBQUM7Y0FDSixDQUFDLE1BQU0sSUFBSWpCLG1CQUFtQixJQUFJLE9BQU8sRUFBRTtnQkFDekMsSUFBSXFQLE9BQU8sQ0FBQyxlQUFlLEdBQUd0UCxpQkFBaUIsR0FBRyxJQUFJLENBQUMsRUFBRTtrQkFDdkRWLFFBQVEsQ0FBQ3VOLFdBQVcsQ0FBQ3ZOLFFBQVEsQ0FBQytQLFdBQVcsQ0FBQyxHQUFHLEdBQUN0USxXQUFXLENBQUN5RCxRQUFRLENBQUN4QyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVGO2NBQ0YsQ0FBQyxNQUFNLElBQUlDLG1CQUFtQixJQUFJLE1BQU0sRUFBRTtnQkFDeEMsSUFBSXFQLE9BQU8sQ0FBQyxjQUFjLEdBQUd0UCxpQkFBaUIsR0FBRyxJQUFJLENBQUMsRUFBRTtrQkFDdERWLFFBQVEsQ0FBQ2lRLGNBQWMsQ0FBQztvQkFDdEI3SixNQUFNLEVBQUV4RjtrQkFDVixDQUFDLENBQUMsQ0FBQzNKLE9BQU8sQ0FBQyxVQUFDaVAsVUFBVSxFQUFLO29CQUN6QixJQUFJQSxVQUFVLENBQUMvSCxFQUFFLElBQUl1QyxpQkFBaUIsRUFBRTtzQkFDdENWLFFBQVEsQ0FBQzBOLFVBQVUsQ0FBQ3hILFVBQVUsRUFBRSxJQUFJM0csZUFBZSxDQUFDcUIsdUJBQXVCLENBQUMsQ0FBQztvQkFDL0U7a0JBQ0YsQ0FBQyxDQUFDO2dCQUNKO2NBQ0Y7WUFDRixDQUFDLENBQUM7WUFFRjFCLENBQUMsQ0FBQyxrQkFBa0IsRUFBRW1CLFFBQVEsQ0FBQyxDQUFDOEIsRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFZO2NBQ3REbkMsUUFBUSxDQUFDc1AsaUJBQWlCLENBQUN6TyxPQUFPLENBQUM7WUFDckMsQ0FBQyxDQUFDO1lBRUYzQixDQUFDLENBQUMsZ0JBQWdCLEVBQUVtQixRQUFRLENBQUMsQ0FBQzhCLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBWTtjQUNwRDlDLElBQUksQ0FBQ21HLEtBQUssQ0FBQyxJQUFJLEdBQUdoSCxHQUFHLENBQUNMLEVBQUUsR0FBRyxTQUFTLENBQUM7WUFDdkMsQ0FBQyxDQUFDO1lBRUZlLENBQUMsQ0FBQyxtQkFBbUIsRUFBRW1CLFFBQVEsQ0FBQyxDQUFDOEIsRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFZO2NBQ3ZELElBQUksT0FBT3pCLGlCQUFpQixLQUFLLFdBQVcsRUFBRTtnQkFDNUMsSUFBTXlOLFVBQVUsR0FBRyxJQUFJNU8sZUFBZSxDQUFDbUIsaUJBQWlCLENBQUM7Z0JBQ3pELElBQUl5TixVQUFVLENBQUNsUSxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7a0JBQ25DLElBQUlrUSxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNoUSxFQUFFLEtBQUssV0FBVyxJQUFJZ1EsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDaFEsRUFBRSxLQUFLLGdCQUFnQixFQUFFO29CQUNyR2dRLFVBQVUsQ0FBQytCLEtBQUssRUFBRSxDQUFDdFksSUFBSSxDQUFDLFVBQUNzWSxLQUFLLEVBQUs7c0JBQ2pDQSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDL0IsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO3NCQUNoRStCLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMvQixVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7c0JBQ2hFK0IsS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUU7c0JBQzFCbFEsUUFBUSxDQUFDcU4sV0FBVyxDQUFDNkMsS0FBSyxDQUFDO3NCQUMzQjFSLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHQSxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQzJILE1BQU0sQ0FBQytKLEtBQUssQ0FBQztvQkFDL0QsQ0FBQyxDQUFDO2tCQUNKO2dCQUNGO2NBQ0Y7WUFDRixDQUFDLENBQUM7O1lBRUY7WUFDQSxJQUFNQyxNQUFNLEdBQUcsU0FBVEEsTUFBTUEsQ0FBQSxFQUFlO2NBQ3pCLElBQUkzUixHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUMsQ0FBQyxFQUFFO2dCQUN6QixPQUFPd0IsUUFBUSxDQUFDK00sV0FBVyxDQUFDdk8sR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztjQUN4RDtjQUNBLElBQUlBLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBQyxDQUFDLEVBQUU7Z0JBQ3pCLE9BQU93QixRQUFRLENBQUMrTSxXQUFXLENBQUN2TyxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDO2NBQ3pEO1lBQ0YsQ0FBQztZQUNELElBQU00UixPQUFPLEdBQUcsU0FBVkEsT0FBT0EsQ0FBQSxFQUFlO2NBQzFCLElBQUk1UixHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUMsQ0FBQyxFQUFFO2dCQUN6QixPQUFPd0IsUUFBUSxDQUFDK00sV0FBVyxDQUFDdk8sR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQztjQUN6RDtjQUNBLElBQUlBLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBQyxHQUFHLEVBQUU7Z0JBQzNCLE9BQU93QixRQUFRLENBQUMrTSxXQUFXLENBQUN2TyxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsR0FBRyxDQUFDO2NBQ3hEO1lBQ0YsQ0FBQztZQUVEVSxDQUFDLENBQUMsVUFBVSxFQUFFbUIsUUFBUSxDQUFDLENBQUM4QixFQUFFLENBQUMsT0FBTyxFQUFFZ08sTUFBTSxDQUFDO1lBQzNDalIsQ0FBQyxDQUFDLFdBQVcsRUFBRW1CLFFBQVEsQ0FBQyxDQUFDOEIsRUFBRSxDQUFDLE9BQU8sRUFBRWlPLE9BQU8sQ0FBQztZQUM3QzNPLEtBQUssQ0FBQzZELElBQUksQ0FBQyxZQUFZLEVBQUUsVUFBVWpILENBQUMsRUFBRTtjQUNwQyxJQUFLQSxDQUFDLENBQUMwSCxhQUFhLENBQUNzSyxVQUFVLEdBQUcsQ0FBQyxFQUFHO2dCQUNwQ0YsTUFBTSxFQUFFO2NBQ1YsQ0FBQyxNQUFNO2dCQUNMQyxPQUFPLEVBQUU7Y0FDWDtZQUNGLENBQUMsQ0FBQztZQUVGbFIsQ0FBQyxDQUFDLGVBQWUsRUFBRW1CLFFBQVEsQ0FBQyxDQUFDOEIsRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFZO2NBQ25EbkMsUUFBUSxDQUFDMk8sWUFBWSxFQUFFO1lBQ3pCLENBQUMsQ0FBQztZQUVGelAsQ0FBQyxDQUFDLGFBQWEsRUFBRW1CLFFBQVEsQ0FBQyxDQUFDOEIsRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFZO2NBQ2pEbkMsUUFBUSxDQUFDMk8sWUFBWSxFQUFFO1lBQ3pCLENBQUMsQ0FBQztZQUNGOztZQUVBOztZQUVBLE9BQU8zTyxRQUFRO1VBQ2pCLENBQUMsQ0FBQztVQUNGLE9BQU9BLFFBQVE7UUFDakIsQ0FBQztNQUNILENBQUMsQ0FBQztJQUFDO0VBQUE7QUFBQSJ9