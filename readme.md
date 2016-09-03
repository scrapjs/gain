# audio-gain [![Build Status](https://travis-ci.org/audiojs/audio-gain.svg?branch=master)](https://travis-ci.org/audiojs/audio-gain) [![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

> PCM audio gain as function, stream, pull stream, etc.

_Audio-gain_ is a transform stream to change the volume of audio data. It includes `audio-gain` module with class itself, an `<audio-gain>` custom element to use in a browser, and a `gain` command to use in a terminal.

## Usage

[![npm install audio-gain](https://nodei.co/npm/audio-gain.png?mini=true)](https://npmjs.org/package/audio-gain/)

### Plain function

```js
const generator = require('audio-generator');
const gain = require('audio-gain');
const speaker = require('audio-speaker');

// Create functions
let generate = generator({ duration: 2 });
let gain = gain({ volume: .5});
let write = speaker();

// Hook up generator → gain → speaker routine
(function loop (error) {
	let buffer = generate();
	buffer = gain(buffer);
	write(buffer, loop);
})();
```

### Node stream

```js
var Generator = require('audio-generator/stream');
var Gain = require('audio-gain/stream');
var Speaker = require('audio-speaker/stream');

var generator = Generator({ duration: 2 });
var gain = Gain(0.5);
var speaker = Speaker();

generator.pipe(gain).pipe(speaker);
```

### Pull-stream

```js
var generator = require('audio-generator/pull');
var gain = require('audio-gain/pull');
var speaker = require('audio-speaker/pull');
var pull = require('pull-stream/pull');

pull(
	generator(Math.random, { duration: 2 }),
	gain({ volume: .4 }),
	speaker()
);
```

<!--
Custom element:

```html
<script src="./bundled-dependencies.js"></script>
<link rel="import" href="node_modules/audio-speaker">
<link rel="import" href="node_modules/audio-generator">
<link rel="import" href="node_modules/audio-gain">

<audio-generator id="generator" connect="#gain"></audio-generator>
<audio-gain volume="0.3" id="gain" connect="#speaker"></audio-gain>
<audio-speaker id="speaker"></audio-speaker>
```

Command:

```sh
$ cat sample.wav | gain --volume 0.5 | speaker
```

## Related

> [GainNode](https://developer.mozilla.org/en-US/docs/Web/API/GainNode) — gain node in web-audio-api.</br>
> [pcm-volume](https://npmjs.org/package/pcm-volume) — similar package, volume is taken as tangential.</br>
> [audio-lab](https://github.com/audio-lab/lab) — audio playground, sound graph constructor.</br>
-->
