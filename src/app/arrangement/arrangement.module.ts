import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrangementListComponent } from './arrangement-list/arrangement-list.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ArrangementListComponent],
  imports: [
    RouterModule,
    MaterialModule,
    CommonModule
  ],
  exports: [ArrangementListComponent]
})
export class ArrangementModule { }
