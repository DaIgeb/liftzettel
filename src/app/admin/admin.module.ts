import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionnaireListComponent } from './questionnaire-list/questionnaire-list.component';
import { MaterialModule } from '../material.module';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionComponent } from './question/question.component';
import { QuestionaireComponent } from './questionaire/questionaire.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [DashboardComponent, QuestionnaireListComponent, QuestionListComponent, QuestionComponent, QuestionaireComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
  ]
})
export class AdminModule { }
