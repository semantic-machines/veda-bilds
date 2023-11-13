"use strict";

System.register(["jquery"], function (_export, _context) {
  "use strict";

  var $, pre, html;
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }],
    execute: function () {
      _export("pre", pre = function pre(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        progressHandler();
        statusHandler();
        individual.on('v-s:progress', progressHandler);
        individual.on('v-s:hasStatus', statusHandler);
        template.one('remove', function () {
          individual.off('v-s:progress', progressHandler);
          individual.off('v-s:hasStatus', statusHandler);
        });
        function progressHandler() {
          var progress = individual.hasValue('v-s:progress') && individual['v-s:progress'][0] || 0;
          $('.progress-bar', template).css({
            width: progress + '%'
          });
        }
        function statusHandler() {
          var progressBar = $('.progress-bar', template);
          var status = individual.hasValue('v-s:hasStatus') ? individual['v-s:hasStatus'][0].id : undefined;
          switch (status) {
            case 'v-s:StatusStarted':
            case 'v-s:StatusExecution':
              progressBar.addClass('progress-bar-success active').removeClass('progress-bar-danger');
              break;
            case 'v-s:StatusExecuted':
              progressBar.addClass('progress-bar-success').removeClass('progress-bar-danger active');
              break;
            default:
              progressBar.addClass('progress-bar-danger').removeClass('progress-bar-success active');
              break;
          }
        }
      });
      _export("html", html = "\n  <div class=\"pull-left\">\n    <div class=\"progress pull-left\" style=\"display: inline-block; height: 22px; width:100px; margin:0 5px;\">\n      <div\n        class=\"progress-bar progress-bar-striped\"\n        role=\"progressbar\"\n        aria-valuenow=\"0\"\n        aria-valuemin=\"0\"\n        aria-valuemax=\"100\"\n        style=\"width:0%; padding-top:2px;\">\n        <strong about=\"@\" property=\"v-s:progress\"></strong><strong>%</strong>\n      </div>\n    </div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInByZSIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsInByb2dyZXNzSGFuZGxlciIsInN0YXR1c0hhbmRsZXIiLCJvbiIsIm9uZSIsIm9mZiIsInByb2dyZXNzIiwiaGFzVmFsdWUiLCJjc3MiLCJ3aWR0aCIsInByb2dyZXNzQmFyIiwic3RhdHVzIiwiaWQiLCJ1bmRlZmluZWQiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiaHRtbCJdLCJzb3VyY2VzIjpbIi4uLy4uL29udG9sb2d5L2dlbmVyaWMtZnVuY3Rpb24vdGVtcGxhdGVzL3Ytc19PcGVyYXRpb25Qcm9ncmVzc1RlbXBsYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmV4cG9ydCBjb25zdCBwcmUgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gIHByb2dyZXNzSGFuZGxlcigpO1xuICBzdGF0dXNIYW5kbGVyKCk7XG4gIGluZGl2aWR1YWwub24oJ3Ytczpwcm9ncmVzcycsIHByb2dyZXNzSGFuZGxlcik7XG4gIGluZGl2aWR1YWwub24oJ3YtczpoYXNTdGF0dXMnLCBzdGF0dXNIYW5kbGVyKTtcbiAgdGVtcGxhdGUub25lKCdyZW1vdmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgaW5kaXZpZHVhbC5vZmYoJ3Ytczpwcm9ncmVzcycsIHByb2dyZXNzSGFuZGxlcik7XG4gICAgaW5kaXZpZHVhbC5vZmYoJ3YtczpoYXNTdGF0dXMnLCBzdGF0dXNIYW5kbGVyKTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gcHJvZ3Jlc3NIYW5kbGVyICgpIHtcbiAgICBjb25zdCBwcm9ncmVzcyA9IChpbmRpdmlkdWFsLmhhc1ZhbHVlKCd2LXM6cHJvZ3Jlc3MnKSAmJiBpbmRpdmlkdWFsWyd2LXM6cHJvZ3Jlc3MnXVswXSkgfHwgMDtcbiAgICAkKCcucHJvZ3Jlc3MtYmFyJywgdGVtcGxhdGUpLmNzcyh7d2lkdGg6IHByb2dyZXNzICsgJyUnfSk7XG4gIH1cbiAgZnVuY3Rpb24gc3RhdHVzSGFuZGxlciAoKSB7XG4gICAgY29uc3QgcHJvZ3Jlc3NCYXIgPSAkKCcucHJvZ3Jlc3MtYmFyJywgdGVtcGxhdGUpO1xuICAgIGNvbnN0IHN0YXR1cyA9IGluZGl2aWR1YWwuaGFzVmFsdWUoJ3YtczpoYXNTdGF0dXMnKSA/IGluZGl2aWR1YWxbJ3YtczpoYXNTdGF0dXMnXVswXS5pZCA6IHVuZGVmaW5lZDtcbiAgICBzd2l0Y2ggKHN0YXR1cykge1xuICAgIGNhc2UgJ3YtczpTdGF0dXNTdGFydGVkJzpcbiAgICBjYXNlICd2LXM6U3RhdHVzRXhlY3V0aW9uJzpcbiAgICAgIHByb2dyZXNzQmFyLmFkZENsYXNzKCdwcm9ncmVzcy1iYXItc3VjY2VzcyBhY3RpdmUnKS5yZW1vdmVDbGFzcygncHJvZ3Jlc3MtYmFyLWRhbmdlcicpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAndi1zOlN0YXR1c0V4ZWN1dGVkJzpcbiAgICAgIHByb2dyZXNzQmFyLmFkZENsYXNzKCdwcm9ncmVzcy1iYXItc3VjY2VzcycpLnJlbW92ZUNsYXNzKCdwcm9ncmVzcy1iYXItZGFuZ2VyIGFjdGl2ZScpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHByb2dyZXNzQmFyLmFkZENsYXNzKCdwcm9ncmVzcy1iYXItZGFuZ2VyJykucmVtb3ZlQ2xhc3MoJ3Byb2dyZXNzLWJhci1zdWNjZXNzIGFjdGl2ZScpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaHRtbCA9IGBcbiAgPGRpdiBjbGFzcz1cInB1bGwtbGVmdFwiPlxuICAgIDxkaXYgY2xhc3M9XCJwcm9ncmVzcyBwdWxsLWxlZnRcIiBzdHlsZT1cImRpc3BsYXk6IGlubGluZS1ibG9jazsgaGVpZ2h0OiAyMnB4OyB3aWR0aDoxMDBweDsgbWFyZ2luOjAgNXB4O1wiPlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzcz1cInByb2dyZXNzLWJhciBwcm9ncmVzcy1iYXItc3RyaXBlZFwiXG4gICAgICAgIHJvbGU9XCJwcm9ncmVzc2JhclwiXG4gICAgICAgIGFyaWEtdmFsdWVub3c9XCIwXCJcbiAgICAgICAgYXJpYS12YWx1ZW1pbj1cIjBcIlxuICAgICAgICBhcmlhLXZhbHVlbWF4PVwiMTAwXCJcbiAgICAgICAgc3R5bGU9XCJ3aWR0aDowJTsgcGFkZGluZy10b3A6MnB4O1wiPlxuICAgICAgICA8c3Ryb25nIGFib3V0PVwiQFwiIHByb3BlcnR5PVwidi1zOnByb2dyZXNzXCI+PC9zdHJvbmc+PHN0cm9uZz4lPC9zdHJvbmc+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5gO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztNQUFPQSxDQUFDLEdBQUFDLE9BQUEsQ0FBQUMsT0FBQTtJQUFBO0lBQUFDLE9BQUEsV0FBQUEsQ0FBQTtNQUFBQyxPQUFBLFFBRUtDLEdBQUcsR0FBRyxTQUFOQSxHQUFHQSxDQUFhQyxVQUFVLEVBQUVDLFFBQVEsRUFBRUMsU0FBUyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRTtRQUN6RUgsUUFBUSxHQUFHUCxDQUFDLENBQUNPLFFBQVEsQ0FBQztRQUN0QkMsU0FBUyxHQUFHUixDQUFDLENBQUNRLFNBQVMsQ0FBQztRQUV4QkcsZUFBZSxFQUFFO1FBQ2pCQyxhQUFhLEVBQUU7UUFDZk4sVUFBVSxDQUFDTyxFQUFFLENBQUMsY0FBYyxFQUFFRixlQUFlLENBQUM7UUFDOUNMLFVBQVUsQ0FBQ08sRUFBRSxDQUFDLGVBQWUsRUFBRUQsYUFBYSxDQUFDO1FBQzdDTCxRQUFRLENBQUNPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsWUFBWTtVQUNqQ1IsVUFBVSxDQUFDUyxHQUFHLENBQUMsY0FBYyxFQUFFSixlQUFlLENBQUM7VUFDL0NMLFVBQVUsQ0FBQ1MsR0FBRyxDQUFDLGVBQWUsRUFBRUgsYUFBYSxDQUFDO1FBQ2hELENBQUMsQ0FBQztRQUVGLFNBQVNELGVBQWVBLENBQUEsRUFBSTtVQUMxQixJQUFNSyxRQUFRLEdBQUlWLFVBQVUsQ0FBQ1csUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJWCxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUssQ0FBQztVQUM1Rk4sQ0FBQyxDQUFDLGVBQWUsRUFBRU8sUUFBUSxDQUFDLENBQUNXLEdBQUcsQ0FBQztZQUFDQyxLQUFLLEVBQUVILFFBQVEsR0FBRztVQUFHLENBQUMsQ0FBQztRQUMzRDtRQUNBLFNBQVNKLGFBQWFBLENBQUEsRUFBSTtVQUN4QixJQUFNUSxXQUFXLEdBQUdwQixDQUFDLENBQUMsZUFBZSxFQUFFTyxRQUFRLENBQUM7VUFDaEQsSUFBTWMsTUFBTSxHQUFHZixVQUFVLENBQUNXLFFBQVEsQ0FBQyxlQUFlLENBQUMsR0FBR1gsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDZ0IsRUFBRSxHQUFHQyxTQUFTO1VBQ25HLFFBQVFGLE1BQU07WUFDZCxLQUFLLG1CQUFtQjtZQUN4QixLQUFLLHFCQUFxQjtjQUN4QkQsV0FBVyxDQUFDSSxRQUFRLENBQUMsNkJBQTZCLENBQUMsQ0FBQ0MsV0FBVyxDQUFDLHFCQUFxQixDQUFDO2NBQ3RGO1lBQ0YsS0FBSyxvQkFBb0I7Y0FDdkJMLFdBQVcsQ0FBQ0ksUUFBUSxDQUFDLHNCQUFzQixDQUFDLENBQUNDLFdBQVcsQ0FBQyw0QkFBNEIsQ0FBQztjQUN0RjtZQUNGO2NBQ0VMLFdBQVcsQ0FBQ0ksUUFBUSxDQUFDLHFCQUFxQixDQUFDLENBQUNDLFdBQVcsQ0FBQyw2QkFBNkIsQ0FBQztjQUN0RjtVQUFNO1FBRVY7TUFDRixDQUFDO01BQUFyQixPQUFBLFNBRVlzQixJQUFJO0lBQUE7RUFBQTtBQUFBIn0=