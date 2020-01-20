import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-arrangement-create',
  templateUrl: './arrangement-create.component.html',
  styleUrls: ['./arrangement-create.component.scss']
})
export class ArrangementCreateComponent implements OnInit {
  name = new FormControl();

  formGroup = new FormGroup({
    name: this.name
  });

  constructor() { }

  ngOnInit() {
  }

}
