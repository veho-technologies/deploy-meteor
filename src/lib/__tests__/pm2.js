/* eslint-env jest */
/* eslint-disable arrow-functions, func-names */

import { internet, lorem } from 'faker';
import { readFileSync, writeFileSync } from 'fs';
import random from 'lodash/random';
import { getRandomObject, getRandomPath } from '../../test/util';
import writePm2Config from '../pm2';

jest.mock('fs');

describe('lib/pm2', function () {
    test('updates the pm2 config file properly', function () {
        const configFile = `${getRandomPath()}/config.json`;
        const bundle = getRandomPath();
        const settings = getRandomObject();
        const currentConfig = {
            name: lorem.words(),
            env: {
                PORT: random(1025, 60000),
                METEOR_SETTINGS: JSON.stringify(getRandomObject()),
            },
        };
        const configJson = JSON.stringify(currentConfig, null, '  ');
        readFileSync.mockImplementationOnce(() => new Buffer(configJson));
        const vpnIp = internet.ip();

        writePm2Config(configFile, bundle, settings, vpnIp);

        const expectedConfig = Object.assign({}, currentConfig, {
            cwd: bundle,
            script: 'main.js',
            env: Object.assign({}, currentConfig.env, {
                BIND_IP: vpnIp,
                METEOR_SETTINGS: JSON.stringify(settings),
            }),
        });
        const expectedJson = JSON.stringify(expectedConfig, null, '  ');

        expect(readFileSync).toHaveBeenCalledWith(configFile);
        expect(writeFileSync).toHaveBeenCalledWith(configFile, expectedJson);
    });
});