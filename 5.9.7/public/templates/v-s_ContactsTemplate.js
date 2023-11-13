"use strict";

System.register(["jquery", "/js/common/veda.js", "/js/common/individual_model.js"], function (_export, _context) {
  "use strict";

  var $, veda, IndividualModel, pre, html;
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_jsCommonVedaJs) {
      veda = _jsCommonVedaJs.default;
    }, function (_jsCommonIndividual_modelJs) {
      IndividualModel = _jsCommonIndividual_modelJs.default;
    }],
    execute: function () {
      _export("pre", pre = function pre(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        var loadIndicator = $('#load-indicator');
        var tabs = $('#box-tabs li[data-type]', template);
        tabs.click(function (e) {
          e.preventDefault();
          loadIndicator.show();
          var self = $(this);
          tabs.removeClass('active');
          self.addClass('active');
          individual['activeTab'] = self.data('type');
          $('.tabContainer', template).empty();
          if (individual['activeTab'] == 'search') {
            return new IndividualModel('v-s:Contacts').present($('.tabContainer', template), 'v-s:ContactsStructureTemplate', undefined, extra).then(function () {
              loadIndicator.hide();
            });
          } else if (individual['activeTab'] == 'my') {
            return veda.user.aspect.present($('.tabContainer', template), 'v-s:FavoriteContactTemplate').then(function () {
              loadIndicator.hide();
            });
          } else if (individual['activeTab'] == 'spec') {
            return veda.user.aspect.present($('.tabContainer', template), 'v-s:SpecialCallsContactTemplate').then(function () {
              loadIndicator.hide();
            });
          }
        });
        if (!individual['activeTab']) {
          individual['activeTab'] = 'search';
        }
        $("#box-tabs li[data-type='" + individual['activeTab'] + "']", template).click();
      });
      _export("html", html = "\n  <div class=\"container-fluid sheet\">\n    <br />\n    <ul id=\"box-tabs\" class=\"nav nav-tabs nav-right\" role=\"tablist\">\n      <li class=\"pull-left\"><h2 id=\"currentTab\" class=\"no-margin\" about=\"@\" property=\"rdfs:label\"></h2></li>\n      <li data-type=\"my\" role=\"presentation\"><a href=\"#\" about=\"v-ft:MyBundle\" property=\"rdfs:label\"></a></li>\n      <li data-type=\"spec\" role=\"presentation\"><a href=\"#\" about=\"v-s:SpecialCallsBundle\" property=\"rdfs:label\"></a></li>\n      <li data-type=\"search\" role=\"presentation\" class=\"active\"><a href=\"#\" about=\"v-s:AllContactsBundle\" property=\"rdfs:label\"></a></li>\n    </ul>\n    <br />\n    <div class=\"tabContainer\"></div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfanNDb21tb25WZWRhSnMiLCJ2ZWRhIiwiX2pzQ29tbW9uSW5kaXZpZHVhbF9tb2RlbEpzIiwiSW5kaXZpZHVhbE1vZGVsIiwiZXhlY3V0ZSIsIl9leHBvcnQiLCJwcmUiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJsb2FkSW5kaWNhdG9yIiwidGFicyIsImNsaWNrIiwiZSIsInByZXZlbnREZWZhdWx0Iiwic2hvdyIsInNlbGYiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwiZGF0YSIsImVtcHR5IiwicHJlc2VudCIsInVuZGVmaW5lZCIsInRoZW4iLCJoaWRlIiwidXNlciIsImFzcGVjdCIsImh0bWwiXSwic291cmNlcyI6WyIuLi8uLi9vbnRvbG9neS9nZW5lcmljLWZ1bmN0aW9uL3RlbXBsYXRlcy92LXNfQ29udGFjdHNUZW1wbGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHZlZGEgZnJvbSAnL2pzL2NvbW1vbi92ZWRhLmpzJztcbmltcG9ydCBJbmRpdmlkdWFsTW9kZWwgZnJvbSAnL2pzL2NvbW1vbi9pbmRpdmlkdWFsX21vZGVsLmpzJztcblxuZXhwb3J0IGNvbnN0IHByZSA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgY29uc3QgbG9hZEluZGljYXRvciA9ICQoJyNsb2FkLWluZGljYXRvcicpO1xuICBjb25zdCB0YWJzID0gJCgnI2JveC10YWJzIGxpW2RhdGEtdHlwZV0nLCB0ZW1wbGF0ZSk7XG4gIHRhYnMuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgbG9hZEluZGljYXRvci5zaG93KCk7XG5cbiAgICBjb25zdCBzZWxmID0gJCh0aGlzKTtcbiAgICB0YWJzLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICBzZWxmLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICBpbmRpdmlkdWFsWydhY3RpdmVUYWInXSA9IHNlbGYuZGF0YSgndHlwZScpO1xuICAgICQoJy50YWJDb250YWluZXInLCB0ZW1wbGF0ZSkuZW1wdHkoKTtcbiAgICBpZiAoaW5kaXZpZHVhbFsnYWN0aXZlVGFiJ10gPT0gJ3NlYXJjaCcpIHtcbiAgICAgIHJldHVybiBuZXcgSW5kaXZpZHVhbE1vZGVsKCd2LXM6Q29udGFjdHMnKS5wcmVzZW50KCQoJy50YWJDb250YWluZXInLCB0ZW1wbGF0ZSksICd2LXM6Q29udGFjdHNTdHJ1Y3R1cmVUZW1wbGF0ZScsIHVuZGVmaW5lZCwgZXh0cmEpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICBsb2FkSW5kaWNhdG9yLmhpZGUoKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoaW5kaXZpZHVhbFsnYWN0aXZlVGFiJ10gPT0gJ215Jykge1xuICAgICAgcmV0dXJuIHZlZGEudXNlci5hc3BlY3QucHJlc2VudCgkKCcudGFiQ29udGFpbmVyJywgdGVtcGxhdGUpLCAndi1zOkZhdm9yaXRlQ29udGFjdFRlbXBsYXRlJykudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvYWRJbmRpY2F0b3IuaGlkZSgpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChpbmRpdmlkdWFsWydhY3RpdmVUYWInXSA9PSAnc3BlYycpIHtcbiAgICAgIHJldHVybiB2ZWRhLnVzZXIuYXNwZWN0LnByZXNlbnQoJCgnLnRhYkNvbnRhaW5lcicsIHRlbXBsYXRlKSwgJ3YtczpTcGVjaWFsQ2FsbHNDb250YWN0VGVtcGxhdGUnKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbG9hZEluZGljYXRvci5oaWRlKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuXG4gIGlmICghaW5kaXZpZHVhbFsnYWN0aXZlVGFiJ10pIHtcbiAgICBpbmRpdmlkdWFsWydhY3RpdmVUYWInXSA9ICdzZWFyY2gnO1xuICB9XG4gICQoXCIjYm94LXRhYnMgbGlbZGF0YS10eXBlPSdcIiArIGluZGl2aWR1YWxbJ2FjdGl2ZVRhYiddICsgXCInXVwiLCB0ZW1wbGF0ZSkuY2xpY2soKTtcbn07XG5cbmV4cG9ydCBjb25zdCBodG1sID0gYFxuICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyLWZsdWlkIHNoZWV0XCI+XG4gICAgPGJyIC8+XG4gICAgPHVsIGlkPVwiYm94LXRhYnNcIiBjbGFzcz1cIm5hdiBuYXYtdGFicyBuYXYtcmlnaHRcIiByb2xlPVwidGFibGlzdFwiPlxuICAgICAgPGxpIGNsYXNzPVwicHVsbC1sZWZ0XCI+PGgyIGlkPVwiY3VycmVudFRhYlwiIGNsYXNzPVwibm8tbWFyZ2luXCIgYWJvdXQ9XCJAXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9oMj48L2xpPlxuICAgICAgPGxpIGRhdGEtdHlwZT1cIm15XCIgcm9sZT1cInByZXNlbnRhdGlvblwiPjxhIGhyZWY9XCIjXCIgYWJvdXQ9XCJ2LWZ0Ok15QnVuZGxlXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9hPjwvbGk+XG4gICAgICA8bGkgZGF0YS10eXBlPVwic3BlY1wiIHJvbGU9XCJwcmVzZW50YXRpb25cIj48YSBocmVmPVwiI1wiIGFib3V0PVwidi1zOlNwZWNpYWxDYWxsc0J1bmRsZVwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvYT48L2xpPlxuICAgICAgPGxpIGRhdGEtdHlwZT1cInNlYXJjaFwiIHJvbGU9XCJwcmVzZW50YXRpb25cIiBjbGFzcz1cImFjdGl2ZVwiPjxhIGhyZWY9XCIjXCIgYWJvdXQ9XCJ2LXM6QWxsQ29udGFjdHNCdW5kbGVcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L2E+PC9saT5cbiAgICA8L3VsPlxuICAgIDxiciAvPlxuICAgIDxkaXYgY2xhc3M9XCJ0YWJDb250YWluZXJcIj48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