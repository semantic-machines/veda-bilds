"use strict";

System.register(["/js/common/util.js", "jquery", "/js/common/veda.js"], function (_export, _context) {
  "use strict";

  var CommonUtil, $, veda, pre, html;
  return {
    setters: [function (_jsCommonUtilJs) {
      CommonUtil = _jsCommonUtilJs.default;
    }, function (_jquery) {
      $ = _jquery.default;
    }, function (_jsCommonVedaJs) {
      veda = _jsCommonVedaJs.default;
    }],
    execute: function () {
      _export("pre", pre = function pre(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        return veda.user.isMemberOf('cfg:SuperUser').then(function (isSuperUser) {
          if (!isSuperUser) {
            template.hide();
          } else {
            template.tooltip({
              container: template,
              placement: 'bottom',
              trigger: 'hover',
              title: individual['rdfs:label'].map(CommonUtil.formatValue).join(' ')
            });
          }
        });
      });
      _export("html", html = "\n  <a href=\"#/v-s:AdministrationAspect\" data-toggle=\"tooltip\" data-trigger=\"hover\" data-placement=\"bottom\">\n    <span class=\"fa fa-cog fa-lg\"></span> <span class=\"label label-default\"></span>\n  </a>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJDb21tb25VdGlsIiwiX2pzQ29tbW9uVXRpbEpzIiwiZGVmYXVsdCIsIl9qcXVlcnkiLCIkIiwiX2pzQ29tbW9uVmVkYUpzIiwidmVkYSIsImV4ZWN1dGUiLCJfZXhwb3J0IiwicHJlIiwiaW5kaXZpZHVhbCIsInRlbXBsYXRlIiwiY29udGFpbmVyIiwibW9kZSIsImV4dHJhIiwidXNlciIsImlzTWVtYmVyT2YiLCJ0aGVuIiwiaXNTdXBlclVzZXIiLCJoaWRlIiwidG9vbHRpcCIsInBsYWNlbWVudCIsInRyaWdnZXIiLCJ0aXRsZSIsIm1hcCIsImZvcm1hdFZhbHVlIiwiam9pbiIsImh0bWwiXSwic291cmNlcyI6WyIuLi8uLi9vbnRvbG9neS9zeXN0ZW0tY29yZS90ZW1wbGF0ZXMvdi11aV9BZG1pbmlzdHJhdGlvbkljb25UZW1wbGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tbW9uVXRpbCBmcm9tICcvanMvY29tbW9uL3V0aWwuanMnO1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB2ZWRhIGZyb20gJy9qcy9jb21tb24vdmVkYS5qcyc7XG5cbmV4cG9ydCBjb25zdCBwcmUgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gIHJldHVybiB2ZWRhLnVzZXIuaXNNZW1iZXJPZignY2ZnOlN1cGVyVXNlcicpLnRoZW4oZnVuY3Rpb24gKGlzU3VwZXJVc2VyKSB7XG4gICAgaWYgKCFpc1N1cGVyVXNlcikge1xuICAgICAgdGVtcGxhdGUuaGlkZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0ZW1wbGF0ZS50b29sdGlwKHtcbiAgICAgICAgY29udGFpbmVyOiB0ZW1wbGF0ZSxcbiAgICAgICAgcGxhY2VtZW50OiAnYm90dG9tJyxcbiAgICAgICAgdHJpZ2dlcjogJ2hvdmVyJyxcbiAgICAgICAgdGl0bGU6IGluZGl2aWR1YWxbJ3JkZnM6bGFiZWwnXS5tYXAoQ29tbW9uVXRpbC5mb3JtYXRWYWx1ZSkuam9pbignICcpLFxuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBodG1sID0gYFxuICA8YSBocmVmPVwiIy92LXM6QWRtaW5pc3RyYXRpb25Bc3BlY3RcIiBkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIiBkYXRhLXRyaWdnZXI9XCJob3ZlclwiIGRhdGEtcGxhY2VtZW50PVwiYm90dG9tXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1jb2cgZmEtbGdcIj48L3NwYW4+IDxzcGFuIGNsYXNzPVwibGFiZWwgbGFiZWwtZGVmYXVsdFwiPjwvc3Bhbj5cbiAgPC9hPlxuYDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7TUFBT0EsVUFBVSxHQUFBQyxlQUFBLENBQUFDLE9BQUE7SUFBQSxhQUFBQyxPQUFBO01BQ1ZDLENBQUMsR0FBQUQsT0FBQSxDQUFBRCxPQUFBO0lBQUEsYUFBQUcsZUFBQTtNQUNEQyxJQUFJLEdBQUFELGVBQUEsQ0FBQUgsT0FBQTtJQUFBO0lBQUFLLE9BQUEsV0FBQUEsQ0FBQTtNQUFBQyxPQUFBLFFBRUVDLEdBQUcsR0FBRyxTQUFOQSxHQUFHQSxDQUFhQyxVQUFVLEVBQUVDLFFBQVEsRUFBRUMsU0FBUyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRTtRQUN6RUgsUUFBUSxHQUFHUCxDQUFDLENBQUNPLFFBQVEsQ0FBQztRQUN0QkMsU0FBUyxHQUFHUixDQUFDLENBQUNRLFNBQVMsQ0FBQztRQUV4QixPQUFPTixJQUFJLENBQUNTLElBQUksQ0FBQ0MsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDQyxJQUFJLENBQUMsVUFBVUMsV0FBVyxFQUFFO1VBQ3ZFLElBQUksQ0FBQ0EsV0FBVyxFQUFFO1lBQ2hCUCxRQUFRLENBQUNRLElBQUksRUFBRTtVQUNqQixDQUFDLE1BQU07WUFDTFIsUUFBUSxDQUFDUyxPQUFPLENBQUM7Y0FDZlIsU0FBUyxFQUFFRCxRQUFRO2NBQ25CVSxTQUFTLEVBQUUsUUFBUTtjQUNuQkMsT0FBTyxFQUFFLE9BQU87Y0FDaEJDLEtBQUssRUFBRWIsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDYyxHQUFHLENBQUN4QixVQUFVLENBQUN5QixXQUFXLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLEdBQUc7WUFDdEUsQ0FBQyxDQUFDO1VBQ0o7UUFDRixDQUFDLENBQUM7TUFDSixDQUFDO01BQUFsQixPQUFBLFNBRVltQixJQUFJO0lBQUE7RUFBQTtBQUFBIn0=