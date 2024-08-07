import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from '../../../../services/backend-service.service';
import { AuthServiceService } from '../../../../services/auth-service.service';

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
    private authService: AuthServiceService
  ) {}
  ngOnInit() {
    this.fileUri = this._backendService.fileURI;
    const email: string | undefined = this.authService.getData().email;
    if (email) {
      this.getOrder(email);
    }
  }
  public getOrder(email: string) {
    this._backendService
      .makeGetApiCall('user/getOrders', { email })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .subscribe((res: any) => {
        console.log(res);
        this.allOrders = res.data;
        console.log('This.allOrders', this.allOrders);
      });
  }
  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
