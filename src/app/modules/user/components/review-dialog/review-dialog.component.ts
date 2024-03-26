import { Component, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrl: './review-dialog.component.scss'
})
export class ReviewDialogComponent {
  public rating!: number;
  review:string="";
  constructor(private _dialogRef:MatDialogRef<ReviewDialogComponent>, @Inject(MAT_DIALOG_DATA) public data:any) { }

  rate(index: number) {
    this.rating = index;
  }
  submit(){
    this._dialogRef.close({rating:this.rating,review:this.review})
  }
  close(){
    this._dialogRef.close()
  }
}
