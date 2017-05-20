import random from 'lodash/random';
import range from 'lodash/range';
import { lorem } from 'faker';

/**
 * @returns {string}
 */
export function getRandomPath() {
    return range(random(3, 10))
        .map(() => lorem.word())
        .join('/');
}

/**
 * @returns {Object}
 */
export function getRandomObject() {
    return {
        [lorem.word()]: lorem.words(),
        [lorem.word()]: lorem.words(),
        [lorem.word()]: lorem.words(),
        [lorem.word()]: {
            [lorem.word()]: lorem.words(),
            [lorem.word()]: lorem.words(),
        },
    };
}