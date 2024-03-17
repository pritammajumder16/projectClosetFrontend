import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryCreateComponent } from '../category-create/category-create.component';
import { BackendServiceService } from '../../../../services/backend-service.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
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
  displayedColumns = ['categoryId', 'categoryName', 'createdBy', 'action'];
  ngOnInit() {
    this.getDatasource(this.currentPage,this.pageSize);
  }
  getDatasource(pageIndex:Number,pageSize:Number) {
    const obj:any = {pageIndex,pageSize}
    this._backendService
      .makeGetApiCall('admin/allCategories',obj)
      .subscribe((res: any) => {
        if (res['success']) {
          this.dataSource = res.data.categories;
          this.length= res.data.count;
        }
      });
  }
  categoryCreationRoute() {
    this.dialogOpenSubGet('admin/category', 'create');
  }
  edit(element: any) {
    this.dialogOpenSubGet('admin/category', 'update', element);
  }
  deleteE(element: any) {
    this._backendService
      .makePostApiCall('admin/categoryDelete', {
        categoryId: element.categoryId,
      })
      .subscribe((res: any) => {
        if (res.success) {
          this.getDatasource(this.currentPage,this.pageSize);
        }
      });
  }
  public dialogOpenSubGet(route: string, action: string, element?: any) {
    const data: any = { data: { action } };
    if (element) {
      data.data.element = element;
    }
    this._dialog
      .open(CategoryCreateComponent, data)
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
