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
        if (!individual.hasValue('v-s:thumbnail')) {
          template.removeAttr('rel');
        }
        template.click(function (e) {
          e.preventDefault();
          var modal = $($('#minimal-modal-template').html()).modal({
            keyboard: true,
            show: false
          }).appendTo('body');
          var modalBody = modal.find('.modal-body');
          individual.present(modalBody, 'v-ui:ImageTemplate');
          modal.modal('show');
          template.one('remove', function () {
            modal.modal('hide').remove();
          });
        });
      });
      _export("html", html = "\n  <a class=\"show-modal\" href=\"#\" about=\"@\" rel=\"v-s:thumbnail\" data-template=\"v-ui:ImageTemplate\"></a>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInByZSIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsImhhc1ZhbHVlIiwicmVtb3ZlQXR0ciIsImNsaWNrIiwiZSIsInByZXZlbnREZWZhdWx0IiwibW9kYWwiLCJodG1sIiwia2V5Ym9hcmQiLCJzaG93IiwiYXBwZW5kVG8iLCJtb2RhbEJvZHkiLCJmaW5kIiwicHJlc2VudCIsIm9uZSIsInJlbW92ZSJdLCJzb3VyY2VzIjpbIi4uLy4uL29udG9sb2d5L3N5c3RlbS1jb3JlL3RlbXBsYXRlcy92LXVpX01vZGFsSW1hZ2VUZW1wbGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG5leHBvcnQgY29uc3QgcHJlID0gZnVuY3Rpb24gKGluZGl2aWR1YWwsIHRlbXBsYXRlLCBjb250YWluZXIsIG1vZGUsIGV4dHJhKSB7XG4gIHRlbXBsYXRlID0gJCh0ZW1wbGF0ZSk7XG4gIGNvbnRhaW5lciA9ICQoY29udGFpbmVyKTtcblxuICBpZiAoIWluZGl2aWR1YWwuaGFzVmFsdWUoJ3Ytczp0aHVtYm5haWwnKSkge1xuICAgIHRlbXBsYXRlLnJlbW92ZUF0dHIoJ3JlbCcpO1xuICB9XG4gIHRlbXBsYXRlLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IG1vZGFsID0gJCgkKCcjbWluaW1hbC1tb2RhbC10ZW1wbGF0ZScpLmh0bWwoKSkubW9kYWwoe2tleWJvYXJkOiB0cnVlLCBzaG93OiBmYWxzZX0pLmFwcGVuZFRvKCdib2R5Jyk7XG4gICAgY29uc3QgbW9kYWxCb2R5ID0gbW9kYWwuZmluZCgnLm1vZGFsLWJvZHknKTtcbiAgICBpbmRpdmlkdWFsLnByZXNlbnQobW9kYWxCb2R5LCAndi11aTpJbWFnZVRlbXBsYXRlJyk7XG4gICAgbW9kYWwubW9kYWwoJ3Nob3cnKTtcbiAgICB0ZW1wbGF0ZS5vbmUoJ3JlbW92ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIG1vZGFsLm1vZGFsKCdoaWRlJykucmVtb3ZlKCk7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGh0bWwgPSBgXG4gIDxhIGNsYXNzPVwic2hvdy1tb2RhbFwiIGhyZWY9XCIjXCIgYWJvdXQ9XCJAXCIgcmVsPVwidi1zOnRodW1ibmFpbFwiIGRhdGEtdGVtcGxhdGU9XCJ2LXVpOkltYWdlVGVtcGxhdGVcIj48L2E+XG5gO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztNQUFPQSxDQUFDLEdBQUFDLE9BQUEsQ0FBQUMsT0FBQTtJQUFBO0lBQUFDLE9BQUEsV0FBQUEsQ0FBQTtNQUFBQyxPQUFBLFFBRUtDLEdBQUcsR0FBRyxTQUFOQSxHQUFHQSxDQUFhQyxVQUFVLEVBQUVDLFFBQVEsRUFBRUMsU0FBUyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRTtRQUN6RUgsUUFBUSxHQUFHUCxDQUFDLENBQUNPLFFBQVEsQ0FBQztRQUN0QkMsU0FBUyxHQUFHUixDQUFDLENBQUNRLFNBQVMsQ0FBQztRQUV4QixJQUFJLENBQUNGLFVBQVUsQ0FBQ0ssUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1VBQ3pDSixRQUFRLENBQUNLLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDNUI7UUFDQUwsUUFBUSxDQUFDTSxLQUFLLENBQUMsVUFBVUMsQ0FBQyxFQUFFO1VBQzFCQSxDQUFDLENBQUNDLGNBQWMsRUFBRTtVQUNsQixJQUFNQyxLQUFLLEdBQUdoQixDQUFDLENBQUNBLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDaUIsSUFBSSxFQUFFLENBQUMsQ0FBQ0QsS0FBSyxDQUFDO1lBQUNFLFFBQVEsRUFBRSxJQUFJO1lBQUVDLElBQUksRUFBRTtVQUFLLENBQUMsQ0FBQyxDQUFDQyxRQUFRLENBQUMsTUFBTSxDQUFDO1VBQzFHLElBQU1DLFNBQVMsR0FBR0wsS0FBSyxDQUFDTSxJQUFJLENBQUMsYUFBYSxDQUFDO1VBQzNDaEIsVUFBVSxDQUFDaUIsT0FBTyxDQUFDRixTQUFTLEVBQUUsb0JBQW9CLENBQUM7VUFDbkRMLEtBQUssQ0FBQ0EsS0FBSyxDQUFDLE1BQU0sQ0FBQztVQUNuQlQsUUFBUSxDQUFDaUIsR0FBRyxDQUFDLFFBQVEsRUFBRSxZQUFZO1lBQ2pDUixLQUFLLENBQUNBLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQ1MsTUFBTSxFQUFFO1VBQzlCLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQztNQUNKLENBQUM7TUFBQXJCLE9BQUEsU0FFWWEsSUFBSTtJQUFBO0VBQUE7QUFBQSJ9