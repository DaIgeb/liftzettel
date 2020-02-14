import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as fromActions from '../actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/model';

@Component({
  selector: 'app-arrangement-create',
  templateUrl: './arrangement-create.component.html',
  styleUrls: ['./arrangement-create.component.scss']
})
export class ArrangementCreateComponent implements OnInit {
  @Input()
  enclosureId: string;

  name = new FormControl('');

  formGroup = new FormGroup({
    name: this.name,
  });

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
  }

  createArrangement() {
    this.store.dispatch(fromActions.createArrangements({
      payload: [
        {
          parent: this.enclosureId,
          code: this.enclosureId + ':$:1',
          name: this.name.value
        }
      ]
    }));
  }

}
