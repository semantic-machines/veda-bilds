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
      _export("html", html = "\n  <a href=\"#/@\"><span class=\"fa fa-lg fa-user-o\"></span></a>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJDb21tb25VdGlsIiwiX2pzQ29tbW9uVXRpbEpzIiwiZGVmYXVsdCIsIl9qcXVlcnkiLCIkIiwiZXhlY3V0ZSIsIl9leHBvcnQiLCJwcmUiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJ0b29sdGlwIiwicGxhY2VtZW50IiwidHJpZ2dlciIsInRpdGxlIiwibWFwIiwiZm9ybWF0VmFsdWUiLCJqb2luIiwiaHRtbCJdLCJzb3VyY2VzIjpbIi4uLy4uL29udG9sb2d5L2dlbmVyaWMtYXBwbGljYXRpb24vdGVtcGxhdGVzL3Ytc19MYXlvdXRUZW1wbGF0ZV9jb250YWN0cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tbW9uVXRpbCBmcm9tICcvanMvY29tbW9uL3V0aWwuanMnO1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuZXhwb3J0IGNvbnN0IHByZSA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgdGVtcGxhdGUudG9vbHRpcCh7XG4gICAgY29udGFpbmVyOiB0ZW1wbGF0ZSxcbiAgICBwbGFjZW1lbnQ6ICdib3R0b20nLFxuICAgIHRyaWdnZXI6ICdob3ZlcicsXG4gICAgdGl0bGU6IGluZGl2aWR1YWxbJ3JkZnM6bGFiZWwnXS5tYXAoQ29tbW9uVXRpbC5mb3JtYXRWYWx1ZSkuam9pbignICcpLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBodG1sID0gYFxuICA8YSBocmVmPVwiIy9AXCI+PHNwYW4gY2xhc3M9XCJmYSBmYS1sZyBmYS11c2VyLW9cIj48L3NwYW4+PC9hPlxuYDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7TUFBT0EsVUFBVSxHQUFBQyxlQUFBLENBQUFDLE9BQUE7SUFBQSxhQUFBQyxPQUFBO01BQ1ZDLENBQUMsR0FBQUQsT0FBQSxDQUFBRCxPQUFBO0lBQUE7SUFBQUcsT0FBQSxXQUFBQSxDQUFBO01BQUFDLE9BQUEsUUFFS0MsR0FBRyxHQUFHLFNBQU5BLEdBQUdBLENBQWFDLFVBQVUsRUFBRUMsUUFBUSxFQUFFQyxTQUFTLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFO1FBQ3pFSCxRQUFRLEdBQUdMLENBQUMsQ0FBQ0ssUUFBUSxDQUFDO1FBQ3RCQyxTQUFTLEdBQUdOLENBQUMsQ0FBQ00sU0FBUyxDQUFDO1FBRXhCRCxRQUFRLENBQUNJLE9BQU8sQ0FBQztVQUNmSCxTQUFTLEVBQUVELFFBQVE7VUFDbkJLLFNBQVMsRUFBRSxRQUFRO1VBQ25CQyxPQUFPLEVBQUUsT0FBTztVQUNoQkMsS0FBSyxFQUFFUixVQUFVLENBQUMsWUFBWSxDQUFDLENBQUNTLEdBQUcsQ0FBQ2pCLFVBQVUsQ0FBQ2tCLFdBQVcsQ0FBQyxDQUFDQyxJQUFJLENBQUMsR0FBRztRQUN0RSxDQUFDLENBQUM7TUFDSixDQUFDO01BQUFiLE9BQUEsU0FFWWMsSUFBSTtJQUFBO0VBQUE7QUFBQSJ9