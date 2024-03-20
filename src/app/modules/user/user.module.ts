import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialModule } from '../../materials.module';
import { HomeComponent } from './components/home/home.component';
import { userRoutingModule } from './user-routing.module';
import { SideFilterComponent } from './components/side-filter/side-filter.component';
import { FormsModule } from '@angular/forms';
import { FilterDrawersComponent } from './components/filter-drawers/filter-drawers.component';
import { ProductComponent } from './components/product/product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrdersComponent } from './components/orders/orders.component';



@NgModule({
  declarations: [
    HomeComponent,
    SideFilterComponent,
    FilterDrawersComponent,
    ProductComponent,
    CheckoutComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,materialModule,userRoutingModule,FormsModule
  ]
})
export class UserModule { }
