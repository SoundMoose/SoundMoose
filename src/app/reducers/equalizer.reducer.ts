import { Action } from '@ngrx/store';

import { Equalizer } from '../models/equalizer.model';
// import { EqualizerActions } from '../actions/equalizer.actions';

export type EqualizerState = Equalizer;

const initialState: EqualizerState = {

};

export default function (state = initialState, action: Action): EqualizerState {

  return state;

}
