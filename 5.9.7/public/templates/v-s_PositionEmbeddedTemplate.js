"use strict";

System.register(["jquery", "/js/common/veda.js", "/js/common/backend.js"], function (_export, _context) {
  "use strict";

  var $, veda, Backend, pre, html;
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_jsCommonVedaJs) {
      veda = _jsCommonVedaJs.default;
    }, function (_jsCommonBackendJs) {
      Backend = _jsCommonBackendJs.default;
    }],
    execute: function () {
      _export("pre", pre = function pre(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        template.on('validate', function () {
          var result = {};
          if (!individual.hasValue('v-s:subjectCode')) {
            result['v-s:subjectCode'] = {
              state: false,
              cause: ['v-ui:minCardinality']
            };
          }
          if (!individual.hasValue('rdfs:label')) {
            result['rdfs:label'] = {
              state: false,
              cause: ['v-ui:minCardinality']
            };
          }
          if (!individual.hasValue('v-s:parentOrganization')) {
            result['v-s:parentOrganization'] = {
              state: false,
              cause: ['v-ui:minCardinality']
            };
          }
          if (!individual.hasValue('v-s:parentUnit')) {
            result['v-s:parentUnit'] = {
              state: false,
              cause: ['v-ui:minCardinality']
            };
          }
          if (individual.hasValue('rdfs:label') && individual.hasValue('v-s:parentUnit') && individual.isNew()) {
            var queryString = "'rdf:type'==='v-s:Position' && 'v-s:parentUnit'=='" + individual['v-s:parentUnit'][0].id + "' && 'rdfs:label'=='" + individual['rdfs:label'][0] + "'";
            Backend.query(veda.ticket, queryString).then(function (queryResult) {
              var tmp = queryResult.result;
              if (tmp.length == 0) {
                $('#warningOccupationName').addClass('hide');
              } else {
                $('#warningOccupationName').removeClass('hide');
              }
            });
          }
          if (individual.hasValue('v-s:subjectCode')) {
            var _queryString = "'rdf:type'==='v-s:Position' && 'v-s:parentOrganization'=='" + individual['v-s:parentOrganization'][0].id + "' && 'v-s:subjectCode'=='" + individual['v-s:subjectCode'][0] + "'";
            Backend.query(veda.ticket, _queryString).then(function (queryResult) {
              var tmp = queryResult.result;
              if (tmp.length == 0) {
                $('#warningOccupationSubCode').addClass('hide');
              } else {
                $('#warningOccupationSubCode').removeClass('hide');
              }
            });
          }
          template[0].dispatchEvent(new CustomEvent('validated', {
            detail: result
          }));
        });
      });
      _export("html", html = "\n  <div>\n    <div class=\"container sheet\">\n      <div id=\"warningOccupationName\" class=\"alert alert-warning hide\">\n        <span>\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435. \u0414\u043E\u043B\u0436\u043D\u043E\u0441\u0442\u044C \u0441 \u043F\u043E\u0445\u043E\u0436\u0438\u043C \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435\u043C \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442 \u0432 \u0434\u0430\u043D\u043D\u043E\u0439 \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u0438. \u0412\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u0412\u0430\u043C \u0441\u043B\u0435\u0434\u0443\u0435\u0442 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0435\u0435.</span>\n      </div>\n      <div id=\"warningOccupationSubCode\" class=\"alert alert-warning hide\">\n        <span>\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435. \u0414\u043E\u043B\u0436\u043D\u043E\u0441\u0442\u044C \u0441 \u0442\u0430\u043A\u0438\u043C \u043A\u043E\u0434\u043E\u043C \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442 \u0432 \u0434\u0430\u043D\u043D\u043E\u0439 \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u0438. </span>\n      </div>\n      <div class=\"row row-attribute\">\n        <div class=\"col-sm-3 col-xs-5\">\n          <label about=\"v-s:title\" property=\"rdfs:label\"></label>\n        </div>\n        <div class=\"col-sm-9 col-xs-7\">\n          <div property=\"rdfs:label\" class=\"view -edit -search\"></div>\n          <veda-control data-type=\"multilingualText\" property=\"rdfs:label\" class=\"-view edit search\"></veda-control>\n        </div>\n      </div>\n      <div class=\"row row-attribute\">\n        <div class=\"col-sm-3 col-xs-5\">\n          <label about=\"v-s:PositionCode\" property=\"rdfs:label\"></label>\n        </div>\n        <div class=\"col-sm-3 col-xs-3\">\n          <div property=\"v-s:subjectCode\" class=\"view -edit -search\"></div>\n          <veda-control data-type=\"string\" property=\"v-s:subjectCode\" class=\"-view edit search\"></veda-control>\n        </div>\n      </div>\n    </div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfanNDb21tb25WZWRhSnMiLCJ2ZWRhIiwiX2pzQ29tbW9uQmFja2VuZEpzIiwiQmFja2VuZCIsImV4ZWN1dGUiLCJfZXhwb3J0IiwicHJlIiwiaW5kaXZpZHVhbCIsInRlbXBsYXRlIiwiY29udGFpbmVyIiwibW9kZSIsImV4dHJhIiwib24iLCJyZXN1bHQiLCJoYXNWYWx1ZSIsInN0YXRlIiwiY2F1c2UiLCJpc05ldyIsInF1ZXJ5U3RyaW5nIiwiaWQiLCJxdWVyeSIsInRpY2tldCIsInRoZW4iLCJxdWVyeVJlc3VsdCIsInRtcCIsImxlbmd0aCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJkZXRhaWwiLCJodG1sIl0sInNvdXJjZXMiOlsiLi4vLi4vb250b2xvZ3kvYWJzdHJhY3QtZGljdGlvbmFyeS9vcmdhbml6YXRpb24vdGVtcGxhdGVzL3Ytc19Qb3NpdGlvbkVtYmVkZGVkVGVtcGxhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB2ZWRhIGZyb20gJy9qcy9jb21tb24vdmVkYS5qcyc7XG5pbXBvcnQgQmFja2VuZCBmcm9tICcvanMvY29tbW9uL2JhY2tlbmQuanMnO1xuXG5leHBvcnQgY29uc3QgcHJlID0gZnVuY3Rpb24gKGluZGl2aWR1YWwsIHRlbXBsYXRlLCBjb250YWluZXIsIG1vZGUsIGV4dHJhKSB7XG4gIHRlbXBsYXRlID0gJCh0ZW1wbGF0ZSk7XG4gIGNvbnRhaW5lciA9ICQoY29udGFpbmVyKTtcblxuICB0ZW1wbGF0ZS5vbigndmFsaWRhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgaWYgKCFpbmRpdmlkdWFsLmhhc1ZhbHVlKCd2LXM6c3ViamVjdENvZGUnKSkge1xuICAgICAgcmVzdWx0Wyd2LXM6c3ViamVjdENvZGUnXSA9IHtcbiAgICAgICAgc3RhdGU6IGZhbHNlLFxuICAgICAgICBjYXVzZTogWyd2LXVpOm1pbkNhcmRpbmFsaXR5J10sXG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAoIWluZGl2aWR1YWwuaGFzVmFsdWUoJ3JkZnM6bGFiZWwnKSkge1xuICAgICAgcmVzdWx0WydyZGZzOmxhYmVsJ10gPSB7XG4gICAgICAgIHN0YXRlOiBmYWxzZSxcbiAgICAgICAgY2F1c2U6IFsndi11aTptaW5DYXJkaW5hbGl0eSddLFxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKCFpbmRpdmlkdWFsLmhhc1ZhbHVlKCd2LXM6cGFyZW50T3JnYW5pemF0aW9uJykpIHtcbiAgICAgIHJlc3VsdFsndi1zOnBhcmVudE9yZ2FuaXphdGlvbiddID0ge1xuICAgICAgICBzdGF0ZTogZmFsc2UsXG4gICAgICAgIGNhdXNlOiBbJ3YtdWk6bWluQ2FyZGluYWxpdHknXSxcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICghaW5kaXZpZHVhbC5oYXNWYWx1ZSgndi1zOnBhcmVudFVuaXQnKSkge1xuICAgICAgcmVzdWx0Wyd2LXM6cGFyZW50VW5pdCddID0ge1xuICAgICAgICBzdGF0ZTogZmFsc2UsXG4gICAgICAgIGNhdXNlOiBbJ3YtdWk6bWluQ2FyZGluYWxpdHknXSxcbiAgICAgIH07XG4gICAgfVxuICAgIGlmIChpbmRpdmlkdWFsLmhhc1ZhbHVlKCdyZGZzOmxhYmVsJykgJiYgaW5kaXZpZHVhbC5oYXNWYWx1ZSgndi1zOnBhcmVudFVuaXQnKSAmJiBpbmRpdmlkdWFsLmlzTmV3KCkpIHtcbiAgICAgIGNvbnN0IHF1ZXJ5U3RyaW5nID1cbiAgICAgICAgXCIncmRmOnR5cGUnPT09J3YtczpQb3NpdGlvbicgJiYgJ3YtczpwYXJlbnRVbml0Jz09J1wiICsgaW5kaXZpZHVhbFsndi1zOnBhcmVudFVuaXQnXVswXS5pZCArIFwiJyAmJiAncmRmczpsYWJlbCc9PSdcIiArIGluZGl2aWR1YWxbJ3JkZnM6bGFiZWwnXVswXSArIFwiJ1wiO1xuICAgICAgQmFja2VuZC5xdWVyeSh2ZWRhLnRpY2tldCwgcXVlcnlTdHJpbmcpLnRoZW4oZnVuY3Rpb24gKHF1ZXJ5UmVzdWx0KSB7XG4gICAgICAgIGNvbnN0IHRtcCA9IHF1ZXJ5UmVzdWx0LnJlc3VsdDtcbiAgICAgICAgaWYgKHRtcC5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICQoJyN3YXJuaW5nT2NjdXBhdGlvbk5hbWUnKS5hZGRDbGFzcygnaGlkZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICQoJyN3YXJuaW5nT2NjdXBhdGlvbk5hbWUnKS5yZW1vdmVDbGFzcygnaGlkZScpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoaW5kaXZpZHVhbC5oYXNWYWx1ZSgndi1zOnN1YmplY3RDb2RlJykpIHtcbiAgICAgIGNvbnN0IHF1ZXJ5U3RyaW5nID1cbiAgICAgICAgXCIncmRmOnR5cGUnPT09J3YtczpQb3NpdGlvbicgJiYgJ3YtczpwYXJlbnRPcmdhbml6YXRpb24nPT0nXCIgK1xuICAgICAgICBpbmRpdmlkdWFsWyd2LXM6cGFyZW50T3JnYW5pemF0aW9uJ11bMF0uaWQgK1xuICAgICAgICBcIicgJiYgJ3YtczpzdWJqZWN0Q29kZSc9PSdcIiArXG4gICAgICAgIGluZGl2aWR1YWxbJ3YtczpzdWJqZWN0Q29kZSddWzBdICtcbiAgICAgICAgXCInXCI7XG4gICAgICBCYWNrZW5kLnF1ZXJ5KHZlZGEudGlja2V0LCBxdWVyeVN0cmluZykudGhlbihmdW5jdGlvbiAocXVlcnlSZXN1bHQpIHtcbiAgICAgICAgY29uc3QgdG1wID0gcXVlcnlSZXN1bHQucmVzdWx0O1xuICAgICAgICBpZiAodG1wLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgJCgnI3dhcm5pbmdPY2N1cGF0aW9uU3ViQ29kZScpLmFkZENsYXNzKCdoaWRlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJCgnI3dhcm5pbmdPY2N1cGF0aW9uU3ViQ29kZScpLnJlbW92ZUNsYXNzKCdoaWRlJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICB0ZW1wbGF0ZVswXS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgndmFsaWRhdGVkJywge2RldGFpbDogcmVzdWx0fSkpO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBodG1sID0gYFxuICA8ZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXIgc2hlZXRcIj5cbiAgICAgIDxkaXYgaWQ9XCJ3YXJuaW5nT2NjdXBhdGlvbk5hbWVcIiBjbGFzcz1cImFsZXJ0IGFsZXJ0LXdhcm5pbmcgaGlkZVwiPlxuICAgICAgICA8c3Bhbj7QktC90LjQvNCw0L3QuNC1LiDQlNC+0LvQttC90L7RgdGC0Ywg0YEg0L/QvtGF0L7QttC40Lwg0L3QsNC30LLQsNC90LjQtdC8INGD0LbQtSDRgdGD0YnQtdGB0YLQstGD0LXRgiDQsiDQtNCw0L3QvdC+0Lkg0L7RgNCz0LDQvdC40LfQsNGG0LjQuC4g0JLQvtC30LzQvtC20L3QviDQktCw0Lwg0YHQu9C10LTRg9C10YIg0LjRgdC/0L7Qu9GM0LfQvtCy0LDRgtGMINC10LUuPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGlkPVwid2FybmluZ09jY3VwYXRpb25TdWJDb2RlXCIgY2xhc3M9XCJhbGVydCBhbGVydC13YXJuaW5nIGhpZGVcIj5cbiAgICAgICAgPHNwYW4+0JLQvdC40LzQsNC90LjQtS4g0JTQvtC70LbQvdC+0YHRgtGMINGBINGC0LDQutC40Lwg0LrQvtC00L7QvCDRg9C20LUg0YHRg9GJ0LXRgdGC0LLRg9C10YIg0LIg0LTQsNC90L3QvtC5INC+0YDQs9Cw0L3QuNC30LDRhtC40LguIDwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInJvdyByb3ctYXR0cmlidXRlXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMyBjb2wteHMtNVwiPlxuICAgICAgICAgIDxsYWJlbCBhYm91dD1cInYtczp0aXRsZVwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvbGFiZWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTkgY29sLXhzLTdcIj5cbiAgICAgICAgICA8ZGl2IHByb3BlcnR5PVwicmRmczpsYWJlbFwiIGNsYXNzPVwidmlldyAtZWRpdCAtc2VhcmNoXCI+PC9kaXY+XG4gICAgICAgICAgPHZlZGEtY29udHJvbCBkYXRhLXR5cGU9XCJtdWx0aWxpbmd1YWxUZXh0XCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCIgY2xhc3M9XCItdmlldyBlZGl0IHNlYXJjaFwiPjwvdmVkYS1jb250cm9sPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInJvdyByb3ctYXR0cmlidXRlXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMyBjb2wteHMtNVwiPlxuICAgICAgICAgIDxsYWJlbCBhYm91dD1cInYtczpQb3NpdGlvbkNvZGVcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L2xhYmVsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0zIGNvbC14cy0zXCI+XG4gICAgICAgICAgPGRpdiBwcm9wZXJ0eT1cInYtczpzdWJqZWN0Q29kZVwiIGNsYXNzPVwidmlldyAtZWRpdCAtc2VhcmNoXCI+PC9kaXY+XG4gICAgICAgICAgPHZlZGEtY29udHJvbCBkYXRhLXR5cGU9XCJzdHJpbmdcIiBwcm9wZXJ0eT1cInYtczpzdWJqZWN0Q29kZVwiIGNsYXNzPVwiLXZpZXcgZWRpdCBzZWFyY2hcIj48L3ZlZGEtY29udHJvbD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5gO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztNQUFPQSxDQUFDLEdBQUFDLE9BQUEsQ0FBQUMsT0FBQTtJQUFBLGFBQUFDLGVBQUE7TUFDREMsSUFBSSxHQUFBRCxlQUFBLENBQUFELE9BQUE7SUFB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