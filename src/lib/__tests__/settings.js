/* eslint-env jest */
/* eslint-disable arrow-functions, func-names */

import { lorem } from 'faker';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { getRandomObject, getRandomPath } from '../../test/util';
import getSettings from '../settings';

jest.mock('fs');
jest.mock('path');

describe('lib/settings', function () {
    test('gets the settings file content, relative to app assets', function () {
        const settings = getRandomObject();
        const json = JSON.stringify(settings, null, '  ');
        const settingsFile = `private/settings/${lorem.word()}.json`;
        readFileSync.mockImplementationOnce(() => new Buffer(json));
        const resolvedPath = lorem.words();
        resolve.mockImplementationOnce(() => resolvedPath);
        const bundlePath = getRandomPath();

        const result = getSettings(bundlePath, settingsFile);

        expect(result).toEqual(settings);

        expect(readFileSync).toHaveBeenCalledWith(resolvedPath);
        expect(resolve).toHaveBeenCalledWith(
            bundlePath,
            'programs/server/assets/app',
            settingsFile,
        );
    });
});