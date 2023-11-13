"use strict";

System.register(["jquery", "moment", "adoptedStyleSheets", "../../common/veda.js", "../../common/util.js"], function (_export, _context) {
  "use strict";

  var $, moment, veda, Util, defaults;
  function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  /**
   * Common dateTime behaviour
   * @param {Object} options
   * @return {jQuery}
   * @this jQuery
   */
  function veda_dateTime(options) {
    var _this = this;
    var opts = _objectSpread(_objectSpread({}, defaults), options);
    var control = $(opts.template);
    var format = opts.format;
    var spec = opts.spec;
    var placeholder = this.attr('placeholder') || (spec && spec.hasValue('v-ui:placeholder') ? spec['v-ui:placeholder'].map(Util.formatValue).join(' ') : '');
    var property_uri = opts.property_uri;
    var individual = opts.individual;
    var isSingle = spec && spec.hasValue('v-ui:maxCardinality') ? spec['v-ui:maxCardinality'][0] === 1 : true;
    var input = $('input', control);
    var change;
    input.attr({
      'placeholder': placeholder,
      'name': (individual.hasValue('rdf:type') ? individual['rdf:type'].pop().id + '_' + property_uri : property_uri).toLowerCase().replace(/[-:]/g, '_')
    });
    var singleValueHandler = function singleValueHandler(values) {
      if (values.length) {
        input.val(moment(values[0]).format(format));
      } else {
        input.val('');
      }
    };
    if (isSingle) {
      change = function change(value) {
        individual.set(property_uri, [value]);
      };
      if (individual.hasValue(property_uri)) {
        input.val(moment(individual.get(property_uri)[0]).format(format));
      }
      individual.on(property_uri, singleValueHandler);
      this.one('remove', function () {
        individual.off(property_uri, singleValueHandler);
      });
    } else {
      change = function change(value) {
        individual.set(property_uri, individual.get(property_uri).concat(value));
        input.val('');
      };
    }
    if (spec && spec.hasValue('v-ui:tooltip')) {
      this.tooltip({
        title: spec['v-ui:tooltip'].map(Util.formatValue).join(' '),
        placement: 'auto left',
        container: 'body',
        trigger: 'manual',
        animation: false
      });
      this.one('remove', function () {
        return _this.tooltip('destroy');
      });
      input.on('focusin', function () {
        return _this.tooltip('show');
      });
      input.on('focusout change', function () {
        return _this.tooltip('hide');
      });
    }
    _context.import('datetimepicker/js/bootstrap-datetimepicker.min.js').then(function () {
      _context.import('datetimepicker/css/bootstrap-datetimepicker.min.css').then(function (module) {
        var styleSheet = module.default;
        document.adoptedStyleSheets = [].concat(_toConsumableArray(document.adoptedStyleSheets), [styleSheet]);
      });
      control.datetimepicker({
        locale: Object.keys(veda.user.preferences.language).length === 1 ? Object.keys(veda.user.preferences.language)[0] : 'EN',
        allowInputToggle: true,
        format: format,
        sideBySide: true,
        useCurrent: true,
        widgetPositioning: {
          horizontal: 'auto',
          vertical: 'bottom'
        }
      });
    });
    input.on('change focusout', function (e) {
      var value = opts.parser(e.target.value);
      change(value);
    });
    this.on('view edit search', function (e) {
      e.stopPropagation();
      if (e.type === 'search') {
        change = function change(value) {
          individual.set(property_uri, individual.get(property_uri).concat(value));
          input.val('');
        };
      }
    });
    this.val = function (value) {
      if (!value) return input.val();
      return input.val(value);
    };
    this.one('remove', function () {
      control.data('DateTimePicker').destroy();
    });
    return control;
  }
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_moment) {
      moment = _moment.default;
    }, function (_adoptedStyleSheets) {}, function (_commonVedaJs) {
      veda = _commonVedaJs.default;
    }, function (_commonUtilJs) {
      Util = _commonUtilJs.default;
    }],
    execute: function () {
      _export("default", veda_dateTime);
      defaults = {
        template: "\n    <div class=\"input-group date\">\n      <span class=\"input-group-addon\">\n        <span class=\"glyphicon glyphicon-time\"></span>\n      </span>\n      <input type=\"text\" class=\"form-control\" autocomplete=\"off\"/>\n    </div>\n  ",
        parser: function parser(input) {
          if (input) {
            var timestamp = moment(input, 'DD.MM.YYYY HH:mm').toDate();
            return new Date(timestamp);
          }
          return null;
        },
        format: 'DD.MM.YYYY HH:mm'
      };
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ2ZWRhX2RhdGVUaW1lIiwib3B0aW9ucyIsIl90aGlzIiwib3B0cyIsIl9vYmplY3RTcHJlYWQiLCJkZWZhdWx0cyIsImNvbnRyb2wiLCIkIiwidGVtcGxhdGUiLCJmb3JtYXQiLCJzcGVjIiwicGxhY2Vob2xkZXIiLCJhdHRyIiwiaGFzVmFsdWUiLCJtYXAiLCJVdGlsIiwiZm9ybWF0VmFsdWUiLCJqb2luIiwicHJvcGVydHlfdXJpIiwiaW5kaXZpZHVhbCIsImlzU2luZ2xlIiwiaW5wdXQiLCJjaGFuZ2UiLCJwb3AiLCJpZCIsInRvTG93ZXJDYXNlIiwicmVwbGFjZSIsInNpbmdsZVZhbHVlSGFuZGxlciIsInZhbHVlcyIsImxlbmd0aCIsInZhbCIsIm1vbWVudCIsInZhbHVlIiwic2V0IiwiZ2V0Iiwib24iLCJvbmUiLCJvZmYiLCJjb25jYXQiLCJ0b29sdGlwIiwidGl0bGUiLCJwbGFjZW1lbnQiLCJjb250YWluZXIiLCJ0cmlnZ2VyIiwiYW5pbWF0aW9uIiwiX2NvbnRleHQiLCJpbXBvcnQiLCJ0aGVuIiwibW9kdWxlIiwic3R5bGVTaGVldCIsImRlZmF1bHQiLCJkb2N1bWVudCIsImFkb3B0ZWRTdHlsZVNoZWV0cyIsIl90b0NvbnN1bWFibGVBcnJheSIsImRhdGV0aW1lcGlja2VyIiwibG9jYWxlIiwiT2JqZWN0Iiwia2V5cyIsInZlZGEiLCJ1c2VyIiwicHJlZmVyZW5jZXMiLCJsYW5ndWFnZSIsImFsbG93SW5wdXRUb2dnbGUiLCJzaWRlQnlTaWRlIiwidXNlQ3VycmVudCIsIndpZGdldFBvc2l0aW9uaW5nIiwiaG9yaXpvbnRhbCIsInZlcnRpY2FsIiwiZSIsInBhcnNlciIsInRhcmdldCIsInN0b3BQcm9wYWdhdGlvbiIsInR5cGUiLCJkYXRhIiwiZGVzdHJveSIsInNldHRlcnMiLCJfanF1ZXJ5IiwiX21vbWVudCIsIl9hZG9wdGVkU3R5bGVTaGVldHMiLCJfY29tbW9uVmVkYUpzIiwiX2NvbW1vblV0aWxKcyIsImV4ZWN1dGUiLCJfZXhwb3J0IiwidGltZXN0YW1wIiwidG9EYXRlIiwiRGF0ZSJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NvdXJjZS13ZWIvanMvYnJvd3Nlci9jb250cm9scy92ZWRhX2RhdGV0aW1lLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIERhdGV0aW1lIGdlbmVyaWNcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG5pbXBvcnQgJ2Fkb3B0ZWRTdHlsZVNoZWV0cyc7XG5cbmltcG9ydCB2ZWRhIGZyb20gJy4uLy4uL2NvbW1vbi92ZWRhLmpzJztcblxuaW1wb3J0IFV0aWwgZnJvbSAnLi4vLi4vY29tbW9uL3V0aWwuanMnO1xuXG5leHBvcnQgZGVmYXVsdCB2ZWRhX2RhdGVUaW1lO1xuXG4vKipcbiAqIENvbW1vbiBkYXRlVGltZSBiZWhhdmlvdXJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHtqUXVlcnl9XG4gKiBAdGhpcyBqUXVlcnlcbiAqL1xuZnVuY3Rpb24gdmVkYV9kYXRlVGltZSAob3B0aW9ucykge1xuICBjb25zdCBvcHRzID0gey4uLmRlZmF1bHRzLCAuLi5vcHRpb25zfTtcbiAgY29uc3QgY29udHJvbCA9ICQob3B0cy50ZW1wbGF0ZSk7XG4gIGNvbnN0IGZvcm1hdCA9IG9wdHMuZm9ybWF0O1xuICBjb25zdCBzcGVjID0gb3B0cy5zcGVjO1xuICBjb25zdCBwbGFjZWhvbGRlciA9IHRoaXMuYXR0cigncGxhY2Vob2xkZXInKSB8fCAoc3BlYyAmJiBzcGVjLmhhc1ZhbHVlKCd2LXVpOnBsYWNlaG9sZGVyJykgPyBzcGVjWyd2LXVpOnBsYWNlaG9sZGVyJ10ubWFwKFV0aWwuZm9ybWF0VmFsdWUpLmpvaW4oJyAnKSA6ICcnKTtcbiAgY29uc3QgcHJvcGVydHlfdXJpID0gb3B0cy5wcm9wZXJ0eV91cmk7XG4gIGNvbnN0IGluZGl2aWR1YWwgPSBvcHRzLmluZGl2aWR1YWw7XG4gIGNvbnN0IGlzU2luZ2xlID0gc3BlYyAmJiBzcGVjLmhhc1ZhbHVlKCd2LXVpOm1heENhcmRpbmFsaXR5JykgPyBzcGVjWyd2LXVpOm1heENhcmRpbmFsaXR5J11bMF0gPT09IDEgOiB0cnVlO1xuICBjb25zdCBpbnB1dCA9ICQoJ2lucHV0JywgY29udHJvbCk7XG4gIGxldCBjaGFuZ2U7XG5cbiAgaW5wdXQuYXR0cih7XG4gICAgJ3BsYWNlaG9sZGVyJzogcGxhY2Vob2xkZXIsXG4gICAgJ25hbWUnOiAoaW5kaXZpZHVhbC5oYXNWYWx1ZSgncmRmOnR5cGUnKSA/IGluZGl2aWR1YWxbJ3JkZjp0eXBlJ10ucG9wKCkuaWQgKyAnXycgKyBwcm9wZXJ0eV91cmkgOiBwcm9wZXJ0eV91cmkpLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvWy06XS9nLCAnXycpLFxuICB9KTtcblxuICBjb25zdCBzaW5nbGVWYWx1ZUhhbmRsZXIgPSBmdW5jdGlvbiAodmFsdWVzKSB7XG4gICAgaWYgKHZhbHVlcy5sZW5ndGgpIHtcbiAgICAgIGlucHV0LnZhbCggbW9tZW50KHZhbHVlc1swXSkuZm9ybWF0KGZvcm1hdCkgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5wdXQudmFsKCcnKTtcbiAgICB9XG4gIH07XG5cbiAgaWYgKGlzU2luZ2xlKSB7XG4gICAgY2hhbmdlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpbmRpdmlkdWFsLnNldChwcm9wZXJ0eV91cmksIFt2YWx1ZV0pO1xuICAgIH07XG4gICAgaWYgKGluZGl2aWR1YWwuaGFzVmFsdWUocHJvcGVydHlfdXJpKSkge1xuICAgICAgaW5wdXQudmFsKCBtb21lbnQoaW5kaXZpZHVhbC5nZXQocHJvcGVydHlfdXJpKVswXSkuZm9ybWF0KGZvcm1hdCkgKTtcbiAgICB9XG4gICAgaW5kaXZpZHVhbC5vbihwcm9wZXJ0eV91cmksIHNpbmdsZVZhbHVlSGFuZGxlcik7XG4gICAgdGhpcy5vbmUoJ3JlbW92ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGluZGl2aWR1YWwub2ZmKHByb3BlcnR5X3VyaSwgc2luZ2xlVmFsdWVIYW5kbGVyKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBjaGFuZ2UgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIGluZGl2aWR1YWwuc2V0KHByb3BlcnR5X3VyaSwgaW5kaXZpZHVhbC5nZXQocHJvcGVydHlfdXJpKS5jb25jYXQodmFsdWUpKTtcbiAgICAgIGlucHV0LnZhbCgnJyk7XG4gICAgfTtcbiAgfVxuXG4gIGlmIChzcGVjICYmIHNwZWMuaGFzVmFsdWUoJ3YtdWk6dG9vbHRpcCcpKSB7XG4gICAgdGhpcy50b29sdGlwKHtcbiAgICAgIHRpdGxlOiBzcGVjWyd2LXVpOnRvb2x0aXAnXS5tYXAoVXRpbC5mb3JtYXRWYWx1ZSkuam9pbignICcpLFxuICAgICAgcGxhY2VtZW50OiAnYXV0byBsZWZ0JyxcbiAgICAgIGNvbnRhaW5lcjogJ2JvZHknLFxuICAgICAgdHJpZ2dlcjogJ21hbnVhbCcsXG4gICAgICBhbmltYXRpb246IGZhbHNlLFxuICAgIH0pO1xuICAgIHRoaXMub25lKCdyZW1vdmUnLCAoKSA9PiB0aGlzLnRvb2x0aXAoJ2Rlc3Ryb3knKSk7XG4gICAgaW5wdXQub24oJ2ZvY3VzaW4nLCAoKSA9PiB0aGlzLnRvb2x0aXAoJ3Nob3cnKSk7XG4gICAgaW5wdXQub24oJ2ZvY3Vzb3V0IGNoYW5nZScsICgpID0+IHRoaXMudG9vbHRpcCgnaGlkZScpKTtcbiAgfVxuXG4gIGltcG9ydCgnZGF0ZXRpbWVwaWNrZXIvanMvYm9vdHN0cmFwLWRhdGV0aW1lcGlja2VyLm1pbi5qcycpLnRoZW4oKCkgPT4ge1xuICAgIGltcG9ydCgnZGF0ZXRpbWVwaWNrZXIvY3NzL2Jvb3RzdHJhcC1kYXRldGltZXBpY2tlci5taW4uY3NzJykudGhlbigobW9kdWxlKSA9PiB7XG4gICAgICBjb25zdCBzdHlsZVNoZWV0ID0gbW9kdWxlLmRlZmF1bHQ7XG4gICAgICBkb2N1bWVudC5hZG9wdGVkU3R5bGVTaGVldHMgPSBbLi4uZG9jdW1lbnQuYWRvcHRlZFN0eWxlU2hlZXRzLCBzdHlsZVNoZWV0XTtcbiAgICB9KTtcbiAgICBjb250cm9sLmRhdGV0aW1lcGlja2VyKHtcbiAgICAgIGxvY2FsZTogT2JqZWN0LmtleXModmVkYS51c2VyLnByZWZlcmVuY2VzLmxhbmd1YWdlKS5sZW5ndGggPT09IDEgPyBPYmplY3Qua2V5cyh2ZWRhLnVzZXIucHJlZmVyZW5jZXMubGFuZ3VhZ2UpWzBdIDogJ0VOJyxcbiAgICAgIGFsbG93SW5wdXRUb2dnbGU6IHRydWUsXG4gICAgICBmb3JtYXQ6IGZvcm1hdCxcbiAgICAgIHNpZGVCeVNpZGU6IHRydWUsXG4gICAgICB1c2VDdXJyZW50OiB0cnVlLFxuICAgICAgd2lkZ2V0UG9zaXRpb25pbmc6IHtcbiAgICAgICAgaG9yaXpvbnRhbDogJ2F1dG8nLFxuICAgICAgICB2ZXJ0aWNhbDogJ2JvdHRvbScsXG4gICAgICB9LFxuICAgIH0pO1xuICB9KTtcblxuICBpbnB1dC5vbignY2hhbmdlIGZvY3Vzb3V0JywgZnVuY3Rpb24gKGUpIHtcbiAgICBjb25zdCB2YWx1ZSA9IG9wdHMucGFyc2VyKCBlLnRhcmdldC52YWx1ZSApO1xuICAgIGNoYW5nZSh2YWx1ZSk7XG4gIH0pO1xuXG4gIHRoaXMub24oJ3ZpZXcgZWRpdCBzZWFyY2gnLCBmdW5jdGlvbiAoZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgaWYgKGUudHlwZSA9PT0gJ3NlYXJjaCcpIHtcbiAgICAgIGNoYW5nZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpbmRpdmlkdWFsLnNldChwcm9wZXJ0eV91cmksIGluZGl2aWR1YWwuZ2V0KHByb3BlcnR5X3VyaSkuY29uY2F0KHZhbHVlKSk7XG4gICAgICAgIGlucHV0LnZhbCgnJyk7XG4gICAgICB9O1xuICAgIH1cbiAgfSk7XG5cbiAgdGhpcy52YWwgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBpZiAoIXZhbHVlKSByZXR1cm4gaW5wdXQudmFsKCk7XG4gICAgcmV0dXJuIGlucHV0LnZhbCh2YWx1ZSk7XG4gIH07XG5cbiAgdGhpcy5vbmUoJ3JlbW92ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBjb250cm9sLmRhdGEoJ0RhdGVUaW1lUGlja2VyJykuZGVzdHJveSgpO1xuICB9KTtcblxuICByZXR1cm4gY29udHJvbDtcbn1cblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwIGRhdGVcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb25cIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXRpbWVcIj48L3NwYW4+XG4gICAgICA8L3NwYW4+XG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiLz5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgcGFyc2VyOiBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICBpZiAoaW5wdXQpIHtcbiAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IG1vbWVudChpbnB1dCwgJ0RELk1NLllZWVkgSEg6bW0nKS50b0RhdGUoKTtcbiAgICAgIHJldHVybiBuZXcgRGF0ZSh0aW1lc3RhbXApO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcbiAgZm9ybWF0OiAnREQuTU0uWVlZWSBISDptbScsXG59O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFjQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFDQSxTQUFTQSxhQUFhQSxDQUFFQyxPQUFPLEVBQUU7SUFBQSxJQUFBQyxLQUFBO0lBQy9CLElBQU1DLElBQUksR0FBQUMsYUFBQSxDQUFBQSxhQUFBLEtBQU9DLFFBQVEsR0FBS0osT0FBTyxDQUFDO0lBQ3RDLElBQU1LLE9BQU8sR0FBR0MsQ0FBQyxDQUFDSixJQUFJLENBQUNLLFFBQVEsQ0FBQztJQUNoQyxJQUFNQyxNQUFNLEdBQUdOLElBQUksQ0FBQ00sTUFBTTtJQUMxQixJ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