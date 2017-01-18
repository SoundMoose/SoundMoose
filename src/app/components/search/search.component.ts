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

  constructor(private route: ActivatedRoute, private searchActions: SearchActions, private store$: Store<AppStore>) {
    this.query = this.route.snapshot.params['query'];
    if (this.query) {
      // @todo figure out why this setTimeout is necessary
      window.setTimeout(() => this.search(this.query), 0);
    }
  }

  handleInput($event) {
    this.search($event.target.value)
  }

  private search(terms) {
    this.store$.dispatch(this.searchActions.search(terms));
  }
}
