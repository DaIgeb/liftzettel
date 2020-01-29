import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from 'src/app/store/model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RatingAPIActions } from '../actions';
import { ArrangementAPIActions } from 'src/app/arrangement/actions';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { IRating, IQuestionaire } from '../model';
import { IArrangement } from 'src/app/arrangement/model';
import { QuestionaireAPIActions } from '../questionaire.actions';

@Component({
  selector: 'app-rating-create',
  templateUrl: './rating-create.component.html',
  styleUrls: ['./rating-create.component.scss']
})
export class RatingCreateComponent implements OnInit {
  id$: Observable<string>;
  arrangements$: Observable<IArrangement[]>;
  questionaires$: Observable<IQuestionaire[]>;

  constructor(
    private store: NgRedux<AppState>,
    private route: ActivatedRoute,
    private ratingActions: RatingAPIActions,
    private questionaireActions: QuestionaireAPIActions,
    private arrangementActions: ArrangementAPIActions) { }

  ngOnInit() {
    this.ratingActions.load('CH');
    this.questionaireActions.load();
    this.arrangementActions.load();
    this.id$ = this.route.paramMap.pipe(
      map((params: ParamMap) =>
        decodeURIComponent(params.get('id')))
    );

    this.questionaires$ = this.store.select(s => s.ratings.questionaires.items);

    this.arrangements$ = combineLatest(this.id$, this.store.select(s => s.arrangements.items)).pipe(
      map(i => i[1].filter(r => r.code === i[0]))
    );
  }

  createRating(form: any) {
    console.warn(form);
  }

}
