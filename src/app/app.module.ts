import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AUTH_PROVIDERS }  from 'angular2-jwt';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { combineReducers, StoreModule } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { compose } from '@ngrx/core/compose';
import { MomentModule } from 'angular2-moment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { SoundCloudService } from './services/soundcloud.service';
import { YoutubeService } from './services/youtube.service';
import { PlayerService } from './services/player.service';
import { AudioControlsService } from './services/audio-controls.service';
import { Auth } from './services/auth.service';
import { AUDIO_STREAM_PROVIDER } from './audio-element';

import player from './reducers/player.reducer';
import tracks from './reducers/tracks.reducer';
import spinner from './reducers/spinner.reducer';
import audiocontrols from './reducers/audio-controls.reducer';
import trackDetails from './reducers/track-details.reducer';
import comments from './reducers/comments.reducer';

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
import { TrackProgressComponent } from './components/player/track-progress-container/track-progress/track-progress.component';
import { TrackProgressContainerComponent } from './components/player/track-progress-container/track-progress-container.component';
import { TopTrackTileComponent } from './components/top-tracks/top-track-tile/top-track-tile.component';
import { TrackDetailComponent } from './components/track-detail/track-detail.component';
import { SearchComponent } from './components/search/search.component';
import { ThreeDComponent } from './components/threeD/three-d.component';
import { AudioControlsComponent } from './components/audio-controls/audio-controls.component';
import { FrequencyVisualizerComponent } from './components/audio-controls/visualizer/frequency-visualizer.component';
import { WaveformVisualizerComponent } from './components/audio-controls/visualizer/waveform-visualizer.component';
import { EqualizerComponent } from './components/audio-controls/equalizer/equalizer.component';

import { TrackActions } from './actions/track.actions';
import { PlayerActions } from './actions/player.actions';
import { AudioControlsActions } from './actions/audio-controls.actions';
import { YoutubePipe } from './youtube.pipe';

// Application wide providers
const APP_PROVIDERS = [
  SoundCloudService,
  YoutubeService,
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
  spinner: spinner,
  audiocontrols: audiocontrols,
  trackDetails: trackDetails,
  comments: comments
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
    TrackProgressContainerComponent,
    TopTrackTileComponent,
    SpinnerComponent,
    AudioControlsComponent,
    FrequencyVisualizerComponent,
    WaveformVisualizerComponent,
    EqualizerComponent,
    TrackDetailComponent,
    YoutubePipe,
    SearchComponent,
    ThreeDComponent
  ],
  imports: [
    MomentModule,
    BrowserModule,
    StoreModule.provideStore(store),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    HttpModule,
    MaterialModule.forRoot(),
    FormsModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    AUTH_PROVIDERS
  ]
})
export class AppModule {
  constructor() {}

}
