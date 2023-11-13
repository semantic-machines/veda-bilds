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
        if (!individual.hasValue('rdfs:label')) {
          template.text(individual.id);
        }
        var done;
        var initPopoverTimeout;
        var type = individual.hasValue('rdf:type') && individual['rdf:type'][0].id;
        if (type === 'v-s:Appointment' || type === 'v-s:Person' || type === 'v-s:Position' || type === 'v-s:Organization') {
          template.css('cursor', 'help').click(function () {
            if (done) return;
            initPopover();
          }).one('remove', function () {
            template.popover('destroy');
          });
        }
        function initPopover() {
          var cntr = $('<div></div>');
          var tmpl;
          if (type === 'v-s:Appointment') {
            tmpl = 'v-ui:AppointmentPopoverTemplate';
          } else if (type === 'v-s:Person') {
            tmpl = 'v-ui:PersonPopoverTemplate';
          } else if (type === 'v-s:Organization') {
            tmpl = 'v-ui:OrganizationPopoverTemplate';
          } else {
            tmpl = 'v-ui:PositionPopoverTemplate';
          }
          individual.present(cntr, tmpl).then(function () {
            done = true;
            template.popover({
              trigger: 'click',
              placement: 'auto bottom',
              html: true,
              container: $('div#main'),
              content: cntr
            }).click();
            cntr.on('click', '.close', function (e) {
              e.stopPropagation();
              template.click();
            });
          });
        }
        ;
      });
      _export("html", html = "\n  <span class=\"label-template\" about=\"@\" property=\"rdfs:label\"></span>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInBvc3QiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJoYXNWYWx1ZSIsInRleHQiLCJpZCIsImRvbmUiLCJpbml0UG9wb3ZlclRpbWVvdXQiLCJ0eXBlIiwiY3NzIiwiY2xpY2siLCJpbml0UG9wb3ZlciIsIm9uZSIsInBvcG92ZXIiLCJjbnRyIiwidG1wbCIsInByZXNlbnQiLCJ0aGVuIiwidHJpZ2dlciIsInBsYWNlbWVudCIsImh0bWwiLCJjb250ZW50Iiwib24iLCJlIiwic3RvcFByb3BhZ2F0aW9uIl0sInNvdXJjZXMiOlsiLi4vLi4vb250b2xvZ3kvc3lzdGVtLWNvcmUvdGVtcGxhdGVzL3YtdWlfTGFiZWxUZW1wbGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG5leHBvcnQgY29uc3QgcG9zdCA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgaWYgKCFpbmRpdmlkdWFsLmhhc1ZhbHVlKCdyZGZzOmxhYmVsJykpIHtcbiAgICB0ZW1wbGF0ZS50ZXh0KGluZGl2aWR1YWwuaWQpO1xuICB9XG4gIGxldCBkb25lO1xuICBsZXQgaW5pdFBvcG92ZXJUaW1lb3V0O1xuICBjb25zdCB0eXBlID0gaW5kaXZpZHVhbC5oYXNWYWx1ZSgncmRmOnR5cGUnKSAmJiBpbmRpdmlkdWFsWydyZGY6dHlwZSddWzBdLmlkO1xuICBpZiAodHlwZSA9PT0gJ3YtczpBcHBvaW50bWVudCcgfHwgdHlwZSA9PT0gJ3YtczpQZXJzb24nIHx8IHR5cGUgPT09ICd2LXM6UG9zaXRpb24nIHx8IHR5cGUgPT09ICd2LXM6T3JnYW5pemF0aW9uJykge1xuICAgIHRlbXBsYXRlXG4gICAgICAuY3NzKCdjdXJzb3InLCAnaGVscCcpXG4gICAgICAuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoZG9uZSkgcmV0dXJuO1xuICAgICAgICBpbml0UG9wb3ZlcigpO1xuICAgICAgfSlcbiAgICAgIC5vbmUoJ3JlbW92ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGVtcGxhdGUucG9wb3ZlcignZGVzdHJveScpO1xuICAgICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0UG9wb3ZlciAoKSB7XG4gICAgY29uc3QgY250ciA9ICQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgbGV0IHRtcGw7XG4gICAgaWYgKHR5cGUgPT09ICd2LXM6QXBwb2ludG1lbnQnKSB7XG4gICAgICB0bXBsID0gJ3YtdWk6QXBwb2ludG1lbnRQb3BvdmVyVGVtcGxhdGUnO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3YtczpQZXJzb24nKSB7XG4gICAgICB0bXBsID0gJ3YtdWk6UGVyc29uUG9wb3ZlclRlbXBsYXRlJztcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd2LXM6T3JnYW5pemF0aW9uJykge1xuICAgICAgdG1wbCA9ICd2LXVpOk9yZ2FuaXphdGlvblBvcG92ZXJUZW1wbGF0ZSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRtcGwgPSAndi11aTpQb3NpdGlvblBvcG92ZXJUZW1wbGF0ZSc7XG4gICAgfVxuICAgIGluZGl2aWR1YWwucHJlc2VudChjbnRyLCB0bXBsKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgdGVtcGxhdGVcbiAgICAgICAgLnBvcG92ZXIoe1xuICAgICAgICAgIHRyaWdnZXI6ICdjbGljaycsXG4gICAgICAgICAgcGxhY2VtZW50OiAnYXV0byBib3R0b20nLFxuICAgICAgICAgIGh0bWw6IHRydWUsXG4gICAgICAgICAgY29udGFpbmVyOiAkKCdkaXYjbWFpbicpLFxuICAgICAgICAgIGNvbnRlbnQ6IGNudHIsXG4gICAgICAgIH0pXG4gICAgICAgIC5jbGljaygpO1xuICAgICAgY250ci5vbignY2xpY2snLCAnLmNsb3NlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdGVtcGxhdGUuY2xpY2soKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGh0bWwgPSBgXG4gIDxzcGFuIGNsYXNzPVwibGFiZWwtdGVtcGxhdGVcIiBhYm91dD1cIkBcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L3NwYW4+XG5gO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztNQUFPQSxDQUFDLEdBQUFDLE9BQUEsQ0FBQUMsT0FBQTtJQUFBO0lBQUFDLE9BQUEsV0FBQUEsQ0FBQTtNQUFBQyxPQUFBLFNBRUtDLElBQUksR0FBRyxTQUFQQSxJQUFJQSxDQUFhQyxVQUFVLEVBQUVDLFFBQVEsRUFBRUMsU0FBUyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRTtRQUMxRUgsUUFBUSxHQUFHUCxDQUFDLENBQUNPLFFBQVEsQ0FBQztRQUN0QkMsU0FBUyxHQUFHUixDQUFDLENBQUNRLFNBQVMsQ0FBQztRQUV4QixJQUFJLENBQUNGLFVBQVUsQ0FBQ0ssUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO1VBQ3RDSixRQUFRLENBQUNLLElBQUksQ0FBQ04sVUFBVSxDQUFDTyxFQUFFLENBQUM7UUFDOUI7UUFDQSxJQUFJQyxJQUFJO1FBQ1IsSUFBSUMsa0JBQWtCO1FBQ3RCLElBQU1DLElBQUksR0FBR1YsVUFBVSxDQUFDSyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUlMLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ08sRUFBRTtRQUM1RSxJQUFJRyxJQUFJLEtBQUssaUJBQWlCLElBQUlBLElBQUksS0FBSyxZQUFZLElBQUlBLElBQUksS0FBSyxjQUFjLElBQUlBLElBQUksS0FBSyxrQkFBa0IsRUFBRTtVQUNqSFQsUUFBUSxDQUNMVSxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUNyQkMsS0FBSyxDQUFDLFlBQVk7WUFDakIsSUFBSUosSUFBSSxFQUFFO1lBQ1ZLLFdBQVcsRUFBRTtVQUNmLENBQUMsQ0FBQyxDQUNEQyxHQUFHLENBQUMsUUFBUSxFQUFFLFlBQVk7WUFDekJiLFFBQVEsQ0FBQ2MsT0FBTyxDQUFDLFNBQVMsQ0FBQztVQUM3QixDQUFDLENBQUM7UUFDTjtRQUVBLFNBQVNGLFdBQVdBLENBQUEsRUFBSTtVQUN0QixJQUFNRyxJQUFJLEdBQUd0QixDQUFDLENBQUMsYUFBYSxDQUFDO1VBQzdCLElBQUl1QixJQUFJO1VBQ1IsSUFBSVAsSUFBSSxLQUFLLGlCQUFpQixFQUFFO1lBQzlCTyxJQUFJLEdBQUcsaUNBQWlDO1VBQzFDLENBQUMsTUFBTSxJQUFJUCxJQUFJLEtBQUssWUFBWSxFQUFFO1lBQ2hDTyxJQUFJLEdBQUcsNEJBQTRCO1VBQ3JDLENBQUMsTUFBTSxJQUFJUCxJQUFJLEtBQUssa0JBQWtCLEVBQUU7WUFDdENPLElBQUksR0FBRyxrQ0FBa0M7VUFDM0MsQ0FBQyxNQUFNO1lBQ0xBLElBQUksR0FBRyw4QkFBOEI7VUFDdkM7VUFDQWpCLFVBQVUsQ0FBQ2tCLE9BQU8sQ0FBQ0YsSUFBSSxFQUFFQyxJQUFJLENBQUMsQ0FBQ0UsSUFBSSxDQUFDLFlBQVk7WUFDOUNYLElBQUksR0FBRyxJQUFJO1lBQ1hQLFFBQVEsQ0FDTGMsT0FBTyxDQUFDO2NBQ1BLLE9BQU8sRUFBRSxPQUFPO2NBQ2hCQyxTQUFTLEVBQUUsYUFBYTtjQUN4QkMsSUFBSSxFQUFFLElBQUk7Y0FDVnBCLFNBQVMsRUFBRVIsQ0FBQyxDQUFDLFVBQVUsQ0FBQztjQUN4QjZCLE9BQU8sRUFBRVA7WUFDWCxDQUFDLENBQUMsQ0FDREosS0FBSyxFQUFFO1lBQ1ZJLElBQUksQ0FBQ1EsRUFBRSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsVUFBVUMsQ0FBQyxFQUFFO2NBQ3RDQSxDQUFDLENBQUNDLGVBQWUsRUFBRTtjQUNuQnpCLFFBQVEsQ0FBQ1csS0FBSyxFQUFFO1lBQ2xCLENBQUMsQ0FBQztVQUNKLENBQUMsQ0FBQztRQUNKO1FBQUM7TUFDSCxDQUFDO01BQUFkLE9BQUEsU0FFWXdCLElBQUk7SUFBQTtFQUFBO0FBQUEifQ==