import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialModule } from '../../materials.module';
import { HomeComponent } from './components/home/home.component';
import { userRoutingModule } from './user-routing.module';
import { SideFilterComponent } from './components/side-filter/side-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterDrawersComponent } from './components/filter-drawers/filter-drawers.component';
import { ProductComponent } from './components/product/product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrdersComponent } from './components/orders/orders.component';
import { InfoPagesDisplayComponent } from './components/info-pages-display/info-pages-display.component';
import { ReviewDialogComponent } from './components/review-dialog/review-dialog.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpLoaderFactory } from '../../app.module';

@NgModule({
  declarations: [
    HomeComponent,
    SideFilterComponent,
    FilterDrawersComponent,
    ProductComponent,
    CheckoutComponent,
    OrdersComponent,
    InfoPagesDisplayComponent,
    ReviewDialogComponent,
  ],
  imports: [
    CommonModule,
    materialModule,
    userRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild({loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
  },defaultLanguage:"en"})
  ],
})
export class UserModule {}
