"use strict";

System.register(["jquery", "../../common/individual_model.js", "../../common/util.js", "../../browser/notify.js"], function (_export, _context) {
  "use strict";

  var $, IndividualModel, Util, notify, defaults;
  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
  function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }
  function uploadFile(_ref, retry) {
    var file = _ref.file,
      path = _ref.path,
      uri = _ref.uri,
      progress = _ref.progress;
    retry = typeof retry === 'number' ? retry : 2;
    return new Promise(function (resolve, reject) {
      var done = function done() {
        if (xhr.status === 200) {
          resolve();
        } else {
          reject(Error(xhr.response || xhr.responseText));
        }
      };
      var fail = function fail() {
        reject(Error('File upload failed'));
      };
      var xhr = new XMLHttpRequest();
      var fd = new FormData();
      xhr.open('POST', '/files', true);
      xhr.timeout = 10 * 60 * 1000;
      xhr.upload.onprogress = progress;
      xhr.onload = done;
      xhr.onerror = xhr.onabort = xhr.ontimeout = fail;
      fd.append('path', path);
      fd.append('uri', uri);
      if (_instanceof(file, File)) {
        fd.append('file', file);
      } else if (_instanceof(file, Image)) {
        fd.append('content', file.src);
      }
      xhr.send(fd);
    }).catch(function (error) {
      console.log('File upload error:', error);
      if (retry > 0) {
        return uploadFile({
          file: file,
          path: path,
          uri: uri,
          progress: progress
        }, --retry);
      }
      throw error;
    });
  }

  /**
   * Load image to browser
   * @param {File} imageFile - value from file input
   * @return {Promise}
   */
  function loadImage(imageFile) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var image = new Image();
        image.onload = function () {
          resolve(image);
        };
        image.onerror = function () {
          reject(new Error('Image load error'));
        };
        image.src = e.target.result;
      };
      reader.onerror = function () {
        reject(new Error('File reader error'));
      };
      reader.readAsDataURL(imageFile);
    });
  }

  /**
   * Resize image to max width
   * @param {Image} image
   * @param {number} maxWidth - width in pixels
   * @return {Promise}
   */
  function resizeImage(image, maxWidth) {
    return new Promise(function (resolve, reject) {
      if (image.width <= maxWidth) {
        resolve(image);
      } else {
        var temp = $('<div></div>');
        temp.append(image);
        _context.import('cropper/cropper.min.js').then(function (cropperModule) {
          var Cropper = cropperModule.default;
          _context.import('cropper/cropper.min.css').then(function (cropperStyle) {
            var styleSheet = cropperStyle.default;
            document.adoptedStyleSheets = [].concat(_toConsumableArray(document.adoptedStyleSheets), [styleSheet]);
            var cropper = new Cropper(image, {
              autoCrop: false,
              ready: function ready(event) {
                var ratio = image.height / image.width;
                var resized = new Image();
                resized.src = cropper.getCroppedCanvas({
                  maxWidth: maxWidth,
                  maxHeight: Math.floor(maxWidth * ratio)
                }).toDataURL('image/jpeg');
                resolve(resized);
                cropper.destroy();
              }
            });
          });
        });
      }
    });
  }

  /**
   * Crop image
   * @param {Image} imageForCrop
   * @param {number} ratio
   * @param {number} maxWidth
   * @return {Promise}
   */
  function cropImage(imageForCrop, ratio, maxWidth) {
    var modal = $($('#confirm-modal-template').html());
    modal.modal();
    $('body').append(modal);
    var container = $('.modal-body', modal);
    imageForCrop.style.cssText = 'display:block; width:100%';
    var temp = $('<div></div>').append(imageForCrop);
    container.append(temp);
    return new Promise(function (resolve, reject) {
      _context.import('cropper/cropper.min.js').then(function (cropperModule) {
        var Cropper = cropperModule.default;
        _context.import('cropper/cropper.min.css').then(function (cropperStyle) {
          var styleSheet = cropperStyle.default;
          document.adoptedStyleSheets = [].concat(_toConsumableArray(document.adoptedStyleSheets), [styleSheet]);

          // in templates ratio=h/w, in crop ratio=w/h
          var cropper = new Cropper(imageForCrop, {
            aspectRatio: 1 / ratio,
            movable: false,
            rotable: false,
            scalable: false,
            ready: function ready(event) {
              console.log('Crop ready');
            }
          });
          $('.modal-footer > .ok', modal).click(function () {
            var img = new Image();
            img.src = cropper.getCroppedCanvas({
              maxWidth: maxWidth,
              maxHeight: Math.floor(maxWidth * ratio)
            }).toDataURL('image/jpeg');
            resolve(img);
            cropper.destroy();
          });
          $('.modal-footer > .cancel', modal).click(function () {
            resolve(false);
          });
          modal.on('hidden.bs.modal', function () {
            modal.remove();
            resolve(false);
            cropper.destroy();
          });
        });
      });
    });
  }
  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_commonIndividual_modelJs) {
      IndividualModel = _commonIndividual_modelJs.default;
    }, function (_commonUtilJs) {
      Util = _commonUtilJs.default;
    }, function (_browserNotifyJs) {
      notify = _browserNotifyJs.default;
    }],
    execute: function () {
      $.fn.veda_file = function (options) {
        var opts = _objectSpread(_objectSpread({}, defaults), options);
        var control = $(opts.template);
        var fileInput = control.find('input[type="file"]');
        var indicatorPercentage = $('.indicator-percentage', control);
        var indicatorSpinner = $('.indicator-spinner', control);
        var spec = opts.spec;
        var individual = opts.individual;
        var rel_uri = opts.property_uri;
        var rangeRestriction = spec && spec.hasValue('v-ui:rangeRestriction') ? spec['v-ui:rangeRestriction'][0] : undefined;
        var range = rangeRestriction ? [rangeRestriction] : new IndividualModel(rel_uri)['rdfs:range'];
        var isSingle = spec && spec.hasValue('v-ui:maxCardinality') ? spec['v-ui:maxCardinality'][0] === 1 : true;
        var accept = this.attr('accept');
        var maxWidth = this.attr('data-max-width') || 2048;
        var targetRatio = this.attr('data-ratio');
        var withUUID = this.attr('data-with-UUID');
        if (!isSingle) {
          fileInput.attr('multiple', 'multiple');
        }
        if (accept) {
          fileInput.attr('accept', accept);
        }
        var clipboardButton = control.find('.paste-btn');
        var clipboardGroup = control.find('div.input-group');
        var clipboardInput = clipboardGroup.find('input[type=\'text\']');
        var clipboardClose = clipboardGroup.find('span');
        clipboardButton.tooltip({
          container: control,
          placement: 'top',
          trigger: 'hover',
          title: 'Приложить файл из буфера обмена'
        });
        clipboardInput.tooltip({
          container: control,
          placement: 'top',
          trigger: 'hover',
          title: 'Выполните вставку'
        });
        clipboardButton.click(function () {
          clipboardButton.hide();
          clipboardGroup.show();
          clipboardInput.focus();
        });
        clipboardClose.click(function () {
          clipboardButton.show();
          clipboardGroup.hide();
        });
        function pasteListener(event) {
          if (event.clipboardData != undefined && event.clipboardData.files.length > 0) {
            fileInput[0].files = event.clipboardData.files;
            fileInput.change();
          }
          event.preventDefault();
        }
        clipboardInput[0].addEventListener('paste', pasteListener);
        var progress = function progress(progressEvent) {
          if (progressEvent.lengthComputable) {
            try {
              var percentComplete = Math.round(progressEvent.loaded / progressEvent.total * 100);
              indicatorPercentage.text(percentComplete + '%').show();
            } catch (error) {
              console.error('Progress indicator failed');
            }
          } else {
            indicatorSpinner.show();
          }
        };
        var createFileIndividual = function createFileIndividual(file, name, parent, isThumbnail) {
          var fileName = file.name || name;
          var uri = Util.guid();
          var path = '/' + new Date().toISOString().substring(0, 10).split('-').join('/');
          var fileIndividual = new IndividualModel();
          fileIndividual['rdf:type'] = range;
          fileIndividual['v-s:fileName'] = [fileName];
          fileIndividual['rdfs:label'] = [fileName];
          fileIndividual['v-s:fileSize'] = [file.size];
          fileIndividual['v-s:fileUri'] = [uri];
          fileIndividual['v-s:filePath'] = [path];
          fileIndividual['v-s:parent'] = [parent];
          fileIndividual['v-s:backwardTarget'] = [parent];
          fileIndividual['v-s:canRead'] = [true];
          fileIndividual['v-s:canUpdate'] = [true];
          fileIndividual['v-s:canDelete'] = [true];
          fileIndividual.file = file;
          if (isThumbnail) {
            fileIndividual['v-s:backwardProperty'] = ['v-s:thumbnail'];
          } else {
            fileIndividual['v-s:backwardProperty'] = [rel_uri];
            if (withUUID == 'true') {
              fileIndividual['v-s:uid'] = [crypto.randomUUID()];
              console.log(fileIndividual['v-s:uid'][0]);
            }
          }
          return new Promise(function (resolve, reject) {
            // If file is image && !thumbnail
            if (file.name && /^(?!thumbnail-).+\.(jpg|jpeg|gif|png|bmp|svg)$/i.test(file.name)) {
              loadImage(file).then(function (image) {
                if (targetRatio) {
                  var curRatio = image.height / image.width;
                  if (!(targetRatio - 0.1 < curRatio && curRatio < targetRatio + 0.1)) {
                    return cropImage(image, targetRatio, maxWidth);
                  }
                }
                return image;
              }).then(function (image) {
                if (image === false) {
                  reject(Error('Cropper canceled'));
                } else {
                  file = image;
                  return resizeImage(image, 256).then(function (thumbnail) {
                    createFileIndividual(thumbnail, 'thumbnail-' + fileName, fileIndividual, true).then(function (thumbnailIndividual) {
                      fileIndividual['v-s:thumbnail'] = [thumbnailIndividual];
                      resolve(fileIndividual);
                    });
                  });
                }
              });
            } else {
              resolve(fileIndividual);
            }
          }).then(function () {
            return uploadFile({
              file: file,
              path: path,
              uri: uri,
              progress: progress
            });
          }).then(function () {
            return isThumbnail ? fileIndividual.save() : fileIndividual;
          }).catch(function (error) {
            notify('danger', error);
          });
        };
        fileInput.change(function (e) {
          var self = e.delegateTarget;
          var fileIndividualPromises = [];
          for (var i = 0, file; i < self.files.length; i++) {
            file = self.files[i];
            var fileIndividualPromise = createFileIndividual(file, undefined, individual);
            fileIndividualPromises.push(fileIndividualPromise);
          }
          if (!fileIndividualPromises.length) {
            return;
          }
          control.addClass('disabled');
          fileInput.attr('disabled', 'disabled');
          Promise.all(fileIndividualPromises).then(function (fileIndividuals) {
            control.removeClass('disabled');
            fileInput.removeAttr('disabled');
            self.value = '';
            indicatorSpinner.empty().hide();
            indicatorPercentage.empty().hide();
            if (isSingle) {
              individual.set(rel_uri, fileIndividuals);
            } else {
              individual.addValue(rel_uri, fileIndividuals);
            }
          }).catch(function (error) {
            console.error('Files individuals save failed');
          }).then(function () {
            control.removeClass('disabled');
            fileInput.removeAttr('disabled');
          });
        });
        this.on('view edit search', function (e) {
          e.stopPropagation();
        });
        this.append(control);
        return this;
      };
      defaults = {
        template: "\n<div style=\"display:flex\">\n  <label class=\"btn btn-default\">\n    Browse...\n    <strong class=\"indicator-percentage\"></strong>\n    <span class=\"indicator-spinner fa fa-spinner fa-pulse fa-lg fa-fw text-info\" style=\"display:none\"></span>\n    <input type=\"file\" style=\"display:none\"/>\n  </label>\n  <label style=\"margin-left:5px;\" class=\"paste-btn btn btn-default\">\n    <span class=\"glyphicon glyphicon-paste\"></span>\n  </label>\n  <div class=\"input-group\" style=\"margin-left:5px; display:none\">\n    <input type=\"text\" class=\"form-control\"/>\n    <span class=\"input-group-btn\">\n      <button class=\"btn btn-default\">&#10005;</button>\n    </span>\n  </div>\n</div>\n  "
      };
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ1cGxvYWRGaWxlIiwiX3JlZiIsInJldHJ5IiwiZmlsZSIsInBhdGgiLCJ1cmkiLCJwcm9ncmVzcyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZG9uZSIsInhociIsInN0YXR1cyIsIkVycm9yIiwicmVzcG9uc2UiLCJyZXNwb25zZVRleHQiLCJmYWlsIiwiWE1MSHR0cFJlcXVlc3QiLCJmZCIsIkZvcm1EYXRhIiwib3BlbiIsInRpbWVvdXQiLCJ1cGxvYWQiLCJvbnByb2dyZXNzIiwib25sb2FkIiwib25lcnJvciIsIm9uYWJvcnQiLCJvbnRpbWVvdXQiLCJhcHBlbmQiLCJfaW5zdGFuY2VvZiIsIkZpbGUiLCJJbWFnZSIsInNyYyIsInNlbmQiLCJjYXRjaCIsImVycm9yIiwiY29uc29sZSIsImxvZyIsImxvYWRJbWFnZSIsImltYWdlRmlsZSIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJlIiwiaW1hZ2UiLCJ0YXJnZXQiLCJyZXN1bHQiLCJyZWFkQXNEYXRhVVJMIiwicmVzaXplSW1hZ2UiLCJtYXhXaWR0aCIsIndpZHRoIiwidGVtcCIsIiQiLCJfY29udGV4dCIsImltcG9ydCIsInRoZW4iLCJjcm9wcGVyTW9kdWxlIiwiQ3JvcHBlciIsImRlZmF1bHQiLCJjcm9wcGVyU3R5bGUiLCJzdHlsZVNoZWV0IiwiZG9jdW1lbnQiLCJhZG9wdGVkU3R5bGVTaGVldHMiLCJjb25jYXQiLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJjcm9wcGVyIiwiYXV0b0Nyb3AiLCJyZWFkeSIsImV2ZW50IiwicmF0aW8iLCJoZWlnaHQiLCJyZXNpemVkIiwiZ2V0Q3JvcHBlZENhbnZhcyIsIm1heEhlaWdodCIsIk1hdGgiLCJmbG9vciIsInRvRGF0YVVSTCIsImRlc3Ryb3kiLCJjcm9wSW1hZ2UiLCJpbWFnZUZvckNyb3AiLCJtb2RhbCIsImh0bWwiLCJjb250YWluZXIiLCJzdHlsZSIsImNzc1RleHQiLCJhc3BlY3RSYXRpbyIsIm1vdmFibGUiLCJyb3RhYmxlIiwic2NhbGFibGUiLCJjbGljayIsImltZyIsIm9uIiwicmVtb3ZlIiwic2V0dGVycyIsIl9qcXVlcnkiLCJfY29tbW9uSW5kaXZpZHVhbF9tb2RlbEpzIiwiSW5kaXZpZHVhbE1vZGVsIiwiX2NvbW1vblV0aWxKcyIsIlV0aWwiLCJfYnJvd3Nlck5vdGlmeUpzIiwibm90aWZ5IiwiZXhlY3V0ZSIsImZuIiwidmVkYV9maWxlIiwib3B0aW9ucyIsIm9wdHMiLCJfb2JqZWN0U3ByZWFkIiwiZGVmYXVsdHMiLCJjb250cm9sIiwidGVtcGxhdGUiLCJmaWxlSW5wdXQiLCJmaW5kIiwiaW5kaWNhdG9yUGVyY2VudGFnZSIsImluZGljYXRvclNwaW5uZXIiLCJzcGVjIiwiaW5kaXZpZHVhbCIsInJlbF91cmkiLCJwcm9wZXJ0eV91cmkiLCJyYW5nZVJlc3RyaWN0aW9uIiwiaGFzVmFsdWUiLCJ1bmRlZmluZWQiLCJyYW5nZSIsImlzU2luZ2xlIiwiYWNjZXB0IiwiYXR0ciIsInRhcmdldFJhdGlvIiwid2l0aFVVSUQiLCJjbGlwYm9hcmRCdXR0b24iLCJjbGlwYm9hcmRHcm91cCIsImNsaXBib2FyZElucHV0IiwiY2xpcGJvYXJkQ2xvc2UiLCJ0b29sdGlwIiwicGxhY2VtZW50IiwidHJpZ2dlciIsInRpdGxlIiwiaGlkZSIsInNob3ciLCJmb2N1cyIsInBhc3RlTGlzdGVuZXIiLCJjbGlwYm9hcmREYXRhIiwiZmlsZXMiLCJsZW5ndGgiLCJjaGFuZ2UiLCJwcmV2ZW50RGVmYXVsdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJwcm9ncmVzc0V2ZW50IiwibGVuZ3RoQ29tcHV0YWJsZSIsInBlcmNlbnRDb21wbGV0ZSIsInJvdW5kIiwibG9hZGVkIiwidG90YWwiLCJ0ZXh0IiwiY3JlYXRlRmlsZUluZGl2aWR1YWwiLCJuYW1lIiwicGFyZW50IiwiaXNUaHVtYm5haWwiLCJmaWxlTmFtZSIsImd1aWQiLCJEYXRlIiwidG9JU09TdHJpbmciLCJzdWJzdHJpbmciLCJzcGxpdCIsImpvaW4iLCJmaWxlSW5kaXZpZHVhbCIsInNpemUiLCJjcnlwdG8iLCJyYW5kb21VVUlEIiwidGVzdCIsImN1clJhdGlvIiwidGh1bWJuYWlsIiwidGh1bWJuYWlsSW5kaXZpZHVhbCIsInNhdmUiLCJzZWxmIiwiZGVsZWdhdGVUYXJnZXQiLCJmaWxlSW5kaXZpZHVhbFByb21pc2VzIiwiaSIsImZpbGVJbmRpdmlkdWFsUHJvbWlzZSIsInB1c2giLCJhZGRDbGFzcyIsImFsbCIsImZpbGVJbmRpdmlkdWFscyIsInJlbW92ZUNsYXNzIiwicmVtb3ZlQXR0ciIsInZhbHVlIiwiZW1wdHkiLCJzZXQiLCJhZGRWYWx1ZSIsInN0b3BQcm9wYWdhdGlvbiJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NvdXJjZS13ZWIvanMvYnJvd3Nlci9jb250cm9scy92ZWRhX2ZpbGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gRmlsZSBjb250cm9sXG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmltcG9ydCBJbmRpdmlkdWFsTW9kZWwgZnJvbSAnLi4vLi4vY29tbW9uL2luZGl2aWR1YWxfbW9kZWwuanMnO1xuXG5pbXBvcnQgVXRpbCBmcm9tICcuLi8uLi9jb21tb24vdXRpbC5qcyc7XG5cbmltcG9ydCBub3RpZnkgZnJvbSAnLi4vLi4vYnJvd3Nlci9ub3RpZnkuanMnO1xuXG5mdW5jdGlvbiB1cGxvYWRGaWxlICh7ZmlsZSwgcGF0aCwgdXJpLCBwcm9ncmVzc30sIHJldHJ5KSB7XG4gIHJldHJ5ID0gdHlwZW9mIHJldHJ5ID09PSAnbnVtYmVyJyA/IHJldHJ5IDogMjtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBkb25lID0gKCkgPT4ge1xuICAgICAgaWYgKHhoci5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWplY3QoRXJyb3IoeGhyLnJlc3BvbnNlIHx8IHhoci5yZXNwb25zZVRleHQpKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGZhaWwgPSAoKSA9PiB7XG4gICAgICByZWplY3QoRXJyb3IoJ0ZpbGUgdXBsb2FkIGZhaWxlZCcpKTtcbiAgICB9O1xuICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIGNvbnN0IGZkID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgeGhyLm9wZW4oJ1BPU1QnLCAnL2ZpbGVzJywgdHJ1ZSk7XG4gICAgeGhyLnRpbWVvdXQgPSAxMCAqIDYwICogMTAwMDtcbiAgICB4aHIudXBsb2FkLm9ucHJvZ3Jlc3MgPSBwcm9ncmVzcztcbiAgICB4aHIub25sb2FkID0gZG9uZTtcbiAgICB4aHIub25lcnJvciA9IHhoci5vbmFib3J0ID0geGhyLm9udGltZW91dCA9IGZhaWw7XG4gICAgZmQuYXBwZW5kKCdwYXRoJywgcGF0aCk7XG4gICAgZmQuYXBwZW5kKCd1cmknLCB1cmkpO1xuICAgIGlmIChmaWxlIGluc3RhbmNlb2YgRmlsZSkge1xuICAgICAgZmQuYXBwZW5kKCdmaWxlJywgZmlsZSk7XG4gICAgfSBlbHNlIGlmIChmaWxlIGluc3RhbmNlb2YgSW1hZ2UpIHtcbiAgICAgIGZkLmFwcGVuZCgnY29udGVudCcsIGZpbGUuc3JjKTtcbiAgICB9XG4gICAgeGhyLnNlbmQoZmQpO1xuICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICBjb25zb2xlLmxvZygnRmlsZSB1cGxvYWQgZXJyb3I6JywgZXJyb3IpO1xuICAgIGlmIChyZXRyeSA+IDApIHtcbiAgICAgIHJldHVybiB1cGxvYWRGaWxlKHtmaWxlLCBwYXRoLCB1cmksIHByb2dyZXNzfSwgLS1yZXRyeSk7XG4gICAgfVxuICAgIHRocm93IGVycm9yO1xuICB9KTtcbn1cblxuLyoqXG4gKiBMb2FkIGltYWdlIHRvIGJyb3dzZXJcbiAqIEBwYXJhbSB7RmlsZX0gaW1hZ2VGaWxlIC0gdmFsdWUgZnJvbSBmaWxlIGlucHV0XG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG5mdW5jdGlvbiBsb2FkSW1hZ2UgKGltYWdlRmlsZSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgaW1hZ2Uub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXNvbHZlKGltYWdlKTtcbiAgICAgIH07XG4gICAgICBpbWFnZS5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZWplY3QoIG5ldyBFcnJvcignSW1hZ2UgbG9hZCBlcnJvcicpICk7XG4gICAgICB9O1xuICAgICAgaW1hZ2Uuc3JjID0gZS50YXJnZXQucmVzdWx0O1xuICAgIH07XG4gICAgcmVhZGVyLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZWplY3QoIG5ldyBFcnJvcignRmlsZSByZWFkZXIgZXJyb3InKSApO1xuICAgIH07XG4gICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoaW1hZ2VGaWxlKTtcbiAgfSk7XG59XG5cbi8qKlxuICogUmVzaXplIGltYWdlIHRvIG1heCB3aWR0aFxuICogQHBhcmFtIHtJbWFnZX0gaW1hZ2VcbiAqIEBwYXJhbSB7bnVtYmVyfSBtYXhXaWR0aCAtIHdpZHRoIGluIHBpeGVsc1xuICogQHJldHVybiB7UHJvbWlzZX1cbiAqL1xuZnVuY3Rpb24gcmVzaXplSW1hZ2UgKGltYWdlLCBtYXhXaWR0aCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGlmIChpbWFnZS53aWR0aCA8PSBtYXhXaWR0aCkge1xuICAgICAgcmVzb2x2ZShpbWFnZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRlbXAgPSAkKCc8ZGl2PjwvZGl2PicpO1xuICAgICAgdGVtcC5hcHBlbmQoaW1hZ2UpO1xuICAgICAgaW1wb3J0KCdjcm9wcGVyL2Nyb3BwZXIubWluLmpzJykudGhlbigoY3JvcHBlck1vZHVsZSkgPT4ge1xuICAgICAgICBjb25zdCBDcm9wcGVyID0gY3JvcHBlck1vZHVsZS5kZWZhdWx0O1xuICAgICAgICBpbXBvcnQoJ2Nyb3BwZXIvY3JvcHBlci5taW4uY3NzJykudGhlbigoY3JvcHBlclN0eWxlKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc3R5bGVTaGVldCA9IGNyb3BwZXJTdHlsZS5kZWZhdWx0O1xuICAgICAgICAgIGRvY3VtZW50LmFkb3B0ZWRTdHlsZVNoZWV0cyA9IFsuLi5kb2N1bWVudC5hZG9wdGVkU3R5bGVTaGVldHMsIHN0eWxlU2hlZXRdO1xuXG4gICAgICAgICAgY29uc3QgY3JvcHBlciA9IG5ldyBDcm9wcGVyKGltYWdlLCB7XG4gICAgICAgICAgICBhdXRvQ3JvcDogZmFsc2UsXG4gICAgICAgICAgICByZWFkeTogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJhdGlvID0gaW1hZ2UuaGVpZ2h0IC8gaW1hZ2Uud2lkdGg7XG4gICAgICAgICAgICAgIGNvbnN0IHJlc2l6ZWQgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgICAgcmVzaXplZC5zcmMgPSBjcm9wcGVyLmdldENyb3BwZWRDYW52YXMoe1xuICAgICAgICAgICAgICAgIG1heFdpZHRoOiBtYXhXaWR0aCxcbiAgICAgICAgICAgICAgICBtYXhIZWlnaHQ6IE1hdGguZmxvb3IobWF4V2lkdGggKiByYXRpbyksXG4gICAgICAgICAgICAgIH0pLnRvRGF0YVVSTCgnaW1hZ2UvanBlZycpO1xuICAgICAgICAgICAgICByZXNvbHZlKHJlc2l6ZWQpO1xuICAgICAgICAgICAgICBjcm9wcGVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBDcm9wIGltYWdlXG4gKiBAcGFyYW0ge0ltYWdlfSBpbWFnZUZvckNyb3BcbiAqIEBwYXJhbSB7bnVtYmVyfSByYXRpb1xuICogQHBhcmFtIHtudW1iZXJ9IG1heFdpZHRoXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG5mdW5jdGlvbiBjcm9wSW1hZ2UgKGltYWdlRm9yQ3JvcCwgcmF0aW8sIG1heFdpZHRoKSB7XG4gIGNvbnN0IG1vZGFsID0gJCggJCgnI2NvbmZpcm0tbW9kYWwtdGVtcGxhdGUnKS5odG1sKCkgKTtcbiAgbW9kYWwubW9kYWwoKTtcbiAgJCgnYm9keScpLmFwcGVuZChtb2RhbCk7XG4gIGNvbnN0IGNvbnRhaW5lciA9ICQoJy5tb2RhbC1ib2R5JywgbW9kYWwpO1xuICBpbWFnZUZvckNyb3Auc3R5bGUuY3NzVGV4dCA9ICdkaXNwbGF5OmJsb2NrOyB3aWR0aDoxMDAlJztcbiAgY29uc3QgdGVtcCA9ICQoJzxkaXY+PC9kaXY+JykuYXBwZW5kKGltYWdlRm9yQ3JvcCk7XG4gIGNvbnRhaW5lci5hcHBlbmQodGVtcCk7XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBpbXBvcnQoJ2Nyb3BwZXIvY3JvcHBlci5taW4uanMnKS50aGVuKChjcm9wcGVyTW9kdWxlKSA9PiB7XG4gICAgICBjb25zdCBDcm9wcGVyID0gY3JvcHBlck1vZHVsZS5kZWZhdWx0O1xuICAgICAgaW1wb3J0KCdjcm9wcGVyL2Nyb3BwZXIubWluLmNzcycpLnRoZW4oKGNyb3BwZXJTdHlsZSkgPT4ge1xuICAgICAgICBjb25zdCBzdHlsZVNoZWV0ID0gY3JvcHBlclN0eWxlLmRlZmF1bHQ7XG4gICAgICAgIGRvY3VtZW50LmFkb3B0ZWRTdHlsZVNoZWV0cyA9IFsuLi5kb2N1bWVudC5hZG9wdGVkU3R5bGVTaGVldHMsIHN0eWxlU2hlZXRdO1xuXG4gICAgICAgIC8vIGluIHRlbXBsYXRlcyByYXRpbz1oL3csIGluIGNyb3AgcmF0aW89dy9oXG4gICAgICAgIGNvbnN0IGNyb3BwZXIgPSBuZXcgQ3JvcHBlcihpbWFnZUZvckNyb3AsIHtcbiAgICAgICAgICBhc3BlY3RSYXRpbzogMSAvIHJhdGlvLFxuICAgICAgICAgIG1vdmFibGU6IGZhbHNlLFxuICAgICAgICAgIHJvdGFibGU6IGZhbHNlLFxuICAgICAgICAgIHNjYWxhYmxlOiBmYWxzZSxcbiAgICAgICAgICByZWFkeTogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQ3JvcCByZWFkeScpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5tb2RhbC1mb290ZXIgPiAub2snLCBtb2RhbCkuY2xpY2soKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgIGltZy5zcmMgPSBjcm9wcGVyLmdldENyb3BwZWRDYW52YXMoe1xuICAgICAgICAgICAgbWF4V2lkdGg6IG1heFdpZHRoLFxuICAgICAgICAgICAgbWF4SGVpZ2h0OiBNYXRoLmZsb29yKG1heFdpZHRoKnJhdGlvKSxcbiAgICAgICAgICB9KS50b0RhdGFVUkwoJ2ltYWdlL2pwZWcnKTtcbiAgICAgICAgICByZXNvbHZlKGltZyk7XG4gICAgICAgICAgY3JvcHBlci5kZXN0cm95KCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkKCcubW9kYWwtZm9vdGVyID4gLmNhbmNlbCcsIG1vZGFsKS5jbGljaygoKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBtb2RhbC5vbignaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIG1vZGFsLnJlbW92ZSgpO1xuICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgIGNyb3BwZXIuZGVzdHJveSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cblxuJC5mbi52ZWRhX2ZpbGUgPSBmdW5jdGlvbiAoIG9wdGlvbnMgKSB7XG4gIGNvbnN0IG9wdHMgPSB7Li4uZGVmYXVsdHMsIC4uLm9wdGlvbnN9O1xuICBjb25zdCBjb250cm9sID0gJChvcHRzLnRlbXBsYXRlKTtcbiAgY29uc3QgZmlsZUlucHV0ID0gY29udHJvbC5maW5kKCdpbnB1dFt0eXBlPVwiZmlsZVwiXScpO1xuICBjb25zdCBpbmRpY2F0b3JQZXJjZW50YWdlID0gJCgnLmluZGljYXRvci1wZXJjZW50YWdlJywgY29udHJvbCk7XG4gIGNvbnN0IGluZGljYXRvclNwaW5uZXIgPSAkKCcuaW5kaWNhdG9yLXNwaW5uZXInLCBjb250cm9sKTtcbiAgY29uc3Qgc3BlYyA9IG9wdHMuc3BlYztcbiAgY29uc3QgaW5kaXZpZHVhbCA9IG9wdHMuaW5kaXZpZHVhbDtcbiAgY29uc3QgcmVsX3VyaSA9IG9wdHMucHJvcGVydHlfdXJpO1xuICBjb25zdCByYW5nZVJlc3RyaWN0aW9uID0gc3BlYyAmJiBzcGVjLmhhc1ZhbHVlKCd2LXVpOnJhbmdlUmVzdHJpY3Rpb24nKSA/IHNwZWNbJ3YtdWk6cmFuZ2VSZXN0cmljdGlvbiddWzBdIDogdW5kZWZpbmVkO1xuICBjb25zdCByYW5nZSA9IHJhbmdlUmVzdHJpY3Rpb24gPyBbcmFuZ2VSZXN0cmljdGlvbl0gOiBuZXcgSW5kaXZpZHVhbE1vZGVsKHJlbF91cmkpWydyZGZzOnJhbmdlJ107XG4gIGNvbnN0IGlzU2luZ2xlID0gc3BlYyAmJiBzcGVjLmhhc1ZhbHVlKCd2LXVpOm1heENhcmRpbmFsaXR5JykgPyBzcGVjWyd2LXVpOm1heENhcmRpbmFsaXR5J11bMF0gPT09IDEgOiB0cnVlO1xuICBjb25zdCBhY2NlcHQgPSB0aGlzLmF0dHIoJ2FjY2VwdCcpO1xuICBjb25zdCBtYXhXaWR0aCA9IHRoaXMuYXR0cignZGF0YS1tYXgtd2lkdGgnKSB8fCAyMDQ4O1xuICBjb25zdCB0YXJnZXRSYXRpbyA9IHRoaXMuYXR0cignZGF0YS1yYXRpbycpO1xuICBjb25zdCB3aXRoVVVJRCA9IHRoaXMuYXR0cignZGF0YS13aXRoLVVVSUQnKTtcbiAgaWYgKCFpc1NpbmdsZSkge1xuICAgIGZpbGVJbnB1dC5hdHRyKCdtdWx0aXBsZScsICdtdWx0aXBsZScpO1xuICB9XG4gIGlmIChhY2NlcHQpIHtcbiAgICBmaWxlSW5wdXQuYXR0cignYWNjZXB0JywgYWNjZXB0KTtcbiAgfVxuICBjb25zdCBjbGlwYm9hcmRCdXR0b24gPSBjb250cm9sLmZpbmQoJy5wYXN0ZS1idG4nKTtcbiAgY29uc3QgY2xpcGJvYXJkR3JvdXAgPSBjb250cm9sLmZpbmQoJ2Rpdi5pbnB1dC1ncm91cCcpO1xuICBjb25zdCBjbGlwYm9hcmRJbnB1dCA9IGNsaXBib2FyZEdyb3VwLmZpbmQoJ2lucHV0W3R5cGU9XFwndGV4dFxcJ10nKTtcbiAgY29uc3QgY2xpcGJvYXJkQ2xvc2UgPSBjbGlwYm9hcmRHcm91cC5maW5kKCdzcGFuJyk7XG4gIGNsaXBib2FyZEJ1dHRvbi50b29sdGlwKHtcbiAgICBjb250YWluZXI6IGNvbnRyb2wsXG4gICAgcGxhY2VtZW50OiAndG9wJyxcbiAgICB0cmlnZ2VyOiAnaG92ZXInLFxuICAgIHRpdGxlOiAn0J/RgNC40LvQvtC20LjRgtGMINGE0LDQudC7INC40Lcg0LHRg9GE0LXRgNCwINC+0LHQvNC10L3QsCcsXG4gIH0pO1xuICBjbGlwYm9hcmRJbnB1dC50b29sdGlwKHtcbiAgICBjb250YWluZXI6IGNvbnRyb2wsXG4gICAgcGxhY2VtZW50OiAndG9wJyxcbiAgICB0cmlnZ2VyOiAnaG92ZXInLFxuICAgIHRpdGxlOiAn0JLRi9C/0L7Qu9C90LjRgtC1INCy0YHRgtCw0LLQutGDJyxcbiAgfSk7XG5cbiAgY2xpcGJvYXJkQnV0dG9uLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICBjbGlwYm9hcmRCdXR0b24uaGlkZSgpO1xuICAgIGNsaXBib2FyZEdyb3VwLnNob3coKTtcbiAgICBjbGlwYm9hcmRJbnB1dC5mb2N1cygpO1xuICB9KTtcblxuICBjbGlwYm9hcmRDbG9zZS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgY2xpcGJvYXJkQnV0dG9uLnNob3coKTtcbiAgICBjbGlwYm9hcmRHcm91cC5oaWRlKCk7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHBhc3RlTGlzdGVuZXIgKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmNsaXBib2FyZERhdGEgIT0gdW5kZWZpbmVkICYmIGV2ZW50LmNsaXBib2FyZERhdGEuZmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgZmlsZUlucHV0WzBdLmZpbGVzID0gZXZlbnQuY2xpcGJvYXJkRGF0YS5maWxlcztcbiAgICAgIGZpbGVJbnB1dC5jaGFuZ2UoKTtcbiAgICB9XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuICBjbGlwYm9hcmRJbnB1dFswXS5hZGRFdmVudExpc3RlbmVyKCdwYXN0ZScsIHBhc3RlTGlzdGVuZXIpO1xuXG4gIGNvbnN0IHByb2dyZXNzID0gZnVuY3Rpb24gKHByb2dyZXNzRXZlbnQpIHtcbiAgICBpZiAocHJvZ3Jlc3NFdmVudC5sZW5ndGhDb21wdXRhYmxlKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBwZXJjZW50Q29tcGxldGUgPSBNYXRoLnJvdW5kKHByb2dyZXNzRXZlbnQubG9hZGVkIC8gcHJvZ3Jlc3NFdmVudC50b3RhbCAqIDEwMCk7XG4gICAgICAgIGluZGljYXRvclBlcmNlbnRhZ2UudGV4dChwZXJjZW50Q29tcGxldGUgKyAnJScpLnNob3coKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1Byb2dyZXNzIGluZGljYXRvciBmYWlsZWQnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaW5kaWNhdG9yU3Bpbm5lci5zaG93KCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZUZpbGVJbmRpdmlkdWFsID0gZnVuY3Rpb24gKGZpbGUsIG5hbWUsIHBhcmVudCwgaXNUaHVtYm5haWwpIHtcbiAgICBjb25zdCBmaWxlTmFtZSA9IGZpbGUubmFtZSB8fCBuYW1lO1xuICAgIGNvbnN0IHVyaSA9IFV0aWwuZ3VpZCgpO1xuICAgIGNvbnN0IHBhdGggPSAnLycgKyBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3Vic3RyaW5nKDAsIDEwKS5zcGxpdCgnLScpLmpvaW4oJy8nKTtcbiAgICBjb25zdCBmaWxlSW5kaXZpZHVhbCA9IG5ldyBJbmRpdmlkdWFsTW9kZWwoKTtcbiAgICBmaWxlSW5kaXZpZHVhbFsncmRmOnR5cGUnXSA9IHJhbmdlO1xuICAgIGZpbGVJbmRpdmlkdWFsWyd2LXM6ZmlsZU5hbWUnXSA9IFtmaWxlTmFtZV07XG4gICAgZmlsZUluZGl2aWR1YWxbJ3JkZnM6bGFiZWwnXSA9IFtmaWxlTmFtZV07XG4gICAgZmlsZUluZGl2aWR1YWxbJ3YtczpmaWxlU2l6ZSddID0gW2ZpbGUuc2l6ZV07XG4gICAgZmlsZUluZGl2aWR1YWxbJ3YtczpmaWxlVXJpJ10gPSBbdXJpXTtcbiAgICBmaWxlSW5kaXZpZHVhbFsndi1zOmZpbGVQYXRoJ10gPSBbcGF0aF07XG4gICAgZmlsZUluZGl2aWR1YWxbJ3YtczpwYXJlbnQnXSA9IFtwYXJlbnRdO1xuICAgIGZpbGVJbmRpdmlkdWFsWyd2LXM6YmFja3dhcmRUYXJnZXQnXSA9IFtwYXJlbnRdO1xuICAgIGZpbGVJbmRpdmlkdWFsWyd2LXM6Y2FuUmVhZCddID0gW3RydWVdO1xuICAgIGZpbGVJbmRpdmlkdWFsWyd2LXM6Y2FuVXBkYXRlJ10gPSBbdHJ1ZV07XG4gICAgZmlsZUluZGl2aWR1YWxbJ3YtczpjYW5EZWxldGUnXSA9IFt0cnVlXTtcbiAgICBmaWxlSW5kaXZpZHVhbC5maWxlID0gZmlsZTtcbiAgICBpZiAoaXNUaHVtYm5haWwpIHtcbiAgICAgIGZpbGVJbmRpdmlkdWFsWyd2LXM6YmFja3dhcmRQcm9wZXJ0eSddID0gWyd2LXM6dGh1bWJuYWlsJ107XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbGVJbmRpdmlkdWFsWyd2LXM6YmFja3dhcmRQcm9wZXJ0eSddID0gW3JlbF91cmldO1xuICAgICAgaWYgKHdpdGhVVUlEID09ICd0cnVlJykge1xuICAgICAgICBmaWxlSW5kaXZpZHVhbFsndi1zOnVpZCddID0gW2NyeXB0by5yYW5kb21VVUlEKCldO1xuICAgICAgICBjb25zb2xlLmxvZyhmaWxlSW5kaXZpZHVhbFsndi1zOnVpZCddWzBdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIElmIGZpbGUgaXMgaW1hZ2UgJiYgIXRodW1ibmFpbFxuICAgICAgaWYgKCBmaWxlLm5hbWUgJiYgKC9eKD8hdGh1bWJuYWlsLSkuK1xcLihqcGd8anBlZ3xnaWZ8cG5nfGJtcHxzdmcpJC9pKS50ZXN0KGZpbGUubmFtZSkgKSB7XG4gICAgICAgIGxvYWRJbWFnZShmaWxlKVxuICAgICAgICAgIC50aGVuKChpbWFnZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRhcmdldFJhdGlvKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGN1clJhdGlvID0gaW1hZ2UuaGVpZ2h0IC8gaW1hZ2Uud2lkdGg7XG4gICAgICAgICAgICAgIGlmICggISgodGFyZ2V0UmF0aW8gLSAwLjEpIDwgY3VyUmF0aW8gJiYgY3VyUmF0aW8gPCAodGFyZ2V0UmF0aW8gKyAwLjEpKSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3JvcEltYWdlKGltYWdlLCB0YXJnZXRSYXRpbywgbWF4V2lkdGgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaW1hZ2U7XG4gICAgICAgICAgfSkudGhlbigoaW1hZ2UpID0+IHtcbiAgICAgICAgICAgIGlmIChpbWFnZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgcmVqZWN0KEVycm9yKCdDcm9wcGVyIGNhbmNlbGVkJykpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZmlsZSA9IGltYWdlO1xuICAgICAgICAgICAgICByZXR1cm4gcmVzaXplSW1hZ2UoaW1hZ2UsIDI1NikudGhlbigodGh1bWJuYWlsKSA9PiB7XG4gICAgICAgICAgICAgICAgY3JlYXRlRmlsZUluZGl2aWR1YWwodGh1bWJuYWlsLCAndGh1bWJuYWlsLScgKyBmaWxlTmFtZSwgZmlsZUluZGl2aWR1YWwsIHRydWUpXG4gICAgICAgICAgICAgICAgICAudGhlbigodGh1bWJuYWlsSW5kaXZpZHVhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBmaWxlSW5kaXZpZHVhbFsndi1zOnRodW1ibmFpbCddID0gW3RodW1ibmFpbEluZGl2aWR1YWxdO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZpbGVJbmRpdmlkdWFsKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoZmlsZUluZGl2aWR1YWwpO1xuICAgICAgfVxuICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgcmV0dXJuIHVwbG9hZEZpbGUoe2ZpbGUsIHBhdGgsIHVyaSwgcHJvZ3Jlc3N9KTtcbiAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgIHJldHVybiBpc1RodW1ibmFpbCA/IGZpbGVJbmRpdmlkdWFsLnNhdmUoKSA6IGZpbGVJbmRpdmlkdWFsO1xuICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgbm90aWZ5KCdkYW5nZXInLCBlcnJvcik7XG4gICAgfSk7XG4gIH07XG5cbiAgZmlsZUlucHV0LmNoYW5nZSgoZSkgPT4ge1xuICAgIGNvbnN0IHNlbGYgPSBlLmRlbGVnYXRlVGFyZ2V0O1xuICAgIGNvbnN0IGZpbGVJbmRpdmlkdWFsUHJvbWlzZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMCwgZmlsZTsgaSA8IHNlbGYuZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZpbGUgPSBzZWxmLmZpbGVzW2ldO1xuICAgICAgY29uc3QgZmlsZUluZGl2aWR1YWxQcm9taXNlID0gY3JlYXRlRmlsZUluZGl2aWR1YWwoZmlsZSwgdW5kZWZpbmVkLCBpbmRpdmlkdWFsKTtcbiAgICAgIGZpbGVJbmRpdmlkdWFsUHJvbWlzZXMucHVzaChmaWxlSW5kaXZpZHVhbFByb21pc2UpO1xuICAgIH1cbiAgICBpZiAoIWZpbGVJbmRpdmlkdWFsUHJvbWlzZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnRyb2wuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgZmlsZUlucHV0LmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgUHJvbWlzZS5hbGwoZmlsZUluZGl2aWR1YWxQcm9taXNlcylcbiAgICAgIC50aGVuKChmaWxlSW5kaXZpZHVhbHMpID0+IHtcbiAgICAgICAgY29udHJvbC5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgZmlsZUlucHV0LnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG4gICAgICAgIHNlbGYudmFsdWUgPSAnJztcbiAgICAgICAgaW5kaWNhdG9yU3Bpbm5lci5lbXB0eSgpLmhpZGUoKTtcbiAgICAgICAgaW5kaWNhdG9yUGVyY2VudGFnZS5lbXB0eSgpLmhpZGUoKTtcbiAgICAgICAgaWYgKGlzU2luZ2xlKSB7XG4gICAgICAgICAgaW5kaXZpZHVhbC5zZXQocmVsX3VyaSwgZmlsZUluZGl2aWR1YWxzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpbmRpdmlkdWFsLmFkZFZhbHVlKHJlbF91cmksIGZpbGVJbmRpdmlkdWFscyk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZpbGVzIGluZGl2aWR1YWxzIHNhdmUgZmFpbGVkJyk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBjb250cm9sLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICBmaWxlSW5wdXQucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICB0aGlzLm9uKCd2aWV3IGVkaXQgc2VhcmNoJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICB9KTtcbiAgdGhpcy5hcHBlbmQoY29udHJvbCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gIHRlbXBsYXRlOiBgXG48ZGl2IHN0eWxlPVwiZGlzcGxheTpmbGV4XCI+XG4gIDxsYWJlbCBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiPlxuICAgIEJyb3dzZS4uLlxuICAgIDxzdHJvbmcgY2xhc3M9XCJpbmRpY2F0b3ItcGVyY2VudGFnZVwiPjwvc3Ryb25nPlxuICAgIDxzcGFuIGNsYXNzPVwiaW5kaWNhdG9yLXNwaW5uZXIgZmEgZmEtc3Bpbm5lciBmYS1wdWxzZSBmYS1sZyBmYS1mdyB0ZXh0LWluZm9cIiBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPjwvc3Bhbj5cbiAgICA8aW5wdXQgdHlwZT1cImZpbGVcIiBzdHlsZT1cImRpc3BsYXk6bm9uZVwiLz5cbiAgPC9sYWJlbD5cbiAgPGxhYmVsIHN0eWxlPVwibWFyZ2luLWxlZnQ6NXB4O1wiIGNsYXNzPVwicGFzdGUtYnRuIGJ0biBidG4tZGVmYXVsdFwiPlxuICAgIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1wYXN0ZVwiPjwvc3Bhbj5cbiAgPC9sYWJlbD5cbiAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCIgc3R5bGU9XCJtYXJnaW4tbGVmdDo1cHg7IGRpc3BsYXk6bm9uZVwiPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIvPlxuICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYnRuXCI+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCI+JiMxMDAwNTs8L2J1dHRvbj5cbiAgICA8L3NwYW4+XG4gIDwvZGl2PlxuPC9kaXY+XG4gIGAsXG59O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7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