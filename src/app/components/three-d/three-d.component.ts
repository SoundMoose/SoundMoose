import { Component } from '@angular/core';
import { state } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as THREE from 'three';
import * as ThreeOrbitControls from 'three-orbit-controls';

import { AppStore } from '../../models/appstore.model';
import { AudioStream } from '../../audio-element';
import { AudioControlsActions } from '../../actions/audio-controls.actions';

@Component({
  selector: 'three-d',
  styleUrls: [ './three-d.component.css' ],
  templateUrl: './three-d.component.html'
})
export class ThreeDComponent {

  private showControlPanel: any;
  private currentVisualization: string;

  constructor( private store$: Store<AppStore> ) {
    // this.showControlPanel = true;
    this.currentVisualization = 'showThreeDFrequency';
  }

  changeVis(selectedVis) {
    this.currentVisualization = selectedVis;
  }

  toggleControlPanel () {
    let controlPanel = document.getElementById('controlPanel');
    let actionBtn = document.getElementById('hide');

    let left = controlPanel.style.left;
    if (left === '0px' || left === '') {
      controlPanel.style.left = '-180px';
    } else {
      controlPanel.style.left = '0px';
    };
    this.showControlPanel = !this.showControlPanel;
  }
}
