"use strict";

System.register(["jquery", "/js/common/veda.js", "/js/browser/notify.js", "/js/common/individual_model.js"], function (_export, _context) {
  "use strict";

  var $, veda, notify, IndividualModel, pre, html;
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_jsCommonVedaJs) {
      veda = _jsCommonVedaJs.default;
    }, function (_jsBrowserNotifyJs) {
      notify = _jsBrowserNotifyJs.default;
    }, function (_jsCommonIndividual_modelJs) {
      IndividualModel = _jsCommonIndividual_modelJs.default;
    }],
    execute: function () {
      _export("pre", pre = function pre(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        if (!individual.hasValue('v-s:creator', veda.appointment || veda.user)) {
          $('.action.save-report', template).click(function () {
            var enterLabel = new IndividualModel('v-s:EnterLabel');
            enterLabel.load().then(function (enterLabel) {
              var personalLabel = prompt(enterLabel.toString(), individual.toString());
              if (!personalLabel) {
                return;
              }
              individual.clone().then(function (personalReport) {
                personalReport['rdf:type'] = [new IndividualModel('v-s:PersonalReport')];
                personalReport['v-s:creator'] = [];
                personalReport['v-s:created'] = [];
                personalReport['rdfs:isDefinedBy'] = [];
                personalReport['rdfs:label'] = [personalLabel];
                var reportBlank = individual.hasValue('v-s:reportBlank') ? individual['v-s:reportBlank'][0] : undefined;
                if (reportBlank && reportBlank.object) {
                  return reportBlank.clone().then(function (personalReportBlank) {
                    personalReportBlank.object = reportBlank.object;
                    return personalReportBlank.updateBlank();
                  }).then(function (personalReportBlank) {
                    personalReport['v-s:reportBlank'] = [personalReportBlank];
                    return personalReport.save();
                  });
                } else {
                  return personalReport.save();
                }
              }).then(function (personalReport) {
                veda.user.aspect.load().then(function (aspect) {
                  aspect.addValue('v-s:hasReport', personalReport);
                  return aspect.save();
                });
              }).then(function () {
                return new IndividualModel('v-s:ReportSuccessfullySaved').load();
              }).then(function (message) {
                notify('success', {
                  message: message
                });
              }).catch(function (error) {
                notify('danger', {
                  message: error
                });
              });
            });
          });
        } else {
          $('.action.save-report', template).remove();
        }
        individual.rights.then(function (rights) {
          if (rights.hasValue('v-s:canUpdate', true)) {
            $('.action.update-report', template).click(function () {
              var reportBlank = individual.hasValue('v-s:reportBlank') ? individual['v-s:reportBlank'][0] : undefined;
              if (reportBlank && reportBlank.object) {
                reportBlank.updateBlank().then(function () {
                  return new IndividualModel('v-s:ReportSuccessfullyUpdated').load();
                }).then(function (message) {
                  notify('success', {
                    message: message
                  });
                }).catch(function (error) {
                  notify('danger', {
                    message: error
                  });
                });
              }
            });
          } else {
            $('.action.update-report', template).remove();
          }
          if (rights.hasValue('v-s:canDelete', true)) {
            $('.action.delete-report', template).click(function () {
              veda.user.aspect.load().then(function (aspect) {
                aspect.removeValue('v-s:hasReport', individual);
                return aspect.save();
              }).then(function () {
                return individual.delete();
              }).then(function () {
                return new IndividualModel('v-s:ReportSuccessfullyDeleted').load();
              }).then(function (message) {
                return notify('success', {
                  message: message
                });
              }).catch(function (error) {
                notify('danger', {
                  message: error
                });
              });
            });
          } else {
            $('.action.delete-report', template).remove();
          }
        });
      });
      _export("html", html = "\n  <div>\n    <div class=\"container sheet\">\n      <div class=\"ribbon-wrapper top-left\">\n        <div class=\"ribbon top-left warning\" about=\"v-s:Report\" property=\"rdfs:label\"></div>\n      </div>\n      <div class=\"actions text-right\">\n        <button class=\"action save-report btn btn-warning\" about=\"v-s:SavePersonalReport\" property=\"rdfs:label\"></button>\n        <button class=\"action update-report btn btn-warning\" about=\"v-s:UpdatePersonalReport\" property=\"rdfs:label\"></button>\n        <button class=\"action delete-report btn btn-link\" about=\"v-s:Delete\" property=\"rdfs:label\"></button>\n      </div>\n    </div>\n    <div class=\"margin-lg\" about=\"@\" data-template=\"v-s:ReportTemplate\"></div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfanNDb21tb25WZWRhSnMiLCJ2ZWRhIiwiX2pzQnJvd3Nlck5vdGlmeUpzIiwibm90aWZ5IiwiX2pzQ29tbW9uSW5kaXZpZHVhbF9tb2RlbEpzIiwiSW5kaXZpZHVhbE1vZGVsIiwiZXhlY3V0ZSIsIl9leHBvcnQiLCJwcmUiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJoYXNWYWx1ZSIsImFwcG9pbnRtZW50IiwidXNlciIsImNsaWNrIiwiZW50ZXJMYWJlbCIsImxvYWQiLCJ0aGVuIiwicGVyc29uYWxMYWJlbCIsInByb21wdCIsInRvU3RyaW5nIiwiY2xvbmUiLCJwZXJzb25hbFJlcG9ydCIsInJlcG9ydEJsYW5rIiwidW5kZWZpbmVkIiwib2JqZWN0IiwicGVyc29uYWxSZXBvcnRCbGFuayIsInVwZGF0ZUJsYW5rIiwic2F2ZSIsImFzcGVjdCIsImFkZFZhbHVlIiwibWVzc2FnZSIsImNhdGNoIiwiZXJyb3IiLCJyZW1vdmUiLCJyaWdodHMiLCJyZW1vdmVWYWx1ZSIsImRlbGV0ZSIsImh0bWwiXSwic291cmNlcyI6WyIuLi8uLi9vbnRvbG9neS9nZW5lcmljLWZ1bmN0aW9uL3RlbXBsYXRlcy92LXNfUmVwb3J0TWFuYWdlbWVudFRlbXBsYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgdmVkYSBmcm9tICcvanMvY29tbW9uL3ZlZGEuanMnO1xuaW1wb3J0IG5vdGlmeSBmcm9tICcvanMvYnJvd3Nlci9ub3RpZnkuanMnO1xuaW1wb3J0IEluZGl2aWR1YWxNb2RlbCBmcm9tICcvanMvY29tbW9uL2luZGl2aWR1YWxfbW9kZWwuanMnO1xuXG5leHBvcnQgY29uc3QgcHJlID0gZnVuY3Rpb24gKGluZGl2aWR1YWwsIHRlbXBsYXRlLCBjb250YWluZXIsIG1vZGUsIGV4dHJhKSB7XG4gIHRlbXBsYXRlID0gJCh0ZW1wbGF0ZSk7XG4gIGNvbnRhaW5lciA9ICQoY29udGFpbmVyKTtcblxuICBpZiAoIWluZGl2aWR1YWwuaGFzVmFsdWUoJ3YtczpjcmVhdG9yJywgdmVkYS5hcHBvaW50bWVudCB8fCB2ZWRhLnVzZXIpKSB7XG4gICAgJCgnLmFjdGlvbi5zYXZlLXJlcG9ydCcsIHRlbXBsYXRlKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBlbnRlckxhYmVsID0gbmV3IEluZGl2aWR1YWxNb2RlbCgndi1zOkVudGVyTGFiZWwnKTtcbiAgICAgIGVudGVyTGFiZWwubG9hZCgpLnRoZW4oZnVuY3Rpb24gKGVudGVyTGFiZWwpIHtcbiAgICAgICAgY29uc3QgcGVyc29uYWxMYWJlbCA9IHByb21wdChlbnRlckxhYmVsLnRvU3RyaW5nKCksIGluZGl2aWR1YWwudG9TdHJpbmcoKSk7XG4gICAgICAgIGlmICghcGVyc29uYWxMYWJlbCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpbmRpdmlkdWFsXG4gICAgICAgICAgLmNsb25lKClcbiAgICAgICAgICAudGhlbihmdW5jdGlvbiAocGVyc29uYWxSZXBvcnQpIHtcbiAgICAgICAgICAgIHBlcnNvbmFsUmVwb3J0WydyZGY6dHlwZSddID0gW25ldyBJbmRpdmlkdWFsTW9kZWwoJ3YtczpQZXJzb25hbFJlcG9ydCcpXTtcbiAgICAgICAgICAgIHBlcnNvbmFsUmVwb3J0Wyd2LXM6Y3JlYXRvciddID0gW107XG4gICAgICAgICAgICBwZXJzb25hbFJlcG9ydFsndi1zOmNyZWF0ZWQnXSA9IFtdO1xuICAgICAgICAgICAgcGVyc29uYWxSZXBvcnRbJ3JkZnM6aXNEZWZpbmVkQnknXSA9IFtdO1xuICAgICAgICAgICAgcGVyc29uYWxSZXBvcnRbJ3JkZnM6bGFiZWwnXSA9IFtwZXJzb25hbExhYmVsXTtcbiAgICAgICAgICAgIGNvbnN0IHJlcG9ydEJsYW5rID0gaW5kaXZpZHVhbC5oYXNWYWx1ZSgndi1zOnJlcG9ydEJsYW5rJykgPyBpbmRpdmlkdWFsWyd2LXM6cmVwb3J0QmxhbmsnXVswXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmIChyZXBvcnRCbGFuayAmJiByZXBvcnRCbGFuay5vYmplY3QpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlcG9ydEJsYW5rXG4gICAgICAgICAgICAgICAgLmNsb25lKClcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocGVyc29uYWxSZXBvcnRCbGFuaykge1xuICAgICAgICAgICAgICAgICAgcGVyc29uYWxSZXBvcnRCbGFuay5vYmplY3QgPSByZXBvcnRCbGFuay5vYmplY3Q7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gcGVyc29uYWxSZXBvcnRCbGFuay51cGRhdGVCbGFuaygpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHBlcnNvbmFsUmVwb3J0QmxhbmspIHtcbiAgICAgICAgICAgICAgICAgIHBlcnNvbmFsUmVwb3J0Wyd2LXM6cmVwb3J0QmxhbmsnXSA9IFtwZXJzb25hbFJlcG9ydEJsYW5rXTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBwZXJzb25hbFJlcG9ydC5zYXZlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gcGVyc29uYWxSZXBvcnQuc2F2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHBlcnNvbmFsUmVwb3J0KSB7XG4gICAgICAgICAgICB2ZWRhLnVzZXIuYXNwZWN0LmxvYWQoKS50aGVuKGZ1bmN0aW9uIChhc3BlY3QpIHtcbiAgICAgICAgICAgICAgYXNwZWN0LmFkZFZhbHVlKCd2LXM6aGFzUmVwb3J0JywgcGVyc29uYWxSZXBvcnQpO1xuICAgICAgICAgICAgICByZXR1cm4gYXNwZWN0LnNhdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbmRpdmlkdWFsTW9kZWwoJ3YtczpSZXBvcnRTdWNjZXNzZnVsbHlTYXZlZCcpLmxvYWQoKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICAgICAgICBub3RpZnkoJ3N1Y2Nlc3MnLCB7bWVzc2FnZTogbWVzc2FnZX0pO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgbm90aWZ5KCdkYW5nZXInLCB7bWVzc2FnZTogZXJyb3J9KTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgICQoJy5hY3Rpb24uc2F2ZS1yZXBvcnQnLCB0ZW1wbGF0ZSkucmVtb3ZlKCk7XG4gIH1cblxuICBpbmRpdmlkdWFsLnJpZ2h0cy50aGVuKGZ1bmN0aW9uIChyaWdodHMpIHtcbiAgICBpZiAocmlnaHRzLmhhc1ZhbHVlKCd2LXM6Y2FuVXBkYXRlJywgdHJ1ZSkpIHtcbiAgICAgICQoJy5hY3Rpb24udXBkYXRlLXJlcG9ydCcsIHRlbXBsYXRlKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IHJlcG9ydEJsYW5rID0gaW5kaXZpZHVhbC5oYXNWYWx1ZSgndi1zOnJlcG9ydEJsYW5rJykgPyBpbmRpdmlkdWFsWyd2LXM6cmVwb3J0QmxhbmsnXVswXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKHJlcG9ydEJsYW5rICYmIHJlcG9ydEJsYW5rLm9iamVjdCkge1xuICAgICAgICAgIHJlcG9ydEJsYW5rXG4gICAgICAgICAgICAudXBkYXRlQmxhbmsoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICByZXR1cm4gbmV3IEluZGl2aWR1YWxNb2RlbCgndi1zOlJlcG9ydFN1Y2Nlc3NmdWxseVVwZGF0ZWQnKS5sb2FkKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgbm90aWZ5KCdzdWNjZXNzJywge21lc3NhZ2U6IG1lc3NhZ2V9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgIG5vdGlmeSgnZGFuZ2VyJywge21lc3NhZ2U6IGVycm9yfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoJy5hY3Rpb24udXBkYXRlLXJlcG9ydCcsIHRlbXBsYXRlKS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBpZiAocmlnaHRzLmhhc1ZhbHVlKCd2LXM6Y2FuRGVsZXRlJywgdHJ1ZSkpIHtcbiAgICAgICQoJy5hY3Rpb24uZGVsZXRlLXJlcG9ydCcsIHRlbXBsYXRlKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZlZGEudXNlci5hc3BlY3RcbiAgICAgICAgICAubG9hZCgpXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGFzcGVjdCkge1xuICAgICAgICAgICAgYXNwZWN0LnJlbW92ZVZhbHVlKCd2LXM6aGFzUmVwb3J0JywgaW5kaXZpZHVhbCk7XG4gICAgICAgICAgICByZXR1cm4gYXNwZWN0LnNhdmUoKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBpbmRpdmlkdWFsLmRlbGV0ZSgpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbmRpdmlkdWFsTW9kZWwoJ3YtczpSZXBvcnRTdWNjZXNzZnVsbHlEZWxldGVkJykubG9hZCgpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiBub3RpZnkoJ3N1Y2Nlc3MnLCB7bWVzc2FnZTogbWVzc2FnZX0pO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgbm90aWZ5KCdkYW5nZXInLCB7bWVzc2FnZTogZXJyb3J9KTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKCcuYWN0aW9uLmRlbGV0ZS1yZXBvcnQnLCB0ZW1wbGF0ZSkucmVtb3ZlKCk7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBodG1sID0gYFxuICA8ZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXIgc2hlZXRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJyaWJib24td3JhcHBlciB0b3AtbGVmdFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmliYm9uIHRvcC1sZWZ0IHdhcm5pbmdcIiBhYm91dD1cInYtczpSZXBvcnRcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImFjdGlvbnMgdGV4dC1yaWdodFwiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYWN0aW9uIHNhdmUtcmVwb3J0IGJ0biBidG4td2FybmluZ1wiIGFib3V0PVwidi1zOlNhdmVQZXJzb25hbFJlcG9ydFwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYWN0aW9uIHVwZGF0ZS1yZXBvcnQgYnRuIGJ0bi13YXJuaW5nXCIgYWJvdXQ9XCJ2LXM6VXBkYXRlUGVyc29uYWxSZXBvcnRcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImFjdGlvbiBkZWxldGUtcmVwb3J0IGJ0biBidG4tbGlua1wiIGFib3V0PVwidi1zOkRlbGV0ZVwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cIm1hcmdpbi1sZ1wiIGFib3V0PVwiQFwiIGRhdGEtdGVtcGxhdGU9XCJ2LXM6UmVwb3J0VGVtcGxhdGVcIj48L2Rpdj5cbiAgPC9kaXY+XG5gO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztNQUFPQSxDQUFDLEdBQUFDLE9BQUEsQ0FBQUMsT0FBQTtJQUFBLGFBQUFDLGVBQUE7TUFDREMsSUFBSSxHQUFBRCxlQUFBLENBQUFELE9BQUE7SUFBQSxhQUFBRyxrQkFBQTtNQUNKQyxNQUFNLEdBQUFELGtCQUFBLENBQUFILE9BQUE7SUFBQSxhQUFBSywyQkFBQTtNQUNOQyxlQUFlLEdBQUFELDJCQUFBLENBQUFMLE9BQUE7SUFBQTtJQUFBTyxPQUFBLFdBQUFBLENBQUE7TUFBQUMsT0FBQSxRQUVUQyxHQUFHLEdBQUcsU0FBTkEsR0FBR0EsQ0FBYUMsVUFBVSxFQUFFQyxRQUFRLEVBQUVDLFNBQVMsRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUU7UUFDekVILFFBQVEsR0FBR2IsQ0FBQyxDQUFDYSxRQUFRLENBQUM7UUFDdEJDLFNBQVMsR0FBR2QsQ0FBQyxDQUFDYyxTQUFTLENBQUM7UUFFeEIsSUFBSSxDQUFDRixVQUFVLENBQUNLLFFBQVEsQ0FBQyxhQUFhLEVBQUViLElBQUksQ0FBQ2MsV0FBVyxJQUFJZCxJQUFJLENBQUNlLElBQUksQ0FBQyxFQUFFO1VBQ3RFbkIsQ0FBQyxDQUFDLHFCQUFxQixFQUFFYSxRQUFRLENBQUMsQ0FBQ08sS0FBSyxDQUFDLFlBQVk7WUFDbkQsSUFBTUMsVUFBVSxHQUFHLElBQUliLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUN4RGEsVUFBVSxDQUFDQyxJQUFJLEVBQUUsQ0FBQ0MsSUFBSSxDQUFDLFVBQVVGLFVBQVUsRUFBRTtjQUMzQyxJQUFNRyxhQUFhLEdBQUdDLE1BQU0sQ0FBQ0osVUFBVSxDQUFDSyxRQUFRLEVBQUUsRUFB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