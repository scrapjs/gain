# @audio/gain [![test](https://github.com/audiojs/gain/actions/workflows/test.yml/badge.svg)](https://github.com/audiojs/gain/actions/workflows/test.yml)

> Audio gain DSP module

Apply gain to input buffer.

## Usage

[![npm install @audio/gain](https://nodei.co/npm/@audio/gain.png?mini=true)](https://npmjs.org/package/@audio/gain/)

### `./gain.js`

```js
import gain from '@audio/gain';

const left = Array.from({length: 1024}, (s,i) => i/10%1 )

const output = gain(input, gainValue)
```

`input` is a list of input channels, eg. `[leftValues, rightValues]`.
`output` is a list of output channels with samples multiplied by `gain`.
`gain` can be an array for a-rate or direct value for k-rate param.


### `./gain.wasm`

Raw WASM function requires a bit of memory management.

```js
WebAssembly.instantiateStreaming(fetch('./@audio/gain/gain.wasm'), importObject)
.then(({instance}) => {
	const { gain, memory, malloc, blockSize } = instance.exports

	blockSize.value = 4096 // set max block size

	// reserve memory slots
	const inPtr = malloc(2 * blockSize) // 2-channel input
	const outPtr = malloc(2 * blockSize) // 2-channel output
	const aGainPtr = malloc(1 * blockSize) // 1-channel a-rate param
	const kGainPtr = malloc(1) // alternative: alloc single value for k-rate param

	const data = new Float32Array(memory.buffer) // memory view

	const processGain = (input, output, param) => {
		blockSize.value = input[0].length // align block size with input length

		data.set([...input[0], ...input[1]], inPtr) // write input to memory

		// a-rate (accurate) gain values
		if (param.gain.length > 1) {
			data.set(param.gain, aGainPtr)
			gain(inPtr, 2*blockSize, aGainPtr, blockSize, outPtr, 2*blockSize)
		}
		// k-rate (controlling) gain values
		else {
			data.set(param.gain, kGainPtr)
			gain(inPtr, 2*blockSize, kGainPtr, 1, outPtr, 2*blockSize)
		}

		output.set(data.subarray(outPtr, output.length)) // write output from memory
	}
});
```

This is illustrative flow, not most performant. For optimization shared memory can be used, better writing to inputs etc.

Also it uses [simplest malloc](https://github.com/rain-1/awesome-allocators/blob/master/bump.md), which serves single purpose well.

To get familiar with memory pointers, see the [tutorial](https://wasmbyexample.dev/examples/reading-and-writing-audio/reading-and-writing-audio.assemblyscript.en-us.html).


### `./gain.son`

Can be imported in [sonr](https://github.com/audio-lab/sonr) as

```
import gain from '@audio/gain'

mySource | gain(.45)
```

<!--
### `./stream.js`

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
Custom element:

```html
<script src="./bundled-dependencies.js"></script>
<link rel="import" href="node_modules/audio-speaker">
<link rel="import" href="node_modules/audio-generator">
<link rel="import" href="node_modules/@audio/gain">

<audio-generator id="generator" connect="#gain"></audio-generator>
<@audio/gain volume="0.3" id="gain" connect="#speaker"></@audio/gain>
<audio-speaker id="speaker"></audio-speaker>
```

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
