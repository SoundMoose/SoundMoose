import playlistReducer from './playlist.reducer';

import { PlaylistActions } from '../actions/playlist.actions';

'use strict';

describe('Playlist Reducer', () => {

  let playlistActions = new PlaylistActions(),
      state,
      playlist;

  beforeEach(() => {
    state = {
      id: 0,
      userId: '',
      name: '',
      tracks: []
    };

    playlist = {
      id: 1,
      userId: '1',
      name: 'A',
      tracks: [
        {
          id: 1,
          title: 'Tacos',
          artist: 'Mexican Food',
          imgUrl: 'http://www.google.com',
          streamUrl: 'http://www.google.com',
          duration: 123,
          platform: 'pizza'
        }, {
          id: 2,
          title: 'Burritos',
          artist: 'Mexican Food',
          imgUrl: 'http://www.google.com',
          streamUrl: 'http://www.google.com',
          duration: 123,
          platform: 'pizza'
        }, {
          id: 3,
          title: 'Churros',
          artist: 'Mexican Food',
          imgUrl: 'http://www.google.com',
          streamUrl: 'http://www.google.com',
          duration: 123,
          platform: 'pizza'
        }, {
          id: 4,
          title: 'Flan',
          artist: 'Mexican Food',
          imgUrl: 'http://www.google.com',
          streamUrl: 'http://www.google.com',
          duration: 123,
          platform: 'pizza'
        }
      ]
    };

    Object.freeze(state);
  });

  it('should handle no state being passed in and unknown types', () => {
    // Dispatching an undefined state and unknown action.
    let actual = playlistReducer(undefined, {type: 'TACOS'});

    // Just return the default state.
    expect(actual).toEqual(state);
  });

  it('should load tracks into the playlist', () => {
    let actual = playlistReducer(state, playlistActions.loadTracks(playlist));

    expect(actual).toEqual(playlist);
  });

  it('should change the order of the playlist', () => {
    let actual1 = playlistReducer(state, playlistActions.loadTracks(playlist));
    let actual2 = playlistReducer(actual1, playlistActions.changeOrder(3, 0));

    expect(actual2).toEqual({
      id: 1,
      userId: '1',
      name: 'A',
      tracks: [
        {
          id: 4,
          title: 'Flan',
          artist: 'Mexican Food',
          imgUrl: 'http://www.google.com',
          streamUrl: 'http://www.google.com',
          duration: 123,
          platform: 'pizza'
        }, {
          id: 1,
          title: 'Tacos',
          artist: 'Mexican Food',
          imgUrl: 'http://www.google.com',
          streamUrl: 'http://www.google.com',
          duration: 123,
          platform: 'pizza'
        }, {
          id: 2,
          title: 'Burritos',
          artist: 'Mexican Food',
          imgUrl: 'http://www.google.com',
          streamUrl: 'http://www.google.com',
          duration: 123,
          platform: 'pizza'
        }, {
          id: 3,
          title: 'Churros',
          artist: 'Mexican Food',
          imgUrl: 'http://www.google.com',
          streamUrl: 'http://www.google.com',
          duration: 123,
          platform: 'pizza'
        }
      ]
    });
  });

});
