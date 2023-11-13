"use strict";

System.register(["jquery"], function (_export, _context) {
  "use strict";

  var $, post, html;
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }],
    execute: function () {
      _export("post", post = function post(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        $('input', template).keydown(function (e) {
          if (e.which === 13) {
            var value = this.value;
            individual.set('*', [value]);
            container.siblings('.search-button').click();
          }
        });
      });
      _export("html", html = "\n  <div>\n    <veda-control property=\"*\" data-type=\"string\"></veda-control>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInBvc3QiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJrZXlkb3duIiwiZSIsIndoaWNoIiwidmFsdWUiLCJzZXQiLCJzaWJsaW5ncyIsImNsaWNrIiwiaHRtbCJdLCJzb3VyY2VzIjpbIi4uLy4uL29udG9sb2d5L2dlbmVyaWMtZnVuY3Rpb24vdGVtcGxhdGVzL3Ytc19OZXdzU2VhcmNoQmxhbmtUZW1wbGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG5leHBvcnQgY29uc3QgcG9zdCA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgJCgnaW5wdXQnLCB0ZW1wbGF0ZSkua2V5ZG93bihmdW5jdGlvbiAoZSkge1xuICAgIGlmIChlLndoaWNoID09PSAxMykge1xuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgaW5kaXZpZHVhbC5zZXQoJyonLCBbdmFsdWVdKTtcbiAgICAgIGNvbnRhaW5lci5zaWJsaW5ncygnLnNlYXJjaC1idXR0b24nKS5jbGljaygpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgaHRtbCA9IGBcbiAgPGRpdj5cbiAgICA8dmVkYS1jb250cm9sIHByb3BlcnR5PVwiKlwiIGRhdGEtdHlwZT1cInN0cmluZ1wiPjwvdmVkYS1jb250cm9sPlxuICA8L2Rpdj5cbmA7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O01BQU9BLENBQUMsR0FBQUMsT0FBQSxDQUFBQyxPQUFBO0lBQUE7SUFBQUMsT0FBQSxXQUFBQSxDQUFBO01BQUFDLE9BQUEsU0FFS0MsSUFBSSxHQUFHLFNBQVBBLElBQUlBLENBQWFDLFVBQVUsRUFBRUMsUUFBUSxFQUFFQyxTQUFTLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFO1FBQzFFSCxRQUFRLEdBQUdQLENBQUMsQ0FBQ08sUUFBUSxDQUFDO1FBQ3RCQyxTQUFTLEdBQUdSLENBQUMsQ0FBQ1EsU0FBUyxDQUFDO1FBRXhCUixDQUFDLENBQUMsT0FBTyxFQUFFTyxRQUFRLENBQUMsQ0FBQ0ksT0FBTyxDQUFDLFVBQVVDLENBQUMsRUFBRTtVQUN4QyxJQUFJQSxDQUFDLENBQUNDLEtBQUssS0FBSyxFQUFFLEVBQUU7WUFDbEIsSUFBTUMsS0FBSyxHQUFHLElBQUksQ0FBQ0EsS0FBSztZQUN4QlIsVUFBVSxDQUFDUyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUNELEtBQUssQ0FBQyxDQUFDO1lBQzVCTixTQUFTLENBQUNRLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDQyxLQUFLLEVBQUU7VUFDOUM7UUFDRixDQUFDLENBQUM7TUFDSixDQUFDO01BQUFiLE9BQUEsU0FFWWMsSUFBSTtJQUFBO0VBQUE7QUFBQSJ9