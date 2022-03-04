# @audio/gain [![test](https://github.com/audiojs/gain/actions/workflows/test.yml/badge.svg)](https://github.com/audiojs/gain/actions/workflows/test.yml) [![npm version](https://img.shields.io/npm/v/@audio/gain)](http://npmjs.org/@audio/gain)

> Audio gain DSP module

Amplify values.

## Usage

<!-- [![npm install @audio/gain](https://nodei.co/npm/@audio/gain.png?mini=true)](https://npmjs.org/package/@audio/gain/) -->

<!--
### `./gain.js`

```js
import gain from '@audio/gain';

const input = [leftValues, rightValues]
const output = [new Float32Array(blockSize), new Float32Array(blockSize)]

gain(input, gain, output)
```

* `input` is a list of input channels, eg. `[leftValues, rightValues]`.
* `output` is a list of output channels, optional. If omitted, input is used for output.
* `gain` can be an array for a-rate or direct value for k-rate param.

Returns output list, if any, otherwise rewrites input arrays.
-->

<!-- ### `./gain.wasm` -->

<!-- Raw WASM function requires a bit of memory management. -->

### JavaScript

```js
const memory = new WebAssembly.Memory({initial:1, maximum: 8}) // can be shared also

WebAssembly.instantiateStreaming(fetch('./gain.wasm'), { setup: { memory } })
.then(({instance}) => {
	const { default: gain, alloc, blockSize, sampleRate } = instance.exports
	// allocate max block size
	blockSize.value = 8192

	// reserve memory slots (in samples)
	const inOffset = alloc(2*blockSize) // 2 input channels
	const outOffset = alloc(2*blockSize) // 2 output channels
	const gainOffset = alloc(1*blockSize) // 1-channel a-rate param

	const data = new Float32Array(memory.buffer) // memory view

	// sample processing loop
	const processGain = (input, output, param) => {
		// align block size with input length (WAA may have varying block size)
		blockSize.value = input[0].length

		// write input to memory
		data.set(input[0], inOffset), data.set(input[1], inOffset+blockSize)

		// a-rate (accurate) gain values
		if (param.gain.length > 1) {
			data.set(param.gain, gainOffset)
			gain(inOffset, gainOffset, outOffset, 2, 1)
		}
		// k-rate (controlling) gain values
		else {
			gain(inOffset, param.gain, outOffset, 2)
		}

		// write output from memory (4 bytes per element)
		output[0].set(data.subarray(outOffset, blockSize))
		output[1].set(data.subarray(outOffset + blockSize, blockSize))
	}
});
```

This is illustrative flow, can be adjusted to use in eg. audio worklet.

It uses [simplest malloc](https://github.com/rain-1/awesome-allocators/blob/master/bump.md), which serves init purpose.

To get familiar with memory pointers, see the [tutorial](https://wasmbyexample.dev/examples/reading-and-writing-audio/reading-and-writing-audio.assemblyscript.en-us.html).

<!--
### `./gain.son`

Can be used in [sonr](https://github.com/audio-lab/sonr) as:

```
import gain from '@audio/gain'

mySource | gain(.45)
```
-->

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
