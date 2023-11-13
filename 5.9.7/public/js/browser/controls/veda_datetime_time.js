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
      $.fn.veda_time = function (options) {
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
            var timestamp = moment(input, 'HH:mm').toDate();
            var result = new Date(timestamp);
            result.setFullYear(1970);
            result.setMonth(0);
            result.setDate(1);
            return result;
          }
          return null;
        },
        format: 'HH:mm'
      };
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfbW9tZW50IiwibW9tZW50IiwiX3ZlZGFfZGF0ZXRpbWVKcyIsInZlZGFfZGF0ZVRpbWUiLCJleGVjdXRlIiwiZm4iLCJ2ZWRhX3RpbWUiLCJvcHRpb25zIiwib3B0cyIsIl9vYmplY3RTcHJlYWQiLCJkZWZhdWx0cyIsImNvbnRyb2wiLCJjYWxsIiwidGFiaW5kZXgiLCJhdHRyIiwicmVtb3ZlQXR0ciIsImZpbmQiLCJhcHBlbmQiLCJ0ZW1wbGF0ZSIsInBhcnNlciIsImlucHV0IiwidGltZXN0YW1wIiwidG9EYXRlIiwicmVzdWx0IiwiRGF0ZSIsInNldEZ1bGxZZWFyIiwic2V0TW9udGgiLCJzZXREYXRlIiwiZm9ybWF0Il0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc291cmNlLXdlYi9qcy9icm93c2VyL2NvbnRyb2xzL3ZlZGFfZGF0ZXRpbWVfdGltZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaW1lIGNvbnRyb2xcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG5pbXBvcnQgdmVkYV9kYXRlVGltZSBmcm9tICcuL3ZlZGFfZGF0ZXRpbWUuanMnO1xuXG4kLmZuLnZlZGFfdGltZSA9IGZ1bmN0aW9uICggb3B0aW9ucyApIHtcbiAgY29uc3Qgb3B0cyA9IHsuLi5kZWZhdWx0cywgLi4ub3B0aW9uc307XG4gIGNvbnN0IGNvbnRyb2wgPSB2ZWRhX2RhdGVUaW1lLmNhbGwodGhpcywgb3B0cyk7XG5cbiAgY29uc3QgdGFiaW5kZXggPSB0aGlzLmF0dHIoJ3RhYmluZGV4Jyk7XG4gIGlmICh0YWJpbmRleCkge1xuICAgIHRoaXMucmVtb3ZlQXR0cigndGFiaW5kZXgnKTtcbiAgICBjb250cm9sLmZpbmQoJ2lucHV0JykuYXR0cigndGFiaW5kZXgnLCB0YWJpbmRleCk7XG4gIH1cblxuICB0aGlzLmFwcGVuZChjb250cm9sKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAgZGF0ZVwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvblwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tdGltZVwiPjwvc3Bhbj5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgYXV0b2NvbXBsZXRlPVwib2ZmXCIvPlxuICAgIDwvZGl2PlxuICBgLFxuICBwYXJzZXI6IGZ1bmN0aW9uIChpbnB1dCkge1xuICAgIGlmIChpbnB1dCkge1xuICAgICAgY29uc3QgdGltZXN0YW1wID0gbW9tZW50KGlucHV0LCAnSEg6bW0nKS50b0RhdGUoKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBEYXRlKHRpbWVzdGFtcCk7XG4gICAgICByZXN1bHQuc2V0RnVsbFllYXIoMTk3MCk7XG4gICAgICByZXN1bHQuc2V0TW9udGgoMCk7XG4gICAgICByZXN1bHQuc2V0RGF0ZSgxKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9LFxuICBmb3JtYXQ6ICdISDptbScsXG59O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztNQUVPQSxDQUFDLEdBQUFDLE9BQUEsQ0FBQUMsT0FBQTtJQUFBLGFBQUFDLE9BQUE7TUFFREMsTUFBTSxHQUFBRCxPQUFBLENBQUFELE9BQUE7SUFBQSxhQUFBRyxnQkFBQTtNQUVOQyxhQUFhLEdBQUFELGdCQUFBLENBQUFILE9BQUE7SUFBQTtJQUFBSyxPQUFBLFdBQUFBLENBQUE7TUFFcEJQLENBQUMsQ0FBQ1EsRUFBRSxDQUFDQyxTQUFTLEdBQUcsVUFBV0MsT0FBTyxFQUFHO1FBQ3BDLElBQU1DLElBQUksR0FBQUMsYUFBQSxDQUFBQSxhQUFBLEtBQU9DLFFBQVEsR0FBS0gsT0FBTyxDQUFDO1FBQ3RDLElBQU1JLE9BQU8sR0FBR1IsYUFBYSxDQUFDUyxJQUFJLENBQUMsSUFBSSxFQUFFSixJQUFJLENBQUM7UUFFOUMsSUFBTUssUUFBUSxHQUFHLElBQUksQ0FBQ0MsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN0QyxJQUFJRCxRQUFRLEVBQUU7VUFDWixJQUFJLENBQUNFLFVBQVUsQ0FBQyxVQUFVLENBQUM7VUFDM0JKLE9BQU8sQ0FBQ0ssSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDRixJQUFJLENBQUMsVUFBVSxFQUFFRCxRQUFRLENBQUM7UUFDbEQ7UUFFQSxJQUFJLENBQUNJLE1BQU0sQ0FBQ04sT0FBTyxDQUFDO1FBQ3BCLE9BQU8sSUFBSTtNQUNiLENBQUM7TUFFS0QsUUFBUSxHQUFHO1FBQ2ZRLFFBQVEsdVBBT1A7UUFDREMsTUFBTSxFQUFFLFNBQUFBLE9BQVVDLEtBQUssRUFBRTtVQUN2QixJQUFJQSxLQUFLLEVBQUU7WUFDVCxJQUFNQyxTQUFTLEdBQUdwQixNQUFNLENBQUNtQixLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUNFLE1BQU0sRUFBRTtZQUNqRCxJQUFNQyxNQUFNLEdBQUcsSUFBSUMsSUFBSSxDQUFDSCxTQUFTLENBQUM7WUFDbENFLE1BQU0sQ0FBQ0UsV0FBVyxDQUFDLElBQUksQ0FBQztZQUN4QkYsTUFBTSxDQUFDRyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2xCSCxNQUFNLENBQUNJLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDakIsT0FBT0osTUFBTTtVQUNmO1VBQ0EsT0FBTyxJQUFJO1FBQ2IsQ0FBQztRQUNESyxNQUFNLEVBQUU7TUFDVixDQUFDO0lBQUE7RUFBQTtBQUFBIn0=