import { Component } from '@angular/core';
import { AuthServiceService } from './services/auth-service.service';
import { Spinkit } from 'ng-http-loader';
import { Editor } from 'ngx-editor';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public spinkit = Spinkit;
  title = 'projectClosetFrontend';
  constructor(private _authService:AuthServiceService,translate: TranslateService){
   // this language will be used as a fallback when a translation isn't found in the current language
   translate.setDefaultLang('en');

   // the lang to use, if the lang isn't available, it will use the current loader to get them
  translate.use('en');
  }


  ngOnInit(): void {
    this._authService.timerAuthenticate()
  }

}
