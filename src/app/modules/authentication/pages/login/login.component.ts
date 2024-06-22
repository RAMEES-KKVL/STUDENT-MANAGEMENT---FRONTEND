import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Component({
    selector : "auth-login-body",
    templateUrl : "./login.component.html",
    styleUrls : ["./login.component.css"]
})
export class LoginBody {
    backgroundImage = 'assets/images/auth_bgimage_book_lap.jpg'

    // Creating form and validating input fields
    loginForm: FormGroup
    constructor( private fb: FormBuilder, private userService: UserService, private route: Router ){
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
    regexError: string = ""

    onPasswordChange(event: Event){
        const target = event.target as HTMLInputElement
        this.passwordTouched = true
        this.passwordError = target.value ? false : true

        if(target.value){
            this.passwordErrorPattern = this.loginForm.get('password')?.hasError('pattern')
            if(this.passwordErrorPattern){
                const providedPassword = target.value
                this.checkPassword(providedPassword)
            }
        }

        setTimeout(() => {
            this.passwordError = false
            this.passwordTouched = false
            this.passwordErrorPattern = false
        }, 3000);
    }

    // Validates password against complexity requirements 
    checkPassword(password: string){
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8}$/
        if (!regex.test(password)) {
            // Check for missing lowercase letter
            if (!/[a-z]/.test(password)) {
              this.regexError = "Password must contain at least one lowercase letter (a-z)."
              return
            }
            // Check for missing uppercase letter
            if (!/[A-Z]/.test(password)) {
              this.regexError = "Password must contain at least one uppercase letter (A-Z)."
              return
            }
            // Check for missing digit
            if (!/\d/.test(password)) {
              this.regexError = "Password must contain at least one digit (0-9)."
              return
            }
            // Check for insufficient length
            if (password.length < 8) {
              this.regexError = "Password must be at least 8 characters long."
              return
            }
        }
    }

    // Handling login form submission
    datas: any
    errorMessage: string = ""
    onSubmit(){
        this.datas = this.loginForm.value

        this.userService.login(this.datas).subscribe({

            // Handling backend responses 
            next: (response: object | any )=>{
                // Handling success responses 
                if ( response.success ) {
                    if ( response.user ){
                        localStorage.setItem("token", response.token)
                        this.route.navigate(["/"])
                    } else if ( response.notVerified ) {
                        this.route.navigate(["/auth/otp-verification"])
                    }
                }
            },
            error: ( response: object | any )=>{
                // Handling error responses 
                if ( !response.success ){
                    this.errorMessage = response.error.message
                    setTimeout(()=>{
                        this.errorMessage = ""
                    }, 3000)
                }
            }
        })
    }
}