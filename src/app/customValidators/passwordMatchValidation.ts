import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordMatchValidation:ValidatorFn = (control:AbstractControl):ValidationErrors|null=>{
    const password = control.get("password")
    const confirmPassword = control.get("confirmPassword")
    if(password?.value!=confirmPassword?.value){
        control.setErrors({"mismatch":"invalid match"})
        return {"mismatch":"Invalid match"}
    }
    return null
}
