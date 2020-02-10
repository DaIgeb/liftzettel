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

  @Input()
  question: TQuestion;

  formGroup = new FormGroup({
    key: new FormControl(),
    title: new FormControl(),
    type: new FormControl(),
    required: new FormControl(),
    allowComments: new FormControl()
  });

  questionControl = new FormControl();
  typeControl = new FormControl();
  titleControl = new FormControl();
  key: string;
  private _onChange = (obj: any) => { };

  constructor() { }

  ngOnInit() {
    this.questionControl.valueChanges.subscribe(v => this._onChange(v));
  }


  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  writeValue(obj: any): void {
    if (this.isQuestion(obj)) {
      this.key = obj.key || obj.title;
      this.formGroup.patchValue(obj);

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
