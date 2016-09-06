var Speaker = require('audio-speaker');
var Generator = require('audio-generator');
var Gain = require('../stream');

//plain
Generator({
	duration: 2.5
})
.pipe(Gain({
	volume: .5
}))
.pipe(Speaker());


//fn
Generator({
	duration: 2.5
})
.pipe(Gain(() => .5))
.pipe(Speaker());
