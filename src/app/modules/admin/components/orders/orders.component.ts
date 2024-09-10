/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../../services/auth-service.service';
import { BackendServiceService } from '../../../../services/backend-service.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../../../common/success-dialog/success-dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  public allOrders: any[] = [];
  public fileUri!: string;
  displayedColumns = ['title', 'quantity', 'totalPrice'];
  constructor(
    private _backendService: BackendServiceService,
    private authService: AuthServiceService,
    private _dialog: MatDialog
  ) {}
  public length = 10;
  public pageIndex = 1;
  public pageSize = 10;
  ngOnInit() {
    this.fileUri = this._backendService.fileURI;

    this.getOrder(this.pageSize, this.pageIndex);
  }
  public getOrder(pageSize: number, pageIndex: number) {
    this._backendService
      .makeGetApiCall('user/getOrders', {
        pageIndex: pageIndex.toString(),
        pageSize: pageSize.toString(),
      })
      .subscribe((res: any) => {
        if (res.success) {
          this.allOrders = res.data.orders;
          this.length = res.data.count;
        }
      });
  }
  page(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex + 1;
    this.getOrder(this.pageSize, this.pageIndex);
  }
  shipOrder(orderId: string) {
    this.updateOrderStatus('shipped', orderId);
  }
  cancelOrder(orderId: string) {
    this.updateOrderStatus('cancelled', orderId);
  }
  updateOrderStatus(status: string, orderId: string) {
    this._backendService
      .makePostApiCall('user/orderStatus', { status, orderId })
      .subscribe((res: any) => {
        this._dialog.open(SuccessDialogComponent, {
          data: { message: `Order ${status} successfully!` },
        });

        this.getOrder(this.pageSize, this.pageIndex);
      });
  }
  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
