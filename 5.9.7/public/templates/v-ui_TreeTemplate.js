"use strict";

System.register(["/js/browser/util.js", "/js/common/util.js", "/js/browser/dom_helpers.js", "jquery", "/js/common/veda.js", "/js/common/individual_model.js", "/js/common/backend.js"], function (_export, _context) {
  "use strict";

  var BrowserUtil, CommonUtil, sanitize, $, veda, IndividualModel, Backend, pre, html;
  return {
    setters: [function (_jsBrowserUtilJs) {
      BrowserUtil = _jsBrowserUtilJs.default;
    }, function (_jsCommonUtilJs) {
      CommonUtil = _jsCommonUtilJs.default;
    }, function (_jsBrowserDom_helpersJs) {
      sanitize = _jsBrowserDom_helpersJs.sanitize;
    }, function (_jquery) {
      $ = _jquery.default;
    }, function (_jsCommonVedaJs) {
      veda = _jsCommonVedaJs.default;
    }, function (_jsCommonIndividual_modelJs) {
      IndividualModel = _jsCommonIndividual_modelJs.default;
    }, function (_jsCommonBackendJs) {
      Backend = _jsCommonBackendJs.default;
    }],
    execute: function () {
      _export("pre", pre = function pre(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        var root = this.hasValue('v-ui:treeRoot') ? this['v-ui:treeRoot'] : undefined;
        var expandLevel = this.hasValue('v-ui:treeExpandLevel') ? this['v-ui:treeExpandLevel'][0] : undefined;
        var inProperty = this.hasValue('v-ui:treeInProperty') ? this['v-ui:treeInProperty'] : undefined;
        var outProperty = this.hasValue('v-ui:treeOutProperty') ? this['v-ui:treeOutProperty'] : undefined;
        var allowedClass = this.hasValue('v-ui:treeAllowedClass') ? this['v-ui:treeAllowedClass'] : undefined;
        var allowedFilter = this.hasValue('v-ui:treeAllowedFilter') ? this['v-ui:treeAllowedFilter'] : undefined;
        var selectableClass = this.hasValue('v-ui:treeSelectableClass') ? this['v-ui:treeSelectableClass'] : undefined;
        var selectableFilter = this.hasValue('v-ui:treeSelectableFilter') ? this['v-ui:treeSelectableFilter'] : undefined;
        var displayedProperty = this.hasValue('v-ui:treeDisplayedProperty') ? this['v-ui:treeDisplayedProperty'] : [new IndividualModel('rdfs:label')];
        var target = extra && extra.target;
        var rel_uri = extra && extra.target_rel_uri;
        var isSingle = extra && extra.isSingle;
        var withDeleted = extra && extra.withDeleted;
        var sort = extra ? extra.sort : this.hasValue('v-ui:sort') ? this['v-ui:sort'][0] : undefined;
        var tbody = $('.tbody', template);
        var thead = $('.thead', template);
        var headTmpl = '';
        var rowTmpl = '';
        if (target && rel_uri) {
          if (isSingle) {
            headTmpl += "<th width='1px'></th>";
            rowTmpl += "<td><input type='radio' class='select-row' name='select-row' /></td>";
          } else {
            headTmpl += "<th width='48px'></th>";
            rowTmpl += "<td><div class='checkbox no-margin'><label><input type='checkbox' class='select-row' /> <span style='cursor:pointer' class='select-deep fa fa-sitemap text-muted'></span></label></div></td>";
          }
        } else {
          headTmpl += "<th width='24px'><span class='glyphicon glyphicon-zoom-in'></span></th>";
          rowTmpl += "<td about='@' data-template='v-ui:IconModalTemplate'></td>";
        }
        var allowedFilterFn = function () {
          if (allowedFilter) {
            return new Function(allowedFilter[0].toString());
          } else if (allowedClass) {
            return function () {
              var that = this;
              return allowedClass.reduce(function (acc, allowed) {
                return acc || that.hasValue('rdf:type', allowed);
              }, false);
            };
          } else {
            return function () {
              return true;
            };
          }
        }();
        var selectableFilterFn = function () {
          if (selectableFilter) {
            return new Function(selectableFilter[0].toString());
          } else if (selectableClass) {
            return function () {
              var that = this;
              return selectableClass.reduce(function (acc, selectable) {
                return acc || that.hasValue('rdf:type', selectable);
              }, false);
            };
          } else {
            return function () {
              return true;
            };
          }
        }();
        var literals = ['rdfs:Literal', 'xsd:string', 'xsd:boolean', 'xsd:integer', 'xsd:nonNegativeInteger', 'xsd:decimal', 'xsd:dateTime'];
        displayedProperty.forEach(function (property, index) {
          headTmpl += '<th>' + sanitize(property['rdfs:label'].map(CommonUtil.formatValue).join(' ')) + '</th>';
          var isLiteral = literals.indexOf(property['rdfs:range'][0].id) >= 0;
          var isFile = property.hasValue('rdfs:range', 'v-s:File');
          if (index === 0) {
            if (isLiteral) {
              rowTmpl += "<td><div class='spacer'><a href='#' class='expand glyphicon glyphicon-chevron-right'></a> <span about='@' property='" + property.id + "'></span></div></td>";
            } else if (isFile) {
              rowTmpl += "<td><div class='spacer'><a href='#' class='expand glyphicon glyphicon-chevron-right'></a> <span about='@' rel='" + property.id + "' data-template='v-ui:FileMinTemplate'></span></div></td>";
            } else {
              rowTmpl += "<td><div class='spacer'><a href='#' class='expand glyphicon glyphicon-chevron-right'></a> <span about='@' rel='" + property.id + "' data-template='v-ui:LabelTemplate'></span></div></td>";
            }
            return;
          } else {
            if (isLiteral) {
              rowTmpl += "<td about='@' property='" + property.id + "'></td>";
            } else if (isFile) {
              rowTmpl += "<td about='@' rel='" + property.id + "' data-template='v-ui:FileToTreeTemplate'></td>";
            } else {
              rowTmpl += "<td about='@' rel='" + property.id + "' data-template='v-ui:LabelTemplate'></td>";
            }
          }
        });
        headTmpl = '<tr>' + headTmpl + '</tr>';
        thead.html(headTmpl);
        template.on('click', 'a.expand', expandRow);
        function expandRow(e, expandLevel) {
          if (e) {
            e.stopPropagation();
            e.preventDefault();
          }
          var that = $(this);
          var thatRow = that.closest('tr');
          var thatLvl = parseInt(thatRow.attr('data-level'));
          var uri = thatRow.attr('resource');
          var value = new IndividualModel(uri);
          that.toggleClass('expanded glyphicon-chevron-right glyphicon-chevron-down');
          if (that.hasClass('expanded')) {
            getChildren([], value, false).then(function (children) {
              return renderRows(children, thatRow, expandLevel).then(function () {
                var nextLvl = parseInt(thatRow.next().attr('data-level'));
                if (isNaN(nextLvl) || nextLvl <= thatLvl) {
                  that.prev().css('width', 16 * (thatLvl + 1) - 2);
                  that.remove();
                  thatRow.find('.select-deep').remove();
                }
              });
            });
          } else {
            var rowsToRemove = $();
            thatRow.nextAll().each(function () {
              var row = $(this);
              if (row.data('level') > thatLvl) {
                rowsToRemove = rowsToRemove.add(row);
              } else {
                return false;
              }
            });
            rowsToRemove.remove();
          }
        }
        function renderRows(values_uris, parentRow, expandLevel) {
          var cont = $('<div>');
          var parentLvl = parentRow ? parseInt(parentRow.attr('data-level')) : -1;
          var tmpl = $("<tr class='value-row'>").attr('data-level', parentLvl + 1).append(rowTmpl);
          $('.spacer', tmpl).css({
            'margin-left': 16 * (parentLvl + 1) + 'px',
            'display': 'inline-block'
          });
          return Promise.all(values_uris.map(function (valueUri, index) {
            var value = new IndividualModel(valueUri);
            return value.load().then(function (value) {
              if (!allowedFilterFn.call(value)) {
                return;
              }
              return value.present(cont, tmpl[0].outerHTML).then(function (tmpl) {
                tmpl = $(tmpl);
                // Pre-check children
                return getChildren([], value, false).then(function (children) {
                  if (!children.length) {
                    tmpl.find('.expand').remove();
                    tmpl.find('.select-deep').remove();
                    var spacer = tmpl.find('.spacer');
                    spacer.css('margin-left', 16 * (parentLvl + 2) + 2 + 'px');
                  } else if (expandLevel) {
                    expandRow.call(tmpl.find('.expand'), undefined, expandLevel - 1);
                  }
                }).then(function () {
                  if (target && rel_uri) {
                    var selectRow = $('.select-row', tmpl);
                    var selectDeep = $('.select-deep', tmpl);
                    selectRow.prop('checked', target.hasValue(rel_uri, value));
                    if (value.deepSelected) {
                      selectDeep.removeClass('text-muted').addClass('text-danger');
                    } else {
                      selectDeep.addClass('text-muted').removeClass('text-danger');
                    }
                    if (!selectableFilterFn.call(value)) {
                      selectRow.remove();
                    }
                  }
                  return tmpl;
                });
              });
            });
          })).then(function (rendered) {
            if (parentRow) {
              parentRow.after(rendered);
            } else {
              tbody.append(rendered);
            }
            cont.remove();
            return rendered;
          });
        }
        if (target && rel_uri) {
          template.on('click', 'td', function (e) {
            e.stopPropagation();
            var row = $(this).parent();
            $('.select-row', row).click();
          });
          template.on('click', '.select-row', function (e) {
            e.stopPropagation();
            var $this = $(this);
            var row = $this.closest('tr');
            var uri = row.attr('resource');
            var value = new IndividualModel(uri);
            $('#create-NewItem', template).remove();
            if ($('.modal').length == 0) {
              var addButton = drawAddButton(row);
              row.children().last().append(addButton);
            }
            if (isSingle) {
              target.set(rel_uri, [value]);
            } else {
              target.toggleValue(rel_uri, value);
            }
          });
          template.on('click', '.select-deep', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var $this = $(this);
            var row = $this.closest('tr');
            var uri = row.attr('resource');
            var value = new IndividualModel(uri);
            getChildren([], value).then(function (branchUris) {
              value.deepSelected = !value.deepSelected;
              return Promise.all(branchUris.map(function (branchUri) {
                return new IndividualModel(branchUri).load();
              }));
            }).then(function (branchObjs) {
              var branch = branchObjs.map(function (item) {
                item.deepSelected = value.deepSelected;
                return allowedFilterFn.call(item) && selectableFilterFn.call(item) ? item : undefined;
              });
              if (value.deepSelected) {
                target.addValue(rel_uri, branch);
                $this.removeClass('text-muted').addClass('text-danger');
              } else {
                target.removeValue(rel_uri, branch);
                $this.addClass('text-muted').removeClass('text-danger');
              }
            });
          });
          target.on(rel_uri, propertyModifiedHandler);
          template.one('remove', function () {
            target.off(rel_uri, propertyModifiedHandler);
          });
        }
        function redrawBranch(branchRow) {
          var thatLvl = parseInt(branchRow.attr('data-level'));
          branchRow.nextUntil('[data-level=' + thatLvl + ']').remove();
          var value = new IndividualModel(branchRow.attr('resource'));
          if (value && value.children) delete value.children;
          getChildren([], value, false).then(function (children) {
            return renderRows(children, branchRow).then(function () {
              var nextLvl = parseInt(branchRow.next().attr('data-level'));
              if (isNaN(nextLvl) || nextLvl <= thatLvl) {
                console.error('unexpected!!!!!!');
              }
            });
          });
        }
        function propertyModifiedHandler(values) {
          $('.value-row', template).each(function () {
            var $this = $(this);
            var uri = $this.attr('resource');
            var value = new IndividualModel(uri);
            if (values.indexOf(value) >= 0) {
              $this.find('.select-row').prop('checked', true);
            } else {
              $this.find('.select-row').prop('checked', false);
            }
            if (value.deepSelected) {
              $this.find('.select-deep').removeClass('text-muted').addClass('text-danger');
            } else {
              $this.find('.select-deep').addClass('text-muted').removeClass('text-danger');
            }
          });
        }

        // Render tree
        root.forEach(function (root, index, roots) {
          renderRows([root.id], undefined, typeof expandLevel !== 'undefined' ? expandLevel : roots.length === 1 ? 1 : 0);
        });
        function getChildren(acc, root, goDeeper) {
          return new Promise(function (resolve, reject) {
            if (root.children) {
              resolve(root.children);
            } else {
              var outs = getOut(root);
              getIn(root).then(function (ins) {
                root.children = outs.concat(ins);
                resolve(root.children);
              });
            }
          }).then(function (children) {
            return Promise.all(children.map(function (childUri) {
              var isAlreadyLoaded = acc.indexOf(childUri) >= 0;
              acc.push(childUri);
              if (goDeeper !== false && !isAlreadyLoaded) {
                var child = new IndividualModel(childUri);
                return getChildren(acc, child, goDeeper);
              }
            }));
          }).then(function () {
            return acc;
          });
        }
        function getOut(root) {
          var res = [];
          if (outProperty) {
            outProperty.map(function (property) {
              if (root.hasValue(property.id)) {
                root.properties[property.id].map(function (value) {
                  res.push(value.data);
                });
              }
            });
          }
          return res;
        }
        function getIn(root) {
          if (!inProperty) {
            return Promise.resolve([]);
          }
          var q = inProperty.map(function (property) {
            return "'" + property.id + "'=='" + root.id + "'";
          }).join(' || ');
          if (allowedClass) {
            var allowed = allowedClass.map(function (allowedClass) {
              return "'rdf:type'=='" + allowedClass.id + "'";
            }).join(' || ');
            q = '( ' + q + ' ) && ( ' + allowed + ' )';
          }
          var order = sort || "'rdfs:label_ru' asc, 'rdfs:label_en' asc, 'rdfs:label' asc";
          var unique;
          return Backend.query({
            ticket: veda.ticket,
            query: q,
            sort: order,
            async: true
          }).then(function (queryResult) {
            unique = CommonUtil.unique(queryResult.result);
            if (withDeleted) {
              q = q + " && ( 'v-s:deleted'== true )";
              return Backend.query({
                ticket: veda.ticket,
                query: q,
                sort: order,
                async: true
              }).then(function (qResult) {
                return unique.concat(qResult.result);
              });
            } else {
              return unique;
            }
          });
        }
        function drawAddButton(currentRow) {
          var addButton = $("<div id='create-NewItem'><button class='btn btn-xs btn-primary margin-sm'>Добавить элемент</button></div>");
          addButton.click(function () {
            var currentUri = currentRow.attr('resource');
            var type = $(this).closest('tr').attr('typeof');
            var newItem = new IndividualModel();
            newItem['rdf:type'] = [new IndividualModel(type)];
            newItem['v-s:hasParentLink'] = [new IndividualModel(currentUri)];
            var modal = BrowserUtil.showModal(newItem, undefined, 'edit');
            newItem.one('afterReset', function () {
              modal.modal('hide').remove();
            });
            newItem.one('afterSave', function () {
              setTimeout(function () {
                redrawBranch(currentRow);
              }, 100);
              modal.modal('hide').remove();
            });
          });
          return addButton;
        }
        if (!this.hasValue('rdf:type', 'v-ui:Tree')) {
          $('.heading', template).remove();
        }
      });
      _export("html", html = "\n  <div class=\"container sheet table-responsive\">\n    <style scoped>\n      tr > th:first-child,\n      tr > td:first-child {\n        border-right: 1px solid #ddd;\n      }\n    </style>\n    <div class=\"heading\">\n      <h2 about=\"@\" property=\"rdfs:label\"></h2>\n      <hr class=\"margin-sm\" />\n    </div>\n    <table class=\"table table-condensed table-striped\">\n      <thead class=\"thead\"></thead>\n      <tbody class=\"tbody\"></tbody>\n    </table>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJCcm93c2VyVXRpbCIsIl9qc0Jyb3dzZXJVdGlsSnMiLCJkZWZhdWx0IiwiX2pzQ29tbW9uVXRpbEpzIiwiQ29tbW9uVXRpbCIsIl9qc0Jyb3dzZXJEb21faGVscGVyc0pzIiwic2FuaXRpemUiLCJfanF1ZXJ5IiwiJCIsIl9qc0NvbW1vblZlZGFKcyIsInZlZGEiLCJfanNDb21tb25JbmRpdmlkdWFsX21vZGVsSnMiLCJJbmRpdmlkdWFsTW9kZWwiLCJfanNDb21tb25CYWNrZW5kSnMiLCJCYWNrZW5kIiwiZXhlY3V0ZSIsIl9leHBvcnQiLCJwcmUiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJyb290IiwiaGFzVmFsdWUiLCJ1bmRlZmluZWQiLCJleHBhbmRMZXZlbCIsImluUHJvcGVydHkiLCJvdXRQcm9wZXJ0eSIsImFsbG93ZWRDbGFzcyIsImFsbG93ZWRGaWx0ZXIiLCJzZWxlY3RhYmxlQ2xhc3MiLCJzZWxlY3RhYmxlRmlsdGVyIiwiZGlzcGxheWVkUHJvcGVydHkiLCJ0YXJnZXQiLCJyZWxfdXJpIiwidGFyZ2V0X3JlbF91cmkiLCJpc1NpbmdsZSIsIndpdGhEZWxldGVkIiwic29ydCIsInRib2R5IiwidGhlYWQiLCJoZWFkVG1wbCIsInJvd1RtcGwiLCJhbGxvd2VkRmlsdGVyRm4iLCJGdW5jdGlvbiIsInRvU3RyaW5nIiwidGhhdCIsInJlZHVjZSIsImFjYyIsImFsbG93ZWQiLCJzZWxlY3RhYmxlRmlsdGVyRm4iLCJzZWxlY3RhYmxlIiwibGl0ZXJhbHMiLCJmb3JFYWNoIiwicHJvcGVydHkiLCJpbmRleCIsIm1hcCIsImZvcm1hdFZhbHVlIiwiam9pbiIsImlzTGl0ZXJhbCIsImluZGV4T2YiLCJpZCIsImlzRmlsZSIsImh0bWwiLCJvbiIsImV4cGFuZFJvdyIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmV2ZW50RGVmYXVsdCIsInRoYXRSb3ciLCJjbG9zZXN0IiwidGhhdEx2bCIsInBhcnNlSW50IiwiYXR0ciIsInVyaSIsInZhbHVlIiwidG9nZ2xlQ2xhc3MiLCJoYXNDbGFzcyIsImdldENoaWxkcmVuIiwidGhlbiIsImNoaWxkcmVuIiwicmVuZGVyUm93cyIsIm5leHRMdmwiLCJuZXh0IiwiaXNOYU4iLCJwcmV2IiwiY3NzIiwicmVtb3ZlIiwiZmluZCIsInJvd3NUb1JlbW92ZSIsIm5leHRBbGwiLCJlYWNoIiwicm93IiwiZGF0YSIsImFkZCIsInZhbHVlc191cmlzIiwicGFyZW50Um93IiwiY29udCIsInBhcmVudEx2bCIsInRtcGwiLCJhcHBlbmQiLCJQcm9taXNlIiwiYWxsIiwidmFsdWVVcmkiLCJsb2FkIiwiY2FsbCIsInByZXNlbnQiLCJvdXRlckhUTUwiLCJsZW5ndGgiLCJzcGFjZXIiLCJzZWxlY3RSb3ciLCJzZWxlY3REZWVwIiwicHJvcCIsImRlZXBTZWxlY3RlZCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJyZW5kZXJlZCIsImFmdGVyIiwicGFyZW50IiwiY2xpY2siLCIkdGhpcyIsImFkZEJ1dHRvbiIsImRyYXdBZGRCdXR0b24iLCJsYXN0Iiwic2V0IiwidG9nZ2xlVmFsdWUiLCJicmFuY2hVcmlzIiwiYnJhbmNoVXJpIiwiYnJhbmNoT2JqcyIsImJyYW5jaCIsIml0ZW0iLCJhZGRWYWx1ZSIsInJlbW92ZVZhbHVlIiwicHJvcGVydHlNb2RpZmllZEhhbmRsZXIiLCJvbmUiLCJvZmYiLCJyZWRyYXdCcmFuY2giLCJicmFuY2hSb3ciLCJuZXh0VW50aWwiLCJjb25zb2xlIiwiZXJyb3IiLCJ2YWx1ZXMiLCJyb290cyIsImdvRGVlcGVyIiwicmVzb2x2ZSIsInJlamVjdCIsIm91dHMiLCJnZXRPdXQiLCJnZXRJbiIsImlucyIsImNvbmNhdCIsImNoaWxkVXJpIiwiaXNBbHJlYWR5TG9hZGVkIiwicHVzaCIsImNoaWxkIiwicmVzIiwicHJvcGVydGllcyIsInEiLCJvcmRlciIsInVuaXF1ZSIsInF1ZXJ5IiwidGlja2V0IiwiYXN5bmMiLCJxdWVyeVJlc3VsdCIsInJlc3VsdCIsInFSZXN1bHQiLCJjdXJyZW50Um93IiwiY3VycmVudFVyaSIsInR5cGUiLCJuZXdJdGVtIiwibW9kYWwiLCJzaG93TW9kYWwiLCJzZXRUaW1lb3V0Il0sInNvdXJjZXMiOlsiLi4vLi4vb250b2xvZ3kvc3lzdGVtLWNvcmUvdGVtcGxhdGVzL3YtdWlfVHJlZVRlbXBsYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCcm93c2VyVXRpbCBmcm9tICcvanMvYnJvd3Nlci91dGlsLmpzJztcbmltcG9ydCBDb21tb25VdGlsIGZyb20gJy9qcy9jb21tb24vdXRpbC5qcyc7XG5pbXBvcnQge3Nhbml0aXplfSBmcm9tICcvanMvYnJvd3Nlci9kb21faGVscGVycy5qcyc7XG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHZlZGEgZnJvbSAnL2pzL2NvbW1vbi92ZWRhLmpzJztcbmltcG9ydCBJbmRpdmlkdWFsTW9kZWwgZnJvbSAnL2pzL2NvbW1vbi9pbmRpdmlkdWFsX21vZGVsLmpzJztcbmltcG9ydCBCYWNrZW5kIGZyb20gJy9qcy9jb21tb24vYmFja2VuZC5qcyc7XG5cbmV4cG9ydCBjb25zdCBwcmUgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gIGNvbnN0IHJvb3QgPSB0aGlzLmhhc1ZhbHVlKCd2LXVpOnRyZWVSb290JykgPyB0aGlzWyd2LXVpOnRyZWVSb290J10gOiB1bmRlZmluZWQ7XG4gIGNvbnN0IGV4cGFuZExldmVsID0gdGhpcy5oYXNWYWx1ZSgndi11aTp0cmVlRXhwYW5kTGV2ZWwnKSA/IHRoaXNbJ3YtdWk6dHJlZUV4cGFuZExldmVsJ11bMF0gOiB1bmRlZmluZWQ7XG4gIGNvbnN0IGluUHJvcGVydHkgPSB0aGlzLmhhc1ZhbHVlKCd2LXVpOnRyZWVJblByb3BlcnR5JykgPyB0aGlzWyd2LXVpOnRyZWVJblByb3BlcnR5J10gOiB1bmRlZmluZWQ7XG4gIGNvbnN0IG91dFByb3BlcnR5ID0gdGhpcy5oYXNWYWx1ZSgndi11aTp0cmVlT3V0UHJvcGVydHknKSA/IHRoaXNbJ3YtdWk6dHJlZU91dFByb3BlcnR5J10gOiB1bmRlZmluZWQ7XG4gIGNvbnN0IGFsbG93ZWRDbGFzcyA9IHRoaXMuaGFzVmFsdWUoJ3YtdWk6dHJlZUFsbG93ZWRDbGFzcycpID8gdGhpc1sndi11aTp0cmVlQWxsb3dlZENsYXNzJ10gOiB1bmRlZmluZWQ7XG4gIGNvbnN0IGFsbG93ZWRGaWx0ZXIgPSB0aGlzLmhhc1ZhbHVlKCd2LXVpOnRyZWVBbGxvd2VkRmlsdGVyJykgPyB0aGlzWyd2LXVpOnRyZWVBbGxvd2VkRmlsdGVyJ10gOiB1bmRlZmluZWQ7XG4gIGNvbnN0IHNlbGVjdGFibGVDbGFzcyA9IHRoaXMuaGFzVmFsdWUoJ3YtdWk6dHJlZVNlbGVjdGFibGVDbGFzcycpID8gdGhpc1sndi11aTp0cmVlU2VsZWN0YWJsZUNsYXNzJ10gOiB1bmRlZmluZWQ7XG4gIGNvbnN0IHNlbGVjdGFibGVGaWx0ZXIgPSB0aGlzLmhhc1ZhbHVlKCd2LXVpOnRyZWVTZWxlY3RhYmxlRmlsdGVyJykgPyB0aGlzWyd2LXVpOnRyZWVTZWxlY3RhYmxlRmlsdGVyJ10gOiB1bmRlZmluZWQ7XG4gIGNvbnN0IGRpc3BsYXllZFByb3BlcnR5ID0gdGhpcy5oYXNWYWx1ZSgndi11aTp0cmVlRGlzcGxheWVkUHJvcGVydHknKSA/IHRoaXNbJ3YtdWk6dHJlZURpc3BsYXllZFByb3BlcnR5J10gOiBbbmV3IEluZGl2aWR1YWxNb2RlbCgncmRmczpsYWJlbCcpXTtcbiAgY29uc3QgdGFyZ2V0ID0gZXh0cmEgJiYgZXh0cmEudGFyZ2V0O1xuICBjb25zdCByZWxfdXJpID0gZXh0cmEgJiYgZXh0cmEudGFyZ2V0X3JlbF91cmk7XG4gIGNvbnN0IGlzU2luZ2xlID0gZXh0cmEgJiYgZXh0cmEuaXNTaW5nbGU7XG4gIGNvbnN0IHdpdGhEZWxldGVkID0gZXh0cmEgJiYgZXh0cmEud2l0aERlbGV0ZWQ7XG4gIGNvbnN0IHNvcnQgPSBleHRyYSA/IGV4dHJhLnNvcnQgOiB0aGlzLmhhc1ZhbHVlKCd2LXVpOnNvcnQnKSA/IHRoaXNbJ3YtdWk6c29ydCddWzBdIDogdW5kZWZpbmVkO1xuICBjb25zdCB0Ym9keSA9ICQoJy50Ym9keScsIHRlbXBsYXRlKTtcbiAgY29uc3QgdGhlYWQgPSAkKCcudGhlYWQnLCB0ZW1wbGF0ZSk7XG4gIGxldCBoZWFkVG1wbCA9ICcnO1xuICBsZXQgcm93VG1wbCA9ICcnO1xuXG4gIGlmICh0YXJnZXQgJiYgcmVsX3VyaSkge1xuICAgIGlmIChpc1NpbmdsZSkge1xuICAgICAgaGVhZFRtcGwgKz0gXCI8dGggd2lkdGg9JzFweCc+PC90aD5cIjtcbiAgICAgIHJvd1RtcGwgKz0gXCI8dGQ+PGlucHV0IHR5cGU9J3JhZGlvJyBjbGFzcz0nc2VsZWN0LXJvdycgbmFtZT0nc2VsZWN0LXJvdycgLz48L3RkPlwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBoZWFkVG1wbCArPSBcIjx0aCB3aWR0aD0nNDhweCc+PC90aD5cIjtcbiAgICAgIHJvd1RtcGwgKz1cbiAgICAgICAgXCI8dGQ+PGRpdiBjbGFzcz0nY2hlY2tib3ggbm8tbWFyZ2luJz48bGFiZWw+PGlucHV0IHR5cGU9J2NoZWNrYm94JyBjbGFzcz0nc2VsZWN0LXJvdycgLz4gPHNwYW4gc3R5bGU9J2N1cnNvcjpwb2ludGVyJyBjbGFzcz0nc2VsZWN0LWRlZXAgZmEgZmEtc2l0ZW1hcCB0ZXh0LW11dGVkJz48L3NwYW4+PC9sYWJlbD48L2Rpdj48L3RkPlwiO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBoZWFkVG1wbCArPSBcIjx0aCB3aWR0aD0nMjRweCc+PHNwYW4gY2xhc3M9J2dseXBoaWNvbiBnbHlwaGljb24tem9vbS1pbic+PC9zcGFuPjwvdGg+XCI7XG4gICAgcm93VG1wbCArPSBcIjx0ZCBhYm91dD0nQCcgZGF0YS10ZW1wbGF0ZT0ndi11aTpJY29uTW9kYWxUZW1wbGF0ZSc+PC90ZD5cIjtcbiAgfVxuXG4gIGNvbnN0IGFsbG93ZWRGaWx0ZXJGbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGFsbG93ZWRGaWx0ZXIpIHtcbiAgICAgIHJldHVybiBuZXcgRnVuY3Rpb24oYWxsb3dlZEZpbHRlclswXS50b1N0cmluZygpKTtcbiAgICB9IGVsc2UgaWYgKGFsbG93ZWRDbGFzcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgICAgIHJldHVybiBhbGxvd2VkQ2xhc3MucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGFsbG93ZWQpIHtcbiAgICAgICAgICByZXR1cm4gYWNjIHx8IHRoYXQuaGFzVmFsdWUoJ3JkZjp0eXBlJywgYWxsb3dlZCk7XG4gICAgICAgIH0sIGZhbHNlKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfTtcbiAgICB9XG4gIH0pKCk7XG5cbiAgY29uc3Qgc2VsZWN0YWJsZUZpbHRlckZuID0gKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoc2VsZWN0YWJsZUZpbHRlcikge1xuICAgICAgcmV0dXJuIG5ldyBGdW5jdGlvbihzZWxlY3RhYmxlRmlsdGVyWzBdLnRvU3RyaW5nKCkpO1xuICAgIH0gZWxzZSBpZiAoc2VsZWN0YWJsZUNsYXNzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHNlbGVjdGFibGVDbGFzcy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgc2VsZWN0YWJsZSkge1xuICAgICAgICAgIHJldHVybiBhY2MgfHwgdGhhdC5oYXNWYWx1ZSgncmRmOnR5cGUnLCBzZWxlY3RhYmxlKTtcbiAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9O1xuICAgIH1cbiAgfSkoKTtcblxuICBjb25zdCBsaXRlcmFscyA9IFsncmRmczpMaXRlcmFsJywgJ3hzZDpzdHJpbmcnLCAneHNkOmJvb2xlYW4nLCAneHNkOmludGVnZXInLCAneHNkOm5vbk5lZ2F0aXZlSW50ZWdlcicsICd4c2Q6ZGVjaW1hbCcsICd4c2Q6ZGF0ZVRpbWUnXTtcblxuICBkaXNwbGF5ZWRQcm9wZXJ0eS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSwgaW5kZXgpIHtcbiAgICBoZWFkVG1wbCArPSAnPHRoPicgKyBzYW5pdGl6ZShwcm9wZXJ0eVsncmRmczpsYWJlbCddLm1hcChDb21tb25VdGlsLmZvcm1hdFZhbHVlKS5qb2luKCcgJykpICsgJzwvdGg+JztcbiAgICBjb25zdCBpc0xpdGVyYWwgPSBsaXRlcmFscy5pbmRleE9mKHByb3BlcnR5WydyZGZzOnJhbmdlJ11bMF0uaWQpID49IDA7XG4gICAgY29uc3QgaXNGaWxlID0gcHJvcGVydHkuaGFzVmFsdWUoJ3JkZnM6cmFuZ2UnLCAndi1zOkZpbGUnKTtcbiAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgIGlmIChpc0xpdGVyYWwpIHtcbiAgICAgICAgcm93VG1wbCArPVxuICAgICAgICAgIFwiPHRkPjxkaXYgY2xhc3M9J3NwYWNlcic+PGEgaHJlZj0nIycgY2xhc3M9J2V4cGFuZCBnbHlwaGljb24gZ2x5cGhpY29uLWNoZXZyb24tcmlnaHQnPjwvYT4gPHNwYW4gYWJvdXQ9J0AnIHByb3BlcnR5PSdcIiArXG4gICAgICAgICAgcHJvcGVydHkuaWQgK1xuICAgICAgICAgIFwiJz48L3NwYW4+PC9kaXY+PC90ZD5cIjtcbiAgICAgIH0gZWxzZSBpZiAoaXNGaWxlKSB7XG4gICAgICAgIHJvd1RtcGwgKz1cbiAgICAgICAgICBcIjx0ZD48ZGl2IGNsYXNzPSdzcGFjZXInPjxhIGhyZWY9JyMnIGNsYXNzPSdleHBhbmQgZ2x5cGhpY29uIGdseXBoaWNvbi1jaGV2cm9uLXJpZ2h0Jz48L2E+IDxzcGFuIGFib3V0PSdAJyByZWw9J1wiICtcbiAgICAgICAgICBwcm9wZXJ0eS5pZCArXG4gICAgICAgICAgXCInIGRhdGEtdGVtcGxhdGU9J3YtdWk6RmlsZU1pblRlbXBsYXRlJz48L3NwYW4+PC9kaXY+PC90ZD5cIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJvd1RtcGwgKz1cbiAgICAgICAgICBcIjx0ZD48ZGl2IGNsYXNzPSdzcGFjZXInPjxhIGhyZWY9JyMnIGNsYXNzPSdleHBhbmQgZ2x5cGhpY29uIGdseXBoaWNvbi1jaGV2cm9uLXJpZ2h0Jz48L2E+IDxzcGFuIGFib3V0PSdAJyByZWw9J1wiICtcbiAgICAgICAgICBwcm9wZXJ0eS5pZCArXG4gICAgICAgICAgXCInIGRhdGEtdGVtcGxhdGU9J3YtdWk6TGFiZWxUZW1wbGF0ZSc+PC9zcGFuPjwvZGl2PjwvdGQ+XCI7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChpc0xpdGVyYWwpIHtcbiAgICAgICAgcm93VG1wbCArPSBcIjx0ZCBhYm91dD0nQCcgcHJvcGVydHk9J1wiICsgcHJvcGVydHkuaWQgKyBcIic+PC90ZD5cIjtcbiAgICAgIH0gZWxzZSBpZiAoaXNGaWxlKSB7XG4gICAgICAgIHJvd1RtcGwgKz0gXCI8dGQgYWJvdXQ9J0AnIHJlbD0nXCIgKyBwcm9wZXJ0eS5pZCArIFwiJyBkYXRhLXRlbXBsYXRlPSd2LXVpOkZpbGVUb1RyZWVUZW1wbGF0ZSc+PC90ZD5cIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJvd1RtcGwgKz0gXCI8dGQgYWJvdXQ9J0AnIHJlbD0nXCIgKyBwcm9wZXJ0eS5pZCArIFwiJyBkYXRhLXRlbXBsYXRlPSd2LXVpOkxhYmVsVGVtcGxhdGUnPjwvdGQ+XCI7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgaGVhZFRtcGwgPSAnPHRyPicgKyBoZWFkVG1wbCArICc8L3RyPic7XG4gIHRoZWFkLmh0bWwoaGVhZFRtcGwpO1xuXG4gIHRlbXBsYXRlLm9uKCdjbGljaycsICdhLmV4cGFuZCcsIGV4cGFuZFJvdyk7XG5cbiAgZnVuY3Rpb24gZXhwYW5kUm93IChlLCBleHBhbmRMZXZlbCkge1xuICAgIGlmIChlKSB7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBjb25zdCB0aGF0ID0gJCh0aGlzKTtcbiAgICBjb25zdCB0aGF0Um93ID0gdGhhdC5jbG9zZXN0KCd0cicpO1xuICAgIGNvbnN0IHRoYXRMdmwgPSBwYXJzZUludCh0aGF0Um93LmF0dHIoJ2RhdGEtbGV2ZWwnKSk7XG4gICAgY29uc3QgdXJpID0gdGhhdFJvdy5hdHRyKCdyZXNvdXJjZScpO1xuICAgIGNvbnN0IHZhbHVlID0gbmV3IEluZGl2aWR1YWxNb2RlbCh1cmkpO1xuXG4gICAgdGhhdC50b2dnbGVDbGFzcygnZXhwYW5kZWQgZ2x5cGhpY29uLWNoZXZyb24tcmlnaHQgZ2x5cGhpY29uLWNoZXZyb24tZG93bicpO1xuXG4gICAgaWYgKHRoYXQuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcbiAgICAgIGdldENoaWxkcmVuKFtdLCB2YWx1ZSwgZmFsc2UpLnRoZW4oZnVuY3Rpb24gKGNoaWxkcmVuKSB7XG4gICAgICAgIHJldHVybiByZW5kZXJSb3dzKGNoaWxkcmVuLCB0aGF0Um93LCBleHBhbmRMZXZlbCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY29uc3QgbmV4dEx2bCA9IHBhcnNlSW50KHRoYXRSb3cubmV4dCgpLmF0dHIoJ2RhdGEtbGV2ZWwnKSk7XG4gICAgICAgICAgaWYgKGlzTmFOKG5leHRMdmwpIHx8IG5leHRMdmwgPD0gdGhhdEx2bCkge1xuICAgICAgICAgICAgdGhhdC5wcmV2KCkuY3NzKCd3aWR0aCcsIDE2ICogKHRoYXRMdmwgKyAxKSAtIDIpO1xuICAgICAgICAgICAgdGhhdC5yZW1vdmUoKTtcbiAgICAgICAgICAgIHRoYXRSb3cuZmluZCgnLnNlbGVjdC1kZWVwJykucmVtb3ZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgcm93c1RvUmVtb3ZlID0gJCgpO1xuICAgICAgdGhhdFJvdy5uZXh0QWxsKCkuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IHJvdyA9ICQodGhpcyk7XG4gICAgICAgIGlmIChyb3cuZGF0YSgnbGV2ZWwnKSA+IHRoYXRMdmwpIHtcbiAgICAgICAgICByb3dzVG9SZW1vdmUgPSByb3dzVG9SZW1vdmUuYWRkKHJvdyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJvd3NUb1JlbW92ZS5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJSb3dzICh2YWx1ZXNfdXJpcywgcGFyZW50Um93LCBleHBhbmRMZXZlbCkge1xuICAgIGNvbnN0IGNvbnQgPSAkKCc8ZGl2PicpO1xuICAgIGNvbnN0IHBhcmVudEx2bCA9IHBhcmVudFJvdyA/IHBhcnNlSW50KHBhcmVudFJvdy5hdHRyKCdkYXRhLWxldmVsJykpIDogLTE7XG4gICAgY29uc3QgdG1wbCA9ICQoXCI8dHIgY2xhc3M9J3ZhbHVlLXJvdyc+XCIpXG4gICAgICAuYXR0cignZGF0YS1sZXZlbCcsIHBhcmVudEx2bCArIDEpXG4gICAgICAuYXBwZW5kKHJvd1RtcGwpO1xuICAgICQoJy5zcGFjZXInLCB0bXBsKS5jc3MoeydtYXJnaW4tbGVmdCc6IDE2ICogKHBhcmVudEx2bCArIDEpICsgJ3B4JywgJ2Rpc3BsYXknOiAnaW5saW5lLWJsb2NrJ30pO1xuICAgIHJldHVybiBQcm9taXNlLmFsbChcbiAgICAgIHZhbHVlc191cmlzLm1hcChmdW5jdGlvbiAodmFsdWVVcmksIGluZGV4KSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gbmV3IEluZGl2aWR1YWxNb2RlbCh2YWx1ZVVyaSk7XG4gICAgICAgIHJldHVybiB2YWx1ZS5sb2FkKCkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICBpZiAoIWFsbG93ZWRGaWx0ZXJGbi5jYWxsKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdmFsdWUucHJlc2VudChjb250LCB0bXBsWzBdLm91dGVySFRNTCkudGhlbihmdW5jdGlvbiAodG1wbCkge1xuICAgICAgICAgICAgdG1wbCA9ICQodG1wbCk7XG4gICAgICAgICAgICAvLyBQcmUtY2hlY2sgY2hpbGRyZW5cbiAgICAgICAgICAgIHJldHVybiBnZXRDaGlsZHJlbihbXSwgdmFsdWUsIGZhbHNlKVxuICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBpZiAoIWNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgdG1wbC5maW5kKCcuZXhwYW5kJykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICB0bXBsLmZpbmQoJy5zZWxlY3QtZGVlcCcpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgY29uc3Qgc3BhY2VyID0gdG1wbC5maW5kKCcuc3BhY2VyJyk7XG4gICAgICAgICAgICAgICAgICBzcGFjZXIuY3NzKCdtYXJnaW4tbGVmdCcsIDE2ICogKHBhcmVudEx2bCArIDIpICsgMiArICdweCcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXhwYW5kTGV2ZWwpIHtcbiAgICAgICAgICAgICAgICAgIGV4cGFuZFJvdy5jYWxsKHRtcGwuZmluZCgnLmV4cGFuZCcpLCB1bmRlZmluZWQsIGV4cGFuZExldmVsIC0gMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldCAmJiByZWxfdXJpKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RSb3cgPSAkKCcuc2VsZWN0LXJvdycsIHRtcGwpO1xuICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0RGVlcCA9ICQoJy5zZWxlY3QtZGVlcCcsIHRtcGwpO1xuICAgICAgICAgICAgICAgICAgc2VsZWN0Um93LnByb3AoJ2NoZWNrZWQnLCB0YXJnZXQuaGFzVmFsdWUocmVsX3VyaSwgdmFsdWUpKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLmRlZXBTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3REZWVwLnJlbW92ZUNsYXNzKCd0ZXh0LW11dGVkJykuYWRkQ2xhc3MoJ3RleHQtZGFuZ2VyJyk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3REZWVwLmFkZENsYXNzKCd0ZXh0LW11dGVkJykucmVtb3ZlQ2xhc3MoJ3RleHQtZGFuZ2VyJyk7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIGlmICghc2VsZWN0YWJsZUZpbHRlckZuLmNhbGwodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdFJvdy5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRtcGw7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pLFxuICAgICkudGhlbihmdW5jdGlvbiAocmVuZGVyZWQpIHtcbiAgICAgIGlmIChwYXJlbnRSb3cpIHtcbiAgICAgICAgcGFyZW50Um93LmFmdGVyKHJlbmRlcmVkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRib2R5LmFwcGVuZChyZW5kZXJlZCk7XG4gICAgICB9XG4gICAgICBjb250LnJlbW92ZSgpO1xuICAgICAgcmV0dXJuIHJlbmRlcmVkO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKHRhcmdldCAmJiByZWxfdXJpKSB7XG4gICAgdGVtcGxhdGUub24oJ2NsaWNrJywgJ3RkJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBjb25zdCByb3cgPSAkKHRoaXMpLnBhcmVudCgpO1xuICAgICAgJCgnLnNlbGVjdC1yb3cnLCByb3cpLmNsaWNrKCk7XG4gICAgfSk7XG5cbiAgICB0ZW1wbGF0ZS5vbignY2xpY2snLCAnLnNlbGVjdC1yb3cnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGNvbnN0ICR0aGlzID0gJCh0aGlzKTtcbiAgICAgIGNvbnN0IHJvdyA9ICR0aGlzLmNsb3Nlc3QoJ3RyJyk7XG4gICAgICBjb25zdCB1cmkgPSByb3cuYXR0cigncmVzb3VyY2UnKTtcbiAgICAgIGNvbnN0IHZhbHVlID0gbmV3IEluZGl2aWR1YWxNb2RlbCh1cmkpO1xuXG4gICAgICAkKCcjY3JlYXRlLU5ld0l0ZW0nLCB0ZW1wbGF0ZSkucmVtb3ZlKCk7XG4gICAgICBpZiAoJCgnLm1vZGFsJykubGVuZ3RoID09IDApIHtcbiAgICAgICAgY29uc3QgYWRkQnV0dG9uID0gZHJhd0FkZEJ1dHRvbihyb3cpO1xuICAgICAgICByb3cuY2hpbGRyZW4oKS5sYXN0KCkuYXBwZW5kKGFkZEJ1dHRvbik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc1NpbmdsZSkge1xuICAgICAgICB0YXJnZXQuc2V0KHJlbF91cmksIFt2YWx1ZV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0LnRvZ2dsZVZhbHVlKHJlbF91cmksIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRlbXBsYXRlLm9uKCdjbGljaycsICcuc2VsZWN0LWRlZXAnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGNvbnN0ICR0aGlzID0gJCh0aGlzKTtcbiAgICAgIGNvbnN0IHJvdyA9ICR0aGlzLmNsb3Nlc3QoJ3RyJyk7XG4gICAgICBjb25zdCB1cmkgPSByb3cuYXR0cigncmVzb3VyY2UnKTtcbiAgICAgIGNvbnN0IHZhbHVlID0gbmV3IEluZGl2aWR1YWxNb2RlbCh1cmkpO1xuXG4gICAgICBnZXRDaGlsZHJlbihbXSwgdmFsdWUpLnRoZW4oZnVuY3Rpb24gKGJyYW5jaFVyaXMpIHtcbiAgICAgICAgdmFsdWUuZGVlcFNlbGVjdGVkID0gIXZhbHVlLmRlZXBTZWxlY3RlZDtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFxuICAgICAgICAgIGJyYW5jaFVyaXMubWFwKGZ1bmN0aW9uIChicmFuY2hVcmkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSW5kaXZpZHVhbE1vZGVsKGJyYW5jaFVyaSkubG9hZCgpO1xuICAgICAgICAgIH0pLFxuICAgICAgICApO1xuICAgICAgfSkudGhlbihmdW5jdGlvbiAoYnJhbmNoT2Jqcykge1xuICAgICAgICBjb25zdCBicmFuY2ggPSBicmFuY2hPYmpzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgIGl0ZW0uZGVlcFNlbGVjdGVkID0gdmFsdWUuZGVlcFNlbGVjdGVkO1xuICAgICAgICAgIHJldHVybiBhbGxvd2VkRmlsdGVyRm4uY2FsbChpdGVtKSAmJiBzZWxlY3RhYmxlRmlsdGVyRm4uY2FsbChpdGVtKSA/IGl0ZW0gOiB1bmRlZmluZWQ7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodmFsdWUuZGVlcFNlbGVjdGVkKSB7XG4gICAgICAgICAgdGFyZ2V0LmFkZFZhbHVlKHJlbF91cmksIGJyYW5jaCk7XG4gICAgICAgICAgJHRoaXMucmVtb3ZlQ2xhc3MoJ3RleHQtbXV0ZWQnKS5hZGRDbGFzcygndGV4dC1kYW5nZXInKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YXJnZXQucmVtb3ZlVmFsdWUocmVsX3VyaSwgYnJhbmNoKTtcbiAgICAgICAgICAkdGhpcy5hZGRDbGFzcygndGV4dC1tdXRlZCcpLnJlbW92ZUNsYXNzKCd0ZXh0LWRhbmdlcicpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRhcmdldC5vbihyZWxfdXJpLCBwcm9wZXJ0eU1vZGlmaWVkSGFuZGxlcik7XG4gICAgdGVtcGxhdGUub25lKCdyZW1vdmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICB0YXJnZXQub2ZmKHJlbF91cmksIHByb3BlcnR5TW9kaWZpZWRIYW5kbGVyKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlZHJhd0JyYW5jaCAoYnJhbmNoUm93KSB7XG4gICAgY29uc3QgdGhhdEx2bCA9IHBhcnNlSW50KGJyYW5jaFJvdy5hdHRyKCdkYXRhLWxldmVsJykpO1xuICAgIGJyYW5jaFJvdy5uZXh0VW50aWwoJ1tkYXRhLWxldmVsPScgKyB0aGF0THZsICsgJ10nKS5yZW1vdmUoKTtcblxuICAgIGNvbnN0IHZhbHVlID0gbmV3IEluZGl2aWR1YWxNb2RlbChicmFuY2hSb3cuYXR0cigncmVzb3VyY2UnKSk7XG4gICAgaWYgKHZhbHVlICYmIHZhbHVlLmNoaWxkcmVuKSBkZWxldGUgdmFsdWUuY2hpbGRyZW47XG4gICAgZ2V0Q2hpbGRyZW4oW10sIHZhbHVlLCBmYWxzZSkudGhlbihmdW5jdGlvbiAoY2hpbGRyZW4pIHtcbiAgICAgIHJldHVybiByZW5kZXJSb3dzKGNoaWxkcmVuLCBicmFuY2hSb3cpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBuZXh0THZsID0gcGFyc2VJbnQoYnJhbmNoUm93Lm5leHQoKS5hdHRyKCdkYXRhLWxldmVsJykpO1xuICAgICAgICBpZiAoaXNOYU4obmV4dEx2bCkgfHwgbmV4dEx2bCA8PSB0aGF0THZsKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcigndW5leHBlY3RlZCEhISEhIScpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiBwcm9wZXJ0eU1vZGlmaWVkSGFuZGxlciAodmFsdWVzKSB7XG4gICAgJCgnLnZhbHVlLXJvdycsIHRlbXBsYXRlKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0ICR0aGlzID0gJCh0aGlzKTtcbiAgICAgIGNvbnN0IHVyaSA9ICR0aGlzLmF0dHIoJ3Jlc291cmNlJyk7XG4gICAgICBjb25zdCB2YWx1ZSA9IG5ldyBJbmRpdmlkdWFsTW9kZWwodXJpKTtcbiAgICAgIGlmICh2YWx1ZXMuaW5kZXhPZih2YWx1ZSkgPj0gMCkge1xuICAgICAgICAkdGhpcy5maW5kKCcuc2VsZWN0LXJvdycpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICR0aGlzLmZpbmQoJy5zZWxlY3Qtcm93JykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWx1ZS5kZWVwU2VsZWN0ZWQpIHtcbiAgICAgICAgJHRoaXMuZmluZCgnLnNlbGVjdC1kZWVwJykucmVtb3ZlQ2xhc3MoJ3RleHQtbXV0ZWQnKS5hZGRDbGFzcygndGV4dC1kYW5nZXInKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICR0aGlzLmZpbmQoJy5zZWxlY3QtZGVlcCcpLmFkZENsYXNzKCd0ZXh0LW11dGVkJykucmVtb3ZlQ2xhc3MoJ3RleHQtZGFuZ2VyJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBSZW5kZXIgdHJlZVxuICByb290LmZvckVhY2goZnVuY3Rpb24gKHJvb3QsIGluZGV4LCByb290cykge1xuICAgIHJlbmRlclJvd3MoW3Jvb3QuaWRdLCB1bmRlZmluZWQsIHR5cGVvZiBleHBhbmRMZXZlbCAhPT0gJ3VuZGVmaW5lZCcgPyBleHBhbmRMZXZlbCA6IHJvb3RzLmxlbmd0aCA9PT0gMSA/IDEgOiAwKTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gZ2V0Q2hpbGRyZW4gKGFjYywgcm9vdCwgZ29EZWVwZXIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgaWYgKHJvb3QuY2hpbGRyZW4pIHtcbiAgICAgICAgcmVzb2x2ZShyb290LmNoaWxkcmVuKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG91dHMgPSBnZXRPdXQocm9vdCk7XG4gICAgICAgIGdldEluKHJvb3QpLnRoZW4oZnVuY3Rpb24gKGlucykge1xuICAgICAgICAgIHJvb3QuY2hpbGRyZW4gPSBvdXRzLmNvbmNhdChpbnMpO1xuICAgICAgICAgIHJlc29sdmUocm9vdC5jaGlsZHJlbik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pXG4gICAgICAudGhlbihmdW5jdGlvbiAoY2hpbGRyZW4pIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFxuICAgICAgICAgIGNoaWxkcmVuLm1hcChmdW5jdGlvbiAoY2hpbGRVcmkpIHtcbiAgICAgICAgICAgIGNvbnN0IGlzQWxyZWFkeUxvYWRlZCA9IGFjYy5pbmRleE9mKGNoaWxkVXJpKSA+PSAwO1xuICAgICAgICAgICAgYWNjLnB1c2goY2hpbGRVcmkpO1xuICAgICAgICAgICAgaWYgKGdvRGVlcGVyICE9PSBmYWxzZSAmJiAhaXNBbHJlYWR5TG9hZGVkKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gbmV3IEluZGl2aWR1YWxNb2RlbChjaGlsZFVyaSk7XG4gICAgICAgICAgICAgIHJldHVybiBnZXRDaGlsZHJlbihhY2MsIGNoaWxkLCBnb0RlZXBlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRPdXQgKHJvb3QpIHtcbiAgICBjb25zdCByZXMgPSBbXTtcbiAgICBpZiAob3V0UHJvcGVydHkpIHtcbiAgICAgIG91dFByb3BlcnR5Lm1hcChmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgaWYgKHJvb3QuaGFzVmFsdWUocHJvcGVydHkuaWQpKSB7XG4gICAgICAgICAgcm9vdC5wcm9wZXJ0aWVzW3Byb3BlcnR5LmlkXS5tYXAoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICByZXMucHVzaCh2YWx1ZS5kYXRhKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRJbiAocm9vdCkge1xuICAgIGlmICghaW5Qcm9wZXJ0eSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShbXSk7XG4gICAgfVxuICAgIGxldCBxID0gaW5Qcm9wZXJ0eVxuICAgICAgLm1hcChmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgcmV0dXJuIFwiJ1wiICsgcHJvcGVydHkuaWQgKyBcIic9PSdcIiArIHJvb3QuaWQgKyBcIidcIjtcbiAgICAgIH0pXG4gICAgICAuam9pbignIHx8ICcpO1xuICAgIGlmIChhbGxvd2VkQ2xhc3MpIHtcbiAgICAgIGNvbnN0IGFsbG93ZWQgPSBhbGxvd2VkQ2xhc3NcbiAgICAgICAgLm1hcChmdW5jdGlvbiAoYWxsb3dlZENsYXNzKSB7XG4gICAgICAgICAgcmV0dXJuIFwiJ3JkZjp0eXBlJz09J1wiICsgYWxsb3dlZENsYXNzLmlkICsgXCInXCI7XG4gICAgICAgIH0pXG4gICAgICAgIC5qb2luKCcgfHwgJyk7XG4gICAgICBxID0gJyggJyArIHEgKyAnICkgJiYgKCAnICsgYWxsb3dlZCArICcgKSc7XG4gICAgfVxuICAgIGNvbnN0IG9yZGVyID0gc29ydCB8fCBcIidyZGZzOmxhYmVsX3J1JyBhc2MsICdyZGZzOmxhYmVsX2VuJyBhc2MsICdyZGZzOmxhYmVsJyBhc2NcIjtcbiAgICBsZXQgdW5pcXVlO1xuICAgIHJldHVybiBCYWNrZW5kLnF1ZXJ5KHtcbiAgICAgIHRpY2tldDogdmVkYS50aWNrZXQsXG4gICAgICBxdWVyeTogcSxcbiAgICAgIHNvcnQ6IG9yZGVyLFxuICAgICAgYXN5bmM6IHRydWUsXG4gICAgfSkudGhlbihmdW5jdGlvbiAocXVlcnlSZXN1bHQpIHtcbiAgICAgIHVuaXF1ZSA9IENvbW1vblV0aWwudW5pcXVlKHF1ZXJ5UmVzdWx0LnJlc3VsdCk7XG4gICAgICBpZiAod2l0aERlbGV0ZWQpIHtcbiAgICAgICAgcSA9IHEgKyBcIiAmJiAoICd2LXM6ZGVsZXRlZCc9PSB0cnVlIClcIjtcbiAgICAgICAgcmV0dXJuIEJhY2tlbmQucXVlcnkoe1xuICAgICAgICAgIHRpY2tldDogdmVkYS50aWNrZXQsXG4gICAgICAgICAgcXVlcnk6IHEsXG4gICAgICAgICAgc29ydDogb3JkZXIsXG4gICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHFSZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gdW5pcXVlLmNvbmNhdChxUmVzdWx0LnJlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHVuaXF1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXdBZGRCdXR0b24gKGN1cnJlbnRSb3cpIHtcbiAgICBjb25zdCBhZGRCdXR0b24gPSAkKFwiPGRpdiBpZD0nY3JlYXRlLU5ld0l0ZW0nPjxidXR0b24gY2xhc3M9J2J0biBidG4teHMgYnRuLXByaW1hcnkgbWFyZ2luLXNtJz7QlNC+0LHQsNCy0LjRgtGMINGN0LvQtdC80LXQvdGCPC9idXR0b24+PC9kaXY+XCIpO1xuICAgIGFkZEJ1dHRvbi5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBjdXJyZW50VXJpID0gY3VycmVudFJvdy5hdHRyKCdyZXNvdXJjZScpO1xuICAgICAgY29uc3QgdHlwZSA9ICQodGhpcykuY2xvc2VzdCgndHInKS5hdHRyKCd0eXBlb2YnKTtcbiAgICAgIGNvbnN0IG5ld0l0ZW0gPSBuZXcgSW5kaXZpZHVhbE1vZGVsKCk7XG4gICAgICBuZXdJdGVtWydyZGY6dHlwZSddID0gW25ldyBJbmRpdmlkdWFsTW9kZWwodHlwZSldO1xuICAgICAgbmV3SXRlbVsndi1zOmhhc1BhcmVudExpbmsnXSA9IFtuZXcgSW5kaXZpZHVhbE1vZGVsKGN1cnJlbnRVcmkpXTtcbiAgICAgIGNvbnN0IG1vZGFsID0gQnJvd3NlclV0aWwuc2hvd01vZGFsKG5ld0l0ZW0sIHVuZGVmaW5lZCwgJ2VkaXQnKTtcbiAgICAgIG5ld0l0ZW0ub25lKCdhZnRlclJlc2V0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBtb2RhbC5tb2RhbCgnaGlkZScpLnJlbW92ZSgpO1xuICAgICAgfSk7XG4gICAgICBuZXdJdGVtLm9uZSgnYWZ0ZXJTYXZlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZWRyYXdCcmFuY2goY3VycmVudFJvdyk7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgICAgIG1vZGFsLm1vZGFsKCdoaWRlJykucmVtb3ZlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gYWRkQnV0dG9uO1xuICB9XG5cbiAgaWYgKCF0aGlzLmhhc1ZhbHVlKCdyZGY6dHlwZScsICd2LXVpOlRyZWUnKSkge1xuICAgICQoJy5oZWFkaW5nJywgdGVtcGxhdGUpLnJlbW92ZSgpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaHRtbCA9IGBcbiAgPGRpdiBjbGFzcz1cImNvbnRhaW5lciBzaGVldCB0YWJsZS1yZXNwb25zaXZlXCI+XG4gICAgPHN0eWxlIHNjb3BlZD5cbiAgICAgIHRyID4gdGg6Zmlyc3QtY2hpbGQsXG4gICAgICB0ciA+IHRkOmZpcnN0LWNoaWxkIHtcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2RkZDtcbiAgICAgIH1cbiAgICA8L3N0eWxlPlxuICAgIDxkaXYgY2xhc3M9XCJoZWFkaW5nXCI+XG4gICAgICA8aDIgYWJvdXQ9XCJAXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9oMj5cbiAgICAgIDxociBjbGFzcz1cIm1hcmdpbi1zbVwiIC8+XG4gICAgPC9kaXY+XG4gICAgPHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtY29uZGVuc2VkIHRhYmxlLXN0cmlwZWRcIj5cbiAgICAgIDx0aGVhZCBjbGFzcz1cInRoZWFkXCI+PC90aGVhZD5cbiAgICAgIDx0Ym9keSBjbGFzcz1cInRib2R5XCI+PC90Ym9keT5cbiAgICA8L3RhYmxlPlxuICA8L2Rpdj5cbmA7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O01BQU9BLFdBQVcsR0FBQUMsZ0JBQUEsQ0FBQUMsT0FBQTtJQUFBLGFBQUFDLGVBQUE7TUFDWEMsVUFBVSxHQUFBRCxlQUFBLENBQUFELE9BQUE7SUFBQSxhQUFBRyx1QkFBQTtNQUNUQyxRQUFRLEdBQUFELHVCQUFBLENBQVJDLFFBQVE7SUFBQSxhQUFBQyxPQUFBO01BQ1RDLENBQUMsR0FBQUQsT0FBQSxDQUFBTCxPQUFBO0lBQUEsYUFBQU8sZUFBQTtNQUNEQyxJQUFJLEdBQUFELGVBQUEsQ0FBQVAsT0FBQTtJQUFBLGFBQUFTLDJCQUFBO01BQ0pDLGVBQWUsR0FBQUQsMkJBQUEsQ0FBQVQsT0FBQTtJQUFBLGFBQUFXLGtCQUFBO01BQ2ZDLE9BQU8sR0FBQUQsa0JBQUEsQ0FBQVgsT0FBQTtJQUFBO0lBQUFhLE9BQUEsV0FBQUEsQ0FBQTtNQUFBQyxPQUFBLFFBRURDLEdBQUcsR0FBRyxTQUFOQSxHQUFHQSxDQUFhQyxVQUFVLEVBQUVDLFFBQVEsRUFBRUMsU0FBUyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRTtRQUN6RUgsUUFBUSxHQUFHWCxDQUFDLENBQUNXLFFBQVEsQ0FBQztRQUN0QkMsU0FBUyxHQUFHWixDQUFDLENBQUNZLFNBQVMsQ0FBQztRQUV4QixJQUFNRyxJQUFJLEdBQUcsSUFBSSxDQUFDQyxRQUFRLENBQUMsZUFBZSxDQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHQyxTQUFTO1FBQy9FLElB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