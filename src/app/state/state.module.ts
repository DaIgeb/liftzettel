import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateInputComponent } from './state-input/state-input.component';
import { MaterialModule } from '../material.module';
import { EffectsModule } from '@ngrx/effects';
import { StateEpics } from './epics';



@NgModule({
  declarations: [StateInputComponent],
  imports: [
    CommonModule,
    MaterialModule,
    EffectsModule.forFeature([StateEpics])
  ],
  exports: [
    StateInputComponent
  ]
})
export class StateModule { }
