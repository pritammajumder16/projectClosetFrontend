import { Injectable } from '@angular/core';
import { BackendServiceService } from './backend-service.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../common/success-dialog/success-dialog.component';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(
    private _backendService: BackendServiceService,
    private _dialog: MatDialog,
    private _router: Router
  ) {}
  private token: string | undefined;
  private userName: string | undefined;
  private email: string | undefined;
  private timer: any;
  private isAuthenticated: boolean = false;
  public isAuthenticatedSubject: Subject<boolean> = new Subject<boolean>();
  private roleId: number | undefined;
  private roleName: number | undefined;
  setUserData(data: { [key: string]: any }) {
    console.log("set user data")
    sessionStorage.setItem('token', data['authToken'] || '');
    sessionStorage.setItem('userName', data['userName'] || '');
    sessionStorage.setItem('email', data['email'] || '');
    sessionStorage.setItem(
      'timerExpiry',
      (new Date().getTime() + 7.2e7).toString() //20 hours validity initially
    );
    this.timerAuthenticate();
  }
  getIsAuthenticated() {
    return this.isAuthenticated;
  }
  timerAuthenticate() {
    this.token = sessionStorage.getItem('token') || undefined;
    this.userName = sessionStorage.getItem('userName') || undefined;
    this.email = sessionStorage.getItem('email') || undefined;
    console.log(this.token,this.userName,this.email)
    const timerExpiry = parseInt(sessionStorage.getItem('timerExpiry') || '0');
    const timerValidity = timerExpiry - new Date().getTime();
    if (timerValidity > 0) {
      this.timer = setTimeout(() => {
        this.logout();
      }, timerValidity);
    } else {
      this.silentLoginReAquireTokens();
    }
    if (this.email) {
      this._backendService.makeGetApiCall('auth/rolematrix', {
        email: this.email,
      }).subscribe((res:any)=>{
        if(res.success==true){
          this.roleId=res.data.roleId;
          this.roleName=res.data.roleName;
          this.isAuthenticated = true;
          this.isAuthenticatedSubject.next(this.isAuthenticated);
        }
      });
    }
  }
  silentLoginReAquireTokens() {
    console.log('Silent Login triggered', this.getData());
    if (this.userName && this.email) {
      this._backendService
        .makeGetApiCall('auth/silentLogin', {
          userName: this.userName,
          email: this.email,
        })
        .subscribe((res: { [key: string]: any }) => {
          if (res['success'] == true) {
            console.log('Silent Login res', res);
            this.setUserData(res['data']);
          }
        });
    }
  }
  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('email');
    this.token = '';
    this.email = '';
    this.userName = '';
    this.isAuthenticated = false;
    this.isAuthenticatedSubject.next(this.isAuthenticated);
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this._dialog.open(SuccessDialogComponent, {
      data: { message: 'Logout Successful' },
    });
    this._router.navigate(['auth/login']);
  }
  getData() {
    return { token: this.token, userName: this.userName, email: this.email, roleId:this.roleId,roleName:this.roleName };
  }
}
