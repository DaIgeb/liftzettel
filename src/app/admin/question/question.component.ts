import { Component, OnInit, Input } from '@angular/core';
import { TQuestion } from 'src/app/rating/model';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, FormGroup } from '@angular/forms';
import { isArray } from 'util';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: QuestionComponent,
    multi: true
  }]
})
export class QuestionComponent implements OnInit, ControlValueAccessor {
  types = [
    "yesno",
    "rating",
    "date"
  ]

  typeControl = new FormControl();
  requiredControl = new FormControl();
  allowCommentsControl = new FormControl();
  titleControl = new FormControl();
  keyControl = new FormControl();
  questionControl = new FormControl();
  questionPayloadControl = new FormControl();
  key: string;
  
  formGroup = new FormGroup({
    key: this.keyControl,
    title: this.titleControl,
    question: this.questionControl,
    type: this.typeControl,
    required: this.requiredControl,
    allowComments: this.allowCommentsControl,
    payload: this.questionPayloadControl
  });

  private _onChange = (obj: any) => { };

  constructor() { }

  ngOnInit() {
    this.formGroup.valueChanges.subscribe(v => this._onChange(v));
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  writeValue(obj: any): void {
    if (this.isQuestion(obj)) {
      const {key, question, title, required, type, allowComments, ...rest} = obj;
      this.key = obj.key || obj.title;

      this.allowCommentsControl.patchValue(allowComments);
      this.requiredControl.patchValue(required);
      this.titleControl.patchValue(title);
      this.keyControl.patchValue(this.key);
      this.questionControl.patchValue(question);
      this.typeControl.patchValue(type);
      this.questionPayloadControl.patchValue(rest);
    }
  }

  registerOnTouched(fn: any): void {
  }

  private isQuestion(obj: any): obj is TQuestion {
    if ((obj as TQuestion).type) {
      return true;
    }

    return false;
  }
}
