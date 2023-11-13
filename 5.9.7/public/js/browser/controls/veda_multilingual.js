"use strict";

System.register(["../../common/veda.js", "../../common/util.js"], function (_export, _context) {
  "use strict";

  var veda, Util, defaults;
  function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  /**
   * Generic multilingual input behaviour
   * @param {Object} options
   * @return {jQuery}
   * @this jQuery
   */
  function veda_multilingual(options) {
    var opts = _objectSpread(_objectSpread({}, defaults), options);
    var self = this;
    var individual = opts.individual;
    var property_uri = opts.property_uri;
    var spec = opts.spec;
    var placeholder = this.attr('placeholder') || (spec && spec.hasValue('v-ui:placeholder') ? spec['v-ui:placeholder'].map(Util.formatValue).join(' ') : '');
    var timeout;
    var tabindex = this.attr('tabindex');
    if (tabindex) {
      this.removeAttr('tabindex');
      this.find('input').attr('tabindex', tabindex);
    }
    Object.keys(veda.user.preferences.language).forEach(function (language_name) {
      var localedInput = $(opts.template);
      localedInput.find('.language-tag').text(language_name);
      var formControl = localedInput.find('.form-control');
      formControl.attr({
        'lang': language_name,
        'placeholder': placeholder,
        'name': (individual.hasValue('rdf:type') ? individual['rdf:type'].pop().id + '_' + property_uri : property_uri).toLowerCase().replace(/[-:]/g, '_')
      }).on('change focusout', function () {
        var values = self.find('.form-control').map(function (i, el) {
          return opts.parser(el.value, el);
        }).get();
        individual.set(property_uri, values);
      }).keyup(function (e) {
        if (e.which === 13) {
          formControl.change();
        }
        if (timeout) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(keyupHandler, 50, e);
      });
      individual.get(property_uri).forEach(function (value) {
        if (value.language === language_name || !value.language) {
          formControl.val(value);
        }
      });
      self.append(localedInput);
    });
    var input = self.find('.form-control');
    individual.on(property_uri, handler);
    self.one('remove', function () {
      individual.off(property_uri, handler);
    });

    /**
     * Input keyup handler
     * @param {Event} e
     * @return {void}
     */
    function keyupHandler(e) {
      var thisInput = $(e.target);
      if (e.which !== 188 && e.which !== 190 && e.which !== 110 && thisInput.val() !== thisInput.data('prev')) {
        thisInput.data('prev', thisInput.val());
        thisInput.change();
      }
      if (e.which !== 9) {
        thisInput.focus();
      }
    }

    /**
     * Individual property change handler
     * @param {Array} values
     * @return {void}
     */
    function handler(values) {
      input.each(function (i, el) {
        var lang = el.lang;
        individual.get(property_uri).forEach(function (value) {
          if (value.language === lang || !value.language && el.value != value) {
            try {
              if (el === document.activeElement) {
                var start_shift = el.selectionStart - el.value.length;
                var end_shift = el.selectionEnd - el.value.length;
                el.value = value;
                el.selectionStart = value.length + start_shift;
                el.selectionEnd = value.length + end_shift;
              } else {
                el.value = value;
              }
            } catch (ex) {
              el.value = value;
              console.log('selectionStart/End failed:', property_uri, value, _typeof(value));
            }
          }
        });
      });
    }
    self.on('view edit search', function (e) {
      e.stopPropagation();
    });
    self.val = function (value) {
      if (!value) {
        return parser(input.val());
      }
      input.each(function (i, el) {
        if (value.language === el.lang || !value.language) {
          el.value = value.toString();
        }
      });
    };
    if (spec && spec.hasValue('v-ui:tooltip')) {
      self.tooltip({
        title: spec['v-ui:tooltip'].map(Util.formatValue).join(' '),
        placement: 'bottom',
        container: 'body',
        trigger: 'manual',
        animation: false
      }).one('remove', function () {
        self.tooltip('destroy');
      });
      input.on('focusin', function () {
        self.tooltip('show');
      }).on('focusout change', function () {
        self.tooltip('hide');
      });
    }
    return self;
  }
  return {
    setters: [function (_commonVedaJs) {
      veda = _commonVedaJs.default;
    }, function (_commonUtilJs) {
      Util = _commonUtilJs.default;
    }],
    execute: function () {
      _export("default", veda_multilingual);
      defaults = {
        parser: function parser(input, el) {
          if (input) {
            var value = String(input);
            var lang = $(el).attr('lang');
            if (lang) {
              value = value + '^' + lang;
            }
            return value;
          }
          return null;
        }
      };
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ2ZWRhX211bHRpbGluZ3VhbCIsIm9wdGlvbnMiLCJvcHRzIiwiX29iamVjdFNwcmVhZCIsImRlZmF1bHRzIiwic2VsZiIsImluZGl2aWR1YWwiLCJwcm9wZXJ0eV91cmkiLCJzcGVjIiwicGxhY2Vob2xkZXIiLCJhdHRyIiwiaGFzVmFsdWUiLCJtYXAiLCJVdGlsIiwiZm9ybWF0VmFsdWUiLCJqb2luIiwidGltZW91dCIsInRhYmluZGV4IiwicmVtb3ZlQXR0ciIsImZpbmQiLCJPYmplY3QiLCJrZXlzIiwidmVkYSIsInVzZXIiLCJwcmVmZXJlbmNlcyIsImxhbmd1YWdlIiwiZm9yRWFjaCIsImxhbmd1YWdlX25hbWUiLCJsb2NhbGVkSW5wdXQiLCIkIiwidGVtcGxhdGUiLCJ0ZXh0IiwiZm9ybUNvbnRyb2wiLCJwb3AiLCJpZCIsInRvTG93ZXJDYXNlIiwicmVwbGFjZSIsIm9uIiwidmFsdWVzIiwiaSIsImVsIiwicGFyc2VyIiwidmFsdWUiLCJnZXQiLCJzZXQiLCJrZXl1cCIsImUiLCJ3aGljaCIsImNoYW5nZSIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJrZXl1cEhhbmRsZXIiLCJ2YWwiLCJhcHBlbmQiLCJpbnB1dCIsImhhbmRsZXIiLCJvbmUiLCJvZmYiLCJ0aGlzSW5wdXQiLCJ0YXJnZXQiLCJkYXRhIiwiZm9jdXMiLCJlYWNoIiwibGFuZyIsImRvY3VtZW50IiwiYWN0aXZlRWxlbWVudCIsInN0YXJ0X3NoaWZ0Iiwic2VsZWN0aW9uU3RhcnQiLCJsZW5ndGgiLCJlbmRfc2hpZnQiLCJzZWxlY3Rpb25FbmQiLCJleCIsImNvbnNvbGUiLCJsb2ciLCJfdHlwZW9mIiwic3RvcFByb3BhZ2F0aW9uIiwidG9TdHJpbmciLCJ0b29sdGlwIiwidGl0bGUiLCJwbGFjZW1lbnQiLCJjb250YWluZXIiLCJ0cmlnZ2VyIiwiYW5pbWF0aW9uIiwic2V0dGVycyIsIl9jb21tb25WZWRhSnMiLCJkZWZhdWx0IiwiX2NvbW1vblV0aWxKcyIsImV4ZWN1dGUiLCJfZXhwb3J0IiwiU3RyaW5nIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc291cmNlLXdlYi9qcy9icm93c2VyL2NvbnRyb2xzL3ZlZGFfbXVsdGlsaW5ndWFsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEdlbmVyaWMgbXVsdGlsaW5ndWFsIGNvbnRyb2xcblxuaW1wb3J0IHZlZGEgZnJvbSAnLi4vLi4vY29tbW9uL3ZlZGEuanMnO1xuXG5pbXBvcnQgVXRpbCBmcm9tICcuLi8uLi9jb21tb24vdXRpbC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHZlZGFfbXVsdGlsaW5ndWFsO1xuXG4vKipcbiAqIEdlbmVyaWMgbXVsdGlsaW5ndWFsIGlucHV0IGJlaGF2aW91clxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4ge2pRdWVyeX1cbiAqIEB0aGlzIGpRdWVyeVxuICovXG5mdW5jdGlvbiB2ZWRhX211bHRpbGluZ3VhbCAob3B0aW9ucykge1xuICBjb25zdCBvcHRzID0gey4uLmRlZmF1bHRzLCAuLi5vcHRpb25zfTtcbiAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gIGNvbnN0IGluZGl2aWR1YWwgPSBvcHRzLmluZGl2aWR1YWw7XG4gIGNvbnN0IHByb3BlcnR5X3VyaSA9IG9wdHMucHJvcGVydHlfdXJpO1xuICBjb25zdCBzcGVjID0gb3B0cy5zcGVjO1xuICBjb25zdCBwbGFjZWhvbGRlciA9IHRoaXMuYXR0cigncGxhY2Vob2xkZXInKSB8fCAoc3BlYyAmJiBzcGVjLmhhc1ZhbHVlKCd2LXVpOnBsYWNlaG9sZGVyJykgPyBzcGVjWyd2LXVpOnBsYWNlaG9sZGVyJ10ubWFwKFV0aWwuZm9ybWF0VmFsdWUpLmpvaW4oJyAnKSA6ICcnKTtcbiAgbGV0IHRpbWVvdXQ7XG5cbiAgY29uc3QgdGFiaW5kZXggPSB0aGlzLmF0dHIoJ3RhYmluZGV4Jyk7XG4gIGlmICh0YWJpbmRleCkge1xuICAgIHRoaXMucmVtb3ZlQXR0cigndGFiaW5kZXgnKTtcbiAgICB0aGlzLmZpbmQoJ2lucHV0JykuYXR0cigndGFiaW5kZXgnLCB0YWJpbmRleCk7XG4gIH1cblxuICBPYmplY3Qua2V5cyh2ZWRhLnVzZXIucHJlZmVyZW5jZXMubGFuZ3VhZ2UpLmZvckVhY2goKGxhbmd1YWdlX25hbWUpID0+IHtcbiAgICBjb25zdCBsb2NhbGVkSW5wdXQgPSAkKG9wdHMudGVtcGxhdGUpO1xuXG4gICAgbG9jYWxlZElucHV0LmZpbmQoJy5sYW5ndWFnZS10YWcnKS50ZXh0KGxhbmd1YWdlX25hbWUpO1xuXG4gICAgY29uc3QgZm9ybUNvbnRyb2wgPSBsb2NhbGVkSW5wdXQuZmluZCgnLmZvcm0tY29udHJvbCcpO1xuICAgIGZvcm1Db250cm9sXG4gICAgICAuYXR0cih7XG4gICAgICAgICdsYW5nJzogbGFuZ3VhZ2VfbmFtZSxcbiAgICAgICAgJ3BsYWNlaG9sZGVyJzogcGxhY2Vob2xkZXIsXG4gICAgICAgICduYW1lJzogKGluZGl2aWR1YWwuaGFzVmFsdWUoJ3JkZjp0eXBlJykgPyBpbmRpdmlkdWFsWydyZGY6dHlwZSddLnBvcCgpLmlkICsgJ18nICsgcHJvcGVydHlfdXJpIDogcHJvcGVydHlfdXJpKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1stOl0vZywgJ18nKSxcbiAgICAgIH0pXG4gICAgICAub24oJ2NoYW5nZSBmb2N1c291dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gc2VsZi5maW5kKCcuZm9ybS1jb250cm9sJykubWFwKChpLCBlbCkgPT4ge1xuICAgICAgICAgIHJldHVybiBvcHRzLnBhcnNlciggZWwudmFsdWUsIGVsICk7XG4gICAgICAgIH0pLmdldCgpO1xuICAgICAgICBpbmRpdmlkdWFsLnNldChwcm9wZXJ0eV91cmksIHZhbHVlcyk7XG4gICAgICB9KVxuICAgICAgLmtleXVwKChlKSA9PiB7XG4gICAgICAgIGlmIChlLndoaWNoID09PSAxMykge1xuICAgICAgICAgIGZvcm1Db250cm9sLmNoYW5nZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aW1lb3V0KSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICB9XG4gICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGtleXVwSGFuZGxlciwgNTAsIGUpO1xuICAgICAgfSk7XG5cbiAgICBpbmRpdmlkdWFsLmdldChwcm9wZXJ0eV91cmkpLmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgICBpZiAoIHZhbHVlLmxhbmd1YWdlID09PSBsYW5ndWFnZV9uYW1lIHx8ICF2YWx1ZS5sYW5ndWFnZSApIHtcbiAgICAgICAgZm9ybUNvbnRyb2wudmFsKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHNlbGYuYXBwZW5kKCBsb2NhbGVkSW5wdXQgKTtcbiAgfSk7XG5cbiAgY29uc3QgaW5wdXQgPSBzZWxmLmZpbmQoJy5mb3JtLWNvbnRyb2wnKTtcblxuICBpbmRpdmlkdWFsLm9uKHByb3BlcnR5X3VyaSwgaGFuZGxlcik7XG4gIHNlbGYub25lKCdyZW1vdmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgaW5kaXZpZHVhbC5vZmYocHJvcGVydHlfdXJpLCBoYW5kbGVyKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIElucHV0IGtleXVwIGhhbmRsZXJcbiAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgZnVuY3Rpb24ga2V5dXBIYW5kbGVyIChlKSB7XG4gICAgY29uc3QgdGhpc0lucHV0ID0gJChlLnRhcmdldCk7XG4gICAgaWYgKFxuICAgICAgZS53aGljaCAhPT0gMTg4ICYmXG4gICAgICBlLndoaWNoICE9PSAxOTAgJiZcbiAgICAgIGUud2hpY2ggIT09IDExMCAmJlxuICAgICAgdGhpc0lucHV0LnZhbCgpICE9PSB0aGlzSW5wdXQuZGF0YSgncHJldicpXG4gICAgKSB7XG4gICAgICB0aGlzSW5wdXQuZGF0YSgncHJldicsIHRoaXNJbnB1dC52YWwoKSk7XG4gICAgICB0aGlzSW5wdXQuY2hhbmdlKCk7XG4gICAgfVxuICAgIGlmIChlLndoaWNoICE9PSA5KSB7XG4gICAgICB0aGlzSW5wdXQuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5kaXZpZHVhbCBwcm9wZXJ0eSBjaGFuZ2UgaGFuZGxlclxuICAgKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXNcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIGZ1bmN0aW9uIGhhbmRsZXIgKHZhbHVlcykge1xuICAgIGlucHV0LmVhY2goKGksIGVsKSA9PiB7XG4gICAgICBjb25zdCBsYW5nID0gZWwubGFuZztcbiAgICAgIGluZGl2aWR1YWwuZ2V0KHByb3BlcnR5X3VyaSkuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICAgICAgaWYgKCB2YWx1ZS5sYW5ndWFnZSA9PT0gbGFuZyB8fCAhdmFsdWUubGFuZ3VhZ2UgJiYgZWwudmFsdWUgIT0gdmFsdWUpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKGVsID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICAgIGNvbnN0IHN0YXJ0X3NoaWZ0ID0gZWwuc2VsZWN0aW9uU3RhcnQgLSBlbC52YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICAgIGNvbnN0IGVuZF9zaGlmdCA9IGVsLnNlbGVjdGlvbkVuZCAtIGVsLnZhbHVlLmxlbmd0aDtcbiAgICAgICAgICAgICAgZWwudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgZWwuc2VsZWN0aW9uU3RhcnQgPSB2YWx1ZS5sZW5ndGggKyBzdGFydF9zaGlmdDtcbiAgICAgICAgICAgICAgZWwuc2VsZWN0aW9uRW5kID0gdmFsdWUubGVuZ3RoICsgZW5kX3NoaWZ0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZWwudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgICAgZWwudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzZWxlY3Rpb25TdGFydC9FbmQgZmFpbGVkOicsIHByb3BlcnR5X3VyaSwgdmFsdWUsIHR5cGVvZiB2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNlbGYub24oJ3ZpZXcgZWRpdCBzZWFyY2gnLCBmdW5jdGlvbiAoZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xuXG4gIHNlbGYudmFsID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgcmV0dXJuIHBhcnNlciggaW5wdXQudmFsKCkgKTtcbiAgICB9XG4gICAgaW5wdXQuZWFjaCgoaSwgZWwpID0+IHtcbiAgICAgIGlmICh2YWx1ZS5sYW5ndWFnZSA9PT0gZWwubGFuZyB8fCAhdmFsdWUubGFuZ3VhZ2UpIHtcbiAgICAgICAgZWwudmFsdWUgPSB2YWx1ZS50b1N0cmluZygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGlmIChzcGVjICYmIHNwZWMuaGFzVmFsdWUoJ3YtdWk6dG9vbHRpcCcpKSB7XG4gICAgc2VsZi50b29sdGlwKHtcbiAgICAgIHRpdGxlOiBzcGVjWyd2LXVpOnRvb2x0aXAnXS5tYXAoVXRpbC5mb3JtYXRWYWx1ZSkuam9pbignICcpLFxuICAgICAgcGxhY2VtZW50OiAnYm90dG9tJyxcbiAgICAgIGNvbnRhaW5lcjogJ2JvZHknLFxuICAgICAgdHJpZ2dlcjogJ21hbnVhbCcsXG4gICAgICBhbmltYXRpb246IGZhbHNlLFxuICAgIH0pLm9uZSgncmVtb3ZlJywgZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi50b29sdGlwKCdkZXN0cm95Jyk7XG4gICAgfSk7XG4gICAgaW5wdXQub24oJ2ZvY3VzaW4nLCBmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLnRvb2x0aXAoJ3Nob3cnKTtcbiAgICB9KS5vbignZm9jdXNvdXQgY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi50b29sdGlwKCdoaWRlJyk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gc2VsZjtcbn1cblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gIHBhcnNlcjogZnVuY3Rpb24gKGlucHV0LCBlbCkge1xuICAgIGlmIChpbnB1dCkge1xuICAgICAgbGV0IHZhbHVlID0gU3RyaW5nKGlucHV0KTtcbiAgICAgIGNvbnN0IGxhbmcgPSAkKGVsKS5hdHRyKCdsYW5nJyk7XG4gICAgICBpZiAobGFuZykge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlICsgJ14nICsgbGFuZztcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG59O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7RUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFDQSxTQUFTQSxpQkFBaUJBLENBQUVDLE9BQU8sRUFBRTtJQUNuQyxJQUFNQyxJQUFJLEdBQUFDLGFBQUEsQ0FBQUEsYUFBQSxLQUFPQyxRQUFRLEdBQUtILE9BQU8sQ0FBQztJQUN0QyxJQUFNSSxJQUFJLEdBQUcsSUFBSTtJQUNqQixJQUFNQyxVQUFVLEdBQUdKLElBQUksQ0FBQ0ksVUFBVTtJQUNsQyxJQUFNQyxZQUFZLEdBQUdMLElBQUksQ0FBQ0ssWUFBWTtJQUN0QyxJQUFNQyxJQUFJLEdBQUdOLElBQUksQ0FBQ00sSUFBSTtJQUN0QixJQUFNQyxXQUFXLEdBQUcsSUFBSSxDQUFDQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUtGLElBQUksSUFBSUEsSUFBSSxDQUFDRyxRQUFRLENBQUMsa0JBQWtCLENBQUMsR0FBR0gsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUNJLEdBQUcsQ0FBQ0MsSUFBSSxDQUFDQyxXQUFXLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMzSixJQUFJQyxPQUFPO0lBRVgsSUFBTUMsUUFBUSxHQUFHLElBQUksQ0FBQ1AsSUFBSSxDQUFDLFVBQVUsQ0FB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