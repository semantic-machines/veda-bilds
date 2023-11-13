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
      $.fn.veda_integer = function (options) {
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
        template: "<input type=\"text\" class=\"form-control\" placeholder=\"#\" />",
        parser: function parser(input) {
          var int = parseInt(input.replace(/\s/g, ''), 10);
          return !isNaN(int) ? int : null;
        }
      };
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfdmVkYV9saXRlcmFsSnMiLCJ2ZWRhX2xpdGVyYWwiLCJleGVjdXRlIiwiZm4iLCJ2ZWRhX2ludGVnZXIiLCJvcHRpb25zIiwib3B0cyIsIl9vYmplY3RTcHJlYWQiLCJkZWZhdWx0cyIsImNvbnRyb2wiLCJjYWxsIiwidGFiaW5kZXgiLCJhdHRyIiwicmVtb3ZlQXR0ciIsIm9uIiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsInR5cGUiLCJpc1NpbmdsZSIsImFwcGVuZCIsInRlbXBsYXRlIiwicGFyc2VyIiwiaW5wdXQiLCJpbnQiLCJwYXJzZUludCIsInJlcGxhY2UiLCJpc05hTiJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NvdXJjZS13ZWIvanMvYnJvd3Nlci9jb250cm9scy92ZWRhX2ludGVnZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gSW50ZWdlciBjb250cm9sXG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmltcG9ydCB2ZWRhX2xpdGVyYWwgZnJvbSAnLi92ZWRhX2xpdGVyYWwuanMnO1xuXG4kLmZuLnZlZGFfaW50ZWdlciA9IGZ1bmN0aW9uICggb3B0aW9ucyApIHtcbiAgY29uc3Qgb3B0cyA9IHsuLi5kZWZhdWx0cywgLi4ub3B0aW9uc307XG4gIGNvbnN0IGNvbnRyb2wgPSB2ZWRhX2xpdGVyYWwuY2FsbCh0aGlzLCBvcHRzKTtcblxuICBjb25zdCB0YWJpbmRleCA9IHRoaXMuYXR0cigndGFiaW5kZXgnKTtcbiAgaWYgKHRhYmluZGV4KSB7XG4gICAgdGhpcy5yZW1vdmVBdHRyKCd0YWJpbmRleCcpO1xuICAgIGNvbnRyb2wuYXR0cigndGFiaW5kZXgnLCB0YWJpbmRleCk7XG4gIH1cblxuICB0aGlzLm9uKCd2aWV3IGVkaXQgc2VhcmNoJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGlmIChlLnR5cGUgPT09ICdzZWFyY2gnKSB7XG4gICAgICBjb250cm9sLmlzU2luZ2xlID0gZmFsc2U7XG4gICAgfVxuICB9KTtcbiAgdGhpcy5hcHBlbmQoY29udHJvbCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gIHRlbXBsYXRlOiBgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIiNcIiAvPmAsXG4gIHBhcnNlcjogZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgY29uc3QgaW50ID0gcGFyc2VJbnQoIGlucHV0LnJlcGxhY2UoL1xccy9nLCAnJyksIDEwICk7XG4gICAgcmV0dXJuICFpc05hTihpbnQpID8gaW50IDogbnVsbDtcbiAgfSxcbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O01BRU9BLENBQUMsR0FBQUMsT0FBQSxDQUFBQyxPQUFBO0lBQUEsYUFBQUMsZUFBQTtNQUVEQyxZQUFZLEdBQUFELGVBQUEsQ0FBQUQsT0FBQTtJQUFBO0lBQUFHLE9BQUEsV0FBQUEsQ0FBQTtNQUVuQkwsQ0FBQyxDQUFDTSxFQUFFLENBQUNDLFlBQVksR0FBRyxVQUFXQyxPQUFPLEVBQUc7UUFDdkMsSUFBTUMsSUFBSSxHQUFBQyxhQUFBLENBQUFBLGFBQUEsS0FBT0MsUUFBUSxHQUFLSCxPQUFPLENBQUM7UUFDdEMsSUFBTUksT0FBTyxHQUFHUixZQUFZLENBQUNTLElBQUksQ0FBQyxJQUFJLEVBQUVKLElBQUksQ0FBQztRQUU3QyxJQUFNSyxRQUFRLEdBQUcsSUFBSSxDQUFDQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3RDLElBQUlELFFBQVEsRUFBRTtVQUNaLElBQUksQ0FBQ0UsVUFBVSxDQUFDLFVBQVUsQ0FBQztVQUMzQkosT0FBTyxDQUFDRyxJQUFJLENBQUMsVUFBVSxFQUFFRCxRQUFRLENBQUM7UUFDcEM7UUFFQSxJQUFJLENBQUNHLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxVQUFVQyxDQUFDLEVBQUU7VUFDdkNBLENBQUMsQ0FBQ0MsZUFBZSxFQUFFO1VBQ25CLElBQUlELENBQUMsQ0FBQ0UsSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUN2QlIsT0FBTyxDQUFDUyxRQUFRLEdBQUcsS0FBSztVQUMxQjtRQUNGLENBQUMsQ0FBQztRQUNGLElBQUksQ0FBQ0MsTUFBTSxDQUFDVixPQUFPLENBQUM7UUFDcEIsT0FBTyxJQUFJO01BQ2IsQ0FBQztNQUVLRCxRQUFRLEdBQUc7UUFDZlksUUFBUSxvRUFBOEQ7UUFDdEVDLE1BQU0sRUFBRSxTQUFBQSxPQUFVQyxLQUFLLEVBQUU7VUFDdkIsSUFBTUMsR0FBRyxHQUFHQyxRQUFRLENBQUVGLEtBQUssQ0FBQ0csT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUU7VUFDcEQsT0FBTyxDQUFDQyxLQUFLLENBQUNILEdBQUcsQ0FBQyxHQUFHQSxHQUFHLEdBQUcsSUFBSTtRQUNqQztNQUNGLENBQUM7SUFBQTtFQUFBO0FBQUEifQ==