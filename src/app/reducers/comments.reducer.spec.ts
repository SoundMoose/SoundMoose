'use strict';

import commentsReducer from './comments.reducer';

describe('Comments Reducer', () => {

  let state;

  beforeEach(() => {
    state = [];

    Object.freeze(state);
  });

  it('should handle undefined state and known actions', () => {
    // Handling a bad dispatch.
    let actual = commentsReducer(undefined, { type: 'TACOS' });

    // Should return the default state.
    expect(actual).toEqual(state);
  });

});
