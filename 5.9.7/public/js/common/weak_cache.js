"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var WeakCache;
  function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  return {
    setters: [],
    execute: function () {
      /**
       * @module WeakCache
       */
      /**
       * Represents a weak cache for storing key-value pairs.
       * The cache is weak and allows the garbage collector to free up memory for values that are no longer referenced.
       * @class
       */
      _export("default", WeakCache = /*#__PURE__*/function () {
        /**
         * Creates a new instance of WeakCache.
         * @constructor
         */
        function WeakCache() {
          _classCallCheck(this, WeakCache);
          this.storage = new Map();
        }

        /**
         * Checks if the cache contains a value associated with the provided key.
         * @param {any} key - The key to check.
         * @returns {boolean} Returns `true` if the cache contains the key, otherwise `false`.
         */
        _createClass(WeakCache, [{
          key: "has",
          value: function has(key) {
            if (this.storage.has(key)) {
              var cachedRef = this.storage.get(key);
              var cached = cachedRef.deref();
              if (cached) {
                return true;
              } else {
                this.storage.delete(key);
                return false;
              }
            }
            return false;
          }

          /**
           * Retrieves the value associated with the provided key from the cache.
           * @param {any} key - The key to retrieve.
           * @returns {any} The value associated with the key, or `undefined` if the key is not found or the value has been garbage collected.
           */
        }, {
          key: "get",
          value: function get(key) {
            if (this.storage.has(key)) {
              var cachedRef = this.storage.get(key);
              var cached = cachedRef.deref();
              if (cached) {
                return cached;
              } else {
                this.storage.delete(key);
              }
            }
            return undefined;
          }

          /**
           * Sets the value associated with the provided key in the cache.
           * @param {any} key - The key to set.
           * @param {any} value - The value to be stored in the cache.
           */
        }, {
          key: "set",
          value: function set(key, value) {
            this.storage.set(key, new WeakRef(value));
          }

          /**
           * Deletes the value associated with the provided key from the cache.
           * @param {any} key - The key to delete.
           */
        }, {
          key: "delete",
          value: function _delete(key) {
            this.storage.delete(key);
          }

          /**
           * Clears the entire cache by removing all key-value pairs.
           */
        }, {
          key: "clear",
          value: function clear() {
            this.storage.clear();
          }

          /**
           * Retrieves an iterator for the keys in the cache.
           * @returns {IterableIterator<any>} An iterator for the keys in the cache.
           */
        }, {
          key: "keys",
          value: function keys() {
            return this.storage.keys();
          }
        }]);
        return WeakCache;
      }());
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZXhwb3J0IiwiV2Vha0NhY2hlIiwiX2NsYXNzQ2FsbENoZWNrIiwic3RvcmFnZSIsIk1hcCIsIl9jcmVhdGVDbGFzcyIsImtleSIsInZhbHVlIiwiaGFzIiwiY2FjaGVkUmVmIiwiZ2V0IiwiY2FjaGVkIiwiZGVyZWYiLCJkZWxldGUiLCJ1bmRlZmluZWQiLCJzZXQiLCJXZWFrUmVmIiwiX2RlbGV0ZSIsImNsZWFyIiwia2V5cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS13ZWIvanMvY29tbW9uL3dlYWtfY2FjaGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbW9kdWxlIFdlYWtDYWNoZVxuICovXG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHdlYWsgY2FjaGUgZm9yIHN0b3Jpbmcga2V5LXZhbHVlIHBhaXJzLlxuICogVGhlIGNhY2hlIGlzIHdlYWsgYW5kIGFsbG93cyB0aGUgZ2FyYmFnZSBjb2xsZWN0b3IgdG8gZnJlZSB1cCBtZW1vcnkgZm9yIHZhbHVlcyB0aGF0IGFyZSBubyBsb25nZXIgcmVmZXJlbmNlZC5cbiAqIEBjbGFzc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWFrQ2FjaGUge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBXZWFrQ2FjaGUuXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zdG9yYWdlID0gbmV3IE1hcCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgY2FjaGUgY29udGFpbnMgYSB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggdGhlIHByb3ZpZGVkIGtleS5cbiAgICogQHBhcmFtIHthbnl9IGtleSAtIFRoZSBrZXkgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgY2FjaGUgY29udGFpbnMgdGhlIGtleSwgb3RoZXJ3aXNlIGBmYWxzZWAuXG4gICAqL1xuICBoYXMoa2V5KSB7XG4gICAgaWYgKHRoaXMuc3RvcmFnZS5oYXMoa2V5KSkge1xuICAgICAgY29uc3QgY2FjaGVkUmVmID0gdGhpcy5zdG9yYWdlLmdldChrZXkpO1xuICAgICAgY29uc3QgY2FjaGVkID0gY2FjaGVkUmVmLmRlcmVmKCk7XG4gICAgICBpZiAoY2FjaGVkKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdG9yYWdlLmRlbGV0ZShrZXkpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgdGhlIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCB0aGUgcHJvdmlkZWQga2V5IGZyb20gdGhlIGNhY2hlLlxuICAgKiBAcGFyYW0ge2FueX0ga2V5IC0gVGhlIGtleSB0byByZXRyaWV2ZS5cbiAgICogQHJldHVybnMge2FueX0gVGhlIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCB0aGUga2V5LCBvciBgdW5kZWZpbmVkYCBpZiB0aGUga2V5IGlzIG5vdCBmb3VuZCBvciB0aGUgdmFsdWUgaGFzIGJlZW4gZ2FyYmFnZSBjb2xsZWN0ZWQuXG4gICAqL1xuICBnZXQoa2V5KSB7XG4gICAgaWYgKHRoaXMuc3RvcmFnZS5oYXMoa2V5KSkge1xuICAgICAgY29uc3QgY2FjaGVkUmVmID0gdGhpcy5zdG9yYWdlLmdldChrZXkpO1xuICAgICAgY29uc3QgY2FjaGVkID0gY2FjaGVkUmVmLmRlcmVmKCk7XG4gICAgICBpZiAoY2FjaGVkKSB7XG4gICAgICAgIHJldHVybiBjYWNoZWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0b3JhZ2UuZGVsZXRlKGtleSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIHRoZSBwcm92aWRlZCBrZXkgaW4gdGhlIGNhY2hlLlxuICAgKiBAcGFyYW0ge2FueX0ga2V5IC0gVGhlIGtleSB0byBzZXQuXG4gICAqIEBwYXJhbSB7YW55fSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBiZSBzdG9yZWQgaW4gdGhlIGNhY2hlLlxuICAgKi9cbiAgc2V0KGtleSwgdmFsdWUpIHtcbiAgICB0aGlzLnN0b3JhZ2Uuc2V0KGtleSwgbmV3IFdlYWtSZWYodmFsdWUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGVzIHRoZSB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggdGhlIHByb3ZpZGVkIGtleSBmcm9tIHRoZSBjYWNoZS5cbiAgICogQHBhcmFtIHthbnl9IGtleSAtIFRoZSBrZXkgdG8gZGVsZXRlLlxuICAgKi9cbiAgZGVsZXRlKGtleSkge1xuICAgIHRoaXMuc3RvcmFnZS5kZWxldGUoa2V5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIGVudGlyZSBjYWNoZSBieSByZW1vdmluZyBhbGwga2V5LXZhbHVlIHBhaXJzLlxuICAgKi9cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5zdG9yYWdlLmNsZWFyKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIGFuIGl0ZXJhdG9yIGZvciB0aGUga2V5cyBpbiB0aGUgY2FjaGUuXG4gICAqIEByZXR1cm5zIHtJdGVyYWJsZUl0ZXJhdG9yPGFueT59IEFuIGl0ZXJhdG9yIGZvciB0aGUga2V5cyBpbiB0aGUgY2FjaGUuXG4gICAqL1xuICBrZXlzKCkge1xuICAgIHJldHVybiB0aGlzLnN0b3JhZ2Uua2V5cygpO1xuICB9XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztNQUFBO0FBQ0E7QUFDQTtNQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7TUFKQUEsT0FBQSxZQUtxQkMsU0FBUztRQUM1QjtBQUNGO0FBQ0E7QUFDQTtRQUNFLFNBQUFBLFVBQUEsRUFBYztVQUFBQyxlQUFBLE9BQUFELFNBQUE7VUFDWixJQUFJLENBQUNFLE9BQU8sR0FBRyxJQUFJQyxHQUFHLEVBQUU7UUFDMUI7O1FBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtRQUpFQyxZQUFBLENBQUFKLFNBQUE7VUFBQUssR0FBQTtVQUFBQyxLQUFBLEVBS0EsU0FBQUMsSUFBSUYsR0FBRyxFQUFFO1lBQ1AsSUFBSSxJQUFJLENBQUNILE9BQU8sQ0FBQ0ssR0FBRyxDQUFDRixHQUFHLENBQUMsRUFBRTtjQUN6QixJQUFNRyxTQUFTLEdBQUcsSUFBSSxDQUFDTixPQUFPLENBQUNPLEdBQUcsQ0FBQ0osR0FBRyxDQUFDO2NBQ3ZDLElBQU1LLE1BQU0sR0FBR0YsU0FBUyxDQUFDRyxLQUFLLEVBQUU7Y0FDaEMsSUFBSUQsTUFBTSxFQUFFO2dCQUNWLE9BQU8sSUFBSTtjQUNiLENBQUMsTUFBTTtnQkFDTCxJQUFJLENBQUNSLE9BQU8sQ0FBQ1UsTUFBTSxDQUFDUCxHQUFHLENBQUM7Z0JBQ3hCLE9BQU8sS0FBSztjQUNkO1lBQ0Y7WUFDQSxPQUFPLEtBQUs7VUFDZDs7VUFFQTtBQUNGO0FBQ0E7QUFDQTtBQUNBO1FBSkU7VUFBQUEsR0FBQTtVQUFBQyxLQUFBLEVBS0EsU0FBQUcsSUFBSUosR0FBRyxFQUFFO1lBQ1AsSUFBSSxJQUFJLENBQUNILE9BQU8sQ0FBQ0ssR0FBRyxDQUFDRixHQUFHLENBQUMsRUFBRTtjQUN6QixJQUFNRyxTQUFTLEdBQUcsSUFBSSxDQUFDTixPQUFPLENBQUNPLEdBQUcsQ0FBQ0osR0FBRyxDQUFDO2NBQ3ZDLElBQU1LLE1BQU0sR0FBR0YsU0FBUyxDQUFDRyxLQUFLLEVBQUU7Y0FDaEMsSUFBSUQsTUFBTSxFQUFFO2dCQUNWLE9BQU9BLE1BQU07Y0FDZixDQUFDLE1BQU07Z0JBQ0wsSUFBSSxDQUFDUixPQUFPLENBQUNVLE1BQU0sQ0FBQ1AsR0FBRyxDQUFDO2NBQzFCO1lBQ0Y7WUFDQSxPQUFPUSxTQUFTO1VBQ2xCOztVQUVBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7UUFKRTtVQUFBUixHQUFBO1VBQUFDLEtBQUEsRUFLQSxTQUFBUSxJQUFJVCxHQUFHLEVBQUVDLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQ0osT0FBTyxDQUFDWSxHQUFHLENBQUNULEdBQUcsRUFBRSxJQUFJVSxPQUFPLENBQUNULEtBQUssQ0FBQyxDQUFDO1VBQzNDOztVQUVBO0FBQ0Y7QUFDQTtBQUNBO1FBSEU7VUFBQUQsR0FBQTtVQUFBQyxLQUFBLEVBSUEsU0FBQVUsUUFBT1gsR0FBRyxFQUFFO1lBQ1YsSUFBSSxDQUFDSCxPQUFPLENBQUNVLE1BQU0sQ0FBQ1AsR0FBRyxDQUFDO1VBQzFCOztVQUVBO0FBQ0Y7QUFDQTtRQUZFO1VBQUFBLEdBQUE7VUFBQUMsS0FBQSxFQUdBLFNBQUFXLE1BQUEsRUFBUTtZQUNOLElBQUksQ0FBQ2YsT0FBTyxDQUFDZSxLQUFLLEVBQUU7VUFDdEI7O1VBRUE7QUFDRjtBQUNBO0FBQ0E7UUFIRTtVQUFBWixHQUFBO1VBQUFDLEtBQUEsRUFJQSxTQUFBWSxLQUFBLEVBQU87WUFDTCxPQUFPLElBQUksQ0FBQ2hCLE9BQU8sQ0FBQ2dCLElBQUksRUFBRTtVQUM1QjtRQUFDO1FBQUEsT0FBQWxCLFNBQUE7TUFBQTtJQUFBO0VBQUE7QUFBQSJ9