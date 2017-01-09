import {
  Component,
  OnInit,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core'
import { SoundCloudService } from './../../services/soundcloud.service';
import { Store } from '@ngrx/store';
import { AppStore } from './../../models/appstore.model';
import { TracksState } from './../../reducers/tracks.reducer';
import { Observable } from 'rxjs/Observable';
import { AudioStream } from '../../audio-element';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var $: any;

@Component({
  selector: 'top-tracks',
  templateUrl: 'top-tracks.component.html',
  styleUrls: ['top-tracks.component.css'],
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
export class TopTracksComponent implements OnInit {
  topTracks$: Observable<TracksState>;
  buttonToggled: boolean = false;
  genres = [
    ['all-music', 'All music'],
    ['alternativerock','Alternative Rock'],
    ['ambient','Ambient'],
    ['classical','Classical'],
    ['country','Country'],
    ['danceedm','Dance & EDM'],
    ['dancehall','Dancehall'],
    ['deephouse','Deep House'],
    ['disco','Disco'],
    ['drumbass','Drum & Bass'],
    ['dubstep','Dubstep'],
    ['electronic','Electronic'],
    ['folksingersongwriter','Folk & Singer-Songwriter'],
    ['hiphoprap','Hip-hop & Rap'],
    ['house','House'],
    ['indie','Indie'],
    ['jazzblues','Jazz & Blues'],
    ['latin','Latin'],
    ['metal','Metal'],
    ['piano','Piano'],
    ['pop','Pop'],
    ['rbsoul','R&B & Soul'],
    ['reggae','Reggae'],
    ['reggaeton','Reggaeton'],
    ['rock','Rock'],
    ['soundtrack','Soundtrack'],
    ['techno','Techno'],
    ['trance','Trance'],
    ['trap','Trap'],
    ['triphop','Triphop'],
    ['world','World']
  ];
  currentGenre: string;

  constructor(
    private store$: Store<AppStore>,
    private soundCloudService: SoundCloudService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    let genre = this.route.snapshot.params['genre'];
    this.setCurrentGenre(genre);
  }

  setDefaultGenre() {
    (<any>$('.ui.dropdown')).dropdown('refresh');
  }

  setCurrentGenre(genre = 'all-music') {
    this.currentGenre = genre;
    this.soundCloudService.loadTopTracks(this.currentGenre);
    if (!(this.route.snapshot.url[0].path == 'home' && this.currentGenre == 'all-music')) {
      this.router.navigate(['/top_tracks', this.currentGenre]);
    }

    this.topTracks$ = this.store$.select(s => s.tracks);
  }

}
