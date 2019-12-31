import { Injectable } from '@angular/core';

// import { combineEpics } from 'redux-observable';
import { combineEpics } from 'redux-observable-es6-compat';

import { CountryEpics } from '../country/epics';
import { CityEpics } from '../city/epics';
import { StateEpics } from '../state/epics';

@Injectable({
  providedIn: 'root'
})
export class RootEpics {
  constructor(
    private countryEpics: CountryEpics,
    private cityEpics: CityEpics,
    private stateEpics: StateEpics
    ) {}

  createEpics() {
    return combineEpics(
      this.countryEpics.createEpic(),
      this.cityEpics.createEpic(),
      this.stateEpics.createEpic(),
    );
  }
}