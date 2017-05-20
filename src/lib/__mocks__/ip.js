/* eslint-env jest */

import { internet } from 'faker';

export const __IP = internet.ip();

export default jest.fn(() => __IP);