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
	if (typeof options === 'undefined') options = 1;

	// gain(Number)
	// gain({volume: Number})
	if (typeof options === 'number' || typeof options.volume === 'number') {
		var volume = Math.tan(options.volume || options);
		options = {volume: function (x) { return x * volume }};
	}

	// gain(Function)
	else if (typeof options === 'function')  {
		options = {volume: options};
	}

	// Return functions.
	write.end = noop;
	return write;

	// Write volume to buffer
	function write(buf) {
		var volume = options.volume;

		// Apply volume function on buffer
		util.fill(buf, volume);

		// Sync return buffer.
		return buf;
	};
};

module.exports = gain;
