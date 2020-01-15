import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrangementListComponent } from './arrangement-list/arrangement-list.component';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [ArrangementListComponent],
  imports: [
    MaterialModule,
    CommonModule
  ],
  exports: [ArrangementListComponent]
})
export class ArrangementModule { }
