"use strict";

System.register(["jquery", "./veda_literal.js"], function (_export, _context) {
  "use strict";

  var $, veda_literal, defaults;
  function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_veda_literalJs) {
      veda_literal = _veda_literalJs.default;
    }],
    execute: function () {
      $.fn.veda_string = function (options) {
        var opts = _objectSpread(_objectSpread({}, defaults), options);
        var control = veda_literal.call(this, opts);
        var tabindex = this.attr('tabindex');
        if (tabindex) {
          this.removeAttr('tabindex');
          control.attr('tabindex', tabindex);
        }
        var inputType = this.data('input-type');
        if (inputType) {
          control.attr('type', inputType);
        }
        this.append(control);
        return this;
      };
      defaults = {
        template: "<input type=\"text\" class=\"form-control\" autocomplete=\"on\" />",
        parser: function parser(input) {
          return input ? String(input) : null;
        },
        isSingle: true
      };
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfdmVkYV9saXRlcmFsSnMiLCJ2ZWRhX2xpdGVyYWwiLCJleGVjdXRlIiwiZm4iLCJ2ZWRhX3N0cmluZyIsIm9wdGlvbnMiLCJvcHRzIiwiX29iamVjdFNwcmVhZCIsImRlZmF1bHRzIiwiY29udHJvbCIsImNhbGwiLCJ0YWJpbmRleCIsImF0dHIiLCJyZW1vdmVBdHRyIiwiaW5wdXRUeXBlIiwiZGF0YSIsImFwcGVuZCIsInRlbXBsYXRlIiwicGFyc2VyIiwiaW5wdXQiLCJTdHJpbmciLCJpc1NpbmdsZSJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NvdXJjZS13ZWIvanMvYnJvd3Nlci9jb250cm9scy92ZWRhX3N0cmluZy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTdHJpbmcgY29udHJvbFxuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG5pbXBvcnQgdmVkYV9saXRlcmFsIGZyb20gJy4vdmVkYV9saXRlcmFsLmpzJztcblxuJC5mbi52ZWRhX3N0cmluZyA9IGZ1bmN0aW9uICggb3B0aW9ucyApIHtcbiAgY29uc3Qgb3B0cyA9IHsuLi5kZWZhdWx0cywgLi4ub3B0aW9uc307XG4gIGNvbnN0IGNvbnRyb2wgPSB2ZWRhX2xpdGVyYWwuY2FsbCh0aGlzLCBvcHRzKTtcblxuICBjb25zdCB0YWJpbmRleCA9IHRoaXMuYXR0cigndGFiaW5kZXgnKTtcbiAgaWYgKHRhYmluZGV4KSB7XG4gICAgdGhpcy5yZW1vdmVBdHRyKCd0YWJpbmRleCcpO1xuICAgIGNvbnRyb2wuYXR0cigndGFiaW5kZXgnLCB0YWJpbmRleCk7XG4gIH1cbiAgY29uc3QgaW5wdXRUeXBlID0gdGhpcy5kYXRhKCdpbnB1dC10eXBlJyk7XG4gIGlmIChpbnB1dFR5cGUpIHtcbiAgICBjb250cm9sLmF0dHIoJ3R5cGUnLCBpbnB1dFR5cGUpO1xuICB9XG5cbiAgdGhpcy5hcHBlbmQoY29udHJvbCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gIHRlbXBsYXRlOiBgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBhdXRvY29tcGxldGU9XCJvblwiIC8+YCxcbiAgcGFyc2VyOiBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICByZXR1cm4gKGlucHV0ID8gU3RyaW5nKGlucHV0KSA6IG51bGwpO1xuICB9LFxuICBpc1NpbmdsZTogdHJ1ZSxcbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O01BRU9BLENBQUMsR0FBQUMsT0FBQSxDQUFBQyxPQUFBO0lBQUEsYUFBQUMsZUFBQTtNQUVEQyxZQUFZLEdBQUFELGVBQUEsQ0FBQUQsT0FBQTtJQUFBO0lBQUFHLE9BQUEsV0FBQUEsQ0FBQTtNQUVuQkwsQ0FBQyxDQUFDTSxFQUFFLENBQUNDLFdBQVcsR0FBRyxVQUFXQyxPQUFPLEVBQUc7UUFDdEMsSUFBTUMsSUFBSSxHQUFBQyxhQUFBLENBQUFBLGFBQUEsS0FBT0MsUUFBUSxHQUFLSCxPQUFPLENBQUM7UUFDdEMsSUFBTUksT0FBTyxHQUFHUixZQUFZLENBQUNTLElBQUksQ0FBQyxJQUFJLEVBQUVKLElBQUksQ0FBQztRQUU3QyxJQUFNSyxRQUFRLEdBQUcsSUFBSSxDQUFDQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3RDLElBQUlELFFBQVEsRUFBRTtVQUNaLElBQUksQ0FBQ0UsVUFBVSxDQUFDLFVBQVUsQ0FBQztVQUMzQkosT0FBTyxDQUFDRyxJQUFJLENBQUMsVUFBVSxFQUFFRCxRQUFRLENBQUM7UUFDcEM7UUFDQSxJQUFNRyxTQUFTLEdBQUcsSUFBSSxDQUFDQyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ3pDLElBQUlELFNBQVMsRUFBRTtVQUNiTCxPQUFPLENBQUNHLElBQUksQ0FBQyxNQUFNLEVBQUVFLFNBQVMsQ0FBQztRQUNqQztRQUVBLElBQUksQ0FBQ0UsTUFBTSxDQUFDUCxPQUFPLENBQUM7UUFDcEIsT0FBTyxJQUFJO01BQ2IsQ0FBQztNQUVLRCxRQUFRLEdBQUc7UUFDZlMsUUFBUSxzRUFBZ0U7UUFDeEVDLE1BQU0sRUFBRSxTQUFBQSxPQUFVQyxLQUFLLEVBQUU7VUFDdkIsT0FBUUEsS0FBSyxHQUFHQyxNQUFNLENBQUNELEtBQUssQ0FBQyxHQUFHLElBQUk7UUFDdEMsQ0FBQztRQUNERSxRQUFRLEVBQUU7TUFDWixDQUFDO0lBQUE7RUFBQTtBQUFBIn0=