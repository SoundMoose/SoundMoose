import {
  Component,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import { TrackDetailsState } from '../../reducers/track-details.reducer';
import { TrackDetailsActions } from '../../actions/track-details.actions';
import { AppStore } from '../../models/appstore.model';
import { SoundCloudService } from '../../services/soundcloud.service';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'track-detail',
  templateUrl: 'track-detail.component.html',
  styleUrls: ['track-detail.component.css']
})
export class TrackDetailComponent implements OnInit {

  trackDetails$: Observable<TrackDetailsState>;
  comments$: Observable<any>;
  platform: string;

  constructor(
    private store$: Store<AppStore>,
    private route: ActivatedRoute,
    private trackDetailsActions: TrackDetailsActions,
    private soundCloudService: SoundCloudService,
    private spotifyService: SpotifyService
  ) {
  }

  ngOnInit() {
    this.trackDetails$ = this.store$.select(s => s.trackDetails);
    this.comments$ = this.store$.select(s => s.comments);

    let trackId = this.route.snapshot.params['trackId'];
    this.platform = this.route.snapshot.params['platform'];
    if (this.platform == 'soundcloud') {
      this.soundCloudService.loadTrackDetails(trackId);
      this.soundCloudService.loadComments(trackId);
    } else if (this.platform == 'spotify') {
      this.spotifyService.loadTrackDetails(trackId);
    }

  }

  ngOnDestroy() {
    this.store$.dispatch(this.trackDetailsActions.leaveTrackDetailsPage())
  }
}
