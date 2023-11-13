"use strict";

System.register(["jquery", "/js/common/veda.js", "/js/browser/notify.js", "/js/common/individual_model.js"], function (_export, _context) {
  "use strict";

  var $, veda, notify, IndividualModel, pre, html;
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_jsCommonVedaJs) {
      veda = _jsCommonVedaJs.default;
    }, function (_jsBrowserNotifyJs) {
      notify = _jsBrowserNotifyJs.default;
    }, function (_jsCommonIndividual_modelJs) {
      IndividualModel = _jsCommonIndividual_modelJs.default;
    }],
    execute: function () {
      _export("pre", pre = function pre(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        if (!individual.hasValue('v-s:creator', veda.appointment || veda.user)) {
          $('.action.save-registry', template).click(function () {
            var personalLabel = prompt(new IndividualModel('v-fs:EnterLabel').toString(), individual.toString());
            if (!personalLabel) {
              return;
            }
            individual.clone().then(function (personalRegistry) {
              personalRegistry['rdf:type'] = [new IndividualModel('v-fs:PersonalSearch')];
              personalRegistry['v-fs:searchResult'] = [];
              personalRegistry['v-fs:selected'] = [];
              personalRegistry['v-fs:operation'] = [];
              personalRegistry['v-fs:authorized'] = [];
              personalRegistry['v-fs:cursor'] = [];
              personalRegistry['v-fs:estimated'] = [];
              personalRegistry['v-fs:limit'] = [];
              personalRegistry['v-fs:top'] = [];
              personalRegistry['v-s:creator'] = [];
              personalRegistry['v-s:created'] = [];
              personalRegistry['rdfs:isDefinedBy'] = [];
              personalRegistry['rdfs:label'] = [personalLabel];
              var columns = $('.set-columns-wrapper .dropdown-menu .checkbox', template);
              var visibleColumns = [];
              columns.each(function (i) {
                var elem = $(this);
                var input = $('input', elem);
                if (input.is(':checked')) {
                  visibleColumns.push(elem);
                }
              });
              if (visibleColumns.length > 0) {
                personalRegistry['v-fs:hasVisibleColumns'] = visibleColumns.map(function (c) {
                  var uri = $('span.column-name span', c).attr('about');
                  return new veda.IndividualModel(uri);
                });
              }
              var searchBlank = individual.hasValue('v-fs:searchBlank') ? individual['v-fs:searchBlank'][0] : undefined;
              if (searchBlank && searchBlank.object) {
                return searchBlank.clone().then(function (personalRegistryBlank) {
                  personalRegistryBlank['rdfs:isDefinedBy'] = [];
                  personalRegistryBlank.object = searchBlank.object;
                  return personalRegistryBlank.updateBlank();
                }).then(function (personalRegistryBlank) {
                  personalRegistry['v-fs:searchBlank'] = [personalRegistryBlank];
                  return personalRegistry.save();
                });
              } else {
                return personalRegistry.save();
              }
            }).then(function (personalRegistry) {
              return veda.user.aspect.load().then(function (aspect) {
                aspect.addValue('v-s:hasRegistry', personalRegistry);
                return aspect.save();
              });
            }).then(function () {
              return new IndividualModel('v-fs:RegistrySuccessfullySaved').load();
            }).then(function (message) {
              notify('success', {
                message: message
              });
            }).catch(function (error) {
              notify('danger', {
                message: error
              });
            });
          });
        } else {
          $('.action.save-registry', template).remove();
        }
        individual.rights.then(function (rights) {
          if (rights.hasValue('v-s:canUpdate', true)) {
            $('.action.update-registry', template).click(function () {
              individual['v-fs:searchResult'] = [];
              var searchBlank = individual.hasValue('v-fs:searchBlank') ? individual['v-fs:searchBlank'][0] : undefined;
              if (searchBlank && searchBlank.object) {
                searchBlank.updateBlank().then(function () {
                  return new IndividualModel('v-fs:RegistrySuccessfullyUpdated').load();
                }).then(function (message) {
                  notify('success', {
                    message: message.toString()
                  });
                }).catch(function (error) {
                  notify('danger', {
                    message: error
                  });
                });
              }
            });
          } else {
            $('.action.update-registry', template).remove();
          }
          if (rights.hasValue('v-s:canDelete', true)) {
            $('.action.delete-registry', template).click(function () {
              veda.user.aspect.load().then(function (aspect) {
                aspect.removeValue('v-s:hasRegistry', individual);
                return aspect.save();
              }).then(function () {
                return individual.delete();
              }).then(function () {
                return new IndividualModel('v-fs:RegistrySuccessfullyDeleted').load();
              }).then(function (message) {
                return notify('success', {
                  message: message
                });
              }).catch(function (error) {
                notify('danger', {
                  message: error
                });
              });
            });
          } else {
            $('.action.delete-registry', template).remove();
          }
        });
      });
      _export("html", html = "\n  <div>\n    <div class=\"container sheet\">\n      <div class=\"ribbon-wrapper top-left\">\n        <div class=\"ribbon top-left primary\" about=\"v-fs:SearchBundle\" property=\"rdfs:label\"></div>\n      </div>\n      <div class=\"actions text-right\">\n        <button class=\"action save-registry btn btn-primary\" about=\"v-fs:SavePersonalRegistry\" property=\"rdfs:label\"></button>\n        <button class=\"action update-registry btn btn-primary\" about=\"v-fs:UpdatePersonalRegistry\" property=\"rdfs:label\"></button>\n        <button class=\"action delete-registry btn btn-link\" about=\"v-s:Delete\" property=\"rdfs:label\"></button>\n      </div>\n    </div>\n    <div class=\"margin-lg\" about=\"@\" data-template=\"v-fs:AttributiveSearchTemplate\"></div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfanNDb21tb25WZWRhSnMiLCJ2ZWRhIiwiX2pzQnJvd3Nlck5vdGlmeUpzIiwibm90aWZ5IiwiX2pzQ29tbW9uSW5kaXZpZHVhbF9tb2RlbEpzIiwiSW5kaXZpZHVhbE1vZGVsIiwiZXhlY3V0ZSIsIl9leHBvcnQiLCJwcmUiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJoYXNWYWx1ZSIsImFwcG9pbnRtZW50IiwidXNlciIsImNsaWNrIiwicGVyc29uYWxMYWJlbCIsInByb21wdCIsInRvU3RyaW5nIiwiY2xvbmUiLCJ0aGVuIiwicGVyc29uYWxSZWdpc3RyeSIsImNvbHVtbnMiLCJ2aXNpYmxlQ29sdW1ucyIsImVhY2giLCJpIiwiZWxlbSIsImlucHV0IiwiaXMiLCJwdXNoIiwibGVuZ3RoIiwibWFwIiwiYyIsInVyaSIsImF0dHIiLCJzZWFyY2hCbGFuayIsInVuZGVmaW5lZCIsIm9iamVjdCIsInBlcnNvbmFsUmVnaXN0cnlCbGFuayIsInVwZGF0ZUJsYW5rIiwic2F2ZSIsImFzcGVjdCIsImxvYWQiLCJhZGRWYWx1ZSIsIm1lc3NhZ2UiLCJjYXRjaCIsImVycm9yIiwicmVtb3ZlIiwicmlnaHRzIiwicmVtb3ZlVmFsdWUiLCJkZWxldGUiLCJodG1sIl0sInNvdXJjZXMiOlsiLi4vLi4vb250b2xvZ3kvZ2VuZXJpYy1mdW5jdGlvbi90ZW1wbGF0ZXMvdi1mc19BdHRyaWJ1dGl2ZVNlYXJjaE1hbmFnZW1lbnRUZW1wbGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHZlZGEgZnJvbSAnL2pzL2NvbW1vbi92ZWRhLmpzJztcbmltcG9ydCBub3RpZnkgZnJvbSAnL2pzL2Jyb3dzZXIvbm90aWZ5LmpzJztcbmltcG9ydCBJbmRpdmlkdWFsTW9kZWwgZnJvbSAnL2pzL2NvbW1vbi9pbmRpdmlkdWFsX21vZGVsLmpzJztcblxuZXhwb3J0IGNvbnN0IHByZSA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgaWYgKCFpbmRpdmlkdWFsLmhhc1ZhbHVlKCd2LXM6Y3JlYXRvcicsIHZlZGEuYXBwb2ludG1lbnQgfHwgdmVkYS51c2VyKSkge1xuICAgICQoJy5hY3Rpb24uc2F2ZS1yZWdpc3RyeScsIHRlbXBsYXRlKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBwZXJzb25hbExhYmVsID0gcHJvbXB0KG5ldyBJbmRpdmlkdWFsTW9kZWwoJ3YtZnM6RW50ZXJMYWJlbCcpLnRvU3RyaW5nKCksIGluZGl2aWR1YWwudG9TdHJpbmcoKSk7XG4gICAgICBpZiAoIXBlcnNvbmFsTGFiZWwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaW5kaXZpZHVhbFxuICAgICAgICAuY2xvbmUoKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocGVyc29uYWxSZWdpc3RyeSkge1xuICAgICAgICAgIHBlcnNvbmFsUmVnaXN0cnlbJ3JkZjp0eXBlJ10gPSBbbmV3IEluZGl2aWR1YWxNb2RlbCgndi1mczpQZXJzb25hbFNlYXJjaCcpXTtcbiAgICAgICAgICBwZXJzb25hbFJlZ2lzdHJ5Wyd2LWZzOnNlYXJjaFJlc3VsdCddID0gW107XG4gICAgICAgICAgcGVyc29uYWxSZWdpc3RyeVsndi1mczpzZWxlY3RlZCddID0gW107XG4gICAgICAgICAgcGVyc29uYWxSZWdpc3RyeVsndi1mczpvcGVyYXRpb24nXSA9IFtdO1xuICAgICAgICAgIHBlcnNvbmFsUmVnaXN0cnlbJ3YtZnM6YXV0aG9yaXplZCddID0gW107XG4gICAgICAgICAgcGVyc29uYWxSZWdpc3RyeVsndi1mczpjdXJzb3InXSA9IFtdO1xuICAgICAgICAgIHBlcnNvbmFsUmVnaXN0cnlbJ3YtZnM6ZXN0aW1hdGVkJ10gPSBbXTtcbiAgICAgICAgICBwZXJzb25hbFJlZ2lzdHJ5Wyd2LWZzOmxpbWl0J10gPSBbXTtcbiAgICAgICAgICBwZXJzb25hbFJlZ2lzdHJ5Wyd2LWZzOnRvcCddID0gW107XG4gICAgICAgICAgcGVyc29uYWxSZWdpc3RyeVsndi1zOmNyZWF0b3InXSA9IFtdO1xuICAgICAgICAgIHBlcnNvbmFsUmVnaXN0cnlbJ3YtczpjcmVhdGVkJ10gPSBbXTtcbiAgICAgICAgICBwZXJzb25hbFJlZ2lzdHJ5WydyZGZzOmlzRGVmaW5lZEJ5J10gPSBbXTtcbiAgICAgICAgICBwZXJzb25hbFJlZ2lzdHJ5WydyZGZzOmxhYmVsJ10gPSBbcGVyc29uYWxMYWJlbF07XG5cbiAgICAgICAgICBjb25zdCBjb2x1bW5zID0gJCgnLnNldC1jb2x1bW5zLXdyYXBwZXIgLmRyb3Bkb3duLW1lbnUgLmNoZWNrYm94JywgdGVtcGxhdGUpO1xuICAgICAgICAgIGNvbnN0IHZpc2libGVDb2x1bW5zID0gW107XG4gICAgICAgICAgY29sdW1ucy5lYWNoKGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtID0gJCh0aGlzKTtcbiAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gJCgnaW5wdXQnLCBlbGVtKTtcbiAgICAgICAgICAgIGlmIChpbnB1dC5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICAgICB2aXNpYmxlQ29sdW1ucy5wdXNoKGVsZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmICh2aXNpYmxlQ29sdW1ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBwZXJzb25hbFJlZ2lzdHJ5Wyd2LWZzOmhhc1Zpc2libGVDb2x1bW5zJ10gPSB2aXNpYmxlQ29sdW1ucy5tYXAoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgY29uc3QgdXJpID0gJCgnc3Bhbi5jb2x1bW4tbmFtZSBzcGFuJywgYykuYXR0cignYWJvdXQnKTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5ldyB2ZWRhLkluZGl2aWR1YWxNb2RlbCh1cmkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgc2VhcmNoQmxhbmsgPSBpbmRpdmlkdWFsLmhhc1ZhbHVlKCd2LWZzOnNlYXJjaEJsYW5rJykgPyBpbmRpdmlkdWFsWyd2LWZzOnNlYXJjaEJsYW5rJ11bMF0gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgaWYgKHNlYXJjaEJsYW5rICYmIHNlYXJjaEJsYW5rLm9iamVjdCkge1xuICAgICAgICAgICAgcmV0dXJuIHNlYXJjaEJsYW5rXG4gICAgICAgICAgICAgIC5jbG9uZSgpXG4gICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChwZXJzb25hbFJlZ2lzdHJ5QmxhbmspIHtcbiAgICAgICAgICAgICAgICBwZXJzb25hbFJlZ2lzdHJ5QmxhbmtbJ3JkZnM6aXNEZWZpbmVkQnknXSA9IFtdO1xuICAgICAgICAgICAgICAgIHBlcnNvbmFsUmVnaXN0cnlCbGFuay5vYmplY3QgPSBzZWFyY2hCbGFuay5vYmplY3Q7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBlcnNvbmFsUmVnaXN0cnlCbGFuay51cGRhdGVCbGFuaygpO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocGVyc29uYWxSZWdpc3RyeUJsYW5rKSB7XG4gICAgICAgICAgICAgICAgcGVyc29uYWxSZWdpc3RyeVsndi1mczpzZWFyY2hCbGFuayddID0gW3BlcnNvbmFsUmVnaXN0cnlCbGFua107XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBlcnNvbmFsUmVnaXN0cnkuc2F2ZSgpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHBlcnNvbmFsUmVnaXN0cnkuc2F2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHBlcnNvbmFsUmVnaXN0cnkpIHtcbiAgICAgICAgICByZXR1cm4gdmVkYS51c2VyLmFzcGVjdC5sb2FkKCkudGhlbihmdW5jdGlvbiAoYXNwZWN0KSB7XG4gICAgICAgICAgICBhc3BlY3QuYWRkVmFsdWUoJ3YtczpoYXNSZWdpc3RyeScsIHBlcnNvbmFsUmVnaXN0cnkpO1xuICAgICAgICAgICAgcmV0dXJuIGFzcGVjdC5zYXZlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IEluZGl2aWR1YWxNb2RlbCgndi1mczpSZWdpc3RyeVN1Y2Nlc3NmdWxseVNhdmVkJykubG9hZCgpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgICAgIG5vdGlmeSgnc3VjY2VzcycsIHttZXNzYWdlOiBtZXNzYWdlfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICBub3RpZnkoJ2RhbmdlcicsIHttZXNzYWdlOiBlcnJvcn0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICAkKCcuYWN0aW9uLnNhdmUtcmVnaXN0cnknLCB0ZW1wbGF0ZSkucmVtb3ZlKCk7XG4gIH1cblxuICBpbmRpdmlkdWFsLnJpZ2h0cy50aGVuKGZ1bmN0aW9uIChyaWdodHMpIHtcbiAgICBpZiAocmlnaHRzLmhhc1ZhbHVlKCd2LXM6Y2FuVXBkYXRlJywgdHJ1ZSkpIHtcbiAgICAgICQoJy5hY3Rpb24udXBkYXRlLXJlZ2lzdHJ5JywgdGVtcGxhdGUpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaW5kaXZpZHVhbFsndi1mczpzZWFyY2hSZXN1bHQnXSA9IFtdO1xuICAgICAgICBjb25zdCBzZWFyY2hCbGFuayA9IGluZGl2aWR1YWwuaGFzVmFsdWUoJ3YtZnM6c2VhcmNoQmxhbmsnKSA/IGluZGl2aWR1YWxbJ3YtZnM6c2VhcmNoQmxhbmsnXVswXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKHNlYXJjaEJsYW5rICYmIHNlYXJjaEJsYW5rLm9iamVjdCkge1xuICAgICAgICAgIHNlYXJjaEJsYW5rXG4gICAgICAgICAgICAudXBkYXRlQmxhbmsoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICByZXR1cm4gbmV3IEluZGl2aWR1YWxNb2RlbCgndi1mczpSZWdpc3RyeVN1Y2Nlc3NmdWxseVVwZGF0ZWQnKS5sb2FkKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgbm90aWZ5KCdzdWNjZXNzJywge21lc3NhZ2U6IG1lc3NhZ2UudG9TdHJpbmcoKX0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgbm90aWZ5KCdkYW5nZXInLCB7bWVzc2FnZTogZXJyb3J9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCgnLmFjdGlvbi51cGRhdGUtcmVnaXN0cnknLCB0ZW1wbGF0ZSkucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgaWYgKHJpZ2h0cy5oYXNWYWx1ZSgndi1zOmNhbkRlbGV0ZScsIHRydWUpKSB7XG4gICAgICAkKCcuYWN0aW9uLmRlbGV0ZS1yZWdpc3RyeScsIHRlbXBsYXRlKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZlZGEudXNlci5hc3BlY3RcbiAgICAgICAgICAubG9hZCgpXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGFzcGVjdCkge1xuICAgICAgICAgICAgYXNwZWN0LnJlbW92ZVZhbHVlKCd2LXM6aGFzUmVnaXN0cnknLCBpbmRpdmlkdWFsKTtcbiAgICAgICAgICAgIHJldHVybiBhc3BlY3Quc2F2ZSgpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGluZGl2aWR1YWwuZGVsZXRlKCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEluZGl2aWR1YWxNb2RlbCgndi1mczpSZWdpc3RyeVN1Y2Nlc3NmdWxseURlbGV0ZWQnKS5sb2FkKCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAudGhlbihmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5vdGlmeSgnc3VjY2VzcycsIHttZXNzYWdlOiBtZXNzYWdlfSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBub3RpZnkoJ2RhbmdlcicsIHttZXNzYWdlOiBlcnJvcn0pO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoJy5hY3Rpb24uZGVsZXRlLXJlZ2lzdHJ5JywgdGVtcGxhdGUpLnJlbW92ZSgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgaHRtbCA9IGBcbiAgPGRpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyIHNoZWV0XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwicmliYm9uLXdyYXBwZXIgdG9wLWxlZnRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJpYmJvbiB0b3AtbGVmdCBwcmltYXJ5XCIgYWJvdXQ9XCJ2LWZzOlNlYXJjaEJ1bmRsZVwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYWN0aW9ucyB0ZXh0LXJpZ2h0XCI+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJhY3Rpb24gc2F2ZS1yZWdpc3RyeSBidG4gYnRuLXByaW1hcnlcIiBhYm91dD1cInYtZnM6U2F2ZVBlcnNvbmFsUmVnaXN0cnlcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImFjdGlvbiB1cGRhdGUtcmVnaXN0cnkgYnRuIGJ0bi1wcmltYXJ5XCIgYWJvdXQ9XCJ2LWZzOlVwZGF0ZVBlcnNvbmFsUmVnaXN0cnlcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImFjdGlvbiBkZWxldGUtcmVnaXN0cnkgYnRuIGJ0bi1saW5rXCIgYWJvdXQ9XCJ2LXM6RGVsZXRlXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwibWFyZ2luLWxnXCIgYWJvdXQ9XCJAXCIgZGF0YS10ZW1wbGF0ZT1cInYtZnM6QXR0cmlidXRpdmVTZWFyY2hUZW1wbGF0ZVwiPjwvZGl2PlxuICA8L2Rpdj5cbmA7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O01BQU9BLENBQUMsR0FBQUMsT0FBQSxDQUFBQyxPQUFBO0lBQUEsYUFBQUMsZUFBQTtNQUNEQyxJQUFJLEdBQUFELGVBQUEsQ0FBQUQsT0FBQTtJQUFBLGFBQUFHLGtCQUFBO01BQ0pDLE1BQU0sR0FBQUQsa0JBQUEsQ0FBQUgsT0FBQTtJQUFBLGFBQUFLLDJCQUFBO01BQ05DLGVBQWUsR0FBQUQsMkJBQUEsQ0FBQUwsT0FBQTtJQUFBO0lBQUFPLE9BQUEsV0FBQUEsQ0FBQTtNQUFBQyxPQUFBLFFBRVRDLEdBQUcsR0FBRyxTQUFOQSxHQUFHQSxDQUFhQyxVQUFVLEVBQUVDLFFBQVEsRUFBRUMsU0FBUyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRTtRQUN6RUgsUUFBUSxHQUFHYixDQUFDLENBQUNhLFFBQVEsQ0FBQztRQUN0QkMsU0FBUyxHQUFHZCxDQUFDLENBQUNjLFNBQVMsQ0FBQztRQUV4QixJQUFJLENBQUNGLFVBQVUsQ0FBQ0ssUUFB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