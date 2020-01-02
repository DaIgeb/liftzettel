import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryInputComponent } from './country-input/country-input.component';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [CountryInputComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CountryInputComponent
  ]
})
export class CountryModule { }
