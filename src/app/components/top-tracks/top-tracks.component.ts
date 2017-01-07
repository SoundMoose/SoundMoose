import { Component, OnInit } from '@angular/core';
import { SoundCloudService } from './../../services/soundcloud.service';
import { Store } from '@ngrx/store';
import { AppStore } from './../../models/appstore.model';
import { Track } from './../../models/track.model';
import { Observable } from 'rxjs/Observable';
import { AudioStream } from '../../audio-element';

@Component({
  selector: 'top-tracks',
  templateUrl: 'top-tracks.component.html',
  styleUrls: ['top-tracks.component.css']
})
export class TopTracksComponent implements OnInit {
  topTracks: Observable<{}>;
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

  constructor(private store: Store<AppStore>, private soundCloudService: SoundCloudService) {
  }

  ngOnInit() {
    this.setCurrentGenre();
  }

  setDefaultGenre() {
    (<any>$('.ui.dropdown')).dropdown('refresh');
  }

  setCurrentGenre(genre = 'all-music') {
    this.currentGenre = genre;
    this.soundCloudService.loadTopTracks(this.currentGenre);
    this.topTracks = this.store.select('tracks');
  }

}
