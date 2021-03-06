import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingListComponent } from './rating-list/rating-list.component';
import { MaterialModule } from '../material.module';
import { RatingCreateComponent } from './rating-create/rating-create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RatingQuestionsComponent } from './rating-questions/rating-questions.component';
import { EffectsModule } from '@ngrx/effects';
import { RatingEpics } from './RatingEpics';
import { QuestionaireEpics } from './QuestionaireEpics';



@NgModule({
  declarations: [RatingListComponent, RatingCreateComponent, RatingQuestionsComponent],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    SharedModule,
    EffectsModule.forFeature([RatingEpics, QuestionaireEpics])
  ],
  exports: [
    // ListComponent
  ]
})
export class RatingModule { }
