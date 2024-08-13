import { ChangeDetectorRef, Component } from "@angular/core";

@Component({
    selector : "calendar-component",
    templateUrl : "./calendar.component.html"
})
export class CalendarComponent {
    calendarWeeks: Array<string> = [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
    ]
    
    currentDate = new Date()
    daysInMonth: Array<number | null> = []

    constructor() {}

    ngOnInit() {
        this.generateCalendar(this.currentDate.getFullYear(), this.currentDate.getMonth())
    }

    generateCalendar(year: number, month: number) {
        this.daysInMonth = []
        const firstDay = new Date(year, month, 1).getDay()
        const totalDays = new Date(year, month + 1, 0).getDate()

        // Add empty days for the first week to align dates correctly
        for ( let i = 0; i < firstDay; i++ ) {
            this.daysInMonth.push(null)
        }

        // Add actual days of the month
        for ( let i = 1; i <= totalDays; i++ ) {
            this.daysInMonth.push(i)
        }
    }

    prevMonth() {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1);
        this.generateCalendar(this.currentDate.getFullYear(), this.currentDate.getMonth());
    }

    nextMonth() {
        // this.currentDate.setMonth(this.currentDate.getMonth() + 1)
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1)
        this.generateCalendar(this.currentDate.getFullYear(), this.currentDate.getMonth())
    }
}
