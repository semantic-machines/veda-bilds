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
        function searchHandler() {
          var queryString = null;
          if (individual.hasValue('rdfs:label')) {
            queryString = "('*'=='" + individual['rdfs:label'][0] + "')";
          }
          if (individual.hasValue('v-s:created')) {
            var dates = individual['v-s:created'];
            var start = new Date(dates[0]);
            var end = new Date(dates[dates.length - 1]);
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);
            var createdPart = "('v-s:created'==[" + start.toISOString() + ',' + end.toISOString() + '])';
            queryString = queryString == null ? createdPart : queryString + ' && ' + createdPart;
          }
          if (individual.hasValue('v-fs:requiredClass')) {
            var typePart = individual['v-fs:requiredClass'].map(function (type) {
              return "('rdf:type'==='" + type.id + "')";
            }).join(' || ');
            typePart = '(' + typePart + ')';
            queryString = queryString == null ? typePart : queryString + ' && ' + typePart;
          } else if (queryString != null) {
            queryString = queryString + " && ('rdf:type'=='v-s:Document')";
          }
          if (queryString != null) {
            individual.set('*', [queryString]);
          } else {
            delete individual.properties['*'];
          }
        }
        individual.on('rdfs:label', searchHandler);
        individual.on('v-fs:requiredClass', searchHandler);
        individual.on('v-s:created', searchHandler);
        template.one('remove', function () {
          individual.off('rdfs:label', searchHandler);
          individual.off('v-fs:requiredClass', searchHandler);
          individual.off('v-s:created', searchHandler);
        });
      });
      _export("html", html = "\n  <div>\n    <div class=\"row\">\n      <div class=\"col-md-4\">\n        <em about=\"v-fs:SearchForContentBundle\" property=\"rdfs:label\"></em>\n        <veda-control property=\"rdfs:label\" data-type=\"string\" placeholder=\"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\"></veda-control>\n      </div>\n      <div class=\"col-md-4\">\n        <em about=\"v-fs:requiredClass\" property=\"rdfs:label\"></em>\n        <div rel=\"v-fs:requiredClass\" data-template=\"v-ui:LabelTemplate\"></div>\n        <veda-control\n          rel=\"v-fs:requiredClass\"\n          data-type=\"link\"\n          class=\"fulltext dropdown\"\n          data-query-prefix=\"'rdfs:subClassOf'==='v-s:UserSearchableDocument'\"></veda-control>\n      </div>\n      <div class=\"col-md-4\">\n        <em about=\"v-s:created\" property=\"rdfs:label\"></em>\n        <div property=\"v-s:created\"></div>\n        <veda-control data-type=\"date\" property=\"v-s:created\"></veda-control>\n      </div>\n    </div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInBvc3QiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJzZWFyY2hIYW5kbGVyIiwicXVlcnlTdHJpbmciLCJoYXNWYWx1ZSIsImRhdGVzIiwic3RhcnQiLCJEYXRlIiwiZW5kIiwibGVuZ3RoIiwic2V0SG91cnMiLCJjcmVhdGVkUGFydCIsInRvSVNPU3RyaW5nIiwidHlwZVBhcnQiLCJtYXAiLCJ0eXBlIiwiaWQiLCJqb2luIiwic2V0IiwicHJvcGVydGllcyIsIm9uIiwib25lIiwib2ZmIiwiaHRtbCJdLCJzb3VyY2VzIjpbIi4uLy4uL29udG9sb2d5L2dlbmVyaWMtZnVuY3Rpb24vdGVtcGxhdGVzL3YtZnNfRG9jdW1lbnRzU2VhcmNoQmxhbmtUZW1wbGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG5leHBvcnQgY29uc3QgcG9zdCA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgZnVuY3Rpb24gc2VhcmNoSGFuZGxlciAoKSB7XG4gICAgbGV0IHF1ZXJ5U3RyaW5nID0gbnVsbDtcbiAgICBpZiAoaW5kaXZpZHVhbC5oYXNWYWx1ZSgncmRmczpsYWJlbCcpKSB7XG4gICAgICBxdWVyeVN0cmluZyA9IFwiKCcqJz09J1wiICsgaW5kaXZpZHVhbFsncmRmczpsYWJlbCddWzBdICsgXCInKVwiO1xuICAgIH1cbiAgICBpZiAoaW5kaXZpZHVhbC5oYXNWYWx1ZSgndi1zOmNyZWF0ZWQnKSkge1xuICAgICAgY29uc3QgZGF0ZXMgPSBpbmRpdmlkdWFsWyd2LXM6Y3JlYXRlZCddO1xuICAgICAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZShkYXRlc1swXSk7XG4gICAgICBjb25zdCBlbmQgPSBuZXcgRGF0ZShkYXRlc1tkYXRlcy5sZW5ndGggLSAxXSk7XG4gICAgICBzdGFydC5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgIGVuZC5zZXRIb3VycygyMywgNTksIDU5LCA5OTkpO1xuICAgICAgY29uc3QgY3JlYXRlZFBhcnQgPSBcIigndi1zOmNyZWF0ZWQnPT1bXCIgKyBzdGFydC50b0lTT1N0cmluZygpICsgJywnICsgZW5kLnRvSVNPU3RyaW5nKCkgKyAnXSknO1xuXG4gICAgICBxdWVyeVN0cmluZyA9IHF1ZXJ5U3RyaW5nID09IG51bGwgPyBjcmVhdGVkUGFydCA6IHF1ZXJ5U3RyaW5nICsgJyAmJiAnICsgY3JlYXRlZFBhcnQ7XG4gICAgfVxuXG4gICAgaWYgKGluZGl2aWR1YWwuaGFzVmFsdWUoJ3YtZnM6cmVxdWlyZWRDbGFzcycpKSB7XG4gICAgICBsZXQgdHlwZVBhcnQgPSBpbmRpdmlkdWFsWyd2LWZzOnJlcXVpcmVkQ2xhc3MnXVxuICAgICAgICAubWFwKGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgICAgcmV0dXJuIFwiKCdyZGY6dHlwZSc9PT0nXCIgKyB0eXBlLmlkICsgXCInKVwiO1xuICAgICAgICB9KVxuICAgICAgICAuam9pbignIHx8ICcpO1xuICAgICAgdHlwZVBhcnQgPSAnKCcgKyB0eXBlUGFydCArICcpJztcblxuICAgICAgcXVlcnlTdHJpbmcgPSBxdWVyeVN0cmluZyA9PSBudWxsID8gdHlwZVBhcnQgOiBxdWVyeVN0cmluZyArICcgJiYgJyArIHR5cGVQYXJ0O1xuICAgIH0gZWxzZSBpZiAocXVlcnlTdHJpbmcgIT0gbnVsbCkge1xuICAgICAgcXVlcnlTdHJpbmcgPSBxdWVyeVN0cmluZyArIFwiICYmICgncmRmOnR5cGUnPT0ndi1zOkRvY3VtZW50JylcIjtcbiAgICB9XG5cbiAgICBpZiAocXVlcnlTdHJpbmcgIT0gbnVsbCkge1xuICAgICAgaW5kaXZpZHVhbC5zZXQoJyonLCBbcXVlcnlTdHJpbmddKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIGluZGl2aWR1YWwucHJvcGVydGllc1snKiddO1xuICAgIH1cbiAgfVxuXG4gIGluZGl2aWR1YWwub24oJ3JkZnM6bGFiZWwnLCBzZWFyY2hIYW5kbGVyKTtcbiAgaW5kaXZpZHVhbC5vbigndi1mczpyZXF1aXJlZENsYXNzJywgc2VhcmNoSGFuZGxlcik7XG4gIGluZGl2aWR1YWwub24oJ3YtczpjcmVhdGVkJywgc2VhcmNoSGFuZGxlcik7XG4gIHRlbXBsYXRlLm9uZSgncmVtb3ZlJywgZnVuY3Rpb24gKCkge1xuICAgIGluZGl2aWR1YWwub2ZmKCdyZGZzOmxhYmVsJywgc2VhcmNoSGFuZGxlcik7XG4gICAgaW5kaXZpZHVhbC5vZmYoJ3YtZnM6cmVxdWlyZWRDbGFzcycsIHNlYXJjaEhhbmRsZXIpO1xuICAgIGluZGl2aWR1YWwub2ZmKCd2LXM6Y3JlYXRlZCcsIHNlYXJjaEhhbmRsZXIpO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBodG1sID0gYFxuICA8ZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtNFwiPlxuICAgICAgICA8ZW0gYWJvdXQ9XCJ2LWZzOlNlYXJjaEZvckNvbnRlbnRCdW5kbGVcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L2VtPlxuICAgICAgICA8dmVkYS1jb250cm9sIHByb3BlcnR5PVwicmRmczpsYWJlbFwiIGRhdGEtdHlwZT1cInN0cmluZ1wiIHBsYWNlaG9sZGVyPVwi0JLQstC10LTQuNGC0LUg0LfQsNC/0YDQvtGBXCI+PC92ZWRhLWNvbnRyb2w+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtNFwiPlxuICAgICAgICA8ZW0gYWJvdXQ9XCJ2LWZzOnJlcXVpcmVkQ2xhc3NcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L2VtPlxuICAgICAgICA8ZGl2IHJlbD1cInYtZnM6cmVxdWlyZWRDbGFzc1wiIGRhdGEtdGVtcGxhdGU9XCJ2LXVpOkxhYmVsVGVtcGxhdGVcIj48L2Rpdj5cbiAgICAgICAgPHZlZGEtY29udHJvbFxuICAgICAgICAgIHJlbD1cInYtZnM6cmVxdWlyZWRDbGFzc1wiXG4gICAgICAgICAgZGF0YS10eXBlPVwibGlua1wiXG4gICAgICAgICAgY2xhc3M9XCJmdWxsdGV4dCBkcm9wZG93blwiXG4gICAgICAgICAgZGF0YS1xdWVyeS1wcmVmaXg9XCIncmRmczpzdWJDbGFzc09mJz09PSd2LXM6VXNlclNlYXJjaGFibGVEb2N1bWVudCdcIj48L3ZlZGEtY29udHJvbD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC00XCI+XG4gICAgICAgIDxlbSBhYm91dD1cInYtczpjcmVhdGVkXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9lbT5cbiAgICAgICAgPGRpdiBwcm9wZXJ0eT1cInYtczpjcmVhdGVkXCI+PC9kaXY+XG4gICAgICAgIDx2ZWRhLWNvbnRyb2wgZGF0YS10eXBlPVwiZGF0ZVwiIHByb3BlcnR5PVwidi1zOmNyZWF0ZWRcIj48L3ZlZGEtY29udHJvbD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbmA7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O01BQU9BLENBQUMsR0FBQUMsT0FBQSxDQUFBQyxPQUFBO0lBQUE7SUFBQUMsT0FBQSxXQUFBQSxDQUFBO01BQUFDLE9BQUEsU0FFS0MsSUFBSSxHQUFHLFNBQVBBLElBQUlBLENBQWFDLFVBQVUsRUFBRUMsUUFBUSxFQUFFQyxTQUFTLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFO1FBQzFFSCxRQUFRLEdBQUdQLENBQUMsQ0FBQ08sUUFBUSxDQUFDO1FBQ3RCQyxTQUFTLEdBQUdSLENBQUMsQ0FBQ1EsU0FBUyxDQUFDO1FBRXhCLFNBQVNHLGFBQWFBLENBQUEsRUFBSTtVQUN4QixJQUFJQyxXQUFXLEdBQUcsSUFBSTtVQUN0QixJQUFJTixVQUFVLENBQUNPLFFBQVEs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