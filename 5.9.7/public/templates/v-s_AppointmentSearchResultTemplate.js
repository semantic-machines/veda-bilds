"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var html;
  return {
    setters: [],
    execute: function () {
      _export("html", html = "\n  <table class=\"table table-bordered\">\n    <thead class=\"result-header\">\n      <tr>\n        <th colspan=\"8\" about=\"v-s:Appointment\" property=\"rdfs:label\"></th>\n      </tr>\n      <tr class=\"active\">\n        <th width=\"1%\"><span class=\"glyphicon glyphicon-search\"></span></th>\n        <th width=\"10%\"><span about=\"v-s:creator\" property=\"rdfs:label\"></span></th>\n        <th width=\"10%\" class=\"orderby\" data-orderby=\"v-s:created\"><span about=\"v-s:created\" property=\"rdfs:label\"></span></th>\n        <th><span about=\"rdfs:label\" property=\"rdfs:label\"></span></th>\n        <th><span about=\"v-s:parentOrganization\" property=\"rdfs:label\"></span></th>\n        <th><span about=\"v-s:parentUnit\" property=\"rdfs:label\"></span></th>\n        <th><span about=\"v-s:origin\" property=\"rdfs:label\"></span></th>\n      </tr>\n    </thead>\n    <tbody class=\"result-container\">\n      <tr>\n        <td><a href=\"#/@\" class=\"glyphicon glyphicon-search\"></a></td>\n        <td rel=\"v-s:creator\" data-template=\"v-ui:LabelTemplate\"></td>\n        <td property=\"v-s:created\"></td>\n        <td property=\"rdfs:label\"></td>\n        <td rel=\"v-s:parentOrganization\" data-template=\"v-ui:LabelTemplate\"></td>\n        <td rel=\"v-s:parentUnit\" data-template=\"v-ui:LabelTemplate\"></td>\n        <td property=\"v-s:origin\"></td>\n      </tr>\n    </tbody>\n  </table>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJodG1sIl0sInNvdXJjZXMiOlsiLi4vLi4vb250b2xvZ3kvZ2VuZXJpYy1hcHBsaWNhdGlvbi90ZW1wbGF0ZXMvdi1zX0FwcG9pbnRtZW50U2VhcmNoUmVzdWx0VGVtcGxhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGh0bWwgPSBgXG4gIDx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLWJvcmRlcmVkXCI+XG4gICAgPHRoZWFkIGNsYXNzPVwicmVzdWx0LWhlYWRlclwiPlxuICAgICAgPHRyPlxuICAgICAgICA8dGggY29sc3Bhbj1cIjhcIiBhYm91dD1cInYtczpBcHBvaW50bWVudFwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvdGg+XG4gICAgICA8L3RyPlxuICAgICAgPHRyIGNsYXNzPVwiYWN0aXZlXCI+XG4gICAgICAgIDx0aCB3aWR0aD1cIjElXCI+PHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXNlYXJjaFwiPjwvc3Bhbj48L3RoPlxuICAgICAgICA8dGggd2lkdGg9XCIxMCVcIj48c3BhbiBhYm91dD1cInYtczpjcmVhdG9yXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9zcGFuPjwvdGg+XG4gICAgICAgIDx0aCB3aWR0aD1cIjEwJVwiIGNsYXNzPVwib3JkZXJieVwiIGRhdGEtb3JkZXJieT1cInYtczpjcmVhdGVkXCI+PHNwYW4gYWJvdXQ9XCJ2LXM6Y3JlYXRlZFwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvc3Bhbj48L3RoPlxuICAgICAgICA8dGg+PHNwYW4gYWJvdXQ9XCJyZGZzOmxhYmVsXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9zcGFuPjwvdGg+XG4gICAgICAgIDx0aD48c3BhbiBhYm91dD1cInYtczpwYXJlbnRPcmdhbml6YXRpb25cIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L3NwYW4+PC90aD5cbiAgICAgICAgPHRoPjxzcGFuIGFib3V0PVwidi1zOnBhcmVudFVuaXRcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L3NwYW4+PC90aD5cbiAgICAgICAgPHRoPjxzcGFuIGFib3V0PVwidi1zOm9yaWdpblwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvc3Bhbj48L3RoPlxuICAgICAgPC90cj5cbiAgICA8L3RoZWFkPlxuICAgIDx0Ym9keSBjbGFzcz1cInJlc3VsdC1jb250YWluZXJcIj5cbiAgICAgIDx0cj5cbiAgICAgICAgPHRkPjxhIGhyZWY9XCIjL0BcIiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tc2VhcmNoXCI+PC9hPjwvdGQ+XG4gICAgICAgIDx0ZCByZWw9XCJ2LXM6Y3JlYXRvclwiIGRhdGEtdGVtcGxhdGU9XCJ2LXVpOkxhYmVsVGVtcGxhdGVcIj48L3RkPlxuICAgICAgICA8dGQgcHJvcGVydHk9XCJ2LXM6Y3JlYXRlZFwiPjwvdGQ+XG4gICAgICAgIDx0ZCBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L3RkPlxuICAgICAgICA8dGQgcmVsPVwidi1zOnBhcmVudE9yZ2FuaXphdGlvblwiIGRhdGEtdGVtcGxhdGU9XCJ2LXVpOkxhYmVsVGVtcGxhdGVcIj48L3RkPlxuICAgICAgICA8dGQgcmVsPVwidi1zOnBhcmVudFVuaXRcIiBkYXRhLXRlbXBsYXRlPVwidi11aTpMYWJlbFRlbXBsYXRlXCI+PC90ZD5cbiAgICAgICAgPHRkIHByb3BlcnR5PVwidi1zOm9yaWdpblwiPjwvdGQ+XG4gICAgICA8L3RyPlxuICAgIDwvdGJvZHk+XG4gIDwvdGFibGU+XG5gO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7c0JBQWFBLElBQUk7SUFBQTtFQUFBO0FBQUEifQ==