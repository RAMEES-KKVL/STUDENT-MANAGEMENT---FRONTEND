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
            this.otpInput1Ref.nativeElement.focus();            
        }   
    }
    
    onInput(event: Event, index: number): void {
        const target = event.target as HTMLInputElement
        
        if(!target){

        } else {
            if (target.value.length >= 1 && index < 4) {
                const nextInput = (this as any)["otpInput" + (index + 1) + "Ref"].nativeElement
                if(nextInput.value){
                    nextInput.select()
                }
                nextInput.focus()
            }
        }
        this.preventEvent = true
    }

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

    selectInput(event: any, index: any){
        const prevInput = (this as any)["otpInput" + index + "Ref"].nativeElement;
        prevInput.select();
    }

}
                






