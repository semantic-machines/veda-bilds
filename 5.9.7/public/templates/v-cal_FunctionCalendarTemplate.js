"use strict";

System.register(["jquery", "/js/common/veda.js"], function (_export, _context) {
  "use strict";

  var $, veda, post, html;
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_jsCommonVedaJs) {
      veda = _jsCommonVedaJs.default;
    }],
    execute: function () {
      _export("post", post = function post(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        Promise.all([_context.import('moment'), _context.import('fullcalendar'), _context.import('fullcalendar-locale'), _context.import('fullcalendar-style')]).then(function (resolved) {
          var rules = resolved[3].default;
          var list = rules.cssRules || rules.rules;
          var len = list.length;
          var rulesTxt = '';
          for (var i = 0; i < len; i++) {
            rulesTxt += ' ' + list[i].cssText;
          }
          var style = document.createElement('style');
          style.textContent = rulesTxt;
          template.prepend(style);
          var fullCalendarOptions = {
            eventSources: [{
              events: function events(start, end, timezone, callback) {
                individual.getEvents(start, end).then(function (events) {
                  callback(events);
                });
              }
            }],
            header: {
              left: 'today',
              center: 'prev title next',
              right: 'month,agendaWeek,agendaDay,listWeek'
            },
            navLinks: true,
            firstDay: 1,
            defaultView: 'agendaWeek',
            weekNumbers: true,
            weekNumberCalculation: 'ISO',
            businessHours: {
              dow: [1, 2, 3, 4, 5],
              start: '8:00',
              end: '18:00'
            },
            locale: Object.keys(veda.user.preferences.language)[0].toLowerCase(),
            timezone: 'local',
            height: function height() {
              var top = $('#fullcalendar', template).offset().top;
              var bottom = container.next().offset().top;
              return bottom - top - 30;
            }
          };
          var calendar = $('#fullcalendar', template);
          calendar.fullCalendar(fullCalendarOptions);
          template.one('remove', function () {
            return calendar.fullCalendar('destroy');
          });
        });
      });
      _export("html", html = "\n  <div class=\"container-fluid sheet\">\n    <br />\n    <div id=\"fullcalendar\"></div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfanNDb21tb25WZWRhSnMiLCJ2ZWRhIiwiZXhlY3V0ZSIsIl9leHBvcnQiLCJwb3N0IiwiaW5kaXZpZHVhbCIsInRlbXBsYXRlIiwiY29udGFpbmVyIiwibW9kZSIsImV4dHJhIiwiUHJvbWlzZSIsImFsbCIsIl9jb250ZXh0IiwiaW1wb3J0IiwidGhlbiIsInJlc29sdmVkIiwicnVsZXMiLCJsaXN0IiwiY3NzUnVsZXMiLCJsZW4iLCJsZW5ndGgiLCJydWxlc1R4dCIsImkiLCJjc3NUZXh0Iiwic3R5bGUiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsInByZXBlbmQiLCJmdWxsQ2FsZW5kYXJPcHRpb25zIiwiZXZlbnRTb3VyY2VzIiwiZXZlbnRzIiwic3RhcnQiLCJlbmQiLCJ0aW1lem9uZSIsImNhbGxiYWNrIiwiZ2V0RXZlbnRzIiwiaGVhZGVyIiwibGVmdCIsImNlbnRlciIsInJpZ2h0IiwibmF2TGlua3MiLCJmaXJzdERheSIsImRlZmF1bHRWaWV3Iiwid2Vla051bWJlcnMiLCJ3ZWVrTnVtYmVyQ2FsY3VsYXRpb24iLCJidXNpbmVzc0hvdXJzIiwiZG93IiwibG9jYWxlIiwiT2JqZWN0Iiwia2V5cyIsInVzZXIiLCJwcmVmZXJlbmNlcyIsImxhbmd1YWdlIiwidG9Mb3dlckNhc2UiLCJoZWlnaHQiLCJ0b3AiLCJvZmZzZXQiLCJib3R0b20iLCJuZXh0IiwiY2FsZW5kYXIiLCJmdWxsQ2FsZW5kYXIiLCJvbmUiLCJodG1sIl0sInNvdXJjZXMiOlsiLi4vLi4vb250b2xvZ3kvZ2VuZXJpYy1mdW5jdGlvbi90ZW1wbGF0ZXMvdi1jYWxfRnVuY3Rpb25DYWxlbmRhclRlbXBsYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgdmVkYSBmcm9tICcvanMvY29tbW9uL3ZlZGEuanMnO1xuXG5leHBvcnQgY29uc3QgcG9zdCA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgUHJvbWlzZS5hbGwoW2ltcG9ydCgnbW9tZW50JyksIGltcG9ydCgnZnVsbGNhbGVuZGFyJyksIGltcG9ydCgnZnVsbGNhbGVuZGFyLWxvY2FsZScpLCBpbXBvcnQoJ2Z1bGxjYWxlbmRhci1zdHlsZScpXSkudGhlbigocmVzb2x2ZWQpID0+IHtcbiAgICBjb25zdCBydWxlcyA9IHJlc29sdmVkWzNdLmRlZmF1bHQ7XG4gICAgY29uc3QgbGlzdCA9IHJ1bGVzLmNzc1J1bGVzIHx8IHJ1bGVzLnJ1bGVzO1xuICAgIGNvbnN0IGxlbiA9IGxpc3QubGVuZ3RoO1xuICAgIGxldCBydWxlc1R4dCA9ICcnO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHJ1bGVzVHh0ICs9ICcgJyArIGxpc3RbaV0uY3NzVGV4dDtcbiAgICB9XG4gICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIHN0eWxlLnRleHRDb250ZW50ID0gcnVsZXNUeHQ7XG4gICAgdGVtcGxhdGUucHJlcGVuZChzdHlsZSk7XG5cbiAgICBjb25zdCBmdWxsQ2FsZW5kYXJPcHRpb25zID0ge1xuICAgICAgZXZlbnRTb3VyY2VzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBldmVudHM6IChzdGFydCwgZW5kLCB0aW1lem9uZSwgY2FsbGJhY2spID0+IHtcbiAgICAgICAgICAgIGluZGl2aWR1YWwuZ2V0RXZlbnRzKHN0YXJ0LCBlbmQpLnRoZW4oKGV2ZW50cykgPT4ge1xuICAgICAgICAgICAgICBjYWxsYmFjayhldmVudHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBoZWFkZXI6IHtcbiAgICAgICAgbGVmdDogJ3RvZGF5JyxcbiAgICAgICAgY2VudGVyOiAncHJldiB0aXRsZSBuZXh0JyxcbiAgICAgICAgcmlnaHQ6ICdtb250aCxhZ2VuZGFXZWVrLGFnZW5kYURheSxsaXN0V2VlaycsXG4gICAgICB9LFxuICAgICAgbmF2TGlua3M6IHRydWUsXG4gICAgICBmaXJzdERheTogMSxcbiAgICAgIGRlZmF1bHRWaWV3OiAnYWdlbmRhV2VlaycsXG4gICAgICB3ZWVrTnVtYmVyczogdHJ1ZSxcbiAgICAgIHdlZWtOdW1iZXJDYWxjdWxhdGlvbjogJ0lTTycsXG4gICAgICBidXNpbmVzc0hvdXJzOiB7XG4gICAgICAgIGRvdzogWzEsIDIsIDMsIDQsIDVdLFxuICAgICAgICBzdGFydDogJzg6MDAnLFxuICAgICAgICBlbmQ6ICcxODowMCcsXG4gICAgICB9LFxuICAgICAgbG9jYWxlOiBPYmplY3Qua2V5cyh2ZWRhLnVzZXIucHJlZmVyZW5jZXMubGFuZ3VhZ2UpWzBdLnRvTG93ZXJDYXNlKCksXG4gICAgICB0aW1lem9uZTogJ2xvY2FsJyxcbiAgICAgIGhlaWdodDogKCkgPT4ge1xuICAgICAgICBjb25zdCB0b3AgPSAkKCcjZnVsbGNhbGVuZGFyJywgdGVtcGxhdGUpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgY29uc3QgYm90dG9tID0gY29udGFpbmVyLm5leHQoKS5vZmZzZXQoKS50b3A7XG4gICAgICAgIHJldHVybiBib3R0b20gLSB0b3AgLSAzMDtcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGNvbnN0IGNhbGVuZGFyID0gJCgnI2Z1bGxjYWxlbmRhcicsIHRlbXBsYXRlKTtcbiAgICBjYWxlbmRhci5mdWxsQ2FsZW5kYXIoZnVsbENhbGVuZGFyT3B0aW9ucyk7XG4gICAgdGVtcGxhdGUub25lKCdyZW1vdmUnLCAoKSA9PiBjYWxlbmRhci5mdWxsQ2FsZW5kYXIoJ2Rlc3Ryb3knKSk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGh0bWwgPSBgXG4gIDxkaXYgY2xhc3M9XCJjb250YWluZXItZmx1aWQgc2hlZXRcIj5cbiAgICA8YnIgLz5cbiAgICA8ZGl2IGlkPVwiZnVsbGNhbGVuZGFyXCI+PC9kaXY+XG4gIDwvZGl2PlxuYDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7TUFBT0EsQ0FBQyxHQUFBQyxPQUFBLENBQUFDLE9BQUE7SUFBQSxhQUFBQyxlQUFBO01BQ0RDLElBQUksR0FBQUQsZUFBQSxDQUFBRCxPQUFBO0lBQUE7SUFBQUcsT0FBQSxXQUFBQSxDQUFBO01BQUFDLE9BQUEsU0FFRUMsSUFBSSxHQUFHLFNBQVBBLElBQUlBLENBQWFDLFVBQVUsRUFBRUMsUUFBUSxFQUFFQyxTQUFTLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFO1FBQzFFSCxRQUFRLEdBQUdULENBQUMsQ0FBQ1MsUUFBUSxDQUFDO1FBQ3RCQyxTQUFTLEdBQUdWLENBQUMsQ0FBQ1UsU0FBUyxDQUFDO1FBRXhCRyxPQUFPLENBQUNDLEdBQUcsQ0FBQyxDQUFBQyxRQUFBLENBQUFDLE1BQUEsQ0FBUSxRQUFRLEdBQUFELFFBQUEsQ0FBQUMsTUFBQSxDQUFVLGNBQWMsR0FBQUQsUUFBQSxDQUFBQyxNQUFBLENBQVUscUJBQXFCLEdBQUFELFFBQUEsQ0FBQUMsTUFBQSxDQUFVLG9CQUFvQixFQUFFLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLFVBQUNDLFFBQVEsRUFBSztVQUN0SSxJQUFNQyxLQUFLLEdBQUdELFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQ2hCLE9BQU87VUFDakMsSUFBTWtCLElBQUksR0FBR0QsS0FBSyxDQUFDRSxRQUFRLElBQUlGLEtBQUssQ0FBQ0EsS0FBSztVQUMxQyxJQUFNRyxHQUFHLEdBQUdGLElBQUksQ0FBQ0csTUFBTTtVQUN2QixJQUFJQyxRQUFRLEdBQUcsRUFBRTtVQUNqQixLQUFLLElBQUlDLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR0gsR0FBRyxFQUFFRyxDQUFDLEVBQUUsRUFBRTtZQUM1QkQsUUFBUSxJQUFJLEdBQUcsR0FBR0osSUFBSSxDQUFDSyxDQUFDLENBQUMsQ0FBQ0MsT0FBTztVQUNuQztVQUNBLElBQU1DLEtBQUssR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsT0FBTyxDQUFDO1VBQzdDRixLQUFLLENBQUNHLFdBQVcsR0FBR04sUUFBUTtVQUM1QmYsUUFBUSxDQUFDc0IsT0FBTyxDQUFDSixLQUFLLENBQUM7VUFFdkIsSUFBTUssbUJBQW1CLEdBQUc7WUFDMUJDLFlBQVksRUFBRSxDQUNaO2NBQ0VDLE1BQU0sRUFBRSxTQUFBQSxPQUFDQyxLQUFLLEVBQUVDLEdBQUcsRUFBRUMsUUFBUSxFQUFFQyxRQUFRLEVBQUs7Z0JBQzFDOUIsVUFBVSxDQUFDK0IsU0FBUyxDQUFDSixLQUFLLEVBQUVDLEdBQUcsQ0FBQyxDQUFDbkIsSUFBSSxDQUFDLFVBQUNpQixNQUFNLEVBQUs7a0JBQ2hESSxRQUFRLENBQUNKLE1BQU0sQ0FBQztnQkFDbEIsQ0FBQyxDQUFDO2NBQ0o7WUFDRixDQUFDLENBQ0Y7WUFDRE0sTUFBTSxFQUFFO2NBQ05DLElBQUksRUFBRSxPQUFPO2NBQ2JDLE1BQU0sRUFBRSxpQkFBaUI7Y0FDekJDLEtBQUssRUFBRTtZQUNULENBQUM7WUFDREMsUUFBUSxFQUFFLElBQUk7WUFDZEMsUUFBUSxFQUFFLENBQUM7WUFDWEMsV0FBVyxFQUFFLFlBQVk7WUFDekJDLFdBQVcsRUFBRSxJQUFJO1lBQ2pCQyxxQkFBcUIsRUFBRSxLQUFLO1lBQzVCQyxhQUFhLEVBQUU7Y0FDYkMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztjQUNwQmYsS0FBSyxFQUFFLE1BQU07Y0FDYkMsR0FBRyxFQUFFO1lBQ1AsQ0FBQztZQUNEZSxNQUFNLEVBQUVDLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDakQsSUFBSSxDQUFDa0QsSUFBSSxDQUFDQyxXQUFXLENBQUNDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDQyxXQUFXLEVBQUU7WUFDcEVwQixRQUFRLEVBQUUsT0FBTztZQUNqQnFCLE1BQU0sRUFBRSxTQUFBQSxPQUFBLEVBQU07Y0FDWixJQUFNQyxHQUFHLEdBQUczRCxDQUFDLENBQUMsZUFBZSxFQUFFUyxRQUFRLENBQUMsQ0FBQ21ELE1BQU0sRUFBRSxDQUFDRCxHQUFHO2NBQ3JELElBQU1FLE1BQU0sR0FBR25ELFNBQVMsQ0FBQ29ELElBQUksRUFBRSxDQUFDRixNQUFNLEVBQUUsQ0FBQ0QsR0FBRztjQUM1QyxPQUFPRSxNQUFNLEdBQUdGLEdBQUcsR0FBRyxFQUFFO1lBQzFCO1VBQ0YsQ0FBQztVQUVELElBQU1JLFFBQVEsR0FBRy9ELENBQUMsQ0FBQyxlQUFlLEVBQUVTLFFBQVEsQ0FBQztVQUM3Q3NELFFBQVEsQ0FBQ0MsWUFBWSxDQUFDaEMsbUJBQW1CLENBQUM7VUFDMUN2QixRQUFRLENBQUN3RCxHQUFHLENBQUMsUUFBUSxFQUFFO1lBQUEsT0FBTUYsUUFBUSxDQUFDQyxZQUFZLENBQUMsU0FBUyxDQUFDO1VBQUEsRUFBQztRQUNoRSxDQUFDLENBQUM7TUFDSixDQUFDO01BQUExRCxPQUFBLFNBRVk0RCxJQUFJO0lBQUE7RUFBQTtBQUFBIn0=