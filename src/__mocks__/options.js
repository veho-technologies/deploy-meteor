import { resolve } from 'path';

export const options = {
    bundle: resolve(__dirname, '../../test/bundle'),
    config: resolve(__dirname, '../../test/config.json'),
    settings: 'settings/test.json',
};