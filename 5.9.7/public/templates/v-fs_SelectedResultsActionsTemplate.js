"use strict";

System.register(["/js/browser/util.js", "jquery", "/js/common/veda.js", "/js/common/backend.js", "/js/common/individual_model.js"], function (_export, _context) {
  "use strict";

  var BrowserUtil, $, veda, Backend, IndividualModel, pre, html;
  return {
    setters: [function (_jsBrowserUtilJs) {
      BrowserUtil = _jsBrowserUtilJs.default;
    }, function (_jquery) {
      $ = _jquery.default;
    }, function (_jsCommonVedaJs) {
      veda = _jsCommonVedaJs.default;
    }, function (_jsCommonBackendJs) {
      Backend = _jsCommonBackendJs.default;
    }, function (_jsCommonIndividual_modelJs) {
      IndividualModel = _jsCommonIndividual_modelJs.default;
    }],
    execute: function () {
      _export("pre", pre = function pre(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        var self = this;
        self.on('v-fs:selected', populateOps);
        template.one('remove', function () {
          self.off('v-fs:selected', populateOps);
        });
        var populated;
        if (self.hasValue('v-fs:selected')) {
          populateOps();
        }
        $('.dropdown-menu', template).on('click', '[resource]', createOp);
        $('.single-operation', template).on('click', createOp);
        function populateOps() {
          template.toggleClass('hidden', !self.hasValue('v-fs:selected'));
          if (populated) {
            return;
          }
          populated = true;
          var multi = $('.multi-operation', template);
          var list = $('.dropdown-menu', template);
          var listTemplate = "<li><a about='@' href='#' property='rdfs:label'></a></li>";
          var single = $('.single-operation', template);
          var singleTemplate = "<span about='@' href='#' property='rdfs:label'></span>";
          var applicableOps = self['v-fs:applicableOperation'];
          return Backend.query({
            ticket: veda.ticket,
            query: "'rdf:type' === 'owl:Class' && 'rdfs:subClassOf' === 'v-s:GenericOperation'"
          }).then(function (response) {
            response.result.forEach(function (operation_uri) {
              applicableOps.push(new IndividualModel(operation_uri));
            });
            return Promise.all(applicableOps.map(function (op) {
              return op.canCreate();
            }));
          }).then(function (canCreate) {
            applicableOps = applicableOps.filter(function (_, i) {
              return canCreate[i];
            });
            if (applicableOps.length === 0) {
              template.remove();
              return;
            } else if (applicableOps.length === 1) {
              multi.remove();
              applicableOps[0].present(single, singleTemplate);
            } else if (applicableOps.length > 1) {
              single.remove();
              applicableOps.forEach(function (op) {
                op.present(list, listTemplate);
              });
            }
            $('.hidden', template).removeClass('hidden');
          });
        }
        function createOp(e) {
          e.preventDefault();
          var $this = $(this);
          if ($this.hasClass('disabled')) {
            return;
          }
          var operationClassUri = $this.attr('resource') || $this.children().first().attr('resource');
          var operationClass = new IndividualModel(operationClassUri);
          var operation = new IndividualModel();
          $('.operation-container', template).empty();
          operation['rdf:type'] = [operationClass];
          // operation["v-s:dataQuery"] = self["v-fs:query"];
          operation['v-s:data'] = self['v-fs:selected'].slice();
          var modal = BrowserUtil.showSmallModal(operation);
          modal.on('click', '.action#start', function () {
            self['v-fs:operation'] = [operation];
            modal.on('hidden.bs.modal', function () {
              modal.modal('hide').remove();
            });
          });
        }
      });
      _export("html", html = "\n  <div class=\"hidden\" style=\"margin-top:-3px;\">\n    <button type=\"button\" class=\"pull-left btn btn-xs btn-primary single-operation hidden\"></button>\n    <div class=\"pull-left btn-group multi-operation hidden\">\n      <button type=\"button\" class=\"btn btn-xs btn-primary dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n        <span about=\"v-fs:PerformOperation\" property=\"rdfs:label\"></span> <span class=\"caret\"></span>\n      </button>\n      <ul class=\"dropdown-menu operations\"></ul>\n    </div>\n    <div about=\"@\" rel=\"v-fs:operation\" data-template=\"v-s:OperationStatusTemplate\" class=\"pull-left operation-container margin-md-h\"></div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJCcm93c2VyVXRpbCIsIl9qc0Jyb3dzZXJVdGlsSnMiLCJkZWZhdWx0IiwiX2pxdWVyeSIsIiQiLCJfanNDb21tb25WZWRhSnMiLCJ2ZWRhIiwiX2pzQ29tbW9uQmFja2VuZEpzIiwiQmFja2VuZCIsIl9qc0NvbW1vbkluZGl2aWR1YWxfbW9kZWxKcyIsIkluZGl2aWR1YWxNb2RlbCIsImV4ZWN1dGUiLCJfZXhwb3J0IiwicHJlIiwiaW5kaXZpZHVhbCIsInRlbXBsYXRlIiwiY29udGFpbmVyIiwibW9kZSIsImV4dHJhIiwic2VsZiIsIm9uIiwicG9wdWxhdGVPcHMiLCJvbmUiLCJvZmYiLCJwb3B1bGF0ZWQiLCJoYXNWYWx1ZSIsImNyZWF0ZU9wIiwidG9nZ2xlQ2xhc3MiLCJtdWx0aSIsImxpc3QiLCJsaXN0VGVtcGxhdGUiLCJzaW5nbGUiLCJzaW5nbGVUZW1wbGF0ZSIsImFwcGxpY2FibGVPcHMiLCJxdWVyeSIsInRpY2tldCIsInRoZW4iLCJyZXNwb25zZSIsInJlc3VsdCIsImZvckVhY2giLCJvcGVyYXRpb25fdXJpIiwicHVzaCIsIlByb21pc2UiLCJhbGwiLCJtYXAiLCJvcCIsImNhbkNyZWF0ZSIsImZpbHRlciIsIl8iLCJpIiwibGVuZ3RoIiwicmVtb3ZlIiwicHJlc2VudCIsInJlbW92ZUNsYXNzIiwiZSIsInByZXZlbnREZWZhdWx0IiwiJHRoaXMiLCJoYXNDbGFzcyIsIm9wZXJhdGlvbkNsYXNzVXJpIiwiYXR0ciIsImNoaWxkcmVuIiwiZmlyc3QiLCJvcGVyYXRpb25DbGFzcyIsIm9wZXJhdGlvbiIsImVtcHR5Iiwic2xpY2UiLCJtb2RhbCIsInNob3dTbWFsbE1vZGFsIiwiaHRtbCJdLCJzb3VyY2VzIjpbIi4uLy4uL29udG9sb2d5L2dlbmVyaWMtZnVuY3Rpb24vdGVtcGxhdGVzL3YtZnNfU2VsZWN0ZWRSZXN1bHRzQWN0aW9uc1RlbXBsYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCcm93c2VyVXRpbCBmcm9tICcvanMvYnJvd3Nlci91dGlsLmpzJztcbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgdmVkYSBmcm9tICcvanMvY29tbW9uL3ZlZGEuanMnO1xuaW1wb3J0IEJhY2tlbmQgZnJvbSAnL2pzL2NvbW1vbi9iYWNrZW5kLmpzJztcbmltcG9ydCBJbmRpdmlkdWFsTW9kZWwgZnJvbSAnL2pzL2NvbW1vbi9pbmRpdmlkdWFsX21vZGVsLmpzJztcblxuZXhwb3J0IGNvbnN0IHByZSA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gIHNlbGYub24oJ3YtZnM6c2VsZWN0ZWQnLCBwb3B1bGF0ZU9wcyk7XG4gIHRlbXBsYXRlLm9uZSgncmVtb3ZlJywgZnVuY3Rpb24gKCkge1xuICAgIHNlbGYub2ZmKCd2LWZzOnNlbGVjdGVkJywgcG9wdWxhdGVPcHMpO1xuICB9KTtcbiAgbGV0IHBvcHVsYXRlZDtcbiAgaWYgKHNlbGYuaGFzVmFsdWUoJ3YtZnM6c2VsZWN0ZWQnKSkge1xuICAgIHBvcHVsYXRlT3BzKCk7XG4gIH1cbiAgJCgnLmRyb3Bkb3duLW1lbnUnLCB0ZW1wbGF0ZSkub24oJ2NsaWNrJywgJ1tyZXNvdXJjZV0nLCBjcmVhdGVPcCk7XG4gICQoJy5zaW5nbGUtb3BlcmF0aW9uJywgdGVtcGxhdGUpLm9uKCdjbGljaycsIGNyZWF0ZU9wKTtcblxuICBmdW5jdGlvbiBwb3B1bGF0ZU9wcyAoKSB7XG4gICAgdGVtcGxhdGUudG9nZ2xlQ2xhc3MoJ2hpZGRlbicsICFzZWxmLmhhc1ZhbHVlKCd2LWZzOnNlbGVjdGVkJykpO1xuICAgIGlmIChwb3B1bGF0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcG9wdWxhdGVkID0gdHJ1ZTtcbiAgICBjb25zdCBtdWx0aSA9ICQoJy5tdWx0aS1vcGVyYXRpb24nLCB0ZW1wbGF0ZSk7XG4gICAgY29uc3QgbGlzdCA9ICQoJy5kcm9wZG93bi1tZW51JywgdGVtcGxhdGUpO1xuICAgIGNvbnN0IGxpc3RUZW1wbGF0ZSA9IFwiPGxpPjxhIGFib3V0PSdAJyBocmVmPScjJyBwcm9wZXJ0eT0ncmRmczpsYWJlbCc+PC9hPjwvbGk+XCI7XG4gICAgY29uc3Qgc2luZ2xlID0gJCgnLnNpbmdsZS1vcGVyYXRpb24nLCB0ZW1wbGF0ZSk7XG4gICAgY29uc3Qgc2luZ2xlVGVtcGxhdGUgPSBcIjxzcGFuIGFib3V0PSdAJyBocmVmPScjJyBwcm9wZXJ0eT0ncmRmczpsYWJlbCc+PC9zcGFuPlwiO1xuICAgIGxldCBhcHBsaWNhYmxlT3BzID0gc2VsZlsndi1mczphcHBsaWNhYmxlT3BlcmF0aW9uJ107XG4gICAgcmV0dXJuIEJhY2tlbmQucXVlcnkoe1xuICAgICAgdGlja2V0OiB2ZWRhLnRpY2tldCxcbiAgICAgIHF1ZXJ5OiBcIidyZGY6dHlwZScgPT09ICdvd2w6Q2xhc3MnICYmICdyZGZzOnN1YkNsYXNzT2YnID09PSAndi1zOkdlbmVyaWNPcGVyYXRpb24nXCIsXG4gICAgfSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICByZXNwb25zZS5yZXN1bHQuZm9yRWFjaChmdW5jdGlvbiAob3BlcmF0aW9uX3VyaSkge1xuICAgICAgICAgIGFwcGxpY2FibGVPcHMucHVzaChuZXcgSW5kaXZpZHVhbE1vZGVsKG9wZXJhdGlvbl91cmkpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChcbiAgICAgICAgICBhcHBsaWNhYmxlT3BzLm1hcChmdW5jdGlvbiAob3ApIHtcbiAgICAgICAgICAgIHJldHVybiBvcC5jYW5DcmVhdGUoKTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgICAudGhlbihmdW5jdGlvbiAoY2FuQ3JlYXRlKSB7XG4gICAgICAgIGFwcGxpY2FibGVPcHMgPSBhcHBsaWNhYmxlT3BzLmZpbHRlcihmdW5jdGlvbiAoXywgaSkge1xuICAgICAgICAgIHJldHVybiBjYW5DcmVhdGVbaV07XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoYXBwbGljYWJsZU9wcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0ZW1wbGF0ZS5yZW1vdmUoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAoYXBwbGljYWJsZU9wcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICBtdWx0aS5yZW1vdmUoKTtcbiAgICAgICAgICBhcHBsaWNhYmxlT3BzWzBdLnByZXNlbnQoc2luZ2xlLCBzaW5nbGVUZW1wbGF0ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoYXBwbGljYWJsZU9wcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgc2luZ2xlLnJlbW92ZSgpO1xuICAgICAgICAgIGFwcGxpY2FibGVPcHMuZm9yRWFjaChmdW5jdGlvbiAob3ApIHtcbiAgICAgICAgICAgIG9wLnByZXNlbnQobGlzdCwgbGlzdFRlbXBsYXRlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAkKCcuaGlkZGVuJywgdGVtcGxhdGUpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlT3AgKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgJHRoaXMgPSAkKHRoaXMpO1xuICAgIGlmICgkdGhpcy5oYXNDbGFzcygnZGlzYWJsZWQnKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBvcGVyYXRpb25DbGFzc1VyaSA9ICR0aGlzLmF0dHIoJ3Jlc291cmNlJykgfHwgJHRoaXMuY2hpbGRyZW4oKS5maXJzdCgpLmF0dHIoJ3Jlc291cmNlJyk7XG4gICAgY29uc3Qgb3BlcmF0aW9uQ2xhc3MgPSBuZXcgSW5kaXZpZHVhbE1vZGVsKG9wZXJhdGlvbkNsYXNzVXJpKTtcbiAgICBjb25zdCBvcGVyYXRpb24gPSBuZXcgSW5kaXZpZHVhbE1vZGVsKCk7XG4gICAgJCgnLm9wZXJhdGlvbi1jb250YWluZXInLCB0ZW1wbGF0ZSkuZW1wdHkoKTtcbiAgICBvcGVyYXRpb25bJ3JkZjp0eXBlJ10gPSBbb3BlcmF0aW9uQ2xhc3NdO1xuICAgIC8vIG9wZXJhdGlvbltcInYtczpkYXRhUXVlcnlcIl0gPSBzZWxmW1widi1mczpxdWVyeVwiXTtcbiAgICBvcGVyYXRpb25bJ3YtczpkYXRhJ10gPSBzZWxmWyd2LWZzOnNlbGVjdGVkJ10uc2xpY2UoKTtcbiAgICBjb25zdCBtb2RhbCA9IEJyb3dzZXJVdGlsLnNob3dTbWFsbE1vZGFsKG9wZXJhdGlvbik7XG4gICAgbW9kYWwub24oJ2NsaWNrJywgJy5hY3Rpb24jc3RhcnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmWyd2LWZzOm9wZXJhdGlvbiddID0gW29wZXJhdGlvbl07XG4gICAgICBtb2RhbC5vbignaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBtb2RhbC5tb2RhbCgnaGlkZScpLnJlbW92ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBodG1sID0gYFxuICA8ZGl2IGNsYXNzPVwiaGlkZGVuXCIgc3R5bGU9XCJtYXJnaW4tdG9wOi0zcHg7XCI+XG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJwdWxsLWxlZnQgYnRuIGJ0bi14cyBidG4tcHJpbWFyeSBzaW5nbGUtb3BlcmF0aW9uIGhpZGRlblwiPjwvYnV0dG9uPlxuICAgIDxkaXYgY2xhc3M9XCJwdWxsLWxlZnQgYnRuLWdyb3VwIG11bHRpLW9wZXJhdGlvbiBoaWRkZW5cIj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi14cyBidG4tcHJpbWFyeSBkcm9wZG93bi10b2dnbGVcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgYXJpYS1oYXNwb3B1cD1cInRydWVcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj5cbiAgICAgICAgPHNwYW4gYWJvdXQ9XCJ2LWZzOlBlcmZvcm1PcGVyYXRpb25cIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L3NwYW4+IDxzcGFuIGNsYXNzPVwiY2FyZXRcIj48L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnUgb3BlcmF0aW9uc1wiPjwvdWw+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBhYm91dD1cIkBcIiByZWw9XCJ2LWZzOm9wZXJhdGlvblwiIGRhdGEtdGVtcGxhdGU9XCJ2LXM6T3BlcmF0aW9uU3RhdHVzVGVtcGxhdGVcIiBjbGFzcz1cInB1bGwtbGVmdCBvcGVyYXRpb24tY29udGFpbmVyIG1hcmdpbi1tZC1oXCI+PC9kaXY+XG4gIDwvZGl2PlxuYDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7TUFBT0EsV0FBVyxHQUFBQyxnQkFBQSxDQUFBQyxPQUFBO0lBQUEsYUFBQUMsT0FBQTtNQUNYQyxDQUFDLEdBQUFELE9BQUEsQ0FBQUQsT0FBQTtJQUFBLGFBQUFHLGVBQUE7TUFDREMsSUFBSSxHQUFBRCxlQUFBLENBQUFILE9BQUE7SUFBQSxhQUFBSyxrQkFBQTtNQUNKQyxPQUFPLEdBQUFELGtCQUFBLENBQUFMLE9BQUE7SUFBQSxhQUFBTywyQkFBQTtNQUNQQyxlQUFlLEdBQUFELDJCQUFBLENBQUFQLE9BQUE7SUFBQTtJQUFBUyxPQUFBLFdBQUFBLENBQUE7TUFBQUMsT0FBQSxRQUVUQyxHQUFHLEdBQUcsU0FBTkEsR0FBR0EsQ0FBYUMsVUFBVSxFQUFFQyxRQUFRLEVBQUVDLFNBQVMsRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUU7UUFDekVILFFBQVEsR0FBR1gsQ0FBQyxDQUFDVyxRQUFRLENBQUM7UUFDdEJDLFNBQVMsR0FBR1osQ0FBQyxDQUFDWSxTQUFTLENBQUM7UUFFeEIsSUFBTUcsSUFBSSxHQUFHLElBQUk7UUFDakJBLElBQUksQ0FBQ0MsRUFBRSxDQUFDLGVBQWUsRUFBRUMsV0FBVyxDQUFDO1FBQ3JDTixRQUFRLENBQUNPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsWUFBWTtVQUNqQ0gsSUFBSSxDQUFDSSxHQUFHLENBQUMsZUFBZSxFQUFFRixXQUFXLENBQUM7UUFDeEMsQ0FBQyxDQUFDO1FBQ0YsSUFBSUcsU0FBUztRQUNiLElBQUlMLElBQUksQ0FBQ00sUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1VBQ2xDSixXQUFXLEVBQUU7UUFDZjtRQUNBakIsQ0FBQyxDQUFDLGdCQUFnQixFQUFFVyxRQUFRLENBQUMsQ0FBQ0ssRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUVNLFFBQVEsQ0FBQztRQUNqRXRCLENBQUMsQ0FBQyxtQkFBbUIsRUFBRVcsUUFBUSxDQUFDLENBQUNLLEVBQUUsQ0FBQyxPQUFPLEVBQUVNLFFBQVEsQ0FBQztRQUV0RCxTQUFTTCxXQUFXQSxDQUFBLEVBQUk7VUFDdEJOLFFBQVEsQ0FBQ1ksV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDUixJQUFJLENBQUNNLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQztVQUMvRCxJQUFJRCxTQUFTLEVBQUU7WUFDYjtVQUNGO1VBQ0FBLFNBQVMsR0FBRyxJQUFJO1VBQ2hCLElBQU1JLEtBQUssR0FBR3hCLENBQUMsQ0FBQyxrQkFBa0IsRUFBRVcsUUFBUSxDQUFDO1VBQzdDLElBQU1jLElBQUksR0FBR3pCLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRVcsUUFBUSxDQUFDO1VBQzFDLElBQU1lLFlBQVksR0FBRywyREFBMkQ7VUFDaEYsSUFBTUMsTUFBTSxHQUFHM0IsQ0FBQyxDQUFDLG1CQUFtQixFQUFFVyxRQUFRLENBQUM7VUFDL0MsSUFBTWlCLGNBQWMsR0FBRyx3REFBd0Q7VUFDL0UsSUFBSUMsYUFBYSxHQUFHZCxJQUFJLENBQUMsMEJBQTBCLENBQUM7VUFDcEQsT0FBT1gsT0FBTyxDQUFDMEIsS0FBSyxDQUFDO1lBQ25CQyxNQUFNLEVBQUU3QixJQUFJLENBQUM2QixNQUFNO1lBQ25CRCxLQUFLLEVBQUU7VUFDVCxDQUFDLENBQUMsQ0FDQ0UsSUFBSSxDQUFDLFVBQVVDLFFBQVEsRUFBRTtZQUN4QkEsUUFBUSxDQUFDQyxNQUFNLENBQUNDLE9BQU8sQ0FBQyxVQUFVQyxhQUFhLEVBQUU7Y0FDL0NQLGFBQWEsQ0FBQ1EsSUFBSSxDQUFDLElBQUkvQixlQUFlLENBQUM4QixhQUFhLENBQUMsQ0FBQztZQUN4RCxDQUFDLENBQUM7WUFDRixPQUFPRSxPQUFPLENBQUNDLEdBQUcsQ0FDaEJWLGFBQWEsQ0FBQ1csR0FBRyxDQUFDLFVBQVVDLEVBQUUsRUFBRTtjQUM5QixPQUFPQSxFQUFFLENBQUNDLFNBQVMsRUFBRTtZQUN2QixDQUFDLENBQUMsQ0FDSDtVQUNILENBQUMsQ0FBQyxDQUNEVixJQUFJLENBQUMsVUFBVVUsU0FBUyxFQUFFO1lBQ3pCYixhQUFhLEdBQUdBLGFBQWEsQ0FBQ2MsTUFBTSxDQUFDLFVBQVVDLENBQUMsRUFBRUMsQ0FBQyxFQUFFO2NBQ25ELE9BQU9ILFNBQVMsQ0FBQ0csQ0FBQyxDQUFDO1lBQ3JCLENBQUMsQ0FBQztZQUNGLElBQUloQixhQUFhLENBQUNpQixNQUFNLEtBQUssQ0FBQyxFQUFFO2NBQzlCbkMsUUFBUSxDQUFDb0MsTUFBTSxFQUFFO2NBQ2pCO1lBQ0YsQ0FBQyxNQUFNLElBQUlsQixhQUFhLENBQUNpQixNQUFNLEtBQUssQ0FBQyxFQUFFO2NBQ3JDdEIsS0FBSyxDQUFDdUIsTUFBTSxFQUFFO2NBQ2RsQixhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUNtQixPQUFPLENBQUNyQixNQUFNLEVBQUVDLGNBQWMsQ0FBQztZQUNsRCxDQUFDLE1BQU0sSUFBSUMsYUFBYSxDQUFDaUIsTUFBTSxHQUFHLENBQUMsRUFBRTtjQUNuQ25CLE1BQU0sQ0FBQ29CLE1BQU0sRUFBRTtjQUNmbEIsYUFBYSxDQUFDTSxPQUFPLENBQUMsVUFBVU0sRUFBRSxFQUFFO2dCQUNsQ0EsRUFBRSxDQUFDTyxPQUFPLENBQUN2QixJQUFJLEVBQUVDLFlBQVksQ0FBQztjQUNoQyxDQUFDLENBQUM7WUFDSjtZQUNBMUIsQ0FBQyxDQUFDLFNBQVMsRUFBRVcsUUFBUSxDQUFDLENBQUNzQyxXQUFXLENBQUMsUUFBUSxDQUFDO1VBQzlDLENBQUMsQ0FBQztRQUNOO1FBRUEsU0FBUzNCLFFBQVFBLENBQUU0QixDQUFDLEVBQUU7VUFDcEJBLENBQUMsQ0FBQ0MsY0FBYyxFQUFFO1VBQ2xCLElBQU1DLEtBQUssR0FBR3BELENBQUMsQ0FBQyxJQUFJLENBQUM7VUFDckIsSUFBSW9ELEtBQUssQ0FBQ0MsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzlCO1VBQ0Y7VUFDQSxJQUFNQyxpQkFBaUIsR0FBR0YsS0FBSyxDQUFDRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUlILEtBQUssQ0FBQ0ksUUFBUSxFQUFFLENBQUNDLEtBQUssRUFBRSxDQUFDRixJQUFJLENBQUMsVUFBVSxDQUFDO1VBQzdGLElBQU1HLGNBQWMsR0FBRyxJQUFJcEQsZUFBZSxDQUFDZ0QsaUJBQWlCLENBQUM7VUFDN0QsSUFBTUssU0FBUyxHQUFHLElBQUlyRCxlQUFlLEVBQUU7VUFDdkNOLENBQUMsQ0FBQyxzQkFBc0IsRUFBRVcsUUFBUSxDQUFDLENBQUNpRCxLQUFLLEVBQUU7VUFDM0NELFNBQVMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDRCxjQUFjLENBQUM7VUFDeEM7VUFDQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHNUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDOEMsS0FBSyxFQUFFO1VBQ3JELElBQU1DLEtBQUssR0FBR2xFLFdBQVcsQ0FBQ21FLGNBQWMsQ0FBQ0osU0FBUyxDQUFDO1VBQ25ERyxLQUFLLENBQUM5QyxFQUFFLENBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxZQUFZO1lBQzdDRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDNEMsU0FBUyxDQUFDO1lBQ3BDRyxLQUFLLENBQUM5QyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsWUFBWTtjQUN0QzhDLEtBQUssQ0FBQ0EsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDZixNQUFNLEVBQUU7WUFDOUIsQ0FBQyxDQUFDO1VBQ0osQ0FBQyxDQUFDO1FBQ0o7TUFDRixDQUFDO01BQUF2QyxPQUFBLFNBRVl3RCxJQUFJO0lBQUE7RUFBQTtBQUFBIn0=