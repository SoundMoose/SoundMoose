import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core'
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppState } from '../app.service';
import { Track } from '../../../models/track.model';
import { PlayerState } from '../../../reducers/player.reducer';
import { AppStore } from '../../../models/appstore.model';
import { Player } from '../../../models/player.model';
import { Subscription} from 'rxjs/Subscription';

import { TrackActions } from '../../../actions/track.actions';
import { FavoriteActions } from '../../../actions/favorite.actions';

@Component({
  //changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'track-info',
  styleUrls: [ './track-info.component.css' ],
  templateUrl: './track-info.component.html'
})
export class TrackInfoComponent {
  player$: Observable<PlayerState>;
  currentTrack$: Observable<Track>;
  currentTrack: Track;
  playerSubscription: Subscription;
  wrapperHovered : boolean = false;
  songQueue: Track[];
  currentId: number;
  isFavorited: boolean = null;
  favorites$;
  favoritesSubscription: Subscription;

  constructor (private store$: Store<AppStore>, private trackActions: TrackActions, private favoriteActions: FavoriteActions) {
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

  private handleMouseOut() {
    window.setTimeout(() => { this.wrapperHovered = false; }, 1000);
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
    this.isFavorited = !this.isFavorited;
    if (this.isFavorited) {
      this.store$.dispatch(this.favoriteActions.addFavorite(this.currentTrack));
    } else {
      this.store$.dispatch(this.favoriteActions.removeFavorite(this.currentTrack));
    }
  }

  ngOnDestroy() {
    this.favoritesSubscription.unsubscribe();
    this.playerSubscription.unsubscribe();
  }
}
