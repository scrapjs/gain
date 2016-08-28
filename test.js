var Speaker = require('audio-speaker');
var Generator = require('audio-generator');
var Gain = require('./');


Generator({
	duration: 2
})
.pipe(Gain({
	volume: 1
}))
.pipe(Speaker());
