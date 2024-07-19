import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Environment } from "../environment/environment";

@Injectable({
    providedIn : "root"
})
export class AdminService {
    constructor(private http: HttpClient){}

    getCourses(){
        return this.http.get(`${Environment.url}/admin/courses`)
    }

    getCourse(courseName: string){
        return this.http.get(`${Environment.url}/admin/added-course?courseName=${courseName}`)
    }

    addCourse(data: object){
        return this.http.post(`${Environment.url}/admin/add-course`, data)
    }

    addCourseDetails(data: Object){
        console.log(data);
        
        return this.http.post(`${Environment.url}/admin/add-course_topics`, data)
    }
}