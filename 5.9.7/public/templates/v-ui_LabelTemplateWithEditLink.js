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
      _export("html", html = "\n  <span class=\"label-template\">\n    # <a href=\"#/@///edit\"><span id=\"label\" property=\"rdfs:label\"></span></a>\n  </span>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInBvc3QiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJoYXNWYWx1ZSIsInRleHQiLCJpZCIsImh0bWwiXSwic291cmNlcyI6WyIuLi8uLi9vbnRvbG9neS9zeXN0ZW0tY29yZS90ZW1wbGF0ZXMvdi11aV9MYWJlbFRlbXBsYXRlV2l0aEVkaXRMaW5rLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmV4cG9ydCBjb25zdCBwb3N0ID0gZnVuY3Rpb24gKGluZGl2aWR1YWwsIHRlbXBsYXRlLCBjb250YWluZXIsIG1vZGUsIGV4dHJhKSB7XG4gIHRlbXBsYXRlID0gJCh0ZW1wbGF0ZSk7XG4gIGNvbnRhaW5lciA9ICQoY29udGFpbmVyKTtcblxuICBpZiAoIWluZGl2aWR1YWwuaGFzVmFsdWUoJ3JkZnM6bGFiZWwnKSkge1xuICAgICQoJyNsYWJlbCcsIHRlbXBsYXRlKS50ZXh0KGluZGl2aWR1YWwuaWQpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaHRtbCA9IGBcbiAgPHNwYW4gY2xhc3M9XCJsYWJlbC10ZW1wbGF0ZVwiPlxuICAgICMgPGEgaHJlZj1cIiMvQC8vL2VkaXRcIj48c3BhbiBpZD1cImxhYmVsXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9zcGFuPjwvYT5cbiAgPC9zcGFuPlxuYDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7TUFBT0EsQ0FBQyxHQUFBQyxPQUFBLENBQUFDLE9BQUE7SUFBQTtJQUFBQyxPQUFBLFdBQUFBLENBQUE7TUFBQUMsT0FBQSxTQUVLQyxJQUFJLEdBQUcsU0FBUEEsSUFBSUEsQ0FBYUMsVUFBVSxFQUFFQyxRQUFRLEVBQUVDLFNBQVMsRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUU7UUFDMUVILFFBQVEsR0FBR1AsQ0FBQyxDQUFDTyxRQUFRLENBQUM7UUFDdEJDLFNBQVMsR0FBR1IsQ0FBQyxDQUFDUSxTQUFTLENBQUM7UUFFeEIsSUFBSSxDQUFDRixVQUFVLENBQUNLLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRTtVQUN0Q1gsQ0FBQyxDQUFDLFFBQVEsRUFBRU8sUUFBUSxDQUFDLENBQUNLLElBQUksQ0FBQ04sVUFBVSxDQUFDTyxFQUFFLENBQUM7UUFDM0M7TUFDRixDQUFDO01BQUFULE9BQUEsU0FFWVUsSUFBSTtJQUFBO0VBQUE7QUFBQSJ9