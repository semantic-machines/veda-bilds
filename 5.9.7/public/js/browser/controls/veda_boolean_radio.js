"use strict";

System.register(["jquery", "../../common/util.js", "../../common/individual_model.js"], function (_export, _context) {
  "use strict";

  var $, Util, IndividualModel, defaults;
  function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_commonUtilJs) {
      Util = _commonUtilJs.default;
    }, function (_commonIndividual_modelJs) {
      IndividualModel = _commonIndividual_modelJs.default;
    }],
    execute: function () {
      $.fn.veda_booleanRadio = function (params) {
        var opts = _objectSpread(_objectSpread({}, defaults), params);
        var self = this;
        var individual = opts.individual;
        var property_uri = opts.property_uri || opts.rel_uri;
        var spec = opts.spec;
        var trueOption = {
          label: spec && spec.hasValue('v-ui:trueLabel') ? Promise.resolve(spec.get('v-ui:trueLabel').map(Util.formatValue).join(' ')) : new IndividualModel('v-s:YesBundle').load().then(function (loaded) {
            return loaded.get('rdfs:label').map(Util.formatValue).join(' ');
          }),
          value: true
        };
        var falseOption = {
          label: spec && spec.hasValue('v-ui:falseLabel') ? Promise.resolve(spec.get('v-ui:falseLabel').map(Util.formatValue).join(' ')) : new IndividualModel('v-s:NoBundle').load().then(function (loaded) {
            return loaded.get('rdfs:label').map(Util.formatValue).join(' ');
          }),
          value: false
        };
        var options = [trueOption, falseOption];
        renderOptions();
        individual.on(property_uri, handler);
        this.one('remove', function () {
          individual.off(property_uri, handler);
        });

        /**
         * Render options list
         * @param {Array} options
         * @return {void}
         */
        function renderOptions() {
          self.empty();
          options.forEach(function (option) {
            var hld = $(opts.template).appendTo(self);
            option.label.then(function (label) {
              var lbl = $('label', hld).append(label);
              var rad = $('input', lbl).data('value', option.value);
              var hasValue = individual.hasValue(property_uri, option.value);
              rad.prop('checked', hasValue);
              rad.change(function () {
                if (rad.is(':checked')) {
                  individual.set(property_uri, [rad.data('value')]);
                } else {
                  individual.set(property_uri, individual.get(property_uri).filter(function (i) {
                    return i.valueOf() !== rad.data('value').valueOf();
                  }));
                }
              });
            });
          });
        }

        /**
         * Individual property modified handler to indicate chosen option
         * @return {void}
         */
        function handler() {
          $('input', self).each(function (i, el) {
            var value = $(el).data('value');
            var hasValue = individual.hasValue(property_uri, value);
            $(el).prop('checked', hasValue);
          });
        }
        if (spec && spec.hasValue('v-ui:tooltip')) {
          this.tooltip({
            title: spec['v-ui:tooltip'].map(Util.formatValue).join(' '),
            placement: 'left',
            container: 'body',
            trigger: 'hover',
            animation: false
          }).one('remove', function (e) {
            $(e.delegateTarget).tooltip('destroy');
          });
        }
        this.on('update', function (e) {
          e.stopPropagation();
          renderOptions();
        });
        this.on('view edit search', function (e) {
          e.stopPropagation();
          if (e.type === 'view') {
            $('div.radio', e.delegateTarget).addClass('disabled');
            $('input', e.delegateTarget).attr('disabled', 'true');
            $(e.delegateTarget).removeClass('has-error');
          } else {
            $('div.radio', e.delegateTarget).removeClass('disabled');
            $('input', e.delegateTarget).removeAttr('disabled');
          }
        });
        return this;
      };
      defaults = {
        template: "\n<div class=\"radio\">\n  <label>\n    <input type=\"radio\" />\n  </label>\n</div>\n  "
      };
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfY29tbW9uVXRpbEpzIiwiVXRpbCIsIl9jb21tb25JbmRpdmlkdWFsX21vZGVsSnMiLCJJbmRpdmlkdWFsTW9kZWwiLCJleGVjdXRlIiwiZm4iLCJ2ZWRhX2Jvb2xlYW5SYWRpbyIsInBhcmFtcyIsIm9wdHMiLCJfb2JqZWN0U3ByZWFkIiwiZGVmYXVsdHMiLCJzZWxmIiwiaW5kaXZpZHVhbCIsInByb3BlcnR5X3VyaSIsInJlbF91cmkiLCJzcGVjIiwidHJ1ZU9wdGlvbiIsImxhYmVsIiwiaGFzVmFsdWUiLCJQcm9taXNlIiwicmVzb2x2ZSIsImdldCIsIm1hcCIsImZvcm1hdFZhbHVlIiwiam9pbiIsImxvYWQiLCJ0aGVuIiwibG9hZGVkIiwidmFsdWUiLCJmYWxzZU9wdGlvbiIsIm9wdGlvbnMiLCJyZW5kZXJPcHRpb25zIiwib24iLCJoYW5kbGVyIiwib25lIiwib2ZmIiwiZW1wdHkiLCJmb3JFYWNoIiwib3B0aW9uIiwiaGxkIiwidGVtcGxhdGUiLCJhcHBlbmRUbyIsImxibCIsImFwcGVuZCIsInJhZCIsImRhdGEiLCJwcm9wIiwiY2hhbmdlIiwiaXMiLCJzZXQiLCJmaWx0ZXIiLCJpIiwidmFsdWVPZiIsImVhY2giLCJlbCIsInRvb2x0aXAiLCJ0aXRsZSIsInBsYWNlbWVudCIsImNvbnRhaW5lciIsInRyaWdnZXIiLCJhbmltYXRpb24iLCJlIiwiZGVsZWdhdGVUYXJnZXQiLCJzdG9wUHJvcGFnYXRpb24iLCJ0eXBlIiwiYWRkQ2xhc3MiLCJhdHRyIiwicmVtb3ZlQ2xhc3MiLCJyZW1vdmVBdHRyIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc291cmNlLXdlYi9qcy9icm93c2VyL2NvbnRyb2xzL3ZlZGFfYm9vbGVhbl9yYWRpby5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBCb29sZWFuIHJhZGlvIGNvbnRyb2xcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuaW1wb3J0IFV0aWwgZnJvbSAnLi4vLi4vY29tbW9uL3V0aWwuanMnO1xuXG5pbXBvcnQgSW5kaXZpZHVhbE1vZGVsIGZyb20gJy4uLy4uL2NvbW1vbi9pbmRpdmlkdWFsX21vZGVsLmpzJztcblxuJC5mbi52ZWRhX2Jvb2xlYW5SYWRpbyA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgY29uc3Qgb3B0cyA9IHsuLi5kZWZhdWx0cywgLi4ucGFyYW1zfTtcbiAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gIGNvbnN0IGluZGl2aWR1YWwgPSBvcHRzLmluZGl2aWR1YWw7XG4gIGNvbnN0IHByb3BlcnR5X3VyaSA9IG9wdHMucHJvcGVydHlfdXJpIHx8IG9wdHMucmVsX3VyaTtcbiAgY29uc3Qgc3BlYyA9IG9wdHMuc3BlYztcbiAgY29uc3QgdHJ1ZU9wdGlvbiA9IHtcbiAgICBsYWJlbDogc3BlYyAmJiBzcGVjLmhhc1ZhbHVlKCd2LXVpOnRydWVMYWJlbCcpID9cbiAgICAgIFByb21pc2UucmVzb2x2ZShzcGVjLmdldCgndi11aTp0cnVlTGFiZWwnKS5tYXAoVXRpbC5mb3JtYXRWYWx1ZSkuam9pbignICcpKSA6XG4gICAgICAobmV3IEluZGl2aWR1YWxNb2RlbCgndi1zOlllc0J1bmRsZScpKS5sb2FkKCkudGhlbigobG9hZGVkKSA9PiB7XG4gICAgICAgIHJldHVybiBsb2FkZWQuZ2V0KCdyZGZzOmxhYmVsJykubWFwKFV0aWwuZm9ybWF0VmFsdWUpLmpvaW4oJyAnKTtcbiAgICAgIH0pLFxuICAgIHZhbHVlOiB0cnVlLFxuICB9O1xuICBjb25zdCBmYWxzZU9wdGlvbiA9IHtcbiAgICBsYWJlbDogc3BlYyAmJiBzcGVjLmhhc1ZhbHVlKCd2LXVpOmZhbHNlTGFiZWwnKSA/XG4gICAgICBQcm9taXNlLnJlc29sdmUoc3BlYy5nZXQoJ3YtdWk6ZmFsc2VMYWJlbCcpLm1hcChVdGlsLmZvcm1hdFZhbHVlKS5qb2luKCcgJykpIDpcbiAgICAgIChuZXcgSW5kaXZpZHVhbE1vZGVsKCd2LXM6Tm9CdW5kbGUnKSkubG9hZCgpLnRoZW4oKGxvYWRlZCkgPT4ge1xuICAgICAgICByZXR1cm4gbG9hZGVkLmdldCgncmRmczpsYWJlbCcpLm1hcChVdGlsLmZvcm1hdFZhbHVlKS5qb2luKCcgJyk7XG4gICAgICB9KSxcbiAgICB2YWx1ZTogZmFsc2UsXG4gIH07XG4gIGNvbnN0IG9wdGlvbnMgPSBbdHJ1ZU9wdGlvbiwgZmFsc2VPcHRpb25dO1xuXG4gIHJlbmRlck9wdGlvbnMoKTtcblxuICBpbmRpdmlkdWFsLm9uKHByb3BlcnR5X3VyaSwgaGFuZGxlcik7XG4gIHRoaXMub25lKCdyZW1vdmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgaW5kaXZpZHVhbC5vZmYocHJvcGVydHlfdXJpLCBoYW5kbGVyKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFJlbmRlciBvcHRpb25zIGxpc3RcbiAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgZnVuY3Rpb24gcmVuZGVyT3B0aW9ucyAoKSB7XG4gICAgc2VsZi5lbXB0eSgpO1xuICAgIG9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICBjb25zdCBobGQgPSAkKG9wdHMudGVtcGxhdGUpLmFwcGVuZFRvKHNlbGYpO1xuICAgICAgb3B0aW9uLmxhYmVsLnRoZW4oKGxhYmVsKSA9PiB7XG4gICAgICAgIGNvbnN0IGxibCA9ICQoJ2xhYmVsJywgaGxkKS5hcHBlbmQoIGxhYmVsICk7XG4gICAgICAgIGNvbnN0IHJhZCA9ICQoJ2lucHV0JywgbGJsKS5kYXRhKCd2YWx1ZScsIG9wdGlvbi52YWx1ZSk7XG4gICAgICAgIGNvbnN0IGhhc1ZhbHVlID0gaW5kaXZpZHVhbC5oYXNWYWx1ZShwcm9wZXJ0eV91cmksIG9wdGlvbi52YWx1ZSk7XG4gICAgICAgIHJhZC5wcm9wKCdjaGVja2VkJywgaGFzVmFsdWUpO1xuICAgICAgICByYWQuY2hhbmdlKCgpID0+IHtcbiAgICAgICAgICBpZiAoIHJhZC5pcygnOmNoZWNrZWQnKSApIHtcbiAgICAgICAgICAgIGluZGl2aWR1YWwuc2V0KHByb3BlcnR5X3VyaSwgW3JhZC5kYXRhKCd2YWx1ZScpXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGluZGl2aWR1YWwuc2V0KHByb3BlcnR5X3VyaSwgaW5kaXZpZHVhbC5nZXQocHJvcGVydHlfdXJpKS5maWx0ZXIoKGkpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGkudmFsdWVPZigpICE9PSByYWQuZGF0YSgndmFsdWUnKS52YWx1ZU9mKCk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEluZGl2aWR1YWwgcHJvcGVydHkgbW9kaWZpZWQgaGFuZGxlciB0byBpbmRpY2F0ZSBjaG9zZW4gb3B0aW9uXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICBmdW5jdGlvbiBoYW5kbGVyICgpIHtcbiAgICAkKCdpbnB1dCcsIHNlbGYpLmVhY2goKGksIGVsKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9ICQoZWwpLmRhdGEoJ3ZhbHVlJyk7XG4gICAgICBjb25zdCBoYXNWYWx1ZSA9IGluZGl2aWR1YWwuaGFzVmFsdWUocHJvcGVydHlfdXJpLCB2YWx1ZSk7XG4gICAgICAkKGVsKS5wcm9wKCdjaGVja2VkJywgaGFzVmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKHNwZWMgJiYgc3BlYy5oYXNWYWx1ZSgndi11aTp0b29sdGlwJykpIHtcbiAgICB0aGlzLnRvb2x0aXAoe1xuICAgICAgdGl0bGU6IHNwZWNbJ3YtdWk6dG9vbHRpcCddLm1hcChVdGlsLmZvcm1hdFZhbHVlKS5qb2luKCcgJyksXG4gICAgICBwbGFjZW1lbnQ6ICdsZWZ0JyxcbiAgICAgIGNvbnRhaW5lcjogJ2JvZHknLFxuICAgICAgdHJpZ2dlcjogJ2hvdmVyJyxcbiAgICAgIGFuaW1hdGlvbjogZmFsc2UsXG4gICAgfSkub25lKCdyZW1vdmUnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgJChlLmRlbGVnYXRlVGFyZ2V0KS50b29sdGlwKCdkZXN0cm95Jyk7XG4gICAgfSk7XG4gIH1cblxuICB0aGlzLm9uKCd1cGRhdGUnLCBmdW5jdGlvbiAoZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgcmVuZGVyT3B0aW9ucygpO1xuICB9KTtcblxuICB0aGlzLm9uKCd2aWV3IGVkaXQgc2VhcmNoJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGlmIChlLnR5cGUgPT09ICd2aWV3Jykge1xuICAgICAgJCgnZGl2LnJhZGlvJywgZS5kZWxlZ2F0ZVRhcmdldCkuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAkKCdpbnB1dCcsIGUuZGVsZWdhdGVUYXJnZXQpLmF0dHIoJ2Rpc2FibGVkJywgJ3RydWUnKTtcbiAgICAgICQoZS5kZWxlZ2F0ZVRhcmdldCkucmVtb3ZlQ2xhc3MoJ2hhcy1lcnJvcicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKCdkaXYucmFkaW8nLCBlLmRlbGVnYXRlVGFyZ2V0KS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICQoJ2lucHV0JywgZS5kZWxlZ2F0ZVRhcmdldCkucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuICB0ZW1wbGF0ZTogYFxuPGRpdiBjbGFzcz1cInJhZGlvXCI+XG4gIDxsYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgLz5cbiAgPC9sYWJlbD5cbjwvZGl2PlxuICBgLFxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7TUFFT0EsQ0FBQyxHQUFBQyxPQUFBLENBQUFDLE9BQUE7SUFBQSxhQUFBQyxhQUFBO01BRURDLElBQUksR0FBQUQsYUFBQSxDQUFBRCxPQUFBO0lBQUEsYUFBQUcseUJBQUE7TUFFSkMsZUFBZSxHQUFBRCx5QkFBQSxDQUFBSCxP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