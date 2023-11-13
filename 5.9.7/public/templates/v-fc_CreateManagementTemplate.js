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
          $('.action.save-create', template).click(function () {
            var enterLabel = new IndividualModel('v-s:EnterLabel');
            enterLabel.load().then(function (enterLabel) {
              var personalLabel = prompt(enterLabel.toString(), individual.toString());
              if (!personalLabel) {
                return;
              }
              individual.clone().then(function (personalCreate) {
                personalCreate['rdf:type'] = [new IndividualModel('v-fc:PersonalCreate')];
                personalCreate['v-s:creator'] = [];
                personalCreate['v-s:created'] = [];
                personalCreate['rdfs:isDefinedBy'] = [];
                personalCreate['rdfs:label'] = [personalLabel];
                var createBlank = individual.hasValue('v-fc:hasBlank') ? individual['v-fc:hasBlank'][0] : undefined;
                if (createBlank && createBlank.object) {
                  return createBlank.clone().then(function (personalCreateBlank) {
                    personalCreateBlank.object = createBlank.object;
                    return personalCreateBlank.updateBlank();
                  }).then(function (personalCreateBlank) {
                    personalCreate['v-fc:hasBlank'] = [personalCreateBlank];
                    return personalCreate.save();
                  });
                } else {
                  return personalCreate.save();
                }
              }).then(function (personalCreate) {
                return veda.user.aspect.load().then(function (aspect) {
                  aspect.addValue('v-s:hasCreate', personalCreate);
                  return aspect.save();
                });
              }).then(function () {
                return new IndividualModel('v-fc:BlankSuccessfullySaved').load();
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
          $('.action.save-create', template).remove();
        }
        individual.rights.then(function (rights) {
          if (rights.hasValue('v-s:canUpdate', true)) {
            $('.action.update-create', template).click(function () {
              var createBlank = individual.hasValue('v-fc:hasBlank') ? individual['v-fc:hasBlank'][0] : undefined;
              if (createBlank && createBlank.object) {
                createBlank.updateBlank().then(function () {
                  return new IndividualModel('v-fc:BlankSuccessfullyUpdated').load();
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
            $('.action.update-create', template).remove();
          }
          if (rights.hasValue('v-s:canDelete', true)) {
            $('.action.delete-create', template).click(function () {
              veda.user.aspect.load().then(function (aspect) {
                aspect.removeValue('v-s:hasCreate', individual);
                return aspect.save();
              }).then(function () {
                return individual.delete();
              }).then(function () {
                return new IndividualModel('v-fc:BlankSuccessfullyDeleted').load();
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
          } else {
            $('.action.delete-create', template).remove();
          }
        });
      });
      _export("html", html = "\n  <div>\n    <div class=\"container sheet\">\n      <div class=\"ribbon-wrapper top-left\">\n        <div class=\"ribbon top-left success\" about=\"v-fc:CreateBundle\" property=\"rdfs:label\"></div>\n      </div>\n      <div class=\"actions text-right\">\n        <button class=\"action save-create btn btn-success\" about=\"v-fc:SavePersonalBlank\" property=\"rdfs:label\"></button>\n        <button class=\"action update-create btn btn-success\" about=\"v-fc:UpdatePersonalBlank\" property=\"rdfs:label\"></button>\n        <button class=\"action delete-create btn btn-link\" about=\"v-s:Delete\" property=\"rdfs:label\"></button>\n      </div>\n    </div>\n    <div about=\"@\" rel=\"v-fc:hasBlank\" data-template=\"v-fc:BlankTemplate\"></div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfanNDb21tb25WZWRhSnMiLCJ2ZWRhIiwiX2pzQnJvd3Nlck5vdGlmeUpzIiwibm90aWZ5IiwiX2pzQ29tbW9uSW5kaXZpZHVhbF9tb2RlbEpzIiwiSW5kaXZpZHVhbE1vZGVsIiwiZXhlY3V0ZSIsIl9leHBvcnQiLCJwcmUiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJoYXNWYWx1ZSIsImFwcG9pbnRtZW50IiwidXNlciIsImNsaWNrIiwiZW50ZXJMYWJlbCIsImxvYWQiLCJ0aGVuIiwicGVyc29uYWxMYWJlbCIsInByb21wdCIsInRvU3RyaW5nIiwiY2xvbmUiLCJwZXJzb25hbENyZWF0ZSIsImNyZWF0ZUJsYW5rIiwidW5kZWZpbmVkIiwib2JqZWN0IiwicGVyc29uYWxDcmVhdGVCbGFuayIsInVwZGF0ZUJsYW5rIiwic2F2ZSIsImFzcGVjdCIsImFkZFZhbHVlIiwibWVzc2FnZSIsImNhdGNoIiwiZXJyb3IiLCJyZW1vdmUiLCJyaWdodHMiLCJyZW1vdmVWYWx1ZSIsImRlbGV0ZSIsImh0bWwiXSwic291cmNlcyI6WyIuLi8uLi9vbnRvbG9neS9nZW5lcmljLWZ1bmN0aW9uL3RlbXBsYXRlcy92LWZjX0NyZWF0ZU1hbmFnZW1lbnRUZW1wbGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHZlZGEgZnJvbSAnL2pzL2NvbW1vbi92ZWRhLmpzJztcbmltcG9ydCBub3RpZnkgZnJvbSAnL2pzL2Jyb3dzZXIvbm90aWZ5LmpzJztcbmltcG9ydCBJbmRpdmlkdWFsTW9kZWwgZnJvbSAnL2pzL2NvbW1vbi9pbmRpdmlkdWFsX21vZGVsLmpzJztcblxuZXhwb3J0IGNvbnN0IHByZSA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgaWYgKCFpbmRpdmlkdWFsLmhhc1ZhbHVlKCd2LXM6Y3JlYXRvcicsIHZlZGEuYXBwb2ludG1lbnQgfHwgdmVkYS51c2VyKSkge1xuICAgICQoJy5hY3Rpb24uc2F2ZS1jcmVhdGUnLCB0ZW1wbGF0ZSkuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgZW50ZXJMYWJlbCA9IG5ldyBJbmRpdmlkdWFsTW9kZWwoJ3YtczpFbnRlckxhYmVsJyk7XG4gICAgICBlbnRlckxhYmVsLmxvYWQoKS50aGVuKGZ1bmN0aW9uIChlbnRlckxhYmVsKSB7XG4gICAgICAgIGNvbnN0IHBlcnNvbmFsTGFiZWwgPSBwcm9tcHQoZW50ZXJMYWJlbC50b1N0cmluZygpLCBpbmRpdmlkdWFsLnRvU3RyaW5nKCkpO1xuICAgICAgICBpZiAoIXBlcnNvbmFsTGFiZWwpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaW5kaXZpZHVhbFxuICAgICAgICAgIC5jbG9uZSgpXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHBlcnNvbmFsQ3JlYXRlKSB7XG4gICAgICAgICAgICBwZXJzb25hbENyZWF0ZVsncmRmOnR5cGUnXSA9IFtuZXcgSW5kaXZpZHVhbE1vZGVsKCd2LWZjOlBlcnNvbmFsQ3JlYXRlJyldO1xuICAgICAgICAgICAgcGVyc29uYWxDcmVhdGVbJ3YtczpjcmVhdG9yJ10gPSBbXTtcbiAgICAgICAgICAgIHBlcnNvbmFsQ3JlYXRlWyd2LXM6Y3JlYXRlZCddID0gW107XG4gICAgICAgICAgICBwZXJzb25hbENyZWF0ZVsncmRmczppc0RlZmluZWRCeSddID0gW107XG4gICAgICAgICAgICBwZXJzb25hbENyZWF0ZVsncmRmczpsYWJlbCddID0gW3BlcnNvbmFsTGFiZWxdO1xuICAgICAgICAgICAgY29uc3QgY3JlYXRlQmxhbmsgPSBpbmRpdmlkdWFsLmhhc1ZhbHVlKCd2LWZjOmhhc0JsYW5rJykgPyBpbmRpdmlkdWFsWyd2LWZjOmhhc0JsYW5rJ11bMF0gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAoY3JlYXRlQmxhbmsgJiYgY3JlYXRlQmxhbmsub2JqZWN0KSB7XG4gICAgICAgICAgICAgIHJldHVybiBjcmVhdGVCbGFua1xuICAgICAgICAgICAgICAgIC5jbG9uZSgpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHBlcnNvbmFsQ3JlYXRlQmxhbmspIHtcbiAgICAgICAgICAgICAgICAgIHBlcnNvbmFsQ3JlYXRlQmxhbmsub2JqZWN0ID0gY3JlYXRlQmxhbmsub2JqZWN0O1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHBlcnNvbmFsQ3JlYXRlQmxhbmsudXBkYXRlQmxhbmsoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChwZXJzb25hbENyZWF0ZUJsYW5rKSB7XG4gICAgICAgICAgICAgICAgICBwZXJzb25hbENyZWF0ZVsndi1mYzpoYXNCbGFuayddID0gW3BlcnNvbmFsQ3JlYXRlQmxhbmtdO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHBlcnNvbmFsQ3JlYXRlLnNhdmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiBwZXJzb25hbENyZWF0ZS5zYXZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAudGhlbihmdW5jdGlvbiAocGVyc29uYWxDcmVhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB2ZWRhLnVzZXIuYXNwZWN0LmxvYWQoKS50aGVuKGZ1bmN0aW9uIChhc3BlY3QpIHtcbiAgICAgICAgICAgICAgYXNwZWN0LmFkZFZhbHVlKCd2LXM6aGFzQ3JlYXRlJywgcGVyc29uYWxDcmVhdGUpO1xuICAgICAgICAgICAgICByZXR1cm4gYXNwZWN0LnNhdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbmRpdmlkdWFsTW9kZWwoJ3YtZmM6QmxhbmtTdWNjZXNzZnVsbHlTYXZlZCcpLmxvYWQoKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICAgICAgICBub3RpZnkoJ3N1Y2Nlc3MnLCB7bWVzc2FnZTogbWVzc2FnZX0pO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgbm90aWZ5KCdkYW5nZXInLCB7bWVzc2FnZTogZXJyb3J9KTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgICQoJy5hY3Rpb24uc2F2ZS1jcmVhdGUnLCB0ZW1wbGF0ZSkucmVtb3ZlKCk7XG4gIH1cblxuICBpbmRpdmlkdWFsLnJpZ2h0cy50aGVuKGZ1bmN0aW9uIChyaWdodHMpIHtcbiAgICBpZiAocmlnaHRzLmhhc1ZhbHVlKCd2LXM6Y2FuVXBkYXRlJywgdHJ1ZSkpIHtcbiAgICAgICQoJy5hY3Rpb24udXBkYXRlLWNyZWF0ZScsIHRlbXBsYXRlKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IGNyZWF0ZUJsYW5rID0gaW5kaXZpZHVhbC5oYXNWYWx1ZSgndi1mYzpoYXNCbGFuaycpID8gaW5kaXZpZHVhbFsndi1mYzpoYXNCbGFuayddWzBdIDogdW5kZWZpbmVkO1xuICAgICAgICBpZiAoY3JlYXRlQmxhbmsgJiYgY3JlYXRlQmxhbmsub2JqZWN0KSB7XG4gICAgICAgICAgY3JlYXRlQmxhbmtcbiAgICAgICAgICAgIC51cGRhdGVCbGFuaygpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJldHVybiBuZXcgSW5kaXZpZHVhbE1vZGVsKCd2LWZjOkJsYW5rU3VjY2Vzc2Z1bGx5VXBkYXRlZCcpLmxvYWQoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgICAgICAgICBub3RpZnkoJ3N1Y2Nlc3MnLCB7bWVzc2FnZTogbWVzc2FnZX0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgbm90aWZ5KCdkYW5nZXInLCB7bWVzc2FnZTogZXJyb3J9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCgnLmFjdGlvbi51cGRhdGUtY3JlYXRlJywgdGVtcGxhdGUpLnJlbW92ZSgpO1xuICAgIH1cbiAgICBpZiAocmlnaHRzLmhhc1ZhbHVlKCd2LXM6Y2FuRGVsZXRlJywgdHJ1ZSkpIHtcbiAgICAgICQoJy5hY3Rpb24uZGVsZXRlLWNyZWF0ZScsIHRlbXBsYXRlKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZlZGEudXNlci5hc3BlY3RcbiAgICAgICAgICAubG9hZCgpXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGFzcGVjdCkge1xuICAgICAgICAgICAgYXNwZWN0LnJlbW92ZVZhbHVlKCd2LXM6aGFzQ3JlYXRlJywgaW5kaXZpZHVhbCk7XG4gICAgICAgICAgICByZXR1cm4gYXNwZWN0LnNhdmUoKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBpbmRpdmlkdWFsLmRlbGV0ZSgpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbmRpdmlkdWFsTW9kZWwoJ3YtZmM6QmxhbmtTdWNjZXNzZnVsbHlEZWxldGVkJykubG9hZCgpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIG5vdGlmeSgnc3VjY2VzcycsIHttZXNzYWdlOiBtZXNzYWdlfSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBub3RpZnkoJ2RhbmdlcicsIHttZXNzYWdlOiBlcnJvcn0pO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoJy5hY3Rpb24uZGVsZXRlLWNyZWF0ZScsIHRlbXBsYXRlKS5yZW1vdmUoKTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGh0bWwgPSBgXG4gIDxkaXY+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lciBzaGVldFwiPlxuICAgICAgPGRpdiBjbGFzcz1cInJpYmJvbi13cmFwcGVyIHRvcC1sZWZ0XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaWJib24gdG9wLWxlZnQgc3VjY2Vzc1wiIGFib3V0PVwidi1mYzpDcmVhdGVCdW5kbGVcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImFjdGlvbnMgdGV4dC1yaWdodFwiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYWN0aW9uIHNhdmUtY3JlYXRlIGJ0biBidG4tc3VjY2Vzc1wiIGFib3V0PVwidi1mYzpTYXZlUGVyc29uYWxCbGFua1wiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYWN0aW9uIHVwZGF0ZS1jcmVhdGUgYnRuIGJ0bi1zdWNjZXNzXCIgYWJvdXQ9XCJ2LWZjOlVwZGF0ZVBlcnNvbmFsQmxhbmtcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImFjdGlvbiBkZWxldGUtY3JlYXRlIGJ0biBidG4tbGlua1wiIGFib3V0PVwidi1zOkRlbGV0ZVwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBhYm91dD1cIkBcIiByZWw9XCJ2LWZjOmhhc0JsYW5rXCIgZGF0YS10ZW1wbGF0ZT1cInYtZmM6QmxhbmtUZW1wbGF0ZVwiPjwvZGl2PlxuICA8L2Rpdj5cbmA7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O01BQU9BLENBQUMsR0FBQUMsT0FBQSxDQUFBQyxPQUFBO0lBQUEsYUFBQUMsZUFBQTtNQUNEQyxJQUFJLEdBQUFELGVBQUEsQ0FBQUQsT0FBQTtJQUFBLGFBQUFHLGtCQUFBO01BQ0pDLE1BQU0sR0FBQUQsa0JBQUEsQ0FBQUgsT0FBQTtJQUFBLGFBQUFLLDJCQUFBO01BQ05DLGVBQWUsR0FBQUQsMkJBQUEsQ0FBQUwsT0FBQTtJQUFBO0lBQUFPLE9BQUEsV0FBQUEsQ0FBQTtNQUFBQyxPQUFBLFFBRVRDLEdBQUcsR0FBRyxTQUFOQSxHQUFHQSxDQUFhQyxVQUFVLEVBQUVDLFFBQVEsRUFBRUMsU0FBUyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRTtRQUN6RUgsUUFBUSxHQUFHYixDQUFDLENBQUNhLFFBQVEsQ0FBQztRQUN0QkMsU0FBUyxHQUFHZCxDQUFDLENBQUNjLFNBQVMsQ0FBQztRQUV4QixJQUFJLENBQUNGLFVBQVUsQ0FBQ0ssUUFBUSxDQUFDLGFBQWEsRUFBRWIsSUFBSSxDQUFDYyxXQUFXLElBQUlkLElBQUksQ0FBQ2UsSUFBSSxDQUFDLEVBQUU7VUFDdEVuQixDQUFDLENBQUMscUJBQXFCLEVBQUVhLFFBQVEsQ0FBQyxDQUFDTyxLQUFLLENBQUMsWUFBWTtZQUNuRCxJQUFNQyxVQUFVLEdBQUcsSUFBSWIsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1lBQ3hEYSxVQUFVLENBQUNDLElBQUksRUFBRSxDQUFDQyxJQUFJLENBQUMsVUFBVUYsVUFBVSxFQUFFO2NBQzNDLElBQU1HLGFBQWEsR0FBR0MsTUFBTSxDQUFDSixVQUFVLENBQUNLLFFBQVEsRUFBRSxFQUFF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