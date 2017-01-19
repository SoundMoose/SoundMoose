import { Component } from '@angular/core';
import { state } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppState } from '../app.service';
import { AppStore } from '../../models/appstore.model';

@Component({
  selector: 'song-queue',
  styleUrls: [ './song-queue.component.css' ],
  templateUrl: './song-queue.component.html'
})
export class SongQueueComponent {

  private showQueue: boolean;

  constructor( private store$: Store<AppStore> ) {
    this.showQueue = true;
  }

  // toggleOptionsPanel () {
  //   var optionsPanel = document.getElementById('optionsPanel');
  //   var actionBtn = document.getElementById('hide');
  //
  //   var right = optionsPanel.style.right;
  //   if (right == '0px' || right == '') {
  //     optionsPanel.style.right = '-180px';
  //   } else {
  //     optionsPanel.style.right = '0px';
  //   };
  //   this.showOptionsPanel = !this.showOptionsPanel;
  // }
}
