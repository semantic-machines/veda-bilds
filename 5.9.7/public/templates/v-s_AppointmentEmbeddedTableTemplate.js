"use strict";

System.register(["/js/browser/util.js", "jquery", "/js/common/individual_model.js"], function (_export, _context) {
  "use strict";

  var BrowserUtil, $, IndividualModel, pre, post, html;
  return {
    setters: [function (_jsBrowserUtilJs) {
      BrowserUtil = _jsBrowserUtilJs.default;
    }, function (_jquery) {
      $ = _jquery.default;
    }, function (_jsCommonIndividual_modelJs) {
      IndividualModel = _jsCommonIndividual_modelJs.default;
    }],
    execute: function () {
      _export("pre", pre = function pre(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        var canUpdateAppointment = individual.canUpdate();
        Promise.all([canUpdateAppointment]).then(function (results) {
          if (!results[0]) {
            $('#deleteAppointment', template).remove();
            $('#moveToAnotherDepartment', template).attr('disabled', 'disabled');
          }
        });
      });
      _export("post", post = function post(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);

        // нельзя удалить назначение по умолчанию
        individual.getPropertyChain('v-s:employee', 'v-s:defaultAppointment').then(function (defaultAppointment) {
          if (individual == defaultAppointment[0]) $('#deleteAppointment', template).attr('disabled', 'disabled');
        });
        $('#deleteAppointment', template).click(function () {
          if (confirm('Вы уверены?')) {
            individual['rdf:type'] = individual['rdf:type'].concat('v-s:Deletable');
            individual['v-s:deleted'] = [true];
            individual['v-s:dateTo'] = [new Date()];
            individual.save();
          }
        });
        $('#moveToAnotherDepartment', template).click(function () {
          var current_occupation = individual['v-s:occupation'][0].id;
          var Occupation = new IndividualModel(current_occupation);
          var tmpl = new IndividualModel('v-s:PositionMinimalTemplate');
          var modal = BrowserUtil.showModal(Occupation, tmpl, 'edit');
          Occupation.one('afterSave', function () {
            individual.save();
            modal.modal('hide').remove();
          });
        });
      });
      _export("html", html = "\n  <tr>\n    <td about=\"@\" data-template=\"v-ui:IconModalTemplate\" class=\"view -edit -search\"></td>\n    <td>\n      <div about=\"@\" property=\"rdfs:label\" class=\"view edit -search\"></div>\n    </td>\n    <td>\n      <div about=\"@\" property=\"v-s:dateFrom\" class=\"view -edit -search\"></div>\n      <veda-control property=\"v-s:dateFrom\" data-type=\"date\" class=\"-view edit search\"></veda-control>\n    </td>\n    <td>\n      <div about=\"@\" property=\"v-s:dateTo\" class=\"view -edit -search\"></div>\n      <veda-control property=\"v-s:dateTo\" data-type=\"date\" class=\"-view edit search\"></veda-control>\n    </td>\n    <td class=\"view -edit -search\">\n      <button class=\"btn btn-xs btn-success\" id=\"moveToAnotherDepartment\">\n        <span about=\"v-s:AnotherDepartmentBundle\" property=\"rdfs:label\"> </span>\n      </button>\n    </td>\n    <td class=\"view -edit -search\">\n      <button class=\"btn btn-xs btn-danger\" id=\"deleteAppointment\">\n        <span about=\"v-s:DeleteAppointmentBundle\" property=\"rdfs:label\"> </span>\n      </button>\n    </td>\n  </tr>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJCcm93c2VyVXRpbCIsIl9qc0Jyb3dzZXJVdGlsSnMiLCJkZWZhdWx0IiwiX2pxdWVyeSIsIiQiLCJfanNDb21tb25JbmRpdmlkdWFsX21vZGVsSnMiLCJJbmRpdmlkdWFsTW9kZWwiLCJleGVjdXRlIiwiX2V4cG9ydCIsInByZSIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsImNhblVwZGF0ZUFwcG9pbnRtZW50IiwiY2FuVXBkYXRlIiwiUHJvbWlzZSIsImFsbCIsInRoZW4iLCJyZXN1bHRzIiwicmVtb3ZlIiwiYXR0ciIsInBvc3QiLCJnZXRQcm9wZXJ0eUNoYWluIiwiZGVmYXVsdEFwcG9pbnRtZW50IiwiY2xpY2siLCJjb25maXJtIiwiY29uY2F0IiwiRGF0ZSIsInNhdmUiLCJjdXJyZW50X29jY3VwYXRpb24iLCJpZCIsIk9jY3VwYXRpb24iLCJ0bXBsIiwibW9kYWwiLCJzaG93TW9kYWwiLCJvbmUiLCJodG1sIl0sInNvdXJjZXMiOlsiLi4vLi4vb250b2xvZ3kvYWJzdHJhY3QtZGljdGlvbmFyeS9vcmdhbml6YXRpb24vdGVtcGxhdGVzL3Ytc19BcHBvaW50bWVudEVtYmVkZGVkVGFibGVUZW1wbGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQnJvd3NlclV0aWwgZnJvbSAnL2pzL2Jyb3dzZXIvdXRpbC5qcyc7XG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IEluZGl2aWR1YWxNb2RlbCBmcm9tICcvanMvY29tbW9uL2luZGl2aWR1YWxfbW9kZWwuanMnO1xuXG5leHBvcnQgY29uc3QgcHJlID0gZnVuY3Rpb24gKGluZGl2aWR1YWwsIHRlbXBsYXRlLCBjb250YWluZXIsIG1vZGUsIGV4dHJhKSB7XG4gIHRlbXBsYXRlID0gJCh0ZW1wbGF0ZSk7XG4gIGNvbnRhaW5lciA9ICQoY29udGFpbmVyKTtcblxuICBjb25zdCBjYW5VcGRhdGVBcHBvaW50bWVudCA9IGluZGl2aWR1YWwuY2FuVXBkYXRlKCk7XG4gIFByb21pc2UuYWxsKFtjYW5VcGRhdGVBcHBvaW50bWVudF0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdHMpIHtcbiAgICBpZiAoIXJlc3VsdHNbMF0pIHtcbiAgICAgICQoJyNkZWxldGVBcHBvaW50bWVudCcsIHRlbXBsYXRlKS5yZW1vdmUoKTtcbiAgICAgICQoJyNtb3ZlVG9Bbm90aGVyRGVwYXJ0bWVudCcsIHRlbXBsYXRlKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgcG9zdCA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgLy8g0L3QtdC70YzQt9GPINGD0LTQsNC70LjRgtGMINC90LDQt9C90LDRh9C10L3QuNC1INC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOXG4gIGluZGl2aWR1YWwuZ2V0UHJvcGVydHlDaGFpbigndi1zOmVtcGxveWVlJywgJ3YtczpkZWZhdWx0QXBwb2ludG1lbnQnKS50aGVuKGZ1bmN0aW9uIChkZWZhdWx0QXBwb2ludG1lbnQpIHtcbiAgICBpZiAoaW5kaXZpZHVhbCA9PSBkZWZhdWx0QXBwb2ludG1lbnRbMF0pICQoJyNkZWxldGVBcHBvaW50bWVudCcsIHRlbXBsYXRlKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICB9KTtcblxuICAkKCcjZGVsZXRlQXBwb2ludG1lbnQnLCB0ZW1wbGF0ZSkuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIGlmIChjb25maXJtKCfQktGLINGD0LLQtdGA0LXQvdGLPycpKSB7XG4gICAgICBpbmRpdmlkdWFsWydyZGY6dHlwZSddID0gaW5kaXZpZHVhbFsncmRmOnR5cGUnXS5jb25jYXQoJ3YtczpEZWxldGFibGUnKTtcbiAgICAgIGluZGl2aWR1YWxbJ3YtczpkZWxldGVkJ10gPSBbdHJ1ZV07XG4gICAgICBpbmRpdmlkdWFsWyd2LXM6ZGF0ZVRvJ10gPSBbbmV3IERhdGUoKV07XG4gICAgICBpbmRpdmlkdWFsLnNhdmUoKTtcbiAgICB9XG4gIH0pO1xuXG4gICQoJyNtb3ZlVG9Bbm90aGVyRGVwYXJ0bWVudCcsIHRlbXBsYXRlKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgY3VycmVudF9vY2N1cGF0aW9uID0gaW5kaXZpZHVhbFsndi1zOm9jY3VwYXRpb24nXVswXS5pZDtcbiAgICBjb25zdCBPY2N1cGF0aW9uID0gbmV3IEluZGl2aWR1YWxNb2RlbChjdXJyZW50X29jY3VwYXRpb24pO1xuICAgIGNvbnN0IHRtcGwgPSBuZXcgSW5kaXZpZHVhbE1vZGVsKCd2LXM6UG9zaXRpb25NaW5pbWFsVGVtcGxhdGUnKTtcbiAgICBjb25zdCBtb2RhbCA9IEJyb3dzZXJVdGlsLnNob3dNb2RhbChPY2N1cGF0aW9uLCB0bXBsLCAnZWRpdCcpO1xuICAgIE9jY3VwYXRpb24ub25lKCdhZnRlclNhdmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpbmRpdmlkdWFsLnNhdmUoKTtcbiAgICAgIG1vZGFsLm1vZGFsKCdoaWRlJykucmVtb3ZlKCk7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGh0bWwgPSBgXG4gIDx0cj5cbiAgICA8dGQgYWJvdXQ9XCJAXCIgZGF0YS10ZW1wbGF0ZT1cInYtdWk6SWNvbk1vZGFsVGVtcGxhdGVcIiBjbGFzcz1cInZpZXcgLWVkaXQgLXNlYXJjaFwiPjwvdGQ+XG4gICAgPHRkPlxuICAgICAgPGRpdiBhYm91dD1cIkBcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIiBjbGFzcz1cInZpZXcgZWRpdCAtc2VhcmNoXCI+PC9kaXY+XG4gICAgPC90ZD5cbiAgICA8dGQ+XG4gICAgICA8ZGl2IGFib3V0PVwiQFwiIHByb3BlcnR5PVwidi1zOmRhdGVGcm9tXCIgY2xhc3M9XCJ2aWV3IC1lZGl0IC1zZWFyY2hcIj48L2Rpdj5cbiAgICAgIDx2ZWRhLWNvbnRyb2wgcHJvcGVydHk9XCJ2LXM6ZGF0ZUZyb21cIiBkYXRhLXR5cGU9XCJkYXRlXCIgY2xhc3M9XCItdmlldyBlZGl0IHNlYXJjaFwiPjwvdmVkYS1jb250cm9sPlxuICAgIDwvdGQ+XG4gICAgPHRkPlxuICAgICAgPGRpdiBhYm91dD1cIkBcIiBwcm9wZXJ0eT1cInYtczpkYXRlVG9cIiBjbGFzcz1cInZpZXcgLWVkaXQgLXNlYXJjaFwiPjwvZGl2PlxuICAgICAgPHZlZGEtY29udHJvbCBwcm9wZXJ0eT1cInYtczpkYXRlVG9cIiBkYXRhLXR5cGU9XCJkYXRlXCIgY2xhc3M9XCItdmlldyBlZGl0IHNlYXJjaFwiPjwvdmVkYS1jb250cm9sPlxuICAgIDwvdGQ+XG4gICAgPHRkIGNsYXNzPVwidmlldyAtZWRpdCAtc2VhcmNoXCI+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi14cyBidG4tc3VjY2Vzc1wiIGlkPVwibW92ZVRvQW5vdGhlckRlcGFydG1lbnRcIj5cbiAgICAgICAgPHNwYW4gYWJvdXQ9XCJ2LXM6QW5vdGhlckRlcGFydG1lbnRCdW5kbGVcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj4gPC9zcGFuPlxuICAgICAgPC9idXR0b24+XG4gICAgPC90ZD5cbiAgICA8dGQgY2xhc3M9XCJ2aWV3IC1lZGl0IC1zZWFyY2hcIj5cbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXhzIGJ0bi1kYW5nZXJcIiBpZD1cImRlbGV0ZUFwcG9pbnRtZW50XCI+XG4gICAgICAgIDxzcGFuIGFib3V0PVwidi1zOkRlbGV0ZUFwcG9pbnRtZW50QnVuZGxlXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+IDwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvdGQ+XG4gIDwvdHI+XG5gO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztNQUFPQSxXQUFXLEdBQUFDLGdCQUFBLENBQUFDLE9BQUE7SUFBQSxhQUFBQyxPQUFBO01BQ1hDLENBQUMsR0FB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