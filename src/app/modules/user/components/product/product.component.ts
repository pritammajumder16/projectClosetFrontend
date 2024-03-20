import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendServiceService } from '../../../../services/backend-service.service';
import { AuthServiceService } from '../../../../services/auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../../../common/success-dialog/success-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _backendService: BackendServiceService,
    private _authService: AuthServiceService,
    private _router: Router,
    private _dialog: MatDialog
  ) {}
  productId!: number;
  public productData!: any;
  public fileUri: string = '';
  public previewImage!: string;
  public quantity: number = 1;
  ngOnInit() {
    this.fileUri = this._backendService.fileURI;
    this._activatedRoute.queryParams.subscribe(async (params: any) => {
      this.productId = parseInt(params.productId);

      const res: any = await this._backendService
        .makeGetApiCall('unvfd/fetchProducts', { productId: params.productId })
        .toPromise();
      if (res.success) {
        this.productData = res.data;
        this.previewImage = this.productData.productImages[0];
        console.log(this.productData);
      }
    });
  }
  changePreview(productImage: string) {
    this.previewImage = productImage;
  }
  quantityChange(change: number) {
    if (this.quantity + change >= 1) this.quantity = this.quantity + change;
    else this.quantity = 1;
  }
  reviewProduct() {}
  async addToCart() {
    const obj = {
      productId: this.productData.productId,
      quantity: this.quantity,
      price: this.productData.price,
    };
    if (this._authService.getIsAuthenticated()) {
      const res: any = await this._backendService
        .makePostApiCall('user/addToCart', obj)
        .toPromise();
      if (res.success) {
        this._dialog.open(SuccessDialogComponent, {
          data: { message: 'Added to Cart successfully' },
        });
      }
    } else {
      this._router.navigate(['auth/login']);
    }
  }
  checkOut() {
    if (this._authService.getIsAuthenticated()) {
      this._router.navigate(['checkout']);
    } else {
      this._router.navigate(['auth/login']);
    }
  }
}
