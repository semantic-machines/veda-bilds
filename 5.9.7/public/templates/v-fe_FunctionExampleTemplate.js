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
        $('#press-me', template).click(function () {
          individual.press();
        });
      });
      _export("html", html = "\n  <div class=\"container sheet\">\n    <h2>Example function instance</h2>\n    <span about=\"v-fe:exampleProperty\" property=\"rdfs:label\"></span>\n    <div property=\"v-fe:exampleProperty\"></div>\n    <button id=\"press-me\" class=\"btn btn-success\">Press me</button>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInBvc3QiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJjbGljayIsInByZXNzIiwiaHRtbCJdLCJzb3VyY2VzIjpbIi4uLy4uL29udG9sb2d5L2dlbmVyaWMtZnVuY3Rpb24vdGVtcGxhdGVzL3YtZmVfRnVuY3Rpb25FeGFtcGxlVGVtcGxhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuZXhwb3J0IGNvbnN0IHBvc3QgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gICQoJyNwcmVzcy1tZScsIHRlbXBsYXRlKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgaW5kaXZpZHVhbC5wcmVzcygpO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBodG1sID0gYFxuICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyIHNoZWV0XCI+XG4gICAgPGgyPkV4YW1wbGUgZnVuY3Rpb24gaW5zdGFuY2U8L2gyPlxuICAgIDxzcGFuIGFib3V0PVwidi1mZTpleGFtcGxlUHJvcGVydHlcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L3NwYW4+XG4gICAgPGRpdiBwcm9wZXJ0eT1cInYtZmU6ZXhhbXBsZVByb3BlcnR5XCI+PC9kaXY+XG4gICAgPGJ1dHRvbiBpZD1cInByZXNzLW1lXCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3NcIj5QcmVzcyBtZTwvYnV0dG9uPlxuICA8L2Rpdj5cbmA7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O01BQU9BLENBQUMsR0FBQUMsT0FBQSxDQUFBQyxPQUFBO0lBQUE7SUFBQUMsT0FBQSxXQUFBQSxDQUFBO01BQUFDLE9BQUEsU0FFS0MsSUFBSSxHQUFHLFNBQVBBLElBQUlBLENBQWFDLFVBQVUsRUFBRUMsUUFBUSxFQUFFQyxTQUFTLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFO1FBQzFFSCxRQUFRLEdBQUdQLENBQUMsQ0FBQ08sUUFBUSxDQUFDO1FBQ3RCQyxTQUFTLEdBQUdSLENBQUMsQ0FBQ1EsU0FBUyxDQUFDO1FBRXhCUixDQUFDLENBQUMsV0FBVyxFQUFFTyxRQUFRLENBQUMsQ0FBQ0ksS0FBSyxDQUFDLFlBQVk7VUFDekNMLFVBQVUsQ0FBQ00sS0FBSyxFQUFFO1FBQ3BCLENBQUMsQ0FBQztNQUNKLENBQUM7TUFBQVIsT0FBQSxTQUVZUyxJQUFJO0lBQUE7RUFBQTtBQUFBIn0=