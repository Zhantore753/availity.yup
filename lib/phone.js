"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var NANP_REGEXP = /^(\+?1[\s.-]?)?\(?[2-9]\d{2}[\s).-]?\s?[2-9]\d{2}[\s.-]?\d{4}$/;

function phone(msg) {
  return this.test({
    name: 'phone',
    exclusive: true,
    message: msg || 'This field is invalid',
    test: function test(value) {
      if (!value) return true;
      return NANP_REGEXP.test(value);
    }
  });
}

var _default = phone;
exports["default"] = _default;