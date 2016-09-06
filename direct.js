/**
 * PCM volume controller.
 * Same as GainNode in web-audio-api as a generic function.
 * stream in stream.js, pull-stream in pull.js, element in element.js
 *
 * @module audio-gain
 */
'use strict';

var util = require('audio-buffer-utils');

/**
 * Create pcm volume controller.
 *
 * @function
 */
function gain(options) {
	// gain()
	if (options == null) options = {volume: 1};

	// gain(Function)
	// gain(Number)
	else if (typeof options === 'function' || typeof options === 'number')  options = {volume: options};

	var volume;
	if (options.mode === 'tan') {
		volume = Math.tan(options.volume);
	} else {
		volume = options.volume;
	}

	//in case if volume is fn
	if (typeof volume === 'function') return buf => util.fill(buf, (v, x, channels) => v * volume(x, channels, v));

	return buf => util.fill(buf, v => v * volume);
}

module.exports = gain;
