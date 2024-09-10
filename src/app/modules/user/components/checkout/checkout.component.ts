import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from '../../../../services/backend-service.service';
import { AuthServiceService } from '../../../../services/auth-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  constructor(
    private _backendService: BackendServiceService,
    private _authService: AuthServiceService,
    private _router: Router,
    private formBuilder: FormBuilder
  ) {}

  public totalPriceWithoutShipping = 0;
  displayedColumns = ['title', 'unitPrice', 'quantity', 'totalPrice'];
  public fileUri!: string;
  public shippingCostPerItem = 100;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public cartItems: any[] = [];
  addressForm!: FormGroup;
  async ngOnInit() {
    this.addressForm = this.formBuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern('[0-9]{6}')]],
    });
    await this.initializeApp();
  }
  async initializeApp() {
    this.fileUri = this._backendService.fileURI;
    const email = this._authService.getData().email;
    if (email) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await this._backendService
        .makeGetApiCall('user/getCart', { email })
        .toPromise();
      if (res.success) {
        this.cartItems = res.data;
      }

      this.getPrice();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  quantityChange(change: number, element: any) {
    if (element.quantity + change >= 1)
      element.quantity = element.quantity + change;
    else element.quantity = 1;
    this.getPrice();
  }
  getPrice() {
    let price = 0;
    this.cartItems?.forEach((product) => {
      price += product.price * product.quantity;
    });
    this.totalPriceWithoutShipping = price;
  }

  checkOut() {
    const shippingAddress = this.addressForm.value;
    const amount =
      parseFloat(this.totalPriceWithoutShipping.toString()) +
      this.cartItems.length * this.shippingCostPerItem; // Example amount
    this._backendService
      .makePostApiCall('user/stripe-create-checkout-session', {
        amount,
        email: this._authService.getData().email,
        products: this.cartItems,
        shippingAddress,
      })
      .subscribe(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (res: any) => {
          if (res.success) {
            // this._router.navigateByUrl(res.data)
            // window.location.href = res.data;
          }
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error: any) => {
          console.error('Error initiating payment:', error);
          // Handle error
        }
      );
  }
  onSubmit() {}
}
