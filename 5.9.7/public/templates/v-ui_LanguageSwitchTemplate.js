"use strict";

System.register(["jquery", "/js/common/veda.js", "/js/common/individual_model.js"], function (_export, _context) {
  "use strict";

  var $, veda, IndividualModel, post, html;
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_jsCommonVedaJs) {
      veda = _jsCommonVedaJs.default;
    }, function (_jsCommonIndividual_modelJs) {
      IndividualModel = _jsCommonIndividual_modelJs.default;
    }],
    execute: function () {
      _export("post", post = function post(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        var switchBehavior = container.attr('data-switch-behavior') || 'checkbox';
        var switches = $('.btn', template);
        veda.user.preferences.on('v-ui:preferredLanguage', langHandler);
        template.one('remove', function () {
          veda.user.preferences.off('v-ui:preferredLanguage', langHandler);
        });
        langHandler();
        template.on('click', 'button.lang', toggleLanguage);
        function langHandler() {
          var preferredLanguage = veda.user.preferences['v-ui:preferredLanguage'].map(function (language) {
            return language.id;
          });
          switches.each(function () {
            var $this = $(this);
            var lang_uri = $this.attr('resource');
            if (preferredLanguage.indexOf(lang_uri) > -1) {
              $this.addClass('active btn-success').removeClass('btn-default');
            } else {
              $this.removeClass('active btn-success').addClass('btn-default');
            }
          });
        }
        function toggleLanguage(e) {
          e.stopPropagation();
          var target = $(e.target);
          var lang_uri = target.attr('resource');
          var lang = new IndividualModel(lang_uri);
          var hasLanguage = veda.user.preferences.hasValue('v-ui:preferredLanguage', lang);
          var languageCount = veda.user.preferences['v-ui:preferredLanguage'].length;
          if (!hasLanguage) {
            if (switchBehavior === 'checkbox') {
              veda.user.preferences.addValue('v-ui:preferredLanguage', lang);
            } else {
              veda.user.preferences.set('v-ui:preferredLanguage', [lang]);
            }
          } else if (hasLanguage && languageCount > 1) {
            veda.user.preferences.removeValue('v-ui:preferredLanguage', lang);
          } else {
            return;
          }
        }
      });
      _export("html", html = "\n  <div about=\"@\" class=\"btn-group margin-sm-h\" rel=\"rdf:value\">\n    <button about=\"@\" property=\"rdfs:label\" class=\"lang btn btn-xs btn-default navbar-btn\"></button>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfanNDb21tb25WZWRhSnMiLCJ2ZWRhIiwiX2pzQ29tbW9uSW5kaXZpZHVhbF9tb2RlbEpzIiwiSW5kaXZpZHVhbE1vZGVsIiwiZXhlY3V0ZSIsIl9leHBvcnQiLCJwb3N0IiwiaW5kaXZpZHVhbCIsInRlbXBsYXRlIiwiY29udGFpbmVyIiwibW9kZSIsImV4dHJhIiwic3dpdGNoQmVoYXZpb3IiLCJhdHRyIiwic3dpdGNoZXMiLCJ1c2VyIiwicHJlZmVyZW5jZXMiLCJvbiIsImxhbmdIYW5kbGVyIiwib25lIiwib2ZmIiwidG9nZ2xlTGFuZ3VhZ2UiLCJwcmVmZXJyZWRMYW5ndWFnZSIsIm1hcCIsImxhbmd1YWdlIiwiaWQiLCJlYWNoIiwiJHRoaXMiLCJsYW5nX3VyaSIsImluZGV4T2YiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsInRhcmdldCIsImxhbmciLCJoYXNMYW5ndWFnZSIsImhhc1ZhbHVlIiwibGFuZ3VhZ2VDb3VudCIsImxlbmd0aCIsImFkZFZhbHVlIiwic2V0IiwicmVtb3ZlVmFsdWUiLCJodG1sIl0sInNvdXJjZXMiOlsiLi4vLi4vb250b2xvZ3kvc3lzdGVtLWNvcmUvdGVtcGxhdGVzL3YtdWlfTGFuZ3VhZ2VTd2l0Y2hUZW1wbGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHZlZGEgZnJvbSAnL2pzL2NvbW1vbi92ZWRhLmpzJztcbmltcG9ydCBJbmRpdmlkdWFsTW9kZWwgZnJvbSAnL2pzL2NvbW1vbi9pbmRpdmlkdWFsX21vZGVsLmpzJztcblxuZXhwb3J0IGNvbnN0IHBvc3QgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gIGNvbnN0IHN3aXRjaEJlaGF2aW9yID0gY29udGFpbmVyLmF0dHIoJ2RhdGEtc3dpdGNoLWJlaGF2aW9yJykgfHwgJ2NoZWNrYm94JztcbiAgY29uc3Qgc3dpdGNoZXMgPSAkKCcuYnRuJywgdGVtcGxhdGUpO1xuICB2ZWRhLnVzZXIucHJlZmVyZW5jZXMub24oJ3YtdWk6cHJlZmVycmVkTGFuZ3VhZ2UnLCBsYW5nSGFuZGxlcik7XG4gIHRlbXBsYXRlLm9uZSgncmVtb3ZlJywgZnVuY3Rpb24gKCkge1xuICAgIHZlZGEudXNlci5wcmVmZXJlbmNlcy5vZmYoJ3YtdWk6cHJlZmVycmVkTGFuZ3VhZ2UnLCBsYW5nSGFuZGxlcik7XG4gIH0pO1xuICBsYW5nSGFuZGxlcigpO1xuICB0ZW1wbGF0ZS5vbignY2xpY2snLCAnYnV0dG9uLmxhbmcnLCB0b2dnbGVMYW5ndWFnZSk7XG4gIGZ1bmN0aW9uIGxhbmdIYW5kbGVyICgpIHtcbiAgICBjb25zdCBwcmVmZXJyZWRMYW5ndWFnZSA9IHZlZGEudXNlci5wcmVmZXJlbmNlc1sndi11aTpwcmVmZXJyZWRMYW5ndWFnZSddLm1hcChmdW5jdGlvbiAobGFuZ3VhZ2UpIHtcbiAgICAgIHJldHVybiBsYW5ndWFnZS5pZDtcbiAgICB9KTtcbiAgICBzd2l0Y2hlcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0ICR0aGlzID0gJCh0aGlzKTtcbiAgICAgIGNvbnN0IGxhbmdfdXJpID0gJHRoaXMuYXR0cigncmVzb3VyY2UnKTtcbiAgICAgIGlmIChwcmVmZXJyZWRMYW5ndWFnZS5pbmRleE9mKGxhbmdfdXJpKSA+IC0xKSB7XG4gICAgICAgICR0aGlzLmFkZENsYXNzKCdhY3RpdmUgYnRuLXN1Y2Nlc3MnKS5yZW1vdmVDbGFzcygnYnRuLWRlZmF1bHQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICR0aGlzLnJlbW92ZUNsYXNzKCdhY3RpdmUgYnRuLXN1Y2Nlc3MnKS5hZGRDbGFzcygnYnRuLWRlZmF1bHQnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiB0b2dnbGVMYW5ndWFnZSAoZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgY29uc3QgdGFyZ2V0ID0gJChlLnRhcmdldCk7XG4gICAgY29uc3QgbGFuZ191cmkgPSB0YXJnZXQuYXR0cigncmVzb3VyY2UnKTtcbiAgICBjb25zdCBsYW5nID0gbmV3IEluZGl2aWR1YWxNb2RlbChsYW5nX3VyaSk7XG4gICAgY29uc3QgaGFzTGFuZ3VhZ2UgPSB2ZWRhLnVzZXIucHJlZmVyZW5jZXMuaGFzVmFsdWUoJ3YtdWk6cHJlZmVycmVkTGFuZ3VhZ2UnLCBsYW5nKTtcbiAgICBjb25zdCBsYW5ndWFnZUNvdW50ID0gdmVkYS51c2VyLnByZWZlcmVuY2VzWyd2LXVpOnByZWZlcnJlZExhbmd1YWdlJ10ubGVuZ3RoO1xuICAgIGlmICghaGFzTGFuZ3VhZ2UpIHtcbiAgICAgIGlmIChzd2l0Y2hCZWhhdmlvciA9PT0gJ2NoZWNrYm94Jykge1xuICAgICAgICB2ZWRhLnVzZXIucHJlZmVyZW5jZXMuYWRkVmFsdWUoJ3YtdWk6cHJlZmVycmVkTGFuZ3VhZ2UnLCBsYW5nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZlZGEudXNlci5wcmVmZXJlbmNlcy5zZXQoJ3YtdWk6cHJlZmVycmVkTGFuZ3VhZ2UnLCBbbGFuZ10pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaGFzTGFuZ3VhZ2UgJiYgbGFuZ3VhZ2VDb3VudCA+IDEpIHtcbiAgICAgIHZlZGEudXNlci5wcmVmZXJlbmNlcy5yZW1vdmVWYWx1ZSgndi11aTpwcmVmZXJyZWRMYW5ndWFnZScsIGxhbmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaHRtbCA9IGBcbiAgPGRpdiBhYm91dD1cIkBcIiBjbGFzcz1cImJ0bi1ncm91cCBtYXJnaW4tc20taFwiIHJlbD1cInJkZjp2YWx1ZVwiPlxuICAgIDxidXR0b24gYWJvdXQ9XCJAXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCIgY2xhc3M9XCJsYW5nIGJ0biBidG4teHMgYnRuLWRlZmF1bHQgbmF2YmFyLWJ0blwiPjwvYnV0dG9uPlxuICA8L2Rpdj5cbmA7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O01BQU9BLENBQUMsR0FBQUMsT0FBQSxDQUFBQyxPQUFBO0lBQUEsYUFBQUMsZUFBQTtNQUNEQyxJQUFJLEdBQUFELGVBQUEsQ0FBQUQsT0FBQTtJQUFBLGFBQUFHLDJCQUFBO01BQ0pDLGVBQWUsR0FBQUQsMkJBQUEsQ0FBQUgsT0FBQTtJQUFBO0lBQUFLLE9BQUEsV0FBQUEsQ0FBQTtNQUFBQyxPQUFBLFNBRVRDLElBQUksR0FBRyxTQUFQQSxJQUFJQSxDQUFhQyxVQUFVLEVBQUVDLFFBQVEsRUFBRUMsU0FBUyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRTtRQUMxRUgsUUFBUSxHQUFHWCxDQUFDLENBQUNXLFFBQVEsQ0FBQztRQUN0QkMsU0FBUyxHQUFHWixDQUFDLENBQUNZLFNBQVMsQ0FBQztRQUV4QixJQUFNRyxjQUFjLEdBQUdILFNBQVMsQ0FBQ0ksSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksVUFBVTtRQUMzRSxJQUFNQyxRQUFRLEdBQUdqQixDQUFDLENBQUMsTUFBTSxFQUFFVyxRQUFRLENBQUM7UUFDcENQLElBQUksQ0FBQ2MsSUFBSSxDQUFDQyxXQUFXLENBQUNDLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRUMsV0FBVyxDQUFDO1FBQy9EVixRQUFRLENBQUNXLEdBQUcsQ0FBQyxRQUFRLEVBQUUsWUFBWTtVQUNqQ2xCLElBQUksQ0FBQ2MsSUFBSSxDQUFDQyxXQUFXLENBQUNJLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRUYsV0FBVyxDQUFDO1FBQ2xFLENBQUMsQ0FBQztRQUNGQSxXQUFXLEVBQUU7UUFDYlYsUUFBUSxDQUFDUyxFQUFFLENBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRUksY0FBYyxDQUFDO1FBQ25ELFNBQVNILFdBQVdBLENBQUEsRUFBSTtVQUN0QixJQUFNSSxpQkFBaUIsR0FBR3JCLElBQUksQ0FBQ2MsSUFBSSxDQUFDQyxXQUFXLENBQUMsd0JBQXdCLENBQUMsQ0FBQ08sR0FBRyxDQUFDLFVBQVVDLFFBQVEsRUFBRTtZQUNoRyxPQUFPQSxRQUFRLENBQUNDLEVBQUU7VUFDcEIsQ0FBQyxDQUFDO1VBQ0ZYLFFBQVEsQ0FBQ1ksSUFBSSxDQUFDLFlBQVk7WUFDeEIsSUFBTUMsS0FBSyxHQUFHOUIsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNyQixJQUFNK0IsUUFBUSxHQUFHRCxLQUFLLENBQUNkLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDdkMsSUFBSVMsaUJBQWlCLENBQUNPLE9BQU8sQ0FBQ0QsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Y0FDNUNELEtBQUssQ0FBQ0csUUFBUSxDQUFDLG9CQUFvQixDQUFDLENBQUNDLFdBQVcsQ0FBQyxhQUFhLENBQUM7WUFDakUsQ0FBQyxNQUFNO2NBQ0xKLEtBQUssQ0FBQ0ksV0FBVyxDQUFDLG9CQUFvQixDQUFDLENBQUNELFFBQVEsQ0FBQyxhQUFhLENBQUM7WUFDakU7VUFDRixDQUFDLENBQUM7UUFDSjtRQUNBLFNBQVNULGNBQWNBLENBQUVXLENBQUMsRUFBRTtVQUMxQkEsQ0FBQyxDQUFDQyxlQUFlLEVBQUU7VUFDbkIsSUFBTUMsTUFBTSxHQUFHckMsQ0FBQyxDQUFDbUMsQ0FBQyxDQUFDRSxNQUFNLENBQUM7VUFDMUIsSUFBTU4sUUFBUSxHQUFHTSxNQUFNLENBQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDO1VBQ3hDLElBQU1zQixJQUFJLEdBQUcsSUFBSWhDLGVBQWUsQ0FBQ3lCLFFBQVEsQ0FBQztVQUMxQyxJQUFNUSxXQUFXLEdBQUduQyxJQUFJLENBQUNjLElBQUksQ0FBQ0MsV0FBVyxDQUFDcUIsUUFBUSxDQUFDLHdCQUF3QixFQUFFRixJQUFJLENBQUM7VUFDbEYsSUFBTUcsYUFBYSxHQUFHckMsSUFBSSxDQUFDYyxJQUFJLENBQUNDLFdBQVcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDdUIsTUFBTTtVQUM1RSxJQUFJLENBQUNILFdBQVcsRUFBRTtZQUNoQixJQUFJeEIsY0FBYyxLQUFLLFVBQVUsRUFBRTtjQUNqQ1gsSUFBSSxDQUFDYyxJQUFJLENBQUNDLFdBQVcsQ0FBQ3dCLFFBQVEsQ0FBQyx3QkFBd0IsRUFBRUwsSUFBSSxDQUFDO1lBQ2hFLENBQUMsTUFBTTtjQUNMbEMsSUFBSSxDQUFDYyxJQUFJLENBQUNDLFdBQVcsQ0FBQ3lCLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDTixJQUFJLENBQUMsQ0FBQztZQUM3RDtVQUNGLENBQUMsTUFBTSxJQUFJQyxXQUFXLElBQUlFLGFBQWEsR0FBRyxDQUFDLEVBQUU7WUFDM0NyQyxJQUFJLENBQUNjLElBQUksQ0FBQ0MsV0FBVyxDQUFDMEIsV0FBVyxDQUFDLHdCQUF3QixFQUFFUCxJQUFJLENBQUM7VUFDbkUsQ0FBQyxNQUFNO1lBQ0w7VUFDRjtRQUNGO01BQ0YsQ0FBQztNQUFBOUIsT0FBQSxTQUVZc0MsSUFBSTtJQUFBO0VBQUE7QUFBQSJ9