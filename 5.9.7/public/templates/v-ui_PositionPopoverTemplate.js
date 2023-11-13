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
        return Backend.query(veda.ticket, "'rdf:type'==='v-s:Appointment' && 'v-s:occupation'=='" + individual.id + "'").then(function (queryResult) {
          var promises = queryResult.result.map(function (uri) {
            return new IndividualModel(uri).load();
          });
          return Promise.all(promises);
        }).then(function (appointments) {
          var personsPromises = appointments.map(function (appointment) {
            if (appointment.hasValue("v-s:hasDelegationPurpose", "d:delegate_Control")) return false;
            return appointment['v-s:employee'].length > 0 ? appointment['v-s:employee'][0].load() : Promise.resolve(false);
          });
          return Promise.all(personsPromises).then(function (persons) {
            var mBody = $('div.media-body', template);
            mBody.append('<hr class="no-margin">');
            appointments.forEach(function (appointment, i) {
              if (persons[i] && !persons[i].hasValue('v-s:deleted', true)) {
                mBody.append('<small>' + persons[i]['rdfs:label'][0] + '</small><br>');
              }
            });
            return true;
          });
        });
      });
      _export("html", html = "\n  <div class=\"media\" style=\"margin-top:0px;\">\n    <span class=\"close\">&nbsp;&times;</span>\n    <div class=\"media-body\" style=\"width:auto\">\n      <strong class=\"media-heading\" about=\"@\" property=\"rdfs:label\"></strong>\n      <hr class=\"no-margin\" />\n      <small about=\"@\" rel=\"v-s:parentUnit\" data-template=\"v-ui:LabelTemplate\"></small>\n    </div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfanNDb21tb25WZWRhSnMiLCJ2ZWRhIiwiX2pzQ29tbW9uQmFja2VuZEpzIiwiQmFja2VuZCIsIl9qc0NvbW1vbkluZGl2aWR1YWxfbW9kZWxKcyIsIkluZGl2aWR1YWxNb2RlbCIsImV4ZWN1dGUiLCJfZXhwb3J0IiwicHJlIiwiaW5kaXZpZHVhbCIsInRlbXBsYXRlIiwiY29udGFpbmVyIiwibW9kZSIsImV4dHJhIiwicXVlcnkiLCJ0aWNrZXQiLCJpZCIsInRoZW4iLCJxdWVyeVJlc3VsdCIsInByb21pc2VzIiwicmVzdWx0IiwibWFwIiwidXJpIiwibG9hZCIsIlByb21pc2UiLCJhbGwiLCJhcHBvaW50bWVudHMiLCJwZXJzb25zUHJvbWlzZXMiLCJhcHBvaW50bWVudCIsImhhc1ZhbHVlIiwibGVuZ3RoIiwicmVzb2x2ZSIsInBlcnNvbnMiLCJtQm9keSIsImFwcGVuZCIsImZvckVhY2giLCJpIiwiaHRtbCJdLCJzb3VyY2VzIjpbIi4uLy4uL29udG9sb2d5L3N5c3RlbS1jb3JlL3RlbXBsYXRlcy92LXVpX1Bvc2l0aW9uUG9wb3ZlclRlbXBsYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgdmVkYSBmcm9tICcvanMvY29tbW9uL3ZlZGEuanMnO1xuaW1wb3J0IEJhY2tlbmQgZnJvbSAnL2pzL2NvbW1vbi9iYWNrZW5kLmpzJztcbmltcG9ydCBJbmRpdmlkdWFsTW9kZWwgZnJvbSAnL2pzL2NvbW1vbi9pbmRpdmlkdWFsX21vZGVsLmpzJztcblxuZXhwb3J0IGNvbnN0IHByZSA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgcmV0dXJuIEJhY2tlbmQucXVlcnkodmVkYS50aWNrZXQsIFwiJ3JkZjp0eXBlJz09PSd2LXM6QXBwb2ludG1lbnQnICYmICd2LXM6b2NjdXBhdGlvbic9PSdcIiArIGluZGl2aWR1YWwuaWQgKyBcIidcIilcbiAgICAudGhlbihmdW5jdGlvbiAocXVlcnlSZXN1bHQpIHtcbiAgICAgIGNvbnN0IHByb21pc2VzID0gcXVlcnlSZXN1bHQucmVzdWx0Lm1hcChmdW5jdGlvbiAodXJpKSB7XG4gICAgICAgIHJldHVybiBuZXcgSW5kaXZpZHVhbE1vZGVsKHVyaSkubG9hZCgpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIH0pXG4gICAgLnRoZW4oZnVuY3Rpb24gKGFwcG9pbnRtZW50cykge1xuICAgICAgY29uc3QgcGVyc29uc1Byb21pc2VzID0gYXBwb2ludG1lbnRzLm1hcChmdW5jdGlvbiAoYXBwb2ludG1lbnQpIHtcbiAgICAgICAgaWYgKGFwcG9pbnRtZW50Lmhhc1ZhbHVlKFwidi1zOmhhc0RlbGVnYXRpb25QdXJwb3NlXCIsIFwiZDpkZWxlZ2F0ZV9Db250cm9sXCIpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiBhcHBvaW50bWVudFsndi1zOmVtcGxveWVlJ10ubGVuZ3RoID4gMCA/IGFwcG9pbnRtZW50Wyd2LXM6ZW1wbG95ZWUnXVswXS5sb2FkKCkgOiBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwocGVyc29uc1Byb21pc2VzKS50aGVuKGZ1bmN0aW9uIChwZXJzb25zKSB7XG4gICAgICAgIGNvbnN0IG1Cb2R5ID0gJCgnZGl2Lm1lZGlhLWJvZHknLCB0ZW1wbGF0ZSk7XG4gICAgICAgIG1Cb2R5LmFwcGVuZCgnPGhyIGNsYXNzPVwibm8tbWFyZ2luXCI+Jyk7XG4gICAgICAgIGFwcG9pbnRtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChhcHBvaW50bWVudCwgaSkge1xuICAgICAgICAgIGlmIChwZXJzb25zW2ldICYmICFwZXJzb25zW2ldLmhhc1ZhbHVlKCd2LXM6ZGVsZXRlZCcsIHRydWUpKSB7XG4gICAgICAgICAgICBtQm9keS5hcHBlbmQoJzxzbWFsbD4nICsgcGVyc29uc1tpXVsncmRmczpsYWJlbCddWzBdICsgJzwvc21hbGw+PGJyPicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgaHRtbCA9IGBcbiAgPGRpdiBjbGFzcz1cIm1lZGlhXCIgc3R5bGU9XCJtYXJnaW4tdG9wOjBweDtcIj5cbiAgICA8c3BhbiBjbGFzcz1cImNsb3NlXCI+Jm5ic3A7JnRpbWVzOzwvc3Bhbj5cbiAgICA8ZGl2IGNsYXNzPVwibWVkaWEtYm9keVwiIHN0eWxlPVwid2lkdGg6YXV0b1wiPlxuICAgICAgPHN0cm9uZyBjbGFzcz1cIm1lZGlhLWhlYWRpbmdcIiBhYm91dD1cIkBcIiBwcm9wZXJ0eT1cInJkZnM6bGFiZWxcIj48L3N0cm9uZz5cbiAgICAgIDxociBjbGFzcz1cIm5vLW1hcmdpblwiIC8+XG4gICAgICA8c21hbGwgYWJvdXQ9XCJAXCIgcmVsPVwidi1zOnBhcmVudFVuaXRcIiBkYXRhLXRlbXBsYXRlPVwidi11aTpMYWJlbFRlbXBsYXRlXCI+PC9zbWFsbD5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5gO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztNQUFPQSxDQUFDLEdBQUFDLE9BQUEsQ0FBQUMsT0FBQTtJQUFBLGFBQUFDLGVBQUE7TUFDREMsSUFBSSxHQUFBRCxlQUFBLENBQUFELE9BQUE7SUFBQSxhQUFBRyxrQkFBQTtNQUNKQyxPQUFPLEdBQUFELGtCQUFBLENBQUFILE9BQUE7SUFBQSxhQUFBSywyQkFBQTtNQUNQQyxlQUFlLEdBQUFELDJCQUFBLENBQUFMLE9BQUE7SUFBQTtJQUFBTyxPQUFBLFdBQUFBLENBQUE7TUFBQUMsT0FBQSxRQUVUQyxHQUFHLEdBQUcsU0FBTkEsR0FBR0EsQ0FBYUMsVUFBVSxFQUFFQyxRQUFRLEVBQUVDLFNBQVMsRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUU7UUFDekVILFFBQVEsR0FBR2IsQ0FBQyxDQUFDYSxRQUFRLENBQUM7UUFDdEJDLFNBQVMsR0FBR2QsQ0FBQyxDQUFDYyxTQUFTLENBQUM7UUFFeEIsT0FBT1IsT0FBTyxDQUFDVyxLQUFLLENBQUNiLElBQUksQ0FBQ2MsTUFBTSxFQUFFLHVEQUF1RCxHQUFHTixVQUFVLENBQUNPLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FDN0dDLElBQUksQ0FBQyxVQUFVQyxXQUFXLEVBQUU7VUFDM0IsSUFBTUMsUUFBUSxHQUFHRCxXQUFXLENBQUNFLE1BQU0sQ0FBQ0MsR0FBRyxDQUFDLFVBQVVDLEdBQUcsRUFBRTtZQUNyRCxPQUFPLElBQUlqQixlQUFlLENBQUNpQixHQUFHLENBQUMsQ0FBQ0MsSUFBSSxFQUFFO1VBQ3hDLENBQUMsQ0FBQztVQUNGLE9BQU9DLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDTixRQUFRLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQ0RGLElBQUksQ0FBQyxVQUFVUyxZQUFZLEVBQUU7VUFDNUIsSUFBTUMsZUFBZSxHQUFHRCxZQUFZLENBQUNMLEdBQUcsQ0FBQyxVQUFVTyxXQUFXLEVBQUU7WUFDOUQsSUFBSUEsV0FBVyxDQUFDQyxRQUFRLENBQUMsMEJBQTBCLEVBQUUsb0JBQW9CLENBQUMsRUFBRSxPQUFPLEtBQUs7WUFDeEYsT0FBT0QsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDRSxNQUFNLEdBQUcsQ0FBQyxHQUFHRixXQUFXLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNMLElBQUksRUFBRSxHQUFHQyxPQUFPLENBQUNPLE9BQU8sQ0FBQyxLQUFLLENBQUM7VUFDaEgsQ0FBQyxDQUFDO1VBQ0YsT0FBT1AsT0FBTyxDQUFDQyxHQUFHLENBQUNFLGVBQWUsQ0FBQyxDQUFDVixJQUFJLENBQUMsVUFBVWUsT0FBTyxFQUFFO1lBQzFELElBQU1DLEtBQUssR0FBR3BDLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRWEsUUFBUSxDQUFDO1lBQzNDdUIsS0FBSyxDQUFDQyxNQUFNLENBQUMsd0JBQXdCLENBQUM7WUFDdENSLFlBQVksQ0FBQ1MsT0FBTyxDQUFDLFVBQVVQLFdBQVcsRUFBRVEsQ0FBQyxFQUFFO2NBQzdDLElBQUlKLE9BQU8sQ0FBQ0ksQ0FBQyxDQUFDLElBQUksQ0FBQ0osT0FBTyxDQUFDSSxDQUFDLENBQUMsQ0FBQ1AsUUFBUSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsRUFBRTtnQkFDM0RJLEtBQUssQ0FBQ0MsTUFBTSxDQUFDLFNBQVMsR0FBR0YsT0FBTyxDQUFDSSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxjQUFjLENBQUM7Y0FDeEU7WUFDRixDQUFDLENBQUM7WUFDRixPQUFPLElBQUk7VUFDYixDQUFDLENBQUM7UUFDSixDQUFDLENBQUM7TUFDTixDQUFDO01BQUE3QixPQUFBLFNBRVk4QixJQUFJO0lBQUE7RUFBQTtBQUFBIn0=