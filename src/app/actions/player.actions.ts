import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Player } from '../models/player.model';
import { Track } from '../models/track.model';

@Injectable()
export class PlayerActions {

  static VOLUME_CHANGE = '[Player] Volume Change';
  volumeChange(volume: number, isMuted: boolean): Action {
    return {
      type: PlayerActions.VOLUME_CHANGE,
      payload: {
        volume,
        isMuted
      }
    };
  }

  static VOLUME_MUTE_TOGGLE = '[Player] Volume Mute Toggle';
  volumeMuteToggle(volume: number, isMuted: boolean): Action {
    return {
      type: PlayerActions.VOLUME_MUTE_TOGGLE,
      payload: {
        volume,
        isMuted
      }
    };
  }

  // Duplicate code in Track Action for ease of implementation.
  // fix later by tying both together
  static TOGGLE_PLAY_PAUSE = '[Player] Toggle Play/Pause';
  togglePlayPause(): Action {
    return {
      type: PlayerActions.TOGGLE_PLAY_PAUSE,
    };
  }

  static TOGGLE_REPEAT = '[Player] Toggle Repeat';
  toggleRepeat(): Action {
    return {
      type: PlayerActions.TOGGLE_REPEAT,
    };
  }

  static TOGGLE_SHUFFLE = '[Player] Toggle Shuffle';
  toggleShuffle(): Action {
    return {
      type: PlayerActions.TOGGLE_SHUFFLE,
    };
  }

  static TOGGLE_VISUALIZATION = '[Player] Toggle Visualization';
  toggleShowVisualization(): Action {
    return {
      type: PlayerActions.TOGGLE_VISUALIZATION,
    };
  }

  static JUMP_TO_NEXT = '[Player] Jump To Next';
  jumpToNext(nextTrack: Track, trackId: number): Action {
    return {
      type: PlayerActions.JUMP_TO_NEXT,
      payload: [nextTrack, trackId]
    };
  }

  static JUMP_TO_PREVIOUS = '[Player] Jump To Previous';
  jumpToPrevious(previousTrack: Track, trackId: number): Action {
    return {
      type: PlayerActions.JUMP_TO_PREVIOUS,
      payload: [previousTrack, trackId]
    };
  }

  static START_AUDIO_PLAYING = '[Player] Start <audio> playing';
  startAudioPlaying(timerInfo: {}): Action {
    return {
      type: PlayerActions.START_AUDIO_PLAYING,
      payload: timerInfo  // <-- Do we need this?
    };
  }
  static START_AUDIO_LOADING = '[Player] Start <audio> loading';
  startAudioLoading(): Action {
    return {
      type: PlayerActions.START_AUDIO_LOADING
    };
  }

  static SET_BUFFERED_RANGES = '[Player] Set buffered regions';
  setBufferedRanges(regions: number[][] | number[]) {
    return {
      type: PlayerActions.SET_BUFFERED_RANGES,
      payload: regions
    };
  }
}
