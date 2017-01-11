import { Component, Input } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStore } from './../../models/appstore.model';
import { SpinnerState } from './../../reducers/spinner.reducer';

@Component({
  //changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'spinner',
  styleUrls: ['spinner.component.css'],
  templateUrl: 'spinner.component.html'
})

export class SpinnerComponent {
  isSpinning$: Observable<boolean>;

  constructor(private store$: Store<AppStore>) {
     this.isSpinning$ = this.store$.select('spinner')
       .map((spinner: SpinnerState) => spinner.isSpinning);
  }
}
