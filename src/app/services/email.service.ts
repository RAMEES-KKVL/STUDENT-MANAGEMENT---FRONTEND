import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn : "root"
})
export class EmailService {
    private userEmailSubject = new BehaviorSubject<string>("")
    userEmail$ = this.userEmailSubject.asObservable()
    setUserId(email: string) {        
        this.userEmailSubject.next(email)
    }
}
