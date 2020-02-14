import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrangementListComponent } from './arrangement-list/arrangement-list.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { ArrangementCreateComponent } from './arrangement-create/arrangement-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { ArrangementEpics } from './epics';



@NgModule({
  declarations: [ArrangementListComponent, ArrangementCreateComponent],
  imports: [
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([ArrangementEpics]),
    CommonModule
  ],
  exports: [ArrangementListComponent]
})
export class ArrangementModule { }
