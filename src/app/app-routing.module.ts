import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateAdminChild } from './guards/adminAuthGuard.guard';
const routes: Routes = [
  {path:"auth", loadChildren:() => import('./modules/auth/auth.module').then(m => m.AuthModule)},
  
  {
    path:"admin", loadChildren: ()=>import("./modules/admin/admin.module").then(m=>m.AdminModule),
    canActivateChild:[canActivateAdminChild]
  },
  {
    path:"", loadChildren: ()=>import("./modules/user/user.module").then(m=>m.UserModule),
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
