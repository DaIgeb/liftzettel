import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { ArrangementAPIActions } from '../actions';
import { NgRedux } from '@angular-redux/store';
import { AppState } from 'src/app/store/model';
import { IArrangement } from '../model';

@Component({
  templateUrl: './arrangement-list.component.html',
  styleUrls: ['./arrangement-list.component.scss']
})
export class ArrangementListComponent implements OnInit {
  id$: Observable<string>;
  arrangements$: Observable<IArrangement[]>;

  constructor(
    private store: NgRedux<AppState>,
    private route: ActivatedRoute,
    private arrangementActions: ArrangementAPIActions
  ) { }

  ngOnInit() {
    this.id$ = this.route.paramMap.pipe(
      map((params: ParamMap) =>
        decodeURIComponent(params.get('id')))
    );

    this.store.dispatch(this.arrangementActions.load())
    this.id$ = this.route.paramMap.pipe(
      map((params: ParamMap) =>
        decodeURIComponent(params.get('id')))
    );

    this.arrangements$ = combineLatest(this.id$, this.store.select(s => s.arrangements.items)).pipe(
      map(i => {
        return i[1].filter(r => r.parent.startsWith(i[0]));
      }));
  }

  showInfo(code: string) {
    alert(code);
  }
}
