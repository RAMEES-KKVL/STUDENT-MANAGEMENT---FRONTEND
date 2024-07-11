import { Component } from "@angular/core";

@Component({
    selector : "admin-courses-body",
    templateUrl : "./courses.component.html"
})
export class AdminCoursePage {
    showPopup: boolean = false
    togglePopup(){
        this.showPopup = !this.showPopup
    }
}