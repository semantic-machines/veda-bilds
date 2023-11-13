"use strict";

System.register(["../browser/check_browser.js", "../browser/notification_listener.js", "../browser/line_status_listener.js", "../browser/show_ttl.js", "../common/veda.js", "../common/lib/riot.js", "../common/individual_model.js", "../browser/notify.js", "../common/util.js", "../browser/dom_helpers.js"], function (_export, _context) {
  "use strict";

  var veda, riot, IndividualModel, notify, Util, delegateHandler, clear;
  function AppPresenter(manifest) {
    /**
     * Localize resources on the page on language change
     * @return {void}
     */
    veda.on('language:changed', function () {
      var resourcesNodes = document.querySelectorAll('[resource], [about]');
      var resources = Array.prototype.map.call(resourcesNodes, function (node) {
        return node.getAttribute('about') || node.getAttribute('resource');
      });
      resources = Util.unique(resources);
      resources.forEach(function (resource_uri) {
        var resource = new IndividualModel(resource_uri);
        for (var property_uri in resource.properties) {
          if (property_uri === '@') {
            continue;
          }
          if (resource.properties[property_uri] && resource.properties[property_uri].length && resource.properties[property_uri][0].type === 'String') {
            resource.trigger('propertyModified', property_uri, resource.get(property_uri));
            resource.trigger(property_uri, resource.get(property_uri));
          }
        }
      });
    });

    /**
     * Call router when anchor link is clicked
     * @param {Event} event - The click event
     * @this {Element} - The clicked element
     * @return {void}
     */
    function anchorHandler(event) {
      event.preventDefault();
      var hash = this.getAttribute('href');
      return hash === window.location.hash ? false : riot.route(hash);
    }
    delegateHandler(document.body, 'click', '[href^=\'#/\']', anchorHandler);

    // Prevent empty links routing
    delegateHandler(document.body, 'click', '[href=\'\']', function (event) {
      return event.preventDefault();
    });

    // Router installed flag
    var routerInstalled;

    /**
     * Install router
     * @param {Individual} main - The default individual to route if no hash is present
     * @return {void}
     */
    function installRouter(main) {
      if (routerInstalled) {
        return;
      }
      routerInstalled = true;

      /**
       * Router function
       * @param {string} hash - The route hash
       * @return {void}
       */
      riot.route(function (hash) {
        var loadIndicator = document.getElementById('load-indicator');
        var loadIndicatorTimer = setTimeout(function () {
          return loadIndicator.style.display = '';
        }, 250);
        if (typeof hash === 'string') {
          var hash_index = hash.indexOf('#');
          if (hash_index >= 0) {
            hash = hash.substring(hash_index);
          } else {
            var mainContainer = document.getElementById('main');
            clear(mainContainer);
            return main.present(mainContainer).then(function () {
              clearTimeout(loadIndicatorTimer);
              loadIndicator.style.display = 'none';
              veda.trigger('mainChanged', main.id);
            });
          }
        } else {
          var _mainContainer = document.getElementById('main');
          clear(_mainContainer);
          return main.present(_mainContainer).then(function () {
            clearTimeout(loadIndicatorTimer);
            loadIndicator.style.display = 'none';
            veda.trigger('mainChanged', main.id);
          });
        }
        var tokens = decodeURI(hash).slice(2).split('/');
        var uri = tokens[0];
        var container = tokens[1] || '#main';
        var template = tokens[2];
        var mode = tokens[3];
        var extra = tokens[4];
        if (extra) {
          extra = extra.split('&').reduce(function (acc, pair) {
            var split = pair.split('=');
            var name = split[0] || '';
            var values = split[1].split('|') || '';
            acc[name] = acc[name] || [];
            values.forEach(function (value) {
              return acc[name].push(parse(value));
            });
            return acc;
          }, {});
        }
        if (uri) {
          var individual = new IndividualModel(uri);
          var containerEl = document.querySelector(container);
          clear(containerEl);
          individual.present(containerEl, template, mode, extra).then(function () {
            clearTimeout(loadIndicatorTimer);
            loadIndicator.style.display = 'none';
            if (!individual.scroll) {
              window.scrollTo(0, 0);
            }
            if (containerEl.id === 'main') veda.trigger('mainChanged', uri);
          });
        } else {
          var _mainContainer2 = document.getElementById('main');
          clear(_mainContainer2);
          main.present(_mainContainer2).then(function () {
            clearTimeout(loadIndicatorTimer);
            loadIndicator.style.display = 'none';
            veda.trigger('mainChanged', main.id);
          });
        }
      });
    }

    /**
     * Parse extra params in hash
     * @param {string} value - The value to parse
     * @return {Individual|Date|string|number|boolean|null} - The parsed value
     */
    function parse(value) {
      if (!Number.isNaN(parseFloat(value.split(' ').join('').split(',').join('.')))) {
        return parseFloat(value.split(' ').join('').split(',').join('.'));
      }
      if (!Number.isNaN(Date.parse(value))) {
        return new Date(value);
      }
      if (value === 'true') {
        return true;
      }
      if (value === 'false') {
        return false;
      }
      var individual = new IndividualModel(value);
      if (individual.isSync() && !individual.isNew()) {
        return individual;
      }
      return value || null;
    }
    var starting = false;

    // Triggered in auth
    veda.on('started', function () {
      if (starting === true) return;
      starting = true;
      var loadIndicator = document.getElementById('load-indicator');
      loadIndicator.style.display = '';
      var layout_uri = manifest.veda_layout;
      var main_uri = manifest.veda_main;
      var start_url = manifest.start_url;
      var appContainer = document.getElementById('app');
      clear(appContainer);
      if (layout_uri && main_uri && start_url) {
        var layout = new IndividualModel(layout_uri);
        layout.present(appContainer).then(function () {
          return new IndividualModel(main_uri).load();
        }).then(installRouter).catch(function (error) {
          notify('danger', error);
        }).then(function () {
          return riot.route(window.location.hash || start_url);
        }).then(function () {
          return starting = false;
        });
      } else {
        console.log('Incomplete layout params in manifest');
        var layout_param_uri = veda.user.hasValue('v-s:origin', 'ExternalUser') ? 'cfg:LayoutExternal' : 'cfg:Layout';
        var layout_param = new IndividualModel(layout_param_uri);
        var main_param_uri = veda.user.hasValue('v-s:origin', 'ExternalUser') ? 'cfg:MainExternal' : 'cfg:Main';
        var main_param = new IndividualModel(main_param_uri);
        layout_param.load().then(function () {
          return layout_param['rdf:value'][0].load();
        }).then(function (layout) {
          return layout.present(appContainer);
        }).then(function () {
          return main_param.load();
        }).then(function () {
          return main_param['rdf:value'][0].load();
        }).then(installRouter).catch(function (error) {
          notify('danger', error);
        }).then(function () {
          return riot.route(window.location.hash);
        }).then(function () {
          return starting = false;
        });
      }
    });
  }
  _export("default", AppPresenter);
  return {
    setters: [function (_browserCheck_browserJs) {}, function (_browserNotification_listenerJs) {}, function (_browserLine_status_listenerJs) {}, function (_browserShow_ttlJs) {}, function (_commonVedaJs) {
      veda = _commonVedaJs.default;
    }, function (_commonLibRiotJs) {
      riot = _commonLibRiotJs.default;
    }, function (_commonIndividual_modelJs) {
      IndividualModel = _commonIndividual_modelJs.default;
    }, function (_browserNotifyJs) {
      notify = _browserNotifyJs.default;
    }, function (_commonUtilJs) {
      Util = _commonUtilJs.default;
    }, function (_browserDom_helpersJs) {
      delegateHandler = _browserDom_helpersJs.delegateHandler;
      clear = _browserDom_helpersJs.clear;
    }],
    execute: function () {}
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJBcHBQcmVzZW50ZXIiLCJtYW5pZmVzdCIsInZlZGEiLCJvbiIsInJlc291cmNlc05vZGVzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVzb3VyY2VzIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJtYXAiLCJjYWxsIiwibm9kZSIsImdldEF0dHJpYnV0ZSIsIlV0aWwiLCJ1bmlxdWUiLCJmb3JFYWNoIiwicmVzb3VyY2VfdXJpIiwicmVzb3VyY2UiLCJJbmRpdmlkdWFsTW9kZWwiLCJwcm9wZXJ0eV91cmkiLCJwcm9wZXJ0aWVzIiwibGVuZ3RoIiwidHlwZSIsInRyaWdnZXIiLCJnZXQiLCJhbmNob3JIYW5kbGVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImhhc2giLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInJpb3QiLCJyb3V0ZSIsImRlbGVnYXRlSGFuZGxlciIsImJvZHkiLCJyb3V0ZXJJbnN0YWxsZWQiLCJpbnN0YWxsUm91dGVyIiwibWFpbiIsImxvYWRJbmRpY2F0b3IiLCJnZXRFbGVtZW50QnlJZCIsImxvYWRJbmRpY2F0b3JUaW1lciIsInNldFRpbWVvdXQiLCJzdHlsZSIsImRpc3BsYXkiLCJoYXNoX2luZGV4IiwiaW5kZXhPZiIsInN1YnN0cmluZyIsIm1haW5Db250YWluZXIiLCJjbGVhciIsInByZXNlbnQiLCJ0aGVuIiwiY2xlYXJUaW1lb3V0IiwiaWQiLCJ0b2tlbnMiLCJkZWNvZGVVUkkiLCJzbGljZSIsInNwbGl0IiwidXJpIiwiY29udGFpbmVyIiwidGVtcGxhdGUiLCJtb2RlIiwiZXh0cmEiLCJyZWR1Y2UiLCJhY2MiLCJwYWlyIiwibmFtZSIsInZhbHVlcyIsInZhbHVlIiwicHVzaCIsInBhcnNlIiwiaW5kaXZpZHVhbCIsImNvbnRhaW5lckVsIiwicXVlcnlTZWxlY3RvciIsInNjcm9sbCIsInNjcm9sbFRvIiwiTnVtYmVyIiwiaXNOYU4iLCJwYXJzZUZsb2F0Iiwiam9pbiIsIkRhdGUiLCJpc1N5bmMiLCJpc05ldyIsInN0YXJ0aW5nIiwibGF5b3V0X3VyaSIsInZlZGFfbGF5b3V0IiwibWFpbl91cmkiLCJ2ZWRhX21haW4iLCJzdGFydF91cmwiLCJhcHBDb250YWluZXIiLCJsYXlvdXQiLCJsb2FkIiwiY2F0Y2giLCJlcnJvciIsIm5vdGlmeSIsImNvbnNvbGUiLCJsb2ciLCJsYXlvdXRfcGFyYW1fdXJpIiwidXNlciIsImhhc1ZhbHVlIiwibGF5b3V0X3BhcmFtIiwibWFpbl9wYXJhbV91cmkiLCJtYWluX3BhcmFtIiwiX2V4cG9ydCIsInNldHRlcnMiLCJfYnJvd3NlckNoZWNrX2Jyb3dzZXJKcyIsIl9icm93c2VyTm90aWZpY2F0aW9uX2xpc3RlbmVySnMiLCJfYnJvd3NlckxpbmVfc3RhdHVzX2xpc3RlbmVySnMiLCJfYnJvd3NlclNob3dfdHRsSnMiLCJfY29tbW9uVmVkYUpzIiwiZGVmYXVsdCIsIl9jb21tb25MaWJSaW90SnMiLCJfY29tbW9uSW5kaXZpZHVhbF9tb2RlbEpzIiwiX2Jyb3dzZXJOb3RpZnlKcyIsIl9jb21tb25VdGlsSnMiLCJfYnJvd3NlckRvbV9oZWxwZXJzSnMiLCJleGVjdXRlIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc291cmNlLXdlYi9qcy9icm93c2VyL2FwcF9wcmVzZW50ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBBcHBsaWNhdGlvbiBwcmVzZW50ZXIgbW9kdWxlXG4gKiBAbW9kdWxlIEFwcFByZXNlbnRlclxuICovXG5cbmltcG9ydCAnLi4vYnJvd3Nlci9jaGVja19icm93c2VyLmpzJztcbmltcG9ydCAnLi4vYnJvd3Nlci9ub3RpZmljYXRpb25fbGlzdGVuZXIuanMnO1xuaW1wb3J0ICcuLi9icm93c2VyL2xpbmVfc3RhdHVzX2xpc3RlbmVyLmpzJztcbmltcG9ydCAnLi4vYnJvd3Nlci9zaG93X3R0bC5qcyc7XG5pbXBvcnQgdmVkYSBmcm9tICcuLi9jb21tb24vdmVkYS5qcyc7XG5pbXBvcnQgcmlvdCBmcm9tICcuLi9jb21tb24vbGliL3Jpb3QuanMnO1xuaW1wb3J0IEluZGl2aWR1YWxNb2RlbCBmcm9tICcuLi9jb21tb24vaW5kaXZpZHVhbF9tb2RlbC5qcyc7XG5pbXBvcnQgbm90aWZ5IGZyb20gJy4uL2Jyb3dzZXIvbm90aWZ5LmpzJztcbmltcG9ydCBVdGlsIGZyb20gJy4uL2NvbW1vbi91dGlsLmpzJztcbmltcG9ydCB7ZGVsZWdhdGVIYW5kbGVyLCBjbGVhcn0gZnJvbSAnLi4vYnJvd3Nlci9kb21faGVscGVycy5qcyc7XG5cbi8qKlxuICogQXBwbGljYXRpb24gcHJlc2VudGVyXG4gKiBAcGFyYW0ge09iamVjdH0gbWFuaWZlc3QgLSBUaGUgbWFuaWZlc3Qgb2JqZWN0IGZvciB0aGUgYXBwbGljYXRpb25cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXBwUHJlc2VudGVyIChtYW5pZmVzdCkge1xuICAvKipcbiAgICogTG9jYWxpemUgcmVzb3VyY2VzIG9uIHRoZSBwYWdlIG9uIGxhbmd1YWdlIGNoYW5nZVxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgdmVkYS5vbignbGFuZ3VhZ2U6Y2hhbmdlZCcsICgpID0+IHtcbiAgICBjb25zdCByZXNvdXJjZXNOb2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyZXNvdXJjZV0sIFthYm91dF0nKTtcbiAgICBsZXQgcmVzb3VyY2VzID0gQXJyYXkucHJvdG90eXBlLm1hcC5jYWxsKHJlc291cmNlc05vZGVzLCAobm9kZSkgPT4gbm9kZS5nZXRBdHRyaWJ1dGUoJ2Fib3V0JykgfHwgbm9kZS5nZXRBdHRyaWJ1dGUoJ3Jlc291cmNlJykpO1xuICAgIHJlc291cmNlcyA9IFV0aWwudW5pcXVlKHJlc291cmNlcyk7XG4gICAgcmVzb3VyY2VzLmZvckVhY2goKHJlc291cmNlX3VyaSkgPT4ge1xuICAgICAgY29uc3QgcmVzb3VyY2UgPSBuZXcgSW5kaXZpZHVhbE1vZGVsKHJlc291cmNlX3VyaSk7XG4gICAgICBmb3IgKGNvbnN0IHByb3BlcnR5X3VyaSBpbiByZXNvdXJjZS5wcm9wZXJ0aWVzKSB7XG4gICAgICAgIGlmIChwcm9wZXJ0eV91cmkgPT09ICdAJykge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXNvdXJjZS5wcm9wZXJ0aWVzW3Byb3BlcnR5X3VyaV0gJiYgcmVzb3VyY2UucHJvcGVydGllc1twcm9wZXJ0eV91cmldLmxlbmd0aCAmJiByZXNvdXJjZS5wcm9wZXJ0aWVzW3Byb3BlcnR5X3VyaV1bMF0udHlwZSA9PT0gJ1N0cmluZycpIHtcbiAgICAgICAgICByZXNvdXJjZS50cmlnZ2VyKCdwcm9wZXJ0eU1vZGlmaWVkJywgcHJvcGVydHlfdXJpLCByZXNvdXJjZS5nZXQocHJvcGVydHlfdXJpKSk7XG4gICAgICAgICAgcmVzb3VyY2UudHJpZ2dlcihwcm9wZXJ0eV91cmksIHJlc291cmNlLmdldChwcm9wZXJ0eV91cmkpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICAvKipcbiAgICogQ2FsbCByb3V0ZXIgd2hlbiBhbmNob3IgbGluayBpcyBjbGlja2VkXG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gVGhlIGNsaWNrIGV2ZW50XG4gICAqIEB0aGlzIHtFbGVtZW50fSAtIFRoZSBjbGlja2VkIGVsZW1lbnRcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIGZ1bmN0aW9uIGFuY2hvckhhbmRsZXIgKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBoYXNoID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICByZXR1cm4gKGhhc2ggPT09IHdpbmRvdy5sb2NhdGlvbi5oYXNoID8gZmFsc2UgOiByaW90LnJvdXRlKGhhc2gpKTtcbiAgfVxuICBkZWxlZ2F0ZUhhbmRsZXIoZG9jdW1lbnQuYm9keSwgJ2NsaWNrJywgJ1tocmVmXj1cXCcjL1xcJ10nLCBhbmNob3JIYW5kbGVyKTtcblxuICAvLyBQcmV2ZW50IGVtcHR5IGxpbmtzIHJvdXRpbmdcbiAgZGVsZWdhdGVIYW5kbGVyKGRvY3VtZW50LmJvZHksICdjbGljaycsICdbaHJlZj1cXCdcXCddJywgKGV2ZW50KSA9PiBldmVudC5wcmV2ZW50RGVmYXVsdCgpKTtcblxuICAvLyBSb3V0ZXIgaW5zdGFsbGVkIGZsYWdcbiAgbGV0IHJvdXRlckluc3RhbGxlZDtcblxuICAvKipcbiAgICogSW5zdGFsbCByb3V0ZXJcbiAgICogQHBhcmFtIHtJbmRpdmlkdWFsfSBtYWluIC0gVGhlIGRlZmF1bHQgaW5kaXZpZHVhbCB0byByb3V0ZSBpZiBubyBoYXNoIGlzIHByZXNlbnRcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIGZ1bmN0aW9uIGluc3RhbGxSb3V0ZXIgKG1haW4pIHtcbiAgICBpZiAocm91dGVySW5zdGFsbGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcm91dGVySW5zdGFsbGVkID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIFJvdXRlciBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBoYXNoIC0gVGhlIHJvdXRlIGhhc2hcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHJpb3Qucm91dGUoKGhhc2gpID0+IHtcbiAgICAgIGNvbnN0IGxvYWRJbmRpY2F0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9hZC1pbmRpY2F0b3InKTtcbiAgICAgIGNvbnN0IGxvYWRJbmRpY2F0b3JUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4gbG9hZEluZGljYXRvci5zdHlsZS5kaXNwbGF5ID0gJycsIDI1MCk7XG5cbiAgICAgIGlmICh0eXBlb2YgaGFzaCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29uc3QgaGFzaF9pbmRleCA9IGhhc2guaW5kZXhPZignIycpO1xuICAgICAgICBpZiAoaGFzaF9pbmRleCA+PSAwKSB7XG4gICAgICAgICAgaGFzaCA9IGhhc2guc3Vic3RyaW5nKGhhc2hfaW5kZXgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IG1haW5Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbicpO1xuICAgICAgICAgIGNsZWFyKG1haW5Db250YWluZXIpO1xuICAgICAgICAgIHJldHVybiBtYWluLnByZXNlbnQobWFpbkNvbnRhaW5lcikudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQobG9hZEluZGljYXRvclRpbWVyKTtcbiAgICAgICAgICAgIGxvYWRJbmRpY2F0b3Iuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIHZlZGEudHJpZ2dlcignbWFpbkNoYW5nZWQnLCBtYWluLmlkKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbWFpbkNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluJyk7XG4gICAgICAgIGNsZWFyKG1haW5Db250YWluZXIpO1xuICAgICAgICByZXR1cm4gbWFpbi5wcmVzZW50KG1haW5Db250YWluZXIpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGNsZWFyVGltZW91dChsb2FkSW5kaWNhdG9yVGltZXIpO1xuICAgICAgICAgIGxvYWRJbmRpY2F0b3Iuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICB2ZWRhLnRyaWdnZXIoJ21haW5DaGFuZ2VkJywgbWFpbi5pZCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB0b2tlbnMgPSBkZWNvZGVVUkkoaGFzaCkuc2xpY2UoMikuc3BsaXQoJy8nKTtcbiAgICAgIGNvbnN0IHVyaSA9IHRva2Vuc1swXTtcbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRva2Vuc1sxXSB8fCAnI21haW4nO1xuICAgICAgY29uc3QgdGVtcGxhdGUgPSB0b2tlbnNbMl07XG4gICAgICBjb25zdCBtb2RlID0gdG9rZW5zWzNdO1xuICAgICAgbGV0IGV4dHJhID0gdG9rZW5zWzRdO1xuICAgICAgaWYgKGV4dHJhKSB7XG4gICAgICAgIGV4dHJhID0gZXh0cmEuc3BsaXQoJyYnKS5yZWR1Y2UoKGFjYywgcGFpcikgPT4ge1xuICAgICAgICAgIGNvbnN0IHNwbGl0ID0gcGFpci5zcGxpdCgnPScpO1xuICAgICAgICAgIGNvbnN0IG5hbWUgPSBzcGxpdFswXSB8fCAnJztcbiAgICAgICAgICBjb25zdCB2YWx1ZXMgPSBzcGxpdFsxXS5zcGxpdCgnfCcpIHx8ICcnO1xuICAgICAgICAgIGFjY1tuYW1lXSA9IGFjY1tuYW1lXSB8fCBbXTtcbiAgICAgICAgICB2YWx1ZXMuZm9yRWFjaCgodmFsdWUpID0+IGFjY1tuYW1lXS5wdXNoKHBhcnNlKHZhbHVlKSkpO1xuICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIHt9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHVyaSkge1xuICAgICAgICBjb25zdCBpbmRpdmlkdWFsID0gbmV3IEluZGl2aWR1YWxNb2RlbCh1cmkpO1xuICAgICAgICBjb25zdCBjb250YWluZXJFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyKTtcbiAgICAgICAgY2xlYXIoY29udGFpbmVyRWwpO1xuICAgICAgICBpbmRpdmlkdWFsLnByZXNlbnQoY29udGFpbmVyRWwsIHRlbXBsYXRlLCBtb2RlLCBleHRyYSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KGxvYWRJbmRpY2F0b3JUaW1lcik7XG4gICAgICAgICAgbG9hZEluZGljYXRvci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgIGlmICghaW5kaXZpZHVhbC5zY3JvbGwpIHtcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNvbnRhaW5lckVsLmlkID09PSAnbWFpbicpIHZlZGEudHJpZ2dlcignbWFpbkNoYW5nZWQnLCB1cmkpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG1haW5Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbicpO1xuICAgICAgICBjbGVhcihtYWluQ29udGFpbmVyKTtcbiAgICAgICAgbWFpbi5wcmVzZW50KG1haW5Db250YWluZXIpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGNsZWFyVGltZW91dChsb2FkSW5kaWNhdG9yVGltZXIpO1xuICAgICAgICAgIGxvYWRJbmRpY2F0b3Iuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICB2ZWRhLnRyaWdnZXIoJ21haW5DaGFuZ2VkJywgbWFpbi5pZCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlIGV4dHJhIHBhcmFtcyBpbiBoYXNoXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBwYXJzZVxuICAgKiBAcmV0dXJuIHtJbmRpdmlkdWFsfERhdGV8c3RyaW5nfG51bWJlcnxib29sZWFufG51bGx9IC0gVGhlIHBhcnNlZCB2YWx1ZVxuICAgKi9cbiAgZnVuY3Rpb24gcGFyc2UgKHZhbHVlKSB7XG4gICAgaWYgKCFOdW1iZXIuaXNOYU4ocGFyc2VGbG9hdCh2YWx1ZS5zcGxpdCgnICcpLmpvaW4oJycpLnNwbGl0KCcsJykuam9pbignLicpKSkpIHtcbiAgICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlLnNwbGl0KCcgJykuam9pbignJykuc3BsaXQoJywnKS5qb2luKCcuJykpO1xuICAgIH1cbiAgICBpZiAoIU51bWJlci5pc05hTihEYXRlLnBhcnNlKHZhbHVlKSkpIHtcbiAgICAgIHJldHVybiBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgfVxuICAgIGlmICh2YWx1ZSA9PT0gJ3RydWUnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHZhbHVlID09PSAnZmFsc2UnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGluZGl2aWR1YWwgPSBuZXcgSW5kaXZpZHVhbE1vZGVsKHZhbHVlKTtcbiAgICBpZiAoaW5kaXZpZHVhbC5pc1N5bmMoKSAmJiAhaW5kaXZpZHVhbC5pc05ldygpKSB7XG4gICAgICByZXR1cm4gaW5kaXZpZHVhbDtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWUgfHwgbnVsbDtcbiAgfVxuXG4gIGxldCBzdGFydGluZyA9IGZhbHNlO1xuXG4gIC8vIFRyaWdnZXJlZCBpbiBhdXRoXG4gIHZlZGEub24oJ3N0YXJ0ZWQnLCAoKSA9PiB7XG4gICAgaWYgKHN0YXJ0aW5nID09PSB0cnVlKSByZXR1cm47XG4gICAgc3RhcnRpbmcgPSB0cnVlO1xuXG4gICAgY29uc3QgbG9hZEluZGljYXRvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2FkLWluZGljYXRvcicpO1xuICAgIGxvYWRJbmRpY2F0b3Iuc3R5bGUuZGlzcGxheSA9ICcnO1xuXG4gICAgY29uc3QgbGF5b3V0X3VyaSA9IG1hbmlmZXN0LnZlZGFfbGF5b3V0O1xuICAgIGNvbnN0IG1haW5fdXJpID0gbWFuaWZlc3QudmVkYV9tYWluO1xuICAgIGNvbnN0IHtzdGFydF91cmx9ID0gbWFuaWZlc3Q7XG4gICAgY29uc3QgYXBwQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpO1xuICAgIGNsZWFyKGFwcENvbnRhaW5lcik7XG4gICAgaWYgKGxheW91dF91cmkgJiYgbWFpbl91cmkgJiYgc3RhcnRfdXJsKSB7XG4gICAgICBjb25zdCBsYXlvdXQgPSBuZXcgSW5kaXZpZHVhbE1vZGVsKGxheW91dF91cmkpO1xuICAgICAgbGF5b3V0LnByZXNlbnQoYXBwQ29udGFpbmVyKVxuICAgICAgICAudGhlbigoKSA9PiBuZXcgSW5kaXZpZHVhbE1vZGVsKG1haW5fdXJpKS5sb2FkKCkpXG4gICAgICAgIC50aGVuKGluc3RhbGxSb3V0ZXIpXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICBub3RpZnkoJ2RhbmdlcicsIGVycm9yKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4gcmlvdC5yb3V0ZSh3aW5kb3cubG9jYXRpb24uaGFzaCB8fCBzdGFydF91cmwpKVxuICAgICAgICAudGhlbigoKSA9PiBzdGFydGluZyA9IGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ0luY29tcGxldGUgbGF5b3V0IHBhcmFtcyBpbiBtYW5pZmVzdCcpO1xuICAgICAgY29uc3QgbGF5b3V0X3BhcmFtX3VyaSA9IHZlZGEudXNlci5oYXNWYWx1ZSgndi1zOm9yaWdpbicsICdFeHRlcm5hbFVzZXInKSA/ICdjZmc6TGF5b3V0RXh0ZXJuYWwnIDogJ2NmZzpMYXlvdXQnO1xuICAgICAgY29uc3QgbGF5b3V0X3BhcmFtID0gbmV3IEluZGl2aWR1YWxNb2RlbChsYXlvdXRfcGFyYW1fdXJpKTtcbiAgICAgIGNvbnN0IG1haW5fcGFyYW1fdXJpID0gdmVkYS51c2VyLmhhc1ZhbHVlKCd2LXM6b3JpZ2luJywgJ0V4dGVybmFsVXNlcicpID8gJ2NmZzpNYWluRXh0ZXJuYWwnIDogJ2NmZzpNYWluJztcbiAgICAgIGNvbnN0IG1haW5fcGFyYW0gPSBuZXcgSW5kaXZpZHVhbE1vZGVsKG1haW5fcGFyYW1fdXJpKTtcbiAgICAgIGxheW91dF9wYXJhbS5sb2FkKClcbiAgICAgICAgLnRoZW4oKCkgPT4gbGF5b3V0X3BhcmFtWydyZGY6dmFsdWUnXVswXS5sb2FkKCkpXG4gICAgICAgIC50aGVuKChsYXlvdXQpID0+IGxheW91dC5wcmVzZW50KGFwcENvbnRhaW5lcikpXG4gICAgICAgIC50aGVuKCgpID0+IG1haW5fcGFyYW0ubG9hZCgpKVxuICAgICAgICAudGhlbigoKSA9PiBtYWluX3BhcmFtWydyZGY6dmFsdWUnXVswXS5sb2FkKCkpXG4gICAgICAgIC50aGVuKGluc3RhbGxSb3V0ZXIpXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICBub3RpZnkoJ2RhbmdlcicsIGVycm9yKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4gcmlvdC5yb3V0ZSh3aW5kb3cubG9jYXRpb24uaGFzaCkpXG4gICAgICAgIC50aGVuKCgpID0+IHN0YXJ0aW5nID0gZmFsc2UpO1xuICAgIH1cbiAgfSk7XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztFQW9CZSxTQUFTQSxZQUFZQSxDQUFFQyxRQUFRLEVBQUU7SUFDOUM7QUFDRjtBQUNBO0FBQ0E7SUFDRUMsSUFBSSxDQUFDQyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsWUFBTTtNQUNoQyxJQUFNQyxjQUFjLEdBQUdDLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMscUJBQXFCLENBQUM7TUFDdkUsSUFBSUMsU0FBUyxHQUFHQyxLQUFLLENBQUNDLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDQyxJQUFJLENBQUNQLGNBQWMsRUFBRSxVQUFDUSxJQUFJO1FBQUEsT0FBS0EsSUFBSSxDQUFDQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUlELElBQUksQ0FBQ0MsWUFBWSxDQUFDLFVBQVUsQ0FBQztNQUFBLEVBQUM7TUFDL0hOLFNBQVMsR0FBR08sSUFBSSxDQUFDQyxNQUFNLENBQUNSLFNBQVMsQ0FBQztNQUNsQ0EsU0FBUyxDQUFDUyxPQUFPLENBQUMsVUFBQ0MsWUFBWSxFQUFLO1FBQ2xDLElBQU1DLFFBQVEsR0FBRyxJQUFJQyxlQUFlLENBQUNGLFlBQVksQ0FBQztRQUNsRCxLQUFLLElBQU1HLFlBQVksSUFBSUYsUUFBUSxDQUFDRyxVQUFVLEVBQUU7VUFDOUMsSUFBSUQsWUFBWSxLQUFLLEdBQUcsRUFBRTtZQUN4QjtVQUNGO1VBQ0EsSUFBSUYsUUFBUSxDQUFDRyxVQUFVLENBQUNELFlBQVksQ0FBQyxJQUFJRixRQUFRLENBQUNHLFVBQVUsQ0FBQ0QsWUFBWSxDQUFDLENBQUNFLE1BQU0sSUFBSUosUUFBUSxDQUFDRyxVQUFVLENBQUNELFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDRyxJQUFJLEtBQUssUUFBUSxF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