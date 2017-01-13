import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { SoundCloudService } from '../../services/soundcloud.service';

import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';

@Component({
  selector: 'search',
  styleUrls: ['./search.component.css'],
  templateUrl: './search.component.html',
  animations: [
    trigger('fadeInOut', [
      state('in', style({opacity: 1})),
      transition('void => *', [
        style({
          opacity: 0,
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

export class SearchComponent {

  term$ = new Subject<string>();
  items$;

  constructor(private soundCloudService: SoundCloudService) {
    this.items$ = this.soundCloudService.loadSearchResults(this.term$);
  }
}
