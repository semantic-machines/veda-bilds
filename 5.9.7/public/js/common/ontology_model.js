"use strict";

System.register(["../common/veda.js", "../common/individual_model.js", "../common/backend.js", "../common/util.js"], function (_export, _context) {
  "use strict";

  var veda, IndividualModel, Backend, Util, proto;
  /**
   * Ontology
   * @return {Ontology}
   */
  function Ontology() {
    // Singleton pattern
    if (Ontology.prototype._singletonInstance) {
      return Ontology.prototype._singletonInstance;
    }
    Ontology.prototype._singletonInstance = this;
    this.ontology = [];
    this.ontologies = {};
    this.datatypes = {};
    this.classes = {};
    this.properties = {};
    this.specifications = {};
    this.models = {};
    this.classTree = {};
    this.templates = {};
    return this;
  }
  return {
    setters: [function (_commonVedaJs) {
      veda = _commonVedaJs.default;
    }, function (_commonIndividual_modelJs) {
      IndividualModel = _commonIndividual_modelJs.default;
    }, function (_commonBackendJs) {
      Backend = _commonBackendJs.default;
    }, function (_commonUtilJs) {
      Util = _commonUtilJs.default;
    }],
    execute: function () {
      // Ontology model
      _export("default", Ontology);
      proto = Ontology.prototype;
      proto.init = function () {
        var _this = this;
        if (this.ontology.length) {
          return Promise.resolve(this);
        }
        if (typeof window !== 'undefined') {
          return fetch('/ontology.json', {
            mode: 'same-origin',
            cache: 'no-cache',
            credentials: 'same-origin'
          }).then(function (response) {
            if (response.ok) {
              return response.json();
            }
            throw Error(response.status);
          }).then(function (ontologyJSON) {
            _this.ontology = ontologyJSON;
            return _this.processOntology();
          }).catch(function (error) {
            console.error('Ontology load failed');
            throw error;
          });
        } else {
          return Backend.query(veda.ticket, "'rdf:type' == 'owl:Ontology' || 'rdf:type' == 'rdfs:Class' || 'rdf:type' == 'rdf:Property' || 'rdf:type' == 'rdfs:Datatype' || 'rdf:type' == 'v-ui:PropertySpecification' || 'rdf:type' == 'v-ui:ClassModel'").then(function (queryResult) {
            var ontology_uris = queryResult.result;
            return Backend.get_individuals(veda.ticket, ontology_uris);
          }).then(function (ontology) {
            _this.ontology = ontology;
            console.log('Ontology length:', ontology.length);
            return _this.processOntology();
          });
        }
      };
      proto.getClassProperties = function (_class_uri) {
        var classTree = this.classTree;
        var getProps = function getProps(uri) {
          var _class = classTree[uri];
          var props;
          if (_class) {
            props = _class.properties;
            return [].concat.apply(props, _class.superClasses.map(getProps));
          } else {
            return getProps('rdfs:Resource');
          }
        };
        return Util.unique(getProps(_class_uri));
      };
      proto.getClassSpecifications = function (_class_uri) {
        var classTree = this.classTree;
        var getSpecs = function getSpecs(uri) {
          var _class = classTree[uri];
          var specs;
          if (_class) {
            specs = _class.specifications;
            var superSpecsArray = _class.superClasses.map(getSpecs);
            superSpecsArray.map(function (superSpecs) {
              for (var property_uri in superSpecs) {
                if (!specs[property_uri]) {
                  specs[property_uri] = superSpecs[property_uri];
                }
              }
            });
          } else {
            specs = getSpecs('rdfs:Resource');
          }
          return specs;
        };
        return getSpecs(_class_uri);
      };
      proto.getClassTemplate = function (_class_uri) {
        var classTemplates = this.templates[_class_uri];
        if (!classTemplates) {
          classTemplates = this.classes[_class_uri].get('v-ui:hasTemplate');
        }
        return classTemplates[0];
      };
      proto.processOntology = function () {
        var _this2 = this;
        var ontology = this.ontology;
        var ontologies = this.ontologies;
        var datatypes = this.datatypes;
        var classes = this.classes;
        var properties = this.properties;
        var specifications = this.specifications;
        var classTree = this.classTree;
        var models = this.models;
        var templates = this.templates;

        // Allocate ontology objects
        var ontologyIndividuals = ontology.map(function (json) {
          if (JSON.stringify(json) === '{"@":""}') {
            return;
          }
          return new IndividualModel(json, true, false);
        });
        ontologyIndividuals.forEach(function (individual) {
          try {
            if (!individual) {
              return;
            }
            var type = individual.properties['rdf:type'][0].data;
            var uri = individual.id;
            switch (type) {
              case 'rdfs:Class':
              case 'owl:Class':
                classes[uri] = individual;
                break;
              case 'rdf:Property':
              case 'owl:DatatypeProperty':
              case 'owl:ObjectProperty':
              case 'owl:OntologyProperty':
              case 'owl:AnnotationProperty':
                properties[uri] = individual;
                // Initialize individual properties in IndividualModel.prototype
                if (!IndividualModel.prototype.hasOwnProperty(uri)) {
                  IndividualModel.defineProperty(uri);
                }
                break;
              case 'v-ui:PropertySpecification':
              case 'v-ui:DatatypePropertySpecification':
              case 'v-ui:ObjectPropertySpecification':
                specifications[uri] = individual;
                break;
              case 'owl:Ontology':
                ontologies[uri] = individual;
                break;
              case 'rdfs:Datatype':
                datatypes[uri] = individual;
                break;
              case 'v-ui:ClassModel':
                models[uri] = individual;
                break;
              case 'v-ui:TemplateSpecification':
                var forClass = individual.properties['v-ui:forClass'][0].data;
                if (templates[forClass]) {
                  templates[forClass].push(individual);
                } else {
                  templates[forClass] = [individual];
                }
                break;
            }
          } catch (error) {
            console.error('Ontology init failed, uri =', individual.id);
          }
        });

        // Process classes
        Object.keys(classes).forEach(function (uri) {
          try {
            var _class = classes[uri];
            // populate classTree
            if (!classTree[_class.id]) {
              classTree[_class.id] = {
                superClasses: [],
                properties: [],
                specifications: {}
              };
            }
            // rdfs:Resource is a top level class
            if (_class.id === 'rdfs:Resource') {
              return;
            }
            // If class is not a subclass of another then make it a subclass of rdfs:Resource
            if (!_class.hasValue('rdfs:subClassOf')) {
              _class['rdfs:subClassOf'] = [classes['rdfs:Resource']];
            }
            _class['rdfs:subClassOf'].map(function (superClass) {
              classTree[_class.id].superClasses.push(superClass.id);
            });
          } catch (error) {
            console.error('Ontology init failed, uri =', uri);
          }
        });

        // Process properties
        Object.keys(properties).forEach(function (uri) {
          try {
            var property = properties[uri];
            if (!property['rdfs:domain']) {
              return;
            }
            property['rdfs:domain'].map(function (_class) {
              classTree[_class.id].properties.push(property.id);
            });
          } catch (error) {
            console.error('Ontology init failed, uri =', uri);
          }
        });

        // Process specifications
        Object.keys(specifications).forEach(function (uri) {
          try {
            var spec = specifications[uri];
            if (!spec['v-ui:forClass']) {
              return;
            }
            spec['v-ui:forClass'].map(function (_class) {
              spec['v-ui:forProperty'].map(function (prop) {
                classTree[_class.id].specifications[prop.id] = spec.id;
              });
            });
          } catch (error) {
            console.error('Ontology init failed, uri =', uri);
          }
        });

        // Process template specifications
        Object.keys(templates).forEach(function (uri) {
          try {
            templates[uri] = templates[uri].sort(function (cur, prev) {
              if (cur.properties['v-s:loadPriority']) {
                if (prev.properties['v-s:loadPriority']) {
                  return cur.properties['v-s:loadPriority'][0].data - prev.properties['v-s:loadPriority'][0].data;
                } else {
                  return -1;
                }
              } else {
                return 1;
              }
            }).map(function (templateSpec) {
              return templateSpec.properties['v-ui:defaultTemplate'][0].data;
            });
          } catch (error) {
            console.error('Ontology init failed, uri =', uri);
          }
        });

        // Init ontology individuals
        var initPromises = ontologyIndividuals.map(function (individual, i) {
          return individual.init().catch(function (error) {
            return console.error('Ontology individual init failed, uri =', individual.id);
          });
        });
        if (typeof window !== 'undefined') {
          return Promise.all(initPromises).then(function () {
            return _this2;
          });
        } else {
          return Promise.resolve(this);
        }
      };
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJPbnRvbG9neSIsInByb3RvdHlwZSIsIl9zaW5nbGV0b25JbnN0YW5jZSIsIm9udG9sb2d5Iiwib250b2xvZ2llcyIsImRhdGF0eXBlcyIsImNsYXNzZXMiLCJwcm9wZXJ0aWVzIiwic3BlY2lmaWNhdGlvbnMiLCJtb2RlbHMiLCJjbGFzc1RyZWUiLCJ0ZW1wbGF0ZXMiLCJzZXR0ZXJzIiwiX2NvbW1vblZlZGFKcyIsInZlZGEiLCJkZWZhdWx0IiwiX2NvbW1vbkluZGl2aWR1YWxfbW9kZWxKcyIsIkluZGl2aWR1YWxNb2RlbCIsIl9jb21tb25CYWNrZW5kSnMiLCJCYWNrZW5kIiwiX2NvbW1vblV0aWxKcyIsIlV0aWwiLCJleGVjdXRlIiwiX2V4cG9ydCIsInByb3RvIiwiaW5pdCIsIl90aGlzIiwibGVuZ3RoIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ3aW5kb3ciLCJmZXRjaCIsIm1vZGUiLCJjYWNoZSIsImNyZWRlbnRpYWxzIiwidGhlbiIsInJlc3BvbnNlIiwib2siLCJqc29uIiwiRXJyb3IiLCJzdGF0dXMiLCJvbnRvbG9neUpTT04iLCJwcm9jZXNzT250b2xvZ3kiLCJjYXRjaCIsImVycm9yIiwiY29uc29sZSIsInF1ZXJ5IiwidGlja2V0IiwicXVlcnlSZXN1bHQiLCJvbnRvbG9neV91cmlzIiwicmVzdWx0IiwiZ2V0X2luZGl2aWR1YWxzIiwibG9nIiwiZ2V0Q2xhc3NQcm9wZXJ0aWVzIiwiX2NsYXNzX3VyaSIsImdldFByb3BzIiwidXJpIiwiX2NsYXNzIiwicHJvcHMiLCJjb25jYXQiLCJhcHBseSIsInN1cGVyQ2xhc3NlcyIsIm1hcCIsInVuaXF1ZSIsImdldENsYXNzU3BlY2lmaWNhdGlvbnMiLCJnZXRTcGVjcyIsInNwZWNzIiwic3VwZXJTcGVjc0FycmF5Iiwic3VwZXJTcGVjcyIsInByb3BlcnR5X3VyaSIsImdldENsYXNzVGVtcGxhdGUiLCJjbGFzc1RlbXBsYXRlcyIsImdldCIsIl90aGlzMiIsIm9udG9sb2d5SW5kaXZpZHVhbHMiLCJKU09OIiwic3RyaW5naWZ5IiwiZm9yRWFjaCIsImluZGl2aWR1YWwiLCJ0eXBlIiwiZGF0YSIsImlkIiwiaGFzT3duUHJvcGVydHkiLCJkZWZpbmVQcm9wZXJ0eSIsImZvckNsYXNzIiwicHVzaCIsIk9iamVjdCIsImtleXMiLCJoYXNWYWx1ZSIsInN1cGVyQ2xhc3MiLCJwcm9wZXJ0eSIsInNwZWMiLCJwcm9wIiwic29ydCIsImN1ciIsInByZXYiLCJ0ZW1wbGF0ZVNwZWMiLCJpbml0UHJvbWlzZXMiLCJpIiwiYWxsIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc291cmNlLXdlYi9qcy9jb21tb24vb250b2xvZ3lfbW9kZWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gT250b2xvZ3kgbW9kZWxcblxuaW1wb3J0IHZlZGEgZnJvbSAnLi4vY29tbW9uL3ZlZGEuanMnO1xuaW1wb3J0IEluZGl2aWR1YWxNb2RlbCBmcm9tICcuLi9jb21tb24vaW5kaXZpZHVhbF9tb2RlbC5qcyc7XG5pbXBvcnQgQmFja2VuZCBmcm9tICcuLi9jb21tb24vYmFja2VuZC5qcyc7XG5pbXBvcnQgVXRpbCBmcm9tICcuLi9jb21tb24vdXRpbC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IE9udG9sb2d5O1xuXG4vKipcbiAqIE9udG9sb2d5XG4gKiBAcmV0dXJuIHtPbnRvbG9neX1cbiAqL1xuZnVuY3Rpb24gT250b2xvZ3kgKCkge1xuICAvLyBTaW5nbGV0b24gcGF0dGVyblxuICBpZiAoT250b2xvZ3kucHJvdG90eXBlLl9zaW5nbGV0b25JbnN0YW5jZSkge1xuICAgIHJldHVybiBPbnRvbG9neS5wcm90b3R5cGUuX3NpbmdsZXRvbkluc3RhbmNlO1xuICB9XG4gIE9udG9sb2d5LnByb3RvdHlwZS5fc2luZ2xldG9uSW5zdGFuY2UgPSB0aGlzO1xuXG4gIHRoaXMub250b2xvZ3kgPSBbXTtcbiAgdGhpcy5vbnRvbG9naWVzID0ge307XG4gIHRoaXMuZGF0YXR5cGVzID0ge307XG4gIHRoaXMuY2xhc3NlcyA9IHt9O1xuICB0aGlzLnByb3BlcnRpZXMgPSB7fTtcbiAgdGhpcy5zcGVjaWZpY2F0aW9ucyA9IHt9O1xuICB0aGlzLm1vZGVscyA9IHt9O1xuICB0aGlzLmNsYXNzVHJlZSA9IHt9O1xuICB0aGlzLnRlbXBsYXRlcyA9IHt9O1xuXG4gIHJldHVybiB0aGlzO1xufVxuXG5jb25zdCBwcm90byA9IE9udG9sb2d5LnByb3RvdHlwZTtcblxucHJvdG8uaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMub250b2xvZ3kubGVuZ3RoKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzKTtcbiAgfVxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZmV0Y2goJy9vbnRvbG9neS5qc29uJywge1xuICAgICAgbW9kZTogJ3NhbWUtb3JpZ2luJyxcbiAgICAgIGNhY2hlOiAnbm8tY2FjaGUnLFxuICAgICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG4gICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgfVxuICAgICAgdGhyb3cgRXJyb3IocmVzcG9uc2Uuc3RhdHVzKTtcbiAgICB9KS50aGVuKChvbnRvbG9neUpTT04pID0+IHtcbiAgICAgIHRoaXMub250b2xvZ3kgPSBvbnRvbG9neUpTT047XG4gICAgICByZXR1cm4gdGhpcy5wcm9jZXNzT250b2xvZ3koKTtcbiAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ09udG9sb2d5IGxvYWQgZmFpbGVkJyk7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gQmFja2VuZC5xdWVyeSh2ZWRhLnRpY2tldCwgXCIncmRmOnR5cGUnID09ICdvd2w6T250b2xvZ3knIHx8ICdyZGY6dHlwZScgPT0gJ3JkZnM6Q2xhc3MnIHx8ICdyZGY6dHlwZScgPT0gJ3JkZjpQcm9wZXJ0eScgfHwgJ3JkZjp0eXBlJyA9PSAncmRmczpEYXRhdHlwZScgfHwgJ3JkZjp0eXBlJyA9PSAndi11aTpQcm9wZXJ0eVNwZWNpZmljYXRpb24nIHx8ICdyZGY6dHlwZScgPT0gJ3YtdWk6Q2xhc3NNb2RlbCdcIilcbiAgICAgIC50aGVuKChxdWVyeVJlc3VsdCkgPT4ge1xuICAgICAgICBjb25zdCBvbnRvbG9neV91cmlzID0gcXVlcnlSZXN1bHQucmVzdWx0O1xuICAgICAgICByZXR1cm4gQmFja2VuZC5nZXRfaW5kaXZpZHVhbHModmVkYS50aWNrZXQsIG9udG9sb2d5X3VyaXMpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChvbnRvbG9neSkgPT4ge1xuICAgICAgICB0aGlzLm9udG9sb2d5ID0gb250b2xvZ3k7XG4gICAgICAgIGNvbnNvbGUubG9nKCdPbnRvbG9neSBsZW5ndGg6Jywgb250b2xvZ3kubGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzc09udG9sb2d5KCk7XG4gICAgICB9KTtcbiAgfVxufTtcblxucHJvdG8uZ2V0Q2xhc3NQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKF9jbGFzc191cmkpIHtcbiAgY29uc3QgY2xhc3NUcmVlID0gdGhpcy5jbGFzc1RyZWU7XG4gIGNvbnN0IGdldFByb3BzID0gKHVyaSkgPT4ge1xuICAgIGNvbnN0IF9jbGFzcyA9IGNsYXNzVHJlZVt1cmldO1xuICAgIGxldCBwcm9wcztcbiAgICBpZiAoX2NsYXNzKSB7XG4gICAgICBwcm9wcyA9IF9jbGFzcy5wcm9wZXJ0aWVzO1xuICAgICAgcmV0dXJuIFtdLmNvbmNhdC5hcHBseSggcHJvcHMsIF9jbGFzcy5zdXBlckNsYXNzZXMubWFwKCBnZXRQcm9wcyApICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBnZXRQcm9wcygncmRmczpSZXNvdXJjZScpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIFV0aWwudW5pcXVlKCBnZXRQcm9wcyhfY2xhc3NfdXJpKSApO1xufTtcblxucHJvdG8uZ2V0Q2xhc3NTcGVjaWZpY2F0aW9ucyA9IGZ1bmN0aW9uIChfY2xhc3NfdXJpKSB7XG4gIGNvbnN0IGNsYXNzVHJlZSA9IHRoaXMuY2xhc3NUcmVlO1xuICBjb25zdCBnZXRTcGVjcyA9ICh1cmkpID0+IHtcbiAgICBjb25zdCBfY2xhc3MgPSBjbGFzc1RyZWVbdXJpXTtcbiAgICBsZXQgc3BlY3M7XG4gICAgaWYgKF9jbGFzcykge1xuICAgICAgc3BlY3MgPSBfY2xhc3Muc3BlY2lmaWNhdGlvbnM7XG4gICAgICBjb25zdCBzdXBlclNwZWNzQXJyYXkgPSBfY2xhc3Muc3VwZXJDbGFzc2VzLm1hcCggZ2V0U3BlY3MgKTtcbiAgICAgIHN1cGVyU3BlY3NBcnJheS5tYXAoKHN1cGVyU3BlY3MpID0+IHtcbiAgICAgICAgZm9yIChjb25zdCBwcm9wZXJ0eV91cmkgaW4gc3VwZXJTcGVjcykge1xuICAgICAgICAgIGlmICggIXNwZWNzW3Byb3BlcnR5X3VyaV0gKSB7XG4gICAgICAgICAgICBzcGVjc1twcm9wZXJ0eV91cmldID0gc3VwZXJTcGVjc1twcm9wZXJ0eV91cmldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNwZWNzID0gZ2V0U3BlY3MoICdyZGZzOlJlc291cmNlJyApO1xuICAgIH1cbiAgICByZXR1cm4gc3BlY3M7XG4gIH07XG4gIHJldHVybiBnZXRTcGVjcyhfY2xhc3NfdXJpKTtcbn07XG5cbnByb3RvLmdldENsYXNzVGVtcGxhdGUgPSBmdW5jdGlvbiAoX2NsYXNzX3VyaSkge1xuICBsZXQgY2xhc3NUZW1wbGF0ZXMgPSB0aGlzLnRlbXBsYXRlc1tfY2xhc3NfdXJpXTtcbiAgaWYgKCFjbGFzc1RlbXBsYXRlcykge1xuICAgIGNsYXNzVGVtcGxhdGVzID0gdGhpcy5jbGFzc2VzW19jbGFzc191cmldLmdldCgndi11aTpoYXNUZW1wbGF0ZScpO1xuICB9XG4gIHJldHVybiBjbGFzc1RlbXBsYXRlc1swXTtcbn07XG5cbnByb3RvLnByb2Nlc3NPbnRvbG9neSA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3Qgb250b2xvZ3kgPSB0aGlzLm9udG9sb2d5O1xuICBjb25zdCBvbnRvbG9naWVzID0gdGhpcy5vbnRvbG9naWVzO1xuICBjb25zdCBkYXRhdHlwZXMgPSB0aGlzLmRhdGF0eXBlcztcbiAgY29uc3QgY2xhc3NlcyA9IHRoaXMuY2xhc3NlcztcbiAgY29uc3QgcHJvcGVydGllcyA9IHRoaXMucHJvcGVydGllcztcbiAgY29uc3Qgc3BlY2lmaWNhdGlvbnMgPSB0aGlzLnNwZWNpZmljYXRpb25zO1xuICBjb25zdCBjbGFzc1RyZWUgPSB0aGlzLmNsYXNzVHJlZTtcbiAgY29uc3QgbW9kZWxzID0gdGhpcy5tb2RlbHM7XG4gIGNvbnN0IHRlbXBsYXRlcyA9IHRoaXMudGVtcGxhdGVzO1xuXG4gIC8vIEFsbG9jYXRlIG9udG9sb2d5IG9iamVjdHNcbiAgY29uc3Qgb250b2xvZ3lJbmRpdmlkdWFscyA9IG9udG9sb2d5Lm1hcCgoanNvbikgPT4ge1xuICAgIGlmIChKU09OLnN0cmluZ2lmeShqc29uKSA9PT0gJ3tcIkBcIjpcIlwifScpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBJbmRpdmlkdWFsTW9kZWwoanNvbiwgdHJ1ZSwgZmFsc2UpO1xuICB9KTtcblxuICBvbnRvbG9neUluZGl2aWR1YWxzLmZvckVhY2goKGluZGl2aWR1YWwpID0+IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCAhaW5kaXZpZHVhbCApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgdHlwZSA9IGluZGl2aWR1YWwucHJvcGVydGllc1sncmRmOnR5cGUnXVswXS5kYXRhO1xuICAgICAgY29uc3QgdXJpID0gaW5kaXZpZHVhbC5pZDtcblxuICAgICAgc3dpdGNoICggdHlwZSApIHtcbiAgICAgIGNhc2UgJ3JkZnM6Q2xhc3MnOlxuICAgICAgY2FzZSAnb3dsOkNsYXNzJzpcbiAgICAgICAgY2xhc3Nlc1t1cmldID0gaW5kaXZpZHVhbDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyZGY6UHJvcGVydHknOlxuICAgICAgY2FzZSAnb3dsOkRhdGF0eXBlUHJvcGVydHknOlxuICAgICAgY2FzZSAnb3dsOk9iamVjdFByb3BlcnR5JzpcbiAgICAgIGNhc2UgJ293bDpPbnRvbG9neVByb3BlcnR5JzpcbiAgICAgIGNhc2UgJ293bDpBbm5vdGF0aW9uUHJvcGVydHknOlxuICAgICAgICBwcm9wZXJ0aWVzW3VyaV0gPSBpbmRpdmlkdWFsO1xuICAgICAgICAvLyBJbml0aWFsaXplIGluZGl2aWR1YWwgcHJvcGVydGllcyBpbiBJbmRpdmlkdWFsTW9kZWwucHJvdG90eXBlXG4gICAgICAgIGlmICggIUluZGl2aWR1YWxNb2RlbC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkodXJpKSApIHtcbiAgICAgICAgICBJbmRpdmlkdWFsTW9kZWwuZGVmaW5lUHJvcGVydHkodXJpKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3YtdWk6UHJvcGVydHlTcGVjaWZpY2F0aW9uJzpcbiAgICAgIGNhc2UgJ3YtdWk6RGF0YXR5cGVQcm9wZXJ0eVNwZWNpZmljYXRpb24nOlxuICAgICAgY2FzZSAndi11aTpPYmplY3RQcm9wZXJ0eVNwZWNpZmljYXRpb24nOlxuICAgICAgICBzcGVjaWZpY2F0aW9uc1t1cmldID0gaW5kaXZpZHVhbDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdvd2w6T250b2xvZ3knOlxuICAgICAgICBvbnRvbG9naWVzW3VyaV0gPSBpbmRpdmlkdWFsO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JkZnM6RGF0YXR5cGUnOlxuICAgICAgICBkYXRhdHlwZXNbdXJpXSA9IGluZGl2aWR1YWw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndi11aTpDbGFzc01vZGVsJzpcbiAgICAgICAgbW9kZWxzW3VyaV0gPSBpbmRpdmlkdWFsO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3YtdWk6VGVtcGxhdGVTcGVjaWZpY2F0aW9uJzpcbiAgICAgICAgY29uc3QgZm9yQ2xhc3MgPSBpbmRpdmlkdWFsLnByb3BlcnRpZXNbJ3YtdWk6Zm9yQ2xhc3MnXVswXS5kYXRhO1xuICAgICAgICBpZiAodGVtcGxhdGVzW2ZvckNsYXNzXSkge1xuICAgICAgICAgIHRlbXBsYXRlc1tmb3JDbGFzc10ucHVzaChpbmRpdmlkdWFsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0ZW1wbGF0ZXNbZm9yQ2xhc3NdID0gW2luZGl2aWR1YWxdO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdPbnRvbG9neSBpbml0IGZhaWxlZCwgdXJpID0nLCBpbmRpdmlkdWFsLmlkKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIFByb2Nlc3MgY2xhc3Nlc1xuICBPYmplY3Qua2V5cyhjbGFzc2VzKS5mb3JFYWNoKCh1cmkpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgX2NsYXNzID0gY2xhc3Nlc1t1cmldO1xuICAgICAgLy8gcG9wdWxhdGUgY2xhc3NUcmVlXG4gICAgICBpZiAoICFjbGFzc1RyZWVbX2NsYXNzLmlkXSApIHtcbiAgICAgICAgY2xhc3NUcmVlW19jbGFzcy5pZF0gPSB7XG4gICAgICAgICAgc3VwZXJDbGFzc2VzOiBbXSxcbiAgICAgICAgICBwcm9wZXJ0aWVzOiBbXSxcbiAgICAgICAgICBzcGVjaWZpY2F0aW9uczoge30sXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICAvLyByZGZzOlJlc291cmNlIGlzIGEgdG9wIGxldmVsIGNsYXNzXG4gICAgICBpZiAoIF9jbGFzcy5pZCA9PT0gJ3JkZnM6UmVzb3VyY2UnICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBJZiBjbGFzcyBpcyBub3QgYSBzdWJjbGFzcyBvZiBhbm90aGVyIHRoZW4gbWFrZSBpdCBhIHN1YmNsYXNzIG9mIHJkZnM6UmVzb3VyY2VcbiAgICAgIGlmICggIV9jbGFzcy5oYXNWYWx1ZSgncmRmczpzdWJDbGFzc09mJykgKSB7XG4gICAgICAgIF9jbGFzc1sncmRmczpzdWJDbGFzc09mJ10gPSBbY2xhc3Nlc1sncmRmczpSZXNvdXJjZSddXTtcbiAgICAgIH1cbiAgICAgIF9jbGFzc1sncmRmczpzdWJDbGFzc09mJ10ubWFwKChzdXBlckNsYXNzKSA9PiB7XG4gICAgICAgIGNsYXNzVHJlZVtfY2xhc3MuaWRdLnN1cGVyQ2xhc3Nlcy5wdXNoKCBzdXBlckNsYXNzLmlkICk7XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignT250b2xvZ3kgaW5pdCBmYWlsZWQsIHVyaSA9JywgdXJpKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIFByb2Nlc3MgcHJvcGVydGllc1xuICBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKS5mb3JFYWNoKCh1cmkpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcHJvcGVydHkgPSBwcm9wZXJ0aWVzW3VyaV07XG4gICAgICBpZiAoIXByb3BlcnR5WydyZGZzOmRvbWFpbiddKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHByb3BlcnR5WydyZGZzOmRvbWFpbiddLm1hcCgoIF9jbGFzcyApID0+IHtcbiAgICAgICAgY2xhc3NUcmVlW19jbGFzcy5pZF0ucHJvcGVydGllcy5wdXNoKHByb3BlcnR5LmlkKTtcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdPbnRvbG9neSBpbml0IGZhaWxlZCwgdXJpID0nLCB1cmkpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gUHJvY2VzcyBzcGVjaWZpY2F0aW9uc1xuICBPYmplY3Qua2V5cyhzcGVjaWZpY2F0aW9ucykuZm9yRWFjaCgodXJpKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNwZWMgPSBzcGVjaWZpY2F0aW9uc1t1cmldO1xuICAgICAgaWYgKCFzcGVjWyd2LXVpOmZvckNsYXNzJ10pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc3BlY1sndi11aTpmb3JDbGFzcyddLm1hcCgoX2NsYXNzKSA9PiB7XG4gICAgICAgIHNwZWNbJ3YtdWk6Zm9yUHJvcGVydHknXS5tYXAoKHByb3ApID0+IHtcbiAgICAgICAgICBjbGFzc1RyZWVbX2NsYXNzLmlkXS5zcGVjaWZpY2F0aW9uc1twcm9wLmlkXSA9IHNwZWMuaWQ7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ09udG9sb2d5IGluaXQgZmFpbGVkLCB1cmkgPScsIHVyaSk7XG4gICAgfVxuICB9KTtcblxuICAvLyBQcm9jZXNzIHRlbXBsYXRlIHNwZWNpZmljYXRpb25zXG4gIE9iamVjdC5rZXlzKHRlbXBsYXRlcykuZm9yRWFjaCgodXJpKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIHRlbXBsYXRlc1t1cmldID0gdGVtcGxhdGVzW3VyaV0uc29ydCgoY3VyLCBwcmV2KSA9PiB7XG4gICAgICAgIGlmIChjdXIucHJvcGVydGllc1sndi1zOmxvYWRQcmlvcml0eSddKSB7XG4gICAgICAgICAgaWYgKHByZXYucHJvcGVydGllc1sndi1zOmxvYWRQcmlvcml0eSddKSB7XG4gICAgICAgICAgICByZXR1cm4gY3VyLnByb3BlcnRpZXNbJ3Ytczpsb2FkUHJpb3JpdHknXVswXS5kYXRhIC0gcHJldi5wcm9wZXJ0aWVzWyd2LXM6bG9hZFByaW9yaXR5J11bMF0uZGF0YTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgfSkubWFwKCh0ZW1wbGF0ZVNwZWMpID0+IHRlbXBsYXRlU3BlYy5wcm9wZXJ0aWVzWyd2LXVpOmRlZmF1bHRUZW1wbGF0ZSddWzBdLmRhdGEpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdPbnRvbG9neSBpbml0IGZhaWxlZCwgdXJpID0nLCB1cmkpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gSW5pdCBvbnRvbG9neSBpbmRpdmlkdWFsc1xuICBjb25zdCBpbml0UHJvbWlzZXMgPSBvbnRvbG9neUluZGl2aWR1YWxzLm1hcCgoaW5kaXZpZHVhbCwgaSkgPT4ge1xuICAgIHJldHVybiBpbmRpdmlkdWFsLmluaXQoKVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4gY29uc29sZS5lcnJvcignT250b2xvZ3kgaW5kaXZpZHVhbCBpbml0IGZhaWxlZCwgdXJpID0nLCBpbmRpdmlkdWFsLmlkKSk7XG4gIH0pO1xuXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBQcm9taXNlLmFsbChpbml0UHJvbWlzZXMpLnRoZW4oKCkgPT4gdGhpcyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzKTtcbiAgfVxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0VBU0E7QUFDQTtBQUNBO0FBQ0E7RUFDQSxTQUFTQSxRQUFRQSxDQUFBLEVBQUk7SUFDbkI7SUFDQSxJQUFJQSxRQUFRLENBQUNDLFNBQVMsQ0FBQ0Msa0JBQWtCLEVBQUU7TUFDekMsT0FBT0YsUUFBUSxDQUFDQyxTQUFTLENBQUNDLGtCQUFrQjtJQUM5QztJQUNBRixRQUFRLENBQUNDLFNBQVMsQ0FBQ0Msa0JBQWtCLEdBQUcsSUFBSTtJQUU1QyxJQUFJLENBQUNDLFFBQVEsR0FBRyxFQUFFO0lBQ2xCLElBQUksQ0FBQ0MsVUFBVSxHQUFHLENBQUMsQ0FBQztJQUNwQixJQUFJLENBQUNDLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFDbkIsSUFBSSxDQUFDQyxP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