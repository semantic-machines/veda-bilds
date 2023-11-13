"use strict";

System.register(["jquery", "autosize", "./veda_literal.js"], function (_export, _context) {
  "use strict";

  var $, autosize, veda_literal, defaults;
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
    }, function (_veda_literalJs) {
      veda_literal = _veda_literalJs.default;
    }],
    execute: function () {
      $.fn.veda_text = function (options) {
        var opts = _objectSpread(_objectSpread({}, defaults), options);
        var control = veda_literal.call(this, opts);
        var tabindex = this.attr('tabindex');
        if (tabindex) {
          this.removeAttr('tabindex');
          control.attr('tabindex', tabindex);
        }
        control.attr('rows', this.attr('rows'));
        autosize(control);
        this.on('edit', function () {
          return autosize.update(control);
        });
        this.one('remove', function () {
          return autosize.destroy(control);
        });
        this.append(control);
        return this;
      };
      defaults = {
        template: "<textarea class=\"form-control\" rows=\"1\" />",
        parser: function parser(input) {
          return input ? String(input) : null;
        },
        isSingle: true
      };
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfYXV0b3NpemUiLCJhdXRvc2l6ZSIsIl92ZWRhX2xpdGVyYWxKcyIsInZlZGFfbGl0ZXJhbCIsImV4ZWN1dGUiLCJmbiIsInZlZGFfdGV4dCIsIm9wdGlvbnMiLCJvcHRzIiwiX29iamVjdFNwcmVhZCIsImRlZmF1bHRzIiwiY29udHJvbCIsImNhbGwiLCJ0YWJpbmRleCIsImF0dHIiLCJyZW1vdmVBdHRyIiwib24iLCJ1cGRhdGUiLCJvbmUiLCJkZXN0cm95IiwiYXBwZW5kIiwidGVtcGxhdGUiLCJwYXJzZXIiLCJpbnB1dCIsIlN0cmluZyIsImlzU2luZ2xlIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc291cmNlLXdlYi9qcy9icm93c2VyL2NvbnRyb2xzL3ZlZGFfdGV4dC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUZXh0IGNvbnRyb2xcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuaW1wb3J0IGF1dG9zaXplIGZyb20gJ2F1dG9zaXplJztcblxuaW1wb3J0IHZlZGFfbGl0ZXJhbCBmcm9tICcuL3ZlZGFfbGl0ZXJhbC5qcyc7XG5cbiQuZm4udmVkYV90ZXh0ID0gZnVuY3Rpb24gKCBvcHRpb25zICkge1xuICBjb25zdCBvcHRzID0gey4uLmRlZmF1bHRzLCAuLi5vcHRpb25zfTtcbiAgY29uc3QgY29udHJvbCA9IHZlZGFfbGl0ZXJhbC5jYWxsKHRoaXMsIG9wdHMpO1xuXG4gIGNvbnN0IHRhYmluZGV4ID0gdGhpcy5hdHRyKCd0YWJpbmRleCcpO1xuICBpZiAodGFiaW5kZXgpIHtcbiAgICB0aGlzLnJlbW92ZUF0dHIoJ3RhYmluZGV4Jyk7XG4gICAgY29udHJvbC5hdHRyKCd0YWJpbmRleCcsIHRhYmluZGV4KTtcbiAgfVxuXG4gIGNvbnRyb2wuYXR0cigncm93cycsIHRoaXMuYXR0cigncm93cycpKTtcbiAgYXV0b3NpemUoY29udHJvbCk7XG4gIHRoaXMub24oJ2VkaXQnLCAoKSA9PiBhdXRvc2l6ZS51cGRhdGUoY29udHJvbCkpO1xuICB0aGlzLm9uZSgncmVtb3ZlJywgKCkgPT4gYXV0b3NpemUuZGVzdHJveShjb250cm9sKSk7XG4gIHRoaXMuYXBwZW5kKGNvbnRyb2wpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuICB0ZW1wbGF0ZTogYDx0ZXh0YXJlYSBjbGFzcz1cImZvcm0tY29udHJvbFwiIHJvd3M9XCIxXCIgLz5gLFxuICBwYXJzZXI6IGZ1bmN0aW9uIChpbnB1dCkge1xuICAgIHJldHVybiAoaW5wdXQgPyBTdHJpbmcoaW5wdXQpIDogbnVsbCk7XG4gIH0sXG4gIGlzU2luZ2xlOiB0cnVlLFxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7TUFFT0EsQ0FBQyxHQUFBQyxPQUFBLENBQUFDLE9BQUE7SUFBQSxhQUFBQyxTQUFBO01BRURDLFFBQVEsR0FBQUQsU0FBQSxDQUFBRCxPQUFBO0lBQUEsYUFBQUcsZUFBQTtNQUVSQyxZQUFZLEdBQUFELGVBQUEsQ0FBQUgsT0FBQTtJQUFBO0lBQUFLLE9BQUEsV0FBQUEsQ0FBQTtNQUVuQlAsQ0FBQyxDQUFDUSxFQUFFLENBQUNDLFNBQVMsR0FBRyxVQUFXQyxPQUFPLEVBQUc7UUFDcEMsSUFBTUMsSUFBSSxHQUFBQyxhQUFBLENBQUFBLGFBQUEsS0FBT0MsUUFBUSxHQUFLSCxPQUFPLENBQUM7UUFDdEMsSUFBTUksT0FBTyxHQUFHUixZQUFZLENBQUNTLElBQUksQ0FBQyxJQUFJLEVBQUVKLElBQUksQ0FBQztRQUU3QyxJQUFNSyxRQUFRLEdBQUcsSUFBSSxDQUFDQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3RDLElBQUlELFFBQVEsRUFBRTtVQUNaLElBQUksQ0FBQ0UsVUFBVSxDQUFDLFVBQVUsQ0FBQztVQUMzQkosT0FBTyxDQUFDRyxJQUFJLENBQUMsVUFBVSxFQUFFRCxRQUFRLENBQUM7UUFDcEM7UUFFQUYsT0FBTyxDQUFDRyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQ0EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZDYixRQUFRLENBQUNVLE9BQU8sQ0FBQztRQUNqQixJQUFJLENBQUNLLEVBQUUsQ0FBQyxNQUFNLEVBQUU7VUFBQSxPQUFNZixRQUFRLENBQUNnQixNQUFNLENBQUNOLE9BQU8sQ0FBQztRQUFBLEVBQUM7UUFDL0MsSUFBSSxDQUFDTyxHQUFHLENBQUMsUUFBUSxFQUFFO1VBQUEsT0FBTWpCLFFBQVEsQ0FBQ2tCLE9BQU8sQ0FBQ1IsT0FBTyxDQUFDO1FBQUEsRUFBQztRQUNuRCxJQUFJLENBQUNTLE1BQU0sQ0FBQ1QsT0FBTyxDQUFDO1FBQ3BCLE9BQU8sSUFBSTtNQUNiLENBQUM7TUFFS0QsUUFBUSxHQUFHO1FBQ2ZXLFFBQVEsa0RBQThDO1FBQ3REQyxNQUFNLEVBQUUsU0FBQUEsT0FBVUMsS0FBSyxFQUFFO1VBQ3ZCLE9BQVFBLEtBQUssR0FBR0MsTUFBTSxDQUFDRCxLQUFLLENBQUMsR0FBRyxJQUFJO1FBQ3RDLENBQUM7UUFDREUsUUFBUSxFQUFFO01BQ1osQ0FBQztJQUFBO0VBQUE7QUFBQSJ9