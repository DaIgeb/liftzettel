import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, FormArray } from '@angular/forms';
import { isArray } from 'util';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: QuestionListComponent,
    multi: true
  }]
})
export class QuestionListComponent implements OnInit, ControlValueAccessor {
  questionsControl = new FormArray([]);
  formGroup = new FormGroup({
    questions: this.questionsControl
  });

  private _onChange = (obj: any) => { };

  constructor(

  ) { }

  ngOnInit() {
    this.questionsControl.valueChanges.subscribe(v => this._onChange(v));
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  writeValue(obj: any): void {
    this.questionsControl.clear();
    if (isArray(obj)) {
      for (let question of obj) {
        this.questionsControl.push(new FormGroup({ question: new FormControl(question) }));
      }
    }
  }

  registerOnTouched(fn: any): void {
  }
}
