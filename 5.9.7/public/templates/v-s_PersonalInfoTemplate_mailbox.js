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
        var address = 'mailto:' + individual['v-s:mailbox'][0];
        $('a', template).attr('href', address);
      });
      _export("html", html = "\n  <span>\n    <a class=\"view -edit -search\" about=\"@\" property=\"v-s:mailbox\"></a>\n    <veda-control property=\"v-s:mailbox\" data-type=\"string\" class=\"-view edit search\"></veda-control>\n  </span>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInBvc3QiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJhZGRyZXNzIiwiYXR0ciIsImh0bWwiXSwic291cmNlcyI6WyIuLi8uLi9vbnRvbG9neS9nZW5lcmljLWFwcGxpY2F0aW9uL3RlbXBsYXRlcy92LXNfUGVyc29uYWxJbmZvVGVtcGxhdGVfbWFpbGJveC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG5leHBvcnQgY29uc3QgcG9zdCA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG4gIGNvbnN0IGFkZHJlc3MgPSAnbWFpbHRvOicgKyBpbmRpdmlkdWFsWyd2LXM6bWFpbGJveCddWzBdO1xuICAkKCdhJywgdGVtcGxhdGUpLmF0dHIoJ2hyZWYnLCBhZGRyZXNzKTtcbn07XG5cbmV4cG9ydCBjb25zdCBodG1sID0gYFxuICA8c3Bhbj5cbiAgICA8YSBjbGFzcz1cInZpZXcgLWVkaXQgLXNlYXJjaFwiIGFib3V0PVwiQFwiIHByb3BlcnR5PVwidi1zOm1haWxib3hcIj48L2E+XG4gICAgPHZlZGEtY29udHJvbCBwcm9wZXJ0eT1cInYtczptYWlsYm94XCIgZGF0YS10eXBlPVwic3RyaW5nXCIgY2xhc3M9XCItdmlldyBlZGl0IHNlYXJjaFwiPjwvdmVkYS1jb250cm9sPlxuICA8L3NwYW4+XG5gO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztNQUFPQSxDQUFDLEdBQUFDLE9BQUEsQ0FBQUMsT0FBQTtJQUFBO0lBQUFDLE9BQUEsV0FBQUEsQ0FBQTtNQUFBQyxPQUFBLFNBRUtDLElBQUksR0FBRyxTQUFQQSxJQUFJQSxDQUFhQyxVQUFVLEVBQUVDLFFBQVEsRUFBRUMsU0FBUyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRTtRQUMxRUgsUUFBUSxHQUFHUCxDQUFDLENBQUNPLFFBQVEsQ0FBQztRQUN0QkMsU0FBUyxHQUFHUixDQUFDLENBQUNRLFNBQVMsQ0FBQztRQUN4QixJQUFNRyxPQUFPLEdBQUcsU0FBUyxHQUFHTCxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hETixDQUFDLENBQUMsR0FBRyxFQUFFTyxRQUFRLENBQUMsQ0FBQ0ssSUFBSSxDQUFDLE1BQU0sRUFBRUQsT0FBTyxDQUFDO01BQ3hDLENBQUM7TUFBQVAsT0FBQSxTQUVZUyxJQUFJO0lBQUE7RUFBQTtBQUFBIn0=