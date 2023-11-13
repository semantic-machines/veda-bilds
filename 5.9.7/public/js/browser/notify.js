"use strict";

System.register(["../browser/dom_helpers.js"], function (_export, _context) {
  "use strict";

  var sanitize, styles, wrapper, container, scopedStyle;
  /**
   * Notify function
   * @param {string} type - notification type following bootstrap contextual classes ( info | success | warning | danger )
   * @param {Object} note - note object with properties 'code', 'name', 'message'
   * @return {void}
   */
  function notify(type, _ref) {
    var _ref$code = _ref.code,
      code = _ref$code === void 0 ? '' : _ref$code,
      _ref$name = _ref.name,
      name = _ref$name === void 0 ? '' : _ref$name,
      _ref$message = _ref.message,
      message = _ref$message === void 0 ? '' : _ref$message;
    console.log("".concat(new Date().toLocaleString(), " [").concat(type.toUpperCase(), "] - ").concat(code, " - ").concat(name, " - ").concat(message));
    var iconClass;
    switch (type) {
      case 'danger':
        iconClass = 'fa-times-circle';
        break;
      case 'info':
        iconClass = 'fa-info-circle';
        break;
      case 'success':
        iconClass = 'fa-check-circle';
        break;
      case 'warning':
        iconClass = 'fa-exclamation-circle';
        break;
    }
    iconClass = 'fa fa-lg ' + iconClass;
    message = message && message.length > 70 ? message.substring(0, 70) + '...' : message;
    var HTML = "\n    <div class=\"alert alert-".concat(sanitize(type), "\">\n      <span class=\"").concat(sanitize(iconClass), "\"></span>\n      <strong>").concat(sanitize(name), "</strong>\n      <strong>").concat(sanitize(code), "</strong>\n      <span>").concat(sanitize(message), "</span>\n    </div>\n  ");
    var fragment = document.createDocumentFragment();
    var note = document.createElement('div');
    fragment.appendChild(note);
    note.innerHTML = HTML.trim();
    container.insertBefore(fragment, container.firstChild);
    setTimeout(function () {
      container.removeChild(note);
    }, 5000);
  }
  return {
    setters: [function (_browserDom_helpersJs) {
      sanitize = _browserDom_helpersJs.sanitize;
    }],
    execute: function () {
      // User notifications
      _export("default", notify);
      styles = "\n  #notifications {\n    max-width: 50%;\n    max-height: 50%;\n    position: fixed;\n    bottom: 10px;\n    right: 10px;\n    z-index: 99999;\n    overflow: hidden;\n  }\n  #notifications > * {\n    display: block;\n    white-space: nowrap;\n  }\n";
      wrapper = document.createElement('div');
      wrapper.id = 'notification-wrapper';
      document.body.appendChild(wrapper);
      container = document.createElement('div');
      container.id = 'notifications';
      scopedStyle = document.createElement('style');
      scopedStyle.setAttribute('scoped', '');
      scopedStyle.textContent = styles.trim();
      wrapper.appendChild(scopedStyle);
      wrapper.appendChild(container);
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJub3RpZnkiLCJ0eXBlIiwiX3JlZiIsIl9yZWYkY29kZSIsImNvZGUiLCJfcmVmJG5hbWUiLCJuYW1lIiwiX3JlZiRtZXNzYWdlIiwibWVzc2FnZSIsImNvbnNvbGUiLCJsb2ciLCJjb25jYXQiLCJEYXRlIiwidG9Mb2NhbGVTdHJpbmciLCJ0b1VwcGVyQ2FzZSIsImljb25DbGFzcyIsImxlbmd0aCIsInN1YnN0cmluZyIsIkhUTUwiLCJzYW5pdGl6ZSIsImZyYWdtZW50IiwiZG9jdW1lbnQiLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50Iiwibm90ZSIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImlubmVySFRNTCIsInRyaW0iLCJjb250YWluZXIiLCJpbnNlcnRCZWZvcmUiLCJmaXJzdENoaWxkIiwic2V0VGltZW91dCIsInJlbW92ZUNoaWxkIiwic2V0dGVycyIsIl9icm93c2VyRG9tX2hlbHBlcnNKcyIsImV4ZWN1dGUiLCJfZXhwb3J0Iiwic3R5bGVzIiwid3JhcHBlciIsImlkIiwiYm9keSIsInNjb3BlZFN0eWxlIiwic2V0QXR0cmlidXRlIiwidGV4dENvbnRlbnQiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zb3VyY2Utd2ViL2pzL2Jyb3dzZXIvbm90aWZ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFVzZXIgbm90aWZpY2F0aW9uc1xuaW1wb3J0IHtzYW5pdGl6ZX0gZnJvbSAnLi4vYnJvd3Nlci9kb21faGVscGVycy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IG5vdGlmeTtcblxuY29uc3Qgc3R5bGVzID0gYFxuICAjbm90aWZpY2F0aW9ucyB7XG4gICAgbWF4LXdpZHRoOiA1MCU7XG4gICAgbWF4LWhlaWdodDogNTAlO1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICBib3R0b206IDEwcHg7XG4gICAgcmlnaHQ6IDEwcHg7XG4gICAgei1pbmRleDogOTk5OTk7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgfVxuICAjbm90aWZpY2F0aW9ucyA+ICoge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIH1cbmA7XG5cbmNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbndyYXBwZXIuaWQgPSAnbm90aWZpY2F0aW9uLXdyYXBwZXInO1xuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh3cmFwcGVyKTtcblxuY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5jb250YWluZXIuaWQgPSAnbm90aWZpY2F0aW9ucyc7XG5cbmNvbnN0IHNjb3BlZFN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbnNjb3BlZFN0eWxlLnNldEF0dHJpYnV0ZSgnc2NvcGVkJywgJycpO1xuc2NvcGVkU3R5bGUudGV4dENvbnRlbnQgPSBzdHlsZXMudHJpbSgpO1xuXG53cmFwcGVyLmFwcGVuZENoaWxkKHNjb3BlZFN0eWxlKTtcbndyYXBwZXIuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcblxuLyoqXG4gKiBOb3RpZnkgZnVuY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gbm90aWZpY2F0aW9uIHR5cGUgZm9sbG93aW5nIGJvb3RzdHJhcCBjb250ZXh0dWFsIGNsYXNzZXMgKCBpbmZvIHwgc3VjY2VzcyB8IHdhcm5pbmcgfCBkYW5nZXIgKVxuICogQHBhcmFtIHtPYmplY3R9IG5vdGUgLSBub3RlIG9iamVjdCB3aXRoIHByb3BlcnRpZXMgJ2NvZGUnLCAnbmFtZScsICdtZXNzYWdlJ1xuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gbm90aWZ5ICh0eXBlLCB7Y29kZSA9ICcnLCBuYW1lID0gJycsIG1lc3NhZ2UgPSAnJ30pIHtcbiAgY29uc29sZS5sb2coYCR7bmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpfSBbJHt0eXBlLnRvVXBwZXJDYXNlKCl9XSAtICR7Y29kZX0gLSAke25hbWV9IC0gJHttZXNzYWdlfWApO1xuXG4gIGxldCBpY29uQ2xhc3M7XG4gIHN3aXRjaCAodHlwZSkge1xuICBjYXNlICdkYW5nZXInOiBpY29uQ2xhc3MgPSAnZmEtdGltZXMtY2lyY2xlJzsgYnJlYWs7XG4gIGNhc2UgJ2luZm8nOiBpY29uQ2xhc3MgPSAnZmEtaW5mby1jaXJjbGUnOyBicmVhaztcbiAgY2FzZSAnc3VjY2Vzcyc6IGljb25DbGFzcyA9ICdmYS1jaGVjay1jaXJjbGUnOyBicmVhaztcbiAgY2FzZSAnd2FybmluZyc6IGljb25DbGFzcyA9ICdmYS1leGNsYW1hdGlvbi1jaXJjbGUnOyBicmVhaztcbiAgfVxuICBpY29uQ2xhc3MgPSAnZmEgZmEtbGcgJyArIGljb25DbGFzcztcbiAgbWVzc2FnZSA9IG1lc3NhZ2UgJiYgbWVzc2FnZS5sZW5ndGggPiA3MCA/IG1lc3NhZ2Uuc3Vic3RyaW5nKDAsIDcwKSArICcuLi4nIDogbWVzc2FnZTtcblxuICBjb25zdCBIVE1MID0gYFxuICAgIDxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC0ke3Nhbml0aXplKHR5cGUpfVwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCIke3Nhbml0aXplKGljb25DbGFzcyl9XCI+PC9zcGFuPlxuICAgICAgPHN0cm9uZz4ke3Nhbml0aXplKG5hbWUpfTwvc3Ryb25nPlxuICAgICAgPHN0cm9uZz4ke3Nhbml0aXplKGNvZGUpfTwvc3Ryb25nPlxuICAgICAgPHNwYW4+JHtzYW5pdGl6ZShtZXNzYWdlKX08L3NwYW4+XG4gICAgPC9kaXY+XG4gIGA7XG5cbiAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gIGNvbnN0IG5vdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQobm90ZSk7XG4gIG5vdGUuaW5uZXJIVE1MID0gSFRNTC50cmltKCk7XG4gIGNvbnRhaW5lci5pbnNlcnRCZWZvcmUoZnJhZ21lbnQsIGNvbnRhaW5lci5maXJzdENoaWxkKTtcblxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBjb250YWluZXIucmVtb3ZlQ2hpbGQobm90ZSk7XG4gIH0sIDUwMDApO1xufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7RUFtQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0EsU0FBU0EsTUFBTUEsQ0FBRUMsSUFBSSxFQUFBQyxJQUFBLEVBQXdDO0lBQUEsSUFBQUMsU0FBQSxHQUFBRCxJQUFBLENBQXJDRSxJQUFJO01BQUpBLElBQUksR0FBQUQsU0FBQSxjQUFHLEVBQUUsR0FBQUEsU0FBQTtNQUFBRSxTQUFBLEdBQUFILElBQUEsQ0FBRUksSUFBSTtNQUFKQSxJQUFJLEdBQUFELFNBQUEsY0FBRyxFQUFFLEdBQUFBLFNBQUE7TUFBQUUsWUFBQSxHQUFBTCxJQUFBLENBQUVNLE9BQU87TUFBUEEsT0FBTyxHQUFBRCxZQUFBLGNBQUcsRUFBRSxHQUFBQSxZQUFBO0lBQ3hERSxPQUFPLENBQUNDLEdBQUcsSUFBQUMsTUFBQSxDQUFJLElBQUlDLElBQUksRUFBRSxDQUFDQyxjQUFjLEVBQUUsUUFBQUYsTUFBQSxDQUFLVixJQUFJLENBQUNhLFdBQVcsRUFBRSxVQUFBSCxNQUFBLENBQU9QLElBQUksU0FBQU8sTUFBQSxDQUFNTCxJQUFJLFNBQUFLLE1BQUEsQ0FBTUgsT0FBTyxFQUFHO0lBRXRHLElBQUlPLFNBQVM7SUFDYixRQUFRZCxJQUFJO01BQ1osS0FBSyxRQUFRO1FBQUVjLFNBQVMsR0FBRyxpQkFBaUI7UUFBRTtNQUM5QyxLQUFLLE1BQU07UUFBRUEsU0FBUyxHQUFHLGdCQUFnQjtRQUFFO01BQzNDLEtBQUssU0FBUztRQUFFQSxTQUFTLEdBQUcsaUJBQWlCO1FBQUU7TUFDL0MsS0FBSyxTQUFTO1FBQUVBLFNBQVMsR0FBRyx1QkFBdUI7UUFBRTtJQUFNO0lBRTNEQSxTQUFTLEdBQUcsV0FBVyxHQUFHQSxTQUFTO0lBQ25DUCxPQUFPLEdBQUdBLE9BQU8sSUFBSUEsT0FBTyxDQUFDUSxNQUFNLEdBQUcsRUFBRSxHQUFHUixPQUFPLENBQUNTLFNBQVMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsS0FBSyxHQUFHVCxPQUFPO0lBRXJGLElBQU1VLElBQUkscUNBQUFQLE1BQUEsQ0FDa0JRLFFBQVEsQ0FBQ2xCLElBQUksQ0FBQywrQkFBQVUsTUFBQSxDQUN2QlEsUUFBUSxDQUFDSixTQUFTLENBQUMsZ0NBQUFKLE1BQUEsQ0FDeEJRLFFBQVEsQ0FBQ2IsSUFBSSxDQUFDLCtCQUFBSyxNQUFBLENBQ2RRLFFBQVEsQ0FBQ2YsSUFBSSxDQUFDLDZCQUFBTyxNQUFBLENBQ2hCUSxRQUFRLENBQUNYLE9BQU8sQ0FBQyw0QkFFNUI7SUFFRCxJQUFNWSxRQUFRLEdBQUdDLFFBQVEsQ0FBQ0Msc0JBQXNCLEVBQUU7SUFDbEQsSUFBTUMsSUFBSSxHQUFHRixRQUFRLENBQUNHLGFBQWEsQ0FBQyxLQUFLLENBQUM7SUFDMUNKLFFBQVEsQ0FBQ0ssV0FBVyxDQUFDRixJQUFJLENBQUM7SUFDMUJBLElBQUksQ0FBQ0csU0FBUyxHQUFHUixJQUFJLENBQUNTLElBQUksRUFBRTtJQUM1QkMsU0FBUyxDQUFDQyxZQUFZLENBQUNULFFBQVEsRUFBRVEsU0FBUyxDQUFDRSxVQUFVLENBQUM7SUFFdERDLFVBQVUsQ0FBQyxZQUFNO01BQ2ZILFNBQVMsQ0FBQ0ksV0FBVyxDQUFDVCxJQUFJLENBQUM7SUFDN0IsQ0FBQyxFQUFFLElBQUksQ0FBQztFQUNWO0VBQUM7SUFBQVUsT0FBQSxhQUFBQyxxQkFBQTtNQXZFT2YsUUFBUSxHQUFBZSxxQkFBQSxDQUFSZixRQUFRO0lBQUE7SUFBQWdCLE9BQUEsV0FBQUEsQ0FBQTtNQURoQjtNQUFBQyxPQUFBLFlBR2VwQyxNQUFNO01BRWZxQyxNQUFNO01BZ0JOQyxPQUFPLEdBQUdqQixRQUFRLENBQUNHLGFBQWEsQ0FBQyxLQUFLLENBQUM7TUFDN0NjLE9BQU8sQ0FBQ0MsRUFBRSxHQUFHLHNCQUFzQjtNQUNuQ2xCLFFBQVEsQ0FBQ21CLElBQUksQ0FBQ2YsV0FBVyxDQUFDYSxPQUFPLENBQUM7TUFFNUJWLFNBQVMsR0FBR1AsUUFBUSxDQUFDRyxhQUFhLENBQUMsS0FBSyxDQUFDO01BQy9DSSxTQUFTLENBQUNXLEVBQUUsR0FBRyxlQUFlO01BRXhCRSxXQUFXLEdBQUdwQixRQUFRLENBQUNHLGFBQWEsQ0FBQyxPQUFPLENBQUM7TUFDbkRpQixXQUFXLENBQUNDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDO01BQ3RDRCxXQUFXLENBQUNFLFdBQVcsR0FBR04sTUFBTSxDQUFDVixJQUFJLEVBQUU7TUFFdkNXLE9BQU8sQ0FBQ2IsV0FBVyxDQUFDZ0IsV0FBVyxDQUFDO01BQ2hDSCxPQUFPLENBQUNiLFdBQVcsQ0FBQ0csU0FBUyxDQUFDO0lBQUM7RUFBQTtBQUFBIn0=