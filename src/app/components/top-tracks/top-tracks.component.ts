import {Component, OnInit} from '@angular/core';
import {SoundCloudService} from './../../services/soundcloud.service';
import {Store} from '@ngrx/store';
import {AppStore} from './../../models/appstore.model';
import {Track} from './../../models/track.model';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'top-tracks',
  templateUrl: 'top-tracks.component.html'
})
export class TopTracksComponent implements OnInit {
  topTracks: Observable<{}>;

  constructor(private store: Store<AppStore>, private soundCloudService: SoundCloudService) {
  }

  ngOnInit() {
    this.soundCloudService.loadTopTracks();
    this.topTracks = this.store.select('tracks');
  }
}
