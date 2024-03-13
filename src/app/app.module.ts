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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,NavbarBottomComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,materialModule,HttpClientModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
