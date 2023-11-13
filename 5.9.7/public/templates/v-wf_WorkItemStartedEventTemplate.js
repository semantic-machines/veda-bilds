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
        $('#exp', template).click(function (e) {
          e.preventDefault();
          $("div[rel='v-s:subJournal']", template).toggle();
          $(this).children(':first').toggleClass('glyphicon-chevron-down glyphicon-chevron-right');
        });
      });
      _export("html", html = "\n  <div class=\"journal-record\">\n    <hr class=\"margin-sm\" />\n    <div class=\"row\">\n      <div class=\"col-md-2 col-sm-3 event-type\">\n        <a id=\"exp\" href=\"#\"><span class=\"glyphicon glyphicon-chevron-down\"></span></a>\n        <span about=\"@\" rel=\"rdf:type\" data-template=\"v-ui:LabelTemplate\"></span>\n      </div>\n      <div class=\"col-md-8 col-sm-6 event-desc\">\n        <span about=\"@\" property=\"rdfs:label\"></span>\n      </div>\n      <div class=\"col-md-2 col-sm-3 event-date text-right\">\n        <span about=\"@\" property=\"v-s:created\"></span>\n      </div>\n    </div>\n    <div about=\"@\" rel=\"v-s:subJournal\" data-template=\"v-ui:SubJournalTemplate\"></div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInByZSIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsImNsaWNrIiwiZSIsInByZXZlbnREZWZhdWx0IiwidG9nZ2xlIiwiY2hpbGRyZW4iLCJ0b2dnbGVDbGFzcyIsImh0bWwiXSwic291cmNlcyI6WyIuLi8uLi9vbnRvbG9neS9nZW5lcmljLWZ1bmN0aW9uL3RlbXBsYXRlcy92LXdmX1dvcmtJdGVtU3RhcnRlZEV2ZW50VGVtcGxhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuZXhwb3J0IGNvbnN0IHByZSA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgJCgnI2V4cCcsIHRlbXBsYXRlKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAkKFwiZGl2W3JlbD0ndi1zOnN1YkpvdXJuYWwnXVwiLCB0ZW1wbGF0ZSkudG9nZ2xlKCk7XG4gICAgJCh0aGlzKS5jaGlsZHJlbignOmZpcnN0JykudG9nZ2xlQ2xhc3MoJ2dseXBoaWNvbi1jaGV2cm9uLWRvd24gZ2x5cGhpY29uLWNoZXZyb24tcmlnaHQnKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgaHRtbCA9IGBcbiAgPGRpdiBjbGFzcz1cImpvdXJuYWwtcmVjb3JkXCI+XG4gICAgPGhyIGNsYXNzPVwibWFyZ2luLXNtXCIgLz5cbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTIgY29sLXNtLTMgZXZlbnQtdHlwZVwiPlxuICAgICAgICA8YSBpZD1cImV4cFwiIGhyZWY9XCIjXCI+PHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWNoZXZyb24tZG93blwiPjwvc3Bhbj48L2E+XG4gICAgICAgIDxzcGFuIGFib3V0PVwiQFwiIHJlbD1cInJkZjp0eXBlXCIgZGF0YS10ZW1wbGF0ZT1cInYtdWk6TGFiZWxUZW1wbGF0ZVwiPjwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC04IGNvbC1zbS02IGV2ZW50LWRlc2NcIj5cbiAgICAgICAgPHNwYW4gYWJvdXQ9XCJAXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTIgY29sLXNtLTMgZXZlbnQtZGF0ZSB0ZXh0LXJpZ2h0XCI+XG4gICAgICAgIDxzcGFuIGFib3V0PVwiQFwiIHByb3BlcnR5PVwidi1zOmNyZWF0ZWRcIj48L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGFib3V0PVwiQFwiIHJlbD1cInYtczpzdWJKb3VybmFsXCIgZGF0YS10ZW1wbGF0ZT1cInYtdWk6U3ViSm91cm5hbFRlbXBsYXRlXCI+PC9kaXY+XG4gIDwvZGl2PlxuYDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7TUFBT0EsQ0FBQyxHQUFBQyxPQUFBLENBQUFDLE9BQUE7SUFBQTtJQUFBQyxPQUFBLFdBQUFBLENBQUE7TUFBQUMsT0FBQSxRQUVLQyxHQUFHLEdBQUcsU0FBTkEsR0FBR0EsQ0FBYUMsVUFBVSxFQUFFQyxRQUFRLEVBQUVDLFNBQVMsRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUU7UUFDekVILFFBQVEsR0FBR1AsQ0FBQyxDQUFDTyxRQUFRLENBQUM7UUFDdEJDLFNBQVMsR0FBR1IsQ0FBQyxDQUFDUSxTQUFTLENBQUM7UUFFeEJSLENBQUMsQ0FBQyxNQUFNLEVBQUVPLFFBQVEsQ0FBQyxDQUFDSSxLQUFLLENBQUMsVUFBVUMsQ0FBQyxFQUFFO1VBQ3JDQSxDQUFDLENBQUNDLGNBQWMsRUFBRTtVQUNsQmIsQ0FBQyxDQUFDLDJCQUEyQixFQUFFTyxRQUFRLENBQUMsQ0FBQ08sTUFBTSxFQUFFO1VBQ2pEZCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUNlLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQ0MsV0FBVyxDQUFDLGdEQUFnRCxDQUFDO1FBQzFGLENBQUMsQ0FBQztNQUNKLENBQUM7TUFBQVosT0FBQSxTQUVZYSxJQUFJO0lBQUE7RUFBQTtBQUFBIn0=