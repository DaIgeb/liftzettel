import { Component, OnInit, Input } from '@angular/core';
import { TQuestion } from 'src/app/rating/model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input()
  question: TQuestion;

  constructor() { }

  ngOnInit() {
  }

}
