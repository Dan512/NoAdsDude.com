/**
 * SPIKE — AudioWorklet shell.
 *
 * This file deliberately does almost nothing. It accumulates overlapping frames and posts
 * them out; all analysis happens in `spikes/mic/dsp.ts`, which has no Web Audio references
 * and can therefore run against WAV fixtures in CI.
 *
 * Timestamps use `currentTime`, the AudioContext clock. §8 of the spec requires a single
 * clock domain end to end — mixing in performance.now() silently reintroduces exactly the
 * latency error the calibration step exists to remove.
 *
 * Plain JS in public/ because worklet modules are fetched by URL at runtime, not bundled.
 */

class PitchProcessor extends AudioWorkletProcessor {
  constructor(options) {
    super()
    const opts = (options && options.processorOptions) || {}
    this.frameSize = opts.frameSize || 4096
    this.hopSize = opts.hopSize || 1024
    this.buffer = new Float32Array(this.frameSize)
    this.filled = 0
  }

  process(inputs) {
    const input = inputs[0]
    if (!input || input.length === 0) return true

    const channel = input[0]
    if (!channel) return true

    for (let i = 0; i < channel.length; i++) {
      this.buffer[this.filled++] = channel[i]

      if (this.filled === this.frameSize) {
        const copy = this.buffer.slice()
        // Transfer rather than clone — this runs ~47 times a second.
        this.port.postMessage({ frame: copy, time: currentTime }, [copy.buffer])

        this.buffer.copyWithin(0, this.hopSize)
        this.filled = this.frameSize - this.hopSize
      }
    }

    return true
  }
}

registerProcessor('pitch-processor', PitchProcessor)
