"use strict";

System.register(["/js/common/util.js", "jquery"], function (_export, _context) {
  "use strict";

  var CommonUtil, $, pre, html;
  return {
    setters: [function (_jsCommonUtilJs) {
      CommonUtil = _jsCommonUtilJs.default;
    }, function (_jquery) {
      $ = _jquery.default;
    }],
    execute: function () {
      _export("pre", pre = function pre(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        template.tooltip({
          container: template,
          placement: 'bottom',
          trigger: 'hover',
          title: individual['rdfs:label'].map(CommonUtil.formatValue).join(' ')
        });
        template.click(function (e) {
          e.preventDefault();
        });
      });
      _export("html", html = "\n  <a id=\"logout\" class=\"logout\" href=\"#\" data-toggle=\"tooltip\" data-trigger=\"hover\" data-placement=\"bottom\">\n    <span class=\"glyphicon glyphicon-log-out\"></span> <span class=\"label label-default\"></span>\n  </a>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJDb21tb25VdGlsIiwiX2pzQ29tbW9uVXRpbEpzIiwiZGVmYXVsdCIsIl9qcXVlcnkiLCIkIiwiZXhlY3V0ZSIsIl9leHBvcnQiLCJwcmUiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJ0b29sdGlwIiwicGxhY2VtZW50IiwidHJpZ2dlciIsInRpdGxlIiwibWFwIiwiZm9ybWF0VmFsdWUiLCJqb2luIiwiY2xpY2siLCJlIiwicHJldmVudERlZmF1bHQiLCJodG1sIl0sInNvdXJjZXMiOlsiLi4vLi4vb250b2xvZ3kvc3lzdGVtLWNvcmUvdGVtcGxhdGVzL3YtdWlfRXhpdEJ1dHRvblRlbXBsYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21tb25VdGlsIGZyb20gJy9qcy9jb21tb24vdXRpbC5qcyc7XG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG5leHBvcnQgY29uc3QgcHJlID0gZnVuY3Rpb24gKGluZGl2aWR1YWwsIHRlbXBsYXRlLCBjb250YWluZXIsIG1vZGUsIGV4dHJhKSB7XG4gIHRlbXBsYXRlID0gJCh0ZW1wbGF0ZSk7XG4gIGNvbnRhaW5lciA9ICQoY29udGFpbmVyKTtcblxuICB0ZW1wbGF0ZS50b29sdGlwKHtcbiAgICBjb250YWluZXI6IHRlbXBsYXRlLFxuICAgIHBsYWNlbWVudDogJ2JvdHRvbScsXG4gICAgdHJpZ2dlcjogJ2hvdmVyJyxcbiAgICB0aXRsZTogaW5kaXZpZHVhbFsncmRmczpsYWJlbCddLm1hcChDb21tb25VdGlsLmZvcm1hdFZhbHVlKS5qb2luKCcgJyksXG4gIH0pO1xuICB0ZW1wbGF0ZS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgaHRtbCA9IGBcbiAgPGEgaWQ9XCJsb2dvdXRcIiBjbGFzcz1cImxvZ291dFwiIGhyZWY9XCIjXCIgZGF0YS10b2dnbGU9XCJ0b29sdGlwXCIgZGF0YS10cmlnZ2VyPVwiaG92ZXJcIiBkYXRhLXBsYWNlbWVudD1cImJvdHRvbVwiPlxuICAgIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1sb2ctb3V0XCI+PC9zcGFuPiA8c3BhbiBjbGFzcz1cImxhYmVsIGxhYmVsLWRlZmF1bHRcIj48L3NwYW4+XG4gIDwvYT5cbmA7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O01BQU9BLFVBQVUsR0FBQUMsZUFBQSxDQUFBQyxPQUFBO0lBQUEsYUFBQUMsT0FBQTtNQUNWQyxDQUFDLEdBQUFELE9BQUEsQ0FBQUQsT0FBQTtJQUFBO0lBQUFHLE9BQUEsV0FBQUEsQ0FBQTtNQUFBQyxPQUFBLFFBRUtDLEdBQUcsR0FBRyxTQUFOQSxHQUFHQSxDQUFhQyxVQUFVLEVBQUVDLFFBQVEsRUFBRUMsU0FBUyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRTtRQUN6RUgsUUFBUSxHQUFHTCxDQUFDLENBQUNLLFFBQVEsQ0FBQztRQUN0QkMsU0FBUyxHQUFHTixDQUFDLENBQUNNLFNBQVMsQ0FBQztRQUV4QkQsUUFBUSxDQUFDSSxPQUFPLENBQUM7VUFDZkgsU0FBUyxFQUFFRCxRQUFRO1VBQ25CSyxTQUFTLEVBQUUsUUFBUTtVQUNuQkMsT0FBTyxFQUFFLE9BQU87VUFDaEJDLEtBQUssRUFBRVIsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDUyxHQUFHLENBQUNqQixVQUFVLENBQUNrQixXQUFXLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLEdBQUc7UUFDdEUsQ0FBQyxDQUFDO1FBQ0ZWLFFBQVEsQ0FBQ1csS0FBSyxDQUFDLFVBQVVDLENBQUMsRUFBRTtVQUMxQkEsQ0FBQyxDQUFDQyxjQUFjLEVBQUU7UUFDcEIsQ0FBQyxDQUFDO01BQ0osQ0FBQztNQUFBaEIsT0FBQSxTQUVZaUIsSUFBSTtJQUFBO0VBQUE7QUFBQSJ9