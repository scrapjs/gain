/**
 * PCM volume controller.
 * Same as GainNode in web-audio-api.
 *
 * @module audio-gain
 */

var inherits = require('inherits');
var Transform = require('stream').Transform;
var util = require('pcm-util');
var extend = require('xtend/mutable');

/**
 * Create pcm stream volume controller.
 *
 * @constructor
 */
function Gain (volume) {
	if (!(this instanceof Gain)) return new Gain(volume);

	Transform.call(this);

	this.setVolume(volume);
}

inherits(Gain, Transform);


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
Gain.prototype._transform = function (chunk, enc, cb) {
	var self = this;

	chunk = util.mapSamples(chunk, function (sample) {
		return sample * self.volume;
	}, this);

	cb(null, chunk);
}


/**
 * PCM stream params
 */
extend(Gain.prototype, util.defaultFormat);


module.exports = Gain;