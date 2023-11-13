"use strict";

System.register(["jquery", "../../common/util.js"], function (_export, _context) {
  "use strict";

  var $, Util, defaults;
  function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  /**
   * Basic literal input.
   * @param {Object} options
   * @this jQuery
   * @return {jQuery}
   */
  function veda_literal(options) {
    var opts = _objectSpread(_objectSpread({}, defaults), options);
    var input = $(opts.template);
    var spec = opts.spec;
    var placeholder = this.attr('placeholder') || (spec && spec.hasValue('v-ui:placeholder') ? spec['v-ui:placeholder'].map(Util.formatValue).join(' ') : '');
    var property_uri = opts.property_uri;
    var individual = opts.individual;
    var timeout;
    var isSpecSingle = spec && spec.hasValue('v-ui:maxCardinality') ? spec['v-ui:maxCardinality'][0] === 1 : true;
    input.isSingle = typeof opts.isSingle !== 'undefined' ? opts.isSingle : isSpecSingle;
    input.attr({
      'placeholder': placeholder,
      'name': (individual.hasValue('rdf:type') ? individual['rdf:type'].pop().id + '_' + property_uri : property_uri).toLowerCase().replace(/[-:]/g, '_')
    }).on('change focusout', changeHandler).keyup(function (e) {
      if (!input.isSingle) {
        return;
      }
      if (e.which === 13) {
        input.change();
      }
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(keyupHandler, 50, e);
    });
    individual.on(property_uri, propertyModifiedHandler);
    this.one('remove', function () {
      individual.off(property_uri, propertyModifiedHandler);
    });
    propertyModifiedHandler();

    /**
     * Individual property handler.
     * @return {void}
     */
    function propertyModifiedHandler() {
      if (input.isSingle) {
        var field = input[0];
        var value = Util.formatValue(individual.get(property_uri)[0]);
        value = typeof value !== 'undefined' ? value : '';
        if (field.value != value) {
          try {
            var start_shift = field.selectionStart - field.value.length;
            var end_shift = field.selectionEnd - field.value.length;
            field.value = value;
            field.selectionStart = value.length + start_shift;
            field.selectionEnd = value.length + end_shift;
          } catch (ex) {
            field.value = value;
            console.log('selectionStart/End error:', property_uri, value, _typeof(value));
          }
        }
      }
    }

    /**
     * Input change handler
     * @param {Event} e
     * @this jQuery
     * @return {void}
     */
    function changeHandler(e) {
      var value = opts.parser(this.value);
      if (input.isSingle) {
        individual.set(property_uri, [value]);
      } else {
        individual.set(property_uri, individual.get(property_uri).concat(value));
        this.value = '';
      }
    }

    /**
     * Input keyup handler
     * @param {Event} e
     * @this jQuery
     * @return {void}
     */
    function keyupHandler(e) {
      if (e.which !== 188 && e.which !== 190 && e.which !== 110 && input.val() !== input.data('prev')) {
        input.data('prev', input.val());
        input.change();
      }
      if (e.which !== 9) {
        input.focus();
      }
    }
    this.on('view edit search', function (e) {
      e.stopPropagation();
    });
    this.val = function (value) {
      if (!value) return input.val();
      return input.val(Util.formatValue(value));
    };
    if (spec && spec.hasValue('v-ui:tooltip')) {
      input.tooltip({
        title: spec['v-ui:tooltip'].map(Util.formatValue).join(' '),
        placement: 'bottom',
        container: 'body',
        trigger: 'manual',
        animation: false
      }).on('focusin', function () {
        input.tooltip('show');
      }).on('focusout change', function () {
        input.tooltip('hide');
      });
      this.one('remove', function () {
        input.tooltip('destroy');
      });
    }
    return input;
  }
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_commonUtilJs) {
      Util = _commonUtilJs.default;
    }],
    execute: function () {
      _export("default", veda_literal);
      defaults = {
        template: '<input type="text" class="form-control" autocomplete="on" />',
        parser: function parser(input) {
          return input || null;
        }
      };
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ2ZWRhX2xpdGVyYWwiLCJvcHRpb25zIiwib3B0cyIsIl9vYmplY3RTcHJlYWQiLCJkZWZhdWx0cyIsImlucHV0IiwiJCIsInRlbXBsYXRlIiwic3BlYyIsInBsYWNlaG9sZGVyIiwiYXR0ciIsImhhc1ZhbHVlIiwibWFwIiwiVXRpbCIsImZvcm1hdFZhbHVlIiwiam9pbiIsInByb3BlcnR5X3VyaSIsImluZGl2aWR1YWwiLCJ0aW1lb3V0IiwiaXNTcGVjU2luZ2xlIiwiaXNTaW5nbGUiLCJwb3AiLCJpZCIsInRvTG93ZXJDYXNlIiwicmVwbGFjZSIsIm9uIiwiY2hhbmdlSGFuZGxlciIsImtleXVwIiwiZSIsIndoaWNoIiwiY2hhbmdlIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImtleXVwSGFuZGxlciIsInByb3BlcnR5TW9kaWZpZWRIYW5kbGVyIiwib25lIiwib2ZmIiwiZmllbGQiLCJ2YWx1ZSIsImdldCIsInN0YXJ0X3NoaWZ0Iiwic2VsZWN0aW9uU3RhcnQiLCJsZW5ndGgiLCJlbmRfc2hpZnQiLCJzZWxlY3Rpb25FbmQiLCJleCIsImNvbnNvbGUiLCJsb2ciLCJfdHlwZW9mIiwicGFyc2VyIiwic2V0IiwiY29uY2F0IiwidmFsIiwiZGF0YSIsImZvY3VzIiwic3RvcFByb3BhZ2F0aW9uIiwidG9vbHRpcCIsInRpdGxlIiwicGxhY2VtZW50IiwiY29udGFpbmVyIiwidHJpZ2dlciIsImFuaW1hdGlvbiIsInNldHRlcnMiLCJfanF1ZXJ5IiwiZGVmYXVsdCIsIl9jb21tb25VdGlsSnMiLCJleGVjdXRlIiwiX2V4cG9ydCJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NvdXJjZS13ZWIvanMvYnJvd3Nlci9jb250cm9scy92ZWRhX2xpdGVyYWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gR2VuZXJpYyBsaXRlcmFsIGNvbnRyb2xcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuaW1wb3J0IFV0aWwgZnJvbSAnLi4vLi4vY29tbW9uL3V0aWwuanMnO1xuXG5leHBvcnQgZGVmYXVsdCB2ZWRhX2xpdGVyYWw7XG5cbi8qKlxuICogQmFzaWMgbGl0ZXJhbCBpbnB1dC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAdGhpcyBqUXVlcnlcbiAqIEByZXR1cm4ge2pRdWVyeX1cbiAqL1xuZnVuY3Rpb24gdmVkYV9saXRlcmFsIChvcHRpb25zKSB7XG4gIGNvbnN0IG9wdHMgPSB7Li4uZGVmYXVsdHMsIC4uLm9wdGlvbnN9O1xuICBjb25zdCBpbnB1dCA9ICQob3B0cy50ZW1wbGF0ZSk7XG4gIGNvbnN0IHNwZWMgPSBvcHRzLnNwZWM7XG4gIGNvbnN0IHBsYWNlaG9sZGVyID0gdGhpcy5hdHRyKCdwbGFjZWhvbGRlcicpIHx8IChzcGVjICYmIHNwZWMuaGFzVmFsdWUoJ3YtdWk6cGxhY2Vob2xkZXInKSA/IHNwZWNbJ3YtdWk6cGxhY2Vob2xkZXInXS5tYXAoVXRpbC5mb3JtYXRWYWx1ZSkuam9pbignICcpIDogJycpO1xuICBjb25zdCBwcm9wZXJ0eV91cmkgPSBvcHRzLnByb3BlcnR5X3VyaTtcbiAgY29uc3QgaW5kaXZpZHVhbCA9IG9wdHMuaW5kaXZpZHVhbDtcbiAgbGV0IHRpbWVvdXQ7XG5cbiAgY29uc3QgaXNTcGVjU2luZ2xlID0gc3BlYyAmJiBzcGVjLmhhc1ZhbHVlKCd2LXVpOm1heENhcmRpbmFsaXR5JykgPyBzcGVjWyd2LXVpOm1heENhcmRpbmFsaXR5J11bMF0gPT09IDEgOiB0cnVlO1xuICBpbnB1dC5pc1NpbmdsZSA9IHR5cGVvZiBvcHRzLmlzU2luZ2xlICE9PSAndW5kZWZpbmVkJyA/IG9wdHMuaXNTaW5nbGUgOiBpc1NwZWNTaW5nbGU7XG5cbiAgaW5wdXRcbiAgICAuYXR0cih7XG4gICAgICAncGxhY2Vob2xkZXInOiBwbGFjZWhvbGRlcixcbiAgICAgICduYW1lJzogKGluZGl2aWR1YWwuaGFzVmFsdWUoJ3JkZjp0eXBlJykgPyBpbmRpdmlkdWFsWydyZGY6dHlwZSddLnBvcCgpLmlkICsgJ18nICsgcHJvcGVydHlfdXJpIDogcHJvcGVydHlfdXJpKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1stOl0vZywgJ18nKSxcbiAgICB9KVxuICAgIC5vbignY2hhbmdlIGZvY3Vzb3V0JywgY2hhbmdlSGFuZGxlcilcbiAgICAua2V5dXAoKGUpID0+IHtcbiAgICAgIGlmICghaW5wdXQuaXNTaW5nbGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGUud2hpY2ggPT09IDEzKSB7XG4gICAgICAgIGlucHV0LmNoYW5nZSgpO1xuICAgICAgfVxuICAgICAgaWYgKHRpbWVvdXQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgfVxuICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoa2V5dXBIYW5kbGVyLCA1MCwgZSk7XG4gICAgfSk7XG5cbiAgaW5kaXZpZHVhbC5vbihwcm9wZXJ0eV91cmksIHByb3BlcnR5TW9kaWZpZWRIYW5kbGVyKTtcbiAgdGhpcy5vbmUoJ3JlbW92ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBpbmRpdmlkdWFsLm9mZihwcm9wZXJ0eV91cmksIHByb3BlcnR5TW9kaWZpZWRIYW5kbGVyKTtcbiAgfSk7XG4gIHByb3BlcnR5TW9kaWZpZWRIYW5kbGVyKCk7XG5cbiAgLyoqXG4gICAqIEluZGl2aWR1YWwgcHJvcGVydHkgaGFuZGxlci5cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIGZ1bmN0aW9uIHByb3BlcnR5TW9kaWZpZWRIYW5kbGVyICgpIHtcbiAgICBpZiAoaW5wdXQuaXNTaW5nbGUpIHtcbiAgICAgIGNvbnN0IGZpZWxkID0gaW5wdXRbMF07XG4gICAgICBsZXQgdmFsdWUgPSBVdGlsLmZvcm1hdFZhbHVlKCBpbmRpdmlkdWFsLmdldChwcm9wZXJ0eV91cmkpWzBdICk7XG4gICAgICB2YWx1ZSA9IHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcgPyB2YWx1ZSA6ICcnO1xuICAgICAgaWYgKGZpZWxkLnZhbHVlICE9IHZhbHVlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3Qgc3RhcnRfc2hpZnQgPSBmaWVsZC5zZWxlY3Rpb25TdGFydCAtIGZpZWxkLnZhbHVlLmxlbmd0aDtcbiAgICAgICAgICBjb25zdCBlbmRfc2hpZnQgPSBmaWVsZC5zZWxlY3Rpb25FbmQgLSBmaWVsZC52YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgZmllbGQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICBmaWVsZC5zZWxlY3Rpb25TdGFydCA9IHZhbHVlLmxlbmd0aCArIHN0YXJ0X3NoaWZ0O1xuICAgICAgICAgIGZpZWxkLnNlbGVjdGlvbkVuZCA9IHZhbHVlLmxlbmd0aCArIGVuZF9zaGlmdDtcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICBmaWVsZC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdzZWxlY3Rpb25TdGFydC9FbmQgZXJyb3I6JywgcHJvcGVydHlfdXJpLCB2YWx1ZSwgdHlwZW9mIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbnB1dCBjaGFuZ2UgaGFuZGxlclxuICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAqIEB0aGlzIGpRdWVyeVxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgZnVuY3Rpb24gY2hhbmdlSGFuZGxlciAoZSkge1xuICAgIGNvbnN0IHZhbHVlID0gb3B0cy5wYXJzZXIodGhpcy52YWx1ZSk7XG4gICAgaWYgKGlucHV0LmlzU2luZ2xlKSB7XG4gICAgICBpbmRpdmlkdWFsLnNldChwcm9wZXJ0eV91cmksIFt2YWx1ZV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbmRpdmlkdWFsLnNldChwcm9wZXJ0eV91cmksIGluZGl2aWR1YWwuZ2V0KHByb3BlcnR5X3VyaSkuY29uY2F0KHZhbHVlKSk7XG4gICAgICB0aGlzLnZhbHVlID0gJyc7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIElucHV0IGtleXVwIGhhbmRsZXJcbiAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgKiBAdGhpcyBqUXVlcnlcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIGZ1bmN0aW9uIGtleXVwSGFuZGxlciAoZSkge1xuICAgIGlmIChcbiAgICAgIGUud2hpY2ggIT09IDE4OCAmJlxuICAgICAgZS53aGljaCAhPT0gMTkwICYmXG4gICAgICBlLndoaWNoICE9PSAxMTAgJiZcbiAgICAgIGlucHV0LnZhbCgpICE9PSBpbnB1dC5kYXRhKCdwcmV2JylcbiAgICApIHtcbiAgICAgIGlucHV0LmRhdGEoJ3ByZXYnLCBpbnB1dC52YWwoKSk7XG4gICAgICBpbnB1dC5jaGFuZ2UoKTtcbiAgICB9XG4gICAgaWYgKGUud2hpY2ggIT09IDkpIHtcbiAgICAgIGlucHV0LmZvY3VzKCk7XG4gICAgfVxuICB9XG4gIHRoaXMub24oJ3ZpZXcgZWRpdCBzZWFyY2gnLCBmdW5jdGlvbiAoZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xuICB0aGlzLnZhbCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGlmICghdmFsdWUpIHJldHVybiBpbnB1dC52YWwoKTtcbiAgICByZXR1cm4gaW5wdXQudmFsKCBVdGlsLmZvcm1hdFZhbHVlKHZhbHVlKSApO1xuICB9O1xuICBpZiAoc3BlYyAmJiBzcGVjLmhhc1ZhbHVlKCd2LXVpOnRvb2x0aXAnKSkge1xuICAgIGlucHV0LnRvb2x0aXAoe1xuICAgICAgdGl0bGU6IHNwZWNbJ3YtdWk6dG9vbHRpcCddLm1hcChVdGlsLmZvcm1hdFZhbHVlKS5qb2luKCcgJyksXG4gICAgICBwbGFjZW1lbnQ6ICdib3R0b20nLFxuICAgICAgY29udGFpbmVyOiAnYm9keScsXG4gICAgICB0cmlnZ2VyOiAnbWFudWFsJyxcbiAgICAgIGFuaW1hdGlvbjogZmFsc2UsXG4gICAgfSkub24oJ2ZvY3VzaW4nLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpbnB1dC50b29sdGlwKCdzaG93Jyk7XG4gICAgfSkub24oJ2ZvY3Vzb3V0IGNoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlucHV0LnRvb2x0aXAoJ2hpZGUnKTtcbiAgICB9KTtcbiAgICB0aGlzLm9uZSgncmVtb3ZlJywgZnVuY3Rpb24gKCkge1xuICAgICAgaW5wdXQudG9vbHRpcCgnZGVzdHJveScpO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBpbnB1dDtcbn1cblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gIHRlbXBsYXRlOiAnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBhdXRvY29tcGxldGU9XCJvblwiIC8+JyxcbiAgcGFyc2VyOiBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICByZXR1cm4gKGlucHV0IHx8IG51bGwpO1xuICB9LFxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0VBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0EsU0FBU0EsWUFBWUEsQ0FBRUMsT0FBTyxFQUFFO0lBQzlCLElBQU1DLElBQUksR0FBQUMsYUFBQSxDQUFBQSxhQUFBLEtBQU9DLFFBQVEsR0FBS0gsT0FBTyxDQUFDO0lBQ3RDLElBQU1JLEtBQUssR0FBR0MsQ0FBQyxDQUFDSixJQUFJLENBQUNLLFFBQVEsQ0FBQztJQUM5QixJQUFNQyxJQUFJLEdBQUdOLElBQUksQ0FBQ00sSUFBSTtJQUN0QixJQUFNQyxXQUFXLEdBQUcsSUFBSSxDQUFDQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUtGLElBQUksSUFBSUEsSUFBSSxDQUFDRyxRQUFRLENBQUMsa0JBQWtCLENBQUMsR0FBR0gsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUNJLEdBQUcsQ0FBQ0MsSUFBSSxDQUFDQyxXQUFXLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMzSixJQUFNQyxZQUFZLEdBQUdkLElBQUksQ0FBQ2MsWUFBWTtJQUN0QyxJQUFNQyxVQUFVLEdBQUdmLElBQUksQ0FBQ2UsVUFBVTtJ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