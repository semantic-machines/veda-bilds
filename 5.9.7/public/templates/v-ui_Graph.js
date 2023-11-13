"use strict";

System.register(["/js/browser/util.js", "/js/common/util.js", "jquery", "/js/common/veda.js", "/js/common/individual_model.js", "/js/common/backend.js", "vis", "contextmenu"], function (_export, _context) {
  "use strict";

  var BrowserUtil, CommonUtil, $, veda, IndividualModel, Backend, vis, post, html;
  function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }
  return {
    setters: [function (_jsBrowserUtilJs) {
      BrowserUtil = _jsBrowserUtilJs.default;
    }, function (_jsCommonUtilJs) {
      CommonUtil = _jsCommonUtilJs.default;
    }, function (_jquery) {
      $ = _jquery.default;
    }, function (_jsCommonVedaJs) {
      veda = _jsCommonVedaJs.default;
    }, function (_jsCommonIndividual_modelJs) {
      IndividualModel = _jsCommonIndividual_modelJs.default;
    }, function (_jsCommonBackendJs) {
      Backend = _jsCommonBackendJs.default;
    }, function (_vis) {
      vis = _vis.default;
    }, function (_contextmenu) {}],
    execute: function () {
      _export("post", post = function post(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);

        // Create a network
        var root = individual;
        var nodes = new vis.DataSet();
        var edges = new vis.DataSet();
        var body = $('body');
        var select = {
          nodes: [],
          edges: []
        };
        var data = {
          nodes: nodes,
          edges: edges
        };
        addNode(root).then(function () {
          addOutLinks(root.id);
          addInLinks(root.id);
        });
        var graph = $('#graph', template);
        var height = $('#copyright').offset().top - graph.offset().top - 70 + 'px';
        var options = {
          width: '100%',
          height: height,
          nodes: {
            shape: 'box'
          },
          edges: {
            arrows: 'to'
          },
          groups: {
            _class: {
              color: {
                border: 'green',
                background: 'lightgreen',
                highlight: {
                  border: 'green',
                  background: 'lightgreen'
                }
              }
            },
            datatypeProperty: {
              color: {
                border: 'goldenrod',
                background: 'gold',
                highlight: {
                  border: 'goldenrod',
                  background: 'gold'
                }
              }
            },
            objectProperty: {
              color: {
                border: 'darkorange',
                background: 'orange',
                highlight: {
                  border: 'darkorange',
                  background: 'orange'
                }
              }
            },
            template: {
              color: {
                border: 'darkviolet',
                background: 'violet',
                highlight: {
                  border: 'darkviolet',
                  background: 'violet'
                }
              }
            },
            specification: {
              color: {
                border: 'hotpink',
                background: 'lightpink',
                highlight: {
                  border: 'hotpink',
                  background: 'lightpink'
                }
              }
            },
            ontology: {
              color: {
                border: 'darkgreen',
                background: 'green',
                highlight: {
                  border: 'darkgreen',
                  background: 'green'
                }
              },
              fontColor: 'white'
            }
          },
          physics: {
            enabled: true,
            barnesHut: {
              gravitationalConstant: -4000,
              centralGravity: 0.1,
              springLength: 200,
              springConstant: 0.04,
              damping: 0.09
            }
          }
        };
        var network;
        setTimeout(function () {
          network = new vis.Network(graph.get(0), data, options);
          network.on('doubleClick', onDoubleClick);
          network.on('select', onSelect);
        });

        // Buttons
        $('#export-ttl', template).click(function () {
          var list = nodes.get().map(function (item) {
            return item.individual;
          });
          BrowserUtil.exportTTL(list);
        });
        $('#freeze', template).click(function () {
          network.freezeSimulation = !network.freezeSimulation;
          $('i', this).toggleClass('glyphicon-pause glyphicon-play');
        });

        // Context menu for selected node
        graph.contextmenu({
          target: $('#individual-context-menu', template),
          before: function before(e, element) {
            if (!select.nodes.length) return false;
            var id = select.nodes[0];
            var node = nodes.get(id);
            switch (node.group) {
              case '_class':
                this.target = $('#class-context-menu', template);
                break;
              case 'ontology':
                this.target = $('#ontology-context-menu', template);
                break;
              case 'datatypeProperty':
              case 'objectProperty':
                this.target = $('#property-context-menu', template);
                break;
              case 'template':
                this.target = $('#template-context-menu', template);
                break;
              case 'specification':
                this.target = $('#specification-context-menu', template);
                break;
              default:
                this.target = $('#individual-context-menu', template);
                break;
            }
            return true;
          },
          onItem: function onItem(context, e) {
            var id = select.nodes[0];
            switch (e.target.id) {
              case 'out-links':
                addOutLinks(id);
                break;
              case 'in-links':
                addInLinks(id);
                break;
              case 'delete':
                nodes.remove(select.nodes);
                edges.remove(select.edges);
                select.nodes = select.edges = [];
                break;
              case 'delete-with-out':
                deleteWithOutLinks(id);
                select.nodes = select.edges = [];
                break;
              case 'delete-with-in':
                deleteWithInLinks(id);
                select.nodes = select.edges = [];
                break;
              case 'class-individuals':
                addInLinks(id, "'rdf:type'==='{id}'");
                break;
              case 'class-subclasses':
                addInLinks(id, "('rdf:type'==='owl:Class'||'rdf:type'==='rdfs:Class')&&'rdfs:subClassOf'==='{id}'");
                break;
              case 'class-properties':
                addInLinks(id, "'rdfs:domain'==='{id}'");
                break;
              case 'class-templates':
                addInLinks(id, "'rdf:type'==='v-ui:ClassTemplate'&&'v-ui:forClass'==='{id}'");
                break;
              case 'class-specifications':
                addInLinks(id, "('rdf:type'==='v-ui:PropertySpecification' || " + "'rdf:type'==='v-ui:DatatypePropertySpecification' || " + "'rdf:type'==='v-ui:ObjectPropertySpecification'" + ")&&'v-ui:forClass'==='{id}'");
                break;
              case 'property-specifications':
                addInLinks(id, "('rdf:type'==='v-ui:PropertySpecification' || " + "'rdf:type'==='v-ui:DatatypePropertySpecification' || " + "'rdf:type'==='v-ui:ObjectPropertySpecification'" + ")&&'v-ui:forProperty'=='{id}'");
                break;
            }
          }
        });
        function addNode(individual) {
          return individual.load().then(function (individual) {
            if (nodes.get(individual.id) === null) {
              var node = {
                id: individual.id,
                label: individual['rdf:type'][0].toString() + '\n' + individual.toString(),
                individual: individual
              };
              if (individual['rdf:type'][0]) {
                switch (individual['rdf:type'][0].id) {
                  case 'rdfs:Class':
                  case 'owl:Class':
                    node.group = '_class';
                    break;
                  case 'rdf:Property':
                  case 'owl:ObjectProperty':
                    node.group = 'objectProperty';
                    break;
                  case 'owl:DatatypeProperty':
                  case 'owl:OntologyProperty':
                  case 'owl:AnnotationProperty':
                    node.group = 'datatypeProperty';
                    break;
                  case 'v-ui:ClassTemplate':
                    node.group = 'template';
                    break;
                  case 'v-ui:PropertySpecification':
                  case 'v-ui:DatatypePropertySpecification':
                  case 'v-ui:ObjectPropertySpecification':
                    node.group = 'specification';
                    break;
                  case 'owl:Ontology':
                    node.group = 'ontology';
                    break;
                  default:
                    node.group = 'individual';
                    break;
                }
              }
              nodes.add([node]);
            }
          });
        }
        function addOutLinks(id) {
          var individual = nodes.get(id).individual;
          Object.getOwnPropertyNames(individual.properties).forEach(function (property_uri) {
            if (property_uri === '@') {
              return;
            }
            individual[property_uri].forEach(function (value) {
              if (_instanceof(value, IndividualModel) && value !== individual) {
                addNode(value).then(function () {
                  var from = individual.id;
                  var to = value.id;
                  var label = new IndividualModel(property_uri)['rdfs:label'].map(CommonUtil.formatValue).join(' ');
                  var options = {
                    filter: function filter(item) {
                      return item.from == from && item.to == to && item.label.toString() == label;
                    }
                  };
                  if (!edges.get(options).length) {
                    edges.add([{
                      from: from,
                      to: to,
                      label: label
                    }]);
                  }
                });
              }
            });
          });
        }
        function addInLinks(id, queryStr) {
          var q = queryStr || "'*'=='{id}'";
          q = q.replace('{id}', id);
          return Backend.query(veda.ticket, q).then(function (queryResult) {
            var uris = queryResult.result;
            return Backend.get_individuals(veda.ticket, uris).then(function (individualsJSONs) {
              individualsJSONs.forEach(function (individualJSON) {
                var res = new IndividualModel(individualJSON);
                addNode(res);
                var to = id;
                var from = res.id;
                Object.getOwnPropertyNames(res.properties).forEach(function (property_uri) {
                  if (property_uri === '@') {
                    return;
                  }
                  if (res.hasValue(property_uri, id)) {
                    var label = new IndividualModel(property_uri)['rdfs:label'].map(CommonUtil.formatValue).join(' ');
                    var _options = {
                      filter: function filter(item) {
                        return item.from === from && item.to === to && item.label.toString() === label;
                      }
                    };
                    if (!edges.get(_options).length) {
                      edges.add([{
                        from: from,
                        to: to,
                        label: label
                      }]);
                    }
                  }
                });
              });
            });
          });
        }
        function deleteWithOutLinks(id) {
          nodes.remove(id);
          var nodesToRemove = [];
          var edgesToRemove = edges.get({
            filter: function filter(item) {
              if (item.from == id) {
                nodesToRemove.push(item.to);
              }
              return item.from == id || item.to == id;
            }
          });
          edges.remove(edgesToRemove);
          nodes.remove(nodesToRemove);
        }
        function deleteWithInLinks(id) {
          nodes.remove(id);
          var nodesToRemove = [];
          var edgesToRemove = edges.get({
            filter: function filter(item) {
              if (item.to == id) {
                nodesToRemove.push(item.from);
              }
              return item.from == id || item.to == id;
            }
          });
          edges.remove(edgesToRemove);
          nodes.remove(nodesToRemove);
        }

        // Event handlers
        function onSelect(selected) {
          select = selected;
          body.off('keydown', selectedKeydownHandler);
          body.one('keydown', selected, selectedKeydownHandler);
        }
        function selectedKeydownHandler(e) {
          if (e.which == 46) {
            nodes.remove(e.data.nodes);
            edges.remove(e.data.edges);
          }
          if (e.which == 73) {
            addInLinks(e.data.nodes[0]);
          }
          if (e.which == 79) {
            addOutLinks(e.data.nodes[0]);
          }
        }
        function onDoubleClick(selected) {
          if (!selected.nodes.length) return;
          var individual_uri = selected.nodes[0];
          var modalTmpl = $('#individual-modal-template').html();
          var modal = $(modalTmpl);
          var modalBody = $('.modal-body', modal);
          var individual = new IndividualModel(individual_uri);
          individual.present(modalBody);
          modal.one('remove', function (e) {
            modal.modal('hide');
          });
          modal.modal();
          $('#main').append(modal);
        }
      });
      _export("html", html = "\n  <div class=\"container-fluid sheet\">\n    <button type=\"button\" id=\"freeze\" class=\"btn btn-success\"><i class=\"glyphicon glyphicon-pause\"></i></button>\n    <button type=\"button\" id=\"export-ttl\" class=\"btn btn-primary\">\n      <i class=\"glyphicon glyphicon-export\"></i> <span about=\"v-ui:ExportToTTL\" property=\"rdfs:label\"></span>\n    </button>\n\n    <div id=\"graph\"></div>\n\n    <div id=\"individual-context-menu\">\n      <ul class=\"dropdown-menu\" role=\"menu\">\n        <li role=\"presentation\" class=\"dropdown-header\">\u0418\u043D\u0434\u0438\u0432\u0438\u0434</li>\n        <li role=\"presentation\" class=\"divider\"></li>\n        <li><a tabindex=\"-1\" id=\"out-links\">\u0412\u0441\u0435 \u0438\u0441\u0445\u043E\u0434\u044F\u0449\u0438\u0435 \u0441\u0441\u044B\u043B\u043A\u0438</a></li>\n        <li><a tabindex=\"-1\" id=\"in-links\">\u0412\u0441\u0435 \u0432\u0445\u043E\u0434\u044F\u0449\u0438\u0435 \u0441\u0441\u044B\u043B\u043A\u0438</a></li>\n        <li role=\"presentation\" class=\"divider\"></li>\n        <li><a tabindex=\"-1\" id=\"delete\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</a></li>\n        <li><a tabindex=\"-1\" id=\"delete-with-out\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0441 \u0438\u0441\u0445\u043E\u0434\u044F\u0449\u0438\u043C\u0438</a></li>\n        <li><a tabindex=\"-1\" id=\"delete-with-in\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0441 \u0432\u0445\u043E\u0434\u044F\u0449\u0438\u043C\u0438</a></li>\n      </ul>\n    </div>\n    <div id=\"class-context-menu\">\n      <ul class=\"dropdown-menu\" role=\"menu\">\n        <li role=\"presentation\" class=\"dropdown-header\">\u041A\u043B\u0430\u0441\u0441</li>\n        <li><a tabindex=\"-1\" id=\"class-individuals\">\u0412\u0441\u0435 \u0438\u043D\u0434\u0438\u0432\u0438\u0434\u044B</a></li>\n        <li><a tabindex=\"-1\" id=\"class-subclasses\">\u0412\u0441\u0435 \u043F\u043E\u0434\u043A\u043B\u0430\u0441\u0441\u044B</a></li>\n        <li><a tabindex=\"-1\" id=\"class-properties\">\u0421\u0432\u043E\u0439\u0441\u0442\u0432\u0430 \u043A\u043B\u0430\u0441\u0441\u0430</a></li>\n        <li><a tabindex=\"-1\" id=\"class-templates\">\u0428\u0430\u0431\u043B\u043E\u043D\u044B \u043A\u043B\u0430\u0441\u0441\u0430</a></li>\n        <li><a tabindex=\"-1\" id=\"class-specifications\">\u0421\u043F\u0435\u0446\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438 \u043A\u043B\u0430\u0441\u0441\u0430</a></li>\n        <li role=\"presentation\" class=\"divider\"></li>\n        <li><a tabindex=\"-1\" id=\"out-links\">\u0412\u0441\u0435 \u0438\u0441\u0445\u043E\u0434\u044F\u0449\u0438\u0435 \u0441\u0441\u044B\u043B\u043A\u0438</a></li>\n        <li><a tabindex=\"-1\" id=\"in-links\">\u0412\u0441\u0435 \u0432\u0445\u043E\u0434\u044F\u0449\u0438\u0435 \u0441\u0441\u044B\u043B\u043A\u0438</a></li>\n        <li role=\"presentation\" class=\"divider\"></li>\n        <li><a tabindex=\"-1\" id=\"delete\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</a></li>\n        <li><a tabindex=\"-1\" id=\"delete-with-out\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0441 \u0438\u0441\u0445\u043E\u0434\u044F\u0449\u0438\u043C\u0438</a></li>\n        <li><a tabindex=\"-1\" id=\"delete-with-in\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0441 \u0432\u0445\u043E\u0434\u044F\u0449\u0438\u043C\u0438</a></li>\n      </ul>\n    </div>\n    <div id=\"property-context-menu\">\n      <ul class=\"dropdown-menu\" role=\"menu\">\n        <li role=\"presentation\" class=\"dropdown-header\">\u0421\u0432\u043E\u0439\u0441\u0442\u0432\u043E</li>\n        <li><a tabindex=\"-1\" id=\"property-specifications\">\u0421\u043F\u0435\u0446\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438 \u0441\u0432\u043E\u0439\u0441\u0442\u0432\u0430</a></li>\n        <li role=\"presentation\" class=\"divider\"></li>\n        <li><a tabindex=\"-1\" id=\"out-links\">\u0412\u0441\u0435 \u0438\u0441\u0445\u043E\u0434\u044F\u0449\u0438\u0435 \u0441\u0441\u044B\u043B\u043A\u0438</a></li>\n        <li><a tabindex=\"-1\" id=\"in-links\">\u0412\u0441\u0435 \u0432\u0445\u043E\u0434\u044F\u0449\u0438\u0435 \u0441\u0441\u044B\u043B\u043A\u0438</a></li>\n        <li role=\"presentation\" class=\"divider\"></li>\n        <li><a tabindex=\"-1\" id=\"delete\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</a></li>\n        <li><a tabindex=\"-1\" id=\"delete-with-out\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0441 \u0438\u0441\u0445\u043E\u0434\u044F\u0449\u0438\u043C\u0438</a></li>\n        <li><a tabindex=\"-1\" id=\"delete-with-in\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0441 \u0432\u0445\u043E\u0434\u044F\u0449\u0438\u043C\u0438</a></li>\n      </ul>\n    </div>\n    <div id=\"ontology-context-menu\">\n      <ul class=\"dropdown-menu\" role=\"menu\">\n        <li role=\"presentation\" class=\"dropdown-header\">\u041E\u043D\u0442\u043E\u043B\u043E\u0433\u0438\u044F</li>\n        <li role=\"presentation\" class=\"divider\"></li>\n        <li><a tabindex=\"-1\" id=\"out-links\">\u0412\u0441\u0435 \u0438\u0441\u0445\u043E\u0434\u044F\u0449\u0438\u0435 \u0441\u0441\u044B\u043B\u043A\u0438</a></li>\n        <li><a tabindex=\"-1\" id=\"in-links\">\u0412\u0441\u0435 \u0432\u0445\u043E\u0434\u044F\u0449\u0438\u0435 \u0441\u0441\u044B\u043B\u043A\u0438</a></li>\n        <li role=\"presentation\" class=\"divider\"></li>\n        <li><a tabindex=\"-1\" id=\"delete\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</a></li>\n        <li><a tabindex=\"-1\" id=\"delete-with-out\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0441 \u0438\u0441\u0445\u043E\u0434\u044F\u0449\u0438\u043C\u0438</a></li>\n        <li><a tabindex=\"-1\" id=\"delete-with-in\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0441 \u0432\u0445\u043E\u0434\u044F\u0449\u0438\u043C\u0438</a></li>\n      </ul>\n    </div>\n    <div id=\"template-context-menu\">\n      <ul class=\"dropdown-menu\" role=\"menu\">\n        <li role=\"presentation\" class=\"dropdown-header\">\u0428\u0430\u0431\u043B\u043E\u043D</li>\n        <li role=\"presentation\" class=\"divider\"></li>\n        <li><a tabindex=\"-1\" id=\"out-links\">\u0412\u0441\u0435 \u0438\u0441\u0445\u043E\u0434\u044F\u0449\u0438\u0435 \u0441\u0441\u044B\u043B\u043A\u0438</a></li>\n        <li><a tabindex=\"-1\" id=\"in-links\">\u0412\u0441\u0435 \u0432\u0445\u043E\u0434\u044F\u0449\u0438\u0435 \u0441\u0441\u044B\u043B\u043A\u0438</a></li>\n        <li role=\"presentation\" class=\"divider\"></li>\n        <li><a tabindex=\"-1\" id=\"delete\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</a></li>\n        <li><a tabindex=\"-1\" id=\"delete-with-out\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0441 \u0438\u0441\u0445\u043E\u0434\u044F\u0449\u0438\u043C\u0438</a></li>\n        <li><a tabindex=\"-1\" id=\"delete-with-in\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0441 \u0432\u0445\u043E\u0434\u044F\u0449\u0438\u043C\u0438</a></li>\n      </ul>\n    </div>\n    <div id=\"specification-context-menu\">\n      <ul class=\"dropdown-menu\" role=\"menu\">\n        <li role=\"presentation\" class=\"dropdown-header\">\u0421\u043F\u0435\u0446\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F</li>\n        <li role=\"presentation\" class=\"divider\"></li>\n        <li><a tabindex=\"-1\" id=\"out-links\">\u0412\u0441\u0435 \u0438\u0441\u0445\u043E\u0434\u044F\u0449\u0438\u0435 \u0441\u0441\u044B\u043B\u043A\u0438</a></li>\n        <li><a tabindex=\"-1\" id=\"in-links\">\u0412\u0441\u0435 \u0432\u0445\u043E\u0434\u044F\u0449\u0438\u0435 \u0441\u0441\u044B\u043B\u043A\u0438</a></li>\n        <li role=\"presentation\" class=\"divider\"></li>\n        <li><a tabindex=\"-1\" id=\"delete\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</a></li>\n        <li><a tabindex=\"-1\" id=\"delete-with-out\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0441 \u0438\u0441\u0445\u043E\u0434\u044F\u0449\u0438\u043C\u0438</a></li>\n        <li><a tabindex=\"-1\" id=\"delete-with-in\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0441 \u0432\u0445\u043E\u0434\u044F\u0449\u0438\u043C\u0438</a></li>\n      </ul>\n    </div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJCcm93c2VyVXRpbCIsIl9qc0Jyb3dzZXJVdGlsSnMiLCJkZWZhdWx0IiwiX2pzQ29tbW9uVXRpbEpzIiwiQ29tbW9uVXRpbCIsIl9qcXVlcnkiLCIkIiwiX2pzQ29tbW9uVmVkYUpzIiwidmVkYSIsIl9qc0NvbW1vbkluZGl2aWR1YWxfbW9kZWxKcyIsIkluZGl2aWR1YWxNb2RlbCIsIl9qc0NvbW1vbkJhY2tlbmRKcyIsIkJhY2tlbmQiLCJfdmlzIiwidmlzIiwiX2NvbnRleHRtZW51IiwiZXhlY3V0ZSIsIl9leHBvcnQiLCJwb3N0IiwiaW5kaXZpZHVhbCIsInRlbXBsYXRlIiwiY29udGFpbmVyIiwibW9kZSIsImV4dHJhIiwicm9vdCIsIm5vZGVzIiwiRGF0YVNldCIsImVkZ2VzIiwiYm9keSIsInNlbGVjdCIsImRhdGEiLCJhZGROb2RlIiwidGhlbiIsImFkZE91dExpbmtzIiwiaWQiLCJhZGRJbkxpbmtzIiwiZ3JhcGgiLCJoZWlnaHQiLCJvZmZzZXQiLCJ0b3AiLCJvcHRpb25zIiwid2lkdGgiLCJzaGFwZSIsImFycm93cyIsImdyb3VwcyIsIl9jbGFzcyIsImNvbG9yIiwiYm9yZGVyIiwiYmFja2dyb3VuZCIsImhpZ2hsaWdodCIsImRhdGF0eXBlUHJvcGVydHkiLCJvYmplY3RQcm9wZXJ0eSIsInNwZWNpZmljYXRpb24iLCJvbnRvbG9neSIsImZvbnRDb2xvciIsInBoeXNpY3MiLCJlbmFibGVkIiwiYmFybmVzSHV0IiwiZ3Jhdml0YXRpb25hbENvbnN0YW50IiwiY2VudHJhbEdyYXZpdHkiLCJzcHJpbmdMZW5ndGgiLCJzcHJpbmdDb25zdGFudCIsImRhbXBpbmciLCJuZXR3b3JrIiwic2V0VGltZW91dCIsIk5ldHdvcmsiLCJnZXQiLCJvbiIsIm9uRG91YmxlQ2xpY2siLCJvblNlbGVjdCIsImNsaWNrIiwibGlzdCIsIm1hcCIsIml0ZW0iLCJleHBvcnRUVEwiLCJmcmVlemVTaW11bGF0aW9uIiwidG9nZ2xlQ2xhc3MiLCJjb250ZXh0bWVudSIsInRhcmdldCIsImJlZm9yZSIsImUiLCJlbGVtZW50IiwibGVuZ3RoIiwibm9kZSIsImdyb3VwIiwib25JdGVtIiwiY29udGV4dCIsInJlbW92ZSIsImRlbGV0ZVdpdGhPdXRMaW5rcyIsImRlbGV0ZVdpdGhJbkxpbmtzIiwibG9hZCIsImxhYmVsIiwidG9TdHJpbmciLCJhZGQiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwicHJvcGVydGllcyIsImZvckVhY2giLCJwcm9wZXJ0eV91cmkiLCJ2YWx1ZSIsIl9pbnN0YW5jZW9mIiwiZnJvbSIsInRvIiwiZm9ybWF0VmFsdWUiLCJqb2luIiwiZmlsdGVyIiwicXVlcnlTdHIiLCJxIiwicmVwbGFjZSIsInF1ZXJ5IiwidGlja2V0IiwicXVlcnlSZXN1bHQiLCJ1cmlzIiwicmVzdWx0IiwiZ2V0X2luZGl2aWR1YWxzIiwiaW5kaXZpZHVhbHNKU09OcyIsImluZGl2aWR1YWxKU09OIiwicmVzIiwiaGFzVmFsdWUiLCJub2Rlc1RvUmVtb3ZlIiwiZWRnZXNUb1JlbW92ZSIsInB1c2giLCJzZWxlY3RlZCIsIm9mZiIsInNlbGVjdGVkS2V5ZG93bkhhbmRsZXIiLCJvbmUiLCJ3aGljaCIsImluZGl2aWR1YWxfdXJpIiwibW9kYWxUbXBsIiwiaHRtbCIsIm1vZGFsIiwibW9kYWxCb2R5IiwicHJlc2VudCIsImFwcGVuZCJdLCJzb3VyY2VzIjpbIi4uLy4uL29udG9sb2d5L3N5c3RlbS1jb3JlL3RlbXBsYXRlcy92LXVpX0dyYXBoLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCcm93c2VyVXRpbCBmcm9tICcvanMvYnJvd3Nlci91dGlsLmpzJztcbmltcG9ydCBDb21tb25VdGlsIGZyb20gJy9qcy9jb21tb24vdXRpbC5qcyc7XG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHZlZGEgZnJvbSAnL2pzL2NvbW1vbi92ZWRhLmpzJztcbmltcG9ydCBJbmRpdmlkdWFsTW9kZWwgZnJvbSAnL2pzL2NvbW1vbi9pbmRpdmlkdWFsX21vZGVsLmpzJztcbmltcG9ydCBCYWNrZW5kIGZyb20gJy9qcy9jb21tb24vYmFja2VuZC5qcyc7XG5pbXBvcnQgdmlzIGZyb20gJ3Zpcyc7XG5pbXBvcnQgJ2NvbnRleHRtZW51JztcblxuZXhwb3J0IGNvbnN0IHBvc3QgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gIC8vIENyZWF0ZSBhIG5ldHdvcmtcbiAgY29uc3Qgcm9vdCA9IGluZGl2aWR1YWw7XG4gIGNvbnN0IG5vZGVzID0gbmV3IHZpcy5EYXRhU2V0KCk7XG4gIGNvbnN0IGVkZ2VzID0gbmV3IHZpcy5EYXRhU2V0KCk7XG4gIGNvbnN0IGJvZHkgPSAkKCdib2R5Jyk7XG4gIGxldCBzZWxlY3QgPSB7bm9kZXM6IFtdLCBlZGdlczogW119O1xuICBjb25zdCBkYXRhID0ge1xuICAgIG5vZGVzOiBub2RlcyxcbiAgICBlZGdlczogZWRnZXMsXG4gIH07XG5cbiAgYWRkTm9kZShyb290KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICBhZGRPdXRMaW5rcyhyb290LmlkKTtcbiAgICBhZGRJbkxpbmtzKHJvb3QuaWQpO1xuICB9KTtcblxuICBjb25zdCBncmFwaCA9ICQoJyNncmFwaCcsIHRlbXBsYXRlKTtcblxuICBjb25zdCBoZWlnaHQgPSAkKCcjY29weXJpZ2h0Jykub2Zmc2V0KCkudG9wIC0gZ3JhcGgub2Zmc2V0KCkudG9wIC0gNzAgKyAncHgnO1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgIHdpZHRoOiAnMTAwJScsXG4gICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgbm9kZXM6IHtcbiAgICAgIHNoYXBlOiAnYm94JyxcbiAgICB9LFxuICAgIGVkZ2VzOiB7XG4gICAgICBhcnJvd3M6ICd0bycsXG4gICAgfSxcbiAgICBncm91cHM6IHtcbiAgICAgIF9jbGFzczoge1xuICAgICAgICBjb2xvcjoge1xuICAgICAgICAgIGJvcmRlcjogJ2dyZWVuJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAnbGlnaHRncmVlbicsXG4gICAgICAgICAgaGlnaGxpZ2h0OiB7XG4gICAgICAgICAgICBib3JkZXI6ICdncmVlbicsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnbGlnaHRncmVlbicsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBkYXRhdHlwZVByb3BlcnR5OiB7XG4gICAgICAgIGNvbG9yOiB7XG4gICAgICAgICAgYm9yZGVyOiAnZ29sZGVucm9kJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAnZ29sZCcsXG4gICAgICAgICAgaGlnaGxpZ2h0OiB7XG4gICAgICAgICAgICBib3JkZXI6ICdnb2xkZW5yb2QnLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ2dvbGQnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgb2JqZWN0UHJvcGVydHk6IHtcbiAgICAgICAgY29sb3I6IHtcbiAgICAgICAgICBib3JkZXI6ICdkYXJrb3JhbmdlJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAnb3JhbmdlJyxcbiAgICAgICAgICBoaWdobGlnaHQ6IHtcbiAgICAgICAgICAgIGJvcmRlcjogJ2RhcmtvcmFuZ2UnLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ29yYW5nZScsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZToge1xuICAgICAgICBjb2xvcjoge1xuICAgICAgICAgIGJvcmRlcjogJ2Rhcmt2aW9sZXQnLFxuICAgICAgICAgIGJhY2tncm91bmQ6ICd2aW9sZXQnLFxuICAgICAgICAgIGhpZ2hsaWdodDoge1xuICAgICAgICAgICAgYm9yZGVyOiAnZGFya3Zpb2xldCcsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAndmlvbGV0JyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHNwZWNpZmljYXRpb246IHtcbiAgICAgICAgY29sb3I6IHtcbiAgICAgICAgICBib3JkZXI6ICdob3RwaW5rJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAnbGlnaHRwaW5rJyxcbiAgICAgICAgICBoaWdobGlnaHQ6IHtcbiAgICAgICAgICAgIGJvcmRlcjogJ2hvdHBpbmsnLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ2xpZ2h0cGluaycsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBvbnRvbG9neToge1xuICAgICAgICBjb2xvcjoge1xuICAgICAgICAgIGJvcmRlcjogJ2RhcmtncmVlbicsXG4gICAgICAgICAgYmFja2dyb3VuZDogJ2dyZWVuJyxcbiAgICAgICAgICBoaWdobGlnaHQ6IHtcbiAgICAgICAgICAgIGJvcmRlcjogJ2RhcmtncmVlbicsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnZ3JlZW4nLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGZvbnRDb2xvcjogJ3doaXRlJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBwaHlzaWNzOiB7XG4gICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgYmFybmVzSHV0OiB7XG4gICAgICAgIGdyYXZpdGF0aW9uYWxDb25zdGFudDogLTQwMDAsXG4gICAgICAgIGNlbnRyYWxHcmF2aXR5OiAwLjEsXG4gICAgICAgIHNwcmluZ0xlbmd0aDogMjAwLFxuICAgICAgICBzcHJpbmdDb25zdGFudDogMC4wNCxcbiAgICAgICAgZGFtcGluZzogMC4wOSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcblxuICBsZXQgbmV0d29yaztcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBuZXR3b3JrID0gbmV3IHZpcy5OZXR3b3JrKGdyYXBoLmdldCgwKSwgZGF0YSwgb3B0aW9ucyk7XG4gICAgbmV0d29yay5vbignZG91YmxlQ2xpY2snLCBvbkRvdWJsZUNsaWNrKTtcbiAgICBuZXR3b3JrLm9uKCdzZWxlY3QnLCBvblNlbGVjdCk7XG4gIH0pO1xuXG4gIC8vIEJ1dHRvbnNcbiAgJCgnI2V4cG9ydC10dGwnLCB0ZW1wbGF0ZSkuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGxpc3QgPSBub2Rlcy5nZXQoKS5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHJldHVybiBpdGVtLmluZGl2aWR1YWw7XG4gICAgfSk7XG4gICAgQnJvd3NlclV0aWwuZXhwb3J0VFRMKGxpc3QpO1xuICB9KTtcbiAgJCgnI2ZyZWV6ZScsIHRlbXBsYXRlKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgbmV0d29yay5mcmVlemVTaW11bGF0aW9uID0gIW5ldHdvcmsuZnJlZXplU2ltdWxhdGlvbjtcbiAgICAkKCdpJywgdGhpcykudG9nZ2xlQ2xhc3MoJ2dseXBoaWNvbi1wYXVzZSBnbHlwaGljb24tcGxheScpO1xuICB9KTtcblxuICAvLyBDb250ZXh0IG1lbnUgZm9yIHNlbGVjdGVkIG5vZGVcbiAgZ3JhcGguY29udGV4dG1lbnUoe1xuICAgIHRhcmdldDogJCgnI2luZGl2aWR1YWwtY29udGV4dC1tZW51JywgdGVtcGxhdGUpLFxuICAgIGJlZm9yZTogZnVuY3Rpb24gKGUsIGVsZW1lbnQpIHtcbiAgICAgIGlmICghc2VsZWN0Lm5vZGVzLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgICAgY29uc3QgaWQgPSBzZWxlY3Qubm9kZXNbMF07XG4gICAgICBjb25zdCBub2RlID0gbm9kZXMuZ2V0KGlkKTtcbiAgICAgIHN3aXRjaCAobm9kZS5ncm91cCkge1xuICAgICAgY2FzZSAnX2NsYXNzJzpcbiAgICAgICAgdGhpcy50YXJnZXQgPSAkKCcjY2xhc3MtY29udGV4dC1tZW51JywgdGVtcGxhdGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ29udG9sb2d5JzpcbiAgICAgICAgdGhpcy50YXJnZXQgPSAkKCcjb250b2xvZ3ktY29udGV4dC1tZW51JywgdGVtcGxhdGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2RhdGF0eXBlUHJvcGVydHknOlxuICAgICAgY2FzZSAnb2JqZWN0UHJvcGVydHknOlxuICAgICAgICB0aGlzLnRhcmdldCA9ICQoJyNwcm9wZXJ0eS1jb250ZXh0LW1lbnUnLCB0ZW1wbGF0ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndGVtcGxhdGUnOlxuICAgICAgICB0aGlzLnRhcmdldCA9ICQoJyN0ZW1wbGF0ZS1jb250ZXh0LW1lbnUnLCB0ZW1wbGF0ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc3BlY2lmaWNhdGlvbic6XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gJCgnI3NwZWNpZmljYXRpb24tY29udGV4dC1tZW51JywgdGVtcGxhdGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gJCgnI2luZGl2aWR1YWwtY29udGV4dC1tZW51JywgdGVtcGxhdGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgb25JdGVtOiBmdW5jdGlvbiAoY29udGV4dCwgZSkge1xuICAgICAgY29uc3QgaWQgPSBzZWxlY3Qubm9kZXNbMF07XG4gICAgICBzd2l0Y2ggKGUudGFyZ2V0LmlkKSB7XG4gICAgICBjYXNlICdvdXQtbGlua3MnOlxuICAgICAgICBhZGRPdXRMaW5rcyhpZCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaW4tbGlua3MnOlxuICAgICAgICBhZGRJbkxpbmtzKGlkKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdkZWxldGUnOlxuICAgICAgICBub2Rlcy5yZW1vdmUoc2VsZWN0Lm5vZGVzKTtcbiAgICAgICAgZWRnZXMucmVtb3ZlKHNlbGVjdC5lZGdlcyk7XG4gICAgICAgIHNlbGVjdC5ub2RlcyA9IHNlbGVjdC5lZGdlcyA9IFtdO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2RlbGV0ZS13aXRoLW91dCc6XG4gICAgICAgIGRlbGV0ZVdpdGhPdXRMaW5rcyhpZCk7XG4gICAgICAgIHNlbGVjdC5ub2RlcyA9IHNlbGVjdC5lZGdlcyA9IFtdO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2RlbGV0ZS13aXRoLWluJzpcbiAgICAgICAgZGVsZXRlV2l0aEluTGlua3MoaWQpO1xuICAgICAgICBzZWxlY3Qubm9kZXMgPSBzZWxlY3QuZWRnZXMgPSBbXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjbGFzcy1pbmRpdmlkdWFscyc6XG4gICAgICAgIGFkZEluTGlua3MoaWQsIFwiJ3JkZjp0eXBlJz09PSd7aWR9J1wiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjbGFzcy1zdWJjbGFzc2VzJzpcbiAgICAgICAgYWRkSW5MaW5rcyhpZCwgXCIoJ3JkZjp0eXBlJz09PSdvd2w6Q2xhc3MnfHwncmRmOnR5cGUnPT09J3JkZnM6Q2xhc3MnKSYmJ3JkZnM6c3ViQ2xhc3NPZic9PT0ne2lkfSdcIik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY2xhc3MtcHJvcGVydGllcyc6XG4gICAgICAgIGFkZEluTGlua3MoaWQsIFwiJ3JkZnM6ZG9tYWluJz09PSd7aWR9J1wiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjbGFzcy10ZW1wbGF0ZXMnOlxuICAgICAgICBhZGRJbkxpbmtzKGlkLCBcIidyZGY6dHlwZSc9PT0ndi11aTpDbGFzc1RlbXBsYXRlJyYmJ3YtdWk6Zm9yQ2xhc3MnPT09J3tpZH0nXCIpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NsYXNzLXNwZWNpZmljYXRpb25zJzpcbiAgICAgICAgYWRkSW5MaW5rcyhcbiAgICAgICAgICBpZCxcbiAgICAgICAgICBcIigncmRmOnR5cGUnPT09J3YtdWk6UHJvcGVydHlTcGVjaWZpY2F0aW9uJyB8fCBcIiArXG4gICAgICAgICAgICAgIFwiJ3JkZjp0eXBlJz09PSd2LXVpOkRhdGF0eXBlUHJvcGVydHlTcGVjaWZpY2F0aW9uJyB8fCBcIiArXG4gICAgICAgICAgICAgIFwiJ3JkZjp0eXBlJz09PSd2LXVpOk9iamVjdFByb3BlcnR5U3BlY2lmaWNhdGlvbidcIiArXG4gICAgICAgICAgICAgIFwiKSYmJ3YtdWk6Zm9yQ2xhc3MnPT09J3tpZH0nXCIsXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncHJvcGVydHktc3BlY2lmaWNhdGlvbnMnOlxuICAgICAgICBhZGRJbkxpbmtzKFxuICAgICAgICAgIGlkLFxuICAgICAgICAgIFwiKCdyZGY6dHlwZSc9PT0ndi11aTpQcm9wZXJ0eVNwZWNpZmljYXRpb24nIHx8IFwiICtcbiAgICAgICAgICAgICAgXCIncmRmOnR5cGUnPT09J3YtdWk6RGF0YXR5cGVQcm9wZXJ0eVNwZWNpZmljYXRpb24nIHx8IFwiICtcbiAgICAgICAgICAgICAgXCIncmRmOnR5cGUnPT09J3YtdWk6T2JqZWN0UHJvcGVydHlTcGVjaWZpY2F0aW9uJ1wiICtcbiAgICAgICAgICAgICAgXCIpJiYndi11aTpmb3JQcm9wZXJ0eSc9PSd7aWR9J1wiLFxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9LFxuICB9KTtcblxuICBmdW5jdGlvbiBhZGROb2RlIChpbmRpdmlkdWFsKSB7XG4gICAgcmV0dXJuIGluZGl2aWR1YWwubG9hZCgpLnRoZW4oZnVuY3Rpb24gKGluZGl2aWR1YWwpIHtcbiAgICAgIGlmIChub2Rlcy5nZXQoaW5kaXZpZHVhbC5pZCkgPT09IG51bGwpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHtcbiAgICAgICAgICBpZDogaW5kaXZpZHVhbC5pZCxcbiAgICAgICAgICBsYWJlbDogaW5kaXZpZHVhbFsncmRmOnR5cGUnXVswXS50b1N0cmluZygpICsgJ1xcbicgKyBpbmRpdmlkdWFsLnRvU3RyaW5nKCksXG4gICAgICAgICAgaW5kaXZpZHVhbDogaW5kaXZpZHVhbCxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGluZGl2aWR1YWxbJ3JkZjp0eXBlJ11bMF0pIHtcbiAgICAgICAgICBzd2l0Y2ggKGluZGl2aWR1YWxbJ3JkZjp0eXBlJ11bMF0uaWQpIHtcbiAgICAgICAgICBjYXNlICdyZGZzOkNsYXNzJzpcbiAgICAgICAgICBjYXNlICdvd2w6Q2xhc3MnOlxuICAgICAgICAgICAgbm9kZS5ncm91cCA9ICdfY2xhc3MnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncmRmOlByb3BlcnR5JzpcbiAgICAgICAgICBjYXNlICdvd2w6T2JqZWN0UHJvcGVydHknOlxuICAgICAgICAgICAgbm9kZS5ncm91cCA9ICdvYmplY3RQcm9wZXJ0eSc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdvd2w6RGF0YXR5cGVQcm9wZXJ0eSc6XG4gICAgICAgICAgY2FzZSAnb3dsOk9udG9sb2d5UHJvcGVydHknOlxuICAgICAgICAgIGNhc2UgJ293bDpBbm5vdGF0aW9uUHJvcGVydHknOlxuICAgICAgICAgICAgbm9kZS5ncm91cCA9ICdkYXRhdHlwZVByb3BlcnR5JztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3YtdWk6Q2xhc3NUZW1wbGF0ZSc6XG4gICAgICAgICAgICBub2RlLmdyb3VwID0gJ3RlbXBsYXRlJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3YtdWk6UHJvcGVydHlTcGVjaWZpY2F0aW9uJzpcbiAgICAgICAgICBjYXNlICd2LXVpOkRhdGF0eXBlUHJvcGVydHlTcGVjaWZpY2F0aW9uJzpcbiAgICAgICAgICBjYXNlICd2LXVpOk9iamVjdFByb3BlcnR5U3BlY2lmaWNhdGlvbic6XG4gICAgICAgICAgICBub2RlLmdyb3VwID0gJ3NwZWNpZmljYXRpb24nO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnb3dsOk9udG9sb2d5JzpcbiAgICAgICAgICAgIG5vZGUuZ3JvdXAgPSAnb250b2xvZ3knO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIG5vZGUuZ3JvdXAgPSAnaW5kaXZpZHVhbCc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbm9kZXMuYWRkKFtub2RlXSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRPdXRMaW5rcyAoaWQpIHtcbiAgICBjb25zdCBpbmRpdmlkdWFsID0gbm9kZXMuZ2V0KGlkKS5pbmRpdmlkdWFsO1xuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGluZGl2aWR1YWwucHJvcGVydGllcykuZm9yRWFjaChmdW5jdGlvbiAocHJvcGVydHlfdXJpKSB7XG4gICAgICBpZiAocHJvcGVydHlfdXJpID09PSAnQCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaW5kaXZpZHVhbFtwcm9wZXJ0eV91cmldLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEluZGl2aWR1YWxNb2RlbCAmJiB2YWx1ZSAhPT0gaW5kaXZpZHVhbCkge1xuICAgICAgICAgIGFkZE5vZGUodmFsdWUpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc3QgZnJvbSA9IGluZGl2aWR1YWwuaWQ7XG4gICAgICAgICAgICBjb25zdCB0byA9IHZhbHVlLmlkO1xuICAgICAgICAgICAgY29uc3QgbGFiZWwgPSBuZXcgSW5kaXZpZHVhbE1vZGVsKHByb3BlcnR5X3VyaSlbJ3JkZnM6bGFiZWwnXS5tYXAoQ29tbW9uVXRpbC5mb3JtYXRWYWx1ZSkuam9pbignICcpO1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgZmlsdGVyOiBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmZyb20gPT0gZnJvbSAmJiBpdGVtLnRvID09IHRvICYmIGl0ZW0ubGFiZWwudG9TdHJpbmcoKSA9PSBsYWJlbDtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoIWVkZ2VzLmdldChvcHRpb25zKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgZWRnZXMuYWRkKFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBmcm9tOiBmcm9tLFxuICAgICAgICAgICAgICAgICAgdG86IHRvLFxuICAgICAgICAgICAgICAgICAgbGFiZWw6IGxhYmVsLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZEluTGlua3MgKGlkLCBxdWVyeVN0cikge1xuICAgIGxldCBxID0gcXVlcnlTdHIgfHwgXCInKic9PSd7aWR9J1wiO1xuICAgIHEgPSBxLnJlcGxhY2UoJ3tpZH0nLCBpZCk7XG4gICAgcmV0dXJuIEJhY2tlbmQucXVlcnkodmVkYS50aWNrZXQsIHEpLnRoZW4oZnVuY3Rpb24gKHF1ZXJ5UmVzdWx0KSB7XG4gICAgICBjb25zdCB1cmlzID0gcXVlcnlSZXN1bHQucmVzdWx0O1xuICAgICAgcmV0dXJuIEJhY2tlbmQuZ2V0X2luZGl2aWR1YWxzKHZlZGEudGlja2V0LCB1cmlzKS50aGVuKGZ1bmN0aW9uIChpbmRpdmlkdWFsc0pTT05zKSB7XG4gICAgICAgIGluZGl2aWR1YWxzSlNPTnMuZm9yRWFjaChmdW5jdGlvbiAoaW5kaXZpZHVhbEpTT04pIHtcbiAgICAgICAgICBjb25zdCByZXMgPSBuZXcgSW5kaXZpZHVhbE1vZGVsKGluZGl2aWR1YWxKU09OKTtcbiAgICAgICAgICBhZGROb2RlKHJlcyk7XG4gICAgICAgICAgY29uc3QgdG8gPSBpZDtcbiAgICAgICAgICBjb25zdCBmcm9tID0gcmVzLmlkO1xuICAgICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHJlcy5wcm9wZXJ0aWVzKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eV91cmkpIHtcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0eV91cmkgPT09ICdAJykge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVzLmhhc1ZhbHVlKHByb3BlcnR5X3VyaSwgaWQpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gbmV3IEluZGl2aWR1YWxNb2RlbChwcm9wZXJ0eV91cmkpWydyZGZzOmxhYmVsJ10ubWFwKENvbW1vblV0aWwuZm9ybWF0VmFsdWUpLmpvaW4oJyAnKTtcbiAgICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5mcm9tID09PSBmcm9tICYmIGl0ZW0udG8gPT09IHRvICYmIGl0ZW0ubGFiZWwudG9TdHJpbmcoKSA9PT0gbGFiZWw7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgaWYgKCFlZGdlcy5nZXQob3B0aW9ucykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZWRnZXMuYWRkKFt7ZnJvbTogZnJvbSwgdG86IHRvLCBsYWJlbDogbGFiZWx9XSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlbGV0ZVdpdGhPdXRMaW5rcyAoaWQpIHtcbiAgICBub2Rlcy5yZW1vdmUoaWQpO1xuICAgIGNvbnN0IG5vZGVzVG9SZW1vdmUgPSBbXTtcbiAgICBjb25zdCBlZGdlc1RvUmVtb3ZlID0gZWRnZXMuZ2V0KHtcbiAgICAgIGZpbHRlcjogZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgaWYgKGl0ZW0uZnJvbSA9PSBpZCkge1xuICAgICAgICAgIG5vZGVzVG9SZW1vdmUucHVzaChpdGVtLnRvKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXRlbS5mcm9tID09IGlkIHx8IGl0ZW0udG8gPT0gaWQ7XG4gICAgICB9LFxuICAgIH0pO1xuICAgIGVkZ2VzLnJlbW92ZShlZGdlc1RvUmVtb3ZlKTtcbiAgICBub2Rlcy5yZW1vdmUobm9kZXNUb1JlbW92ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWxldGVXaXRoSW5MaW5rcyAoaWQpIHtcbiAgICBub2Rlcy5yZW1vdmUoaWQpO1xuICAgIGNvbnN0IG5vZGVzVG9SZW1vdmUgPSBbXTtcbiAgICBjb25zdCBlZGdlc1RvUmVtb3ZlID0gZWRnZXMuZ2V0KHtcbiAgICAgIGZpbHRlcjogZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgaWYgKGl0ZW0udG8gPT0gaWQpIHtcbiAgICAgICAgICBub2Rlc1RvUmVtb3ZlLnB1c2goaXRlbS5mcm9tKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXRlbS5mcm9tID09IGlkIHx8IGl0ZW0udG8gPT0gaWQ7XG4gICAgICB9LFxuICAgIH0pO1xuICAgIGVkZ2VzLnJlbW92ZShlZGdlc1RvUmVtb3ZlKTtcbiAgICBub2Rlcy5yZW1vdmUobm9kZXNUb1JlbW92ZSk7XG4gIH1cblxuICAvLyBFdmVudCBoYW5kbGVyc1xuICBmdW5jdGlvbiBvblNlbGVjdCAoc2VsZWN0ZWQpIHtcbiAgICBzZWxlY3QgPSBzZWxlY3RlZDtcbiAgICBib2R5Lm9mZigna2V5ZG93bicsIHNlbGVjdGVkS2V5ZG93bkhhbmRsZXIpO1xuICAgIGJvZHkub25lKCdrZXlkb3duJywgc2VsZWN0ZWQsIHNlbGVjdGVkS2V5ZG93bkhhbmRsZXIpO1xuICB9XG4gIGZ1bmN0aW9uIHNlbGVjdGVkS2V5ZG93bkhhbmRsZXIgKGUpIHtcbiAgICBpZiAoZS53aGljaCA9PSA0Nikge1xuICAgICAgbm9kZXMucmVtb3ZlKGUuZGF0YS5ub2Rlcyk7XG4gICAgICBlZGdlcy5yZW1vdmUoZS5kYXRhLmVkZ2VzKTtcbiAgICB9XG4gICAgaWYgKGUud2hpY2ggPT0gNzMpIHtcbiAgICAgIGFkZEluTGlua3MoZS5kYXRhLm5vZGVzWzBdKTtcbiAgICB9XG4gICAgaWYgKGUud2hpY2ggPT0gNzkpIHtcbiAgICAgIGFkZE91dExpbmtzKGUuZGF0YS5ub2Rlc1swXSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25Eb3VibGVDbGljayAoc2VsZWN0ZWQpIHtcbiAgICBpZiAoIXNlbGVjdGVkLm5vZGVzLmxlbmd0aCkgcmV0dXJuO1xuICAgIGNvbnN0IGluZGl2aWR1YWxfdXJpID0gc2VsZWN0ZWQubm9kZXNbMF07XG4gICAgY29uc3QgbW9kYWxUbXBsID0gJCgnI2luZGl2aWR1YWwtbW9kYWwtdGVtcGxhdGUnKS5odG1sKCk7XG4gICAgY29uc3QgbW9kYWwgPSAkKG1vZGFsVG1wbCk7XG4gICAgY29uc3QgbW9kYWxCb2R5ID0gJCgnLm1vZGFsLWJvZHknLCBtb2RhbCk7XG4gICAgY29uc3QgaW5kaXZpZHVhbCA9IG5ldyBJbmRpdmlkdWFsTW9kZWwoaW5kaXZpZHVhbF91cmkpO1xuICAgIGluZGl2aWR1YWwucHJlc2VudChtb2RhbEJvZHkpO1xuICAgIG1vZGFsLm9uZSgncmVtb3ZlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIG1vZGFsLm1vZGFsKCdoaWRlJyk7XG4gICAgfSk7XG4gICAgbW9kYWwubW9kYWwoKTtcbiAgICAkKCcjbWFpbicpLmFwcGVuZChtb2RhbCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBodG1sID0gYFxuICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyLWZsdWlkIHNoZWV0XCI+XG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgaWQ9XCJmcmVlemVcIiBjbGFzcz1cImJ0biBidG4tc3VjY2Vzc1wiPjxpIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1wYXVzZVwiPjwvaT48L2J1dHRvbj5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBpZD1cImV4cG9ydC10dGxcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiPlxuICAgICAgPGkgY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWV4cG9ydFwiPjwvaT4gPHNwYW4gYWJvdXQ9XCJ2LXVpOkV4cG9ydFRvVFRMXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuXG4gICAgPGRpdiBpZD1cImdyYXBoXCI+PC9kaXY+XG5cbiAgICA8ZGl2IGlkPVwiaW5kaXZpZHVhbC1jb250ZXh0LW1lbnVcIj5cbiAgICAgIDx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIiByb2xlPVwibWVudVwiPlxuICAgICAgICA8bGkgcm9sZT1cInByZXNlbnRhdGlvblwiIGNsYXNzPVwiZHJvcGRvd24taGVhZGVyXCI+0JjQvdC00LjQstC40LQ8L2xpPlxuICAgICAgICA8bGkgcm9sZT1cInByZXNlbnRhdGlvblwiIGNsYXNzPVwiZGl2aWRlclwiPjwvbGk+XG4gICAgICAgIDxsaT48YSB0YWJpbmRleD1cIi0xXCIgaWQ9XCJvdXQtbGlua3NcIj7QktGB0LUg0LjRgdGF0L7QtNGP0YnQuNC1INGB0YHRi9C70LrQuDwvYT48L2xpPlxuICAgICAgICA8bGk+PGEgdGFiaW5kZXg9XCItMVwiIGlkPVwiaW4tbGlua3NcIj7QktGB0LUg0LLRhdC+0LTRj9GJ0LjQtSDRgdGB0YvQu9C60Lg8L2E+PC9saT5cbiAgICAgICAgPGxpIHJvbGU9XCJwcmVzZW50YXRpb25cIiBjbGFzcz1cImRpdmlkZXJcIj48L2xpPlxuICAgICAgICA8bGk+PGEgdGFiaW5kZXg9XCItMVwiIGlkPVwiZGVsZXRlXCI+0KPQtNCw0LvQuNGC0Yw8L2E+PC9saT5cbiAgICAgICAgPGxpPjxhIHRhYmluZGV4PVwiLTFcIiBpZD1cImRlbGV0ZS13aXRoLW91dFwiPtCj0LTQsNC70LjRgtGMINGBINC40YHRhdC+0LTRj9GJ0LjQvNC4PC9hPjwvbGk+XG4gICAgICAgIDxsaT48YSB0YWJpbmRleD1cIi0xXCIgaWQ9XCJkZWxldGUtd2l0aC1pblwiPtCj0LTQsNC70LjRgtGMINGBINCy0YXQvtC00Y/RidC40LzQuDwvYT48L2xpPlxuICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGlkPVwiY2xhc3MtY29udGV4dC1tZW51XCI+XG4gICAgICA8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCIgcm9sZT1cIm1lbnVcIj5cbiAgICAgICAgPGxpIHJvbGU9XCJwcmVzZW50YXRpb25cIiBjbGFzcz1cImRyb3Bkb3duLWhlYWRlclwiPtCa0LvQsNGB0YE8L2xpPlxuICAgICAgICA8bGk+PGEgdGFiaW5kZXg9XCItMVwiIGlkPVwiY2xhc3MtaW5kaXZpZHVhbHNcIj7QktGB0LUg0LjQvdC00LjQstC40LTRizwvYT48L2xpPlxuICAgICAgICA8bGk+PGEgdGFiaW5kZXg9XCItMVwiIGlkPVwiY2xhc3Mtc3ViY2xhc3Nlc1wiPtCS0YHQtSDQv9C+0LTQutC70LDRgdGB0Ys8L2E+PC9saT5cbiAgICAgICAgPGxpPjxhIHRhYmluZGV4PVwiLTFcIiBpZD1cImNsYXNzLXByb3BlcnRpZXNcIj7QodCy0L7QudGB0YLQstCwINC60LvQsNGB0YHQsDwvYT48L2xpPlxuICAgICAgICA8bGk+PGEgdGFiaW5kZXg9XCItMVwiIGlkPVwiY2xhc3MtdGVtcGxhdGVzXCI+0KjQsNCx0LvQvtC90Ysg0LrQu9Cw0YHRgdCwPC9hPjwvbGk+XG4gICAgICAgIDxsaT48YSB0YWJpbmRleD1cIi0xXCIgaWQ9XCJjbGFzcy1zcGVjaWZpY2F0aW9uc1wiPtCh0L/QtdGG0LjRhNC40LrQsNGG0LjQuCDQutC70LDRgdGB0LA8L2E+PC9saT5cbiAgICAgICAgPGxpIHJvbGU9XCJwcmVzZW50YXRpb25cIiBjbGFzcz1cImRpdmlkZXJcIj48L2xpPlxuICAgICAgICA8bGk+PGEgdGFiaW5kZXg9XCItMVwiIGlkPVwib3V0LWxpbmtzXCI+0JLRgdC1INC40YHRhdC+0LTRj9GJ0LjQtSDRgdGB0YvQu9C60Lg8L2E+PC9saT5cbiAgICAgICAgPGxpPjxhIHRhYmluZGV4PVwiLTFcIiBpZD1cImluLWxpbmtzXCI+0JLRgdC1INCy0YXQvtC00Y/RidC40LUg0YHRgdGL0LvQutC4PC9hPjwvbGk+XG4gICAgICAgIDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCIgY2xhc3M9XCJkaXZpZGVyXCI+PC9saT5cbiAgICAgICAgPGxpPjxhIHRhYmluZGV4PVwiLTFcIiBpZD1cImRlbGV0ZVwiPtCj0LTQsNC70LjRgtGMPC9hPjwvbGk+XG4gICAgICAgIDxsaT48YSB0YWJpbmRleD1cIi0xXCIgaWQ9XCJkZWxldGUtd2l0aC1vdXRcIj7Qo9C00LDQu9C40YLRjCDRgSDQuNGB0YXQvtC00Y/RidC40LzQuDwvYT48L2xpPlxuICAgICAgICA8bGk+PGEgdGFiaW5kZXg9XCItMVwiIGlkPVwiZGVsZXRlLXdpdGgtaW5cIj7Qo9C00LDQu9C40YLRjCDRgSDQstGF0L7QtNGP0YnQuNC80Lg8L2E+PC9saT5cbiAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBpZD1cInByb3BlcnR5LWNvbnRleHQtbWVudVwiPlxuICAgICAgPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiIHJvbGU9XCJtZW51XCI+XG4gICAgICAgIDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCIgY2xhc3M9XCJkcm9wZG93bi1oZWFkZXJcIj7QodCy0L7QudGB0YLQstC+PC9saT5cbiAgICAgICAgPGxpPjxhIHRhYmluZGV4PVwiLTFcIiBpZD1cInByb3BlcnR5LXNwZWNpZmljYXRpb25zXCI+0KHQv9C10YbQuNGE0LjQutCw0YbQuNC4INGB0LLQvtC50YHRgtCy0LA8L2E+PC9saT5cbiAgICAgICAgPGxpIHJvbGU9XCJwcmVzZW50YXRpb25cIiBjbGFzcz1cImRpdmlkZXJcIj48L2xpPlxuICAgICAgICA8bGk+PGEgdGFiaW5kZXg9XCItMVwiIGlkPVwib3V0LWxpbmtzXCI+0JLRgdC1INC40YHRhdC+0LTRj9GJ0LjQtSDRgdGB0YvQu9C60Lg8L2E+PC9saT5cbiAgICAgICAgPGxpPjxhIHRhYmluZGV4PVwiLTFcIiBpZD1cImluLWxpbmtzXCI+0JLRgdC1INCy0YXQvtC00Y/RidC40LUg0YHRgdGL0LvQutC4PC9hPjwvbGk+XG4gICAgICAgIDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCIgY2xhc3M9XCJkaXZpZGVyXCI+PC9saT5cbiAgICAgICAgPGxpPjxhIHRhYmluZGV4PVwiLTFcIiBpZD1cImRlbGV0ZVwiPtCj0LTQsNC70LjRgtGMPC9hPjwvbGk+XG4gICAgICAgIDxsaT48YSB0YWJpbmRleD1cIi0xXCIgaWQ9XCJkZWxldGUtd2l0aC1vdXRcIj7Qo9C00LDQu9C40YLRjCDRgSDQuNGB0YXQvtC00Y/RidC40LzQuDwvYT48L2xpPlxuICAgICAgICA8bGk+PGEgdGFiaW5kZXg9XCItMVwiIGlkPVwiZGVsZXRlLXdpdGgtaW5cIj7Qo9C00LDQu9C40YLRjCDRgSDQstGF0L7QtNGP0YnQuNC80Lg8L2E+PC9saT5cbiAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBpZD1cIm9udG9sb2d5LWNvbnRleHQtbWVudVwiPlxuICAgICAgPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiIHJvbGU9XCJtZW51XCI+XG4gICAgICAgIDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCIgY2xhc3M9XCJkcm9wZG93bi1oZWFkZXJcIj7QntC90YLQvtC70L7Qs9C40Y88L2xpPlxuICAgICAgICA8bGkgcm9sZT1cInByZXNlbnRhdGlvblwiIGNsYXNzPVwiZGl2aWRlclwiPjwvbGk+XG4gICAgICAgIDxsaT48YSB0YWJpbmRleD1cIi0xXCIgaWQ9XCJvdXQtbGlua3NcIj7QktGB0LUg0LjRgdGF0L7QtNGP0YnQuNC1INGB0YHRi9C70LrQuDwvYT48L2xpPlxuICAgICAgICA8bGk+PGEgdGFiaW5kZXg9XCItMVwiIGlkPVwiaW4tbGlua3NcIj7QktGB0LUg0LLRhdC+0LTRj9GJ0LjQtSDRgdGB0YvQu9C60Lg8L2E+PC9saT5cbiAgICAgICAgPGxpIHJvbGU9XCJwcmVzZW50YXRpb25cIiBjbGFzcz1cImRpdmlkZXJcIj48L2xpPlxuICAgICAgICA8bGk+PGEgdGFiaW5kZXg9XCItMVwiIGlkPVwiZGVsZXRlXCI+0KPQtNCw0LvQuNGC0Yw8L2E+PC9saT5cbiAgICAgICAgPGxpPjxhIHRhYmluZGV4PVwiLTFcIiBpZD1cImRlbGV0ZS13aXRoLW91dFwiPtCj0LTQsNC70LjRgtGMINGBINC40YHRhdC+0LTRj9GJ0LjQvNC4PC9hPjwvbGk+XG4gICAgICAgIDxsaT48YSB0YWJpbmRleD1cIi0xXCIgaWQ9XCJkZWxldGUtd2l0aC1pblwiPtCj0LTQsNC70LjRgtGMINGBINCy0YXQvtC00Y/RidC40LzQuDwvYT48L2xpPlxuICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGlkPVwidGVtcGxhdGUtY29udGV4dC1tZW51XCI+XG4gICAgICA8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCIgcm9sZT1cIm1lbnVcIj5cbiAgICAgICAgPGxpIHJvbGU9XCJwcmVzZW50YXRpb25cIiBjbGFzcz1cImRyb3Bkb3duLWhlYWRlclwiPtCo0LDQsdC70L7QvTwvbGk+XG4gICAgICAgIDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCIgY2xhc3M9XCJkaXZpZGVyXCI+PC9saT5cbiAgICAgICAgPGxpPjxhIHRhYmluZGV4PVwiLTFcIiBpZD1cIm91dC1saW5rc1wiPtCS0YHQtSDQuNGB0YXQvtC00Y/RidC40LUg0YHRgdGL0LvQutC4PC9hPjwvbGk+XG4gICAgICAgIDxsaT48YSB0YWJpbmRleD1cIi0xXCIgaWQ9XCJpbi1saW5rc1wiPtCS0YHQtSDQstGF0L7QtNGP0YnQuNC1INGB0YHRi9C70LrQuDwvYT48L2xpPlxuICAgICAgICA8bGkgcm9sZT1cInByZXNlbnRhdGlvblwiIGNsYXNzPVwiZGl2aWRlclwiPjwvbGk+XG4gICAgICAgIDxsaT48YSB0YWJpbmRleD1cIi0xXCIgaWQ9XCJkZWxldGVcIj7Qo9C00LDQu9C40YLRjDwvYT48L2xpPlxuICAgICAgICA8bGk+PGEgdGFiaW5kZXg9XCItMVwiIGlkPVwiZGVsZXRlLXdpdGgtb3V0XCI+0KPQtNCw0LvQuNGC0Ywg0YEg0LjRgdGF0L7QtNGP0YnQuNC80Lg8L2E+PC9saT5cbiAgICAgICAgPGxpPjxhIHRhYmluZGV4PVwiLTFcIiBpZD1cImRlbGV0ZS13aXRoLWluXCI+0KPQtNCw0LvQuNGC0Ywg0YEg0LLRhdC+0LTRj9GJ0LjQvNC4PC9hPjwvbGk+XG4gICAgICA8L3VsPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgaWQ9XCJzcGVjaWZpY2F0aW9uLWNvbnRleHQtbWVudVwiPlxuICAgICAgPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiIHJvbGU9XCJtZW51XCI+XG4gICAgICAgIDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCIgY2xhc3M9XCJkcm9wZG93bi1oZWFkZXJcIj7QodC/0LXRhtC40YTQuNC60LDRhtC40Y88L2xpPlxuICAgICAgICA8bGkgcm9sZT1cInByZXNlbnRhdGlvblwiIGNsYXNzPVwiZGl2aWRlclwiPjwvbGk+XG4gICAgICAgIDxsaT48YSB0YWJpbmRleD1cIi0xXCIgaWQ9XCJvdXQtbGlua3NcIj7QktGB0LUg0LjRgdGF0L7QtNGP0YnQuNC1INGB0YHRi9C70LrQuDwvYT48L2xpPlxuICAgICAgICA8bGk+PGEgdGFiaW5kZXg9XCItMVwiIGlkPVwiaW4tbGlua3NcIj7QktGB0LUg0LLRhdC+0LTRj9GJ0LjQtSDRgdGB0YvQu9C60Lg8L2E+PC9saT5cbiAgICAgICAgPGxpIHJvbGU9XCJwcmVzZW50YXRpb25cIiBjbGFzcz1cImRpdmlkZXJcIj48L2xpPlxuICAgICAgICA8bGk+PGEgdGFiaW5kZXg9XCItMVwiIGlkPVwiZGVsZXRlXCI+0KPQtNCw0LvQuNGC0Yw8L2E+PC9saT5cbiAgICAgICAgPGxpPjxhIHRhYmluZGV4PVwiLTFcIiBpZD1cImRlbGV0ZS13aXRoLW91dFwiPtCj0LTQsNC70LjRgtGMINGBINC40YHRhdC+0LTRj9GJ0LjQvNC4PC9hPjwvbGk+XG4gICAgICAgIDxsaT48YSB0YWJpbmRleD1cIi0xXCIgaWQ9XCJkZWxldGUtd2l0aC1pblwiPtCj0LTQsNC70LjRgtGMINGBINCy0YXQvtC00Y/RidC40LzQuDwvYT48L2xpPlxuICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5gO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7TUFBT0EsV0FBVyxHQUFBQyxnQkFBQSxDQUFBQyxPQUFBO0lBQUEsYUFBQUMsZUFBQTtNQUNYQyxVQUFVLEdBQUFELGVBQUEsQ0FBQUQsT0FBQTtJQUFBLGFBQUFHLE9BQUE7TUFDVkMsQ0FBQyxHQUFBRCxPQUFBLENBQUFILE9BQUE7SUFBQSxhQUFBSyxlQUFBO01BQ0RDLElBQUksR0FBQUQsZUFBQSxDQUFBTCxPQUFBO0lBQUEsYUFBQU8sMkJBQUE7TUFDSkMsZUFBZSxHQUFBRCwyQkFBQSxDQUFBUCxPQUFBO0lBQUEsYUFBQVMsa0JBQUE7TUFDZkMsT0FBTyxHQUFBRCxrQkFBQSxDQUFBVCxPQUFBO0lBQUEsYUFBQVcsSUFBQTtNQUNQQyxHQUFHLEdBQUFELElBQUEsQ0FBQVgsT0FBQTtJQUFBLGFBQUFhLFlBQUE7SUFBQUMsT0FBQSxXQUFBQSxDQUFBO01BQUFDLE9BQUEsU0FHR0MsSUFBSSxHQUFHLFNBQVBBLElBQUlBLENBQWFDLFVBQVUsRUFBRUMsUUFBUSxFQUFFQyxTQUFTLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFO1FBQzFFSCxRQUFRLEdBQUdkLENBQUMsQ0FBQ2MsUUFBUSxDQUFDO1FBQ3RCQyxTQUFTLEdBQUdmLENBQUMsQ0FBQ2UsU0FBUyxDQUFDOztRQUV4QjtRQUNBLElBQU1HLElBQUksR0FBR0wsVUFBVTtRQUN2QixJQUFNTSxLQUFLLEdBQUcsSUFBSVgsR0FBRyxDQUFDWSxPQUFPLEVBQUU7UUFDL0IsSUFBTUMsS0FBSyxHQUFHLElBQUliLEdBQUcsQ0FBQ1ksT0FBTyxFQUFFO1FBQy9CLElBQU1FLElBQUksR0FBR3RCLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDdEIsSUFBSXVCLE1BQU0sR0FBRztVQUFDSixLQUFLLEVBQUUsRUFBRTtVQUFFRSxLQUFLLEVBQUU7UUFBRSxDQUFDO1FBQ25DLElBQU1HLElBQUksR0FBRztVQUNYTCxLQUFLLEVBQUVBLEtBQUs7VUFDWkUsS0FBSyxFQUFFQTtRQUNULENBQUM7UUFFREksT0FBTyxDQUFDUCxJQUFJLENBQUMsQ0FBQ1EsSUFBSSxDQUFDLFlBQVk7VUFDN0JDLFdBQVcsQ0FBQ1QsSUFBSSxDQUFDVSxFQUFFLENBQUM7VUFDcEJDLFVBQVUsQ0FBQ1gsSUFBSSxDQUFDVSxFQUFFLENBQUM7UUFDckIsQ0FBQyxDQUFDO1FBRUYsSUFBTUUsS0FBSyxHQUFHOUIsQ0FBQyxDQUFDLFFBQVEsRUFBRWMsUUFBUSxDQUFDO1FBRW5DLElBQU1pQixNQUFNLEdBQUcvQixDQUFDLENBQUMsWUFBWSxDQUFDLENBQUNnQyxNQUFNLEVBQUUsQ0FBQ0MsR0FBRyxHQUFHSCxLQUFLLENBQUNFLE1BQU0sRUFBRSxDQUFDQyxHQUFHLEdBQUcsRUFBRSxHQUFHLElBQUk7UUFDNUUsSUFBTUMsT0FBTyxHQUFHO1VBQ2RDLEtBQUssRUFBRSxNQUFNO1VBQ2JKLE1BQU0sRUFBRUEsTUFBTTtVQUNkWixLQUFLLEVBQUU7WUFDTGlCLEtBQUssRUFBRTtVQUNULENBQUM7VUFDRGYsS0FBSyxFQUFFO1lBQ0xnQixNQUFNLEVBQUU7VUFDVixDQUFDO1VBQ0RDLE1BQU0sRUFBRTtZQUNOQyxNQUFNLEVBQUU7Y0FDTkMsS0FBSyxFQUFFO2dCQUNMQyxNQUFNLEVBQUUsT0FBTztnQkFDZkMsVUFBVSxFQUFFLFlBQVk7Z0JBQ3hCQyxTQUFTLEVBQUU7a0JBQ1RGLE1BQU0sRUFBRSxPQUFPO2tCQUNmQyxVQUFVLEVBQUU7Z0JBQ2Q7Y0FDRjtZQUNGLENBQUM7WUFDREUsZ0JBQWdCLEVBQUU7Y0FDaEJKLEtBQUssRUFBRTtnQkFDTEMsTUFBTSxFQUFFLFdBQVc7Z0JBQ25CQyxVQUFVLEVBQUUsTUFBTTtnQkFDbEJDLFNBQVMsRUFBRTtrQkFDVEYsTUFBTSxFQUFFLFdBQVc7a0JBQ25CQyxVQUFVLEVBQUU7Z0JBQ2Q7Y0FDRjtZQUNGLENBQUM7WUFDREcsY0FBYyxFQUFFO2NBQ2RMLEtBQUssRUFBRTtnQkFDTEMsTUFBTSxFQUFFLFlBQVk7Z0JBQ3BCQyxVQUFVLEVBQUUsUUFBUTtnQkFDcEJDLFNBQVMsRUFBRTtrQkFDVEYsTUFBTSxFQUFFLFlBQVk7a0JBQ3BCQyxVQUFVLEVBQUU7Z0JBQ2Q7Y0FDRjtZQUNGLENBQUM7WUFDRDVCLFFBQVEsRUFBRTtjQUNSMEIsS0FBSyxFQUFFO2dCQUNMQyxNQUFNLEVBQUUsWUFBWTtnQkFDcEJDLFVBQVUsRUFBRSxRQUFRO2dCQUNwQkMsU0FBUyxFQUFFO2tCQUNURixNQUFNLEVBQUUsWUFBWTtrQkFDcEJDLFVBQVUsRUFBRTtnQkFDZDtjQUNGO1lBQ0YsQ0FBQztZQUNESSxhQUFhLEVBQUU7Y0FDYk4sS0FBSyxFQUFFO2dCQUNMQyxNQUFNLEVBQUUsU0FBUztnQkFDakJDLFVBQVUsRUFBRSxXQUFXO2dCQUN2QkMsU0FBUyxFQUFFO2tCQUNURixNQUFNLEVBQUUsU0FBUztrQkFDakJDLFVBQVUsRUFBRTtnQkFDZDtjQUNGO1lBQ0YsQ0FBQztZQUNESyxRQUFRLEVBQUU7Y0FDUlAsS0FBSyxFQUFFO2dCQUNMQyxNQUFNLEVBQUUsV0FBVztnQkFDbkJDLFVBQVUsRUFBRSxPQUFPO2dCQUNuQkMsU0FBUyxFQUFFO2tCQUNURixNQUFNLEVBQUUsV0FBVztrQkFDbkJDLFVBQVUsRUFBRTtnQkFDZDtjQUNGLENBQUM7Y0FDRE0sU0FBUyxFQUFFO1lBQ2I7VUFDRixDQUFDO1VBQ0RDLE9BQU8sRUFBRTtZQUNQQyxPQUFPLEVBQUUsSUFBSTtZQUNiQyxTQUFTLEVBQUU7Y0FDVEMscUJBQXFCLEVBQUUsQ0FBQyxJQUFJO2NBQzVCQyxjQUFjLEVBQUUsR0FBRztjQUNuQkMsWUFBWSxFQUFFLEdBQUc7Y0FDakJDLGNBQWMsRUFBRSxJQUFJO2NBQ3BCQyxPQUFPLEVBQUU7WUFDWDtVQUNGO1FBQ0YsQ0FBQztRQUVELElBQUlDLE9BQU87UUFFWEMsVUFBVSxDQUFDLFlBQVk7VUFDckJELE9BQU8sR0FBRyxJQUFJakQsR0FBRyxDQUFDbUQsT0FBTyxDQUFDN0IsS0FBSyxDQUFDOEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFcEMsSUFBSSxFQUFFVSxPQUFPLENBQUM7VUFDdER1QixPQUFPLENBQUNJLEVBQUUsQ0FBQyxhQUFhLEVBQUVDLGFBQWEsQ0FBQztVQUN4Q0wsT0FBTyxDQUFDSSxFQUFFLENBQUMsUUFBUSxFQUFFRSxRQUFRLENBQUM7UUFDaEMsQ0FBQyxDQUFDOztRQUVGO1FBQ0EvRCxDQUFDLENBQUMsYUFBYSxFQUFFYyxRQUFRLENBQUMsQ0FBQ2tELEtBQUssQ0FBQyxZQUFZO1VBQzNDLElBQU1DLElBQUksR0FBRzlDLEtBQUssQ0FBQ3lDLEdBQUcsRUFBRSxDQUFDTSxHQUFHLENBQUMsVUFBVUMsSUFBSSxFQUFFO1lBQzNDLE9BQU9BLElBQUksQ0FBQ3RELFVBQVU7VUFDeEIsQ0FBQyxDQUFDO1VBQ0ZuQixXQUFXLENBQUMwRSxTQUFTLENBQUNILElBQUksQ0FBQztRQUM3QixDQUFDLENBQUM7UUFDRmpFLENBQUMsQ0FBQyxTQUFTLEVBQUVjLFFBQVEsQ0FBQyxDQUFDa0QsS0FBSyxDQUFDLFlBQVk7VUFDdkNQLE9BQU8sQ0FBQ1ksZ0JBQWdCLEdBQUcsQ0FBQ1osT0FBTyxDQUFDWSxnQkFBZ0I7VUFDcERyRSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDc0UsV0FBVyxDQUFDLGdDQUFnQyxDQUFDO1FBQzVELENBQUMsQ0FBQzs7UUFFRjtRQUNBeEMsS0FBSyxDQUFDeUMsV0FBVyxDQUFDO1VBQ2hCQyxNQUFNLEVBQUV4RSxDQUFDLENBQUMsMEJBQTBCLEVBQUVjLFFBQVEsQ0FBQztVQUMvQzJELE1BQU0sRUFBRSxTQUFBQSxPQUFVQyxDQUFDLEVBQUVDLE9BQU8sRUFBRTtZQUM1QixJQUFJLENBQUNwRCxNQUFNLENBQUNKLEtBQUssQ0FBQ3lELE1BQU0sRUFBRSxPQUFPLEtBQUs7WUFDdEMsSUFBTWhELEVBQUUsR0FBR0wsTUFBTSxDQUFDSixLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQU0wRCxJQUFJLEdBQUcxRCxLQUFLLENBQUN5QyxHQUFHLENBQUNoQyxFQUFFLENBQUM7WUFDMUIsUUFBUWlELElBQUksQ0FBQ0MsS0FBSztjQUNsQixLQUFLLFFBQVE7Z0JBQ1gsSUFBSSxDQUFDTixNQUFNLEdBQUd4RSxDQUFDLENBQUMscUJBQXFCLEVBQUVjLFFBQVEsQ0FBQztnQkFDaEQ7Y0FDRixLQUFLLFVBQVU7Z0JBQ2IsSUFBSSxDQUFDMEQsTUFBTSxHQUFHeEUsQ0FBQyxDQUFDLHdCQUF3QixFQUFFYyxRQUFRLENBQUM7Z0JBQ25EO2NBQ0YsS0FBSyxrQkFBa0I7Y0FDdkIsS0FBSyxnQkFBZ0I7Z0JBQ25CLElBQUksQ0FBQzBELE1BQU0sR0FBR3hFLENBQUMsQ0FBQyx3QkFBd0IsRUFBRWMsUUFBUSxDQUFDO2dCQUNuRDtjQUNGLEtBQUssVUFBVTtnQkFDYixJQUFJLENBQUMwRCxNQUFNLEdBQUd4RSxDQUFDLENBQUMsd0JBQXdCLEVBQUVjLFFBQVEsQ0FBQztnQkFDbkQ7Y0FDRixLQUFLLGVBQWU7Z0JBQ2xCLElBQUksQ0FBQzBELE1BQU0sR0FBR3hFLENBQUMsQ0FBQyw2QkFBNkIsRUFBRWMsUUFBUSxDQUFDO2dCQUN4RDtjQUNGO2dCQUNFLElBQUksQ0FBQzBELE1BQU0sR0FBR3hFLENBQUMsQ0FBQywwQkFBMEIsRUFBRWMsUUFBUSxDQUFDO2dCQUNyRDtZQUFNO1lBRVIsT0FBTyxJQUFJO1VBQ2IsQ0FBQztVQUNEaUUsTUFBTSxFQUFFLFNBQUFBLE9BQVVDLE9BQU8sRUFBRU4sQ0FBQyxFQUFFO1lBQzVCLElBQU05QyxFQUFFLEdBQUdMLE1BQU0sQ0FBQ0osS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMxQixRQUFRdUQsQ0FBQyxDQUFDRixNQUFNLENBQUM1QyxFQUFFO2NBQ25CLEtBQUssV0FBVztnQkFDZEQsV0FBVyxDQUFDQyxFQUFFLENBQUM7Z0JBQ2Y7Y0FDRixLQUFLLFVBQVU7Z0JBQ2JDLFVBQVUsQ0FBQ0QsRUFBRSxDQUFDO2dCQUNkO2NBQ0YsS0FBSyxRQUFRO2dCQUNYVCxLQUFLLENBQUM4RCxNQUFNLENBQUMxRCxNQUFNLENBQUNKLEtBQUssQ0FBQztnQkFDMUJFLEtBQUssQ0FBQzRELE1BQU0sQ0FBQzFELE1BQU0sQ0FBQ0YsS0FBSyxDQUFDO2dCQUMxQkUsTUFBTSxDQUFDSixLQUFLLEdBQUdJLE1BQU0sQ0FBQ0YsS0FBSyxHQUFHLEVBQUU7Z0JBQ2hDO2NBQ0YsS0FBSyxpQkFBaUI7Z0JBQ3BCNkQsa0JBQWtCLENBQUN0RCxFQUFFLENBQUM7Z0JBQ3RCTCxNQUFNLENBQUNKLEtBQUssR0FBR0ksTUFBTSxDQUFDRixLQUFLLEdBQUcsRUFBRTtnQkFDaEM7Y0FDRixLQUFLLGdCQUFnQjtnQkFDbkI4RCxpQkFBaUIsQ0FBQ3ZELEVBQUUsQ0FBQztnQkFDckJMLE1BQU0sQ0FBQ0osS0FBSyxHQUFHSSxNQUFNLENBQUNGLEtBQUssR0FBRyxFQUFFO2dCQUNoQztjQUNGLEtBQUssbUJBQW1CO2dCQUN0QlEsVUFBVSxDQUFDRCxFQUFFLEVBQUUscUJBQXFCLENBQUM7Z0JBQ3JDO2NBQ0YsS0FBSyxrQkFBa0I7Z0JBQ3JCQyxVQUFVLENBQUNELEVBQUUsRUFBRSxtRkFBbUYsQ0FBQztnQkFDbkc7Y0FDRixLQUFLLGtCQUFrQjtnQkFDckJDLFVBQVUsQ0FBQ0QsRUFBRSxFQUFFLHdCQUF3QixDQUFDO2dCQUN4QztjQUNGLEtBQUssaUJBQWlCO2dCQUNwQkMsVUFBVSxDQUFDRCxFQUFFLEVBQUUsNkRBQTZELENBQUM7Z0JBQzdFO2NBQ0YsS0FBSyxzQkFBc0I7Z0JBQ3pCQyxVQUFVLENBQ1JELEVBQUUsRUFDRixnREFBZ0QsR0FDNUMsdURBQXVELEdBQ3ZELGlEQUFpRCxHQUNqRCw2QkFBNkIsQ0FDbEM7Z0JBQ0Q7Y0FDRixLQUFLLHlCQUF5QjtnQkFDNUJDLFVBQVUsQ0FDUkQsRUFBRSxFQUNGLGdEQUFnRCxHQUM1Qyx1REFBdUQsR0FDdkQsaURBQWlELEdBQ2pELCtCQUErQixDQUNwQztnQkFDRDtZQUFNO1VBRVY7UUFDRixDQUFDLENBQUM7UUFFRixTQUFTSCxPQUFPQSxDQUFFWixVQUFVLEVBQUU7VUFDNUIsT0FBT0EsVUFBVSxDQUFDdUUsSUFBSSxFQUFFLENBQUMxRCxJQUFJLENBQUMsVUFBVWIsVUFBVSxFQUFFO1lBQ2xELElBQUlNLEtBQUssQ0FBQ3lDLEdBQUcsQ0FBQy9DLFVBQVUsQ0FBQ2UsRUFBRSxDQUFDLEtBQUssSUFBSSxFQUFFO2NBQ3JDLElBQU1pRCxJQUFJLEdBQUc7Z0JBQ1hqRCxFQUFFLEVBQUVmLFVBQVUsQ0FBQ2UsRUFBRTtnQkFDakJ5RCxLQUFLLEVBQUV4RSxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUN5RSxRQUFRLEVBQUUsR0FBRyxJQUFJLEdBQUd6RSxVQUFVLENBQUN5RSxRQUFRLEVBQUU7Z0JBQzFFekUsVUFBVSxFQUFFQTtjQUNkLENBQUM7Y0FDRCxJQUFJQSxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQzdCLFFBQVFBLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ2UsRUFBRTtrQkFDcEMsS0FBSyxZQUFZO2tCQUNqQixLQUFLLFdBQVc7b0JBQ2RpRCxJQUFJLENBQUNDLEtBQUssR0FBRyxRQUFRO29CQUNyQjtrQkFDRixLQUFLLGNBQWM7a0JBQ25CLEtBQUssb0JBQW9CO29CQUN2QkQsSUFBSSxDQUFDQyxLQUFLLEdBQUcsZ0JBQWdCO29CQUM3QjtrQkFDRixLQUFLLHNCQUFzQjtrQkFDM0IsS0FBSyxzQkFBc0I7a0JBQzNCLEtBQUssd0JBQXdCO29CQUMzQkQsSUFBSSxDQUFDQyxLQUFLLEdBQUcsa0JBQWtCO29CQUMvQjtrQkFDRixLQUFLLG9CQUFvQjtvQkFDdkJELElBQUksQ0FBQ0MsS0FBSyxHQUFHLFVBQVU7b0JBQ3ZCO2tCQUNGLEtBQUssNEJBQTRCO2tCQUNqQyxLQUFLLG9DQUFvQztrQkFDekMsS0FBSyxrQ0FBa0M7b0JBQ3JDRCxJQUFJLENBQUNDLEtBQUssR0FBRyxlQUFlO29CQUM1QjtrQkFDRixLQUFLLGNBQWM7b0JBQ2pCRCxJQUFJLENBQUNDLEtBQUssR0FBRyxVQUFVO29CQUN2QjtrQkFDRjtvQkFDRUQsSUFBSSxDQUFDQyxLQUFLLEdBQUcsWUFBWTtvQkFDekI7Z0JBQU07Y0FFVjtjQUNBM0QsS0FBSyxDQUFDb0UsR0FBRyxDQUFDLENBQUNWLElBQUksQ0FBQyxDQUFDO1lBQ25CO1VBQ0YsQ0FBQyxDQUFDO1FBQ0o7UUFFQSxTQUFTbEQsV0FBV0EsQ0FBRUMsRUFBRSxFQUFFO1VBQ3hCLElBQU1mLFVBQVUsR0FBR00sS0FBSyxDQUFDeUMsR0FBRyxDQUFDaEMsRUFBRSxDQUFDLENBQUNmLFVBQVU7VUFDM0MyRSxNQUFNLENBQUNDLG1CQUFtQixDQUFDNUUsVUFBVSxDQUFDNkUsVUFBVSxDQUFDLENBQUNDLE9BQU8sQ0FBQyxVQUFVQyxZQUFZLEVBQUU7WUFDaEYsSUFBSUEsWUFBWSxLQUFLLEdBQUcsRUFBRTtjQUN4QjtZQUNGO1lBQ0EvRSxVQUFVLENBQUMrRSxZQUFZLENBQUMsQ0FBQ0QsT0FBTyxDQUFDLFVBQVVFLEtBQUssRUFBRTtjQUNoRCxJQUFJQyxXQUFBLENBQUFELEtBQUssRUFBWXpGLGVBQWUsS0FBSXlGLEtBQUssS0FBS2hGLFVBQVUsRUFBRTtnQkFDNURZLE9BQU8sQ0FBQ29FLEtBQUssQ0FBQyxDQUFDbkUsSUFBSSxDQUFDLFlBQVk7a0JBQzlCLElBQU1xRSxJQUFJLEdBQUdsRixVQUFVLENBQUNlLEVBQUU7a0JBQzFCLElBQU1vRSxFQUFFLEdBQUdILEtBQUssQ0FBQ2pFLEVBQUU7a0JBQ25CLElBQU15RCxLQUFLLEdBQUcsSUFBSWpGLGVBQWUsQ0FBQ3dGLFlBQVksQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDMUIsR0FBRyxDQUFDcEUsVUFBVSxDQUFDbUcsV0FBVyxDQUFDLENBQUNDLElBQUksQ0FBQyxHQUFHLENBQUM7a0JBQ25HLElBQU1oRSxPQUFPLEdBQUc7b0JBQ2RpRSxNQUFNLEVBQUUsU0FBQUEsT0FBVWhDLElBQUksRUFBRTtzQkFDdEIsT0FBT0EsSUFBSSxDQUFDNEIsSUFBSSxJQUFJQSxJQUFJLElBQUk1QixJQUFJLENBQUM2QixFQUFFLElBQUlBLEVBQUUsSUFBSTdCLElBQUksQ0FBQ2tCLEtBQUssQ0FBQ0MsUUFBUSxFQUFFLElBQUlELEtBQUs7b0JBQzdFO2tCQUNGLENBQUM7a0JBQ0QsSUFBSSxDQUFDaEUsS0FBSyxDQUFDdUMsR0FBRyxDQUFDMUIsT0FBTyxDQUFDLENBQUMwQyxNQUFNLEVBQUU7b0JBQzlCdkQsS0FBSyxDQUFDa0UsR0FBRyxDQUFDLENBQ1I7c0JBQ0VRLElBQUksRUFBRUEsSUFBSTtzQkFDVkMsRUFBRSxFQUFFQSxFQUFFO3NCQUNOWCxLQUFLLEVBQUVBO29CQUNULENBQUMsQ0FDRixDQUFDO2tCQUNKO2dCQUNGLENBQUMsQ0FBQztjQUNKO1lBQ0YsQ0FBQyxDQUFDO1VBQ0osQ0FBQyxDQUFDO1FBQ0o7UUFFQSxTQUFTeEQsVUFBVUEsQ0FBRUQsRUFBRSxFQUFFd0UsUUFBUSxFQUFFO1VBQ2pDLElBQUlDLENBQUMsR0FBR0QsUUFBUSxJQUFJLGFBQWE7VUFDakNDLENBQUMsR0FBR0EsQ0FBQyxDQUFDQyxPQUFPLENBQUMsTUFBTSxFQUFFMUUsRUFBRSxDQUFDO1VBQ3pCLE9BQU90QixPQUFPLENBQUNpRyxLQUFLLENBQUNyRyxJQUFJLENBQUNzRyxNQUFNLEVBQUVILENBQUMsQ0FBQyxDQUFDM0UsSUFBSSxDQUFDLFVBQVUrRSxXQUFXLEVBQUU7WUFDL0QsSUFBTUMsSUFBSSxHQUFHRCxXQUFXLENBQUNFLE1BQU07WUFDL0IsT0FBT3JHLE9BQU8sQ0FBQ3NHLGVBQWUsQ0FBQzFHLElBQUksQ0FBQ3NHLE1BQU0sRUFBRUUsSUFBSSxDQUFDLENBQUNoRixJQUFJLENBQUMsVUFBVW1GLGdCQUFnQixFQUFFO2NBQ2pGQSxnQkFBZ0IsQ0FBQ2xCLE9BQU8sQ0FBQyxVQUFVbUIsY0FBYyxFQUFFO2dCQUNqRCxJQUFNQyxHQUFHLEdBQUcsSUFBSTNHLGVBQWUsQ0FBQzBHLGNBQWMsQ0FBQztnQkFDL0NyRixPQUFPLENBQUNzRixHQUFHLENBQUM7Z0JBQ1osSUFBTWYsRUFBRSxHQUFHcEUsRUFBRTtnQkFDYixJQUFNbUUsSUFBSSxHQUFHZ0IsR0FBRyxDQUFDbkYsRUFBRTtnQkFDbkI0RCxNQUFNLENBQUNDLG1CQUFtQixDQUFDc0IsR0FBRyxDQUFDckIsVUFBVSxDQUFDLENBQUNDLE9BQU8sQ0FBQyxVQUFVQyxZQUFZLEVBQUU7a0JBQ3pFLElBQUlBLFlBQVksS0FBSyxHQUFHLEVBQUU7b0JBQ3hCO2tCQUNGO2tCQUNBLElBQUltQixHQUFHLENBQUNDLFFBQVEsQ0FBQ3BCLFlBQVksRUFBRWhFLEVBQUUsQ0FBQyxFQUFFO29CQUNsQyxJQUFNeUQsS0FBSyxHQUFHLElBQUlqRixlQUFlLENBQUN3RixZQUFZLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQzFCLEdBQUcsQ0FBQ3BFLFVBQVUsQ0FBQ21HLFdBQVcsQ0FBQyxDQUFDQyxJQUFJLENBQUMsR0FBRyxDQUFDO29CQUNuRyxJQUFNaEUsUUFBTyxHQUFHO3NCQUNkaUUsTUFBTSxFQUFFLFNBQUFBLE9BQVVoQyxJQUFJLEVBQUU7d0JBQ3RCLE9BQU9BLElBQUksQ0FBQzRCLElBQUksS0FBS0EsSUFBSSxJQUFJNUIsSUFBSSxDQUFDNkIsRUFBRSxLQUFLQSxFQUFFLElBQUk3QixJQUFJLENBQUNrQixLQUFLLENBQUNDLFFBQVEsRUFBRSxLQUFLRCxLQUFLO3NCQUNoRjtvQkFDRixDQUFDO29CQUNELElBQUksQ0FBQ2hFLEtBQUssQ0FBQ3VDLEdBQUcsQ0FBQzFCLFFBQU8sQ0FBQyxDQUFDMEMsTUFBTSxFQUFFO3NCQUM5QnZELEtBQUssQ0FBQ2tFLEdBQUcsQ0FBQyxDQUFDO3dCQUFDUSxJQUFJLEVBQUVBLElBQUk7d0JBQUVDLEVBQUUsRUFBRUEsRUFBRTt3QkFBRVgsS0FBSyxFQUFFQTtzQkFBSyxDQUFDLENBQUMsQ0FBQztvQkFDakQ7a0JBQ0Y7Z0JBQ0YsQ0FBQyxDQUFDO2NBQ0osQ0FBQyxDQUFDO1lBQ0osQ0FBQyxDQUFDO1VBQ0osQ0FBQyxDQUFDO1FBQ0o7UUFFQSxTQUFTSCxrQkFBa0JBLENBQUV0RCxFQUFFLEVBQUU7VUFDL0JULEtBQUssQ0FBQzhELE1BQU0sQ0FBQ3JELEVBQUUsQ0FBQztVQUNoQixJQUFNcUYsYUFBYSxHQUFHLEVBQUU7VUFDeEIsSUFBTUMsYUFBYSxHQUFHN0YsS0FBSyxDQUFDdUMsR0FBRyxDQUFDO1lBQzlCdUMsTUFBTSxFQUFFLFNBQUFBLE9BQVVoQyxJQUFJLEVBQUU7Y0FDdEIsSUFBSUEsSUFBSSxDQUFDNEIsSUFBSSxJQUFJbkUsRUFBRSxFQUFFO2dCQUNuQnFGLGFBQWEsQ0FBQ0UsSUFBSSxDQUFDaEQsSUFBSSxDQUFDNkIsRUFBRSxDQUFDO2NBQzdCO2NBQ0EsT0FBTzdCLElBQUksQ0FBQzRCLElBQUksSUFBSW5FLEVBQUUsSUFBSXVDLElBQUksQ0FBQzZCLEVBQUUsSUFBSXBFLEVBQUU7WUFDekM7VUFDRixDQUFDLENBQUM7VUFDRlAsS0FBSyxDQUFDNEQsTUFBTSxDQUFDaUMsYUFBYSxDQUFDO1VBQzNCL0YsS0FBSyxDQUFDOEQsTUFBTSxDQUFDZ0MsYUFBYSxDQUFDO1FBQzdCO1FBRUEsU0FBUzlCLGlCQUFpQkEsQ0FBRXZELEVBQUUsRUFBRTtVQUM5QlQsS0FBSyxDQUFDOEQsTUFBTSxDQUFDckQsRUFBRSxDQUFDO1VBQ2hCLElBQU1xRixhQUFhLEdBQUcsRUFBRTtVQUN4QixJQUFNQyxhQUFhLEdBQUc3RixLQUFLLENBQUN1QyxHQUFHLENBQUM7WUFDOUJ1QyxNQUFNLEVBQUUsU0FBQUEsT0FBVWhDLElBQUksRUFBRTtjQUN0QixJQUFJQSxJQUFJLENBQUM2QixFQUFFLElBQUlwRSxFQUFFLEVBQUU7Z0JBQ2pCcUYsYUFBYSxDQUFDRSxJQUFJLENBQUNoRCxJQUFJLENBQUM0QixJQUFJLENBQUM7Y0FDL0I7Y0FDQSxPQUFPNUIsSUFBSSxDQUFDNEIsSUFBSSxJQUFJbkUsRUFBRSxJQUFJdUMsSUFBSSxDQUFDNkIsRUFBRSxJQUFJcEUsRUFBRTtZQUN6QztVQUNGLENBQUMsQ0FBQztVQUNGUCxLQUFLLENBQUM0RCxNQUFNLENBQUNpQyxhQUFhLENBQUM7VUFDM0IvRixLQUFLLENBQUM4RCxNQUFNLENBQUNnQyxhQUFhLENBQUM7UUFDN0I7O1FBRUE7UUFDQSxTQUFTbEQsUUFBUUEsQ0FBRXFELFFBQVEsRUFBRTtVQUMzQjdGLE1BQU0sR0FBRzZGLFFBQVE7VUFDakI5RixJQUFJLENBQUMrRixHQUFHLENBQUMsU0FBUyxFQUFFQyxzQkFBc0IsQ0FBQztVQUMzQ2hHLElBQUksQ0FBQ2lHLEdBQUcsQ0FBQyxTQUFTLEVBQUVILFFBQVEsRUFBRUUsc0JBQXNCLENBQUM7UUFDdkQ7UUFDQSxTQUFTQSxzQkFBc0JBLENBQUU1QyxDQUFDLEVBQUU7VUFDbEMsSUFBSUEsQ0FBQyxDQUFDOEMsS0FBSyxJQUFJLEVBQUUsRUFBRTtZQUNqQnJHLEtBQUssQ0FBQzhELE1BQU0sQ0FBQ1AsQ0FBQyxDQUFDbEQsSUFBSSxDQUFDTCxLQUFLLENBQUM7WUFDMUJFLEtBQUssQ0FBQzRELE1BQU0sQ0FBQ1AsQ0FBQyxDQUFDbEQsSUFBSSxDQUFDSCxLQUFLLENBQUM7VUFDNUI7VUFDQSxJQUFJcUQsQ0FBQyxDQUFDOEMsS0FBSyxJQUFJLEVBQUUsRUFBRTtZQUNqQjNGLFVBQVUsQ0FBQzZDLENBQUMsQ0FBQ2xELElBQUksQ0FBQ0wsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1VBQzdCO1VBQ0EsSUFBSXVELENBQUMsQ0FBQzhDLEtBQUssSUFBSSxFQUFFLEVBQUU7WUFDakI3RixXQUFXLENBQUMrQyxDQUFDLENBQUNsRCxJQUFJLENBQUNMLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztVQUM5QjtRQUNGO1FBRUEsU0FBUzJDLGFBQWFBLENBQUVzRCxRQUFRLEVBQUU7VUFDaEMsSUFBSSxDQUFDQSxRQUFRLENBQUNqRyxLQUFLLENBQUN5RCxNQUFNLEVBQUU7VUFDNUIsSUFBTTZDLGNBQWMsR0FBR0wsUUFBUSxDQUFDakcsS0FBSyxDQUFDLENBQUMsQ0FBQztVQUN4QyxJQUFNdUcsU0FBUyxHQUFHMUgsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUMySCxJQUFJLEVBQUU7VUFDeEQsSUFBTUMsS0FBSyxHQUFHNUgsQ0FBQyxDQUFDMEgsU0FBUyxDQUFDO1VBQzFCLElBQU1HLFNBQVMsR0FBRzdILENBQUMsQ0FBQyxhQUFhLEVBQUU0SCxLQUFLLENBQUM7VUFDekMsSUFBTS9HLFVBQVUsR0FBRyxJQUFJVCxlQUFlLENBQUNxSCxjQUFjLENBQUM7VUFDdEQ1RyxVQUFVLENBQUNpSCxPQUFPLENBQUNELFNBQVMsQ0FBQztVQUM3QkQsS0FBSyxDQUFDTCxHQUFHLENBQUMsUUFBUSxFQUFFLFVBQVU3QyxDQUFDLEVBQUU7WUFDL0JrRCxLQUFLLENBQUNBLEtBQUssQ0FBQyxNQUFNLENBQUM7VUFDckIsQ0FBQyxDQUFDO1VBQ0ZBLEtBQUssQ0FBQ0EsS0FBSyxFQUFFO1VBQ2I1SCxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMrSCxNQUFNLENBQUNILEtBQUssQ0FBQztRQUMxQjtNQUNGLENBQUM7TUFBQWpILE9BQUEsU0FFWWdILElBQUk7SUFBQTtFQUFBO0FBQUEifQ==