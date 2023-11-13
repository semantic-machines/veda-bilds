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
      });
      _export("html", html = "\n  <div class=\"panel panel-default\" style=\"margin-top: 20px\">\n    <div class=\"panel-body\">\n      <em about=\"rdfs:comment\" property=\"rdfs:label\"></em>\n      <div property=\"rdfs:label\" class=\"view -edit -search\"></div>\n      <veda-control data-type=\"text\" rows=\"3\" property=\"rdfs:label\" class=\"-view edit -search\"></veda-control>\n      <em about=\"v-s:attachment\" property=\"rdfs:label\">\u0412\u043B\u043E\u0436\u0435\u043D\u0438\u0435</em>\n      <div rel=\"v-s:attachment\" data-template=\"v-ui:FileTemplate\" data-embedded=\"true\"></div>\n      <veda-control data-type=\"file\" rel=\"v-s:attachment\" class=\"-view edit -search\"></veda-control>\n      <em about=\"v-s:linkedObject\" property=\"rdfs:label\">\u0412\u043B\u043E\u0436\u0435\u043D\u0438\u0435</em>\n      <div rel=\"v-s:linkedObject\" data-template=\"v-ui:ClassNameLabelLinkTemplate\"></div>\n      <veda-control data-type=\"link\" rel=\"v-s:linkedObject\" class=\"-view edit -search fulltext\"></veda-control>\n      <br />\n      <span about=\"@\" data-template=\"v-ui:StandardButtonsTemplate\" data-embedded=\"true\" data-buttons=\"save edit cancel delete\"></span>\n    </div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInByZSIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsImNsaWNrIiwiZSIsInByZXZlbnREZWZhdWx0IiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50IiwiaWQiLCJodG1sIl0sInNvdXJjZXMiOlsiLi4vLi4vb250b2xvZ3kvZ2VuZXJpYy1mdW5jdGlvbi90ZW1wbGF0ZXMvdi1zX1NpbmdsZUNvbW1lbnRUZW1wbGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG5leHBvcnQgY29uc3QgcHJlID0gZnVuY3Rpb24gKGluZGl2aWR1YWwsIHRlbXBsYXRlLCBjb250YWluZXIsIG1vZGUsIGV4dHJhKSB7XG4gIHRlbXBsYXRlID0gJCh0ZW1wbGF0ZSk7XG4gIGNvbnRhaW5lciA9ICQoY29udGFpbmVyKTtcblxuICAkKCcuYWN0aW9uJywgdGVtcGxhdGUpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRlbXBsYXRlWzBdLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KHRoaXMuaWQpKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgaHRtbCA9IGBcbiAgPGRpdiBjbGFzcz1cInBhbmVsIHBhbmVsLWRlZmF1bHRcIiBzdHlsZT1cIm1hcmdpbi10b3A6IDIwcHhcIj5cbiAgICA8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiPlxuICAgICAgPGVtIGFib3V0PVwicmRmczpjb21tZW50XCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9lbT5cbiAgICAgIDxkaXYgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCIgY2xhc3M9XCJ2aWV3IC1lZGl0IC1zZWFyY2hcIj48L2Rpdj5cbiAgICAgIDx2ZWRhLWNvbnRyb2wgZGF0YS10eXBlPVwidGV4dFwiIHJvd3M9XCIzXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCIgY2xhc3M9XCItdmlldyBlZGl0IC1zZWFyY2hcIj48L3ZlZGEtY29udHJvbD5cbiAgICAgIDxlbSBhYm91dD1cInYtczphdHRhY2htZW50XCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+0JLQu9C+0LbQtdC90LjQtTwvZW0+XG4gICAgICA8ZGl2IHJlbD1cInYtczphdHRhY2htZW50XCIgZGF0YS10ZW1wbGF0ZT1cInYtdWk6RmlsZVRlbXBsYXRlXCIgZGF0YS1lbWJlZGRlZD1cInRydWVcIj48L2Rpdj5cbiAgICAgIDx2ZWRhLWNvbnRyb2wgZGF0YS10eXBlPVwiZmlsZVwiIHJlbD1cInYtczphdHRhY2htZW50XCIgY2xhc3M9XCItdmlldyBlZGl0IC1zZWFyY2hcIj48L3ZlZGEtY29udHJvbD5cbiAgICAgIDxlbSBhYm91dD1cInYtczpsaW5rZWRPYmplY3RcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj7QktC70L7QttC10L3QuNC1PC9lbT5cbiAgICAgIDxkaXYgcmVsPVwidi1zOmxpbmtlZE9iamVjdFwiIGRhdGEtdGVtcGxhdGU9XCJ2LXVpOkNsYXNzTmFtZUxhYmVsTGlua1RlbXBsYXRlXCI+PC9kaXY+XG4gICAgICA8dmVkYS1jb250cm9sIGRhdGEtdHlwZT1cImxpbmtcIiByZWw9XCJ2LXM6bGlua2VkT2JqZWN0XCIgY2xhc3M9XCItdmlldyBlZGl0IC1zZWFyY2ggZnVsbHRleHRcIj48L3ZlZGEtY29udHJvbD5cbiAgICAgIDxiciAvPlxuICAgICAgPHNwYW4gYWJvdXQ9XCJAXCIgZGF0YS10ZW1wbGF0ZT1cInYtdWk6U3RhbmRhcmRCdXR0b25zVGVtcGxhdGVcIiBkYXRhLWVtYmVkZGVkPVwidHJ1ZVwiIGRhdGEtYnV0dG9ucz1cInNhdmUgZWRpdCBjYW5jZWwgZGVsZXRlXCI+PC9zcGFuPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbmA7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O01BQU9BLENBQUMsR0FBQUMsT0FBQSxDQUFBQyxPQUFBO0lBQUE7SUFBQUMsT0FBQSxXQUFBQSxDQUFBO01BQUFDLE9BQUEsUUFFS0MsR0FBRyxHQUFHLFNBQU5BLEdBQUdBLENBQWFDLFVBQVUsRUFBRUMsUUFBUSxFQUFFQyxTQUFTLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFO1FBQ3pFSCxRQUFRLEdBQUdQLENBQUMsQ0FBQ08sUUFBUSxDQUFDO1FBQ3RCQyxTQUFTLEdBQUdSLENBQUMsQ0FBQ1EsU0FBUyxDQUFDO1FBRXhCUixDQUFDLENBQUMsU0FBUyxFQUFFTyxRQUFRLENBQUMsQ0FBQ0ksS0FBSyxDQUFDLFVBQVVDLENBQUMsRUFBRTtVQUN4Q0EsQ0FBQyxDQUFDQyxjQUFjLEVBQUU7VUFDbEJOLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQ08sYUFBYSxDQUFDLElBQUlDLEtBQUssQ0FBQyxJQUFJLENBQUNDLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLENBQUMsQ0FBQztNQUNKLENBQUM7TUFBQVosT0FBQSxTQUVZYSxJQUFJO0lBQUE7RUFBQTtBQUFBIn0=