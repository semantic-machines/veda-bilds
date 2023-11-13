"use strict";

System.register(["jquery", "/js/common/veda.js", "/js/common/backend.js", "/js/common/individual_model.js"], function (_export, _context) {
  "use strict";

  var $, veda, Backend, IndividualModel, post, html;
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_jsCommonVedaJs) {
      veda = _jsCommonVedaJs.default;
    }, function (_jsCommonBackendJs) {
      Backend = _jsCommonBackendJs.default;
    }, function (_jsCommonIndividual_modelJs) {
      IndividualModel = _jsCommonIndividual_modelJs.default;
    }],
    execute: function () {
      _export("post", post = function post(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        individual.on('propertyModified', handler);
        template.one('remove', function () {
          individual.off('propertyModified', handler);
        });
        function handler(property_uri) {
          if ((property_uri === 'v-s:sum' || property_uri === 'v-s:hasCurrency') && individual.hasValue('v-s:sum') && individual.hasValue('v-s:hasCurrency')) {
            Backend.query({
              ticket: veda.ticket,
              query: "'rdf:type'==='v-s:CurrencyExchangeRate' && 'v-s:hasCurrencySource'=='" + individual['v-s:hasCurrency'][0].id + "' && 'v-s:hasCurrencyTarget'=='d:currency_rub' && 'v-s:hasCurrencyExchangeRatePurpose'=='v-s:CER_Purpose_current'",
              sort: "'v-s:date' asc",
              top: 1,
              async: true
            }).then(function (queryResult) {
              var CER_uri = queryResult.result[0];
              if (CER_uri) {
                return new IndividualModel(CER_uri).load();
              } else {
                return Promise.resolve();
              }
            }).then(function (CER) {
              if (CER) {
                var rate = CER['v-s:rate'][0];
                individual['v-s:sumRuble'] = [individual['v-s:sum'][0] * rate];
                individual['v-s:date'] = [new Date()];
              } else {
                individual['v-s:sumRuble'] = [];
                individual['v-s:date'] = [];
              }
            });
          }
        }
      });
      _export("html", html = "\n  <div class=\"panel panel-default\">\n    <div class=\"panel-body\">\n      <div class=\"row\">\n        <div class=\"col-md-3\">\n          <em about=\"v-s:sum\" property=\"rdfs:label\" class=\"margin-sm\"></em>\n          <span property=\"v-s:sum\" class=\"view -edit search\"></span>\n          <veda-control data-type=\"decimal\" property=\"v-s:sum\" class=\"-view edit search\"></veda-control>\n        </div>\n        <div class=\"col-md-3\">\n          <em about=\"v-s:hasCurrency\" property=\"rdfs:label\" class=\"margin-sm\"></em>\n          <span rel=\"v-s:hasCurrency\" class=\"view -edit search\" data-template=\"v-ui:LabelTemplate\"></span>\n          <veda-control data-type=\"link\" rel=\"v-s:hasCurrency\" class=\"-view edit search fulltext dropdown\"></veda-control>\n        </div>\n        <div class=\"col-md-3 view edit -search\">\n          <em about=\"v-s:sumRuble\" property=\"rdfs:label\" class=\"margin-sm\"></em>\n          <span about=\"@\" property=\"v-s:sumRuble\" class=\"view edit -search\"></span>\n        </div>\n        <div class=\"col-md-3 view edit -search\">\n          <em about=\"v-s:date\" property=\"rdfs:label\" class=\"margin-sm\"></em>\n          <span about=\"@\" property=\"v-s:date\" class=\"view edit -search\"></span>\n        </div>\n      </div>\n    </div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfanNDb21tb25WZWRhSnMiLCJ2ZWRhIiwiX2pzQ29tbW9uQmFja2VuZEpzIiwiQmFja2VuZCIsIl9qc0NvbW1vbkluZGl2aWR1YWxfbW9kZWxKcyIsIkluZGl2aWR1YWxNb2RlbCIsImV4ZWN1dGUiLCJfZXhwb3J0IiwicG9zdCIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsIm9uIiwiaGFuZGxlciIsIm9uZSIsIm9mZiIsInByb3BlcnR5X3VyaSIsImhhc1ZhbHVlIiwicXVlcnkiLCJ0aWNrZXQiLCJpZCIsInNvcnQiLCJ0b3AiLCJhc3luYyIsInRoZW4iLCJxdWVyeVJlc3VsdCIsIkNFUl91cmkiLCJyZXN1bHQiLCJsb2FkIiwiUHJvbWlzZSIsInJlc29sdmUiLCJDRVIiLCJyYXRlIiwiRGF0ZSIsImh0bWwiXSwic291cmNlcyI6WyIuLi8uLi9vbnRvbG9neS9nZW5lcmljLWFwcGxpY2F0aW9uL2NvbnRyYWN0b3JQcm9maWxlL3RlbXBsYXRlcy92LXNfUHJpY2VUZW1wbGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHZlZGEgZnJvbSAnL2pzL2NvbW1vbi92ZWRhLmpzJztcbmltcG9ydCBCYWNrZW5kIGZyb20gJy9qcy9jb21tb24vYmFja2VuZC5qcyc7XG5pbXBvcnQgSW5kaXZpZHVhbE1vZGVsIGZyb20gJy9qcy9jb21tb24vaW5kaXZpZHVhbF9tb2RlbC5qcyc7XG5cbmV4cG9ydCBjb25zdCBwb3N0ID0gZnVuY3Rpb24gKGluZGl2aWR1YWwsIHRlbXBsYXRlLCBjb250YWluZXIsIG1vZGUsIGV4dHJhKSB7XG4gIHRlbXBsYXRlID0gJCh0ZW1wbGF0ZSk7XG4gIGNvbnRhaW5lciA9ICQoY29udGFpbmVyKTtcblxuICBpbmRpdmlkdWFsLm9uKCdwcm9wZXJ0eU1vZGlmaWVkJywgaGFuZGxlcik7XG4gIHRlbXBsYXRlLm9uZSgncmVtb3ZlJywgZnVuY3Rpb24gKCkge1xuICAgIGluZGl2aWR1YWwub2ZmKCdwcm9wZXJ0eU1vZGlmaWVkJywgaGFuZGxlcik7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGhhbmRsZXIgKHByb3BlcnR5X3VyaSkge1xuICAgIGlmICgocHJvcGVydHlfdXJpID09PSAndi1zOnN1bScgfHwgcHJvcGVydHlfdXJpID09PSAndi1zOmhhc0N1cnJlbmN5JykgJiYgaW5kaXZpZHVhbC5oYXNWYWx1ZSgndi1zOnN1bScpICYmIGluZGl2aWR1YWwuaGFzVmFsdWUoJ3YtczpoYXNDdXJyZW5jeScpKSB7XG4gICAgICBCYWNrZW5kLnF1ZXJ5KHtcbiAgICAgICAgdGlja2V0OiB2ZWRhLnRpY2tldCxcbiAgICAgICAgcXVlcnk6XG4gICAgICAgICAgXCIncmRmOnR5cGUnPT09J3YtczpDdXJyZW5jeUV4Y2hhbmdlUmF0ZScgJiYgJ3YtczpoYXNDdXJyZW5jeVNvdXJjZSc9PSdcIiArXG4gICAgICAgICAgaW5kaXZpZHVhbFsndi1zOmhhc0N1cnJlbmN5J11bMF0uaWQgK1xuICAgICAgICAgIFwiJyAmJiAndi1zOmhhc0N1cnJlbmN5VGFyZ2V0Jz09J2Q6Y3VycmVuY3lfcnViJyAmJiAndi1zOmhhc0N1cnJlbmN5RXhjaGFuZ2VSYXRlUHVycG9zZSc9PSd2LXM6Q0VSX1B1cnBvc2VfY3VycmVudCdcIixcbiAgICAgICAgc29ydDogXCIndi1zOmRhdGUnIGFzY1wiLFxuICAgICAgICB0b3A6IDEsXG4gICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHF1ZXJ5UmVzdWx0KSB7XG4gICAgICAgICAgY29uc3QgQ0VSX3VyaSA9IHF1ZXJ5UmVzdWx0LnJlc3VsdFswXTtcbiAgICAgICAgICBpZiAoQ0VSX3VyaSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbmRpdmlkdWFsTW9kZWwoQ0VSX3VyaSkubG9hZCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoQ0VSKSB7XG4gICAgICAgICAgaWYgKENFUikge1xuICAgICAgICAgICAgY29uc3QgcmF0ZSA9IENFUlsndi1zOnJhdGUnXVswXTtcbiAgICAgICAgICAgIGluZGl2aWR1YWxbJ3YtczpzdW1SdWJsZSddID0gW2luZGl2aWR1YWxbJ3YtczpzdW0nXVswXSAqIHJhdGVdO1xuICAgICAgICAgICAgaW5kaXZpZHVhbFsndi1zOmRhdGUnXSA9IFtuZXcgRGF0ZSgpXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW5kaXZpZHVhbFsndi1zOnN1bVJ1YmxlJ10gPSBbXTtcbiAgICAgICAgICAgIGluZGl2aWR1YWxbJ3YtczpkYXRlJ10gPSBbXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGh0bWwgPSBgXG4gIDxkaXYgY2xhc3M9XCJwYW5lbCBwYW5lbC1kZWZhdWx0XCI+XG4gICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0zXCI+XG4gICAgICAgICAgPGVtIGFib3V0PVwidi1zOnN1bVwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiIGNsYXNzPVwibWFyZ2luLXNtXCI+PC9lbT5cbiAgICAgICAgICA8c3BhbiBwcm9wZXJ0eT1cInYtczpzdW1cIiBjbGFzcz1cInZpZXcgLWVkaXQgc2VhcmNoXCI+PC9zcGFuPlxuICAgICAgICAgIDx2ZWRhLWNvbnRyb2wgZGF0YS10eXBlPVwiZGVjaW1hbFwiIHByb3BlcnR5PVwidi1zOnN1bVwiIGNsYXNzPVwiLXZpZXcgZWRpdCBzZWFyY2hcIj48L3ZlZGEtY29udHJvbD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtM1wiPlxuICAgICAgICAgIDxlbSBhYm91dD1cInYtczpoYXNDdXJyZW5jeVwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiIGNsYXNzPVwibWFyZ2luLXNtXCI+PC9lbT5cbiAgICAgICAgICA8c3BhbiByZWw9XCJ2LXM6aGFzQ3VycmVuY3lcIiBjbGFzcz1cInZpZXcgLWVkaXQgc2VhcmNoXCIgZGF0YS10ZW1wbGF0ZT1cInYtdWk6TGFiZWxUZW1wbGF0ZVwiPjwvc3Bhbj5cbiAgICAgICAgICA8dmVkYS1jb250cm9sIGRhdGEtdHlwZT1cImxpbmtcIiByZWw9XCJ2LXM6aGFzQ3VycmVuY3lcIiBjbGFzcz1cIi12aWV3IGVkaXQgc2VhcmNoIGZ1bGx0ZXh0IGRyb3Bkb3duXCI+PC92ZWRhLWNvbnRyb2w+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTMgdmlldyBlZGl0IC1zZWFyY2hcIj5cbiAgICAgICAgICA8ZW0gYWJvdXQ9XCJ2LXM6c3VtUnVibGVcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIiBjbGFzcz1cIm1hcmdpbi1zbVwiPjwvZW0+XG4gICAgICAgICAgPHNwYW4gYWJvdXQ9XCJAXCIgcHJvcGVydHk9XCJ2LXM6c3VtUnVibGVcIiBjbGFzcz1cInZpZXcgZWRpdCAtc2VhcmNoXCI+PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0zIHZpZXcgZWRpdCAtc2VhcmNoXCI+XG4gICAgICAgICAgPGVtIGFib3V0PVwidi1zOmRhdGVcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIiBjbGFzcz1cIm1hcmdpbi1zbVwiPjwvZW0+XG4gICAgICAgICAgPHNwYW4gYWJvdXQ9XCJAXCIgcHJvcGVydHk9XCJ2LXM6ZGF0ZVwiIGNsYXNzPVwidmlldyBlZGl0IC1zZWFyY2hcIj48L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuYDtcbiJdLCJt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