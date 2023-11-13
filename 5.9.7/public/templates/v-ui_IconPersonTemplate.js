"use strict";

System.register(["/js/common/util.js", "jquery", "/js/common/individual_model.js"], function (_export, _context) {
  "use strict";

  var CommonUtil, $, IndividualModel, pre, html;
  return {
    setters: [function (_jsCommonUtilJs) {
      CommonUtil = _jsCommonUtilJs.default;
    }, function (_jquery) {
      $ = _jquery.default;
    }, function (_jsCommonIndividual_modelJs) {
      IndividualModel = _jsCommonIndividual_modelJs.default;
    }],
    execute: function () {
      _export("pre", pre = function pre(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        if (individual.hasValue('v-s:hasAspect')) {
          template.attr('href', '#/' + individual['v-s:hasAspect'][0].id);
        }
        return new IndividualModel('v-s:PersonalInfo').load().then(function (personalInfo) {
          template.tooltip({
            container: template,
            placement: 'bottom',
            trigger: 'hover',
            title: personalInfo['rdfs:label'].map(CommonUtil.formatValue).join(' ')
          });
        });
      });
      _export("html", html = "\n  <a href=\"#/@\" about=\"@\" property=\"rdfs:label\"></a>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJDb21tb25VdGlsIiwiX2pzQ29tbW9uVXRpbEpzIiwiZGVmYXVsdCIsIl9qcXVlcnkiLCIkIiwiX2pzQ29tbW9uSW5kaXZpZHVhbF9tb2RlbEpzIiwiSW5kaXZpZHVhbE1vZGVsIiwiZXhlY3V0ZSIsIl9leHBvcnQiLCJwcmUiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJoYXNWYWx1ZSIsImF0dHIiLCJpZCIsImxvYWQiLCJ0aGVuIiwicGVyc29uYWxJbmZvIiwidG9vbHRpcCIsInBsYWNlbWVudCIsInRyaWdnZXIiLCJ0aXRsZSIsIm1hcCIsImZvcm1hdFZhbHVlIiwiam9pbiIsImh0bWwiXSwic291cmNlcyI6WyIuLi8uLi9vbnRvbG9neS9zeXN0ZW0tY29yZS90ZW1wbGF0ZXMvdi11aV9JY29uUGVyc29uVGVtcGxhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbW1vblV0aWwgZnJvbSAnL2pzL2NvbW1vbi91dGlsLmpzJztcbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgSW5kaXZpZHVhbE1vZGVsIGZyb20gJy9qcy9jb21tb24vaW5kaXZpZHVhbF9tb2RlbC5qcyc7XG5cbmV4cG9ydCBjb25zdCBwcmUgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gIGlmIChpbmRpdmlkdWFsLmhhc1ZhbHVlKCd2LXM6aGFzQXNwZWN0JykpIHtcbiAgICB0ZW1wbGF0ZS5hdHRyKCdocmVmJywgJyMvJyArIGluZGl2aWR1YWxbJ3YtczpoYXNBc3BlY3QnXVswXS5pZCk7XG4gIH1cbiAgcmV0dXJuIG5ldyBJbmRpdmlkdWFsTW9kZWwoJ3YtczpQZXJzb25hbEluZm8nKS5sb2FkKCkudGhlbihmdW5jdGlvbiAocGVyc29uYWxJbmZvKSB7XG4gICAgdGVtcGxhdGUudG9vbHRpcCh7XG4gICAgICBjb250YWluZXI6IHRlbXBsYXRlLFxuICAgICAgcGxhY2VtZW50OiAnYm90dG9tJyxcbiAgICAgIHRyaWdnZXI6ICdob3ZlcicsXG4gICAgICB0aXRsZTogcGVyc29uYWxJbmZvWydyZGZzOmxhYmVsJ10ubWFwKENvbW1vblV0aWwuZm9ybWF0VmFsdWUpLmpvaW4oJyAnKSxcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgaHRtbCA9IGBcbiAgPGEgaHJlZj1cIiMvQFwiIGFib3V0PVwiQFwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvYT5cbmA7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O01BQU9BLFVBQVUsR0FBQUMsZUFBQSxDQUFBQyxPQUFBO0lBQUEsYUFBQUMsT0FBQTtNQUNWQyxDQUFDLEdBQUFELE9BQUEsQ0FBQUQsT0FBQTtJQUFBLGFBQUFHLDJCQUFBO01BQ0RDLGVBQWUsR0FBQUQsMkJBQUEsQ0FBQUgsT0FBQTtJQUFBO0lBQUFLLE9BQUEsV0FBQUEsQ0FBQTtNQUFBQyxPQUFBLFFBRVRDLEdBQUcsR0FBRyxTQUFOQSxHQUFHQSxDQUFhQyxVQUFVLEVBQUVDLFFBQVEsRUFBRUMsU0FBUyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRTtRQUN6RUgsUUFBUSxHQUFHUCxDQUFDLENBQUNPLFFBQVEsQ0FBQztRQUN0QkMsU0FBUyxHQUFHUixDQUFDLENBQUNRLFNBQVMsQ0FBQztRQUV4QixJQUFJRixVQUFVLENBQUNLLFFBQVEsQ0FBQyxlQUFlLENBQUMsRUFBRTtVQUN4Q0osUUFBUSxDQUFDSyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksR0FBR04sVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDTyxFQUFFLENBQUM7UUFDakU7UUFDQSxPQUFPLElBQUlYLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDWSxJQUFJLEVBQUUsQ0FBQ0MsSUFBSSxDQUFDLFVBQVVDLFlBQVksRUFBRTtVQUNqRlQsUUFBUSxDQUFDVSxPQUFPLENBQUM7WUFDZlQsU0FBUyxFQUFFRCxRQUFRO1lBQ25CVyxTQUFTLEVBQUUsUUFBUTtZQUNuQkMsT0FBTyxFQUFFLE9BQU87WUFDaEJDLEtBQUssRUFBRUosWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDSyxHQUFHLENBQUN6QixVQUFVLENBQUMwQixXQUFXLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLEdBQUc7VUFDeEUsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDO01BQ0osQ0FBQztNQUFBbkIsT0FBQSxTQUVZb0IsSUFBSTtJQUFBO0VBQUE7QUFBQSJ9