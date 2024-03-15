import { Injectable } from '@angular/core';
import { BackendServiceService } from './backend-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private _backendService: BackendServiceService) {}
  private token: string | null = null;
  private userName: string | null = null;
  private email: string | null = null;
  private timer: any;
  setUserData(data: { [key: string]: any }) {
    this.token = data['authToken'];
    this.userName = data['userName'];
    this.email = data['email'];
    sessionStorage.setItem('token', this.token || '');
    sessionStorage.setItem('userName', this.userName || '');
    sessionStorage.setItem('email', this.email || '');
    sessionStorage.setItem(
      'timerExpiry',
      (new Date().getTime() + 7.2e7).toString() //20 hours validity initially
    );
    this.timerAuthenticate();
    console.log(this.token, this.userName, this.email);
  }
  timerAuthenticate() {
    this.token = sessionStorage.getItem('token');
    this.userName = sessionStorage.getItem('userName');
    this.email = sessionStorage.getItem('email');
    const timerExpiry = parseInt(sessionStorage.getItem('timerExpiry') || '0');
    const timerValidity = timerExpiry - new Date().getTime();
    if (timerValidity > 0) {
      this.timer = setTimeout(() => {
        this.logout();
      }, timerValidity);
    } else {
      this.silentLoginReAquireTokens();
    }
  }
  silentLoginReAquireTokens() {
    if (this.userName && this.email) {
      this._backendService
        .makeGetApiCall('auth/silentLogin', {
          userName: this.userName,
          email: this.email,
        })
        .subscribe((res: { [key: string]: any }) => {
          console.log(res);
          if (res['success'] == true) {
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
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
  getData() {
    return { token: this.token, userName: this.userName, email: this.email };
  }
}
