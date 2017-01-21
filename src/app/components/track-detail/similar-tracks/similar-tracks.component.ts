import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { LastfmService } from './../../../services/lastfm.service';

@Component({
  selector: 'similar-tracks',
  templateUrl: 'similar-tracks.component.html',
  styleUrls: ['similar-tracks.component.css']
})
export class SimilarTracksComponent {

  showAll: boolean = false;
  @Input() currentTrack: string;
  @Input() currentArtist: string;
  similarTracks$: Observable<any>;

  constructor(
    private lastfmService: LastfmService,
  ) {
  }

  ngOnInit() {
    this.similarTracks$ = this.lastfmService.getSimilarTracks(this.currentTrack, this.currentArtist);
  }
}
