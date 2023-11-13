"use strict";

System.register(["/js/browser/util.js", "jquery"], function (_export, _context) {
  "use strict";

  var BrowserUtil, $, pre, html;
  return {
    setters: [function (_jsBrowserUtilJs) {
      BrowserUtil = _jsBrowserUtilJs.default;
    }, function (_jquery) {
      $ = _jquery.default;
    }],
    execute: function () {
      _export("pre", pre = function pre(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        var lbl = $('.lbl', template);
        var labelUri = container.data('label');
        var modalTemplate = container.data('modal-template');
        if (labelUri) {
          lbl.attr({
            about: labelUri,
            property: 'rdfs:label'
          });
        }
        template.click(function () {
          BrowserUtil.showModal(individual, modalTemplate);
        });
      });
      _export("html", html = "\n  <button class=\"btn btn-link btn-sm\">\n    <span class=\"glyphicon glyphicon-zoom-in\"></span>\n    <span class=\"lbl\"></span>\n  </button>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJCcm93c2VyVXRpbCIsIl9qc0Jyb3dzZXJVdGlsSnMiLCJkZWZhdWx0IiwiX2pxdWVyeSIsIiQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInByZSIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsImxibCIsImxhYmVsVXJpIiwiZGF0YSIsIm1vZGFsVGVtcGxhdGUiLCJhdHRyIiwiYWJvdXQiLCJwcm9wZXJ0eSIsImNsaWNrIiwic2hvd01vZGFsIiwiaHRtbCJdLCJzb3VyY2VzIjpbIi4uLy4uL29udG9sb2d5L3N5c3RlbS1jb3JlL3RlbXBsYXRlcy92LXVpX0dlbmVyaWNNb2RhbFRlbXBsYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCcm93c2VyVXRpbCBmcm9tICcvanMvYnJvd3Nlci91dGlsLmpzJztcbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmV4cG9ydCBjb25zdCBwcmUgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gIGNvbnN0IGxibCA9ICQoJy5sYmwnLCB0ZW1wbGF0ZSk7XG4gIGNvbnN0IGxhYmVsVXJpID0gY29udGFpbmVyLmRhdGEoJ2xhYmVsJyk7XG4gIGNvbnN0IG1vZGFsVGVtcGxhdGUgPSBjb250YWluZXIuZGF0YSgnbW9kYWwtdGVtcGxhdGUnKTtcbiAgaWYgKGxhYmVsVXJpKSB7XG4gICAgbGJsLmF0dHIoe2Fib3V0OiBsYWJlbFVyaSwgcHJvcGVydHk6ICdyZGZzOmxhYmVsJ30pO1xuICB9XG4gIHRlbXBsYXRlLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICBCcm93c2VyVXRpbC5zaG93TW9kYWwoaW5kaXZpZHVhbCwgbW9kYWxUZW1wbGF0ZSk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGh0bWwgPSBgXG4gIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWxpbmsgYnRuLXNtXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXpvb20taW5cIj48L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJsYmxcIj48L3NwYW4+XG4gIDwvYnV0dG9uPlxuYDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7TUFBT0EsV0FBVyxHQUFBQyxnQkFBQSxDQUFBQyxPQUFBO0lBQUEsYUFBQUMsT0FBQTtNQUNYQyxDQUFDLEdBQUFELE9BQUEsQ0FBQUQsT0FBQTtJQUFBO0lBQUFHLE9BQUEsV0FBQUEsQ0FBQTtNQUFBQyxPQUFBLFFBRUtDLEdBQUcsR0FBRyxTQUFOQSxHQUFHQSxDQUFhQyxVQUFVLEVBQUVDLFFBQVEsRUFBRUMsU0FBUyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRTtRQUN6RUgsUUFBUSxHQUFHTCxDQUFDLENBQUNLLFFBQVEsQ0FBQztRQUN0QkMsU0FBUyxHQUFHTixDQUFDLENBQUNNLFNBQVMsQ0FBQztRQUV4QixJQUFNRyxHQUFHLEdBQUdULENBQUMsQ0FBQyxNQUFNLEVBQUVLLFFBQVEsQ0FBQztRQUMvQixJQUFNSyxRQUFRLEdBQUdKLFNBQVMsQ0FBQ0ssSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QyxJQUFNQyxhQUFhLEdBQUdOLFNBQVMsQ0FBQ0ssSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQ3RELElBQUlELFFBQVEsRUFBRTtVQUNaRCxHQUFHLENBQUNJLElBQUksQ0FBQztZQUFDQyxLQUFLLEVBQUVKLFFBQVE7WUFBRUssUUFBUSxFQUFFO1VBQVksQ0FBQyxDQUFDO1FBQ3JEO1FBQ0FWLFFBQVEsQ0FBQ1csS0FBSyxDQUFDLFlBQVk7VUFDekJwQixXQUFXLENBQUNxQixTQUFTLENBQUNiLFVBQVUsRUFBRVEsYUFBYSxDQUFDO1FBQ2xELENBQUMsQ0FBQztNQUNKLENBQUM7TUFBQVYsT0FBQSxTQUVZZ0IsSUFBSTtJQUFBO0VBQUE7QUFBQSJ9