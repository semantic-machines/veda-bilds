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
        if (!individual.hasValue('v-wf:initiator')) {
          $('#initiator', template).remove();
        }
      });
      _export("html", html = "\n  <div class=\"journal-record\">\n    <hr class=\"margin-sm\" />\n    <div class=\"row\">\n      <div class=\"col-md-2 col-sm-3 event-type\">\n        <strong rel=\"rdf:type\" data-template=\"v-ui:LabelTemplate\"></strong>\n      </div>\n      <div class=\"col-md-8 col-sm-6 event-desc\">\n        <div property=\"rdfs:label\"></div>\n        <span id=\"initiator\">\n          <span about=\"v-wf:initiator\" property=\"rdfs:label\"></span>:\n          <em rel=\"v-wf:initiator\" data-template=\"v-ui:LabelTemplate\"></em>\n        </span>\n      </div>\n      <div class=\"col-md-2 col-sm-3 event-date text-right\">\n        <span about=\"@\" property=\"v-s:created\"></span>\n      </div>\n    </div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInByZSIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsImhhc1ZhbHVlIiwicmVtb3ZlIiwiaHRtbCJdLCJzb3VyY2VzIjpbIi4uLy4uL29udG9sb2d5L2dlbmVyaWMtZnVuY3Rpb24vdGVtcGxhdGVzL3Ytd2ZfUHJvY2Vzc0V2ZW50VGVtcGxhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuZXhwb3J0IGNvbnN0IHByZSA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgaWYgKCFpbmRpdmlkdWFsLmhhc1ZhbHVlKCd2LXdmOmluaXRpYXRvcicpKSB7XG4gICAgJCgnI2luaXRpYXRvcicsIHRlbXBsYXRlKS5yZW1vdmUoKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGh0bWwgPSBgXG4gIDxkaXYgY2xhc3M9XCJqb3VybmFsLXJlY29yZFwiPlxuICAgIDxociBjbGFzcz1cIm1hcmdpbi1zbVwiIC8+XG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0yIGNvbC1zbS0zIGV2ZW50LXR5cGVcIj5cbiAgICAgICAgPHN0cm9uZyByZWw9XCJyZGY6dHlwZVwiIGRhdGEtdGVtcGxhdGU9XCJ2LXVpOkxhYmVsVGVtcGxhdGVcIj48L3N0cm9uZz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC04IGNvbC1zbS02IGV2ZW50LWRlc2NcIj5cbiAgICAgICAgPGRpdiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L2Rpdj5cbiAgICAgICAgPHNwYW4gaWQ9XCJpbml0aWF0b3JcIj5cbiAgICAgICAgICA8c3BhbiBhYm91dD1cInYtd2Y6aW5pdGlhdG9yXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9zcGFuPjpcbiAgICAgICAgICA8ZW0gcmVsPVwidi13Zjppbml0aWF0b3JcIiBkYXRhLXRlbXBsYXRlPVwidi11aTpMYWJlbFRlbXBsYXRlXCI+PC9lbT5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTIgY29sLXNtLTMgZXZlbnQtZGF0ZSB0ZXh0LXJpZ2h0XCI+XG4gICAgICAgIDxzcGFuIGFib3V0PVwiQFwiIHByb3BlcnR5PVwidi1zOmNyZWF0ZWRcIj48L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5gO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztNQUFPQSxDQUFDLEdBQUFDLE9BQUEsQ0FBQUMsT0FBQTtJQUFBO0lBQUFDLE9BQUEsV0FBQUEsQ0FBQTtNQUFBQyxPQUFBLFFBRUtDLEdBQUcsR0FBRyxTQUFOQSxHQUFHQSxDQUFhQyxVQUFVLEVBQUVDLFFBQVEsRUFBRUMsU0FBUyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRTtRQUN6RUgsUUFBUSxHQUFHUCxDQUFDLENBQUNPLFFBQVEsQ0FBQztRQUN0QkMsU0FBUyxHQUFHUixDQUFDLENBQUNRLFNBQVMsQ0FBQztRQUV4QixJQUFJLENBQUNGLFVBQVUsQ0FBQ0ssUUFBUSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7VUFDMUNYLENBQUMsQ0FBQyxZQUFZLEVBQUVPLFFBQVEsQ0FBQyxDQUFDSyxNQUFNLEVBQUU7UUFDcEM7TUFDRixDQUFDO01BQUFSLE9BQUEsU0FFWVMsSUFBSTtJQUFBO0VBQUE7QUFBQSJ9