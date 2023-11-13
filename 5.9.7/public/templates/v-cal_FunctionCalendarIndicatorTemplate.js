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
      // import veda from '/js/common/veda.js';
      _export("pre", pre = function pre(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);

        /* var counter_uri = "d:taskCounter_" + veda.user.id.split(":").join("_");
        $(".label", template).attr("about", counter_uri);*/
        template.tooltip({
          container: template,
          placement: 'bottom',
          trigger: 'hover',
          title: individual['rdfs:label'].map(CommonUtil.formatValue).join(' ')
        });
      });
      _export("html", html = "\n  <a href=\"#/@\" data-toggle=\"tooltip\" data-trigger=\"hover\" data-placement=\"bottom\">\n    <span class=\"fa fa-calendar fa-lg\"></span>\n    <!--span id=\"counter\" class=\"label label-danger\" property=\"v-ft:inboxWeekCount\"></span-->\n  </a>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJDb21tb25VdGlsIiwiX2pzQ29tbW9uVXRpbEpzIiwiZGVmYXVsdCIsIl9qcXVlcnkiLCIkIiwiZXhlY3V0ZSIsIl9leHBvcnQiLCJwcmUiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJ0b29sdGlwIiwicGxhY2VtZW50IiwidHJpZ2dlciIsInRpdGxlIiwibWFwIiwiZm9ybWF0VmFsdWUiLCJqb2luIiwiaHRtbCJdLCJzb3VyY2VzIjpbIi4uLy4uL29udG9sb2d5L2dlbmVyaWMtZnVuY3Rpb24vdGVtcGxhdGVzL3YtY2FsX0Z1bmN0aW9uQ2FsZW5kYXJJbmRpY2F0b3JUZW1wbGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tbW9uVXRpbCBmcm9tICcvanMvY29tbW9uL3V0aWwuanMnO1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5Jztcbi8vIGltcG9ydCB2ZWRhIGZyb20gJy9qcy9jb21tb24vdmVkYS5qcyc7XG5cbmV4cG9ydCBjb25zdCBwcmUgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gIC8qIHZhciBjb3VudGVyX3VyaSA9IFwiZDp0YXNrQ291bnRlcl9cIiArIHZlZGEudXNlci5pZC5zcGxpdChcIjpcIikuam9pbihcIl9cIik7XG4gICQoXCIubGFiZWxcIiwgdGVtcGxhdGUpLmF0dHIoXCJhYm91dFwiLCBjb3VudGVyX3VyaSk7Ki9cbiAgdGVtcGxhdGUudG9vbHRpcCh7XG4gICAgY29udGFpbmVyOiB0ZW1wbGF0ZSxcbiAgICBwbGFjZW1lbnQ6ICdib3R0b20nLFxuICAgIHRyaWdnZXI6ICdob3ZlcicsXG4gICAgdGl0bGU6IGluZGl2aWR1YWxbJ3JkZnM6bGFiZWwnXS5tYXAoQ29tbW9uVXRpbC5mb3JtYXRWYWx1ZSkuam9pbignICcpLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBodG1sID0gYFxuICA8YSBocmVmPVwiIy9AXCIgZGF0YS10b2dnbGU9XCJ0b29sdGlwXCIgZGF0YS10cmlnZ2VyPVwiaG92ZXJcIiBkYXRhLXBsYWNlbWVudD1cImJvdHRvbVwiPlxuICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtY2FsZW5kYXIgZmEtbGdcIj48L3NwYW4+XG4gICAgPCEtLXNwYW4gaWQ9XCJjb3VudGVyXCIgY2xhc3M9XCJsYWJlbCBsYWJlbC1kYW5nZXJcIiBwcm9wZXJ0eT1cInYtZnQ6aW5ib3hXZWVrQ291bnRcIj48L3NwYW4tLT5cbiAgPC9hPlxuYDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7TUFBT0EsVUFBVSxHQUFBQyxlQUFBLENBQUFDLE9BQUE7SUFBQSxhQUFBQyxPQUFBO01BQ1ZDLENBQUMsR0FBQUQsT0FBQSxDQUFBRCxPQUFBO0lBQUE7SUFBQUcsT0FBQSxXQUFBQSxDQUFBO01BQ1I7TUFBQUMsT0FBQSxRQUVhQyxHQUFHLEdBQUcsU0FBTkEsR0FBR0EsQ0FBYUMsVUFBVSxFQUFFQyxRQUFRLEVBQUVDLFNBQVMsRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUU7UUFDekVILFFBQVEsR0FBR0wsQ0FBQyxDQUFDSyxRQUFRLENBQUM7UUFDdEJDLFNBQVMsR0FBR04sQ0FBQyxDQUFDTSxTQUFTLENBQUM7O1FBRXhCO0FBQ0Y7UUFDRUQsUUFBUSxDQUFDSSxPQUFPLENBQUM7VUFDZkgsU0FBUyxFQUFFRCxRQUFRO1VBQ25CSyxTQUFTLEVBQUUsUUFBUTtVQUNuQkMsT0FBTyxFQUFFLE9BQU87VUFDaEJDLEtBQUssRUFBRVIsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDUyxHQUFHLENBQUNqQixVQUFVLENBQUNrQixXQUFXLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLEdBQUc7UUFDdEUsQ0FBQyxDQUFDO01BQ0osQ0FBQztNQUFBYixPQUFBLFNBRVljLElBQUk7SUFBQTtFQUFBO0FBQUEifQ==