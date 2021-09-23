"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateRange = exports.avDate = void 0;

var _yup = require("yup");

var _isRequired = _interopRequireDefault(require("./isRequired"));

var _npi = _interopRequireDefault(require("./npi"));

var _phone = _interopRequireDefault(require("./phone"));

var _date = _interopRequireDefault(require("./date"));

var _dateRange = _interopRequireDefault(require("./dateRange"));

var avDate = function avDate(opts) {
  return new _date["default"](opts);
};

exports.avDate = avDate;

var dateRange = function dateRange(opts) {
  return new _dateRange["default"](opts);
};

exports.dateRange = dateRange;
(0, _yup.addMethod)(_yup.string, 'isRequired', _isRequired["default"]);
(0, _yup.addMethod)(_yup.number, 'isRequired', _isRequired["default"]);
(0, _yup.addMethod)(_yup.array, 'isRequired', _isRequired["default"]);
(0, _yup.addMethod)(_yup.object, 'isRequired', _isRequired["default"]);
(0, _yup.addMethod)(_yup.string, 'npi', _npi["default"]);
(0, _yup.addMethod)(_yup.number, 'npi', _npi["default"]);
(0, _yup.addMethod)(_yup.string, 'phone', _phone["default"]);
(0, _yup.addMethod)(_yup.number, 'phone', _phone["default"]);