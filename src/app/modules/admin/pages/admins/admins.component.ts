import { DatePipe } from "@angular/common";
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { adminInterface } from "src/app/models/admin.interface";
import { AdminService } from "src/app/services/admin.service";
import Swal from "sweetalert2";

@Component({
    selector : "admin-admins-body",
    templateUrl : "./admins.component.html"
})
export class AdminsPageBody implements OnInit {
    showPopup: boolean = false

    accessArray: Array<string> = [
        "View", "Add", "Edit", "Delete" 
    ]
    
    controlsArray: Array<string> = [
        "Admin", "Course", "Batch", "Students"
    ]
    
    @ViewChildren("admincheckBox") adminCheckBoxes!: QueryList<ElementRef>
    
    // Creating form
    addAdmins!: FormGroup
    constructor(private renderer: Renderer2, private datePipe: DatePipe, private adminService: AdminService, private fb: FormBuilder) {
        this.addAdmins = this.fb.group({
            fullName:["", Validators.required],
            email:["", [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
            phone:["", Validators.compose([Validators.required, Validators.pattern(/^\d{10}$/)])],
            Admin: this.fb.group({
                View : [false],
                Add : [false],
                Edit : [false],
                Delete : [false]
            }),
            Course: this.fb.group({
                View : [false],
                Add : [false],
                Edit : [false],
                Delete : [false]
            }),
            Batch: this.fb.group({
                View : [false],
                Add : [false],
                Edit : [false],
                Delete : [false]
            }),
            Students: this.fb.group({
                View : [false],
                Add : [false],
                Edit : [false],
                Delete : [false]
            }),
        })
    }

    adminList: any[] = []
    ngOnInit(): void {
        this.adminService.getAdmin().subscribe({
            // Handling backend responses
            next: ( response: any ) => {
                // Handling success responses 
                if ( response.success ) {
                    this.adminList = response.adminList.map((admin: adminInterface) => ({
                        _id : admin._id,
                        fullName: admin.fullName,
                        email: admin.email,
                        phone: admin.phone,
                        Admin: admin.Admin,
                        Course: admin.Course,
                        Batch: admin.Batch,
                        Students: admin.Students,
                        createdAt: this.getFormattedDate(admin.createdAt),
                        updatedAt: this.getFormattedDate(admin.updatedAt),
                    }))
                    this.updatePaginatedAdmins()
                }
            },
            error: ( response: any ) => {
                // Handling error responses
            }
        })
    }

    getFormattedDate(timestamp: number | Date): string | null {
        if (!timestamp) {
          return '';  // Handle cases where createdAt is missing
        } else {
            // Changing date format 
            return this.datePipe.transform(new Date(timestamp), 'dd-MM-yyyy');
        }
    }

    currentPage = 1
    itemsPerPage = 5
    paginatedAdmins: any[] = [];
    updatePaginatedAdmins() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage
        const endIndex = startIndex + this.itemsPerPage
        this.paginatedAdmins = this.adminList.slice(startIndex, endIndex)
    }

    onPageChange(page: number) {
        this.currentPage = page;
        this.updatePaginatedAdmins();
    }

    togglePopup() {
        this.showPopup = !this.showPopup        
    }

    // Function for showing hidden checkbox 
    showCheckBox(index: number) {
        this.adminCheckBoxes.forEach(( checkbox, i ) => {
            if ( i === index ) {
                if ( checkbox.nativeElement.classList.contains("hidden") ) {
                    this.renderer.removeClass(checkbox.nativeElement, "hidden")
                } else {
                    this.renderer.addClass(checkbox.nativeElement, "hidden")
                }
            } else {
                this.renderer.addClass(checkbox.nativeElement, "hidden")
            }
        })
    }

    preventClick(event: Event) {
        event.stopPropagation()
        return
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
            this.emailErrorPattern = this.addAdmins.get('email')?.hasError('pattern')        
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
            // Checking regex error
            this.phoneErrorPattern = this.addAdmins.get('phone')?.hasError('pattern')
        }

        setTimeout(() => {
            this.phoneError = false
            this.phoneTouched = false
            this.phoneErrorPattern = false
        }, 3000);
    }

    errorMessage: string = ""

    onSubmit() {
        if ( this.addAdmins.valid ) {
            this.adminService.addAdmin(this.addAdmins.value).subscribe({
                // Handling backend responses
                next: ( response: any )=>{
                    // Handling success responses 
                    if ( response.success ) {
                        this.togglePopup()
                        const addedAdmin = response.addedAdmin
                        addedAdmin.createdAt = this.getFormattedDate(addedAdmin.createdAt)
                        addedAdmin.updatedAt = this.getFormattedDate(addedAdmin.updatedAt)

                        // Add the new admin to the main list
                        this.adminList.push(addedAdmin)

                        // Calculate the number of pages
                        const totalPages = Math.ceil(this.adminList.length / this.itemsPerPage);
                        // Check if the current page is the last page
                        if (this.currentPage === totalPages) {
                            // If the current page is the last page and it's not full, add the admin to the current page
                            if (this.paginatedAdmins.length < this.itemsPerPage) {
                                this.paginatedAdmins.push(addedAdmin);
                            } else {
                                // If the current page is full, set the current page to the last page
                                this.currentPage = totalPages;
                                this.updatePaginatedAdmins();
                            }
                        } else {
                            // If the current page is not the last page, update the pagination to reflect the new Admin count
                            this.updatePaginatedAdmins();
                        }

                        // Clear the input fields
                        this.addAdmins.reset();

                        Swal.fire("Admin details added successfully")
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
            this.errorMessage = "Provide required data"
            setTimeout(() => {
                this.errorMessage = ""
            }, 3000);
        }
    }
}