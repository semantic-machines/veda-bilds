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
        var isMutual = container.attr('data-mutual') === 'true';
        $('#add-link', template).click(function () {
          $('.links-table', template).removeClass('hidden');
          var cntr = $("[rel='v-s:hasLink']", template);
          var Link = new IndividualModel();
          Link['rdf:type'] = 'v-s:Link';
          Link['v-s:from'] = individual;
          if (isMutual) {
            Link['v-s:mutualMembership'] = [true];
          }
          Link.present(cntr, 'v-s:LinksListTemplate_inline', 'edit').then(function (newRow) {
            newRow = $(newRow);
            Link.one('beforeReset', function () {
              newRow.remove();
            });
            Link.one('afterSave', function () {
              newRow.remove();
            });
            if (individual.isNew()) {
              newRow.find('.action#save').hide();
            }
          });
        });
        individual.on('afterSave', saveHandler);
        template.one('remove', function () {
          individual.off('afterSave', saveHandler);
        });
        function saveHandler() {
          var children = $("[rel='v-s:hasLink']", template).children();
          children.each(function () {
            var link_template = $(this);
            var link_uri = link_template.attr('resource');
            var link = new IndividualModel(link_uri);
            this['v-s:type'] = [];
            link.save();
            link_template[0].dispatchEvent(new Event('view'));
          });
        }
        individual.on('v-s:hasLink', linksHandler);
        template.one('remove', function () {
          individual.off('v-s:hasLink', linksHandler);
        });
        linksHandler();
        function linksHandler() {
          if (individual.hasValue('v-s:hasLink')) {
            $('.links-table', template).removeClass('hidden');
          } else {
            $('.links-table', template).addClass('hidden');
          }
        }
      });
      _export("html", html = "\n  <div>\n    <table class=\"hidden links-table table table-condensed table-striped table-sortable\">\n      <thead>\n        <tr>\n          <th width=\"1%\"><span class=\"glyphicon glyphicon-search\"></span></th>\n          <th width=\"45%\" about=\"v-s:Document\" property=\"rdfs:label\"></th>\n          <th width=\"10%\" about=\"v-s:created\" property=\"rdfs:label\"></th>\n          <th width=\"20%\" about=\"rdfs:comment\" property=\"rdfs:label\"></th>\n          <th width=\"15%\" about=\"v-s:creator\" property=\"rdfs:label\"></th>\n          <th width=\"9%\"></th>\n        </tr>\n      </thead>\n      <tbody about=\"@\" rel=\"v-s:hasLink\" data-embedded=\"true\" data-limit=\"5\" data-more=\"true\" data-template=\"v-s:LinksListTemplate_inline\"></tbody>\n    </table>\n    <button class=\"margin-sm btn btn-success\" id=\"add-link\" about=\"v-s:AddLink\" property=\"rdfs:label\"></button>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfanNDb21tb25JbmRpdmlkdWFsX21vZGVsSnMiLCJJbmRpdmlkdWFsTW9kZWwiLCJleGVjdXRlIiwiX2V4cG9ydCIsInByZSIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsImlzTXV0dWFsIiwiYXR0ciIsImNsaWNrIiwicmVtb3ZlQ2xhc3MiLCJjbnRyIiwiTGluayIsInByZXNlbnQiLCJ0aGVuIiwibmV3Um93Iiwib25lIiwicmVtb3ZlIiwiaXNOZXciLCJmaW5kIiwiaGlkZSIsIm9uIiwic2F2ZUhhbmRsZXIiLCJvZmYiLCJjaGlsZHJlbiIsImVhY2giLCJsaW5rX3RlbXBsYXRlIiwibGlua191cmkiLCJsaW5rIiwic2F2ZSIsImRpc3BhdGNoRXZlbnQiLCJFdmVudCIsImxpbmtzSGFuZGxlciIsImhhc1ZhbHVlIiwiYWRkQ2xhc3MiLCJodG1sIl0sInNvdXJjZXMiOlsiLi4vLi4vb250b2xvZ3kvZ2VuZXJpYy1mdW5jdGlvbi90ZW1wbGF0ZXMvdi1zX0xpbmtzTGlzdFRlbXBsYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgSW5kaXZpZHVhbE1vZGVsIGZyb20gJy9qcy9jb21tb24vaW5kaXZpZHVhbF9tb2RlbC5qcyc7XG5cbmV4cG9ydCBjb25zdCBwcmUgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gIGNvbnN0IGlzTXV0dWFsID0gY29udGFpbmVyLmF0dHIoJ2RhdGEtbXV0dWFsJykgPT09ICd0cnVlJztcblxuICAkKCcjYWRkLWxpbmsnLCB0ZW1wbGF0ZSkuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICQoJy5saW5rcy10YWJsZScsIHRlbXBsYXRlKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgY29uc3QgY250ciA9ICQoXCJbcmVsPSd2LXM6aGFzTGluayddXCIsIHRlbXBsYXRlKTtcbiAgICBjb25zdCBMaW5rID0gbmV3IEluZGl2aWR1YWxNb2RlbCgpO1xuICAgIExpbmtbJ3JkZjp0eXBlJ10gPSAndi1zOkxpbmsnXG4gICAgTGlua1sndi1zOmZyb20nXSA9IGluZGl2aWR1YWw7XG5cbiAgICBpZiAoaXNNdXR1YWwpIHtcbiAgICAgIExpbmtbJ3YtczptdXR1YWxNZW1iZXJzaGlwJ10gPSBbdHJ1ZV07XG4gICAgfVxuICAgIExpbmsucHJlc2VudChjbnRyLCAndi1zOkxpbmtzTGlzdFRlbXBsYXRlX2lubGluZScsICdlZGl0JykudGhlbihmdW5jdGlvbiAobmV3Um93KSB7XG4gICAgICBuZXdSb3cgPSAkKG5ld1Jvdyk7XG4gICAgICBMaW5rLm9uZSgnYmVmb3JlUmVzZXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG5ld1Jvdy5yZW1vdmUoKTtcbiAgICAgIH0pO1xuICAgICAgTGluay5vbmUoJ2FmdGVyU2F2ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbmV3Um93LnJlbW92ZSgpO1xuICAgICAgfSk7XG4gICAgICBpZiAoaW5kaXZpZHVhbC5pc05ldygpKSB7XG4gICAgICAgIG5ld1Jvdy5maW5kKCcuYWN0aW9uI3NhdmUnKS5oaWRlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIGluZGl2aWR1YWwub24oJ2FmdGVyU2F2ZScsIHNhdmVIYW5kbGVyKTtcbiAgdGVtcGxhdGUub25lKCdyZW1vdmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgaW5kaXZpZHVhbC5vZmYoJ2FmdGVyU2F2ZScsIHNhdmVIYW5kbGVyKTtcbiAgfSk7XG4gIGZ1bmN0aW9uIHNhdmVIYW5kbGVyICgpIHtcbiAgICBjb25zdCBjaGlsZHJlbiA9ICQoXCJbcmVsPSd2LXM6aGFzTGluayddXCIsIHRlbXBsYXRlKS5jaGlsZHJlbigpO1xuICAgIGNoaWxkcmVuLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgbGlua190ZW1wbGF0ZSA9ICQodGhpcyk7XG4gICAgICBjb25zdCBsaW5rX3VyaSA9IGxpbmtfdGVtcGxhdGUuYXR0cigncmVzb3VyY2UnKTtcbiAgICAgIGNvbnN0IGxpbmsgPSBuZXcgSW5kaXZpZHVhbE1vZGVsKGxpbmtfdXJpKTtcbiAgICAgIHRoaXNbJ3Ytczp0eXBlJ10gPSBbXTtcbiAgICAgIGxpbmsuc2F2ZSgpO1xuICAgICAgbGlua190ZW1wbGF0ZVswXS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgndmlldycpKTtcbiAgICB9KTtcbiAgfVxuICBpbmRpdmlkdWFsLm9uKCd2LXM6aGFzTGluaycsIGxpbmtzSGFuZGxlcik7XG4gIHRlbXBsYXRlLm9uZSgncmVtb3ZlJywgZnVuY3Rpb24gKCkge1xuICAgIGluZGl2aWR1YWwub2ZmKCd2LXM6aGFzTGluaycsIGxpbmtzSGFuZGxlcik7XG4gIH0pO1xuICBsaW5rc0hhbmRsZXIoKTtcbiAgZnVuY3Rpb24gbGlua3NIYW5kbGVyICgpIHtcbiAgICBpZiAoaW5kaXZpZHVhbC5oYXNWYWx1ZSgndi1zOmhhc0xpbmsnKSkge1xuICAgICAgJCgnLmxpbmtzLXRhYmxlJywgdGVtcGxhdGUpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCgnLmxpbmtzLXRhYmxlJywgdGVtcGxhdGUpLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBodG1sID0gYFxuICA8ZGl2PlxuICAgIDx0YWJsZSBjbGFzcz1cImhpZGRlbiBsaW5rcy10YWJsZSB0YWJsZSB0YWJsZS1jb25kZW5zZWQgdGFibGUtc3RyaXBlZCB0YWJsZS1zb3J0YWJsZVwiPlxuICAgICAgPHRoZWFkPlxuICAgICAgICA8dHI+XG4gICAgICAgICAgPHRoIHdpZHRoPVwiMSVcIj48c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tc2VhcmNoXCI+PC9zcGFuPjwvdGg+XG4gICAgICAgICAgPHRoIHdpZHRoPVwiNDUlXCIgYWJvdXQ9XCJ2LXM6RG9jdW1lbnRcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L3RoPlxuICAgICAgICAgIDx0aCB3aWR0aD1cIjEwJVwiIGFib3V0PVwidi1zOmNyZWF0ZWRcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L3RoPlxuICAgICAgICAgIDx0aCB3aWR0aD1cIjIwJVwiIGFib3V0PVwicmRmczpjb21tZW50XCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC90aD5cbiAgICAgICAgICA8dGggd2lkdGg9XCIxNSVcIiBhYm91dD1cInYtczpjcmVhdG9yXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC90aD5cbiAgICAgICAgICA8dGggd2lkdGg9XCI5JVwiPjwvdGg+XG4gICAgICAgIDwvdHI+XG4gICAgICA8L3RoZWFkPlxuICAgICAgPHRib2R5IGFib3V0PVwiQFwiIHJlbD1cInYtczpoYXNMaW5rXCIgZGF0YS1lbWJlZGRlZD1cInRydWVcIiBkYXRhLWxpbWl0PVwiNVwiIGRhdGEtbW9yZT1cInRydWVcIiBkYXRhLXRlbXBsYXRlPVwidi1zOkxpbmtzTGlzdFRlbXBsYXRlX2lubGluZVwiPjwvdGJvZHk+XG4gICAgPC90YWJsZT5cbiAgICA8YnV0dG9uIGNsYXNzPVwibWFyZ2luLXNtIGJ0biBidG4tc3VjY2Vzc1wiIGlkPVwiYWRkLWxpbmtcIiBhYm91dD1cInYtczpBZGRMaW5rXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9idXR0b24+XG4gIDwvZGl2PlxuYDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7TUFBT0EsQ0FBQyxHQUFBQyxPQUFBLENBQUFDLE9BQUE7SUFBQSxhQUFBQywyQkFBQTtNQUNEQyxlQUFlLEdBQUFELDJCQUFBLENBQUFELE9BQUE7SUFBQTtJQUFBRyxPQUFBLFdBQUFBLENBQUE7TUFBQUMsT0FBQSxRQUVUQyxHQUFHLEdBQUcsU0FBTkEsR0FBR0EsQ0FB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