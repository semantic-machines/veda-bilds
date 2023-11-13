"use strict";

System.register(["/js/common/util.js", "jquery", "/js/common/individual_model.js"], function (_export, _context) {
  "use strict";

  var CommonUtil, $, IndividualModel, pre, post, html;
  return {
    setters: [function (_jsCommonUtilJs) {
      CommonUtil = _jsCommonUtilJs.default;
    }, function (_jquery) {
      $ = _jquery.default;
    }, function (_jsCommonIndividual_modelJs) {
      IndividualModel = _jsCommonIndividual_modelJs.default;
    }],
    execute: function () {
      _export("pre", pre = function pre(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        template.on('click', '#saveLink, #cancelLink, #deleteLink', function (e) {
          e.preventDefault();
          var action = $(this).attr('data-action');
          if (action === 'delete') {
            var warning = new IndividualModel('v-s:AreYouSure');
            warning.load().then(function (warning) {
              if (confirm(warning['rdfs:label'].map(CommonUtil.formatValue).join(' '))) {
                template.parent().closest('[resource]')[0].dispatchEvent(new Event(action));
              }
            });
          } else {
            template.parent().closest('[resource]')[0].dispatchEvent(new Event(action));
          }
        });

        // var allButtons = "edit save cancel deleteLink";
        var defaultButtons = 'saveLink cancelLink deleteLink';
        return individual.rights.then(function (rights) {
          var canUpdate = rights.hasValue('v-s:canUpdate', true);
          var canDelete = rights.hasValue('v-s:canDelete', true);
          var enabledButtons = (container.data('buttons') || defaultButtons).split(' ');
          enabledButtons.forEach(function (id) {
            if (!canUpdate && (id === 'save' || id === 'edit' || id === 'cancel')) {
              return;
            }
            if (!canDelete && id === 'deleteLink') {
              return;
            }
            $('#' + id, template).removeClass('rm');
          });
          $('.rm', template).remove();
        });
      });
      _export("post", post = function post(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);

        // Respect validation state of parent template
        var closest = template.parent().closest('[resource]');
        closest.on('internal-validated', function (e) {
          var validation = e.detail;
          if (validation.state) {
            $('.action#saveLink', template).removeAttr('disabled');
          } else {
            $('.action#saveLink', template).attr('disabled', 'disabled');
          }
          e.stopPropagation();
        });
      });
      _export("html", html = "\n  <span>\n    <!--<button title=\"v-s:Edit\" type=\"button\" class=\"action btn btn-xs btn-default view -edit -search glyphicon glyphicon-pencil\" id=\"edit\"></button>-->\n    <button title=\"v-s:Save\" type=\"button\" class=\"action btn btn-xs btn-success -view edit -search glyphicon glyphicon-ok\" data-action=\"save\" id=\"saveLink\"></button>\n    <button title=\"v-s:Cancel\" type=\"button\" class=\"action btn btn-xs btn-default -view edit -search glyphicon glyphicon-repeat\" data-action=\"kancel\" id=\"cancelLink\"></button>\n    <button title=\"v-s:Delete\" type=\"button\" class=\"action btn btn-xs btn-default view -edit -search glyphicon glyphicon-remove\" data-action=\"delete\" id=\"deleteLink\"></button>\n  </span>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJDb21tb25VdGlsIiwiX2pzQ29tbW9uVXRpbEpzIiwiZGVmYXVsdCIsIl9qcXVlcnkiLCIkIiwiX2pzQ29tbW9uSW5kaXZpZHVhbF9tb2RlbEpzIiwiSW5kaXZpZHVhbE1vZGVsIiwiZXhlY3V0ZSIsIl9leHBvcnQiLCJwcmUiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJvbiIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImFjdGlvbiIsImF0dHIiLCJ3YXJuaW5nIiwibG9hZCIsInRoZW4iLCJjb25maXJtIiwibWFwIiwiZm9ybWF0VmFsdWUiLCJqb2luIiwicGFyZW50IiwiY2xvc2VzdCIsImRpc3BhdGNoRXZlbnQiLCJFdmVudCIsImRlZmF1bHRCdXR0b25zIiwicmlnaHRzIiwiY2FuVXBkYXRlIiwiaGFzVmFsdWUiLCJjYW5EZWxldGUiLCJlbmFibGVkQnV0dG9ucyIsImRhdGEiLCJzcGxpdCIsImZvckVhY2giLCJpZCIsInJlbW92ZUNsYXNzIiwicmVtb3ZlIiwicG9zdCIsInZhbGlkYXRpb24iLCJkZXRhaWwiLCJzdGF0ZSIsInJlbW92ZUF0dHIiLCJzdG9wUHJvcGFnYXRpb24iLCJodG1sIl0sInNvdXJjZXMiOlsiLi4vLi4vb250b2xvZ3kvc3lzdGVtLWNvcmUvdGVtcGxhdGVzL3YtdWlfSWNvbkJ1dHRvbnNUZW1wbGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tbW9uVXRpbCBmcm9tICcvanMvY29tbW9uL3V0aWwuanMnO1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBJbmRpdmlkdWFsTW9kZWwgZnJvbSAnL2pzL2NvbW1vbi9pbmRpdmlkdWFsX21vZGVsLmpzJztcblxuZXhwb3J0IGNvbnN0IHByZSA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgdGVtcGxhdGUub24oJ2NsaWNrJywgJyNzYXZlTGluaywgI2NhbmNlbExpbmssICNkZWxldGVMaW5rJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgYWN0aW9uID0gJCh0aGlzKS5hdHRyKCdkYXRhLWFjdGlvbicpO1xuICAgIGlmIChhY3Rpb24gPT09ICdkZWxldGUnKSB7XG4gICAgICBjb25zdCB3YXJuaW5nID0gbmV3IEluZGl2aWR1YWxNb2RlbCgndi1zOkFyZVlvdVN1cmUnKTtcbiAgICAgIHdhcm5pbmcubG9hZCgpLnRoZW4oZnVuY3Rpb24gKHdhcm5pbmcpIHtcbiAgICAgICAgaWYgKGNvbmZpcm0od2FybmluZ1sncmRmczpsYWJlbCddLm1hcChDb21tb25VdGlsLmZvcm1hdFZhbHVlKS5qb2luKCcgJykpKSB7XG4gICAgICAgICAgdGVtcGxhdGUucGFyZW50KCkuY2xvc2VzdCgnW3Jlc291cmNlXScpWzBdLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KGFjdGlvbikpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGVtcGxhdGUucGFyZW50KCkuY2xvc2VzdCgnW3Jlc291cmNlXScpWzBdLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KGFjdGlvbikpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gdmFyIGFsbEJ1dHRvbnMgPSBcImVkaXQgc2F2ZSBjYW5jZWwgZGVsZXRlTGlua1wiO1xuICBjb25zdCBkZWZhdWx0QnV0dG9ucyA9ICdzYXZlTGluayBjYW5jZWxMaW5rIGRlbGV0ZUxpbmsnO1xuICByZXR1cm4gaW5kaXZpZHVhbC5yaWdodHMudGhlbihmdW5jdGlvbiAocmlnaHRzKSB7XG4gICAgY29uc3QgY2FuVXBkYXRlID0gcmlnaHRzLmhhc1ZhbHVlKCd2LXM6Y2FuVXBkYXRlJywgdHJ1ZSk7XG4gICAgY29uc3QgY2FuRGVsZXRlID0gcmlnaHRzLmhhc1ZhbHVlKCd2LXM6Y2FuRGVsZXRlJywgdHJ1ZSk7XG4gICAgY29uc3QgZW5hYmxlZEJ1dHRvbnMgPSAoY29udGFpbmVyLmRhdGEoJ2J1dHRvbnMnKSB8fCBkZWZhdWx0QnV0dG9ucykuc3BsaXQoJyAnKTtcbiAgICBlbmFibGVkQnV0dG9ucy5mb3JFYWNoKGZ1bmN0aW9uIChpZCkge1xuICAgICAgaWYgKCFjYW5VcGRhdGUgJiYgKGlkID09PSAnc2F2ZScgfHwgaWQgPT09ICdlZGl0JyB8fCBpZCA9PT0gJ2NhbmNlbCcpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICghY2FuRGVsZXRlICYmIGlkID09PSAnZGVsZXRlTGluaycpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgJCgnIycgKyBpZCwgdGVtcGxhdGUpLnJlbW92ZUNsYXNzKCdybScpO1xuICAgIH0pO1xuICAgICQoJy5ybScsIHRlbXBsYXRlKS5yZW1vdmUoKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgcG9zdCA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgLy8gUmVzcGVjdCB2YWxpZGF0aW9uIHN0YXRlIG9mIHBhcmVudCB0ZW1wbGF0ZVxuICBjb25zdCBjbG9zZXN0ID0gdGVtcGxhdGUucGFyZW50KCkuY2xvc2VzdCgnW3Jlc291cmNlXScpO1xuICBjbG9zZXN0Lm9uKCdpbnRlcm5hbC12YWxpZGF0ZWQnLCBmdW5jdGlvbiAoZSkge1xuICAgIGNvbnN0IHZhbGlkYXRpb24gPSBlLmRldGFpbDtcbiAgICBpZiAodmFsaWRhdGlvbi5zdGF0ZSkge1xuICAgICAgJCgnLmFjdGlvbiNzYXZlTGluaycsIHRlbXBsYXRlKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKCcuYWN0aW9uI3NhdmVMaW5rJywgdGVtcGxhdGUpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgfVxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGh0bWwgPSBgXG4gIDxzcGFuPlxuICAgIDwhLS08YnV0dG9uIHRpdGxlPVwidi1zOkVkaXRcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJhY3Rpb24gYnRuIGJ0bi14cyBidG4tZGVmYXVsdCB2aWV3IC1lZGl0IC1zZWFyY2ggZ2x5cGhpY29uIGdseXBoaWNvbi1wZW5jaWxcIiBpZD1cImVkaXRcIj48L2J1dHRvbj4tLT5cbiAgICA8YnV0dG9uIHRpdGxlPVwidi1zOlNhdmVcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJhY3Rpb24gYnRuIGJ0bi14cyBidG4tc3VjY2VzcyAtdmlldyBlZGl0IC1zZWFyY2ggZ2x5cGhpY29uIGdseXBoaWNvbi1va1wiIGRhdGEtYWN0aW9uPVwic2F2ZVwiIGlkPVwic2F2ZUxpbmtcIj48L2J1dHRvbj5cbiAgICA8YnV0dG9uIHRpdGxlPVwidi1zOkNhbmNlbFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImFjdGlvbiBidG4gYnRuLXhzIGJ0bi1kZWZhdWx0IC12aWV3IGVkaXQgLXNlYXJjaCBnbHlwaGljb24gZ2x5cGhpY29uLXJlcGVhdFwiIGRhdGEtYWN0aW9uPVwia2FuY2VsXCIgaWQ9XCJjYW5jZWxMaW5rXCI+PC9idXR0b24+XG4gICAgPGJ1dHRvbiB0aXRsZT1cInYtczpEZWxldGVcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJhY3Rpb24gYnRuIGJ0bi14cyBidG4tZGVmYXVsdCB2aWV3IC1lZGl0IC1zZWFyY2ggZ2x5cGhpY29uIGdseXBoaWNvbi1yZW1vdmVcIiBkYXRhLWFjdGlvbj1cImRlbGV0ZVwiIGlkPVwiZGVsZXRlTGlua1wiPjwvYnV0dG9uPlxuICA8L3NwYW4+XG5gO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztNQUFPQSxVQUFVLEdBQUFDLGVBQUEsQ0FB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