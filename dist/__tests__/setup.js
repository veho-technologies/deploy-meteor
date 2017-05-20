'use strict';

var _path = require('path');

var _fs = require('fs');

var _config = require('../config');

var _options = require('../options');

/* eslint-env jest */
/* eslint-disable arrow-functions, func-names */

jest.mock('../options');

// config won't work outside the realm of the VPN
jest.mock('../config');

describe('setup', function () {
    var currentConfig = void 0;

    beforeEach(function () {
        currentConfig = (0, _fs.readFileSync)(_options.options.config).toString();
    });

    afterEach(function () {
        (0, _fs.writeFileSync)(_options.options.config, currentConfig);
    });

    test('integration test', function () {
        // get the settings content
        var settingsPath = (0, _path.resolve)(_options.options.bundle, 'programs/server/assets/app/settings/test.json');
        var settings = JSON.parse((0, _fs.readFileSync)(settingsPath).toString());
        var config = JSON.parse(currentConfig);

        var expectedConfig = Object.assign({}, config, {
            cwd: _options.options.bundle,
            script: 'main.js',
            env: Object.assign({}, config.env, {
                BIND_IP: _config.vpnIp,
                METEOR_SETTINGS: JSON.stringify(settings)
            })
        });

        require('../setup');

        var actualConfig = JSON.parse((0, _fs.readFileSync)(_options.options.config).toString());

        expect(actualConfig).toEqual(expectedConfig);
    });
});