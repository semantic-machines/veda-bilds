"use strict";

System.register(["jquery", "/js/common/individual_model.js", "/js/browser/notify.js"], function (_export, _context) {
  "use strict";

  var $, IndividualModel, notify, post, html;
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_jsCommonIndividual_modelJs) {
      IndividualModel = _jsCommonIndividual_modelJs.default;
    }, function (_jsBrowserNotifyJs) {
      notify = _jsBrowserNotifyJs.default;
    }],
    execute: function () {
      _export("post", post = function post(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        var startFormContainer = $('.groupStartForm', template);
        startFormContainer.empty();
        var startForm = new IndividualModel();
        startForm['rdf:type'] = [new IndividualModel('v-df:TaskRouteStartForm')];
        startForm['v-wf:forNet'] = [new IndividualModel('s-wf:WrapUniversalNet')];
        startForm['v-wf:useTransformation'] = [new IndividualModel('v-df:TaskRouteStartFormToNet')];
        startForm['v-wf:StartForm_setStatus'] = [true];
        startForm['v-wf:StartForm_canEdit'] = [false];
        return startForm.present(startFormContainer, 'v-df:TaskRouteStartFormTemplate', 'edit').then(function (startFormTemplate) {
          $('.action#send', startFormTemplate).off('click').click(function () {
            var savingPromises = individual['v-s:data'].map(function (doc) {
              startForm.clone().then(function (clonedStartForm) {
                clonedStartForm['v-wf:hasStatusWorkflow'] = [new IndividualModel('v-wf:ToBeSent')];
                clonedStartForm['v-wf:processedDocument'] = [doc];
                return clonedStartForm.save();
              });
            });
            return Promise.all(savingPromises).then(function () {
              var successMsg = new IndividualModel('v-s:SuccessBundle').load();
              return successMsg.then(function (successMsg) {
                notify('success', {
                  name: successMsg
                });
              });
            }).catch(function (error) {
              var errorMsg = new IndividualModel('v-s:ErrorBundle').load();
              return errorMsg.then(function (errorMsg) {
                notify('danger', {
                  name: errorMsg
                });
              });
            }).then(function () {
              startFormContainer.closest('.modal').modal('hide');
              var documentsSearch = new IndividualModel('v-s:DocumentsSearch');
              documentsSearch.clearValue('v-fs:selected');
            });
          });
        });
      });
      _export("html", html = "\n  <div class=\"container sheet\">\n    <div class=\"groupStartForm\"></div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfanNDb21tb25JbmRpdmlkdWFsX21vZGVsSnMiLCJJbmRpdmlkdWFsTW9kZWwiLCJfanNCcm93c2VyTm90aWZ5SnMiLCJub3RpZnkiLCJleGVjdXRlIiwiX2V4cG9ydCIsInBvc3QiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJzdGFydEZvcm1Db250YWluZXIiLCJlbXB0eSIsInN0YXJ0Rm9ybSIsInByZXNlbnQiLCJ0aGVuIiwic3RhcnRGb3JtVGVtcGxhdGUiLCJvZmYiLCJjbGljayIsInNhdmluZ1Byb21pc2VzIiwibWFwIiwiZG9jIiwiY2xvbmUiLCJjbG9uZWRTdGFydEZvcm0iLCJzYXZlIiwiUHJvbWlzZSIsImFsbCIsInN1Y2Nlc3NNc2ciLCJsb2FkIiwibmFtZSIsImNhdGNoIiwiZXJyb3IiLCJlcnJvck1zZyIsImNsb3Nlc3QiLCJtb2RhbCIsImRvY3VtZW50c1NlYXJjaCIsImNsZWFyVmFsdWUiLCJodG1sIl0sInNvdXJjZXMiOlsiLi4vLi4vb250b2xvZ3kvZ2VuZXJpYy1mdW5jdGlvbi90ZW1wbGF0ZXMvdi1mdF9TZW5kVG9JbnRyb2R1Y3Rpb25PcGVyYXRpb25UZW1wbGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IEluZGl2aWR1YWxNb2RlbCBmcm9tICcvanMvY29tbW9uL2luZGl2aWR1YWxfbW9kZWwuanMnO1xuaW1wb3J0IG5vdGlmeSBmcm9tICcvanMvYnJvd3Nlci9ub3RpZnkuanMnO1xuXG5leHBvcnQgY29uc3QgcG9zdCA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgY29uc3Qgc3RhcnRGb3JtQ29udGFpbmVyID0gJCgnLmdyb3VwU3RhcnRGb3JtJywgdGVtcGxhdGUpO1xuICBzdGFydEZvcm1Db250YWluZXIuZW1wdHkoKTtcblxuICBjb25zdCBzdGFydEZvcm0gPSBuZXcgSW5kaXZpZHVhbE1vZGVsKCk7XG4gIHN0YXJ0Rm9ybVsncmRmOnR5cGUnXSA9IFtuZXcgSW5kaXZpZHVhbE1vZGVsKCd2LWRmOlRhc2tSb3V0ZVN0YXJ0Rm9ybScpXTtcbiAgc3RhcnRGb3JtWyd2LXdmOmZvck5ldCddID0gW25ldyBJbmRpdmlkdWFsTW9kZWwoJ3Mtd2Y6V3JhcFVuaXZlcnNhbE5ldCcpXTtcbiAgc3RhcnRGb3JtWyd2LXdmOnVzZVRyYW5zZm9ybWF0aW9uJ10gPSBbbmV3IEluZGl2aWR1YWxNb2RlbCgndi1kZjpUYXNrUm91dGVTdGFydEZvcm1Ub05ldCcpXTtcbiAgc3RhcnRGb3JtWyd2LXdmOlN0YXJ0Rm9ybV9zZXRTdGF0dXMnXSA9IFt0cnVlXTtcbiAgc3RhcnRGb3JtWyd2LXdmOlN0YXJ0Rm9ybV9jYW5FZGl0J10gPSBbZmFsc2VdO1xuICByZXR1cm4gc3RhcnRGb3JtLnByZXNlbnQoc3RhcnRGb3JtQ29udGFpbmVyLCAndi1kZjpUYXNrUm91dGVTdGFydEZvcm1UZW1wbGF0ZScsICdlZGl0JykudGhlbihmdW5jdGlvbiAoc3RhcnRGb3JtVGVtcGxhdGUpIHtcbiAgICAkKCcuYWN0aW9uI3NlbmQnLCBzdGFydEZvcm1UZW1wbGF0ZSlcbiAgICAgIC5vZmYoJ2NsaWNrJylcbiAgICAgIC5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IHNhdmluZ1Byb21pc2VzID0gaW5kaXZpZHVhbFsndi1zOmRhdGEnXS5tYXAoZnVuY3Rpb24gKGRvYykge1xuICAgICAgICAgIHN0YXJ0Rm9ybS5jbG9uZSgpLnRoZW4oZnVuY3Rpb24gKGNsb25lZFN0YXJ0Rm9ybSkge1xuICAgICAgICAgICAgY2xvbmVkU3RhcnRGb3JtWyd2LXdmOmhhc1N0YXR1c1dvcmtmbG93J10gPSBbbmV3IEluZGl2aWR1YWxNb2RlbCgndi13ZjpUb0JlU2VudCcpXTtcbiAgICAgICAgICAgIGNsb25lZFN0YXJ0Rm9ybVsndi13Zjpwcm9jZXNzZWREb2N1bWVudCddID0gW2RvY107XG4gICAgICAgICAgICByZXR1cm4gY2xvbmVkU3RhcnRGb3JtLnNhdmUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChzYXZpbmdQcm9taXNlcylcbiAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zdCBzdWNjZXNzTXNnID0gbmV3IEluZGl2aWR1YWxNb2RlbCgndi1zOlN1Y2Nlc3NCdW5kbGUnKS5sb2FkKCk7XG4gICAgICAgICAgICByZXR1cm4gc3VjY2Vzc01zZy50aGVuKGZ1bmN0aW9uIChzdWNjZXNzTXNnKSB7XG4gICAgICAgICAgICAgIG5vdGlmeSgnc3VjY2VzcycsIHtuYW1lOiBzdWNjZXNzTXNnfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yTXNnID0gbmV3IEluZGl2aWR1YWxNb2RlbCgndi1zOkVycm9yQnVuZGxlJykubG9hZCgpO1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yTXNnLnRoZW4oZnVuY3Rpb24gKGVycm9yTXNnKSB7XG4gICAgICAgICAgICAgIG5vdGlmeSgnZGFuZ2VyJywge25hbWU6IGVycm9yTXNnfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0YXJ0Rm9ybUNvbnRhaW5lci5jbG9zZXN0KCcubW9kYWwnKS5tb2RhbCgnaGlkZScpO1xuICAgICAgICAgICAgY29uc3QgZG9jdW1lbnRzU2VhcmNoID0gbmV3IEluZGl2aWR1YWxNb2RlbCgndi1zOkRvY3VtZW50c1NlYXJjaCcpO1xuICAgICAgICAgICAgZG9jdW1lbnRzU2VhcmNoLmNsZWFyVmFsdWUoJ3YtZnM6c2VsZWN0ZWQnKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBodG1sID0gYFxuICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyIHNoZWV0XCI+XG4gICAgPGRpdiBjbGFzcz1cImdyb3VwU3RhcnRGb3JtXCI+PC9kaXY+XG4gIDwvZGl2PlxuYDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7TUFBT0EsQ0FBQyxHQUFBQyxPQUFBLENBQUFDLE9BQUE7SUFBQSxhQUFBQywyQkFBQTtNQUNEQyxlQUFlLEdBQUFELDJCQUFBLENBQUFELE9BQUE7SUFBQSxhQUFBRyxrQkFBQTtNQUNmQyxNQUFNLEdBQUFELGtCQUFBLENBQUFILE9BQUE7SUFBQTtJQUFBSyxPQUFBLFdBQUFBLENBQUE7TUFBQUMsT0FBQSxTQUVBQyxJQUFJLEdBQUcsU0FBUEEsSUFBSUEsQ0FBYUMsVUFBVSxFQUFFQyxRQUFRLEVBQUVDLFNBQVMsRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUU7UUFDMUVILFFBQVEsR0FBR1gsQ0FBQyxDQUFDVyxRQUFRLENBQUM7UUFDdEJDLFNBQVMsR0FBR1osQ0FBQyxDQUFDWSxTQUFTLENBQUM7UUFFeEIsSUFBTUcsa0JBQWtCLEdBQUdmLENBQUMsQ0FBQyxpQkFBaUIsRUFBRVcsUUFBUSxDQUFDO1FBQ3pESSxrQkFBa0IsQ0FBQ0MsS0FBSyxFQUFFO1FBRTFCLElBQU1DLFNBQVMsR0FBRyxJQUFJYixlQUFlLEVBQUU7UUFDdkNhLFNBQVMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUliLGVBQWUsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQ3hFYSxTQUFTLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJYixlQUFlLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUN6RWEsU0FBUyxDQUFDLHdCQUF3QixDQUFDLEdBQUcsQ0FBQyxJQUFJYixlQUFlLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUMzRmEsU0FBUyxDQUFDLDBCQUEwQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDOUNBLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQzdDLE9BQU9BLFNBQVMsQ0FBQ0MsT0FBTyxDQUFDSCxrQkFBa0IsRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLENBQUMsQ0FBQ0ksSUFBSSxDQUFDLFVBQVVDLGlCQUFpQixFQUFFO1VBQ3hIcEIsQ0FBQyxDQUFDLGNBQWMsRUFBRW9CLGlCQUFpQixDQUFDLENBQ2pDQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQ1pDLEtBQUssQ0FBQyxZQUFZO1lBQ2pCLElBQU1DLGNBQWMsR0FBR2IsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDYyxHQUFHLENBQUMsVUFBVUMsR0FBRyxFQUFFO2NBQy9EUixTQUFTLENBQUNTLEtBQUssRUFBRSxDQUFDUCxJQUFJLENBQUMsVUFBVVEsZUFBZSxFQUFFO2dCQUNoREEsZUFBZSxDQUFDLHdCQUF3QixDQUFDLEdBQUcsQ0FBQyxJQUFJdkIsZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUNsRnVCLGVBQWUsQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLENBQUNGLEdBQUcsQ0FBQztnQkFDakQsT0FBT0UsZUFBZSxDQUFDQyxJQUFJLEVBQUU7Y0FDL0IsQ0FBQyxDQUFDO1lBQ0osQ0FBQyxDQUFDO1lBQ0YsT0FBT0MsT0FBTyxDQUFDQyxHQUFHLENBQUNQLGNBQWMsQ0FBQyxDQUMvQkosSUFBSSxDQUFDLFlBQVk7Y0FDaEIsSUFBTVksVUFBVSxHQUFHLElBQUkzQixlQUFlLENBQUMsbUJBQW1CLENBQUMsQ0FBQzRCLElBQUksRUFBRTtjQUNsRSxPQUFPRCxVQUFVLENBQUNaLElBQUksQ0FBQyxVQUFVWSxVQUFVLEVBQUU7Z0JBQzNDekIsTUFBTSxDQUFDLFNBQVMsRUFBRTtrQkFBQzJCLElBQUksRUFBRUY7Z0JBQVUsQ0FBQyxDQUFDO2NBQ3ZDLENBQUMsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUNERyxLQUFLLENBQUMsVUFBVUMsS0FBSyxFQUFFO2NBQ3RCLElBQU1DLFFBQVEsR0FBRyxJQUFJaEMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLENBQUM0QixJQUFJLEVBQUU7Y0FDOUQsT0FBT0ksUUFBUSxDQUFDakIsSUFBSSxDQUFDLFVBQVVpQixRQUFRLEVBQUU7Z0JBQ3ZDOUIsTUFBTSxDQUFDLFFBQVEsRUFBRTtrQkFBQzJCLElBQUksRUFBRUc7Z0JBQVEsQ0FBQyxDQUFDO2NBQ3BDLENBQUMsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUNEakIsSUFBSSxDQUFDLFlBQVk7Y0FDaEJKLGtCQUFrQixDQUFDc0IsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDQyxLQUFLLENBQUMsTUFBTSxDQUFDO2NBQ2xELElBQU1DLGVBQWUsR0FBRyxJQUFJbkMsZUFBZSxDQUFDLHFCQUFxQixDQUFDO2NBQ2xFbUMsZUFBZSxDQUFDQyxVQUFVLENBQUMsZUFBZSxDQUFDO1lBQzdDLENBQUMsQ0FBQztVQUNOLENBQUMsQ0FBQztRQUNOLENBQUMsQ0FBQztNQUNKLENBQUM7TUFBQWhDLE9BQUEsU0FFWWlDLElBQUk7SUFBQTtFQUFBO0FBQUEifQ==