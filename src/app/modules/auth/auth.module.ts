import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { materialModule } from '../../materials.module';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,materialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AuthModule {}
