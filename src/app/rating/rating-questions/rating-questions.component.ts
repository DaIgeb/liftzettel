import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TQuestion } from '../model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rating-questions',
  templateUrl: './rating-questions.component.html',
  styleUrls: ['./rating-questions.component.scss']
})
export class RatingQuestionsComponent implements OnInit, OnChanges {
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (changes.questions) {
      let group: any = {};

      (changes.questions.currentValue || []).forEach(question => {
        group[question.key || question.title] = new FormGroup({
          question: question.required ? new FormControl(question.value || '', Validators.required)
            : new FormControl(question.value || ''),
          comment: new FormControl()
        });
      });

      this.formGroup = new FormGroup(group);
    }
  }
  @Input()
  questions: TQuestion[];
  formGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  createRating() {
    console.warn(this.formGroup.value);
  }
}
