import {Component, OnInit} from '@angular/core';
import {SoundCloudService} from '../../services/soundcloud.service';
import {Track} from '../../../Track';

@Component({
  moduleId: module.id,
  selector: 'tracklist',
  templateUrl: 'tracklist.component.html'
})
export class TracklistComponent implements OnInit{
  tracklist: Track[];

  constructor(
    private _soundcloudService: SoundCloudService) {

  }

  ngOnInit() {
    this._soundcloudService.getTopTracks()
        .subscribe(tracklist => {
            this.tracklist = tracklist;
            console.log(this.tracklist);
        })
  }
}