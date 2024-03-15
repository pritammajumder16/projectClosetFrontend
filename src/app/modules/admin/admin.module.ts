import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminhomeComponent } from './components/adminhome/adminhome.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { materialModule } from '../../materials.module';



@NgModule({
  declarations: [
    AdminhomeComponent,
    CategoryComponent,
    ProductsListComponent
  ],
  imports: [
    CommonModule,materialModule
  ]
})
export class AdminModule { }
