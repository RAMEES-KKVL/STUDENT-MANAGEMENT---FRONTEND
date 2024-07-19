import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminStudentsPage } from "./pages/students/student.component";
import { AdminSidebarComponent } from "./components/admin-sidebar/adminSidebar.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule, DatePipe } from "@angular/common";
import { AdminHeaderComponent } from "./components/admin-header/adminHeader.component";
import { AdminPages } from "./pages/admin-pages/adminPages.component";
import { PaginatorModule } from 'primeng/paginator';
import { MatInputModule } from "@angular/material/input";
import { PaginationComponent } from "./components/pagination/pagination.component";
import { AdminCoursePage } from "./pages/courses/courses.component";
import { AdminAddCoursePage } from "./pages/add-course/adminAddCourse.component";
import { AdminBatchPage } from "./pages/batches/batches.component";
import { AdminsPageBody } from "./pages/admins/admins.component";

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
                component : AdminCoursePage,
            },
            {
                path : "add-course",
                component : AdminAddCoursePage
            },
            {
                path : "batches",
                component : AdminBatchPage
            },
            {
                path : "admins",
                component : AdminsPageBody
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
        AdminCoursePage,
        AdminAddCoursePage,
        AdminBatchPage,
        AdminsPageBody
    ],
    imports: [
        RouterModule.forChild(routes),
        FormsModule,
        CommonModule,
        PaginatorModule,
        MatInputModule,
        ReactiveFormsModule,
    ],
    exports: [
        AdminSidebarComponent
    ],
    providers: [
        DatePipe
    ]
})
export class AdminModules {}
