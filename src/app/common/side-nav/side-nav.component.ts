import { Component } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent {
  public userName: string | undefined;
  public isAuthenticated: boolean | undefined;
  private subscription: Subscription | undefined;
  constructor(private _authService: AuthServiceService) {}
  public navItems = [
    { icon: 'shopping_cart', label: 'Project Closet', action: 'closeDrawer' },
    { icon: 'info', label: 'About Us', link: '#' },
    { icon: 'rss_feed', label: 'Blog', link: '#' },
    { icon: 'phone_in_talk', label: 'Contact Us', link: '#' },
    { icon: 'help', label: 'Help & Support', link: '#' },
    {
      icon: 'admin_panel_settings',
      label: 'Administration',
      routerLink: '/admin/home',
    },
    { icon: 'logout', label: 'Logout', action: 'logout' },
  ];
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
