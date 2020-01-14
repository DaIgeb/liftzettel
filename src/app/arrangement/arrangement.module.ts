import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrangementListComponent } from './arrangement-list/arrangement-list.component';



@NgModule({
  declarations: [ArrangementListComponent],
  imports: [
    CommonModule
  ],
  exports: [ArrangementListComponent]
})
export class ArrangementModule { }
