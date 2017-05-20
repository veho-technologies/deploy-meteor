'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getRandomPath = getRandomPath;
exports.getRandomObject = getRandomObject;

var _random = require('lodash/random');

var _random2 = _interopRequireDefault(_random);

var _range = require('lodash/range');

var _range2 = _interopRequireDefault(_range);

var _faker = require('faker');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @returns {string}
 */
function getRandomPath() {
    return (0, _range2.default)((0, _random2.default)(3, 10)).map(function () {
        return _faker.lorem.word();
    }).join('/');
}

/**
 * @returns {Object}
 */
function getRandomObject() {
    return {
        [_faker.lorem.word()]: _faker.lorem.words(),
        [_faker.lorem.word()]: _faker.lorem.words(),
        [_faker.lorem.word()]: _faker.lorem.words(),
        [_faker.lorem.word()]: {
            [_faker.lorem.word()]: _faker.lorem.words(),
            [_faker.lorem.word()]: _faker.lorem.words()
        }
    };
}