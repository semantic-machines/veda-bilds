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
        if (this.isNew()) {
          $('#uri', template).prop('placeholder', this.id).change(function () {
            if (this.value) {
              individual.id = this.value;
            }
          });
        } else {
          $('#uri', template).remove();
        }
      });
      _export("html", html = "\n  <div style=\"position:relative;\">\n    <a style=\"position:absolute;top:10px;right:10px;\" href=\"#/@//v-ui:Graph\"><span class=\"glyphicon glyphicon-link\"></span></a>\n    <h3>\n      <span about=\"@\" rel=\"rdf:type\" data-template=\"v-ui:LabelTemplate\"></span><br /><small\n        ><span about=\"@\" property=\"rdfs:label\"></span> (<span property=\"@\"></span>)</small\n      >\n    </h3>\n    <input type=\"text\" id=\"uri\" class=\"form-control\" />\n    <em about=\"rdfs:label\" property=\"rdfs:label\" class=\"-view edit search\"></em>\n    <veda-control property=\"rdfs:label\" data-type=\"multilingualString\" class=\"-view edit search\"></veda-control>\n    <em about=\"rdfs:comment\" property=\"rdfs:label\" class=\"-view edit search\"></em>\n    <i property=\"rdfs:comment\" class=\"view -edit -search\"></i>\n    <veda-control property=\"rdfs:comment\" data-type=\"multilingualText\" rows=\"2\" class=\"-view edit search\"></veda-control>\n    <hr />\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInByZSIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsImlzTmV3IiwicHJvcCIsImlkIiwiY2hhbmdlIiwidmFsdWUiLCJyZW1vdmUiLCJodG1sIl0sInNvdXJjZXMiOlsiLi4vLi4vb250b2xvZ3kvZ2VuZXJpYy1mdW5jdGlvbi90ZW1wbGF0ZXMvdi11aV9Db21tb25PbnRvbG9neVRlbXBsYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmV4cG9ydCBjb25zdCBwcmUgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gIGlmICh0aGlzLmlzTmV3KCkpIHtcbiAgICAkKCcjdXJpJywgdGVtcGxhdGUpXG4gICAgICAucHJvcCgncGxhY2Vob2xkZXInLCB0aGlzLmlkKVxuICAgICAgLmNoYW5nZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgaW5kaXZpZHVhbC5pZCA9IHRoaXMudmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9IGVsc2Uge1xuICAgICQoJyN1cmknLCB0ZW1wbGF0ZSkucmVtb3ZlKCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBodG1sID0gYFxuICA8ZGl2IHN0eWxlPVwicG9zaXRpb246cmVsYXRpdmU7XCI+XG4gICAgPGEgc3R5bGU9XCJwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MTBweDtyaWdodDoxMHB4O1wiIGhyZWY9XCIjL0AvL3YtdWk6R3JhcGhcIj48c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tbGlua1wiPjwvc3Bhbj48L2E+XG4gICAgPGgzPlxuICAgICAgPHNwYW4gYWJvdXQ9XCJAXCIgcmVsPVwicmRmOnR5cGVcIiBkYXRhLXRlbXBsYXRlPVwidi11aTpMYWJlbFRlbXBsYXRlXCI+PC9zcGFuPjxiciAvPjxzbWFsbFxuICAgICAgICA+PHNwYW4gYWJvdXQ9XCJAXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9zcGFuPiAoPHNwYW4gcHJvcGVydHk9XCJAXCI+PC9zcGFuPik8L3NtYWxsXG4gICAgICA+XG4gICAgPC9oMz5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInVyaVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgLz5cbiAgICA8ZW0gYWJvdXQ9XCJyZGZzOmxhYmVsXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCIgY2xhc3M9XCItdmlldyBlZGl0IHNlYXJjaFwiPjwvZW0+XG4gICAgPHZlZGEtY29udHJvbCBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIiBkYXRhLXR5cGU9XCJtdWx0aWxpbmd1YWxTdHJpbmdcIiBjbGFzcz1cIi12aWV3IGVkaXQgc2VhcmNoXCI+PC92ZWRhLWNvbnRyb2w+XG4gICAgPGVtIGFib3V0PVwicmRmczpjb21tZW50XCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCIgY2xhc3M9XCItdmlldyBlZGl0IHNlYXJjaFwiPjwvZW0+XG4gICAgPGkgcHJvcGVydHk9XCJyZGZzOmNvbW1lbnRcIiBjbGFzcz1cInZpZXcgLWVkaXQgLXNlYXJjaFwiPjwvaT5cbiAgICA8dmVkYS1jb250cm9sIHByb3BlcnR5PVwicmRmczpjb21tZW50XCIgZGF0YS10eXBlPVwibXVsdGlsaW5ndWFsVGV4dFwiIHJvd3M9XCIyXCIgY2xhc3M9XCItdmlldyBlZGl0IHNlYXJjaFwiPjwvdmVkYS1jb250cm9sPlxuICAgIDxociAvPlxuICA8L2Rpdj5cbmA7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O01BQU9BLENBQUMsR0FBQUMsT0FBQSxDQUFBQyxPQUFBO0lBQUE7SUFBQUMsT0FBQSxXQUFBQSxDQUFBO01BQUFDLE9BQUEsUUFFS0MsR0FBRyxHQUFHLFNBQU5BLEdBQUdBLENBQWFDLFVBQVUsRUFBRUMsUUFBUSxFQUFFQyxTQUFTLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFO1FBQ3pFSCxRQUFRLEdBQUdQLENBQUMsQ0FBQ08sUUFBUSxDQUFDO1FBQ3RCQyxTQUFTLEdBQUdSLENBQUMsQ0FBQ1EsU0FBUyxDQUFDO1FBRXhCLElBQUksSUFBSSxDQUFDRyxLQUFLLEVBQUUsRUFBRTtVQUNoQlgsQ0FBQyxDQUFDLE1BQU0sRUFBRU8sUUFBUSxDQUFDLENBQ2hCSyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQ0MsRUFBRSxDQUFDLENBQzVCQyxNQUFNLENBQUMsWUFBWTtZQUNsQixJQUFJLElBQUksQ0FBQ0MsS0FBSyxFQUFFO2NBQ2RULFVBQVUsQ0FBQ08sRUFBRSxHQUFHLElBQUksQ0FBQ0UsS0FBSztZQUM1QjtVQUNGLENBQUMsQ0FBQztRQUNOLENBQUMsTUFBTTtVQUNMZixDQUFDLENBQUMsTUFBTSxFQUFFTyxRQUFRLENBQUMsQ0FBQ1MsTUFBTSxFQUFFO1FBQzlCO01BQ0YsQ0FBQztNQUFBWixPQUFBLFNBRVlhLElBQUk7SUFBQTtFQUFBO0FBQUEifQ==