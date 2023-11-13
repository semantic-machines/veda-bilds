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
      _export("pre", pre = function pre(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        var actions = $('#edit-comment, #delete', template);
        individual.rights.then(function (rights) {
          if (!rights.hasValue('v-s:canUpdate', true)) {
            actions.remove();
          }
        });
        $('.action', template).click(function (e) {
          e.preventDefault();
          var actionId = this.id;
          var warning = new IndividualModel('v-s:AreYouSure');
          warning.load().then(function (warning) {
            warning = warning['rdfs:label'].map(CommonUtil.formatValue).join(' ');
            if (actionId === 'delete' && !confirm(warning)) {
              return;
            }
            template[0].dispatchEvent(new Event(actionId));
          });
        });
        individual.on('v-s:hasComment', commentHandler);
        individual.on('v-s:linkedObject', linkedHandler);
        template.one('remove', function () {
          individual.off('v-s:hasComment', commentHandler);
          individual.off('v-s:linkedObject', linkedHandler);
        });
        commentHandler(individual['v-s:hasComment']);
        linkedHandler(individual['v-s:linkedObject']);
        function commentHandler(values) {
          values.length ? actions.hide() : actions.show();
        }
        function linkedHandler(values) {
          values.length ? $('.linked-object', template).show() : $('.linked-object', template).hide();
        }
      });
      _export("html", html = "\n  <div class=\"media\" style=\"overflow:initial;\">\n    <div class=\"media-body\" style=\"overflow:initial;\">\n      <div id=\"comment-content\">\n        <div>\n          <span rel=\"v-s:creator\">\n            <span>\n              <strong rel=\"v-s:employee\" data-template=\"v-ui:LabelTemplate\"></strong>\n              <small rel=\"v-s:occupation\" data-template=\"v-ui:LabelTemplate\"></small>\n            </span>\n          </span>\n          <small>\n            <span>&bullet;&nbsp;&nbsp;</span>\n            <span property=\"v-s:created\"></span>\n          </small>\n          <br />\n          <span property=\"rdfs:label\"></span>\n        </div>\n        <div rel=\"v-s:attachment\" data-template=\"v-ui:FileTemplate\"></div>\n        <div class=\"linked-object\">\n          <em about=\"v-s:linkedObject\" property=\"rdfs:label\"></em>\n          <ul rel=\"v-s:linkedObject\">\n            <li about=\"@\" data-template=\"v-ui:ClassNameLabelLinkTemplate\"></li>\n          </ul>\n        </div>\n        <small>\n          <a href=\"#\" id=\"reply\" class=\"action\" about=\"v-s:Reply\" property=\"rdfs:label\"></a>\n          &nbsp;\n          <a href=\"#\" id=\"edit-comment\" class=\"action\" about=\"v-s:Edit\" property=\"rdfs:label\"></a>\n          &nbsp;\n          <a href=\"#\" id=\"delete\" class=\"action\" about=\"v-s:Delete\" property=\"rdfs:label\"></a>\n        </small>\n      </div>\n      <div id=\"new-reply\"></div>\n      <hr class=\"margin-sm\" />\n      <div class=\"row\">\n        <div class=\"col-sm-1 col-xs-1\"></div>\n        <div class=\"col-sm-11 col-xs-11\">\n          <div about=\"@\" rel=\"v-s:hasComment\" data-template=\"v-s:RecursiveCommentTemplate\"></div>\n        </div>\n      </div>\n    </div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJDb21tb25VdGlsIiwiX2pzQ29tbW9uVXRpbEpzIiwiZGVmYXVsdCIsIl9qcXVlcnkiLCIkIiwiX2pzQ29tbW9uSW5kaXZpZHVhbF9tb2RlbEpzIiwiSW5kaXZpZHVhbE1vZGVsIiwiZXhlY3V0ZSIsIl9leHBvcnQiLCJwcmUiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJhY3Rpb25zIiwicmlnaHRzIiwidGhlbiIsImhhc1ZhbHVlIiwicmVtb3ZlIiwiY2xpY2siLCJlIiwicHJldmVudERlZmF1bHQiLCJhY3Rpb25JZCIsImlkIiwid2FybmluZyIsImxvYWQiLCJtYXAiLCJmb3JtYXRWYWx1ZSIsImpvaW4iLCJjb25maXJtIiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50Iiwib24iLCJjb21tZW50SGFuZGxlciIsImxpbmtlZEhhbmRsZXIiLCJvbmUiLCJvZmYiLCJ2YWx1ZXMiLCJsZW5ndGgiLCJoaWRlIiwic2hvdyIsImh0bWwiXSwic291cmNlcyI6WyIuLi8uLi9vbnRvbG9neS9nZW5lcmljLWZ1bmN0aW9uL3RlbXBsYXRlcy92LXNfUmVjdXJzaXZlQ29tbWVudFRlbXBsYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21tb25VdGlsIGZyb20gJy9qcy9jb21tb24vdXRpbC5qcyc7XG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IEluZGl2aWR1YWxNb2RlbCBmcm9tICcvanMvY29tbW9uL2luZGl2aWR1YWxfbW9kZWwuanMnO1xuXG5leHBvcnQgY29uc3QgcHJlID0gZnVuY3Rpb24gKGluZGl2aWR1YWwsIHRlbXBsYXRlLCBjb250YWluZXIsIG1vZGUsIGV4dHJhKSB7XG4gIHRlbXBsYXRlID0gJCh0ZW1wbGF0ZSk7XG4gIGNvbnRhaW5lciA9ICQoY29udGFpbmVyKTtcblxuICBjb25zdCBhY3Rpb25zID0gJCgnI2VkaXQtY29tbWVudCwgI2RlbGV0ZScsIHRlbXBsYXRlKTtcbiAgaW5kaXZpZHVhbC5yaWdodHMudGhlbihmdW5jdGlvbiAocmlnaHRzKSB7XG4gICAgaWYgKCFyaWdodHMuaGFzVmFsdWUoJ3YtczpjYW5VcGRhdGUnLCB0cnVlKSkge1xuICAgICAgYWN0aW9ucy5yZW1vdmUoKTtcbiAgICB9XG4gIH0pO1xuXG4gICQoJy5hY3Rpb24nLCB0ZW1wbGF0ZSkuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgYWN0aW9uSWQgPSB0aGlzLmlkO1xuICAgIGNvbnN0IHdhcm5pbmcgPSBuZXcgSW5kaXZpZHVhbE1vZGVsKCd2LXM6QXJlWW91U3VyZScpO1xuICAgIHdhcm5pbmcubG9hZCgpLnRoZW4oZnVuY3Rpb24gKHdhcm5pbmcpIHtcbiAgICAgIHdhcm5pbmcgPSB3YXJuaW5nWydyZGZzOmxhYmVsJ10ubWFwKENvbW1vblV0aWwuZm9ybWF0VmFsdWUpLmpvaW4oJyAnKTtcbiAgICAgIGlmIChhY3Rpb25JZCA9PT0gJ2RlbGV0ZScgJiYgIWNvbmZpcm0od2FybmluZykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGVtcGxhdGVbMF0uZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoYWN0aW9uSWQpKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgaW5kaXZpZHVhbC5vbigndi1zOmhhc0NvbW1lbnQnLCBjb21tZW50SGFuZGxlcik7XG4gIGluZGl2aWR1YWwub24oJ3YtczpsaW5rZWRPYmplY3QnLCBsaW5rZWRIYW5kbGVyKTtcbiAgdGVtcGxhdGUub25lKCdyZW1vdmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgaW5kaXZpZHVhbC5vZmYoJ3YtczpoYXNDb21tZW50JywgY29tbWVudEhhbmRsZXIpO1xuICAgIGluZGl2aWR1YWwub2ZmKCd2LXM6bGlua2VkT2JqZWN0JywgbGlua2VkSGFuZGxlcik7XG4gIH0pO1xuICBjb21tZW50SGFuZGxlcihpbmRpdmlkdWFsWyd2LXM6aGFzQ29tbWVudCddKTtcbiAgbGlua2VkSGFuZGxlcihpbmRpdmlkdWFsWyd2LXM6bGlua2VkT2JqZWN0J10pO1xuXG4gIGZ1bmN0aW9uIGNvbW1lbnRIYW5kbGVyICh2YWx1ZXMpIHtcbiAgICB2YWx1ZXMubGVuZ3RoID8gYWN0aW9ucy5oaWRlKCkgOiBhY3Rpb25zLnNob3coKTtcbiAgfVxuICBmdW5jdGlvbiBsaW5rZWRIYW5kbGVyICh2YWx1ZXMpIHtcbiAgICB2YWx1ZXMubGVuZ3RoID8gJCgnLmxpbmtlZC1vYmplY3QnLCB0ZW1wbGF0ZSkuc2hvdygpIDogJCgnLmxpbmtlZC1vYmplY3QnLCB0ZW1wbGF0ZSkuaGlkZSgpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaHRtbCA9IGBcbiAgPGRpdiBjbGFzcz1cIm1lZGlhXCIgc3R5bGU9XCJvdmVyZmxvdzppbml0aWFsO1wiPlxuICAgIDxkaXYgY2xhc3M9XCJtZWRpYS1ib2R5XCIgc3R5bGU9XCJvdmVyZmxvdzppbml0aWFsO1wiPlxuICAgICAgPGRpdiBpZD1cImNvbW1lbnQtY29udGVudFwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxzcGFuIHJlbD1cInYtczpjcmVhdG9yXCI+XG4gICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgPHN0cm9uZyByZWw9XCJ2LXM6ZW1wbG95ZWVcIiBkYXRhLXRlbXBsYXRlPVwidi11aTpMYWJlbFRlbXBsYXRlXCI+PC9zdHJvbmc+XG4gICAgICAgICAgICAgIDxzbWFsbCByZWw9XCJ2LXM6b2NjdXBhdGlvblwiIGRhdGEtdGVtcGxhdGU9XCJ2LXVpOkxhYmVsVGVtcGxhdGVcIj48L3NtYWxsPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8c21hbGw+XG4gICAgICAgICAgICA8c3Bhbj4mYnVsbGV0OyZuYnNwOyZuYnNwOzwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIHByb3BlcnR5PVwidi1zOmNyZWF0ZWRcIj48L3NwYW4+XG4gICAgICAgICAgPC9zbWFsbD5cbiAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICA8c3BhbiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHJlbD1cInYtczphdHRhY2htZW50XCIgZGF0YS10ZW1wbGF0ZT1cInYtdWk6RmlsZVRlbXBsYXRlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsaW5rZWQtb2JqZWN0XCI+XG4gICAgICAgICAgPGVtIGFib3V0PVwidi1zOmxpbmtlZE9iamVjdFwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvZW0+XG4gICAgICAgICAgPHVsIHJlbD1cInYtczpsaW5rZWRPYmplY3RcIj5cbiAgICAgICAgICAgIDxsaSBhYm91dD1cIkBcIiBkYXRhLXRlbXBsYXRlPVwidi11aTpDbGFzc05hbWVMYWJlbExpbmtUZW1wbGF0ZVwiPjwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxzbWFsbD5cbiAgICAgICAgICA8YSBocmVmPVwiI1wiIGlkPVwicmVwbHlcIiBjbGFzcz1cImFjdGlvblwiIGFib3V0PVwidi1zOlJlcGx5XCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9hPlxuICAgICAgICAgICZuYnNwO1xuICAgICAgICAgIDxhIGhyZWY9XCIjXCIgaWQ9XCJlZGl0LWNvbW1lbnRcIiBjbGFzcz1cImFjdGlvblwiIGFib3V0PVwidi1zOkVkaXRcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L2E+XG4gICAgICAgICAgJm5ic3A7XG4gICAgICAgICAgPGEgaHJlZj1cIiNcIiBpZD1cImRlbGV0ZVwiIGNsYXNzPVwiYWN0aW9uXCIgYWJvdXQ9XCJ2LXM6RGVsZXRlXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9hPlxuICAgICAgICA8L3NtYWxsPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGlkPVwibmV3LXJlcGx5XCI+PC9kaXY+XG4gICAgICA8aHIgY2xhc3M9XCJtYXJnaW4tc21cIiAvPlxuICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTEgY29sLXhzLTFcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMSBjb2wteHMtMTFcIj5cbiAgICAgICAgICA8ZGl2IGFib3V0PVwiQFwiIHJlbD1cInYtczpoYXNDb21tZW50XCIgZGF0YS10ZW1wbGF0ZT1cInYtczpSZWN1cnNpdmVDb21tZW50VGVtcGxhdGVcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5gO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztNQUFPQSxVQUFVLEdBQUFDLGVBQUEsQ0FBQUMsT0FBQTtJQUFBLGFBQUFDLE9BQUE7TUFDVkMsQ0FBQyxHQUFBRCxPQUFBLENBQUFELE9BQUE7SUFBQSxhQUFBRywyQkFBQTtNQUNEQyxlQUFlLEdBQUFELDJCQUFBLENBQUFILE9BQUE7SUFBQTtJQUFBSyxPQUFBLFdBQUFBLENBQUE7TUFBQUMsT0FBQSxRQUVUQyxHQUFHLEdBQUcsU0FBTkEsR0FBR0EsQ0FBYUMsVUFBVSxFQUFFQyxRQUFRLEVBQUVDLFNBQVMsRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUU7UUFDekVILFFBQVEsR0FBR1AsQ0FBQyxDQUFDTyxRQUFRLENBQUM7UUFDdEJDLFNBQVMsR0FBR1IsQ0FBQyxDQUFDUSxTQUFTLENBQUM7UUFFeEIsSUFBTUcsT0FBTyxHQUFHWCxDQUFDLENBQUMsd0JBQXdCLEVBQUVPLFFBQVEsQ0FBQztRQUNyREQsVUFBVSxDQUFDTSxNQUFNLENBQUNDLElBQUksQ0FBQyxVQUFVRCxNQUFNLEVBQUU7VUFDdkMsSUFBSSxDQUFDQSxNQUFNLENBQUNFLFFBQVEsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDM0NILE9BQU8sQ0FBQ0ksTUFBTSxFQUFFO1VBQ2xCO1FBQ0YsQ0FBQyxDQUFDO1FBRUZmLENBQUMsQ0FBQyxTQUFTLEVBQUVPLFFBQVEsQ0FBQyxDQUFDUyxLQUFLLENBQUMsVUFBVUMsQ0FBQyxFQUFFO1VBQ3hDQSxDQUFDLENBQUNDLGNBQWMsRUFBRTtVQUNsQixJQUFNQyxRQUFRLEdBQUcsSUFBSSxDQUFDQyxFQUFFO1VBQ3hCLElBQU1DLE9BQU8sR0FBRyxJQUFJbkIsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1VBQ3JEbUIsT0FBTyxDQUFDQyxJQUFJLEVBQUUsQ0FBQ1QsSUFBSSxDQUFDLFVBQVVRLE9BQU8sRUFBRTtZQUNyQ0EsT0FBTyxHQUFHQSxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUNFLEdBQUcsQ0FBQzNCLFVBQVUsQ0FBQzRCLFdBQVcsQ0FBQyxDQUFDQyxJQUFJLENBQUMsR0FBRyxDQUFDO1lBQ3JFLElBQUlOLFFBQVEsS0FBSyxRQUFRLElBQUksQ0FBQ08sT0FBTyxDQUFDTCxPQUFPLENBQUMsRUFBRTtjQUM5QztZQUNGO1lBQ0FkLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQ29CLGFBQWEsQ0FBQyxJQUFJQyxLQUFLLENBQUNULFFBQVEsQ0FBQyxDQUFDO1VBQ2hELENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQztRQUVGYixVQUFVLENBQUN1QixFQUFFLENBQUMsZ0JBQWdCLEVBQUVDLGNBQWMsQ0FBQztRQUMvQ3hCLFVBQVUsQ0FBQ3VCLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRUUsYUFBYSxDQUFDO1FBQ2hEeEIsUUFBUSxDQUFDeUIsR0FBRyxDQUFDLFFBQVEsRUFBRSxZQUFZO1VBQ2pDMUIsVUFBVSxDQUFDMkIsR0FBRyxDQUFDLGdCQUFnQixFQUFFSCxjQUFjLENBQUM7VUFDaER4QixVQUFVLENBQUMyQixHQUFHLENBQUMsa0JBQWtCLEVBQUVGLGFBQWEsQ0FBQztRQUNuRCxDQUFDLENBQUM7UUFDRkQsY0FBYyxDQUFDeEIsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDNUN5QixhQUFhLENBQUN6QixVQUFVLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUU3QyxTQUFTd0IsY0FBY0EsQ0FBRUksTUFBTSxFQUFFO1VBQy9CQSxNQUFNLENBQUNDLE1BQU0sR0FBR3hCLE9BQU8sQ0FBQ3lCLElBQUksRUFBRSxHQUFHekIsT0FBTyxDQUFDMEIsSUFBSSxFQUFFO1FBQ2pEO1FBQ0EsU0FBU04sYUFBYUEsQ0FBRUcsTUFBTSxFQUFFO1VBQzlCQSxNQUFNLENBQUNDLE1BQU0sR0FBR25DLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRU8sUUFBUSxDQUFDLENBQUM4QixJQUFJLEVBQUUsR0FBR3JDLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRU8sUUFBUSxDQUFDLENBQUM2QixJQUFJLEVBQUU7UUFDN0Y7TUFDRixDQUFDO01BQUFoQyxPQUFBLFNBRVlrQyxJQUFJO0lBQUE7RUFBQTtBQUFBIn0=