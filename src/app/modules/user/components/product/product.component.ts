import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendServiceService } from '../../../../services/backend-service.service';
import { AuthServiceService } from '../../../../services/auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../../../common/success-dialog/success-dialog.component';
import { ReviewDialogComponent } from '../review-dialog/review-dialog.component';
import { ErrorDialogComponent } from '../../../../common/error-dialog/error-dialog.component';
import { IProduct } from '../../../../../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _backendService: BackendServiceService,
    private _authService: AuthServiceService,
    private _router: Router,
    private _dialog: MatDialog,
    private renderer: Renderer2
  ) {}
  public ti = 'https://wittlock.github.io/ngx-image-zoom/assets/thumb.jpg';
  productId!: number;
  public productData!: IProduct;
  public fileUri: string = '';
  public previewImage!: string;
  public quantity: number = 1;
  enlargedImage: boolean = false; // Flag to track whether the enlarged image is visible
  enlargedPositionX: number = 0; // X coordinate for positioning enlarged image
  enlargedPositionY: number = 0;
  selectedSize: string = '';
  @ViewChild('enlargedImageRef', { static: true })
  enlargedImageRef!: ElementRef<HTMLImageElement>;
  ngOnInit() {
    this.fileUri = this._backendService.fileURI;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this._activatedRoute.queryParams.subscribe(async (params: any) => {
      this.productId = parseInt(params.productId);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await this._backendService
        .makeGetApiCall('unvfd/fetchProducts', { productId: params.productId })
        .toPromise();
      if (res.success) {
        this.productData = res.data;
        this.previewImage = this.productData.productImages[0];
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
  reviewProduct() {
    this._dialog
      .open(ReviewDialogComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result && result.rating)
          this._backendService
            .makePostApiCall('user/postReview', {
              productId: this.productData.productId,
              rating: result.rating,
              review: result.review,
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .subscribe((res: any) => {
              if (res.success)
                this._dialog.open(SuccessDialogComponent, {
                  data: { message: 'Review successfully added' },
                });
            });
      });
  }
  async addToCart() {
    if (!this.selectedSize) {
      this._dialog.open(ErrorDialogComponent, {
        data: { message: 'Please select a size' },
      });
      return;
    }
    const obj = {
      productId: this.productData.productId,
      quantity: this.quantity,
      price: this.productData.price,
      size: this.selectedSize,
    };
    if (this._authService.getIsAuthenticated()) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  // Y coordinate for positioning enlarged image

  showEnlargeImage() {
    this.enlargedImage = true;
  }

  hideEnlargeImage() {
    this.enlargedImage = false;
  }

  updateEnlargedPosition(event: MouseEvent) {
    const thumbnailRect = (
      event.currentTarget as HTMLElement
    ).getBoundingClientRect();
    this.enlargedPositionX = event.clientX - thumbnailRect.left;
    this.enlargedPositionY = event.clientY - thumbnailRect.top;
    this.updateEnlargedImagePosition();
  }

  private updateEnlargedImagePosition() {
    if (this.enlargedImageRef && this.enlargedImageRef.nativeElement?.style) {
      const enlargedImage = this.enlargedImageRef.nativeElement;
      this.renderer.setStyle(
        enlargedImage,
        'left',
        `${this.enlargedPositionX}px`
      );
      this.renderer.setStyle(
        enlargedImage,
        'top',
        `${this.enlargedPositionY}px`
      );
    }
  }
  selectSize(size: string) {
    this.selectedSize = size; // Update the selected size
  }
}
