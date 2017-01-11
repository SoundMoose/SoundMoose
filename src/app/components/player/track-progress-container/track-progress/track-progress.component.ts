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
  @Output() sliderChanged: EventEmitter<{}> = new EventEmitter();
  @Output() sliderStarted: EventEmitter<{}> = new EventEmitter();

  handleSliderChange($event) {
    this.sliderChanged.emit($event);
  }

  handleSliderStart($event) {
    console.log($event);
    this.sliderStarted.emit($event);
  }

}
