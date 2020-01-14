import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith, filter, tap } from 'rxjs/operators';

import { IState } from '../state/model';
import { RatingAPIActions } from '../rating/actions';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store/model';
import { IRating } from '../rating/model';
import { EnclosureAPIActions } from '../enclosure/actions';
import { IEnclosure } from '../enclosure/model';

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
  filter$: Observable<string>;
  enclosures$: Observable<IEnclosure[]>;

  constructor(
    private store: NgRedux<AppState>,
    private ratingActions: RatingAPIActions,
    private enclosureActions: EnclosureAPIActions,
  ) { }

  ngOnInit() {
    this.store.dispatch(this.enclosureActions.load());

    this.enclosures$ = combineLatest(this.store.select(s => s.enclosures.items).pipe(filter(e => e && e.length > 0)), this.filter$).pipe(
      tap(e => console.warn(e)),
      map(enc => enc[0].filter(e => e.parent.startsWith(enc[1])))
    );
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

    this.filter$ = this.formGroup.valueChanges.pipe(
      map(f => {
        console.warn("Filter", f)
        if (f.streetNumber && f.street) {
          return `${f.street}:$:${f.streetNumber}`;
        }
        if (f.street) {
          return f.street;
        }
        if (f.city) {
          return f.city;
        }

        if (f.state) {
          return f.state;
        }
        if (f.country) {
          return f.country;
        }


        return "";
      }),
      map(f => encodeURI(f))
    );

    this.ratings$ = combineLatest<Observable<IRating[]>, Observable<string>>(this.store.select(s => {
      return s.ratings.items;
    }), this.filter$).pipe(
      map(i => i[0].filter(r =>
        r.parent.startsWith(i[1])
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
