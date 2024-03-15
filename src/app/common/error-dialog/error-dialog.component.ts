import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.scss'
})
export class ErrorDialogComponent {
  constructor(
    public dialogRef:MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
