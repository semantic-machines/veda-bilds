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
        $('.action', template).click(function (e) {
          e.preventDefault();
          template[0].dispatchEvent(new Event(this.id));
        });
        template.on('validate', function () {
          var result = {};
          if (!(individual.hasValue('rdfs:label') || individual.hasValue('v-s:attachment') || individual.hasValue('v-s:linkedObject'))) {
            result['rdfs:label'] = {
              state: false,
              cause: ['v-ui:minCardinality']
            };
            result['v-s:attachment'] = {
              state: false,
              cause: ['v-ui:minCardinality']
            };
            result['v-s:linkedObject'] = {
              state: false,
              cause: ['v-ui:minCardinality']
            };
          }
          template[0].dispatchEvent(new CustomEvent('validated', {
            detail: result
          }));
        });
      });
      _export("html", html = "\n  <div class=\"panel panel-default\" style=\"margin-top: 20px\">\n    <div class=\"panel-body\">\n      <em about=\"rdfs:comment\" property=\"rdfs:label\"></em>\n      <div property=\"rdfs:label\" class=\"view -edit -search\"></div>\n      <veda-control data-type=\"text\" rows=\"3\" property=\"rdfs:label\" class=\"-view edit -search\"></veda-control>\n      <em about=\"v-s:attachment\" property=\"rdfs:label\"></em>\n      <div rel=\"v-s:attachment\" data-template=\"v-ui:FileTemplate\" data-embedded=\"true\"></div>\n      <veda-control data-type=\"file\" rel=\"v-s:attachment\" class=\"-view edit -search\"></veda-control>\n      <em about=\"v-s:linkedObject\" property=\"rdfs:label\"></em>\n      <div rel=\"v-s:linkedObject\" data-template=\"v-ui:ClassNameLabelLinkTemplate\"></div>\n      <veda-control data-type=\"link\" rel=\"v-s:linkedObject\" class=\"-view edit -search fulltext\"></veda-control>\n    </div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInByZSIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsImNsaWNrIiwiZSIsInByZXZlbnREZWZhdWx0IiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50IiwiaWQiLCJvbiIsInJlc3VsdCIsImhhc1ZhbHVlIiwic3RhdGUiLCJjYXVzZSIsIkN1c3RvbUV2ZW50IiwiZGV0YWlsIiwiaHRtbCJdLCJzb3VyY2VzIjpbIi4uLy4uL29udG9sb2d5L2dlbmVyaWMtZnVuY3Rpb24vdGVtcGxhdGVzL3Ytc19FbWJlZGRlZFNpbmdsZUNvbW1lbnRUZW1wbGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG5leHBvcnQgY29uc3QgcHJlID0gZnVuY3Rpb24gKGluZGl2aWR1YWwsIHRlbXBsYXRlLCBjb250YWluZXIsIG1vZGUsIGV4dHJhKSB7XG4gIHRlbXBsYXRlID0gJCh0ZW1wbGF0ZSk7XG4gIGNvbnRhaW5lciA9ICQoY29udGFpbmVyKTtcblxuICAkKCcuYWN0aW9uJywgdGVtcGxhdGUpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRlbXBsYXRlWzBdLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KHRoaXMuaWQpKTtcbiAgfSk7XG5cbiAgdGVtcGxhdGUub24oJ3ZhbGlkYXRlJywgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGlmICghKGluZGl2aWR1YWwuaGFzVmFsdWUoJ3JkZnM6bGFiZWwnKSB8fCBpbmRpdmlkdWFsLmhhc1ZhbHVlKCd2LXM6YXR0YWNobWVudCcpIHx8IGluZGl2aWR1YWwuaGFzVmFsdWUoJ3YtczpsaW5rZWRPYmplY3QnKSkpIHtcbiAgICAgIHJlc3VsdFsncmRmczpsYWJlbCddID0ge1xuICAgICAgICBzdGF0ZTogZmFsc2UsXG4gICAgICAgIGNhdXNlOiBbJ3YtdWk6bWluQ2FyZGluYWxpdHknXSxcbiAgICAgIH07XG4gICAgICByZXN1bHRbJ3YtczphdHRhY2htZW50J10gPSB7XG4gICAgICAgIHN0YXRlOiBmYWxzZSxcbiAgICAgICAgY2F1c2U6IFsndi11aTptaW5DYXJkaW5hbGl0eSddLFxuICAgICAgfTtcbiAgICAgIHJlc3VsdFsndi1zOmxpbmtlZE9iamVjdCddID0ge1xuICAgICAgICBzdGF0ZTogZmFsc2UsXG4gICAgICAgIGNhdXNlOiBbJ3YtdWk6bWluQ2FyZGluYWxpdHknXSxcbiAgICAgIH07XG4gICAgfVxuICAgIHRlbXBsYXRlWzBdLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCd2YWxpZGF0ZWQnLCB7ZGV0YWlsOiByZXN1bHR9KSk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGh0bWwgPSBgXG4gIDxkaXYgY2xhc3M9XCJwYW5lbCBwYW5lbC1kZWZhdWx0XCIgc3R5bGU9XCJtYXJnaW4tdG9wOiAyMHB4XCI+XG4gICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj5cbiAgICAgIDxlbSBhYm91dD1cInJkZnM6Y29tbWVudFwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvZW0+XG4gICAgICA8ZGl2IHByb3BlcnR5PVwicmRmczpsYWJlbFwiIGNsYXNzPVwidmlldyAtZWRpdCAtc2VhcmNoXCI+PC9kaXY+XG4gICAgICA8dmVkYS1jb250cm9sIGRhdGEtdHlwZT1cInRleHRcIiByb3dzPVwiM1wiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiIGNsYXNzPVwiLXZpZXcgZWRpdCAtc2VhcmNoXCI+PC92ZWRhLWNvbnRyb2w+XG4gICAgICA8ZW0gYWJvdXQ9XCJ2LXM6YXR0YWNobWVudFwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvZW0+XG4gICAgICA8ZGl2IHJlbD1cInYtczphdHRhY2htZW50XCIgZGF0YS10ZW1wbGF0ZT1cInYtdWk6RmlsZVRlbXBsYXRlXCIgZGF0YS1lbWJlZGRlZD1cInRydWVcIj48L2Rpdj5cbiAgICAgIDx2ZWRhLWNvbnRyb2wgZGF0YS10eXBlPVwiZmlsZVwiIHJlbD1cInYtczphdHRhY2htZW50XCIgY2xhc3M9XCItdmlldyBlZGl0IC1zZWFyY2hcIj48L3ZlZGEtY29udHJvbD5cbiAgICAgIDxlbSBhYm91dD1cInYtczpsaW5rZWRPYmplY3RcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L2VtPlxuICAgICAgPGRpdiByZWw9XCJ2LXM6bGlua2VkT2JqZWN0XCIgZGF0YS10ZW1wbGF0ZT1cInYtdWk6Q2xhc3NOYW1lTGFiZWxMaW5rVGVtcGxhdGVcIj48L2Rpdj5cbiAgICAgIDx2ZWRhLWNvbnRyb2wgZGF0YS10eXBlPVwibGlua1wiIHJlbD1cInYtczpsaW5rZWRPYmplY3RcIiBjbGFzcz1cIi12aWV3IGVkaXQgLXNlYXJjaCBmdWxsdGV4dFwiPjwvdmVkYS1jb250cm9sPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbmA7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O01BQU9BLENBQUMsR0FBQUMsT0FBQSxDQUFBQyxPQUFBO0lBQUE7SUFBQUMsT0FBQSxXQUFBQSxDQUFBO01BQUFDLE9BQUEsUUFFS0MsR0FBRyxHQUFHLFNBQU5BLEdBQUdBLENBQWFDLFVBQVUsRUFBRUMsUUFBUSxFQUFFQyxTQUFTLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFO1FBQ3pFSCxRQUFRLEdBQUdQLENBQUMsQ0FBQ08sUUFBUSxDQUFDO1FBQ3RCQyxTQUFTLEdBQUdSLENBQUMsQ0FBQ1EsU0FBUyxDQUFDO1FBRXhCUixDQUFDLENBQUMsU0FBUyxFQUFFTyxRQUFRLENBQUMsQ0FBQ0ksS0FBSyxDQUFDLFVBQVVDLENBQUMsRUFBRTtVQUN4Q0EsQ0FBQyxDQUFDQyxjQUFjLEVBQUU7VUFDbEJOLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQ08sYUFBYSxDQUFDLElBQUlDLEtBQUssQ0FBQyxJQUFJLENBQUNDLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLENBQUMsQ0FBQztRQUVGVCxRQUFRLENBQUNVLEVBQUUsQ0FBQyxVQUFVLEVBQUUsWUFBWTtVQUNsQyxJQUFNQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1VBQ2pCLElBQUksRUFBRVosVUFBVSxDQUFDYSxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUliLFVBQVUsQ0FBQ2EsUUFBUSxDQUFDLGdCQUFnQixDQUFDLElBQUliLFVBQVUsQ0FBQ2EsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBRTtZQUM1SEQsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHO2NBQ3JCRSxLQUFLLEVBQUUsS0FBSztjQUNaQyxLQUFLLEVBQUUsQ0FBQyxxQkFBcUI7WUFDL0IsQ0FBQztZQUNESCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsR0FBRztjQUN6QkUsS0FBSyxFQUFFLEtBQUs7Y0FDWkMsS0FBSyxFQUFFLENBQUMscUJBQXFCO1lBQy9CLENBQUM7WUFDREgsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEdBQUc7Y0FDM0JFLEtBQUssRUFBRSxLQUFLO2NBQ1pDLEtBQUssRUFBRSxDQUFDLHFCQUFxQjtZQUMvQixDQUFDO1VBQ0g7VUFDQWQsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDTyxhQUFhLENBQUMsSUFBSVEsV0FBVyxDQUFDLFdBQVcsRUFBRTtZQUFDQyxNQUFNLEVBQUVMO1VBQU0sQ0FBQyxDQUFDLENBQUM7UUFDM0UsQ0FBQyxDQUFDO01BQ0osQ0FBQztNQUFBZCxPQUFBLFNBRVlvQixJQUFJO0lBQUE7RUFBQTtBQUFBIn0=