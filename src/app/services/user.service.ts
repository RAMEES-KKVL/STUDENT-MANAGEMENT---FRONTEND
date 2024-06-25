import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Environment } from "../environment/environment";
import { map } from "rxjs";
import { EmailService } from "./email.service";

@Injectable({
    providedIn : "root"
})
export class UserService {
    constructor(private http: HttpClient , private emailService: EmailService){}

    signup(data: object){        
        return this.http.post(`${Environment.url}/auth/signup`, data).pipe(
            map(( response: any )=>{                
                this.emailService.setUserId(response.email)
                return response
            })
        )
    }

    login(data: object){
        return this.http.post(`${Environment.url}/auth/login`, data)
    }

    otp(data: object){        
        return this.http.post(`${Environment.url}/auth/otp-verification`, data)
    }

    forgetPass(data: object){
        return this.http.post(`${Environment.url}/auth/forget_password`, data).pipe(
            map((response: any)=>{
                this.emailService.setUserId(response.email)
                return response
            })
        )  
    }

    resetPass(data: object){
        return this.http.post(`${Environment.url}/auth/reset_password`, data)
    }
} 

