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
          trigger: 'hover',
          placement: 'bottom',
          title: individual['rdfs:label'].map(CommonUtil.formatValue).join(' ')
        });
      });
      _export("html", html = "\n  <a href=\"#/@\"><span class=\"fa fa-lg fa-search\"></span></a>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJDb21tb25VdGlsIiwiX2pzQ29tbW9uVXRpbEpzIiwiZGVmYXVsdCIsIl9qcXVlcnkiLCIkIiwiZXhlY3V0ZSIsIl9leHBvcnQiLCJwcmUiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJ0b29sdGlwIiwidHJpZ2dlciIsInBsYWNlbWVudCIsInRpdGxlIiwibWFwIiwiZm9ybWF0VmFsdWUiLCJqb2luIiwiaHRtbCJdLCJzb3VyY2VzIjpbIi4uLy4uL29udG9sb2d5L2dlbmVyaWMtYXBwbGljYXRpb24vdGVtcGxhdGVzL3Ytc19MYXlvdXRUZW1wbGF0ZV9zZWFyY2guanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbW1vblV0aWwgZnJvbSAnL2pzL2NvbW1vbi91dGlsLmpzJztcbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmV4cG9ydCBjb25zdCBwcmUgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gIHRlbXBsYXRlLnRvb2x0aXAoe1xuICAgIGNvbnRhaW5lcjogdGVtcGxhdGUsXG4gICAgdHJpZ2dlcjogJ2hvdmVyJyxcbiAgICBwbGFjZW1lbnQ6ICdib3R0b20nLFxuICAgIHRpdGxlOiBpbmRpdmlkdWFsWydyZGZzOmxhYmVsJ10ubWFwKENvbW1vblV0aWwuZm9ybWF0VmFsdWUpLmpvaW4oJyAnKSxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgaHRtbCA9IGBcbiAgPGEgaHJlZj1cIiMvQFwiPjxzcGFuIGNsYXNzPVwiZmEgZmEtbGcgZmEtc2VhcmNoXCI+PC9zcGFuPjwvYT5cbmA7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O01BQU9BLFVBQVUsR0FBQUMsZUFBQSxDQUFBQyxPQUFBO0lBQUEsYUFBQUMsT0FBQTtNQUNWQyxDQUFDLEdBQUFELE9BQUEsQ0FBQUQsT0FBQTtJQUFBO0lBQUFHLE9BQUEsV0FBQUEsQ0FBQTtNQUFBQyxPQUFBLFFBRUtDLEdBQUcsR0FBRyxTQUFOQSxHQUFHQSxDQUFhQyxVQUFVLEVBQUVDLFFBQVEsRUFBRUMsU0FBUyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRTtRQUN6RUgsUUFBUSxHQUFHTCxDQUFDLENBQUNLLFFBQVEsQ0FBQztRQUN0QkMsU0FBUyxHQUFHTixDQUFDLENBQUNNLFNBQVMsQ0FBQztRQUV4QkQsUUFBUSxDQUFDSSxPQUFPLENBQUM7VUFDZkgsU0FBUyxFQUFFRCxRQUFRO1VBQ25CSyxPQUFPLEVBQUUsT0FBTztVQUNoQkMsU0FBUyxFQUFFLFFBQVE7VUFDbkJDLEtBQUssRUFBRVIsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDUyxHQUFHLENBQUNqQixVQUFVLENBQUNrQixXQUFXLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLEdBQUc7UUFDdEUsQ0FBQyxDQUFDO01BQ0osQ0FBQztNQUFBYixPQUFBLFNBRVljLElBQUk7SUFBQTtFQUFBO0FBQUEifQ==