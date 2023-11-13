"use strict";

System.register(["jquery"], function (_export, _context) {
  "use strict";

  var $, post, html;
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }],
    execute: function () {
      _export("post", post = function post(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        $('.CodeMirror', template).each(function (idx) {
          $(this).height(40);
        });
      });
      _export("html", html = "\n  <div>\n    <div class=\"row\">\n      <div class=\"col-md-3\">\n        <div about=\"@\" rel=\"v-wf:mapToVariable\" data-template=\"v-wf:VariableTemplateEmbedded\" data-embedded=\"true\"></div>\n        <veda-control data-type=\"link\" rel=\"v-wf:mapToVariable\" class=\"view edit search -create\"></veda-control>\n      </div>\n      <div class=\"col-md-9\">\n        <veda-control data-type=\"source\" mode=\"javascript\" property=\"v-wf:mappingExpression\" style=\"width:95%\"></veda-control>\n      </div>\n    </div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInBvc3QiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJlYWNoIiwiaWR4IiwiaGVpZ2h0IiwiaHRtbCJdLCJzb3VyY2VzIjpbIi4uLy4uL29udG9sb2d5L2dlbmVyaWMtZnVuY3Rpb24vdGVtcGxhdGVzL3Ytd2ZfTWFwcGluZ1RlbXBsYXRlRW1iZWRkZWQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuZXhwb3J0IGNvbnN0IHBvc3QgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gICQoJy5Db2RlTWlycm9yJywgdGVtcGxhdGUpLmVhY2goZnVuY3Rpb24gKGlkeCkge1xuICAgICQodGhpcykuaGVpZ2h0KDQwKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgaHRtbCA9IGBcbiAgPGRpdj5cbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTNcIj5cbiAgICAgICAgPGRpdiBhYm91dD1cIkBcIiByZWw9XCJ2LXdmOm1hcFRvVmFyaWFibGVcIiBkYXRhLXRlbXBsYXRlPVwidi13ZjpWYXJpYWJsZVRlbXBsYXRlRW1iZWRkZWRcIiBkYXRhLWVtYmVkZGVkPVwidHJ1ZVwiPjwvZGl2PlxuICAgICAgICA8dmVkYS1jb250cm9sIGRhdGEtdHlwZT1cImxpbmtcIiByZWw9XCJ2LXdmOm1hcFRvVmFyaWFibGVcIiBjbGFzcz1cInZpZXcgZWRpdCBzZWFyY2ggLWNyZWF0ZVwiPjwvdmVkYS1jb250cm9sPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTlcIj5cbiAgICAgICAgPHZlZGEtY29udHJvbCBkYXRhLXR5cGU9XCJzb3VyY2VcIiBtb2RlPVwiamF2YXNjcmlwdFwiIHByb3BlcnR5PVwidi13ZjptYXBwaW5nRXhwcmVzc2lvblwiIHN0eWxlPVwid2lkdGg6OTUlXCI+PC92ZWRhLWNvbnRyb2w+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5gO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztNQUFPQSxDQUFDLEdBQUFDLE9BQUEsQ0FBQUMsT0FBQTtJQUFBO0lBQUFDLE9BQUEsV0FBQUEsQ0FBQTtNQUFBQyxPQUFBLFNBRUtDLElBQUksR0FBRyxTQUFQQSxJQUFJQSxDQUFhQyxVQUFVLEVBQUVDLFFBQVEsRUFBRUMsU0FBUyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRTtRQUMxRUgsUUFBUSxHQUFHUCxDQUFDLENBQUNPLFFBQVEsQ0FBQztRQUN0QkMsU0FBUyxHQUFHUixDQUFDLENBQUNRLFNBQVMsQ0FBQztRQUV4QlIsQ0FBQyxDQUFDLGFBQWEsRUFBRU8sUUFBUSxDQUFDLENBQUNJLElBQUksQ0FBQyxVQUFVQyxHQUFHLEVBQUU7VUFDN0NaLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQ2EsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUNwQixDQUFDLENBQUM7TUFDSixDQUFDO01BQUFULE9BQUEsU0FFWVUsSUFBSTtJQUFBO0VBQUE7QUFBQSJ9