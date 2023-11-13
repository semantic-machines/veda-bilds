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
        if (individual.hasValue('v-s:hasRoot')) {
          $('.self-roots', template).remove();
        } else {
          $('.roots', template).remove();
        }
        if (individual.hasValue('rdf:type', 'v-s:LinksTree') && individual.hasValue('rdfs:label')) {
          $('.tree-label', template).remove();
        } else {
          $('.self-label', template).remove();
        }
      });
      _export("html", html = "\n  <div class=\"container sheet\">\n    <h2 class=\"self-label\" about=\"@\" property=\"rdfs:label\"></h2>\n    <h2 class=\"tree-label\" about=\"v-s:LinksTree\" property=\"rdfs:comment\"></h2>\n    <hr />\n    <div class=\"roots\" about=\"@\" rel=\"v-s:hasRoot\" data-template=\"v-s:LinksTreeTemplate\"></div>\n    <div class=\"self-root\" about=\"@\" data-template=\"v-s:LinksTreeTemplate\"></div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInByZSIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsImhhc1ZhbHVlIiwicmVtb3ZlIiwiaHRtbCJdLCJzb3VyY2VzIjpbIi4uLy4uL29udG9sb2d5L2dlbmVyaWMtZnVuY3Rpb24vdGVtcGxhdGVzL3Ytc19TdGFuZGFsb25lTGlua3NUcmVlVGVtcGxhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuZXhwb3J0IGNvbnN0IHByZSA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgaWYgKGluZGl2aWR1YWwuaGFzVmFsdWUoJ3YtczpoYXNSb290JykpIHtcbiAgICAkKCcuc2VsZi1yb290cycsIHRlbXBsYXRlKS5yZW1vdmUoKTtcbiAgfSBlbHNlIHtcbiAgICAkKCcucm9vdHMnLCB0ZW1wbGF0ZSkucmVtb3ZlKCk7XG4gIH1cbiAgaWYgKGluZGl2aWR1YWwuaGFzVmFsdWUoJ3JkZjp0eXBlJywgJ3YtczpMaW5rc1RyZWUnKSAmJiBpbmRpdmlkdWFsLmhhc1ZhbHVlKCdyZGZzOmxhYmVsJykpIHtcbiAgICAkKCcudHJlZS1sYWJlbCcsIHRlbXBsYXRlKS5yZW1vdmUoKTtcbiAgfSBlbHNlIHtcbiAgICAkKCcuc2VsZi1sYWJlbCcsIHRlbXBsYXRlKS5yZW1vdmUoKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGh0bWwgPSBgXG4gIDxkaXYgY2xhc3M9XCJjb250YWluZXIgc2hlZXRcIj5cbiAgICA8aDIgY2xhc3M9XCJzZWxmLWxhYmVsXCIgYWJvdXQ9XCJAXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9oMj5cbiAgICA8aDIgY2xhc3M9XCJ0cmVlLWxhYmVsXCIgYWJvdXQ9XCJ2LXM6TGlua3NUcmVlXCIgcHJvcGVydHk9XCJyZGZzOmNvbW1lbnRcIj48L2gyPlxuICAgIDxociAvPlxuICAgIDxkaXYgY2xhc3M9XCJyb290c1wiIGFib3V0PVwiQFwiIHJlbD1cInYtczpoYXNSb290XCIgZGF0YS10ZW1wbGF0ZT1cInYtczpMaW5rc1RyZWVUZW1wbGF0ZVwiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJzZWxmLXJvb3RcIiBhYm91dD1cIkBcIiBkYXRhLXRlbXBsYXRlPVwidi1zOkxpbmtzVHJlZVRlbXBsYXRlXCI+PC9kaXY+XG4gIDwvZGl2PlxuYDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7TUFBT0EsQ0FBQyxHQUFBQyxPQUFBLENBQUFDLE9BQUE7SUFBQTtJQUFBQyxPQUFBLFdBQUFBLENBQUE7TUFBQUMsT0FBQSxRQUVLQyxHQUFHLEdBQUcsU0FBTkEsR0FBR0EsQ0FBYUMsVUFBVSxFQUFFQyxRQUFRLEVBQUVDLFNBQVMsRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUU7UUFDekVILFFBQVEsR0FBR1AsQ0FBQyxDQUFDTyxRQUFRLENBQUM7UUFDdEJDLFNBQVMsR0FBR1IsQ0FBQyxDQUFDUSxTQUFTLENBQUM7UUFFeEIsSUFBSUYsVUFBVSxDQUFDSyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUU7VUFDdENYLENBQUMsQ0FBQyxhQUFhLEVBQUVPLFFBQVEsQ0FBQyxDQUFDSyxNQUFNLEVBQUU7UUFDckMsQ0FBQyxNQUFNO1VBQ0xaLENBQUMsQ0FBQyxRQUFRLEVBQUVPLFFBQVEsQ0FBQyxDQUFDSyxNQUFNLEVBQUU7UUFDaEM7UUFDQSxJQUFJTixVQUFVLENBQUNLLFFBQVEsQ0FBQyxVQUFVLEVBQUUsZUFBZSxDQUFDLElBQUlMLFVBQVUsQ0FBQ0ssUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO1VBQ3pGWCxDQUFDLENBQUMsYUFBYSxFQUFFTyxRQUFRLENBQUMsQ0FBQ0ssTUFBTSxFQUFFO1FBQ3JDLENBQUMsTUFBTTtVQUNMWixDQUFDLENBQUMsYUFBYSxFQUFFTyxRQUFRLENBQUMsQ0FBQ0ssTUFBTSxFQUFFO1FBQ3JDO01BQ0YsQ0FBQztNQUFBUixPQUFBLFNBRVlTLElBQUk7SUFBQTtFQUFBO0FBQUEifQ==