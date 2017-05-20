import { readFileSync } from 'fs';
import { resolve } from 'path';

export default function getSettings(bundle, settings) {
    const settingsFile = resolve(
        bundle,
        'programs/server/assets/app',
        settings,
    );
    const content = readFileSync(settingsFile).toString();

    return JSON.parse(content);
};