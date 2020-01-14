import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { RatingAPIActions } from '../actions';
import { NgRedux } from '@angular-redux/store';
import { AppState } from 'src/app/store/model';
import { IRating } from '../model';
import { IArrangement } from 'src/app/arrangement/model';
import { ArrangementAPIActions } from 'src/app/arrangement/actions';

@Component({
  templateUrl: './rating-list.component.html',
  styleUrls: ['./rating-list.component.scss']
})
export class RatingListComponent implements OnInit {
  id$: Observable<string>;
  arrangements$: Observable<IArrangement[]>;
  ratings$: Observable<{ [index: string]: IRating[] }>;

  constructor(
    private store: NgRedux<AppState>,
    private route: ActivatedRoute,
    private ratingActions: RatingAPIActions,
    private arrangementActions: ArrangementAPIActions
  ) { }

  ngOnInit() {
    this.store.dispatch(this.ratingActions.load('CH'))
    this.store.dispatch(this.arrangementActions.load())
    this.id$ = this.route.paramMap.pipe(
      map((params: ParamMap) =>
        decodeURIComponent(params.get('id')))
    );

    this.arrangements$ = combineLatest(this.id$, this.store.select(s => s.arrangements.items)).pipe(
      map(i => i[1].filter(r => r.parent.startsWith(i[0]))));

    this.arrangements$ = combineLatest(this.id$, this.store.select(s => s.arrangements.items), this.store.select(s => s.ratings.items)).pipe(
      map(i => {
        const ratingsByParent = i[2].reduce((prev, cur) => {
          prev[cur.parent] = [
            ...(prev[cur.parent] || []),
            cur
          ]
          return prev;
        }, {});

        return i[1].filter(r => r.parent.startsWith(i[0])).map(a => {
          const ratings = (ratingsByParent[a.code] || []);
          return ({
            ...a,
            rating: ratings.reduce((prev, cur) => prev + cur.rating, 0) / (ratings.length || 1),
            ratings: ratings
          });
        });
      }));

    const arrangementIds$ = this.arrangements$.pipe(map(i => i.map(a => a.code)));

    this.ratings$ = combineLatest(arrangementIds$, this.store.select(s => s.ratings.items)).pipe(
      map(d => d[1].filter(r => d[0].indexOf(r.parent) > -1)),
      map(i => i.reduce((prev, cur) => {
        prev[cur.parent] = [
          ...(prev[cur.parent] || []),
          cur
        ];

        return prev;
      }, {})));
  }

}
