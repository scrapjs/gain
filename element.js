/**
 * <audio-gain> HTML element.
 *
 * Does not export anything as it is not a module, it is pre-cooked web-component.
 *
 * To make it work, browserify bundle first with dependencies:
 * `browserify -r audio-gain -r audio-element`
 * and connect it before the import link:
 * <link rel="import" href="./node_modules/audio-gain"/>
 *
 * @module audio-gain/element
 */
var Gain = require('audio-gain');
var AudioElement = require('audio-element');


/** Custom element */
var GainPrototype = Object.create(AudioElement.prototype);


GainPrototype.createdCallback = function() {
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

	//create gain controller stream based on attributes
	self.stream = new Gain(volume);

	//attributeChange simply doesn’t work for value
	self.inputElement.addEventListener('input', function () {
		var volume = parseFloat(self.inputElement.value);
		self.setVolume(volume);
	});

	//call super
	AudioElement.prototype.createdCallback.call(this);
};


/**
 * Set new volume
 *
 * @param {Number} value New value param, 0..1
 */
GainPrototype.setVolume = function (value) {
	var self = this;

	if (!value && value !== 0) return;

	value = Math.max(0, Math.min(1, value));

	self.stream.setVolume(value);

	self.volumeElement.innerHTML = value;
};


/**
 * Connection logic
 */
GainPrototype.numberOfInputs = 1;
GainPrototype.numberOfOutputs = 1;


/**
 * Meta
 */
GainPrototype.thumbnail = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125"><path fill="none" stroke="#000" stroke-width="4.963" stroke-miterlimit="10" d="M91.75 69.492H17.583L91.75 39.508z"/><path d="M65.75 50.683l-45 18.192h45"/></svg>';
GainPrototype.label = 'Volume';
GainPrototype.description = 'Control the volume';


/** Register custom element */
document.registerElement('audio-gain', {
	prototype: GainPrototype
});