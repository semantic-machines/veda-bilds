"use strict";

System.register(["jquery"], function (_export, _context) {
  "use strict";

  var $, pre, html;
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }],
    execute: function () {
      _export("pre", pre = function pre(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        if (!individual.hasValue('v-wf:to')) {
          template.empty();
        }
      });
      _export("html", html = "\n  <div>\n    <hr class=\"no-margin\" />\n    <strong><small about=\"v-s:TaskIsRedirectedFrom\" property=\"rdfs:label\"></small></strong>\n    <small about=\"@\" rel=\"v-wf:to\" data-template=\"v-ui:LabelTemplate\"></small>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInByZSIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsImhhc1ZhbHVlIiwiZW1wdHkiLCJodG1sIl0sInNvdXJjZXMiOlsiLi4vLi4vb250b2xvZ3kvZ2VuZXJpYy1mdW5jdGlvbi90ZW1wbGF0ZXMvdi1mdF9SZWRpcmVjdEluZm9fdGVtcGxhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuZXhwb3J0IGNvbnN0IHByZSA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgaWYgKCFpbmRpdmlkdWFsLmhhc1ZhbHVlKCd2LXdmOnRvJykpIHtcbiAgICB0ZW1wbGF0ZS5lbXB0eSgpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaHRtbCA9IGBcbiAgPGRpdj5cbiAgICA8aHIgY2xhc3M9XCJuby1tYXJnaW5cIiAvPlxuICAgIDxzdHJvbmc+PHNtYWxsIGFib3V0PVwidi1zOlRhc2tJc1JlZGlyZWN0ZWRGcm9tXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9zbWFsbD48L3N0cm9uZz5cbiAgICA8c21hbGwgYWJvdXQ9XCJAXCIgcmVsPVwidi13Zjp0b1wiIGRhdGEtdGVtcGxhdGU9XCJ2LXVpOkxhYmVsVGVtcGxhdGVcIj48L3NtYWxsPlxuICA8L2Rpdj5cbmA7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O01BQU9BLENBQUMsR0FBQUMsT0FBQSxDQUFBQyxPQUFBO0lBQUE7SUFBQUMsT0FBQSxXQUFBQSxDQUFBO01BQUFDLE9BQUEsUUFFS0MsR0FBRyxHQUFHLFNBQU5BLEdBQUdBLENBQWFDLFVBQVUsRUFBRUMsUUFBUSxFQUFFQyxTQUFTLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFO1FBQ3pFSCxRQUFRLEdBQUdQLENBQUMsQ0FBQ08sUUFBUSxDQUFDO1FBQ3RCQyxTQUFTLEdBQUdSLENBQUMsQ0FBQ1EsU0FBUyxDQUFDO1FBRXhCLElBQUksQ0FBQ0YsVUFBVSxDQUFDSyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7VUFDbkNKLFFBQVEsQ0FBQ0ssS0FBSyxFQUFFO1FBQ2xCO01BQ0YsQ0FBQztNQUFBUixPQUFBLFNBRVlTLElBQUk7SUFBQTtFQUFBO0FBQUEifQ==