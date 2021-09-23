"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.concat.js");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _yup = require("yup");

var _moment = _interopRequireDefault(require("moment"));

var defaultOpts = {
  format: 'MM/DD/YYYY'
};
var formats = ['YYYY-MM-DD', 'MMDDYYYY', 'YYYYMMDD', 'MM-DD-YYYY'];

var AvDateSchema = /*#__PURE__*/function (_mixed) {
  (0, _inherits2["default"])(AvDateSchema, _mixed);

  var _super = (0, _createSuper2["default"])(AvDateSchema);

  function AvDateSchema() {
    var _thisSuper, _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultOpts,
        _ref$format = _ref.format,
        format = _ref$format === void 0 ? 'MM/DD/YYYY' : _ref$format;

    (0, _classCallCheck2["default"])(this, AvDateSchema);
    _this = _super.call(this, {
      type: 'avDate'
    });
    _this.format = format;
    _this.getValidDate = _this.getValidDate.bind((0, _assertThisInitialized2["default"])(_this));

    _this.withMutation(function () {
      if (!_this.tests.some(function (test) {
        var _test$OPTIONS;

        return (test === null || test === void 0 ? void 0 : (_test$OPTIONS = test.OPTIONS) === null || _test$OPTIONS === void 0 ? void 0 : _test$OPTIONS.name) === 'typeError';
      })) {
        (0, _get2["default"])((_thisSuper = (0, _assertThisInitialized2["default"])(_this), (0, _getPrototypeOf2["default"])(AvDateSchema.prototype)), "typeError", _thisSuper).call(_thisSuper, 'Date is invalid.');
      }

      _this.transform(function mutate(value) {
        return this.getValidDate(value);
      });
    });

    return _this;
  }

  (0, _createClass2["default"])(AvDateSchema, [{
    key: "_typeCheck",
    value: function _typeCheck(value) {
      // So as long as the passed in value is defined, moment._i will contain a string value to validate.
      // If user enters a date and then removes it, should not show a typeError
      // Note: this does not prevent other tests, like isRequired, from showing messages
      // If user has touched a required field, required error message should still show
      return value.isValid() || value._i === '';
    }
  }, {
    key: "getValidDate",
    value: function getValidDate(value) {
      return (0, _moment["default"])(value, [this.format].concat(formats), true);
    }
  }, {
    key: "min",
    value: function min(_min, message) {
      var minDate = this.getValidDate(_min);
      return this.test({
        message: message || "Date must be ".concat(minDate.format(this.format), " or later."),
        name: 'min',
        exclusive: true,
        params: {
          min: _min
        },
        test: function test(value) {
          if (!_min || !minDate.isValid()) {
            return true;
          }

          return value === null || minDate.isSameOrBefore(value, 'MM/DD/YYYY');
        }
      });
    }
  }, {
    key: "max",
    value: function max(_max, message) {
      var maxDate = this.getValidDate(_max);
      return this.test({
        message: message || "Date must be ".concat(maxDate.format(this.format), " or earlier."),
        name: 'max',
        exclusive: true,
        params: {
          max: _max
        },
        test: function test(value) {
          if (!_max || !maxDate.isValid()) {
            return true;
          }

          return value === null || maxDate.isSameOrAfter(value);
        }
      });
    }
  }, {
    key: "isRequired",
    value: function isRequired() {
      var _isRequired = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      var msg = arguments.length > 1 ? arguments[1] : undefined;
      return this.test({
        name: 'isRequired',
        exclusive: true,
        message: msg || 'This field is required.',
        test: function test(value) {
          if (!_isRequired) {
            return true;
          }

          return value !== undefined;
        }
      });
    }
  }, {
    key: "between",
    value: function between(min, max, msg) {
      var inclusivity = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '()';
      var minDate = this.getValidDate(min);
      var maxDate = this.getValidDate(max); // Can't use arrow function because we rely on 'this' referencing yup's internals

      return this.test({
        name: 'between',
        exclusive: true,
        // Validation errors don't stack
        // NOTE: Intentional use of single quotes - yup will handle the string interpolation
        message: msg || "Date must be between ".concat(minDate.format(this.format), " and ").concat(maxDate.format(this.format), "."),
        test: function test(value) {
          if (!value || !min || !max || !minDate.isValid() || !maxDate.isValid()) {
            return true;
          }

          return value.isBetween(minDate, maxDate, undefined, inclusivity);
        }
      });
    }
  }]);
  return AvDateSchema;
}(_yup.mixed);

exports["default"] = AvDateSchema;