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
      _export("html", html = "\n  <tr>\n    <td width=\"1%\"><input type=\"checkbox\" class=\"toggle-select\" /></td>\n    <td class=\"serial-number\"></td>\n    <td><a href=\"#/@\" class=\"glyphicon glyphicon-search\"></a></td>\n    <td>\n      <div about=\"@\" rel=\"v-wf:from\" data-template=\"v-ui:LabelTemplate\"></div>\n      <div about=\"@\" rel=\"v-wf:redirect_from_task\" data-template=\"v-ft:RedirectInfo_template\"></div>\n    </td>\n    <td about=\"@\" rel=\"v-wf:to\" data-template=\"v-ui:LabelTemplate\"></td>\n    <td>\n      <span class=\"toggle-read glyphicon glyphicon-exclamation-sign\"></span>\n      <span class=\"child-task text-muted\"></span>\n    </td>\n    <td>\n      <a href=\"#/@\" about=\"@\" property=\"rdfs:label\"></a><br />\n      <i about=\"@\" property=\"v-s:description\"></i>\n    </td>\n    <td about=\"@\" rel=\"v-wf:onDocument\" data-template=\"v-ui:ClassNameLabelTemplate\"></td>\n    <td>\n      <span class=\"to-journal pointer text-primary glyphicon glyphicon-list\"></span>\n    </td>\n    <td about=\"@\" property=\"v-s:created\"></td>\n    <td about=\"@\" property=\"v-wf:dateGiven\" class=\"date-given\"></td>\n  </tr>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfanNDb21tb25WZWRhSnMiLCJ2ZWRhIiwiX3Jpb3QiLCJyaW90IiwiX2pzQ29tbW9uSW5kaXZpZHVhbF9tb2RlbEpzIiwiSW5kaXZpZHVhbE1vZGVsIiwiX2pzQ29tbW9uQmFja2VuZEpzIiwiQmFja2VuZCIsImV4ZWN1dGUiLCJfZXhwb3J0IiwicG9zdCIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsImZvbGRlciIsImRlY29kZVVSSUNvbXBvbmVudCIsImxvY2F0aW9uIiwiaGFzaCIsInN1YnN0ciIsInNwbGl0IiwicmVtb3ZlIiwicmVtb3ZlQ29tcGxldGVkIiwiY2FsbCIsImhhc1ZhbHVlIiwib24iLCJvbmUiLCJvZmYiLCJjbGljayIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJqb3VybmFsVXJpIiwiaWQiLCJyb3V0ZSIsImxvYWQiLCJ0aGVuIiwiYnVuZGxlIiwicHJvcCIsInRvU3RyaW5nIiwidG9nZ2xlciIsImFkZENsYXNzIiwidG9nZ2xlUmVhZENsaWNrSGFuZGxlciIsImlzUmVhZCIsInRvZ2dsZVJlYWQiLCJzZXRfaW5faW5kaXZpZHVhbCIsInRpY2tldCIsImRhdGEiLCJ0eXBlIiwiYXN5bmMiLCJyZWFkSGFuZGxlciIsImNzcyIsInJlbW92ZUNsYXNzIiwiZmluZCIsImRhdGVHaXZlbkNlbGwiLCJ5ZXN0ZXJkYXkiLCJEYXRlIiwic2V0SG91cnMiLCJ0b21vcnJvdyIsImRhdGVHaXZlbiIsImRhdGVHaXZlblllc3RlcmRheSIsImRhdGVHaXZlblRvbW9ycm93IiwiZGF0ZURvbmUiLCJ0b2dnbGVDbGFzcyIsImh0bWwiXSwic291cmNlcyI6WyIuLi8uLi9vbnRvbG9neS9nZW5lcmljLWZ1bmN0aW9uL3RlbXBsYXRlcy92LWZ0X0luYm94UmVzdWx0VGVtcGxhdGVfdGFzay5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHZlZGEgZnJvbSAnL2pzL2NvbW1vbi92ZWRhLmpzJztcbmltcG9ydCByaW90IGZyb20gJ3Jpb3QnO1xuaW1wb3J0IEluZGl2aWR1YWxNb2RlbCBmcm9tICcvanMvY29tbW9uL2luZGl2aWR1YWxfbW9kZWwuanMnO1xuaW1wb3J0IEJhY2tlbmQgZnJvbSAnL2pzL2NvbW1vbi9iYWNrZW5kLmpzJztcblxuZXhwb3J0IGNvbnN0IHBvc3QgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gIC8vIFJlbW92ZSBjb21wbGV0ZWQgdGFza3MgZnJvbSBpbmJveCAmIG91dGJveFxuICBjb25zdCBmb2xkZXIgPSBkZWNvZGVVUklDb21wb25lbnQobG9jYXRpb24uaGFzaCkuc3Vic3RyKDIpLnNwbGl0KCcvJylbMF07XG4gIGNvbnN0IHJlbW92ZSA9IGZvbGRlciAhPT0gJ3YtZnQ6Q29tcGxldGVkJztcbiAgcmVtb3ZlQ29tcGxldGVkLmNhbGwodGhpcyk7XG4gIGZ1bmN0aW9uIHJlbW92ZUNvbXBsZXRlZCAoKSB7XG4gICAgaWYgKHJlbW92ZSAmJiB0aGlzLmhhc1ZhbHVlKCd2LXdmOmlzQ29tcGxldGVkJywgdHJ1ZSkpIHtcbiAgICAgIHRlbXBsYXRlLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuICBpbmRpdmlkdWFsLm9uKCd2LXdmOmlzQ29tcGxldGVkJywgcmVtb3ZlQ29tcGxldGVkKTtcbiAgdGVtcGxhdGUub25lKCdyZW1vdmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgaW5kaXZpZHVhbC5vZmYoJ3Ytd2Y6aXNDb21wbGV0ZWQnLCByZW1vdmVDb21wbGV0ZWQpO1xuICB9KTtcblxuICAkKCcudG8tam91cm5hbCcsIHRlbXBsYXRlKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgY29uc3Qgam91cm5hbFVyaSA9IGluZGl2aWR1YWxbJ3Ytd2Y6b25Eb2N1bWVudCddWzBdLmlkICsgJ2onO1xuICAgIHJpb3Qucm91dGUoJyMvJyArIGpvdXJuYWxVcmkpO1xuICB9KTtcbiAgbmV3IEluZGl2aWR1YWxNb2RlbCgndi1mdDpUb0pvdXJuYWxCdW5kbGUnKS5sb2FkKCkudGhlbihmdW5jdGlvbiAoYnVuZGxlKSB7XG4gICAgJCgnLnRvLWpvdXJuYWwnLCB0ZW1wbGF0ZSkucHJvcCgndGl0bGUnLCBidW5kbGUudG9TdHJpbmcoKSk7XG4gIH0pO1xuXG4gIC8vIFRvZ2dsZSByZWFkL3VucmVhZFxuICBjb25zdCB0b2dnbGVyID0gJCgnLnRvZ2dsZS1yZWFkJywgdGVtcGxhdGUpO1xuICB0b2dnbGVyLnByb3AoJ3RpdGxlJywgbmV3IEluZGl2aWR1YWxNb2RlbCgndi1mdDpSZWFkVW5yZWFkQnVuZGxlJykudG9TdHJpbmcoKSk7XG4gIGlmIChmb2xkZXIgPT09ICd2LWZ0OkluYm94Jykge1xuICAgIHRvZ2dsZXIuYWRkQ2xhc3MoJ3BvaW50ZXInKS5jbGljayh0b2dnbGVSZWFkQ2xpY2tIYW5kbGVyKTtcbiAgfVxuICBmdW5jdGlvbiB0b2dnbGVSZWFkQ2xpY2tIYW5kbGVyIChlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBjb25zdCBpc1JlYWQgPSBpbmRpdmlkdWFsLmhhc1ZhbHVlKCd2LXdmOnJlYWQnLCB0cnVlKTtcbiAgICB0b2dnbGVSZWFkKCFpc1JlYWQpO1xuICAgIEJhY2tlbmQuc2V0X2luX2luZGl2aWR1YWwoe1xuICAgICAgdGlja2V0OiB2ZWRhLnRpY2tldCxcbiAgICAgIGluZGl2aWR1YWw6IHtcbiAgICAgICAgJ0AnOiBpbmRpdmlkdWFsLmlkLFxuICAgICAgICAndi13ZjpyZWFkJzogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGRhdGE6ICFpc1JlYWQsXG4gICAgICAgICAgICB0eXBlOiAnQm9vbGVhbicsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICBhc3luYzogdHJ1ZSxcbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiByZWFkSGFuZGxlciAoKSB7XG4gICAgY29uc3QgaXNSZWFkID0gaW5kaXZpZHVhbC5oYXNWYWx1ZSgndi13ZjpyZWFkJywgdHJ1ZSk7XG4gICAgdG9nZ2xlUmVhZChpc1JlYWQpO1xuICB9XG4gIGZ1bmN0aW9uIHRvZ2dsZVJlYWQgKGlzUmVhZCkge1xuICAgIGlmIChpc1JlYWQpIHtcbiAgICAgIHRlbXBsYXRlLmNzcygnZm9udC13ZWlnaHQnLCAnbm9ybWFsJyk7XG4gICAgICB0b2dnbGVyLnJlbW92ZUNsYXNzKCd0ZXh0LXByaW1hcnknKS5hZGRDbGFzcygndGV4dC1tdXRlZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0ZW1wbGF0ZS5jc3MoJ2ZvbnQtd2VpZ2h0JywgJ2JvbGQnKTtcbiAgICAgIHRvZ2dsZXIucmVtb3ZlQ2xhc3MoJ3RleHQtbXV0ZWQnKS5hZGRDbGFzcygndGV4dC1wcmltYXJ5Jyk7XG4gICAgfVxuICB9XG4gIHJlYWRIYW5kbGVyKCk7XG4gIGluZGl2aWR1YWwub24oJ3Ytd2Y6cmVhZCcsIHJlYWRIYW5kbGVyKTtcbiAgdGVtcGxhdGUub25lKCdyZW1vdmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgaW5kaXZpZHVhbC5vZmYoJ3Ytd2Y6cmVhZCcsIHJlYWRIYW5kbGVyKTtcbiAgfSk7XG5cbiAgLy8gQ2hpbGQgdGFzayBpbmRpY2F0b3JcbiAgaWYgKGluZGl2aWR1YWwuaGFzVmFsdWUoJ3Ytd2Y6aGFzQ2hpbGRUYXNrJykpIHtcbiAgICB0ZW1wbGF0ZS5maW5kKCcuY2hpbGQtdGFzaycpLmFkZENsYXNzKCdnbHlwaGljb24gZ2x5cGhpY29uLWNvbW1lbnQnKS5wcm9wKCd0aXRsZScsIG5ldyBJbmRpdmlkdWFsTW9kZWwoJ3Ytd2Y6aGFzQ2hpbGRUYXNrJykudG9TdHJpbmcoKSk7XG4gIH1cblxuICAvLyBEdWUgZGF0ZSBpbmRpY2F0b3JcbiAgY29uc3QgZGF0ZUdpdmVuQ2VsbCA9ICQoJy5kYXRlLWdpdmVuJywgdGVtcGxhdGUpO1xuICBjb25zdCB5ZXN0ZXJkYXkgPSBuZXcgRGF0ZSgpLnNldEhvdXJzKDAsIDAsIDAsIDEpO1xuICBjb25zdCB0b21vcnJvdyA9IG5ldyBEYXRlKCkuc2V0SG91cnMoMjMsIDU5LCA1OSwgOTk5KTtcbiAgY29uc3QgZGF0ZUdpdmVuID0gaW5kaXZpZHVhbFsndi13ZjpkYXRlR2l2ZW4nXVswXTtcbiAgY29uc3QgZGF0ZUdpdmVuWWVzdGVyZGF5ID0gbmV3IERhdGUoZGF0ZUdpdmVuKS5zZXRIb3VycygwLCAwLCAwLCAxKTtcbiAgY29uc3QgZGF0ZUdpdmVuVG9tb3Jyb3cgPSBuZXcgRGF0ZShkYXRlR2l2ZW4pLnNldEhvdXJzKDIzLCA1OSwgNTksIDk5OSk7XG4gIGNvbnN0IGRhdGVEb25lID0gaW5kaXZpZHVhbC5oYXNWYWx1ZSgndi13Zjp0YWtlbkRlY2lzaW9uJykgJiYgaW5kaXZpZHVhbFsndi13Zjp0YWtlbkRlY2lzaW9uJ11bMF1bJ3YtczpjcmVhdGVkJ11bMF07XG4gIGlmIChpbmRpdmlkdWFsLmhhc1ZhbHVlKCd2LXdmOmlzQ29tcGxldGVkJywgZmFsc2UpKSB7XG4gICAgaWYgKGRhdGVHaXZlbiA8IHllc3RlcmRheSkge1xuICAgICAgZGF0ZUdpdmVuQ2VsbC50b2dnbGVDbGFzcygnYmctZGFuZ2VyJyk7XG4gICAgfSBlbHNlIGlmICh5ZXN0ZXJkYXkgPCBkYXRlR2l2ZW4gJiYgZGF0ZUdpdmVuIDw9IHRvbW9ycm93KSB7XG4gICAgICBkYXRlR2l2ZW5DZWxsLnRvZ2dsZUNsYXNzKCdiZy13YXJuaW5nJyk7XG4gICAgfSBlbHNlIGlmICh0b21vcnJvdyA8IGRhdGVHaXZlbikge1xuICAgICAgZGF0ZUdpdmVuQ2VsbC50b2dnbGVDbGFzcygnYmctc3VjY2VzcycpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoZGF0ZUdpdmVuWWVzdGVyZGF5IDwgZGF0ZURvbmUgJiYgZGF0ZURvbmUgPD0gZGF0ZUdpdmVuVG9tb3Jyb3cpIHtcbiAgICAgIGRhdGVHaXZlbkNlbGwudG9nZ2xlQ2xhc3MoJ2JnLXdhcm5pbmcnKTtcbiAgICB9IGVsc2UgaWYgKGRhdGVEb25lIDwgZGF0ZUdpdmVuKSB7XG4gICAgICBkYXRlR2l2ZW5DZWxsLnRvZ2dsZUNsYXNzKCdiZy1zdWNjZXNzJyk7XG4gICAgfSBlbHNlIGlmIChkYXRlR2l2ZW4gPCBkYXRlRG9uZSkge1xuICAgICAgZGF0ZUdpdmVuQ2VsbC50b2dnbGVDbGFzcygnYmctZGFuZ2VyJyk7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaHRtbCA9IGBcbiAgPHRyPlxuICAgIDx0ZCB3aWR0aD1cIjElXCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwidG9nZ2xlLXNlbGVjdFwiIC8+PC90ZD5cbiAgICA8dGQgY2xhc3M9XCJzZXJpYWwtbnVtYmVyXCI+PC90ZD5cbiAgICA8dGQ+PGEgaHJlZj1cIiMvQFwiIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1zZWFyY2hcIj48L2E+PC90ZD5cbiAgICA8dGQ+XG4gICAgICA8ZGl2IGFib3V0PVwiQFwiIHJlbD1cInYtd2Y6ZnJvbVwiIGRhdGEtdGVtcGxhdGU9XCJ2LXVpOkxhYmVsVGVtcGxhdGVcIj48L2Rpdj5cbiAgICAgIDxkaXYgYWJvdXQ9XCJAXCIgcmVsPVwidi13ZjpyZWRpcmVjdF9mcm9tX3Rhc2tcIiBkYXRhLXRlbXBsYXRlPVwidi1mdDpSZWRpcmVjdEluZm9fdGVtcGxhdGVcIj48L2Rpdj5cbiAgICA8L3RkPlxuICAgIDx0ZCBhYm91dD1cIkBcIiByZWw9XCJ2LXdmOnRvXCIgZGF0YS10ZW1wbGF0ZT1cInYtdWk6TGFiZWxUZW1wbGF0ZVwiPjwvdGQ+XG4gICAgPHRkPlxuICAgICAgPHNwYW4gY2xhc3M9XCJ0b2dnbGUtcmVhZCBnbHlwaGljb24gZ2x5cGhpY29uLWV4Y2xhbWF0aW9uLXNpZ25cIj48L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImNoaWxkLXRhc2sgdGV4dC1tdXRlZFwiPjwvc3Bhbj5cbiAgICA8L3RkPlxuICAgIDx0ZD5cbiAgICAgIDxhIGhyZWY9XCIjL0BcIiBhYm91dD1cIkBcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L2E+PGJyIC8+XG4gICAgICA8aSBhYm91dD1cIkBcIiBwcm9wZXJ0eT1cInYtczpkZXNjcmlwdGlvblwiPjwvaT5cbiAgICA8L3RkPlxuICAgIDx0ZCBhYm91dD1cIkBcIiByZWw9XCJ2LXdmOm9uRG9jdW1lbnRcIiBkYXRhLXRlbXBsYXRlPVwidi11aTpDbGFzc05hbWVMYWJlbFRlbXBsYXRlXCI+PC90ZD5cbiAgICA8dGQ+XG4gICAgICA8c3BhbiBjbGFzcz1cInRvLWpvdXJuYWwgcG9pbnRlciB0ZXh0LXByaW1hcnkgZ2x5cGhpY29uIGdseXBoaWNvbi1saXN0XCI+PC9zcGFuPlxuICAgIDwvdGQ+XG4gICAgPHRkIGFib3V0PVwiQFwiIHByb3BlcnR5PVwidi1zOmNyZWF0ZWRcIj48L3RkPlxuICAgIDx0ZCBhYm91dD1cIkBcIiBwcm9wZXJ0eT1cInYtd2Y6ZGF0ZUdpdmVuXCIgY2xhc3M9XCJkYXRlLWdpdmVuXCI+PC90ZD5cbiAgPC90cj5cbmA7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O01BQU9BLENBQUMsR0FBQUMsT0FBQSxDQUFBQyxPQUFBO0lBQUEsYUFBQUMsZUFBQTtNQUNEQyxJQUFJLEdBQUFELGVBQUEsQ0FBQUQsT0FBQTtJQUFBLGFBQUFHLEtBQUE7TUFDSkMsSUFBSSxHQUFBRCxLQUFBLENBQUFILE9BQUE7SUFBQSxhQUFBSywyQkFBQTtNQUNKQyxlQUFlLEdBQUFELDJCQUFBLENBQUFMLE9BQUE7SUFBQSxhQUFBTyxrQkFBQTtNQUNmQyxPQUFPLEdBQUFELGtCQUFBLENBQUFQLE9BQUE7SUFBQTtJQUFBUyxPQUFBLFdBQUFBLENBQUE7TUFBQUMsT0FBQSxTQUVEQyxJQUFJLEdBQUcsU0FBUEEsSUFBSUEsQ0FBYUMsVUFBVSxFQUFFQyxRQUFRLEVBQUVDLFNBQVMsRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUU7UUFDMUVILFFBQVEsR0FB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