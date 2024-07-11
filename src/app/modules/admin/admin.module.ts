import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminStudentsPage } from "./pages/students/student.component";
import { AdminSidebarComponent } from "./components/admin-sidebar/adminSidebar.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AdminHeaderComponent } from "./components/admin-header/adminHeader.component";
import { AdminPages } from "./pages/admin-pages/adminPages.component";
import { PaginatorModule } from 'primeng/paginator';
import { MatInputModule } from "@angular/material/input";
import { PaginationComponent } from "./components/pagination/pagination.component";
import { AdminCoursePage } from "./pages/courses/courses.component";

const routes: Routes = [
    {
        path : "",
        component : AdminPages,
        children : [
            {
                path : "students",
                component : AdminStudentsPage
            },
            {
                path : "courses",
                component : AdminCoursePage
            }
        ]
    }
]

@NgModule({
    declarations: [
        AdminStudentsPage,
        AdminSidebarComponent,
        AdminHeaderComponent,
        AdminPages,
        PaginationComponent,
        AdminCoursePage
    ],
    imports: [
        RouterModule.forChild(routes),
        FormsModule,
        CommonModule,
        PaginatorModule,
        MatInputModule,
        ReactiveFormsModule
    ],
    exports: [
        AdminSidebarComponent
    ]
})
export class AdminModules {}