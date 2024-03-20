import { ChangeDetectorRef, Component } from '@angular/core';
import {  MatDialog } from '@angular/material/dialog';
import { CategoryCreateComponent } from '../category-create/category-create.component';
import { Router } from '@angular/router';
import { BackendServiceService } from '../../../../services/backend-service.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {
  constructor(
    private _dialog: MatDialog,
    private _backendService: BackendServiceService,private _router:Router
  ) {}
  public dataSource: any[] = [];
  public length = 10;
  public pageSize = 10;
  public currentPage = 1;
  displayedColumns = ['productId', 'productName', 'createdBy', 'action'];
  ngOnInit() {
    this.getDatasource(this.currentPage,this.pageSize);
  }
  getDatasource(pageIndex:Number,pageSize:Number) {
    const obj:any = {pageIndex,pageSize}
    this._backendService
      .makeGetApiCall('admin/allProducts',obj)
      .subscribe((res: any) => {
        if (res['success']) {
          this.dataSource = res.data.products;
          this.length= res.data.count;
        }
      });
  }
  productCreationRoute() {
    this._router.navigate(["/admin/productCreate"],{queryParams:{action:"create"}})
  }
  edit(element: any) {
    this._router.navigate(["/admin/productCreate"],{queryParams:{action:"update",productId:element.productId}})
  }
  deleteE(element: any) {
    this._backendService
      .makePostApiCall('admin/deleteProduct', {
        productId: element.productId,
      })
      .subscribe((res: any) => {
        if (res.success) {
          this.getDatasource(this.currentPage,this.pageSize);
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
