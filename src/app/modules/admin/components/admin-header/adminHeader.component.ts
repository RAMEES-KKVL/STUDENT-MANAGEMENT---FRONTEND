import { Component } from "@angular/core";

@Component({
    selector : "admin-header-component",
    templateUrl : "./adminHeader.component.html"
})
export class AdminHeaderComponent {
    showMenu: boolean = false

    sidebarList: sidebarItem[] = [
        {
            listName :  "Admins",
            icon : "fa-solid fa-user"
        },
        {
            listName :  "Batches",
            icon : "fa-solid fa-clipboard"
        },
        {
            listName :  "Courses",
            icon : "fa-solid fa-graduation-cap"
        },
        {
            listName :  "Students",
            icon : "fa-solid fa-person"
        },
        {
            listName :  "Requests",
            icon : "fa-solid fa-bell"
        },
    ]

    showMenubar(){
        this.showMenu = !this.showMenu
    }
}

interface sidebarItem {
    listName : string,
    icon : string
}