import { Component } from "@angular/core";

@Component({
    selector : "admin-students-body",
    templateUrl : "students.component.html",
    styleUrls : ["./student.component.css"]
})
export class AdminStudentsPage {
    onPageChange(event: any){}
    first: number = 1
    rows: number = 2
    totalRecords: string = ""
    rowsPerPageOptions: number[] = []

    showPopup: boolean = false
    togglePopup(){
        this.showPopup = !this.showPopup
    }
}