import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { AdminService } from "src/app/services/admin.service";

@Component({
    selector : "admin-sidebar-component",
    templateUrl : "./adminSidebar.component.html"
}) 
export class AdminSidebarComponent implements OnInit {

    constructor(private router: Router, private adiminServices: AdminService){}
    profileImage: string = "/assets/images/blank-profile-picture.webp"
    adminName: string = ""
  
    permissions: any
    
    sidebarList!: sidebarItem[]

    permittedArray!: sidebarItem[]
    @Output() permittedList = new EventEmitter<any>()
    showMenu: boolean = false

    sendingData(data: any){
        this.permittedList.emit(data)
    }
    ngOnInit(): void {
        this.adiminServices.getAdminInfo().subscribe({
            next: ( response : any ) => {
                if ( response.success ) {
                    this.adminName = response.adminName
                    this.profileImage = response.adminImg
                    this.permissions = response.admin
                    
                    this.sidebarList = [
                        {
                            listName :  "Admins",
                            url : "admins",
                            icon : "fa-solid fa-user",
                            show : this.permissions.Admin.View,
                            add : this.permissions.Admin.Add,
                            edit : this.permissions.Admin.Edit,
                            delete : this.permissions.Admin.Delete,
                            // show : false
                        },
                        {
                            listName :  "Batches",
                            url : "batches",
                            icon : "fa-solid fa-clipboard",
                            show : this.permissions.Batch.View,
                            add : this.permissions.Admin.Add,
                            edit : this.permissions.Admin.Edit,
                            delete : this.permissions.Admin.Delete,
                        },
                        {
                            listName :  "Courses",
                            url : "courses",
                            icon : "fa-solid fa-graduation-cap",
                            show : this.permissions.Course.View,
                            add : this.permissions.Admin.Add,
                            edit : this.permissions.Admin.Edit,
                            delete : this.permissions.Admin.Delete,
                        },
                        {
                            listName :  "Students",
                            url : "students",
                            icon : "fa-solid fa-person",
                            show : this.permissions.Students.View,
                            add : this.permissions.Admin.Add,
                            edit : this.permissions.Admin.Edit,
                            delete : this.permissions.Admin.Delete,
                        },
                        {
                            listName :  "Requests",
                            url : "",
                            icon : "fa-solid fa-bell",
                            show : true,
                            add : this.permissions.Admin.Add,
                            edit : this.permissions.Admin.Edit,
                            delete : this.permissions.Admin.Delete,
                        },
                    ]

                    this.permittedArray = this.sidebarList.filter( list => list.show )
                    this.sendingData(this.permittedArray)
                }
            },
            error: () => {}
        })
    }

    routeNavigator(url: string){
        this.router.navigate([`/admin/${url}`])
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
  