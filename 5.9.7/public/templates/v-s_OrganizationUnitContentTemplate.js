"use strict";

System.register(["jquery", "/js/common/individual_model.js"], function (_export, _context) {
  "use strict";

  var $, IndividualModel, pre, html;
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_jsCommonIndividual_modelJs) {
      IndividualModel = _jsCommonIndividual_modelJs.default;
    }],
    execute: function () {
      _export("pre", pre = function pre(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        var blank = new IndividualModel('v-s:ContactsInUnitSearchRegistryBlank');
        return blank.load().then(function (blank) {
          blank.initBlank().then(function (blankObject) {
            if (!blankObject.hasValue('v-s:parentUnit', individual)) {
              blankObject['v-s:parentUnit'] = [individual];
              var search = new IndividualModel('v-s:ContactsInUnitSearch');
              return search.load().then(function (search) {
                search['v-fs:searchResult'] = [];
              });
            }
          });
        });
      });
      _export("html", html = "\n  <div>\n    <h4><span about=\"@\" property=\"rdfs:label\"></span></h4>\n    <span about=\"@\" data-template=\"v-ui:RabbitHole\" data-properties=\"v-s:parentUnit\"></span>\n    <hr />\n    <div about=\"v-s:ContactsInUnitSearch\" data-template=\"v-fs:AttributiveSearchInlineTemplate\"></div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfanNDb21tb25JbmRpdmlkdWFsX21vZGVsSnMiLCJJbmRpdmlkdWFsTW9kZWwiLCJleGVjdXRlIiwiX2V4cG9ydCIsInByZSIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsImJsYW5rIiwibG9hZCIsInRoZW4iLCJpbml0QmxhbmsiLCJibGFua09iamVjdCIsImhhc1ZhbHVlIiwic2VhcmNoIiwiaHRtbCJdLCJzb3VyY2VzIjpbIi4uLy4uL29udG9sb2d5L2dlbmVyaWMtZnVuY3Rpb24vdGVtcGxhdGVzL3Ytc19Pcmdhbml6YXRpb25Vbml0Q29udGVudFRlbXBsYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgSW5kaXZpZHVhbE1vZGVsIGZyb20gJy9qcy9jb21tb24vaW5kaXZpZHVhbF9tb2RlbC5qcyc7XG5cbmV4cG9ydCBjb25zdCBwcmUgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gIGNvbnN0IGJsYW5rID0gbmV3IEluZGl2aWR1YWxNb2RlbCgndi1zOkNvbnRhY3RzSW5Vbml0U2VhcmNoUmVnaXN0cnlCbGFuaycpO1xuICByZXR1cm4gYmxhbmsubG9hZCgpLnRoZW4oZnVuY3Rpb24gKGJsYW5rKSB7XG4gICAgYmxhbmsuaW5pdEJsYW5rKCkudGhlbihmdW5jdGlvbiAoYmxhbmtPYmplY3QpIHtcbiAgICAgIGlmICghYmxhbmtPYmplY3QuaGFzVmFsdWUoJ3YtczpwYXJlbnRVbml0JywgaW5kaXZpZHVhbCkpIHtcbiAgICAgICAgYmxhbmtPYmplY3RbJ3YtczpwYXJlbnRVbml0J10gPSBbaW5kaXZpZHVhbF07XG4gICAgICAgIGNvbnN0IHNlYXJjaCA9IG5ldyBJbmRpdmlkdWFsTW9kZWwoJ3YtczpDb250YWN0c0luVW5pdFNlYXJjaCcpO1xuICAgICAgICByZXR1cm4gc2VhcmNoLmxvYWQoKS50aGVuKGZ1bmN0aW9uIChzZWFyY2gpIHtcbiAgICAgICAgICBzZWFyY2hbJ3YtZnM6c2VhcmNoUmVzdWx0J10gPSBbXTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGh0bWwgPSBgXG4gIDxkaXY+XG4gICAgPGg0PjxzcGFuIGFib3V0PVwiQFwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvc3Bhbj48L2g0PlxuICAgIDxzcGFuIGFib3V0PVwiQFwiIGRhdGEtdGVtcGxhdGU9XCJ2LXVpOlJhYmJpdEhvbGVcIiBkYXRhLXByb3BlcnRpZXM9XCJ2LXM6cGFyZW50VW5pdFwiPjwvc3Bhbj5cbiAgICA8aHIgLz5cbiAgICA8ZGl2IGFib3V0PVwidi1zOkNvbnRhY3RzSW5Vbml0U2VhcmNoXCIgZGF0YS10ZW1wbGF0ZT1cInYtZnM6QXR0cmlidXRpdmVTZWFyY2hJbmxpbmVUZW1wbGF0ZVwiPjwvZGl2PlxuICA8L2Rpdj5cbmA7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O01BQU9BLENBQUMsR0FBQUMsT0FBQSxDQUFBQyxPQUFBO0lBQUEsYUFBQUMsMkJBQUE7TUFDREMsZUFBZSxHQUFBRCwyQkFBQSxDQUFBRCxPQUFBO0lBQUE7SUFBQUcsT0FBQSxXQUFBQSxDQUFBO01BQUFDLE9BQUEsUUFFVEMsR0FBRyxHQUFHLFNBQU5BLEdBQUdBLENBQWFDLFVBQVUsRUFBRUMsUUFBUSxFQUFFQyxTQUFTLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFO1FBQ3pFSCxRQUFRLEdBQUdULENBQUMsQ0FBQ1MsUUFBUSxDQUFDO1FBQ3RCQyxTQUFTLEdBQUdWLENBQUMsQ0FBQ1UsU0FBUyxDQUFDO1FBRXhCLElBQU1HLEtBQUssR0FBRyxJQUFJVCxlQUFlLENBQUMsdUNBQXVDLENBQUM7UUFDMUUsT0FBT1MsS0FBSyxDQUFDQyxJQUFJLEVBQUUsQ0FBQ0MsSUFBSSxDQUFDLFVBQVVGLEtBQUssRUFBRTtVQUN4Q0EsS0FBSyxDQUFDRyxTQUFTLEVBQUUsQ0FBQ0QsSUFBSSxDQUFDLFVBQVVFLFdBQVcsRUFBRTtZQUM1QyxJQUFJLENBQUNBLFdBQVcsQ0FBQ0MsUUFBUSxDQUFDLGdCQUFnQixFQUFFVixVQUFVLENBQUMsRUFBRTtjQUN2RFMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQ1QsVUFBVSxDQUFDO2NBQzVDLElBQU1XLE1BQU0sR0FBRyxJQUFJZixlQUFlLENBQUMsMEJBQTBCLENBQUM7Y0FDOUQsT0FBT2UsTUFBTSxDQUFDTCxJQUFJLEVBQUUsQ0FBQ0MsSUFBSSxDQUFDLFVBQVVJLE1BQU0sRUFBRTtnQkFDMUNBLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLEVBQUU7Y0FDbEMsQ0FBQyxDQUFDO1lBQ0o7VUFDRixDQUFDLENBQUM7UUFDSixDQUFDLENBQUM7TUFDSixDQUFDO01BQUFiLE9BQUEsU0FFWWMsSUFBSTtJQUFBO0VBQUE7QUFBQSJ9