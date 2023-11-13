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
        if (individual.hasValue('v-wf:hasStartForm')) {
          var startForm = individual['v-wf:hasStartForm'][0];
          $("[about='start-form']", template).attr('about', startForm.id);
        } else {
          // Проверим наличие переменной стартовой формы
          var inVars = individual['v-wf:inVars'].map(function (inVar) {
            return inVar.load();
          });
          if (inVars.length) {
            return Promise.all(inVars).then(function (inVars) {
              var startFormVar = inVars.filter(function (inVar) {
                return inVar.hasValue('v-wf:variableName', 'startForm_id');
              });
              var startForm = startFormVar[0]['v-wf:variableValue'][0];
              $("[about='start-form']", template).attr('about', startForm.id);
            }).catch(function () {
              $("[about='start-form']", template).remove();
            });
          } else {
            $("[about='start-form']", template).remove();
          }
        }
      });
      _export("html", html = "\n  <div>\n    <a about=\"@\" class=\"process-id\" href=\"#/@\" rel=\"v-wf:instanceOf\" data-template=\"v-ui:LabelTemplate\"></a>\n    <a href=\"#\" class=\"stop-process glyphicon glyphicon-remove text-danger\" style=\"display:none;\"></a>\n    <span class=\"process-stopped glyphicon glyphicon-minus-sign text-danger\" style=\"display:none;\"></span>\n    <span about=\"start-form\">\n      <span> &nbsp;&nbsp;(<a href=\"#/@\" about=\"@\" rel=\"rdf:type\" data-template=\"v-ui:LabelTemplate\"></a>) </span>\n    </span>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInByZSIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsImhhc1ZhbHVlIiwic3RhcnRGb3JtIiwiYXR0ciIsImlkIiwiaW5WYXJzIiwibWFwIiwiaW5WYXIiLCJsb2FkIiwibGVuZ3RoIiwiUHJvbWlzZSIsImFsbCIsInRoZW4iLCJzdGFydEZvcm1WYXIiLCJmaWx0ZXIiLCJjYXRjaCIsInJlbW92ZSIsImh0bWwiXSwic291cmNlcyI6WyIuLi8uLi9vbnRvbG9neS9zeXN0ZW0tY29yZS90ZW1wbGF0ZXMvdi11aV9Eb2N1bWVudEV2ZW50VGVtcGxhdGVfaW5saW5lLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmV4cG9ydCBjb25zdCBwcmUgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gIGlmIChpbmRpdmlkdWFsLmhhc1ZhbHVlKCd2LXdmOmhhc1N0YXJ0Rm9ybScpKSB7XG4gICAgY29uc3Qgc3RhcnRGb3JtID0gaW5kaXZpZHVhbFsndi13ZjpoYXNTdGFydEZvcm0nXVswXTtcbiAgICAkKFwiW2Fib3V0PSdzdGFydC1mb3JtJ11cIiwgdGVtcGxhdGUpLmF0dHIoJ2Fib3V0Jywgc3RhcnRGb3JtLmlkKTtcbiAgfSBlbHNlIHtcbiAgICAvLyDQn9GA0L7QstC10YDQuNC8INC90LDQu9C40YfQuNC1INC/0LXRgNC10LzQtdC90L3QvtC5INGB0YLQsNGA0YLQvtCy0L7QuSDRhNC+0YDQvNGLXG4gICAgY29uc3QgaW5WYXJzID0gaW5kaXZpZHVhbFsndi13ZjppblZhcnMnXS5tYXAoZnVuY3Rpb24gKGluVmFyKSB7XG4gICAgICByZXR1cm4gaW5WYXIubG9hZCgpO1xuICAgIH0pO1xuICAgIGlmIChpblZhcnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwoaW5WYXJzKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoaW5WYXJzKSB7XG4gICAgICAgICAgY29uc3Qgc3RhcnRGb3JtVmFyID0gaW5WYXJzLmZpbHRlcihmdW5jdGlvbiAoaW5WYXIpIHtcbiAgICAgICAgICAgIHJldHVybiBpblZhci5oYXNWYWx1ZSgndi13Zjp2YXJpYWJsZU5hbWUnLCAnc3RhcnRGb3JtX2lkJyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgY29uc3Qgc3RhcnRGb3JtID0gc3RhcnRGb3JtVmFyWzBdWyd2LXdmOnZhcmlhYmxlVmFsdWUnXVswXTtcbiAgICAgICAgICAkKFwiW2Fib3V0PSdzdGFydC1mb3JtJ11cIiwgdGVtcGxhdGUpLmF0dHIoJ2Fib3V0Jywgc3RhcnRGb3JtLmlkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkKFwiW2Fib3V0PSdzdGFydC1mb3JtJ11cIiwgdGVtcGxhdGUpLnJlbW92ZSgpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgJChcIlthYm91dD0nc3RhcnQtZm9ybSddXCIsIHRlbXBsYXRlKS5yZW1vdmUoKTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBodG1sID0gYFxuICA8ZGl2PlxuICAgIDxhIGFib3V0PVwiQFwiIGNsYXNzPVwicHJvY2Vzcy1pZFwiIGhyZWY9XCIjL0BcIiByZWw9XCJ2LXdmOmluc3RhbmNlT2ZcIiBkYXRhLXRlbXBsYXRlPVwidi11aTpMYWJlbFRlbXBsYXRlXCI+PC9hPlxuICAgIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJzdG9wLXByb2Nlc3MgZ2x5cGhpY29uIGdseXBoaWNvbi1yZW1vdmUgdGV4dC1kYW5nZXJcIiBzdHlsZT1cImRpc3BsYXk6bm9uZTtcIj48L2E+XG4gICAgPHNwYW4gY2xhc3M9XCJwcm9jZXNzLXN0b3BwZWQgZ2x5cGhpY29uIGdseXBoaWNvbi1taW51cy1zaWduIHRleHQtZGFuZ2VyXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmU7XCI+PC9zcGFuPlxuICAgIDxzcGFuIGFib3V0PVwic3RhcnQtZm9ybVwiPlxuICAgICAgPHNwYW4+ICZuYnNwOyZuYnNwOyg8YSBocmVmPVwiIy9AXCIgYWJvdXQ9XCJAXCIgcmVsPVwicmRmOnR5cGVcIiBkYXRhLXRlbXBsYXRlPVwidi11aTpMYWJlbFRlbXBsYXRlXCI+PC9hPikgPC9zcGFuPlxuICAgIDwvc3Bhbj5cbiAgPC9kaXY+XG5gO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztNQUFPQSxDQUFDLEdBQUFDLE9BQUEsQ0FBQUMsT0FBQTtJQUFBO0lBQUFDLE9BQUEsV0FBQUEsQ0FBQTtNQUFBQyxPQUFBLFFBRUtDLEdBQUcsR0FBRyxTQUFOQSxHQUFHQSxDQUFhQyxVQUFVLEVBQUVDLFFBQVEsRUFBRUMsU0FBUyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRTtRQUN6RUgsUUFBUSxHQUFHUCxDQUFDLENBQUNPLFFBQVEsQ0FBQztRQUN0QkMsU0FBUyxHQUFHUixDQUFDLENBQUNRLFNBQVMsQ0FBQztRQUV4QixJQUFJRixVQUFVLENBQUNLLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO1VBQzVDLElBQU1DLFNBQVMsR0FBR04sVUFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDO1VBQ3BETixDQUFDLENBQUMsc0JBQXNCLEVBQUVPLFFBQVEsQ0FBQyxDQUFDTSxJQUFJLENBQUMsT0FBTyxFQUFFRCxTQUFTLENBQUNFLEVBQUUsQ0FBQztRQUNqRSxDQUFDLE1BQU07VUFDTDtVQUNBLElBQU1DLE1BQU0sR0FBR1QsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDVSxHQUFHLENBQUMsVUFBVUMsS0FBSyxFQUFFO1lBQzVELE9BQU9BLEtBQUssQ0FBQ0MsSUFBSSxFQUFFO1VBQ3JCLENBQUMsQ0FBQztVQUNGLElBQUlILE1BQU0sQ0FBQ0ksTUFBTSxFQUFFO1lBQ2pCLE9BQU9DLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDTixNQUFNLENBQUMsQ0FDdkJPLElBQUksQ0FBQyxVQUFVUCxNQUFNLEVBQUU7Y0FDdEIsSUFBTVEsWUFBWSxHQUFHUixNQUFNLENBQUNTLE1BQU0sQ0FBQyxVQUFVUCxLQUFLLEVBQUU7Z0JBQ2xELE9BQU9BLEtBQUssQ0FBQ04sUUFBUSxDQUFDLG1CQUFtQixFQUFFLGNBQWMsQ0FBQztjQUM1RCxDQUFDLENBQUM7Y0FDRixJQUFNQyxTQUFTLEdBQUdXLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztjQUMxRHZCLENBQUMsQ0FBQyxzQkFBc0IsRUFBRU8sUUFBUSxDQUFDLENBQUNNLElBQUksQ0FBQyxPQUFPLEVBQUVELFNBQVMsQ0FBQ0UsRUFBRSxDQUFDO1lBQ2pFLENBQUMsQ0FBQyxDQUNEVyxLQUFLLENBQUMsWUFBWTtjQUNqQnpCLENBQUMsQ0FBQyxzQkFBc0IsRUFBRU8sUUFBUSxDQUFDLENBQUNtQixNQUFNLEVBQUU7WUFDOUMsQ0FBQyxDQUFDO1VBQ04sQ0FBQyxNQUFNO1lBQ0wxQixDQUFDLENBQUMsc0JBQXNCLEVBQUVPLFFBQVEsQ0FBQyxDQUFDbUIsTUFBTSxFQUFFO1VBQzlDO1FBQ0Y7TUFDRixDQUFDO01BQUF0QixPQUFBLFNBRVl1QixJQUFJO0lBQUE7RUFBQTtBQUFBIn0=