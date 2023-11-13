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
        var type = individual.id === 'v-s:Divider' ? 'divider' : individual.hasValue('v-s:menuItem') ? 'submenu' : individual.hasValue('v-s:objectLink') ? 'object' : individual.hasValue('v-s:staticLink') ? 'static' : undefined;
        switch (type) {
          case 'divider':
            template.empty().addClass('divider');
            break;
          case 'submenu':
            template.addClass('dropdown').find('#static, #object').remove();
            break;
          case 'object':
            template.attr('rel', 'v-s:objectLink').find('#static, #submenu, #submenu-ul').remove();
            break;
          case 'static':
            template.find('#object, #submenu, #submenu-ul').remove();
            template.find('#static').attr('href', individual['v-s:staticLink'][0]);
            break;
        }
      });
      _export("html", html = "\n  <li>\n    <a id=\"static\">\n      <span property=\"rdfs:label\"></span>\n    </a>\n    <a id=\"object\" href=\"#/@\">\n      <span property=\"rdfs:label\"></span>\n    </a>\n    <a id=\"submenu\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\" role=\"button\" aria-expanded=\"false\">\n      <span property=\"rdfs:label\"></span> <span class=\"caret\"></span>\n    </a>\n    <ul id=\"submenu-ul\" class=\"dropdown-menu\" role=\"menu\" rel=\"v-s:menuItem\" data-template=\"v-s:MenuItemViewTemplate\"></ul>\n  </li>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInByZSIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsInR5cGUiLCJpZCIsImhhc1ZhbHVlIiwidW5kZWZpbmVkIiwiZW1wdHkiLCJhZGRDbGFzcyIsImZpbmQiLCJyZW1vdmUiLCJhdHRyIiwiaHRtbCJdLCJzb3VyY2VzIjpbIi4uLy4uL29udG9sb2d5L2dlbmVyaWMtYXBwbGljYXRpb24vdGVtcGxhdGVzL3Ytc19NZW51SXRlbVZpZXdUZW1wbGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG5leHBvcnQgY29uc3QgcHJlID0gZnVuY3Rpb24gKGluZGl2aWR1YWwsIHRlbXBsYXRlLCBjb250YWluZXIsIG1vZGUsIGV4dHJhKSB7XG4gIHRlbXBsYXRlID0gJCh0ZW1wbGF0ZSk7XG4gIGNvbnRhaW5lciA9ICQoY29udGFpbmVyKTtcblxuICBjb25zdCB0eXBlID1cbiAgICBpbmRpdmlkdWFsLmlkID09PSAndi1zOkRpdmlkZXInID9cbiAgICAgICdkaXZpZGVyJyA6XG4gICAgICBpbmRpdmlkdWFsLmhhc1ZhbHVlKCd2LXM6bWVudUl0ZW0nKSA/XG4gICAgICAgICdzdWJtZW51JyA6XG4gICAgICAgIGluZGl2aWR1YWwuaGFzVmFsdWUoJ3YtczpvYmplY3RMaW5rJykgP1xuICAgICAgICAgICdvYmplY3QnIDpcbiAgICAgICAgICBpbmRpdmlkdWFsLmhhc1ZhbHVlKCd2LXM6c3RhdGljTGluaycpID9cbiAgICAgICAgICAgICdzdGF0aWMnIDpcbiAgICAgICAgICAgIHVuZGVmaW5lZDtcbiAgc3dpdGNoICh0eXBlKSB7XG4gIGNhc2UgJ2RpdmlkZXInOlxuICAgIHRlbXBsYXRlLmVtcHR5KCkuYWRkQ2xhc3MoJ2RpdmlkZXInKTtcbiAgICBicmVhaztcbiAgY2FzZSAnc3VibWVudSc6XG4gICAgdGVtcGxhdGUuYWRkQ2xhc3MoJ2Ryb3Bkb3duJykuZmluZCgnI3N0YXRpYywgI29iamVjdCcpLnJlbW92ZSgpO1xuICAgIGJyZWFrO1xuICBjYXNlICdvYmplY3QnOlxuICAgIHRlbXBsYXRlLmF0dHIoJ3JlbCcsICd2LXM6b2JqZWN0TGluaycpLmZpbmQoJyNzdGF0aWMsICNzdWJtZW51LCAjc3VibWVudS11bCcpLnJlbW92ZSgpO1xuICAgIGJyZWFrO1xuICBjYXNlICdzdGF0aWMnOlxuICAgIHRlbXBsYXRlLmZpbmQoJyNvYmplY3QsICNzdWJtZW51LCAjc3VibWVudS11bCcpLnJlbW92ZSgpO1xuICAgIHRlbXBsYXRlLmZpbmQoJyNzdGF0aWMnKS5hdHRyKCdocmVmJywgaW5kaXZpZHVhbFsndi1zOnN0YXRpY0xpbmsnXVswXSk7XG4gICAgYnJlYWs7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBodG1sID0gYFxuICA8bGk+XG4gICAgPGEgaWQ9XCJzdGF0aWNcIj5cbiAgICAgIDxzcGFuIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvc3Bhbj5cbiAgICA8L2E+XG4gICAgPGEgaWQ9XCJvYmplY3RcIiBocmVmPVwiIy9AXCI+XG4gICAgICA8c3BhbiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L3NwYW4+XG4gICAgPC9hPlxuICAgIDxhIGlkPVwic3VibWVudVwiIGNsYXNzPVwiZHJvcGRvd24tdG9nZ2xlXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiIGhyZWY9XCIjXCIgcm9sZT1cImJ1dHRvblwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPlxuICAgICAgPHNwYW4gcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9zcGFuPiA8c3BhbiBjbGFzcz1cImNhcmV0XCI+PC9zcGFuPlxuICAgIDwvYT5cbiAgICA8dWwgaWQ9XCJzdWJtZW51LXVsXCIgY2xhc3M9XCJkcm9wZG93bi1tZW51XCIgcm9sZT1cIm1lbnVcIiByZWw9XCJ2LXM6bWVudUl0ZW1cIiBkYXRhLXRlbXBsYXRlPVwidi1zOk1lbnVJdGVtVmlld1RlbXBsYXRlXCI+PC91bD5cbiAgPC9saT5cbmA7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O01BQU9BLENBQUMsR0FBQUMsT0FBQSxDQUFBQyxPQUFBO0lBQUE7SUFBQUMsT0FBQSxXQUFBQSxDQUFBO01BQUFDLE9BQUEsUUFFS0MsR0FBRyxHQUFHLFNBQU5BLEdBQUdBLENBQWFDLFVBQVUsRUFBRUMsUUFBUSxFQUFFQyxTQUFTLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFO1FBQ3pFSCxRQUFRLEdBQUdQLENBQUMsQ0FBQ08sUUFBUSxDQUFDO1FBQ3RCQyxTQUFTLEdBQUdSLENBQUMsQ0FBQ1EsU0FBUyxDQUFDO1FBRXhCLElBQU1HLElBQUksR0FDUkwsVUFBVSxDQUFDTSxFQUFFLEtBQUssYUFBYSxHQUM3QixTQUFTLEdBQ1ROLFVBQVUsQ0FBQ08sUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUNqQyxTQUFTLEdBQ1RQLFVBQVUsQ0FBQ08sUUFBUSxDQUFDLGdCQUFnQixDQUFDLEdBQ25DLFFBQVEsR0FDUlAsVUFBVSxDQUFDTyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsR0FDbkMsUUFBUSxHQUNSQyxTQUFTO1FBQ25CLFFBQVFILElBQUk7VUFDWixLQUFLLFNBQVM7WUFDWkosUUFBUSxDQUFDUSxLQUFLLEVBQUUsQ0FBQ0MsUUFBUSxDQUFDLFNBQVMsQ0FBQztZQUNwQztVQUNGLEtBQUssU0FBUztZQUNaVCxRQUFRLENBQUNTLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUNDLE1BQU0sRUFBRTtZQUMvRDtVQUNGLEtBQUssUUFBUTtZQUNYWCxRQUFRLENBQUNZLElBQUksQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQ0YsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLENBQUNDLE1BQU0sRUFBRTtZQUN0RjtVQUNGLEtBQUssUUFBUTtZQUNYWCxRQUFRLENBQUNVLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDQyxNQUFNLEVBQUU7WUFDeERYLFFBQVEsQ0FBQ1UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDRSxJQUFJLENBQUMsTUFBTSxFQUFFYixVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0RTtRQUFNO01BRVYsQ0FBQztNQUFBRixPQUFBLFNBRVlnQixJQUFJO0lBQUE7RUFBQTtBQUFBIn0=