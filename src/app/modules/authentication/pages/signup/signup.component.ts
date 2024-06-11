import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";

@Component({
    selector : "auth-signup-body",
    templateUrl : "./signup.component.html",
    styleUrls : ["./signup.component.css"]
})
export class SignupBody {
    backgroundImage = 'assets/images/auth_bgimage_book_lap.jpg'

    // Creating form and validating input fields
    errorMessage:string = ""
    signupForm: FormGroup
    constructor(private fb: FormBuilder){
        this.signupForm = this.fb.group({
            fullName: ["", Validators.required],
            email: ["", [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
            phone: ["", Validators.compose([Validators.required, Validators.pattern(/^\d{10}$/)])],
            password: ["", Validators.compose([Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8}$/)])],
            confirmPassword: ["", Validators.required, this.passwordMatchValidator()]
        })
    }

    // Validating Name input  
    fullNameError: boolean = false
    fullNameTouched: boolean = false
    showError: boolean = true
   
    onFullNameChange(event: any){
        this.fullNameTouched = true
        this.fullNameError = !this.signupForm.get('fullName')?.valid
        setTimeout(() => {
            this.fullNameTouched = false
            this.fullNameError = false
        }, 3000);
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
            this.emailErrorPattern = this.signupForm.get('email')?.hasError('pattern')        
        }
        
        setTimeout(() => {
            this.emailTouched = false
            this.emailError = false
            this.emailErrorPattern = false
        }, 3000);
    }

    // Validating Phone number input 
    phoneError: boolean = false
    phoneTouched: boolean = false
    phoneErrorPattern: boolean | undefined = false

    onPhoneChange(event: Event){
        const target = event.target as HTMLInputElement
        this.phoneTouched = true
        this.phoneError = target.value ? false : true

        if(target.value){
            this.phoneErrorPattern = this.signupForm.get('phone')?.hasError('pattern')
        }

        setTimeout(()=>{
            this.phoneError = false
            this.phoneTouched = false
            this.phoneErrorPattern = false
        }, 3000)
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
            this.passwordErrorPattern = this.signupForm.get('password')?.hasError('pattern')
        }

        setTimeout(()=>{
            this.passwordError = false
            this.passwordTouched = false
            this.passwordErrorPattern = false
        }, 3000)
    }

    // Validating Confirm password input
    confirmPassError: boolean = false
    confirmPassTouched: boolean = false
    confirmPassPattern: boolean = false

    onConfirmPasswordChange(event: Event){
        const target = event.target as HTMLInputElement
        this.confirmPassTouched = true
        this.confirmPassError = target.value ? false : true

        const password = this.signupForm?.get("password")?.value
        const confirmPassword = this.signupForm?.get("confirmPassword")?.value
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
        const password = this.signupForm?.get("password")?.value
        const confirmPassword = this.signupForm?.get("confirmPassword")?.value
        if(password !== confirmPassword){
            return {"passwordMismatch" : true}
        }
        return null
    }

    // Handling form submission 
    onSubmit(){
        
    }
}