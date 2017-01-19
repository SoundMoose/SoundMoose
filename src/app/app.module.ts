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
import { SortablejsModule } from 'angular-sortablejs';

import { FavoriteService } from './services/favorite.service';
import { SoundCloudService } from './services/soundcloud.service';
import { SpotifyService } from './services/spotify.service';
import { LastfmService } from './services/lastfm.service';
import { YoutubeService } from './services/youtube.service';
import { PlayerService } from './services/player.service';
import { PlaylistService } from './services/playlist.service';
import { AudioControlsService } from './services/audio-controls.service';
import { Auth } from './services/auth.service';
import { AUDIO_STREAM_PROVIDER } from './audio-element';

import soundmooseUser from './reducers/soundmoose-user.reducer';
import player from './reducers/player.reducer';
import tracks from './reducers/tracks.reducer';
import spinner from './reducers/spinner.reducer';
import audiocontrols from './reducers/audio-controls.reducer';
import trackDetails from './reducers/track-details.reducer';
import comments from './reducers/comments.reducer';
import favorites from './reducers/favorites.reducer';
import playlist from './reducers/playlist.reducer';
import search from './reducers/search.reducer';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';

// App is our top level component
import { AppComponent } from './app.component';
import { TopTracksComponent } from './components/top-tracks/top-tracks.component';
import { SimilarArtistsComponent } from './components/track-detail/similar-artists/similar-artists.component';
import { SimilarTracksComponent } from './components/track-detail/similar-tracks/similar-tracks.component';
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
import { SearchResultsComponent } from './components/search/search-results/search-results.component';
import { UserComponent } from './components/user/user.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { GameComponent } from './components/game/game.component';
import { GamePlayerComponent } from './components/game/game-player/game-player.component';
import { VisualizationControlComponent } from './components/player/visualization-control/visualization-control.component';
import { HeaderComponent } from './components/header/header.component';
import { CommentsComponent } from './components/track-detail/comments/comments.component';

// 2d visualizations and audio controls deck
import { AudioControlsComponent } from './components/audio-controls/audio-controls.component';
import { FrequencyVisualizerComponent } from './components/audio-controls/visualizer/frequency-visualizer.component';
import { WaveformVisualizerComponent } from './components/audio-controls/visualizer/waveform-visualizer.component';
import { EqualizerComponent } from './components/audio-controls/equalizer/equalizer.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { PlaylistTrackDetailsComponent } from './components/playlist/playlist-track-details/playlist-track-details.component';
import { PlaylistTrackListComponent } from './components/playlist/playlist-track-list/playlist-track-list.component';

// 3d visualizations
import { ThreeDComponent } from './components/three-d/three-d.component';
import { ThreeDFrequencyBarsComponent } from './components/three-d/three-d-frequencyBars.component';
import { ThreeDParticlesComponent } from './components/three-d/three-d-particles.component';
import { ThreeDSphereComponent } from './components/three-d/three-d-sphere.component';

// Actions
import { SoundmooseUserActions } from './actions/soundmoose-user.actions';
import { SearchActions } from './actions/search.actions';
import { TrackActions } from './actions/track.actions';
import { PlayerActions } from './actions/player.actions';
import { FavoriteActions } from './actions/favorite.actions';
import { AudioControlsActions } from './actions/audio-controls.actions';
import { PlaylistActions } from './actions/playlist.actions';
import { YoutubePipe } from './youtube.pipe';

// Application wide providers
const APP_PROVIDERS = [
  FavoriteService,
  SpotifyService,
  LastfmService,
  SoundCloudService,
  YoutubeService,
  PlayerService,
  AudioControlsService,
  AUDIO_STREAM_PROVIDER,
  TrackActions,
  PlayerActions,
  AudioControlsActions,
  FavoriteActions,
  PlaylistService,
  PlaylistActions,
  SearchActions,
  SoundmooseUserActions
];

const metaReducers = (ENV !== 'production') ? [storeFreeze, combineReducers] : [combineReducers];

const store = compose(...metaReducers)({
  player: player,
  tracks: tracks,
  spinner: spinner,
  audiocontrols: audiocontrols,
  trackDetails: trackDetails,
  comments: comments,
  soundmooseUser: soundmooseUser,
  favorites: favorites,
  playlist: playlist,
  search: search
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
    SimilarArtistsComponent,
    SimilarTracksComponent,
    YoutubePipe,
    SearchComponent,
    SearchResultsComponent,
    ThreeDComponent,
    PlaylistComponent,
    PlaylistTrackDetailsComponent,
    PlaylistTrackListComponent,
    ThreeDFrequencyBarsComponent,
    ThreeDParticlesComponent,
    ThreeDSphereComponent,
    FavoritesComponent,
    UserComponent,
    GameComponent,
    GamePlayerComponent,
    VisualizationControlComponent,
    HeaderComponent,
    CommentsComponent
  ],
  imports: [
    MomentModule,
    BrowserModule,
    StoreModule.provideStore(store),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    HttpModule,
    MaterialModule.forRoot(),
    FormsModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
    SortablejsModule,
    RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules })
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
