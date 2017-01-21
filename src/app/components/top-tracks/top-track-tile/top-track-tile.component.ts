import {
  Component,
  Input,
  trigger,
  state,
  style,
  transition,
  animate,
  OnInit,
  OnDestroy
} from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core'
import { Store } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { Auth } from '../../../services/auth.service';
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
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'top-track-tile',
  styleUrls: ['../top-tracks.component.css', './top-track-tile.component.css'],
  templateUrl: './top-track-tile.component.html',
  animations: [
    trigger('fadeInOut', [
      state('in', style({opacity: 1})),
      transition('void => *', [
        style({
          opacity: 0,
        }),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.2s 10 ease-out', style({
          opacity: 0,
        }))
      ])
    ]),
    trigger('fadeInOutFast', [
      state('in', style({opacity: 1})),
      transition('void => *', [
        style({
          opacity: 0,
        }),
        animate('0.02s ease-in')
      ]),
      transition('* => void', [
        animate('0.02s 10 ease-out', style({
          opacity: 0,
        }))
      ])
    ])
  ]
})
export class TopTrackTileComponent implements OnInit, OnDestroy {

  @Input()
  topTrack: Track = {
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

  showAddedToPlaylist: boolean = false;
  showFavoritedMessage: boolean = false;
  showUnfavoritedMessage: boolean = false;
  showLoginMessage: boolean = false;

  constructor(
    private trackActions: TrackActions,
    private store$: Store<AppStore>,
    private router: Router,
    private favoriteActions: FavoriteActions,
    private playlistActions: PlaylistActions,
    private auth: Auth
  ) {
  }

  ngOnInit() {
       // Grab the player stream from the store
    this.player$ = this.store$.select(s => s.player);

    // Grab the spinner stream
    this.spinner$ = this.store$.select(s => s.spinner);
    this.favorites$ = this.store$.select(s => s.favorites);
    // Map the player stream to see if the player is playing
    this.currentlyPlaying$ = this.player$
      .map((playerStatus: Player) => playerStatus.isPlaying && playerStatus.currentTrack.trackId === this.topTrack.trackId);
    // Map the player stream to see if the player is playing the current song
    this.selected$ = this.player$
      .map((playerStatus: Player) => playerStatus.currentTrack.trackId === this.topTrack.trackId);
    // Map the spinner stream to see if the song is loading
    this.isLoading$ = this.spinner$
      .map((spinnerStatus: SpinnerState) => spinnerStatus.isLoadSpinning);

    this.isPlayingSubscription = this.currentlyPlaying$
      .subscribe(isPlaying => this.playing = isPlaying);

    this.favoritesSubscription = this.favorites$
      .subscribe(favorites => {
        let favorited = false;
        favorites.forEach((favorite) => {
          if (favorite.trackId === this.topTrack.trackId && favorite.platform === this.topTrack.platform) {
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
    if ($event.target.tagName !== 'I') {
      this.router.navigate(['/track/' + this.topTrack.platform, this.topTrack.trackId]);
    }
  }

  loadingNow() {
    this.loadBuffer = !this.loadBuffer;
    setTimeout(() => this.loadBuffer = !this.loadBuffer, 20);
  }

  toggleFavorite() {
    if (!this.auth.authenticated()) {
      this.showLoginMessage = true;
      setTimeout(() => { this.showLoginMessage = false; }, 1000);
      return;
    }
    this.isFavorited = !this.isFavorited;
    if (this.isFavorited) {
      this.store$.dispatch(this.favoriteActions.addFavorite(this.topTrack));
      this.showFavoritedMessage = true;
      setTimeout(() => { this.showFavoritedMessage = false; }, 1000);
    } else {
      this.store$.dispatch(this.favoriteActions.removeFavorite(this.topTrack.trackId, this.topTrack.platform));
      this.showUnfavoritedMessage = true;
      setTimeout(() => { this.showUnfavoritedMessage = false; }, 1000);
    }
  }

  addToPlaylist() {
    if (!this.auth.authenticated()) {
      this.showLoginMessage = true;
      setTimeout(() => { this.showLoginMessage = false; }, 1000);
      return;
    }
    this.showAddedToPlaylist = true;
    setTimeout(() => { this.showAddedToPlaylist = false; }, 1000);
    this.store$.dispatch(this.playlistActions.addTrack(this.topTrack));
  }
}
