"use strict";

System.register(["../../common/veda.js", "../../common/individual_model.js", "../../common/util.js", "../../common/backend.js"], function (_export, _context) {
  "use strict";

  var veda, IndividualModel, Util, Backend;
  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
  function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }
  /**
   * Perform full text search query
   * @param {string} prefix - The prefix for the query.
   * @param {string} input - The input text to search for.
   * @param {string} sort - The sorting order of the results.
   * @param {boolean} withDeleted - Specifies if deleted items should be included in the search results.
   * @param {string} queryPattern - The query pattern with '{}' as a placeholder for user input.
   * @return {Promise} - A promise that resolves to the search results.
   */
  function ftQuery(prefix, input, sort, withDeleted) {
    var queryPattern = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "'*'=='{}'";
    input = input ? input.trim() : '';
    var queryString = '';
    if (input) {
      var lines = input.split('\n').filter(Boolean);
      var lineQueries = lines.map(function (line) {
        var special = line && line.indexOf('==') > 0 ? line : false;
        if (special) {
          return special;
        }
        var words = line.trim().replace(/[-*\s'"]+/g, ' ').split(' ').filter(Boolean);
        return words.map(function (word) {
          return queryPattern.replaceAll('{}', word + '*');
        }).join(' && ');
      });
      queryString = lineQueries.filter(Boolean).join(' || ');
    }
    if (prefix) {
      queryString = queryString ? '(' + prefix + ') && (' + queryString + ')' : '(' + prefix + ')';
    }
    return incrementalSearch().then(function (results) {
      if (withDeleted) {
        queryString = queryString + ' && (\'v-s:deleted\' == true )';
        return incrementalSearch(results);
      } else {
        return results;
      }
    }).then(function (results) {
      results = Util.unique(results);
      return Backend.get_individuals({
        ticket: veda.ticket,
        uris: results
      });
    }).then(function (individuals) {
      return Promise.all(individuals.map(function (individual) {
        return new IndividualModel(individual).init();
      }));
    });

    /**
     * Perform full text search query incrementally
     * @param {Array} results
     * @param {string} cursor
     * @param {string} limit
     * @return {Promise}
     */
    function incrementalSearch() {
      var results = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var cursor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
      var sortSuffix = veda.user.getLanguage()[0] ? '_' + veda.user.getLanguage()[0].toLowerCase() : '';
      return Backend.query({
        ticket: veda.ticket,
        query: queryString,
        sort: sort ? sort : "'rdfs:label" + sortSuffix + "' asc",
        from: cursor,
        top: 10,
        limit: 1000
      }).then(function (queryResult) {
        results = results.concat(queryResult.result);
        var resultCursor = queryResult.cursor;
        var resultEstimated = queryResult.estimated;
        if (results.length >= limit || resultCursor >= resultEstimated) {
          return Promise.resolve(results);
        } else {
          return Promise.resolve(incrementalSearch(results, resultCursor, limit));
        }
      });
    }
  }

  /**
   * Render option value
   * @param {IndividualModel|string|number|Boolean|Date} value
   * @param {string} template
   * @return {Promise<string>}
   */
  function renderValue(value, template) {
    if (_instanceof(value, IndividualModel)) {
      return value.load().then(function () {
        if (template) {
          return Promise.resolve(interpolate(template, value));
        } else {
          return Promise.resolve(value.toString());
        }
      });
    } else {
      return Promise.resolve(Util.formatValue(value));
    }
  }

  /**
   * Interpolate string for rendering
   * @param {string} template
   * @param {IndividualModel} individual
   * @return {Promise}
   */
  function interpolate(template, individual) {
    var promises = [];
    var re_interpolate = /{\s*(.*?)\s*}/g;
    var re_evaluate = /{{\s*(.*?)\s*}}/g;
    template.replace(re_evaluate, function (match, group) {
      var rendered = eval(group);
      promises.push(rendered);
      return '';
    }).replace(re_interpolate, function (match, group) {
      var _target;
      var properties = group.split('.');
      var target = properties.shift();
      if (target === '@') {
        target = individual;
      } else {
        target = new IndividualModel(target);
      }
      var rendered = (_target = target).getChainValue.apply(_target, _toConsumableArray(properties)).then(function (values) {
        return values.map(Util.formatValue).filter(Boolean).join(' ');
      });
      promises.push(rendered);
      return '';
    });
    return Promise.all(promises).then(function (fulfilled) {
      return template.replace(re_evaluate, function () {
        return fulfilled.shift();
      }).replace(re_interpolate, function () {
        return fulfilled.shift();
      });
    });
  }
  _export({
    ftQuery: ftQuery,
    renderValue: renderValue,
    interpolate: interpolate
  });
  return {
    setters: [function (_commonVedaJs) {
      veda = _commonVedaJs.default;
    }, function (_commonIndividual_modelJs) {
      IndividualModel = _commonIndividual_modelJs.default;
    }, function (_commonUtilJs) {
      Util = _commonUtilJs.default;
    }, function (_commonBackendJs) {
      Backend = _commonBackendJs.default;
    }],
    execute: function () {}
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJmdFF1ZXJ5IiwicHJlZml4IiwiaW5wdXQiLCJzb3J0Iiwid2l0aERlbGV0ZWQiLCJxdWVyeVBhdHRlcm4iLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJ0cmltIiwicXVlcnlTdHJpbmciLCJsaW5lcyIsInNwbGl0IiwiZmlsdGVyIiwiQm9vbGVhbiIsImxpbmVRdWVyaWVzIiwibWFwIiwibGluZSIsInNwZWNpYWwiLCJpbmRleE9mIiwid29yZHMiLCJyZXBsYWNlIiwid29yZCIsInJlcGxhY2VBbGwiLCJqb2luIiwiaW5jcmVtZW50YWxTZWFyY2giLCJ0aGVuIiwicmVzdWx0cyIsIlV0aWwiLCJ1bmlxdWUiLCJCYWNrZW5kIiwiZ2V0X2luZGl2aWR1YWxzIiwidGlja2V0IiwidmVkYSIsInVyaXMiLCJpbmRpdmlkdWFscyIsIlByb21pc2UiLCJhbGwiLCJpbmRpdmlkdWFsIiwiSW5kaXZpZHVhbE1vZGVsIiwiaW5pdCIsImN1cnNvciIsImxpbWl0Iiwic29ydFN1ZmZpeCIsInVzZXIiLCJnZXRMYW5ndWFnZSIsInRvTG93ZXJDYXNlIiwicXVlcnkiLCJmcm9tIiwidG9wIiwicXVlcnlSZXN1bHQiLCJjb25jYXQiLCJyZXN1bHQiLCJyZXN1bHRDdXJzb3IiLCJyZXN1bHRFc3RpbWF0ZWQiLCJlc3RpbWF0ZWQiLCJyZXNvbHZlIiwicmVuZGVyVmFsdWUiLCJ2YWx1ZSIsInRlbXBsYXRlIiwiX2luc3RhbmNlb2YiLCJsb2FkIiwiaW50ZXJwb2xhdGUiLCJ0b1N0cmluZyIsImZvcm1hdFZhbHVlIiwicHJvbWlzZXMiLCJyZV9pbnRlcnBvbGF0ZSIsInJlX2V2YWx1YXRlIiwibWF0Y2giLCJncm91cCIsInJlbmRlcmVkIiwiZXZhbCIsInB1c2giLCJfdGFyZ2V0IiwicHJvcGVydGllcyIsInRhcmdldCIsInNoaWZ0IiwiZ2V0Q2hhaW5WYWx1ZSIsImFwcGx5IiwiX3RvQ29uc3VtYWJsZUFycmF5IiwidmFsdWVzIiwiZnVsZmlsbGVkIiwiX2V4cG9ydCIsInNldHRlcnMiLCJfY29tbW9uVmVkYUpzIiwiZGVmYXVsdCIsIl9jb21tb25JbmRpdmlkdWFsX21vZGVsSnMiLCJfY29tbW9uVXRpbEpzIiwiX2NvbW1vbkJhY2tlbmRKcyIsImV4ZWN1dGUiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zb3VyY2Utd2ViL2pzL2Jyb3dzZXIvY29udHJvbHMvdmVkYV9jb250cm9sX3V0aWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29udHJvbCB1dGlsaXRpZXNcblxuaW1wb3J0IHZlZGEgZnJvbSAnLi4vLi4vY29tbW9uL3ZlZGEuanMnO1xuXG5pbXBvcnQgSW5kaXZpZHVhbE1vZGVsIGZyb20gJy4uLy4uL2NvbW1vbi9pbmRpdmlkdWFsX21vZGVsLmpzJztcblxuaW1wb3J0IFV0aWwgZnJvbSAnLi4vLi4vY29tbW9uL3V0aWwuanMnO1xuXG5pbXBvcnQgQmFja2VuZCBmcm9tICcuLi8uLi9jb21tb24vYmFja2VuZC5qcyc7XG5cbmV4cG9ydCB7ZnRRdWVyeSwgcmVuZGVyVmFsdWUsIGludGVycG9sYXRlfTtcblxuLyoqXG4gKiBQZXJmb3JtIGZ1bGwgdGV4dCBzZWFyY2ggcXVlcnlcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcmVmaXggLSBUaGUgcHJlZml4IGZvciB0aGUgcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30gaW5wdXQgLSBUaGUgaW5wdXQgdGV4dCB0byBzZWFyY2ggZm9yLlxuICogQHBhcmFtIHtzdHJpbmd9IHNvcnQgLSBUaGUgc29ydGluZyBvcmRlciBvZiB0aGUgcmVzdWx0cy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gd2l0aERlbGV0ZWQgLSBTcGVjaWZpZXMgaWYgZGVsZXRlZCBpdGVtcyBzaG91bGQgYmUgaW5jbHVkZWQgaW4gdGhlIHNlYXJjaCByZXN1bHRzLlxuICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5UGF0dGVybiAtIFRoZSBxdWVyeSBwYXR0ZXJuIHdpdGggJ3t9JyBhcyBhIHBsYWNlaG9sZGVyIGZvciB1c2VyIGlucHV0LlxuICogQHJldHVybiB7UHJvbWlzZX0gLSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgc2VhcmNoIHJlc3VsdHMuXG4gKi9cbmZ1bmN0aW9uIGZ0UXVlcnkgKHByZWZpeCwgaW5wdXQsIHNvcnQsIHdpdGhEZWxldGVkLCBxdWVyeVBhdHRlcm4gPSBcIicqJz09J3t9J1wiKSB7XG4gIGlucHV0ID0gaW5wdXQgPyBpbnB1dC50cmltKCkgOiAnJztcbiAgbGV0IHF1ZXJ5U3RyaW5nID0gJyc7XG5cbiAgaWYgKGlucHV0KSB7XG4gICAgY29uc3QgbGluZXMgPSBpbnB1dC5zcGxpdCgnXFxuJykuZmlsdGVyKEJvb2xlYW4pO1xuICAgIGNvbnN0IGxpbmVRdWVyaWVzID0gbGluZXMubWFwKChsaW5lKSA9PiB7XG4gICAgICBjb25zdCBzcGVjaWFsID0gbGluZSAmJiBsaW5lLmluZGV4T2YoJz09JykgPiAwID8gbGluZSA6IGZhbHNlO1xuICAgICAgaWYgKHNwZWNpYWwpIHtcbiAgICAgICAgcmV0dXJuIHNwZWNpYWw7XG4gICAgICB9XG4gICAgICBjb25zdCB3b3JkcyA9IGxpbmUudHJpbSgpLnJlcGxhY2UoL1stKlxccydcIl0rL2csICcgJykuc3BsaXQoJyAnKS5maWx0ZXIoQm9vbGVhbik7XG4gICAgICByZXR1cm4gd29yZHMubWFwKCh3b3JkKSA9PiB7XG4gICAgICAgIHJldHVybiBxdWVyeVBhdHRlcm4ucmVwbGFjZUFsbCgne30nLCB3b3JkICsgJyonKTtcbiAgICAgIH0pLmpvaW4oJyAmJiAnKTtcbiAgICB9KTtcbiAgICBxdWVyeVN0cmluZyA9IGxpbmVRdWVyaWVzLmZpbHRlcihCb29sZWFuKS5qb2luKCcgfHwgJyk7XG4gIH1cblxuICBpZiAocHJlZml4KSB7XG4gICAgcXVlcnlTdHJpbmcgPSBxdWVyeVN0cmluZyA/ICcoJyArIHByZWZpeCArICcpICYmICgnICsgcXVlcnlTdHJpbmcgKyAnKScgOiAnKCcgKyBwcmVmaXggKyAnKSc7XG4gIH1cblxuICByZXR1cm4gaW5jcmVtZW50YWxTZWFyY2goKVxuICAgIC50aGVuKChyZXN1bHRzKSA9PiB7XG4gICAgICBpZiAod2l0aERlbGV0ZWQpIHtcbiAgICAgICAgcXVlcnlTdHJpbmcgPSBxdWVyeVN0cmluZyArICcgJiYgKFxcJ3YtczpkZWxldGVkXFwnID09IHRydWUgKSc7XG4gICAgICAgIHJldHVybiBpbmNyZW1lbnRhbFNlYXJjaChyZXN1bHRzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgfVxuICAgIH0pXG4gICAgLnRoZW4oKHJlc3VsdHMpID0+IHtcbiAgICAgIHJlc3VsdHMgPSBVdGlsLnVuaXF1ZSggcmVzdWx0cyApO1xuICAgICAgcmV0dXJuIEJhY2tlbmQuZ2V0X2luZGl2aWR1YWxzKHtcbiAgICAgICAgdGlja2V0OiB2ZWRhLnRpY2tldCxcbiAgICAgICAgdXJpczogcmVzdWx0cyxcbiAgICAgIH0pO1xuICAgIH0pXG4gICAgLnRoZW4oKGluZGl2aWR1YWxzKSA9PiBQcm9taXNlLmFsbChpbmRpdmlkdWFscy5tYXAoKGluZGl2aWR1YWwpID0+IG5ldyBJbmRpdmlkdWFsTW9kZWwoaW5kaXZpZHVhbCkuaW5pdCgpKSkpO1xuXG4gIC8qKlxuICAgKiBQZXJmb3JtIGZ1bGwgdGV4dCBzZWFyY2ggcXVlcnkgaW5jcmVtZW50YWxseVxuICAgKiBAcGFyYW0ge0FycmF5fSByZXN1bHRzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjdXJzb3JcbiAgICogQHBhcmFtIHtzdHJpbmd9IGxpbWl0XG4gICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAqL1xuICBmdW5jdGlvbiBpbmNyZW1lbnRhbFNlYXJjaCAocmVzdWx0cyA9IFtdLCBjdXJzb3IgPSAwLCBsaW1pdCA9IDEwMCkge1xuICAgIGNvbnN0IHNvcnRTdWZmaXggPSAodmVkYS51c2VyLmdldExhbmd1YWdlKClbMF0gPyAnXycgKyB2ZWRhLnVzZXIuZ2V0TGFuZ3VhZ2UoKVswXS50b0xvd2VyQ2FzZSgpIDogJycpO1xuICAgIHJldHVybiBCYWNrZW5kLnF1ZXJ5KHtcbiAgICAgIHRpY2tldDogdmVkYS50aWNrZXQsXG4gICAgICBxdWVyeTogcXVlcnlTdHJpbmcsXG4gICAgICBzb3J0OiBzb3J0ID8gc29ydCA6IFwiJ3JkZnM6bGFiZWxcIiArIHNvcnRTdWZmaXggKyBcIicgYXNjXCIsXG4gICAgICBmcm9tOiBjdXJzb3IsXG4gICAgICB0b3A6IDEwLFxuICAgICAgbGltaXQ6IDEwMDAsXG4gICAgfSkudGhlbigocXVlcnlSZXN1bHQpID0+IHtcbiAgICAgIHJlc3VsdHMgPSByZXN1bHRzLmNvbmNhdChxdWVyeVJlc3VsdC5yZXN1bHQpO1xuICAgICAgY29uc3QgcmVzdWx0Q3Vyc29yID0gcXVlcnlSZXN1bHQuY3Vyc29yO1xuICAgICAgY29uc3QgcmVzdWx0RXN0aW1hdGVkID0gcXVlcnlSZXN1bHQuZXN0aW1hdGVkO1xuICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoID49IGxpbWl0IHx8IHJlc3VsdEN1cnNvciA+PSByZXN1bHRFc3RpbWF0ZWQpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXN1bHRzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoaW5jcmVtZW50YWxTZWFyY2gocmVzdWx0cywgcmVzdWx0Q3Vyc29yLCBsaW1pdCkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogUmVuZGVyIG9wdGlvbiB2YWx1ZVxuICogQHBhcmFtIHtJbmRpdmlkdWFsTW9kZWx8c3RyaW5nfG51bWJlcnxCb29sZWFufERhdGV9IHZhbHVlXG4gKiBAcGFyYW0ge3N0cmluZ30gdGVtcGxhdGVcbiAqIEByZXR1cm4ge1Byb21pc2U8c3RyaW5nPn1cbiAqL1xuZnVuY3Rpb24gcmVuZGVyVmFsdWUgKHZhbHVlLCB0ZW1wbGF0ZSkge1xuICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJbmRpdmlkdWFsTW9kZWwpIHtcbiAgICByZXR1cm4gdmFsdWUubG9hZCgpLnRoZW4oKCkgPT4ge1xuICAgICAgaWYgKHRlbXBsYXRlKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoaW50ZXJwb2xhdGUodGVtcGxhdGUsIHZhbHVlKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlLnRvU3RyaW5nKCkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoVXRpbC5mb3JtYXRWYWx1ZSh2YWx1ZSkpO1xuICB9XG59XG5cbi8qKlxuICogSW50ZXJwb2xhdGUgc3RyaW5nIGZvciByZW5kZXJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZW1wbGF0ZVxuICogQHBhcmFtIHtJbmRpdmlkdWFsTW9kZWx9IGluZGl2aWR1YWxcbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbmZ1bmN0aW9uIGludGVycG9sYXRlICh0ZW1wbGF0ZSwgaW5kaXZpZHVhbCkge1xuICBjb25zdCBwcm9taXNlcyA9IFtdO1xuICBjb25zdCByZV9pbnRlcnBvbGF0ZSA9IC97XFxzKiguKj8pXFxzKn0vZztcbiAgY29uc3QgcmVfZXZhbHVhdGUgPSAve3tcXHMqKC4qPylcXHMqfX0vZztcbiAgdGVtcGxhdGUucmVwbGFjZShyZV9ldmFsdWF0ZSwgKG1hdGNoLCBncm91cCkgPT4ge1xuICAgIGNvbnN0IHJlbmRlcmVkID0gZXZhbChncm91cCk7XG4gICAgcHJvbWlzZXMucHVzaChyZW5kZXJlZCk7XG4gICAgcmV0dXJuICcnO1xuICB9KS5yZXBsYWNlKHJlX2ludGVycG9sYXRlLCAobWF0Y2gsIGdyb3VwKSA9PiB7XG4gICAgY29uc3QgcHJvcGVydGllcyA9IGdyb3VwLnNwbGl0KCcuJyk7XG4gICAgbGV0IHRhcmdldCA9IHByb3BlcnRpZXMuc2hpZnQoKTtcbiAgICBpZiAodGFyZ2V0ID09PSAnQCcpIHtcbiAgICAgIHRhcmdldCA9IGluZGl2aWR1YWw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldCA9IG5ldyBJbmRpdmlkdWFsTW9kZWwodGFyZ2V0KTtcbiAgICB9XG4gICAgY29uc3QgcmVuZGVyZWQgPSB0YXJnZXQuZ2V0Q2hhaW5WYWx1ZSguLi5wcm9wZXJ0aWVzKS50aGVuKCh2YWx1ZXMpID0+IHZhbHVlcy5tYXAoVXRpbC5mb3JtYXRWYWx1ZSkuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJyAnKSk7XG4gICAgcHJvbWlzZXMucHVzaChyZW5kZXJlZCk7XG4gICAgcmV0dXJuICcnO1xuICB9KTtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKChmdWxmaWxsZWQpID0+IHtcbiAgICByZXR1cm4gdGVtcGxhdGUucmVwbGFjZShyZV9ldmFsdWF0ZSwgKCkgPT4gZnVsZmlsbGVkLnNoaWZ0KCkpLnJlcGxhY2UocmVfaW50ZXJwb2xhdGUsICgpID0+IGZ1bGZpbGxlZC5zaGlmdCgpKTtcbiAgfSk7XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7RUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFDQSxTQUFTQSxPQUFPQSxDQUFFQyxNQUFNLEVBQUVDLEtBQUssRUFBRUMsSUFBSSxFQUFFQyxXQUFXLEVBQThCO0lBQUEsSUFBNUJDLFlBQVksR0FBQUMsU0FBQSxDQUFBQyxNQUFBLFFBQUFELFNBQUEsUUFBQUUsU0FBQSxHQUFBRixTQUFBLE1BQUcsV0FBVztJQUM1RUosS0FBSyxHQUFHQSxLQUFLLEdBQUdBLEtBQUssQ0FBQ08sSUFBSSxFQUFFLEdBQUcsRUFBRTtJQUNqQyxJQUFJQyxXQUFXLEdBQUcsRUFBRTtJQUVwQixJQUFJUixLQUFLLEVBQUU7TUFDVCxJQUFNUyxLQUFLLEdBQUdULEtBQUssQ0FBQ1UsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDQyxNQUFNLENBQUNDLE9BQU8sQ0FBQztNQUMvQyxJQUFNQyxXQUFXLEdBQUdKLEtBQUssQ0FBQ0ssR0FBRyxDQUFDLFVBQUNDLElBQUksRUFBSztRQUN0QyxJQUFNQyxPQUFPLEdBQUdELElBQUks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