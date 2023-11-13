"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var html;
  return {
    setters: [],
    execute: function () {
      _export("html", html = "\n  <div class=\"sheet\" style=\"display: flex; flex-flow: column; width: 100%\">\n    <h3 class=\"no-margin\" about=\"v-s:UISettingsBundle\" property=\"rdfs:label\"></h3>\n    <br />\n    <div class=\"form-inline\">\n      <div class=\"form-group\">\n        <label about=\"v-ui:preferredLanguage\" property=\"rdfs:label\"></label>:\n        <veda-control rel=\"v-ui:preferredLanguage\" data-type=\"checkbox\" class=\"view edit search fulltext dropdown\"></veda-control>\n      </div>\n    </div>\n    <br />\n    <div class=\"form-inline\">\n      <div class=\"form-group\">\n        <label about=\"v-ui:displayedElements\" property=\"rdfs:label\"></label>:\n        <span class=\"view -edit -search\" about=\"@\" property=\"v-ui:displayedElements\"></span>\n        <veda-control property=\"v-ui:displayedElements\" data-type=\"select\" data-source=\"{{[5,10,20]}}\" class=\"-view edit search\"></veda-control>\n      </div>\n    </div>\n    <br />\n    <div class=\"checkbox\" style=\"margin-top:0px;\">\n      <label>\n        <veda-control property=\"v-ui:fullWidth\" data-type=\"boolean\"></veda-control>\n        <strong about=\"v-ui:fullWidth\" property=\"rdfs:label\"></strong>\n      </label>\n    </div>\n    <h3 about=\"v-s:MessageSettingsBundle\" property=\"rdfs:label\"></h3>\n    <em about=\"v-ui:rejectMessageType\" property=\"rdfs:label\"></em>\n    <veda-control rel=\"v-ui:rejectMessageType\" data-type=\"checkbox\"></veda-control>\n    <br />\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJodG1sIl0sInNvdXJjZXMiOlsiLi4vLi4vb250b2xvZ3kvZ2VuZXJpYy1hcHBsaWNhdGlvbi90ZW1wbGF0ZXMvdi1zX1BlcnNvbmFsUHJlZmVyZW5jZXNUZW1wbGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgaHRtbCA9IGBcbiAgPGRpdiBjbGFzcz1cInNoZWV0XCIgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBmbGV4LWZsb3c6IGNvbHVtbjsgd2lkdGg6IDEwMCVcIj5cbiAgICA8aDMgY2xhc3M9XCJuby1tYXJnaW5cIiBhYm91dD1cInYtczpVSVNldHRpbmdzQnVuZGxlXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9oMz5cbiAgICA8YnIgLz5cbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1pbmxpbmVcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgIDxsYWJlbCBhYm91dD1cInYtdWk6cHJlZmVycmVkTGFuZ3VhZ2VcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L2xhYmVsPjpcbiAgICAgICAgPHZlZGEtY29udHJvbCByZWw9XCJ2LXVpOnByZWZlcnJlZExhbmd1YWdlXCIgZGF0YS10eXBlPVwiY2hlY2tib3hcIiBjbGFzcz1cInZpZXcgZWRpdCBzZWFyY2ggZnVsbHRleHQgZHJvcGRvd25cIj48L3ZlZGEtY29udHJvbD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxiciAvPlxuICAgIDxkaXYgY2xhc3M9XCJmb3JtLWlubGluZVwiPlxuICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgPGxhYmVsIGFib3V0PVwidi11aTpkaXNwbGF5ZWRFbGVtZW50c1wiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvbGFiZWw+OlxuICAgICAgICA8c3BhbiBjbGFzcz1cInZpZXcgLWVkaXQgLXNlYXJjaFwiIGFib3V0PVwiQFwiIHByb3BlcnR5PVwidi11aTpkaXNwbGF5ZWRFbGVtZW50c1wiPjwvc3Bhbj5cbiAgICAgICAgPHZlZGEtY29udHJvbCBwcm9wZXJ0eT1cInYtdWk6ZGlzcGxheWVkRWxlbWVudHNcIiBkYXRhLXR5cGU9XCJzZWxlY3RcIiBkYXRhLXNvdXJjZT1cInt7WzUsMTAsMjBdfX1cIiBjbGFzcz1cIi12aWV3IGVkaXQgc2VhcmNoXCI+PC92ZWRhLWNvbnRyb2w+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8YnIgLz5cbiAgICA8ZGl2IGNsYXNzPVwiY2hlY2tib3hcIiBzdHlsZT1cIm1hcmdpbi10b3A6MHB4O1wiPlxuICAgICAgPGxhYmVsPlxuICAgICAgICA8dmVkYS1jb250cm9sIHByb3BlcnR5PVwidi11aTpmdWxsV2lkdGhcIiBkYXRhLXR5cGU9XCJib29sZWFuXCI+PC92ZWRhLWNvbnRyb2w+XG4gICAgICAgIDxzdHJvbmcgYWJvdXQ9XCJ2LXVpOmZ1bGxXaWR0aFwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvc3Ryb25nPlxuICAgICAgPC9sYWJlbD5cbiAgICA8L2Rpdj5cbiAgICA8aDMgYWJvdXQ9XCJ2LXM6TWVzc2FnZVNldHRpbmdzQnVuZGxlXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9oMz5cbiAgICA8ZW0gYWJvdXQ9XCJ2LXVpOnJlamVjdE1lc3NhZ2VUeXBlXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9lbT5cbiAgICA8dmVkYS1jb250cm9sIHJlbD1cInYtdWk6cmVqZWN0TWVzc2FnZVR5cGVcIiBkYXRhLXR5cGU9XCJjaGVja2JveFwiPjwvdmVkYS1jb250cm9sPlxuICAgIDxiciAvPlxuICA8L2Rpdj5cbmA7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztzQkFBYUEsSUFBSTtJQUFBO0VBQUE7QUFBQSJ9