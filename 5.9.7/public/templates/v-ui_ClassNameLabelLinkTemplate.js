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
      _export("html", html = "\n  <a class=\"label-template\" href=\"#/@\">\n    <span about=\"@\" rel=\"rdf:type\">\n      <span>\n        <span about=\"@\" property=\"rdfs:label\"></span>\n      </span> </span\n    >:\n    <span id=\"label\" about=\"@\" property=\"rdfs:label\"></span>\n  </a>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInBvc3QiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJoYXNWYWx1ZSIsInRleHQiLCJpZCIsImh0bWwiXSwic291cmNlcyI6WyIuLi8uLi9vbnRvbG9neS9zeXN0ZW0tY29yZS90ZW1wbGF0ZXMvdi11aV9DbGFzc05hbWVMYWJlbExpbmtUZW1wbGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG5leHBvcnQgY29uc3QgcG9zdCA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgaWYgKCFpbmRpdmlkdWFsLmhhc1ZhbHVlKCdyZGZzOmxhYmVsJykpIHtcbiAgICAkKCcjbGFiZWwnLCB0ZW1wbGF0ZSkudGV4dChpbmRpdmlkdWFsLmlkKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGh0bWwgPSBgXG4gIDxhIGNsYXNzPVwibGFiZWwtdGVtcGxhdGVcIiBocmVmPVwiIy9AXCI+XG4gICAgPHNwYW4gYWJvdXQ9XCJAXCIgcmVsPVwicmRmOnR5cGVcIj5cbiAgICAgIDxzcGFuPlxuICAgICAgICA8c3BhbiBhYm91dD1cIkBcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L3NwYW4+XG4gICAgICA8L3NwYW4+IDwvc3BhblxuICAgID46XG4gICAgPHNwYW4gaWQ9XCJsYWJlbFwiIGFib3V0PVwiQFwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvc3Bhbj5cbiAgPC9hPlxuYDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7TUFBT0EsQ0FBQyxHQUFBQyxPQUFBLENBQUFDLE9BQUE7SUFBQTtJQUFBQyxPQUFBLFdBQUFBLENBQUE7TUFBQUMsT0FBQSxTQUVLQyxJQUFJLEdBQUcsU0FBUEEsSUFBSUEsQ0FBYUMsVUFBVSxFQUFFQyxRQUFRLEVBQUVDLFNBQVMsRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUU7UUFDMUVILFFBQVEsR0FBR1AsQ0FBQyxDQUFDTyxRQUFRLENBQUM7UUFDdEJDLFNBQVMsR0FBR1IsQ0FBQyxDQUFDUSxTQUFTLENBQUM7UUFFeEIsSUFBSSxDQUFDRixVQUFVLENBQUNLLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRTtVQUN0Q1gsQ0FBQyxDQUFDLFFBQVEsRUFBRU8sUUFBUSxDQUFDLENBQUNLLElBQUksQ0FBQ04sVUFBVSxDQUFDTyxFQUFFLENBQUM7UUFDM0M7TUFDRixDQUFDO01BQUFULE9BQUEsU0FFWVUsSUFBSTtJQUFBO0VBQUE7QUFBQSJ9