/**
 * PCM volume controller.
 * Same as GainNode in web-audio-api as a generic function.
 * stream in stream.js, pull-stream in pull.js, element in element.js
 *
 * @module audio-gain
 */
var noop = function () {};
var util = require('audio-buffer-utils');

/**
 * Create pcm volume controller.
 *
 * @function
 */
function gain(options) {
	// gain()
	if (typeof options === 'undefined') options = {volume: 1};

	// gain(Function)
	if (typeof options === 'function')  options = {volume: options};

	// gain(Number)
	// gain({volume: Number})
	if (typeof options === 'number' || typeof options.volume === 'number') {
		var volume = options.volume || options;

		// TODO: options.mode statements here
		volume = Math.tan(volume);

		options = {volume: volume};
	}

	// Return functions.
	through.end = noop;
	return through;

	// Write volume to buffer
	function through(buf) {
		var volume = options.volume;

		// Apply volume multiplication on buffer.
		if (typeof volume === 'number') {
			util.fill(buf, function (v) {
				return v * volume;
			});
		}

		// Apply volume function on buffer.
		else if (typeof volume === 'function') {
			util.fill(buf, function (v, x, channels) {
				return v * volume(x, channels, v);
			});
		}

		return buf;
	};
};

module.exports = gain;
