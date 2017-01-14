import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';

import { AppStore } from '../models/appstore.model';
import { youtubeApiKey } from '../config/superSecretKeys';

@Injectable()
export class YoutubeService {
  constructor(private _http:Http, private store: Store<AppStore>) {
  }

  searchYoutubeVideo(query) {
    const queryUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewcount&q=' + encodeURIComponent(query) + '&maxResults=1&key=' + youtubeApiKey;

    return this._http.get(queryUrl)
      .map(res => res.json())
      .map(item => {
        return item.items[0].id.videoId;
      });
  }

}
