"use strict";

System.register(["jquery", "/js/common/individual_model.js"], function (_export, _context) {
  "use strict";

  var $, IndividualModel, post, html;
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_jsCommonIndividual_modelJs) {
      IndividualModel = _jsCommonIndividual_modelJs.default;
    }],
    execute: function () {
      _export("post", post = function post(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        var self = individual;
        function typeHandler(values) {
          var holder = $('#holder', template).empty();
          if (values.length) {
            var blank = new IndividualModel();
            blank['v-fc:targetType'] = values;
            blank['rdf:type'] = [new IndividualModel('v-fc:Blank')];
            blank.present(holder, 'v-fc:BlankTemplate');
          }
        }
        self.on('v-fc:targetType', typeHandler);
        template.one('remove', function () {
          self.off('v-fc:targetType', typeHandler);
        });
        if (self.hasValue('v-fc:targetType')) {
          typeHandler(self['v-fc:targetType']);
        }
      });
      _export("html", html = "\n  <div class=\"container\">\n    <div class=\"sheet\">\n      <h3 property=\"rdfs:label\"></h3>\n      <em about=\"v-fc:ChooseType\" property=\"rdfs:label\"></em>\n      <veda-control rel=\"v-fc:targetType\" data-type=\"link\" class=\"fulltext dropdown\"></veda-control>\n    </div>\n    <div id=\"holder\"></div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfanNDb21tb25JbmRpdmlkdWFsX21vZGVsSnMiLCJJbmRpdmlkdWFsTW9kZWwiLCJleGVjdXRlIiwiX2V4cG9ydCIsInBvc3QiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJzZWxmIiwidHlwZUhhbmRsZXIiLCJ2YWx1ZXMiLCJob2xkZXIiLCJlbXB0eSIsImxlbmd0aCIsImJsYW5rIiwicHJlc2VudCIsIm9uIiwib25lIiwib2ZmIiwiaGFzVmFsdWUiLCJodG1sIl0sInNvdXJjZXMiOlsiLi4vLi4vb250b2xvZ3kvZ2VuZXJpYy1mdW5jdGlvbi90ZW1wbGF0ZXMvdi1mY19DcmVhdGVCeVR5cGVUZW1wbGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IEluZGl2aWR1YWxNb2RlbCBmcm9tICcvanMvY29tbW9uL2luZGl2aWR1YWxfbW9kZWwuanMnO1xuXG5leHBvcnQgY29uc3QgcG9zdCA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgY29uc3Qgc2VsZiA9IGluZGl2aWR1YWw7XG4gIGZ1bmN0aW9uIHR5cGVIYW5kbGVyICh2YWx1ZXMpIHtcbiAgICBjb25zdCBob2xkZXIgPSAkKCcjaG9sZGVyJywgdGVtcGxhdGUpLmVtcHR5KCk7XG4gICAgaWYgKHZhbHVlcy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGJsYW5rID0gbmV3IEluZGl2aWR1YWxNb2RlbCgpO1xuICAgICAgYmxhbmtbJ3YtZmM6dGFyZ2V0VHlwZSddID0gdmFsdWVzO1xuICAgICAgYmxhbmtbJ3JkZjp0eXBlJ10gPSBbbmV3IEluZGl2aWR1YWxNb2RlbCgndi1mYzpCbGFuaycpXTtcbiAgICAgIGJsYW5rLnByZXNlbnQoaG9sZGVyLCAndi1mYzpCbGFua1RlbXBsYXRlJyk7XG4gICAgfVxuICB9XG4gIHNlbGYub24oJ3YtZmM6dGFyZ2V0VHlwZScsIHR5cGVIYW5kbGVyKTtcbiAgdGVtcGxhdGUub25lKCdyZW1vdmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgc2VsZi5vZmYoJ3YtZmM6dGFyZ2V0VHlwZScsIHR5cGVIYW5kbGVyKTtcbiAgfSk7XG4gIGlmIChzZWxmLmhhc1ZhbHVlKCd2LWZjOnRhcmdldFR5cGUnKSkge1xuICAgIHR5cGVIYW5kbGVyKHNlbGZbJ3YtZmM6dGFyZ2V0VHlwZSddKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGh0bWwgPSBgXG4gIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICA8ZGl2IGNsYXNzPVwic2hlZXRcIj5cbiAgICAgIDxoMyBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L2gzPlxuICAgICAgPGVtIGFib3V0PVwidi1mYzpDaG9vc2VUeXBlXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9lbT5cbiAgICAgIDx2ZWRhLWNvbnRyb2wgcmVsPVwidi1mYzp0YXJnZXRUeXBlXCIgZGF0YS10eXBlPVwibGlua1wiIGNsYXNzPVwiZnVsbHRleHQgZHJvcGRvd25cIj48L3ZlZGEtY29udHJvbD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGlkPVwiaG9sZGVyXCI+PC9kaXY+XG4gIDwvZGl2PlxuYDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7TUFBT0EsQ0FBQyxHQUFBQyxPQUFBLENBQUFDLE9BQUE7SUFBQSxhQUFBQywyQkFBQTtNQUNEQyxlQUFlLEdBQUFELDJCQUFBLENBQUFELE9BQUE7SUFBQTtJQUFBRyxPQUFBLFdBQUFBLENBQUE7TUFBQUMsT0FBQSxTQUVUQyxJQUFJLEdBQUcsU0FBUEEsSUFBSUEsQ0FBYUMsVUFBVSxFQUFFQyxRQUFRLEVBQUVDLFNBQVMsRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUU7UUFDMUVILFFBQVEsR0FBR1QsQ0FBQyxDQUFDUyxRQUFRLENBQUM7UUFDdEJDLFNBQVMsR0FBR1YsQ0FBQyxDQUFDVSxTQUFTLENBQUM7UUFFeEIsSUFBTUcsSUFBSSxHQUFHTCxVQUFVO1FBQ3ZCLFNBQVNNLFdBQVdBLENBQUVDLE1BQU0sRUFBRTtVQUM1QixJQUFNQyxNQUFNLEdBQUdoQixDQUFDLENBQUMsU0FBUyxFQUFFUyxRQUFRLENBQUMsQ0FBQ1EsS0FBSyxFQUFFO1VBQzdDLElBQUlGLE1BQU0sQ0FBQ0csTUFBTSxFQUFFO1lBQ2pCLElBQU1DLEtBQUssR0FBRyxJQUFJZixlQUFlLEVBQUU7WUFDbkNlLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHSixNQUFNO1lBQ2pDSSxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJZixlQUFlLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDdkRlLEtBQUssQ0FBQ0MsT0FBTyxDQUFDSixNQUFNLEVBQUUsb0JBQW9CLENBQUM7VUFDN0M7UUFDRjtRQUNBSCxJQUFJLENBQUNRLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRVAsV0FBVyxDQUFDO1FBQ3ZDTCxRQUFRLENBQUNhLEdBQUcsQ0FBQyxRQUFRLEVBQUUsWUFBWTtVQUNqQ1QsSUFBSSxDQUFDVSxHQUFHLENBQUMsaUJBQWlCLEVBQUVULFdBQVcsQ0FBQztRQUMxQyxDQUFDLENBQUM7UUFDRixJQUFJRCxJQUFJLENBQUNXLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO1VBQ3BDVixXQUFXLENBQUNELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3RDO01BQ0YsQ0FBQztNQUFBUCxPQUFBLFNBRVltQixJQUFJO0lBQUE7RUFBQTtBQUFBIn0=