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
        var membershipRegistryBlank = new IndividualModel('v-s:MembershipRegistryBlank');
        var membershipRegistryBlankPromise = membershipRegistryBlank.load().then(function (membershipRegistryBlank) {
          delete membershipRegistryBlank.object;
          membershipRegistryBlank['v-s:memberOf'] = [individual];
          return membershipRegistryBlank.init();
        });
        var membershipBlank = new IndividualModel('v-s:MembershipBlank');
        var membershipBlankPromise = membershipBlank.load().then(function (membershipBlank) {
          delete membershipBlank.object;
          membershipBlank['v-s:memberOf'] = [individual];
          return membershipBlank.init();
        });
        return Promise.all([membershipRegistryBlankPromise, membershipBlankPromise]);
      });
      _export("html", html = "\n  <div class=\"container sheet\">\n    <div about=\"@\" data-embedded=\"true\" data-template=\"v-ui:CommonOntologyTemplate\"></div>\n    <div class=\"panel panel-default\">\n      <div class=\"panel-heading\">\n        <span about=\"v-s:MembershipRegistry\" property=\"rdfs:label\"></span\n        ><a href=\"#/v-s:MembershipBlank\" about=\"v-s:CreateBundle\" property=\"rdfs:label\" class=\"btn btn-xs btn-default pull-right\"></a>\n      </div>\n      <div class=\"panel-body\" about=\"v-s:MembershipRegistry\" data-template=\"v-fs:AttributiveSearchInlineTemplate\"></div>\n    </div>\n    <br />\n    <br />\n    <div class=\"actions\">\n      <span about=\"@\" data-template=\"v-ui:StandardButtonsTemplate\" data-embedded=\"true\" data-buttons=\"edit save cancel delete destroy\"></span>\n    </div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfanNDb21tb25JbmRpdmlkdWFsX21vZGVsSnMiLCJJbmRpdmlkdWFsTW9kZWwiLCJleGVjdXRlIiwiX2V4cG9ydCIsInByZSIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsIm1lbWJlcnNoaXBSZWdpc3RyeUJsYW5rIiwibWVtYmVyc2hpcFJlZ2lzdHJ5QmxhbmtQcm9taXNlIiwibG9hZCIsInRoZW4iLCJvYmplY3QiLCJpbml0IiwibWVtYmVyc2hpcEJsYW5rIiwibWVtYmVyc2hpcEJsYW5rUHJvbWlzZSIsIlByb21pc2UiLCJhbGwiLCJodG1sIl0sInNvdXJjZXMiOlsiLi4vLi4vb250b2xvZ3kvZ2VuZXJpYy1mdW5jdGlvbi90ZW1wbGF0ZXMvdi11aV9Hcm91cFRlbXBsYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgSW5kaXZpZHVhbE1vZGVsIGZyb20gJy9qcy9jb21tb24vaW5kaXZpZHVhbF9tb2RlbC5qcyc7XG5cbmV4cG9ydCBjb25zdCBwcmUgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gIGNvbnN0IG1lbWJlcnNoaXBSZWdpc3RyeUJsYW5rID0gbmV3IEluZGl2aWR1YWxNb2RlbCgndi1zOk1lbWJlcnNoaXBSZWdpc3RyeUJsYW5rJyk7XG4gIGNvbnN0IG1lbWJlcnNoaXBSZWdpc3RyeUJsYW5rUHJvbWlzZSA9IG1lbWJlcnNoaXBSZWdpc3RyeUJsYW5rLmxvYWQoKS50aGVuKGZ1bmN0aW9uIChtZW1iZXJzaGlwUmVnaXN0cnlCbGFuaykge1xuICAgIGRlbGV0ZSBtZW1iZXJzaGlwUmVnaXN0cnlCbGFuay5vYmplY3Q7XG4gICAgbWVtYmVyc2hpcFJlZ2lzdHJ5QmxhbmtbJ3YtczptZW1iZXJPZiddID0gW2luZGl2aWR1YWxdO1xuICAgIHJldHVybiBtZW1iZXJzaGlwUmVnaXN0cnlCbGFuay5pbml0KCk7XG4gIH0pO1xuXG4gIGNvbnN0IG1lbWJlcnNoaXBCbGFuayA9IG5ldyBJbmRpdmlkdWFsTW9kZWwoJ3YtczpNZW1iZXJzaGlwQmxhbmsnKTtcbiAgY29uc3QgbWVtYmVyc2hpcEJsYW5rUHJvbWlzZSA9IG1lbWJlcnNoaXBCbGFuay5sb2FkKCkudGhlbihmdW5jdGlvbiAobWVtYmVyc2hpcEJsYW5rKSB7XG4gICAgZGVsZXRlIG1lbWJlcnNoaXBCbGFuay5vYmplY3Q7XG4gICAgbWVtYmVyc2hpcEJsYW5rWyd2LXM6bWVtYmVyT2YnXSA9IFtpbmRpdmlkdWFsXTtcbiAgICByZXR1cm4gbWVtYmVyc2hpcEJsYW5rLmluaXQoKTtcbiAgfSk7XG5cbiAgcmV0dXJuIFByb21pc2UuYWxsKFttZW1iZXJzaGlwUmVnaXN0cnlCbGFua1Byb21pc2UsIG1lbWJlcnNoaXBCbGFua1Byb21pc2VdKTtcbn07XG5cbmV4cG9ydCBjb25zdCBodG1sID0gYFxuICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyIHNoZWV0XCI+XG4gICAgPGRpdiBhYm91dD1cIkBcIiBkYXRhLWVtYmVkZGVkPVwidHJ1ZVwiIGRhdGEtdGVtcGxhdGU9XCJ2LXVpOkNvbW1vbk9udG9sb2d5VGVtcGxhdGVcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwicGFuZWwgcGFuZWwtZGVmYXVsdFwiPlxuICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWhlYWRpbmdcIj5cbiAgICAgICAgPHNwYW4gYWJvdXQ9XCJ2LXM6TWVtYmVyc2hpcFJlZ2lzdHJ5XCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9zcGFuXG4gICAgICAgID48YSBocmVmPVwiIy92LXM6TWVtYmVyc2hpcEJsYW5rXCIgYWJvdXQ9XCJ2LXM6Q3JlYXRlQnVuZGxlXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCIgY2xhc3M9XCJidG4gYnRuLXhzIGJ0bi1kZWZhdWx0IHB1bGwtcmlnaHRcIj48L2E+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCIgYWJvdXQ9XCJ2LXM6TWVtYmVyc2hpcFJlZ2lzdHJ5XCIgZGF0YS10ZW1wbGF0ZT1cInYtZnM6QXR0cmlidXRpdmVTZWFyY2hJbmxpbmVUZW1wbGF0ZVwiPjwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxiciAvPlxuICAgIDxiciAvPlxuICAgIDxkaXYgY2xhc3M9XCJhY3Rpb25zXCI+XG4gICAgICA8c3BhbiBhYm91dD1cIkBcIiBkYXRhLXRlbXBsYXRlPVwidi11aTpTdGFuZGFyZEJ1dHRvbnNUZW1wbGF0ZVwiIGRhdGEtZW1iZWRkZWQ9XCJ0cnVlXCIgZGF0YS1idXR0b25zPVwiZWRpdCBzYXZlIGNhbmNlbCBkZWxldGUgZGVzdHJveVwiPjwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5gO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztNQUFPQSxDQUFDLEdBQUFDLE9BQUEsQ0FBQUMsT0FBQTtJQUFBLGFBQUFDLDJCQUFBO01BQ0RDLGVBQWUsR0FBQUQsMkJBQUEsQ0FBQUQsT0FBQTtJQUFBO0lBQUFHLE9BQUEsV0FBQUEsQ0FBQTtNQUFBQyxPQUFBLFFBRVRDLEdBQUcsR0FBRyxTQUFOQSxHQUFHQSxDQUFhQyxVQUFVLEVBQUVDLFFBQVEsRUFBRUMsU0FBUyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRTtRQUN6RUgsUUFBUSxHQUFHVCxDQUFDLENBQUNTLFFBQVEsQ0FBQztRQUN0QkMsU0FBUyxHQUFHVixDQUFDLENBQUNVLFNBQVMsQ0FBQztRQUV4QixJQUFNRyx1QkFBdUIsR0FBRyxJQUFJVCxlQUFlLENBQUMsNkJBQTZCLENBQUM7UUFDbEYsSUFBTVUsOEJBQThCLEdBQUdELHVCQUF1QixDQUFDRSxJQUFJLEVBQUUsQ0FBQ0MsSUFBSSxDQUFDLFVBQVVILHVCQUF1QixFQUFFO1VBQzVHLE9BQU9BLHVCQUF1QixDQUFDSSxNQUFNO1VBQ3JDSix1QkFBdUIsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDTCxVQUFVLENBQUM7VUFDdEQsT0FBT0ssdUJBQXVCLENBQUNLLElBQUksRUFBRTtRQUN2QyxDQUFDLENBQUM7UUFFRixJQUFNQyxlQUFlLEdBQUcsSUFBSWYsZUFBZSxDQUFDLHFCQUFxQixDQUFDO1FBQ2xFLElBQU1nQixzQkFBc0IsR0FBR0QsZUFBZSxDQUFDSixJQUFJLEVBQUUsQ0FBQ0MsSUFBSSxDQUFDLFVBQVVHLGVBQWUsRUFBRTtVQUNwRixPQUFPQSxlQUFlLENBQUNGLE1BQU07VUFDN0JFLGVBQWUsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDWCxVQUFVLENBQUM7VUFDOUMsT0FBT1csZUFBZSxDQUFDRCxJQUFJLEVBQUU7UUFDL0IsQ0FBQyxDQUFDO1FBRUYsT0FBT0csT0FBTyxDQUFDQyxHQUFHLENBQUMsQ0FBQ1IsOEJBQThCLEVBQUVNLHNCQUFzQixDQUFDLENBQUM7TUFDOUUsQ0FBQztNQUFBZCxPQUFBLFNBRVlpQixJQUFJO0lBQUE7RUFBQTtBQUFBIn0=