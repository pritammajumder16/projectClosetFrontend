import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { BackendServiceService } from '../../services/backend-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  public userForm:FormGroup;
  constructor(private _backendService:BackendServiceService){
    this.userForm = new FormGroup({
      userName: new FormControl("",Validators.required),
      email: new FormControl("", Validators.required),
      gender : new FormControl("", Validators.required),
      phoneNumber : new FormControl("", Validators.required),
       dateOfBirth : new FormControl("", Validators.required),
       password : new FormControl("", Validators.required),
       confirmPassword : new FormControl("", Validators.required),
    })
  }
  onSubmit(event:SubmitEvent){
    if(this.userForm.invalid)return;
    const data = {...this.userForm.value};
    data.dateOfBirth = data.dateOfBirth.getTime()
    this._backendService.makePostApiCall("auth/signup",data).subscribe(res=>console.log(res))

  }
  ngOnInit(): void {
    
  }
}
