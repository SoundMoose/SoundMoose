@Injectable()
export class SpotifyService {

  constructor(private _http:Http, private store: Store<AppStore>) {
  }

  search(term: string) {
    const searchUrl = 'http://api.soundcloud.com/tracks/?q=' + term + '&client_id=' + soundcloudClientId;

    return this._http.get(searchUrl)
      .map(res => res.json())
      .map(items => items.map(item => ({
        id: item.id,
        title: item.title,
        artist: (item.publisher_metadata && item.publisher_metadata.artist) ? item.publisher_metadata.artist : item.user.username,
        imgUrl: item.artwork_url ? item.artwork_url.replace('large.jpg', 't200x200.jpg') : '/assets/img/moosey.png',
        streamUrl: 'http://api.soundcloud.com/tracks/' + item.id + '/stream?client_id=' + soundcloudClientId,
        duration: item.duration
      })));
  }

}
