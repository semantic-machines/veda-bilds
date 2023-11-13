"use strict";

System.register(["jquery", "/js/common/veda.js", "/js/common/backend.js"], function (_export, _context) {
  "use strict";

  var $, veda, Backend, post, html;
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_jsCommonVedaJs) {
      veda = _jsCommonVedaJs.default;
    }, function (_jsCommonBackendJs) {
      Backend = _jsCommonBackendJs.default;
    }],
    execute: function () {
      _export("post", post = function post(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        $('#submit-login', template).click(submitLogin);
        $('#login', template).keydown(function (e) {
          if (e.which === 13) {
            submitLogin(e);
          }
        });
        function submitLogin(e) {
          e.preventDefault();
          var useLogin = $('#login', template).val();
          if (useLogin == undefined || useLogin == '') {
            return;
          }
          Backend.get_ticket_trusted(veda.ticket, useLogin).then(function (authResult) {
            veda.end_time = localStorage.end_time = authResult.end_time;
            veda.ticket = localStorage.ticket = authResult.ticket;
            veda.user_uri = localStorage.user_uri = authResult.user_uri;
            location.assign(location.origin);
          });
        }
      });
      _export("html", html = "\n  <div>\n    <h4>\u041B\u043E\u0433\u0438\u043D \u0434\u043B\u044F \u0432\u0445\u043E\u0434\u0430</h4>\n    <input class=\"form-control input-lg\" id=\"login\" placeholder=\"login\" type=\"text\" name=\"login\" autofocus=\"autofocus\" />\n    <br />\n    <button id=\"submit-login\" class=\"btn btn-lg btn-primary btn-block\">\u0412\u043E\u0439\u0442\u0438</button>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfanNDb21tb25WZWRhSnMiLCJ2ZWRhIiwiX2pzQ29tbW9uQmFja2VuZEpzIiwiQmFja2VuZCIsImV4ZWN1dGUiLCJfZXhwb3J0IiwicG9zdCIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsImNsaWNrIiwic3VibWl0TG9naW4iLCJrZXlkb3duIiwiZSIsIndoaWNoIiwicHJldmVudERlZmF1bHQiLCJ1c2VMb2dpbiIsInZhbCIsInVuZGVmaW5lZCIsImdldF90aWNrZXRfdHJ1c3RlZCIsInRpY2tldCIsInRoZW4iLCJhdXRoUmVzdWx0IiwiZW5kX3RpbWUiLCJsb2NhbFN0b3JhZ2UiLCJ1c2VyX3VyaSIsImxvY2F0aW9uIiwiYXNzaWduIiwib3JpZ2luIiwiaHRtbCJdLCJzb3VyY2VzIjpbIi4uLy4uL29udG9sb2d5L2dlbmVyaWMtYXBwbGljYXRpb24vdGVtcGxhdGVzL3YtdWlfVHJ1c3RlZFRpY2tldFRlbXBsYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgdmVkYSBmcm9tICcvanMvY29tbW9uL3ZlZGEuanMnO1xuaW1wb3J0IEJhY2tlbmQgZnJvbSAnL2pzL2NvbW1vbi9iYWNrZW5kLmpzJztcblxuZXhwb3J0IGNvbnN0IHBvc3QgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gICQoJyNzdWJtaXQtbG9naW4nLCB0ZW1wbGF0ZSkuY2xpY2soc3VibWl0TG9naW4pO1xuICAkKCcjbG9naW4nLCB0ZW1wbGF0ZSkua2V5ZG93bihmdW5jdGlvbiAoZSkge1xuICAgIGlmIChlLndoaWNoID09PSAxMykge1xuICAgICAgc3VibWl0TG9naW4oZSk7XG4gICAgfVxuICB9KTtcbiAgZnVuY3Rpb24gc3VibWl0TG9naW4gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgdXNlTG9naW4gPSAkKCcjbG9naW4nLCB0ZW1wbGF0ZSkudmFsKCk7XG4gICAgaWYgKHVzZUxvZ2luID09IHVuZGVmaW5lZCB8fCB1c2VMb2dpbiA9PSAnJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBCYWNrZW5kLmdldF90aWNrZXRfdHJ1c3RlZCh2ZWRhLnRpY2tldCwgdXNlTG9naW4pLnRoZW4oZnVuY3Rpb24gKGF1dGhSZXN1bHQpIHtcbiAgICAgIHZlZGEuZW5kX3RpbWUgPSBsb2NhbFN0b3JhZ2UuZW5kX3RpbWUgPSBhdXRoUmVzdWx0LmVuZF90aW1lO1xuICAgICAgdmVkYS50aWNrZXQgPSBsb2NhbFN0b3JhZ2UudGlja2V0ID0gYXV0aFJlc3VsdC50aWNrZXQ7XG4gICAgICB2ZWRhLnVzZXJfdXJpID0gbG9jYWxTdG9yYWdlLnVzZXJfdXJpID0gYXV0aFJlc3VsdC51c2VyX3VyaTtcbiAgICAgIGxvY2F0aW9uLmFzc2lnbihsb2NhdGlvbi5vcmlnaW4pO1xuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaHRtbCA9IGBcbiAgPGRpdj5cbiAgICA8aDQ+0JvQvtCz0LjQvSDQtNC70Y8g0LLRhdC+0LTQsDwvaDQ+XG4gICAgPGlucHV0IGNsYXNzPVwiZm9ybS1jb250cm9sIGlucHV0LWxnXCIgaWQ9XCJsb2dpblwiIHBsYWNlaG9sZGVyPVwibG9naW5cIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJsb2dpblwiIGF1dG9mb2N1cz1cImF1dG9mb2N1c1wiIC8+XG4gICAgPGJyIC8+XG4gICAgPGJ1dHRvbiBpZD1cInN1Ym1pdC1sb2dpblwiIGNsYXNzPVwiYnRuIGJ0bi1sZyBidG4tcHJpbWFyeSBidG4tYmxvY2tcIj7QktC+0LnRgtC4PC9idXR0b24+XG4gIDwvZGl2PlxuYDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7TUFBT0EsQ0FBQyxHQUFBQyxPQUFBLENBQUFDLE9BQUE7SUFBQSxhQUFBQyxlQUFBO01BQ0RDLElBQUksR0FBQUQsZUFBQSxDQUFBRCxPQUFBO0lBQUEsYUFBQUcsa0JBQUE7TUFDSkMsT0FBTyxHQUFBRCxrQkFBQSxDQUFBSCxPQUFBO0lBQUE7SUFBQUssT0FBQSxXQUFBQSxDQUFBO01BQUFDLE9BQUEsU0FFREMsSUFBSSxHQUFHLFNBQVBBLElBQUlBLENBQWFDLFVBQVUsRUFBRUMsUUFBUSxFQUFFQyxTQUFTLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFO1FBQzFFSCxRQUFRLEdBQUdYLENBQUMsQ0FBQ1csUUFBUSxDQUFDO1FBQ3RCQyxTQUFTLEdBQUdaLENBQUMsQ0FBQ1ksU0FBUyxDQUFDO1FBRXhCWixDQUFDLENBQUMsZUFBZSxFQUFFVyxRQUFRLENBQUMsQ0FBQ0ksS0FBSyxDQUFDQyxXQUFXLENBQUM7UUFDL0NoQixDQUFDLENBQUMsUUFBUSxFQUFFVyxRQUFRLENBQUMsQ0FBQ00sT0FBTyxDQUFDLFVBQVVDLENBQUMsRUFBRTtVQUN6QyxJQUFJQSxDQUFDLENBQUNDLEtBQUssS0FBSyxFQUFFLEVBQUU7WUFDbEJILFdBQVcsQ0FBQ0UsQ0FBQyxDQUFDO1VBQ2hCO1FBQ0YsQ0FBQyxDQUFDO1FBQ0YsU0FBU0YsV0FBV0EsQ0FBRUUsQ0FBQyxFQUFFO1VBQ3ZCQSxDQUFDLENBQUNFLGNBQWMsRUFBRTtVQUNsQixJQUFNQyxRQUFRLEdBQUdyQixDQUFDLENBQUMsUUFBUSxFQUFFVyxRQUFRLENBQUMsQ0FBQ1csR0FBRyxFQUFFO1VBQzVDLElBQUlELFFBQVEsSUFBSUUsU0FBUyxJQUFJRixRQUFRLElBQUksRUFBRSxFQUFFO1lBQzNDO1VBQ0Y7VUFDQWYsT0FBTyxDQUFDa0Isa0JBQWtCLENBQUNwQixJQUFJLENBQUNxQixNQUFNLEVBQUVKLFFBQVEsQ0FBQyxDQUFDSyxJQUFJLENBQUMsVUFBVUMsVUFBVSxFQUFFO1lBQzNFdkIsSUFBSSxDQUFDd0IsUUFBUSxHQUFHQyxZQUFZLENBQUNELFFBQVEsR0FBR0QsVUFBVSxDQUFDQyxRQUFRO1lBQzNEeEIsSUFBSSxDQUFDcUIsTUFBTSxHQUFHSSxZQUFZLENBQUNKLE1BQU0sR0FBR0UsVUFBVSxDQUFDRixNQUFNO1lBQ3JEckIsSUFBSSxDQUFDMEIsUUFBUSxHQUFHRCxZQUFZLENBQUNDLFFBQVEsR0FBR0gsVUFBVSxDQUFDRyxRQUFRO1lBQzNEQyxRQUFRLENBQUNDLE1BQU0sQ0FBQ0QsUUFBUSxDQUFDRSxNQUFNLENBQUM7VUFDbEMsQ0FBQyxDQUFDO1FBQ0o7TUFDRixDQUFDO01BQUF6QixPQUFBLFNBRVkwQixJQUFJO0lBQUE7RUFBQTtBQUFBIn0=