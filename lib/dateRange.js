"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es.array.concat.js");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _moment = _interopRequireDefault(require("moment"));

var _get = _interopRequireDefault(require("lodash/get"));

var _yup = require("yup");

var _mergeOptionsEs = _interopRequireDefault(require("merge-options-es5"));

var defaultOptions = {
  startKey: 'startDate',
  endKey: 'endDate',
  format: 'MM/DD/YYYY'
};
var defaultValue = {};
var formats = ['YYYY-MM-DD', 'MMDDYYYY', 'YYYYMMDD'];

var DateRangeSchema = /*#__PURE__*/function (_mixed) {
  (0, _inherits2["default"])(DateRangeSchema, _mixed);

  var _super = (0, _createSuper2["default"])(DateRangeSchema);

  function DateRangeSchema(options) {
    var _this;

    (0, _classCallCheck2["default"])(this, DateRangeSchema);
    _this = _super.call(this, {
      type: 'dateRange'
    });

    var _merge = (0, _mergeOptionsEs["default"])({}, defaultOptions, options),
        startKey = _merge.startKey,
        endKey = _merge.endKey,
        format = _merge.format;

    _this.startKey = startKey;
    _this.endKey = endKey;
    _this.format = format;
    _this.getValidDate = _this.getValidDate.bind((0, _assertThisInitialized2["default"])(_this));

    _this.withMutation(function () {
      _this.transform(function mutate(value) {
        var start = (0, _get["default"])(value, startKey);
        var end = (0, _get["default"])(value, endKey);
        var startDate;
        var endDate;

        if (start) {
          startDate = this.getValidDate(start);
        }

        if (end) {
          endDate = this.getValidDate(end);
        }

        return {
          startDate: startDate,
          endDate: endDate
        };
      });
    });

    return (0, _possibleConstructorReturn2["default"])(_this, _this.test({
      message: 'Start date must come before end date.',
      name: 'startBeforeEnd',
      exclusive: true,
      test: function test() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultValue,
            startDate = _ref.startDate,
            endDate = _ref.endDate;

        if (!startDate || !endDate) {
          return true;
        }

        return startDate.isSameOrBefore(endDate);
      }
    }));
  }

  (0, _createClass2["default"])(DateRangeSchema, [{
    key: "getValidDate",
    value: function getValidDate(value) {
      return (0, _moment["default"])(value, [this.format].concat(formats), true);
    }
  }, {
    key: "distance",
    value: function distance() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultValue,
          _ref2$min = _ref2.min;

      _ref2$min = _ref2$min === void 0 ? {} : _ref2$min;
      var minValue = _ref2$min.value,
          _ref2$min$units = _ref2$min.units,
          minUnits = _ref2$min$units === void 0 ? 'day' : _ref2$min$units,
          minErrorMessage = _ref2$min.errorMessage,
          _ref2$max = _ref2.max;
      _ref2$max = _ref2$max === void 0 ? {} : _ref2$max;
      var maxValue = _ref2$max.value,
          _ref2$max$units = _ref2$max.units,
          maxUnits = _ref2$max$units === void 0 ? 'day' : _ref2$max$units,
          maxErrorMessage = _ref2$max.errorMessage;
      return this.test({
        name: 'distance',
        exclusive: true,
        test: function test() {
          var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultValue,
              endDate = _ref3.endDate,
              startDate = _ref3.startDate;

          if (!minValue && !maxValue || !startDate || !endDate) return true;

          if (maxValue && endDate.isAfter(startDate.add(maxValue, maxUnits), 'day')) {
            return new _yup.ValidationError(maxErrorMessage || "The end date must be within ".concat(maxValue, " ").concat(maxUnits).concat(maxValue > 1 ? 's' : '', " of the start date"), {
              startDate: startDate,
              endDate: endDate
            }, this.path);
          }

          if (minValue && endDate.isBefore(startDate.add(minValue, minUnits), 'day')) {
            return new _yup.ValidationError(minErrorMessage || "The end date must be greater than ".concat(minValue, " ").concat(minUnits).concat(minValue > 1 ? 's' : '', " of the start date"), {
              startDate: startDate,
              endDate: endDate
            }, this.path);
          }

          return true;
        }
      });
    }
  }, {
    key: "min",
    value: function min(_min, message) {
      var format = this.format;
      var minDate = this.getValidDate(_min);
      return this.test({
        message: message || "Date Range must start on or after ".concat(minDate.format(format)),
        name: 'min',
        exclusive: true,
        params: {
          min: _min
        },
        test: function test() {
          var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultValue,
              startDate = _ref4.startDate;

          if (!startDate || !_min) {
            return true;
          }

          return minDate.isValid() && minDate.isSameOrBefore(startDate);
        }
      });
    }
  }, {
    key: "max",
    value: function max(_max, message) {
      var format = this.format;
      var maxDate = this.getValidDate(_max);
      return this.test({
        message: message || "Date Range must end on or before ".concat(maxDate.format(format)),
        name: 'max',
        exclusive: true,
        params: {
          max: _max
        },
        test: function test() {
          var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultValue,
              endDate = _ref5.endDate;

          if (!endDate || !_max) return true;
          return maxDate.isValid() && maxDate.isSameOrAfter(endDate);
        }
      });
    }
  }, {
    key: "between",
    value: function between(min, max, message) {
      var format = this.format;
      var minDate = this.getValidDate(min);
      var maxDate = this.getValidDate(max);
      return this.test({
        message: message || "Date Range must be between ".concat(minDate.format(format), " and ").concat(maxDate.format(format)),
        name: 'between',
        exclusive: true,
        params: {
          min: min,
          max: max
        },
        test: function test() {
          var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultValue,
              startDate = _ref6.startDate,
              endDate = _ref6.endDate;

          if (!startDate || !endDate || !min || !max) return true;
          return maxDate.isValid() && minDate.isValid() && maxDate.isSameOrAfter(endDate) && minDate.isSameOrBefore(startDate);
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
        test: function test() {
          var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultValue,
              startDate = _ref7.startDate,
              endDate = _ref7.endDate;

          return !_isRequired || startDate && endDate;
        }
      });
    }
  }, {
    key: "typeError",
    value: function typeError() {
      return this.test({
        name: 'typeError',
        exclusive: true,
        test: function test() {
          var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultValue,
              startDate = _ref8.startDate,
              endDate = _ref8.endDate;

          var errors = [];

          if ((!startDate || !endDate) && (startDate || endDate)) {
            errors.push('Start and End Date are required.');
          }

          if (startDate && !startDate.isValid()) {
            errors.push('Start Date is invalid.');
          }

          if (endDate && !endDate.isValid()) {
            errors.push('End Date is invalid.');
          }

          return errors.length > 0 ? new _yup.ValidationError(errors, {
            startDate: startDate,
            endDate: endDate
          }, this.path) : true;
        }
      });
    }
  }, {
    key: "_typeCheck",
    value: function _typeCheck() {
      var _ref9 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultValue,
          startDate = _ref9.startDate,
          endDate = _ref9.endDate;

      return startDate && endDate && startDate.isValid() && endDate.isValid();
    }
  }]);
  return DateRangeSchema;
}(_yup.mixed);

exports["default"] = DateRangeSchema;