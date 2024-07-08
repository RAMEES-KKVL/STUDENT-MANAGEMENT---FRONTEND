import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminStudentsPage } from "./pages/students/student.component";
import { AdminSidebarComponent } from "./components/admin-sidebar/adminSidebar.component";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";

const routes: Routes = [
    {
        path : "students",
        component : AdminStudentsPage
    }
]

@NgModule({
    declarations: [
        AdminStudentsPage,
        AdminSidebarComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        FormsModule,
        CommonModule,
    ],
    exports: [
        AdminSidebarComponent
    ]
})
export class AdminModules {}