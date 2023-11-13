"use strict";

System.register(["jquery", "riot"], function (_export, _context) {
  "use strict";

  var $, riot, pre, post, html;
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_riot) {
      riot = _riot.default;
    }],
    execute: function () {
      _export("pre", pre = function pre(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        return individual.initBlank();
      });
      _export("post", post = function post(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        var self = individual;
        var objectContainer = $('#object-container', template);
        var object = self.object;
        var _class = object['rdf:type'][0];
        _class.rights.then(function (rights) {
          if (rights.hasValue('v-s:canCreate', true)) {
            var object_template = self.get('v-fc:targetTemplate')[0];
            object.present(objectContainer, object_template, 'edit').then(function (objectTemplate) {
              objectTemplate = $(objectTemplate);
              objectTemplate.one('kancel', cancelHandler);
              object.one('afterSave', saveHandler);
              objectTemplate.one('remove', function () {
                object.off('afterSave', saveHandler);
              });
            });
          } else {
            $('#no-rights', template).removeClass('hidden');
          }
          function cancelHandler() {
            delete self.object;
            window.history.back();
          }
          function saveHandler() {
            delete self.object;
            riot.route('#/' + object.id);
          }
        });
      });
      _export("html", html = "\n  <div>\n    <div id=\"object-container\"></div>\n    <div id=\"no-rights\" class=\"alert alert-warning container hidden\">\n      <strong about=\"v-s:Attention\" property=\"rdfs:label\"></strong> <span about=\"v-s:NoRightsForOperation\" property=\"rdfs:label\"></span>\n      <button class=\"btn btn-default\" about=\"v-fc:Back\" property=\"rdfs:label\" onclick=\"window.history.back();\"></button>\n    </div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfcmlvdCIsInJpb3QiLCJleGVjdXRlIiwiX2V4cG9ydCIsInByZSIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsImluaXRCbGFuayIsInBvc3QiLCJzZWxmIiwib2JqZWN0Q29udGFpbmVyIiwib2JqZWN0IiwiX2NsYXNzIiwicmlnaHRzIiwidGhlbiIsImhhc1ZhbHVlIiwib2JqZWN0X3RlbXBsYXRlIiwiZ2V0IiwicHJlc2VudCIsIm9iamVjdFRlbXBsYXRlIiwib25lIiwiY2FuY2VsSGFuZGxlciIsInNhdmVIYW5kbGVyIiwib2ZmIiwicmVtb3ZlQ2xhc3MiLCJ3aW5kb3ciLCJoaXN0b3J5IiwiYmFjayIsInJvdXRlIiwiaWQiLCJodG1sIl0sInNvdXJjZXMiOlsiLi4vLi4vb250b2xvZ3kvZ2VuZXJpYy1mdW5jdGlvbi90ZW1wbGF0ZXMvdi1mY19CbGFua1RlbXBsYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgcmlvdCBmcm9tICdyaW90JztcblxuZXhwb3J0IGNvbnN0IHByZSA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgcmV0dXJuIGluZGl2aWR1YWwuaW5pdEJsYW5rKCk7XG59O1xuXG5leHBvcnQgY29uc3QgcG9zdCA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgY29uc3Qgc2VsZiA9IGluZGl2aWR1YWw7XG4gIGNvbnN0IG9iamVjdENvbnRhaW5lciA9ICQoJyNvYmplY3QtY29udGFpbmVyJywgdGVtcGxhdGUpO1xuICBjb25zdCBvYmplY3QgPSBzZWxmLm9iamVjdDtcblxuICBjb25zdCBfY2xhc3MgPSBvYmplY3RbJ3JkZjp0eXBlJ11bMF07XG5cbiAgX2NsYXNzLnJpZ2h0cy50aGVuKGZ1bmN0aW9uIChyaWdodHMpIHtcbiAgICBpZiAocmlnaHRzLmhhc1ZhbHVlKCd2LXM6Y2FuQ3JlYXRlJywgdHJ1ZSkpIHtcbiAgICAgIGNvbnN0IG9iamVjdF90ZW1wbGF0ZSA9IHNlbGYuZ2V0KCd2LWZjOnRhcmdldFRlbXBsYXRlJylbMF07XG4gICAgICBvYmplY3QucHJlc2VudChvYmplY3RDb250YWluZXIsIG9iamVjdF90ZW1wbGF0ZSwgJ2VkaXQnKS50aGVuKGZ1bmN0aW9uIChvYmplY3RUZW1wbGF0ZSkge1xuICAgICAgICBvYmplY3RUZW1wbGF0ZSA9ICQob2JqZWN0VGVtcGxhdGUpO1xuICAgICAgICBvYmplY3RUZW1wbGF0ZS5vbmUoJ2thbmNlbCcsIGNhbmNlbEhhbmRsZXIpO1xuICAgICAgICBvYmplY3Qub25lKCdhZnRlclNhdmUnLCBzYXZlSGFuZGxlcik7XG4gICAgICAgIG9iamVjdFRlbXBsYXRlLm9uZSgncmVtb3ZlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIG9iamVjdC5vZmYoJ2FmdGVyU2F2ZScsIHNhdmVIYW5kbGVyKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCgnI25vLXJpZ2h0cycsIHRlbXBsYXRlKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FuY2VsSGFuZGxlciAoKSB7XG4gICAgICBkZWxldGUgc2VsZi5vYmplY3Q7XG4gICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNhdmVIYW5kbGVyICgpIHtcbiAgICAgIGRlbGV0ZSBzZWxmLm9iamVjdDtcbiAgICAgIHJpb3Qucm91dGUoJyMvJyArIG9iamVjdC5pZCk7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBodG1sID0gYFxuICA8ZGl2PlxuICAgIDxkaXYgaWQ9XCJvYmplY3QtY29udGFpbmVyXCI+PC9kaXY+XG4gICAgPGRpdiBpZD1cIm5vLXJpZ2h0c1wiIGNsYXNzPVwiYWxlcnQgYWxlcnQtd2FybmluZyBjb250YWluZXIgaGlkZGVuXCI+XG4gICAgICA8c3Ryb25nIGFib3V0PVwidi1zOkF0dGVudGlvblwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvc3Ryb25nPiA8c3BhbiBhYm91dD1cInYtczpOb1JpZ2h0c0Zvck9wZXJhdGlvblwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvc3Bhbj5cbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBhYm91dD1cInYtZmM6QmFja1wiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiIG9uY2xpY2s9XCJ3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XCI+PC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuYDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7TUFBT0EsQ0FBQyxHQUFBQyxPQUFBLENBQUFDLE9BQUE7SUFBQSxhQUFBQyxLQUFBO01BQ0RDLElBQUksR0FBQUQsS0FBQSxDQUFBRCxPQUFBO0lBQUE7SUFBQUcsT0FBQSxXQUFBQSxDQUFBO01BQUFDLE9BQUEsUUFFRUMsR0FBRyxHQUFHLFNBQU5BLEdBQUdBLENBQWFDLFVBQVUsRUFBRUMsUUFBUSxFQUFFQyxTQUFTLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFO1FBQ3pFSCxRQUFRLEdBQUdULENBQUMsQ0FBQ1MsUUFBUSxDQUFDO1FBQ3RCQyxTQUFTLEdBQUdWLENBQUMsQ0FBQ1UsU0FBUyxDQUFDO1FBRXhCLE9BQU9GLFVBQVUsQ0FBQ0ssU0FBUyxFQUFFO01BQy9CLENBQUM7TUFBQVAsT0FBQSxTQUVZUSxJQUFJLEdBQUcsU0FBUEEsSUFBSUEsQ0FBYU4sVUFBVSxFQUFFQyxRQUFRLEVBQUVDLFNBQVMsRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUU7UUFDMUVILFFBQVEsR0FBR1QsQ0FBQyxDQUFDUyxRQUFRLENBQUM7UUFDdEJDLFNBQVMsR0FBR1YsQ0FBQyxDQUFDVSxTQUFTLENBQUM7UUFFeEIsSUFBTUssSUFBSSxHQUFHUCxVQUFVO1FBQ3ZCLElBQU1RLGVBQWUsR0FBR2hCLENBQUMsQ0FBQyxtQkFBbUIsRUFBRVMsUUFBUSxDQUFDO1FBQ3hELElBQU1RLE1BQU0sR0FBR0YsSUFBSSxDQUFDRSxNQUFNO1FBRTFCLElBQU1DLE1BQU0sR0FBR0QsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVwQ0MsTUFBTSxDQUFDQyxNQUFNLENBQUNDLElBQUksQ0FBQyxVQUFVRCxNQUFNLEVBQUU7VUFDbkMsSUFBSUEsTUFBTSxDQUFDRSxRQUFRLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQzFDLElBQU1DLGVBQWUsR0FBR1AsSUFBSSxDQUFDUSxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUROLE1BQU0sQ0FBQ08sT0FBTyxDQUFDUixlQUFlLEVBQUVNLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQ0YsSUFBSSxDQUFDLFVBQVVLLGNBQWMsRUFBRTtjQUN0RkEsY0FBYyxHQUFHekIsQ0FBQyxDQUFDeUIsY0FBYyxDQUFDO2NBQ2xDQSxjQUFjLENBQUNDLEdBQUcsQ0FBQyxRQUFRLEVBQUVDLGFBQWEsQ0FBQztjQUMzQ1YsTUFBTSxDQUFDUyxHQUFHLENBQUMsV0FBVyxFQUFFRSxXQUFXLENBQUM7Y0FDcENILGNBQWMsQ0FBQ0MsR0FBRyxDQUFDLFFBQVEsRUFBRSxZQUFZO2dCQUN2Q1QsTUFBTSxDQUFDWSxHQUFHLENBQUMsV0FBVyxFQUFFRCxXQUFXLENBQUM7Y0FDdEMsQ0FBQyxDQUFDO1lBQ0osQ0FBQyxDQUFDO1VBQ0osQ0FBQyxNQUFNO1lBQ0w1QixDQUFDLENBQUMsWUFBWSxFQUFFUyxRQUFRLENBQUMsQ0FBQ3FCLFdBQVcsQ0FBQyxRQUFRLENBQUM7VUFDakQ7VUFFQSxTQUFTSCxhQUFhQSxDQUFBLEVBQUk7WUFDeEIsT0FBT1osSUFBSSxDQUFDRSxNQUFNO1lBQ2xCYyxNQUFNLENBQUNDLE9BQU8sQ0FBQ0MsSUFBSSxFQUFFO1VBQ3ZCO1VBQ0EsU0FBU0wsV0FBV0EsQ0FBQSxFQUFJO1lBQ3RCLE9BQU9iLElBQUksQ0FBQ0UsTUFBTTtZQUNsQmIsSUFBSSxDQUFDOEIsS0FBSyxDQUFDLElBQUksR0FBR2pCLE1BQU0sQ0FBQ2tCLEVBQUUsQ0FBQztVQUM5QjtRQUNGLENBQUMsQ0FBQztNQUNKLENBQUM7TUFBQTdCLE9BQUEsU0FFWThCLElBQUk7SUFBQTtFQUFBO0FBQUEifQ==