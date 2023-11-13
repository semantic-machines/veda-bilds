"use strict";

System.register(["jquery", "/js/common/veda.js", "/js/common/backend.js"], function (_export, _context) {
  "use strict";

  var $, veda, Backend, pre, post, html;
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
          if (!individual.hasValue('v-s:login')) {
            result['v-s:login'] = {
              state: false,
              cause: ['v-ui:minCardinality']
            };
          }
          if (!individual.hasValue('v-s:mailbox')) {
            result['v-s:mailbox'] = {
              state: false,
              cause: ['v-ui:minCardinality']
            };
          }
          if (!individual.hasValue('v-s:origin')) {
            result['v-s:origin'] = {
              state: false,
              cause: ['v-ui:minCardinality']
            };
          }
          if (!individual.hasValue('v-s:authOrigin')) {
            result['v-s:authOrigin'] = {
              state: false,
              cause: ['v-ui:minCardinality']
            };
          }
          if (individual.hasValue('v-s:login')) {
            var queryString = "'rdf:type'=='v-s:Account' && 'v-s:login'=='" + individual['v-s:login'][0] + "'";
            Backend.query(veda.ticket, queryString).then(function (queryResult) {
              var tmp = queryResult.result;
              if (tmp.length == 0) {
                $('#warningAccount').addClass('hide');
              } else {
                $('#warningAccount').removeClass('hide');
              }
            });
          }
          template[0].dispatchEvent(new CustomEvent('validated', {
            detail: result
          }));
        });
      });
      _export("post", post = function post(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        if (mode === 'edit' && individual.isNew()) {
          individual['v-s:authOrigin'] = ['veda'];
        }
      });
      _export("html", html = "\n  <div>\n    <div class=\"container sheet\">\n      <div id=\"warningAccount\" class=\"alert alert-danger hide\">\n        <span>\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435. \u0410\u043A\u043A\u0430\u0443\u043D\u0442 \u0441 \u0442\u0430\u043A\u0438\u043C \u043B\u043E\u0433\u0438\u043D\u043E\u043C \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442!!!</span>\n      </div>\n      <div class=\"row row-attribute\">\n        <div class=\"col-sm-3 col-xs-5\">\n          <label about=\"rdfs:label\" property=\"rdfs:label\"></label>\n        </div>\n        <div class=\"col-sm-9 col-xs-7\">\n          <div property=\"rdfs:label\" class=\"view -edit -search\"></div>\n          <veda-control data-type=\"multilingualString\" property=\"rdfs:label\" class=\"-view edit search\"></veda-control>\n        </div>\n      </div>\n      <div class=\"row row-attribute\">\n        <div class=\"col-sm-3 col-xs-5\">\n          <label about=\"v-s:login\" property=\"rdfs:label\"></label>\n        </div>\n        <div class=\"col-sm-9 col-xs-7\">\n          <div property=\"v-s:login\" class=\"view -edit -search\"></div>\n          <veda-control data-type=\"string\" property=\"v-s:login\" class=\"-view edit search\"></veda-control>\n        </div>\n      </div>\n      <div class=\"row row-attribute\">\n        <div class=\"col-sm-3 col-xs-5\">\n          <label about=\"v-s:mailbox\" property=\"rdfs:label\"></label>\n        </div>\n        <div class=\"col-sm-9 col-xs-7\">\n          <div property=\"v-s:mailbox\" class=\"view -edit -search\"></div>\n          <veda-control data-type=\"string\" property=\"v-s:mailbox\" class=\"-view edit search\"></veda-control>\n        </div>\n      </div>\n      <div class=\"row row-attribute\">\n        <div class=\"col-sm-3 col-xs-5\">\n          <label about=\"v-s:authOrigin\" property=\"rdfs:label\"></label>\n        </div>\n        <div class=\"col-sm-9 col-xs-7\">\n          <div property=\"v-s:authOrigin\" class=\"view -edit -search\"></div>\n          <veda-control data-type=\"string\" property=\"v-s:authOrigin\" class=\"-view edit search\"></veda-control>\n        </div>\n      </div>\n    </div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfanNDb21tb25WZWRhSnMiLCJ2ZWRhIiwiX2pzQ29tbW9uQmFja2VuZEpzIiwiQmFja2VuZCIsImV4ZWN1dGUiLCJfZXhwb3J0IiwicHJlIiwiaW5kaXZpZHVhbCIsInRlbXBsYXRlIiwiY29udGFpbmVyIiwibW9kZSIsImV4dHJhIiwib24iLCJyZXN1bHQiLCJoYXNWYWx1ZSIsInN0YXRlIiwiY2F1c2UiLCJxdWVyeVN0cmluZyIsInF1ZXJ5IiwidGlja2V0IiwidGhlbiIsInF1ZXJ5UmVzdWx0IiwidG1wIiwibGVuZ3RoIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsImRldGFpbCIsInBvc3QiLCJpc05ldyIsImh0bWwiXSwic291cmNlcyI6WyIuLi8uLi9vbnRvbG9neS9hYnN0cmFjdC1kaWN0aW9uYXJ5L29yZ2FuaXphdGlvbi90ZW1wbGF0ZXMvdi1zX0FjY291bnRFbWJlZGRlZFRlbXBsYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgdmVkYSBmcm9tICcvanMvY29tbW9uL3ZlZGEuanMnO1xuaW1wb3J0IEJhY2tlbmQgZnJvbSAnL2pzL2NvbW1vbi9iYWNrZW5kLmpzJztcblxuZXhwb3J0IGNvbnN0IHByZSA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgdGVtcGxhdGUub24oJ3ZhbGlkYXRlJywgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGlmICghaW5kaXZpZHVhbC5oYXNWYWx1ZSgndi1zOmxvZ2luJykpIHtcbiAgICAgIHJlc3VsdFsndi1zOmxvZ2luJ10gPSB7XG4gICAgICAgIHN0YXRlOiBmYWxzZSxcbiAgICAgICAgY2F1c2U6IFsndi11aTptaW5DYXJkaW5hbGl0eSddLFxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKCFpbmRpdmlkdWFsLmhhc1ZhbHVlKCd2LXM6bWFpbGJveCcpKSB7XG4gICAgICByZXN1bHRbJ3YtczptYWlsYm94J10gPSB7XG4gICAgICAgIHN0YXRlOiBmYWxzZSxcbiAgICAgICAgY2F1c2U6IFsndi11aTptaW5DYXJkaW5hbGl0eSddLFxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKCFpbmRpdmlkdWFsLmhhc1ZhbHVlKCd2LXM6b3JpZ2luJykpIHtcbiAgICAgIHJlc3VsdFsndi1zOm9yaWdpbiddID0ge1xuICAgICAgICBzdGF0ZTogZmFsc2UsXG4gICAgICAgIGNhdXNlOiBbJ3YtdWk6bWluQ2FyZGluYWxpdHknXSxcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICghaW5kaXZpZHVhbC5oYXNWYWx1ZSgndi1zOmF1dGhPcmlnaW4nKSkge1xuICAgICAgcmVzdWx0Wyd2LXM6YXV0aE9yaWdpbiddID0ge1xuICAgICAgICBzdGF0ZTogZmFsc2UsXG4gICAgICAgIGNhdXNlOiBbJ3YtdWk6bWluQ2FyZGluYWxpdHknXSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKGluZGl2aWR1YWwuaGFzVmFsdWUoJ3Ytczpsb2dpbicpKSB7XG4gICAgICBjb25zdCBxdWVyeVN0cmluZyA9IFwiJ3JkZjp0eXBlJz09J3YtczpBY2NvdW50JyAmJiAndi1zOmxvZ2luJz09J1wiICsgaW5kaXZpZHVhbFsndi1zOmxvZ2luJ11bMF0gKyBcIidcIjtcbiAgICAgIEJhY2tlbmQucXVlcnkodmVkYS50aWNrZXQsIHF1ZXJ5U3RyaW5nKS50aGVuKGZ1bmN0aW9uIChxdWVyeVJlc3VsdCkge1xuICAgICAgICBjb25zdCB0bXAgPSBxdWVyeVJlc3VsdC5yZXN1bHQ7XG4gICAgICAgIGlmICh0bXAubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAkKCcjd2FybmluZ0FjY291bnQnKS5hZGRDbGFzcygnaGlkZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICQoJyN3YXJuaW5nQWNjb3VudCcpLnJlbW92ZUNsYXNzKCdoaWRlJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICB0ZW1wbGF0ZVswXS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgndmFsaWRhdGVkJywge2RldGFpbDogcmVzdWx0fSkpO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBwb3N0ID0gZnVuY3Rpb24gKGluZGl2aWR1YWwsIHRlbXBsYXRlLCBjb250YWluZXIsIG1vZGUsIGV4dHJhKSB7XG4gIHRlbXBsYXRlID0gJCh0ZW1wbGF0ZSk7XG4gIGNvbnRhaW5lciA9ICQoY29udGFpbmVyKTtcblxuICBpZiAobW9kZSA9PT0gJ2VkaXQnICYmIGluZGl2aWR1YWwuaXNOZXcoKSkge1xuICAgIGluZGl2aWR1YWxbJ3YtczphdXRoT3JpZ2luJ10gPSBbJ3ZlZGEnXTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGh0bWwgPSBgXG4gIDxkaXY+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lciBzaGVldFwiPlxuICAgICAgPGRpdiBpZD1cIndhcm5pbmdBY2NvdW50XCIgY2xhc3M9XCJhbGVydCBhbGVydC1kYW5nZXIgaGlkZVwiPlxuICAgICAgICA8c3Bhbj7QktC90LjQvNCw0L3QuNC1LiDQkNC60LrQsNGD0L3RgiDRgSDRgtCw0LrQuNC8INC70L7Qs9C40L3QvtC8INGD0LbQtSDRgdGD0YnQtdGB0YLQstGD0LXRgiEhITwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInJvdyByb3ctYXR0cmlidXRlXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMyBjb2wteHMtNVwiPlxuICAgICAgICAgIDxsYWJlbCBhYm91dD1cInJkZnM6bGFiZWxcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L2xhYmVsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS05IGNvbC14cy03XCI+XG4gICAgICAgICAgPGRpdiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIiBjbGFzcz1cInZpZXcgLWVkaXQgLXNlYXJjaFwiPjwvZGl2PlxuICAgICAgICAgIDx2ZWRhLWNvbnRyb2wgZGF0YS10eXBlPVwibXVsdGlsaW5ndWFsU3RyaW5nXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCIgY2xhc3M9XCItdmlldyBlZGl0IHNlYXJjaFwiPjwvdmVkYS1jb250cm9sPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInJvdyByb3ctYXR0cmlidXRlXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMyBjb2wteHMtNVwiPlxuICAgICAgICAgIDxsYWJlbCBhYm91dD1cInYtczpsb2dpblwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvbGFiZWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTkgY29sLXhzLTdcIj5cbiAgICAgICAgICA8ZGl2IHByb3BlcnR5PVwidi1zOmxvZ2luXCIgY2xhc3M9XCJ2aWV3IC1lZGl0IC1zZWFyY2hcIj48L2Rpdj5cbiAgICAgICAgICA8dmVkYS1jb250cm9sIGRhdGEtdHlwZT1cInN0cmluZ1wiIHByb3BlcnR5PVwidi1zOmxvZ2luXCIgY2xhc3M9XCItdmlldyBlZGl0IHNlYXJjaFwiPjwvdmVkYS1jb250cm9sPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInJvdyByb3ctYXR0cmlidXRlXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMyBjb2wteHMtNVwiPlxuICAgICAgICAgIDxsYWJlbCBhYm91dD1cInYtczptYWlsYm94XCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9sYWJlbD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tOSBjb2wteHMtN1wiPlxuICAgICAgICAgIDxkaXYgcHJvcGVydHk9XCJ2LXM6bWFpbGJveFwiIGNsYXNzPVwidmlldyAtZWRpdCAtc2VhcmNoXCI+PC9kaXY+XG4gICAgICAgICAgPHZlZGEtY29udHJvbCBkYXRhLXR5cGU9XCJzdHJpbmdcIiBwcm9wZXJ0eT1cInYtczptYWlsYm94XCIgY2xhc3M9XCItdmlldyBlZGl0IHNlYXJjaFwiPjwvdmVkYS1jb250cm9sPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInJvdyByb3ctYXR0cmlidXRlXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMyBjb2wteHMtNVwiPlxuICAgICAgICAgIDxsYWJlbCBhYm91dD1cInYtczphdXRoT3JpZ2luXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9sYWJlbD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tOSBjb2wteHMtN1wiPlxuICAgICAgICAgIDxkaXYgcHJvcGVydHk9XCJ2LXM6YXV0aE9yaWdpblwiIGNsYXNzPVwidmlldyAtZWRpdCAtc2VhcmNoXCI+PC9kaXY+XG4gICAgICAgICAgPHZlZGEtY29udHJvbCBkYXRhLXR5cGU9XCJzdHJpbmdcIiBwcm9wZXJ0eT1cInYtczphdXRoT3JpZ2luXCIgY2xhc3M9XCItdmlldyBlZGl0IHNlYXJjaFwiPjwvdmVkYS1jb250cm9sPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbmA7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O01BQU9BLENBQUMsR0FBQUMsT0FBQSxDQUFBQyxPQUFBO0lBQUEsYUFBQUMsZUFBQTtNQUNEQyxJQUFJLEdBQUFELGVBQUEsQ0FBQUQsT0FBQTtJQUFBLGFBQUFHLGtCQUFBO01BQ0pDLE9BQU8sR0FBQUQsa0JBQUEsQ0FBQUgsT0FBQTtJQUFBO0lBQUFLLE9BQUEsV0FBQUEsQ0FBQTtNQUFBQyxP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