import { Component, ElementRef, ViewChild } from '@angular/core';
import { BackendServiceService } from '../../../../services/backend-service.service';
import { AuthServiceService } from '../../../../services/auth-service.service';
import { Router } from '@angular/router';
declare var paypal:any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  constructor(
    private _backendService: BackendServiceService,
    private _authService: AuthServiceService,private _router:Router
  ) {}
  @ViewChild("paypalC", {static:true}) paypalContainer!:ElementRef;
  public totalPriceWithoutShipping = 0;
  displayedColumns = ['title', 'unitPrice', 'quantity', 'totalPrice'];
  public fileUri!: string;
  public shippingCostPerItem = 100;
  public cartItems: any[] = [];
  async ngOnInit() {
    
    await this.initializeApp()
  }
  async initializeApp(){
    this.fileUri = this._backendService.fileURI;
    const email = this._authService.getData().email;
    if (email) {
      const res: any = await this._backendService
        .makeGetApiCall('user/getCart', { email })
        .toPromise();
      if (res.success) {
        this.cartItems = res.data;
      }

      this.getPrice();
    }
  }
  
  deleteE(element: any) {}
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
  
  checkOut(){
    const amount = parseFloat(this.totalPriceWithoutShipping.toString())+(this.cartItems.length*this.shippingCostPerItem); // Example amount
    this._backendService.makePostApiCall("user/initiatePayment",{ amount,email:this._authService.getData().email,products:this.cartItems }).subscribe((res:any)=>{
      console.log('Payment initiated successfully:', res);
      if(res.success){
        // this._router.navigateByUrl(res.data)
        window.location.href=res.data
      }
    },(error:any) => {
      console.error('Error initiating payment:', error);
      // Handle error
    })
  }
}