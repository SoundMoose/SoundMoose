import { Component } from '@angular/core';

import { AppState } from '../app.service';
import { Player } from '../../../models/player.model';
import { AppStore } from '../../../models/appstore.model';
import { PlayerService } from '../../../services/player.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { PlayerActions } from '../../../actions/player.actions';

@Component({
  selector: 'track-progress',
  styleUrls: [ '../player.component.css' ],
  templateUrl: './track-progress.component.html'
})
export class TrackProgressComponent {
  player$: Observable<Player>;
  durationMinutesSeconds: string;
  progressMinutesSeconds: string;
  // duration in milliseconds
  duration: number;
  // Progress, a number between 0 and this.multiplier.
  currentProgress: number = 0;
  // A number large enough to allow for enough precision while searching.
  multiplier: number = 1000000;
  // The setInterval timer ID.
  timer: number;
  // Whether we are currently sliding.
  sliding: boolean;

  constructor (private playerService: PlayerService, private store$: Store<AppStore>, private playerActions: PlayerActions) {
    this.player$ = this.store$.select('player');
    this.player$.subscribe((item) => {
      if (this.sliding) {
        // We let the slider take over the timer while we are sliding.
        return;
      }
      this.duration = +item.currentTrack.duration;
      this.durationMinutesSeconds = this.millisToMinutesSeconds(+item.currentTrack.duration);
      this.progressMinutesSeconds = this.millisToMinutesSeconds(+item.currentTime * 1000);
      this.currentProgress = Math.floor(((+item.currentTime*1000/+item.currentTrack.duration)*100)) * this.multiplier / 100;
    });
  }

  private millisToMinutesSeconds(millis) {
    let minutes = Math.floor(millis / 60000);
    let seconds = +((millis % 60000) / 1000).toFixed(0);
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  handleProgressChange($event) {
    // Sliding is set to true when slide starts, and set to false here when it stops.
    this.sliding = false;
    // Stop updating the progress bar timer while dragging.
    clearInterval(this.timer);
    // Send a fraction to the player service.
    this.playerService.changePosition($event.value / this.multiplier);
  }

  handleSlideStart($event) {
    // Slide starts, will stop when we stop sliding (onchange).
    this.sliding = true;
    // Currently the only way we can find the progress is by grabbing aria-valuenow from the parent.
    let slider = this.findAncestor($event.target, 'track-progress-bar');
    if (slider) {
      this.timer = window.setInterval(() =>  {
        // Progress, a number between 0 and this.multiplier.
        let progress = slider.attributes['aria-valuenow'].value;
        this.progressMinutesSeconds = this.millisToMinutesSeconds(progress / this.multiplier * this.duration);
        this.currentProgress = progress;
      }, 100);
    }
  }

  private findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
  }

}
