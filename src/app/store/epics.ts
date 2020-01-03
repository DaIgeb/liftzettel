import { Injectable } from '@angular/core';
import { combineEpics } from 'redux-observable-es6-compat';

import { CountryEpics } from '../country/epics';
import { CityEpics } from '../city/epics';
import { StateEpics } from '../state/epics';
import { StreetEpics } from '../street/epics';

@Injectable({
  providedIn: 'root'
})
export class RootEpics {
  constructor(
    private countryEpics: CountryEpics,
    private cityEpics: CityEpics,
    private stateEpics: StateEpics,
    private streetEpics: StreetEpics
    ) {}

  createEpics() {
    return combineEpics(
      this.countryEpics.createEpic(),
      this.cityEpics.createEpic(),
      this.stateEpics.createEpic(),
      this.streetEpics.createEpic(),
    );
  }
}