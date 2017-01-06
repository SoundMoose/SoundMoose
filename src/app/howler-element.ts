export class AudioStream extends HTMLAudioElement {};

export const AUDIO_STREAM_PROVIDER = {
  provide: AudioStream,
  useFactory: () => new Audio(),
};
