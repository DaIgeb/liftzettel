import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityInputComponent } from './city-input/city-input.component';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [CityInputComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CityInputComponent
  ]
})
export class CityModule { }
