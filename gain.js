import createGain from 'gain.wasm'

// instantiate
const instance = createGain({ setup: {
  blockSize: new WebAssembly.Global({value: 'i32', mutable: false}, 1024)
} }),
      { gain: process, memory, blockSize } = instance.exports


// @param input is list of channels
export default (input, gain) => {
  const channels = input.length, len = input[0].length

  // pass args
  blockSize.value = input[0].length

  for (let c = 0; c < channels; c++) memory.set(input[c], c * blockSize * 4)

  // a-rate gain
  if (gain.length) memory.set(gain, channels * blockSize * 4)

  process(channels | IN, gain.length ? PARAM : gain )

  return new Float32Array(memory, )
}
