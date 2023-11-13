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
        var relatedTasks = new IndividualModel('v-ft:RelatedTasks');
        return relatedTasks.load().then(function (relatedTasks) {
          relatedTasks.clearValue('v-fs:searchResult');
          var taskId = individual.id;
          var docId = individual.hasValue('v-wf:onDocument') && individual['v-wf:onDocument'][0].id;
          var queryStr = ["'@' != '" + taskId + "'", "'v-wf:onDocument' == '" + docId + "'", "'rdf:type'==='v-wf:DecisionForm'", "'v-wf:isCompleted'== false "].join(' && ');
          relatedTasks['v-fs:fulltextQuery'] = [queryStr];
        });
      });
      _export("html", html = "\n  <div>\n    <div about=\"v-ft:RelatedTasks\" data-template=\"v-fs:AttributiveSearchInlineTemplate\"></div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfanNDb21tb25JbmRpdmlkdWFsX21vZGVsSnMiLCJJbmRpdmlkdWFsTW9kZWwiLCJleGVjdXRlIiwiX2V4cG9ydCIsInByZSIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsInJlbGF0ZWRUYXNrcyIsImxvYWQiLCJ0aGVuIiwiY2xlYXJWYWx1ZSIsInRhc2tJZCIsImlkIiwiZG9jSWQiLCJoYXNWYWx1ZSIsInF1ZXJ5U3RyIiwiam9pbiIsImh0bWwiXSwic291cmNlcyI6WyIuLi8uLi9vbnRvbG9neS9nZW5lcmljLWZ1bmN0aW9uL3RlbXBsYXRlcy92LWZ0X1Rhc2tSZWxhdGVkVGFza3NUZW1wbGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IEluZGl2aWR1YWxNb2RlbCBmcm9tICcvanMvY29tbW9uL2luZGl2aWR1YWxfbW9kZWwuanMnO1xuXG5leHBvcnQgY29uc3QgcHJlID0gZnVuY3Rpb24gKGluZGl2aWR1YWwsIHRlbXBsYXRlLCBjb250YWluZXIsIG1vZGUsIGV4dHJhKSB7XG4gIHRlbXBsYXRlID0gJCh0ZW1wbGF0ZSk7XG4gIGNvbnRhaW5lciA9ICQoY29udGFpbmVyKTtcblxuICBjb25zdCByZWxhdGVkVGFza3MgPSBuZXcgSW5kaXZpZHVhbE1vZGVsKCd2LWZ0OlJlbGF0ZWRUYXNrcycpO1xuICByZXR1cm4gcmVsYXRlZFRhc2tzLmxvYWQoKS50aGVuKGZ1bmN0aW9uIChyZWxhdGVkVGFza3MpIHtcbiAgICByZWxhdGVkVGFza3MuY2xlYXJWYWx1ZSgndi1mczpzZWFyY2hSZXN1bHQnKTtcbiAgICBjb25zdCB0YXNrSWQgPSBpbmRpdmlkdWFsLmlkO1xuICAgIGNvbnN0IGRvY0lkID0gaW5kaXZpZHVhbC5oYXNWYWx1ZSgndi13ZjpvbkRvY3VtZW50JykgJiYgaW5kaXZpZHVhbFsndi13ZjpvbkRvY3VtZW50J11bMF0uaWQ7XG4gICAgY29uc3QgcXVlcnlTdHIgPSBbXCInQCcgIT0gJ1wiICsgdGFza0lkICsgXCInXCIsIFwiJ3Ytd2Y6b25Eb2N1bWVudCcgPT0gJ1wiICsgZG9jSWQgKyBcIidcIiwgXCIncmRmOnR5cGUnPT09J3Ytd2Y6RGVjaXNpb25Gb3JtJ1wiLCBcIid2LXdmOmlzQ29tcGxldGVkJz09IGZhbHNlIFwiXS5qb2luKFxuICAgICAgJyAmJiAnLFxuICAgICk7XG4gICAgcmVsYXRlZFRhc2tzWyd2LWZzOmZ1bGx0ZXh0UXVlcnknXSA9IFtxdWVyeVN0cl07XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGh0bWwgPSBgXG4gIDxkaXY+XG4gICAgPGRpdiBhYm91dD1cInYtZnQ6UmVsYXRlZFRhc2tzXCIgZGF0YS10ZW1wbGF0ZT1cInYtZnM6QXR0cmlidXRpdmVTZWFyY2hJbmxpbmVUZW1wbGF0ZVwiPjwvZGl2PlxuICA8L2Rpdj5cbmA7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O01BQU9BLENBQUMsR0FBQUMsT0FBQSxDQUFBQyxPQUFBO0lBQUEsYUFBQUMsMkJBQUE7TUFDREMsZUFBZSxHQUFBRCwyQkFBQSxDQUFBRCxPQUFBO0lBQUE7SUFBQUcsT0FBQSxXQUFBQSxDQUFBO01BQUFDLE9BQUEsUUFFVEMsR0FBRyxHQUFHLFNBQU5BLEdBQUdBLENBQWFDLFVBQVUsRUFBRUMsUUFBUSxFQUFFQyxTQUFTLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFO1FBQ3pFSCxRQUFRLEdBQUdULENBQUMsQ0FBQ1MsUUFBUSxDQUFDO1FBQ3RCQyxTQUFTLEdBQUdWLENBQUMsQ0FBQ1UsU0FBUyxDQUFDO1FBRXhCLElBQU1HLFlBQVksR0FBRyxJQUFJVCxlQUFlLENBQUMsbUJBQW1CLENBQUM7UUFDN0QsT0FBT1MsWUFBWSxDQUFDQyxJQUFJLEVBQUUsQ0FBQ0MsSUFBSSxDQUFDLFVBQVVGLFlBQVksRUFBRTtVQUN0REEsWUFBWSxDQUFDRyxVQUFVLENBQUMsbUJBQW1CLENBQUM7VUFDNUMsSUFBTUMsTUFBTSxHQUFHVCxVQUFVLENBQUNVLEVBQUU7VUFDNUIsSUFBTUMsS0FBSyxHQUFHWCxVQUFVLENBQUNZLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJWixVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ1UsRUFBRTtVQUMzRixJQUFNRyxRQUFRLEdBQUcsQ0FBQyxVQUFVLEdBQUdKLE1BQU0sR0FBRyxHQUFHLEVBQUUsd0JBQXdCLEdBQUdFLEtBQUssR0FBRyxHQUFHLEVBQUUsa0NBQWtDLEVBQUUsNkJBQTZCLENBQUMsQ0FBQ0csSUFBSSxDQUMxSixNQUFNLENBQ1A7VUFDRFQsWUFBWSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQ1EsUUFBUSxDQUFDO1FBQ2pELENBQUMsQ0FBQztNQUNKLENBQUM7TUFBQWYsT0FBQSxTQUVZaUIsSUFBSTtJQUFBO0VBQUE7QUFBQSJ9