"use strict";

System.register(["jquery", "../../common/individual_model.js", "./veda_literal.js"], function (_export, _context) {
  "use strict";

  var $, IndividualModel, veda_literal, defaults;
  function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_commonIndividual_modelJs) {
      IndividualModel = _commonIndividual_modelJs.default;
    }, function (_veda_literalJs) {
      veda_literal = _veda_literalJs.default;
    }],
    execute: function () {
      $.fn.veda_generic = function (options) {
        var opts = _objectSpread(_objectSpread({}, defaults), options);
        var control = veda_literal.call(this, opts);
        var tabindex = this.attr('tabindex');
        if (tabindex) {
          this.removeAttr('tabindex');
          control.attr('tabindex', tabindex);
        }
        this.append(control);
        return this;
      };
      defaults = {
        template: "<input type=\"text\" class=\"form-control\" autocomplete=\"on\" />",
        parser: function parser(input) {
          if (!input || !input.trim()) {
            return null;
          } else if (Date.parse(input) && /^\d{4}-\d{2}-\d{2}.*$/.test(input)) {
            return new Date(input);
          } else if (!isNaN(input.split(' ').join('').split(',').join('.'))) {
            return parseFloat(input.split(' ').join('').split(',').join('.'));
          } else if (input === 'true') {
            return true;
          } else if (input === 'false') {
            return false;
          } else {
            var individ = new IndividualModel(input);
            if (individ.isSync() && !individ.isNew()) {
              return individ;
            }
          }
          return input;
        }
      };
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfY29tbW9uSW5kaXZpZHVhbF9tb2RlbEpzIiwiSW5kaXZpZHVhbE1vZGVsIiwiX3ZlZGFfbGl0ZXJhbEpzIiwidmVkYV9saXRlcmFsIiwiZXhlY3V0ZSIsImZuIiwidmVkYV9nZW5lcmljIiwib3B0aW9ucyIsIm9wdHMiLCJfb2JqZWN0U3ByZWFkIiwiZGVmYXVsdHMiLCJjb250cm9sIiwiY2FsbCIsInRhYmluZGV4IiwiYXR0ciIsInJlbW92ZUF0dHIiLCJhcHBlbmQiLCJ0ZW1wbGF0ZSIsInBhcnNlciIsImlucHV0IiwidHJpbSIsIkRhdGUiLCJwYXJzZSIsInRlc3QiLCJpc05hTiIsInNwbGl0Iiwiam9pbiIsInBhcnNlRmxvYXQiLCJpbmRpdmlkIiwiaXNTeW5jIiwiaXNOZXciXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zb3VyY2Utd2ViL2pzL2Jyb3dzZXIvY29udHJvbHMvdmVkYV9nZW5lcmljLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEdlbmVyaWMgY29udHJvbFxuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG5pbXBvcnQgSW5kaXZpZHVhbE1vZGVsIGZyb20gJy4uLy4uL2NvbW1vbi9pbmRpdmlkdWFsX21vZGVsLmpzJztcblxuaW1wb3J0IHZlZGFfbGl0ZXJhbCBmcm9tICcuL3ZlZGFfbGl0ZXJhbC5qcyc7XG5cbiQuZm4udmVkYV9nZW5lcmljID0gZnVuY3Rpb24gKCBvcHRpb25zICkge1xuICBjb25zdCBvcHRzID0gey4uLmRlZmF1bHRzLCAuLi5vcHRpb25zfTtcbiAgY29uc3QgY29udHJvbCA9IHZlZGFfbGl0ZXJhbC5jYWxsKHRoaXMsIG9wdHMpO1xuXG4gIGNvbnN0IHRhYmluZGV4ID0gdGhpcy5hdHRyKCd0YWJpbmRleCcpO1xuICBpZiAodGFiaW5kZXgpIHtcbiAgICB0aGlzLnJlbW92ZUF0dHIoJ3RhYmluZGV4Jyk7XG4gICAgY29udHJvbC5hdHRyKCd0YWJpbmRleCcsIHRhYmluZGV4KTtcbiAgfVxuXG4gIHRoaXMuYXBwZW5kKGNvbnRyb2wpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuICB0ZW1wbGF0ZTogYDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgYXV0b2NvbXBsZXRlPVwib25cIiAvPmAsXG4gIHBhcnNlcjogZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgaWYgKCFpbnB1dCB8fCAhaW5wdXQudHJpbSgpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2UgaWYgKCBEYXRlLnBhcnNlKGlucHV0KSAmJiAoL15cXGR7NH0tXFxkezJ9LVxcZHsyfS4qJC8pLnRlc3QoaW5wdXQpICkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKGlucHV0KTtcbiAgICB9IGVsc2UgaWYgKCAhaXNOYU4oIGlucHV0LnNwbGl0KCcgJykuam9pbignJykuc3BsaXQoJywnKS5qb2luKCcuJykgKSApIHtcbiAgICAgIHJldHVybiBwYXJzZUZsb2F0KCBpbnB1dC5zcGxpdCgnICcpLmpvaW4oJycpLnNwbGl0KCcsJykuam9pbignLicpICk7XG4gICAgfSBlbHNlIGlmICggaW5wdXQgPT09ICd0cnVlJyApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSBpZiAoIGlucHV0ID09PSAnZmFsc2UnICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpbmRpdmlkID0gbmV3IEluZGl2aWR1YWxNb2RlbChpbnB1dCk7XG4gICAgICBpZiAoIGluZGl2aWQuaXNTeW5jKCkgJiYgIWluZGl2aWQuaXNOZXcoKSApIHtcbiAgICAgICAgcmV0dXJuIGluZGl2aWQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpbnB1dDtcbiAgfSxcbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O01BRU9BLENBQUMsR0FBQUMsT0FBQSxDQUFBQyxPQUFBO0lBQUEsYUFBQUMseUJBQUE7TUFFREMsZUFBZSxHQUFBRCx5QkFBQSxDQUFBRCxPQUFBO0lBQUEsYUFBQUcsZUFBQTtNQUVmQyxZQUFZLEdBQUFELGVBQUEsQ0FBQUgsT0FBQTtJQUFBO0lBQUFLLE9BQUEsV0FBQUEsQ0FBQTtNQUVuQlAsQ0FBQyxDQUFDUSxFQUFFLENBQUNDLFlBQVksR0FBRyxVQUFXQyxPQUFPLEVBQUc7UUFDdkMsSUFBTUMsSUFBSSxHQUFBQyxhQUFBLENBQUFBLGFBQUEsS0FBT0MsUUFBUSxHQUFLSCxPQUFPLENBQUM7UUFDdEMsSUFBTUksT0FBTyxHQUFHUixZQUFZLENBQUNTLElBQUksQ0FBQyxJQUFJLEVBQUVKLElBQUksQ0FBQztRQUU3QyxJQUFNSyxRQUFRLEdBQUcsSUFBSSxDQUFDQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3RDLElBQUlELFFBQVEsRUFBRTtVQUNaLElBQUksQ0FBQ0UsVUFBVSxDQUFDLFVBQVUsQ0FBQztVQUMzQkosT0FBTyxDQUFDRyxJQUFJLENBQUMsVUFBVSxFQUFFRCxRQUFRLENBQUM7UUFDcEM7UUFFQSxJQUFJLENBQUNHLE1BQU0sQ0FBQ0wsT0FBTyxDQUFDO1FBQ3BCLE9BQU8sSUFBSTtNQUNiLENBQUM7TUFFS0QsUUFBUSxHQUFHO1FBQ2ZPLFFBQVEsc0VBQWdFO1FBQ3hFQyxNQUFNLEVBQUUsU0FBQUEsT0FBVUMsS0FBSyxFQUFFO1VBQ3ZCLElBQUksQ0FBQ0EsS0FBSyxJQUFJLENBQUNBLEtBQUssQ0FBQ0MsSUFBSSxFQUFFLEVBQUU7WUFDM0IsT0FBTyxJQUFJO1VBQ2IsQ0FBQyxNQUFNLElBQUtDLElBQUksQ0FBQ0MsS0FBSyxDQUFDSCxLQUFLLENBQUMsSUFBSyx1QkFBdUIsQ0FBRUksSUFBSSxDQUFDSixLQUFLLENBQUMsRUFBRztZQUN2RSxPQUFPLElBQUlFLElBQUksQ0FBQ0YsS0FBSyxDQUFDO1VBQ3hCLENBQUMsTUFBTSxJQUFLLENBQUNLLEtBQUssQ0FBRUwsS0FBSyxDQUFDTSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQ0QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUUsRUFBRztZQUNyRSxPQUFPQyxVQUFVLENBQUVSLEtBQUssQ0FBQ00sS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUNELEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFFO1VBQ3JFLENBQUMsTUFBTSxJQUFLUCxLQUFLLEtBQUssTUFBTSxFQUFHO1lBQzdCLE9BQU8sSUFBSTtVQUNiLENBQUMsTUFBTSxJQUFLQSxLQUFLLEtBQUssT0FBTyxFQUFHO1lBQzlCLE9BQU8sS0FBSztVQUNkLENBQUMsTUFBTTtZQUNMLElBQU1TLE9BQU8sR0FBRyxJQUFJM0IsZUFBZSxDQUFDa0IsS0FBSyxDQUFDO1lBQzFDLElBQUtTLE9BQU8sQ0FBQ0MsTUFBTSxFQUFFLElBQUksQ0FBQ0QsT0FBTyxDQUFDRSxLQUFLLEVBQUUsRUFBRztjQUMxQyxPQUFPRixPQUFPO1lBQ2hCO1VBQ0Y7VUFDQSxPQUFPVCxLQUFLO1FBQ2Q7TUFDRixDQUFDO0lBQUE7RUFBQTtBQUFBIn0=