"use strict";

System.register(["../common/veda.js", "../common/individual_model.js", "../browser/backend_error.js", "../common/util.js", "../browser/util.js", "../browser/notify.js", "../browser/validate.js", "../browser/dom_helpers.js", "jquery", "../browser/controls/veda_controls.js"], function (_export, _context) {
  "use strict";

  var veda, IndividualModel, BackendError, CommonUtil, BrowserUtil, notify, validate, clear, sanitize, $;
  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }
  /**
   * Individual presenter method for IndividualModel class
   * @param {Element} container - container to render individual to
   * @param {IndividualModel|string} template - template to render individual with
   * @param {string} mode - view | edit | search
   * @param {Object} extra - extra parameters to pass ro template
   * @param {Boolean} toAppend - flag defining either to append or replace the container's content with rendered template
   * @return {Promise}
   */
  function IndividualPresenter(container, template, mode, extra, toAppend) {
    var _this = this;
    mode = mode || 'view';
    toAppend = typeof toAppend !== 'undefined' ? toAppend : true;
    if (typeof container === 'string') {
      container = document.querySelector(container);
    } else if (_instanceof(container, jQuery)) {
      container = container.get(0);
    }
    return this.load().then(function () {
      if (container.id == 'main') {
        document.title = _this.toString();
      }
      if (template) {
        return getTemplate(template);
      } else {
        var isClass = _this.hasValue('rdf:type', 'owl:Class') || _this.hasValue('rdf:type', 'rdfs:Class');
        if (_this.hasValue('v-ui:hasTemplate') && !isClass) {
          var templateIndividual = _this['v-ui:hasTemplate'][0];
          if (!_instanceof(templateIndividual, IndividualModel)) {
            throw new TypeError('Custom template must be an individual!');
          }
          return getTemplate(templateIndividual);
        } else {
          var ontology = veda.ontology;
          var templates = _this['rdf:type'].map(function (type) {
            return ontology.getClassTemplate(type.id);
          }).map(getTemplate);
          return Promise.all(templates);
        }
      }
    }).then(function (namedTemplate) {
      if (Array.isArray(namedTemplate)) {
        return Promise.all(namedTemplate.map(function (_ref) {
          var templateString = _ref.templateString,
            name = _ref.name;
          return renderTemplate(_this, container, templateString, name, mode, extra, toAppend);
        }));
      }
      return renderTemplate(_this, container, namedTemplate.templateString, namedTemplate.name, mode, extra, toAppend);
    }).catch(errorHandler).catch(function (error) {
      return errorPrinter.call(_this, error, container);
    });
  }

  /**
   * Get template string
   * @param {IndividualModel|string|HTMLElement} template
   * @return {Promise<{name, template}>}
   */
  function getTemplate(template) {
    var reg_uri = /^[a-z][a-z-0-9]*:([a-zA-Z0-9-_])*$/;
    if (_instanceof(template, IndividualModel)) {
      return template.load().then(function (templateIndividual) {
        if (!templateIndividual.hasValue('rdf:type', 'v-ui:ClassTemplate')) {
          throw new TypeError('v-ui:ClassTemplate required!');
        }
        var templateName = template.id;
        var templateString = template['v-ui:template'][0];
        return {
          name: templateName,
          templateString: templateString
        };
      });
    } else if (typeof template === 'string' && reg_uri.test(template)) {
      var templateIndividual = new IndividualModel(template);
      return getTemplate(templateIndividual);
    } else if (typeof template === 'string') {
      return {
        name: String(template.length),
        templateString: template
      };
    } else if (_instanceof(template, HTMLElement)) {
      return {
        name: String(template.length),
        templateString: template.outerHTML
      };
    }
    var generic = new IndividualModel('v-ui:generic');
    return getTemplate(generic);
  }

  /**
   * Show success message
   * @param {Promise} result
   * @return {void}
   */
  function successHandler(result) {
    var successMsg = new IndividualModel('v-s:SuccessBundle');
    successMsg.load().then(function () {
      notify('success', {
        name: successMsg.toString()
      });
    }).catch(function (error) {
      return console.error('Msg load failed');
    });
    return result;
  }

  /**
   * Show error message
   * @param {Error} error to handle
   * @throw {Error}
   */
  function errorHandler(error) {
    if (_instanceof(error, BackendError)) {
      if (error.code === 472) throw error;
      var errorIndividual = new IndividualModel("v-s:Error_".concat(error.code));
      errorIndividual.load().then(function () {
        var severity = String(errorIndividual['v-s:tag'][0]) || 'danger';
        notify(severity, {
          code: errorIndividual['v-s:errorCode'][0],
          message: errorIndividual['v-s:errorMessage'].map(CommonUtil.formatValue).join(' ')
        });
      }).catch(function () {
        notify('danger', error);
      });
    } else {
      notify('danger', {
        name: error.toString()
      });
    }
    throw error;
  }

  /**
   * Print error message in coontainer
   * @param {Error} error to print
   * @param {Object} container for error
   * @this {IndividualModel}
   * @return {HTMLElement}
   */
  function errorPrinter(error, container) {
    var _this2 = this;
    console.error("Presenter failed: ".concat(this.id));
    var errorIndividual;
    if (_instanceof(error, BackendError)) {
      errorIndividual = new IndividualModel("v-s:Error_".concat(error.code));
    } else {
      errorIndividual = new IndividualModel();
      errorIndividual['v-s:tag'] = 'danger';
      errorIndividual['v-s:errorMessage'] = error.toString();
    }
    return errorIndividual.load().then(function () {
      return "\n      <span class=\"padding-sm bg-".concat(sanitize(errorIndividual['v-s:tag'][0]), "\" title=\"").concat(sanitize(_this2.id), "\">\n        <strong>").concat(sanitize(errorIndividual['v-s:errorCode'][0].toString() || ''), "</strong> ").concat(sanitize(errorIndividual['v-s:errorMessage'].map(CommonUtil.formatValue).join(' ')), "\n      </span>");
    }).catch(function () {
      return "\n      <span class=\"padding-sm bg-danger\" title=\"".concat(sanitize(_this2.id), "\">\n        <strong>").concat(sanitize(error.code), "</strong> ").concat(sanitize(error.name), " ").concat(sanitize(error.message), ">\n      </span>");
    }).then(function (msg) {
      var wrapper;
      if (container.tagName === 'TBODY' || container.tagName === 'TABLE') {
        var tr = document.createElement('tr');
        var td = tr.appendChild(document.createElement('td'));
        td.colSpan = 999;
        td.innerHTML = msg;
        wrapper = tr;
      } else {
        var div = document.createElement('div');
        div.innerHTML = msg;
        wrapper = div;
      }
      wrapper.setAttribute('resource', sanitize(_this2.id));
      return container.appendChild(wrapper);
    });
  }

  /**
   * Wrap template
   * @param {String} html
   * @return {HTMLElement}
   */
  function wrap(html) {
    html = html.trim();
    if (html.startsWith('<script') || html.endsWith('script>')) {
      console.error('Scripts for inline templates are not supported');
      throw new SyntaxError('Scripts for inline templates are not supported');
    }
    var tagName;
    if (html.startsWith('<tr')) {
      tagName = 'tbody';
    } else if (html.startsWith('<td')) {
      tagName = 'tr';
    } else {
      tagName = 'div';
    }
    var wrapper = document.createElement(tagName);
    wrapper.innerHTML = html;
    var template = wrapper.firstElementChild;
    var last = wrapper.lastElementChild;
    if (last !== template) {
      console.error('Unwrapped templates are not supported');
      throw new SyntaxError('Unwrapped templates are not supported');
    }
    return wrapper;
  }

  /**
   * Render template
   * @param {IndividualModel} individual - individual to render
   * @param {Element} container - container to render individual to
   * @param {IndividualModel|string} templateString - template string to render individual with
   * @param {string} name - name of template for sourceURL
   * @param {string} mode - view | edit | search
   * @param {Object} extra - extra parameters to pass ro template
   * @param {Boolean} toAppend - flag defining either to append or replace the container's content with rendered template
   * @return {Promise}
   */
  function renderTemplate(individual, container, templateString, name, mode, extra, toAppend) {
    var reg_file = /\.js$/;
    if (reg_file.test(templateString)) {
      return function (specifier) {
        return new Promise(function (r) {
          return r(_context.import(specifier));
        });
      }("/templates/".concat(templateString)).then(function (templateModule) {
        var pre = templateModule.pre;
        var post = templateModule.post;
        var html = templateModule.html;
        if (!html) {
          var pre_result = pre ? pre.call(individual, individual, undefined, container, mode, extra) : undefined;
          return Promise.resolve(pre_result).then(function () {
            var post_result = post ? post.call(individual, individual, undefined, container, mode, extra) : undefined;
            return Promise.resolve(post_result).then(function () {
              return undefined;
            });
          });
        } else {
          var wrapper = wrap(templateModule.html);
          var template = wrapper.firstElementChild;
          template.setAttribute('data-mode', mode);
          var _pre_result = pre ? pre.call(individual, individual, template, container, mode, extra) : undefined;
          return Promise.resolve(_pre_result).then(function () {
            return processTemplate(individual, container, wrapper, mode);
          }).then(function (processed) {
            if (toAppend) {
              container.appendChild(processed);
            }
            processed.dispatchEvent(new Event(mode));
            var post_result = post ? post.call(individual, individual, processed, container, mode, extra) : undefined;
            return Promise.resolve(post_result).then(function () {
              return processed;
            });
          });
        }
      });
    } else {
      var wrapper = wrap(templateString);
      return processTemplate(individual, container, wrapper, mode).then(function (template) {
        if (toAppend) {
          container.appendChild(template);
        }
        template.dispatchEvent(new Event(mode));
        return template;
      });
    }
  }

  /**
   * Process template
   * @param {IndividualModel} individual - individual to render
   * @param {Element} container - container to render individual to
   * @param {Element} wrapper - template wrapper
   * @param {string} templateMode - view | edit | search
   * @this Individual
   * @return {Promise}
   */
  function processTemplate(individual, container, wrapper, templateMode) {
    var mode = templateMode;
    var template = wrapper.firstElementChild;

    // Get properties specifications
    var specs = individual['rdf:type'].reduce(function (acc, type) {
      return _objectSpread(_objectSpread({}, acc), veda.ontology.getClassSpecifications(type.id));
    }, {});
    template.setAttribute('resource', individual.id);
    template.setAttribute('typeof', individual['rdf:type'].map(function (item) {
      return item.id;
    }).join(' '));
    template.classList.add('template');
    var view = wrapper.querySelectorAll('.view');
    var edit = wrapper.querySelectorAll('.edit');
    var search = wrapper.querySelectorAll('.search');
    var _view = wrapper.querySelectorAll('.-view');
    var _edit = wrapper.querySelectorAll('.-edit');
    var _search = wrapper.querySelectorAll('.-search');

    // Embedded templates list
    var embedded = [];

    /**
     * Template mode handler. Applies mode to template to show/hide elements in different modes
     * @param {Event} event
     * @return {void}
     */
    var modeHandler = function modeHandler(event) {
      mode = event.type;
      event.stopPropagation();
      template.setAttribute('data-mode', mode);
      switch (mode) {
        case 'view':
          individual.watch();
          view.forEach(function (node) {
            return node.style.display = '';
          });
          _view.forEach(function (node) {
            return node.style.display = 'none';
          });
          break;
        case 'edit':
          individual.unwatch();
          edit.forEach(function (node) {
            return node.style.display = '';
          });
          _edit.forEach(function (node) {
            return node.style.display = 'none';
          });
          break;
        case 'search':
          search.forEach(function (node) {
            return node.style.display = '';
          });
          _search.forEach(function (node) {
            return node.style.display = 'none';
          });
          break;
      }
      // sync mode for embedded templates
      embedded.forEach(function (item) {
        item.dispatchEvent(new Event(mode));
      });
    };
    template.addEventListener('view', modeHandler);
    template.addEventListener('edit', modeHandler);
    template.addEventListener('search', modeHandler);

    // Define handlers
    template.veda = {
      'reset': resetHandler,
      'save': saveHandler,
      'delete': deleteHandler,
      'recover': recoverHandler,
      'remove': removeHandler
    };

    /**
     * Call method
     * @param {Event} event
     */
    function callMethod(event) {
      event.stopPropagation();
      var type = event.type;
      if (type === 'kancel') {
        // To distinguish from standard event
        resetHandler();
      } else if (type === 'save') {
        saveHandler();
      } else if (type === 'delete') {
        deleteHandler();
      } else if (type === 'recover') {
        recoverHandler();
      } else if (type === 'destroy') {
        removeHandler();
      }
    }

    /**
     * Remove veda methods from node
     * @param {Event} event
     */
    function removeMethods(event) {
      delete event.target.veda;
    }
    template.addEventListener('kancel', callMethod);
    template.addEventListener('save', callMethod);
    template.addEventListener('delete', callMethod);
    template.addEventListener('recover', callMethod);
    template.addEventListener('destroy', callMethod);
    template.addEventListener('remove', removeMethods);
    var switchToView = function switchToView() {
      return template.dispatchEvent(new Event('view'));
    };

    /**
     * Reset individual and embedded individuals
     * @param {string} parent id
     * @param {Array} acc for individuals uris
     * @return {Promise<void>}
     */
    function resetHandler(parent, acc) {
      return individual.resetAll().then(switchToView).catch(errorHandler);
    }

    /**
     * Save individual and embedded children individuals
     * @param {string} parent id
     * @param {Array} acc for individuals uris
     * @return {Promise<void>}
     */
    function saveHandler() {
      return individual.saveAll().then(switchToView).then(successHandler).catch(errorHandler);
    }

    /**
     * Delete individual and embedded children individuals
     * @param {string} parent id
     * @return {Promise<void>}
     */
    function deleteHandler() {
      return individual.delete().then(switchToView).then(successHandler).catch(errorHandler);
    }

    /**
     * Recover individual and embedded children individuals
     * @param {string} parent id
     * @return {Promise<void>}
     */
    function recoverHandler() {
      return individual.recover().then(switchToView).then(successHandler).catch(errorHandler);
    }

    /**
     * Remove individual and embedded children individuals
     * @param {string} parent id
     * @param {Array} acc for individuals uris
     * @return {Promise<void>}
     */
    function removeHandler(parent, acc) {
      acc = acc || [];
      acc = embedded.reduce(function (acc1, item) {
        return typeof item.veda.remove === 'function' ? item.veda.remove(individual.id, acc1) : acc1;
      }, acc);
      acc.push(individual.id);
      if (parent) {
        return acc;
      }
      var uris = CommonUtil.unique(acc);
      return uris.reduce(function (p, item) {
        return p.then(function () {
          return new IndividualModel(item).remove();
        });
      }, Promise.resolve()).then(function () {
        var removedAlert = new IndividualModel('v-s:RemovedAlert');
        removedAlert.load().then(function () {
          clear(template);
          template.innerHTML = "<code>".concat(sanitize(removedAlert.toString()), "</code>");
        }).catch(function (error) {
          return console.error('Alert load failed');
        });
      }).then(successHandler).catch(errorHandler);
    }

    /**
     * Individual v-s:deleted handler. Shows deleted alert.
     * @this Individual
     * @return {void}
     */
    var deletedHandler = function deletedHandler() {
      if (this.hasValue('v-s:deleted', true)) {
        if (mode === 'view' && container && container.id !== 'main' && !container.classList.contains('modal-body')) {
          template.classList.add('deleted');
        }
        if (container && (container.id === 'main' || container.classList.contains('modal-body'))) {
          var msg = new IndividualModel('v-s:DeletedAlert');
          msg.load().then(function () {
            var msgStr = msg['rdfs:label'].map(CommonUtil.formatValue).join(' ');
            notify('warning', {
              name: msgStr
            });
            var deletedHeader = document.createElement('h4');
            deletedHeader.classList.add('deleted-header');
            deletedHeader.textContent = msgStr;
            deletedHeader.style.textAlign = 'center';
            template.prepend(deletedHeader);
          }).catch(function (error) {
            return console.error('Msg load failed');
          });
        }
      } else {
        if (container && container.id === 'main') {
          var header = template.querySelector('.deleted-header');
          if (header) header.remove();
        }
        template.classList.remove('deleted');
      }
    };
    individual.on('v-s:deleted', deletedHandler);
    template.addEventListener('remove', function () {
      return individual.off('v-s:deleted', deletedHandler);
    });
    deletedHandler.call(individual);

    /**
     * Individual v-s:valid handler. Shows alert when individual is invalid .
     * @this Individual
     * @return {void}
     */
    var validHandler = function validHandler() {
      if (this.hasValue('v-s:valid', false)) {
        var isAlertVisible = container && container.id === 'main' || container.classList.contains('modal-body') || template.classList.contains('container') || template.children.length && template.children[0].classList.contains('container');
        if (mode === 'view' && !isAlertVisible) {
          template.classList.add('invalid');
          var msg = new IndividualModel('v-s:InvalidAlert');
          msg.load().then(function () {
            template.title = msg['rdfs:label'].map(CommonUtil.formatValue).join(' ');
          });
        }
        if (isAlertVisible) {
          var _msg = new IndividualModel('v-s:InvalidAlert');
          _msg.load().then(function () {
            var msgStr = _msg['rdfs:label'].map(CommonUtil.formatValue).join(' ');
            notify('warning', {
              name: msgStr
            });
            var invalidHeader = document.createElement('h4');
            invalidHeader.classList.add('invalid-header');
            invalidHeader.textContent = msgStr;
            invalidHeader.style.textAlign = 'center';
            template.prepend(invalidHeader);
          }).catch(function (error) {
            return console.error('Msg load failed');
          });
        }
      } else {
        if (container && container.id === 'main') {
          var header = template.querySelector('.invalid-header');
          if (header) header.remove();
        }
        template.classList.remove('invalid');
      }
    };
    individual.on('v-s:valid', validHandler);
    template.addEventListener('remove', function () {
      return individual.off('v-s:valid', validHandler);
    });
    validHandler.call(individual);

    // Process RDFa compliant template

    // Special (not RDFa)
    wrapper.querySelectorAll('[href*=\'@\']:not([rel] *):not([about] *)').forEach(function (node) {
      var href = node.getAttribute('href');
      node.setAttribute('href', href.replace('@', individual.id));
    });
    wrapper.querySelectorAll('[src*=\'@\']:not([rel] *):not([about] *)').forEach(function (node) {
      var src = node.getAttribute('src');
      node.setAttribute('src', src.replace('@', individual.id));
    });
    wrapper.querySelectorAll('[style*=\'@\']:not([rel] *):not([about] *)').forEach(function (node) {
      var style = node.getAttribute('style');
      node.setAttribute('style', style.replace('@', individual.id));
    });
    wrapper.querySelectorAll('[value*=\'@\']:not([rel] *):not([about] *)').forEach(function (node) {
      var value = node.getAttribute('value');
      node.setAttribute('value', value.replace('@', individual.id));
    });
    wrapper.querySelectorAll('[id*=\'@\']:not([rel] *):not([about] *)').forEach(function (node) {
      var id = node.getAttribute('id');
      node.setAttribute('id', style.replace('@', individual.id));
    });
    wrapper.querySelectorAll('[title]:not([rel] *):not([about] *)').forEach(function (node) {
      var title = node.getAttribute('title');
      if (/^[a-z][a-z-0-9]*:([a-zA-Z0-9-_])*$/.test(title)) {
        var titleIndividual = new IndividualModel(title);
        titleIndividual.load().then(function () {
          node.setAttribute('title', titleIndividual.toString());
        });
      }
    });

    // Property values
    var props = Array.from(wrapper.querySelectorAll('[property]:not(veda-control):not([rel] *):not([about] *)')).map(function (propertyContainer) {
      var property_uri = propertyContainer.getAttribute('property');
      var about_uri = propertyContainer.getAttribute('about');
      var about;
      var isAbout;
      if (about_uri === '@') {
        about = individual;
        isAbout = true;
        propertyContainer.setAttribute('about', about.id);
      } else if (!about_uri) {
        about = individual;
        isAbout = false;
      } else {
        about = new IndividualModel(about_uri);
        isAbout = true;
      }
      return about.load().then(function () {
        var idModifiedHandler = function idModifiedHandler() {
          propertyContainer.textContent = about.id;
        };
        if (property_uri === '@') {
          propertyContainer.textContent = about.id;
          about.on('idChanged', idModifiedHandler);
          template.addEventListener('remove', function () {
            return about.off('idChanged', idModifiedHandler);
          });
          return;
        }

        // Re-render all property values if model's property was changed
        var propertyModifiedHandler = function propertyModifiedHandler() {
          renderPropertyValues(about, isAbout, property_uri, propertyContainer, template, mode);
        };
        about.on(property_uri, propertyModifiedHandler);
        template.addEventListener('remove', function () {
          return about.off(property_uri, propertyModifiedHandler);
        });
        renderPropertyValues(about, isAbout, property_uri, propertyContainer, template, mode);
      }).catch(function (error) {
        return errorPrinter.call(about, error, propertyContainer);
      });
    });

    // Related resources & about resources
    var rels = Array.from(wrapper.querySelectorAll('[rel]:not(veda-control):not([rel] *):not([about] *)')).map(function (relContainer) {
      var about = relContainer.getAttribute('about');
      var rel_uri = relContainer.getAttribute('rel');
      var isEmbedded = relContainer.getAttribute('data-embedded') === 'true';
      var spec = specs[rel_uri] ? new IndividualModel(specs[rel_uri]) : undefined;
      var rel_inline_template = relContainer.innerHTML.trim();
      var rel_template_uri = relContainer.getAttribute('data-template');
      var limit = relContainer.getAttribute('data-limit') == null ? Infinity : parseInt(relContainer.getAttribute('data-limit'));
      var more = relContainer.getAttribute('data-more') || false;
      var relTemplate;
      var isAbout;
      if (about) {
        isAbout = true;
        about = about === '@' ? individual : new IndividualModel(about);
        relContainer.setAttribute('about', about.id);
      } else {
        isAbout = false;
        about = individual;
      }
      if (rel_template_uri) {
        relTemplate = rel_template_uri;
      } else if (rel_inline_template.length) {
        relTemplate = rel_inline_template;
      }
      relContainer.innerHTML = '';
      template.addEventListener('edit', function (e) {
        var property = new IndividualModel(rel_uri);
        if (isEmbedded && spec && spec['v-ui:minCardinality'][0] >= 1 && !individual.hasValue(rel_uri) && !(property.hasValue('rdfs:range') && property['rdfs:range'][0].id === 'v-s:File')) {
          var valueType = spec && spec.hasValue('v-ui:rangeRestriction') && spec['v-ui:rangeRestriction'] || property.hasValue('rdfs:range') && property['rdfs:range'] || [];
          var emptyValue = new IndividualModel();
          if (valueType.length) {
            emptyValue['rdf:type'] = valueType;
          }
          individual.set(rel_uri, [emptyValue]);
        }
        e.stopPropagation();
      });
      return about.load().then(function () {
        var prev_rendered = {};
        var curr_rendered = {};
        var sort_required = false;
        var reverseSort = false;
        var propertyModifiedHandler = function propertyModifiedHandler(propertyValues, limit_param) {
          curr_rendered = {};
          limit = limit_param || limit;
          if (reverseSort) propertyValues.reverse();
          return Promise.all(propertyValues.map(function (value, i) {
            if (i >= limit) {
              return;
            }
            if (value.id in prev_rendered) {
              curr_rendered[value.id] = prev_rendered[value.id];
              if (curr_rendered[value.id] !== i) {
                curr_rendered[value.id] = i;
                sort_required = true;
              }
              delete prev_rendered[value.id];
              return;
            }
            return renderRelationValue({
              about: about,
              isAbout: isAbout,
              rel_uri: rel_uri,
              value: value,
              relContainer: relContainer,
              relTemplate: relTemplate,
              template: template,
              mode: mode,
              embedded: embedded,
              isEmbedded: isEmbedded,
              toAppend: false
            }).then(function (renderedTemplate) {
              curr_rendered[value.id] = i;
              return renderedTemplate;
            });
          }).filter(Boolean)).then(function (nodes) {
            relContainer.append.apply(relContainer, _toConsumableArray(nodes.flat()));
            var prev_uris = Object.keys(prev_rendered);
            if (prev_uris.length) {
              var selector = prev_uris.map(function (uri) {
                return "[resource=\"".concat(BrowserUtil.escape4$(uri), "\"]");
              }).join(',');
              relContainer.querySelectorAll(selector).forEach(function (node) {
                var index = embedded.indexOf(node);
                if (index >= 0) embedded.splice(index, 1);
                node.remove();
              });
            }
            if (sort_required) {
              var list = Array.from(relContainer.children).map(function (node) {
                return relContainer.removeChild(node);
              });
              list.sort(function (a, b) {
                return curr_rendered[a.getAttribute('resource')] - curr_rendered[b.getAttribute('resource')];
              });
              relContainer.append.apply(relContainer, _toConsumableArray(list));
            }
            if (limit < propertyValues.length && more) {
              var badgeContainer = document.createElement('div');
              badgeContainer.style.display = 'flex';
              var moreButton = relContainer.querySelector('a.more');
              if (!moreButton) {
                moreButton = document.createElement('a');
                moreButton.classList.add('more', 'badge');
              }
              moreButton.textContent = "\u2193 ".concat(propertyValues.length - limit);
              moreButton.addEventListener('click', function (e) {
                e.stopPropagation();
                var countDisplayed = relContainer.children.length - 1; // 1 last children is .badge container
                about.trigger(rel_uri, about.get(rel_uri), countDisplayed + 10);
                e.target.remove();
              });
              badgeContainer.append(moreButton);
              var reverseButton = relContainer.querySelector('a.reverse');
              if (!reverseButton) {
                reverseButton = document.createElement('a');
                reverseButton.classList.add('reverse', 'badge', 'margin-sm-h');
              }
              reverseButton.textContent = '↓ ↑';
              reverseButton.addEventListener('click', function (e) {
                e.stopPropagation();
                prev_rendered = {};
                reverseSort = !reverseSort;
                var countDisplayed = relContainer.children.length - 1; // 1 last children is .badge container
                Array.from(relContainer.children).map(function (node) {
                  return relContainer.removeChild(node);
                });
                about.trigger(rel_uri, about.get(rel_uri), countDisplayed);
                e.target.remove();
              });
              badgeContainer.append(reverseButton);
              relContainer.append(badgeContainer);
            }
            prev_rendered = _objectSpread({}, curr_rendered);
            template.dispatchEvent(new Event('internal-validate'), {
              bubbles: true
            });
          });
        };
        var embeddedHandler = function embeddedHandler(propertyValues) {
          if (mode === 'edit') {
            propertyValues.map(function (value) {
              if (value.id !== about.id &&
              // prevent self parent
              rel_uri !== 'v-s:parent' &&
              // prevent circular parent
              !value.hasValue('v-s:parent') // do not change parent
              ) {
                value['v-s:parent'] = [about];
                value['v-s:backwardTarget'] = [about];
                value['v-s:backwardProperty'] = [rel_uri];
                value['v-s:canRead'] = [true];
                value['v-s:canUpdate'] = [true];
                value['v-s:canDelete'] = [true];
              }
            });
          }
        };
        var values = about.get(rel_uri);
        if (isEmbedded) {
          embeddedHandler(values);
          about.on(rel_uri, embeddedHandler);
          template.addEventListener('remove', function () {
            return about.off(rel_uri, embeddedHandler);
          });
        }
        about.on(rel_uri, propertyModifiedHandler);
        template.addEventListener('remove', function () {
          return about.off(rel_uri, propertyModifiedHandler);
        });
        return propertyModifiedHandler(values, limit);
      });
    });

    // About resource
    var abouts = Array.from(wrapper.querySelectorAll('[about]:not([rel] *):not([about] *):not([rel]):not([property])')).map(function (aboutContainer) {
      var about_template_uri = aboutContainer.getAttribute('data-template');
      var about_inline_template = aboutContainer.innerHTML.trim();
      var isEmbedded = aboutContainer.getAttribute('data-embedded') === 'true';
      var about;
      var aboutTemplate;
      if (about_template_uri) {
        aboutTemplate = about_template_uri;
      } else if (about_inline_template.length) {
        aboutTemplate = about_inline_template;
      }
      aboutContainer.innerHTML = '';
      if (aboutContainer.getAttribute('about') === '@') {
        about = individual;
        aboutContainer.setAttribute('about', about.id);
      } else {
        about = new IndividualModel(aboutContainer.getAttribute('about'));
      }
      return about.present(aboutContainer, aboutTemplate, isEmbedded ? mode : undefined).then(function (rendered) {
        if (!Array.isArray(rendered)) {
          rendered = [rendered];
        }
        if (isEmbedded) {
          embedded.push.apply(embedded, _toConsumableArray(rendered));
          rendered.forEach(function (node) {
            node.setAttribute('data-embedded', 'true');
            if (mode === 'edit') {
              node.dispatchEvent(new Event('internal-validate'));
            }
          });
        }
      });
    });

    // Validation with support of embedded templates (arbitrary depth)

    // Initial validation state
    var validation = {
      state: true
    };
    template.setAttribute('data-valid', validation.state);

    /**
    * Validate template handler
    * @param {Event} event - custom 'internal-validate' event
    * @return {void}
    */
    var validateTemplate = function validateTemplate(event) {
      if (_instanceof(event, Event)) {
        event.stopPropagation();
      }
      if (mode !== 'edit') return;
      Object.keys(validation).forEach(function (property_uri) {
        if (property_uri === 'state') {
          return;
        }
        var spec = specs[property_uri] ? new IndividualModel(specs[property_uri]) : undefined;
        validation[property_uri] = validate(individual, property_uri, spec);
      });
      template.dispatchEvent(new Event('validate'));
      validation.state = Object.keys(validation).reduce(function (acc, property_uri) {
        if (property_uri === 'state') {
          return acc;
        }
        return acc && validation[property_uri].state;
      }, true);
      validation.embeddedState = embedded.reduce(function (acc, embeddedTemplate) {
        var embeddedValidation = embeddedTemplate.getAttribute('data-valid') === 'true';
        return acc && embeddedValidation;
      }, true);
      validation.state = validation.state && validation.embeddedState;
      template.setAttribute('data-valid', validation.state);
      template.dispatchEvent(new CustomEvent('internal-validated', {
        detail: validation
      }));

      // 'internal-validate' event should bubble and trigger parent template validation if current template is embedded
      if (container.getAttribute('data-embedded') === 'true') {
        container.dispatchEvent(new Event('internal-validate', {
          bubbles: true
        }));
      }
    };
    individual.on('propertyModified', validateTemplate);
    template.addEventListener('remove', function () {
      return individual.off('propertyModified', validateTemplate);
    });
    template.addEventListener('internal-validate', validateTemplate);
    template.addEventListener('edit', validateTemplate);

    /**
    * Merge validation result from custom template validation
    * @param {Event} event - custom 'validated' event
    * @param {Object} validationResult - validation result object
    * @return {void}
    */
    var mergeValidationResult = function mergeValidationResult(event) {
      var validationResult = event.detail;
      event.stopPropagation();
      if (mode === 'edit') {
        Object.keys(validationResult).forEach(function (property_uri) {
          if (property_uri === 'state') {
            return;
          }
          validation[property_uri] = validationResult[property_uri];
        });
        var mergedState = Object.keys(validation).reduce(function (acc, property_uri) {
          if (property_uri === 'state') {
            return acc;
          }
          if (property_uri === 'embeddedState') {
            return acc && validation[property_uri];
          }
          return acc && validation[property_uri].state;
        }, true);
        validation.state = mergedState && validation.embeddedState;
        template.setAttribute('data-valid', validation.state);
        template.dispatchEvent(new CustomEvent('internal-validated', {
          detail: validation
        }));

        // 'internal-validate' event should bubble and trigger parent template validation if current template is embedded
        if (container.getAttribute('data-embedded') === 'true') {
          container.dispatchEvent(new Event('internal-validate', {
            bubbles: true
          }));
        }
      }
      // вроде как больше не нужно
      // // "validate" event should bubble up to be handled by parent template only if current template is embedded
      // if ( template.data('isEmbedded') ) {
      //   container.trigger('validated', {});
      // }
    };

    // Handle validation events from template
    template.addEventListener('validate', function (e) {
      return e.stopPropagation();
    });
    template.addEventListener('validated', mergeValidationResult);

    // Controls
    Array.from(wrapper.querySelectorAll('veda-control:not([rel] *):not([about] *)')).forEach(function (el) {
      var control = $(el);
      var property_uri = control.attr('property') || control.attr('rel');
      var type = control.attr('data-type') || 'generic';
      var spec = specs[property_uri] ? new IndividualModel(specs[property_uri]) : undefined;
      var controlType = $.fn['veda_' + type];

      // Initial validation state
      validation[property_uri] = {
        state: true,
        cause: []
      };
      var validatedHandler = function validatedHandler(e) {
        var validationResult = e.detail;
        if (validationResult.state || !validationResult[property_uri] || validationResult[property_uri].state === true) {
          control.removeClass('has-error');
          control.popover('destroy');
        } else {
          control.addClass('has-error');
          var explanation;
          if (validationResult[property_uri].message) {
            explanation = validationResult[property_uri].message;
          } else {
            var causesPromises = validationResult[property_uri].cause.map(function (cause_uri) {
              return new IndividualModel(cause_uri).load();
            });
            Promise.all(causesPromises).then(function (causes) {
              explanation = causes.map(function (cause) {
                return cause['rdfs:comment'].map(CommonUtil.formatValue).filter(Boolean).join(', ');
              }).join('\n');
            });
          }
          control.popover({
            content: function content() {
              return explanation;
            },
            container: control,
            trigger: 'hover focus',
            placement: 'top',
            animation: false
          });
          if ($('input', control).is(':focus')) {
            control.popover('show');
          }
        }
        e.stopPropagation();
      };
      template.addEventListener('internal-validated', validatedHandler);
      var syncControl = function syncControl(e) {
        e.stopPropagation();
        control.triggerHandler(e.type);
      };
      template.addEventListener('view', syncControl);
      template.addEventListener('edit', syncControl);
      template.addEventListener('search', syncControl);
      var assignDefaultValue = function assignDefaultValue(e) {
        if (spec && spec.hasValue('v-ui:defaultValue') && !individual.hasValue(property_uri)) {
          individual.set(property_uri, spec['v-ui:defaultValue']);
        }
        e.stopPropagation();
      };
      template.addEventListener('edit', assignDefaultValue);
      var opts = {
        individual: individual,
        property_uri: property_uri,
        spec: spec,
        mode: mode
      };
      controlType.call(control, opts);
    });
    var promises = rels.concat(abouts, props);
    return Promise.all(promises).then(function () {
      wrapper = null;
      return template;
    });
  }

  /**
   * Render literal values of individual
   * @param {IndividualModel} about - individual
   * @param {Boolean} isAbout - is about flag
   * @param {string} property_uri - which property values to render
   * @param {Element} propertyContainer - where to render values
   * @param {Element} template - template reference
   * @param {string} mode - template mode
   * @return {void}
   */
  function renderPropertyValues(about, isAbout, property_uri, propertyContainer, template, mode) {
    propertyContainer.innerHTML = '';
    about.get(property_uri).map(function (value) {
      var formattedValue = CommonUtil.formatValue(value);
      if (isAbout) {
        var prevValue = propertyContainer.textContent;
        if (prevValue) {
          propertyContainer.textContent += formattedValue ? ' ' + formattedValue : '';
        } else {
          propertyContainer.textContent = formattedValue;
        }
      } else {
        var valueHolder = document.createElement('span');
        valueHolder.classList.add('value-holder');
        valueHolder.textContent = CommonUtil.formatValue(value);
        propertyContainer.append(valueHolder);
        var btnGroup = document.createElement('div');
        btnGroup.classList.add('prop-actions', 'btn-group', 'btn-group-xs');
        var btnRemove = document.createElement('button');
        btnRemove.classList.add('btn', 'btn-default', 'glyphicon', 'glyphicon-remove');
        btnRemove.setAttribute('tabindex', '-1');
        btnGroup.appendChild(btnRemove);
        if (mode === 'view') {
          btnGroup.style.display = 'none';
        }
        var show = function show(e) {
          e.stopPropagation();
          btnGroup.style.display = '';
        };
        var hide = function hide(e) {
          e.stopPropagation();
          btnGroup.style.display = 'none';
        };
        template.addEventListener('view', hide);
        template.addEventListener('edit', show);
        template.addEventListener('search', show);
        btnRemove.addEventListener('click', function () {
          return about.removeValue(property_uri, value);
        });
        btnRemove.addEventListener('mouseenter', function () {
          return valueHolder.classList.add('red-outline');
        });
        btnRemove.addEventListener('mouseleave', function () {
          return valueHolder.classList.remove('red-outline');
        });
        valueHolder.appendChild(btnGroup);
      }
    });
  }

  /**
   * Render related objects of individual
   * @param {IndividualModel} about - individual
   * @param {Boolean} isAbout - is about flag
   * @param {string} rel_uri - which relation values to render
   * @param {IndividualModel} value - value to render
   * @param {Element} relContainer - where to render the value
   * @param {Element} relTemplate - which template to user to render the value
   * @param {Element} template - template reference
   * @param {string} mode - template mode
   * @param {Array} embedded - embedded templates list
   * @param {Boolean} isEmbedded - flag to include rendered value to embedded list
   * @param {Boolean} toAppend - flag defining either to append or replace the relContainer's content with rendered value template
   * @return {void}
   */
  function renderRelationValue(_ref2) {
    var about = _ref2.about,
      isAbout = _ref2.isAbout,
      rel_uri = _ref2.rel_uri,
      value = _ref2.value,
      relContainer = _ref2.relContainer,
      relTemplate = _ref2.relTemplate,
      template = _ref2.template,
      mode = _ref2.mode,
      embedded = _ref2.embedded,
      isEmbedded = _ref2.isEmbedded,
      toAppend = _ref2.toAppend;
    return value.present(relContainer, relTemplate, isEmbedded ? mode : undefined, undefined, toAppend).then(function (rendered) {
      if (!Array.isArray(rendered)) {
        rendered = [rendered];
      }
      if (isEmbedded) {
        embedded.push.apply(embedded, _toConsumableArray(rendered));
        rendered.forEach(function (node) {
          node.setAttribute('data-embedded', 'true');
          if (mode === 'edit') {
            node.dispatchEvent(new Event('internal-validate'));
          }
        });
      }
      if (!isAbout) {
        var btnGroup = document.createElement('div');
        btnGroup.classList.add('rel-actions', 'btn-group', 'btn-group-xs');
        var btnRemove = document.createElement('button');
        btnRemove.classList.add('btn', 'btn-default', 'glyphicon', 'glyphicon-remove');
        btnRemove.setAttribute('tabindex', '-1');
        btnGroup.appendChild(btnRemove);
        if (mode === 'view') {
          btnGroup.style.display = 'none';
        }
        var show = function show(e) {
          e.stopPropagation();
          btnGroup.style.display = '';
        };
        var hide = function hide(e) {
          e.stopPropagation();
          btnGroup.style.display = 'none';
        };
        template.addEventListener('view', hide);
        template.addEventListener('edit', show);
        template.addEventListener('search', show);
        btnRemove.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          about.removeValue(rel_uri, value);
          if (value.is('v-s:Embedded') && value.hasValue('v-s:parent', about) && !value.isNew()) {
            value.set('v-s:deleted', true);
            about.removedObjs.push(value);
          }
        });
        btnRemove.addEventListener('mouseenter', function () {
          return rendered.forEach(function (item) {
            return item.classList.add('red-outline');
          });
        });
        btnRemove.addEventListener('mouseleave', function () {
          return rendered.forEach(function (item) {
            return item.classList.remove('red-outline');
          });
        });
        rendered.forEach(function (item) {
          if (item.style.display !== 'inline') {
            btnGroup.classList.add('block');
          }
          if (item.style.display === 'table-row' || item.tagName === 'TR') {
            var cell = item.lastElementChild;
            cell.style.position = 'relative';
            cell.appendChild(btnGroup);
          } else {
            item.style.position = 'relative';
            item.appendChild(btnGroup);
          }
        });
      }
      return rendered;
    });
  }
  return {
    setters: [function (_commonVedaJs) {
      veda = _commonVedaJs.default;
    }, function (_commonIndividual_modelJs) {
      IndividualModel = _commonIndividual_modelJs.default;
    }, function (_browserBackend_errorJs) {
      BackendError = _browserBackend_errorJs.default;
    }, function (_commonUtilJs) {
      CommonUtil = _commonUtilJs.default;
    }, function (_browserUtilJs) {
      BrowserUtil = _browserUtilJs.default;
    }, function (_browserNotifyJs) {
      notify = _browserNotifyJs.default;
    }, function (_browserValidateJs) {
      validate = _browserValidateJs.default;
    }, function (_browserDom_helpersJs) {
      clear = _browserDom_helpersJs.clear;
      sanitize = _browserDom_helpersJs.sanitize;
    }, function (_jquery) {
      $ = _jquery.default;
    }, function (_browserControlsVeda_controlsJs) {}],
    execute: function () {
      IndividualModel.prototype.present = IndividualPresenter;
      _export("default", IndividualPresenter);
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJJbmRpdmlkdWFsUHJlc2VudGVyIiwiY29udGFpbmVyIiwidGVtcGxhdGUiLCJtb2RlIiwiZXh0cmEiLCJ0b0FwcGVuZCIsIl90aGlzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiX2luc3RhbmNlb2YiLCJqUXVlcnkiLCJnZXQiLCJsb2FkIiwidGhlbiIsImlkIiwidGl0bGUiLCJ0b1N0cmluZyIsImdldFRlbXBsYXRlIiwiaXNDbGFzcyIsImhhc1ZhbHVlIiwidGVtcGxhdGVJbmRpdmlkdWFsIiwiSW5kaXZpZHVhbE1vZGVsIiwiVHlwZUVycm9yIiwib250b2xvZ3kiLCJ2ZWRhIiwidGVtcGxhdGVzIiwibWFwIiwidHlwZSIsImdldENsYXNzVGVtcGxhdGUiLCJQcm9taXNlIiwiYWxsIiwibmFtZWRUZW1wbGF0ZSIsIkFycmF5IiwiaXNBcnJheSIsIl9yZWYiLCJ0ZW1wbGF0ZVN0cmluZyIsIm5hbWUiLCJyZW5kZXJUZW1wbGF0ZSIsImNhdGNoIiwiZXJyb3JIYW5kbGVyIiwiZXJyb3IiLCJlcnJvclByaW50ZXIiLCJjYWxsIiwicmVnX3VyaSIsInRlbXBsYXRlTmFtZSIsInRlc3QiLCJTdHJpbmciLCJsZW5ndGgiLCJIVE1MRWxlbWVudCIsIm91dGVySFRNTCIsImdlbmVyaWMiLCJzdWNjZXNzSGFuZGxlciIsInJlc3VsdCIsInN1Y2Nlc3NNc2ciLCJub3RpZnkiLCJjb25zb2xlIiwiQmFja2VuZEVycm9yIiwiY29kZSIsImVycm9ySW5kaXZpZHVhbCIsImNvbmNhdCIsInNldmVyaXR5IiwibWVzc2FnZSIsIkNvbW1vblV0aWwiLCJmb3JtYXRWYWx1ZSIsImpvaW4iLCJfdGhpczIiLCJzYW5pdGl6ZSIsIm1zZyIsIndyYXBwZXIiLCJ0YWdOYW1lIiwidHIiLCJjcmVhdGVFbGVtZW50IiwidGQiLCJhcHBlbmRDaGlsZCIsImNvbFNwYW4iLCJpbm5lckhUTUwiLCJkaXYiLCJzZXRBdHRyaWJ1dGUiLCJ3cmFwIiwiaHRtbCIsInRyaW0iLCJzdGFydHNXaXRoIiwiZW5kc1dpdGgiLCJTeW50YXhFcnJvciIsImZpcnN0RWxlbWVudENoaWxkIiwibGFzdCIsImxhc3RFbGVtZW50Q2hpbGQiLCJpbmRpdmlkdWFsIiwicmVnX2ZpbGUiLCJzcGVjaWZpZXIiLCJyIiwiX2NvbnRleHQiLCJpbXBvcnQiLCJ0ZW1wbGF0ZU1vZHVsZSIsInByZSIsInBvc3QiLCJwcmVfcmVzdWx0IiwidW5kZWZpbmVkIiwicmVzb2x2ZSIsInBvc3RfcmVzdWx0IiwicHJvY2Vzc1RlbXBsYXRlIiwicHJvY2Vzc2VkIiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50IiwidGVtcGxhdGVNb2RlIiwic3BlY3MiLCJyZWR1Y2UiLCJhY2MiLCJfb2JqZWN0U3ByZWFkIiwiZ2V0Q2xhc3NTcGVjaWZpY2F0aW9ucyIsIml0ZW0iLCJjbGFzc0xpc3QiLCJhZGQiLCJ2aWV3IiwicXVlcnlTZWxlY3RvckFsbCIsImVkaXQiLCJzZWFyY2giLCJfdmlldyIsIl9lZGl0IiwiX3NlYXJjaCIsImVtYmVkZGVkIiwibW9kZUhhbmRsZXIiLCJldmVudCIsInN0b3BQcm9wYWdhdGlvbiIsIndhdGNoIiwiZm9yRWFjaCIsIm5vZGUiLCJzdHlsZSIsImRpc3BsYXkiLCJ1bndhdGNoIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlc2V0SGFuZGxlciIsInNhdmVIYW5kbGVyIiwiZGVsZXRlSGFuZGxlciIsInJlY292ZXJIYW5kbGVyIiwicmVtb3ZlSGFuZGxlciIsImNhbGxNZXRob2QiLCJyZW1vdmVNZXRob2RzIiwidGFyZ2V0Iiwic3dpdGNoVG9WaWV3IiwicGFyZW50IiwicmVzZXRBbGwiLCJzYXZlQWxsIiwiZGVsZXRlIiwicmVjb3ZlciIsImFjYzEiLCJyZW1vdmUiLCJwdXNoIiwidXJpcyIsInVuaXF1ZSIsInAiLCJyZW1vdmVkQWxlcnQiLCJjbGVhciIsImRlbGV0ZWRIYW5kbGVyIiwiY29udGFpbnMiLCJtc2dTdHIiLCJkZWxldGVkSGVhZGVyIiwidGV4dENvbnRlbnQiLCJ0ZXh0QWxpZ24iLCJwcmVwZW5kIiwiaGVhZGVyIiwib24iLCJvZmYiLCJ2YWxpZEhhbmRsZXIiLCJpc0FsZXJ0VmlzaWJsZSIsImNoaWxkcmVuIiwiaW52YWxpZEhlYWRlciIsImhyZWYiLCJnZXRBdHRyaWJ1dGUiLCJyZXBsYWNlIiwic3JjIiwidmFsdWUiLCJ0aXRsZUluZGl2aWR1YWwiLCJwcm9wcyIsImZyb20iLCJwcm9wZXJ0eUNvbnRhaW5lciIsInByb3BlcnR5X3VyaSIsImFib3V0X3VyaSIsImFib3V0IiwiaXNBYm91dCIsImlkTW9kaWZpZWRIYW5kbGVyIiwicHJvcGVydHlNb2RpZmllZEhhbmRsZXIiLCJyZW5kZXJQcm9wZXJ0eVZhbHVlcyIsInJlbHMiLCJyZWxDb250YWluZXIiLCJyZWxfdXJpIiwiaXNFbWJlZGRlZCIsInNwZWMiLCJyZWxfaW5saW5lX3RlbXBsYXRlIiwicmVsX3RlbXBsYXRlX3VyaSIsImxpbWl0IiwiSW5maW5pdHkiLCJwYXJzZUludCIsIm1vcmUiLCJyZWxUZW1wbGF0ZSIsImUiLCJwcm9wZXJ0eSIsInZhbHVlVHlwZSIsImVtcHR5VmFsdWUiLCJzZXQiLCJwcmV2X3JlbmRlcmVkIiwiY3Vycl9yZW5kZXJlZCIsInNvcnRfcmVxdWlyZWQiLCJyZXZlcnNlU29ydCIsInByb3BlcnR5VmFsdWVzIiwibGltaXRfcGFyYW0iLCJyZXZlcnNlIiwiaSIsInJlbmRlclJlbGF0aW9uVmFsdWUiLCJyZW5kZXJlZFRlbXBsYXRlIiwiZmlsdGVyIiwiQm9vbGVhbiIsIm5vZGVzIiwiYXBwZW5kIiwiYXBwbHkiLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJmbGF0IiwicHJldl91cmlzIiwiT2JqZWN0Iiwia2V5cyIsInNlbGVjdG9yIiwidXJpIiwiQnJvd3NlclV0aWwiLCJlc2NhcGU0JCIsImluZGV4IiwiaW5kZXhPZiIsInNwbGljZSIsImxpc3QiLCJyZW1vdmVDaGlsZCIsInNvcnQiLCJhIiwiYiIsImJhZGdlQ29udGFpbmVyIiwibW9yZUJ1dHRvbiIsImNvdW50RGlzcGxheWVkIiwidHJpZ2dlciIsInJldmVyc2VCdXR0b24iLCJidWJibGVzIiwiZW1iZWRkZWRIYW5kbGVyIiwidmFsdWVzIiwiYWJvdXRzIiwiYWJvdXRDb250YWluZXIiLCJhYm91dF90ZW1wbGF0ZV91cmkiLCJhYm91dF9pbmxpbmVfdGVtcGxhdGUiLCJhYm91dFRlbXBsYXRlIiwicHJlc2VudCIsInJlbmRlcmVkIiwidmFsaWRhdGlvbiIsInN0YXRlIiwidmFsaWRhdGVUZW1wbGF0ZSIsInZhbGlkYXRlIiwiZW1iZWRkZWRTdGF0ZSIsImVtYmVkZGVkVGVtcGxhdGUiLCJlbWJlZGRlZFZhbGlkYXRpb24iLCJDdXN0b21FdmVudCIsImRldGFpbCIsIm1lcmdlVmFsaWRhdGlvblJlc3VsdCIsInZhbGlkYXRpb25SZXN1bHQiLCJtZXJnZWRTdGF0ZSIsImVsIiwiY29udHJvbCIsIiQiLCJhdHRyIiwiY29udHJvbFR5cGUiLCJmbiIsImNhdXNlIiwidmFsaWRhdGVkSGFuZGxlciIsInJlbW92ZUNsYXNzIiwicG9wb3ZlciIsImFkZENsYXNzIiwiZXhwbGFuYXRpb24iLCJjYXVzZXNQcm9taXNlcyIsImNhdXNlX3VyaSIsImNhdXNlcyIsImNvbnRlbnQiLCJwbGFjZW1lbnQiLCJhbmltYXRpb24iLCJpcyIsInN5bmNDb250cm9sIiwidHJpZ2dlckhhbmRsZXIiLCJhc3NpZ25EZWZhdWx0VmFsdWUiLCJvcHRzIiwicHJvbWlzZXMiLCJmb3JtYXR0ZWRWYWx1ZSIsInByZXZWYWx1ZSIsInZhbHVlSG9sZGVyIiwiYnRuR3JvdXAiLCJidG5SZW1vdmUiLCJzaG93IiwiaGlkZSIsInJlbW92ZVZhbHVlIiwiX3JlZjIiLCJwcmV2ZW50RGVmYXVsdCIsImlzTmV3IiwicmVtb3ZlZE9ianMiLCJjZWxsIiwicG9zaXRpb24iLCJzZXR0ZXJzIiwiX2NvbW1vblZlZGFKcyIsImRlZmF1bHQiLCJfY29tbW9uSW5kaXZpZHVhbF9tb2RlbEpzIiwiX2Jyb3dzZXJCYWNrZW5kX2Vycm9ySnMiLCJfY29tbW9uVXRpbEpzIiwiX2Jyb3dzZXJVdGlsSnMiLCJfYnJvd3Nlck5vdGlmeUpzIiwiX2Jyb3dzZXJWYWxpZGF0ZUpzIiwiX2Jyb3dzZXJEb21faGVscGVyc0pzIiwiX2pxdWVyeSIsIl9icm93c2VyQ29udHJvbHNWZWRhX2NvbnRyb2xzSnMiLCJleGVjdXRlIiwicHJvdG90eXBlIiwiX2V4cG9ydCJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS13ZWIvanMvYnJvd3Nlci9pbmRpdmlkdWFsX3ByZXNlbnRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbmRpdmlkdWFsIHByZXNlbnRlclxuXG5pbXBvcnQgdmVkYSBmcm9tICcuLi9jb21tb24vdmVkYS5qcyc7XG5pbXBvcnQgSW5kaXZpZHVhbE1vZGVsIGZyb20gJy4uL2NvbW1vbi9pbmRpdmlkdWFsX21vZGVsLmpzJztcbmltcG9ydCBCYWNrZW5kRXJyb3IgZnJvbSAnLi4vYnJvd3Nlci9iYWNrZW5kX2Vycm9yLmpzJztcbmltcG9ydCBDb21tb25VdGlsIGZyb20gJy4uL2NvbW1vbi91dGlsLmpzJztcbmltcG9ydCBCcm93c2VyVXRpbCBmcm9tICcuLi9icm93c2VyL3V0aWwuanMnO1xuaW1wb3J0IG5vdGlmeSBmcm9tICcuLi9icm93c2VyL25vdGlmeS5qcyc7XG5pbXBvcnQgdmFsaWRhdGUgZnJvbSAnLi4vYnJvd3Nlci92YWxpZGF0ZS5qcyc7XG5pbXBvcnQge2NsZWFyLCBzYW5pdGl6ZX0gZnJvbSAnLi4vYnJvd3Nlci9kb21faGVscGVycy5qcyc7XG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0ICcuLi9icm93c2VyL2NvbnRyb2xzL3ZlZGFfY29udHJvbHMuanMnO1xuXG5JbmRpdmlkdWFsTW9kZWwucHJvdG90eXBlLnByZXNlbnQgPSBJbmRpdmlkdWFsUHJlc2VudGVyO1xuXG5leHBvcnQgZGVmYXVsdCBJbmRpdmlkdWFsUHJlc2VudGVyO1xuXG4vKipcbiAqIEluZGl2aWR1YWwgcHJlc2VudGVyIG1ldGhvZCBmb3IgSW5kaXZpZHVhbE1vZGVsIGNsYXNzXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGNvbnRhaW5lciAtIGNvbnRhaW5lciB0byByZW5kZXIgaW5kaXZpZHVhbCB0b1xuICogQHBhcmFtIHtJbmRpdmlkdWFsTW9kZWx8c3RyaW5nfSB0ZW1wbGF0ZSAtIHRlbXBsYXRlIHRvIHJlbmRlciBpbmRpdmlkdWFsIHdpdGhcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlIC0gdmlldyB8IGVkaXQgfCBzZWFyY2hcbiAqIEBwYXJhbSB7T2JqZWN0fSBleHRyYSAtIGV4dHJhIHBhcmFtZXRlcnMgdG8gcGFzcyBybyB0ZW1wbGF0ZVxuICogQHBhcmFtIHtCb29sZWFufSB0b0FwcGVuZCAtIGZsYWcgZGVmaW5pbmcgZWl0aGVyIHRvIGFwcGVuZCBvciByZXBsYWNlIHRoZSBjb250YWluZXIncyBjb250ZW50IHdpdGggcmVuZGVyZWQgdGVtcGxhdGVcbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbmZ1bmN0aW9uIEluZGl2aWR1YWxQcmVzZW50ZXIgKGNvbnRhaW5lciwgdGVtcGxhdGUsIG1vZGUsIGV4dHJhLCB0b0FwcGVuZCkge1xuICBtb2RlID0gbW9kZSB8fCAndmlldyc7XG5cbiAgdG9BcHBlbmQgPSB0eXBlb2YgdG9BcHBlbmQgIT09ICd1bmRlZmluZWQnID8gdG9BcHBlbmQgOiB0cnVlO1xuXG4gIGlmICh0eXBlb2YgY29udGFpbmVyID09PSAnc3RyaW5nJykge1xuICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyKTtcbiAgfSBlbHNlIGlmIChjb250YWluZXIgaW5zdGFuY2VvZiBqUXVlcnkpIHtcbiAgICBjb250YWluZXIgPSBjb250YWluZXIuZ2V0KDApO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMubG9hZCgpXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgaWYgKGNvbnRhaW5lci5pZCA9PSAnbWFpbicpIHtcbiAgICAgICAgZG9jdW1lbnQudGl0bGUgPSB0aGlzLnRvU3RyaW5nKCk7XG4gICAgICB9XG4gICAgICBpZiAodGVtcGxhdGUpIHtcbiAgICAgICAgcmV0dXJuIGdldFRlbXBsYXRlKHRlbXBsYXRlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGlzQ2xhc3MgPSB0aGlzLmhhc1ZhbHVlKCdyZGY6dHlwZScsICdvd2w6Q2xhc3MnKSB8fCB0aGlzLmhhc1ZhbHVlKCdyZGY6dHlwZScsICdyZGZzOkNsYXNzJyk7XG4gICAgICAgIGlmICh0aGlzLmhhc1ZhbHVlKCd2LXVpOmhhc1RlbXBsYXRlJykgJiYgIWlzQ2xhc3MpIHtcbiAgICAgICAgICBjb25zdCB0ZW1wbGF0ZUluZGl2aWR1YWwgPSB0aGlzWyd2LXVpOmhhc1RlbXBsYXRlJ11bMF07XG4gICAgICAgICAgaWYgKCEodGVtcGxhdGVJbmRpdmlkdWFsIGluc3RhbmNlb2YgSW5kaXZpZHVhbE1vZGVsKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ3VzdG9tIHRlbXBsYXRlIG11c3QgYmUgYW4gaW5kaXZpZHVhbCEnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGdldFRlbXBsYXRlKHRlbXBsYXRlSW5kaXZpZHVhbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3Qgb250b2xvZ3kgPSB2ZWRhLm9udG9sb2d5O1xuICAgICAgICAgIGNvbnN0IHRlbXBsYXRlcyA9IHRoaXNbJ3JkZjp0eXBlJ10ubWFwKCh0eXBlKSA9PiBvbnRvbG9neS5nZXRDbGFzc1RlbXBsYXRlKHR5cGUuaWQpKS5tYXAoZ2V0VGVtcGxhdGUpO1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbCh0ZW1wbGF0ZXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgICAudGhlbigobmFtZWRUZW1wbGF0ZSkgPT4ge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkobmFtZWRUZW1wbGF0ZSkpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKG5hbWVkVGVtcGxhdGUubWFwKCh7dGVtcGxhdGVTdHJpbmcsIG5hbWV9KSA9PiByZW5kZXJUZW1wbGF0ZSh0aGlzLCBjb250YWluZXIsIHRlbXBsYXRlU3RyaW5nLCBuYW1lLCBtb2RlLCBleHRyYSwgdG9BcHBlbmQpKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVuZGVyVGVtcGxhdGUodGhpcywgY29udGFpbmVyLCBuYW1lZFRlbXBsYXRlLnRlbXBsYXRlU3RyaW5nLCBuYW1lZFRlbXBsYXRlLm5hbWUsIG1vZGUsIGV4dHJhLCB0b0FwcGVuZCk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3JIYW5kbGVyKVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IGVycm9yUHJpbnRlci5jYWxsKHRoaXMsIGVycm9yLCBjb250YWluZXIpKTtcbn1cblxuLyoqXG4gKiBHZXQgdGVtcGxhdGUgc3RyaW5nXG4gKiBAcGFyYW0ge0luZGl2aWR1YWxNb2RlbHxzdHJpbmd8SFRNTEVsZW1lbnR9IHRlbXBsYXRlXG4gKiBAcmV0dXJuIHtQcm9taXNlPHtuYW1lLCB0ZW1wbGF0ZX0+fVxuICovXG5mdW5jdGlvbiBnZXRUZW1wbGF0ZSAodGVtcGxhdGUpIHtcbiAgY29uc3QgcmVnX3VyaSA9IC9eW2Etel1bYS16LTAtOV0qOihbYS16QS1aMC05LV9dKSokLztcbiAgaWYgKHRlbXBsYXRlIGluc3RhbmNlb2YgSW5kaXZpZHVhbE1vZGVsKSB7XG4gICAgcmV0dXJuIHRlbXBsYXRlLmxvYWQoKS50aGVuKCh0ZW1wbGF0ZUluZGl2aWR1YWwpID0+IHtcbiAgICAgIGlmICghdGVtcGxhdGVJbmRpdmlkdWFsLmhhc1ZhbHVlKCdyZGY6dHlwZScsICd2LXVpOkNsYXNzVGVtcGxhdGUnKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd2LXVpOkNsYXNzVGVtcGxhdGUgcmVxdWlyZWQhJyk7XG4gICAgICB9XG4gICAgICBjb25zdCB0ZW1wbGF0ZU5hbWUgPSB0ZW1wbGF0ZS5pZDtcbiAgICAgIGNvbnN0IHRlbXBsYXRlU3RyaW5nID0gdGVtcGxhdGVbJ3YtdWk6dGVtcGxhdGUnXVswXTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IHRlbXBsYXRlTmFtZSxcbiAgICAgICAgdGVtcGxhdGVTdHJpbmcsXG4gICAgICB9O1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB0ZW1wbGF0ZSA9PT0gJ3N0cmluZycgJiYgcmVnX3VyaS50ZXN0KHRlbXBsYXRlKSkge1xuICAgIGNvbnN0IHRlbXBsYXRlSW5kaXZpZHVhbCA9IG5ldyBJbmRpdmlkdWFsTW9kZWwodGVtcGxhdGUpO1xuICAgIHJldHVybiBnZXRUZW1wbGF0ZSh0ZW1wbGF0ZUluZGl2aWR1YWwpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB0ZW1wbGF0ZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogU3RyaW5nKHRlbXBsYXRlLmxlbmd0aCksXG4gICAgICB0ZW1wbGF0ZVN0cmluZzogdGVtcGxhdGUsXG4gICAgfTtcbiAgfSBlbHNlIGlmICh0ZW1wbGF0ZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IFN0cmluZyh0ZW1wbGF0ZS5sZW5ndGgpLFxuICAgICAgdGVtcGxhdGVTdHJpbmc6IHRlbXBsYXRlLm91dGVySFRNTCxcbiAgICB9O1xuICB9XG4gIGNvbnN0IGdlbmVyaWMgPSBuZXcgSW5kaXZpZHVhbE1vZGVsKCd2LXVpOmdlbmVyaWMnKTtcbiAgcmV0dXJuIGdldFRlbXBsYXRlKGdlbmVyaWMpO1xufVxuXG4vKipcbiAqIFNob3cgc3VjY2VzcyBtZXNzYWdlXG4gKiBAcGFyYW0ge1Byb21pc2V9IHJlc3VsdFxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gc3VjY2Vzc0hhbmRsZXIgKHJlc3VsdCkge1xuICBjb25zdCBzdWNjZXNzTXNnID0gbmV3IEluZGl2aWR1YWxNb2RlbCgndi1zOlN1Y2Nlc3NCdW5kbGUnKTtcbiAgc3VjY2Vzc01zZy5sb2FkKCkudGhlbigoKSA9PiB7XG4gICAgbm90aWZ5KCdzdWNjZXNzJywge25hbWU6IHN1Y2Nlc3NNc2cudG9TdHJpbmcoKX0pO1xuICB9KS5jYXRjaCgoZXJyb3IpID0+IGNvbnNvbGUuZXJyb3IoJ01zZyBsb2FkIGZhaWxlZCcpKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBTaG93IGVycm9yIG1lc3NhZ2VcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIHRvIGhhbmRsZVxuICogQHRocm93IHtFcnJvcn1cbiAqL1xuZnVuY3Rpb24gZXJyb3JIYW5kbGVyIChlcnJvcikge1xuICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBCYWNrZW5kRXJyb3IpIHtcbiAgICBpZiAoZXJyb3IuY29kZSA9PT0gNDcyKSB0aHJvdyBlcnJvcjtcbiAgICBjb25zdCBlcnJvckluZGl2aWR1YWwgPSBuZXcgSW5kaXZpZHVhbE1vZGVsKGB2LXM6RXJyb3JfJHtlcnJvci5jb2RlfWApO1xuICAgIGVycm9ySW5kaXZpZHVhbC5sb2FkKCkudGhlbigoKSA9PiB7XG4gICAgICBjb25zdCBzZXZlcml0eSA9IFN0cmluZyhlcnJvckluZGl2aWR1YWxbJ3Ytczp0YWcnXVswXSkgfHwgJ2Rhbmdlcic7XG4gICAgICBub3RpZnkoc2V2ZXJpdHksIHtjb2RlOiBlcnJvckluZGl2aWR1YWxbJ3YtczplcnJvckNvZGUnXVswXSwgbWVzc2FnZTogZXJyb3JJbmRpdmlkdWFsWyd2LXM6ZXJyb3JNZXNzYWdlJ10ubWFwKENvbW1vblV0aWwuZm9ybWF0VmFsdWUpLmpvaW4oJyAnKX0pO1xuICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgIG5vdGlmeSgnZGFuZ2VyJywgZXJyb3IpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG5vdGlmeSgnZGFuZ2VyJywge25hbWU6IGVycm9yLnRvU3RyaW5nKCl9KTtcbiAgfVxuICB0aHJvdyBlcnJvcjtcbn1cblxuLyoqXG4gKiBQcmludCBlcnJvciBtZXNzYWdlIGluIGNvb250YWluZXJcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIHRvIHByaW50XG4gKiBAcGFyYW0ge09iamVjdH0gY29udGFpbmVyIGZvciBlcnJvclxuICogQHRoaXMge0luZGl2aWR1YWxNb2RlbH1cbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5mdW5jdGlvbiBlcnJvclByaW50ZXIgKGVycm9yLCBjb250YWluZXIpIHtcbiAgY29uc29sZS5lcnJvcihgUHJlc2VudGVyIGZhaWxlZDogJHt0aGlzLmlkfWApO1xuICBsZXQgZXJyb3JJbmRpdmlkdWFsO1xuICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBCYWNrZW5kRXJyb3IpIHtcbiAgICBlcnJvckluZGl2aWR1YWwgPSBuZXcgSW5kaXZpZHVhbE1vZGVsKGB2LXM6RXJyb3JfJHtlcnJvci5jb2RlfWApO1xuICB9IGVsc2Uge1xuICAgIGVycm9ySW5kaXZpZHVhbCA9IG5ldyBJbmRpdmlkdWFsTW9kZWwoKTtcbiAgICBlcnJvckluZGl2aWR1YWxbJ3Ytczp0YWcnXSA9ICdkYW5nZXInO1xuICAgIGVycm9ySW5kaXZpZHVhbFsndi1zOmVycm9yTWVzc2FnZSddID0gZXJyb3IudG9TdHJpbmcoKTtcbiAgfVxuICByZXR1cm4gZXJyb3JJbmRpdmlkdWFsLmxvYWQoKVxuICAgIC50aGVuKCgpID0+IGBcbiAgICAgIDxzcGFuIGNsYXNzPVwicGFkZGluZy1zbSBiZy0ke3Nhbml0aXplKGVycm9ySW5kaXZpZHVhbFsndi1zOnRhZyddWzBdKX1cIiB0aXRsZT1cIiR7c2FuaXRpemUodGhpcy5pZCl9XCI+XG4gICAgICAgIDxzdHJvbmc+JHtzYW5pdGl6ZShlcnJvckluZGl2aWR1YWxbJ3YtczplcnJvckNvZGUnXVswXS50b1N0cmluZygpIHx8ICcnKX08L3N0cm9uZz4gJHtzYW5pdGl6ZShlcnJvckluZGl2aWR1YWxbJ3YtczplcnJvck1lc3NhZ2UnXS5tYXAoQ29tbW9uVXRpbC5mb3JtYXRWYWx1ZSkuam9pbignICcpKX1cbiAgICAgIDwvc3Bhbj5gKVxuICAgIC5jYXRjaCgoKSA9PiBgXG4gICAgICA8c3BhbiBjbGFzcz1cInBhZGRpbmctc20gYmctZGFuZ2VyXCIgdGl0bGU9XCIke3Nhbml0aXplKHRoaXMuaWQpfVwiPlxuICAgICAgICA8c3Ryb25nPiR7c2FuaXRpemUoZXJyb3IuY29kZSl9PC9zdHJvbmc+ICR7c2FuaXRpemUoZXJyb3IubmFtZSl9ICR7c2FuaXRpemUoZXJyb3IubWVzc2FnZSl9PlxuICAgICAgPC9zcGFuPmApXG4gICAgLnRoZW4oKG1zZykgPT4ge1xuICAgICAgbGV0IHdyYXBwZXI7XG4gICAgICBpZiAoY29udGFpbmVyLnRhZ05hbWUgPT09ICdUQk9EWScgfHwgY29udGFpbmVyLnRhZ05hbWUgPT09ICdUQUJMRScpIHtcbiAgICAgICAgY29uc3QgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuICAgICAgICBjb25zdCB0ZCA9IHRyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpO1xuICAgICAgICB0ZC5jb2xTcGFuID0gOTk5O1xuICAgICAgICB0ZC5pbm5lckhUTUwgPSBtc2c7XG4gICAgICAgIHdyYXBwZXIgPSB0cjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkaXYuaW5uZXJIVE1MID0gbXNnO1xuICAgICAgICB3cmFwcGVyID0gZGl2O1xuICAgICAgfVxuICAgICAgd3JhcHBlci5zZXRBdHRyaWJ1dGUoJ3Jlc291cmNlJywgc2FuaXRpemUodGhpcy5pZCkpO1xuICAgICAgcmV0dXJuIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh3cmFwcGVyKTtcbiAgICB9KTtcbn1cblxuLyoqXG4gKiBXcmFwIHRlbXBsYXRlXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbFxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmZ1bmN0aW9uIHdyYXAgKGh0bWwpIHtcbiAgaHRtbCA9IGh0bWwudHJpbSgpO1xuICBpZiAoaHRtbC5zdGFydHNXaXRoKCc8c2NyaXB0JykgfHwgaHRtbC5lbmRzV2l0aCgnc2NyaXB0PicpKSB7XG4gICAgY29uc29sZS5lcnJvcignU2NyaXB0cyBmb3IgaW5saW5lIHRlbXBsYXRlcyBhcmUgbm90IHN1cHBvcnRlZCcpO1xuICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignU2NyaXB0cyBmb3IgaW5saW5lIHRlbXBsYXRlcyBhcmUgbm90IHN1cHBvcnRlZCcpO1xuICB9XG4gIGxldCB0YWdOYW1lO1xuICBpZiAoaHRtbC5zdGFydHNXaXRoKCc8dHInKSkge1xuICAgIHRhZ05hbWUgPSAndGJvZHknO1xuICB9IGVsc2UgaWYgKGh0bWwuc3RhcnRzV2l0aCgnPHRkJykpIHtcbiAgICB0YWdOYW1lID0gJ3RyJztcbiAgfSBlbHNlIHtcbiAgICB0YWdOYW1lID0gJ2Rpdic7XG4gIH1cbiAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG4gIHdyYXBwZXIuaW5uZXJIVE1MID0gaHRtbDtcbiAgY29uc3QgdGVtcGxhdGUgPSB3cmFwcGVyLmZpcnN0RWxlbWVudENoaWxkO1xuICBjb25zdCBsYXN0ID0gd3JhcHBlci5sYXN0RWxlbWVudENoaWxkO1xuICBpZiAobGFzdCAhPT0gdGVtcGxhdGUpIHtcbiAgICBjb25zb2xlLmVycm9yKCdVbndyYXBwZWQgdGVtcGxhdGVzIGFyZSBub3Qgc3VwcG9ydGVkJyk7XG4gICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKCdVbndyYXBwZWQgdGVtcGxhdGVzIGFyZSBub3Qgc3VwcG9ydGVkJyk7XG4gIH1cbiAgcmV0dXJuIHdyYXBwZXI7XG59XG5cbi8qKlxuICogUmVuZGVyIHRlbXBsYXRlXG4gKiBAcGFyYW0ge0luZGl2aWR1YWxNb2RlbH0gaW5kaXZpZHVhbCAtIGluZGl2aWR1YWwgdG8gcmVuZGVyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGNvbnRhaW5lciAtIGNvbnRhaW5lciB0byByZW5kZXIgaW5kaXZpZHVhbCB0b1xuICogQHBhcmFtIHtJbmRpdmlkdWFsTW9kZWx8c3RyaW5nfSB0ZW1wbGF0ZVN0cmluZyAtIHRlbXBsYXRlIHN0cmluZyB0byByZW5kZXIgaW5kaXZpZHVhbCB3aXRoXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIG5hbWUgb2YgdGVtcGxhdGUgZm9yIHNvdXJjZVVSTFxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGUgLSB2aWV3IHwgZWRpdCB8IHNlYXJjaFxuICogQHBhcmFtIHtPYmplY3R9IGV4dHJhIC0gZXh0cmEgcGFyYW1ldGVycyB0byBwYXNzIHJvIHRlbXBsYXRlXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHRvQXBwZW5kIC0gZmxhZyBkZWZpbmluZyBlaXRoZXIgdG8gYXBwZW5kIG9yIHJlcGxhY2UgdGhlIGNvbnRhaW5lcidzIGNvbnRlbnQgd2l0aCByZW5kZXJlZCB0ZW1wbGF0ZVxuICogQHJldHVybiB7UHJvbWlzZX1cbiAqL1xuZnVuY3Rpb24gcmVuZGVyVGVtcGxhdGUgKGluZGl2aWR1YWwsIGNvbnRhaW5lciwgdGVtcGxhdGVTdHJpbmcsIG5hbWUsIG1vZGUsIGV4dHJhLCB0b0FwcGVuZCkge1xuICBjb25zdCByZWdfZmlsZSA9IC9cXC5qcyQvO1xuICBpZiAocmVnX2ZpbGUudGVzdCh0ZW1wbGF0ZVN0cmluZykpIHtcbiAgICByZXR1cm4gaW1wb3J0KGAvdGVtcGxhdGVzLyR7dGVtcGxhdGVTdHJpbmd9YClcbiAgICAgIC50aGVuKCh0ZW1wbGF0ZU1vZHVsZSkgPT4ge1xuICAgICAgICBjb25zdCBwcmUgPSB0ZW1wbGF0ZU1vZHVsZS5wcmU7XG4gICAgICAgIGNvbnN0IHBvc3QgPSB0ZW1wbGF0ZU1vZHVsZS5wb3N0O1xuICAgICAgICBjb25zdCBodG1sID0gdGVtcGxhdGVNb2R1bGUuaHRtbDtcbiAgICAgICAgaWYgKCFodG1sKSB7XG4gICAgICAgICAgY29uc3QgcHJlX3Jlc3VsdCA9IHByZSA/IHByZS5jYWxsKGluZGl2aWR1YWwsIGluZGl2aWR1YWwsIHVuZGVmaW5lZCwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwcmVfcmVzdWx0KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBvc3RfcmVzdWx0ID0gcG9zdCA/IHBvc3QuY2FsbChpbmRpdmlkdWFsLCBpbmRpdmlkdWFsLCB1bmRlZmluZWQsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwb3N0X3Jlc3VsdCkudGhlbigoKSA9PiB1bmRlZmluZWQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHdyYXBwZXIgPSB3cmFwKHRlbXBsYXRlTW9kdWxlLmh0bWwpO1xuICAgICAgICAgIGNvbnN0IHRlbXBsYXRlID0gd3JhcHBlci5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICB0ZW1wbGF0ZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtbW9kZScsIG1vZGUpO1xuICAgICAgICAgIGNvbnN0IHByZV9yZXN1bHQgPSBwcmUgPyBwcmUuY2FsbChpbmRpdmlkdWFsLCBpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwcmVfcmVzdWx0KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gcHJvY2Vzc1RlbXBsYXRlKGluZGl2aWR1YWwsIGNvbnRhaW5lciwgd3JhcHBlciwgbW9kZSkpXG4gICAgICAgICAgICAudGhlbigocHJvY2Vzc2VkKSA9PiB7XG4gICAgICAgICAgICAgIGlmICh0b0FwcGVuZCkge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9jZXNzZWQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHByb2Nlc3NlZC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChtb2RlKSk7XG4gICAgICAgICAgICAgIGNvbnN0IHBvc3RfcmVzdWx0ID0gcG9zdCA/IHBvc3QuY2FsbChpbmRpdmlkdWFsLCBpbmRpdmlkdWFsLCBwcm9jZXNzZWQsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHBvc3RfcmVzdWx0KS50aGVuKCgpID0+IHByb2Nlc3NlZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3Qgd3JhcHBlciA9IHdyYXAodGVtcGxhdGVTdHJpbmcpO1xuICAgIHJldHVybiBwcm9jZXNzVGVtcGxhdGUoaW5kaXZpZHVhbCwgY29udGFpbmVyLCB3cmFwcGVyLCBtb2RlKS50aGVuKCh0ZW1wbGF0ZSkgPT4ge1xuICAgICAgaWYgKHRvQXBwZW5kKSB7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0ZW1wbGF0ZSk7XG4gICAgICB9XG4gICAgICB0ZW1wbGF0ZS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChtb2RlKSk7XG4gICAgICByZXR1cm4gdGVtcGxhdGU7XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBQcm9jZXNzIHRlbXBsYXRlXG4gKiBAcGFyYW0ge0luZGl2aWR1YWxNb2RlbH0gaW5kaXZpZHVhbCAtIGluZGl2aWR1YWwgdG8gcmVuZGVyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGNvbnRhaW5lciAtIGNvbnRhaW5lciB0byByZW5kZXIgaW5kaXZpZHVhbCB0b1xuICogQHBhcmFtIHtFbGVtZW50fSB3cmFwcGVyIC0gdGVtcGxhdGUgd3JhcHBlclxuICogQHBhcmFtIHtzdHJpbmd9IHRlbXBsYXRlTW9kZSAtIHZpZXcgfCBlZGl0IHwgc2VhcmNoXG4gKiBAdGhpcyBJbmRpdmlkdWFsXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG5mdW5jdGlvbiBwcm9jZXNzVGVtcGxhdGUgKGluZGl2aWR1YWwsIGNvbnRhaW5lciwgd3JhcHBlciwgdGVtcGxhdGVNb2RlKSB7XG4gIGxldCBtb2RlID0gdGVtcGxhdGVNb2RlO1xuXG4gIGNvbnN0IHRlbXBsYXRlID0gd3JhcHBlci5maXJzdEVsZW1lbnRDaGlsZDtcblxuICAvLyBHZXQgcHJvcGVydGllcyBzcGVjaWZpY2F0aW9uc1xuICBjb25zdCBzcGVjcyA9IGluZGl2aWR1YWxbJ3JkZjp0eXBlJ10ucmVkdWNlKChhY2MsIHR5cGUpID0+ICh7XG4gICAgLi4uYWNjLFxuICAgIC4uLnZlZGEub250b2xvZ3kuZ2V0Q2xhc3NTcGVjaWZpY2F0aW9ucyh0eXBlLmlkKSxcbiAgfSksIHt9KTtcblxuICB0ZW1wbGF0ZS5zZXRBdHRyaWJ1dGUoJ3Jlc291cmNlJywgaW5kaXZpZHVhbC5pZCk7XG4gIHRlbXBsYXRlLnNldEF0dHJpYnV0ZSgndHlwZW9mJywgaW5kaXZpZHVhbFsncmRmOnR5cGUnXS5tYXAoKGl0ZW0pID0+IGl0ZW0uaWQpLmpvaW4oJyAnKSk7XG4gIHRlbXBsYXRlLmNsYXNzTGlzdC5hZGQoJ3RlbXBsYXRlJyk7XG5cbiAgY29uc3QgdmlldyA9IHdyYXBwZXIucXVlcnlTZWxlY3RvckFsbCgnLnZpZXcnKTtcbiAgY29uc3QgZWRpdCA9IHdyYXBwZXIucXVlcnlTZWxlY3RvckFsbCgnLmVkaXQnKTtcbiAgY29uc3Qgc2VhcmNoID0gd3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKCcuc2VhcmNoJyk7XG4gIGNvbnN0IF92aWV3ID0gd3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKCcuLXZpZXcnKTtcbiAgY29uc3QgX2VkaXQgPSB3cmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy4tZWRpdCcpO1xuICBjb25zdCBfc2VhcmNoID0gd3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKCcuLXNlYXJjaCcpO1xuXG4gIC8vIEVtYmVkZGVkIHRlbXBsYXRlcyBsaXN0XG4gIGNvbnN0IGVtYmVkZGVkID0gW107XG5cbiAgLyoqXG4gICAqIFRlbXBsYXRlIG1vZGUgaGFuZGxlci4gQXBwbGllcyBtb2RlIHRvIHRlbXBsYXRlIHRvIHNob3cvaGlkZSBlbGVtZW50cyBpbiBkaWZmZXJlbnQgbW9kZXNcbiAgICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIGNvbnN0IG1vZGVIYW5kbGVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgbW9kZSA9IGV2ZW50LnR5cGU7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGVtcGxhdGUuc2V0QXR0cmlidXRlKCdkYXRhLW1vZGUnLCBtb2RlKTtcbiAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICBjYXNlICd2aWV3JzpcbiAgICAgIGluZGl2aWR1YWwud2F0Y2goKTtcbiAgICAgIHZpZXcuZm9yRWFjaCgobm9kZSkgPT4gbm9kZS5zdHlsZS5kaXNwbGF5ID0gJycpO1xuICAgICAgX3ZpZXcuZm9yRWFjaCgobm9kZSkgPT4gbm9kZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2VkaXQnOlxuICAgICAgaW5kaXZpZHVhbC51bndhdGNoKCk7XG4gICAgICBlZGl0LmZvckVhY2goKG5vZGUpID0+IG5vZGUuc3R5bGUuZGlzcGxheSA9ICcnKTtcbiAgICAgIF9lZGl0LmZvckVhY2goKG5vZGUpID0+IG5vZGUuc3R5bGUuZGlzcGxheSA9ICdub25lJyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdzZWFyY2gnOlxuICAgICAgc2VhcmNoLmZvckVhY2goKG5vZGUpID0+IG5vZGUuc3R5bGUuZGlzcGxheSA9ICcnKTtcbiAgICAgIF9zZWFyY2guZm9yRWFjaCgobm9kZSkgPT4gbm9kZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICAvLyBzeW5jIG1vZGUgZm9yIGVtYmVkZGVkIHRlbXBsYXRlc1xuICAgIGVtYmVkZGVkLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGl0ZW0uZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQobW9kZSkpO1xuICAgIH0pO1xuICB9O1xuICB0ZW1wbGF0ZS5hZGRFdmVudExpc3RlbmVyKCd2aWV3JywgbW9kZUhhbmRsZXIpO1xuICB0ZW1wbGF0ZS5hZGRFdmVudExpc3RlbmVyKCdlZGl0JywgbW9kZUhhbmRsZXIpO1xuICB0ZW1wbGF0ZS5hZGRFdmVudExpc3RlbmVyKCdzZWFyY2gnLCBtb2RlSGFuZGxlcik7XG5cbiAgLy8gRGVmaW5lIGhhbmRsZXJzXG4gIHRlbXBsYXRlLnZlZGEgPSB7XG4gICAgJ3Jlc2V0JzogcmVzZXRIYW5kbGVyLFxuICAgICdzYXZlJzogc2F2ZUhhbmRsZXIsXG4gICAgJ2RlbGV0ZSc6IGRlbGV0ZUhhbmRsZXIsXG4gICAgJ3JlY292ZXInOiByZWNvdmVySGFuZGxlcixcbiAgICAncmVtb3ZlJzogcmVtb3ZlSGFuZGxlcixcbiAgfTtcblxuICAvKipcbiAgICogQ2FsbCBtZXRob2RcbiAgICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAgICovXG4gIGZ1bmN0aW9uIGNhbGxNZXRob2QgKGV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgY29uc3QgdHlwZSA9IGV2ZW50LnR5cGU7XG4gICAgaWYgKHR5cGUgPT09ICdrYW5jZWwnKSB7IC8vIFRvIGRpc3Rpbmd1aXNoIGZyb20gc3RhbmRhcmQgZXZlbnRcbiAgICAgIHJlc2V0SGFuZGxlcigpO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3NhdmUnKSB7XG4gICAgICBzYXZlSGFuZGxlcigpO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2RlbGV0ZScpIHtcbiAgICAgIGRlbGV0ZUhhbmRsZXIoKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdyZWNvdmVyJykge1xuICAgICAgcmVjb3ZlckhhbmRsZXIoKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdkZXN0cm95Jykge1xuICAgICAgcmVtb3ZlSGFuZGxlcigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgdmVkYSBtZXRob2RzIGZyb20gbm9kZVxuICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICAgKi9cbiAgZnVuY3Rpb24gcmVtb3ZlTWV0aG9kcyAoZXZlbnQpIHtcbiAgICBkZWxldGUgZXZlbnQudGFyZ2V0LnZlZGE7XG4gIH1cbiAgdGVtcGxhdGUuYWRkRXZlbnRMaXN0ZW5lcigna2FuY2VsJywgY2FsbE1ldGhvZCk7XG4gIHRlbXBsYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ3NhdmUnLCBjYWxsTWV0aG9kKTtcbiAgdGVtcGxhdGUuYWRkRXZlbnRMaXN0ZW5lcignZGVsZXRlJywgY2FsbE1ldGhvZCk7XG4gIHRlbXBsYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ3JlY292ZXInLCBjYWxsTWV0aG9kKTtcbiAgdGVtcGxhdGUuYWRkRXZlbnRMaXN0ZW5lcignZGVzdHJveScsIGNhbGxNZXRob2QpO1xuICB0ZW1wbGF0ZS5hZGRFdmVudExpc3RlbmVyKCdyZW1vdmUnLCByZW1vdmVNZXRob2RzKTtcblxuICBjb25zdCBzd2l0Y2hUb1ZpZXcgPSAoKSA9PiB0ZW1wbGF0ZS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgndmlldycpKTtcblxuICAvKipcbiAgICogUmVzZXQgaW5kaXZpZHVhbCBhbmQgZW1iZWRkZWQgaW5kaXZpZHVhbHNcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmVudCBpZFxuICAgKiBAcGFyYW0ge0FycmF5fSBhY2MgZm9yIGluZGl2aWR1YWxzIHVyaXNcbiAgICogQHJldHVybiB7UHJvbWlzZTx2b2lkPn1cbiAgICovXG4gIGZ1bmN0aW9uIHJlc2V0SGFuZGxlciAocGFyZW50LCBhY2MpIHtcbiAgICByZXR1cm4gaW5kaXZpZHVhbC5yZXNldEFsbCgpXG4gICAgICAudGhlbihzd2l0Y2hUb1ZpZXcpXG4gICAgICAuY2F0Y2goZXJyb3JIYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYXZlIGluZGl2aWR1YWwgYW5kIGVtYmVkZGVkIGNoaWxkcmVuIGluZGl2aWR1YWxzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXJlbnQgaWRcbiAgICogQHBhcmFtIHtBcnJheX0gYWNjIGZvciBpbmRpdmlkdWFscyB1cmlzXG4gICAqIEByZXR1cm4ge1Byb21pc2U8dm9pZD59XG4gICAqL1xuICBmdW5jdGlvbiBzYXZlSGFuZGxlciAoKSB7XG4gICAgcmV0dXJuIGluZGl2aWR1YWwuc2F2ZUFsbCgpXG4gICAgICAudGhlbihzd2l0Y2hUb1ZpZXcpXG4gICAgICAudGhlbihzdWNjZXNzSGFuZGxlcilcbiAgICAgIC5jYXRjaChlcnJvckhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBpbmRpdmlkdWFsIGFuZCBlbWJlZGRlZCBjaGlsZHJlbiBpbmRpdmlkdWFsc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyZW50IGlkXG4gICAqIEByZXR1cm4ge1Byb21pc2U8dm9pZD59XG4gICAqL1xuICBmdW5jdGlvbiBkZWxldGVIYW5kbGVyICgpIHtcbiAgICByZXR1cm4gaW5kaXZpZHVhbC5kZWxldGUoKVxuICAgICAgLnRoZW4oc3dpdGNoVG9WaWV3KVxuICAgICAgLnRoZW4oc3VjY2Vzc0hhbmRsZXIpXG4gICAgICAuY2F0Y2goZXJyb3JIYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWNvdmVyIGluZGl2aWR1YWwgYW5kIGVtYmVkZGVkIGNoaWxkcmVuIGluZGl2aWR1YWxzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXJlbnQgaWRcbiAgICogQHJldHVybiB7UHJvbWlzZTx2b2lkPn1cbiAgICovXG4gIGZ1bmN0aW9uIHJlY292ZXJIYW5kbGVyICgpIHtcbiAgICByZXR1cm4gaW5kaXZpZHVhbC5yZWNvdmVyKClcbiAgICAgIC50aGVuKHN3aXRjaFRvVmlldylcbiAgICAgIC50aGVuKHN1Y2Nlc3NIYW5kbGVyKVxuICAgICAgLmNhdGNoKGVycm9ySGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGluZGl2aWR1YWwgYW5kIGVtYmVkZGVkIGNoaWxkcmVuIGluZGl2aWR1YWxzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXJlbnQgaWRcbiAgICogQHBhcmFtIHtBcnJheX0gYWNjIGZvciBpbmRpdmlkdWFscyB1cmlzXG4gICAqIEByZXR1cm4ge1Byb21pc2U8dm9pZD59XG4gICAqL1xuICBmdW5jdGlvbiByZW1vdmVIYW5kbGVyIChwYXJlbnQsIGFjYykge1xuICAgIGFjYyA9IGFjYyB8fCBbXTtcbiAgICBhY2MgPSBlbWJlZGRlZC5yZWR1Y2UoKGFjYzEsIGl0ZW0pID0+IHtcbiAgICAgIHJldHVybiB0eXBlb2YgaXRlbS52ZWRhLnJlbW92ZSA9PT0gJ2Z1bmN0aW9uJyA/IGl0ZW0udmVkYS5yZW1vdmUoaW5kaXZpZHVhbC5pZCwgYWNjMSkgOiBhY2MxO1xuICAgIH0sIGFjYyk7XG4gICAgYWNjLnB1c2goaW5kaXZpZHVhbC5pZCk7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgcmV0dXJuIGFjYztcbiAgICB9XG4gICAgY29uc3QgdXJpcyA9IENvbW1vblV0aWwudW5pcXVlKGFjYyk7XG4gICAgcmV0dXJuIHVyaXMucmVkdWNlKChwLCBpdGVtKSA9PiBwLnRoZW4oKCkgPT4gbmV3IEluZGl2aWR1YWxNb2RlbChpdGVtKS5yZW1vdmUoKSksIFByb21pc2UucmVzb2x2ZSgpKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBjb25zdCByZW1vdmVkQWxlcnQgPSBuZXcgSW5kaXZpZHVhbE1vZGVsKCd2LXM6UmVtb3ZlZEFsZXJ0Jyk7XG4gICAgICAgIHJlbW92ZWRBbGVydC5sb2FkKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgY2xlYXIodGVtcGxhdGUpO1xuICAgICAgICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IGA8Y29kZT4ke3Nhbml0aXplKHJlbW92ZWRBbGVydC50b1N0cmluZygpKX08L2NvZGU+YDtcbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiBjb25zb2xlLmVycm9yKCdBbGVydCBsb2FkIGZhaWxlZCcpKTtcbiAgICAgIH0pXG4gICAgICAudGhlbihzdWNjZXNzSGFuZGxlcilcbiAgICAgIC5jYXRjaChlcnJvckhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluZGl2aWR1YWwgdi1zOmRlbGV0ZWQgaGFuZGxlci4gU2hvd3MgZGVsZXRlZCBhbGVydC5cbiAgICogQHRoaXMgSW5kaXZpZHVhbFxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgY29uc3QgZGVsZXRlZEhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCB0aGlzLmhhc1ZhbHVlKCd2LXM6ZGVsZXRlZCcsIHRydWUpICkge1xuICAgICAgaWYgKG1vZGUgPT09ICd2aWV3JyAmJiBjb250YWluZXIgJiYgY29udGFpbmVyLmlkICE9PSAnbWFpbicgJiYgIWNvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoJ21vZGFsLWJvZHknKSkge1xuICAgICAgICB0ZW1wbGF0ZS5jbGFzc0xpc3QuYWRkKCdkZWxldGVkJyk7XG4gICAgICB9XG4gICAgICBpZiAoY29udGFpbmVyICYmIChjb250YWluZXIuaWQgPT09ICdtYWluJyB8fCBjb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdtb2RhbC1ib2R5JykpKSB7XG4gICAgICAgIGNvbnN0IG1zZyA9IG5ldyBJbmRpdmlkdWFsTW9kZWwoJ3YtczpEZWxldGVkQWxlcnQnKTtcbiAgICAgICAgbXNnLmxvYWQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICBjb25zdCBtc2dTdHIgPSBtc2dbJ3JkZnM6bGFiZWwnXS5tYXAoQ29tbW9uVXRpbC5mb3JtYXRWYWx1ZSkuam9pbignICcpO1xuICAgICAgICAgIG5vdGlmeSgnd2FybmluZycsIHtuYW1lOiBtc2dTdHJ9KTtcbiAgICAgICAgICBjb25zdCBkZWxldGVkSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDQnKTtcbiAgICAgICAgICBkZWxldGVkSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2RlbGV0ZWQtaGVhZGVyJyk7XG4gICAgICAgICAgZGVsZXRlZEhlYWRlci50ZXh0Q29udGVudCA9IG1zZ1N0cjtcbiAgICAgICAgICBkZWxldGVkSGVhZGVyLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICAgIHRlbXBsYXRlLnByZXBlbmQoZGVsZXRlZEhlYWRlcik7XG4gICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4gY29uc29sZS5lcnJvcignTXNnIGxvYWQgZmFpbGVkJykpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY29udGFpbmVyICYmIGNvbnRhaW5lci5pZCA9PT0gJ21haW4nKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IHRlbXBsYXRlLnF1ZXJ5U2VsZWN0b3IoJy5kZWxldGVkLWhlYWRlcicpO1xuICAgICAgICBpZiAoaGVhZGVyKSBoZWFkZXIucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgICB0ZW1wbGF0ZS5jbGFzc0xpc3QucmVtb3ZlKCdkZWxldGVkJyk7XG4gICAgfVxuICB9O1xuICBpbmRpdmlkdWFsLm9uKCd2LXM6ZGVsZXRlZCcsIGRlbGV0ZWRIYW5kbGVyKTtcbiAgdGVtcGxhdGUuYWRkRXZlbnRMaXN0ZW5lcigncmVtb3ZlJywgKCkgPT4gaW5kaXZpZHVhbC5vZmYoJ3YtczpkZWxldGVkJywgZGVsZXRlZEhhbmRsZXIpKTtcbiAgZGVsZXRlZEhhbmRsZXIuY2FsbChpbmRpdmlkdWFsKTtcblxuICAvKipcbiAgICogSW5kaXZpZHVhbCB2LXM6dmFsaWQgaGFuZGxlci4gU2hvd3MgYWxlcnQgd2hlbiBpbmRpdmlkdWFsIGlzIGludmFsaWQgLlxuICAgKiBAdGhpcyBJbmRpdmlkdWFsXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICBjb25zdCB2YWxpZEhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCB0aGlzLmhhc1ZhbHVlKCd2LXM6dmFsaWQnLCBmYWxzZSkgKSB7XG4gICAgICBjb25zdCBpc0FsZXJ0VmlzaWJsZSA9IChcbiAgICAgICAgY29udGFpbmVyICYmIGNvbnRhaW5lci5pZCA9PT0gJ21haW4nIHx8XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoJ21vZGFsLWJvZHknKSB8fFxuICAgICAgICB0ZW1wbGF0ZS5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbnRhaW5lcicpIHx8XG4gICAgICAgIHRlbXBsYXRlLmNoaWxkcmVuLmxlbmd0aCAmJiB0ZW1wbGF0ZS5jaGlsZHJlblswXS5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbnRhaW5lcicpXG4gICAgICApO1xuICAgICAgaWYgKG1vZGUgPT09ICd2aWV3JyAmJiAhaXNBbGVydFZpc2libGUpIHtcbiAgICAgICAgdGVtcGxhdGUuY2xhc3NMaXN0LmFkZCgnaW52YWxpZCcpO1xuICAgICAgICBjb25zdCBtc2cgPSBuZXcgSW5kaXZpZHVhbE1vZGVsKCd2LXM6SW52YWxpZEFsZXJ0Jyk7XG4gICAgICAgIG1zZy5sb2FkKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgdGVtcGxhdGUudGl0bGUgPSBtc2dbJ3JkZnM6bGFiZWwnXS5tYXAoQ29tbW9uVXRpbC5mb3JtYXRWYWx1ZSkuam9pbignICcpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChpc0FsZXJ0VmlzaWJsZSkge1xuICAgICAgICBjb25zdCBtc2cgPSBuZXcgSW5kaXZpZHVhbE1vZGVsKCd2LXM6SW52YWxpZEFsZXJ0Jyk7XG4gICAgICAgIG1zZy5sb2FkKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgY29uc3QgbXNnU3RyID0gbXNnWydyZGZzOmxhYmVsJ10ubWFwKENvbW1vblV0aWwuZm9ybWF0VmFsdWUpLmpvaW4oJyAnKTtcbiAgICAgICAgICBub3RpZnkoJ3dhcm5pbmcnLCB7bmFtZTogbXNnU3RyfSk7XG4gICAgICAgICAgY29uc3QgaW52YWxpZEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g0Jyk7XG4gICAgICAgICAgaW52YWxpZEhlYWRlci5jbGFzc0xpc3QuYWRkKCdpbnZhbGlkLWhlYWRlcicpO1xuICAgICAgICAgIGludmFsaWRIZWFkZXIudGV4dENvbnRlbnQgPSBtc2dTdHI7XG4gICAgICAgICAgaW52YWxpZEhlYWRlci5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgICB0ZW1wbGF0ZS5wcmVwZW5kKGludmFsaWRIZWFkZXIpO1xuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IGNvbnNvbGUuZXJyb3IoJ01zZyBsb2FkIGZhaWxlZCcpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGNvbnRhaW5lciAmJiBjb250YWluZXIuaWQgPT09ICdtYWluJykge1xuICAgICAgICBjb25zdCBoZWFkZXIgPSB0ZW1wbGF0ZS5xdWVyeVNlbGVjdG9yKCcuaW52YWxpZC1oZWFkZXInKTtcbiAgICAgICAgaWYgKGhlYWRlcikgaGVhZGVyLnJlbW92ZSgpO1xuICAgICAgfVxuICAgICAgdGVtcGxhdGUuY2xhc3NMaXN0LnJlbW92ZSgnaW52YWxpZCcpO1xuICAgIH1cbiAgfTtcbiAgaW5kaXZpZHVhbC5vbigndi1zOnZhbGlkJywgdmFsaWRIYW5kbGVyKTtcbiAgdGVtcGxhdGUuYWRkRXZlbnRMaXN0ZW5lcigncmVtb3ZlJywgKCkgPT4gaW5kaXZpZHVhbC5vZmYoJ3Ytczp2YWxpZCcsIHZhbGlkSGFuZGxlcikpO1xuICB2YWxpZEhhbmRsZXIuY2FsbChpbmRpdmlkdWFsKTtcblxuICAvLyBQcm9jZXNzIFJERmEgY29tcGxpYW50IHRlbXBsYXRlXG5cbiAgLy8gU3BlY2lhbCAobm90IFJERmEpXG4gIHdyYXBwZXIucXVlcnlTZWxlY3RvckFsbCgnW2hyZWYqPVxcJ0BcXCddOm5vdChbcmVsXSAqKTpub3QoW2Fib3V0XSAqKScpLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICBjb25zdCBocmVmID0gbm9kZS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICBub2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYucmVwbGFjZSgnQCcsIGluZGl2aWR1YWwuaWQpKTtcbiAgfSk7XG5cbiAgd3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKCdbc3JjKj1cXCdAXFwnXTpub3QoW3JlbF0gKik6bm90KFthYm91dF0gKiknKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgY29uc3Qgc3JjID0gbm9kZS5nZXRBdHRyaWJ1dGUoJ3NyYycpO1xuICAgIG5vZGUuc2V0QXR0cmlidXRlKCdzcmMnLCBzcmMucmVwbGFjZSgnQCcsIGluZGl2aWR1YWwuaWQpKTtcbiAgfSk7XG5cbiAgd3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKCdbc3R5bGUqPVxcJ0BcXCddOm5vdChbcmVsXSAqKTpub3QoW2Fib3V0XSAqKScpLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICBjb25zdCBzdHlsZSA9IG5vZGUuZ2V0QXR0cmlidXRlKCdzdHlsZScpO1xuICAgIG5vZGUuc2V0QXR0cmlidXRlKCdzdHlsZScsIHN0eWxlLnJlcGxhY2UoJ0AnLCBpbmRpdmlkdWFsLmlkKSk7XG4gIH0pO1xuXG4gIHdyYXBwZXIucXVlcnlTZWxlY3RvckFsbCgnW3ZhbHVlKj1cXCdAXFwnXTpub3QoW3JlbF0gKik6bm90KFthYm91dF0gKiknKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSBub2RlLmdldEF0dHJpYnV0ZSgndmFsdWUnKTtcbiAgICBub2RlLnNldEF0dHJpYnV0ZSgndmFsdWUnLCB2YWx1ZS5yZXBsYWNlKCdAJywgaW5kaXZpZHVhbC5pZCkpO1xuICB9KTtcblxuICB3cmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tpZCo9XFwnQFxcJ106bm90KFtyZWxdICopOm5vdChbYWJvdXRdICopJykuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgIGNvbnN0IGlkID0gbm9kZS5nZXRBdHRyaWJ1dGUoJ2lkJyk7XG4gICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ2lkJywgc3R5bGUucmVwbGFjZSgnQCcsIGluZGl2aWR1YWwuaWQpKTtcbiAgfSk7XG5cbiAgd3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKCdbdGl0bGVdOm5vdChbcmVsXSAqKTpub3QoW2Fib3V0XSAqKScpLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICBjb25zdCB0aXRsZSA9IG5vZGUuZ2V0QXR0cmlidXRlKCd0aXRsZScpO1xuICAgIGlmICgoL15bYS16XVthLXotMC05XSo6KFthLXpBLVowLTktX10pKiQvKS50ZXN0KHRpdGxlKSApIHtcbiAgICAgIGNvbnN0IHRpdGxlSW5kaXZpZHVhbCA9IG5ldyBJbmRpdmlkdWFsTW9kZWwodGl0bGUpO1xuICAgICAgdGl0bGVJbmRpdmlkdWFsLmxvYWQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGl0bGVJbmRpdmlkdWFsLnRvU3RyaW5nKCkpO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcblxuICAvLyBQcm9wZXJ0eSB2YWx1ZXNcbiAgY29uc3QgcHJvcHMgPSBBcnJheS5mcm9tKHdyYXBwZXIucXVlcnlTZWxlY3RvckFsbCgnW3Byb3BlcnR5XTpub3QodmVkYS1jb250cm9sKTpub3QoW3JlbF0gKik6bm90KFthYm91dF0gKiknKSkubWFwKChwcm9wZXJ0eUNvbnRhaW5lcikgPT4ge1xuICAgIGNvbnN0IHByb3BlcnR5X3VyaSA9IHByb3BlcnR5Q29udGFpbmVyLmdldEF0dHJpYnV0ZSgncHJvcGVydHknKTtcbiAgICBjb25zdCBhYm91dF91cmkgPSBwcm9wZXJ0eUNvbnRhaW5lci5nZXRBdHRyaWJ1dGUoJ2Fib3V0Jyk7XG4gICAgbGV0IGFib3V0O1xuICAgIGxldCBpc0Fib3V0O1xuXG4gICAgaWYgKGFib3V0X3VyaSA9PT0gJ0AnKSB7XG4gICAgICBhYm91dCA9IGluZGl2aWR1YWw7XG4gICAgICBpc0Fib3V0ID0gdHJ1ZTtcbiAgICAgIHByb3BlcnR5Q29udGFpbmVyLnNldEF0dHJpYnV0ZSgnYWJvdXQnLCBhYm91dC5pZCk7XG4gICAgfSBlbHNlIGlmICghYWJvdXRfdXJpKSB7XG4gICAgICBhYm91dCA9IGluZGl2aWR1YWw7XG4gICAgICBpc0Fib3V0ID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFib3V0ID0gbmV3IEluZGl2aWR1YWxNb2RlbChhYm91dF91cmkpO1xuICAgICAgaXNBYm91dCA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFib3V0LmxvYWQoKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBjb25zdCBpZE1vZGlmaWVkSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBwcm9wZXJ0eUNvbnRhaW5lci50ZXh0Q29udGVudCA9IGFib3V0LmlkO1xuICAgICAgICB9O1xuICAgICAgICBpZiAocHJvcGVydHlfdXJpID09PSAnQCcpIHtcbiAgICAgICAgICBwcm9wZXJ0eUNvbnRhaW5lci50ZXh0Q29udGVudCA9IGFib3V0LmlkO1xuICAgICAgICAgIGFib3V0Lm9uKCdpZENoYW5nZWQnLCBpZE1vZGlmaWVkSGFuZGxlcik7XG4gICAgICAgICAgdGVtcGxhdGUuYWRkRXZlbnRMaXN0ZW5lcigncmVtb3ZlJywgKCkgPT4gYWJvdXQub2ZmKCdpZENoYW5nZWQnLCBpZE1vZGlmaWVkSGFuZGxlcikpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlLXJlbmRlciBhbGwgcHJvcGVydHkgdmFsdWVzIGlmIG1vZGVsJ3MgcHJvcGVydHkgd2FzIGNoYW5nZWRcbiAgICAgICAgY29uc3QgcHJvcGVydHlNb2RpZmllZEhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmVuZGVyUHJvcGVydHlWYWx1ZXMoYWJvdXQsIGlzQWJvdXQsIHByb3BlcnR5X3VyaSwgcHJvcGVydHlDb250YWluZXIsIHRlbXBsYXRlLCBtb2RlKTtcbiAgICAgICAgfTtcbiAgICAgICAgYWJvdXQub24ocHJvcGVydHlfdXJpLCBwcm9wZXJ0eU1vZGlmaWVkSGFuZGxlcik7XG4gICAgICAgIHRlbXBsYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ3JlbW92ZScsICgpID0+IGFib3V0Lm9mZihwcm9wZXJ0eV91cmksIHByb3BlcnR5TW9kaWZpZWRIYW5kbGVyKSk7XG5cbiAgICAgICAgcmVuZGVyUHJvcGVydHlWYWx1ZXMoYWJvdXQsIGlzQWJvdXQsIHByb3BlcnR5X3VyaSwgcHJvcGVydHlDb250YWluZXIsIHRlbXBsYXRlLCBtb2RlKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiBlcnJvclByaW50ZXIuY2FsbChhYm91dCwgZXJyb3IsIHByb3BlcnR5Q29udGFpbmVyKSk7XG4gIH0pO1xuXG4gIC8vIFJlbGF0ZWQgcmVzb3VyY2VzICYgYWJvdXQgcmVzb3VyY2VzXG4gIGNvbnN0IHJlbHMgPSBBcnJheS5mcm9tKHdyYXBwZXIucXVlcnlTZWxlY3RvckFsbCgnW3JlbF06bm90KHZlZGEtY29udHJvbCk6bm90KFtyZWxdICopOm5vdChbYWJvdXRdICopJykpLm1hcCgocmVsQ29udGFpbmVyKSA9PiB7XG4gICAgbGV0IGFib3V0ID0gcmVsQ29udGFpbmVyLmdldEF0dHJpYnV0ZSgnYWJvdXQnKTtcbiAgICBjb25zdCByZWxfdXJpID0gcmVsQ29udGFpbmVyLmdldEF0dHJpYnV0ZSgncmVsJyk7XG4gICAgY29uc3QgaXNFbWJlZGRlZCA9IHJlbENvbnRhaW5lci5nZXRBdHRyaWJ1dGUoJ2RhdGEtZW1iZWRkZWQnKSA9PT0gJ3RydWUnO1xuICAgIGNvbnN0IHNwZWMgPSBzcGVjc1tyZWxfdXJpXSA/IG5ldyBJbmRpdmlkdWFsTW9kZWwoIHNwZWNzW3JlbF91cmldICkgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgcmVsX2lubGluZV90ZW1wbGF0ZSA9IHJlbENvbnRhaW5lci5pbm5lckhUTUwudHJpbSgpO1xuICAgIGNvbnN0IHJlbF90ZW1wbGF0ZV91cmkgPSByZWxDb250YWluZXIuZ2V0QXR0cmlidXRlKCdkYXRhLXRlbXBsYXRlJyk7XG4gICAgbGV0IGxpbWl0ID0gcmVsQ29udGFpbmVyLmdldEF0dHJpYnV0ZSgnZGF0YS1saW1pdCcpID09IG51bGwgPyBJbmZpbml0eSA6IHBhcnNlSW50KHJlbENvbnRhaW5lci5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGltaXQnKSk7XG4gICAgY29uc3QgbW9yZSA9IHJlbENvbnRhaW5lci5nZXRBdHRyaWJ1dGUoJ2RhdGEtbW9yZScpIHx8IGZhbHNlO1xuICAgIGxldCByZWxUZW1wbGF0ZTtcbiAgICBsZXQgaXNBYm91dDtcblxuICAgIGlmIChhYm91dCkge1xuICAgICAgaXNBYm91dCA9IHRydWU7XG4gICAgICBhYm91dCA9IChhYm91dCA9PT0gJ0AnID8gaW5kaXZpZHVhbCA6IG5ldyBJbmRpdmlkdWFsTW9kZWwoYWJvdXQpKTtcbiAgICAgIHJlbENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2Fib3V0JywgYWJvdXQuaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpc0Fib3V0ID0gZmFsc2U7XG4gICAgICBhYm91dCA9IGluZGl2aWR1YWw7XG4gICAgfVxuXG4gICAgaWYgKCByZWxfdGVtcGxhdGVfdXJpICkge1xuICAgICAgcmVsVGVtcGxhdGUgPSByZWxfdGVtcGxhdGVfdXJpO1xuICAgIH0gZWxzZSBpZiAoIHJlbF9pbmxpbmVfdGVtcGxhdGUubGVuZ3RoICkge1xuICAgICAgcmVsVGVtcGxhdGUgPSByZWxfaW5saW5lX3RlbXBsYXRlO1xuICAgIH1cbiAgICByZWxDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG5cbiAgICB0ZW1wbGF0ZS5hZGRFdmVudExpc3RlbmVyKCdlZGl0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGNvbnN0IHByb3BlcnR5ID0gbmV3IEluZGl2aWR1YWxNb2RlbChyZWxfdXJpKTtcbiAgICAgIGlmICggaXNFbWJlZGRlZCAmJlxuICAgICAgICAgIHNwZWMgJiZcbiAgICAgICAgICBzcGVjWyd2LXVpOm1pbkNhcmRpbmFsaXR5J11bMF0gPj0gMSAmJlxuICAgICAgICAgICFpbmRpdmlkdWFsLmhhc1ZhbHVlKHJlbF91cmkpICYmXG4gICAgICAgICAgIShwcm9wZXJ0eS5oYXNWYWx1ZSgncmRmczpyYW5nZScpICYmIHByb3BlcnR5WydyZGZzOnJhbmdlJ11bMF0uaWQgPT09ICd2LXM6RmlsZScpXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgdmFsdWVUeXBlID0gc3BlYyAmJiBzcGVjLmhhc1ZhbHVlKCd2LXVpOnJhbmdlUmVzdHJpY3Rpb24nKSAmJiBzcGVjWyd2LXVpOnJhbmdlUmVzdHJpY3Rpb24nXSB8fFxuICAgICAgICAgIHByb3BlcnR5Lmhhc1ZhbHVlKCdyZGZzOnJhbmdlJykgJiYgcHJvcGVydHlbJ3JkZnM6cmFuZ2UnXSB8fCBbXTtcbiAgICAgICAgY29uc3QgZW1wdHlWYWx1ZSA9IG5ldyBJbmRpdmlkdWFsTW9kZWwoKTtcbiAgICAgICAgaWYgKCB2YWx1ZVR5cGUubGVuZ3RoICkge1xuICAgICAgICAgIGVtcHR5VmFsdWVbJ3JkZjp0eXBlJ10gPSB2YWx1ZVR5cGU7XG4gICAgICAgIH1cbiAgICAgICAgaW5kaXZpZHVhbC5zZXQocmVsX3VyaSwgW2VtcHR5VmFsdWVdKTtcbiAgICAgIH1cbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gYWJvdXQubG9hZCgpLnRoZW4oKCkgPT4ge1xuICAgICAgbGV0IHByZXZfcmVuZGVyZWQgPSB7fTtcbiAgICAgIGxldCBjdXJyX3JlbmRlcmVkID0ge307XG4gICAgICBsZXQgc29ydF9yZXF1aXJlZCA9IGZhbHNlO1xuICAgICAgbGV0IHJldmVyc2VTb3J0ID0gZmFsc2U7XG5cbiAgICAgIGNvbnN0IHByb3BlcnR5TW9kaWZpZWRIYW5kbGVyID0gZnVuY3Rpb24gKHByb3BlcnR5VmFsdWVzLCBsaW1pdF9wYXJhbSkge1xuICAgICAgICBjdXJyX3JlbmRlcmVkID0ge307XG4gICAgICAgIGxpbWl0ID0gbGltaXRfcGFyYW0gfHwgbGltaXQ7XG4gICAgICAgIGlmIChyZXZlcnNlU29ydCkgcHJvcGVydHlWYWx1ZXMucmV2ZXJzZSgpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoXG4gICAgICAgICAgcHJvcGVydHlWYWx1ZXMubWFwKCh2YWx1ZSwgaSkgPT4ge1xuICAgICAgICAgICAgaWYgKGkgPj0gbGltaXQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhbHVlLmlkIGluIHByZXZfcmVuZGVyZWQpIHtcbiAgICAgICAgICAgICAgY3Vycl9yZW5kZXJlZFt2YWx1ZS5pZF0gPSBwcmV2X3JlbmRlcmVkW3ZhbHVlLmlkXTtcbiAgICAgICAgICAgICAgaWYgKGN1cnJfcmVuZGVyZWRbdmFsdWUuaWRdICE9PSBpKSB7XG4gICAgICAgICAgICAgICAgY3Vycl9yZW5kZXJlZFt2YWx1ZS5pZF0gPSBpO1xuICAgICAgICAgICAgICAgIHNvcnRfcmVxdWlyZWQgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGRlbGV0ZSBwcmV2X3JlbmRlcmVkW3ZhbHVlLmlkXTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlbmRlclJlbGF0aW9uVmFsdWUoe2Fib3V0LCBpc0Fib3V0LCByZWxfdXJpLCB2YWx1ZSwgcmVsQ29udGFpbmVyLCByZWxUZW1wbGF0ZSwgdGVtcGxhdGUsIG1vZGUsIGVtYmVkZGVkLCBpc0VtYmVkZGVkLCB0b0FwcGVuZDogZmFsc2V9KVxuICAgICAgICAgICAgICAudGhlbigocmVuZGVyZWRUZW1wbGF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGN1cnJfcmVuZGVyZWRbdmFsdWUuaWRdID0gaTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVuZGVyZWRUZW1wbGF0ZTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSkuZmlsdGVyKEJvb2xlYW4pLFxuICAgICAgICApLnRoZW4oKG5vZGVzKSA9PiB7XG4gICAgICAgICAgcmVsQ29udGFpbmVyLmFwcGVuZCguLi5ub2Rlcy5mbGF0KCkpO1xuICAgICAgICAgIGNvbnN0IHByZXZfdXJpcyA9IE9iamVjdC5rZXlzKHByZXZfcmVuZGVyZWQpO1xuICAgICAgICAgIGlmIChwcmV2X3VyaXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RvciA9IHByZXZfdXJpcy5tYXAoKHVyaSkgPT4gYFtyZXNvdXJjZT1cIiR7QnJvd3NlclV0aWwuZXNjYXBlNCQodXJpKX1cIl1gKS5qb2luKCcsJyk7XG4gICAgICAgICAgICByZWxDb250YWluZXIucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IGVtYmVkZGVkLmluZGV4T2Yobm9kZSk7XG4gICAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSBlbWJlZGRlZC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICBub2RlLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzb3J0X3JlcXVpcmVkKSB7XG4gICAgICAgICAgICBjb25zdCBsaXN0ID0gQXJyYXkuZnJvbShyZWxDb250YWluZXIuY2hpbGRyZW4pLm1hcCgobm9kZSkgPT4gcmVsQ29udGFpbmVyLnJlbW92ZUNoaWxkKG5vZGUpKTtcbiAgICAgICAgICAgIGxpc3Quc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gY3Vycl9yZW5kZXJlZFthLmdldEF0dHJpYnV0ZSgncmVzb3VyY2UnKV0gLSBjdXJyX3JlbmRlcmVkW2IuZ2V0QXR0cmlidXRlKCdyZXNvdXJjZScpXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVsQ29udGFpbmVyLmFwcGVuZCguLi5saXN0KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGxpbWl0IDwgcHJvcGVydHlWYWx1ZXMubGVuZ3RoICYmIG1vcmUpIHtcbiAgICAgICAgICAgIGNvbnN0IGJhZGdlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBiYWRnZUNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgICAgICAgbGV0IG1vcmVCdXR0b24gPSByZWxDb250YWluZXIucXVlcnlTZWxlY3RvcignYS5tb3JlJyk7XG4gICAgICAgICAgICBpZiAoIW1vcmVCdXR0b24pIHtcbiAgICAgICAgICAgICAgbW9yZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgICAgICAgbW9yZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdtb3JlJywgJ2JhZGdlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtb3JlQnV0dG9uLnRleHRDb250ZW50ID0gYOKGkyAke3Byb3BlcnR5VmFsdWVzLmxlbmd0aCAtIGxpbWl0fWA7XG4gICAgICAgICAgICBtb3JlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgY29uc3QgY291bnREaXNwbGF5ZWQgPSByZWxDb250YWluZXIuY2hpbGRyZW4ubGVuZ3RoIC0gMTsgLy8gMSBsYXN0IGNoaWxkcmVuIGlzIC5iYWRnZSBjb250YWluZXJcbiAgICAgICAgICAgICAgYWJvdXQudHJpZ2dlcihyZWxfdXJpLCBhYm91dC5nZXQocmVsX3VyaSksIGNvdW50RGlzcGxheWVkICsgMTApO1xuICAgICAgICAgICAgICBlLnRhcmdldC5yZW1vdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYmFkZ2VDb250YWluZXIuYXBwZW5kKG1vcmVCdXR0b24pO1xuXG4gICAgICAgICAgICBsZXQgcmV2ZXJzZUJ1dHRvbiA9IHJlbENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdhLnJldmVyc2UnKTtcbiAgICAgICAgICAgIGlmICghcmV2ZXJzZUJ1dHRvbikge1xuICAgICAgICAgICAgICByZXZlcnNlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICAgICAgICByZXZlcnNlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3JldmVyc2UnLCAnYmFkZ2UnLCAnbWFyZ2luLXNtLWgnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldmVyc2VCdXR0b24udGV4dENvbnRlbnQgPSAn4oaTIOKGkSc7XG4gICAgICAgICAgICByZXZlcnNlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgcHJldl9yZW5kZXJlZCA9IHt9O1xuICAgICAgICAgICAgICByZXZlcnNlU29ydCA9ICFyZXZlcnNlU29ydDtcbiAgICAgICAgICAgICAgY29uc3QgY291bnREaXNwbGF5ZWQgPSByZWxDb250YWluZXIuY2hpbGRyZW4ubGVuZ3RoIC0gMTsgLy8gMSBsYXN0IGNoaWxkcmVuIGlzIC5iYWRnZSBjb250YWluZXJcbiAgICAgICAgICAgICAgQXJyYXkuZnJvbShyZWxDb250YWluZXIuY2hpbGRyZW4pLm1hcCgobm9kZSkgPT4gcmVsQ29udGFpbmVyLnJlbW92ZUNoaWxkKG5vZGUpKTtcbiAgICAgICAgICAgICAgYWJvdXQudHJpZ2dlcihyZWxfdXJpLCBhYm91dC5nZXQocmVsX3VyaSksIGNvdW50RGlzcGxheWVkKTtcbiAgICAgICAgICAgICAgZS50YXJnZXQucmVtb3ZlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGJhZGdlQ29udGFpbmVyLmFwcGVuZChyZXZlcnNlQnV0dG9uKTtcblxuICAgICAgICAgICAgcmVsQ29udGFpbmVyLmFwcGVuZChiYWRnZUNvbnRhaW5lcik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHByZXZfcmVuZGVyZWQgPSB7Li4uY3Vycl9yZW5kZXJlZH07XG4gICAgICAgICAgdGVtcGxhdGUuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2ludGVybmFsLXZhbGlkYXRlJyksIHtidWJibGVzOiB0cnVlfSk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgY29uc3QgZW1iZWRkZWRIYW5kbGVyID0gZnVuY3Rpb24gKHByb3BlcnR5VmFsdWVzKSB7XG4gICAgICAgIGlmIChtb2RlID09PSAnZWRpdCcpIHtcbiAgICAgICAgICBwcm9wZXJ0eVZhbHVlcy5tYXAoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIHZhbHVlLmlkICE9PSBhYm91dC5pZCAmJiAvLyBwcmV2ZW50IHNlbGYgcGFyZW50XG4gICAgICAgICAgICAgIHJlbF91cmkgIT09ICd2LXM6cGFyZW50JyAmJiAvLyBwcmV2ZW50IGNpcmN1bGFyIHBhcmVudFxuICAgICAgICAgICAgICAhdmFsdWUuaGFzVmFsdWUoJ3YtczpwYXJlbnQnKSAvLyBkbyBub3QgY2hhbmdlIHBhcmVudFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHZhbHVlWyd2LXM6cGFyZW50J10gPSBbYWJvdXRdO1xuICAgICAgICAgICAgICB2YWx1ZVsndi1zOmJhY2t3YXJkVGFyZ2V0J10gPSBbYWJvdXRdO1xuICAgICAgICAgICAgICB2YWx1ZVsndi1zOmJhY2t3YXJkUHJvcGVydHknXSA9IFtyZWxfdXJpXTtcbiAgICAgICAgICAgICAgdmFsdWVbJ3YtczpjYW5SZWFkJ10gPSBbdHJ1ZV07XG4gICAgICAgICAgICAgIHZhbHVlWyd2LXM6Y2FuVXBkYXRlJ10gPSBbdHJ1ZV07XG4gICAgICAgICAgICAgIHZhbHVlWyd2LXM6Y2FuRGVsZXRlJ10gPSBbdHJ1ZV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHZhbHVlcyA9IGFib3V0LmdldChyZWxfdXJpKTtcblxuICAgICAgaWYgKGlzRW1iZWRkZWQpIHtcbiAgICAgICAgZW1iZWRkZWRIYW5kbGVyKHZhbHVlcyk7XG4gICAgICAgIGFib3V0Lm9uKHJlbF91cmksIGVtYmVkZGVkSGFuZGxlcik7XG4gICAgICAgIHRlbXBsYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ3JlbW92ZScsICgpID0+IGFib3V0Lm9mZihyZWxfdXJpLCBlbWJlZGRlZEhhbmRsZXIpKTtcbiAgICAgIH1cblxuICAgICAgYWJvdXQub24ocmVsX3VyaSwgcHJvcGVydHlNb2RpZmllZEhhbmRsZXIpO1xuICAgICAgdGVtcGxhdGUuYWRkRXZlbnRMaXN0ZW5lcigncmVtb3ZlJywgKCkgPT4gYWJvdXQub2ZmKHJlbF91cmksIHByb3BlcnR5TW9kaWZpZWRIYW5kbGVyKSk7XG5cbiAgICAgIHJldHVybiBwcm9wZXJ0eU1vZGlmaWVkSGFuZGxlcih2YWx1ZXMsIGxpbWl0KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gQWJvdXQgcmVzb3VyY2VcbiAgY29uc3QgYWJvdXRzID0gQXJyYXkuZnJvbSh3cmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1thYm91dF06bm90KFtyZWxdICopOm5vdChbYWJvdXRdICopOm5vdChbcmVsXSk6bm90KFtwcm9wZXJ0eV0pJykpLm1hcCgoYWJvdXRDb250YWluZXIpID0+IHtcbiAgICBjb25zdCBhYm91dF90ZW1wbGF0ZV91cmkgPSBhYm91dENvbnRhaW5lci5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGVtcGxhdGUnKTtcbiAgICBjb25zdCBhYm91dF9pbmxpbmVfdGVtcGxhdGUgPSBhYm91dENvbnRhaW5lci5pbm5lckhUTUwudHJpbSgpO1xuICAgIGNvbnN0IGlzRW1iZWRkZWQgPSBhYm91dENvbnRhaW5lci5nZXRBdHRyaWJ1dGUoJ2RhdGEtZW1iZWRkZWQnKSA9PT0gJ3RydWUnO1xuICAgIGxldCBhYm91dDtcbiAgICBsZXQgYWJvdXRUZW1wbGF0ZTtcbiAgICBpZiAoIGFib3V0X3RlbXBsYXRlX3VyaSApIHtcbiAgICAgIGFib3V0VGVtcGxhdGUgPSBhYm91dF90ZW1wbGF0ZV91cmk7XG4gICAgfSBlbHNlIGlmICggYWJvdXRfaW5saW5lX3RlbXBsYXRlLmxlbmd0aCApIHtcbiAgICAgIGFib3V0VGVtcGxhdGUgPSBhYm91dF9pbmxpbmVfdGVtcGxhdGU7XG4gICAgfVxuICAgIGFib3V0Q29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgIGlmIChhYm91dENvbnRhaW5lci5nZXRBdHRyaWJ1dGUoJ2Fib3V0JykgPT09ICdAJykge1xuICAgICAgYWJvdXQgPSBpbmRpdmlkdWFsO1xuICAgICAgYWJvdXRDb250YWluZXIuc2V0QXR0cmlidXRlKCdhYm91dCcsIGFib3V0LmlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWJvdXQgPSBuZXcgSW5kaXZpZHVhbE1vZGVsKGFib3V0Q29udGFpbmVyLmdldEF0dHJpYnV0ZSgnYWJvdXQnKSk7XG4gICAgfVxuICAgIHJldHVybiBhYm91dC5wcmVzZW50KGFib3V0Q29udGFpbmVyLCBhYm91dFRlbXBsYXRlLCBpc0VtYmVkZGVkID8gbW9kZSA6IHVuZGVmaW5lZCkudGhlbigocmVuZGVyZWQpID0+IHtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShyZW5kZXJlZCkpIHtcbiAgICAgICAgcmVuZGVyZWQgPSBbcmVuZGVyZWRdO1xuICAgICAgfVxuICAgICAgaWYgKGlzRW1iZWRkZWQpIHtcbiAgICAgICAgZW1iZWRkZWQucHVzaCguLi5yZW5kZXJlZCk7XG4gICAgICAgIHJlbmRlcmVkLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZSgnZGF0YS1lbWJlZGRlZCcsICd0cnVlJyk7XG4gICAgICAgICAgaWYgKG1vZGUgPT09ICdlZGl0Jykge1xuICAgICAgICAgICAgbm9kZS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnaW50ZXJuYWwtdmFsaWRhdGUnKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gVmFsaWRhdGlvbiB3aXRoIHN1cHBvcnQgb2YgZW1iZWRkZWQgdGVtcGxhdGVzIChhcmJpdHJhcnkgZGVwdGgpXG5cbiAgLy8gSW5pdGlhbCB2YWxpZGF0aW9uIHN0YXRlXG4gIGNvbnN0IHZhbGlkYXRpb24gPSB7c3RhdGU6IHRydWV9O1xuICB0ZW1wbGF0ZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsaWQnLCB2YWxpZGF0aW9uLnN0YXRlKTtcblxuICAvKipcbiAgKiBWYWxpZGF0ZSB0ZW1wbGF0ZSBoYW5kbGVyXG4gICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBjdXN0b20gJ2ludGVybmFsLXZhbGlkYXRlJyBldmVudFxuICAqIEByZXR1cm4ge3ZvaWR9XG4gICovXG4gIGNvbnN0IHZhbGlkYXRlVGVtcGxhdGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBFdmVudCkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICAgIGlmIChtb2RlICE9PSAnZWRpdCcpIHJldHVybjtcblxuICAgIE9iamVjdC5rZXlzKHZhbGlkYXRpb24pLmZvckVhY2goKHByb3BlcnR5X3VyaSkgPT4ge1xuICAgICAgaWYgKHByb3BlcnR5X3VyaSA9PT0gJ3N0YXRlJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBzcGVjID0gc3BlY3NbcHJvcGVydHlfdXJpXSA/IG5ldyBJbmRpdmlkdWFsTW9kZWwoIHNwZWNzW3Byb3BlcnR5X3VyaV0gKSA6IHVuZGVmaW5lZDtcbiAgICAgIHZhbGlkYXRpb25bcHJvcGVydHlfdXJpXSA9IHZhbGlkYXRlKGluZGl2aWR1YWwsIHByb3BlcnR5X3VyaSwgc3BlYyk7XG4gICAgfSk7XG4gICAgdGVtcGxhdGUuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3ZhbGlkYXRlJykpO1xuICAgIHZhbGlkYXRpb24uc3RhdGUgPSBPYmplY3Qua2V5cyh2YWxpZGF0aW9uKS5yZWR1Y2UoKGFjYywgcHJvcGVydHlfdXJpKSA9PiB7XG4gICAgICBpZiAocHJvcGVydHlfdXJpID09PSAnc3RhdGUnKSB7XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjICYmIHZhbGlkYXRpb25bcHJvcGVydHlfdXJpXS5zdGF0ZTtcbiAgICB9LCB0cnVlKTtcbiAgICB2YWxpZGF0aW9uLmVtYmVkZGVkU3RhdGUgPSBlbWJlZGRlZC5yZWR1Y2UoKGFjYywgZW1iZWRkZWRUZW1wbGF0ZSkgPT4ge1xuICAgICAgY29uc3QgZW1iZWRkZWRWYWxpZGF0aW9uID0gZW1iZWRkZWRUZW1wbGF0ZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsaWQnKSA9PT0gJ3RydWUnO1xuICAgICAgcmV0dXJuIGFjYyAmJiBlbWJlZGRlZFZhbGlkYXRpb247XG4gICAgfSwgdHJ1ZSk7XG4gICAgdmFsaWRhdGlvbi5zdGF0ZSA9IHZhbGlkYXRpb24uc3RhdGUgJiYgdmFsaWRhdGlvbi5lbWJlZGRlZFN0YXRlO1xuICAgIHRlbXBsYXRlLnNldEF0dHJpYnV0ZSgnZGF0YS12YWxpZCcsIHZhbGlkYXRpb24uc3RhdGUpO1xuICAgIHRlbXBsYXRlLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdpbnRlcm5hbC12YWxpZGF0ZWQnLCB7ZGV0YWlsOiB2YWxpZGF0aW9ufSkpO1xuXG4gICAgLy8gJ2ludGVybmFsLXZhbGlkYXRlJyBldmVudCBzaG91bGQgYnViYmxlIGFuZCB0cmlnZ2VyIHBhcmVudCB0ZW1wbGF0ZSB2YWxpZGF0aW9uIGlmIGN1cnJlbnQgdGVtcGxhdGUgaXMgZW1iZWRkZWRcbiAgICBpZiAoIGNvbnRhaW5lci5nZXRBdHRyaWJ1dGUoJ2RhdGEtZW1iZWRkZWQnKSA9PT0gJ3RydWUnICkge1xuICAgICAgY29udGFpbmVyLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdpbnRlcm5hbC12YWxpZGF0ZScsIHtidWJibGVzOiB0cnVlfSkpO1xuICAgIH1cbiAgfTtcbiAgaW5kaXZpZHVhbC5vbigncHJvcGVydHlNb2RpZmllZCcsIHZhbGlkYXRlVGVtcGxhdGUpO1xuICB0ZW1wbGF0ZS5hZGRFdmVudExpc3RlbmVyKCdyZW1vdmUnLCAoKSA9PiBpbmRpdmlkdWFsLm9mZigncHJvcGVydHlNb2RpZmllZCcsIHZhbGlkYXRlVGVtcGxhdGUpKTtcbiAgdGVtcGxhdGUuYWRkRXZlbnRMaXN0ZW5lcignaW50ZXJuYWwtdmFsaWRhdGUnLCB2YWxpZGF0ZVRlbXBsYXRlKTtcbiAgdGVtcGxhdGUuYWRkRXZlbnRMaXN0ZW5lcignZWRpdCcsIHZhbGlkYXRlVGVtcGxhdGUpO1xuXG4gIC8qKlxuICAqIE1lcmdlIHZhbGlkYXRpb24gcmVzdWx0IGZyb20gY3VzdG9tIHRlbXBsYXRlIHZhbGlkYXRpb25cbiAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIGN1c3RvbSAndmFsaWRhdGVkJyBldmVudFxuICAqIEBwYXJhbSB7T2JqZWN0fSB2YWxpZGF0aW9uUmVzdWx0IC0gdmFsaWRhdGlvbiByZXN1bHQgb2JqZWN0XG4gICogQHJldHVybiB7dm9pZH1cbiAgKi9cbiAgY29uc3QgbWVyZ2VWYWxpZGF0aW9uUmVzdWx0ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgY29uc3QgdmFsaWRhdGlvblJlc3VsdCA9IGV2ZW50LmRldGFpbDtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAobW9kZSA9PT0gJ2VkaXQnKSB7XG4gICAgICBPYmplY3Qua2V5cyh2YWxpZGF0aW9uUmVzdWx0KS5mb3JFYWNoKChwcm9wZXJ0eV91cmkpID0+IHtcbiAgICAgICAgaWYgKHByb3BlcnR5X3VyaSA9PT0gJ3N0YXRlJykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YWxpZGF0aW9uW3Byb3BlcnR5X3VyaV0gPSB2YWxpZGF0aW9uUmVzdWx0W3Byb3BlcnR5X3VyaV07XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IG1lcmdlZFN0YXRlID0gT2JqZWN0LmtleXModmFsaWRhdGlvbikucmVkdWNlKChhY2MsIHByb3BlcnR5X3VyaSkgPT4ge1xuICAgICAgICBpZiAocHJvcGVydHlfdXJpID09PSAnc3RhdGUnKSB7XG4gICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcGVydHlfdXJpID09PSAnZW1iZWRkZWRTdGF0ZScpIHtcbiAgICAgICAgICByZXR1cm4gYWNjICYmIHZhbGlkYXRpb25bcHJvcGVydHlfdXJpXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjICYmIHZhbGlkYXRpb25bcHJvcGVydHlfdXJpXS5zdGF0ZTtcbiAgICAgIH0sIHRydWUpO1xuXG4gICAgICB2YWxpZGF0aW9uLnN0YXRlID0gbWVyZ2VkU3RhdGUgJiYgdmFsaWRhdGlvbi5lbWJlZGRlZFN0YXRlO1xuICAgICAgdGVtcGxhdGUuc2V0QXR0cmlidXRlKCdkYXRhLXZhbGlkJywgdmFsaWRhdGlvbi5zdGF0ZSk7XG4gICAgICB0ZW1wbGF0ZS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaW50ZXJuYWwtdmFsaWRhdGVkJywge2RldGFpbDogdmFsaWRhdGlvbn0pKTtcblxuICAgICAgLy8gJ2ludGVybmFsLXZhbGlkYXRlJyBldmVudCBzaG91bGQgYnViYmxlIGFuZCB0cmlnZ2VyIHBhcmVudCB0ZW1wbGF0ZSB2YWxpZGF0aW9uIGlmIGN1cnJlbnQgdGVtcGxhdGUgaXMgZW1iZWRkZWRcbiAgICAgIGlmICggY29udGFpbmVyLmdldEF0dHJpYnV0ZSgnZGF0YS1lbWJlZGRlZCcpID09PSAndHJ1ZScgKSB7XG4gICAgICAgIGNvbnRhaW5lci5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnaW50ZXJuYWwtdmFsaWRhdGUnLCB7YnViYmxlczogdHJ1ZX0pKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8g0LLRgNC+0LTQtSDQutCw0Log0LHQvtC70YzRiNC1INC90LUg0L3Rg9C20L3QvlxuICAgIC8vIC8vIFwidmFsaWRhdGVcIiBldmVudCBzaG91bGQgYnViYmxlIHVwIHRvIGJlIGhhbmRsZWQgYnkgcGFyZW50IHRlbXBsYXRlIG9ubHkgaWYgY3VycmVudCB0ZW1wbGF0ZSBpcyBlbWJlZGRlZFxuICAgIC8vIGlmICggdGVtcGxhdGUuZGF0YSgnaXNFbWJlZGRlZCcpICkge1xuICAgIC8vICAgY29udGFpbmVyLnRyaWdnZXIoJ3ZhbGlkYXRlZCcsIHt9KTtcbiAgICAvLyB9XG4gIH07XG5cbiAgLy8gSGFuZGxlIHZhbGlkYXRpb24gZXZlbnRzIGZyb20gdGVtcGxhdGVcbiAgdGVtcGxhdGUuYWRkRXZlbnRMaXN0ZW5lcigndmFsaWRhdGUnLCAoZSkgPT4gZS5zdG9wUHJvcGFnYXRpb24oKSk7XG4gIHRlbXBsYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ3ZhbGlkYXRlZCcsIG1lcmdlVmFsaWRhdGlvblJlc3VsdCk7XG5cbiAgLy8gQ29udHJvbHNcbiAgQXJyYXkuZnJvbSh3cmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ3ZlZGEtY29udHJvbDpub3QoW3JlbF0gKik6bm90KFthYm91dF0gKiknKSkuZm9yRWFjaCgoZWwpID0+IHtcbiAgICBjb25zdCBjb250cm9sID0gJChlbCk7XG4gICAgY29uc3QgcHJvcGVydHlfdXJpID0gY29udHJvbC5hdHRyKCdwcm9wZXJ0eScpIHx8IGNvbnRyb2wuYXR0cigncmVsJyk7XG4gICAgY29uc3QgdHlwZSA9IGNvbnRyb2wuYXR0cignZGF0YS10eXBlJykgfHwgJ2dlbmVyaWMnO1xuICAgIGNvbnN0IHNwZWMgPSBzcGVjc1twcm9wZXJ0eV91cmldID8gbmV3IEluZGl2aWR1YWxNb2RlbCggc3BlY3NbcHJvcGVydHlfdXJpXSApIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IGNvbnRyb2xUeXBlID0gJC5mblsndmVkYV8nICsgdHlwZV07XG5cbiAgICAvLyBJbml0aWFsIHZhbGlkYXRpb24gc3RhdGVcbiAgICB2YWxpZGF0aW9uW3Byb3BlcnR5X3VyaV0gPSB7c3RhdGU6IHRydWUsIGNhdXNlOiBbXX07XG5cbiAgICBjb25zdCB2YWxpZGF0ZWRIYW5kbGVyID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIGNvbnN0IHZhbGlkYXRpb25SZXN1bHQgPSBlLmRldGFpbDtcbiAgICAgIGlmICggdmFsaWRhdGlvblJlc3VsdC5zdGF0ZSB8fCAhdmFsaWRhdGlvblJlc3VsdFtwcm9wZXJ0eV91cmldIHx8IHZhbGlkYXRpb25SZXN1bHRbcHJvcGVydHlfdXJpXS5zdGF0ZSA9PT0gdHJ1ZSApIHtcbiAgICAgICAgY29udHJvbC5yZW1vdmVDbGFzcygnaGFzLWVycm9yJyk7XG4gICAgICAgIGNvbnRyb2wucG9wb3ZlcignZGVzdHJveScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29udHJvbC5hZGRDbGFzcygnaGFzLWVycm9yJyk7XG4gICAgICAgIGxldCBleHBsYW5hdGlvbjtcbiAgICAgICAgaWYgKHZhbGlkYXRpb25SZXN1bHRbcHJvcGVydHlfdXJpXS5tZXNzYWdlKSB7XG4gICAgICAgICAgZXhwbGFuYXRpb24gPSB2YWxpZGF0aW9uUmVzdWx0W3Byb3BlcnR5X3VyaV0ubWVzc2FnZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBjYXVzZXNQcm9taXNlcyA9IHZhbGlkYXRpb25SZXN1bHRbcHJvcGVydHlfdXJpXS5jYXVzZS5tYXAoKGNhdXNlX3VyaSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbmRpdmlkdWFsTW9kZWwoY2F1c2VfdXJpKS5sb2FkKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgUHJvbWlzZS5hbGwoY2F1c2VzUHJvbWlzZXMpLnRoZW4oKGNhdXNlcykgPT4ge1xuICAgICAgICAgICAgZXhwbGFuYXRpb24gPSBjYXVzZXMubWFwKChjYXVzZSkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gY2F1c2VbJ3JkZnM6Y29tbWVudCddLm1hcChDb21tb25VdGlsLmZvcm1hdFZhbHVlKS5maWx0ZXIoQm9vbGVhbikuam9pbignLCAnKTtcbiAgICAgICAgICAgIH0pLmpvaW4oJ1xcbicpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRyb2wucG9wb3Zlcih7XG4gICAgICAgICAgY29udGVudDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGV4cGxhbmF0aW9uO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgY29udGFpbmVyOiBjb250cm9sLFxuICAgICAgICAgIHRyaWdnZXI6ICdob3ZlciBmb2N1cycsXG4gICAgICAgICAgcGxhY2VtZW50OiAndG9wJyxcbiAgICAgICAgICBhbmltYXRpb246IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCAkKCdpbnB1dCcsIGNvbnRyb2wpLmlzKCc6Zm9jdXMnKSApIHtcbiAgICAgICAgICBjb250cm9sLnBvcG92ZXIoJ3Nob3cnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9O1xuICAgIHRlbXBsYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2ludGVybmFsLXZhbGlkYXRlZCcsIHZhbGlkYXRlZEhhbmRsZXIpO1xuXG4gICAgY29uc3Qgc3luY0NvbnRyb2wgPSAoZSkgPT4ge1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGNvbnRyb2wudHJpZ2dlckhhbmRsZXIoZS50eXBlKTtcbiAgICB9O1xuICAgIHRlbXBsYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ3ZpZXcnLCBzeW5jQ29udHJvbCk7XG4gICAgdGVtcGxhdGUuYWRkRXZlbnRMaXN0ZW5lcignZWRpdCcsIHN5bmNDb250cm9sKTtcbiAgICB0ZW1wbGF0ZS5hZGRFdmVudExpc3RlbmVyKCdzZWFyY2gnLCBzeW5jQ29udHJvbCk7XG5cbiAgICBjb25zdCBhc3NpZ25EZWZhdWx0VmFsdWUgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKCBzcGVjICYmIHNwZWMuaGFzVmFsdWUoJ3YtdWk6ZGVmYXVsdFZhbHVlJykgJiYgIWluZGl2aWR1YWwuaGFzVmFsdWUocHJvcGVydHlfdXJpKSApIHtcbiAgICAgICAgaW5kaXZpZHVhbC5zZXQocHJvcGVydHlfdXJpLCBzcGVjWyd2LXVpOmRlZmF1bHRWYWx1ZSddKTtcbiAgICAgIH1cbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfTtcbiAgICB0ZW1wbGF0ZS5hZGRFdmVudExpc3RlbmVyKCdlZGl0JywgYXNzaWduRGVmYXVsdFZhbHVlKTtcblxuICAgIGNvbnN0IG9wdHMgPSB7XG4gICAgICBpbmRpdmlkdWFsOiBpbmRpdmlkdWFsLFxuICAgICAgcHJvcGVydHlfdXJpOiBwcm9wZXJ0eV91cmksXG4gICAgICBzcGVjOiBzcGVjLFxuICAgICAgbW9kZTogbW9kZSxcbiAgICB9O1xuICAgIGNvbnRyb2xUeXBlLmNhbGwoY29udHJvbCwgb3B0cyk7XG4gIH0pO1xuXG4gIGNvbnN0IHByb21pc2VzID0gcmVscy5jb25jYXQoYWJvdXRzLCBwcm9wcyk7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiB7XG4gICAgd3JhcHBlciA9IG51bGw7XG4gICAgcmV0dXJuIHRlbXBsYXRlO1xuICB9KTtcbn1cblxuLyoqXG4gKiBSZW5kZXIgbGl0ZXJhbCB2YWx1ZXMgb2YgaW5kaXZpZHVhbFxuICogQHBhcmFtIHtJbmRpdmlkdWFsTW9kZWx9IGFib3V0IC0gaW5kaXZpZHVhbFxuICogQHBhcmFtIHtCb29sZWFufSBpc0Fib3V0IC0gaXMgYWJvdXQgZmxhZ1xuICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5X3VyaSAtIHdoaWNoIHByb3BlcnR5IHZhbHVlcyB0byByZW5kZXJcbiAqIEBwYXJhbSB7RWxlbWVudH0gcHJvcGVydHlDb250YWluZXIgLSB3aGVyZSB0byByZW5kZXIgdmFsdWVzXG4gKiBAcGFyYW0ge0VsZW1lbnR9IHRlbXBsYXRlIC0gdGVtcGxhdGUgcmVmZXJlbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZSAtIHRlbXBsYXRlIG1vZGVcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIHJlbmRlclByb3BlcnR5VmFsdWVzIChhYm91dCwgaXNBYm91dCwgcHJvcGVydHlfdXJpLCBwcm9wZXJ0eUNvbnRhaW5lciwgdGVtcGxhdGUsIG1vZGUpIHtcbiAgcHJvcGVydHlDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gIGFib3V0LmdldChwcm9wZXJ0eV91cmkpLm1hcCgodmFsdWUpID0+IHtcbiAgICBjb25zdCBmb3JtYXR0ZWRWYWx1ZSA9IENvbW1vblV0aWwuZm9ybWF0VmFsdWUodmFsdWUpO1xuICAgIGlmIChpc0Fib3V0KSB7XG4gICAgICBjb25zdCBwcmV2VmFsdWUgPSBwcm9wZXJ0eUNvbnRhaW5lci50ZXh0Q29udGVudDtcbiAgICAgIGlmIChwcmV2VmFsdWUpIHtcbiAgICAgICAgcHJvcGVydHlDb250YWluZXIudGV4dENvbnRlbnQgKz0gZm9ybWF0dGVkVmFsdWUgPyAnICcgKyBmb3JtYXR0ZWRWYWx1ZSA6ICcnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJvcGVydHlDb250YWluZXIudGV4dENvbnRlbnQgPSBmb3JtYXR0ZWRWYWx1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdmFsdWVIb2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICB2YWx1ZUhvbGRlci5jbGFzc0xpc3QuYWRkKCd2YWx1ZS1ob2xkZXInKTtcbiAgICAgIHZhbHVlSG9sZGVyLnRleHRDb250ZW50ID0gQ29tbW9uVXRpbC5mb3JtYXRWYWx1ZSh2YWx1ZSk7XG4gICAgICBwcm9wZXJ0eUNvbnRhaW5lci5hcHBlbmQodmFsdWVIb2xkZXIpO1xuICAgICAgY29uc3QgYnRuR3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGJ0bkdyb3VwLmNsYXNzTGlzdC5hZGQoJ3Byb3AtYWN0aW9ucycsICdidG4tZ3JvdXAnLCAnYnRuLWdyb3VwLXhzJyk7XG4gICAgICBjb25zdCBidG5SZW1vdmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgIGJ0blJlbW92ZS5jbGFzc0xpc3QuYWRkKCdidG4nLCAnYnRuLWRlZmF1bHQnLCAnZ2x5cGhpY29uJywgJ2dseXBoaWNvbi1yZW1vdmUnKTtcbiAgICAgIGJ0blJlbW92ZS5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJy0xJyk7XG4gICAgICBidG5Hcm91cC5hcHBlbmRDaGlsZChidG5SZW1vdmUpO1xuICAgICAgaWYgKG1vZGUgPT09ICd2aWV3Jykge1xuICAgICAgICBidG5Hcm91cC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgfVxuICAgICAgY29uc3Qgc2hvdyA9IChlKSA9PiB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGJ0bkdyb3VwLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgIH07XG4gICAgICBjb25zdCBoaWRlID0gKGUpID0+IHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgYnRuR3JvdXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIH07XG4gICAgICB0ZW1wbGF0ZS5hZGRFdmVudExpc3RlbmVyKCd2aWV3JywgaGlkZSk7XG4gICAgICB0ZW1wbGF0ZS5hZGRFdmVudExpc3RlbmVyKCdlZGl0Jywgc2hvdyk7XG4gICAgICB0ZW1wbGF0ZS5hZGRFdmVudExpc3RlbmVyKCdzZWFyY2gnLCBzaG93KTtcbiAgICAgIGJ0blJlbW92ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGFib3V0LnJlbW92ZVZhbHVlKHByb3BlcnR5X3VyaSwgdmFsdWUpKTtcbiAgICAgIGJ0blJlbW92ZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4gdmFsdWVIb2xkZXIuY2xhc3NMaXN0LmFkZCgncmVkLW91dGxpbmUnKSk7XG4gICAgICBidG5SZW1vdmUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHZhbHVlSG9sZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3JlZC1vdXRsaW5lJykpO1xuICAgICAgdmFsdWVIb2xkZXIuYXBwZW5kQ2hpbGQoYnRuR3JvdXApO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogUmVuZGVyIHJlbGF0ZWQgb2JqZWN0cyBvZiBpbmRpdmlkdWFsXG4gKiBAcGFyYW0ge0luZGl2aWR1YWxNb2RlbH0gYWJvdXQgLSBpbmRpdmlkdWFsXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGlzQWJvdXQgLSBpcyBhYm91dCBmbGFnXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsX3VyaSAtIHdoaWNoIHJlbGF0aW9uIHZhbHVlcyB0byByZW5kZXJcbiAqIEBwYXJhbSB7SW5kaXZpZHVhbE1vZGVsfSB2YWx1ZSAtIHZhbHVlIHRvIHJlbmRlclxuICogQHBhcmFtIHtFbGVtZW50fSByZWxDb250YWluZXIgLSB3aGVyZSB0byByZW5kZXIgdGhlIHZhbHVlXG4gKiBAcGFyYW0ge0VsZW1lbnR9IHJlbFRlbXBsYXRlIC0gd2hpY2ggdGVtcGxhdGUgdG8gdXNlciB0byByZW5kZXIgdGhlIHZhbHVlXG4gKiBAcGFyYW0ge0VsZW1lbnR9IHRlbXBsYXRlIC0gdGVtcGxhdGUgcmVmZXJlbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZSAtIHRlbXBsYXRlIG1vZGVcbiAqIEBwYXJhbSB7QXJyYXl9IGVtYmVkZGVkIC0gZW1iZWRkZWQgdGVtcGxhdGVzIGxpc3RcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNFbWJlZGRlZCAtIGZsYWcgdG8gaW5jbHVkZSByZW5kZXJlZCB2YWx1ZSB0byBlbWJlZGRlZCBsaXN0XG4gKiBAcGFyYW0ge0Jvb2xlYW59IHRvQXBwZW5kIC0gZmxhZyBkZWZpbmluZyBlaXRoZXIgdG8gYXBwZW5kIG9yIHJlcGxhY2UgdGhlIHJlbENvbnRhaW5lcidzIGNvbnRlbnQgd2l0aCByZW5kZXJlZCB2YWx1ZSB0ZW1wbGF0ZVxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gcmVuZGVyUmVsYXRpb25WYWx1ZSAoe2Fib3V0LCBpc0Fib3V0LCByZWxfdXJpLCB2YWx1ZSwgcmVsQ29udGFpbmVyLCByZWxUZW1wbGF0ZSwgdGVtcGxhdGUsIG1vZGUsIGVtYmVkZGVkLCBpc0VtYmVkZGVkLCB0b0FwcGVuZH0pIHtcbiAgcmV0dXJuIHZhbHVlLnByZXNlbnQocmVsQ29udGFpbmVyLCByZWxUZW1wbGF0ZSwgaXNFbWJlZGRlZCA/IG1vZGUgOiB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdG9BcHBlbmQpLnRoZW4oKHJlbmRlcmVkKSA9PiB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHJlbmRlcmVkKSkge1xuICAgICAgcmVuZGVyZWQgPSBbcmVuZGVyZWRdO1xuICAgIH1cbiAgICBpZiAoaXNFbWJlZGRlZCkge1xuICAgICAgZW1iZWRkZWQucHVzaCguLi5yZW5kZXJlZCk7XG4gICAgICByZW5kZXJlZC5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKCdkYXRhLWVtYmVkZGVkJywgJ3RydWUnKTtcbiAgICAgICAgaWYgKG1vZGUgPT09ICdlZGl0Jykge1xuICAgICAgICAgIG5vZGUuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2ludGVybmFsLXZhbGlkYXRlJykpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKCFpc0Fib3V0KSB7XG4gICAgICBjb25zdCBidG5Hcm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgYnRuR3JvdXAuY2xhc3NMaXN0LmFkZCgncmVsLWFjdGlvbnMnLCAnYnRuLWdyb3VwJywgJ2J0bi1ncm91cC14cycpO1xuICAgICAgY29uc3QgYnRuUmVtb3ZlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICBidG5SZW1vdmUuY2xhc3NMaXN0LmFkZCgnYnRuJywgJ2J0bi1kZWZhdWx0JywgJ2dseXBoaWNvbicsICdnbHlwaGljb24tcmVtb3ZlJyk7XG4gICAgICBidG5SZW1vdmUuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICctMScpO1xuICAgICAgYnRuR3JvdXAuYXBwZW5kQ2hpbGQoYnRuUmVtb3ZlKTtcbiAgICAgIGlmIChtb2RlID09PSAndmlldycpIHtcbiAgICAgICAgYnRuR3JvdXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIH1cbiAgICAgIGNvbnN0IHNob3cgPSAoZSkgPT4ge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBidG5Hcm91cC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICB9O1xuICAgICAgY29uc3QgaGlkZSA9IChlKSA9PiB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGJ0bkdyb3VwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB9O1xuICAgICAgdGVtcGxhdGUuYWRkRXZlbnRMaXN0ZW5lcigndmlldycsIGhpZGUpO1xuICAgICAgdGVtcGxhdGUuYWRkRXZlbnRMaXN0ZW5lcignZWRpdCcsIHNob3cpO1xuICAgICAgdGVtcGxhdGUuYWRkRXZlbnRMaXN0ZW5lcignc2VhcmNoJywgc2hvdyk7XG5cbiAgICAgIGJ0blJlbW92ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgYWJvdXQucmVtb3ZlVmFsdWUocmVsX3VyaSwgdmFsdWUpO1xuICAgICAgICBpZiAoIHZhbHVlLmlzKCd2LXM6RW1iZWRkZWQnKSAmJiB2YWx1ZS5oYXNWYWx1ZSgndi1zOnBhcmVudCcsIGFib3V0KSAmJiAhdmFsdWUuaXNOZXcoKSApIHtcbiAgICAgICAgICB2YWx1ZS5zZXQoJ3YtczpkZWxldGVkJywgdHJ1ZSk7XG4gICAgICAgICAgYWJvdXQucmVtb3ZlZE9ianMucHVzaCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgYnRuUmVtb3ZlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiByZW5kZXJlZC5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLmNsYXNzTGlzdC5hZGQoJ3JlZC1vdXRsaW5lJykpKTtcbiAgICAgIGJ0blJlbW92ZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4gcmVuZGVyZWQuZm9yRWFjaCgoaXRlbSkgPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdyZWQtb3V0bGluZScpKSk7XG5cbiAgICAgIHJlbmRlcmVkLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKGl0ZW0uc3R5bGUuZGlzcGxheSAhPT0gJ2lubGluZScpIHtcbiAgICAgICAgICBidG5Hcm91cC5jbGFzc0xpc3QuYWRkKCdibG9jaycpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtLnN0eWxlLmRpc3BsYXkgPT09ICd0YWJsZS1yb3cnIHx8IGl0ZW0udGFnTmFtZSA9PT0gJ1RSJykge1xuICAgICAgICAgIGNvbnN0IGNlbGwgPSBpdGVtLmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgY2VsbC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgICAgICAgY2VsbC5hcHBlbmRDaGlsZChidG5Hcm91cCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbS5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgICAgICAgaXRlbS5hcHBlbmRDaGlsZChidG5Hcm91cCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVuZGVyZWQ7XG4gIH0pO1xufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFpQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0EsU0FBU0EsbUJBQW1CQSxDQUFFQyxTQUFTLEVBQUVDLFFBQVEsRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUVDLFFBQVEsRUFBRTtJQUFBLElBQUFDLEtBQUE7SUFDeEVILElBQUksR0FBR0EsSUFBSSxJQUFJLE1BQU07SUFFckJFLFFBQVEsR0FBRyxPQUFPQSxRQUFRLEtBQUssV0FBVyxHQUFHQSxRQUFRLEdBQUcsSUFBSTtJQUU1RCxJQUFJLE9BQU9KLFNBQVMsS0FBSyxRQUFRLEVBQUU7TUFDakNBLFNBQVMsR0FBR00sUUFBUSxDQUFDQyxhQUFhLENBQUNQLFNBQVMsQ0FBQztJQUMvQyxD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