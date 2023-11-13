"use strict";

System.register(["jquery"], function (_export, _context) {
  "use strict";

  var $, pre, html;
  function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }],
    execute: function () {
      _export("pre", pre = function pre(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        var fn = individual['v-s:fileName'][0];
        var img = 'jpg|jpeg|gif|png|bmp|svg';
        if (typeof fn === 'string' || _instanceof(fn, String)) {
          var idx = fn.lastIndexOf('.');
          var ext = fn.substr(idx + 1);
          if (img.indexOf(ext.toLowerCase()) < 0) {
            $('.thumbnail', template).remove();
          }
        }
      });
      _export("html", html = "\n  <div class=\"horizontal-card\">\n    <div class=\"thumbnail\" about=\"@\" data-template=\"v-ui:ModalImageTemplate\"></div>\n    <div class=\"description\">\n      <strong about=\"rdfs:comment\" property=\"rdfs:label\" class=\"-view edit search\"></strong>\n      <veda-control data-type=\"string\" property=\"rdfs:comment\" class=\"-view edit search margin-sm\"></veda-control>\n      <strong property=\"rdfs:comment\" class=\"view -edit -search header\"></strong>\n      <hr class=\"margin-sm view -edit -search\" />\n      <div class=\"file-name\" about=\"@\" data-template=\"v-ui:FileMinTemplate\"></div>\n      <i class=\"view -edit -search\"> <small rel=\"v-s:creator\" data-template=\"v-ui:LabelTemplate\"></small><small property=\"v-s:created\"></small> </i>\n    </div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInByZSIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsImZuIiwiaW1nIiwiX2luc3RhbmNlb2YiLCJTdHJpbmciLCJpZHgiLCJsYXN0SW5kZXhPZiIsImV4dCIsInN1YnN0ciIsImluZGV4T2YiLCJ0b0xvd2VyQ2FzZSIsInJlbW92ZSIsImh0bWwiXSwic291cmNlcyI6WyIuLi8uLi9vbnRvbG9neS9zeXN0ZW0tY29yZS90ZW1wbGF0ZXMvdi11aV9GaWxlVGVtcGxhdGVXaXRoQ29tbWVudC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG5leHBvcnQgY29uc3QgcHJlID0gZnVuY3Rpb24gKGluZGl2aWR1YWwsIHRlbXBsYXRlLCBjb250YWluZXIsIG1vZGUsIGV4dHJhKSB7XG4gIHRlbXBsYXRlID0gJCh0ZW1wbGF0ZSk7XG4gIGNvbnRhaW5lciA9ICQoY29udGFpbmVyKTtcblxuICBjb25zdCBmbiA9IGluZGl2aWR1YWxbJ3YtczpmaWxlTmFtZSddWzBdO1xuICBjb25zdCBpbWcgPSAnanBnfGpwZWd8Z2lmfHBuZ3xibXB8c3ZnJztcbiAgaWYgKHR5cGVvZiBmbiA9PT0gJ3N0cmluZycgfHwgZm4gaW5zdGFuY2VvZiBTdHJpbmcpIHtcbiAgICBjb25zdCBpZHggPSBmbi5sYXN0SW5kZXhPZignLicpO1xuICAgIGNvbnN0IGV4dCA9IGZuLnN1YnN0cihpZHggKyAxKTtcbiAgICBpZiAoaW1nLmluZGV4T2YoZXh0LnRvTG93ZXJDYXNlKCkpIDwgMCkge1xuICAgICAgJCgnLnRodW1ibmFpbCcsIHRlbXBsYXRlKS5yZW1vdmUoKTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBodG1sID0gYFxuICA8ZGl2IGNsYXNzPVwiaG9yaXpvbnRhbC1jYXJkXCI+XG4gICAgPGRpdiBjbGFzcz1cInRodW1ibmFpbFwiIGFib3V0PVwiQFwiIGRhdGEtdGVtcGxhdGU9XCJ2LXVpOk1vZGFsSW1hZ2VUZW1wbGF0ZVwiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJkZXNjcmlwdGlvblwiPlxuICAgICAgPHN0cm9uZyBhYm91dD1cInJkZnM6Y29tbWVudFwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiIGNsYXNzPVwiLXZpZXcgZWRpdCBzZWFyY2hcIj48L3N0cm9uZz5cbiAgICAgIDx2ZWRhLWNvbnRyb2wgZGF0YS10eXBlPVwic3RyaW5nXCIgcHJvcGVydHk9XCJyZGZzOmNvbW1lbnRcIiBjbGFzcz1cIi12aWV3IGVkaXQgc2VhcmNoIG1hcmdpbi1zbVwiPjwvdmVkYS1jb250cm9sPlxuICAgICAgPHN0cm9uZyBwcm9wZXJ0eT1cInJkZnM6Y29tbWVudFwiIGNsYXNzPVwidmlldyAtZWRpdCAtc2VhcmNoIGhlYWRlclwiPjwvc3Ryb25nPlxuICAgICAgPGhyIGNsYXNzPVwibWFyZ2luLXNtIHZpZXcgLWVkaXQgLXNlYXJjaFwiIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwiZmlsZS1uYW1lXCIgYWJvdXQ9XCJAXCIgZGF0YS10ZW1wbGF0ZT1cInYtdWk6RmlsZU1pblRlbXBsYXRlXCI+PC9kaXY+XG4gICAgICA8aSBjbGFzcz1cInZpZXcgLWVkaXQgLXNlYXJjaFwiPiA8c21hbGwgcmVsPVwidi1zOmNyZWF0b3JcIiBkYXRhLXRlbXBsYXRlPVwidi11aTpMYWJlbFRlbXBsYXRlXCI+PC9zbWFsbD48c21hbGwgcHJvcGVydHk9XCJ2LXM6Y3JlYXRlZFwiPjwvc21hbGw+IDwvaT5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5gO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7TUFBT0EsQ0FBQyxHQUFBQyxPQUFBLENBQUFDLE9BQUE7SUFBQTtJQUFBQyxPQUFBLFdBQUFBLENBQUE7TUFBQUMsT0FBQSxRQUVLQyxHQUFHLEdBQUcsU0FBTkEsR0FBR0EsQ0FBYUMsVUFBVSxFQUFFQyxRQUFRLEVBQUVDLFNBQVMsRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUU7UUFDekVILFFBQVEsR0FBR1AsQ0FBQyxDQUFDTyxRQUFRLENBQUM7UUFDdEJDLFNBQVMsR0FBR1IsQ0FBQyxDQUFDUSxTQUFTLENBQUM7UUFFeEIsSUFBTUcsRUFBRSxHQUFHTCxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLElBQU1NLEdBQUcsR0FBRywwQkFBMEI7UUFDdEMsSUFBSSxPQUFPRCxFQUFFLEtBQUssUUFBUSxJQUFBRSxXQUFBLENBQUlGLEVBQUUsRUFBWUcsTUFBTSxHQUFFO1VBQ2xELElBQU1DLEdBQUcsR0FBR0osRUFBRSxDQUFDSyxXQUFXLENBQUMsR0FBRyxDQUFDO1VBQy9CLElBQU1DLEdBQUcsR0FBR04sRUFBRSxDQUFDTyxNQUFNLENBQUNILEdBQUcsR0FBRyxDQUFDLENBQUM7VUFDOUIsSUFBSUgsR0FBRyxDQUFDTyxPQUFPLENBQUNGLEdBQUcsQ0FBQ0csV0FBVyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDdENwQixDQUFDLENBQUMsWUFBWSxFQUFFTyxRQUFRLENBQUMsQ0FBQ2MsTUFBTSxFQUFFO1VBQ3BDO1FBQ0Y7TUFDRixDQUFDO01BQUFqQixPQUFBLFNBRVlrQixJQUFJO0lBQUE7RUFBQTtBQUFBIn0=