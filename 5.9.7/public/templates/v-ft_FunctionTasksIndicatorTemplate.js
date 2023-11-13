"use strict";

System.register(["/js/common/util.js", "jquery", "/js/common/individual_model.js"], function (_export, _context) {
  "use strict";

  var CommonUtil, $, IndividualModel, pre, html;
  return {
    setters: [function (_jsCommonUtilJs) {
      CommonUtil = _jsCommonUtilJs.default;
    }, function (_jquery) {
      $ = _jquery.default;
    }, function (_jsCommonIndividual_modelJs) {
      IndividualModel = _jsCommonIndividual_modelJs.default;
    }],
    execute: function () {
      // import veda from '/js/common/veda.js';
      _export("pre", pre = function pre(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);

        /* var counter_uri = "d:taskCounter_" + veda.user.id.split(":").join("_");
        $("#counter", template).attr("about", counter_uri);*/
        return new IndividualModel('v-s:TaskBundle').load().then(function (taskBundle) {
          template.tooltip({
            container: template,
            placement: 'bottom',
            trigger: 'hover',
            title: taskBundle['rdfs:label'].map(CommonUtil.formatValue).join(' ')
          });
        });
      });
      _export("html", html = "\n  <a href=\"#/@\" data-toggle=\"tooltip\" data-trigger=\"hover\" data-placement=\"bottom\">\n    <span class=\"fa fa-envelope-o fa-lg\"></span>\n    <!--span id=\"counter\" class=\"label label-danger\" property=\"v-ft:inboxCount\"></span-->\n  </a>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJDb21tb25VdGlsIiwiX2pzQ29tbW9uVXRpbEpzIiwiZGVmYXVsdCIsIl9qcXVlcnkiLCIkIiwiX2pzQ29tbW9uSW5kaXZpZHVhbF9tb2RlbEpzIiwiSW5kaXZpZHVhbE1vZGVsIiwiZXhlY3V0ZSIsIl9leHBvcnQiLCJwcmUiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJsb2FkIiwidGhlbiIsInRhc2tCdW5kbGUiLCJ0b29sdGlwIiwicGxhY2VtZW50IiwidHJpZ2dlciIsInRpdGxlIiwibWFwIiwiZm9ybWF0VmFsdWUiLCJqb2luIiwiaHRtbCJdLCJzb3VyY2VzIjpbIi4uLy4uL29udG9sb2d5L2dlbmVyaWMtZnVuY3Rpb24vdGVtcGxhdGVzL3YtZnRfRnVuY3Rpb25UYXNrc0luZGljYXRvclRlbXBsYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21tb25VdGlsIGZyb20gJy9qcy9jb21tb24vdXRpbC5qcyc7XG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuLy8gaW1wb3J0IHZlZGEgZnJvbSAnL2pzL2NvbW1vbi92ZWRhLmpzJztcbmltcG9ydCBJbmRpdmlkdWFsTW9kZWwgZnJvbSAnL2pzL2NvbW1vbi9pbmRpdmlkdWFsX21vZGVsLmpzJztcblxuZXhwb3J0IGNvbnN0IHByZSA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgLyogdmFyIGNvdW50ZXJfdXJpID0gXCJkOnRhc2tDb3VudGVyX1wiICsgdmVkYS51c2VyLmlkLnNwbGl0KFwiOlwiKS5qb2luKFwiX1wiKTtcbiAgJChcIiNjb3VudGVyXCIsIHRlbXBsYXRlKS5hdHRyKFwiYWJvdXRcIiwgY291bnRlcl91cmkpOyovXG4gIHJldHVybiBuZXcgSW5kaXZpZHVhbE1vZGVsKCd2LXM6VGFza0J1bmRsZScpLmxvYWQoKS50aGVuKGZ1bmN0aW9uICh0YXNrQnVuZGxlKSB7XG4gICAgdGVtcGxhdGUudG9vbHRpcCh7XG4gICAgICBjb250YWluZXI6IHRlbXBsYXRlLFxuICAgICAgcGxhY2VtZW50OiAnYm90dG9tJyxcbiAgICAgIHRyaWdnZXI6ICdob3ZlcicsXG4gICAgICB0aXRsZTogdGFza0J1bmRsZVsncmRmczpsYWJlbCddLm1hcChDb21tb25VdGlsLmZvcm1hdFZhbHVlKS5qb2luKCcgJyksXG4gICAgfSk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGh0bWwgPSBgXG4gIDxhIGhyZWY9XCIjL0BcIiBkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIiBkYXRhLXRyaWdnZXI9XCJob3ZlclwiIGRhdGEtcGxhY2VtZW50PVwiYm90dG9tXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1lbnZlbG9wZS1vIGZhLWxnXCI+PC9zcGFuPlxuICAgIDwhLS1zcGFuIGlkPVwiY291bnRlclwiIGNsYXNzPVwibGFiZWwgbGFiZWwtZGFuZ2VyXCIgcHJvcGVydHk9XCJ2LWZ0OmluYm94Q291bnRcIj48L3NwYW4tLT5cbiAgPC9hPlxuYDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7TUFBT0EsVUFBVSxHQUFBQyxlQUFBLENBQUFDLE9BQUE7SUFBQSxhQUFBQyxPQUFBO01BQ1ZDLENBQUMsR0FBQUQsT0FBQSxDQUFBRCxPQUFBO0lBQUEsYUFBQUcsMkJBQUE7TUFFREMsZUFBZSxHQUFBRCwyQkFBQSxDQUFBSCxPQUFBO0lBQUE7SUFBQUssT0FBQSxXQUFBQSxDQUFBO01BRHRCO01BQUFDLE9BQUEsUUFHYUMsR0FBRyxHQUFHLFNBQU5BLEdBQUdBLENBQWFDLFVBQVUsRUFBRUMsUUFBUSxFQUFFQyxTQUFTLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFO1FBQ3pFSCxRQUFRLEdBQUdQLENBQUMsQ0FBQ08sUUFBUSxDQUFDO1FBQ3RCQyxTQUFTLEdBQUdSLENBQUMsQ0FBQ1EsU0FBUyxDQUFDOztRQUV4QjtBQUNGO1FBQ0UsT0FBTyxJQUFJTixlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQ1MsSUFBSSxFQUFFLENBQUNDLElBQUksQ0FBQyxVQUFVQyxVQUFVLEVBQUU7VUFDN0VOLFFBQVEsQ0FBQ08sT0FBTyxDQUFDO1lBQ2ZOLFNBQVMsRUFBRUQsUUFBUTtZQUNuQlEsU0FBUyxFQUFFLFFBQVE7WUFDbkJDLE9BQU8sRUFBRSxPQUFPO1lBQ2hCQyxLQUFLLEVBQUVKLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQ0ssR0FBRyxDQUFDdEIsVUFBVSxDQUFDdUIsV0FBVyxDQUFDLENBQUNDLElBQUksQ0FBQyxHQUFHO1VBQ3RFLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQztNQUNKLENBQUM7TUFBQWhCLE9BQUEsU0FFWWlCLElBQUk7SUFBQTtFQUFBO0FBQUEifQ==