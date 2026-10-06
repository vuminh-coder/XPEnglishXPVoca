/**
 * Web Audio API Ambient Sound Synthesizer
 * Generates natural focus sounds (Rain, Ocean Waves, Fireplace, Wind)
 * 100% offline, zero network requests, zero CORS issues, featherlight CPU usage.
 */

export type AmbienceType = "none" | "rain" | "waves" | "fireplace" | "forest";

export interface AmbienceTrackInfo {
  id: AmbienceType;
  name: string;
  nameVn: string;
  icon: string;
  description: string;
}

export const AMBIENCE_TRACKS: AmbienceTrackInfo[] = [
  {
    id: "none",
    name: "None",
    nameVn: "Tắt âm nền",
    icon: "VolumeX",
    description: "Không phát âm thanh tập trung",
  },
  {
    id: "rain",
    name: "Gentle Rain",
    nameVn: "Mưa rơi êm đềm",
    icon: "CloudRain",
    description: "Tiếng mưa rơi tí tách giúp tĩnh tâm và tăng độ tập trung sâu",
  },
  {
    id: "waves",
    name: "Ocean Waves",
    nameVn: "Sóng biển vỗ bờ",
    icon: "Waves",
    description: "Nhịp sóng biển êm dịu điều hòa hơi thở và giảm căng thẳng",
  },
  {
    id: "fireplace",
    name: "Cozy Fireplace",
    nameVn: "Lửa sưởi ấm cúng",
    icon: "Flame",
    description: "Tiếng lửa bập bùng tạo không gian ấm áp như quán cà phê mùa đông",
  },
  {
    id: "forest",
    name: "Forest Wind",
    nameVn: "Gió rừng đại ngàn",
    icon: "Wind",
    description: "Tiếng gió lùa qua tán cây mang lại cảm giác khoáng đạt, thư thái",
  },
];

class AmbientAudioSynthesizer {
  private audioCtx: AudioContext | null = null;
  private currentMode: AmbienceType = "none";
  private masterGain: GainNode | null = null;
  private activeNodes: (AudioNode | number)[] = [];
  private volume: number = 0.35; // 0.0 to 1.0

  private getAudioContext(): AudioContext {
    if (!this.audioCtx) {
      const AudioCtxClass =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
    }
    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.audioCtx.currentTime, 0.05);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getCurrentMode(): AmbienceType {
    return this.currentMode;
  }

  public stop() {
    this.currentMode = "none";
    if (this.audioCtx && this.masterGain) {
      this.masterGain.gain.setTargetAtTime(0, this.audioCtx.currentTime, 0.1);
    }
    setTimeout(() => {
      this.cleanupNodes();
    }, 150);
  }

  private cleanupNodes() {
    this.activeNodes.forEach((node) => {
      if (typeof node === "number") {
        clearInterval(node);
      } else {
        try {
          if ("stop" in node && typeof (node as AudioScheduledSourceNode).stop === "function") {
            (node as AudioScheduledSourceNode).stop();
          }
          node.disconnect();
        } catch {
          // Ignore disconnection errors on already destroyed nodes
        }
      }
    });
    this.activeNodes = [];
  }

