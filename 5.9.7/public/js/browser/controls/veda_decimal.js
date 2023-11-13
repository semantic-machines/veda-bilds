"use strict";

System.register(["jquery", "../../common/util.js", "./veda_literal.js"], function (_export, _context) {
  "use strict";

  var $, Util, veda_literal, defaults;
  function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_commonUtilJs) {
      Util = _commonUtilJs.default;
    }, function (_veda_literalJs) {
      veda_literal = _veda_literalJs.default;
    }],
    execute: function () {
      $.fn.veda_decimal = function (options) {
        var opts = _objectSpread(_objectSpread({}, defaults), options);
        var control = veda_literal.call(this, opts);
        var tabindex = this.attr('tabindex');
        if (tabindex) {
          this.removeAttr('tabindex');
          control.attr('tabindex', tabindex);
        }
        this.on('view edit search', function (e) {
          e.stopPropagation();
          if (e.type === 'search') {
            control.isSingle = false;
          }
        });
        this.append(control);
        return this;
      };
      defaults = {
        template: "<input type=\"text\" class=\"form-control\" placeholder=\"#.#\" />",
        parser: function parser(input) {
          var float = parseFloat(input.replace(/\s/g, '').replace(/,/g, '.'));
          if (isNaN(float)) return null;
          return Util.isInteger(float) ? float + '.0' : float;
        }
      };
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfY29tbW9uVXRpbEpzIiwiVXRpbCIsIl92ZWRhX2xpdGVyYWxKcyIsInZlZGFfbGl0ZXJhbCIsImV4ZWN1dGUiLCJmbiIsInZlZGFfZGVjaW1hbCIsIm9wdGlvbnMiLCJvcHRzIiwiX29iamVjdFNwcmVhZCIsImRlZmF1bHRzIiwiY29udHJvbCIsImNhbGwiLCJ0YWJpbmRleCIsImF0dHIiLCJyZW1vdmVBdHRyIiwib24iLCJlIiwic3RvcFByb3BhZ2F0aW9uIiwidHlwZSIsImlzU2luZ2xlIiwiYXBwZW5kIiwidGVtcGxhdGUiLCJwYXJzZXIiLCJpbnB1dCIsImZsb2F0IiwicGFyc2VGbG9hdCIsInJlcGxhY2UiLCJpc05hTiIsImlzSW50ZWdlciJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NvdXJjZS13ZWIvanMvYnJvd3Nlci9jb250cm9scy92ZWRhX2RlY2ltYWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gRGVjaW1hbCBjb250cm9sXG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmltcG9ydCBVdGlsIGZyb20gJy4uLy4uL2NvbW1vbi91dGlsLmpzJztcblxuaW1wb3J0IHZlZGFfbGl0ZXJhbCBmcm9tICcuL3ZlZGFfbGl0ZXJhbC5qcyc7XG5cbiQuZm4udmVkYV9kZWNpbWFsID0gZnVuY3Rpb24gKCBvcHRpb25zICkge1xuICBjb25zdCBvcHRzID0gey4uLmRlZmF1bHRzLCAuLi5vcHRpb25zfTtcbiAgY29uc3QgY29udHJvbCA9IHZlZGFfbGl0ZXJhbC5jYWxsKHRoaXMsIG9wdHMpO1xuXG4gIGNvbnN0IHRhYmluZGV4ID0gdGhpcy5hdHRyKCd0YWJpbmRleCcpO1xuICBpZiAodGFiaW5kZXgpIHtcbiAgICB0aGlzLnJlbW92ZUF0dHIoJ3RhYmluZGV4Jyk7XG4gICAgY29udHJvbC5hdHRyKCd0YWJpbmRleCcsIHRhYmluZGV4KTtcbiAgfVxuXG4gIHRoaXMub24oJ3ZpZXcgZWRpdCBzZWFyY2gnLCBmdW5jdGlvbiAoZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgaWYgKGUudHlwZSA9PT0gJ3NlYXJjaCcpIHtcbiAgICAgIGNvbnRyb2wuaXNTaW5nbGUgPSBmYWxzZTtcbiAgICB9XG4gIH0pO1xuICB0aGlzLmFwcGVuZChjb250cm9sKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgdGVtcGxhdGU6IGA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwiIy4jXCIgLz5gLFxuICBwYXJzZXI6IGZ1bmN0aW9uIChpbnB1dCkge1xuICAgIGNvbnN0IGZsb2F0ID0gcGFyc2VGbG9hdCggaW5wdXQucmVwbGFjZSgvXFxzL2csICcnKS5yZXBsYWNlKC8sL2csICcuJykgKTtcbiAgICBpZiAoaXNOYU4oZmxvYXQpKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gVXRpbC5pc0ludGVnZXIoZmxvYXQpID8gZmxvYXQgKyAnLjAnIDogZmxvYXQ7XG4gIH0sXG59O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztNQUVPQSxDQUFDLEdBQUFDLE9BQUEsQ0FBQUMsT0FBQTtJQUFBLGFBQUFDLGFBQUE7TUFFREMsSUFBSSxHQUFBRCxhQUFBLENBQUFELE9BQUE7SUFBQSxhQUFBRyxlQUFBO01BRUpDLFlBQVksR0FBQUQsZUFBQSxDQUFBSCxPQUFBO0lBQUE7SUFBQUssT0FBQSxXQUFBQSxDQUFBO01BRW5CUCxDQUFDLENBQUNRLEVBQUUsQ0FBQ0MsWUFBWSxHQUFHLFVBQVdDLE9BQU8sRUFBRztRQUN2QyxJQUFNQyxJQUFJLEdBQUFDLGFBQUEsQ0FBQUEsYUFBQSxLQUFPQyxRQUFRLEdBQUtILE9BQU8sQ0FBQztRQUN0QyxJQUFNSSxPQUFPLEdBQUdSLFlBQVksQ0FBQ1MsSUFBSSxDQUFDLElBQUksRUFBRUosSUFBSSxDQUFDO1FBRTdDLElBQU1LLFFBQVEsR0FBRyxJQUFJLENBQUNDLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDdEMsSUFBSUQsUUFBUSxFQUFFO1VBQ1osSUFBSSxDQUFDRSxVQUFVLENBQUMsVUFBVSxDQUFDO1VBQzNCSixPQUFPLENBQUNHLElBQUksQ0FBQyxVQUFVLEVBQUVELFFBQVEsQ0FBQztRQUNwQztRQUVBLElBQUksQ0FBQ0csRUFBRSxDQUFDLGtCQUFrQixFQUFFLFVBQVVDLENBQUMsRUFBRTtVQUN2Q0EsQ0FBQyxDQUFDQyxlQUFlLEVBQUU7VUFDbkIsSUFBSUQsQ0FBQyxDQUFDRSxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQ3ZCUixPQUFPLENBQUNTLFFBQVEsR0FBRyxLQUFLO1VBQzFCO1FBQ0YsQ0FBQyxDQUFDO1FBQ0YsSUFBSSxDQUFDQyxNQUFNLENBQUNWLE9BQU8sQ0FBQztRQUNwQixPQUFPLElBQUk7TUFDYixDQUFDO01BRUtELFFBQVEsR0FBRztRQUNmWSxRQUFRLHNFQUFnRTtRQUN4RUMsTUFBTSxFQUFFLFNBQUFBLE9BQVVDLEtBQUssRUFBRTtVQUN2QixJQUFNQyxLQUFLLEdBQUdDLFVBQVUsQ0FBRUYsS0FBSyxDQUFDRyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDQSxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFFO1VBQ3ZFLElBQUlDLEtBQUssQ0FBQ0gsS0FBSyxDQUFDLEVBQUUsT0FBTyxJQUFJO1VBQzdCLE9BQU94QixJQUFJLENBQUM0QixTQUFTLENBQUNKLEtBQUssQ0FBQyxHQUFHQSxLQUFLLEdBQUcsSUFBSSxHQUFHQSxLQUFLO1FBQ3JEO01BQ0YsQ0FBQztJQUFBO0VBQUE7QUFBQSJ9