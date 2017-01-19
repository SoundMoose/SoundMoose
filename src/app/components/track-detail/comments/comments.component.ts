import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TrackDetailsState } from '../../../reducers/track-details.reducer';

@Component({
  selector: 'comments',
  templateUrl: 'comments.component.html',
  styleUrls: ['comments.component.css']
})
export class CommentsComponent {
  @Input() trackDetails: Observable<TrackDetailsState>;
  @Input() comments: Observable<any>;

  private getTrackTime(millis) {
    let minutes = Math.floor(millis / 60000);
    let seconds = +((millis % 60000) / 1000).toFixed(0);
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
}
