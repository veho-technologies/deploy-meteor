/* eslint-env jest */
/* eslint-disable arrow-functions, func-names */

import { internet, lorem } from 'faker';
import shell from 'shelljs';
import getIp from '../ip';

jest.mock('shelljs');

describe('lib/ip', function () {
    afterEach(() => {
        shell.exec.mockClear();
    });

    test('returns the value of --bindIp, if provided', function () {
        const bindIp = internet.ip();

        expect(getIp({ bindIp })).toEqual(bindIp);
        expect(shell.exec).toHaveBeenCalledTimes(0);
    });

    test('gets the IP of the given network interface', function () {
        const bindInterface = lorem.word();
        const ip = internet.ip();

        shell.exec.mockImplementationOnce(() => ({ stdout: ip }));

        expect(getIp({ bindInterface })).toEqual(ip);
        expect(shell.exec).toHaveBeenCalledTimes(1);
        expect(shell.exec)
            .toHaveBeenCalledWith(`ip addr show ${bindInterface} ` +
                '| grep "inet\\b" | awk \'{print $2}\' | cut -d/ -f1',
            );
    });

    test('prefers --bindIp over --bindInterface', function () {
        const bindIp = internet.ip();

        expect(getIp({ bindIp, bindInterface: lorem.word() })).toEqual(bindIp);
        expect(shell.exec).toHaveBeenCalledTimes(0);
    });
});