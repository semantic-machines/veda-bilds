"use strict";

System.register(["jquery", "/js/common/individual_model.js", "/js/browser/notify.js"], function (_export, _context) {
  "use strict";

  var $, IndividualModel, notify, pre, post, html;
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_jsCommonIndividual_modelJs) {
      IndividualModel = _jsCommonIndividual_modelJs.default;
    }, function (_jsBrowserNotifyJs) {
      notify = _jsBrowserNotifyJs.default;
    }],
    execute: function () {
      _export("pre", pre = function pre(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        function intersect(arr1, arr2) {
          arr1.sort(sorter);
          arr2.sort(sorter);
          var i = 0;
          var j = 0;
          var res = [];
          var el1;
          var el2;
          while ((el1 = arr1[i]) && (el2 = arr2[j])) {
            if (el2 < el1) {
              j++;
            } else if (el2 > el1) {
              i++;
            } else {
              res.push(el1);
              i++;
              j++;
            }
          }
          return res;
          function sorter(a, b) {
            return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
          }
        }
        var possible = this['v-s:data'].map(function (task) {
          return task['v-wf:possibleDecisionClass'];
        });
        var common = possible.reduce(function (common, possible) {
          return common ? intersect(common, possible) : possible;
        });
        common.push(new IndividualModel('v-wf:DecisionRedirect'));
        this['v-ft:groupDecisionClass'] = common;
      });
      _export("post", post = function post(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        var decision = new IndividualModel();
        $('.possible-decisions input', template).on('change', function (e) {
          var input = $(this);
          var decisionContainer = $('.new-decision', template);
          var decisionClassId = input.closest('[resource]').attr('resource');
          var decisionClass = new IndividualModel(decisionClassId);
          decision['rdf:type'] = [decisionClass];
          decision.properties['rdfs:label'] = decisionClass.properties['rdfs:label'];
          var prevComment = $("veda-control[property='rdfs:comment'] textarea", decisionContainer).val();
          if (prevComment) {
            decision['rdfs:comment'] = [prevComment];
          }
          decisionContainer.empty();
          decision.present(decisionContainer, undefined, 'edit').then(function (decisionTemplate) {
            decisionTemplate = $(decisionTemplate);
            decisionTemplate.find('.action#send').off('click').click(function () {
              Promise.all(individual['v-s:data'].map(function (task) {
                return decision.clone().then(function (task_decision) {
                  task_decision['v-s:backwardTarget'] = [task];
                  task_decision['v-s:backwardProperty'] = [new IndividualModel('v-wf:takenDecision')];
                  task_decision['v-s:canRead'] = [true];
                  return task_decision.save();
                });
              })).then(function () {
                var successMsg = new IndividualModel('v-s:SuccessBundle').load();
                return successMsg.then(function (successMsg) {
                  notify('success', {
                    name: successMsg
                  });
                });
              }).catch(function (error) {
                var errorMsg = new IndividualModel('v-s:ErrorBundle').load();
                return errorMsg.then(function (errorMsg) {
                  notify('danger', {
                    name: errorMsg
                  });
                });
              }).then(function () {
                decisionTemplate.closest('.modal').modal('hide');
                var inbox = new IndividualModel('v-ft:Inbox');
                inbox.clearValue('v-fs:selected');
              });
            });
          });
        });
        $('.possible-decisions input', template).first().prop('checked', 'checked').change();
      });
      _export("html", html = "\n  <div class=\"container sheet\">\n    <h4 about=\"v-ft:groupDecisionClass\" property=\"rdfs:label\"></h4>\n    <div class=\"possible-decisions\" about=\"@\" rel=\"v-ft:groupDecisionClass\">\n      <div class=\"radio\">\n        <label>\n          <input type=\"radio\" name=\"decisionRadios\" />\n          <span property=\"rdfs:label\"></span>\n        </label>\n      </div>\n    </div>\n    <div class=\"well new-decision\"></div>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfanNDb21tb25JbmRpdmlkdWFsX21vZGVsSnMiLCJJbmRpdmlkdWFsTW9kZWwiLCJfanNCcm93c2VyTm90aWZ5SnMiLCJub3RpZnkiLCJleGVjdXRlIiwiX2V4cG9ydCIsInByZSIsImluZGl2aWR1YWwiLCJ0ZW1wbGF0ZSIsImNvbnRhaW5lciIsIm1vZGUiLCJleHRyYSIsImludGVyc2VjdCIsImFycjEiLCJhcnIyIiwic29ydCIsInNvcnRlciIsImkiLCJqIiwicmVzIiwiZWwxIiwiZWwyIiwicHVzaCIsImEiLCJiIiwiaWQiLCJwb3NzaWJsZSIsIm1hcCIsInRhc2siLCJjb21tb24iLCJyZWR1Y2UiLCJwb3N0IiwiZGVjaXNpb24iLCJvbiIsImUiLCJpbnB1dCIsImRlY2lzaW9uQ29udGFpbmVyIiwiZGVjaXNpb25DbGFzc0lkIiwiY2xvc2VzdCIsImF0dHIiLCJkZWNpc2lvbkNsYXNzIiwicHJvcGVydGllcyIsInByZXZDb21tZW50IiwidmFsIiwiZW1wdHkiLCJwcmVzZW50IiwidW5kZWZpbmVkIiwidGhlbiIsImRlY2lzaW9uVGVtcGxhdGUiLCJmaW5kIiwib2ZmIiwiY2xpY2siLCJQcm9taXNlIiwiYWxsIiwiY2xvbmUiLCJ0YXNrX2RlY2lzaW9uIiwic2F2ZSIsInN1Y2Nlc3NNc2ciLCJsb2FkIiwibmFtZSIsImNhdGNoIiwiZXJyb3IiLCJlcnJvck1zZyIsIm1vZGFsIiwiaW5ib3giLCJjbGVhclZhbHVlIiwiZmlyc3QiLCJwcm9wIiwiY2hhbmdlIiwiaHRtbCJdLCJzb3VyY2VzIjpbIi4uLy4uL29udG9sb2d5L2dlbmVyaWMtZnVuY3Rpb24vdGVtcGxhdGVzL3YtZnRfTWFrZURlY2lzaW9uT3BlcmF0aW9uVGVtcGxhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBJbmRpdmlkdWFsTW9kZWwgZnJvbSAnL2pzL2NvbW1vbi9pbmRpdmlkdWFsX21vZGVsLmpzJztcbmltcG9ydCBub3RpZnkgZnJvbSAnL2pzL2Jyb3dzZXIvbm90aWZ5LmpzJztcblxuZXhwb3J0IGNvbnN0IHByZSA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgZnVuY3Rpb24gaW50ZXJzZWN0IChhcnIxLCBhcnIyKSB7XG4gICAgYXJyMS5zb3J0KHNvcnRlcik7XG4gICAgYXJyMi5zb3J0KHNvcnRlcik7XG4gICAgbGV0IGkgPSAwO1xuICAgIGxldCBqID0gMDtcbiAgICBjb25zdCByZXMgPSBbXTtcbiAgICBsZXQgZWwxO1xuICAgIGxldCBlbDI7XG4gICAgd2hpbGUgKChlbDEgPSBhcnIxW2ldKSAmJiAoZWwyID0gYXJyMltqXSkpIHtcbiAgICAgIGlmIChlbDIgPCBlbDEpIHtcbiAgICAgICAgaisrO1xuICAgICAgfSBlbHNlIGlmIChlbDIgPiBlbDEpIHtcbiAgICAgICAgaSsrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzLnB1c2goZWwxKTtcbiAgICAgICAgaSsrO1xuICAgICAgICBqKys7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXM7XG5cbiAgICBmdW5jdGlvbiBzb3J0ZXIgKGEsIGIpIHtcbiAgICAgIHJldHVybiBhLmlkIDwgYi5pZCA/IC0xIDogYS5pZCA+IGIuaWQgPyAxIDogMDtcbiAgICB9XG4gIH1cbiAgY29uc3QgcG9zc2libGUgPSB0aGlzWyd2LXM6ZGF0YSddLm1hcChmdW5jdGlvbiAodGFzaykge1xuICAgIHJldHVybiB0YXNrWyd2LXdmOnBvc3NpYmxlRGVjaXNpb25DbGFzcyddO1xuICB9KTtcbiAgY29uc3QgY29tbW9uID0gcG9zc2libGUucmVkdWNlKGZ1bmN0aW9uIChjb21tb24sIHBvc3NpYmxlKSB7XG4gICAgcmV0dXJuIGNvbW1vbiA/IGludGVyc2VjdChjb21tb24sIHBvc3NpYmxlKSA6IHBvc3NpYmxlO1xuICB9KTtcbiAgY29tbW9uLnB1c2gobmV3IEluZGl2aWR1YWxNb2RlbCgndi13ZjpEZWNpc2lvblJlZGlyZWN0JykpO1xuICB0aGlzWyd2LWZ0Omdyb3VwRGVjaXNpb25DbGFzcyddID0gY29tbW9uO1xufTtcblxuZXhwb3J0IGNvbnN0IHBvc3QgPSBmdW5jdGlvbiAoaW5kaXZpZHVhbCwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgZXh0cmEpIHtcbiAgdGVtcGxhdGUgPSAkKHRlbXBsYXRlKTtcbiAgY29udGFpbmVyID0gJChjb250YWluZXIpO1xuXG4gIGNvbnN0IGRlY2lzaW9uID0gbmV3IEluZGl2aWR1YWxNb2RlbCgpO1xuICAkKCcucG9zc2libGUtZGVjaXNpb25zIGlucHV0JywgdGVtcGxhdGUpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xuICAgIGNvbnN0IGlucHV0ID0gJCh0aGlzKTtcbiAgICBjb25zdCBkZWNpc2lvbkNvbnRhaW5lciA9ICQoJy5uZXctZGVjaXNpb24nLCB0ZW1wbGF0ZSk7XG4gICAgY29uc3QgZGVjaXNpb25DbGFzc0lkID0gaW5wdXQuY2xvc2VzdCgnW3Jlc291cmNlXScpLmF0dHIoJ3Jlc291cmNlJyk7XG4gICAgY29uc3QgZGVjaXNpb25DbGFzcyA9IG5ldyBJbmRpdmlkdWFsTW9kZWwoZGVjaXNpb25DbGFzc0lkKTtcbiAgICBkZWNpc2lvblsncmRmOnR5cGUnXSA9IFtkZWNpc2lvbkNsYXNzXTtcbiAgICBkZWNpc2lvbi5wcm9wZXJ0aWVzWydyZGZzOmxhYmVsJ10gPSBkZWNpc2lvbkNsYXNzLnByb3BlcnRpZXNbJ3JkZnM6bGFiZWwnXTtcbiAgICBjb25zdCBwcmV2Q29tbWVudCA9ICQoXCJ2ZWRhLWNvbnRyb2xbcHJvcGVydHk9J3JkZnM6Y29tbWVudCddIHRleHRhcmVhXCIsIGRlY2lzaW9uQ29udGFpbmVyKS52YWwoKTtcbiAgICBpZiAocHJldkNvbW1lbnQpIHtcbiAgICAgIGRlY2lzaW9uWydyZGZzOmNvbW1lbnQnXSA9IFtwcmV2Q29tbWVudF07XG4gICAgfVxuICAgIGRlY2lzaW9uQ29udGFpbmVyLmVtcHR5KCk7XG4gICAgZGVjaXNpb24ucHJlc2VudChkZWNpc2lvbkNvbnRhaW5lciwgdW5kZWZpbmVkLCAnZWRpdCcpLnRoZW4oZnVuY3Rpb24gKGRlY2lzaW9uVGVtcGxhdGUpIHtcbiAgICAgIGRlY2lzaW9uVGVtcGxhdGUgPSAkKGRlY2lzaW9uVGVtcGxhdGUpO1xuICAgICAgZGVjaXNpb25UZW1wbGF0ZVxuICAgICAgICAuZmluZCgnLmFjdGlvbiNzZW5kJylcbiAgICAgICAgLm9mZignY2xpY2snKVxuICAgICAgICAuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgIFByb21pc2UuYWxsKFxuICAgICAgICAgICAgaW5kaXZpZHVhbFsndi1zOmRhdGEnXS5tYXAoZnVuY3Rpb24gKHRhc2spIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGRlY2lzaW9uLmNsb25lKCkudGhlbihmdW5jdGlvbiAodGFza19kZWNpc2lvbikge1xuICAgICAgICAgICAgICAgIHRhc2tfZGVjaXNpb25bJ3YtczpiYWNrd2FyZFRhcmdldCddID0gW3Rhc2tdO1xuICAgICAgICAgICAgICAgIHRhc2tfZGVjaXNpb25bJ3YtczpiYWNrd2FyZFByb3BlcnR5J10gPSBbbmV3IEluZGl2aWR1YWxNb2RlbCgndi13Zjp0YWtlbkRlY2lzaW9uJyldO1xuICAgICAgICAgICAgICAgIHRhc2tfZGVjaXNpb25bJ3YtczpjYW5SZWFkJ10gPSBbdHJ1ZV07XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhc2tfZGVjaXNpb24uc2F2ZSgpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgIClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgY29uc3Qgc3VjY2Vzc01zZyA9IG5ldyBJbmRpdmlkdWFsTW9kZWwoJ3YtczpTdWNjZXNzQnVuZGxlJykubG9hZCgpO1xuICAgICAgICAgICAgICByZXR1cm4gc3VjY2Vzc01zZy50aGVuKGZ1bmN0aW9uIChzdWNjZXNzTXNnKSB7XG4gICAgICAgICAgICAgICAgbm90aWZ5KCdzdWNjZXNzJywge25hbWU6IHN1Y2Nlc3NNc2d9KTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICBjb25zdCBlcnJvck1zZyA9IG5ldyBJbmRpdmlkdWFsTW9kZWwoJ3YtczpFcnJvckJ1bmRsZScpLmxvYWQoKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGVycm9yTXNnLnRoZW4oZnVuY3Rpb24gKGVycm9yTXNnKSB7XG4gICAgICAgICAgICAgICAgbm90aWZ5KCdkYW5nZXInLCB7bmFtZTogZXJyb3JNc2d9KTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBkZWNpc2lvblRlbXBsYXRlLmNsb3Nlc3QoJy5tb2RhbCcpLm1vZGFsKCdoaWRlJyk7XG4gICAgICAgICAgICAgIGNvbnN0IGluYm94ID0gbmV3IEluZGl2aWR1YWxNb2RlbCgndi1mdDpJbmJveCcpO1xuICAgICAgICAgICAgICBpbmJveC5jbGVhclZhbHVlKCd2LWZzOnNlbGVjdGVkJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICAkKCcucG9zc2libGUtZGVjaXNpb25zIGlucHV0JywgdGVtcGxhdGUpLmZpcnN0KCkucHJvcCgnY2hlY2tlZCcsICdjaGVja2VkJykuY2hhbmdlKCk7XG59O1xuXG5leHBvcnQgY29uc3QgaHRtbCA9IGBcbiAgPGRpdiBjbGFzcz1cImNvbnRhaW5lciBzaGVldFwiPlxuICAgIDxoNCBhYm91dD1cInYtZnQ6Z3JvdXBEZWNpc2lvbkNsYXNzXCIgcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9oND5cbiAgICA8ZGl2IGNsYXNzPVwicG9zc2libGUtZGVjaXNpb25zXCIgYWJvdXQ9XCJAXCIgcmVsPVwidi1mdDpncm91cERlY2lzaW9uQ2xhc3NcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJyYWRpb1wiPlxuICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJkZWNpc2lvblJhZGlvc1wiIC8+XG4gICAgICAgICAgPHNwYW4gcHJvcGVydHk9XCJyZGZzOmxhYmVsXCI+PC9zcGFuPlxuICAgICAgICA8L2xhYmVsPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cIndlbGwgbmV3LWRlY2lzaW9uXCI+PC9kaXY+XG4gIDwvZGl2PlxuYDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7TUFBT0EsQ0FBQyxHQUFBQyxPQUFBLENBQUFDLE9BQUE7SUFBQSxhQUFBQywyQkFBQTtNQUNEQyxlQUFlLEdBQUFELDJCQUFBLENBQUFELE9BQUE7SUFBQSxhQUFBRyxrQkFBQTtNQUNmQyxNQUFNLEdBQUFELGtCQUFBLENBQUFILE9BQUE7SUFBQTtJQUFBSyxPQUFBLFdBQUFBLENBQUE7TUFBQUMsT0FBQSxRQUVBQyxHQUFHLEdBQUcsU0FBTkEsR0FBR0EsQ0FBYUMsVUFBVSxFQUFFQyxRQUFRLEVBQUVDLFNBQVMsRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUU7UUFDekVILFFBQVEsR0FBR1gsQ0FBQyxDQUFDVyxRQUFRLENBQUM7UUFDdEJDLFNBQVMsR0FBR1osQ0FBQyxDQUFDWSxTQUFTLENBQUM7UUFFeEIsU0FBU0csU0FBU0EsQ0FBRUMsSUFBSSxFQUFFQyxJQUFJLEVBQUU7VUFDOUJELElBQUksQ0FBQ0UsSUFBSSxDQUFDQyxNQUFNLENBQUM7VUFDakJGLElBQUksQ0FBQ0MsSUFBSSxDQUFDQyxNQUFNLENBQUM7VUFDakIsSUFBSUMsQ0FBQyxHQUFHLENBQUM7VUFDVCxJQUFJQyxDQUFDLEdBQUcsQ0FBQztVQUNULElBQU1D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