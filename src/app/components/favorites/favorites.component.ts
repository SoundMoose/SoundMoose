import { Component } from '@angular/core';
import { AppStore } from '../../models/appstore.model';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'favorites',
  templateUrl: './favorites.component.html'
})
export class FavoritesComponent {

  favorites$;

  constructor(private favoritesService: FavoriteService, private store: Store<AppStore>) {
    this.favorites$ = this.store.select(s => s.favorites);
  }
}

