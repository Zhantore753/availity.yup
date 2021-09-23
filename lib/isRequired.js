"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function isRequired() {
  var isRequired = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var msg = arguments.length > 1 ? arguments[1] : undefined;
  return this.test({
    name: 'isRequired',
    exclusive: true,
    message: msg || 'This field is required.',
    test: function test(value) {
      if (isRequired) {
        if (typeof value === 'number') {
          return value !== undefined;
        }

        if (Array.isArray(value)) {
          return value.length > 0;
        } // String ( If you want to check for null add nullable )


        return value !== undefined && value !== '';
      }

      return true;
    }
  });
}

var _default = isRequired;
exports["default"] = _default;