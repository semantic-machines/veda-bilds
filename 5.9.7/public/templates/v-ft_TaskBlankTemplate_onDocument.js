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
        function documentHandler() {
          if (this.hasValue('rdfs:label') && !this.hasValue('rdf:type')) {
            $('veda-control[rel="rdf:type"]', template).addClass('has-error');
            $('.search-button, .more-results, .all-results').attr('disabled', 'disabled');
          } else {
            $('veda-control[rel="rdf:type"]', template).removeClass('has-error');
            $('.search-button, .more-results, .all-results').removeAttr('disabled');
          }
        }
        individual.on('propertyModified', documentHandler);
        template.one('remove', function () {
          individual.off('propertyModified', documentHandler);
        });
        documentHandler.call(this);
      });
      _export("html", html = "\n  <div class=\"row\">\n    <div class=\"col-md-6\">\n      <em about=\"v-ft:DocumentTypeBundle\" property=\"rdfs:label\"></em>\n      <veda-control\n        rel=\"rdf:type\"\n        data-type=\"link\"\n        class=\"dropdown fulltext\"\n        data-single=\"true\"\n        data-placeholder=\" \"\n        data-query-prefix=\"'rdfs:subClassOf'==='v-s:UserSearchableDocument'\"></veda-control>\n    </div>\n    <div class=\"col-md-6\">\n      <em about=\"v-ft:DocumentBundle\" property=\"rdfs:label\"></em>\n      <veda-control property=\"rdfs:label\" data-type=\"string\"></veda-control>\n    </div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInBvc3QiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJkb2N1bWVudEhhbmRsZXIiLCJoYXNWYWx1ZSIsImFkZENsYXNzIiwiYXR0ciIsInJlbW92ZUNsYXNzIiwicmVtb3ZlQXR0ciIsIm9uIiwib25lIiwib2ZmIiwiY2FsbCIsImh0bWwiXSwic291cmNlcyI6WyIuLi8uLi9vbnRvbG9neS9nZW5lcmljLWZ1bmN0aW9uL3RlbXBsYXRlcy92LWZ0X1Rhc2tCbGFua1RlbXBsYXRlX29uRG9jdW1lbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuZXhwb3J0IGNvbnN0IHBvc3QgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gIGZ1bmN0aW9uIGRvY3VtZW50SGFuZGxlciAoKSB7XG4gICAgaWYgKHRoaXMuaGFzVmFsdWUoJ3JkZnM6bGFiZWwnKSAmJiAhdGhpcy5oYXNWYWx1ZSgncmRmOnR5cGUnKSkge1xuICAgICAgJCgndmVkYS1jb250cm9sW3JlbD1cInJkZjp0eXBlXCJdJywgdGVtcGxhdGUpLmFkZENsYXNzKCdoYXMtZXJyb3InKTtcbiAgICAgICQoJy5zZWFyY2gtYnV0dG9uLCAubW9yZS1yZXN1bHRzLCAuYWxsLXJlc3VsdHMnKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKCd2ZWRhLWNvbnRyb2xbcmVsPVwicmRmOnR5cGVcIl0nLCB0ZW1wbGF0ZSkucmVtb3ZlQ2xhc3MoJ2hhcy1lcnJvcicpO1xuICAgICAgJCgnLnNlYXJjaC1idXR0b24sIC5tb3JlLXJlc3VsdHMsIC5hbGwtcmVzdWx0cycpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG4gICAgfVxuICB9XG4gIGluZGl2aWR1YWwub24oJ3Byb3BlcnR5TW9kaWZpZWQnLCBkb2N1bWVudEhhbmRsZXIpO1xuICB0ZW1wbGF0ZS5vbmUoJ3JlbW92ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBpbmRpdmlkdWFsLm9mZigncHJvcGVydHlNb2RpZmllZCcsIGRvY3VtZW50SGFuZGxlcik7XG4gIH0pO1xuICBkb2N1bWVudEhhbmRsZXIuY2FsbCh0aGlzKTtcbn07XG5cbmV4cG9ydCBjb25zdCBodG1sID0gYFxuICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgPGRpdiBjbGFzcz1cImNvbC1tZC02XCI+XG4gICAgICA8ZW0gYWJvdXQ9XCJ2LWZ0OkRvY3VtZW50VHlwZUJ1bmRsZVwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvZW0+XG4gICAgICA8dmVkYS1jb250cm9sXG4gICAgICAgIHJlbD1cInJkZjp0eXBlXCJcbiAgICAgICAgZGF0YS10eXBlPVwibGlua1wiXG4gICAgICAgIGNsYXNzPVwiZHJvcGRvd24gZnVsbHRleHRcIlxuICAgICAgICBkYXRhLXNpbmdsZT1cInRydWVcIlxuICAgICAgICBkYXRhLXBsYWNlaG9sZGVyPVwiIFwiXG4gICAgICAgIGRhdGEtcXVlcnktcHJlZml4PVwiJ3JkZnM6c3ViQ2xhc3NPZic9PT0ndi1zOlVzZXJTZWFyY2hhYmxlRG9jdW1lbnQnXCI+PC92ZWRhLWNvbnRyb2w+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNvbC1tZC02XCI+XG4gICAgICA8ZW0gYWJvdXQ9XCJ2LWZ0OkRvY3VtZW50QnVuZGxlXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9lbT5cbiAgICAgIDx2ZWRhLWNvbnRyb2wgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCIgZGF0YS10eXBlPVwic3RyaW5nXCI+PC92ZWRhLWNvbnRyb2w+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuYDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7TUFBT0EsQ0FBQyxHQUFBQyxPQUFBLENBQUFDLE9BQUE7SUFBQTtJQUFBQyxPQUFBLFdBQUFBLENBQUE7TUFBQUMsT0FBQSxTQUVLQyxJQUFJLEdBQUcsU0FBUEEsSUFBSUEsQ0FBYUMsVUFBVSxFQUFFQyxRQUFRLEVBQUVDLFNBQVMsRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUU7UUFDMUVILFFBQVEsR0FBR1AsQ0FBQyxDQUFDTyxRQUFRLENBQUM7UUFDdEJDLFNBQVMsR0FBR1IsQ0FBQyxDQUFDUSxTQUFTLENBQUM7UUFFeEIsU0FBU0csZUFBZUEsQ0FBQSxFQUFJO1VBQzFCLElBQUksSUFBSSxDQUFDQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUNBLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUM3RFosQ0FBQyxDQUFDLDhCQUE4QixFQUFFTyxRQUFRLENBQUMsQ0FBQ00sUUFBUSxDQUFDLFdBQVcsQ0FBQztZQUNqRWIsQ0FBQyxDQUFDLDZDQUE2QyxDQUFDLENBQUNjLElBQUksQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDO1VBQy9FLENBQUMsTUFBTTtZQUNMZCxDQUFDLENBQUMsOEJBQThCLEVBQUVPLFFBQVEsQ0FBQyxDQUFDUSxXQUFXLENBQUMsV0FBVyxDQUFDO1lBQ3BFZixDQUFDLENBQUMsNkNBQTZDLENBQUMsQ0FBQ2dCLFVBQVUsQ0FBQyxVQUFVLENBQUM7VUFDekU7UUFDRjtRQUNBVixVQUFVLENBQUNXLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRU4sZUFBZSxDQUFDO1FBQ2xESixRQUFRLENBQUNXLEdBQUcsQ0FBQyxRQUFRLEVBQUUsWUFBWTtVQUNqQ1osVUFBVSxDQUFDYSxHQUFHLENBQUMsa0JBQWtCLEVBQUVSLGVBQWUsQ0FBQztRQUNyRCxDQUFDLENBQUM7UUFDRkEsZUFBZSxDQUFDUyxJQUFJLENBQUMsSUFBSSxDQUFDO01BQzVCLENBQUM7TUFBQWhCLE9BQUEsU0FFWWlCLElBQUk7SUFBQTtFQUFBO0FBQUEifQ==