import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector : "auth-forgetPassword-body",
    templateUrl : "./forgetPassword.component.html",
    styleUrls : ["./forgetPassword.component.css"]
})
export class ForgetPasswordBody {
    backgroundImage = 'assets/images/auth_bgimage_book_lap.jpg'

    // Creating form and validating input fields
    forgetPassForm: FormGroup
    constructor(private fb: FormBuilder){
        this.forgetPassForm = this.fb.group({
            email: ["", [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
        })
    }

    // Validating Email input 
    emailError: boolean = false
    emailTouched: boolean = false
    emailErrorPattern: boolean | undefined = false

    onEmailChange(event: Event){
        const target = event.target as HTMLInputElement
        this.emailTouched = true
        this.emailError = target.value ? false : true
        
        if(target.value){            
            this.emailErrorPattern = this.forgetPassForm.get('email')?.hasError('pattern')        
        }
        
        setTimeout(() => {
            this.emailTouched = false
            this.emailError = false
            this.emailErrorPattern = false
        }, 3000);
    }
}