import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith, filter, tap, take, first } from 'rxjs/operators';

import { IState } from '../state/model';
import { RatingAPIActions } from '../rating/actions';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store/model';
import { IRating } from '../rating/model';
import { EnclosureAPIActions } from '../enclosure/actions';
import { IEnclosure } from '../enclosure/model';
import { UPDATE_LOCATION } from '@angular-redux/router';

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
  enclosures: IEnclosure[];

  constructor(
    private store: NgRedux<AppState>,
    private ratingActions: RatingAPIActions,
    private enclosureActions: EnclosureAPIActions,
  ) { }

  ngOnInit() {
    this.store.select(s => s.enclosures.fetched).subscribe(f => {
      if (!f) {
        this.enclosureActions.load();
      } else {
        console.warn('Already loaded')
      }
    });
    // this.enclosureActions.load();

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

    this.filter$ = this.formGroup.valueChanges.pipe(
      map(f => this.getFilter(f)),
      map(f => encodeURI(f))
    );

    this.enclosures$ = combineLatest(this.store.select(s => s.enclosures.items), this.filter$).pipe(
      map(enc => enc[0].filter(e => e.parent.startsWith(enc[1])))
    );

    this.enclosures$.subscribe(e => this.enclosures = e);

    this.ratings$ = combineLatest<Observable<IRating[]>, Observable<string>>(this.store.select(s => {
      return s.ratings.ratings.items;
    }), this.filter$).pipe(
      map(i => i[0].filter(r =>
        r.parent.startsWith(i[1])
      ))
    );

    this.ratingCount$ = this.ratings$.pipe(map(r => r.length));
  }

  createReview() {
    const filter = this.getFilter(this.formGroup.value);
    const enclosure = this.enclosures.find(i => i.code = filter);
    if (enclosure) {
      this.store.dispatch({
        type: UPDATE_LOCATION,
        payload: 'arrangement/' + enclosure.code
      })
    } else {
      this.enclosureActions.create([{
        parent: filter,
        name: 'Foo',
        code: filter + ':$:1'
      }]);
    }
  }

  registerReview() {
    console.warn(this.formGroup.value);
  }

  displayReviews() {
    console.warn(this.formGroup.value);
  }


  private getFilter(f: any) {
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
  }
}
