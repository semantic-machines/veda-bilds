"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var pre, html;
  return {
    setters: [],
    execute: function () {
      _export("pre", pre = function pre(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        if (individual.hasValue('v-s:valid', false)) {
          $('a', template).remove();
        }
      });
      _export("html", html = "\n  <div>\n    <a href=\"/files/@\">\n      <span about=\"@\" property=\"v-s:fileName\"></span>\n    </a>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJwcmUiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCIkIiwiaGFzVmFsdWUiLCJyZW1vdmUiLCJfZXhwb3J0IiwiaHRtbCJdLCJzb3VyY2VzIjpbIi4uLy4uL29udG9sb2d5L3N5c3RlbS1jb3JlL3RlbXBsYXRlcy92LXVpX0ZpbGVUb1RyZWVUZW1wbGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgcHJlID0gZnVuY3Rpb24gKGluZGl2aWR1YWwsIHRlbXBsYXRlLCBjb250YWluZXIsIG1vZGUsIGV4dHJhKSB7XG4gIHRlbXBsYXRlID0gJCh0ZW1wbGF0ZSk7XG4gIGNvbnRhaW5lciA9ICQoY29udGFpbmVyKTtcbiAgaWYgKGluZGl2aWR1YWwuaGFzVmFsdWUoJ3Ytczp2YWxpZCcsIGZhbHNlKSkge1xuICAgICQoJ2EnLCB0ZW1wbGF0ZSkucmVtb3ZlKCk7XG4gIH1cbn1cbmV4cG9ydCBjb25zdCBodG1sID0gYFxuICA8ZGl2PlxuICAgIDxhIGhyZWY9XCIvZmlsZXMvQFwiPlxuICAgICAgPHNwYW4gYWJvdXQ9XCJAXCIgcHJvcGVydHk9XCJ2LXM6ZmlsZU5hbWVcIj48L3NwYW4+XG4gICAgPC9hPlxuICA8L2Rpdj5cbmA7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztxQkFBYUEsR0FBRyxHQUFHLFNBQU5BLEdBQUdBLENBQWFDLFVBQVUsRUFBRUMsUUFBUSxFQUFFQyxTQUFTLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFO1FBQ3pFSCxRQUFRLEdBQUdJLENBQUMsQ0FBQ0osUUFBUSxDQUFDO1FBQ3RCQyxTQUFTLEdBQUdHLENBQUMsQ0FBQ0gsU0FBUyxDQUFDO1FBQ3hCLElBQUlGLFVBQVUsQ0FBQ00sUUFBUSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsRUFBRTtVQUMzQ0QsQ0FBQyxDQUFDLEdBQUcsRUFBRUosUUFBUSxDQUFDLENBQUNNLE1BQU0sRUFBRTtRQUMzQjtNQUNGLENBQUM7TUFBQUMsT0FBQSxTQUNZQyxJQUFJO0lBQUE7RUFBQTtBQUFBIn0=