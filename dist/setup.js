'use strict';

var _config = require('./config');

var _pm = require('./lib/pm2');

var _pm2 = _interopRequireDefault(_pm);

var _settings = require('./lib/settings');

var _settings2 = _interopRequireDefault(_settings);

var _options = require('./options');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var settings = (0, _settings2.default)(_options.options.bundle, _options.options.settings);
(0, _pm2.default)(_options.options.config, _options.options.bundle, settings, _config.vpnIp);