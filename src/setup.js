import { vpnIp } from './config';
import writeConfig from './lib/pm2';
import getSettings from './lib/settings';
import { options } from './options';

const settings = getSettings(options.bundle, options.settings);
writeConfig(options.config, options.bundle, settings, vpnIp);