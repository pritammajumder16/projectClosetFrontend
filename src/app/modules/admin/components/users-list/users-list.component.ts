import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BackendServiceService } from '../../../../services/backend-service.service';
import { CategoryCreateComponent } from '../category-create/category-create.component';
import { UserUpdateDialogComponent } from '../user-update-dialog/user-update-dialog.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  constructor(
    private _Router: Router,
    private _dialog: MatDialog,
    private _backendService: BackendServiceService,
    private _cdk: ChangeDetectorRef
  ) {}
  public dataSource: any[] = [];
  public length = 10;
  public pageSize = 10;
  public currentPage = 1;
  displayedColumns = ['userName', 'email', 'roleName', 'action'];
  ngOnInit() {
    this.getDatasource(this.currentPage,this.pageSize);
  }
  getDatasource(pageIndex:Number,pageSize:Number) {
    const obj:any = {pageIndex,pageSize}
    this._backendService
      .makeGetApiCall('admin/allUsers',obj)
      .subscribe((res: any) => {
        if (res['success']) {
          this.dataSource = res.data.users;
          this.length= res.data.count;
        }
      });
  }
  edit(element: any) {
    this.dialogOpenSubGet('admin/updateUsers', 'update', element);
  }
 
  public dialogOpenSubGet(route: string, action: string, element?: any) {
    const data: any = { data: { action } };
    if (element) {
      data.data.element = element;
    }
    this._dialog
      .open(UserUpdateDialogComponent, data)
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this._backendService
            .makeGetApiCall(route, res)
            .subscribe((res: any) => {
              if (res.success) {
                this.getDatasource(this.currentPage,this.pageSize);
              }
            });
        }
      });
  }
  page(event:any){
    this.pageSize=event.pageSize
    this.currentPage=event.pageIndex+1;
    console.log(event);
    this.getDatasource(this.currentPage, event.pageSize)
  }
}
