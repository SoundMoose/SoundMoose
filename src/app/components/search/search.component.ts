import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppStore } from '../../models/appstore.model';
import { SearchActions } from '../../actions/search.actions';

@Component({
  selector: 'search',
  styleUrls: ['./search.component.css'],
  templateUrl: './search.component.html'
})
export class SearchComponent {

  query: string;

  constructor(private router: Router, private searchActions: SearchActions, private store$: Store<AppStore>) {
  }

  handleInput($event) {
    if (this.router.url !== '/search' && this.router.url.indexOf('/search/') !== 0) {
      this.router.navigate(['/search']);
    }
    this.search($event.target.value)
  }

  private search(terms) {
    this.store$.dispatch(this.searchActions.search(terms));
  }
}
