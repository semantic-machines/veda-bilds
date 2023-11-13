"use strict";

System.register(["jquery", "autosize", "../../common/veda.js", "./veda_multilingual.js"], function (_export, _context) {
  "use strict";

  var $, autosize, veda, veda_multilingual, defaults;
  function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_autosize) {
      autosize = _autosize.default;
    }, function (_commonVedaJs) {
      veda = _commonVedaJs.default;
    }, function (_veda_multilingualJs) {
      veda_multilingual = _veda_multilingualJs.default;
    }],
    execute: function () {
      $.fn.veda_multilingualText = function (options) {
        var _this = this;
        var opts = _objectSpread(_objectSpread({}, defaults), options);
        var init = function init() {
          _this.empty();
          veda_multilingual.call(_this, opts);
          var ta = $('textarea', self);
          ta.attr('rows', _this.attr('rows'));
          autosize(ta);
          _this.on('edit', function () {
            return autosize.update(ta);
          });
          _this.one('remove', function () {
            return autosize.destroy(ta);
          });
        };
        init();
        veda.on('language:changed', init);
        this.one('remove', function () {
          return veda.off('language:changed', init);
        });
        return this;
      };
      defaults = {
        template: "\n<div class=\"input-group\">\n  <div class=\"input-group-addon\"><small class=\"language-tag\"></small></div>\n  <textarea class=\"form-control\" lang=\"\" rows=\"1\"></textarea>\n</div>\n  "
      };
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfYXV0b3NpemUiLCJhdXRvc2l6ZSIsIl9jb21tb25WZWRhSnMiLCJ2ZWRhIiwiX3ZlZGFfbXVsdGlsaW5ndWFsSnMiLCJ2ZWRhX211bHRpbGluZ3VhbCIsImV4ZWN1dGUiLCJmbiIsInZlZGFfbXVsdGlsaW5ndWFsVGV4dCIsIm9wdGlvbnMiLCJfdGhpcyIsIm9wdHMiLCJfb2JqZWN0U3ByZWFkIiwiZGVmYXVsdHMiLCJpbml0IiwiZW1wdHkiLCJjYWxsIiwidGEiLCJzZWxmIiwiYXR0ciIsIm9uIiwidXBkYXRlIiwib25lIiwiZGVzdHJveSIsIm9mZiIsInRlbXBsYXRlIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc291cmNlLXdlYi9qcy9icm93c2VyL2NvbnRyb2xzL3ZlZGFfbXVsdGlsaW5ndWFsX3RleHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gTXVsdGlsaW5ndWFsIHRleHQgY29udHJvbFxuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG5pbXBvcnQgYXV0b3NpemUgZnJvbSAnYXV0b3NpemUnO1xuXG5pbXBvcnQgdmVkYSBmcm9tICcuLi8uLi9jb21tb24vdmVkYS5qcyc7XG5cbmltcG9ydCB2ZWRhX211bHRpbGluZ3VhbCBmcm9tICcuL3ZlZGFfbXVsdGlsaW5ndWFsLmpzJztcblxuJC5mbi52ZWRhX211bHRpbGluZ3VhbFRleHQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICBjb25zdCBvcHRzID0gey4uLmRlZmF1bHRzLCAuLi5vcHRpb25zfTtcbiAgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICB0aGlzLmVtcHR5KCk7XG4gICAgdmVkYV9tdWx0aWxpbmd1YWwuY2FsbCh0aGlzLCBvcHRzKTtcbiAgICBjb25zdCB0YSA9ICQoJ3RleHRhcmVhJywgc2VsZik7XG4gICAgdGEuYXR0cigncm93cycsIHRoaXMuYXR0cigncm93cycpKTtcbiAgICBhdXRvc2l6ZSh0YSk7XG4gICAgdGhpcy5vbignZWRpdCcsICgpID0+IGF1dG9zaXplLnVwZGF0ZSh0YSkpO1xuICAgIHRoaXMub25lKCdyZW1vdmUnLCAoKSA9PiBhdXRvc2l6ZS5kZXN0cm95KHRhKSk7XG4gIH07XG4gIGluaXQoKTtcbiAgdmVkYS5vbignbGFuZ3VhZ2U6Y2hhbmdlZCcsIGluaXQpO1xuICB0aGlzLm9uZSgncmVtb3ZlJywgKCkgPT4gdmVkYS5vZmYoJ2xhbmd1YWdlOmNoYW5nZWQnLCBpbml0KSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gIHRlbXBsYXRlOiBgXG48ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uXCI+PHNtYWxsIGNsYXNzPVwibGFuZ3VhZ2UtdGFnXCI+PC9zbWFsbD48L2Rpdj5cbiAgPHRleHRhcmVhIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgbGFuZz1cIlwiIHJvd3M9XCIxXCI+PC90ZXh0YXJlYT5cbjwvZGl2PlxuICBgLFxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7TUFFT0EsQ0FBQyxHQUFBQyxPQUFBLENBQUFDLE9BQUE7SUFBQSxhQUFBQyxTQUFBO01BRURDLFFBQVEsR0FBQUQsU0FBQSxDQUFBRCxPQUFBO0lBQUEsYUFBQUcsYUFBQTtNQUVSQyxJQUFJLEdBQUFELGFBQUEsQ0FBQUgsT0FBQTtJQUFBLGFBQUFLLG9CQUFBO01BRUpDLGlCQUFpQixHQUFBRCxvQkFBQSxDQUFBTCxPQUFBO0lBQUE7SUFBQU8sT0FBQSxXQUFBQSxDQUFBO01BRXhCVCxDQUFDLENBQUNVLEVBQUUsQ0FBQ0MscUJBQXFCLEdBQUcsVUFBVUMsT0FBTyxFQUFFO1FBQUEsSUFBQUMsS0FBQTtRQUM5QyxJQUFNQyxJQUFJLEdBQUFDLGFBQUEsQ0FBQUEsYUFBQSxLQUFPQyxRQUFRLEdBQUtKLE9BQU8sQ0FBQztRQUN0QyxJQUFNSyxJQUFJLEdBQUcsU0FBUEEsSUFBSUEsQ0FBQSxFQUFTO1VBQ2pCSixLQUFJLENBQUNLLEtBQUssRUFBRTtVQUNaVixpQkFBaUIsQ0FBQ1csSUFBSSxDQUFDTixLQUFJLEVBQUVDLElBQUksQ0FBQztVQUNsQyxJQUFNTSxFQUFFLEdBQUdwQixDQUFDLENBQUMsVUFBVSxFQUFFcUIsSUFBSSxDQUFDO1VBQzlCRCxFQUFFLENBQUNFLElBQUksQ0FBQyxNQUFNLEVBQUVULEtBQUksQ0FBQ1MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1VBQ2xDbEIsUUFBUSxDQUFDZ0IsRUFBRSxDQUFDO1VBQ1pQLEtBQUksQ0FBQ1UsRUFBRSxDQUFDLE1BQU0sRUFBRTtZQUFBLE9BQU1uQixRQUFRLENBQUNvQixNQUFNLENBQUNKLEVBQUUsQ0FBQztVQUFBLEVBQUM7VUFDMUNQLEtBQUksQ0FBQ1ksR0FBRyxDQUFDLFFBQVEsRUFBRTtZQUFBLE9BQU1yQixRQUFRLENBQUNzQixPQUFPLENBQUNOLEVBQUUsQ0FBQztVQUFBLEVBQUM7UUFDaEQsQ0FBQztRQUNESCxJQUFJLEVBQUU7UUFDTlgsSUFBSSxDQUFDaUIsRUFBRSxDQUFDLGtCQUFrQixFQUFFTixJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDUSxHQUFHLENBQUMsUUFBUSxFQUFFO1VBQUEsT0FBTW5CLElBQUksQ0FBQ3FCLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRVYsSUFBSSxDQUFDO1FBQUEsRUFBQztRQUM1RCxPQUFPLElBQUk7TUFDYixDQUFDO01BRUtELFFBQVEsR0FBRztRQUNmWSxRQUFRO01BTVYsQ0FBQztJQUFBO0VBQUE7QUFBQSJ9