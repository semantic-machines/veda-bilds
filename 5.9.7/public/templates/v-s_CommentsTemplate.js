"use strict";

System.register(["jquery", "/js/common/individual_model.js"], function (_export, _context) {
  "use strict";

  var $, IndividualModel, post, html;
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_jsCommonIndividual_modelJs) {
      IndividualModel = _jsCommonIndividual_modelJs.default;
    }],
    execute: function () {
      _export("post", post = function post(individual, template, container, mode, extra) {
        template = $(template);
        container = $(container);
        $('#add-comment', template).click(function () {
          var addComment = $(this).hide();
          var _class = new IndividualModel('v-s:Comment');
          var comment = new IndividualModel();
          var cntr = $('#new-comment', template).empty();
          var tmpl = 'v-s:SingleCommentTemplate';
          comment['rdf:type'] = [_class];
          comment['v-s:backwardTarget'] = [individual];
          comment['v-s:backwardProperty'] = [new IndividualModel('v-s:hasComment')];
          comment['v-s:commentedResource'] = individual;
          comment['v-s:canRead'] = [true];
          comment.present(cntr, tmpl, 'edit');
          comment.one('afterSave beforeReset', function () {
            addComment.show();
            cntr.empty();
          });
        });
        template.on('click', '#reply.action', function (e) {
          e.preventDefault();
          var commentTemplate = $(this).closest('[resource]');
          var inReplyComment = new IndividualModel(commentTemplate.attr('resource'));
          var cntr = $('#new-reply', commentTemplate).first().empty();
          var tmpl = 'v-s:SingleCommentTemplate';
          var reply = new IndividualModel();
          reply['rdf:type'] = 'v-s:Comment';
          reply['v-s:backwardTarget'] = inReplyComment;
          reply['v-s:backwardProperty'] = 'v-s:hasComment';
          reply['v-s:commentedResource'] = individual;
          reply['v-s:canRead'] = true;
          reply.present(cntr, tmpl, 'edit');
          reply.one('afterSave beforeReset', function () {
            cntr.empty();
          });
        });
        template.on('click', '#edit-comment.action', function (e) {
          e.preventDefault();
          var tmpl = 'v-s:SingleCommentTemplate';
          var commentTemplate = $(this).closest('[resource]');
          var comment = new IndividualModel(commentTemplate.attr('resource'));
          var cntr = $('#new-reply', commentTemplate).first().empty();
          var commentContent = $('#comment-content', commentTemplate).hide();
          comment.present(cntr, tmpl, 'edit');
          comment.one('afterSave beforeReset', function () {
            commentContent.show();
            cntr.empty();
          });
        });
      });
      _export("html", html = "\n  <div>\n    <h3 about=\"v-s:Comments\" property=\"rdfs:label\"></h3>\n    <div about=\"@\" rel=\"v-s:hasComment\" data-template=\"v-s:RecursiveCommentTemplate\"></div>\n    <div id=\"new-comment\"></div>\n    <button class=\"margin-sm btn btn-success\" id=\"add-comment\" about=\"v-s:AddComment\" property=\"rdfs:label\"></button>\n  </div>\n");
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfanNDb21tb25JbmRpdmlkdWFsX21vZGVsSnMiLCJJbmRpdmlkdWFsTW9kZWwiLCJleGVjdXRlIiwiX2V4cG9ydCIsInBvc3QiLCJpbmRpdmlkdWFsIiwidGVtcGxhdGUiLCJjb250YWluZXIiLCJtb2RlIiwiZXh0cmEiLCJjbGljayIsImFkZENvbW1lbnQiLCJoaWRlIiwiX2NsYXNzIiwiY29tbWVudCIsImNudHIiLCJlbXB0eSIsInRtcGwiLCJwcmVzZW50Iiwib25lIiwic2hvdyIsIm9uIiwiZSIsInByZXZlbnREZWZhdWx0IiwiY29tbWVudFRlbXBsYXRlIiwiY2xvc2VzdCIsImluUmVwbHlDb21tZW50IiwiYXR0ciIsImZpcnN0IiwicmVwbHkiLCJjb21tZW50Q29udGVudCIsImh0bWwiXSwic291cmNlcyI6WyIuLi8uLi9vbnRvbG9neS9nZW5lcmljLWZ1bmN0aW9uL3RlbXBsYXRlcy92LXNfQ29tbWVudHNUZW1wbGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IEluZGl2aWR1YWxNb2RlbCBmcm9tICcvanMvY29tbW9uL2luZGl2aWR1YWxfbW9kZWwuanMnO1xuXG5leHBvcnQgY29uc3QgcG9zdCA9IGZ1bmN0aW9uIChpbmRpdmlkdWFsLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCBleHRyYSkge1xuICB0ZW1wbGF0ZSA9ICQodGVtcGxhdGUpO1xuICBjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG5cbiAgJCgnI2FkZC1jb21tZW50JywgdGVtcGxhdGUpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBhZGRDb21tZW50ID0gJCh0aGlzKS5oaWRlKCk7XG4gICAgY29uc3QgX2NsYXNzID0gbmV3IEluZGl2aWR1YWxNb2RlbCgndi1zOkNvbW1lbnQnKTtcbiAgICBjb25zdCBjb21tZW50ID0gbmV3IEluZGl2aWR1YWxNb2RlbCgpO1xuICAgIGNvbnN0IGNudHIgPSAkKCcjbmV3LWNvbW1lbnQnLCB0ZW1wbGF0ZSkuZW1wdHkoKTtcbiAgICBjb25zdCB0bXBsID0gJ3YtczpTaW5nbGVDb21tZW50VGVtcGxhdGUnO1xuICAgIGNvbW1lbnRbJ3JkZjp0eXBlJ10gPSBbX2NsYXNzXTtcbiAgICBjb21tZW50Wyd2LXM6YmFja3dhcmRUYXJnZXQnXSA9IFtpbmRpdmlkdWFsXTtcbiAgICBjb21tZW50Wyd2LXM6YmFja3dhcmRQcm9wZXJ0eSddID0gW25ldyBJbmRpdmlkdWFsTW9kZWwoJ3YtczpoYXNDb21tZW50JyldO1xuICAgIGNvbW1lbnRbJ3Ytczpjb21tZW50ZWRSZXNvdXJjZSddID0gaW5kaXZpZHVhbDtcbiAgICBjb21tZW50Wyd2LXM6Y2FuUmVhZCddID0gW3RydWVdO1xuICAgIGNvbW1lbnQucHJlc2VudChjbnRyLCB0bXBsLCAnZWRpdCcpO1xuICAgIGNvbW1lbnQub25lKCdhZnRlclNhdmUgYmVmb3JlUmVzZXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhZGRDb21tZW50LnNob3coKTtcbiAgICAgIGNudHIuZW1wdHkoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgdGVtcGxhdGUub24oJ2NsaWNrJywgJyNyZXBseS5hY3Rpb24nLCBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBjb21tZW50VGVtcGxhdGUgPSAkKHRoaXMpLmNsb3Nlc3QoJ1tyZXNvdXJjZV0nKTtcbiAgICBjb25zdCBpblJlcGx5Q29tbWVudCA9IG5ldyBJbmRpdmlkdWFsTW9kZWwoY29tbWVudFRlbXBsYXRlLmF0dHIoJ3Jlc291cmNlJykpO1xuICAgIGNvbnN0IGNudHIgPSAkKCcjbmV3LXJlcGx5JywgY29tbWVudFRlbXBsYXRlKS5maXJzdCgpLmVtcHR5KCk7XG4gICAgY29uc3QgdG1wbCA9ICd2LXM6U2luZ2xlQ29tbWVudFRlbXBsYXRlJztcbiAgICBjb25zdCByZXBseSA9IG5ldyBJbmRpdmlkdWFsTW9kZWwoKTtcbiAgICByZXBseVsncmRmOnR5cGUnXSA9ICd2LXM6Q29tbWVudCc7XG4gICAgcmVwbHlbJ3YtczpiYWNrd2FyZFRhcmdldCddID0gaW5SZXBseUNvbW1lbnQ7XG4gICAgcmVwbHlbJ3YtczpiYWNrd2FyZFByb3BlcnR5J10gPSAndi1zOmhhc0NvbW1lbnQnO1xuICAgIHJlcGx5Wyd2LXM6Y29tbWVudGVkUmVzb3VyY2UnXSA9IGluZGl2aWR1YWw7XG4gICAgcmVwbHlbJ3YtczpjYW5SZWFkJ10gPSB0cnVlO1xuICAgIHJlcGx5LnByZXNlbnQoY250ciwgdG1wbCwgJ2VkaXQnKTtcbiAgICByZXBseS5vbmUoJ2FmdGVyU2F2ZSBiZWZvcmVSZXNldCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNudHIuZW1wdHkoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgdGVtcGxhdGUub24oJ2NsaWNrJywgJyNlZGl0LWNvbW1lbnQuYWN0aW9uJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgdG1wbCA9ICd2LXM6U2luZ2xlQ29tbWVudFRlbXBsYXRlJztcbiAgICBjb25zdCBjb21tZW50VGVtcGxhdGUgPSAkKHRoaXMpLmNsb3Nlc3QoJ1tyZXNvdXJjZV0nKTtcbiAgICBjb25zdCBjb21tZW50ID0gbmV3IEluZGl2aWR1YWxNb2RlbChjb21tZW50VGVtcGxhdGUuYXR0cigncmVzb3VyY2UnKSk7XG4gICAgY29uc3QgY250ciA9ICQoJyNuZXctcmVwbHknLCBjb21tZW50VGVtcGxhdGUpLmZpcnN0KCkuZW1wdHkoKTtcbiAgICBjb25zdCBjb21tZW50Q29udGVudCA9ICQoJyNjb21tZW50LWNvbnRlbnQnLCBjb21tZW50VGVtcGxhdGUpLmhpZGUoKTtcbiAgICBjb21tZW50LnByZXNlbnQoY250ciwgdG1wbCwgJ2VkaXQnKTtcbiAgICBjb21tZW50Lm9uZSgnYWZ0ZXJTYXZlIGJlZm9yZVJlc2V0JywgZnVuY3Rpb24gKCkge1xuICAgICAgY29tbWVudENvbnRlbnQuc2hvdygpO1xuICAgICAgY250ci5lbXB0eSgpO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBodG1sID0gYFxuICA8ZGl2PlxuICAgIDxoMyBhYm91dD1cInYtczpDb21tZW50c1wiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvaDM+XG4gICAgPGRpdiBhYm91dD1cIkBcIiByZWw9XCJ2LXM6aGFzQ29tbWVudFwiIGRhdGEtdGVtcGxhdGU9XCJ2LXM6UmVjdXJzaXZlQ29tbWVudFRlbXBsYXRlXCI+PC9kaXY+XG4gICAgPGRpdiBpZD1cIm5ldy1jb21tZW50XCI+PC9kaXY+XG4gICAgPGJ1dHRvbiBjbGFzcz1cIm1hcmdpbi1zbSBidG4gYnRuLXN1Y2Nlc3NcIiBpZD1cImFkZC1jb21tZW50XCIgYWJvdXQ9XCJ2LXM6QWRkQ29tbWVudFwiIHByb3BlcnR5PVwicmRmczpsYWJlbFwiPjwvYnV0dG9uPlxuICA8L2Rpdj5cbmA7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O01BQU9BLENBQUMsR0FBQUMsT0FBQSxDQUFBQyxPQUFBO0lBQUEsYUFBQUMsMkJBQUE7TUFDREMsZUFBZSxHQUFBRCwyQkFBQSxDQUFBRCxPQUFBO0lBQUE7SUFBQUcsT0FBQSxXQUFBQSxDQUFBO01BQUFDLE9BQUEsU0FFVEMsSUFBSSxHQUFHLFNBQVBBLElBQUlBLENBQWFDLFVBQVUsRUFBRUMsUUFBUSxFQUFFQyxTQUFTLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFO1FBQzFFSCxRQUFRLEdBQUdULENBQUMsQ0FBQ1MsUUFBUSxDQUFDO1FBQ3RCQyxTQUFTLEdBQUdWLENBQUMsQ0FBQ1UsU0FBUyxDQUFDO1FBRXhCVixDQUFDLENBQUMsY0FBYyxFQUFFUyxRQUFRLENBQUMsQ0FBQ0ksS0FBSyxDQUFDLFlBQVk7VUFDNUMsSUFBTUMsVUFBVSxHQUFHZCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUNlLElBQUksRUFBRTtVQUNqQyxJQUFNQyxNQUFNLEdBQUcsSUFBSVosZUFBZSxDQUFDLGFBQWEsQ0FBQztV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