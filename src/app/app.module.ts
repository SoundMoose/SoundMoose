import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { combineReducers, StoreModule } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { compose } from '@ngrx/core/compose';

import { SoundCloudService } from './services/soundcloud.service';
import { PlayerService } from './services/player.service';
import { AudioControlsService } from './services/audio-controls.service';
import { AUDIO_STREAM_PROVIDER } from './audio-element';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import player from './reducers/player.reducer';
import tracks from './reducers/tracks.reducer';
import spinner from './reducers/spinner.reducer';
import audiocontrols from './reducers/audio-controls.reducer';

import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';

// App is our top level component
import { AppComponent } from './app.component';

import { TopTracksComponent } from './components/top-tracks/top-tracks.component';
import { PlayerComponent } from './components/player/player.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { PlayerControlsComponent } from './components/player/player-controls/player-controls.component';
import { VolumeControlComponent } from './components/player/volume-control/volume-control.component';
import { TrackInfoComponent } from './components/player/track-info/track-info.component';
import { TrackProgressComponent } from './components/player/track-progress/track-progress.component';
import { TopTrackTileComponent } from './components/top-tracks/top-track-tile/top-track-tile.component';

  // Audio Controls Deck:
import { AudioControlsComponent } from './components/audio-controls/audio-controls.component';
import { FrequencyVisualizerComponent } from './components/audio-controls/visualizer/frequency-visualizer.component';
import { WaveformVisualizerComponent } from './components/audio-controls/visualizer/waveform-visualizer.component';
import { EqualizerComponent } from './components/audio-controls/equalizer/equalizer.component';


import { TrackActions } from './actions/track.actions';
import { PlayerActions } from './actions/player.actions';
import { AudioControlsActions } from './actions/audio-controls.actions';

import { MaterialModule } from '@angular/material';
import 'hammerjs';

// Application wide providers
const APP_PROVIDERS = [
  SoundCloudService,
  PlayerService,
  AudioControlsService,
  AUDIO_STREAM_PROVIDER,
  TrackActions,
  PlayerActions,
  AudioControlsActions
];

const metaReducers = (ENV !== 'production') ? [storeFreeze, combineReducers] : [combineReducers];

const store = compose(...metaReducers)({
  player: player,
  tracks: tracks,
  spinner: spinner
});


/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    TopTracksComponent,
    PlayerComponent,
    PlayerControlsComponent,
    VolumeControlComponent,
    TrackInfoComponent,
    TrackProgressComponent,
    TopTrackTileComponent,
    SpinnerComponent,
    AudioControlsComponent,
    FrequencyVisualizerComponent,
    WaveformVisualizerComponent,
    EqualizerComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.provideStore({
      player: player,
      tracks: tracks,
      spinner: spinner,
      audiocontrols: audiocontrols
    }),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    HttpModule,
    MaterialModule.forRoot(),
    FormsModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {
  constructor() {}

}
