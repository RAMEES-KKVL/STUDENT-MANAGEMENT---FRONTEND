import { Component } from "@angular/core";

@Component({
    selector : "admin-batches-body",
    templateUrl : "./batches.component.html"
})
export class AdminBatchPage {
    showPopup: boolean = false
    togglePopup(){
        this.showPopup = !this.showPopup
    }
}