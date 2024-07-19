import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { courseInterface } from "src/app/models/course.interface";
import { courseDurationUnit } from "src/app/models/duration";
import { AdminService } from "src/app/services/admin.service";

@Component({
    selector : "admin-courses-body",
    templateUrl : "./courses.component.html"
})
export class AdminCoursePage implements OnInit {
    courseCreationForm: FormGroup;

    // Define available duration units
    durationUnits: courseDurationUnit[] = [
        { value: 'Weeks', label: 'Weeks' },
        { value: 'Months', label: 'Months' },
    ];

    constructor(private fb: FormBuilder, private adminService: AdminService, private datePipe: DatePipe, private route: Router){
        this.courseCreationForm = this.fb.group({
            courseName: ["", Validators.required],
            description: ["", Validators.required],
            duration: ['', [Validators.required, Validators.min(1)]],
            durationUnit: ['', Validators.required],
        });
    }

    courseList: any[] = []
    ngOnInit(): void {
        this.adminService.getCourses().subscribe({
            // Handling backend responses 
            next: ( response: any )=>{
                // Handling success responses 
                if ( response.success ) {
                    this.courseList = response.courseList.map((course: courseInterface) => ({
                        ...course,
                        formattedCreatedAt: this.getFormattedDate(course.createdAt),
                        formattedUpdatedAt: this.getFormattedDate(course.updatedAt)
                    }))
                }
            },
            error: ( response: any )=>{
                // Handling error responses
                
            }
        })
    }

    getFormattedDate(timestamp: number): string | null {
        if (!timestamp) {
          return '';  // Handle cases where createdAt is missing
        } else {
            // Changing date format 
            return this.datePipe.transform(new Date(timestamp), 'dd-MMMM-yyyy');
        }
    }

    showPopup: boolean = false
    togglePopup(){
        this.showPopup = !this.showPopup
    }

    // Validating course name input field 
    nameError: boolean = false
    nameTouched: boolean = false
    onNameChange(event: Event){
        const target = event.target as HTMLInputElement
        this.nameError = target.value ? false : true
        this.nameTouched = true

        setTimeout(() => {
            this.nameError = false
            this.nameTouched = false
        }, 3000);
    }

    // Validating course description input field 
    descriptionError: boolean = false
    descriptionTouched: boolean = false
    onDescriptionChange(event: Event){
        const target = event.target as HTMLInputElement
        this.descriptionError = target.value ? false : true
        this.descriptionTouched = true

        setTimeout(() => {
            this.descriptionError = false
            this.descriptionTouched = false
        }, 3000);
    }

    // Validating course duration input field 
    durationError: boolean = false
    durationTouched: boolean = false
    onDurationChange(event: Event){
        const target = event.target as HTMLInputElement
        this.durationError = target.value ? false : true
        this.durationTouched = true

        setTimeout(() => {
            this.durationError = false
            this.durationTouched = false
        }, 3000);
    }

    showError: boolean = false
    showErrorMessage(){
        this.showError = true;
        this.durationTouched = false
        setTimeout(() => {
            this.showError = false;
        }, 3000);
    }

    // Handling course form submission
    datas: any
    errorMessage: string = ""
    onSubmit(){        
        if ( this.courseCreationForm.valid ) {
            this.datas = this.courseCreationForm.value
            
            this.adminService.addCourse(this.datas).subscribe({
                // Handling backend responses 
                next: ( response: any )=>{
                    // Handling success responses 
                    if ( response.success ) {
                        const coursename = response.courseName
                        this.route.navigate(["/admin/add-course"], { queryParams: { coursename }})
                    }
                },
                error: ( response: any )=>{
                    // Handling error responses
                    this.errorMessage = response.error.message
                    setTimeout(() => {
                        this.errorMessage = ""
                    }, 3000);
                }
            })
        } else {
            // Handling invalid form submission 
            if ( this.courseCreationForm.get("courseName")?.invalid || this.courseCreationForm.get("description")?.invalid ) {
                this.errorMessage = "Provide required data"
                setTimeout(() => {
                    this.errorMessage = ""
                }, 3000);
            } else {
                this.courseCreationForm.markAllAsTouched()
                this.showErrorMessage()
            }
        }
    }
}
