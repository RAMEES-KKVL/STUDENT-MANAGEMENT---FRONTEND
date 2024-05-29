import { Component, Input } from "@angular/core";

@Component({
    selector : "auth-submit-button-component",
    templateUrl : "./auth-submitButton.component.html"
})
export class AuthSubmitButtonComponent {
    @Input() submitButtonText: string = ""
}