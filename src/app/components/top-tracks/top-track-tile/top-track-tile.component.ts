import { Component, Input } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core'
import { Store } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { AppStore } from './../../../models/appstore.model';
import { Track } from '../../../models/track.model';
import { Player } from '../../../models/player.model';
import { TrackActions } from '../../../actions/track.actions';
import { PlayerService } from '../../../services/player.service';
import { FavoriteActions } from '../../../actions/favorite.actions';
import { PlaylistActions } from '../../../actions/playlist.actions';
import { SpinnerState } from '../../../reducers/spinner.reducer';
import { TracksState } from './../../../reducers/tracks.reducer';

@Component({
  //changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'top-track-tile',
  styleUrls: ['../top-tracks.component.css', './top-track-tile.component.css'],
  templateUrl: './top-track-tile.component.html'
})
export class TopTrackTileComponent{

  @Input()
  topTrack: Track = {
    id: null,
    title: '',
    artist: '',
    imgUrl: '',
    streamUrl: '',
    platform: '',
    duration: 0,
    trackId: '0'
  };

  @Input()
  tracksList: Track[];

  player$: Observable<Player>;
  spinner$: Observable<SpinnerState>;
  currentlyPlaying$: Observable<boolean>;
  isFavorited: boolean = null;
  selected$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  loadBuffer: boolean;
  playing: boolean;
  isPlayingSubscription: Subscription;
  bottomIconHover: boolean = false;
  favorites$;
  favoritesSubscription: Subscription;

  constructor(private trackActions: TrackActions, private store$: Store<AppStore>, private router: Router, private favoriteActions: FavoriteActions, private playlistActions: PlaylistActions) {
    // Grab the player stream from the store
    this.player$ = this.store$.select(s => s.player);



    // Grab the spinner stream
    this.spinner$ = this.store$.select(s => s.spinner);
    this.favorites$ = this.store$.select(s => s.favorites);
    // Map the player stream to see if the player is playing
    this.currentlyPlaying$ = this.player$
      .map((playerStatus: Player) => playerStatus.isPlaying && playerStatus.currentTrack.id === this.topTrack.id);
    // Map the player stream to see if the player is playing the current song
    this.selected$ = this.player$
      .map((playerStatus: Player)=> playerStatus.currentTrack.id === this.topTrack.id);
    // Map the spinner stream to see if the song is loading
    this.isLoading$ = this.spinner$
      .map((spinnerStatus: SpinnerState) => spinnerStatus.isLoadSpinning);

    this.isPlayingSubscription = this.currentlyPlaying$
      .subscribe(isPlaying => this.playing = isPlaying);

    this.favoritesSubscription = this.favorites$
      .subscribe(favorites => {
        let favorited = false;
        favorites.forEach((favorite) => {
          if (favorite.id == this.topTrack.id) {
            favorited = true;
          }
        });
        this.isFavorited = favorited;
      });
  }

  ngOnDestroy() {
    this.isPlayingSubscription.unsubscribe();
    this.favoritesSubscription.unsubscribe();
  }

  clickHandler() {
    if (!this.playing) {
      this.loadingNow();
    }
    this.store$.dispatch(this.trackActions.togglePlayPause(this.topTrack, this.tracksList));
  }

  goToDetail($event) {
    // Only go to detail page if we clicked outside of the play icon
    if ($event.target.tagName != 'I') {
      this.router.navigate(['/track/soundcloud', this.topTrack.id]);
    }
  }

  loadingNow() {
    this.loadBuffer = !this.loadBuffer;
    setTimeout(() => this.loadBuffer = !this.loadBuffer, 20);
  }

  toggleFavorite() {
    this.isFavorited = !this.isFavorited;
    if (this.isFavorited) {
      this.store$.dispatch(this.favoriteActions.addFavorite(this.topTrack));
    } else {
      this.store$.dispatch(this.favoriteActions.removeFavorite(this.topTrack));
    }
  }

  addToPlaylist() {
    this.store$.dispatch(this.playlistActions.addTrack(this.topTrack));
  }
}
