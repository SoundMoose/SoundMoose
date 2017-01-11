import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';


@Component({
 // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'track-progress',
  styleUrls: [ '../../player.component.css' ],
  templateUrl: './track-progress.component.html'
})
export class TrackProgressComponent {
  @Input() progressMinutesSeconds: string;
  @Input() multiplier: number;
  @Input() durationMinutesSeconds: string;
  @Input() bufferedRanges: number[][] | number[];
  @Input() currentProgress: number;
  @Output() sliderChangeEventEmitter: EventEmitter = new EventEmitter();
  @Output() sliderStartEventEmitter: EventEmitter = new EventEmitter();

  handleSliderChange(event) {
    this.sliderChangeEventEmitter(event);
  }

  handleSliderStart(event) {
    this.sliderStartEventEmitter(event);
  }

}
