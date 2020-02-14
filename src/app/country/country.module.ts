import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryInputComponent } from './country-input/country-input.component';
import { MaterialModule } from '../material.module';
import { EffectsModule } from '@ngrx/effects';
import { CountryEpics } from './epics';



@NgModule({
  declarations: [CountryInputComponent],
  imports: [
    CommonModule,
    MaterialModule,
    EffectsModule.forFeature([CountryEpics])
  ],
  exports: [
    CountryInputComponent
  ]
})
export class CountryModule { }
