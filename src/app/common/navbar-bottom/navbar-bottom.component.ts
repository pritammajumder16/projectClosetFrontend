import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar-bottom',
  templateUrl: './navbar-bottom.component.html',
  styleUrl: './navbar-bottom.component.scss',
})
export class NavbarBottomComponent {
  public userName: string | undefined;
  public isAuthenticated: boolean | undefined;
  private subscription: Subscription | undefined;
  constructor(private _authService: AuthServiceService) {}
  ngOnInit() {
    this.authenticator();
  }
  public authenticator() {
    const isAuth = this._authService.getIsAuthenticated();
    if (isAuth) {
      this.isAuthenticated = isAuth;
      this.userName = this._authService.getData().userName;
    }
    this.subscription = this._authService.isAuthenticatedSubject.subscribe(
      (isAuth) => {
        this.isAuthenticated = isAuth;
        this.userName = this._authService.getData().userName;
      }
    );
  }
  logout() {
    this._authService.logout();
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
