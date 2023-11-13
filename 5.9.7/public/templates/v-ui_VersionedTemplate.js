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
        var actual = individual.hasValue('v-s:actualVersion') ? individual['v-s:actualVersion'][0] : individual;
        var tmpl = '' + '<tr>' + '<td>#</td>' + '<td about="@" data-template="v-ui:LabelLinkTemplate" class="view edit -search"></td>' + '<td about="@" property="v-s:created" class="view edit -search"></td>' + '<td about="@" rel="v-s:creator" data-template="v-ui:LabelTemplate" class="view edit -search"></td>' + '</tr>';
        var tbody = $('#versions', template);
        var btn = $('button', template).click(function () {
          tbody.empty();
          renderVersion(actual, 1, -1);
        });
        renderVersion(actual, 1, 5);
        individual.on('v-s:previousVersion', versionHandler);
        template.one('remove', function () {
          individual.off('v-s:previousVersion', versionHandler);
        });
        function versionHandler() {
          tbody.empty();
          renderVersion(actual, 1, 5);
        }
        function renderVersion(current, counter, limit) {
          if (!current) {
            return btn.remove();
          }
          if (!limit) {
            return;
          }
          return current.load().then(function (current) {
            var previous = current['v-s:previousVersion'][0];
            var row = tmpl.replace('#', counter);
            if (current.id === actual.id) {
              row = row.replace('<tr>', "<tr class='info'>");
            }
            if (current.id === individual.id) {
              row = row.replace(/td/g, 'th').replace('v-ui:LabelLinkTemplate', 'v-ui:LabelTemplate');
            }
            return current.present(tbody, row).then(function () {
              renderVersion(previous, ++counter, --limit);
            });
          });
        }
      });
      _export("html", html = "\n  <div>\n    <h3 about=\"v-ui:VersionedTemplate\" property=\"rdfs:comment\"></h3>\n    <div class=\"panel panel-default\">\n      <table class=\"table table-condensed\">\n        <thead>\n          <tr class=\"active\">\n            <th width=\"1%\">#</th>\n            <th about=\"rdfs:label\" property=\"rdfs:label\"></th>\n            <th about=\"v-s:created\" property=\"rdfs:label\"></th>\n            <th about=\"v-s:creator\" property=\"rdfs:label\"></th>\n          </tr>\n        </thead>\n        <tbody id=\"versions\"></tbody>\n        <tfoot>\n          <tr>\n            <td colspan=\"10\" class=\"clearfix\">\n              <button class=\"pull-left btn btn-xs btn-primary glyphicon glyphicon-chevron-down\"></button>\n              <div class=\"pull-right\">\n                <span class=\"bg-info\" style=\"padding:0px 5px;display: inline-block\">\u0410\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F</span>\n                <strong>\u0422\u0435\u043A\u0443\u0449\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F</strong>\n              </div>\n            </td>\n          </tr>\n        </tfoot>\n      </table>\n    </div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInBvc3QiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJhY3R1YWwiLCJoYXNWYWx1ZSIsInRtcGwiLCJ0Ym9keSIsImJ0biIsImNsaWNrIiwiZW1wdHkiLCJyZW5kZXJWZXJzaW9uIiwib24iLCJ2ZXJzaW9uSGFuZGxlciIsIm9uZSIsIm9mZiIsImN1cnJlbnQiLCJjb3VudGVyIiwibGltaXQiLCJyZW1vdmUiLCJsb2FkIiwidGhlbiIsInByZXZpb3VzIiwicm93IiwicmVwbGFjZSIsImlkIiwicHJlc2VudCIsImh0bWwiXSwic291cmNlcyI6WyIuLi8uLi9vbnRvbG9neS9zeXN0ZW0tY29yZS90ZW1wbGF0ZXMvdi11aV9WZXJzaW9uZWRUZW1wbGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG5leHBvcnQgY29uc3QgcG9zdCA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgY29uc3QgYWN0dWFsID0gaW5kaXZpZHVhbC5oYXNWYWx1ZSgndi1zOmFjdHVhbFZlcnNpb24nKSA/IGluZGl2aWR1YWxbJ3YtczphY3R1YWxWZXJzaW9uJ11bMF0gOiBpbmRpdmlkdWFsO1xuICBjb25zdCB0bXBsID1cbiAgICAnJyArXG4gICAgJzx0cj4nICtcbiAgICAnPHRkPiM8L3RkPicgK1xuICAgICc8dGQgYWJvdXQ9XCJAXCIgZGF0YS10ZW1wbGF0ZT1cInYtdWk6TGFiZWxMaW5rVGVtcGxhdGVcIiBjbGFzcz1cInZpZXcgZWRpdCAtc2VhcmNoXCI+PC90ZD4nICtcbiAgICAnPHRkIGFib3V0PVwiQFwiIHByb3BlcnR5PVwidi1zOmNyZWF0ZWRcIiBjbGFzcz1cInZpZXcgZWRpdCAtc2VhcmNoXCI+PC90ZD4nICtcbiAgICAnPHRkIGFib3V0PVwiQFwiIHJlbD1cInYtczpjcmVhdG9yXCIgZGF0YS10ZW1wbGF0ZT1cInYtdWk6TGFiZWxUZW1wbGF0ZVwiIGNsYXNzPVwidmlldyBlZGl0IC1zZWFyY2hcIj48L3RkPicgK1xuICAgICc8L3RyPic7XG4gIGNvbnN0IHRib2R5ID0gJCgnI3ZlcnNpb25zJywgdGVtcGxhdGUpO1xuICBjb25zdCBidG4gPSAkKCdidXR0b24nLCB0ZW1wbGF0ZSkuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIHRib2R5LmVtcHR5KCk7XG4gICAgcmVuZGVyVmVyc2lvbihhY3R1YWwsIDEsIC0xKTtcbiAgfSk7XG4gIHJlbmRlclZlcnNpb24oYWN0dWFsLCAxLCA1KTtcblxuICBpbmRpdmlkdWFsLm9uKCd2LXM6cHJldmlvdXNWZXJzaW9uJywgdmVyc2lvbkhhbmRsZXIpO1xuICB0ZW1wbGF0ZS5vbmUoJ3JlbW92ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBpbmRpdmlkdWFsLm9mZigndi1zOnByZXZpb3VzVmVyc2lvbicsIHZlcnNpb25IYW5kbGVyKTtcbiAgfSk7XG4gIGZ1bmN0aW9uIHZlcnNpb25IYW5kbGVyICgpIHtcbiAgICB0Ym9keS5lbXB0eSgpO1xuICAgIHJlbmRlclZlcnNpb24oYWN0dWFsLCAxLCA1KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlclZlcnNpb24gKGN1cnJlbnQsIGNvdW50ZXIsIGxpbWl0KSB7XG4gICAgaWYgKCFjdXJyZW50KSB7XG4gICAgICByZXR1cm4gYnRuLnJlbW92ZSgpO1xuICAgIH1cbiAgICBpZiAoIWxpbWl0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50LmxvYWQoKS50aGVuKGZ1bmN0aW9uIChjdXJyZW50KSB7XG4gICAgICBjb25zdCBwcmV2aW91cyA9IGN1cnJlbnRbJ3YtczpwcmV2aW91c1ZlcnNpb24nXVswXTtcbiAgICAgIGxldCByb3cgPSB0bXBsLnJlcGxhY2UoJyMnLCBjb3VudGVyKTtcbiAgICAgIGlmIChjdXJyZW50LmlkID09PSBhY3R1YWwuaWQpIHtcbiAgICAgICAgcm93ID0gcm93LnJlcGxhY2UoJzx0cj4nLCBcIjx0ciBjbGFzcz0naW5mbyc+XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnQuaWQgPT09IGluZGl2aWR1YWwuaWQpIHtcbiAgICAgICAgcm93ID0gcm93LnJlcGxhY2UoL3RkL2csICd0aCcpLnJlcGxhY2UoJ3YtdWk6TGFiZWxMaW5rVGVtcGxhdGUnLCAndi11aTpMYWJlbFRlbXBsYXRlJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY3VycmVudC5wcmVzZW50KHRib2R5LCByb3cpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICByZW5kZXJWZXJzaW9uKHByZXZpb3VzLCArK2NvdW50ZXIsIC0tbGltaXQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBodG1sID0gYFxuICA8ZGl2PlxuICAgIDxoMyBhYm91dD1cInYtdWk6VmVyc2lvbmVkVGVtcGxhdGVcIiBwcm9wZXJ0eT1cInJkZnM6Y29tbWVudFwiPjwvaDM+XG4gICAgPGRpdiBjbGFzcz1cInBhbmVsIHBhbmVsLWRlZmF1bHRcIj5cbiAgICAgIDx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLWNvbmRlbnNlZFwiPlxuICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgPHRyIGNsYXNzPVwiYWN0aXZlXCI+XG4gICAgICAgICAgICA8dGggd2lkdGg9XCIxJVwiPiM8L3RoPlxuICAgICAgICAgICAgPHRoIGFib3V0PVwicmRmczpsYWJlbFwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvdGg+XG4gICAgICAgICAgICA8dGggYWJvdXQ9XCJ2LXM6Y3JlYXRlZFwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvdGg+XG4gICAgICAgICAgICA8dGggYWJvdXQ9XCJ2LXM6Y3JlYXRvclwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvdGg+XG4gICAgICAgICAgPC90cj5cbiAgICAgICAgPC90aGVhZD5cbiAgICAgICAgPHRib2R5IGlkPVwidmVyc2lvbnNcIj48L3Rib2R5PlxuICAgICAgICA8dGZvb3Q+XG4gICAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRkIGNvbHNwYW49XCIxMFwiIGNsYXNzPVwiY2xlYXJmaXhcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInB1bGwtbGVmdCBidG4gYnRuLXhzIGJ0bi1wcmltYXJ5IGdseXBoaWNvbiBnbHlwaGljb24tY2hldnJvbi1kb3duXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwdWxsLXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJiZy1pbmZvXCIgc3R5bGU9XCJwYWRkaW5nOjBweCA1cHg7ZGlzcGxheTogaW5saW5lLWJsb2NrXCI+0JDQutGC0YPQsNC70YzQvdCw0Y8g0LLQtdGA0YHQuNGPPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzdHJvbmc+0KLQtdC60YPRidCw0Y8g0LLQtdGA0YHQuNGPPC9zdHJvbmc+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICA8L3RyPlxuICAgICAgICA8L3Rmb290PlxuICAgICAgPC90YWJsZT5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5gO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztNQUFPQSxDQUFDLEdBQUFDLE9BQUEsQ0FBQUMsT0FBQTtJQUFBO0lBQUFDLE9BQUEsV0FBQUEsQ0FBQTtNQUFBQyxPQUFBLFNBRUtDLElBQUksR0FBRyxTQUFQQSxJQUFJQSxDQUFhQyxVQUFVLEVBQUVDLFFBQVEsRUFBRUMsU0FBUyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRTtRQUMxRUgsUUFBUSxHQUFHUCxDQUFDLENBQUNPLFFBQVEsQ0FBQztRQUN0QkMsU0FBUyxHQUFHUixDQUFDLENBQUNRLFNB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