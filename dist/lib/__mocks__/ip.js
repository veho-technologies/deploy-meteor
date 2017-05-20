'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__IP = undefined;

var _faker = require('faker');

var __IP = exports.__IP = _faker.internet.ip(); /* eslint-env jest */

exports.default = jest.fn(function () {
  return __IP;
});