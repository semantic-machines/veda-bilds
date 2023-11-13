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
        var displayedDoc = container.closest('[resource]').attr('resource');
        if (individual.hasValue('v-s:from', displayedDoc)) {
          $('.link-from', template).remove();
        } else if (individual.hasValue('v-s:to', displayedDoc)) {
          $('.link-to', template).remove();
        }
        template.on('validate', function () {
          var result = {};
          if (!individual.hasValue('v-s:to')) {
            result['v-s:type'] = {
              state: individual.hasValue('v-s:type'),
              cause: ['v-ui:minCardinality']
            };
          }
          template[0].dispatchEvent(new CustomEvent('validated', {
            detail: result
          }));
        });
        function documentHandler() {
          if (individual.isNew()) {
            if (individual.hasValue('v-s:to')) {
              individual['v-s:type'] = [];
              $('veda-control[rel="v-s:type"]', template).addClass('hidden');
            } else {
              $('veda-control[rel="v-s:type"]', template).removeClass('hidden');
            }
          }
        }
        individual.on('v-s:to', documentHandler);
        individual.on('v-s:type', documentHandler);
        template.one('remove', function () {
          individual.off('v-s:to', documentHandler);
          individual.off('v-s:type', documentHandler);
        });
        documentHandler.apply(individual);
      });
      _export("html", html = "\n  <tr>\n    <td><a href=\"#/@\" class=\"glyphicon glyphicon-search view -edit -search\"></a></td>\n    <td>\n      <veda-control\n        data-type=\"link\"\n        rel=\"v-s:type\"\n        data-single=\"true\"\n        class=\"fulltext dropdown -view edit -search\"\n        data-query-prefix=\"'rdfs:subClassOf'==='v-s:UserSearchableDocument'\"></veda-control>\n      <veda-control\n        data-type=\"link\"\n        rel=\"v-s:to\"\n        class=\"-view edit search fulltext disabled\"\n        data-template=\"{@.rdf:type.rdfs:label}: {@.rdfs:label}\"\n        data-query-prefix=\"'rdf:type'=='{@.v-s:type.id}'\"></veda-control>\n      <span class=\"link-from\" about=\"@\" rel=\"v-s:from\" data-template=\"v-ui:ClassNameLabelLinkTemplate\"></span>\n      <span class=\"link-to view -edit -search\" about=\"@\" rel=\"v-s:to\" data-template=\"v-ui:ClassNameLabelLinkTemplate\"></span>\n    </td>\n    <td>\n      <span class=\"link-from\" about=\"@\" rel=\"v-s:from\"><span about=\"@\" property=\"v-s:created\"></span></span>\n      <span class=\"link-to\" about=\"@\" rel=\"v-s:to\"><span about=\"@\" property=\"v-s:created\"></span></span>\n    </td>\n    <td>\n      <div class=\"view -edit -search\" about=\"@\" property=\"rdfs:comment\"></div>\n      <veda-control data-type=\"string\" property=\"rdfs:comment\" class=\"-view edit search\"></veda-control>\n    </td>\n    <td>\n      <i><small about=\"@\" rel=\"v-s:creator\" data-template=\"v-ui:LabelTemplate\"></small> <small about=\"@\" property=\"v-s:created\"></small></i>\n    </td>\n    <td><div class=\"pull-right\" about=\"@\" data-template=\"v-ui:IconButtonsTemplate\" data-embedded=\"true\"></div></td>\n  </tr>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInByZSIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsImRpc3BsYXllZERvYyIsImNsb3Nlc3QiLCJhdHRyIiwiaGFzVmFsdWUiLCJyZW1vdmUiLCJvbiIsInJlc3VsdCIsInN0YXRlIiwiY2F1c2UiLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJkZXRhaWwiLCJkb2N1bWVudEhhbmRsZXIiLCJpc05ldyIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJvbmUiLCJvZmYiLCJhcHBseSIsImh0bWwiXSwic291cmNlcyI6WyIuLi8uLi9vbnRvbG9neS9nZW5lcmljLWZ1bmN0aW9uL3RlbXBsYXRlcy92LXNfTGlua3NMaXN0VGVtcGxhdGVfaW5saW5lLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmV4cG9ydCBjb25zdCBwcmUgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gIGNvbnN0IGRpc3BsYXllZERvYyA9IGNvbnRhaW5lci5jbG9zZXN0KCdbcmVzb3VyY2VdJykuYXR0cigncmVzb3VyY2UnKTtcbiAgaWYgKGluZGl2aWR1YWwuaGFzVmFsdWUoJ3Ytczpmcm9tJywgZGlzcGxheWVkRG9jKSkge1xuICAgICQoJy5saW5rLWZyb20nLCB0ZW1wbGF0ZSkucmVtb3ZlKCk7XG4gIH0gZWxzZSBpZiAoaW5kaXZpZHVhbC5oYXNWYWx1ZSgndi1zOnRvJywgZGlzcGxheWVkRG9jKSkge1xuICAgICQoJy5saW5rLXRvJywgdGVtcGxhdGUpLnJlbW92ZSgpO1xuICB9XG5cbiAgdGVtcGxhdGUub24oJ3ZhbGlkYXRlJywgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGlmICghaW5kaXZpZHVhbC5oYXNWYWx1ZSgndi1zOnRvJykpIHtcbiAgICAgIHJlc3VsdFsndi1zOnR5cGUnXSA9IHtcbiAgICAgICAgc3RhdGU6IGluZGl2aWR1YWwuaGFzVmFsdWUoJ3Ytczp0eXBlJyksXG4gICAgICAgIGNhdXNlOiBbJ3YtdWk6bWluQ2FyZGluYWxpdHknXSxcbiAgICAgIH07XG4gICAgfVxuICAgIHRlbXBsYXRlWzBdLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCd2YWxpZGF0ZWQnLCB7ZGV0YWlsOiByZXN1bHR9KSk7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGRvY3VtZW50SGFuZGxlciAoKSB7XG4gICAgaWYgKGluZGl2aWR1YWwuaXNOZXcoKSkge1xuICAgICAgaWYgKGluZGl2aWR1YWwuaGFzVmFsdWUoJ3Ytczp0bycpKSB7XG4gICAgICAgIGluZGl2aWR1YWxbJ3Ytczp0eXBlJ10gPSBbXTtcbiAgICAgICAgJCgndmVkYS1jb250cm9sW3JlbD1cInYtczp0eXBlXCJdJywgdGVtcGxhdGUpLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQoJ3ZlZGEtY29udHJvbFtyZWw9XCJ2LXM6dHlwZVwiXScsIHRlbXBsYXRlKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGluZGl2aWR1YWwub24oJ3Ytczp0bycsIGRvY3VtZW50SGFuZGxlcik7XG4gIGluZGl2aWR1YWwub24oJ3Ytczp0eXBlJywgZG9jdW1lbnRIYW5kbGVyKTtcbiAgdGVtcGxhdGUub25lKCdyZW1vdmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgaW5kaXZpZHVhbC5vZmYoJ3Ytczp0bycsIGRvY3VtZW50SGFuZGxlcik7XG4gICAgaW5kaXZpZHVhbC5vZmYoJ3Ytczp0eXBlJywgZG9jdW1lbnRIYW5kbGVyKTtcbiAgfSk7XG4gIGRvY3VtZW50SGFuZGxlci5hcHBseShpbmRpdmlkdWFsKTtcbn07XG5cbmV4cG9ydCBjb25zdCBodG1sID0gYFxuICA8dHI+XG4gICAgPHRkPjxhIGhyZWY9XCIjL0BcIiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tc2VhcmNoIHZpZXcgLWVkaXQgLXNlYXJjaFwiPjwvYT48L3RkPlxuICAgIDx0ZD5cbiAgICAgIDx2ZWRhLWNvbnRyb2xcbiAgICAgICAgZGF0YS10eXBlPVwibGlua1wiXG4gICAgICAgIHJlbD1cInYtczp0eXBlXCJcbiAgICAgICAgZGF0YS1zaW5nbGU9XCJ0cnVlXCJcbiAgICAgICAgY2xhc3M9XCJmdWxsdGV4dCBkcm9wZG93biAtdmlldyBlZGl0IC1zZWFyY2hcIlxuICAgICAgICBkYXRhLXF1ZXJ5LXByZWZpeD1cIidyZGZzOnN1YkNsYXNzT2YnPT09J3YtczpVc2VyU2VhcmNoYWJsZURvY3VtZW50J1wiPjwvdmVkYS1jb250cm9sPlxuICAgICAgPHZlZGEtY29udHJvbFxuICAgICAgICBkYXRhLXR5cGU9XCJsaW5rXCJcbiAgICAgICAgcmVsPVwidi1zOnRvXCJcbiAgICAgICAgY2xhc3M9XCItdmlldyBlZGl0IHNlYXJjaCBmdWxsdGV4dCBkaXNhYmxlZFwiXG4gICAgICAgIGRhdGEtdGVtcGxhdGU9XCJ7QC5yZGY6dHlwZS5yZGZzOmxhYmVsfToge0AucmRmczpsYWJlbH1cIlxuICAgICAgICBkYXRhLXF1ZXJ5LXByZWZpeD1cIidyZGY6dHlwZSc9PSd7QC52LXM6dHlwZS5pZH0nXCI+PC92ZWRhLWNvbnRyb2w+XG4gICAgICA8c3BhbiBjbGFzcz1cImxpbmstZnJvbVwiIGFib3V0PVwiQFwiIHJlbD1cInYtczpmcm9tXCIgZGF0YS10ZW1wbGF0ZT1cInYtdWk6Q2xhc3NOYW1lTGFiZWxMaW5rVGVtcGxhdGVcIj48L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImxpbmstdG8gdmlldyAtZWRpdCAtc2VhcmNoXCIgYWJvdXQ9XCJAXCIgcmVsPVwidi1zOnRvXCIgZGF0YS10ZW1wbGF0ZT1cInYtdWk6Q2xhc3NOYW1lTGFiZWxMaW5rVGVtcGxhdGVcIj48L3NwYW4+XG4gICAgPC90ZD5cbiAgICA8dGQ+XG4gICAgICA8c3BhbiBjbGFzcz1cImxpbmstZnJvbVwiIGFib3V0PVwiQFwiIHJlbD1cInYtczpmcm9tXCI+PHNwYW4gYWJvdXQ9XCJAXCIgcHJvcGVydHk9XCJ2LXM6Y3JlYXRlZFwiPjwvc3Bhbj48L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImxpbmstdG9cIiBhYm91dD1cIkBcIiByZWw9XCJ2LXM6dG9cIj48c3BhbiBhYm91dD1cIkBcIiBwcm9wZXJ0eT1cInYtczpjcmVhdGVkXCI+PC9zcGFuPjwvc3Bhbj5cbiAgICA8L3RkPlxuICAgIDx0ZD5cbiAgICAgIDxkaXYgY2xhc3M9XCJ2aWV3IC1lZGl0IC1zZWFyY2hcIiBhYm91dD1cIkBcIiBwcm9wZXJ0eT1cInJkZnM6Y29tbWVudFwiPjwvZGl2PlxuICAgICAgPHZlZGEtY29udHJvbCBkYXRhLXR5cGU9XCJzdHJpbmdcIiBwcm9wZXJ0eT1cInJkZnM6Y29tbWVudFwiIGNsYXNzPVwiLXZpZXcgZWRpdCBzZWFyY2hcIj48L3ZlZGEtY29udHJvbD5cbiAgICA8L3RkPlxuICAgIDx0ZD5cbiAgICAgIDxpPjxzbWFsbCBhYm91dD1cIkBcIiByZWw9XCJ2LXM6Y3JlYXRvclwiIGRhdGEtdGVtcGxhdGU9XCJ2LXVpOkxhYmVsVGVtcGxhdGVcIj48L3NtYWxsPiA8c21hbGwgYWJvdXQ9XCJAXCIgcHJvcGVydHk9XCJ2LXM6Y3JlYXRlZFwiPjwvc21hbGw+PC9pPlxuICAgIDwvdGQ+XG4gICAgPHRkPjxkaXYgY2xhc3M9XCJwdWxsLXJpZ2h0XCIgYWJvdXQ9XCJAXCIgZGF0YS10ZW1wbGF0ZT1cInYtdWk6SWNvbkJ1dHRvbnNUZW1wbGF0ZVwiIGRhdGEtZW1iZWRkZWQ9XCJ0cnVlXCI+PC9kaXY+PC90ZD5cbiAgPC90cj5cbmA7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O01BQU9BLENBQUMsR0FBQUMsT0FBQSxDQUFBQyxPQUFBO0lBQUE7SUFB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