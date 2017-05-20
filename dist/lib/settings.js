'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getSettings;

var _fs = require('fs');

var _path = require('path');

function getSettings(bundle, settings) {
    var settingsFile = (0, _path.resolve)(bundle, 'programs/server/assets/app', settings);
    var content = (0, _fs.readFileSync)(settingsFile).toString();

    return JSON.parse(content);
};