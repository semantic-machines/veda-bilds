"use strict";

System.register([], function (_export, _context) {
  "use strict";

  /**
   * Validate individual property values against property specification
   * @param {IndividualModel} individual - individual to validate
   * @param {string} property_uri - property which values are validated
   * @param {IndividualModel} spec - Property specification to validate values against
   * @return {Object} - validation result
   */
  function validate(individual, property_uri, spec) {
    var result = {
      state: true,
      cause: []
    };
    if (!spec) {
      return result;
    }
    var values = individual.get(property_uri);
    // cardinality check
    if (spec.hasValue('v-ui:minCardinality')) {
      var minCardinalityState = values.length >= spec['v-ui:minCardinality'][0];
      result.state = result.state && minCardinalityState;
      if (!minCardinalityState) {
        result.cause.push('v-ui:minCardinality');
      }
    }
    if (spec.hasValue('v-ui:maxCardinality')) {
      var maxCardinalityState = values.length <= spec['v-ui:maxCardinality'][0];
      result.state = result.state && maxCardinalityState;
      if (!maxCardinalityState) {
        result.cause.push('v-ui:maxCardinality');
      }
    }
    // check each value
    result = result && values.reduce(function (acc, value) {
      // regexp check
      if (spec.hasValue('v-ui:regexp')) {
        var regexp = new RegExp(spec['v-ui:regexp'][0]);
        var regexpState = regexp.test(value.toString());
        acc.state = acc.state && regexpState;
        if (!regexpState) {
          acc.cause.push('v-ui:regexp');
        }
      }
      // range check
      switch (spec['rdf:type'][0].id) {
        case 'v-ui:DatatypePropertySpecification':
          if (spec.hasValue('v-ui:minValue')) {
            var minValueState = value >= spec['v-ui:minValue'][0];
            acc.state = acc.state && minValueState;
            if (!minValueState) {
              acc.cause.push('v-ui:minValue');
            }
          }
          if (spec.hasValue('v-ui:maxValue')) {
            var maxValueState = value <= spec['v-ui:maxValue'][0];
            acc.state = acc.state && maxValueState;
            if (!maxValueState) {
              acc.cause.push('v-ui:maxValue');
            }
          }
          if (spec.hasValue('v-ui:minLength')) {
            var minLengthState = value.toString().length >= spec['v-ui:minLength'][0];
            acc.state = acc.state && minLengthState;
            if (!minLengthState) {
              acc.cause.push('v-ui:minLength');
            }
          }
          if (spec.hasValue('v-ui:maxLength')) {
            var maxLengthState = value.toString().length <= spec['v-ui:maxLength'][0];
            acc.state = acc.state && maxLengthState;
            if (!maxLengthState) {
              acc.cause.push('v-ui:maxLength');
            }
          }
          break;
        case 'v-ui:ObjectPropertySpecification':
          break;
      }
      return acc;
    }, result);
    return result;
  }
  return {
    setters: [],
    execute: function () {
      // Validate a property in individual against property specification
      _export("default", validate);
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ2YWxpZGF0ZSIsImluZGl2aWR1YWwiLCJwcm9wZXJ0eV91cmkiLCJzcGVjIiwicmVzdWx0Iiwic3RhdGUiLCJjYXVzZSIsInZhbHVlcyIsImdldCIsImhhc1ZhbHVlIiwibWluQ2FyZGluYWxpdHlTdGF0ZSIsImxlbmd0aCIsInB1c2giLCJtYXhDYXJkaW5hbGl0eVN0YXRlIiwicmVkdWNlIiwiYWNjIiwidmFsdWUiLCJyZWdleHAiLCJSZWdFeHAiLCJyZWdleHBTdGF0ZSIsInRlc3QiLCJ0b1N0cmluZyIsImlkIiwibWluVmFsdWVTdGF0ZSIsIm1heFZhbHVlU3RhdGUiLCJtaW5MZW5ndGhTdGF0ZSIsIm1heExlbmd0aFN0YXRlIiwic2V0dGVycyIsImV4ZWN1dGUiLCJfZXhwb3J0Il0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc291cmNlLXdlYi9qcy9icm93c2VyL3ZhbGlkYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFZhbGlkYXRlIGEgcHJvcGVydHkgaW4gaW5kaXZpZHVhbCBhZ2FpbnN0IHByb3BlcnR5IHNwZWNpZmljYXRpb25cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGU7XG5cbi8qKlxuICogVmFsaWRhdGUgaW5kaXZpZHVhbCBwcm9wZXJ0eSB2YWx1ZXMgYWdhaW5zdCBwcm9wZXJ0eSBzcGVjaWZpY2F0aW9uXG4gKiBAcGFyYW0ge0luZGl2aWR1YWxNb2RlbH0gaW5kaXZpZHVhbCAtIGluZGl2aWR1YWwgdG8gdmFsaWRhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eV91cmkgLSBwcm9wZXJ0eSB3aGljaCB2YWx1ZXMgYXJlIHZhbGlkYXRlZFxuICogQHBhcmFtIHtJbmRpdmlkdWFsTW9kZWx9IHNwZWMgLSBQcm9wZXJ0eSBzcGVjaWZpY2F0aW9uIHRvIHZhbGlkYXRlIHZhbHVlcyBhZ2FpbnN0XG4gKiBAcmV0dXJuIHtPYmplY3R9IC0gdmFsaWRhdGlvbiByZXN1bHRcbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGUgKGluZGl2aWR1YWwsIHByb3BlcnR5X3VyaSwgc3BlYykge1xuICBsZXQgcmVzdWx0ID0ge1xuICAgIHN0YXRlOiB0cnVlLFxuICAgIGNhdXNlOiBbXSxcbiAgfTtcbiAgaWYgKCFzcGVjKSB7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBjb25zdCB2YWx1ZXMgPSBpbmRpdmlkdWFsLmdldChwcm9wZXJ0eV91cmkpO1xuICAvLyBjYXJkaW5hbGl0eSBjaGVja1xuICBpZiAoc3BlYy5oYXNWYWx1ZSgndi11aTptaW5DYXJkaW5hbGl0eScpKSB7XG4gICAgY29uc3QgbWluQ2FyZGluYWxpdHlTdGF0ZSA9IHZhbHVlcy5sZW5ndGggPj0gc3BlY1sndi11aTptaW5DYXJkaW5hbGl0eSddWzBdO1xuICAgIHJlc3VsdC5zdGF0ZSA9IHJlc3VsdC5zdGF0ZSAmJiBtaW5DYXJkaW5hbGl0eVN0YXRlO1xuICAgIGlmICghbWluQ2FyZGluYWxpdHlTdGF0ZSkge1xuICAgICAgcmVzdWx0LmNhdXNlLnB1c2goJ3YtdWk6bWluQ2FyZGluYWxpdHknKTtcbiAgICB9XG4gIH1cbiAgaWYgKHNwZWMuaGFzVmFsdWUoJ3YtdWk6bWF4Q2FyZGluYWxpdHknKSkge1xuICAgIGNvbnN0IG1heENhcmRpbmFsaXR5U3RhdGUgPSB2YWx1ZXMubGVuZ3RoIDw9IHNwZWNbJ3YtdWk6bWF4Q2FyZGluYWxpdHknXVswXTtcbiAgICByZXN1bHQuc3RhdGUgPSByZXN1bHQuc3RhdGUgJiYgbWF4Q2FyZGluYWxpdHlTdGF0ZTtcbiAgICBpZiAoIW1heENhcmRpbmFsaXR5U3RhdGUpIHtcbiAgICAgIHJlc3VsdC5jYXVzZS5wdXNoKCd2LXVpOm1heENhcmRpbmFsaXR5Jyk7XG4gICAgfVxuICB9XG4gIC8vIGNoZWNrIGVhY2ggdmFsdWVcbiAgcmVzdWx0ID0gcmVzdWx0ICYmIHZhbHVlcy5yZWR1Y2UoKGFjYywgdmFsdWUpID0+IHtcbiAgICAvLyByZWdleHAgY2hlY2tcbiAgICBpZiAoc3BlYy5oYXNWYWx1ZSgndi11aTpyZWdleHAnKSkge1xuICAgICAgY29uc3QgcmVnZXhwID0gbmV3IFJlZ0V4cChzcGVjWyd2LXVpOnJlZ2V4cCddWzBdKTtcbiAgICAgIGNvbnN0IHJlZ2V4cFN0YXRlID0gcmVnZXhwLnRlc3QodmFsdWUudG9TdHJpbmcoKSk7XG4gICAgICBhY2Muc3RhdGUgPSBhY2Muc3RhdGUgJiYgcmVnZXhwU3RhdGU7XG4gICAgICBpZiAoIXJlZ2V4cFN0YXRlKSB7XG4gICAgICAgIGFjYy5jYXVzZS5wdXNoKCd2LXVpOnJlZ2V4cCcpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyByYW5nZSBjaGVja1xuICAgIHN3aXRjaCAoc3BlY1sncmRmOnR5cGUnXVswXS5pZCkge1xuICAgIGNhc2UgJ3YtdWk6RGF0YXR5cGVQcm9wZXJ0eVNwZWNpZmljYXRpb24nOlxuICAgICAgaWYgKHNwZWMuaGFzVmFsdWUoJ3YtdWk6bWluVmFsdWUnKSkge1xuICAgICAgICBjb25zdCBtaW5WYWx1ZVN0YXRlID0gKHZhbHVlID49IHNwZWNbJ3YtdWk6bWluVmFsdWUnXVswXSk7XG4gICAgICAgIGFjYy5zdGF0ZSA9IGFjYy5zdGF0ZSAmJiBtaW5WYWx1ZVN0YXRlO1xuICAgICAgICBpZiAoIW1pblZhbHVlU3RhdGUpIHtcbiAgICAgICAgICBhY2MuY2F1c2UucHVzaCgndi11aTptaW5WYWx1ZScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3BlYy5oYXNWYWx1ZSgndi11aTptYXhWYWx1ZScpKSB7XG4gICAgICAgIGNvbnN0IG1heFZhbHVlU3RhdGUgPSAodmFsdWUgPD0gc3BlY1sndi11aTptYXhWYWx1ZSddWzBdKTtcbiAgICAgICAgYWNjLnN0YXRlID0gYWNjLnN0YXRlICYmIG1heFZhbHVlU3RhdGU7XG4gICAgICAgIGlmICghbWF4VmFsdWVTdGF0ZSkge1xuICAgICAgICAgIGFjYy5jYXVzZS5wdXNoKCd2LXVpOm1heFZhbHVlJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzcGVjLmhhc1ZhbHVlKCd2LXVpOm1pbkxlbmd0aCcpKSB7XG4gICAgICAgIGNvbnN0IG1pbkxlbmd0aFN0YXRlID0gKHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoID49IHNwZWNbJ3YtdWk6bWluTGVuZ3RoJ11bMF0pO1xuICAgICAgICBhY2Muc3RhdGUgPSBhY2Muc3RhdGUgJiYgbWluTGVuZ3RoU3RhdGU7XG4gICAgICAgIGlmICghbWluTGVuZ3RoU3RhdGUpIHtcbiAgICAgICAgICBhY2MuY2F1c2UucHVzaCgndi11aTptaW5MZW5ndGgnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHNwZWMuaGFzVmFsdWUoJ3YtdWk6bWF4TGVuZ3RoJykpIHtcbiAgICAgICAgY29uc3QgbWF4TGVuZ3RoU3RhdGUgPSAodmFsdWUudG9TdHJpbmcoKS5sZW5ndGggPD0gc3BlY1sndi11aTptYXhMZW5ndGgnXVswXSk7XG4gICAgICAgIGFjYy5zdGF0ZSA9IGFjYy5zdGF0ZSAmJiBtYXhMZW5ndGhTdGF0ZTtcbiAgICAgICAgaWYgKCFtYXhMZW5ndGhTdGF0ZSkge1xuICAgICAgICAgIGFjYy5jYXVzZS5wdXNoKCd2LXVpOm1heExlbmd0aCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICd2LXVpOk9iamVjdFByb3BlcnR5U3BlY2lmaWNhdGlvbic6XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIGFjYztcbiAgfSwgcmVzdWx0KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNBLFNBQVNBLFFBQVFBLENBQUVDLFVBQVUsRUFBRUMsWUFBWSxFQUFFQyxJQUFJLEVBQUU7SUFDakQsSUFBSUMsTUFBTSxHQUFHO01BQ1hDLEtBQUssRUFBRSxJQUFJO01BQ1hDLEtBQUssRUFBRTtJQUNULENBQUM7SUFDRCxJQUFJLENBQUNILElBQUksRUFBRTtNQUNULE9BQU9DLE1BQU07SUFDZjtJQUNBLElBQU1HLE1BQU0s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