import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityInputComponent } from './city-input/city-input.component';
import { MaterialModule } from '../material.module';
import { EffectsModule } from '@ngrx/effects';
import { CityEpics } from './epics';



@NgModule({
  declarations: [CityInputComponent],
  imports: [
    CommonModule,
    MaterialModule,
    EffectsModule.forFeature([CityEpics])
  ],
  exports: [
    CityInputComponent
  ]
})
export class CityModule { }
