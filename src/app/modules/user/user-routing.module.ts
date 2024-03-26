import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrdersComponent } from './components/orders/orders.component';
import { InfoPagesDisplayComponent } from './components/info-pages-display/info-pages-display.component';
import { CanActivate } from '../../guards/authguard.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'product', component: ProductComponent },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate:[CanActivate]
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate:[CanActivate]
  }, {
    path: 'infoPage',
    component: InfoPagesDisplayComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class userRoutingModule {}
