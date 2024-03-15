import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { FooterComponent } from './common/footer/footer.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { materialModule } from './materials.module';
import { NavbarBottomComponent } from './common/navbar-bottom/navbar-bottom.component';
import { HttpClientModule } from '@angular/common/http';
import { SideNavComponent } from './common/side-nav/side-nav.component';
import { ErrorDialogComponent } from './common/error-dialog/error-dialog.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { SuccessDialogComponent } from './common/success-dialog/success-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    NavbarComponent,
    FooterComponent,NavbarBottomComponent, ErrorDialogComponent,SuccessDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,materialModule,HttpClientModule,NgHttpLoaderModule.forRoot()
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
