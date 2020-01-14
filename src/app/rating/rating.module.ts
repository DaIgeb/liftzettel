import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingListComponent } from './rating-list/rating-list.component';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [RatingListComponent],
  imports: [
    MaterialModule,
    CommonModule
  ],
  exports: [
    // ListComponent
  ]
})
export class RatingModule { }
