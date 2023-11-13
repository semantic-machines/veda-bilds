"use strict";

System.register(["jquery", "/js/common/veda.js", "/js/common/individual_model.js", "/js/common/backend.js"], function (_export, _context) {
  "use strict";

  var $, veda, IndividualModel, Backend, pre, html;
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
        $('.action#start', template).click(function () {
          individual['v-s:hasStatus'] = [new IndividualModel('v-s:StatusStarted')];
          individual.save();
        });
        $('.action#stop', template).click(function () {
          Backend.set_in_individual(veda.ticket, {
            '@': individual.id,
            'v-s:hasStatus': [{
              type: 'Uri',
              data: 'v-s:StatusStopped'
            }]
          });
        });
        $('.action#restart', template).click(function () {
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
          var start = $('.action#start', template);
          var stop = $('.action#stop', template);
          var restart = $('.action#restart', template);
          var status = individual.hasValue('v-s:hasStatus') ? individual['v-s:hasStatus'][0].id : undefined;
          switch (status) {
            case 'v-s:StatusStarted':
            case 'v-s:StatusExecution':
              start.addClass('hidden');
              stop.removeClass('hidden');
              restart.addClass('hidden');
              break;
            case 'v-s:StatusExecuted':
              start.addClass('hidden');
              stop.addClass('hidden');
              restart.removeClass('hidden');
              break;
            default:
              start.removeClass('hidden');
              stop.addClass('hidden');
              restart.addClass('hidden');
              break;
          }
        }
      });
      _export("html", html = "\n  <div class=\"actions view edit -search clearfix\">\n    <div class=\"pull-left\">\n      <button type=\"button\" class=\"action btn btn-success view -edit -search\" id=\"start\" about=\"v-s:StartBundle\" property=\"rdfs:label\"></button>\n      <button type=\"button\" class=\"action btn btn-info view -edit -search\" id=\"restart\" about=\"v-s:RestartBundle\" property=\"rdfs:label\"></button>\n      <button type=\"button\" class=\"action btn btn-danger view -edit -search\" id=\"stop\" about=\"v-s:StopBundle\" property=\"rdfs:label\"></button>\n    </div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfanNDb21tb25WZWRhSnMiLCJ2ZWRhIiwiX2pzQ29tbW9uSW5kaXZpZHVhbF9tb2RlbEpzIiwiSW5kaXZpZHVhbE1vZGVsIiwiX2pzQ29tbW9uQmFja2VuZEpzIiwiQmFja2VuZCIsImV4ZWN1dGUiLCJfZXhwb3J0IiwicHJlIiwiaW5kaXZpZHVhbCIsInRlbXBsYXRlIiwiY29udGFpbmVyIiwibW9kZSIsImV4dHJhIiwiY2xpY2siLCJzYXZlIiwic2V0X2luX2luZGl2aWR1YWwiLCJ0aWNrZXQiLCJpZCIsInR5cGUiLCJkYXRhIiwic3RhdHVzSGFuZGxlciIsIm9uIiwib25lIiwib2ZmIiwic3RhcnQiLCJzdG9wIiwicmVzdGFydCIsInN0YXR1cyIsImhhc1ZhbHVlIiwidW5kZWZpbmVkIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImh0bWwiXSwic291cmNlcyI6WyIuLi8uLi9vbnRvbG9neS9nZW5lcmljLWZ1bmN0aW9uL3RlbXBsYXRlcy92LXNfT3BlcmF0aW9uRm9vdGVyVGVtcGxhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB2ZWRhIGZyb20gJy9qcy9jb21tb24vdmVkYS5qcyc7XG5pbXBvcnQgSW5kaXZpZHVhbE1vZGVsIGZyb20gJy9qcy9jb21tb24vaW5kaXZpZHVhbF9tb2RlbC5qcyc7XG5pbXBvcnQgQmFja2VuZCBmcm9tICcvanMvY29tbW9uL2JhY2tlbmQuanMnO1xuXG5leHBvcnQgY29uc3QgcHJlID0gZnVuY3Rpb24gKGluZGl2aWR1YWwsIHRlbXBsYXRlLCBjb250YWluZXIsIG1vZGUsIGV4dHJhKSB7XG4gIHRlbXBsYXRlID0gJCh0ZW1wbGF0ZSk7XG4gIGNvbnRhaW5lciA9ICQoY29udGFpbmVyKTtcblxuICAkKCcuYWN0aW9uI3N0YXJ0JywgdGVtcGxhdGUpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICBpbmRpdmlkdWFsWyd2LXM6aGFzU3RhdHVzJ10gPSBbbmV3IEluZGl2aWR1YWxNb2RlbCgndi1zOlN0YXR1c1N0YXJ0ZWQnKV07XG4gICAgaW5kaXZpZHVhbC5zYXZlKCk7XG4gIH0pO1xuICAkKCcuYWN0aW9uI3N0b3AnLCB0ZW1wbGF0ZSkuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIEJhY2tlbmQuc2V0X2luX2luZGl2aWR1YWwodmVkYS50aWNrZXQsIHtcbiAgICAgICdAJzogaW5kaXZpZHVhbC5pZCxcbiAgICAgICd2LXM6aGFzU3RhdHVzJzogW1xuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ1VyaScsXG4gICAgICAgICAgZGF0YTogJ3YtczpTdGF0dXNTdG9wcGVkJyxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSk7XG4gIH0pO1xuICAkKCcuYWN0aW9uI3Jlc3RhcnQnLCB0ZW1wbGF0ZSkuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIGluZGl2aWR1YWxbJ3YtczpoYXNTdGF0dXMnXSA9IFtuZXcgSW5kaXZpZHVhbE1vZGVsKCd2LXM6U3RhdHVzUmVzdGFydGVkJyldO1xuICAgIGluZGl2aWR1YWxbJ3YtczpvdXRwdXQnXSA9IFsnJ107XG4gICAgaW5kaXZpZHVhbFsndi1zOnByb2dyZXNzJ10gPSBbMF07XG4gICAgaW5kaXZpZHVhbC5zYXZlKCk7XG4gIH0pO1xuXG4gIHN0YXR1c0hhbmRsZXIoKTtcbiAgaW5kaXZpZHVhbC5vbigndi1zOmhhc1N0YXR1cycsIHN0YXR1c0hhbmRsZXIpO1xuICB0ZW1wbGF0ZS5vbmUoJ3JlbW92ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBpbmRpdmlkdWFsLm9mZigndi1zOmhhc1N0YXR1cycsIHN0YXR1c0hhbmRsZXIpO1xuICB9KTtcbiAgaW5kaXZpZHVhbC5vbigndi1zOmhhc1N0YXR1cycsIHN0YXR1c0hhbmRsZXIpO1xuXG4gIGZ1bmN0aW9uIHN0YXR1c0hhbmRsZXIgKCkge1xuICAgIGNvbnN0IHN0YXJ0ID0gJCgnLmFjdGlvbiNzdGFydCcsIHRlbXBsYXRlKTtcbiAgICBjb25zdCBzdG9wID0gJCgnLmFjdGlvbiNzdG9wJywgdGVtcGxhdGUpO1xuICAgIGNvbnN0IHJlc3RhcnQgPSAkKCcuYWN0aW9uI3Jlc3RhcnQnLCB0ZW1wbGF0ZSk7XG4gICAgY29uc3Qgc3RhdHVzID0gaW5kaXZpZHVhbC5oYXNWYWx1ZSgndi1zOmhhc1N0YXR1cycpID8gaW5kaXZpZHVhbFsndi1zOmhhc1N0YXR1cyddWzBdLmlkIDogdW5kZWZpbmVkO1xuXG4gICAgc3dpdGNoIChzdGF0dXMpIHtcbiAgICBjYXNlICd2LXM6U3RhdHVzU3RhcnRlZCc6XG4gICAgY2FzZSAndi1zOlN0YXR1c0V4ZWN1dGlvbic6XG4gICAgICBzdGFydC5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICBzdG9wLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgIHJlc3RhcnQuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAndi1zOlN0YXR1c0V4ZWN1dGVkJzpcbiAgICAgIHN0YXJ0LmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICAgIHN0b3AuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgcmVzdGFydC5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgc3RhcnQucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgc3RvcC5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICByZXN0YXJ0LmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGh0bWwgPSBgXG4gIDxkaXYgY2xhc3M9XCJhY3Rpb25zIHZpZXcgZWRpdCAtc2VhcmNoIGNsZWFyZml4XCI+XG4gICAgPGRpdiBjbGFzcz1cInB1bGwtbGVmdFwiPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJhY3Rpb24gYnRuIGJ0bi1zdWNjZXNzIHZpZXcgLWVkaXQgLXNlYXJjaFwiIGlkPVwic3RhcnRcIiBhYm91dD1cInYtczpTdGFydEJ1bmRsZVwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJhY3Rpb24gYnRuIGJ0bi1pbmZvIHZpZXcgLWVkaXQgLXNlYXJjaFwiIGlkPVwicmVzdGFydFwiIGFib3V0PVwidi1zOlJlc3RhcnRCdW5kbGVcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L2J1dHRvbj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYWN0aW9uIGJ0biBidG4tZGFuZ2VyIHZpZXcgLWVkaXQgLXNlYXJjaFwiIGlkPVwic3RvcFwiIGFib3V0PVwidi1zOlN0b3BCdW5kbGVcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5gO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztNQUFPQSxDQUFDLEdBQUFDLE9BQUEsQ0FBQUMsT0FBQTtJQUFBLGFBQUFDLGVBQUE7TUFDREMsSUFBSSxHQUFBRCxlQUFBLENBQUFELE9BQUE7SUFBQSxhQUFBRywyQkFBQTtNQUNKQyxlQUFlLEdBQUFELDJCQUFBLENBQUFILE9BQUE7SUFBQSxhQUFBSyxrQkFBQTtNQUNmQyxPQUFPLEdBQUFELGtCQUFBLENBQUFMLE9BQUE7SUFBQTtJQUFBTyxPQUFBLFdBQUFBLENBQUE7TUFBQUMsT0FBQSxRQUVEQyxHQUFHLEdBQUcsU0FBTkEsR0FBR0EsQ0FBYUMsVUFBVSxFQUFFQyxRQUFRLEVBQUVDLFNBQVMsRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUU7UUFDekVILFFBQVEsR0FBR2IsQ0FBQyxDQUFDYSxRQUFRLENBQUM7UUFDdEJDLFNBQVMsR0FBR2QsQ0FBQyxDQUFDYyxTQUFTLENBQUM7UUFFeEJkLENBQUMsQ0FBQyxlQUFlLEVBQUVhLFFBQVEsQ0FBQyxDQUFDSSxLQUFLLENBQUMsWUFBWTtVQUM3Q0wsVUFBVSxDQUFDLGVB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