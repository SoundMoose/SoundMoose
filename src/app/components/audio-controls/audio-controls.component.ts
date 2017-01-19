import {
   trigger,
   state,
   style,
   transition,
   animate,
   Component
} from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core'
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppState } from '../app.service';
import { AudioControlsService } from './../../services/audio-controls.service';
import { AppStore } from '../../models/appstore.model';
import { AudioControls } from '../../models/audio-controls.model';
import { AudioControlsActions } from '../../actions/audio-controls.actions';

@Component({
  //changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'audio-controls',
  styleUrls: [ './audio-controls.component.css' ],
  templateUrl: './audio-controls.component.html',
  animations: [
    trigger('fadeInOut', [
      state('in', style({transform: 'translateY(0)', opacity: 0.98})),
      transition('void => *', [
        style({
          transform: 'translateY(100%)',
          opacity: 0
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
export class AudioControlsComponent {
  toggleVisualizersFreqWave$: Observable<boolean>;
  showEqualizer$: Observable<boolean>;

  constructor(private audioControlsService: AudioControlsService, private store$: Store<AppStore>, private audioControlActions: AudioControlsActions) {
    this.toggleVisualizersFreqWave$ = this.store$.select('audiocontrols')
      .map((audioControls: AudioControls) => audioControls.toggleFrequencyOrWaveform);

    this.showEqualizer$ = this.store$.select('audiocontrols')
      .map((audioControls: AudioControls) => audioControls.showEqualizer);
  }

  toggleVisualizersFreqWave() {
    this.store$.dispatch(this.audioControlActions.toggleVisualizersFreqWave());
  }
}
