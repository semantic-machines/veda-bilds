"use strict";

System.register(["../common/ontology_model.js", "../common/user_model.js", "../common/lib/riot.js"], function (_export, _context) {
  "use strict";

  var Ontology, User, riot;
  function App(manifest) {
    riot.observable(this);
    this.ticket = this.ticket || '';
    this.ontology = {};
    this.manifest = manifest;

    // Load ontology
    this.init = function (user) {
      var _this = this;
      var ontology = new Ontology();
      this.ontology = ontology;
      return ontology.init().then(function () {
        _this.user = new User(user);
        return _this.user._init();
      });
    };
  }
  _export("default", App);
  return {
    setters: [function (_commonOntology_modelJs) {
      Ontology = _commonOntology_modelJs.default;
    }, function (_commonUser_modelJs) {
      User = _commonUser_modelJs.default;
    }, function (_commonLibRiotJs) {
      riot = _commonLibRiotJs.default;
    }],
    execute: function () {}
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJBcHAiLCJtYW5pZmVzdCIsInJpb3QiLCJvYnNlcnZhYmxlIiwidGlja2V0Iiwib250b2xvZ3kiLCJpbml0IiwidXNlciIsIl90aGlzIiwiT250b2xvZ3kiLCJ0aGVuIiwiVXNlciIsIl9pbml0IiwiX2V4cG9ydCIsInNldHRlcnMiLCJfY29tbW9uT250b2xvZ3lfbW9kZWxKcyIsImRlZmF1bHQiLCJfY29tbW9uVXNlcl9tb2RlbEpzIiwiX2NvbW1vbkxpYlJpb3RKcyIsImV4ZWN1dGUiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zb3VyY2Utd2ViL2pzL2NvbW1vbi9hcHBfbW9kZWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQXBwbGljYXRpb24gbW9kZWxcblxuaW1wb3J0IE9udG9sb2d5IGZyb20gJy4uL2NvbW1vbi9vbnRvbG9neV9tb2RlbC5qcyc7XG5pbXBvcnQgVXNlciBmcm9tICcuLi9jb21tb24vdXNlcl9tb2RlbC5qcyc7XG5pbXBvcnQgcmlvdCBmcm9tICcuLi9jb21tb24vbGliL3Jpb3QuanMnO1xuXG4vKipcbiAqIEFwcGxpY2F0aW9uIG1vZGVsXG4gKiBAcGFyYW0ge09iamVjdH0gbWFuaWZlc3QgLSBhcHAgY29uZmlnXG4gKiBAcmV0dXJuIHtBcHB9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcCAobWFuaWZlc3QpIHtcbiAgcmlvdC5vYnNlcnZhYmxlKHRoaXMpO1xuICB0aGlzLnRpY2tldCA9IHRoaXMudGlja2V0IHx8ICcnO1xuICB0aGlzLm9udG9sb2d5ID0ge307XG4gIHRoaXMubWFuaWZlc3QgPSBtYW5pZmVzdDtcblxuICAvLyBMb2FkIG9udG9sb2d5XG4gIHRoaXMuaW5pdCA9IGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgY29uc3Qgb250b2xvZ3kgPSBuZXcgT250b2xvZ3koKTtcbiAgICB0aGlzLm9udG9sb2d5ID0gb250b2xvZ3k7XG4gICAgcmV0dXJuIG9udG9sb2d5LmluaXQoKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMudXNlciA9IG5ldyBVc2VyKHVzZXIpO1xuICAgICAgcmV0dXJuIHRoaXMudXNlci5faW5pdCgpO1xuICAgIH0pO1xuICB9O1xufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7RUFXZSxTQUFTQSxHQUFHQSxDQUFFQyxRQUFRLEVBQUU7SUFDckNDLElBQUksQ0FBQ0MsVUFBVSxDQUFDLElBQUksQ0FBQztJQUNyQixJQUFJLENBQUNDLE1BQU0sR0FBRyxJQUFJLENBQUNBLE1BQU0sSUFBSSxFQUFFO0lBQy9CLElBQUksQ0FBQ0MsUUFBUSxHQUFHLENBQUMsQ0FBQztJQUNsQixJQUFJLENBQUNKLFFBQVEsR0FBR0EsUUFBUTs7SUFFeEI7SUFDQSxJQUFJLENBQUNLLElBQUksR0FBRyxVQUFVQyxJQUFJLEVBQUU7TUFBQSxJQUFBQyxLQUFBO01BQzFCLElBQU1ILFFBQVEsR0FBRyxJQUFJSSxRQUFRLEVBQUU7TUFDL0IsSUFBSSxDQUFDSixRQUFRLEdBQUdBLFFBQVE7TUFDeEIsT0FBT0EsUUFBUSxDQUFDQyxJQUFJLEVBQUUsQ0FBQ0ksSUFBSSxDQUFDLFlBQU07UUFDaENGLEtBQUksQ0FBQ0QsSUFBSSxHQUFHLElBQUlJLElBQUksQ0FBQ0osSUFBSSxDQUFDO1FBQzFCLE9BQU9DLEtBQUksQ0FBQ0QsSUFBSSxDQUFDSyxLQUFLLEVBQUU7TUFDMUIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztFQUNIO0VBQUNDLE9BQUEsWUFmdUJiLEdBQUc7RUFBQTtJQUFBYyxPQUFBLGFBQUFDLHVCQUFBO01BVHBCTixRQUFRLEdBQUFNLHVCQUFBLENBQUFDLE9BQUE7SUFBQSxhQUFBQyxtQkFBQTtNQUNSTixJQUFJLEdBQUFNLG1CQUFBLENBQUFELE9BQUE7SUFBQSxhQUFBRSxnQkFBQTtNQUNKaEIsSUFBSSxHQUFBZ0IsZ0JBQUEsQ0FBQUYsT0FBQTtJQUFBO0lBQUFHLE9BQUEsV0FBQUEsQ0FBQTtFQUFBO0FBQUEifQ==