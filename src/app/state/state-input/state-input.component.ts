import { Component, OnInit, Input } from '@angular/core';
import { filter, first, map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { IState } from '../model';
import { NgRedux } from '@angular-redux/store';
import { AppState } from 'src/app/store/model';
import { StateAPIActions } from '../actions';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-state-input',
  templateUrl: './state-input.component.html',
  styleUrls: ['./state-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: StateInputComponent,
    multi: true
  }]
})
export class StateInputComponent implements OnInit, ControlValueAccessor {
  private onChanged: any = () => { }
  private onTouched: any = () => { }

  state = new FormControl('ZH');

  filteredStates$: Observable<IState[]>;

  @Input()
  countryCode$: Observable<string>;

  constructor(
    private store: NgRedux<AppState>,
    private stateActions: StateAPIActions,
  ) { }

  ngOnInit() {
    this.store.dispatch(this.stateActions.load());    
    this.state.valueChanges.subscribe(v => this.onChanged(v));

    const states$ = this.store.select(s => s.states.items);

    states$.pipe(
      filter(items => items.length > 0),
      first()
    ).subscribe(items => this.state.patchValue(items.find(i => i.countryIsoCode === 'CH' && i.code === 'ZH')));


    const availableStates$ = combineLatest(states$, this.countryCode$).pipe(
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

  }

  writeValue(obj: any): void {
    if (obj && obj !== this.state.value) {
      this.state.patchValue(obj);
    }
  }

  registerOnChange(fn: any) {
    this.onChanged = fn
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn
  }

  displayState(state: IState) {
    return state.code;
  }
}
