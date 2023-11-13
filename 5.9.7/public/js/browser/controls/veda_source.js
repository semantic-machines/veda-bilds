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
      $.fn.veda_source = function (options) {
        var _this = this;
        var opts = _objectSpread(_objectSpread({}, defaults), options);
        var control = $(opts.template);
        var individual = opts.individual;
        var property_uri = opts.property_uri;
        var editorEl = control.get(0);
        opts.value = individual.hasValue(property_uri) ? individual.get(property_uri)[0].toString() : '';
        opts.change = function (value) {
          individual.set(property_uri, [value]);
        };
        if (typeof this.attr('data-mode') !== 'undefined') opts.sourceMode = this.attr('data-mode');
        if (property_uri === 'v-s:script') opts.sourceMode = 'ace/mode/javascript';
        if (property_uri === 'v-ui:template') opts.sourceMode = 'ace/mode/html';
        var debounce = function debounce(f, ms) {
          var skip = false;
          return function () {
            if (skip) return;
            skip = true;
            setTimeout(function () {
              return skip = false;
            }, ms);
            return f.apply(void 0, arguments);
          };
        };
        _context.import('ace').then(function (module) {
          var ace = module.default;
          var editor = ace.edit(editorEl, {
            mode: opts.sourceMode,
            readOnly: opts.mode === 'view',
            selectionStyle: 'text',
            fontSize: 14,
            value: opts.value
          });
          _this.on('view edit search', function (e) {
            e.stopPropagation();
            if (e.type === 'view') {
              editor.setReadOnly(true);
            } else if (e.type === 'edit') {
              editor.setReadOnly(false);
            } else if (e.type === 'search') {
              editor.setReadOnly(false);
            }
          });
          var editorHandler = function editorHandler(delta) {
            var value = opts.parser(editor.session.getValue());
            opts.change(value);
          };
          var debouncedEditorHandler = debounce(editorHandler, 100);
          editor.session.on('change', debouncedEditorHandler);
          var individualHandler = function individualHandler(values) {
            var value = opts.parser(editor.session.getValue());
            if (!values.length || values[0].toString() !== value) {
              editor.setValue(values.length ? values[0].toString() : '');
            }
          };
          var debouncedIndividualHandler = debounce(individualHandler, 100);
          individual.on(property_uri, debouncedIndividualHandler);
          _this.one('remove', function () {
            individual.off(property_uri, debouncedIndividualHandler);
            editor.destroy();
          });
        });
        this.on('view edit search', function (e) {
          e.stopPropagation();
        });
        this.append(control);
        return this;
      };
      defaults = {
        value: '',
        template: "<div class=\"panel panel-default\" style=\"min-height:300px\"></div>",
        mode: 'javascript',
        parser: function parser(input) {
          return input || null;
        }
      };
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiZm4iLCJ2ZWRhX3NvdXJjZSIsIm9wdGlvbnMiLCJfdGhpcyIsIm9wdHMiLCJfb2JqZWN0U3ByZWFkIiwiZGVmYXVsdHMiLCJjb250cm9sIiwidGVtcGxhdGUiLCJpbmRpdmlkdWFsIiwicHJvcGVydHlfdXJpIiwiZWRpdG9yRWwiLCJnZXQiLCJ2YWx1ZSIsImhhc1ZhbHVlIiwidG9TdHJpbmciLCJjaGFuZ2UiLCJzZXQiLCJhdHRyIiwic291cmNlTW9kZSIsImRlYm91bmNlIiwiZiIsIm1zIiwic2tpcCIsInNldFRpbWVvdXQiLCJhcHBseSIsImFyZ3VtZW50cyIsIl9jb250ZXh0IiwiaW1wb3J0IiwidGhlbiIsIm1vZHVsZSIsImFjZSIsImVkaXRvciIsImVkaXQiLCJtb2RlIiwicmVhZE9ubHkiLCJzZWxlY3Rpb25TdHlsZSIsImZvbnRTaXplIiwib24iLCJlIiwic3RvcFByb3BhZ2F0aW9uIiwidHlwZSIsInNldFJlYWRPbmx5IiwiZWRpdG9ySGFuZGxlciIsImRlbHRhIiwicGFyc2VyIiwic2Vzc2lvbiIsImdldFZhbHVlIiwiZGVib3VuY2VkRWRpdG9ySGFuZGxlciIsImluZGl2aWR1YWxIYW5kbGVyIiwidmFsdWVzIiwibGVuZ3RoIiwic2V0VmFsdWUiLCJkZWJvdW5jZWRJbmRpdmlkdWFsSGFuZGxlciIsIm9uZSIsIm9mZiIsImRlc3Ryb3kiLCJhcHBlbmQiLCJpbnB1dCJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NvdXJjZS13ZWIvanMvYnJvd3Nlci9jb250cm9scy92ZWRhX3NvdXJjZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTb3VyY2UgY29udHJvbFxuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG4kLmZuLnZlZGFfc291cmNlID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgY29uc3Qgb3B0cyA9IHsuLi5kZWZhdWx0cywgLi4ub3B0aW9uc307XG4gIGNvbnN0IGNvbnRyb2wgPSAkKG9wdHMudGVtcGxhdGUpO1xuICBjb25zdCBpbmRpdmlkdWFsID0gb3B0cy5pbmRpdmlkdWFsO1xuICBjb25zdCBwcm9wZXJ0eV91cmkgPSBvcHRzLnByb3BlcnR5X3VyaTtcbiAgY29uc3QgZWRpdG9yRWwgPSBjb250cm9sLmdldCgwKTtcblxuICBvcHRzLnZhbHVlID0gaW5kaXZpZHVhbC5oYXNWYWx1ZShwcm9wZXJ0eV91cmkpID8gaW5kaXZpZHVhbC5nZXQocHJvcGVydHlfdXJpKVswXS50b1N0cmluZygpIDogJyc7XG4gIG9wdHMuY2hhbmdlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgaW5kaXZpZHVhbC5zZXQocHJvcGVydHlfdXJpLCBbdmFsdWVdKTtcbiAgfTtcblxuICBpZiAodHlwZW9mIHRoaXMuYXR0cignZGF0YS1tb2RlJykgIT09ICd1bmRlZmluZWQnKSBvcHRzLnNvdXJjZU1vZGUgPSB0aGlzLmF0dHIoJ2RhdGEtbW9kZScpO1xuICBpZiAocHJvcGVydHlfdXJpID09PSAndi1zOnNjcmlwdCcpIG9wdHMuc291cmNlTW9kZSA9ICdhY2UvbW9kZS9qYXZhc2NyaXB0JztcbiAgaWYgKHByb3BlcnR5X3VyaSA9PT0gJ3YtdWk6dGVtcGxhdGUnKSBvcHRzLnNvdXJjZU1vZGUgPSAnYWNlL21vZGUvaHRtbCc7XG5cbiAgY29uc3QgZGVib3VuY2UgPSBmdW5jdGlvbiAoZiwgbXMpIHtcbiAgICBsZXQgc2tpcCA9IGZhbHNlO1xuICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgICAgaWYgKHNraXApIHJldHVybjtcbiAgICAgIHNraXAgPSB0cnVlO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiBza2lwID0gZmFsc2UsIG1zKTtcbiAgICAgIHJldHVybiBmKC4uLmFyZ3MpO1xuICAgIH07XG4gIH07XG5cbiAgaW1wb3J0KCdhY2UnKS50aGVuKChtb2R1bGUpID0+IHtcbiAgICBjb25zdCBhY2UgPSBtb2R1bGUuZGVmYXVsdDtcblxuICAgIGNvbnN0IGVkaXRvciA9IGFjZS5lZGl0KGVkaXRvckVsLCB7XG4gICAgICBtb2RlOiBvcHRzLnNvdXJjZU1vZGUsXG4gICAgICByZWFkT25seTogb3B0cy5tb2RlID09PSAndmlldycsXG4gICAgICBzZWxlY3Rpb25TdHlsZTogJ3RleHQnLFxuICAgICAgZm9udFNpemU6IDE0LFxuICAgICAgdmFsdWU6IG9wdHMudmFsdWUsXG4gICAgfSk7XG5cbiAgICB0aGlzLm9uKCd2aWV3IGVkaXQgc2VhcmNoJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBpZiAoZS50eXBlID09PSAndmlldycpIHtcbiAgICAgICAgZWRpdG9yLnNldFJlYWRPbmx5KHRydWUpO1xuICAgICAgfSBlbHNlIGlmIChlLnR5cGUgPT09ICdlZGl0Jykge1xuICAgICAgICBlZGl0b3Iuc2V0UmVhZE9ubHkoZmFsc2UpO1xuICAgICAgfSBlbHNlIGlmIChlLnR5cGUgPT09ICdzZWFyY2gnKSB7XG4gICAgICAgIGVkaXRvci5zZXRSZWFkT25seShmYWxzZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBlZGl0b3JIYW5kbGVyID0gZnVuY3Rpb24gKGRlbHRhKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IG9wdHMucGFyc2VyKCBlZGl0b3Iuc2Vzc2lvbi5nZXRWYWx1ZSgpICk7XG4gICAgICBvcHRzLmNoYW5nZSh2YWx1ZSk7XG4gICAgfTtcbiAgICBjb25zdCBkZWJvdW5jZWRFZGl0b3JIYW5kbGVyID0gZGVib3VuY2UoZWRpdG9ySGFuZGxlciwgMTAwKTtcblxuICAgIGVkaXRvci5zZXNzaW9uLm9uKCdjaGFuZ2UnLCBkZWJvdW5jZWRFZGl0b3JIYW5kbGVyKTtcblxuICAgIGNvbnN0IGluZGl2aWR1YWxIYW5kbGVyID0gZnVuY3Rpb24gKHZhbHVlcykge1xuICAgICAgY29uc3QgdmFsdWUgPSBvcHRzLnBhcnNlciggZWRpdG9yLnNlc3Npb24uZ2V0VmFsdWUoKSApO1xuICAgICAgaWYgKCF2YWx1ZXMubGVuZ3RoIHx8IHZhbHVlc1swXS50b1N0cmluZygpICE9PSB2YWx1ZSkge1xuICAgICAgICBlZGl0b3Iuc2V0VmFsdWUoIHZhbHVlcy5sZW5ndGggPyB2YWx1ZXNbMF0udG9TdHJpbmcoKSA6ICcnICk7XG4gICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBkZWJvdW5jZWRJbmRpdmlkdWFsSGFuZGxlciA9IGRlYm91bmNlKGluZGl2aWR1YWxIYW5kbGVyLCAxMDApO1xuXG4gICAgaW5kaXZpZHVhbC5vbihwcm9wZXJ0eV91cmksIGRlYm91bmNlZEluZGl2aWR1YWxIYW5kbGVyKTtcbiAgICB0aGlzLm9uZSgncmVtb3ZlJywgZnVuY3Rpb24gKCkge1xuICAgICAgaW5kaXZpZHVhbC5vZmYocHJvcGVydHlfdXJpLCBkZWJvdW5jZWRJbmRpdmlkdWFsSGFuZGxlcik7XG4gICAgICBlZGl0b3IuZGVzdHJveSgpO1xuICAgIH0pO1xuICB9KTtcblxuICB0aGlzLm9uKCd2aWV3IGVkaXQgc2VhcmNoJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICB9KTtcblxuICB0aGlzLmFwcGVuZChjb250cm9sKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgdmFsdWU6ICcnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJwYW5lbCBwYW5lbC1kZWZhdWx0XCIgc3R5bGU9XCJtaW4taGVpZ2h0OjMwMHB4XCI+PC9kaXY+YCxcbiAgbW9kZTogJ2phdmFzY3JpcHQnLFxuICBwYXJzZXI6IGZ1bmN0aW9uIChpbnB1dCkge1xuICAgIHJldHVybiAoaW5wdXQgfHwgbnVsbCk7XG4gIH0sXG59O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztNQUVPQSxDQUFDLEdBQUFDLE9BQUEsQ0FBQUMsT0FBQTtJQUFBO0lBQUFDLE9BQUEsV0FBQUEsQ0FBQTtNQUVSSCxDQUFDLENBQUNJLEVBQUUsQ0FBQ0MsV0FBVyxHQUFHLFVBQVVDLE9BQU8sRUFBRTtRQUFBLElBQUFDLEtBQUE7UUFDcEMsSUFBTUMsSUFBSSxHQUFBQyxhQUFBLENBQUFBLGFBQUEsS0FBT0MsUUFBUSxHQUFLSixPQUFPLENBQUM7UUFDdEMsSUFBTUssT0FBTyxHQUFHWCxDQUFDLENBQUNRLElBQUksQ0FBQ0ksUUFBUSxDQUFDO1FBQ2hDLElBQU1DLFVBQVUsR0FBR0wsSUFBSSxDQUFDSyxVQUFVO1FBQ2xDLElBQU1DLFlBQVksR0FBR04sSUFBSSxDQUFDTSxZQUFZO1FBQ3RDLElBQU1DLFFBQVEsR0FBR0osT0FBTyxDQUFDSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRS9CUixJQUFJLENBQUNTLEtBQUssR0FBR0osVUFBVSxDQUFDSyxRQUFRLENBQUNKLFlBQVksQ0FBQyxHQUFHRCxVQUFVLENBQUNHLEdBQUcsQ0FBQ0YsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNLLFFBQVEsRUFBRSxHQUFHLEVBQUU7UUFDaEdYLElBQUksQ0FBQ1ksTUFBTSxHQUFHLFVBQVVILEtBQUssRUFBRTtVQUM3QkosVUFBVSxDQUFDUSxHQUFHLENBQUNQLFlBQVksRUFBRSxDQUFDRyxLQUFLLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBRUQsSUFBSSxPQUFPLElBQUksQ0FBQ0ssSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLFdBQVcsRUFBRWQsSUFBSSxDQUFDZSxVQUFVLEdBQUcsSUFBSSxDQUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzNGLElBQUlSLFlBQVksS0FBSyxZQUFZLEVBQUVOLElBQUksQ0FBQ2UsVUFBVSxHQUFHLHFCQUFxQjtRQUMxRSxJQUFJVCxZQUFZLEtBQUssZUFBZSxFQUFFTixJQUFJLENBQUNlLFVBQVUsR0FBRyxlQUFlO1FBRXZFLElBQU1DLFFBQVEsR0FBRyxTQUFYQSxRQUFRQSxDQUFhQyxDQUFDLEVBQUVDLEVBQUUsRUFBRTtVQUNoQyxJQUFJQyxJQUFJLEdBQUcsS0FBSztVQUNoQixPQUFPLFlBQW1CO1lBQ3hCLElBQUlBLElBQUksRUFBRTtZQUNWQSxJQUFJLEdBQUcsSUFBSTtZQUNYQyxVQUFVLENBQUM7Y0FBQSxPQUFNRCxJQUFJLEdBQUcsS0FBSztZQUFBLEdBQUVELEVBQUUsQ0FBQztZQUNsQyxPQUFPRCxDQUFDLENBQUFJLEtBQUEsU0FBQUMsU0FBQSxDQUFTO1VBQ25CLENBQUM7UUFDSCxDQUFDO1FBRURDLFFBQUEsQ0FBQUMsTUFBQSxDQUFPLEtBQUssRUFBRUMsSUFBSSxDQUFDLFVBQUNDLE1BQU0sRUFBSztVQUM3QixJQUFNQyxHQUFHLEdBQUdELE1BQU0sQ0FBQ2hDLE9BQU87VUFFMUIsSUFBTWtDLE1BQU0sR0FBR0QsR0FBRyxDQUFDRSxJQUFJLENBQUN0QixRQUFRLEVBQUU7WUFDaEN1QixJQUFJLEVBQUU5QixJQUFJLENBQUNlLFVBQVU7WUFDckJnQixRQUFRLEVBQUUvQixJQUFJLENBQUM4QixJQUFJLEtBQUssTUFBTTtZQUM5QkUsY0FBYyxFQUFFLE1BQU07WUFDdEJDLFFBQVEsRUFBRSxFQUFFO1lBQ1p4QixLQUFLLEVBQUVULElBQUksQ0FBQ1M7VUFDZCxDQUFDLENBQUM7VUFFRlYsS0FBSSxDQUFDbUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLFVBQVVDLENBQUMsRUFBRTtZQUN2Q0EsQ0FBQyxDQUFDQyxlQUFlLEVBQUU7WUFDbkIsSUFBSUQsQ0FBQyxDQUFDRSxJQUFJLEtBQUssTUFBTSxFQUFFO2NBQ3JCVCxNQUFNLENBQUNVLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFDMUIsQ0FBQyxNQUFNLElBQUlILENBQUMsQ0FBQ0UsSUFBSSxLQUFLLE1BQU0sRUFBRTtjQUM1QlQsTUFBTSxDQUFDVSxXQUFXLENBQUMsS0FBSyxDQUFDO1lBQzNCLENBQUMsTUFBTSxJQUFJSCxDQUFDLENBQUNFLElBQUksS0FBSyxRQUFRLEVBQUU7Y0FDOUJULE1BQU0sQ0FBQ1UsV0FBVyxDQUFDLEtBQUssQ0FBQztZQUMzQjtVQUNGLENBQUMsQ0FBQztVQUVGLElBQU1DLGFBQWEsR0FBRyxTQUFoQkEsYUFBYUEsQ0FBYUMsS0FBSyxFQUFFO1lBQ3JDLElBQU0vQixLQUFLLEdBQUdULElBQUksQ0FBQ3lDLE1BQU0sQ0FBRWIsTUFBTSxDQUFDYyxPQUFPLENBQUNDLFFBQVEsRUFBRSxDQUFFO1lBQ3REM0MsSUFBSSxDQUFDWSxNQUFNLENBQUNILEtBQUssQ0FBQztVQUNwQixDQUFDO1VBQ0QsSUFBTW1DLHNCQUFzQixHQUFHNUIsUUFBUSxDQUFDdUIsYUFBYSxFQUFFLEdBQUcsQ0FBQztVQUUzRFgsTUFBTSxDQUFDYyxPQUFPLENBQUNSLEVBQUUsQ0FBQyxRQUFRLEVBQUVVLHNCQUFzQixDQUFDO1VBRW5ELElBQU1DLGlCQUFpQixHQUFHLFNBQXBCQSxpQkFBaUJBLENBQWFDLE1BQU0sRUFBRTtZQUMxQyxJQUFNckMsS0FBSyxHQUFHVCxJQUFJLENBQUN5QyxNQUFNLENBQUViLE1BQU0sQ0FBQ2MsT0FBTyxDQUFDQyxRQUFRLEVBQUUsQ0FBRTtZQUN0RCxJQUFJLENBQUNHLE1BQU0sQ0FBQ0MsTUFBTSxJQUFJRCxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUNuQyxRQUFRLEVBQUUsS0FBS0YsS0FBSyxFQUFFO2NBQ3BEbUIsTUFBTSxDQUFDb0IsUUFBUSxDQUFFRixNQUFNLENBQUNDLE1BQU0sR0FBR0QsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDbkMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFFO1lBQzlEO1VBQ0YsQ0FBQztVQUNELElBQU1zQywwQkFBMEIsR0FBR2pDLFFBQVEsQ0FBQzZCLGlCQUFpQixFQUFFLEdBQUcsQ0FBQztVQUVuRXhDLFVBQVUsQ0FBQzZCLEVBQUUsQ0FBQzVCLFlBQVksRUFBRTJDLDBCQUEwQixDQUFDO1VBQ3ZEbEQsS0FBSSxDQUFDbUQsR0FBRyxDQUFDLFFBQVEsRUFBRSxZQUFZO1lBQzdCN0MsVUFBVSxDQUFDOEMsR0FBRyxDQUFDN0MsWUFBWSxFQUFFMkMsMEJBQTBCLENBQUM7WUFDeERyQixNQUFNLENBQUN3QixPQUFPLEVBQUU7VUFDbEIsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDO1FBRUYsSUFBSSxDQUFDbEIsRUFBRSxDQUFDLGtCQUFrQixFQUFFLFVBQVVDLENBQUMsRUFBRTtVQUN2Q0EsQ0FBQyxDQUFDQyxlQUFlLEVBQUU7UUFDckIsQ0FBQyxDQUFDO1FBRUYsSUFBSSxDQUFDaUIsTUFBTSxDQUFDbEQsT0FBTyxDQUFDO1FBQ3BCLE9BQU8sSUFBSTtNQUNiLENBQUM7TUFFS0QsUUFBUSxHQUFHO1FBQ2ZPLEtBQUssRUFBRSxFQUFFO1FBQ1RMLFFBQVEsd0VBQW9FO1FBQzVFMEIsSUFBSSxFQUFFLFlBQVk7UUFDbEJXLE1BQU0sRUFBRSxTQUFBQSxPQUFVYSxLQUFLLEVBQUU7VUFDdkIsT0FBUUEsS0FBSyxJQUFJLElBQUk7UUFDdkI7TUFDRixDQUFDO0lBQUE7RUFBQTtBQUFBIn0=