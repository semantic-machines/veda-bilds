"use strict";

System.register(["jquery", "../../common/individual_model.js", "../../common/util.js", "./veda_control_util.js"], function (_export, _context) {
  "use strict";

  var $, IndividualModel, Util, interpolate, ftQuery, renderValue, defaults;
  function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
  function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }
  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_commonIndividual_modelJs) {
      IndividualModel = _commonIndividual_modelJs.default;
    }, function (_commonUtilJs) {
      Util = _commonUtilJs.default;
    }, function (_veda_control_utilJs) {
      interpolate = _veda_control_utilJs.interpolate;
      ftQuery = _veda_control_utilJs.ftQuery;
      renderValue = _veda_control_utilJs.renderValue;
    }],
    execute: function () {
      $.fn.veda_link = function (options) {
        var _this$attr;
        var self = this;
        var opts = _objectSpread(_objectSpread({}, defaults), options);
        var control = $(opts.template);
        var template = this.attr('data-template') || '{@.rdfs:label}';
        var individual = opts.individual;
        var spec = opts.spec;
        var placeholder = this.attr('placeholder') || (spec && spec.hasValue('v-ui:placeholder') ? spec['v-ui:placeholder'].map(Util.formatValue).join(' ') : new IndividualModel('v-s:StartTypingBundle'));
        var rel_uri = opts.property_uri;
        var rangeRestriction = spec && spec.hasValue('v-ui:rangeRestriction') ? spec['v-ui:rangeRestriction'][0] : undefined;
        var range = rangeRestriction ? [rangeRestriction] : new IndividualModel(rel_uri)['rdfs:range'];
        var queryPattern = (_this$attr = this.attr('data-query-pattern')) !== null && _this$attr !== void 0 ? _this$attr : spec && spec.hasValue('v-ui:queryPattern') ? spec['v-ui:queryPattern'][0].toString() : undefined;
        var queryPrefix = this.attr('data-query-prefix') || (spec && spec.hasValue('v-ui:queryPrefix') ? spec['v-ui:queryPrefix'][0].toString() : range.map(function (item) {
          return '\'rdf:type\'===\'' + item.id + '\'';
        }).join(' || '));
        var isDynamicQueryPrefix = this.attr('data-dynamic-query-prefix') == 'true';
        var source = this.attr('data-source') || undefined;
        var sort = this.attr('data-sort') || spec && spec.hasValue('v-ui:sort') && spec['v-ui:sort'][0].toString();
        var isSingle = this.attr('data-single') || (spec && spec.hasValue('v-ui:maxCardinality') ? spec['v-ui:maxCardinality'][0] === 1 : true);
        var withDeleted = this.attr('data-deleted') || false;
        if (isSingle == 'false') isSingle = false;
        var tabindex = this.attr('tabindex');
        if (tabindex) {
          this.removeAttr('tabindex');
          control.find('textarea').attr('tabindex', tabindex);
        }
        if (template) {
          this.removeAttr('data-template');
        }

        // Select value
        var select = function select(values) {
          values = _instanceof(values, Array) ? values : [values];
          if (isSingle) {
            individual.set(rel_uri, [values[0]]);
          } else {
            var filtered = values.filter(function (i) {
              return individual.get(rel_uri).indexOf(i) < 0;
            });
            individual.set(rel_uri, individual.get(rel_uri).concat(filtered));
          }
        };
        var createValue = function createValue() {
          var newVal = new IndividualModel();
          newVal['rdf:type'] = rangeRestriction ? [rangeRestriction] : [new IndividualModel(rel_uri)['rdfs:range'][0]];
          return newVal;
        };

        // Create feature
        var create = $('.create', control);
        if (this.hasClass('create') || this.hasClass('full')) {
          var inModal = this.hasClass('create-modal');
          var rel_range = rangeRestriction ? rangeRestriction : new IndividualModel(rel_uri)['rdfs:range'][0];
          rel_range.rights.then(function (rights) {
            if (!rights.hasValue('v-s:canCreate', true) && opts.mode !== 'search') {
              create.addClass('disabled');
              create.off('click keyup');
            } else {
              create.on('click keydown', function (ev) {
                if (ev.type !== 'click' && ev.which !== 13 && ev.which !== 32) {
                  return;
                }
                ev.preventDefault();
                ev.stopPropagation();
                var newVal = createValue();
                if (inModal) {
                  var modal = $('#individual-modal-template').html();
                  modal = $(modal).modal({
                    'show': false
                  });
                  $('body').append(modal);
                  modal.modal('show');
                  var ok = $('#ok', modal).click(function () {
                    select(newVal);
                  });
                  $('.close', modal).click(function () {
                    newVal.delete();
                  });
                  var cntr = $('.modal-body', modal);
                  newVal.one('beforeReset', function () {
                    modal.modal('hide').remove();
                  });
                  newVal.one('afterSave', function () {
                    select(newVal);
                    modal.modal('hide').remove();
                  });
                  newVal.present(cntr, undefined, 'edit').then(function (tmpl) {
                    tmpl = $(tmpl);
                    $('.action', tmpl).remove();
                    var isValid = tmpl.attr('data-valid');
                    if (isValid === 'true') {
                      ok.removeAttr('disabled');
                    } else {
                      ok.attr('disabled', 'disabled');
                    }
                    tmpl.on('internal-validated', function (e) {
                      var validation = e.detail;
                      if (validation.state) {
                        ok.removeAttr('disabled');
                      } else {
                        ok.attr('disabled', 'disabled');
                      }
                    });
                  });
                } else {
                  select(newVal);
                }
              });
            }
          });

          // Hide create button for single value relations if value exists
          if (isSingle) {
            var singleValueHandler = function singleValueHandler(values) {
              if (values.length) {
                create.hide();
              } else {
                create.show();
              }
            };
            individual.on(rel_uri, singleValueHandler);
            self.one('remove', function () {
              individual.off(rel_uri, singleValueHandler);
            });
            singleValueHandler(individual.get(rel_uri));
          }
        } else {
          create.remove();
        }

        // Tree feature
        var tree = $('.tree', control);
        if (this.hasClass('tree') || this.hasClass('full')) {
          var treeTmpl = new IndividualModel('v-ui:TreeTemplate');
          var modal = $('#individual-modal-template').html();
          tree.on('click keydown', function (e) {
            if (e.type !== 'click' && e.which !== 13 && e.which !== 32) {
              return;
            }
            e.preventDefault();
            e.stopPropagation();
            var $modal = $(modal);
            var cntr = $('.modal-body', $modal);
            $modal.on('hidden.bs.modal', function () {
              $modal.remove();
            });
            $modal.modal();
            $('body').append($modal);
            var extra = {
              target: individual,
              target_rel_uri: rel_uri,
              isSingle: isSingle,
              withDeleted: withDeleted,
              sort: sort
            };
            spec.present(cntr, treeTmpl, undefined, extra);
          });
        } else {
          tree.remove();
        }

        // Fulltext search feature
        var selected = [];
        var fulltext = $('.fulltext', control);
        var fulltextMenu = $('.fulltext-menu', control);
        if (this.hasClass('fulltext') || this.hasClass('full')) {
          if (_instanceof(placeholder, IndividualModel)) {
            placeholder.load().then(function () {
              fulltext.attr({
                'placeholder': placeholder.toString(),
                'name': (individual.hasValue('rdf:type') ? individual['rdf:type'][0].id + '_' + rel_uri : rel_uri).toLowerCase().replace(/[-:]/g, '_')
              });
            });
          } else {
            fulltext.attr({
              'placeholder': placeholder,
              'name': (individual.hasValue('rdf:type') ? individual['rdf:type'][0].id + '_' + rel_uri : rel_uri).toLowerCase().replace(/[-:]/g, '_')
            });
          }
          fulltext.on('input change focus blur', function (e) {
            var value = fulltext.val();
            if (value) {
              var rows = value.split('\n').length;
              fulltext.prop('rows', rows);
            } else {
              fulltext.prop('rows', 1);
            }
          });
          var header = $('.header', control);
          Promise.all([new IndividualModel('v-s:SelectAll').load(), new IndividualModel('v-s:CancelSelection').load(), new IndividualModel('v-s:InvertSelection').load()]).then(function (actions) {
            header.find('.select-all').click(function () {
              suggestions.children(':not(.selected)').click();
            }).text(actions[0].toString());
            header.find('.cancel-selection').click(function () {
              suggestions.children('.selected').click();
            }).text(actions[1].toString());
            header.find('.invert-selection').click(function () {
              suggestions.children().click();
            }).text(actions[2].toString());
            header.find('.close-menu').click(function () {
              individual.set(rel_uri, selected);
              fulltextMenu.hide();
              $(document).off('click', clickOutsideMenuHandler);
              $(document).off('keydown', arrowHandler);
            }).text('Ok');
          });
          if (isSingle) {
            header.hide();
          }
          this.on('view edit search', function (e) {
            e.stopPropagation();
            if (e.type === 'search') {
              if ($(e.delegateTarget).data('single')) {
                header.hide();
              } else {
                header.show();
              }
            }
          });
          var performSearch = function performSearch(value) {
            if (source) {
              return Promise.resolve(eval(source)).then(renderResults).catch(function (error) {
                console.error('Source failed', source);
              });
            } else {
              if (isDynamicQueryPrefix) {
                queryPrefix = self.attr('data-query-prefix');
              }
              interpolate(queryPrefix, individual).then(function (prefix) {
                ftQuery(prefix, value, sort, withDeleted, queryPattern).then(renderResults).catch(function (error) {
                  console.error('Fulltext query failed');
                });
              });
            }
          };
          var inputHandler = function () {
            var timeout;
            var minLength = 3;
            var nav_keys = [37, 38, 39, 40, 9, 16]; // Arrows, shift, tab
            return function (e) {
              if (timeout) {
                clearTimeout(timeout);
              }
              if (nav_keys.indexOf(e.which) >= 0) {
                return;
              }
              timeout = setTimeout(function () {
                var value = e.target.value;
                if (value.indexOf('"') >= 0 || value.indexOf("'") >= 0) {
                  value = value.replaceAll('"', '').replaceAll("'", '');
                  fulltext.val(value);
                }
                if (value.length >= minLength) {
                  performSearch(value);
                } else if (!value.length) {
                  if (isSingle) {
                    individual.clearValue(rel_uri);
                  }
                  suggestions.empty();
                  fulltextMenu.hide();
                  $(document).off('click', clickOutsideMenuHandler);
                  $(document).off('keydown', arrowHandler);
                }
              }, 750);
            };
          }();
          fulltext.on('keydown', inputHandler);
          var renderResults = function renderResults(results) {
            suggestions.empty();
            selected = individual.get(rel_uri);
            if (results.length) {
              var promises = results.map(function (value) {
                return renderValue(value, template).then(function (rendered) {
                  var tmpl = $('<a href=\'#\' class=\'suggestion\'></a>').text(rendered).attr('resource', value.id);
                  if (individual.hasValue(rel_uri, value)) {
                    tmpl.addClass('selected');
                  }
                  if (value.hasValue('v-s:deleted', true)) {
                    tmpl.addClass('deleted');
                  }
                  if (value.hasValue('v-s:valid', false) && !value.hasValue('v-s:deleted', true)) {
                    tmpl.addClass('invalid');
                  }
                  return tmpl;
                }).catch(function (error) {
                  console.log('Error rendering value', error);
                });
              });
              Promise.all(promises).then(function (renderedList) {
                suggestions.append(renderedList);
                $(document).off('click', clickOutsideMenuHandler);
                $(document).off('keydown', arrowHandler);
                fulltextMenu.show();
                $(document).on('click', clickOutsideMenuHandler);
                $(document).on('keydown', arrowHandler);
              });
            } else {
              fulltextMenu.hide();
              $(document).off('click', clickOutsideMenuHandler);
              $(document).off('keydown', arrowHandler);
            }
          };
          var suggestions = $('.suggestions', control);
          var dblTimeout;
          suggestions.on('click', '.suggestion', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (!e.originalEvent) {
              clickHandler(e);
            } else if (dblTimeout) {
              dblclickHandler(e);
            } else {
              clickHandler(e);
            }
          }).on('keydown', '.suggestion', function (e) {
            if (e.which === 32) {
              e.preventDefault();
              e.stopPropagation();
              clickHandler(e);
            } else if (e.which === 13) {
              e.preventDefault();
              e.stopPropagation();
              dblclickHandler(e);
            }
          }).on('dblclick', '.suggestion', function (e) {
            e.preventDefault();
          });
          var clickHandler = function clickHandler(e) {
            e.preventDefault();
            var tmpl = $(e.target);
            var suggestion_uri = tmpl.attr('resource');
            if (!suggestion_uri) {
              return;
            }
            var suggestion = new IndividualModel(suggestion_uri);
            tmpl.toggleClass('selected');
            if (isSingle) {
              tmpl.siblings().removeClass('selected');
            }
            if (selected.indexOf(suggestion) >= 0) {
              if (isSingle) {
                individual.set(rel_uri, [suggestion]);
                fulltextMenu.hide();
                $(document).off('click', clickOutsideMenuHandler);
                $(document).off('keydown', arrowHandler);
                fulltext.focus();
              } else {
                selected = selected.filter(function (value) {
                  return value !== suggestion;
                });
              }
            } else {
              if (isSingle) {
                selected = [suggestion];
                individual.set(rel_uri, selected);
                fulltextMenu.hide();
                $(document).off('click', clickOutsideMenuHandler);
                $(document).off('keydown', arrowHandler);
                fulltext.focus();
              } else {
                selected.push(suggestion);
              }
            }
            dblTimeout = setTimeout(function () {
              dblTimeout = undefined;
            }, 300);
          };
          var dblclickHandler = function dblclickHandler(e) {
            e.preventDefault();
            if (!$(e.target).hasClass('selected')) {
              clickHandler(e);
            }
            dblTimeout = clearTimeout(dblTimeout);
            individual.set(rel_uri, selected);
            fulltextMenu.hide();
            $(document).off('click', clickOutsideMenuHandler);
            $(document).off('keydown', arrowHandler);
            fulltext.focus();
          };
          var clickOutsideMenuHandler = function clickOutsideMenuHandler(e) {
            if (!$(e.target).closest(fulltextMenu).length) {
              if (fulltextMenu.is(':visible')) {
                individual.set(rel_uri, selected);
                fulltextMenu.hide();
                $(document).off('click', clickOutsideMenuHandler);
                $(document).off('keydown', arrowHandler);
              }
            }
          };
          var arrowHandler = function arrowHandler(e) {
            if (e.which === 40) {
              // Down
              e.preventDefault();
              var active = suggestions.find('.active').removeClass('active');
              var next = active.next();
              if (next.length) {
                next.addClass('active').focus();
              } else {
                suggestions.children().first().addClass('active').focus();
              }
            } else if (e.which === 38) {
              // Up
              e.preventDefault();
              var _active = suggestions.find('.active').removeClass('active');
              var prev = _active.prev();
              if (prev.length) {
                prev.addClass('active').focus();
              } else {
                suggestions.children().last().addClass('active').focus();
              }
            } else if (e.which === 32 && fulltextMenu.find(':focus').length) {
              // Space
              e.preventDefault(); // Prevent scrolling on space
            }
          };

          var propertyModifiedHandler = function propertyModifiedHandler() {
            if (isSingle && individual.hasValue(rel_uri)) {
              individual.get(rel_uri)[0].load().then(function (value) {
                return renderValue(value, template);
              }).then(function (rendered) {
                var inputValue = fulltext.val();
                if (inputValue != rendered) {
                  fulltext.val(rendered);
                }
              }).catch(function (error) {
                console.log('Error rendering value', error);
              });
            } else {
              fulltext.val('');
            }
            selected = selected.filter(function (item) {
              return individual.hasValue(rel_uri, item);
            });
            suggestions.children().removeClass('selected').each(function () {
              var item = $(this);
              var resource = item.attr('resource');
              if (individual.hasValue(rel_uri, resource)) {
                item.addClass('selected');
              }
            });
          };
          individual.on(rel_uri, propertyModifiedHandler);
          self.one('remove', function () {
            individual.off(rel_uri, propertyModifiedHandler);
          });
          propertyModifiedHandler();

          // Dropdown feature
          var dropdown = $('.dropdown', control);
          if (this.hasClass('dropdown') && this.hasClass('fulltext') || this.hasClass('full')) {
            dropdown.on('click keydown', function (e) {
              if (e.type !== 'click' && e.which !== 13 && e.which !== 32) {
                return;
              }
              e.preventDefault();
              e.stopPropagation();
              if (fulltextMenu.is(':visible')) {
                fulltextMenu.hide();
                $(document).off('click', clickOutsideMenuHandler);
                $(document).off('keydown', arrowHandler);
              } else {
                if (suggestions.is(':empty') || isDynamicQueryPrefix) {
                  performSearch();
                } else {
                  $(document).off('click', clickOutsideMenuHandler);
                  $(document).off('keydown', arrowHandler);
                  fulltextMenu.show();
                  $(document).on('click', clickOutsideMenuHandler);
                  $(document).on('keydown', arrowHandler);
                }
              }
            });
            var downHandler = function downHandler(e) {
              if (e.which === 40) {
                e.stopPropagation();
                dropdown.click();
              }
            };
            fulltext.on('focus', function (e) {
              fulltext.off('keydown', downHandler).one('keydown', downHandler);
            });
          } else {
            dropdown.remove();
          }
        } else {
          fulltext.remove();
          fulltextMenu.remove();
          $('.dropdown', control).remove();
        }

        // Clear feature
        if (isSingle && opts.mode !== 'search' && (this.hasClass('fulltext') || this.hasClass('full'))) {
          $('.clear', control).on('click keydown', function (e) {
            if (e.type !== 'click' && e.which !== 13 && e.which !== 32) {
              return;
            }
            e.preventDefault();
            e.stopPropagation();
            selected = [];
            $('.suggestions', control).empty();
            individual.clearValue(rel_uri);
            fulltext.val('').focus();
          });
          this.on('view edit search', function (e) {
            e.stopPropagation();
            if (e.type === 'search') {
              if (!$(e.delegateTarget).data('single')) {
                $('.clear', control).remove();
              }
            }
          });
        } else {
          $('.clear', control).remove();
        }
        if (!$('.fulltext', control).length) {
          $('.input-group', control).toggleClass('input-group btn-group');
          $('.input-group-addon', control).toggleClass('input-group-addon btn-default btn-primary');
        }
        this.on('view edit search', function (e) {
          e.stopPropagation();
          if (e.type === 'search') {
            isSingle = $(e.delegateTarget).data('single') || false;
            var dataDeleted = $(e.delegateTarget).data('deleted');
            withDeleted = typeof dataDeleted === 'boolean' ? dataDeleted : true;
          }
        });
        if (spec && spec.hasValue('v-ui:tooltip')) {
          control.tooltip({
            title: spec['v-ui:tooltip'].map(Util.formatValue).join(' '),
            placement: 'top',
            container: 'body',
            trigger: 'manual',
            animation: false
          });
          this.one('remove', function () {
            return control.tooltip('destroy');
          });
          $('textarea', control).on('focusin', function () {
            return control.tooltip('show');
          }).on('focusout change', function () {
            return control.tooltip('hide');
          });
        }
        this.append(control);
        return this;
      };
      defaults = {
        template: "\n<div class=\"link-control\">\n  <div class=\"input-group\">\n    <div class=\"input-group-addon btn btn-default tree\" tabindex=\"0\">\n      <i class=\"fa fa-sitemap\"></i>\n    </div>\n    <textarea rows=\"1\" class=\"form-control fulltext\"></textarea>\n    <div class=\"input-group-addon btn btn-default clear\" tabindex=\"0\">&#10005;</div>\n    <div class=\"input-group-addon btn btn-default dropdown\" tabindex=\"0\">\n      <i class=\"caret\"></i>\n    </div>\n    <div class=\"input-group-addon btn btn-default create\" tabindex=\"0\">\n      <i class=\"glyphicon glyphicon-plus\"></i>\n    </div>\n  </div>\n  <div class=\"fulltext-menu\">\n    <div class=\"header clearfix\">\n      <small class=\"link-actions pull-left\">\n        <span class=\"select-all\"></span>\n        <span class=\"cancel-selection\"></span>\n        <span class=\"invert-selection\"></span>\n      </small>\n      <small class=\"link-actions pull-right\">\n        <span class=\"close-menu\"></span>\n      </small>\n    </div>\n    <div class=\"suggestions\"></div>\n  </div>\n</div>\n  "
      };
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfY29tbW9uSW5kaXZpZHVhbF9tb2RlbEpzIiwiSW5kaXZpZHVhbE1vZGVsIiwiX2NvbW1vblV0aWxKcyIsIlV0aWwiLCJfdmVkYV9jb250cm9sX3V0aWxKcyIsImludGVycG9sYXRlIiwiZnRRdWVyeSIsInJlbmRlclZhbHVlIiwiZXhlY3V0ZSIsImZuIiwidmVkYV9saW5rIiwib3B0aW9ucyIsIl90aGlzJGF0dHIiLCJzZWxmIiwib3B0cyIsIl9vYmplY3RTcHJlYWQiLCJkZWZhdWx0cyIsImNvbnRyb2wiLCJ0ZW1wbGF0ZSIsImF0dHIiLCJpbmRpdmlkdWFsIiwic3BlYyIsInBsYWNlaG9sZGVyIiwiaGFzVmFsdWUiLCJtYXAiLCJmb3JtYXRWYWx1ZSIsImpvaW4iLCJyZWxfdXJpIiwicHJvcGVydHlfdXJpIiwicmFuZ2VSZXN0cmljdGlvbiIsInVuZGVmaW5lZCIsInJhbmdlIiwicXVlcnlQYXR0ZXJuIiwidG9TdHJpbmciLCJxdWVyeVByZWZpeCIsIml0ZW0iLCJpZCIsImlzRHluYW1pY1F1ZXJ5UHJlZml4Iiwic291cmNlIiwic29ydCIsImlzU2luZ2xlIiwid2l0aERlbGV0ZWQiLCJ0YWJpbmRleCIsInJlbW92ZUF0dHIiLCJmaW5kIiwic2VsZWN0IiwidmFsdWVzIiwiX2luc3RhbmNlb2YiLCJBcnJheSIsInNldCIsImZpbHRlcmVkIiwiZmlsdGVyIiwiaSIsImdldCIsImluZGV4T2YiLCJjb25jYXQiLCJjcmVhdGVWYWx1ZSIsIm5ld1ZhbCIsImNyZWF0ZSIsImhhc0NsYXNzIiwiaW5Nb2RhbCIsInJlbF9yYW5nZSIsInJpZ2h0cyIsInRoZW4iLCJtb2RlIiwiYWRkQ2xhc3MiLCJvZmYiLCJvbiIsImV2IiwidHlwZSIsIndoaWNoIiwicHJldmVudERlZmF1bHQiLCJzdG9wUHJvcGFnYXRpb24iLCJtb2RhbCIsImh0bWwiLCJhcHBlbmQiLCJvayIsImNsaWNrIiwiZGVsZXRlIiwiY250ciIsIm9uZSIsInJlbW92ZSIsInByZXNlbnQiLCJ0bXBsIiwiaXNWYWxpZCIsImUiLCJ2YWxpZGF0aW9uIiwiZGV0YWlsIiwic3RhdGUiLCJzaW5nbGVWYWx1ZUhhbmRsZXIiLCJsZW5ndGgiLCJoaWRlIiwic2hvdyIsInRyZWUiLCJ0cmVlVG1wbCIsIiRtb2RhbCIsImV4dHJhIiwidGFyZ2V0IiwidGFyZ2V0X3JlbF91cmkiLCJzZWxlY3RlZCIsImZ1bGx0ZXh0IiwiZnVsbHRleHRNZW51IiwibG9hZCIsInRvTG93ZXJDYXNlIiwicmVwbGFjZSIsInZhbHVlIiwidmFsIiwicm93cyIsInNwbGl0IiwicHJvcCIsImhlYWRlciIsIlByb21pc2UiLCJhbGwiLCJhY3Rpb25zIiwic3VnZ2VzdGlvbnMiLCJjaGlsZHJlbiIsInRleHQiLCJkb2N1bWVudCIsImNsaWNrT3V0c2lkZU1lbnVIYW5kbGVyIiwiYXJyb3dIYW5kbGVyIiwiZGVsZWdhdGVUYXJnZXQiLCJkYXRhIiwicGVyZm9ybVNlYXJjaCIsInJlc29sdmUiLCJldmFsIiwicmVuZGVyUmVzdWx0cyIsImNhdGNoIiwiZXJyb3IiLCJjb25zb2xlIiwicHJlZml4IiwiaW5wdXRIYW5kbGVyIiwidGltZW91dCIsIm1pbkxlbmd0aCIsIm5hdl9rZXlzIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsInJlcGxhY2VBbGwiLCJjbGVhclZhbHVlIiwiZW1wdHkiLCJyZXN1bHRzIiwicHJvbWlzZXMiLCJyZW5kZXJlZCIsImxvZyIsInJlbmRlcmVkTGlzdCIsImRibFRpbWVvdXQiLCJvcmlnaW5hbEV2ZW50IiwiY2xpY2tIYW5kbGVyIiwiZGJsY2xpY2tIYW5kbGVyIiwic3VnZ2VzdGlvbl91cmkiLCJzdWdnZXN0aW9uIiwidG9nZ2xlQ2xhc3MiLCJzaWJsaW5ncyIsInJlbW92ZUNsYXNzIiwiZm9jdXMiLCJwdXNoIiwiY2xvc2VzdCIsImlzIiwiYWN0aXZlIiwibmV4dCIsImZpcnN0IiwicHJldiIsImxhc3QiLCJwcm9wZXJ0eU1vZGlmaWVkSGFuZGxlciIsImlucHV0VmFsdWUiLCJlYWNoIiwicmVzb3VyY2UiLCJkcm9wZG93biIsImRvd25IYW5kbGVyIiwiZGF0YURlbGV0ZWQiLCJ0b29sdGlwIiwidGl0bGUiLCJwbGFjZW1lbnQiLCJjb250YWluZXIiLCJ0cmlnZ2VyIiwiYW5pbWF0aW9uIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc291cmNlLXdlYi9qcy9icm93c2VyL2NvbnRyb2xzL3ZlZGFfbGluay5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMaW5rIGNvbnRyb2xcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuaW1wb3J0IEluZGl2aWR1YWxNb2RlbCBmcm9tICcuLi8uLi9jb21tb24vaW5kaXZpZHVhbF9tb2RlbC5qcyc7XG5cbmltcG9ydCBVdGlsIGZyb20gJy4uLy4uL2NvbW1vbi91dGlsLmpzJztcblxuaW1wb3J0IHtpbnRlcnBvbGF0ZSwgZnRRdWVyeSwgcmVuZGVyVmFsdWV9IGZyb20gJy4vdmVkYV9jb250cm9sX3V0aWwuanMnO1xuXG4kLmZuLnZlZGFfbGluayA9IGZ1bmN0aW9uICggb3B0aW9ucyApIHtcbiAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gIGNvbnN0IG9wdHMgPSB7Li4uZGVmYXVsdHMsIC4uLm9wdGlvbnN9O1xuICBjb25zdCBjb250cm9sID0gJChvcHRzLnRlbXBsYXRlKTtcbiAgY29uc3QgdGVtcGxhdGUgPSB0aGlzLmF0dHIoJ2RhdGEtdGVtcGxhdGUnKSB8fCAne0AucmRmczpsYWJlbH0nO1xuICBjb25zdCBpbmRpdmlkdWFsID0gb3B0cy5pbmRpdmlkdWFsO1xuICBjb25zdCBzcGVjID0gb3B0cy5zcGVjO1xuICBjb25zdCBwbGFjZWhvbGRlciA9IHRoaXMuYXR0cigncGxhY2Vob2xkZXInKSB8fCAoIHNwZWMgJiYgc3BlYy5oYXNWYWx1ZSgndi11aTpwbGFjZWhvbGRlcicpID8gc3BlY1sndi11aTpwbGFjZWhvbGRlciddLm1hcChVdGlsLmZvcm1hdFZhbHVlKS5qb2luKCcgJykgOiBuZXcgSW5kaXZpZHVhbE1vZGVsKCd2LXM6U3RhcnRUeXBpbmdCdW5kbGUnKSApO1xuICBjb25zdCByZWxfdXJpID0gb3B0cy5wcm9wZXJ0eV91cmk7XG4gIGNvbnN0IHJhbmdlUmVzdHJpY3Rpb24gPSBzcGVjICYmIHNwZWMuaGFzVmFsdWUoJ3YtdWk6cmFuZ2VSZXN0cmljdGlvbicpID8gc3BlY1sndi11aTpyYW5nZVJlc3RyaWN0aW9uJ11bMF0gOiB1bmRlZmluZWQ7XG4gIGNvbnN0IHJhbmdlID0gcmFuZ2VSZXN0cmljdGlvbiA/IFtyYW5nZVJlc3RyaWN0aW9uXSA6IG5ldyBJbmRpdmlkdWFsTW9kZWwocmVsX3VyaSlbJ3JkZnM6cmFuZ2UnXTtcbiAgY29uc3QgcXVlcnlQYXR0ZXJuID0gdGhpcy5hdHRyKCdkYXRhLXF1ZXJ5LXBhdHRlcm4nKSA/PyAoc3BlYyAmJiBzcGVjLmhhc1ZhbHVlKCd2LXVpOnF1ZXJ5UGF0dGVybicpID8gc3BlY1sndi11aTpxdWVyeVBhdHRlcm4nXVswXS50b1N0cmluZygpIDogdW5kZWZpbmVkKTtcbiAgbGV0IHF1ZXJ5UHJlZml4ID0gdGhpcy5hdHRyKCdkYXRhLXF1ZXJ5LXByZWZpeCcpIHx8ICggc3BlYyAmJiBzcGVjLmhhc1ZhbHVlKCd2LXVpOnF1ZXJ5UHJlZml4JykgPyBzcGVjWyd2LXVpOnF1ZXJ5UHJlZml4J11bMF0udG9TdHJpbmcoKSA6IHJhbmdlLm1hcCgoaXRlbSkgPT4ge1xuICAgIHJldHVybiAnXFwncmRmOnR5cGVcXCc9PT1cXCcnICsgaXRlbS5pZCArICdcXCcnO1xuICB9KS5qb2luKCcgfHwgJykgKTtcbiAgY29uc3QgaXNEeW5hbWljUXVlcnlQcmVmaXggPSB0aGlzLmF0dHIoJ2RhdGEtZHluYW1pYy1xdWVyeS1wcmVmaXgnKSA9PSAndHJ1ZSc7XG4gIGNvbnN0IHNvdXJjZSA9IHRoaXMuYXR0cignZGF0YS1zb3VyY2UnKSB8fCB1bmRlZmluZWQ7XG4gIGNvbnN0IHNvcnQgPSB0aGlzLmF0dHIoJ2RhdGEtc29ydCcpIHx8ICggc3BlYyAmJiBzcGVjLmhhc1ZhbHVlKCd2LXVpOnNvcnQnKSAmJiBzcGVjWyd2LXVpOnNvcnQnXVswXS50b1N0cmluZygpICk7XG4gIGxldCBpc1NpbmdsZSA9IHRoaXMuYXR0cignZGF0YS1zaW5nbGUnKSB8fCAoIHNwZWMgJiYgc3BlYy5oYXNWYWx1ZSgndi11aTptYXhDYXJkaW5hbGl0eScpID8gc3BlY1sndi11aTptYXhDYXJkaW5hbGl0eSddWzBdID09PSAxIDogdHJ1ZSApO1xuICBsZXQgd2l0aERlbGV0ZWQgPSB0aGlzLmF0dHIoJ2RhdGEtZGVsZXRlZCcpIHx8IGZhbHNlO1xuXG4gIGlmIChpc1NpbmdsZSA9PSAnZmFsc2UnKSBpc1NpbmdsZSA9IGZhbHNlO1xuXG4gIGNvbnN0IHRhYmluZGV4ID0gdGhpcy5hdHRyKCd0YWJpbmRleCcpO1xuICBpZiAodGFiaW5kZXgpIHtcbiAgICB0aGlzLnJlbW92ZUF0dHIoJ3RhYmluZGV4Jyk7XG4gICAgY29udHJvbC5maW5kKCd0ZXh0YXJlYScpLmF0dHIoJ3RhYmluZGV4JywgdGFiaW5kZXgpO1xuICB9XG5cbiAgaWYgKHRlbXBsYXRlKSB7XG4gICAgdGhpcy5yZW1vdmVBdHRyKCdkYXRhLXRlbXBsYXRlJyk7XG4gIH1cblxuICAvLyBTZWxlY3QgdmFsdWVcbiAgY29uc3Qgc2VsZWN0ID0gZnVuY3Rpb24gKHZhbHVlcykge1xuICAgIHZhbHVlcyA9IHZhbHVlcyBpbnN0YW5jZW9mIEFycmF5ID8gdmFsdWVzIDogW3ZhbHVlc107XG4gICAgaWYgKGlzU2luZ2xlKSB7XG4gICAgICBpbmRpdmlkdWFsLnNldChyZWxfdXJpLCBbdmFsdWVzWzBdXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGZpbHRlcmVkID0gdmFsdWVzLmZpbHRlcigoaSkgPT4ge1xuICAgICAgICByZXR1cm4gaW5kaXZpZHVhbC5nZXQocmVsX3VyaSkuaW5kZXhPZihpKSA8IDA7XG4gICAgICB9KTtcbiAgICAgIGluZGl2aWR1YWwuc2V0KHJlbF91cmksIGluZGl2aWR1YWwuZ2V0KHJlbF91cmkpLmNvbmNhdChmaWx0ZXJlZCkpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBjcmVhdGVWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBuZXdWYWwgPSBuZXcgSW5kaXZpZHVhbE1vZGVsKCk7XG4gICAgbmV3VmFsWydyZGY6dHlwZSddID0gcmFuZ2VSZXN0cmljdGlvbiA/IFtyYW5nZVJlc3RyaWN0aW9uXSA6IFsobmV3IEluZGl2aWR1YWxNb2RlbChyZWxfdXJpKSlbJ3JkZnM6cmFuZ2UnXVswXV07XG4gICAgcmV0dXJuIG5ld1ZhbDtcbiAgfTtcblxuICAvLyBDcmVhdGUgZmVhdHVyZVxuICBjb25zdCBjcmVhdGUgPSAkKCcuY3JlYXRlJywgY29udHJvbCk7XG4gIGlmICggdGhpcy5oYXNDbGFzcygnY3JlYXRlJykgfHwgdGhpcy5oYXNDbGFzcygnZnVsbCcpICkge1xuICAgIGNvbnN0IGluTW9kYWwgPSB0aGlzLmhhc0NsYXNzKCdjcmVhdGUtbW9kYWwnKTtcbiAgICBjb25zdCByZWxfcmFuZ2UgPSByYW5nZVJlc3RyaWN0aW9uID8gcmFuZ2VSZXN0cmljdGlvbiA6IChuZXcgSW5kaXZpZHVhbE1vZGVsKHJlbF91cmkpKVsncmRmczpyYW5nZSddWzBdO1xuICAgIHJlbF9yYW5nZS5yaWdodHMudGhlbigocmlnaHRzKSA9PiB7XG4gICAgICBpZiAoICFyaWdodHMuaGFzVmFsdWUoJ3YtczpjYW5DcmVhdGUnLCB0cnVlKSAmJiBvcHRzLm1vZGUgIT09ICdzZWFyY2gnICkge1xuICAgICAgICBjcmVhdGUuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAgIGNyZWF0ZS5vZmYoJ2NsaWNrIGtleXVwJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjcmVhdGUub24oJ2NsaWNrIGtleWRvd24nLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICBpZiAoZXYudHlwZSAhPT0gJ2NsaWNrJyAmJiBldi53aGljaCAhPT0gMTMgJiYgZXYud2hpY2ggIT09IDMyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgY29uc3QgbmV3VmFsID0gY3JlYXRlVmFsdWUoKTtcbiAgICAgICAgICBpZiAoIGluTW9kYWwgKSB7XG4gICAgICAgICAgICBsZXQgbW9kYWwgPSAkKCcjaW5kaXZpZHVhbC1tb2RhbC10ZW1wbGF0ZScpLmh0bWwoKTtcbiAgICAgICAgICAgIG1vZGFsID0gJChtb2RhbCkubW9kYWwoeydzaG93JzogZmFsc2V9KTtcbiAgICAgICAgICAgICQoJ2JvZHknKS5hcHBlbmQobW9kYWwpO1xuICAgICAgICAgICAgbW9kYWwubW9kYWwoJ3Nob3cnKTtcbiAgICAgICAgICAgIGNvbnN0IG9rID0gJCgnI29rJywgbW9kYWwpLmNsaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgc2VsZWN0KG5ld1ZhbCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoJy5jbG9zZScsIG1vZGFsKS5jbGljaygoKSA9PiB7XG4gICAgICAgICAgICAgIG5ld1ZhbC5kZWxldGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgY250ciA9ICQoJy5tb2RhbC1ib2R5JywgbW9kYWwpO1xuICAgICAgICAgICAgbmV3VmFsLm9uZSgnYmVmb3JlUmVzZXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIG1vZGFsLm1vZGFsKCdoaWRlJykucmVtb3ZlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG5ld1ZhbC5vbmUoJ2FmdGVyU2F2ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgc2VsZWN0KG5ld1ZhbCk7XG4gICAgICAgICAgICAgIG1vZGFsLm1vZGFsKCdoaWRlJykucmVtb3ZlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG5ld1ZhbC5wcmVzZW50KGNudHIsIHVuZGVmaW5lZCwgJ2VkaXQnKS50aGVuKCh0bXBsKSA9PiB7XG4gICAgICAgICAgICAgIHRtcGwgPSAkKHRtcGwpO1xuICAgICAgICAgICAgICAkKCcuYWN0aW9uJywgdG1wbCkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgIGNvbnN0IGlzVmFsaWQgPSB0bXBsLmF0dHIoJ2RhdGEtdmFsaWQnKTtcbiAgICAgICAgICAgICAgaWYgKCBpc1ZhbGlkID09PSAndHJ1ZScgKSB7XG4gICAgICAgICAgICAgICAgb2sucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvay5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRtcGwub24oJ2ludGVybmFsLXZhbGlkYXRlZCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsaWRhdGlvbiA9IGUuZGV0YWlsO1xuICAgICAgICAgICAgICAgIGlmICh2YWxpZGF0aW9uLnN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICBvay5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBvay5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZWN0KG5ld1ZhbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIEhpZGUgY3JlYXRlIGJ1dHRvbiBmb3Igc2luZ2xlIHZhbHVlIHJlbGF0aW9ucyBpZiB2YWx1ZSBleGlzdHNcbiAgICBpZiAoaXNTaW5nbGUpIHtcbiAgICAgIGNvbnN0IHNpbmdsZVZhbHVlSGFuZGxlciA9IGZ1bmN0aW9uICh2YWx1ZXMpIHtcbiAgICAgICAgaWYgKHZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgICBjcmVhdGUuaGlkZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNyZWF0ZS5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBpbmRpdmlkdWFsLm9uKHJlbF91cmksIHNpbmdsZVZhbHVlSGFuZGxlcik7XG4gICAgICBzZWxmLm9uZSgncmVtb3ZlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpbmRpdmlkdWFsLm9mZihyZWxfdXJpLCBzaW5nbGVWYWx1ZUhhbmRsZXIpO1xuICAgICAgfSk7XG4gICAgICBzaW5nbGVWYWx1ZUhhbmRsZXIoaW5kaXZpZHVhbC5nZXQocmVsX3VyaSkpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjcmVhdGUucmVtb3ZlKCk7XG4gIH1cblxuICAvLyBUcmVlIGZlYXR1cmVcbiAgY29uc3QgdHJlZSA9ICQoJy50cmVlJywgY29udHJvbCk7XG4gIGlmICggdGhpcy5oYXNDbGFzcygndHJlZScpIHx8IHRoaXMuaGFzQ2xhc3MoJ2Z1bGwnKSApIHtcbiAgICBjb25zdCB0cmVlVG1wbCA9IG5ldyBJbmRpdmlkdWFsTW9kZWwoJ3YtdWk6VHJlZVRlbXBsYXRlJyk7XG4gICAgY29uc3QgbW9kYWwgPSAkKCcjaW5kaXZpZHVhbC1tb2RhbC10ZW1wbGF0ZScpLmh0bWwoKTtcbiAgICB0cmVlLm9uKCdjbGljayBrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmIChlLnR5cGUgIT09ICdjbGljaycgJiYgZS53aGljaCAhPT0gMTMgJiYgZS53aGljaCAhPT0gMzIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGNvbnN0ICRtb2RhbCA9ICQobW9kYWwpO1xuICAgICAgY29uc3QgY250ciA9ICQoJy5tb2RhbC1ib2R5JywgJG1vZGFsKTtcbiAgICAgICRtb2RhbC5vbignaGlkZGVuLmJzLm1vZGFsJywgKCkgPT4ge1xuICAgICAgICAkbW9kYWwucmVtb3ZlKCk7XG4gICAgICB9KTtcbiAgICAgICRtb2RhbC5tb2RhbCgpO1xuICAgICAgJCgnYm9keScpLmFwcGVuZCgkbW9kYWwpO1xuXG4gICAgICBjb25zdCBleHRyYSA9IHtcbiAgICAgICAgdGFyZ2V0OiBpbmRpdmlkdWFsLFxuICAgICAgICB0YXJnZXRfcmVsX3VyaTogcmVsX3VyaSxcbiAgICAgICAgaXNTaW5nbGU6IGlzU2luZ2xlLFxuICAgICAgICB3aXRoRGVsZXRlZDogd2l0aERlbGV0ZWQsXG4gICAgICAgIHNvcnQ6IHNvcnQsXG4gICAgICB9O1xuICAgICAgc3BlYy5wcmVzZW50KGNudHIsIHRyZWVUbXBsLCB1bmRlZmluZWQsIGV4dHJhKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0cmVlLnJlbW92ZSgpO1xuICB9XG5cbiAgLy8gRnVsbHRleHQgc2VhcmNoIGZlYXR1cmVcbiAgbGV0IHNlbGVjdGVkID0gW107XG4gIGNvbnN0IGZ1bGx0ZXh0ID0gJCgnLmZ1bGx0ZXh0JywgY29udHJvbCk7XG4gIGNvbnN0IGZ1bGx0ZXh0TWVudSA9ICQoJy5mdWxsdGV4dC1tZW51JywgY29udHJvbCk7XG4gIGlmICggdGhpcy5oYXNDbGFzcygnZnVsbHRleHQnKSB8fCB0aGlzLmhhc0NsYXNzKCdmdWxsJykgKSB7XG4gICAgaWYgKHBsYWNlaG9sZGVyIGluc3RhbmNlb2YgSW5kaXZpZHVhbE1vZGVsKSB7XG4gICAgICBwbGFjZWhvbGRlci5sb2FkKCkudGhlbigoKSA9PiB7XG4gICAgICAgIGZ1bGx0ZXh0LmF0dHIoe1xuICAgICAgICAgICdwbGFjZWhvbGRlcic6IHBsYWNlaG9sZGVyLnRvU3RyaW5nKCksXG4gICAgICAgICAgJ25hbWUnOiAoaW5kaXZpZHVhbC5oYXNWYWx1ZSgncmRmOnR5cGUnKSA/IGluZGl2aWR1YWxbJ3JkZjp0eXBlJ11bMF0uaWQgKyAnXycgKyByZWxfdXJpIDogcmVsX3VyaSkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bLTpdL2csICdfJyksXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZ1bGx0ZXh0LmF0dHIoe1xuICAgICAgICAncGxhY2Vob2xkZXInOiBwbGFjZWhvbGRlcixcbiAgICAgICAgJ25hbWUnOiAoaW5kaXZpZHVhbC5oYXNWYWx1ZSgncmRmOnR5cGUnKSA/IGluZGl2aWR1YWxbJ3JkZjp0eXBlJ11bMF0uaWQgKyAnXycgKyByZWxfdXJpIDogcmVsX3VyaSkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bLTpdL2csICdfJyksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdWxsdGV4dC5vbignaW5wdXQgY2hhbmdlIGZvY3VzIGJsdXInLCBmdW5jdGlvbiAoZSkge1xuICAgICAgY29uc3QgdmFsdWUgPSBmdWxsdGV4dC52YWwoKTtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBjb25zdCByb3dzID0gdmFsdWUuc3BsaXQoJ1xcbicpLmxlbmd0aDtcbiAgICAgICAgZnVsbHRleHQucHJvcCgncm93cycsIHJvd3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZnVsbHRleHQucHJvcCgncm93cycsIDEpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgaGVhZGVyID0gJCgnLmhlYWRlcicsIGNvbnRyb2wpO1xuICAgIFByb21pc2UuYWxsKFtcbiAgICAgIG5ldyBJbmRpdmlkdWFsTW9kZWwoJ3YtczpTZWxlY3RBbGwnKS5sb2FkKCksXG4gICAgICBuZXcgSW5kaXZpZHVhbE1vZGVsKCd2LXM6Q2FuY2VsU2VsZWN0aW9uJykubG9hZCgpLFxuICAgICAgbmV3IEluZGl2aWR1YWxNb2RlbCgndi1zOkludmVydFNlbGVjdGlvbicpLmxvYWQoKSxcbiAgICBdKS50aGVuKChhY3Rpb25zKSA9PiB7XG4gICAgICBoZWFkZXIuZmluZCgnLnNlbGVjdC1hbGwnKVxuICAgICAgICAuY2xpY2soKCkgPT4ge1xuICAgICAgICAgIHN1Z2dlc3Rpb25zLmNoaWxkcmVuKCc6bm90KC5zZWxlY3RlZCknKS5jbGljaygpO1xuICAgICAgICB9KVxuICAgICAgICAudGV4dCggYWN0aW9uc1swXS50b1N0cmluZygpICk7XG4gICAgICBoZWFkZXIuZmluZCgnLmNhbmNlbC1zZWxlY3Rpb24nKVxuICAgICAgICAuY2xpY2soKCkgPT4ge1xuICAgICAgICAgIHN1Z2dlc3Rpb25zLmNoaWxkcmVuKCcuc2VsZWN0ZWQnKS5jbGljaygpO1xuICAgICAgICB9KVxuICAgICAgICAudGV4dCggYWN0aW9uc1sxXS50b1N0cmluZygpICk7XG4gICAgICBoZWFkZXIuZmluZCgnLmludmVydC1zZWxlY3Rpb24nKVxuICAgICAgICAuY2xpY2soKCkgPT4ge1xuICAgICAgICAgIHN1Z2dlc3Rpb25zLmNoaWxkcmVuKCkuY2xpY2soKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRleHQoIGFjdGlvbnNbMl0udG9TdHJpbmcoKSApO1xuICAgICAgaGVhZGVyLmZpbmQoJy5jbG9zZS1tZW51JylcbiAgICAgICAgLmNsaWNrKCgpID0+IHtcbiAgICAgICAgICBpbmRpdmlkdWFsLnNldChyZWxfdXJpLCBzZWxlY3RlZCk7XG4gICAgICAgICAgZnVsbHRleHRNZW51LmhpZGUoKTtcbiAgICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ2NsaWNrJywgY2xpY2tPdXRzaWRlTWVudUhhbmRsZXIpO1xuICAgICAgICAgICQoZG9jdW1lbnQpLm9mZigna2V5ZG93bicsIGFycm93SGFuZGxlcik7XG4gICAgICAgIH0pXG4gICAgICAgIC50ZXh0KCAnT2snICk7XG4gICAgfSk7XG4gICAgaWYgKGlzU2luZ2xlKSB7XG4gICAgICBoZWFkZXIuaGlkZSgpO1xuICAgIH1cblxuICAgIHRoaXMub24oJ3ZpZXcgZWRpdCBzZWFyY2gnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGlmIChlLnR5cGUgPT09ICdzZWFyY2gnKSB7XG4gICAgICAgIGlmICggJChlLmRlbGVnYXRlVGFyZ2V0KS5kYXRhKCdzaW5nbGUnKSApIHtcbiAgICAgICAgICBoZWFkZXIuaGlkZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGhlYWRlci5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHBlcmZvcm1TZWFyY2ggPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShldmFsKHNvdXJjZSkpXG4gICAgICAgICAgLnRoZW4ocmVuZGVyUmVzdWx0cylcbiAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdTb3VyY2UgZmFpbGVkJywgc291cmNlKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChpc0R5bmFtaWNRdWVyeVByZWZpeCkge1xuICAgICAgICAgIHF1ZXJ5UHJlZml4ID0gc2VsZi5hdHRyKCdkYXRhLXF1ZXJ5LXByZWZpeCcpO1xuICAgICAgICB9XG4gICAgICAgIGludGVycG9sYXRlKHF1ZXJ5UHJlZml4LCBpbmRpdmlkdWFsKS50aGVuKChwcmVmaXgpID0+IHtcbiAgICAgICAgICBmdFF1ZXJ5KHByZWZpeCwgdmFsdWUsIHNvcnQsIHdpdGhEZWxldGVkLCBxdWVyeVBhdHRlcm4pXG4gICAgICAgICAgICAudGhlbihyZW5kZXJSZXN1bHRzKVxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdGdWxsdGV4dCBxdWVyeSBmYWlsZWQnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgaW5wdXRIYW5kbGVyID0gKCgpID0+IHtcbiAgICAgIGxldCB0aW1lb3V0O1xuICAgICAgY29uc3QgbWluTGVuZ3RoID0gMztcbiAgICAgIGNvbnN0IG5hdl9rZXlzID0gWzM3LCAzOCwgMzksIDQwLCA5LCAxNl07IC8vIEFycm93cywgc2hpZnQsIHRhYlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmICh0aW1lb3V0KSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuYXZfa2V5cy5pbmRleE9mKGUud2hpY2gpID49IDApIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGxldCB2YWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgIGlmICh2YWx1ZS5pbmRleE9mKCdcIicpID49IDAgfHwgdmFsdWUuaW5kZXhPZihcIidcIikgPj0gMCkge1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlQWxsKCdcIicsICcnKS5yZXBsYWNlQWxsKFwiJ1wiLCAnJyk7XG4gICAgICAgICAgICBmdWxsdGV4dC52YWwodmFsdWUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPj0gbWluTGVuZ3RoKSB7XG4gICAgICAgICAgICBwZXJmb3JtU2VhcmNoKHZhbHVlKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKCF2YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChpc1NpbmdsZSkge1xuICAgICAgICAgICAgICBpbmRpdmlkdWFsLmNsZWFyVmFsdWUocmVsX3VyaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdWdnZXN0aW9ucy5lbXB0eSgpO1xuICAgICAgICAgICAgZnVsbHRleHRNZW51LmhpZGUoKTtcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLm9mZignY2xpY2snLCBjbGlja091dHNpZGVNZW51SGFuZGxlcik7XG4gICAgICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ2tleWRvd24nLCBhcnJvd0hhbmRsZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgNzUwKTtcbiAgICAgIH07XG4gICAgfSkoKTtcbiAgICBmdWxsdGV4dC5vbigna2V5ZG93bicsIGlucHV0SGFuZGxlcik7XG5cbiAgICBjb25zdCByZW5kZXJSZXN1bHRzID0gZnVuY3Rpb24gKHJlc3VsdHMpIHtcbiAgICAgIHN1Z2dlc3Rpb25zLmVtcHR5KCk7XG4gICAgICBzZWxlY3RlZCA9IGluZGl2aWR1YWwuZ2V0KHJlbF91cmkpO1xuICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IHByb21pc2VzID0gcmVzdWx0cy5tYXAoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHJlbmRlclZhbHVlKHZhbHVlLCB0ZW1wbGF0ZSkudGhlbigocmVuZGVyZWQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRtcGwgPSAkKCc8YSBocmVmPVxcJyNcXCcgY2xhc3M9XFwnc3VnZ2VzdGlvblxcJz48L2E+JylcbiAgICAgICAgICAgICAgLnRleHQoIHJlbmRlcmVkIClcbiAgICAgICAgICAgICAgLmF0dHIoJ3Jlc291cmNlJywgdmFsdWUuaWQpO1xuICAgICAgICAgICAgaWYgKGluZGl2aWR1YWwuaGFzVmFsdWUocmVsX3VyaSwgdmFsdWUpKSB7XG4gICAgICAgICAgICAgIHRtcGwuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodmFsdWUuaGFzVmFsdWUoJ3YtczpkZWxldGVkJywgdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgdG1wbC5hZGRDbGFzcygnZGVsZXRlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhbHVlLmhhc1ZhbHVlKCd2LXM6dmFsaWQnLCBmYWxzZSkgJiYgIXZhbHVlLmhhc1ZhbHVlKCd2LXM6ZGVsZXRlZCcsIHRydWUpICkge1xuICAgICAgICAgICAgICB0bXBsLmFkZENsYXNzKCdpbnZhbGlkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdG1wbDtcbiAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciByZW5kZXJpbmcgdmFsdWUnLCBlcnJvcik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigocmVuZGVyZWRMaXN0KSA9PiB7XG4gICAgICAgICAgc3VnZ2VzdGlvbnMuYXBwZW5kKHJlbmRlcmVkTGlzdCk7XG4gICAgICAgICAgJChkb2N1bWVudCkub2ZmKCdjbGljaycsIGNsaWNrT3V0c2lkZU1lbnVIYW5kbGVyKTtcbiAgICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ2tleWRvd24nLCBhcnJvd0hhbmRsZXIpO1xuICAgICAgICAgIGZ1bGx0ZXh0TWVudS5zaG93KCk7XG4gICAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgY2xpY2tPdXRzaWRlTWVudUhhbmRsZXIpO1xuICAgICAgICAgICQoZG9jdW1lbnQpLm9uKCdrZXlkb3duJywgYXJyb3dIYW5kbGVyKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmdWxsdGV4dE1lbnUuaGlkZSgpO1xuICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ2NsaWNrJywgY2xpY2tPdXRzaWRlTWVudUhhbmRsZXIpO1xuICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ2tleWRvd24nLCBhcnJvd0hhbmRsZXIpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBzdWdnZXN0aW9ucyA9ICQoJy5zdWdnZXN0aW9ucycsIGNvbnRyb2wpO1xuICAgIGxldCBkYmxUaW1lb3V0O1xuICAgIHN1Z2dlc3Rpb25zLm9uKCdjbGljaycsICcuc3VnZ2VzdGlvbicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgaWYgKCFlLm9yaWdpbmFsRXZlbnQpIHtcbiAgICAgICAgY2xpY2tIYW5kbGVyKGUpO1xuICAgICAgfSBlbHNlIGlmIChkYmxUaW1lb3V0KSB7XG4gICAgICAgIGRibGNsaWNrSGFuZGxlcihlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNsaWNrSGFuZGxlcihlKTtcbiAgICAgIH1cbiAgICB9KS5vbigna2V5ZG93bicsICcuc3VnZ2VzdGlvbicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoZS53aGljaCA9PT0gMzIpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBjbGlja0hhbmRsZXIoZSk7XG4gICAgICB9IGVsc2UgaWYgKGUud2hpY2ggPT09IDEzKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZGJsY2xpY2tIYW5kbGVyKGUpO1xuICAgICAgfVxuICAgIH0pLm9uKCdkYmxjbGljaycsICcuc3VnZ2VzdGlvbicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBjbGlja0hhbmRsZXIgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3QgdG1wbCA9ICQoZS50YXJnZXQpO1xuICAgICAgY29uc3Qgc3VnZ2VzdGlvbl91cmkgPSB0bXBsLmF0dHIoJ3Jlc291cmNlJyk7XG4gICAgICBpZiAoIXN1Z2dlc3Rpb25fdXJpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHN1Z2dlc3Rpb24gPSBuZXcgSW5kaXZpZHVhbE1vZGVsKHN1Z2dlc3Rpb25fdXJpKTtcbiAgICAgIHRtcGwudG9nZ2xlQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICBpZiAoaXNTaW5nbGUpIHtcbiAgICAgICAgdG1wbC5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgfVxuICAgICAgaWYgKCBzZWxlY3RlZC5pbmRleE9mKHN1Z2dlc3Rpb24pID49IDAgKSB7XG4gICAgICAgIGlmIChpc1NpbmdsZSkge1xuICAgICAgICAgIGluZGl2aWR1YWwuc2V0KHJlbF91cmksIFtzdWdnZXN0aW9uXSk7XG4gICAgICAgICAgZnVsbHRleHRNZW51LmhpZGUoKTtcbiAgICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ2NsaWNrJywgY2xpY2tPdXRzaWRlTWVudUhhbmRsZXIpO1xuICAgICAgICAgICQoZG9jdW1lbnQpLm9mZigna2V5ZG93bicsIGFycm93SGFuZGxlcik7XG4gICAgICAgICAgZnVsbHRleHQuZm9jdXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWxlY3RlZCA9IHNlbGVjdGVkLmZpbHRlcigodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSAhPT0gc3VnZ2VzdGlvbjtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGlzU2luZ2xlKSB7XG4gICAgICAgICAgc2VsZWN0ZWQgPSBbc3VnZ2VzdGlvbl07XG4gICAgICAgICAgaW5kaXZpZHVhbC5zZXQocmVsX3VyaSwgc2VsZWN0ZWQpO1xuICAgICAgICAgIGZ1bGx0ZXh0TWVudS5oaWRlKCk7XG4gICAgICAgICAgJChkb2N1bWVudCkub2ZmKCdjbGljaycsIGNsaWNrT3V0c2lkZU1lbnVIYW5kbGVyKTtcbiAgICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ2tleWRvd24nLCBhcnJvd0hhbmRsZXIpO1xuICAgICAgICAgIGZ1bGx0ZXh0LmZvY3VzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VsZWN0ZWQucHVzaChzdWdnZXN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZGJsVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBkYmxUaW1lb3V0ID0gdW5kZWZpbmVkO1xuICAgICAgfSwgMzAwKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZGJsY2xpY2tIYW5kbGVyID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmICggISQoZS50YXJnZXQpLmhhc0NsYXNzKCdzZWxlY3RlZCcpICkge1xuICAgICAgICBjbGlja0hhbmRsZXIoZSk7XG4gICAgICB9XG4gICAgICBkYmxUaW1lb3V0ID0gY2xlYXJUaW1lb3V0KGRibFRpbWVvdXQpO1xuICAgICAgaW5kaXZpZHVhbC5zZXQocmVsX3VyaSwgc2VsZWN0ZWQpO1xuICAgICAgZnVsbHRleHRNZW51LmhpZGUoKTtcbiAgICAgICQoZG9jdW1lbnQpLm9mZignY2xpY2snLCBjbGlja091dHNpZGVNZW51SGFuZGxlcik7XG4gICAgICAkKGRvY3VtZW50KS5vZmYoJ2tleWRvd24nLCBhcnJvd0hhbmRsZXIpO1xuICAgICAgZnVsbHRleHQuZm9jdXMoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgY2xpY2tPdXRzaWRlTWVudUhhbmRsZXIgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKCAhJChlLnRhcmdldCkuY2xvc2VzdChmdWxsdGV4dE1lbnUpLmxlbmd0aCApIHtcbiAgICAgICAgaWYgKCBmdWxsdGV4dE1lbnUuaXMoJzp2aXNpYmxlJykgKSB7XG4gICAgICAgICAgaW5kaXZpZHVhbC5zZXQocmVsX3VyaSwgc2VsZWN0ZWQpO1xuICAgICAgICAgIGZ1bGx0ZXh0TWVudS5oaWRlKCk7XG4gICAgICAgICAgJChkb2N1bWVudCkub2ZmKCdjbGljaycsIGNsaWNrT3V0c2lkZU1lbnVIYW5kbGVyKTtcbiAgICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ2tleWRvd24nLCBhcnJvd0hhbmRsZXIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGFycm93SGFuZGxlciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoIGUud2hpY2ggPT09IDQwICkgeyAvLyBEb3duXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgYWN0aXZlID0gc3VnZ2VzdGlvbnMuZmluZCgnLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgY29uc3QgbmV4dCA9IGFjdGl2ZS5uZXh0KCk7XG4gICAgICAgIGlmICggbmV4dC5sZW5ndGggKSB7XG4gICAgICAgICAgbmV4dC5hZGRDbGFzcygnYWN0aXZlJykuZm9jdXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdWdnZXN0aW9ucy5jaGlsZHJlbigpLmZpcnN0KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoIGUud2hpY2ggPT09IDM4ICkgeyAvLyBVcFxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IGFjdGl2ZSA9IHN1Z2dlc3Rpb25zLmZpbmQoJy5hY3RpdmUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIGNvbnN0IHByZXYgPSBhY3RpdmUucHJldigpO1xuICAgICAgICBpZiAoIHByZXYubGVuZ3RoICkge1xuICAgICAgICAgIHByZXYuYWRkQ2xhc3MoJ2FjdGl2ZScpLmZvY3VzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VnZ2VzdGlvbnMuY2hpbGRyZW4oKS5sYXN0KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoIGUud2hpY2ggPT09IDMyICYmIGZ1bGx0ZXh0TWVudS5maW5kKCc6Zm9jdXMnKS5sZW5ndGggKSB7IC8vIFNwYWNlXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTsgLy8gUHJldmVudCBzY3JvbGxpbmcgb24gc3BhY2VcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgcHJvcGVydHlNb2RpZmllZEhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIGlzU2luZ2xlICYmIGluZGl2aWR1YWwuaGFzVmFsdWUocmVsX3VyaSkgKSB7XG4gICAgICAgIGluZGl2aWR1YWwuZ2V0KHJlbF91cmkpWzBdLmxvYWQoKVxuICAgICAgICAgIC50aGVuKCh2YWx1ZSkgPT4gcmVuZGVyVmFsdWUodmFsdWUsIHRlbXBsYXRlKSlcbiAgICAgICAgICAudGhlbigocmVuZGVyZWQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlucHV0VmFsdWUgPSBmdWxsdGV4dC52YWwoKTtcbiAgICAgICAgICAgIGlmIChpbnB1dFZhbHVlICE9IHJlbmRlcmVkKSB7XG4gICAgICAgICAgICAgIGZ1bGx0ZXh0LnZhbChyZW5kZXJlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgcmVuZGVyaW5nIHZhbHVlJywgZXJyb3IpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZnVsbHRleHQudmFsKCcnKTtcbiAgICAgIH1cbiAgICAgIHNlbGVjdGVkID0gc2VsZWN0ZWQuZmlsdGVyKChpdGVtKSA9PiBpbmRpdmlkdWFsLmhhc1ZhbHVlKHJlbF91cmksIGl0ZW0pKTtcbiAgICAgIHN1Z2dlc3Rpb25zLmNoaWxkcmVuKClcbiAgICAgICAgLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjb25zdCBpdGVtID0gJCh0aGlzKTtcbiAgICAgICAgICBjb25zdCByZXNvdXJjZSA9IGl0ZW0uYXR0cigncmVzb3VyY2UnKTtcbiAgICAgICAgICBpZiAoaW5kaXZpZHVhbC5oYXNWYWx1ZShyZWxfdXJpLCByZXNvdXJjZSkpIHtcbiAgICAgICAgICAgIGl0ZW0uYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgaW5kaXZpZHVhbC5vbihyZWxfdXJpLCBwcm9wZXJ0eU1vZGlmaWVkSGFuZGxlcik7XG4gICAgc2VsZi5vbmUoJ3JlbW92ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGluZGl2aWR1YWwub2ZmKHJlbF91cmksIHByb3BlcnR5TW9kaWZpZWRIYW5kbGVyKTtcbiAgICB9KTtcbiAgICBwcm9wZXJ0eU1vZGlmaWVkSGFuZGxlcigpO1xuXG4gICAgLy8gRHJvcGRvd24gZmVhdHVyZVxuICAgIGNvbnN0IGRyb3Bkb3duID0gJCgnLmRyb3Bkb3duJywgY29udHJvbCk7XG4gICAgaWYgKCB0aGlzLmhhc0NsYXNzKCdkcm9wZG93bicpICYmIHRoaXMuaGFzQ2xhc3MoJ2Z1bGx0ZXh0JykgfHwgdGhpcy5oYXNDbGFzcygnZnVsbCcpICkge1xuICAgICAgZHJvcGRvd24ub24oJ2NsaWNrIGtleWRvd24nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoZS50eXBlICE9PSAnY2xpY2snICYmIGUud2hpY2ggIT09IDEzICYmIGUud2hpY2ggIT09IDMyKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYgKCBmdWxsdGV4dE1lbnUuaXMoJzp2aXNpYmxlJykpIHtcbiAgICAgICAgICBmdWxsdGV4dE1lbnUuaGlkZSgpO1xuICAgICAgICAgICQoZG9jdW1lbnQpLm9mZignY2xpY2snLCBjbGlja091dHNpZGVNZW51SGFuZGxlcik7XG4gICAgICAgICAgJChkb2N1bWVudCkub2ZmKCdrZXlkb3duJywgYXJyb3dIYW5kbGVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIHN1Z2dlc3Rpb25zLmlzKCc6ZW1wdHknKSB8fCBpc0R5bmFtaWNRdWVyeVByZWZpeCApIHtcbiAgICAgICAgICAgIHBlcmZvcm1TZWFyY2goKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJChkb2N1bWVudCkub2ZmKCdjbGljaycsIGNsaWNrT3V0c2lkZU1lbnVIYW5kbGVyKTtcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLm9mZigna2V5ZG93bicsIGFycm93SGFuZGxlcik7XG4gICAgICAgICAgICBmdWxsdGV4dE1lbnUuc2hvdygpO1xuICAgICAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgY2xpY2tPdXRzaWRlTWVudUhhbmRsZXIpO1xuICAgICAgICAgICAgJChkb2N1bWVudCkub24oJ2tleWRvd24nLCBhcnJvd0hhbmRsZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBjb25zdCBkb3duSGFuZGxlciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmICggZS53aGljaCA9PT0gNDApIHtcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIGRyb3Bkb3duLmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBmdWxsdGV4dC5vbignZm9jdXMnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBmdWxsdGV4dC5vZmYoJ2tleWRvd24nLCBkb3duSGFuZGxlcikub25lKCdrZXlkb3duJywgZG93bkhhbmRsZXIpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRyb3Bkb3duLnJlbW92ZSgpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBmdWxsdGV4dC5yZW1vdmUoKTtcbiAgICBmdWxsdGV4dE1lbnUucmVtb3ZlKCk7XG4gICAgJCgnLmRyb3Bkb3duJywgY29udHJvbCkucmVtb3ZlKCk7XG4gIH1cblxuICAvLyBDbGVhciBmZWF0dXJlXG4gIGlmIChpc1NpbmdsZSAmJiBvcHRzLm1vZGUgIT09ICdzZWFyY2gnICYmICggdGhpcy5oYXNDbGFzcygnZnVsbHRleHQnKSB8fCB0aGlzLmhhc0NsYXNzKCdmdWxsJykgKSApIHtcbiAgICAkKCcuY2xlYXInLCBjb250cm9sKS5vbignY2xpY2sga2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoZS50eXBlICE9PSAnY2xpY2snICYmIGUud2hpY2ggIT09IDEzICYmIGUud2hpY2ggIT09IDMyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBzZWxlY3RlZCA9IFtdO1xuICAgICAgJCgnLnN1Z2dlc3Rpb25zJywgY29udHJvbCkuZW1wdHkoKTtcbiAgICAgIGluZGl2aWR1YWwuY2xlYXJWYWx1ZShyZWxfdXJpKTtcbiAgICAgIGZ1bGx0ZXh0LnZhbCgnJykuZm9jdXMoKTtcbiAgICB9KTtcbiAgICB0aGlzLm9uKCd2aWV3IGVkaXQgc2VhcmNoJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBpZiAoZS50eXBlID09PSAnc2VhcmNoJykge1xuICAgICAgICBpZiAoICEkKGUuZGVsZWdhdGVUYXJnZXQpLmRhdGEoJ3NpbmdsZScpICkge1xuICAgICAgICAgICQoJy5jbGVhcicsIGNvbnRyb2wpLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgJCgnLmNsZWFyJywgY29udHJvbCkucmVtb3ZlKCk7XG4gIH1cblxuICBpZiAoICEkKCcuZnVsbHRleHQnLCBjb250cm9sKS5sZW5ndGggKSB7XG4gICAgJCgnLmlucHV0LWdyb3VwJywgY29udHJvbCkudG9nZ2xlQ2xhc3MoJ2lucHV0LWdyb3VwIGJ0bi1ncm91cCcpO1xuICAgICQoJy5pbnB1dC1ncm91cC1hZGRvbicsIGNvbnRyb2wpLnRvZ2dsZUNsYXNzKCdpbnB1dC1ncm91cC1hZGRvbiBidG4tZGVmYXVsdCBidG4tcHJpbWFyeScpO1xuICB9XG5cbiAgdGhpcy5vbigndmlldyBlZGl0IHNlYXJjaCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAoZS50eXBlID09PSAnc2VhcmNoJykge1xuICAgICAgaXNTaW5nbGUgPSAkKGUuZGVsZWdhdGVUYXJnZXQpLmRhdGEoJ3NpbmdsZScpIHx8IGZhbHNlO1xuICAgICAgY29uc3QgZGF0YURlbGV0ZWQgPSAkKGUuZGVsZWdhdGVUYXJnZXQpLmRhdGEoJ2RlbGV0ZWQnKTtcbiAgICAgIHdpdGhEZWxldGVkID0gdHlwZW9mIGRhdGFEZWxldGVkID09PSAnYm9vbGVhbicgPyBkYXRhRGVsZXRlZCA6IHRydWU7XG4gICAgfVxuICB9KTtcblxuICBpZiAoc3BlYyAmJiBzcGVjLmhhc1ZhbHVlKCd2LXVpOnRvb2x0aXAnKSkge1xuICAgIGNvbnRyb2wudG9vbHRpcCh7XG4gICAgICB0aXRsZTogc3BlY1sndi11aTp0b29sdGlwJ10ubWFwKFV0aWwuZm9ybWF0VmFsdWUpLmpvaW4oJyAnKSxcbiAgICAgIHBsYWNlbWVudDogJ3RvcCcsXG4gICAgICBjb250YWluZXI6ICdib2R5JyxcbiAgICAgIHRyaWdnZXI6ICdtYW51YWwnLFxuICAgICAgYW5pbWF0aW9uOiBmYWxzZSxcbiAgICB9KTtcbiAgICB0aGlzLm9uZSgncmVtb3ZlJywgKCkgPT4gY29udHJvbC50b29sdGlwKCdkZXN0cm95JykpO1xuICAgICQoJ3RleHRhcmVhJywgY29udHJvbClcbiAgICAgIC5vbignZm9jdXNpbicsICgpID0+IGNvbnRyb2wudG9vbHRpcCgnc2hvdycpKVxuICAgICAgLm9uKCdmb2N1c291dCBjaGFuZ2UnLCAoKSA9PiBjb250cm9sLnRvb2x0aXAoJ2hpZGUnKSk7XG4gIH1cblxuICB0aGlzLmFwcGVuZChjb250cm9sKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgdGVtcGxhdGU6IGBcbjxkaXYgY2xhc3M9XCJsaW5rLWNvbnRyb2xcIj5cbiAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG4gICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uIGJ0biBidG4tZGVmYXVsdCB0cmVlXCIgdGFiaW5kZXg9XCIwXCI+XG4gICAgICA8aSBjbGFzcz1cImZhIGZhLXNpdGVtYXBcIj48L2k+XG4gICAgPC9kaXY+XG4gICAgPHRleHRhcmVhIHJvd3M9XCIxXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZnVsbHRleHRcIj48L3RleHRhcmVhPlxuICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvbiBidG4gYnRuLWRlZmF1bHQgY2xlYXJcIiB0YWJpbmRleD1cIjBcIj4mIzEwMDA1OzwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvbiBidG4gYnRuLWRlZmF1bHQgZHJvcGRvd25cIiB0YWJpbmRleD1cIjBcIj5cbiAgICAgIDxpIGNsYXNzPVwiY2FyZXRcIj48L2k+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uIGJ0biBidG4tZGVmYXVsdCBjcmVhdGVcIiB0YWJpbmRleD1cIjBcIj5cbiAgICAgIDxpIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzXCI+PC9pPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImZ1bGx0ZXh0LW1lbnVcIj5cbiAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyIGNsZWFyZml4XCI+XG4gICAgICA8c21hbGwgY2xhc3M9XCJsaW5rLWFjdGlvbnMgcHVsbC1sZWZ0XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwic2VsZWN0LWFsbFwiPjwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJjYW5jZWwtc2VsZWN0aW9uXCI+PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImludmVydC1zZWxlY3Rpb25cIj48L3NwYW4+XG4gICAgICA8L3NtYWxsPlxuICAgICAgPHNtYWxsIGNsYXNzPVwibGluay1hY3Rpb25zIHB1bGwtcmlnaHRcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJjbG9zZS1tZW51XCI+PC9zcGFuPlxuICAgICAgPC9zbWFsbD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwic3VnZ2VzdGlvbnNcIj48L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbiAgYCxcbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztNQUVPQSxDQUFDLEdBQUFDLE9BQUEsQ0FBQUMsT0FBQTtJQUFBLGFBQUFDLHlCQUFBO01BRURDLGVBQWUsR0FBQUQseUJBQUEsQ0FBQUQsT0FBQTtJQUFBLGFBQUFHLGFBQUE7TUFFZkMsSUFBSSxHQUFBRCxhQUFBLENBQUFILE9BQUE7SUFBQSxhQUFBSyxvQkFBQTtNQUVIQyxXQUFXLEdBQUFELG9CQUFBLENBQVhDLFdBQVc7TUFBRUMsT0FBTyxHQUFBRixvQkFBQSxDQUFQRSxPQUFPO01BQUVDLFdBQVcsR0FBQUgsb0JBQUEsQ0FBWEcsV0FBVztJQUFBO0lBQUFDLE9BQUEsV0FBQUEsQ0FBQTtNQUV6Q1gsQ0FBQyxDQUFDWSxFQUFFLENBQUNDLFNBQVMsR0FBRyxVQUFXQyxPQUFPLEVBQUc7UUFBQSxJQUFBQyxVQUFBO1FBQ3BDLElBQU1DLElBQUksR0FBRyxJQUFJO1FBQ2pCLElBQU1DLElBQUksR0FBQUMsYUFBQSxDQUFBQSxhQUFBLEtBQU9DLFFBQVEsR0FBS0wsT0FBTyxDQUFDO1FBQ3RDLElBQU1NLE9BQU8sR0FBR3BCLENBQUMsQ0FBQ2lCLElBQUksQ0FBQ0ksUUFBUSxDQUFDO1FBQ2hDLElBQU1BLFFBQVEsR0FBRyxJQUFJLENBQUNDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxnQkFBZ0I7UUFDL0QsSUFBTUMsVUFBVSxHQUFHTixJQUFJLENBQUNNLFVBQVU7UUFDbEMsSUFBTUMsSUFBSSxHQUFHUCxJQUFJLENBQUNPLElBQUk7UUFDdEIsSUFBTUMsV0FBVyxHQUFHLElBQUksQ0FBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFNRSxJQUFJLElBQUlBLElBQUksQ0FBQ0UsUUFBUSxDQUFDLGtCQUFrQixDQUFDLEdBQUdGLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDRyxHQUFHLENBQUNyQixJQUFJLENBQUNzQixX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