import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AdminService } from "src/app/services/admin.service";

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