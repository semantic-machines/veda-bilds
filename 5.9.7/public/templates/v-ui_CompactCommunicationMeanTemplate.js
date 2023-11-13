"use strict";

System.register(["jquery"], function (_export, _context) {
  "use strict";

  var $, post, html;
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }],
    execute: function () {
      _export("post", post = function post(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);

        // email
        if (individual.hasValue('v-s:hasCommunicationMeanChannel', 'd:a1iwni0b54fvcz41vuts08bxqsh')) {
          $('.simple-text', template).remove();
          var mailto = individual['v-s:description'][0];
          $('a.email-link', template).attr('href', 'mailto:' + mailto);
        } else {
          $('a.email-link', template).remove();
        }
      });
      _export("html", html = "\n  <div>\n    <strong about=\"@\" rel=\"v-s:hasCommunicationMeanChannel\">\n      <span about=\"@\" property=\"v-s:shortLabel\"></span>\n    </strong>\n    <span class=\"simple-text\" about=\"@\" property=\"v-s:description\"></span>\n    <a class=\"email-link\" style=\"cursor: pointer;\"><span about=\"@\" property=\"v-s:description\"></span></a>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJleGVjdXRlIiwiX2V4cG9ydCIsInBvc3QiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJoYXNWYWx1ZSIsInJlbW92ZSIsIm1haWx0byIsImF0dHIiLCJodG1sIl0sInNvdXJjZXMiOlsiLi4vLi4vb250b2xvZ3kvZ2VuZXJpYy1mdW5jdGlvbi90ZW1wbGF0ZXMvdi11aV9Db21wYWN0Q29tbXVuaWNhdGlvbk1lYW5UZW1wbGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG5leHBvcnQgY29uc3QgcG9zdCA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgLy8gZW1haWxcbiAgaWYgKGluZGl2aWR1YWwuaGFzVmFsdWUoJ3YtczpoYXNDb21tdW5pY2F0aW9uTWVhbkNoYW5uZWwnLCAnZDphMWl3bmkwYjU0ZnZjejQxdnV0czA4Ynhxc2gnKSkge1xuICAgICQoJy5zaW1wbGUtdGV4dCcsIHRlbXBsYXRlKS5yZW1vdmUoKTtcbiAgICBjb25zdCBtYWlsdG8gPSBpbmRpdmlkdWFsWyd2LXM6ZGVzY3JpcHRpb24nXVswXTtcbiAgICAkKCdhLmVtYWlsLWxpbmsnLCB0ZW1wbGF0ZSkuYXR0cignaHJlZicsICdtYWlsdG86JyArIG1haWx0byk7XG4gIH0gZWxzZSB7XG4gICAgJCgnYS5lbWFpbC1saW5rJywgdGVtcGxhdGUpLnJlbW92ZSgpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaHRtbCA9IGBcbiAgPGRpdj5cbiAgICA8c3Ryb25nIGFib3V0PVwiQFwiIHJlbD1cInYtczpoYXNDb21tdW5pY2F0aW9uTWVhbkNoYW5uZWxcIj5cbiAgICAgIDxzcGFuIGFib3V0PVwiQFwiIHByb3BlcnR5PVwidi1zOnNob3J0TGFiZWxcIj48L3NwYW4+XG4gICAgPC9zdHJvbmc+XG4gICAgPHNwYW4gY2xhc3M9XCJzaW1wbGUtdGV4dFwiIGFib3V0PVwiQFwiIHByb3BlcnR5PVwidi1zOmRlc2NyaXB0aW9uXCI+PC9zcGFuPlxuICAgIDxhIGNsYXNzPVwiZW1haWwtbGlua1wiIHN0eWxlPVwiY3Vyc29yOiBwb2ludGVyO1wiPjxzcGFuIGFib3V0PVwiQFwiIHByb3BlcnR5PVwidi1zOmRlc2NyaXB0aW9uXCI+PC9zcGFuPjwvYT5cbiAgPC9kaXY+XG5gO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztNQUFPQSxDQUFDLEdBQUFDLE9BQUEsQ0FBQUMsT0FBQTtJQUFBO0lBQUFDLE9BQUEsV0FBQUEsQ0FBQTtNQUFBQyxPQUFBLFNBRUtDLElBQUksR0FBRyxTQUFQQSxJQUFJQSxDQUFhQyxVQUFVLEVBQUVDLFFBQVEsRUFBRUMsU0FBUyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRTtRQUMxRUgsUUFBUSxHQUFHUCxDQUFDLENBQUNPLFFBQVEsQ0FBQztRQUN0QkMsU0FBUyxHQUFHUixDQUFDLENBQUNRLFNBQVMsQ0FBQzs7UUFFeEI7UUFDQSxJQUFJRixVQUFVLENBQUNLLFFBQVEsQ0FBQyxpQ0FBaUMsRUFBRSwrQkFBK0IsQ0FBQyxFQUFFO1VBQzNGWCxDQUFDLENBQUMsY0FBYyxFQUFFTyxRQUFRLENBQUMsQ0FBQ0ssTUFBTSxFQUFFO1VBQ3BDLElBQU1DLE1BQU0sR0FBR1AsVUFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO1VBQy9DTixDQUFDLENBQUMsY0FBYyxFQUFFTyxRQUFRLENBQUMsQ0FBQ08sSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFTLEdBQUdELE1BQU0sQ0FBQztRQUM5RCxDQUFDLE1BQU07VUFDTGIsQ0FBQyxDQUFDLGNBQWMsRUFBRU8sUUFBUSxDQUFDLENBQUNLLE1BQU0sRUFBRTtRQUN0QztNQUNGLENBQUM7TUFBQVIsT0FBQSxTQUVZVyxJQUFJO0lBQUE7RUFBQTtBQUFBIn0=