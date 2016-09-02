/**
 * PCM volume controller.
 * Same as GainNode in web-audio-api, but for streams.
 *
 * @module audio-gain
 */

var inherits = require('inherits');
var Through = require('audio-through');
var extend = require('xtend/mutable');
var util = require('audio-buffer-utils');

/**
 * Create pcm stream volume controller.
 *
 * @function
 */
function gain (options) {
	if (typeof options === 'number') {
		options = {volume: options};
	} else if (!options) {
		options = {volume: 1};
	}

	write.end = function() {};

	return write;

	function write(buf) {
		var volume = options.volume;

		util.fill(buf, function (x) {
			return x * volume;
		});

		return buf;
	};
};

module.exports = gain;
