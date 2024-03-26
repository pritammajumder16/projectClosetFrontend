import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { FooterComponent } from './common/footer/footer.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { materialModule } from './materials.module';
import { NavbarBottomComponent } from './common/navbar-bottom/navbar-bottom.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { SideNavComponent } from './common/side-nav/side-nav.component';
import { ErrorDialogComponent } from './common/error-dialog/error-dialog.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { SuccessDialogComponent } from './common/success-dialog/success-dialog.component';
import { bearerInterceptor } from './interceptors/bearerInterceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    NavbarComponent,
    FooterComponent,
    NavbarBottomComponent,
    ErrorDialogComponent,
    SuccessDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    materialModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot(),
    TranslateModule.forRoot({loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
  },defaultLanguage:"en"})
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: bearerInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
