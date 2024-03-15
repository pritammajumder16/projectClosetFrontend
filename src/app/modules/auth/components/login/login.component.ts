import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BackendServiceService } from '../../../../services/backend-service.service';
import { AuthServiceService } from '../../../../services/auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../../common/error-dialog/error-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private _backendService:BackendServiceService,private _authService:AuthServiceService, private _matDialog: MatDialog, private _router:Router){}
  onSubmit(form:NgForm){
    if(form.invalid) return;
    this._backendService.makeGetApiCall("auth/login",form.value).subscribe((res:{[key:string]:any})=>{
      console.log(res)
      if(res['success']==true){
        this._authService.setUserData(res['data'])
        this._router.navigate(["/"])
      }else{
        if(res['data'].hasOwnProperty("email")){
          this._matDialog.open(ErrorDialogComponent,{data:{message:"Email is incorrect"}})
        }else{
          this._matDialog.open(ErrorDialogComponent,{data:{message:"Password is incorrect"}})
        }
      }
    })
  }
}
