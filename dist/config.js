'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vpnIp = undefined;

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * this command greps the IPv4 address for the VPN interface
 * @type {string}
 */
var command = 'ip addr show tun0 ' + '| grep "inet\\b" ' + '| awk \'{print $2}\' ' + '| cut -d/ -f1';

var vpnIp = exports.vpnIp = _shelljs2.default.exec(command).stdout;