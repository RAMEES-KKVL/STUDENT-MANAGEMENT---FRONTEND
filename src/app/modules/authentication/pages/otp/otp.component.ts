import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from "@angular/core";

@Component({
    selector : "auth-otp-body",
    templateUrl : "./otp.component.html",
    styleUrls : ["./otp.component.css"]
})
export class OtpBody implements AfterViewInit {
    backgroundImage = 'assets/images/auth_bgimage_book_lap.jpg'

    preventEvent: boolean = false

    otpInput1: any = ""
    otpInput2: any = ""
    otpInput3: any = ""
    otpInput4: any = ""

    @ViewChild("otpInput1Ref") otpInput1Ref!: ElementRef;
    @ViewChild("otpInput2Ref") otpInput2Ref!: ElementRef;
    @ViewChild("otpInput3Ref") otpInput3Ref!: ElementRef;
    @ViewChild("otpInput4Ref") otpInput4Ref!: ElementRef;

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
}
                






