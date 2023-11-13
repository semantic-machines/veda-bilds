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
          $('#label', template).text(individual.id);
        }
      });
      _export("html", html = "\n  <span class=\"label-template\"\n    ><span about=\"@\" rel=\"rdf:type\" data-template=\"v-ui:LabelTemplate\"></span>: <span id=\"label\" about=\"@\" property=\"rdfs:label\"></span\n  ></span>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInBvc3QiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJoYXNWYWx1ZSIsInRleHQiLCJpZCIsImh0bWwiXSwic291cmNlcyI6WyIuLi8uLi9vbnRvbG9neS9zeXN0ZW0tY29yZS90ZW1wbGF0ZXMvdi11aV9DbGFzc05hbWVMYWJlbFRlbXBsYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmV4cG9ydCBjb25zdCBwb3N0ID0gZnVuY3Rpb24gKGluZGl2aWR1YWwsIHRlbXBsYXRlLCBjb250YWluZXIsIG1vZGUsIGV4dHJhKSB7XG4gIHRlbXBsYXRlID0gJCh0ZW1wbGF0ZSk7XG4gIGNvbnRhaW5lciA9ICQoY29udGFpbmVyKTtcblxuICBpZiAoIWluZGl2aWR1YWwuaGFzVmFsdWUoJ3JkZnM6bGFiZWwnKSkge1xuICAgICQoJyNsYWJlbCcsIHRlbXBsYXRlKS50ZXh0KGluZGl2aWR1YWwuaWQpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaHRtbCA9IGBcbiAgPHNwYW4gY2xhc3M9XCJsYWJlbC10ZW1wbGF0ZVwiXG4gICAgPjxzcGFuIGFib3V0PVwiQFwiIHJlbD1cInJkZjp0eXBlXCIgZGF0YS10ZW1wbGF0ZT1cInYtdWk6TGFiZWxUZW1wbGF0ZVwiPjwvc3Bhbj46IDxzcGFuIGlkPVwibGFiZWxcIiBhYm91dD1cIkBcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L3NwYW5cbiAgPjwvc3Bhbj5cbmA7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O01BQU9BLENBQUMsR0FBQUMsT0FBQSxDQUFBQyxPQUFBO0lBQUE7SUFBQUMsT0FBQSxXQUFBQSxDQUFBO01BQUFDLE9BQUEsU0FFS0MsSUFBSSxHQUFHLFNBQVBBLElBQUlBLENBQWFDLFVBQVUsRUFBRUMsUUFBUSxFQUFFQyxTQUFTLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFO1FBQzFFSCxRQUFRLEdBQUdQLENBQUMsQ0FBQ08sUUFBUSxDQUFDO1FBQ3RCQyxTQUFTLEdBQUdSLENBQUMsQ0FBQ1EsU0FBUyxDQUFDO1FBRXhCLElBQUksQ0FBQ0YsVUFBVSxDQUFDSyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7VUFDdENYLENBQUMsQ0FBQyxRQUFRLEVBQUVPLFFBQVEsQ0FBQyxDQUFDSyxJQUFJLENBQUNOLFVBQVUsQ0FBQ08sRUFBRSxDQUFDO1FBQzNDO01BQ0YsQ0FBQztNQUFBVCxPQUFBLFNBRVlVLElBQUk7SUFBQTtFQUFBO0FBQUEifQ==