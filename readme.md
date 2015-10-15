[![npm install audio-gain](https://nodei.co/npm/audio-gain.png?mini=true)](https://npmjs.org/package/audio-gain/)


```js
var Gain = require('audio-gain');
var Speaker = require('audio-speaker');
var Generator = require('audio-generator');

var generator = Generator({ duration: 2 });
var gain = Gain(0.2);
var speaker = Speaker();

setTimeout(function () {
	gain.setVolume(0.5);
}, 1000);

generator.pipe(gain).pipe(speaker);
```


```html
<link rel="import" href="node_modules/audio-speaker">
<link rel="import" href="node_modules/audio-generator">
<link rel="import" href="node_modules/audio-gain">

<audio-generator id="generator" connect="#gain"/>
<audio-gain volume="0.3" id="gain" connect="#speaker"/>
<audio-speaker id="speaker"/>
```


```sh
$ cat sample.wav | gain --volume 0.5 | speaker
```


> [GainNode](https://developer.mozilla.org/en-US/docs/Web/API/GainNode) — gain node in web-audio-api.</br>
> [pcm-volume](https://npmjs.org/package/pcm-volume) — similar package, volume is taken as tangential.</br>
> [audio-lab](https://github.com/audio-lab/lab) — audio playground, sound graph constructor.</br>