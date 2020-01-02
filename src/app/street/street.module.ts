import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreetInputComponent } from './street-input/street-input.component';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [StreetInputComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    StreetInputComponent
  ]
})
export class StreetModule { }
