import { Component, OnInit, Input } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { ICity, isCity } from '../model';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/model';
import * as fromActions from '../actions';
import { map } from 'rxjs/operators';

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

  filteredCities$: Observable<ICity[]>;
  city = new FormControl('Zürich');

  @Input()
  state$: Observable<string>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(fromActions.load());
    this.city.valueChanges.subscribe(v => this.onChanged(isCity(v) ? v.code : undefined));
    
    const availableCities$ = combineLatest(this.store.select(s => s.cities.items), this.state$).pipe(
      map(items => items[0].filter(i => i.parent === items[1]))
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
  }

  displayCity(city: ICity) {
    if (!city || !city.parent) {
      return '';
    }

    return city.zipCode + ' | ' + city.name;
  }
}
