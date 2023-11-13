"use strict";

System.register(["jquery", "/js/common/veda.js", "/js/common/individual_model.js", "/js/common/backend.js"], function (_export, _context) {
  "use strict";

  var $, veda, IndividualModel, Backend, pre, post, html;
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_jsCommonVedaJs) {
      veda = _jsCommonVedaJs.default;
    }, function (_jsCommonIndividual_modelJs) {
      IndividualModel = _jsCommonIndividual_modelJs.default;
    }, function (_jsCommonBackendJs) {
      Backend = _jsCommonBackendJs.default;
    }],
    execute: function () {
      _export("pre", pre = function pre(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        $('.open-structure').remove();
      });
      _export("post", post = function post(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        var isContactManager = false;
        veda.user.isMemberOf('cfg:ContactManagerGroup').then(function (isMember) {
          isContactManager = isMember || veda.appointment.id == 'cfg:AdministratorAppointment';
        });
        $('section .section-header', template).click(function () {
          var self = $(this);
          $('span.glyphicon', self).toggleClass('glyphicon-chevron-right glyphicon-chevron-down');
          self.siblings().toggle();
        });
        function presentSearchResult(objType, container, items) {
          var promises = items.map(function (item) {
            var item2 = new IndividualModel(item);
            return item2.present($('<div></div>'), 'v-s:ContactCardTemplate');
          });
          return Promise.all(promises).then(function (templates) {
            templates.forEach(function (tmpl) {
              if (isContactManager) {
                $('.zoom.hidden', tmpl).removeClass('hidden');
              }
              $('tbody', container).append(tmpl);
            });
          });
        }
        var promise_spec = Backend.query({
          ticket: veda.ticket,
          sql: "SELECT id FROM veda_tt.`v-s:Position` FINAL WHERE lowerUTF8(arrayStringConcat(v_s_origin_str, ' ')) LIKE '%spec%' and `v_s_hasCommunicationMean_str`[1]!='' and `v_s_deleted_int`[1]!=1 ORDER BY `rdfs_label_str`[1]",
          from: 0,
          top: 100,
          limit: 200,
          async: true
        });
        var promise_group = Backend.query({
          ticket: veda.ticket,
          sql: "SELECT DISTINCT id FROM veda_tt.`v-s:Position` FINAL WHERE lowerUTF8(arrayStringConcat(v_s_origin_str, ' ')) LIKE '%group%' and lowerUTF8(arrayStringConcat(v_s_origin_str, ' ')) not LIKE '%spec%' and `v_s_hasCommunicationMean_str`[1]!='' and `v_s_deleted_int`[1]!=1 and id!='d:GLAV_DISP_position' and id!='d:SYK-SKDG_position' and id!='d:RU1121003135_pos_OptiF1C' and id!='d:SYK-RTISI_position' ORDER BY `rdfs_label_str`[1]",
          from: 0,
          top: 400,
          limit: 400,
          async: true
        });
        return Promise.all([promise_spec, promise_group]).then(function (result) {
          presentSearchResult('pos', spec, result[0].result);
          presentSearchResult('pos', group, result[1].result);
        });
      });
      _export("html", html = "\n  <div>\n    <section id=\"spec\">\n      <h5 class=\"section-header\">\n        <span class=\"glyphicon glyphicon-chevron-right\"></span>\n        <label about=\"v-s:SpecialBundle\" property=\"rdfs:label\"></label>\n      </h5>\n      <div class=\"section-content\">\n        <table class=\"table result-table\">\n          <tbody></tbody>\n        </table>\n      </div>\n    </section>\n    <section id=\"group\">\n      <h5 class=\"section-header\">\n        <span class=\"glyphicon glyphicon-chevron-right\"></span>\n        <label about=\"v-s:GroupBundle\" property=\"rdfs:label\"></label>\n      </h5>\n      <div class=\"section-content\">\n        <table class=\"table result-table\">\n          <tbody></tbody>\n        </table>\n      </div>\n    </section>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfanNDb21tb25WZWRhSnMiLCJ2ZWRhIiwiX2pzQ29tbW9uSW5kaXZpZHVhbF9tb2RlbEpzIiwiSW5kaXZpZHVhbE1vZGVsIiwiX2pzQ29tbW9uQmFja2VuZEpzIiwiQmFja2VuZCIsImV4ZWN1dGUiLCJfZXhwb3J0IiwicHJlIiwiaW5kaXZpZHVhbCIsInRlbXBsYXRlIiwiY29udGFpbmVyIiwibW9kZSIsImV4dHJhIiwicmVtb3ZlIiwicG9zdCIsImlzQ29udGFjdE1hbmFnZXIiLCJ1c2VyIiwiaXNNZW1iZXJPZiIsInRoZW4iLCJpc01lbWJlciIsImFwcG9pbnRtZW50IiwiaWQiLCJjbGljayIsInNlbGYiLCJ0b2dnbGVDbGFzcyIsInNpYmxpbmdzIiwidG9nZ2xlIiwicHJlc2VudFNlYXJjaFJlc3VsdCIsIm9ialR5cGUiLCJpdGVtcyIsInByb21pc2VzIiwibWFwIiwiaXRlbSIsIml0ZW0yIiwicHJlc2VudCIsIlByb21pc2UiLCJhbGwiLCJ0ZW1wbGF0ZXMiLCJmb3JFYWNoIiwidG1wbCIsInJlbW92ZUNsYXNzIiwiYXBwZW5kIiwicHJvbWlzZV9zcGVjIiwicXVlcnkiLCJ0aWNrZXQiLCJzcWwiLCJmcm9tIiwidG9wIiwibGltaXQiLCJhc3luYyIsInByb21pc2VfZ3JvdXAiLCJyZXN1bHQiLCJzcGVjIiwiZ3JvdXAiLCJodG1sIl0sInNvdXJjZXMiOlsiLi4vLi4vb250b2xvZ3kvZ2VuZXJpYy1mdW5jdGlvbi90ZW1wbGF0ZXMvdi1zX1NwZWNpYWxDYWxsc0NvbnRhY3RUZW1wbGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHZlZGEgZnJvbSAnL2pzL2NvbW1vbi92ZWRhLmpzJztcbmltcG9ydCBJbmRpdmlkdWFsTW9kZWwgZnJvbSAnL2pzL2NvbW1vbi9pbmRpdmlkdWFsX21vZGVsLmpzJztcbmltcG9ydCBCYWNrZW5kIGZyb20gJy9qcy9jb21tb24vYmFja2VuZC5qcyc7XG5cbmV4cG9ydCBjb25zdCBwcmUgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gICQoJy5vcGVuLXN0cnVjdHVyZScpLnJlbW92ZSgpO1xufTtcblxuZXhwb3J0IGNvbnN0IHBvc3QgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuICBsZXQgaXNDb250YWN0TWFuYWdlciA9IGZhbHNlO1xuICB2ZWRhLnVzZXIuaXNNZW1iZXJPZignY2ZnOkNvbnRhY3RNYW5hZ2VyR3JvdXAnKS50aGVuKGZ1bmN0aW9uIChpc01lbWJlcikge1xuICAgIGlzQ29udGFjdE1hbmFnZXIgPSBpc01lbWJlciB8fCB2ZWRhLmFwcG9pbnRtZW50LmlkID09ICdjZmc6QWRtaW5pc3RyYXRvckFwcG9pbnRtZW50JztcbiAgfSk7XG5cbiAgJCgnc2VjdGlvbiAuc2VjdGlvbi1oZWFkZXInLCB0ZW1wbGF0ZSkuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHNlbGYgPSAkKHRoaXMpO1xuICAgICQoJ3NwYW4uZ2x5cGhpY29uJywgc2VsZikudG9nZ2xlQ2xhc3MoJ2dseXBoaWNvbi1jaGV2cm9uLXJpZ2h0IGdseXBoaWNvbi1jaGV2cm9uLWRvd24nKTtcbiAgICBzZWxmLnNpYmxpbmdzKCkudG9nZ2xlKCk7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHByZXNlbnRTZWFyY2hSZXN1bHQgKG9ialR5cGUsIGNvbnRhaW5lciwgaXRlbXMpIHtcbiAgICBjb25zdCBwcm9taXNlcyA9IGl0ZW1zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgY29uc3QgaXRlbTIgPSBuZXcgSW5kaXZpZHVhbE1vZGVsKGl0ZW0pO1xuICAgICAgcmV0dXJuIGl0ZW0yLnByZXNlbnQoJCgnPGRpdj48L2Rpdj4nKSwgJ3YtczpDb250YWN0Q2FyZFRlbXBsYXRlJyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKGZ1bmN0aW9uICh0ZW1wbGF0ZXMpIHtcbiAgICAgIHRlbXBsYXRlcy5mb3JFYWNoKGZ1bmN0aW9uICh0bXBsKSB7XG4gICAgICAgIGlmIChpc0NvbnRhY3RNYW5hZ2VyKSB7XG4gICAgICAgICAgJCgnLnpvb20uaGlkZGVuJywgdG1wbCkucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgICAgICQoJ3Rib2R5JywgY29udGFpbmVyKS5hcHBlbmQodG1wbCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0IHByb21pc2Vfc3BlYyA9IEJhY2tlbmQucXVlcnkoe1xuICAgIHRpY2tldDogdmVkYS50aWNrZXQsXG4gICAgc3FsOiBcIlNFTEVDVCBpZCBGUk9NIHZlZGFfdHQuYHYtczpQb3NpdGlvbmAgRklOQUwgV0hFUkUgbG93ZXJVVEY4KGFycmF5U3RyaW5nQ29uY2F0KHZfc19vcmlnaW5fc3RyLCAnICcpKSBMSUtFICclc3BlYyUnIGFuZCBgdl9zX2hhc0NvbW11bmljYXRpb25NZWFuX3N0cmBbMV0hPScnIGFuZCBgdl9zX2RlbGV0ZWRfaW50YFsxXSE9MSBPUkRFUiBCWSBgcmRmc19sYWJlbF9zdHJgWzFdXCIsXG4gICAgZnJvbTogMCxcbiAgICB0b3A6IDEwMCxcbiAgICBsaW1pdDogMjAwLFxuICAgIGFzeW5jOiB0cnVlLFxuICB9KTtcblxuICBjb25zdCBwcm9taXNlX2dyb3VwID0gQmFja2VuZC5xdWVyeSh7XG4gICAgdGlja2V0OiB2ZWRhLnRpY2tldCxcbiAgICBzcWw6IFwiU0VMRUNUIERJU1RJTkNUIGlkIEZST00gdmVkYV90dC5gdi1zOlBvc2l0aW9uYCBGSU5BTCBXSEVSRSBsb3dlclVURjgoYXJyYXlTdHJpbmdDb25jYXQodl9zX29yaWdpbl9zdHIsICcgJykpIExJS0UgJyVncm91cCUnIGFuZCBsb3dlclVURjgoYXJyYXlTdHJpbmdDb25jYXQodl9zX29yaWdpbl9zdHIsICcgJykpIG5vdCBMSUtFICclc3BlYyUnIGFuZCBgdl9zX2hhc0NvbW11bmljYXRpb25NZWFuX3N0cmBbMV0hPScnIGFuZCBgdl9zX2RlbGV0ZWRfaW50YFsxXSE9MSBhbmQgaWQhPSdkOkdMQVZfRElTUF9wb3NpdGlvbicgYW5kIGlkIT0nZDpTWUstU0tER19wb3NpdGlvbicgYW5kIGlkIT0nZDpSVTExMjEwMDMxMzVfcG9zX09wdGlGMUMnIGFuZCBpZCE9J2Q6U1lLLVJUSVNJX3Bvc2l0aW9uJyBPUkRFUiBCWSBgcmRmc19sYWJlbF9zdHJgWzFdXCIsXG4gICAgZnJvbTogMCxcbiAgICB0b3A6IDQwMCxcbiAgICBsaW1pdDogNDAwLFxuICAgIGFzeW5jOiB0cnVlLFxuICB9KTtcblxuICByZXR1cm4gUHJvbWlzZS5hbGwoW3Byb21pc2Vfc3BlYywgcHJvbWlzZV9ncm91cF0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgIHByZXNlbnRTZWFyY2hSZXN1bHQoJ3BvcycsIHNwZWMsIHJlc3VsdFswXS5yZXN1bHQpO1xuICAgIHByZXNlbnRTZWFyY2hSZXN1bHQoJ3BvcycsIGdyb3VwLCByZXN1bHRbMV0ucmVzdWx0KTtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgaHRtbCA9IGBcbiAgPGRpdj5cbiAgICA8c2VjdGlvbiBpZD1cInNwZWNcIj5cbiAgICAgIDxoNSBjbGFzcz1cInNlY3Rpb24taGVhZGVyXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1jaGV2cm9uLXJpZ2h0XCI+PC9zcGFuPlxuICAgICAgICA8bGFiZWwgYWJvdXQ9XCJ2LXM6U3BlY2lhbEJ1bmRsZVwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvbGFiZWw+XG4gICAgICA8L2g1PlxuICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tY29udGVudFwiPlxuICAgICAgICA8dGFibGUgY2xhc3M9XCJ0YWJsZSByZXN1bHQtdGFibGVcIj5cbiAgICAgICAgICA8dGJvZHk+PC90Ym9keT5cbiAgICAgICAgPC90YWJsZT5cbiAgICAgIDwvZGl2PlxuICAgIDwvc2VjdGlvbj5cbiAgICA8c2VjdGlvbiBpZD1cImdyb3VwXCI+XG4gICAgICA8aDUgY2xhc3M9XCJzZWN0aW9uLWhlYWRlclwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tY2hldnJvbi1yaWdodFwiPjwvc3Bhbj5cbiAgICAgICAgPGxhYmVsIGFib3V0PVwidi1zOkdyb3VwQnVuZGxlXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9sYWJlbD5cbiAgICAgIDwvaDU+XG4gICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1jb250ZW50XCI+XG4gICAgICAgIDx0YWJsZSBjbGFzcz1cInRhYmxlIHJlc3VsdC10YWJsZVwiPlxuICAgICAgICAgIDx0Ym9keT48L3Rib2R5PlxuICAgICAgICA8L3RhYmxlPlxuICAgICAgPC9kaXY+XG4gICAgPC9zZWN0aW9uPlxuICA8L2Rpdj5cbmA7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O01BQU9BLENBQUMsR0FBQUMsT0FBQSxDQUFBQyxPQUFBO0lBQUEsYUFBQUMsZUFBQTtNQUNEQyxJQUFJLEdBQUFELGVBQUEsQ0FBQUQsT0FBQTtJQUFBLGFBQUFHLDJCQUFBO01BQ0pDLGVBQWUsR0FBQUQsMkJBQUEsQ0FBQUgsT0FBQTtJQUFBLGFBQUFLLGtCQUFBO01BQ2ZDLE9BQU8sR0FBQUQsa0JBQUEsQ0FBQUwsT0FBQTtJQUFBO0lBQUFPLE9BQUEsV0FBQUEsQ0FBQTtNQUFBQyxPQUFBLFFBRURDLEdBQUcsR0FBRyxTQUFOQSxHQUFHQSxDQUFhQyxVQUFVLEVBQUVDLFFBQVEsRUFBRUMsU0FBUyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRTtRQUN6RUgsUUFBUSxHQUFHYixDQUFD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