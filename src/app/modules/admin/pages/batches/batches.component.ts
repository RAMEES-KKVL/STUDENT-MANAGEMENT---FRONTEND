import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { batchInterface } from "src/app/models/batch.interface";
import { AdminService } from "src/app/services/admin.service";
import Swal from "sweetalert2";

@Component({
    selector : "admin-batches-body",
    templateUrl : "./batches.component.html"
})
export class AdminBatchPage implements OnInit {
    showPopup: boolean = false
    togglePopup(){
        this.showPopup = !this.showPopup
        this.batchCreationForm.patchValue({
            batchName : "",
            startingDate: ""
        })
        this.isEditMode = false;
    }

    batchCreationForm: FormGroup

    constructor(private fb: FormBuilder, private adminService: AdminService, private datePipe: DatePipe){
        this.batchCreationForm = this.fb.group({
            batchName: ["", Validators.required],
            startingDate: ["", Validators.required]
        })
    }

    batchList: any[] = []
    ngOnInit(): void {
        this.adminService.getBatches().subscribe({
            // Handling backend responses 
            next: ( response: any )=>{
                // Handling success responses 
                if ( response.success ) {
                    this.batchList = response.batchList.map((batch: batchInterface) => ({
                        _id : batch._id,
                        batchName: batch.batchName,
                        strength: batch.strength,
                        startingDate: this.getFormattedDate(batch.startingDate),
                        createdAt: this.getFormattedDate(batch.createdAt),
                        updatedAt: this.getFormattedDate(batch.updatedAt),
                    }))
                }
            },
            error: ( response: any )=>{
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

    // Validating batch name input field 
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

    // Validating startingDate input field 
    startingDateError: boolean = false
    startingDateTouched: boolean = false
    onStartingDateChange(event: Event){
        const target = event.target as HTMLInputElement
        this.startingDateError = target.value ? false : true
        this.startingDateTouched = true

        setTimeout(() => {
            this.startingDateError = false
            this.startingDateTouched = false
        }, 3000);
    }

    // Function for edit batch details
    isEditMode: boolean = false
    batchId: string = ""
    selectedBatch: batchInterface | null = null
    editBatch(selectedBatchName: string, id: string) {
        this.batchId = id        
        this.selectedBatch = this.batchList.find( batch => batch.batchName === selectedBatchName)
        if ( this.selectedBatch ) {
            // Adding values to the input fields
            this.batchCreationForm.patchValue({
                batchName : this.selectedBatch.batchName,
                startingDate: this.datePipe.transform(this.selectedBatch.startingDate, 'yyyy-MM-dd')
            })
            this.isEditMode = true;
            this.showPopup = true;
        }
    }

    // Function for deleting batch
    deleteBatch(batchName: string) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This process is irreversible.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, go ahead.',
            cancelButtonText: 'No, let me think',
        }).then((result) => {
            if (result.value) {
                this.adminService.deleteBatch(batchName).subscribe({
                    next: ( response: any )=>{
                        if ( response.success ) {
                            // Removing the deleted batch from the list
                            this.batchList = this.batchList.filter( batch => batch.batchName !== batchName )
                            Swal.fire('Removed!', 'Product removed successfully.', 'success');
                        }
                    },
                    error: ( response: any )=>{
                        Swal.fire("Failed to delete")
                    }
                })
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire('Cancelled', 'Product still in our database', 'error');
            }
        });
    }

    errorMessage: string = ""
    onSubmit(){
        if ( this.isEditMode ) {
            // Updating batch details
            this.adminService.editBatch(this.batchCreationForm.value, this.batchId).subscribe({
                // Handling backend responses 
                next: ( response: any )=>{
                    // Handling success responses 
                    if ( response.success ) {
                        this.showPopup = false
                        const updatedBatch = response.updatedBatch
                        updatedBatch.startingDate = this.getFormattedDate(updatedBatch.startingDate)
                        updatedBatch.createdAt = this.getFormattedDate(updatedBatch.createdAt)
                        updatedBatch.updatedAt = this.getFormattedDate(updatedBatch.updatedAt)

                        // Replacing updated batch details 
                        const index = this.batchList.findIndex( batch => batch._id === this.batchId )
                        if ( index !== -1 ) {
                            this.batchList[index] = updatedBatch
                        }
                        this.isEditMode = false
                        Swal.fire("Batch details updated successfully")
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
            this.adminService.addBatch(this.batchCreationForm.value).subscribe({
                // Handling backend responses 
                next: ( response: any )=>{
                    // Handling success responses 
                    if ( response.success ) {
                        this.showPopup = false
                        const createdBatch = response.createdBatch
                        createdBatch.startingDate = this.getFormattedDate(createdBatch.startingDate)
                        createdBatch.createdAt = this.getFormattedDate(createdBatch.createdAt)
                        createdBatch.updatedAt = this.getFormattedDate(createdBatch.updatedAt)
                        this.batchList.push(createdBatch)
                        Swal.fire("Batch created successfully")
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