"use strict";

System.register(["../common/veda.js", "../common/individual_model.js", "../common/backend.js"], function (_export, _context) {
  "use strict";

  var veda, IndividualModel, Backend, Util;
  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function () {}; return { s: F, n: function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function (e) { throw e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function () { it = it.call(o); }, n: function () { var step = it.next(); normalCompletion = step.done; return step; }, e: function (e) { didErr = true; err = e; }, f: function () { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
  function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }
  function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
  /**
   * Prefix with 0 if number has single digit
   * @param {number} n
   * @return {string}
   */
  function zeroPref(n) {
    return n > 9 ? String(n) : '0' + n;
  }
  /**
   * Format string
   * @param {Object} value
   * @return {string}
   */
  function formatString(value) {
    var condition = !value.language || value.language === 'NONE' || veda.user && veda.user.preferences && veda.user.preferences.language && value.language in veda.user.preferences.language;
    return condition ? value : undefined;
  }

  /**
   * Format date
   * @param {Date} date
   * @return {string}
   */
  function formatDate(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var hours = date.getHours();
    var mins = date.getMinutes();
    var secs = date.getSeconds();
    var UTChours = date.getUTCHours();
    var UTCmins = date.getUTCMinutes();
    var UTCsecs = date.getUTCSeconds();
    if (UTChours + UTCmins + UTCsecs === 0) {
      return [zeroPref(day), zeroPref(month), year].join('.');
    }
    var fdate = [zeroPref(day), zeroPref(month), year].join('.');
    if (fdate === '01.01.1970') fdate = '';
    var ftime = [zeroPref(hours), zeroPref(mins), zeroPref(secs)].join(':');
    if (ftime === '00:00:00') {
      ftime = '';
    } else if (secs === 0) {
      ftime = ftime.substring(0, 5);
    }
    return [fdate, ftime].join(' ');
  }

  /**
   * Format date
   * @param {number} n
   * @return {string}
   */
  function formatNumber(n) {
    return Number(n).toLocaleString('ru-RU', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 20
    }).replace(/\s/g, ' ');
  }

  /*
   * from http://stackoverflow.com/questions/27266550/how-to-flatten-nested-array-in-javascript
   * by http://stackoverflow.com/users/2389720/aduch
   *
   * This is done in a linear time O(n) without recursion
   * memory complexity is O(1) or O(n) if mutable param is set to false
   */

  /**
   * Flatten individual
   * @param {Object} object
   * @param {string} prefix
   * @param {Object} union
   * @param {Array} visited
   * @return {Object} union
   */
  function flattenIndividual(object, prefix, union, visited) {
    var uri = object['@'];
    union = typeof union !== 'undefined' ? union : {};
    prefix = typeof prefix !== 'undefined' ? prefix : '';
    visited = typeof visited !== 'undefined' ? visited : [];
    if (visited.indexOf(uri) > -1) {
      return;
    } else {
      visited.push(uri);
    }
    for (var property_uri in object) {
      if (property_uri === '@') {
        continue;
      }
      var values = object[property_uri];
      var prefixed = prefix ? prefix + '.' + property_uri : property_uri;
      var _iterator2 = _createForOfIteratorHelper(values),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var value = _step2.value;
          if (value.type === 'Uri') {
            var individ = new IndividualModel(value.data);
            if (individ.isNew()) {
              flattenIndividual(individ.properties, prefixed, union, visited);
            } else {
              union[prefixed] = union[prefixed] ? union[prefixed] : [];
              union[prefixed].push(value);
            }
          } else {
            union[prefixed] = union[prefixed] ? union[prefixed] : [];
            union[prefixed].push(value);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
    return union;
  }

  /**
   * Сформировать составное наименование объекта
   *
   * @param individual индивид
   * @returns {Array}
   */
  return {
    setters: [function (_commonVedaJs) {
      veda = _commonVedaJs.default;
    }, function (_commonIndividual_modelJs) {
      IndividualModel = _commonIndividual_modelJs.default;
    }, function (_commonBackendJs) {
      Backend = _commonBackendJs.default;
    }],
    execute: function () {
      Util = {};
      _export("default", Util);
      Util.mergeMutualChanges = function (high, low, base) {
        var key;
        var merged = {};
        for (key in base) {
          if (Object.hasOwnProperty.call(base, key)) {
            merged[key] = base[key];
          }
        }
        var highBaseDiff = Util.diff(high, base);
        var lowBaseDiff = Util.diff(low, base);
        var highLowDiff = Util.diff(high, low);
        var lowHighDiff = Util.diff(low, high);
        for (key in lowBaseDiff.missing) {
          if (Object.hasOwnProperty.call(lowBaseDiff.missing, key)) {
            delete merged[key];
          }
        }
        for (key in highBaseDiff.missing) {
          if (Object.hasOwnProperty.call(highBaseDiff.missing, key)) {
            delete merged[key];
          }
        }
        for (key in lowBaseDiff.added) {
          if (Object.hasOwnProperty.call(lowBaseDiff.added, key)) {
            merged[key] = lowBaseDiff.added[key];
          }
        }
        for (key in highBaseDiff.added) {
          if (Object.hasOwnProperty.call(highBaseDiff.added, key)) {
            merged[key] = highBaseDiff.added[key];
          }
        }
        for (key in lowBaseDiff.differ) {
          if (Object.hasOwnProperty.call(lowBaseDiff.differ, key)) {
            merged[key] = lowBaseDiff.differ[key];
          }
        }
        for (key in highBaseDiff.diff) {
          if (Object.hasOwnProperty.call(highBaseDiff.diff, key)) {
            merged[key] = highBaseDiff.differ[key];
          }
        }
        return {
          merged: merged,
          conflicts: {
            high: highLowDiff.differ,
            low: lowHighDiff.differ
          }
        };
      };
      Util.diff = function (changed, base) {
        var delta = {
          added: {},
          missing: {},
          differ: {}
        };
        var key;
        var values;
        var value;
        var length;
        var i;
        var hasValue;
        for (key in base) {
          if (!(key in changed)) {
            delta.missing[key] = base[key];
          } else {
            if (key === '@') {
              if (changed[key] !== base[key]) {
                delta.differ[key] = changed[key];
              }
              continue;
            }
            values = base[key];
            length = values.length;
            hasValue = length === changed[key].length;
            for (i = 0; i < length && hasValue; i++) {
              value = values[i];
              hasValue = hasValue && Util.hasValue(changed, key, value);
            }
            if (!hasValue) {
              delta.differ[key] = changed[key];
            }
          }
        }
        for (key in changed) {
          if (!(key in base)) {
            delta.added[key] = changed[key];
          }
        }
        return delta;
      };
      Util.hasValue = function (individual, property, value) {
        var any = !!(individual && individual[property] && individual[property].length);
        if (!value) return any;
        return !!(any && individual[property].filter(function (i) {
          return i.type === value.type && i.data.valueOf() === value.data.valueOf();
        }).length);
      };
      Util.toJson = function (value) {
        return JSON.stringify(value, null, 2);
      };
      Util.processQuery = function (vql, sql, sort, limit, queryDelta, processDelta, pause, fn) {
        var fetchResult = function fetchResult(cursor) {
          var from = cursor || 0;
          Backend.query({
            ticket: veda.ticket,
            query: vql,
            sql: sql,
            sort: sort || '\'v-s:created\' desc',
            from: from,
            top: queryDelta,
            limit: limit
          }).then(function (query_result) {
            var currCursor = query_result.cursor;
            var estimated = query_result.estimated;
            if (limit > estimated) {
              limit = estimated;
            }
            append.apply(result, query_result.result);
            if (currCursor / limit - fetchingProgress >= 0.05) {
              fetchingProgress = currCursor / limit;
              console.log('Fetching progress:', Math.floor(fetchingProgress * 100) + '%', '(' + currCursor, 'of', limit + ')');
            }
            if (currCursor === estimated || currCursor >= limit) {
              console.log(new Date().toString(), 'Fetching done:', limit);
              console.timeEnd('Fetching total');
              result.splice(limit - currCursor || limit); // cut result to limit
              Util.processResult(result, processDelta, pause, fn);
            } else {
              fetchResult(query_result.cursor);
            }
          });
        };
        if (_typeof(vql) === 'object') {
          sort = vql.sort;
          limit = vql.limit;
          queryDelta = vql.queryDelta;
          processDelta = vql.processDelta;
          pause = vql.pause;
          fn = vql.fn;
          sql = vql.sql;
          vql = vql.vql;
        }
        console.log(new Date().toISOString(), 'Process query results |||', 'query:', vql || sql, ' | ', 'limit:', limit, ' | ', 'query delta:', queryDelta, ' | ', 'process delta:', processDelta, ' | ', 'pause:', pause);
        var result = [];
        var append = [].push;
        var fetchingProgress = 0;
        console.time('Fetching total');
        fetchResult();
      };
      Util.processResult = function (result, delta, pause, fn) {
        var processPortion = function processPortion() {
          var portion = result.splice(0, delta);
          portion.reduce(function (prom, item) {
            return prom.then(function () {
              return fn(item);
            }).catch(function (error) {
              console.error('Error processing item:', item);
            });
          }, Promise.resolve()).then(function () {
            if ((total - result.length) / total - processingProgress >= 0.05) {
              processingProgress = (total - result.length) / total;
              console.log('Processing progress:', Math.floor(processingProgress * 100) + '%', '(' + (total - result.length), 'of', total + ')');
            }
            if (result.length) {
              setTimeout ? setTimeout(processPortion, pause) : processPortion();
            } else {
              console.log('Processing done:', total);
              console.timeEnd('Processing total');
            }
          });
        };
        var total = result.length;
        var processingProgress = 0;
        console.log(new Date().toISOString(), 'Process results |||', 'total:', total, ' | ', 'delta:', delta, ' | ', 'pause:', pause);
        console.time('Processing total');
        processPortion();
      };
      Util.genUri = function () {
        var uid = Util.guid();
        var re = /^\d/;
        return re.test(uid) ? 'd:a' + uid : 'd:' + uid;
      };
      Util.guid = function () {
        var d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
          d += performance.now(); // use high-precision timer if available
        }

        return 'xxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/x/g, function (c) {
          var r = (d + Math.random() * 36) % 36 | 0;
          d = Math.floor(d / 36);
          return r.toString(36);
        });
      };
      Util.isInteger = function (n) {
        return n % 1 === 0;
      };
      Util.formatValue = function (value) {
        var formatted;
        switch (true) {
          case _instanceof(value, Date):
            formatted = formatDate(value);
            break;
          case _instanceof(value, Number):
          case typeof value === 'number':
            formatted = formatNumber(value);
            break;
          case _instanceof(value, String):
          case typeof value === 'string':
            formatted = formatString(value);
            break;
          default:
            formatted = typeof value !== 'undefined' ? value.toString() : value;
        }
        return formatted;
      };
      Util.flatten = function (array, mutable) {
        var toString = Object.prototype.toString;
        var arrayTypeStr = '[object Array]';
        var result = [];
        var nodes = mutable && array || array.slice();
        var node;
        if (!array.length) {
          return result;
        }
        node = nodes.pop();
        do {
          if (toString.call(node) === arrayTypeStr) {
            nodes.push.apply(nodes, _toConsumableArray(node));
          } else {
            result.push(node);
          }
        } while (nodes.length && (node = nodes.pop()) !== undefined);
        result.reverse(); // we reverse result to restore the original order
        return result;
      };
      Util.unique = function (arr) {
        var n = {};
        var r = [];
        var _iterator = _createForOfIteratorHelper(arr),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var item = _step.value;
            if (!n[item]) {
              n[item] = true;
              r.push(item);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        return r;
      };
      Number.isFinite = Number.isFinite || function (value) {
        return typeof value === 'number' && isFinite(value);
      };
      Number.isInteger = Number.isInteger || function (value) {
        return typeof value === 'number' && Number.isFinite(value) && !(value % 1);
      };
      Number.isFloat = Number.isFloat || function (value) {
        return typeof value === 'number' && Number.isFinite(value) && value % 1;
      };
      Util.queryFromIndividualPT = function (individual, sort) {
        var orderBy = function orderBy() {
          if (typeof sort === 'string' || _instanceof(sort, String)) {
            return sort.replace(/'(.+?)'\s+(\w+)/gi, function (match, property_uri, dir) {
              var range = veda.ontology.properties[property_uri].get('rdfs:range')[0];
              var by = property_uri.replace(re, '_');
              var clause;
              switch (range.id) {
                case 'xsd:dateTime':
                  clause = by + '.date ' + dir;
                  break;
                case 'xsd:boolean':
                case 'xsd:integer':
                  clause = by + '.int ' + dir;
                  break;
                case 'xsd:decimal':
                  clause = by + '.dec ' + dir;
                  break;
                case 'xsd:string':
                default:
                  clause = by + '.str ' + dir;
                  break;
              }
              return clause;
            });
          }
        };
        var buildQuery = function buildQuery() {
          var tables = [];
          var i = -1;
          var where = Object.keys(individual.properties).map(function (property_uri) {
            if (property_uri.indexOf('.') >= 0 || property_uri.indexOf('*') >= 0) {
              throw new Error('VQL style property nesting: ' + property_uri);
            }
            if (property_uri === '@') {
              return;
            }
            i++;
            var table = 'veda_pt.`' + property_uri + '` as p' + i;
            tables[i] = table;
            var values = individual.get(property_uri).sort(function (a, b) {
              if (a < b) return -1;else if (a === b) return 0;else return 1;
            });
            var oneProp;
            switch (true) {
              case Number.isInteger(values[0]):
                oneProp = 'p' + i + '.int[1] >= ' + values[0] + ' AND p' + i + '.int[1] <= ' + values[values.length - 1];
                break;
              case Number.isFloat(values[0]):
                oneProp = 'p' + i + '.dec[1] >= ' + values[0] + ' AND p' + i + '.dec[1] <= ' + values[values.length - 1];
                break;
              case _instanceof(values[0], Date):
                var start = new Date(values[0]);
                var end = new Date(values[values.length - 1]);
                start.setHours(0, 0, 0, 0);
                end.setHours(23, 59, 59, 999);
                start = Math.floor(start.valueOf() / 1000);
                end = Math.floor(end.valueOf() / 1000);
                oneProp = 'p' + i + '.date[1] >= toDateTime(' + start + ') AND p' + i + '.date[1] <= toDateTime(' + end + ')';
                break;
              case typeof values[0] === 'boolean':
                oneProp = values.map(function (value) {
                  return 'p' + i + '.int[1] = ' + (value ? 1 : 0);
                }).join(' OR ');
                break;
              case _instanceof(values[0], String):
                oneProp = values.filter(Boolean).map(function (value) {
                  var q = value;
                  var lines = q.trim().split('\n');
                  var lineQueries = lines.map(function (line) {
                    var words = line.trim().replace(/[-*\s]+/g, ' ').split(' ');
                    return words.length && 'arrayStringConcat(' + 'p' + i + '.str, \' \') LIKE \'%' + words.join('% %').replace(/\'/g, '\\\'').replace(/\"/g, '\'') + '%\'';
                  });
                  return lineQueries.filter(Boolean).join(' OR ');
                }).filter(Boolean).join(' OR ');
                break;
              case _instanceof(values[0], IndividualModel):
                oneProp = values.filter(Boolean).map(function (value) {
                  if (value.isNew()) {
                    return;
                  } else {
                    return 'has(' + 'p' + i + '.str, \'' + value.id + '\')';
                  }
                }).filter(Boolean).join(' OR ');
                break;
            }
            if (!oneProp) {
              return;
            }
            return oneProp.indexOf(' OR ') > 0 ? '( ' + oneProp + ' )' : oneProp;
          }).filter(Boolean).join(' AND ');
          var from = tables.reduce(function (acc, table, j) {
            return acc ? acc + ' JOIN ' + table + ' ON p' + (j - 1) + '.id = p' + j + '.id' : table;
          }, '');
          return 'SELECT DISTINCT id FROM ' + from + (where ? ' WHERE ' + where : '');
        };
        var re = /[^a-zA-Z0-9]/g;
        try {
          var query = buildQuery();
          var order = orderBy();
          query = query && order ? query + ' ORDER BY ' + order : query;
          return query;
        } catch (error) {
          console.error('Error building query');
        }
      };
      Util.queryFromIndividualTT_SUB = function (individual, sort, withDeleted) {
        var groupBy = function groupBy(sortStr) {
          var by = 'id';
          var props;
          if (typeof sortStr === 'string' || _instanceof(sortStr, String)) {
            props = sortStr.replace(/'(.+?)'\s+(\w+)/gi, function (match, property_uri) {
              var range = veda.ontology.properties[property_uri].get('rdfs:range')[0];
              var byClause = property_uri.replace(re, '_');
              switch (range.id) {
                case 'xsd:dateTime':
                  byClause = byClause + '_date';
                  break;
                case 'xsd:boolean':
                case 'xsd:integer':
                  byClause = byClause + '_int';
                  break;
                case 'xsd:decimal':
                  byClause = byClause + '_dec';
                  break;
                case 'xsd:string':
                default:
                  byClause = byClause + '_str';
                  break;
              }
              return byClause;
            });
          }
          return props ? by + ', ' + props : by;
        };
        var orderBy = function orderBy(sortStr) {
          if (typeof sortStr === 'string' || _instanceof(sortStr, String)) {
            return sortStr.replace(/'(.+?)'\s+(\w+)/gi, function (match, property_uri, dir) {
              var range = veda.ontology.properties[property_uri].get('rdfs:range')[0];
              var by = property_uri.replace(re, '_');
              var clause;
              switch (range.id) {
                case 'xsd:dateTime':
                  clause = by + '_date ' + dir;
                  break;
                case 'xsd:boolean':
                case 'xsd:integer':
                  clause = by + '_int ' + dir;
                  break;
                case 'xsd:decimal':
                  clause = by + '_dec ' + dir;
                  break;
                case 'xsd:string':
                default:
                  clause = by + '_str ' + dir;
                  break;
              }
              return clause;
            });
          }
        };
        var buildQuery = function buildQuery(individualParam) {
          if (individualParam.id in visited) {
            return;
          } else {
            visited[individualParam.id] = true;
          }
          var where = Object.keys(individualParam.properties).map(function (property_uri, i) {
            if (property_uri.indexOf('.') >= 0 || property_uri.indexOf('*') >= 0) {
              throw new Error('VQL style property nesting: ' + property_uri);
            }
            if (property_uri === '@' || property_uri === 'rdf:type') {
              return;
            }
            var values = individualParam.get(property_uri).sort(function (a, b) {
              if (a < b) return -1;else if (a === b) return 0;else return 1;
            });
            var prop = property_uri.replace(re, '_');
            var oneProp;
            switch (true) {
              case Number.isInteger(values[0]):
                oneProp = prop + '_int[1] >= ' + values[0] + ' AND ' + prop + '_int[1] <= ' + values[values.length - 1];
                break;
              case Number.isFloat(values[0]):
                oneProp = prop + '_dec[1] >= ' + values[0] + ' AND ' + prop + '_dec[1] <= ' + values[values.length - 1];
                break;
              // Date
              case _instanceof(values[0], Date):
                var start = new Date(values[0]);
                var end = new Date(values[values.length - 1]);
                start.setHours(0, 0, 0, 0);
                end.setHours(23, 59, 59, 999);
                start = Math.floor(start.valueOf() / 1000);
                end = Math.floor(end.valueOf() / 1000);
                oneProp = prop + '_date[1] >= toDateTime(' + start + ') AND ' + prop + '_date[1] <= toDateTime(' + end + ')';
                break;
              case typeof values[0] === 'boolean':
                oneProp = values.map(function (value) {
                  return prop + '_int[1] = ' + (value ? 1 : 0);
                }).join(' OR ');
                break;
              case _instanceof(values[0], String):
                oneProp = values.filter(Boolean).map(function (value) {
                  var q = value;
                  var lines = q.trim().split('\n');
                  var lineQueries = lines.map(function (line) {
                    var words = line.trim().replace(/[-*\s]+/g, ' ').split(' ');
                    // 'text' is a special single-value column without suffix with all text content of an individual
                    if (/\.\*$/.test(prop)) {
                      prop = prop.replace('*', 'text');
                    }
                    if (/\.text$/.test(prop)) {
                      return words.length && prop + ' LIKE \'%' + words.join('% %').replace(/\'/g, '\\\'').replace(/\"/g, '\'') + '%\'';
                    } else {
                      return words.length && 'lowerUTF8(arrayStringConcat(' + prop + '_str, \' \')) LIKE lowerUTF8(\'%' + words.join('% %').replace(/\'/g, '\\\'').replace(/\"/g, '\'') + '%\')';
                    }
                  });
                  return lineQueries.filter(Boolean).join(' OR ');
                }).filter(Boolean).join(' OR ');
                break;
              case _instanceof(values[0], IndividualModel):
                oneProp = values.filter(Boolean).map(function (value) {
                  if (value.isNew()) {
                    var sub = buildQuery(value);
                    return sub ? prop + '_str IN ( ' + sub + ' )' : undefined;
                  } else {
                    return 'has(' + prop + '_str, \'' + value + '\')';
                  }
                }).filter(Boolean).join(' OR ');
                break;
            }
            if (!oneProp) {
              return;
            }
            return oneProp.indexOf(' OR ') > 0 ? '( ' + oneProp + ' )' : oneProp;
          }).filter(Boolean).join(' AND ');
          if (!withDeleted) {
            where += where ? ' AND ' : '';
            where += 'NOT v_s_deleted_int = [1]';
          }
          if (Object.keys(visited).length > 1 && !where) {
            return;
          }
          return individualParam.get('rdf:type').map(function (type) {
            var from = 'veda_tt.`' + type.id + '`';
            return 'SELECT id FROM ' + from + (where ? ' WHERE ' + where : '');
          }).filter(Boolean).join(' UNION ALL ');
        };
        try {
          var query = buildQuery(individual);
          var group = groupBy(sort);
          query = query && group ? query + ' GROUP BY ' + group : query;
          var order = orderBy(sort);
          query = query ? query + ' HAVING sum(sign) > 0' : query;
          query = query && order ? query + ' ORDER BY ' + order : query;
          return query;
        } catch (error) {
          console.error('Error building query');
        }
      };
      Util.queryFromIndividualTT_JOIN = function (individual, sort, withDeleted) {
        var table_counter = 0;
        var re = /[^a-zA-Z0-9]/g;
        try {
          return individual['rdf:type'].map(function (_type, type_index) {
            var from = '';
            var where = '';
            var visited = visited || {};
            buildQuery(individual, undefined, type_index);
            var query = from ? 'SELECT t1.id FROM ' + from : '';
            query = query && where ? query + ' WHERE ' + where : query;
            var group = groupBy(sort);
            query = query && group ? query + ' GROUP BY ' + group : query;
            var order = orderBy(sort);
            query = query ? query + ' HAVING sum(t1.sign) > 0' : query;
            query = query && order ? query + ' ORDER BY ' + order : query;
            return query;

            /**
             * Form `group by` clause
             * @param {string} sortStr
             * @return {string}
             */
            function groupBy(sortStr) {
              var by = 't1.id';
              var props;
              if (typeof sortStr === 'string' || _instanceof(sortStr, String)) {
                props = sortStr.replace(/'(.+?)'\s+(\w+)/gi, function (match, property_uri) {
                  var range = veda.ontology.properties[property_uri].get('rdfs:range')[0];
                  var byClause = property_uri.replace(re, '_');
                  switch (range.id) {
                    case 'xsd:dateTime':
                      byClause = byClause + '_date';
                      break;
                    case 'xsd:boolean':
                    case 'xsd:integer':
                      byClause = byClause + '_int';
                      break;
                    case 'xsd:decimal':
                      byClause = byClause + '_dec';
                      break;
                    case 'xsd:string':
                    default:
                      byClause = byClause + '_str';
                      break;
                  }
                  return 't1.' + byClause;
                });
              }
              return props ? by + ', ' + props : by;
            }

            /**
             * Form `order by` clause
             * @param {string} sortStr
             * @return {string}
             */
            function orderBy(sortStr) {
              if (typeof sortStr === 'string' || _instanceof(sortStr, String)) {
                return sortStr.replace(/'(.+?)'\s+(\w+)/gi, function (match, property_uri, dir) {
                  var range = veda.ontology.properties[property_uri].get('rdfs:range')[0];
                  var by = property_uri.replace(re, '_');
                  var clause;
                  switch (range.id) {
                    case 'xsd:dateTime':
                      clause = by + '_date ' + dir;
                      break;
                    case 'xsd:boolean':
                    case 'xsd:integer':
                      clause = by + '_int ' + dir;
                      break;
                    case 'xsd:decimal':
                      clause = by + '_dec ' + dir;
                      break;
                    case 'xsd:string':
                    default:
                      clause = by + '_str ' + dir;
                      break;
                  }
                  return 't1.' + clause;
                });
              }
            }

            /**
             * Recursive from & where population
             * @param {IndividualModel} individualParam
             * @param {string} parent_prop
             * @param {number} type_index_param
             */
            function buildQuery(individualParam, parent_prop, type_index_param) {
              if (!individualParam.hasValue('rdf:type')) {
                return;
              }
              table_counter++;
              type_index_param = type_index_param || 0;
              var type = individualParam.get('rdf:type')[type_index_param].id;
              var alias = 't' + table_counter;
              visited[individualParam.id] = alias;
              var table_aliased = 'veda_tt.`' + type + '` AS ' + alias;
              if (!parent_prop) {
                from += table_aliased;
              } else {
                from += ' JOIN ' + table_aliased + ' ON ' + parent_prop + ' = [' + alias + '.id]';
              }
              if (!withDeleted) {
                where += where ? ' AND ' : '';
                where += 'NOT ' + alias + '.v_s_deleted_int = [1]';
              }
              var where_aliased = Object.keys(individualParam.properties).map(function (property_uri, i) {
                if (property_uri.indexOf('.') >= 0 || property_uri.indexOf('*') >= 0) {
                  throw new Error('VQL style property nesting: ' + property_uri);
                }
                if (property_uri === '@' || property_uri === 'rdf:type') {
                  return;
                }
                var values = individualParam.get(property_uri).sort(function (a, b) {
                  if (a < b) return -1;else if (a === b) return 0;else return 1;
                });
                var prop = alias + '.' + property_uri.replace(re, '_');
                var oneProp;
                switch (true) {
                  case Number.isInteger(values[0]):
                    oneProp = prop + '_int[1] >= ' + values[0] + ' AND ' + prop + '_int[1] <= ' + values[values.length - 1];
                    break;
                  case Number.isFloat(values[0]):
                    oneProp = prop + '_dec[1] >= ' + values[0] + ' AND ' + prop + '_dec[1] <= ' + values[values.length - 1];
                    break;
                  case _instanceof(values[0], Date):
                    var start = new Date(values[0]);
                    var end = new Date(values[values.length - 1]);
                    start.setHours(0, 0, 0, 0);
                    end.setHours(23, 59, 59, 999);
                    start = Math.floor(start.valueOf() / 1000);
                    end = Math.floor(end.valueOf() / 1000);
                    oneProp = prop + '_date[1] >= toDateTime(' + start + ') AND ' + prop + '_date[1] <= toDateTime(' + end + ')';
                    break;
                  case typeof values[0] === 'boolean':
                    oneProp = values.map(function (value) {
                      return prop + '_int[1] = ' + (value ? 1 : 0);
                    }).join(' OR ');
                    break;
                  case _instanceof(values[0], String):
                    oneProp = values.filter(Boolean).map(function (value) {
                      var q = value;
                      var lines = q.trim().split('\n');
                      var lineQueries = lines.map(function (line) {
                        var words = line.trim().replace(/[-*\s]+/g, ' ').split(' ');
                        // 'text' is a special single-value column without suffix with all text content of an individual
                        if (/\.\*$/.test(prop)) {
                          prop = prop.replace('*', 'text');
                        }
                        if (/\.text$/.test(prop)) {
                          return words.length && prop + ' LIKE \'%' + words.join('% %').replace(/\'/g, '\\\'').replace(/\"/g, '\'') + '%\'';
                        } else {
                          return words.length && 'lowerUTF8(arrayStringConcat(' + prop + '_str, \' \')) LIKE lowerUTF8(\'%' + words.join('% %').replace(/\'/g, '\\\'').replace(/\"/g, '\'') + '%\')';
                        }
                      });
                      return lineQueries.filter(Boolean).join(' OR ');
                    }).filter(Boolean).join(' OR ');
                    break;
                  case _instanceof(values[0], IndividualModel):
                    oneProp = values.filter(Boolean).map(function (value) {
                      if (value.isNew() && !(value.id in visited)) {
                        return buildQuery(value, prop + '_str');
                      } else if (value.isNew() && value.id in visited) {
                        return 'has(' + prop + '_str, ' + visited[value.id] + '.id' + ')';
                      } else {
                        return 'has(' + prop + '_str, \'' + value + '\')';
                      }
                    }).filter(Boolean).join(' OR ');
                    break;
                }
                if (!oneProp) {
                  return;
                }
                return oneProp.indexOf(' OR ') > 0 ? '( ' + oneProp + ' )' : oneProp;
              }).filter(Boolean).join(' AND ');
              if (!where_aliased) {
                return;
              }
              if (!where) {
                where = where_aliased;
              } else {
                where += ' AND ' + where_aliased;
              }
            }
          }).join(' UNION ALL ');
        } catch (error) {
          console.error('Error building query');
        }
      };
      Util.queryFromIndividual = function (individual) {
        var flat = flattenIndividual(individual.properties);
        if (individual.hasValue('*') && individual.get('*')[0].indexOf('==') > 0) {
          return individual.get('*')[0];
        }
        var allProps = Object.getOwnPropertyNames(flat).map(function (property_uri) {
          if (property_uri === '@' || property_uri === 'v-s:isDraft') {
            return;
          }
          var values = flat[property_uri].sort(function (a, b) {
            if (a.data < b.data) return -1;else if (a.data === b.data) return 0;else return 1;
          });
          var oneProp;
          switch (values[0].type) {
            case 'Integer':
            case 'Decimal':
              oneProp = '\'' + property_uri + '\'==[' + values[0].data + ',' + values[values.length - 1].data + ']';
              break;
            // Date
            case 'Datetime':
              var start = new Date(values[0].data);
              var end = new Date(values[values.length - 1].data);
              start.setHours(0, 0, 0, 0);
              end.setHours(23, 59, 59, 999);
              oneProp = '\'' + property_uri + '\'==[' + start.toISOString() + ',' + end.toISOString() + ']';
              break;
            case 'Boolean':
              oneProp = values.map(function (value) {
                return '\'' + property_uri + '\'==\'' + value.data + '\'';
              }).join(' || ');
              break;
            case 'String':
              oneProp = values.filter(function (item) {
                return !!item && !!item.valueOf();
              }).map(function (value) {
                var q = value.data;
                if (!q.match(/[\+\-\*]/)) {
                  var lines = q.trim().split('\n');
                  var lineQueries = lines.map(function (line) {
                    var words = line.trim().replace(/[-*\s'"]+/g, ' ').split(' ').filter(Boolean);
                    line = words.map(function (word) {
                      return '+' + word + '*';
                    }).join(' ');
                    return '\'' + property_uri + '\'==\'' + line + '\'';
                  });
                  return lineQueries.join(' || ');
                } else {
                  return '\'' + property_uri + '\'==\'' + q + '\'';
                }
              }).join(' || ');
              break;
            case 'Uri':
              oneProp = values.filter(function (item) {
                return !!item && !!item.valueOf();
              }).map(function (value) {
                return '\'' + property_uri + '\'==\'' + value.data + '\'';
              }).join(' || ');
              break;
          }
          return oneProp ? '( ' + oneProp + ' )' : undefined;
        }).filter(function (item) {
          return typeof item !== 'undefined';
        }).join(' && ');
        return allProps ? '( ' + allProps + ' )' : undefined;
      };
      Util.complexLabel = function (individual) {
        individual = individual.properties || individual;
        var cache = {};
        cache[individual['@']] = individual;
        var re_date = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*Z$/i;
        var get_cached = function get_cached(uri) {
          if (!cache[uri]) {
            cache[uri] = get_individual(veda.ticket, uri);
          }
          return cache[uri];
        };
        var get_localized_chain = function get_localized_chain(language, uri) {
          var _arguments = arguments;
          var startPoint = get_cached(uri);
          if (!startPoint) {
            return '';
          }
          var intermediates = [startPoint];
          var _loop = function _loop() {
            var property = i + 2 < 2 || _arguments.length <= i + 2 ? undefined : _arguments[i + 2];
            if (i === (_arguments.length <= 2 ? 0 : _arguments.length - 2) - 1) {
              var parts = [];
              intermediates.forEach(function (item) {
                if (item[property]) {
                  var part = item[property].reduce(function (acc, value) {
                    if (!value.lang || value.lang === 'NONE' || value.lang.toLowerCase() === language.toLowerCase()) {
                      var data = value.data;
                      if (_instanceof(data, Date) || re_date.test(data)) {
                        data = new Date(data);
                        data = new Date(data.getTime() - data.getTimezoneOffset() * 60000).toISOString().substring(0, 10);
                      }
                      acc += data;
                    }
                    return acc;
                  }, '');
                  parts.push(part);
                }
              });
              return {
                v: parts.join(', ')
              };
            }
            var temp = [];
            intermediates.forEach(function (item) {
              if (Util.hasValue(item, property)) {
                item[property].forEach(function (propertyItem) {
                  temp.push(get_cached(propertyItem.data));
                });
              }
            });
            if (temp.length) {
              intermediates = temp;
            } else {
              return {
                v: ''
              };
            }
          };
          for (var i = 0; i < (arguments.length <= 2 ? 0 : arguments.length - 2); i++) {
            var _ret = _loop();
            if (_typeof(_ret) === "object") return _ret.v;
          }
          return '';
        };
        try {
          var availableLanguages = get_cached('v-ui:AvailableLanguage');
          var languages = availableLanguages['rdf:value'].map(function (languageValue) {
            var languageUri = languageValue.data;
            var language = get_cached(languageUri);
            return language['rdf:value'][0].data;
          });
          return individual['rdf:type'].reduce(function (acc, typeValue) {
            var typeUri = typeValue.data;
            var type = get_cached(typeUri);
            if (!type || !Util.hasValue(type, 'v-s:labelPattern')) {
              return acc;
            }
            var pattern = type['v-s:labelPattern'][0].data;
            languages.forEach(function (language) {
              var replaced = pattern.replace(/{(\s*([^{}]+)\s*)}/g, function (match, group) {
                var indexes = null;
                if (group.indexOf(' ') != -1) {
                  var temp = group.split(' ');
                  group = temp[0];
                  indexes = temp[1].substring(1, temp[1].length - 1).split(',');
                }
                var chain = group.split('.');
                if (chain[0] === '@') {
                  chain[0] = individual['@'];
                }
                var localedChain = get_localized_chain.apply({}, [language].concat(chain));
                return indexes == null ? localedChain : localedChain.substring(+indexes[0], +indexes[1]);
              });
              var result = {
                data: replaced,
                lang: language,
                type: 'String'
              };
              acc.push(result);
            });
            return acc;
          }, []);
        } catch (err) {
          console.error('Complex label failed');
          return [];
        }
      };
      Util.areEqual = function (x, y) {
        if (x === y) return true;
        if (!_instanceof(x, Object) || !_instanceof(y, Object)) return false;
        if (x.constructor !== y.constructor) return false;
        for (var p in x) {
          if (!Object.prototype.hasOwnProperty.call(x, p)) continue;
          if (!Object.prototype.hasOwnProperty.call(y, p)) return false;
          if (x[p] === y[p]) continue;
          if (_typeof(x[p]) !== 'object') return false;
          if (!Util.areEqual(x[p], y[p])) return false;
        }
        for (var _p in y) {
          if (Object.prototype.hasOwnProperty.call(y, _p) && !Object.prototype.hasOwnProperty.call(x, _p)) return false;
        }
        return true;
      };
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ6ZXJvUHJlZiIsIm4iLCJTdHJpbmciLCJmb3JtYXRTdHJpbmciLCJ2YWx1ZSIsImNvbmRpdGlvbiIsImxhbmd1YWdlIiwidmVkYSIsInVzZXIiLCJwcmVmZXJlbmNlcyIsInVuZGVmaW5lZCIsImZvcm1hdERhdGUiLCJkYXRlIiwiZGF5IiwiZ2V0RGF0ZSIsIm1vbnRoIiwiZ2V0TW9udGgiLCJ5ZWFyIiwiZ2V0RnVsbFllYXIiLCJob3VycyIsImdldEhvdXJzIiwibWlucyIsImdldE1pbnV0ZXMiLCJzZWNzIiwiZ2V0U2Vjb25kcyIsIlVUQ2hvdXJzIiwiZ2V0VVRDSG91cnMiLCJVVENtaW5zIiwiZ2V0VVRDTWludXRlcyIsIlVUQ3NlY3MiLCJnZXRVVENTZWNvbmRzIiwiam9pbiIsImZkYXRlIiwiZnRpbWUiLCJzdWJzdHJpbmciLCJmb3JtYXROdW1iZXIiLCJOdW1iZXIiLCJ0b0xvY2FsZVN0cmluZyIsIm1pbmltdW1GcmFjdGlvbkRpZ2l0cyIsIm1heGltdW1GcmFjdGlvbkRpZ2l0cyIsInJlcGxhY2UiLCJmbGF0dGVuSW5kaXZpZHVhbCIsIm9iamVjdCIsInByZWZpeCIsInVuaW9uIiwidmlzaXRlZCIsInVyaSIsImluZGV4T2YiLCJwdXNoIiwicHJvcGVydHlfdXJpIiwidmFsdWVzIiwicHJlZml4ZWQiLCJfaXRlcmF0b3IyIiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIiLCJfc3RlcDIiLCJzIiwiZG9uZSIsInR5cGUiLCJpbmRpdmlkIiwiSW5kaXZpZHVhbE1vZGVsIiwiZGF0YSIsImlzTmV3IiwicHJvcGVydGllcyIsImVyciIsImUiLCJmIiwic2V0dGVycyIsIl9jb21tb25WZWRhSnMiLCJkZWZhdWx0IiwiX2NvbW1vbkluZGl2aWR1YWxfbW9kZWxKcyIsIl9jb21tb25CYWNrZW5kSnMiLCJCYWNrZW5kIiwiZXhlY3V0ZSIsIlV0aWwiLCJfZXhwb3J0IiwibWVyZ2VNdXR1YWxDaGFuZ2VzIiwiaGlnaCIsImxvdyIsImJhc2UiLCJrZXkiLCJtZXJnZWQiLCJPYmplY3QiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJoaWdoQmFzZURpZmYiLCJkaWZmIiwibG93QmFzZURpZmYiLCJoaWdoTG93RGlmZiIsImxvd0hpZ2hEaWZmIiwibWlzc2luZyIsImFkZGVkIiwiZGlmZmVyIiwiY29uZmxpY3RzIiwiY2hhbmdlZCIsImRlbHRhIiwibGVuZ3RoIiwiaSIsImhhc1ZhbHVlIiwiaW5kaXZpZHVhbCIsInByb3BlcnR5IiwiYW55IiwiZmlsdGVyIiwidmFsdWVPZiIsInRvSnNvbiIsIkpTT04iLCJzdHJpbmdpZnkiLCJwcm9jZXNzUXVlcnkiLCJ2cWwiLCJzcWwiLCJzb3J0IiwibGltaXQiLCJxdWVyeURlbHRhIiwicHJvY2Vzc0RlbHRhIiwicGF1c2UiLCJmbiIsImZldGNoUmVzdWx0IiwiY3Vyc29yIiwiZnJvbSIsInF1ZXJ5IiwidGlja2V0IiwidG9wIiwidGhlbiIsInF1ZXJ5X3Jlc3VsdCIsImN1cnJDdXJzb3IiLCJlc3RpbWF0ZWQiLCJhcHBlbmQiLCJhcHBseSIsInJlc3VsdCIsImZldGNoaW5nUHJvZ3Jlc3MiLCJjb25zb2xlIiwibG9nIiwiTWF0aCIsImZsb29yIiwiRGF0ZSIsInRvU3RyaW5nIiwidGltZUVuZCIsInNwbGljZSIsInByb2Nlc3NSZXN1bHQiLCJfdHlwZW9mIiwidG9JU09TdHJpbmciLCJ0aW1lIiwicHJvY2Vzc1BvcnRpb24iLCJwb3J0aW9uIiwicmVkdWNlIiwicHJvbSIsIml0ZW0iLCJjYXRjaCIsImVycm9yIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ0b3RhbCIsInByb2Nlc3NpbmdQcm9ncmVzcyIsInNldFRpbWVvdXQiLCJnZW5VcmkiLCJ1aWQiLCJndWlkIiwicmUiLCJ0ZXN0IiwiZCIsImdldFRpbWUiLCJwZXJmb3JtYW5jZSIsIm5vdyIsImMiLCJyIiwicmFuZG9tIiwiaXNJbnRlZ2VyIiwiZm9ybWF0VmFsdWUiLCJmb3JtYXR0ZWQiLCJfaW5zdGFuY2VvZiIsImZsYXR0ZW4iLCJhcnJheSIsIm11dGFibGUiLCJwcm90b3R5cGUiLCJhcnJheVR5cGVTdHIiLCJub2RlcyIsInNsaWNlIiwibm9kZSIsInBvcCIsIl90b0NvbnN1bWFibGVBcnJheSIsInJldmVyc2UiLCJ1bmlxdWUiLCJhcnIiLCJfaXRlcmF0b3IiLCJfc3RlcCIsImlzRmluaXRlIiwiaXNGbG9hdCIsInF1ZXJ5RnJvbUluZGl2aWR1YWxQVCIsIm9yZGVyQnkiLCJtYXRjaCIsImRpciIsInJhbmdlIiwib250b2xvZ3kiLCJnZXQiLCJieSIsImNsYXVzZSIsImlkIiwiYnVpbGRRdWVyeSIsInRhYmxlcyIsIndoZXJlIiwia2V5cyIsIm1hcCIsIkVycm9yIiwidGFibGUiLCJhIiwiYiIsIm9uZVByb3AiLCJzdGFydCIsImVuZCIsInNldEhvdXJzIiwiQm9vbGVhbiIsInEiLCJsaW5lcyIsInRyaW0iLCJzcGxpdCIsImxpbmVRdWVyaWVzIiwibGluZSIsIndvcmRzIiwiYWNjIiwiaiIsIm9yZGVyIiwicXVlcnlGcm9tSW5kaXZpZHVhbFRUX1NVQiIsIndpdGhEZWxldGVkIiwiZ3JvdXBCeSIsInNvcnRTdHIiLCJwcm9wcyIsImJ5Q2xhdXNlIiwiaW5kaXZpZHVhbFBhcmFtIiwicHJvcCIsInN1YiIsImdyb3VwIiwicXVlcnlGcm9tSW5kaXZpZHVhbFRUX0pPSU4iLCJ0YWJsZV9jb3VudGVyIiwiX3R5cGUiLCJ0eXBlX2luZGV4IiwicGFyZW50X3Byb3AiLCJ0eXBlX2luZGV4X3BhcmFtIiwiYWxpYXMiLCJ0YWJsZV9hbGlhc2VkIiwid2hlcmVfYWxpYXNlZCIsInF1ZXJ5RnJvbUluZGl2aWR1YWwiLCJmbGF0IiwiYWxsUHJvcHMiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwid29yZCIsImNvbXBsZXhMYWJlbCIsImNhY2hlIiwicmVfZGF0ZSIsImdldF9jYWNoZWQiLCJnZXRfaW5kaXZpZHVhbCIsImdldF9sb2NhbGl6ZWRfY2hhaW4iLCJfYXJndW1lbnRzIiwiYXJndW1lbnRzIiwic3RhcnRQb2ludCIsImludGVybWVkaWF0ZXMiLCJfbG9vcCIsInBhcnRzIiwiZm9yRWFjaCIsInBhcnQiLCJsYW5nIiwidG9Mb3dlckNhc2UiLCJnZXRUaW1lem9uZU9mZnNldCIsInYiLCJ0ZW1wIiwicHJvcGVydHlJdGVtIiwiX3JldCIsImF2YWlsYWJsZUxhbmd1YWdlcyIsImxhbmd1YWdlcyIsImxhbmd1YWdlVmFsdWUiLCJsYW5ndWFnZVVyaSIsInR5cGVWYWx1ZSIsInR5cGVVcmkiLCJwYXR0ZXJuIiwicmVwbGFjZWQiLCJpbmRleGVzIiwiY2hhaW4iLCJsb2NhbGVkQ2hhaW4iLCJjb25jYXQiLCJhcmVFcXVhbCIsIngiLCJ5IiwiY29uc3RydWN0b3IiLCJwIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc291cmNlLXdlYi9qcy9jb21tb24vdXRpbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBVdGlsaXRpZXNcblxuaW1wb3J0IHZlZGEgZnJvbSAnLi4vY29tbW9uL3ZlZGEuanMnO1xuaW1wb3J0IEluZGl2aWR1YWxNb2RlbCBmcm9tICcuLi9jb21tb24vaW5kaXZpZHVhbF9tb2RlbC5qcyc7XG5pbXBvcnQgQmFja2VuZCBmcm9tICcuLi9jb21tb24vYmFja2VuZC5qcyc7XG5cbmNvbnN0IFV0aWwgPSB7fTtcblxuZXhwb3J0IGRlZmF1bHQgVXRpbDtcblxuVXRpbC5tZXJnZU11dHVhbENoYW5nZXMgPSBmdW5jdGlvbiAoaGlnaCwgbG93LCBiYXNlKSB7XG4gIGxldCBrZXk7IGNvbnN0IG1lcmdlZCA9IHt9O1xuICBmb3IgKGtleSBpbiBiYXNlKSB7XG4gICAgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKGJhc2UsIGtleSkpIHtcbiAgICAgIG1lcmdlZFtrZXldID0gYmFzZVtrZXldO1xuICAgIH1cbiAgfVxuICBjb25zdCBoaWdoQmFzZURpZmYgPSBVdGlsLmRpZmYoaGlnaCwgYmFzZSk7XG4gIGNvbnN0IGxvd0Jhc2VEaWZmID0gVXRpbC5kaWZmKGxvdywgYmFzZSk7XG4gIGNvbnN0IGhpZ2hMb3dEaWZmID0gVXRpbC5kaWZmKGhpZ2gsIGxvdyk7XG4gIGNvbnN0IGxvd0hpZ2hEaWZmID0gVXRpbC5kaWZmKGxvdywgaGlnaCk7XG4gIGZvciAoa2V5IGluIGxvd0Jhc2VEaWZmLm1pc3NpbmcpIHtcbiAgICBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobG93QmFzZURpZmYubWlzc2luZywga2V5KSkge1xuICAgICAgZGVsZXRlIG1lcmdlZFtrZXldO1xuICAgIH1cbiAgfVxuICBmb3IgKGtleSBpbiBoaWdoQmFzZURpZmYubWlzc2luZykge1xuICAgIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChoaWdoQmFzZURpZmYubWlzc2luZywga2V5KSkge1xuICAgICAgZGVsZXRlIG1lcmdlZFtrZXldO1xuICAgIH1cbiAgfVxuICBmb3IgKGtleSBpbiBsb3dCYXNlRGlmZi5hZGRlZCkge1xuICAgIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChsb3dCYXNlRGlmZi5hZGRlZCwga2V5KSkge1xuICAgICAgbWVyZ2VkW2tleV0gPSBsb3dCYXNlRGlmZi5hZGRlZFtrZXldO1xuICAgIH1cbiAgfVxuICBmb3IgKGtleSBpbiBoaWdoQmFzZURpZmYuYWRkZWQpIHtcbiAgICBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwoaGlnaEJhc2VEaWZmLmFkZGVkLCBrZXkpKSB7XG4gICAgICBtZXJnZWRba2V5XSA9IGhpZ2hCYXNlRGlmZi5hZGRlZFtrZXldO1xuICAgIH1cbiAgfVxuICBmb3IgKGtleSBpbiBsb3dCYXNlRGlmZi5kaWZmZXIpIHtcbiAgICBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobG93QmFzZURpZmYuZGlmZmVyLCBrZXkpKSB7XG4gICAgICBtZXJnZWRba2V5XSA9IGxvd0Jhc2VEaWZmLmRpZmZlcltrZXldO1xuICAgIH1cbiAgfVxuICBmb3IgKGtleSBpbiBoaWdoQmFzZURpZmYuZGlmZikge1xuICAgIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChoaWdoQmFzZURpZmYuZGlmZiwga2V5KSkge1xuICAgICAgbWVyZ2VkW2tleV0gPSBoaWdoQmFzZURpZmYuZGlmZmVyW2tleV07XG4gICAgfVxuICB9XG4gIHJldHVybiB7XG4gICAgbWVyZ2VkOiBtZXJnZWQsXG4gICAgY29uZmxpY3RzOiB7XG4gICAgICBoaWdoOiBoaWdoTG93RGlmZi5kaWZmZXIsXG4gICAgICBsb3c6IGxvd0hpZ2hEaWZmLmRpZmZlcixcbiAgICB9LFxuICB9O1xufTtcblxuVXRpbC5kaWZmID0gZnVuY3Rpb24gKGNoYW5nZWQsIGJhc2UpIHtcbiAgY29uc3QgZGVsdGEgPSB7XG4gICAgYWRkZWQ6IHt9LFxuICAgIG1pc3Npbmc6IHt9LFxuICAgIGRpZmZlcjoge30sXG4gIH07XG4gIGxldCBrZXk7IGxldCB2YWx1ZXM7IGxldCB2YWx1ZTsgbGV0IGxlbmd0aDsgbGV0IGk7IGxldCBoYXNWYWx1ZTtcbiAgZm9yIChrZXkgaW4gYmFzZSkge1xuICAgIGlmICggIShrZXkgaW4gY2hhbmdlZCkgKSB7XG4gICAgICBkZWx0YS5taXNzaW5nW2tleV0gPSBiYXNlW2tleV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChrZXkgPT09ICdAJykge1xuICAgICAgICBpZiAoY2hhbmdlZFtrZXldICE9PSBiYXNlW2tleV0pIHtcbiAgICAgICAgICBkZWx0YS5kaWZmZXJba2V5XSA9IGNoYW5nZWRba2V5XTtcbiAgICAgICAgfVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHZhbHVlcyA9IGJhc2Vba2V5XTtcbiAgICAgIGxlbmd0aCA9IHZhbHVlcy5sZW5ndGg7XG4gICAgICBoYXNWYWx1ZSA9IChsZW5ndGggPT09IGNoYW5nZWRba2V5XS5sZW5ndGgpO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aCAmJiBoYXNWYWx1ZTsgaSsrKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWVzW2ldO1xuICAgICAgICBoYXNWYWx1ZSA9IGhhc1ZhbHVlICYmIFV0aWwuaGFzVmFsdWUoY2hhbmdlZCwga2V5LCB2YWx1ZSk7XG4gICAgICB9XG4gICAgICBpZiAoICFoYXNWYWx1ZSApIHtcbiAgICAgICAgZGVsdGEuZGlmZmVyW2tleV0gPSBjaGFuZ2VkW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGZvciAoa2V5IGluIGNoYW5nZWQpIHtcbiAgICBpZiAoICEoa2V5IGluIGJhc2UpICkge1xuICAgICAgZGVsdGEuYWRkZWRba2V5XSA9IGNoYW5nZWRba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRlbHRhO1xufTtcblxuVXRpbC5oYXNWYWx1ZSA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgY29uc3QgYW55ID0gISEoaW5kaXZpZHVhbCAmJiBpbmRpdmlkdWFsW3Byb3BlcnR5XSAmJiBpbmRpdmlkdWFsW3Byb3BlcnR5XS5sZW5ndGgpO1xuICBpZiAoIXZhbHVlKSByZXR1cm4gYW55O1xuICByZXR1cm4gISEoYW55ICYmIGluZGl2aWR1YWxbcHJvcGVydHldLmZpbHRlcigoaSkgPT4ge1xuICAgIHJldHVybiAoaS50eXBlID09PSB2YWx1ZS50eXBlICYmIGkuZGF0YS52YWx1ZU9mKCkgPT09IHZhbHVlLmRhdGEudmFsdWVPZigpKTtcbiAgfSkubGVuZ3RoKTtcbn07XG5cblV0aWwudG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWx1ZSwgbnVsbCwgMik7XG59O1xuXG5VdGlsLnByb2Nlc3NRdWVyeSA9IGZ1bmN0aW9uICh2cWwsIHNxbCwgc29ydCwgbGltaXQsIHF1ZXJ5RGVsdGEsIHByb2Nlc3NEZWx0YSwgcGF1c2UsIGZuKSB7XG4gIGNvbnN0IGZldGNoUmVzdWx0ID0gZnVuY3Rpb24gKGN1cnNvcikge1xuICAgIGNvbnN0IGZyb20gPSBjdXJzb3IgfHwgMDtcbiAgICBCYWNrZW5kLnF1ZXJ5KHtcbiAgICAgIHRpY2tldDogdmVkYS50aWNrZXQsXG4gICAgICBxdWVyeTogdnFsLFxuICAgICAgc3FsOiBzcWwsXG4gICAgICBzb3J0OiBzb3J0IHx8ICdcXCd2LXM6Y3JlYXRlZFxcJyBkZXNjJyxcbiAgICAgIGZyb206IGZyb20sXG4gICAgICB0b3A6IHF1ZXJ5RGVsdGEsXG4gICAgICBsaW1pdDogbGltaXQsXG4gICAgfSkudGhlbigocXVlcnlfcmVzdWx0KSA9PiB7XG4gICAgICBjb25zdCBjdXJyQ3Vyc29yID0gcXVlcnlfcmVzdWx0LmN1cnNvcjtcbiAgICAgIGNvbnN0IGVzdGltYXRlZCA9IHF1ZXJ5X3Jlc3VsdC5lc3RpbWF0ZWQ7XG4gICAgICBpZiAoIGxpbWl0ID4gZXN0aW1hdGVkICkge1xuICAgICAgICBsaW1pdCA9IGVzdGltYXRlZDtcbiAgICAgIH1cbiAgICAgIGFwcGVuZC5hcHBseShyZXN1bHQsIHF1ZXJ5X3Jlc3VsdC5yZXN1bHQpO1xuICAgICAgaWYgKCBjdXJyQ3Vyc29yL2xpbWl0IC0gZmV0Y2hpbmdQcm9ncmVzcyA+PSAwLjA1ICkge1xuICAgICAgICBmZXRjaGluZ1Byb2dyZXNzID0gY3VyckN1cnNvci9saW1pdDtcbiAgICAgICAgY29uc29sZS5sb2coJ0ZldGNoaW5nIHByb2dyZXNzOicsIE1hdGguZmxvb3IoZmV0Y2hpbmdQcm9ncmVzcyAqIDEwMCkgKyAnJScsICcoJyArIGN1cnJDdXJzb3IsICdvZicsIGxpbWl0ICsgJyknKTtcbiAgICAgIH1cbiAgICAgIGlmICggY3VyckN1cnNvciA9PT0gZXN0aW1hdGVkIHx8IGN1cnJDdXJzb3IgPj0gbGltaXQgKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKChuZXcgRGF0ZSgpKS50b1N0cmluZygpLCAnRmV0Y2hpbmcgZG9uZTonLCBsaW1pdCk7XG4gICAgICAgIGNvbnNvbGUudGltZUVuZCgnRmV0Y2hpbmcgdG90YWwnKTtcbiAgICAgICAgcmVzdWx0LnNwbGljZShsaW1pdCAtIGN1cnJDdXJzb3IgfHwgbGltaXQpOyAvLyBjdXQgcmVzdWx0IHRvIGxpbWl0XG4gICAgICAgIFV0aWwucHJvY2Vzc1Jlc3VsdChyZXN1bHQsIHByb2Nlc3NEZWx0YSwgcGF1c2UsIGZuKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZldGNoUmVzdWx0KHF1ZXJ5X3Jlc3VsdC5jdXJzb3IpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGlmICh0eXBlb2YgdnFsID09PSAnb2JqZWN0Jykge1xuICAgIHNvcnQgPSB2cWwuc29ydDtcbiAgICBsaW1pdCA9IHZxbC5saW1pdDtcbiAgICBxdWVyeURlbHRhID0gdnFsLnF1ZXJ5RGVsdGE7XG4gICAgcHJvY2Vzc0RlbHRhID0gdnFsLnByb2Nlc3NEZWx0YTtcbiAgICBwYXVzZSA9IHZxbC5wYXVzZTtcbiAgICBmbiA9IHZxbC5mbjtcbiAgICBzcWwgPSB2cWwuc3FsO1xuICAgIHZxbCA9IHZxbC52cWw7XG4gIH1cbiAgY29uc29sZS5sb2coKG5ldyBEYXRlKCkpLnRvSVNPU3RyaW5nKCksICdQcm9jZXNzIHF1ZXJ5IHJlc3VsdHMgfHx8JywgJ3F1ZXJ5OicsIHZxbCB8fCBzcWwsICcgfCAnLCAnbGltaXQ6JywgbGltaXQsICcgfCAnLCAncXVlcnkgZGVsdGE6JywgcXVlcnlEZWx0YSwgJyB8ICcsICdwcm9jZXNzIGRlbHRhOicsIHByb2Nlc3NEZWx0YSwgJyB8ICcsICdwYXVzZTonLCBwYXVzZSk7XG4gIGNvbnN0IHJlc3VsdCA9IFtdOyBjb25zdCBhcHBlbmQgPSBbXS5wdXNoOyBsZXQgZmV0Y2hpbmdQcm9ncmVzcyA9IDA7XG4gIGNvbnNvbGUudGltZSgnRmV0Y2hpbmcgdG90YWwnKTtcbiAgZmV0Y2hSZXN1bHQoKTtcbn07XG5cblV0aWwucHJvY2Vzc1Jlc3VsdCA9IGZ1bmN0aW9uIChyZXN1bHQsIGRlbHRhLCBwYXVzZSwgZm4pIHtcbiAgY29uc3QgcHJvY2Vzc1BvcnRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgcG9ydGlvbiA9IHJlc3VsdC5zcGxpY2UoMCwgZGVsdGEpO1xuICAgIHBvcnRpb24ucmVkdWNlKChwcm9tLCBpdGVtKSA9PiB7XG4gICAgICByZXR1cm4gcHJvbS50aGVuKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIGZuKGl0ZW0pO1xuICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHByb2Nlc3NpbmcgaXRlbTonLCBpdGVtKTtcbiAgICAgIH0pO1xuICAgIH0sIFByb21pc2UucmVzb2x2ZSgpKS50aGVuKCgpID0+IHtcbiAgICAgIGlmICggKHRvdGFsIC0gcmVzdWx0Lmxlbmd0aCkgLyB0b3RhbCAtIHByb2Nlc3NpbmdQcm9ncmVzcyA+PSAwLjA1ICkge1xuICAgICAgICBwcm9jZXNzaW5nUHJvZ3Jlc3MgPSAodG90YWwgLSByZXN1bHQubGVuZ3RoKSAvIHRvdGFsO1xuICAgICAgICBjb25zb2xlLmxvZygnUHJvY2Vzc2luZyBwcm9ncmVzczonLCBNYXRoLmZsb29yKHByb2Nlc3NpbmdQcm9ncmVzcyAqIDEwMCkgKyAnJScsICcoJyArICh0b3RhbCAtIHJlc3VsdC5sZW5ndGgpLCAnb2YnLCB0b3RhbCArICcpJyk7XG4gICAgICB9XG4gICAgICBpZiAoIHJlc3VsdC5sZW5ndGggKSB7XG4gICAgICAgIHNldFRpbWVvdXQgPyBzZXRUaW1lb3V0KHByb2Nlc3NQb3J0aW9uLCBwYXVzZSkgOiBwcm9jZXNzUG9ydGlvbigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1Byb2Nlc3NpbmcgZG9uZTonLCB0b3RhbCk7XG4gICAgICAgIGNvbnNvbGUudGltZUVuZCgnUHJvY2Vzc2luZyB0b3RhbCcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHRvdGFsID0gcmVzdWx0Lmxlbmd0aDtcbiAgbGV0IHByb2Nlc3NpbmdQcm9ncmVzcyA9IDA7XG4gIGNvbnNvbGUubG9nKChuZXcgRGF0ZSgpKS50b0lTT1N0cmluZygpLCAnUHJvY2VzcyByZXN1bHRzIHx8fCcsICd0b3RhbDonLCB0b3RhbCwgJyB8ICcsICdkZWx0YTonLCBkZWx0YSwgJyB8ICcsICdwYXVzZTonLCBwYXVzZSk7XG4gIGNvbnNvbGUudGltZSgnUHJvY2Vzc2luZyB0b3RhbCcpO1xuICBwcm9jZXNzUG9ydGlvbigpO1xufTtcblxuVXRpbC5nZW5VcmkgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHVpZCA9IFV0aWwuZ3VpZCgpOyBjb25zdCByZSA9IC9eXFxkLztcbiAgcmV0dXJuIChyZS50ZXN0KHVpZCkgPyAnZDphJyArIHVpZCA6ICdkOicgKyB1aWQpO1xufTtcblxuVXRpbC5ndWlkID0gZnVuY3Rpb24gKCkge1xuICBsZXQgZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICBpZiAodHlwZW9mIHBlcmZvcm1hbmNlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgcGVyZm9ybWFuY2Uubm93ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZCArPSBwZXJmb3JtYW5jZS5ub3coKTsgLy8gdXNlIGhpZ2gtcHJlY2lzaW9uIHRpbWVyIGlmIGF2YWlsYWJsZVxuICB9XG4gIHJldHVybiAneHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHgnLnJlcGxhY2UoL3gvZywgZnVuY3Rpb24gKGMpIHtcbiAgICBjb25zdCByID0gKGQgKyBNYXRoLnJhbmRvbSgpICogMzYpICUgMzYgfCAwO1xuICAgIGQgPSBNYXRoLmZsb29yKGQgLyAzNik7XG4gICAgcmV0dXJuIHIudG9TdHJpbmcoMzYpO1xuICB9KTtcbn07XG5cblV0aWwuaXNJbnRlZ2VyID0gZnVuY3Rpb24gKG4pIHtcbiAgcmV0dXJuIG4gJSAxID09PSAwO1xufTtcblxuLyoqXG4gKiBQcmVmaXggd2l0aCAwIGlmIG51bWJlciBoYXMgc2luZ2xlIGRpZ2l0XG4gKiBAcGFyYW0ge251bWJlcn0gblxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiB6ZXJvUHJlZiAobikge1xuICByZXR1cm4gbiA+IDkgPyBTdHJpbmcobikgOiAnMCcgKyBuO1xufVxuXG5VdGlsLmZvcm1hdFZhbHVlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIGxldCBmb3JtYXR0ZWQ7XG4gIHN3aXRjaCAodHJ1ZSkge1xuICBjYXNlIHZhbHVlIGluc3RhbmNlb2YgRGF0ZTpcbiAgICBmb3JtYXR0ZWQgPSBmb3JtYXREYXRlKHZhbHVlKTtcbiAgICBicmVhaztcbiAgY2FzZSB2YWx1ZSBpbnN0YW5jZW9mIE51bWJlcjpcbiAgY2FzZSB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInOlxuICAgIGZvcm1hdHRlZCA9IGZvcm1hdE51bWJlcih2YWx1ZSk7XG4gICAgYnJlYWs7XG4gIGNhc2UgdmFsdWUgaW5zdGFuY2VvZiBTdHJpbmc6XG4gIGNhc2UgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJzpcbiAgICBmb3JtYXR0ZWQgPSBmb3JtYXRTdHJpbmcodmFsdWUpO1xuICAgIGJyZWFrO1xuICBkZWZhdWx0OlxuICAgIGZvcm1hdHRlZCA9IHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcgPyB2YWx1ZS50b1N0cmluZygpIDogdmFsdWU7XG4gIH1cbiAgcmV0dXJuIGZvcm1hdHRlZDtcbn07XG5cbi8qKlxuICogRm9ybWF0IHN0cmluZ1xuICogQHBhcmFtIHtPYmplY3R9IHZhbHVlXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGZvcm1hdFN0cmluZyAodmFsdWUpIHtcbiAgY29uc3QgY29uZGl0aW9uID0gIXZhbHVlLmxhbmd1YWdlIHx8IHZhbHVlLmxhbmd1YWdlID09PSAnTk9ORScgfHwgKCB2ZWRhLnVzZXIgJiYgdmVkYS51c2VyLnByZWZlcmVuY2VzICYmIHZlZGEudXNlci5wcmVmZXJlbmNlcy5sYW5ndWFnZSAmJiB2YWx1ZS5sYW5ndWFnZSBpbiB2ZWRhLnVzZXIucHJlZmVyZW5jZXMubGFuZ3VhZ2UgKTtcbiAgcmV0dXJuIGNvbmRpdGlvbiA/IHZhbHVlIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIEZvcm1hdCBkYXRlXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGVcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZm9ybWF0RGF0ZSAoZGF0ZSkge1xuICBjb25zdCBkYXkgPSBkYXRlLmdldERhdGUoKTtcbiAgY29uc3QgbW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xuICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICBjb25zdCBob3VycyA9IGRhdGUuZ2V0SG91cnMoKTtcbiAgY29uc3QgbWlucyA9IGRhdGUuZ2V0TWludXRlcygpO1xuICBjb25zdCBzZWNzID0gZGF0ZS5nZXRTZWNvbmRzKCk7XG5cbiAgY29uc3QgVVRDaG91cnMgPSBkYXRlLmdldFVUQ0hvdXJzKCk7XG4gIGNvbnN0IFVUQ21pbnMgPSBkYXRlLmdldFVUQ01pbnV0ZXMoKTtcbiAgY29uc3QgVVRDc2VjcyA9IGRhdGUuZ2V0VVRDU2Vjb25kcygpO1xuICBpZiAoIChVVENob3VycyArIFVUQ21pbnMgKyBVVENzZWNzKSA9PT0gMCApIHtcbiAgICByZXR1cm4gW3plcm9QcmVmKGRheSksIHplcm9QcmVmKG1vbnRoKSwgeWVhcl0uam9pbignLicpO1xuICB9XG4gIGxldCBmZGF0ZSA9IFt6ZXJvUHJlZihkYXkpLCB6ZXJvUHJlZihtb250aCksIHllYXJdLmpvaW4oJy4nKTtcbiAgaWYgKGZkYXRlID09PSAnMDEuMDEuMTk3MCcpIGZkYXRlID0gJyc7XG5cbiAgbGV0IGZ0aW1lID0gW3plcm9QcmVmKGhvdXJzKSwgemVyb1ByZWYobWlucyksIHplcm9QcmVmKHNlY3MpXS5qb2luKCc6Jyk7XG4gIGlmIChmdGltZSA9PT0gJzAwOjAwOjAwJykge1xuICAgIGZ0aW1lID0gJyc7XG4gIH0gZWxzZSBpZiAoc2VjcyA9PT0gMCkge1xuICAgIGZ0aW1lID0gZnRpbWUuc3Vic3RyaW5nKDAsIDUpO1xuICB9XG5cbiAgcmV0dXJuIFtmZGF0ZSwgZnRpbWVdLmpvaW4oJyAnKTtcbn1cblxuLyoqXG4gKiBGb3JtYXQgZGF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IG5cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZm9ybWF0TnVtYmVyIChuKSB7XG4gIHJldHVybiBOdW1iZXIobikudG9Mb2NhbGVTdHJpbmcoJ3J1LVJVJywge1xuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMCxcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIwLFxuICB9KS5yZXBsYWNlKC9cXHMvZywgJyAnKTtcbn1cblxuLypcbiAqIGZyb20gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yNzI2NjU1MC9ob3ctdG8tZmxhdHRlbi1uZXN0ZWQtYXJyYXktaW4tamF2YXNjcmlwdFxuICogYnkgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3VzZXJzLzIzODk3MjAvYWR1Y2hcbiAqXG4gKiBUaGlzIGlzIGRvbmUgaW4gYSBsaW5lYXIgdGltZSBPKG4pIHdpdGhvdXQgcmVjdXJzaW9uXG4gKiBtZW1vcnkgY29tcGxleGl0eSBpcyBPKDEpIG9yIE8obikgaWYgbXV0YWJsZSBwYXJhbSBpcyBzZXQgdG8gZmFsc2VcbiAqL1xuVXRpbC5mbGF0dGVuID0gZnVuY3Rpb24gKGFycmF5LCBtdXRhYmxlKSB7XG4gIGNvbnN0IHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbiAgY29uc3QgYXJyYXlUeXBlU3RyID0gJ1tvYmplY3QgQXJyYXldJztcblxuICBjb25zdCByZXN1bHQgPSBbXTtcbiAgY29uc3Qgbm9kZXMgPSAobXV0YWJsZSAmJiBhcnJheSkgfHwgYXJyYXkuc2xpY2UoKTtcbiAgbGV0IG5vZGU7XG5cbiAgaWYgKCFhcnJheS5sZW5ndGgpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgbm9kZSA9IG5vZGVzLnBvcCgpO1xuXG4gIGRvIHtcbiAgICBpZiAodG9TdHJpbmcuY2FsbChub2RlKSA9PT0gYXJyYXlUeXBlU3RyKSB7XG4gICAgICBub2Rlcy5wdXNoKC4uLm5vZGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQucHVzaChub2RlKTtcbiAgICB9XG4gIH0gd2hpbGUgKG5vZGVzLmxlbmd0aCAmJiAobm9kZSA9IG5vZGVzLnBvcCgpKSAhPT0gdW5kZWZpbmVkKTtcblxuICByZXN1bHQucmV2ZXJzZSgpOyAvLyB3ZSByZXZlcnNlIHJlc3VsdCB0byByZXN0b3JlIHRoZSBvcmlnaW5hbCBvcmRlclxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuVXRpbC51bmlxdWUgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGNvbnN0IG4gPSB7fTsgY29uc3QgciA9IFtdO1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgYXJyKSB7XG4gICAgaWYgKCFuW2l0ZW1dKSB7XG4gICAgICBuW2l0ZW1dID0gdHJ1ZTtcbiAgICAgIHIucHVzaChpdGVtKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHI7XG59O1xuXG5OdW1iZXIuaXNGaW5pdGUgPSBOdW1iZXIuaXNGaW5pdGUgfHwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmIGlzRmluaXRlKHZhbHVlKTtcbn07XG5OdW1iZXIuaXNJbnRlZ2VyID0gTnVtYmVyLmlzSW50ZWdlciB8fCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiZcbiAgICBOdW1iZXIuaXNGaW5pdGUodmFsdWUpICYmXG4gICAgISh2YWx1ZSAlIDEpO1xufTtcbk51bWJlci5pc0Zsb2F0ID0gTnVtYmVyLmlzRmxvYXQgfHwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmXG4gICAgTnVtYmVyLmlzRmluaXRlKHZhbHVlKSAmJlxuICAgICh2YWx1ZSAlIDEpO1xufTtcblxuVXRpbC5xdWVyeUZyb21JbmRpdmlkdWFsUFQgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgc29ydCkge1xuICBjb25zdCBvcmRlckJ5ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0eXBlb2Ygc29ydCA9PT0gJ3N0cmluZycgfHwgc29ydCBpbnN0YW5jZW9mIFN0cmluZykge1xuICAgICAgcmV0dXJuIHNvcnQucmVwbGFjZSgvJyguKz8pJ1xccysoXFx3KykvZ2ksIGZ1bmN0aW9uIChtYXRjaCwgcHJvcGVydHlfdXJpLCBkaXIpIHtcbiAgICAgICAgY29uc3QgcmFuZ2UgPSB2ZWRhLm9udG9sb2d5LnByb3BlcnRpZXNbcHJvcGVydHlfdXJpXS5nZXQoJ3JkZnM6cmFuZ2UnKVswXTtcbiAgICAgICAgY29uc3QgYnkgPSBwcm9wZXJ0eV91cmkucmVwbGFjZShyZSwgJ18nKTtcbiAgICAgICAgbGV0IGNsYXVzZTtcbiAgICAgICAgc3dpdGNoIChyYW5nZS5pZCkge1xuICAgICAgICBjYXNlICd4c2Q6ZGF0ZVRpbWUnOlxuICAgICAgICAgIGNsYXVzZSA9IGJ5ICsgJy5kYXRlICcgKyBkaXI7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3hzZDpib29sZWFuJzpcbiAgICAgICAgY2FzZSAneHNkOmludGVnZXInOlxuICAgICAgICAgIGNsYXVzZSA9IGJ5ICsgJy5pbnQgJyArIGRpcjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAneHNkOmRlY2ltYWwnOlxuICAgICAgICAgIGNsYXVzZSA9IGJ5ICsgJy5kZWMgJyArIGRpcjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAneHNkOnN0cmluZyc6XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY2xhdXNlID0gYnkgKyAnLnN0ciAnICsgZGlyO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjbGF1c2U7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgYnVpbGRRdWVyeSA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCB0YWJsZXMgPSBbXTtcbiAgICBsZXQgaSA9IC0xO1xuICAgIGNvbnN0IHdoZXJlID0gT2JqZWN0LmtleXMoaW5kaXZpZHVhbC5wcm9wZXJ0aWVzKVxuICAgICAgLm1hcCgocHJvcGVydHlfdXJpKSA9PiB7XG4gICAgICAgIGlmIChwcm9wZXJ0eV91cmkuaW5kZXhPZignLicpID49IDAgfHwgcHJvcGVydHlfdXJpLmluZGV4T2YoJyonKSA+PSAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdWUUwgc3R5bGUgcHJvcGVydHkgbmVzdGluZzogJyArIHByb3BlcnR5X3VyaSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BlcnR5X3VyaSA9PT0gJ0AnKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGkrKztcbiAgICAgICAgY29uc3QgdGFibGUgPSAndmVkYV9wdC5gJyArIHByb3BlcnR5X3VyaSArICdgIGFzIHAnICsgaTtcbiAgICAgICAgdGFibGVzW2ldID0gdGFibGU7XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IGluZGl2aWR1YWwuZ2V0KHByb3BlcnR5X3VyaSkuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgIGlmIChhIDwgYikgcmV0dXJuIC0xO1xuICAgICAgICAgIGVsc2UgaWYgKGEgPT09IGIpIHJldHVybiAwO1xuICAgICAgICAgIGVsc2UgcmV0dXJuIDE7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgb25lUHJvcDtcbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgIGNhc2UgTnVtYmVyLmlzSW50ZWdlcih2YWx1ZXNbMF0pOlxuICAgICAgICAgIG9uZVByb3AgPSAncCcgKyBpICsgJy5pbnRbMV0gPj0gJyArIHZhbHVlc1swXSArICcgQU5EIHAnICsgaSArICcuaW50WzFdIDw9ICcgKyB2YWx1ZXNbdmFsdWVzLmxlbmd0aC0xXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBOdW1iZXIuaXNGbG9hdCh2YWx1ZXNbMF0pOlxuICAgICAgICAgIG9uZVByb3AgPSAncCcgKyBpICsgJy5kZWNbMV0gPj0gJyArIHZhbHVlc1swXSArICcgQU5EIHAnICsgaSArICcuZGVjWzFdIDw9ICcgKyB2YWx1ZXNbdmFsdWVzLmxlbmd0aC0xXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB2YWx1ZXNbMF0gaW5zdGFuY2VvZiBEYXRlOlxuICAgICAgICAgIGxldCBzdGFydCA9IG5ldyBEYXRlKHZhbHVlc1swXSk7XG4gICAgICAgICAgbGV0IGVuZCA9IG5ldyBEYXRlKHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTFdKTtcbiAgICAgICAgICBzdGFydC5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgICAgICBlbmQuc2V0SG91cnMoMjMsIDU5LCA1OSwgOTk5KTtcbiAgICAgICAgICBzdGFydCA9IE1hdGguZmxvb3Ioc3RhcnQudmFsdWVPZigpIC8gMTAwMCk7XG4gICAgICAgICAgZW5kID0gTWF0aC5mbG9vcihlbmQudmFsdWVPZigpIC8gMTAwMCk7XG4gICAgICAgICAgb25lUHJvcCA9ICdwJyArIGkgKyAnLmRhdGVbMV0gPj0gdG9EYXRlVGltZSgnICsgc3RhcnQgKyAnKSBBTkQgcCcgKyBpICsgJy5kYXRlWzFdIDw9IHRvRGF0ZVRpbWUoJyArIGVuZCArICcpJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0eXBlb2YgdmFsdWVzWzBdID09PSAnYm9vbGVhbic6XG4gICAgICAgICAgb25lUHJvcCA9IHZhbHVlc1xuICAgICAgICAgICAgLm1hcCgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuICdwJyArIGkgKyAnLmludFsxXSA9ICcgKyAodmFsdWUgPyAxIDogMCk7XG4gICAgICAgICAgICB9KS5qb2luKCcgT1IgJyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdmFsdWVzWzBdIGluc3RhbmNlb2YgU3RyaW5nOlxuICAgICAgICAgIG9uZVByb3AgPSB2YWx1ZXNcbiAgICAgICAgICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgICAgICAgICAgIC5tYXAoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHEgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgY29uc3QgbGluZXMgPSBxLnRyaW0oKS5zcGxpdCgnXFxuJyk7XG4gICAgICAgICAgICAgIGNvbnN0IGxpbmVRdWVyaWVzID0gbGluZXMubWFwKChsaW5lKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgd29yZHMgPSBsaW5lXG4gICAgICAgICAgICAgICAgICAudHJpbSgpXG4gICAgICAgICAgICAgICAgICAucmVwbGFjZSgvWy0qXFxzXSsvZywgJyAnKVxuICAgICAgICAgICAgICAgICAgLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdvcmRzLmxlbmd0aCAmJiAnYXJyYXlTdHJpbmdDb25jYXQoJyArICdwJyArIGkgKyAnLnN0ciwgXFwnIFxcJykgTElLRSBcXCclJyArIHdvcmRzLmpvaW4oJyUgJScpLnJlcGxhY2UoL1xcJy9nLCAnXFxcXFxcJycpLnJlcGxhY2UoL1xcXCIvZywgJ1xcJycpICsgJyVcXCcnO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcmV0dXJuIGxpbmVRdWVyaWVzLmZpbHRlcihCb29sZWFuKS5qb2luKCcgT1IgJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgICAgICAgLmpvaW4oJyBPUiAnKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB2YWx1ZXNbMF0gaW5zdGFuY2VvZiBJbmRpdmlkdWFsTW9kZWw6XG4gICAgICAgICAgb25lUHJvcCA9IHZhbHVlc1xuICAgICAgICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgICAgICAgLm1hcCgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgaWYgKCB2YWx1ZS5pc05ldygpICkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2hhcygnICsgJ3AnICsgaSArICcuc3RyLCBcXCcnICsgdmFsdWUuaWQgKyAnXFwnKSc7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAgICAgICAuam9pbignIE9SICcpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmICghb25lUHJvcCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb25lUHJvcC5pbmRleE9mKCcgT1IgJykgPiAwID8gJyggJyArIG9uZVByb3AgKyAnICknIDogb25lUHJvcDtcbiAgICAgIH0pXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAuam9pbignIEFORCAnKTtcblxuICAgIGNvbnN0IGZyb20gPSB0YWJsZXMucmVkdWNlKChhY2MsIHRhYmxlLCBqKSA9PiB7XG4gICAgICByZXR1cm4gYWNjID8gYWNjICsgJyBKT0lOICcgKyB0YWJsZSArICcgT04gcCcgKyAoaiAtIDEpICsgJy5pZCA9IHAnICsgaiArICcuaWQnIDogdGFibGU7XG4gICAgfSwgJycpO1xuXG4gICAgcmV0dXJuICdTRUxFQ1QgRElTVElOQ1QgaWQgRlJPTSAnICsgZnJvbSArICh3aGVyZSA/ICcgV0hFUkUgJyArIHdoZXJlIDogJycpO1xuICB9O1xuXG4gIGNvbnN0IHJlID0gL1teYS16QS1aMC05XS9nO1xuICB0cnkge1xuICAgIGxldCBxdWVyeSA9IGJ1aWxkUXVlcnkoKTtcbiAgICBjb25zdCBvcmRlciA9IG9yZGVyQnkoKTtcbiAgICBxdWVyeSA9IHF1ZXJ5ICYmIG9yZGVyID8gcXVlcnkgKyAnIE9SREVSIEJZICcgKyBvcmRlciA6IHF1ZXJ5O1xuICAgIHJldHVybiBxdWVyeTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBidWlsZGluZyBxdWVyeScpO1xuICB9XG59O1xuXG5VdGlsLnF1ZXJ5RnJvbUluZGl2aWR1YWxUVF9TVUIgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgc29ydCwgd2l0aERlbGV0ZWQpIHtcbiAgY29uc3QgZ3JvdXBCeSA9IGZ1bmN0aW9uIChzb3J0U3RyKSB7XG4gICAgY29uc3QgYnkgPSAnaWQnO1xuICAgIGxldCBwcm9wcztcbiAgICBpZiAodHlwZW9mIHNvcnRTdHIgPT09ICdzdHJpbmcnIHx8IHNvcnRTdHIgaW5zdGFuY2VvZiBTdHJpbmcpIHtcbiAgICAgIHByb3BzID0gc29ydFN0ci5yZXBsYWNlKC8nKC4rPyknXFxzKyhcXHcrKS9naSwgZnVuY3Rpb24gKG1hdGNoLCBwcm9wZXJ0eV91cmkpIHtcbiAgICAgICAgY29uc3QgcmFuZ2UgPSB2ZWRhLm9udG9sb2d5LnByb3BlcnRpZXNbcHJvcGVydHlfdXJpXS5nZXQoJ3JkZnM6cmFuZ2UnKVswXTtcbiAgICAgICAgbGV0IGJ5Q2xhdXNlID0gcHJvcGVydHlfdXJpLnJlcGxhY2UocmUsICdfJyk7XG4gICAgICAgIHN3aXRjaCAocmFuZ2UuaWQpIHtcbiAgICAgICAgY2FzZSAneHNkOmRhdGVUaW1lJzpcbiAgICAgICAgICBieUNsYXVzZSA9IGJ5Q2xhdXNlICsgJ19kYXRlJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAneHNkOmJvb2xlYW4nOlxuICAgICAgICBjYXNlICd4c2Q6aW50ZWdlcic6XG4gICAgICAgICAgYnlDbGF1c2UgPSBieUNsYXVzZSArICdfaW50JztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAneHNkOmRlY2ltYWwnOlxuICAgICAgICAgIGJ5Q2xhdXNlID0gYnlDbGF1c2UgKyAnX2RlYyc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3hzZDpzdHJpbmcnOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJ5Q2xhdXNlID0gYnlDbGF1c2UgKyAnX3N0cic7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ5Q2xhdXNlO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBwcm9wcyA/IGJ5ICsgJywgJyArIHByb3BzIDogYnk7XG4gIH07XG5cbiAgY29uc3Qgb3JkZXJCeSA9IGZ1bmN0aW9uIChzb3J0U3RyKSB7XG4gICAgaWYgKHR5cGVvZiBzb3J0U3RyID09PSAnc3RyaW5nJyB8fCBzb3J0U3RyIGluc3RhbmNlb2YgU3RyaW5nKSB7XG4gICAgICByZXR1cm4gc29ydFN0ci5yZXBsYWNlKC8nKC4rPyknXFxzKyhcXHcrKS9naSwgZnVuY3Rpb24gKG1hdGNoLCBwcm9wZXJ0eV91cmksIGRpcikge1xuICAgICAgICBjb25zdCByYW5nZSA9IHZlZGEub250b2xvZ3kucHJvcGVydGllc1twcm9wZXJ0eV91cmldLmdldCgncmRmczpyYW5nZScpWzBdO1xuICAgICAgICBjb25zdCBieSA9IHByb3BlcnR5X3VyaS5yZXBsYWNlKHJlLCAnXycpO1xuICAgICAgICBsZXQgY2xhdXNlO1xuICAgICAgICBzd2l0Y2ggKHJhbmdlLmlkKSB7XG4gICAgICAgIGNhc2UgJ3hzZDpkYXRlVGltZSc6XG4gICAgICAgICAgY2xhdXNlID0gYnkgKyAnX2RhdGUgJyArIGRpcjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAneHNkOmJvb2xlYW4nOlxuICAgICAgICBjYXNlICd4c2Q6aW50ZWdlcic6XG4gICAgICAgICAgY2xhdXNlID0gYnkgKyAnX2ludCAnICsgZGlyO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd4c2Q6ZGVjaW1hbCc6XG4gICAgICAgICAgY2xhdXNlID0gYnkgKyAnX2RlYyAnICsgZGlyO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd4c2Q6c3RyaW5nJzpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjbGF1c2UgPSBieSArICdfc3RyICcgKyBkaXI7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNsYXVzZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBidWlsZFF1ZXJ5ID0gZnVuY3Rpb24gKGluZGl2aWR1YWxQYXJhbSkge1xuICAgIGlmIChpbmRpdmlkdWFsUGFyYW0uaWQgaW4gdmlzaXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICB2aXNpdGVkW2luZGl2aWR1YWxQYXJhbS5pZF0gPSB0cnVlO1xuICAgIH1cbiAgICBsZXQgd2hlcmUgPSBPYmplY3Qua2V5cyhpbmRpdmlkdWFsUGFyYW0ucHJvcGVydGllcylcbiAgICAgIC5tYXAoKHByb3BlcnR5X3VyaSwgaSkgPT4ge1xuICAgICAgICBpZiAocHJvcGVydHlfdXJpLmluZGV4T2YoJy4nKSA+PSAwIHx8IHByb3BlcnR5X3VyaS5pbmRleE9mKCcqJykgPj0gMCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVlFMIHN0eWxlIHByb3BlcnR5IG5lc3Rpbmc6ICcgKyBwcm9wZXJ0eV91cmkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wZXJ0eV91cmkgPT09ICdAJyB8fCBwcm9wZXJ0eV91cmkgPT09ICdyZGY6dHlwZScpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmFsdWVzID0gaW5kaXZpZHVhbFBhcmFtLmdldChwcm9wZXJ0eV91cmkpLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICBpZiAoYSA8IGIpIHJldHVybiAtMTtcbiAgICAgICAgICBlbHNlIGlmIChhID09PSBiKSByZXR1cm4gMDtcbiAgICAgICAgICBlbHNlIHJldHVybiAxO1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IHByb3AgPSBwcm9wZXJ0eV91cmkucmVwbGFjZShyZSwgJ18nKTtcbiAgICAgICAgbGV0IG9uZVByb3A7XG4gICAgICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICBjYXNlIE51bWJlci5pc0ludGVnZXIodmFsdWVzWzBdKTpcbiAgICAgICAgICBvbmVQcm9wID0gcHJvcCArICdfaW50WzFdID49ICcgKyB2YWx1ZXNbMF0gKyAnIEFORCAnICsgcHJvcCArICdfaW50WzFdIDw9ICcgKyB2YWx1ZXNbdmFsdWVzLmxlbmd0aC0xXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBOdW1iZXIuaXNGbG9hdCh2YWx1ZXNbMF0pOlxuICAgICAgICAgIG9uZVByb3AgPSBwcm9wICsgJ19kZWNbMV0gPj0gJyArIHZhbHVlc1swXSArICcgQU5EICcgKyBwcm9wICsgJ19kZWNbMV0gPD0gJyArIHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTFdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIC8vIERhdGVcbiAgICAgICAgY2FzZSB2YWx1ZXNbMF0gaW5zdGFuY2VvZiBEYXRlOlxuICAgICAgICAgIGxldCBzdGFydCA9IG5ldyBEYXRlKHZhbHVlc1swXSk7XG4gICAgICAgICAgbGV0IGVuZCA9IG5ldyBEYXRlKHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTFdKTtcbiAgICAgICAgICBzdGFydC5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgICAgICBlbmQuc2V0SG91cnMoMjMsIDU5LCA1OSwgOTk5KTtcbiAgICAgICAgICBzdGFydCA9IE1hdGguZmxvb3Ioc3RhcnQudmFsdWVPZigpIC8gMTAwMCk7XG4gICAgICAgICAgZW5kID0gTWF0aC5mbG9vcihlbmQudmFsdWVPZigpIC8gMTAwMCk7XG4gICAgICAgICAgb25lUHJvcCA9IHByb3AgKyAnX2RhdGVbMV0gPj0gdG9EYXRlVGltZSgnICsgc3RhcnQgKyAnKSBBTkQgJyArIHByb3AgKyAnX2RhdGVbMV0gPD0gdG9EYXRlVGltZSgnICsgZW5kICsgJyknO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHR5cGVvZiB2YWx1ZXNbMF0gPT09ICdib29sZWFuJzpcbiAgICAgICAgICBvbmVQcm9wID0gdmFsdWVzXG4gICAgICAgICAgICAubWFwKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gcHJvcCArICdfaW50WzFdID0gJyArICh2YWx1ZSA/IDEgOiAwKTtcbiAgICAgICAgICAgIH0pLmpvaW4oJyBPUiAnKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB2YWx1ZXNbMF0gaW5zdGFuY2VvZiBTdHJpbmc6XG4gICAgICAgICAgb25lUHJvcCA9IHZhbHVlc1xuICAgICAgICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgICAgICAgLm1hcCgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgcSA9IHZhbHVlO1xuICAgICAgICAgICAgICBjb25zdCBsaW5lcyA9IHEudHJpbSgpLnNwbGl0KCdcXG4nKTtcbiAgICAgICAgICAgICAgY29uc3QgbGluZVF1ZXJpZXMgPSBsaW5lcy5tYXAoKGxpbmUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB3b3JkcyA9IGxpbmVcbiAgICAgICAgICAgICAgICAgIC50cmltKClcbiAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9bLSpcXHNdKy9nLCAnICcpXG4gICAgICAgICAgICAgICAgICAuc3BsaXQoJyAnKTtcbiAgICAgICAgICAgICAgICAvLyAndGV4dCcgaXMgYSBzcGVjaWFsIHNpbmdsZS12YWx1ZSBjb2x1bW4gd2l0aG91dCBzdWZmaXggd2l0aCBhbGwgdGV4dCBjb250ZW50IG9mIGFuIGluZGl2aWR1YWxcbiAgICAgICAgICAgICAgICBpZiAoIC9cXC5cXCokLy50ZXN0KHByb3ApICkge1xuICAgICAgICAgICAgICAgICAgcHJvcCA9IHByb3AucmVwbGFjZSgnKicsICd0ZXh0Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICggL1xcLnRleHQkLy50ZXN0KHByb3ApICkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHdvcmRzLmxlbmd0aCAmJiBwcm9wICsgJyBMSUtFIFxcJyUnICsgd29yZHMuam9pbignJSAlJykucmVwbGFjZSgvXFwnL2csICdcXFxcXFwnJykucmVwbGFjZSgvXFxcIi9nLCAnXFwnJykgKyAnJVxcJyc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB3b3Jkcy5sZW5ndGggJiYgJ2xvd2VyVVRGOChhcnJheVN0cmluZ0NvbmNhdCgnICsgcHJvcCArICdfc3RyLCBcXCcgXFwnKSkgTElLRSBsb3dlclVURjgoXFwnJScgKyB3b3Jkcy5qb2luKCclICUnKS5yZXBsYWNlKC9cXCcvZywgJ1xcXFxcXCcnKS5yZXBsYWNlKC9cXFwiL2csICdcXCcnKSArICclXFwnKSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcmV0dXJuIGxpbmVRdWVyaWVzLmZpbHRlcihCb29sZWFuKS5qb2luKCcgT1IgJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgICAgICAgLmpvaW4oJyBPUiAnKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB2YWx1ZXNbMF0gaW5zdGFuY2VvZiBJbmRpdmlkdWFsTW9kZWw6XG4gICAgICAgICAgb25lUHJvcCA9IHZhbHVlc1xuICAgICAgICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgICAgICAgLm1hcCgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgaWYgKCB2YWx1ZS5pc05ldygpICkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN1YiA9IGJ1aWxkUXVlcnkodmFsdWUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzdWIgPyBwcm9wICsgJ19zdHIgSU4gKCAnICsgc3ViICsgJyApJyA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2hhcygnICsgcHJvcCArICdfc3RyLCBcXCcnICsgdmFsdWUgKyAnXFwnKSc7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAgICAgICAuam9pbignIE9SICcpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmICghb25lUHJvcCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb25lUHJvcC5pbmRleE9mKCcgT1IgJykgPiAwID8gJyggJyArIG9uZVByb3AgKyAnICknIDogb25lUHJvcDtcbiAgICAgIH0pXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAuam9pbignIEFORCAnKTtcblxuICAgIGlmICghd2l0aERlbGV0ZWQpIHtcbiAgICAgIHdoZXJlICs9IHdoZXJlID8gJyBBTkQgJyA6ICcnO1xuICAgICAgd2hlcmUgKz0gJ05PVCB2X3NfZGVsZXRlZF9pbnQgPSBbMV0nO1xuICAgIH1cblxuICAgIGlmIChPYmplY3Qua2V5cyh2aXNpdGVkKS5sZW5ndGggPiAxICYmICF3aGVyZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJldHVybiBpbmRpdmlkdWFsUGFyYW0uZ2V0KCdyZGY6dHlwZScpXG4gICAgICAubWFwKCh0eXBlKSA9PiB7XG4gICAgICAgIGNvbnN0IGZyb20gPSAndmVkYV90dC5gJyArIHR5cGUuaWQgKyAnYCc7XG4gICAgICAgIHJldHVybiAnU0VMRUNUIGlkIEZST00gJyArIGZyb20gKyAod2hlcmUgPyAnIFdIRVJFICcgKyB3aGVyZSA6ICcnKTtcbiAgICAgIH0pXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAuam9pbignIFVOSU9OIEFMTCAnKTtcbiAgfTtcblxuICB0cnkge1xuICAgIGxldCBxdWVyeSA9IGJ1aWxkUXVlcnkoaW5kaXZpZHVhbCk7XG4gICAgY29uc3QgZ3JvdXAgPSBncm91cEJ5KHNvcnQpO1xuICAgIHF1ZXJ5ID0gcXVlcnkgJiYgZ3JvdXAgPyBxdWVyeSArICcgR1JPVVAgQlkgJyArIGdyb3VwIDogcXVlcnk7XG4gICAgY29uc3Qgb3JkZXIgPSBvcmRlckJ5KHNvcnQpO1xuICAgIHF1ZXJ5ID0gcXVlcnkgPyBxdWVyeSArICcgSEFWSU5HIHN1bShzaWduKSA+IDAnIDogcXVlcnk7XG4gICAgcXVlcnkgPSBxdWVyeSAmJiBvcmRlciA/IHF1ZXJ5ICsgJyBPUkRFUiBCWSAnICsgb3JkZXIgOiBxdWVyeTtcbiAgICByZXR1cm4gcXVlcnk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgYnVpbGRpbmcgcXVlcnknKTtcbiAgfVxufTtcblxuVXRpbC5xdWVyeUZyb21JbmRpdmlkdWFsVFRfSk9JTiA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCBzb3J0LCB3aXRoRGVsZXRlZCkge1xuICBsZXQgdGFibGVfY291bnRlciA9IDA7XG4gIGNvbnN0IHJlID0gL1teYS16QS1aMC05XS9nO1xuICB0cnkge1xuICAgIHJldHVybiBpbmRpdmlkdWFsWydyZGY6dHlwZSddLm1hcCgoX3R5cGUsIHR5cGVfaW5kZXgpID0+IHtcbiAgICAgIGxldCBmcm9tID0gJyc7XG4gICAgICBsZXQgd2hlcmUgPSAnJztcbiAgICAgIGNvbnN0IHZpc2l0ZWQgPSB2aXNpdGVkIHx8IHt9O1xuICAgICAgYnVpbGRRdWVyeShpbmRpdmlkdWFsLCB1bmRlZmluZWQsIHR5cGVfaW5kZXgpO1xuICAgICAgbGV0IHF1ZXJ5ID0gZnJvbSA/ICdTRUxFQ1QgdDEuaWQgRlJPTSAnICsgZnJvbSA6ICcnO1xuICAgICAgcXVlcnkgPSBxdWVyeSAmJiB3aGVyZSA/IHF1ZXJ5ICsgJyBXSEVSRSAnICsgd2hlcmUgOiBxdWVyeTtcbiAgICAgIGNvbnN0IGdyb3VwID0gZ3JvdXBCeShzb3J0KTtcbiAgICAgIHF1ZXJ5ID0gcXVlcnkgJiYgZ3JvdXAgPyBxdWVyeSArICcgR1JPVVAgQlkgJyArIGdyb3VwIDogcXVlcnk7XG4gICAgICBjb25zdCBvcmRlciA9IG9yZGVyQnkoc29ydCk7XG4gICAgICBxdWVyeSA9IHF1ZXJ5ID8gcXVlcnkgKyAnIEhBVklORyBzdW0odDEuc2lnbikgPiAwJyA6IHF1ZXJ5O1xuICAgICAgcXVlcnkgPSBxdWVyeSAmJiBvcmRlciA/IHF1ZXJ5ICsgJyBPUkRFUiBCWSAnICsgb3JkZXIgOiBxdWVyeTtcbiAgICAgIHJldHVybiBxdWVyeTtcblxuICAgICAgLyoqXG4gICAgICAgKiBGb3JtIGBncm91cCBieWAgY2xhdXNlXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gc29ydFN0clxuICAgICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAgICovXG4gICAgICBmdW5jdGlvbiBncm91cEJ5IChzb3J0U3RyKSB7XG4gICAgICAgIGNvbnN0IGJ5ID0gJ3QxLmlkJztcbiAgICAgICAgbGV0IHByb3BzO1xuICAgICAgICBpZiAodHlwZW9mIHNvcnRTdHIgPT09ICdzdHJpbmcnIHx8IHNvcnRTdHIgaW5zdGFuY2VvZiBTdHJpbmcpIHtcbiAgICAgICAgICBwcm9wcyA9IHNvcnRTdHIucmVwbGFjZSgvJyguKz8pJ1xccysoXFx3KykvZ2ksIGZ1bmN0aW9uIChtYXRjaCwgcHJvcGVydHlfdXJpKSB7XG4gICAgICAgICAgICBjb25zdCByYW5nZSA9IHZlZGEub250b2xvZ3kucHJvcGVydGllc1twcm9wZXJ0eV91cmldLmdldCgncmRmczpyYW5nZScpWzBdO1xuICAgICAgICAgICAgbGV0IGJ5Q2xhdXNlID0gcHJvcGVydHlfdXJpLnJlcGxhY2UocmUsICdfJyk7XG4gICAgICAgICAgICBzd2l0Y2ggKHJhbmdlLmlkKSB7XG4gICAgICAgICAgICBjYXNlICd4c2Q6ZGF0ZVRpbWUnOlxuICAgICAgICAgICAgICBieUNsYXVzZSA9IGJ5Q2xhdXNlICsgJ19kYXRlJztcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd4c2Q6Ym9vbGVhbic6XG4gICAgICAgICAgICBjYXNlICd4c2Q6aW50ZWdlcic6XG4gICAgICAgICAgICAgIGJ5Q2xhdXNlID0gYnlDbGF1c2UgKyAnX2ludCc7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAneHNkOmRlY2ltYWwnOlxuICAgICAgICAgICAgICBieUNsYXVzZSA9IGJ5Q2xhdXNlICsgJ19kZWMnO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3hzZDpzdHJpbmcnOlxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgYnlDbGF1c2UgPSBieUNsYXVzZSArICdfc3RyJztcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJ3QxLicgKyBieUNsYXVzZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJvcHMgPyBieSArICcsICcgKyBwcm9wcyA6IGJ5O1xuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIEZvcm0gYG9yZGVyIGJ5YCBjbGF1c2VcbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzb3J0U3RyXG4gICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIG9yZGVyQnkgKHNvcnRTdHIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzb3J0U3RyID09PSAnc3RyaW5nJyB8fCBzb3J0U3RyIGluc3RhbmNlb2YgU3RyaW5nKSB7XG4gICAgICAgICAgcmV0dXJuIHNvcnRTdHIucmVwbGFjZSgvJyguKz8pJ1xccysoXFx3KykvZ2ksIGZ1bmN0aW9uIChtYXRjaCwgcHJvcGVydHlfdXJpLCBkaXIpIHtcbiAgICAgICAgICAgIGNvbnN0IHJhbmdlID0gdmVkYS5vbnRvbG9neS5wcm9wZXJ0aWVzW3Byb3BlcnR5X3VyaV0uZ2V0KCdyZGZzOnJhbmdlJylbMF07XG4gICAgICAgICAgICBjb25zdCBieSA9IHByb3BlcnR5X3VyaS5yZXBsYWNlKHJlLCAnXycpO1xuICAgICAgICAgICAgbGV0IGNsYXVzZTtcbiAgICAgICAgICAgIHN3aXRjaCAocmFuZ2UuaWQpIHtcbiAgICAgICAgICAgIGNhc2UgJ3hzZDpkYXRlVGltZSc6XG4gICAgICAgICAgICAgIGNsYXVzZSA9IGJ5ICsgJ19kYXRlICcgKyBkaXI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAneHNkOmJvb2xlYW4nOlxuICAgICAgICAgICAgY2FzZSAneHNkOmludGVnZXInOlxuICAgICAgICAgICAgICBjbGF1c2UgPSBieSArICdfaW50ICcgKyBkaXI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAneHNkOmRlY2ltYWwnOlxuICAgICAgICAgICAgICBjbGF1c2UgPSBieSArICdfZGVjICcgKyBkaXI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAneHNkOnN0cmluZyc6XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBjbGF1c2UgPSBieSArICdfc3RyICcgKyBkaXI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICd0MS4nICsgY2xhdXNlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogUmVjdXJzaXZlIGZyb20gJiB3aGVyZSBwb3B1bGF0aW9uXG4gICAgICAgKiBAcGFyYW0ge0luZGl2aWR1YWxNb2RlbH0gaW5kaXZpZHVhbFBhcmFtXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyZW50X3Byb3BcbiAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0eXBlX2luZGV4X3BhcmFtXG4gICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIGJ1aWxkUXVlcnkgKGluZGl2aWR1YWxQYXJhbSwgcGFyZW50X3Byb3AsIHR5cGVfaW5kZXhfcGFyYW0pIHtcbiAgICAgICAgaWYgKCFpbmRpdmlkdWFsUGFyYW0uaGFzVmFsdWUoJ3JkZjp0eXBlJykpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGFibGVfY291bnRlcisrO1xuICAgICAgICB0eXBlX2luZGV4X3BhcmFtID0gdHlwZV9pbmRleF9wYXJhbSB8fCAwO1xuICAgICAgICBjb25zdCB0eXBlID0gaW5kaXZpZHVhbFBhcmFtLmdldCgncmRmOnR5cGUnKVt0eXBlX2luZGV4X3BhcmFtXS5pZDtcbiAgICAgICAgY29uc3QgYWxpYXMgPSAndCcgKyB0YWJsZV9jb3VudGVyO1xuICAgICAgICB2aXNpdGVkW2luZGl2aWR1YWxQYXJhbS5pZF0gPSBhbGlhcztcbiAgICAgICAgY29uc3QgdGFibGVfYWxpYXNlZCA9ICd2ZWRhX3R0LmAnICsgdHlwZSArICdgIEFTICcgKyBhbGlhcztcbiAgICAgICAgaWYgKCFwYXJlbnRfcHJvcCkge1xuICAgICAgICAgIGZyb20gKz0gdGFibGVfYWxpYXNlZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmcm9tICs9ICcgSk9JTiAnICsgdGFibGVfYWxpYXNlZCArICcgT04gJyArIHBhcmVudF9wcm9wICsgJyA9IFsnICsgYWxpYXMgKyAnLmlkXSc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXdpdGhEZWxldGVkKSB7XG4gICAgICAgICAgd2hlcmUgKz0gd2hlcmUgPyAnIEFORCAnIDogJyc7XG4gICAgICAgICAgd2hlcmUgKz0gJ05PVCAnICsgYWxpYXMgKyAnLnZfc19kZWxldGVkX2ludCA9IFsxXSc7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB3aGVyZV9hbGlhc2VkID0gT2JqZWN0LmtleXMoaW5kaXZpZHVhbFBhcmFtLnByb3BlcnRpZXMpXG4gICAgICAgICAgLm1hcCgocHJvcGVydHlfdXJpLCBpKSA9PiB7XG4gICAgICAgICAgICBpZiAocHJvcGVydHlfdXJpLmluZGV4T2YoJy4nKSA+PSAwIHx8IHByb3BlcnR5X3VyaS5pbmRleE9mKCcqJykgPj0gMCkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZRTCBzdHlsZSBwcm9wZXJ0eSBuZXN0aW5nOiAnICsgcHJvcGVydHlfdXJpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcm9wZXJ0eV91cmkgPT09ICdAJyB8fCBwcm9wZXJ0eV91cmkgPT09ICdyZGY6dHlwZScpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gaW5kaXZpZHVhbFBhcmFtLmdldChwcm9wZXJ0eV91cmkpLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGEgPCBiKSByZXR1cm4gLTE7XG4gICAgICAgICAgICAgIGVsc2UgaWYgKGEgPT09IGIpIHJldHVybiAwO1xuICAgICAgICAgICAgICBlbHNlIHJldHVybiAxO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsZXQgcHJvcCA9IGFsaWFzICsgJy4nICsgcHJvcGVydHlfdXJpLnJlcGxhY2UocmUsICdfJyk7XG4gICAgICAgICAgICBsZXQgb25lUHJvcDtcbiAgICAgICAgICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICAgICAgY2FzZSBOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlc1swXSk6XG4gICAgICAgICAgICAgIG9uZVByb3AgPSBwcm9wICsgJ19pbnRbMV0gPj0gJyArIHZhbHVlc1swXSArICcgQU5EICcgKyBwcm9wICsgJ19pbnRbMV0gPD0gJyArIHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTFdO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTnVtYmVyLmlzRmxvYXQodmFsdWVzWzBdKTpcbiAgICAgICAgICAgICAgb25lUHJvcCA9IHByb3AgKyAnX2RlY1sxXSA+PSAnICsgdmFsdWVzWzBdICsgJyBBTkQgJyArIHByb3AgKyAnX2RlY1sxXSA8PSAnICsgdmFsdWVzW3ZhbHVlcy5sZW5ndGgtMV07XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB2YWx1ZXNbMF0gaW5zdGFuY2VvZiBEYXRlOlxuICAgICAgICAgICAgICBsZXQgc3RhcnQgPSBuZXcgRGF0ZSh2YWx1ZXNbMF0pO1xuICAgICAgICAgICAgICBsZXQgZW5kID0gbmV3IERhdGUodmFsdWVzW3ZhbHVlcy5sZW5ndGgtMV0pO1xuICAgICAgICAgICAgICBzdGFydC5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgICAgICAgICAgZW5kLnNldEhvdXJzKDIzLCA1OSwgNTksIDk5OSk7XG4gICAgICAgICAgICAgIHN0YXJ0ID0gTWF0aC5mbG9vcihzdGFydC52YWx1ZU9mKCkgLyAxMDAwKTtcbiAgICAgICAgICAgICAgZW5kID0gTWF0aC5mbG9vcihlbmQudmFsdWVPZigpIC8gMTAwMCk7XG4gICAgICAgICAgICAgIG9uZVByb3AgPSBwcm9wICsgJ19kYXRlWzFdID49IHRvRGF0ZVRpbWUoJyArIHN0YXJ0ICsgJykgQU5EICcgKyBwcm9wICsgJ19kYXRlWzFdIDw9IHRvRGF0ZVRpbWUoJyArIGVuZCArICcpJztcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHR5cGVvZiB2YWx1ZXNbMF0gPT09ICdib29sZWFuJzpcbiAgICAgICAgICAgICAgb25lUHJvcCA9IHZhbHVlc1xuICAgICAgICAgICAgICAgIC5tYXAoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gcHJvcCArICdfaW50WzFdID0gJyArICh2YWx1ZSA/IDEgOiAwKTtcbiAgICAgICAgICAgICAgICB9KS5qb2luKCcgT1IgJyk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB2YWx1ZXNbMF0gaW5zdGFuY2VvZiBTdHJpbmc6XG4gICAgICAgICAgICAgIG9uZVByb3AgPSB2YWx1ZXNcbiAgICAgICAgICAgICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAgICAgICAgICAgLm1hcCgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHEgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVzID0gcS50cmltKCkuc3BsaXQoJ1xcbicpO1xuICAgICAgICAgICAgICAgICAgY29uc3QgbGluZVF1ZXJpZXMgPSBsaW5lcy5tYXAoKGxpbmUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgd29yZHMgPSBsaW5lXG4gICAgICAgICAgICAgICAgICAgICAgLnRyaW0oKVxuICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9bLSpcXHNdKy9nLCAnICcpXG4gICAgICAgICAgICAgICAgICAgICAgLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICAgICAgICAgIC8vICd0ZXh0JyBpcyBhIHNwZWNpYWwgc2luZ2xlLXZhbHVlIGNvbHVtbiB3aXRob3V0IHN1ZmZpeCB3aXRoIGFsbCB0ZXh0IGNvbnRlbnQgb2YgYW4gaW5kaXZpZHVhbFxuICAgICAgICAgICAgICAgICAgICBpZiAoIC9cXC5cXCokLy50ZXN0KHByb3ApICkge1xuICAgICAgICAgICAgICAgICAgICAgIHByb3AgPSBwcm9wLnJlcGxhY2UoJyonLCAndGV4dCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICggL1xcLnRleHQkLy50ZXN0KHByb3ApICkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3b3Jkcy5sZW5ndGggJiYgcHJvcCArICcgTElLRSBcXCclJyArIHdvcmRzLmpvaW4oJyUgJScpLnJlcGxhY2UoL1xcJy9nLCAnXFxcXFxcJycpLnJlcGxhY2UoL1xcXCIvZywgJ1xcJycpICsgJyVcXCcnO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3b3Jkcy5sZW5ndGggJiYgJ2xvd2VyVVRGOChhcnJheVN0cmluZ0NvbmNhdCgnICsgcHJvcCArICdfc3RyLCBcXCcgXFwnKSkgTElLRSBsb3dlclVURjgoXFwnJScgKyB3b3Jkcy5qb2luKCclICUnKS5yZXBsYWNlKC9cXCcvZywgJ1xcXFxcXCcnKS5yZXBsYWNlKC9cXFwiL2csICdcXCcnKSArICclXFwnKSc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGxpbmVRdWVyaWVzLmZpbHRlcihCb29sZWFuKS5qb2luKCcgT1IgJyk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAgICAgICAgICAgLmpvaW4oJyBPUiAnKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHZhbHVlc1swXSBpbnN0YW5jZW9mIEluZGl2aWR1YWxNb2RlbDpcbiAgICAgICAgICAgICAgb25lUHJvcCA9IHZhbHVlc1xuICAgICAgICAgICAgICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgICAgICAgICAgICAgICAubWFwKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKCB2YWx1ZS5pc05ldygpICYmICEodmFsdWUuaWQgaW4gdmlzaXRlZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJ1aWxkUXVlcnkodmFsdWUsIHByb3AgKyAnX3N0cicpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICggdmFsdWUuaXNOZXcoKSAmJiB2YWx1ZS5pZCBpbiB2aXNpdGVkICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2hhcygnICsgcHJvcCArICdfc3RyLCAnICsgdmlzaXRlZFt2YWx1ZS5pZF0gKyAnLmlkJyArICcpJztcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnaGFzKCcgKyBwcm9wICsgJ19zdHIsIFxcJycgKyB2YWx1ZSArICdcXCcpJztcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgICAgICAgICAgICAgICAuam9pbignIE9SICcpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghb25lUHJvcCkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb25lUHJvcC5pbmRleE9mKCcgT1IgJykgPiAwID8gJyggJyArIG9uZVByb3AgKyAnICknIDogb25lUHJvcDtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgICAgICAgICAuam9pbignIEFORCAnKTtcblxuICAgICAgICBpZiAoIXdoZXJlX2FsaWFzZWQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXdoZXJlKSB7XG4gICAgICAgICAgd2hlcmUgPSB3aGVyZV9hbGlhc2VkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdoZXJlICs9ICcgQU5EICcgKyB3aGVyZV9hbGlhc2VkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSkuam9pbignIFVOSU9OIEFMTCAnKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBidWlsZGluZyBxdWVyeScpO1xuICB9XG59O1xuXG5VdGlsLnF1ZXJ5RnJvbUluZGl2aWR1YWwgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCkge1xuICBjb25zdCBmbGF0ID0gZmxhdHRlbkluZGl2aWR1YWwoaW5kaXZpZHVhbC5wcm9wZXJ0aWVzKTtcbiAgaWYgKCBpbmRpdmlkdWFsLmhhc1ZhbHVlKCcqJykgJiYgaW5kaXZpZHVhbC5nZXQoJyonKVswXS5pbmRleE9mKCc9PScpID4gMCApIHtcbiAgICByZXR1cm4gaW5kaXZpZHVhbC5nZXQoJyonKVswXTtcbiAgfVxuICBjb25zdCBhbGxQcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGZsYXQpXG4gICAgLm1hcCgocHJvcGVydHlfdXJpKSA9PiB7XG4gICAgICBpZiAocHJvcGVydHlfdXJpID09PSAnQCcgfHwgcHJvcGVydHlfdXJpID09PSAndi1zOmlzRHJhZnQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHZhbHVlcyA9IGZsYXRbcHJvcGVydHlfdXJpXS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgIGlmIChhLmRhdGEgPCBiLmRhdGEpIHJldHVybiAtMTtcbiAgICAgICAgZWxzZSBpZiAoYS5kYXRhID09PSBiLmRhdGEpIHJldHVybiAwO1xuICAgICAgICBlbHNlIHJldHVybiAxO1xuICAgICAgfSk7XG4gICAgICBsZXQgb25lUHJvcDtcbiAgICAgIHN3aXRjaCAodmFsdWVzWzBdLnR5cGUpIHtcbiAgICAgIGNhc2UgJ0ludGVnZXInOlxuICAgICAgY2FzZSAnRGVjaW1hbCc6XG4gICAgICAgIG9uZVByb3AgPSAnXFwnJyArIHByb3BlcnR5X3VyaSArICdcXCc9PVsnICsgdmFsdWVzWzBdLmRhdGEgKyAnLCcgKyB2YWx1ZXNbdmFsdWVzLmxlbmd0aC0xXS5kYXRhICsgJ10nO1xuICAgICAgICBicmVhaztcbiAgICAgICAgLy8gRGF0ZVxuICAgICAgY2FzZSAnRGF0ZXRpbWUnOlxuICAgICAgICBjb25zdCBzdGFydCA9IG5ldyBEYXRlKHZhbHVlc1swXS5kYXRhKTtcbiAgICAgICAgY29uc3QgZW5kID0gbmV3IERhdGUodmFsdWVzW3ZhbHVlcy5sZW5ndGgtMV0uZGF0YSk7XG4gICAgICAgIHN0YXJ0LnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgICBlbmQuc2V0SG91cnMoMjMsIDU5LCA1OSwgOTk5KTtcbiAgICAgICAgb25lUHJvcCA9ICdcXCcnICsgcHJvcGVydHlfdXJpICsgJ1xcJz09WycgKyBzdGFydC50b0lTT1N0cmluZygpICsgJywnICsgZW5kLnRvSVNPU3RyaW5nKCkgKyAnXSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnQm9vbGVhbic6XG4gICAgICAgIG9uZVByb3AgPSB2YWx1ZXNcbiAgICAgICAgICAubWFwKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICdcXCcnICsgcHJvcGVydHlfdXJpICsgJ1xcJz09XFwnJyArIHZhbHVlLmRhdGEgKyAnXFwnJztcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5qb2luKCcgfHwgJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnU3RyaW5nJzpcbiAgICAgICAgb25lUHJvcCA9IHZhbHVlc1xuICAgICAgICAgIC5maWx0ZXIoKGl0ZW0pID0+ICEhaXRlbSAmJiAhIWl0ZW0udmFsdWVPZigpKVxuICAgICAgICAgIC5tYXAoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBxID0gdmFsdWUuZGF0YTtcbiAgICAgICAgICAgIGlmICggIXEubWF0Y2goL1tcXCtcXC1cXCpdLykgKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGxpbmVzID0gcS50cmltKCkuc3BsaXQoJ1xcbicpO1xuICAgICAgICAgICAgICBjb25zdCBsaW5lUXVlcmllcyA9IGxpbmVzLm1hcCgobGluZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHdvcmRzID0gbGluZVxuICAgICAgICAgICAgICAgICAgLnRyaW0oKVxuICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1stKlxccydcIl0rL2csICcgJylcbiAgICAgICAgICAgICAgICAgIC5zcGxpdCgnICcpXG4gICAgICAgICAgICAgICAgICAuZmlsdGVyKEJvb2xlYW4pO1xuICAgICAgICAgICAgICAgIGxpbmUgPSB3b3Jkcy5tYXAoKHdvcmQpID0+IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAnKycgKyB3b3JkICsgJyonO1xuICAgICAgICAgICAgICAgIH0pLmpvaW4oJyAnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ1xcJycgKyBwcm9wZXJ0eV91cmkgKyAnXFwnPT1cXCcnICsgbGluZSArICdcXCcnO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcmV0dXJuIGxpbmVRdWVyaWVzLmpvaW4oJyB8fCAnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiAnXFwnJyArIHByb3BlcnR5X3VyaSArICdcXCc9PVxcJycgKyBxICsgJ1xcJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuam9pbignIHx8ICcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1VyaSc6XG4gICAgICAgIG9uZVByb3AgPSB2YWx1ZXNcbiAgICAgICAgICAuZmlsdGVyKChpdGVtKSA9PiAhIWl0ZW0gJiYgISFpdGVtLnZhbHVlT2YoKSlcbiAgICAgICAgICAubWFwKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICdcXCcnICsgcHJvcGVydHlfdXJpICsgJ1xcJz09XFwnJyArIHZhbHVlLmRhdGEgKyAnXFwnJztcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5qb2luKCcgfHwgJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9uZVByb3AgPyAnKCAnICsgb25lUHJvcCArICcgKScgOiB1bmRlZmluZWQ7XG4gICAgfSlcbiAgICAuZmlsdGVyKChpdGVtKSA9PiB0eXBlb2YgaXRlbSAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgLmpvaW4oJyAmJiAnKTtcbiAgcmV0dXJuIChhbGxQcm9wcyA/ICcoICcgKyBhbGxQcm9wcyArICcgKScgOiB1bmRlZmluZWQpO1xufTtcblxuLyoqXG4gKiBGbGF0dGVuIGluZGl2aWR1YWxcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcmVmaXhcbiAqIEBwYXJhbSB7T2JqZWN0fSB1bmlvblxuICogQHBhcmFtIHtBcnJheX0gdmlzaXRlZFxuICogQHJldHVybiB7T2JqZWN0fSB1bmlvblxuICovXG5mdW5jdGlvbiBmbGF0dGVuSW5kaXZpZHVhbCAob2JqZWN0LCBwcmVmaXgsIHVuaW9uLCB2aXNpdGVkKSB7XG4gIGNvbnN0IHVyaSA9IG9iamVjdFsnQCddO1xuICB1bmlvbiA9IHR5cGVvZiB1bmlvbiAhPT0gJ3VuZGVmaW5lZCcgPyB1bmlvbiA6IHt9O1xuICBwcmVmaXggPSB0eXBlb2YgcHJlZml4ICE9PSAndW5kZWZpbmVkJyA/IHByZWZpeCA6ICcnO1xuICB2aXNpdGVkID0gdHlwZW9mIHZpc2l0ZWQgIT09ICd1bmRlZmluZWQnID8gdmlzaXRlZCA6IFtdO1xuICBpZiAodmlzaXRlZC5pbmRleE9mKHVyaSkgPiAtMSkge1xuICAgIHJldHVybjtcbiAgfSBlbHNlIHtcbiAgICB2aXNpdGVkLnB1c2godXJpKTtcbiAgfVxuICBmb3IgKGNvbnN0IHByb3BlcnR5X3VyaSBpbiBvYmplY3QpIHtcbiAgICBpZiAocHJvcGVydHlfdXJpID09PSAnQCcpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBjb25zdCB2YWx1ZXMgPSBvYmplY3RbcHJvcGVydHlfdXJpXTtcbiAgICBjb25zdCBwcmVmaXhlZCA9IHByZWZpeCA/IHByZWZpeCArICcuJyArIHByb3BlcnR5X3VyaSA6IHByb3BlcnR5X3VyaTtcbiAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIHZhbHVlcykge1xuICAgICAgaWYgKHZhbHVlLnR5cGUgPT09ICdVcmknKSB7XG4gICAgICAgIGNvbnN0IGluZGl2aWQgPSBuZXcgSW5kaXZpZHVhbE1vZGVsKHZhbHVlLmRhdGEpO1xuICAgICAgICBpZiAoIGluZGl2aWQuaXNOZXcoKSApIHtcbiAgICAgICAgICBmbGF0dGVuSW5kaXZpZHVhbChpbmRpdmlkLnByb3BlcnRpZXMsIHByZWZpeGVkLCB1bmlvbiwgdmlzaXRlZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdW5pb25bcHJlZml4ZWRdID0gdW5pb25bcHJlZml4ZWRdID8gdW5pb25bcHJlZml4ZWRdIDogW107XG4gICAgICAgICAgdW5pb25bcHJlZml4ZWRdLnB1c2goIHZhbHVlICk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVuaW9uW3ByZWZpeGVkXSA9IHVuaW9uW3ByZWZpeGVkXSA/IHVuaW9uW3ByZWZpeGVkXSA6IFtdO1xuICAgICAgICB1bmlvbltwcmVmaXhlZF0ucHVzaCggdmFsdWUgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVuaW9uO1xufVxuXG4vKipcbiAqINCh0YTQvtGA0LzQuNGA0L7QstCw0YLRjCDRgdC+0YHRgtCw0LLQvdC+0LUg0L3QsNC40LzQtdC90L7QstCw0L3QuNC1INC+0LHRitC10LrRgtCwXG4gKlxuICogQHBhcmFtIGluZGl2aWR1YWwg0LjQvdC00LjQstC40LRcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuXG5VdGlsLmNvbXBsZXhMYWJlbCA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsKSB7XG4gIGluZGl2aWR1YWwgPSBpbmRpdmlkdWFsLnByb3BlcnRpZXMgfHwgaW5kaXZpZHVhbDtcbiAgY29uc3QgY2FjaGUgPSB7fTtcbiAgY2FjaGVbaW5kaXZpZHVhbFsnQCddXSA9IGluZGl2aWR1YWw7XG4gIGNvbnN0IHJlX2RhdGUgPSAvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9VFxcZHsyfTpcXGR7Mn06XFxkezJ9LipaJC9pO1xuICBjb25zdCBnZXRfY2FjaGVkID0gZnVuY3Rpb24gKHVyaSkge1xuICAgIGlmICghY2FjaGVbdXJpXSkge1xuICAgICAgY2FjaGVbdXJpXSA9IGdldF9pbmRpdmlkdWFsKHZlZGEudGlja2V0LCB1cmkpO1xuICAgIH1cbiAgICByZXR1cm4gY2FjaGVbdXJpXTtcbiAgfTtcbiAgY29uc3QgZ2V0X2xvY2FsaXplZF9jaGFpbiA9IGZ1bmN0aW9uIChsYW5ndWFnZSwgdXJpLCAuLi5wcm9wZXJ0aWVzKSB7XG4gICAgY29uc3Qgc3RhcnRQb2ludCA9IGdldF9jYWNoZWQodXJpKTtcbiAgICBpZiAoIXN0YXJ0UG9pbnQpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgbGV0IGludGVybWVkaWF0ZXMgPSBbc3RhcnRQb2ludF07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBwcm9wZXJ0eSA9IHByb3BlcnRpZXNbaV07XG4gICAgICBpZiAoaSA9PT0gcHJvcGVydGllcy5sZW5ndGggLSAxKSB7XG4gICAgICAgIGNvbnN0IHBhcnRzID0gW107XG4gICAgICAgIGludGVybWVkaWF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGlmIChpdGVtW3Byb3BlcnR5XSkge1xuICAgICAgICAgICAgY29uc3QgcGFydCA9IGl0ZW1bcHJvcGVydHldLnJlZHVjZSgoYWNjLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoICF2YWx1ZS5sYW5nIHx8IHZhbHVlLmxhbmcgPT09ICdOT05FJyB8fCB2YWx1ZS5sYW5nLnRvTG93ZXJDYXNlKCkgPT09IGxhbmd1YWdlLnRvTG93ZXJDYXNlKCkgKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB2YWx1ZS5kYXRhO1xuICAgICAgICAgICAgICAgIGlmICggZGF0YSBpbnN0YW5jZW9mIERhdGUgfHwgcmVfZGF0ZS50ZXN0KGRhdGEpICkge1xuICAgICAgICAgICAgICAgICAgZGF0YSA9IG5ldyBEYXRlKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgZGF0YSA9IG5ldyBEYXRlKGRhdGEuZ2V0VGltZSgpIC0gKGRhdGEuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwKSkudG9JU09TdHJpbmcoKS5zdWJzdHJpbmcoMCwgMTApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhY2MgKz0gZGF0YTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgICAgfSwgJycpO1xuICAgICAgICAgICAgcGFydHMucHVzaChwYXJ0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcGFydHMuam9pbignLCAnKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRlbXAgPSBbXTtcbiAgICAgIGludGVybWVkaWF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoVXRpbC5oYXNWYWx1ZShpdGVtLCBwcm9wZXJ0eSkpIHtcbiAgICAgICAgICBpdGVtW3Byb3BlcnR5XS5mb3JFYWNoKChwcm9wZXJ0eUl0ZW0pID0+IHtcbiAgICAgICAgICAgIHRlbXAucHVzaChnZXRfY2FjaGVkKHByb3BlcnR5SXRlbS5kYXRhKSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKHRlbXAubGVuZ3RoKSB7XG4gICAgICAgIGludGVybWVkaWF0ZXMgPSB0ZW1wO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH07XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBhdmFpbGFibGVMYW5ndWFnZXMgPSBnZXRfY2FjaGVkKCd2LXVpOkF2YWlsYWJsZUxhbmd1YWdlJyk7XG4gICAgY29uc3QgbGFuZ3VhZ2VzID0gYXZhaWxhYmxlTGFuZ3VhZ2VzWydyZGY6dmFsdWUnXS5tYXAoKGxhbmd1YWdlVmFsdWUpID0+IHtcbiAgICAgIGNvbnN0IGxhbmd1YWdlVXJpID0gbGFuZ3VhZ2VWYWx1ZS5kYXRhO1xuICAgICAgY29uc3QgbGFuZ3VhZ2UgPSBnZXRfY2FjaGVkKGxhbmd1YWdlVXJpKTtcbiAgICAgIHJldHVybiBsYW5ndWFnZVsncmRmOnZhbHVlJ11bMF0uZGF0YTtcbiAgICB9KTtcbiAgICByZXR1cm4gaW5kaXZpZHVhbFsncmRmOnR5cGUnXS5yZWR1Y2UoKGFjYywgdHlwZVZhbHVlKSA9PiB7XG4gICAgICBjb25zdCB0eXBlVXJpID0gdHlwZVZhbHVlLmRhdGE7XG4gICAgICBjb25zdCB0eXBlID0gZ2V0X2NhY2hlZCh0eXBlVXJpKTtcbiAgICAgIGlmICggIXR5cGUgfHwgIVV0aWwuaGFzVmFsdWUodHlwZSwgJ3YtczpsYWJlbFBhdHRlcm4nKSApIHtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH1cbiAgICAgIGNvbnN0IHBhdHRlcm4gPSB0eXBlWyd2LXM6bGFiZWxQYXR0ZXJuJ11bMF0uZGF0YTtcbiAgICAgIGxhbmd1YWdlcy5mb3JFYWNoKChsYW5ndWFnZSkgPT4ge1xuICAgICAgICBjb25zdCByZXBsYWNlZCA9IHBhdHRlcm4ucmVwbGFjZSgveyhcXHMqKFtee31dKylcXHMqKX0vZywgZnVuY3Rpb24gKG1hdGNoLCBncm91cCkge1xuICAgICAgICAgIGxldCBpbmRleGVzID0gbnVsbDtcbiAgICAgICAgICBpZiAoZ3JvdXAuaW5kZXhPZignICcpICE9IC0xKSB7XG4gICAgICAgICAgICBjb25zdCB0ZW1wID0gZ3JvdXAuc3BsaXQoJyAnKTtcbiAgICAgICAgICAgIGdyb3VwID0gdGVtcFswXTtcbiAgICAgICAgICAgIGluZGV4ZXMgPSB0ZW1wWzFdLnN1YnN0cmluZygxLCB0ZW1wWzFdLmxlbmd0aC0xKS5zcGxpdCgnLCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBjaGFpbiA9IGdyb3VwLnNwbGl0KCcuJyk7XG4gICAgICAgICAgaWYgKGNoYWluWzBdID09PSAnQCcpIHtcbiAgICAgICAgICAgIGNoYWluWzBdID0gaW5kaXZpZHVhbFsnQCddO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBsb2NhbGVkQ2hhaW4gPSBnZXRfbG9jYWxpemVkX2NoYWluLmFwcGx5KHt9LCBbbGFuZ3VhZ2VdLmNvbmNhdChjaGFpbikpO1xuICAgICAgICAgIHJldHVybiBpbmRleGVzID09IG51bGw/IGxvY2FsZWRDaGFpbiA6IGxvY2FsZWRDaGFpbi5zdWJzdHJpbmcoK2luZGV4ZXNbMF0sICtpbmRleGVzWzFdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgICAgICBkYXRhOiByZXBsYWNlZCxcbiAgICAgICAgICBsYW5nOiBsYW5ndWFnZSxcbiAgICAgICAgICB0eXBlOiAnU3RyaW5nJyxcbiAgICAgICAgfTtcbiAgICAgICAgYWNjLnB1c2gocmVzdWx0KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCBbXSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0NvbXBsZXggbGFiZWwgZmFpbGVkJyk7XG4gICAgcmV0dXJuIFtdO1xuICB9XG59O1xuXG5VdGlsLmFyZUVxdWFsID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgaWYgKHggPT09IHkpIHJldHVybiB0cnVlO1xuICBpZiAoISh4IGluc3RhbmNlb2YgT2JqZWN0ICkgfHwgISggeSBpbnN0YW5jZW9mIE9iamVjdCkpIHJldHVybiBmYWxzZTtcbiAgaWYgKHguY29uc3RydWN0b3IgIT09IHkuY29uc3RydWN0b3IpIHJldHVybiBmYWxzZTtcbiAgZm9yIChjb25zdCBwIGluIHgpIHtcbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh4LCBwKSkgY29udGludWU7XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoeSwgcCkpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoeFtwXSA9PT0geVtwXSkgY29udGludWU7XG4gICAgaWYgKHR5cGVvZih4W3BdKSAhPT0gJ29iamVjdCcpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIVV0aWwuYXJlRXF1YWwoeFtwXSwgeVtwXSkpIHJldHVybiBmYWxzZTtcbiAgfVxuICBmb3IgKCBjb25zdCBwIGluIHkgKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh5LCBwKSAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHgsIHApKSByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7RUFpTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNBLFNBQVNBLFFBQVFBLENBQUVDLENBQUMsRUFBRTtJQUNwQixPQUFPQSxDQUFDLEdBQUcsQ0FBQyxHQUFHQyxNQUFNLENBQUNELENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBR0EsQ0FBQztFQUNwQztFQXNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0EsU0FBU0UsWUFBWUEsQ0FBRUMsS0FBSyxFQUFFO0lBQzVCLElBQU1DLFNBQVMsR0FBRyxDQUFD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