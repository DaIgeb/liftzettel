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
  registerOnChange(fn: any): void {
    this._onChange = fn;
    //throw new Error("Method not implemented.2");
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }
  questionsControl = new FormArray([]);
  formGroup = new FormGroup({
    comment: this.questionsControl
  });

  private _onChange: any;
  
  constructor(
    
  ) { }

  ngOnInit() {
    // this.questionsControl.valueChanges.subscribe(v => this._onChange(v));    
  }


  writeValue(obj: any): void {
    this.questionsControl.clear();
    if (isArray(obj)) {
      for (let question of obj) {
        this.questionsControl.push(new FormControl(question));
      }
    }
  }

  
  registerOnTouched(fn: any): void {
  }

  
}
