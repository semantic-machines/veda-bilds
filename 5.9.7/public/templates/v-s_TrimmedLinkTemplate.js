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
        var re = new RegExp('.*?:');
        var label = template.text();
        template.attr('title', label);
        if (label.length > 70) {
          label = label.replace(re, function (typeName) {
            return typeName.split(' ').reduce(function (abbr, word) {
              return abbr += word.charAt(0);
            }, '').toUpperCase() + ':';
          });
          label = label.substring(0, 70) + '...';
          template.text(label);
        }
      });
      _export("html", html = "\n  <a href=\"#/@\"\n    ><span about=\"@\" rel=\"rdf:type\"><span about=\"@\" property=\"rdfs:label\"></span></span>: <span about=\"@\" property=\"rdfs:label\"></span\n  ></a>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInBvc3QiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJyZSIsIlJlZ0V4cCIsImxhYmVsIiwidGV4dCIsImF0dHIiLCJsZW5ndGgiLCJyZXBsYWNlIiwidHlwZU5hbWUiLCJzcGxpdCIsInJlZHVjZSIsImFiYnIiLCJ3b3JkIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzdWJzdHJpbmciLCJodG1sIl0sInNvdXJjZXMiOlsiLi4vLi4vb250b2xvZ3kvZ2VuZXJpYy1mdW5jdGlvbi90ZW1wbGF0ZXMvdi1zX1RyaW1tZWRMaW5rVGVtcGxhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuZXhwb3J0IGNvbnN0IHBvc3QgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gIGNvbnN0IHJlID0gbmV3IFJlZ0V4cCgnLio/OicpO1xuICBsZXQgbGFiZWwgPSB0ZW1wbGF0ZS50ZXh0KCk7XG4gIHRlbXBsYXRlLmF0dHIoJ3RpdGxlJywgbGFiZWwpO1xuICBpZiAobGFiZWwubGVuZ3RoID4gNzApIHtcbiAgICBsYWJlbCA9IGxhYmVsLnJlcGxhY2UocmUsIGZ1bmN0aW9uICh0eXBlTmFtZSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgdHlwZU5hbWVcbiAgICAgICAgICAuc3BsaXQoJyAnKVxuICAgICAgICAgIC5yZWR1Y2UoZnVuY3Rpb24gKGFiYnIsIHdvcmQpIHtcbiAgICAgICAgICAgIHJldHVybiAoYWJiciArPSB3b3JkLmNoYXJBdCgwKSk7XG4gICAgICAgICAgfSwgJycpXG4gICAgICAgICAgLnRvVXBwZXJDYXNlKCkgKyAnOidcbiAgICAgICk7XG4gICAgfSk7XG4gICAgbGFiZWwgPSBsYWJlbC5zdWJzdHJpbmcoMCwgNzApICsgJy4uLic7XG4gICAgdGVtcGxhdGUudGV4dChsYWJlbCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBodG1sID0gYFxuICA8YSBocmVmPVwiIy9AXCJcbiAgICA+PHNwYW4gYWJvdXQ9XCJAXCIgcmVsPVwicmRmOnR5cGVcIj48c3BhbiBhYm91dD1cIkBcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L3NwYW4+PC9zcGFuPjogPHNwYW4gYWJvdXQ9XCJAXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9zcGFuXG4gID48L2E+XG5gO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztNQUFPQSxDQUFDLEdBQUFDLE9BQUEsQ0FBQUMsT0FBQTtJQUFBO0lBQUFDLE9BQUEsV0FBQUEsQ0FBQTtNQUFBQyxPQUFBLFNBRUtDLElBQUksR0FBRyxTQUFQQSxJQUFJQSxDQUFhQyxVQUFVLEVBQUVDLFFBQVEsRUFBRUMsU0FBUyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRTtRQUMxRUgsUUFBUSxHQUFHUCxDQUFDLENBQUNPLFFBQVEsQ0FBQztRQUN0QkMsU0FBUyxHQUFHUixDQUFDLENBQUNRLFNBQVMsQ0FBQztRQUV4QixJQUFNRyxFQUFFLEdBQUcsSUFBSUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUM3QixJQUFJQyxLQUFLLEdBQUdOLFFBQVEsQ0FBQ08sSUFBSSxFQUFFO1FBQzNCUCxRQUFRLENBQUNRLElBQUksQ0FBQyxPQUFPLEVBQUVGLEtBQUssQ0FBQztRQUM3QixJQUFJQSxLQUFLLENBQUNHLE1BQU0sR0FBRyxFQUFFLEVBQUU7VUFDckJILEtBQUssR0FBR0EsS0FBSyxDQUFDSSxPQUFPLENBQUNOLEVBQUUsRUFBRSxVQUFVTyxRQUFRLEVBQUU7WUFDNUMsT0FDRUEsUUFBUSxDQUNMQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQ1ZDLE1BQU0sQ0FBQyxVQUFVQyxJQUFJLEVBQUVDLElBQUksRUFBRTtjQUM1QixPQUFRRCxJQUFJLElBQUlDLElBQUksQ0FBQ0MsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNoQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQ0xDLFdBQVcsRUFBRSxHQUFHLEdBQUc7VUFFMUIsQ0FBQyxDQUFDO1VBQ0ZYLEtBQUssR0FBR0EsS0FBSyxDQUFDWSxTQUFTLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEtBQUs7VUFDdENsQixRQUFRLENBQUNPLElBQUksQ0FBQ0QsS0FBSyxDQUFDO1FBQ3RCO01BQ0YsQ0FBQztNQUFBVCxPQUFBLFNBRVlzQixJQUFJO0lBQUE7RUFBQTtBQUFBIn0=