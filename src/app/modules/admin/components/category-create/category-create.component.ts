/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.scss',
})
export class CategoryCreateComponent implements OnInit {
  public action: string | undefined;
  public categoryId: number | undefined;
  public categoryName: string | undefined;
  public showForm: boolean = false;
  constructor(
    private dialogRef: MatDialogRef<CategoryCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit() {
    this.action = this.data.action;
    if (this.action == 'update') {
      this.categoryId = this.data.element.categoryId;

      this.categoryName = this.data.element.categoryName;
    }
    this.showForm = true;
  }
  close() {
    this.dialogRef.close();
  }
  submit(form: NgForm) {
    if (form.invalid) return;
    const obj: any = { ...form.value };
    if (this.categoryId) {
      obj.categoryId = this.categoryId;
    }
    this.dialogRef.close(obj);
  }
}
