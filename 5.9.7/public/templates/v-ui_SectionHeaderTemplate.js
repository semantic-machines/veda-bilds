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
        $('a.glyphicon', template).click(function (e) {
          e.preventDefault();
          var self = $(this);
          self.toggleClass('glyphicon-chevron-left glyphicon-chevron-down');
          var parentHeader = self.closest('.section-header');
          parentHeader.siblings('.section-content').toggle();
        });
        var sectionContent = template.closest('.section-header').siblings('.section-content');
        if (sectionContent.data('default-closed') == true) {
          $('span.glyphicon', template).click();
        }
      });
      _export("html", html = "\n  <div class=\"pull-right\">\n    <a href=\"#\" class=\"glyphicon glyphicon-chevron-down\"></a>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInBvc3QiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJjbGljayIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInNlbGYiLCJ0b2dnbGVDbGFzcyIsInBhcmVudEhlYWRlciIsImNsb3Nlc3QiLCJzaWJsaW5ncyIsInRvZ2dsZSIsInNlY3Rpb25Db250ZW50IiwiZGF0YSIsImh0bWwiXSwic291cmNlcyI6WyIuLi8uLi9vbnRvbG9neS9zeXN0ZW0tY29yZS90ZW1wbGF0ZXMvdi11aV9TZWN0aW9uSGVhZGVyVGVtcGxhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuZXhwb3J0IGNvbnN0IHBvc3QgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gICQoJ2EuZ2x5cGhpY29uJywgdGVtcGxhdGUpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHNlbGYgPSAkKHRoaXMpO1xuICAgIHNlbGYudG9nZ2xlQ2xhc3MoJ2dseXBoaWNvbi1jaGV2cm9uLWxlZnQgZ2x5cGhpY29uLWNoZXZyb24tZG93bicpO1xuICAgIGNvbnN0IHBhcmVudEhlYWRlciA9IHNlbGYuY2xvc2VzdCgnLnNlY3Rpb24taGVhZGVyJyk7XG4gICAgcGFyZW50SGVhZGVyLnNpYmxpbmdzKCcuc2VjdGlvbi1jb250ZW50JykudG9nZ2xlKCk7XG4gIH0pO1xuICBjb25zdCBzZWN0aW9uQ29udGVudCA9IHRlbXBsYXRlLmNsb3Nlc3QoJy5zZWN0aW9uLWhlYWRlcicpLnNpYmxpbmdzKCcuc2VjdGlvbi1jb250ZW50Jyk7XG4gIGlmIChzZWN0aW9uQ29udGVudC5kYXRhKCdkZWZhdWx0LWNsb3NlZCcpID09IHRydWUpIHtcbiAgICAkKCdzcGFuLmdseXBoaWNvbicsIHRlbXBsYXRlKS5jbGljaygpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaHRtbCA9IGBcbiAgPGRpdiBjbGFzcz1cInB1bGwtcmlnaHRcIj5cbiAgICA8YSBocmVmPVwiI1wiIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1jaGV2cm9uLWRvd25cIj48L2E+XG4gIDwvZGl2PlxuYDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7TUFBT0EsQ0FBQyxHQUFBQyxPQUFBLENBQUFDLE9BQUE7SUFBQTtJQUFBQyxPQUFBLFdBQUFBLENBQUE7TUFBQUMsT0FBQSxTQUVLQyxJQUFJLEdBQUcsU0FBUEEsSUFBSUEsQ0FBYUMsVUFBVSxFQUFFQyxRQUFRLEVBQUVDLFNBQVMsRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUU7UUFDMUVILFFBQVEsR0FBR1AsQ0FBQyxDQUFDTyxRQUFRLENBQUM7UUFDdEJDLFNBQVMsR0FBR1IsQ0FBQyxDQUFDUSxTQUFTLENBQUM7UUFFeEJSLENBQUMsQ0FBQyxhQUFhLEVBQUVPLFFBQVEsQ0FBQyxDQUFDSSxLQUFLLENBQUMsVUFBVUMsQ0FBQyxFQUFFO1VBQzVDQSxDQUFDLENBQUNDLGNBQWMsRUFBRTtVQUNsQixJQUFNQyxJQUFJLEdBQUdkLENBQUMsQ0FBQyxJQUFJLENBQUM7VUFDcEJjLElBQUksQ0FBQ0MsV0FBVyxDQUFDLCtDQUErQyxDQUFDO1VBQ2pFLElBQU1DLFlBQVksR0FBR0YsSUFBSSxDQUFDRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7VUFDcERELFlBQVksQ0FBQ0UsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUNDLE1BQU0sRUFBRTtRQUNwRCxDQUFDLENBQUM7UUFDRixJQUFNQyxjQUFjLEdBQUdiLFFBQVEsQ0FBQ1UsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUNDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQztRQUN2RixJQUFJRSxjQUFjLENBQUNDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLElBQUksRUFBRTtVQUNqRHJCLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRU8sUUFBUSxDQUFDLENBQUNJLEtBQUssRUFBRTtRQUN2QztNQUNGLENBQUM7TUFBQVAsT0FBQSxTQUVZa0IsSUFBSTtJQUFBO0VBQUE7QUFBQSJ9