import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingListComponent } from './rating-list/rating-list.component';



@NgModule({
  declarations: [RatingListComponent],
  imports: [
    CommonModule
  ],
  exports: [
    // ListComponent
  ]
})
export class RatingModule { }
