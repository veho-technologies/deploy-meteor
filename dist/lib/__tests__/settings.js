'use strict';

var _faker = require('faker');

var _fs = require('fs');

var _path = require('path');

var _util = require('../../test/util');

var _settings = require('../settings');

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('fs'); /* eslint-env jest */
/* eslint-disable arrow-functions, func-names */

jest.mock('path');

describe('lib/settings', function () {
    test('gets the settings file content, relative to app assets', function () {
        var settings = (0, _util.getRandomObject)();
        var json = JSON.stringify(settings, null, '  ');
        var settingsFile = `private/settings/${_faker.lorem.word()}.json`;
        _fs.readFileSync.mockImplementationOnce(function () {
            return new Buffer(json);
        });
        var resolvedPath = _faker.lorem.words();
        _path.resolve.mockImplementationOnce(function () {
            return resolvedPath;
        });
        var bundlePath = (0, _util.getRandomPath)();

        var result = (0, _settings2.default)(bundlePath, settingsFile);

        expect(result).toEqual(settings);

        expect(_fs.readFileSync).toHaveBeenCalledWith(resolvedPath);
        expect(_path.resolve).toHaveBeenCalledWith(bundlePath, 'programs/server/assets/app', settingsFile);
    });
});