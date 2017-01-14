import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppStore } from './models/appstore.model';
import { AudioControlsActions } from './actions/audio-controls.actions';
import { AudioControls } from './models/audio-controls.model';
import { Auth } from './services/auth.service';
import { remote, ipcRenderer } from 'electron';
import { writeFile, readFile } from 'fs';

let {dialog} = remote;

@Component({
  selector: 'app',
 // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['app.component.css'],
  templateUrl: 'app.component.html',
  providers: [Auth]
})

export class AppComponent {
  toggleFrequencyOrWaveform$: Observable<boolean>;
  openDialogActive: boolean = false;
  saveDialogActive: boolean = false;

  constructor( private store$: Store<AppStore>, private AudioControlsActions: AudioControlsActions, private auth: Auth) {

    this.toggleFrequencyOrWaveform$ = this.store$.select('audiocontrols')
      .map((audiocontrols: AudioControls) => audiocontrols.toggleFrequencyOrWaveform)

    ipcRenderer.on('open-file', this.open.bind(this));
    // ipcRenderer.on('save-file', this.save.bind(this));
  }

  toggleAudioControls() {
    this.store$.dispatch(this.AudioControlsActions.toggleVisualizersFreqWave());
  }

  open() {
    if (!this.openDialogActive && !this.saveDialogActive) {
      this.openDialogActive = true;
      dialog.showOpenDialog( (fileNames) => {
        this.openDialogActive = false;
        if (fileNames === undefined) {
          console.log('No file selected');
        } else {
          this.read_file(fileNames[0]);
        }
      });
    }
  }

  read_file(filepath) {
    readFile(filepath, 'utf-8', function(err, data) {
      if(err) {
        alert('Error reading file :' + err.message);
      }
      console.log('File content: ' + data);
    })
  }
  // save() {
  //   if (!this.openDialogActive && !this.saveDialogActive) {
  //     this.saveDialogActive = true;
  //     dialog.showSaveDialog({})
  //   }
  // }
}
