"use strict";

System.register(["jquery", "/js/common/individual_model.js", "/js/browser/notify.js", "/js/browser/dom_helpers.js", "/js/common/lib/riot.js"], function (_export, _context) {
  "use strict";

  var $, IndividualModel, notify, sanitize, riot, post, html;
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_jsCommonIndividual_modelJs) {
      IndividualModel = _jsCommonIndividual_modelJs.default;
    }, function (_jsBrowserNotifyJs) {
      notify = _jsBrowserNotifyJs.default;
    }, function (_jsBrowserDom_helpersJs) {
      sanitize = _jsBrowserDom_helpersJs.sanitize;
    }, function (_jsCommonLibRiotJs) {
      riot = _jsCommonLibRiotJs.default;
    }],
    execute: function () {
      _export("post", post = function post(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        var pre = $('pre', template);
        var textarea = $('textarea', template);
        var json = individual.properties;
        var formatted = format(json);
        var anchorized = anchorize(formatted);
        var height = 600;
        pre.css('height', height);
        pre.html(anchorized);
        textarea.val(formatted);
        textarea.css('min-height', height);
        var original = individual.properties;
        var validationState = true;
        textarea.on('change', function () {
          try {
            formatted = textarea.val();
            json = JSON.parse(formatted);
            if (validationState === false) {
              notify('success', {
                name: 'JSON ok'
              });
            }
            template[0].dispatchEvent(new CustomEvent('internal-validated', {
              detail: {
                state: true
              }
            }));
            validationState = true;
          } catch (error) {
            formatted = format(original);
            json = JSON.parse(formatted);
            if (validationState === true) {
              notify('danger', {
                name: 'JSON error'
              });
            }
            template[0].dispatchEvent(new CustomEvent('internal-validated', {
              detail: {
                state: false
              }
            }));
            validationState = false;
          }
          anchorized = anchorize(formatted);
          pre.html(anchorized);
          if (individual.properties['@'] !== json['@']) {
            var newIndividual = new IndividualModel(json);
            newIndividual.isSync(false);
            riot.route(['#', newIndividual.id, '#main', 'v-ui:json', 'edit'].join('/'));
          } else {
            individual.properties = json;
            individual.isSync(false);
          }
        });

        // Mark not sync to force update on save
        template.on('edit', function () {
          individual.isSync(false);
        });
        individual.on('afterReset', resetView);
        template.one('remove', function () {
          individual.off('afterReset', resetView);
        });
        function resetView() {
          var formatted = format(individual.properties);
          var anchorized = anchorize(formatted);
          pre.html(anchorized);
          textarea.val(formatted);
        }
        function format(json) {
          var ordered = {};
          Object.keys(json).sort().forEach(function (key) {
            ordered[key] = json[key];
          });
          return JSON.stringify(ordered, null, 2);
        }
        function anchorize(string) {
          var sanitized = sanitize(string);
          var anchorized = sanitized.replace(/(&quot;)([a-zA-Z][\w-]*:[\w-]*)(&quot;)/gi, "$1<a class='text-black' href='#/$2//v-ui:json'>$2</a>$3");
          return anchorized;
        }
      });
      _export("html", html = "\n  <div class=\"container sheet\">\n    <pre class=\"view -edit -search\" style=\"border:none;background-color:#fff;\"></pre>\n    <textarea class=\"form-control -view edit search\" style='font-family:Menlo,Monaco,Consolas,\"Courier New\",monospace;font-size:13px;color:black;'></textarea>\n    <br />\n    <div class=\"pull-right\">\n      <a id=\"default\" class=\"btn btn-info\" href=\"#/@\" about=\"v-s:Default\" property=\"rdfs:label\"></a>\n      <a id=\"generic\" class=\"btn btn-default\" href=\"#/@//v-ui:generic\">generic</a>\n      <a id=\"json\" class=\"disabled btn btn-default\" href=\"#/@//v-ui:json\">json</a>\n      <a id=\"ttl\" class=\"btn btn-default\" href=\"#/@//v-ui:ttl\">ttl</a>\n    </div>\n    <div class=\"actions pull-left\">\n      <span\n        about=\"@\"\n        data-template=\"v-ui:StandardButtonsTemplate\"\n        data-embedded=\"true\"\n        data-buttons=\"edit save cancel delete destroy journal task rights\"></span>\n    </div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfanNDb21tb25JbmRpdmlkdWFsX21vZGVsSnMiLCJJbmRpdmlkdWFsTW9kZWwiLCJfanNCcm93c2VyTm90aWZ5SnMiLCJub3RpZnkiLCJfanNCcm93c2VyRG9tX2hlbHBlcnNKcyIsInNhbml0aXplIiwiX2pzQ29tbW9uTGliUmlvdEpzIiwicmlvdCIsImV4ZWN1dGUiLCJfZXhwb3J0IiwicG9zdCIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsInByZSIsInRleHRhcmVhIiwianNvbiIsInByb3BlcnRpZXMiLCJmb3JtYXR0ZWQiLCJmb3JtYXQiLCJhbmNob3JpemVkIiwiYW5jaG9yaXplIiwiaGVpZ2h0IiwiY3NzIiwiaHRtbCIsInZhbCIsIm9yaWdpbmFsIiwidmFsaWRhdGlvblN0YXRlIiwib24iLCJKU09OIiwicGFyc2UiLCJuYW1lIiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50IiwiZGV0YWlsIiwic3RhdGUiLCJlcnJvciIsIm5ld0luZGl2aWR1YWwiLCJpc1N5bmMiLCJyb3V0ZSIsImlkIiwiam9pbiIsInJlc2V0VmlldyIsIm9uZSIsIm9mZiIsIm9yZGVyZWQiLCJPYmplY3QiLCJrZXlzIiwic29ydCIsImZvckVhY2giLCJrZXkiLCJzdHJpbmdpZnkiLCJzdHJpbmciLCJzYW5pdGl6ZWQiLCJyZXBsYWNlIl0sInNvdXJjZXMiOlsiLi4vLi4vb250b2xvZ3kvc3lzdGVtLWNvcmUvdGVtcGxhdGVzL3YtdWlfanNvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IEluZGl2aWR1YWxNb2RlbCBmcm9tICcvanMvY29tbW9uL2luZGl2aWR1YWxfbW9kZWwuanMnO1xuaW1wb3J0IG5vdGlmeSBmcm9tICcvanMvYnJvd3Nlci9ub3RpZnkuanMnO1xuaW1wb3J0IHtzYW5pdGl6ZX0gZnJvbSAnL2pzL2Jyb3dzZXIvZG9tX2hlbHBlcnMuanMnO1xuaW1wb3J0IHJpb3QgZnJvbSAnL2pzL2NvbW1vbi9saWIvcmlvdC5qcyc7XG5cbmV4cG9ydCBjb25zdCBwb3N0ID0gZnVuY3Rpb24gKGluZGl2aWR1YWwsIHRlbXBsYXRlLCBjb250YWluZXIsIG1vZGUsIGV4dHJhKSB7XG4gIHRlbXBsYXRlID0gJCh0ZW1wbGF0ZSk7XG4gIGNvbnRhaW5lciA9ICQoY29udGFpbmVyKTtcblxuICBjb25zdCBwcmUgPSAkKCdwcmUnLCB0ZW1wbGF0ZSk7XG4gIGNvbnN0IHRleHRhcmVhID0gJCgndGV4dGFyZWEnLCB0ZW1wbGF0ZSk7XG4gIGxldCBqc29uID0gaW5kaXZpZHVhbC5wcm9wZXJ0aWVzO1xuICBsZXQgZm9ybWF0dGVkID0gZm9ybWF0KGpzb24pO1xuICBsZXQgYW5jaG9yaXplZCA9IGFuY2hvcml6ZShmb3JtYXR0ZWQpO1xuICBjb25zdCBoZWlnaHQgPSA2MDA7XG4gIHByZS5jc3MoJ2hlaWdodCcsIGhlaWdodCk7XG4gIHByZS5odG1sKGFuY2hvcml6ZWQpO1xuICB0ZXh0YXJlYS52YWwoZm9ybWF0dGVkKTtcbiAgdGV4dGFyZWEuY3NzKCdtaW4taGVpZ2h0JywgaGVpZ2h0KTtcbiAgY29uc3Qgb3JpZ2luYWwgPSBpbmRpdmlkdWFsLnByb3BlcnRpZXM7XG4gIGxldCB2YWxpZGF0aW9uU3RhdGUgPSB0cnVlO1xuICB0ZXh0YXJlYS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICBmb3JtYXR0ZWQgPSB0ZXh0YXJlYS52YWwoKTtcbiAgICAgIGpzb24gPSBKU09OLnBhcnNlKGZvcm1hdHRlZCk7XG4gICAgICBpZiAodmFsaWRhdGlvblN0YXRlID09PSBmYWxzZSkge1xuICAgICAgICBub3RpZnkoJ3N1Y2Nlc3MnLCB7bmFtZTogJ0pTT04gb2snfSk7XG4gICAgICB9XG4gICAgICB0ZW1wbGF0ZVswXS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaW50ZXJuYWwtdmFsaWRhdGVkJywge2RldGFpbDoge3N0YXRlOiB0cnVlfX0pKTtcbiAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHRydWU7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGZvcm1hdHRlZCA9IGZvcm1hdChvcmlnaW5hbCk7XG4gICAgICBqc29uID0gSlNPTi5wYXJzZShmb3JtYXR0ZWQpO1xuICAgICAgaWYgKHZhbGlkYXRpb25TdGF0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBub3RpZnkoJ2RhbmdlcicsIHtuYW1lOiAnSlNPTiBlcnJvcid9KTtcbiAgICAgIH1cbiAgICAgIHRlbXBsYXRlWzBdLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdpbnRlcm5hbC12YWxpZGF0ZWQnLCB7ZGV0YWlsOiB7c3RhdGU6IGZhbHNlfX0pKTtcbiAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IGZhbHNlO1xuICAgIH1cbiAgICBhbmNob3JpemVkID0gYW5jaG9yaXplKGZvcm1hdHRlZCk7XG4gICAgcHJlLmh0bWwoYW5jaG9yaXplZCk7XG4gICAgaWYgKGluZGl2aWR1YWwucHJvcGVydGllc1snQCddICE9PSBqc29uWydAJ10pIHtcbiAgICAgIGNvbnN0IG5ld0luZGl2aWR1YWwgPSBuZXcgSW5kaXZpZHVhbE1vZGVsKGpzb24pO1xuICAgICAgbmV3SW5kaXZpZHVhbC5pc1N5bmMoZmFsc2UpO1xuICAgICAgcmlvdC5yb3V0ZShbJyMnLCBuZXdJbmRpdmlkdWFsLmlkLCAnI21haW4nLCAndi11aTpqc29uJywgJ2VkaXQnXS5qb2luKCcvJykpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbmRpdmlkdWFsLnByb3BlcnRpZXMgPSBqc29uO1xuICAgICAgaW5kaXZpZHVhbC5pc1N5bmMoZmFsc2UpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gTWFyayBub3Qgc3luYyB0byBmb3JjZSB1cGRhdGUgb24gc2F2ZVxuICB0ZW1wbGF0ZS5vbignZWRpdCcsIGZ1bmN0aW9uICgpIHtcbiAgICBpbmRpdmlkdWFsLmlzU3luYyhmYWxzZSk7XG4gIH0pO1xuXG4gIGluZGl2aWR1YWwub24oJ2FmdGVyUmVzZXQnLCByZXNldFZpZXcpO1xuICB0ZW1wbGF0ZS5vbmUoJ3JlbW92ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBpbmRpdmlkdWFsLm9mZignYWZ0ZXJSZXNldCcsIHJlc2V0Vmlldyk7XG4gIH0pO1xuICBmdW5jdGlvbiByZXNldFZpZXcgKCkge1xuICAgIGNvbnN0IGZvcm1hdHRlZCA9IGZvcm1hdChpbmRpdmlkdWFsLnByb3BlcnRpZXMpO1xuICAgIGNvbnN0IGFuY2hvcml6ZWQgPSBhbmNob3JpemUoZm9ybWF0dGVkKTtcbiAgICBwcmUuaHRtbChhbmNob3JpemVkKTtcbiAgICB0ZXh0YXJlYS52YWwoZm9ybWF0dGVkKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdCAoanNvbikge1xuICAgIGNvbnN0IG9yZGVyZWQgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhqc29uKVxuICAgICAgLnNvcnQoKVxuICAgICAgLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBvcmRlcmVkW2tleV0gPSBqc29uW2tleV07XG4gICAgICB9KTtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob3JkZXJlZCwgbnVsbCwgMik7XG4gIH1cblxuICBmdW5jdGlvbiBhbmNob3JpemUgKHN0cmluZykge1xuICAgIGNvbnN0IHNhbml0aXplZCA9IHNhbml0aXplKHN0cmluZyk7XG4gICAgY29uc3QgYW5jaG9yaXplZCA9IHNhbml0aXplZC5yZXBsYWNlKC8oJnF1b3Q7KShbYS16QS1aXVtcXHctXSo6W1xcdy1dKikoJnF1b3Q7KS9naSwgXCIkMTxhIGNsYXNzPSd0ZXh0LWJsYWNrJyBocmVmPScjLyQyLy92LXVpOmpzb24nPiQyPC9hPiQzXCIpO1xuICAgIHJldHVybiBhbmNob3JpemVkO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaHRtbCA9IGBcbiAgPGRpdiBjbGFzcz1cImNvbnRhaW5lciBzaGVldFwiPlxuICAgIDxwcmUgY2xhc3M9XCJ2aWV3IC1lZGl0IC1zZWFyY2hcIiBzdHlsZT1cImJvcmRlcjpub25lO2JhY2tncm91bmQtY29sb3I6I2ZmZjtcIj48L3ByZT5cbiAgICA8dGV4dGFyZWEgY2xhc3M9XCJmb3JtLWNvbnRyb2wgLXZpZXcgZWRpdCBzZWFyY2hcIiBzdHlsZT0nZm9udC1mYW1pbHk6TWVubG8sTW9uYWNvLENvbnNvbGFzLFwiQ291cmllciBOZXdcIixtb25vc3BhY2U7Zm9udC1zaXplOjEzcHg7Y29sb3I6YmxhY2s7Jz48L3RleHRhcmVhPlxuICAgIDxiciAvPlxuICAgIDxkaXYgY2xhc3M9XCJwdWxsLXJpZ2h0XCI+XG4gICAgICA8YSBpZD1cImRlZmF1bHRcIiBjbGFzcz1cImJ0biBidG4taW5mb1wiIGhyZWY9XCIjL0BcIiBhYm91dD1cInYtczpEZWZhdWx0XCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9hPlxuICAgICAgPGEgaWQ9XCJnZW5lcmljXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBocmVmPVwiIy9ALy92LXVpOmdlbmVyaWNcIj5nZW5lcmljPC9hPlxuICAgICAgPGEgaWQ9XCJqc29uXCIgY2xhc3M9XCJkaXNhYmxlZCBidG4gYnRuLWRlZmF1bHRcIiBocmVmPVwiIy9ALy92LXVpOmpzb25cIj5qc29uPC9hPlxuICAgICAgPGEgaWQ9XCJ0dGxcIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIGhyZWY9XCIjL0AvL3YtdWk6dHRsXCI+dHRsPC9hPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJhY3Rpb25zIHB1bGwtbGVmdFwiPlxuICAgICAgPHNwYW5cbiAgICAgICAgYWJvdXQ9XCJAXCJcbiAgICAgICAgZGF0YS10ZW1wbGF0ZT1cInYtdWk6U3RhbmRhcmRCdXR0b25zVGVtcGxhdGVcIlxuICAgICAgICBkYXRhLWVtYmVkZGVkPVwidHJ1ZVwiXG4gICAgICAgIGRhdGEtYnV0dG9ucz1cImVkaXQgc2F2ZSBjYW5jZWwgZGVsZXRlIGRlc3Ryb3kgam91cm5hbCB0YXNrIHJpZ2h0c1wiPjwv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