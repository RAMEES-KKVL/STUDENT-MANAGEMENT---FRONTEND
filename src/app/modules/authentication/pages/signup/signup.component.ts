import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Component({
    selector : "auth-signup-body",
    templateUrl : "./signup.component.html",
    styleUrls : ["./signup.component.css"]
})
export class SignupBody {
    backgroundImage = 'assets/images/auth_bgimage_book_lap.jpg'
    demoName: string = "Ramees"
    demoEmail: string = "rameesp41750@gmail.com"
    demoPhone:string = "9745701592"
    demoPassword:string = "Ramees@2"    

    // Creating form and validating input fields
    errorMessage:string = ""
    signupForm: FormGroup
    constructor(private fb: FormBuilder, private userService: UserService, private route: Router){
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
    regexError: string = ""

    onPasswordChange(event: Event){
        const target = event.target as HTMLInputElement
        this.passwordTouched = true
        this.passwordError = target.value ? false : true

        if(target.value){
            this.passwordErrorPattern = this.signupForm.get('password')?.hasError('pattern')
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

    // Handling registration form submission 
    datas: any
    onSubmit(){        
        this.datas = this.signupForm.value
        
        this.userService.signup(this.datas).subscribe({

            // Handling backend responses
            next: ( response: object | any )=>{
                // Handling success responses
                if ( response.success ) {
                    this.route.navigate(["/auth/otp-verification"])
                }
            },
            error: ( response: object | any )=>{
                // Handling error responses
                if ( !response.success ) {
                    this.errorMessage = response.error.message
                    setTimeout(()=>{
                        this.errorMessage = ""
                    }, 3000)
                }                
            }
        })
    }
}
