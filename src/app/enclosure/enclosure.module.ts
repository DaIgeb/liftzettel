import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnclosureListComponent } from './enclosure-list/enclosure-list.component';
import { EffectsModule } from '@ngrx/effects';
import { EnclosureEpics } from './epics';



@NgModule({
  declarations: [EnclosureListComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([EnclosureEpics])
  ],
  exports: [EnclosureListComponent]
})
export class EnclosureModule { }
