import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Component({
    selector : "auth-forgetPassword-body",
    templateUrl : "./forgetPassword.component.html",
    styleUrls : ["./forgetPassword.component.css"]
})
export class ForgetPasswordBody {
    backgroundImage = 'assets/images/auth_bgimage_book_lap.jpg'

    forgetPassForm: FormGroup
    // Creating form and validating input fields
    constructor( private fb: FormBuilder, private userService: UserService, private route: Router ){
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

    datas: any
    errorMessage: string = ""
    onSubmit(){
        this.datas = this.forgetPassForm.value

        this.userService.forgetPass(this.datas).subscribe({
            // Handling backend responses
            next: ( response: object | any )=>{
                // Handling success responses
                if ( response.success ) {
                    this.route.navigate(["/auth/reset_password"])
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