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
        if (!individual.hasValue('rdfs:label')) {
          $('#label', template).text(individual.id);
        }
      });
      _export("html", html = "\n  <a class=\"label-template\" href=\"#/@///edit\"\n    ><span about=\"@\" rel=\"rdf:type\"><span about=\"@\" property=\"rdfs:label\"></span></span>: <span id=\"label\" about=\"@\" property=\"rdfs:label\"></span\n  ></a>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInBvc3QiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJoYXNWYWx1ZSIsInRleHQiLCJpZCIsImh0bWwiXSwic291cmNlcyI6WyIuLi8uLi9vbnRvbG9neS9zeXN0ZW0tY29yZS90ZW1wbGF0ZXMvdi11aV9DbGFzc05hbWVMYWJlbExpbmtFZGl0VGVtcGxhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuZXhwb3J0IGNvbnN0IHBvc3QgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gIGlmICghaW5kaXZpZHVhbC5oYXNWYWx1ZSgncmRmczpsYWJlbCcpKSB7XG4gICAgJCgnI2xhYmVsJywgdGVtcGxhdGUpLnRleHQoaW5kaXZpZHVhbC5pZCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBodG1sID0gYFxuICA8YSBjbGFzcz1cImxhYmVsLXRlbXBsYXRlXCIgaHJlZj1cIiMvQC8vL2VkaXRcIlxuICAgID48c3BhbiBhYm91dD1cIkBcIiByZWw9XCJyZGY6dHlwZVwiPjxzcGFuIGFib3V0PVwiQFwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvc3Bhbj48L3NwYW4+OiA8c3BhbiBpZD1cImxhYmVsXCIgYWJvdXQ9XCJAXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9zcGFuXG4gID48L2E+XG5gO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztNQUFPQSxDQUFDLEdBQUFDLE9BQUEsQ0FBQUMsT0FBQTtJQUFBO0lBQUFDLE9BQUEsV0FBQUEsQ0FBQTtNQUFBQyxPQUFBLFNBRUtDLElBQUksR0FBRyxTQUFQQSxJQUFJQSxDQUFhQyxVQUFVLEVBQUVDLFFBQVEsRUFBRUMsU0FBUyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRTtRQUMxRUgsUUFBUSxHQUFHUCxDQUFDLENBQUNPLFFBQVEsQ0FBQztRQUN0QkMsU0FBUyxHQUFHUixDQUFDLENBQUNRLFNBQVMsQ0FBQztRQUV4QixJQUFJLENBQUNGLFVBQVUsQ0FBQ0ssUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO1VBQ3RDWCxDQUFDLENBQUMsUUFBUSxFQUFFTyxRQUFRLENBQUMsQ0FBQ0ssSUFBSSxDQUFDTixVQUFVLENBQUNPLEVBQUUsQ0FBQztRQUMzQztNQUNGLENBQUM7TUFBQVQsT0FBQSxTQUVZVSxJQUFJO0lBQUE7RUFBQTtBQUFBIn0=