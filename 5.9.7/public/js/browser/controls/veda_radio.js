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
      $.fn.veda_radio = function (params) {
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
        var source = this.attr('data-source');
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
         * @return {void}
         */
        function renderOptions(options) {
          self.empty();
          options.forEach(function (value, index) {
            if (index >= 100) {
              return;
            }
            var hld = $(opts.template).appendTo(self);
            return renderValue(value, template).then(function (rendered) {
              var lbl = $('label', hld).append(rendered);
              var rad = $('input', lbl).data('value', value);
              if (_instanceof(value, IndividualModel) && value.hasValue('v-s:deleted', true)) {
                hld.addClass('deleted');
              }
              var hasValue = individual.hasValue(property_uri, value);
              rad.prop('checked', hasValue);
              rad.change(function () {
                if (rad.is(':checked')) {
                  individual.set(property_uri, [value]);
                } else {
                  individual.removeValue(property_uri, value);
                }
              });
              if (opts.mode === 'view') {
                hld.addClass('disabled');
                rad.attr('disabled', 'disabled');
              }
            }).catch(function (error) {
              console.log('Error rendering value', error);
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
          populate();
        });
        this.on('view edit search', function (e) {
          e.stopPropagation();
          if (e.type === 'view') {
            $('div.radio', e.delegateTarget).addClass('disabled');
            $('input', e.delegateTarget).attr('disabled', 'true');
          } else {
            $('div.radio', e.delegateTarget).removeClass('disabled');
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
        template: "\n<div class=\"radio\">\n  <label>\n    <input type=\"radio\" />\n  </label>\n</div>\n  "
      };
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfY29tbW9uVXRpbEpzIiwiVXRpbCIsIl9jb21tb25JbmRpdmlkdWFsX21vZGVsSnMiLCJJbmRpdmlkdWFsTW9kZWwiLCJfdmVkYV9jb250cm9sX3V0aWxKcyIsImludGVycG9sYXRlIiwiZnRRdWVyeSIsInJlbmRlclZhbHVlIiwiZXhlY3V0ZSIsImZuIiwidmVkYV9yYWRpbyIsInBhcmFtcyIsIl90aGlzJGF0dHIiLCJvcHRzIiwiX29iamVjdFNwcmVhZCIsImRlZmF1bHRzIiwic2VsZiIsImluZGl2aWR1YWwiLCJwcm9wZXJ0eV91cmkiLCJyZWxfdXJpIiwic3BlYyIsInJhbmdlUmVzdHJpY3Rpb24iLCJoYXNWYWx1ZSIsInVuZGVmaW5lZCIsInJhbmdlIiwicXVlcnlQYXR0ZXJuIiwiYXR0ciIsInRvU3RyaW5nIiwicXVlcnlQcmVmaXgiLCJtYXAiLCJpdGVtIiwiaWQiLCJqb2luIiwic29ydCIsInNvdXJjZSIsInRlbXBsYXRlIiwid2l0aERlbGV0ZWQiLCJwb3B1bGF0ZSIsIm9uIiwiaGFuZGxlciIsIm9uZSIsIm9mZiIsInJlbW92ZUF0dHIiLCJvcHRpb25zIiwicmVuZGVyT3B0aW9ucyIsIlByb21pc2UiLCJyZXNvbHZlIiwiZXZhbCIsInRoZW4iLCJjYXRjaCIsImVycm9yIiwiY29uc29sZSIsInByZWZpeCIsImVtcHR5IiwiZm9yRWFjaCIsInZhbHVlIiwiaW5kZXgiLCJobGQiLCJhcHBlbmRUbyIsInJlbmRlcmVkIiwibGJsIiwiYXBwZW5kIiwicmFkIiwiZGF0YSIsIl9pbnN0YW5jZW9mIiwiYWRkQ2xhc3MiLCJwcm9wIiwiY2hhbmdlIiwiaXMiLCJzZXQiLCJyZW1vdmVWYWx1ZSIsIm1vZGUiLCJsb2ciLCJlYWNoIiwiaSIsImVsIiwidG9vbHRpcCIsInRpdGxlIiwiZm9ybWF0VmFsdWUiLCJwbGFjZW1lbnQiLCJjb250YWluZXIiLCJ0cmlnZ2VyIiwiYW5pbWF0aW9uIiwiZSIsImRlbGVnYXRlVGFyZ2V0Iiwic3RvcFByb3BhZ2F0aW9uIiwidHlwZSIsInJlbW92ZUNsYXNzIiwiZGF0YURlbGV0ZWQiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zb3VyY2Utd2ViL2pzL2Jyb3dzZXIvY29udHJvbHMvdmVkYV9yYWRpby5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBSYWRpbyBjb250cm9sXG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmltcG9ydCBVdGlsIGZyb20gJy4uLy4uL2NvbW1vbi91dGlsLmpzJztcblxuaW1wb3J0IEluZGl2aWR1YWxNb2RlbCBmcm9tICcuLi8uLi9jb21tb24vaW5kaXZpZHVhbF9tb2RlbC5qcyc7XG5cbmltcG9ydCB7aW50ZXJwb2xhdGUsIGZ0UXVlcnksIHJlbmRlclZhbHVlfSBmcm9tICcuL3ZlZGFfY29udHJvbF91dGlsLmpzJztcblxuJC5mbi52ZWRhX3JhZGlvID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICBjb25zdCBvcHRzID0gey4uLmRlZmF1bHRzLCAuLi5wYXJhbXN9O1xuICBjb25zdCBzZWxmID0gdGhpcztcbiAgY29uc3QgaW5kaXZpZHVhbCA9IG9wdHMuaW5kaXZpZHVhbDtcbiAgY29uc3QgcHJvcGVydHlfdXJpID0gb3B0cy5wcm9wZXJ0eV91cmkgfHwgb3B0cy5yZWxfdXJpO1xuICBjb25zdCBzcGVjID0gb3B0cy5zcGVjO1xuICBjb25zdCByYW5nZVJlc3RyaWN0aW9uID0gc3BlYyAmJiBzcGVjLmhhc1ZhbHVlKCd2LXVpOnJhbmdlUmVzdHJpY3Rpb24nKSA/IHNwZWNbJ3YtdWk6cmFuZ2VSZXN0cmljdGlvbiddWzBdIDogdW5kZWZpbmVkO1xuICBjb25zdCByYW5nZSA9IHJhbmdlUmVzdHJpY3Rpb24gPyBbcmFuZ2VSZXN0cmljdGlvbl0gOiAobmV3IEluZGl2aWR1YWxNb2RlbChwcm9wZXJ0eV91cmkpKVsncmRmczpyYW5nZSddO1xuICBjb25zdCBxdWVyeVBhdHRlcm4gPSB0aGlzLmF0dHIoJ2RhdGEtcXVlcnktcGF0dGVybicpID8/IChzcGVjICYmIHNwZWMuaGFzVmFsdWUoJ3YtdWk6cXVlcnlQYXR0ZXJuJykgPyBzcGVjWyd2LXVpOnF1ZXJ5UGF0dGVybiddWzBdLnRvU3RyaW5nKCkgOiB1bmRlZmluZWQpO1xuICBjb25zdCBxdWVyeVByZWZpeCA9IHRoaXMuYXR0cignZGF0YS1xdWVyeS1wcmVmaXgnKSB8fCAoIHNwZWMgJiYgc3BlYy5oYXNWYWx1ZSgndi11aTpxdWVyeVByZWZpeCcpID8gc3BlY1sndi11aTpxdWVyeVByZWZpeCddWzBdIDogcmFuZ2UubWFwKChpdGVtKSA9PiB7XG4gICAgcmV0dXJuICdcXCdyZGY6dHlwZVxcJz09PVxcJycgKyBpdGVtLmlkICsgJ1xcJyc7XG4gIH0pLmpvaW4oJyB8fCAnKSApO1xuICBjb25zdCBzb3J0ID0gdGhpcy5hdHRyKCdkYXRhLXNvcnQnKSB8fCAoIHNwZWMgJiYgc3BlYy5oYXNWYWx1ZSgndi11aTpzb3J0JykgJiYgc3BlY1sndi11aTpzb3J0J11bMF0udG9TdHJpbmcoKSApO1xuICBjb25zdCBzb3VyY2UgPSB0aGlzLmF0dHIoJ2RhdGEtc291cmNlJyk7XG4gIGNvbnN0IHRlbXBsYXRlID0gdGhpcy5hdHRyKCdkYXRhLXRlbXBsYXRlJykgfHwgJ3tALnJkZnM6bGFiZWx9JztcbiAgbGV0IHdpdGhEZWxldGVkID0gdGhpcy5hdHRyKCdkYXRhLWRlbGV0ZWQnKSB8fCBmYWxzZTtcblxuICBwb3B1bGF0ZSgpO1xuXG4gIGluZGl2aWR1YWwub24ocHJvcGVydHlfdXJpLCBoYW5kbGVyKTtcbiAgdGhpcy5vbmUoJ3JlbW92ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBpbmRpdmlkdWFsLm9mZihwcm9wZXJ0eV91cmksIGhhbmRsZXIpO1xuICB9KTtcblxuICBpZiAodGVtcGxhdGUpIHtcbiAgICB0aGlzLnJlbW92ZUF0dHIoJ2RhdGEtdGVtcGxhdGUnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQb3B1bGF0ZSBvcHRpb25zIGxpc3RcbiAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICovXG4gIGZ1bmN0aW9uIHBvcHVsYXRlICgpIHtcbiAgICBpZiAoc3BlYyAmJiBzcGVjLmhhc1ZhbHVlKCd2LXVpOm9wdGlvblZhbHVlJykpIHtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSBzcGVjWyd2LXVpOm9wdGlvblZhbHVlJ107XG4gICAgICByZXR1cm4gcmVuZGVyT3B0aW9ucyhvcHRpb25zKTtcbiAgICB9IGVsc2UgaWYgKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShldmFsKHNvdXJjZSkpXG4gICAgICAgIC50aGVuKHJlbmRlck9wdGlvbnMpXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdTb3VyY2UgZmFpbGVkJywgc291cmNlKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChxdWVyeVByZWZpeCkge1xuICAgICAgcmV0dXJuIGludGVycG9sYXRlKHF1ZXJ5UHJlZml4LCBpbmRpdmlkdWFsKVxuICAgICAgICAudGhlbigocHJlZml4KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGZ0UXVlcnkocHJlZml4LCB1bmRlZmluZWQsIHNvcnQsIHdpdGhEZWxldGVkLCBxdWVyeVBhdHRlcm4pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZW5kZXJPcHRpb25zKVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignUXVlcnkgcHJlZml4IGZhaWxlZCcsIHF1ZXJ5UHJlZml4KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbmRlciBvcHRpb25zIGxpc3RcbiAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgZnVuY3Rpb24gcmVuZGVyT3B0aW9ucyAob3B0aW9ucykge1xuICAgIHNlbGYuZW1wdHkoKTtcbiAgICBvcHRpb25zLmZvckVhY2goKHZhbHVlLCBpbmRleCkgPT4ge1xuICAgICAgaWYgKGluZGV4ID49IDEwMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBobGQgPSAkKG9wdHMudGVtcGxhdGUpLmFwcGVuZFRvKHNlbGYpO1xuICAgICAgcmV0dXJuIHJlbmRlclZhbHVlKHZhbHVlLCB0ZW1wbGF0ZSkudGhlbigocmVuZGVyZWQpID0+IHtcbiAgICAgICAgY29uc3QgbGJsID0gJCgnbGFiZWwnLCBobGQpLmFwcGVuZCggcmVuZGVyZWQgKTtcbiAgICAgICAgY29uc3QgcmFkID0gJCgnaW5wdXQnLCBsYmwpLmRhdGEoJ3ZhbHVlJywgdmFsdWUpO1xuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJbmRpdmlkdWFsTW9kZWwgJiYgdmFsdWUuaGFzVmFsdWUoJ3YtczpkZWxldGVkJywgdHJ1ZSkpIHtcbiAgICAgICAgICBobGQuYWRkQ2xhc3MoJ2RlbGV0ZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBoYXNWYWx1ZSA9IGluZGl2aWR1YWwuaGFzVmFsdWUocHJvcGVydHlfdXJpLCB2YWx1ZSk7XG4gICAgICAgIHJhZC5wcm9wKCdjaGVja2VkJywgaGFzVmFsdWUpO1xuICAgICAgICByYWQuY2hhbmdlKCgpID0+IHtcbiAgICAgICAgICBpZiAoIHJhZC5pcygnOmNoZWNrZWQnKSApIHtcbiAgICAgICAgICAgIGluZGl2aWR1YWwuc2V0KHByb3BlcnR5X3VyaSwgW3ZhbHVlXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGluZGl2aWR1YWwucmVtb3ZlVmFsdWUocHJvcGVydHlfdXJpLCB2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKG9wdHMubW9kZSA9PT0gJ3ZpZXcnKSB7XG4gICAgICAgICAgaGxkLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICAgIHJhZC5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgICB9XG4gICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIHJlbmRlcmluZyB2YWx1ZScsIGVycm9yKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEluZGl2aWR1YWwgcHJvcGVydHkgbW9kaWZpZWQgaGFuZGxlciB0byBpbmRpY2F0ZSBjaG9zZW4gb3B0aW9uXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICBmdW5jdGlvbiBoYW5kbGVyICgpIHtcbiAgICAkKCdpbnB1dCcsIHNlbGYpLmVhY2goKGksIGVsKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9ICQoZWwpLmRhdGEoJ3ZhbHVlJyk7XG4gICAgICBjb25zdCBoYXNWYWx1ZSA9IGluZGl2aWR1YWwuaGFzVmFsdWUocHJvcGVydHlfdXJpLCB2YWx1ZSk7XG4gICAgICAkKGVsKS5wcm9wKCdjaGVja2VkJywgaGFzVmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKHNwZWMgJiYgc3BlYy5oYXNWYWx1ZSgndi11aTp0b29sdGlwJykpIHtcbiAgICB0aGlzLnRvb2x0aXAoe1xuICAgICAgdGl0bGU6IHNwZWNbJ3YtdWk6dG9vbHRpcCddLm1hcChVdGlsLmZvcm1hdFZhbHVlKS5qb2luKCcgJyksXG4gICAgICBwbGFjZW1lbnQ6ICdsZWZ0JyxcbiAgICAgIGNvbnRhaW5lcjogJ2JvZHknLFxuICAgICAgdHJpZ2dlcjogJ2hvdmVyJyxcbiAgICAgIGFuaW1hdGlvbjogZmFsc2UsXG4gICAgfSkub25lKCdyZW1vdmUnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgJChlLmRlbGVnYXRlVGFyZ2V0KS50b29sdGlwKCdkZXN0cm95Jyk7XG4gICAgfSk7XG4gIH1cblxuICB0aGlzLm9uKCd1cGRhdGUnLCBmdW5jdGlvbiAoZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgcG9wdWxhdGUoKTtcbiAgfSk7XG5cbiAgdGhpcy5vbigndmlldyBlZGl0IHNlYXJjaCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAoZS50eXBlID09PSAndmlldycpIHtcbiAgICAgICQoJ2Rpdi5yYWRpbycsIGUuZGVsZWdhdGVUYXJnZXQpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgJCgnaW5wdXQnLCBlLmRlbGVnYXRlVGFyZ2V0KS5hdHRyKCdkaXNhYmxlZCcsICd0cnVlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoJ2Rpdi5yYWRpbycsIGUuZGVsZWdhdGVUYXJnZXQpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgJCgnaW5wdXQnLCBlLmRlbGVnYXRlVGFyZ2V0KS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xuICAgIH1cbiAgICBpZiAoZS50eXBlID09PSAnc2VhcmNoJykge1xuICAgICAgY29uc3QgZGF0YURlbGV0ZWQgPSAkKGUuZGVsZWdhdGVUYXJnZXQpLmRhdGEoJ2RlbGV0ZWQnKTtcbiAgICAgIHdpdGhEZWxldGVkID0gdHlwZW9mIGRhdGFEZWxldGVkID09PSAnYm9vbGVhbicgPyBkYXRhRGVsZXRlZCA6IHRydWU7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgdGVtcGxhdGU6IGBcbjxkaXYgY2xhc3M9XCJyYWRpb1wiPlxuICA8bGFiZWw+XG4gICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIC8+XG4gIDwvbGFiZWw+XG48L2Rpdj5cbiAgYCxcbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztNQUVPQSxDQUFDLEdBQUFDLE9BQUEsQ0FBQUMsT0FBQTtJQUFBLGFBQUFDLGFBQUE7TUFFREMsSUFBSSxHQUFBRCxhQUFBLENBQUFELE9BQUE7SUFBQSxhQUFBRyx5QkFBQTtNQUVKQyxlQUFlLEdBQUFELHlCQUFBLENBQUFILE9BQUE7SUFBQSxhQUFBSyxvQkFBQTtNQUVkQyxXQUFXLEdBQUFELG9CQUFBLENBQVhDLFdBQVc7TUFBRUMsT0FBTyxHQUFBRixvQkFBQSxDQUFQRSxP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