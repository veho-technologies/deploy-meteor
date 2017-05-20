'use strict';

var _fs = require('fs');

var _path = require('path');

var _ip = require('../lib/ip');

var _ip2 = _interopRequireDefault(_ip);

var _options = require('../options');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-env jest */
/* eslint-disable arrow-functions, func-names */

jest.mock('../options');
jest.mock('../lib/ip');

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
                BIND_IP: _ip.__IP,
                METEOR_SETTINGS: JSON.stringify(settings)
            })
        });

        require('../setup');

        var actualConfig = JSON.parse((0, _fs.readFileSync)(_options.options.config).toString());

        expect(actualConfig).toEqual(expectedConfig);
        expect(_ip2.default).toHaveBeenCalledWith(_options.options);
    });
});