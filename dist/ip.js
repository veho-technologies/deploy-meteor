'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.bindIp = undefined;

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _options = require('./options');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * this function greps the IPv4 address for the given network interface
 * @param {String} interfaceName
 *
 * @returns {String}
 */
function getIpFromInterface(interfaceName) {
    var command = `ip addr show ${interfaceName} ` + '| grep "inet\\b" ' + '| awk \'{print $2}\' ' + '| cut -d/ -f1';

    return _shelljs2.default.exec(command).stdout;
}

var bindIp = exports.bindIp = _options.options['bind-ip'] ? _options.options['bind-ip'] : getIpFromInterface(_options.options['bind-interface']);