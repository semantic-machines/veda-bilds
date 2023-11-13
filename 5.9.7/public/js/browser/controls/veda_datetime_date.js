"use strict";

System.register(["jquery", "moment", "./veda_datetime.js"], function (_export, _context) {
  "use strict";

  var $, moment, veda_dateTime, defaults;
  function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_moment) {
      moment = _moment.default;
    }, function (_veda_datetimeJs) {
      veda_dateTime = _veda_datetimeJs.default;
    }],
    execute: function () {
      $.fn.veda_date = function (options) {
        var opts = _objectSpread(_objectSpread({}, defaults), options);
        var control = veda_dateTime.call(this, opts);
        var tabindex = this.attr('tabindex');
        if (tabindex) {
          this.removeAttr('tabindex');
          control.find('input').attr('tabindex', tabindex);
        }
        this.append(control);
        return this;
      };
      defaults = {
        template: "\n    <div class=\"input-group date\">\n      <span class=\"input-group-addon\">\n        <span class=\"glyphicon glyphicon-time\"></span>\n      </span>\n      <input type=\"text\" class=\"form-control\" autocomplete=\"off\"/>\n    </div>\n  ",
        parser: function parser(input) {
          if (input) {
            var timestamp = moment(input, 'DD.MM.YYYY').toDate();
            var symbolicDate = new Date(timestamp);
            var d = symbolicDate.getDate();
            var m = symbolicDate.getMonth();
            var y = symbolicDate.getFullYear();
            symbolicDate.setUTCFullYear(y, m, d);
            symbolicDate.setUTCHours(0, 0, 0, 0);
            return symbolicDate;
          }
          return null;
        },
        format: 'DD.MM.YYYY'
      };
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfbW9tZW50IiwibW9tZW50IiwiX3ZlZGFfZGF0ZXRpbWVKcyIsInZlZGFfZGF0ZVRpbWUiLCJleGVjdXRlIiwiZm4iLCJ2ZWRhX2RhdGUiLCJvcHRpb25zIiwib3B0cyIsIl9vYmplY3RTcHJlYWQiLCJkZWZhdWx0cyIsImNvbnRyb2wiLCJjYWxsIiwidGFiaW5kZXgiLCJhdHRyIiwicmVtb3ZlQXR0ciIsImZpbmQiLCJhcHBlbmQiLCJ0ZW1wbGF0ZSIsInBhcnNlciIsImlucHV0IiwidGltZXN0YW1wIiwidG9EYXRlIiwic3ltYm9saWNEYXRlIiwiRGF0ZSIsImQiLCJnZXREYXRlIiwibSIsImdldE1vbnRoIiwieSIsImdldEZ1bGxZZWFyIiwic2V0VVRDRnVsbFllYXIiLCJzZXRVVENIb3VycyIsImZvcm1hdCJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NvdXJjZS13ZWIvanMvYnJvd3Nlci9jb250cm9scy92ZWRhX2RhdGV0aW1lX2RhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gRGF0ZSBjb250cm9sXG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcblxuaW1wb3J0IHZlZGFfZGF0ZVRpbWUgZnJvbSAnLi92ZWRhX2RhdGV0aW1lLmpzJztcblxuJC5mbi52ZWRhX2RhdGUgPSBmdW5jdGlvbiAoIG9wdGlvbnMgKSB7XG4gIGNvbnN0IG9wdHMgPSB7Li4uZGVmYXVsdHMsIC4uLm9wdGlvbnN9O1xuICBjb25zdCBjb250cm9sID0gdmVkYV9kYXRlVGltZS5jYWxsKHRoaXMsIG9wdHMpO1xuXG4gIGNvbnN0IHRhYmluZGV4ID0gdGhpcy5hdHRyKCd0YWJpbmRleCcpO1xuICBpZiAodGFiaW5kZXgpIHtcbiAgICB0aGlzLnJlbW92ZUF0dHIoJ3RhYmluZGV4Jyk7XG4gICAgY29udHJvbC5maW5kKCdpbnB1dCcpLmF0dHIoJ3RhYmluZGV4JywgdGFiaW5kZXgpO1xuICB9XG5cbiAgdGhpcy5hcHBlbmQoY29udHJvbCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwIGRhdGVcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb25cIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXRpbWVcIj48L3NwYW4+XG4gICAgICA8L3NwYW4+XG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiLz5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgcGFyc2VyOiBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICBpZiAoaW5wdXQpIHtcbiAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IG1vbWVudChpbnB1dCwgJ0RELk1NLllZWVknKS50b0RhdGUoKTtcbiAgICAgIGNvbnN0IHN5bWJvbGljRGF0ZSA9IG5ldyBEYXRlKHRpbWVzdGFtcCk7XG4gICAgICBjb25zdCBkID0gc3ltYm9saWNEYXRlLmdldERhdGUoKTtcbiAgICAgIGNvbnN0IG0gPSBzeW1ib2xpY0RhdGUuZ2V0TW9udGgoKTtcbiAgICAgIGNvbnN0IHkgPSBzeW1ib2xpY0RhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgIHN5bWJvbGljRGF0ZS5zZXRVVENGdWxsWWVhcih5LCBtLCBkKTtcbiAgICAgIHN5bWJvbGljRGF0ZS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgIHJldHVybiBzeW1ib2xpY0RhdGU7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9LFxuICBmb3JtYXQ6ICdERC5NTS5ZWVlZJyxcbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O01BRU9BLENBQUMsR0FBQUMsT0FBQSxDQUFBQyxPQUFBO0lBQUEsYUFBQUMsT0FBQTtNQUVEQyxNQUFNLEdBQUFELE9BQUEsQ0FBQUQsT0FBQTtJQUFBLGFBQUFHLGdCQUFBO01BRU5DLGFBQWEsR0FBQUQsZ0JBQUEsQ0FBQUgsT0FBQTtJQUFBO0lBQUFLLE9BQUEsV0FBQUEsQ0FBQTtNQUVwQlAsQ0FBQyxDQUFDUSxFQUFFLENBQUNDLFNBQVMsR0FBRyxVQUFXQyxPQUFPLEVBQUc7UUFDcEMsSUFBTUMsSUFBSSxHQUFBQyxhQUFBLENBQUFBLGFBQUEsS0FBT0MsUUFBUSxHQUFLSCxPQUFPLENBQUM7UUFDdEMsSUFBTUksT0FBTyxHQUFHUixhQUFhLENBQUNTLElBQUksQ0FBQyxJQUFJLEVBQUVKLElBQUksQ0FBQztRQUU5QyxJQUFNSyxRQUFRLEdBQUcsSUFBSSxDQUFDQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3RDLElBQUlELFFBQVEsRUFBRTtVQUNaLElBQUksQ0FBQ0UsVUFBVSxDQUFDLFVBQVUsQ0FBQztVQUMzQkosT0FBTyxDQUFDSyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUNGLElBQUksQ0FBQyxVQUFVLEVBQUVELFFBQVEsQ0FBQztRQUNsRDtRQUVBLElBQUksQ0FBQ0ksTUFBTSxDQUFDTixPQUFPLENBQUM7UUFDcEIsT0FBTyxJQUFJO01BQ2IsQ0FBQztNQUVLRCxRQUFRLEdBQUc7UUFDZlEsUUFBUSx1UEFPUDtRQUNEQyxNQUFNLEVBQUUsU0FBQUEsT0FBVUMsS0FBSyxFQUFFO1VBQ3ZCLElBQUlBLEtBQUssRUFBRTtZQUNULElBQU1DLFNBQVMsR0FBR3BCLE1BQU0sQ0FBQ21CLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQ0UsTUFBTSxFQUFFO1lBQ3RELElBQU1DLFlBQVksR0FBRyxJQUFJQyxJQUFJLENBQUNILFNBQVMsQ0FBQztZQUN4QyxJQUFNSSxDQUFDLEdBQUdGLFlBQVksQ0FBQ0csT0FBTyxFQUFFO1lBQ2hDLElBQU1DLENBQUMsR0FBR0osWUFBWSxDQUFDSyxRQUFRLEVBQUU7WUFDakMsSUFBTUMsQ0FBQyxHQUFHTixZQUFZLENBQUNPLFdBQVcsRUFBRTtZQUNwQ1AsWUFBWSxDQUFDUSxjQUFjLENBQUNGLENBQUMsRUFBRUYsQ0FBQyxFQUFFRixDQUFDLENBQUM7WUFDcENGLFlBQVksQ0FBQ1MsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNwQyxPQUFPVCxZQUFZO1VBQ3JCO1VBQ0EsT0FBTyxJQUFJO1FBQ2IsQ0FBQztRQUNEVSxNQUFNLEVBQUU7TUFDVixDQUFDO0lBQUE7RUFBQTtBQUFBIn0=