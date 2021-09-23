"use strict";

require("core-js/modules/es.number.parse-int");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es.number.constructor.js");

var INTEGER_REGEX = /^\d*$/;

function npi(msg) {
  return this.test({
    name: 'npi',
    exclusive: true,
    message: msg || 'This field is invalid.',
    test: function test(value) {
      if (!value) return true;
      value += '';

      if (!INTEGER_REGEX.test(value) || value.length !== 10) {
        return false;
      }

      var firstDigit = value.charAt(0);

      if (['1', '2', '3', '4'].indexOf(firstDigit) < 0) {
        return false;
      }

      var digit = Number.parseInt(value.charAt(9), 10);
      value = value.substring(0, 9);
      value = "80840".concat(value);
      var alternate = true;
      var total = 0;

      for (var i = value.length; i > 0; i--) {
        var next = Number.parseInt(value.charAt(i - 1), 10);

        if (alternate) {
          next *= 2;

          if (next > 9) {
            next = next % 10 + 1;
          }
        }

        total += next;
        alternate = !alternate;
      }

      var roundUp = Math.ceil(total / 10) * 10;
      var calculatedCheck = roundUp - total;
      return calculatedCheck === digit;
    }
  });
}

var _default = npi;
exports["default"] = _default;