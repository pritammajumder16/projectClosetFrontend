import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryCreateComponent } from '../category-create/category-create.component';
import { BackendServiceService } from '../../../../services/backend-service.service';

@Component({
  selector: 'app-user-update-dialog',
  templateUrl: './user-update-dialog.component.html',
  styleUrl: './user-update-dialog.component.scss',
})
export class UserUpdateDialogComponent {
  public action: string | undefined;
  public userName: Number | undefined;
  public showForm: boolean = false;
  public email: String | undefined;
  public roleMatrix: any[] = [];
  public initialRole: any;
  public initialRoleId: any;
  constructor(
    private dialogRef: MatDialogRef<CategoryCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _backendService: BackendServiceService
  ) {}
  ngOnInit() {
    this.action = this.data.action;
    if (this.action == 'update') {
      this.userName = this.data.element.userName;
      this.email = this.data.element.email;
      this.initialRoleId = this.data.element.roleId;
    }
    this._backendService
      .makeGetApiCall('admin/getRoleMatrix')
      .subscribe((res: any) => {
        if (res.success) {
          this.roleMatrix = res.data;
          if(this.initialRoleId){
            const i = this.roleMatrix.findIndex((role:any)=>role.roleId==this.initialRoleId)
            if(i>=0){
              this.initialRole=this.roleMatrix[i]
            }
            this.showForm = true;
          }
        }
      });
  }
  close() {
    this.dialogRef.close();
  }
  submit(form: NgForm) {
    console.log(form.value)
    if (form.invalid) return;
    const obj: any = {  };
    if (this.userName) {
      obj.userName = this.userName;
      obj.email = this.email;
      obj.roleId=form.value.role.roleId,
      obj.roleName=form.value.role.roleName
    }
    this.dialogRef.close(obj);
  }
}
