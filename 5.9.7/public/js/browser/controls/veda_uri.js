"use strict";

System.register(["jquery"], function (_export, _context) {
  "use strict";

  var $, defaults;
  function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }],
    execute: function () {
      $.fn.veda_uri = function (options) {
        var opts = _objectSpread(_objectSpread({}, defaults), options);
        var control = $(opts.template);
        var individual = opts.individual;
        var tabindex = this.attr('tabindex');
        if (tabindex) {
          this.removeAttr('tabindex');
          control.attr('tabindex', tabindex);
        }
        this.on('view edit search', function (e) {
          e.stopPropagation();
        });
        control.attr({
          'placeholder': individual.id
        }).on('change focusout', changeHandler);

        /**
         * Input change handler
         * @return {void}
         */
        function changeHandler() {
          if (control.val()) {
            individual.id = control.val().replaceAll(' ', '');
          }
        }
        individual.on('idChanged', function () {
          control.attr('placeholder', individual.id);
        });
        this.append(control);
        return this;
      };
      defaults = {
        template: "<input type=\"text\" class=\"form-control\" autocomplete=\"on\" />"
      };
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiZm4iLCJ2ZWRhX3VyaSIsIm9wdGlvbnMiLCJvcHRzIiwiX29iamVjdFNwcmVhZCIsImRlZmF1bHRzIiwiY29udHJvbCIsInRlbXBsYXRlIiwiaW5kaXZpZHVhbCIsInRhYmluZGV4IiwiYXR0ciIsInJlbW92ZUF0dHIiLCJvbiIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJpZCIsImNoYW5nZUhhbmRsZXIiLCJ2YWwiLCJyZXBsYWNlQWxsIiwiYXBwZW5kIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc291cmNlLXdlYi9qcy9icm93c2VyL2NvbnRyb2xzL3ZlZGFfdXJpLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFVyaSBjb250cm9sXG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbiQuZm4udmVkYV91cmkgPSBmdW5jdGlvbiAoIG9wdGlvbnMgKSB7XG4gIGNvbnN0IG9wdHMgPSB7Li4uZGVmYXVsdHMsIC4uLm9wdGlvbnN9O1xuICBjb25zdCBjb250cm9sID0gJCggb3B0cy50ZW1wbGF0ZSApO1xuICBjb25zdCBpbmRpdmlkdWFsID0gb3B0cy5pbmRpdmlkdWFsO1xuXG4gIGNvbnN0IHRhYmluZGV4ID0gdGhpcy5hdHRyKCd0YWJpbmRleCcpO1xuICBpZiAodGFiaW5kZXgpIHtcbiAgICB0aGlzLnJlbW92ZUF0dHIoJ3RhYmluZGV4Jyk7XG4gICAgY29udHJvbC5hdHRyKCd0YWJpbmRleCcsIHRhYmluZGV4KTtcbiAgfVxuXG4gIHRoaXMub24oJ3ZpZXcgZWRpdCBzZWFyY2gnLCBmdW5jdGlvbiAoZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xuXG4gIGNvbnRyb2wuYXR0cih7XG4gICAgJ3BsYWNlaG9sZGVyJzogaW5kaXZpZHVhbC5pZCxcbiAgfSkub24oJ2NoYW5nZSBmb2N1c291dCcsIGNoYW5nZUhhbmRsZXIpO1xuXG4gIC8qKlxuICAgKiBJbnB1dCBjaGFuZ2UgaGFuZGxlclxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgZnVuY3Rpb24gY2hhbmdlSGFuZGxlciAoKSB7XG4gICAgaWYgKGNvbnRyb2wudmFsKCkpIHtcbiAgICAgIGluZGl2aWR1YWwuaWQgPSBjb250cm9sLnZhbCgpLnJlcGxhY2VBbGwoJyAnLCAnJyk7XG4gICAgfVxuICB9XG5cbiAgaW5kaXZpZHVhbC5vbignaWRDaGFuZ2VkJywgZnVuY3Rpb24gKCkge1xuICAgIGNvbnRyb2wuYXR0cigncGxhY2Vob2xkZXInLCBpbmRpdmlkdWFsLmlkKTtcbiAgfSk7XG5cbiAgdGhpcy5hcHBlbmQoY29udHJvbCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gIHRlbXBsYXRlOiBgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBhdXRvY29tcGxldGU9XCJvblwiIC8+YCxcbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O01BRU9BLENBQUMsR0FBQUMsT0FBQSxDQUFBQyxPQUFBO0lBQUE7SUFBQUMsT0FBQSxXQUFBQSxDQUFBO01BRVJILENBQUMsQ0FBQ0ksRUFBRSxDQUFDQyxRQUFRLEdBQUcsVUFBV0MsT0FBTyxFQUFHO1FBQ25DLElBQU1DLElBQUksR0FBQUMsYUFBQSxDQUFBQSxhQUFBLEtBQU9DLFFBQVEsR0FBS0gsT0FBTyxDQUFDO1FBQ3RDLElBQU1JLE9BQU8sR0FBR1YsQ0FBQyxDQUFFTyxJQUFJLENBQUNJLFFBQVEsQ0FBRTtRQUNsQyxJQUFNQyxVQUFVLEdBQUdMLElBQUksQ0FBQ0ssVUFBVTtRQUVsQyxJQUFNQyxRQUFRLEdBQUcsSUFBSSxDQUFDQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3RDLElBQUlELFFBQVEsRUFBRTtVQUNaLElBQUksQ0FBQ0UsVUFBVSxDQUFDLFVBQVUsQ0FBQztVQUMzQkwsT0FBTyxDQUFDSSxJQUFJLENBQUMsVUFBVSxFQUFFRCxRQUFRLENBQUM7UUFDcEM7UUFFQSxJQUFJLENBQUNHLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxVQUFVQyxDQUFDLEVBQUU7VUFDdkNBLENBQUMsQ0FBQ0MsZUFBZSxFQUFFO1FBQ3JCLENBQUMsQ0FBQztRQUVGUixPQUFPLENBQUNJLElBQUksQ0FBQztVQUNYLGFBQWEsRUFBRUYsVUFBVSxDQUFDTztRQUM1QixDQUFDLENBQUMsQ0FBQ0gsRUFBRSxDQUFDLGlCQUFpQixFQUFFSSxhQUFhLENBQUM7O1FBRXZDO0FBQ0Y7QUFDQTtBQUNBO1FBQ0UsU0FBU0EsYUFBYUEsQ0FBQSxFQUFJO1VBQ3hCLElBQUlWLE9BQU8sQ0FBQ1csR0FBRyxFQUFFLEVBQUU7WUFDakJULFVBQVUsQ0FBQ08sRUFBRSxHQUFHVCxPQUFPLENBQUNXLEdBQUcsRUFBRSxDQUFDQyxVQUFVLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQztVQUNuRDtRQUNGO1FBRUFWLFVBQVUsQ0FBQ0ksRUFBRSxDQUFDLFdBQVcsRUFBRSxZQUFZO1VBQ3JDTixPQUFPLENBQUNJLElBQUksQ0FBQyxhQUFhLEVBQUVGLFVBQVUsQ0FBQ08sRUFBRSxDQUFDO1FBQzVDLENBQUMsQ0FBQztRQUVGLElBQUksQ0FBQ0ksTUFBTSxDQUFDYixPQUFPLENBQUM7UUFDcEIsT0FBTyxJQUFJO01BQ2IsQ0FBQztNQUVLRCxRQUFRLEdBQUc7UUFDZkUsUUFBUTtNQUNWLENBQUM7SUFBQTtFQUFBO0FBQUEifQ==