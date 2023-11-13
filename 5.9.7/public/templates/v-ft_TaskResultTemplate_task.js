"use strict";

System.register(["jquery", "/js/common/veda.js", "riot", "/js/common/individual_model.js", "/js/common/backend.js"], function (_export, _context) {
  "use strict";

  var $, veda, riot, IndividualModel, Backend, post, html;
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_jsCommonVedaJs) {
      veda = _jsCommonVedaJs.default;
    }, function (_riot) {
      riot = _riot.default;
    }, function (_jsCommonIndividual_modelJs) {
      IndividualModel = _jsCommonIndividual_modelJs.default;
    }, function (_jsCommonBackendJs) {
      Backend = _jsCommonBackendJs.default;
    }],
    execute: function () {
      _export("post", post = function post(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);

        // Remove completed tasks from inbox & outbox
        var folder = decodeURIComponent(location.hash).substr(2).split('/')[0];
        var remove = folder !== 'v-ft:Completed';
        removeCompleted.call(this);
        function removeCompleted() {
          if (remove && this.hasValue('v-wf:isCompleted', true)) {
            template.remove();
          }
        }
        individual.on('v-wf:isCompleted', removeCompleted);
        template.one('remove', function () {
          individual.off('v-wf:isCompleted', removeCompleted);
        });
        $('.to-journal', template).click(function (e) {
          e.stopPropagation();
          var journalUri = individual['v-wf:onDocument'][0].id + 'j';
          riot.route('#/' + journalUri);
        });
        new IndividualModel('v-ft:ToJournalBundle').load().then(function (bundle) {
          $('.to-journal', template).prop('title', bundle.toString());
        });

        // Toggle read/unread
        var toggler = $('.toggle-read', template);
        toggler.prop('title', new IndividualModel('v-ft:ReadUnreadBundle').toString());
        if (folder === 'v-ft:Inbox') {
          toggler.addClass('pointer').click(toggleReadClickHandler);
        }
        function toggleReadClickHandler(e) {
          e.stopPropagation();
          var isRead = individual.hasValue('v-wf:read', true);
          toggleRead(!isRead);
          Backend.set_in_individual({
            ticket: veda.ticket,
            individual: {
              '@': individual.id,
              'v-wf:read': [{
                data: !isRead,
                type: 'Boolean'
              }]
            },
            async: true
          });
        }
        function readHandler() {
          var isRead = individual.hasValue('v-wf:read', true);
          toggleRead(isRead);
        }
        function toggleRead(isRead) {
          if (isRead) {
            template.css('font-weight', 'normal');
            toggler.removeClass('text-primary').addClass('text-muted');
          } else {
            template.css('font-weight', 'bold');
            toggler.removeClass('text-muted').addClass('text-primary');
          }
        }
        readHandler();
        individual.on('v-wf:read', readHandler);
        template.one('remove', function () {
          individual.off('v-wf:read', readHandler);
        });

        // Child task indicator
        if (individual.hasValue('v-wf:hasChildTask')) {
          template.find('.child-task').addClass('glyphicon glyphicon-comment').prop('title', new IndividualModel('v-wf:hasChildTask').toString());
        }

        // Due date indicator
        var dateGivenCell = $('.date-given', template);
        var yesterday = new Date().setHours(0, 0, 0, 1);
        var tomorrow = new Date().setHours(23, 59, 59, 999);
        var dateGiven = individual['v-wf:dateGiven'][0];
        var dateGivenYesterday = new Date(dateGiven).setHours(0, 0, 0, 1);
        var dateGivenTomorrow = new Date(dateGiven).setHours(23, 59, 59, 999);
        var dateDone = individual.hasValue('v-wf:takenDecision') && individual['v-wf:takenDecision'][0]['v-s:created'][0];
        if (individual.hasValue('v-wf:isCompleted', false)) {
          if (dateGiven < yesterday) {
            dateGivenCell.toggleClass('bg-danger');
          } else if (yesterday < dateGiven && dateGiven <= tomorrow) {
            dateGivenCell.toggleClass('bg-warning');
          } else if (tomorrow < dateGiven) {
            dateGivenCell.toggleClass('bg-success');
          }
        } else {
          if (dateGivenYesterday < dateDone && dateDone <= dateGivenTomorrow) {
            dateGivenCell.toggleClass('bg-warning');
          } else if (dateDone < dateGiven) {
            dateGivenCell.toggleClass('bg-success');
          } else if (dateGiven < dateDone) {
            dateGivenCell.toggleClass('bg-danger');
          }
        }
      });
      _export("html", html = "\n  <tr>\n    <td class=\"serial-number\"></td>\n    <td><a href=\"#/@\" class=\"glyphicon glyphicon-search\"></a></td>\n    <td>\n      <div about=\"@\" rel=\"v-wf:from\" data-template=\"v-ui:LabelTemplate\"></div>\n      <div about=\"@\" rel=\"v-wf:redirect_from_task\" data-template=\"v-ft:RedirectInfo_template\"></div>\n    </td>\n    <td about=\"@\" rel=\"v-wf:to\" data-template=\"v-ui:LabelTemplate\"></td>\n    <td>\n      <span class=\"toggle-read glyphicon glyphicon-exclamation-sign\"></span>\n      <span class=\"child-task text-muted\"></span>\n    </td>\n    <td>\n      <a href=\"#/@\" about=\"@\" property=\"rdfs:label\"></a><br />\n      <i about=\"@\" property=\"v-s:description\"></i>\n    </td>\n    <td about=\"@\" rel=\"v-wf:onDocument\" data-template=\"v-ui:ClassNameLabelTemplate\"></td>\n    <td>\n      <span class=\"to-journal pointer text-primary glyphicon glyphicon-list\"></span>\n    </td>\n    <td about=\"@\" property=\"v-s:created\"></td>\n    <td about=\"@\" property=\"v-wf:dateGiven\" class=\"date-given\"></td>\n  </tr>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfanNDb21tb25WZWRhSnMiLCJ2ZWRhIiwiX3Jpb3QiLCJyaW90IiwiX2pzQ29tbW9uSW5kaXZpZHVhbF9tb2RlbEpzIiwiSW5kaXZpZHVhbE1vZGVsIiwiX2pzQ29tbW9uQmFja2VuZEpzIiwiQmFja2VuZCIsImV4ZWN1dGUiLCJfZXhwb3J0IiwicG9zdCIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsImZvbGRlciIsImRlY29kZVVSSUNvbXBvbmVudCIsImxvY2F0aW9uIiwiaGFzaCIsInN1YnN0ciIsInNwbGl0IiwicmVtb3ZlIiwicmVtb3ZlQ29tcGxldGVkIiwiY2FsbCIsImhhc1ZhbHVlIiwib24iLCJvbmUiLCJvZmYiLCJjbGljayIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJqb3VybmFsVXJpIiwiaWQiLCJyb3V0ZSIsImxvYWQiLCJ0aGVuIiwiYnVuZGxlIiwicHJvcCIsInRvU3RyaW5nIiwidG9nZ2xlciIsImFkZENsYXNzIiwidG9nZ2xlUmVhZENsaWNrSGFuZGxlciIsImlzUmVhZCIsInRvZ2dsZVJlYWQiLCJzZXRfaW5faW5kaXZpZHVhbCIsInRpY2tldCIsImRhdGEiLCJ0eXBlIiwiYXN5bmMiLCJyZWFkSGFuZGxlciIsImNzcyIsInJlbW92ZUNsYXNzIiwiZmluZCIsImRhdGVHaXZlbkNlbGwiLCJ5ZXN0ZXJkYXkiLCJEYXRlIiwic2V0SG91cnMiLCJ0b21vcnJvdyIsImRhdGVHaXZlbiIsImRhdGVHaXZlblllc3RlcmRheSIsImRhdGVHaXZlblRvbW9ycm93IiwiZGF0ZURvbmUiLCJ0b2dnbGVDbGFzcyIsImh0bWwiXSwic291cmNlcyI6WyIuLi8uLi9vbnRvbG9neS9nZW5lcmljLWZ1bmN0aW9uL3RlbXBsYXRlcy92LWZ0X1Rhc2tSZXN1bHRUZW1wbGF0ZV90YXNrLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgdmVkYSBmcm9tICcvanMvY29tbW9uL3ZlZGEuanMnO1xuaW1wb3J0IHJpb3QgZnJvbSAncmlvdCc7XG5pbXBvcnQgSW5kaXZpZHVhbE1vZGVsIGZyb20gJy9qcy9jb21tb24vaW5kaXZpZHVhbF9tb2RlbC5qcyc7XG5pbXBvcnQgQmFja2VuZCBmcm9tICcvanMvY29tbW9uL2JhY2tlbmQuanMnO1xuXG5leHBvcnQgY29uc3QgcG9zdCA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgLy8gUmVtb3ZlIGNvbXBsZXRlZCB0YXNrcyBmcm9tIGluYm94ICYgb3V0Ym94XG4gIGNvbnN0IGZvbGRlciA9IGRlY29kZVVSSUNvbXBvbmVudChsb2NhdGlvbi5oYXNoKS5zdWJzdHIoMikuc3BsaXQoJy8nKVswXTtcbiAgY29uc3QgcmVtb3ZlID0gZm9sZGVyICE9PSAndi1mdDpDb21wbGV0ZWQnO1xuICByZW1vdmVDb21wbGV0ZWQuY2FsbCh0aGlzKTtcbiAgZnVuY3Rpb24gcmVtb3ZlQ29tcGxldGVkICgpIHtcbiAgICBpZiAocmVtb3ZlICYmIHRoaXMuaGFzVmFsdWUoJ3Ytd2Y6aXNDb21wbGV0ZWQnLCB0cnVlKSkge1xuICAgICAgdGVtcGxhdGUucmVtb3ZlKCk7XG4gICAgfVxuICB9XG4gIGluZGl2aWR1YWwub24oJ3Ytd2Y6aXNDb21wbGV0ZWQnLCByZW1vdmVDb21wbGV0ZWQpO1xuICB0ZW1wbGF0ZS5vbmUoJ3JlbW92ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBpbmRpdmlkdWFsLm9mZigndi13Zjppc0NvbXBsZXRlZCcsIHJlbW92ZUNvbXBsZXRlZCk7XG4gIH0pO1xuXG4gICQoJy50by1qb3VybmFsJywgdGVtcGxhdGUpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBjb25zdCBqb3VybmFsVXJpID0gaW5kaXZpZHVhbFsndi13ZjpvbkRvY3VtZW50J11bMF0uaWQgKyAnaic7XG4gICAgcmlvdC5yb3V0ZSgnIy8nICsgam91cm5hbFVyaSk7XG4gIH0pO1xuICBuZXcgSW5kaXZpZHVhbE1vZGVsKCd2LWZ0OlRvSm91cm5hbEJ1bmRsZScpLmxvYWQoKS50aGVuKGZ1bmN0aW9uIChidW5kbGUpIHtcbiAgICAkKCcudG8tam91cm5hbCcsIHRlbXBsYXRlKS5wcm9wKCd0aXRsZScsIGJ1bmRsZS50b1N0cmluZygpKTtcbiAgfSk7XG5cbiAgLy8gVG9nZ2xlIHJlYWQvdW5yZWFkXG4gIGNvbnN0IHRvZ2dsZXIgPSAkKCcudG9nZ2xlLXJlYWQnLCB0ZW1wbGF0ZSk7XG4gIHRvZ2dsZXIucHJvcCgndGl0bGUnLCBuZXcgSW5kaXZpZHVhbE1vZGVsKCd2LWZ0OlJlYWRVbnJlYWRCdW5kbGUnKS50b1N0cmluZygpKTtcbiAgaWYgKGZvbGRlciA9PT0gJ3YtZnQ6SW5ib3gnKSB7XG4gICAgdG9nZ2xlci5hZGRDbGFzcygncG9pbnRlcicpLmNsaWNrKHRvZ2dsZVJlYWRDbGlja0hhbmRsZXIpO1xuICB9XG4gIGZ1bmN0aW9uIHRvZ2dsZVJlYWRDbGlja0hhbmRsZXIgKGUpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGNvbnN0IGlzUmVhZCA9IGluZGl2aWR1YWwuaGFzVmFsdWUoJ3Ytd2Y6cmVhZCcsIHRydWUpO1xuICAgIHRvZ2dsZVJlYWQoIWlzUmVhZCk7XG4gICAgQmFja2VuZC5zZXRfaW5faW5kaXZpZHVhbCh7XG4gICAgICB0aWNrZXQ6IHZlZGEudGlja2V0LFxuICAgICAgaW5kaXZpZHVhbDoge1xuICAgICAgICAnQCc6IGluZGl2aWR1YWwuaWQsXG4gICAgICAgICd2LXdmOnJlYWQnOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgZGF0YTogIWlzUmVhZCxcbiAgICAgICAgICAgIHR5cGU6ICdCb29sZWFuJyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIGFzeW5jOiB0cnVlLFxuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIHJlYWRIYW5kbGVyICgpIHtcbiAgICBjb25zdCBpc1JlYWQgPSBpbmRpdmlkdWFsLmhhc1ZhbHVlKCd2LXdmOnJlYWQnLCB0cnVlKTtcbiAgICB0b2dnbGVSZWFkKGlzUmVhZCk7XG4gIH1cbiAgZnVuY3Rpb24gdG9nZ2xlUmVhZCAoaXNSZWFkKSB7XG4gICAgaWYgKGlzUmVhZCkge1xuICAgICAgdGVtcGxhdGUuY3NzKCdmb250LXdlaWdodCcsICdub3JtYWwnKTtcbiAgICAgIHRvZ2dsZXIucmVtb3ZlQ2xhc3MoJ3RleHQtcHJpbWFyeScpLmFkZENsYXNzKCd0ZXh0LW11dGVkJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRlbXBsYXRlLmNzcygnZm9udC13ZWlnaHQnLCAnYm9sZCcpO1xuICAgICAgdG9nZ2xlci5yZW1vdmVDbGFzcygndGV4dC1tdXRlZCcpLmFkZENsYXNzKCd0ZXh0LXByaW1hcnknKTtcbiAgICB9XG4gIH1cbiAgcmVhZEhhbmRsZXIoKTtcbiAgaW5kaXZpZHVhbC5vbigndi13ZjpyZWFkJywgcmVhZEhhbmRsZXIpO1xuICB0ZW1wbGF0ZS5vbmUoJ3JlbW92ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBpbmRpdmlkdWFsLm9mZigndi13ZjpyZWFkJywgcmVhZEhhbmRsZXIpO1xuICB9KTtcblxuICAvLyBDaGlsZCB0YXNrIGluZGljYXRvclxuICBpZiAoaW5kaXZpZHVhbC5oYXNWYWx1ZSgndi13ZjpoYXNDaGlsZFRhc2snKSkge1xuICAgIHRlbXBsYXRlLmZpbmQoJy5jaGlsZC10YXNrJykuYWRkQ2xhc3MoJ2dseXBoaWNvbiBnbHlwaGljb24tY29tbWVudCcpLnByb3AoJ3RpdGxlJywgbmV3IEluZGl2aWR1YWxNb2RlbCgndi13ZjpoYXNDaGlsZFRhc2snKS50b1N0cmluZygpKTtcbiAgfVxuXG4gIC8vIER1ZSBkYXRlIGluZGljYXRvclxuICBjb25zdCBkYXRlR2l2ZW5DZWxsID0gJCgnLmRhdGUtZ2l2ZW4nLCB0ZW1wbGF0ZSk7XG4gIGNvbnN0IHllc3RlcmRheSA9IG5ldyBEYXRlKCkuc2V0SG91cnMoMCwgMCwgMCwgMSk7XG4gIGNvbnN0IHRvbW9ycm93ID0gbmV3IERhdGUoKS5zZXRIb3VycygyMywgNTksIDU5LCA5OTkpO1xuICBjb25zdCBkYXRlR2l2ZW4gPSBpbmRpdmlkdWFsWyd2LXdmOmRhdGVHaXZlbiddWzBdO1xuICBjb25zdCBkYXRlR2l2ZW5ZZXN0ZXJkYXkgPSBuZXcgRGF0ZShkYXRlR2l2ZW4pLnNldEhvdXJzKDAsIDAsIDAsIDEpO1xuICBjb25zdCBkYXRlR2l2ZW5Ub21vcnJvdyA9IG5ldyBEYXRlKGRhdGVHaXZlbikuc2V0SG91cnMoMjMsIDU5LCA1OSwgOTk5KTtcbiAgY29uc3QgZGF0ZURvbmUgPSBpbmRpdmlkdWFsLmhhc1ZhbHVlKCd2LXdmOnRha2VuRGVjaXNpb24nKSAmJiBpbmRpdmlkdWFsWyd2LXdmOnRha2VuRGVjaXNpb24nXVswXVsndi1zOmNyZWF0ZWQnXVswXTtcbiAgaWYgKGluZGl2aWR1YWwuaGFzVmFsdWUoJ3Ytd2Y6aXNDb21wbGV0ZWQnLCBmYWxzZSkpIHtcbiAgICBpZiAoZGF0ZUdpdmVuIDwgeWVzdGVyZGF5KSB7XG4gICAgICBkYXRlR2l2ZW5DZWxsLnRvZ2dsZUNsYXNzKCdiZy1kYW5nZXInKTtcbiAgICB9IGVsc2UgaWYgKHllc3RlcmRheSA8IGRhdGVHaXZlbiAmJiBkYXRlR2l2ZW4gPD0gdG9tb3Jyb3cpIHtcbiAgICAgIGRhdGVHaXZlbkNlbGwudG9nZ2xlQ2xhc3MoJ2JnLXdhcm5pbmcnKTtcbiAgICB9IGVsc2UgaWYgKHRvbW9ycm93IDwgZGF0ZUdpdmVuKSB7XG4gICAgICBkYXRlR2l2ZW5DZWxsLnRvZ2dsZUNsYXNzKCdiZy1zdWNjZXNzJyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChkYXRlR2l2ZW5ZZXN0ZXJkYXkgPCBkYXRlRG9uZSAmJiBkYXRlRG9uZSA8PSBkYXRlR2l2ZW5Ub21vcnJvdykge1xuICAgICAgZGF0ZUdpdmVuQ2VsbC50b2dnbGVDbGFzcygnYmctd2FybmluZycpO1xuICAgIH0gZWxzZSBpZiAoZGF0ZURvbmUgPCBkYXRlR2l2ZW4pIHtcbiAgICAgIGRhdGVHaXZlbkNlbGwudG9nZ2xlQ2xhc3MoJ2JnLXN1Y2Nlc3MnKTtcbiAgICB9IGVsc2UgaWYgKGRhdGVHaXZlbiA8IGRhdGVEb25lKSB7XG4gICAgICBkYXRlR2l2ZW5DZWxsLnRvZ2dsZUNsYXNzKCdiZy1kYW5nZXInKTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBodG1sID0gYFxuICA8dHI+XG4gICAgPHRkIGNsYXNzPVwic2VyaWFsLW51bWJlclwiPjwvdGQ+XG4gICAgPHRkPjxhIGhyZWY9XCIjL0BcIiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tc2VhcmNoXCI+PC9hPjwvdGQ+XG4gICAgPHRkPlxuICAgICAgPGRpdiBhYm91dD1cIkBcIiByZWw9XCJ2LXdmOmZyb21cIiBkYXRhLXRlbXBsYXRlPVwidi11aTpMYWJlbFRlbXBsYXRlXCI+PC9kaXY+XG4gICAgICA8ZGl2IGFib3V0PVwiQFwiIHJlbD1cInYtd2Y6cmVkaXJlY3RfZnJvbV90YXNrXCIgZGF0YS10ZW1wbGF0ZT1cInYtZnQ6UmVkaXJlY3RJbmZvX3RlbXBsYXRlXCI+PC9kaXY+XG4gICAgPC90ZD5cbiAgICA8dGQgYWJvdXQ9XCJAXCIgcmVsPVwidi13Zjp0b1wiIGRhdGEtdGVtcGxhdGU9XCJ2LXVpOkxhYmVsVGVtcGxhdGVcIj48L3RkPlxuICAgIDx0ZD5cbiAgICAgIDxzcGFuIGNsYXNzPVwidG9nZ2xlLXJlYWQgZ2x5cGhpY29uIGdseXBoaWNvbi1leGNsYW1hdGlvbi1zaWduXCI+PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJjaGlsZC10YXNrIHRleHQtbXV0ZWRcIj48L3NwYW4+XG4gICAgPC90ZD5cbiAgICA8dGQ+XG4gICAgICA8YSBocmVmPVwiIy9AXCIgYWJvdXQ9XCJAXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9hPjxiciAvPlxuICAgICAgPGkgYWJvdXQ9XCJAXCIgcHJvcGVydHk9XCJ2LXM6ZGVzY3JpcHRpb25cIj48L2k+XG4gICAgPC90ZD5cbiAgICA8dGQgYWJvdXQ9XCJAXCIgcmVsPVwidi13ZjpvbkRvY3VtZW50XCIgZGF0YS10ZW1wbGF0ZT1cInYtdWk6Q2xhc3NOYW1lTGFiZWxUZW1wbGF0ZVwiPjwvdGQ+XG4gICAgPHRkPlxuICAgICAgPHNwYW4gY2xhc3M9XCJ0by1qb3VybmFsIHBvaW50ZXIgdGV4dC1wcmltYXJ5IGdseXBoaWNvbiBnbHlwaGljb24tbGlzdFwiPjwvc3Bhbj5cbiAgICA8L3RkPlxuICAgIDx0ZCBhYm91dD1cIkBcIiBwcm9wZXJ0eT1cInYtczpjcmVhdGVkXCI+PC90ZD5cbiAgICA8dGQgYWJvdXQ9XCJAXCIgcHJvcGVydHk9XCJ2LXdmOmRhdGVHaXZlblwiIGNsYXNzPVwiZGF0ZS1naXZlblwiPjwvdGQ+XG4gIDwvdHI+XG5gO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztNQUFPQSxDQUFDLEdBQUFDLE9BQUEsQ0FBQUMsT0FBQTtJQUFBLGFBQUFDLGVBQUE7TUFDREMsSUFBSSxHQUFBRCxlQUFBLENBQUFELE9BQUE7SUFBQSxhQUFBRyxLQUFBO01BQ0pDLElBQUksR0FBQUQsS0FBQSxDQUFBSCxPQUFBO0lBQUEsYUFBQUssMkJBQUE7TUFDSkMsZUFBZSxHQUFBRCwyQkFBQSxDQUFBTCxPQUFBO0lBQUEsYUFBQU8sa0JBQUE7TUFDZkMsT0FBTyxHQUFBRCxrQkFBQSxDQUFBUCxPQUFBO0lBQUE7SUFBQVMsT0FBQSxXQUFBQSxDQUFBO01BQUFDLE9BQUEsU0FFREMsSUFBSSxHQUFHLFNBQVBBLElBQUlBLENBQWFDLFVBQVUsRUFBRUMsUUFBUSxFQUFFQyxTQUFTLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFO1FBQzFFSCxRQUFRLEdBQUdmLENBQUMsQ0FBQ2UsUUFBUSxDQUFDO1FBQ3RCQyxTQUFTLEdBQUdoQixDQUFDLENBQUNnQixTQUFTLENBQUM7O1FBRXhCO1FBQ0EsSUFB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