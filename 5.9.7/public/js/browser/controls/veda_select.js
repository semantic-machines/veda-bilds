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
      $.fn.veda_select = function (params) {
        var _this$attr;
        var opts = _objectSpread(_objectSpread({}, defaults), params);
        var control = $(opts.template);
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
        var placeholder = this.attr('placeholder') || (spec && spec.hasValue('v-ui:placeholder') ? spec['v-ui:placeholder'].map(Util.formatValue).join(' ') : new IndividualModel('v-s:SelectValueBundle'));
        var source = this.attr('data-source') || undefined;
        var template = this.attr('data-template') || '{@.rdfs:label}';
        var isSingle = this.attr('data-single') || (spec && spec.hasValue('v-ui:maxCardinality') ? spec['v-ui:maxCardinality'][0] === 1 : true);
        var withDeleted = this.attr('data-deleted') || false;
        if (_instanceof(placeholder, IndividualModel)) {
          placeholder.load().then(function (placeholderLoaded) {
            placeholder = placeholderLoaded.toString();
            populate();
          });
        } else {
          populate();
        }
        var tabindex = this.attr('tabindex');
        if (tabindex) {
          this.removeAttr('tabindex');
          control.attr('tabindex', tabindex);
        }
        control.change(function (e) {
          var value = $('option:selected', control).data('value');
          if (isSingle) {
            individual.set(property_uri, [value]);
          } else {
            if (!individual.hasValue(property_uri, value)) {
              individual.addValue(property_uri, value);
            }
            $(e.delegateTarget).children(':first').prop('selected', true);
          }
        });
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
          control.empty();
          var first_opt = $('<option></option>');
          first_opt.text(placeholder).data('value', null).appendTo(control);
          var optionsPromises = options.map(function (value, index) {
            if (index >= 100) {
              return;
            }
            var opt = $('<option></option>').appendTo(control);
            return renderValue(value, template).then(function (rendered) {
              opt.text(rendered).data('value', value);
              if (_instanceof(value, IndividualModel) && value.hasValue('v-s:deleted', true)) {
                opt.addClass('deleted');
              }
              if (isSingle && individual.hasValue(property_uri, value)) {
                opt.prop('selected', true);
              }
              return rendered;
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
          if (isSingle) {
            populate().then(function () {
              $('option', control).each(function (i, el) {
                var value = $(el).data('value');
                var hasValue = !!value && individual.hasValue(property_uri, value);
                $(el).prop('selected', hasValue);
              });
            });
          }
        }
        if (spec && spec.hasValue('v-ui:tooltip')) {
          control.tooltip({
            title: spec['v-ui:tooltip'].map(Util.formatValue).join(' '),
            placement: 'top',
            container: 'body',
            trigger: 'hover',
            animation: false
          });
          this.one('remove', function () {
            control.tooltip('destroy');
          });
        }
        this.on('view edit search', function (e) {
          e.stopPropagation();
          if (e.type === 'search') {
            var dataDeleted = $(e.delegateTarget).data('deleted');
            withDeleted = typeof dataDeleted === 'boolean' ? dataDeleted : true;
          }
        });
        this.on('update', function (e) {
          e.stopPropagation();
          populate();
        });
        this.append(control);
        return this;
      };
      defaults = {
        template: "\n<select class=\"form-control\">\n  <option></option>\n</select>\n  "
      };
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfY29tbW9uVXRpbEpzIiwiVXRpbCIsIl9jb21tb25JbmRpdmlkdWFsX21vZGVsSnMiLCJJbmRpdmlkdWFsTW9kZWwiLCJfdmVkYV9jb250cm9sX3V0aWxKcyIsImludGVycG9sYXRlIiwiZnRRdWVyeSIsInJlbmRlclZhbHVlIiwiZXhlY3V0ZSIsImZuIiwidmVkYV9zZWxlY3QiLCJwYXJhbXMiLCJfdGhpcyRhdHRyIiwib3B0cyIsIl9vYmplY3RTcHJlYWQiLCJkZWZhdWx0cyIsImNvbnRyb2wiLCJ0ZW1wbGF0ZSIsImluZGl2aWR1YWwiLCJwcm9wZXJ0eV91cmkiLCJyZWxfdXJpIiwic3BlYyIsInJhbmdlUmVzdHJpY3Rpb24iLCJoYXNWYWx1ZSIsInVuZGVmaW5lZCIsInJhbmdlIiwicXVlcnlQYXR0ZXJuIiwiYXR0ciIsInRvU3RyaW5nIiwicXVlcnlQcmVmaXgiLCJtYXAiLCJpdGVtIiwiaWQiLCJqb2luIiwic29ydCIsInBsYWNlaG9sZGVyIiwiZm9ybWF0VmFsdWUiLCJzb3VyY2UiLCJpc1NpbmdsZSIsIndpdGhEZWxldGVkIiwiX2luc3RhbmNlb2YiLCJsb2FkIiwidGhlbiIsInBsYWNlaG9sZGVyTG9hZGVkIiwicG9wdWxhdGUiLCJ0YWJpbmRleCIsInJlbW92ZUF0dHIiLCJjaGFuZ2UiLCJlIiwidmFsdWUiLCJkYXRhIiwic2V0IiwiYWRkVmFsdWUiLCJkZWxlZ2F0ZVRhcmdldCIsImNoaWxkcmVuIiwicHJvcCIsIm9uIiwiaGFuZGxlciIsIm9uZSIsIm9mZiIsIm9wdGlvbnMiLCJyZW5kZXJPcHRpb25zIiwiUHJvbWlzZSIsInJlc29sdmUiLCJldmFsIiwiY2F0Y2giLCJlcnJvciIsImNvbnNvbGUiLCJwcmVmaXgiLCJlbXB0eSIsImZpcnN0X29wdCIsInRleHQiLCJhcHBlbmRUbyIsIm9wdGlvbnNQcm9taXNlcyIsImluZGV4Iiwib3B0IiwicmVuZGVyZWQiLCJhZGRDbGFzcyIsImxvZyIsImFsbCIsImVhY2giLCJpIiwiZWwiLCJ0b29sdGlwIiwidGl0bGUiLCJwbGFjZW1lbnQiLCJjb250YWluZXIiLCJ0cmlnZ2VyIiwiYW5pbWF0aW9uIiwic3RvcFByb3BhZ2F0aW9uIiwidHlwZSIsImRhdGFEZWxldGVkIiwiYXBwZW5kIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc291cmNlLXdlYi9qcy9icm93c2VyL2NvbnRyb2xzL3ZlZGFfc2VsZWN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFNlbGVjdCBjb250cm9sXG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmltcG9ydCBVdGlsIGZyb20gJy4uLy4uL2NvbW1vbi91dGlsLmpzJztcblxuaW1wb3J0IEluZGl2aWR1YWxNb2RlbCBmcm9tICcuLi8uLi9jb21tb24vaW5kaXZpZHVhbF9tb2RlbC5qcyc7XG5cbmltcG9ydCB7aW50ZXJwb2xhdGUsIGZ0UXVlcnksIHJlbmRlclZhbHVlfSBmcm9tICcuL3ZlZGFfY29udHJvbF91dGlsLmpzJztcblxuJC5mbi52ZWRhX3NlbGVjdCA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgY29uc3Qgb3B0cyA9IHsuLi5kZWZhdWx0cywgLi4ucGFyYW1zfTtcbiAgY29uc3QgY29udHJvbCA9ICQob3B0cy50ZW1wbGF0ZSk7XG4gIGNvbnN0IGluZGl2aWR1YWwgPSBvcHRzLmluZGl2aWR1YWw7XG4gIGNvbnN0IHByb3BlcnR5X3VyaSA9IG9wdHMucHJvcGVydHlfdXJpIHx8IG9wdHMucmVsX3VyaTtcbiAgY29uc3Qgc3BlYyA9IG9wdHMuc3BlYztcbiAgY29uc3QgcmFuZ2VSZXN0cmljdGlvbiA9IHNwZWMgJiYgc3BlYy5oYXNWYWx1ZSgndi11aTpyYW5nZVJlc3RyaWN0aW9uJykgPyBzcGVjWyd2LXVpOnJhbmdlUmVzdHJpY3Rpb24nXVswXSA6IHVuZGVmaW5lZDtcbiAgY29uc3QgcmFuZ2UgPSByYW5nZVJlc3RyaWN0aW9uID8gW3JhbmdlUmVzdHJpY3Rpb25dIDogKG5ldyBJbmRpdmlkdWFsTW9kZWwocHJvcGVydHlfdXJpKSlbJ3JkZnM6cmFuZ2UnXTtcbiAgY29uc3QgcXVlcnlQYXR0ZXJuID0gdGhpcy5hdHRyKCdkYXRhLXF1ZXJ5LXBhdHRlcm4nKSA/PyAoc3BlYyAmJiBzcGVjLmhhc1ZhbHVlKCd2LXVpOnF1ZXJ5UGF0dGVybicpID8gc3BlY1sndi11aTpxdWVyeVBhdHRlcm4nXVswXS50b1N0cmluZygpIDogdW5kZWZpbmVkKTtcbiAgY29uc3QgcXVlcnlQcmVmaXggPSB0aGlzLmF0dHIoJ2RhdGEtcXVlcnktcHJlZml4JykgfHwgKCBzcGVjICYmIHNwZWMuaGFzVmFsdWUoJ3YtdWk6cXVlcnlQcmVmaXgnKSA/IHNwZWNbJ3YtdWk6cXVlcnlQcmVmaXgnXVswXSA6IHJhbmdlLm1hcCgoaXRlbSkgPT4ge1xuICAgIHJldHVybiAnXFwncmRmOnR5cGVcXCc9PT1cXCcnICsgaXRlbS5pZCArICdcXCcnO1xuICB9KS5qb2luKCcgfHwgJykgKTtcbiAgY29uc3Qgc29ydCA9IHRoaXMuYXR0cignZGF0YS1zb3J0JykgfHwgKCBzcGVjICYmIHNwZWMuaGFzVmFsdWUoJ3YtdWk6c29ydCcpICYmIHNwZWNbJ3YtdWk6c29ydCddWzBdLnRvU3RyaW5nKCkgKTtcbiAgbGV0IHBsYWNlaG9sZGVyID0gdGhpcy5hdHRyKCdwbGFjZWhvbGRlcicpIHx8ICggc3BlYyAmJiBzcGVjLmhhc1ZhbHVlKCd2LXVpOnBsYWNlaG9sZGVyJykgPyBzcGVjWyd2LXVpOnBsYWNlaG9sZGVyJ10ubWFwKFV0aWwuZm9ybWF0VmFsdWUpLmpvaW4oJyAnKSA6IG5ldyBJbmRpdmlkdWFsTW9kZWwoJ3YtczpTZWxlY3RWYWx1ZUJ1bmRsZScpICk7XG4gIGNvbnN0IHNvdXJjZSA9IHRoaXMuYXR0cignZGF0YS1zb3VyY2UnKSB8fCB1bmRlZmluZWQ7XG4gIGNvbnN0IHRlbXBsYXRlID0gdGhpcy5hdHRyKCdkYXRhLXRlbXBsYXRlJykgfHwgJ3tALnJkZnM6bGFiZWx9JztcbiAgY29uc3QgaXNTaW5nbGUgPSB0aGlzLmF0dHIoJ2RhdGEtc2luZ2xlJykgfHwgKCBzcGVjICYmIHNwZWMuaGFzVmFsdWUoJ3YtdWk6bWF4Q2FyZGluYWxpdHknKSA/IHNwZWNbJ3YtdWk6bWF4Q2FyZGluYWxpdHknXVswXSA9PT0gMSA6IHRydWUgKTtcbiAgbGV0IHdpdGhEZWxldGVkID0gdGhpcy5hdHRyKCdkYXRhLWRlbGV0ZWQnKSB8fCBmYWxzZTtcblxuICBpZiAocGxhY2Vob2xkZXIgaW5zdGFuY2VvZiBJbmRpdmlkdWFsTW9kZWwpIHtcbiAgICBwbGFjZWhvbGRlci5sb2FkKCkudGhlbigocGxhY2Vob2xkZXJMb2FkZWQpID0+IHtcbiAgICAgIHBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXJMb2FkZWQudG9TdHJpbmcoKTtcbiAgICAgIHBvcHVsYXRlKCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgcG9wdWxhdGUoKTtcbiAgfVxuXG4gIGNvbnN0IHRhYmluZGV4ID0gdGhpcy5hdHRyKCd0YWJpbmRleCcpO1xuICBpZiAodGFiaW5kZXgpIHtcbiAgICB0aGlzLnJlbW92ZUF0dHIoJ3RhYmluZGV4Jyk7XG4gICAgY29udHJvbC5hdHRyKCd0YWJpbmRleCcsIHRhYmluZGV4KTtcbiAgfVxuXG4gIGNvbnRyb2wuY2hhbmdlKChlKSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSAkKCdvcHRpb246c2VsZWN0ZWQnLCBjb250cm9sKS5kYXRhKCd2YWx1ZScpO1xuICAgIGlmIChpc1NpbmdsZSkge1xuICAgICAgaW5kaXZpZHVhbC5zZXQocHJvcGVydHlfdXJpLCBbdmFsdWVdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCAhaW5kaXZpZHVhbC5oYXNWYWx1ZShwcm9wZXJ0eV91cmksIHZhbHVlKSApIHtcbiAgICAgICAgaW5kaXZpZHVhbC5hZGRWYWx1ZShwcm9wZXJ0eV91cmksIHZhbHVlKTtcbiAgICAgIH1cbiAgICAgICQoZS5kZWxlZ2F0ZVRhcmdldCkuY2hpbGRyZW4oJzpmaXJzdCcpLnByb3AoJ3NlbGVjdGVkJywgdHJ1ZSk7XG4gICAgfVxuICB9KTtcblxuICBpbmRpdmlkdWFsLm9uKHByb3BlcnR5X3VyaSwgaGFuZGxlcik7XG4gIHRoaXMub25lKCdyZW1vdmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgaW5kaXZpZHVhbC5vZmYocHJvcGVydHlfdXJpLCBoYW5kbGVyKTtcbiAgfSk7XG5cbiAgaWYgKHRlbXBsYXRlKSB7XG4gICAgdGhpcy5yZW1vdmVBdHRyKCdkYXRhLXRlbXBsYXRlJyk7XG4gIH1cblxuICAvKipcbiAgICogUG9wdWxhdGUgb3B0aW9ucyBsaXN0XG4gICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAqL1xuICBmdW5jdGlvbiBwb3B1bGF0ZSAoKSB7XG4gICAgaWYgKHNwZWMgJiYgc3BlYy5oYXNWYWx1ZSgndi11aTpvcHRpb25WYWx1ZScpKSB7XG4gICAgICBjb25zdCBvcHRpb25zID0gc3BlY1sndi11aTpvcHRpb25WYWx1ZSddO1xuICAgICAgcmV0dXJuIHJlbmRlck9wdGlvbnMob3B0aW9ucyk7XG4gICAgfSBlbHNlIGlmIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZXZhbChzb3VyY2UpKVxuICAgICAgICAudGhlbihyZW5kZXJPcHRpb25zKVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignU291cmNlIGZhaWxlZCcsIHNvdXJjZSk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAocXVlcnlQcmVmaXgpIHtcbiAgICAgIHJldHVybiBpbnRlcnBvbGF0ZShxdWVyeVByZWZpeCwgaW5kaXZpZHVhbClcbiAgICAgICAgLnRoZW4oKHByZWZpeCkgPT4ge1xuICAgICAgICAgIHJldHVybiBmdFF1ZXJ5KHByZWZpeCwgdW5kZWZpbmVkLCBzb3J0LCB3aXRoRGVsZXRlZCwgcXVlcnlQYXR0ZXJuKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVuZGVyT3B0aW9ucylcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1F1ZXJ5IHByZWZpeCBmYWlsZWQnLCBxdWVyeVByZWZpeCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5kZXIgb3B0aW9ucyBsaXN0XG4gICAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnNcbiAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICovXG4gIGZ1bmN0aW9uIHJlbmRlck9wdGlvbnMgKG9wdGlvbnMpIHtcbiAgICBjb250cm9sLmVtcHR5KCk7XG4gICAgY29uc3QgZmlyc3Rfb3B0ID0gJCgnPG9wdGlvbj48L29wdGlvbj4nKTtcbiAgICBmaXJzdF9vcHQudGV4dChwbGFjZWhvbGRlcikuZGF0YSgndmFsdWUnLCBudWxsKS5hcHBlbmRUbyhjb250cm9sKTtcbiAgICBjb25zdCBvcHRpb25zUHJvbWlzZXMgPSBvcHRpb25zLm1hcCgodmFsdWUsIGluZGV4KSA9PiB7XG4gICAgICBpZiAoaW5kZXggPj0gMTAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9wdCA9ICQoJzxvcHRpb24+PC9vcHRpb24+JykuYXBwZW5kVG8oY29udHJvbCk7XG4gICAgICByZXR1cm4gcmVuZGVyVmFsdWUodmFsdWUsIHRlbXBsYXRlKS50aGVuKChyZW5kZXJlZCkgPT4ge1xuICAgICAgICBvcHQudGV4dChyZW5kZXJlZCkuZGF0YSgndmFsdWUnLCB2YWx1ZSk7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEluZGl2aWR1YWxNb2RlbCAmJiB2YWx1ZS5oYXNWYWx1ZSgndi1zOmRlbGV0ZWQnLCB0cnVlKSkge1xuICAgICAgICAgIG9wdC5hZGRDbGFzcygnZGVsZXRlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICggaXNTaW5nbGUgJiYgaW5kaXZpZHVhbC5oYXNWYWx1ZShwcm9wZXJ0eV91cmksIHZhbHVlKSApIHtcbiAgICAgICAgICBvcHQucHJvcCgnc2VsZWN0ZWQnLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVuZGVyZWQ7XG4gICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIHJlbmRlcmluZyB2YWx1ZScsIGVycm9yKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBQcm9taXNlLmFsbChvcHRpb25zUHJvbWlzZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluZGl2aWR1YWwgcHJvcGVydHkgbW9kaWZpZWQgaGFuZGxlciB0byBpbmRpY2F0ZSBjaG9zZW4gb3B0aW9uXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICBmdW5jdGlvbiBoYW5kbGVyICgpIHtcbiAgICBpZiAoaXNTaW5nbGUpIHtcbiAgICAgIHBvcHVsYXRlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICQoJ29wdGlvbicsIGNvbnRyb2wpLmVhY2goKGksIGVsKSA9PiB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSAkKGVsKS5kYXRhKCd2YWx1ZScpO1xuICAgICAgICAgIGNvbnN0IGhhc1ZhbHVlID0gISF2YWx1ZSAmJiBpbmRpdmlkdWFsLmhhc1ZhbHVlKHByb3BlcnR5X3VyaSwgdmFsdWUpO1xuICAgICAgICAgICQoZWwpLnByb3AoJ3NlbGVjdGVkJywgaGFzVmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGlmIChzcGVjICYmIHNwZWMuaGFzVmFsdWUoJ3YtdWk6dG9vbHRpcCcpKSB7XG4gICAgY29udHJvbC50b29sdGlwKHtcbiAgICAgIHRpdGxlOiBzcGVjWyd2LXVpOnRvb2x0aXAnXS5tYXAoVXRpbC5mb3JtYXRWYWx1ZSkuam9pbignICcpLFxuICAgICAgcGxhY2VtZW50OiAndG9wJyxcbiAgICAgIGNvbnRhaW5lcjogJ2JvZHknLFxuICAgICAgdHJpZ2dlcjogJ2hvdmVyJyxcbiAgICAgIGFuaW1hdGlvbjogZmFsc2UsXG4gICAgfSk7XG4gICAgdGhpcy5vbmUoJ3JlbW92ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnRyb2wudG9vbHRpcCgnZGVzdHJveScpO1xuICAgIH0pO1xuICB9XG5cbiAgdGhpcy5vbigndmlldyBlZGl0IHNlYXJjaCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAoZS50eXBlID09PSAnc2VhcmNoJykge1xuICAgICAgY29uc3QgZGF0YURlbGV0ZWQgPSAkKGUuZGVsZWdhdGVUYXJnZXQpLmRhdGEoJ2RlbGV0ZWQnKTtcbiAgICAgIHdpdGhEZWxldGVkID0gdHlwZW9mIGRhdGFEZWxldGVkID09PSAnYm9vbGVhbicgPyBkYXRhRGVsZXRlZCA6IHRydWU7XG4gICAgfVxuICB9KTtcbiAgdGhpcy5vbigndXBkYXRlJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHBvcHVsYXRlKCk7XG4gIH0pO1xuICB0aGlzLmFwcGVuZChjb250cm9sKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgdGVtcGxhdGU6IGBcbjxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj5cbiAgPG9wdGlvbj48L29wdGlvbj5cbjwvc2VsZWN0PlxuICBgLFxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O01BRU9BLENBQUMsR0FBQUMsT0FBQSxDQUFBQyxPQUFBO0lBQUEsYUFBQUMsYUFBQTtNQUVEQyxJQUFJLEdBQUFELGFBQUEsQ0FBQUQsT0FBQTtJQUFBLGFBQUFHLHlCQUFBO01BRUpDLGVBQWUsR0FBQUQseUJBQUEsQ0FBQUgsT0FBQTtJQUFBLGFBQUFLLG9CQUFBO01BRWRDLFdBQVcsR0FBQUQsb0JBQUEsQ0FBWEMsV0FBVztNQUFFQyxPQUFPLEdBQUFGLG9CQUFBLENBQVBFLE9BQU87TUFBRUMsV0FBVyxHQUFBSCxvQkFBQSxDQUFYRyxXQUFXO0lBQUE7SUFBQUMsT0FBQSxXQUFBQSxDQUFBO01BRXpDWCxDQUFDLENBQUNZLEVBQUUsQ0FBQ0MsV0FBVyxHQUFHLFVB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