'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getIp;

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * this function greps the IPv4 address for the given network interface
 * @param {String} interfaceName
 *
 * @returns {String}
 */
function getIpFromInterface(interfaceName) {
    var command = `ip addr show ${interfaceName} ` + '| grep "inet\\b" ' + '| awk \'{print $2}\' ' + '| cut -d/ -f1';

    return _shelljs2.default.exec(command, { silent: true }).stdout.trim();
}

function getIp(_ref) {
    var bindIp = _ref.bindIp,
        bindInterface = _ref.bindInterface;

    return bindIp || getIpFromInterface(bindInterface);
}