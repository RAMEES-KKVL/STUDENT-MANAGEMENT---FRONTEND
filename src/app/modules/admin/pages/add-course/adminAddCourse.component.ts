import { Component, ElementRef, OnInit, QueryList, ViewChildren } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { courseInterface } from "src/app/models/course.interface";
import { courseDurationUnit } from "src/app/models/duration";
import { AdminService } from "src/app/services/admin.service";
import Swal from "sweetalert2";

@Component({
    selector : "admin-add-course-page",
    templateUrl : "./adminAddCourse.component.html"
})
export class AdminAddCoursePage implements OnInit {
    constructor( private adminService:AdminService, private route: Router, private activeRouter: ActivatedRoute ){}

    // Variable to store the course name from query params
    addedCourseName: string = ""

    // Initialize the courseInfo object with default values
    courseInfo: courseInterface = {
        courseName: "",
        description: "",
        duration: 0,
        durationUnit : "",
        createdAt: 0,
        updatedAt: 0,
        topics: {}
    }
    ngOnInit(): void {
        // Subscribe to query params and fetch the course details based on the course name
        this.activeRouter.queryParams.subscribe( params => this.addedCourseName = params["coursename"])        
        this.adminService.getCourse( this.addedCourseName ).subscribe({
            // Handling backend responses 
            next: ( response: any )=>{
                // Handling success responses 
                if ( response.success ) {
                    this.courseInfo = {...response.addedCourse}                    
                    this.initializeTopicsMap()
                }
            },
            error: ( response: any )=>{
                // Handling error responses
                
            }
        })
    }

    // Define available duration units
    durationUnits: courseDurationUnit[] = [
        { value: 'Weeks', label: 'Weeks' },
        { value: 'Months', label: 'Months' },
    ];

    // Initialize the topics map based on duration labels
    initializeTopicsMap() {
        if (!this.courseInfo.topics) {
            this.courseInfo.topics = {};
        }
        const labels = this.getDurationLabels();
        labels.forEach(label => {
            if (!this.courseInfo.topics![label]) {
                this.courseInfo.topics![label] = [];
            }
        });
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

    // Validating course description input field 
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

    // Adding topic into Array
    @ViewChildren("input1") input1Refs!: QueryList<ElementRef>
    topicErrorMessage: string = ""
    newTopic: string = ""

    addTopic( event: KeyboardEvent, label: string ) {
        if ( event.key === "Enter" ) {
            event.preventDefault()
            const target = event.target as HTMLInputElement
            const topic = target.value.trim()
            if ( topic ) {
                if ( !this.courseInfo.topics![label] ) {
                    this.courseInfo.topics![label] = [];
                }
                // Checking topic is already exists or not
                if ( this.courseInfo.topics![label].includes(topic) ) {
                    this.topicErrorMessage = "Topic already exists"
                    setTimeout(()=>{
                        this.topicErrorMessage = ""
                    }, 3000)
                } else {
                    // Storing provided topic into array
                    this.courseInfo.topics![label]?.push(topic)
                    target.value = ""
                }
            } else {
                this.topicErrorMessage = "Provide topic"
                setTimeout(() => {
                    this.topicErrorMessage = "";
                }, 3000);
            }
        }
    }

    // Method to remove a topic from the array
    removeTopic( label: string, topic: string ) {
        const index = this.courseInfo.topics![label]?.indexOf(topic)
        if ( index !== -1 ) {
            this.courseInfo.topics![label]?.splice(index, 1)
        }  
    }

    // Generate duration labels based on duration and unit
    getDurationLabels(): string[] {
        const labels = []
        const duration = this.courseInfo.duration
        const unit = this.courseInfo.durationUnit

        if ( unit === "Weeks" || ( unit === "Months" && duration < 2 )) {
            for ( let i = 1; i <= duration; i++ ) {
                labels.push(`Week ${i}`)
            }
        } else {
            if ( unit === "Months" ) {
                for ( let i = 1; i <= duration; i++ ) {
                    labels.push(`Month ${i}`)
                }
            }
        }

        return labels
    }

    // Check and add topics from input fields to the topics array
    checkTopicInputs() {
        this.input1Refs.forEach(( inputRef, index ) => {
            const label = this.getDurationLabels()[index]
            const value = (inputRef.nativeElement as HTMLInputElement).value.trim()
            if ( value ) {
                if ( !this.courseInfo.topics![label] ) {
                    this.courseInfo.topics![label] = []
                }
                this.courseInfo.topics![label].push(value)
            }
        });
    }

    // Event handler for form submission
    onSubmit(form: any){
        this.checkTopicInputs()
        if ( form.valid ) {
            const datas = this.courseInfo

            this.adminService.addCourseDetails(datas).subscribe({
                // Handling backend responses 
                next: ( response: any )=>{
                    // Handling success responses 
                    if ( response.success ) {
                        Swal.fire("Course added successfully").then(()=>{
                            this.route.navigate(["/admin/courses"])
                        })
                    }
                },
                error: ( response: any )=>{
                    // Handling error responses
                    this.topicErrorMessage = response.error.message
                    setTimeout(() => {
                        this.topicErrorMessage = ""
                    }, 3000);
                }
            })
        } else {
            // Handling invalid form submission
            this.topicErrorMessage = "Provide required datas"
            setTimeout(() => {
                this.topicErrorMessage = "" 
            }, 3000);
        }
    }
}




