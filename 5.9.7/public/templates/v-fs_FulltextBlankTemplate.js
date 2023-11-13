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
        var find = container.siblings('.search-actions').find('#search-button.search-button');
        var customFind = $('#custom-search-button.search-button', template);
        customFind.click(function () {
          find.click();
        });
        $('input', template).keydown(function (e) {
          if (e.which === 13 && this.value) {
            var value = this.value;
            individual.set('*', [value]);
            find.click();
          }
        });
        function propertyModifiedHandler() {
          if (individual.hasValue('*')) {
            customFind.removeAttr('disabled', 'disabled');
            find.removeAttr('disabled', 'disabled');
          } else {
            customFind.attr('disabled', 'disabled');
            find.attr('disabled', 'disabled');
          }
        }
        propertyModifiedHandler();
        individual.on('propertyModified', propertyModifiedHandler);
        template.one('remove', function () {
          individual.off('propertyModified', propertyModifiedHandler);
        });
      });
      _export("html", html = "\n  <div>\n    <style>\n      .input-group input {\n        border-top-left-radius: 4px !important;\n        border-bottom-left-radius: 4px !important;\n      }\n    </style>\n    <em about=\"v-fs:SearchForContentBundle\" property=\"rdfs:label\"></em>\n    <div class=\"input-group\">\n      <veda-control property=\"*\" data-type=\"string\" placeholder=\"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\"></veda-control>\n      <span class=\"input-group-btn\">\n        <button class=\"btn btn-primary search-button\" id=\"custom-search-button\" type=\"button\" about=\"v-fs:Find\" property=\"rdfs:label\"></button>\n      </span>\n    </div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInBvc3QiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJmaW5kIiwic2libGluZ3MiLCJjdXN0b21GaW5kIiwiY2xpY2siLCJrZXlkb3duIiwiZSIsIndoaWNoIiwidmFsdWUiLCJzZXQiLCJwcm9wZXJ0eU1vZGlmaWVkSGFuZGxlciIsImhhc1ZhbHVlIiwicmVtb3ZlQXR0ciIsImF0dHIiLCJvbiIsIm9uZSIsIm9mZiIsImh0bWwiXSwic291cmNlcyI6WyIuLi8uLi9vbnRvbG9neS9nZW5lcmljLWZ1bmN0aW9uL3RlbXBsYXRlcy92LWZzX0Z1bGx0ZXh0QmxhbmtUZW1wbGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG5leHBvcnQgY29uc3QgcG9zdCA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgY29uc3QgZmluZCA9IGNvbnRhaW5lci5zaWJsaW5ncygnLnNlYXJjaC1hY3Rpb25zJykuZmluZCgnI3NlYXJjaC1idXR0b24uc2VhcmNoLWJ1dHRvbicpO1xuICBjb25zdCBjdXN0b21GaW5kID0gJCgnI2N1c3RvbS1zZWFyY2gtYnV0dG9uLnNlYXJjaC1idXR0b24nLCB0ZW1wbGF0ZSk7XG4gIGN1c3RvbUZpbmQuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIGZpbmQuY2xpY2soKTtcbiAgfSk7XG5cbiAgJCgnaW5wdXQnLCB0ZW1wbGF0ZSkua2V5ZG93bihmdW5jdGlvbiAoZSkge1xuICAgIGlmIChlLndoaWNoID09PSAxMyAmJiB0aGlzLnZhbHVlKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICBpbmRpdmlkdWFsLnNldCgnKicsIFt2YWx1ZV0pO1xuICAgICAgZmluZC5jbGljaygpO1xuICAgIH1cbiAgfSk7XG4gIGZ1bmN0aW9uIHByb3BlcnR5TW9kaWZpZWRIYW5kbGVyICgpIHtcbiAgICBpZiAoaW5kaXZpZHVhbC5oYXNWYWx1ZSgnKicpKSB7XG4gICAgICBjdXN0b21GaW5kLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgICBmaW5kLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1c3RvbUZpbmQuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAgIGZpbmQuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICB9XG4gIH1cbiAgcHJvcGVydHlNb2RpZmllZEhhbmRsZXIoKTtcbiAgaW5kaXZpZHVhbC5vbigncHJvcGVydHlNb2RpZmllZCcsIHByb3BlcnR5TW9kaWZpZWRIYW5kbGVyKTtcbiAgdGVtcGxhdGUub25lKCdyZW1vdmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgaW5kaXZpZHVhbC5vZmYoJ3Byb3BlcnR5TW9kaWZpZWQnLCBwcm9wZXJ0eU1vZGlmaWVkSGFuZGxlcik7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGh0bWwgPSBgXG4gIDxkaXY+XG4gICAgPHN0eWxlPlxuICAgICAgLmlucHV0LWdyb3VwIGlucHV0IHtcbiAgICAgICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNHB4ICFpbXBvcnRhbnQ7XG4gICAgICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDRweCAhaW1wb3J0YW50O1xuICAgICAgfVxuICAgIDwvc3R5bGU+XG4gICAgPGVtIGFib3V0PVwidi1mczpTZWFyY2hGb3JDb250ZW50QnVuZGxlXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9lbT5cbiAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgIDx2ZWRhLWNvbnRyb2wgcHJvcGVydHk9XCIqXCIgZGF0YS10eXBlPVwic3RyaW5nXCIgcGxhY2Vob2xkZXI9XCLQktCy0LXQtNC40YLQtSDQt9Cw0L/RgNC+0YFcIj48L3ZlZGEtY29udHJvbD5cbiAgICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYnRuXCI+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgc2VhcmNoLWJ1dHRvblwiIGlkPVwiY3VzdG9tLXNlYXJjaC1idXR0b25cIiB0eXBlPVwiYnV0dG9uXCIgYWJvdXQ9XCJ2LWZzOkZpbmRcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L2J1dHRvbj5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5gO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztNQUFPQSxDQUFDLEdBQUFDLE9BQUEsQ0FBQUMsT0FBQTtJQUFBO0lBQUFDLE9BQUEsV0FBQUEsQ0FBQTtNQUFBQyxPQUFBLFNBRUtDLElBQUksR0FBRyxTQUFQQSxJQUFJQSxDQUFhQyxVQUFVLEVBQUVDLFFBQVEsRUFBRUMsU0FBUyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRTtRQUMxRUgsUUFBUSxHQUFHUCxDQUFDLENBQUNPLFFBQVEsQ0FBQztRQUN0QkMsU0FBUyxHQUFHUixDQUFDLENBQUNRLFNBQVMsQ0FBQztRQUV4QixJQUFNRyxJQUFJLEdBQUdILFNBQVMsQ0FBQ0ksUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUNELElBQUksQ0FBQyw4QkFBOEIsQ0FBQztRQUN2RixJQUFNRSxVQUFVLEdBQUdiLENBQUMsQ0FBQyxxQ0FBcUMsRUFBRU8sUUFBUSxDQUFDO1FBQ3JFTSxVQUFVLENBQUNDLEtBQUssQ0FBQyxZQUFZO1VBQzNCSCxJQUFJLENBQUNHLEtBQUssRUFBRTtRQUNkLENBQUMsQ0FBQztRQUVGZCxDQUFDLENBQUMsT0FBTyxFQUFFTyxRQUFRLENBQUMsQ0FBQ1EsT0FBTyxDQUFDLFVBQVVDLENBQUMsRUFBRTtVQUN4QyxJQUFJQSxDQUFDLENBQUNDLEtBQUssS0FBSyxFQUFFLElBQUksSUFBSSxDQUFDQyxLQUFLLEVBQUU7WUFDaEMsSUFBTUEsS0FBSyxHQUFHLElBQUksQ0FBQ0EsS0FBSztZQUN4QlosVUFBVSxDQUFDYSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUNELEtBQUssQ0FBQyxDQUFDO1lBQzVCUCxJQUFJLENBQUNHLEtBQUssRUFBRTtVQUNkO1FBQ0YsQ0FBQyxDQUFDO1FBQ0YsU0FBU00sdUJBQXVCQSxDQUFBLEVBQUk7VUFDbEMsSUFBSWQsVUFBVSxDQUFDZSxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDNUJSLFVBQVUsQ0FBQ1MsVUFBVSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUM7WUFDN0NYLElBQUksQ0FBQ1csVUFBVSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUM7VUFDekMsQ0FBQyxNQUFNO1lBQ0xULFVBQVUsQ0FBQ1UsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUM7WUFDdkNaLElBQUksQ0FBQ1ksSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUM7VUFDbkM7UUFDRjtRQUNBSCx1QkFBdUIsRUFBRTtRQUN6QmQsVUFBVSxDQUFDa0IsRUFBRSxDQUFDLGtCQUFrQixFQUFFSix1QkFBdUIsQ0FBQztRQUMxRGIsUUFBUSxDQUFDa0IsR0FBRyxDQUFDLFFBQVEsRUFBRSxZQUFZO1VBQ2pDbkIsVUFBVSxDQUFDb0IsR0FBRyxDQUFDLGtCQUFrQixFQUFFTix1QkFBdUIsQ0FBQztRQUM3RCxDQUFDLENBQUM7TUFDSixDQUFDO01BQUFoQixPQUFBLFNBRVl1QixJQUFJO0lBQUE7RUFBQTtBQUFBIn0=