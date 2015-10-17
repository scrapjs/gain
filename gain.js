/**
 * Gain bundle: gain stream, custom element.
 * Used mostly for build purposes.
 *
 * To include only gain, use require('audio-gain');
 * To include only custom element, use require('audio-gain/element');
 * To use gain as a custom element, use <link rel="import" href="node_modules/audio-gain">
 *
 * @module audio-gain/gain
 */

var Gain = require('.');
Gain.Element = require('./element');

module.exports = Gain;