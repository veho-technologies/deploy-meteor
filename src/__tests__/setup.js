/* eslint-env jest */
/* eslint-disable arrow-functions, func-names */

import { resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { vpnIp } from '../config';
import { options } from '../options';

jest.mock('../options');

// config won't work outside the realm of the VPN
jest.mock('../config');

describe('setup', function () {
    let currentConfig;

    beforeEach(() => {
        currentConfig = readFileSync(options.config).toString();
    });

    afterEach(() => {
        writeFileSync(options.config, currentConfig);
    });

    test('integration test', function () {
        // get the settings content
        const settingsPath = resolve(
            options.bundle,
            'programs/server/assets/app/settings/test.json',
        );
        const settings = JSON.parse(readFileSync(settingsPath).toString());
        const config = JSON.parse(currentConfig);

        const expectedConfig = Object.assign({}, config, {
            cwd: options.bundle,
            script: 'main.js',
            env: Object.assign({}, config.env, {
                BIND_IP: vpnIp,
                METEOR_SETTINGS: JSON.stringify(settings),
            }),
        });

        require('../setup');

        const actualConfig = JSON.parse(readFileSync(options.config).toString());

        expect(actualConfig).toEqual(expectedConfig);
    });
});