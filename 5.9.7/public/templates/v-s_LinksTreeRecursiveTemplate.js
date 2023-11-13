"use strict";

System.register(["/js/browser/util.js", "jquery", "/js/common/veda.js", "/js/common/backend.js", "/js/common/individual_model.js"], function (_export, _context) {
  "use strict";

  var BrowserUtil, $, veda, Backend, IndividualModel, pre, html;
  return {
    setters: [function (_jsBrowserUtilJs) {
      BrowserUtil = _jsBrowserUtilJs.default;
    }, function (_jquery) {
      $ = _jquery.default;
    }, function (_jsCommonVedaJs) {
      veda = _jsCommonVedaJs.default;
    }, function (_jsCommonBackendJs) {
      Backend = _jsCommonBackendJs.default;
    }, function (_jsCommonIndividual_modelJs) {
      IndividualModel = _jsCommonIndividual_modelJs.default;
    }],
    execute: function () {
      _export("pre", pre = function pre(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        function presentTypeLink(link, typeLinksContainer) {
          return link.load().then(function (link) {
            if (link.hasValue('rdf:type', 'v-s:Link')) {
              if (link.hasValue('v-s:from', individual) && link.hasValue('v-s:to')) {
                link = link['v-s:to'][0];
              } else if (link.hasValue('v-s:to', individual) && link.hasValue('v-s:from')) {
                link = link['v-s:from'][0];
              }
            }
            if (!template.closest(".link-node[resource='" + BrowserUtil.escape4$(link.id) + "']").length) {
              return link.present(typeLinksContainer, 'v-s:LinksTreeRecursiveTemplate');
            }
          });
        }
        function getOutTypeLinks(allowedTypeUri, outPropertiesUris) {
          var links = [];
          outPropertiesUris.forEach(function (outPropertyUri) {
            links = links.concat(individual[outPropertyUri]);
          });
          var linksPromises = links.map(function (link) {
            return link.load();
          });
          return Promise.all(linksPromises).then(function (loadedLinks) {
            return loadedLinks.filter(function (link) {
              var linkTypeUri = link['rdf:type'][0].id;
              return linkTypeUri === allowedTypeUri;
            });
          });
        }
        function getInTypeLinks(allowedTypeUri, inPropertiesUris) {
          var allowedTypeUriQuery = "'rdf:type'==='" + allowedTypeUri + "'";
          var inPropertiesUrisQuery = inPropertiesUris.map(function (inPropertyUri) {
            return "'" + inPropertyUri + "'==='" + individual.id + "'";
          }).join('||');
          var q = allowedTypeUriQuery + ' && (' + inPropertiesUrisQuery + ')';
          return !inPropertiesUrisQuery || allowedTypeUri === 'v-s:Link' ? Promise.resolve([]) : Backend.query({
            ticket: veda.ticket,
            query: q,
            limit: 500,
            async: true
          }).then(function (queryResult) {
            var links = queryResult.result.map(function (uri) {
              return new IndividualModel(uri);
            });
            return links;
          });
        }
        var type = individual['rdf:type'][0];
        var linksTree;
        if (!type.hasValue('v-s:hasLinksTree')) {
          linksTree = new IndividualModel();
          linksTree['rdf:type'] = [new IndividualModel('v-s:LinksTree')];
          linksTree['v-s:outProperty'] = [new IndividualModel('v-s:hasLink')];
          linksTree['v-s:allowedType'] = [new IndividualModel('v-s:Link')];
        } else {
          linksTree = type['v-s:hasLinksTree'][0];
        }
        return linksTree.load().then(function (linksTree) {
          var inPropertiesUris = linksTree['v-s:inProperty'].map(function (property) {
            return property.id;
          });
          var outPropertiesUris = linksTree['v-s:outProperty'].map(function (property) {
            return property.id;
          });
          if (outPropertiesUris.indexOf('v-s:hasLink') < 0) {
            outPropertiesUris.push('v-s:hasLink');
          }
          var allowedTypesUris = linksTree['v-s:allowedType'].map(function (allowedType) {
            return allowedType.id;
          });
          if (allowedTypesUris.indexOf('v-s:Link') < 0) {
            allowedTypesUris.push('v-s:Link');
          }
          var allowedTypesContainer = $('.allowed-types', template);
          var allowedTypesTemplate = allowedTypesContainer.html();
          allowedTypesContainer.empty();
          var allowedTypesPromises = allowedTypesUris.map(function (allowedTypeUri) {
            var allowedType = new IndividualModel(allowedTypeUri);
            return allowedType.present(allowedTypesContainer, allowedTypesTemplate);
          });
          return Promise.all(allowedTypesPromises).then(function () {
            $('.glyphicon.expand', template).click(function (e) {
              e.preventDefault();
              e.stopPropagation();
              var $this = $(this);
              if ($this.hasClass('glyphicon-chevron-right')) {
                $this.addClass('glyphicon-chevron-down').removeClass('glyphicon-chevron-right');
                allowedTypesContainer.removeClass('hidden');
              } else if ($this.hasClass('glyphicon-chevron-down')) {
                $this.addClass('glyphicon-chevron-right').removeClass('glyphicon-chevron-down');
                allowedTypesContainer.addClass('hidden');
              }
            });
            $('.glyphicon.expand-type', template).click(function (e) {
              e.preventDefault();
              e.stopPropagation();
              var $this = $(this);
              var typeLinksContainer = $this.siblings('.type-links');
              if ($this.hasClass('glyphicon-chevron-right')) {
                $this.addClass('glyphicon-chevron-down').removeClass('glyphicon-chevron-right');
                typeLinksContainer.removeClass('hidden');
                $this.addClass('fa fa-spinner fa-pulse fa-lg fa-fw');
                if (!typeLinksContainer.children().length) {
                  var allowedTypeUri = $this.parent().attr('resource');
                  getOutTypeLinks(allowedTypeUri, outPropertiesUris).then(function (outLinks) {
                    return Promise.all(outLinks.map(function (link) {
                      return presentTypeLink(link, typeLinksContainer);
                    }));
                  }).then(function () {
                    return getInTypeLinks(allowedTypeUri, inPropertiesUris);
                  }).then(function (inLinks) {
                    var inLinksPromises = inLinks.map(function (link) {
                      return presentTypeLink(link, typeLinksContainer);
                    });
                    return Promise.all(inLinksPromises);
                  }).then(function () {
                    $this.removeClass('fa fa-spinner fa-pulse fa-lg fa-fw');
                    if (!typeLinksContainer.children().length) {
                      $this.parent().hide(350, function () {
                        $(this).remove();
                      });
                    }
                  }).catch(function (error) {
                    console.error('Out type links failed');
                  });
                } else {
                  $this.toggleClass('fa fa-spinner fa-pulse fa-lg fa-fw');
                }
              } else if ($this.hasClass('glyphicon-chevron-down')) {
                $this.addClass('glyphicon-chevron-right').removeClass('glyphicon-chevron-down');
                typeLinksContainer.addClass('hidden');
              }
            });
          });
        });
      });
      _export("html", html = "\n  <ul class=\"link-node\">\n    <li>\n      <a href=\"#\" class=\"glyphicon glyphicon-chevron-right expand\"></a> <span about=\"@\" data-template=\"v-s:TrimmedLinkTemplate\"></span>\n      <ul class=\"allowed-types hidden\">\n        <li>\n          <a href=\"#\" class=\"glyphicon glyphicon-chevron-right expand-type\"></a> <span class=\"fa fa-folder-open-o\"></span>\n          <strong about=\"@\" property=\"rdfs:label\"></strong>\n          <div class=\"type-links hidden\"></div>\n        </li>\n      </ul>\n    </li>\n  </ul>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJCcm93c2VyVXRpbCIsIl9qc0Jyb3dzZXJVdGlsSnMiLCJkZWZhdWx0IiwiX2pxdWVyeSIsIiQiLCJfanNDb21tb25WZWRhSnMiLCJ2ZWRhIiwiX2pzQ29tbW9uQmFja2VuZEpzIiwiQmFja2VuZCIsIl9qc0NvbW1vbkluZGl2aWR1YWxfbW9kZWxKcyIsIkluZGl2aWR1YWxNb2RlbCIsImV4ZWN1dGUiLCJfZXhwb3J0IiwicHJlIiwiaW5kaXZpZHVhbCIsInRlbXBsYXRlIiwiY29udGFpbmVyIiwibW9kZSIsImV4dHJhIiwicHJlc2VudFR5cGVMaW5rIiwibGluayIsInR5cGVMaW5rc0NvbnRhaW5lciIsImxvYWQiLCJ0aGVuIiwiaGFzVmFsdWUiLCJjbG9zZXN0IiwiZXNjYXBlNCQiLCJpZCIsImxlbmd0aCIsInByZXNlbnQiLCJnZXRPdXRUeXBlTGlua3MiLCJhbGxvd2VkVHlwZVVyaSIsIm91dFByb3BlcnRpZXNVcmlzIiwibGlua3MiLCJmb3JFYWNoIiwib3V0UHJvcGVydHlVcmkiLCJjb25jYXQiLCJsaW5rc1Byb21pc2VzIiwibWFwIiwiUHJvbWlzZSIsImFsbCIsImxvYWRlZExpbmtzIiwiZmlsdGVyIiwibGlua1R5cGVVcmkiLCJnZXRJblR5cGVMaW5rcyIsImluUHJvcGVydGllc1VyaXMiLCJhbGxvd2VkVHlwZVVyaVF1ZXJ5IiwiaW5Qcm9wZXJ0aWVzVXJpc1F1ZXJ5IiwiaW5Qcm9wZXJ0eVVyaSIsImpvaW4iLCJxIiwicmVzb2x2ZSIsInF1ZXJ5IiwidGlja2V0IiwibGltaXQiLCJhc3luYyIsInF1ZXJ5UmVzdWx0IiwicmVzdWx0IiwidXJpIiwidHlwZSIsImxpbmtzVHJlZSIsInByb3BlcnR5IiwiaW5kZXhPZiIsInB1c2giLCJhbGxvd2VkVHlwZXNVcmlzIiwiYWxsb3dlZFR5cGUiLCJhbGxvd2VkVHlwZXNDb250YWluZXIiLCJhbGxvd2VkVHlwZXNUZW1wbGF0ZSIsImh0bWwiLCJlbXB0eSIsImFsbG93ZWRUeXBlc1Byb21pc2VzIiwiY2xpY2siLCJlIiwicHJldmVudERlZmF1bHQiLCJzdG9wUHJvcGFnYXRpb24iLCIkdGhpcyIsImhhc0NsYXNzIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsInNpYmxpbmdzIiwiY2hpbGRyZW4iLCJwYXJlbnQiLCJhdHRyIiwib3V0TGlua3MiLCJpbkxpbmtzIiwiaW5MaW5rc1Byb21pc2VzIiwiaGlkZSIsInJlbW92ZSIsImNhdGNoIiwiZXJyb3IiLCJjb25zb2xlIiwidG9nZ2xlQ2xhc3MiXSwic291cmNlcyI6WyIuLi8uLi9vbnRvbG9neS9nZW5lcmljLWZ1bmN0aW9uL3RlbXBsYXRlcy92LXNfTGlua3NUcmVlUmVjdXJzaXZlVGVtcGxhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJyb3dzZXJVdGlsIGZyb20gJy9qcy9icm93c2VyL3V0aWwuanMnO1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB2ZWRhIGZyb20gJy9qcy9jb21tb24vdmVkYS5qcyc7XG5pbXBvcnQgQmFja2VuZCBmcm9tICcvanMvY29tbW9uL2JhY2tlbmQuanMnO1xuaW1wb3J0IEluZGl2aWR1YWxNb2RlbCBmcm9tICcvanMvY29tbW9uL2luZGl2aWR1YWxfbW9kZWwuanMnO1xuXG5leHBvcnQgY29uc3QgcHJlID0gZnVuY3Rpb24gKGluZGl2aWR1YWwsIHRlbXBsYXRlLCBjb250YWluZXIsIG1vZGUsIGV4dHJhKSB7XG4gIHRlbXBsYXRlID0gJCh0ZW1wbGF0ZSk7XG4gIGNvbnRhaW5lciA9ICQoY29udGFpbmVyKTtcblxuICBmdW5jdGlvbiBwcmVzZW50VHlwZUxpbmsgKGxpbmssIHR5cGVMaW5rc0NvbnRhaW5lcikge1xuICAgIHJldHVybiBsaW5rLmxvYWQoKS50aGVuKGZ1bmN0aW9uIChsaW5rKSB7XG4gICAgICBpZiAobGluay5oYXNWYWx1ZSgncmRmOnR5cGUnLCAndi1zOkxpbmsnKSkge1xuICAgICAgICBpZiAobGluay5oYXNWYWx1ZSgndi1zOmZyb20nLCBpbmRpdmlkdWFsKSAmJiBsaW5rLmhhc1ZhbHVlKCd2LXM6dG8nKSkge1xuICAgICAgICAgIGxpbmsgPSBsaW5rWyd2LXM6dG8nXVswXTtcbiAgICAgICAgfSBlbHNlIGlmIChsaW5rLmhhc1ZhbHVlKCd2LXM6dG8nLCBpbmRpdmlkdWFsKSAmJiBsaW5rLmhhc1ZhbHVlKCd2LXM6ZnJvbScpKSB7XG4gICAgICAgICAgbGluayA9IGxpbmtbJ3Ytczpmcm9tJ11bMF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghdGVtcGxhdGUuY2xvc2VzdChcIi5saW5rLW5vZGVbcmVzb3VyY2U9J1wiICsgQnJvd3NlclV0aWwuZXNjYXBlNCQobGluay5pZCkgKyBcIiddXCIpLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gbGluay5wcmVzZW50KHR5cGVMaW5rc0NvbnRhaW5lciwgJ3YtczpMaW5rc1RyZWVSZWN1cnNpdmVUZW1wbGF0ZScpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0T3V0VHlwZUxpbmtzIChhbGxvd2VkVHlwZVVyaSwgb3V0UHJvcGVydGllc1VyaXMpIHtcbiAgICBsZXQgbGlua3MgPSBbXTtcbiAgICBvdXRQcm9wZXJ0aWVzVXJpcy5mb3JFYWNoKGZ1bmN0aW9uIChvdXRQcm9wZXJ0eVVyaSkge1xuICAgICAgbGlua3MgPSBsaW5rcy5jb25jYXQoaW5kaXZpZHVhbFtvdXRQcm9wZXJ0eVVyaV0pO1xuICAgIH0pO1xuICAgIGNvbnN0IGxpbmtzUHJvbWlzZXMgPSBsaW5rcy5tYXAoZnVuY3Rpb24gKGxpbmspIHtcbiAgICAgIHJldHVybiBsaW5rLmxvYWQoKTtcbiAgICB9KTtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwobGlua3NQcm9taXNlcykudGhlbihmdW5jdGlvbiAobG9hZGVkTGlua3MpIHtcbiAgICAgIHJldHVybiBsb2FkZWRMaW5rcy5maWx0ZXIoZnVuY3Rpb24gKGxpbmspIHtcbiAgICAgICAgY29uc3QgbGlua1R5cGVVcmkgPSBsaW5rWydyZGY6dHlwZSddWzBdLmlkO1xuICAgICAgICByZXR1cm4gbGlua1R5cGVVcmkgPT09IGFsbG93ZWRUeXBlVXJpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRJblR5cGVMaW5rcyAoYWxsb3dlZFR5cGVVcmksIGluUHJvcGVydGllc1VyaXMpIHtcbiAgICBjb25zdCBhbGxvd2VkVHlwZVVyaVF1ZXJ5ID0gXCIncmRmOnR5cGUnPT09J1wiICsgYWxsb3dlZFR5cGVVcmkgKyBcIidcIjtcbiAgICBjb25zdCBpblByb3BlcnRpZXNVcmlzUXVlcnkgPSBpblByb3BlcnRpZXNVcmlzXG4gICAgICAubWFwKGZ1bmN0aW9uIChpblByb3BlcnR5VXJpKSB7XG4gICAgICAgIHJldHVybiBcIidcIiArIGluUHJvcGVydHlVcmkgKyBcIic9PT0nXCIgKyBpbmRpdmlkdWFsLmlkICsgXCInXCI7XG4gICAgICB9KVxuICAgICAgLmpvaW4oJ3x8Jyk7XG4gICAgY29uc3QgcSA9IGFsbG93ZWRUeXBlVXJpUXVlcnkgKyAnICYmICgnICsgaW5Qcm9wZXJ0aWVzVXJpc1F1ZXJ5ICsgJyknO1xuICAgIHJldHVybiAhaW5Qcm9wZXJ0aWVzVXJpc1F1ZXJ5IHx8IGFsbG93ZWRUeXBlVXJpID09PSAndi1zOkxpbmsnID9cbiAgICAgIFByb21pc2UucmVzb2x2ZShbXSkgOlxuICAgICAgQmFja2VuZC5xdWVyeSh7XG4gICAgICAgIHRpY2tldDogdmVkYS50aWNrZXQsXG4gICAgICAgIHF1ZXJ5OiBxLFxuICAgICAgICBsaW1pdDogNTAwLFxuICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHF1ZXJ5UmVzdWx0KSB7XG4gICAgICAgIGNvbnN0IGxpbmtzID0gcXVlcnlSZXN1bHQucmVzdWx0Lm1hcChmdW5jdGlvbiAodXJpKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBJbmRpdmlkdWFsTW9kZWwodXJpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBsaW5rcztcbiAgICAgIH0pO1xuICB9XG5cbiAgY29uc3QgdHlwZSA9IGluZGl2aWR1YWxbJ3JkZjp0eXBlJ11bMF07XG4gIGxldCBsaW5rc1RyZWU7XG4gIGlmICghdHlwZS5oYXNWYWx1ZSgndi1zOmhhc0xpbmtzVHJlZScpKSB7XG4gICAgbGlua3NUcmVlID0gbmV3IEluZGl2aWR1YWxNb2RlbCgpO1xuICAgIGxpbmtzVHJlZVsncmRmOnR5cGUnXSA9IFtuZXcgSW5kaXZpZHVhbE1vZGVsKCd2LXM6TGlua3NUcmVlJyldO1xuICAgIGxpbmtzVHJlZVsndi1zOm91dFByb3BlcnR5J10gPSBbbmV3IEluZGl2aWR1YWxNb2RlbCgndi1zOmhhc0xpbmsnKV07XG4gICAgbGlua3NUcmVlWyd2LXM6YWxsb3dlZFR5cGUnXSA9IFtuZXcgSW5kaXZpZHVhbE1vZGVsKCd2LXM6TGluaycpXTtcbiAgfSBlbHNlIHtcbiAgICBsaW5rc1RyZWUgPSB0eXBlWyd2LXM6aGFzTGlua3NUcmVlJ11bMF07XG4gIH1cblxuICByZXR1cm4gbGlua3NUcmVlLmxvYWQoKS50aGVuKGZ1bmN0aW9uIChsaW5rc1RyZWUpIHtcbiAgICBjb25zdCBpblByb3BlcnRpZXNVcmlzID0gbGlua3NUcmVlWyd2LXM6aW5Qcm9wZXJ0eSddLm1hcChmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgIHJldHVybiBwcm9wZXJ0eS5pZDtcbiAgICB9KTtcbiAgICBjb25zdCBvdXRQcm9wZXJ0aWVzVXJpcyA9IGxpbmtzVHJlZVsndi1zOm91dFByb3BlcnR5J10ubWFwKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgcmV0dXJuIHByb3BlcnR5LmlkO1xuICAgIH0pO1xuICAgIGlmIChvdXRQcm9wZXJ0aWVzVXJpcy5pbmRleE9mKCd2LXM6aGFzTGluaycpIDwgMCkge1xuICAgICAgb3V0UHJvcGVydGllc1VyaXMucHVzaCgndi1zOmhhc0xpbmsnKTtcbiAgICB9XG4gICAgY29uc3QgYWxsb3dlZFR5cGVzVXJpcyA9IGxpbmtzVHJlZVsndi1zOmFsbG93ZWRUeXBlJ10ubWFwKGZ1bmN0aW9uIChhbGxvd2VkVHlwZSkge1xuICAgICAgcmV0dXJuIGFsbG93ZWRUeXBlLmlkO1xuICAgIH0pO1xuICAgIGlmIChhbGxvd2VkVHlwZXNVcmlzLmluZGV4T2YoJ3YtczpMaW5rJykgPCAwKSB7XG4gICAgICBhbGxvd2VkVHlwZXNVcmlzLnB1c2goJ3YtczpMaW5rJyk7XG4gICAgfVxuXG4gICAgY29uc3QgYWxsb3dlZFR5cGVzQ29udGFpbmVyID0gJCgnLmFsbG93ZWQtdHlwZXMnLCB0ZW1wbGF0ZSk7XG4gICAgY29uc3QgYWxsb3dlZFR5cGVzVGVtcGxhdGUgPSBhbGxvd2VkVHlwZXNDb250YWluZXIuaHRtbCgpO1xuICAgIGFsbG93ZWRUeXBlc0NvbnRhaW5lci5lbXB0eSgpO1xuICAgIGNvbnN0IGFsbG93ZWRUeXBlc1Byb21pc2VzID0gYWxsb3dlZFR5cGVzVXJpcy5tYXAoZnVuY3Rpb24gKGFsbG93ZWRUeXBlVXJpKSB7XG4gICAgICBjb25zdCBhbGxvd2VkVHlwZSA9IG5ldyBJbmRpdmlkdWFsTW9kZWwoYWxsb3dlZFR5cGVVcmkpO1xuICAgICAgcmV0dXJuIGFsbG93ZWRUeXBlLnByZXNlbnQoYWxsb3dlZFR5cGVzQ29udGFpbmVyLCBhbGxvd2VkVHlwZXNUZW1wbGF0ZSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoYWxsb3dlZFR5cGVzUHJvbWlzZXMpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgJCgnLmdseXBoaWNvbi5leHBhbmQnLCB0ZW1wbGF0ZSkuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBjb25zdCAkdGhpcyA9ICQodGhpcyk7XG5cbiAgICAgICAgaWYgKCR0aGlzLmhhc0NsYXNzKCdnbHlwaGljb24tY2hldnJvbi1yaWdodCcpKSB7XG4gICAgICAgICAgJHRoaXMuYWRkQ2xhc3MoJ2dseXBoaWNvbi1jaGV2cm9uLWRvd24nKS5yZW1vdmVDbGFzcygnZ2x5cGhpY29uLWNoZXZyb24tcmlnaHQnKTtcbiAgICAgICAgICBhbGxvd2VkVHlwZXNDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICB9IGVsc2UgaWYgKCR0aGlzLmhhc0NsYXNzKCdnbHlwaGljb24tY2hldnJvbi1kb3duJykpIHtcbiAgICAgICAgICAkdGhpcy5hZGRDbGFzcygnZ2x5cGhpY29uLWNoZXZyb24tcmlnaHQnKS5yZW1vdmVDbGFzcygnZ2x5cGhpY29uLWNoZXZyb24tZG93bicpO1xuICAgICAgICAgIGFsbG93ZWRUeXBlc0NvbnRhaW5lci5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAkKCcuZ2x5cGhpY29uLmV4cGFuZC10eXBlJywgdGVtcGxhdGUpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgY29uc3QgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICBjb25zdCB0eXBlTGlua3NDb250YWluZXIgPSAkdGhpcy5zaWJsaW5ncygnLnR5cGUtbGlua3MnKTtcbiAgICAgICAgaWYgKCR0aGlzLmhhc0NsYXNzKCdnbHlwaGljb24tY2hldnJvbi1yaWdodCcpKSB7XG4gICAgICAgICAgJHRoaXMuYWRkQ2xhc3MoJ2dseXBoaWNvbi1jaGV2cm9uLWRvd24nKS5yZW1vdmVDbGFzcygnZ2x5cGhpY29uLWNoZXZyb24tcmlnaHQnKTtcbiAgICAgICAgICB0eXBlTGlua3NDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICR0aGlzLmFkZENsYXNzKCdmYSBmYS1zcGlubmVyIGZhLXB1bHNlIGZhLWxnIGZhLWZ3Jyk7XG4gICAgICAgICAgaWYgKCF0eXBlTGlua3NDb250YWluZXIuY2hpbGRyZW4oKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGFsbG93ZWRUeXBlVXJpID0gJHRoaXMucGFyZW50KCkuYXR0cigncmVzb3VyY2UnKTtcbiAgICAgICAgICAgIGdldE91dFR5cGVMaW5rcyhhbGxvd2VkVHlwZVVyaSwgb3V0UHJvcGVydGllc1VyaXMpXG4gICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChvdXRMaW5rcykge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChcbiAgICAgICAgICAgICAgICAgIG91dExpbmtzLm1hcChmdW5jdGlvbiAobGluaykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJlc2VudFR5cGVMaW5rKGxpbmssIHR5cGVMaW5rc0NvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldEluVHlwZUxpbmtzKGFsbG93ZWRUeXBlVXJpLCBpblByb3BlcnRpZXNVcmlzKTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGluTGlua3MpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbkxpbmtzUHJvbWlzZXMgPSBpbkxpbmtzLm1hcChmdW5jdGlvbiAobGluaykge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHByZXNlbnRUeXBlTGluayhsaW5rLCB0eXBlTGlua3NDb250YWluZXIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChpbkxpbmtzUHJvbWlzZXMpO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJHRoaXMucmVtb3ZlQ2xhc3MoJ2ZhIGZhLXNwaW5uZXIgZmEtcHVsc2UgZmEtbGcgZmEtZncnKTtcbiAgICAgICAgICAgICAgICBpZiAoIXR5cGVMaW5rc0NvbnRhaW5lci5jaGlsZHJlbigpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgJHRoaXMucGFyZW50KCkuaGlkZSgzNTAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ091dCB0eXBlIGxpbmtzIGZhaWxlZCcpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHRoaXMudG9nZ2xlQ2xhc3MoJ2ZhIGZhLXNwaW5uZXIgZmEtcHVsc2UgZmEtbGcgZmEtZncnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoJHRoaXMuaGFzQ2xhc3MoJ2dseXBoaWNvbi1jaGV2cm9uLWRvd24nKSkge1xuICAgICAgICAgICR0aGlzLmFkZENsYXNzKCdnbHlwaGljb24tY2hldnJvbi1yaWdodCcpLnJlbW92ZUNsYXNzKCdnbHlwaGljb24tY2hldnJvbi1kb3duJyk7XG4gICAgICAgICAgdHlwZUxpbmtzQ29udGFpbmVyLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGh0bWwgPSBgXG4gIDx1bCBjbGFzcz1cImxpbmstbm9kZVwiPlxuICAgIDxsaT5cbiAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWNoZXZyb24tcmlnaHQgZXhwYW5kXCI+PC9hPiA8c3BhbiBhYm91dD1cIkBcIiBkYXRhLXRlbXBsYXRlPVwidi1zOlRyaW1tZWRMaW5rVGVtcGxhdGVcIj48L3NwYW4+XG4gICAgICA8dWwgY2xhc3M9XCJhbGxvd2VkLXR5cGVzIGhpZGRlblwiPlxuICAgICAgICA8bGk+XG4gICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tY2hldnJvbi1yaWdodCBleHBhbmQtdHlwZVwiPjwvYT4gPHNwYW4gY2xhc3M9XCJmYSBmYS1mb2xkZXItb3Blbi1vXCI+PC9zcGFuPlxuICAgICAgICAgIDxzdHJvbmcgYWJvdXQ9XCJAXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9zdHJvbmc+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInR5cGUtbGlua3MgaGlkZGVuXCI+PC9kaXY+XG4gICAgICAgIDwvbGk+XG4gICAgICA8L3VsPlxuICAgIDwvbGk+XG4gIDwvdWw+XG5gO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztNQUFPQSxXQUFXLEdBQUFDLGdCQUFBLENBQUFDLE9BQUE7SUFBQSxhQUFBQyxPQUFBO01BQ1hDLENBQUMsR0FBQUQsT0FBQSxDQUFBRCxPQUFBO0lBQUEsYUFBQUcsZUFBQTtNQUNEQyxJQUFJLEdBQUFELGVBQUEsQ0FBQUgsT0FBQTtJQUFBLGFBQUFLLGtCQUFBO01BQ0pDLE9BQU8sR0FBQUQsa0JBQUEsQ0FBQUwsT0FBQTtJQUFBLGFBQUFPLDJCQUFBO01BQ1BDLGVBQWUsR0FBQUQsMkJBQUEsQ0FBQVAsT0FBQTtJQUFBO0lBQUFTLE9BQUEsV0FBQUEsQ0FBQTtNQUFBQyxPQUFBLFFBRVRDLEdBQUcsR0FBRyxTQUFOQSxHQUFHQSxDQUFhQyxVQUFVLEVBQUVDLFFBQVEsRUFBRUMsU0FBUyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRTtRQUN6RUgsUUFBUSxHQUFHWCxDQUFDLENBQUNXLFFBQVEsQ0FBQztRQUN0QkMsU0FBUyxHQUFHWixDQUFDLENBQUNZLFNBQVMsQ0FBQztRQUV4QixTQUFTRyxlQUFlQSxDQUFFQyxJQUFJLEVBQUVDLGtCQUFrQixFQUFFO1VBQ2xELE9BQU9ELElBQUksQ0FBQ0UsSUFBSSxFQUFFLENBQUNDLElBQUksQ0FBQyxVQUFVSCxJ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