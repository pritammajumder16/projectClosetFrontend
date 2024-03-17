import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminhomeComponent } from './components/adminhome/adminhome.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { materialModule } from '../../materials.module';
import { adminRoutingModule } from './admin.routing';
import { CategoryCreateComponent } from './components/category-create/category-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { bearerInterceptor } from '../../interceptors/bearerInterceptor';
import { ProductCreateComponent } from './components/product-create/product-create.component';



@NgModule({
  declarations: [
    AdminhomeComponent,
    CategoryComponent,
    ProductsListComponent,
    CategoryCreateComponent,
    ProductCreateComponent,
  ],
  imports: [
    CommonModule,materialModule,adminRoutingModule,ReactiveFormsModule,FormsModule
  ],providers:[{
    provide: HTTP_INTERCEPTORS, useClass: bearerInterceptor, multi: true
  }]
})
export class AdminModule { }
