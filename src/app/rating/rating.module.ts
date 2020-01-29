import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingListComponent } from './rating-list/rating-list.component';
import { MaterialModule } from '../material.module';
import { RatingCreateComponent } from './rating-create/rating-create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [RatingListComponent, RatingCreateComponent],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    SharedModule
  ],
  exports: [
    // ListComponent
  ]
})
export class RatingModule { }
