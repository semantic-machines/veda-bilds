"use strict";

System.register(["jquery", "/js/common/individual_model.js"], function (_export, _context) {
  "use strict";

  var $, IndividualModel, pre, html;
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_jsCommonIndividual_modelJs) {
      IndividualModel = _jsCommonIndividual_modelJs.default;
    }],
    execute: function () {
      _export("pre", pre = function pre(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        var propСontainer = $('.properties-container', template);
        var tmpl = propСontainer.html();
        propСontainer.empty();
        var promises = Object.keys(this.properties).map(function (property_uri) {
          if (property_uri === '@' || property_uri === 'rdf:type' || property_uri === 'rdfs:label') {
            return;
          }
          var propRow = $(tmpl);
          propRow.find('.prop-name').attr({
            about: property_uri,
            property: 'rdfs:label'
          });
          var property = new IndividualModel(property_uri);
          return property.load().then(function (property) {
            var literalAttrs = {
              about: '@',
              property: property_uri
            };
            var objectAttrs = {
              'about': '@',
              'rel': property_uri,
              'data-template': 'v-ui:LabelLinkTemplate'
            };
            if (property.hasValue('rdfs:range')) {
              if (['xsd:string', 'xsd:integer', 'xsd:decimal', 'xsd:boolean', 'xsd:Literal', 'xsd:dateTime'].indexOf(property['rdfs:range'][0].id) >= 0) {
                propRow.find('.prop-value').attr(literalAttrs);
              } else {
                propRow.find('.prop-value').attr(objectAttrs);
              }
            } else {
              propRow.find('.prop-value').attr(literalAttrs);
            }
            propСontainer.append(propRow);
          });
        });
        return Promise.all(promises);
      });
      _export("html", html = "\n  <div class=\"container sheet\">\n    <div class=\"clearfix\">\n      <h2 class=\"pull-left\">\n        <span about=\"@\" rel=\"rdf:type\" data-template=\"v-ui:LabelTemplate\"></span>\n        <small about=\"@\" property=\"rdfs:label\"></small>\n        <small>(<span about=\"@\" property=\"@\"></span>)</small>\n      </h2>\n    </div>\n    <div class=\"properties-container\">\n      <hr class=\"margin-sm\" />\n      <div class=\"row\">\n        <div class=\"col-md-4 col-sm-6 text-right prop-name\"></div>\n        <div class=\"col-md-8 col-sm-6 prop-value\"></div>\n      </div>\n    </div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfanNDb21tb25JbmRpdmlkdWFsX21vZGVsSnMiLCJJbmRpdmlkdWFsTW9kZWwiLCJleGVjdXRlIiwiX2V4cG9ydCIsInByZSIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsInByb3DQoW9udGFpbmVyIiwidG1wbCIsImh0bWwiLCJlbXB0eSIsInByb21pc2VzIiwiT2JqZWN0Iiwia2V5cyIsInByb3BlcnRpZXMiLCJtYXAiLCJwcm9wZXJ0eV91cmkiLCJwcm9wUm93IiwiZmluZCIsImF0dHIiLCJhYm91dCIsInByb3BlcnR5IiwibG9hZCIsInRoZW4iLCJsaXRlcmFsQXR0cnMiLCJvYmplY3RBdHRycyIsImhhc1ZhbHVlIiwiaW5kZXhPZiIsImlkIiwiYXBwZW5kIiwiUHJvbWlzZSIsImFsbCJdLCJzb3VyY2VzIjpbIi4uLy4uL29udG9sb2d5L3N5c3RlbS1jb3JlL3RlbXBsYXRlcy92LXVpX1Jlc291cmNlVGVtcGxhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBJbmRpdmlkdWFsTW9kZWwgZnJvbSAnL2pzL2NvbW1vbi9pbmRpdmlkdWFsX21vZGVsLmpzJztcblxuZXhwb3J0IGNvbnN0IHByZSA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgY29uc3QgcHJvcNChb250YWluZXIgPSAkKCcucHJvcGVydGllcy1jb250YWluZXInLCB0ZW1wbGF0ZSk7XG4gIGNvbnN0IHRtcGwgPSBwcm9w0KFvbnRhaW5lci5odG1sKCk7XG4gIHByb3DQoW9udGFpbmVyLmVtcHR5KCk7XG4gIGNvbnN0IHByb21pc2VzID0gT2JqZWN0LmtleXModGhpcy5wcm9wZXJ0aWVzKS5tYXAoZnVuY3Rpb24gKHByb3BlcnR5X3VyaSkge1xuICAgIGlmIChwcm9wZXJ0eV91cmkgPT09ICdAJyB8fCBwcm9wZXJ0eV91cmkgPT09ICdyZGY6dHlwZScgfHwgcHJvcGVydHlfdXJpID09PSAncmRmczpsYWJlbCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgcHJvcFJvdyA9ICQodG1wbCk7XG4gICAgcHJvcFJvdy5maW5kKCcucHJvcC1uYW1lJykuYXR0cih7XG4gICAgICBhYm91dDogcHJvcGVydHlfdXJpLFxuICAgICAgcHJvcGVydHk6ICdyZGZzOmxhYmVsJyxcbiAgICB9KTtcbiAgICBjb25zdCBwcm9wZXJ0eSA9IG5ldyBJbmRpdmlkdWFsTW9kZWwocHJvcGVydHlfdXJpKTtcbiAgICByZXR1cm4gcHJvcGVydHkubG9hZCgpLnRoZW4oZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICBjb25zdCBsaXRlcmFsQXR0cnMgPSB7XG4gICAgICAgIGFib3V0OiAnQCcsXG4gICAgICAgIHByb3BlcnR5OiBwcm9wZXJ0eV91cmksXG4gICAgICB9O1xuICAgICAgY29uc3Qgb2JqZWN0QXR0cnMgPSB7XG4gICAgICAgICdhYm91dCc6ICdAJyxcbiAgICAgICAgJ3JlbCc6IHByb3BlcnR5X3VyaSxcbiAgICAgICAgJ2RhdGEtdGVtcGxhdGUnOiAndi11aTpMYWJlbExpbmtUZW1wbGF0ZScsXG4gICAgICB9O1xuICAgICAgaWYgKHByb3BlcnR5Lmhhc1ZhbHVlKCdyZGZzOnJhbmdlJykpIHtcbiAgICAgICAgaWYgKFsneHNkOnN0cmluZycsICd4c2Q6aW50ZWdlcicsICd4c2Q6ZGVjaW1hbCcsICd4c2Q6Ym9vbGVhbicsICd4c2Q6TGl0ZXJhbCcsICd4c2Q6ZGF0ZVRpbWUnXS5pbmRleE9mKHByb3BlcnR5WydyZGZzOnJhbmdlJ11bMF0uaWQpID49IDApIHtcbiAgICAgICAgICBwcm9wUm93LmZpbmQoJy5wcm9wLXZhbHVlJykuYXR0cihsaXRlcmFsQXR0cnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb3BSb3cuZmluZCgnLnByb3AtdmFsdWUnKS5hdHRyKG9iamVjdEF0dHJzKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJvcFJvdy5maW5kKCcucHJvcC12YWx1ZScpLmF0dHIobGl0ZXJhbEF0dHJzKTtcbiAgICAgIH1cbiAgICAgIHByb3DQoW9udGFpbmVyLmFwcGVuZChwcm9wUm93KTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuXG5leHBvcnQgY29uc3QgaHRtbCA9IGBcbiAgPGRpdiBjbGFzcz1cImNvbnRhaW5lciBzaGVldFwiPlxuICAgIDxkaXYgY2xhc3M9XCJjbGVhcmZpeFwiPlxuICAgICAgPGgyIGNsYXNzPVwicHVsbC1sZWZ0XCI+XG4gICAgICAgIDxzcGFuIGFib3V0PVwiQFwiIHJlbD1cInJkZjp0eXBlXCIgZGF0YS10ZW1wbGF0ZT1cInYtdWk6TGFiZWxUZW1wbGF0ZVwiPjwvc3Bhbj5cbiAgICAgICAgPHNtYWxsIGFib3V0PVwiQFwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvc21hbGw+XG4gICAgICAgIDxzbWFsbD4oPHNwYW4gYWJvdXQ9XCJAXCIgcHJvcGVydHk9XCJAXCI+PC9zcGFuPik8L3NtYWxsPlxuICAgICAgPC9oMj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwicHJvcGVydGllcy1jb250YWluZXJcIj5cbiAgICAgIDxociBjbGFzcz1cIm1hcmdpbi1zbVwiIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtNCBjb2wtc20tNiB0ZXh0LXJpZ2h0IHByb3AtbmFtZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTggY29sLXNtLTYgcHJvcC12YWx1ZVwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuYDtcbiJd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