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
        var loadIndicator = $('#load-indicator');
        var tabs = $('#box-tabs li[data-search]', template);
        tabs.click(function (e) {
          e.preventDefault();
          loadIndicator.show();
          var self = $(this);
          tabs.removeClass('active');
          self.addClass('active');
          individual['activeTab'] = self.data('search');
          $('.tabContainer', template).empty();
          var targetIndidivUri = self.find('a').attr('about');
          var targetIndidiv = new IndividualModel(targetIndidivUri);
          targetIndidiv.present($('.tabContainer', template), new IndividualModel('v-fs:AttributiveSearchTemplate')).then(function () {
            loadIndicator.hide();
          });
        });
        if (!individual['activeTab']) {
          individual['activeTab'] = 'fullText';
        }
        $("#box-tabs li[data-search='" + individual['activeTab'] + "']", template).click();
      });
      _export("html", html = "\n  <div class=\"container sheet\">\n    <br />\n    <ul id=\"box-tabs\" class=\"nav nav-tabs nav-right\" role=\"tablist\">\n      <li class=\"pull-left\"><h2 id=\"currentTab\" class=\"no-margin\" about=\"@\" property=\"rdfs:label\"></h2></li>\n      <li data-search=\"fullText\" role=\"presentation\" class=\"active\"><a href=\"#\" about=\"v-fs:FulltextSearch\" property=\"rdfs:label\"></a></li>\n      <li data-search=\"advanced\" role=\"presentation\"><a href=\"#\" about=\"v-fs:AdvancedSearch\" property=\"rdfs:label\"></a></li>\n      <li data-search=\"my\" role=\"presentation\"><a href=\"#\" about=\"v-fs:DocumentsSearch\" property=\"rdfs:label\"></a></li>\n    </ul>\n    <br />\n    <div class=\"tabContainer\"></div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfanNDb21tb25JbmRpdmlkdWFsX21vZGVsSnMiLCJJbmRpdmlkdWFsTW9kZWwiLCJleGVjdXRlIiwiX2V4cG9ydCIsInByZSIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsImxvYWRJbmRpY2F0b3IiLCJ0YWJzIiwiY2xpY2siLCJlIiwicHJldmVudERlZmF1bHQiLCJzaG93Iiwic2VsZiIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJkYXRhIiwiZW1wdHkiLCJ0YXJnZXRJbmRpZGl2VXJpIiwiZmluZCIsImF0dHIiLCJ0YXJnZXRJbmRpZGl2IiwicHJlc2VudCIsInRoZW4iLCJoaWRlIiwiaHRtbCJdLCJzb3VyY2VzIjpbIi4uLy4uL29udG9sb2d5L2dlbmVyaWMtZnVuY3Rpb24vdGVtcGxhdGVzL3YtZnNfTXVsdGlGdW5jdGlvbmFsU2VhcmNoVGVtcGxhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBJbmRpdmlkdWFsTW9kZWwgZnJvbSAnL2pzL2NvbW1vbi9pbmRpdmlkdWFsX21vZGVsLmpzJztcblxuZXhwb3J0IGNvbnN0IHByZSA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgY29uc3QgbG9hZEluZGljYXRvciA9ICQoJyNsb2FkLWluZGljYXRvcicpO1xuXG4gIGNvbnN0IHRhYnMgPSAkKCcjYm94LXRhYnMgbGlbZGF0YS1zZWFyY2hdJywgdGVtcGxhdGUpO1xuICB0YWJzLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxvYWRJbmRpY2F0b3Iuc2hvdygpO1xuXG4gICAgY29uc3Qgc2VsZiA9ICQodGhpcyk7XG4gICAgdGFicy5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgc2VsZi5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgaW5kaXZpZHVhbFsnYWN0aXZlVGFiJ10gPSBzZWxmLmRhdGEoJ3NlYXJjaCcpO1xuICAgICQoJy50YWJDb250YWluZXInLCB0ZW1wbGF0ZSkuZW1wdHkoKTtcblxuICAgIGNvbnN0IHRhcmdldEluZGlkaXZVcmkgPSBzZWxmLmZpbmQoJ2EnKS5hdHRyKCdhYm91dCcpO1xuICAgIGNvbnN0IHRhcmdldEluZGlkaXYgPSBuZXcgSW5kaXZpZHVhbE1vZGVsKHRhcmdldEluZGlkaXZVcmkpO1xuICAgIHRhcmdldEluZGlkaXYucHJlc2VudCgkKCcudGFiQ29udGFpbmVyJywgdGVtcGxhdGUpLCBuZXcgSW5kaXZpZHVhbE1vZGVsKCd2LWZzOkF0dHJpYnV0aXZlU2VhcmNoVGVtcGxhdGUnKSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICBsb2FkSW5kaWNhdG9yLmhpZGUoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgaWYgKCFpbmRpdmlkdWFsWydhY3RpdmVUYWInXSkge1xuICAgIGluZGl2aWR1YWxbJ2FjdGl2ZVRhYiddID0gJ2Z1bGxUZXh0JztcbiAgfVxuICAkKFwiI2JveC10YWJzIGxpW2RhdGEtc2VhcmNoPSdcIiArIGluZGl2aWR1YWxbJ2FjdGl2ZVRhYiddICsgXCInXVwiLCB0ZW1wbGF0ZSkuY2xpY2soKTtcbn07XG5cbmV4cG9ydCBjb25zdCBodG1sID0gYFxuICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyIHNoZWV0XCI+XG4gICAgPGJyIC8+XG4gICAgPHVsIGlkPVwiYm94LXRhYnNcIiBjbGFzcz1cIm5hdiBuYXYtdGFicyBuYXYtcmlnaHRcIiByb2xlPVwidGFibGlzdFwiPlxuICAgICAgPGxpIGNsYXNzPVwicHVsbC1sZWZ0XCI+PGgyIGlkPVwiY3VycmVudFRhYlwiIGNsYXNzPVwibm8tbWFyZ2luXCIgYWJvdXQ9XCJAXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9oMj48L2xpPlxuICAgICAgPGxpIGRhdGEtc2VhcmNoPVwiZnVsbFRleHRcIiByb2xlPVwicHJlc2VudGF0aW9uXCIgY2xhc3M9XCJhY3RpdmVcIj48YSBocmVmPVwiI1wiIGFib3V0PVwidi1mczpGdWxsdGV4dFNlYXJjaFwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvYT48L2xpPlxuICAgICAgPGxpIGRhdGEtc2VhcmNoPVwiYWR2YW5jZWRcIiByb2xlPVwicHJlc2VudGF0aW9uXCI+PGEgaHJlZj1cIiNcIiBhYm91dD1cInYtZnM6QWR2YW5jZWRTZWFyY2hcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L2E+PC9saT5cbiAgICAgIDxsaSBkYXRhLXNlYXJjaD1cIm15XCIgcm9sZT1cInByZXNlbnRhdGlvblwiPjxhIGhyZWY9XCIjXCIgYWJvdXQ9XCJ2LWZzOkRvY3VtZW50c1NlYXJjaFwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvYT48L2xpPlxuICAgIDwvdWw+XG4gICAgPGJyIC8+XG4gICAgPGRpdiBjbGFzcz1cInRhYkNvbnRhaW5lclwiPjwvZGl2PlxuICA8L2Rpdj5cbmA7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O01BQU9BLENBQUMsR0FBQUMsT0FBQSxDQUFBQyxPQUFBO0lBQUEsYUFBQUMsMkJBQUE7TUFDREMsZUFBZSxHQUFBRCwyQkFBQSxDQUFBRCxPQUFBO0lBQUE7SUFBQUcsT0FBQSxXQUFBQSxDQUFBO01BQUFDLE9BQUEsUUFFVEMsR0FBRyxHQUFHLFNBQU5BLEdBQUdBLENBQWFDLFVBQVUsRUFBRUMsUUFBUSxFQUFFQyxTQUFTLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFO1FBQ3pFSCxRQUFRLEdBQUdULENBQUMsQ0FBQ1MsUUFBUSxDQUFDO1FBQ3RCQyxTQUFTLEdBQUdWLENBQUMsQ0FBQ1UsU0FBUyxDQUFDO1FBRXhCLElBQU1HLGFBQWEsR0FBR2IsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO1FBRTFDLElBQU1jLElBQUksR0FBR2QsQ0FBQyxDQUFDLDJCQUEyQixFQUFFUyxRQUFRLENBQUM7UUFDckRLLElBQUksQ0FBQ0MsS0FBSyxDQUFDLFVBQVVDLENBQUMsRUFBRTtVQUN0QkEsQ0FBQyxDQUFDQyxjQUFjLEVBQUU7VUFDbEJKLGFBQWEsQ0FBQ0ssSUFBSSxFQUFFO1VBRXBCLElBQU1DLElBQUksR0FBR25CLENBQUMsQ0FBQyxJQUFJLENBQUM7VUFDcEJjLElBQUksQ0FBQ00sV0FBVyxDQUFDLFFBQVEsQ0FBQztVQUMxQkQsSUFBSSxDQUFDRSxRQUFRLENBQUMsUUFBUSxDQUFDO1VBQ3ZCYixVQUFVLENBQUMsV0FBVyxDQUFDLEdBQUdXLElBQUksQ0FBQ0csSUFBSSxDQUFDLFFBQVEsQ0FBQztVQUM3Q3RCLENBQUMsQ0FBQyxlQUFlLEVBQUVTLFFBQVEsQ0FBQyxDQUFDYyxLQUFLLEVBQUU7VUFFcEMsSUFBTUMsZ0JBQWdCLEdBQUdMLElBQUksQ0FBQ00sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUMsT0FBTyxDQUFDO1VBQ3JELElBQU1DLGFBQWEsR0FBRyxJQUFJdkIsZUFBZSxDQUFDb0IsZ0JBQWdCLENBQUM7VUFDM0RHLGFBQWEsQ0FBQ0MsT0FBTyxDQUFDNUIsQ0FBQyxDQUFDLGVBQWUsRUFBRVMsUUFBUSxDQUFDLEVBQUUsSUFBSUwsZUFBZSxDQUFDLGdDQUFnQyxDQUFDLENBQUMsQ0FBQ3lCLElBQUksQ0FBQyxZQUFZO1lBQzFIaEIsYUFBYSxDQUFDaUIsSUFBSSxFQUFFO1VBQ3RCLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQztRQUVGLElBQUksQ0FBQ3RCLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRTtVQUM1QkEsVUFBVSxDQUFDLFdBQVcsQ0FBQyxHQUFHLFVBQVU7UUFDdEM7UUFDQVIsQ0FBQyxDQUFDLDRCQUE0QixHQUFHUSxVQUFVLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxFQUFFQyxRQUFRLENBQUMsQ0FBQ00sS0FBSyxFQUFFO01BQ3BGLENBQUM7TUFBQVQsT0FBQSxTQUVZeUIsSUFBSTtJQUFBO0VBQUE7QUFBQSJ9