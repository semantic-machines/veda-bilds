"use strict";

System.register(["jquery", "/js/common/veda.js", "/js/common/backend.js", "/js/common/individual_model.js"], function (_export, _context) {
  "use strict";

  var $, veda, Backend, IndividualModel, pre, html;
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_jsCommonVedaJs) {
      veda = _jsCommonVedaJs.default;
    }, function (_jsCommonBackendJs) {
      Backend = _jsCommonBackendJs.default;
    }, function (_jsCommonIndividual_modelJs) {
      IndividualModel = _jsCommonIndividual_modelJs.default;
    }],
    execute: function () {
      _export("pre", pre = function pre(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        var folder = decodeURIComponent(location.hash).substr(2).split('/')[0];
        var actor_property = folder === 'v-ft:Outbox' ? 'v-wf:from' : folder === 'v-ft:OutboxCompleted' ? 'v-wf:from' : folder === 'v-ft:Inbox' ? 'v-wf:to' : folder === 'v-ft:Completed' ? 'v-wf:to' : '';

        // const counter_prop = folder === 'v-ft:Inbox' ? 'v-ft:inboxCount' : folder === 'v-ft:Outbox' ? 'v-ft:outboxCount' : folder === 'v-ft:Completed' ? 'v-ft:completedCount' : '';

        if (!individual.hasValue(actor_property)) {
          individual[actor_property] = [veda.user];
        }
        return Backend.query({
          ticket: veda.ticket,
          query: "('rdf:type'==='v-s:Appointment' && 'v-s:employee'=='" + veda.user.id + "')"
        }).then(function (queryResult) {
          var appointments_uris = queryResult.result;
          return Backend.get_individuals(veda.ticket, appointments_uris);
        }).then(function (appointments) {
          var filtered = appointments.reduce(function (acc, appointment) {
            if (veda.appointment && veda.appointment.id && appointment['@'] === veda.appointment.id) {
              return acc;
            }
            if (appointment['v-s:occupation'] && appointment['v-s:occupation'].length) {
              var positionUri = appointment['v-s:occupation'][0].data;
              var delegationPurpose = appointment['v-s:hasDelegationPurpose'] && appointment['v-s:hasDelegationPurpose'].length ? appointment['v-s:hasDelegationPurpose'][0].data : '';
              var isControlAppointment = delegationPurpose === 'd:delegate_Control';
              // official is not control
              if (acc[positionUri] == undefined) {
                acc[positionUri] = !isControlAppointment;
              }
              acc[positionUri] = acc[positionUri] || !isControlAppointment;
            }
            return acc;
          }, {
            'v-ft:MyBundle': true
          });
          for (var actorUri in filtered) {
            if (Object.prototype.hasOwnProperty.call(filtered, actorUri)) {
              var isOfficial = filtered[actorUri];
              var notOfficialInject = isOfficial === false ? " class='not-official'" : '';
              var actor_template = '<li>' + "<a href='#'" + notOfficialInject + '>' + "<span class='actor' about='" + actorUri + "' property='rdfs:label'></span> " +
              // "<span id='counter' about='" + counter_uri + "' class='badge' property='" + counter_prop + "'></span>" +
              '</a>' + '</li>';
              actor_template = $(actor_template);
              if (isOfficial === false) {
                actor_template.popover({
                  placement: 'top',
                  trigger: 'hover',
                  content: 'Не официальное назначение. Только просмотр'
                });
              }
              template.append(actor_template);
            }
          }
          // var actors_uris = [ {uri:"v-ft:MyBundle", official: true} ];
          // appointments.forEach(function (appointment) {
          //   if ( veda.appointment && veda.appointment.id && appointment["@"] === veda.appointment.id ) {
          //     return;
          //   } else if ( appointment["v-s:occupation"] && appointment["v-s:occupation"].length ) {
          //     var delegationPurpose = (appointment["v-s:hasDelegationPurpose"] && appointment["v-s:hasDelegationPurpose"].length) ?
          //         appointment["v-s:hasDelegationPurpose"][0].data : "";

          //     var isControlAppointment = delegationPurpose === "d:delegate_Control";
          //     actors_uris.push( {uri: appointment["v-s:occupation"][0].data, official: !isControlAppointment} );
          //   }
          // });

          // actors_uris.map(function (actor_data) {
          //   //var counter_uri = "d:taskCounter_" + actor_uri.split(":").join("_");
          //   var notOfficialInject = actor_data.official === false ? " class='not-official'" : "";
          //   var actor_template =
          //     "<li>" +
          //       "<a href='#'" + notOfficialInject + ">" +
          //         "<span class='actor' about='" + actor_data.uri + "' property='rdfs:label'></span> " +
          //         //"<span id='counter' about='" + counter_uri + "' class='badge' property='" + counter_prop + "'></span>" +
          //       "</a>" +
          //     "</li>";
          //   actor_template = $(actor_template);
          //   if (actor_data.official === false) {
          //     actor_template.popover({
          //       placement: "top",
          //       trigger: "hover",
          //       content: "Не официальное назначение. Только просмотр"
          //     });
          //   }
          //   template.append(actor_template);
          // });

          if (!individual.actor) {
            individual.actor = 'v-ft:MyBundle';
          }
          if (individual.actor === 'v-ft:MyBundle') {
            individual[actor_property] = [veda.user, veda.appointment && veda.appointment.hasValue('v-s:occupation') ? veda.appointment['v-s:occupation'][0] : undefined];
          } else {
            individual[actor_property] = [new veda.IndividualModel(individual.actor)];
          }
          template.find("[about='" + individual.actor + "']").closest('li').addClass('active');
          template.on('click', 'li a', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var $this = $(this);
            $this.parent().addClass('active').siblings().removeClass('active');
            var actor_uri = $this.children('.actor').attr('about');
            individual.actor = actor_uri;
            if (actor_uri === 'v-ft:MyBundle') {
              individual[actor_property] = [veda.user, veda.appointment && veda.appointment.hasValue('v-s:occupation') ? veda.appointment['v-s:occupation'][0] : undefined];
            } else {
              individual[actor_property] = [new IndividualModel(actor_uri)];
            }
            new IndividualModel(folder).trigger('search');
          });
        });

        // Update counter if counter & results count do not match
        /* individual.on("search:complete", checkCounter);
        template.one("remove", function () {
          individual.off(checkCounter);
        });
        function checkCounter(results) {
          try {
            var actor_uri = individual[actor_property][0].id;
            var counter_uri = "d:taskCounter_" + actor_uri.split(":").join("_");
            var counter = new IndividualModel(counter_uri);
            counter.load().then(function (counter) {
              if ( counter.isNew() ) {
                counter["rdf:type"] = [ new IndividualModel("v-ft:TaskCounter") ];
              }
              var counter_val = counter[counter_prop][0];
              if ( counter_val !== results.estimated ) {
                counter[counter_prop] = [ results.estimated ];
                counter.save();
              }
            });
          }
        }*/
      });
      _export("html", html = "\n  <ul class=\"nav nav-pills\" role=\"tablist\">\n    <style scoped>\n      a.not-official {\n        color: #333333;\n      }\n      li.active > a.not-official {\n        color: #333333 !important;\n        background-color: #ffffff !important;\n        border: 1px solid;\n      }\n    </style>\n  </ul>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfanNDb21tb25WZWRhSnMiLCJ2ZWRhIiwiX2pzQ29tbW9uQmFja2VuZEpzIiwiQmFja2VuZCIsIl9qc0NvbW1vbkluZGl2aWR1YWxfbW9kZWxKcyIsIkluZGl2aWR1YWxNb2RlbCIsImV4ZWN1dGUiLCJfZXhwb3J0IiwicHJlIiwiaW5kaXZpZHVhbCIsInRlbXBsYXRlIiwiY29udGFpbmVyIiwibW9kZSIsImV4dHJhIiwiZm9sZGVyIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwibG9jYXRpb24iLCJoYXNoIiwic3Vic3RyIiwic3BsaXQiLCJhY3Rvcl9wcm9wZXJ0eSIsImhhc1ZhbHVlIiwidXNlciIsInF1ZXJ5IiwidGlja2V0IiwiaWQiLCJ0aGVuIiwicXVlcnlSZXN1bHQiLCJhcHBvaW50bWVudHNfdXJpcyIsInJlc3VsdCIsImdldF9pbmRpdmlkdWFscyIsImFwcG9pbnRtZW50cyIsImZpbHRlcmVkIiwicmVkdWNlIiwiYWNjIiwiYXBwb2ludG1lbnQiLCJsZW5ndGgiLCJwb3NpdGlvblVyaSIsImRhdGEiLCJkZWxlZ2F0aW9uUHVycG9zZSIsImlzQ29udHJvbEFwcG9pbnRtZW50IiwidW5kZWZpbmVkIiwiYWN0b3JVcmkiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJpc09mZmljaWFsIiwibm90T2ZmaWNpYWxJbmplY3QiLCJhY3Rvcl90ZW1wbGF0ZSIsInBvcG92ZXIiLCJwbGFjZW1lbnQiLCJ0cmlnZ2VyIiwiY29udGVudCIsImFwcGVuZCIsImFjdG9yIiwiZmluZCIsImNsb3Nlc3QiLCJhZGRDbGFzcyIsIm9uIiwiZSIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwiJHRoaXMiLCJwYXJlbnQiLCJzaWJsaW5ncyIsInJlbW92ZUNsYXNzIiwiYWN0b3JfdXJpIiwiY2hpbGRyZW4iLCJhdHRyIiwiaHRtbCJdLCJzb3VyY2VzIjpbIi4uLy4uL29udG9sb2d5L2dlbmVyaWMtZnVuY3Rpb24vdGVtcGxhdGVzL3YtZnRfQWN0b3JGaWx0ZXJUZW1wbGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHZlZGEgZnJvbSAnL2pzL2NvbW1vbi92ZWRhLmpzJztcbmltcG9ydCBCYWNrZW5kIGZyb20gJy9qcy9jb21tb24vYmFja2VuZC5qcyc7XG5pbXBvcnQgSW5kaXZpZHVhbE1vZGVsIGZyb20gJy9qcy9jb21tb24vaW5kaXZpZHVhbF9tb2RlbC5qcyc7XG5cbmV4cG9ydCBjb25zdCBwcmUgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gIGNvbnN0IGZvbGRlciA9IGRlY29kZVVSSUNvbXBvbmVudChsb2NhdGlvbi5oYXNoKS5zdWJzdHIoMikuc3BsaXQoJy8nKVswXTtcblxuICBjb25zdCBhY3Rvcl9wcm9wZXJ0eSA9XG4gICAgZm9sZGVyID09PSAndi1mdDpPdXRib3gnID9cbiAgICAgICd2LXdmOmZyb20nIDpcbiAgICAgIGZvbGRlciA9PT0gJ3YtZnQ6T3V0Ym94Q29tcGxldGVkJyA/XG4gICAgICAgICd2LXdmOmZyb20nIDpcbiAgICAgICAgZm9sZGVyID09PSAndi1mdDpJbmJveCcgP1xuICAgICAgICAgICd2LXdmOnRvJyA6XG4gICAgICAgICAgZm9sZGVyID09PSAndi1mdDpDb21wbGV0ZWQnID9cbiAgICAgICAgICAgICd2LXdmOnRvJyA6XG4gICAgICAgICAgICAnJztcblxuICAvLyBjb25zdCBjb3VudGVyX3Byb3AgPSBmb2xkZXIgPT09ICd2LWZ0OkluYm94JyA/ICd2LWZ0OmluYm94Q291bnQnIDogZm9sZGVyID09PSAndi1mdDpPdXRib3gnID8gJ3YtZnQ6b3V0Ym94Q291bnQnIDogZm9sZGVyID09PSAndi1mdDpDb21wbGV0ZWQnID8gJ3YtZnQ6Y29tcGxldGVkQ291bnQnIDogJyc7XG5cbiAgaWYgKCFpbmRpdmlkdWFsLmhhc1ZhbHVlKGFjdG9yX3Byb3BlcnR5KSkge1xuICAgIGluZGl2aWR1YWxbYWN0b3JfcHJvcGVydHldID0gW3ZlZGEudXNlcl07XG4gIH1cblxuICByZXR1cm4gQmFja2VuZC5xdWVyeSh7XG4gICAgdGlja2V0OiB2ZWRhLnRpY2tldCxcbiAgICBxdWVyeTogXCIoJ3JkZjp0eXBlJz09PSd2LXM6QXBwb2ludG1lbnQnICYmICd2LXM6ZW1wbG95ZWUnPT0nXCIgKyB2ZWRhLnVzZXIuaWQgKyBcIicpXCIsXG4gIH0pXG4gICAgLnRoZW4oZnVuY3Rpb24gKHF1ZXJ5UmVzdWx0KSB7XG4gICAgICBjb25zdCBhcHBvaW50bWVudHNfdXJpcyA9IHF1ZXJ5UmVzdWx0LnJlc3VsdDtcbiAgICAgIHJldHVybiBCYWNrZW5kLmdldF9pbmRpdmlkdWFscyh2ZWRhLnRpY2tldCwgYXBwb2ludG1lbnRzX3VyaXMpO1xuICAgIH0pXG4gICAgLnRoZW4oZnVuY3Rpb24gKGFwcG9pbnRtZW50cykge1xuICAgICAgY29uc3QgZmlsdGVyZWQgPSBhcHBvaW50bWVudHMucmVkdWNlKFxuICAgICAgICBmdW5jdGlvbiAoYWNjLCBhcHBvaW50bWVudCkge1xuICAgICAgICAgIGlmICh2ZWRhLmFwcG9pbnRtZW50ICYmIHZlZGEuYXBwb2ludG1lbnQuaWQgJiYgYXBwb2ludG1lbnRbJ0AnXSA9PT0gdmVkYS5hcHBvaW50bWVudC5pZCkge1xuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFwcG9pbnRtZW50Wyd2LXM6b2NjdXBhdGlvbiddICYmIGFwcG9pbnRtZW50Wyd2LXM6b2NjdXBhdGlvbiddLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgcG9zaXRpb25VcmkgPSBhcHBvaW50bWVudFsndi1zOm9jY3VwYXRpb24nXVswXS5kYXRhO1xuICAgICAgICAgICAgY29uc3QgZGVsZWdhdGlvblB1cnBvc2UgPVxuICAgICAgICAgICAgICBhcHBvaW50bWVudFsndi1zOmhhc0RlbGVnYXRpb25QdXJwb3NlJ10gJiYgYXBwb2ludG1lbnRbJ3YtczpoYXNEZWxlZ2F0aW9uUHVycG9zZSddLmxlbmd0aCA/IGFwcG9pbnRtZW50Wyd2LXM6aGFzRGVsZWdhdGlvblB1cnBvc2UnXVswXS5kYXRhIDogJyc7XG4gICAgICAgICAgICBjb25zdCBpc0NvbnRyb2xBcHBvaW50bWVudCA9IGRlbGVnYXRpb25QdXJwb3NlID09PSAnZDpkZWxlZ2F0ZV9Db250cm9sJztcbiAgICAgICAgICAgIC8vIG9mZmljaWFsIGlzIG5vdCBjb250cm9sXG4gICAgICAgICAgICBpZiAoYWNjW3Bvc2l0aW9uVXJpXSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgYWNjW3Bvc2l0aW9uVXJpXSA9ICFpc0NvbnRyb2xBcHBvaW50bWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFjY1twb3NpdGlvblVyaV0gPSBhY2NbcG9zaXRpb25VcmldIHx8ICFpc0NvbnRyb2xBcHBvaW50bWVudDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSxcbiAgICAgICAgeyd2LWZ0Ok15QnVuZGxlJzogdHJ1ZX0sXG4gICAgICApO1xuICAgICAgZm9yIChjb25zdCBhY3RvclVyaSBpbiBmaWx0ZXJlZCkge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGZpbHRlcmVkLCBhY3RvclVyaSkpIHtcbiAgICAgICAgICBjb25zdCBpc09mZmljaWFsID0gZmlsdGVyZWRbYWN0b3JVcmldO1xuICAgICAgICAgIGNvbnN0IG5vdE9mZmljaWFsSW5qZWN0ID0gaXNPZmZpY2lhbCA9PT0gZmFsc2UgPyBcIiBjbGFzcz0nbm90LW9mZmljaWFsJ1wiIDogJyc7XG4gICAgICAgICAgbGV0IGFjdG9yX3RlbXBsYXRlID1cbiAgICAgICAgICAgICc8bGk+JyArXG4gICAgICAgICAgICBcIjxhIGhyZWY9JyMnXCIgK1xuICAgICAgICAgICAgbm90T2ZmaWNpYWxJbmplY3QgK1xuICAgICAgICAgICAgJz4nICtcbiAgICAgICAgICAgIFwiPHNwYW4gY2xhc3M9J2FjdG9yJyBhYm91dD0nXCIgK1xuICAgICAgICAgICAgYWN0b3JVcmkgK1xuICAgICAgICAgICAgXCInIHByb3BlcnR5PSdyZGZzOmxhYmVsJz48L3NwYW4+IFwiICtcbiAgICAgICAgICAgIC8vIFwiPHNwYW4gaWQ9J2NvdW50ZXInIGFib3V0PSdcIiArIGNvdW50ZXJfdXJpICsgXCInIGNsYXNzPSdiYWRnZScgcHJvcGVydHk9J1wiICsgY291bnRlcl9wcm9wICsgXCInPjwvc3Bhbj5cIiArXG4gICAgICAgICAgICAnPC9hPicgK1xuICAgICAgICAgICAgJzwvbGk+JztcbiAgICAgICAgICBhY3Rvcl90ZW1wbGF0ZSA9ICQoYWN0b3JfdGVtcGxhdGUpO1xuICAgICAgICAgIGlmIChpc09mZmljaWFsID09PSBmYWxzZSkge1xuICAgICAgICAgICAgYWN0b3JfdGVtcGxhdGUucG9wb3Zlcih7XG4gICAgICAgICAgICAgIHBsYWNlbWVudDogJ3RvcCcsXG4gICAgICAgICAgICAgIHRyaWdnZXI6ICdob3ZlcicsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6ICfQndC1INC+0YTQuNGG0LjQsNC70YzQvdC+0LUg0L3QsNC30L3QsNGH0LXQvdC40LUuINCi0L7Qu9GM0LrQviDQv9GA0L7RgdC80L7RgtGAJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0ZW1wbGF0ZS5hcHBlbmQoYWN0b3JfdGVtcGxhdGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyB2YXIgYWN0b3JzX3VyaXMgPSBbIHt1cmk6XCJ2LWZ0Ok15QnVuZGxlXCIsIG9mZmljaWFsOiB0cnVlfSBdO1xuICAgICAgLy8gYXBwb2ludG1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGFwcG9pbnRtZW50KSB7XG4gICAgICAvLyAgIGlmICggdmVkYS5hcHBvaW50bWVudCAmJiB2ZWRhLmFwcG9pbnRtZW50LmlkICYmIGFwcG9pbnRtZW50W1wiQFwiXSA9PT0gdmVkYS5hcHBvaW50bWVudC5pZCApIHtcbiAgICAgIC8vICAgICByZXR1cm47XG4gICAgICAvLyAgIH0gZWxzZSBpZiAoIGFwcG9pbnRtZW50W1widi1zOm9jY3VwYXRpb25cIl0gJiYgYXBwb2ludG1lbnRbXCJ2LXM6b2NjdXBhdGlvblwiXS5sZW5ndGggKSB7XG4gICAgICAvLyAgICAgdmFyIGRlbGVnYXRpb25QdXJwb3NlID0gKGFwcG9pbnRtZW50W1widi1zOmhhc0RlbGVnYXRpb25QdXJwb3NlXCJdICYmIGFwcG9pbnRtZW50W1widi1zOmhhc0RlbGVnYXRpb25QdXJwb3NlXCJdLmxlbmd0aCkgP1xuICAgICAgLy8gICAgICAgICBhcHBvaW50bWVudFtcInYtczpoYXNEZWxlZ2F0aW9uUHVycG9zZVwiXVswXS5kYXRhIDogXCJcIjtcblxuICAgICAgLy8gICAgIHZhciBpc0NvbnRyb2xBcHBvaW50bWVudCA9IGRlbGVnYXRpb25QdXJwb3NlID09PSBcImQ6ZGVsZWdhdGVfQ29udHJvbFwiO1xuICAgICAgLy8gICAgIGFjdG9yc191cmlzLnB1c2goIHt1cmk6IGFwcG9pbnRtZW50W1widi1zOm9jY3VwYXRpb25cIl1bMF0uZGF0YSwgb2ZmaWNpYWw6ICFpc0NvbnRyb2xBcHBvaW50bWVudH0gKTtcbiAgICAgIC8vICAgfVxuICAgICAgLy8gfSk7XG5cbiAgICAgIC8vIGFjdG9yc191cmlzLm1hcChmdW5jdGlvbiAoYWN0b3JfZGF0YSkge1xuICAgICAgLy8gICAvL3ZhciBjb3VudGVyX3VyaSA9IFwiZDp0YXNrQ291bnRlcl9cIiArIGFjdG9yX3VyaS5zcGxpdChcIjpcIikuam9pbihcIl9cIik7XG4gICAgICAvLyAgIHZhciBub3RPZmZpY2lhbEluamVjdCA9IGFjdG9yX2RhdGEub2ZmaWNpYWwgPT09IGZhbHNlID8gXCIgY2xhc3M9J25vdC1vZmZpY2lhbCdcIiA6IFwiXCI7XG4gICAgICAvLyAgIHZhciBhY3Rvcl90ZW1wbGF0ZSA9XG4gICAgICAvLyAgICAgXCI8bGk+XCIgK1xuICAgICAgLy8gICAgICAgXCI8YSBocmVmPScjJ1wiICsgbm90T2ZmaWNpYWxJbmplY3QgKyBcIj5cIiArXG4gICAgICAvLyAgICAgICAgIFwiPHNwYW4gY2xhc3M9J2FjdG9yJyBhYm91dD0nXCIgKyBhY3Rvcl9kYXRhLnVyaSArIFwiJyBwcm9wZXJ0eT0ncmRmczpsYWJlbCc+PC9zcGFuPiBcIiArXG4gICAgICAvLyAgICAgICAgIC8vXCI8c3BhbiBpZD0nY291bnRlcicgYWJvdXQ9J1wiICsgY291bnRlcl91cmkgKyBcIicgY2xhc3M9J2JhZGdlJyBwcm9wZXJ0eT0nXCIgKyBjb3VudGVyX3Byb3AgKyBcIic+PC9zcGFuPlwiICtcbiAgICAgIC8vICAgICAgIFwiPC9hPlwiICtcbiAgICAgIC8vICAgICBcIjwvbGk+XCI7XG4gICAgICAvLyAgIGFjdG9yX3RlbXBsYXRlID0gJChhY3Rvcl90ZW1wbGF0ZSk7XG4gICAgICAvLyAgIGlmIChhY3Rvcl9kYXRhLm9mZmljaWFsID09PSBmYWxzZSkge1xuICAgICAgLy8gICAgIGFjdG9yX3RlbXBsYXRlLnBvcG92ZXIoe1xuICAgICAgLy8gICAgICAgcGxhY2VtZW50OiBcInRvcFwiLFxuICAgICAgLy8gICAgICAgdHJpZ2dlcjogXCJob3ZlclwiLFxuICAgICAgLy8gICAgICAgY29udGVudDogXCLQndC1INC+0YTQuNGG0LjQsNC70YzQvdC+0LUg0L3QsNC30L3QsNGH0LXQvdC40LUuINCi0L7Qu9GM0LrQviDQv9GA0L7RgdC80L7RgtGAXCJcbiAgICAgIC8vICAgICB9KTtcbiAgICAgIC8vICAgfVxuICAgICAgLy8gICB0ZW1wbGF0ZS5hcHBlbmQoYWN0b3JfdGVtcGxhdGUpO1xuICAgICAgLy8gfSk7XG5cbiAgICAgIGlmICghaW5kaXZpZHVhbC5hY3Rvcikge1xuICAgICAgICBpbmRpdmlkdWFsLmFjdG9yID0gJ3YtZnQ6TXlCdW5kbGUnO1xuICAgICAgfVxuICAgICAgaWYgKGluZGl2aWR1YWwuYWN0b3IgPT09ICd2LWZ0Ok15QnVuZGxlJykge1xuICAgICAgICBpbmRpdmlkdWFsW2FjdG9yX3Byb3BlcnR5XSA9IFtcbiAgICAgICAgICB2ZWRhLnVzZXIsXG4gICAgICAgICAgdmVkYS5hcHBvaW50bWVudCAmJiB2ZWRhLmFwcG9pbnRtZW50Lmhhc1ZhbHVlKCd2LXM6b2NjdXBhdGlvbicpID8gdmVkYS5hcHBvaW50bWVudFsndi1zOm9jY3VwYXRpb24nXVswXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluZGl2aWR1YWxbYWN0b3JfcHJvcGVydHldID0gW25ldyB2ZWRhLkluZGl2aWR1YWxNb2RlbChpbmRpdmlkdWFsLmFjdG9yKV07XG4gICAgICB9XG4gICAgICB0ZW1wbGF0ZVxuICAgICAgICAuZmluZChcIlthYm91dD0nXCIgKyBpbmRpdmlkdWFsLmFjdG9yICsgXCInXVwiKVxuICAgICAgICAuY2xvc2VzdCgnbGknKVxuICAgICAgICAuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgICB0ZW1wbGF0ZS5vbignY2xpY2snLCAnbGkgYScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgY29uc3QgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICAkdGhpcy5wYXJlbnQoKS5hZGRDbGFzcygnYWN0aXZlJykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIGNvbnN0IGFjdG9yX3VyaSA9ICR0aGlzLmNoaWxkcmVuKCcuYWN0b3InKS5hdHRyKCdhYm91dCcpO1xuICAgICAgICBpbmRpdmlkdWFsLmFjdG9yID0gYWN0b3JfdXJpO1xuICAgICAgICBpZiAoYWN0b3JfdXJpID09PSAndi1mdDpNeUJ1bmRsZScpIHtcbiAgICAgICAgICBpbmRpdmlkdWFsW2FjdG9yX3Byb3BlcnR5XSA9IFtcbiAgICAgICAgICAgIHZlZGEudXNlcixcbiAgICAgICAgICAgIHZlZGEuYXBwb2ludG1lbnQgJiYgdmVkYS5hcHBvaW50bWVudC5oYXNWYWx1ZSgndi1zOm9jY3VwYXRpb24nKSA/IHZlZGEuYXBwb2ludG1lbnRbJ3YtczpvY2N1cGF0aW9uJ11bMF0gOiB1bmRlZmluZWQsXG4gICAgICAgICAgXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpbmRpdmlkdWFsW2FjdG9yX3Byb3BlcnR5XSA9IFtuZXcgSW5kaXZpZHVhbE1vZGVsKGFjdG9yX3VyaSldO1xuICAgICAgICB9XG4gICAgICAgIG5ldyBJbmRpdmlkdWFsTW9kZWwoZm9sZGVyKS50cmlnZ2VyKCdzZWFyY2gnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gIC8vIFVwZGF0ZSBjb3VudGVyIGlmIGNvdW50ZXIgJiByZXN1bHRzIGNvdW50IGRvIG5vdCBtYXRjaFxuICAvKiBpbmRpdmlkdWFsLm9uKFwic2VhcmNoOmNvbXBsZXRlXCIsIGNoZWNrQ291bnRlcik7XG4gIHRlbXBsYXRlLm9uZShcInJlbW92ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgaW5kaXZpZHVhbC5vZmYoY2hlY2tDb3VudGVyKTtcbiAgfSk7XG4gIGZ1bmN0aW9uIGNoZWNrQ291bnRlcihyZXN1bHRzKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBhY3Rvcl91cmkgPSBpbmRpdmlkdWFsW2FjdG9yX3Byb3BlcnR5XVswXS5pZDtcbiAgICAgIHZhciBjb3VudGVyX3VyaSA9IFwiZDp0YXNrQ291bnRlcl9cIiArIGFjdG9yX3VyaS5zcGxpdChcIjpcIikuam9pbihcIl9cIik7XG4gICAgICB2YXIgY291bnRlciA9IG5ldyBJbmRpdmlkdWFsTW9kZWwoY291bnRlcl91cmkpO1xuICAgICAgY291bnRlci5sb2FkKCkudGhlbihmdW5jdGlvbiAoY291bnRlcikge1xuICAgICAgICBpZiAoIGNvdW50ZXIuaXNOZXcoKSApIHtcbiAgICAgICAgICBjb3VudGVyW1wicmRmOnR5cGVcIl0gPSBbIG5ldyBJbmRpdmlkdWFsTW9kZWwoXCJ2LWZ0OlRhc2tDb3VudGVyXCIpIF07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNvdW50ZXJfdmFsID0gY291bnRlcltjb3VudGVyX3Byb3BdWzBdO1xuICAgICAgICBpZiAoIGNvdW50ZXJfdmFsICE9PSByZXN1bHRzLmVzdGltYXRlZCApIHtcbiAgICAgICAgICBjb3VudGVyW2NvdW50ZXJfcHJvcF0gPSBbIHJlc3VsdHMuZXN0aW1hdGVkIF07XG4gICAgICAgICAgY291bnRlci5zYXZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSovXG59O1xuXG5leHBvcnQgY29uc3QgaHRtbCA9IGBcbiAgPHVsIGNsYXNzPVwibmF2IG5hdi1waWxsc1wiIHJvbGU9XCJ0YWJsaXN0XCI+XG4gICAgPHN0eWxlIHNjb3BlZD5cbiAgICAgIGEubm90LW9mZmljaWFsIHtcbiAgICAgICAgY29sb3I6ICMzMzMzMzM7XG4gICAgICB9XG4gICAgICBsaS5hY3RpdmUgPiBhLm5vdC1vZmZpY2lhbCB7XG4gICAgICAgIGNvbG9yOiAjMzMzMzMzICFpbXBvcnRhbnQ7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmYgIWltcG9ydGFudDtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQ7XG4gICAgICB9XG4gICAgPC9zdHlsZT5cbiAgPC91bD5cbmA7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O01BQU9BLENBQUMsR0FBQUMsT0FBQSxDQUFBQyxPQUFBO0lBQUEsYUFBQUMsZUFBQTtNQUNEQyxJQUFJLEdBQUFELGVBQUEsQ0FBQUQsT0FBQTtJQUFBLGFBQUFHLGtCQUFBO01BQ0pDLE9BQU8sR0FBQUQsa0JBQUEsQ0FBQUgsT0FBQTtJQUFBLGFBQUFLLDJCQUFBO01BQ1BDLGVBQWUsR0FBQUQsMkJBQUEsQ0FBQUwsT0FBQTtJQUFBO0lBQUFPLE9BQUEsV0FBQUEsQ0FBQTtNQUFB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