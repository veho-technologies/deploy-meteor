'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.options = undefined;

var _path = require('path');

var options = exports.options = {
    bundle: (0, _path.resolve)(__dirname, '../../test/bundle'),
    config: (0, _path.resolve)(__dirname, '../../test/config.json'),
    settings: 'settings/test.json'
};