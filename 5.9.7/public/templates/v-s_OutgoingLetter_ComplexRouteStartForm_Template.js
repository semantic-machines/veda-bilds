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
        if (mode === 'edit' && individual.hasValue('v-wf:processedDocument')) {
          var stages = ['coordination1', 'coordination2', 'sign'];
          var complex = 's-wf:ComplexRouteStartForm_';
          var simple = 's-wf:SimpleRouteStartForm_';
          var doc = individual['v-wf:processedDocument'][0];
          return doc.getPropertyChain('v-s:sender', 'v-s:correspondentPerson').then(function (correspondentPerson) {
            individual.addSimpleStartForm(stages, complex);
            individual[complex + 'coordination1'][0][simple + 'visible'] = [true];
            individual[complex + 'coordination1'][0][simple + 'editable'] = [true];
            individual[complex + 'coordination1'][0][simple + 'deadlineDays'] = [3];
            individual[complex + 'coordination2'][0][simple + 'visible'] = [true];
            individual[complex + 'coordination2'][0][simple + 'editable'] = [true];
            individual[complex + 'coordination2'][0][simple + 'deadlineDays'] = [3];
            individual[complex + 'sign'][0][simple + 'visible'] = [true];
            individual[complex + 'sign'][0][simple + 'editable'] = [true];
            individual[complex + 'sign'][0][simple + 'deadlineDays'] = [3];
            individual[complex + 'sign'][0][simple + 'participant'] = correspondentPerson;
          });
        }
      });
      _export("html", html = "\n  <div about=\"@\" data-embedded=\"true\" data-template=\"s-wf:ComplexRouteStartForm_Common_Template\" class=\"view edit\"></div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInByZSIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsImhhc1ZhbHVlIiwic3RhZ2VzIiwiY29tcGxleCIsInNpbXBsZSIsImRvYyIsImdldFByb3BlcnR5Q2hhaW4iLCJ0aGVuIiwiY29ycmVzcG9uZGVudFBlcnNvbiIsImFkZFNpbXBsZVN0YXJ0Rm9ybSIsImh0bWwiXSwic291cmNlcyI6WyIuLi8uLi9vbnRvbG9neS9nZW5lcmljLWFwcGxpY2F0aW9uL2NvcnJlc3BvbmRlbmNlL3RlbXBsYXRlcy92LXNfT3V0Z29pbmdMZXR0ZXJfQ29tcGxleFJvdXRlU3RhcnRGb3JtX1RlbXBsYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmV4cG9ydCBjb25zdCBwcmUgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gIGlmIChtb2RlID09PSAnZWRpdCcgJiYgaW5kaXZpZHVhbC5oYXNWYWx1ZSgndi13Zjpwcm9jZXNzZWREb2N1bWVudCcpKSB7XG4gICAgY29uc3Qgc3RhZ2VzID0gWydjb29yZGluYXRpb24xJywgJ2Nvb3JkaW5hdGlvbjInLCAnc2lnbiddO1xuICAgIGNvbnN0IGNvbXBsZXggPSAncy13ZjpDb21wbGV4Um91dGVTdGFydEZvcm1fJztcbiAgICBjb25zdCBzaW1wbGUgPSAncy13ZjpTaW1wbGVSb3V0ZVN0YXJ0Rm9ybV8nO1xuICAgIGNvbnN0IGRvYyA9IGluZGl2aWR1YWxbJ3Ytd2Y6cHJvY2Vzc2VkRG9jdW1lbnQnXVswXTtcblxuICAgIHJldHVybiBkb2MuZ2V0UHJvcGVydHlDaGFpbigndi1zOnNlbmRlcicsICd2LXM6Y29ycmVzcG9uZGVudFBlcnNvbicpLnRoZW4oZnVuY3Rpb24gKGNvcnJlc3BvbmRlbnRQZXJzb24pIHtcbiAgICAgIGluZGl2aWR1YWwuYWRkU2ltcGxlU3RhcnRGb3JtKHN0YWdlcywgY29tcGxleCk7XG4gICAgICBpbmRpdmlkdWFsW2NvbXBsZXggKyAnY29vcmRpbmF0aW9uMSddWzBdW3NpbXBsZSArICd2aXNpYmxlJ10gPSBbdHJ1ZV07XG4gICAgICBpbmRpdmlkdWFsW2NvbXBsZXggKyAnY29vcmRpbmF0aW9uMSddWzBdW3NpbXBsZSArICdlZGl0YWJsZSddID0gW3RydWVdO1xuICAgICAgaW5kaXZpZHVhbFtjb21wbGV4ICsgJ2Nvb3JkaW5hdGlvbjEnXVswXVtzaW1wbGUgKyAnZGVhZGxpbmVEYXlzJ10gPSBbM107XG4gICAgICBpbmRpdmlkdWFsW2NvbXBsZXggKyAnY29vcmRpbmF0aW9uMiddWzBdW3NpbXBsZSArICd2aXNpYmxlJ10gPSBbdHJ1ZV07XG4gICAgICBpbmRpdmlkdWFsW2NvbXBsZXggKyAnY29vcmRpbmF0aW9uMiddWzBdW3NpbXBsZSArICdlZGl0YWJsZSddID0gW3RydWVdO1xuICAgICAgaW5kaXZpZHVhbFtjb21wbGV4ICsgJ2Nvb3JkaW5hdGlvbjInXVswXVtzaW1wbGUgKyAnZGVhZGxpbmVEYXlzJ10gPSBbM107XG4gICAgICBpbmRpdmlkdWFsW2NvbXBsZXggKyAnc2lnbiddWzBdW3NpbXBsZSArICd2aXNpYmxlJ10gPSBbdHJ1ZV07XG4gICAgICBpbmRpdmlkdWFsW2NvbXBsZXggKyAnc2lnbiddWzBdW3NpbXBsZSArICdlZGl0YWJsZSddID0gW3RydWVdO1xuICAgICAgaW5kaXZpZHVhbFtjb21wbGV4ICsgJ3NpZ24nXVswXVtzaW1wbGUgKyAnZGVhZGxpbmVEYXlzJ10gPSBbM107XG4gICAgICBpbmRpdmlkdWFsW2NvbXBsZXggKyAnc2lnbiddWzBdW3NpbXBsZSArICdwYXJ0aWNpcGFudCddID0gY29ycmVzcG9uZGVudFBlcnNvbjtcbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGh0bWwgPSBgXG4gIDxkaXYgYWJvdXQ9XCJAXCIgZGF0YS1lbWJlZGRlZD1cInRydWVcIiBkYXRhLXRlbXBsYXRlPVwicy13ZjpDb21wbGV4Um91dGVTdGFydEZvcm1fQ29tbW9uX1RlbXBsYXRlXCIgY2xhc3M9XCJ2aWV3IGVkaXRcIj48L2Rpdj5cbmA7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O01BQU9BLENBQUMsR0FBQUMsT0FBQSxDQUFBQyxPQUFBO0lBQUE7SUFBQUMsT0FBQSxXQUFBQSxDQUFBO01BQUFDLE9BQUEsUUFFS0MsR0FBRyxHQUFHLFNBQU5BLEdBQUdBLENBQWFDLFVBQVUsRUFBRUMsUUFBUSxFQUFFQyxTQUFTLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFO1FBQ3pFSCxRQUFRLEdBQUdQLENBQUMsQ0FBQ08sUUFBUSxDQUFDO1FBQ3RCQyxTQUFTLEdBQUdSLENBQUMsQ0FBQ1EsU0FBUyxDQUFDO1FBRXhCLElBQUlDLElBQUksS0FBSyxNQUFNLElBQUlILFVBQVUsQ0FBQ0ssUUFBUSxDQUFDLHdCQUF3QixDQUFDLEVBQUU7VUFDcEUsSUFBTUMsTUFBTSxHQUFHLENBQUMsZUFBZSxFQUFFLGVBQWUsRUFBRSxNQUFNLENBQUM7VUFDekQsSUFBTUMsT0FBTyxHQUFHLDZCQUE2QjtVQUM3QyxJQUFNQyxNQUFNLEdBQUcsNEJBQTRCO1VBQzNDLElBQU1DLEdBQUcsR0FBR1QsVUFBVSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUFDO1VBRW5ELE9BQU9TLEdBQUcsQ0FBQ0MsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLHlCQUF5QixDQUFDLENBQUNDLElBQUksQ0FBQyxVQUFVQyxtQkFBbUIsRUFBRTtZQUN2R1osVUFBVSxDQUFDYSxrQkFBa0IsQ0FBQ1AsTUFBTSxFQUFFQyxPQUFPLENBQUM7WUFDOUNQLFVBQVUsQ0FBQ08sT0FBTyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDQyxNQUFNLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDckVSLFVBQVUsQ0FBQ08sT0FBTyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDQyxNQUFNLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDdEVSLFVBQVUsQ0FBQ08sT0FBTyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDQyxNQUFNLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdkVSLFVBQVUsQ0FBQ08sT0FBTyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDQyxNQUFNLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDckVSLFVBQVUsQ0FBQ08sT0FBTyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDQyxNQUFNLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDdEVSLFVBQVUsQ0FBQ08sT0FBTyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDQyxNQUFNLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdkVSLFVBQVUsQ0FBQ08sT0FBTyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDQyxNQUFNLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDNURSLFVBQVUsQ0FBQ08sT0FBTyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDQyxNQUFNLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDN0RSLFVBQVUsQ0FBQ08sT0FBTyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDQyxNQUFNLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDOURSLFVBQVUsQ0FBQ08sT0FBTyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDQyxNQUFNLEdBQUcsYUFBYSxDQUFDLEdBQUdJLG1CQUFtQjtVQUMvRSxDQUFDLENBQUM7UUFDSjtNQUNGLENBQUM7TUFBQWQsT0FBQSxTQUVZZ0IsSUFBSTtJQUFBO0VBQUE7QUFBQSJ9