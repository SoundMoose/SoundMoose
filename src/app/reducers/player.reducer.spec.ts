import playerReducer from './player.reducer';

import { Player } from '../models/player.model';
import { Track } from '../models/track.model';

import { PlayerActions } from '../actions/player.actions';
import { TrackActions } from '../actions/track.actions';



'use strict';

describe('Player Reducer', () => {

  let trackActions = new TrackActions(),
      playerActions = new PlayerActions(),
      state,
      tracks: Track[];

  beforeEach(() => {
    state = {
      isPlaying: false,
      // currentTime: 0,
      currentTrack: {
        id: 0,
        title: '',
        artist: '',
        imgUrl: '',
        streamUrl: '',
        duration: 0
      },
      volume: 50,

      isMuted: false,
      volumeBeforeMute: 5,

      repeatTrack: false,
      shuffleTracks: false,
      bufferedRanges: [],
      showVisualization: false
    },

    tracks = [
      {
        id: 1,
        title: 'Tacos',
        artist: 'Mexican Food',
        imgUrl: 'http://www.google.com',
        streamUrl: 'http://www.google.com',
        duration: 123
      }, {
        id: 2,
        title: 'Burritos',
        artist: 'Mexican Food',
        imgUrl: 'http://www.google.com',
        streamUrl: 'http://www.google.com',
        duration: 123
      }
    ];

    Object.freeze(state);
  });

  it('should handle no state being passed in and unknown types', () => {
    // Dispatching an undefined state and unknown action.
    let actual = playerReducer(undefined, {type: 'TACOS'});

    // Just return the default state.
    expect(state).toEqual(actual);
  });

  it('should add a track', () => {
    // Simulate click on Track-Tile.
    let actual = playerReducer(state, trackActions.togglePlayPause(tracks[0]));

    // Current Track should now be the Track what we clicked on.
    expect(actual.currentTrack).toEqual(tracks[0]);
  });

  it('should start playing the track', () => {
    // Simulate click on Track-Tile.
    let actual = playerReducer(state, trackActions.togglePlayPause(tracks[0]));

    // isPlaying should now be set to true so that the track we clicked on starts playing.
    expect(actual.isPlaying).toBe(true);
  });

  it('should pause track on track-tile', () => {
    // Simulate click on Track-Tile.
    let actual1 = playerReducer(state, trackActions.togglePlayPause(tracks[0]));
    // Simulate click on Track-Tile
    let actual2 = playerReducer(actual1, trackActions.togglePlayPause(tracks[0]));

    // Current Track should now be the Track what we clicked on.
    expect(actual2.currentTrack).toEqual(tracks[0]);
    // isPlaying should now be set to false so that the track pauses.
    expect(actual2.isPlaying).toBe(false);
  });

  it('should pause track on player', () => {
    // Simulate click on Track-Tile.
    let actual1 = playerReducer(state, trackActions.togglePlayPause(tracks[0]));
    // Simulate click on Play/Pause button in Player.
    let actual2 = playerReducer(actual1, playerActions.togglePlayPause());

    // isPlaying should now be set to false so that the track pauses.
    expect(actual2.isPlaying).toBe(false);
  });

  it('should play a paused track on the player', () => {
    // Simulate click on Track-Tile.
    let actual1 = playerReducer(state, trackActions.togglePlayPause(tracks[0]));
    // Simulate click on Play/Pause button in Player.
    let actual2 = playerReducer(actual1, playerActions.togglePlayPause());
    // Simulate click on Play/Pause button in Player.
    let actual3 = playerReducer(actual2, playerActions.togglePlayPause());

    // isPlaying should now be set to true so that the track starts to play again.
    expect(actual3.isPlaying).toBe(true);
  });

  it('should toggle repeat', () => {
    // Simulate click on Repeat button.
    let actual = playerReducer(state, playerActions.toggleRepeat());

    // repeatTrack should now be true so that tracks will repeat.
    expect(actual.repeatTrack).toBe(true);
  });

  it('should toggle off repeat', () => {
    // Simulate click on Repeat button.
    let actual1 = playerReducer(state, playerActions.toggleRepeat());
    // Simulate click on Repeat button.
    let actual2 = playerReducer(actual1, playerActions.toggleRepeat());

    // repeatTrack should now be false so that tracks will not repeat.
    expect(actual2.repeatTrack).toBe(false);
  });

  it('should toggle shuffle', () => {
    // Simulate click on Shuffle button.
    let actual = playerReducer(state, playerActions.toggleShuffle());

    // shuffleTracks should now be true so that tracks will shuffle.
    expect(actual.shuffleTracks).toBe(true);
  });

  it('should toggle off shuffle', () => {
    // Simulate click on Shuffle button.
    let actual1 = playerReducer(state, playerActions.toggleShuffle());
    // Simulate click on Shuffle button.
    let actual2 = playerReducer(actual1, playerActions.toggleShuffle());

    // shuffleTracks should now be false so that tracks will not shuffle.
    expect(actual2.shuffleTracks).toBe(false);
  });

  // it('should update the current time', () => {
  //   // Simulate current time change.
  //   let actual = playerReducer(state, playerActions.updateCurrentTime(1337));

  //   // currentTime should now be equal to what we set it to.
  //   expect(actual.currentTime).toBe(1337);
  // });

  it('should set the buffer range', () => {
    // Define buffer ranges.
    let range = [[2, 8], [10, 12]];
    // Update buffer.
    let actual = playerReducer(state, playerActions.setBufferedRanges(range));

    // bufferedRanges should now equal the ranges we passed in.
    expect(actual.bufferedRanges).toEqual(range);
  });

  it('should play the next track', () => {
    // Simulate click on Track-Tile.
    let actual1 = playerReducer(state, trackActions.togglePlayPause(tracks[0]));
    // Simulate click on Next button.
    let actual2 = playerReducer(actual1, playerActions.jumpToNext(tracks[1]));

    // Should now be playing the track passed to the next function.
    expect(actual2.currentTrack).toEqual(tracks[1]);
  });

  it('should play the previous track', () => {
    // Simulate click on Track-Tile.
    let actual1 = playerReducer(state, trackActions.togglePlayPause(tracks[1]));
    // Sumulate click on Previous button.
    let actual2 = playerReducer(actual1, playerActions.jumpToPrevious(tracks[0]));

    // Should now be playing the track passed to the previous function.
    expect(actual2.currentTrack).toEqual(tracks[0]);
  });

  it('should mute the volume', () => {
    // Simulate click on the Mute button.
    let actual = playerReducer(state, playerActions.volumeMuteToggle(25, false));

    // volumeBeforeMute should be set to 25.
    expect(actual.volumeBeforeMute).toEqual(25);
    // volume should be set to 0.
    expect(actual.volume).toEqual(0);
    // isMuted should now be set to true.
    expect(actual.isMuted).toBe(true);
  });

  it('should unmute the volume', () => {
    // Simulate click on the Mute button.
    let actual1 = playerReducer(state, playerActions.volumeMuteToggle(25, false));
    // Sumulate click on the Mute button.
    let actual2 = playerReducer(actual1, playerActions.volumeMuteToggle(0, true));

    // volume should be set to 25.
    expect(actual2.volume).toEqual(25);
    // isMuted should now be set to false.
    expect(actual2.isMuted).toBe(false);
  });

  it('should change the volume', () => {
    // Simulate volume change.
    let actual = playerReducer(state, playerActions.volumeChange(25, false));

    // Volume should now be set to 25.
    expect(actual.volume).toEqual(25);
    // Make sure isMuted is still false;
    expect(actual.isMuted).toBe(false);
  });

  it('should mute through chaning the volume', () => {
    // Simulate volume change.
    let actual = playerReducer(state, playerActions.volumeChange(0, false));

    // Volume should now be set to 0.
    expect(actual.volume).toEqual(0);
    // volumeBeforeMute should now be set to 10.
    expect(actual.volumeBeforeMute).toEqual(10);
    // isMuted should be set to true.
    expect(actual.isMuted).toBe(true);
  });

  it('should unmute by changing the volume', () => {
    // Simulate click on the Mute button.
    let actual1 = playerReducer(state, playerActions.volumeMuteToggle(25, false));
    // Simulate volume change.
    let actual2 = playerReducer(actual1, playerActions.volumeChange(75, true));

    // Volume should now be set to 25.
    expect(actual2.volume).toEqual(25);
    // isMuted should now be set to false;
    expect(actual2.isMuted).toBe(false);
  });

});
