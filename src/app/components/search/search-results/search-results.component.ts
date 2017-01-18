import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';

import { SearchActions } from '../../../actions/search.actions';
import { AppStore } from '../../../models/appstore.model';
import { SoundCloudService } from '../../../services/soundcloud.service';
import { SpotifyService } from '../../../services/spotify.service';
import { TrackActions } from '../../../actions/track.actions';
import { Track } from '../../../models/track.model';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import { SearchState } from './../../../reducers/search.reducer';

@Component({
  selector: 'search-results',
  styleUrls: ['./search-results.component.css'],
  templateUrl: './search-results.component.html',
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
    ])
  ]
})

export class SearchResultsComponent {

  results$ : Observable<Track[]>;
  searchResults: Track[];
  query: string;

  constructor(private store$: Store<AppStore>, private route: ActivatedRoute, private spotifyService: SpotifyService, private soundCloudService: SoundCloudService, private searchActions: SearchActions, private trackActions: TrackActions) {

    this.query = this.route.snapshot.params['query'];
    if (this.query) {
      // @todo figure out why this setTimeout is necessary
      window.setTimeout(() => this.search(this.query), 0);
    }

    this.store$.select('search')
      .subscribe((item: SearchState) => this.searchResults = item.results);

    // ensure all search services (soundcloud, spotify) are being loaded on the search results page
    let search$ = this.store$.select(s => s.search);
    this.results$ = search$.map(item => item.results);
  }

  private search(terms) {
    this.store$.dispatch(this.searchActions.search(terms));
  }

  //////////////////// Howard look here!!!
  clickHandler(track, tracks) {
    console.log("TRACK...", track, "TRACKS...", tracks);
    this.store$.dispatch(this.trackActions.togglePlayPause(track, tracks));
  }
}
