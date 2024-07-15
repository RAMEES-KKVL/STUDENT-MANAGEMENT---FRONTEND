import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector : "admin-sidebar-component",
    templateUrl : "./adminSidebar.component.html"
}) 
export class AdminSidebarComponent {

    constructor(private router: Router){}
  
    sidebarList: sidebarItem[] = [
        {
            listName :  "Admins",
            url : "admins",
            icon : "fa-solid fa-user"
        },
        {
            listName :  "Batches",
            url : "batches",
            icon : "fa-solid fa-clipboard"
        },
        {
            listName :  "Courses",
            url : "courses",
            icon : "fa-solid fa-graduation-cap"
        },
        {
            listName :  "Students",
            url : "students",
            icon : "fa-solid fa-person"
        },
        {
            listName :  "Requests",
            url : "",
            icon : "fa-solid fa-bell"
        },
    ]
    showMenu: boolean = false

    routeNavigator(url: string){
        this.router.navigate([`/admin/${url}`])
    }
}

interface sidebarItem {
    listName : string,
    url : string,
    icon : string
}