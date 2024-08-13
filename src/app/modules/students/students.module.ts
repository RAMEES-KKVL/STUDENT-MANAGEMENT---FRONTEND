import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StudentPages } from "./pages/student-pages/studentPages.component";
import { CommonModule } from "@angular/common";
import { StudentHeaderComponent } from "./components/header/header.component";
import { MenuPage } from "./pages/menu-page/menuPage.component";
import { CalendarComponent } from "./components/calendar/calendar.component";
import { StudentAttendancePage } from "./pages/attendance/attendance.component";

const routes: Routes = [
    {
        path : "",
        component : StudentPages,
        children : [
            {
                path : "attendance",
                component : StudentAttendancePage
            }
        ]
    }
]
@NgModule({
    declarations: [
        StudentPages,
        StudentHeaderComponent,
        MenuPage,
        StudentAttendancePage,
        CalendarComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule
    ]
})
export class StudentsModules {}