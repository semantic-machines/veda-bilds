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
      _export("html", html = "\n  <div><span about=\"@\" property=\"v-s:shortLabel\"></span> | <span id=\"label\" about=\"@\" property=\"rdfs:label\"></span> | <span about=\"@\" property=\"v-s:description\"></span></div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInBvc3QiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJoYXNWYWx1ZSIsInRleHQiLCJpZCIsImh0bWwiXSwic291cmNlcyI6WyIuLi8uLi9vbnRvbG9neS9nZW5lcmljLWFwcGxpY2F0aW9uL3dvcmtQZXJtaXQvdGVtcGxhdGVzL3Ytc19IYXJtZnVsU3Vic3RhbmNlX0VtYmVkZGVkX1RlbXBsYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmV4cG9ydCBjb25zdCBwb3N0ID0gZnVuY3Rpb24gKGluZGl2aWR1YWwsIHRlbXBsYXRlLCBjb250YWluZXIsIG1vZGUsIGV4dHJhKSB7XG4gIHRlbXBsYXRlID0gJCh0ZW1wbGF0ZSk7XG4gIGNvbnRhaW5lciA9ICQoY29udGFpbmVyKTtcblxuICBpZiAoIWluZGl2aWR1YWwuaGFzVmFsdWUoJ3JkZnM6bGFiZWwnKSkge1xuICAgICQoJyNsYWJlbCcsIHRlbXBsYXRlKS50ZXh0KGluZGl2aWR1YWwuaWQpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaHRtbCA9IGBcbiAgPGRpdj48c3BhbiBhYm91dD1cIkBcIiBwcm9wZXJ0eT1cInYtczpzaG9ydExhYmVsXCI+PC9zcGFuPiB8IDxzcGFuIGlkPVwibGFiZWxcIiBhYm91dD1cIkBcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L3NwYW4+IHwgPHNwYW4gYWJvdXQ9XCJAXCIgcHJvcGVydHk9XCJ2LXM6ZGVzY3JpcHRpb25cIj48L3NwYW4+PC9kaXY+XG5gO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztNQUFPQSxDQUFDLEdBQUFDLE9BQUEsQ0FBQUMsT0FBQTtJQUFBO0lBQUFDLE9BQUEsV0FBQUEsQ0FBQTtNQUFBQyxPQUFBLFNBRUtDLElBQUksR0FBRyxTQUFQQSxJQUFJQSxDQUFhQyxVQUFVLEVBQUVDLFFBQVEsRUFBRUMsU0FBUyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRTtRQUMxRUgsUUFBUSxHQUFHUCxDQUFDLENBQUNPLFFBQVEsQ0FBQztRQUN0QkMsU0FBUyxHQUFHUixDQUFDLENBQUNRLFNBQVMsQ0FBQztRQUV4QixJQUFJLENBQUNGLFVBQVUsQ0FBQ0ssUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO1VBQ3RDWCxDQUFDLENBQUMsUUFBUSxFQUFFTyxRQUFRLENBQUMsQ0FBQ0ssSUFBSSxDQUFDTixVQUFVLENBQUNPLEVBQUUsQ0FBQztRQUMzQztNQUNGLENBQUM7TUFBQVQsT0FBQSxTQUVZVSxJQUFJO0lBQUE7RUFBQTtBQUFBIn0=