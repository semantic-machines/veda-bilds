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
        var renderedCount = 0;
        var tbody = $('#tbody', template);
        var task_template = 'v-ui:SimplifiedJournalTemplate_task';
        var doc_uri = this.id.replace(/.$/, '');
        var doc = new IndividualModel(doc_uri);
        $('#refresh', template).click(buildJournal);
        buildJournal();
        function buildJournal() {
          renderedCount = 0;
          tbody.empty();
          Backend.query({
            ticket: veda.ticket,
            query: "'rdf:type'=='v-wf:DecisionForm' && 'v-wf:onDocument'=='" + doc_uri + "'",
            sort: "'v-s:created' desc"
          }).then(function (query_res) {
            var tasks_uris = query_res.result;
            if (tasks_uris.length) {
              return Backend.get_individuals({
                ticket: veda.ticket,
                uris: tasks_uris
              });
            }
          }).then(renderTasks);
        }
        function renderTasks(tasksJSONs) {
          if (!tasksJSONs || !tasksJSONs.length) {
            return;
          }
          var taskJSON = tasksJSONs.pop();
          var task = new IndividualModel(taskJSON);
          task.present(tbody, task_template).then(function (renderedTemplate) {
            $('.sequence-number', renderedTemplate).text(++renderedCount);
          }).then(function () {
            renderTasks(tasksJSONs);
          });
        }
        $('#on-document', template).attr('about', doc_uri);
        $('.createReport0', template).on('click', function () {
          BrowserUtil.createReport('v-s:Journal_printBlank', doc);
        });
      });
      _export("html", html = "\n  <div class=\"container sheet\">\n    <br />\n    <ul id=\"box-tabs\" class=\"nav nav-tabs nav-right\" role=\"tablist\">\n      <li class=\"pull-left\"><h2 class=\"no-margin\" about=\"v-s:Journal\" property=\"rdfs:label\"></h2></li>\n      <li role=\"presentation\">\n        <a href=\"#/@//v-ui:JournalTemplate\" class=\"btn btn-link\"><span about=\"v-ui:JournalTemplate\" property=\"rdfs:label\"></span></a>\n      </li>\n      <li role=\"presentation\" class=\"active\">\n        <a href=\"#/@//v-ui:SimplifiedJournalTemplate\" class=\"btn btn-link\"><span about=\"v-ui:SimplifiedJournalTemplate\" property=\"rdfs:label\"></span></a>\n      </li>\n    </ul>\n    <br />\n    <div class=\"clearfix\">\n      <div class=\"pull-left\">\n        <h4 id=\"on-document\" data-template=\"v-ui:ClassNameLabelLinkTemplate\"></h4>\n      </div>\n      <div class=\"pull-right\">\n        <button type=\"button\" class=\"action btn btn-info view -edit -search createReport0\" about=\"v-s:PrintBlank\" property=\"rdfs:label\"></button>\n      </div>\n    </div>\n    <br />\n    <div id=\"tasks\" class=\"table-responsive\">\n      <table class=\"table\">\n        <thead>\n          <tr>\n            <th width=\"1%\">#</th>\n            <th width=\"15%\" about=\"v-wf:from\" property=\"rdfs:label\"></th>\n            <th width=\"15%\" about=\"v-wf:to\" property=\"rdfs:label\"></th>\n            <th width=\"25%\" about=\"v-s:description\" property=\"rdfs:label\"></th>\n            <th width=\"15%\" about=\"v-s:created\" property=\"rdfs:label\"></th>\n            <th about=\"v-wf:takenDecision\" property=\"rdfs:label\"></th>\n          </tr>\n        </thead>\n        <tbody id=\"tbody\"></tbody>\n      </table>\n      <button class=\"btn btn-default\" id=\"refresh\" about=\"v-s:RefreshBundle\" property=\"rdfs:label\"></button>\n    </div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJCcm93c2VyVXRpbCIsIl9qc0Jyb3dzZXJVdGlsSnMiLCJkZWZhdWx0IiwiX2pxdWVyeSIsIiQiLCJfanNDb21tb25WZWRhSnMiLCJ2ZWRhIiwiX2pzQ29tbW9uSW5kaXZpZHVhbF9tb2RlbEpzIiwiSW5kaXZpZHVhbE1vZGVsIiwiX2pzQ29tbW9uQmFja2VuZEpzIiwiQmFja2VuZCIsImV4ZWN1dGUiLCJfZXhwb3J0IiwicHJlIiwiaW5kaXZpZHVhbCIsInRlbXBsYXRlIiwiY29udGFpbmVyIiwibW9kZSIsImV4dHJhIiwicmVuZGVyZWRDb3VudCIsInRib2R5IiwidGFza190ZW1wbGF0ZSIsImRvY191cmkiLCJpZCIsInJlcGxhY2UiLCJkb2MiLCJjbGljayIsImJ1aWxkSm91cm5hbCIsImVtcHR5IiwicXVlcnkiLCJ0aWNrZXQiLCJzb3J0IiwidGhlbiIsInF1ZXJ5X3JlcyIsInRhc2tzX3VyaXMiLCJyZXN1bHQiLCJsZW5ndGgiLCJnZXRfaW5kaXZpZHVhbHMiLCJ1cmlzIiwicmVuZGVyVGFza3MiLCJ0YXNrc0pTT05zIiwidGFza0pTT04iLCJwb3AiLCJ0YXNrIiwicHJlc2VudCIsInJlbmRlcmVkVGVtcGxhdGUiLCJ0ZXh0IiwiYXR0ciIsIm9uIiwiY3JlYXRlUmVwb3J0IiwiaHRtbCJdLCJzb3VyY2VzIjpbIi4uLy4uL29udG9sb2d5L3N5c3RlbS1jb3JlL3RlbXBsYXRlcy92LXVpX1NpbXBsaWZpZWRKb3VybmFsVGVtcGxhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJyb3dzZXJVdGlsIGZyb20gJy9qcy9icm93c2VyL3V0aWwuanMnO1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB2ZWRhIGZyb20gJy9qcy9jb21tb24vdmVkYS5qcyc7XG5pbXBvcnQgSW5kaXZpZHVhbE1vZGVsIGZyb20gJy9qcy9jb21tb24vaW5kaXZpZHVhbF9tb2RlbC5qcyc7XG5pbXBvcnQgQmFja2VuZCBmcm9tICcvanMvY29tbW9uL2JhY2tlbmQuanMnO1xuXG5leHBvcnQgY29uc3QgcHJlID0gZnVuY3Rpb24gKGluZGl2aWR1YWwsIHRlbXBsYXRlLCBjb250YWluZXIsIG1vZGUsIGV4dHJhKSB7XG4gIHRlbXBsYXRlID0gJCh0ZW1wbGF0ZSk7XG4gIGNvbnRhaW5lciA9ICQoY29udGFpbmVyKTtcblxuICBsZXQgcmVuZGVyZWRDb3VudCA9IDA7XG4gIGNvbnN0IHRib2R5ID0gJCgnI3Rib2R5JywgdGVtcGxhdGUpO1xuICBjb25zdCB0YXNrX3RlbXBsYXRlID0gJ3YtdWk6U2ltcGxpZmllZEpvdXJuYWxUZW1wbGF0ZV90YXNrJztcbiAgY29uc3QgZG9jX3VyaSA9IHRoaXMuaWQucmVwbGFjZSgvLiQvLCAnJyk7XG4gIGNvbnN0IGRvYyA9IG5ldyBJbmRpdmlkdWFsTW9kZWwoZG9jX3VyaSk7XG4gICQoJyNyZWZyZXNoJywgdGVtcGxhdGUpLmNsaWNrKGJ1aWxkSm91cm5hbCk7XG4gIGJ1aWxkSm91cm5hbCgpO1xuXG4gIGZ1bmN0aW9uIGJ1aWxkSm91cm5hbCAoKSB7XG4gICAgcmVuZGVyZWRDb3VudCA9IDA7XG4gICAgdGJvZHkuZW1wdHkoKTtcbiAgICBCYWNrZW5kLnF1ZXJ5KHtcbiAgICAgIHRpY2tldDogdmVkYS50aWNrZXQsXG4gICAgICBxdWVyeTogXCIncmRmOnR5cGUnPT0ndi13ZjpEZWNpc2lvbkZvcm0nICYmICd2LXdmOm9uRG9jdW1lbnQnPT0nXCIgKyBkb2NfdXJpICsgXCInXCIsXG4gICAgICBzb3J0OiBcIid2LXM6Y3JlYXRlZCcgZGVzY1wiLFxuICAgIH0pXG4gICAgICAudGhlbihmdW5jdGlvbiAocXVlcnlfcmVzKSB7XG4gICAgICAgIGNvbnN0IHRhc2tzX3VyaXMgPSBxdWVyeV9yZXMucmVzdWx0O1xuICAgICAgICBpZiAodGFza3NfdXJpcy5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gQmFja2VuZC5nZXRfaW5kaXZpZHVhbHMoe1xuICAgICAgICAgICAgdGlja2V0OiB2ZWRhLnRpY2tldCxcbiAgICAgICAgICAgIHVyaXM6IHRhc2tzX3VyaXMsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAudGhlbihyZW5kZXJUYXNrcyk7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJUYXNrcyAodGFza3NKU09Ocykge1xuICAgIGlmICghdGFza3NKU09OcyB8fCAhdGFza3NKU09Ocy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgdGFza0pTT04gPSB0YXNrc0pTT05zLnBvcCgpO1xuICAgIGNvbnN0IHRhc2sgPSBuZXcgSW5kaXZpZHVhbE1vZGVsKHRhc2tKU09OKTtcbiAgICB0YXNrXG4gICAgICAucHJlc2VudCh0Ym9keSwgdGFza190ZW1wbGF0ZSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChyZW5kZXJlZFRlbXBsYXRlKSB7XG4gICAgICAgICQoJy5zZXF1ZW5jZS1udW1iZXInLCByZW5kZXJlZFRlbXBsYXRlKS50ZXh0KCsrcmVuZGVyZWRDb3VudCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICByZW5kZXJUYXNrcyh0YXNrc0pTT05zKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgJCgnI29uLWRvY3VtZW50JywgdGVtcGxhdGUpLmF0dHIoJ2Fib3V0JywgZG9jX3VyaSk7XG5cbiAgJCgnLmNyZWF0ZVJlcG9ydDAnLCB0ZW1wbGF0ZSkub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgIEJyb3dzZXJVdGlsLmNyZWF0ZVJlcG9ydCgndi1zOkpvdXJuYWxfcHJpbnRCbGFuaycsIGRvYyk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGh0bWwgPSBgXG4gIDxkaXYgY2xhc3M9XCJjb250YWluZXIgc2hlZXRcIj5cbiAgICA8YnIgLz5cbiAgICA8dWwgaWQ9XCJib3gtdGFic1wiIGNsYXNzPVwibmF2IG5hdi10YWJzIG5hdi1yaWdodFwiIHJvbGU9XCJ0YWJsaXN0XCI+XG4gICAgICA8bGkgY2xhc3M9XCJwdWxsLWxlZnRcIj48aDIgY2xhc3M9XCJuby1tYXJnaW5cIiBhYm91dD1cInYtczpKb3VybmFsXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9oMj48L2xpPlxuICAgICAgPGxpIHJvbGU9XCJwcmVzZW50YXRpb25cIj5cbiAgICAgICAgPGEgaHJlZj1cIiMvQC8vdi11aTpKb3VybmFsVGVtcGxhdGVcIiBjbGFzcz1cImJ0biBidG4tbGlua1wiPjxzcGFuIGFib3V0PVwidi11aTpKb3VybmFsVGVtcGxhdGVcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L3NwYW4+PC9hPlxuICAgICAgPC9saT5cbiAgICAgIDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCIgY2xhc3M9XCJhY3RpdmVcIj5cbiAgICAgICAgPGEgaHJlZj1cIiMvQC8vdi11aTpTaW1wbGlmaWVkSm91cm5hbFRlbXBsYXRlXCIgY2xhc3M9XCJidG4gYnRuLWxpbmtcIj48c3BhbiBhYm91dD1cInYtdWk6U2ltcGxpZmllZEpvdXJuYWxUZW1wbGF0ZVwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvc3Bhbj48L2E+XG4gICAgICA8L2xpPlxuICAgIDwvdWw+XG4gICAgPGJyIC8+XG4gICAgPGRpdiBjbGFzcz1cImNsZWFyZml4XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwicHVsbC1sZWZ0XCI+XG4gICAgICAgIDxoNCBpZD1cIm9uLWRvY3VtZW50XCIgZGF0YS10ZW1wbGF0ZT1cInYtdWk6Q2xhc3NOYW1lTGFiZWxMaW5rVGVtcGxhdGVcIj48L2g0PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwicHVsbC1yaWdodFwiPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImFjdGlvbiBidG4gYnRuLWluZm8gdmlldyAtZWRpdCAtc2VhcmNoIGNyZWF0ZVJlcG9ydDBcIiBhYm91dD1cInYtczpQcmludEJsYW5rXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8YnIgLz5cbiAgICA8ZGl2IGlkPVwidGFza3NcIiBjbGFzcz1cInRhYmxlLXJlc3BvbnNpdmVcIj5cbiAgICAgIDx0YWJsZSBjbGFzcz1cInRhYmxlXCI+XG4gICAgICAgIDx0aGVhZD5cbiAgICAgICAgICA8dHI+XG4gICAgICAgICAgICA8dGggd2lkdGg9XCIxJVwiPiM8L3RoPlxuICAgICAgICAgICAgPHRoIHdpZHRoPVwiMTUlXCIgYWJvdXQ9XCJ2LXdmOmZyb21cIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L3RoPlxuICAgICAgICAgICAgPHRoIHdpZHRoPVwiMTUlXCIgYWJvdXQ9XCJ2LXdmOnRvXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC90aD5cbiAgICAgICAgICAgIDx0aCB3aWR0aD1cIjI1JVwiIGFib3V0PVwidi1zOmRlc2NyaXB0aW9uXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC90aD5cbiAgICAgICAgICAgIDx0aCB3aWR0aD1cIjE1JVwiIGFib3V0PVwidi1zOmNyZWF0ZWRcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L3RoPlxuICAgICAgICAgICAgPHRoIGFib3V0PVwidi13Zjp0YWtlbkRlY2lzaW9uXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC90aD5cbiAgICAgICAgICA8L3RyPlxuICAgICAgICA8L3RoZWFkPlxuICAgICAgICA8dGJvZHkgaWQ9XCJ0Ym9keVwiPjwvdGJvZHk+XG4gICAgICA8L3RhYmxlPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIGlkPVwicmVmcmVzaFwiIGFib3V0PVwidi1zOlJlZnJlc2hCdW5kbGVcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5gO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztNQUFPQSxXQUFXLEdBQUFDLGdCQUFBLENBQUFDLE9BQUE7SUFBQSxhQUFBQyxPQUFBO01BQ1hDLENBQUMsR0FB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