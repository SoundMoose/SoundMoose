import {
   trigger,
   state,
   style,
   transition,
   animate
} from '@angular/core';
import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core'
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppState } from '../app.service';
import { Track } from '../../../models/track.model';
import { PlayerState } from '../../../reducers/player.reducer';
import { AppStore } from '../../../models/appstore.model';
import { Player } from '../../../models/player.model';
import { Auth } from '../../../services/auth.service';
import { Subscription} from 'rxjs/Subscription';

import { TrackActions } from '../../../actions/track.actions';
import { FavoriteActions } from '../../../actions/favorite.actions';

@Component({
  //changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'track-info',
  styleUrls: [ './track-info.component.css' ],
  templateUrl: './track-info.component.html',
  animations: [
    trigger('fadeInOut', [
      state('in', style({transform: 'translateY(0)', opacity: 0.98})),
      transition('void => *', [
        style({
          transform: 'translateY(100%)',
          opacity: 0
        }),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.2s 10 ease-out', style({
          opacity: 0,
        }))
      ])
    ])
  ]
})
export class TrackInfoComponent {
  player$: Observable<PlayerState>;
  currentTrack$: Observable<Track>;
  currentTrack: Track;
  playerSubscription: Subscription;
  playingTrackHovered : boolean = false;
  songQueueHovered : boolean = false;
  songQueue: Track[];
  currentId: number;
  isFavorited: boolean = null;
  favorites$;
  favoritesSubscription: Subscription;
  showLoginMessage: boolean = false;
  showFavoritedMessage: boolean = false;
  showUnfavoritedMessage: boolean = false;

  constructor (
    private store$: Store<AppStore>,
    private trackActions: TrackActions,
    private favoriteActions: FavoriteActions,
    private auth: Auth
  ) {
    this.player$ = this.store$.select(s => s.player);
    this.currentTrack$ = this.player$.map((item : PlayerState) => item.currentTrack);

    this.favorites$ = this.store$.select(s => s.favorites);

    // grab the array of tracks from the store
    this.playerSubscription = this.player$.subscribe((item) => {
      this.songQueue = item.songQueue;
      this.currentId = item.currentId;
      this.currentTrack = item.currentTrack;
    });

    this.favoritesSubscription = this.favorites$
      .subscribe(favorites => {
        let favorited = false;
        favorites.forEach((favorite) => {
          if (favorite.id == this.currentTrack.id) {
            favorited = true;
          }
        });
        this.isFavorited = favorited;
      });
  }

  private trim(string) {
    var length = 40;
    return string.length > length ?
                    string.substring(0, length - 3) + "..." :
                    string;
  }

  millisToMinutesSeconds(millis) {
    let minutes = Math.floor(millis / 60000);
    let seconds = +((millis % 60000) / 1000).toFixed(0);

    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }

    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  clickHandler(track, tracklist) {
    this.store$.dispatch(this.trackActions.togglePlayPause(track, tracklist));
  }


  toggleFavorite() {
    if (!this.auth.authenticated()) {
      this.showLoginMessage = true;
      setTimeout(() => { this.showLoginMessage = false; }, 1000);
      return;
    }
    this.isFavorited = !this.isFavorited;
    if (this.isFavorited) {
      this.store$.dispatch(this.favoriteActions.addFavorite(this.currentTrack));
      this.showFavoritedMessage = true;
      setTimeout(() => { this.showFavoritedMessage = false; }, 1000);
    } else {
      this.store$.dispatch(this.favoriteActions.removeFavorite(this.currentTrack));
      this.showUnfavoritedMessage = true;
      setTimeout(() => { this.showUnfavoritedMessage = false; }, 1000);
    }
  }

  ngOnDestroy() {
    this.favoritesSubscription.unsubscribe();
    this.playerSubscription.unsubscribe();
  }

  playingTrackLeave() {
    window.setTimeout(() => this.playingTrackHovered = false, 500);
  }
}
