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
          var stages = ['review'];
          var complex = 's-wf:ComplexRouteStartForm_';
          var simple = 's-wf:SimpleRouteStartForm_';
          var doc = individual['v-wf:processedDocument'][0];
          return doc.getPropertyChain('v-s:recipient', 'v-s:correspondentPerson').then(function (correspondentPerson) {
            individual.addSimpleStartForm(stages, complex);
            individual[complex + 'review'][0][simple + 'visible'] = [true];
            individual[complex + 'review'][0][simple + 'editable'] = [true];
            individual[complex + 'review'][0][simple + 'deadlineDays'] = [10];
            individual[complex + 'review'][0][simple + 'participant'] = correspondentPerson;
          });
        }
      });
      _export("html", html = "\n  <div about=\"@\" data-embedded=\"true\" data-template=\"s-wf:ComplexRouteStartForm_Common_Template\" class=\"view edit\"></div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInByZSIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsImhhc1ZhbHVlIiwic3RhZ2VzIiwiY29tcGxleCIsInNpbXBsZSIsImRvYyIsImdldFByb3BlcnR5Q2hhaW4iLCJ0aGVuIiwiY29ycmVzcG9uZGVudFBlcnNvbiIsImFkZFNpbXBsZVN0YXJ0Rm9ybSIsImh0bWwiXSwic291cmNlcyI6WyIuLi8uLi9vbnRvbG9neS9nZW5lcmljLWFwcGxpY2F0aW9uL2NvcnJlc3BvbmRlbmNlL3RlbXBsYXRlcy92LXNfSW5jb21pbmdMZXR0ZXJfQ29tcGxleFJvdXRlU3RhcnRGb3JtX1RlbXBsYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmV4cG9ydCBjb25zdCBwcmUgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gIGlmIChtb2RlID09PSAnZWRpdCcgJiYgaW5kaXZpZHVhbC5oYXNWYWx1ZSgndi13Zjpwcm9jZXNzZWREb2N1bWVudCcpKSB7XG4gICAgY29uc3Qgc3RhZ2VzID0gWydyZXZpZXcnXTtcbiAgICBjb25zdCBjb21wbGV4ID0gJ3Mtd2Y6Q29tcGxleFJvdXRlU3RhcnRGb3JtXyc7XG4gICAgY29uc3Qgc2ltcGxlID0gJ3Mtd2Y6U2ltcGxlUm91dGVTdGFydEZvcm1fJztcbiAgICBjb25zdCBkb2MgPSBpbmRpdmlkdWFsWyd2LXdmOnByb2Nlc3NlZERvY3VtZW50J11bMF07XG5cbiAgICByZXR1cm4gZG9jLmdldFByb3BlcnR5Q2hhaW4oJ3YtczpyZWNpcGllbnQnLCAndi1zOmNvcnJlc3BvbmRlbnRQZXJzb24nKS50aGVuKGZ1bmN0aW9uIChjb3JyZXNwb25kZW50UGVyc29uKSB7XG4gICAgICBpbmRpdmlkdWFsLmFkZFNpbXBsZVN0YXJ0Rm9ybShzdGFnZXMsIGNvbXBsZXgpO1xuICAgICAgaW5kaXZpZHVhbFtjb21wbGV4ICsgJ3JldmlldyddWzBdW3NpbXBsZSArICd2aXNpYmxlJ10gPSBbdHJ1ZV07XG4gICAgICBpbmRpdmlkdWFsW2NvbXBsZXggKyAncmV2aWV3J11bMF1bc2ltcGxlICsgJ2VkaXRhYmxlJ10gPSBbdHJ1ZV07XG4gICAgICBpbmRpdmlkdWFsW2NvbXBsZXggKyAncmV2aWV3J11bMF1bc2ltcGxlICsgJ2RlYWRsaW5lRGF5cyddID0gWzEwXTtcbiAgICAgIGluZGl2aWR1YWxbY29tcGxleCArICdyZXZpZXcnXVswXVtzaW1wbGUgKyAncGFydGljaXBhbnQnXSA9IGNvcnJlc3BvbmRlbnRQZXJzb247XG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBodG1sID0gYFxuICA8ZGl2IGFib3V0PVwiQFwiIGRhdGEtZW1iZWRkZWQ9XCJ0cnVlXCIgZGF0YS10ZW1wbGF0ZT1cInMtd2Y6Q29tcGxleFJvdXRlU3RhcnRGb3JtX0NvbW1vbl9UZW1wbGF0ZVwiIGNsYXNzPVwidmlldyBlZGl0XCI+PC9kaXY+XG5gO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztNQUFPQSxDQUFDLEdBQUFDLE9BQUEsQ0FBQUMsT0FBQTtJQUFBO0lBQUFDLE9BQUEsV0FBQUEsQ0FBQTtNQUFBQyxPQUFBLFFBRUtDLEdBQUcsR0FBRyxTQUFOQSxHQUFHQSxDQUFhQyxVQUFVLEVBQUVDLFFBQVEsRUFBRUMsU0FBUyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRTtRQUN6RUgsUUFBUSxHQUFHUCxDQUFDLENBQUNPLFFBQVEsQ0FBQztRQUN0QkMsU0FBUyxHQUFHUixDQUFDLENBQUNRLFNBQVMsQ0FBQztRQUV4QixJQUFJQyxJQUFJLEtBQUssTUFBTSxJQUFJSCxVQUFVLENBQUNLLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFO1VBQ3BFLElBQU1DLE1BQU0sR0FBRyxDQUFDLFFBQVEsQ0FBQztVQUN6QixJQUFNQyxPQUFPLEdBQUcsNkJBQTZCO1VBQzdDLElBQU1DLE1BQU0sR0FBRyw0QkFBNEI7VUFDM0MsSUFBTUMsR0FBRyxHQUFHVCxVQUFVLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLENBQUM7VUFFbkQsT0FBT1MsR0FBRyxDQUFDQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUseUJBQXlCLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLFVBQVVDLG1CQUFtQixFQUFFO1lBQzFHWixVQUFVLENBQUNhLGtCQUFrQixDQUFDUCxNQUFNLEVBQUVDLE9BQU8sQ0FBQztZQUM5Q1AsVUFBVSxDQUFDTyxPQUFPLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNDLE1BQU0sR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztZQUM5RFIsVUFBVSxDQUFDTyxPQUFPLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNDLE1BQU0sR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztZQUMvRFIsVUFBVSxDQUFDTyxPQUFPLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNDLE1BQU0sR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNqRVIsVUFBVSxDQUFDTyxPQUFPLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNDLE1BQU0sR0FBRyxhQUFhLENBQUMsR0FBR0ksbUJBQW1CO1VBQ2pGLENBQUMsQ0FBQztRQUNKO01BQ0YsQ0FBQztNQUFBZCxPQUFBLFNBRVlnQixJQUFJO0lBQUE7RUFBQTtBQUFBIn0=