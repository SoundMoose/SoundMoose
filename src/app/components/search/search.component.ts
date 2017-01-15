import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/merge';

import { SoundCloudService } from '../../services/soundcloud.service';
import { SpotifyService } from '../../services/spotify.service';
import { Track } from '../../models/track.model';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';

@Component({
  selector: 'search',
  styleUrls: ['./search.component.css'],
  templateUrl: './search.component.html',
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

export class SearchComponent {

  term$ = new Subject<string>();
  soundCloudItems$ : Observable<Track[]>;
  spotifyItems$ : Observable<Track[]>;
  query: string;

  constructor(private soundCloudService: SoundCloudService, private spotifyService: SpotifyService, private route: ActivatedRoute) {
    this.query = this.route.snapshot.params['query'];
    this.soundCloudItems$ = this.soundCloudService.loadSearchResults(this.term$);
    this.spotifyItems$= this.spotifyService.loadSearchResults(this.term$);
    if (this.query) {
      // @todo figure out why this setTimeout is necessary
      window.setTimeout(() => this.term$.next(this.query), 0);
    }
  }
}
