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
        return this.http.post(`${Environment.url}/admin/add-course_topics`, data)
    }

    deleteCourse(courseName: string){
        return this.http.delete(`${Environment.url}/admin/delete-course?courseName=${courseName}`)
    }

    getBatches(){
        return this.http.get(`${Environment.url}/admin/batches`)
    }

    addBatch(data: object){
        return this.http.post(`${Environment.url}/admin/add-batch`, data)
    }

    editBatch(data: object, batchId: string){
        return this.http.patch(`${Environment.url}/admin/edit-batch?batchId=${batchId}`, data)
    }

    deleteBatch(batchName: string){
        return this.http.delete(`${Environment.url}/admin/delete-batch?batchName=${batchName}`)
    }

    getStudents(){
        return this.http.get(`${Environment.url}/admin/students`)
    }

    addStudent(data: object){
        return this.http.post(`${Environment.url}/admin/add-student`, data)
    }
}