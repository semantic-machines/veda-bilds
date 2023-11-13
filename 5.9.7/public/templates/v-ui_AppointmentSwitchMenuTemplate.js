"use strict";

System.register(["jquery", "/js/common/veda.js", "/js/common/backend.js"], function (_export, _context) {
  "use strict";

  var $, veda, Backend, post, html;
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_jsCommonVedaJs) {
      veda = _jsCommonVedaJs.default;
    }, function (_jsCommonBackendJs) {
      Backend = _jsCommonBackendJs.default;
    }],
    execute: function () {
      _export("post", post = function post(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        return Backend.query({
          ticket: veda.ticket,
          query: "'rdf:type'==='v-s:Appointment' && 'v-s:official'==true && 'v-s:employee'==='" + individual.id + "'"
        }).then(function (result) {
          var apps = result.result;
          if (apps.length > 1) {
            template.on('click', function (e) {
              e.preventDefault();
              $('.switch-appointment').modal('show');
            });
          } else {
            template.remove();
            container.remove();
          }
        });
      });
      _export("html", html = "\n  <a href=\"#\" about=\"@\">\n    <span href=\"#\" about=\"@\" rel=\"v-s:defaultAppointment\">\n      <span href=\"#\" about=\"@\" rel=\"v-s:occupation\">\n        <span class=\"no-margin\" style=\"width:150px; text-overflow: ellipsis; white-space: nowrap;\"> <span property=\"rdfs:label\"></span> &udarr; </span>\n      </span>\n    </span>\n  </a>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfanNDb21tb25WZWRhSnMiLCJ2ZWRhIiwiX2pzQ29tbW9uQmFja2VuZEpzIiwiQmFja2VuZCIsImV4ZWN1dGUiLCJfZXhwb3J0IiwicG9zdCIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsInF1ZXJ5IiwidGlja2V0IiwiaWQiLCJ0aGVuIiwicmVzdWx0IiwiYXBwcyIsImxlbmd0aCIsIm9uIiwiZSIsInByZXZlbnREZWZhdWx0IiwibW9kYWwiLCJyZW1vdmUiLCJodG1sIl0sInNvdXJjZXMiOlsiLi4vLi4vb250b2xvZ3kvc3lzdGVtLWNvcmUvdGVtcGxhdGVzL3YtdWlfQXBwb2ludG1lbnRTd2l0Y2hNZW51VGVtcGxhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB2ZWRhIGZyb20gJy9qcy9jb21tb24vdmVkYS5qcyc7XG5pbXBvcnQgQmFja2VuZCBmcm9tICcvanMvY29tbW9uL2JhY2tlbmQuanMnO1xuXG5leHBvcnQgY29uc3QgcG9zdCA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgcmV0dXJuIEJhY2tlbmQucXVlcnkoe1xuICAgIHRpY2tldDogdmVkYS50aWNrZXQsXG4gICAgcXVlcnk6IFwiJ3JkZjp0eXBlJz09PSd2LXM6QXBwb2ludG1lbnQnICYmICd2LXM6b2ZmaWNpYWwnPT10cnVlICYmICd2LXM6ZW1wbG95ZWUnPT09J1wiICsgaW5kaXZpZHVhbC5pZCArIFwiJ1wiLFxuICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICBjb25zdCBhcHBzID0gcmVzdWx0LnJlc3VsdDtcbiAgICBpZiAoYXBwcy5sZW5ndGggPiAxKSB7XG4gICAgICB0ZW1wbGF0ZS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoJy5zd2l0Y2gtYXBwb2ludG1lbnQnKS5tb2RhbCgnc2hvdycpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRlbXBsYXRlLnJlbW92ZSgpO1xuICAgICAgY29udGFpbmVyLnJlbW92ZSgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgaHRtbCA9IGBcbiAgPGEgaHJlZj1cIiNcIiBhYm91dD1cIkBcIj5cbiAgICA8c3BhbiBocmVmPVwiI1wiIGFib3V0PVwiQFwiIHJlbD1cInYtczpkZWZhdWx0QXBwb2ludG1lbnRcIj5cbiAgICAgIDxzcGFuIGhyZWY9XCIjXCIgYWJvdXQ9XCJAXCIgcmVsPVwidi1zOm9jY3VwYXRpb25cIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJuby1tYXJnaW5cIiBzdHlsZT1cIndpZHRoOjE1MHB4OyB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpczsgd2hpdGUtc3BhY2U6IG5vd3JhcDtcIj4gPHNwYW4gcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9zcGFuPiAmdWRhcnI7IDwvc3Bhbj5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L3NwYW4+XG4gIDwvYT5cbmA7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O01BQU9BLENBQUMsR0FBQUMsT0FBQSxDQUFBQyxPQUFBO0lBQUEsYUFBQUMsZUFBQTtNQUNEQyxJQUFJLEdBQUFELGVBQUEsQ0FBQUQsT0FBQTtJQUFBLGFBQUFHLGtCQUFBO01BQ0pDLE9BQU8sR0FBQUQsa0JBQUEsQ0FBQUgsT0FBQTtJQUFBO0lBQUFLLE9BQUEsV0FBQUEsQ0FBQTtNQUFBQyxPQUFBLFNBRURDLElBQUksR0FBRyxTQUFQQSxJQUFJQSxDQUFhQyxVQUFVLEVBQUVDLFFBQVEsRUFBRUMsU0FBUyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRTtRQUMxRUgsUUFBUSxHQUFHWCxDQUFDLENBQUNXLFFBQVEsQ0FBQztRQUN0QkMsU0FBUyxHQUFHWixDQUFDLENBQUNZLFNBQVMsQ0FBQztRQUV4QixPQUFPTixPQUFPLENBQUNTLEtBQUssQ0FBQztVQUNuQkMsTUFBTSxFQUFFWixJQUFJLENBQUNZLE1BQU07VUFDbkJELEtBQUssRUFBRSw4RUFBOEUsR0FBR0wsVUFBVSxDQUFDTyxFQUFFLEdBQUc7UUFDMUcsQ0FBQyxDQUFDLENBQUNDLElBQUksQ0FBQyxVQUFVQyxNQUFNLEVBQUU7VUFDeEIsSUFBTUMsSUFBSSxHQUFHRCxNQUFNLENBQUNBLE1BQU07VUFDMUIsSUFBSUMsSUFBSSxDQUFDQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ25CVixRQUFRLENBQUNXLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVUMsQ0FBQyxFQUFFO2NBQ2hDQSxDQUFDLENBQUNDLGNBQWMsRUFBRTtjQUNsQnhCLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDeUIsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUN4QyxDQUFDLENBQUM7VUFDSixDQUFDLE1BQU07WUFDTGQsUUFBUSxDQUFDZSxNQUFNLEVBQUU7WUFDakJkLFNBQVMsQ0FBQ2MsTUFBTSxFQUFFO1VBQ3BCO1FBQ0YsQ0FBQyxDQUFDO01BQ0osQ0FBQztNQUFBbEIsT0FBQSxTQUVZbUIsSUFBSTtJQUFBO0VBQUE7QUFBQSJ9