import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateInputComponent } from './state-input/state-input.component';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [StateInputComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    StateInputComponent
  ]
})
export class StateModule { }
