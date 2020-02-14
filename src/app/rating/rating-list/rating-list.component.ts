import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import * as fromRatingActions from '../actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/model';
import { IRating } from '../model';
import { IArrangement } from 'src/app/arrangement/model';
import * as fromArrangementActions from 'src/app/arrangement/actions';

type TArrangement = IArrangement & {
  ratings: IRating[];
  rating: number;
};

@Component({
  templateUrl: './rating-list.component.html',
  styleUrls: ['./rating-list.component.scss']
})
export class RatingListComponent implements OnInit {
  displayedColumns = ['type', 'rating'];
  id$: Observable<string>;
  arrangements$: Observable<TArrangement[]>;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.store.dispatch(fromRatingActions.loadRatings({ meta: { country: 'CH' } }))
    this.store.dispatch(fromArrangementActions.loadArrangements())
    this.id$ = this.route.paramMap.pipe(
      map((params: ParamMap) =>
        decodeURIComponent(params.get('id')))
    );

    this.arrangements$ = combineLatest(this.id$, this.store.select(s => s.arrangements.items), this.store.select(s => s.ratings.ratings.items)).pipe(
      map(i => {
        const ratingsByParent = i[2].reduce((prev, cur) => {
          prev[cur.parent] = [
            ...(prev[cur.parent] || []),
            cur
          ]
          return prev;
        }, {} as { [index: string]: IRating[] });

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
