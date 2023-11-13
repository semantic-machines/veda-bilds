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
        individual.canUpdate().then(function (canUpdate) {
          if (canUpdate && !individual.hasValue('v-wf:read', true)) {
            return Backend.set_in_individual({
              ticket: veda.ticket,
              individual: {
                '@': individual.id,
                'v-wf:read': [{
                  data: true,
                  type: 'Boolean'
                }]
              }
            });
          }
        });
      });
      _export("html", html = "");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfanNDb21tb25WZWRhSnMiLCJ2ZWRhIiwiX2pzQ29tbW9uQmFja2VuZEpzIiwiQmFja2VuZCIsImV4ZWN1dGUiLCJfZXhwb3J0IiwicG9zdCIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsImNhblVwZGF0ZSIsInRoZW4iLCJoYXNWYWx1ZSIsInNldF9pbl9pbmRpdmlkdWFsIiwidGlja2V0IiwiaWQiLCJkYXRhIiwidHlwZSIsImh0bWwiXSwic291cmNlcyI6WyIuLi8uLi9vbnRvbG9neS9nZW5lcmljLWZ1bmN0aW9uL3RlbXBsYXRlcy92LXdmX0RlY2lzaW9uRm9ybVRlbXBsYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgdmVkYSBmcm9tICcvanMvY29tbW9uL3ZlZGEuanMnO1xuaW1wb3J0IEJhY2tlbmQgZnJvbSAnL2pzL2NvbW1vbi9iYWNrZW5kLmpzJztcblxuZXhwb3J0IGNvbnN0IHBvc3QgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gIGluZGl2aWR1YWwuY2FuVXBkYXRlKCkudGhlbihmdW5jdGlvbiAoY2FuVXBkYXRlKSB7XG4gICAgaWYgKGNhblVwZGF0ZSAmJiAhaW5kaXZpZHVhbC5oYXNWYWx1ZSgndi13ZjpyZWFkJywgdHJ1ZSkpIHtcbiAgICAgIHJldHVybiBCYWNrZW5kLnNldF9pbl9pbmRpdmlkdWFsKHtcbiAgICAgICAgdGlja2V0OiB2ZWRhLnRpY2tldCxcbiAgICAgICAgaW5kaXZpZHVhbDoge1xuICAgICAgICAgICdAJzogaW5kaXZpZHVhbC5pZCxcbiAgICAgICAgICAndi13ZjpyZWFkJzogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBkYXRhOiB0cnVlLFxuICAgICAgICAgICAgICB0eXBlOiAnQm9vbGVhbicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGh0bWwgPSBgYDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7TUFBT0EsQ0FBQyxHQUFBQyxPQUFBLENBQUFDLE9BQUE7SUFBQSxhQUFBQyxlQUFBO01BQ0RDLElBQUksR0FBQUQsZUFBQSxDQUFBRCxPQUFBO0lBQUEsYUFBQUcsa0JBQUE7TUFDSkMsT0FBTyxHQUFBRCxrQkFBQSxDQUFBSCxPQUFBO0lBQUE7SUFBQUssT0FBQSxXQUFBQSxDQUFBO01BQUFDLE9BQUEsU0FFREMsSUFBSSxHQUFHLFNBQVBBLElBQUlBLENBQWFDLFVBQVUsRUFBRUMsUUFBUSxFQUFFQyxTQUFTLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFO1FBQzFFSCxRQUFRLEdBQUdYLENBQUMsQ0FBQ1csUUFBUSxDQUFDO1FBQ3RCQyxTQUFTLEdBQUdaLENBQUMsQ0FBQ1ksU0FBUyxDQUFDO1FBRXhCRixVQUFVLENBQUNLLFNBQVMsRUFBRSxDQUFDQyxJQUFJLENBQUMsVUFBVUQsU0FBUyxFQUFFO1VBQy9DLElBQUlBLFNBQVMsSUFBSSxDQUFDTCxVQUFVLENBQUNPLFFBQVEsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDeEQsT0FBT1gsT0FBTyxDQUFDWSxpQkFBaUIsQ0FBQztjQUMvQkMsTUFBTSxFQUFFZixJQUFJLENBQUNlLE1BQU07Y0FDbkJULFVBQVUsRUFBRTtnQkFDVixHQUFHLEVBQUVBLFVBQVUsQ0FBQ1UsRUFBRTtnQkFDbEIsV0FBVyxFQUFFLENBQ1g7a0JBQ0VDLElBQUksRUFBRSxJQUFJO2tCQUNWQyxJQUFJLEVBQUU7Z0JBQ1IsQ0FBQztjQUVMO1lBQ0YsQ0FBQyxDQUFDO1VBQ0o7UUFDRixDQUFDLENBQUM7TUFDSixDQUFDO01BQUFkLE9BQUEsU0FFWWUsSUFBSTtJQUFBO0VBQUE7QUFBQSJ9