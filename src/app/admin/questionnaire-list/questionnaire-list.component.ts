import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IQuestionaire } from 'src/app/rating/model';
import * as fromActions from 'src/app/rating/questionaire.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/model';

@Component({
  selector: 'app-questionnaire-list',
  templateUrl: './questionnaire-list.component.html',
  styleUrls: ['./questionnaire-list.component.scss']
})
export class QuestionnaireListComponent implements OnInit {
  displayedColumns = ['name', 'questions', 'actions'];
  questionnaires$: Observable<IQuestionaire[]>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(fromActions.loadQuestionnaires());

    this.questionnaires$ = this.store.select(s => s.ratings.questionaires.items);
  }

}
