import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';

import { AppStore } from '../../../models/appstore.model';
import { SoundCloudService } from '../../../services/soundcloud.service';
import { SpotifyService } from '../../../services/spotify.service';
import { Track } from '../../../models/track.model';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';

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

  constructor(private store$: Store<AppStore>, private spotifyService: SpotifyService, private soundCloudService: SoundCloudService) {
    // ensure all search services (soundcloud, spotify) are being loaded on the search results page
    this.spotifyService;
    this.soundCloudService;
    let search$ = this.store$.select(s => s.search);
    this.results$ = search$.map(item => item.results);
  }
}
