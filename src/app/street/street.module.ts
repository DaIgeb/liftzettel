import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreetInputComponent } from './street-input/street-input.component';
import { MaterialModule } from '../material.module';
import { EffectsModule } from '@ngrx/effects';
import { StreetEpics } from './epics';
import { StoreModule } from '@ngrx/store';
import { streetReducer } from './reducer';



@NgModule({
  declarations: [StreetInputComponent],
  imports: [
    CommonModule,
    MaterialModule,
    // StoreModule.forFeature('street', streetReducer),
    EffectsModule.forFeature([StreetEpics])
  ],
  exports: [
    StreetInputComponent
  ]
})
export class StreetModule { }
