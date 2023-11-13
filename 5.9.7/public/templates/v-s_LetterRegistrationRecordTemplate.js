"use strict";

System.register(["/js/common/util.js", "jquery", "/js/common/individual_model.js"], function (_export, _context) {
  "use strict";

  var CommonUtil, $, IndividualModel, post, html;
  return {
    setters: [function (_jsCommonUtilJs) {
      CommonUtil = _jsCommonUtilJs.default;
    }, function (_jquery) {
      $ = _jquery.default;
    }, function (_jsCommonIndividual_modelJs) {
      IndividualModel = _jsCommonIndividual_modelJs.default;
    }],
    execute: function () {
      _export("post", post = function post(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        var self = this;
        function setRegistrationDate() {
          if (this.hasValue('rdf:type', 'v-s:LetterRegistrationRecordEnumerated') && !this.hasValue('v-s:registrationNumber')) {
            var today = new Date();
            var d = today.getDate();
            var m = today.getMonth();
            var y = today.getFullYear();
            today.setUTCFullYear(y, m, d);
            today.setUTCHours(0, 0, 0, 0);
            individual['v-s:registrationDate'] = [today];
          }
        }
        this.on('beforeSave', setRegistrationDate);
        template.one('remove', function () {
          self.off('beforeSave', setRegistrationDate);
        });
        if (mode === 'edit' || template.attr('data-mode') === 'edit') {
          individual.on('rdf:type', typeHandler);
          template.one('remove', function () {
            individual.off('rdf:type', typeHandler);
          });
          typeHandler.call(this);
        }
        function typeHandler() {
          this.is('v-s:LetterRegistrationRecordEnumerated').then(function (isEnumerated) {
            if (isEnumerated) {
              var autoBundle = new IndividualModel('v-s:AutomaticallyBundle');
              autoBundle.load().then(function (autoBundle) {
                $('input, textarea', template).attr('placeholder', autoBundle['rdfs:label'].map(CommonUtil.formatValue).join(' '));
              });
            } else {
              var manualBundle = new IndividualModel('v-s:ManuallyBundle');
              manualBundle.load().then(function (manualBundle) {
                $('input, textarea', template).attr('placeholder', manualBundle['rdfs:label'].map(CommonUtil.formatValue).join(' '));
              });
            }
          });
        }
        if (container.attr('rel') === 'v-s:hasLetterRegistrationRecordSender') {
          template.addClass('panel-info');
          template.children(':first').addClass('bg-info');
        } else if (container.attr('rel') === 'v-s:hasLetterRegistrationRecordRecipient') {
          template.addClass('panel-success');
          template.children(':first').addClass('bg-success');
        }
      });
      _export("html", html = "\n  <div class=\"panel\">\n    <div class=\"panel-body\">\n      <div class=\"row\">\n        <div class=\"col-sm-6\">\n          <em about=\"v-s:registrationNumber\" property=\"rdfs:label\"></em>\n          <div property=\"v-s:registrationNumber\" class=\"view -edit -search\"></div>\n          <veda-control property=\"v-s:registrationNumber\" data-type=\"text\" class=\"-view edit search\"></veda-control>\n        </div>\n        <div class=\"col-sm-6\">\n          <em about=\"v-s:registrationDate\" property=\"rdfs:label\"></em>\n          <div property=\"v-s:registrationDate\" class=\"view -edit search\"></div>\n          <veda-control property=\"v-s:registrationDate\" data-type=\"date\" class=\"-view edit search\"></veda-control>\n        </div>\n      </div>\n    </div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJDb21tb25VdGlsIiwiX2pzQ29tbW9uVXRpbEpzIiwiZGVmYXVsdCIsIl9qcXVlcnkiLCIkIiwiX2pzQ29tbW9uSW5kaXZpZHVhbF9tb2RlbEpzIiwiSW5kaXZpZHVhbE1vZGVsIiwiZXhlY3V0ZSIsIl9leHBvcnQiLCJwb3N0IiwiaW5kaXZpZHVhbCIsInRlbXBsYXRlIiwiY29udGFpbmVyIiwibW9kZSIsImV4dHJhIiwic2VsZiIsInNldFJlZ2lzdHJhdGlvbkRhdGUiLCJoYXNWYWx1ZSIsInRvZGF5IiwiRGF0ZSIsImQiLCJnZXREYXRlIiwibSIsImdldE1vbnRoIiwieSIsImdldEZ1bGxZZWFyIiwic2V0VVRDRnVsbFllYXIiLCJzZXRVVENIb3VycyIsIm9uIiwib25lIiwib2ZmIiwiYXR0ciIsInR5cGVIYW5kbGVyIiwiY2FsbCIsImlzIiwidGhlbiIsImlzRW51bWVyYXRlZCIsImF1dG9CdW5kbGUiLCJsb2FkIiwibWFwIiwiZm9ybWF0VmFsdWUiLCJqb2luIiwibWFudWFsQnVuZGxlIiwiYWRkQ2xhc3MiLCJjaGlsZHJlbiIsImh0bWwiXSwic291cmNlcyI6WyIuLi8uLi9vbnRvbG9neS9nZW5lcmljLWFwcGxpY2F0aW9uL2NvcnJlc3BvbmRlbmNlL3RlbXBsYXRlcy92LXNfTGV0dGVyUmVnaXN0cmF0aW9uUmVjb3JkVGVtcGxhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbW1vblV0aWwgZnJvbSAnL2pzL2NvbW1vbi91dGlsLmpzJztcbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgSW5kaXZpZHVhbE1vZGVsIGZyb20gJy9qcy9jb21tb24vaW5kaXZpZHVhbF9tb2RlbC5qcyc7XG5cbmV4cG9ydCBjb25zdCBwb3N0ID0gZnVuY3Rpb24gKGluZGl2aWR1YWwsIHRlbXBsYXRlLCBjb250YWluZXIsIG1vZGUsIGV4dHJhKSB7XG4gIHRlbXBsYXRlID0gJCh0ZW1wbGF0ZSk7XG4gIGNvbnRhaW5lciA9ICQoY29udGFpbmVyKTtcblxuICBjb25zdCBzZWxmID0gdGhpcztcbiAgZnVuY3Rpb24gc2V0UmVnaXN0cmF0aW9uRGF0ZSAoKSB7XG4gICAgaWYgKHRoaXMuaGFzVmFsdWUoJ3JkZjp0eXBlJywgJ3YtczpMZXR0ZXJSZWdpc3RyYXRpb25SZWNvcmRFbnVtZXJhdGVkJykgJiYgIXRoaXMuaGFzVmFsdWUoJ3YtczpyZWdpc3RyYXRpb25OdW1iZXInKSkge1xuICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgICAgY29uc3QgZCA9IHRvZGF5LmdldERhdGUoKTtcbiAgICAgIGNvbnN0IG0gPSB0b2RheS5nZXRNb250aCgpO1xuICAgICAgY29uc3QgeSA9IHRvZGF5LmdldEZ1bGxZZWFyKCk7XG4gICAgICB0b2RheS5zZXRVVENGdWxsWWVhcih5LCBtLCBkKTtcbiAgICAgIHRvZGF5LnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgaW5kaXZpZHVhbFsndi1zOnJlZ2lzdHJhdGlvbkRhdGUnXSA9IFt0b2RheV07XG4gICAgfVxuICB9XG4gIHRoaXMub24oJ2JlZm9yZVNhdmUnLCBzZXRSZWdpc3RyYXRpb25EYXRlKTtcbiAgdGVtcGxhdGUub25lKCdyZW1vdmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgc2VsZi5vZmYoJ2JlZm9yZVNhdmUnLCBzZXRSZWdpc3RyYXRpb25EYXRlKTtcbiAgfSk7XG5cbiAgaWYgKG1vZGUgPT09ICdlZGl0JyB8fCB0ZW1wbGF0ZS5hdHRyKCdkYXRhLW1vZGUnKSA9PT0gJ2VkaXQnKSB7XG4gICAgaW5kaXZpZHVhbC5vbigncmRmOnR5cGUnLCB0eXBlSGFuZGxlcik7XG4gICAgdGVtcGxhdGUub25lKCdyZW1vdmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpbmRpdmlkdWFsLm9mZigncmRmOnR5cGUnLCB0eXBlSGFuZGxlcik7XG4gICAgfSk7XG4gICAgdHlwZUhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHR5cGVIYW5kbGVyICgpIHtcbiAgICB0aGlzLmlzKCd2LXM6TGV0dGVyUmVnaXN0cmF0aW9uUmVjb3JkRW51bWVyYXRlZCcpLnRoZW4oZnVuY3Rpb24gKGlzRW51bWVyYXRlZCkge1xuICAgICAgaWYgKGlzRW51bWVyYXRlZCkge1xuICAgICAgICBjb25zdCBhdXRvQnVuZGxlID0gbmV3IEluZGl2aWR1YWxNb2RlbCgndi1zOkF1dG9tYXRpY2FsbHlCdW5kbGUnKTtcbiAgICAgICAgYXV0b0J1bmRsZS5sb2FkKCkudGhlbihmdW5jdGlvbiAoYXV0b0J1bmRsZSkge1xuICAgICAgICAgICQoJ2lucHV0LCB0ZXh0YXJlYScsIHRlbXBsYXRlKS5hdHRyKCdwbGFjZWhvbGRlcicsIGF1dG9CdW5kbGVbJ3JkZnM6bGFiZWwnXS5tYXAoQ29tbW9uVXRpbC5mb3JtYXRWYWx1ZSkuam9pbignICcpKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBtYW51YWxCdW5kbGUgPSBuZXcgSW5kaXZpZHVhbE1vZGVsKCd2LXM6TWFudWFsbHlCdW5kbGUnKTtcbiAgICAgICAgbWFudWFsQnVuZGxlLmxvYWQoKS50aGVuKGZ1bmN0aW9uIChtYW51YWxCdW5kbGUpIHtcbiAgICAgICAgICAkKCdpbnB1dCwgdGV4dGFyZWEnLCB0ZW1wbGF0ZSkuYXR0cigncGxhY2Vob2xkZXInLCBtYW51YWxCdW5kbGVbJ3JkZnM6bGFiZWwnXS5tYXAoQ29tbW9uVXRpbC5mb3JtYXRWYWx1ZSkuam9pbignICcpKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBpZiAoY29udGFpbmVyLmF0dHIoJ3JlbCcpID09PSAndi1zOmhhc0xldHRlclJlZ2lzdHJhdGlvblJlY29yZFNlbmRlcicpIHtcbiAgICB0ZW1wbGF0ZS5hZGRDbGFzcygncGFuZWwtaW5mbycpO1xuICAgIHRlbXBsYXRlLmNoaWxkcmVuKCc6Zmlyc3QnKS5hZGRDbGFzcygnYmctaW5mbycpO1xuICB9IGVsc2UgaWYgKGNvbnRhaW5lci5hdHRyKCdyZWwnKSA9PT0gJ3YtczpoYXNMZXR0ZXJSZWdpc3RyYXRpb25SZWNvcmRSZWNpcGllbnQnKSB7XG4gICAgdGVtcGxhdGUuYWRkQ2xhc3MoJ3BhbmVsLXN1Y2Nlc3MnKTtcbiAgICB0ZW1wbGF0ZS5jaGlsZHJlbignOmZpcnN0JykuYWRkQ2xhc3MoJ2JnLXN1Y2Nlc3MnKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGh0bWwgPSBgXG4gIDxkaXYgY2xhc3M9XCJwYW5lbFwiPlxuICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tNlwiPlxuICAgICAgICAgIDxlbSBhYm91dD1cInYtczpyZWdpc3RyYXRpb25OdW1iZXJcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L2VtPlxuICAgICAgICAgIDxkaXYgcHJvcGVydHk9XCJ2LXM6cmVnaXN0cmF0aW9uTnVtYmVyXCIgY2xhc3M9XCJ2aWV3IC1lZGl0IC1zZWFyY2hcIj48L2Rpdj5cbiAgICAgICAgICA8dmVkYS1jb250cm9sIHByb3BlcnR5PVwidi1zOnJlZ2lzdHJhdGlvbk51bWJlclwiIGRhdGEtdHlwZT1cInRleHRcIiBjbGFzcz1cIi12aWV3IGVkaXQgc2VhcmNoXCI+PC92ZWRhLWNvbnRyb2w+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTZcIj5cbiAgICAgICAgICA8ZW0gYWJvdXQ9XCJ2LXM6cmVnaXN0cmF0aW9uRGF0ZVwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvZW0+XG4gICAgICAgICAgPGRpdiBwcm9wZXJ0eT1cInYtczpyZWdpc3RyYXRpb25EYXRlXCIgY2xhc3M9XCJ2aWV3IC1lZGl0IHNlYXJjaFwiPjwvZGl2PlxuICAgICAgICAgIDx2ZWRhLWNvbnRyb2wgcHJvcGVydHk9XCJ2LXM6cmVnaXN0cmF0aW9uRGF0ZVwiIGRhdGEtdHlwZT1cImRhdGVcIiBjbGFzcz1cIi12aWV3IGVkaXQgc2VhcmNoXCI+PC92ZWRhLWNvbnRyb2w+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuYDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7TUFBT0EsVUFBVSxHQUFBQyxlQUFBLENBQUFDLE9BQUE7SUFBQSxhQUFBQyxPQUFBO01BQ1ZDLENBQUMsR0FBQUQsT0FBQSxDQUFBRCxPQUFBO0lBQUEsYUFBQUcsMkJBQUE7TUFDREMsZUFBZSxHQUFBRCwyQkFBQSxDQUFBSCxPQUFBO0lBQUE7SUFBQUssT0FBQSxXQUFBQSxDQUFBO01BQUFDLE9BQUEsU0FFVEMsSUFBSSxHQUFHLFNBQVBBLElBQUlBLENBQWFDLFVBQVUsRUFBRUMsUUFBUSxFQUFFQyxTQUFTLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFO1FBQzFFSCxRQUFRLEdBQUdQLENBQUMsQ0FBQ08sUUFBUSxDQUFDO1FBQ3RCQyxTQUFTLEdBQUdSLENBQUMsQ0FBQ1EsU0FBUyxDQUFDO1FBRXhCLElBQU1HLElBQUksR0FBRyxJQUFJO1FBQ2pCLFNBQVNDLG1CQUFtQkEsQ0FBQSxFQUFJO1VBQzlCLElBQUksSUFBSSxDQUFDQyxRQUFRLENBQUMsVUFBVSxFQUFFLHdDQUF3QyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUNBLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFO1lBQ25ILElBQU1DLEtBQUssR0FBRyxJQUFJQyxJQUFJLEVBQUU7WUFDeEIsSUFBTUMsQ0FBQyxHQUFHRixLQUFLLENBQUNHLE9BQU8sRUFBRTtZQUN6QixJQUFNQyxDQUFDLEdBQUdKLEtBQUssQ0FBQ0ssUUFBUSxFQUFFO1lBQzFCLElBQU1DLENBQUMsR0FBR04sS0FBSyxDQUFDTyxXQUFXLEVBQUU7WUFDN0JQLEtBQUssQ0FBQ1EsY0FBYyxDQUFDRixDQUFDLEVBQUVGLENBQUMsRUFBRUYsQ0FBQyxDQUFDO1lBQzdCRixLQUFLLENBQUNTLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDN0Jq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