"use strict";

System.register(["/js/browser/util.js", "/js/common/util.js", "jquery", "/js/browser/notify.js"], function (_export, _context) {
  "use strict";

  var BrowserUtil, CommonUtil, $, notify, post, html;
  return {
    setters: [function (_jsBrowserUtilJs) {
      BrowserUtil = _jsBrowserUtilJs.default;
    }, function (_jsCommonUtilJs) {
      CommonUtil = _jsCommonUtilJs.default;
    }, function (_jquery) {
      $ = _jquery.default;
    }, function (_jsBrowserNotifyJs) {
      notify = _jsBrowserNotifyJs.default;
    }],
    execute: function () {
      _export("post", post = function post(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);

        // Append additional actions
        var additionalActions = $('.additional-actions', template);
        var searchActions = $('.search-actions', template);
        if (searchActions.length) {
          additionalActions.appendTo(searchActions);
        } else {
          additionalActions.remove();
        }

        // Export table to 'blob' or 'xls'
        var exportTable = function () {
          var template = "\n      <html xmlns:o=\"urn:schemas-microsoft-com:office:office\" xmlns:x=\"urn:schemas-microsoft-com:office:excel\" xmlns=\"https://www.w3.org/TR/REC-html40\">\n        <head>\n          <!--[if gte mso 9]>\n            <xml>\n              <x:ExcelWorkbook>\n                <x:ExcelWorksheets>\n                  <x:ExcelWorksheet>\n                    <x:Name>{worksheet}</x:Name>\n                    <x:WorksheetOptions>\n                      <x:DisplayGridlines/>\n                    </x:WorksheetOptions>\n                  </x:ExcelWorksheet>\n                </x:ExcelWorksheets>\n              </x:ExcelWorkbook>\n            </xml>\n          <![endif]-->\n          <meta http-equiv=\"content-type\" content=\"application/vnd.ms-excel; charset=UTF-8\"/>\n          <style>\n            td.text { mso-number-format:\"@\"; }\n            td.number { mso-number-format:General; }\n            td.date { mso-number-format:\"Short Date\"; }\n          </style>\n        </head>\n        <body>\n          <table border=\"1\" cellspacing=\"0\" bordercolor=\"#eee\">{table}</table>\n        </body>\n      </html>\n    ";
          var format = function format(s, c) {
            return s.replace(/{([a-z]+)}/g, function (m, p) {
              return c[p];
            });
          };
          return function (table, name, exportAs) {
            if (!table.nodeType) table = document.getElementById(table);
            var ctx = {
              worksheet: name || 'Worksheet',
              table: table.innerHTML
            };
            if (exportAs === 'xls') {
              // Tags
              var tags = /<\/?(a|span|p|div|button) ?.*?>/gi;
              // Numbers with decimal point
              var decimal = /([^\d\.\:]+\d+)\.(\d+[^\d\.\:]+)/gi;
              ctx.table = ctx.table.replace(tags, ' '); //.replace(decimal, '$1,$2');
            }

            var formatted = format(template, ctx);
            var blob = new Blob([formatted], {
              type: 'application/vnd.ms-excel;charset=utf-8'
            });
            if (exportAs === 'blob') {
              return blob;
            } else if (exportAs === 'xls') {
              _context.import('filesaver').then(function (module) {
                var saveAs = module.default;
                saveAs(blob, name + '.xls');
              });
            }
          };
        }();
        $('.xls', template).click(function (e) {
          e.preventDefault();
          var resultTable = $('.search-result table').clone();
          resultTable.find('.hidden').remove();
          resultTable = resultTable.get(0);
          exportTable(resultTable, individual['rdfs:label'].map(CommonUtil.formatValue).join(' '), 'xls');
        });
        $('.files', template).click(function (e) {
          var btn = $(this);
          toggleSpin(btn);
          e.preventDefault();
          var resultTable = $('.search-result table').clone();
          resultTable.find('.hidden').remove();
          var filesEls = $("[typeof='v-s:File']", resultTable);
          var B_in_GB = 1024 * 1024 * 1024;
          // file size in B
          var sumSize = 0;
          filesEls.each(function () {
            // must already loaded
            var fileIndivid = new veda.IndividualModel($(this).attr('resource'));
            sumSize += +fileIndivid['v-s:fileSize'][0];
          });
          if (sumSize > 1 * B_in_GB) {
            var sizeGB = sumSize / B_in_GB;
            sizeGB = Math.round(sizeGB * 100) / 100;
            alert('Выгрузка файлов отменена: размер сформированного архива - ' + sizeGB + 'ГБ , превысил  1ГБ , уменьшите выборку.');
            toggleSpin(btn);
            return;
          }
          var filesPromises = [];
          filesEls.each(function () {
            var link = $('a', this);
            var fileName = link.text().trim();
            var fileUrl = link.attr('href');
            filesPromises.push(filePromise(fileUrl, fileName));
          });
          if (filesPromises.length == 0) {
            toggleSpin(btn);
            return;
          }
          return Promise.all(filesPromises).then(function (files) {
            return _context.import('jszip').then(function (module) {
              var JSZip = module.default;
              var zip = new JSZip();
              var folder = zip.folder('files');
              var unique = {};
              files.forEach(function (file) {
                var name = file.name;
                var i = 1;
                while (unique[name]) {
                  name = file.name.replace(/(.*?).([^.]*)$/, '$1 (' + i + ').$2');
                  if (name === file.name) {
                    name = file.name + ' (' + i + ')';
                  }
                  i++;
                }
                file.name = name;
                unique[file.name] = true;
                $('[href=' + BrowserUtil.escape4$(file.url) + ']', resultTable).attr('href', '/files/' + file.name).text(file.name);
                folder.file(file.name, file);
              });
              var registry = exportTable(resultTable.get(0), individual['rdfs:label'].map(CommonUtil.formatValue).join(' '), 'blob');
              zip.file('registry.html', registry);
              return zip.generateAsync({
                type: 'blob'
              }).then(function (content) {
                return _context.import('filesaver').then(function (module) {
                  var saveAs = module.default;
                  saveAs(content, 'registry.zip');
                });
              });
            });
          }).catch(function (error) {
            notify('danger', {
              message: 'Ошибка выгрузки реестра. Обратитесь в поддержку.'
            });
          }).then(function () {
            toggleSpin(btn);
          });
        });
        function filePromise(url, name) {
          return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url + '?' + Date.now(), true);
            xhr.responseType = 'blob';
            xhr.onload = function (e) {
              if (this.status == 200) {
                var file = new Blob([this.response], {
                  type: 'application/octet-stream'
                });
                file.name = name;
                file.url = url;
                resolve(file);
              } else {
                reject(xhr.statusText);
              }
            };
            xhr.onerror = function () {
              reject(xhr.statusText);
            };
            xhr.send();
          });
        }

        // Spinner
        function toggleSpin(el) {
          var $el = $(el);
          var hasSpinner = $el.children('.fa-spinner');
          if (hasSpinner.length) {
            $el.removeClass('disabled');
            hasSpinner.remove();
          } else {
            $el.addClass('disabled');
            $("<i class='fa fa-spinner fa-pulse fa-lg fa-fw'></i>").appendTo(el);
          }
        }
      });
      _export("html", html = "\n  <div class=\"container sheet\">\n    <style>\n      td.number {\n        mso-number-format: General;\n      }\n      td.date {\n        mso-number-format: 'Short Date';\n      }\n      td.text {\n        mso-number-format: '@';\n      }\n    </style>\n    <div about=\"@\" data-template=\"v-fs:AttributiveSearchInlineTemplate\"></div>\n    <span class=\"additional-actions\">\n      <button class=\"btn btn-default xls\"><span about=\"v-fs:Excel\" property=\"rdfs:label\"></span></button>\n      <button class=\"btn btn-default files\"><span about=\"v-fs:FilesRegistry\" property=\"rdfs:label\"></span></button>\n      <span class=\"text-muted padding-lg\" about=\"v-fs:CtrlEnterBundle\" property=\"rdfs:label\"></span>\n    </span>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJCcm93c2VyVXRpbCIsIl9qc0Jyb3dzZXJVdGlsSnMiLCJkZWZhdWx0IiwiX2pzQ29tbW9uVXRpbEpzIiwiQ29tbW9uVXRpbCIsIl9qcXVlcnkiLCIkIiwiX2pzQnJvd3Nlck5vdGlmeUpzIiwibm90aWZ5IiwiZXhlY3V0ZSIsIl9leHBvcnQiLCJwb3N0IiwiaW5kaXZpZHVhbCIsInRlbXBsYXRlIiwiY29udGFpbmVyIiwibW9kZSIsImV4dHJhIiwiYWRkaXRpb25hbEFjdGlvbnMiLCJzZWFyY2hBY3Rpb25zIiwibGVuZ3RoIiwiYXBwZW5kVG8iLCJyZW1vdmUiLCJleHBvcnRUYWJsZSIsImZvcm1hdCIsInMiLCJjIiwicmVwbGFjZSIsIm0iLCJwIiwidGFibGUiLCJuYW1lIiwiZXhwb3J0QXMiLCJub2RlVHlwZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjdHgiLCJ3b3Jrc2hlZXQiLCJpbm5lckhUTUwiLCJ0YWdzIiwiZGVjaW1hbCIsImZvcm1hdHRlZCIsImJsb2IiLCJCbG9iIiwidHlwZSIsIl9jb250ZXh0IiwiaW1wb3J0IiwidGhlbiIsIm1vZHVsZSIsInNhdmVBcyIsImNsaWNrIiwiZSIsInByZXZlbnREZWZhdWx0IiwicmVzdWx0VGFibGUiLCJjbG9uZSIsImZpbmQiLCJnZXQiLCJtYXAiLCJmb3JtYXRWYWx1ZSIsImpvaW4iLCJidG4iLCJ0b2dnbGVTcGluIiwiZmlsZXNFbHMiLCJCX2luX0dCIiwic3VtU2l6ZSIsImVhY2giLCJmaWxlSW5kaXZpZCIsInZlZGEiLCJJbmRpdmlkdWFsTW9kZWwiLCJhdHRyIiwic2l6ZUdCIiwiTWF0aCIsInJvdW5kIiwiYWxlcnQiLCJmaWxlc1Byb21pc2VzIiwibGluayIsImZpbGVOYW1lIiwidGV4dCIsInRyaW0iLCJmaWxlVXJsIiwicHVzaCIsImZpbGVQcm9taXNlIiwiUHJvbWlzZSIsImFsbCIsImZpbGVzIiwiSlNaaXAiLCJ6aXAiLCJmb2xkZXIiLCJ1bmlxdWUiLCJmb3JFYWNoIiwiZmlsZSIsImkiLCJlc2NhcGU0JCIsInVybCIsInJlZ2lzdHJ5IiwiZ2VuZXJhdGVBc3luYyIsImNvbnRlbnQiLCJjYXRjaCIsImVycm9yIiwibWVzc2FnZSIsInJlc29sdmUiLCJyZWplY3QiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJEYXRlIiwibm93IiwicmVzcG9uc2VUeXBlIiwib25sb2FkIiwic3RhdHVzIiwicmVzcG9uc2UiLCJzdGF0dXNUZXh0Iiwib25lcnJvciIsInNlbmQiLCJlbCIsIiRlbCIsImhhc1NwaW5uZXIiLCJjaGlsZHJlbiIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJodG1sIl0sInNvdXJjZXMiOlsiLi4vLi4vb250b2xvZ3kvZ2VuZXJpYy1mdW5jdGlvbi90ZW1wbGF0ZXMvdi1mc19BdHRyaWJ1dGl2ZVNlYXJjaFRlbXBsYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCcm93c2VyVXRpbCBmcm9tICcvanMvYnJvd3Nlci91dGlsLmpzJztcbmltcG9ydCBDb21tb25VdGlsIGZyb20gJy9qcy9jb21tb24vdXRpbC5qcyc7XG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IG5vdGlmeSBmcm9tICcvanMvYnJvd3Nlci9ub3RpZnkuanMnO1xuXG5leHBvcnQgY29uc3QgcG9zdCA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgLy8gQXBwZW5kIGFkZGl0aW9uYWwgYWN0aW9uc1xuICBjb25zdCBhZGRpdGlvbmFsQWN0aW9ucyA9ICQoJy5hZGRpdGlvbmFsLWFjdGlvbnMnLCB0ZW1wbGF0ZSk7XG4gIGNvbnN0IHNlYXJjaEFjdGlvbnMgPSAkKCcuc2VhcmNoLWFjdGlvbnMnLCB0ZW1wbGF0ZSk7XG4gIGlmIChzZWFyY2hBY3Rpb25zLmxlbmd0aCkge1xuICAgIGFkZGl0aW9uYWxBY3Rpb25zLmFwcGVuZFRvKHNlYXJjaEFjdGlvbnMpO1xuICB9IGVsc2Uge1xuICAgIGFkZGl0aW9uYWxBY3Rpb25zLnJlbW92ZSgpO1xuICB9XG5cbiAgLy8gRXhwb3J0IHRhYmxlIHRvICdibG9iJyBvciAneGxzJ1xuICBjb25zdCBleHBvcnRUYWJsZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgdGVtcGxhdGUgPSBgXG4gICAgICA8aHRtbCB4bWxuczpvPVwidXJuOnNjaGVtYXMtbWljcm9zb2Z0LWNvbTpvZmZpY2U6b2ZmaWNlXCIgeG1sbnM6eD1cInVybjpzY2hlbWFzLW1pY3Jvc29mdC1jb206b2ZmaWNlOmV4Y2VsXCIgeG1sbnM9XCJodHRwczovL3d3dy53My5vcmcvVFIvUkVDLWh0bWw0MFwiPlxuICAgICAgICA8aGVhZD5cbiAgICAgICAgICA8IS0tW2lmIGd0ZSBtc28gOV0+XG4gICAgICAgICAgICA8eG1sPlxuICAgICAgICAgICAgICA8eDpFeGNlbFdvcmtib29rPlxuICAgICAgICAgICAgICAgIDx4OkV4Y2VsV29ya3NoZWV0cz5cbiAgICAgICAgICAgICAgICAgIDx4OkV4Y2VsV29ya3NoZWV0PlxuICAgICAgICAgICAgICAgICAgICA8eDpOYW1lPnt3b3Jrc2hlZXR9PC94Ok5hbWU+XG4gICAgICAgICAgICAgICAgICAgIDx4OldvcmtzaGVldE9wdGlvbnM+XG4gICAgICAgICAgICAgICAgICAgICAgPHg6RGlzcGxheUdyaWRsaW5lcy8+XG4gICAgICAgICAgICAgICAgICAgIDwveDpXb3Jrc2hlZXRPcHRpb25zPlxuICAgICAgICAgICAgICAgICAgPC94OkV4Y2VsV29ya3NoZWV0PlxuICAgICAgICAgICAgICAgIDwveDpFeGNlbFdvcmtzaGVldHM+XG4gICAgICAgICAgICAgIDwveDpFeGNlbFdvcmtib29rPlxuICAgICAgICAgICAgPC94bWw+XG4gICAgICAgICAgPCFbZW5kaWZdLS0+XG4gICAgICAgICAgPG1ldGEgaHR0cC1lcXVpdj1cImNvbnRlbnQtdHlwZVwiIGNvbnRlbnQ9XCJhcHBsaWNhdGlvbi92bmQubXMtZXhjZWw7IGNoYXJzZXQ9VVRGLThcIi8+XG4gICAgICAgICAgPHN0eWxlPlxuICAgICAgICAgICAgdGQudGV4dCB7IG1zby1udW1iZXItZm9ybWF0OlwiQFwiOyB9XG4gICAgICAgICAgICB0ZC5udW1iZXIgeyBtc28tbnVtYmVyLWZvcm1hdDpHZW5lcmFsOyB9XG4gICAgICAgICAgICB0ZC5kYXRlIHsgbXNvLW51bWJlci1mb3JtYXQ6XCJTaG9ydCBEYXRlXCI7IH1cbiAgICAgICAgICA8L3N0eWxlPlxuICAgICAgICA8L2hlYWQ+XG4gICAgICAgIDxib2R5PlxuICAgICAgICAgIDx0YWJsZSBib3JkZXI9XCIxXCIgY2VsbHNwYWNpbmc9XCIwXCIgYm9yZGVyY29sb3I9XCIjZWVlXCI+e3RhYmxlfTwvdGFibGU+XG4gICAgICAgIDwvYm9keT5cbiAgICAgIDwvaHRtbD5cbiAgICBgO1xuICAgIGNvbnN0IGZvcm1hdCA9IGZ1bmN0aW9uIChzLCBjKSB7XG4gICAgICByZXR1cm4gcy5yZXBsYWNlKC97KFthLXpdKyl9L2csIGZ1bmN0aW9uIChtLCBwKSB7XG4gICAgICAgIHJldHVybiBjW3BdO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhYmxlLCBuYW1lLCBleHBvcnRBcykge1xuICAgICAgaWYgKCF0YWJsZS5ub2RlVHlwZSkgdGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YWJsZSk7XG4gICAgICBjb25zdCBjdHggPSB7XG4gICAgICAgIHdvcmtzaGVldDogbmFtZSB8fCAnV29ya3NoZWV0JyxcbiAgICAgICAgdGFibGU6IHRhYmxlLmlubmVySFRNTCxcbiAgICAgIH07XG4gICAgICBpZiAoZXhwb3J0QXMgPT09ICd4bHMnKSB7XG4gICAgICAgIC8vIFRhZ3NcbiAgICAgICAgY29uc3QgdGFncyA9IC88XFwvPyhhfHNwYW58cHxkaXZ8YnV0dG9uKSA/Lio/Pi9naTtcbiAgICAgICAgLy8gTnVtYmVycyB3aXRoIGRlY2ltYWwgcG9pbnRcbiAgICAgICAgY29uc3QgZGVjaW1hbCA9IC8oW15cXGRcXC5cXDpdK1xcZCspXFwuKFxcZCtbXlxcZFxcLlxcOl0rKS9naTtcbiAgICAgICAgY3R4LnRhYmxlID0gY3R4LnRhYmxlLnJlcGxhY2UodGFncywgJyAnKTsvLy5yZXBsYWNlKGRlY2ltYWwsICckMSwkMicpO1xuICAgICAgfVxuICAgICAgY29uc3QgZm9ybWF0dGVkID0gZm9ybWF0KHRlbXBsYXRlLCBjdHgpO1xuICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtmb3JtYXR0ZWRdLCB7dHlwZTogJ2FwcGxpY2F0aW9uL3ZuZC5tcy1leGNlbDtjaGFyc2V0PXV0Zi04J30pO1xuICAgICAgaWYgKGV4cG9ydEFzID09PSAnYmxvYicpIHtcbiAgICAgICAgcmV0dXJuIGJsb2I7XG4gICAgICB9IGVsc2UgaWYgKGV4cG9ydEFzID09PSAneGxzJykge1xuICAgICAgICBpbXBvcnQoJ2ZpbGVzYXZlcicpLnRoZW4oZnVuY3Rpb24gKG1vZHVsZSkge1xuICAgICAgICAgIGNvbnN0IHNhdmVBcyA9IG1vZHVsZS5kZWZhdWx0O1xuICAgICAgICAgIHNhdmVBcyhibG9iLCBuYW1lICsgJy54bHMnKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSkoKTtcblxuICAkKCcueGxzJywgdGVtcGxhdGUpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCByZXN1bHRUYWJsZSA9ICQoJy5zZWFyY2gtcmVzdWx0IHRhYmxlJykuY2xvbmUoKTtcbiAgICByZXN1bHRUYWJsZS5maW5kKCcuaGlkZGVuJykucmVtb3ZlKCk7XG4gICAgcmVzdWx0VGFibGUgPSByZXN1bHRUYWJsZS5nZXQoMCk7XG4gICAgZXhwb3J0VGFibGUocmVzdWx0VGFibGUsIGluZGl2aWR1YWxbJ3JkZnM6bGFiZWwnXS5tYXAoQ29tbW9uVXRpbC5mb3JtYXRWYWx1ZSkuam9pbignICcpLCAneGxzJyk7XG4gIH0pO1xuXG4gICQoJy5maWxlcycsIHRlbXBsYXRlKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgIGNvbnN0IGJ0biA9ICQodGhpcyk7XG4gICAgdG9nZ2xlU3BpbihidG4pO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCByZXN1bHRUYWJsZSA9ICQoJy5zZWFyY2gtcmVzdWx0IHRhYmxlJykuY2xvbmUoKTtcbiAgICByZXN1bHRUYWJsZS5maW5kKCcuaGlkZGVuJykucmVtb3ZlKCk7XG5cbiAgICBjb25zdCBmaWxlc0VscyA9ICQoXCJbdHlwZW9mPSd2LXM6RmlsZSddXCIsIHJlc3VsdFRhYmxlKTtcblxuICAgIGNvbnN0IEJfaW5fR0IgPSAxMDI0ICogMTAyNCAqIDEwMjQ7XG4gICAgLy8gZmlsZSBzaXplIGluIEJcbiAgICBsZXQgc3VtU2l6ZSA9IDA7XG4gICAgZmlsZXNFbHMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBtdXN0IGFscmVhZHkgbG9hZGVkXG4gICAgICBjb25zdCBmaWxlSW5kaXZpZCA9IG5ldyB2ZWRhLkluZGl2aWR1YWxNb2RlbCgkKHRoaXMpLmF0dHIoJ3Jlc291cmNlJykpO1xuICAgICAgc3VtU2l6ZSArPSArZmlsZUluZGl2aWRbJ3YtczpmaWxlU2l6ZSddWzBdO1xuICAgIH0pO1xuICAgIGlmIChzdW1TaXplID4gMSAqIEJfaW5fR0IpIHtcbiAgICAgIGxldCBzaXplR0IgPSBzdW1TaXplIC8gQl9pbl9HQjtcbiAgICAgIHNpemVHQiA9IE1hdGgucm91bmQoc2l6ZUdCICogMTAwKSAvIDEwMDtcbiAgICAgIGFsZXJ0KCfQktGL0LPRgNGD0LfQutCwINGE0LDQudC70L7QsiDQvtGC0LzQtdC90LXQvdCwOiDRgNCw0LfQvNC10YAg0YHRhNC+0YDQvNC40YDQvtCy0LDQvdC90L7Qs9C+INCw0YDRhdC40LLQsCAtICcgKyBzaXplR0IrICfQk9CRICwg0L/RgNC10LLRi9GB0LjQuyAgMdCT0JEgLCDRg9C80LXQvdGM0YjQuNGC0LUg0LLRi9Cx0L7RgNC60YMuJyk7XG4gICAgICB0b2dnbGVTcGluKGJ0bik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZmlsZXNQcm9taXNlcyA9IFtdO1xuICAgIGZpbGVzRWxzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgbGluayA9ICQoJ2EnLCB0aGlzKTtcbiAgICAgIGNvbnN0IGZpbGVOYW1lID0gbGluay50ZXh0KCkudHJpbSgpO1xuICAgICAgY29uc3QgZmlsZVVybCA9IGxpbmsuYXR0cignaHJlZicpO1xuICAgICAgZmlsZXNQcm9taXNlcy5wdXNoKGZpbGVQcm9taXNlKGZpbGVVcmwsIGZpbGVOYW1lKSk7XG4gICAgfSk7XG5cbiAgICBpZiAoZmlsZXNQcm9taXNlcy5sZW5ndGggPT0gMCkge1xuICAgICAgdG9nZ2xlU3BpbihidG4pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLmFsbChmaWxlc1Byb21pc2VzKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKGZpbGVzKSB7XG4gICAgICAgIHJldHVybiBpbXBvcnQoJ2pzemlwJykudGhlbihmdW5jdGlvbiAobW9kdWxlKSB7XG4gICAgICAgICAgY29uc3QgSlNaaXAgPSBtb2R1bGUuZGVmYXVsdDtcbiAgICAgICAgICBjb25zdCB6aXAgPSBuZXcgSlNaaXAoKTtcbiAgICAgICAgICBjb25zdCBmb2xkZXIgPSB6aXAuZm9sZGVyKCdmaWxlcycpO1xuICAgICAgICAgIGNvbnN0IHVuaXF1ZSA9IHt9O1xuICAgICAgICAgIGZpbGVzLmZvckVhY2goZnVuY3Rpb24gKGZpbGUpIHtcbiAgICAgICAgICAgIGxldCBuYW1lID0gZmlsZS5uYW1lO1xuICAgICAgICAgICAgbGV0IGkgPSAxO1xuICAgICAgICAgICAgd2hpbGUgKHVuaXF1ZVtuYW1lXSkge1xuICAgICAgICAgICAgICBuYW1lID0gZmlsZS5uYW1lLnJlcGxhY2UoLyguKj8pLihbXi5dKikkLywgJyQxICgnICsgaSArICcpLiQyJyk7XG4gICAgICAgICAgICAgIGlmIChuYW1lID09PSBmaWxlLm5hbWUpIHtcbiAgICAgICAgICAgICAgICBuYW1lID0gZmlsZS5uYW1lICsgJyAoJyArIGkgKyAnKSc7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmlsZS5uYW1lID0gbmFtZTtcbiAgICAgICAgICAgIHVuaXF1ZVtmaWxlLm5hbWVdID0gdHJ1ZTtcbiAgICAgICAgICAgICQoJ1tocmVmPScgKyBCcm93c2VyVXRpbC5lc2NhcGU0JChmaWxlLnVybCkgKyAnXScsIHJlc3VsdFRhYmxlKVxuICAgICAgICAgICAgICAuYXR0cignaHJlZicsICcvZmlsZXMvJyArIGZpbGUubmFtZSlcbiAgICAgICAgICAgICAgLnRleHQoZmlsZS5uYW1lKTtcbiAgICAgICAgICAgIGZvbGRlci5maWxlKGZpbGUubmFtZSwgZmlsZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgY29uc3QgcmVnaXN0cnkgPSBleHBvcnRUYWJsZShyZXN1bHRUYWJsZS5nZXQoMCksIGluZGl2aWR1YWxbJ3JkZnM6bGFiZWwnXS5tYXAoQ29tbW9uVXRpbC5mb3JtYXRWYWx1ZSkuam9pbignICcpLCAnYmxvYicpO1xuICAgICAgICAgIHppcC5maWxlKCdyZWdpc3RyeS5odG1sJywgcmVnaXN0cnkpO1xuICAgICAgICAgIHJldHVybiB6aXAuZ2VuZXJhdGVBc3luYyh7dHlwZTogJ2Jsb2InfSkudGhlbihmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgICAgICAgcmV0dXJuIGltcG9ydCgnZmlsZXNhdmVyJykudGhlbihmdW5jdGlvbiAobW9kdWxlKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHNhdmVBcyA9IG1vZHVsZS5kZWZhdWx0O1xuICAgICAgICAgICAgICBzYXZlQXMoY29udGVudCwgJ3JlZ2lzdHJ5LnppcCcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgbm90aWZ5KCdkYW5nZXInLCB7bWVzc2FnZTogJ9Ce0YjQuNCx0LrQsCDQstGL0LPRgNGD0LfQutC4INGA0LXQtdGB0YLRgNCwLiDQntCx0YDQsNGC0LjRgtC10YHRjCDQsiDQv9C+0LTQtNC10YDQttC60YMuJ30pO1xuICAgICAgfSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdG9nZ2xlU3BpbihidG4pO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGZpbGVQcm9taXNlICh1cmwsIG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICB4aHIub3BlbignR0VUJywgdXJsICsgJz8nICsgRGF0ZS5ub3coKSwgdHJ1ZSk7XG4gICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2Jsb2InO1xuICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICBjb25zdCBmaWxlID0gbmV3IEJsb2IoW3RoaXMucmVzcG9uc2VdLCB7dHlwZTogJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbSd9KTtcbiAgICAgICAgICBmaWxlLm5hbWUgPSBuYW1lO1xuICAgICAgICAgIGZpbGUudXJsID0gdXJsO1xuICAgICAgICAgIHJlc29sdmUoZmlsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVqZWN0KHhoci5zdGF0dXNUZXh0KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZWplY3QoeGhyLnN0YXR1c1RleHQpO1xuICAgICAgfTtcbiAgICAgIHhoci5zZW5kKCk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBTcGlubmVyXG4gIGZ1bmN0aW9uIHRvZ2dsZVNwaW4gKGVsKSB7XG4gICAgY29uc3QgJGVsID0gJChlbCk7XG4gICAgY29uc3QgaGFzU3Bpbm5lciA9ICRlbC5jaGlsZHJlbignLmZhLXNwaW5uZXInKTtcbiAgICBpZiAoaGFzU3Bpbm5lci5sZW5ndGgpIHtcbiAgICAgICRlbC5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgIGhhc1NwaW5uZXIucmVtb3ZlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICRlbC5hZGRDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICQoXCI8aSBjbGFzcz0nZmEgZmEtc3Bpbm5lciBmYS1wdWxzZSBmYS1sZyBmYS1mdyc+PC9pPlwiKS5hcHBlbmRUbyhlbCk7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaHRtbCA9IGBcbiAgPGRpdiBjbGFzcz1cImNvbnRhaW5lciBzaGVldFwiPlxuICAgIDxzdHlsZT5cbiAgICAgIHRkLm51bWJlciB7XG4gICAgICAgIG1zby1udW1iZXItZm9ybWF0OiBHZW5lcmFsO1xuICAgICAgfVxuICAgICAgdGQuZGF0ZSB7XG4gICAgICAgIG1zby1udW1iZXItZm9ybWF0OiAnU2hvcnQgRGF0ZSc7XG4gICAgICB9XG4gICAgICB0ZC50ZXh0IHtcbiAgICAgICAgbXNvLW51bWJlci1mb3JtYXQ6ICdAJztcbiAgICAgIH1cbiAgICA8L3N0eWxlPlxuICAgIDxkaXYgYWJvdXQ9XCJAXCIgZGF0YS10ZW1wbGF0ZT1cInYtZnM6QXR0cmlidXRpdmVTZWFyY2hJbmxpbmVUZW1wbGF0ZVwiPjwvZGl2PlxuICAgIDxzcGFuIGNsYXNzPVwiYWRkaXRpb25hbC1hY3Rpb25zXCI+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IHhsc1wiPjxzcGFuIGFib3V0PVwidi1mczpFeGNlbFwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvc3Bhbj48L2J1dHRvbj5cbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgZmlsZXNcIj48c3BhbiBhYm91dD1cInYtZnM6RmlsZXNSZWdpc3RyeVwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvc3Bhbj48L2J1dHRvbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1tdXRlZCBwYWRkaW5nLWxnXCIgYWJvdXQ9XCJ2LWZzOkN0cmxFbnRlckJ1bmRsZVwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvc3Bhbj5cbiAgICA8L3NwYW4+XG4gIDwvZGl2PlxuYDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7TUFBT0EsV0FBVyxHQUFBQyxnQkFBQSxDQUFBQyxPQUFBO0lBQUEsYUFBQUMsZUFBQTtNQUNYQyxVQUFVLEdBQUFELGVBQUEsQ0FBQUQsT0FBQTtJQUFBLGFBQUFHLE9BQUE7TUFDVkMsQ0FBQyxHQUFBRCxPQUFBLENBQUFILE9BQUE7SUFBQSxhQUFBSyxrQkFBQTtNQUNEQyxNQUFNLEdBQUFELGtCQUFBLENBQUFMLE9BQUE7SUFBQTtJQUFBTyxPQUFBLFdBQUFBLENBQUE7TUFBQUMsT0FBQSxTQUVBQyxJQUFJLEdBQUcsU0FBUEEsSUFBSUEsQ0FBYUMsVUFBVSxFQUFFQyxRQUFRLEVBQUVDLFNBQVMsRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUU7UUFDMUVILFFBQVEsR0FBR1AsQ0FBQyxDQUFDTyxRQUFRLENBQUM7UUFDdEJDLFNBQVMsR0FBR1IsQ0FBQyxDQUFDUSxTQUFTLENBQUM7O1FBRXhCO1FBQ0EsSUFBTUcsaUJBQWlCLEdBQUdYLENBQUMsQ0FBQyxxQkFBcUIsRUFBRU8sUUFBUSxDQUFDO1FBQzVELElBQU1LLGFBQWEsR0FBR1osQ0FBQyxDQUFDLGlCQUFpQixFQUFFTyxRQUFRLENBQUM7UUFDcEQsSUFBSUssYUFBYSxDQUFDQyxNQUFNLEVBQUU7VUFDeEJGLGlCQUFpQixDQUFDRyxRQUFRLENBQUNGLGFBQWEsQ0FBQztRQUMzQyxDQUFDLE1BQU07VUFDTEQsaUJBQWlCLENBQUNJLE1BQU0sRUFBRTtRQUM1Qjs7UUFFQTtR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