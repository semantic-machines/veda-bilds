"use strict";

System.register(["/js/common/util.js", "jquery"], function (_export, _context) {
  "use strict";

  var CommonUtil, $, pre, html;
  return {
    setters: [function (_jsCommonUtilJs) {
      CommonUtil = _jsCommonUtilJs.default;
    }, function (_jquery) {
      $ = _jquery.default;
    }],
    execute: function () {
      _export("pre", pre = function pre(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        template.tooltip({
          container: template,
          placement: 'bottom',
          trigger: 'hover',
          title: individual['rdfs:label'].map(CommonUtil.formatValue).join(' ')
        });
      });
      _export("html", html = "\n  <a href=\"#/@\" data-toggle=\"tooltip\" data-trigger=\"hover\" data-placement=\"bottom\">\n    <span class=\"fa fa-newspaper-o fa-lg\"></span> <span class=\"label label-default\" id=\"news-counter\"></span>\n  </a>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJDb21tb25VdGlsIiwiX2pzQ29tbW9uVXRpbEpzIiwiZGVmYXVsdCIsIl9qcXVlcnkiLCIkIiwiZXhlY3V0ZSIsIl9leHBvcnQiLCJwcmUiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJ0b29sdGlwIiwicGxhY2VtZW50IiwidHJpZ2dlciIsInRpdGxlIiwibWFwIiwiZm9ybWF0VmFsdWUiLCJqb2luIiwiaHRtbCJdLCJzb3VyY2VzIjpbIi4uLy4uL29udG9sb2d5L2dlbmVyaWMtZnVuY3Rpb24vdGVtcGxhdGVzL3Ytc19OZXdzSW5kaWNhdG9yVGVtcGxhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbW1vblV0aWwgZnJvbSAnL2pzL2NvbW1vbi91dGlsLmpzJztcbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmV4cG9ydCBjb25zdCBwcmUgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gIHRlbXBsYXRlLnRvb2x0aXAoe1xuICAgIGNvbnRhaW5lcjogdGVtcGxhdGUsXG4gICAgcGxhY2VtZW50OiAnYm90dG9tJyxcbiAgICB0cmlnZ2VyOiAnaG92ZXInLFxuICAgIHRpdGxlOiBpbmRpdmlkdWFsWydyZGZzOmxhYmVsJ10ubWFwKENvbW1vblV0aWwuZm9ybWF0VmFsdWUpLmpvaW4oJyAnKSxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgaHRtbCA9IGBcbiAgPGEgaHJlZj1cIiMvQFwiIGRhdGEtdG9nZ2xlPVwidG9vbHRpcFwiIGRhdGEtdHJpZ2dlcj1cImhvdmVyXCIgZGF0YS1wbGFjZW1lbnQ9XCJib3R0b21cIj5cbiAgICA8c3BhbiBjbGFzcz1cImZhIGZhLW5ld3NwYXBlci1vIGZhLWxnXCI+PC9zcGFuPiA8c3BhbiBjbGFzcz1cImxhYmVsIGxhYmVsLWRlZmF1bHRcIiBpZD1cIm5ld3MtY291bnRlclwiPjwvc3Bhbj5cbiAgPC9hPlxuYDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7TUFBT0EsVUFBVSxHQUFBQyxlQUFBLENBQUFDLE9BQUE7SUFBQSxhQUFBQyxPQUFBO01BQ1ZDLENBQUMsR0FBQUQsT0FBQSxDQUFBRCxPQUFBO0lBQUE7SUFBQUcsT0FBQSxXQUFBQSxDQUFBO01BQUFDLE9BQUEsUUFFS0MsR0FBRyxHQUFHLFNBQU5BLEdBQUdBLENBQWFDLFVBQVUsRUFBRUMsUUFBUSxFQUFFQyxTQUFTLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFO1FBQ3pFSCxRQUFRLEdBQUdMLENBQUMsQ0FBQ0ssUUFBUSxDQUFDO1FBQ3RCQyxTQUFTLEdBQUdOLENBQUMsQ0FBQ00sU0FBUyxDQUFDO1FBRXhCRCxRQUFRLENBQUNJLE9BQU8sQ0FBQztVQUNmSCxTQUFTLEVBQUVELFFBQVE7VUFDbkJLLFNBQVMsRUFBRSxRQUFRO1VBQ25CQyxPQUFPLEVBQUUsT0FBTztVQUNoQkMsS0FBSyxFQUFFUixVQUFVLENBQUMsWUFBWSxDQUFDLENBQUNTLEdBQUcsQ0FBQ2pCLFVBQVUsQ0FBQ2tCLFdBQVcsQ0FBQyxDQUFDQyxJQUFJLENBQUMsR0FBRztRQUN0RSxDQUFDLENBQUM7TUFDSixDQUFDO01BQUFiLE9BQUEsU0FFWWMsSUFBSTtJQUFBO0VBQUE7QUFBQSJ9