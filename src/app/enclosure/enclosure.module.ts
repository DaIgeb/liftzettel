import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnclosureListComponent } from './enclosure-list/enclosure-list.component';



@NgModule({
  declarations: [EnclosureListComponent],
  imports: [
    CommonModule
  ],
  exports: [EnclosureListComponent]
})
export class EnclosureModule { }
