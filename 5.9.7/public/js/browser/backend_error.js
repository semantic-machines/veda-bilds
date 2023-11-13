"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var BackendError, _errorCodes;
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
  function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
  function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
  function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }
  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
  function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
  function _classCheckPrivateStaticFieldDescriptor(descriptor, action) { if (descriptor === undefined) { throw new TypeError("attempted to " + action + " private static field before its declaration"); } }
  function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }
  function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
  return {
    setters: [],
    execute: function () {
      /**
       * A custom error class for backend errors.
       */
      _export("default", BackendError = /*#__PURE__*/function (_Error) {
        _inherits(BackendError, _Error);
        var _super = _createSuper(BackendError);
        /**
         * Creates a new instance of BackendError.
         * @param {number} code - The error code associated with the backend error.
         */
        function BackendError(code) {
          var _this;
          _classCallCheck(this, BackendError);
          var message = typeof code !== 'undefined' ? "".concat(_classStaticPrivateFieldSpecGet(BackendError, BackendError, _errorCodes)[code]) : undefined;
          _this = _super.call(this, message);
          _this.name = 'BackendError';
          _this.code = code;
          _this.message = message;
          return _this;
        }

        /**
         * String representation of the BackendError.
         * @returns {string} The string representation of the BackendError.
         */
        _createClass(BackendError, [{
          key: "toString",
          value: function toString() {
            return "".concat(this.name, " ").concat(this.code, ": ").concat(this.message);
          }

          /**
           * The mapping of error codes to error messages.
           */
        }]);
        return BackendError;
      }( /*#__PURE__*/_wrapNativeSuper(Error)));
      _errorCodes = {
        writable: true,
        value: {
          0: 'Server unavailable',
          400: 'Bad request',
          403: 'Forbidden',
          404: 'Not found',
          422: 'Unprocessable entity',
          423: 'Locked',
          429: 'Too many requests',
          430: 'Too many password change fails',
          463: 'Password change is not allowed',
          464: 'Secret expired',
          465: 'Empty password',
          466: 'New password is equal to old',
          467: 'Invalid password',
          468: 'Invalid secret',
          469: 'Password expired',
          470: 'Ticket not found',
          471: 'Ticket expired',
          472: 'Not authorized',
          473: 'Authentication failed',
          474: 'Not ready',
          475: 'Fail open transaction',
          476: 'Fail commit',
          477: 'Fail store',
          500: 'Internal server error',
          501: 'Not implemented',
          503: 'Service unavailable',
          904: 'Invalid identifier',
          999: 'Database modified error',
          1021: 'Disk full',
          1022: 'Duplicate key',
          1118: 'Size too large',
          4000: 'Connect error'
        }
      };
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZXhwb3J0IiwiQmFja2VuZEVycm9yIiwiX0Vycm9yIiwiX2luaGVyaXRzIiwiX3N1cGVyIiwiX2NyZWF0ZVN1cGVyIiwiY29kZSIsIl90aGlzIiwiX2NsYXNzQ2FsbENoZWNrIiwibWVzc2FnZSIsImNvbmNhdCIsIl9jbGFzc1N0YXRpY1ByaXZhdGVGaWVsZFNwZWNHZXQiLCJfZXJyb3JDb2RlcyIsInVuZGVmaW5lZCIsImNhbGwiLCJuYW1lIiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwidmFsdWUiLCJ0b1N0cmluZyIsIl93cmFwTmF0aXZlU3VwZXIiLCJFcnJvciIsIndyaXRhYmxlIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc291cmNlLXdlYi9qcy9icm93c2VyL2JhY2tlbmRfZXJyb3IuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBBIGN1c3RvbSBlcnJvciBjbGFzcyBmb3IgYmFja2VuZCBlcnJvcnMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhY2tlbmRFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgQmFja2VuZEVycm9yLlxuICAgKiBAcGFyYW0ge251bWJlcn0gY29kZSAtIFRoZSBlcnJvciBjb2RlIGFzc29jaWF0ZWQgd2l0aCB0aGUgYmFja2VuZCBlcnJvci5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvZGUpIHtcbiAgICBjb25zdCBtZXNzYWdlID0gdHlwZW9mIGNvZGUgIT09ICd1bmRlZmluZWQnID8gYCR7QmFja2VuZEVycm9yLiNlcnJvckNvZGVzW2NvZGVdfWAgOiB1bmRlZmluZWQ7XG4gICAgc3VwZXIobWVzc2FnZSk7XG4gICAgdGhpcy5uYW1lID0gJ0JhY2tlbmRFcnJvcic7XG4gICAgdGhpcy5jb2RlID0gY29kZTtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgQmFja2VuZEVycm9yLlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBCYWNrZW5kRXJyb3IuXG4gICAqL1xuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gYCR7dGhpcy5uYW1lfSAke3RoaXMuY29kZX06ICR7dGhpcy5tZXNzYWdlfWA7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG1hcHBpbmcgb2YgZXJyb3IgY29kZXMgdG8gZXJyb3IgbWVzc2FnZXMuXG4gICAqL1xuICBzdGF0aWMgI2Vycm9yQ29kZXMgPSB7XG4gICAgMDogJ1NlcnZlciB1bmF2YWlsYWJsZScsXG4gICAgNDAwOiAnQmFkIHJlcXVlc3QnLFxuICAgIDQwMzogJ0ZvcmJpZGRlbicsXG4gICAgNDA0OiAnTm90IGZvdW5kJyxcbiAgICA0MjI6ICdVbnByb2Nlc3NhYmxlIGVudGl0eScsXG4gICAgNDIzOiAnTG9ja2VkJyxcbiAgICA0Mjk6ICdUb28gbWFueSByZXF1ZXN0cycsXG4gICAgNDMwOiAnVG9vIG1hbnkgcGFzc3dvcmQgY2hhbmdlIGZhaWxzJyxcbiAgICA0NjM6ICdQYXNzd29yZCBjaGFuZ2UgaXMgbm90IGFsbG93ZWQnLFxuICAgIDQ2NDogJ1NlY3JldCBleHBpcmVkJyxcbiAgICA0NjU6ICdFbXB0eSBwYXNzd29yZCcsXG4gICAgNDY2OiAnTmV3IHBhc3N3b3JkIGlzIGVxdWFsIHRvIG9sZCcsXG4gICAgNDY3OiAnSW52YWxpZCBwYXNzd29yZCcsXG4gICAgNDY4OiAnSW52YWxpZCBzZWNyZXQnLFxuICAgIDQ2OTogJ1Bhc3N3b3JkIGV4cGlyZWQnLFxuICAgIDQ3MDogJ1RpY2tldCBub3QgZm91bmQnLFxuICAgIDQ3MTogJ1RpY2tldCBleHBpcmVkJyxcbiAgICA0NzI6ICdOb3QgYXV0aG9yaXplZCcsXG4gICAgNDczOiAnQXV0aGVudGljYXRpb24gZmFpbGVkJyxcbiAgICA0NzQ6ICdOb3QgcmVhZHknLFxuICAgIDQ3NTogJ0ZhaWwgb3BlbiB0cmFuc2FjdGlvbicsXG4gICAgNDc2OiAnRmFpbCBjb21taXQnLFxuICAgIDQ3NzogJ0ZhaWwgc3RvcmUnLFxuICAgIDUwMDogJ0ludGVybmFsIHNlcnZlciBlcnJvcicsXG4gICAgNTAxOiAnTm90IGltcGxlbWVudGVkJyxcbiAgICA1MDM6ICdTZXJ2aWNlIHVuYXZhaWxhYmxlJyxcbiAgICA5MDQ6ICdJbnZhbGlkIGlkZW50aWZpZXInLFxuICAgIDk5OTogJ0RhdGFiYXNlIG1vZGlmaWVkIGVycm9yJyxcbiAgICAxMDIxOiAnRGlzayBmdWxsJyxcbiAgICAxMDIyOiAnRHVwbGljYXRlIGtleScsXG4gICAgMTExODogJ1NpemUgdG9vIGxhcmdlJyxcbiAgICA0MDAwOiAnQ29ubmVjdCBlcnJvcicsXG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQUFBO0FBQ0E7QUFDQTtNQUZBQSxPQUFBLFlBR3FCQyxZQUFZLDBCQUFBQyxNQUFBO1FBQUFDLFNBQUEsQ0FBQUYsWUFBQSxFQUFBQyxNQUFBO1FBQUEsSUFBQUUsTUFBQSxHQUFBQyxZQUFBLENBQUFKLFlBQUE7UUFDL0I7QUFDRjtBQUNBO0FBQ0E7UUFDRSxTQUFBQSxhQUFZSyxJQUFJLEVBQUU7VUFBQSxJQUFBQyxLQUFBO1VBQUFDLGVBQUEsT0FBQVAsWUFBQTtVQUNoQixJQUFNUSxPQUFPLEdBQUcsT0FBT0gsSUFBSSxLQUFLLFdBQVcsTUFBQUksTUFBQSxDQUFNQywrQkFBQSxDQUFBVixZQUFZLEVBTjVDQSxZQUFZLEVBQUFXLFdBQUEsRUFNNkNOLElBQUksQ0FBQyxJQUFLTyxTQUFTO1VBQzdGTixLQUFBLEdBQUFILE1BQUEsQ0FBQVUsSUFBQSxPQUFNTCxPQUFPO1VBQ2JGLEtBQUEsQ0FBS1EsSUFBSSxHQUFHLGNBQWM7VUFDMUJSLEtBQUEsQ0FBS0QsSUFBSSxHQUFHQSxJQUFJO1VBQ2hCQyxLQUFBLENBQUtFLE9BQU8sR0FBR0EsT0FBTztVQUFDLE9BQUFGLEtBQUE7UUFDekI7O1FBRUE7QUFDRjtBQUNBO0FBQ0E7UUFIRVMsWUFBQSxDQUFBZixZQUFBO1VBQUFnQixHQUFBO1VBQUFDLEtBQUEsRUFJQSxTQUFBQyxTQUFBLEVBQVc7WUFDVCxVQUFBVCxNQUFBLENBQVUsSUFBSSxDQUFDSyxJQUFJLE9BQUFMLE1BQUEsQ0FBSSxJQUFJLENBQUNKLElBQUksUUFBQUksTUFBQSxDQUFLLElBQUksQ0FBQ0QsT0FBTztVQUNuRDs7VUFFQTtBQUNGO0FBQ0E7UUFGRTtRQUFBLE9BQUFSLFlBQUE7TUFBQSxnQkFBQW1CLGdCQUFBLENBckJ3Q0MsS0FBSztNQUFBVCxXQUFBO1FBQUFVLFFBQUE7UUFBQUosS0FBQSxFQXdCeEI7VUFDbkIsQ0FBQyxFQUFFLG9CQUFvQjtVQUN2QixHQUFHLEVBQUUsYUFBYTtVQUNsQixHQUFHLEVBQUUsV0FBVztVQUNoQixHQUFHLEVBQUUsV0FBVztVQUNoQixHQUFHLEVBQUUsc0JBQXNCO1VBQzNCLEdBQUcsRUFBRSxRQUFRO1VBQ2IsR0FBRyxFQUFFLG1CQUFtQjtVQUN4QixHQUFHLEVBQUUsZ0NBQWdDO1VBQ3JDLEdBQUcsRUFBRSxnQ0FBZ0M7VUFDckMsR0FBRyxFQUFFLGdCQUFnQjtVQUNyQixHQUFHLEVBQUUsZ0JBQWdCO1VBQ3JCLEdBQUcsRUFBRSw4QkFBOEI7VUFDbkMsR0FBRyxFQUFFLGtCQUFrQjtVQUN2QixHQUFHLEVBQUUsZ0JBQWdCO1VBQ3JCLEdBQUcsRUFBRSxrQkFBa0I7VUFDdkIsR0FBRyxFQUFFLGtCQUFrQjtVQUN2QixHQUFHLEVBQUUsZ0JBQWdCO1VBQ3JCLEdBQUcsRUFBRSxnQkFBZ0I7VUFDckIsR0FBRyxFQUFFLHVCQUF1QjtVQUM1QixHQUFHLEVBQUUsV0FBVztVQUNoQixHQUFHLEVBQUUsdUJBQXVCO1VBQzVCLEdBQUcsRUFBRSxhQUFhO1VBQ2xCLEdBQUcsRUFBRSxZQUFZO1VBQ2pCLEdBQUcsRUFBRSx1QkFBdUI7VUFDNUIsR0FBRyxFQUFFLGlCQUFpQjtVQUN0QixHQUFHLEVBQUUscUJBQXFCO1VBQzFCLEdBQUcsRUFBRSxvQkFBb0I7VUFDekIsR0FBRyxFQUFFLHlCQUF5QjtVQUM5QixJQUFJLEVBQUUsV0FBVztVQUNqQixJQUFJLEVBQUUsZUFBZTtVQUNyQixJQUFJLEVBQUUsZ0JBQWdCO1VBQ3RCLElBQUksRUFBRTtRQUNSO01BQUM7SUFBQTtFQUFBO0FBQUEifQ==