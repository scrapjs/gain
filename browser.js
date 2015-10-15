/**
 * Browser version of audio-gain.
 *
 * Registers custom element for the controller.
 * It is considered not a big performance hit.
 * If you still need only plain controller in browserify, use require('audio-gain/src')
 *
 * @module audio-gain
 */


/** Gain controller */
var Gain = require('./src');


/** Custom element */
var GainElement = Object.create(HTMLElement.prototype);


GainElement.createdCallback = function() {
	var self = this;

	//create input
	self.inputElement = document.createElement('input');
	self.inputElement.type = 'range';
	self.inputElement.max = 1;
	self.inputElement.min = 0;
	self.inputElement.step = 0.01;
	self.appendChild(self.inputElement);

	//create value indicator
	self.volumeElement = document.createElement('span');
	self.appendChild(self.volumeElement);

	//read initial volume attribute, if any
	var volume = self.getAttribute('volume') || self.inputElement.value;
	volume = parseFloat(volume);
	self.inputElement.value = volume;
	self.volumeElement.innerHTML = volume;

	//create gain controller based on attributes
	self.gain = new Gain(volume);

	//attributeChange simply doesn’t work for value
	self.inputElement.addEventListener('input', function () {
		var volume = parseFloat(self.inputElement.value);
		self.setVolume(volume);
	});
};


/**
 * Set new volume
 *
 * @param {Number} value New value param, 0..1
 */
GainElement.setVolume = function (value) {
	var self = this;

	if (!value && value !== 0) return;

	value = Math.max(0, Math.min(1, value));

	self.gain.setVolume(value);

	self.volumeElement.innerHTML = value;
};


GainElement.attributeChangedCallback = function ( name, previousValue, value ) {
	console.log(name)
	if (name === 'connect') {
		this.disconnect(previousValue);
		this.connect(value);
	}
};


/**
 * Connect to other/set of other audio elements
 *
 * @param {String|Element|Array} target Target to connect
 *
 * @return {GainElement} this
 */
GainElement.connect = function (target) {

};


/**
 * Disconnect from previously connected elements
 * @param {Strin|Element|List|undefined} target Targets to disconnect, optional
 */
GainElement.disconnect = function (target) {

};


/**
 * Audio-lab meta info
 */
GainElement.thumbnail = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125"><path fill="none" stroke="#000" stroke-width="4.963" stroke-miterlimit="10" d="M91.75 69.492H17.583L91.75 39.508z"/><path d="M65.75 50.683l-45 18.192h45"/></svg>';
GainElement.label = 'Volume';



/** Link element */
Gain.Element = GainElement;


/** Register custom element */
document.registerElement('audio-gain', {
	prototype: GainElement
});


/** Export module */
module.exports = Gain;