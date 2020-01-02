import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, filter } from 'rxjs/operators';

import { IState } from '../state/model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  country = new FormControl('Switzerland');
  state = new FormControl('ZH');
  zipCode = new FormControl('8000');
  city = new FormControl('Zürich');
  formGroup = new FormGroup({
    country: this.country,
    state: this.state,
    zipCode: this.zipCode,
    city: this.city
  });

  countryCode$: Observable<string>;
  state$: Observable<IState>;
  filteredStreets$: Observable<any[]>;
  city$: Observable<any>;

  constructor(
  ) { }

  ngOnInit() {
    const countryValueChanges$ = this.country.valueChanges;

    const currentCountryCode$ = countryValueChanges$.pipe(
      map(v => v.isoCode ? v.isoCode : undefined)
    );
    this.countryCode$ = currentCountryCode$;

    this.state$ = this.state.valueChanges.pipe(
      map(v => v ? v : undefined),
      startWith('ZH')
    );

    this.city$ = this.city.valueChanges.pipe(filter(v => v.code));
  }

  registerReview() {
    console.warn(this.formGroup.value);
  }

  displayReviews() {
    console.warn(this.formGroup.value);
  }
}
