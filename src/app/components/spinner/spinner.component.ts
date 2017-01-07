import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStore } from './../../models/appstore.model';

@Component({
  selector: 'spinner',
  styleUrls: ['spinner.component.css'],
  templateUrl: 'spinner.component.html'
})

export class SpinnerComponent {
  isSpinning: boolean = false;

  constructor(private store$: Store<AppStore>) {
     this.store$.select('spinner')
       .map((spinner: any) => spinner.isSpinning)
       .distinctUntilChanged()
       .subscribe(item => this.isSpinning = item);
  }
}
