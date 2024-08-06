import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  public title: string = 'Prit Closet';
  public roleId: number | undefined;
  constructor(
    private _router: Router,
    private authService: AuthServiceService
  ) {}
  ngOnInit() {
    if (this.authService.getIsAuthenticated()) {
      this.roleId = this.authService.getData().roleId;
    }
  }
  routeToHome() {
    this._router.navigate(['/']);
  }
  navigateToDetails(name: string) {
    this._router.navigate(['infoPage'], { queryParams: { name } });
  }
}
