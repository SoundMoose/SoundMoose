import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class PlaylistService {

  constructor(private http: Http) {}

  testingStub() {
    return JSON.stringify([
      {
        id: 1,
        title: 'Tacos',
        artist: 'Mexican Food',
        imgUrl: 'http://www.google.com',
        streamUrl: 'http://www.google.com',
        duration: 826928,
        platform: 'pizza'
      }, {
        id: 2,
        title: 'Burritos',
        artist: 'Mexican Food',
        imgUrl: 'http://www.google.com',
        streamUrl: 'http://www.google.com',
        duration: 836541,
        platform: 'pizza'
      }, {
        id: 3,
        title: 'Churros',
        artist: 'Mexican Food',
        imgUrl: 'http://www.google.com',
        streamUrl: 'http://www.google.com',
        duration: 517352,
        platform: 'pizza'
      }, {
        id: 4,
        title: 'Flan',
        artist: 'Mexican Food',
        imgUrl: 'http://www.google.com',
        streamUrl: 'http://www.google.com',
        duration: 253637,
        platform: 'pizza'
      }
    ]);
  }

  getPlaylist(playlist_id: number) {
    let data = this.testingStub();
    return Observable.of(data)
      .map(res => JSON.parse(res));
  }
}
