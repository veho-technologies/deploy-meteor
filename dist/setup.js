#! /usr/bin/env node
'use strict';

var _ip = require('./lib/ip');

var _ip2 = _interopRequireDefault(_ip);

var _pm = require('./lib/pm2');

var _pm2 = _interopRequireDefault(_pm);

var _settings = require('./lib/settings');

var _settings2 = _interopRequireDefault(_settings);

var _options = require('./options');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var settings = (0, _settings2.default)(_options.options.bundle, _options.options.settings);

(0, _pm2.default)(_options.options.config, _options.options.bundle, settings, (0, _ip2.default)(_options.options));