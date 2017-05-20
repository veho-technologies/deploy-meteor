import { readFileSync, writeFileSync } from 'fs';

export default function writePm2Config(configFile, bundle, settings, vpnIp) {
    const currentConfig = JSON.parse(readFileSync(configFile).toString());

    const config = Object.assign({}, currentConfig, {
        cwd: bundle,
        script: 'main.js',
        env: Object.assign({}, currentConfig.env, {
            BIND_IP: vpnIp,
            METEOR_SETTINGS: JSON.stringify(settings),
        }),
    });

    writeFileSync(configFile, JSON.stringify(config, null, '  '));
};