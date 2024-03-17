import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminhomeComponent } from './components/adminhome/adminhome.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryCreateComponent } from './components/category-create/category-create.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';

const routes: Routes = [
  {
    path: 'home',
    component: AdminhomeComponent,
  },
  {
    path: 'categories',
    component: CategoryComponent,
  },
  {
    path: "productList",component:ProductsListComponent
  },
  {
    path:"productCreate",component:ProductCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class adminRoutingModule {}
