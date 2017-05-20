'use strict';

var _faker = require('faker');

var _fs = require('fs');

var _random = require('lodash/random');

var _random2 = _interopRequireDefault(_random);

var _util = require('../../test/util');

var _pm = require('../pm2');

var _pm2 = _interopRequireDefault(_pm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('fs'); /* eslint-env jest */
/* eslint-disable arrow-functions, func-names */

describe('lib/pm2', function () {
    test('updates the pm2 config file properly', function () {
        var configFile = `${(0, _util.getRandomPath)()}/config.json`;
        var bundle = (0, _util.getRandomPath)();
        var settings = (0, _util.getRandomObject)();
        var currentConfig = {
            name: _faker.lorem.words(),
            env: {
                PORT: (0, _random2.default)(1025, 60000),
                METEOR_SETTINGS: JSON.stringify((0, _util.getRandomObject)())
            }
        };
        var configJson = JSON.stringify(currentConfig, null, '  ');
        _fs.readFileSync.mockImplementationOnce(function () {
            return new Buffer(configJson);
        });
        var vpnIp = _faker.internet.ip();

        (0, _pm2.default)(configFile, bundle, settings, vpnIp);

        var expectedConfig = Object.assign({}, currentConfig, {
            cwd: bundle,
            script: 'main.js',
            env: Object.assign({}, currentConfig.env, {
                BIND_IP: vpnIp,
                METEOR_SETTINGS: JSON.stringify(settings)
            })
        });
        var expectedJson = JSON.stringify(expectedConfig, null, '  ');

        expect(_fs.readFileSync).toHaveBeenCalledWith(configFile);
        expect(_fs.writeFileSync).toHaveBeenCalledWith(configFile, expectedJson);
    });
});