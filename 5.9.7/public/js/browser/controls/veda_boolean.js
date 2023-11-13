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
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_commonUtilJs) {
      Util = _commonUtilJs.default;
    }],
    execute: function () {
      $.fn.veda_boolean = function (options) {
        var opts = _objectSpread(_objectSpread({}, defaults), options);
        var control = $(opts.template);
        var individual = opts.individual;
        var property_uri = opts.property_uri;
        var spec = opts.spec;
        var tabindex = this.attr('tabindex');
        if (tabindex) {
          this.removeAttr('tabindex');
          control.attr('tabindex', tabindex);
        }
        var handler = function handler(doc_property_uri) {
          if (individual.hasValue(property_uri)) {
            if (individual.get(property_uri)[0] === true) {
              control.prop('checked', true).prop('readonly', false).prop('indeterminate', false);
            } else {
              control.prop('checked', false).prop('readonly', false).prop('indeterminate', false);
            }
          } else {
            control.prop('readonly', true).prop('indeterminate', true);
          }
        };
        handler();
        individual.on(property_uri, handler);
        this.one('remove', function () {
          individual.off(property_uri, handler);
        });
        control.click(function () {
          if (control.prop('readonly')) {
            individual.set(property_uri, [false]);
          } else if (!control.prop('checked')) {
            individual.set(property_uri, []);
          } else {
            individual.set(property_uri, [true]);
          }
        });
        if (control.closest('.checkbox.disabled').length) {
          control.attr('disabled', 'disabled');
        }
        this.on('view edit search', function (e) {
          e.stopPropagation();
          if (e.type === 'view') {
            control.attr('disabled', 'disabled');
          } else {
            if (control.closest('.checkbox.disabled').length) {
              control.attr('disabled', 'disabled');
            } else {
              control.removeAttr('disabled');
            }
            if (spec && spec.hasValue('v-ui:tooltip')) {
              control.parents('label').tooltip({
                title: spec['v-ui:tooltip'].map(Util.formatValue).join(' '),
                placement: 'bottom',
                container: control,
                trigger: 'hover',
                animation: false
              });
            }
          }
        });
        this.append(control);
        return this;
      };
      defaults = {
        template: "<input type=\"checkbox\" />"
      };
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfY29tbW9uVXRpbEpzIiwiVXRpbCIsImV4ZWN1dGUiLCJmbiIsInZlZGFfYm9vbGVhbiIsIm9wdGlvbnMiLCJvcHRzIiwiX29iamVjdFNwcmVhZCIsImRlZmF1bHRzIiwiY29udHJvbCIsInRlbXBsYXRlIiwiaW5kaXZpZHVhbCIsInByb3BlcnR5X3VyaSIsInNwZWMiLCJ0YWJpbmRleCIsImF0dHIiLCJyZW1vdmVBdHRyIiwiaGFuZGxlciIsImRvY19wcm9wZXJ0eV91cmkiLCJoYXNWYWx1ZSIsImdldCIsInByb3AiLCJvbiIsIm9uZSIsIm9mZiIsImNsaWNrIiwic2V0IiwiY2xvc2VzdCIsImxlbmd0aCIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJ0eXBlIiwicGFyZW50cyIsInRvb2x0aXAiLCJ0aXRsZSIsIm1hcCIsImZvcm1hdFZhbHVlIiwiam9pbiIsInBsYWNlbWVudCIsImNvbnRhaW5lciIsInRyaWdnZXIiLCJhbmltYXRpb24iLCJhcHBlbmQiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zb3VyY2Utd2ViL2pzL2Jyb3dzZXIvY29udHJvbHMvdmVkYV9ib29sZWFuLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEJvb2xlYW4gY29udHJvbFxuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG5pbXBvcnQgVXRpbCBmcm9tICcuLi8uLi9jb21tb24vdXRpbC5qcyc7XG5cbiQuZm4udmVkYV9ib29sZWFuID0gZnVuY3Rpb24gKCBvcHRpb25zICkge1xuICBjb25zdCBvcHRzID0gey4uLmRlZmF1bHRzLCAuLi5vcHRpb25zfTtcbiAgY29uc3QgY29udHJvbCA9ICQoIG9wdHMudGVtcGxhdGUgKTtcbiAgY29uc3QgaW5kaXZpZHVhbCA9IG9wdHMuaW5kaXZpZHVhbDtcbiAgY29uc3QgcHJvcGVydHlfdXJpID0gb3B0cy5wcm9wZXJ0eV91cmk7XG4gIGNvbnN0IHNwZWMgPSBvcHRzLnNwZWM7XG5cbiAgY29uc3QgdGFiaW5kZXggPSB0aGlzLmF0dHIoJ3RhYmluZGV4Jyk7XG4gIGlmICh0YWJpbmRleCkge1xuICAgIHRoaXMucmVtb3ZlQXR0cigndGFiaW5kZXgnKTtcbiAgICBjb250cm9sLmF0dHIoJ3RhYmluZGV4JywgdGFiaW5kZXgpO1xuICB9XG5cbiAgY29uc3QgaGFuZGxlciA9IGZ1bmN0aW9uIChkb2NfcHJvcGVydHlfdXJpKSB7XG4gICAgaWYgKGluZGl2aWR1YWwuaGFzVmFsdWUocHJvcGVydHlfdXJpKSkge1xuICAgICAgaWYgKGluZGl2aWR1YWwuZ2V0KHByb3BlcnR5X3VyaSlbMF0gPT09IHRydWUpIHtcbiAgICAgICAgY29udHJvbC5wcm9wKCdjaGVja2VkJywgdHJ1ZSkucHJvcCgncmVhZG9ubHknLCBmYWxzZSkucHJvcCgnaW5kZXRlcm1pbmF0ZScsIGZhbHNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRyb2wucHJvcCgnY2hlY2tlZCcsIGZhbHNlKS5wcm9wKCdyZWFkb25seScsIGZhbHNlKS5wcm9wKCdpbmRldGVybWluYXRlJywgZmFsc2UpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb250cm9sLnByb3AoJ3JlYWRvbmx5JywgdHJ1ZSkucHJvcCgnaW5kZXRlcm1pbmF0ZScsIHRydWUpO1xuICAgIH1cbiAgfTtcbiAgaGFuZGxlcigpO1xuXG4gIGluZGl2aWR1YWwub24ocHJvcGVydHlfdXJpLCBoYW5kbGVyKTtcbiAgdGhpcy5vbmUoJ3JlbW92ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBpbmRpdmlkdWFsLm9mZihwcm9wZXJ0eV91cmksIGhhbmRsZXIpO1xuICB9KTtcblxuICBjb250cm9sLmNsaWNrKCgpID0+IHtcbiAgICBpZiAoIGNvbnRyb2wucHJvcCgncmVhZG9ubHknKSApIHtcbiAgICAgIGluZGl2aWR1YWwuc2V0KHByb3BlcnR5X3VyaSwgW2ZhbHNlXSk7XG4gICAgfSBlbHNlIGlmICggIWNvbnRyb2wucHJvcCgnY2hlY2tlZCcpICkge1xuICAgICAgaW5kaXZpZHVhbC5zZXQocHJvcGVydHlfdXJpLCBbXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluZGl2aWR1YWwuc2V0KHByb3BlcnR5X3VyaSwgW3RydWVdKTtcbiAgICB9XG4gIH0pO1xuXG4gIGlmICggY29udHJvbC5jbG9zZXN0KCcuY2hlY2tib3guZGlzYWJsZWQnKS5sZW5ndGggKSB7XG4gICAgY29udHJvbC5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICB9XG5cbiAgdGhpcy5vbigndmlldyBlZGl0IHNlYXJjaCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAoZS50eXBlID09PSAndmlldycpIHtcbiAgICAgIGNvbnRyb2wuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCBjb250cm9sLmNsb3Nlc3QoJy5jaGVja2JveC5kaXNhYmxlZCcpLmxlbmd0aCApIHtcbiAgICAgICAgY29udHJvbC5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29udHJvbC5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xuICAgICAgfVxuICAgICAgaWYgKHNwZWMgJiYgc3BlYy5oYXNWYWx1ZSgndi11aTp0b29sdGlwJykpIHtcbiAgICAgICAgY29udHJvbC5wYXJlbnRzKCdsYWJlbCcpLnRvb2x0aXAoe1xuICAgICAgICAgIHRpdGxlOiBzcGVjWyd2LXVpOnRvb2x0aXAnXS5tYXAoVXRpbC5mb3JtYXRWYWx1ZSkuam9pbignICcpLFxuICAgICAgICAgIHBsYWNlbWVudDogJ2JvdHRvbScsXG4gICAgICAgICAgY29udGFpbmVyOiBjb250cm9sLFxuICAgICAgICAgIHRyaWdnZXI6ICdob3ZlcicsXG4gICAgICAgICAgYW5pbWF0aW9uOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgdGhpcy5hcHBlbmQoY29udHJvbCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gIHRlbXBsYXRlOiBgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIC8+YCxcbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O01BRU9BLENBQUMsR0FBQUMsT0FBQSxDQUFBQyxPQUFBO0lBQUEsYUFBQUMsYUFBQTtNQUVEQyxJQUFJLEdBQUFELGFBQUEsQ0FBQUQsT0FBQTtJQUFBO0lBQUFHLE9BQUEsV0FBQUEsQ0FBQTtNQUVYTCxDQUFDLENBQUNNLEVBQUUsQ0FBQ0MsWUFBWSxHQUFHLFVBQVdDLE9BQU8sRUFBRztRQUN2QyxJQUFNQyxJQUFJLEdBQUFDLGFBQUEsQ0FBQUEsYUFBQSxLQUFPQyxRQUFRLEdBQUtILE9BQU8sQ0FBQztRQUN0QyxJQUFNSSxPQUFPLEdBQUdaLENBQUMsQ0FBRVMsSUFBSSxDQUFDSSxRQUFRLENBQUU7UUFDbEMsSUFBTUMsVUFBVSxHQUFHTCxJQUFJLENBQUNLLFVBQVU7UUFDbEMsSUFBTUMsWUFBWSxHQUFHTixJQUFJLENBQUNNLFlBQVk7UUFDdEMsSUFBTUMsSUFBSSxHQUFHUCxJQUFJLENBQUNPLElBQUk7UUFFdEIsSUFBTUMsUUFBUSxHQUFHLElBQUksQ0FBQ0MsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN0QyxJQUFJRCxRQUFRLEVBQUU7VUFDWixJQUFJLENBQUNFLFVBQVUsQ0FBQyxVQUFVLENBQUM7VUFDM0JQLE9BQU8sQ0FBQ00sSUFBSSxDQUFDLFVBQVUsRUFBRUQsUUFBUSxDQUFDO1FBQ3BDO1FBRUEsSUFBTUcsT0FBTyxHQUFHLFNBQVZBLE9BQU9BLENBQWFDLGdCQUFnQixFQUFFO1VBQzFDLElBQUlQLFVBQVUsQ0FBQ1EsUUFBUSxDQUFDUCxZQUFZLENBQUMsRUFBRTtZQUNyQyxJQUFJRCxVQUFVLENBQUNTLEdBQUcsQ0FBQ1IsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO2NBQzVDSCxPQUFPLENBQUNZLElBQUksQ0FBQyxTQUFTLEVB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