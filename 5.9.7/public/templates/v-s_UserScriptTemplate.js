"use strict";

System.register(["jquery"], function (_export, _context) {
  "use strict";

  var $, post, html;
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }],
    execute: function () {
      _export("post", post = function post(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);

        // Clear output on save
        individual.on('beforeSave', clearOutput);
        template.one('remove', function () {
          individual.off('beforeSave', clearOutput);
        });
        function clearOutput() {
          this['v-s:output'] = [];
        }
        var nativeConsole = window.console;
        var nativePrint = window.print;
        var _print = function _print() {
          var output = individual['v-s:output'][0] || '';
          for (var i = 0; i < arguments.length; i++) {
            var arg = i < 0 || arguments.length <= i ? undefined : arguments[i];
            var argString = typeof arg !== 'undefined' ? arg.toString() : 'undefined';
            if (i === 0) {
              output += argString;
            } else {
              output += ' ' + argString;
            }
          }
          output += String.fromCharCode(13, 10);
          individual['v-s:output'] = [output];
        };
        var _console = {
          log: _print,
          error: _print,
          info: _print,
          time: function time(timer) {
            this[timer] = new Date();
          },
          timeEnd: function timeEnd(timer) {
            var delta = new Date() - this[timer];
            this.log(timer, delta, 'msec');
          }
        };
        window.console = _console;
        window.print = _print;
        template.one('remove', function () {
          window.console = nativeConsole;
          window.print = nativePrint;
        });
        $('.action#run', template).click(function () {
          if (individual.hasValue('v-s:executeAt', 'Server')) {
            individual['v-s:toBeRun'] = [true];
            individual.save(true);
          } else {
            individual['v-s:lastRun'] = [new Date()];
            individual['v-s:output'] = [];
            var script = new Function('veda', individual['v-s:script'][0] || 'return;');
            try {
              script(veda);
            } catch (err) {
              print(err);
            }
          }
        });
        $('.action#clear', template).click(function () {
          individual['v-s:output'] = [];
        });
      });
      _export("html", html = "\n  <div class=\"container sheet\">\n    <div about=\"@\" data-embedded=\"true\" data-template=\"v-ui:CommonOntologyTemplate\"></div>\n    <div class=\"row\">\n      <div class=\"col-md-2 view -edit -search\">\n        <em about=\"v-s:lastRun\" property=\"rdfs:label\"></em>\n        <div about=\"@\" property=\"v-s:lastRun\"></div>\n      </div>\n      <div class=\"col-md-2 view -edit -search\">\n        <em about=\"v-s:updateCounter\" property=\"rdfs:label\"></em>\n        <div about=\"@\" property=\"v-s:updateCounter\"></div>\n      </div>\n      <div class=\"col-md-2 view -edit -search\">\n        <div class=\"checkbox\">\n          <label>\n            <veda-control property=\"v-s:toBeRun\" data-type=\"boolean\"></veda-control>\n            <em about=\"v-s:toBeRun\" property=\"rdfs:label\"></em>\n          </label>\n        </div>\n      </div>\n      <div class=\"col-md-2 view edit -search\">\n        <em about=\"v-s:executeAt\" property=\"rdfs:label\"></em>\n        <div property=\"v-s:executeAt\" class=\"view -edit -search\"></div>\n        <veda-control property=\"v-s:executeAt\" data-type=\"radio\" class=\"-view edit search\"></veda-control>\n      </div>\n    </div>\n    <hr />\n    <div class=\"row\">\n      <div class=\"col-md-6\">\n        <em about=\"v-s:script\" property=\"rdfs:label\" class=\"view edit -search\"></em>\n        <veda-control property=\"v-s:script\" data-type=\"source\" class=\"view edit -search\"></veda-control>\n      </div>\n      <div class=\"col-md-6\">\n        <em about=\"v-s:output\" property=\"rdfs:label\" class=\"view edit -search\"></em>\n        <pre about=\"@\" property=\"v-s:output\" class=\"view edit -search\" style=\"height:300px; overflow:auto\"></pre>\n      </div>\n    </div>\n    <hr />\n    <div about=\"@\" data-template=\"v-ui:SystemPropertiesTemplate\" data-embedded=\"true\"></div>\n    <br />\n    <div class=\"actions view edit -search clearfix\">\n      <span about=\"@\" data-template=\"v-ui:StandardButtonsTemplate\" data-embedded=\"true\" data-buttons=\"edit save cancel delete destroy\"></span>\n      <div class=\"pull-right\">\n        <button type=\"button\" class=\"action btn btn-warning view -edit -search\" id=\"run\" about=\"v-s:RunBundle\" property=\"rdfs:label\"></button>\n        <button type=\"button\" class=\"action btn btn-default -view edit -search\" id=\"clear\" about=\"v-s:ClearBundle\" property=\"rdfs:label\"></button>\n      </div>\n    </div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInBvc3QiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJvbiIsImNsZWFyT3V0cHV0Iiwib25lIiwib2ZmIiwibmF0aXZlQ29uc29sZSIsIndpbmRvdyIsImNvbnNvbGUiLCJuYXRpdmVQcmludCIsInByaW50IiwiX3ByaW50Iiwib3V0cHV0IiwiaSIsImFyZ3VtZW50cyIsImxlbmd0aCIsImFyZyIsInVuZGVmaW5lZCIsImFyZ1N0cmluZyIsInRvU3RyaW5nIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiX2NvbnNvbGUiLCJsb2ciLCJlcnJvciIsImluZm8iLCJ0aW1lIiwidGltZXIiLCJEYXRlIiwidGltZUVuZCIsImRlbHRhIiwiY2xpY2siLCJoYXNWYWx1ZSIsInNhdmUiLCJzY3JpcHQiLCJGdW5jdGlvbiIsInZlZGEiLCJlcnIiLCJodG1sIl0sInNvdXJjZXMiOlsiLi4vLi4vb250b2xvZ3kvZ2VuZXJpYy1mdW5jdGlvbi90ZW1wbGF0ZXMvdi1zX1VzZXJTY3JpcHRUZW1wbGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG5leHBvcnQgY29uc3QgcG9zdCA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgLy8gQ2xlYXIgb3V0cHV0IG9uIHNhdmVcbiAgaW5kaXZpZHVhbC5vbignYmVmb3JlU2F2ZScsIGNsZWFyT3V0cHV0KTtcbiAgdGVtcGxhdGUub25lKCdyZW1vdmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgaW5kaXZpZHVhbC5vZmYoJ2JlZm9yZVNhdmUnLCBjbGVhck91dHB1dCk7XG4gIH0pO1xuICBmdW5jdGlvbiBjbGVhck91dHB1dCAoKSB7XG4gICAgdGhpc1sndi1zOm91dHB1dCddID0gW107XG4gIH1cblxuICBjb25zdCBuYXRpdmVDb25zb2xlID0gd2luZG93LmNvbnNvbGU7XG4gIGNvbnN0IG5hdGl2ZVByaW50ID0gd2luZG93LnByaW50O1xuICBjb25zdCBfcHJpbnQgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgIGxldCBvdXRwdXQgPSBpbmRpdmlkdWFsWyd2LXM6b3V0cHV0J11bMF0gfHwgJyc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBhcmcgPSBhcmdzW2ldO1xuICAgICAgY29uc3QgYXJnU3RyaW5nID0gdHlwZW9mIGFyZyAhPT0gJ3VuZGVmaW5lZCcgPyBhcmcudG9TdHJpbmcoKSA6ICd1bmRlZmluZWQnO1xuICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgb3V0cHV0ICs9IGFyZ1N0cmluZztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG91dHB1dCArPSAnICcgKyBhcmdTdHJpbmc7XG4gICAgICB9XG4gICAgfVxuICAgIG91dHB1dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDEzLCAxMCk7XG4gICAgaW5kaXZpZHVhbFsndi1zOm91dHB1dCddID0gW291dHB1dF07XG4gIH07XG4gIGNvbnN0IF9jb25zb2xlID0ge1xuICAgIGxvZzogX3ByaW50LFxuICAgIGVycm9yOiBfcHJpbnQsXG4gICAgaW5mbzogX3ByaW50LFxuICAgIHRpbWU6IGZ1bmN0aW9uICh0aW1lcikge1xuICAgICAgdGhpc1t0aW1lcl0gPSBuZXcgRGF0ZSgpO1xuICAgIH0sXG4gICAgdGltZUVuZDogZnVuY3Rpb24gKHRpbWVyKSB7XG4gICAgICBjb25zdCBkZWx0YSA9IG5ldyBEYXRlKCkgLSB0aGlzW3RpbWVyXTtcbiAgICAgIHRoaXMubG9nKHRpbWVyLCBkZWx0YSwgJ21zZWMnKTtcbiAgICB9LFxuICB9O1xuXG4gIHdpbmRvdy5jb25zb2xlID0gX2NvbnNvbGU7XG4gIHdpbmRvdy5wcmludCA9IF9wcmludDtcbiAgdGVtcGxhdGUub25lKCdyZW1vdmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgd2luZG93LmNvbnNvbGUgPSBuYXRpdmVDb25zb2xlO1xuICAgIHdpbmRvdy5wcmludCA9IG5hdGl2ZVByaW50O1xuICB9KTtcblxuICAkKCcuYWN0aW9uI3J1bicsIHRlbXBsYXRlKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGluZGl2aWR1YWwuaGFzVmFsdWUoJ3YtczpleGVjdXRlQXQnLCAnU2VydmVyJykpIHtcbiAgICAgIGluZGl2aWR1YWxbJ3Ytczp0b0JlUnVuJ10gPSBbdHJ1ZV07XG4gICAgICBpbmRpdmlkdWFsLnNhdmUodHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluZGl2aWR1YWxbJ3YtczpsYXN0UnVuJ10gPSBbbmV3IERhdGUoKV07XG4gICAgICBpbmRpdmlkdWFsWyd2LXM6b3V0cHV0J10gPSBbXTtcbiAgICAgIGNvbnN0IHNjcmlwdCA9IG5ldyBGdW5jdGlvbigndmVkYScsIGluZGl2aWR1YWxbJ3YtczpzY3JpcHQnXVswXSB8fCAncmV0dXJuOycpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgc2NyaXB0KHZlZGEpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHByaW50KGVycik7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgJCgnLmFjdGlvbiNjbGVhcicsIHRlbXBsYXRlKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgaW5kaXZpZHVhbFsndi1zOm91dHB1dCddID0gW107XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGh0bWwgPSBgXG4gIDxkaXYgY2xhc3M9XCJjb250YWluZXIgc2hlZXRcIj5cbiAgICA8ZGl2IGFib3V0PVwiQFwiIGRhdGEtZW1iZWRkZWQ9XCJ0cnVlXCIgZGF0YS10ZW1wbGF0ZT1cInYtdWk6Q29tbW9uT250b2xvZ3lUZW1wbGF0ZVwiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMiB2aWV3IC1lZGl0IC1zZWFyY2hcIj5cbiAgICAgICAgPGVtIGFib3V0PVwidi1zOmxhc3RSdW5cIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L2VtPlxuICAgICAgICA8ZGl2IGFib3V0PVwiQFwiIHByb3BlcnR5PVwidi1zOmxhc3RSdW5cIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0yIHZpZXcgLWVkaXQgLXNlYXJjaFwiPlxuICAgICAgICA8ZW0gYWJvdXQ9XCJ2LXM6dXBkYXRlQ291bnRlclwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvZW0+XG4gICAgICAgIDxkaXYgYWJvdXQ9XCJAXCIgcHJvcGVydHk9XCJ2LXM6dXBkYXRlQ291bnRlclwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTIgdmlldyAtZWRpdCAtc2VhcmNoXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaGVja2JveFwiPlxuICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgIDx2ZWRhLWNvbnRyb2wgcHJvcGVydHk9XCJ2LXM6dG9CZVJ1blwiIGRhdGEtdHlwZT1cImJvb2xlYW5cIj48L3ZlZGEtY29udHJvbD5cbiAgICAgICAgICAgIDxlbSBhYm91dD1cInYtczp0b0JlUnVuXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9lbT5cbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0yIHZpZXcgZWRpdCAtc2VhcmNoXCI+XG4gICAgICAgIDxlbSBhYm91dD1cInYtczpleGVjdXRlQXRcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L2VtPlxuICAgICAgICA8ZGl2IHByb3BlcnR5PVwidi1zOmV4ZWN1dGVBdFwiIGNsYXNzPVwidmlldyAtZWRpdCAtc2VhcmNoXCI+PC9kaXY+XG4gICAgICAgIDx2ZWRhLWNvbnRyb2wgcHJvcGVydHk9XCJ2LXM6ZXhlY3V0ZUF0XCIgZGF0YS10eXBlPVwicmFkaW9cIiBjbGFzcz1cIi12aWV3IGVkaXQgc2VhcmNoXCI+PC92ZWRhLWNvbnRyb2w+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8aHIgLz5cbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTZcIj5cbiAgICAgICAgPGVtIGFib3V0PVwidi1zOnNjcmlwdFwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiIGNsYXNzPVwidmlldyBlZGl0IC1zZWFyY2hcIj48L2VtPlxuICAgICAgICA8dmVkYS1jb250cm9sIHByb3BlcnR5PVwidi1zOnNjcmlwdFwiIGRhdGEtdHlwZT1cInNvdXJjZVwiIGNsYXNzPVwidmlldyBlZGl0IC1zZWFyY2hcIj48L3ZlZGEtY29udHJvbD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC02XCI+XG4gICAgICAgIDxlbSBhYm91dD1cInYtczpvdXRwdXRcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIiBjbGFzcz1cInZpZXcgZWRpdCAtc2VhcmNoXCI+PC9lbT5cbiAgICAgICAgPHByZSBhYm91dD1cIkBcIiBwcm9wZXJ0eT1cInYtczpvdXRwdXRcIiBjbGFzcz1cInZpZXcgZWRpdCAtc2VhcmNoXCIgc3R5bGU9XCJoZWlnaHQ6MzAwcHg7IG92ZXJmbG93OmF1dG9cIj48L3ByZT5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxociAvPlxuICAgIDxkaXYgYWJvdXQ9XCJAXCIgZGF0YS10ZW1wbGF0ZT1cInYtdWk6U3lzdGVtUHJvcGVydGllc1RlbXBsYXRlXCIgZGF0YS1lbWJlZGRlZD1cInRydWVcIj48L2Rpdj5cbiAgICA8YnIgLz5cbiAgICA8ZGl2IGNsYXNzPVwiYWN0aW9ucyB2aWV3IGVkaXQgLXNlYXJjaCBjbGVhcmZpeFwiPlxuICAgICAgPHNwYW4gYWJvdXQ9XCJAXCIgZGF0YS10ZW1wbGF0ZT1cInYtdWk6U3RhbmRhcmRCdXR0b25zVGVtcGxhdGVcIiBkYXRhLWVtYmVkZGVkPVwidHJ1ZVwiIGRhdGEtYnV0dG9ucz1cImVkaXQgc2F2ZSBjYW5jZWwgZGVsZXRlIGRlc3Ryb3lcIj48L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwicHVsbC1yaWdodFwiPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImFjdGlvbiBidG4gYnRuLXdhcm5pbmcgdmlldyAtZWRpdCAtc2VhcmNoXCIgaWQ9XCJydW5cIiBhYm91dD1cInYtczpSdW5CdW5kbGVcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJhY3Rpb24gYnRuIGJ0bi1kZWZhdWx0IC12aWV3IGVkaXQgLXNlYXJjaFwiIGlkPVwiY2xlYXJcIiBhYm91dD1cInYtczpDbGVhckJ1bmRsZVwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuYDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7TUFBT0EsQ0FBQyxHQUFBQyxPQUFBLENBQUFDLE9BQUE7SUFBQTtJQUFBQyxPQUFBLFdBQUFBLENBQUE7TUFBQUMsT0FBQSxTQUVLQyxJQUFJLEdBQUcsU0FBUEEsSUFBSUEsQ0FBYUMsVUFBVSxFQUFFQyxRQUFRLEVBQUVDLFNBQVMsRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUU7UUFDMUVILFFBQVEsR0FBR1AsQ0FBQyxDQUFDTyxRQUFRLENBQUM7UUFDdEJDLFNBQVMsR0FBR1IsQ0FBQyxDQUFDUSxTQUFTLENBQUM7O1FBRXhCO1FBQ0FGLFVBQVUsQ0FBQ0ssRUFBRSxDQUFDLFlBQVksRUFBRUMsV0FBVyxDQUFDO1FBQ3hDTCxRQUFRLENBQUNNLEdBQUcsQ0FBQyxRQUFRLEVBQUUsWUFBWTtVQUNqQ1AsVUFBVSxDQUFDUSxH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