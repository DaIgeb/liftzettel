import { Component, OnInit, Input } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from 'src/app/store/model';
import { CountryAPIActions } from '../actions';
import { Observable, combineLatest } from 'rxjs';
import { ICountry, isCountry } from '../model';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { startWith, filter, first, map } from 'rxjs/operators';

@Component({
  selector: 'app-country-input',
  templateUrl: './country-input.component.html',
  styleUrls: ['./country-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CountryInputComponent,
    multi: true
  }]
})
export class CountryInputComponent implements OnInit, ControlValueAccessor {
  private onChanged: any = () => { }
  private onTouched: any = () => { }

  @Input()
  defaultValue: string = 'CH';

  country = new FormControl(this.defaultValue);
  
  filteredCountries$: Observable<ICountry[]>;

  constructor(
    private store: NgRedux<AppState>,
    private countryActions: CountryAPIActions
  ) { }

  ngOnInit() {
    this.store.dispatch(this.countryActions.load());

    const countries$ = this.store.select(s => s.countries.items);

    const countryValueChanges$ = this.country.valueChanges.pipe(startWith(this.defaultValue));

    countryValueChanges$.pipe(
      map((v: string | ICountry | undefined) => {
        if (!v) {
          return v;
        }
        const currentValue = isCountry(v)? v.isoCode : undefined;
      
        return currentValue;
      })
    ).subscribe(v => this.onChanged(v));

    countries$.pipe(
      filter(items => items.length > 0),
      first()
    ).subscribe(items => this.country.patchValue(items.find(i => i.isoCode === this.defaultValue)));

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
  }

  writeValue(obj: any): void {
    if (obj && obj !== this.country.value) {
      this.country.patchValue(obj);
    }
  }

  registerOnChange(fn: any) {
    this.onChanged = fn
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn
  }

  displayCountry(country: ICountry) {
    return country.name;
  }
}
