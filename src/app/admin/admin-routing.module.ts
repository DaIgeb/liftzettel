import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionnaireListComponent } from './questionnaire-list/questionnaire-list.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionaireComponent } from './questionaire/questionaire.component';


const routes: Routes = [
  
  { path: 'questionnaire/:id', component: QuestionaireComponent },
  { path: 'questionnaire', component: QuestionnaireListComponent },
  { path: '', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
