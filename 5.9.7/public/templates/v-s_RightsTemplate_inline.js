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
        var rights = '';
        rights += this.hasValue('v-s:canCreate', true) ? 'C' : '';
        rights += this.hasValue('v-s:canRead', true) ? 'R' : '';
        rights += this.hasValue('v-s:canUpdate', true) ? 'U' : '';
        rights += this.hasValue('v-s:canDelete', true) ? 'D' : '';
        $(template).text(rights);
      });
      _export("html", html = "\n  <span></span>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInByZSIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsInJpZ2h0cyIsImhhc1ZhbHVlIiwidGV4dCIsImh0bWwiXSwic291cmNlcyI6WyIuLi8uLi9vbnRvbG9neS9nZW5lcmljLWZ1bmN0aW9uL3RlbXBsYXRlcy92LXNfUmlnaHRzVGVtcGxhdGVfaW5saW5lLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmV4cG9ydCBjb25zdCBwcmUgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gIGxldCByaWdodHMgPSAnJztcbiAgcmlnaHRzICs9IHRoaXMuaGFzVmFsdWUoJ3YtczpjYW5DcmVhdGUnLCB0cnVlKSA/ICdDJyA6ICcnO1xuICByaWdodHMgKz0gdGhpcy5oYXNWYWx1ZSgndi1zOmNhblJlYWQnLCB0cnVlKSA/ICdSJyA6ICcnO1xuICByaWdodHMgKz0gdGhpcy5oYXNWYWx1ZSgndi1zOmNhblVwZGF0ZScsIHRydWUpID8gJ1UnIDogJyc7XG4gIHJpZ2h0cyArPSB0aGlzLmhhc1ZhbHVlKCd2LXM6Y2FuRGVsZXRlJywgdHJ1ZSkgPyAnRCcgOiAnJztcbiAgJCh0ZW1wbGF0ZSkudGV4dChyaWdodHMpO1xufTtcblxuZXhwb3J0IGNvbnN0IGh0bWwgPSBgXG4gIDxzcGFuPjwvc3Bhbj5cbmA7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O01BQU9BLENBQUMsR0FBQUMsT0FBQSxDQUFBQyxPQUFBO0lBQUE7SUFBQUMsT0FBQSxXQUFBQSxDQUFBO01BQUFDLE9BQUEsUUFFS0MsR0FBRyxHQUFHLFNBQU5BLEdBQUdBLENBQWFDLFVBQVUsRUFBRUMsUUFBUSxFQUFFQyxTQUFTLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFO1FBQ3pFSCxRQUFRLEdBQUdQLENBQUMsQ0FBQ08sUUFBUSxDQUFDO1FBQ3RCQyxTQUFTLEdBQUdSLENBQUMsQ0FBQ1EsU0FBUyxDQUFDO1FBRXhCLElBQUlHLE1BQU0sR0FBRyxFQUFFO1FBQ2ZBLE1BQU0sSUFBSSxJQUFJLENBQUNDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUU7UUFDekRELE1BQU0sSUFBSSxJQUFJLENBQUNDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUU7UUFDdkRELE1BQU0sSUFBSSxJQUFJLENBQUNDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUU7UUFDekRELE1BQU0sSUFBSSxJQUFJLENBQUNDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUU7UUFDekRaLENBQUMsQ0FBQ08sUUFBUSxDQUFDLENBQUNNLElBQUksQ0FBQ0YsTUFBTSxDQUFDO01BQzFCLENBQUM7TUFBQVAsT0FBQSxTQUVZVSxJQUFJO0lBQUE7RUFBQTtBQUFBIn0=