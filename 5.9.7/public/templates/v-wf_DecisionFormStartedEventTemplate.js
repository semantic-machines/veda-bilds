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
        if (!individual.hasValue('v-wf:initiator')) {
          $('#initiator', template).remove();
        }
        $('#exp', template).click(function (e) {
          e.preventDefault();
          $("div[rel='v-s:subJournal']", template).toggle();
          $(this).children(':first').toggleClass('glyphicon-chevron-down glyphicon-chevron-right');
        });
      });
      _export("html", html = "\n  <div class=\"journal-record\">\n    <hr class=\"margin-sm\" />\n    <div class=\"row\">\n      <div class=\"col-md-2 col-sm-3 event-type\">\n        <a id=\"exp\" href=\"#\"><span class=\"glyphicon glyphicon-chevron-down\"></span></a>\n        <strong rel=\"rdf:type\" data-template=\"v-ui:LabelTemplate\"></strong>\n      </div>\n      <div class=\"col-md-8 col-sm-6 event-desc\">\n        <div property=\"rdfs:label\"></div>\n        <span id=\"initiator\">\n          <span about=\"v-wf:initiator\" property=\"rdfs:label\"></span>:\n          <em rel=\"v-wf:initiator\" data-template=\"v-ui:LabelTemplate\"></em>\n        </span>\n      </div>\n      <div class=\"col-md-2 col-sm-3 event-date text-right\">\n        <span about=\"@\" property=\"v-s:created\"></span>\n      </div>\n    </div>\n    <div rel=\"v-s:subJournal\" data-template=\"v-ui:SubJournalTemplate\"></div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInByZSIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsImhhc1ZhbHVlIiwicmVtb3ZlIiwiY2xpY2siLCJlIiwicHJldmVudERlZmF1bHQiLCJ0b2dnbGUiLCJjaGlsZHJlbiIsInRvZ2dsZUNsYXNzIiwiaHRtbCJdLCJzb3VyY2VzIjpbIi4uLy4uL29udG9sb2d5L2dlbmVyaWMtZnVuY3Rpb24vdGVtcGxhdGVzL3Ytd2ZfRGVjaXNpb25Gb3JtU3RhcnRlZEV2ZW50VGVtcGxhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuZXhwb3J0IGNvbnN0IHByZSA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgaWYgKCFpbmRpdmlkdWFsLmhhc1ZhbHVlKCd2LXdmOmluaXRpYXRvcicpKSB7XG4gICAgJCgnI2luaXRpYXRvcicsIHRlbXBsYXRlKS5yZW1vdmUoKTtcbiAgfVxuICAkKCcjZXhwJywgdGVtcGxhdGUpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICQoXCJkaXZbcmVsPSd2LXM6c3ViSm91cm5hbCddXCIsIHRlbXBsYXRlKS50b2dnbGUoKTtcbiAgICAkKHRoaXMpLmNoaWxkcmVuKCc6Zmlyc3QnKS50b2dnbGVDbGFzcygnZ2x5cGhpY29uLWNoZXZyb24tZG93biBnbHlwaGljb24tY2hldnJvbi1yaWdodCcpO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBodG1sID0gYFxuICA8ZGl2IGNsYXNzPVwiam91cm5hbC1yZWNvcmRcIj5cbiAgICA8aHIgY2xhc3M9XCJtYXJnaW4tc21cIiAvPlxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMiBjb2wtc20tMyBldmVudC10eXBlXCI+XG4gICAgICAgIDxhIGlkPVwiZXhwXCIgaHJlZj1cIiNcIj48c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tY2hldnJvbi1kb3duXCI+PC9zcGFuPjwvYT5cbiAgICAgICAgPHN0cm9uZyByZWw9XCJyZGY6dHlwZVwiIGRhdGEtdGVtcGxhdGU9XCJ2LXVpOkxhYmVsVGVtcGxhdGVcIj48L3N0cm9uZz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC04IGNvbC1zbS02IGV2ZW50LWRlc2NcIj5cbiAgICAgICAgPGRpdiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L2Rpdj5cbiAgICAgICAgPHNwYW4gaWQ9XCJpbml0aWF0b3JcIj5cbiAgICAgICAgICA8c3BhbiBhYm91dD1cInYtd2Y6aW5pdGlhdG9yXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9zcGFuPjpcbiAgICAgICAgICA8ZW0gcmVsPVwidi13Zjppbml0aWF0b3JcIiBkYXRhLXRlbXBsYXRlPVwidi11aTpMYWJlbFRlbXBsYXRlXCI+PC9lbT5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTIgY29sLXNtLTMgZXZlbnQtZGF0ZSB0ZXh0LXJpZ2h0XCI+XG4gICAgICAgIDxzcGFuIGFib3V0PVwiQFwiIHByb3BlcnR5PVwidi1zOmNyZWF0ZWRcIj48L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IHJlbD1cInYtczpzdWJKb3VybmFsXCIgZGF0YS10ZW1wbGF0ZT1cInYtdWk6U3ViSm91cm5hbFRlbXBsYXRlXCI+PC9kaXY+XG4gIDwvZGl2PlxuYDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7TUFBT0EsQ0FBQyxHQUFBQyxPQUFBLENBQUFDLE9BQUE7SUFBQTtJQUFBQyxPQUFBLFdBQUFBLENBQUE7TUFBQUMsT0FBQSxRQUVLQyxHQUFHLEdBQUcsU0FBTkEsR0FBR0EsQ0FBYUMsVUFBVSxFQUFFQyxRQUFRLEVBQUVDLFNBQVMsRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUU7UUFDekVILFFBQVEsR0FBR1AsQ0FBQyxDQUFDTyxRQUFRLENBQUM7UUFDdEJDLFNBQVMsR0FBR1IsQ0FBQyxDQUFDUSxTQUFTLENBQUM7UUFFeEIsSUFBSSxDQUFDRixVQUFVLENBQUNLLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1VBQzFDWCxDQUFDLENBQUMsWUFBWSxFQUFFTyxRQUFRLENBQUMsQ0FBQ0ssTUFBTSxFQUFFO1FBQ3BDO1FBQ0FaLENBQUMsQ0FBQyxNQUFNLEVBQUVPLFFBQVEsQ0FBQyxDQUFDTSxLQUFLLENBQUMsVUFBVUMsQ0FBQyxFQUFFO1VBQ3JDQSxDQUFDLENBQUNDLGNBQWMsRUFBRTtVQUNsQmYsQ0FBQyxDQUFDLDJCQUEyQixFQUFFTyxRQUFRLENBQUMsQ0FBQ1MsTUFBTSxFQUFFO1VBQ2pEaEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDaUIsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDQyxXQUFXLENBQUMsZ0RBQWdELENBQUM7UUFDMUYsQ0FBQyxDQUFDO01BQ0osQ0FBQztNQUFBZCxPQUFBLFNBRVllLElBQUk7SUFBQTtFQUFBO0FBQUEifQ==