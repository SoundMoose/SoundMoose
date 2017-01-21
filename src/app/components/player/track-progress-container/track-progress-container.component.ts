import { Input, Component, OnInit, OnDestroy } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AppState } from '../app.service';
import { AppStore } from '../../../models/appstore.model';
import { PlayerService } from '../../../services/player.service';
import { PlayerActions } from '../../../actions/player.actions';
import { PlayerState } from '../../../reducers/player.reducer';

@Component({
 // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'track-progress-container',
  styleUrls: [ '../player.component.css' ],
  templateUrl: './track-progress-container.component.html'
})
export class TrackProgressContainerComponent implements OnInit, OnDestroy {
  player$: Observable<PlayerState>;
  durationMinutesSeconds: string;
  progressMinutesSeconds: string;
  // Duration in milliseconds.
  duration: number;
  // Progress, a number between 0 and this.multiplier.
  currentProgress: number = 0;
  // A number large enough to allow for enough precision while searching.
  multiplier: number = 1000000;
  // The setInterval timer ID.
  timer: number;
  // Whether we are currently sliding.
  sliding: boolean;
  bufferedRanges: number[][] | number[];
  playerSubscription: Subscription;
  progressSubscription: Subscription;
  playerInfoSubscription: Subscription;
  // 'detail' or 'bottom'
  @Input() progressContainerType: string;

  constructor (private playerService: PlayerService, private store$: Store<AppStore>, private route: ActivatedRoute, ) {
  }

  ngOnInit() {
    // This component is used both on the detail page and in the bottom part of the page.
    // Split this out into two separate components if the logic becomes too convoluted.
    this.player$ = this.store$.select(s => s.player);
    if (this.progressContainerType === 'detail') {
      this.playerSubscription = this.player$.subscribe((p) => {
        if (p.currentTrack && this.route.snapshot.params['trackId'] === p.currentTrack.trackId) {
          this.setPlayerInfo();
        }
      });
    } else if (this.progressContainerType === 'bottom') {
      this.setPlayerInfo();
    }
  }

  ngOnDestroy() {
    if (this.playerSubscription) {
      this.playerSubscription.unsubscribe();
    }
    if (this.progressSubscription) {
      this.progressSubscription.unsubscribe();
    }
    if (this.playerInfoSubscription) {
      this.playerInfoSubscription.unsubscribe();
    }
  }

  private setPlayerInfo() {
    this.progressSubscription = this.playerService.currentProgressInSeconds$.subscribe(item => {
      if (this.sliding) {
        // We let the slider take over the timer while we are sliding.
        return;
      }
      let currentProgressInMilliseconds = item * 1000;
      this.progressMinutesSeconds = this.millisToMinutesSeconds(currentProgressInMilliseconds);
      this.currentProgress = Math.floor(((currentProgressInMilliseconds / this.duration) * 1000)) * this.multiplier / 1000;
    });
    this.playerInfoSubscription = this.player$.subscribe((item) => {
      this.duration = +item.currentTrack.duration;
      this.durationMinutesSeconds = this.millisToMinutesSeconds(this.duration);
      this.bufferedRanges = item.bufferedRanges;
    });
  }

  private millisToMinutesSeconds(millis) {
    let minutes = Math.floor(millis / 60000);
    let seconds = +((millis % 60000) / 1000).toFixed(0);
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  onSliderChanged(event) {
    // Sliding is set to true when slide starts, and set to false here when it stops.
    this.sliding = false;
    // Stop updating the progress bar timer while dragging.
    clearInterval(this.timer);
    // Send a fraction to the player service so it can change the position of the track.
    this.playerService.changePosition(event.value / this.multiplier);
  }

  onSliderStarted(event) {
    // Slide starts, will stop when we stop sliding (onchange).
    this.sliding = true;
    // Currently the only way we can find the progress is by grabbing aria-valuenow from the parent.
    let slider = this.findAncestor(event.target, 'track-progress-bar');
    if (slider) {
      this.timer = window.setInterval(() =>  {
        // Progress, a number between 0 and this.multiplier.
        let progress = slider.attributes['aria-valuenow'].value;
        // The progress timer is bound to this.
        this.progressMinutesSeconds = this.millisToMinutesSeconds(progress / this.multiplier * this.duration);
         // The slider is bound to this.
        this.currentProgress = progress;
      }, 50);
    }
  }

  private findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
  }
}
