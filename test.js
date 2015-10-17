var Speaker = require('audio-speaker');
var Generator = require('audio-generator');
var Gain = require('./');


Generator({
	duration: 1
})
.pipe(Gain({
	volume: 0.3
}))
.pipe(Speaker());