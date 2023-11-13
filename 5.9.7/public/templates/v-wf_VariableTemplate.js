"use strict";

System.register(["jquery", "/js/common/individual_model.js", "riot"], function (_export, _context) {
  "use strict";

  var $, IndividualModel, riot, post, html;
  function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_jsCommonIndividual_modelJs) {
      IndividualModel = _jsCommonIndividual_modelJs.default;
    }, function (_riot) {
      riot = _riot.default;
    }],
    execute: function () {
      _export("post", post = function post(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        if (!individual.hasValue('v-fw:variableScope')) $('#variableScope', template).remove();
        var valHolder = $('#values', template);
        individual['v-wf:variableValue'].map(function (value) {
          var el = $('<li>');
          if (_instanceof(value, IndividualModel)) {
            value.present(el, new IndividualModel('v-ui:ClassNameLabelLinkTemplate'));
          } else {
            el.text(value.toString());
          }
          valHolder.append(el);
        });
        $('.zoomIn.glyphicon-zoom-in', template).click(function (e) {
          e.preventDefault();
          riot.route(['#', individual.id, '/v-ui:ttl'].join('/'));
        });
      });
      _export("html", html = "\n  <span>\n    <a href=\"#\" class=\"zoomIn glyphicon glyphicon-zoom-in margin-sm-h\"></a>\n    <strong><span property=\"v-wf:variableName\"></span> =</strong>\n    <ul id=\"values\"></ul>\n    <div id=\"variableScope\">\n      <em about=\"v-wf:variableScope\" property=\"rdfs:label\"></em>\n      <ul>\n        <li rel=\"v-wf:variableScope\" data-template=\"v-ui:ClassNameLabelLinkTemplate\"></li>\n      </ul>\n    </div>\n  </span>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfanNDb21tb25JbmRpdmlkdWFsX21vZGVsSnMiLCJJbmRpdmlkdWFsTW9kZWwiLCJfcmlvdCIsInJpb3QiLCJleGVjdXRlIiwiX2V4cG9ydCIsInBvc3QiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJoYXNWYWx1ZSIsInJlbW92ZSIsInZhbEhvbGRlciIsIm1hcCIsInZhbHVlIiwiZWwiLCJfaW5zdGFuY2VvZiIsInByZXNlbnQiLCJ0ZXh0IiwidG9TdHJpbmciLCJhcHBlbmQiLCJjbGljayIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInJvdXRlIiwiaWQiLCJqb2luIiwiaHRtbCJdLCJzb3VyY2VzIjpbIi4uLy4uL29udG9sb2d5L2dlbmVyaWMtZnVuY3Rpb24vdGVtcGxhdGVzL3Ytd2ZfVmFyaWFibGVUZW1wbGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IEluZGl2aWR1YWxNb2RlbCBmcm9tICcvanMvY29tbW9uL2luZGl2aWR1YWxfbW9kZWwuanMnO1xuaW1wb3J0IHJpb3QgZnJvbSAncmlvdCc7XG5cbmV4cG9ydCBjb25zdCBwb3N0ID0gZnVuY3Rpb24gKGluZGl2aWR1YWwsIHRlbXBsYXRlLCBjb250YWluZXIsIG1vZGUsIGV4dHJhKSB7XG4gIHRlbXBsYXRlID0gJCh0ZW1wbGF0ZSk7XG4gIGNvbnRhaW5lciA9ICQoY29udGFpbmVyKTtcblxuICBpZiAoIWluZGl2aWR1YWwuaGFzVmFsdWUoJ3YtZnc6dmFyaWFibGVTY29wZScpKSAkKCcjdmFyaWFibGVTY29wZScsIHRlbXBsYXRlKS5yZW1vdmUoKTtcbiAgY29uc3QgdmFsSG9sZGVyID0gJCgnI3ZhbHVlcycsIHRlbXBsYXRlKTtcbiAgaW5kaXZpZHVhbFsndi13Zjp2YXJpYWJsZVZhbHVlJ10ubWFwKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGNvbnN0IGVsID0gJCgnPGxpPicpO1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEluZGl2aWR1YWxNb2RlbCkge1xuICAgICAgdmFsdWUucHJlc2VudChlbCwgbmV3IEluZGl2aWR1YWxNb2RlbCgndi11aTpDbGFzc05hbWVMYWJlbExpbmtUZW1wbGF0ZScpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwudGV4dCh2YWx1ZS50b1N0cmluZygpKTtcbiAgICB9XG4gICAgdmFsSG9sZGVyLmFwcGVuZChlbCk7XG4gIH0pO1xuICAkKCcuem9vbUluLmdseXBoaWNvbi16b29tLWluJywgdGVtcGxhdGUpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJpb3Qucm91dGUoWycjJywgaW5kaXZpZHVhbC5pZCwgJy92LXVpOnR0bCddLmpvaW4oJy8nKSk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGh0bWwgPSBgXG4gIDxzcGFuPlxuICAgIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJ6b29tSW4gZ2x5cGhpY29uIGdseXBoaWNvbi16b29tLWluIG1hcmdpbi1zbS1oXCI+PC9hPlxuICAgIDxzdHJvbmc+PHNwYW4gcHJvcGVydHk9XCJ2LXdmOnZhcmlhYmxlTmFtZVwiPjwvc3Bhbj4gPTwvc3Ryb25nPlxuICAgIDx1bCBpZD1cInZhbHVlc1wiPjwvdWw+XG4gICAgPGRpdiBpZD1cInZhcmlhYmxlU2NvcGVcIj5cbiAgICAgIDxlbSBhYm91dD1cInYtd2Y6dmFyaWFibGVTY29wZVwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvZW0+XG4gICAgICA8dWw+XG4gICAgICAgIDxsaSByZWw9XCJ2LXdmOnZhcmlhYmxlU2NvcGVcIiBkYXRhLXRlbXBsYXRlPVwidi11aTpDbGFzc05hbWVMYWJlbExpbmtUZW1wbGF0ZVwiPjwvbGk+XG4gICAgICA8L3VsPlxuICAgIDwvZGl2PlxuICA8L3NwYW4+XG5gO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7TUFBT0EsQ0FBQyxHQUFBQyxPQUFBLENBQUFDLE9BQUE7SUFBQSxhQUFBQywyQkFBQTtNQUNEQyxlQUFlLEdBQUFELDJCQUFBLENBQUFELE9BQUE7SUFBQSxhQUFBRyxLQUFBO01BQ2ZDLElBQUksR0FBQUQsS0FBQSxDQUFBSCxPQUFBO0lBQUE7SUFBQUssT0FBQSxXQUFBQSxDQUFBO01BQUFDLE9BQUEsU0FFRUMsSUFBSSxHQUFHLFNBQVBBLElBQUlBLENBQWFDLFVBQVUsRUFBRUMsUUFBUSxFQUFFQyxTQUFTLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFO1FBQzFFSCxRQUFRLEdBQUdYLENBQUMsQ0FBQ1csUUFBUSxDQUFDO1FBQ3RCQyxTQUFTLEdBQUdaLENBQUMsQ0FBQ1ksU0FBUyxDQUFDO1FBRXhCLElBQUksQ0FBQ0YsVUFBVSxDQUFDSyxRQUFRLENBQUMsb0JBQW9CLENBQUMsRUFBRWYsQ0FBQyxDQUFDLGdCQUFnQixFQUFFVyxRQUFRLENBQUMsQ0FBQ0ssTUFBTSxFQUFFO1FBQ3RGLElBQU1DLFNBQVMsR0FBR2pCLENBQUMsQ0FBQyxTQUFTLEVBQUVXLFFBQVEsQ0FBQztRQUN4Q0QsVUFBVSxDQUFDLG9CQUFvQixDQUFDLENBQUNRLEdBQUcsQ0FBQyxVQUFVQyxLQUFLLEVBQUU7VUFDcEQsSUFBTUMsRUFBRSxHQUFHcEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQztVQUNwQixJQUFBcUIsV0FBQSxDQUFJRixLQUFLLEVBQVlmLGVBQWUsR0FBRTtZQUNwQ2UsS0FBSyxDQUFDRyxPQUFPLENBQUNGLEVBQUUsRUFBRSxJQUFJaEIsZUFBZSxDQUFDLGlDQUFpQyxDQUFDLENBQUM7VUFDM0UsQ0FBQyxNQUFNO1lBQ0xnQixFQUFFLENBQUNHLElBQUksQ0FBQ0osS0FBSyxDQUFDSyxRQUFRLEVBQUUsQ0FBQztVQUMzQjtVQUNBUCxTQUFTLENBQUNRLE1BQU0sQ0FBQ0wsRUFBRSxDQUFDO1FBQ3RCLENBQUMsQ0FBQztRQUNGcEIsQ0FBQyxDQUFDLDJCQUEyQixFQUFFVyxRQUFRLENBQUMsQ0FBQ2UsS0FBSyxDQUFDLFVBQVVDLENBQUMsRUFBRTtVQUMxREEsQ0FBQyxDQUFDQyxjQUFjLEVBQUU7VUFDbEJ0QixJQUFJLENBQUN1QixLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUVuQixVQUFVLENBQUNvQixFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUNDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6RCxDQUFDLENBQUM7TUFDSixDQUFDO01BQUF2QixPQUFBLFNBRVl3QixJQUFJO0lBQUE7RUFBQTtBQUFBIn0=