import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith, filter, tap } from 'rxjs/operators';

import { IState } from '../state/model';
import { RatingAPIActions } from '../rating/actions';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store/model';
import { IRating } from '../rating/model';

interface IForm {
  country: string;
  state: string;
  city: string;
  street: string;
  streetNumber: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  country = new FormControl('Switzerland');
  state = new FormControl('ZH');
  city = new FormControl('');
  street = new FormControl('');
  streetNumber = new FormControl('');
  formGroup = new FormGroup({
    country: this.country,
    state: this.state,
    city: this.city,
    street: this.street,
    streetNumber: this.streetNumber,
  });

  countryCode$: Observable<string>;
  state$: Observable<IState>;
  filteredStreets$: Observable<any[]>;
  city$: Observable<any>;
  ratings$: Observable<IRating[]>;
  ratingCount$: Observable<number>;

  constructor(
    private store: NgRedux<AppState>,
    private ratingActions: RatingAPIActions
  ) { }

  ngOnInit() {
    const countryValueChanges$ = this.country.valueChanges;

    this.countryCode$ = countryValueChanges$;

    this.countryCode$
      .pipe(
        filter(c => c !== undefined)
      ).
      subscribe(c => this.store.dispatch(this.ratingActions.load(c)));


    this.state$ = this.state.valueChanges.pipe(
      map(v => v ? v : undefined),
      startWith('ZH')
    );

    this.city$ = this.city.valueChanges;

    const filter$ = combineLatest(this.countryCode$).pipe(map(i => ({})));

    this.ratings$ = combineLatest<Observable<IRating[]>, Observable<Partial<IForm>>>(this.store.select(s => {
      return s.ratings.items;
    }), this.formGroup.valueChanges).pipe(
      tap(i => console.warn(i[1])),
      map(i => i[0].filter(r =>

        (!i[1].country || r.country === i[1].country) &&
        (!i[1].state || r.state === i[1].state) &&
        (!i[1].city || r.city === i[1].city) &&
        (!i[1].street || r.street === i[1].street) &&
        (!i[1].streetNumber || r.streetNumber === i[1].streetNumber)
      )
      )
    );

    this.ratingCount$ = this.ratings$.pipe(map(r => r.length));
  }

  registerReview() {
    console.warn(this.formGroup.value);
  }

  displayReviews() {
    console.warn(this.formGroup.value);
  }
}