  public play(mode: AmbienceType) {
    if (mode === "none") {
      this.stop();
      return;
    }

    try {
      const ctx = this.getAudioContext();
      this.cleanupNodes();
      this.currentMode = mode;

      this.masterGain = ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, ctx.currentTime);
      this.masterGain.connect(ctx.destination);
      this.activeNodes.push(this.masterGain);

      if (mode === "rain") {
        this.startRainSynthesis(ctx, this.masterGain);
      } else if (mode === "waves") {
        this.startWavesSynthesis(ctx, this.masterGain);
      } else if (mode === "fireplace") {
        this.startFireplaceSynthesis(ctx, this.masterGain);
      } else if (mode === "forest") {
        this.startForestSynthesis(ctx, this.masterGain);
      }
    } catch (e) {
      console.warn("[AmbientAudioSynthesizer] Audio initialization notice:", e);
    }
  }

  /**
   * Generates continuous pink/brown noise filtered to emulate raindrops falling on leaves
   */
  private startRainSynthesis(ctx: AudioContext, destination: GainNode) {
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      output[i] = (b0 + b1 + b2) * 0.11;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1200, ctx.currentTime);

    const highpass = ctx.createBiquadFilter();
    highpass.type = "highpass";
    highpass.frequency.setValueAtTime(300, ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(highpass);
    highpass.connect(destination);

    whiteNoise.start();
    this.activeNodes.push(whiteNoise, filter, highpass);
  }

  /**
   * Generates sweeping low-frequency wave swells (8s period)
   */
  private startWavesSynthesis(ctx: AudioContext, destination: GainNode) {
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5;
    }

    const brownNoise = ctx.createBufferSource();
    brownNoise.buffer = noiseBuffer;
    brownNoise.loop = true;

    const waveFilter = ctx.createBiquadFilter();
    waveFilter.type = "lowpass";
    waveFilter.frequency.setValueAtTime(400, ctx.currentTime);

    // LFO to modulate wave intensity every 7.5s
    const lfo = ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.13, ctx.currentTime); // ~7.7s period

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(300, ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(waveFilter.frequency);

    const swellGain = ctx.createGain();
    swellGain.gain.setValueAtTime(0.6, ctx.currentTime);

    brownNoise.connect(waveFilter);
    waveFilter.connect(swellGain);
    swellGain.connect(destination);

    brownNoise.start();
    lfo.start();
    this.activeNodes.push(brownNoise, waveFilter, lfo, lfoGain, swellGain);
  }

  /**
   * Generates crackling wood pop sounds on low rumble
   */
  private startFireplaceSynthesis(ctx: AudioContext, destination: GainNode) {
    // Base warmth rumble
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.015 * white) / 1.015;
      lastOut = output[i];
      output[i] *= 2.0;
    }

    const rumble = ctx.createBufferSource();
    rumble.buffer = noiseBuffer;
    rumble.loop = true;

    const rumbleFilter = ctx.createBiquadFilter();
    rumbleFilter.type = "lowpass";
    rumbleFilter.frequency.setValueAtTime(250, ctx.currentTime);

    rumble.connect(rumbleFilter);
    rumbleFilter.connect(destination);
    rumble.start();
    this.activeNodes.push(rumble, rumbleFilter);

    // Random pops generator interval
    const intervalId = window.setInterval(() => {
      if (this.currentMode !== "fireplace") return;
      if (Math.random() > 0.4) {
        try {
          const pop = ctx.createOscillator();
          const popGain = ctx.createGain();
          const now = ctx.currentTime;
          pop.frequency.setValueAtTime(80 + Math.random() * 400, now);
          pop.frequency.exponentialRampToValueAtTime(30, now + 0.04);

          popGain.gain.setValueAtTime(0.12 * (0.4 + Math.random() * 0.6), now);
          popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

          pop.connect(popGain);
          popGain.connect(destination);
          pop.start(now);
          pop.stop(now + 0.05);
        } catch {
          // ignore pop scheduling errors
        }
      }
    }, 180);

    this.activeNodes.push(intervalId as unknown as number);
  }

  /**
   * Generates rustling forest wind
   */
  private startForestSynthesis(ctx: AudioContext, destination: GainNode) {
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.08;
    }

    const windSource = ctx.createBufferSource();
    windSource.buffer = noiseBuffer;
    windSource.loop = true;

    const windFilter = ctx.createBiquadFilter();
    windFilter.type = "bandpass";
    windFilter.frequency.setValueAtTime(450, ctx.currentTime);
    windFilter.Q.setValueAtTime(2.0, ctx.currentTime);

    const lfo = ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.18, ctx.currentTime);

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(200, ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(windFilter.frequency);

    windSource.connect(windFilter);
    windFilter.connect(destination);

    windSource.start();
    lfo.start();
    this.activeNodes.push(windSource, windFilter, lfo, lfoGain);
  }
}

export const ambientSynthesizer = new AmbientAudioSynthesizer();
