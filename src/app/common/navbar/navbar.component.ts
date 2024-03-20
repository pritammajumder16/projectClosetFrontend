import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  public title:string = "Project Closet"
  constructor(private _router:Router){}
  routeToHome(){
    this._router.navigate(["/"])
  }
}
