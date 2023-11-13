"use strict";

System.register(["../common/veda.js", "../common/individual_model.js"], function (_export, _context) {
  "use strict";

  var veda, IndividualModel, proto;
  /**
   * Application user
   * @param {string} uri
   * @return {User}
   */
  function User(uri) {
    return IndividualModel.call(this, uri);
  }
  return {
    setters: [function (_commonVedaJs) {
      veda = _commonVedaJs.default;
    }, function (_commonIndividual_modelJs) {
      IndividualModel = _commonIndividual_modelJs.default;
    }],
    execute: function () {
      // User model
      _export("default", User);
      User.prototype = Object.create(IndividualModel.prototype);
      User.prototype.constructor = User;
      proto = User.prototype;
      proto.getLanguage = function () {
        return this.preferences && this.preferences.language ? Object.keys(this.preferences.language) : undefined;
      };
      proto._init = function () {
        var _this = this;
        return this.reset().then(this.initAspect.bind(this)).then(this.initAppointment.bind(this)).then(this.initPreferences.bind(this)).then(this.initLanguage.bind(this)).then(function () {
          if (_this.id !== 'cfg:Guest') {
            return _this.save();
          }
        }).catch(function (error) {
          console.error('User init failed');
        });
      };
      proto.initAspect = function () {
        var _this2 = this;
        var aspect_id = this.id + '_aspect';
        var aspect = this.hasValue('v-s:hasAspect') ? this['v-s:hasAspect'][0] : new IndividualModel(aspect_id);
        return aspect.reset().catch(function (error) {
          console.error('Personal aspect load failed');
          var newAspect = new IndividualModel(aspect_id);
          newAspect['rdf:type'] = 'v-s:PersonalAspect';
          newAspect['v-s:owner'] = _this2;
          newAspect['rdfs:label'] = 'PersonalAspect_' + _this2.id;
          newAspect['rdfs:comment'] = 'Create new aspect due to aspect load error\n' + error.stack;
          return _this2.id !== 'cfg:Guest' ? newAspect.save() : newAspect;
        }).catch(function (error) {
          console.error('Personal aspect save failed');
          throw error;
        }).then(function (userAspect) {
          if (!_this2.hasValue('v-s:hasAspect')) {
            _this2['v-s:hasAspect'] = userAspect;
          }
          _this2.aspect = userAspect;
        });
      };
      proto.initAppointment = function () {
        var _this3 = this;
        if (this.hasValue('v-s:defaultAppointment')) {
          veda.appointment = this['v-s:defaultAppointment'][0];
        } else if (this.hasValue('v-s:hasAppointment')) {
          this['v-s:defaultAppointment'] = [this['v-s:hasAppointment'][0]];
          veda.appointment = this['v-s:defaultAppointment'][0];
        } else {
          veda.appointment = undefined;
          return;
        }
        var setAppointment = function setAppointment() {
          var appointment = _this3.hasValue('v-s:defaultAppointment') && _this3['v-s:defaultAppointment'][0];
          if (appointment) {
            appointment.reset().then(function () {
              veda.appointment = appointment;
            });
          }
          _this3.save();
        };
        this.on('v-s:defaultAppointment', setAppointment);
        return veda.appointment.reset();
      };
      proto.initPreferences = function () {
        var _this4 = this;
        var preferences_id = this.id + '_pref';
        var preferences = this.hasValue('v-ui:hasPrefences') ? this['v-ui:hasPrefences'][0] : new IndividualModel(preferences_id);
        return preferences.reset().catch(function (error) {
          console.error('Personal preferences load failed');
          var newPreferences = new IndividualModel(preferences_id);
          newPreferences['v-s:owner'] = _this4;
          newPreferences['rdf:type'] = 'v-ui:Preferences';
          newPreferences['rdfs:label'] = 'Preferences_' + _this4.id;
          _this4['v-ui:hasPreferences'] = newPreferences;
          return _this4.id !== 'cfg:Guest' ? newPreferences.save() : newPreferences;
        }).catch(function (error) {
          console.error('Personal preferences save failed');
          throw error;
        }).then(function (userPreferences) {
          if (!_this4.hasValue('v-ui:hasPreferences')) {
            _this4['v-ui:hasPreferences'] = userPreferences;
          }
          _this4.preferences = userPreferences;
          return userPreferences;
        });
      };
      proto.initLanguage = function (preferences) {
        var _this5 = this;
        var setLanguage = function setLanguage() {
          preferences.language = preferences['v-ui:preferredLanguage'].reduce(function (acc, lang) {
            acc[lang.id.substr(lang.id.indexOf(':') + 1)] = lang;
            return acc;
          }, {});
          veda.trigger('language:changed');
        };
        var setDisplayedElements = function setDisplayedElements() {
          preferences.displayedElements = preferences['v-ui:displayedElements'][0] || 10;
        };
        var updatePreferences = function updatePreferences() {
          if (_this5.id !== 'cfg:Guest') {
            return preferences.save();
          }
        };
        if (!preferences.hasValue('v-ui:preferredLanguage') || !preferences.hasValue('v-ui:displayedElements')) {
          var defaultDisplayedElements = 10;
          var defaultLanguage = new IndividualModel('v-ui:RU');
          preferences['v-ui:preferredLanguage'] = [defaultLanguage];
          preferences['v-ui:displayedElements'] = [defaultDisplayedElements];
        }
        preferences.on('v-ui:preferredLanguage', setLanguage);
        preferences.on('v-ui:displayedElements', setDisplayedElements);
        preferences.on('v-ui:preferredLanguage v-ui:displayedElements', updatePreferences);
        setLanguage();
        setDisplayedElements();
        return updatePreferences();
      };
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJVc2VyIiwidXJpIiwiSW5kaXZpZHVhbE1vZGVsIiwiY2FsbCIsInNldHRlcnMiLCJfY29tbW9uVmVkYUpzIiwidmVkYSIsImRlZmF1bHQiLCJfY29tbW9uSW5kaXZpZHVhbF9tb2RlbEpzIiwiZXhlY3V0ZSIsIl9leHBvcnQiLCJwcm90b3R5cGUiLCJPYmplY3QiLCJjcmVhdGUiLCJjb25zdHJ1Y3RvciIsInByb3RvIiwiZ2V0TGFuZ3VhZ2UiLCJwcmVmZXJlbmNlcyIsImxhbmd1YWdlIiwia2V5cyIsInVuZGVmaW5lZCIsIl9pbml0IiwiX3RoaXMiLCJyZXNldCIsInRoZW4iLCJpbml0QXNwZWN0IiwiYmluZCIsImluaXRBcHBvaW50bWVudCIsImluaXRQcmVmZXJlbmNlcyIsImluaXRMYW5ndWFnZSIsImlkIiwic2F2ZSIsImNhdGNoIiwiZXJyb3IiLCJjb25zb2xlIiwiX3RoaXMyIiwiYXNwZWN0X2lkIiwiYXNwZWN0IiwiaGFzVmFsdWUiLCJuZXdBc3BlY3QiLCJzdGFjayIsInVzZXJBc3BlY3QiLCJfdGhpczMiLCJhcHBvaW50bWVudCIsInNldEFwcG9pbnRtZW50Iiwib24iLCJfdGhpczQiLCJwcmVmZXJlbmNlc19pZCIsIm5ld1ByZWZlcmVuY2VzIiwidXNlclByZWZlcmVuY2VzIiwiX3RoaXM1Iiwic2V0TGFuZ3VhZ2UiLCJyZWR1Y2UiLCJhY2MiLCJsYW5nIiwic3Vic3RyIiwiaW5kZXhPZiIsInRyaWdnZXIiLCJzZXREaXNwbGF5ZWRFbGVtZW50cyIsImRpc3BsYXllZEVsZW1lbnRzIiwidXBkYXRlUHJlZmVyZW5jZXMiLCJkZWZhdWx0RGlzcGxheWVkRWxlbWVudHMiLCJkZWZhdWx0TGFuZ3VhZ2UiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zb3VyY2Utd2ViL2pzL2NvbW1vbi91c2VyX21vZGVsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFVzZXIgbW9kZWxcblxuaW1wb3J0IHZlZGEgZnJvbSAnLi4vY29tbW9uL3ZlZGEuanMnO1xuaW1wb3J0IEluZGl2aWR1YWxNb2RlbCBmcm9tICcuLi9jb21tb24vaW5kaXZpZHVhbF9tb2RlbC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IFVzZXI7XG5cbi8qKlxuICogQXBwbGljYXRpb24gdXNlclxuICogQHBhcmFtIHtzdHJpbmd9IHVyaVxuICogQHJldHVybiB7VXNlcn1cbiAqL1xuZnVuY3Rpb24gVXNlciAodXJpKSB7XG4gIHJldHVybiBJbmRpdmlkdWFsTW9kZWwuY2FsbCh0aGlzLCB1cmkpO1xufVxuXG5Vc2VyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSW5kaXZpZHVhbE1vZGVsLnByb3RvdHlwZSk7XG5cblVzZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVXNlcjtcblxuY29uc3QgcHJvdG8gPSBVc2VyLnByb3RvdHlwZTtcblxucHJvdG8uZ2V0TGFuZ3VhZ2UgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnByZWZlcmVuY2VzICYmIHRoaXMucHJlZmVyZW5jZXMubGFuZ3VhZ2UgPyBPYmplY3Qua2V5cyh0aGlzLnByZWZlcmVuY2VzLmxhbmd1YWdlKSA6IHVuZGVmaW5lZDtcbn07XG5cbnByb3RvLl9pbml0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5yZXNldCgpXG4gICAgLnRoZW4odGhpcy5pbml0QXNwZWN0LmJpbmQodGhpcykpXG4gICAgLnRoZW4odGhpcy5pbml0QXBwb2ludG1lbnQuYmluZCh0aGlzKSlcbiAgICAudGhlbih0aGlzLmluaXRQcmVmZXJlbmNlcy5iaW5kKHRoaXMpKVxuICAgIC50aGVuKHRoaXMuaW5pdExhbmd1YWdlLmJpbmQodGhpcykpXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgaWYgKCB0aGlzLmlkICE9PSAnY2ZnOkd1ZXN0JyApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2F2ZSgpO1xuICAgICAgfVxuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcignVXNlciBpbml0IGZhaWxlZCcpO1xuICAgIH0pO1xufTtcblxucHJvdG8uaW5pdEFzcGVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgYXNwZWN0X2lkID0gdGhpcy5pZCArICdfYXNwZWN0JztcbiAgY29uc3QgYXNwZWN0ID0gdGhpcy5oYXNWYWx1ZSgndi1zOmhhc0FzcGVjdCcpID8gdGhpc1sndi1zOmhhc0FzcGVjdCddWzBdIDogbmV3IEluZGl2aWR1YWxNb2RlbChhc3BlY3RfaWQpO1xuICByZXR1cm4gYXNwZWN0LnJlc2V0KClcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKCdQZXJzb25hbCBhc3BlY3QgbG9hZCBmYWlsZWQnKTtcbiAgICAgIGNvbnN0IG5ld0FzcGVjdCA9IG5ldyBJbmRpdmlkdWFsTW9kZWwoYXNwZWN0X2lkKTtcbiAgICAgIG5ld0FzcGVjdFsncmRmOnR5cGUnXSA9ICd2LXM6UGVyc29uYWxBc3BlY3QnO1xuICAgICAgbmV3QXNwZWN0Wyd2LXM6b3duZXInXSA9IHRoaXM7XG4gICAgICBuZXdBc3BlY3RbJ3JkZnM6bGFiZWwnXSA9ICdQZXJzb25hbEFzcGVjdF8nICsgdGhpcy5pZDtcbiAgICAgIG5ld0FzcGVjdFsncmRmczpjb21tZW50J10gPSAnQ3JlYXRlIG5ldyBhc3BlY3QgZHVlIHRvIGFzcGVjdCBsb2FkIGVycm9yXFxuJyArIGVycm9yLnN0YWNrO1xuICAgICAgcmV0dXJuIHRoaXMuaWQgIT09ICdjZmc6R3Vlc3QnID8gbmV3QXNwZWN0LnNhdmUoKSA6IG5ld0FzcGVjdDtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1BlcnNvbmFsIGFzcGVjdCBzYXZlIGZhaWxlZCcpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfSlcbiAgICAudGhlbigodXNlckFzcGVjdCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmhhc1ZhbHVlKCd2LXM6aGFzQXNwZWN0JykpIHtcbiAgICAgICAgdGhpc1sndi1zOmhhc0FzcGVjdCddID0gdXNlckFzcGVjdDtcbiAgICAgIH1cbiAgICAgIHRoaXMuYXNwZWN0ID0gdXNlckFzcGVjdDtcbiAgICB9KTtcbn07XG5cbnByb3RvLmluaXRBcHBvaW50bWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuaGFzVmFsdWUoJ3YtczpkZWZhdWx0QXBwb2ludG1lbnQnKSkge1xuICAgIHZlZGEuYXBwb2ludG1lbnQgPSB0aGlzWyd2LXM6ZGVmYXVsdEFwcG9pbnRtZW50J11bMF07XG4gIH0gZWxzZSBpZiAodGhpcy5oYXNWYWx1ZSgndi1zOmhhc0FwcG9pbnRtZW50JykpIHtcbiAgICB0aGlzWyd2LXM6ZGVmYXVsdEFwcG9pbnRtZW50J10gPSBbdGhpc1sndi1zOmhhc0FwcG9pbnRtZW50J11bMF1dO1xuICAgIHZlZGEuYXBwb2ludG1lbnQgPSB0aGlzWyd2LXM6ZGVmYXVsdEFwcG9pbnRtZW50J11bMF07XG4gIH0gZWxzZSB7XG4gICAgdmVkYS5hcHBvaW50bWVudCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3Qgc2V0QXBwb2ludG1lbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgYXBwb2ludG1lbnQgPSB0aGlzLmhhc1ZhbHVlKCd2LXM6ZGVmYXVsdEFwcG9pbnRtZW50JykgJiYgdGhpc1sndi1zOmRlZmF1bHRBcHBvaW50bWVudCddWzBdO1xuICAgIGlmIChhcHBvaW50bWVudCkge1xuICAgICAgYXBwb2ludG1lbnQucmVzZXQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgdmVkYS5hcHBvaW50bWVudCA9IGFwcG9pbnRtZW50O1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuc2F2ZSgpO1xuICB9O1xuICB0aGlzLm9uKCd2LXM6ZGVmYXVsdEFwcG9pbnRtZW50Jywgc2V0QXBwb2ludG1lbnQpO1xuICByZXR1cm4gdmVkYS5hcHBvaW50bWVudC5yZXNldCgpO1xufTtcblxucHJvdG8uaW5pdFByZWZlcmVuY2VzID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBwcmVmZXJlbmNlc19pZCA9IHRoaXMuaWQgKyAnX3ByZWYnO1xuICBjb25zdCBwcmVmZXJlbmNlcyA9IHRoaXMuaGFzVmFsdWUoJ3YtdWk6aGFzUHJlZmVuY2VzJykgPyB0aGlzWyd2LXVpOmhhc1ByZWZlbmNlcyddWzBdIDogbmV3IEluZGl2aWR1YWxNb2RlbChwcmVmZXJlbmNlc19pZCk7XG4gIHJldHVybiBwcmVmZXJlbmNlcy5yZXNldCgpXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcignUGVyc29uYWwgcHJlZmVyZW5jZXMgbG9hZCBmYWlsZWQnKTtcbiAgICAgIGNvbnN0IG5ld1ByZWZlcmVuY2VzID0gbmV3IEluZGl2aWR1YWxNb2RlbChwcmVmZXJlbmNlc19pZCk7XG4gICAgICBuZXdQcmVmZXJlbmNlc1sndi1zOm93bmVyJ10gPSB0aGlzO1xuICAgICAgbmV3UHJlZmVyZW5jZXNbJ3JkZjp0eXBlJ10gPSAndi11aTpQcmVmZXJlbmNlcyc7XG4gICAgICBuZXdQcmVmZXJlbmNlc1sncmRmczpsYWJlbCddID0gJ1ByZWZlcmVuY2VzXycgKyB0aGlzLmlkO1xuICAgICAgdGhpc1sndi11aTpoYXNQcmVmZXJlbmNlcyddID0gbmV3UHJlZmVyZW5jZXM7XG4gICAgICByZXR1cm4gdGhpcy5pZCAhPT0gJ2NmZzpHdWVzdCcgPyBuZXdQcmVmZXJlbmNlcy5zYXZlKCkgOiBuZXdQcmVmZXJlbmNlcztcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1BlcnNvbmFsIHByZWZlcmVuY2VzIHNhdmUgZmFpbGVkJyk7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9KVxuICAgIC50aGVuKCh1c2VyUHJlZmVyZW5jZXMpID0+IHtcbiAgICAgIGlmICghdGhpcy5oYXNWYWx1ZSgndi11aTpoYXNQcmVmZXJlbmNlcycpKSB7XG4gICAgICAgIHRoaXNbJ3YtdWk6aGFzUHJlZmVyZW5jZXMnXSA9IHVzZXJQcmVmZXJlbmNlcztcbiAgICAgIH1cbiAgICAgIHRoaXMucHJlZmVyZW5jZXMgPSB1c2VyUHJlZmVyZW5jZXM7XG4gICAgICByZXR1cm4gdXNlclByZWZlcmVuY2VzO1xuICAgIH0pO1xufTtcblxucHJvdG8uaW5pdExhbmd1YWdlID0gZnVuY3Rpb24gKHByZWZlcmVuY2VzKSB7XG4gIGNvbnN0IHNldExhbmd1YWdlID0gKCkgPT4ge1xuICAgIHByZWZlcmVuY2VzLmxhbmd1YWdlID0gcHJlZmVyZW5jZXNbJ3YtdWk6cHJlZmVycmVkTGFuZ3VhZ2UnXS5yZWR1Y2UoKGFjYywgbGFuZykgPT4ge1xuICAgICAgYWNjW2xhbmcuaWQuc3Vic3RyKGxhbmcuaWQuaW5kZXhPZignOicpICsgMSldID0gbGFuZztcbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xuICAgIHZlZGEudHJpZ2dlcignbGFuZ3VhZ2U6Y2hhbmdlZCcpO1xuICB9O1xuICBjb25zdCBzZXREaXNwbGF5ZWRFbGVtZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICBwcmVmZXJlbmNlcy5kaXNwbGF5ZWRFbGVtZW50cyA9IHByZWZlcmVuY2VzWyd2LXVpOmRpc3BsYXllZEVsZW1lbnRzJ11bMF0gfHwgMTA7XG4gIH07XG4gIGNvbnN0IHVwZGF0ZVByZWZlcmVuY2VzID0gKCkgPT4ge1xuICAgIGlmICggdGhpcy5pZCAhPT0gJ2NmZzpHdWVzdCcgKSB7XG4gICAgICByZXR1cm4gcHJlZmVyZW5jZXMuc2F2ZSgpO1xuICAgIH1cbiAgfTtcbiAgaWYgKCFwcmVmZXJlbmNlcy5oYXNWYWx1ZSgndi11aTpwcmVmZXJyZWRMYW5ndWFnZScpIHx8ICFwcmVmZXJlbmNlcy5oYXNWYWx1ZSgndi11aTpkaXNwbGF5ZWRFbGVtZW50cycpKSB7XG4gICAgY29uc3QgZGVmYXVsdERpc3BsYXllZEVsZW1lbnRzID0gMTA7XG4gICAgY29uc3QgZGVmYXVsdExhbmd1YWdlID0gbmV3IEluZGl2aWR1YWxNb2RlbCgndi11aTpSVScpO1xuICAgIHByZWZlcmVuY2VzWyd2LXVpOnByZWZlcnJlZExhbmd1YWdlJ10gPSBbZGVmYXVsdExhbmd1YWdlXTtcbiAgICBwcmVmZXJlbmNlc1sndi11aTpkaXNwbGF5ZWRFbGVtZW50cyddID0gW2RlZmF1bHREaXNwbGF5ZWRFbGVtZW50c107XG4gIH1cbiAgcHJlZmVyZW5jZXMub24oJ3YtdWk6cHJlZmVycmVkTGFuZ3VhZ2UnLCBzZXRMYW5ndWFnZSk7XG4gIHByZWZlcmVuY2VzLm9uKCd2LXVpOmRpc3BsYXllZEVsZW1lbnRzJywgc2V0RGlzcGxheWVkRWxlbWVudHMpO1xuICBwcmVmZXJlbmNlcy5vbigndi11aTpwcmVmZXJyZWRMYW5ndWFnZSB2LXVpOmRpc3BsYXllZEVsZW1lbnRzJywgdXBkYXRlUHJlZmVyZW5jZXMpO1xuICBzZXRMYW5ndWFnZSgpO1xuICBzZXREaXNwbGF5ZWRFbGVtZW50cygpO1xuICByZXR1cm4gdXBkYXRlUHJlZmVyZW5jZXMoKTtcbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztFQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFDQSxTQUFTQSxJQUFJQSxDQUFFQyxHQUFHLEVBQUU7SUFDbEIsT0FBT0MsZUFBZSxDQUFDQyxJQUFJLENBQUMsSUFBSSxFQUFFRixHQUFHLENBQUM7RUFDeEM7RUFBQztJQUFBRyxPQUFBLGFBQUFDLGFBQUE7TUFaTUMsSUFBSSxHQUFBRCxhQUFBLENBQUFFLE9BQUE7SUFBQSxhQUFBQyx5QkFBQTtNQUNKTixlQUFlLEdBQUFNLHlCQUFBLENBQUFELE9BQUE7SUFBQTtJQUFBRSxPQUFBLFdBQUFBLENBQUE7TUFIdEI7TUFBQUMsT0FBQSxZQUtlVixJQUFJO01BV25CQSxJQUFJLENBQUNXLFNBQVMsR0FBR0MsTUFBTSxDQUFDQyxNQUFNLENBQUNYLGVBQWUsQ0FBQ1MsU0FBUyxDQUFDO01BRXpEWCxJQUFJLENBQUNXLFNBQVMsQ0FBQ0csV0FBVyxHQUFHZCxJQUFJO01BRTNCZSxLQUFLLEdBQUdmLElBQUksQ0FBQ1csU0FBUztNQUU1QkksS0FBSyxDQUFDQyxXQUFXLEdBQUcsWUFB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