import { Component } from '@angular/core';

import { AppState } from '../app.service';

@Component({
  selector: 'volume-control',
  styleUrls: [ '../player.component.css' ],
  templateUrl: './volume-control.component.html'
})
export class VolumeControlComponent {
  wrapperHovered : boolean = false;

  private handleMouseOut() {
    window.setTimeout(() => { this.wrapperHovered = false; }, 1000);
  }

}
