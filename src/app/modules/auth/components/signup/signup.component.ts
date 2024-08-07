import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendServiceService } from '../../../../services/backend-service.service';
import { passwordMatchValidation } from '../../../../customValidators/passwordMatchValidation';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../../../common/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../../../common/error-dialog/error-dialog.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  public userForm: FormGroup;
  constructor(
    private _backendService: BackendServiceService,
    private _router: Router,
    private dialog: MatDialog
  ) {
    this.userForm = new FormGroup(
      {
        userName: new FormControl('', Validators.required),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ]),
        gender: new FormControl(''),
        dateOfBirth: new FormControl(''),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl('', Validators.required),
      },
      { validators: passwordMatchValidation }
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSubmit(_event: SubmitEvent) {
    if (this.userForm.invalid) return;
    const data = { ...this.userForm.value };
    data.dateOfBirth = data.dateOfBirth.getTime();
    this._backendService
      .makePostApiCall('auth/signup', data)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .subscribe((res: any) => {
        if (res['success'] == true) {
          this.dialog.open(SuccessDialogComponent, {
            data: { message: 'Account Created Successfully' },
          });
          this._router.navigate(['/auth/login']);
        } else if (
          Object.prototype.hasOwnProperty.call(res.data, 'emailExists')
        ) {
          this.dialog.open(ErrorDialogComponent, {
            data: { message: 'Email already Exists' },
          });
        }
      });
  }
}
