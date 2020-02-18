import { Component, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-question-rating',
  templateUrl: './question-rating.component.html',
  styleUrls: ['./question-rating.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: QuestionRatingComponent,
    multi: true
  }]
})
export class QuestionRatingComponent implements OnInit, ControlValueAccessor {
  formGroup = new FormGroup({
    min: new FormControl('1'),
    max: new FormControl('10')
  });

  private _onChange = (obj: any) => { };


  constructor() { }

  ngOnInit(): void {
    this.formGroup.valueChanges.subscribe(v => this._onChange(v));
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  writeValue(obj: any): void {
    this.formGroup.patchValue(obj);
  }

  registerOnTouched(fn: any): void {
  }


}
