"use strict";

System.register(["../common/lib/riot.js", "../browser/dom_helpers.js"], function (_export, _context) {
  "use strict";

  var riot, delegateHandler, outlined;
  /**
   * Render individual under mouse pointer with special system template v-ui:ttl
   * when Left mouse button with Ctrl + Alt keys are pressed
   * @param {Event} event
   * @this Element
   */
  function specialTemplateHandler(event) {
    var uri = this.getAttribute('resource') || this.getAttribute('about');
    var hash = "#/".concat(uri);
    if (event.altKey && event.ctrlKey) {
      event.preventDefault();
      event.stopPropagation();
      riot.route("".concat(hash, "//v-ui:ttl"));
    }
  }
  /**
   * Unset title and remove outline from individual under mouse pointer
   * @param {Event} event
   */
  function removeOutline(event) {
    document.body.removeEventListener('mouseover', outline);
    if (outlined) {
      outlined.removeAttribute('title');
      outlined.classList.remove('gray-outline');
    }
    outlined = null;
  }

  /**
   * Set title = individual id and add outline for individual under mouse pointer
   * when Left mouse button with Ctrl + Alt keys are pressed
   * @param {Event} event
   * @this Element
   */
  function outline(event) {
    if (event.altKey && event.ctrlKey) {
      event.stopPropagation();
      if (outlined) {
        outlined.classList.remove('gray-outline');
        outlined.removeAttribute('title');
      }
      this.classList.add('gray-outline');
      this.setAttribute('title', this.getAttribute('resource') || this.getAttribute('about'));
      outlined = this;
    } else {
      removeOutline(event);
    }
  }
  return {
    setters: [function (_commonLibRiotJs) {
      riot = _commonLibRiotJs.default;
    }, function (_browserDom_helpersJs) {
      delegateHandler = _browserDom_helpersJs.delegateHandler;
    }],
    execute: function () {
      delegateHandler(document.body, 'click', '[resource], [about]', specialTemplateHandler, true);

      // Outline resource containers to switch view to special templates

      document.body.addEventListener('keydown', function (event) {
        if (event.altKey && event.ctrlKey) {
          delegateHandler(document.body, 'mouseover', '[resource], [about]', outline);
        }
      });
      document.body.addEventListener('keyup', removeOutline);
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJzcGVjaWFsVGVtcGxhdGVIYW5kbGVyIiwiZXZlbnQiLCJ1cmkiLCJnZXRBdHRyaWJ1dGUiLCJoYXNoIiwiY29uY2F0IiwiYWx0S2V5IiwiY3RybEtleSIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwicmlvdCIsInJvdXRlIiwicmVtb3ZlT3V0bGluZSIsImRvY3VtZW50IiwiYm9keSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJvdXRsaW5lIiwib3V0bGluZWQiLCJyZW1vdmVBdHRyaWJ1dGUiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJzZXRBdHRyaWJ1dGUiLCJzZXR0ZXJzIiwiX2NvbW1vbkxpYlJpb3RKcyIsImRlZmF1bHQiLCJfYnJvd3NlckRvbV9oZWxwZXJzSnMiLCJkZWxlZ2F0ZUhhbmRsZXIiLCJleGVjdXRlIiwiYWRkRXZlbnRMaXN0ZW5lciJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS13ZWIvanMvYnJvd3Nlci9zaG93X3R0bC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmlvdCBmcm9tICcuLi9jb21tb24vbGliL3Jpb3QuanMnO1xuXG5pbXBvcnQge2RlbGVnYXRlSGFuZGxlcn0gZnJvbSAnLi4vYnJvd3Nlci9kb21faGVscGVycy5qcyc7XG5cbi8qKlxuICogUmVuZGVyIGluZGl2aWR1YWwgdW5kZXIgbW91c2UgcG9pbnRlciB3aXRoIHNwZWNpYWwgc3lzdGVtIHRlbXBsYXRlIHYtdWk6dHRsXG4gKiB3aGVuIExlZnQgbW91c2UgYnV0dG9uIHdpdGggQ3RybCArIEFsdCBrZXlzIGFyZSBwcmVzc2VkXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICogQHRoaXMgRWxlbWVudFxuICovXG5mdW5jdGlvbiBzcGVjaWFsVGVtcGxhdGVIYW5kbGVyIChldmVudCkge1xuICBjb25zdCB1cmkgPSB0aGlzLmdldEF0dHJpYnV0ZSgncmVzb3VyY2UnKSB8fCB0aGlzLmdldEF0dHJpYnV0ZSgnYWJvdXQnKTtcbiAgY29uc3QgaGFzaCA9IGAjLyR7dXJpfWA7XG4gIGlmIChldmVudC5hbHRLZXkgJiYgZXZlbnQuY3RybEtleSkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgcmlvdC5yb3V0ZShgJHtoYXNofS8vdi11aTp0dGxgKTtcbiAgfVxufVxuZGVsZWdhdGVIYW5kbGVyKGRvY3VtZW50LmJvZHksICdjbGljaycsICdbcmVzb3VyY2VdLCBbYWJvdXRdJywgc3BlY2lhbFRlbXBsYXRlSGFuZGxlciwgdHJ1ZSk7XG5cbi8vIE91dGxpbmUgcmVzb3VyY2UgY29udGFpbmVycyB0byBzd2l0Y2ggdmlldyB0byBzcGVjaWFsIHRlbXBsYXRlc1xubGV0IG91dGxpbmVkO1xuXG4vKipcbiAqIFVuc2V0IHRpdGxlIGFuZCByZW1vdmUgb3V0bGluZSBmcm9tIGluZGl2aWR1YWwgdW5kZXIgbW91c2UgcG9pbnRlclxuICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAqL1xuZnVuY3Rpb24gcmVtb3ZlT3V0bGluZSAoZXZlbnQpIHtcbiAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBvdXRsaW5lKTtcbiAgaWYgKG91dGxpbmVkKSB7XG4gICAgb3V0bGluZWQucmVtb3ZlQXR0cmlidXRlKCd0aXRsZScpO1xuICAgIG91dGxpbmVkLmNsYXNzTGlzdC5yZW1vdmUoJ2dyYXktb3V0bGluZScpO1xuICB9XG4gIG91dGxpbmVkID0gbnVsbDtcbn1cblxuLyoqXG4gKiBTZXQgdGl0bGUgPSBpbmRpdmlkdWFsIGlkIGFuZCBhZGQgb3V0bGluZSBmb3IgaW5kaXZpZHVhbCB1bmRlciBtb3VzZSBwb2ludGVyXG4gKiB3aGVuIExlZnQgbW91c2UgYnV0dG9uIHdpdGggQ3RybCArIEFsdCBrZXlzIGFyZSBwcmVzc2VkXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICogQHRoaXMgRWxlbWVudFxuICovXG5mdW5jdGlvbiBvdXRsaW5lIChldmVudCkge1xuICBpZiAoZXZlbnQuYWx0S2V5ICYmIGV2ZW50LmN0cmxLZXkpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAob3V0bGluZWQpIHtcbiAgICAgIG91dGxpbmVkLmNsYXNzTGlzdC5yZW1vdmUoJ2dyYXktb3V0bGluZScpO1xuICAgICAgb3V0bGluZWQucmVtb3ZlQXR0cmlidXRlKCd0aXRsZScpO1xuICAgIH1cbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2dyYXktb3V0bGluZScpO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMuZ2V0QXR0cmlidXRlKCdyZXNvdXJjZScpIHx8IHRoaXMuZ2V0QXR0cmlidXRlKCdhYm91dCcpKTtcbiAgICBvdXRsaW5lZCA9IHRoaXM7XG4gIH0gZWxzZSB7XG4gICAgcmVtb3ZlT3V0bGluZShldmVudCk7XG4gIH1cbn1cblxuZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB7XG4gIGlmIChldmVudC5hbHRLZXkgJiYgZXZlbnQuY3RybEtleSkge1xuICAgIGRlbGVnYXRlSGFuZGxlcihkb2N1bWVudC5ib2R5LCAnbW91c2VvdmVyJywgJ1tyZXNvdXJjZV0sIFthYm91dF0nLCBvdXRsaW5lKTtcbiAgfVxufSk7XG5kb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgcmVtb3ZlT3V0bGluZSk7XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztFQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNBLFNBQVNBLHNCQUFzQkEsQ0FBRUMsS0FBSyxFQUFFO0lBQ3RDLElBQU1DLEdBQUcsR0FBRyxJQUFJLENBQUNDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJLENBQUNBLFlBQVksQ0FBQyxPQUFPLENBQUM7SUFDdkUsSUFBTUMsSUFBSSxRQUFBQyxNQUFBLENBQVFILEdBQUcsQ0FBRTtJQUN2QixJQUFJRCxLQUFLLENBQUNLLE1BQU0sSUFBSUwsS0FBSyxDQUFDTSxPQUFPLEVBQUU7TUFDakNOLEtBQUssQ0FBQ08sY0FBYyxFQUFFO01BQ3RCUCxLQUFLLENBQUNRLGVBQWUsRUFBRTtNQUN2QkMsSUFBSSxDQUFDQyxLQUFLLElBQUFOLE1BQUEsQ0FBSUQsSUFBSSxnQkFBYTtJQUNqQztFQUNGO0VBTUE7QUFDQTtBQUNBO0FBQ0E7RUFDQSxTQUFTUSxhQUFhQSxDQUFFWCxLQUFLLEVBQUU7SUFDN0JZLFFBQVEsQ0FBQ0MsSUFBSSxDQUFDQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUVDLE9BQU8sQ0FBQztJQUN2RCxJQUFJQyxRQUFRLEVBQUU7TUFDWkEsUUFBUSxDQUFDQyxlQUFlLENBQUMsT0FBTyxDQUFDO01BQ2pDRCxRQUFRLENBQUNFLFNBQVMsQ0FBQ0MsTUFBTSxDQUFDLGNBQWMsQ0FBQztJQUMzQztJQUNBSCxRQUFRLEdBQUcsSUFBSTtFQUNqQjs7RUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFDQSxTQUFTRCxPQUFPQSxDQUFFZixLQUFLLEVBQUU7SUFDdkIsSUFBSUEsS0FBSyxDQUFDSyxNQUFNLElBQUlMLEtBQUssQ0FBQ00sT0FBTyxFQUFFO01BQ2pDTixLQUFLLENBQUNRLGVBQWUsRUFBRTtNQUN2QixJQUFJUSxRQUFRLEVBQUU7UUFDWkEsUUFBUSxDQUFDRSxTQUFTLENBQUNDLE1BQU0sQ0FBQyxjQUFjLENBQUM7UUFDekNILFFBQVEsQ0FBQ0MsZUFBZSxDQUFDLE9BQU8sQ0FBQztNQUNuQztNQUNBLElBQUksQ0FBQ0MsU0FBUyxDQUFDRSxHQUFHLENBQUMsY0FBYyxDQUFDO01BQ2xDLElBQUksQ0FBQ0MsWUFBWSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUNuQixZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDQSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7TUFDdkZjLFFBQVEsR0FBRyxJQUFJO0lBQ2pCLENBQUMsTUFBTTtNQUNMTCxhQUFhLENBQUNYLEtBQUssQ0FBQztJQUN0QjtFQUNGO0VBQUM7SUFBQXNCLE9BQUEsYUFBQUMsZ0JBQUE7TUF4RE1kLElBQUksR0FBQWMsZ0JBQUEsQ0FBQUMsT0FBQTtJQUFBLGFBQUFDLHFCQUFBO01BRUhDLGVBQWUsR0FBQUQscUJBQUEsQ0FBZkMsZUFBZTtJQUFBO0lBQUFDLE9BQUEsV0FBQUEsQ0FBQTtNQWlCdkJELGVBQWUsQ0FBQ2QsUUFBUSxDQUFDQyxJQUFJLEVBQUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFZCxzQkFBc0IsRUFBRSxJQUFJLENBQUM7O01BRTVGOztNQXFDQWEsUUFBUSxDQUFDQyxJQUFJLENBQUNlLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxVQUFDNUIsS0FBSyxFQUFLO1FBQ25ELElBQUlBLEtBQUssQ0FBQ0ssTUFBTSxJQUFJTCxLQUFLLENBQUNNLE9BQU8sRUFBRTtVQUNqQ29CLGVBQWUsQ0FBQ2QsUUFBUSxDQUFDQyxJQUFJLEVBQUUsV0FBVyxFQUFFLHFCQUFxQixFQUFFRSxPQUFPLENBQUM7UUFDN0U7TUFDRixDQUFDLENBQUM7TUFDRkgsUUFBUSxDQUFDQyxJQUFJLENBQUNlLGdCQUFnQixDQUFDLE9BQU8sRUFBRWpCLGFBQWEsQ0FBQztJQUFDO0VBQUE7QUFBQSJ9