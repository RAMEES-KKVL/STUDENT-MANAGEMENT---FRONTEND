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
import { AdminLoginPage } from "./pages/admin-login/adminLogin.component";
import { AdminAuthGuard } from "src/app/services/adminAuthGuard.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthGuard } from "src/app/services/auth.guard.service";

const routes: Routes = [
    {
        path : "login",
        component : AdminLoginPage
    },
    {
        path : "",
        component : AdminPages,
        canActivate: [AdminAuthGuard],
        children : [
            {
                path : "students",
                component : AdminStudentsPage,
                data : { permission: ["View"] }
            },
            {
                path : "courses",
                component : AdminCoursePage,
                data : { permission: ["View"] }
            },
            {
                path : "add-course",
                component : AdminAddCoursePage,
                data : { permission: ["View"] }
            },
            {
                path : "batches",
                component : AdminBatchPage,
                data : { permission: ["View"] }
            },
            {
                path : "admins",
                component : AdminsPageBody,
                data : { permission: ["View"] }
            }
        ]
    },
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
        AdminsPageBody,
        AdminLoginPage
    ],
    imports: [
        RouterModule.forChild(routes),
        FormsModule,
        CommonModule,
        PaginatorModule,
        MatInputModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    exports: [
        AdminSidebarComponent
    ],
    providers: [
        DatePipe,
    ]
})
export class AdminModules {}
