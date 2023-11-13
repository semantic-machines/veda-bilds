"use strict";

System.register(["jquery", "/js/common/individual_model.js"], function (_export, _context) {
  "use strict";

  var $, IndividualModel, post, html;
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_jsCommonIndividual_modelJs) {
      IndividualModel = _jsCommonIndividual_modelJs.default;
    }],
    execute: function () {
      _export("post", post = function post(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        $('#add-ScheduledAction', template).click(function () {
          var addScheduledAction = $(this).hide();
          var _class = new IndividualModel('v-s:ScheduledAction');
          var ScheduledAction = new IndividualModel();
          var cntr = $('#new-ScheduledAction', template).empty();
          var tmpl = 'v-s:SingleScheduledActionTemplate';
          ScheduledAction['rdf:type'] = [_class];
          ScheduledAction['v-s:backwardTarget'] = [individual];
          ScheduledAction['v-s:backwardProperty'] = [new IndividualModel('v-s:hasScheduledAction')];
          ScheduledAction['v-s:canRead'] = [true];
          ScheduledAction['v-s:mutualMembership'] = [true];
          ScheduledAction['v-s:scriptHandlered'] = [false];
          ScheduledAction.present(cntr, tmpl, 'edit');
          ScheduledAction.one('afterSave beforeReset', function () {
            addScheduledAction.show();
            cntr.empty();
          });
        });
        template.on('click', '#reply.action', function (e) {
          e.preventDefault();
          var ScheduledActionTemplate = $(this).closest('[resource]');
          var targetScheduledAction = new IndividualModel(ScheduledActionTemplate.attr('resource'));
          var cntr = $('#new-reply', ScheduledActionTemplate).first().empty();
          var _class = new IndividualModel('v-s:ScheduledAction');
          var tmpl = new IndividualModel('v-s:SingleScheduledActionTemplate');
          var reply = new IndividualModel();
          reply['rdf:type'] = [_class];
          reply['v-s:backwardTarget'] = [targetScheduledAction];
          reply['v-s:backwardProperty'] = [new IndividualModel('v-s:hasScheduledAction')];
          reply['v-s:canRead'] = [true];
          reply.present(cntr, tmpl, 'edit');
          reply.one('afterSave beforeReset', function () {
            cntr.empty();
          });
        });
        template.on('click', '#edit-ScheduledAction.action', function (e) {
          e.preventDefault();
          var tmpl = new IndividualModel('v-s:SingleScheduledActionTemplate');
          var ScheduledActionTemplate = $(this).closest('[resource]');
          var ScheduledAction = new IndividualModel(ScheduledActionTemplate.attr('resource'));
          var cntr = $('#new-reply', ScheduledActionTemplate).first().empty();
          var ScheduledActionСontent = $('#ScheduledAction-content', ScheduledActionTemplate).hide();
          ScheduledAction.present(cntr, tmpl, 'edit');
          ScheduledAction.one('afterSave beforeReset', function () {
            ScheduledActionСontent.show();
            cntr.empty();
          });
        });
      });
      _export("html", html = "\n  <div>\n    <h3 about=\"v-s:ScheduledActionsBundle\" property=\"rdfs:label\"></h3>\n    <div about=\"@\" rel=\"v-s:hasScheduledAction\" data-template=\"v-s:RecursiveScheduledActionTemplate\"></div>\n    <div id=\"new-ScheduledAction\"></div>\n    <button class=\"margin-sm btn btn-success\" id=\"add-ScheduledAction\" about=\"v-s:AddScheduledAction\" property=\"rdfs:label\"></button>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfanNDb21tb25JbmRpdmlkdWFsX21vZGVsSnMiLCJJbmRpdmlkdWFsTW9kZWwiLCJleGVjdXRlIiwiX2V4cG9ydCIsInBvc3QiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJjbGljayIsImFkZFNjaGVkdWxlZEFjdGlvbiIsImhpZGUiLCJfY2xhc3MiLCJTY2hlZHVsZWRBY3Rpb24iLCJjbnRyIiwiZW1wdHkiLCJ0bXBsIiwicHJlc2VudCIsIm9uZSIsInNob3ciLCJvbiIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIlNjaGVkdWxlZEFjdGlvblRlbXBsYXRlIiwiY2xvc2VzdCIsInRhcmdldFNjaGVkdWxlZEFjdGlvbiIsImF0dHIiLCJmaXJzdCIsInJlcGx5IiwiU2NoZWR1bGVkQWN0aW9u0KFvbnRlbnQiLCJodG1sIl0sInNvdXJjZXMiOlsiLi4vLi4vb250b2xvZ3kvZ2VuZXJpYy1hcHBsaWNhdGlvbi9hY3Rpb24vdGVtcGxhdGVzL3Ytc19TY2hlZHVsZWRBY3Rpb25UZW1wbGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IEluZGl2aWR1YWxNb2RlbCBmcm9tICcvanMvY29tbW9uL2luZGl2aWR1YWxfbW9kZWwuanMnO1xuXG5leHBvcnQgY29uc3QgcG9zdCA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgJCgnI2FkZC1TY2hlZHVsZWRBY3Rpb24nLCB0ZW1wbGF0ZSkuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGFkZFNjaGVkdWxlZEFjdGlvbiA9ICQodGhpcykuaGlkZSgpO1xuICAgIGNvbnN0IF9jbGFzcyA9IG5ldyBJbmRpdmlkdWFsTW9kZWwoJ3YtczpTY2hlZHVsZWRBY3Rpb24nKTtcbiAgICBjb25zdCBTY2hlZHVsZWRBY3Rpb24gPSBuZXcgSW5kaXZpZHVhbE1vZGVsKCk7XG4gICAgY29uc3QgY250ciA9ICQoJyNuZXctU2NoZWR1bGVkQWN0aW9uJywgdGVtcGxhdGUpLmVtcHR5KCk7XG4gICAgY29uc3QgdG1wbCA9ICd2LXM6U2luZ2xlU2NoZWR1bGVkQWN0aW9uVGVtcGxhdGUnO1xuICAgIFNjaGVkdWxlZEFjdGlvblsncmRmOnR5cGUnXSA9IFtfY2xhc3NdO1xuICAgIFNjaGVkdWxlZEFjdGlvblsndi1zOmJhY2t3YXJkVGFyZ2V0J10gPSBbaW5kaXZpZHVhbF07XG4gICAgU2NoZWR1bGVkQWN0aW9uWyd2LXM6YmFja3dhcmRQcm9wZXJ0eSddID0gW25ldyBJbmRpdmlkdWFsTW9kZWwoJ3YtczpoYXNTY2hlZHVsZWRBY3Rpb24nKV07XG4gICAgU2NoZWR1bGVkQWN0aW9uWyd2LXM6Y2FuUmVhZCddID0gW3RydWVdO1xuICAgIFNjaGVkdWxlZEFjdGlvblsndi1zOm11dHVhbE1lbWJlcnNoaXAnXSA9IFt0cnVlXTtcbiAgICBTY2hlZHVsZWRBY3Rpb25bJ3YtczpzY3JpcHRIYW5kbGVyZWQnXSA9IFtmYWxzZV07XG4gICAgU2NoZWR1bGVkQWN0aW9uLnByZXNlbnQoY250ciwgdG1wbCwgJ2VkaXQnKTtcbiAgICBTY2hlZHVsZWRBY3Rpb24ub25lKCdhZnRlclNhdmUgYmVmb3JlUmVzZXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhZGRTY2hlZHVsZWRBY3Rpb24uc2hvdygpO1xuICAgICAgY250ci5lbXB0eSgpO1xuICAgIH0pO1xuICB9KTtcblxuICB0ZW1wbGF0ZS5vbignY2xpY2snLCAnI3JlcGx5LmFjdGlvbicsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IFNjaGVkdWxlZEFjdGlvblRlbXBsYXRlID0gJCh0aGlzKS5jbG9zZXN0KCdbcmVzb3VyY2VdJyk7XG4gICAgY29uc3QgdGFyZ2V0U2NoZWR1bGVkQWN0aW9uID0gbmV3IEluZGl2aWR1YWxNb2RlbChTY2hlZHVsZWRBY3Rpb25UZW1wbGF0ZS5hdHRyKCdyZXNvdXJjZScpKTtcbiAgICBjb25zdCBjbnRyID0gJCgnI25ldy1yZXBseScsIFNjaGVkdWxlZEFjdGlvblRlbXBsYXRlKS5maXJzdCgpLmVtcHR5KCk7XG4gICAgY29uc3QgX2NsYXNzID0gbmV3IEluZGl2aWR1YWxNb2RlbCgndi1zOlNjaGVkdWxlZEFjdGlvbicpO1xuICAgIGNvbnN0IHRtcGwgPSBuZXcgSW5kaXZpZHVhbE1vZGVsKCd2LXM6U2luZ2xlU2NoZWR1bGVkQWN0aW9uVGVtcGxhdGUnKTtcbiAgICBjb25zdCByZXBseSA9IG5ldyBJbmRpdmlkdWFsTW9kZWwoKTtcbiAgICByZXBseVsncmRmOnR5cGUnXSA9IFtfY2xhc3NdO1xuICAgIHJlcGx5Wyd2LXM6YmFja3dhcmRUYXJnZXQnXSA9IFt0YXJnZXRTY2hlZHVsZWRBY3Rpb25dO1xuICAgIHJlcGx5Wyd2LXM6YmFja3dhcmRQcm9wZXJ0eSddID0gW25ldyBJbmRpdmlkdWFsTW9kZWwoJ3YtczpoYXNTY2hlZHVsZWRBY3Rpb24nKV07XG4gICAgcmVwbHlbJ3YtczpjYW5SZWFkJ10gPSBbdHJ1ZV07XG4gICAgcmVwbHkucHJlc2VudChjbnRyLCB0bXBsLCAnZWRpdCcpO1xuICAgIHJlcGx5Lm9uZSgnYWZ0ZXJTYXZlIGJlZm9yZVJlc2V0JywgZnVuY3Rpb24gKCkge1xuICAgICAgY250ci5lbXB0eSgpO1xuICAgIH0pO1xuICB9KTtcblxuICB0ZW1wbGF0ZS5vbignY2xpY2snLCAnI2VkaXQtU2NoZWR1bGVkQWN0aW9uLmFjdGlvbicsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHRtcGwgPSBuZXcgSW5kaXZpZHVhbE1vZGVsKCd2LXM6U2luZ2xlU2NoZWR1bGVkQWN0aW9uVGVtcGxhdGUnKTtcbiAgICBjb25zdCBTY2hlZHVsZWRBY3Rpb25UZW1wbGF0ZSA9ICQodGhpcykuY2xvc2VzdCgnW3Jlc291cmNlXScpO1xuICAgIGNvbnN0IFNjaGVkdWxlZEFjdGlvbiA9IG5ldyBJbmRpdmlkdWFsTW9kZWwoU2NoZWR1bGVkQWN0aW9uVGVtcGxhdGUuYXR0cigncmVzb3VyY2UnKSk7XG4gICAgY29uc3QgY250ciA9ICQoJyNuZXctcmVwbHknLCBTY2hlZHVsZWRBY3Rpb25UZW1wbGF0ZSkuZmlyc3QoKS5lbXB0eSgpO1xuICAgIGNvbnN0IFNjaGVkdWxlZEFjdGlvbtChb250ZW50ID0gJCgnI1NjaGVkdWxlZEFjdGlvbi1jb250ZW50JywgU2NoZWR1bGVkQWN0aW9uVGVtcGxhdGUpLmhpZGUoKTtcbiAgICBTY2hlZHVsZWRBY3Rpb24ucHJlc2VudChjbnRyLCB0bXBsLCAnZWRpdCcpO1xuICAgIFNjaGVkdWxlZEFjdGlvbi5vbmUoJ2FmdGVyU2F2ZSBiZWZvcmVSZXNldCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIFNjaGVkdWxlZEFjdGlvbtChb250ZW50LnNob3coKTtcbiAgICAgIGNudHIuZW1wdHkoKTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgaHRtbCA9IGBcbiAgPGRpdj5cbiAgICA8aDMgYWJvdXQ9XCJ2LXM6U2NoZWR1bGVkQWN0aW9uc0J1bmRsZVwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvaDM+XG4gICAgPGRpdiBhYm91dD1cIkBcIiByZWw9XCJ2LXM6aGFzU2NoZWR1bGVkQWN0aW9uXCIgZGF0YS10ZW1wbGF0ZT1cInYtczpSZWN1cnNpdmVTY2hlZHVsZWRBY3Rpb25UZW1wbGF0ZVwiPjwvZGl2PlxuICAgIDxkaXYgaWQ9XCJuZXctU2NoZWR1bGVkQWN0aW9uXCI+PC9kaXY+XG4gICAgPGJ1dHRvbiBjbGFzcz1cIm1hcmdpbi1zbSBidG4gYnRuLXN1Y2Nlc3NcIiBpZD1cImFkZC1TY2hlZHVsZWRBY3Rpb25cIiBhYm91dD1cInYtczpBZGRTY2hlZHVsZWRBY3Rpb25cIiBwcm9wZXJ0eT1cInJkZnM6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