import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CommentComponent,
    multi: true
  }]
})
export class CommentComponent implements OnInit, ControlValueAccessor {
  commentControl = new FormControl();
  
  private _onChange: any = () => {};

  writeValue(obj: any): void {
    this.commentControl.patchValue(obj);
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  commentShown: boolean = false;

  constructor(private _ngZone: NgZone) { }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit() {
    this.commentControl.valueChanges.subscribe(v => this._onChange(v));
  }

  showComment() {
    this.commentShown = true;
  }

  hideComment() {
    this.commentShown = false;
  }
}
