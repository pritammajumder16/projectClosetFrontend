import { Component } from '@angular/core';
import { AuthServiceService } from './services/auth-service.service';
import { Spinkit } from 'ng-http-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public spinkit = Spinkit;
  title = 'projectClosetFrontend';
  constructor(private _authService:AuthServiceService){

  }
  ngOnInit(){
    this._authService.timerAuthenticate()
  }
}
