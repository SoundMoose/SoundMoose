import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import tracks from './reducers/tracks';
import { SoundCloudService } from './services/soundcloud.service';

// import { Player, Song } from './reducers/';
import Player from './reducers/player.reducer';
import Track from './reducers/track.reducer';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
// App is our top level component
import { AppComponent } from './app.component';

import { TopTracksComponent } from './components/top-tracks/top-tracks.component';

// Application wide providers
const APP_PROVIDERS = [
  SoundCloudService
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    TopTracksComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.provideStore({
      player: Player,
      tracks: tracks
    }),
    HttpModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {
  constructor() {}

}
