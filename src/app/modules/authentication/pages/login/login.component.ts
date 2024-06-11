import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector : "auth-login-body",
    templateUrl : "./login.component.html",
    styleUrls : ["./login.component.css"]
})
export class LoginBody {
    backgroundImage = 'assets/images/auth_bgimage_book_lap.jpg'

    // Creating form and validating input fields
    loginForm: FormGroup
    constructor(private fb: FormBuilder){
        this.loginForm = this.fb.group({
            email: ["", Validators.compose([Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)])],
                password: ["", Validators.compose([Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8}$/)])]
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
            this.emailErrorPattern = 
            this.loginForm.get('email')?.hasError('pattern')
        }

        setTimeout(() => {
            this.emailTouched = false
            this.emailError = false
            this.emailErrorPattern = false
        }, 3000);
    }

    // Validating Password input 
    passwordError: boolean = false
    passwordTouched: boolean = false
    passwordErrorPattern: boolean | undefined = false

    onPasswordChange(event: Event){
        const target = event.target as HTMLInputElement
        this.passwordTouched = true
        this.passwordError = target.value ? false : true

        if(target.value){
            this.passwordErrorPattern = this.loginForm.get('password')?.hasError('pattern')
        }

        setTimeout(() => {
            this.passwordError = false
            this.passwordTouched = false
            this.passwordErrorPattern = false
        }, 3000);
    }
}