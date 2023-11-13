"use strict";

System.register(["/js/common/util.js", "jquery", "/js/common/veda.js", "/js/common/backend.js", "/js/common/individual_model.js"], function (_export, _context) {
  "use strict";

  var CommonUtil, $, veda, Backend, IndividualModel, post, html;
  return {
    setters: [function (_jsCommonUtilJs) {
      CommonUtil = _jsCommonUtilJs.default;
    }, function (_jquery) {
      $ = _jquery.default;
    }, function (_jsCommonVedaJs) {
      veda = _jsCommonVedaJs.default;
    }, function (_jsCommonBackendJs) {
      Backend = _jsCommonBackendJs.default;
    }, function (_jsCommonIndividual_modelJs) {
      IndividualModel = _jsCommonIndividual_modelJs.default;
    }],
    execute: function () {
      _export("post", post = function post(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        return Backend.query({
          ticket: veda.ticket,
          query: "'rdf:type'==='v-s:Appointment' && 'v-s:official'==true && 'v-s:employee'==='" + individual.id + "'"
        }).then(function (result) {
          var apps = result.result;
          if (apps.length > 1) {
            return Promise.all(apps.map(function (id) {
              var app = new IndividualModel(id);
              var checked = id === veda.appointment.id;
              return app.getPropertyChain('v-s:occupation', 'rdfs:label').then(function (label) {
                label = label.map(CommonUtil.formatValue).join(' ');
                return "<div class=\"radio\">\n                    <label>\n                      <input type=\"radio\" name=\"appointments\" value=\"".concat(id, "\" ").concat(checked ? 'checked' : '', ">\n                      ").concat(label, "\n                    </label>\n                  </div>");
              });
            })).then(function (radios) {
              var form = $('#appointments-form', template);
              form.append(radios);
              form.on('change', function () {
                var selected = $("input[name='appointments']:checked").val();
                individual['v-s:defaultAppointment'] = new IndividualModel(selected);
              });
              setTimeout(function () {
                template.modal();
              }, 500);
            });
          } else {
            template.remove();
            container.remove();
          }
        });
      });
      _export("html", html = "\n  <div class=\"modal switch-appointment\" tabindex=\"-1\" role=\"dialog\">\n    <div class=\"modal-dialog\" role=\"document\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <h4 class=\"modal-title\" about=\"v-ui:AppointmentSwitchInfo\" property=\"rdfs:label\"></h4>\n        </div>\n        <div class=\"modal-body\">\n          <form id=\"appointments-form\"></form>\n        </div>\n        <div class=\"modal-footer\">\n          <button type=\"button\" class=\"btn btn-primary pull-left\" data-dismiss=\"modal\">Ok</button>\n        </div>\n      </div>\n    </div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJDb21tb25VdGlsIiwiX2pzQ29tbW9uVXRpbEpzIiwiZGVmYXVsdCIsIl9qcXVlcnkiLCIkIiwiX2pzQ29tbW9uVmVkYUpzIiwidmVkYSIsIl9qc0NvbW1vbkJhY2tlbmRKcyIsIkJhY2tlbmQiLCJfanNDb21tb25JbmRpdmlkdWFsX21vZGVsSnMiLCJJbmRpdmlkdWFsTW9kZWwiLCJleGVjdXRlIiwiX2V4cG9ydCIsInBvc3QiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJxdWVyeSIsInRpY2tldCIsImlkIiwidGhlbiIsInJlc3VsdCIsImFwcHMiLCJsZW5ndGgiLCJQcm9taXNlIiwiYWxsIiwibWFwIiwiYXBwIiwiY2hlY2tlZCIsImFwcG9pbnRtZW50IiwiZ2V0UHJvcGVydHlDaGFpbiIsImxhYmVsIiwiZm9ybWF0VmFsdWUiLCJqb2luIiwiY29uY2F0IiwicmFkaW9zIiwiZm9ybSIsImFwcGVuZCIsIm9uIiwic2VsZWN0ZWQiLCJ2YWwiLCJzZXRUaW1lb3V0IiwibW9kYWwiLCJyZW1vdmUiLCJodG1sIl0sInNvdXJjZXMiOlsiLi4vLi4vb250b2xvZ3kvc3lzdGVtLWNvcmUvdGVtcGxhdGVzL3YtdWlfQXBwb2ludG1lbnRTd2l0Y2hUZW1wbGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tbW9uVXRpbCBmcm9tICcvanMvY29tbW9uL3V0aWwuanMnO1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB2ZWRhIGZyb20gJy9qcy9jb21tb24vdmVkYS5qcyc7XG5pbXBvcnQgQmFja2VuZCBmcm9tICcvanMvY29tbW9uL2JhY2tlbmQuanMnO1xuaW1wb3J0IEluZGl2aWR1YWxNb2RlbCBmcm9tICcvanMvY29tbW9uL2luZGl2aWR1YWxfbW9kZWwuanMnO1xuXG5leHBvcnQgY29uc3QgcG9zdCA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgcmV0dXJuIEJhY2tlbmQucXVlcnkoe1xuICAgIHRpY2tldDogdmVkYS50aWNrZXQsXG4gICAgcXVlcnk6IFwiJ3JkZjp0eXBlJz09PSd2LXM6QXBwb2ludG1lbnQnICYmICd2LXM6b2ZmaWNpYWwnPT10cnVlICYmICd2LXM6ZW1wbG95ZWUnPT09J1wiICsgaW5kaXZpZHVhbC5pZCArIFwiJ1wiLFxuICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICBjb25zdCBhcHBzID0gcmVzdWx0LnJlc3VsdDtcbiAgICBpZiAoYXBwcy5sZW5ndGggPiAxKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwoXG4gICAgICAgIGFwcHMubWFwKGZ1bmN0aW9uIChpZCkge1xuICAgICAgICAgIGNvbnN0IGFwcCA9IG5ldyBJbmRpdmlkdWFsTW9kZWwoaWQpO1xuICAgICAgICAgIGNvbnN0IGNoZWNrZWQgPSBpZCA9PT0gdmVkYS5hcHBvaW50bWVudC5pZDtcbiAgICAgICAgICByZXR1cm4gYXBwLmdldFByb3BlcnR5Q2hhaW4oJ3YtczpvY2N1cGF0aW9uJywgJ3JkZnM6bGFiZWwnKS50aGVuKGZ1bmN0aW9uIChsYWJlbCkge1xuICAgICAgICAgICAgbGFiZWwgPSBsYWJlbC5tYXAoQ29tbW9uVXRpbC5mb3JtYXRWYWx1ZSkuam9pbignICcpO1xuICAgICAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwicmFkaW9cIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBuYW1lPVwiYXBwb2ludG1lbnRzXCIgdmFsdWU9XCIke2lkfVwiICR7Y2hlY2tlZCA/ICdjaGVja2VkJyA6ICcnfT5cbiAgICAgICAgICAgICAgICAgICAgICAke2xhYmVsfVxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+YDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSksXG4gICAgICApLnRoZW4oZnVuY3Rpb24gKHJhZGlvcykge1xuICAgICAgICBjb25zdCBmb3JtID0gJCgnI2FwcG9pbnRtZW50cy1mb3JtJywgdGVtcGxhdGUpO1xuICAgICAgICBmb3JtLmFwcGVuZChyYWRpb3MpO1xuICAgICAgICBmb3JtLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSAkKFwiaW5wdXRbbmFtZT0nYXBwb2ludG1lbnRzJ106Y2hlY2tlZFwiKS52YWwoKTtcbiAgICAgICAgICBpbmRpdmlkdWFsWyd2LXM6ZGVmYXVsdEFwcG9pbnRtZW50J10gPSBuZXcgSW5kaXZpZHVhbE1vZGVsKHNlbGVjdGVkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRlbXBsYXRlLm1vZGFsKCk7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGVtcGxhdGUucmVtb3ZlKCk7XG4gICAgICBjb250YWluZXIucmVtb3ZlKCk7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBodG1sID0gYFxuICA8ZGl2IGNsYXNzPVwibW9kYWwgc3dpdGNoLWFwcG9pbnRtZW50XCIgdGFiaW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIj5cbiAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZGlhbG9nXCIgcm9sZT1cImRvY3VtZW50XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyXCI+XG4gICAgICAgICAgPGg0IGNsYXNzPVwibW9kYWwtdGl0bGVcIiBhYm91dD1cInYtdWk6QXBwb2ludG1lbnRTd2l0Y2hJbmZvXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9oND5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XG4gICAgICAgICAgPGZvcm0gaWQ9XCJhcHBvaW50bWVudHMtZm9ybVwiPjwvZm9ybT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj5cbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBwdWxsLWxlZnRcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPk9rPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuYDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7TUFBT0EsVUFBVSxHQUFBQyxlQUFBLENBQUFDLE9BQUE7SUFBQSxhQUFBQyxPQUFBO01BQ1ZDLENBQUMsR0FBQUQsT0FBQSxDQUFBRCxPQUFBO0lBQUEsYUFBQUcsZUFBQTtNQUNEQyxJQUFJLEdBQUFELGVBQUEsQ0FBQUgsT0FBQTtJQUFBLGFBQUFLLGtCQUFBO01BQ0pDLE9BQU8sR0FBQUQsa0JBQUEsQ0FBQUwsT0FBQTtJQUFBLGFBQUFPLDJCQUFBO01BQ1BDLGVBQWUsR0FBQUQsMkJBQUEsQ0FBQVAsT0FBQTtJQUFBO0lBQUFTLE9BQUEsV0FBQUEsQ0FBQTtNQUFBQyxPQUFBLFNBRVRDLElBQUksR0FBRyxTQUFQQSxJQUFJQSxDQUFhQyxVQUFVLEVBQUVDLFFBQVEsRUFBRUMsU0FBUyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRTtRQUMxRUgsUUFBUSxHQUFHWCxDQUFDLENBQUNXLFFBQVEsQ0FBQztRQUN0QkMsU0FBUyxHQUFHWixDQUFDLENBQUNZLFNBQVMsQ0FBQztRQUV4QixPQUFPUixPQUFPLENBQUNXLEtBQUssQ0FBQztVQUNuQkMsTUFBTSxFQUFFZCxJQUFJLENBQUNjLE1BQU07VUFDbkJELEtBQUssRUFBRSw4RUFBOEUsR0FBR0wsVUFBVSxDQUFDTyxFQUFFLEdBQUc7UUFDMUcsQ0FBQyxDQUFDLENBQUNDLElBQUksQ0FBQyxVQUFVQyxNQUFNLEVBQUU7VUFDeEIsSUFBTUMsSUFBSSxHQUFHRCxNQUFNLENBQUNBLE1BQU07VUFDMUIsSUFBSUMsSUFBSSxDQUFDQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ25CLE9BQU9DLE9BQU8sQ0FBQ0MsR0FBRyxDQUNoQkgsSUFBSSxDQUFDSSxHQUFHLENBQUMsVUFBVVAsRUFBRSxFQUFFO2NBQ3JCLElBQU1RLEdBQUcsR0FBRyxJQUFJbkIsZUFBZSxDQUFDVyxFQUFFLENBQUM7Y0FDbkMsSUFBTVMsT0FBTyxHQUFHVCxFQUFFLEtBQUtmLElBQUksQ0FBQ3lCLFdBQVcsQ0FBQ1YsRUFBRTtjQUMxQyxPQUFPUSxHQUFHLENBQUNHLGdCQUFnQixDQUFDLGdCQUFnQixFQUFFLFlBQVksQ0FBQyxDQUFDVixJQUFJLENBQUMsVUFBVVcsS0FBSyxFQUFFO2dCQUNoRkEsS0FBSyxHQUFHQSxLQUFLLENBQUNMLEdBQUcsQ0FBQzVCLFVBQVUsQ0FBQ2tDLFdBQVcsQ0FBQyxDQUFDQyxJQUFJLENBQUMsR0FBRyxDQUFDO2dCQUNuRCx3SUFBQUMsTUFBQSxDQUUyRGYsRUFBRSxTQUFBZSxNQUFBLENBQUtOLE9BQU8sR0FBRyxTQUFTLEdBQUcsRUFBRSwrQkFBQU0sTUFBQSxDQUM5RUgsS0FBSztjQUduQixDQUFDLENBQUM7WUFDSixDQUFDLENBQUMsQ0FDSCxDQUFDWCxJQUFJLENBQUMsVUFBVWUsTUFBTSxFQUFFO2NBQ3ZCLElBQU1DLElBQUksR0FBR2xDLENBQUMsQ0FBQyxvQkFBb0IsRUFBRVcsUUFBUSxDQUFDO2NBQzlDdUIsSUFBSSxDQUFDQyxNQUFNLENBQUNGLE1BQU0sQ0FBQztjQUNuQkMsSUFBSSxDQUFDRSxFQUFFLENBQUMsUUFBUSxFQUFFLFlBQVk7Z0JBQzVCLElBQU1DLFFBQVEsR0FBR3JDLENBQUMsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDc0MsR0FBRyxFQUFFO2dCQUM5RDVCLFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLElBQUlKLGVBQWUsQ0FBQytCLFFBQVEsQ0FBQztjQUN0RSxDQUFDLENBQUM7Y0FDRkUsVUFBVSxDQUFDLFlBQVk7Z0JBQ3JCNUIsUUFBUSxDQUFDNkIsS0FBSyxFQUFFO2NBQ2xCLENBQUMsRUFBRSxHQUFHLENBQUM7WUFDVCxDQUFDLENBQUM7VUFDSixDQUFDLE1BQU07WUFDTDdCLFFBQVEsQ0FBQzhCLE1BQU0sRUFBRTtZQUNqQjdCLFNBQVMsQ0FBQzZCLE1BQU0sRUFBRTtVQUNwQjtRQUNGLENBQUMsQ0FBQztNQUNKLENBQUM7TUFBQWpDLE9BQUEsU0FFWWtDLElBQUk7SUFBQTtFQUFBO0FBQUEifQ==