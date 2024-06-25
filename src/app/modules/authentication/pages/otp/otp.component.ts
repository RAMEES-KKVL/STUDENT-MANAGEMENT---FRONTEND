import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { EmailService } from "src/app/services/email.service";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";

@Component({
    selector : "auth-otp-body",
    templateUrl : "./otp.component.html",
    styleUrls : ["./otp.component.css"]
})
export class OtpBody implements AfterViewInit, OnInit {
    backgroundImage = 'assets/images/auth_bgimage_book_lap.jpg'

    otpForm: FormGroup
    preventEvent: boolean = false
    userEmail: string = ""
    otp: any

    otpInput1: any = ""
    otpInput2: any = ""
    otpInput3: any = ""
    otpInput4: any = ""

    @ViewChild("otpInput1Ref") otpInput1Ref!: ElementRef;
    @ViewChild("otpInput2Ref") otpInput2Ref!: ElementRef;
    @ViewChild("otpInput3Ref") otpInput3Ref!: ElementRef;
    @ViewChild("otpInput4Ref") otpInput4Ref!: ElementRef;

    constructor( private fb: FormBuilder, private userService: UserService, private route: Router, private emailService: EmailService ) {
        this.otpForm = this.fb.group({
            otp1: ["", Validators.required],
            otp2: ["", Validators.required],
            otp3: ["", Validators.required],
            otp4: ["", Validators.required],
        })
    }

    ngOnInit(): void {
        this.emailService.userEmail$.subscribe( email => {
            this.userEmail = email
        })
    }
    
    ngAfterViewInit(): void {
        if( this.otpInput1Ref ){
            // Focus the first input field when the OTP page renders
            this.otpInput1Ref.nativeElement.focus();          
        }   
    }
    
    // Handling input event
    onInput(event: Event, index: number): void {
        const target = event.target as HTMLInputElement
        
        if(target.value.length >= 1 && index < 4) {
            // Setting input name which we want to focus next
            const nextInput = (this as any)["otpInput" + (index + 1) + "Ref"].nativeElement
            if(nextInput.value){
                // Select the value of the next input if it already has a value
                nextInput.select()
            }
            // Focuses next input filed 
            nextInput.focus()
        }
        this.preventEvent = true
    }

    // Handling backspace action
    onkeyup(event: KeyboardEvent, index: number): void {
        const target = event.target as HTMLInputElement
        
        if(!this.preventEvent && event.key === "Backspace" && index > 1 && !target.value){
            const prevInput = (this as any)["otpInput" + (index - 1) + "Ref"].nativeElement
            if(prevInput.value){
                prevInput.select()
            }
            prevInput.focus()
        }
        this.preventEvent = false
    }

    // Handling input selection event
    selectInput(event: any, index: any){
        const prevInput = (this as any)["otpInput" + index + "Ref"].nativeElement;
        prevInput.select();
    }

    errorMessage: string = ""
    // Handling OTP form submission 
    onSubmit(){
        const otp1Error = this.otpForm.get('otp1')?.hasError('required')
        const otp2Error = this.otpForm.get('otp2')?.hasError('required')
        const otp3Error = this.otpForm.get('otp3')?.hasError('required')
        const otp4Error = this.otpForm.get('otp4')?.hasError('required')
                    
        // Checking all OTP fields contains value 
        if ( otp1Error ) {
            this.errorMessage = "Invalid OTP"
            setTimeout(()=>{
                this.errorMessage = ""
            }, 3000)
            return
        } else if ( otp2Error ) {
            this.errorMessage = "Invalid OTP"
            setTimeout(()=>{
                this.errorMessage = ""
            }, 3000)
            return
        } else if ( otp3Error ) {
            this.errorMessage = "Invalid OTP"
            setTimeout(()=>{
                this.errorMessage = ""
            }, 3000)
            return
        } else if ( otp4Error) {
            this.errorMessage = "Invalid OTP"
            setTimeout(()=>{
                this.errorMessage = ""
            }, 3000)
            return
        } else {
            // Checking OTP contains no spaces 
            this.otp = Object.values(this.otpForm.value).join('')
            if ( this.otp.includes(" ") ) {
                this.errorMessage = "Invalid OTP"
                setTimeout(()=>{
                    this.errorMessage = ""
                }, 3000)
                return
            } else {
                const datas = {
                    otp : this.otp,
                    email : this.userEmail 
                }
                this.userService.otp(datas).subscribe({
                    // Handling backend response 
                    next: ( response: any )=>{
                        // Handling success response 
                        if ( response.success ) {
                            Swal.fire("Registrantion completed successfully").then(()=>{
                                this.route.navigate(["/auth/login"])
                            })
                        }
                    },
                    error: ( response: any )=>{
                        // Handling error response 
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
    }
}
                





        
