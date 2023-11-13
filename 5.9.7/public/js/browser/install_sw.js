"use strict";

System.register(["../common/veda.js"], function (_export, _context) {
  "use strict";

  var veda, HTML, wrapper, showAddToHomeScreen, addToHomeScreen, rejectInstall, deferredPrompt;
  return {
    setters: [function (_commonVedaJs) {
      veda = _commonVedaJs.default;
    }],
    execute: function () {
      // Register service worker and install PWA

      if ('serviceWorker' in navigator) {
        HTML = "\n    <div class=\"container text-center\" id=\"install-app\" style=\"display:none; margin:0.75rem auto;\">\n      \u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u043D\u0430 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u044D\u043A\u0440\u0430\u043D? Install the application on the main screen?\n      <button id=\"install-btn\" class=\"btn btn-sm btn-primary margin-md margin-md-h\">\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C / Install</button>\n      <button id=\"reject-install-btn\" class=\"btn btn-sm btn-link\" style=\"margin-left:0;padding-left:0;\">\u041E\u0442\u043A\u0430\u0437\u0430\u0442\u044C\u0441\u044F / Refuse</button>\n    </div>\n  ";
        wrapper = document.createElement('div');
        wrapper.id = 'install-wrapper';
        wrapper.innerHTML = HTML;
        document.body.insertBefore(wrapper, document.body.firstChild);

        // Install SW
        navigator.serviceWorker.register('/sw-simple.js', {
          scope: window.location.origin
        }).then(function (registration) {
          console.log('Service worker registered:', registration.scope);

          // Update application on `update` event
          veda.on('update', function () {
            registration.update().catch(function (error) {
              return console.error('Service worker update failed');
            }).then(function () {
              window.location.reload();
            });
          });
        }).catch(function (error) {
          return console.error('Service worker registration failed');
        });

        // Receive and log server worker message
        navigator.serviceWorker.addEventListener('message', function (event) {
          if ('alert' in event.data) {
            alert(event.data.alert);
          } else {
            console.log('Service worker:', event.data);
          }
        });

        // Ask server worker the value of its veda_version
        navigator.serviceWorker.ready.then(function (registration) {
          registration.active.postMessage('version');
        });

        // Install application prompt
        showAddToHomeScreen = function showAddToHomeScreen() {
          var installApp = document.getElementById('install-app');
          var installBtn = document.getElementById('install-btn');
          var rejectInstallBtn = document.getElementById('reject-install-btn');
          installApp.style.display = 'block';
          installBtn.addEventListener('click', addToHomeScreen);
          rejectInstallBtn.addEventListener('click', rejectInstall);
        };
        addToHomeScreen = function addToHomeScreen() {
          var installApp = document.getElementById('install-app');
          installApp.style.display = 'none'; // Hide the prompt
          deferredPrompt.prompt(); // Wait for the user to respond to the prompt
          deferredPrompt.userChoice.then(function (choiceResult) {
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted install prompt');
            } else {
              console.log('User dismissed install prompt');
            }
            deferredPrompt = null;
          });
        };
        rejectInstall = function rejectInstall() {
          var installApp = document.getElementById('install-app');
          installApp.style.display = 'none';
          localStorage.rejectedInstall = true;
        };
        window.addEventListener('beforeinstallprompt', function (e) {
          // Prevent Chrome 67 and earlier from automatically showing the prompt
          e.preventDefault();
          // Stash the event so it can be triggered later.
          deferredPrompt = e;
          if (!localStorage.rejectedInstall) {
            showAddToHomeScreen();
          }
        });
      }
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ2ZWRhIiwiX2NvbW1vblZlZGFKcyIsImRlZmF1bHQiLCJleGVjdXRlIiwibmF2aWdhdG9yIiwiSFRNTCIsIndyYXBwZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJpZCIsImlubmVySFRNTCIsImJvZHkiLCJpbnNlcnRCZWZvcmUiLCJmaXJzdENoaWxkIiwic2VydmljZVdvcmtlciIsInJlZ2lzdGVyIiwic2NvcGUiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsIm9yaWdpbiIsInRoZW4iLCJyZWdpc3RyYXRpb24iLCJjb25zb2xlIiwibG9nIiwib24iLCJ1cGRhdGUiLCJjYXRjaCIsImVycm9yIiwicmVsb2FkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiZGF0YSIsImFsZXJ0IiwicmVhZHkiLCJhY3RpdmUiLCJwb3N0TWVzc2FnZSIsInNob3dBZGRUb0hvbWVTY3JlZW4iLCJpbnN0YWxsQXBwIiwiZ2V0RWxlbWVudEJ5SWQiLCJpbnN0YWxsQnRuIiwicmVqZWN0SW5zdGFsbEJ0biIsInN0eWxlIiwiZGlzcGxheSIsImFkZFRvSG9tZVNjcmVlbiIsInJlamVjdEluc3RhbGwiLCJkZWZlcnJlZFByb21wdCIsInByb21wdCIsInVzZXJDaG9pY2UiLCJjaG9pY2VSZXN1bHQiLCJvdXRjb21lIiwibG9jYWxTdG9yYWdlIiwicmVqZWN0ZWRJbnN0YWxsIiwiZSIsInByZXZlbnREZWZhdWx0Il0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc291cmNlLXdlYi9qcy9icm93c2VyL2luc3RhbGxfc3cuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gUmVnaXN0ZXIgc2VydmljZSB3b3JrZXIgYW5kIGluc3RhbGwgUFdBXG5cbmltcG9ydCB2ZWRhIGZyb20gJy4uL2NvbW1vbi92ZWRhLmpzJztcblxuaWYgKCdzZXJ2aWNlV29ya2VyJyBpbiBuYXZpZ2F0b3IpIHtcbiAgY29uc3QgSFRNTCA9IGBcbiAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyIHRleHQtY2VudGVyXCIgaWQ9XCJpbnN0YWxsLWFwcFwiIHN0eWxlPVwiZGlzcGxheTpub25lOyBtYXJnaW46MC43NXJlbSBhdXRvO1wiPlxuICAgICAg0KPRgdGC0LDQvdC+0LLQuNGC0Ywg0L/RgNC40LvQvtC20LXQvdC40LUg0L3QsCDQs9C70LDQstC90YvQuSDRjdC60YDQsNC9PyBJbnN0YWxsIHRoZSBhcHBsaWNhdGlvbiBvbiB0aGUgbWFpbiBzY3JlZW4/XG4gICAgICA8YnV0dG9uIGlkPVwiaW5zdGFsbC1idG5cIiBjbGFzcz1cImJ0biBidG4tc20gYnRuLXByaW1hcnkgbWFyZ2luLW1kIG1hcmdpbi1tZC1oXCI+0KPRgdGC0LDQvdC+0LLQuNGC0YwgLyBJbnN0YWxsPC9idXR0b24+XG4gICAgICA8YnV0dG9uIGlkPVwicmVqZWN0LWluc3RhbGwtYnRuXCIgY2xhc3M9XCJidG4gYnRuLXNtIGJ0bi1saW5rXCIgc3R5bGU9XCJtYXJnaW4tbGVmdDowO3BhZGRpbmctbGVmdDowO1wiPtCe0YLQutCw0LfQsNGC0YzRgdGPIC8gUmVmdXNlPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIGA7XG4gIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgd3JhcHBlci5pZCA9ICdpbnN0YWxsLXdyYXBwZXInO1xuICB3cmFwcGVyLmlubmVySFRNTCA9IEhUTUw7XG4gIGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKHdyYXBwZXIsIGRvY3VtZW50LmJvZHkuZmlyc3RDaGlsZCk7XG5cbiAgLy8gSW5zdGFsbCBTV1xuICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWdpc3RlcignL3N3LXNpbXBsZS5qcycsIHtzY29wZTogd2luZG93LmxvY2F0aW9uLm9yaWdpbn0pXG4gICAgLnRoZW4oKHJlZ2lzdHJhdGlvbikgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ1NlcnZpY2Ugd29ya2VyIHJlZ2lzdGVyZWQ6JywgcmVnaXN0cmF0aW9uLnNjb3BlKTtcblxuICAgICAgLy8gVXBkYXRlIGFwcGxpY2F0aW9uIG9uIGB1cGRhdGVgIGV2ZW50XG4gICAgICB2ZWRhLm9uKCd1cGRhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlZ2lzdHJhdGlvbi51cGRhdGUoKVxuICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IGNvbnNvbGUuZXJyb3IoJ1NlcnZpY2Ugd29ya2VyIHVwZGF0ZSBmYWlsZWQnKSlcbiAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IGNvbnNvbGUuZXJyb3IoJ1NlcnZpY2Ugd29ya2VyIHJlZ2lzdHJhdGlvbiBmYWlsZWQnKSk7XG5cbiAgLy8gUmVjZWl2ZSBhbmQgbG9nIHNlcnZlciB3b3JrZXIgbWVzc2FnZVxuICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKGV2ZW50KSA9PiB7XG4gICAgaWYgKCdhbGVydCcgaW4gZXZlbnQuZGF0YSkge1xuICAgICAgYWxlcnQoZXZlbnQuZGF0YS5hbGVydCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKCdTZXJ2aWNlIHdvcmtlcjonLCBldmVudC5kYXRhKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIEFzayBzZXJ2ZXIgd29ya2VyIHRoZSB2YWx1ZSBvZiBpdHMgdmVkYV92ZXJzaW9uXG4gIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlYWR5LnRoZW4oKHJlZ2lzdHJhdGlvbikgPT4ge1xuICAgIHJlZ2lzdHJhdGlvbi5hY3RpdmUucG9zdE1lc3NhZ2UoJ3ZlcnNpb24nKTtcbiAgfSk7XG5cbiAgLy8gSW5zdGFsbCBhcHBsaWNhdGlvbiBwcm9tcHRcbiAgY29uc3Qgc2hvd0FkZFRvSG9tZVNjcmVlbiA9ICgpID0+IHtcbiAgICBjb25zdCBpbnN0YWxsQXBwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luc3RhbGwtYXBwJyk7XG4gICAgY29uc3QgaW5zdGFsbEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnN0YWxsLWJ0bicpO1xuICAgIGNvbnN0IHJlamVjdEluc3RhbGxCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVqZWN0LWluc3RhbGwtYnRuJyk7XG4gICAgaW5zdGFsbEFwcC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICBpbnN0YWxsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWRkVG9Ib21lU2NyZWVuKTtcbiAgICByZWplY3RJbnN0YWxsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVqZWN0SW5zdGFsbCk7XG4gIH07XG5cbiAgY29uc3QgYWRkVG9Ib21lU2NyZWVuID0gKCkgPT4ge1xuICAgIGNvbnN0IGluc3RhbGxBcHAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5zdGFsbC1hcHAnKTtcbiAgICBpbnN0YWxsQXBwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7IC8vIEhpZGUgdGhlIHByb21wdFxuICAgIGRlZmVycmVkUHJvbXB0LnByb21wdCgpOyAvLyBXYWl0IGZvciB0aGUgdXNlciB0byByZXNwb25kIHRvIHRoZSBwcm9tcHRcbiAgICBkZWZlcnJlZFByb21wdC51c2VyQ2hvaWNlXG4gICAgICAudGhlbigoY2hvaWNlUmVzdWx0KSA9PiB7XG4gICAgICAgIGlmIChjaG9pY2VSZXN1bHQub3V0Y29tZSA9PT0gJ2FjY2VwdGVkJykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdVc2VyIGFjY2VwdGVkIGluc3RhbGwgcHJvbXB0Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ1VzZXIgZGlzbWlzc2VkIGluc3RhbGwgcHJvbXB0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgZGVmZXJyZWRQcm9tcHQgPSBudWxsO1xuICAgICAgfSk7XG4gIH07XG5cbiAgY29uc3QgcmVqZWN0SW5zdGFsbCA9ICgpID0+IHtcbiAgICBjb25zdCBpbnN0YWxsQXBwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luc3RhbGwtYXBwJyk7XG4gICAgaW5zdGFsbEFwcC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGxvY2FsU3RvcmFnZS5yZWplY3RlZEluc3RhbGwgPSB0cnVlO1xuICB9O1xuXG4gIGxldCBkZWZlcnJlZFByb21wdDtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZWluc3RhbGxwcm9tcHQnLCAoZSkgPT4ge1xuICAgIC8vIFByZXZlbnQgQ2hyb21lIDY3IGFuZCBlYXJsaWVyIGZyb20gYXV0b21hdGljYWxseSBzaG93aW5nIHRoZSBwcm9tcHRcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gU3Rhc2ggdGhlIGV2ZW50IHNvIGl0IGNhbiBiZSB0cmlnZ2VyZWQgbGF0ZXIuXG4gICAgZGVmZXJyZWRQcm9tcHQgPSBlO1xuICAgIGlmICghbG9jYWxTdG9yYWdlLnJlamVjdGVkSW5zdGFsbCkge1xuICAgICAgc2hvd0FkZFRvSG9tZVNjcmVlbigpO1xuICAgIH1cbiAgfSk7XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O01BRU9BLElBQUksR0FBQUMsYUFBQSxDQUFBQyxPQUFBO0lBQUE7SUFBQUMsT0FBQSxXQUFBQSxDQUFBO01BRlg7O01BSUEsSUFBSSxlQUFlLElBQUlDLFNBQVMsRUFBRTtRQUMxQkMsSUFBSTtRQU9KQyxPQUFPLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUM3Q0YsT0FBTyxDQUFDRyxFQUFFLEdBQUcsaUJBQWlCO1FBQzlCSCxPQUFPLENBQUNJLFNBQVMsR0FBR0wsSUFBSTtRQUN4QkUsUUFBUSxDQUFDSSxJQUFJLENBQUNDLFlBQVksQ0FBQ04sT0FBTyxFQUFFQyxRQUFRLENBQUNJLElBQUksQ0FBQ0UsVUFBVSxDQUFDOztRQUU3RDtRQUNBVCxTQUFTLENBQUNVLGFBQWEsQ0FBQ0MsUUFBUSxDQUFDLGVBQWUsRUFBRTtVQUFD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