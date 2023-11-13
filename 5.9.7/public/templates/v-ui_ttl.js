"use strict";

System.register(["/js/browser/util.js", "/js/browser/dom_helpers.js", "jquery"], function (_export, _context) {
  "use strict";

  var BrowserUtil, sanitize, $, post, html;
  return {
    setters: [function (_jsBrowserUtilJs) {
      BrowserUtil = _jsBrowserUtilJs.default;
    }, function (_jsBrowserDom_helpersJs) {
      sanitize = _jsBrowserDom_helpersJs.sanitize;
    }, function (_jquery) {
      $ = _jquery.default;
    }],
    execute: function () {
      _export("post", post = function post(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        individual.on('afterReset', render);
        template.one('remove', function () {
          individual.off('afterReset', render);
        });
        render();
        function render() {
          var list = [individual];
          BrowserUtil.toTTL(list, function (error, ttl) {
            var pre = $('pre', template);
            var sanitized = sanitize(ttl);
            var anchored = sanitized.replace(/([a-zA-Z][\w-]*:[\w-]*)(\,|\s|\;|\.)/gi, "<a class='text-black' href='#/$1//v-ui:ttl'>$1</a>$2");
            pre.html(anchored);
          });
        }
      });
      _export("html", html = "\n  <div class=\"container sheet\">\n    <pre style=\"border:none;background-color:#fff;\"></pre>\n    <div class=\"actions pull-left\">\n      <span about=\"@\" data-template=\"v-ui:StandardButtonsTemplate\" data-embedded=\"true\" data-buttons=\"delete destroy journal task rights\"></span>\n    </div>\n    <div class=\"pull-right\">\n      <a id=\"default\" class=\"btn btn-info\" href=\"#/@\" about=\"v-s:Default\" property=\"rdfs:label\"></a>\n      <a id=\"generic\" class=\"btn btn-default\" href=\"#/@//v-ui:generic\">generic</a>\n      <a id=\"json\" class=\"btn btn-default\" href=\"#/@//v-ui:json\">json</a>\n      <a id=\"ttl\" class=\"disabled btn btn-default\" href=\"#/@//v-ui:ttl\">ttl</a>\n    </div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJCcm93c2VyVXRpbCIsIl9qc0Jyb3dzZXJVdGlsSnMiLCJkZWZhdWx0IiwiX2pzQnJvd3NlckRvbV9oZWxwZXJzSnMiLCJzYW5pdGl6ZSIsIl9qcXVlcnkiLCIkIiwiZXhlY3V0ZSIsIl9leHBvcnQiLCJwb3N0IiwiaW5kaXZpZHVhbCIsInRlbXBsYXRlIiwiY29udGFpbmVyIiwibW9kZSIsImV4dHJhIiwib24iLCJyZW5kZXIiLCJvbmUiLCJvZmYiLCJsaXN0IiwidG9UVEwiLCJlcnJvciIsInR0bCIsInByZSIsInNhbml0aXplZCIsImFuY2hvcmVkIiwicmVwbGFjZSIsImh0bWwiXSwic291cmNlcyI6WyIuLi8uLi9vbnRvbG9neS9zeXN0ZW0tY29yZS90ZW1wbGF0ZXMvdi11aV90dGwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJyb3dzZXJVdGlsIGZyb20gJy9qcy9icm93c2VyL3V0aWwuanMnO1xuaW1wb3J0IHtzYW5pdGl6ZX0gZnJvbSAnL2pzL2Jyb3dzZXIvZG9tX2hlbHBlcnMuanMnO1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuZXhwb3J0IGNvbnN0IHBvc3QgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gIGluZGl2aWR1YWwub24oJ2FmdGVyUmVzZXQnLCByZW5kZXIpO1xuICB0ZW1wbGF0ZS5vbmUoJ3JlbW92ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBpbmRpdmlkdWFsLm9mZignYWZ0ZXJSZXNldCcsIHJlbmRlcik7XG4gIH0pO1xuICByZW5kZXIoKTtcblxuICBmdW5jdGlvbiByZW5kZXIgKCkge1xuICAgIGNvbnN0IGxpc3QgPSBbaW5kaXZpZHVhbF07XG4gICAgQnJvd3NlclV0aWwudG9UVEwobGlzdCwgZnVuY3Rpb24gKGVycm9yLCB0dGwpIHtcbiAgICAgIGNvbnN0IHByZSA9ICQoJ3ByZScsIHRlbXBsYXRlKTtcbiAgICAgIGNvbnN0IHNhbml0aXplZCA9IHNhbml0aXplKHR0bCk7XG4gICAgICBjb25zdCBhbmNob3JlZCA9IHNhbml0aXplZC5yZXBsYWNlKC8oW2EtekEtWl1bXFx3LV0qOltcXHctXSopKFxcLHxcXHN8XFw7fFxcLikvZ2ksIFwiPGEgY2xhc3M9J3RleHQtYmxhY2snIGhyZWY9JyMvJDEvL3YtdWk6dHRsJz4kMTwvYT4kMlwiKTtcbiAgICAgIHByZS5odG1sKGFuY2hvcmVkKTtcbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGh0bWwgPSBgXG4gIDxkaXYgY2xhc3M9XCJjb250YWluZXIgc2hlZXRcIj5cbiAgICA8cHJlIHN0eWxlPVwiYm9yZGVyOm5vbmU7YmFja2dyb3VuZC1jb2xvcjojZmZmO1wiPjwvcHJlPlxuICAgIDxkaXYgY2xhc3M9XCJhY3Rpb25zIHB1bGwtbGVmdFwiPlxuICAgICAgPHNwYW4gYWJvdXQ9XCJAXCIgZGF0YS10ZW1wbGF0ZT1cInYtdWk6U3RhbmRhcmRCdXR0b25zVGVtcGxhdGVcIiBkYXRhLWVtYmVkZGVkPVwidHJ1ZVwiIGRhdGEtYnV0dG9ucz1cImRlbGV0ZSBkZXN0cm95IGpvdXJuYWwgdGFzayByaWdodHNcIj48L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInB1bGwtcmlnaHRcIj5cbiAgICAgIDxhIGlkPVwiZGVmYXVsdFwiIGNsYXNzPVwiYnRuIGJ0bi1pbmZvXCIgaHJlZj1cIiMvQFwiIGFib3V0PVwidi1zOkRlZmF1bHRcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L2E+XG4gICAgICA8YSBpZD1cImdlbmVyaWNcIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIGhyZWY9XCIjL0AvL3YtdWk6Z2VuZXJpY1wiPmdlbmVyaWM8L2E+XG4gICAgICA8YSBpZD1cImpzb25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIGhyZWY9XCIjL0AvL3YtdWk6anNvblwiPmpzb248L2E+XG4gICAgICA8YSBpZD1cInR0bFwiIGNsYXNzPVwiZGlzYWJsZWQgYnRuIGJ0bi1kZWZhdWx0XCIgaHJlZj1cIiMvQC8vdi11aTp0dGxcIj50dGw8L2E+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuYDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7TUFBT0EsV0FBVyxHQUFBQyxnQkFBQSxDQUFBQyxPQUFBO0lBQUEsYUFBQUMsdUJBQUE7TUFDVkMsUUFBUSxHQUFBRCx1QkFBQSxDQUFSQyxRQUFRO0lBQUEsYUFBQUMsT0FBQTtNQUNUQyxDQUFDLEdBQUFELE9BQUEsQ0FBQUgsT0FBQTtJQUFBO0lBQUFLLE9BQUEsV0FBQUEsQ0FBQTtNQUFBQyxPQUFBLFNBRUtDLElBQUksR0FBRyxTQUFQQSxJQUFJQSxDQUFhQyxVQUFVLEVBQUVDLFFBQVEsRUFBRUMsU0FBUyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRTtRQUMxRUgsUUFBUSxHQUFHTCxDQUFDLENBQUNLLFFBQVEsQ0FBQztRQUN0QkMsU0FBUyxHQUFHTixDQUFDLENBQUNNLFNBQVMsQ0FBQztRQUV4QkYsVUFBVSxDQUFDSyxFQUFFLENBQUMsWUFBWSxFQUFFQyxNQUFNLENBQUM7UUFDbkNMLFFBQVEsQ0FBQ00sR0FBRyxDQUFDLFFBQVEsRUFBRSxZQUFZO1VBQ2pDUCxVQUFVLENBQUNRLEdBQUcsQ0FBQyxZQUFZLEVBQUVGLE1BQU0sQ0FBQztRQUN0QyxDQUFDLENBQUM7UUFDRkEsTUFBTSxFQUFFO1FBRVIsU0FBU0EsTUFBTUEsQ0FBQSxFQUFJO1VBQ2pCLElBQU1HLElBQUksR0FBRyxDQUFDVCxVQUFVLENBQUM7VUFDekJWLFdBQVcsQ0FBQ29CLEtBQUssQ0FBQ0QsSUFBSSxFQUFFLFVBQVVFLEtBQUssRUFBRUMsR0FBRyxFQUFFO1lBQzVDLElBQU1DLEdBQUcsR0FBR2pCLENBQUMsQ0FBQyxLQUFLLEVBQUVLLFFBQVEsQ0FBQztZQUM5QixJQUFNYSxTQUFTLEdBQUdwQixRQUFRLENBQUNrQixHQUFHLENBQUM7WUFDL0IsSUFBTUcsUUFBUSxHQUFHRCxTQUFTLENBQUNFLE9BQU8sQ0FBQyx3Q0FBd0MsRUFBRSxzREFBc0QsQ0FBQztZQUNwSUgsR0FBRyxDQUFDSSxJQUFJLENBQUNGLFFBQVEsQ0FBQztVQUNwQixDQUFDLENBQUM7UUFDSjtNQUNGLENBQUM7TUFBQWpCLE9BQUEsU0FFWW1CLElBQUk7SUFBQTtFQUFBO0FBQUEifQ==