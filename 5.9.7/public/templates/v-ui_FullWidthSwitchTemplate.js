"use strict";

System.register(["/js/common/util.js", "jquery", "/js/common/veda.js", "/js/common/individual_model.js"], function (_export, _context) {
  "use strict";

  var CommonUtil, $, veda, IndividualModel, pre, html;
  return {
    setters: [function (_jsCommonUtilJs) {
      CommonUtil = _jsCommonUtilJs.default;
    }, function (_jquery) {
      $ = _jquery.default;
    }, function (_jsCommonVedaJs) {
      veda = _jsCommonVedaJs.default;
    }, function (_jsCommonIndividual_modelJs) {
      IndividualModel = _jsCommonIndividual_modelJs.default;
    }],
    execute: function () {
      _export("pre", pre = function pre(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        template.click(function () {
          try {
            var value = veda.user.preferences['v-ui:fullWidth'][0];
            veda.user.preferences['v-ui:fullWidth'] = [!value];
            veda.user.preferences.save();
          } catch (error) {
            console.error('Full width switch error');
          }
        });
        veda.user.preferences.on('v-ui:fullWidth', widthHandler);
        template.one('remove', function () {
          veda.user.preferences.off('v-ui:fullWidth', widthHandler);
        });
        widthHandler();
        function widthHandler() {
          var style = $('#full-width-style', template);
          if (veda.user.preferences.hasValue('v-ui:fullWidth', true)) {
            style.attr('media', 'all');
            template.removeClass('btn-default').addClass('btn-success active');
          } else {
            style.attr('media', 'not all');
            template.addClass('btn-default').removeClass('btn-success active');
          }
        }
        return new IndividualModel('v-s:ChangeSizeBundle').load().then(function (changeSizeBundle) {
          template.tooltip({
            container: template,
            placement: 'bottom',
            trigger: 'hover',
            title: changeSizeBundle['rdfs:label'].map(CommonUtil.formatValue).join(' ')
          });
        });
      });
      _export("html", html = "\n  <button class=\"btn btn-xs btn-default navbar-btn margin-sm-h\">\n    <span class=\"glyphicon glyphicon-fullscreen\"></span>\n    <style id=\"full-width-style\" media=\"not all\">\n      .container {\n        width: 98% !important;\n        margin-left: 1% !important;\n        margin-right: 1% !important;\n      }\n    </style>\n  </button>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJDb21tb25VdGlsIiwiX2pzQ29tbW9uVXRpbEpzIiwiZGVmYXVsdCIsIl9qcXVlcnkiLCIkIiwiX2pzQ29tbW9uVmVkYUpzIiwidmVkYSIsIl9qc0NvbW1vbkluZGl2aWR1YWxfbW9kZWxKcyIsIkluZGl2aWR1YWxNb2RlbCIsImV4ZWN1dGUiLCJfZXhwb3J0IiwicHJlIiwiaW5kaXZpZHVhbCIsInRlbXBsYXRlIiwiY29udGFpbmVyIiwibW9kZSIsImV4dHJhIiwiY2xpY2siLCJ2YWx1ZSIsInVzZXIiLCJwcmVmZXJlbmNlcyIsInNhdmUiLCJlcnJvciIsImNvbnNvbGUiLCJvbiIsIndpZHRoSGFuZGxlciIsIm9uZSIsIm9mZiIsInN0eWxlIiwiaGFzVmFsdWUiLCJhdHRyIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsImxvYWQiLCJ0aGVuIiwiY2hhbmdlU2l6ZUJ1bmRsZSIsInRvb2x0aXAiLCJwbGFjZW1lbnQiLCJ0cmlnZ2VyIiwidGl0bGUiLCJtYXAiLCJmb3JtYXRWYWx1ZSIsImpvaW4iLCJodG1sIl0sInNvdXJjZXMiOlsiLi4vLi4vb250b2xvZ3kvc3lzdGVtLWNvcmUvdGVtcGxhdGVzL3YtdWlfRnVsbFdpZHRoU3dpdGNoVGVtcGxhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbW1vblV0aWwgZnJvbSAnL2pzL2NvbW1vbi91dGlsLmpzJztcbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgdmVkYSBmcm9tICcvanMvY29tbW9uL3ZlZGEuanMnO1xuaW1wb3J0IEluZGl2aWR1YWxNb2RlbCBmcm9tICcvanMvY29tbW9uL2luZGl2aWR1YWxfbW9kZWwuanMnO1xuXG5leHBvcnQgY29uc3QgcHJlID0gZnVuY3Rpb24gKGluZGl2aWR1YWwsIHRlbXBsYXRlLCBjb250YWluZXIsIG1vZGUsIGV4dHJhKSB7XG4gIHRlbXBsYXRlID0gJCh0ZW1wbGF0ZSk7XG4gIGNvbnRhaW5lciA9ICQoY29udGFpbmVyKTtcblxuICB0ZW1wbGF0ZS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdmVkYS51c2VyLnByZWZlcmVuY2VzWyd2LXVpOmZ1bGxXaWR0aCddWzBdO1xuICAgICAgdmVkYS51c2VyLnByZWZlcmVuY2VzWyd2LXVpOmZ1bGxXaWR0aCddID0gWyF2YWx1ZV07XG4gICAgICB2ZWRhLnVzZXIucHJlZmVyZW5jZXMuc2F2ZSgpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdGdWxsIHdpZHRoIHN3aXRjaCBlcnJvcicpO1xuICAgIH1cbiAgfSk7XG4gIHZlZGEudXNlci5wcmVmZXJlbmNlcy5vbigndi11aTpmdWxsV2lkdGgnLCB3aWR0aEhhbmRsZXIpO1xuICB0ZW1wbGF0ZS5vbmUoJ3JlbW92ZScsIGZ1bmN0aW9uICgpIHtcbiAgICB2ZWRhLnVzZXIucHJlZmVyZW5jZXMub2ZmKCd2LXVpOmZ1bGxXaWR0aCcsIHdpZHRoSGFuZGxlcik7XG4gIH0pO1xuICB3aWR0aEhhbmRsZXIoKTtcbiAgZnVuY3Rpb24gd2lkdGhIYW5kbGVyICgpIHtcbiAgICBjb25zdCBzdHlsZSA9ICQoJyNmdWxsLXdpZHRoLXN0eWxlJywgdGVtcGxhdGUpO1xuICAgIGlmICh2ZWRhLnVzZXIucHJlZmVyZW5jZXMuaGFzVmFsdWUoJ3YtdWk6ZnVsbFdpZHRoJywgdHJ1ZSkpIHtcbiAgICAgIHN0eWxlLmF0dHIoJ21lZGlhJywgJ2FsbCcpO1xuICAgICAgdGVtcGxhdGUucmVtb3ZlQ2xhc3MoJ2J0bi1kZWZhdWx0JykuYWRkQ2xhc3MoJ2J0bi1zdWNjZXNzIGFjdGl2ZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5hdHRyKCdtZWRpYScsICdub3QgYWxsJyk7XG4gICAgICB0ZW1wbGF0ZS5hZGRDbGFzcygnYnRuLWRlZmF1bHQnKS5yZW1vdmVDbGFzcygnYnRuLXN1Y2Nlc3MgYWN0aXZlJyk7XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXcgSW5kaXZpZHVhbE1vZGVsKCd2LXM6Q2hhbmdlU2l6ZUJ1bmRsZScpLmxvYWQoKS50aGVuKGZ1bmN0aW9uIChjaGFuZ2VTaXplQnVuZGxlKSB7XG4gICAgdGVtcGxhdGUudG9vbHRpcCh7XG4gICAgICBjb250YWluZXI6IHRlbXBsYXRlLFxuICAgICAgcGxhY2VtZW50OiAnYm90dG9tJyxcbiAgICAgIHRyaWdnZXI6ICdob3ZlcicsXG4gICAgICB0aXRsZTogY2hhbmdlU2l6ZUJ1bmRsZVsncmRmczpsYWJlbCddLm1hcChDb21tb25VdGlsLmZvcm1hdFZhbHVlKS5qb2luKCcgJyksXG4gICAgfSk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGh0bWwgPSBgXG4gIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXhzIGJ0bi1kZWZhdWx0IG5hdmJhci1idG4gbWFyZ2luLXNtLWhcIj5cbiAgICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tZnVsbHNjcmVlblwiPjwvc3Bhbj5cbiAgICA8c3R5bGUgaWQ9XCJmdWxsLXdpZHRoLXN0eWxlXCIgbWVkaWE9XCJub3QgYWxsXCI+XG4gICAgICAuY29udGFpbmVyIHtcbiAgICAgICAgd2lkdGg6IDk4JSAhaW1wb3J0YW50O1xuICAgICAgICBtYXJnaW4tbGVmdDogMSUgIWltcG9ydGFudDtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAxJSAhaW1wb3J0YW50O1xuICAgICAgfVxuICAgIDwvc3R5bGU+XG4gIDwvYnV0dG9uPlxuYDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7TUFBT0EsVUFBVSxHQUFBQyxlQUFBLENBQUFDLE9BQUE7SUFBQSxhQUFBQyxPQUFBO01BQ1ZDLENBQUMsR0FBQUQsT0FBQSxDQUFBRCxPQUFBO0lBQUEsYUFBQUcsZUFBQTtNQUNEQyxJQUFJLEdBQUFELGVBQUEsQ0FBQUgsT0FBQTtJQUFBLGFBQUFLLDJCQUFBO01BQ0pDLGVBQWUsR0FBQUQsMkJBQUEsQ0FBQUwsT0FBQTtJQUFBO0lBQUFPLE9BQUEsV0FBQUEsQ0FBQTtNQUFBQyxPQUFBLFFB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