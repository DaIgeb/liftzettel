import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ArrangementAPIActions } from '../actions';

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
    private arrangementActions: ArrangementAPIActions
  ) { }

  ngOnInit() {
  }

  createArrangement() {
    this.arrangementActions.create([
      {
        parent: this.enclosureId,
        code: this.enclosureId + ':$:1',
        name: this.name.value
      }
    ]);
  }

}
