var gain = require('./');
var inherits = require('inherits');
var Through = require('audio-through');

module.exports = Gain;

function Gain(options) {
  if (!(this instanceof Gain)) return new Gain(options);
  this.process = gain(options);
  Through.call(this, options);
  // this.on('end', gain.end);
};

inherits(Gain, Through);
