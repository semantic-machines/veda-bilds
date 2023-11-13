"use strict";

System.register(["/js/browser/util.js", "jquery", "/js/common/veda.js", "/js/common/individual_model.js", "/js/common/backend.js"], function (_export, _context) {
  "use strict";

  var BrowserUtil, $, veda, IndividualModel, Backend, pre, html;
  return {
    setters: [function (_jsBrowserUtilJs) {
      BrowserUtil = _jsBrowserUtilJs.default;
    }, function (_jquery) {
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
        $('#start', template).click(function () {
          individual['v-s:hasStatus'] = [new IndividualModel('v-s:StatusStarted')];
          individual.save();
        });
        $('#stop', template).click(function () {
          Backend.set_in_individual(veda.ticket, {
            '@': individual.id,
            'v-s:hasStatus': [{
              type: 'Uri',
              data: 'v-s:StatusStopped'
            }]
          });
        });
        $('#restart', template).click(function () {
          individual['v-s:hasStatus'] = [new IndividualModel('v-s:StatusRestarted')];
          individual['v-s:output'] = [''];
          individual['v-s:progress'] = [0];
          individual.save();
        });
        statusHandler();
        individual.on('v-s:hasStatus', statusHandler);
        template.one('remove', function () {
          individual.off('v-s:hasStatus', statusHandler);
        });
        individual.on('v-s:hasStatus', statusHandler);
        function statusHandler() {
          var start = $('#start', template);
          var stop = $('#stop', template);
          var restart = $('#restart', template);
          var status = individual.hasValue('v-s:hasStatus') ? individual['v-s:hasStatus'][0].id : undefined;
          switch (status) {
            case 'v-s:StatusStarted':
            case 'v-s:StatusExecution':
              start.hide();
              stop.show();
              restart.hide();
              break;
            case 'v-s:StatusExecuted':
              start.hide();
              stop.hide();
              restart.show();
              break;
            default:
              start.show();
              stop.hide();
              restart.hide();
              break;
          }
        }
        $('.show-operation-modal', template).click(function (e) {
          e.preventDefault();
          BrowserUtil.showSmallModal(individual);
        });
      });
      _export("html", html = "\n  <div class=\"pull-left\">\n    <h5 class=\"pull-left margin-sm\">\n      <a class=\"show-operation-modal text-muted\" href=\"#\" about=\"@\" rel=\"rdf:type\" data-template=\"v-ui:LabelTemplate\"></a>\n    </h5>\n    <div class=\"pull-left\" about=\"@\" data-template=\"v-s:OperationProgressTemplate\"></div>\n    <button class=\"btn btn-xs btn-success pull-left\" id=\"start\"><span class=\"glyphicon glyphicon-play\"></span></button>\n    <button class=\"btn btn-xs btn-info pull-left\" id=\"restart\"><span class=\"glyphicon glyphicon-repeat\"></span></button>\n    <button class=\"btn btn-xs btn-danger pull-left\" id=\"stop\"><span class=\"glyphicon glyphicon-stop\"></span></button>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJCcm93c2VyVXRpbCIsIl9qc0Jyb3dzZXJVdGlsSnMiLCJkZWZhdWx0IiwiX2pxdWVyeSIsIiQiLCJfanNDb21tb25WZWRhSnMiLCJ2ZWRhIiwiX2pzQ29tbW9uSW5kaXZpZHVhbF9tb2RlbEpzIiwiSW5kaXZpZHVhbE1vZGVsIiwiX2pzQ29tbW9uQmFja2VuZEpzIiwiQmFja2VuZCIsImV4ZWN1dGUiLCJfZXhwb3J0IiwicHJlIiwiaW5kaXZpZHVhbCIsInRlbXBsYXRlIiwiY29udGFpbmVyIiwibW9kZSIsImV4dHJhIiwiY2xpY2siLCJzYXZlIiwic2V0X2luX2luZGl2aWR1YWwiLCJ0aWNrZXQiLCJpZCIsInR5cGUiLCJkYXRhIiwic3RhdHVzSGFuZGxlciIsIm9uIiwib25lIiwib2ZmIiwic3RhcnQiLCJzdG9wIiwicmVzdGFydCIsInN0YXR1cyIsImhhc1ZhbHVlIiwidW5kZWZpbmVkIiwiaGlkZSIsInNob3ciLCJlIiwicHJldmVudERlZmF1bHQiLCJzaG93U21hbGxNb2RhbCIsImh0bWwiXSwic291cmNlcyI6WyIuLi8uLi9vbnRvbG9neS9nZW5lcmljLWZ1bmN0aW9uL3RlbXBsYXRlcy92LXNfT3BlcmF0aW9uU3RhdHVzVGVtcGxhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJyb3dzZXJVdGlsIGZyb20gJy9qcy9icm93c2VyL3V0aWwuanMnO1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB2ZWRhIGZyb20gJy9qcy9jb21tb24vdmVkYS5qcyc7XG5pbXBvcnQgSW5kaXZpZHVhbE1vZGVsIGZyb20gJy9qcy9jb21tb24vaW5kaXZpZHVhbF9tb2RlbC5qcyc7XG5pbXBvcnQgQmFja2VuZCBmcm9tICcvanMvY29tbW9uL2JhY2tlbmQuanMnO1xuXG5leHBvcnQgY29uc3QgcHJlID0gZnVuY3Rpb24gKGluZGl2aWR1YWwsIHRlbXBsYXRlLCBjb250YWluZXIsIG1vZGUsIGV4dHJhKSB7XG4gIHRlbXBsYXRlID0gJCh0ZW1wbGF0ZSk7XG4gIGNvbnRhaW5lciA9ICQoY29udGFpbmVyKTtcblxuICAkKCcjc3RhcnQnLCB0ZW1wbGF0ZSkuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIGluZGl2aWR1YWxbJ3YtczpoYXNTdGF0dXMnXSA9IFtuZXcgSW5kaXZpZHVhbE1vZGVsKCd2LXM6U3RhdHVzU3RhcnRlZCcpXTtcbiAgICBpbmRpdmlkdWFsLnNhdmUoKTtcbiAgfSk7XG4gICQoJyNzdG9wJywgdGVtcGxhdGUpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICBCYWNrZW5kLnNldF9pbl9pbmRpdmlkdWFsKHZlZGEudGlja2V0LCB7XG4gICAgICAnQCc6IGluZGl2aWR1YWwuaWQsXG4gICAgICAndi1zOmhhc1N0YXR1cyc6IFtcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICdVcmknLFxuICAgICAgICAgIGRhdGE6ICd2LXM6U3RhdHVzU3RvcHBlZCcsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0pO1xuICB9KTtcbiAgJCgnI3Jlc3RhcnQnLCB0ZW1wbGF0ZSkuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIGluZGl2aWR1YWxbJ3YtczpoYXNTdGF0dXMnXSA9IFtuZXcgSW5kaXZpZHVhbE1vZGVsKCd2LXM6U3RhdHVzUmVzdGFydGVkJyldO1xuICAgIGluZGl2aWR1YWxbJ3YtczpvdXRwdXQnXSA9IFsnJ107XG4gICAgaW5kaXZpZHVhbFsndi1zOnByb2dyZXNzJ10gPSBbMF07XG4gICAgaW5kaXZpZHVhbC5zYXZlKCk7XG4gIH0pO1xuXG4gIHN0YXR1c0hhbmRsZXIoKTtcbiAgaW5kaXZpZHVhbC5vbigndi1zOmhhc1N0YXR1cycsIHN0YXR1c0hhbmRsZXIpO1xuICB0ZW1wbGF0ZS5vbmUoJ3JlbW92ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBpbmRpdmlkdWFsLm9mZigndi1zOmhhc1N0YXR1cycsIHN0YXR1c0hhbmRsZXIpO1xuICB9KTtcbiAgaW5kaXZpZHVhbC5vbigndi1zOmhhc1N0YXR1cycsIHN0YXR1c0hhbmRsZXIpO1xuXG4gIGZ1bmN0aW9uIHN0YXR1c0hhbmRsZXIgKCkge1xuICAgIGNvbnN0IHN0YXJ0ID0gJCgnI3N0YXJ0JywgdGVtcGxhdGUpO1xuICAgIGNvbnN0IHN0b3AgPSAkKCcjc3RvcCcsIHRlbXBsYXRlKTtcbiAgICBjb25zdCByZXN0YXJ0ID0gJCgnI3Jlc3RhcnQnLCB0ZW1wbGF0ZSk7XG4gICAgY29uc3Qgc3RhdHVzID0gaW5kaXZpZHVhbC5oYXNWYWx1ZSgndi1zOmhhc1N0YXR1cycpID8gaW5kaXZpZHVhbFsndi1zOmhhc1N0YXR1cyddWzBdLmlkIDogdW5kZWZpbmVkO1xuXG4gICAgc3dpdGNoIChzdGF0dXMpIHtcbiAgICBjYXNlICd2LXM6U3RhdHVzU3RhcnRlZCc6XG4gICAgY2FzZSAndi1zOlN0YXR1c0V4ZWN1dGlvbic6XG4gICAgICBzdGFydC5oaWRlKCk7XG4gICAgICBzdG9wLnNob3coKTtcbiAgICAgIHJlc3RhcnQuaGlkZSgpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAndi1zOlN0YXR1c0V4ZWN1dGVkJzpcbiAgICAgIHN0YXJ0LmhpZGUoKTtcbiAgICAgIHN0b3AuaGlkZSgpO1xuICAgICAgcmVzdGFydC5zaG93KCk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgc3RhcnQuc2hvdygpO1xuICAgICAgc3RvcC5oaWRlKCk7XG4gICAgICByZXN0YXJ0LmhpZGUoKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gICQoJy5zaG93LW9wZXJhdGlvbi1tb2RhbCcsIHRlbXBsYXRlKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBCcm93c2VyVXRpbC5zaG93U21hbGxNb2RhbChpbmRpdmlkdWFsKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgaHRtbCA9IGBcbiAgPGRpdiBjbGFzcz1cInB1bGwtbGVmdFwiPlxuICAgIDxoNSBjbGFzcz1cInB1bGwtbGVmdCBtYXJnaW4tc21cIj5cbiAgICAgIDxhIGNsYXNzPVwic2hvdy1vcGVyYXRpb24tbW9kYWwgdGV4dC1tdXRlZFwiIGhyZWY9XCIjXCIgYWJvdXQ9XCJAXCIgcmVsPVwicmRmOnR5cGVcIiBkYXRhLXRlbXBsYXRlPVwidi11aTpMYWJlbFRlbXBsYXRlXCI+PC9hPlxuICAgIDwvaDU+XG4gICAgPGRpdiBjbGFzcz1cInB1bGwtbGVmdFwiIGFib3V0PVwiQFwiIGRhdGEtdGVtcGxhdGU9XCJ2LXM6T3BlcmF0aW9uUHJvZ3Jlc3NUZW1wbGF0ZVwiPjwvZGl2PlxuICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXhzIGJ0bi1zdWNjZXNzIHB1bGwtbGVmdFwiIGlkPVwic3RhcnRcIj48c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tcGxheVwiPjwvc3Bhbj48L2J1dHRvbj5cbiAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi14cyBidG4taW5mbyBwdWxsLWxlZnRcIiBpZD1cInJlc3RhcnRcIj48c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tcmVwZWF0XCI+PC9zcGFuPjwvYnV0dG9uPlxuICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXhzIGJ0bi1kYW5nZXIgcHVsbC1sZWZ0XCIgaWQ9XCJzdG9wXCI+PHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXN0b3BcIj48L3NwYW4+PC9idXR0b24+XG4gIDwvZGl2PlxuYDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7TUFBT0EsV0FBVyxHQUFBQyxnQkFBQSxDQUFBQyxPQUFBO0lBQUEsYUFBQUMsT0FBQTtNQUNYQyxDQUFDLEdBQUFELE9BQUEsQ0FBQUQsT0FBQTtJQUFBLGFBQUFHLGVBQUE7TUFDREMsSUFBSSxHQUFBRCxlQUFBLENBQUFILE9BQUE7SUFBQSxhQUFBSywyQkFBQTtNQUNKQyxlQUFlLEdBQUFELDJCQUFBLENBQUFMLE9BQUE7SUFBQSxhQUFBTyxrQkFBQTtNQUNmQyxPQUFPLEdBQUFELGtCQUFBLENBQUFQLE9BQUE7SUFBQTtJQUFBUyxPQUFB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