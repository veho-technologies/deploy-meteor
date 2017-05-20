import shell from 'shelljs';

/**
 * this function greps the IPv4 address for the given network interface
 * @param {String} interfaceName
 *
 * @returns {String}
 */
function getIpFromInterface(interfaceName) {
    const command = `ip addr show ${interfaceName} ` +
        '| grep "inet\\b" ' +
        '| awk \'{print $2}\' ' +
        '| cut -d/ -f1';

    return shell.exec(command, { silent: true }).stdout.trim();
}

export default function getIp({ bindIp, bindInterface }) {
    return bindIp || getIpFromInterface(bindInterface);
}
