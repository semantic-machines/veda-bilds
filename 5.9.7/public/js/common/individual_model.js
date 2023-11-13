"use strict";

System.register(["../common/veda.js", "../common/lib/riot.js", "../common/backend.js", "../browser/update_service.js", "../common/weak_cache.js", "../common/util.js"], function (_export, _context) {
  "use strict";

  var veda, riot, Backend, UpdateService, WeakCache, Util, updateService, proto, reg_uri, reg_date, reg_ml_string, reg_round_decimal;
  function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }
  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function () {}; return { s: F, n: function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function (e) { throw e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function () { it = it.call(o); }, n: function () { var step = it.next(); normalCompletion = step.done; return step; }, e: function (e) { didErr = true; err = e; }, f: function () { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
  /**
   * Represents an individual in the system.
   *
   * @constructor
   * @param {string|object|undefined} uri - The URI of the individual or an object with additional parameters.
   * @param {boolean} [cache=true] - Indicates if the individual should be cached.
   * @param {boolean} [init=true] - Indicates if the individual should be initialized with the class specific model upon load.
   */
  function IndividualModel(uri) {
    var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var init = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    if (_typeof(uri) === 'object' && !uri['@']) {
      // Parse parameters if uri is passed as an object
      cache = uri.cache;
      init = uri.init;
      uri = uri.uri;
    }

    // Define Model data
    this._ = {
      cache: cache,
      init: init
    };
    this.removedObjs = [];
    if (_typeof(uri) === 'object') {
      // Initialize model with uri object parameters
      this.properties = _objectSpread({}, uri);
      this.original = JSON.stringify(this.properties);
      this.isNew(false);
      this.isLoaded(true);
      this.isSync(true);
    } else if (typeof uri === 'string') {
      // Initialize model with URI
      this.properties = {};
      this.original = JSON.stringify(this.properties);
      this.id = uri;
      this.isNew(false);
      this.isLoaded(false);
      this.isSync(false);
    } else if (typeof uri === 'undefined') {
      // Generate a new URI if uri is not specified
      this.properties = {};
      this.original = JSON.stringify(this.properties);
      this.id = Util.genUri();
      this.isNew(true);
      this.isLoaded(false);
      this.isSync(false);
    }
    if (cache) {
      var cached = IndividualModel.cache.get(this.id);
      if (cached) {
        if (_typeof(uri) === 'object') {
          // Use a cached model if possible
          cached._ = this._;
          cached.properties = this.properties;
          cached.original = this.original;
        }
        return cached;
      } else {
        IndividualModel.cache.set(this.id, this);
      }
    }
    riot.observable(this);
    this.on('rdf:type', this.init);
    this.on('beforeSave', beforeSaveHandler);
    return this;
  }

  /**
   * Save handler. Sets creator & creation date
   * @this IndividualModel
   */
  function beforeSaveHandler() {
    var now = new Date();
    var user = veda.appointment ? veda.appointment : veda.user;
    if (!this.hasValue('v-s:creator')) {
      this.set('v-s:creator', [user]);
    }
    if (!this.hasValue('v-s:created')) {
      this.set('v-s:created', [now]);
    }
    if (veda.user.id === 'cfg:Administrator') {
      return;
    } else if (!this.hasValue('v-s:lastEditor') || !this.hasValue('v-s:edited') || this.get('v-s:lastEditor')[0].id !== user.id || now - this.get('v-s:edited')[0] > 1000) {
      this.set('v-s:edited', [now]);
      this.set('v-s:lastEditor', [user]);
    }
  }
  /**
   * Utility fn
   * @param {Array} arr
   * @return {Array}
   */
  function unique(arr) {
    var n = {};
    var r = [];
    for (var i = 0, val; i < arr.length; i++) {
      val = arr[i].type + arr[i].data + (arr[i].lang || '');
      if (!n[val]) {
        n[val] = true;
        r.push(arr[i]);
      }
    }
    return r;
  }

  // Define properties from ontology in IndividualModel.prototype

  /**
   * Parse serialized value
   * @param {Object} value
   * @return {string|number|Date|Boolean}
   */
  function parser(value) {
    if (value.type === 'String' && value.data) {
      var string = new String(value.data);
      if (value.lang && value.lang !== 'NONE') {
        string.language = value.lang;
      }
      return string;
    } else if (value.type === 'Uri') {
      return new IndividualModel(value.data);
    } else if (value.type === 'Datetime') {
      return new Date(Date.parse(value.data));
    } else if (value.type === 'Decimal') {
      return parseFloat(value.data);
    } else if (value.type === 'Integer') {
      return parseInt(value.data);
    } else if (value.type === 'Boolean') {
      return Boolean(value.data);
    }
  }
  /**
   * Serialize value
   * @param {number|Boolean|Date|string|IndividualModel} value
   * @return {Object}
   */
  function serializer(value) {
    if (typeof value === 'number') {
      return {
        type: Util.isInteger(value) ? 'Integer' : 'Decimal',
        data: value
      };
    } else if (typeof value === 'boolean') {
      return {
        type: 'Boolean',
        data: value
      };
    } else if (_instanceof(value, Date)) {
      return {
        type: 'Datetime',
        data: value.toISOString().split('.')[0] + 'Z'
      };
    } else if (_instanceof(value, IndividualModel)) {
      return {
        type: 'Uri',
        data: value.id
      };
    } else if (typeof value === 'string' || _instanceof(value, String)) {
      if (reg_uri.test(value)) {
        return {
          type: 'Uri',
          data: value.valueOf()
        };
      } else if (reg_date.test(value)) {
        return {
          type: 'Datetime',
          data: value.valueOf()
        };
      } else if (reg_ml_string.test(value)) {
        return {
          type: 'String',
          data: value.replace(reg_ml_string, '$1'),
          lang: value.replace(reg_ml_string, '$2').toUpperCase()
        };
      } else if (reg_round_decimal.test(value)) {
        return {
          type: 'Decimal',
          data: parseFloat(value)
        };
      } else if (value.length) {
        return _objectSpread({
          type: 'String',
          data: value.valueOf()
        }, value.language && {
          lang: value.language
        });
      }
    }
  }

  // Special properties

  function updater(id, updateCounter) {
    var individual = new IndividualModel(id);
    individual.reset().catch(function () {});
  }

  /**
   * Unwatch individual changes on server
   */

  /**
   * Add value to individual
   * @param {String} property_uri property name
   * @param {Any_allowed_type} value
   * @return {void}
   * @this IndividualModel
   */
  function addSingleValue(property_uri, value) {
    if (value != undefined) {
      var serialized = serializer(value);
      this.properties[property_uri].push(serialized);
    }
  }

  /**
   * Remove value from individual
   * @param {String} property_uri property name
   * @param {Any_allowed_type} values
   * @param {Boolean} silently
   * @return {IndividualModel}
   */

  /**
   * Remove value from individual
   * @param {String} property_uri property name
   * @param {Any_allowed_type} value
   * @this {IndividualModel}
   * @return {void}
   */
  function removeSingleValue(property_uri, value) {
    if (value != undefined) {
      var serialized = serializer(value);
      this.properties[property_uri] = (this.properties[property_uri] || []).filter(function (item) {
        return !(item.data == serialized.data && (item.lang && serialized.lang ? item.lang === serialized.lang : true));
      });
    }
  }

  /**
   * Toggle value in individual
   * @param {String} property_uri
   * @param {Any_allowed_type} values
   * @param {Boolean} silently
   * @return {this}
   */

  /**
   * Toggle value in individual
   * @param {String} property_uri
   * @param {Any_allowed_type} value
   * @this IndividualModel
   */
  function toggleSingleValue(property_uri, value) {
    if (value != undefined) {
      if (this.hasValue(property_uri, value)) {
        removeSingleValue.call(this, property_uri, value);
      } else {
        addSingleValue.call(this, property_uri, value);
      }
    }
  }

  /**
   * Clear property values in individual
   * @param {String} property_uri
   * @param {Boolean} silently
   * @return {this}
   */

  /**
   * Prefetch linked objects. Useful for presenting objects with many links.
   * @param {Array} result
   * @param {number} depth of the object tree to prefetch
   * @param {Array} uris
   * @return {Promise}
   * @this IndividualModel
   */
  function prefetch(result, depth, uris) {
    for (var _len5 = arguments.length, allowed_props = new Array(_len5 > 3 ? _len5 - 3 : 0), _key5 = 3; _key5 < _len5; _key5++) {
      allowed_props[_key5 - 3] = arguments[_key5];
    }
    uris = Util.unique(uris);
    var getUris = uris.filter(function (uri) {
      var cached = IndividualModel.cache.get(uri);
      var loaded = cached && cached.isLoaded();
      if (cached && loaded && result.indexOf(cached) < 0) result.push(cached);
      return !cached || !loaded;
    });
    return (getUris.length ? Backend.get_individuals(veda.ticket, getUris) : Promise.resolve([])).then(function (jsonList) {
      jsonList.forEach(function (json) {
        var individual = new IndividualModel(json);
        if (result.indexOf(individual) < 0) result.push(individual);
      });
      if (depth - 1 === 0) return result;
      var nextUris = [];
      uris.forEach(function (uri) {
        var individual = new IndividualModel(uri);
        var props = individual.properties;
        Object.keys(props).forEach(function (prop) {
          if (prop === '@' || allowed_props.length && allowed_props.indexOf(prop) < 0) return;
          props[prop].forEach(function (value) {
            return value.type === 'Uri' && nextUris.push(value.data);
          });
        });
      });
      if (!nextUris.length) return result;
      return prefetch.apply(void 0, [result, depth - 1, nextUris].concat(allowed_props));
    });
  }
  return {
    setters: [function (_commonVedaJs) {
      veda = _commonVedaJs.default;
    }, function (_commonLibRiotJs) {
      riot = _commonLibRiotJs.default;
    }, function (_commonBackendJs) {
      Backend = _commonBackendJs.default;
    }, function (_browserUpdate_serviceJs) {
      UpdateService = _browserUpdate_serviceJs.default;
    }, function (_commonWeak_cacheJs) {
      WeakCache = _commonWeak_cacheJs.default;
    }, function (_commonUtilJs) {
      Util = _commonUtilJs.default;
    }],
    execute: function () {
      _export("default", IndividualModel); // Create an instance of UpdateService if running in a browser
      if (typeof window !== 'undefined') {
        updateService = new UpdateService();
        updateService.start();
      }

      // Create a weak cache for IndividualModel instances
      IndividualModel.cache = new WeakCache();
      proto = IndividualModel.prototype;
      proto.get = function (property_uri) {
        if (!this.properties[property_uri]) return [];
        return this.properties[property_uri].map(parser).filter(function (i) {
          return typeof i !== 'undefined';
        });
      };
      proto.set = function (property_uri, values, silently) {
        var _this = this;
        if (!Array.isArray(values)) {
          values = [values];
        }
        var serialized = values.map(serializer).filter(Boolean);
        var uniq = unique(serialized);
        var prevValues = this.properties[property_uri] == undefined ? [] : this.properties[property_uri];
        var isChanged = false;
        if (uniq.length !== prevValues.length) {
          isChanged = true;
        } else {
          var _iterator = _createForOfIteratorHelper(uniq),
            _step;
          try {
            var _loop = function _loop() {
              var value = _step.value;
              var isExist = prevValues.some(function (prevValue) {
                return prevValue.data == value.data && prevValue.type == value.type;
              });
              if (!isExist) {
                isChanged = true;
                return "break";
              }
            };
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var _ret = _loop();
              if (_ret === "break") break;
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
        if (isChanged) {
          this.isSync(false);
          if (uniq.length) {
            this.properties[property_uri] = uniq;
          } else {
            delete this.properties[property_uri];
          }
          if (!silently) {
            values = this.get(property_uri);
            return this.trigger('propertyModified', property_uri, values).then(function () {
              return _this.trigger(property_uri, values);
            });
          }
        }
        return Promise.resolve(this);
      };
      IndividualModel.defineProperty = function (property_uri) {
        Object.defineProperty(proto, property_uri, {
          get: function get() {
            return this.get(property_uri);
          },
          set: function set(values) {
            this.set(property_uri, values);
          },
          configurable: false,
          enumerable: false
        });
      };
      reg_uri = /^[a-z][a-z-0-9]*:([a-zA-Z0-9-_\.])*$/;
      reg_date = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
      reg_ml_string = /^([\s\S]*)\^([a-z]{2})$/im;
      reg_round_decimal = /^-?\d+([\.\,])0$/;
      Object.defineProperty(proto, 'id', {
        get: function get() {
          return this.properties['@'];
        },
        set: function set(value) {
          var previous = this.properties && this.properties['@'];
          this.properties['@'] = value;
          if (previous && this._.cache && IndividualModel.cache.get(previous)) {
            IndividualModel.cache.delete(previous);
            IndividualModel.cache.set(this.id, this);
          }
        }
      });
      Object.defineProperty(proto, 'membership', {
        get: function get() {
          var _this2 = this;
          if (this.isNew()) {
            this._.membership = new IndividualModel({
              cache: false
            });
            return Promise.resolve(this._.membership);
          }
          return Backend.get_membership(veda.ticket, this.id).then(function (membershipJSON) {
            _this2._.membership = new IndividualModel({
              uri: membershipJSON,
              cache: false
            });
            return _this2._.membership;
          }).catch(function (error) {
            console.error('Membership failed', _this2.id);
            _this2._.membership = new IndividualModel({
              cache: false
            });
            return _this2._.membership;
          });
        },
        configurable: false,
        enumerable: false
      });
      proto.memberOf = function () {
        return this.membership.then(function (membership) {
          return membership.hasValue('v-s:memberOf') ? membership.properties['v-s:memberOf'].map(function (group_item) {
            return group_item.data;
          }) : [];
        });
      };
      proto.isMemberOf = function (group_uri) {
        return this.membership.then(function (membership) {
          return membership.hasValue('v-s:memberOf', group_uri);
        });
      };
      Object.defineProperty(proto, 'rights', {
        get: function get() {
          var _this3 = this;
          if (this.isNew()) {
            this._.rights = new IndividualModel({
              cache: false
            });
            this._.rights['v-s:canCreate'] = [true];
            this._.rights['v-s:canRead'] = [true];
            this._.rights['v-s:canUpdate'] = [true];
            this._.rights['v-s:canDelete'] = [true];
            return Promise.resolve(this._.rights);
          }
          return Backend.get_rights(veda.ticket, this.id).then(function (rightsJSON) {
            _this3._.rights = new IndividualModel(rightsJSON, false);
            return _this3._.rights;
          }).catch(function (error) {
            console.error('Rights failed', _this3.id);
            _this3._.rights = new IndividualModel({
              cache: false
            });
            return _this3._.rights;
          });
        },
        configurable: false,
        enumerable: false
      });
      proto.can = function (action) {
        action = action.charAt(0).toUpperCase() + action.slice(1).toLowerCase();
        return this.rights.then(function (rights) {
          return rights.hasValue('v-s:can' + action, true);
        });
      };
      proto.canCreate = function () {
        return this.can('Create');
      };
      proto.canRead = function () {
        return this.can('Read');
      };
      proto.canUpdate = function () {
        return this.can('Update');
      };
      proto.canDelete = function () {
        return this.can('Delete');
      };
      Object.defineProperty(proto, 'rightsOrigin', {
        get: function get() {
          var _this4 = this;
          return Backend.get_rights_origin(veda.ticket, this.id).then(function (rightsOriginArr) {
            _this4._.rightsOrigin = Promise.all(rightsOriginArr.map(function (item) {
              return new IndividualModel(item, false);
            }));
            return _this4._.rightsOrigin;
          }).catch(function (error) {
            console.error('Rights failed', _this4.id);
            _this4._.rightsOrigin = [];
            return _this4._.rightsOrigin;
          });
        },
        configurable: false,
        enumerable: false
      });

      /**
       * Watch individual changes on server
       */
      proto.watch = function () {
        if (!updateService) return;
        updateService.subscribe(this, [this.id, this.get('v-s:updateCounter')[0], updater]);
      };
      proto.unwatch = function () {
        if (!updateService) return;
        updateService.unsubscribe(this.id);
      };

      /**
       * Load individual specified by uri from backend.
       * @return {Promise<IndividualModel>}
       */
      proto.load = function () {
        var _this5 = this;
        if (this.isLoading() && typeof window !== 'undefined') {
          return this.isLoading();
        }
        return this.isLoading(this.trigger('beforeLoad').then(function () {
          if (_this5.isNew() || _this5.isLoaded() && (veda.status === 'online' || veda.status === 'offline' || !veda.status)) {
            return _this5;
          } else if (_this5.isLoaded() && veda.status === 'limited') {
            return _this5.reset();
          } else {
            return Backend.get_individual(veda.ticket, _this5.id).then(function (data) {
              _this5.isSync(true);
              _this5.isLoaded(true);
              _this5.properties = data;
              _this5.original = JSON.stringify(data);
            });
          }
        }).then(function () {
          return _this5.init();
        }).then(function () {
          return _this5.trigger('afterLoad');
        }).then(function () {
          _this5.isLoading(false);
          _this5.watch();
          return _this5;
        }).catch(function (error) {
          console.error('Load individual failed', _this5.id);
          _this5.isLoading(false);
          throw error;
        }));
      };

      /**
       * Save current individual to backend
       * @param {boolean} isAtomic
       * @return {Promise<IndividualModel>}
       */
      proto.save = function (isAtomic) {
        var _this6 = this;
        if (isAtomic == undefined) isAtomic = true;
        if (this.isSync()) {
          return Promise.resolve(this);
        }
        if (this.isSaving() && this.isSync() && typeof window !== 'undefined') {
          return this.isSaving();
        }
        return this.isSaving(this.trigger('beforeSave').then(function () {
          _this6.properties = Object.keys(_this6.properties).reduce(function (acc, property_uri) {
            if (property_uri === '@') return acc;
            if (!acc[property_uri].length) delete acc[property_uri];
            return acc;
          }, _this6.properties);
          var original = _this6.original ? JSON.parse(_this6.original) : {
            '@': _this6.id
          };
          var delta = Util.diff(_this6.properties, original);
          return (_this6.isNew() || isAtomic ? Backend.put_individual(veda.ticket, _this6.properties) : Promise.all([delta.added && Object.keys(delta.added).length ? (delta.added['@'] = _this6.id, Backend.add_to_individual(veda.ticket, delta.added)) : undefined, delta.differ && Object.keys(delta.differ).length ? (delta.differ['@'] = _this6.id, Backend.set_in_individual(veda.ticket, delta.differ)) : undefined, delta.missing && Object.keys(delta.missing).length ? (delta.missing['@'] = _this6.id, Backend.remove_from_individual(veda.ticket, delta.missing)) : undefined])).then(function () {
            _this6.original = JSON.stringify(_this6.properties);
            _this6.isNew(false);
            _this6.isSync(true);
            _this6.isLoaded(true);
          });
        }).then(function () {
          return _this6.trigger('afterSave');
        }).then(function () {
          _this6.isSaving(false);
          _this6.watch();
          return _this6;
        }).catch(function (error) {
          console.error('Save individual failed', _this6.id);
          _this6.isSaving(false);
          throw error;
        }));
      };

      /**
       * Save individual tree to backend
       * @param {IndividualModel} parent
       * @param {Array} acc
       * @param {WeakSet} visited
       * @return {Promise<IndividualModel>}
       */
      proto.saveAll = function (parent, acc, visited) {
        var _this7 = this;
        acc = acc || [];
        visited = visited || new WeakSet();
        var toBeSaved = this.isNew() || this.isLoaded() && !this.isSync() && !this.hasValue('rdf:type', 'rdfs:Class') && !this.hasValue('rdf:type', 'owl:Class');
        return Promise.resolve().then(function () {
          return toBeSaved && _this7.trigger('beforeSave');
        }).then(function () {
          if (visited.has(_this7)) return;
          visited.add(_this7);
          if (toBeSaved) acc.push(_this7.properties);
          var children = [];
          for (var property in _this7.properties) {
            if (property === '@') continue;
            var values = _this7.get(property);
            if (!_instanceof(values[0], IndividualModel)) continue;
            children = children.concat(values.map(function (value) {
              return value.saveAll(_this7, acc, visited);
            }));
          }
          for (var i = 0; i < _this7.removedObjs.length; i++) {
            var value = _this7.removedObjs[i];
            if (!_instanceof(value, IndividualModel)) continue;
            children = children.concat(value.saveAll(_this7, acc, visited));
          }
          return Promise.all(children);
        }).then(function () {
          return !parent && Promise.all(acc).then(function (acc) {
            return acc.length && Backend.put_individuals(veda.ticket, acc);
          });
        }).then(function () {
          return !parent && acc.forEach(function (props) {
            var individual = new IndividualModel(props['@']);
            individual.original = JSON.stringify(props);
            individual.isNew(false);
            individual.isSync(true);
            individual.isLoaded(true);
            individual.watch();
            individual.trigger('afterSave');
          });
        }).catch(function (error) {
          console.error('Save individual failed', _this7.id);
          throw error;
        });
      };

      /**
       * Reset current individual to backend state
       * @param {Boolean} forced
       * @return {Promise<IndividualModel>}
       */
      proto.reset = function () {
        var _this8 = this;
        /**
         * Merge original from backend with local changes
         * @param {Object} server_state
         * @return {void}
         */
        var mergeServerState = function mergeServerState(server_state) {
          _this8.original = JSON.stringify(server_state);
          var delta = Util.diff(_this8.properties, server_state);
          _this8.properties = server_state;
          _this8.isNew(false);
          _this8.isSync(true);
          _this8.isLoaded(true);
          return Promise.all(Object.keys(delta.added).concat(Object.keys(delta.differ), Object.keys(delta.missing)).map(function (property_uri) {
            var values = _this8.get(property_uri);
            return _this8.trigger('propertyModified', property_uri, values).then(function () {
              return _this8.trigger(property_uri, values);
            });
          }));
        };
        return this.trigger('beforeReset').then(function () {
          return !_this8.isNew() ? Backend.get_individual(veda.ticket, _this8.id, false).then(mergeServerState) : null;
        }).then(function () {
          return _this8.trigger('afterReset');
        }).then(function () {
          _this8.watch();
          return _this8;
        }).catch(function (error) {
          console.error('Reset individual failed', _this8.id);
          throw error;
        });
      };

      /**
       * Reset individual tree to backend state
       * @param {WeakSet} visited
       * @return {Promise<IndividualModel>}
       */
      proto.resetAll = function (visited) {
        var _this9 = this;
        visited = visited || new WeakSet();
        var toBeReset = this.isLoaded() && !this.isSync();
        return Promise.resolve().then(function () {
          if (visited.has(_this9)) return;
          visited.add(_this9);
          var children = [];
          for (var property in _this9.properties) {
            if (property === '@') continue;
            var values = _this9.get(property);
            if (!_instanceof(values[0], IndividualModel)) continue;
            children = children.concat(values.map(function (value) {
              return value.resetAll(visited);
            }));
          }
          return Promise.all(children);
        }).then(function () {
          return toBeReset && _this9.reset();
        }).catch(function (error) {
          console.error('Reset individual failed', _this9.id);
          throw error;
        });
      };

      /**
       * Mark current individual as deleted in backend (set v-s:deleted = true)
       * @return {Promise<IndividualModel>}
       */
      proto.delete = function () {
        var _this10 = this;
        if (this.isDeleting() && typeof window !== 'undefined') {
          return this.isDeleting();
        }
        return this.isDeleting(this.trigger('beforeDelete').then(function () {
          if (_this10.isNew()) {
            return;
          }
          _this10['v-s:deleted'] = [true];
          _this10.addValue('rdf:type', 'v-s:Deletable');
          return _this10.save();
        }).then(function () {
          return _this10.trigger('afterDelete');
        }).then(function () {
          _this10.isDeleting(false);
          return _this10;
        }).catch(function (error) {
          console.error('Delete individual failed', _this10.id);
          _this10.isDeleting(false);
          throw error;
        }));
      };

      /**
       * Remove individual from backend
       * @return {Promise<IndividualModel>}
       */
      proto.remove = function () {
        var _this11 = this;
        if (this.isRemoving() && typeof window !== 'undefined') {
          return this.isRemoving();
        }
        return this.isRemoving(this.trigger('beforeRemove').then(function () {
          IndividualModel.cache.delete(_this11.id);
          if (_this11.isNew()) return;
          return Backend.remove_individual(veda.ticket, _this11.id);
        }).then(function () {
          return _this11.trigger('afterRemove');
        }).then(function () {
          _this11.isRemoving(false);
          _this11.unwatch();
          return _this11;
        }).catch(function (error) {
          console.error('Remove individual failed', _this11.id);
          _this11.isRemoving(false);
          throw error;
        }));
      };

      /**
       * Recover current individual in backend (remove v-s:deleted property)
       * @return {Promise<IndividualModel>}
       */
      proto.recover = function () {
        var _this12 = this;
        if (this.isRecovering() && typeof window !== 'undefined') {
          return this.isRecovering();
        }
        return this.isRecovering(this.trigger('beforeRecover').then(function () {
          _this12['v-s:deleted'] = [false];
          return _this12.save();
        }).then(function () {
          return _this12.trigger('afterRecover');
        }).then(function () {
          _this12.isRecovering(false);
          return _this12;
        }).catch(function (error) {
          console.error('Recover individual failed', _this12.id);
          _this12.isRecovering(false);
          throw error;
        }));
      };

      /**
       * Check if individual has a property and optionally check if it contains a value
       * @param {String} property_uri property name
       * @param {Object} value to check
       * @return {boolean} is requested property (and optionally value) exists in this individual
       */
      proto.hasValue = function (property_uri, value) {
        if (!property_uri && typeof value !== 'undefined' && value !== null) {
          var found = false;
          for (var prop in this.properties) {
            if (prop === '@') {
              continue;
            }
            found = found || this.hasValue(prop, value);
          }
          return found;
        }
        var result = !!(this.properties[property_uri] && this.properties[property_uri].length);
        if (typeof value !== 'undefined' && value !== null) {
          var serialized = serializer(value);
          result = result && this.properties[property_uri].some(function (item) {
            return item.type === serialized.type && item.data === serialized.data && (item.lang && serialized.lang ? item.lang === serialized.lang : true);
          });
        }
        return result;
      };

      /**
       * Add value to individual
       * @param {String} property_uri property name
       * @param {Any_allowed_type} values
       * @param {Boolean} silently
       * @return {IndividualModel}
       */
      proto.addValue = function (property_uri, values, silently) {
        var _this13 = this;
        if (typeof values === 'undefined' || values === null) {
          return Promise.resolve(this);
        }
        this.properties[property_uri] = this.properties[property_uri] || [];
        if (Array.isArray(values)) {
          values.forEach(function (value) {
            return addSingleValue.call(_this13, property_uri, value);
          });
        } else {
          addSingleValue.call(this, property_uri, values);
        }
        this.isSync(false);
        if (!silently) {
          values = this.get(property_uri);
          return this.trigger('propertyModified', property_uri, values).then(function () {
            return _this13.trigger(property_uri, values);
          });
        }
        return Promise.resolve(this);
      };
      proto.removeValue = function (property_uri, values, silently) {
        var _this14 = this;
        if (!property_uri) {
          return Object.keys(this.properties).filter(function (property) {
            return property !== '@';
          }).reduce(function (p, property) {
            return p.then(function () {
              return _this14.removeValue(property, values, silently);
            });
          }, Promise.resolve());
        }
        if (!this.properties[property_uri] || !this.properties[property_uri].length || typeof values === 'undefined' || values === null) {
          return Promise.resolve(this);
        }
        if (Array.isArray(values)) {
          values.forEach(function (value) {
            return removeSingleValue.call(_this14, property_uri, value);
          });
        } else {
          removeSingleValue.call(this, property_uri, values);
        }
        this.isSync(false);
        if (!silently) {
          values = this.get(property_uri);
          return this.trigger('propertyModified', property_uri, values).then(function () {
            return _this14.trigger(property_uri, values);
          });
        }
        return Promise.resolve(this);
      };
      proto.toggleValue = function (property_uri, values, silently) {
        var _this15 = this;
        if (typeof values === 'undefined' || values === null) {
          return Promise.resolve(this);
        }
        this.properties[property_uri] = this.properties[property_uri] || [];
        if (Array.isArray(values)) {
          values.forEach(function (value) {
            return toggleSingleValue.call(_this15, property_uri, value);
          });
        } else {
          toggleSingleValue.call(this, property_uri, values);
        }
        this.isSync(false);
        if (!silently) {
          values = this.get(property_uri);
          return this.trigger('propertyModified', property_uri, values).then(function () {
            return _this15.trigger(property_uri, values);
          });
        }
        return Promise.resolve(this);
      };
      proto.clearValue = function (property_uri, silently) {
        var _this16 = this;
        if (!this.properties[property_uri] || !this.properties[property_uri].length) {
          return Promise.resolve(this);
        } else {
          delete this.properties[property_uri];
          this.isSync(false);
          if (!silently) {
            var empty = [];
            return this.trigger('propertyModified', property_uri, empty).then(function () {
              return _this16.trigger(property_uri, empty);
            });
          }
        }
        return Promise.resolve(this);
      };

      /**
       * Check if individual is an instace of specific class
       * @param {String} _class id of class to check
       * @return {boolean} is individual rdf:type subclass of requested class
       */
      proto.is = function (_class) {
        var _this17 = this;
        var isSub = function isSub(type) {
          if (is) {
            return is;
          }
          if (!type.hasValue('rdfs:subClassOf')) {
            is = is || false;
            return is;
          } else if (type.hasValue('rdfs:subClassOf', _class.id)) {
            is = is || true;
            return is;
          } else {
            var superClasses = type.get('rdfs:subClassOf');
            return Promise.all(superClasses.map(isSub)).then(function (results) {
              return results.reduce(function (state, isSubClass) {
                return state || isSubClass;
              }, false);
            });
          }
        };
        if (typeof _class.valueOf() === 'string') {
          _class = new IndividualModel(_class.valueOf());
        }
        var types = this.get('rdf:type');
        var is = types.reduce(function (state, type) {
          return state || _this17.hasValue('rdf:type', _class.id);
        }, false);
        if (is) {
          return Promise.resolve(is);
        } else {
          return Promise.all(types.map(isSub)).then(function (results) {
            return results.reduce(function (state, isSubClass) {
              return state || isSubClass;
            }, false);
          });
        }
      };

      /**
       * Initialize individual with class specific domain properties and methods
       * @param {boolean} forced
       * @return {Promise<IndividualModel>}
       */
      proto.init = function (forced) {
        var _this18 = this;
        if (!forced && (this.isInited() || !this._.init)) {
          return Promise.resolve(this);
        }
        var isClass = this.hasValue('rdf:type', 'owl:Class') || this.hasValue('rdf:type', 'rdfs:Class');
        if (this.hasValue('v-ui:hasModel') && !isClass) {
          return this.get('v-ui:hasModel')[0].load().then(function (model) {
            if (!model.hasValue('rdf:type', 'v-ui:ClassModel')) {
              throw new TypeError('v-ui:ClassModel required!');
            }
            if (!model.modelFn) {
              model.modelFn = new Function('veda', model['v-s:script'][0] + ' //# sourceURL=' + model.id);
            }
            model.modelFn.call(_this18, veda);
            _this18.isInited(true);
            return _this18;
          });
        } else {
          var types_promises = this.get('rdf:type').map(function (type_promise) {
            return type_promise.load();
          });
          return Promise.all(types_promises).then(function (types) {
            var models_promises = [];
            types.map(function (type) {
              if (type.hasValue('v-ui:hasModel')) {
                models_promises.push(type.get('v-ui:hasModel')[0].load());
              }
            });
            return Promise.all(models_promises);
          }).then(function (models) {
            models.forEach(function (model) {
              if (!model.modelFn) {
                model.modelFn = new Function('veda', model.get('v-s:script')[0] + ' //# sourceURL=' + model.id);
              }
              model.modelFn.call(_this18, veda);
            });
            _this18.isInited(true);
            return _this18;
          });
        }
      };

      /**
       * Clone individual with different (generated) id
       * @return {Promise<IndividualModel>} clone of this individual with different id.
       */
      proto.clone = function () {
        var cloneProperties = JSON.parse(JSON.stringify(this.properties));
        cloneProperties['@'] = Util.genUri();
        var clone = new IndividualModel(cloneProperties);
        clone.isNew(true);
        clone.isSync(false);
        clone.clearValue('v-s:updateCounter');
        return clone.init();
      };

      /**
       * Set/get flag whether individual is initialized
       * @param {boolean} value
       * @return {boolean}
       */
      proto.isInited = function (value) {
        if (typeof value !== 'undefined') {
          this._.isInited = value;
        }
        return this._.isInited;
      };

      /**
       * Set/get flag whether individual is synchronized with db
       * @param {boolean} value
       * @return {boolean}
       */
      proto.isSync = function (value) {
        if (typeof value !== 'undefined') {
          this._.isSync = value;
        }
        return this._.isSync;
      };

      /**
       * Set/get flag whether individual is new (not saved in db)
       * @param {boolean} value
       * @return {boolean}
       */
      proto.isNew = function (value) {
        if (typeof value !== 'undefined') {
          this._.isNew = value;
        }
        return this._.isNew;
      };

      /**
       * Set/get flag whether individual was loaded from db
       * @param {boolean} value
       * @return {boolean}
       */
      proto.isLoaded = function (value) {
        if (typeof value !== 'undefined') {
          this._.isLoaded = value;
        }
        return this._.isLoaded;
      };
      proto.isPending = function (operation, value) {
        if (typeof value !== 'undefined') {
          this._[operation] = value;
        }
        return this._[operation];
      };
      proto.isLoading = function (value) {
        return this.isPending('loading', value);
      };
      proto.isSaving = function (value) {
        return this.isPending('saving', value);
      };
      proto.isDeleting = function (value) {
        return this.isPending('deleting', value);
      };
      proto.isRemoving = function (value) {
        return this.isPending('removing', value);
      };
      proto.isRecovering = function (value) {
        return this.isPending('recovering', value);
      };

      /**
       * Serialize to JSON
       * @return {Object} JSON representation of individual.
       */
      proto.toJson = function () {
        return this.properties;
      };

      /**
       * Serialize to string
       * @return {String} String representation of individual.
       */
      proto.toString = function () {
        if (this.hasValue('rdfs:label')) {
          return this.get('rdfs:label').map(Util.formatValue).join(' ');
        } else if (this.hasValue('rdf:type')) {
          return this.get('rdf:type')[0].toString() + ': ' + this.id;
        } else {
          return this.id;
        }
      };

      /**
       * Return this
       * @return {String} individual id.
       */
      proto.valueOf = function () {
        return this.id;
      };

      /**
       * Get values for first property chain branch.
       * @return {Promise<Array>}
       */
      proto.getPropertyChain = function () {
        var _this19 = this;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        var property_uri = args.shift();
        return this.load().then(function () {
          if (_this19.hasValue(property_uri)) {
            if (!args.length) {
              return _this19[property_uri];
            } else {
              return _this19.getPropertyChain.apply(_this19[property_uri][0], args);
            }
          }
          return [];
        }).catch(function (error) {
          console.error('Get property chain failed');
          return [];
        });
      };

      /**
       * Get values for all property chain branches.
       * @return {Promise<Array>}
       */
      proto.getChainValue = function () {
        for (var _len2 = arguments.length, properties = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          properties[_key2] = arguments[_key2];
        }
        var individuals = this;
        if (!Array.isArray(individuals)) {
          individuals = [individuals];
        }
        var property_uri = properties.shift();
        var promises = individuals.map(function (individual) {
          return individual.load();
        });
        return Promise.all(promises).then(function (loadedIndividuals) {
          var children = loadedIndividuals.reduce(function (acc, individual) {
            return acc.concat(individual[property_uri]);
          }, []);
          if (!properties.length) {
            return children;
          } else {
            return proto.getChainValue.apply(children, properties);
          }
        }).catch(function (error) {
          console.error('Get chain value failed');
          return [];
        });
      };

      /**
       * Check value for all property chain branches.
       * @param {string} sought_value
       * @param {...string} ...args
       * @return {Promise<Boolean>}
       */
      proto.hasChainValue = function (sought_value) {
        for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          args[_key3 - 1] = arguments[_key3];
        }
        return this.getChainValue.apply(this, args).then(function (values) {
          return values.reduce(function (state, value) {
            return state || sought_value.valueOf() == value.valueOf();
          }, false);
        });
      };

      /**
       * Prefetch linked objects. Useful for presenting objects with many links.
       * @param {number} depth of the object tree to prefetch.
       * @return {Promise}
       */
      proto.prefetch = function (depth) {
        var _this20 = this;
        for (var _len4 = arguments.length, allowed_props = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          allowed_props[_key4 - 1] = arguments[_key4];
        }
        depth = depth || 1;
        return this.load().then(function () {
          return prefetch.apply(void 0, [[], depth, [_this20.id]].concat(allowed_props));
        });
      };
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJJbmRpdmlkdWFsTW9kZWwiLCJ1cmkiLCJjYWNoZSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsImluaXQiLCJfdHlwZW9mIiwiXyIsInJlbW92ZWRPYmpzIiwicHJvcGVydGllcyIsIl9vYmplY3RTcHJlYWQiLCJvcmlnaW5hbCIsIkpTT04iLCJzdHJpbmdpZnkiLCJpc05ldyIsImlzTG9hZGVkIiwiaXNTeW5jIiwiaWQiLCJVdGlsIiwiZ2VuVXJpIiwiY2FjaGVkIiwiZ2V0Iiwic2V0IiwicmlvdCIsIm9ic2VydmFibGUiLCJvbiIsImJlZm9yZVNhdmVIYW5kbGVyIiwibm93IiwiRGF0ZSIsInVzZXIiLCJ2ZWRhIiwiYXBwb2ludG1lbnQiLCJoYXNWYWx1ZSIsInVuaXF1ZSIsImFyciIsIm4iLCJyIiwiaSIsInZhbCIsInR5cGUiLCJkYXRhIiwibGFuZyIsInB1c2giLCJwYXJzZXIiLCJ2YWx1ZSIsInN0cmluZyIsIlN0cmluZyIsImxhbmd1YWdlIiwicGFyc2UiLCJwYXJzZUZsb2F0IiwicGFyc2VJbnQiLCJCb29sZWFuIiwic2VyaWFsaXplciIsImlzSW50ZWdlciIsIl9pbnN0YW5jZW9mIiwidG9JU09TdHJpbmciLCJzcGxpdCIsInJlZ191cmkiLCJ0ZXN0IiwidmFsdWVPZiIsInJlZ19kYXRlIiwicmVnX21sX3N0cmluZyIsInJlcGxhY2UiLCJ0b1VwcGVyQ2FzZSIsInJlZ19yb3VuZF9kZWNpbWFsIiwidXBkYXRlciIsInVwZGF0ZUNvdW50ZXIiLCJpbmRpdmlkdWFsIiwicmVzZXQiLCJjYXRjaCIsImFkZFNpbmdsZVZhbHVlIiwicHJvcGVydHlfdXJpIiwic2VyaWFsaXplZCIsInJlbW92ZVNpbmdsZVZhbHVlIiwiZmlsdGVyIiwiaXRlbSIsInRvZ2dsZVNpbmdsZVZhbHVlIiwiY2FsbCIsInByZWZldGNoIiwicmVzdWx0IiwiZGVwdGgiLCJ1cmlzIiwiX2xlbjUiLCJhbGxvd2VkX3Byb3BzIiwiQXJyYXkiLCJfa2V5NSIsImdldFVyaXMiLCJsb2FkZWQiLCJpbmRleE9mIiwiQmFja2VuZCIsImdldF9pbmRpdmlkdWFscyIsInRpY2tldCIsIlByb21pc2UiLCJyZXNvbHZlIiwidGhlbiIsImpzb25MaXN0IiwiZm9yRWFjaCIsImpzb24iLCJuZXh0VXJpcyIsInByb3BzIiwiT2JqZWN0Iiwia2V5cyIsInByb3AiLCJhcHBseSIsImNvbmNhdCIsInNldHRlcnMiLCJfY29tbW9uVmVkYUpzIiwiZGVmYXVsdCIsIl9jb21tb25MaWJSaW90SnMiLCJfY29tbW9uQmFja2VuZEpzIiwiX2Jyb3dzZXJVcGRhdGVfc2VydmljZUpzIiwiVXBkYXRlU2VydmljZSIsIl9jb21tb25XZWFrX2NhY2hlSnMiLCJXZWFrQ2FjaGUiLCJfY29tbW9uVXRpbEpzIiwiZXhlY3V0ZSIsIl9leHBvcnQiLCJ3aW5kb3ciLCJ1cGRhdGVTZXJ2aWNlIiwic3RhcnQiLCJwcm90byIsInByb3RvdHlwZSIsIm1hcCIsInZhbHVlcyIsInNpbGVudGx5IiwiX3RoaXMiLCJpc0FycmF5IiwidW5pcSIsInByZXZWYWx1ZXMiLCJpc0NoYW5nZWQiLCJfaXRlcmF0b3IiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsIl9zdGVwIiwiX2xvb3AiLCJpc0V4aXN0Iiwic29tZSIsInByZXZWYWx1ZSIsInMiLCJkb25lIiwiX3JldCIsImVyciIsImUiLCJmIiwidHJpZ2dlciIsImRlZmluZVByb3BlcnR5IiwiY29uZmlndXJhYmxlIiwiZW51bWVyYWJsZSIsInByZXZpb3VzIiwiZGVsZXRlIiwiX3RoaXMyIiwibWVtYmVyc2hpcCIsImdldF9tZW1iZXJzaGlwIiwibWVtYmVyc2hpcEpTT04iLCJlcnJvciIsImNvbnNvbGUiLCJtZW1iZXJPZiIsImdyb3VwX2l0ZW0iLCJpc01lbWJlck9mIiwiZ3JvdXBfdXJpIiwiX3RoaXMzIiwicmlnaHRzIiwiZ2V0X3JpZ2h0cyIsInJpZ2h0c0pTT04iLCJjYW4iLCJhY3Rpb24iLCJjaGFyQXQiLCJzbGljZSIsInRvTG93ZXJDYXNlIiwiY2FuQ3JlYXRlIiwiY2FuUmVhZCIsImNhblVwZGF0ZSIsImNhbkRlbGV0ZSIsIl90aGlzNCIsImdldF9yaWdodHNfb3JpZ2luIiwicmlnaHRzT3JpZ2luQXJyIiwicmlnaHRzT3JpZ2luIiwiYWxsIiwid2F0Y2giLCJzdWJzY3JpYmUiLCJ1bndhdGNoIiwidW5zdWJzY3JpYmUiLCJsb2FkIiwiX3RoaXM1IiwiaXNMb2FkaW5nIiwic3RhdHVzIiwiZ2V0X2luZGl2aWR1YWwiLCJzYXZlIiwiaXNBdG9taWMiLCJfdGhpczYiLCJpc1NhdmluZyIsInJlZHVjZSIsImFjYyIsImRlbHRhIiwiZGlmZiIsInB1dF9pbmRpdmlkdWFsIiwiYWRkZWQiLCJhZGRfdG9faW5kaXZpZHVhbCIsImRpZmZlciIsInNldF9pbl9pbmRpdmlkdWFsIiwibWlzc2luZyIsInJlbW92ZV9mcm9tX2luZGl2aWR1YWwiLCJzYXZlQWxsIiwicGFyZW50IiwidmlzaXRlZCIsIl90aGlzNyIsIldlYWtTZXQiLCJ0b0JlU2F2ZWQiLCJoYXMiLCJhZGQiLCJjaGlsZHJlbiIsInByb3BlcnR5IiwicHV0X2luZGl2aWR1YWxzIiwiX3RoaXM4IiwibWVyZ2VTZXJ2ZXJTdGF0ZSIsInNlcnZlcl9zdGF0ZSIsInJlc2V0QWxsIiwiX3RoaXM5IiwidG9CZVJlc2V0IiwiX3RoaXMxMCIsImlzRGVsZXRpbmciLCJhZGRWYWx1ZSIsInJlbW92ZSIsIl90aGlzMTEiLCJpc1JlbW92aW5nIiwicmVtb3ZlX2luZGl2aWR1YWwiLCJyZWNvdmVyIiwiX3RoaXMxMiIsImlzUmVjb3ZlcmluZyIsImZvdW5kIiwiX3RoaXMxMyIsInJlbW92ZVZhbHVlIiwiX3RoaXMxNCIsInAiLCJ0b2dnbGVWYWx1ZSIsIl90aGlzMTUiLCJjbGVhclZhbHVlIiwiX3RoaXMxNiIsImVtcHR5IiwiaXMiLCJfY2xhc3MiLCJfdGhpczE3IiwiaXNTdWIiLCJzdXBlckNsYXNzZXMiLCJyZXN1bHRzIiwic3RhdGUiLCJpc1N1YkNsYXNzIiwidHlwZXMiLCJmb3JjZWQiLCJfdGhpczE4IiwiaXNJbml0ZWQiLCJpc0NsYXNzIiwibW9kZWwiLCJUeXBlRXJyb3IiLCJtb2RlbEZuIiwiRnVuY3Rpb24iLCJ0eXBlc19wcm9taXNlcyIsInR5cGVfcHJvbWlzZSIsIm1vZGVsc19wcm9taXNlcyIsIm1vZGVscyIsImNsb25lIiwiY2xvbmVQcm9wZXJ0aWVzIiwiaXNQZW5kaW5nIiwib3BlcmF0aW9uIiwidG9Kc29uIiwidG9TdHJpbmciLCJmb3JtYXRWYWx1ZSIsImpvaW4iLCJnZXRQcm9wZXJ0eUNoYWluIiwiX3RoaXMxOSIsIl9sZW4iLCJhcmdzIiwiX2tleSIsInNoaWZ0IiwiZ2V0Q2hhaW5WYWx1ZSIsIl9sZW4yIiwiX2tleTIiLCJpbmRpdmlkdWFscyIsInByb21pc2VzIiwibG9hZGVkSW5kaXZpZHVhbHMiLCJoYXNDaGFpblZhbHVlIiwic291Z2h0X3ZhbHVlIiwiX2xlbjMiLCJfa2V5MyIsIl90aGlzMjAiLCJfbGVuNCIsIl9rZXk0Il0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc291cmNlLXdlYi9qcy9jb21tb24vaW5kaXZpZHVhbF9tb2RlbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEluZGl2aWR1YWwgTW9kZWxcbiAqIEBtb2R1bGUgSW5kaXZpZHVhbE1vZGVsXG4gKi9cblxuXG5pbXBvcnQgdmVkYSBmcm9tICcuLi9jb21tb24vdmVkYS5qcyc7XG5pbXBvcnQgcmlvdCBmcm9tICcuLi9jb21tb24vbGliL3Jpb3QuanMnO1xuaW1wb3J0IEJhY2tlbmQgZnJvbSAnLi4vY29tbW9uL2JhY2tlbmQuanMnO1xuaW1wb3J0IFVwZGF0ZVNlcnZpY2UgZnJvbSAnLi4vYnJvd3Nlci91cGRhdGVfc2VydmljZS5qcyc7XG5pbXBvcnQgV2Vha0NhY2hlIGZyb20gJy4uL2NvbW1vbi93ZWFrX2NhY2hlLmpzJztcbmltcG9ydCBVdGlsIGZyb20gJy4uL2NvbW1vbi91dGlsLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgSW5kaXZpZHVhbE1vZGVsO1xuXG4vLyBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgVXBkYXRlU2VydmljZSBpZiBydW5uaW5nIGluIGEgYnJvd3NlclxubGV0IHVwZGF0ZVNlcnZpY2U7XG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgdXBkYXRlU2VydmljZSA9IG5ldyBVcGRhdGVTZXJ2aWNlKCk7XG4gIHVwZGF0ZVNlcnZpY2Uuc3RhcnQoKTtcbn1cblxuLy8gQ3JlYXRlIGEgd2VhayBjYWNoZSBmb3IgSW5kaXZpZHVhbE1vZGVsIGluc3RhbmNlc1xuSW5kaXZpZHVhbE1vZGVsLmNhY2hlID0gbmV3IFdlYWtDYWNoZSgpO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gaW5kaXZpZHVhbCBpbiB0aGUgc3lzdGVtLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fHVuZGVmaW5lZH0gdXJpIC0gVGhlIFVSSSBvZiB0aGUgaW5kaXZpZHVhbCBvciBhbiBvYmplY3Qgd2l0aCBhZGRpdGlvbmFsIHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtjYWNoZT10cnVlXSAtIEluZGljYXRlcyBpZiB0aGUgaW5kaXZpZHVhbCBzaG91bGQgYmUgY2FjaGVkLlxuICogQHBhcmFtIHtib29sZWFufSBbaW5pdD10cnVlXSAtIEluZGljYXRlcyBpZiB0aGUgaW5kaXZpZHVhbCBzaG91bGQgYmUgaW5pdGlhbGl6ZWQgd2l0aCB0aGUgY2xhc3Mgc3BlY2lmaWMgbW9kZWwgdXBvbiBsb2FkLlxuICovXG5mdW5jdGlvbiBJbmRpdmlkdWFsTW9kZWwgKHVyaSwgY2FjaGUgPSB0cnVlLCBpbml0ID0gdHJ1ZSkge1xuICBpZiAodHlwZW9mIHVyaSA9PT0gJ29iamVjdCcgJiYgIXVyaVsnQCddKSB7XG4gICAgLy8gUGFyc2UgcGFyYW1ldGVycyBpZiB1cmkgaXMgcGFzc2VkIGFzIGFuIG9iamVjdFxuICAgIGNhY2hlID0gdXJpLmNhY2hlO1xuICAgIGluaXQgPSB1cmkuaW5pdDtcbiAgICB1cmkgPSB1cmkudXJpO1xuICB9XG5cbiAgLy8gRGVmaW5lIE1vZGVsIGRhdGFcbiAgdGhpcy5fID0ge2NhY2hlLCBpbml0fTtcbiAgdGhpcy5yZW1vdmVkT2JqcyA9IFtdO1xuXG4gIGlmICh0eXBlb2YgdXJpID09PSAnb2JqZWN0Jykge1xuICAgIC8vIEluaXRpYWxpemUgbW9kZWwgd2l0aCB1cmkgb2JqZWN0IHBhcmFtZXRlcnNcbiAgICB0aGlzLnByb3BlcnRpZXMgPSB7Li4udXJpfTtcbiAgICB0aGlzLm9yaWdpbmFsID0gSlNPTi5zdHJpbmdpZnkodGhpcy5wcm9wZXJ0aWVzKTtcbiAgICB0aGlzLmlzTmV3KGZhbHNlKTtcbiAgICB0aGlzLmlzTG9hZGVkKHRydWUpO1xuICAgIHRoaXMuaXNTeW5jKHRydWUpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB1cmkgPT09ICdzdHJpbmcnKSB7XG4gICAgLy8gSW5pdGlhbGl6ZSBtb2RlbCB3aXRoIFVSSVxuICAgIHRoaXMucHJvcGVydGllcyA9IHt9O1xuICAgIHRoaXMub3JpZ2luYWwgPSBKU09OLnN0cmluZ2lmeSh0aGlzLnByb3BlcnRpZXMpO1xuICAgIHRoaXMuaWQgPSB1cmk7XG4gICAgdGhpcy5pc05ldyhmYWxzZSk7XG4gICAgdGhpcy5pc0xvYWRlZChmYWxzZSk7XG4gICAgdGhpcy5pc1N5bmMoZmFsc2UpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB1cmkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gR2VuZXJhdGUgYSBuZXcgVVJJIGlmIHVyaSBpcyBub3Qgc3BlY2lmaWVkXG4gICAgdGhpcy5wcm9wZXJ0aWVzID0ge307XG4gICAgdGhpcy5vcmlnaW5hbCA9IEpTT04uc3RyaW5naWZ5KHRoaXMucHJvcGVydGllcyk7XG4gICAgdGhpcy5pZCA9IFV0aWwuZ2VuVXJpKCk7XG4gICAgdGhpcy5pc05ldyh0cnVlKTtcbiAgICB0aGlzLmlzTG9hZGVkKGZhbHNlKTtcbiAgICB0aGlzLmlzU3luYyhmYWxzZSk7XG4gIH1cblxuICBpZiAoY2FjaGUpIHtcbiAgICBjb25zdCBjYWNoZWQgPSBJbmRpdmlkdWFsTW9kZWwuY2FjaGUuZ2V0KHRoaXMuaWQpO1xuICAgIGlmIChjYWNoZWQpIHtcbiAgICAgIGlmICh0eXBlb2YgdXJpID09PSAnb2JqZWN0Jykge1xuICAgICAgICAvLyBVc2UgYSBjYWNoZWQgbW9kZWwgaWYgcG9zc2libGVcbiAgICAgICAgY2FjaGVkLl8gPSB0aGlzLl87XG4gICAgICAgIGNhY2hlZC5wcm9wZXJ0aWVzID0gdGhpcy5wcm9wZXJ0aWVzO1xuICAgICAgICBjYWNoZWQub3JpZ2luYWwgPSB0aGlzLm9yaWdpbmFsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNhY2hlZDtcbiAgICB9IGVsc2Uge1xuICAgICAgSW5kaXZpZHVhbE1vZGVsLmNhY2hlLnNldCh0aGlzLmlkLCB0aGlzKTtcbiAgICB9XG4gIH1cblxuICByaW90Lm9ic2VydmFibGUodGhpcyk7XG4gIHRoaXMub24oJ3JkZjp0eXBlJywgdGhpcy5pbml0KTtcbiAgdGhpcy5vbignYmVmb3JlU2F2ZScsIGJlZm9yZVNhdmVIYW5kbGVyKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8qKlxuICogU2F2ZSBoYW5kbGVyLiBTZXRzIGNyZWF0b3IgJiBjcmVhdGlvbiBkYXRlXG4gKiBAdGhpcyBJbmRpdmlkdWFsTW9kZWxcbiAqL1xuZnVuY3Rpb24gYmVmb3JlU2F2ZUhhbmRsZXIgKCkge1xuICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICBjb25zdCB1c2VyID0gdmVkYS5hcHBvaW50bWVudCA/IHZlZGEuYXBwb2ludG1lbnQgOiB2ZWRhLnVzZXI7XG5cbiAgaWYgKCAhdGhpcy5oYXNWYWx1ZSgndi1zOmNyZWF0b3InKSApIHtcbiAgICB0aGlzLnNldCgndi1zOmNyZWF0b3InLCBbdXNlcl0pO1xuICB9XG4gIGlmICggIXRoaXMuaGFzVmFsdWUoJ3YtczpjcmVhdGVkJykgKSB7XG4gICAgdGhpcy5zZXQoJ3YtczpjcmVhdGVkJywgW25vd10pO1xuICB9XG5cbiAgaWYgKHZlZGEudXNlci5pZCA9PT0gJ2NmZzpBZG1pbmlzdHJhdG9yJykge1xuICAgIHJldHVybjtcbiAgfSBlbHNlIGlmIChcbiAgICAhdGhpcy5oYXNWYWx1ZSgndi1zOmxhc3RFZGl0b3InKSB8fFxuICAgICF0aGlzLmhhc1ZhbHVlKCd2LXM6ZWRpdGVkJykgfHxcbiAgICB0aGlzLmdldCgndi1zOmxhc3RFZGl0b3InKVswXS5pZCAhPT0gdXNlci5pZCB8fFxuICAgIChub3cgLSB0aGlzLmdldCgndi1zOmVkaXRlZCcpWzBdKSA+IDEwMDBcbiAgKSB7XG4gICAgdGhpcy5zZXQoJ3YtczplZGl0ZWQnLCBbbm93XSk7XG4gICAgdGhpcy5zZXQoJ3YtczpsYXN0RWRpdG9yJywgW3VzZXJdKTtcbiAgfVxufVxuXG5jb25zdCBwcm90byA9IEluZGl2aWR1YWxNb2RlbC5wcm90b3R5cGU7XG5cbnByb3RvLmdldCA9IGZ1bmN0aW9uIChwcm9wZXJ0eV91cmkpIHtcbiAgaWYgKCF0aGlzLnByb3BlcnRpZXNbcHJvcGVydHlfdXJpXSkgcmV0dXJuIFtdO1xuICByZXR1cm4gdGhpcy5wcm9wZXJ0aWVzW3Byb3BlcnR5X3VyaV0ubWFwKHBhcnNlcikuZmlsdGVyKChpKSA9PiB0eXBlb2YgaSAhPT0gJ3VuZGVmaW5lZCcpO1xufTtcblxucHJvdG8uc2V0ID0gZnVuY3Rpb24gKHByb3BlcnR5X3VyaSwgdmFsdWVzLCBzaWxlbnRseSkge1xuICBpZiAoICFBcnJheS5pc0FycmF5KHZhbHVlcykgKSB7XG4gICAgdmFsdWVzID0gW3ZhbHVlc107XG4gIH1cbiAgY29uc3Qgc2VyaWFsaXplZCA9IHZhbHVlcy5tYXAoc2VyaWFsaXplcikuZmlsdGVyKEJvb2xlYW4pO1xuICBjb25zdCB1bmlxID0gdW5pcXVlKHNlcmlhbGl6ZWQpO1xuICBjb25zdCBwcmV2VmFsdWVzID0gdGhpcy5wcm9wZXJ0aWVzW3Byb3BlcnR5X3VyaV0gPT0gdW5kZWZpbmVkID8gW10gOiB0aGlzLnByb3BlcnRpZXNbcHJvcGVydHlfdXJpXTtcbiAgbGV0IGlzQ2hhbmdlZCA9IGZhbHNlO1xuICBpZiAodW5pcS5sZW5ndGggIT09IHByZXZWYWx1ZXMubGVuZ3RoKSB7XG4gICAgaXNDaGFuZ2VkID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIHVuaXEpIHtcbiAgICAgIGNvbnN0IGlzRXhpc3QgPSBwcmV2VmFsdWVzLnNvbWUoZnVuY3Rpb24gKHByZXZWYWx1ZSkge1xuICAgICAgICByZXR1cm4gcHJldlZhbHVlLmRhdGEgPT0gdmFsdWUuZGF0YSAmJiBwcmV2VmFsdWUudHlwZSA9PSB2YWx1ZS50eXBlO1xuICAgICAgfSk7XG4gICAgICBpZiAoIWlzRXhpc3QpIHtcbiAgICAgICAgaXNDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmIChpc0NoYW5nZWQpIHtcbiAgICB0aGlzLmlzU3luYyhmYWxzZSk7XG4gICAgaWYgKHVuaXEubGVuZ3RoKSB7XG4gICAgICB0aGlzLnByb3BlcnRpZXNbcHJvcGVydHlfdXJpXSA9IHVuaXE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB0aGlzLnByb3BlcnRpZXNbcHJvcGVydHlfdXJpXTtcbiAgICB9XG4gICAgaWYgKCAhc2lsZW50bHkgKSB7XG4gICAgICB2YWx1ZXMgPSB0aGlzLmdldChwcm9wZXJ0eV91cmkpO1xuICAgICAgcmV0dXJuIHRoaXMudHJpZ2dlcigncHJvcGVydHlNb2RpZmllZCcsIHByb3BlcnR5X3VyaSwgdmFsdWVzKVxuICAgICAgICAudGhlbigoKSA9PiB0aGlzLnRyaWdnZXIocHJvcGVydHlfdXJpLCB2YWx1ZXMpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzKTtcbn07XG5cbi8qKlxuICogVXRpbGl0eSBmblxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqL1xuZnVuY3Rpb24gdW5pcXVlIChhcnIpIHtcbiAgY29uc3QgbiA9IHt9OyBjb25zdCByID0gW107XG4gIGZvciAobGV0IGkgPSAwLCB2YWw7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICB2YWwgPSBhcnJbaV0udHlwZSArIGFycltpXS5kYXRhICsgKGFycltpXS5sYW5nIHx8ICcnKTtcbiAgICBpZiAoIW5bdmFsXSkge1xuICAgICAgblt2YWxdID0gdHJ1ZTtcbiAgICAgIHIucHVzaChhcnJbaV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcjtcbn1cblxuLy8gRGVmaW5lIHByb3BlcnRpZXMgZnJvbSBvbnRvbG9neSBpbiBJbmRpdmlkdWFsTW9kZWwucHJvdG90eXBlXG5JbmRpdmlkdWFsTW9kZWwuZGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiAocHJvcGVydHlfdXJpKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgcHJvcGVydHlfdXJpLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXQocHJvcGVydHlfdXJpKTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlcykge1xuICAgICAgdGhpcy5zZXQocHJvcGVydHlfdXJpLCB2YWx1ZXMpO1xuICAgIH0sXG4gICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgfSk7XG59O1xuXG4vKipcbiAqIFBhcnNlIHNlcmlhbGl6ZWQgdmFsdWVcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZVxuICogQHJldHVybiB7c3RyaW5nfG51bWJlcnxEYXRlfEJvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIHBhcnNlciAodmFsdWUpIHtcbiAgaWYgKHZhbHVlLnR5cGUgPT09ICdTdHJpbmcnICYmIHZhbHVlLmRhdGEpIHtcbiAgICBjb25zdCBzdHJpbmcgPSBuZXcgU3RyaW5nKHZhbHVlLmRhdGEpO1xuICAgIGlmICh2YWx1ZS5sYW5nICYmIHZhbHVlLmxhbmcgIT09ICdOT05FJykge1xuICAgICAgc3RyaW5nLmxhbmd1YWdlID0gdmFsdWUubGFuZztcbiAgICB9XG4gICAgcmV0dXJuIHN0cmluZztcbiAgfSBlbHNlIGlmICh2YWx1ZS50eXBlID09PSAnVXJpJykge1xuICAgIHJldHVybiBuZXcgSW5kaXZpZHVhbE1vZGVsKHZhbHVlLmRhdGEpO1xuICB9IGVsc2UgaWYgKHZhbHVlLnR5cGUgPT09ICdEYXRldGltZScpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoRGF0ZS5wYXJzZSh2YWx1ZS5kYXRhKSk7XG4gIH0gZWxzZSBpZiAodmFsdWUudHlwZSA9PT0gJ0RlY2ltYWwnKSB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUuZGF0YSk7XG4gIH0gZWxzZSBpZiAodmFsdWUudHlwZSA9PT0gJ0ludGVnZXInKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KHZhbHVlLmRhdGEpO1xuICB9IGVsc2UgaWYgKHZhbHVlLnR5cGUgPT09ICdCb29sZWFuJykge1xuICAgIHJldHVybiBCb29sZWFuKHZhbHVlLmRhdGEpO1xuICB9XG59XG5cbmNvbnN0IHJlZ191cmkgPSAvXlthLXpdW2Etei0wLTldKjooW2EtekEtWjAtOS1fXFwuXSkqJC87XG5jb25zdCByZWdfZGF0ZSA9IC9eXFxkezR9LVxcZHsyfS1cXGR7Mn1UXFxkezJ9OlxcZHsyfTpcXGR7Mn0oXFwuXFxkezN9KT9aJC87XG5jb25zdCByZWdfbWxfc3RyaW5nID0gL14oLiopXFxeKFthLXpdezJ9KSQvaW1zO1xuY29uc3QgcmVnX3JvdW5kX2RlY2ltYWwgPSAvXi0/XFxkKyhbXFwuXFwsXSkwJC87XG5cbi8qKlxuICogU2VyaWFsaXplIHZhbHVlXG4gKiBAcGFyYW0ge251bWJlcnxCb29sZWFufERhdGV8c3RyaW5nfEluZGl2aWR1YWxNb2RlbH0gdmFsdWVcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZnVuY3Rpb24gc2VyaWFsaXplciAodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IFV0aWwuaXNJbnRlZ2VyKHZhbHVlKSA/ICdJbnRlZ2VyJyA6ICdEZWNpbWFsJyxcbiAgICAgIGRhdGE6IHZhbHVlLFxuICAgIH07XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ0Jvb2xlYW4nLFxuICAgICAgZGF0YTogdmFsdWUsXG4gICAgfTtcbiAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ0RhdGV0aW1lJyxcbiAgICAgIGRhdGE6IHZhbHVlLnRvSVNPU3RyaW5nKCkuc3BsaXQoJy4nKVswXSsnWicsXG4gICAgfTtcbiAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEluZGl2aWR1YWxNb2RlbCkge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnVXJpJyxcbiAgICAgIGRhdGE6IHZhbHVlLmlkLFxuICAgIH07XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB2YWx1ZSBpbnN0YW5jZW9mIFN0cmluZykge1xuICAgIGlmICggcmVnX3VyaS50ZXN0KHZhbHVlKSApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICdVcmknLFxuICAgICAgICBkYXRhOiB2YWx1ZS52YWx1ZU9mKCksXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAoIHJlZ19kYXRlLnRlc3QodmFsdWUpICkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ0RhdGV0aW1lJyxcbiAgICAgICAgZGF0YTogdmFsdWUudmFsdWVPZigpLFxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKCByZWdfbWxfc3RyaW5nLnRlc3QodmFsdWUpICkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ1N0cmluZycsXG4gICAgICAgIGRhdGE6IHZhbHVlLnJlcGxhY2UocmVnX21sX3N0cmluZywgJyQxJyksXG4gICAgICAgIGxhbmc6IHZhbHVlLnJlcGxhY2UocmVnX21sX3N0cmluZywgJyQyJykudG9VcHBlckNhc2UoKSxcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICggcmVnX3JvdW5kX2RlY2ltYWwudGVzdCh2YWx1ZSkgKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnRGVjaW1hbCcsXG4gICAgICAgIGRhdGE6IHBhcnNlRmxvYXQodmFsdWUpLFxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ1N0cmluZycsXG4gICAgICAgIGRhdGE6IHZhbHVlLnZhbHVlT2YoKSxcbiAgICAgICAgLi4udmFsdWUubGFuZ3VhZ2UgJiYge2xhbmc6IHZhbHVlLmxhbmd1YWdlfSxcbiAgICAgIH07XG4gICAgfVxuICB9XG59XG5cbi8vIFNwZWNpYWwgcHJvcGVydGllc1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAnaWQnLCB7XG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnByb3BlcnRpZXNbJ0AnXTtcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBjb25zdCBwcmV2aW91cyA9IHRoaXMucHJvcGVydGllcyAmJiB0aGlzLnByb3BlcnRpZXNbJ0AnXTtcbiAgICB0aGlzLnByb3BlcnRpZXNbJ0AnXSA9IHZhbHVlO1xuICAgIGlmIChwcmV2aW91cyAmJiB0aGlzLl8uY2FjaGUgJiYgSW5kaXZpZHVhbE1vZGVsLmNhY2hlLmdldChwcmV2aW91cykpIHtcbiAgICAgIEluZGl2aWR1YWxNb2RlbC5jYWNoZS5kZWxldGUocHJldmlvdXMpO1xuICAgICAgSW5kaXZpZHVhbE1vZGVsLmNhY2hlLnNldCh0aGlzLmlkLCB0aGlzKTtcbiAgICB9XG4gIH0sXG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAnbWVtYmVyc2hpcCcsIHtcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuaXNOZXcoKSkge1xuICAgICAgdGhpcy5fLm1lbWJlcnNoaXAgPSBuZXcgSW5kaXZpZHVhbE1vZGVsKHtjYWNoZTogZmFsc2V9KTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fLm1lbWJlcnNoaXApO1xuICAgIH1cbiAgICByZXR1cm4gQmFja2VuZC5nZXRfbWVtYmVyc2hpcCh2ZWRhLnRpY2tldCwgdGhpcy5pZClcbiAgICAgIC50aGVuKChtZW1iZXJzaGlwSlNPTikgPT4ge1xuICAgICAgICB0aGlzLl8ubWVtYmVyc2hpcCA9IG5ldyBJbmRpdmlkdWFsTW9kZWwoe3VyaTogbWVtYmVyc2hpcEpTT04sIGNhY2hlOiBmYWxzZX0pO1xuICAgICAgICByZXR1cm4gdGhpcy5fLm1lbWJlcnNoaXA7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdNZW1iZXJzaGlwIGZhaWxlZCcsIHRoaXMuaWQpO1xuICAgICAgICB0aGlzLl8ubWVtYmVyc2hpcCA9IG5ldyBJbmRpdmlkdWFsTW9kZWwoe2NhY2hlOiBmYWxzZX0pO1xuICAgICAgICByZXR1cm4gdGhpcy5fLm1lbWJlcnNoaXA7XG4gICAgICB9KTtcbiAgfSxcbiAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgZW51bWVyYWJsZTogZmFsc2UsXG59KTtcblxucHJvdG8ubWVtYmVyT2YgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLm1lbWJlcnNoaXAudGhlbigobWVtYmVyc2hpcCkgPT4ge1xuICAgIHJldHVybiBtZW1iZXJzaGlwLmhhc1ZhbHVlKCd2LXM6bWVtYmVyT2YnKSA/IG1lbWJlcnNoaXAucHJvcGVydGllc1sndi1zOm1lbWJlck9mJ10ubWFwKChncm91cF9pdGVtKSA9PiBncm91cF9pdGVtLmRhdGEpIDogW107XG4gIH0pO1xufTtcblxucHJvdG8uaXNNZW1iZXJPZiA9IGZ1bmN0aW9uIChncm91cF91cmkpIHtcbiAgcmV0dXJuIHRoaXMubWVtYmVyc2hpcC50aGVuKChtZW1iZXJzaGlwKSA9PiBtZW1iZXJzaGlwLmhhc1ZhbHVlKCd2LXM6bWVtYmVyT2YnLCBncm91cF91cmkpKTtcbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ3JpZ2h0cycsIHtcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuaXNOZXcoKSkge1xuICAgICAgdGhpcy5fLnJpZ2h0cyA9IG5ldyBJbmRpdmlkdWFsTW9kZWwoe2NhY2hlOiBmYWxzZX0pO1xuICAgICAgdGhpcy5fLnJpZ2h0c1sndi1zOmNhbkNyZWF0ZSddID0gW3RydWVdO1xuICAgICAgdGhpcy5fLnJpZ2h0c1sndi1zOmNhblJlYWQnXSA9IFt0cnVlXTtcbiAgICAgIHRoaXMuXy5yaWdodHNbJ3YtczpjYW5VcGRhdGUnXSA9IFt0cnVlXTtcbiAgICAgIHRoaXMuXy5yaWdodHNbJ3YtczpjYW5EZWxldGUnXSA9IFt0cnVlXTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fLnJpZ2h0cyk7XG4gICAgfVxuICAgIHJldHVybiBCYWNrZW5kLmdldF9yaWdodHModmVkYS50aWNrZXQsIHRoaXMuaWQpLnRoZW4oKHJpZ2h0c0pTT04pID0+IHtcbiAgICAgIHRoaXMuXy5yaWdodHMgPSBuZXcgSW5kaXZpZHVhbE1vZGVsKHJpZ2h0c0pTT04sIGZhbHNlKTtcbiAgICAgIHJldHVybiB0aGlzLl8ucmlnaHRzO1xuICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcignUmlnaHRzIGZhaWxlZCcsIHRoaXMuaWQpO1xuICAgICAgdGhpcy5fLnJpZ2h0cyA9IG5ldyBJbmRpdmlkdWFsTW9kZWwoe2NhY2hlOiBmYWxzZX0pO1xuICAgICAgcmV0dXJuIHRoaXMuXy5yaWdodHM7XG4gICAgfSk7XG4gIH0sXG4gIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gIGVudW1lcmFibGU6IGZhbHNlLFxufSk7XG5cbnByb3RvLmNhbiA9IGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgYWN0aW9uID0gYWN0aW9uLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgYWN0aW9uLnNsaWNlKDEpLnRvTG93ZXJDYXNlKCk7XG4gIHJldHVybiB0aGlzLnJpZ2h0cy50aGVuKChyaWdodHMpID0+IHJpZ2h0cy5oYXNWYWx1ZSgndi1zOmNhbicgKyBhY3Rpb24sIHRydWUpKTtcbn07XG5wcm90by5jYW5DcmVhdGUgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmNhbignQ3JlYXRlJyk7XG59O1xucHJvdG8uY2FuUmVhZCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuY2FuKCdSZWFkJyk7XG59O1xucHJvdG8uY2FuVXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5jYW4oJ1VwZGF0ZScpO1xufTtcbnByb3RvLmNhbkRlbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuY2FuKCdEZWxldGUnKTtcbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ3JpZ2h0c09yaWdpbicsIHtcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIEJhY2tlbmQuZ2V0X3JpZ2h0c19vcmlnaW4odmVkYS50aWNrZXQsIHRoaXMuaWQpLnRoZW4oKHJpZ2h0c09yaWdpbkFycikgPT4ge1xuICAgICAgdGhpcy5fLnJpZ2h0c09yaWdpbiA9IFByb21pc2UuYWxsKHJpZ2h0c09yaWdpbkFyci5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBJbmRpdmlkdWFsTW9kZWwoaXRlbSwgZmFsc2UpO1xuICAgICAgfSkpO1xuICAgICAgcmV0dXJuIHRoaXMuXy5yaWdodHNPcmlnaW47XG4gICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKCdSaWdodHMgZmFpbGVkJywgdGhpcy5pZCk7XG4gICAgICB0aGlzLl8ucmlnaHRzT3JpZ2luID0gW107XG4gICAgICByZXR1cm4gdGhpcy5fLnJpZ2h0c09yaWdpbjtcbiAgICB9KTtcbiAgfSxcbiAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgZW51bWVyYWJsZTogZmFsc2UsXG59KTtcblxuLyoqXG4gKiBXYXRjaCBpbmRpdmlkdWFsIGNoYW5nZXMgb24gc2VydmVyXG4gKi9cbnByb3RvLndhdGNoID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIXVwZGF0ZVNlcnZpY2UpIHJldHVybjtcbiAgdXBkYXRlU2VydmljZS5zdWJzY3JpYmUodGhpcywgW3RoaXMuaWQsIHRoaXMuZ2V0KCd2LXM6dXBkYXRlQ291bnRlcicpWzBdLCB1cGRhdGVyXSk7XG59O1xuXG5mdW5jdGlvbiB1cGRhdGVyIChpZCwgdXBkYXRlQ291bnRlcikge1xuICBjb25zdCBpbmRpdmlkdWFsID0gbmV3IEluZGl2aWR1YWxNb2RlbChpZCk7XG4gIGluZGl2aWR1YWwucmVzZXQoKS5jYXRjaCgoKSA9PiB7fSk7XG59XG5cbi8qKlxuICogVW53YXRjaCBpbmRpdmlkdWFsIGNoYW5nZXMgb24gc2VydmVyXG4gKi9cbnByb3RvLnVud2F0Y2ggPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghdXBkYXRlU2VydmljZSkgcmV0dXJuO1xuICB1cGRhdGVTZXJ2aWNlLnVuc3Vic2NyaWJlKHRoaXMuaWQpO1xufTtcblxuLyoqXG4gKiBMb2FkIGluZGl2aWR1YWwgc3BlY2lmaWVkIGJ5IHVyaSBmcm9tIGJhY2tlbmQuXG4gKiBAcmV0dXJuIHtQcm9taXNlPEluZGl2aWR1YWxNb2RlbD59XG4gKi9cbnByb3RvLmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICggdGhpcy5pc0xvYWRpbmcoKSAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICByZXR1cm4gdGhpcy5pc0xvYWRpbmcoKTtcbiAgfVxuICByZXR1cm4gdGhpcy5pc0xvYWRpbmcoXG4gICAgdGhpcy50cmlnZ2VyKCdiZWZvcmVMb2FkJylcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaXNOZXcoKSB8fCB0aGlzLmlzTG9hZGVkKCkgJiYgKHZlZGEuc3RhdHVzID09PSAnb25saW5lJyB8fCB2ZWRhLnN0YXR1cyA9PT0gJ29mZmxpbmUnIHx8ICF2ZWRhLnN0YXR1cykpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzTG9hZGVkKCkgJiYgdmVkYS5zdGF0dXMgPT09ICdsaW1pdGVkJykge1xuICAgICAgICAgIHJldHVybiB0aGlzLnJlc2V0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIEJhY2tlbmQuZ2V0X2luZGl2aWR1YWwodmVkYS50aWNrZXQsIHRoaXMuaWQpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNTeW5jKHRydWUpO1xuICAgICAgICAgICAgdGhpcy5pc0xvYWRlZCh0cnVlKTtcbiAgICAgICAgICAgIHRoaXMucHJvcGVydGllcyA9IGRhdGE7XG4gICAgICAgICAgICB0aGlzLm9yaWdpbmFsID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB0aGlzLmluaXQoKSlcbiAgICAgIC50aGVuKCgpID0+IHRoaXMudHJpZ2dlcignYWZ0ZXJMb2FkJykpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgdGhpcy53YXRjaCgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0xvYWQgaW5kaXZpZHVhbCBmYWlsZWQnLCB0aGlzLmlkKTtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0pLFxuICApO1xufTtcblxuLyoqXG4gKiBTYXZlIGN1cnJlbnQgaW5kaXZpZHVhbCB0byBiYWNrZW5kXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzQXRvbWljXG4gKiBAcmV0dXJuIHtQcm9taXNlPEluZGl2aWR1YWxNb2RlbD59XG4gKi9cbnByb3RvLnNhdmUgPSBmdW5jdGlvbiAoaXNBdG9taWMpIHtcbiAgaWYgKGlzQXRvbWljID09IHVuZGVmaW5lZCkgaXNBdG9taWMgPSB0cnVlO1xuICBpZiAodGhpcy5pc1N5bmMoKSkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcyk7XG4gIH1cbiAgaWYgKCB0aGlzLmlzU2F2aW5nKCkgJiYgdGhpcy5pc1N5bmMoKSAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICByZXR1cm4gdGhpcy5pc1NhdmluZygpO1xuICB9XG4gIHJldHVybiB0aGlzLmlzU2F2aW5nKFxuICAgIHRoaXMudHJpZ2dlcignYmVmb3JlU2F2ZScpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IE9iamVjdC5rZXlzKHRoaXMucHJvcGVydGllcykucmVkdWNlKChhY2MsIHByb3BlcnR5X3VyaSkgPT4ge1xuICAgICAgICAgIGlmIChwcm9wZXJ0eV91cmkgPT09ICdAJykgcmV0dXJuIGFjYztcbiAgICAgICAgICBpZiAoIWFjY1twcm9wZXJ0eV91cmldLmxlbmd0aCkgZGVsZXRlIGFjY1twcm9wZXJ0eV91cmldO1xuICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIHRoaXMucHJvcGVydGllcyk7XG5cbiAgICAgICAgY29uc3Qgb3JpZ2luYWwgPSB0aGlzLm9yaWdpbmFsID8gSlNPTi5wYXJzZSh0aGlzLm9yaWdpbmFsKSA6IHsnQCc6IHRoaXMuaWR9O1xuICAgICAgICBjb25zdCBkZWx0YSA9IFV0aWwuZGlmZih0aGlzLnByb3BlcnRpZXMsIG9yaWdpbmFsKTtcblxuICAgICAgICByZXR1cm4gKHRoaXMuaXNOZXcoKSB8fCBpc0F0b21pYyA/XG4gICAgICAgICAgQmFja2VuZC5wdXRfaW5kaXZpZHVhbCh2ZWRhLnRpY2tldCwgdGhpcy5wcm9wZXJ0aWVzKSA6XG4gICAgICAgICAgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgZGVsdGEuYWRkZWQgJiYgT2JqZWN0LmtleXMoZGVsdGEuYWRkZWQpLmxlbmd0aCA/IChkZWx0YS5hZGRlZFsnQCddID0gdGhpcy5pZCwgQmFja2VuZC5hZGRfdG9faW5kaXZpZHVhbCh2ZWRhLnRpY2tldCwgZGVsdGEuYWRkZWQpKSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGRlbHRhLmRpZmZlciAmJiBPYmplY3Qua2V5cyhkZWx0YS5kaWZmZXIpLmxlbmd0aCA/IChkZWx0YS5kaWZmZXJbJ0AnXSA9IHRoaXMuaWQsIEJhY2tlbmQuc2V0X2luX2luZGl2aWR1YWwodmVkYS50aWNrZXQsIGRlbHRhLmRpZmZlcikpIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgZGVsdGEubWlzc2luZyAmJiBPYmplY3Qua2V5cyhkZWx0YS5taXNzaW5nKS5sZW5ndGg/IChkZWx0YS5taXNzaW5nWydAJ10gPSB0aGlzLmlkLCBCYWNrZW5kLnJlbW92ZV9mcm9tX2luZGl2aWR1YWwodmVkYS50aWNrZXQsIGRlbHRhLm1pc3NpbmcpKSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICBdKVxuICAgICAgICApLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMub3JpZ2luYWwgPSBKU09OLnN0cmluZ2lmeSh0aGlzLnByb3BlcnRpZXMpO1xuICAgICAgICAgIHRoaXMuaXNOZXcoZmFsc2UpO1xuICAgICAgICAgIHRoaXMuaXNTeW5jKHRydWUpO1xuICAgICAgICAgIHRoaXMuaXNMb2FkZWQodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC50aGVuKCgpID0+IHRoaXMudHJpZ2dlcignYWZ0ZXJTYXZlJykpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuaXNTYXZpbmcoZmFsc2UpO1xuICAgICAgICB0aGlzLndhdGNoKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcignU2F2ZSBpbmRpdmlkdWFsIGZhaWxlZCcsIHRoaXMuaWQpO1xuICAgICAgICB0aGlzLmlzU2F2aW5nKGZhbHNlKTtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9KSxcbiAgKTtcbn07XG5cbi8qKlxuICogU2F2ZSBpbmRpdmlkdWFsIHRyZWUgdG8gYmFja2VuZFxuICogQHBhcmFtIHtJbmRpdmlkdWFsTW9kZWx9IHBhcmVudFxuICogQHBhcmFtIHtBcnJheX0gYWNjXG4gKiBAcGFyYW0ge1dlYWtTZXR9IHZpc2l0ZWRcbiAqIEByZXR1cm4ge1Byb21pc2U8SW5kaXZpZHVhbE1vZGVsPn1cbiAqL1xucHJvdG8uc2F2ZUFsbCA9IGZ1bmN0aW9uIChwYXJlbnQsIGFjYywgdmlzaXRlZCkge1xuICBhY2MgPSBhY2MgfHwgW107XG4gIHZpc2l0ZWQgPSB2aXNpdGVkIHx8IG5ldyBXZWFrU2V0KCk7XG4gIGNvbnN0IHRvQmVTYXZlZCA9IHRoaXMuaXNOZXcoKSB8fCB0aGlzLmlzTG9hZGVkKCkgJiYgIXRoaXMuaXNTeW5jKCkgJiYgIXRoaXMuaGFzVmFsdWUoJ3JkZjp0eXBlJywgJ3JkZnM6Q2xhc3MnKSAmJiAhdGhpcy5oYXNWYWx1ZSgncmRmOnR5cGUnLCAnb3dsOkNsYXNzJyk7XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICAgIC50aGVuKCgpID0+IHRvQmVTYXZlZCAmJiB0aGlzLnRyaWdnZXIoJ2JlZm9yZVNhdmUnKSlcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICBpZiAodmlzaXRlZC5oYXModGhpcykpIHJldHVybjtcbiAgICAgIHZpc2l0ZWQuYWRkKHRoaXMpO1xuICAgICAgaWYgKHRvQmVTYXZlZCkgYWNjLnB1c2godGhpcy5wcm9wZXJ0aWVzKTtcbiAgICAgIGxldCBjaGlsZHJlbiA9IFtdO1xuICAgICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiB0aGlzLnByb3BlcnRpZXMpIHtcbiAgICAgICAgaWYgKHByb3BlcnR5ID09PSAnQCcpIGNvbnRpbnVlO1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSB0aGlzLmdldChwcm9wZXJ0eSk7XG4gICAgICAgIGlmICghKHZhbHVlc1swXSBpbnN0YW5jZW9mIEluZGl2aWR1YWxNb2RlbCkpIGNvbnRpbnVlO1xuICAgICAgICBjaGlsZHJlbiA9IGNoaWxkcmVuLmNvbmNhdCh2YWx1ZXMubWFwKCh2YWx1ZSkgPT4gdmFsdWUuc2F2ZUFsbCh0aGlzLCBhY2MsIHZpc2l0ZWQpKSk7XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucmVtb3ZlZE9ianMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnJlbW92ZWRPYmpzW2ldO1xuICAgICAgICBpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIEluZGl2aWR1YWxNb2RlbCkpIGNvbnRpbnVlO1xuICAgICAgICBjaGlsZHJlbiA9IGNoaWxkcmVuLmNvbmNhdCh2YWx1ZS5zYXZlQWxsKHRoaXMsIGFjYywgdmlzaXRlZCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFByb21pc2UuYWxsKGNoaWxkcmVuKTtcbiAgICB9KVxuICAgIC50aGVuKCgpID0+ICFwYXJlbnQgJiYgUHJvbWlzZS5hbGwoYWNjKS50aGVuKChhY2MpID0+IGFjYy5sZW5ndGggJiYgQmFja2VuZC5wdXRfaW5kaXZpZHVhbHModmVkYS50aWNrZXQsIGFjYykpKVxuICAgIC50aGVuKCgpID0+ICFwYXJlbnQgJiYgYWNjLmZvckVhY2goKHByb3BzKSA9PiB7XG4gICAgICBjb25zdCBpbmRpdmlkdWFsID0gbmV3IEluZGl2aWR1YWxNb2RlbChwcm9wc1snQCddKTtcbiAgICAgIGluZGl2aWR1YWwub3JpZ2luYWwgPSBKU09OLnN0cmluZ2lmeShwcm9wcyk7XG4gICAgICBpbmRpdmlkdWFsLmlzTmV3KGZhbHNlKTtcbiAgICAgIGluZGl2aWR1YWwuaXNTeW5jKHRydWUpO1xuICAgICAgaW5kaXZpZHVhbC5pc0xvYWRlZCh0cnVlKTtcbiAgICAgIGluZGl2aWR1YWwud2F0Y2goKTtcbiAgICAgIGluZGl2aWR1YWwudHJpZ2dlcignYWZ0ZXJTYXZlJyk7XG4gICAgfSkpXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcignU2F2ZSBpbmRpdmlkdWFsIGZhaWxlZCcsIHRoaXMuaWQpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFJlc2V0IGN1cnJlbnQgaW5kaXZpZHVhbCB0byBiYWNrZW5kIHN0YXRlXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGZvcmNlZFxuICogQHJldHVybiB7UHJvbWlzZTxJbmRpdmlkdWFsTW9kZWw+fVxuICovXG5wcm90by5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAqIE1lcmdlIG9yaWdpbmFsIGZyb20gYmFja2VuZCB3aXRoIGxvY2FsIGNoYW5nZXNcbiAgICogQHBhcmFtIHtPYmplY3R9IHNlcnZlcl9zdGF0ZVxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgY29uc3QgbWVyZ2VTZXJ2ZXJTdGF0ZSA9IChzZXJ2ZXJfc3RhdGUpID0+IHtcbiAgICB0aGlzLm9yaWdpbmFsID0gSlNPTi5zdHJpbmdpZnkoc2VydmVyX3N0YXRlKTtcbiAgICBjb25zdCBkZWx0YSA9IFV0aWwuZGlmZih0aGlzLnByb3BlcnRpZXMsIHNlcnZlcl9zdGF0ZSk7XG4gICAgdGhpcy5wcm9wZXJ0aWVzID0gc2VydmVyX3N0YXRlO1xuICAgIHRoaXMuaXNOZXcoZmFsc2UpO1xuICAgIHRoaXMuaXNTeW5jKHRydWUpO1xuICAgIHRoaXMuaXNMb2FkZWQodHJ1ZSk7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKE9iamVjdC5rZXlzKGRlbHRhLmFkZGVkKS5jb25jYXQoT2JqZWN0LmtleXMoZGVsdGEuZGlmZmVyKSwgT2JqZWN0LmtleXMoZGVsdGEubWlzc2luZykpLm1hcCgocHJvcGVydHlfdXJpKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZXMgPSB0aGlzLmdldChwcm9wZXJ0eV91cmkpO1xuICAgICAgcmV0dXJuIHRoaXMudHJpZ2dlcigncHJvcGVydHlNb2RpZmllZCcsIHByb3BlcnR5X3VyaSwgdmFsdWVzKS50aGVuKCgpID0+IHRoaXMudHJpZ2dlcihwcm9wZXJ0eV91cmksIHZhbHVlcykpO1xuICAgIH0pKTtcbiAgfTtcblxuICByZXR1cm4gdGhpcy50cmlnZ2VyKCdiZWZvcmVSZXNldCcpXG4gICAgLnRoZW4oKCkgPT4gIXRoaXMuaXNOZXcoKSA/IEJhY2tlbmQuZ2V0X2luZGl2aWR1YWwodmVkYS50aWNrZXQsIHRoaXMuaWQsIGZhbHNlKS50aGVuKG1lcmdlU2VydmVyU3RhdGUpIDogbnVsbClcbiAgICAudGhlbigoKSA9PiB0aGlzLnRyaWdnZXIoJ2FmdGVyUmVzZXQnKSlcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLndhdGNoKCk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1Jlc2V0IGluZGl2aWR1YWwgZmFpbGVkJywgdGhpcy5pZCk7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9KTtcbn07XG5cbi8qKlxuICogUmVzZXQgaW5kaXZpZHVhbCB0cmVlIHRvIGJhY2tlbmQgc3RhdGVcbiAqIEBwYXJhbSB7V2Vha1NldH0gdmlzaXRlZFxuICogQHJldHVybiB7UHJvbWlzZTxJbmRpdmlkdWFsTW9kZWw+fVxuICovXG5wcm90by5yZXNldEFsbCA9IGZ1bmN0aW9uICh2aXNpdGVkKSB7XG4gIHZpc2l0ZWQgPSB2aXNpdGVkIHx8IG5ldyBXZWFrU2V0KCk7XG4gIGNvbnN0IHRvQmVSZXNldCA9IHRoaXMuaXNMb2FkZWQoKSAmJiAhdGhpcy5pc1N5bmMoKTtcbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgaWYgKHZpc2l0ZWQuaGFzKHRoaXMpKSByZXR1cm47XG4gICAgICB2aXNpdGVkLmFkZCh0aGlzKTtcbiAgICAgIGxldCBjaGlsZHJlbiA9IFtdO1xuICAgICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiB0aGlzLnByb3BlcnRpZXMpIHtcbiAgICAgICAgaWYgKHByb3BlcnR5ID09PSAnQCcpIGNvbnRpbnVlO1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSB0aGlzLmdldChwcm9wZXJ0eSk7XG4gICAgICAgIGlmICghKHZhbHVlc1swXSBpbnN0YW5jZW9mIEluZGl2aWR1YWxNb2RlbCkpIGNvbnRpbnVlO1xuICAgICAgICBjaGlsZHJlbiA9IGNoaWxkcmVuLmNvbmNhdCh2YWx1ZXMubWFwKCh2YWx1ZSkgPT4gdmFsdWUucmVzZXRBbGwodmlzaXRlZCkpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChjaGlsZHJlbik7XG4gICAgfSlcbiAgICAudGhlbigoKSA9PiB0b0JlUmVzZXQgJiYgdGhpcy5yZXNldCgpKVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1Jlc2V0IGluZGl2aWR1YWwgZmFpbGVkJywgdGhpcy5pZCk7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9KTtcbn07XG5cbi8qKlxuICogTWFyayBjdXJyZW50IGluZGl2aWR1YWwgYXMgZGVsZXRlZCBpbiBiYWNrZW5kIChzZXQgdi1zOmRlbGV0ZWQgPSB0cnVlKVxuICogQHJldHVybiB7UHJvbWlzZTxJbmRpdmlkdWFsTW9kZWw+fVxuICovXG5wcm90by5kZWxldGUgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICggdGhpcy5pc0RlbGV0aW5nKCkgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNEZWxldGluZygpO1xuICB9XG4gIHJldHVybiB0aGlzLmlzRGVsZXRpbmcoXG4gICAgdGhpcy50cmlnZ2VyKCdiZWZvcmVEZWxldGUnKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5pc05ldygpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXNbJ3YtczpkZWxldGVkJ10gPSBbdHJ1ZV07XG4gICAgICAgIHRoaXMuYWRkVmFsdWUoJ3JkZjp0eXBlJywgJ3YtczpEZWxldGFibGUnKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2F2ZSgpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKCgpID0+IHRoaXMudHJpZ2dlcignYWZ0ZXJEZWxldGUnKSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5pc0RlbGV0aW5nKGZhbHNlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdEZWxldGUgaW5kaXZpZHVhbCBmYWlsZWQnLCB0aGlzLmlkKTtcbiAgICAgICAgdGhpcy5pc0RlbGV0aW5nKGZhbHNlKTtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9KSxcbiAgKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGluZGl2aWR1YWwgZnJvbSBiYWNrZW5kXG4gKiBAcmV0dXJuIHtQcm9taXNlPEluZGl2aWR1YWxNb2RlbD59XG4gKi9cbnByb3RvLnJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCB0aGlzLmlzUmVtb3ZpbmcoKSAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICByZXR1cm4gdGhpcy5pc1JlbW92aW5nKCk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuaXNSZW1vdmluZyhcbiAgICB0aGlzLnRyaWdnZXIoJ2JlZm9yZVJlbW92ZScpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIEluZGl2aWR1YWxNb2RlbC5jYWNoZS5kZWxldGUodGhpcy5pZCk7XG4gICAgICAgIGlmICh0aGlzLmlzTmV3KCkpIHJldHVybjtcbiAgICAgICAgcmV0dXJuIEJhY2tlbmQucmVtb3ZlX2luZGl2aWR1YWwodmVkYS50aWNrZXQsIHRoaXMuaWQpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKCgpID0+IHRoaXMudHJpZ2dlcignYWZ0ZXJSZW1vdmUnKSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5pc1JlbW92aW5nKGZhbHNlKTtcbiAgICAgICAgdGhpcy51bndhdGNoKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcignUmVtb3ZlIGluZGl2aWR1YWwgZmFpbGVkJywgdGhpcy5pZCk7XG4gICAgICAgIHRoaXMuaXNSZW1vdmluZyhmYWxzZSk7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfSksXG4gICk7XG59O1xuXG4vKipcbiAqIFJlY292ZXIgY3VycmVudCBpbmRpdmlkdWFsIGluIGJhY2tlbmQgKHJlbW92ZSB2LXM6ZGVsZXRlZCBwcm9wZXJ0eSlcbiAqIEByZXR1cm4ge1Byb21pc2U8SW5kaXZpZHVhbE1vZGVsPn1cbiAqL1xucHJvdG8ucmVjb3ZlciA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCB0aGlzLmlzUmVjb3ZlcmluZygpICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICkge1xuICAgIHJldHVybiB0aGlzLmlzUmVjb3ZlcmluZygpO1xuICB9XG4gIHJldHVybiB0aGlzLmlzUmVjb3ZlcmluZyhcbiAgICB0aGlzLnRyaWdnZXIoJ2JlZm9yZVJlY292ZXInKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzWyd2LXM6ZGVsZXRlZCddID0gW2ZhbHNlXTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2F2ZSgpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKCgpID0+IHRoaXMudHJpZ2dlcignYWZ0ZXJSZWNvdmVyJykpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuaXNSZWNvdmVyaW5nKGZhbHNlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdSZWNvdmVyIGluZGl2aWR1YWwgZmFpbGVkJywgdGhpcy5pZCk7XG4gICAgICAgIHRoaXMuaXNSZWNvdmVyaW5nKGZhbHNlKTtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9KSxcbiAgKTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgaW5kaXZpZHVhbCBoYXMgYSBwcm9wZXJ0eSBhbmQgb3B0aW9uYWxseSBjaGVjayBpZiBpdCBjb250YWlucyBhIHZhbHVlXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlfdXJpIHByb3BlcnR5IG5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZSB0byBjaGVja1xuICogQHJldHVybiB7Ym9vbGVhbn0gaXMgcmVxdWVzdGVkIHByb3BlcnR5IChhbmQgb3B0aW9uYWxseSB2YWx1ZSkgZXhpc3RzIGluIHRoaXMgaW5kaXZpZHVhbFxuICovXG5wcm90by5oYXNWYWx1ZSA9IGZ1bmN0aW9uIChwcm9wZXJ0eV91cmksIHZhbHVlKSB7XG4gIGlmICghcHJvcGVydHlfdXJpICYmIHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgIT09IG51bGwpIHtcbiAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICBmb3IgKGNvbnN0IHByb3AgaW4gdGhpcy5wcm9wZXJ0aWVzKSB7XG4gICAgICBpZiAocHJvcCA9PT0gJ0AnKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgZm91bmQgPSBmb3VuZCB8fCB0aGlzLmhhc1ZhbHVlKHByb3AsIHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIGZvdW5kO1xuICB9XG4gIGxldCByZXN1bHQgPSAhISh0aGlzLnByb3BlcnRpZXNbcHJvcGVydHlfdXJpXSAmJiB0aGlzLnByb3BlcnRpZXNbcHJvcGVydHlfdXJpXS5sZW5ndGgpO1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgIGNvbnN0IHNlcmlhbGl6ZWQgPSBzZXJpYWxpemVyKHZhbHVlKTtcbiAgICByZXN1bHQgPSByZXN1bHQgJiYgdGhpcy5wcm9wZXJ0aWVzW3Byb3BlcnR5X3VyaV0uc29tZSgoaXRlbSkgPT4ge1xuICAgICAgcmV0dXJuIChpdGVtLnR5cGUgPT09IHNlcmlhbGl6ZWQudHlwZSAmJiBpdGVtLmRhdGEgPT09IHNlcmlhbGl6ZWQuZGF0YSAmJiAoaXRlbS5sYW5nICYmIHNlcmlhbGl6ZWQubGFuZyA/IGl0ZW0ubGFuZyA9PT0gc2VyaWFsaXplZC5sYW5nIDogdHJ1ZSkpO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIEFkZCB2YWx1ZSB0byBpbmRpdmlkdWFsXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlfdXJpIHByb3BlcnR5IG5hbWVcbiAqIEBwYXJhbSB7QW55X2FsbG93ZWRfdHlwZX0gdmFsdWVzXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHNpbGVudGx5XG4gKiBAcmV0dXJuIHtJbmRpdmlkdWFsTW9kZWx9XG4gKi9cbnByb3RvLmFkZFZhbHVlID0gZnVuY3Rpb24gKHByb3BlcnR5X3VyaSwgdmFsdWVzLCBzaWxlbnRseSkge1xuICBpZiAodHlwZW9mIHZhbHVlcyA9PT0gJ3VuZGVmaW5lZCcgfHwgdmFsdWVzID09PSBudWxsKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzKTtcbiAgfVxuICB0aGlzLnByb3BlcnRpZXNbcHJvcGVydHlfdXJpXSA9IHRoaXMucHJvcGVydGllc1twcm9wZXJ0eV91cmldIHx8IFtdO1xuICBpZiAoIEFycmF5LmlzQXJyYXkodmFsdWVzKSApIHtcbiAgICB2YWx1ZXMuZm9yRWFjaCgodmFsdWUpID0+IGFkZFNpbmdsZVZhbHVlLmNhbGwodGhpcywgcHJvcGVydHlfdXJpLCB2YWx1ZSkpO1xuICB9IGVsc2Uge1xuICAgIGFkZFNpbmdsZVZhbHVlLmNhbGwodGhpcywgcHJvcGVydHlfdXJpLCB2YWx1ZXMpO1xuICB9XG4gIHRoaXMuaXNTeW5jKGZhbHNlKTtcbiAgaWYgKCAhc2lsZW50bHkgKSB7XG4gICAgdmFsdWVzID0gdGhpcy5nZXQocHJvcGVydHlfdXJpKTtcbiAgICByZXR1cm4gdGhpcy50cmlnZ2VyKCdwcm9wZXJ0eU1vZGlmaWVkJywgcHJvcGVydHlfdXJpLCB2YWx1ZXMpXG4gICAgICAudGhlbigoKSA9PiB0aGlzLnRyaWdnZXIocHJvcGVydHlfdXJpLCB2YWx1ZXMpKTtcbiAgfVxuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMpO1xufTtcblxuLyoqXG4gKiBBZGQgdmFsdWUgdG8gaW5kaXZpZHVhbFxuICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5X3VyaSBwcm9wZXJ0eSBuYW1lXG4gKiBAcGFyYW0ge0FueV9hbGxvd2VkX3R5cGV9IHZhbHVlXG4gKiBAcmV0dXJuIHt2b2lkfVxuICogQHRoaXMgSW5kaXZpZHVhbE1vZGVsXG4gKi9cbmZ1bmN0aW9uIGFkZFNpbmdsZVZhbHVlIChwcm9wZXJ0eV91cmksIHZhbHVlKSB7XG4gIGlmICh2YWx1ZSAhPSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBzZXJpYWxpemVkID0gc2VyaWFsaXplcih2YWx1ZSk7XG4gICAgdGhpcy5wcm9wZXJ0aWVzW3Byb3BlcnR5X3VyaV0ucHVzaChzZXJpYWxpemVkKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZSB2YWx1ZSBmcm9tIGluZGl2aWR1YWxcbiAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eV91cmkgcHJvcGVydHkgbmFtZVxuICogQHBhcmFtIHtBbnlfYWxsb3dlZF90eXBlfSB2YWx1ZXNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gc2lsZW50bHlcbiAqIEByZXR1cm4ge0luZGl2aWR1YWxNb2RlbH1cbiAqL1xucHJvdG8ucmVtb3ZlVmFsdWUgPSBmdW5jdGlvbiAocHJvcGVydHlfdXJpLCB2YWx1ZXMsIHNpbGVudGx5KSB7XG4gIGlmICghcHJvcGVydHlfdXJpKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMucHJvcGVydGllcykuZmlsdGVyKChwcm9wZXJ0eSkgPT4gcHJvcGVydHkgIT09ICdAJykucmVkdWNlKFxuICAgICAgKHAsIHByb3BlcnR5KSA9PiBwLnRoZW4oKCkgPT4gdGhpcy5yZW1vdmVWYWx1ZShwcm9wZXJ0eSwgdmFsdWVzLCBzaWxlbnRseSkpLFxuICAgICAgUHJvbWlzZS5yZXNvbHZlKCksXG4gICAgKTtcbiAgfVxuICBpZiAoIXRoaXMucHJvcGVydGllc1twcm9wZXJ0eV91cmldIHx8ICF0aGlzLnByb3BlcnRpZXNbcHJvcGVydHlfdXJpXS5sZW5ndGggfHwgdHlwZW9mIHZhbHVlcyA9PT0gJ3VuZGVmaW5lZCcgfHwgdmFsdWVzID09PSBudWxsKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzKTtcbiAgfVxuICBpZiAoIEFycmF5LmlzQXJyYXkodmFsdWVzKSApIHtcbiAgICB2YWx1ZXMuZm9yRWFjaCgodmFsdWUpID0+IHJlbW92ZVNpbmdsZVZhbHVlLmNhbGwodGhpcywgcHJvcGVydHlfdXJpLCB2YWx1ZSkpO1xuICB9IGVsc2Uge1xuICAgIHJlbW92ZVNpbmdsZVZhbHVlLmNhbGwodGhpcywgcHJvcGVydHlfdXJpLCB2YWx1ZXMpO1xuICB9XG4gIHRoaXMuaXNTeW5jKGZhbHNlKTtcbiAgaWYgKCAhc2lsZW50bHkgKSB7XG4gICAgdmFsdWVzID0gdGhpcy5nZXQocHJvcGVydHlfdXJpKTtcbiAgICByZXR1cm4gdGhpcy50cmlnZ2VyKCdwcm9wZXJ0eU1vZGlmaWVkJywgcHJvcGVydHlfdXJpLCB2YWx1ZXMpXG4gICAgICAudGhlbigoKSA9PiB0aGlzLnRyaWdnZXIocHJvcGVydHlfdXJpLCB2YWx1ZXMpKTtcbiAgfVxuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMpO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgdmFsdWUgZnJvbSBpbmRpdmlkdWFsXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlfdXJpIHByb3BlcnR5IG5hbWVcbiAqIEBwYXJhbSB7QW55X2FsbG93ZWRfdHlwZX0gdmFsdWVcbiAqIEB0aGlzIHtJbmRpdmlkdWFsTW9kZWx9XG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5mdW5jdGlvbiByZW1vdmVTaW5nbGVWYWx1ZSAocHJvcGVydHlfdXJpLCB2YWx1ZSkge1xuICBpZiAodmFsdWUgIT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc3Qgc2VyaWFsaXplZCA9IHNlcmlhbGl6ZXIodmFsdWUpO1xuICAgIHRoaXMucHJvcGVydGllc1twcm9wZXJ0eV91cmldID0gKHRoaXMucHJvcGVydGllc1twcm9wZXJ0eV91cmldIHx8IFtdKS5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgIHJldHVybiAhKCBpdGVtLmRhdGEgPT0gc2VyaWFsaXplZC5kYXRhICYmIChpdGVtLmxhbmcgJiYgc2VyaWFsaXplZC5sYW5nID8gaXRlbS5sYW5nID09PSBzZXJpYWxpemVkLmxhbmcgOiB0cnVlKSApO1xuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogVG9nZ2xlIHZhbHVlIGluIGluZGl2aWR1YWxcbiAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eV91cmlcbiAqIEBwYXJhbSB7QW55X2FsbG93ZWRfdHlwZX0gdmFsdWVzXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHNpbGVudGx5XG4gKiBAcmV0dXJuIHt0aGlzfVxuICovXG5wcm90by50b2dnbGVWYWx1ZSA9IGZ1bmN0aW9uIChwcm9wZXJ0eV91cmksIHZhbHVlcywgc2lsZW50bHkpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZXMgPT09ICd1bmRlZmluZWQnIHx8IHZhbHVlcyA9PT0gbnVsbCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcyk7XG4gIH1cbiAgdGhpcy5wcm9wZXJ0aWVzW3Byb3BlcnR5X3VyaV0gPSB0aGlzLnByb3BlcnRpZXNbcHJvcGVydHlfdXJpXSB8fCBbXTtcbiAgaWYgKCBBcnJheS5pc0FycmF5KHZhbHVlcykgKSB7XG4gICAgdmFsdWVzLmZvckVhY2goKHZhbHVlKSA9PiB0b2dnbGVTaW5nbGVWYWx1ZS5jYWxsKHRoaXMsIHByb3BlcnR5X3VyaSwgdmFsdWUpKTtcbiAgfSBlbHNlIHtcbiAgICB0b2dnbGVTaW5nbGVWYWx1ZS5jYWxsKHRoaXMsIHByb3BlcnR5X3VyaSwgdmFsdWVzKTtcbiAgfVxuICB0aGlzLmlzU3luYyhmYWxzZSk7XG4gIGlmICggIXNpbGVudGx5ICkge1xuICAgIHZhbHVlcyA9IHRoaXMuZ2V0KHByb3BlcnR5X3VyaSk7XG4gICAgcmV0dXJuIHRoaXMudHJpZ2dlcigncHJvcGVydHlNb2RpZmllZCcsIHByb3BlcnR5X3VyaSwgdmFsdWVzKVxuICAgICAgLnRoZW4oKCkgPT4gdGhpcy50cmlnZ2VyKHByb3BlcnR5X3VyaSwgdmFsdWVzKSk7XG4gIH1cbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzKTtcbn07XG5cbi8qKlxuICogVG9nZ2xlIHZhbHVlIGluIGluZGl2aWR1YWxcbiAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eV91cmlcbiAqIEBwYXJhbSB7QW55X2FsbG93ZWRfdHlwZX0gdmFsdWVcbiAqIEB0aGlzIEluZGl2aWR1YWxNb2RlbFxuICovXG5mdW5jdGlvbiB0b2dnbGVTaW5nbGVWYWx1ZSAocHJvcGVydHlfdXJpLCB2YWx1ZSkge1xuICBpZiAodmFsdWUgIT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKCB0aGlzLmhhc1ZhbHVlKHByb3BlcnR5X3VyaSwgdmFsdWUpICkge1xuICAgICAgcmVtb3ZlU2luZ2xlVmFsdWUuY2FsbCh0aGlzLCBwcm9wZXJ0eV91cmksIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWRkU2luZ2xlVmFsdWUuY2FsbCh0aGlzLCBwcm9wZXJ0eV91cmksIHZhbHVlKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBDbGVhciBwcm9wZXJ0eSB2YWx1ZXMgaW4gaW5kaXZpZHVhbFxuICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5X3VyaVxuICogQHBhcmFtIHtCb29sZWFufSBzaWxlbnRseVxuICogQHJldHVybiB7dGhpc31cbiAqL1xucHJvdG8uY2xlYXJWYWx1ZSA9IGZ1bmN0aW9uIChwcm9wZXJ0eV91cmksIHNpbGVudGx5KSB7XG4gIGlmICghdGhpcy5wcm9wZXJ0aWVzW3Byb3BlcnR5X3VyaV0gfHwgIXRoaXMucHJvcGVydGllc1twcm9wZXJ0eV91cmldLmxlbmd0aCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcyk7XG4gIH0gZWxzZSB7XG4gICAgZGVsZXRlIHRoaXMucHJvcGVydGllc1twcm9wZXJ0eV91cmldO1xuICAgIHRoaXMuaXNTeW5jKGZhbHNlKTtcbiAgICBpZiAoICFzaWxlbnRseSApIHtcbiAgICAgIGNvbnN0IGVtcHR5ID0gW107XG4gICAgICByZXR1cm4gdGhpcy50cmlnZ2VyKCdwcm9wZXJ0eU1vZGlmaWVkJywgcHJvcGVydHlfdXJpLCBlbXB0eSlcbiAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy50cmlnZ2VyKHByb3BlcnR5X3VyaSwgZW1wdHkpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzKTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgaW5kaXZpZHVhbCBpcyBhbiBpbnN0YWNlIG9mIHNwZWNpZmljIGNsYXNzXG4gKiBAcGFyYW0ge1N0cmluZ30gX2NsYXNzIGlkIG9mIGNsYXNzIHRvIGNoZWNrXG4gKiBAcmV0dXJuIHtib29sZWFufSBpcyBpbmRpdmlkdWFsIHJkZjp0eXBlIHN1YmNsYXNzIG9mIHJlcXVlc3RlZCBjbGFzc1xuICovXG5wcm90by5pcyA9IGZ1bmN0aW9uIChfY2xhc3MpIHtcbiAgY29uc3QgaXNTdWIgPSBmdW5jdGlvbiAodHlwZSkge1xuICAgIGlmIChpcykge1xuICAgICAgcmV0dXJuIGlzO1xuICAgIH1cbiAgICBpZiAoIXR5cGUuaGFzVmFsdWUoJ3JkZnM6c3ViQ2xhc3NPZicpKSB7XG4gICAgICBpcyA9IGlzIHx8IGZhbHNlO1xuICAgICAgcmV0dXJuIGlzO1xuICAgIH0gZWxzZSBpZiAodHlwZS5oYXNWYWx1ZSgncmRmczpzdWJDbGFzc09mJywgX2NsYXNzLmlkKSkge1xuICAgICAgaXMgPSBpcyB8fCB0cnVlO1xuICAgICAgcmV0dXJuIGlzO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzdXBlckNsYXNzZXMgPSB0eXBlLmdldCgncmRmczpzdWJDbGFzc09mJyk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwoc3VwZXJDbGFzc2VzLm1hcChpc1N1YikpLnRoZW4oKHJlc3VsdHMpID0+IHJlc3VsdHMucmVkdWNlKChzdGF0ZSwgaXNTdWJDbGFzcykgPT4gc3RhdGUgfHwgaXNTdWJDbGFzcywgZmFsc2UpKTtcbiAgICB9XG4gIH07XG5cbiAgaWYgKHR5cGVvZiBfY2xhc3MudmFsdWVPZigpID09PSAnc3RyaW5nJykge1xuICAgIF9jbGFzcyA9IG5ldyBJbmRpdmlkdWFsTW9kZWwoIF9jbGFzcy52YWx1ZU9mKCkgKTtcbiAgfVxuICBjb25zdCB0eXBlcyA9IHRoaXMuZ2V0KCdyZGY6dHlwZScpO1xuICBsZXQgaXMgPSB0eXBlcy5yZWR1Y2UoKHN0YXRlLCB0eXBlKSA9PiBzdGF0ZSB8fCB0aGlzLmhhc1ZhbHVlKCdyZGY6dHlwZScsIF9jbGFzcy5pZCksIGZhbHNlKTtcbiAgaWYgKGlzKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShpcyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHR5cGVzLm1hcChpc1N1YikpLnRoZW4oKHJlc3VsdHMpID0+IHtcbiAgICAgIHJldHVybiByZXN1bHRzLnJlZHVjZSgoc3RhdGUsIGlzU3ViQ2xhc3MpID0+IHN0YXRlIHx8IGlzU3ViQ2xhc3MsIGZhbHNlKTtcbiAgICB9KTtcbiAgfVxufTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGluZGl2aWR1YWwgd2l0aCBjbGFzcyBzcGVjaWZpYyBkb21haW4gcHJvcGVydGllcyBhbmQgbWV0aG9kc1xuICogQHBhcmFtIHtib29sZWFufSBmb3JjZWRcbiAqIEByZXR1cm4ge1Byb21pc2U8SW5kaXZpZHVhbE1vZGVsPn1cbiAqL1xucHJvdG8uaW5pdCA9IGZ1bmN0aW9uIChmb3JjZWQpIHtcbiAgaWYgKCFmb3JjZWQgJiYgKHRoaXMuaXNJbml0ZWQoKSB8fCAhdGhpcy5fLmluaXQpKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzKTtcbiAgfVxuICBjb25zdCBpc0NsYXNzID0gdGhpcy5oYXNWYWx1ZSgncmRmOnR5cGUnLCAnb3dsOkNsYXNzJykgfHwgdGhpcy5oYXNWYWx1ZSgncmRmOnR5cGUnLCAncmRmczpDbGFzcycpO1xuICBpZiAoIHRoaXMuaGFzVmFsdWUoJ3YtdWk6aGFzTW9kZWwnKSAmJiAhaXNDbGFzcyApIHtcbiAgICByZXR1cm4gdGhpcy5nZXQoJ3YtdWk6aGFzTW9kZWwnKVswXS5sb2FkKClcbiAgICAgIC50aGVuKChtb2RlbCkgPT4ge1xuICAgICAgICBpZiAoIW1vZGVsLmhhc1ZhbHVlKCdyZGY6dHlwZScsICd2LXVpOkNsYXNzTW9kZWwnKSkge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3YtdWk6Q2xhc3NNb2RlbCByZXF1aXJlZCEnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW1vZGVsLm1vZGVsRm4pIHtcbiAgICAgICAgICBtb2RlbC5tb2RlbEZuID0gbmV3IEZ1bmN0aW9uKCd2ZWRhJywgbW9kZWxbJ3YtczpzY3JpcHQnXVswXSArICcgLy8jIHNvdXJjZVVSTD0nICsgbW9kZWwuaWQpO1xuICAgICAgICB9XG4gICAgICAgIG1vZGVsLm1vZGVsRm4uY2FsbCh0aGlzLCB2ZWRhKTtcbiAgICAgICAgdGhpcy5pc0luaXRlZCh0cnVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCB0eXBlc19wcm9taXNlcyA9IHRoaXMuZ2V0KCdyZGY6dHlwZScpLm1hcCgodHlwZV9wcm9taXNlKSA9PiB7XG4gICAgICByZXR1cm4gdHlwZV9wcm9taXNlLmxvYWQoKTtcbiAgICB9KTtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoIHR5cGVzX3Byb21pc2VzIClcbiAgICAgIC50aGVuKCh0eXBlcykgPT4ge1xuICAgICAgICBjb25zdCBtb2RlbHNfcHJvbWlzZXMgPSBbXTtcbiAgICAgICAgdHlwZXMubWFwKCh0eXBlKSA9PiB7XG4gICAgICAgICAgaWYgKCB0eXBlLmhhc1ZhbHVlKCd2LXVpOmhhc01vZGVsJykgKSB7XG4gICAgICAgICAgICBtb2RlbHNfcHJvbWlzZXMucHVzaCggdHlwZS5nZXQoJ3YtdWk6aGFzTW9kZWwnKVswXS5sb2FkKCkgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoIG1vZGVsc19wcm9taXNlcyApO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChtb2RlbHMpID0+IHtcbiAgICAgICAgbW9kZWxzLmZvckVhY2goKG1vZGVsKSA9PiB7XG4gICAgICAgICAgaWYgKCAhbW9kZWwubW9kZWxGbiApIHtcbiAgICAgICAgICAgIG1vZGVsLm1vZGVsRm4gPSBuZXcgRnVuY3Rpb24oJ3ZlZGEnLCBtb2RlbC5nZXQoJ3YtczpzY3JpcHQnKVswXSArICcgLy8jIHNvdXJjZVVSTD0nICsgbW9kZWwuaWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBtb2RlbC5tb2RlbEZuLmNhbGwodGhpcywgdmVkYSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmlzSW5pdGVkKHRydWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0pO1xuICB9XG59O1xuXG4vKipcbiAqIENsb25lIGluZGl2aWR1YWwgd2l0aCBkaWZmZXJlbnQgKGdlbmVyYXRlZCkgaWRcbiAqIEByZXR1cm4ge1Byb21pc2U8SW5kaXZpZHVhbE1vZGVsPn0gY2xvbmUgb2YgdGhpcyBpbmRpdmlkdWFsIHdpdGggZGlmZmVyZW50IGlkLlxuICovXG5wcm90by5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgY2xvbmVQcm9wZXJ0aWVzID0gSlNPTi5wYXJzZSggSlNPTi5zdHJpbmdpZnkodGhpcy5wcm9wZXJ0aWVzKSApO1xuICBjbG9uZVByb3BlcnRpZXNbJ0AnXSA9IFV0aWwuZ2VuVXJpKCk7XG4gIGNvbnN0IGNsb25lID0gbmV3IEluZGl2aWR1YWxNb2RlbChjbG9uZVByb3BlcnRpZXMpO1xuICBjbG9uZS5pc05ldyh0cnVlKTtcbiAgY2xvbmUuaXNTeW5jKGZhbHNlKTtcbiAgY2xvbmUuY2xlYXJWYWx1ZSgndi1zOnVwZGF0ZUNvdW50ZXInKTtcbiAgcmV0dXJuIGNsb25lLmluaXQoKTtcbn07XG5cbi8qKlxuICogU2V0L2dldCBmbGFnIHdoZXRoZXIgaW5kaXZpZHVhbCBpcyBpbml0aWFsaXplZFxuICogQHBhcmFtIHtib29sZWFufSB2YWx1ZVxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xucHJvdG8uaXNJbml0ZWQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0aGlzLl8uaXNJbml0ZWQgPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdGhpcy5fLmlzSW5pdGVkO1xufTtcblxuLyoqXG4gKiBTZXQvZ2V0IGZsYWcgd2hldGhlciBpbmRpdmlkdWFsIGlzIHN5bmNocm9uaXplZCB3aXRoIGRiXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5wcm90by5pc1N5bmMgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0aGlzLl8uaXNTeW5jID0gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHRoaXMuXy5pc1N5bmM7XG59O1xuXG4vKipcbiAqIFNldC9nZXQgZmxhZyB3aGV0aGVyIGluZGl2aWR1YWwgaXMgbmV3IChub3Qgc2F2ZWQgaW4gZGIpXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5wcm90by5pc05ldyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgIHRoaXMuXy5pc05ldyA9IHZhbHVlO1xuICB9XG4gIHJldHVybiB0aGlzLl8uaXNOZXc7XG59O1xuXG4vKipcbiAqIFNldC9nZXQgZmxhZyB3aGV0aGVyIGluZGl2aWR1YWwgd2FzIGxvYWRlZCBmcm9tIGRiXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5wcm90by5pc0xvYWRlZCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgIHRoaXMuXy5pc0xvYWRlZCA9IHZhbHVlO1xuICB9XG4gIHJldHVybiB0aGlzLl8uaXNMb2FkZWQ7XG59O1xuXG5wcm90by5pc1BlbmRpbmcgPSBmdW5jdGlvbiAob3BlcmF0aW9uLCB2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgIHRoaXMuX1tvcGVyYXRpb25dID0gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHRoaXMuX1tvcGVyYXRpb25dO1xufTtcbnByb3RvLmlzTG9hZGluZyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICByZXR1cm4gdGhpcy5pc1BlbmRpbmcoJ2xvYWRpbmcnLCB2YWx1ZSk7XG59O1xucHJvdG8uaXNTYXZpbmcgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgcmV0dXJuIHRoaXMuaXNQZW5kaW5nKCdzYXZpbmcnLCB2YWx1ZSk7XG59O1xucHJvdG8uaXNEZWxldGluZyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICByZXR1cm4gdGhpcy5pc1BlbmRpbmcoJ2RlbGV0aW5nJywgdmFsdWUpO1xufTtcbnByb3RvLmlzUmVtb3ZpbmcgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgcmV0dXJuIHRoaXMuaXNQZW5kaW5nKCdyZW1vdmluZycsIHZhbHVlKTtcbn07XG5wcm90by5pc1JlY292ZXJpbmcgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgcmV0dXJuIHRoaXMuaXNQZW5kaW5nKCdyZWNvdmVyaW5nJywgdmFsdWUpO1xufTtcblxuLyoqXG4gKiBTZXJpYWxpemUgdG8gSlNPTlxuICogQHJldHVybiB7T2JqZWN0fSBKU09OIHJlcHJlc2VudGF0aW9uIG9mIGluZGl2aWR1YWwuXG4gKi9cbnByb3RvLnRvSnNvbiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMucHJvcGVydGllcztcbn07XG5cbi8qKlxuICogU2VyaWFsaXplIHRvIHN0cmluZ1xuICogQHJldHVybiB7U3RyaW5nfSBTdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgaW5kaXZpZHVhbC5cbiAqL1xucHJvdG8udG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLmhhc1ZhbHVlKCdyZGZzOmxhYmVsJykpIHtcbiAgICByZXR1cm4gdGhpcy5nZXQoJ3JkZnM6bGFiZWwnKS5tYXAoVXRpbC5mb3JtYXRWYWx1ZSkuam9pbignICcpO1xuICB9IGVsc2UgaWYgKHRoaXMuaGFzVmFsdWUoJ3JkZjp0eXBlJykpIHtcbiAgICByZXR1cm4gdGhpcy5nZXQoJ3JkZjp0eXBlJylbMF0udG9TdHJpbmcoKSArICc6ICcgKyB0aGlzLmlkO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0aGlzLmlkO1xuICB9XG59O1xuXG4vKipcbiAqIFJldHVybiB0aGlzXG4gKiBAcmV0dXJuIHtTdHJpbmd9IGluZGl2aWR1YWwgaWQuXG4gKi9cbnByb3RvLnZhbHVlT2YgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmlkO1xufTtcblxuLyoqXG4gKiBHZXQgdmFsdWVzIGZvciBmaXJzdCBwcm9wZXJ0eSBjaGFpbiBicmFuY2guXG4gKiBAcmV0dXJuIHtQcm9taXNlPEFycmF5Pn1cbiAqL1xucHJvdG8uZ2V0UHJvcGVydHlDaGFpbiA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gIGNvbnN0IHByb3BlcnR5X3VyaSA9IGFyZ3Muc2hpZnQoKTtcbiAgcmV0dXJuIHRoaXMubG9hZCgpLnRoZW4oKCkgPT4ge1xuICAgIGlmICggdGhpcy5oYXNWYWx1ZShwcm9wZXJ0eV91cmkpICkge1xuICAgICAgaWYgKCAhYXJncy5sZW5ndGggKSB7XG4gICAgICAgIHJldHVybiB0aGlzW3Byb3BlcnR5X3VyaV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQcm9wZXJ0eUNoYWluLmFwcGx5KHRoaXNbcHJvcGVydHlfdXJpXVswXSwgYXJncyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgY29uc29sZS5lcnJvcignR2V0IHByb3BlcnR5IGNoYWluIGZhaWxlZCcpO1xuICAgIHJldHVybiBbXTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIEdldCB2YWx1ZXMgZm9yIGFsbCBwcm9wZXJ0eSBjaGFpbiBicmFuY2hlcy5cbiAqIEByZXR1cm4ge1Byb21pc2U8QXJyYXk+fVxuICovXG5wcm90by5nZXRDaGFpblZhbHVlID0gZnVuY3Rpb24gKC4uLnByb3BlcnRpZXMpIHtcbiAgbGV0IGluZGl2aWR1YWxzID0gdGhpcztcbiAgaWYgKCAhQXJyYXkuaXNBcnJheShpbmRpdmlkdWFscykgKSB7XG4gICAgaW5kaXZpZHVhbHMgPSBbaW5kaXZpZHVhbHNdO1xuICB9XG4gIGNvbnN0IHByb3BlcnR5X3VyaSA9IHByb3BlcnRpZXMuc2hpZnQoKTtcbiAgY29uc3QgcHJvbWlzZXMgPSBpbmRpdmlkdWFscy5tYXAoKGluZGl2aWR1YWwpID0+IGluZGl2aWR1YWwubG9hZCgpKTtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKChsb2FkZWRJbmRpdmlkdWFscykgPT4ge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gbG9hZGVkSW5kaXZpZHVhbHMucmVkdWNlKChhY2MsIGluZGl2aWR1YWwpID0+IGFjYy5jb25jYXQoaW5kaXZpZHVhbFtwcm9wZXJ0eV91cmldKSwgW10pO1xuICAgIGlmICggIXByb3BlcnRpZXMubGVuZ3RoICkge1xuICAgICAgcmV0dXJuIGNoaWxkcmVuO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcHJvdG8uZ2V0Q2hhaW5WYWx1ZS5hcHBseShjaGlsZHJlbiwgcHJvcGVydGllcyk7XG4gICAgfVxuICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICBjb25zb2xlLmVycm9yKCdHZXQgY2hhaW4gdmFsdWUgZmFpbGVkJyk7XG4gICAgcmV0dXJuIFtdO1xuICB9KTtcbn07XG5cbi8qKlxuICogQ2hlY2sgdmFsdWUgZm9yIGFsbCBwcm9wZXJ0eSBjaGFpbiBicmFuY2hlcy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzb3VnaHRfdmFsdWVcbiAqIEBwYXJhbSB7Li4uc3RyaW5nfSAuLi5hcmdzXG4gKiBAcmV0dXJuIHtQcm9taXNlPEJvb2xlYW4+fVxuICovXG5wcm90by5oYXNDaGFpblZhbHVlID0gZnVuY3Rpb24gKHNvdWdodF92YWx1ZSwgLi4uYXJncykge1xuICByZXR1cm4gdGhpcy5nZXRDaGFpblZhbHVlKC4uLmFyZ3MpXG4gICAgLnRoZW4oKHZhbHVlcykgPT5cbiAgICAgIHZhbHVlcy5yZWR1Y2UoKHN0YXRlLCB2YWx1ZSkgPT5cbiAgICAgICAgc3RhdGUgfHwgc291Z2h0X3ZhbHVlLnZhbHVlT2YoKSA9PSB2YWx1ZS52YWx1ZU9mKCksXG4gICAgICBmYWxzZSksXG4gICAgKTtcbn07XG5cbi8qKlxuICogUHJlZmV0Y2ggbGlua2VkIG9iamVjdHMuIFVzZWZ1bCBmb3IgcHJlc2VudGluZyBvYmplY3RzIHdpdGggbWFueSBsaW5rcy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBkZXB0aCBvZiB0aGUgb2JqZWN0IHRyZWUgdG8gcHJlZmV0Y2guXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG5wcm90by5wcmVmZXRjaCA9IGZ1bmN0aW9uIChkZXB0aCwgLi4uYWxsb3dlZF9wcm9wcykge1xuICBkZXB0aCA9IGRlcHRoIHx8IDE7XG4gIHJldHVybiB0aGlzLmxvYWQoKS50aGVuKCgpID0+IHtcbiAgICByZXR1cm4gcHJlZmV0Y2goW10sIGRlcHRoLCBbdGhpcy5pZF0sIC4uLmFsbG93ZWRfcHJvcHMpO1xuICB9KTtcbn07XG5cbi8qKlxuICogUHJlZmV0Y2ggbGlua2VkIG9iamVjdHMuIFVzZWZ1bCBmb3IgcHJlc2VudGluZyBvYmplY3RzIHdpdGggbWFueSBsaW5rcy5cbiAqIEBwYXJhbSB7QXJyYXl9IHJlc3VsdFxuICogQHBhcmFtIHtudW1iZXJ9IGRlcHRoIG9mIHRoZSBvYmplY3QgdHJlZSB0byBwcmVmZXRjaFxuICogQHBhcmFtIHtBcnJheX0gdXJpc1xuICogQHJldHVybiB7UHJvbWlzZX1cbiAqIEB0aGlzIEluZGl2aWR1YWxNb2RlbFxuICovXG5mdW5jdGlvbiBwcmVmZXRjaCAocmVzdWx0LCBkZXB0aCwgdXJpcywgLi4uYWxsb3dlZF9wcm9wcykge1xuICB1cmlzID0gVXRpbC51bmlxdWUoIHVyaXMgKTtcbiAgY29uc3QgZ2V0VXJpcyA9IHVyaXMuZmlsdGVyKCh1cmkpID0+IHtcbiAgICBjb25zdCBjYWNoZWQgPSBJbmRpdmlkdWFsTW9kZWwuY2FjaGUuZ2V0KHVyaSk7XG4gICAgY29uc3QgbG9hZGVkID0gY2FjaGVkICYmIGNhY2hlZC5pc0xvYWRlZCgpO1xuICAgIGlmIChjYWNoZWQgJiYgbG9hZGVkICYmIHJlc3VsdC5pbmRleE9mKGNhY2hlZCkgPCAwKSByZXN1bHQucHVzaChjYWNoZWQpO1xuICAgIHJldHVybiAhY2FjaGVkIHx8ICFsb2FkZWQ7XG4gIH0pO1xuICByZXR1cm4gKGdldFVyaXMubGVuZ3RoID8gQmFja2VuZC5nZXRfaW5kaXZpZHVhbHModmVkYS50aWNrZXQsIGdldFVyaXMpIDogUHJvbWlzZS5yZXNvbHZlKFtdKSkudGhlbigoanNvbkxpc3QpID0+IHtcbiAgICBqc29uTGlzdC5mb3JFYWNoKChqc29uKSA9PiB7XG4gICAgICBjb25zdCBpbmRpdmlkdWFsID0gbmV3IEluZGl2aWR1YWxNb2RlbChqc29uKTtcbiAgICAgIGlmIChyZXN1bHQuaW5kZXhPZihpbmRpdmlkdWFsKSA8IDApIHJlc3VsdC5wdXNoKGluZGl2aWR1YWwpO1xuICAgIH0pO1xuICAgIGlmIChkZXB0aCAtIDEgPT09IDApIHJldHVybiByZXN1bHQ7XG4gICAgY29uc3QgbmV4dFVyaXMgPSBbXTtcbiAgICB1cmlzLmZvckVhY2goKHVyaSkgPT4ge1xuICAgICAgY29uc3QgaW5kaXZpZHVhbCA9IG5ldyBJbmRpdmlkdWFsTW9kZWwodXJpKTtcbiAgICAgIGNvbnN0IHByb3BzID0gaW5kaXZpZHVhbC5wcm9wZXJ0aWVzO1xuICAgICAgT2JqZWN0LmtleXMocHJvcHMpLmZvckVhY2goKHByb3ApID0+IHtcbiAgICAgICAgaWYgKHByb3AgPT09ICdAJyB8fCAoYWxsb3dlZF9wcm9wcy5sZW5ndGggJiYgYWxsb3dlZF9wcm9wcy5pbmRleE9mKHByb3ApIDwgMCkpIHJldHVybjtcbiAgICAgICAgcHJvcHNbcHJvcF0uZm9yRWFjaCgodmFsdWUpID0+IHZhbHVlLnR5cGUgPT09ICdVcmknICYmIG5leHRVcmlzLnB1c2godmFsdWUuZGF0YSkpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYgKCFuZXh0VXJpcy5sZW5ndGgpIHJldHVybiByZXN1bHQ7XG4gICAgcmV0dXJuIHByZWZldGNoKHJlc3VsdCwgZGVwdGgtMSwgbmV4dFVyaXMsIC4uLmFsbG93ZWRfcHJvcHMpO1xuICB9KTtcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztFQXlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0EsU0FBU0EsZUFBZUEsQ0FBRUMsR0FBRyxFQUE2QjtJQUFBLElBQTNCQyxLQUFLLEdBQUFDLFNBQUEsQ0FBQUMsTUFBQSxRQUFBRCxTQUFBLFFBQUFFLFNBQUEsR0FBQUYsU0FBQSxNQUFHLElBQUk7SUFBQSxJQUFFRyxJQUFJLEdBQUFILFNBQUEsQ0FBQUMsTUFBQSxRQUFBRCxTQUFBLFFBQUFFLFNBQUEsR0FBQUYsU0FBQSxNQUFH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