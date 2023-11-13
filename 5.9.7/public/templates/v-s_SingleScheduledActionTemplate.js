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
        template.on('validate', function () {
          var result = {};
          if (individual.hasValue('v-s:dateToPlan') && individual.hasValue('v-s:hasPeriod')) {
            var dateToPlan = individual['v-s:dateToPlan'][0];
            var period = individual['v-s:hasPeriod'][0].id;
            var isDateToPlanValid = true;
            var now = new Date();
            var delta;
            if (period == 'd:jsc4p8dq5u4fm1sumekuifkw7r') {
              //час
              delta = 86400000 / 24;
            } else if (period == 'd:z8r34mi5y8rl8m4kbo3q69uw5d') {
              // день
              delta = 86400000;
            } else if (period == 'd:a21t5y3pswuewm8ohjexiqtxscr') {
              // неделя
              delta = 86400000 * 7;
            }
            if (period == 'd:fb27kxa3r98ilnkvmy99xc11p1') {
              // 2 недели
              delta = 86400000 * 14;
            } else if (period == 'd:pqauzdiqyls7pzrawelnh2zwj3') {
              // месяц
              delta = 86400000 * 30;
            } else if (period == 'd:d2cloqhm8yqaq8t68zi9iepc69') {
              // 2 месяца
              delta = 86400000 * 61;
            } else if (period == 'd:a28m44dm9yw04j7hf69r4i40sn5') {
              // квартал
              delta = 86400000 * 121;
            }
            if (period == 'd:p699yrkgnd7bamjaqwx305o5hi') {
              // год
              delta = 86400000 * 365;
            } else if (period == 'd:q3qlurph45v2trm8kfmmdqtj04') {
              // 2 года
              delta = 86400000 * 730;
            }
            if (+dateToPlan < +now + delta) {
              result['v-s:dateToPlan'] = {
                state: false,
                cause: ['v-ui:minCardinality']
              };
            }
          }
          template[0].dispatchEvent(new CustomEvent('validated', {
            detail: result
          }));
        });
        $('.action', template).click(function (e) {
          e.preventDefault();
          template[0].dispatchEvent(new Event(this.id));
        });
      });
      _export("html", html = "\n  <div class=\"panel panel-default\" style=\"margin-top: 20px\">\n    <div class=\"panel-body\">\n      <em about=\"v-s:description\" property=\"rdfs:label\"></em>\n      <div property=\"v-s:description\" class=\"view -edit -search\"></div>\n      <veda-control data-type=\"text\" rows=\"1\" property=\"v-s:description\" class=\"-view edit -search\"></veda-control>\n      <div class=\"row\">\n        <div class=\"col-md-5\">\n          <em about=\"v-s:responsible\" property=\"rdfs:label\"></em>\n          <div rel=\"v-s:responsible\" data-template=\"v-ui:LabelTemplate\" class=\"view -edit -search\"></div>\n          <veda-control data-type=\"link\" rel=\"v-s:responsible\" class=\"-view edit -search fulltext\"></veda-control>\n\n          <em about=\"v-s:controller\" property=\"rdfs:label\"></em>\n          <div rel=\"v-s:controller\" data-template=\"v-ui:LabelTemplate\" class=\"view -edit -search\"></div>\n          <veda-control data-type=\"link\" rel=\"v-s:controller\" class=\"-view edit -search fulltext\"></veda-control>\n        </div>\n        <div class=\"col-md-7\">\n          <div class=\"col-md-7\">\n            <em about=\"v-s:TaskPeriodBundle\" property=\"rdfs:label\"></em>\n            <div rel=\"v-s:hasPeriod\" class=\"view edit -search\" data-template=\"v-ui:LabelTemplate\"></div>\n            <veda-control data-type=\"link\" rel=\"v-s:hasPeriod\" class=\"-view edit search fulltext dropdown\"></veda-control>\n          </div>\n          <div class=\"col-md-5\">\n            <em about=\"v-s:TaskDateBundle\" property=\"rdfs:label\"></em>\n            <div property=\"v-s:dateToPlan\" class=\"view -edit -search\"></div>\n            <veda-control data-type=\"dateTime\" property=\"v-s:dateToPlan\" class=\"-view edit -search\"></veda-control>\n          </div>\n          <div class=\"col-md-7\">\n            <em about=\"v-s:TaskGiveAwatDateBundle\" property=\"rdfs:label\"></em>\n            <div property=\"v-s:dateToFact\" class=\"view edit -search\"></div>\n          </div>\n          <div class=\"col-md-5\">\n            <em about=\"v-s:hasStatus\" property=\"rdfs:label\"></em>\n            <div rel=\"v-s:hasStatus\" data-template=\"v-ui:LabelTemplate\" class=\"view edit -search\"></div>\n          </div>\n        </div>\n      </div>\n      <br />\n      <span about=\"@\" data-template=\"v-ui:StandardButtonsTemplate\" data-embedded=\"true\" data-buttons=\"save edit cancel delete\"></span>\n    </div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInByZSIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsIm9uIiwicmVzdWx0IiwiaGFzVmFsdWUiLCJkYXRlVG9QbGFuIiwicGVyaW9kIiwiaWQiLCJpc0RhdGVUb1BsYW5WYWxpZCIsIm5vdyIsIkRhdGUiLCJkZWx0YSIsInN0YXRlIiwiY2F1c2UiLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJkZXRhaWwiLCJjbGljayIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIkV2ZW50IiwiaHRtbCJdLCJzb3VyY2VzIjpbIi4uLy4uL29udG9sb2d5L2dlbmVyaWMtYXBwbGljYXRpb24vYWN0aW9uL3RlbXBsYXRlcy92LXNfU2luZ2xlU2NoZWR1bGVkQWN0aW9uVGVtcGxhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuZXhwb3J0IGNvbnN0IHByZSA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG4gIHRlbXBsYXRlLm9uKCd2YWxpZGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcblxuICAgIGlmIChpbmRpdmlkdWFsLmhhc1ZhbHVlKCd2LXM6ZGF0ZVRvUGxhbicpICYmIGluZGl2aWR1YWwuaGFzVmFsdWUoJ3YtczpoYXNQZXJpb2QnKSkge1xuICAgICAgY29uc3QgZGF0ZVRvUGxhbiA9IGluZGl2aWR1YWxbJ3YtczpkYXRlVG9QbGFuJ11bMF07XG4gICAgICBjb25zdCBwZXJpb2QgPSBpbmRpdmlkdWFsWyd2LXM6aGFzUGVyaW9kJ11bMF0uaWQ7XG4gICAgICBsZXQgaXNEYXRlVG9QbGFuVmFsaWQgPSB0cnVlO1xuICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgIGxldCBkZWx0YTtcbiAgICAgIGlmIChwZXJpb2QgPT0gJ2Q6anNjNHA4ZHE1dTRmbTFzdW1la3VpZmt3N3InKSB7IC8v0YfQsNGBXG4gICAgICAgIGRlbHRhID0gODY0MDAwMDAvMjQ7XG4gICAgICB9IGVsc2UgaWYgKHBlcmlvZCA9PSAnZDp6OHIzNG1pNXk4cmw4bTRrYm8zcTY5dXc1ZCcpIHsgLy8g0LTQtdC90YxcbiAgICAgICAgZGVsdGEgPSA4NjQwMDAwMDtcbiAgICAgIH0gZWxzZSBpZiAocGVyaW9kID09ICdkOmEyMXQ1eTNwc3d1ZXdtOG9oamV4aXF0eHNjcicpIHsgLy8g0L3QtdC00LXQu9GPXG4gICAgICAgIGRlbHRhID0gODY0MDAwMDAqNztcbiAgICAgIH0gaWYgKHBlcmlvZCA9PSAnZDpmYjI3a3hhM3I5OGlsbmt2bXk5OXhjMTFwMScpIHsgLy8gMiDQvdC10LTQtdC70LhcbiAgICAgICAgZGVsdGEgPSA4NjQwMDAwMCoxNDtcbiAgICAgIH0gZWxzZSBpZiAocGVyaW9kID09ICdkOnBxYXV6ZGlxeWxzN3B6cmF3ZWxuaDJ6d2ozJykgeyAvLyDQvNC10YHRj9GGXG4gICAgICAgIGRlbHRhID0gODY0MDAwMDAqMzA7XG4gICAgICB9IGVsc2UgaWYgKHBlcmlvZCA9PSAnZDpkMmNsb3FobTh5cWFxOHQ2OHppOWllcGM2OScpIHsgLy8gMiDQvNC10YHRj9GG0LBcbiAgICAgICAgZGVsdGEgPSA4NjQwMDAwMCo2MTtcbiAgICAgIH0gZWxzZSBpZiAocGVyaW9kID09ICdkOmEyOG00NGRtOXl3MDRqN2hmNjlyNGk0MHNuNScpIHsgLy8g0LrQstCw0YDRgtCw0LtcbiAgICAgICAgZGVsdGEgPSA4NjQwMDAwMCoxMjE7XG4gICAgICB9IGlmIChwZXJpb2QgPT0gJ2Q6cDY5OXlya2duZDdiYW1qYXF3eDMwNW81aGknKSB7IC8vINCz0L7QtFxuICAgICAgICBkZWx0YSA9IDg2NDAwMDAwKjM2NTtcbiAgICAgIH0gZWxzZSBpZiAocGVyaW9kID09ICdkOnEzcWx1cnBoNDV2MnRybThrZm1tZHF0ajA0JykgeyAvLyAyINCz0L7QtNCwXG4gICAgICAgIGRlbHRhID0gODY0MDAwMDAqNzMwO1xuICAgICAgfVxuICAgICAgaWYgKCtkYXRlVG9QbGFuIDwgK25vdyArIGRlbHRhKSB7XG4gICAgICAgIHJlc3VsdFsndi1zOmRhdGVUb1BsYW4nXSA9IHtcbiAgICAgICAgICBzdGF0ZTogZmFsc2UsXG4gICAgICAgICAgY2F1c2U6IFsndi11aTptaW5DYXJkaW5hbGl0eSddXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGVtcGxhdGVbMF0uZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3ZhbGlkYXRlZCcsIHtkZXRhaWw6IHJlc3VsdH0pKTtcbiAgfSk7XG5cbiAgJCgnLmFjdGlvbicsIHRlbXBsYXRlKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0ZW1wbGF0ZVswXS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCh0aGlzLmlkKSk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGh0bWwgPSBgXG4gIDxkaXYgY2xhc3M9XCJwYW5lbCBwYW5lbC1kZWZhdWx0XCIgc3R5bGU9XCJtYXJnaW4tdG9wOiAyMHB4XCI+XG4gICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj5cbiAgICAgIDxlbSBhYm91dD1cInYtczpkZXNjcmlwdGlvblwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvZW0+XG4gICAgICA8ZGl2IHByb3BlcnR5PVwidi1zOmRlc2NyaXB0aW9uXCIgY2xhc3M9XCJ2aWV3IC1lZGl0IC1zZWFyY2hcIj48L2Rpdj5cbiAgICAgIDx2ZWRhLWNvbnRyb2wgZGF0YS10eXBlPVwidGV4dFwiIHJvd3M9XCIxXCIgcHJvcGVydHk9XCJ2LXM6ZGVzY3JpcHRpb25cIiBjbGFzcz1cIi12aWV3IGVkaXQgLXNlYXJjaFwiPjwvdmVkYS1jb250cm9sPlxuICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTVcIj5cbiAgICAgICAgICA8ZW0gYWJvdXQ9XCJ2LXM6cmVzcG9uc2libGVcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L2VtPlxuICAgICAgICAgIDxkaXYgcmVsPVwidi1zOnJlc3BvbnNpYmxlXCIgZGF0YS10ZW1wbGF0ZT1cInYtdWk6TGFiZWxUZW1wbGF0ZVwiIGNsYXNzPVwidmlldyAtZWRpdCAtc2VhcmNoXCI+PC9kaXY+XG4gICAgICAgICAgPHZlZGEtY29udHJvbCBkYXRhLXR5cGU9XCJsaW5rXCIgcmVsPVwidi1zOnJlc3BvbnNpYmxlXCIgY2xhc3M9XCItdmlldyBlZGl0IC1zZWFyY2ggZnVsbHRleHRcIj48L3ZlZGEtY29udHJvbD5cblxuICAgICAgICAgIDxlbSBhYm91dD1cInYtczpjb250cm9sbGVyXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9lbT5cbiAgICAgICAgICA8ZGl2IHJlbD1cInYtczpjb250cm9sbGVyXCIgZGF0YS10ZW1wbGF0ZT1cInYtdWk6TGFiZWxUZW1wbGF0ZVwiIGNsYXNzPVwidmlldyAtZWRpdCAtc2VhcmNoXCI+PC9kaXY+XG4gICAgICAgICAgPHZlZGEtY29udHJvbCBkYXRhLXR5cGU9XCJsaW5rXCIgcmVsPVwidi1zOmNvbnRyb2xsZXJcIiBjbGFzcz1cIi12aWV3IGVkaXQgLXNlYXJjaCBmdWxsdGV4dFwiPjwvdmVkYS1jb250cm9sPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC03XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC03XCI+XG4gICAgICAgICAgICA8ZW0gYWJvdXQ9XCJ2LXM6VGFza1BlcmlvZEJ1bmRsZVwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvZW0+XG4gICAgICAgICAgICA8ZGl2IHJlbD1cInYtczpoYXNQZXJpb2RcIiBjbGFzcz1cInZpZXcgZWRpdCAtc2VhcmNoXCIgZGF0YS10ZW1wbGF0ZT1cInYtdWk6TGFiZWxUZW1wbGF0ZVwiPjwvZGl2PlxuICAgICAgICAgICAgPHZlZGEtY29udHJvbCBkYXRhLXR5cGU9XCJsaW5rXCIgcmVsPVwidi1zOmhhc1BlcmlvZFwiIGNsYXNzPVwiLXZpZXcgZWRpdCBzZWFyY2ggZnVsbHRleHQgZHJvcGRvd25cIj48L3ZlZGEtY29udHJvbD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTVcIj5cbiAgICAgICAgICAgIDxlbSBhYm91dD1cInYtczpUYXNrRGF0ZUJ1bmRsZVwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvZW0+XG4gICAgICAgICAgICA8ZGl2IHByb3BlcnR5PVwidi1zOmRhdGVUb1BsYW5cIiBjbGFzcz1cInZpZXcgLWVkaXQgLXNlYXJjaFwiPjwvZGl2PlxuICAgICAgICAgICAgPHZlZGEtY29udHJvbCBkYXRhLXR5cGU9XCJkYXRlVGltZVwiIHByb3BlcnR5PVwidi1zOmRhdGVUb1BsYW5cIiBjbGFzcz1cIi12aWV3IGVkaXQgLXNlYXJjaFwiPjwvdmVkYS1jb250cm9sPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtN1wiPlxuICAgICAgICAgICAgPGVtIGFib3V0PVwidi1zOlRhc2tHaXZlQXdhdERhdGVCdW5kbGVcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L2VtPlxuICAgICAgICAgICAgPGRpdiBwcm9wZXJ0eT1cInYtczpkYXRlVG9GYWN0XCIgY2xhc3M9XCJ2aWV3IGVkaXQgLXNlYXJjaFwiPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtNVwiPlxuICAgICAgICAgICAgPGVtIGFib3V0PVwidi1zOmhhc1N0YXR1c1wiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvZW0+XG4gICAgICAgICAgICA8ZGl2IHJlbD1cInYtczpoYXNTdGF0dXNcIiBkYXRhLXRlbXBsYXRlPVwidi11aTpMYWJlbFRlbXBsYXRlXCIgY2xhc3M9XCJ2aWV3IGVkaXQgLXNlYXJjaFwiPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGJyIC8+XG4gICAgICA8c3BhbiBhYm91dD1cIkBcIiBkYXRhLXRlbXBsYXRlPVwidi11aTpTdGFuZGFyZEJ1dHRvbnNUZW1wbGF0ZVwiIGRhdGEtZW1iZWRkZWQ9XCJ0cnVlXCIgZGF0YS1idXR0b25zPVwic2F2ZSBlZGl0IGNhbmNlbCBkZWxldGVcIj48L3NwYW4+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuYDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7TUFBT0EsQ0FBQyxHQUFBQyxPQUFBLENBQUFDLE9BQUE7SUFBQTtJQUFBQyxPQUFBLFdBQUFBLENBQUE7TUFBQUMsT0FBQSxRQUVLQyxHQUFHLEdBQUcsU0FBTkEsR0FBR0EsQ0FBYUMsVUFBVSxFQUFFQyxRQUFRLEVBQUVDLFNBQVMsRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUU7UUFDekVILFFBQVEsR0FBR1AsQ0FBQyxDQUFDTyxRQUFRLENBQUM7UUFDdEJDLFNBQVMsR0FBR1IsQ0FBQyxDQUFDUSxTQUFTLENBQUM7UUFDeEJELFFBQVEsQ0FBQ0ksRUFBRSxDQUFDLFVBQVUsRUFBRSxZQUFZO1VBQ2xDLElBQU1DLE1BQU0sR0FBRyxDQUFDLENBQUM7VUFFakIsSUFBSU4sVUFBVSxDQUFDTyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsSUFBSVAsVUFBVSxDQUFDTyxRQUFRLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDakYsSUFBTUMsVUFBVSxHQUFHUixVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEQsSUFBTVMsTUFBTSxHQUFHVCxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNVLEVBQUU7WUFDaEQsSUFBSUMsaUJBQWlCLEdBQUcsSUFBSTtZQUM1QixJQUFNQyxHQUFHLEdBQUcsSUFBSUMsSUFBSSxFQUFFO1lBQ3RCLElBQUlDLEtBQUs7WUFDVCxJQUFJTCxNQUFNLElBQUksOEJBQThCLEVBQUU7Y0FBRTtjQUM5Q0ssS0FBSyxHQUFHLFFBQVEsR0FBQyxFQUFFO1lBQ3JCLENBQUMsTUFBTSxJQUFJTCxNQUFNLElBQUksOEJBQThCLEVBQUU7Y0FBRTtjQUNyREssS0FBSyxHQUFHLFFBQVE7WUFDbEIsQ0FBQyxNQUFNLElBQUlMLE1BQU0sSUFBSSwrQkFBK0IsRUFBRTtjQUFFO2NBQ3RESyxLQUFLLEdBQUcsUUFBUSxHQUFDLENBQUM7WUFDcEI7WUFBRSxJQUFJTCxNQUFNLElBQUksOEJBQThCLEVBQUU7Y0FBRTtjQUNoREssS0FBSyxHQUFHLFFBQVEsR0FBQyxFQUFFO1lBQ3JCLENBQUMsTUFBTSxJQUFJTCxNQUFNLElBQUksOEJBQThCLEVBQUU7Y0FBRTtjQUNyREssS0FBSyxHQUFHLFFBQVEsR0FBQyxFQUFFO1lBQ3JCLENBQUMsTUFBTSxJQUFJTCxNQUFNLElBQUksOEJBQThCLEVBQUU7Y0FBRTtjQUNyREssS0FBSyxHQUFHLFFBQVEsR0FBQyxFQUFFO1lBQ3JCLENBQUMsTUFBTSxJQUFJTCxNQUFNLElBQUksK0JBQStCLEVBQUU7Y0FBRTtjQUN0REssS0FBSyxHQUFHLFFBQVEsR0FBQyxHQUFHO1lBQ3RCO1lBQUUsSUFBSUwsTUFBTSxJQUFJLDhCQUE4QixFQUFFO2NBQUU7Y0FDaERLLEtBQUssR0FBRyxRQUFRLEdBQUMsR0FBRztZQUN0QixDQUFDLE1BQU0sSUFBSUwsTUFBTSxJQUFJLDhCQUE4QixFQUFFO2NBQUU7Y0FDckRLLEtBQUssR0FBRyxRQUFRLEdBQUMsR0FBRztZQUN0QjtZQUNBLElBQUksQ0FBQ04sVUFBVSxHQUFHLENBQUNJLEdBQUcsR0FBR0UsS0FBSyxFQUFFO2NBQzlCUixNQUFNLENBQUMsZ0JBQWdCLENBQUMsR0FBRztnQkFDekJTLEtBQUssRUFBRSxLQUFLO2dCQUNaQyxLQUFLLEVBQUUsQ0FBQyxxQkFBcUI7Y0FDL0IsQ0FBQztZQUNIO1VBQ0Y7VUFDQWYsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDZ0IsYUFBYSxDQUFDLElBQUlDLFdBQVcsQ0FBQyxXQUFXLEVBQUU7WUFBQ0MsTUFBTSxFQUFFYjtVQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzNFLENBQUMsQ0FBQztRQUVGWixDQUFDLENBQUMsU0FBUyxFQUFFTyxRQUFRLENBQUMsQ0FBQ21CLEtBQUssQ0FBQyxVQUFVQyxDQUFDLEVBQUU7VUFDeENBLENBQUMsQ0FBQ0MsY0FBYyxFQUFFO1VBQ2xCckIsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDZ0IsYUFBYSxDQUFDLElBQUlNLEtBQUssQ0FBQyxJQUFJLENBQUNiLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLENBQUMsQ0FBQztNQUNKLENBQUM7TUFBQVosT0FBQSxTQUVZMEIsSUFBSTtJQUFBO0VBQUE7QUFBQSJ9