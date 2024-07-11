import { Component } from "@angular/core";

@Component({
    selector : "admin-students-body",
    templateUrl : "students.component.html",
    styleUrls : ["./student.component.css"]
})
export class AdminStudentsPage {

    showPopup: boolean = false
    togglePopup(){
        this.showPopup = !this.showPopup
    }
}