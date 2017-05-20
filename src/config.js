import shell from 'shelljs';

/**
 * this command greps the IPv4 address for the VPN interface
 * @type {string}
 */
const command = 'ip addr show tun0 ' +
    '| grep "inet\\b" ' +
    '| awk \'{print $2}\' ' +
    '| cut -d/ -f1';

export const vpnIp = shell.exec(command).stdout;
