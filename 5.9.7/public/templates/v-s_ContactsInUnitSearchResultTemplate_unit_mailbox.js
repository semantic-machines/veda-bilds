"use strict";

System.register(["jquery"], function (_export, _context) {
  "use strict";

  var $, pre, html;
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }],
    execute: function () {
      _export("pre", pre = function pre(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        template.attr('href', 'mailto:' + individual['v-s:mailbox'][0]);
      });
      _export("html", html = "\n  <a class=\"view -edit -search\" about=\"@\" property=\"v-s:mailbox\"></a>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInByZSIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsImF0dHIiLCJodG1sIl0sInNvdXJjZXMiOlsiLi4vLi4vb250b2xvZ3kvZ2VuZXJpYy1mdW5jdGlvbi90ZW1wbGF0ZXMvdi1zX0NvbnRhY3RzSW5Vbml0U2VhcmNoUmVzdWx0VGVtcGxhdGVfdW5pdF9tYWlsYm94LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmV4cG9ydCBjb25zdCBwcmUgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gIHRlbXBsYXRlLmF0dHIoJ2hyZWYnLCAnbWFpbHRvOicgKyBpbmRpdmlkdWFsWyd2LXM6bWFpbGJveCddWzBdKTtcbn07XG5cbmV4cG9ydCBjb25zdCBodG1sID0gYFxuICA8YSBjbGFzcz1cInZpZXcgLWVkaXQgLXNlYXJjaFwiIGFib3V0PVwiQFwiIHByb3BlcnR5PVwidi1zOm1haWxib3hcIj48L2E+XG5gO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztNQUFPQSxDQUFDLEdBQUFDLE9BQUEsQ0FBQUMsT0FBQTtJQUFBO0lBQUFDLE9BQUEsV0FBQUEsQ0FBQTtNQUFBQyxPQUFBLFFBRUtDLEdBQUcsR0FBRyxTQUFOQSxHQUFHQSxDQUFhQyxVQUFVLEVBQUVDLFFBQVEsRUFBRUMsU0FBUyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRTtRQUN6RUgsUUFBUSxHQUFHUCxDQUFDLENBQUNPLFFBQVEsQ0FBQztRQUN0QkMsU0FBUyxHQUFHUixDQUFDLENBQUNRLFNBQVMsQ0FBQztRQUV4QkQsUUFBUSxDQUFDSSxJQUFJLENBQUMsTUFBTSxFQUFFLFNBQVMsR0FBR0wsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQ2pFLENBQUM7TUFBQUYsT0FBQSxTQUVZUSxJQUFJO0lBQUE7RUFBQTtBQUFBIn0=