"use strict";

System.register(["jquery"], function (_export, _context) {
  "use strict";

  var $, pre, html;
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }],
    execute: function () {
      _export("pre", pre = function pre(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        if (individual.image) {
          template.attr('src', individual.image.src);
        } else {
          template.attr('src', '/files/' + individual.id);
        }
      });
      _export("html", html = "\n<img width=\"100%\" draggable=\"false\" />\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInByZSIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsImltYWdlIiwiYXR0ciIsInNyYyIsImlkIiwiaHRtbCJdLCJzb3VyY2VzIjpbIi4uLy4uL29udG9sb2d5L3N5c3RlbS1jb3JlL3RlbXBsYXRlcy92LXVpX0ltYWdlVGVtcGxhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuZXhwb3J0IGNvbnN0IHByZSA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgaWYgKGluZGl2aWR1YWwuaW1hZ2UpIHtcbiAgICB0ZW1wbGF0ZS5hdHRyKCdzcmMnLCBpbmRpdmlkdWFsLmltYWdlLnNyYyk7XG4gIH0gZWxzZSB7XG4gICAgdGVtcGxhdGUuYXR0cignc3JjJywgJy9maWxlcy8nICsgaW5kaXZpZHVhbC5pZCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBodG1sID0gYFxuPGltZyB3aWR0aD1cIjEwMCVcIiBkcmFnZ2FibGU9XCJmYWxzZVwiIC8+XG5gO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztNQUFPQSxDQUFDLEdBQUFDLE9BQUEsQ0FBQUMsT0FBQTtJQUFBO0lBQUFDLE9BQUEsV0FBQUEsQ0FBQTtNQUFBQyxPQUFBLFFBRUtDLEdBQUcsR0FBRyxTQUFOQSxHQUFHQSxDQUFhQyxVQUFVLEVBQUVDLFFBQVEsRUFBRUMsU0FBUyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRTtRQUN6RUgsUUFBUSxHQUFHUCxDQUFDLENBQUNPLFFBQVEsQ0FBQztRQUN0QkMsU0FBUyxHQUFHUixDQUFDLENBQUNRLFNBQVMsQ0FBQztRQUV4QixJQUFJRixVQUFVLENBQUNLLEtBQUssRUFBRTtVQUNwQkosUUFBUSxDQUFDSyxJQUFJLENBQUMsS0FBSyxFQUFFTixVQUFVLENBQUNLLEtBQUssQ0FBQ0UsR0FBRyxDQUFDO1FBQzVDLENBQUMsTUFBTTtVQUNMTixRQUFRLENBQUNLLElBQUksQ0FBQyxLQUFLLEVBQUUsU0FBUyxHQUFHTixVQUFVLENBQUNRLEVBQUUsQ0FBQztRQUNqRDtNQUNGLENBQUM7TUFBQVYsT0FBQSxTQUVZVyxJQUFJO0lBQUE7RUFBQTtBQUFBIn0=