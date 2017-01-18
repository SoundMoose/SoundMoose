import { Component } from '@angular/core';

@Component({
  selector: 'favorites',
  templateUrl: './favorites.component.html',
export class FavoritesComponent {

  constructor(private favoritesService: FavoritesService, private store: Store<AppStore>) {
    // Get playlist data on load.
    this.getData(8); // User id is in state, get playlist id from GET /api/playlists/?user_id=[user id]

    // Grab playlist info from state.
    this.playlist$ = this.store.select('playlist')
      .map((playlist: Playlist) => playlist.tracks);
  }

}

