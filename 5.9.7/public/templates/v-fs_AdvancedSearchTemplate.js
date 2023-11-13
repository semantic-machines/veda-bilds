"use strict";

System.register(["jquery"], function (_export, _context) {
  "use strict";

  var $, post, html;
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }],
    execute: function () {
      _export("post", post = function post(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        var find = container.siblings('.search-actions').find('#search-button.search-button');
        function typeHandler() {
          if (!individual.hasValue('rdf:type')) {
            find.attr('disabled', 'disabled');
            find.addClass('disabled');
            $('veda-control[rel="rdf:type"]', template).addClass('has-error');
          } else {
            find.removeAttr('disabled', 'disabled');
            find.removeClass('disabled');
            $('veda-control[rel="rdf:type"]', template).removeClass('has-error');
          }
        }
        typeHandler();
        individual.on('rdf:type', typeHandler);
        template.one('remove', function () {
          individual.off('rdf:type', typeHandler);
        });
      });
      _export("html", html = "\n  <div>\n    <div class=\"row\">\n      <div class=\"col-md-3\">\n        <em about=\"rdf:type\" property=\"rdfs:label\"></em>\n        <veda-control\n          rel=\"rdf:type\"\n          data-single=\"true\"\n          data-type=\"link\"\n          class=\"fulltext dropdown\"\n          data-query-prefix=\"'rdfs:subClassOf'==='v-s:UserSearchableDocument'\"></veda-control>\n      </div>\n      <div class=\"col-md-3\">\n        <em about=\"v-fs:SearchForContentBundle\" property=\"rdfs:label\"></em>\n        <veda-control property=\"text\" data-type=\"string\" placeholder=\"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\"></veda-control>\n      </div>\n      <div class=\"col-md-3\">\n        <em about=\"v-s:created\" property=\"rdfs:label\"></em>\n        <div property=\"v-s:created\"></div>\n        <veda-control data-type=\"date\" property=\"v-s:created\"></veda-control>\n      </div>\n      <div class=\"col-md-3\">\n        <em about=\"v-s:creator\" property=\"rdfs:label\"></em>\n        <div property=\"v-s:creator\"></div>\n        <veda-control data-type=\"link\" class=\"fulltext\" property=\"v-s:creator\"></veda-control>\n      </div>\n    </div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInBvc3QiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJmaW5kIiwic2libGluZ3MiLCJ0eXBlSGFuZGxlciIsImhhc1ZhbHVlIiwiYXR0ciIsImFkZENsYXNzIiwicmVtb3ZlQXR0ciIsInJlbW92ZUNsYXNzIiwib24iLCJvbmUiLCJvZmYiLCJodG1sIl0sInNvdXJjZXMiOlsiLi4vLi4vb250b2xvZ3kvZ2VuZXJpYy1mdW5jdGlvbi90ZW1wbGF0ZXMvdi1mc19BZHZhbmNlZFNlYXJjaFRlbXBsYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmV4cG9ydCBjb25zdCBwb3N0ID0gZnVuY3Rpb24gKGluZGl2aWR1YWwsIHRlbXBsYXRlLCBjb250YWluZXIsIG1vZGUsIGV4dHJhKSB7XG4gIHRlbXBsYXRlID0gJCh0ZW1wbGF0ZSk7XG4gIGNvbnRhaW5lciA9ICQoY29udGFpbmVyKTtcblxuICBjb25zdCBmaW5kID0gY29udGFpbmVyLnNpYmxpbmdzKCcuc2VhcmNoLWFjdGlvbnMnKS5maW5kKCcjc2VhcmNoLWJ1dHRvbi5zZWFyY2gtYnV0dG9uJyk7XG5cbiAgZnVuY3Rpb24gdHlwZUhhbmRsZXIgKCkge1xuICAgIGlmICghaW5kaXZpZHVhbC5oYXNWYWx1ZSgncmRmOnR5cGUnKSkge1xuICAgICAgZmluZC5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgZmluZC5hZGRDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICQoJ3ZlZGEtY29udHJvbFtyZWw9XCJyZGY6dHlwZVwiXScsIHRlbXBsYXRlKS5hZGRDbGFzcygnaGFzLWVycm9yJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbmQucmVtb3ZlQXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAgIGZpbmQucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAkKCd2ZWRhLWNvbnRyb2xbcmVsPVwicmRmOnR5cGVcIl0nLCB0ZW1wbGF0ZSkucmVtb3ZlQ2xhc3MoJ2hhcy1lcnJvcicpO1xuICAgIH1cbiAgfVxuICB0eXBlSGFuZGxlcigpO1xuXG4gIGluZGl2aWR1YWwub24oJ3JkZjp0eXBlJywgdHlwZUhhbmRsZXIpO1xuICB0ZW1wbGF0ZS5vbmUoJ3JlbW92ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBpbmRpdmlkdWFsLm9mZigncmRmOnR5cGUnLCB0eXBlSGFuZGxlcik7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGh0bWwgPSBgXG4gIDxkaXY+XG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0zXCI+XG4gICAgICAgIDxlbSBhYm91dD1cInJkZjp0eXBlXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9lbT5cbiAgICAgICAgPHZlZGEtY29udHJvbFxuICAgICAgICAgIHJlbD1cInJkZjp0eXBlXCJcbiAgICAgICAgICBkYXRhLXNpbmdsZT1cInRydWVcIlxuICAgICAgICAgIGRhdGEtdHlwZT1cImxpbmtcIlxuICAgICAgICAgIGNsYXNzPVwiZnVsbHRleHQgZHJvcGRvd25cIlxuICAgICAgICAgIGRhdGEtcXVlcnktcHJlZml4PVwiJ3JkZnM6c3ViQ2xhc3NPZic9PT0ndi1zOlVzZXJTZWFyY2hhYmxlRG9jdW1lbnQnXCI+PC92ZWRhLWNvbnRyb2w+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtM1wiPlxuICAgICAgICA8ZW0gYWJvdXQ9XCJ2LWZzOlNlYXJjaEZvckNvbnRlbnRCdW5kbGVcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L2VtPlxuICAgICAgICA8dmVkYS1jb250cm9sIHByb3BlcnR5PVwidGV4dFwiIGRhdGEtdHlwZT1cInN0cmluZ1wiIHBsYWNlaG9sZGVyPVwi0JLQstC10LTQuNGC0LUg0LfQsNC/0YDQvtGBXCI+PC92ZWRhLWNvbnRyb2w+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtM1wiPlxuICAgICAgICA8ZW0gYWJvdXQ9XCJ2LXM6Y3JlYXRlZFwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvZW0+XG4gICAgICAgIDxkaXYgcHJvcGVydHk9XCJ2LXM6Y3JlYXRlZFwiPjwvZGl2PlxuICAgICAgICA8dmVkYS1jb250cm9sIGRhdGEtdHlwZT1cImRhdGVcIiBwcm9wZXJ0eT1cInYtczpjcmVhdGVkXCI+PC92ZWRhLWNvbnRyb2w+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtM1wiPlxuICAgICAgICA8ZW0gYWJvdXQ9XCJ2LXM6Y3JlYXRvclwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvZW0+XG4gICAgICAgIDxkaXYgcHJvcGVydHk9XCJ2LXM6Y3JlYXRvclwiPjwvZGl2PlxuICAgICAgICA8dmVkYS1jb250cm9sIGRhdGEtdHlwZT1cImxpbmtcIiBjbGFzcz1cImZ1bGx0ZXh0XCIgcHJvcGVydHk9XCJ2LXM6Y3JlYXRvclwiPjwvdmVkYS1jb250cm9sPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuYDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7TUFBT0EsQ0FBQyxHQUFBQyxPQUFBLENBQUFDLE9BQUE7SUFBQTtJQUFBQyxPQUFBLFdBQUFBLENBQUE7TUFBQUMsT0FBQSxTQUVLQyxJQUFJLEdBQUcsU0FBUEEsSUFBSUEsQ0FBYUMsVUFBVSxFQUFFQyxRQUFRLEVBQUVDLFNBQVMsRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUU7UUFDMUVILFFBQVEsR0FBR1AsQ0FBQyxDQUFDTyxRQUFRLENBQUM7UUFDdEJDLFNBQVMsR0FBR1IsQ0FBQyxDQUFDUSxTQUFTLENBQUM7UUFFeEIsSUFBTUcsSUFBSSxHQUFHSCxTQUFTLENBQUNJLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDRCxJQUFJLENBQUMsOEJBQThCLENBQUM7UUFFdkYsU0FBU0UsV0FBV0EsQ0FBQSxFQUFJO1VBQ3RCLElBQUksQ0FBQ1AsVUFBVSxDQUFDUSxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDcENILElBQUksQ0FBQ0ksSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUM7WUFDakNKLElBQUksQ0FBQ0ssUUFBUSxDQUFDLFVBQVUsQ0FBQztZQUN6QmhCLENBQUMsQ0FBQyw4QkFBOEIsRUFBRU8sUUFBUSxDQUFDLENBQUNTLFFBQVEsQ0FBQyxXQUFXLENBQUM7VUFDbkUsQ0FBQyxNQUFNO1lBQ0xMLElBQUksQ0FBQ00sVUFBVSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUM7WUFDdkNOLElBQUksQ0FBQ08sV0FBVyxDQUFDLFVBQVUsQ0FBQztZQUM1QmxCLENBQUMsQ0FBQyw4QkFBOEIsRUFBRU8sUUFBUSxDQUFDLENBQUNXLFdBQVcsQ0FBQyxXQUFXLENBQUM7VUFDdEU7UUFDRjtRQUNBTCxXQUFXLEVBQUU7UUFFYlAsVUFBVSxDQUFDYSxFQUFFLENBQUMsVUFBVSxFQUFFTixXQUFXLENBQUM7UUFDdENOLFFBQVEsQ0FBQ2EsR0FBRyxDQUFDLFFBQVEsRUFBRSxZQUFZO1VBQ2pDZCxVQUFVLENBQUNlLEdBQUcsQ0FBQyxVQUFVLEVBQUVSLFdBQVcsQ0FBQztRQUN6QyxDQUFDLENBQUM7TUFDSixDQUFDO01BQUFULE9BQUEsU0FFWWtCLElBQUk7SUFBQTtFQUFBO0FBQUEifQ==