import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment/comment.component';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CommentComponent
  ],
  imports: [
    MaterialModule, 
    FormsModule,
    CommonModule
  ],
  exports: [
    CommentComponent
  ]
})
export class SharedModule { }
