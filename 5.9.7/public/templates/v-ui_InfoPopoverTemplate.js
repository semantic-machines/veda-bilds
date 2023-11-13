"use strict";

System.register(["jquery", "/js/common/util.js"], function (_export, _context) {
  "use strict";

  var $, CommonUtil, post, html;
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_jsCommonUtilJs) {
      CommonUtil = _jsCommonUtilJs.default;
    }],
    execute: function () {
      _export("post", post = function post(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        template.popover({
          content: individual['v-ui:info'].map(CommonUtil.formatValue).join(' '),
          container: template.parent(),
          trigger: 'click',
          placement: 'top',
          animation: false
        });
        template.on('inserted.bs.popover', function () {
          $('.popover-content', container).css('white-space', 'pre-line');
        });
      });
      _export("html", html = "\n  <span tabindex=\"0\" role=\"button\" class=\"glyphicon glyphicon-info-sign text-primary\"></span>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfanNDb21tb25VdGlsSnMiLCJDb21tb25VdGlsIiwiZXhlY3V0ZSIsIl9leHBvcnQiLCJwb3N0IiwiaW5kaXZpZHVhbCIsInRlbXBsYXRlIiwiY29udGFpbmVyIiwibW9kZSIsImV4dHJhIiwicG9wb3ZlciIsImNvbnRlbnQiLCJtYXAiLCJmb3JtYXRWYWx1ZSIsImpvaW4iLCJwYXJlbnQiLCJ0cmlnZ2VyIiwicGxhY2VtZW50IiwiYW5pbWF0aW9uIiwib24iLCJjc3MiLCJodG1sIl0sInNvdXJjZXMiOlsiLi4vLi4vb250b2xvZ3kvc3lzdGVtLWNvcmUvdGVtcGxhdGVzL3YtdWlfSW5mb1BvcG92ZXJUZW1wbGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IENvbW1vblV0aWwgZnJvbSAnL2pzL2NvbW1vbi91dGlsLmpzJztcblxuZXhwb3J0IGNvbnN0IHBvc3QgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuICB0ZW1wbGF0ZS5wb3BvdmVyKHtcbiAgICBjb250ZW50OiBpbmRpdmlkdWFsWyd2LXVpOmluZm8nXS5tYXAoQ29tbW9uVXRpbC5mb3JtYXRWYWx1ZSkuam9pbignICcpLFxuICAgIGNvbnRhaW5lcjogdGVtcGxhdGUucGFyZW50KCksXG4gICAgdHJpZ2dlcjogJ2NsaWNrJyxcbiAgICBwbGFjZW1lbnQ6ICd0b3AnLFxuICAgIGFuaW1hdGlvbjogZmFsc2UsXG4gIH0pO1xuICB0ZW1wbGF0ZS5vbignaW5zZXJ0ZWQuYnMucG9wb3ZlcicsIGZ1bmN0aW9uKCkge1xuICAgICQoJy5wb3BvdmVyLWNvbnRlbnQnLCBjb250YWluZXIpLmNzcygnd2hpdGUtc3BhY2UnLCAncHJlLWxpbmUnKTtcbiAgfSlcbn07XG5cbmV4cG9ydCBjb25zdCBodG1sID0gYFxuICA8c3BhbiB0YWJpbmRleD1cIjBcIiByb2xlPVwiYnV0dG9uXCIgY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWluZm8tc2lnbiB0ZXh0LXByaW1hcnlcIj48L3NwYW4+XG5gO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztNQUFPQSxDQUFDLEdBQUFDLE9BQUEsQ0FBQUMsT0FBQTtJQUFBLGFBQUFDLGVBQUE7TUFDREMsVUFBVSxHQUFBRCxlQUFBLENBQUFELE9BQUE7SUFBQTtJQUFBRyxPQUFBLFdBQUFBLENBQUE7TUFBQUMsT0FBQSxTQUVKQyxJQUFJLEdBQUcsU0FBUEEsSUFBSUEsQ0FBYUMsVUFBVSxFQUFFQyxRQUFRLEVBQUVDLFNBQVMsRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUU7UUFDMUVILFFBQVEsR0FBR1QsQ0FBQyxDQUFDUyxRQUFRLENBQUM7UUFDdEJDLFNBQVMsR0FBR1YsQ0FBQyxDQUFDVSxTQUFTLENBQUM7UUFDeEJELFFBQVEsQ0FBQ0ksT0FBTyxDQUFDO1VBQ2ZDLE9BQU8sRUFBRU4sVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDTyxHQUFHLENBQUNYLFVBQVUsQ0FBQ1ksV0FBVyxDQUFDLENBQUNDLElBQUksQ0FBQyxHQUFHLENBQUM7VUFDdEVQLFNBQVMsRUFBRUQsUUFBUSxDQUFDUyxNQUFNLEVBQUU7VUFDNUJDLE9BQU8sRUFBRSxPQUFPO1VBQ2hCQyxTQUFTLEVBQUUsS0FBSztVQUNoQkMsU0FBUyxFQUFFO1FBQ2IsQ0FBQyxDQUFDO1FBQ0ZaLFFBQVEsQ0FBQ2EsRUFBRSxDQUFDLHFCQUFxQixFQUFFLFlBQVc7VUFDNUN0QixDQUFDLENBQUMsa0JBQWtCLEVBQUVVLFNBQVMsQ0FBQyxDQUFDYSxHQUFHLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQztRQUNqRSxDQUFDLENBQUM7TUFDSixDQUFDO01BQUFqQixPQUFBLFNBRVlrQixJQUFJO0lBQUE7RUFBQTtBQUFBIn0=