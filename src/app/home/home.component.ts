import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { NgRedux, select } from '@angular-redux/store';
import { map, take, tap, startWith, first, filter } from 'rxjs/operators';

import { AppState } from '../store/model';
import { CountryAPIActions } from '../country/actions';
import { StateAPIActions } from '../state/actions';
import { CityAPIActions } from '../city/actions';
import { ICountry } from '../country/model';
import { IState } from '../state/model';
import { ICity, ICityState } from '../city/model';

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

  filteredCountries$: Observable<ICountry[]>;

  /*@select(['countries', 'items'])
  countries$: Observable<ICountry[]>
*/
  filteredStates$: Observable<IState[]>;
  filteredCities$: Observable<ICity[]>;

  constructor(
    private store: NgRedux<AppState>,
    private countryActions: CountryAPIActions,
    private stateActions: StateAPIActions,
    private cityActions: CityAPIActions
  ) { }

  ngOnInit() {
    this.store.dispatch(this.countryActions.load());
    this.store.dispatch(this.stateActions.load());
    this.store.dispatch(this.cityActions.load());

    const cities$ = this.store.select(s => s.cities.items);
    const countries$ = this.store.select(s => s.countries.items);
    const states$ = this.store.select(s => s.states.items);
    
    const countryValueChanges$ = this.country.valueChanges.pipe(startWith('CH'));

    countries$.pipe(
      filter(items => items.length > 0),
      first()
    ).subscribe(items => this.country.patchValue(items.find(i => i.isoCode === 'CH')));

    states$.pipe(
      filter(items => items.length > 0),
      first()
    ).subscribe(items => this.state.patchValue(items.find(i => i.countryIsoCode === 'CH' && i.code === 'ZH')));

    cities$.pipe(
      filter(items => items.length > 0),
      first()
    ).subscribe(items => this.city.patchValue(items.find(i => i.countryCode === 'CH' && i.stateCode === 'ZH' && i.name === 'Zürich')));
    
    const currentCountryCode$ = countryValueChanges$.pipe(
      map(v => v.isoCode ? v.isoCode : undefined)
    );

    const currentStateCode$ = this.state.valueChanges.pipe(
      map(v => v.code ? v.code : undefined),
      startWith('ZH')
    );

    this.filteredCountries$ =
      combineLatest(countryValueChanges$, countries$).pipe(
        map(data => {
          const currentValue = data[0].toLocaleLowerCase ? data[0].toLocaleLowerCase() : data[0].name.toLocaleLowerCase();
          const countries = data[1];

          return countries.filter(c =>
            c.name.toLocaleLowerCase().indexOf(currentValue) > -1 ||
            c.isoCode.toLocaleLowerCase().indexOf(currentValue) > -1
          );
        })
      );


    const availableStates$ = combineLatest(states$, currentCountryCode$).pipe(
      map(items => items[0].filter(i => i.countryIsoCode === items[1]))
    );

    this.filteredStates$ =
      combineLatest(this.state.valueChanges, availableStates$).pipe(
        map(data => {
          const currentValue = data[0].toLocaleLowerCase ? data[0].toLocaleLowerCase() : data[0].code.toLocaleLowerCase();
          const items = data[1];

          return items.filter(c =>
            c.code.toLocaleLowerCase().indexOf(currentValue) > -1 ||
            c.name.toLocaleLowerCase().indexOf(currentValue) > -1
          );
        })
      );

    const availableCities$ = combineLatest(this.store.select(s => s.cities.items), currentCountryCode$, currentStateCode$).pipe(
      map(items => items[0].filter(i => i.countryCode === items[1] && (!items[2] || i.stateCode === items[2])))
    );

    this.filteredCities$ =
      combineLatest(this.city.valueChanges, availableCities$).pipe(
        map(data => {
          const currentValue = data[0].toLocaleLowerCase ? data[0].toLocaleLowerCase() : data[0].zipCode.toLocaleLowerCase();
          const items = data[1];

          return items.filter(c =>
            c.zipCode.toLocaleLowerCase().indexOf(currentValue) > -1 ||
            c.name.toLocaleLowerCase().indexOf(currentValue) > -1
          );
        })
      );
  }

  displayCountry(country: ICountry) {
    return country.name;
  }

  displayState(state: IState) {
    return state.code;
  }

  displayCity(city: ICity) {
    return city.zipCode + ' | ' + city.name;
  }
}
