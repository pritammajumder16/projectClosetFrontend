import { Component } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  public userName: string | undefined;
  public isAuthenticated: Boolean | undefined;
  private subscription: Subscription | undefined;
  constructor(private _authService: AuthServiceService) {}
  ngOnInit() {
    this.authenticator()
  }
  public authenticator(){
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
  logout(){
    this._authService.logout()
  }
  ngOnDestroy(){
    this.subscription?.unsubscribe()
  }
}
