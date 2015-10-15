[![npm install audio-gain](https://nodei.co/npm/audio-gain.png?mini=true)](https://npmjs.org/package/audio-gain/)

```js
var Gain = require('audio-gain');
var Speaker = require('audio-speaker');
var Generator = require('audio-generator');

Generator({
	duration: 2
})
.pipe(Gain(0.2))
.pipe(Speaker());

setTimeout(function () {

}, 1000)
```


## `<audio-gain></audio-gain>`

```html
<link rel="import" href="node_modules/audio-speaker">
<link rel="import" href="node_modules/audio-generator">
<link rel="import" href="node_modules/audio-gain">

<audio-generator id="generator" connect="#gain"></audio-generator>
<audio-gain volume="0.3" id="gain" connect="#speaker"/></audio-gain>
<output is="audio-speaker" id="speaker"/>
```


## `$ gain`

```sh
$ cat sample.wav | gain --volume 0.5 | speaker
```


> [GainNode](https://developer.mozilla.org/en-US/docs/Web/API/GainNode) — gain node in web-audio-api.</br>
> [pcm-volume](https://developer.mozilla.org/en-US/docs/Web/API/pcm-volume) — similar package, volume is taken as tangential.</br>