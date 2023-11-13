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
        var pre = $('pre', template);
        var txt = pre.text();
        var re = new RegExp('"([w-]+:[w-]+)"', 'g');
        var txt2 = txt.replace(re, "<a href='#/$1'>'$1'</a>");
        pre.html(txt2);
      });
      _export("html", html = "\n  <div class=\"journal-record\">\n    <style>\n      pre {\n        font-size: 10px;\n      }\n    </style>\n    <hr class=\"margin-sm\" />\n    <div class=\"row\">\n      <div class=\"col-md-2 col-sm-3 event-type\">\n        <span property=\"rdfs:label\"></span>\n      </div>\n      <div class=\"col-md-8 col-sm-6 event-desc\">\n        <pre property=\"rdfs:comment\"></pre>\n      </div>\n      <div class=\"col-md-2 col-sm-3 event-date text-right\">\n        <span about=\"@\" property=\"v-s:created\"></span>\n      </div>\n    </div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInBvc3QiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJwcmUiLCJ0eHQiLCJ0ZXh0IiwicmUiLCJSZWdFeHAiLCJ0eHQyIiwicmVwbGFjZSIsImh0bWwiXSwic291cmNlcyI6WyIuLi8uLi9vbnRvbG9neS9nZW5lcmljLWZ1bmN0aW9uL3RlbXBsYXRlcy92LXdmX1RyYWNlUmVjb3JkVGVtcGxhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuZXhwb3J0IGNvbnN0IHBvc3QgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gIGNvbnN0IHByZSA9ICQoJ3ByZScsIHRlbXBsYXRlKTtcbiAgY29uc3QgdHh0ID0gcHJlLnRleHQoKTtcbiAgY29uc3QgcmUgPSBuZXcgUmVnRXhwKCdcIihbdy1dKzpbdy1dKylcIicsICdnJyk7XG4gIGNvbnN0IHR4dDIgPSB0eHQucmVwbGFjZShyZSwgXCI8YSBocmVmPScjLyQxJz4nJDEnPC9hPlwiKTtcbiAgcHJlLmh0bWwodHh0Mik7XG59O1xuXG5leHBvcnQgY29uc3QgaHRtbCA9IGBcbiAgPGRpdiBjbGFzcz1cImpvdXJuYWwtcmVjb3JkXCI+XG4gICAgPHN0eWxlPlxuICAgICAgcHJlIHtcbiAgICAgICAgZm9udC1zaXplOiAxMHB4O1xuICAgICAgfVxuICAgIDwvc3R5bGU+XG4gICAgPGhyIGNsYXNzPVwibWFyZ2luLXNtXCIgLz5cbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTIgY29sLXNtLTMgZXZlbnQtdHlwZVwiPlxuICAgICAgICA8c3BhbiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtOCBjb2wtc20tNiBldmVudC1kZXNjXCI+XG4gICAgICAgIDxwcmUgcHJvcGVydHk9XCJyZGZzOmNvbW1lbnRcIj48L3ByZT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0yIGNvbC1zbS0zIGV2ZW50LWRhdGUgdGV4dC1yaWdodFwiPlxuICAgICAgICA8c3BhbiBhYm91dD1cIkBcIiBwcm9wZXJ0eT1cInYtczpjcmVhdGVkXCI+PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuYDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7TUFBT0EsQ0FBQyxHQUFBQyxPQUFBLENBQUFDLE9BQUE7SUFBQTtJQUFBQyxPQUFBLFdBQUFBLENBQUE7TUFBQUMsT0FBQSxTQUVLQyxJQUFJLEdBQUcsU0FBUEEsSUFBSUEsQ0FBYUMsVUFBVSxFQUFFQyxRQUFRLEVBQUVDLFNBQVMsRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUU7UUFDMUVILFFBQVEsR0FBR1AsQ0FBQyxDQUFDTyxRQUFRLENBQUM7UUFDdEJDLFNBQVMsR0FBR1IsQ0FBQyxDQUFDUSxTQUFTLENBQUM7UUFFeEIsSUFBTUcsR0FBRyxHQUFHWCxDQUFDLENBQUMsS0FBSyxFQUFFTyxRQUFRLENBQUM7UUFDOUIsSUFBTUssR0FBRyxHQUFHRCxHQUFHLENBQUNFLElBQUksRUFBRTtRQUN0QixJQUFNQyxFQUFFLEdBQUcsSUFBSUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsQ0FBQztRQUM3QyxJQUFNQyxJQUFJLEdBQUdKLEdBQUcsQ0FBQ0ssT0FBTyxDQUFDSCxFQUFFLEVBQUUseUJBQXlCLENBQUM7UUFDdkRILEdBQUcsQ0FBQ08sSUFBSSxDQUFDRixJQUFJLENBQUM7TUFDaEIsQ0FBQztNQUFBWixPQUFBLFNBRVljLElBQUk7SUFBQTtFQUFBO0FBQUEifQ==