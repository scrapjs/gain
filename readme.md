# @audio/gain [![test](https://github.com/audiojs/gain/actions/workflows/test.yml/badge.svg)](https://github.com/audiojs/gain/actions/workflows/test.yml) [![npm version](https://img.shields.io/npm/v/@audio/gain)](http://npmjs.org/@audio/gain)

> Audio gain DSP module

Amplify input values.

## Usage

[![npm install @audio/gain](https://nodei.co/npm/@audio/gain.png?mini=true)](https://npmjs.org/package/@audio/gain/)


### `./gain.js`

```js
import gain from '@audio/gain';

// mono, k-param gain
[output] = gain([[0.1,0.2,...inputValues]], .75);

// stereo, a-param gain
[outputLeft, outputRight] = gain([[0.1,...leftInput], [-0.1,...rightInput]], [.5,.6,...gainValues]);

// multichannel, a-param gain
outputChannels = gain([...inputChannels], gainValues);
```

### `./gain.wasm`

Raw WASM function requires a bit of memory management.

```js
const memory = new WebAssembly.Memory({initial:1, maximum: 8}) // can be shared

WebAssembly.instantiateStreaming(fetch('./gain.wasm'), { init: { memory } })
.then(({ instance }) => {
	const { gain, block, blockSize } = instance.exports

	const data = new Float64Array(memory.buffer) // memory view
	const inPtr = block(2), gainPtr = block(1) // allocate batch slots for audio buffers

	// sample processing loop
	const processGain = (input, output, param) => {
		// adjust processing block size
		blockSize.value = input[0].length, outPtr

		// write input to memory
		data.set(input[0], inPtr), data.set(input[1], inPtr+blockSize)

		// process a-rate (accurate) gain values
		if (param.gain.length > 1) {
			data.set(param.gain, gainPtr)
			outPtr = gain(inPtr, gainPtr)
		}
		// process k-rate (controlling) gain values
		else {
			outPtr = gain(inPtr, param.gain[0])
		}

		// write output from memory
		output[0].set(data.subarray(outPtr, blockSize))
		output[1].set(data.subarray(outPtr+blockSize, blockSize))
	}
});
```

This is illustrative flow, can be enhanced to use multiple channels, shared memory etc.

<!-- It uses [simplest malloc](https://github.com/rain-1/awesome-allocators/blob/master/bump.md), which serves init purpose. -->

<!-- To get familiar with memory pointers, see the [tutorial](https://wasmbyexample.dev/examples/reading-and-writing-audio/reading-and-writing-audio.assemblyscript.en-us.html). -->


### `./gain.lin`

Can be used in [lino](https://github.com/audio-lab/lino) as:

```fs
@'./gain.lin#gain';

gain(mySource, 0.45);	// direct fn
mySource | gain(0.45); // pipe style
```


<!--
### `./gain-stream.js`

```js
var Generator = require('audio-generator/stream');
var Gain = require('@audio/gain/stream');
var Speaker = require('audio-speaker/stream');

var generator = Generator({ duration: 2 });
var gain = Gain(0.5);
var speaker = Speaker();

generator.pipe(gain).pipe(speaker);
```

#### Pull-stream

```js
var generator = require('audio-generator/pull');
var gain = require('@audio/gain/pull');
var speaker = require('audio-speaker/pull');
var pull = require('pull-stream/pull');

pull(
	generator(Math.random, { duration: 2 }),
	gain({ volume: .4 }),
	speaker()
);
```
-->

<!--

Command:

```sh
$ cat sample.wav | gain --volume 0.5 | speaker
```
-->

<!--
## Related

> [audio-generator](https://github.com/audiojs/audio-generator) — generate stream with a function.<br/>
> [audio-speaker](https://github.com/audiojs/audio-speaker) — output stream to node/browser speaker.<br/>
> [GainNode](https://developer.mozilla.org/en-US/docs/Web/API/GainNode) — gain node in web-audio-api.</br>
> [pcm-volume](https://npmjs.org/package/pcm-volume) — similar package, volume is taken as tangential.</br>
-->

<p align=center>🕉</p>
