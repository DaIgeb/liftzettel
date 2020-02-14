import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as fromActions from 'src/app/rating/questionaire.actions';
import { map, tap } from 'rxjs/operators';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { IQuestionaire } from 'src/app/rating/model';

@Component({
  selector: 'app-questionaire',
  templateUrl: './questionaire.component.html',
  styleUrls: ['./questionaire.component.scss']
})
export class QuestionaireComponent implements OnInit {

  name = new FormControl();
  questions = new FormControl();
  formGroup = new FormGroup({
    name: this.name,
    questions: this.questions
  });

  id$: Observable<string>;
  questionnaire: import("c:/dev/liftzettel/src/app/rating/model").IQuestionaire;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.store.dispatch(fromActions.loadQuestionnaires());

    this.id$ = this.route.paramMap.pipe(
      map((params: ParamMap) =>
        decodeURIComponent(params.get('id')))
    );

    combineLatest(this.id$, this.store.select(s => s.ratings.questionaires.items)).pipe(
      map(d => d[1].find(i => i.id === d[0]))
    ).subscribe(q => {
      this.questionnaire = q;
      this.loadQuestionnaire(q);
    });
  }

  private loadQuestionnaire(questionnaire: IQuestionaire) {
    if (questionnaire) {
      this.name.patchValue(questionnaire.name);
      this.questions.patchValue(questionnaire.questions);
    }
  }

}
