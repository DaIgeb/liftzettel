import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as fromRatingAtions from '../actions';
import * as fromArrangementAtions from 'src/app/arrangement/actions';
import { map, filter, startWith } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { IQuestionaire, TQuestion } from '../model';
import { IArrangement } from 'src/app/arrangement/model';
import * as fromQuestionnaireActions from '../questionaire.actions';

@Component({
  selector: 'app-rating-create',
  templateUrl: './rating-create.component.html',
  styleUrls: ['./rating-create.component.scss']
})
export class RatingCreateComponent implements OnInit {
  id$: Observable<string>;
  arrangements$: Observable<IArrangement[]>;
  questionaires$: Observable<IQuestionaire[]>;
  questions$: Observable<TQuestion[]>;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.store.dispatch(fromRatingAtions.loadRatings({ meta: { country: 'CH' } }));
    this.store.dispatch(fromQuestionnaireActions.loadQuestionnaires());
    this.store.dispatch(fromArrangementAtions.loadArrangements());

    this.id$ = this.route.paramMap.pipe(
      map((params: ParamMap) =>
        decodeURIComponent(params.get('id')))
    );

    this.questionaires$ = this.store.select(s => s.ratings.questionaires.items);
    this.questions$ = this.questionaires$.pipe(
      filter(q => q.length > 0),
      map(q => q[0].questions),
      startWith([])
    );

    this.arrangements$ = combineLatest(this.id$, this.store.select(s => s.arrangements.items)).pipe(
      map(i => i[1].filter(r => r.code === i[0]))
    );
  }

  createRating(form: any) {
    console.warn(form);
  }

}
