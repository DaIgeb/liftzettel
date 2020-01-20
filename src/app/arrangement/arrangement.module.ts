import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrangementListComponent } from './arrangement-list/arrangement-list.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { ArrangementCreateComponent } from './arrangement-create/arrangement-create.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ArrangementListComponent, ArrangementCreateComponent],
  imports: [
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [ArrangementListComponent]
})
export class ArrangementModule { }
