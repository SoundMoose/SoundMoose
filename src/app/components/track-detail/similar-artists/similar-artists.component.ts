import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { LastfmService } from './../../../services/lastfm.service';

@Component({
  selector: 'similar-artists',
  templateUrl: 'similar-artists.component.html',
  styleUrls: ['similar-artists.component.css']
})
export class SimilarArtistsComponent {
  showAll: boolean = false;

  @Input() currentArtist: string;
  similarArtists$: Observable<any>;

  constructor(
    private lastfmService: LastfmService,
  ) {
  }

  ngOnInit() {
    this.similarArtists$ = this.lastfmService.getSimilarArtists(this.currentArtist);
  }
}
