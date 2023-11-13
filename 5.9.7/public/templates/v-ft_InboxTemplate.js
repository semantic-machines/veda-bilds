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
        template.one('remove', function () {
          if (individual['v-fs:cursor'][0] >= individual['v-fs:top'][0]) {
            individual['v-fs:top'] = individual['v-fs:cursor'];
          }
          individual.clearValue('v-fs:searchResult');
        });
      });
      _export("html", html = "\n  <div class=\"container sheet\" about=\"@\" data-template=\"v-fs:AttributiveSearchTemplate\"></div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInByZSIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsIm9uZSIsImNsZWFyVmFsdWUiLCJodG1sIl0sInNvdXJjZXMiOlsiLi4vLi4vb250b2xvZ3kvZ2VuZXJpYy1mdW5jdGlvbi90ZW1wbGF0ZXMvdi1mdF9JbmJveFRlbXBsYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmV4cG9ydCBjb25zdCBwcmUgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gIHRlbXBsYXRlLm9uZSgncmVtb3ZlJywgZnVuY3Rpb24gKCkge1xuICAgIGlmIChpbmRpdmlkdWFsWyd2LWZzOmN1cnNvciddWzBdID49IGluZGl2aWR1YWxbJ3YtZnM6dG9wJ11bMF0pIHtcbiAgICAgIGluZGl2aWR1YWxbJ3YtZnM6dG9wJ10gPSBpbmRpdmlkdWFsWyd2LWZzOmN1cnNvciddO1xuICAgIH1cbiAgICBpbmRpdmlkdWFsLmNsZWFyVmFsdWUoJ3YtZnM6c2VhcmNoUmVzdWx0Jyk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGh0bWwgPSBgXG4gIDxkaXYgY2xhc3M9XCJjb250YWluZXIgc2hlZXRcIiBhYm91dD1cIkBcIiBkYXRhLXRlbXBsYXRlPVwidi1mczpBdHRyaWJ1dGl2ZVNlYXJjaFRlbXBsYXRlXCI+PC9kaXY+XG5gO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztNQUFPQSxDQUFDLEdBQUFDLE9BQUEsQ0FBQUMsT0FBQTtJQUFBO0lBQUFDLE9BQUEsV0FBQUEsQ0FBQTtNQUFBQyxPQUFBLFFBRUtDLEdBQUcsR0FBRyxTQUFOQSxHQUFHQSxDQUFhQyxVQUFVLEVBQUVDLFFBQVEsRUFBRUMsU0FBUyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRTtRQUN6RUgsUUFBUSxHQUFHUCxDQUFDLENBQUNPLFFBQVEsQ0FBQztRQUN0QkMsU0FBUyxHQUFHUixDQUFDLENBQUNRLFNBQVMsQ0FBQztRQUV4QkQsUUFBUSxDQUFDSSxHQUFHLENBQUMsUUFBUSxFQUFFLFlBQVk7VUFDakMsSUFBSUwsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJQSxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDN0RBLFVBQVUsQ0FBQyxVQUFVLENBQUMsR0FBR0EsVUFBVSxDQUFDLGFBQWEsQ0FBQztVQUNwRDtVQUNBQSxVQUFVLENBQUNNLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQztRQUM1QyxDQUFDLENBQUM7TUFDSixDQUFDO01BQUFSLE9BQUEsU0FFWVMsSUFBSTtJQUFBO0VBQUE7QUFBQSJ9