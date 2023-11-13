"use strict";

System.register(["/js/common/util.js", "jquery", "/js/common/individual_model.js", "riot", "touchswipe"], function (_export, _context) {
  "use strict";

  var CommonUtil, $, IndividualModel, riot, pre, post, html;
  return {
    setters: [function (_jsCommonUtilJs) {
      CommonUtil = _jsCommonUtilJs.default;
    }, function (_jquery) {
      $ = _jquery.default;
    }, function (_jsCommonIndividual_modelJs) {
      IndividualModel = _jsCommonIndividual_modelJs.default;
    }, function (_riot) {
      riot = _riot.default;
    }, function (_touchswipe) {}],
    execute: function () {
      _export("pre", pre = function pre(individual, template, container, mode) {
        template = $(template);
        container = $(container);
        var self = individual;
        var searchBlankTemplate = self.hasValue('v-fs:searchBlankTemplate') ? self['v-fs:searchBlankTemplate'][0] : undefined;
        var searchResultTemplate = self.hasValue('v-fs:searchResultTemplate') ? self['v-fs:searchResultTemplate'][0] : undefined;
        var searchResultContainer = $('.search-result', template);
        if (!searchBlankTemplate) {
          $('.results-load-buttons', template).detach().appendTo(template);
          $('.params', template).remove();
          $('.caption', template).removeClass('hidden');
        }
        if (this.hasValue('v-fs:loadAll', true)) {
          $('.no-more-results', template).remove();
        }

        // Enable swipe for result table
        $('body').keydown(enableSwipe).keyup(disableSwipe);
        template.one('remove', function () {
          $('body').off('keydown', enableSwipe).off('keyup', disableSwipe);
        });
        function disableSwipe(e) {
          if (e.which === 17) {
            $('.search-result', template).addClass('noSwipe').removeClass('swipe');
          }
        }
        function enableSwipe(e) {
          if (e.ctrlKey) {
            $('.search-result', template).addClass('swipe').removeClass('noSwipe');
          }
        }
        var prevDistance = 0;
        var delta = 0;
        $('.search-result', template).swipe({
          swipeStatus: function swipeStatus(event, phase, direction, distance, duration) {
            if (phase === 'move' && event.ctrlKey === true) {
              this.css('cursor', 'move');
              if (direction === 'left') {
                delta = distance - prevDistance;
                prevDistance = distance;
                this.scrollLeft(this.scrollLeft() + delta);
              } else if (direction === 'right') {
                delta = distance - prevDistance;
                prevDistance = distance;
                this.scrollLeft(this.scrollLeft() - delta);
              } else if (direction === 'up') {
                window.scrollBy(0, distance);
              } else if (direction === 'down') {
                window.scrollBy(0, -distance);
              }
            } else {
              prevDistance = 0;
              delta = 0;
              this.css('cursor', '');
            }
          }
        });
        template.one('remove', function () {
          prevDistance = null;
          delta = null;
          $('.search-result', template).swipe('destroy');
        });
        if (!searchResultTemplate) {
          $('.stats-top, .stats-bottom, .result-header', template).remove();
          searchResultTemplate = new IndividualModel('v-fs:MinimalSearchResultTemplate');
        }
        return searchResultTemplate.load().then(function (searchResultTemplate) {
          var templateString = searchResultTemplate['v-ui:template'][0].toString();
          return function (specifier) {
            return new Promise(function (r) {
              return r(_context.import("".concat(specifier)));
            });
          }('/templates/' + templateString);
        }).then(function (templateModule) {
          var searchResultTemplate = $(templateModule.html);
          var resultContainer = $('.result-container', searchResultTemplate);
          var pre_result = templateModule.pre != undefined ? templateModule.pre.call(individual, individual, searchResultTemplate, searchResultContainer, mode) : undefined;
          return Promise.resolve(pre_result).then(function () {
            if (resultContainer.attr('data-template')) {
              var resultTemplateIndividual = new IndividualModel(resultContainer.attr('data-template'));
              resultContainer.empty();
              return resultTemplateIndividual.load().then(function (resultTemplateIndividual) {
                var tmplString = resultTemplateIndividual['v-ui:template'][0];
                return function (specifier) {
                  return new Promise(function (r) {
                    return r(_context.import(specifier));
                  });
                }("/templates/".concat(tmplString));
              }).then(function (templateObj) {
                if (templateObj.post != undefined) individual.resultTemplatePost = templateObj.post;
                var resultTemplate = templateObj.html.toString();
                individual.resultTemplate = resultTemplate;
                searchResultContainer.append(searchResultTemplate);
              });
            } else {
              var resultTemplate = resultContainer.html();
              resultContainer.empty();
              individual.resultTemplate = resultTemplate;
              searchResultContainer.append(searchResultTemplate);
            }
          });
        });
      });
      _export("post", post = function post(individual, template, container, mode) {
        template = $(template);
        container = $(container);

        // Make position fixed for buttons bar that doesn't fit the window
        function checkOffset(main, actions, actionsStaticHeight, placeholder) {
          var mainTop = main.offset().top;
          var mainHeight = main.height();
          var windowHeight = window.innerHeight;
          var windowTop = window.scrollY || window.pageYOffset;
          var actionsStaticTop = placeholder.offset().top;
          var actions_inside_viewport = windowTop <= actionsStaticTop && actionsStaticTop < windowTop + windowHeight;
          var main_inside_viewport = windowTop <= mainTop + mainHeight - actionsStaticHeight && mainTop + actionsStaticHeight < windowTop + windowHeight;
          if (!actions_inside_viewport && main_inside_viewport) {
            if (!actions.hasClass('actions-fixed')) {
              placeholder.css('height', actionsStaticHeight);
              actions.find('br').addClass('hidden');
              actions.addClass('actions-fixed');
            }
          } else {
            if (actions.hasClass('actions-fixed')) {
              placeholder.css('height', 0);
              actions.find('br').removeClass('hidden');
              actions.removeClass('actions-fixed');
            }
          }
        }
        setTimeout(function () {
          var main = template;
          var actions = $('.search-actions', template);
          if (!actions.length) {
            return;
          }
          var actionsStaticHeight = actions.height();
          var placeholder = $('<div></div>').insertBefore(actions);
          checkOffset(main, actions, actionsStaticHeight, placeholder);
          $(window).on('scroll', scrollHandler);
          template.one('remove', function () {
            $(window).off('scroll', scrollHandler);
          });
          function scrollHandler() {
            checkOffset(main, actions, actionsStaticHeight, placeholder);
          }
        }, 500);
        var self = individual;
        var searchBlankContainer = $('.search-form', template);
        var searchResultContainer = $('.search-result', template);
        var searchButton = $('#search-button.search-button', template);
        var moreResults = $('.more-results', template);
        var allResults = $('.all-results', template);
        var noMoreResults = $('.no-more-results', template);
        var searchError = $('.search-error', template);
        var searchBlank = self.hasValue('v-fs:searchBlank') ? self['v-fs:searchBlank'][0] : undefined;
        var searchBlankTemplate = self.hasValue('v-fs:searchBlankTemplate') ? self['v-fs:searchBlankTemplate'][0] : undefined;
        var resultContainer = $('.result-container', template);
        var notFound = $('.not-found', template);

        //  Set columns
        individual.hiddenColumns = individual.hiddenColumns || {};
        var checksContainer = $('.set-columns-wrapper .dropdown-menu', template).on('click', function (e) {
          e.stopPropagation();
        });
        var isHasVisibleColumns = individual.hasValue('v-fs:hasVisibleColumns');
        var checkTmpl = $('.set-columns-wrapper .dropdown-menu .checkbox', template).remove();
        if (checkTmpl.length) {
          checkTmpl = checkTmpl.get(0).outerHTML;
          $('.search-result table > thead > tr:last > th', template).each(function (index) {
            var th = $(this);
            var check = $(checkTmpl);
            var checkbox = $('input', check);
            var columnName = $(this).find('span').clone();
            if (columnName.length) {
              $('.column-name', check).html(columnName);
            } else {
              $('.column-name', check).text(th.text());
            }
            var aboutAttr = columnName.attr('about');
            if (aboutAttr != undefined && isHasVisibleColumns) {
              var isVisible = individual['v-fs:hasVisibleColumns'].some(function (col) {
                return col.id == aboutAttr;
              });
              if (!isVisible) individual.hiddenColumns[index] = true;
            }
            if (index in individual.hiddenColumns) {
              checkbox.prop('checked', false);
            } else {
              checkbox.prop('checked', true);
            }
            checkbox.change(checkHandler);
            checkHandler.call(checkbox.get(0));
            checksContainer.append(check);
            // Show/hide result table columns & update resultTemplate accordingly
            function checkHandler() {
              individual.resultTemplate = $(individual.resultTemplate);
              if ($(this).is(':checked')) {
                th.removeClass('hidden');
                $('tr td:nth-child(' + (index + 1) + ')', resultContainer).removeClass('hidden');
                individual.resultTemplate.not('script').children().eq(index).removeClass('hidden');
                delete individual.hiddenColumns[index];
              } else {
                th.addClass('hidden');
                $('tr td:nth-child(' + (index + 1) + ')', resultContainer).addClass('hidden');
                individual.resultTemplate.not('script').children().eq(index).addClass('hidden');
                individual.hiddenColumns[index] = true;
              }
              individual.resultTemplate = individual.resultTemplate.map(function () {
                return this.outerHTML;
              }).get().join('');
            }
          });
        }

        // Remember scroll position
        template.one('remove', function () {
          self.scroll = $(window).scrollTop();
        });

        // Scroll to position
        function scrollTo(position) {
          if (position > 0) {
            $('html, body').animate({
              scrollTop: position
            });
          }
        }
        function showError() {
          searchError.removeClass('hidden');
        }
        function hideError() {
          searchError.addClass('hidden');
        }

        // Search handler
        function searchHandler() {
          var searchButtons = $('.search-button', template);
          hideError();
          toggleSpin(searchButtons);
          self.search().then(renderResult).then(clearSelected).then(function () {
            var position = self.scroll || $('.results', template).offset().top;
            scrollTo(position);
            delete self.scroll;
            toggleSpin(searchButtons);
          }).catch(function (error) {
            console.error('Search handler failed');
            toggleSpin(searchButtons);
            showError();
          });
        }
        self.on('search', searchHandler);
        template.one('remove', function () {
          self.off('search', searchHandler);
        });

        // Search button handler
        searchButton.click(searchHandler);

        // Ctrl + Enter triggers search
        function ctrlEnterHandler(e) {
          if (e.ctrlKey && e.keyCode === 13) {
            searchHandler();
          }
        }
        $(window).on('keyup', ctrlEnterHandler);
        template.one('remove', function () {
          $(window).off('keyup', ctrlEnterHandler);
        });

        // More results handler
        function moreResultsHandler() {
          toggleSpin(moreResults);
          return self.search(self['v-fs:cursor'][0]).then(renderResult).then(function () {
            toggleSpin(moreResults);
          }).catch(function (error) {
            console.error('More results failed');
            showError();
            toggleSpin(moreResults);
            throw error;
          });
        }

        // More results button
        moreResults.click(moreResultsHandler);

        // All results button
        allResults.click(function () {
          var warn = new IndividualModel('v-s:AreYouSure')['rdfs:label'].map(CommonUtil.formatValue).join(' ');
          if (self['v-fs:estimated'][0] - self['v-fs:cursor'][0] < 100 || confirm(warn)) {
            loadAll();
          }
        });
        function loadAll() {
          if (self['v-fs:cursor'][0] < self['v-fs:estimated'][0] && template.is(':visible')) {
            moreResultsHandler().then(loadAll).catch(function (error) {
              console.error('All results failed');
            });
          }
        }

        // Double click on result table row routes to search result
        $('.search-result', template).on('dblclick', '.result-container > [resource]', function () {
          var uri = $(this).attr('resource');
          riot.route('#/' + uri);
        });
        // Mark clicked row
        $('.search-result', template).on('click', '.result-container > [resource]', function () {
          var that = $(this);
          that.addClass('marked').siblings('.marked').removeClass('marked');
          self.marked = that.attr('resource');
        });

        // Manage sort
        var sortBy = '';
        var dir = '';
        var tmp = self['v-fs:sortOrder'][0].split(' ');
        sortBy = tmp[0];
        dir = tmp[1];
        $('.orderby', template).each(function () {
          var header = $(this);
          var a = $("<a href='#' class='text-muted glyphicon glyphicon-sort-by-attributes'></a>");
          header.prepend(a, ' ');
          var property_uri = header.attr('data-orderby');
          if (sortBy.indexOf(property_uri) >= 0) {
            a.removeClass('text-muted');
            if (dir === 'desc') {
              a.removeClass('glyphicon-sort-by-attributes').addClass('glyphicon-sort-by-attributes-alt');
            }
          }
          a.click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            var $this = $(this);
            $('.orderby a', template).addClass('text-muted');
            var dir = $this.hasClass('glyphicon-sort-by-attributes-alt') ? 'asc' : 'desc';
            $this.removeClass('text-muted').toggleClass('glyphicon-sort-by-attributes glyphicon-sort-by-attributes-alt');
            self['v-fs:sortOrder'] = ["'" + property_uri + "' " + dir];
            searchHandler.call(this);
          });
        });

        // Select results
        var toggleSelectAll = searchResultContainer.find('.toggle-select-all');
        searchResultContainer.on('click', '.toggle-select', toggleSelect);
        toggleSelectAll.click(function () {
          var selectedL = self['v-fs:selected'].length;
          var resultsL = resultContainer.children().length;
          if (resultsL !== 0 && selectedL !== 0) {
            clearSelected();
          } else if (resultsL !== 0 && selectedL === 0) {
            selectAll();
          }
          setToggleSelectAll();
        });
        function setToggleSelectAll() {
          var selectedL = self['v-fs:selected'].length;
          var resultsL = resultContainer.children().length;
          if (resultsL !== 0 && resultsL === selectedL) {
            toggleSelectAll.prop('checked', true);
            toggleSelectAll.prop('indeterminate', false);
          } else if (resultsL !== 0 && selectedL !== 0 && resultsL !== selectedL) {
            toggleSelectAll.prop('indeterminate', true);
          } else if (selectedL === 0) {
            toggleSelectAll.prop('indeterminate', false);
            toggleSelectAll.prop('checked', false);
          }
        }
        function clearSelected() {
          self.clearValue('v-fs:selected');
          searchResultContainer.find('.toggle-select:checked').prop('checked', false);
        }
        function selectAll() {
          self.clearValue('v-fs:selected');
          searchResultContainer.find('.toggle-select').prop('checked', true).each(function () {
            var result_uri = $(this).closest('[resource]').attr('resource');
            self.addValue('v-fs:selected', new IndividualModel(result_uri));
          });
        }
        function toggleSelect() {
          var $this = $(this);
          var result_uri = $this.closest('[resource]').attr('resource');
          var result = new IndividualModel(result_uri);
          if ($this.is(':checked')) {
            self.addValue('v-fs:selected', result);
          } else {
            self.removeValue('v-fs:selected', result);
          }
        }
        self.on('v-fs:selected', setToggleSelectAll);
        template.one('remove', function () {
          self.off('v-fs:selected', setToggleSelectAll);
        });

        // Render result
        function renderResult(resultDelta) {
          $('.results', template).removeClass('hidden');

          // Toggle "more results" button & "no more results" alert
          if (self['v-fs:cursor'][0] === self['v-fs:estimated'][0]) {
            moreResults.addClass('hidden');
            allResults.addClass('hidden');
            noMoreResults.removeClass('hidden');
          } else {
            moreResults.removeClass('hidden');
            allResults.removeClass('hidden');
            noMoreResults.addClass('hidden');
          }
          // Toggle "not found" alert & "no more results" alert
          if (resultDelta.length) {
            notFound.addClass('hidden');
          } else {
            notFound.removeClass('hidden');
            noMoreResults.addClass('hidden');
          }

          // Render each result
          var total = self['v-fs:authorized'][0];
          var delta = resultDelta.length;

          // New search triggered
          if (total === delta) {
            resultContainer.empty();
          }
          return resultDelta.reduce(function (p, result, i) {
            return p.then(function (templates) {
              return result.present(resultContainer, individual.resultTemplate, undefined, undefined, false).then(function (tmpl) {
                var post_result = individual.resultTemplatePost != undefined ? individual.resultTemplatePost.call(result, result, tmpl, resultContainer, mode) : undefined;
                return Promise.resolve(post_result).then(function () {
                  tmpl = $(tmpl);
                  $('.serial-number', tmpl).text(total - delta + i + 1);
                  if (result.id === self.marked) {
                    tmpl.addClass('marked');
                  }
                  tmpl.find('.toggle-select').prop('checked', self.hasValue('v-fs:selected', result));
                  $('td', tmpl).each(function () {
                    var text = this.innerText || this.textContent;
                    if (text && text.length > 100) {
                      var $this = $(this);
                      var contents = $this.contents();
                      var wrapper = $("<div class='td-wrapper'></div>").append(contents);
                      $this.empty().append(wrapper);
                      wrapper.popover({
                        content: wrapper.html(),
                        html: true,
                        placement: 'top'
                      }).tooltip({
                        title: new IndividualModel('v-fs:ClickToViewContent')['rdfs:label'].map(CommonUtil.formatValue).join(' '),
                        placement: 'bottom',
                        delay: {
                          show: 750,
                          hide: 0
                        }
                      });
                    }
                  });
                  templates.push(tmpl);
                  return templates;
                });
              });
            });
          }, Promise.resolve([])).then(function (templates) {
            return resultContainer.append(templates);
          }).then(setToggleSelectAll);
        }

        // Spinner
        function toggleSpin(el) {
          var $el = $(el);
          var hasSpinner = $el.children('.fa-spinner');
          if (hasSpinner.length) {
            $el.removeClass('disabled');
            hasSpinner.remove();
          } else {
            $el.addClass('disabled');
            $("<i class='fa fa-spinner fa-pulse fa-lg fa-fw'></i>").appendTo(el);
          }
        }

        // Read extra parameters from URL
        var hash = window.location.hash;
        var tokens = decodeURI(hash).slice(2).split('/');
        var uri = tokens[0];
        var extra = tokens[4];
        if (uri === self.id) {
          if (extra) {
            extra = extra.split('&').reduce(function (acc, pair) {
              var split = pair.split('=');
              var property_uri = split[0] || '';
              var values = split[1].split('|') || '';
              acc[property_uri] = acc[property_uri] || [];
              values.forEach(function (value) {
                acc[property_uri].push(parse(property_uri, value));
              });
              return acc;
            }, {});
          }
        }
        function parse(property_uri, value) {
          var property = new IndividualModel(property_uri);
          var range = property.hasValue('rdfs:range') ? property['rdfs:range'][0].id : 'rdfs:Resource';
          var parsed;
          switch (range) {
            case 'xsd:string':
              parsed = value;
              break;
            case 'xsd:integer':
            case 'xsd:decimal':
              parsed = parseFloat(value.split(' ').join('').split(',').join('.'));
              break;
            case 'xsd:boolean':
              parsed = value === 'true';
              break;
            case 'xsd:dateTime':
              parsed = new Date(value);
              break;
            default:
              parsed = new IndividualModel(value);
          }
          return parsed;
        }

        // Render search form
        return Promise.resolve().then(function () {
          if (searchBlank) {
            return searchBlank.load().then(function (searchBlank) {
              $('#reset-button.reset-button', template).click(function () {
                searchBlank.object.off('*');
                delete searchBlank.object;
                resetBlank();
                hideResults();
                hideError();
              });
              return setupBlank();
            });
          } else {
            $('.params', template).remove();
            $('#reset-button.reset-button', template).remove();
          }
          function setupBlank() {
            return searchBlank.initBlank().then(function (blankObject) {
              blankObject.on('propertyModified', hideResults);
              template.one('remove', function () {
                blankObject.off('propertyModified', hideResults);
              });
              // Populate blank with extra parameters from URL
              if (extra) {
                for (var property_uri in extra) {
                  if (Object.prototype.hasOwnProperty.call(extra, property_uri)) {
                    blankObject[property_uri] = extra[property_uri];
                  }
                }
              }
              if (searchBlankTemplate && searchBlankContainer.length) {
                searchBlankContainer.empty();
                return blankObject.present(searchBlankContainer, searchBlankTemplate, 'search');
              }
            });
          }
          function resetBlank() {
            return searchBlank.resetBlank().then(function (blankObject) {
              blankObject.on('propertyModified', hideResults);
              template.one('remove', function () {
                blankObject.off('propertyModified', hideResults);
              });
              // Populate blank with extra parameters from URL
              if (extra) {
                for (var property_uri in extra) {
                  if (Object.prototype.hasOwnProperty.call(extra, property_uri)) {
                    blankObject[property_uri] = extra[property_uri];
                  }
                }
              }
              if (searchBlankTemplate && searchBlankContainer.length) {
                searchBlankContainer.empty();
                return blankObject.present(searchBlankContainer, searchBlankTemplate, 'search');
              }
            });
          }
          function hideResults() {
            $('.results', template).addClass('hidden');
          }
        }).then(function () {
          // Search on load
          if (individual.hasValue('v-fs:searchOnLoad', true)) {
            return self.search().then(renderResult).then(clearSelected).then(function () {
              if (location.hash.indexOf(individual.id) >= 0) {
                scrollTo(self.scroll);
              }
            }).catch(function (error) {
              console.error('Search handler failed');
              showError();
            });
            // Show results on load if they are available (e.g. if we came back)
          } else if (self.hasValue('v-fs:searchResult')) {
            return renderResult(self['v-fs:searchResult']).then(function () {
              if (location.hash.indexOf(individual.id) >= 0) {
                scrollTo(self.scroll);
              }
            });
          }
        });
      });
      _export("html", html = "\n  <div>\n    <style scoped>\n      .swipe {\n        cursor: move;\n      }\n      .td-wrapper {\n        max-height: 100px;\n        overflow: hidden;\n        display: inline-block;\n        position: relative;\n      }\n      .td-wrapper::after {\n        content: '';\n        position: absolute;\n        bottom: 0;\n        right: 0;\n        z-index: 2;\n        border-top: 0 solid transparent;\n        border-right: 0 solid transparent;\n        border-bottom: 7px solid gray;\n        border-left: 7px solid transparent;\n      }\n      .marked {\n        outline-offset: -2px;\n        outline: 2px solid #aaa;\n      }\n    </style>\n    <h2 class=\"caption hidden\">\n      <span about=\"@\" property=\"rdfs:label\"></span>\n      <hr class=\"margin-sm\" />\n    </h2>\n    <div class=\"params\">\n      <div class=\"search-form\"></div>\n      <br />\n      <div class=\"search-actions clearfix\">\n        <button class=\"btn btn-primary search-button\" id=\"search-button\" about=\"v-fs:Find\" property=\"rdfs:label\"></button>\n        <button class=\"btn btn-default reset-button\" id=\"reset-button\" about=\"v-fs:Reset\" property=\"rdfs:label\"></button>\n        <span class=\"results-load-buttons\">\n          <button class=\"more-results btn btn-primary hidden\" about=\"v-fs:MoreResults\" property=\"rdfs:label\"></button>\n          <button class=\"all-results btn btn-warning hidden\" about=\"v-fs:AllResults\" property=\"rdfs:label\"></button>\n        </span>\n        <div class=\"pull-right btn-group dropup set-columns-wrapper\" style=\"margin-left:3px;\">\n        <button type=\"button\" class=\"btn btn-info dropdown-toggle set-columns\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n          <span about=\"v-fs:SetColumns\" property=\"rdfs:label\"></span>\n          <span class=\"caret\"></span>\n        </button>\n        <div class=\"dropdown-menu\" style=\"padding:15px; width: 300px; max-height: 500px; overflow-y: auto;\">\n          <div class=\"checkbox\">\n            <label>\n              <input class=\"column-check\" type=\"checkbox\" checked=\"true\"> <span class=\"column-name\"></span>\n            </label>\n          </div>\n        </div>\n      </div>\n      </div>\n      <br />\n    </div>\n    <div class=\"results hidden\">\n      <div class=\"result-heading\">\n        <h4 class=\"clearfix\">\n          <span class=\"pull-left\" about=\"v-fs:Results\" property=\"rdfs:label\"></span>\n          <div class=\"pull-left margin-md-h\" about=\"@\" data-template=\"v-fs:SelectedResultsActionsTemplate\"></div>\n          <small class=\"stats-top pull-right\" style=\"color:black\">\n            <span about=\"v-fs:estimated\" property=\"rdfs:label\"></span>\n            <span about=\"@\" property=\"v-fs:estimated\" class=\"badge\"></span>&nbsp;&nbsp;\n            <span about=\"v-fs:cursor\" property=\"rdfs:label\"></span>\n            <span about=\"@\" property=\"v-fs:cursor\" class=\"badge\"></span>&nbsp;&nbsp;\n            <strong about=\"v-fs:authorized\" property=\"rdfs:label\"></strong>\n            <span about=\"@\" property=\"v-fs:authorized\" class=\"badge\"></span>&nbsp;&nbsp;\n          </small>\n        </h4>\n      </div>\n      <div class=\"search-result table-responsive responsive-wrapper noSwipe\"></div>\n      <div class=\"not-found alert alert-warning no-margin hidden\">\n        <strong about=\"v-fs:Empty\" property=\"rdfs:label\"></strong> <span about=\"v-fs:NothingFound\" property=\"rdfs:label\"></span>\n      </div>\n      <div class=\"no-more-results alert alert-success no-margin hidden\">\n        <strong about=\"v-fs:NoMoreResults\" property=\"rdfs:label\"></strong>\n      </div>\n    </div>\n    <div class=\"search-error alert alert-danger no-margin hidden\">\n      <strong about=\"v-fs:SearchErrorMessage\" property=\"rdfs:label\"></strong>\n    </div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJDb21tb25VdGlsIiwiX2pzQ29tbW9uVXRpbEpzIiwiZGVmYXVsdCIsIl9qcXVlcnkiLCIkIiwiX2pzQ29tbW9uSW5kaXZpZHVhbF9tb2RlbEpzIiwiSW5kaXZpZHVhbE1vZGVsIiwiX3Jpb3QiLCJyaW90IiwiX3RvdWNoc3dpcGUiLCJleGVjdXRlIiwiX2V4cG9ydCIsInByZSIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJzZWxmIiwic2VhcmNoQmxhbmtUZW1wbGF0ZSIsImhhc1ZhbHVlIiwidW5kZWZpbmVkIiwic2VhcmNoUmVzdWx0VGVtcGxhdGUiLCJzZWFyY2hSZXN1bHRDb250YWluZXIiLCJkZXRhY2giLCJhcHBlbmRUbyIsInJlbW92ZSIsInJlbW92ZUNsYXNzIiwia2V5ZG93biIsImVuYWJsZVN3aXBlIiwia2V5dXAiLCJkaXNhYmxlU3dpcGUiLCJvbmUiLCJvZmYiLCJlIiwid2hpY2giLCJhZGRDbGFzcyIsImN0cmxLZXkiLCJwcmV2RGlzdGFuY2UiLCJkZWx0YSIsInN3aXBlIiwic3dpcGVTdGF0dXMiLCJldmVudCIsInBoYXNlIiwiZGlyZWN0aW9uIiwiZGlzdGFuY2UiLCJkdXJhdGlvbiIsImNzcyIsInNjcm9sbExlZnQiLCJ3aW5kb3ciLCJzY3JvbGxCeSIsImxvYWQiLCJ0aGVuIiwidGVtcGxhdGVTdHJpbmciLCJ0b1N0cmluZyIsInNwZWNpZmllciIsIlByb21pc2UiLCJyIiwiX2NvbnRleHQiLCJpbXBvcnQiLCJjb25jYXQiLCJ0ZW1wbGF0ZU1vZHVsZSIsImh0bWwiLCJyZXN1bHRDb250YWluZXIiLCJwcmVfcmVzdWx0IiwiY2FsbCIsInJlc29sdmUiLCJhdHRyIiwicmVzdWx0VGVtcGxhdGVJbmRpdmlkdWFsIiwiZW1wdHkiLCJ0bXBsU3RyaW5nIiwidGVtcGxhdGVPYmoiLCJwb3N0IiwicmVzdWx0VGVtcGxhdGVQb3N0IiwicmVzdWx0VGVtcGxhdGUiLCJhcHBlbmQiLCJjaGVja09mZnNldCIsIm1haW4iLCJhY3Rpb25zIiwiYWN0aW9uc1N0YXRpY0hlaWdodCIsInBsYWNlaG9sZGVyIiwibWFpblRvcCIsIm9mZnNldCIsInRvcCIsIm1haW5IZWlnaHQiLCJoZWlnaHQiLCJ3aW5kb3dIZWlnaHQiLCJpbm5lckhlaWdodCIsIndpbmRvd1RvcCIsInNjcm9sbFkiLCJwYWdlWU9mZnNldCIsImFjdGlvbnNTdGF0aWNUb3AiLCJhY3Rpb25zX2luc2lkZV92aWV3cG9ydCIsIm1haW5faW5zaWRlX3ZpZXdwb3J0IiwiaGFzQ2xhc3MiLCJmaW5kIiwic2V0VGltZW91dCIsImxlbmd0aCIsImluc2VydEJlZm9yZSIsIm9uIiwic2Nyb2xsSGFuZGxlciIsInNlYXJjaEJsYW5rQ29udGFpbmVyIiwic2VhcmNoQnV0dG9uIiwibW9yZVJlc3VsdHMiLCJhbGxSZXN1bHRzIiwibm9Nb3JlUmVzdWx0cyIsInNlYXJjaEVycm9yIiwic2VhcmNoQmxhbmsiLCJub3RGb3VuZCIsImhpZGRlbkNvbHVtbnMiLCJjaGVja3NDb250YWluZXIiLCJzdG9wUHJvcGFnYXRpb24iLCJpc0hhc1Zpc2libGVDb2x1bW5zIiwiY2hlY2tUbXBsIiwiZ2V0Iiwib3V0ZXJIVE1MIiwiZWFjaCIsImluZGV4IiwidGgiLCJjaGVjayIsImNoZWNrYm94IiwiY29sdW1uTmFtZSIsImNsb25lIiwidGV4dCIsImFib3V0QXR0ciIsImlzVmlzaWJsZSIsInNvbWUiLCJjb2wiLCJpZCIsInByb3AiLCJjaGFuZ2UiLCJjaGVja0hhbmRsZXIiLCJpcyIsIm5vdCIsImNoaWxkcmVuIiwiZXEiLCJtYXAiLCJqb2luIiwic2Nyb2xsIiwic2Nyb2xsVG9wIiwic2Nyb2xsVG8iLCJwb3NpdGlvbiIsImFuaW1hdGUiLCJzaG93RXJyb3IiLCJoaWRlRXJyb3IiLCJzZWFyY2hIYW5kbGVyIiwic2VhcmNoQnV0dG9ucyIsInRvZ2dsZVNwaW4iLCJzZWFyY2giLCJyZW5kZXJSZXN1bHQiLCJjbGVhclNlbGVjdGVkIiwiY2F0Y2giLCJlcnJvciIsImNvbnNvbGUiLCJjbGljayIsImN0cmxFbnRlckhhbmRsZXIiLCJrZXlDb2RlIiwibW9yZVJlc3VsdHNIYW5kbGVyIiwid2FybiIsImZvcm1hdFZhbHVlIiwiY29uZmlybSIsImxvYWRBbGwiLCJ1cmkiLCJyb3V0ZSIsInRoYXQiLCJzaWJsaW5ncyIsIm1hcmtlZCIsInNvcnRCeSIsImRpciIsInRtcCIsInNwbGl0IiwiaGVhZGVyIiwiYSIsInByZXBlbmQiLCJwcm9wZXJ0eV91cmkiLCJpbmRleE9mIiwicHJldmVudERlZmF1bHQiLCIkdGhpcyIsInRvZ2dsZUNsYXNzIiwidG9nZ2xlU2VsZWN0QWxsIiwidG9nZ2xlU2VsZWN0Iiwic2VsZWN0ZWRMIiwicmVzdWx0c0wiLCJzZWxlY3RBbGwiLCJzZXRUb2dnbGVTZWxlY3RBbGwiLCJjbGVhclZhbHVlIiwicmVzdWx0X3VyaSIsImNsb3Nlc3QiLCJhZGRWYWx1ZSIsInJlc3VsdCIsInJlbW92ZVZhbHVlIiwicmVzdWx0RGVsdGEiLCJ0b3RhbCIsInJlZHVjZSIsInAiLCJpIiwidGVtcGxhdGVzIiwicHJlc2VudCIsInRtcGwiLCJwb3N0X3Jlc3VsdCIsImlubmVyVGV4dCIsInRleHRDb250ZW50IiwiY29udGVudHMiLCJ3cmFwcGVyIiwicG9wb3ZlciIsImNvbnRlbnQiLCJwbGFjZW1lbnQiLCJ0b29sdGlwIiwidGl0bGUiLCJkZWxheSIsInNob3ciLCJoaWRlIiwicHVzaCIsImVsIiwiJGVsIiwiaGFzU3Bpbm5lciIsImhhc2giLCJsb2NhdGlvbiIsInRva2VucyIsImRlY29kZVVSSSIsInNsaWNlIiwiZXh0cmEiLCJhY2MiLCJwYWlyIiwidmFsdWVzIiwiZm9yRWFjaCIsInZhbHVlIiwicGFyc2UiLCJwcm9wZXJ0eSIsInJhbmdlIiwicGFyc2VkIiwicGFyc2VGbG9hdCIsIkRhdGUiLCJvYmplY3QiLCJyZXNldEJsYW5rIiwiaGlkZVJlc3VsdHMiLCJzZXR1cEJsYW5rIiwiaW5pdEJsYW5rIiwiYmxhbmtPYmplY3QiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSJdLCJzb3VyY2VzIjpbIi4uLy4uL29udG9sb2d5L2dlbmVyaWMtZnVuY3Rpb24vdGVtcGxhdGVzL3YtZnNfQXR0cmlidXRpdmVTZWFyY2hJbmxpbmVUZW1wbGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tbW9uVXRpbCBmcm9tICcvanMvY29tbW9uL3V0aWwuanMnO1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBJbmRpdmlkdWFsTW9kZWwgZnJvbSAnL2pzL2NvbW1vbi9pbmRpdmlkdWFsX21vZGVsLmpzJztcbmltcG9ydCByaW90IGZyb20gJ3Jpb3QnO1xuaW1wb3J0ICd0b3VjaHN3aXBlJztcblxuZXhwb3J0IGNvbnN0IHByZSA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlKSB7XG4gIHRlbXBsYXRlID0gJCh0ZW1wbGF0ZSk7XG4gIGNvbnRhaW5lciA9ICQoY29udGFpbmVyKTtcblxuICBjb25zdCBzZWxmID0gaW5kaXZpZHVhbDtcbiAgY29uc3Qgc2VhcmNoQmxhbmtUZW1wbGF0ZSA9IHNlbGYuaGFzVmFsdWUoJ3YtZnM6c2VhcmNoQmxhbmtUZW1wbGF0ZScpID8gc2VsZlsndi1mczpzZWFyY2hCbGFua1RlbXBsYXRlJ11bMF0gOiB1bmRlZmluZWQ7XG4gIGxldCBzZWFyY2hSZXN1bHRUZW1wbGF0ZSA9IHNlbGYuaGFzVmFsdWUoJ3YtZnM6c2VhcmNoUmVzdWx0VGVtcGxhdGUnKSA/IHNlbGZbJ3YtZnM6c2VhcmNoUmVzdWx0VGVtcGxhdGUnXVswXSA6IHVuZGVmaW5lZDtcbiAgY29uc3Qgc2VhcmNoUmVzdWx0Q29udGFpbmVyID0gJCgnLnNlYXJjaC1yZXN1bHQnLCB0ZW1wbGF0ZSk7XG5cbiAgaWYgKCFzZWFyY2hCbGFua1RlbXBsYXRlKSB7XG4gICAgJCgnLnJlc3VsdHMtbG9hZC1idXR0b25zJywgdGVtcGxhdGUpLmRldGFjaCgpLmFwcGVuZFRvKHRlbXBsYXRlKTtcbiAgICAkKCcucGFyYW1zJywgdGVtcGxhdGUpLnJlbW92ZSgpO1xuICAgICQoJy5jYXB0aW9uJywgdGVtcGxhdGUpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgfVxuICBpZiAodGhpcy5oYXNWYWx1ZSgndi1mczpsb2FkQWxsJywgdHJ1ZSkpIHtcbiAgICAkKCcubm8tbW9yZS1yZXN1bHRzJywgdGVtcGxhdGUpLnJlbW92ZSgpO1xuICB9XG5cbiAgLy8gRW5hYmxlIHN3aXBlIGZvciByZXN1bHQgdGFibGVcbiAgJCgnYm9keScpLmtleWRvd24oZW5hYmxlU3dpcGUpLmtleXVwKGRpc2FibGVTd2lwZSk7XG4gIHRlbXBsYXRlLm9uZSgncmVtb3ZlJywgZnVuY3Rpb24gKCkge1xuICAgICQoJ2JvZHknKS5vZmYoJ2tleWRvd24nLCBlbmFibGVTd2lwZSkub2ZmKCdrZXl1cCcsIGRpc2FibGVTd2lwZSk7XG4gIH0pO1xuICBmdW5jdGlvbiBkaXNhYmxlU3dpcGUgKGUpIHtcbiAgICBpZiAoZS53aGljaCA9PT0gMTcpIHtcbiAgICAgICQoJy5zZWFyY2gtcmVzdWx0JywgdGVtcGxhdGUpLmFkZENsYXNzKCdub1N3aXBlJykucmVtb3ZlQ2xhc3MoJ3N3aXBlJyk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGVuYWJsZVN3aXBlIChlKSB7XG4gICAgaWYgKGUuY3RybEtleSkge1xuICAgICAgJCgnLnNlYXJjaC1yZXN1bHQnLCB0ZW1wbGF0ZSkuYWRkQ2xhc3MoJ3N3aXBlJykucmVtb3ZlQ2xhc3MoJ25vU3dpcGUnKTtcbiAgICB9XG4gIH1cblxuICBsZXQgcHJldkRpc3RhbmNlID0gMDtcbiAgbGV0IGRlbHRhID0gMDtcblxuICAkKCcuc2VhcmNoLXJlc3VsdCcsIHRlbXBsYXRlKS5zd2lwZSh7XG4gICAgc3dpcGVTdGF0dXM6IGZ1bmN0aW9uIChldmVudCwgcGhhc2UsIGRpcmVjdGlvbiwgZGlzdGFuY2UsIGR1cmF0aW9uKSB7XG4gICAgICBpZiAocGhhc2UgPT09ICdtb3ZlJyAmJiBldmVudC5jdHJsS2V5ID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuY3NzKCdjdXJzb3InLCAnbW92ZScpO1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnbGVmdCcpIHtcbiAgICAgICAgICBkZWx0YSA9IGRpc3RhbmNlIC0gcHJldkRpc3RhbmNlO1xuICAgICAgICAgIHByZXZEaXN0YW5jZSA9IGRpc3RhbmNlO1xuICAgICAgICAgIHRoaXMuc2Nyb2xsTGVmdCh0aGlzLnNjcm9sbExlZnQoKSArIGRlbHRhKTtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdyaWdodCcpIHtcbiAgICAgICAgICBkZWx0YSA9IGRpc3RhbmNlIC0gcHJldkRpc3RhbmNlO1xuICAgICAgICAgIHByZXZEaXN0YW5jZSA9IGRpc3RhbmNlO1xuICAgICAgICAgIHRoaXMuc2Nyb2xsTGVmdCh0aGlzLnNjcm9sbExlZnQoKSAtIGRlbHRhKTtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICd1cCcpIHtcbiAgICAgICAgICB3aW5kb3cuc2Nyb2xsQnkoMCwgZGlzdGFuY2UpO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ2Rvd24nKSB7XG4gICAgICAgICAgd2luZG93LnNjcm9sbEJ5KDAsIC1kaXN0YW5jZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByZXZEaXN0YW5jZSA9IDA7XG4gICAgICAgIGRlbHRhID0gMDtcbiAgICAgICAgdGhpcy5jc3MoJ2N1cnNvcicsICcnKTtcbiAgICAgIH1cbiAgICB9LFxuICB9KTtcbiAgdGVtcGxhdGUub25lKCdyZW1vdmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgcHJldkRpc3RhbmNlID0gbnVsbDtcbiAgICBkZWx0YSA9IG51bGw7XG4gICAgJCgnLnNlYXJjaC1yZXN1bHQnLCB0ZW1wbGF0ZSkuc3dpcGUoJ2Rlc3Ryb3knKTtcbiAgfSk7XG5cbiAgaWYgKCFzZWFyY2hSZXN1bHRUZW1wbGF0ZSkge1xuICAgICQoJy5zdGF0cy10b3AsIC5zdGF0cy1ib3R0b20sIC5yZXN1bHQtaGVhZGVyJywgdGVtcGxhdGUpLnJlbW92ZSgpO1xuICAgIHNlYXJjaFJlc3VsdFRlbXBsYXRlID0gbmV3IEluZGl2aWR1YWxNb2RlbCgndi1mczpNaW5pbWFsU2VhcmNoUmVzdWx0VGVtcGxhdGUnKTtcbiAgfVxuICByZXR1cm4gc2VhcmNoUmVzdWx0VGVtcGxhdGVcbiAgICAubG9hZCgpXG4gICAgLnRoZW4oZnVuY3Rpb24gKHNlYXJjaFJlc3VsdFRlbXBsYXRlKSB7XG4gICAgICBjb25zdCB0ZW1wbGF0ZVN0cmluZyA9IHNlYXJjaFJlc3VsdFRlbXBsYXRlWyd2LXVpOnRlbXBsYXRlJ11bMF0udG9TdHJpbmcoKTtcbiAgICAgIHJldHVybiBpbXBvcnQoJy90ZW1wbGF0ZXMvJyArIHRlbXBsYXRlU3RyaW5nKTtcbiAgICB9KVxuICAgIC50aGVuKGZ1bmN0aW9uICh0ZW1wbGF0ZU1vZHVsZSkge1xuICAgICAgY29uc3Qgc2VhcmNoUmVzdWx0VGVtcGxhdGUgPSAkKHRlbXBsYXRlTW9kdWxlLmh0bWwpO1xuICAgICAgY29uc3QgcmVzdWx0Q29udGFpbmVyID0gJCgnLnJlc3VsdC1jb250YWluZXInLCBzZWFyY2hSZXN1bHRUZW1wbGF0ZSk7XG4gICAgICBjb25zdCBwcmVfcmVzdWx0ID0gdGVtcGxhdGVNb2R1bGUucHJlICE9IHVuZGVmaW5lZCA/IHRlbXBsYXRlTW9kdWxlLnByZS5jYWxsKGluZGl2aWR1YWwsIGluZGl2aWR1YWwsIHNlYXJjaFJlc3VsdFRlbXBsYXRlLCBzZWFyY2hSZXN1bHRDb250YWluZXIsIG1vZGUpIDogdW5kZWZpbmVkO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwcmVfcmVzdWx0KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHJlc3VsdENvbnRhaW5lci5hdHRyKCdkYXRhLXRlbXBsYXRlJykpIHtcbiAgICAgICAgICBjb25zdCByZXN1bHRUZW1wbGF0ZUluZGl2aWR1YWwgPSBuZXcgSW5kaXZpZHVhbE1vZGVsKHJlc3VsdENvbnRhaW5lci5hdHRyKCdkYXRhLXRlbXBsYXRlJykpO1xuICAgICAgICAgIHJlc3VsdENvbnRhaW5lci5lbXB0eSgpO1xuICAgICAgICAgIHJldHVybiByZXN1bHRUZW1wbGF0ZUluZGl2aWR1YWwubG9hZCgpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdFRlbXBsYXRlSW5kaXZpZHVhbCkge1xuICAgICAgICAgICAgY29uc3QgdG1wbFN0cmluZyA9IHJlc3VsdFRlbXBsYXRlSW5kaXZpZHVhbFsndi11aTp0ZW1wbGF0ZSddWzBdO1xuICAgICAgICAgICAgcmV0dXJuIGltcG9ydChgL3RlbXBsYXRlcy8ke3RtcGxTdHJpbmd9YCk7XG4gICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAodGVtcGxhdGVPYmopIHtcbiAgICAgICAgICAgIGlmICh0ZW1wbGF0ZU9iai5wb3N0ICE9IHVuZGVmaW5lZCkgaW5kaXZpZHVhbC5yZXN1bHRUZW1wbGF0ZVBvc3QgPSB0ZW1wbGF0ZU9iai5wb3N0O1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0VGVtcGxhdGUgPSB0ZW1wbGF0ZU9iai5odG1sLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBpbmRpdmlkdWFsLnJlc3VsdFRlbXBsYXRlID0gcmVzdWx0VGVtcGxhdGU7XG4gICAgICAgICAgICBzZWFyY2hSZXN1bHRDb250YWluZXIuYXBwZW5kKHNlYXJjaFJlc3VsdFRlbXBsYXRlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCByZXN1bHRUZW1wbGF0ZSA9IHJlc3VsdENvbnRhaW5lci5odG1sKCk7XG4gICAgICAgICAgcmVzdWx0Q29udGFpbmVyLmVtcHR5KCk7XG4gICAgICAgICAgaW5kaXZpZHVhbC5yZXN1bHRUZW1wbGF0ZSA9IHJlc3VsdFRlbXBsYXRlO1xuICAgICAgICAgIHNlYXJjaFJlc3VsdENvbnRhaW5lci5hcHBlbmQoc2VhcmNoUmVzdWx0VGVtcGxhdGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBwb3N0ID0gZnVuY3Rpb24gKGluZGl2aWR1YWwsIHRlbXBsYXRlLCBjb250YWluZXIsIG1vZGUpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gIC8vIE1ha2UgcG9zaXRpb24gZml4ZWQgZm9yIGJ1dHRvbnMgYmFyIHRoYXQgZG9lc24ndCBmaXQgdGhlIHdpbmRvd1xuICBmdW5jdGlvbiBjaGVja09mZnNldCAobWFpbiwgYWN0aW9ucywgYWN0aW9uc1N0YXRpY0hlaWdodCwgcGxhY2Vob2xkZXIpIHtcbiAgICBjb25zdCBtYWluVG9wID0gbWFpbi5vZmZzZXQoKS50b3A7XG4gICAgY29uc3QgbWFpbkhlaWdodCA9IG1haW4uaGVpZ2h0KCk7XG4gICAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIGNvbnN0IHdpbmRvd1RvcCA9IHdpbmRvdy5zY3JvbGxZIHx8IHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgICBjb25zdCBhY3Rpb25zU3RhdGljVG9wID0gcGxhY2Vob2xkZXIub2Zmc2V0KCkudG9wO1xuICAgIGNvbnN0IGFjdGlvbnNfaW5zaWRlX3ZpZXdwb3J0ID0gd2luZG93VG9wIDw9IGFjdGlvbnNTdGF0aWNUb3AgJiYgYWN0aW9uc1N0YXRpY1RvcCA8IHdpbmRvd1RvcCArIHdpbmRvd0hlaWdodDtcbiAgICBjb25zdCBtYWluX2luc2lkZV92aWV3cG9ydCA9IHdpbmRvd1RvcCA8PSBtYWluVG9wICsgbWFpbkhlaWdodCAtIGFjdGlvbnNTdGF0aWNIZWlnaHQgJiYgbWFpblRvcCArIGFjdGlvbnNTdGF0aWNIZWlnaHQgPCB3aW5kb3dUb3AgKyB3aW5kb3dIZWlnaHQ7XG4gICAgaWYgKCFhY3Rpb25zX2luc2lkZV92aWV3cG9ydCAmJiBtYWluX2luc2lkZV92aWV3cG9ydCkge1xuICAgICAgaWYgKCFhY3Rpb25zLmhhc0NsYXNzKCdhY3Rpb25zLWZpeGVkJykpIHtcbiAgICAgICAgcGxhY2Vob2xkZXIuY3NzKCdoZWlnaHQnLCBhY3Rpb25zU3RhdGljSGVpZ2h0KTtcbiAgICAgICAgYWN0aW9ucy5maW5kKCdicicpLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgYWN0aW9ucy5hZGRDbGFzcygnYWN0aW9ucy1maXhlZCcpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoYWN0aW9ucy5oYXNDbGFzcygnYWN0aW9ucy1maXhlZCcpKSB7XG4gICAgICAgIHBsYWNlaG9sZGVyLmNzcygnaGVpZ2h0JywgMCk7XG4gICAgICAgIGFjdGlvbnMuZmluZCgnYnInKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIGFjdGlvbnMucmVtb3ZlQ2xhc3MoJ2FjdGlvbnMtZml4ZWQnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgbWFpbiA9IHRlbXBsYXRlO1xuICAgIGNvbnN0IGFjdGlvbnMgPSAkKCcuc2VhcmNoLWFjdGlvbnMnLCB0ZW1wbGF0ZSk7XG4gICAgaWYgKCFhY3Rpb25zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBhY3Rpb25zU3RhdGljSGVpZ2h0ID0gYWN0aW9ucy5oZWlnaHQoKTtcbiAgICBjb25zdCBwbGFjZWhvbGRlciA9ICQoJzxkaXY+PC9kaXY+JykuaW5zZXJ0QmVmb3JlKGFjdGlvbnMpO1xuICAgIGNoZWNrT2Zmc2V0KG1haW4sIGFjdGlvbnMsIGFjdGlvbnNTdGF0aWNIZWlnaHQsIHBsYWNlaG9sZGVyKTtcbiAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIHNjcm9sbEhhbmRsZXIpO1xuICAgIHRlbXBsYXRlLm9uZSgncmVtb3ZlJywgZnVuY3Rpb24gKCkge1xuICAgICAgJCh3aW5kb3cpLm9mZignc2Nyb2xsJywgc2Nyb2xsSGFuZGxlcik7XG4gICAgfSk7XG4gICAgZnVuY3Rpb24gc2Nyb2xsSGFuZGxlciAoKSB7XG4gICAgICBjaGVja09mZnNldChtYWluLCBhY3Rpb25zLCBhY3Rpb25zU3RhdGljSGVpZ2h0LCBwbGFjZWhvbGRlcik7XG4gICAgfVxuICB9LCA1MDApO1xuXG4gIGNvbnN0IHNlbGYgPSBpbmRpdmlkdWFsO1xuICBjb25zdCBzZWFyY2hCbGFua0NvbnRhaW5lciA9ICQoJy5zZWFyY2gtZm9ybScsIHRlbXBsYXRlKTtcbiAgY29uc3Qgc2VhcmNoUmVzdWx0Q29udGFpbmVyID0gJCgnLnNlYXJjaC1yZXN1bHQnLCB0ZW1wbGF0ZSk7XG4gIGNvbnN0IHNlYXJjaEJ1dHRvbiA9ICQoJyNzZWFyY2gtYnV0dG9uLnNlYXJjaC1idXR0b24nLCB0ZW1wbGF0ZSk7XG4gIGNvbnN0IG1vcmVSZXN1bHRzID0gJCgnLm1vcmUtcmVzdWx0cycsIHRlbXBsYXRlKTtcbiAgY29uc3QgYWxsUmVzdWx0cyA9ICQoJy5hbGwtcmVzdWx0cycsIHRlbXBsYXRlKTtcbiAgY29uc3Qgbm9Nb3JlUmVzdWx0cyA9ICQoJy5uby1tb3JlLXJlc3VsdHMnLCB0ZW1wbGF0ZSk7XG4gIGNvbnN0IHNlYXJjaEVycm9yID0gJCgnLnNlYXJjaC1lcnJvcicsIHRlbXBsYXRlKTtcbiAgY29uc3Qgc2VhcmNoQmxhbmsgPSBzZWxmLmhhc1ZhbHVlKCd2LWZzOnNlYXJjaEJsYW5rJykgPyBzZWxmWyd2LWZzOnNlYXJjaEJsYW5rJ11bMF0gOiB1bmRlZmluZWQ7XG4gIGNvbnN0IHNlYXJjaEJsYW5rVGVtcGxhdGUgPSBzZWxmLmhhc1ZhbHVlKCd2LWZzOnNlYXJjaEJsYW5rVGVtcGxhdGUnKSA/IHNlbGZbJ3YtZnM6c2VhcmNoQmxhbmtUZW1wbGF0ZSddWzBdIDogdW5kZWZpbmVkO1xuICBjb25zdCByZXN1bHRDb250YWluZXIgPSAkKCcucmVzdWx0LWNvbnRhaW5lcicsIHRlbXBsYXRlKTtcbiAgY29uc3Qgbm90Rm91bmQgPSAkKCcubm90LWZvdW5kJywgdGVtcGxhdGUpO1xuXG5cbiAgLy8gIFNldCBjb2x1bW5zXG4gIGluZGl2aWR1YWwuaGlkZGVuQ29sdW1ucyA9IGluZGl2aWR1YWwuaGlkZGVuQ29sdW1ucyB8fCB7fTtcbiAgY29uc3QgY2hlY2tzQ29udGFpbmVyID0gJCgnLnNldC1jb2x1bW5zLXdyYXBwZXIgLmRyb3Bkb3duLW1lbnUnLCB0ZW1wbGF0ZSkub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICB9KTtcbiAgY29uc3QgaXNIYXNWaXNpYmxlQ29sdW1ucyA9IGluZGl2aWR1YWwuaGFzVmFsdWUoJ3YtZnM6aGFzVmlzaWJsZUNvbHVtbnMnKTtcbiAgbGV0IGNoZWNrVG1wbCA9ICQoJy5zZXQtY29sdW1ucy13cmFwcGVyIC5kcm9wZG93bi1tZW51IC5jaGVja2JveCcsIHRlbXBsYXRlKS5yZW1vdmUoKTtcbiAgaWYgKGNoZWNrVG1wbC5sZW5ndGgpIHtcbiAgICBjaGVja1RtcGwgPSBjaGVja1RtcGwuZ2V0KDApLm91dGVySFRNTDtcbiAgICAkKCcuc2VhcmNoLXJlc3VsdCB0YWJsZSA+IHRoZWFkID4gdHI6bGFzdCA+IHRoJywgdGVtcGxhdGUpLmVhY2goZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICBjb25zdCB0aCA9ICQodGhpcyk7XG4gICAgICBjb25zdCBjaGVjayA9ICQoY2hlY2tUbXBsKTtcbiAgICAgIGNvbnN0IGNoZWNrYm94ID0gJCgnaW5wdXQnLCBjaGVjayk7XG4gICAgICBjb25zdCBjb2x1bW5OYW1lID0gJCh0aGlzKS5maW5kKCdzcGFuJykuY2xvbmUoKTtcbiAgICAgIGlmICggY29sdW1uTmFtZS5sZW5ndGggKSB7XG4gICAgICAgICQoJy5jb2x1bW4tbmFtZScsIGNoZWNrKS5odG1sKCBjb2x1bW5OYW1lICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKCcuY29sdW1uLW5hbWUnLCBjaGVjaykudGV4dCggdGgudGV4dCgpICk7XG4gICAgICB9XG4gICAgICBjb25zdCBhYm91dEF0dHIgPSBjb2x1bW5OYW1lLmF0dHIoJ2Fib3V0Jyk7XG4gICAgICBpZiAoYWJvdXRBdHRyICE9IHVuZGVmaW5lZCAmJiBpc0hhc1Zpc2libGVDb2x1bW5zKSB7XG4gICAgICAgIGNvbnN0IGlzVmlzaWJsZSA9IGluZGl2aWR1YWxbJ3YtZnM6aGFzVmlzaWJsZUNvbHVtbnMnXS5zb21lKGZ1bmN0aW9uIChjb2wpIHtcbiAgICAgICAgICByZXR1cm4gY29sLmlkID09IGFib3V0QXR0cjtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghaXNWaXNpYmxlKSBpbmRpdmlkdWFsLmhpZGRlbkNvbHVtbnNbaW5kZXhdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChpbmRleCBpbiBpbmRpdmlkdWFsLmhpZGRlbkNvbHVtbnMpIHtcbiAgICAgICAgY2hlY2tib3gucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNoZWNrYm94LnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIGNoZWNrYm94LmNoYW5nZShjaGVja0hhbmRsZXIpO1xuICAgICAgY2hlY2tIYW5kbGVyLmNhbGwoIGNoZWNrYm94LmdldCgwKSApO1xuICAgICAgY2hlY2tzQ29udGFpbmVyLmFwcGVuZChjaGVjayk7XG4gICAgICAvLyBTaG93L2hpZGUgcmVzdWx0IHRhYmxlIGNvbHVtbnMgJiB1cGRhdGUgcmVzdWx0VGVtcGxhdGUgYWNjb3JkaW5nbHlcbiAgICAgIGZ1bmN0aW9uIGNoZWNrSGFuZGxlciAoKSB7XG4gICAgICAgIGluZGl2aWR1YWwucmVzdWx0VGVtcGxhdGUgPSAkKGluZGl2aWR1YWwucmVzdWx0VGVtcGxhdGUpO1xuICAgICAgICBpZiAoICQodGhpcykuaXMoJzpjaGVja2VkJykgKSB7XG4gICAgICAgICAgdGgucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICQoJ3RyIHRkOm50aC1jaGlsZCgnICsgKGluZGV4ICsgMSkgKyAnKScsIHJlc3VsdENvbnRhaW5lcikucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgIGluZGl2aWR1YWwucmVzdWx0VGVtcGxhdGUubm90KCdzY3JpcHQnKS5jaGlsZHJlbigpLmVxKGluZGV4KS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgZGVsZXRlIGluZGl2aWR1YWwuaGlkZGVuQ29sdW1uc1tpbmRleF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGguYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICQoJ3RyIHRkOm50aC1jaGlsZCgnICsgKGluZGV4ICsgMSkgKyAnKScsIHJlc3VsdENvbnRhaW5lcikuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgIGluZGl2aWR1YWwucmVzdWx0VGVtcGxhdGUubm90KCdzY3JpcHQnKS5jaGlsZHJlbigpLmVxKGluZGV4KS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgaW5kaXZpZHVhbC5oaWRkZW5Db2x1bW5zW2luZGV4XSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaW5kaXZpZHVhbC5yZXN1bHRUZW1wbGF0ZSA9IGluZGl2aWR1YWwucmVzdWx0VGVtcGxhdGUubWFwKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5vdXRlckhUTUw7XG4gICAgICAgIH0pLmdldCgpLmpvaW4oJycpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gUmVtZW1iZXIgc2Nyb2xsIHBvc2l0aW9uXG4gIHRlbXBsYXRlLm9uZSgncmVtb3ZlJywgZnVuY3Rpb24gKCkge1xuICAgIHNlbGYuc2Nyb2xsID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICB9KTtcblxuICAvLyBTY3JvbGwgdG8gcG9zaXRpb25cbiAgZnVuY3Rpb24gc2Nyb2xsVG8gKHBvc2l0aW9uKSB7XG4gICAgaWYgKHBvc2l0aW9uID4gMCkge1xuICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICBzY3JvbGxUb3A6IHBvc2l0aW9uLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2hvd0Vycm9yICgpIHtcbiAgICBzZWFyY2hFcnJvci5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gIH1cblxuICBmdW5jdGlvbiBoaWRlRXJyb3IgKCkge1xuICAgIHNlYXJjaEVycm9yLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgfVxuXG4gIC8vIFNlYXJjaCBoYW5kbGVyXG4gIGZ1bmN0aW9uIHNlYXJjaEhhbmRsZXIgKCkge1xuICAgIGNvbnN0IHNlYXJjaEJ1dHRvbnMgPSAkKCcuc2VhcmNoLWJ1dHRvbicsIHRlbXBsYXRlKTtcbiAgICBoaWRlRXJyb3IoKTtcbiAgICB0b2dnbGVTcGluKHNlYXJjaEJ1dHRvbnMpO1xuICAgIHNlbGZcbiAgICAgIC5zZWFyY2goKVxuICAgICAgLnRoZW4ocmVuZGVyUmVzdWx0KVxuICAgICAgLnRoZW4oY2xlYXJTZWxlY3RlZClcbiAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBzZWxmLnNjcm9sbCB8fCAkKCcucmVzdWx0cycsIHRlbXBsYXRlKS5vZmZzZXQoKS50b3A7XG4gICAgICAgIHNjcm9sbFRvKHBvc2l0aW9uKTtcbiAgICAgICAgZGVsZXRlIHNlbGYuc2Nyb2xsO1xuICAgICAgICB0b2dnbGVTcGluKHNlYXJjaEJ1dHRvbnMpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignU2VhcmNoIGhhbmRsZXIgZmFpbGVkJyk7XG4gICAgICAgIHRvZ2dsZVNwaW4oc2VhcmNoQnV0dG9ucyk7XG4gICAgICAgIHNob3dFcnJvcigpO1xuICAgICAgfSk7XG4gIH1cbiAgc2VsZi5vbignc2VhcmNoJywgc2VhcmNoSGFuZGxlcik7XG4gIHRlbXBsYXRlLm9uZSgncmVtb3ZlJywgZnVuY3Rpb24gKCkge1xuICAgIHNlbGYub2ZmKCdzZWFyY2gnLCBzZWFyY2hIYW5kbGVyKTtcbiAgfSk7XG5cbiAgLy8gU2VhcmNoIGJ1dHRvbiBoYW5kbGVyXG4gIHNlYXJjaEJ1dHRvbi5jbGljayhzZWFyY2hIYW5kbGVyKTtcblxuICAvLyBDdHJsICsgRW50ZXIgdHJpZ2dlcnMgc2VhcmNoXG4gIGZ1bmN0aW9uIGN0cmxFbnRlckhhbmRsZXIgKGUpIHtcbiAgICBpZiAoZS5jdHJsS2V5ICYmIGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgIHNlYXJjaEhhbmRsZXIoKTtcbiAgICB9XG4gIH1cbiAgJCh3aW5kb3cpLm9uKCdrZXl1cCcsIGN0cmxFbnRlckhhbmRsZXIpO1xuICB0ZW1wbGF0ZS5vbmUoJ3JlbW92ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAkKHdpbmRvdykub2ZmKCdrZXl1cCcsIGN0cmxFbnRlckhhbmRsZXIpO1xuICB9KTtcblxuICAvLyBNb3JlIHJlc3VsdHMgaGFuZGxlclxuICBmdW5jdGlvbiBtb3JlUmVzdWx0c0hhbmRsZXIgKCkge1xuICAgIHRvZ2dsZVNwaW4obW9yZVJlc3VsdHMpO1xuICAgIHJldHVybiBzZWxmXG4gICAgICAuc2VhcmNoKHNlbGZbJ3YtZnM6Y3Vyc29yJ11bMF0pXG4gICAgICAudGhlbihyZW5kZXJSZXN1bHQpXG4gICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRvZ2dsZVNwaW4obW9yZVJlc3VsdHMpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignTW9yZSByZXN1bHRzIGZhaWxlZCcpO1xuICAgICAgICBzaG93RXJyb3IoKTtcbiAgICAgICAgdG9nZ2xlU3Bpbihtb3JlUmVzdWx0cyk7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfSk7XG4gIH1cblxuICAvLyBNb3JlIHJlc3VsdHMgYnV0dG9uXG4gIG1vcmVSZXN1bHRzLmNsaWNrKG1vcmVSZXN1bHRzSGFuZGxlcik7XG5cbiAgLy8gQWxsIHJlc3VsdHMgYnV0dG9uXG4gIGFsbFJlc3VsdHMuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHdhcm4gPSBuZXcgSW5kaXZpZHVhbE1vZGVsKCd2LXM6QXJlWW91U3VyZScpWydyZGZzOmxhYmVsJ10ubWFwKENvbW1vblV0aWwuZm9ybWF0VmFsdWUpLmpvaW4oJyAnKTtcbiAgICBpZiAoc2VsZlsndi1mczplc3RpbWF0ZWQnXVswXSAtIHNlbGZbJ3YtZnM6Y3Vyc29yJ11bMF0gPCAxMDAgfHwgY29uZmlybSh3YXJuKSkge1xuICAgICAgbG9hZEFsbCgpO1xuICAgIH1cbiAgfSk7XG4gIGZ1bmN0aW9uIGxvYWRBbGwgKCkge1xuICAgIGlmIChzZWxmWyd2LWZzOmN1cnNvciddWzBdIDwgc2VsZlsndi1mczplc3RpbWF0ZWQnXVswXSAmJiB0ZW1wbGF0ZS5pcygnOnZpc2libGUnKSkge1xuICAgICAgbW9yZVJlc3VsdHNIYW5kbGVyKClcbiAgICAgICAgLnRoZW4obG9hZEFsbClcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0FsbCByZXN1bHRzIGZhaWxlZCcpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvLyBEb3VibGUgY2xpY2sgb24gcmVzdWx0IHRhYmxlIHJvdyByb3V0ZXMgdG8gc2VhcmNoIHJlc3VsdFxuICAkKCcuc2VhcmNoLXJlc3VsdCcsIHRlbXBsYXRlKS5vbignZGJsY2xpY2snLCAnLnJlc3VsdC1jb250YWluZXIgPiBbcmVzb3VyY2VdJywgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHVyaSA9ICQodGhpcykuYXR0cigncmVzb3VyY2UnKTtcbiAgICByaW90LnJvdXRlKCcjLycgKyB1cmkpO1xuICB9KTtcbiAgLy8gTWFyayBjbGlja2VkIHJvd1xuICAkKCcuc2VhcmNoLXJlc3VsdCcsIHRlbXBsYXRlKS5vbignY2xpY2snLCAnLnJlc3VsdC1jb250YWluZXIgPiBbcmVzb3VyY2VdJywgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHRoYXQgPSAkKHRoaXMpO1xuICAgIHRoYXQuYWRkQ2xhc3MoJ21hcmtlZCcpLnNpYmxpbmdzKCcubWFya2VkJykucmVtb3ZlQ2xhc3MoJ21hcmtlZCcpO1xuICAgIHNlbGYubWFya2VkID0gdGhhdC5hdHRyKCdyZXNvdXJjZScpO1xuICB9KTtcblxuICAvLyBNYW5hZ2Ugc29ydFxuICBsZXQgc29ydEJ5ID0gJyc7XG4gIGxldCBkaXIgPSAnJztcbiAgY29uc3QgdG1wID0gc2VsZlsndi1mczpzb3J0T3JkZXInXVswXS5zcGxpdCgnICcpO1xuICBzb3J0QnkgPSB0bXBbMF07XG4gIGRpciA9IHRtcFsxXTtcbiAgJCgnLm9yZGVyYnknLCB0ZW1wbGF0ZSkuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgaGVhZGVyID0gJCh0aGlzKTtcbiAgICBjb25zdCBhID0gJChcIjxhIGhyZWY9JyMnIGNsYXNzPSd0ZXh0LW11dGVkIGdseXBoaWNvbiBnbHlwaGljb24tc29ydC1ieS1hdHRyaWJ1dGVzJz48L2E+XCIpO1xuICAgIGhlYWRlci5wcmVwZW5kKGEsICcgJyk7XG4gICAgY29uc3QgcHJvcGVydHlfdXJpID0gaGVhZGVyLmF0dHIoJ2RhdGEtb3JkZXJieScpO1xuICAgIGlmIChzb3J0QnkuaW5kZXhPZihwcm9wZXJ0eV91cmkpID49IDApIHtcbiAgICAgIGEucmVtb3ZlQ2xhc3MoJ3RleHQtbXV0ZWQnKTtcbiAgICAgIGlmIChkaXIgPT09ICdkZXNjJykge1xuICAgICAgICBhLnJlbW92ZUNsYXNzKCdnbHlwaGljb24tc29ydC1ieS1hdHRyaWJ1dGVzJykuYWRkQ2xhc3MoJ2dseXBoaWNvbi1zb3J0LWJ5LWF0dHJpYnV0ZXMtYWx0Jyk7XG4gICAgICB9XG4gICAgfVxuICAgIGEuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBjb25zdCAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAkKCcub3JkZXJieSBhJywgdGVtcGxhdGUpLmFkZENsYXNzKCd0ZXh0LW11dGVkJyk7XG4gICAgICBjb25zdCBkaXIgPSAkdGhpcy5oYXNDbGFzcygnZ2x5cGhpY29uLXNvcnQtYnktYXR0cmlidXRlcy1hbHQnKSA/ICdhc2MnIDogJ2Rlc2MnO1xuICAgICAgJHRoaXMucmVtb3ZlQ2xhc3MoJ3RleHQtbXV0ZWQnKS50b2dnbGVDbGFzcygnZ2x5cGhpY29uLXNvcnQtYnktYXR0cmlidXRlcyBnbHlwaGljb24tc29ydC1ieS1hdHRyaWJ1dGVzLWFsdCcpO1xuICAgICAgc2VsZlsndi1mczpzb3J0T3JkZXInXSA9IFtcIidcIiArIHByb3BlcnR5X3VyaSArIFwiJyBcIiArIGRpcl07XG4gICAgICBzZWFyY2hIYW5kbGVyLmNhbGwodGhpcyk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIFNlbGVjdCByZXN1bHRzXG4gIGNvbnN0IHRvZ2dsZVNlbGVjdEFsbCA9IHNlYXJjaFJlc3VsdENvbnRhaW5lci5maW5kKCcudG9nZ2xlLXNlbGVjdC1hbGwnKTtcbiAgc2VhcmNoUmVzdWx0Q29udGFpbmVyLm9uKCdjbGljaycsICcudG9nZ2xlLXNlbGVjdCcsIHRvZ2dsZVNlbGVjdCk7XG5cbiAgdG9nZ2xlU2VsZWN0QWxsLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBzZWxlY3RlZEwgPSBzZWxmWyd2LWZzOnNlbGVjdGVkJ10ubGVuZ3RoO1xuICAgIGNvbnN0IHJlc3VsdHNMID0gcmVzdWx0Q29udGFpbmVyLmNoaWxkcmVuKCkubGVuZ3RoO1xuICAgIGlmIChyZXN1bHRzTCAhPT0gMCAmJiBzZWxlY3RlZEwgIT09IDApIHtcbiAgICAgIGNsZWFyU2VsZWN0ZWQoKTtcbiAgICB9IGVsc2UgaWYgKHJlc3VsdHNMICE9PSAwICYmIHNlbGVjdGVkTCA9PT0gMCkge1xuICAgICAgc2VsZWN0QWxsKCk7XG4gICAgfVxuICAgIHNldFRvZ2dsZVNlbGVjdEFsbCgpO1xuICB9KTtcbiAgZnVuY3Rpb24gc2V0VG9nZ2xlU2VsZWN0QWxsICgpIHtcbiAgICBjb25zdCBzZWxlY3RlZEwgPSBzZWxmWyd2LWZzOnNlbGVjdGVkJ10ubGVuZ3RoO1xuICAgIGNvbnN0IHJlc3VsdHNMID0gcmVzdWx0Q29udGFpbmVyLmNoaWxkcmVuKCkubGVuZ3RoO1xuICAgIGlmIChyZXN1bHRzTCAhPT0gMCAmJiByZXN1bHRzTCA9PT0gc2VsZWN0ZWRMKSB7XG4gICAgICB0b2dnbGVTZWxlY3RBbGwucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgICAgdG9nZ2xlU2VsZWN0QWxsLnByb3AoJ2luZGV0ZXJtaW5hdGUnLCBmYWxzZSk7XG4gICAgfSBlbHNlIGlmIChyZXN1bHRzTCAhPT0gMCAmJiBzZWxlY3RlZEwgIT09IDAgJiYgcmVzdWx0c0wgIT09IHNlbGVjdGVkTCkge1xuICAgICAgdG9nZ2xlU2VsZWN0QWxsLnByb3AoJ2luZGV0ZXJtaW5hdGUnLCB0cnVlKTtcbiAgICB9IGVsc2UgaWYgKHNlbGVjdGVkTCA9PT0gMCkge1xuICAgICAgdG9nZ2xlU2VsZWN0QWxsLnByb3AoJ2luZGV0ZXJtaW5hdGUnLCBmYWxzZSk7XG4gICAgICB0b2dnbGVTZWxlY3RBbGwucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gY2xlYXJTZWxlY3RlZCAoKSB7XG4gICAgc2VsZi5jbGVhclZhbHVlKCd2LWZzOnNlbGVjdGVkJyk7XG4gICAgc2VhcmNoUmVzdWx0Q29udGFpbmVyLmZpbmQoJy50b2dnbGUtc2VsZWN0OmNoZWNrZWQnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICB9XG4gIGZ1bmN0aW9uIHNlbGVjdEFsbCAoKSB7XG4gICAgc2VsZi5jbGVhclZhbHVlKCd2LWZzOnNlbGVjdGVkJyk7XG4gICAgc2VhcmNoUmVzdWx0Q29udGFpbmVyXG4gICAgICAuZmluZCgnLnRvZ2dsZS1zZWxlY3QnKVxuICAgICAgLnByb3AoJ2NoZWNrZWQnLCB0cnVlKVxuICAgICAgLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCByZXN1bHRfdXJpID0gJCh0aGlzKS5jbG9zZXN0KCdbcmVzb3VyY2VdJykuYXR0cigncmVzb3VyY2UnKTtcbiAgICAgICAgc2VsZi5hZGRWYWx1ZSgndi1mczpzZWxlY3RlZCcsIG5ldyBJbmRpdmlkdWFsTW9kZWwocmVzdWx0X3VyaSkpO1xuICAgICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gdG9nZ2xlU2VsZWN0ICgpIHtcbiAgICBjb25zdCAkdGhpcyA9ICQodGhpcyk7XG4gICAgY29uc3QgcmVzdWx0X3VyaSA9ICR0aGlzLmNsb3Nlc3QoJ1tyZXNvdXJjZV0nKS5hdHRyKCdyZXNvdXJjZScpO1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBJbmRpdmlkdWFsTW9kZWwocmVzdWx0X3VyaSk7XG4gICAgaWYgKCR0aGlzLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICBzZWxmLmFkZFZhbHVlKCd2LWZzOnNlbGVjdGVkJywgcmVzdWx0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZi5yZW1vdmVWYWx1ZSgndi1mczpzZWxlY3RlZCcsIHJlc3VsdCk7XG4gICAgfVxuICB9XG4gIHNlbGYub24oJ3YtZnM6c2VsZWN0ZWQnLCBzZXRUb2dnbGVTZWxlY3RBbGwpO1xuICB0ZW1wbGF0ZS5vbmUoJ3JlbW92ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBzZWxmLm9mZigndi1mczpzZWxlY3RlZCcsIHNldFRvZ2dsZVNlbGVjdEFsbCk7XG4gIH0pO1xuXG4gIC8vIFJlbmRlciByZXN1bHRcbiAgZnVuY3Rpb24gcmVuZGVyUmVzdWx0IChyZXN1bHREZWx0YSkge1xuICAgICQoJy5yZXN1bHRzJywgdGVtcGxhdGUpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcblxuICAgIC8vIFRvZ2dsZSBcIm1vcmUgcmVzdWx0c1wiIGJ1dHRvbiAmIFwibm8gbW9yZSByZXN1bHRzXCIgYWxlcnRcbiAgICBpZiAoc2VsZlsndi1mczpjdXJzb3InXVswXSA9PT0gc2VsZlsndi1mczplc3RpbWF0ZWQnXVswXSkge1xuICAgICAgbW9yZVJlc3VsdHMuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgYWxsUmVzdWx0cy5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICBub01vcmVSZXN1bHRzLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbW9yZVJlc3VsdHMucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgYWxsUmVzdWx0cy5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICBub01vcmVSZXN1bHRzLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICB9XG4gICAgLy8gVG9nZ2xlIFwibm90IGZvdW5kXCIgYWxlcnQgJiBcIm5vIG1vcmUgcmVzdWx0c1wiIGFsZXJ0XG4gICAgaWYgKHJlc3VsdERlbHRhLmxlbmd0aCkge1xuICAgICAgbm90Rm91bmQuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgIH0gZWxzZSB7XG4gICAgICBub3RGb3VuZC5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICBub01vcmVSZXN1bHRzLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICB9XG5cbiAgICAvLyBSZW5kZXIgZWFjaCByZXN1bHRcbiAgICBjb25zdCB0b3RhbCA9IHNlbGZbJ3YtZnM6YXV0aG9yaXplZCddWzBdO1xuICAgIGNvbnN0IGRlbHRhID0gcmVzdWx0RGVsdGEubGVuZ3RoO1xuXG4gICAgLy8gTmV3IHNlYXJjaCB0cmlnZ2VyZWRcbiAgICBpZiAodG90YWwgPT09IGRlbHRhKSB7XG4gICAgICByZXN1bHRDb250YWluZXIuZW1wdHkoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0RGVsdGFcbiAgICAgIC5yZWR1Y2UoZnVuY3Rpb24gKHAsIHJlc3VsdCwgaSkge1xuICAgICAgICByZXR1cm4gcC50aGVuKGZ1bmN0aW9uICh0ZW1wbGF0ZXMpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LnByZXNlbnQocmVzdWx0Q29udGFpbmVyLCBpbmRpdmlkdWFsLnJlc3VsdFRlbXBsYXRlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgZmFsc2UpLnRoZW4oZnVuY3Rpb24gKHRtcGwpIHtcbiAgICAgICAgICAgIGNvbnN0IHBvc3RfcmVzdWx0ID0gaW5kaXZpZHVhbC5yZXN1bHRUZW1wbGF0ZVBvc3QgIT0gdW5kZWZpbmVkID9cbiAgICAgICAgICAgICAgaW5kaXZpZHVhbC5yZXN1bHRUZW1wbGF0ZVBvc3QuY2FsbChyZXN1bHQsIHJlc3VsdCwgdG1wbCwgcmVzdWx0Q29udGFpbmVyLCBtb2RlKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocG9zdF9yZXN1bHQpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICB0bXBsID0gJCh0bXBsKTtcbiAgICAgICAgICAgICAgJCgnLnNlcmlhbC1udW1iZXInLCB0bXBsKS50ZXh0KHRvdGFsIC0gZGVsdGEgKyBpICsgMSk7XG4gICAgICAgICAgICAgIGlmIChyZXN1bHQuaWQgPT09IHNlbGYubWFya2VkKSB7XG4gICAgICAgICAgICAgICAgdG1wbC5hZGRDbGFzcygnbWFya2VkJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdG1wbC5maW5kKCcudG9nZ2xlLXNlbGVjdCcpLnByb3AoJ2NoZWNrZWQnLCBzZWxmLmhhc1ZhbHVlKCd2LWZzOnNlbGVjdGVkJywgcmVzdWx0KSk7XG5cbiAgICAgICAgICAgICAgJCgndGQnLCB0bXBsKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0ID0gdGhpcy5pbm5lclRleHQgfHwgdGhpcy50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICBpZiAodGV4dCAmJiB0ZXh0Lmxlbmd0aCA+IDEwMCkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgY29uc3QgY29udGVudHMgPSAkdGhpcy5jb250ZW50cygpO1xuICAgICAgICAgICAgICAgICAgY29uc3Qgd3JhcHBlciA9ICQoXCI8ZGl2IGNsYXNzPSd0ZC13cmFwcGVyJz48L2Rpdj5cIikuYXBwZW5kKGNvbnRlbnRzKTtcbiAgICAgICAgICAgICAgICAgICR0aGlzLmVtcHR5KCkuYXBwZW5kKHdyYXBwZXIpO1xuICAgICAgICAgICAgICAgICAgd3JhcHBlclxuICAgICAgICAgICAgICAgICAgICAucG9wb3Zlcih7XG4gICAgICAgICAgICAgICAgICAgICAgY29udGVudDogd3JhcHBlci5odG1sKCksXG4gICAgICAgICAgICAgICAgICAgICAgaHRtbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBwbGFjZW1lbnQ6ICd0b3AnLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAudG9vbHRpcCh7XG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IG5ldyBJbmRpdmlkdWFsTW9kZWwoJ3YtZnM6Q2xpY2tUb1ZpZXdDb250ZW50JylbJ3JkZnM6bGFiZWwnXS5tYXAoQ29tbW9uVXRpbC5mb3JtYXRWYWx1ZSkuam9pbignICcpLFxuICAgICAgICAgICAgICAgICAgICAgIHBsYWNlbWVudDogJ2JvdHRvbScsXG4gICAgICAgICAgICAgICAgICAgICAgZGVsYXk6IHtzaG93OiA3NTAsIGhpZGU6IDB9LFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB0ZW1wbGF0ZXMucHVzaCh0bXBsKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHRlbXBsYXRlcztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0sIFByb21pc2UucmVzb2x2ZShbXSkpXG4gICAgICAudGhlbigodGVtcGxhdGVzKSA9PiByZXN1bHRDb250YWluZXIuYXBwZW5kKHRlbXBsYXRlcykpXG4gICAgICAudGhlbihzZXRUb2dnbGVTZWxlY3RBbGwpO1xuICB9XG5cbiAgLy8gU3Bpbm5lclxuICBmdW5jdGlvbiB0b2dnbGVTcGluIChlbCkge1xuICAgIGNvbnN0ICRlbCA9ICQoZWwpO1xuICAgIGNvbnN0IGhhc1NwaW5uZXIgPSAkZWwuY2hpbGRyZW4oJy5mYS1zcGlubmVyJyk7XG4gICAgaWYgKGhhc1NwaW5uZXIubGVuZ3RoKSB7XG4gICAgICAkZWwucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICBoYXNTcGlubmVyLnJlbW92ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkZWwuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAkKFwiPGkgY2xhc3M9J2ZhIGZhLXNwaW5uZXIgZmEtcHVsc2UgZmEtbGcgZmEtZncnPjwvaT5cIikuYXBwZW5kVG8oZWwpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJlYWQgZXh0cmEgcGFyYW1ldGVycyBmcm9tIFVSTFxuICBjb25zdCBoYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2g7XG4gIGNvbnN0IHRva2VucyA9IGRlY29kZVVSSShoYXNoKS5zbGljZSgyKS5zcGxpdCgnLycpO1xuICBjb25zdCB1cmkgPSB0b2tlbnNbMF07XG4gIGxldCBleHRyYSA9IHRva2Vuc1s0XTtcbiAgaWYgKHVyaSA9PT0gc2VsZi5pZCkge1xuICAgIGlmIChleHRyYSkge1xuICAgICAgZXh0cmEgPSBleHRyYS5zcGxpdCgnJicpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwYWlyKSB7XG4gICAgICAgIGNvbnN0IHNwbGl0ID0gcGFpci5zcGxpdCgnPScpO1xuICAgICAgICBjb25zdCBwcm9wZXJ0eV91cmkgPSBzcGxpdFswXSB8fCAnJztcbiAgICAgICAgY29uc3QgdmFsdWVzID0gc3BsaXRbMV0uc3BsaXQoJ3wnKSB8fCAnJztcbiAgICAgICAgYWNjW3Byb3BlcnR5X3VyaV0gPSBhY2NbcHJvcGVydHlfdXJpXSB8fCBbXTtcbiAgICAgICAgdmFsdWVzLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgYWNjW3Byb3BlcnR5X3VyaV0ucHVzaChwYXJzZShwcm9wZXJ0eV91cmksIHZhbHVlKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwge30pO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBwYXJzZSAocHJvcGVydHlfdXJpLCB2YWx1ZSkge1xuICAgIGNvbnN0IHByb3BlcnR5ID0gbmV3IEluZGl2aWR1YWxNb2RlbChwcm9wZXJ0eV91cmkpO1xuICAgIGNvbnN0IHJhbmdlID0gcHJvcGVydHkuaGFzVmFsdWUoJ3JkZnM6cmFuZ2UnKSA/IHByb3BlcnR5WydyZGZzOnJhbmdlJ11bMF0uaWQgOiAncmRmczpSZXNvdXJjZSc7XG4gICAgbGV0IHBhcnNlZDtcbiAgICBzd2l0Y2ggKHJhbmdlKSB7XG4gICAgY2FzZSAneHNkOnN0cmluZyc6XG4gICAgICBwYXJzZWQgPSB2YWx1ZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3hzZDppbnRlZ2VyJzpcbiAgICBjYXNlICd4c2Q6ZGVjaW1hbCc6XG4gICAgICBwYXJzZWQgPSBwYXJzZUZsb2F0KHZhbHVlLnNwbGl0KCcgJykuam9pbignJykuc3BsaXQoJywnKS5qb2luKCcuJykpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAneHNkOmJvb2xlYW4nOlxuICAgICAgcGFyc2VkID0gdmFsdWUgPT09ICd0cnVlJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3hzZDpkYXRlVGltZSc6XG4gICAgICBwYXJzZWQgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgcGFyc2VkID0gbmV3IEluZGl2aWR1YWxNb2RlbCh2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBwYXJzZWQ7XG4gIH1cblxuICAvLyBSZW5kZXIgc2VhcmNoIGZvcm1cbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG4gICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHNlYXJjaEJsYW5rKSB7XG4gICAgICAgIHJldHVybiBzZWFyY2hCbGFuay5sb2FkKCkudGhlbihmdW5jdGlvbiAoc2VhcmNoQmxhbmspIHtcbiAgICAgICAgICAkKCcjcmVzZXQtYnV0dG9uLnJlc2V0LWJ1dHRvbicsIHRlbXBsYXRlKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWFyY2hCbGFuay5vYmplY3Qub2ZmKCcqJyk7XG4gICAgICAgICAgICBkZWxldGUgc2VhcmNoQmxhbmsub2JqZWN0O1xuICAgICAgICAgICAgcmVzZXRCbGFuaygpO1xuICAgICAgICAgICAgaGlkZVJlc3VsdHMoKTtcbiAgICAgICAgICAgIGhpZGVFcnJvcigpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBzZXR1cEJsYW5rKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJCgnLnBhcmFtcycsIHRlbXBsYXRlKS5yZW1vdmUoKTtcbiAgICAgICAgJCgnI3Jlc2V0LWJ1dHRvbi5yZXNldC1idXR0b24nLCB0ZW1wbGF0ZSkucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBzZXR1cEJsYW5rICgpIHtcbiAgICAgICAgcmV0dXJuIHNlYXJjaEJsYW5rLmluaXRCbGFuaygpLnRoZW4oZnVuY3Rpb24gKGJsYW5rT2JqZWN0KSB7XG4gICAgICAgICAgYmxhbmtPYmplY3Qub24oJ3Byb3BlcnR5TW9kaWZpZWQnLCBoaWRlUmVzdWx0cyk7XG4gICAgICAgICAgdGVtcGxhdGUub25lKCdyZW1vdmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBibGFua09iamVjdC5vZmYoJ3Byb3BlcnR5TW9kaWZpZWQnLCBoaWRlUmVzdWx0cyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgLy8gUG9wdWxhdGUgYmxhbmsgd2l0aCBleHRyYSBwYXJhbWV0ZXJzIGZyb20gVVJMXG4gICAgICAgICAgaWYgKGV4dHJhKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHByb3BlcnR5X3VyaSBpbiBleHRyYSkge1xuICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGV4dHJhLCBwcm9wZXJ0eV91cmkpKSB7XG4gICAgICAgICAgICAgICAgYmxhbmtPYmplY3RbcHJvcGVydHlfdXJpXSA9IGV4dHJhW3Byb3BlcnR5X3VyaV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNlYXJjaEJsYW5rVGVtcGxhdGUgJiYgc2VhcmNoQmxhbmtDb250YWluZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICBzZWFyY2hCbGFua0NvbnRhaW5lci5lbXB0eSgpO1xuICAgICAgICAgICAgcmV0dXJuIGJsYW5rT2JqZWN0LnByZXNlbnQoc2VhcmNoQmxhbmtDb250YWluZXIsIHNlYXJjaEJsYW5rVGVtcGxhdGUsICdzZWFyY2gnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gcmVzZXRCbGFuayAoKSB7XG4gICAgICAgIHJldHVybiBzZWFyY2hCbGFuay5yZXNldEJsYW5rKCkudGhlbihmdW5jdGlvbiAoYmxhbmtPYmplY3QpIHtcbiAgICAgICAgICBibGFua09iamVjdC5vbigncHJvcGVydHlNb2RpZmllZCcsIGhpZGVSZXN1bHRzKTtcbiAgICAgICAgICB0ZW1wbGF0ZS5vbmUoJ3JlbW92ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGJsYW5rT2JqZWN0Lm9mZigncHJvcGVydHlNb2RpZmllZCcsIGhpZGVSZXN1bHRzKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyBQb3B1bGF0ZSBibGFuayB3aXRoIGV4dHJhIHBhcmFtZXRlcnMgZnJvbSBVUkxcbiAgICAgICAgICBpZiAoZXh0cmEpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgcHJvcGVydHlfdXJpIGluIGV4dHJhKSB7XG4gICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXh0cmEsIHByb3BlcnR5X3VyaSkpIHtcbiAgICAgICAgICAgICAgICBibGFua09iamVjdFtwcm9wZXJ0eV91cmldID0gZXh0cmFbcHJvcGVydHlfdXJpXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2VhcmNoQmxhbmtUZW1wbGF0ZSAmJiBzZWFyY2hCbGFua0NvbnRhaW5lci5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNlYXJjaEJsYW5rQ29udGFpbmVyLmVtcHR5KCk7XG4gICAgICAgICAgICByZXR1cm4gYmxhbmtPYmplY3QucHJlc2VudChzZWFyY2hCbGFua0NvbnRhaW5lciwgc2VhcmNoQmxhbmtUZW1wbGF0ZSwgJ3NlYXJjaCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBoaWRlUmVzdWx0cyAoKSB7XG4gICAgICAgICQoJy5yZXN1bHRzJywgdGVtcGxhdGUpLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICAgIH1cbiAgICB9KVxuICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIFNlYXJjaCBvbiBsb2FkXG4gICAgICBpZiAoaW5kaXZpZHVhbC5oYXNWYWx1ZSgndi1mczpzZWFyY2hPbkxvYWQnLCB0cnVlKSkge1xuICAgICAgICByZXR1cm4gc2VsZlxuICAgICAgICAgIC5zZWFyY2goKVxuICAgICAgICAgIC50aGVuKHJlbmRlclJlc3VsdClcbiAgICAgICAgICAudGhlbihjbGVhclNlbGVjdGVkKVxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChsb2NhdGlvbi5oYXNoLmluZGV4T2YoaW5kaXZpZHVhbC5pZCkgPj0gMCkge1xuICAgICAgICAgICAgICBzY3JvbGxUbyhzZWxmLnNjcm9sbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdTZWFyY2ggaGFuZGxlciBmYWlsZWQnKTtcbiAgICAgICAgICAgIHNob3dFcnJvcigpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAvLyBTaG93IHJlc3VsdHMgb24gbG9hZCBpZiB0aGV5IGFyZSBhdmFpbGFibGUgKGUuZy4gaWYgd2UgY2FtZSBiYWNrKVxuICAgICAgfSBlbHNlIGlmIChzZWxmLmhhc1ZhbHVlKCd2LWZzOnNlYXJjaFJlc3VsdCcpKSB7XG4gICAgICAgIHJldHVybiByZW5kZXJSZXN1bHQoc2VsZlsndi1mczpzZWFyY2hSZXN1bHQnXSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKGxvY2F0aW9uLmhhc2guaW5kZXhPZihpbmRpdmlkdWFsLmlkKSA+PSAwKSB7XG4gICAgICAgICAgICBzY3JvbGxUbyhzZWxmLnNjcm9sbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBodG1sID0gYFxuICA8ZGl2PlxuICAgIDxzdHlsZSBzY29wZWQ+XG4gICAgICAuc3dpcGUge1xuICAgICAgICBjdXJzb3I6IG1vdmU7XG4gICAgICB9XG4gICAgICAudGQtd3JhcHBlciB7XG4gICAgICAgIG1heC1oZWlnaHQ6IDEwMHB4O1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIH1cbiAgICAgIC50ZC13cmFwcGVyOjphZnRlciB7XG4gICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgIHotaW5kZXg6IDI7XG4gICAgICAgIGJvcmRlci10b3A6IDAgc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICAgIGJvcmRlci1yaWdodDogMCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogN3B4IHNvbGlkIGdyYXk7XG4gICAgICAgIGJvcmRlci1sZWZ0OiA3cHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICB9XG4gICAgICAubWFya2VkIHtcbiAgICAgICAgb3V0bGluZS1vZmZzZXQ6IC0ycHg7XG4gICAgICAgIG91dGxpbmU6IDJweCBzb2xpZCAjYWFhO1xuICAgICAgfVxuICAgIDwvc3R5bGU+XG4gICAgPGgyIGNsYXNzPVwiY2FwdGlvbiBoaWRkZW5cIj5cbiAgICAgIDxzcGFuIGFib3V0PVwiQFwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvc3Bhbj5cbiAgICAgIDxociBjbGFzcz1cIm1hcmdpbi1zbVwiIC8+XG4gICAgPC9oMj5cbiAgICA8ZGl2IGNsYXNzPVwicGFyYW1zXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwic2VhcmNoLWZvcm1cIj48L2Rpdj5cbiAgICAgIDxiciAvPlxuICAgICAgPGRpdiBjbGFzcz1cInNlYXJjaC1hY3Rpb25zIGNsZWFyZml4XCI+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgc2VhcmNoLWJ1dHRvblwiIGlkPVwic2VhcmNoLWJ1dHRvblwiIGFib3V0PVwidi1mczpGaW5kXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9idXR0b24+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgcmVzZXQtYnV0dG9uXCIgaWQ9XCJyZXNldC1idXR0b25cIiBhYm91dD1cInYtZnM6UmVzZXRcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L2J1dHRvbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJyZXN1bHRzLWxvYWQtYnV0dG9uc1wiPlxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJtb3JlLXJlc3VsdHMgYnRuIGJ0bi1wcmltYXJ5IGhpZGRlblwiIGFib3V0PVwidi1mczpNb3JlUmVzdWx0c1wiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJhbGwtcmVzdWx0cyBidG4gYnRuLXdhcm5pbmcgaGlkZGVuXCIgYWJvdXQ9XCJ2LWZzOkFsbFJlc3VsdHNcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L2J1dHRvbj5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicHVsbC1yaWdodCBidG4tZ3JvdXAgZHJvcHVwIHNldC1jb2x1bW5zLXdyYXBwZXJcIiBzdHlsZT1cIm1hcmdpbi1sZWZ0OjNweDtcIj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWluZm8gZHJvcGRvd24tdG9nZ2xlIHNldC1jb2x1bW5zXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCI+XG4gICAgICAgICAgPHNwYW4gYWJvdXQ9XCJ2LWZzOlNldENvbHVtbnNcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJjYXJldFwiPjwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkcm9wZG93bi1tZW51XCIgc3R5bGU9XCJwYWRkaW5nOjE1cHg7IHdpZHRoOiAzMDBweDsgbWF4LWhlaWdodDogNTAwcHg7IG92ZXJmbG93LXk6IGF1dG87XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNoZWNrYm94XCI+XG4gICAgICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImNvbHVtbi1jaGVja1wiIHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ9XCJ0cnVlXCI+IDxzcGFuIGNsYXNzPVwiY29sdW1uLW5hbWVcIj48L3NwYW4+XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8YnIgLz5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0cyBoaWRkZW5cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtaGVhZGluZ1wiPlxuICAgICAgICA8aDQgY2xhc3M9XCJjbGVhcmZpeFwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHVsbC1sZWZ0XCIgYWJvdXQ9XCJ2LWZzOlJlc3VsdHNcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L3NwYW4+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInB1bGwtbGVmdCBtYXJnaW4tbWQtaFwiIGFib3V0PVwiQFwiIGRhdGEtdGVtcGxhdGU9XCJ2LWZzOlNlbGVjdGVkUmVzdWx0c0FjdGlvbnNUZW1wbGF0ZVwiPjwvZGl2PlxuICAgICAgICAgIDxzbWFsbCBjbGFzcz1cInN0YXRzLXRvcCBwdWxsLXJpZ2h0XCIgc3R5bGU9XCJjb2xvcjpibGFja1wiPlxuICAgICAgICAgICAgPHNwYW4gYWJvdXQ9XCJ2LWZzOmVzdGltYXRlZFwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGFib3V0PVwiQFwiIHByb3BlcnR5PVwidi1mczplc3RpbWF0ZWRcIiBjbGFzcz1cImJhZGdlXCI+PC9zcGFuPiZuYnNwOyZuYnNwO1xuICAgICAgICAgICAgPHNwYW4gYWJvdXQ9XCJ2LWZzOmN1cnNvclwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGFib3V0PVwiQFwiIHByb3BlcnR5PVwidi1mczpjdXJzb3JcIiBjbGFzcz1cImJhZGdlXCI+PC9zcGFuPiZuYnNwOyZuYnNwO1xuICAgICAgICAgICAgPHN0cm9uZyBhYm91dD1cInYtZnM6YXV0aG9yaXplZFwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvc3Ryb25nPlxuICAgICAgICAgICAgPHNwYW4gYWJvdXQ9XCJAXCIgcHJvcGVydHk9XCJ2LWZzOmF1dGhvcml6ZWRcIiBjbGFzcz1cImJhZGdlXCI+PC9zcGFuPiZuYnNwOyZuYnNwO1xuICAgICAgICAgIDwvc21hbGw+XG4gICAgICAgIDwvaDQ+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzZWFyY2gtcmVzdWx0IHRhYmxlLXJlc3BvbnNpdmUgcmVzcG9uc2l2ZS13cmFwcGVyIG5vU3dpcGVcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJub3QtZm91bmQgYWxlcnQgYWxlcnQtd2FybmluZyBuby1tYXJnaW4gaGlkZGVuXCI+XG4gICAgICAgIDxzdHJvbmcgYWJvdXQ9XCJ2LWZzOkVtcHR5XCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9zdHJvbmc+IDxzcGFuIGFib3V0PVwidi1mczpOb3RoaW5nRm91bmRcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJuby1tb3JlLXJlc3VsdHMgYWxlcnQgYWxlcnQtc3VjY2VzcyBuby1tYXJnaW4gaGlkZGVuXCI+XG4gICAgICAgIDxzdHJvbmcgYWJvdXQ9XCJ2LWZzOk5vTW9yZVJlc3VsdHNcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L3N0cm9uZz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJzZWFyY2gtZXJyb3IgYWxlcnQgYWxlcnQtZGFuZ2VyIG5vLW1hcmdpbiBoaWRkZW5cIj5cbiAgICAgIDxzdHJvbmcgYWJvdXQ9XCJ2LWZzOlNlYXJjaEVycm9yTWVzc2FnZVwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvc3Ryb25nPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbmA7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O01BQU9BLFVBQVUsR0FBQUMsZUFBQSxDQUFBQyxPQUFBO0lBQUEsYUFBQUMsT0FBQTtNQUNWQyxDQUFDLEdBQUFELE9BQUEsQ0FBQUQsT0FBQTtJQUFBLGFBQUFHLDJCQUFBO01BQ0RDLGVBQWUsR0FBQUQsMkJBQUEsQ0FBQUgsT0FBQTtJQUFBLGFBQUFLLEtBQUE7TUFDZkMsSUFBSSxHQUFBRCxLQUFBLENBQUFMLE9BQUE7SUFBQSxh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