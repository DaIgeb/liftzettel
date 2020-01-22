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
    this.store.dispatch(this.ratingActions.load('CH'))
    this.store.dispatch(this.questionaireActions.load())
    this.store.dispatch(this.arrangementActions.load())
    this.id$ = this.route.paramMap.pipe(
      map((params: ParamMap) =>
        decodeURIComponent(params.get('id')))
    );

    this.questionaires$ = this.store.select(s => s.ratings.questionaires.items);

    this.arrangements$ = combineLatest(this.id$, this.store.select(s => s.arrangements.items), this.store.select(s => s.ratings.ratings.items)).pipe(
      map(i => {
        const ratingsByParent = i[2].reduce((prev, cur) => {
          prev[cur.parent] = [
            ...(prev[cur.parent] || []),
            cur
          ]
          return prev;
        }, {} as {[index: string]: IRating[]});

        return i[1].filter(r => r.parent.startsWith(i[0])).map(a => {
          const ratings = (ratingsByParent[a.code] || []);
          return ({
            ...a,
            rating: ratings.reduce((prev, cur) => prev + cur.rating, 0) / (ratings.length || 1),
            ratings: ratings
          });
        });
      }));

  }

}
