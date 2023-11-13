"use strict";

System.register(["jquery", "../../common/veda.js", "./veda_multilingual.js"], function (_export, _context) {
  "use strict";

  var $, veda, veda_multilingual, defaults;
  function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_commonVedaJs) {
      veda = _commonVedaJs.default;
    }, function (_veda_multilingualJs) {
      veda_multilingual = _veda_multilingualJs.default;
    }],
    execute: function () {
      $.fn.veda_multilingualString = function (options) {
        var _this = this;
        var opts = _objectSpread(_objectSpread({}, defaults), options);
        var init = function init() {
          _this.empty();
          veda_multilingual.call(_this, opts);
        };
        init();
        veda.on('language:changed', init);
        this.one('remove', function () {
          veda.off('language:changed', init);
        });
        return this;
      };
      defaults = {
        template: "\n<div class=\"input-group\">\n  <div class=\"input-group-addon\"><small class=\"language-tag\"></small></div>\n  <input type=\"text\" class=\"form-control\" lang=\"\" autocomplete=\"on\" />\n</div>\n  "
      };
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfY29tbW9uVmVkYUpzIiwidmVkYSIsIl92ZWRhX211bHRpbGluZ3VhbEpzIiwidmVkYV9tdWx0aWxpbmd1YWwiLCJleGVjdXRlIiwiZm4iLCJ2ZWRhX211bHRpbGluZ3VhbFN0cmluZyIsIm9wdGlvbnMiLCJfdGhpcyIsIm9wdHMiLCJfb2JqZWN0U3ByZWFkIiwiZGVmYXVsdHMiLCJpbml0IiwiZW1wdHkiLCJjYWxsIiwib24iLCJvbmUiLCJvZmYiLCJ0ZW1wbGF0ZSJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NvdXJjZS13ZWIvanMvYnJvd3Nlci9jb250cm9scy92ZWRhX211bHRpbGluZ3VhbF9zdHJpbmcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gTXVsdGlsaW5ndWFsIHN0cmluZyBjb250cm9sXG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmltcG9ydCB2ZWRhIGZyb20gJy4uLy4uL2NvbW1vbi92ZWRhLmpzJztcblxuaW1wb3J0IHZlZGFfbXVsdGlsaW5ndWFsIGZyb20gJy4vdmVkYV9tdWx0aWxpbmd1YWwuanMnO1xuXG4kLmZuLnZlZGFfbXVsdGlsaW5ndWFsU3RyaW5nID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgY29uc3Qgb3B0cyA9IHsuLi5kZWZhdWx0cywgLi4ub3B0aW9uc307XG4gIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgdGhpcy5lbXB0eSgpO1xuICAgIHZlZGFfbXVsdGlsaW5ndWFsLmNhbGwodGhpcywgb3B0cyk7XG4gIH07XG4gIGluaXQoKTtcbiAgdmVkYS5vbignbGFuZ3VhZ2U6Y2hhbmdlZCcsIGluaXQpO1xuICB0aGlzLm9uZSgncmVtb3ZlJywgZnVuY3Rpb24gKCkge1xuICAgIHZlZGEub2ZmKCdsYW5ndWFnZTpjaGFuZ2VkJywgaW5pdCk7XG4gIH0pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuICB0ZW1wbGF0ZTogYFxuPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG4gIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvblwiPjxzbWFsbCBjbGFzcz1cImxhbmd1YWdlLXRhZ1wiPjwvc21hbGw+PC9kaXY+XG4gIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgbGFuZz1cIlwiIGF1dG9jb21wbGV0ZT1cIm9uXCIgLz5cbjwvZGl2PlxuICBgLFxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7TUFFT0EsQ0FBQyxHQUFBQyxPQUFBLENBQUFDLE9BQUE7SUFBQSxhQUFBQyxhQUFBO01BRURDLElBQUksR0FBQUQsYUFBQSxDQUFBRCxPQUFBO0lBQUEsYUFBQUcsb0JBQUE7TUFFSkMsaUJBQWlCLEdBQUFELG9CQUFBLENBQUFILE9BQUE7SUFBQTtJQUFBSyxPQUFBLFdBQUFBLENBQUE7TUFFeEJQLENBQUMsQ0FBQ1EsRUFBRSxDQUFDQyx1QkFBdUIsR0FBRyxVQUFVQyxPQUFPLEVBQUU7UUFBQSxJQUFBQyxLQUFBO1FBQ2hELElBQU1DLElBQUksR0FBQUMsYUFBQSxDQUFBQSxhQUFBLEtBQU9DLFFBQVEsR0FBS0osT0FBTyxDQUFDO1FBQ3RDLElBQU1LLElBQUksR0FBRyxTQUFQQSxJQUFJQSxDQUFBLEVBQVM7VUFDakJKLEtBQUksQ0FBQ0ssS0FBSyxFQUFFO1VBQ1pWLGlCQUFpQixDQUFDVyxJQUFJLENBQUNOLEtBQUksRUFBRUMsSUFBSSxDQUFDO1FBQ3BDLENBQUM7UUFDREcsSUFBSSxFQUFFO1FBQ05YLElBQUksQ0FBQ2MsRUFBRSxDQUFDLGtCQUFrQixFQUFFSCxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDSSxHQUFHLENBQUMsUUFBUSxFQUFFLFlBQVk7VUFDN0JmLElBQUksQ0FBQ2dCLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRUwsSUFBSSxDQUFDO1FBQ3BDLENBQUMsQ0FBQztRQUNGLE9BQU8sSUFBSTtNQUNiLENBQUM7TUFFS0QsUUFBUSxHQUFHO1FBQ2ZPLFFBQVE7TUFNVixDQUFDO0lBQUE7RUFBQTtBQUFBIn0=