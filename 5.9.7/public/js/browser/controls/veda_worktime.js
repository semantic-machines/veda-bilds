"use strict";

System.register(["jquery", "./veda_literal.js", "../../common/util.js"], function (_export, _context) {
  "use strict";

  var $, veda_literal, Util, defaults;
  function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_veda_literalJs) {
      veda_literal = _veda_literalJs.default;
    }, function (_commonUtilJs) {
      Util = _commonUtilJs.default;
    }],
    execute: function () {
      $.fn.veda_worktime = function (options) {
        var opts = _objectSpread(_objectSpread({}, defaults), options);
        var mainInput = veda_literal.call(this, opts);
        this.append(mainInput.hide());
        this.append(opts.view);
        var pseudoInputs = $('div.input-group>input', this);
        var summaryText = $('#worktime-summary-text', this);
        var fillMainInput = function fillMainInput() {
          var count = pseudoInputs[0].value * 480 + pseudoInputs[1].value * 60 + pseudoInputs[2].value * 1;
          mainInput.val(count);
          summaryText.text(Util.formatValue(count));
          mainInput.change();
        };
        var fillPseudoInput = function fillPseudoInput(summaryTime) {
          if (summaryTime) {
            summaryText.text(summaryTime);
            summaryTime = parseInt(summaryTime.split(' ').join('').split(',').join('.'), 10);
            var days = 0;
            var hours = 0;
            var minutes = 0;
            if (summaryTime != 0) {
              days = Math.floor(summaryTime / 480);
              summaryTime = summaryTime - days * 480;
              if (summaryTime != 0) {
                hours = Math.floor(summaryTime / 60);
                summaryTime = summaryTime - hours * 60;
                if (summaryTime != 0) {
                  minutes = summaryTime;
                }
              }
            }
            pseudoInputs[0].value = days;
            pseudoInputs[1].value = hours;
            pseudoInputs[2].value = minutes;
          }
        };
        fillPseudoInput(mainInput.val());
        pseudoInputs.change(fillMainInput);
        this.on('view edit search', function (e) {
          if (e.type == 'view') {
            pseudoInputs.attr('disabled', 'disabled');
            summaryText.attr('disabled', 'disabled');
          } else {
            pseudoInputs.removeAttr('disabled');
            summaryText.removeAttr('disabled');
          }
          e.stopPropagation();
        });
        return this;
      };
      defaults = {
        template: "<input type=\"text\" class=\"form-control\" autocomplete=\"on\" />",
        view: "\n<table>\n  <tbody>\n    <tr>\n      <td width=\"25%\">\n        <div class=\"input-group\">\n          <span class=\"input-group-addon\">DD</span>\n          <input type=\"text\" class=\"form-control\">\n        </div>\n      </td>\n      <td width=\"25%\">\n        <div class=\"input-group\">\n          <span class=\"input-group-addon\">HH</span>\n          <input type=\"text\" class=\"form-control\">\n        </div>\n      </td>\n      <td width=\"25%\">\n        <div class=\"input-group\">\n          <span class=\"input-group-addon\">mm</span>\n          <input type=\"text\" class=\"form-control\">\n        </div>\n      </td>\n      <td>\n        <div class=\"input-group\" style=\"width:100%\">\n          <span class=\"input-group-addon\">&sum;</span>\n          <span id=\"worktime-summary-text\" class=\"text-right form-control\"></span>\n        </div>\n      </td>\n    </tr>\n  </tbody>\n</table>\n  ",
        parser: function parser(input) {
          var int = parseInt(input.split(' ').join('').split(',').join('.'), 10);
          return !isNaN(int) ? int : null;
        }
      };
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiX2pxdWVyeSIsImRlZmF1bHQiLCJfdmVkYV9saXRlcmFsSnMiLCJ2ZWRhX2xpdGVyYWwiLCJfY29tbW9uVXRpbEpzIiwiVXRpbCIsImV4ZWN1dGUiLCJmbiIsInZlZGFfd29ya3RpbWUiLCJvcHRpb25zIiwib3B0cyIsIl9vYmplY3RTcHJlYWQiLCJkZWZhdWx0cyIsIm1haW5JbnB1dCIsImNhbGwiLCJhcHBlbmQiLCJoaWRlIiwidmlldyIsInBzZXVkb0lucHV0cyIsInN1bW1hcnlUZXh0IiwiZmlsbE1haW5JbnB1dCIsImNvdW50IiwidmFsdWUiLCJ2YWwiLCJ0ZXh0IiwiZm9ybWF0VmFsdWUiLCJjaGFuZ2UiLCJmaWxsUHNldWRvSW5wdXQiLCJzdW1tYXJ5VGltZSIsInBhcnNlSW50Iiwic3BsaXQiLCJqb2luIiwiZGF5cyIsImhvdXJzIiwibWludXRlcyIsIk1hdGgiLCJmbG9vciIsIm9uIiwiZSIsInR5cGUiLCJhdHRyIiwicmVtb3ZlQXR0ciIsInN0b3BQcm9wYWdhdGlvbiIsInRlbXBsYXRlIiwicGFyc2VyIiwiaW5wdXQiLCJpbnQiLCJpc05hTiJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NvdXJjZS13ZWIvanMvYnJvd3Nlci9jb250cm9scy92ZWRhX3dvcmt0aW1lLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFdvcmtUaW1lIGNvbnRyb2xcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuaW1wb3J0IHZlZGFfbGl0ZXJhbCBmcm9tICcuL3ZlZGFfbGl0ZXJhbC5qcyc7XG5cbmltcG9ydCBVdGlsIGZyb20gJy4uLy4uL2NvbW1vbi91dGlsLmpzJztcblxuJC5mbi52ZWRhX3dvcmt0aW1lID0gZnVuY3Rpb24gKCBvcHRpb25zICkge1xuICBjb25zdCBvcHRzID0gey4uLmRlZmF1bHRzLCAuLi5vcHRpb25zfTtcbiAgY29uc3QgbWFpbklucHV0ID0gdmVkYV9saXRlcmFsLmNhbGwodGhpcywgb3B0cyk7XG5cbiAgdGhpcy5hcHBlbmQoIG1haW5JbnB1dC5oaWRlKCkgKTtcbiAgdGhpcy5hcHBlbmQoIG9wdHMudmlldyApO1xuXG4gIGNvbnN0IHBzZXVkb0lucHV0cyA9ICQoJ2Rpdi5pbnB1dC1ncm91cD5pbnB1dCcsIHRoaXMpO1xuICBjb25zdCBzdW1tYXJ5VGV4dCA9ICQoJyN3b3JrdGltZS1zdW1tYXJ5LXRleHQnLCB0aGlzKTtcbiAgY29uc3QgZmlsbE1haW5JbnB1dCA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBjb3VudCA9IHBzZXVkb0lucHV0c1swXS52YWx1ZSo0ODAgKyBwc2V1ZG9JbnB1dHNbMV0udmFsdWUqNjAgKyBwc2V1ZG9JbnB1dHNbMl0udmFsdWUqMTtcbiAgICBtYWluSW5wdXQudmFsKGNvdW50KTtcbiAgICBzdW1tYXJ5VGV4dC50ZXh0KFV0aWwuZm9ybWF0VmFsdWUoY291bnQpKTtcbiAgICBtYWluSW5wdXQuY2hhbmdlKCk7XG4gIH07XG4gIGNvbnN0IGZpbGxQc2V1ZG9JbnB1dCA9IGZ1bmN0aW9uIChzdW1tYXJ5VGltZSkge1xuICAgIGlmIChzdW1tYXJ5VGltZSkge1xuICAgICAgc3VtbWFyeVRleHQudGV4dChzdW1tYXJ5VGltZSk7XG4gICAgICBzdW1tYXJ5VGltZSA9IHBhcnNlSW50KCBzdW1tYXJ5VGltZS5zcGxpdCgnICcpLmpvaW4oJycpLnNwbGl0KCcsJykuam9pbignLicpLCAxMCApO1xuICAgICAgbGV0IGRheXMgPSAwOyBsZXQgaG91cnMgPSAwOyBsZXQgbWludXRlcyA9IDA7XG4gICAgICBpZiAoc3VtbWFyeVRpbWUgIT0gMCkge1xuICAgICAgICBkYXlzID0gTWF0aC5mbG9vcihzdW1tYXJ5VGltZS80ODApO1xuICAgICAgICBzdW1tYXJ5VGltZSA9IHN1bW1hcnlUaW1lLWRheXMqNDgwO1xuICAgICAgICBpZiAoc3VtbWFyeVRpbWUgIT0gMCkge1xuICAgICAgICAgIGhvdXJzID0gTWF0aC5mbG9vcihzdW1tYXJ5VGltZS82MCk7XG4gICAgICAgICAgc3VtbWFyeVRpbWUgPSBzdW1tYXJ5VGltZS1ob3Vycyo2MDtcbiAgICAgICAgICBpZiAoc3VtbWFyeVRpbWUgIT0gMCkge1xuICAgICAgICAgICAgbWludXRlcyA9IHN1bW1hcnlUaW1lO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcHNldWRvSW5wdXRzWzBdLnZhbHVlID0gZGF5cztcbiAgICAgIHBzZXVkb0lucHV0c1sxXS52YWx1ZSA9IGhvdXJzO1xuICAgICAgcHNldWRvSW5wdXRzWzJdLnZhbHVlID0gbWludXRlcztcbiAgICB9XG4gIH07XG4gIGZpbGxQc2V1ZG9JbnB1dChtYWluSW5wdXQudmFsKCkpO1xuICBwc2V1ZG9JbnB1dHMuY2hhbmdlKGZpbGxNYWluSW5wdXQpO1xuICB0aGlzLm9uKCd2aWV3IGVkaXQgc2VhcmNoJywgZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoZS50eXBlID09ICd2aWV3Jykge1xuICAgICAgcHNldWRvSW5wdXRzLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgICBzdW1tYXJ5VGV4dC5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwc2V1ZG9JbnB1dHMucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcbiAgICAgIHN1bW1hcnlUZXh0LnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG4gICAgfVxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuICB0ZW1wbGF0ZTogYDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgYXV0b2NvbXBsZXRlPVwib25cIiAvPmAsXG4gIHZpZXc6IGBcbjx0YWJsZT5cbiAgPHRib2R5PlxuICAgIDx0cj5cbiAgICAgIDx0ZCB3aWR0aD1cIjI1JVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uXCI+REQ8L3NwYW4+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3RkPlxuICAgICAgPHRkIHdpZHRoPVwiMjUlXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb25cIj5ISDwvc3Bhbj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvdGQ+XG4gICAgICA8dGQgd2lkdGg9XCIyNSVcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvblwiPm1tPC9zcGFuPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC90ZD5cbiAgICAgIDx0ZD5cbiAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCIgc3R5bGU9XCJ3aWR0aDoxMDAlXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvblwiPiZzdW07PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGlkPVwid29ya3RpbWUtc3VtbWFyeS10ZXh0XCIgY2xhc3M9XCJ0ZXh0LXJpZ2h0IGZvcm0tY29udHJvbFwiPjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3RkPlxuICAgIDwvdHI+XG4gIDwvdGJvZHk+XG48L3RhYmxlPlxuICBgLFxuICBwYXJzZXI6IGZ1bmN0aW9uIChpbnB1dCkge1xuICAgIGNvbnN0IGludCA9IHBhcnNlSW50KCBpbnB1dC5zcGxpdCgnICcpLmpvaW4oJycpLnNwbGl0KCcsJykuam9p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