import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingListComponent } from './rating-list/rating-list.component';
import { MaterialModule } from '../material.module';
import { RatingCreateComponent } from './rating-create/rating-create.component';



@NgModule({
  declarations: [RatingListComponent, RatingCreateComponent],
  imports: [
    MaterialModule,
    CommonModule
  ],
  exports: [
    // ListComponent
  ]
})
export class RatingModule { }
