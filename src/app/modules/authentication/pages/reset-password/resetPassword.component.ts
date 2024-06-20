import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";

@Component({
    selector : "auth-resetPassword-body",
    templateUrl : "./resetPassword.component.html",
    styleUrls : ["./resetPassword.component.css"]
})
export class ResetPasswordBody {
    backgroundImage = 'assets/images/auth_bgimage_book_lap.jpg'

    // Creating form and validating input fields
    resetPassForm: FormGroup
    constructor(private fb: FormBuilder){
        this.resetPassForm = this.fb.group({
            password: ["", Validators.compose([Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8}$/)])],
            confirmPassword: ["", Validators.required, this.passwordMatchValidator()]
        })
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
            this.passwordErrorPattern = this.resetPassForm.get('password')?.hasError('pattern')
            if(this.passwordErrorPattern){
                const providedPassword = target.value
                this.checkPassword(providedPassword)
            }
        }

        setTimeout(()=>{
            this.passwordError = false
            this.passwordTouched = false
            this.passwordErrorPattern = false
        }, 3000)
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

    // Validating Confirm password input
    confirmPassError: boolean = false
    confirmPassTouched: boolean = false
    confirmPassPattern: boolean = false

    onConfirmPasswordChange(event: Event){
        const target = event.target as HTMLInputElement
        this.confirmPassTouched = true
        this.confirmPassError = target.value ? false : true

        const password = this.resetPassForm?.get("password")?.value
        const confirmPassword = this.resetPassForm?.get("confirmPassword")?.value
        if(password !== confirmPassword){
            this.confirmPassPattern = true
        }

        setTimeout(()=>{
            this.confirmPassError = false
            this.confirmPassTouched = false
            this.confirmPassPattern = false
        }, 3000)
    }

    // Function for checking is Confirm password is equal to Password
    passwordMatchValidator(): ValidationErrors | null {
        const password = this.resetPassForm?.get("password")?.value
        const confirmPassword = this.resetPassForm?.get("confirmPassword")?.value
        if(password !== confirmPassword){
            return {"passwordMismatch" : true}
        }
        return null
    }
}