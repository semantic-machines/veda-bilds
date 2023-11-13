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
        $('input', template).keydown(function (e) {
          if (e.which === 13) {
            var value = this.value;
            individual.set('*', [value]);
            container.siblings('.search-button').click();
          }
        });
      });
      _export("html", html = "\n  <div>\n    <veda-control property=\"*\" data-type=\"string\"></veda-control>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInBvc3QiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJrZXlkb3duIiwiZSIsIndoaWNoIiwidmFsdWUiLCJzZXQiLCJzaWJsaW5ncyIsImNsaWNrIiwiaHRtbCJdLCJzb3VyY2VzIjpbIi4uLy4uL29udG9sb2d5L2dlbmVyaWMtZnVuY3Rpb24vdGVtcGxhdGVzL3YtZnNfTWluaW1hbFNlYXJjaEJsYW5rVGVtcGxhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuZXhwb3J0IGNvbnN0IHBvc3QgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gICQoJ2lucHV0JywgdGVtcGxhdGUpLmtleWRvd24oZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoZS53aGljaCA9PT0gMTMpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgIGluZGl2aWR1YWwuc2V0KCcqJywgW3ZhbHVlXSk7XG4gICAgICBjb250YWluZXIuc2libGluZ3MoJy5zZWFyY2gtYnV0dG9uJykuY2xpY2soKTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGh0bWwgPSBgXG4gIDxkaXY+XG4gICAgPHZlZGEtY29udHJvbCBwcm9wZXJ0eT1cIipcIiBkYXRhLXR5cGU9XCJzdHJpbmdcIj48L3ZlZGEtY29udHJvbD5cbiAgPC9kaXY+XG5gO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztNQUFPQSxDQUFDLEdBQUFDLE9BQUEsQ0FBQUMsT0FBQTtJQUFBO0lBQUFDLE9BQUEsV0FBQUEsQ0FBQTtNQUFBQyxPQUFBLFNBRUtDLElBQUksR0FBRyxTQUFQQSxJQUFJQSxDQUFhQyxVQUFVLEVBQUVDLFFBQVEsRUFBRUMsU0FBUyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRTtRQUMxRUgsUUFBUSxHQUFHUCxDQUFDLENBQUNPLFFBQVEsQ0FBQztRQUN0QkMsU0FBUyxHQUFHUixDQUFDLENBQUNRLFNBQVMsQ0FBQztRQUV4QlIsQ0FBQyxDQUFDLE9BQU8sRUFBRU8sUUFBUSxDQUFDLENBQUNJLE9BQU8sQ0FBQyxVQUFVQyxDQUFDLEVBQUU7VUFDeEMsSUFBSUEsQ0FBQyxDQUFDQyxLQUFLLEtBQUssRUFBRSxFQUFFO1lBQ2xCLElBQU1DLEtBQUssR0FBRyxJQUFJLENBQUNBLEtBQUs7WUFDeEJSLFVBQVUsQ0FBQ1MsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDRCxLQUFLLENBQUMsQ0FBQztZQUM1Qk4sU0FBUyxDQUFDUSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQ0MsS0FBSyxFQUFFO1VBQzlDO1FBQ0YsQ0FBQyxDQUFDO01BQ0osQ0FBQztNQUFBYixPQUFBLFNBRVljLElBQUk7SUFBQTtFQUFBO0FBQUEifQ==