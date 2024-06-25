import { Component, Input } from "@angular/core";

@Component({
    selector : "auth-submit-button-component",
    templateUrl : "./auth-submitButton.component.html"
})
export class AuthSubmitButtonComponent {
    @Input() submitButtonText: string = ""
    @Input() notValid: boolean = false
    
    ngOnChange(){
        this.notValid = this.notValid
    }

}