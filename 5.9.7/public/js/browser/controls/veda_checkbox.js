"use strict";

System.register(["jquery", "../../common/util.js", "../../common/individual_model.js", "./veda_control_util.js"], function (_export, _context) {
  "use strict";

  var $, Util, IndividualModel, interpolate, ftQuery, renderValue, defaults;
  function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
  function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }
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
    }, function (_veda_control_utilJs) {
      interpolate = _veda_control_utilJs.interpolate;
      ftQuery = _veda_control_utilJs.ftQuery;
      renderValue = _veda_control_utilJs.renderValue;
    }],
    execute: function () {
      $.fn.veda_checkbox = function (params) {
        var _this$attr;
        var opts = _objectSpread(_objectSpread({}, defaults), params);
        var self = this;
        var individual = opts.individual;
        var property_uri = opts.property_uri || opts.rel_uri;
        var spec = opts.spec;
        var rangeRestriction = spec && spec.hasValue('v-ui:rangeRestriction') ? spec['v-ui:rangeRestriction'][0] : undefined;
        var range = rangeRestriction ? [rangeRestriction] : new IndividualModel(property_uri)['rdfs:range'];
        var queryPattern = (_this$attr = this.attr('data-query-pattern')) !== null && _this$attr !== void 0 ? _this$attr : spec && spec.hasValue('v-ui:queryPattern') ? spec['v-ui:queryPattern'][0].toString() : undefined;
        var queryPrefix = this.attr('data-query-prefix') || (spec && spec.hasValue('v-ui:queryPrefix') ? spec['v-ui:queryPrefix'][0] : range.map(function (item) {
          return '\'rdf:type\'===\'' + item.id + '\'';
        }).join(' || '));
        var sort = this.attr('data-sort') || spec && spec.hasValue('v-ui:sort') && spec['v-ui:sort'][0].toString();
        var source = this.attr('data-source') || undefined;
        var template = this.attr('data-template') || '{@.rdfs:label}';
        var withDeleted = this.attr('data-deleted') || false;
        populate();
        individual.on(property_uri, handler);
        this.one('remove', function () {
          individual.off(property_uri, handler);
        });
        if (template) {
          this.removeAttr('data-template');
        }

        /**
         * Populate options list
         * @return {Promise}
         */
        function populate() {
          if (spec && spec.hasValue('v-ui:optionValue')) {
            var options = spec['v-ui:optionValue'];
            return renderOptions(options);
          } else if (source) {
            return Promise.resolve(eval(source)).then(renderOptions).catch(function (error) {
              console.error('Source failed', source);
            });
          } else if (queryPrefix) {
            return interpolate(queryPrefix, individual).then(function (prefix) {
              return ftQuery(prefix, undefined, sort, withDeleted, queryPattern);
            }).then(renderOptions).catch(function (error) {
              console.error('Query prefix failed', queryPrefix);
            });
          }
        }

        /**
         * Render options list
         * @param {Array} options
         * @return {Promise}
         */
        function renderOptions(options) {
          self.empty();
          var optionsPromises = options.map(function (value, index) {
            if (index >= 100) {
              return;
            }
            var hld = $(opts.template).appendTo(self);
            return renderValue(value, template).then(function (rendered) {
              var lbl = $('label', hld).append(rendered);
              var chk = $('input', lbl).data('value', value);
              if (_instanceof(value, IndividualModel) && value.hasValue('v-s:deleted', true)) {
                hld.addClass('deleted');
              }
              var hasValue = individual.hasValue(property_uri, value);
              chk.prop('checked', hasValue);
              chk.change(function () {
                if (chk.is(':checked')) {
                  individual.addValue(property_uri, value);
                } else {
                  individual.removeValue(property_uri, value);
                }
              });
              if (opts.mode === 'view') {
                hld.addClass('disabled');
                chk.attr('disabled', 'disabled');
              }
            }).catch(function (error) {
              console.log('Error rendering value', error);
            });
          });
          return Promise.all(optionsPromises);
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
          populate();
        });
        this.on('view edit search', function (e) {
          e.stopPropagation();
          if (e.type === 'view') {
            $(e.delegateTarget).children().addClass('disabled');
            $('input', e.delegateTarget).attr('disabled', 'true');
          } else {
            $(e.delegateTarget).children().removeClass('disabled');
            $('input', e.delegateTarget).removeAttr('disabled');
          }
          if (e.type === 'search') {
            var dataDeleted = $(e.delegateTarget).data('deleted');
            withDeleted = typeof dataDeleted === 'boolean' ? dataDeleted : true;
          }
        });
        return this;
      };
      defaults = {
        template: "\n<div class=\"checkbox\">\n  <label>\n    <input type=\"checkbox\" />\n  </label>\n</div>\n  "
      };
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfY29tbW9uVXRpbEpzIiwiVXRpbCIsIl9jb21tb25JbmRpdmlkdWFsX21vZGVsSnMiLCJJbmRpdmlkdWFsTW9kZWwiLCJfdmVkYV9jb250cm9sX3V0aWxKcyIsImludGVycG9sYXRlIiwiZnRRdWVyeSIsInJlbmRlclZhbHVlIiwiZXhlY3V0ZSIsImZuIiwidmVkYV9jaGVja2JveCIsInBhcmFtcyIsIl90aGlzJGF0dHIiLCJvcHRzIiwiX29iamVjdFNwcmVhZCIsImRlZmF1bHRzIiwic2VsZiIsImluZGl2aWR1YWwiLCJwcm9wZXJ0eV91cmkiLCJyZWxfdXJpIiwic3BlYyIsInJhbmdlUmVzdHJpY3Rpb24iLCJoYXNWYWx1ZSIsInVuZGVmaW5lZCIsInJhbmdlIiwicXVlcnlQYXR0ZXJuIiwiYXR0ciIsInRvU3RyaW5nIiwicXVlcnlQcmVmaXgiLCJtYXAiLCJpdGVtIiwiaWQiLCJqb2luIiwic29ydCIsInNvdXJjZSIsInRlbXBsYXRlIiwid2l0aERlbGV0ZWQiLCJwb3B1bGF0ZSIsIm9uIiwiaGFuZGxlciIsIm9uZSIsIm9mZiIsInJlbW92ZUF0dHIiLCJvcHRpb25zIiwicmVuZGVyT3B0aW9ucyIsIlByb21pc2UiLCJyZXNvbHZlIiwiZXZhbCIsInRoZW4iLCJjYXRjaCIsImVycm9yIiwiY29uc29sZSIsInByZWZpeCIsImVtcHR5Iiwib3B0aW9uc1Byb21pc2VzIiwidmFsdWUiLCJpbmRleCIsImhsZCIsImFwcGVuZFRvIiwicmVuZGVyZWQiLCJsYmwiLCJhcHBlbmQiLCJjaGsiLCJkYXRhIiwiX2luc3RhbmNlb2YiLCJhZGRDbGFzcyIsInByb3AiLCJjaGFuZ2UiLCJpcyIsImFkZFZhbHVlIiwicmVtb3ZlVmFsdWUiLCJtb2RlIiwibG9nIiwiYWxsIiwiZWFjaCIsImkiLCJlbCIsInRvb2x0aXAiLCJ0aXRsZSIsImZvcm1hdFZhbHVlIiwicGxhY2VtZW50IiwiY29udGFpbmVyIiwidHJpZ2dlciIsImFuaW1hdGlvbiIsImUiLCJkZWxlZ2F0ZVRhcmdldCIsInN0b3BQcm9wYWdhdGlvbiIsInR5cGUiLCJjaGlsZHJlbiIsInJlbW92ZUNsYXNzIiwiZGF0YURlbGV0ZWQiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zb3VyY2Utd2ViL2pzL2Jyb3dzZXIvY29udHJvbHMvdmVkYV9jaGVja2JveC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDaGVja2JveCBjb250cm9sXG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmltcG9ydCBVdGlsIGZyb20gJy4uLy4uL2NvbW1vbi91dGlsLmpzJztcblxuaW1wb3J0IEluZGl2aWR1YWxNb2RlbCBmcm9tICcuLi8uLi9jb21tb24vaW5kaXZpZHVhbF9tb2RlbC5qcyc7XG5cbmltcG9ydCB7aW50ZXJwb2xhdGUsIGZ0UXVlcnksIHJlbmRlclZhbHVlfSBmcm9tICcuL3ZlZGFfY29udHJvbF91dGlsLmpzJztcblxuJC5mbi52ZWRhX2NoZWNrYm94ID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICBjb25zdCBvcHRzID0gey4uLmRlZmF1bHRzLCAuLi5wYXJhbXN9O1xuICBjb25zdCBzZWxmID0gdGhpcztcbiAgY29uc3QgaW5kaXZpZHVhbCA9IG9wdHMuaW5kaXZpZHVhbDtcbiAgY29uc3QgcHJvcGVydHlfdXJpID0gb3B0cy5wcm9wZXJ0eV91cmkgfHwgb3B0cy5yZWxfdXJpO1xuICBjb25zdCBzcGVjID0gb3B0cy5zcGVjO1xuICBjb25zdCByYW5nZVJlc3RyaWN0aW9uID0gc3BlYyAmJiBzcGVjLmhhc1ZhbHVlKCd2LXVpOnJhbmdlUmVzdHJpY3Rpb24nKSA/IHNwZWNbJ3YtdWk6cmFuZ2VSZXN0cmljdGlvbiddWzBdIDogdW5kZWZpbmVkO1xuICBjb25zdCByYW5nZSA9IHJhbmdlUmVzdHJpY3Rpb24gPyBbcmFuZ2VSZXN0cmljdGlvbl0gOiAobmV3IEluZGl2aWR1YWxNb2RlbChwcm9wZXJ0eV91cmkpKVsncmRmczpyYW5nZSddO1xuICBjb25zdCBxdWVyeVBhdHRlcm4gPSB0aGlzLmF0dHIoJ2RhdGEtcXVlcnktcGF0dGVybicpID8/IChzcGVjICYmIHNwZWMuaGFzVmFsdWUoJ3YtdWk6cXVlcnlQYXR0ZXJuJykgPyBzcGVjWyd2LXVpOnF1ZXJ5UGF0dGVybiddWzBdLnRvU3RyaW5nKCkgOiB1bmRlZmluZWQpO1xuICBjb25zdCBxdWVyeVByZWZpeCA9IHRoaXMuYXR0cignZGF0YS1xdWVyeS1wcmVmaXgnKSB8fCAoIHNwZWMgJiYgc3BlYy5oYXNWYWx1ZSgndi11aTpxdWVyeVByZWZpeCcpID8gc3BlY1sndi11aTpxdWVyeVByZWZpeCddWzBdIDogcmFuZ2UubWFwKChpdGVtKSA9PiB7XG4gICAgcmV0dXJuICdcXCdyZGY6dHlwZVxcJz09PVxcJycgKyBpdGVtLmlkICsgJ1xcJyc7XG4gIH0pLmpvaW4oJyB8fCAnKSApO1xuICBjb25zdCBzb3J0ID0gdGhpcy5hdHRyKCdkYXRhLXNvcnQnKSB8fCAoIHNwZWMgJiYgc3BlYy5oYXNWYWx1ZSgndi11aTpzb3J0JykgJiYgc3BlY1sndi11aTpzb3J0J11bMF0udG9TdHJpbmcoKSApO1xuICBjb25zdCBzb3VyY2UgPSB0aGlzLmF0dHIoJ2RhdGEtc291cmNlJykgfHwgdW5kZWZpbmVkO1xuICBjb25zdCB0ZW1wbGF0ZSA9IHRoaXMuYXR0cignZGF0YS10ZW1wbGF0ZScpIHx8ICd7QC5yZGZzOmxhYmVsfSc7XG4gIGxldCB3aXRoRGVsZXRlZCA9IHRoaXMuYXR0cignZGF0YS1kZWxldGVkJykgfHwgZmFsc2U7XG5cbiAgcG9wdWxhdGUoKTtcblxuICBpbmRpdmlkdWFsLm9uKHByb3BlcnR5X3VyaSwgaGFuZGxlcik7XG4gIHRoaXMub25lKCdyZW1vdmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgaW5kaXZpZHVhbC5vZmYocHJvcGVydHlfdXJpLCBoYW5kbGVyKTtcbiAgfSk7XG5cbiAgaWYgKHRlbXBsYXRlKSB7XG4gICAgdGhpcy5yZW1vdmVBdHRyKCdkYXRhLXRlbXBsYXRlJyk7XG4gIH1cblxuICAvKipcbiAgICogUG9wdWxhdGUgb3B0aW9ucyBsaXN0XG4gICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAqL1xuICBmdW5jdGlvbiBwb3B1bGF0ZSAoKSB7XG4gICAgaWYgKHNwZWMgJiYgc3BlYy5oYXNWYWx1ZSgndi11aTpvcHRpb25WYWx1ZScpKSB7XG4gICAgICBjb25zdCBvcHRpb25zID0gc3BlY1sndi11aTpvcHRpb25WYWx1ZSddO1xuICAgICAgcmV0dXJuIHJlbmRlck9wdGlvbnMob3B0aW9ucyk7XG4gICAgfSBlbHNlIGlmIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZXZhbChzb3VyY2UpKVxuICAgICAgICAudGhlbihyZW5kZXJPcHRpb25zKVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignU291cmNlIGZhaWxlZCcsIHNvdXJjZSk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAocXVlcnlQcmVmaXgpIHtcbiAgICAgIHJldHVybiBpbnRlcnBvbGF0ZShxdWVyeVByZWZpeCwgaW5kaXZpZHVhbClcbiAgICAgICAgLnRoZW4oKHByZWZpeCkgPT4ge1xuICAgICAgICAgIHJldHVybiBmdFF1ZXJ5KHByZWZpeCwgdW5kZWZpbmVkLCBzb3J0LCB3aXRoRGVsZXRlZCwgcXVlcnlQYXR0ZXJuKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVuZGVyT3B0aW9ucylcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1F1ZXJ5IHByZWZpeCBmYWlsZWQnLCBxdWVyeVByZWZpeCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5kZXIgb3B0aW9ucyBsaXN0XG4gICAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnNcbiAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICovXG4gIGZ1bmN0aW9uIHJlbmRlck9wdGlvbnMgKG9wdGlvbnMpIHtcbiAgICBzZWxmLmVtcHR5KCk7XG4gICAgY29uc3Qgb3B0aW9uc1Byb21pc2VzID0gb3B0aW9ucy5tYXAoKHZhbHVlLCBpbmRleCkgPT4ge1xuICAgICAgaWYgKGluZGV4ID49IDEwMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBobGQgPSAkKG9wdHMudGVtcGxhdGUpLmFwcGVuZFRvKHNlbGYpO1xuICAgICAgcmV0dXJuIHJlbmRlclZhbHVlKHZhbHVlLCB0ZW1wbGF0ZSkudGhlbigocmVuZGVyZWQpID0+IHtcbiAgICAgICAgY29uc3QgbGJsID0gJCgnbGFiZWwnLCBobGQpLmFwcGVuZCggcmVuZGVyZWQgKTtcbiAgICAgICAgY29uc3QgY2hrID0gJCgnaW5wdXQnLCBsYmwpLmRhdGEoJ3ZhbHVlJywgdmFsdWUpO1xuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJbmRpdmlkdWFsTW9kZWwgJiYgdmFsdWUuaGFzVmFsdWUoJ3YtczpkZWxldGVkJywgdHJ1ZSkpIHtcbiAgICAgICAgICBobGQuYWRkQ2xhc3MoJ2RlbGV0ZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBoYXNWYWx1ZSA9IGluZGl2aWR1YWwuaGFzVmFsdWUocHJvcGVydHlfdXJpLCB2YWx1ZSk7XG4gICAgICAgIGNoay5wcm9wKCdjaGVja2VkJywgaGFzVmFsdWUpO1xuICAgICAgICBjaGsuY2hhbmdlKCgpID0+IHtcbiAgICAgICAgICBpZiAoIGNoay5pcygnOmNoZWNrZWQnKSApIHtcbiAgICAgICAgICAgIGluZGl2aWR1YWwuYWRkVmFsdWUocHJvcGVydHlfdXJpLCB2YWx1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGluZGl2aWR1YWwucmVtb3ZlVmFsdWUocHJvcGVydHlfdXJpLCB2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKG9wdHMubW9kZSA9PT0gJ3ZpZXcnKSB7XG4gICAgICAgICAgaGxkLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICAgIGNoay5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgICB9XG4gICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIHJlbmRlcmluZyB2YWx1ZScsIGVycm9yKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBQcm9taXNlLmFsbChvcHRpb25zUHJvbWlzZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluZGl2aWR1YWwgcHJvcGVydHkgbW9kaWZpZWQgaGFuZGxlciB0byBpbmRpY2F0ZSBjaG9zZW4gb3B0aW9uXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICBmdW5jdGlvbiBoYW5kbGVyICgpIHtcbiAgICAkKCdpbnB1dCcsIHNlbGYpLmVhY2goKGksIGVsKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9ICQoZWwpLmRhdGEoJ3ZhbHVlJyk7XG4gICAgICBjb25zdCBoYXNWYWx1ZSA9IGluZGl2aWR1YWwuaGFzVmFsdWUocHJvcGVydHlfdXJpLCB2YWx1ZSk7XG4gICAgICAkKGVsKS5wcm9wKCdjaGVja2VkJywgaGFzVmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKHNwZWMgJiYgc3BlYy5oYXNWYWx1ZSgndi11aTp0b29sdGlwJykpIHtcbiAgICB0aGlzLnRvb2x0aXAoe1xuICAgICAgdGl0bGU6IHNwZWNbJ3YtdWk6dG9vbHRpcCddLm1hcChVdGlsLmZvcm1hdFZhbHVlKS5qb2luKCcgJyksXG4gICAgICBwbGFjZW1lbnQ6ICdsZWZ0JyxcbiAgICAgIGNvbnRhaW5lcjogJ2JvZHknLFxuICAgICAgdHJpZ2dlcjogJ2hvdmVyJyxcbiAgICAgIGFuaW1hdGlvbjogZmFsc2UsXG4gICAgfSkub25lKCdyZW1vdmUnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgJChlLmRlbGVnYXRlVGFyZ2V0KS50b29sdGlwKCdkZXN0cm95Jyk7XG4gICAgfSk7XG4gIH1cblxuICB0aGlzLm9uKCd1cGRhdGUnLCBmdW5jdGlvbiAoZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgcG9wdWxhdGUoKTtcbiAgfSk7XG5cbiAgdGhpcy5vbigndmlldyBlZGl0IHNlYXJjaCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAoZS50eXBlID09PSAndmlldycpIHtcbiAgICAgICQoZS5kZWxlZ2F0ZVRhcmdldCkuY2hpbGRyZW4oKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICQoJ2lucHV0JywgZS5kZWxlZ2F0ZVRhcmdldCkuYXR0cignZGlzYWJsZWQnLCAndHJ1ZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKGUuZGVsZWdhdGVUYXJnZXQpLmNoaWxkcmVuKCkucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAkKCdpbnB1dCcsIGUuZGVsZWdhdGVUYXJnZXQpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG4gICAgfVxuICAgIGlmIChlLnR5cGUgPT09ICdzZWFyY2gnKSB7XG4gICAgICBjb25zdCBkYXRhRGVsZXRlZCA9ICQoZS5kZWxlZ2F0ZVRhcmdldCkuZGF0YSgnZGVsZXRlZCcpO1xuICAgICAgd2l0aERlbGV0ZWQgPSB0eXBlb2YgZGF0YURlbGV0ZWQgPT09ICdib29sZWFuJyA/IGRhdGFEZWxldGVkIDogdHJ1ZTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuICB0ZW1wbGF0ZTogYFxuPGRpdiBjbGFzcz1cImNoZWNrYm94XCI+XG4gIDxsYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgLz5cbiAgPC9sYWJlbD5cbjwvZGl2PlxuICBgLFxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O01BRU9BLENBQUMsR0FBQUMsT0FBQSxDQUFBQyxPQUFBO0lBQUEsYUFBQUMsYUFBQTtNQUVEQyxJQUFJLEdBQUFELGFBQUEsQ0FBQUQsT0FBQTtJQUFBLGFB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