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
        if (mode != 'search' && !individual.hasValue('v-s:shelfLife') && individual.isNew()) {
          individual['v-s:shelfLife'] = [9999];
        }
        /* function shelfLifeView() {
          if (individual.hasValue("v-s:isShelfLifeAlways",false)) {
            $(".shelfLife", template).removeClass("hidden");
          }
          else { $(".shelfLife", template).addClass("hidden");}
        }
        shelfLifeView();
        individual.on("v-s:isShelfLifeAlways", shelfLifeView);
        template.one("remove", function () {
          individual.off("v-s:isShelfLifeAlways", shelfLifeView);
        });*/
      });
      _export("html", html = "\n  <div>\n    <div class=\"container sheet\">\n      <div class=\"alert alert-info -view edit -search\">\n        <span>\u041F\u043E\u043C\u043D\u0438, \u0447\u0442\u043E \u0438\u043D\u0434\u0438\u0432\u0438\u0434\u044B \u0434\u0430\u043D\u043D\u043E\u0433\u043E \u043A\u043B\u0430\u0441\u0441\u0430 \u043D\u0430\u0445\u043E\u0434\u044F\u0442\u0441\u044F \u0432 ttl.</span>\n      </div>\n      <h3 class=\"margin-sm\">\n        <span about=\"v-ui:ObjectPropertySpecification\" property=\"rdfs:label\"></span>\n        <small about=\"@\" property=\"rdfs:label\"></small>\n      </h3>\n      <section id=\"MainProperties\">\n        <h4 class=\"section-header\" about=\"v-s:MainProperties\" property=\"rdfs:label\"></h4>\n        <div class=\"section-content\">\n          <div class=\"row row-attribute\">\n            <div class=\"col-sm-3 col-xs-5\">\n              <label about=\"rdfs:label\" property=\"rdfs:label\"></label>\n            </div>\n            <div class=\"col-sm-9 col-xs-7\">\n              <div property=\"rdfs:label\" class=\"view -edit -search\"></div>\n              <veda-control data-type=\"multilingualText\" property=\"rdfs:label\" class=\"-view edit search\"></veda-control>\n            </div>\n          </div>\n          <div class=\"row row-attribute\">\n            <div class=\"col-sm-3 col-xs-5\">\n              <label about=\"v-ui:forClass\" property=\"rdfs:label\"></label>\n            </div>\n            <div class=\"col-sm-9 col-xs-7\">\n              <div rel=\"v-ui:forClass\" data-template=\"v-ui:LabelTemplate\"></div>\n              <veda-control\n                data-type=\"link\"\n                rel=\"v-ui:forClass\"\n                class=\"-view edit search fulltext dropdown\"\n                data-query-prefix=\"'rdf:type'=='owl:Class'\"\n                data-template=\"{@.rdfs:label}, {@.id}\"></veda-control>\n            </div>\n          </div>\n          <div class=\"row row-attribute\">\n            <div class=\"col-sm-3 col-xs-5\">\n              <label about=\"v-ui:forProperty\" property=\"rdfs:label\"></label>\n            </div>\n            <div class=\"col-sm-9 col-xs-7\">\n              <div rel=\"v-ui:forProperty\" data-template=\"v-ui:LabelTemplate\"></div>\n              <veda-control\n                data-type=\"link\"\n                rel=\"v-ui:forProperty\"\n                class=\"-view edit search fulltext dropdown\"\n                data-query-prefix=\"'rdf:type'=='owl:DatatypeProperty' || 'rdf:type'=='owl:ObjectProperty'\"\n                data-template=\"{@.rdfs:label}, {@.id}\"></veda-control>\n            </div>\n          </div>\n          <div class=\"row row-attribute\">\n            <div class=\"col-sm-3 col-xs-5\">\n              <label about=\"v-ui:minCardinality\" property=\"rdfs:label\"></label>\n            </div>\n            <div class=\"col-sm-3 col-xs-3\">\n              <div property=\"v-ui:minCardinality\" class=\"view -edit search\"></div>\n              <veda-control data-type=\"integer\" property=\"v-ui:minCardinality\" class=\"-view edit search\"></veda-control>\n            </div>\n          </div>\n          <div class=\"row row-attribute\">\n            <div class=\"col-sm-3 col-xs-5\">\n              <label about=\"v-ui:maxCardinality\" property=\"rdfs:label\"></label>\n            </div>\n            <div class=\"col-sm-3 col-xs-3\">\n              <div property=\"v-ui:maxCardinality\" class=\"view -edit search\"></div>\n              <veda-control data-type=\"integer\" property=\"v-ui:maxCardinality\" class=\"-view edit search\"></veda-control>\n            </div>\n          </div>\n          <div class=\"row row-attribute\">\n            <div class=\"col-sm-3 col-xs-5\">\n              <label about=\"v-ui:queryPrefix\" property=\"rdfs:label\"></label>\n            </div>\n            <div class=\"col-sm-9 col-xs-7\">\n              <div property=\"v-ui:queryPrefix\" class=\"view -edit -search\"></div>\n              <veda-control data-type=\"text\" property=\"v-ui:queryPrefix\" class=\"-view edit search\"></veda-control>\n            </div>\n          </div>\n          <div class=\"row row-attribute\">\n            <div class=\"col-sm-3 col-xs-5\">\n              <label about=\"v-ui:placeholder\" property=\"rdfs:label\"></label>\n            </div>\n            <div class=\"col-sm-9 col-xs-7\">\n              <div property=\"v-ui:placeholder\" class=\"view -edit -search\"></div>\n              <veda-control data-type=\"multilingualText\" property=\"v-ui:placeholder\" class=\"-view edit search\"></veda-control>\n            </div>\n          </div>\n        </div>\n      </section>\n\n      <hr />\n      <!--\u0421\u0438\u0441\u0442\u0435\u043C\u043D\u044B\u0435 \u0441\u0432\u043E\u0439\u0441\u0442\u0432\u0430-->\n      <div about=\"@\" data-template=\"v-ui:SystemPropertiesTemplate\" data-embedded=\"true\"></div>\n      <br />\n      <div class=\"actions view edit -search\">\n        <span about=\"@\" data-template=\"v-ui:StandardButtonsTemplate\" data-embedded=\"true\" data-buttons=\"edit save cancel delete\"></span>\n      </div>\n    </div>\n\n    <div about=\"@\" class=\"container sheet view edit -search\" data-template=\"v-s:LinksTemplate\" data-embedded=\"true\"></div>\n    <div about=\"@\" class=\"container sheet view -edit -search\" data-template=\"v-s:CommentsTemplate\"></div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInBvc3QiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJoYXNWYWx1ZSIsImlzTmV3IiwiaHRtbCJdLCJzb3VyY2VzIjpbIi4uLy4uL29udG9sb2d5L2dlbmVyaWMtYXBwbGljYXRpb24vY2xhc3NTcGVjaWZpY2F0aW9uL3RlbXBsYXRlcy92LXNfUHJvcGVydHlTcGVjaWZpY2F0aW9uVGVtcGxhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuZXhwb3J0IGNvbnN0IHBvc3QgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gIGlmIChtb2RlICE9ICdzZWFyY2gnICYmICFpbmRpdmlkdWFsLmhhc1ZhbHVlKCd2LXM6c2hlbGZMaWZlJykgJiYgaW5kaXZpZHVhbC5pc05ldygpKSB7XG4gICAgaW5kaXZpZHVhbFsndi1zOnNoZWxmTGlmZSddID0gWzk5OTldO1xuICB9XG4gIC8qIGZ1bmN0aW9uIHNoZWxmTGlmZVZpZXcoKSB7XG4gICAgaWYgKGluZGl2aWR1YWwuaGFzVmFsdWUoXCJ2LXM6aXNTaGVsZkxpZmVBbHdheXNcIixmYWxzZSkpIHtcbiAgICAgICQoXCIuc2hlbGZMaWZlXCIsIHRlbXBsYXRlKS5yZW1vdmVDbGFzcyhcImhpZGRlblwiKTtcbiAgICB9XG4gICAgZWxzZSB7ICQoXCIuc2hlbGZMaWZlXCIsIHRlbXBsYXRlKS5hZGRDbGFzcyhcImhpZGRlblwiKTt9XG4gIH1cbiAgc2hlbGZMaWZlVmlldygpO1xuICBpbmRpdmlkdWFsLm9uKFwidi1zOmlzU2hlbGZMaWZlQWx3YXlzXCIsIHNoZWxmTGlmZVZpZXcpO1xuICB0ZW1wbGF0ZS5vbmUoXCJyZW1vdmVcIiwgZnVuY3Rpb24gKCkge1xuICAgIGluZGl2aWR1YWwub2ZmKFwidi1zOmlzU2hlbGZMaWZlQWx3YXlzXCIsIHNoZWxmTGlmZVZpZXcpO1xuICB9KTsqL1xufTtcblxuZXhwb3J0IGNvbnN0IGh0bWwgPSBgXG4gIDxkaXY+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lciBzaGVldFwiPlxuICAgICAgPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LWluZm8gLXZpZXcgZWRpdCAtc2VhcmNoXCI+XG4gICAgICAgIDxzcGFuPtCf0L7QvNC90LgsINGH0YLQviDQuNC90LTQuNCy0LjQtNGLINC00LDQvdC90L7Qs9C+INC60LvQsNGB0YHQsCDQvdCw0YXQvtC00Y/RgtGB0Y8g0LIgdHRsLjwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGgzIGNsYXNzPVwibWFyZ2luLXNtXCI+XG4gICAgICAgIDxzcGFuIGFib3V0PVwidi11aTpPYmplY3RQcm9wZXJ0eVNwZWNpZmljYXRpb25cIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L3NwYW4+XG4gICAgICAgIDxzbWFsbCBhYm91dD1cIkBcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L3NtYWxsPlxuICAgICAgPC9oMz5cbiAgICAgIDxzZWN0aW9uIGlkPVwiTWFpblByb3BlcnRpZXNcIj5cbiAgICAgICAgPGg0IGNsYXNzPVwic2VjdGlvbi1oZWFkZXJcIiBhYm91dD1cInYtczpNYWluUHJvcGVydGllc1wiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvaDQ+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLWNvbnRlbnRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHJvdy1hdHRyaWJ1dGVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMyBjb2wteHMtNVwiPlxuICAgICAgICAgICAgICA8bGFiZWwgYWJvdXQ9XCJyZGZzOmxhYmVsXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9sYWJlbD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS05IGNvbC14cy03XCI+XG4gICAgICAgICAgICAgIDxkaXYgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCIgY2xhc3M9XCJ2aWV3IC1lZGl0IC1zZWFyY2hcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPHZlZGEtY29udHJvbCBkYXRhLXR5cGU9XCJtdWx0aWxpbmd1YWxUZXh0XCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCIgY2xhc3M9XCItdmlldyBlZGl0IHNlYXJjaFwiPjwvdmVkYS1jb250cm9sPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyByb3ctYXR0cmlidXRlXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTMgY29sLXhzLTVcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGFib3V0PVwidi11aTpmb3JDbGFzc1wiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvbGFiZWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tOSBjb2wteHMtN1wiPlxuICAgICAgICAgICAgICA8ZGl2IHJlbD1cInYtdWk6Zm9yQ2xhc3NcIiBkYXRhLXRlbXBsYXRlPVwidi11aTpMYWJlbFRlbXBsYXRlXCI+PC9kaXY+XG4gICAgICAgICAgICAgIDx2ZWRhLWNvbnRyb2xcbiAgICAgICAgICAgICAgICBkYXRhLXR5cGU9XCJsaW5rXCJcbiAgICAgICAgICAgICAgICByZWw9XCJ2LXVpOmZvckNsYXNzXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cIi12aWV3IGVkaXQgc2VhcmNoIGZ1bGx0ZXh0IGRyb3Bkb3duXCJcbiAgICAgICAgICAgICAgICBkYXRhLXF1ZXJ5LXByZWZpeD1cIidyZGY6dHlwZSc9PSdvd2w6Q2xhc3MnXCJcbiAgICAgICAgICAgICAgICBkYXRhLXRlbXBsYXRlPVwie0AucmRmczpsYWJlbH0sIHtALmlkfVwiPjwvdmVkYS1jb250cm9sPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyByb3ctYXR0cmlidXRlXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTMgY29sLXhzLTVcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGFib3V0PVwidi11aTpmb3JQcm9wZXJ0eVwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvbGFiZWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tOSBjb2wteHMtN1wiPlxuICAgICAgICAgICAgICA8ZGl2IHJlbD1cInYtdWk6Zm9yUHJvcGVydHlcIiBkYXRhLXRlbXBsYXRlPVwidi11aTpMYWJlbFRlbXBsYXRlXCI+PC9kaXY+XG4gICAgICAgICAgICAgIDx2ZWRhLWNvbnRyb2xcbiAgICAgICAgICAgICAgICBkYXRhLXR5cGU9XCJsaW5rXCJcbiAgICAgICAgICAgICAgICByZWw9XCJ2LXVpOmZvclByb3BlcnR5XCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cIi12aWV3IGVkaXQgc2VhcmNoIGZ1bGx0ZXh0IGRyb3Bkb3duXCJcbiAgICAgICAgICAgICAgICBkYXRhLXF1ZXJ5LXByZWZpeD1cIidyZGY6dHlwZSc9PSdvd2w6RGF0YXR5cGVQcm9wZXJ0eScgfHwgJ3JkZjp0eXBlJz09J293bDpPYmplY3RQcm9wZXJ0eSdcIlxuICAgICAgICAgICAgICAgIGRhdGEtdGVtcGxhdGU9XCJ7QC5yZGZzOmxhYmVsfSwge0AuaWR9XCI+PC92ZWRhLWNvbnRyb2w+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHJvdy1hdHRyaWJ1dGVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMyBjb2wteHMtNVwiPlxuICAgICAgICAgICAgICA8bGFiZWwgYWJvdXQ9XCJ2LXVpOm1pbkNhcmRpbmFsaXR5XCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9sYWJlbD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0zIGNvbC14cy0zXCI+XG4gICAgICAgICAgICAgIDxkaXYgcHJvcGVydHk9XCJ2LXVpOm1pbkNhcmRpbmFsaXR5XCIgY2xhc3M9XCJ2aWV3IC1lZGl0IHNlYXJjaFwiPjwvZGl2PlxuICAgICAgICAgICAgICA8dmVkYS1jb250cm9sIGRhdGEtdHlwZT1cImludGVnZXJcIiBwcm9wZXJ0eT1cInYtdWk6bWluQ2FyZGluYWxpdHlcIiBjbGFzcz1cIi12aWV3IGVkaXQgc2VhcmNoXCI+PC92ZWRhLWNvbnRyb2w+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHJvdy1hdHRyaWJ1dGVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMyBjb2wteHMtNVwiPlxuICAgICAgICAgICAgICA8bGFiZWwgYWJvdXQ9XCJ2LXVpOm1heENhcmRpbmFsaXR5XCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9sYWJlbD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0zIGNvbC14cy0zXCI+XG4gICAgICAgICAgICAgIDxkaXYgcHJvcGVydHk9XCJ2LXVpOm1heENhcmRpbmFsaXR5XCIgY2xhc3M9XCJ2aWV3IC1lZGl0IHNlYXJjaFwiPjwvZGl2PlxuICAgICAgICAgICAgICA8dmVkYS1jb250cm9sIGRhdGEtdHlwZT1cImludGVnZXJcIiBwcm9wZXJ0eT1cInYtdWk6bWF4Q2FyZGluYWxpdHlcIiBjbGFzcz1cIi12aWV3IGVkaXQgc2VhcmNoXCI+PC92ZWRhLWNvbnRyb2w+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHJvdy1hdHRyaWJ1dGVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMyBjb2wteHMtNVwiPlxuICAgICAgICAgICAgICA8bGFiZWwgYWJvdXQ9XCJ2LXVpOnF1ZXJ5UHJlZml4XCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9sYWJlbD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS05IGNvbC14cy03XCI+XG4gICAgICAgICAgICAgIDxkaXYgcHJvcGVydHk9XCJ2LXVpOnF1ZXJ5UHJlZml4XCIgY2xhc3M9XCJ2aWV3IC1lZGl0IC1zZWFyY2hcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPHZlZGEtY29udHJvbCBkYXRhLXR5cGU9XCJ0ZXh0XCIgcHJvcGVydHk9XCJ2LXVpOnF1ZXJ5UHJlZml4XCIgY2xhc3M9XCItdmlldyBlZGl0IHNlYXJjaFwiPjwvdmVkYS1jb250cm9sPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyByb3ctYXR0cmlidXRlXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTMgY29sLXhzLTVcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGFib3V0PVwidi11aTpwbGFjZWhvbGRlclwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvbGFiZWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tOSBjb2wteHMtN1wiPlxuICAgICAgICAgICAgICA8ZGl2IHByb3BlcnR5PVwidi11aTpwbGFjZWhvbGRlclwiIGNsYXNzPVwidmlldyAtZWRpdCAtc2VhcmNoXCI+PC9kaXY+XG4gICAgICAgICAgICAgIDx2ZWRhLWNvbnRyb2wgZGF0YS10eXBlPVwibXVsdGlsaW5ndWFsVGV4dFwiIHByb3BlcnR5PVwidi11aTpwbGFjZWhvbGRlclwiIGNsYXNzPVwiLXZpZXcgZWRpdCBzZWFyY2hcIj48L3ZlZGEtY29udHJvbD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgPGhyIC8+XG4gICAgICA8IS0t0KHQuNGB0YLQtdC80L3Ri9C1INGB0LLQvtC50YHRgtCy0LAtLT5cbiAgICAgIDxkaXYgYWJvdXQ9XCJAXCIgZGF0YS10ZW1wbGF0ZT1cInYtdWk6U3lzdGVtUHJvcGVydGllc1RlbXBsYXRlXCIgZGF0YS1lbWJlZGRlZD1cInRydWVcIj48L2Rpdj5cbiAgICAgIDxiciAvPlxuICAgICAgPGRpdiBjbGFzcz1cImFjdGlvbnMgdmlldyBlZGl0IC1zZWFyY2hcIj5cbiAgICAgICAgPHNwYW4gYWJvdXQ9XCJAXCIgZGF0YS10ZW1wbGF0ZT1cInYtdWk6U3RhbmRhcmRCdXR0b25zVGVtcGxhdGVcIiBkYXRhLWVtYmVkZGVkPVwidHJ1ZVwiIGRhdGEtYnV0dG9ucz1cImVkaXQgc2F2ZSBjYW5jZWwgZGVsZXRlXCI+PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGFib3V0PVwiQFwiIGNsYXNzPVwiY29udGFpbmVyIHNoZWV0IHZpZXcgZWRpdCAtc2VhcmNoXCIgZGF0YS10ZW1wbGF0ZT1cInYtczpMaW5rc1RlbXBsYXRlXCIgZGF0YS1lbWJlZGRlZD1cInRydWVcIj48L2Rpdj5cbiAgICA8ZGl2IGFib3V0PVwiQFwiIGNsYXNzPVwiY29udGFpbmVyIHNoZWV0IHZpZXcgLWVkaXQgLXNlYXJjaFwiIGRhdGEtdGVtcGxhdGU9XCJ2LXM6Q29tbWVudHNUZW1wbGF0ZVwiPjwvZGl2PlxuICA8L2Rpdj5cbmA7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O01BQU9BLENBQUMsR0FBQUMsT0FBQSxDQUFBQyxPQUFBO0lBQUE7SUFBQUMsT0FBQSxXQUFBQSxDQUFBO01BQUFDLE9BQUEsU0FFS0MsSUFBSSxHQUFHLFNBQVBBLElBQUlBLENBQWFDLFVBQVUsRUFBRUMsUUFBUSxFQUFFQyxTQUFTLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFO1FBQzFFSCxRQUFRLEdBQUdQLENBQUMsQ0FBQ08sUUFBUSxDQUFDO1FBQ3RCQyxTQUFTLEdBQUdSLENBQUMsQ0FBQ1EsU0FBUyxDQUFDO1FBRXhCLElBQUlDLElBQUksSUFBSSxRQUFRLElBQUksQ0FBQ0gsVUFBVSxDQUFDSyxRQUFRLENBQUMsZUFBZSxDQUFDLElBQUlMLFVBQVUsQ0FBQ00sS0FBSyxFQUFFLEVBQUU7VUFDbkZOLFVBQVUsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztRQUN0QztRQUNBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7TUFDQSxDQUFDO01BQUFGLE9BQUEsU0FFWVMsSUFBSTtJQUFBO0VBQUE7QUFBQSJ9