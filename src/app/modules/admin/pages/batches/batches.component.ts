import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
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
    }

    batchCreationForm: FormGroup

    constructor(private fb: FormBuilder, private adminService: AdminService, private datePipe: DatePipe, private route: Router){
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
            return this.datePipe.transform(new Date(timestamp), 'dd-MMMM-yyyy');
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

    errorMessage: string = ""
    onSubmit(){
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