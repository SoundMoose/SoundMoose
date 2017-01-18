import { Component, Input } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core'
import { Store } from '@ngrx/store';
import { AppStore } from './../../../models/appstore.model';
import { Track } from '../../../models/track.model';
import { Player } from '../../../models/player.model';
import { TrackActions } from '../../../actions/track.actions';
import { Action } from '@ngrx/store';
import { PlayerService } from '../../../services/player.service';
import { FavoriteActions } from '../../../actions/favorite.actions';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { SpinnerState } from '../../../reducers/spinner.reducer';

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
  }

  player$: Observable<Player>;
  spinner$: Observable<SpinnerState>;
  currentlyPlaying$: Observable<boolean>;
  isFavorited: boolean;
  selected$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  loadBuffer: boolean;
  playing: boolean;
  isPlayingSubscription: Subscription;
  bottomIconHover: boolean = false;

  constructor(private trackActions: TrackActions, private store$: Store<AppStore>, private router: Router, private favoriteActions: FavoriteActions) {
    // Grab the player stream from the store
    this.player$ = this.store$.select(s => s.player);
    // Grab the spinner stream
    this.spinner$ = this.store$.select(s => s.spinner);

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
  }

  ngOnDestroy() {
    this.isPlayingSubscription.unsubscribe();
  }

  clickHandler() {
    if (!this.playing) {
      this.loadingNow();
    }
    this.store$.dispatch(this.trackActions.togglePlayPause(this.topTrack));
  }

  goToDetail($event) {
    // Only go to detail page if we clicked outside of the play icon
    if ($event.target.tagName != 'I') {
      this.router.navigate(['/track', this.topTrack.id]);
    }
  }

  loadingNow() {
    this.loadBuffer = !this.loadBuffer;
    setTimeout(() => this.loadBuffer = !this.loadBuffer, 20);
  }

  toggleFavorite() {
    this.isFavorited = !this.isFavorited;
    if (this.isFavorited) {
      this.favoriteActions.addFavorite(this.topTrack.trackId, this.topTrack.platform);
    } else {
      this.favoriteActions.removeFavorite(this.topTrack.trackId, this.topTrack.platform);
    }
  }

  addToPlaylist() {

  }
}
