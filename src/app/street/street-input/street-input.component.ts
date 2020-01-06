import { Component, OnInit, Input } from '@angular/core';
import { IStreet, isStreet } from '../model';
import { Observable, combineLatest } from 'rxjs';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ICity } from 'src/app/city/model';
import { NgRedux } from '@angular-redux/store';
import { AppState } from 'src/app/store/model';
import { StreetAPIActions } from '../actions';
import { filter, first, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-street-input',
  templateUrl: './street-input.component.html',
  styleUrls: ['./street-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: StreetInputComponent,
    multi: true
  }]
})
export class StreetInputComponent implements OnInit, ControlValueAccessor {
  private onChanged: any = () => { }
  private onTouched: any = () => { }

  filteredStreets$: Observable<IStreet[]>;
  street = new FormControl('Bahnhofstrasse');

  @Input()
  city$: Observable<string>;

  constructor(
    private store: NgRedux<AppState>,
    private streetActions: StreetAPIActions

  ) { }

  ngOnInit() {
    this.store.dispatch(this.streetActions.load());
    this.street.valueChanges.subscribe(v => this.onChanged(isStreet(v) ? v.name : undefined));

    const streets$ = this.store.select(s => s.streets.items);
    
    const availableStreets$ = combineLatest(streets$, this.city$).pipe(
      map(items => items[0].filter(i => i.city === items[1]))
    );

    this.filteredStreets$ =
      combineLatest(this.street.valueChanges, availableStreets$).pipe(
        map(data => {
          const currentValue = data[0].toLocaleLowerCase ? data[0].toLocaleLowerCase() : data[0].name.toLocaleLowerCase();
          const items = data[1];

          return items.filter(c =>
            c.name.toLocaleLowerCase().indexOf(currentValue) > -1
          );
        })
      );
  }



  writeValue(obj: any): void {
    if (obj && obj !== this.street.value) {
      this.street.patchValue(obj);
    }
  }

  registerOnChange(fn: any) {
    this.onChanged = fn
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn
  }

  displayStreet(street: IStreet) {
    return street.name;
  }
}
