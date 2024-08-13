import { Component, Input } from "@angular/core";
import { courseInterface } from "src/app/models/course.interface";

@Component({
    selector : "app-course-component",
    templateUrl : "./courses.component.html" 
})
export class CourseComponent {
    @Input() courseList!: Array<courseInterface>
}