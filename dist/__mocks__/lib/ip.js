'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.__IP = undefined;
exports.default = getIp;

var _faker = require('faker');

var __IP = exports.__IP = _faker.internet.ip();

function getIp() {
    return __IP;
}