
import { Component } from '@angular/core';
import { state } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { AppState } from '../app.service';
import { AppStore } from '../../models/appstore.model';


@Component({
  selector: 'options-slider',
  styleUrls: [ './options.component.css' ],
  templateUrl: './options.component.html'
})
export class OptionsComponent {

  private showOptionsPanel: boolean;
  private showSoundcloud: boolean;
  private showSpotify: boolean;
  private showLastFM: boolean;

  constructor( private store$: Store<AppStore> ) {
    this.showOptionsPanel = true;
    this.showSoundcloud = true;
    this.showSpotify = true;
    this.showLastFM = true;
  }

  toggleOptionsPanel () {
    var optionsPanel = document.getElementById('optionsPanel');
    var actionBtn = document.getElementById('hide');

    var right = optionsPanel.style.right;
    if (right == '0px' || right == '') {
      optionsPanel.style.right = '-180px';
    } else {
      optionsPanel.style.right = '0px';
    };
    this.showOptionsPanel = !this.showOptionsPanel;
  }

}
