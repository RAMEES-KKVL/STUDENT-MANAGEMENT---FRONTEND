import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector : "pagination-component",
    templateUrl : "./pagination.component.html"
})
export class PaginationComponent {
    @Input() currentPage: number = 1
    @Input() totalItems: number = 0
    @Input() itemsPerPage: number = 5
    @Output() pageChange: EventEmitter<number> = new EventEmitter<number>()

    getTotalPages(): number {
        return Math.ceil(this.totalItems / this.itemsPerPage)
    }

    changePage(page: number) {
        this.pageChange.emit(page)
    }

    previousPage() {
        if ( this.currentPage > 1 ) {
            this.pageChange.emit(this.currentPage - 1)
        }
    }

    nextPage() {
        if ( this.currentPage < this.getTotalPages()) {
            this.pageChange.emit(this.currentPage + 1)
        }
    }
}