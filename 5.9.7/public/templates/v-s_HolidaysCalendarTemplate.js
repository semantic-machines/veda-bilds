"use strict";

System.register(["flatpickr/flatpickr.min.js", "flatpickr/flatpickr.min.css", "flatpickr/l10n/ru.js", "adoptedStyleSheets", "/js/browser/notify.js", "/js/browser/dom_helpers.js"], function (_export, _context) {
  "use strict";

  var flatpickr, flatpickrStyles, Russian, notify, delegateHandler, pre, html;
  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
  return {
    setters: [function (_flatpickrFlatpickrMinJs) {
      flatpickr = _flatpickrFlatpickrMinJs.default;
    }, function (_flatpickrFlatpickrMinCss) {
      flatpickrStyles = _flatpickrFlatpickrMinCss.default;
    }, function (_flatpickrL10nRuJs) {
      Russian = _flatpickrL10nRuJs.Russian;
    }, function (_adoptedStyleSheets) {}, function (_jsBrowserNotifyJs) {
      notify = _jsBrowserNotifyJs.default;
    }, function (_jsBrowserDom_helpersJs) {
      delegateHandler = _jsBrowserDom_helpersJs.delegateHandler;
    }],
    execute: function () {
      document.adoptedStyleSheets = [].concat(_toConsumableArray(document.adoptedStyleSheets), [flatpickrStyles]);
      _export("pre", pre = function pre(individual, template, container, mode, extra) {
        var calendar = flatpickr(template.querySelector('#calendar'), {
          inline: true,
          locale: Russian,
          firstDayOfWeek: 1,
          mode: 'multiple',
          disable: individual.get('v-s:holiday'),
          onChange: function onChange(_, iso) {
            if (iso.length) {
              individual.set('v-s:holiday', iso.split(', ').map(function (dateStr) {
                return new Date(dateStr);
              }));
              calendar.changeMonth(new Date(individual.get('v-s:holiday').slice(-1)[0]).getMonth(), false);
            } else {
              individual.clearValue('v-s:holiday');
            }
          }
        });
        calendar.setDate(individual.get('v-s:holiday'));
        calendar.changeMonth(new Date().getMonth(), false);
        var disableDays = function disableDays(e) {
          return e.stopPropagation();
        };
        var removeHandler;
        template.addEventListener('view', function () {
          removeHandler = delegateHandler(template, 'click', '.flatpickr-day', disableDays, true);
          calendar.set('disable', individual.get('v-s:holiday'));
        });
        template.addEventListener('edit', function () {
          removeHandler();
          calendar.set('disable', []);
          calendar.setDate(individual.get('v-s:holiday'));
          calendar.changeMonth(new Date().getMonth(), false);
        });
        var redraw = function redraw(values) {
          if (template.getAttribute('mode') === 'view') calendar.set('disable', values);
          calendar.setDate(values);
        };
        individual.on('v-s:holiday', redraw);
        template.addEventListener('remove', function () {
          return individual.off('v-s:holiday', redraw);
        });
        template.querySelector('#load-from-file').addEventListener('change', function (changeEvent) {
          var fileInput = changeEvent.target;
          var file = fileInput.files[0];
          if (file) {
            var reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = function (event) {
              try {
                var json = JSON.parse(event.target.result);
                var holidays = json.holidays.map(function (dateStr) {
                  return new Date(dateStr);
                });
                individual.set('v-s:holiday', holidays);
                notify('success', {
                  name: 'Календарь загружен'
                });
              } catch (error) {
                notify('danger', error);
              }
            };
            reader.onerror = function (event) {
              notify('danger', {
                message: 'Ошибка загрузки файла'
              });
            };
          }
        });
      });
      _export("html", html = "\n  <div class=\"container sheet\">\n    <style scoped>\n      .flatpickr-disabled {\n        background-color: rgb(86, 159, 247, 0.6)!important;\n        border: 2px solid white!important;\n        color: white!important;\n      }\n      .selected {\n        border: 2px solid white!important;\n      }\n      pre {\n        border: none;\n        background-color: transparent;\n      }\n    </style>\n    <h2 about=\"@\" property=\"rdfs:label\"></h2>\n    <hr>\n    <div class=\"clearfix\">\n      <div class=\"pull-left\">\n        <div id=\"calendar\"></div>\n      </div>\n      <div class=\"pull-left margin-xl-h\">\n        <h5>\u041F\u0440\u0438\u043C\u0435\u0440 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u0433\u043E \u0444\u0430\u0439\u043B\u0430 \u0434\u043B\u044F \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0432 \u0444\u043E\u0440\u043C\u0430\u0442\u0435 JSON</h5>\n<pre>\n{\n  \"holidays\": [\n    \"2022-04-02\",\n    \"2022-04-09\",\n    \"2022-04-16\",\n    \"2022-04-23\",\n    \"2022-04-30\"\n  ]\n}</pre>\n        <a href=\"https://raw.githubusercontent.com/d10xa/holidays-calendar/master/json/calendar.json\">\u041E\u0431\u043D\u043E\u0432\u043B\u044F\u0435\u043C\u044B\u0439 \u043A\u0430\u043B\u0435\u043D\u0434\u0430\u0440\u044C \u0432 \u0441\u0435\u0442\u0438 \u0418\u043D\u0442\u0435\u0440\u043D\u0435\u0442</a>\n        <br><br>\n        <input type=\"file\" id=\"load-from-file\" class=\"-view edit\"></input>\n      </div>\n    </div>\n    <br/>\n    <div class=\"actions view edit -search\">\n      <span about=\"@\" data-template=\"v-ui:StandardButtonsTemplate\" data-embedded=\"true\" data-buttons=\"save edit cancel\"></span>\n    </div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJmbGF0cGlja3IiLCJfZmxhdHBpY2tyRmxhdHBpY2tyTWluSnMiLCJkZWZhdWx0IiwiX2ZsYXRwaWNrckZsYXRwaWNrck1pbkNzcyIsImZsYXRwaWNrclN0eWxlcyIsIl9mbGF0cGlja3JMMTBuUnVKcyIsIlJ1c3NpYW4iLCJfYWRvcHRlZFN0eWxlU2hlZXRzIiwiX2pzQnJvd3Nlck5vdGlmeUpzIiwibm90aWZ5IiwiX2pzQnJvd3NlckRvbV9oZWxwZXJzSnMiLCJkZWxlZ2F0ZUhhbmRsZXIiLCJleGVjdXRlIiwiZG9jdW1lbnQiLCJhZG9wdGVkU3R5bGVTaGVldHMiLCJjb25jYXQiLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJfZXhwb3J0IiwicHJlIiwiaW5kaXZpZHVhbCIsInRlbXBsYXRlIiwiY29udGFpbmVyIiwibW9kZSIsImV4dHJhIiwiY2FsZW5kYXIiLCJxdWVyeVNlbGVjdG9yIiwiaW5saW5lIiwibG9jYWxlIiwiZmlyc3REYXlPZldlZWsiLCJkaXNhYmxlIiwiZ2V0Iiwib25DaGFuZ2UiLCJfIiwiaXNvIiwibGVuZ3RoIiwic2V0Iiwic3BsaXQiLCJtYXAiLCJkYXRlU3RyIiwiRGF0ZSIsImNoYW5nZU1vbnRoIiwic2xpY2UiLCJnZXRNb250aCIsImNsZWFyVmFsdWUiLCJzZXREYXRlIiwiZGlzYWJsZURheXMiLCJlIiwic3RvcFByb3BhZ2F0aW9uIiwicmVtb3ZlSGFuZGxlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZWRyYXciLCJ2YWx1ZXMiLCJnZXRBdHRyaWJ1dGUiLCJvbiIsIm9mZiIsImNoYW5nZUV2ZW50IiwiZmlsZUlucHV0IiwidGFyZ2V0IiwiZmlsZSIsImZpbGVzIiwicmVhZGVyIiwiRmlsZVJlYWRlciIsInJlYWRBc1RleHQiLCJvbmxvYWQiLCJldmVudCIsImpzb24iLCJKU09OIiwicGFyc2UiLCJyZXN1bHQiLCJob2xpZGF5cyIsIm5hbWUiLCJlcnJvciIsIm9uZXJyb3IiLCJtZXNzYWdlIiwiaHRtbCJdLCJzb3VyY2VzIjpbIi4uLy4uL29udG9sb2d5L2dlbmVyaWMtYXBwbGljYXRpb24vdGVtcGxhdGVzL3Ytc19Ib2xpZGF5c0NhbGVuZGFyVGVtcGxhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZsYXRwaWNrciBmcm9tICdmbGF0cGlja3IvZmxhdHBpY2tyLm1pbi5qcyc7XG5pbXBvcnQgZmxhdHBpY2tyU3R5bGVzIGZyb20gJ2ZsYXRwaWNrci9mbGF0cGlja3IubWluLmNzcyc7XG5pbXBvcnQge1J1c3NpYW59IGZyb20gJ2ZsYXRwaWNrci9sMTBuL3J1LmpzJztcbmltcG9ydCAnYWRvcHRlZFN0eWxlU2hlZXRzJztcbmltcG9ydCBub3RpZnkgZnJvbSAnL2pzL2Jyb3dzZXIvbm90aWZ5LmpzJztcblxuaW1wb3J0IHtkZWxlZ2F0ZUhhbmRsZXJ9IGZyb20gJy9qcy9icm93c2VyL2RvbV9oZWxwZXJzLmpzJztcblxuZG9jdW1lbnQuYWRvcHRlZFN0eWxlU2hlZXRzID0gWy4uLmRvY3VtZW50LmFkb3B0ZWRTdHlsZVNoZWV0cywgZmxhdHBpY2tyU3R5bGVzXTtcblxuZXhwb3J0IGNvbnN0IHByZSA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICBjb25zdCBjYWxlbmRhciA9IGZsYXRwaWNrcih0ZW1wbGF0ZS5xdWVyeVNlbGVjdG9yKCcjY2FsZW5kYXInKSwge1xuICAgIGlubGluZTogdHJ1ZSxcbiAgICBsb2NhbGU6IFJ1c3NpYW4sXG4gICAgZmlyc3REYXlPZldlZWs6IDEsXG4gICAgbW9kZTogJ211bHRpcGxlJyxcbiAgICBkaXNhYmxlOiBpbmRpdmlkdWFsLmdldCgndi1zOmhvbGlkYXknKSxcbiAgICBvbkNoYW5nZTogKF8sIGlzbykgPT4ge1xuICAgICAgaWYgKGlzby5sZW5ndGgpIHtcbiAgICAgICAgaW5kaXZpZHVhbC5zZXQoJ3Ytczpob2xpZGF5JywgaXNvLnNwbGl0KCcsICcpLm1hcCgoZGF0ZVN0cikgPT4gbmV3IERhdGUoZGF0ZVN0cikpKTtcbiAgICAgICAgY2FsZW5kYXIuY2hhbmdlTW9udGgobmV3IERhdGUoaW5kaXZpZHVhbC5nZXQoJ3Ytczpob2xpZGF5Jykuc2xpY2UoLTEpWzBdKS5nZXRNb250aCgpLCBmYWxzZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbmRpdmlkdWFsLmNsZWFyVmFsdWUoJ3Ytczpob2xpZGF5Jyk7XG4gICAgICB9XG4gICAgfSxcbiAgfSk7XG4gIGNhbGVuZGFyLnNldERhdGUoaW5kaXZpZHVhbC5nZXQoJ3Ytczpob2xpZGF5JykpO1xuICBjYWxlbmRhci5jaGFuZ2VNb250aChuZXcgRGF0ZSgpLmdldE1vbnRoKCksIGZhbHNlKTtcblxuICBjb25zdCBkaXNhYmxlRGF5cyA9IChlKSA9PiBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICBsZXQgcmVtb3ZlSGFuZGxlcjtcbiAgdGVtcGxhdGUuYWRkRXZlbnRMaXN0ZW5lcigndmlldycsICgpID0+IHtcbiAgICByZW1vdmVIYW5kbGVyID0gZGVsZWdhdGVIYW5kbGVyKHRlbXBsYXRlLCAnY2xpY2snLCAnLmZsYXRwaWNrci1kYXknLCBkaXNhYmxlRGF5cywgdHJ1ZSk7XG4gICAgY2FsZW5kYXIuc2V0KCdkaXNhYmxlJywgaW5kaXZpZHVhbC5nZXQoJ3Ytczpob2xpZGF5JykpO1xuICB9KTtcbiAgdGVtcGxhdGUuYWRkRXZlbnRMaXN0ZW5lcignZWRpdCcsICgpID0+IHtcbiAgICByZW1vdmVIYW5kbGVyKCk7XG4gICAgY2FsZW5kYXIuc2V0KCdkaXNhYmxlJywgW10pO1xuICAgIGNhbGVuZGFyLnNldERhdGUoaW5kaXZpZHVhbC5nZXQoJ3Ytczpob2xpZGF5JykpO1xuICAgIGNhbGVuZGFyLmNoYW5nZU1vbnRoKG5ldyBEYXRlKCkuZ2V0TW9udGgoKSwgZmFsc2UpO1xuICB9KTtcblxuICBjb25zdCByZWRyYXcgPSAodmFsdWVzKSA9PiB7XG4gICAgaWYgKHRlbXBsYXRlLmdldEF0dHJpYnV0ZSgnbW9kZScpID09PSAndmlldycpIGNhbGVuZGFyLnNldCgnZGlzYWJsZScsIHZhbHVlcyk7XG4gICAgY2FsZW5kYXIuc2V0RGF0ZSh2YWx1ZXMpO1xuICB9O1xuICBpbmRpdmlkdWFsLm9uKCd2LXM6aG9saWRheScsIHJlZHJhdyk7XG4gIHRlbXBsYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ3JlbW92ZScsICgpID0+IGluZGl2aWR1YWwub2ZmKCd2LXM6aG9saWRheScsIHJlZHJhdykpO1xuXG4gIHRlbXBsYXRlLnF1ZXJ5U2VsZWN0b3IoJyNsb2FkLWZyb20tZmlsZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChjaGFuZ2VFdmVudCkgPT4ge1xuICAgIGNvbnN0IGZpbGVJbnB1dCA9IGNoYW5nZUV2ZW50LnRhcmdldDtcbiAgICBjb25zdCBmaWxlID0gZmlsZUlucHV0LmZpbGVzWzBdO1xuICAgIGlmIChmaWxlKSB7XG4gICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgcmVhZGVyLnJlYWRBc1RleHQoZmlsZSwgXCJVVEYtOFwiKTtcbiAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBqc29uID0gSlNPTi5wYXJzZShldmVudC50YXJnZXQucmVzdWx0KTtcbiAgICAgICAgICBjb25zdCBob2xpZGF5cyA9IGpzb24uaG9saWRheXMubWFwKChkYXRlU3RyKSA9PiBuZXcgRGF0ZShkYXRlU3RyKSk7XG4gICAgICAgICAgaW5kaXZpZHVhbC5zZXQoJ3Ytczpob2xpZGF5JywgaG9saWRheXMpO1xuICAgICAgICAgIG5vdGlmeSgnc3VjY2VzcycsIHtuYW1lOiAn0JrQsNC70LXQvdC00LDRgNGMINC30LDQs9GA0YPQttC10L0nfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgbm90aWZ5KCdkYW5nZXInLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZWFkZXIub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBub3RpZnkoJ2RhbmdlcicsIHttZXNzYWdlOiAn0J7RiNC40LHQutCwINC30LDQs9GA0YPQt9C60Lgg0YTQsNC50LvQsCd9KTtcbiAgICAgIH07XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBodG1sID0gYFxuICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyIHNoZWV0XCI+XG4gICAgPHN0eWxlIHNjb3BlZD5cbiAgICAgIC5mbGF0cGlja3ItZGlzYWJsZWQge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoODYsIDE1OSwgMjQ3LCAwLjYpIWltcG9ydGFudDtcbiAgICAgICAgYm9yZGVyOiAycHggc29saWQgd2hpdGUhaW1wb3J0YW50O1xuICAgICAgICBjb2xvcjogd2hpdGUhaW1wb3J0YW50O1xuICAgICAgfVxuICAgICAgLnNlbGVjdGVkIHtcbiAgICAgICAgYm9yZGVyOiAycHggc29saWQgd2hpdGUhaW1wb3J0YW50O1xuICAgICAgfVxuICAgICAgcHJlIHtcbiAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgIH1cbiAgICA8L3N0eWxlPlxuICAgIDxoMiBhYm91dD1cIkBcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L2gyPlxuICAgIDxocj5cbiAgICA8ZGl2IGNsYXNzPVwiY2xlYXJmaXhcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJwdWxsLWxlZnRcIj5cbiAgICAgICAgPGRpdiBpZD1cImNhbGVuZGFyXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJwdWxsLWxlZnQgbWFyZ2luLXhsLWhcIj5cbiAgICAgICAgPGg1PtCf0YDQuNC80LXRgCDRgdC+0LTQtdGA0LbQuNC80L7Qs9C+INGE0LDQudC70LAg0LTQu9GPINC30LDQs9GA0YPQt9C60Lgg0LIg0YTQvtGA0LzQsNGC0LUgSlNPTjwvaDU+XG48cHJlPlxue1xuICBcImhvbGlkYXlzXCI6IFtcbiAgICBcIjIwMjItMDQtMDJcIixcbiAgICBcIjIwMjItMDQtMDlcIixcbiAgICBcIjIwMjItMDQtMTZcIixcbiAgICBcIjIwMjItMDQtMjNcIixcbiAgICBcIjIwMjItMDQtMzBcIlxuICBdXG59PC9wcmU+XG4gICAgICAgIDxhIGhyZWY9XCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vZDEweGEvaG9saWRheXMtY2FsZW5kYXIvbWFzdGVyL2pzb24vY2FsZW5kYXIuanNvblwiPtCe0LHQvdC+0LLQu9GP0LXQvNGL0Lkg0LrQsNC70LXQvdC00LDRgNGMINCyINGB0LXRgtC4INCY0L3RgtC10YDQvdC10YI8L2E+XG4gICAgICAgIDxicj48YnI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwiZmlsZVwiIGlkPVwibG9hZC1mcm9tLWZpbGVcIiBjbGFzcz1cIi12aWV3IGVkaXRcIj48L2lucHV0PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGJyLz5cbiAgICA8ZGl2IGNsYXNzPVwiYWN0aW9ucyB2aWV3IGVkaXQgLXNlYXJjaFwiPlxuICAgICAgPHNwYW4gYWJvdXQ9XCJAXCIgZGF0YS10ZW1wbGF0ZT1cInYtdWk6U3RhbmRhcmRCdXR0b25zVGVtcGxhdGVcIiBkYXRhLWVtYmVkZGVkPVwidHJ1ZVwiIGRhdGEtYnV0dG9ucz1cInNhdmUgZWRpdCBjYW5jZWxcIj48L3NwYW4+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuYDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7TUFBT0EsU0FBUyxHQUFBQyx3QkFBQSxDQUFBQyxPQUFBO0lBQUEsYUFBQUMseUJBQUE7TUFDVEMsZUFBZSxHQUFBRCx5QkFBQSxDQUFBRCxPQUFBO0lBQUEsYUFBQUcsa0JBQUE7TUFDZEMsT0FBTyxHQUFBRCxrQkFBQSxDQUFQQyxPQUFPO0lBQUEsYUFBQUMsbUJBQUEsZ0JBQUFDLGtCQUFBO01BRVJDLE1BQU0sR0FBQUQsa0JBQUEsQ0FBQU4sT0FBQTtJQUFBLGFBQUFRLHVCQUFBO01B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