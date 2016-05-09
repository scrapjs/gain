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
 * @constructor
 */
function Gain (volume) {
	if (!(this instanceof Gain)) return new Gain(volume);

	if (typeof volume === 'number') {
		volume = {volume: volume};
	}

	Through.call(this, volume);
}

inherits(Gain, Through);


Gain.prototype.volume = 1;


/**
 * Set current volume
 */
Gain.prototype.setVolume = function (volume) {
	if (!volume && volume !== 0) volume = 1;
	this.volume = volume;
}


/**
 * Basic transformer
 */
Gain.prototype.process = function (buf) {
	var volume = this.volume;

	util.fill(buf, function (x) {
		return x * volume;
	});

	return buf;
}



module.exports = Gain;