import { Component, OnInit, Input } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { ICity } from '../model';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { NgRedux } from '@angular-redux/store';
import { AppState } from 'src/app/store/model';
import { CityAPIActions } from '../actions';
import { filter, first, map } from 'rxjs/operators';
import { IState } from 'src/app/state/model';

@Component({
  selector: 'app-city-input',
  templateUrl: './city-input.component.html',
  styleUrls: ['./city-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CityInputComponent,
    multi: true
  }]

})
export class CityInputComponent implements OnInit, ControlValueAccessor {
  private onChanged: any = () => { }
  private onTouched: any = () => { }

  filteredCities$: Observable<ICity[]>;
  city = new FormControl('Zürich');

  @Input()
  state$: Observable<IState>;

  constructor(
    private store: NgRedux<AppState>,
    private cityActions: CityAPIActions

  ) { }

  ngOnInit() {
    this.store.dispatch(this.cityActions.load());
    this.city.valueChanges.subscribe(v => this.onChanged(v));

    const cities$ = this.store.select(s => s.cities.items);
    cities$.pipe(
      filter(items => items.length > 0),
      first()
    ).subscribe(items => this.city.patchValue(items.find(i => i.countryCode === 'CH' && i.stateCode === 'ZH' && i.name === 'Zürich')));
    const availableCities$ = combineLatest(this.store.select(s => s.cities.items), this.state$).pipe(
      map(items => items[0].filter(i => i.countryCode === items[1].countryIsoCode && i.stateCode === items[1].code))
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

  writeValue(obj: any): void {
    if (obj && obj !== this.city.value) {
      this.city.patchValue(obj);
    }
  }

  registerOnChange(fn: any) {
    this.onChanged = fn
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn
  }

  displayCity(city: ICity) {
    return city.zipCode + ' | ' + city.name;
  }
}
