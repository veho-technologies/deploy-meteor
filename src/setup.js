#! /usr/bin/env node

import getIp from './lib/ip';
import writeConfig from './lib/pm2';
import getSettings from './lib/settings';
import { options } from './options';

const settings = getSettings(options.bundle, options.settings);

writeConfig(options.config, options.bundle, settings, getIp(options));