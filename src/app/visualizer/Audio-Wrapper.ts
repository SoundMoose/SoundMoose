export class AudioCtx extends HTMLAudioContextElement {};

export const AUDIO_STREAM_PROVIDER = {
  provide: AudioContext,
  useFactory: () => new Audio(),
};
