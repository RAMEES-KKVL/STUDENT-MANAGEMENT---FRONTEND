import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AdminService } from "src/app/services/admin.service";
import Swal from "sweetalert2";

@Component({
    selector : "admin-students-body",
    templateUrl : "students.component.html",
    styleUrls : ["./student.component.css"]
})
export class AdminStudentsPage implements OnInit {
    errorMessage: string = ""
    showPopup: boolean = false
    togglePopup(){
        this.showPopup = !this.showPopup
    }

    // Creating form
    addStudentForm!: FormGroup
    constructor(private fb: FormBuilder, private adminService: AdminService, private datePipe: DatePipe){
        this.addStudentForm = this.fb.group({
            fullName: ["", Validators.required],
            email: ["", [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
            phone: ["", Validators.compose([Validators.required, Validators.pattern(/^\d{10}$/)])],
            course: ['', Validators.required],
            batch: ['', Validators.required],
        })
    }

    studentsList: any[] = []
    courseList: any[] = []
    batchList: any[] = []
    ngOnInit(): void {
        this.adminService.getStudents().subscribe({
            // Handling backend responses 
            next: ( response: any )=>{
                // Handling success responses 
                this.studentsList = response.studentsList.map((student: any) => ({
                    _id : student._id,
                    fullName : student.fullName,
                    email : student.email,
                    phone : student.phone,
                    course : student.course,
                    batch : student.batch,
                    createdAt: this.getFormattedDate(student.createdAt),
                    updatedAt: this.getFormattedDate(student.updatedAt),
                }))
            },
            error: ( response: any )=>{
                // Handling error responses
            }
        })

        this.adminService.getCourses().subscribe({
            // Handling backend responses 
            next: ( response: any )=>{
                // Handling success responses 
                this.courseList = response.courseList
            },
            error: ( response: any )=>{
                // Handling error responses
            }
        })

        this.adminService.getBatches().subscribe({
            // Handling backend responses 
            next: ( response: any )=>{
                // Handling success responses 
                this.batchList = response.batchList
            },
            error: ( response: any )=>{
                // Handling error responses
            }
        })
    }

    getFormattedDate(timestamp: number | Date): string | null {
        if ( !timestamp ) {
            return "";  // Handle cases where createdAt is missing
        } else {
            // Changing date format 
            return this.datePipe.transform( new Date(timestamp), "dd-MM-yyyy")
        }
    }

    // Validating name input field 
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

    // Validating email input field 
    emailError: boolean = false
    emailTouched: boolean = false
    emailErrorPattern: boolean | undefined = false
    onEmailChange(event: Event){
        const target = event.target as HTMLInputElement
        this.emailError = target.value ? false : true
        this.emailTouched = true

        if(target.value){            
            this.emailErrorPattern = this.addStudentForm.get('email')?.hasError('pattern')        
        }

        setTimeout(() => {
            this.emailError = false
            this.emailTouched = false
            this.emailErrorPattern = false
        }, 3000);
    }

    // Validating phone input field 
    phoneError: boolean = false
    phoneTouched: boolean = false
    phoneErrorPattern: boolean | undefined = false
    onPhoneChange(event: Event){
        const target = event.target as HTMLInputElement
        this.phoneError = target.value ? false : true
        this.phoneTouched = true

        if(target.value){
            // Handling regex error
            this.phoneErrorPattern = this.addStudentForm.get('phone')?.hasError('pattern')
        }

        setTimeout(() => {
            this.phoneError = false
            this.phoneTouched = false
            this.phoneErrorPattern = false
        }, 3000);
    }

    // Function for edit student details
    isEditMode: boolean = false
    studentId: string = ""
    selectedStudent: any = null
    editStudent(studentName: string, id: string) {
        this.studentId = id        
        this.selectedStudent = this.studentsList.find( student => student.fullName === studentName)
        if ( this.selectedStudent ) {
            // Adding values to the input fields
            this.addStudentForm.patchValue({
                fullName : this.selectedStudent.fullName,
                email : this.selectedStudent.email,
                phone : this.selectedStudent.phone,
                course : this.selectedStudent.course,
                batch : this.selectedStudent.batch
            })
            this.isEditMode = true;
            this.togglePopup()
        }
    }

    onSubmit() {
        if ( this.isEditMode ) {
            // Updating student details
            this.adminService.editStudent(this.addStudentForm.value, this.studentId).subscribe({
                // Handling backend responses 
                next: ( response: any )=>{
                    // Handling success responses 
                    if ( response.success ) {
                        this.togglePopup()
                        const updatedStudent = response.updatedStudent
                        updatedStudent.createdAt = this.getFormattedDate(updatedStudent.createdAt)
                        updatedStudent.updatedAt = this.getFormattedDate(updatedStudent.updatedAt)

                        // Replacing updated student details 
                        const index = this.studentsList.findIndex( student => student._id === this.studentId )
                        if ( index !== -1 ) {
                            this.studentsList[index] = updatedStudent
                        }
                        this.isEditMode = false
                        Swal.fire("Student details updated successfully")
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
            this.adminService.addStudent(this.addStudentForm.value).subscribe({
                // Handling backend responses 
                next: ( response: any )=>{
                    // Handling success responses 
                    if ( response.success ) {
                        this.togglePopup()
                        const addedStudent = response.addedStudent
                        addedStudent.createdAt = this.getFormattedDate(addedStudent.createdAt)
                        addedStudent.updatedAt = this.getFormattedDate(addedStudent.updatedAt)
                        this.studentsList.push(addedStudent)
                        Swal.fire("Student added successfully")
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
        }
    }
}