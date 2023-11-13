"use strict";

System.register(["../common/veda.js", "../common/individual_model.js", "../common/backend.js", "../browser/notify.js", "../common/lib/riot.js", "../common/util.js"], function (_export, _context) {
  "use strict";

  var veda, IndividualModel, Backend, notify, riot, CommonUtil, Util;
  function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }
  /**
   * Synchronous get individual
   * @param {string} ticket
   * @param {string} uri
   * @return {Object} - individual properties object
   */
  function getSync(ticket, uri) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'get_individual?uri=' + uri + '&ticket=' + ticket, false);
    xhr.send();
    if (xhr.status === 200) {
      return JSON.parse(xhr.responseText);
    } else {
      throw Error(xhr.status);
    }
  }

  /**
   * Трансформировать указанные индивидуалы по заданным правилам
   * @param {string|IndividualModel} individuals - один или несколько IndividualModel или их идентификаторов
   * @param {string|IndividualModel} transform - применяемая трансформация
   * @return {Array}
   */
  return {
    setters: [function (_commonVedaJs) {
      veda = _commonVedaJs.default;
    }, function (_commonIndividual_modelJs) {
      IndividualModel = _commonIndividual_modelJs.default;
    }, function (_commonBackendJs) {
      Backend = _commonBackendJs.default;
    }, function (_browserNotifyJs) {
      notify = _browserNotifyJs.default;
    }, function (_commonLibRiotJs) {
      riot = _commonLibRiotJs.default;
    }, function (_commonUtilJs) {
      CommonUtil = _commonUtilJs.default;
    }],
    execute: function () {
      Util = {};
      _export("default", Util);
      Util.registerHandler = function (individual, event, template, handler) {
        individual.on(event, handler);
        template.one('remove', function () {
          individual.off(event, handler);
        });
      };

      // Escape function for css (jQuery) selectors
      Util.escape4$ = function (str) {
        if (str) return str.replace(/([ #;?%&,.+*~\':"!^$[\]()=>|\/@])/g, '\\$1');
        return str;
      };
      Util.toTTL = function (individualList, callback) {
        var prefixes = {};
        var prefixer = function prefixer(value, prefixesHash) {
          var reg_uri = /^([a-z-0-9]+:)[a-zA-Z0-9-_]*$/;
          var ontologies = veda.ontology.ontologies;
          var result = reg_uri.exec(value);
          var prefix = result ? result[1] : null;
          var expanded;
          if (prefix === 'dc') {
            expanded = 'http://purl.org/dc/elements/1.1/';
          } else if (prefix === 'grddl') {
            expanded = 'http://www.w3.org/2003/g/data-view#';
          } else if (ontologies[prefix]) {
            expanded = ontologies[prefix]['v-s:fullUrl'][0].toString();
          }
          if (expanded) {
            prefixesHash[prefix] = expanded;
            return value;
          } else {
            return '<' + value + '>';
          }
        };
        var ttl = individualList.map(function (individual) {
          var individual_ttl = '';
          for (var property in individual.properties) {
            if (Object.hasOwnProperty.call(individual.properties, property)) {
              var resources = individual.properties[property];
              if (property === '@') {
                individual_ttl = resources + '\n' + individual_ttl;
                prefixer(resources, prefixes);
              } else {
                var values = resources.reduce(function (acc, resource) {
                  var value;
                  switch (resource.type) {
                    case 'Boolean':
                    case 'Integer':
                    case 'Decimal':
                      value = resource.data;
                      break;
                    case 'Uri':
                      value = prefixer(resource.data, prefixes);
                      break;
                    case 'Datetime':
                      if (_instanceof(resource.data, Date)) {
                        value = '"' + resource.data.toISOString() + '"^^xsd:dateTime';
                      } else {
                        value = '"' + resource.data + '"^^xsd:dateTime';
                      }
                      prefixer('xsd:', prefixes);
                      break;
                    case 'String':
                      if (/(["\n])/.test(resource.data)) {
                        value = '"""' + resource.data + '"""';
                      } else {
                        value = '"' + resource.data + '"';
                      }
                      if (resource.lang !== undefined && resource.lang !== 'NONE') {
                        value += '@' + resource.lang.toLowerCase();
                      }
                      break;
                  }
                  return acc.length ? acc + ', ' + value : value;
                }, '');
                individual_ttl += '  ' + property + ' ' + values + ' ;\n';
                prefixer(property, prefixes);
              }
            }
          }
          return individual_ttl + '.\n';
        }).join('\n');
        ttl = '\n' + ttl;
        for (var prefix in prefixes) {
          if (Object.hasOwnProperty.call(prefixes, prefix)) {
            ttl = ['@prefix', prefix, '<' + prefixes[prefix] + '>'].join(' ') + '.\n' + ttl;
          }
        }
        callback(undefined, ttl);
      };
      Util.exportTTL = function (individualList) {
        _context.import('filesaver').then(function (module) {
          var saveAs = module.default;
          Util.toTTL(individualList, function (error, result) {
            var blob = new Blob([result], {
              type: 'text/plain;charset=utf-8'
            });
            saveAs(blob, 'exported_graph.ttl');
          });
        });
      };

      /**
       * Create specified report
       * @param {string} report - uri of report to create
       * @param {Object} params - parameters to pass to report
       */
      Util.createReport = function (report, params) {
        if (typeof report === 'string' || _instanceof(report, String)) {
          report = new IndividualModel(report);
        }
        var jasperServerCfg = new IndividualModel('cfg:jasperServerAddress');
        Promise.all([report.load(), jasperServerCfg.load()]).then(function (loaded) {
          var reportIndividual = loaded[0];
          var jasperServerCfgIndividual = loaded[1];
          var jasperServerAddress = jasperServerCfgIndividual['rdf:value'][0];
          var form = document.createElement('form');
          form.setAttribute('method', 'post');
          form.setAttribute('action', jasperServerAddress + 'flow.html?_flowId=viewReportFlow&reportUnit=' + encodeURIComponent(reportIndividual['v-s:reportPath'][0]) + '&output=' + encodeURIComponent(reportIndividual['v-s:reportFormat'][0]) + '&documentId=' + encodeURIComponent(params.id) + '&ticket=' + veda.ticket);
          form.setAttribute('target', 'Report');
          Object.getOwnPropertyNames(params.properties).forEach(function (key) {
            if (key !== '@' && params.hasValue(key)) {
              var hiddenField = document.createElement('input');
              hiddenField.setAttribute('type', 'hidden');
              hiddenField.setAttribute('name', key.replace(':', '_').replace('-', '_'));
              var value = params.get(key).map(function (item) {
                if (_instanceof(item, IndividualModel)) {
                  return item.id;
                } else if (_instanceof(item, Date)) {
                  return item.toISOString();
                } else {
                  return item;
                }
              }).join(',');
              hiddenField.setAttribute('value', value);
              form.appendChild(hiddenField);
            }
          });
          // Set client timezone parameter
          var tz = new Date().getTimezoneOffset();
          var tzField = document.createElement('input');
          tzField.setAttribute('type', 'hidden');
          tzField.setAttribute('name', 'timezone');
          tzField.setAttribute('value', tz);
          form.appendChild(tzField);
          document.body.appendChild(form);
          window.open('', 'Report');
          form.submit();
        });
      };

      /**
       * Show user's rights for individual
       * @param {IndividualModel} individual - authorization subject
       */
      Util.showRights = function (individual) {
        var modalTmpl = $('#individual-modal-template').html();
        var modal = $(modalTmpl);
        var modalBody = $('.modal-body', modal);
        modal.modal();
        modal.on('hidden.bs.modal', function () {
          modal.remove();
        });
        $('body').append(modal);
        individual.present(modalBody, 'v-ui:PermissionsTemplate');
      };
      Util.showModal = function (individual, template, mode) {
        if ($('body').hasClass('modal-open')) {
          $('.modal').modal('hide').remove();
        }
        var modal = $($('#notification-modal-template').html());
        modal.modal();
        $('body').append(modal);
        var container = $('.modal-body', modal);
        if (typeof individual === 'string') {
          individual = new IndividualModel(individual);
        }
        individual.present(container, template, mode);
        modal.find('#follow').on('click', function () {
          var resourceTemplate = modal.find('[resource]').first();
          var uri = resourceTemplate.attr('resource');
          var templateMode = resourceTemplate.attr('data-mode');
          modal.modal('hide');
          riot.route(['#', uri, '#main', undefined, templateMode].join('/'));
        });
        $('.action#cancel', modal).on('click', function () {
          modal.modal('hide');
        });
        modal.on('hidden.bs.modal', function () {
          modal.remove();
        });
        return modal;
      };
      Util.showSmallModal = function (individual, template, mode) {
        var modal = $($('#minimal-modal-template').html());
        modal.modal();
        $('body').append(modal);
        var container = $('.modal-body', modal);
        individual.present(container, template, mode);
        $('.action#cancel', modal).on('click', function () {
          modal.modal('hide');
        });
        modal.on('hidden.bs.modal', function () {
          modal.remove();
        });
        return modal;
      };
      Util.confirm = function (individual, template, mode) {
        var modal = $($('#confirm-modal-template').html());
        modal.modal();
        modal.on('hidden.bs.modal', function () {
          modal.remove();
        });
        $('body').append(modal);
        var container = $('.modal-body', modal);
        return individual.present(container, template, mode).then(function () {
          return new Promise(function (resolve, reject) {
            $('.modal-footer > .ok', modal).on('click', function () {
              resolve(true);
            });
            $('.modal-footer > .cancel', modal).on('click', function () {
              resolve(false);
            });
          });
        });
      };

      /**
       * Start BPMN process
       * @param {String} processDefinition
       * @param {IndividualModel} document
       * @return {void}
       */
      Util.startProcess = function (processDefinition, document) {
        return processDefinition.load().then(function () {
          var startFormClass = processDefinition['bpmn:hasStartFormClass'][0];
          if (!startFormClass) throw Error('start form class is not defined');
          var processDefinitionKey = processDefinition['bpmn:processDefinitionKey'][0];
          if (!processDefinitionKey) throw Error('processDefinitionKey is not defined');
          var startForm = new veda.IndividualModel();
          startForm['rdf:type'] = startFormClass;
          startForm['bpmn:hasStatus'] = 'bpmn:ToBeStarted';
          startForm['bpmn:processDefinitionKey'] = processDefinitionKey;
          if (document) startForm['bpmn:hasDocument'] = document;
          return Util.showModal(startForm, undefined, 'edit');
        }).catch(function (error) {
          notify('danger', error);
          throw error;
        });
      };

      /**
       * Start workflow process
       *   - Apply transformation and redirect to start form.
       * @param {IndividualModel} individual
       * @param {template} template - reference to individual view where 'send' was invoked
       * @param {string} transformId - id of a transformation for start form
       * @param {string} _modal - obsolete
       * @param {string} startFormTemplate - id of a start form template
       * @return {void}
       */
      Util.send = function (individual, template, transformId, _modal, startFormTemplate) {
        if (transformId) {
          return (!individual.isSync() ? template[0].veda.save() : Backend.get_individual(veda.ticket, individual.id).catch(function () {
            return template[0].veda.save();
          })).then(function () {
            var transform = new IndividualModel(transformId);
            return transform.load().then(function () {
              return Util.buildStartFormByTransformation(individual, transform).then(function (startForm) {
                return Util.showModal(startForm, startFormTemplate, 'edit');
              });
            });
          }).catch(function (error) {
            var sendError = new IndividualModel('v-s:SendError');
            sendError.load().then(function () {
              notify('danger', {
                name: sendError.toString()
              });
            });
            console.error('Save before send failed');
            throw error;
          });
        } else {
          individual['v-wf:hasStatusWorkflow'] = [new IndividualModel('v-wf:ToBeSent')];
          return template[0].veda.save().then(function () {
            template.closest('.modal').modal('hide').remove();
            var sendSuccess = new IndividualModel('v-s:SendSuccess');
            sendSuccess.load().then(function () {
              notify('success', {
                name: sendSuccess.toString()
              });
            });
          }).catch(function (error) {
            var sendError = new IndividualModel('v-s:SendError');
            sendError.load().then(function () {
              notify('danger', {
                name: sendError.toString()
              });
            });
            console.error('Send failed');
            throw error;
          });
        }
      };

      /**
       * Build start form using transformation
       * @param {IndividualModel} individual - individual to transform
       * @param {IndividualModel} transformation - transformation individual
       * @return {IndividualModel} - start form
       */
      Util.buildStartFormByTransformation = function (individual, transformation) {
        var promises = [individual.load(), transformation.load()];
        return Promise.all(promises).then(function (loadedItems) {
          return Util.transformation(loadedItems[0].properties, loadedItems[1].properties);
        }).then(function (transformResult) {
          var startForm = new IndividualModel(transformResult[0]);
          startForm.isNew(true);
          startForm.isSync(false);
          return startForm.init();
        });
      };
      Util.transformation = function (individuals, transform) {
        if (!Array.isArray(individuals)) {
          individuals = [individuals];
        }
        var rulesUris = transform['v-wf:transformRule'].map(function (rule) {
          return rule.data;
        });
        if (!rulesUris.length) {
          return Promise.resolve();
        }
        return Backend.get_individuals(veda.ticket, rulesUris).then(function (rules) {
          var out_data0 = {};
          var out_data0_el = {};

          /* PUT functions [BEGIN] */

          var putFieldOfObject = function () {
            return function (name, field) {
              var out_data0_el_arr;
              out_data0_el_arr = out_data0_el[name];
              if (!out_data0_el_arr) {
                out_data0_el_arr = [];
              }
              out_data0_el_arr.push(individual[field]);
              out_data0_el[name] = out_data0_el_arr;
            };
          }();
          var putUri = function () {
            return function (name, value) {
              var out_data0_el_arr;
              out_data0_el_arr = out_data0_el[name];
              if (!out_data0_el_arr) {
                out_data0_el_arr = [];
              }
              out_data0_el_arr.push({
                data: value,
                type: 'Uri'
              });
              out_data0_el[name] = out_data0_el_arr;
            };
          }();
          var setUri = function setUri(name, value) {
            out_data0_el[name] = [{
              data: value,
              type: 'Uri'
            }];
          };
          var putString = function () {
            return function (name, value) {
              var out_data0_el_arr;
              out_data0_el_arr = out_data0_el[name];
              if (!out_data0_el_arr) {
                out_data0_el_arr = [];
              }
              out_data0_el_arr.push({
                data: value,
                type: 'String'
              });
              out_data0_el[name] = out_data0_el_arr;
            };
          }();
          var setString = function () {
            return function (name, value) {
              var out_data0_el_arr = [];
              out_data0_el_arr.push({
                data: value,
                type: 'String'
              });
              out_data0_el[name] = out_data0_el_arr;
            };
          }();
          var setDatetime = function () {
            return function (name, value) {
              var out_data0_el_arr = [];
              out_data0_el_arr.push({
                data: value,
                type: 'Datetime'
              });
              out_data0_el[name] = out_data0_el_arr;
            };
          }();
          var putDatetime = function () {
            return function (name, value) {
              var out_data0_el_arr;
              out_data0_el_arr = out_data0_el[name];
              if (!out_data0_el_arr) {
                out_data0_el_arr = [];
              }
              out_data0_el_arr.push({
                data: value,
                type: 'Datetime'
              });
              out_data0_el[name] = out_data0_el_arr;
            };
          }();
          var putBoolean = function () {
            return function (name, value) {
              var out_data0_el_arr;
              out_data0_el_arr = out_data0_el[name];
              if (!out_data0_el_arr) {
                out_data0_el_arr = [];
              }
              out_data0_el_arr.push({
                data: value,
                type: 'Boolean'
              });
              out_data0_el[name] = out_data0_el_arr;
            };
          }();
          var setBoolean = function () {
            return function (name, value) {
              var out_data0_el_arr = [];
              out_data0_el_arr.push({
                data: value,
                type: 'Boolean'
              });
              out_data0_el[name] = out_data0_el_arr;
            };
          }();
          var putInteger = function () {
            return function (name, value) {
              var out_data0_el_arr = out_data0_el[name];
              if (!out_data0_el_arr) {
                out_data0_el_arr = [];
              }
              out_data0_el_arr.push({
                data: value,
                type: 'Integer'
              });
              out_data0_el[name] = out_data0_el_arr;
            };
          }();
          var setInteger = function () {
            return function (name, value) {
              var out_data0_el_arr = [];
              out_data0_el_arr.push({
                data: value,
                type: 'Integer'
              });
              out_data0_el[name] = out_data0_el_arr;
            };
          }();

          /* PUT functions [END] */
          var _loop = function _loop() {
            if (Object.hasOwnProperty.call(individuals, key)) {
              // print("#1 key=", key);
              var _individual = individuals[key];

              // print("#1.1 key=", key);
              var objectContentStrValue = function () {
                return function (name, value) {
                  if (_individual[name]) {
                    var result = false;
                    for (var i in _individual[name]) {
                      if (value === _individual[name][i].data) {
                        result = true;
                      }
                    }
                    return result;
                  }
                };
              }();
              var iteratedObject = Object.keys(_individual);
              var _loop2 = function _loop2(key2) {
                var element = _individual[iteratedObject[key2]];
                var putValue = function () {
                  return function (name) {
                    var out_data0_el_arr = out_data0_el[name];
                    if (!out_data0_el_arr) {
                      out_data0_el_arr = [];
                    }
                    if (iteratedObject[key2] == '@') {
                      out_data0_el_arr.push({
                        data: element,
                        type: 'Uri'
                      });
                    } else {
                      if (Array.isArray(element) === true) {
                        for (var key3 in element) {
                          if (Object.hasOwnProperty.call(element, key3)) {
                            out_data0_el_arr.push(element[key3]);
                          }
                        }
                      } else {
                        out_data0_el_arr.push(element);
                      }
                    }
                    out_data0_el[name] = out_data0_el_arr;
                  };
                }();
                var putValueFrom = function () {
                  return function (name, path, transform) {
                    var out_data0_el_arr = out_data0_el[name];
                    if (!out_data0_el_arr) {
                      out_data0_el_arr = [];
                    }
                    var element_uri;
                    if (Array.isArray(element) === true) {
                      element_uri = Util.getUri(element);
                    } else {
                      element_uri = element.data ? element.data : element;
                    }
                    var curelem;
                    curelem = getSync(veda.ticket, element_uri);
                    for (var i = 0; i < path.length - 1; i++) {
                      if (!curelem || !curelem[path[i]]) return;
                      var uri = Array.isArray(curelem[path[i]]) && curelem[path[i]][0].data ? curelem[path[i]][0].data : curelem[path[i]];
                      curelem = getSync(veda.ticket, uri);
                    }
                    if (!curelem || !curelem[path[path.length - 1]]) return;
                    out_data0_el_arr = out_data0_el_arr.concat(curelem[path[path.length - 1]]);
                    out_data0_el[name] = out_data0_el_arr;
                  };
                }();
                var putFrontValue = function () {
                  return function (name) {
                    var out_data0_el_arr = out_data0_el[name];
                    if (!out_data0_el_arr) {
                      out_data0_el_arr = [];
                    }
                    if (iteratedObject[key2] == '@') {
                      out_data0_el_arr.unshift({
                        data: element,
                        type: 'Uri'
                      });
                    } else {
                      if (Array.isArray(element) === true) {
                        for (var key3 in element) {
                          if (Object.hasOwnProperty.call(element, key3)) {
                            out_data0_el_arr.unshift(element[key3]);
                          }
                        }
                      } else {
                        out_data0_el_arr.unshift(element);
                      }
                    }
                    out_data0_el[name] = out_data0_el_arr;
                  };
                }();
                var putElement = function () {
                  return function () {
                    var name = iteratedObject[key2];
                    if (name == '@') {
                      return;
                    }
                    var out_data0_el_arr = [];
                    out_data0_el_arr = out_data0_el[name];
                    if (!out_data0_el_arr) {
                      out_data0_el_arr = [];
                    }
                    if (Array.isArray(element) === true) {
                      for (var key3 in element) {
                        if (Object.hasOwnProperty.call(element, key3)) {
                          out_data0_el_arr.push(element[key3]);
                        }
                      }
                    } else {
                      out_data0_el_arr.push(element);
                    }
                    out_data0_el[name] = out_data0_el_arr;
                  };
                }();

                /* Segregate functions [BEGIN] */
                var contentName = function () {
                  return function (name) {
                    return iteratedObject[key2] == name;
                  };
                }();
                var elementContentStrValue = function () {
                  return function (name, value) {
                    if (iteratedObject[key2] !== name) {
                      return false;
                    }
                    var str = element[0].data;
                    return str == value;
                  };
                }();
                /* Segregate functions [END] */

                var getElement = function () {
                  return function () {
                    return element;
                  };
                }();

                // выполняем все rules
                for (var key3 in rules) {
                  if (Object.hasOwnProperty.call(rules, key3)) {
                    var rule = rules[key3];
                    // 1. v-wf:segregateObject
                    var segregateObject = rule['v-wf:segregateObject'];

                    // 2. v-wf:segregateElement
                    var segregateElement = rule['v-wf:segregateElement'];
                    var grouping = rule['v-wf:grouping'];
                    var res = undefined;
                    if (segregateObject) {
                      res = eval(segregateObject[0].data);
                      if (!res) {
                        continue;
                      }
                    }
                    if (segregateElement) {
                      res = eval(segregateElement[0].data);
                      if (!res) {
                        continue;
                      }
                    }

                    // 3. v-wf:aggregate
                    var group_key = void 0;
                    if (!grouping) {
                      out_data0_el = {};
                      out_data0_el['@'] = CommonUtil.genUri() + '-tr';
                    } else {
                      var useExistsUid = false;
                      for (var i in grouping) {
                        if (Object.hasOwnProperty.call(grouping, i)) {
                          var gk = grouping[i].data;
                          if (gk == '@') {
                            useExistsUid = true;
                          } else {
                            group_key = gk;
                          }
                        }
                      }
                      out_data0_el = out_data0[group_key];
                      if (!out_data0_el) {
                        out_data0_el = {};
                        if (useExistsUid) {
                          out_data0_el['@'] = _individual['@'];
                        } else {
                          out_data0_el['@'] = CommonUtil.genUri() + '-tr';
                        }
                      }
                    }
                    var agregate = rule['v-wf:aggregate'];
                    for (var i2 = 0; i2 < agregate.length; i2++) {
                      eval(agregate[i2].data);
                    }
                    if (!grouping) {
                      out_data0[out_data0_el['@']] = out_data0_el;
                    } else {
                      out_data0[group_key] = out_data0_el;
                    }
                  }
                }
              };
              for (var key2 = 0; key2 < iteratedObject.length; key2++) {
                _loop2(key2);
              }
            }
          };
          for (var key in individuals) {
            _loop();
          }
          var out_data = [];
          for (var _key in out_data0) {
            if (Object.hasOwnProperty.call(out_data0, _key)) {
              out_data.push(out_data0[_key]);
            }
          }
          return out_data;
        }).catch(function (error) {
          console.error('Transformation failed');
        });
      };
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJnZXRTeW5jIiwidGlja2V0IiwidXJpIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwic2VuZCIsInN0YXR1cyIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlVGV4dCIsIkVycm9yIiwic2V0dGVycyIsIl9jb21tb25WZWRhSnMiLCJ2ZWRhIiwiZGVmYXVsdCIsIl9jb21tb25JbmRpdmlkdWFsX21vZGVsSnMiLCJJbmRpdmlkdWFsTW9kZWwiLCJfY29tbW9uQmFja2VuZEpzIiwiQmFja2VuZCIsIl9icm93c2VyTm90aWZ5SnMiLCJub3RpZnkiLCJfY29tbW9uTGliUmlvdEpzIiwicmlvdCIsIl9jb21tb25VdGlsSnMiLCJDb21tb25VdGlsIiwiZXhlY3V0ZSIsIlV0aWwiLCJfZXhwb3J0IiwicmVnaXN0ZXJIYW5kbGVyIiwiaW5kaXZpZHVhbCIsImV2ZW50IiwidGVtcGxhdGUiLCJoYW5kbGVyIiwib24iLCJvbmUiLCJvZmYiLCJlc2NhcGU0JCIsInN0ciIsInJlcGxhY2UiLCJ0b1RUTCIsImluZGl2aWR1YWxMaXN0IiwiY2FsbGJhY2siLCJwcmVmaXhlcyIsInByZWZpeGVyIiwidmFsdWUiLCJwcmVmaXhlc0hhc2giLCJyZWdfdXJpIiwib250b2xvZ2llcyIsIm9udG9sb2d5IiwicmVzdWx0IiwiZXhlYyIsInByZWZpeCIsImV4cGFuZGVkIiwidG9TdHJpbmciLCJ0dGwiLCJtYXAiLCJpbmRpdmlkdWFsX3R0bCIsInByb3BlcnR5IiwicHJvcGVydGllcyIsIk9iamVjdCIsImhhc093blByb3BlcnR5IiwiY2FsbCIsInJlc291cmNlcyIsInZhbHVlcyIsInJlZHVjZSIsImFjYyIsInJlc291cmNlIiwidHlwZSIsImRhdGEiLCJfaW5zdGFuY2VvZiIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsInRlc3QiLCJsYW5nIiwidW5kZWZpbmVkIiwidG9Mb3dlckNhc2UiLCJsZW5ndGgiLCJqb2luIiwiZXhwb3J0VFRMIiwiX2NvbnRleHQiLCJpbXBvcnQiLCJ0aGVuIiwibW9kdWxlIiwic2F2ZUFzIiwiZXJyb3IiLCJibG9iIiwiQmxvYiIsImNyZWF0ZVJlcG9ydCIsInJlcG9ydCIsInBhcmFtcyIsIlN0cmluZyIsImphc3BlclNlcnZlckNmZyIsIlByb21pc2UiLCJhbGwiLCJsb2FkIiwibG9hZGVkIiwicmVwb3J0SW5kaXZpZHVhbCIsImphc3BlclNlcnZlckNmZ0luZGl2aWR1YWwiLCJqYXNwZXJTZXJ2ZXJBZGRyZXNzIiwiZm9ybSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImVuY29kZVVSSUNvbXBvbmVudCIsImlkIiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsImZvckVhY2giLCJrZXkiLCJoYXNWYWx1ZSIsImhpZGRlbkZpZWxkIiwiZ2V0IiwiaXRlbSIsImFwcGVuZENoaWxkIiwidHoiLCJnZXRUaW1lem9uZU9mZnNldCIsInR6RmllbGQiLCJib2R5Iiwid2luZG93Iiwic3VibWl0Iiwic2hvd1JpZ2h0cyIsIm1vZGFsVG1wbCIsIiQiLCJodG1sIiwibW9kYWwiLCJtb2RhbEJvZHkiLCJyZW1vdmUiLCJhcHBlbmQiLCJwcmVzZW50Iiwic2hvd01vZGFsIiwibW9kZSIsImhhc0NsYXNzIiwiY29udGFpbmVyIiwiZmluZCIsInJlc291cmNlVGVtcGxhdGUiLCJmaXJzdCIsImF0dHIiLCJ0ZW1wbGF0ZU1vZGUiLCJyb3V0ZSIsInNob3dTbWFsbE1vZGFsIiwiY29uZmlybSIsInJlc29sdmUiLCJyZWplY3QiLCJzdGFydFByb2Nlc3MiLCJwcm9jZXNzRGVmaW5pdGlvbiIsInN0YXJ0Rm9ybUNsYXNzIiwicHJvY2Vzc0RlZmluaXRpb25LZXkiLCJzdGFydEZvcm0iLCJjYXRjaCIsInRyYW5zZm9ybUlkIiwiX21vZGFsIiwic3RhcnRGb3JtVGVtcGxhdGUiLCJpc1N5bmMiLCJzYXZlIiwiZ2V0X2luZGl2aWR1YWwiLCJ0cmFuc2Zvcm0iLCJidWlsZFN0YXJ0Rm9ybUJ5VHJhbnNmb3JtYXRpb24iLCJzZW5kRXJyb3IiLCJuYW1lIiwiY29uc29sZSIsImNsb3Nlc3QiLCJzZW5kU3VjY2VzcyIsInRyYW5zZm9ybWF0aW9uIiwicHJvbWlzZXMiLCJsb2FkZWRJdGVtcyIsInRyYW5zZm9ybVJlc3VsdCIsImlzTmV3IiwiaW5pdCIsImluZGl2aWR1YWxzIiwiQXJyYXkiLCJpc0FycmF5IiwicnVsZXNVcmlzIiwicnVsZSIsImdldF9pbmRpdmlkdWFscyIsInJ1bGVzIiwib3V0X2RhdGEwIiwib3V0X2RhdGEwX2VsIiwicHV0RmllbGRPZk9iamVjdCIsImZpZWxkIiwib3V0X2RhdGEwX2VsX2FyciIsInB1c2giLCJwdXRVcmkiLCJzZXRVcmkiLCJwdXRTdHJpbmciLCJzZXRTdHJpbmciLCJzZXREYXRldGltZSIsInB1dERhdGV0aW1lIiwicHV0Qm9vbGVhbiIsInNldEJvb2xlYW4iLCJwdXRJbnRlZ2VyIiwic2V0SW50ZWdlciIsIl9sb29wIiwib2JqZWN0Q29udGVudFN0clZhbHVlIiwiaSIsIml0ZXJhdGVkT2JqZWN0Iiwia2V5cyIsIl9sb29wMiIsImtleTIiLCJlbGVtZW50IiwicHV0VmFsdWUiLCJrZXkzIiwicHV0VmFsdWVGcm9tIiwicGF0aCIsImVsZW1lbnRfdXJpIiwiZ2V0VXJpIiwiY3VyZWxlbSIsImNvbmNhdCIsInB1dEZyb250VmFsdWUiLCJ1bnNoaWZ0IiwicHV0RWxlbWVudCIsImNvbnRlbnROYW1lIiwiZWxlbWVudENvbnRlbnRTdHJWYWx1ZSIsImdldEVsZW1lbnQiLCJzZWdyZWdhdGVPYmplY3QiLCJzZWdyZWdhdGVFbGVtZW50IiwiZ3JvdXBpbmciLCJyZXMiLCJldmFsIiwiZ3JvdXBfa2V5IiwiZ2VuVXJpIiwidXNlRXhpc3RzVWlkIiwiZ2siLCJhZ3JlZ2F0ZSIsImkyIiwib3V0X2RhdGEiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zb3VyY2Utd2ViL2pzL2Jyb3dzZXIvdXRpbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBVdGlsaXRpZXNcblxuaW1wb3J0IHZlZGEgZnJvbSAnLi4vY29tbW9uL3ZlZGEuanMnO1xuaW1wb3J0IEluZGl2aWR1YWxNb2RlbCBmcm9tICcuLi9jb21tb24vaW5kaXZpZHVhbF9tb2RlbC5qcyc7XG5pbXBvcnQgQmFja2VuZCBmcm9tICcuLi9jb21tb24vYmFja2VuZC5qcyc7XG5pbXBvcnQgbm90aWZ5IGZyb20gJy4uL2Jyb3dzZXIvbm90aWZ5LmpzJztcbmltcG9ydCByaW90IGZyb20gJy4uL2NvbW1vbi9saWIvcmlvdC5qcyc7XG5pbXBvcnQgQ29tbW9uVXRpbCBmcm9tICcuLi9jb21tb24vdXRpbC5qcyc7XG5cbmNvbnN0IFV0aWwgPSB7fTtcblxuZXhwb3J0IGRlZmF1bHQgVXRpbDtcblxuVXRpbC5yZWdpc3RlckhhbmRsZXIgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgZXZlbnQsIHRlbXBsYXRlLCBoYW5kbGVyKSB7XG4gIGluZGl2aWR1YWwub24oZXZlbnQsIGhhbmRsZXIpO1xuICB0ZW1wbGF0ZS5vbmUoJ3JlbW92ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBpbmRpdmlkdWFsLm9mZihldmVudCwgaGFuZGxlcik7XG4gIH0pO1xufTtcblxuLy8gRXNjYXBlIGZ1bmN0aW9uIGZvciBjc3MgKGpRdWVyeSkgc2VsZWN0b3JzXG5VdGlsLmVzY2FwZTQkID0gZnVuY3Rpb24gKHN0cikge1xuICBpZiAoc3RyKSByZXR1cm4gc3RyLnJlcGxhY2UoLyhbICM7PyUmLC4rKn5cXCc6XCIhXiRbXFxdKCk9PnxcXC9AXSkvZywgJ1xcXFwkMScpO1xuICByZXR1cm4gc3RyO1xufTtcblxuVXRpbC50b1RUTCA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsTGlzdCwgY2FsbGJhY2spIHtcbiAgY29uc3QgcHJlZml4ZXMgPSB7fTtcblxuICBjb25zdCBwcmVmaXhlciA9IGZ1bmN0aW9uICh2YWx1ZSwgcHJlZml4ZXNIYXNoKSB7XG4gICAgY29uc3QgcmVnX3VyaSA9IC9eKFthLXotMC05XSs6KVthLXpBLVowLTktX10qJC87XG4gICAgY29uc3Qgb250b2xvZ2llcyA9IHZlZGEub250b2xvZ3kub250b2xvZ2llcztcbiAgICBjb25zdCByZXN1bHQgPSByZWdfdXJpLmV4ZWModmFsdWUpO1xuICAgIGNvbnN0IHByZWZpeCA9IHJlc3VsdCA/IHJlc3VsdFsxXSA6IG51bGw7XG4gICAgbGV0IGV4cGFuZGVkO1xuICAgIGlmIChwcmVmaXggPT09ICdkYycpIHtcbiAgICAgIGV4cGFuZGVkID0gJ2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJztcbiAgICB9IGVsc2UgaWYgKHByZWZpeCA9PT0gJ2dyZGRsJykge1xuICAgICAgZXhwYW5kZWQgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMy9nL2RhdGEtdmlldyMnO1xuICAgIH0gZWxzZSBpZiAob250b2xvZ2llc1twcmVmaXhdKSB7XG4gICAgICBleHBhbmRlZCA9IG9udG9sb2dpZXNbcHJlZml4XVsndi1zOmZ1bGxVcmwnXVswXS50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAoZXhwYW5kZWQpIHtcbiAgICAgIHByZWZpeGVzSGFzaFtwcmVmaXhdID0gZXhwYW5kZWQ7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnPCcgKyB2YWx1ZSArICc+JztcbiAgICB9XG4gIH07XG5cbiAgbGV0IHR0bCA9IGluZGl2aWR1YWxMaXN0Lm1hcCgoaW5kaXZpZHVhbCkgPT4ge1xuICAgIGxldCBpbmRpdmlkdWFsX3R0bCA9ICcnO1xuICAgIGZvciAoIGNvbnN0IHByb3BlcnR5IGluIGluZGl2aWR1YWwucHJvcGVydGllcyApIHtcbiAgICAgIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChpbmRpdmlkdWFsLnByb3BlcnRpZXMsIHByb3BlcnR5KSkge1xuICAgICAgICBjb25zdCByZXNvdXJjZXMgPSBpbmRpdmlkdWFsLnByb3BlcnRpZXNbcHJvcGVydHldO1xuICAgICAgICBpZiAocHJvcGVydHkgPT09ICdAJykge1xuICAgICAgICAgIGluZGl2aWR1YWxfdHRsID0gcmVzb3VyY2VzICsgJ1xcbicgKyBpbmRpdmlkdWFsX3R0bDtcbiAgICAgICAgICBwcmVmaXhlcihyZXNvdXJjZXMsIHByZWZpeGVzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCB2YWx1ZXMgPSByZXNvdXJjZXMucmVkdWNlKChhY2MsIHJlc291cmNlKSA9PiB7XG4gICAgICAgICAgICBsZXQgdmFsdWU7XG4gICAgICAgICAgICBzd2l0Y2ggKHJlc291cmNlLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0Jvb2xlYW4nOlxuICAgICAgICAgICAgY2FzZSAnSW50ZWdlcic6XG4gICAgICAgICAgICBjYXNlICdEZWNpbWFsJzpcbiAgICAgICAgICAgICAgdmFsdWUgPSByZXNvdXJjZS5kYXRhO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ1VyaSc6XG4gICAgICAgICAgICAgIHZhbHVlID0gcHJlZml4ZXIocmVzb3VyY2UuZGF0YSwgcHJlZml4ZXMpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0RhdGV0aW1lJzpcbiAgICAgICAgICAgICAgaWYgKHJlc291cmNlLmRhdGEgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSAnXCInICsgcmVzb3VyY2UuZGF0YS50b0lTT1N0cmluZygpICsgJ1wiXl54c2Q6ZGF0ZVRpbWUnO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gJ1wiJyArIHJlc291cmNlLmRhdGEgKyAnXCJeXnhzZDpkYXRlVGltZSc7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcHJlZml4ZXIoJ3hzZDonLCBwcmVmaXhlcyk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnU3RyaW5nJzpcbiAgICAgICAgICAgICAgaWYgKC8oW1wiXFxuXSkvLnRlc3QocmVzb3VyY2UuZGF0YSkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9ICdcIlwiXCInICsgcmVzb3VyY2UuZGF0YSArICdcIlwiXCInO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gJ1wiJyArIHJlc291cmNlLmRhdGEgKyAnXCInO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChyZXNvdXJjZS5sYW5nICE9PSB1bmRlZmluZWQgJiYgcmVzb3VyY2UubGFuZyAhPT0gJ05PTkUnKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgKz0gJ0AnICsgcmVzb3VyY2UubGFuZy50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFjYy5sZW5ndGggPyBhY2MgKyAnLCAnICsgdmFsdWUgOiB2YWx1ZTtcbiAgICAgICAgICB9LCAnJyk7XG4gICAgICAgICAgaW5kaXZpZHVhbF90dGwgKz0gJyAgJyArIHByb3BlcnR5ICsgJyAnICsgdmFsdWVzICsgJyA7XFxuJztcbiAgICAgICAgICBwcmVmaXhlcihwcm9wZXJ0eSwgcHJlZml4ZXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpbmRpdmlkdWFsX3R0bCArICcuXFxuJztcbiAgfSkuam9pbignXFxuJyk7XG5cbiAgdHRsID0gJ1xcbicgKyB0dGw7XG5cbiAgZm9yICggY29uc3QgcHJlZml4IGluIHByZWZpeGVzICkge1xuICAgIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChwcmVmaXhlcywgcHJlZml4KSkge1xuICAgICAgdHRsID0gWydAcHJlZml4JywgcHJlZml4LCAnPCcgKyBwcmVmaXhlc1twcmVmaXhdICsgJz4nXS5qb2luKCcgJykgKyAnLlxcbicgKyB0dGw7XG4gICAgfVxuICB9XG5cbiAgY2FsbGJhY2sodW5kZWZpbmVkLCB0dGwpO1xufTtcblxuVXRpbC5leHBvcnRUVEwgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbExpc3QpIHtcbiAgaW1wb3J0KCdmaWxlc2F2ZXInKS50aGVuKChtb2R1bGUpID0+IHtcbiAgICBjb25zdCBzYXZlQXMgPSBtb2R1bGUuZGVmYXVsdDtcbiAgICBVdGlsLnRvVFRMKGluZGl2aWR1YWxMaXN0LCBmdW5jdGlvbiAoZXJyb3IsIHJlc3VsdCkge1xuICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtyZXN1bHRdLCB7dHlwZTogJ3RleHQvcGxhaW47Y2hhcnNldD11dGYtOCd9KTtcbiAgICAgIHNhdmVBcyhibG9iLCAnZXhwb3J0ZWRfZ3JhcGgudHRsJyk7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgc3BlY2lmaWVkIHJlcG9ydFxuICogQHBhcmFtIHtzdHJpbmd9IHJlcG9ydCAtIHVyaSBvZiByZXBvcnQgdG8gY3JlYXRlXG4gKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIC0gcGFyYW1ldGVycyB0byBwYXNzIHRvIHJlcG9ydFxuICovXG5VdGlsLmNyZWF0ZVJlcG9ydCA9IGZ1bmN0aW9uIChyZXBvcnQsIHBhcmFtcykge1xuICBpZiAodHlwZW9mIHJlcG9ydCA9PT0gJ3N0cmluZycgfHwgcmVwb3J0IGluc3RhbmNlb2YgU3RyaW5nKSB7XG4gICAgcmVwb3J0ID0gbmV3IEluZGl2aWR1YWxNb2RlbChyZXBvcnQpO1xuICB9XG4gIGNvbnN0IGphc3BlclNlcnZlckNmZyA9IG5ldyBJbmRpdmlkdWFsTW9kZWwoJ2NmZzpqYXNwZXJTZXJ2ZXJBZGRyZXNzJyk7XG4gIFByb21pc2UuYWxsKFtyZXBvcnQubG9hZCgpLCBqYXNwZXJTZXJ2ZXJDZmcubG9hZCgpXSkudGhlbigobG9hZGVkKSA9PiB7XG4gICAgY29uc3QgcmVwb3J0SW5kaXZpZHVhbCA9IGxvYWRlZFswXTtcbiAgICBjb25zdCBqYXNwZXJTZXJ2ZXJDZmdJbmRpdmlkdWFsID0gbG9hZGVkWzFdO1xuICAgIGNvbnN0IGphc3BlclNlcnZlckFkZHJlc3MgPSBqYXNwZXJTZXJ2ZXJDZmdJbmRpdmlkdWFsWydyZGY6dmFsdWUnXVswXTtcblxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgZm9ybS5zZXRBdHRyaWJ1dGUoJ21ldGhvZCcsICdwb3N0Jyk7XG4gICAgZm9ybS5zZXRBdHRyaWJ1dGUoJ2FjdGlvbicsIGphc3BlclNlcnZlckFkZHJlc3MgKyAnZmxvdy5odG1sP19mbG93SWQ9dmlld1JlcG9ydEZsb3cmcmVwb3J0VW5pdD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHJlcG9ydEluZGl2aWR1YWxbJ3YtczpyZXBvcnRQYXRoJ11bMF0pICsgJyZvdXRwdXQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChyZXBvcnRJbmRpdmlkdWFsWyd2LXM6cmVwb3J0Rm9ybWF0J11bMF0pICsgJyZkb2N1bWVudElkPScgKyBlbmNvZGVVUklDb21wb25lbnQocGFyYW1zLmlkKSArICcmdGlja2V0PScgKyB2ZWRhLnRpY2tldCk7XG4gICAgZm9ybS5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsICdSZXBvcnQnKTtcblxuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHBhcmFtcy5wcm9wZXJ0aWVzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmICgga2V5ICE9PSAnQCcgJiYgcGFyYW1zLmhhc1ZhbHVlKGtleSkgKSB7XG4gICAgICAgIGNvbnN0IGhpZGRlbkZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgaGlkZGVuRmllbGQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2hpZGRlbicpO1xuICAgICAgICBoaWRkZW5GaWVsZC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCBrZXkucmVwbGFjZSgnOicsICdfJykucmVwbGFjZSgnLScsICdfJykpO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHBhcmFtcy5nZXQoa2V5KS5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICBpZiAoaXRlbSBpbnN0YW5jZW9mIEluZGl2aWR1YWxNb2RlbCkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uaWQ7XG4gICAgICAgICAgfSBlbHNlIGlmIChpdGVtIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0udG9JU09TdHJpbmcoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgfVxuICAgICAgICB9KS5qb2luKCcsJyk7XG4gICAgICAgIGhpZGRlbkZpZWxkLnNldEF0dHJpYnV0ZSgndmFsdWUnLCB2YWx1ZSk7XG4gICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQoaGlkZGVuRmllbGQpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIFNldCBjbGllbnQgdGltZXpvbmUgcGFyYW1ldGVyXG4gICAgY29uc3QgdHogPSAobmV3IERhdGUoKSkuZ2V0VGltZXpvbmVPZmZzZXQoKTtcbiAgICBjb25zdCB0ekZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICB0ekZpZWxkLnNldEF0dHJpYnV0ZSgndHlwZScsICdoaWRkZW4nKTtcbiAgICB0ekZpZWxkLnNldEF0dHJpYnV0ZSgnbmFtZScsICd0aW1lem9uZScpO1xuICAgIHR6RmllbGQuc2V0QXR0cmlidXRlKCd2YWx1ZScsIHR6KTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKHR6RmllbGQpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZm9ybSk7XG4gICAgd2luZG93Lm9wZW4oJycsICdSZXBvcnQnKTtcbiAgICBmb3JtLnN1Ym1pdCgpO1xuICB9KTtcbn07XG5cbi8qKlxuICogU2hvdyB1c2VyJ3MgcmlnaHRzIGZvciBpbmRpdmlkdWFsXG4gKiBAcGFyYW0ge0luZGl2aWR1YWxNb2RlbH0gaW5kaXZpZHVhbCAtIGF1dGhvcml6YXRpb24gc3ViamVjdFxuICovXG5VdGlsLnNob3dSaWdodHMgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCkge1xuICBjb25zdCBtb2RhbFRtcGwgPSAkKCcjaW5kaXZpZHVhbC1tb2RhbC10ZW1wbGF0ZScpLmh0bWwoKTtcbiAgY29uc3QgbW9kYWwgPSAkKG1vZGFsVG1wbCk7XG4gIGNvbnN0IG1vZGFsQm9keSA9ICQoJy5tb2RhbC1ib2R5JywgbW9kYWwpO1xuICBtb2RhbC5tb2RhbCgpO1xuICBtb2RhbC5vbignaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24gKCkge1xuICAgIG1vZGFsLnJlbW92ZSgpO1xuICB9KTtcbiAgJCgnYm9keScpLmFwcGVuZChtb2RhbCk7XG4gIGluZGl2aWR1YWwucHJlc2VudChtb2RhbEJvZHksICd2LXVpOlBlcm1pc3Npb25zVGVtcGxhdGUnKTtcbn07XG5cblV0aWwuc2hvd01vZGFsID0gZnVuY3Rpb24gKGluZGl2aWR1YWwsIHRlbXBsYXRlLCBtb2RlKSB7XG4gIGlmICggJCgnYm9keScpLmhhc0NsYXNzKCdtb2RhbC1vcGVuJykpIHtcbiAgICAkKCcubW9kYWwnKS5tb2RhbCgnaGlkZScpLnJlbW92ZSgpO1xuICB9XG4gIGNvbnN0IG1vZGFsID0gJCggJCgnI25vdGlmaWNhdGlvbi1tb2RhbC10ZW1wbGF0ZScpLmh0bWwoKSApO1xuICBtb2RhbC5tb2RhbCgpO1xuICAkKCdib2R5JykuYXBwZW5kKG1vZGFsKTtcbiAgY29uc3QgY29udGFpbmVyID0gJCgnLm1vZGFsLWJvZHknLCBtb2RhbCk7XG4gIGlmICh0eXBlb2YgaW5kaXZpZHVhbCA9PT0gJ3N0cmluZycpIHtcbiAgICBpbmRpdmlkdWFsID0gbmV3IEluZGl2aWR1YWxNb2RlbChpbmRpdmlkdWFsKTtcbiAgfVxuICBpbmRpdmlkdWFsLnByZXNlbnQoY29udGFpbmVyLCB0ZW1wbGF0ZSwgbW9kZSk7XG4gIG1vZGFsLmZpbmQoJyNmb2xsb3cnKS5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc3QgcmVzb3VyY2VUZW1wbGF0ZSA9IG1vZGFsLmZpbmQoJ1tyZXNvdXJjZV0nKS5maXJzdCgpO1xuICAgIGNvbnN0IHVyaSA9IHJlc291cmNlVGVtcGxhdGUuYXR0cigncmVzb3VyY2UnKTtcbiAgICBjb25zdCB0ZW1wbGF0ZU1vZGUgPSByZXNvdXJjZVRlbXBsYXRlLmF0dHIoJ2RhdGEtbW9kZScpO1xuICAgIG1vZGFsLm1vZGFsKCdoaWRlJyk7XG4gICAgcmlvdC5yb3V0ZSggWycjJywgdXJpLCAnI21haW4nLCB1bmRlZmluZWQsIHRlbXBsYXRlTW9kZV0uam9pbignLycpICk7XG4gIH0pO1xuICAkKCcuYWN0aW9uI2NhbmNlbCcsIG1vZGFsKS5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgbW9kYWwubW9kYWwoJ2hpZGUnKTtcbiAgfSk7XG4gIG1vZGFsLm9uKCdoaWRkZW4uYnMubW9kYWwnLCBmdW5jdGlvbiAoKSB7XG4gICAgbW9kYWwucmVtb3ZlKCk7XG4gIH0pO1xuICByZXR1cm4gbW9kYWw7XG59O1xuXG5VdGlsLnNob3dTbWFsbE1vZGFsID0gZnVuY3Rpb24gKGluZGl2aWR1YWwsIHRlbXBsYXRlLCBtb2RlKSB7XG4gIGNvbnN0IG1vZGFsID0gJCggJCgnI21pbmltYWwtbW9kYWwtdGVtcGxhdGUnKS5odG1sKCkgKTtcbiAgbW9kYWwubW9kYWwoKTtcbiAgJCgnYm9keScpLmFwcGVuZChtb2RhbCk7XG4gIGNvbnN0IGNvbnRhaW5lciA9ICQoJy5tb2RhbC1ib2R5JywgbW9kYWwpO1xuICBpbmRpdmlkdWFsLnByZXNlbnQoY29udGFpbmVyLCB0ZW1wbGF0ZSwgbW9kZSk7XG4gICQoJy5hY3Rpb24jY2FuY2VsJywgbW9kYWwpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICBtb2RhbC5tb2RhbCgnaGlkZScpO1xuICB9KTtcbiAgbW9kYWwub24oJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uICgpIHtcbiAgICBtb2RhbC5yZW1vdmUoKTtcbiAgfSk7XG4gIHJldHVybiBtb2RhbDtcbn07XG5cblV0aWwuY29uZmlybSA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgbW9kZSkge1xuICBjb25zdCBtb2RhbCA9ICQoICQoJyNjb25maXJtLW1vZGFsLXRlbXBsYXRlJykuaHRtbCgpICk7XG4gIG1vZGFsLm1vZGFsKCk7XG4gIG1vZGFsLm9uKCdoaWRkZW4uYnMubW9kYWwnLCBmdW5jdGlvbiAoKSB7XG4gICAgbW9kYWwucmVtb3ZlKCk7XG4gIH0pO1xuICAkKCdib2R5JykuYXBwZW5kKG1vZGFsKTtcbiAgY29uc3QgY29udGFpbmVyID0gJCgnLm1vZGFsLWJvZHknLCBtb2RhbCk7XG4gIHJldHVybiBpbmRpdmlkdWFsLnByZXNlbnQoY29udGFpbmVyLCB0ZW1wbGF0ZSwgbW9kZSkudGhlbigoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICQoJy5tb2RhbC1mb290ZXIgPiAub2snLCBtb2RhbCkub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgfSk7XG4gICAgICAkKCcubW9kYWwtZm9vdGVyID4gLmNhbmNlbCcsIG1vZGFsKS5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBTdGFydCBCUE1OIHByb2Nlc3NcbiAqIEBwYXJhbSB7U3RyaW5nfSBwcm9jZXNzRGVmaW5pdGlvblxuICogQHBhcmFtIHtJbmRpdmlkdWFsTW9kZWx9IGRvY3VtZW50XG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5VdGlsLnN0YXJ0UHJvY2VzcyA9IGZ1bmN0aW9uIChwcm9jZXNzRGVmaW5pdGlvbiwgZG9jdW1lbnQpIHtcbiAgcmV0dXJuIHByb2Nlc3NEZWZpbml0aW9uLmxvYWQoKVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIGNvbnN0IHN0YXJ0Rm9ybUNsYXNzID0gcHJvY2Vzc0RlZmluaXRpb25bJ2JwbW46aGFzU3RhcnRGb3JtQ2xhc3MnXVswXTtcbiAgICAgIGlmICghc3RhcnRGb3JtQ2xhc3MpIHRocm93IEVycm9yKCdzdGFydCBmb3JtIGNsYXNzIGlzIG5vdCBkZWZpbmVkJyk7XG4gICAgICBjb25zdCBwcm9jZXNzRGVmaW5pdGlvbktleSA9IHByb2Nlc3NEZWZpbml0aW9uWydicG1uOnByb2Nlc3NEZWZpbml0aW9uS2V5J11bMF07XG4gICAgICBpZiAoIXByb2Nlc3NEZWZpbml0aW9uS2V5KSB0aHJvdyBFcnJvcigncHJvY2Vzc0RlZmluaXRpb25LZXkgaXMgbm90IGRlZmluZWQnKTtcbiAgICAgIGNvbnN0IHN0YXJ0Rm9ybSA9IG5ldyB2ZWRhLkluZGl2aWR1YWxNb2RlbCgpO1xuICAgICAgc3RhcnRGb3JtWydyZGY6dHlwZSddID0gc3RhcnRGb3JtQ2xhc3M7XG4gICAgICBzdGFydEZvcm1bJ2JwbW46aGFzU3RhdHVzJ10gPSAnYnBtbjpUb0JlU3RhcnRlZCc7XG4gICAgICBzdGFydEZvcm1bJ2JwbW46cHJvY2Vzc0RlZmluaXRpb25LZXknXSA9IHByb2Nlc3NEZWZpbml0aW9uS2V5O1xuICAgICAgaWYgKGRvY3VtZW50KSBzdGFydEZvcm1bJ2JwbW46aGFzRG9jdW1lbnQnXSA9IGRvY3VtZW50O1xuICAgICAgcmV0dXJuIFV0aWwuc2hvd01vZGFsKHN0YXJ0Rm9ybSwgdW5kZWZpbmVkLCAnZWRpdCcpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgbm90aWZ5KCdkYW5nZXInLCBlcnJvcik7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9KTtcbn07XG5cbi8qKlxuICogU3RhcnQgd29ya2Zsb3cgcHJvY2Vzc1xuICogICAtIEFwcGx5IHRyYW5zZm9ybWF0aW9uIGFuZCByZWRpcmVjdCB0byBzdGFydCBmb3JtLlxuICogQHBhcmFtIHtJbmRpdmlkdWFsTW9kZWx9IGluZGl2aWR1YWxcbiAqIEBwYXJhbSB7dGVtcGxhdGV9IHRlbXBsYXRlIC0gcmVmZXJlbmNlIHRvIGluZGl2aWR1YWwgdmlldyB3aGVyZSAnc2VuZCcgd2FzIGludm9rZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSB0cmFuc2Zvcm1JZCAtIGlkIG9mIGEgdHJhbnNmb3JtYXRpb24gZm9yIHN0YXJ0IGZvcm1cbiAqIEBwYXJhbSB7c3RyaW5nfSBfbW9kYWwgLSBvYnNvbGV0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0YXJ0Rm9ybVRlbXBsYXRlIC0gaWQgb2YgYSBzdGFydCBmb3JtIHRlbXBsYXRlXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5VdGlsLnNlbmQgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIHRyYW5zZm9ybUlkLCBfbW9kYWwsIHN0YXJ0Rm9ybVRlbXBsYXRlKSB7XG4gIGlmICggdHJhbnNmb3JtSWQgKSB7XG4gICAgcmV0dXJuICghaW5kaXZpZHVhbC5pc1N5bmMoKSA/IHRlbXBsYXRlWzBdLnZlZGEuc2F2ZSgpIDogQmFja2VuZC5nZXRfaW5kaXZpZHVhbCh2ZWRhLnRpY2tldCwgaW5kaXZpZHVhbC5pZCkuY2F0Y2goKCkgPT4gdGVtcGxhdGVbMF0udmVkYS5zYXZlKCkpKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBjb25zdCB0cmFuc2Zvcm0gPSBuZXcgSW5kaXZpZHVhbE1vZGVsKHRyYW5zZm9ybUlkKTtcbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybS5sb2FkKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIFV0aWwuYnVpbGRTdGFydEZvcm1CeVRyYW5zZm9ybWF0aW9uKGluZGl2aWR1YWwsIHRyYW5zZm9ybSkudGhlbigoc3RhcnRGb3JtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gVXRpbC5zaG93TW9kYWwoc3RhcnRGb3JtLCBzdGFydEZvcm1UZW1wbGF0ZSwgJ2VkaXQnKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zdCBzZW5kRXJyb3IgPSBuZXcgSW5kaXZpZHVhbE1vZGVsKCd2LXM6U2VuZEVycm9yJyk7XG4gICAgICAgIHNlbmRFcnJvci5sb2FkKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgbm90aWZ5KCdkYW5nZXInLCB7bmFtZTogc2VuZEVycm9yLnRvU3RyaW5nKCl9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1NhdmUgYmVmb3JlIHNlbmQgZmFpbGVkJyk7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgaW5kaXZpZHVhbFsndi13ZjpoYXNTdGF0dXNXb3JrZmxvdyddID0gW25ldyBJbmRpdmlkdWFsTW9kZWwoJ3Ytd2Y6VG9CZVNlbnQnKV07XG4gICAgcmV0dXJuIHRlbXBsYXRlWzBdLnZlZGEuc2F2ZSgpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRlbXBsYXRlLmNsb3Nlc3QoJy5tb2RhbCcpLm1vZGFsKCdoaWRlJykucmVtb3ZlKCk7XG4gICAgICAgIGNvbnN0IHNlbmRTdWNjZXNzID0gbmV3IEluZGl2aWR1YWxNb2RlbCgndi1zOlNlbmRTdWNjZXNzJyk7XG4gICAgICAgIHNlbmRTdWNjZXNzLmxvYWQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICBub3RpZnkoJ3N1Y2Nlc3MnLCB7bmFtZTogc2VuZFN1Y2Nlc3MudG9TdHJpbmcoKX0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnN0IHNlbmRFcnJvciA9IG5ldyBJbmRpdmlkdWFsTW9kZWwoJ3YtczpTZW5kRXJyb3InKTtcbiAgICAgICAgc2VuZEVycm9yLmxvYWQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICBub3RpZnkoJ2RhbmdlcicsIHtuYW1lOiBzZW5kRXJyb3IudG9TdHJpbmcoKX0pO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5lcnJvcignU2VuZCBmYWlsZWQnKTtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9KTtcbiAgfVxufTtcblxuLyoqXG4gKiBCdWlsZCBzdGFydCBmb3JtIHVzaW5nIHRyYW5zZm9ybWF0aW9uXG4gKiBAcGFyYW0ge0luZGl2aWR1YWxNb2RlbH0gaW5kaXZpZHVhbCAtIGluZGl2aWR1YWwgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge0luZGl2aWR1YWxNb2RlbH0gdHJhbnNmb3JtYXRpb24gLSB0cmFuc2Zvcm1hdGlvbiBpbmRpdmlkdWFsXG4gKiBAcmV0dXJuIHtJbmRpdmlkdWFsTW9kZWx9IC0gc3RhcnQgZm9ybVxuICovXG5VdGlsLmJ1aWxkU3RhcnRGb3JtQnlUcmFuc2Zvcm1hdGlvbiA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0cmFuc2Zvcm1hdGlvbikge1xuICBjb25zdCBwcm9taXNlcyA9IFtpbmRpdmlkdWFsLmxvYWQoKSwgdHJhbnNmb3JtYXRpb24ubG9hZCgpXTtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKChsb2FkZWRJdGVtcykgPT4ge1xuICAgIHJldHVybiBVdGlsLnRyYW5zZm9ybWF0aW9uKGxvYWRlZEl0ZW1zWzBdLnByb3BlcnRpZXMsIGxvYWRlZEl0ZW1zWzFdLnByb3BlcnRpZXMpO1xuICB9KS50aGVuKCh0cmFuc2Zvcm1SZXN1bHQpID0+IHtcbiAgICBjb25zdCBzdGFydEZvcm0gPSBuZXcgSW5kaXZpZHVhbE1vZGVsKHRyYW5zZm9ybVJlc3VsdFswXSk7XG4gICAgc3RhcnRGb3JtLmlzTmV3KHRydWUpO1xuICAgIHN0YXJ0Rm9ybS5pc1N5bmMoZmFsc2UpO1xuICAgIHJldHVybiBzdGFydEZvcm0uaW5pdCgpO1xuICB9KTtcbn07XG5cbi8qKlxuICogU3luY2hyb25vdXMgZ2V0IGluZGl2aWR1YWxcbiAqIEBwYXJhbSB7c3RyaW5nfSB0aWNrZXRcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmlcbiAqIEByZXR1cm4ge09iamVjdH0gLSBpbmRpdmlkdWFsIHByb3BlcnRpZXMgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGdldFN5bmMgKHRpY2tldCwgdXJpKSB7XG4gIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICB4aHIub3BlbignR0VUJywgJ2dldF9pbmRpdmlkdWFsP3VyaT0nICsgdXJpICsgJyZ0aWNrZXQ9JyArIHRpY2tldCwgZmFsc2UpO1xuICB4aHIuc2VuZCgpO1xuICBpZiAoeGhyLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgRXJyb3IoeGhyLnN0YXR1cyk7XG4gIH1cbn1cblxuLyoqXG4gKiDQotGA0LDQvdGB0YTQvtGA0LzQuNGA0L7QstCw0YLRjCDRg9C60LDQt9Cw0L3QvdGL0LUg0LjQvdC00LjQstC40LTRg9Cw0LvRiyDQv9C+INC30LDQtNCw0L3QvdGL0Lwg0L/RgNCw0LLQuNC70LDQvFxuICogQHBhcmFtIHtzdHJpbmd8SW5kaXZpZHVhbE1vZGVsfSBpbmRpdmlkdWFscyAtINC+0LTQuNC9INC40LvQuCDQvdC10YHQutC+0LvRjNC60L4gSW5kaXZpZHVhbE1vZGVsINC40LvQuCDQuNGFINC40LTQtdC90YLQuNGE0LjQutCw0YLQvtGA0L7QslxuICogQHBhcmFtIHtzdHJpbmd8SW5kaXZpZHVhbE1vZGVsfSB0cmFuc2Zvcm0gLSDQv9GA0LjQvNC10L3Rj9C10LzQsNGPINGC0YDQsNC90YHRhNC+0YDQvNCw0YbQuNGPXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqL1xuVXRpbC50cmFuc2Zvcm1hdGlvbiA9IGZ1bmN0aW9uIChpbmRpdmlkdWFscywgdHJhbnNmb3JtKSB7XG4gIGlmICggIUFycmF5LmlzQXJyYXkoaW5kaXZpZHVhbHMpICkge1xuICAgIGluZGl2aWR1YWxzID0gW2luZGl2aWR1YWxzXTtcbiAgfVxuXG4gIGNvbnN0IHJ1bGVzVXJpcyA9IHRyYW5zZm9ybVsndi13Zjp0cmFuc2Zvcm1SdWxlJ10ubWFwKChydWxlKSA9PiBydWxlLmRhdGEpO1xuXG4gIGlmICghcnVsZXNVcmlzLmxlbmd0aCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIHJldHVybiBCYWNrZW5kLmdldF9pbmRpdmlkdWFscyh2ZWRhLnRpY2tldCwgcnVsZXNVcmlzKS50aGVuKChydWxlcykgPT4ge1xuICAgIGNvbnN0IG91dF9kYXRhMCA9IHt9O1xuXG4gICAgbGV0IG91dF9kYXRhMF9lbCA9IHt9O1xuXG4gICAgLyogUFVUIGZ1bmN0aW9ucyBbQkVHSU5dICovXG5cbiAgICBjb25zdCBwdXRGaWVsZE9mT2JqZWN0ID0gKCgpID0+IHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAobmFtZSwgZmllbGQpIHtcbiAgICAgICAgbGV0IG91dF9kYXRhMF9lbF9hcnI7XG5cbiAgICAgICAgb3V0X2RhdGEwX2VsX2FyciA9IG91dF9kYXRhMF9lbFtuYW1lXTtcblxuICAgICAgICBpZiAoIW91dF9kYXRhMF9lbF9hcnIpIHtcbiAgICAgICAgICBvdXRfZGF0YTBfZWxfYXJyID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBvdXRfZGF0YTBfZWxfYXJyLnB1c2goaW5kaXZpZHVhbFtmaWVsZF0pO1xuXG4gICAgICAgIG91dF9kYXRhMF9lbFtuYW1lXSA9IG91dF9kYXRhMF9lbF9hcnI7XG4gICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCBwdXRVcmkgPSAoKCkgPT4ge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuICAgICAgICBsZXQgb3V0X2RhdGEwX2VsX2FycjtcblxuICAgICAgICBvdXRfZGF0YTBfZWxfYXJyID0gb3V0X2RhdGEwX2VsW25hbWVdO1xuXG4gICAgICAgIGlmICghb3V0X2RhdGEwX2VsX2Fycikge1xuICAgICAgICAgIG91dF9kYXRhMF9lbF9hcnIgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIG91dF9kYXRhMF9lbF9hcnIucHVzaChcbiAgICAgICAgICB7XG4gICAgICAgICAgICBkYXRhOiB2YWx1ZSxcbiAgICAgICAgICAgIHR5cGU6ICdVcmknLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIG91dF9kYXRhMF9lbFtuYW1lXSA9IG91dF9kYXRhMF9lbF9hcnI7XG4gICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCBzZXRVcmkgPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcbiAgICAgIG91dF9kYXRhMF9lbFtuYW1lXSA9IFtcbiAgICAgICAge1xuICAgICAgICAgIGRhdGE6IHZhbHVlLFxuICAgICAgICAgIHR5cGU6ICdVcmknLFxuICAgICAgICB9XTtcbiAgICB9O1xuXG4gICAgY29uc3QgcHV0U3RyaW5nID0gKCgpID0+IHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcbiAgICAgICAgbGV0IG91dF9kYXRhMF9lbF9hcnI7XG5cbiAgICAgICAgb3V0X2RhdGEwX2VsX2FyciA9IG91dF9kYXRhMF9lbFtuYW1lXTtcblxuICAgICAgICBpZiAoIW91dF9kYXRhMF9lbF9hcnIpIHtcbiAgICAgICAgICBvdXRfZGF0YTBfZWxfYXJyID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBvdXRfZGF0YTBfZWxfYXJyLnB1c2goXG4gICAgICAgICAge1xuICAgICAgICAgICAgZGF0YTogdmFsdWUsXG4gICAgICAgICAgICB0eXBlOiAnU3RyaW5nJyxcbiAgICAgICAgICB9KTtcblxuICAgICAgICBvdXRfZGF0YTBfZWxbbmFtZV0gPSBvdXRfZGF0YTBfZWxfYXJyO1xuICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3Qgc2V0U3RyaW5nID0gKCgpID0+IHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcbiAgICAgICAgY29uc3Qgb3V0X2RhdGEwX2VsX2FyciA9IFtdO1xuXG4gICAgICAgIG91dF9kYXRhMF9lbF9hcnIucHVzaChcbiAgICAgICAgICB7XG4gICAgICAgICAgICBkYXRhOiB2YWx1ZSxcbiAgICAgICAgICAgIHR5cGU6ICdTdHJpbmcnLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIG91dF9kYXRhMF9lbFtuYW1lXSA9IG91dF9kYXRhMF9lbF9hcnI7XG4gICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCBzZXREYXRldGltZSA9ICgoKSA9PiB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IG91dF9kYXRhMF9lbF9hcnIgPSBbXTtcblxuICAgICAgICBvdXRfZGF0YTBfZWxfYXJyLnB1c2goXG4gICAgICAgICAge1xuICAgICAgICAgICAgZGF0YTogdmFsdWUsXG4gICAgICAgICAgICB0eXBlOiAnRGF0ZXRpbWUnLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIG91dF9kYXRhMF9lbFtuYW1lXSA9IG91dF9kYXRhMF9lbF9hcnI7XG4gICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCBwdXREYXRldGltZSA9ICgoKSA9PiB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG4gICAgICAgIGxldCBvdXRfZGF0YTBfZWxfYXJyO1xuXG4gICAgICAgIG91dF9kYXRhMF9lbF9hcnIgPSBvdXRfZGF0YTBfZWxbbmFtZV07XG5cbiAgICAgICAgaWYgKCFvdXRfZGF0YTBfZWxfYXJyKSB7XG4gICAgICAgICAgb3V0X2RhdGEwX2VsX2FyciA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgb3V0X2RhdGEwX2VsX2Fyci5wdXNoKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGRhdGE6IHZhbHVlLFxuICAgICAgICAgICAgdHlwZTogJ0RhdGV0aW1lJyxcbiAgICAgICAgICB9KTtcblxuICAgICAgICBvdXRfZGF0YTBfZWxbbmFtZV0gPSBvdXRfZGF0YTBfZWxfYXJyO1xuICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgcHV0Qm9vbGVhbiA9ICgoKSA9PiB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG4gICAgICAgIGxldCBvdXRfZGF0YTBfZWxfYXJyO1xuXG4gICAgICAgIG91dF9kYXRhMF9lbF9hcnIgPSBvdXRfZGF0YTBfZWxbbmFtZV07XG5cbiAgICAgICAgaWYgKCFvdXRfZGF0YTBfZWxfYXJyKSB7XG4gICAgICAgICAgb3V0X2RhdGEwX2VsX2FyciA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgb3V0X2RhdGEwX2VsX2Fyci5wdXNoKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGRhdGE6IHZhbHVlLFxuICAgICAgICAgICAgdHlwZTogJ0Jvb2xlYW4nLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIG91dF9kYXRhMF9lbFtuYW1lXSA9IG91dF9kYXRhMF9lbF9hcnI7XG4gICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCBzZXRCb29sZWFuID0gKCgpID0+IHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcbiAgICAgICAgY29uc3Qgb3V0X2RhdGEwX2VsX2FyciA9IFtdO1xuXG4gICAgICAgIG91dF9kYXRhMF9lbF9hcnIucHVzaChcbiAgICAgICAgICB7XG4gICAgICAgICAgICBkYXRhOiB2YWx1ZSxcbiAgICAgICAgICAgIHR5cGU6ICdCb29sZWFuJyxcbiAgICAgICAgICB9KTtcblxuICAgICAgICBvdXRfZGF0YTBfZWxbbmFtZV0gPSBvdXRfZGF0YTBfZWxfYXJyO1xuICAgICAgfTtcbiAgICB9KSgpO1xuXG5cbiAgICBjb25zdCBwdXRJbnRlZ2VyID0gKCgpID0+IHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcbiAgICAgICAgbGV0IG91dF9kYXRhMF9lbF9hcnIgPSBvdXRfZGF0YTBfZWxbbmFtZV07XG5cbiAgICAgICAgaWYgKCFvdXRfZGF0YTBfZWxfYXJyKSB7XG4gICAgICAgICAgb3V0X2RhdGEwX2VsX2FyciA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgb3V0X2RhdGEwX2VsX2Fyci5wdXNoKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGRhdGE6IHZhbHVlLFxuICAgICAgICAgICAgdHlwZTogJ0ludGVnZXInLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIG91dF9kYXRhMF9lbFtuYW1lXSA9IG91dF9kYXRhMF9lbF9hcnI7XG4gICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCBzZXRJbnRlZ2VyID0gKCgpID0+IHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcbiAgICAgICAgY29uc3Qgb3V0X2RhdGEwX2VsX2FyciA9IFtdO1xuXG4gICAgICAgIG91dF9kYXRhMF9lbF9hcnIucHVzaChcbiAgICAgICAgICB7XG4gICAgICAgICAgICBkYXRhOiB2YWx1ZSxcbiAgICAgICAgICAgIHR5cGU6ICdJbnRlZ2VyJyxcbiAgICAgICAgICB9KTtcblxuICAgICAgICBvdXRfZGF0YTBfZWxbbmFtZV0gPSBvdXRfZGF0YTBfZWxfYXJyO1xuICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgLyogUFVUIGZ1bmN0aW9ucyBbRU5EXSAqL1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gaW5kaXZpZHVhbHMpIHtcbiAgICAgIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChpbmRpdmlkdWFscywga2V5KSkge1xuICAgICAgICAvLyBwcmludChcIiMxIGtleT1cIiwga2V5KTtcbiAgICAgICAgY29uc3QgaW5kaXZpZHVhbCA9IGluZGl2aWR1YWxzW2tleV07XG5cbiAgICAgICAgLy8gcHJpbnQoXCIjMS4xIGtleT1cIiwga2V5KTtcbiAgICAgICAgY29uc3Qgb2JqZWN0Q29udGVudFN0clZhbHVlID0gKCgpID0+IHtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoaW5kaXZpZHVhbFtuYW1lXSkge1xuICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgICAgICAgIGZvciAoY29uc3QgaSBpbiBpbmRpdmlkdWFsW25hbWVdKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBpbmRpdmlkdWFsW25hbWVdW2ldLmRhdGEpIHtcbiAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkoKTtcblxuICAgICAgICBjb25zdCBpdGVyYXRlZE9iamVjdCA9IE9iamVjdC5rZXlzKGluZGl2aWR1YWwpO1xuXG4gICAgICAgIGZvciAobGV0IGtleTIgPSAwOyBrZXkyIDwgaXRlcmF0ZWRPYmplY3QubGVuZ3RoOyBrZXkyKyspIHtcbiAgICAgICAgICBjb25zdCBlbGVtZW50ID0gaW5kaXZpZHVhbFtpdGVyYXRlZE9iamVjdFtrZXkyXV07XG5cbiAgICAgICAgICBjb25zdCBwdXRWYWx1ZSA9ICgoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgICAgbGV0IG91dF9kYXRhMF9lbF9hcnIgPSBvdXRfZGF0YTBfZWxbbmFtZV07XG5cbiAgICAgICAgICAgICAgaWYgKCFvdXRfZGF0YTBfZWxfYXJyKSB7XG4gICAgICAgICAgICAgICAgb3V0X2RhdGEwX2VsX2FyciA9IFtdO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKGl0ZXJhdGVkT2JqZWN0W2tleTJdID09ICdAJykge1xuICAgICAgICAgICAgICAgIG91dF9kYXRhMF9lbF9hcnIucHVzaChcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1VyaScsXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShlbGVtZW50KSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkzIGluIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKGVsZW1lbnQsIGtleTMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgb3V0X2RhdGEwX2VsX2Fyci5wdXNoKGVsZW1lbnRba2V5M10pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIG91dF9kYXRhMF9lbF9hcnIucHVzaChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBvdXRfZGF0YTBfZWxbbmFtZV0gPSBvdXRfZGF0YTBfZWxfYXJyO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KSgpO1xuXG4gICAgICAgICAgY29uc3QgcHV0VmFsdWVGcm9tID0gKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAobmFtZSwgcGF0aCwgdHJhbnNmb3JtKSB7XG4gICAgICAgICAgICAgIGxldCBvdXRfZGF0YTBfZWxfYXJyID0gb3V0X2RhdGEwX2VsW25hbWVdO1xuICAgICAgICAgICAgICBpZiAoIW91dF9kYXRhMF9lbF9hcnIpIHtcbiAgICAgICAgICAgICAgICBvdXRfZGF0YTBfZWxfYXJyID0gW107XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBsZXQgZWxlbWVudF91cmk7XG5cbiAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZWxlbWVudCkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50X3VyaSA9IFV0aWwuZ2V0VXJpKGVsZW1lbnQpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRfdXJpID0gZWxlbWVudC5kYXRhID8gZWxlbWVudC5kYXRhIDogZWxlbWVudDtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGxldCBjdXJlbGVtO1xuXG4gICAgICAgICAgICAgIGN1cmVsZW0gPSBnZXRTeW5jKHZlZGEudGlja2V0LCBlbGVtZW50X3VyaSk7XG5cbiAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICghY3VyZWxlbSB8fCAhY3VyZWxlbVtwYXRoW2ldXSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGNvbnN0IHVyaSA9IEFycmF5LmlzQXJyYXkoY3VyZWxlbVtwYXRoW2ldXSkgJiYgY3VyZWxlbVtwYXRoW2ldXVswXS5kYXRhID8gY3VyZWxlbVtwYXRoW2ldXVswXS5kYXRhIDogY3VyZWxlbVtwYXRoW2ldXTtcbiAgICAgICAgICAgICAgICBjdXJlbGVtID0gZ2V0U3luYyh2ZWRhLnRpY2tldCwgdXJpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoIWN1cmVsZW0gfHwgIWN1cmVsZW1bcGF0aFtwYXRoLmxlbmd0aCAtIDFdXSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgIG91dF9kYXRhMF9lbF9hcnIgPSBvdXRfZGF0YTBfZWxfYXJyLmNvbmNhdChjdXJlbGVtW3BhdGhbcGF0aC5sZW5ndGggLSAxXV0pO1xuXG4gICAgICAgICAgICAgIG91dF9kYXRhMF9lbFtuYW1lXSA9IG91dF9kYXRhMF9lbF9hcnI7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pKCk7XG5cbiAgICAgICAgICBjb25zdCBwdXRGcm9udFZhbHVlID0gKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgICBsZXQgb3V0X2RhdGEwX2VsX2FyciA9IG91dF9kYXRhMF9lbFtuYW1lXTtcblxuICAgICAgICAgICAgICBpZiAoIW91dF9kYXRhMF9lbF9hcnIpIHtcbiAgICAgICAgICAgICAgICBvdXRfZGF0YTBfZWxfYXJyID0gW107XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKGl0ZXJhdGVkT2JqZWN0W2tleTJdID09ICdAJykge1xuICAgICAgICAgICAgICAgIG91dF9kYXRhMF9lbF9hcnIudW5zaGlmdChcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1VyaScsXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShlbGVtZW50KSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkzIGluIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKGVsZW1lbnQsIGtleTMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgb3V0X2RhdGEwX2VsX2Fyci51bnNoaWZ0KGVsZW1lbnRba2V5M10pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIG91dF9kYXRhMF9lbF9hcnIudW5zaGlmdChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBvdXRfZGF0YTBfZWxbbmFtZV0gPSBvdXRfZGF0YTBfZWxfYXJyO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KSgpO1xuXG4gICAgICAgICAgY29uc3QgcHV0RWxlbWVudCA9ICgoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBjb25zdCBuYW1lID0gaXRlcmF0ZWRPYmplY3Rba2V5Ml07XG4gICAgICAgICAgICAgIGlmIChuYW1lID09ICdAJykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGxldCBvdXRfZGF0YTBfZWxfYXJyID0gW107XG4gICAgICAgICAgICAgIG91dF9kYXRhMF9lbF9hcnIgPSBvdXRfZGF0YTBfZWxbbmFtZV07XG5cbiAgICAgICAgICAgICAgaWYgKCFvdXRfZGF0YTBfZWxfYXJyKSB7XG4gICAgICAgICAgICAgICAgb3V0X2RhdGEwX2VsX2FyciA9IFtdO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZWxlbWVudCkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleTMgaW4gZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKGVsZW1lbnQsIGtleTMpKSB7XG4gICAgICAgICAgICAgICAgICAgIG91dF9kYXRhMF9lbF9hcnIucHVzaChlbGVtZW50W2tleTNdKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb3V0X2RhdGEwX2VsX2Fyci5wdXNoKGVsZW1lbnQpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgb3V0X2RhdGEwX2VsW25hbWVdID0gb3V0X2RhdGEwX2VsX2FycjtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSkoKTtcblxuICAgICAgICAgIC8qIFNlZ3JlZ2F0ZSBmdW5jdGlvbnMgW0JFR0lOXSAqL1xuICAgICAgICAgIGNvbnN0IGNvbnRlbnROYW1lID0gKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgICByZXR1cm4gaXRlcmF0ZWRPYmplY3Rba2V5Ml0gPT0gbmFtZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSkoKTtcblxuICAgICAgICAgIGNvbnN0IGVsZW1lbnRDb250ZW50U3RyVmFsdWUgPSAoKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuICAgICAgICAgICAgICBpZiAoaXRlcmF0ZWRPYmplY3Rba2V5Ml0gIT09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29uc3Qgc3RyID0gZWxlbWVudFswXS5kYXRhO1xuICAgICAgICAgICAgICByZXR1cm4gc3RyID09IHZhbHVlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KSgpO1xuICAgICAgICAgIC8qIFNlZ3JlZ2F0ZSBmdW5jdGlvbnMgW0VORF0gKi9cblxuICAgICAgICAgIGNvbnN0IGdldEVsZW1lbnQgPSAoKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pKCk7XG5cblxuICAgICAgICAgIC8vINCy0YvQv9C+0LvQvdGP0LXQvCDQstGB0LUgcnVsZXNcbiAgICAgICAgICBmb3IgKGNvbnN0IGtleTMgaW4gcnVsZXMpIHtcbiAgICAgICAgICAgIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChydWxlcywga2V5MykpIHtcbiAgICAgICAgICAgICAgY29uc3QgcnVsZSA9IHJ1bGVzW2tleTNdO1xuICAgICAgICAgICAgICAvLyAxLiB2LXdmOnNlZ3JlZ2F0ZU9iamVjdFxuICAgICAgICAgICAgICBjb25zdCBzZWdyZWdhdGVPYmplY3QgPSBydWxlWyd2LXdmOnNlZ3JlZ2F0ZU9iamVjdCddO1xuXG4gICAgICAgICAgICAgIC8vIDIuIHYtd2Y6c2VncmVnYXRlRWxlbWVudFxuICAgICAgICAgICAgICBjb25zdCBzZWdyZWdhdGVFbGVtZW50ID0gcnVsZVsndi13ZjpzZWdyZWdhdGVFbGVtZW50J107XG4gICAgICAgICAgICAgIGNvbnN0IGdyb3VwaW5nID0gcnVsZVsndi13Zjpncm91cGluZyddO1xuXG4gICAgICAgICAgICAgIGxldCByZXMgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgaWYgKHNlZ3JlZ2F0ZU9iamVjdCkge1xuICAgICAgICAgICAgICAgIHJlcyA9IGV2YWwoc2VncmVnYXRlT2JqZWN0WzBdLmRhdGEpO1xuICAgICAgICAgICAgICAgIGlmICghcmVzKSB7XG4gICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoc2VncmVnYXRlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJlcyA9IGV2YWwoc2VncmVnYXRlRWxlbWVudFswXS5kYXRhKTtcbiAgICAgICAgICAgICAgICBpZiAoIXJlcykge1xuICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLy8gMy4gdi13ZjphZ2dyZWdhdGVcbiAgICAgICAgICAgICAgbGV0IGdyb3VwX2tleTtcbiAgICAgICAgICAgICAgaWYgKCFncm91cGluZykge1xuICAgICAgICAgICAgICAgIG91dF9kYXRhMF9lbCA9IHt9O1xuICAgICAgICAgICAgICAgIG91dF9kYXRhMF9lbFsnQCddID0gQ29tbW9uVXRpbC5nZW5VcmkoKSArICctdHInO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCB1c2VFeGlzdHNVaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGkgaW4gZ3JvdXBpbmcpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChncm91cGluZywgaSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ2sgPSBncm91cGluZ1tpXS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZ2sgPT0gJ0AnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdXNlRXhpc3RzVWlkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICBncm91cF9rZXkgPSBnaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG91dF9kYXRhMF9lbCA9IG91dF9kYXRhMFtncm91cF9rZXldO1xuICAgICAgICAgICAgICAgIGlmICghb3V0X2RhdGEwX2VsKSB7XG4gICAgICAgICAgICAgICAgICBvdXRfZGF0YTBfZWwgPSB7fTtcbiAgICAgICAgICAgICAgICAgIGlmICh1c2VFeGlzdHNVaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0X2RhdGEwX2VsWydAJ10gPSBpbmRpdmlkdWFsWydAJ107XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvdXRfZGF0YTBfZWxbJ0AnXSA9IENvbW1vblV0aWwuZ2VuVXJpKCkgKyAnLXRyJztcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBjb25zdCBhZ3JlZ2F0ZSA9IHJ1bGVbJ3Ytd2Y6YWdncmVnYXRlJ107XG4gICAgICAgICAgICAgIGZvciAobGV0IGkyID0gMDsgaTIgPCBhZ3JlZ2F0ZS5sZW5ndGg7IGkyKyspIHtcbiAgICAgICAgICAgICAgICBldmFsKGFncmVnYXRlW2kyXS5kYXRhKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICghZ3JvdXBpbmcpIHtcbiAgICAgICAgICAgICAgICBvdXRfZGF0YTBbb3V0X2RhdGEwX2VsWydAJ11dID0gb3V0X2RhdGEwX2VsO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG91dF9kYXRhMFtncm91cF9rZXldID0gb3V0X2RhdGEwX2VsO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgb3V0X2RhdGEgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvdXRfZGF0YTApIHtcbiAgICAgIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChvdXRfZGF0YTAsIGtleSkpIHtcbiAgICAgICAgb3V0X2RhdGEucHVzaChvdXRfZGF0YTBba2V5XSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dF9kYXRhO1xuICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICBjb25zb2xlLmVycm9yKCdUcmFuc2Zvcm1hdGlvbiBmYWlsZWQnKTtcbiAgfSk7XG59O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBd1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNBLFNBQVNBLE9BQU9BLENBQUVDLE1BQU0sRUFBRUMsR0FBRyxFQUFFO0lBQzdCLElBQU1DLEdBQUcsR0FBRyxJQUFJQyxjQUFjLEVBQUU7SUFDaENELEdBQUcsQ0FBQ0UsSUFBSSxDQUFDLEtBQUssRUFBRSxxQkFBcUIsR0FBR0gsR0FBRyxHQUFHLFVBQVUsR0FBR0QsTUFBTSxFQUFFLEtBQUssQ0FBQztJQUN6RUUsR0FBRyxDQUFDRyxJQUFJLEVBQUU7SUFDVixJQUFJSCxHQUFHLENBQUNJLE1BQU0sS0FBSyxHQUFHLEVBQUU7TUFDdEIsT0FBT0MsSUFBSSxDQUFDQyxLQUFLLENBQUNOLEdBQUcsQ0FBQ08sWUFBWSxDQUFDO0lBQ3JDLENBQUMsTUFBTTtNQUNMLE1BQU1DLEtBQUssQ0FBQ1IsR0FBRyxDQUFDSSxNQUFNLENBQUM7SUFDekI7RUFDRjs7RUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFMQTtJQUFBSyxPQUFBLGFBQUFDLGFBQUE7TUF2V09DLElBQUksR0FBQUQsYUFBQSxDQUFBRSxPQUFBO0lBQUEsYUFBQUMseUJBQUE7TUFDSkMsZUFBZSxHQUFBRCx5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