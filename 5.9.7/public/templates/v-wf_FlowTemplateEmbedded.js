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
      _export("html", html = "\n<div class=\"panel panel-default\">\n  <div class=\"panel-heading\">\n    <div class=\"row\">\n      <div class=\"col-md-3\">\n        <span about=\"v-wf:flowsInto\" property=\"rdfs:label\"> :\n      </div>\n      <div class=\"col-md-9\">\n        <strong><span about=\"@\" rel=\"v-wf:flowsInto\" data-template=\"v-ui:LabelTemplate\"></span></strong>\n      </div>\n    </div>\n  </div>\n  <div class=\"panel-body\">\n    <div class=\"row\">\n      <div class=\"col-md-4\">\n        <span about=\"rdfs:label\" property=\"rdfs:label\"></span> :\n        <veda-control data-type=\"string\" property=\"rdfs:label\"></veda-control>\n      </div>\n      <div class=\"col-md-8\">\n        <span about=\"v-wf:predicate\" property=\"rdfs:label\"></span> :\n        <veda-control data-type=\"source\" mode=\"javascript\" property=\"v-wf:predicate\"></veda-control>\n      </div>\n    </div>\n  </div>\n</div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInBvc3QiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJlYWNoIiwiaWR4IiwiaGVpZ2h0IiwiaHRtbCJdLCJzb3VyY2VzIjpbIi4uLy4uL29udG9sb2d5L2dlbmVyaWMtZnVuY3Rpb24vdGVtcGxhdGVzL3Ytd2ZfRmxvd1RlbXBsYXRlRW1iZWRkZWQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuZXhwb3J0IGNvbnN0IHBvc3QgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gICQoJy5Db2RlTWlycm9yJywgdGVtcGxhdGUpLmVhY2goZnVuY3Rpb24gKGlkeCkge1xuICAgICQodGhpcykuaGVpZ2h0KDQwKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgaHRtbCA9IGBcbjxkaXYgY2xhc3M9XCJwYW5lbCBwYW5lbC1kZWZhdWx0XCI+XG4gIDxkaXYgY2xhc3M9XCJwYW5lbC1oZWFkaW5nXCI+XG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0zXCI+XG4gICAgICAgIDxzcGFuIGFib3V0PVwidi13ZjpmbG93c0ludG9cIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj4gOlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTlcIj5cbiAgICAgICAgPHN0cm9uZz48c3BhbiBhYm91dD1cIkBcIiByZWw9XCJ2LXdmOmZsb3dzSW50b1wiIGRhdGEtdGVtcGxhdGU9XCJ2LXVpOkxhYmVsVGVtcGxhdGVcIj48L3NwYW4+PC9zdHJvbmc+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCI+XG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC00XCI+XG4gICAgICAgIDxzcGFuIGFib3V0PVwicmRmczpsYWJlbFwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvc3Bhbj4gOlxuICAgICAgICA8dmVkYS1jb250cm9sIGRhdGEtdHlwZT1cInN0cmluZ1wiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvdmVkYS1jb250cm9sPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLThcIj5cbiAgICAgICAgPHNwYW4gYWJvdXQ9XCJ2LXdmOnByZWRpY2F0ZVwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvc3Bhbj4gOlxuICAgICAgICA8dmVkYS1jb250cm9sIGRhdGEtdHlwZT1cInNvdXJjZVwiIG1vZGU9XCJqYXZhc2NyaXB0XCIgcHJvcGVydHk9XCJ2LXdmOnByZWRpY2F0ZVwiPjwvdmVkYS1jb250cm9sPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5gO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztNQUFPQSxDQUFDLEdBQUFDLE9BQUEsQ0FBQUMsT0FBQTtJQUFBO0lBQUFDLE9BQUEsV0FBQUEsQ0FBQTtNQUFBQyxPQUFBLFNBRUtDLElBQUksR0FBRyxTQUFQQSxJQUFJQSxDQUFhQyxVQUFVLEVBQUVDLFFBQVEsRUFBRUMsU0FBUyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRTtRQUMxRUgsUUFBUSxHQUFHUCxDQUFDLENBQUNPLFFBQVEsQ0FBQztRQUN0QkMsU0FBUyxHQUFHUixDQUFDLENBQUNRLFNBQVMsQ0FBQztRQUV4QlIsQ0FBQyxDQUFDLGFBQWEsRUFBRU8sUUFBUSxDQUFDLENBQUNJLElBQUksQ0FBQyxVQUFVQyxHQUFHLEVBQUU7VUFDN0NaLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQ2EsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUNwQixDQUFDLENBQUM7TUFDSixDQUFDO01BQUFULE9BQUEsU0FFWVUsSUFBSTtJQUFBO0VBQUE7QUFBQSJ9