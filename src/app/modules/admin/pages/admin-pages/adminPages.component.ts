import { Component } from "@angular/core";
import { Routes } from "@angular/router";
import { PermissionSharedService } from "src/app/services/adminPermission.service";

@Component({
    selector : "admin-pages",
    templateUrl : "./adminPages.component.html"
})
export class AdminPages {
    permittedList!: sidebarItem[]

    constructor(private permissionService: PermissionSharedService ) {}

    receiveDataFromChild(data: any) {
        this.permittedList = data    
            
        this.permissionService.sendPermission(data)
    }
}

interface sidebarItem {
    listName : string,
    url : string,
    icon : string,
    show : boolean,
    add : boolean,
    edit : boolean,
    delete : boolean,
}