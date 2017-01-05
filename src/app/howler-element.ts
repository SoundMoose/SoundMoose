//import { Howl } from "howler";

// export default function() {
//
//   var testSound = new Howl({
//     src: ['http://localhost:3000/assets/sounds/Broke_For_Free_-_01_-_Night_Owl.mp3']
//   });
//
// // testSound.play(); // to play call this method.
//
// }
// var sound = new Howl({
//   src: ['sound.webm', 'sound.mp3', 'sound.wav'],
//   autoplay: true,
//   loop: true,
//   volume: 0.5,
//   onend: function() {
//       console.log('Finished!');
//   }
// });

export class AudioStream extends HTMLAudioElement {};

export const AUDIO_STREAM_PROVIDER = {
  provide: AudioStream,
  useFactory: () => new Audio(),
};
