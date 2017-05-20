'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = writePm2Config;

var _fs = require('fs');

function writePm2Config(configFile, bundle, settings, vpnIp) {
    var currentConfig = JSON.parse((0, _fs.readFileSync)(configFile).toString());

    var config = Object.assign({}, currentConfig, {
        cwd: bundle,
        script: 'main.js',
        env: Object.assign({}, currentConfig.env, {
            BIND_IP: vpnIp,
            METEOR_SETTINGS: JSON.stringify(settings)
        })
    });

    (0, _fs.writeFileSync)(configFile, JSON.stringify(config, null, '  '));
};