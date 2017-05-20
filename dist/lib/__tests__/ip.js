'use strict';

var _faker = require('faker');

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _ip = require('../ip');

var _ip2 = _interopRequireDefault(_ip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('shelljs'); /* eslint-env jest */
/* eslint-disable arrow-functions, func-names */

describe('lib/ip', function () {
    afterEach(function () {
        _shelljs2.default.exec.mockClear();
    });

    test('returns the value of --bindIp, if provided', function () {
        var bindIp = _faker.internet.ip();

        expect((0, _ip2.default)({ bindIp })).toEqual(bindIp);
        expect(_shelljs2.default.exec).toHaveBeenCalledTimes(0);
    });

    test('gets the IP of the given network interface', function () {
        var bindInterface = _faker.lorem.word();
        var ip = _faker.internet.ip();

        _shelljs2.default.exec.mockImplementationOnce(function () {
            return { stdout: ip };
        });

        expect((0, _ip2.default)({ bindInterface })).toEqual(ip);
        expect(_shelljs2.default.exec).toHaveBeenCalledTimes(1);
        expect(_shelljs2.default.exec).toHaveBeenCalledWith(`ip addr show ${bindInterface} ` + '| grep "inet\\b" | awk \'{print $2}\' | cut -d/ -f1');
    });

    test('prefers --bindIp over --bindInterface', function () {
        var bindIp = _faker.internet.ip();

        expect((0, _ip2.default)({ bindIp, bindInterface: _faker.lorem.word() })).toEqual(bindIp);
        expect(_shelljs2.default.exec).toHaveBeenCalledTimes(0);
    });
});