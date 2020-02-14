import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import * as fromArrangementActions from '../actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/model';
import { IArrangement } from '../model';
import * as fromEnclosureActions from 'src/app/enclosure/actions';
import { IEnclosure } from 'src/app/enclosure/model';

@Component({
  templateUrl: './arrangement-list.component.html',
  styleUrls: ['./arrangement-list.component.scss']
})
export class ArrangementListComponent implements OnInit {
  id$: Observable<string>;
  arrangements$: Observable<IArrangement[]>;
  enclosure$: Observable<IEnclosure>;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.store.dispatch(fromArrangementActions.loadArrangements())
    this.store.dispatch(fromEnclosureActions.load());
    
    this.id$ = this.route.paramMap.pipe(
      map((params: ParamMap) =>
        decodeURIComponent(params.get('id')))
    );

    this.enclosure$ = combineLatest(this.id$, this.store.select(s => s.enclosures.items)).pipe(map(d => d[1].find(e => e.code = d[0])))
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

  createReview() {
    /*const filter = this.getFilter(this.formGroup.value);
    const enclosure = this.enclosures.find(i => i.code = filter);
    if (enclosure) {
      console.warn(enclosure);

    } else {
      this.enclosureActions.create([{
        parent: filter,
        name: 'Foo',
        code: filter + ':$:1'
      }]);
    }*/
  }
}
