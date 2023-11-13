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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInBvc3QiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJrZXlkb3duIiwiZSIsIndoaWNoIiwidmFsdWUiLCJzZXQiLCJzaWJsaW5ncyIsImNsaWNrIiwiaHRtbCJdLCJzb3VyY2VzIjpbIi4uLy4uL29udG9sb2d5L2dlbmVyaWMtYXBwbGljYXRpb24vdGVtcGxhdGVzL3YtdWlfQWRtaW5CbGFua1RlbXBsYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmV4cG9ydCBjb25zdCBwb3N0ID0gZnVuY3Rpb24gKGluZGl2aWR1YWwsIHRlbXBsYXRlLCBjb250YWluZXIsIG1vZGUsIGV4dHJhKSB7XG4gIHRlbXBsYXRlID0gJCh0ZW1wbGF0ZSk7XG4gIGNvbnRhaW5lciA9ICQoY29udGFpbmVyKTtcblxuICAkKCdpbnB1dCcsIHRlbXBsYXRlKS5rZXlkb3duKGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKGUud2hpY2ggPT09IDEzKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICBpbmRpdmlkdWFsLnNldCgnKicsIFt2YWx1ZV0pO1xuICAgICAgY29udGFpbmVyLnNpYmxpbmdzKCcuc2VhcmNoLWJ1dHRvbicpLmNsaWNrKCk7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBodG1sID0gYFxuICA8ZGl2PlxuICAgIDx2ZWRhLWNvbnRyb2wgcHJvcGVydHk9XCIqXCIgZGF0YS10eXBlPVwic3RyaW5nXCI+PC92ZWRhLWNvbnRyb2w+XG4gIDwvZGl2PlxuYDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7TUFBT0EsQ0FBQyxHQUFBQyxPQUFBLENBQUFDLE9BQUE7SUFBQTtJQUFBQyxPQUFBLFdBQUFBLENBQUE7TUFBQUMsT0FBQSxTQUVLQyxJQUFJLEdBQUcsU0FBUEEsSUFBSUEsQ0FBYUMsVUFBVSxFQUFFQyxRQUFRLEVBQUVDLFNBQVMsRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUU7UUFDMUVILFFBQVEsR0FBR1AsQ0FBQyxDQUFDTyxRQUFRLENBQUM7UUFDdEJDLFNBQVMsR0FBR1IsQ0FBQyxDQUFDUSxTQUFTLENBQUM7UUFFeEJSLENBQUMsQ0FBQyxPQUFPLEVBQUVPLFFBQVEsQ0FBQyxDQUFDSSxPQUFPLENBQUMsVUFBVUMsQ0FBQyxFQUFFO1VBQ3hDLElBQUlBLENBQUMsQ0FBQ0MsS0FBSyxLQUFLLEVBQUUsRUFBRTtZQUNsQixJQUFNQyxLQUFLLEdBQUcsSUFBSSxDQUFDQSxLQUFLO1lBQ3hCUixVQUFVLENBQUNTLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQ0QsS0FBSyxDQUFDLENBQUM7WUFDNUJOLFNBQVMsQ0FBQ1EsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUNDLEtBQUssRUFBRTtVQUM5QztRQUNGLENBQUMsQ0FBQztNQUNKLENBQUM7TUFBQWIsT0FBQSxTQUVZYyxJQUFJO0lBQUE7RUFBQTtBQUFBIn0=